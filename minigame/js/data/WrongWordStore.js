/**
 * 错题本 — 本地存储 + 云同步
 */
import { CloudService } from '../services/CloudService';
import { WORD_TRIALS } from './WordTrials.js';

const STORAGE_KEY = 'wrong_words';

function normalizeList(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    if (!data.trim()) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  }
  return [];
}

/** 读取错题列表 */
export function loadWrongWords() {
  try {
    return normalizeList(wx.getStorageSync(STORAGE_KEY));
  } catch (e) {
    console.warn('[WrongWordStore] 读取失败', e);
    return [];
  }
}

/** 保存错题列表（本地 + 云同步） */
export function saveWrongWords(list) {
  try {
    wx.setStorageSync(STORAGE_KEY, list);
    _syncToCloud(list);
    return true;
  } catch (e) {
    console.warn('[WrongWordStore] 保存失败', e);
    return false;
  }
}

/** 后台同步到云端（静默） */
async function _syncToCloud(list) {
  try {
    if (!CloudService.isAvailable()) return;
    const openid = await CloudService.getOpenid();
    if (!openid) return;
    await CloudService.updateWrongWords(openid, list);
  } catch (e) {
    console.warn('[WrongWordStore] 云同步失败', e);
  }
}

/**
 * 闯关失败：合并本关单词进错题本
 * @param {Array} words 本关单词 [{ word, meaning, phonetic, past }]
 */
export function addWrongWordsOnFail(words) {
  if (!words || !words.length) {
    console.warn('[WrongWordStore] 本关无单词，跳过写入');
    return loadWrongWords();
  }

  const list = loadWrongWords();

  for (const w of words) {
    if (!w || !w.word) continue;
    const hit = list.find((item) => item.word === w.word);
    if (hit) {
      hit.wrongCount = (hit.wrongCount || 1) + 1;
      hit.meaning = w.meaning || hit.meaning;
      hit.phonetic = w.phonetic || hit.phonetic;
      hit.past = w.past || hit.past;
    } else {
      list.push({
        word: w.word,
        meaning: w.meaning || '',
        phonetic: w.phonetic || '',
        past: w.past || '',
        wrongCount: 1,
      });
    }
  }

  const ok = saveWrongWords(list);
  if (ok) {
    console.log('[WrongWordStore] 已收录错题', list.length, '个');
  }
  return list;
}

/**
 * 错题本进关：构造单词条 stageData（心魔故事 + 拼写关）
 * @param {Object} word 错题条目
 */
export function buildErrorBookStageData(word) {
  const w = (word?.word || '').trim();
  const totalLen = w.length;
  const maxSlots = Math.min(12, Math.max(5, totalLen + 2));
  return {
    stage: 0,
    realm: {
      id: 'errorbook',
      name: '心魔关',
      icon: '👿',
      color: '#c084fc',
      desc: '斩心魔，修短板',
    },
    story: `识海中，「${w}」这道心魔仍挥之不去，曾让你在关卡中屡屡失误。\n\n以灵识拼写此词，驱散心魔，修复修行短板！`,
    words: [{
      word: word.word,
      meaning: word.meaning || '',
      phonetic: word.phonetic || '',
      past: word.past || '',
      example: word.example || '',
      trial: WORD_TRIALS[word.word] || WORD_TRIALS[w.toLowerCase()] || null,
    }],
    wordCount: 1,
    maxSlots,
  };
}

/** 修复成功后从错题本移除 */
export function removeWrongWord(wordText) {
  if (!wordText) return loadWrongWords();
  const list = loadWrongWords().filter((item) => item.word !== wordText);
  saveWrongWords(list);
  return list;
}
