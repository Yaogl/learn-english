/** A single word entry from the database */
export interface WordEntry {
  id: string;
  word: string;
  meaning: string;
  difficulty: number; // 1-5
}

/** A unit within a grade/semester */
export interface WordUnit {
  unit: number;
  name: string;
  words: WordEntry[];
}

/** Grade-level word data */
export interface GradeData {
  grade: number;
  semester: number;
  units: WordUnit[];
}

/** Theme park word data */
export interface ThemeData {
  id: string;
  name: string;
  icon: string;
  words: WordEntry[];
}

export interface ThemeDatabase {
  themes: ThemeData[];
}

/** A letter tile on the board */
export interface LetterTile {
  id: number;
  char: string;
  row: number;
  col: number;
  layer: number;
  visible: boolean;
  highlighted: boolean;
}

/** A slot in the combo area */
export interface ComboSlot {
  index: number;
  tile: LetterTile | null;
}

/** Level difficulty parameters */
export interface LevelParams {
  wordCount: number;        // number of target words (2-3)
  memoryTime: number;       // seconds to memorize
  duplicateLetters: number; // extra duplicate letters on board
  bufferSlots: number;      // extra slots beyond longest word
}

/** A generated level ready to play */
export interface LevelData {
  targetWords: WordEntry[];
  boardLetters: LetterTile[];
  maxSlots: number;
  memoryTime: number;
}

/** Game state enum */
export enum GameState {
  MEMORY = 'memory',
  PLAYING = 'playing',
  WIN = 'win',
  LOSE = 'lose',
}

/** Level source */
export enum LevelSource {
  TEXTBOOK = 'textbook',
  THEME = 'theme',
}

/** Level identifier */
export interface LevelId {
  source: LevelSource;
  grade?: number;
  semester?: number;
  unit?: number;
  stage?: number;
  themeId?: string;
}
