import { BaseScene } from './BaseScene';
import { CultivationSystem } from '../data/CultivationSystem';

export class ParentScene extends BaseScene {
  constructor() {
    super();
    this.stats = {};
  }

  onEnter() {
    super.onEnter();
    this.stats = this.loadStats();
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

  render(ctx, w, h) {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#FFF3E0');
    bg.addColorStop(1, '#FFE0B2');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    this.drawTitle(ctx, '家长面板', w / 2, 45, 22, '#5D4037');

    this.buttons = [];
    this.addButton(10, 10, 60, 30, '← 返回', 'rgba(0,0,0,0.3)', () => {
      this.manager.switchTo('mainMenu');
    });

    // 修为总览
    const realm = CultivationSystem.getCurrentRealm(this.stats.totalStages || 0);
    const realmCardY = 65;
    const realmCardW = w - 40;
    const realmCardH = 80;

    this.drawCard(ctx, 20, realmCardY, realmCardW, realmCardH, { border: realm.realm.color });

    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(realm.realm.icon, 60, realmCardY + 45);

    ctx.font = 'bold 18px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = realm.realm.color;
    ctx.textAlign = 'left';
    ctx.fillText(CultivationSystem.getFullLabel(this.stats.totalStages || 0), 90, realmCardY + 30);

    ctx.font = '13px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText(realm.realm.desc, 90, realmCardY + 52);

    // 统计卡片
    const cardW = (w - 50) / 2;
    const cardH = 80;
    const startY = realmCardY + realmCardH + 15;

    const stats = [
      { icon: '📝', label: '词汇量', value: `${this.stats.totalWords || 0}`, color: '#4CAF50' },
      { icon: '✅', label: '通关', value: `${this.stats.totalStages || 0}`, color: '#FF9800' },
      { icon: '⏱️', label: '学习时长', value: `${this.stats.totalMinutes || 0}分`, color: '#4A90D9' },
      { icon: '🔥', label: '连续天数', value: `${this.stats.streak || 0}天`, color: '#FF6B6B' },
    ];

    stats.forEach((stat, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 18 + col * (cardW + 14);
      const y = startY + row * (cardH + 10);

      this.drawMenuCard(ctx, x, y, cardW, cardH, {
        bgTop: '#fff',
        bgBottom: '#f9f9f9',
        border: '#E8E8E8',
      });

      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(stat.icon, x + 28, y + 35);

      ctx.font = 'bold 20px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = stat.color;
      ctx.textAlign = 'left';
      ctx.fillText(stat.value, x + 55, y + 38);

      ctx.font = '12px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(stat.label, x + 55, y + 58);
    });

    // 学习趋势
    const calY = startY + 2 * (cardH + 10) + 10;
    const calH = 120;
    this.drawCard(ctx, 18, calY, w - 36, calH, { border: '#E8E8E8' });

    ctx.font = 'bold 14px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.fillText('本周学习趋势', 35, calY + 25);

    const days = ['一', '二', '三', '四', '五', '六', '日'];
    const barW = (w - 90) / 7;
    const maxBarH = calH - 55;

    days.forEach((day, i) => {
      const x = 35 + i * barW;
      const barH2 = Math.random() * maxBarH * 0.7 + 10;
      const barY2 = calY + calH - 20 - barH2;

      ctx.fillStyle = i === 6 ? '#4CAF50' : '#4A90D9';
      this.roundRect(ctx, x + 5, barY2, barW - 10, barH2, 3);
      ctx.fill();

      ctx.font = '10px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.textAlign = 'center';
      ctx.fillText(`周${day}`, x + barW / 2, calY + calH - 6);
    });

    this.renderButtons(ctx);
  }
}
