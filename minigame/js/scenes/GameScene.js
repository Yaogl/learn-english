import { BaseScene } from './BaseScene';
import { getStageData } from '../data/LevelData';
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

    // 背景浮动圆点
    this._initBgDots();

    // 加载背景图（单例缓存）
    if (!this._bgImg) {
      this._bgImg = wx.createImage();
      this._bgImg.src = 'assets/imgs/storyForestBg.png';
    }
    if (!this._celestialBg) {
      this._celestialBg = wx.createImage();
      this._celestialBg.src = 'assets/imgs/celestialLandscapeBg.jpg';
    }
    if (!this._scrollBg) {
      this._scrollBg = wx.createImage();
      this._scrollBg.src = 'assets/imgs/glowingHerb.png';
    }

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
      const speed = 20;
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
        shape: a.shape,
        topColor: a.topColor,
        bottomColor: a.bottomColor,
        borderColor: a.borderColor,
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

    // 每个单词的字母重复铺满（约15组）
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

    // 蜂窝六边形网格：动态列数（上限6列），奇数行偏移半格
    const hexCols = Math.min(6, Math.ceil(Math.sqrt(allLetters.length * 1.5)));

    // 随机形状池：0=六边形 1=圆角方形 2=菱形 3=圆形 4=八边形
    const shapes = [0, 1, 2, 3, 4];
    // 马卡龙浅色池：[底色, 渐变底, 描边色]
    const palettes = [
      ['#BCF6E7', '#51C9B0', 'rgba(56,168,144,0.7)'],   // 薄荷绿
      ['#FFE89C', '#F5C842', 'rgba(200,160,40,0.5)'],    // 淡黄
      ['#FFC8DD', '#FF9BB5', 'rgba(220,120,150,0.5)'],   // 淡粉
      ['#C8E6FF', '#7CB9E8', 'rgba(100,150,200,0.5)'],   // 淡蓝
      ['#E8D5F5', '#C4A8E0', 'rgba(160,120,180,0.5)'],   // 淡紫
      ['#FFD5C8', '#FFAA88', 'rgba(210,140,100,0.5)'],   // 淡桃
      ['#D5F5E3', '#82D9A0', 'rgba(80,160,100,0.5)'],    // 淡绿
    ];

    this.letters = allLetters.map((item, i) => {
      const shapeIdx = Math.floor(Math.random() * shapes.length);
      const paletteIdx = Math.floor(Math.random() * palettes.length);
      const [top, bottom, border] = palettes[paletteIdx];
      return {
        id: i,
        text: item.text,
        groupSize: item.groupSize,
        isDistractor: !!item.isDistractor,
        visible: true,
        gridCol: i % hexCols,
        gridRow: Math.floor(i / hexCols),
        shape: shapes[shapeIdx],
        topColor: top,
        bottomColor: bottom,
        borderColor: border,
      };
    });
    this._letterCols = hexCols;
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

  /**
   * 蜂窝六边形网格坐标 → 像素坐标（返回六边形左上角）
   * 奇数行水平偏移半个六边形宽度
   */
  _getLetterGridPos(letter, letterSize, gap, startX, startY) {
    const hexW = letterSize * 1.1547; // 2/√3
    const hexH = letterSize;
    const hStep = hexW + gap;           // 水平间距
    const vStep = hexH * 0.75 + gap;    // 垂直间距 = 3/4 高度 + gap
    const offset = letter.gridRow % 2 === 1 ? hStep / 2 : 0;
    return {
      x: startX + letter.gridCol * hStep + offset,
      y: startY + letter.gridRow * vStep,
    };
  }

  /** 六边形点击检测（距离中心 < 内切圆半径） */
  _hitTestHex(px, py, cx, cy, sideLen) {
    const dx = Math.abs(px - cx);
    const dy = Math.abs(py - cy);
    const inRadius = sideLen * Math.sqrt(3) / 2; // 内切圆半径
    if (dx > sideLen || dy > inRadius) return false;
    return (inRadius * sideLen - inRadius * dx - sideLen * 0.5 * dy) >= 0;
  }

  render(ctx, w, h) {
    if (this.state === 'playing' || this.state === 'win' || this.state === 'lose') {
      this._drawGameBackground(ctx, w, h);
    } else if (this.state === 'story') {
      this._drawStoryBackground(ctx, w, h);
    } else {
      this.drawPageBackground(ctx, w, h);
    }

    if (this.state === 'story') {
      this.renderStory(ctx, w, h);
    } else if (this.state === 'memory') {
      this.renderMemory(ctx, w, h);
    } else if (this.state === 'playing' || this.state === 'win' || this.state === 'lose') {
      this.renderGame(ctx, w, h);
    }

    // 粒子（马卡龙色 + 发光）
    for (const p of this.particles) {
      ctx.save();
      const r = p.size * p.life;
      ctx.globalAlpha = p.life * 0.85;
      // 外发光层
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
      // 内部高光
      ctx.shadowBlur = 0;
      ctx.globalAlpha = p.life * 0.4;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x - r * 0.2, p.y - r * 0.2, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (this.comboTextAnim) {
      const a = this.comboTextAnim;
      const t = a.progress;
      // 弹性缩放：先冲到1.3再回弹到1.0
      const bounce = t < 0.3 ? 1 + t * 1.0 : 1.3 - (t - 0.3) * 0.43;
      const scale = Math.max(0.6, bounce);
      ctx.save();
      ctx.globalAlpha = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
      ctx.font = `bold ${Math.round(32 * scale)}px "Microsoft YaHei", sans-serif`;
      // 渐变绿标题色
      const comboGrad = ctx.createLinearGradient(w / 2 - 70, 0, w / 2 + 70, 0);
      comboGrad.addColorStop(0, '#2E8B57');
      comboGrad.addColorStop(1, '#228B22');
      ctx.fillStyle = comboGrad;
      ctx.textAlign = 'center';
      // 双层发光：内层绿 + 外层薄荷
      ctx.shadowColor = '#70E8D0';
      ctx.shadowBlur = 24;
      ctx.fillText(a.text, w / 2, h * 0.35 - t * 60);
      ctx.shadowBlur = 8;
      ctx.fillText(a.text, w / 2, h * 0.35 - t * 60);
      ctx.restore();
    }

    if (this.state === 'win' || this.state === 'lose') {
      this.renderResult(ctx, w, h);
    }
  }

  /** 故事卷轴布局参数 */
  _getStoryLayout(w, h) {
    const scrollW = w * 0.92;
    const scrollH = h * 0.56;
    const scrollX = (w - scrollW) / 2;
    const scrollY = h * 0.14;
    const padding = 22;
    const headerH = 90;
    const contentPadTop = 14;
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
   * 故事字幕 — 天书卷轴，逐字加载，可滚动
   */
  renderStory(ctx, w, h) {
    this.buttons = [];
    const layout = this._getStoryLayout(w, h);
    const { scrollW, scrollH, scrollX, scrollY, contentX, contentY, contentW, contentH } = layout;
    const story = (this.stageData.story || '').slice(0, this.storyTypedLen);
    const lineHeight = 32;
    const fontSize = 19;
    const t = this.animTime || 0;

    // ── 卷轴底板（发光草药图 + 蒙层）──
    ctx.save();
    // 卷轴外发光
    ctx.shadowColor = '#70E8D0';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 4;

    // 卷轴底色
    if (this._scrollBg && this._scrollBg.width > 0) {
      ctx.save();
      this.roundRect(ctx, scrollX, scrollY, scrollW, scrollH, 18);
      ctx.clip();
      // 草药背景图 cover
      const img = this._scrollBg;
      const imgR = img.width / img.height;
      const scrollR = scrollW / scrollH;
      let sx, sy, sw, sh;
      if (imgR > scrollR) { sh = img.height; sw = sh * scrollR; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / scrollR; sx = 0; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, scrollX, scrollY, scrollW, scrollH);
      // 蒙层
      ctx.fillStyle = 'rgba(255,253,240,0.78)';
      ctx.fillRect(scrollX, scrollY, scrollW, scrollH);
      ctx.restore();
    } else {
      ctx.fillStyle = '#FFFDE8';
      this.roundRect(ctx, scrollX, scrollY, scrollW, scrollH, 18);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // 卷轴边框（双层：外发光 + 内实线）
    ctx.strokeStyle = 'rgba(112,232,208,0.4)';
    ctx.lineWidth = 2;
    this.roundRect(ctx, scrollX, scrollY, scrollW, scrollH, 18);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(61,107,79,0.15)';
    ctx.lineWidth = 1;
    this.roundRect(ctx, scrollX + 2, scrollY + 2, scrollW - 4, scrollH - 4, 16);
    ctx.stroke();

    // 卷轴顶部装饰横线
    ctx.save();
    ctx.globalAlpha = 0.3;
    const decoGrad = ctx.createLinearGradient(scrollX + 30, 0, scrollX + scrollW - 30, 0);
    decoGrad.addColorStop(0, 'rgba(112,232,208,0)');
    decoGrad.addColorStop(0.5, 'rgba(112,232,208,0.6)');
    decoGrad.addColorStop(1, 'rgba(112,232,208,0)');
    ctx.strokeStyle = decoGrad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(scrollX + 30, scrollY + 78);
    ctx.lineTo(scrollX + scrollW - 30, scrollY + 78);
    ctx.stroke();
    ctx.restore();
    ctx.restore();

    // ── 卷轴内容 ──
    ctx.save();
    ctx.globalAlpha = this.storyAlpha;

    // 标题：天书残卷（带灵气光晕）
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const titlePulse = 0.85 + Math.sin(t * 2) * 0.15;
    ctx.font = `bold ${Theme.fonts.sizes.body + 2}px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#3D6B4F';
    ctx.shadowColor = '#70E8D0';
    ctx.shadowBlur = 10 * titlePulse;
    const storyTitle = this.fromErrorBook ? '心魔残影' : '天书残卷';
    ctx.fillText(storyTitle, w / 2, scrollY + 30);
    ctx.shadowBlur = 0;

    // 副标题
    const realm = this.stageData.realm;
    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = 'rgba(61,107,79,0.55)';
    const storySub = this.fromErrorBook
      ? `${realm.name} · 修复「${this.errorWord?.word || ''}」`
      : `${realm.name} · 第${this.stage}关`;
    ctx.fillText(storySub, w / 2, scrollY + 55);

    // 故事正文
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = `${fontSize}px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#3D6B4F';
    ctx.shadowColor = 'rgba(61,107,79,0.15)';
    ctx.shadowBlur = 4;
    const lines = this._buildStoryLines(ctx, story, contentW);
    const totalTextH = lines.length * lineHeight;
    this.storyMaxScroll = Math.max(0, totalTextH - contentH + 8);
    this.storyContentScroll = Math.max(0, Math.min(this.storyContentScroll, this.storyMaxScroll));

    // 裁剪区域
    ctx.save();
    ctx.beginPath();
    this.roundRect(ctx, contentX - 4, contentY - 4, contentW + 8, contentH + 8, 10);
    ctx.clip();

    const drawY = contentY + 4 - this.storyContentScroll;
    for (let i = 0; i < lines.length; i++) {
      const y = drawY + i * lineHeight;
      if (y + lineHeight > contentY && y < contentY + contentH) {
        // 逐字渐现效果：最后一行渐变透明
        const isLastVisible = (i === lines.length - 1) && !this.storyTypingDone;
        if (isLastVisible) {
          ctx.globalAlpha = 0.5 + Math.sin(t * 4) * 0.3;
        }
        ctx.fillText(lines[i], contentX, y);
        ctx.globalAlpha = this.storyAlpha;
      }
    }

    // 打字光标（闪烁灵光）
    if (!this.storyTypingDone) {
      const cursorAlpha = 0.4 + Math.sin(t * 5) * 0.4;
      const lastLine = lines[lines.length - 1] || '';
      const cursorX = contentX + ctx.measureText(lastLine).width + 4;
      const cursorY = drawY + (lines.length - 1) * lineHeight + 2;
      ctx.shadowBlur = 0;
      ctx.globalAlpha = cursorAlpha;
      // 光标光晕
      ctx.fillStyle = '#70E8D0';
      ctx.shadowColor = '#70E8D0';
      ctx.shadowBlur = 8;
      ctx.fillText('仙', cursorX, cursorY);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = this.storyAlpha;
    }

    ctx.shadowBlur = 0;
    ctx.restore();

    // 滚动提示
    if (this.storyMaxScroll > 0) {
      ctx.font = `11px ${Theme.fonts.primary}`;
      ctx.fillStyle = 'rgba(61,107,79,0.35)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('↑ 上下滑动阅读 ↓', w / 2, scrollY + scrollH - 10);
    }

    ctx.restore();

    // 底部提示
    ctx.font = `14px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#3D6B4F';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const hint = this.storyTypingDone ? '点击继续 · 进入记忆' : '点击加速显示全文';
    ctx.fillText(hint, w / 2, scrollY + scrollH + 36);

    this.addButton((w - 140) / 2, scrollY + scrollH + 52, 140, 40, '跳过 →', Theme.colors.button.primary, () => {
      this.state = 'memory';
      this.animTime = 0;
    });
    this.renderButtons(ctx);
  }

  /**
   * 记忆单词阶段 — 森林背景 + 马卡龙卡片 + 修仙风
   */
  renderMemory(ctx, w, h) {
    const t = this.animTime || 0;
    const footerTop = h - 88;

    // 森林背景 + 轻蒙层
    ctx.fillStyle = '#FFF9E8';
    ctx.fillRect(0, 0, w, h);
    if (this._bgImg && this._bgImg.width > 0) {
      const img = this._bgImg;
      const imgRatio = img.width / img.height;
      const screenRatio = w / h;
      let sx, sy, sw, sh;
      if (imgRatio > screenRatio) { sh = img.height; sw = sh * screenRatio; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / screenRatio; sx = 0; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }
    ctx.fillStyle = 'rgba(255,249,232,0.2)';
    ctx.fillRect(0, 0, w, h);
    this.drawFallingPetals(ctx, w, h);

    // 返回按钮
    const back = Theme.layout.backBtn;
    this.addButton(back.x, back.y, back.w, back.h, '← 返回', Theme.colors.button.muted, () => {
      this.state = 'story';
      this.animTime = 0;
    });

    // 标题（深棕绿，带灵气光晕）
    const titleY = Theme.layout.safeTop + 10;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const titlePulse = 0.85 + Math.sin(t * 2) * 0.15;
    ctx.font = `bold ${Theme.fonts.sizes.title}px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#3D6B4F';
    ctx.shadowColor = '#70E8D0';
    ctx.shadowBlur = 10 * titlePulse;
    ctx.fillText('凝神记忆', w / 2, titleY);
    ctx.shadowBlur = 0;
    // 副标题
    ctx.font = `${Theme.fonts.sizes.small}px ${Theme.fonts.primary}`;
    ctx.fillStyle = 'rgba(61,107,79,0.5)';
    ctx.fillText('慢慢看，准备好了再点下方按钮', w / 2, titleY + 24);
    ctx.restore();

    const contentTop = titleY + 48;

    // 单词卡片
    const words = this.memoryWords;
    const cols = words.length <= 1 ? 1 : 2;
    const rows = Math.ceil(words.length / cols);
    const cardGap = 16;
    const contentH = footerTop - contentTop;
    const cardW = cols === 1
      ? Math.min(w - 56, 340)
      : (w - 56 - (cols - 1) * cardGap) / cols;
    const cardH = Math.min(
      240,
      Math.max(160, (contentH - (rows - 1) * cardGap) / rows)
    );
    const gridW = cols * cardW + (cols - 1) * cardGap;
    const gridH = rows * cardH + (rows - 1) * cardGap;
    const startX = (w - gridW) / 2;
    const startY = contentTop + (contentH - gridH) / 2;

    // 马卡龙色池
    const palettes = [
      ['#BCF6E7', '#51C9B0', 'rgba(56,168,144,0.5)'],
      ['#FFE89C', '#F5C842', 'rgba(200,160,40,0.4)'],
      ['#FFC8DD', '#FF9BB5', 'rgba(220,120,150,0.4)'],
      ['#C8E6FF', '#7CB9E8', 'rgba(100,150,200,0.4)'],
      ['#E8D5F5', '#C4A8E0', 'rgba(160,120,180,0.4)'],
      ['#D5F5E3', '#82D9A0', 'rgba(80,160,100,0.4)'],
    ];

    for (let i = 0; i < words.length; i++) {
      const tw = words[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + cardGap);
      const y = startY + row * (cardH + cardGap);
      const pal = palettes[i % palettes.length];
      const [topC, botC, borderC] = pal;

      // 入场动画：从下方滑入
      const delay = i * 0.12;
      const slideProgress = Math.min(1, Math.max(0, (t - delay) / 0.4));
      const slideY = (1 - slideProgress) * 30;
      const slideAlpha = slideProgress;

      ctx.save();
      ctx.globalAlpha = slideAlpha;
      ctx.translate(0, slideY);

      // 卡片外发光
      ctx.shadowColor = topC;
      ctx.shadowBlur = 10;
      // 卡片底色（马卡龙渐变）
      const cardGrad = ctx.createLinearGradient(x, y, x, y + cardH);
      cardGrad.addColorStop(0, 'rgba(255,255,255,0.85)');
      cardGrad.addColorStop(0.4, 'rgba(255,255,255,0.65)');
      cardGrad.addColorStop(1, topC + '55');
      ctx.fillStyle = cardGrad;
      this.roundRect(ctx, x, y, cardW, cardH, 16);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 顶部彩色装饰条
      ctx.save();
      ctx.beginPath();
      this.roundRect(ctx, x, y, cardW, 4, 2);
      ctx.clip();
      const decoGrad = ctx.createLinearGradient(x, y, x + cardW, y);
      decoGrad.addColorStop(0, topC);
      decoGrad.addColorStop(1, botC);
      ctx.fillStyle = decoGrad;
      ctx.fillRect(x, y, cardW, 4);
      ctx.restore();

      // 边框
      ctx.strokeStyle = borderC;
      ctx.lineWidth = 1.2;
      this.roundRect(ctx, x, y, cardW, cardH, 16);
      ctx.stroke();

      // 3D立体感
      ctx.save();
      this.roundRect(ctx, x, y, cardW, cardH, 16);
      ctx.clip();
      // 左上高光
      ctx.globalAlpha = 0.35;
      const hlG = ctx.createRadialGradient(x + cardW * 0.2, y + cardH * 0.15, 0, x + cardW * 0.2, y + cardH * 0.15, cardW * 0.4);
      hlG.addColorStop(0, '#ffffff');
      hlG.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = hlG;
      ctx.fillRect(x, y, cardW, cardH);
      ctx.restore();

      const cx = x + cardW / 2;
      let lineY = y + cardH * 0.16;

      // 英文单词（大号，深棕绿）
      ctx.font = `bold ${Math.min(38, cardW * 0.2)}px ${Theme.fonts.primary}`;
      ctx.fillStyle = '#3D6B4F';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(tw.word, cx, lineY);
      lineY += cardH * 0.18;

      // 音标
      if (tw.phonetic) {
        ctx.font = `${Math.min(16, cardW * 0.08)}px sans-serif`;
        ctx.fillStyle = 'rgba(61,107,79,0.5)';
        ctx.fillText(tw.phonetic, cx, lineY);
        lineY += cardH * 0.1;
      }

      // 中文释义（加粗）
      ctx.font = `bold ${Math.min(20, cardW * 0.1)}px ${Theme.fonts.primary}`;
      ctx.fillStyle = botC;
      ctx.fillText(tw.meaning, cx, lineY);
      lineY += cardH * 0.14;

      // 过去式
      if (tw.past) {
        ctx.font = `${Math.min(14, cardW * 0.07)}px ${Theme.fonts.primary}`;
        ctx.fillStyle = 'rgba(61,107,79,0.5)';
        ctx.fillText(`过去式: ${tw.past}`, cx, lineY);
        lineY += cardH * 0.1;
      }

      // 例句（最多2行）
      if (tw.example) {
        ctx.font = `${Math.min(13, cardW * 0.065)}px ${Theme.fonts.primary}`;
        ctx.fillStyle = 'rgba(61,107,79,0.45)';
        const exLines = this.wrapTextLines(ctx, tw.example, cardW - 28);
        for (let j = 0; j < Math.min(2, exLines.length); j++) {
          ctx.fillText(exLines[j], cx, lineY + j * 18);
        }
      }

      ctx.restore();
    }

    // 底部按钮（渐变绿 + 发光）
    this.buttons = [];
    const btnW = Math.min(200, w - 48);
    const btnH = 48;
    const btnY = h - 72;
    this.addButton((w - btnW) / 2, btnY, btnW, btnH, '开始挑战', Theme.colors.button.primary, () => {
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

  /** 初始化背景浮动圆点 */
  _initBgDots() {
    if (this.bgDots) return;
    this.bgDots = [];
    const colors = ['#70E8D0', '#FFE89C', '#FFC8DD'];
    for (let i = 0; i < 22; i++) {
      this.bgDots.push({
        xPct: Math.random(),
        yPct: Math.random(),
        r: 8 + Math.random() * 12,
        color: colors[i % colors.length],
        opacity: 0.3 + Math.random() * 0.3,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  /** 仙气背景：仙气全景图 + 轻蒙层 + 浮动圆点 */
  _drawStoryBackground(ctx, w, h) {
    ctx.fillStyle = '#FFF9E8';
    ctx.fillRect(0, 0, w, h);
    if (this._celestialBg && this._celestialBg.width > 0) {
      const img = this._celestialBg;
      const imgRatio = img.width / img.height;
      const screenRatio = w / h;
      let sx, sy, sw, sh;
      if (imgRatio > screenRatio) { sh = img.height; sw = sh * screenRatio; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / screenRatio; sx = 0; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }
    ctx.fillStyle = 'rgba(255,249,232,0.2)';
    ctx.fillRect(0, 0, w, h);
    // 浮动圆点
    const t = this.animTime || 0;
    for (const d of this.bgDots) {
      const x = d.xPct * w;
      const y = d.yPct * h + Math.sin(t * d.speed + d.phase) * 15;
      ctx.save();
      ctx.globalAlpha = d.opacity * 0.3;
      ctx.fillStyle = d.color;
      ctx.shadowColor = d.color;
      ctx.shadowBlur = d.r * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, d.r * 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = d.opacity;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.arc(x, y, d.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /** 背景图 + 白色蒙层 + 浮动半透明圆点（带微光晕） */
  _drawGameBackground(ctx, w, h) {
    // 底色
    ctx.fillStyle = '#FFF9E8';
    ctx.fillRect(0, 0, w, h);

    // 背景图（cover 模式居中裁剪）
    if (this._bgImg && this._bgImg.width > 0) {
      const img = this._bgImg;
      const imgRatio = img.width / img.height;
      const screenRatio = w / h;
      let sx, sy, sw, sh;
      if (imgRatio > screenRatio) {
        sh = img.height;
        sw = sh * screenRatio;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = sw / screenRatio;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }

    // 白色蒙层（半透明，让背景图柔和不抢眼）
    ctx.fillStyle = 'rgba(255,249,232,0.2)';
    ctx.fillRect(0, 0, w, h);

    // 浮动半透明圆点（带微光晕）
    const t = this.animTime || 0;
    for (const d of this.bgDots) {
      const x = d.xPct * w;
      const y = d.yPct * h + Math.sin(t * d.speed + d.phase) * 15;
      // 外光晕
      ctx.save();
      ctx.globalAlpha = d.opacity * 0.3;
      ctx.fillStyle = d.color;
      ctx.shadowColor = d.color;
      ctx.shadowBlur = d.r * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, d.r * 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // 实心圆点
      ctx.save();
      ctx.globalAlpha = d.opacity;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.arc(x, y, d.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  renderGame(ctx, w, h) {
    ctx.save();
    if (this.shakeTimer > 0) {
      const intensity = this.shakeTimer * 8;
      ctx.translate((Math.random() - 0.5) * intensity, (Math.random() - 0.5) * intensity);
    }

    const targetLetters = this.letters.filter((l) => !l.isDistractor);
    const remaining = targetLetters.filter((l) => l.visible).length;
    const total = targetLetters.length;

    // ── 顶部毛玻璃面板 ──
    const topY = Theme.layout.safeTop;
    const panelPadX = 16;
    const panelPadY = 10;
    const panelH = 60;
    const panelW = w - panelPadX * 2;
    const panelX = panelPadX;
    const panelY = topY - panelPadY;
    ctx.save();
    // 毛玻璃半透明底色 + 微光边框
    const panelGrad = ctx.createLinearGradient(panelX, panelY, panelX, panelY + panelH);
    panelGrad.addColorStop(0, 'rgba(255,255,255,0.55)');
    panelGrad.addColorStop(1, 'rgba(255,255,255,0.35)');
    ctx.fillStyle = panelGrad;
    this.roundRect(ctx, panelX, panelY, panelW, panelH, 16);
    ctx.fill();
    // 外发光边框
    ctx.strokeStyle = 'rgba(112,232,208,0.35)';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#70E8D0';
    ctx.shadowBlur = 8;
    this.roundRect(ctx, panelX, panelY, panelW, panelH, 16);
    ctx.stroke();
    ctx.shadowBlur = 0;
    // 顶部细高光线
    ctx.save();
    ctx.beginPath();
    this.roundRect(ctx, panelX + 2, panelY + 1, panelW - 4, panelH - 2, 15);
    ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(panelX + 16, panelY + 1);
    ctx.lineTo(panelX + panelW - 16, panelY + 1);
    ctx.stroke();
    ctx.restore();
    ctx.restore();

    // 顶部文字：关卡标题 + 剩余字母
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Theme.fonts.sizes.header}px ${Theme.fonts.primary}`;
    // 深棕绿色标题，配森林背景更和谐
    ctx.fillStyle = '#3D6B4F';
    ctx.shadowColor = 'rgba(61,107,79,0.3)';
    ctx.shadowBlur = 6;
    ctx.fillText(`第${this.stage}关`, w / 2, topY + 14);
    ctx.shadowBlur = 0;
    ctx.font = `${Theme.fonts.sizes.small}px ${Theme.fonts.primary}`;
    ctx.fillStyle = 'rgba(61,107,79,0.6)';
    ctx.fillText(`剩余 ${remaining}/${total} 个字母`, w / 2, topY + 36);
    ctx.restore();
    const headerBottom = topY + 52;

    // 显示目标单词中文释义
    const meanings = this.stageData.words.map(w => w.meaning).join('、');
    const meaningY = headerBottom + Theme.layout.gap.lg + 4;
    ctx.font = `bold ${Theme.fonts.sizes.title}px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#70E8D0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.shadowColor = '#70E8D0';
    ctx.shadowBlur = 12;
    ctx.fillText(meanings, w / 2, meaningY);
    ctx.shadowBlur = 0;

    // 消除进度条 — 发光描边 + 填充渐变
    const remainingCount = remaining;
    const totalCount = total;
    const collected = totalCount - remainingCount;
    const progress = totalCount > 0 ? collected / totalCount : 0;

    const barY = meaningY + Theme.fonts.sizes.title + Theme.layout.gap.md;
    const barW = w - 60;
    const barH = 14;
    const barX = 30;

    // 底槽
    ctx.fillStyle = '#E8E3D9';
    this.roundRect(ctx, barX, barY, barW, barH, 7);
    ctx.fill();
    // 底槽微光描边
    ctx.strokeStyle = 'rgba(200,195,180,0.4)';
    ctx.lineWidth = 1;
    this.roundRect(ctx, barX, barY, barW, barH, 7);
    ctx.stroke();

    if (progress > 0) {
      const fillW = Math.max(barH, barW * progress);
      const fillGrad = ctx.createLinearGradient(barX, barY, barX + fillW, barY);
      fillGrad.addColorStop(0, '#51C9B0');
      fillGrad.addColorStop(1, '#70E8D0');
      ctx.fillStyle = fillGrad;
      this.roundRect(ctx, barX, barY, fillW, barH, 7);
      ctx.fill();
      // 填充条发光
      ctx.save();
      ctx.shadowColor = '#70E8D0';
      ctx.shadowBlur = 6;
      ctx.strokeStyle = 'rgba(112,232,208,0.5)';
      ctx.lineWidth = 1;
      this.roundRect(ctx, barX, barY, fillW, barH, 7);
      ctx.stroke();
      ctx.restore();
    }

    ctx.font = `bold ${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.green;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`消除进度 ${collected}/${totalCount}`, w / 2, barY + barH + 6);

    this._gameHeaderBottom = barY + barH + 6 + Theme.fonts.sizes.caption + Theme.layout.gap.sm;
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
    const cols = this._letterCols || 6;
    // 左右留更多边距（w - 56），格子更舒展
    const availW = w - 56;
    const rows = Math.ceil(this.letters.length / cols);
    let letterSize = Math.min(48, (availW / cols - gap) / 1.1547);
    letterSize = Math.max(28, letterSize);
    const hexH = letterSize;
    const vStep = hexH * 0.75 + gap;
    const availH = layout.letterBottom - layout.letterTop;
    const neededH = rows * vStep + hexH * 0.25;
    if (neededH > availH) {
      letterSize = Math.floor((availH - gap * rows) / (rows * 0.75 + 0.25));
      letterSize = Math.max(28, letterSize);
    }
    const hStep = letterSize * 1.1547 + gap;
    const totalW = cols * hStep;
    const startX = (w - totalW) / 2;
    const totalH = rows * vStep + hexH * 0.25;
    const startY = layout.letterTop + Math.max(0, (availH - totalH) / 2);

    this._letterSize = letterSize;
    this._letterStartX = startX;
    this._letterStartY = startY;
    this._letterGap = gap;
    this._letterCols = cols;

    for (const letter of this.letters) {
      if (!letter.visible) continue;
      const { x: hx, y: hy } = this._getLetterGridPos(letter, letterSize, gap, startX, startY);
      const cx = hx + letterSize / 2;
      const cy = hy + letterSize / 2;
      const r = letterSize * 0.46;
      const t = this.animTime || 0;
      const floatY = Math.sin(t * 1.8 + letter.id * 0.7) * 2;

      this._drawLetterBlock(ctx, cx, cy + floatY, r, {
        text: letter.text,
        shape: letter.shape,
        topColor: letter.topColor,
        bottomColor: letter.bottomColor,
        borderColor: letter.borderColor,
        textColor: '#18594B',
        shadowBlur: 12,
      });
    }

    // 飞行动画
    for (const a of this.flyAnimations) {
      ctx.save();
      const p = a.progress;
      const t1 = Math.min(1, p / 0.15);
      const selBounce = t1 < 0.6 ? 1 + t1 * 1.33 * 0.08 : 1.08 - (t1 - 0.6) * 0.08 / 0.4;
      const shrink = p > 0.5 ? 1 - (p - 0.5) * 0.3 : 1;
      const scale = selBounce * shrink;
      const alpha = p < 0.5 ? 1 : 1 - (p - 0.5) * 2;
      ctx.globalAlpha = Math.max(0, alpha);
      const s = letterSize * scale;
      const glow = p < 0.15 ? 20 : 14;

      // 拖尾光晕
      if (p < 0.6) {
        ctx.save();
        ctx.globalAlpha = (1 - p / 0.6) * 0.2;
        ctx.fillStyle = a.topColor || '#BCF6E7';
        ctx.shadowColor = a.topColor || '#70E8D0';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(a.x + s / 2, a.y + s / 2, s * 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      this._drawLetterBlock(ctx, a.x + s / 2, a.y + s / 2, s * 0.46, {
        text: a.text,
        shape: a.shape,
        topColor: a.topColor,
        bottomColor: a.bottomColor,
        borderColor: a.borderColor,
        textColor: '#18594B',
        shadowBlur: glow,
      });
      ctx.restore();
    }
  }

  /**
   * 绘制单个字母块（随机形状 + 马卡龙色 + 3D立体感）
   * shape: 0=六边形 1=圆角方形 2=菱形 3=圆形 4=八边形
   */
  _drawLetterBlock(ctx, cx, cy, r, opts = {}) {
    const shape = opts.shape ?? 0;
    ctx.save();
    ctx.translate(cx, cy);

    // 外发光
    ctx.shadowColor = opts.glowColor || opts.topColor || '#70E8D0';
    ctx.shadowBlur = opts.shadowBlur || 12;

    // 根据形状绘制路径
    this._shapePath(ctx, shape, r);

    // 线性渐变（随机色系）
    const grad = ctx.createLinearGradient(0, -r, 0, r);
    grad.addColorStop(0, opts.topColor || '#BCF6E7');
    grad.addColorStop(1, opts.bottomColor || '#51C9B0');
    ctx.fillStyle = grad;
    ctx.fill();

    // 描边
    ctx.shadowBlur = 0;
    ctx.strokeStyle = opts.borderColor || 'rgba(56,168,144,0.7)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 3D立体感：裁剪后绘制顶部高光 + 底部阴影
    ctx.save();
    this._shapePath(ctx, shape, r);
    ctx.clip();

    // 左上高光（白色径向渐变）
    const hlX = shape === 2 ? 0 : -r * 0.18;
    const hlY = shape === 2 ? -r * 0.15 : -r * 0.3;
    const hlR = r * 0.5;
    ctx.globalAlpha = 0.45;
    const hlGrad = ctx.createRadialGradient(hlX, hlY, 0, hlX, hlY, hlR);
    hlGrad.addColorStop(0, '#ffffff');
    hlGrad.addColorStop(0.5, 'rgba(255,255,255,0.3)');
    hlGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hlGrad;
    ctx.fillRect(-r, -r, r * 2, r * 2);

    // 底部内阴影（轻拟物）
    ctx.globalAlpha = 1;
    const innerShadow = ctx.createLinearGradient(0, r * 0.2, 0, r * 1.1);
    innerShadow.addColorStop(0, 'rgba(0,0,0,0)');
    innerShadow.addColorStop(1, 'rgba(0,60,50,0.1)');
    ctx.fillStyle = innerShadow;
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.restore();

    // 字母（带底部投影增强立体感）
    if (opts.text) {
      ctx.font = `bold ${Math.round(r * 1.2)}px "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // 底部投影文字
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillText(String(opts.text).toUpperCase(), 0, 3);
      // 主文字
      ctx.fillStyle = opts.textColor || '#18594B';
      ctx.fillText(String(opts.text).toUpperCase(), 0, 1);
    }
    ctx.restore();
  }

  /** 按 shape 类型生成裁剪路径 */
  _shapePath(ctx, shape, r) {
    ctx.beginPath();
    switch (shape) {
      case 0: // 六边形
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      case 1: // 圆角方形
        this.roundRect(ctx, -r * 0.85, -r * 0.85, r * 1.7, r * 1.7, r * 0.3);
        break;
      case 2: // 菱形
        ctx.moveTo(0, -r);
        ctx.lineTo(r * 0.85, 0);
        ctx.lineTo(0, r);
        ctx.lineTo(-r * 0.85, 0);
        ctx.closePath();
        break;
      case 3: // 圆形
        ctx.arc(0, 0, r * 0.88, 0, Math.PI * 2);
        break;
      case 4: // 八边形
        for (let i = 0; i < 8; i++) {
          const a = (Math.PI / 4) * i - Math.PI / 8;
          const px = Math.cos(a) * r * 0.92;
          const py = Math.sin(a) * r * 0.92;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      default:
        this.roundRect(ctx, -r, -r, r * 2, r * 2, r * 0.25);
    }
  }

  renderSlots(ctx, w, h) {
    const layout = this._playLayout || this._calcPlayLayout(w, h);
    const { slotSize, slotGap, slotsW, slotsX, slotsY, barPad } = layout;

    this._slotsX = slotsX;
    this._slotsY = slotsY;
    this._slotSize = slotSize;

    const barX = slotsX - barPad;
    const barW = slotsW + barPad * 2;
    const barH = slotSize + barPad * 2;
    const barY = slotsY - barPad;

    // 轻微投影（悬浮感）
    ctx.save();
    ctx.shadowColor = 'rgba(81,201,176,0.15)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#F8F6E9';
    this.roundRect(ctx, barX, barY, barW, barH, 14);
    ctx.fill();
    ctx.restore();

    // 虚线描边
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#C9C2B8';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, barX, barY, barW, barH, 14);
    ctx.stroke();
    ctx.setLineDash([]);

    // 外发光边框（薄荷绿微光）
    ctx.save();
    ctx.shadowColor = '#70E8D0';
    ctx.shadowBlur = 6;
    ctx.strokeStyle = 'rgba(112,232,208,0.25)';
    ctx.lineWidth = 1;
    this.roundRect(ctx, barX, barY, barW, barH, 14);
    ctx.stroke();
    ctx.restore();

    ctx.font = `bold ${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.green;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`🌿 灵槽 (${this.slots.length}/${this.maxSlots})`, w / 2, slotsY - 20);

    for (let i = 0; i < this.maxSlots; i++) {
      const x = slotsX + i * (slotSize + slotGap);
      const y = slotsY;

      if (i < this.slots.length) {
        const slotTile = this.slots[i];
        this._drawLetterBlock(ctx, x + slotSize / 2, y + slotSize / 2, slotSize * 0.46, {
          text: slotTile.text,
          shape: slotTile.shape,
          topColor: slotTile.topColor,
          bottomColor: slotTile.bottomColor,
          borderColor: slotTile.borderColor,
          textColor: '#18594B',
          shadowBlur: 10,
        });
      } else {
        ctx.fillStyle = '#F8F6E9';
        this.roundRect(ctx, x, y, slotSize, slotSize, 8);
        ctx.fill();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#C9C2B8';
        ctx.lineWidth = 1;
        this.roundRect(ctx, x, y, slotSize, slotSize, 8);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    for (const a of this.clearAnimations) {
      ctx.save();
      const p = a.progress;
      const expandR = slotSize * 0.5 * (1 + p * 0.8);
      // 外圈扩散光晕
      ctx.globalAlpha = (1 - p) * 0.25;
      ctx.fillStyle = '#70E8D0';
      ctx.shadowColor = '#70E8D0';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(a.x + slotSize / 2, a.y + slotSize / 2, expandR * 1.4, 0, Math.PI * 2);
      ctx.fill();
      // 内圈实心
      ctx.globalAlpha = (1 - p) * 0.6;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(a.x + slotSize / 2, a.y + slotSize / 2, expandR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  renderResult(ctx, w, h) {
    // 柔和渐变遮罩
    const overlay = ctx.createLinearGradient(0, 0, 0, h);
    overlay.addColorStop(0, 'rgba(30,28,0,0.3)');
    overlay.addColorStop(0.5, 'rgba(30,28,0,0.5)');
    overlay.addColorStop(1, 'rgba(30,28,0,0.3)');
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, w, h);

    const cardW = w * 0.82;
    const cardH = 240;
    const cardX = (w - cardW) / 2;
    const cardY = (h - cardH) / 2;
    const isWin = this.state === 'win';
    const isErrorBook = this.fromErrorBook;

    if (!isWin) {
      this.recordWrongWordsOnFail();
    }

    // 卡片外发光
    ctx.save();
    ctx.shadowColor = isWin ? '#70E8D0' : '#ef4444';
    ctx.shadowBlur = 20;
    this.drawGlassPanel(ctx, cardX, cardY, cardW, cardH, {
      border: isWin ? Theme.colors.button.primary : Theme.colors.button.danger,
    });
    ctx.restore();

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
      const cx = lx + letterSize / 2;
      const cy = ly + letterSize / 2;
      const r = letterSize * 0.46;

      if (this._hitTestHex(x, y, cx, cy, r)) {
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
      shape: letter.shape,
      topColor: letter.topColor,
      bottomColor: letter.bottomColor,
      borderColor: letter.borderColor,
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
    // 马卡龙色系粒子：淡青、淡黄、淡粉、浅绿、薄荷
    const colors = ['#70E8D0', '#FFE89C', '#FFC8DD', '#BCF6E7', '#51C9B0', '#A8E6CF', '#FFD3B6'];
    const cx = this._slotsX + (this.maxSlots * (this._slotSize + 5)) / 2;
    const cy = this._slotsY + this._slotSize / 2;
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 6,
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
