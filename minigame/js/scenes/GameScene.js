import { BaseScene } from './BaseScene';
import { getStageData, getRealmByStage } from '../data/LevelData';

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
    this.matchedWords = new Set();
    this.targetStrings = [];

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
    this.stage = params?.stage || 1;
    this.stageData = getStageData(this.stage);

    // 故事阶段
    this.state = 'story';
    this.storyScrollY = 0;
    this.storyAlpha = 0;

    // 记忆阶段
    this.memoryTimer = 30;
    this.memoryWords = this.stageData.words;
    this.memoryIndex = 0;
    this.memoryRound = 1;
    this.memoryMaxRounds = 3;

    // 游戏阶段
    this.letters = [];
    this.slots = [];
    this.matchedWords = new Set();
    this.targetStrings = this.stageData.words.map(w => w.word);
    this.maxSlots = this.stageData.maxSlots;

    // 动画
    this.flyAnimations = [];
    this.clearAnimations = [];
    this.particles = [];
    this.comboTextAnim = null;
    this.shakeTimer = 0;
    this.winAnim = 0;

    this.buttons = [];
  }

  update(dt) {
    super.update(dt);

    if (this.state === 'story') {
      this.storyAlpha = Math.min(1, this.animTime * 2);
      this.storyScrollY += dt * 40;
      if (this.animTime > 4) {
        this.state = 'memory';
        this.animTime = 0;
      }
    }

    if (this.state === 'memory') {
      this.memoryTimer = Math.max(0, 30 - this.animTime);
      if (this.memoryTimer <= 0) {
        this.state = 'playing';
        this.animTime = 0;
        this.generateLetters();
      }
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
      this.slots.push({ text: a.text, groupSize: a.groupSize });
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

    if (this.state === 'playing' && this.matchedWords.size === this.targetStrings.length) {
      this.state = 'win';
      this.winAnim = 0;
      this.saveProgress();
    }
  }

  /**
   * 生成平铺字母 - 铺满屏幕
   */
  generateLetters() {
    const allLetters = [];

    for (const word of this.targetStrings) {
      for (const char of word) {
        allLetters.push({ text: char, groupSize: 1 });
      }
    }

    // 增加干扰字母，让屏幕铺满
    const wordLetters = allLetters.length;
    const extraCount = Math.max(this.stageData.extraLetters, 12 - wordLetters);
    const pool = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < extraCount; i++) {
      const idx = (this.stage * 3 + i * 7) % pool.length;
      allLetters.push({ text: pool[idx], groupSize: 1 });
    }

    for (let i = allLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
    }

    this.letters = allLetters.map((item, i) => ({
      id: i,
      text: item.text,
      groupSize: item.groupSize,
      visible: true,
    }));
  }

  render(ctx, w, h) {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#E8F5E9');
    bg.addColorStop(1, '#C8E6C9');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

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
      ctx.fillStyle = '#FF9800';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#FF9800';
      ctx.shadowBlur = 20;
      ctx.fillText(a.text, w / 2, h * 0.35 - a.progress * 50);
      ctx.restore();
    }

    if (this.state === 'win' || this.state === 'lose') {
      this.renderResult(ctx, w, h);
    }
  }

  /**
   * 故事字幕阶段
   */
  renderStory(ctx, w, h) {
    ctx.save();
    ctx.globalAlpha = this.storyAlpha;

    const realm = this.stageData.realm;
    ctx.font = 'bold 16px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = realm.color;
    ctx.textAlign = 'center';
    ctx.fillText(`${realm.icon} ${realm.name} · 第${this.stage}关`, w / 2, 60);

    const story = this.stageData.story;
    ctx.font = '18px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';

    const lines = this.wrapTextLines(ctx, story, w * 0.85);
    const lineHeight = 32;
    const startY = h * 0.35 - this.storyScrollY;

    for (let i = 0; i < lines.length; i++) {
      const y = startY + i * lineHeight;
      if (y > -30 && y < h + 30) {
        const alpha = Math.min(1, Math.max(0, (y - 80) / 60));
        ctx.globalAlpha = this.storyAlpha * alpha;
        ctx.fillText(lines[i], w / 2, y);
      }
    }

    ctx.restore();

    ctx.font = '14px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.fillText('点击跳过', w / 2, h - 40);
  }

  /**
   * 记忆单词阶段 - 铺满屏幕 + 多轮展示
   */
  renderMemory(ctx, w, h) {
    // 境界信息
    const realm = this.stageData.realm;
    ctx.font = 'bold 14px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = realm.color;
    ctx.textAlign = 'center';
    ctx.fillText(`${realm.icon} ${realm.name} · 第${this.stage}关`, w / 2, 30);

    // 轮次信息
    ctx.font = 'bold 13px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText(`第 ${this.memoryRound} / ${this.memoryMaxRounds} 轮`, w / 2, 48);

    // 倒计时
    const timerColor = this.memoryTimer <= 5 ? '#FF6B6B' : '#4CAF50';
    ctx.font = 'bold 20px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = timerColor;
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.ceil(this.memoryTimer)}s`, w - 15, 30);

    // 进度条
    const barW = w - 30;
    const barY = 58;
    ctx.fillStyle = '#E0E0E0';
    this.roundRect(ctx, 15, barY, barW, 5, 3);
    ctx.fill();
    ctx.fillStyle = timerColor;
    this.roundRect(ctx, 15, barY, barW * (this.memoryTimer / 30), 5, 3);
    ctx.fill();

    // 单词网格 - 铺满屏幕
    const words = this.memoryWords;
    const cols = words.length <= 2 ? 1 : 2;
    const rows = Math.ceil(words.length / cols);
    const cardGap = 10;
    const topY = 72;
    const bottomY = h - 120;
    const availableH = bottomY - topY;
    const cardH = Math.min(140, (availableH - (rows - 1) * cardGap) / rows);
    const cardW = (w - 30 - (cols - 1) * cardGap) / cols;
    const startX = 15;

    for (let i = 0; i < words.length; i++) {
      const tw = words[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + cardGap);
      const y = topY + row * (cardH + cardGap);

      this.drawCard(ctx, x, y, cardW, cardH, { border: '#4CAF50' });

      // 英文单词（大字）
      ctx.font = `bold ${Math.min(32, cardW * 0.18)}px "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(tw.word, x + cardW / 2, y + cardH * 0.22);

      // 音标
      ctx.font = `${Math.min(14, cardW * 0.08)}px sans-serif`;
      ctx.fillStyle = '#999';
      ctx.fillText(tw.phonetic || '', x + cardW / 2, y + cardH * 0.38);

      // 中文释义
      ctx.font = `bold ${Math.min(16, cardW * 0.09)}px "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = '#4CAF50';
      ctx.fillText(tw.meaning, x + cardW / 2, y + cardH * 0.55);

      // 过去式
      if (tw.past) {
        ctx.font = `${Math.min(13, cardW * 0.07)}px "Microsoft YaHei", sans-serif`;
        ctx.fillStyle = '#FF9800';
        ctx.fillText(`过去式: ${tw.past}`, x + cardW / 2, y + cardH * 0.7);
      }

      // 例句
      if (tw.example) {
        ctx.font = `${Math.min(12, cardW * 0.065)}px "Microsoft YaHei", sans-serif`;
        ctx.fillStyle = '#666';
        const exLines = this.wrapTextLines(ctx, tw.example, cardW - 20);
        for (let j = 0; j < Math.min(2, exLines.length); j++) {
          ctx.fillText(exLines[j], x + cardW / 2, y + cardH * 0.85 + j * 14);
        }
      }
    }

    // 底部按钮
    this.buttons = [];
    const btnW = 120;
    const btnH = 40;
    const btnY = h - 60;

    if (this.memoryRound < this.memoryMaxRounds) {
      this.addButton(w / 2 - btnW - 8, btnY, btnW, btnH, '下一轮', '#FF9800', () => {
        this.memoryRound++;
        this.animTime = 0;
        this.memoryTimer = 30;
      });
      this.addButton(w / 2 + 8, btnY, btnW, btnH, '开始挑战', '#4CAF50', () => {
        this.state = 'playing';
        this.animTime = 0;
        this.generateLetters();
      });
    } else {
      this.addButton(w / 2 - btnW / 2, btnY, btnW, btnH, '开始挑战', '#4CAF50', () => {
        this.state = 'playing';
        this.animTime = 0;
        this.generateLetters();
      });
    }
    this.renderButtons(ctx);
  }

  /**
   * 游戏阶段
   */
  renderGame(ctx, w, h) {
    ctx.save();
    if (this.shakeTimer > 0) {
      const intensity = this.shakeTimer * 8;
      ctx.translate((Math.random() - 0.5) * intensity, (Math.random() - 0.5) * intensity);
    }

    // 顶部进度
    ctx.font = '13px "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#999';
    ctx.fillText(`第${this.stage}关 · ${this.matchedWords.size}/${this.targetStrings.length}`, w / 2, 25);

    const realm = this.stageData.realm;
    ctx.font = '12px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = realm.color;
    ctx.fillText(`${realm.icon} ${realm.name}`, w / 2, 42);

    // 平铺字母区
    this.renderLetters(ctx, w, h);

    // 槽位
    this.renderSlots(ctx, w, h);

    ctx.restore();

    this.buttons = [];
    this.addButton(10, 10, 60, 30, '← 返回', 'rgba(0,0,0,0.3)', () => {
      this.manager.switchTo('levels');
    });
    this.renderButtons(ctx);
  }

  renderLetters(ctx, w, h) {
    const cols = Math.min(6, Math.ceil(Math.sqrt(this.letters.length * 1.5)));
    const letterSize = Math.min(55, (w - 40 - (cols - 1) * 8) / cols);
    const gap = 8;
    const totalW = cols * letterSize + (cols - 1) * gap;
    const startX = (w - totalW) / 2;
    const startY = h * 0.08;

    this._letterSize = letterSize;
    this._letterStartX = startX;
    this._letterStartY = startY;
    this._letterGap = gap;

    const visibleLetters = this.letters.filter(l => l.visible);

    for (const letter of visibleLetters) {
      const idx = visibleLetters.indexOf(letter);
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = startX + col * (letterSize + gap);
      const y = startY + row * (letterSize + gap);

      ctx.save();
      const grad = ctx.createLinearGradient(x, y, x, y + letterSize);
      grad.addColorStop(0, '#fff');
      grad.addColorStop(1, '#f5f5f5');
      ctx.fillStyle = grad;
      this.roundRect(ctx, x, y, letterSize, letterSize, 10);
      ctx.fill();
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 2;
      this.roundRect(ctx, x, y, letterSize, letterSize, 10);
      ctx.stroke();
      ctx.font = `bold ${letterSize * 0.5}px "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter.text.toUpperCase(), x + letterSize / 2, y + letterSize / 2);
      ctx.restore();
    }

    for (const a of this.flyAnimations) {
      ctx.save();
      ctx.globalAlpha = 1 - a.progress * 0.3;
      const s = letterSize * (1 - a.progress * 0.4);
      ctx.fillStyle = '#fff';
      this.roundRect(ctx, a.x, a.y, s, s, 8);
      ctx.fill();
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 2;
      this.roundRect(ctx, a.x, a.y, s, s, 8);
      ctx.stroke();
      ctx.font = `bold ${s * 0.5}px "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(a.text.toUpperCase(), a.x + s / 2, a.y + s / 2);
      ctx.restore();
    }
  }

  renderSlots(ctx, w, h) {
    const slotSize = Math.min(48, (w - 30) / this.maxSlots);
    const slotGap = 5;
    const slotsW = this.maxSlots * (slotSize + slotGap) - slotGap;
    const slotsX = (w - slotsW) / 2;
    const slotsY = h * 0.72;

    this._slotsX = slotsX;
    this._slotsY = slotsY;
    this._slotSize = slotSize;

    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    this.roundRect(ctx, slotsX - 8, slotsY - 8, slotsW + 16, slotSize + 16, 12);
    ctx.fill();

    for (let i = 0; i < this.maxSlots; i++) {
      const x = slotsX + i * (slotSize + slotGap);
      const y = slotsY;

      if (i < this.slots.length) {
        const tile = this.slots[i];
        ctx.fillStyle = '#4CAF50';
        this.roundRect(ctx, x, y, slotSize, slotSize, 8);
        ctx.fill();
        ctx.font = `bold ${slotSize * 0.45}px "Microsoft YaHei", sans-serif`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tile.text.toUpperCase(), x + slotSize / 2, y + slotSize / 2);
      } else {
        ctx.fillStyle = '#f5f5f5';
        this.roundRect(ctx, x, y, slotSize, slotSize, 8);
        ctx.fill();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        this.roundRect(ctx, x, y, slotSize, slotSize, 8);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    for (const a of this.clearAnimations) {
      ctx.save();
      ctx.globalAlpha = 1 - a.progress;
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(a.x + slotSize / 2, a.y + slotSize / 2, slotSize * 0.6 * (1 + a.progress * 0.5), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  renderResult(ctx, w, h) {
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, w, h);

    const cardW = w * 0.8;
    const cardH = 220;
    const cardX = (w - cardW) / 2;
    const cardY = (h - cardH) / 2;
    const isWin = this.state === 'win';

    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: isWin ? '#4CAF50' : '#FF6B6B',
    });

    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(isWin ? '🎉' : '😢', w / 2, cardY + 60);

    ctx.font = 'bold 28px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = isWin ? '#4CAF50' : '#FF6B6B';
    ctx.fillText(isWin ? '突破成功！' : '走火入魔', w / 2, cardY + 110);

    ctx.font = '14px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#666';
    ctx.fillText(
      isWin ? `成功掌握 ${this.targetStrings.length} 个单词` : '槽位已满，再试一次！',
      w / 2, cardY + 140
    );

    this.buttons = [];
    const btnW = 110;
    const btnH = 40;
    const btnY = cardY + cardH - 60;

    this.addButton(w / 2 - btnW - 8, btnY, btnW, btnH, '再试一次', '#FF9800', () => {
      this.onEnter({ stage: this.stage });
    });
    if (isWin && this.stage < 200) {
      this.addButton(w / 2 + 8, btnY, btnW, btnH, '继续修炼', '#4CAF50', () => {
        this.onEnter({ stage: this.stage + 1 });
      });
    }
    this.addButton(w / 2 - 50, btnY + 50, 100, 32, '返回', '#999', () => {
      this.manager.switchTo('levels');
    });

    this.renderButtons(ctx);
  }

  // ==================== 触摸 ====================

  onTouchEnd(x, y) {
    if (this.state === 'story') {
      this.state = 'memory';
      this.animTime = 0;
      return;
    }

    if (this.state !== 'playing') {
      super.onTouchEnd(x, y);
      return;
    }

    const visibleLetters = this.letters.filter(l => l.visible);
    const letterSize = this._letterSize;
    const gap = this._letterGap;
    const cols = Math.min(6, Math.ceil(Math.sqrt(this.letters.length * 1.5)));

    for (const letter of visibleLetters) {
      const idx = visibleLetters.indexOf(letter);
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const lx = this._letterStartX + col * (letterSize + gap);
      const ly = this._letterStartY + row * (letterSize + gap);

      if (x >= lx && x <= lx + letterSize && y >= ly && y <= ly + letterSize) {
        this.onLetterClicked(letter, lx, ly);
        return;
      }
    }

    super.onTouchEnd(x, y);
  }

  onLetterClicked(letter, lx, ly) {
    if (this.state !== 'playing') return;
    if (this.slots.length >= this.maxSlots) {
      this.shakeTimer = 0.3;
      return;
    }

    const slotIndex = this.slots.length;
    const slotSize = this._slotSize;

    this.flyAnimations.push({
      text: letter.text,
      groupSize: letter.groupSize,
      fromX: lx,
      fromY: ly,
      toX: this._slotsX + slotIndex * (slotSize + 5),
      toY: this._slotsY,
      x: lx,
      y: ly,
      progress: 0,
    });

    letter.visible = false;
  }

  checkSlotMatch() {
    const slotTexts = this.slots.map(s => s.text).join('');

    for (const word of this.targetStrings) {
      if (this.matchedWords.has(word)) continue;

      const wordChars = word.split('');
      const slotChars = [...slotTexts];
      let allFound = true;

      for (const ch of wordChars) {
        const idx = slotChars.indexOf(ch);
        if (idx === -1) {
          allFound = false;
          break;
        }
        slotChars.splice(idx, 1);
      }

      if (allFound) {
        this.matchedWords.add(word);
        this.comboTextAnim = { text: word + '!', progress: 0 };

        const toRemove = word.split('');
        this.slots = this.slots.filter(s => {
          const idx = toRemove.indexOf(s.text);
          if (idx !== -1) {
            toRemove.splice(idx, 1);
            return false;
          }
          return true;
        });

        for (let i = 0; i < this.maxSlots; i++) {
          this.clearAnimations.push({
            x: this._slotsX + i * (this._slotSize + 5),
            y: this._slotsY,
            progress: 0,
          });
        }

        this.spawnMatchParticles();
        return;
      }
    }

    if (this.slots.length >= this.maxSlots) {
      this.state = 'lose';
      this.shakeTimer = 0.5;
    }
  }

  spawnMatchParticles() {
    const colors = ['#4CAF50', '#FFD700', '#4A90D9', '#FF6B6B', '#9C27B0'];
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
    try {
      const data = wx.getStorageSync('completed_stages');
      const stages = data ? JSON.parse(data) : [];
      if (!stages.includes(this.stage)) {
        stages.push(this.stage);
        wx.setStorageSync('completed_stages', JSON.stringify(stages));
      }
    } catch (e) {}
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
