import { resources, JsonAsset } from 'cc';
import { GradeData, ThemeData, ThemeDatabase } from './Types';
import { WordDatabase } from './WordDatabase';

/**
 * Loads word data from Cocos Creator resources and initializes WordDatabase.
 */
export class DataLoader {
  private static instance: WordDatabase | null = null;

  /**
   * Load all word data and return a WordDatabase instance.
   * Call this during game initialization.
   */
  static loadAll(callback: (db: WordDatabase) => void): void {
    const gradeFiles = ['grade3', 'grade4', 'grade5', 'grade6'];
    const loadedGrades: GradeData[] = [];
    let themesData: ThemeData[] = [];
    let pending = gradeFiles.length + 1; // +1 for themes

    const checkDone = () => {
      pending--;
      if (pending <= 0) {
        this.instance = new WordDatabase(loadedGrades, themesData);
        callback(this.instance);
      }
    };

    // Load grade files
    for (const fileName of gradeFiles) {
      resources.load(`words/${fileName}/json`, JsonAsset, (err, asset) => {
        if (err) {
          console.error(`Failed to load ${fileName}:`, err);
        } else {
          loadedGrades.push(asset.json as GradeData);
        }
        checkDone();
      });
    }

    // Load themes
    resources.load('words/themes/json', JsonAsset, (err, asset) => {
      if (err) {
        console.error('Failed to load themes:', err);
      } else {
        const themeDb = asset.json as ThemeDatabase;
        themesData = themeDb.themes;
      }
      checkDone();
    });
  }

  /**
   * Get the loaded WordDatabase instance.
   */
  static getInstance(): WordDatabase | null {
    return this.instance;
  }
}
