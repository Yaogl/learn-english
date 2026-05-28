import { GradeData, WordEntry, ThemeData } from './Types';

/**
 * Manages word data loading and querying.
 * In Cocos Creator, JSON files are loaded via cc.resources.load().
 * For testing, data can be passed directly via constructor.
 */
export class WordDatabase {
  private gradeDataMap: Map<string, GradeData>;
  private themeData: ThemeData[];

  constructor(gradeData: GradeData[], themes: ThemeData[] = []) {
    this.gradeDataMap = new Map();
    for (const gd of gradeData) {
      const key = `${gd.grade}-${gd.semester}`;
      this.gradeDataMap.set(key, gd);
    }
    this.themeData = themes;
  }

  /**
   * Get words for a specific unit.
   */
  getUnitWords(grade: number, semester: number, unit: number): WordEntry[] {
    const key = `${grade}-${semester}`;
    const gradeData = this.gradeDataMap.get(key);
    if (!gradeData) return [];
    const unitData = gradeData.units.find(u => u.unit === unit);
    return unitData ? unitData.words : [];
  }

  /**
   * Get number of units for a grade/semester.
   */
  getUnitCount(grade: number, semester: number): number {
    const key = `${grade}-${semester}`;
    const gradeData = this.gradeDataMap.get(key);
    return gradeData ? gradeData.units.length : 0;
  }

  /**
   * Get all words for a grade/semester (across all units).
   */
  getAllWordsForGrade(grade: number, semester: number): WordEntry[] {
    const key = `${grade}-${semester}`;
    const gradeData = this.gradeDataMap.get(key);
    if (!gradeData) return [];
    return gradeData.units.flatMap(u => u.words);
  }

  /**
   * Get words for a theme.
   */
  getThemeWords(themeId: string): WordEntry[] {
    const theme = this.themeData.find(t => t.id === themeId);
    return theme ? theme.words : [];
  }

  /**
   * Get all available themes.
   */
  getThemes(): ThemeData[] {
    return this.themeData;
  }
}
