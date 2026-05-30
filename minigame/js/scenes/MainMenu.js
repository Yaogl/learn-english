import { BaseScene } from './BaseScene';

/**
 * 首页 - 背景图 + emoji 按钮
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

  update(dt) {
    super.update(dt);
  }

  render(ctx, w, h) {
    // 背景图
    if (this.bgReady) {
      ctx.drawImage(this.bgImage, 0, 0, w, h);
    } else {
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#87CEEB');
      bg.addColorStop(1, '#B5E8F7');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
    }

    // 底部菜单按钮 - 4列2行
    const menuItems = [
      { icon: '⚔️', label: '好友对战', scene: 'battle', bg: '#E91E63' },
      { icon: '📖', label: '闯关模式', scene: 'levels', bg: '#4CAF50' },
      { icon: '📝', label: '错题本', scene: 'errorbook', bg: '#FF9800' },
      { icon: '🏆', label: '排行榜', scene: 'rank', bg: '#2196F3' },
      { icon: '🌐', label: '全服排行', scene: 'rank', bg: '#9C27B0' },
      { icon: '👨‍👩‍👧', label: '家长面板', scene: 'parent', bg: '#795548' },
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

      // 半透明背景圆
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = item.bg;
      ctx.beginPath();
      ctx.arc(cx, cy - 6, iconSize * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 图标
      ctx.font = `${iconSize * 0.6}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.icon, cx, cy - 6);

      // 标签
      ctx.font = `bold ${Math.min(13, btnW * 0.1)}px "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, cx, cy + iconSize * 0.45);

      this.addButton(
        padX + col * btnW, entryY + row * btnH,
        btnW, btnH,
        '', 'transparent',
        () => {
          this.manager.switchTo(item.scene, { source: 'textbook' });
        }
      );
    }
  }
}
