import { BaseScene } from './BaseScene';
import { Theme } from '../theme.js';
import { CultivationSystem } from '../data/CultivationSystem';
import { loadCompletedStages, getMaxCompletedStage } from '../data/ProgressStore.js';

/**
 * 首页 — 炫酷修仙风
 * 背景图清晰 + 萤火虫 + 光晕 + 按钮贴底
 */
export class MainMenu extends BaseScene {
  constructor() {
    super();
    this.bgImage = null;
    this.bgReady = false;
    this.fireflies = [];
    this._fireflyInit = false;
    this.sparkles = [];
    this._sparkleInit = false;
    this.touchRipples = [];
  }

  onEnter() {
    super.onEnter();
    this.loadImages();
    this.touchRipples = [];
  }

  loadImages() {
    if (!this.bgImage) {
      this.bgImage = wx.createImage();
      this.bgImage.onload = () => { this.bgReady = true; };
      this.bgImage.src = 'assets/imgs/mainParallaxBg.jpg';
    }
  }

  onTouchEnd(x, y) {
    // 点击波纹效果
    this.touchRipples.push({ x, y, r: 0, alpha: 0.6, maxR: 60 });
    super.onTouchEnd(x, y);
  }

  render(ctx, w, h) {
    const t = this.animTime || 0;

    // ===== 1. 背景图 — 清晰无蒙层 =====
    if (this.bgReady) {
      ctx.drawImage(this.bgImage, 0, 0, w, h);
    } else {
      this.drawPageBackground(ctx, w, h);
    }

    // ===== 2. 中央光晕（柔化画面，不遮挡主体） =====
    this._drawCenterGlow(ctx, w, h, t);

    // ===== 3. 萤火虫粒子 =====
    this._drawFireflies(ctx, w, h, t);

    // ===== 4. 闪烁星光 =====
    this._drawSparkles(ctx, w, h, t);

    // ===== 5. 花瓣飘落 =====
    this.drawFallingPetals(ctx, w, h);

    // ===== 6. 点击波纹 =====
    this._drawTouchRipples(ctx);

    // ===== 7. 标题 — 发光呼吸效果 =====
    this._drawAnimatedTitle(ctx, w, h, t);

    // ===== 8. 底部菜单区 =====
    this._drawBottomMenu(ctx, w, h, t);
  }

  update(dt) {
    super.update(dt);
    // 更新点击波纹
    this.touchRipples = this.touchRipples.filter(r => {
      r.r += dt * 120;
      r.alpha -= dt * 1.5;
      return r.alpha > 0;
    });
  }

  /** 中央柔光（让画面有仙气感） */
  _drawCenterGlow(ctx, w, h, t) {
    ctx.save();
    const pulse = 0.15 + Math.sin(t * 0.8) * 0.05;
    ctx.globalAlpha = pulse;
    const glow = ctx.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, w * 0.5);
    glow.addColorStop(0, 'rgba(255,250,223,0.4)');
    glow.addColorStop(0.5, 'rgba(167,243,176,0.1)');
    glow.addColorStop(1, 'rgba(255,250,223,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  /** 萤火虫粒子 */
  _drawFireflies(ctx, w, h, t) {
    if (!this._fireflyInit) {
      this._fireflyInit = true;
      this.fireflies = [];
      for (let i = 0; i < 18; i++) {
        this.fireflies.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.7,
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 15,
          size: 1.5 + Math.random() * 2.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.5,
          color: ['#ffd700', '#4dffe8', '#abf4ac', '#f472b6', '#c084fc'][i % 5],
        });
      }
    }

