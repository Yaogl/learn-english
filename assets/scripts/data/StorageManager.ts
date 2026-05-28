/**
 * Manages local data persistence using wx.setStorageSync.
 * Falls back to in-memory storage when wx is not available (for testing).
 */
export class StorageManager {
  private static useWx(): boolean {
    return typeof (globalThis as any).wx !== 'undefined';
  }

  static set(key: string, value: any): void {
    const json = JSON.stringify(value);
    if (this.useWx()) {
      (globalThis as any).wx.setStorageSync(key, json);
    }
  }

  static get<T>(key: string, defaultValue: T): T {
    let raw = '';
    if (this.useWx()) {
      raw = (globalThis as any).wx.getStorageSync(key);
    }
    if (!raw) return defaultValue;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return defaultValue;
    }
  }

  // --- Level progress ---

  static setLevelCompleted(unitKey: string, stage: number): void {
    const key = `progress_${unitKey}`;
    const completed = this.get<number[]>(key, []);
    if (!completed.includes(stage)) {
      completed.push(stage);
      this.set(key, completed);
    }
  }

  static getCompletedLevelCount(unitKey: string): number {
    const key = `progress_${unitKey}`;
    return this.get<number[]>(key, []).length;
  }

  // --- Total words cleared ---

  static setTotalWordsCleared(count: number): void {
    this.set('totalWordsCleared', count);
  }

  static getTotalWordsCleared(): number {
    return this.get<number>('totalWordsCleared', 0);
  }

  static addWordsCleared(count: number): void {
    const current = this.getTotalWordsCleared();
    this.setTotalWordsCleared(current + count);
  }
}
