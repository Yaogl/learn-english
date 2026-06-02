import { BaseScene } from './BaseScene';
import { CultivationSystem } from '../data/CultivationSystem';
import { Theme } from '../theme.js';

/**
 * 排行榜 — 对齐参考项目 RankingBoard.tsx
 * 奖杯头部 + 双标签 + 领奖台 + 列表 + 底部个人信息
 */
export class RankScene extends BaseScene {
  constructor() {
    super();
    this.rankList = [];
    this.tab = 'friends';
    this.scrollY = 0;
    this.maxScrollY = 0;
    this.userAvatar = null;
    this._avatarLoaded = false;
  }

  onEnter() {
    super.onEnter();
    this.rankList = this.loadRankData();
    this.tab = 'friends';
    this.scrollY = 0;
    this.maxScrollY = 0;
    this._loadUserAvatar();
    this._loadRankAvatars();
  }

  _loadUserAvatar() {
    if (this._avatarLoaded) return;
    this._avatarLoaded = true;
    try {
      const userInfo = wx.getStorageSync('user_info');
      if (userInfo?.avatarUrl) {
        this.userAvatar = wx.createImage();
        this.userAvatar.src = userInfo.avatarUrl;
      }
    } catch (e) {}
  }

  _loadRankAvatars() {
    this.rankList.forEach(p => {
      if (p.avatarUrl && !p._avatarImg) {
        p._avatarImg = wx.createImage();
        p._avatarImg.src = p.avatarUrl;
      }
    });
  }

