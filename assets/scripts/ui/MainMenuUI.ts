import { _decorator, Component, Node, director, Label } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('MainMenuUI')
export class MainMenuUI extends Component {
  @property(Node)
  btnStartGame: Node = null!;

  @property(Node)
  btnThemePark: Node = null!;

  @property(Node)
  btnRank: Node = null!;

  @property(Node)
  btnErrorBook: Node = null!;

  @property(Node)
  btnParentCenter: Node = null!;

  start() {
    this.btnStartGame?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('LevelSelect');
    });

    this.btnThemePark?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('ThemeSelect');
    });

    this.btnRank?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('Rank');
    });

    this.btnErrorBook?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('ErrorBook');
    });

    this.btnParentCenter?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('ParentCenter');
    });
  }
}
