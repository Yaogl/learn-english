import { BaseScene } from './BaseScene';
import { Theme } from '../theme.js';

/**
 * 首页 - 背景图 + emoji 按钮（无蒙层）
 */
export class MainMenu extends BaseScene {
  constructor() {
    super();
    this.bgImage = null;
    this.bgReady = false;
  }

  onEnter() {
    super.onEnter();
    this.loadImages();
  }

  loadImages() {
    if (!this.bgImage) {
      this.bgImage = wx.createImage();
      this.bgImage.onload = () => { this.bgReady = true; };
      this.bgImage.src = 'assets/imgs/index.png';
    }
  }

  render(ctx, w, h) {
    if (this.bgReady) {
      ctx.drawImage(this.bgImage, 0, 0, w, h);
    } else {
      this.drawPageBackground(ctx, w, h);
    }

    const menuItems = [
      { icon: '⚔️', label: '好友对战', scene: 'battle', bg: Theme.colors.menu.battle },
      { icon: '📖', label: '闯关模式', scene: 'levels', bg: Theme.colors.menu.levels },
      { icon: '📝', label: '错题本', scene: 'errorbook', bg: Theme.colors.menu.errorbook },
      { icon: '🏆', label: '排行榜', scene: 'rank', bg: Theme.colors.menu.rank },
      { icon: '🌐', label: '全服排行', scene: 'rank', bg: Theme.colors.menu.globalRank },
      { icon: '👨‍👩‍👧', label: '家长面板', scene: 'parent', bg: Theme.colors.menu.parent },
    ];

    const cols = 3;
    const rows = 2;
    const padX = 20;
    const padBottom = 30;
    const entryH = h * 0.28;
    const entryY = h - entryH - padBottom;
    const contentW = w - padX * 2;
    const btnW = contentW / cols;
    const btnH = entryH / rows;
    const iconSize = Math.min(btnW * 0.5, btnH * 0.45);

    this.buttons = [];

    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = padX + col * btnW + btnW / 2;
      const cy = entryY + row * btnH + btnH / 2;
      const r = iconSize * 0.55;

      ctx.save();
      const grad = ctx.createRadialGradient(cx, cy - 6, r * 0.15, cx, cy - 6, r);
      grad.addColorStop(0, this.lightenColor(item.bg, 20));
      grad.addColorStop(1, item.bg);
      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(cx, cy - 6, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      ctx.font = `${iconSize * 0.58}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.icon, cx, cy - 6);

      ctx.font = `bold ${Math.min(15, btnW * 0.11)}px ${Theme.fonts.primary}`;
      ctx.fillStyle = '#fff';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      ctx.fillText(item.label, cx, cy + iconSize * 0.45);
      ctx.shadowBlur = 0;

      this.addButton(
        padX + col * btnW, entryY + row * btnH,
        btnW, btnH,
        '', 'transparent',
        () => this.manager.switchTo(item.scene, { source: 'textbook' })
      );
    }
  }
}
