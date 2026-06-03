/**
 * AudioService - 音频服务（音效 + 单词发音）
 * 微信小游戏音频 API：wx.createInnerAudioContext()
 */

// 音效文件路径（放在 assets/audio/ 目录下）
const SFX = {
  tap: 'assets/audio/tap.mp3',        // 点击字母音效
  match: 'assets/audio/match.mp3',    // 单词消除音效
  win: 'assets/audio/win.mp3',        // 通关音效
  lose: 'assets/audio/lose.mp3',      // 失败音效
};

// 百度 TTS 免费接口
const TTS_BASE = 'https://tts.baidu.com/text2audio';

let tapAudio = null;
let matchAudio = null;
let winAudio = null;
let loseAudio = null;
let pronAudio = null;

/** 初始化（在 game.js 启动时调用） */
export function initAudio() {
  tapAudio = _create(SFX.tap);
  matchAudio = _create(SFX.match);
  winAudio = _create(SFX.win);
  loseAudio = _create(SFX.lose);
  pronAudio = _create();
}

/** 点击字母音效 */
export function playTap() {
  _play(tapAudio);
}

/** 单词消除音效 */
export function playMatch() {
  _play(matchAudio);
}

/** 通关音效 */
export function playWin() {
  _play(winAudio);
}

/** 失败音效 */
export function playLose() {
  _play(loseAudio);
}

/**
 * 朗读单词（英文发音）
 * 百度 TTS 免费接口 + 下载到本地播放（绕过域名限制）
 * @param {string} word 英文单词
 */
export function pronounceWord(word) {
  if (!word) return;
  const url = `${TTS_BASE}?lan=en&spd=5&pit=5&text=${encodeURIComponent(word)}`;
  // 方案1：直接用 InnerAudioContext 播放（需域名白名单）
  if (pronAudio) {
    try {
      pronAudio.stop();
      pronAudio.src = url;
      pronAudio.play();
      console.log('[Audio] 直接播放:', word);
      return;
    } catch (e) {
      console.warn('[Audio] 直接播放失败，尝试下载方案', e);
    }
  }
  // 方案2：下载到临时文件后播放（无需域名白名单）
  _downloadAndPlay(url, word);
}

/** 下载音频到本地临时文件再播放（无需域名白名单） */
function _downloadAndPlay(url) {
  try {
    wx.downloadFile({
      url,
      success(res) {
        if (res.statusCode !== 200 || !res.tempFilePath) {
          console.warn('[Audio] TTS下载失败', res.statusCode);
          return;
        }
        const audio = wx.createInnerAudioContext();
        audio.src = res.tempFilePath;
        audio.volume = 1;
        audio.onEnded(() => { audio.destroy(); });
        audio.onError(() => { audio.destroy(); });
        audio.play();
      },
      fail(e) {
        console.warn('[Audio] downloadFile 失败', e);
      },
    });
  } catch (e) {
    console.warn('[Audio] _downloadAndPlay 异常', e);
  }
}

/** 停止所有音频 */
export function stopAll() {
  [tapAudio, matchAudio, winAudio, loseAudio, pronAudio].forEach(a => {
    if (a) { try { a.stop(); } catch (e) {} }
  });
}

// ==================== 内部工具 ====================

function _create(src) {
  try {
    const audio = wx.createInnerAudioContext();
    if (src) audio.src = src;
    audio.volume = 0.8;
    return audio;
  } catch (e) {
    console.warn('[Audio] 创建失败', e);
    return null;
  }
}

function _play(audio) {
  if (!audio) return;
  try {
    audio.stop();
    audio.seek(0);
    audio.play();
  } catch (e) {}
}
