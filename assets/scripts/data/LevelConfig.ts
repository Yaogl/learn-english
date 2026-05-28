import { LevelParams } from './Types';

/**
 * Get level parameters based on stage number (1-based).
 * Stages get harder as numbers increase.
 */
export function getLevelParams(stage: number): LevelParams {
  if (stage <= 10) {
    return { wordCount: 2, memoryTime: 5, duplicateLetters: 2, bufferSlots: 3 };
  } else if (stage <= 20) {
    return { wordCount: 2, memoryTime: 4, duplicateLetters: 3, bufferSlots: 3 };
  } else if (stage <= 30) {
    return { wordCount: 3, memoryTime: 4, duplicateLetters: 4, bufferSlots: 3 };
  } else {
    return { wordCount: 3, memoryTime: 3, duplicateLetters: 5, bufferSlots: 2 };
  }
}