    ctx.save();
    for (const f of this.fireflies) {
      // 飘动轨迹
      const fx = f.x + Math.sin(t * f.speed + f.phase) * 30 + Math.cos(t * 0.3 + f.phase) * 15;
      const fy = f.y + Math.cos(t * f.speed * 0.7 + f.phase) * 20 + Math.sin(t * 0.2 + f.phase) * 10;
      // 呼吸闪烁
      const alpha = 0.3 + Math.sin(t * 2.5 + f.phase) * 0.35;
      const glowSize = f.size * (2 + Math.sin(t * 3 + f.phase) * 0.8);

      // 外层光晕
      ctx.globalAlpha = alpha * 0.3;
      ctx.fillStyle = f.color;
      ctx.shadowColor = f.color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(fx, fy, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // 内核亮点
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(fx, fy, f.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  /** 闪烁星光 */
  _drawSparkles(ctx, w, h, t) {
    if (!this._sparkleInit) {
      this._sparkleInit = true;
      this.sparkles = [];
      for (let i = 0; i < 12; i++) {
        this.sparkles.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.6,
          size: 1 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
          speed: 1.5 + Math.random() * 2,
        });
      }
    }

    ctx.save();
    for (const s of this.sparkles) {
      const alpha = Math.max(0, Math.sin(t * s.speed + s.phase));
      if (alpha < 0.1) continue;
      ctx.globalAlpha = alpha * 0.8;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 6;
      // 十字星
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(t * 0.5 + s.phase);
      const arm = s.size * (1 + alpha);
      ctx.fillRect(-arm * 3, -0.5, arm * 6, 1);
      ctx.fillRect(-0.5, -arm * 3, 1, arm * 6);
      ctx.restore();
    }
    ctx.restore();
  }

  /** 点击波纹 */
  _drawTouchRipples(ctx) {
    ctx.save();
    for (const r of this.touchRipples) {
      ctx.globalAlpha = r.alpha;
      ctx.strokeStyle = 'rgba(167,243,176,0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.stroke();
      // 内圈
      ctx.globalAlpha = r.alpha * 0.4;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  /** 发光标题 */
  _drawAnimatedTitle(ctx, w, h, t) {
    ctx.save();
    const titleY = h * 0.12;
    const breathe = 1 + Math.sin(t * 1.5) * 0.03;

    ctx.translate(w / 2, titleY);
    ctx.scale(breathe, breathe);

    // 外层光晕
    ctx.globalAlpha = 0.2 + Math.sin(t * 2) * 0.1;
    ctx.font = `bold 28px ${Theme.fonts.primary}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#abf4ac';
    ctx.shadowColor = '#abf4ac';
    ctx.shadowBlur = 25;
    ctx.fillText('滢滢知语', 0, 0);

    // 主标题
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(5,150,105,0.4)';
    const grad = ctx.createLinearGradient(-80, 0, 80, 0);
    grad.addColorStop(0, '#065f46');
    grad.addColorStop(0.3, '#059669');
    grad.addColorStop(0.7, '#d4a017');
    grad.addColorStop(1, '#065f46');
    ctx.fillStyle = grad;
    ctx.fillText('滢滢知语', 0, 0);

    // 副标题
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.6 + Math.sin(t * 1.8 + 1) * 0.2;
    ctx.font = `${Theme.fonts.sizes.small}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.secondary;
    ctx.fillText('修仙背单词 · 飞升不是梦', 0, 24);

    ctx.restore();
  }

  /** 底部菜单区 — 贴底布局 */
  _drawBottomMenu(ctx, w, h, t) {
    const padX = 20;
    const bottomPad = 50; // 距底部间距（留出安全区）

    this.buttons = [];

    // --- 副按钮：2×2 网格（先算，贴底） ---
    const gridGap = 10;
    const gridBtnW = (w - padX * 2 - gridGap) / 2;
    const gridBtnH = 42;
    const gridRows = 2;
    const gridH = gridRows * gridBtnH + (gridRows - 1) * gridGap;

    // --- 主按钮 ---
    const mainBtnW = Math.min(200, w - 60);
    const mainBtnH = 46;
    const mainBtnGap = 14;

    // 从底部往上算
    const gridBottom = h - bottomPad;
    const gridTop = gridBottom - gridH;
    const mainBtnY = gridTop - mainBtnGap - mainBtnH;

    // 底部渐变遮罩
    const maskTop = mainBtnY - 40;
    const maskGrad = ctx.createLinearGradient(0, maskTop, 0, h);
    maskGrad.addColorStop(0, 'rgba(245,240,232,0)');
    maskGrad.addColorStop(0.2, 'rgba(255,245,228,0.55)');
    maskGrad.addColorStop(0.55, 'rgba(255,240,212,0.82)');
    maskGrad.addColorStop(1, 'rgba(255,235,200,0.92)');
    ctx.fillStyle = maskGrad;
    ctx.fillRect(0, maskTop, w, h - maskTop);

    // --- 主按钮：闯关模式 ---
    const mainBtnX = (w - mainBtnW) / 2;
    this._drawPillButton(ctx, mainBtnX, mainBtnY, mainBtnW, mainBtnH, '📖', '闯关模式', true, t);
    this.addButton(mainBtnX, mainBtnY, mainBtnW, mainBtnH, '', 'transparent', () => {
      this.manager.switchTo('levels', { source: 'textbook' });
    });

    // --- 副按钮：2×2 ---
    const subItems = [
      { icon: '⚔️', label: '好友对战', scene: 'battle' },
      { icon: '📝', label: '错题本', scene: 'errorbook' },
      { icon: '👨‍👩‍👧', label: '家长面板', scene: 'parent' },
      { icon: '🏆', label: '排行榜', scene: 'rank' },
    ];

    for (let i = 0; i < subItems.length; i++) {
      const item = subItems[i];
      const col = i % 2;
      const row = Math.floor(i / 2);
      const bx = padX + col * (gridBtnW + gridGap);
      const by = gridTop + row * (gridBtnH + gridGap);
      this._drawPillButton(ctx, bx, by, gridBtnW, gridBtnH, item.icon, item.label, false, t);
      this.addButton(bx, by, gridBtnW, gridBtnH, '', 'transparent', () => {
        this.manager.switchTo(item.scene, { source: 'textbook' });
      });
    }

    // 底部境界信息条
    const infoY = gridBottom + 6;
    const infoW = w - padX * 2;
    const infoH = 28;
    const infoX = padX;
    ctx.save();
    this._drawCartoonDepth(ctx, infoX, infoY + 2, infoW, infoH, 14, Theme.colors.button.shadow);
    ctx.fillStyle = Theme.colors.glass;
    this.roundRect(ctx, infoX, infoY, infoW, infoH, 14);
    ctx.fill();
    ctx.strokeStyle = Theme.colors.outline.soft;
    ctx.lineWidth = Theme.cartoon.outlineWidth;
    this.roundRect(ctx, infoX, infoY, infoW, infoH, 14);
    ctx.stroke();
    // 动态读取实际修行境界
    const stages = loadCompletedStages();
    const maxStage = getMaxCompletedStage(stages);
    const realmLabel = CultivationSystem.getFullLabel(maxStage);

    ctx.font = `bold 10px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.muted;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`⚡ 当前修行境界：${realmLabel}`, w / 2, infoY + infoH / 2);
    ctx.restore();
  }

  /** Q版卡通胶囊按钮（3D 描边 + 高光） */
  _drawPillButton(ctx, x, y, w, h, icon, label, isPrimary, t) {
    ctx.save();
    const r = h / 2;
    const depth = Theme.cartoon.depthOffset;

    if (isPrimary) {
      const glowPulse = 0.15 + Math.sin((t || 0) * 2) * 0.08;
      ctx.globalAlpha = glowPulse;
      ctx.fillStyle = Theme.colors.accent.goldLight;
      ctx.shadowColor = Theme.colors.accent.gold;
      ctx.shadowBlur = 22;
      this.roundRect(ctx, x - 5, y - 5, w + 10, h + 10, r + 5);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    this._drawCartoonDepth(ctx, x, y + depth, w, h, r, Theme.colors.button.shadow);

    if (isPrimary) {
      const grad = ctx.createLinearGradient(x, y, x, y + h);
      grad.addColorStop(0, '#5dd39e');
      grad.addColorStop(0.5, Theme.colors.button.primary);
      grad.addColorStop(1, Theme.colors.button.primaryDark);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = Theme.colors.glass;
    }
    this.roundRect(ctx, x, y, w, h, r);
    ctx.fill();

    ctx.strokeStyle = isPrimary ? Theme.colors.game.tileOutline : Theme.colors.outline.soft;
    ctx.lineWidth = Theme.cartoon.outlineWidth;
    this.roundRect(ctx, x, y, w, h, r);
    ctx.stroke();

    ctx.save();
    ctx.clip();
    const highlightGrad = ctx.createLinearGradient(x, y, x, y + h);
    highlightGrad.addColorStop(0, 'rgba(255,255,255,0.50)');
    highlightGrad.addColorStop(0.45, 'rgba(255,255,255,0)');
    ctx.fillStyle = highlightGrad;
    ctx.fillRect(x, y, w, h / 2);
    ctx.restore();

    const fontSize = isPrimary ? 15 : 13;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const iconW = ctx.measureText(icon).width || fontSize;
    ctx.font = `bold ${fontSize}px ${Theme.fonts.primary}`;
    const labelW = ctx.measureText(label).width;
    const totalW = iconW + 8 + labelW;
    const startX = x + (w - totalW) / 2;

    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillText(icon, startX + iconW / 2, y + h / 2);

    ctx.font = `bold ${fontSize}px ${Theme.fonts.primary}`;
    ctx.fillStyle = isPrimary ? Theme.colors.text.white : Theme.colors.text.primary;
    if (isPrimary) {
      ctx.shadowColor = 'rgba(0,0,0,0.12)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetY = 1;
    }
    ctx.textAlign = 'left';
    ctx.fillText(label, startX + iconW + 8, y + h / 2);

    ctx.restore();
  }
}
