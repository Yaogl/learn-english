import { StorageManager } from '../data/StorageManager';

export enum ItemType {
  REMOVE_LETTER = 'remove_letter',
  WORD_HINT = 'word_hint',
  EXTRA_TIME = 'extra_time',
  SHUFFLE = 'shuffle',
}

interface ItemState {
  freeUsedToday: boolean;
  paidUses: number;
}

/**
 * Manages item inventory and usage.
 * Each item has 1 free use per day, plus paid uses from watching ads.
 */
export class ItemManager {
  private states: Map<ItemType, ItemState>;

  constructor() {
    this.states = new Map();
    this.loadStates();
  }

  private loadStates(): void {
    for (const type of Object.values(ItemType)) {
      const saved = StorageManager.get<ItemState>(`item_${type}`, {
        freeUsedToday: false,
        paidUses: 0,
      });
      this.states.set(type, saved);
    }
  }

  private saveState(type: ItemType): void {
    const state = this.states.get(type);
    if (state) {
      StorageManager.set(`item_${type}`, state);
    }
  }

  getFreeUsesRemaining(type: ItemType): number {
    const state = this.states.get(type);
    return state && !state.freeUsedToday ? 1 : 0;
  }

  getPaidUsesRemaining(type: ItemType): number {
    const state = this.states.get(type);
    return state ? state.paidUses : 0;
  }

  getTotalUsesRemaining(type: ItemType): number {
    return this.getFreeUsesRemaining(type) + this.getPaidUsesRemaining(type);
  }

  /**
   * Use an item. Returns true if successful, false if no uses remaining.
   * Prefers free use over paid use.
   */
  useItem(type: ItemType): boolean {
    const state = this.states.get(type);
    if (!state) return false;

    if (!state.freeUsedToday) {
      state.freeUsedToday = true;
      this.saveState(type);
      return true;
    }

    if (state.paidUses > 0) {
      state.paidUses--;
      this.saveState(type);
      return true;
    }

    return false;
  }

  /**
   * Add paid uses (earned by watching ads).
   */
  addPaidUses(type: ItemType, count: number): void {
    const state = this.states.get(type);
    if (state) {
      state.paidUses += count;
      this.saveState(type);
    }
  }

  /**
   * Reset free uses for a new day.
   */
  resetDaily(): void {
    for (const [type, state] of this.states) {
      state.freeUsedToday = false;
      this.saveState(type);
    }
  }
}
