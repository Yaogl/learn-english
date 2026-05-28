import { StorageManager } from './StorageManager';

export interface ErrorWord {
  word: string;
  meaning: string;
  wrongCount: number;
  lastWrongTime: number;
  mastered: boolean;
}

/**
 * Manages the error book: tracks words the player got wrong
 * and supports review mode.
 */
export class ErrorBook {
  static recordError(word: string, meaning: string): void {
    const book = this.getBook();
    const existing = book.find((w) => w.word === word);
    if (existing) {
      existing.wrongCount++;
      existing.lastWrongTime = Date.now();
      existing.mastered = false;
    } else {
      book.push({
        word,
        meaning,
        wrongCount: 1,
        lastWrongTime: Date.now(),
        mastered: false,
      });
    }
    this.saveBook(book);
  }

  static markMastered(word: string): void {
    const book = this.getBook();
    const entry = book.find((w) => w.word === word);
    if (entry) {
      entry.mastered = true;
      this.saveBook(book);
    }
  }

  static getErrorWords(): ErrorWord[] {
    return this.getBook().filter((w) => !w.mastered);
  }

  static getTopErrorWords(count: number): ErrorWord[] {
    return this.getBook()
      .filter((w) => !w.mastered)
      .sort((a, b) => b.wrongCount - a.wrongCount)
      .slice(0, count);
  }

  static getTotalCount(): number {
    return this.getBook().length;
  }

  static getMasteredCount(): number {
    return this.getBook().filter((w) => w.mastered).length;
  }

  private static getBook(): ErrorWord[] {
    return StorageManager.get<ErrorWord[]>('errorBook', []);
  }

  private static saveBook(book: ErrorWord[]): void {
    StorageManager.set('errorBook', book);
  }
}
