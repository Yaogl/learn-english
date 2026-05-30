import { BaseScene } from './BaseScene';
import { loadWrongWords, saveWrongWords as persistWrongWords } from '../data/WrongWordStore.js';
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
    this.reloadWrongWords();
    this.reviewMode = false;
    this.reviewIndex = 0;
    this.reviewAnswer = false;
    this.scrollY = 0;
    this.maxScrollY = 0;
  }

  reloadWrongWords() {
    this.wrongWords = loadWrongWords();
  }

  loadWrongWords() {
    return loadWrongWords();
  }

  render(ctx, w, h) {
    this.drawPageBackground(ctx, w, h);
    this.buttons = [];

    if (!this.reviewMode) {
      this.reloadWrongWords();
    }

    const onBack = () => {
      if (this.reviewMode) {
        this.reviewMode = false;
      } else {
        this.manager.switchTo('mainMenu');
      }
    };

    if (this.reviewMode) {
      this.drawBackButton(ctx, 10, 10, onBack);
      this.renderReview(ctx, w, h);
    } else {
      const { headerBottom } = this.drawPageHeader(ctx, w, '错题本', onBack);
      this.renderList(ctx, w, h, headerBottom);
    }

    this.renderButtons(ctx);
  }

  renderList(ctx, w, h, headerBottom) {
    if (this.wrongWords.length === 0) {
      this.drawSubTitle(ctx, '暂无错词，继续加油！', w / 2, h / 2);
      return;
    }

    const gap = Theme.layout.gap;
    const subY = headerBottom + gap.sm + Theme.fonts.sizes.caption / 2;
    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.secondary;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`共 ${this.wrongWords.length} 个错词`, 20, subY);
    ctx.textAlign = 'right';
    ctx.fillStyle = Theme.colors.button.purple;
    ctx.fillText('点击错词 · 斩心魔修复', w - 20, subY);

    const btnY = Theme.layout.backBtn.y;
    this.addButton(w - 120, btnY, 100, Theme.layout.backBtn.h, '开始复习', Theme.colors.button.purple, () => {
      this.reviewMode = true;
      this.reviewIndex = 0;
      this.reviewAnswer = false;
    });

    const startY = subY + Theme.fonts.sizes.caption / 2 + gap.lg;
    const itemH = 60;
    this.maxScrollY = Math.max(0, startY + this.wrongWords.length * itemH - h);

    this.wrongWords.forEach((word, i) => {
      const y = startY + i * itemH - this.scrollY;
      if (y + itemH < startY || y > h - 20) return;

      const cardH = itemH - 8;
      this.drawMenuCard(ctx, 15, y, w - 30, cardH, {
        bgTop: Theme.colors.card.bgTop,
        bgBottom: Theme.colors.card.bgBottom,
        border: Theme.colors.button.purple,
        spiritPattern: Theme.colors.button.purple,
      });

      ctx.font = `bold 18px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.primary;
      ctx.textAlign = 'left';
      ctx.fillText(word.word, 30, y + 22);

      ctx.font = `13px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText(word.meaning, 30, y + 44);

      ctx.font = `12px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.button.purple;
      ctx.textAlign = 'right';
      ctx.fillText('👿 斩心魔', w - 70, y + 22);

      ctx.fillStyle = Theme.colors.button.danger;
      ctx.fillText(`×${word.wrongCount || 1}`, w - 30, y + 44);

      this.addButton(15, y, w - 30, cardH, '', null, () => {
        this.startFixWord(word);
      });
    });
  }

  /** 点击错词：进入心魔关（故事 → 记忆 → 拼写） */
  startFixWord(word) {
    this.manager.switchTo('game', { fromErrorBook: true, word });
  }

  renderReview(ctx, w, h) {
    if (this.reviewIndex >= this.wrongWords.length) {
      this.drawTitle(ctx, '错词已全部复习完毕！', w / 2, h / 2, 18, Theme.colors.button.primary);
      return;
    }

    const word = this.wrongWords[this.reviewIndex];
    const cardW = w * 0.85;
    const cardH = 260;
    const cardX = (w - cardW) / 2;
    const cardY = h * 0.2;

    const back = Theme.layout.backBtn;
    const titleSize = 16;
    const titleY = back.y + back.h + Theme.layout.gap.lg + titleSize / 2;
    this.drawTitle(ctx, `复习 ${this.reviewIndex + 1}/${this.wrongWords.length}`, w / 2, titleY, titleSize, Theme.colors.text.secondary);

    // 灵气卡片
    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: Theme.colors.button.purple,
      glow: Theme.colors.button.purple,
    });

    ctx.font = `bold 40px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.textAlign = 'center';
    ctx.fillText(word.word, w / 2, cardY + 80);

    if (this.reviewAnswer) {
      ctx.font = `22px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.button.purple;
      ctx.fillText(word.meaning, w / 2, cardY + 125);

      if (word.phonetic) {
        ctx.font = `16px sans-serif`;
        ctx.fillStyle = Theme.colors.text.muted;
        ctx.fillText(word.phonetic, w / 2, cardY + 155);
      }
    }

    this.buttons = [];
    if (!this.reviewAnswer) {
      this.addButton(w / 2 - 55, cardY + cardH - 55, 110, 38, '显示答案', Theme.colors.button.purple, () => {
        this.reviewAnswer = true;
      });
    } else {
      this.addButton(w / 2 - 115, cardY + cardH - 55, 108, 38, '记住了', Theme.colors.button.primary, () => {
        this.wrongWords.splice(this.reviewIndex, 1);
        this.saveWrongWords();
        if (this.reviewIndex >= this.wrongWords.length) {
          this.reviewMode = false;
        } else {
          this.reviewAnswer = false;
        }
      });
      this.addButton(w / 2 + 7, cardY + cardH - 55, 108, 38, '还不会', Theme.colors.button.danger, () => {
        this.reviewIndex++;
        this.reviewAnswer = false;
      });
    }

    this.drawBackButton(ctx, 10, 10, () => {
      this.reviewMode = false;
    });
  }

  saveWrongWords() {
    persistWrongWords(this.wrongWords);
  }
}
