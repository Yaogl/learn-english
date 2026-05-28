import { _decorator, Component, Node, Label, director } from 'cc';
import { GameState, LevelData, LetterTile } from '../data/Types';
import { BoardModel } from './BoardModel';
import { ComboModel } from './ComboModel';
import { WordMatcher } from './WordMatcher';

const { ccclass, property } = _decorator;

/**
 * Orchestrates the game flow: memory phase → playing phase → win/lose.
 * Attach this to the root node of the Game scene.
 */
@ccclass('GameManager')
export class GameManager extends Component {
  // --- UI references (set in Cocos Editor) ---
  @property(Node)
  boardNode: Node = null!;

  @property(Node)
  comboNode: Node = null!;

  @property(Label)
  wordDisplayLabel: Label = null!;

  @property(Label)
  timerLabel: Label = null!;

  @property(Label)
  messageLabel: Label = null!;

  // --- Game state ---
  private state: GameState = GameState.MEMORY;
  private boardModel: BoardModel | null = null;
  private comboModel: ComboModel | null = null;
  private levelData: LevelData | null = null;
  private memoryTimer: number = 0;
  private targetWordStrings: string[] = [];
  private matchedWords: Set<string> = new Set();
  private startTime: number = 0;

  /**
   * Initialize and start a level.
   * Call this from the scene that creates the level data.
   */
  startLevel(levelData: LevelData): void {
    this.levelData = levelData;
    this.targetWordStrings = levelData.targetWords.map(w => w.word);
    this.matchedWords = new Set();

    // Initialize models — use createFromWords to respect the private constructor
    this.boardModel = BoardModel.createFromWords(
      levelData.targetWords.map(w => w.word),
      0
    );
    // Override tiles with the pre-generated board letters from level data
    this.boardModel.tiles = levelData.boardLetters;

    this.comboModel = new ComboModel(levelData.maxSlots);

    // Start memory phase
    this.state = GameState.MEMORY;
    this.memoryTimer = levelData.memoryTime;
    this.showWords();
    this.schedule(this.memoryTick, 1.0, levelData.memoryTime, 0);
  }

  private memoryTick(): void {
    this.memoryTimer--;
    if (this.timerLabel) {
      this.timerLabel.string = `${this.memoryTimer}s`;
    }
    if (this.memoryTimer <= 0) {
      this.endMemoryPhase();
    }
  }

  private showWords(): void {
    if (this.wordDisplayLabel) {
      const display = this.levelData!.targetWords
        .map(w => `${w.word} - ${w.meaning}`)
        .join('\n');
      this.wordDisplayLabel.string = display;
    }
    if (this.timerLabel) {
      this.timerLabel.string = `${this.memoryTimer}s`;
    }
  }

  private endMemoryPhase(): void {
    this.state = GameState.PLAYING;
    this.startTime = Date.now();
    if (this.wordDisplayLabel) {
      this.wordDisplayLabel.string = '???';
    }
    if (this.messageLabel) {
      this.messageLabel.string = '找出这些单词！';
    }
    this.renderBoard();
    this.renderCombo();
  }

  /**
   * Called when player taps a tile on the board.
   */
  onBoardTileClicked(tileId: number): void {
    if (this.state !== GameState.PLAYING) return;
    if (!this.boardModel || !this.comboModel) return;

    const tile = this.boardModel.pickTile(tileId);
    if (!tile) return;

    const added = this.comboModel.addTile(tile);
    if (!added) {
      // Combo full — return tile to board
      this.boardModel.returnTile(tileId);
      return;
    }

    this.renderBoard();
    this.renderCombo();
    this.checkMatch();
  }

  /**
   * Called when player taps a tile in the combo area (to return it).
   */
  onComboTileClicked(tileId: number): void {
    if (this.state !== GameState.PLAYING) return;
    if (!this.boardModel || !this.comboModel) return;

    const tile = this.comboModel.removeTile(tileId);
    if (!tile) return;

    this.boardModel.returnTile(tile.id);
    this.renderBoard();
    this.renderCombo();
  }

  /**
   * Check if combo letters form any target word.
   */
  private checkMatch(): void {
    if (!this.comboModel || !this.boardModel) return;

    const letters = this.comboModel.getLetters();
    const match = WordMatcher.findMatch(letters, this.targetWordStrings);

    if (match) {
      // Word matched!
      this.matchedWords.add(match);
      this.comboModel.clear();
      this.renderCombo();

      if (this.messageLabel) {
        this.messageLabel.string = `消除: ${match}!`;
      }

      // Check win condition
      if (this.matchedWords.size === this.targetWordStrings.length) {
        this.onWin();
      }
    } else if (this.comboModel.isFull) {
      // Combo full and no match — check if there's any possible match left
      this.onLose();
    }
  }

  private onWin(): void {
    this.state = GameState.WIN;
    const elapsed = Date.now() - this.startTime;
    if (this.messageLabel) {
      this.messageLabel.string = `过关！用时 ${(elapsed / 1000).toFixed(1)}秒`;
    }
    // Emit event for UI to show result screen
    this.node.emit('game-win', { time: elapsed, words: this.matchedWords.size });
  }

  private onLose(): void {
    this.state = GameState.LOSE;
    if (this.messageLabel) {
      this.messageLabel.string = '槽位已满，游戏失败！';
    }
    this.node.emit('game-lose');
  }

  /**
   * Use item: remove last letter from combo.
   */
  useRemoveItem(): boolean {
    if (!this.comboModel || this.comboModel.occupiedCount === 0) return false;
    const lastSlot = [...this.comboModel.slots].reverse().find(s => s !== null);
    if (!lastSlot) return false;
    this.comboModel.removeTile(lastSlot.id);
    this.boardModel?.returnTile(lastSlot.id);
    this.renderBoard();
    this.renderCombo();
    return true;
  }

  /**
   * Use item: shuffle board letters.
   */
  useShuffleItem(): void {
    this.boardModel?.shuffle();
    this.renderBoard();
  }

  // --- Rendering stubs (implement with actual Cocos nodes) ---
  private renderBoard(): void {
    // TODO: Update board node children based on boardModel.tiles
    // Each visible tile gets a node at its (row, col) position
  }

  private renderCombo(): void {
    // TODO: Update combo node children based on comboModel.slots
  }
}
