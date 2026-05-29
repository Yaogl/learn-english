/**
 * Board Model - manages the game board tiles
 */
export class BoardModel {
  constructor(tiles) {
    this.tiles = tiles;
    this.nextId = 0;
  }

  static splitWordToGroups(word) {
    if (word.length < 6) return [...word];
    const groups = [];
    for (let i = 0; i < word.length; i += 2) {
      groups.push(i + 1 < word.length ? word[i] + word[i + 1] : word[i]);
    }
    return groups;
  }

  static createFromWords(words, duplicateCount) {
    const allGroups = [];
    for (const word of words) {
      allGroups.push(...this.splitWordToGroups(word));
    }
    const duplicates = [];
    for (let i = 0; i < duplicateCount; i++) {
      duplicates.push(allGroups[Math.floor(Math.random() * allGroups.length)]);
    }
    const combined = [...allGroups, ...duplicates];
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    const cols = Math.ceil(Math.sqrt(combined.length * 1.5));
    const model = new BoardModel([]);
    model.tiles = combined.map((text, index) => ({
      id: model.nextId++,
      text,
      groupSize: text.length,
      row: Math.floor(index / cols),
      col: index % cols,
      visible: true,
    }));
    return model;
  }

  pickTile(tileId) {
    const tile = this.tiles.find(t => t.id === tileId);
    if (!tile || !tile.visible) return null;
    tile.visible = false;
    return tile;
  }

  returnTile(tileId) {
    const tile = this.tiles.find(t => t.id === tileId);
    if (tile) tile.visible = true;
  }

  getRemainingCount() {
    return this.tiles.filter(t => t.visible).length;
  }

  shuffle() {
    const visible = this.tiles.filter(t => t.visible);
    const positions = visible.map(t => ({ row: t.row, col: t.col }));
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    visible.forEach((tile, i) => {
      tile.row = positions[i].row;
      tile.col = positions[i].col;
    });
  }
}
