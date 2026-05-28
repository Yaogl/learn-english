import { LevelGenerator } from '../LevelGenerator';
import { WordEntry } from '../Types';

const sampleWords: WordEntry[] = [
  { id: 'w1', word: 'cats', meaning: '猫', difficulty: 1 },
  { id: 'w2', word: 'dogs', meaning: '狗', difficulty: 1 },
  { id: 'w3', word: 'bird', meaning: '鸟', difficulty: 2 },
  { id: 'w4', word: 'fish', meaning: '鱼', difficulty: 2 },
  { id: 'w5', word: 'deer', meaning: '鹿', difficulty: 3 },
  { id: 'w6', word: 'bear', meaning: '熊', difficulty: 3 },
];

describe('LevelGenerator', () => {
  describe('generate', () => {
    it('generates a level with correct word count', () => {
      const level = LevelGenerator.generate(sampleWords, 2, 5, 3);
      expect(level.targetWords.length).toBe(2);
    });

    it('generates board letters matching target words + duplicates', () => {
      const level = LevelGenerator.generate(sampleWords, 2, 5, 3);
      const targetLetterCount = level.targetWords.reduce((sum, w) => sum + w.word.length, 0);
      expect(level.boardLetters.length).toBe(targetLetterCount + 3);
    });

    it('calculates maxSlots as longest word length + buffer', () => {
      const level = LevelGenerator.generate(sampleWords, 2, 5, 3);
      const longestWord = Math.max(...level.targetWords.map(w => w.word.length));
      expect(level.maxSlots).toBe(longestWord + 5);
    });

    it('sets memoryTime correctly', () => {
      const level = LevelGenerator.generate(sampleWords, 2, 3, 3);
      expect(level.memoryTime).toBe(3);
    });

    it('picks unique words (no duplicates)', () => {
      const level = LevelGenerator.generate(sampleWords, 3, 5, 3);
      const wordTexts = level.targetWords.map(w => w.word);
      expect(new Set(wordTexts).size).toBe(3);
    });

    it('throws if not enough words available', () => {
      const fewWords = sampleWords.slice(0, 2);
      expect(() => LevelGenerator.generate(fewWords, 3, 5, 3)).toThrow();
    });
  });
});
