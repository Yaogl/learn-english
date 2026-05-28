/**
 * Checks if a set of letters (in any order) can form target words.
 * This is the core matching algorithm for the game.
 */
export class WordMatcher {
  /**
   * Check if comboLetters can form the target word (anagram check).
   * Letters must match exactly — same chars, same counts, no extras.
   */
  static canFormWord(comboLetters: string[], word: string): boolean {
    if (comboLetters.length !== word.length) return false;

    const comboCounts = this.charCounts(comboLetters);
    const wordCounts = this.charCounts([...word]);

    for (const [char, count] of wordCounts) {
      if ((comboCounts.get(char) ?? 0) !== count) return false;
    }
    return true;
  }

  /**
   * Find the first target word that comboLetters can form.
   * Returns null if no match.
   */
  static findMatch(comboLetters: string[], targetWords: string[]): string | null {
    for (const word of targetWords) {
      if (this.canFormWord(comboLetters, word)) {
        return word;
      }
    }
    return null;
  }

  private static charCounts(chars: string[]): Map<string, number> {
    const counts = new Map<string, number>();
    for (const c of chars) {
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    return counts;
  }
}
