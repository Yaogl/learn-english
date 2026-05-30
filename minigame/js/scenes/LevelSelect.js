import { BaseScene } from './BaseScene';
import { getAllRealms, getRealmByStage, getStageIndexInRealm, getRealmTotalStages, getTotalStages } from '../data/LevelData';

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
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#E8F5E9');
    bg.addColorStop(1, '#C8E6C9');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    this.buttons = [];
    this.addButton(10, 10, 60, 30, '← 返回', 'rgba(0,0,0,0.3)', () => {
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
    ctx.font = 'bold 22px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('修炼境界', w / 2, 45);

    // 进度
    const totalCompleted = this.completedStages.length;
    const totalStages = getTotalStages();
    ctx.font = '13px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText(`已通关 ${totalCompleted}/${totalStages} 关`, w / 2, 65);

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

      // 卡片
      this.drawCard(ctx, 15, y, cardW, itemH, { border: isUnlocked ? realm.color : '#ddd' });

      // 图标
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isUnlocked ? realm.icon : '🔒', 50, y + itemH / 2 + 5);

      // 名称
      ctx.font = 'bold 16px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = isUnlocked ? '#333' : '#aaa';
      ctx.textAlign = 'left';
      ctx.fillText(realm.name, 80, y + 25);

      // 描述
      ctx.font = '12px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(realm.desc, 80, y + 45);

      // 进度
      ctx.font = '12px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = realm.color;
      ctx.textAlign = 'right';
      ctx.fillText(`${completedInRealm}/${totalInRealm}`, cardW + 5, y + 25);

      // 进度条
      const barW = 60;
      const barY = y + itemH - 18;
      ctx.fillStyle = '#eee';
      this.roundRect(ctx, cardW - barW - 15, barY, barW, 6, 3);
      ctx.fill();
      if (completedInRealm > 0) {
        ctx.fillStyle = realm.color;
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

    // 标题
    ctx.font = 'bold 18px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = realm.color;
    ctx.textAlign = 'center';
    ctx.fillText(`${realm.icon} ${realm.name}`, w / 2, 40);

    ctx.font = '13px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText(realm.desc, w / 2, 60);

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

    // 藤蔓主线
    ctx.save();
    ctx.strokeStyle = '#8BC34A';
    ctx.lineWidth = 4;
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
        // 金色叶子
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.ellipse(cx, cy, cellSize * 0.4, cellSize * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFA000';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (isCurrent) {
        // 绿色高亮
        ctx.fillStyle = realm.color;
        ctx.beginPath();
        ctx.ellipse(cx, cy, cellSize * 0.4, cellSize * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // 灰色
        ctx.fillStyle = '#ddd';
        ctx.beginPath();
        ctx.ellipse(cx, cy, cellSize * 0.4, cellSize * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 关卡号
      ctx.font = `bold ${cellSize * 0.25}px "Microsoft YaHei", sans-serif`;
      ctx.fillStyle = isCompleted ? '#fff' : (isCurrent ? '#fff' : '#999');
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
