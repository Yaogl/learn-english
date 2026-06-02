import { BaseScene } from './BaseScene';
import { getStageData, getRealmByStage } from '../data/LevelData';
import {
  addWrongWordsOnFail,
  buildErrorBookStageData,
  removeWrongWord,
} from '../data/WrongWordStore.js';
import { saveCompletedStage } from '../data/ProgressStore.js';
import { Theme } from '../theme.js';

/**
 * 闯关模式 - 核心玩法
 * 流程：故事字幕 → 记忆单词（音标+例句+30秒） → 字母平铺消除
 */
export class GameScene extends BaseScene {
  constructor() {
    super();
    this.state = 'story'; // story, memory, playing, win, lose
    this.stage = 1;
    this.stageData = null;

    // 故事阶段
    this.storyScrollY = 0;
    this.storyAlpha = 0;

    // 记忆阶段
    this.memoryTimer = 0;
    this.memoryWords = [];
    this.memoryIndex = 0; // 当前显示第几个单词

    // 游戏阶段
    this.letters = [];
    this.slots = [];
    this.maxSlots = 7;

    // 动画
    this.flyAnimations = [];
    this.clearAnimations = [];
    this.particles = [];
    this.comboTextAnim = null;
    this.shakeTimer = 0;
    this.winAnim = 0;

    // 布局
    this._letterSize = 0;
    this._letterStartX = 0;
    this._letterStartY = 0;
    this._letterGap = 0;
    this._slotsX = 0;
    this._slotsY = 0;
    this._slotSize = 0;
  }

  onEnter(params) {
    super.onEnter(params);
    this.fromErrorBook = !!(params?.fromErrorBook && params?.word);
    this.errorWord = params?.word || null;

    if (this.fromErrorBook) {
      this.stageData = buildErrorBookStageData(this.errorWord);
      this.stage = 0;
    } else {
      this.stage = params?.stage || 1;
      this.stageData = getStageData(this.stage);
    }

    // 故事阶段
    this.state = 'story';
    this.storyScrollY = 0;
    this.storyAlpha = 0;
    this.storyTypedLen = 0;
    this.storyTypingDone = false;
    this.storyContentScroll = 0;
    this.storyMaxScroll = 0;
    this._storyTouchStartY = 0;

    // 记忆阶段（仅手动点「开始挑战」，不自动跳转）
    this.memoryDuration = 60;
    this.memoryTimer = this.memoryDuration;
    this.memoryWords = this.stageData.words;
    this.memoryIndex = 0;
    this.memoryRound = 1;
    this.memoryMaxRounds = 1;

    // 游戏阶段
    this.letters = [];
    this.slots = [];
    this.targetStrings = this.stageData.words.map(w => w.word);
    this.maxSlots = this.stageData.maxSlots;

    // 动画
    this.flyAnimations = [];
    this.clearAnimations = [];
    this.particles = [];
    this.comboTextAnim = null;
    this.shakeTimer = 0;
    this.winAnim = 0;
    this._wrongWordsSaved = false;

    this.buttons = [];
  }

  _occupiedSlotCount() {
    return this.slots.length + this.flyAnimations.length;
  }

  _canPickLetter() {
    return this.state === 'playing' && this._occupiedSlotCount() < this.maxSlots;
  }