  loadRankData() {
    try {
      const data = wx.getStorageSync('rank_data');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  _getSortedList() {
    const key = this.tab === 'realms' ? 'stages' :
                this.tab === 'words' ? 'words' : 'streak';
    return [...this.rankList].sort((a, b) => (b[key] || 0) - (a[key] || 0));
  }

  render(ctx, w, h) {
    this.drawPageBackground(ctx, w, h);
    this.buttons = [];

    const headerBottom = this._renderHeader(ctx, w);
    const tabBottom = this._renderTabBar(ctx, w, headerBottom);
    const sortedList = this._getSortedList();
    const podiumBottom = this._renderPodium(ctx, w, tabBottom, sortedList);
    this._renderRankList(ctx, w, h, podiumBottom, sortedList);
    this._renderSelfStats(ctx, w, h);

    this.renderButtons(ctx);
  }

  // ==================== Header ====================

  _renderHeader(ctx, w) {
    const y = 56;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 奖杯
    ctx.font = '36px sans-serif';
    ctx.fillText('🏆', w / 2, y);
    // 标题
    ctx.font = `bold ${Theme.fonts.sizes.header}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.fillText('全服封神榜', w / 2, y + 38);
    // 赛季副标题
    ctx.font = `10px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.muted;
    ctx.fillText('翠竹入梦赛季 ✦ Season of the Whispering Bamboo', w / 2, y + 58);
    ctx.restore();
    return y + 76;
  }

  // ==================== Tab ====================

  _renderTabBar(ctx, w, top) {
    const tabH = 32;
    const gap = 8;
    const tabW = (w - 60 - gap) / 2;
    const startX = 30;
    const y = top;

    ctx.save();
    // 背景胶囊
    ctx.fillStyle = 'rgba(251,191,36,0.12)';
    this.roundRect(ctx, startX - 8, y - 4, w - 44, tabH + 8, (tabH + 8) / 2);
    ctx.fill();

    const tabs = [
      { key: 'friends', label: '👥 好友' },
      { key: 'global', label: '🌐 全服' },
    ];

    tabs.forEach((tab, i) => {
      const tx = startX + i * (tabW + gap);
      const isActive = this.tab === tab.key;
      if (isActive) {
        ctx.fillStyle = Theme.colors.accent.green;
        this.roundRect(ctx, tx, y, tabW, tabH, tabH / 2);
        ctx.fill();
      }
      ctx.font = `bold 12px ${Theme.fonts.primary}`;
      ctx.fillStyle = isActive ? '#ffffff' : Theme.colors.text.primary;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tab.label, tx + tabW / 2, y + tabH / 2);
    });
    ctx.restore();

    // 点击热区
    tabs.forEach((tab, i) => {
      const tx = startX + i * (tabW + gap);
      this.addButton(tx, y, tabW, tabH, '', 'transparent', () => { this.tab = tab.key; });
    });

    return y + tabH + 12;
  }

  // ==================== Podium ====================

  _renderPodium(ctx, w, top, list) {
    if (list.length === 0) return top;

    const podiumH = 180;
    const y = top;

    // 背景卡片
    ctx.save();
    ctx.fillStyle = 'rgba(5,150,105,0.05)';
    this.roundRect(ctx, 16, y, w - 32, podiumH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(5,150,105,0.10)';
    ctx.lineWidth = 1;
    this.roundRect(ctx, 16, y, w - 32, podiumH, 16);
    ctx.stroke();

    // 顶部文字
    ctx.font = `10px ${Theme.fonts.primary}`;
    ctx.fillStyle = 'rgba(6,78,59,0.35)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('- 魁首争雄 -', w / 2, y + 14);
    ctx.restore();

    // 三个位置：2nd(左) 1st(中) 3rd(右)
    const positions = [
      { rank: 2, x: w * 0.22, avatarR: 26, pb: y + podiumH - 20 },
      { rank: 1, x: w * 0.5,  avatarR: 32, pb: y + podiumH - 50 },
      { rank: 3, x: w * 0.78, avatarR: 22, pb: y + podiumH - 14 },
    ];
    const rankColors = ['#fbbf24', '#c4c0c8', '#c9a882'];

    positions.forEach((pos) => {
      const player = list[pos.rank - 1];
      if (!player) return;

      const cx = pos.x;
      const cy = pos.pb - pos.avatarR - 12;

      // 外圈发光
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, pos.avatarR + 4, 0, Math.PI * 2);
      ctx.fillStyle = rankColors[pos.rank - 1];
      ctx.shadowColor = rankColors[pos.rank - 1];
      ctx.shadowBlur = pos.rank === 1 ? 14 : 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 头像圆形裁剪
      ctx.beginPath();
      ctx.arc(cx, cy, pos.avatarR, 0, Math.PI * 2);
      ctx.clip();

      // 白底
      ctx.fillStyle = '#f0fdf4';
      ctx.fillRect(cx - pos.avatarR, cy - pos.avatarR, pos.avatarR * 2, pos.avatarR * 2);

      // 头像图片或首字母
      if (player._avatarImg && player._avatarImg.width) {
        ctx.drawImage(player._avatarImg, cx - pos.avatarR, cy - pos.avatarR, pos.avatarR * 2, pos.avatarR * 2);
      } else {
        ctx.font = `bold ${pos.avatarR * 0.8}px ${Theme.fonts.primary}`;
        ctx.fillStyle = '#065f46';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((player.name || '?')[0], cx, cy);
      }
      ctx.restore();

      // 排名角标
      const badgeX = cx + pos.avatarR * 0.65;
      const badgeY = cy + pos.avatarR * 0.65;
      const badgeR = pos.rank === 1 ? 11 : 9;
      ctx.save();
      ctx.beginPath();
      ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
      ctx.fillStyle = pos.rank === 1 ? '#fbbf24' : '#ffffff';
      ctx.strokeStyle = pos.rank === 1 ? '#ffffff' : rankColors[pos.rank - 1];
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      ctx.font = `bold ${pos.rank === 1 ? 10 : 8}px ${Theme.fonts.primary}`;
      ctx.fillStyle = pos.rank === 1 ? '#ffffff' : '#065f46';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${pos.rank}`, badgeX, badgeY);
      ctx.restore();

      // 名字
      ctx.save();
      ctx.font = `bold ${pos.rank === 1 ? 11 : 10}px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.primary;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText((player.name || '匿名').slice(0, 6), cx, cy + pos.avatarR + 10);
      ctx.font = `9px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText(CultivationSystem.getFullLabel(player.stages || 0), cx, cy + pos.avatarR + 24);
      ctx.restore();
    });

    return y + podiumH;
  }

  // ==================== Rank List ====================

  _renderRankList(ctx, w, h, top, list) {
    if (list.length === 0) {
      ctx.save();
      ctx.font = `${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('暂无排行数据', w / 2, h / 2);
      ctx.restore();
      return;
    }

    const itemH = 60;
    const listTop = top + 8;
    this.maxScrollY = Math.max(0, listTop + list.length * itemH - (h - 70));

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, listTop, w, h - listTop - 60);
    ctx.clip();

    const rankColors = ['#fbbf24', '#c4c0c8', '#c9a882'];

    list.forEach((player, i) => {
      const y = listTop + i * itemH - this.scrollY;
      if (y > h - 60 || y + itemH < listTop) return;

      const isTop3 = i < 3;

      // 卡片背景
      ctx.save();
      ctx.fillStyle = isTop3 ? 'rgba(255,251,235,0.85)' : 'rgba(255,250,223,0.65)';
      this.roundRect(ctx, 16, y, w - 32, itemH - 6, 12);
      ctx.fill();
      if (isTop3) {
        ctx.strokeStyle = rankColors[i];
        ctx.lineWidth = 1.5;
        this.roundRect(ctx, 16, y, w - 32, itemH - 6, 12);
        ctx.stroke();
      }
      ctx.restore();

      // 排名数字
      ctx.save();
      ctx.font = `bold ${isTop3 ? 14 : 12}px ${Theme.fonts.primary}`;
      ctx.fillStyle = isTop3 ? rankColors[i] : Theme.colors.text.muted;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i + 1}`, 40, y + (itemH - 6) / 2);
      ctx.restore();

      // 头像
      this._drawAvatar(ctx, 72, y + (itemH - 6) / 2, 18, {
        img: player._avatarImg,
        name: player.name,
        borderColor: isTop3 ? rankColors[i] : 'rgba(6,78,59,0.15)',
      });

      // 名字 + 境界
      ctx.save();
      ctx.font = `bold 12px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.primary;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText((player.name || '匿名').slice(0, 8), 100, y + 18);
      ctx.font = `10px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText(CultivationSystem.getFullLabel(player.stages || 0), 100, y + 36);
      ctx.restore();

      // 进度条
      const barX = 100;
      const barY = y + 44;
      const barW = w - 160;
      const barH = 4;
      const pct = Math.min(1, (player.stages || 0) / 200);
      ctx.save();
      ctx.fillStyle = 'rgba(251,191,36,0.20)';
      this.roundRect(ctx, barX, barY, barW, barH, 2);
      ctx.fill();
      if (pct > 0) {
        ctx.fillStyle = Theme.colors.accent.green;
        this.roundRect(ctx, barX, barY, Math.max(barH, barW * pct), barH, 2);
        ctx.fill();
      }
      ctx.restore();

      // 分数
      ctx.save();
      ctx.font = `bold 12px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.button.primary;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const score = this.tab === 'realms' ? CultivationSystem.getFullLabel(player.stages || 0) :
                    this.tab === 'words' ? `${player.words || 0}词` : `${player.streak || 0}天`;
      ctx.fillText(score, w - 24, y + (itemH - 6) / 2);
      ctx.restore();
    });

    ctx.restore();
  }

  // ==================== Avatar Helper ====================

  _drawAvatar(ctx, x, y, r, opts) {
    ctx.save();
    // 外圈边框
    if (opts.borderColor) {
      ctx.beginPath();
      ctx.arc(x, y, r + 2, 0, Math.PI * 2);
      ctx.fillStyle = opts.borderColor;
      ctx.fill();
    }
    // 圆形裁剪
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();

    if (opts.img && opts.img.width) {
      ctx.drawImage(opts.img, x - r, y - r, r * 2, r * 2);
    } else {
      // 首字母占位
      ctx.fillStyle = '#d1fae5';
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      ctx.font = `bold ${r * 0.8}px ${Theme.fonts.primary}`;
      ctx.fillStyle = '#065f46';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((opts.name || '?')[0], x, y);
    }
    ctx.restore();
  }

  // ==================== Self Stats Footer ====================

  _renderSelfStats(ctx, w, h) {
    const barH = 60;
    const y = h - barH;

    // 渐变遮罩
    ctx.save();
    const grad = ctx.createLinearGradient(0, y, 0, h);
    grad.addColorStop(0, 'rgba(209,250,229,0)');
    grad.addColorStop(0.3, 'rgba(209,250,229,0.95)');
    grad.addColorStop(1, 'rgba(209,250,229,0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, w, barH);
    ctx.restore();

    // 绿色卡片
    ctx.save();
    ctx.fillStyle = Theme.colors.accent.green;
    this.roundRect(ctx, 16, y + 6, w - 32, barH - 12, 14);
    ctx.fill();
    ctx.restore();

    // 查找自己
    const sorted = this._getSortedList();
    const selfIdx = sorted.findIndex(p => p.isSelf);
    const selfRank = selfIdx >= 0 ? selfIdx + 1 : '--';
    const selfName = selfIdx >= 0 ? sorted[selfIdx].name : '灵语行者';

    // 排名
    ctx.save();
    ctx.font = `bold 14px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${selfRank}`, 40, y + barH / 2);
    ctx.restore();

    // 头像
    this._drawAvatar(ctx, 72, y + barH / 2, 18, {
      img: this.userAvatar,
      name: selfName,
      borderColor: 'rgba(255,255,255,0.4)',
    });

    // 名字 + 提示
    ctx.save();
    ctx.font = `bold 12px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${selfName} (你)`, 100, y + 22);
    ctx.font = `10px ${Theme.fonts.primary}`;
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText(`全服第 ${selfRank} 位 ✦ 道阻且长，继续修行！`, 100, y + 40);
    ctx.restore();

    // 开始历练按钮
    this.addButton(w - 90, y + 14, 70, 32, '开始历练', '#fbbf24', () => {
      this.manager.switchTo('levels');
    });
  }
}
