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
      const by = btn.y - this.scrollY;
      const isPressed = btn === this.pressedButton;
      const pressScale = isPressed ? Theme.animation.button.pressScale : 1;
      const pressAlpha = isPressed ? Theme.animation.button.pressAlpha : 1;

      ctx.save();
      ctx.globalAlpha = pressAlpha;

      // 阴影
      applyShadow(ctx, Theme.shadows.md);

      // 按钮背景渐变
      const grad = ctx.createLinearGradient(btn.x, by, btn.x, by + btn.h);
      if (btn.color === 'transparent') {
        grad.addColorStop(0, 'rgba(255,255,255,0.9)');
        grad.addColorStop(1, 'rgba(255,255,255,0.7)');
      } else {
        grad.addColorStop(0, this.lightenColor(btn.color, 20));
        grad.addColorStop(1, btn.color);
      }
      ctx.fillStyle = grad;

      // 按下时缩小效果
      if (isPressed) {
        const centerX = btn.x + btn.w / 2;
        const centerY = by + btn.h / 2;
        ctx.translate(centerX, centerY);
        ctx.scale(pressScale, pressScale);
        ctx.translate(-centerX, -centerY);
      }

      this.roundRect(ctx, btn.x, by, btn.w, btn.h, btn.h * 0.3);
      ctx.fill();
      clearShadow(ctx);

      // 灵纹装饰边框
      if (btn.color !== 'transparent') {
        ctx.strokeStyle = this.lightenColor(btn.color, 30);
        ctx.lineWidth = 1.5;
        this.roundRect(ctx, btn.x, by, btn.w, btn.h, btn.h * 0.3);
        ctx.stroke();
      }

      ctx.restore();

      // 文字
      ctx.save();
      ctx.fillStyle = btn.color === 'transparent' ? Theme.colors.text.primary : '#fff';
      ctx.font = `bold ${Math.min(btn.h * 0.42, 18)}px ${Theme.fonts.primary}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (isPressed) {
        const centerX = btn.x + btn.w / 2;
        const centerY = by + btn.h / 2;
        ctx.translate(centerX, centerY);
        ctx.scale(pressScale, pressScale);
        ctx.translate(-centerX, -centerY);
      }

      ctx.fillText(btn.label, btn.x + btn.w / 2, by + btn.h / 2);
      ctx.restore();
    }
  }

  // 颜色辅助函数
  lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
  }

  // ==================== 修仙国风背景绘制 ====================

  drawSkyBackground(ctx, w, h) {
    // 天空渐变 - 仙气缭绕
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#E8F5E9');      // 浅绿仙气
    sky.addColorStop(0.3, '#C8E6C9');   // 中绿
    sky.addColorStop(0.7, '#A5D6A7');   // 深绿
    sky.addColorStop(1, '#81C784');      // 底部绿
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // 云雾效果 - 仙气缭绕
    this.drawCloudMist(ctx, w, h);

    // 远山仙景
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    ctx.quadraticCurveTo(w * 0.15, h * 0.35, w * 0.3, h * 0.45);
    ctx.quadraticCurveTo(w * 0.5, h * 0.25, w * 0.7, h * 0.4);
    ctx.quadraticCurveTo(w * 0.85, h * 0.3, w, h * 0.45);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 灵气光点
    this.drawSpiritParticles(ctx, w, h);
  }

  // 云雾效果
  drawCloudMist(ctx, w, h) {
    const t = this.animTime || 0;
    ctx.save();

    // 多层云雾
    for (let i = 0; i < 5; i++) {
      const y = h * (0.1 + i * 0.15);
      const alpha = 0.08 + Math.sin(t * 0.3 + i) * 0.03;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FFFFFF';

      // 波浪形云雾
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= w; x += 20) {
        const wave = Math.sin(x * 0.02 + t * 0.5 + i * 0.8) * 15;
        ctx.lineTo(x, y + wave);
      }
      ctx.lineTo(w, y + 30);
      ctx.lineTo(0, y + 30);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  // 灵气光点
  drawSpiritParticles(ctx, w, h) {
    const t = this.animTime || 0;
    ctx.save();

    const colors = ['#FFD700', '#87CEEB', '#98FB98', '#DDA0DD', '#FFA07A'];

    for (let i = 0; i < 8; i++) {
      const x = (w * 0.1 + i * w * 0.12) + Math.sin(t * 0.5 + i * 1.2) * 20;
      const y = h * (0.2 + Math.sin(t * 0.3 + i * 0.8) * 0.15);
      const size = 2 + Math.sin(t * 2 + i) * 1.5;
      const alpha = 0.4 + Math.sin(t * 1.5 + i * 0.7) * 0.3;

      ctx.globalAlpha = alpha;
      ctx.fillStyle = colors[i % colors.length];

      // 发光效果
      ctx.shadowColor = colors[i % colors.length];
      ctx.shadowBlur = 8;

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
    ctx.save();
    // 灵气阴影
    ctx.shadowColor = 'rgba(0,0,0,0.08)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;

    // 卡片背景 - 灵纹渐变
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, opts.bgTop || '#FFFFFF');
    grad.addColorStop(1, opts.bgBottom || '#FAFAFA');
    ctx.fillStyle = grad;
    this.roundRect(ctx, x, y, w, h, Theme.borderRadius.lg);
    ctx.fill();
    ctx.restore();

    // 灵纹边框
    ctx.strokeStyle = opts.border || Theme.colors.card.border;
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, x, y, w, h, Theme.borderRadius.lg);
    ctx.stroke();

    // 顶部灵气装饰条
    if (opts.accentColor) {
      ctx.save();
      ctx.beginPath();
      this.roundRectTop(ctx, x, y, w, 4, Theme.borderRadius.lg);
      ctx.fillStyle = opts.accentColor;
      ctx.shadowColor = opts.accentColor;
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
    }

    // 灵纹装饰（可选）
    if (opts.spiritPattern) {
      this.drawSpiritPattern(ctx, x, y, w, h, opts.spiritPattern);
    }
  }

  // 灵纹装饰
  drawSpiritPattern(ctx, x, y, w, h, color) {
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = color || '#4CAF50';
    ctx.lineWidth = 0.5;

    // 角落灵纹
    const patternSize = 15;
    const corners = [
      { x: x + 10, y: y + 10 },
      { x: x + w - 10, y: y + 10 },
      { x: x + 10, y: y + h - 10 },
      { x: x + w - 10, y: y + h - 10 },
    ];

    for (const corner of corners) {
      ctx.beginPath();
      ctx.arc(corner.x, corner.y, patternSize, 0, Math.PI * 0.5);
      ctx.stroke();
    }

    ctx.restore();
  }

  roundRectTop(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  // ==================== 修仙国风通用卡片 ====================

  drawCard(ctx, x, y, w, h, opts = {}) {
    ctx.save();
    // 灵气阴影
    ctx.shadowColor = 'rgba(0,0,0,0.06)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = opts.bg || '#FFFFFF';
    this.roundRect(ctx, x, y, w, h, opts.radius || Theme.borderRadius.lg);
    ctx.fill();
    ctx.restore();

    // 灵纹边框
    if (opts.border) {
      ctx.strokeStyle = opts.border;
      ctx.lineWidth = 1.5;
      this.roundRect(ctx, x, y, w, h, opts.radius || Theme.borderRadius.lg);
      ctx.stroke();
    }

    // 灵气光晕装饰（可选）
    if (opts.glow) {
      this.drawGlowEffect(ctx, x, y, w, h, opts.glow);
    }
  }

  // 灵气光晕效果
  drawGlowEffect(ctx, x, y, w, h, color) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    this.roundRect(ctx, x - 2, y - 2, w + 4, h + 4, Theme.borderRadius.lg);
    ctx.fill();
    ctx.restore();
  }

  // ==================== 修仙国风文字绘制 ====================

  drawTitle(ctx, text, x, y, size, color) {
    ctx.save();
    ctx.font = `bold ${size}px ${Theme.fonts.primary}`;
    ctx.fillStyle = color || Theme.colors.text.primary;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 文字阴影
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1;

    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawSubTitle(ctx, text, x, y, color) {
    ctx.save();
    ctx.font = `${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
    ctx.fillStyle = color || Theme.colors.text.secondary;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  // 修仙风格返回按钮
  drawBackButton(ctx, x, y, onClick) {
    const btnW = 60;
    const btnH = 30;

    this.addButton(x, y, btnW, btnH, '← 返回', 'rgba(0,0,0,0.3)', onClick);
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
