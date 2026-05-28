import { ComboModel } from '../ComboModel';
import { LetterTile } from '../../data/Types';

function makeTile(id: number, char: string): LetterTile {
  return { id, char, row: 0, col: 0, layer: 0, visible: true, highlighted: false };
}

describe('ComboModel', () => {
  let model: ComboModel;

  beforeEach(() => {
    model = new ComboModel(5); // 5 slots
  });

  it('initializes with correct capacity and all slots empty', () => {
    expect(model.capacity).toBe(5);
    expect(model.slots.every(s => s === null)).toBe(true);
    expect(model.occupiedCount).toBe(0);
    expect(model.isFull).toBe(false);
  });

  describe('addTile', () => {
    it('adds a tile to the first empty slot', () => {
      const tile = makeTile(1, 'a');
      const result = model.addTile(tile);
      expect(result).toBe(true);
      expect(model.slots[0]).toBe(tile);
      expect(model.occupiedCount).toBe(1);
    });

    it('fills slots in order', () => {
      model.addTile(makeTile(1, 'a'));
      model.addTile(makeTile(2, 'b'));
      model.addTile(makeTile(3, 'c'));
      expect(model.slots[0]?.char).toBe('a');
      expect(model.slots[1]?.char).toBe('b');
      expect(model.slots[2]?.char).toBe('c');
      expect(model.occupiedCount).toBe(3);
    });

    it('returns false when full', () => {
      for (let i = 0; i < 5; i++) {
        model.addTile(makeTile(i, String.fromCharCode(97 + i)));
      }
      const result = model.addTile(makeTile(99, 'z'));
      expect(result).toBe(false);
      expect(model.isFull).toBe(true);
    });
  });

  describe('removeTile', () => {
    it('removes a tile by id and returns it', () => {
      const tile = makeTile(1, 'a');
      model.addTile(tile);
      const removed = model.removeTile(1);
      expect(removed).toBe(tile);
      expect(model.slots[0]).toBeNull();
      expect(model.occupiedCount).toBe(0);
    });

    it('returns null when tile id not found', () => {
      model.addTile(makeTile(1, 'a'));
      const removed = model.removeTile(999);
      expect(removed).toBeNull();
      expect(model.occupiedCount).toBe(1);
    });
  });

  describe('getLetters', () => {
    it('returns array of chars from occupied slots', () => {
      model.addTile(makeTile(1, 'c'));
      model.addTile(makeTile(2, 'a'));
      model.addTile(makeTile(3, 't'));
      expect(model.getLetters()).toEqual(['c', 'a', 't']);
    });

    it('returns empty array when no tiles', () => {
      expect(model.getLetters()).toEqual([]);
    });
  });

  describe('clear', () => {
    it('empties all slots', () => {
      model.addTile(makeTile(1, 'a'));
      model.addTile(makeTile(2, 'b'));
      model.clear();
      expect(model.occupiedCount).toBe(0);
      expect(model.slots.every(s => s === null)).toBe(true);
    });
  });
});
