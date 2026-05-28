import { BoardModel } from '../BoardModel';
import { LetterTile } from '../../data/Types';

function makeTile(id: number, char: string, row = 0, col = 0): LetterTile {
  return { id, char, row, col, layer: 0, visible: true, highlighted: false };
}

describe('BoardModel', () => {
  describe('createFromWords', () => {
    it('creates tiles from target words with correct letter counts', () => {
      const words = ['cat', 'dog'];
      const board = BoardModel.createFromWords(words, 0);
      expect(board.tiles.length).toBe(6); // c,a,t,d,o,g
      const chars = board.tiles.map(t => t.char).sort();
      expect(chars).toEqual(['a', 'c', 'd', 'g', 'o', 't']);
    });

    it('adds duplicate letters when specified', () => {
      const words = ['cat'];
      const board = BoardModel.createFromWords(words, 3);
      expect(board.tiles.length).toBe(6); // c,a,t + 3 duplicates
    });

    it('handles words with existing duplicate letters', () => {
      const words = ['apple'];
      const board = BoardModel.createFromWords(words, 0);
      // a,p,p,l,e = 5 letters
      expect(board.tiles.length).toBe(5);
    });
  });

  describe('pickTile', () => {
    it('marks tile as not visible and returns it', () => {
      const board = BoardModel.createFromWords(['cat'], 0);
      const tile = board.tiles[0];
      const picked = board.pickTile(tile.id);
      expect(picked).toBe(tile);
      expect(board.tiles.find(t => t.id === tile.id)?.visible).toBe(false);
    });

    it('returns null for non-existent tile id', () => {
      const board = BoardModel.createFromWords(['cat'], 0);
      const picked = board.pickTile(999);
      expect(picked).toBeNull();
    });

    it('returns null for already picked tile', () => {
      const board = BoardModel.createFromWords(['cat'], 0);
      const tile = board.tiles[0];
      board.pickTile(tile.id);
      const picked = board.pickTile(tile.id);
      expect(picked).toBeNull();
    });
  });

  describe('returnTile', () => {
    it('makes a picked tile visible again', () => {
      const board = BoardModel.createFromWords(['cat'], 0);
      const tile = board.tiles[0];
      board.pickTile(tile.id);
      board.returnTile(tile.id);
      expect(board.tiles.find(t => t.id === tile.id)?.visible).toBe(true);
    });
  });

  describe('getRemainingCount', () => {
    it('returns total tiles initially', () => {
      const board = BoardModel.createFromWords(['cat'], 0);
      expect(board.getRemainingCount()).toBe(3);
    });

    it('decreases when tiles are picked', () => {
      const board = BoardModel.createFromWords(['cat'], 0);
      board.pickTile(board.tiles[0].id);
      expect(board.getRemainingCount()).toBe(2);
    });
  });

  describe('shuffle', () => {
    it('preserves all tiles but changes positions', () => {
      const board = BoardModel.createFromWords(['abcdef'], 0);
      const originalPositions = board.tiles.map(t => `${t.row},${t.col}`);
      board.shuffle();
      // Tiles should still exist
      expect(board.tiles.length).toBe(6);
      // At least some positions should differ (statistically almost certain)
      const newPositions = board.tiles.map(t => `${t.row},${t.col}`);
      const changed = originalPositions.some((p, i) => p !== newPositions[i]);
      expect(changed).toBe(true);
    });
  });
});
