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
    // 加载背景图
    if (!this._bgImg) {
      this._bgImg = wx.createImage();
      this._bgImg.src = 'assets/imgs/storyForestBg.png';
    }
  }

  reloadWrongWords() {
    this.wrongWords = loadWrongWords();
  }

  loadWrongWords() {
    return loadWrongWords();
  }

  /** 森林背景 + 轻蒙层 */
  _drawBg(ctx, w, h) {
    ctx.fillStyle = '#FFF9E8';
    ctx.fillRect(0, 0, w, h);
    if (this._bgImg && this._bgImg.width > 0) {
      const img = this._bgImg;
      const imgR = img.width / img.height;
      const scrR = w / h;
      let sx, sy, sw, sh;
      if (imgR > scrR) { sh = img.height; sw = sh * scrR; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / scrR; sx = 0; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }
    ctx.fillStyle = 'rgba(255,249,232,0.2)';
    ctx.fillRect(0, 0, w, h);
    this.drawFallingPetals(ctx, w, h);
  }

  render(ctx, w, h) {
    this._drawBg(ctx, w, h);
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
      this.renderListPage(ctx, w, h, onBack);
    }

    this.renderButtons(ctx);
  }

  /** 错词列表页 */
  renderListPage(ctx, w, h, onBack) {
    const t = this.animTime || 0;

    // 返回按钮
    this.drawBackButton(ctx, 10, 10, onBack);

    // 标题
    const titleY = Theme.layout.safeTop + 10;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const pulse = 0.85 + Math.sin(t * 2) * 0.15;
    ctx.font = `bold ${Theme.fonts.sizes.title}px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#3D6B4F';
    ctx.shadowColor = '#70E8D0';
    ctx.shadowBlur = 10 * pulse;
    ctx.fillText('错题本', w / 2, titleY);
    ctx.shadowBlur = 0;
    ctx.restore();

    if (this.wrongWords.length === 0) {
      ctx.font = `${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
      ctx.fillStyle = 'rgba(61,107,79,0.5)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('暂无错词，继续加油！', w / 2, h / 2);
      return;
    }

    // 副标题
    const subY = titleY + 30;
    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = 'rgba(61,107,79,0.5)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`共 ${this.wrongWords.length} 个错词`, 20, subY);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#C4A8E0';
    ctx.fillText('点击错词修复', w - 20, subY);

    // 开始复习按钮
    const btnY = Theme.layout.backBtn.y;
    this.addButton(w - 110, btnY, 96, Theme.layout.backBtn.h, '开始复习', '#C4A8E0', () => {
      this.reviewMode = true;
      this.reviewIndex = 0;
      this.reviewAnswer = false;
    });

    // 错词列表
    const startY = subY + 20;
    const itemH = 62;
    this.maxScrollY = Math.max(0, startY + this.wrongWords.length * itemH - h);

    // 马卡龙色池
    const palettes = [
      ['#FFC8DD', '#FF9BB5', 'rgba(220,120,150,0.4)'],
      ['#E8D5F5', '#C4A8E0', 'rgba(160,120,180,0.4)'],
      ['#FFD5C8', '#FFAA88', 'rgba(210,140,100,0.4)'],
      ['#C8E6FF', '#7CB9E8', 'rgba(100,150,200,0.4)'],
      ['#BCF6E7', '#51C9B0', 'rgba(56,168,144,0.4)'],
      ['#FFE89C', '#F5C842', 'rgba(200,160,40,0.4)'],
    ];

    this.wrongWords.forEach((word, i) => {
      const y = startY + i * itemH - this.scrollY;
      if (y + itemH < startY || y > h - 20) return;

      const pal = palettes[i % palettes.length];
      const [topC, botC, borderC] = pal;
      const cardH = itemH - 8;

      // 入场动画
      const delay = i * 0.06;
      const slideP = Math.min(1, Math.max(0, (t - delay) / 0.3));
      ctx.save();
      ctx.globalAlpha = slideP;
      ctx.translate(0, (1 - slideP) * 20);

      // 卡片
      ctx.shadowColor = topC;
      ctx.shadowBlur = 6;
      const cg = ctx.createLinearGradient(15, y, 15, y + cardH);
      cg.addColorStop(0, 'rgba(255,255,255,0.8)');
      cg.addColorStop(1, topC + '44');
      ctx.fillStyle = cg;
      this.roundRect(ctx, 15, y, w - 30, cardH, 12);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 左侧彩色竖条
      ctx.save();
      ctx.beginPath();
      this.roundRect(ctx, 15, y, 5, cardH, 3);
      ctx.clip();
      ctx.fillStyle = botC;
      ctx.fillRect(15, y, 5, cardH);
      ctx.restore();

      // 边框
      ctx.strokeStyle = borderC;
      ctx.lineWidth = 1;
      this.roundRect(ctx, 15, y, w - 30, cardH, 12);
      ctx.stroke();

      // 单词
      ctx.font = `bold 18px ${Theme.fonts.primary}`;
      ctx.fillStyle = '#3D6B4F';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(word.word, 30, y + 22);

      // 释义
      ctx.font = `13px ${Theme.fonts.primary}`;
      ctx.fillStyle = 'rgba(61,107,79,0.5)';
      ctx.fillText(word.meaning, 30, y + 44);

      // 修复按钮提示
      ctx.font = `12px ${Theme.fonts.primary}`;
      ctx.fillStyle = botC;
      ctx.textAlign = 'right';
      ctx.fillText('修复', w - 60, y + 22);

      // 错误次数
      ctx.fillStyle = '#ef4444';
      ctx.font = `bold 12px ${Theme.fonts.primary}`;
      ctx.fillText(`×${word.wrongCount || 1}`, w - 30, y + 44);

      ctx.restore();

      this.addButton(15, y, w - 30, cardH, '', null, () => {
        this.startFixWord(word);
      });
    });
  }

  /** 点击错词：进入心魔关 */
  startFixWord(word) {
    this.manager.switchTo('game', { fromErrorBook: true, word });
  }

  /** 复习模式 */
  renderReview(ctx, w, h) {
    const t = this.animTime || 0;

    if (this.reviewIndex >= this.wrongWords.length) {
      ctx.font = `bold ${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
      ctx.fillStyle = '#3D6B4F';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('错词已全部复习完毕！', w / 2, h / 2);
      return;
    }

    const word = this.wrongWords[this.reviewIndex];
    const cardW = w * 0.85;
    const cardH = 280;
    const cardX = (w - cardW) / 2;
    const cardY = h * 0.22;

    // 进度标题
    const titleY = Theme.layout.safeTop + 20;
    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = 'rgba(61,107,79,0.5)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`复习 ${this.reviewIndex + 1}/${this.wrongWords.length}`, w / 2, titleY);

    // 马卡龙复习卡片
    const pal = [['#E8D5F5', '#C4A8E0', 'rgba(160,120,180,0.4)']];
    const [topC, botC, borderC] = pal[0];

    ctx.save();
    const cardP = Math.min(1, t / 0.3);
    ctx.globalAlpha = cardP;
    ctx.translate(0, (1 - cardP) * 20);

    ctx.shadowColor = topC;
    ctx.shadowBlur = 14;
    const cg = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardH);
    cg.addColorStop(0, 'rgba(255,255,255,0.85)');
    cg.addColorStop(0.5, 'rgba(255,255,255,0.65)');
    cg.addColorStop(1, topC + '55');
    ctx.fillStyle = cg;
    this.roundRect(ctx, cardX, cardY, cardW, cardH, 18);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 顶部装饰条
    const dg = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY);
    dg.addColorStop(0, topC);
    dg.addColorStop(1, botC);
    ctx.fillStyle = dg;
    this.roundRect(ctx, cardX, cardY, cardW, 4, 2);
    ctx.fill();

    // 边框
    ctx.strokeStyle = borderC;
    ctx.lineWidth = 1.2;
    this.roundRect(ctx, cardX, cardY, cardW, cardH, 18);
    ctx.stroke();

    // 单词
    ctx.font = `bold 42px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#3D6B4F';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(word.word, w / 2, cardY + 80);

    // 释义
    if (this.reviewAnswer) {
      ctx.font = `bold 22px ${Theme.fonts.primary}`;
      ctx.fillStyle = botC;
      ctx.fillText(word.meaning, w / 2, cardY + 130);

      if (word.phonetic) {
        ctx.font = `16px sans-serif`;
        ctx.fillStyle = 'rgba(61,107,79,0.5)';
        ctx.fillText(word.phonetic, w / 2, cardY + 160);
      }
    }
    ctx.restore();

    // 按钮
    this.buttons = [];
    if (!this.reviewAnswer) {
      this.addButton(w / 2 - 55, cardY + cardH - 55, 110, 38, '显示答案', '#C4A8E0', () => {
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
  }

  saveWrongWords() {
    persistWrongWords(this.wrongWords);
  }
}
