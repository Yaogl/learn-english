import { _decorator, Component, Node, Label, director, Color, Sprite, UITransform, Vec3 } from 'cc';
import { DataLoader } from '../data/DataLoader';
import { LevelGenerator } from '../data/LevelGenerator';
import { getLevelParams } from '../data/LevelConfig';
import { StorageManager } from '../data/StorageManager';
import { GameState, LetterTile, LevelData, LevelSource } from '../data/Types';
import { GameManager } from '../game/GameManager';
import { ItemManager, ItemType } from '../game/ItemManager';
import { AdManager } from '../utils/AdManager';

const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {
  @property(Node)
  boardContainer: Node = null!;

  @property(Node)
  comboContainer: Node = null!;

  @property(Label)
  wordDisplayLabel: Label = null!;

  @property(Label)
  timerLabel: Label = null!;

  @property(Label)
  messageLabel: Label = null!;

  @property(Label)
  scoreLabel: Label = null!;

  @property(Node)
  btnRemoveItem: Node = null!;

  @property(Node)
  btnShuffleItem: Node = null!;

  @property(Node)
  btnHintItem: Node = null!;

  @property(Node)
  resultPanel: Node = null!;

  @property(Label)
  resultLabel: Label = null!;

  @property(Node)
  btnNextLevel: Node = null!;

  @property(Node)
  btnRetry: Node = null!;

  @property(Node)
  btnBackToMenu: Node = null!;

  private gameManager: GameManager | null = null;
  private levelData: LevelData | null = null;
  private tileNodes: Map<number, Node> = new Map();
  private comboSlotNodes: Node[] = [];
  private itemManager: ItemManager | null = null;

  start() {
    this.resultPanel.active = false;
    this.itemManager = new ItemManager();

    // Get level params from director
    const params = (director as any)._levelParams;
    if (!params) {
      director.loadScene('MainMenu');
      return;
    }

    this.initLevel(params);

    // Listen for game events
    this.node.on('game-win', this.onGameWin, this);
    this.node.on('game-lose', this.onGameLose, this);

    // Button handlers
    this.btnBackToMenu?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('MainMenu');
    });

    this.btnRetry?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('Game');
    });

    this.btnNextLevel?.on(Node.EventType.TOUCH_END, () => {
      this.goToNextLevel();
    });

    this.btnRemoveItem?.on(Node.EventType.TOUCH_END, () => {
      this.handleItemUse(ItemType.REMOVE_LETTER);
    });

    this.btnShuffleItem?.on(Node.EventType.TOUCH_END, () => {
      this.handleItemUse(ItemType.SHUFFLE);
    });

    this.btnHintItem?.on(Node.EventType.TOUCH_END, () => {
      this.handleItemUse(ItemType.WORD_HINT);
    });
  }

  private initLevel(params: any): void {
    const db = DataLoader.getInstance();
    if (!db) return;

    let words;
    if (params.source === LevelSource.TEXTBOOK) {
      words = db.getUnitWords(params.grade, params.semester, params.unit);
    } else {
      words = db.getThemeWords(params.themeId);
    }

    if (words.length === 0) return;

    const levelParams = getLevelParams(params.stage || 1);
    this.levelData = LevelGenerator.generate(
      words,
      levelParams.wordCount,
      levelParams.bufferSlots,
      levelParams.memoryTime
    );

    // Setup game manager
    this.gameManager = this.getComponent(GameManager) || this.addComponent(GameManager);
    this.gameManager.wordDisplayLabel = this.wordDisplayLabel;
    this.gameManager.timerLabel = this.timerLabel;
    this.gameManager.messageLabel = this.messageLabel;
    this.gameManager.boardNode = this.boardContainer;
    this.gameManager.comboNode = this.comboContainer;

    // Create combo slot nodes
    this.createComboSlots(this.levelData.maxSlots);

    // Start level
    this.gameManager.startLevel(this.levelData);

    // After memory phase, render board
    this.scheduleOnce(() => {
      this.renderBoard();
    }, this.levelData.memoryTime + 0.5);
  }

  private createComboSlots(count: number): void {
    this.comboContainer.removeAllChildren();
    this.comboSlotNodes = [];
    for (let i = 0; i < count; i++) {
      const slotNode = new Node(`ComboSlot_${i}`);
      slotNode.addComponent(UITransform);
      const spacing = 60;
      const startX = -(count * spacing) / 2 + spacing / 2;
      slotNode.setPosition(new Vec3(startX + i * spacing, 0, 0));
      this.comboContainer.addChild(slotNode);
      this.comboSlotNodes.push(slotNode);
    }
  }

  private renderBoard(): void {
    if (!this.levelData) return;
    this.boardContainer.removeAllChildren();
    this.tileNodes.clear();

    for (const tile of this.levelData.boardLetters) {
      if (!tile.visible) continue;
      const tileNode = this.createTileNode(tile);
      this.boardContainer.addChild(tileNode);
      this.tileNodes.set(tile.id, tileNode);
    }
  }

  private createTileNode(tile: LetterTile): Node {
    const node = new Node(`Tile_${tile.id}`);
    const uiTransform = node.addComponent(UITransform);
    uiTransform.setContentSize(50, 50);

    const label = node.addComponent(Label);
    label.string = tile.char.toUpperCase();
    label.fontSize = 32;
    label.color = new Color(50, 50, 50, 255);

    const spacing = 55;
    const cols = Math.ceil(Math.sqrt(this.levelData!.boardLetters.length * 1.5));
    const startX = -(cols * spacing) / 2 + spacing / 2;
    node.setPosition(new Vec3(
      startX + tile.col * spacing,
      -tile.row * spacing + 100,
      0
    ));

    node.on(Node.EventType.TOUCH_END, () => {
      this.gameManager?.onBoardTileClicked(tile.id);
      node.active = false;
    });

    return node;
  }

  private onGameWin(data: any): void {
    this.resultPanel.active = true;
    this.resultLabel.string = `过关！\n用时 ${(data.time / 1000).toFixed(1)}秒\n消除 ${data.words} 个单词`;
    this.btnNextLevel.active = true;
    this.btnRetry.active = false;

    const params = (director as any)._levelParams;
    if (params) {
      const unitKey = `${params.grade}-${params.semester}-${params.unit}`;
      StorageManager.setLevelCompleted(unitKey, params.stage);
      StorageManager.addWordsCleared(data.words);
    }
  }

  private onGameLose(): void {
    this.resultPanel.active = true;
    this.resultLabel.string = '槽位已满，游戏失败！';
    this.btnNextLevel.active = false;
    this.btnRetry.active = true;
  }

  private async handleItemUse(type: ItemType): Promise<void> {
    if (!this.itemManager || !this.gameManager) return;

    if (this.itemManager.getTotalUsesRemaining(type) > 0) {
      this.itemManager.useItem(type);
      this.applyItem(type);
    } else {
      const watched = await AdManager.showRewardedAd();
      if (watched) {
        this.itemManager.addPaidUses(type, 1);
        this.itemManager.useItem(type);
        this.applyItem(type);
      }
    }
  }

  private applyItem(type: ItemType): void {
    switch (type) {
      case ItemType.REMOVE_LETTER:
        this.gameManager!.useRemoveItem();
        break;
      case ItemType.SHUFFLE:
        this.gameManager!.useShuffleItem();
        break;
      case ItemType.WORD_HINT:
        // TODO: implement highlight in GameManager
        break;
      case ItemType.EXTRA_TIME:
        // TODO: implement in GameManager
        break;
    }
  }

  private goToNextLevel(): void {
    const params = (director as any)._levelParams;
    if (params) {
      params.stage = (params.stage || 1) + 1;
      (director as any)._levelParams = params;
    }
    director.loadScene('Game');
  }
}
