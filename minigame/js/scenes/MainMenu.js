import { BaseScene } from './BaseScene';

export class MainMenu extends BaseScene {
  constructor() {
    super();
    this.sparkles = [];
    this.titleScale = 0;
    this.titleAlpha = 0;
    this.cardAlpha = 0;
    this.leaves = [];
  }

  onEnter() {
    super.onEnter();
    this.titleScale = 0;
    this.titleAlpha = 0;
    this.cardAlpha = 0;
    this.sparkles = [];
    this.leaves = [];
  }

  update(dt) {
    super.update(dt);
    this.titleScale = Math.min(1, this.animTime * 1.8);
    this.titleAlpha = Math.min(1, this.animTime * 2.5);
    this.cardAlpha = Math.min(1, Math.max(0, (this.animTime - 0.5) * 2));

    // 落叶
    this.leaves = this.leaves.filter(l => {
      l.x += l.vx + Math.sin(this.animTime * 2 + l.phase) * 0.5;
      l.y += l.vy;
      l.rotation += l.vr;
      l.life -= 0.005;
      return l.life > 0 && l.y < 2500;
    });
    if (Math.random() > 0.96) {
      this.leaves.push({
        x: Math.random() * 500 + 100,
        y: -20,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.5 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.05,
        size: 6 + Math.random() * 6,
        life: 1,
        color: ['#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9'][Math.floor(Math.random() * 4)],
      });
    }
  }

