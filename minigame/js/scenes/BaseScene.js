/**
 * Base Scene - 修仙国风主题 UI 基类
 */
import { Theme, createGradient, applyShadow, clearShadow } from '../theme.js';

export class BaseScene {
  constructor() {
    this.manager = null;
    this.buttons = [];
    this.scrollY = 0;
    this.maxScrollY = 0;
    this.touchStartY = 0;
    this.isDragging = false;
    this.animTime = 0;
    this.pressedButton = null;
    this.pressedTime = 0;
  }

  onEnter(params) {
    this.buttons = [];
    this.scrollY = 0;
    this.animTime = 0;
    this.pressedButton = null;
    this.pressedTime = 0;
  }

  update(dt) {
    this.animTime += dt;
    if (this.pressedButton) {
      this.pressedTime += dt;
    }
  }

  render(ctx, w, h) {}

  // ==================== 按钮系统 ====================

  addButton(x, y, w, h, label, color, onClick) {
    this.buttons.push({ x, y, w, h, label, color, onClick, pressed: false });
  }

  renderButtons(ctx) {
    for (const btn of this.buttons) {
      if (btn.color === 'transparent' || !btn.label) continue;

      const by = btn.y - this.scrollY;
      const isPressed = btn === this.pressedButton;
      const pressScale = isPressed ? Theme.animation.button.pressScale : 1;
      const isGold = btn.color === Theme.colors.button.gold || btn.color === '#ffd700';
      const isGlass = !isGold && (btn.color === Theme.colors.button.muted || (btn.color && String(btn.color).startsWith('rgba')));

      ctx.save();
      ctx.globalAlpha = isPressed ? Theme.animation.button.pressAlpha : 1;

      if (isPressed) {
        const cx = btn.x + btn.w / 2;
        const cy = by + btn.h / 2;
        ctx.translate(cx, cy);
        ctx.scale(pressScale, pressScale);
        ctx.translate(-cx, -cy);
      }

      const r = Math.min(btn.h * 0.35, 16);
      if (isGlass) {
        ctx.fillStyle = Theme.colors.button.muted;
        this.roundRect(ctx, btn.x, by, btn.w, btn.h, r);
        ctx.fill();
        ctx.strokeStyle = Theme.colors.card.borderMuted;
        ctx.lineWidth = 1;
        this.roundRect(ctx, btn.x, by, btn.w, btn.h, r);
        ctx.stroke();
      } else {
        const grad = ctx.createLinearGradient(btn.x, by, btn.x + btn.w, by + btn.h);
        if (isGold) {
          grad.addColorStop(0, '#ffd700');
          grad.addColorStop(0.5, '#ff9500');
          grad.addColorStop(1, '#ffd700');
          applyShadow(ctx, Theme.shadows.glow);
        } else {
          grad.addColorStop(0, this.lightenColor(btn.color, 15));
          grad.addColorStop(1, btn.color);
          applyShadow(ctx, Theme.shadows.md);
        }
        ctx.fillStyle = grad;
        this.roundRect(ctx, btn.x, by, btn.w, btn.h, r);
        ctx.fill();
        clearShadow(ctx);
      }

      if (!btn.label) { ctx.restore(); continue; }

      ctx.font = `bold ${Math.min(btn.h * 0.4, 18)}px ${Theme.fonts.primary}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isGold ? Theme.colors.text.dark : Theme.colors.text.primary;
      ctx.fillText(btn.label, btn.x + btn.w / 2, by + btn.h / 2);
      ctx.restore();
    }
  }

  lightenColor(color, percent) {
    if (!color || color.startsWith('rgba')) return color;
    const num = parseInt(color.replace('#', ''), 16);
    if (Number.isNaN(num)) return color;
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
  }

  /** 原型深紫渐变背景 + 星点 + 仙气 */
  drawPageBackground(ctx, w, h) {
    const g = ctx.createLinearGradient(0, 0, w * 0.3, h);
    const bg = Theme.colors.background.gradient;
    g.addColorStop(0, bg[0]);
    g.addColorStop(0.5, bg[1]);
    g.addColorStop(1, bg[2]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    this.drawStarField(ctx, w, h);
    this.drawCloudMist(ctx, w, h);
    this.drawSpiritParticles(ctx, w, h);
  }

  drawSkyBackground(ctx, w, h) {
    this.drawPageBackground(ctx, w, h);
  }

  drawStarField(ctx, w, h) {
    const t = this.animTime || 0;
    ctx.save();
    for (let i = 0; i < 28; i++) {
      const x = (w * ((i * 47 + 13) % 100)) / 100;
      const y = (h * ((i * 31 + 7) % 100)) / 100;
      const alpha = 0.25 + Math.sin(t * 0.8 + i * 1.1) * 0.2;
      const r = 0.6 + (i % 3) * 0.5;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = Theme.cultivation.star;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawCloudMist(ctx, w, h) {
    const t = this.animTime || 0;
    ctx.save();
    for (let i = 0; i < 4; i++) {
      const y = h * (0.1 + i * 0.2);
      const alpha = 0.04 + Math.sin(t * 0.25 + i) * 0.02;
      ctx.globalAlpha = alpha;
      for (let x = 0; x <= w; x += 24) {
        const wave = Math.sin(x * 0.015 + t * 0.35 + i) * 18;
        const r = 28 + i * 6;
        const g = ctx.createRadialGradient(x, y + wave, 0, x, y + wave, r);
        g.addColorStop(0, Theme.cultivation.mist);
        g.addColorStop(1, 'rgba(180,130,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y + wave, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  drawSpiritParticles(ctx, w, h) {
    const t = this.animTime || 0;
    ctx.save();
    const colors = Theme.cultivation.spiritColors;
    for (let i = 0; i < 8; i++) {
      const x = w * 0.1 + i * w * 0.11 + Math.sin(t * 0.5 + i * 1.2) * 18;
      const y = h * (0.15 + Math.sin(t * 0.3 + i * 0.8) * 0.12);
      const size = 1.5 + Math.sin(t * 2 + i) * 1;
      const alpha = 0.35 + Math.sin(t * 1.5 + i * 0.7) * 0.25;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = colors[i % colors.length];
      ctx.shadowColor = colors[i % colors.length];
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawTree(ctx, cx, treeY, scale) {
    ctx.save();
    ctx.translate(cx, treeY);
    ctx.scale(scale, scale);

    // 树干 - 仙木质感
    ctx.save();
    const trunkGrad = ctx.createLinearGradient(-30, 0, 30, 0);
    trunkGrad.addColorStop(0, '#6D4C41');
    trunkGrad.addColorStop(0.3, '#8D6E63');
    trunkGrad.addColorStop(0.7, '#8D6E63');
    trunkGrad.addColorStop(1, '#5D4037');
    ctx.fillStyle = trunkGrad;
    ctx.beginPath();
    ctx.moveTo(-25, 0);
    ctx.quadraticCurveTo(-35, -80, -20, -160);
    ctx.quadraticCurveTo(-10, -200, 0, -220);
    ctx.quadraticCurveTo(10, -200, 20, -160);
    ctx.quadraticCurveTo(35, -80, 25, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 树枝 - 灵动曲线
    ctx.save();
    ctx.strokeStyle = '#6D4C41';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    // 左枝
    ctx.beginPath();
    ctx.moveTo(-15, -120);
    ctx.quadraticCurveTo(-80, -150, -120, -100);
    ctx.stroke();
    // 右枝
    ctx.beginPath();
    ctx.moveTo(15, -100);
    ctx.quadraticCurveTo(80, -130, 130, -90);
    ctx.stroke();
    // 上枝
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, -200);
    ctx.quadraticCurveTo(30, -260, 60, -230);
    ctx.stroke();
    ctx.restore();

    // 树冠 - 仙气光晕
    const leafColors = ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'];
    const leafPositions = [
      { x: 0, y: -200, rx: 100, ry: 70 },
      { x: -60, y: -170, rx: 80, ry: 55 },
      { x: 60, y: -160, rx: 85, ry: 60 },
      { x: -30, y: -240, rx: 70, ry: 50 },
      { x: 40, y: -230, rx: 75, ry: 50 },
      { x: 0, y: -150, rx: 90, ry: 55 },
      { x: -90, y: -140, rx: 60, ry: 40 },
      { x: 90, y: -130, rx: 65, ry: 42 },
    ];

    // 外层光晕
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#81C784';
    ctx.shadowColor = '#4CAF50';
    ctx.shadowBlur = 20;
    for (const l of leafPositions) {
      ctx.beginPath();
      ctx.ellipse(l.x, l.y, l.rx * 1.1, l.ry * 1.1, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 树叶
    for (let i = 0; i < leafPositions.length; i++) {
      const l = leafPositions[i];
      ctx.save();
      ctx.fillStyle = leafColors[i % leafColors.length];
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.ellipse(l.x, l.y, l.rx, l.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 灵气高光
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(-20, -230, 40, 25, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 悬挂的灵果
    const t = this.animTime || 0;
    const fruits = [
      { x: -70, y: -200, color: '#FFD700' },
      { x: 80, y: -180, color: '#FF6B6B' },
      { x: -30, y: -260, color: '#87CEEB' },
      { x: 50, y: -240, color: '#DDA0DD' },
      { x: -100, y: -150, color: '#FFA07A' },
      { x: 110, y: -140, color: '#98FB98' },
    ];

    for (const fruit of fruits) {
      const pulse = 0.7 + Math.sin(t * 2 + fruit.x * 0.01) * 0.3;
      ctx.save();
      ctx.globalAlpha = pulse;
      ctx.fillStyle = fruit.color;
      ctx.shadowColor = fruit.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(fruit.x, fruit.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }

  drawLantern(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);

    // 绳子 - 灵纹
    ctx.strokeStyle = '#6D4C41';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.8);
    ctx.lineTo(0, -size * 0.3);
    ctx.stroke();

    // 灯笼主体 - 仙灯
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.5);
    grad.addColorStop(0, '#FFE082');
    grad.addColorStop(0.6, color);
    grad.addColorStop(1, color);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.35, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 灵气光晕
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#FFE082';
    ctx.shadowColor = '#FFE082';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.55, size * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();

    // 灵纹装饰
    ctx.restore();
  }

  drawCloud(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.85;
    ctx.shadowColor = 'rgba(255,255,255,0.3)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(0, 0, 40, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-25, 5, 25, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(25, 5, 28, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawSparkle(ctx, x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    // 发光
    ctx.globalAlpha = alpha * 0.4;
    ctx.beginPath();
    ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ==================== 修仙国风卡片 ====================

  drawMenuCard(ctx, x, y, w, h, opts = {}) {
    this.drawGlassPanel(ctx, x, y, w, h, {
      radius: Theme.borderRadius.lg,
      border: opts.border || Theme.colors.card.borderMuted,
      accentColor: opts.accentColor,
    });
  }

  drawGlassPanel(ctx, x, y, w, h, opts = {}) {
    const r = opts.radius || Theme.borderRadius.lg;
    ctx.save();
    applyShadow(ctx, Theme.shadows.md);
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, opts.bgTop || Theme.colors.card.bgTop);
    grad.addColorStop(1, opts.bgBottom || Theme.colors.card.bgBottom);
    ctx.fillStyle = grad;
    this.roundRect(ctx, x, y, w, h, r);
    ctx.fill();
    clearShadow(ctx);
    ctx.strokeStyle = opts.border || Theme.colors.card.border;
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, x, y, w, h, r);
    ctx.stroke();
    if (opts.accentColor) {
      ctx.fillStyle = opts.accentColor;
      this.roundRectTop(ctx, x, y, w, 3, r);
      ctx.fill();
    }
    ctx.restore();
  }

  drawCard(ctx, x, y, w, h, opts = {}) {
    this.drawGlassPanel(ctx, x, y, w, h, {
      radius: opts.radius || Theme.borderRadius.lg,
      border: opts.border || Theme.colors.card.border,
      bgTop: opts.bg || Theme.colors.card.bgTop,
      bgBottom: opts.bg || Theme.colors.card.bgBottom,
    });
    if (opts.glow) this.drawGlowEffect(ctx, x, y, w, h, opts.glow);
  }

  drawGlowEffect(ctx, x, y, w, h, color) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    this.roundRect(ctx, x - 2, y - 2, w + 4, h + 4, Theme.borderRadius.lg);
    ctx.stroke();
    ctx.restore();
  }

  /** 六边形灵石字母块 */
  drawSpiritTile(ctx, x, y, size, opts = {}) {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const r = size * 0.46;
    const seed = opts.seed || 0;
    const rot = (opts.rotation || 0) + Math.sin((this.animTime || 0) * 1.8 + seed) * 0.04;
    const pulse = 0.9 + Math.sin((this.animTime || 0) * 2.2 + seed * 1.7) * 0.1;
    const glow = opts.glowColor || Theme.colors.accent.gold;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.shadowColor = glow;
    ctx.shadowBlur = 14 * pulse;

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    const g = ctx.createLinearGradient(-r, -r * 0.8, r, r);
    g.addColorStop(0, opts.topColor || Theme.colors.game.tileTop);
    g.addColorStop(0.45, '#4a2f85');
    g.addColorStop(1, opts.bottomColor || Theme.colors.game.tileBottom);
    ctx.fillStyle = g;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = opts.borderColor || Theme.colors.game.tileBorder;
    ctx.lineWidth = opts.borderWidth || 2;
    ctx.stroke();

    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    ctx.arc(-r * 0.15, -r * 0.35, r * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.globalAlpha = 1;

    if (opts.text) {
      ctx.font = `bold ${Math.round(size * 0.44)}px ${Theme.fonts.letter}`;
      ctx.fillStyle = opts.textColor || Theme.colors.game.tileText;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = glow;
      ctx.shadowBlur = 8;
      ctx.fillText(String(opts.text).toUpperCase(), 0, 2);
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }

  /** 顶部境界标题，返回内容区起始 Y */
  drawRealmHeader(ctx, w, realm, subText, startY) {
    const top = startY ?? Theme.layout.safeTop;
    const gap = Theme.layout.gap;
    const headerSize = Theme.fonts.sizes.header;
    const captionSize = Theme.fonts.sizes.caption;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${headerSize}px ${Theme.fonts.primary}`;
    ctx.fillStyle = realm.color;
    ctx.shadowColor = realm.color;
    ctx.shadowBlur = 10;
    ctx.fillText(`${realm.icon} ${realm.name}`, w / 2, top);
    ctx.shadowBlur = 0;

    let bottom = top + headerSize / 2;
    if (subText) {
      const subY = bottom + gap.lg + captionSize / 2;
      ctx.font = `${captionSize}px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.secondary;
      ctx.fillText(subText, w / 2, subY);
      bottom = subY + captionSize / 2;
    }
    ctx.restore();
    return bottom + gap.md;
  }

  drawTitle(ctx, text, x, y, size, color) {
    ctx.save();
    const fontSize = size || Theme.fonts.sizes.title;
    ctx.font = `bold ${fontSize}px ${Theme.fonts.primary}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (color === 'gradient') {
      const g = ctx.createLinearGradient(x - 90, y, x + 90, y);
      g.addColorStop(0, Theme.colors.accent.gold);
      g.addColorStop(0.5, Theme.colors.accent.pink);
      g.addColorStop(1, Theme.colors.accent.lavender);
      ctx.fillStyle = g;
      ctx.shadowColor = 'rgba(255,215,0,0.45)';
      ctx.shadowBlur = 12;
    } else {
      ctx.fillStyle = color || Theme.colors.text.primary;
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 4;
    }
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawSubTitle(ctx, text, x, y, color) {
    ctx.save();
    ctx.font = `${Theme.fonts.sizes.subtitle}px ${Theme.fonts.primary}`;
    ctx.fillStyle = color || Theme.colors.text.secondary;
    ctx.textAlign = typeof x === 'number' && x < 100 ? 'left' : 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  /**
   * 子页面标准顶栏：返回 + 居中标题 + 可选副标题
   * @returns {{ headerBottom: number, titleY: number, subTitleY: number }}
   */
  drawPageHeader(ctx, w, title, onBack, opts = {}) {
    const gap = Theme.layout.gap;
    const back = Theme.layout.backBtn;
    const titleSize = opts.titleSize || Theme.fonts.sizes.title;

    if (onBack) {
      this.addButton(back.x, back.y, back.w, back.h, '← 返回', Theme.colors.button.muted, onBack);
    }

    const titleY = back.y + back.h + gap.lg + titleSize / 2;
    this.drawTitle(ctx, title, w / 2, titleY, titleSize, opts.titleColor || 'gradient');

    let headerBottom = titleY + titleSize / 2;
    let subTitleY = 0;

    if (opts.subTitle) {
      subTitleY = headerBottom + gap.md + Theme.fonts.sizes.subtitle / 2;
      const subX = opts.subTitleAlign === 'left' ? (opts.subTitleX ?? 20) : w / 2;
      this.drawSubTitle(ctx, opts.subTitle, subX, subTitleY, opts.subTitleColor);
      headerBottom = subTitleY + Theme.fonts.sizes.subtitle / 2;
    }

    headerBottom += gap.md;
    return { headerBottom, titleY, subTitleY };
  }

  /** 标签栏，返回列表起始 Y */
  drawTabBar(ctx, w, tabs, selectedKey, startY, onSelect) {
    const gap = Theme.layout.gap;
    const tabH = Theme.layout.tabBar.h;
    const tabGap = Theme.layout.tabBar.gap;
    const tabW = (w - 36 - tabGap * (tabs.length - 1)) / tabs.length;

    tabs.forEach((tab, i) => {
      const x = 18 + i * (tabW + tabGap);
      const y = startY;
      const selected = selectedKey === tab.key;

      if (selected) {
        const tabGrad = ctx.createLinearGradient(x, y, x, y + tabH);
        tabGrad.addColorStop(0, Theme.colors.button.gold);
        tabGrad.addColorStop(1, Theme.colors.accent.gold);
        ctx.fillStyle = tabGrad;
      } else {
        ctx.fillStyle = Theme.colors.glass;
      }
      this.roundRect(ctx, x, y, tabW, tabH, Theme.borderRadius.md);
      ctx.fill();

      ctx.font = `bold ${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
      ctx.fillStyle = selected ? Theme.colors.text.dark : Theme.colors.text.secondary;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tab.label, x + tabW / 2, y + tabH / 2);

      this.addButton(x, y, tabW, tabH, '', 'transparent', () => onSelect(tab.key));
    });

    return startY + tabH + gap.lg;
  }

  drawBackButton(ctx, x, y, onClick) {
    const pos = Theme.layout.backBtn;
    const bx = x != null && x !== 10 ? x : pos.x;
    const by = y != null && y !== 10 ? y : pos.y;
    this.addButton(bx, by, pos.w, pos.h, '← 返回', Theme.colors.button.muted, onClick);
  }

  roundRectTop(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  /** 故事卷轴面板（原型 story-scroll） */
  drawStoryScroll(ctx, x, y, w, h) {
    ctx.save();
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, 'rgba(139,90,43,0.35)');
    grad.addColorStop(1, 'rgba(80,50,20,0.25)');
    ctx.fillStyle = grad;
    this.roundRect(ctx, x, y, w, h, Theme.borderRadius.xl);
    ctx.fill();
    ctx.strokeStyle = Theme.colors.card.border;
    ctx.lineWidth = 2;
    this.roundRect(ctx, x, y, w, h, Theme.borderRadius.xl);
    ctx.stroke();
    ctx.restore();
  }

  // ==================== 基础图形 ====================

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = text.split('');
    let line = '';
    let lineY = y;
    for (const char of chars) {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth) {
        ctx.fillText(line, x, lineY);
        line = char;
        lineY += lineHeight;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, x, lineY);
  }

  // ==================== 触摸处理 ====================

  onTouchStart(x, y) {
    this.touchStartY = y;
    this.isDragging = false;

    // 检测按钮按下
    for (const btn of this.buttons) {
      const by = btn.y - this.scrollY;
      if (x >= btn.x && x <= btn.x + btn.w && y >= by && y <= by + btn.h) {
        this.pressedButton = btn;
        this.pressedTime = 0;
        break;
      }
    }
  }

  onTouchMove(x, y) {
    if (this.maxScrollY > 0) {
      const dy = y - this.touchStartY;
      this.scrollY = Math.max(0, Math.min(this.maxScrollY, this.scrollY - dy));
      this.touchStartY = y;
      this.isDragging = true;

      // 滚动时取消按钮按下状态
      this.pressedButton = null;
    }
  }

  onTouchEnd(x, y) {
    // 重置按钮按下状态
    this.pressedButton = null;

    if (this.isDragging) return;
    for (const btn of this.buttons) {
      const by = btn.y - this.scrollY;
      if (x >= btn.x && x <= btn.x + btn.w && y >= by && y <= by + btn.h) {
        btn.onClick();
        return;
      }
    }
  }

  // ==================== 动画辅助函数 ====================

  // 缓动函数
  easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  easeOutQuad(t) {
    return t * (2 - t);
  }

  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // 灵气光效动画
  drawSpiritGlow(ctx, x, y, size, color, intensity = 1) {
    const t = this.animTime || 0;
    const pulse = 0.5 + Math.sin(t * 3) * 0.5;

    ctx.save();
    ctx.globalAlpha = pulse * intensity * 0.3;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = pulse * intensity * 0.6;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
