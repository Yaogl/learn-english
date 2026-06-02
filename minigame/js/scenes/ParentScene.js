import { BaseScene } from './BaseScene';
import { CultivationSystem } from '../data/CultivationSystem';
import { Theme } from '../theme.js';

export class ParentScene extends BaseScene {
  constructor() {
    super();
    this.stats = {};
    this.weeklyData = [];
  }

  onEnter() {
    super.onEnter();
    this.stats = this.loadStats();
    this.weeklyData = this.generateWeeklyData();
    if (!this._bgImg) {
      this._bgImg = wx.createImage();
      this._bgImg.src = 'assets/imgs/storyForestBg.png';
    }
  }

  loadStats() {
    try {
      const data = wx.getStorageSync('player_stats');
      return data ? JSON.parse(data) : {
        totalWords: 0,
        totalStages: 0,
        totalMinutes: 0,
        streak: 0,
        lastPlayDate: '',
      };
    } catch (e) {
      return { totalWords: 0, totalStages: 0, totalMinutes: 0, streak: 0 };
    }
  }

  generateWeeklyData() {
    const data = [];
    for (let i = 0; i < 7; i++) {
      data.push(Math.random() * 0.7 + 0.1);
    }
    return data;
  }

  /** 森林背景 + 轻蒙层 */
  _drawBg(ctx, w, h) {
    ctx.fillStyle = '#FFF9E8';
    ctx.fillRect(0, 0, w, h);
    if (this._bgImg && this._bgImg.width > 0) {
      const img = this._bgImg;
      const imgR = img.width / img.height;
      const scrR = w / h;
      let sx, sy, sw, sh;
      if (imgR > scrR) { sh = img.height; sw = sh * scrR; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / scrR; sx = 0; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }
    ctx.fillStyle = 'rgba(255,249,232,0.2)';
    ctx.fillRect(0, 0, w, h);
    this.drawFallingPetals(ctx, w, h);
  }

  render(ctx, w, h) {
    this._drawBg(ctx, w, h);
    this.buttons = [];
    const t = this.animTime || 0;

    // 返回按钮
    const back = Theme.layout.backBtn;
    this.addButton(back.x, back.y, back.w, back.h, '← 返回', Theme.colors.button.muted, () => {
      this.manager.switchTo('mainMenu');
    });

    // 标题
    const titleY = Theme.layout.safeTop + 10;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const pulse = 0.85 + Math.sin(t * 2) * 0.15;
    ctx.font = `bold ${Theme.fonts.sizes.title}px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#3D6B4F';
    ctx.shadowColor = '#70E8D0';
    ctx.shadowBlur = 10 * pulse;
    ctx.fillText('家长面板', w / 2, titleY);
    ctx.shadowBlur = 0;
    ctx.restore();

    // 境界信息卡
    const realm = CultivationSystem.getCurrentRealm(this.stats.totalStages || 0);
    const realmCardY = titleY + 36;
    const realmCardW = w - 40;
    const realmCardH = 72;

    ctx.save();
    ctx.shadowColor = 'rgba(81,201,176,0.12)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 2;
    const rpg = ctx.createLinearGradient(20, realmCardY, 20, realmCardY + realmCardH);
    rpg.addColorStop(0, 'rgba(255,255,255,0.6)');
    rpg.addColorStop(1, 'rgba(255,255,255,0.35)');
    ctx.fillStyle = rpg;
    this.roundRect(ctx, 20, realmCardY, realmCardW, realmCardH, 14);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(112,232,208,0.3)';
    ctx.lineWidth = 1.2;
    this.roundRect(ctx, 20, realmCardY, realmCardW, realmCardH, 14);
    ctx.stroke();

    ctx.font = `bold ${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#3D6B4F';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(CultivationSystem.getFullLabel(this.stats.totalStages || 0), 36, realmCardY + 28);
    ctx.font = `${Theme.fonts.sizes.small}px ${Theme.fonts.primary}`;
    ctx.fillStyle = 'rgba(61,107,79,0.5)';
    ctx.fillText(realm.realm.desc, 36, realmCardY + 50);

    // 统计卡片（2x2 网格，马卡龙色）
    const cardW = (w - 50) / 2;
    const cardH = 78;
    const startY = realmCardY + realmCardH + 14;

    const palettes = [
      ['#BCF6E7', '#51C9B0', 'rgba(56,168,144,0.4)'],
      ['#FFE89C', '#F5C842', 'rgba(200,160,40,0.4)'],
      ['#C8E6FF', '#7CB9E8', 'rgba(100,150,200,0.4)'],
      ['#FFC8DD', '#FF9BB5', 'rgba(220,120,150,0.4)'],
    ];

    const stats = [
      { label: '词汇量', value: `${this.stats.totalWords || 0}` },
      { label: '通关', value: `${this.stats.totalStages || 0}` },
      { label: '学习时长', value: `${this.stats.totalMinutes || 0}分` },
      { label: '连续天数', value: `${this.stats.streak || 0}天` },
    ];

    stats.forEach((stat, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 18 + col * (cardW + 14);
      const y = startY + row * (cardH + 10);
      const [topC, botC, borderC] = palettes[i];

      // 入场动画
      const delay = i * 0.08;
      const slideP = Math.min(1, Math.max(0, (t - delay) / 0.3));
      ctx.save();
      ctx.globalAlpha = slideP;
      ctx.translate(0, (1 - slideP) * 15);

      // 卡片
      ctx.shadowColor = topC;
      ctx.shadowBlur = 6;
      const cg = ctx.createLinearGradient(x, y, x, y + cardH);
      cg.addColorStop(0, 'rgba(255,255,255,0.8)');
      cg.addColorStop(1, topC + '44');
      ctx.fillStyle = cg;
      this.roundRect(ctx, x, y, cardW, cardH, 12);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 左侧彩色竖条
      ctx.save();
      ctx.beginPath();
      this.roundRect(ctx, x, y, 5, cardH, 3);
      ctx.clip();
      ctx.fillStyle = botC;
      ctx.fillRect(x, y, 5, cardH);
      ctx.restore();

      // 边框
      ctx.strokeStyle = borderC;
      ctx.lineWidth = 1;
      this.roundRect(ctx, x, y, cardW, cardH, 12);
      ctx.stroke();

      // 数值
      ctx.font = `bold 22px ${Theme.fonts.primary}`;
      ctx.fillStyle = '#3D6B4F';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(stat.value, x + 18, y + 30);

      // 标签
      ctx.font = `12px ${Theme.fonts.primary}`;
      ctx.fillStyle = 'rgba(61,107,79,0.5)';
      ctx.fillText(stat.label, x + 18, y + 54);

      ctx.restore();
    });

    // 学习趋势柱状图
    const calY = startY + 2 * (cardH + 10) + 10;
    const calH = 130;

    ctx.save();
    ctx.shadowColor = 'rgba(81,201,176,0.1)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    const cpg = ctx.createLinearGradient(18, calY, 18, calY + calH);
    cpg.addColorStop(0, 'rgba(255,255,255,0.7)');
    cpg.addColorStop(1, 'rgba(255,255,255,0.4)');
    ctx.fillStyle = cpg;
    this.roundRect(ctx, 18, calY, w - 36, calH, 14);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(112,232,208,0.25)';
    ctx.lineWidth = 1;
    this.roundRect(ctx, 18, calY, w - 36, calH, 14);
    ctx.stroke();

    ctx.font = `bold 14px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#3D6B4F';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('本周学习趋势', 35, calY + 22);

    const days = ['一', '二', '三', '四', '五', '六', '日'];
    const barW = (w - 90) / 7;
    const maxBarH = calH - 60;
    const barColors = ['#BCF6E7', '#C8E6FF', '#FFE89C', '#FFC8DD', '#E8D5F5', '#FFD5C8', '#51C9B0'];

    days.forEach((day, i) => {
      const x = 35 + i * barW;
      const barH = this.weeklyData[i] * maxBarH;
      const barY = calY + calH - 22 - barH;

      // 柱子（马卡龙色）
      const barGrad = ctx.createLinearGradient(0, barY, 0, barY + barH);
      barGrad.addColorStop(0, barColors[i]);
      barGrad.addColorStop(1, barColors[i] + '88');
      ctx.fillStyle = barGrad;
      this.roundRect(ctx, x + 5, barY, barW - 10, barH, 4);
      ctx.fill();

      // 柱顶高光
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#ffffff';
      this.roundRect(ctx, x + 5, barY, barW - 10, Math.min(4, barH), 4);
      ctx.fill();
      ctx.restore();

      // 星期标签
      ctx.font = `10px ${Theme.fonts.primary}`;
      ctx.fillStyle = 'rgba(61,107,79,0.45)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`周${day}`, x + barW / 2, calY + calH - 16);
    });

    this.renderButtons(ctx);
  }
}
