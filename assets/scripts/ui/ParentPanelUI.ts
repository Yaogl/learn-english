import { _decorator, Component, Node, Label, director } from 'cc';
import { StorageManager } from '../data/StorageManager';
import { ErrorBook } from '../data/ErrorBook';

const { ccclass, property } = _decorator;

@ccclass('ParentPanelUI')
export class ParentPanelUI extends Component {
  @property(Label)
  statsLabel: Label = null!;

  @property(Label)
  errorTopLabel: Label = null!;

  @property(Node)
  btnBack: Node = null!;

  @property(Node)
  passwordPanel: Node = null!;

  @property(Label)
  passwordInput: Label = null!;

  private passwordCorrect = false;

  start() {
    this.btnBack?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('MainMenu');
    });

    const savedPassword = StorageManager.get('parentPassword', '');
    if (savedPassword) {
      this.passwordPanel.active = true;
      this.showStats();
    } else {
      this.passwordPanel.active = false;
      this.showStats();
    }
  }

  private showStats(): void {
    const totalWords = StorageManager.getTotalWordsCleared();
    const errorWords = ErrorBook.getTotalCount();
    const masteredWords = ErrorBook.getMasteredCount();
    const topErrors = ErrorBook.getTopErrorWords(10);

    this.statsLabel.string = [
      `总消除单词数: ${totalWords}`,
      `已掌握单词: ${masteredWords}`,
      `错题本单词: ${errorWords}`,
    ].join('\n');

    if (topErrors.length > 0) {
      this.errorTopLabel.string = '易错单词 TOP 10:\n' +
        topErrors.map((w, i) => `${i + 1}. ${w.word} - ${w.meaning} (${w.wrongCount}次)`).join('\n');
    } else {
      this.errorTopLabel.string = '暂无易错单词';
    }
  }
}
