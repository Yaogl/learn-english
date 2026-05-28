import { _decorator, Component, Node, Label, ScrollView, director } from 'cc';
import { ErrorBook, ErrorWord } from '../data/ErrorBook';

const { ccclass, property } = _decorator;

@ccclass('ErrorBookUI')
export class ErrorBookUI extends Component {
  @property(Label)
  titleLabel: Label = null!;

  @property(Node)
  contentNode: Node = null!;

  @property(Node)
  btnBack: Node = null!;

  @property(Node)
  btnReview: Node = null!;

  start() {
    this.btnBack?.on(Node.EventType.TOUCH_END, () => {
      director.loadScene('MainMenu');
    });

    this.btnReview?.on(Node.EventType.TOUCH_END, () => {
      this.startReviewMode();
    });

    this.showErrorList();
  }

  private showErrorList(): void {
    this.contentNode.removeAllChildren();
    const errors = ErrorBook.getErrorWords();

    this.titleLabel.string = `错题本 (${errors.length}个)`;

    for (const word of errors) {
      const row = new Node('ErrorWord');
      const label = row.addComponent(Label);
      label.string = `${word.word} - ${word.meaning} (错误${word.wrongCount}次)`;
      label.fontSize = 20;
      this.contentNode.addChild(row);
    }
  }

  private startReviewMode(): void {
    const errors = ErrorBook.getErrorWords();
    if (errors.length === 0) return;

    (director as any)._levelParams = {
      source: 'errorbook',
      words: errors.map((e) => ({ word: e.word, meaning: e.meaning })),
    };
    director.loadScene('Game');
  }
}
