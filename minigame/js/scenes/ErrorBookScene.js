import { BaseScene } from './BaseScene';
import { Theme } from '../theme.js';

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
    this.maxScrollY = Math.max(0, totalH - h);
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
    // 仙气背景 - 错题本专用
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#F3E5F5');      // 浅紫仙气
    bg.addColorStop(0.5, '#E1BEE7');    // 中紫
    bg.addColorStop(1, '#CE93D8');      // 深紫
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // 云雾装饰
    this.drawCloudMist(ctx, w, h);

    this.buttons = [];
    this.drawBackButton(ctx, 10, 10, () => {
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
    // 修仙风格标题
    this.drawTitle(ctx, '错题本', w / 2, 45, 22, Theme.colors.text.primary);

    if (this.wrongWords.length === 0) {
      this.drawSubTitle(ctx, '暂无错词，继续加油！', w / 2, h / 2);
      return;
    }

    this.drawSubTitle(ctx, `共 ${this.wrongWords.length} 个错词`, 20, 65);

    this.addButton(w - 120, 50, 100, 30, '开始复习', '#9C27B0', () => {
      this.reviewMode = true;
      this.reviewIndex = 0;
      this.reviewAnswer = false;
    });

    const startY = 80;
    const itemH = 60;

    this.wrongWords.forEach((word, i) => {
      const y = startY + i * itemH;
      if (y > h - 20) return;

      // 灵气卡片
      this.drawMenuCard(ctx, 15, y, w - 30, itemH - 8, {
        bgTop: '#FFFFFF',
        bgBottom: '#FAFAFA',
        border: '#E8E8E8',
        spiritPattern: '#9C27B0',
      });

      ctx.font = `bold 18px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.primary;
      ctx.textAlign = 'left';
      ctx.fillText(word.word, 30, y + 22);

      ctx.font = `13px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText(word.meaning, 30, y + 44);

      // 错误次数 - 灵气标记
      ctx.font = `12px ${Theme.fonts.primary}`;
      ctx.fillStyle = '#FF6B6B';
      ctx.textAlign = 'right';
      ctx.fillText(`×${word.wrongCount || 1}`, w - 30, y + 30);
    });
  }

  renderReview(ctx, w, h) {
    if (this.reviewIndex >= this.wrongWords.length) {
      this.drawTitle(ctx, '错词已全部复习完毕！', w / 2, h / 2, 18, '#4CAF50');
      return;
    }

    const word = this.wrongWords[this.reviewIndex];
    const cardW = w * 0.85;
    const cardH = 260;
    const cardX = (w - cardW) / 2;
    const cardY = h * 0.2;

    this.drawTitle(ctx, `复习 ${this.reviewIndex + 1}/${this.wrongWords.length}`, w / 2, 45, 16, Theme.colors.text.secondary);

    // 灵气卡片
    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: '#9C27B0',
      glow: '#9C27B0',
    });

    ctx.font = `bold 40px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.textAlign = 'center';
    ctx.fillText(word.word, w / 2, cardY + 80);

    if (this.reviewAnswer) {
      ctx.font = `22px ${Theme.fonts.primary}`;
      ctx.fillStyle = '#9C27B0';
      ctx.fillText(word.meaning, w / 2, cardY + 125);

      if (word.phonetic) {
        ctx.font = `16px sans-serif`;
        ctx.fillStyle = Theme.colors.text.muted;
        ctx.fillText(word.phonetic, w / 2, cardY + 155);
      }
    }

    this.buttons = [];
    if (!this.reviewAnswer) {
      this.addButton(w / 2 - 55, cardY + cardH - 55, 110, 38, '显示答案', '#9C27B0', () => {
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

    this.drawBackButton(ctx, 10, 10, () => {
      this.reviewMode = false;
    });
  }

  saveWrongWords() {
    try {
      wx.setStorageSync('wrong_words', JSON.stringify(this.wrongWords));
    } catch (e) {}
  }
}
