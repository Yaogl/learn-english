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
    this.scrollY = 0;
    this.maxScrollY = 0;
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
    this.drawPageBackground(ctx, w, h);
    this.buttons = [];

    const { headerBottom } = this.drawPageHeader(ctx, w, '排行榜', () => {
      this.manager.switchTo('mainMenu');
    });

    const tabs = [
      { key: 'realms', label: '境界' },
      { key: 'words', label: '词汇' },
      { key: 'streak', label: '坚持' },
    ];
    const startY = this.drawTabBar(ctx, w, tabs, this.tab, headerBottom, (key) => {
      this.tab = key;
    });

    const itemH = 55;
    this.maxScrollY = Math.max(0, startY + this.rankList.length * itemH - h);

    if (this.rankList.length === 0) {
      this.drawSubTitle(ctx, '暂无排行数据', w / 2, h / 2);
      this.renderButtons(ctx);
      return;
    }

    this.rankList.forEach((item, i) => {
      const y = startY + i * itemH - this.scrollY;
      if (y > h - 60 || y + itemH < startY - 20) return;

      const rankColors = [Theme.colors.accent.gold, '#c4c0c8', '#c9a882'];
      this.drawMenuCard(ctx, 15, y, w - 30, itemH - 6, {
        bgTop: Theme.colors.card.bgTop,
        bgBottom: Theme.colors.card.bgBottom,
        border: i < 3 ? rankColors[i] : Theme.colors.card.border,
        glow: i < 3 ? rankColors[i] : null,
      });

      ctx.font = `bold ${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
      ctx.fillStyle = i < 3 ? rankColors[i] : Theme.colors.text.muted;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i + 1}`, 40, y + 32);

      ctx.fillStyle = '#e8e4ef';
      ctx.beginPath();
      ctx.arc(72, y + 28, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '14px sans-serif';
      ctx.fillText(item.avatar || '?', 72, y + 33);

      ctx.font = `bold ${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.primary;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.name || '匿名', 98, y + 24);

      ctx.font = `${Theme.fonts.sizes.small}px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText(CultivationSystem.getFullLabel(item.stages || 0), 98, y + 44);

      ctx.font = `${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.button.primary;
      ctx.textAlign = 'right';
      const score = this.tab === 'realms' ? CultivationSystem.getFullLabel(item.stages || 0) :
                    this.tab === 'words' ? `${item.words || 0}词` : `${item.streak || 0}天`;
      ctx.fillText(score, w - 25, y + 32);
    });

    this.renderButtons(ctx);
  }
}
