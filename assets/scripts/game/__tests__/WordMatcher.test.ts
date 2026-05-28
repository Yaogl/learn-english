import { WordMatcher } from '../WordMatcher';

describe('WordMatcher', () => {
  describe('canFormWord', () => {
    it('returns true when combo letters exactly match a word', () => {
      const result = WordMatcher.canFormWord(['c', 'a', 't'], 'cat');
      expect(result).toBe(true);
    });

    it('returns true regardless of letter order', () => {
      const result = WordMatcher.canFormWord(['t', 'a', 'c'], 'cat');
      expect(result).toBe(true);
    });

    it('returns false when letters are insufficient', () => {
      const result = WordMatcher.canFormWord(['c', 'a'], 'cat');
      expect(result).toBe(false);
    });

    it('returns false when combo has extra letters not in word', () => {
      const result = WordMatcher.canFormWord(['c', 'a', 't', 'x'], 'cat');
      expect(result).toBe(false);
    });

    it('handles duplicate letters in word correctly', () => {
      const result = WordMatcher.canFormWord(['a', 'p', 'p', 'l', 'e'], 'apple');
      expect(result).toBe(true);
    });

    it('returns false when duplicate count is wrong', () => {
      const result = WordMatcher.canFormWord(['a', 'p', 'l', 'e'], 'apple');
      expect(result).toBe(false);
    });
  });

  describe('findMatch', () => {
    it('returns the matched word when combo forms one of the targets', () => {
      const targets = ['cat', 'dog', 'bird'];
      const result = WordMatcher.findMatch(['c', 'a', 't'], targets);
      expect(result).toBe('cat');
    });

    it('returns the matched word regardless of order', () => {
      const targets = ['cat', 'dog', 'bird'];
      const result = WordMatcher.findMatch(['d', 'o', 'g'], targets);
      expect(result).toBe('dog');
    });

    it('returns null when combo does not match any target', () => {
      const targets = ['cat', 'dog'];
      const result = WordMatcher.findMatch(['x', 'y', 'z'], targets);
      expect(result).toBeNull();
    });

    it('returns first match when multiple targets could match', () => {
      const targets = ['abc', 'cab'];
      const result = WordMatcher.findMatch(['a', 'b', 'c'], targets);
      expect(result).toBe('abc');
    });
  });
});
