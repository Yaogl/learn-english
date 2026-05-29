import { BaseScene } from './BaseScene';
import { BoardModel } from '../game/BoardModel';
import { WordMatcher } from '../game/WordMatcher';
import { GameData } from '../data/GameData';

/**
 * 羊了个羊风格 - 层叠方块消除（卡通主题）
 */
export class GameScene extends BaseScene {
  constructor() {
    super();
    this.state = 'loading';
    this.layers = [];
    this.targetWords = [];
    this.targetStrings = [];
    this.matchedWords = new Set();
    this.memoryTimer = 0;
    this.startTime = 0;
    this.message = '';

    this.slots = [];
    this.maxSlots = 7;

    this.flyAnimations = [];
    this.clearAnimations = [];
    this.particles = [];
    this.comboTextAnim = null;
    this.shakeTimer = 0;

    this._tileSize = 0;
    this._startX = 0;
    this._startY = 0;
    this._gap = 0;
    this._slotsX = 0;
    this._slotsY = 0;
    this._slotSize = 0;
  }

  onEnter(params) {
    super.onEnter(params);
    this.grade = params.grade || 3;
    this.semester = params.semester || 1;
    this.unit = params.unit || 1;
    this.stage = params.stage || 1;

    const wordPool = GameData.getUnitWords(this.grade, this.semester, this.unit);
    if (!wordPool || wordPool.length === 0) {
      this.message = '暂无单词数据';
      return;
    }

    const shuffled = [...wordPool].sort(() => Math.random() - 0.5);
    const wordCount = Math.min(3, shuffled.length);
    this.targetWords = shuffled.slice(0, wordCount);
    this.targetStrings = this.targetWords.map(w => w.word);
    this.matchedWords = new Set();

    this.buildStackedTiles();

    this.slots = [];
    this.state = 'memory';
    this.memoryTimer = 5;
    this.startTime = Date.now();
    this.message = '记住这些单词！';
    this.flyAnimations = [];
    this.clearAnimations = [];
    this.particles = [];
    this.comboTextAnim = null;

    this._memInterval = setInterval(() => {
      this.memoryTimer--;
      if (this.memoryTimer <= 0) {
        clearInterval(this._memInterval);
        this._memInterval = null;
        this.state = 'playing';
        this.message = '';
      }
    }, 1000);
  }

  buildStackedTiles() {
    this.layers = [];
    const allGroups = [];
    for (const word of this.targetStrings) {
      allGroups.push(...BoardModel.splitWordToGroups(word));
    }

    const extraCount = Math.min(allGroups.length, 6);
    for (let i = 0; i < extraCount; i++) {
      allGroups.push(allGroups[Math.floor(Math.random() * allGroups.length)]);
    }

    for (let i = allGroups.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allGroups[i], allGroups[j]] = [allGroups[j], allGroups[i]];
    }

    const layerCount = 3;
    const perLayer = Math.ceil(allGroups.length / layerCount);
    let nextId = 0;