  update(dt) {
    super.update(dt);

    if (this.state === 'story') {
      this.storyAlpha = Math.min(1, this.animTime * 2.5);
      const story = this.stageData.story || '';
      const speed = 10;
      this.storyTypedLen = Math.min(story.length, Math.floor(this.animTime * speed));
      if (this.storyTypedLen >= story.length) this.storyTypingDone = true;
    }

    if (this.state === 'memory') {
      this.memoryTimer = Math.max(0, this.memoryDuration - this.animTime);
    }

    // 飞行动画
    const completed = [];
    this.flyAnimations = this.flyAnimations.filter(a => {
      a.progress += dt * 4;
      a.x = a.fromX + (a.toX - a.fromX) * this.easeOutBack(Math.min(1, a.progress));
      a.y = a.fromY + (a.toY - a.fromY) * this.easeOutBack(Math.min(1, a.progress));
      if (a.progress >= 1) {
        completed.push(a);
        return false;
      }
      return true;
    });
    for (const a of completed) {
      if (this.state !== 'playing') break;
      this.slots.push({
        text: a.text,
        groupSize: a.groupSize,
        isDistractor: !!a.isDistractor,
      });
      this.checkSlotMatch();
    }

    this.clearAnimations = this.clearAnimations.filter(a => {
      a.progress += dt * 3;
      return a.progress < 1;
    });

    if (this.comboTextAnim) {
      this.comboTextAnim.progress += dt * 2.5;
      if (this.comboTextAnim.progress >= 1) this.comboTextAnim = null;
    }

    if (this.shakeTimer > 0) this.shakeTimer -= dt;

    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.life -= 0.02;
      return p.life > 0;
    });

    if (this.state === 'win') {
      this.winAnim += dt;
    }

    // 目标单词字母选完后结算并判胜（干扰字母无需点选）
    if (this.state === 'playing' && this.flyAnimations.length === 0) {
      this._tryCompleteLevel();
    }
  }

  /** 本关目标字母是否已全部选完（不含干扰字母） */
  _isTargetLettersClear() {
    return this.letters.every((l) => l.isDistractor || !l.visible);
  }

  /** 目标完成后隐藏棋盘上残留的干扰字母 */
  _dismissDistractors() {
    this.letters.forEach((l) => {
      if (l.isDistractor) l.visible = false;
    });
  }

  _tryCompleteLevel() {
    if (this.state !== 'playing') return;
    if (!this._isTargetLettersClear()) return;
    if (this.flyAnimations.length > 0) return;

    this._dismissDistractors();
    this._checkLevelComplete();
  }

  _setWin() {
    if (this.state !== 'playing') return;
    this.state = 'win';
    this.winAnim = 0;
    if (this.fromErrorBook && this.errorWord) {
      removeWrongWord(this.errorWord.word);
    } else {
      this.saveProgress();
    }
  }

  /** 目标字母已清完：结算灵槽并判胜 */
  _checkLevelComplete() {
    if (this.state !== 'playing') return;
    if (!this._isTargetLettersClear()) return;
    if (this.flyAnimations.length > 0) return;

    if (this.slots.length === 0) {
      this._setWin();
      return;
    }

    this._runSlotMatches();
    this.slots = this.slots.filter((s) => !s.isDistractor);
    this._runSlotMatches();

    if (this.slots.length > 0) {
      this.slots = [];
    }
    this._setWin();
  }

  /**
   * 生成平铺字母 - 单词字母重复铺满屏幕
   * 例如单词 "got" → 屏幕铺满 g,o,t,g,o,t,g,o,t... 重复多次
   * 孩子反复拼同一个单词，加深记忆
   */
  generateLetters() {
    const allLetters = [];

    // 每个单词的字母重复铺满（约15-20组）
    const repeatCount = 15;
    for (const word of this.targetStrings) {
      for (let r = 0; r < repeatCount; r++) {
        for (const char of word) {
          allLetters.push({ text: char, groupSize: 1, isDistractor: false });
        }
      }
    }

    // 干扰字母：每局 4~5 个，且不与目标单词字母重复
    const targetChars = new Set();
    for (const word of this.targetStrings) {
      for (const ch of word) targetChars.add(ch);
    }
    const pool = 'abcdefghijklmnopqrstuvwxyz'.split('').filter((c) => !targetChars.has(c));
    const distractorCount = Math.min(pool.length, 4 + Math.floor(Math.random() * 2));
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    for (let i = 0; i < distractorCount; i++) {
      allLetters.push({ text: pool[i], groupSize: 1, isDistractor: true });
    }

    // 打乱
    for (let i = allLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
    }

    const cols = Math.min(6, Math.ceil(Math.sqrt(allLetters.length * 1.5)));
    this.letters = allLetters.map((item, i) => ({
      id: i,
      text: item.text,
      groupSize: item.groupSize,
      isDistractor: !!item.isDistractor,
      visible: true,
      gridCol: i % cols,
      gridRow: Math.floor(i / cols),
    }));
    this._letterCols = cols;
  }

  /** 消除成功后：压缩棋盘上可见字母，清空空位 */
  _compactLetterGrid() {
    const cols = this._letterCols || 6;
    const visible = this.letters.filter((l) => l.visible);
    visible.forEach((letter, i) => {
      letter.gridCol = i % cols;
      letter.gridRow = Math.floor(i / cols);
    });
  }

  _getLetterGridPos(letter, letterSize, gap, startX, startY) {
    return {
      x: startX + letter.gridCol * (letterSize + gap),
      y: startY + letter.gridRow * (letterSize + gap),
    };
  }

  render(ctx, w, h) {
    this.drawPageBackground(ctx, w, h);

    if (this.state === 'story') {
      this.renderStory(ctx, w, h);
    } else if (this.state === 'memory') {
      this.renderMemory(ctx, w, h);
    } else if (this.state === 'playing' || this.state === 'win' || this.state === 'lose') {
      this.renderGame(ctx, w, h);
    }

    // 粒子
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.life * 0.8;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (this.comboTextAnim) {
      const a = this.comboTextAnim;
      const scale = 1 + a.progress * 1.2;
      ctx.save();
      ctx.globalAlpha = 1 - a.progress;
      ctx.font = `bold ${30 * scale}px "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = Theme.colors.accent.green;
      ctx.textAlign = 'center';
      ctx.shadowColor = Theme.colors.accent.green;
      ctx.shadowBlur = 20;
      ctx.fillText(a.text, w / 2, h * 0.35 - a.progress * 50);
      ctx.restore();
    }

    if (this.state === 'win' || this.state === 'lose') {
      this.renderResult(ctx, w, h);
    }
  }

  /** 故事卷轴布局参数 */
  _getStoryLayout(w, h) {
    const scrollW = w * 0.9;
    const scrollH = h * 0.58;
    const scrollX = (w - scrollW) / 2;
    const scrollY = h * 0.16;
    const padding = 20;
    const headerH = 96;
    const contentPadTop = 16;
    const contentX = scrollX + padding;
    const contentY = scrollY + headerH + contentPadTop;
    const contentW = scrollW - padding * 2;
    const contentH = scrollH - headerH - contentPadTop - padding;
    return { scrollW, scrollH, scrollX, scrollY, contentX, contentY, contentW, contentH, padding, headerH };
  }

  _buildStoryLines(ctx, text, maxWidth) {
    const chars = text.split('');
    let line = '';
    const lines = [];
    for (const ch of chars) {
      const test = line + ch;
      if (ch === '\n') {
        lines.push(line);
        line = '';
      } else if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = ch;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  /**
   * 故事字幕 — 逐字加载，常驻卷轴内，可滚动
   */
  renderStory(ctx, w, h) {
    this.buttons = [];
    const layout = this._getStoryLayout(w, h);
    const { scrollW, scrollH, scrollX, scrollY, contentX, contentY, contentW, contentH } = layout;
    const story = (this.stageData.story || '').slice(0, this.storyTypedLen);
    const lineHeight = 30;
    const fontSize = 18;

    this.drawStoryScroll(ctx, scrollX, scrollY, scrollW, scrollH);

    ctx.save();
    ctx.globalAlpha = this.storyAlpha;

    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.green;
    ctx.textAlign = 'center';
    const storyTitle = this.fromErrorBook ? '👿 心魔残影' : '📜 天书残卷';
    ctx.fillText(storyTitle, w / 2, scrollY + 32);

    const realm = this.stageData.realm;
    ctx.font = `bold ${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = realm.color;
    const storySub = this.fromErrorBook
      ? `${realm.icon} ${realm.name} · 修复「${this.errorWord?.word || ''}」`
      : `${realm.icon} ${realm.name} · 第${this.stage}关`;
    ctx.fillText(storySub, w / 2, scrollY + 62);

    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = `${fontSize}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.green;
    ctx.shadowColor = Theme.colors.text.green;
    ctx.shadowBlur = 10;
    const lines = this._buildStoryLines(ctx, story, contentW);
    const totalTextH = lines.length * lineHeight;
    this.storyMaxScroll = Math.max(0, totalTextH - contentH + 8);
    this.storyContentScroll = Math.max(0, Math.min(this.storyContentScroll, this.storyMaxScroll));

    ctx.save();
    ctx.beginPath();
    this.roundRect(ctx, contentX - 4, contentY - 4, contentW + 8, contentH + 8, 12);
    ctx.clip();

    const drawY = contentY + 4 - this.storyContentScroll;
    for (let i = 0; i < lines.length; i++) {
      const y = drawY + i * lineHeight;
      if (y + lineHeight > contentY && y < contentY + contentH) {
        ctx.fillText(lines[i], contentX, y);
      }
    }

    if (!this.storyTypingDone && Math.floor(this.animTime * 3) % 2 === 0) {
      const lastLine = lines[lines.length - 1] || '';
      const cx = contentX + ctx.measureText(lastLine).width + 4;
      const cy = drawY + (lines.length - 1) * lineHeight + 2;
      ctx.shadowBlur = 0;
      ctx.fillStyle = Theme.colors.text.green;
      ctx.fillText('|', cx, cy);
      ctx.fillStyle = Theme.colors.text.green;
      ctx.shadowBlur = 10;
    }

    ctx.shadowBlur = 0;

    ctx.restore();

    if (this.storyMaxScroll > 0) {
      ctx.font = `11px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.textAlign = 'center';
      ctx.fillText('↑ 上下滑动阅读 ↓', w / 2, scrollY + scrollH - 10);
    }

    ctx.restore();

    ctx.font = `14px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.green;
    ctx.textAlign = 'center';
    const hint = this.storyTypingDone ? '点击继续 · 进入记忆' : '点击加速显示全文';
    ctx.fillText(hint, w / 2, scrollY + scrollH + 36);

    this.addButton((w - 140) / 2, scrollY + scrollH + 52, 140, 40, '跳过 →', Theme.colors.button.primary, () => {
      this.state = 'memory';
      this.animTime = 0;
    });
    this.renderButtons(ctx);
  }

  /**
   * 记忆单词阶段 — 卡片居中放大，读完后手动开始
   */
  renderMemory(ctx, w, h) {
    const realm = this.stageData.realm;
    const gap = Theme.layout.gap;
    const footerTop = h - 88;

    const headerBottom = this.drawRealmHeader(ctx, w, realm, `第${this.stage}关`);

    const titleSize = Theme.fonts.sizes.title;
    const titleY = headerBottom + gap.xl + titleSize / 2;
    this.drawTitle(ctx, '🧠 凝神记忆', w / 2, titleY, titleSize, Theme.colors.text.green);

    const hintY = titleY + titleSize / 2 + gap.lg + Theme.fonts.sizes.caption / 2;
    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.muted;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('慢慢看，准备好了再点下方按钮', w / 2, hintY);

    const contentTop = hintY + Theme.fonts.sizes.caption / 2 + gap.lg;

    const words = this.memoryWords;
    const cols = words.length <= 1 ? 1 : 2;
    const rows = Math.ceil(words.length / cols);
    const cardGap = 14;
    const contentH = footerTop - contentTop;
    const cardW = cols === 1
      ? Math.min(w - 48, 340)
      : (w - 40 - (cols - 1) * cardGap) / cols;
    const cardH = Math.min(
      260,
      Math.max(180, (contentH - (rows - 1) * cardGap) / rows)
    );
    const gridW = cols * cardW + (cols - 1) * cardGap;
    const gridH = rows * cardH + (rows - 1) * cardGap;
    const startX = (w - gridW) / 2;
    const startY = contentTop + (contentH - gridH) / 2;

    for (let i = 0; i < words.length; i++) {
      const tw = words[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + cardGap);
      const y = startY + row * (cardH + cardGap);

      this.drawGlassPanel(ctx, x, y, cardW, cardH, {
        border: Theme.colors.card.border,
        radius: Theme.borderRadius.xl,
      });

      const cx = x + cardW / 2;
      let lineY = y + cardH * 0.18;

      ctx.font = `bold ${Math.min(42, cardW * 0.22)}px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.green;
      ctx.textAlign = 'center';
      ctx.fillText(tw.word, cx, lineY);
      lineY += cardH * 0.16;

      if (tw.phonetic) {
        ctx.font = `${Math.min(18, cardW * 0.09)}px sans-serif`;
        ctx.fillStyle = Theme.colors.text.secondary;
        ctx.fillText(tw.phonetic, cx, lineY);
        lineY += cardH * 0.12;
      }

      ctx.font = `bold ${Math.min(22, cardW * 0.11)}px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.green;
      ctx.fillText(tw.meaning, cx, lineY);
      lineY += cardH * 0.14;

      if (tw.past) {
        ctx.font = `${Math.min(16, cardW * 0.08)}px ${Theme.fonts.primary}`;
        ctx.fillStyle = Theme.colors.button.secondary;
        ctx.fillText(`过去式: ${tw.past}`, cx, lineY);
        lineY += cardH * 0.11;
      }

      if (tw.example) {
        ctx.font = `${Math.min(15, cardW * 0.075)}px ${Theme.fonts.primary}`;
        ctx.fillStyle = Theme.colors.text.secondary;
        const exLines = this.wrapTextLines(ctx, tw.example, cardW - 24);
        for (let j = 0; j < Math.min(2, exLines.length); j++) {
          ctx.fillText(exLines[j], cx, lineY + j * 20);
        }
      }
    }

    this.buttons = [];
    const btnW = Math.min(200, w - 48);
    const btnH = 48;
    const btnY = h - 72;
    this.addButton((w - btnW) / 2, btnY, btnW, btnH, '开始挑战 ⚔️', Theme.colors.button.primary, () => {
      this.state = 'playing';
      this.animTime = 0;
      this.generateLetters();
    });
    this.renderButtons(ctx);
  }

  /**
   * 游戏阶段
   */
  /** 游戏页布局：灵槽贴底，字母区在其上方 */
  _calcPlayLayout(w, h) {
    const bottomPad = 22;
    const slotSize = Math.min(48, (w - 30) / this.maxSlots);
    const slotGap = 5;
    const slotsW = this.maxSlots * (slotSize + slotGap) - slotGap;
    const slotsX = (w - slotsW) / 2;
    const barPad = 10;
    const labelGap = 18;
    const barH = slotSize + barPad * 2;
    const slotsY = h - bottomPad - barH;
    const slotBarTop = slotsY - barPad;
    const letterTop = (this._gameHeaderBottom || Theme.layout.safeTop + 36) + Theme.layout.gap.md;
    const letterBottom = slotBarTop - labelGap - Theme.layout.gap.lg;

    return {
      slotSize, slotGap, slotsW, slotsX, slotsY, slotBarTop, letterTop, letterBottom, barPad, barH, bottomPad,
    };
  }

  renderGame(ctx, w, h) {
    ctx.save();
    if (this.shakeTimer > 0) {
      const intensity = this.shakeTimer * 8;
      ctx.translate((Math.random() - 0.5) * intensity, (Math.random() - 0.5) * intensity);
    }

    const realm = this.stageData.realm;
    const targetLetters = this.letters.filter((l) => !l.isDistractor);
    const remaining = targetLetters.filter((l) => l.visible).length;
    const total = targetLetters.length;
    const headerBottom = this.drawRealmHeader(
      ctx, w, realm, `第${this.stage}关 · 剩余 ${remaining}/${total} 个字母`
    );

    // 显示目标单词中文释义
    const meanings = this.stageData.words.map(w => w.meaning).join('、');
    const meaningY = headerBottom + Theme.layout.gap.lg;
    ctx.font = `bold ${Theme.fonts.sizes.title}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.accent.amber;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.shadowColor = Theme.colors.accent.amber;
    ctx.shadowBlur = 10;
    ctx.fillText(meanings, w / 2, meaningY);
    ctx.shadowBlur = 0;

    // 消除进度条（复用上方已声明的 targetLetters / remaining / total）
    const remainingCount = this.letters.filter((l) => !l.isDistractor && l.visible).length;
    const totalCount = this.letters.filter((l) => !l.isDistractor).length;
    const collected = totalCount - remainingCount;
    const progress = totalCount > 0 ? collected / totalCount : 0;

    const barY = meaningY + Theme.fonts.sizes.title + Theme.layout.gap.md;
    const barW = w - 60;
    const barH = 12;
    const barX = 30;

    ctx.fillStyle = 'rgba(6,78,59,0.12)';
    this.roundRect(ctx, barX, barY, barW, barH, 6);
    ctx.fill();

    if (progress > 0) {
      const progGrad = ctx.createLinearGradient(barX, barY, barX + barW * progress, barY);
      progGrad.addColorStop(0, Theme.colors.accent.green);
      progGrad.addColorStop(1, Theme.colors.accent.amber);
      ctx.fillStyle = progGrad;
      this.roundRect(ctx, barX, barY, Math.max(barH, barW * progress), barH, 6);
      ctx.fill();
    }

    ctx.font = `bold ${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.green;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`消除进度 ${collected}/${totalCount}`, w / 2, barY + barH + 4);

    this._gameHeaderBottom = barY + barH + 4 + Theme.fonts.sizes.caption + Theme.layout.gap.sm;
    this._playLayout = this._calcPlayLayout(w, h);

    this.renderLetters(ctx, w, h);
    this.renderSlots(ctx, w, h);

    ctx.restore();

    this.buttons = [];
    const back = Theme.layout.backBtn;
    this.addButton(back.x, back.y, back.w, back.h, '← 返回', Theme.colors.button.muted, () => {
      this.manager.switchTo('levels');
    });
    this.renderButtons(ctx);
  }

  renderLetters(ctx, w, h) {
    const layout = this._playLayout || this._calcPlayLayout(w, h);
    const gap = 8;
    const cols = this._letterCols || Math.min(6, Math.ceil(Math.sqrt(this.letters.length * 1.5)));
    let letterSize = Math.min(55, (w - 40 - (cols - 1) * gap) / cols);
    const rows = Math.ceil(this.letters.length / cols);
    const availH = layout.letterBottom - layout.letterTop;
    const neededH = rows * (letterSize + gap) - gap;
    if (neededH > availH) {
      letterSize = Math.floor((availH - (rows - 1) * gap) / rows);
      letterSize = Math.max(36, letterSize);
    }
    const totalW = cols * letterSize + (cols - 1) * gap;
    const startX = (w - totalW) / 2;
    const gridH = rows * (letterSize + gap) - gap;
    const startY = layout.letterTop + Math.max(0, (availH - gridH) / 2);

    this._letterSize = letterSize;
    this._letterStartX = startX;
    this._letterStartY = startY;
    this._letterGap = gap;
    this._letterCols = cols;

    for (const letter of this.letters) {
      if (!letter.visible) continue;
      const { x, y } = this._getLetterGridPos(letter, letterSize, gap, startX, startY);

      this.drawSpiritTile(ctx, x, y, letterSize, {
        text: letter.text,
        seed: letter.id,
        rotation: letter.id % 2 === 0 ? -0.1 : 0.1,
      });
    }

    for (const a of this.flyAnimations) {
      ctx.save();
      ctx.globalAlpha = 1 - a.progress * 0.3;
      const s = letterSize * (1 - a.progress * 0.4);
      this.drawSpiritTile(ctx, a.x, a.y, s, {
        text: a.text,
        seed: 0,
        glowColor: Theme.colors.accent.green,
      });
      ctx.restore();
    }
  }

  renderSlots(ctx, w, h) {
    const layout = this._playLayout || this._calcPlayLayout(w, h);
    const { slotSize, slotGap, slotsW, slotsX, slotsY, barPad } = layout;

    this._slotsX = slotsX;
    this._slotsY = slotsY;
    this._slotSize = slotSize;

    ctx.fillStyle = 'rgba(255,250,223,0.88)';
    this.roundRect(ctx, slotsX - barPad, slotsY - barPad, slotsW + barPad * 2, slotSize + barPad * 2, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(6,78,59,0.15)';
    ctx.lineWidth = 1;
    this.roundRect(ctx, slotsX - barPad, slotsY - barPad, slotsW + barPad * 2, slotSize + barPad * 2, 12);
    ctx.stroke();

    ctx.font = `bold ${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.green;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`🌿 灵槽 (${this.slots.length}/${this.maxSlots})`, w / 2, slotsY - 18);

    for (let i = 0; i < this.maxSlots; i++) {
      const x = slotsX + i * (slotSize + slotGap);
      const y = slotsY;

      if (i < this.slots.length) {
        const slotTile = this.slots[i];
        this.drawSpiritTile(ctx, x, y, slotSize, {
          text: slotTile.text,
          seed: i + 10,
          rotation: i % 2 === 0 ? -0.06 : 0.06,
          glowColor: Theme.colors.accent.cyan,
        });
      } else {
        ctx.fillStyle = 'rgba(6,78,59,0.06)';
        this.roundRect(ctx, x, y, slotSize, slotSize, 8);
        ctx.fill();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(6,78,59,0.15)';
        ctx.lineWidth = 1;
        this.roundRect(ctx, x, y, slotSize, slotSize, 8);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    for (const a of this.clearAnimations) {
      ctx.save();
      ctx.globalAlpha = 1 - a.progress;
      ctx.fillStyle = Theme.colors.accent.amber;
      ctx.beginPath();
      ctx.arc(a.x + slotSize / 2, a.y + slotSize / 2, slotSize * 0.6 * (1 + a.progress * 0.5), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  renderResult(ctx, w, h) {
    ctx.fillStyle = 'rgba(30,28,0,0.45)';
    ctx.fillRect(0, 0, w, h);

    const cardW = w * 0.8;
    const cardH = 220;
    const cardX = (w - cardW) / 2;
    const cardY = (h - cardH) / 2;
    const isWin = this.state === 'win';
    const isErrorBook = this.fromErrorBook;

    if (!isWin) {
      this.recordWrongWordsOnFail();
    }

    this.drawGlassPanel(ctx, cardX, cardY, cardW, cardH, {
      border: isWin ? Theme.colors.button.primary : Theme.colors.button.danger,
    });

    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(isWin ? '🎉' : '💫', w / 2, cardY + 60);

    ctx.font = `bold 28px ${Theme.fonts.primary}`;
    ctx.fillStyle = isWin ? Theme.colors.accent.amber : Theme.colors.button.danger;
    ctx.fillText(isWin ? (isErrorBook ? '心魔已除！' : '突破成功！') : '走火入魔', w / 2, cardY + 110);

    ctx.font = `14px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.secondary;
    const resultHint = isWin
      ? (isErrorBook ? `「${this.errorWord?.word || ''}」已修复，修行更进一层` : '完成练习，单词已牢记！')
      : (isErrorBook ? '心魔未散，再试一次斩除' : '槽位已满，本关单词已收录至错题本');
    ctx.fillText(resultHint, w / 2, cardY + 140);

    this.buttons = [];
    const btnW = 110;
    const btnH = 40;
    const btnY = cardY + cardH - 60;

    this.addButton(w / 2 - btnW - 8, btnY, btnW, btnH, '再试一次', Theme.colors.button.secondary, () => {
      if (isErrorBook && this.errorWord) {
        this.onEnter({ fromErrorBook: true, word: this.errorWord });
      } else {
        this.onEnter({ stage: this.stage });
      }
    });
    if (isWin && !isErrorBook && this.stage < 200) {
      this.addButton(w / 2 + 8, btnY, btnW, btnH, '继续修炼', Theme.colors.button.primary, () => {
        this.onEnter({ stage: this.stage + 1 });
      });
    }
    this.addButton(w / 2 - 50, btnY + 50, 100, 32, '返回', Theme.colors.button.muted, () => {
      this.manager.switchTo(isErrorBook ? 'errorbook' : 'levels');
    });

    this.renderButtons(ctx);
  }

  // ==================== 触摸 ====================

  onTouchStart(x, y) {
    if (this.state === 'story') {
      this._storyTouchStartY = y;
      this._storyScrollStart = this.storyContentScroll;
      return;
    }
    super.onTouchStart(x, y);
  }

  onTouchMove(x, y) {
    if (this.state === 'story' && this.storyTypingDone && this.storyMaxScroll > 0) {
      const dy = this._storyTouchStartY - y;
      this.storyContentScroll = Math.max(0, Math.min(this.storyMaxScroll, this._storyScrollStart + dy));
      return;
    }
    super.onTouchMove(x, y);
  }

  onTouchEnd(x, y) {
    if (this.state === 'story') {
      if (!this.storyTypingDone) {
        this.storyTypedLen = (this.stageData.story || '').length;
        this.storyTypingDone = true;
        return;
      }
      const moved = Math.abs(y - this._storyTouchStartY) > 8;
      if (!moved) {
        this.state = 'memory';
        this.animTime = 0;
      }
      return;
    }

    if (this.state !== 'playing') {
      super.onTouchEnd(x, y);
      return;
    }

    const letterSize = this._letterSize;
    const gap = this._letterGap;
    const startX = this._letterStartX;
    const startY = this._letterStartY;

    for (const letter of this.letters) {
      if (!letter.visible) continue;
      const { x: lx, y: ly } = this._getLetterGridPos(letter, letterSize, gap, startX, startY);

      if (x >= lx && x <= lx + letterSize && y >= ly && y <= ly + letterSize) {
        this.onLetterClicked(letter, lx, ly);
        return;
      }
    }

    super.onTouchEnd(x, y);
  }

  onLetterClicked(letter, lx, ly) {
    if (!this._canPickLetter()) {
      if (this.state === 'playing') this.shakeTimer = 0.3;
      return;
    }

    const slotIndex = this._occupiedSlotCount();
    const slotSize = this._slotSize;
    const slotGap = 5;

    this.flyAnimations.push({
      text: letter.text,
      groupSize: letter.groupSize,
      isDistractor: !!letter.isDistractor,
      fromX: lx,
      fromY: ly,
      toX: this._slotsX + slotIndex * (slotSize + slotGap),
      toY: this._slotsY,
      x: lx,
      y: ly,
      progress: 0,
    });

    letter.visible = false;
  }

  /** 灵槽内尝试消除目标单词（可连续多词） */
  _runSlotMatches() {
    let matched = true;
    while (matched && this.state === 'playing') {
      matched = false;

      for (const word of this.targetStrings) {
        const wordChars = word.split('');
        const slotChars = this.slots.map((s) => s.text);
        const used = new Array(this.slots.length).fill(false);
        let allFound = true;

        for (const ch of wordChars) {
          const idx = slotChars.findIndex((c, i) => c === ch && !used[i]);
          if (idx === -1) {
            allFound = false;
            break;
          }
          used[idx] = true;
        }

        if (!allFound) continue;

        matched = true;
        this.comboTextAnim = { text: word + '!', progress: 0 };
        this.slots = this.slots.filter((_, i) => !used[i]);

        for (let i = 0; i < this.maxSlots; i++) {
          this.clearAnimations.push({
            x: this._slotsX + i * (this._slotSize + 5),
            y: this._slotsY,
            progress: 0,
          });
        }

        this.spawnMatchParticles();
        this._compactLetterGrid();
        break;
      }
    }
  }

  checkSlotMatch() {
    this._runSlotMatches();

    if (this.state === 'playing' && this.flyAnimations.length === 0) {
      this._tryCompleteLevel();
      if (this.state !== 'playing') return;
    }

    if (this.state === 'playing'
      && this.slots.length >= this.maxSlots
      && this.flyAnimations.length === 0) {
      this.state = 'lose';
      this.shakeTimer = 0.5;
      this.recordWrongWordsOnFail();
    }
  }

  /** 失败时写入错题本（仅执行一次） */
  recordWrongWordsOnFail() {
    if (this._wrongWordsSaved || this.fromErrorBook) return;
    this._wrongWordsSaved = true;
    const words = this.stageData?.words || this.memoryWords || [];
    addWrongWordsOnFail(words);
  }

  spawnMatchParticles() {
    const colors = Theme.cultivation.spiritColors;
    const cx = this._slotsX + (this.maxSlots * (this._slotSize + 5)) / 2;
    const cy = this._slotsY + this._slotSize / 2;
    for (let i = 0; i < 25; i++) {
      const angle = (Math.PI * 2 * i) / 25;
      const speed = 3 + Math.random() * 5;
      this.particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 5,
      });
    }
  }

  saveProgress() {
    saveCompletedStage(this.stage);
  }

  wrapTextLines(ctx, text, maxWidth) {
    const chars = text.split('');
    let line = '';
    const lines = [];
    for (const char of chars) {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = char;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }
}
