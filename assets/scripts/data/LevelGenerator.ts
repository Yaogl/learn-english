import { WordEntry, LevelData } from './Types';
import { BoardModel } from '../game/BoardModel';

/**
 * Generates a playable level from a pool of words.
 */
export class LevelGenerator {
  /**
   * Generate a level with random words from the pool.
   * @param wordPool Available words to pick from
   * @param wordCount How many target words
   * @param bufferSlots Extra combo slots beyond longest word
   * @param memoryTime Seconds for memory phase
   */
  static generate(
    wordPool: WordEntry[],
    wordCount: number,
    bufferSlots: number,
    memoryTime: number
  ): LevelData {
    if (wordPool.length < wordCount) {
      throw new Error(`Need at least ${wordCount} words, but only ${wordPool.length} available`);
    }

    // Pick random unique words
    const shuffled = [...wordPool].sort(() => Math.random() - 0.5);
    const targetWords = shuffled.slice(0, wordCount);

    // Calculate max slots
    const longestWord = Math.max(...targetWords.map(w => w.word.length));
    const maxSlots = longestWord + bufferSlots;

    // Generate board
    const wordStrings = targetWords.map(w => w.word);
    const duplicateCount = this.calculateDuplicates(wordStrings);
    const board = BoardModel.createFromWords(wordStrings, duplicateCount);

    return {
      targetWords,
      boardLetters: board.tiles,
      maxSlots,
      memoryTime,
    };
  }

  /**
   * Calculate how many duplicate letters to add based on total letter count.
   * Roughly 30-50% extra letters.
   */
  private static calculateDuplicates(words: string[]): number {
    const totalLetters = words.reduce((sum, w) => sum + w.length, 0);
    return Math.floor(totalLetters * 0.4);
  }
}
