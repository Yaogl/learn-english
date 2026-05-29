/**
 * Base Scene - 卡通童趣主题 UI 基类
 */
export class BaseScene {
  constructor() {
    this.manager = null;
    this.buttons = [];
    this.scrollY = 0;
    this.maxScrollY = 0;
    this.touchStartY = 0;
    this.isDragging = false;
    this.animTime = 0;
  }

  onEnter(params) {
    this.buttons = [];
    this.scrollY = 0;
    this.animTime = 0;
  }

  update(dt) {
    this.animTime += dt;
  }

  render(ctx, w, h) {}

  // ==================== 按钮系统 ====================

  addButton(x, y, w, h, label, color, onClick) {
    this.buttons.push({ x, y, w, h, label, color, onClick });
  }

  renderButtons(ctx) {
    for (const btn of this.buttons) {
      const by = btn.y - this.scrollY;
      ctx.save();
      // Shadow
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = btn.color;
      this.roundRect(ctx, btn.x, by, btn.w, btn.h, btn.h * 0.3);
      ctx.fill();
      ctx.restore();
      // Label
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.min(btn.h * 0.42, 18)}px "Microsoft YaHei", "PingFang SC", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(btn.label, btn.x + btn.w / 2, by + btn.h / 2);
    }
  }

  // ==================== 卡通背景绘制 ====================

  drawSkyBackground(ctx, w, h) {
    // 天空渐变
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#87CEEB');
    sky.addColorStop(0.5, '#B5E8F7');
    sky.addColorStop(1, '#D4F1F9');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // 远山
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#7BC67E';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    ctx.quadraticCurveTo(w * 0.15, h * 0.4, w * 0.3, h * 0.5);
    ctx.quadraticCurveTo(w * 0.5, h * 0.35, w * 0.7, h * 0.48);
    ctx.quadraticCurveTo(w * 0.85, h * 0.38, w, h * 0.5);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 草地
    ctx.save();
    const grass = ctx.createLinearGradient(0, h * 0.75, 0, h);
    grass.addColorStop(0, '#7BC67E');
    grass.addColorStop(0.3, '#5DAE60');
    grass.addColorStop(1, '#4A9E4D');
    ctx.fillStyle = grass;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.8);
    ctx.quadraticCurveTo(w * 0.2, h * 0.75, w * 0.4, h * 0.78);
    ctx.quadraticCurveTo(w * 0.6, h * 0.73, w * 0.8, h * 0.77);
    ctx.quadraticCurveTo(w * 0.95, h * 0.74, w, h * 0.76);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawTree(ctx, cx, treeY, scale) {
    ctx.save();
    ctx.translate(cx, treeY);
    ctx.scale(scale, scale);

    // 树干
    ctx.save();
    const trunkGrad = ctx.createLinearGradient(-30, 0, 30, 0);
    trunkGrad.addColorStop(0, '#8B5E3C');
    trunkGrad.addColorStop(0.3, '#A0704B');
    trunkGrad.addColorStop(0.7, '#A0704B');
    trunkGrad.addColorStop(1, '#7A4E2E');
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

    // 树枝
    ctx.save();
    ctx.strokeStyle = '#8B5E3C';
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

    // 树冠（多层绿色椭圆）
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

    // 高光
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(-20, -230, 40, 25, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  drawLantern(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);

    // 绳子
    ctx.strokeStyle = '#8B5E3C';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.8);
    ctx.lineTo(0, -size * 0.3);
    ctx.stroke();

    // 灯笼主体
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.5);
    grad.addColorStop(0, '#FFE082');
    grad.addColorStop(0.6, color);
    grad.addColorStop(1, color);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.35, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 发光
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#FFE082';
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.55, size * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawCloud(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.9;
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

  // ==================== 卡通按钮卡片 ====================

  drawMenuCard(ctx, x, y, w, h, opts = {}) {
    ctx.save();
    // 阴影
    ctx.shadowColor = 'rgba(0,0,0,0.12)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;

    // 卡片背景（渐变）
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, opts.bgTop || '#fff');
    grad.addColorStop(1, opts.bgBottom || '#f0f0f0');
    ctx.fillStyle = grad;
    this.roundRect(ctx, x, y, w, h, 16);
    ctx.fill();
    ctx.restore();

    // 边框
    ctx.strokeStyle = opts.border || '#E8E8E8';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, x, y, w, h, 16);
    ctx.stroke();

    // 顶部装饰条
    if (opts.accentColor) {
      ctx.save();
      ctx.beginPath();
      this.roundRectTop(ctx, x, y, w, 4, 16);
      ctx.fillStyle = opts.accentColor;
      ctx.fill();
      ctx.restore();
    }
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

  // ==================== 通用卡片 ====================

  drawCard(ctx, x, y, w, h, opts = {}) {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = opts.bg || '#fff';
    this.roundRect(ctx, x, y, w, h, opts.radius || 12);
    ctx.fill();
    ctx.restore();

    if (opts.border) {
      ctx.strokeStyle = opts.border;
      ctx.lineWidth = 2;
      this.roundRect(ctx, x, y, w, h, opts.radius || 12);
      ctx.stroke();
    }
  }

  // ==================== 文字绘制 ====================

  drawTitle(ctx, text, x, y, size, color) {
    ctx.save();
    ctx.font = `bold ${size}px "Microsoft YaHei", "PingFang SC", sans-serif`;
    ctx.fillStyle = color || '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawSubTitle(ctx, text, x, y, color) {
    ctx.save();
    ctx.font = '13px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillStyle = color || '#999';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
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

  // ==================== 触摸 ====================

  onTouchStart(x, y) {
    this.touchStartY = y;
    this.isDragging = false;
  }

  onTouchMove(x, y) {
    if (this.maxScrollY > 0) {
      const dy = y - this.touchStartY;
      this.scrollY = Math.max(0, Math.min(this.maxScrollY, this.scrollY - dy));
      this.touchStartY = y;
      this.isDragging = true;
    }
  }

  onTouchEnd(x, y) {
    if (this.isDragging) return;
    for (const btn of this.buttons) {
      const by = btn.y - this.scrollY;
      if (x >= btn.x && x <= btn.x + btn.w && y >= by && y <= by + btn.h) {
        btn.onClick();
        return;
      }
    }
  }
}
