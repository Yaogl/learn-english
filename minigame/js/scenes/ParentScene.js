import { BaseScene } from './BaseScene';
import { CultivationSystem } from '../data/CultivationSystem';
import { Theme } from '../theme.js';

export class ParentScene extends BaseScene {
  constructor() {
    super();
    this.stats = {};
    this.weeklyData = []; // 缓存周数据，避免每帧随机
  }

  onEnter() {
    super.onEnter();
    this.stats = this.loadStats();
    this.weeklyData = this.generateWeeklyData();
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

  // 生成周数据（缓存，避免每帧随机）
  generateWeeklyData() {
    const data = [];
    for (let i = 0; i < 7; i++) {
      data.push(Math.random() * 0.7 + 0.1); // 0.1 到 0.8 之间的随机值
    }
    return data;
  }

  render(ctx, w, h) {
    this.drawPageBackground(ctx, w, h);
    this.buttons = [];

    const { headerBottom } = this.drawPageHeader(ctx, w, '家长面板', () => {
      this.manager.switchTo('mainMenu');
    });

    const realm = CultivationSystem.getCurrentRealm(this.stats.totalStages || 0);
    const realmCardY = headerBottom + Theme.layout.gap.sm;
    const realmCardW = w - 40;
    const realmCardH = 80;

    // 灵气卡片
    this.drawCard(ctx, 20, realmCardY, realmCardW, realmCardH, {
      border: realm.realm.color,
      glow: realm.realm.color,
    });

    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(realm.realm.icon, 60, realmCardY + 45);

    ctx.font = `bold ${Theme.fonts.sizes.header}px ${Theme.fonts.primary}`;
    ctx.fillStyle = realm.realm.color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(CultivationSystem.getFullLabel(this.stats.totalStages || 0), 90, realmCardY + 32);

    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.muted;
    ctx.fillText(realm.realm.desc, 90, realmCardY + 56);

    // 统计卡片
    const cardW = (w - 50) / 2;
    const cardH = 80;
    const startY = realmCardY + realmCardH + 15;

    const stats = [
      { icon: '📝', label: '词汇量', value: `${this.stats.totalWords || 0}`, color: Theme.colors.button.primary },
      { icon: '✅', label: '通关', value: `${this.stats.totalStages || 0}`, color: Theme.colors.button.secondary },
      { icon: '⏱️', label: '学习时长', value: `${this.stats.totalMinutes || 0}分`, color: Theme.colors.button.info },
      { icon: '🔥', label: '连续天数', value: `${this.stats.streak || 0}天`, color: Theme.colors.button.danger },
    ];

    stats.forEach((stat, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 18 + col * (cardW + 14);
      const y = startY + row * (cardH + 10);

      // 灵气卡片
      this.drawMenuCard(ctx, x, y, cardW, cardH, {
        bgTop: Theme.colors.card.bgTop,
        bgBottom: Theme.colors.card.bgBottom,
        border: Theme.colors.card.border,
        spiritPattern: stat.color,
      });

      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(stat.icon, x + 28, y + 35);

      ctx.font = `bold 20px ${Theme.fonts.primary}`;
      ctx.fillStyle = stat.color;
      ctx.textAlign = 'left';
      ctx.fillText(stat.value, x + 55, y + 38);

      ctx.font = `12px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText(stat.label, x + 55, y + 58);
    });

    // 学习趋势 - 使用缓存数据
    const calY = startY + 2 * (cardH + 10) + 10;
    const calH = 120;
    this.drawCard(ctx, 18, calY, w - 36, calH, { border: Theme.colors.card.border });

    ctx.font = `bold 14px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.textAlign = 'left';
    ctx.fillText('本周学习趋势', 35, calY + 25);

    const days = ['一', '二', '三', '四', '五', '六', '日'];
    const barW = (w - 90) / 7;
    const maxBarH = calH - 55;

    days.forEach((day, i) => {
      const x = 35 + i * barW;
      const barH2 = this.weeklyData[i] * maxBarH; // 使用缓存数据
      const barY2 = calY + calH - 20 - barH2;

      // 灵气渐变柱状图
      const barGrad = ctx.createLinearGradient(0, barY2, 0, barY2 + barH2);
      barGrad.addColorStop(0, i === 6 ? Theme.colors.button.primary : Theme.colors.button.info);
      barGrad.addColorStop(1, i === 6 ? Theme.colors.button.primary : Theme.colors.accent.cyan);
      ctx.fillStyle = barGrad;
      this.roundRect(ctx, x + 5, barY2, barW - 10, barH2, 3);
      ctx.fill();

      ctx.font = `10px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.textAlign = 'center';
      ctx.fillText(`周${day}`, x + barW / 2, calY + calH - 6);
    });

    this.renderButtons(ctx);
  }
}
