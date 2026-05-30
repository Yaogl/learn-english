import { BaseScene } from './BaseScene';

/**
 * 首页 - 使用背景图 + 图标精灵图
 */
export class MainMenu extends BaseScene {
  constructor() {
    super();
    this.bgImage = null;
    this.iconBgImage = null;
    this.iconsImage = null;
    this.bgReady = false;
    this.iconBgReady = false;
    this.iconsReady = false;
  }

  onEnter() {
    super.onEnter();
    this.loadImages();
  }

  loadImages() {
    // 背景图
    if (!this.bgImage) {
      this.bgImage = wx.createImage();
      this.bgImage.onload = () => { this.bgReady = true; };
      this.bgImage.src = 'assets/imgs/index.png';
    }

    // 底部入口背景
    if (!this.iconBgImage) {
      this.iconBgImage = wx.createImage();
      this.iconBgImage.onload = () => { this.iconBgReady = true; };
      this.iconBgImage.src = 'assets/imgs/icon-bg.png';
    }

    // 图标精灵图
    if (!this.iconsImage) {
      this.iconsImage = wx.createImage();
      this.iconsImage.onload = () => { this.iconsReady = true; };
      this.iconsImage.src = 'assets/imgs/icons.png';
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

    // 底部入口区域
    const entryY = h * 0.6;
    const entryH = h * 0.38;

    // icon-bg.png 居中绘制
    if (this.iconBgReady) {
      const imgRatio = this.iconBgImage.width / this.iconBgImage.height;
      const drawH = entryH;
      const drawW = drawH * imgRatio;
      const drawX = (w - drawW) / 2;
      ctx.drawImage(this.iconBgImage, drawX, entryY, drawW, drawH);
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      this.roundRect(ctx, 12, entryY, w - 24, entryH, 20);
      ctx.fill();
    }

    // 8个菜单按钮 - 4列2行
    const menuItems = [
      { label: '好友对战', scene: 'battle' },
      { label: '闯关模式', scene: 'levels' },
      { label: '错题本', scene: 'errorbook' },
      { label: '错题本', scene: 'errorbook' },
      { label: '家长面板', scene: 'parent' },
      { label: '家长面板', scene: 'parent' },
      { label: '排行榜', scene: 'rank' },
      { label: '全服排行', scene: 'rank' },
    ];

    const cols = 4;
    const rows = 2;
    const btnW = w / cols;
    const btnH = entryH / rows;
    const iconSize = Math.min(btnW * 0.7, btnH * 0.55);

    this.buttons = [];

    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = col * btnW + btnW / 2;
      const cy = entryY + row * btnH + btnH / 2;

      if (this.iconsReady) {
        // 从精灵图裁切
        const iconCols = 4;
        const srcX = (i % iconCols) * (this.iconsImage.width / iconCols);
        const srcY = Math.floor(i / iconCols) * (this.iconsImage.height / 2);
        const srcW = this.iconsImage.width / iconCols;
        const srcH = this.iconsImage.height / 2;

        ctx.drawImage(
          this.iconsImage,
          srcX, srcY, srcW, srcH,
          cx - iconSize / 2, cy - iconSize / 2, iconSize, iconSize
        );
      } else {
        // fallback 圆形
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(cx, cy, iconSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px "Microsoft YaHei", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.label, cx, cy);
      }

      this.addButton(
        col * btnW, entryY + row * btnH,
        btnW, btnH,
        '', 'transparent',
        () => {
          this.manager.switchTo(item.scene, { source: 'textbook' });
        }
      );
    }
  }
}
