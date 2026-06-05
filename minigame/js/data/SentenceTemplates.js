/**
 * 通关试炼句子 — 仅从 LevelData 单词对象的 trial 字段读取（写死在 WordTrials.js）
 */

/**
 * @param {{ word: string, trial?: { declarative: object, interrogative: object } }} wordObj
 * @returns {{ declarative: object, interrogative: object }}
 */
export function getSentencePair(wordObj) {
  if (wordObj && wordObj.trial) {
    return wordObj.trial;
  }
  console.warn('[SentenceTemplates] missing trial for:', wordObj && wordObj.word);
  return {
    declarative: { sentence: 'Hello.', chinese: '你好。', type: 'declarative' },
    interrogative: { sentence: 'How are you?', chinese: '你好吗？', type: 'interrogative' },
  };
}
