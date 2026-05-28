import { StorageManager } from '../StorageManager';

// Mock wx storage
const mockStorage: Record<string, string> = {};
(global as any).wx = {
  setStorageSync: (key: string, value: string) => { mockStorage[key] = value; },
  getStorageSync: (key: string) => mockStorage[key] || '',
  removeStorageSync: (key: string) => { delete mockStorage[key]; },
};

describe('StorageManager', () => {
  beforeEach(() => {
    // Clear mock storage
    for (const key of Object.keys(mockStorage)) delete mockStorage[key];
  });

  describe('level progress', () => {
    it('saves and loads level progress', () => {
      StorageManager.setLevelCompleted('g3s1u1', 1);
      StorageManager.setLevelCompleted('g3s1u1', 2);
      expect(StorageManager.getCompletedLevelCount('g3s1u1')).toBe(2);
    });

    it('returns 0 for units with no progress', () => {
      expect(StorageManager.getCompletedLevelCount('g99s1u1')).toBe(0);
    });
  });

  describe('player data', () => {
    it('saves and loads total words cleared', () => {
      StorageManager.setTotalWordsCleared(42);
      expect(StorageManager.getTotalWordsCleared()).toBe(42);
    });

    it('increments total words cleared', () => {
      StorageManager.setTotalWordsCleared(10);
      StorageManager.addWordsCleared(5);
      expect(StorageManager.getTotalWordsCleared()).toBe(15);
    });
  });
});
