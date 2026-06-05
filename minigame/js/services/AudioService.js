/**
 * AudioService - 音频服务（音效 + 单词发音 + 消消乐背景音乐）
 * 微信小游戏音频 API：wx.createInnerAudioContext()
 */

// 音效文件路径（放在 assets/audio/ 目录下）
const SFX = {
  tap: 'assets/audio/tap.mp3',
  match: 'assets/audio/match.mp3',
  win: 'assets/audio/win.mp3',
  lose: 'assets/audio/lose.mp3',
};

/** 消消乐背景音乐（云存储 fileID） */
const BGM_FILE_ID = 'cloud://cloud1-d0gvx0j804a5c17c1.636c-cloud1-d0gvx0j804a5c17c1-1438366056/背景音乐.mp3';

let tapAudio = null;
let matchAudio = null;
let winAudio = null;
let loseAudio = null;
let pronAudio = null;
let bgmAudio = null;
let bgmReady = false;
let bgmWantPlay = false;

/** 初始化（在 game.js 启动时调用） */
export function initAudio() {
  tapAudio = _create(SFX.tap);
  matchAudio = _create(SFX.match);
  winAudio = _create(SFX.win);
  loseAudio = _create(SFX.lose);
  pronAudio = _create();

  if (typeof wx.setInnerAudioOption === 'function') {
    try {
      wx.setInnerAudioOption({
        obeyMuteSwitch: false,
        mixWithOther: true,
        speakerOn: true,
      });
    } catch (e) {}
  }

  _initBgm();
}

/** 点击字母音效（顺带尝试恢复 BGM，解决异步加载后 play 被拦截） */
export function playTap() {
  _play(tapAudio);
  _retryBgmIfNeeded();
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

/** 消消乐阶段：循环播放背景音乐 */
export function playGameBgm() {
  if (!bgmAudio) _initBgm();
  bgmWantPlay = true;
  if (bgmReady && bgmAudio.src) {
    _playBgmInner();
    return;
  }
  _downloadBgm();
}

/** 预加载消消乐背景音乐（进关后尽早调用） */
export function preloadGameBgm() {
  if (!bgmAudio) _initBgm();
  _downloadBgm();
}

/** 通过云函数获取BGM（云函数有权限读云存储） */
function _downloadBgm() {
  if (!bgmAudio || !wx.cloud) return;
  wx.cloud.callFunction({
    name: 'getMediaUrl',
    data: { fileID: BGM_FILE_ID },
    success(res) {
      const r = res.result;
      if (r && r.code === 0 && r.base64) {
        // base64 → 临时文件 → 播放
        const fs = wx.getFileSystemManager();
        const tmpPath = `${wx.env.USER_DATA_PATH}/bgm_tmp.mp3`;
        fs.writeFile({
          filePath: tmpPath,
          data: r.base64,
          encoding: 'base64',
          success() {
            bgmAudio.src = tmpPath;
            bgmReady = true;
            if (bgmWantPlay) _playBgmInner();
          },
          fail(e) { console.warn('[Audio] BGM 写入临时文件失败', e); },
        });
      } else {
        console.warn('[Audio] getMediaUrl 返回异常', r);
      }
    },
    fail(e) { console.warn('[Audio] getMediaUrl 调用失败', e); },
  });
}

/** 停止消消乐背景音乐 */
export function stopGameBgm() {
  bgmWantPlay = false;
  if (bgmAudio) {
    try { bgmAudio.stop(); } catch (e) {}
  }
}

// 百度 TTS 免费接口
const TTS_BASE = 'https://tts.baidu.com/text2audio';

export function pronounceWord(word) {
  if (!word) return;
  const url = `${TTS_BASE}?lan=en&spd=5&pit=5&text=${encodeURIComponent(word)}`;
  if (pronAudio) {
    try {
      pronAudio.stop();
      pronAudio.src = url;
      pronAudio.play();
      return;
    } catch (e) {
      console.warn('[Audio] 直接播放失败，尝试下载方案', e);
    }
  }
  _downloadAndPlay(url);
}

function _downloadAndPlay(url) {
  try {
    wx.downloadFile({
      url,
      success(res) {
        if (res.statusCode !== 200 || !res.tempFilePath) return;
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

export function stopAll() {
  stopGameBgm();
  [tapAudio, matchAudio, winAudio, loseAudio, pronAudio].forEach((a) => {
    if (a) { try { a.stop(); } catch (e) {} }
  });
}

// ==================== BGM ====================

function _initBgm() {
  if (bgmAudio) return;
  try {
    bgmAudio = wx.createInnerAudioContext();
    bgmAudio.loop = true;
    bgmAudio.volume = 1.0;
    bgmAudio.autoplay = false;
    bgmAudio.onCanplay(() => {
      bgmReady = true;
      console.log('[Audio] BGM 已就绪');
      if (bgmWantPlay) _playBgmInner();
    });
    bgmAudio.onPlay(() => {
      console.log('[Audio] BGM 正在播放');
    });
    bgmAudio.onError((err) => {
      console.warn('[Audio] BGM 错误', err && (err.errMsg || err.message) || err);
      bgmReady = false;
      try { bgmAudio.src = ''; } catch (e) {}
    });
  } catch (e) {
    console.warn('[Audio] BGM 初始化失败', e);
  }
}

function _playBgmInner() {
  if (!bgmAudio || !bgmWantPlay) return;
  try {
    bgmAudio.play();
  } catch (e) {
    console.warn('[Audio] BGM play 异常', e);
  }
}

function _retryBgmIfNeeded() {
  if (!bgmWantPlay || !bgmReady || !bgmAudio) return;
  try {
    bgmAudio.play();
  } catch (e) {}
}

function _create(src) {
  try {
    const audio = wx.createInnerAudioContext();
    if (src) audio.src = src;
    audio.volume = 1.0;
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
