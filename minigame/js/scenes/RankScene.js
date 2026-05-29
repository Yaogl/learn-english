import { BaseScene } from './BaseScene';
import { CultivationSystem } from '../data/CultivationSystem';

export class RankScene extends BaseScene {
  constructor() {
    super();
    this.rankList = [];
    this.tab = 'realms';
  }

  onEnter() {
    super.onEnter();
    this.rankList = this.loadRankData();
    this.tab = 'realms';
    const itemH = 55;
    const totalH = 100 + this.rankList.length * itemH;
    this.maxScrollY = Math.max(0, totalH - 800);
  }

  loadRankData() {
    try {
      const data = wx.getStorageSync('rank_data');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  render(ctx, w, h) {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#E8F5E9');
    bg.addColorStop(1, '#C8E6C9');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    this.drawTitle(ctx, '排行榜', w / 2, 45, 22, '#5D4037');

    this.buttons = [];
    this.addButton(10, 10, 60, 30, '← 返回', 'rgba(0,0,0,0.3)', () => {
      this.manager.switchTo('mainMenu');
    });

    const tabs = [
      { key: 'realms', label: '境界' },
      { key: 'words', label: '词汇' },
      { key: 'streak', label: '坚持' },
    ];

    const tabW = (w - 50) / 3;
    tabs.forEach((tab, i) => {
      const x = 18 + i * (tabW + 7);
      const selected = this.tab === tab.key;

      ctx.fillStyle = selected ? '#4CAF50' : '#fff';
      this.roundRect(ctx, x, 58, tabW, 30, 8);
      ctx.fill();

      ctx.font = 'bold 13px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = selected ? '#fff' : '#666';
      ctx.textAlign = 'center';
      ctx.fillText(tab.label, x + tabW / 2, 77);

      this.addButton(x, 58, tabW, 30, '', 'transparent', () => {
        this.tab = tab.key;
      });
    });

    const startY = 100;
    const itemH = 55;

    if (this.rankList.length === 0) {
      ctx.font = '16px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.textAlign = 'center';
      ctx.fillText('暂无排行数据', w / 2, h / 2);
      return;
    }

    this.rankList.forEach((item, i) => {
      const y = startY + i * itemH;
      if (y > h - 60) return;

      this.drawMenuCard(ctx, 15, y, w - 30, itemH - 6, {
        bgTop: '#fff',
        bgBottom: '#f9f9f9',
        border: i < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][i] : '#E8E8E8',
      });

      const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
      ctx.font = 'bold 16px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = i < 3 ? rankColors[i] : '#999';
      ctx.textAlign = 'center';
      ctx.fillText(`${i + 1}`, 40, y + 32);

      ctx.fillStyle = '#E0E0E0';
      ctx.beginPath();
      ctx.arc(72, y + 28, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '14px sans-serif';
      ctx.fillText(item.avatar || '?', 72, y + 33);

      ctx.font = 'bold 14px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'left';
      ctx.fillText(item.name || '匿名', 98, y + 24);

      ctx.font = '11px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(CultivationSystem.getFullLabel(item.stages || 0), 98, y + 42);

      ctx.font = '14px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#4CAF50';
      ctx.textAlign = 'right';
      const score = this.tab === 'realms' ? CultivationSystem.getFullLabel(item.stages || 0) :
                    this.tab === 'words' ? `${item.words || 0}词` : `${item.streak || 0}天`;
      ctx.fillText(score, w - 25, y + 32);
    });
  }
}