    for (let layer = 0; layer < layerCount; layer++) {
      const start = layer * perLayer;
      const end = Math.min(start + perLayer, allGroups.length);
      const layerTiles = [];
      for (let i = start; i < end; i++) {
        layerTiles.push({
          id: nextId++,
          text: allGroups[i],
          groupSize: allGroups[i].length,
          layer,
          visible: true,
          row: Math.floor((i - start) / 4),
          col: (i - start) % 4,
        });
      }
      this.layers.push(layerTiles);
    }
  }

  isTileBlocked(tile) {
    for (let l = tile.layer + 1; l < this.layers.length; l++) {
      for (const upper of this.layers[l]) {
        if (!upper.visible) continue;
        const dx = Math.abs(upper.col - tile.col);
        const dy = Math.abs(upper.row - tile.row);
        if (dx < 1.2 && dy < 1.2) return true;
      }
    }
    return false;
  }

  getClickableTiles() {
    const clickable = [];
    for (const layer of this.layers) {
      for (const tile of layer) {
        if (!tile.visible) continue;
        if (!this.isTileBlocked(tile)) clickable.push(tile);
      }
    }
    return clickable;
  }

  update(dt) {
    super.update(dt);

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

    if (this.state === 'playing' && this.matchedWords.size === this.targetStrings.length) {
      this.state = 'win';
      this.message = '';
    }
  }

  render(ctx, w, h) {
    ctx.save();
    if (this.shakeTimer > 0) {
      const intensity = this.shakeTimer * 8;
      ctx.translate((Math.random() - 0.5) * intensity, (Math.random() - 0.5) * intensity);
    }

    // 渐变背景
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#E3F2FD');
    bg.addColorStop(1, '#BBDEFB');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    if (this.state === 'memory') {
      this.renderMemoryPhase(ctx, w, h);
    } else if (this.state === 'playing' || this.state === 'win' || this.state === 'lose') {
      this.renderGamePhase(ctx, w, h);
    }

    ctx.restore();

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

    // Combo文字
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

  renderMemoryPhase(ctx, w, h) {
    const startY = h * 0.18;
    ctx.textAlign = 'center';

    for (let i = 0; i < this.targetWords.length; i++) {
      const tw = this.targetWords[i];
      const y = startY + i * 75;

      this.drawMenuCard(ctx, w * 0.12, y - 15, w * 0.76, 60, {
        bgTop: '#fff',
        bgBottom: '#f5f5f5',
        border: '#E8E8E8',
        accentColor: '#4A90D9',
      });

      ctx.font = 'bold 24px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#333';
      ctx.fillText(tw.word, w / 2, y + 10);

      ctx.font = '14px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(tw.meaning, w / 2, y + 35);
    }

    const timerY = startY + this.targetWords.length * 75 + 25;
    ctx.font = 'bold 32px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = this.memoryTimer <= 2 ? '#FF6B6B' : '#4A90D9';
    ctx.fillText(`${this.memoryTimer}`, w / 2, timerY);

    ctx.font = '14px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText('秒后开始', w / 2, timerY + 22);
  }

  renderGamePhase(ctx, w, h) {
    // 顶部提示
    ctx.font = '13px "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#999';
    const hints = this.targetStrings.map(s => {
      const groups = BoardModel.splitWordToGroups(s);
      return groups.map(() => '□').join('');
    }).join('  ');
    ctx.fillText(hints, w / 2, 25);

    ctx.font = '12px "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#bbb';
    ctx.fillText(`${this.matchedWords.size}/${this.targetStrings.length}`, w - 15, 25);

    // 层叠方块
    this.renderStackedTiles(ctx, w, h);

    // 槽位
    this.renderSlots(ctx, w, h);

    // 按钮
    this.buttons = [];
    this.addButton(10, 10, 60, 30, '← 返回', 'rgba(0,0,0,0.3)', () => {
      if (this._memInterval) { clearInterval(this._memInterval); this._memInterval = null; }
      this.manager.switchTo('mainMenu');
    });

    const btnY = h * 0.85;
    const btnW = 80;
    const btnH = 36;
    const btnGap = 20;
    const btnStartX = (w - btnW * 2 - btnGap) / 2;
    this.addButton(btnStartX, btnY, btnW, btnH, '撤回', '#FF7043', () => this.useRemoveItem());
    this.addButton(btnStartX + btnW + btnGap, btnY, btnW, btnH, '重排', '#78909C', () => this.shuffleBoard());

    this.renderButtons(ctx);
  }

  renderStackedTiles(ctx, w, h) {
    const tileSize = Math.min((w - 40) / 5, 65);
    const gap = 6;
    const startX = (w - 4 * (tileSize + gap)) / 2;
    const startY = h * 0.08;

    this._tileSize = tileSize;
    this._startX = startX;
    this._startY = startY;
    this._gap = gap;

    const clickable = this.getClickableTiles();
    const clickableIds = new Set(clickable.map(t => t.id));

    for (let l = 0; l < this.layers.length; l++) {
      for (const tile of this.layers[l]) {
        if (!tile.visible) continue;

        const x = startX + tile.col * (tileSize + gap) + tile.layer * 8;
        const y = startY + tile.row * (tileSize + gap) + tile.layer * 6;
        const isClickable = clickableIds.has(tile.id);

        ctx.save();
        if (tile.layer > 0) {
          ctx.fillStyle = 'rgba(0,0,0,0.08)';
          this.roundRect(ctx, x + 2, y + 2, tileSize, tileSize, 10);
          ctx.fill();
        }

        ctx.globalAlpha = isClickable ? 1 : 0.4;

        if (isClickable) {
          const grad = ctx.createLinearGradient(x, y, x, y + tileSize);
          grad.addColorStop(0, '#fff');
          grad.addColorStop(1, '#f0f0f0');
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = '#ccc';
        }
        this.roundRect(ctx, x, y, tileSize, tileSize, 10);
        ctx.fill();

        ctx.strokeStyle = isClickable ? '#4A90D9' : '#bbb';
        ctx.lineWidth = isClickable ? 2 : 1;
        this.roundRect(ctx, x, y, tileSize, tileSize, 10);
        ctx.stroke();

        const fontSize = tile.groupSize === 2 ? tileSize * 0.32 : tileSize * 0.4;
        ctx.font = `bold ${fontSize}px "Microsoft YaHei", sans-serif`;
        ctx.fillStyle = isClickable ? '#333' : '#999';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tile.text.toUpperCase(), x + tileSize / 2, y + tileSize / 2);
        ctx.restore();
      }
    }

    // 飞行动画
    for (const a of this.flyAnimations) {
      ctx.save();
      ctx.globalAlpha = 1 - a.progress * 0.3;
      const s = tileSize * (1 - a.progress * 0.4);
      ctx.fillStyle = '#fff';
      this.roundRect(ctx, a.x, a.y, s, s, 8);
      ctx.fill();
      ctx.strokeStyle = '#4A90D9';
      ctx.lineWidth = 2;
      this.roundRect(ctx, a.x, a.y, s, s, 8);
      ctx.stroke();
      const fs = a.groupSize === 2 ? s * 0.32 : s * 0.4;
      ctx.font = `bold ${fs}px "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(a.text.toUpperCase(), a.x + s / 2, a.y + s / 2);
      ctx.restore();
    }
  }

  renderSlots(ctx, w, h) {
    const slotSize = Math.min(50, (w - 30) / this.maxSlots);
    const slotGap = 6;
    const slotsW = this.maxSlots * (slotSize + slotGap) - slotGap;
    const slotsX = (w - slotsW) / 2;
    const slotsY = h * 0.7;

    this._slotsX = slotsX;
    this._slotsY = slotsY;
    this._slotSize = slotSize;

    // 背景
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    this.roundRect(ctx, slotsX - 8, slotsY - 8, slotsW + 16, slotSize + 16, 12);
    ctx.fill();

    for (let i = 0; i < this.maxSlots; i++) {
      const x = slotsX + i * (slotSize + slotGap);
      const y = slotsY;

      if (i < this.slots.length) {
        const tile = this.slots[i];
        ctx.fillStyle = '#4A90D9';
        this.roundRect(ctx, x, y, slotSize, slotSize, 8);
        ctx.fill();
        const fs = tile.groupSize === 2 ? slotSize * 0.32 : slotSize * 0.4;
        ctx.font = `bold ${fs}px "Microsoft YaHei", sans-serif`;
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
    ctx.fillText(isWin ? '过关！' : '失败', w / 2, cardY + 110);

    ctx.font = '14px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#666';
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
    ctx.fillText(
      isWin ? `用时 ${elapsed}秒，消除 ${this.matchedWords.size} 个单词` : '槽位已满，再试一次！',
      w / 2, cardY + 140
    );

    this.buttons = [];
    const btnW = 110;
    const btnH = 40;
    const btnY = cardY + cardH - 60;

    this.addButton(w / 2 - btnW - 8, btnY, btnW, btnH, '再试一次', '#4A90D9', () => {
      this.onEnter({ grade: this.grade, semester: this.semester, unit: this.unit, stage: this.stage });
    });
    if (isWin) {
      this.addButton(w / 2 + 8, btnY, btnW, btnH, '下一关', '#4CAF50', () => {
        this.onEnter({ grade: this.grade, semester: this.semester, unit: this.unit, stage: this.stage + 1 });
      });
    }
    this.addButton(w / 2 - 50, btnY + 50, 100, 32, '返回', '#999', () => {
      if (this._memInterval) { clearInterval(this._memInterval); this._memInterval = null; }
      this.manager.switchTo('mainMenu');
    });

    this.renderButtons(ctx);
  }

  onTouchEnd(x, y) {
    if (this.state !== 'playing') {
      super.onTouchEnd(x, y);
      return;
    }

    const clickable = this.getClickableTiles();
    const tileSize = this._tileSize;

    for (const tile of clickable) {
      const tx = this._startX + tile.col * (tileSize + this._gap) + tile.layer * 8;
      const ty = this._startY + tile.row * (tileSize + this._gap) + tile.layer * 6;
      if (x >= tx && x <= tx + tileSize && y >= ty && y <= ty + tileSize) {
        this.onTileClicked(tile, tx, ty);
        return;
      }
    }

    super.onTouchEnd(x, y);
  }

  onTileClicked(tile, tx, ty) {
    if (this.state !== 'playing') return;
    if (this.slots.length >= this.maxSlots) {
      this.shakeTimer = 0.3;
      return;
    }

    const slotIndex = this.slots.length;
    const slotSize = this._slotSize;

    this.flyAnimations.push({
      text: tile.text,
      groupSize: tile.groupSize,
      fromX: tx,
      fromY: ty,
      toX: this._slotsX + slotIndex * (slotSize + 6),
      toY: this._slotsY,
      x: tx,
      y: ty,
      progress: 0,
    });

    tile.visible = false;
  }

  checkSlotMatch() {
    const slotTexts = this.slots.map(s => s.text);
    const match = WordMatcher.findMatch(slotTexts, this.targetStrings);
    if (match) {
      this.matchedWords.add(match);
      this.comboTextAnim = { text: match + '!', progress: 0 };

      for (let i = 0; i < this.slots.length; i++) {
        this.clearAnimations.push({
          x: this._slotsX + i * (this._slotSize + 6),
          y: this._slotsY,
          progress: 0,
        });
      }

      this.spawnMatchParticles();
      this.slots = [];
    } else if (this.slots.length >= this.maxSlots) {
      this.state = 'lose';
      this.message = '';
      this.shakeTimer = 0.5;
    }
  }

  spawnMatchParticles() {
    const colors = ['#4CAF50', '#FFD700', '#4A90D9', '#FF6B6B', '#9C27B0'];
    const cx = this._slotsX + (this.maxSlots * (this._slotSize + 6)) / 2;
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

  shuffleBoard() {
    const visibleTexts = [];
    for (const layer of this.layers) {
      for (const tile of layer) {
        if (tile.visible) visibleTexts.push(tile.text);
      }
    }
    for (let i = visibleTexts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [visibleTexts[i], visibleTexts[j]] = [visibleTexts[j], visibleTexts[i]];
    }
    let idx = 0;
    for (const layer of this.layers) {
      for (const tile of layer) {
        if (tile.visible && idx < visibleTexts.length) {
          tile.text = visibleTexts[idx++];
        }
      }
    }
  }

  useRemoveItem() {
    if (this.slots.length === 0) return;
    this.slots.pop();
  }

  easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }
}
