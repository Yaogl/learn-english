import { BaseScene } from './BaseScene';
import { CultivationSystem } from '../data/CultivationSystem';
import { Theme } from '../theme.js';

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
    this.maxScrollY = Math.max(0, totalH - h);
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
    // 仙气背景 - 排行榜专用
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#FFF8E1');      // 浅金仙气
    bg.addColorStop(0.5, '#FFECB3');    // 中金
    bg.addColorStop(1, '#FFE0B2');      // 深金
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // 云雾装饰
    this.drawCloudMist(ctx, w, h);

    // 修仙风格标题
    this.drawTitle(ctx, '排行榜', w / 2, 45, 22, Theme.colors.text.primary);

    this.buttons = [];
    this.drawBackButton(ctx, 10, 10, () => {
      this.manager.switchTo('mainMenu');
    });

    // 灵气标签页
    const tabs = [
      { key: 'realms', label: '境界' },
      { key: 'words', label: '词汇' },
      { key: 'streak', label: '坚持' },
    ];

    const tabW = (w - 50) / 3;
    tabs.forEach((tab, i) => {
      const x = 18 + i * (tabW + 7);
      const selected = this.tab === tab.key;

      // 灵气标签背景
      if (selected) {
        const tabGrad = ctx.createLinearGradient(x, 58, x, 88);
        tabGrad.addColorStop(0, '#4CAF50');
        tabGrad.addColorStop(1, '#66BB6A');
        ctx.fillStyle = tabGrad;
      } else {
        ctx.fillStyle = '#FFFFFF';
      }
      this.roundRect(ctx, x, 58, tabW, 30, Theme.borderRadius.md);
      ctx.fill();

      ctx.font = `bold 13px ${Theme.fonts.primary}`;
      ctx.fillStyle = selected ? '#FFFFFF' : Theme.colors.text.secondary;
      ctx.textAlign = 'center';
      ctx.fillText(tab.label, x + tabW / 2, 77);

      this.addButton(x, 58, tabW, 30, '', 'transparent', () => {
        this.tab = tab.key;
      });
    });

    const startY = 100;
    const itemH = 55;

    if (this.rankList.length === 0) {
      this.drawSubTitle(ctx, '暂无排行数据', w / 2, h / 2);
      return;
    }

    this.rankList.forEach((item, i) => {
      const y = startY + i * itemH;
      if (y > h - 60) return;

      // 灵气卡片
      this.drawMenuCard(ctx, 15, y, w - 30, itemH - 6, {
        bgTop: '#FFFFFF',
        bgBottom: '#FAFAFA',
        border: i < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][i] : '#E8E8E8',
        glow: i < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][i] : null,
      });

      // 排名
      const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
      ctx.font = `bold 16px ${Theme.fonts.primary}`;
      ctx.fillStyle = i < 3 ? rankColors[i] : Theme.colors.text.muted;
      ctx.textAlign = 'center';
      ctx.fillText(`${i + 1}`, 40, y + 32);

      // 头像
      ctx.fillStyle = '#E0E0E0';
      ctx.beginPath();
      ctx.arc(72, y + 28, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '14px sans-serif';
      ctx.fillText(item.avatar || '?', 72, y + 33);

      // 名称
      ctx.font = `bold 14px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.primary;
      ctx.textAlign = 'left';
      ctx.fillText(item.name || '匿名', 98, y + 24);

      // 境界
      ctx.font = `11px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText(CultivationSystem.getFullLabel(item.stages || 0), 98, y + 42);

      // 分数
      ctx.font = `14px ${Theme.fonts.primary}`;
      ctx.fillStyle = '#4CAF50';
      ctx.textAlign = 'right';
      const score = this.tab === 'realms' ? CultivationSystem.getFullLabel(item.stages || 0) :
                    this.tab === 'words' ? `${item.words || 0}词` : `${item.streak || 0}天`;
      ctx.fillText(score, w - 25, y + 32);
    });
  }
}
