import { _decorator, Component, Node, Label, director } from 'cc';
import { BattleManager } from '../battle/BattleManager';

const { ccclass, property } = _decorator;

@ccclass('BattleUI')
export class BattleUI extends Component {
  @property(Label)
  statusLabel: Label = null!;

  @property(Label)
  opponentProgressLabel: Label = null!;

  @property(Node)
  btnBack: Node = null!;

  start() {
    this.btnBack?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('MainMenu');
    });

    const launchOptions = (globalThis as any).wx?.getLaunchOptionsSync?.();
    const challengeId = launchOptions?.query?.challengeId;
    if (challengeId) {
      this.joinChallenge(challengeId);
    } else {
      this.showCreateChallenge();
    }
  }

  private showCreateChallenge(): void {
    this.statusLabel.string = '发起挑战';
  }

  private joinChallenge(challengeId: string): void {
    this.statusLabel.string = '接受挑战！';
  }
}
