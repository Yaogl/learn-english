import { ItemManager, ItemType } from '../ItemManager';

// Mock wx storage
const mockStorage: Record<string, string> = {};
(global as any).wx = {
  setStorageSync: (key: string, value: string) => { mockStorage[key] = value; },
  getStorageSync: (key: string) => mockStorage[key] || '',
};

describe('ItemManager', () => {
  beforeEach(() => {
    for (const key of Object.keys(mockStorage)) delete mockStorage[key];
  });

  describe('free uses', () => {
    it('starts with 1 free use per item per day', () => {
      const manager = new ItemManager();
      expect(manager.getFreeUsesRemaining(ItemType.REMOVE_LETTER)).toBe(1);
      expect(manager.getFreeUsesRemaining(ItemType.SHUFFLE)).toBe(1);
    });

    it('decreases free use when used', () => {
      const manager = new ItemManager();
      manager.useItem(ItemType.REMOVE_LETTER);
      expect(manager.getFreeUsesRemaining(ItemType.REMOVE_LETTER)).toBe(0);
    });

    it('returns false when trying to use with no free uses and no paid uses', () => {
      const manager = new ItemManager();
      manager.useItem(ItemType.REMOVE_LETTER);
      const result = manager.useItem(ItemType.REMOVE_LETTER);
      expect(result).toBe(false);
    });
  });

  describe('paid uses (from ads)', () => {
    it('allows use after adding paid uses', () => {
      const manager = new ItemManager();
      manager.useItem(ItemType.REMOVE_LETTER); // use free
      manager.addPaidUses(ItemType.REMOVE_LETTER, 2);
      const result = manager.useItem(ItemType.REMOVE_LETTER);
      expect(result).toBe(true);
      expect(manager.getPaidUsesRemaining(ItemType.REMOVE_LETTER)).toBe(1);
    });
  });

  describe('daily reset', () => {
    it('resets free uses for a new day', () => {
      const manager = new ItemManager();
      manager.useItem(ItemType.REMOVE_LETTER);
      expect(manager.getFreeUsesRemaining(ItemType.REMOVE_LETTER)).toBe(0);
      manager.resetDaily();
      expect(manager.getFreeUsesRemaining(ItemType.REMOVE_LETTER)).toBe(1);
    });
  });
});
