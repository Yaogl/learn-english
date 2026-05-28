import { WordDatabase } from '../WordDatabase';
import { GradeData, ThemeData } from '../Types';

describe('WordDatabase', () => {
  const sampleGradeData: GradeData = {
    grade: 3,
    semester: 1,
    units: [
      {
        unit: 1,
        name: 'Hello!',
        words: [
          { id: 'g3s1u1w001', word: 'hello', meaning: '你好', difficulty: 1 },
          { id: 'g3s1u1w002', word: 'morning', meaning: '早晨', difficulty: 2 },
          { id: 'g3s1u1w003', word: 'afternoon', meaning: '下午', difficulty: 2 },
        ],
      },
      {
        unit: 2,
        name: 'My Family',
        words: [
          { id: 'g3s1u2w001', word: 'family', meaning: '家庭', difficulty: 2 },
          { id: 'g3s1u2w002', word: 'father', meaning: '父亲', difficulty: 2 },
        ],
      },
    ],
  };

  describe('getUnitWords', () => {
    it('returns words for a specific unit', () => {
      const db = new WordDatabase([sampleGradeData]);
      const words = db.getUnitWords(3, 1, 1);
      expect(words.length).toBe(3);
      expect(words[0].word).toBe('hello');
    });

    it('returns empty array for non-existent unit', () => {
      const db = new WordDatabase([sampleGradeData]);
      const words = db.getUnitWords(3, 1, 99);
      expect(words).toEqual([]);
    });
  });

  describe('getUnitCount', () => {
    it('returns number of units for a grade/semester', () => {
      const db = new WordDatabase([sampleGradeData]);
      expect(db.getUnitCount(3, 1)).toBe(2);
    });
  });

  describe('getAllWordsForGrade', () => {
    it('returns all words across all units', () => {
      const db = new WordDatabase([sampleGradeData]);
      const words = db.getAllWordsForGrade(3, 1);
      expect(words.length).toBe(5);
    });
  });
});