  render(ctx, w, h) {
    // 天空背景
    this.drawSkyBackground(ctx, w, h);

    // 树（居中偏上）
    const treeX = w / 2;
    const treeY = h * 0.52;
    this.drawTree(ctx, treeX, treeY, 1.6);

    // 灯笼
    const t = this.animTime || 0;
    this.drawLantern(ctx, w * 0.22, h * 0.18, 14, '#FF7043');
    this.drawLantern(ctx, w * 0.78, h * 0.15, 12, '#FFB74D');
    this.drawLantern(ctx, w * 0.15, h * 0.3, 10, '#FF8A65');
    this.drawLantern(ctx, w * 0.85, h * 0.28, 11, '#FFCC80');

    // 云朵
    this.drawCloud(ctx, w * 0.15 + Math.sin(t * 0.3) * 15, h * 0.12, 1.2);
    this.drawCloud(ctx, w * 0.75 + Math.sin(t * 0.2 + 1) * 12, h * 0.08, 0.9);
    this.drawCloud(ctx, w * 0.5 + Math.sin(t * 0.25 + 2) * 10, h * 0.05, 0.7);

    // 树上的发光果实
    const fruits = [
      { x: treeX - 70, y: treeY - 200, color: '#4FC3F7' },
      { x: treeX + 80, y: treeY - 180, color: '#CE93D8' },
      { x: treeX - 30, y: treeY - 260, color: '#FFD54F' },
      { x: treeX + 50, y: treeY - 240, color: '#81C784' },
      { x: treeX - 100, y: treeY - 150, color: '#FFAB91' },
      { x: treeX + 110, y: treeY - 140, color: '#80DEEA' },
      { x: treeX + 10, y: treeY - 290, color: '#FFF176' },
    ];
    for (const f of fruits) {
      const pulse = 0.6 + Math.sin(t * 2 + f.x * 0.01) * 0.4;
      this.drawSparkle(ctx, f.x, f.y, 5, pulse * 0.8);
    }

    // 落叶
    for (const l of this.leaves) {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rotation);
      ctx.globalAlpha = l.life * 0.7;
      ctx.fillStyle = l.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, l.size, l.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 标题
    ctx.save();
    ctx.globalAlpha = this.titleAlpha;
    ctx.translate(w / 2, h * 0.06);
    ctx.scale(this.titleScale, this.titleScale);

    // 标题阴影
    ctx.font = 'bold 30px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillText('单词消消乐', 2, 2);

    // 标题渐变
    const titleGrad = ctx.createLinearGradient(-100, 0, 100, 0);
    titleGrad.addColorStop(0, '#FF9800');
    titleGrad.addColorStop(0.3, '#FFB74D');
    titleGrad.addColorStop(0.6, '#FF9800');
    titleGrad.addColorStop(1, '#F57C00');
    ctx.fillStyle = titleGrad;
    ctx.fillText('单词消消乐', 0, 0);
    ctx.restore();

    // 菜单卡片区域（底部半透明面板）
    ctx.save();
    ctx.globalAlpha = this.cardAlpha;
    const panelY = h * 0.62;
    const panelH = h * 0.36;

    // 半透明面板
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    this.roundRect(ctx, 12, panelY, w - 24, panelH, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, 12, panelY, w - 24, panelH, 20);
    ctx.stroke();

    // 6个菜单按钮 - 3列2行
    const menuItems = [
      { icon: '📖', label: '课本学习', desc: '按年级和单元学习', bgTop: '#FFF8E1', bgBottom: '#FFECB3', accent: '#FFB300', scene: 'levels', source: 'textbook' },
      { icon: '🌸', label: '主题乐园', desc: '按主题趣味学习', bgTop: '#FFF3E0', bgBottom: '#FFE0B2', accent: '#FF9800', scene: 'levels', source: 'theme' },
      { icon: '📝', label: '错题本', desc: '复习记不住的单词', bgTop: '#FBE9E7', bgBottom: '#FFCCBC', accent: '#FF5722', scene: 'errorbook' },
      { icon: '🏆', label: '排行榜', desc: '看看谁学得最多', bgTop: '#E8F5E9', bgBottom: '#C8E6C9', accent: '#4CAF50', scene: 'rank' },
      { icon: '⚔️', label: '好友对战', desc: '挑战你的朋友', bgTop: '#E3F2FD', bgBottom: '#BBDEFB', accent: '#2196F3', scene: 'battle' },
      { icon: '👨‍👩‍👧', label: '家长面板', desc: '查看学习统计', bgTop: '#F3E5F5', bgBottom: '#E1BEE7', accent: '#9C27B0', scene: 'parent' },
    ];

    const cols = 3;
    const cardGap = 10;
    const innerPad = 20;
    const cardW = (w - innerPad * 2 - cardGap * (cols - 1)) / cols;
    const cardH = panelH * 0.42;
    const startY = panelY + (panelH - cardH * 2 - cardGap) / 2;

    this.buttons = [];

    menuItems.forEach((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = innerPad + col * (cardW + cardGap);
      const y = startY + row * (cardH + cardGap);
      const delay = i * 0.08;
      const alpha = Math.min(1, Math.max(0, (this.animTime - 0.5 - delay) * 4));
      ctx.globalAlpha = this.cardAlpha * alpha;

      // 卡片
      this.drawMenuCard(ctx, x, y, cardW, cardH, {
        bgTop: item.bgTop,
        bgBottom: item.bgBottom,
        border: item.accent + '30',
        accentColor: item.accent,
      });

      // 图标
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.icon, x + cardW / 2, y + cardH * 0.35);

      // 标签
      ctx.font = 'bold 13px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillStyle = '#333';
      ctx.fillText(item.label, x + cardW / 2, y + cardH * 0.65);

      // 描述
      ctx.font = '10px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(item.desc, x + cardW / 2, y + cardH * 0.82);

      this.addButton(x, y, cardW, cardH, '', 'transparent', () => {
        this.manager.switchTo(item.scene, { source: item.source || 'textbook' });
      });
    });

    ctx.restore();

    // 底部装饰小草
    ctx.save();
    ctx.fillStyle = '#66BB6A';
    for (let i = 0; i < 12; i++) {
      const gx = w * (i / 11);
      const gy = h - 5 + Math.sin(t + i) * 3;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo(gx + 3, gy - 15, gx + 6, gy);
      ctx.fill();
    }
    ctx.restore();
  }
}
