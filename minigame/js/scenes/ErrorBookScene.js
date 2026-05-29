import { BaseScene } from './BaseScene';

export class ErrorBookScene extends BaseScene {
  constructor() {
    super();
    this.wrongWords = [];
    this.reviewMode = false;
    this.reviewIndex = 0;
    this.reviewAnswer = false;
  }

  onEnter() {
    super.onEnter();
    this.wrongWords = this.loadWrongWords();
    this.reviewMode = false;
    this.reviewIndex = 0;
    this.reviewAnswer = false;
    const itemH = 60;
    const totalH = 80 + this.wrongWords.length * itemH;
    this.maxScrollY = Math.max(0, totalH - 800);
  }

  loadWrongWords() {
    try {
      const data = wx.getStorageSync('wrong_words');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  render(ctx, w, h) {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#E3F2FD');
    bg.addColorStop(1, '#BBDEFB');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    this.buttons = [];
    this.addButton(10, 10, 60, 30, '← 返回', 'rgba(0,0,0,0.3)', () => {
      if (this.reviewMode) {
        this.reviewMode = false;
      } else {
        this.manager.switchTo('mainMenu');
      }
    });

    if (this.reviewMode) {
      this.renderReview(ctx, w, h);
    } else {
      this.renderList(ctx, w, h);
    }

    this.renderButtons(ctx);
  }

  renderList(ctx, w, h) {
    this.drawTitle(ctx, '错题本', w / 2, 45, 22, '#5D4037');

    if (this.wrongWords.length === 0) {
      ctx.font = '16px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.textAlign = 'center';
      ctx.fillText('暂无错词，继续加油！', w / 2, h / 2);
      return;
    }

    ctx.font = '13px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#999';
    ctx.textAlign = 'left';
    ctx.fillText(`共 ${this.wrongWords.length} 个错词`, 20, 65);

    this.addButton(w - 120, 50, 100, 30, '开始复习', '#FF9800', () => {
      this.reviewMode = true;
      this.reviewIndex = 0;
      this.reviewAnswer = false;
    });

    const startY = 80;
    const itemH = 60;

    this.wrongWords.forEach((word, i) => {
      const y = startY + i * itemH;
      if (y > h - 20) return;

      this.drawMenuCard(ctx, 15, y, w - 30, itemH - 8, {
        bgTop: '#fff',
        bgBottom: '#fafafa',
        border: '#E8E8E8',
      });

      ctx.font = 'bold 18px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'left';
      ctx.fillText(word.word, 30, y + 22);

      ctx.font = '13px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(word.meaning, 30, y + 44);

      ctx.font = '12px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#FF6B6B';
      ctx.textAlign = 'right';
      ctx.fillText(`×${word.wrongCount || 1}`, w - 30, y + 30);
    });
  }

  renderReview(ctx, w, h) {
    if (this.reviewIndex >= this.wrongWords.length) {
      ctx.font = '18px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#4CAF50';
      ctx.textAlign = 'center';
      ctx.fillText('错词已全部复习完毕！', w / 2, h / 2);
      return;
    }

    const word = this.wrongWords[this.reviewIndex];
    const cardW = w * 0.85;
    const cardH = 260;
    const cardX = (w - cardW) / 2;
    const cardY = h * 0.2;

    this.drawTitle(ctx, `复习 ${this.reviewIndex + 1}/${this.wrongWords.length}`, w / 2, 45, 16, '#666');

    this.drawCard(ctx, cardX, cardY, cardW, cardH, { border: '#FF9800' });

    ctx.font = 'bold 40px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(word.word, w / 2, cardY + 80);

    if (this.reviewAnswer) {
      ctx.font = '22px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#FF9800';
      ctx.fillText(word.meaning, w / 2, cardY + 125);

      if (word.phonetic) {
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#999';
        ctx.fillText(word.phonetic, w / 2, cardY + 155);
      }
    }

    this.buttons = [];
    if (!this.reviewAnswer) {
      this.addButton(w / 2 - 55, cardY + cardH - 55, 110, 38, '显示答案', '#4A90D9', () => {
        this.reviewAnswer = true;
      });
    } else {
      this.addButton(w / 2 - 115, cardY + cardH - 55, 108, 38, '记住了', '#4CAF50', () => {
        this.wrongWords.splice(this.reviewIndex, 1);
        this.saveWrongWords();
        if (this.reviewIndex >= this.wrongWords.length) {
          this.reviewMode = false;
        } else {
          this.reviewAnswer = false;
        }
      });
      this.addButton(w / 2 + 7, cardY + cardH - 55, 108, 38, '还不会', '#FF6B6B', () => {
        this.reviewIndex++;
        this.reviewAnswer = false;
      });
    }

    this.addButton(10, 10, 60, 30, '← 返回', 'rgba(0,0,0,0.3)', () => {
      this.reviewMode = false;
    });
  }

  saveWrongWords() {
    try {
      wx.setStorageSync('wrong_words', JSON.stringify(this.wrongWords));
    } catch (e) {}
  }
}
