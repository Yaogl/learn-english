import { _decorator, Component, Node, director, Sprite } from 'cc';
import { RankManager } from '../social/RankManager';

const { ccclass, property } = _decorator;

@ccclass('RankUI')
export class RankUI extends Component {
  @property(Node)
  rankDisplay: Node = null!;

  @property(Node)
  btnBack: Node = null!;

  start() {
    this.btnBack?.on(Node.EventType.TOUCH_END, () => {
      RankManager.hideFriendRank();
      director.loadScene('MainMenu');
    });

    RankManager.showFriendRank();
  }

  onDestroy() {
    RankManager.hideFriendRank();
  }
}
