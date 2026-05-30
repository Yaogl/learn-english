import { BaseScene } from './BaseScene';
import { getAllRealms, getRealmByStage, getStageIndexInRealm, getRealmTotalStages, getTotalStages } from '../data/LevelData';
import { Theme } from '../theme.js';

/**
 * 关卡选择 - 12境界藤蔓关卡
 */
export class LevelSelect extends BaseScene {
  constructor() {
    super();
    this.view = 'realms'; // realms, stages
    this.selectedRealm = null;
    this.completedStages = [];
    this.scrollY = 0;
  }

  onEnter(params) {
    super.onEnter(params);
    this.view = 'realms';
    this.selectedRealm = null;
    this.completedStages = this.loadCompletedStages();
    this.scrollY = 0;
  }

  loadCompletedStages() {
    try {
      const data = wx.getStorageSync('completed_stages');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  render(ctx, w, h) {
    // 仙气背景
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#E8F5E9');
    bg.addColorStop(0.5, '#C8E6C9');
    bg.addColorStop(1, '#A5D6A7');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // 云雾装饰
    this.drawCloudMist(ctx, w, h);

    this.buttons = [];
    this.drawBackButton(ctx, 10, 10, () => {
      if (this.view === 'stages') {
        this.view = 'realms';
        this.scrollY = 0;
      } else {
        this.manager.switchTo('mainMenu');
      }
    });

    if (this.view === 'realms') {
      this.renderRealms(ctx, w, h);
    } else {
      this.renderStages(ctx, w, h);
    }

    this.renderButtons(ctx);
  }

  renderRealms(ctx, w, h) {
    // 修仙风格标题
    this.drawTitle(ctx, '修炼境界', w / 2, 45, 22, Theme.colors.text.primary);

    // 进度
    const totalCompleted = this.completedStages.length;
    const totalStages = getTotalStages();
    this.drawSubTitle(ctx, `已通关 ${totalCompleted}/${totalStages} 关`, w / 2, 65);

    // 境界列表
    const realms = getAllRealms();
    const startY = 80;
    const itemH = 65;
    const cardW = w - 30;
    const maxScroll = Math.max(0, realms.length * (itemH + 10) - (h - 100));

    this.maxScrollY = maxScroll;

    for (let i = 0; i < realms.length; i++) {
      const realm = realms[i];
      const y = startY + i * (itemH + 10) - this.scrollY;
      if (y < 60 || y > h) continue;

      const isUnlocked = totalCompleted >= realm.startStage - 1;
      const completedInRealm = this.completedStages.filter(
        s => s >= realm.startStage && s <= realm.endStage
      ).length;
      const totalInRealm = realm.endStage - realm.startStage + 1;

      ctx.save();
      if (!isUnlocked) ctx.globalAlpha = 0.4;

      // 灵气卡片
      this.drawCard(ctx, 15, y, cardW, itemH, {
        border: isUnlocked ? realm.color : '#ddd',
        glow: isUnlocked ? realm.color : null,
      });

      // 图标
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isUnlocked ? realm.icon : '🔒', 50, y + itemH / 2 + 5);

      // 名称
      ctx.font = `bold 16px ${Theme.fonts.primary}`;
      ctx.fillStyle = isUnlocked ? Theme.colors.text.primary : Theme.colors.text.light;
      ctx.textAlign = 'left';
      ctx.fillText(realm.name, 80, y + 25);

      // 描述
      ctx.font = `12px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText(realm.desc, 80, y + 45);

      // 进度
      ctx.font = `12px ${Theme.fonts.primary}`;
      ctx.fillStyle = realm.color;
      ctx.textAlign = 'right';
      ctx.fillText(`${completedInRealm}/${totalInRealm}`, cardW + 5, y + 25);

      // 灵气进度条
      const barW = 60;
      const barY = y + itemH - 18;
      ctx.fillStyle = '#E8E8E8';
      this.roundRect(ctx, cardW - barW - 15, barY, barW, 6, 3);
      ctx.fill();
      if (completedInRealm > 0) {
        const progressGrad = ctx.createLinearGradient(cardW - barW - 15, barY, cardW - barW - 15 + barW * (completedInRealm / totalInRealm), barY);
        progressGrad.addColorStop(0, realm.color);
        progressGrad.addColorStop(1, this.lightenColor(realm.color, 20));
        ctx.fillStyle = progressGrad;
        this.roundRect(ctx, cardW - barW - 15, barY, barW * (completedInRealm / totalInRealm), 6, 3);
        ctx.fill();
      }

      ctx.restore();

      if (isUnlocked) {
        this.addButton(15, y, cardW, itemH, '', 'transparent', () => {
          this.selectedRealm = realm;
          this.view = 'stages';
          this.scrollY = 0;
        });
      }
    }
  }

  renderStages(ctx, w, h) {
    const realm = this.selectedRealm;
    if (!realm) return;

    // 修仙风格标题
    this.drawTitle(ctx, `${realm.icon} ${realm.name}`, w / 2, 40, 18, realm.color);
    this.drawSubTitle(ctx, realm.desc, w / 2, 60);

    // 藤蔓 + 关卡叶子
    const totalStages = realm.endStage - realm.startStage + 1;
    const cols = 4;
    const cellSize = Math.min(65, (w - 50) / cols);
    const gap = 12;
    const startX = (w - cols * (cellSize + gap) + gap) / 2;
    const startY = 80;
    const rows = Math.ceil(totalStages / cols);
    const maxScroll = Math.max(0, rows * (cellSize + gap) - (h - 120));

    this.maxScrollY = maxScroll;

    // 灵藤主线
    ctx.save();
    const vineGrad = ctx.createLinearGradient(0, startY - this.scrollY, 0, startY + rows * (cellSize + gap) - this.scrollY);
    vineGrad.addColorStop(0, '#8BC34A');
    vineGrad.addColorStop(0.5, '#66BB6A');
    vineGrad.addColorStop(1, '#4CAF50');
    ctx.strokeStyle = vineGrad;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    const vineX = startX + cellSize / 2;
    ctx.moveTo(vineX, startY - this.scrollY);
    ctx.lineTo(vineX, startY + rows * (cellSize + gap) - this.scrollY);
    ctx.stroke();
    ctx.restore();

    for (let i = 0; i < totalStages; i++) {
      const stageNum = realm.startStage + i;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cellSize + gap);
      const y = startY + row * (cellSize + gap) - this.scrollY;

      if (y < 60 || y > h) continue;

      const isCompleted = this.completedStages.includes(stageNum);
      const isCurrent = !isCompleted && stageNum <= this.completedStages.length + 1;
      const isLocked = !isCompleted && !isCurrent;

      // 叶子/果实
      ctx.save();
      if (isLocked) ctx.globalAlpha = 0.3;

      // 形状
      const cx = x + cellSize / 2;
      const cy = y + cellSize / 2;

      if (isCompleted) {
        // 金色灵果 - 已完成
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.ellipse(cx, cy, cellSize * 0.4, cellSize * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFA000';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (isCurrent) {
        // 绿色灵果 - 当前关卡
        ctx.fillStyle = realm.color;
        ctx.shadowColor = realm.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(cx, cy, cellSize * 0.4, cellSize * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // 灰色灵果 - 未解锁
        ctx.fillStyle = '#E0E0E0';
        ctx.beginPath();
        ctx.ellipse(cx, cy, cellSize * 0.4, cellSize * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 关卡号
      ctx.font = `bold ${cellSize * 0.25}px ${Theme.fonts.primary}`;
      ctx.fillStyle = isCompleted ? '#FFFFFF' : (isCurrent ? '#FFFFFF' : '#999999');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i + 1}`, cx, cy);

      ctx.restore();

      // 点击进入
      if (!isLocked) {
        this.addButton(x, y, cellSize, cellSize, '', 'transparent', () => {
          this.manager.switchTo('game', { stage: stageNum });
        });
      }
    }
  }
}
