import { LetterTile } from '../data/Types';

/**
 * Manages the board state: a collection of letter tiles
 * that players pick from to form words.
 */
export class BoardModel {
  tiles: LetterTile[];
  private nextId: number = 0;

  private constructor(tiles: LetterTile[]) {
    this.tiles = tiles;
  }

  /**
   * Create a board from target words.
   * @param words Array of target word strings
   * @param duplicateCount Number of extra duplicate letters to add
   */
  static createFromWords(words: string[], duplicateCount: number): BoardModel {
    const allChars: string[] = [];
    for (const word of words) {
      for (const char of word) {
        allChars.push(char);
      }
    }

    // Add duplicates: randomly pick from existing letters
    const duplicates: string[] = [];
    for (let i = 0; i < duplicateCount; i++) {
      const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
      duplicates.push(randomChar);
    }

    const combined = [...allChars, ...duplicates];
    // Shuffle
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    // Calculate grid layout
    const totalTiles = combined.length;
    const cols = Math.ceil(Math.sqrt(totalTiles * 1.5)); // wider than tall
    const rows = Math.ceil(totalTiles / cols);

    const model = new BoardModel([]);
    const tiles: LetterTile[] = combined.map((char, index) => ({
      id: model.nextId++,
      char,
      row: Math.floor(index / cols),
      col: index % cols,
      layer: 0,
      visible: true,
      highlighted: false,
    }));

    model.tiles = tiles;
    return model;
  }

  /**
   * Pick a tile from the board (mark as not visible).
   * Returns the tile, or null if not available.
   */
  pickTile(tileId: number): LetterTile | null {
    const tile = this.tiles.find(t => t.id === tileId);
    if (!tile || !tile.visible) return null;
    tile.visible = false;
    return tile;
  }

  /**
   * Return a tile to the board (mark as visible again).
   */
  returnTile(tileId: number): void {
    const tile = this.tiles.find(t => t.id === tileId);
    if (tile) tile.visible = true;
  }

  /**
   * Count of tiles still on the board (visible).
   */
  getRemainingCount(): number {
    return this.tiles.filter(t => t.visible).length;
  }

  /**
   * Shuffle tile positions randomly.
   */
  shuffle(): void {
    const visibleTiles = this.tiles.filter(t => t.visible);
    const positions = visibleTiles.map(t => ({ row: t.row, col: t.col }));

    // Shuffle positions
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    visibleTiles.forEach((tile, i) => {
      tile.row = positions[i].row;
      tile.col = positions[i].col;
    });
  }
}
