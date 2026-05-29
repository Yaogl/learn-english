export class ComboModel {
  constructor(capacity) {
    this.capacity = capacity;
    this.slots = new Array(capacity).fill(null);
  }

  get occupiedCount() { return this.slots.filter(s => s !== null).length; }
  get isFull() { return this.occupiedCount >= this.capacity; }

  addTile(tile) {
    const idx = this.slots.findIndex(s => s === null);
    if (idx === -1) return false;
    this.slots[idx] = tile;
    return true;
  }

  removeTile(tileId) {
    const idx = this.slots.findIndex(s => s !== null && s.id === tileId);
    if (idx === -1) return null;
    const tile = this.slots[idx];
    this.slots[idx] = null;
    return tile;
  }

  getGroups() {
    return this.slots.filter(s => s !== null).map(s => s.text);
  }

  clear() { this.slots.fill(null); }
}
