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
    this.imagesLoaded = false;
    this.titleAlpha = 0;
    this.cardAlpha = 0;
  }

  onEnter() {
    super.onEnter();
    this.titleAlpha = 0;
    this.cardAlpha = 0;
    this.loadImages();
  }

  loadImages() {
    if (this.imagesLoaded) return;

    let loaded = 0;
    const total = 3;
    const check = () => {
      loaded++;
      if (loaded >= total) this.imagesLoaded = true;
    };

    // 背景图
    this.bgImage = wx.createImage();
    this.bgImage.onload = check;
    this.bgImage.onerror = check;
    this.bgImage.src = 'assets/imgs/index.png';

    // 底部入口背景
    this.iconBgImage = wx.createImage();
    this.iconBgImage.onload = check;
    this.iconBgImage.onerror = check;
    this.iconBgImage.src = 'assets/imgs/icon-bg.png';

    // 图标精灵图
    this.iconsImage = wx.createImage();
    this.iconsImage.onload = check;
    this.iconsImage.onerror = check;
    this.iconsImage.src = 'assets/imgs/icons.png';
  }

  update(dt) {
    super.update(dt);
    this.titleAlpha = Math.min(1, this.animTime * 2);
    this.cardAlpha = Math.min(1, Math.max(0, (this.animTime - 0.3) * 2.5));
  }

  render(ctx, w, h) {
    // 背景图
    if (this.imagesLoaded && this.bgImage) {
      ctx.drawImage(this.bgImage, 0, 0, w, h);
    } else {
      // 加载中用渐变背景
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#87CEEB');
      bg.addColorStop(1, '#B5E8F7');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
    }

    // 底部入口区域
    ctx.save();
    ctx.globalAlpha = this.cardAlpha;

    const entryY = h * 0.6;
    const entryH = h * 0.38;

    // icon-bg.png 作为底部背景（居中绘制）
    if (this.iconBgImage && this.iconBgImage.width > 0) {
      // 保持比例居中绘制
      const imgRatio = this.iconBgImage.width / this.iconBgImage.height;
      const drawH = entryH;
      const drawW = drawH * imgRatio;
      const drawX = (w - drawW) / 2;
      ctx.drawImage(this.iconBgImage, drawX, entryY, drawW, drawH);
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      this.roundRect(ctx, 12, entryY, w - 24, entryH, 20);
      ctx.fill();
    }

    // 8个菜单按钮 - 4列2行，从 icons.png 裁切
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

      // 从精灵图裁切图标
      if (this.iconsImage && this.iconsImage.width > 0) {
        const iconCols = 4;
        const iconRows = 2;
        const srcX = (i % iconCols) * (this.iconsImage.width / iconCols);
        const srcY = Math.floor(i / iconCols) * (this.iconsImage.height / iconRows);
        const srcW = this.iconsImage.width / iconCols;
        const srcH = this.iconsImage.height / iconRows;

        ctx.drawImage(
          this.iconsImage,
          srcX, srcY, srcW, srcH,
          cx - iconSize / 2, cy - iconSize / 2, iconSize, iconSize
        );
      } else {
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(cx, cy, iconSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '12px "Microsoft YaHei", sans-serif';
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

    ctx.restore();

    this.renderButtons(ctx);
  }
}
