import { BoardModel } from './BoardModel';

export class WordMatcher {
  static canFormWord(comboGroups, word) {
    const wordGroups = BoardModel.splitWordToGroups(word);
    if (comboGroups.length !== wordGroups.length) return false;
    const sortedCombo = [...comboGroups].sort();
    const sortedWord = [...wordGroups].sort();
    for (let i = 0; i < sortedCombo.length; i++) {
      if (sortedCombo[i] !== sortedWord[i]) return false;
    }
    return true;
  }

  static findMatch(comboGroups, targetWords) {
    for (const word of targetWords) {
      if (this.canFormWord(comboGroups, word)) return word;
    }
    return null;
  }
}
