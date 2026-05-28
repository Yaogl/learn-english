import { ComboSlot, LetterTile } from '../data/Types';

/**
 * Manages the combo area state: a fixed-capacity slot array
 * where players place letter tiles to form words.
 */
export class ComboModel {
  capacity: number;
  slots: (LetterTile | null)[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.slots = new Array(capacity).fill(null);
  }

  get occupiedCount(): number {
    return this.slots.filter(s => s !== null).length;
  }

  get isFull(): boolean {
    return this.occupiedCount >= this.capacity;
  }

  /**
   * Add a tile to the first empty slot.
   * Returns true if successful, false if full.
   */
  addTile(tile: LetterTile): boolean {
    const emptyIndex = this.slots.findIndex(s => s === null);
    if (emptyIndex === -1) return false;
    this.slots[emptyIndex] = tile;
    return true;
  }

  /**
   * Remove a tile by its id.
   * Returns the removed tile, or null if not found.
   */
  removeTile(tileId: number): LetterTile | null {
    const index = this.slots.findIndex(s => s !== null && s.id === tileId);
    if (index === -1) return null;
    const tile = this.slots[index];
    this.slots[index] = null;
    return tile;
  }

  /**
   * Get array of characters from all occupied slots (in order).
   */
  getLetters(): string[] {
    return this.slots
      .filter((s): s is LetterTile => s !== null)
      .map(s => s.char);
  }

  /**
   * Empty all slots.
   */
  clear(): void {
    this.slots.fill(null);
  }
}
