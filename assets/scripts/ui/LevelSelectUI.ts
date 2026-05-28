import { _decorator, Component, Node, Label, ScrollView, director, Prefab, instantiate } from 'cc';
import { DataLoader } from '../data/DataLoader';
import { StorageManager } from '../data/StorageManager';
import { LevelSource } from '../data/Types';

const { ccclass, property } = _decorator;

@ccclass('LevelSelectUI')
export class LevelSelectUI extends Component {
  @property(Label)
  titleLabel: Label = null!;

  @property(Node)
  contentNode: Node = null!;

  @property(Prefab)
  levelButtonPrefab: Prefab = null!;

  @property(Node)
  btnBack: Node = null!;

  private currentGrade: number = 3;
  private currentSemester: number = 1;

  start() {
    this.btnBack?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('MainMenu');
    });
    this.showUnitList();
  }

  private showUnitList(): void {
    const db = DataLoader.getInstance();
    if (!db) return;

    this.contentNode.removeAllChildren();
    this.titleLabel.string = `${this.currentGrade}年级上册`;

    const unitCount = db.getUnitCount(this.currentGrade, this.currentSemester);
    for (let unit = 1; unit <= unitCount; unit++) {
      const words = db.getUnitWords(this.currentGrade, this.currentSemester, unit);
      const unitName = words.length > 0 ? `Unit ${unit}` : `Unit ${unit}`;

      for (let stage = 1; stage <= 10; stage++) {
        const btnNode = this.createLevelButton(unitName, unit, stage);
        this.contentNode.addChild(btnNode);
      }
    }
  }

  private createLevelButton(unitName: string, unit: number, stage: number): Node {
    let btnNode: Node;
    if (this.levelButtonPrefab) {
      btnNode = instantiate(this.levelButtonPrefab);
    } else {
      btnNode = new Node(`Level_${unit}_${stage}`);
    }

    const label = btnNode.getComponent(Label) || btnNode.addComponent(Label);
    const unitKey = `${this.currentGrade}-${this.currentSemester}-${unit}`;
    const completed = StorageManager.getCompletedLevelCount(unitKey);
    const status = completed >= stage ? '✓' : '○';
    label.string = `${unitName} 第${stage}关 ${status}`;

    btnNode.on(Node.EventType.TOUCH_END, () => {
      this.startLevel(unit, stage);
    });

    return btnNode;
  }

  private startLevel(unit: number, stage: number): void {
    (director as any)._levelParams = {
      source: LevelSource.TEXTBOOK,
      grade: this.currentGrade,
      semester: this.currentSemester,
      unit,
      stage,
    };

    director.loadScene('Game');
  }
}
