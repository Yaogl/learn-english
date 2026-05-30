import { BaseScene } from './BaseScene';
import { getAllRealms, getRealmByStage, getStageIndexInRealm, getRealmTotalStages, getTotalStages } from '../data/LevelData';
import { loadCompletedStages, getMaxCompletedStage } from '../data/ProgressStore.js';
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
    this.completedStages = loadCompletedStages();
    this.scrollY = 0;
  }

  _getMaxCompleted() {
    return getMaxCompletedStage(this.completedStages);
  }

  render(ctx, w, h) {
    this.completedStages = loadCompletedStages();
    this.drawPageBackground(ctx, w, h);
    this.buttons = [];

    const onBack = () => {
      if (this.view === 'stages') {
        this.view = 'realms';
        this.scrollY = 0;
      } else {
        this.manager.switchTo('mainMenu');
      }
    };

    if (this.view === 'realms') {
      const totalCompleted = this.completedStages.length;
      const totalStages = getTotalStages();
      const { headerBottom } = this.drawPageHeader(ctx, w, '修炼境界', onBack, {
        subTitle: `已通关 ${totalCompleted}/${totalStages} 关`,
        subTitleColor: Theme.colors.text.cyan,
      });
      this.renderRealms(ctx, w, h, headerBottom);
    } else {
      this.drawBackButton(ctx, 10, 10, onBack);
      this.renderStages(ctx, w, h);
    }

    this.renderButtons(ctx);
  }

  renderRealms(ctx, w, h, headerBottom) {
    const maxCompleted = this._getMaxCompleted();
    const totalCompleted = this.completedStages.length;
    const realms = getAllRealms();
    const startY = headerBottom + Theme.layout.gap.sm;
    const itemH = 65;
    const cardW = w - 30;
    const maxScroll = Math.max(0, realms.length * (itemH + 10) - (h - startY));

    this.maxScrollY = maxScroll;

    for (let i = 0; i < realms.length; i++) {
      const realm = realms[i];
      const y = startY + i * (itemH + 10) - this.scrollY;
      if (y < startY - itemH || y > h) continue;

      const isUnlocked = maxCompleted >= realm.startStage - 1;
      const completedInRealm = this.completedStages.filter(
        s => s >= realm.startStage && s <= realm.endStage
      ).length;
      const totalInRealm = realm.endStage - realm.startStage + 1;

      ctx.save();
      if (!isUnlocked) ctx.globalAlpha = 0.4;

      this.drawGlassPanel(ctx, 15, y, cardW, itemH, {
        border: isUnlocked ? realm.color : Theme.colors.card.borderMuted,
        accentColor: isUnlocked ? realm.color : null,
      });

      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isUnlocked ? realm.icon : '🔒', 50, y + itemH / 2 + 5);

      ctx.font = `bold ${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
      ctx.fillStyle = isUnlocked ? Theme.colors.text.primary : Theme.colors.text.muted;
      ctx.textAlign = 'left';
      ctx.fillText(realm.name, 80, y + 25);

      ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.secondary;
      ctx.fillText(realm.desc, 80, y + 47);

      ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
      ctx.fillStyle = realm.color;
      ctx.textAlign = 'right';
      ctx.fillText(`${completedInRealm}/${totalInRealm}`, cardW + 5, y + 25);

      const barW = 60;
      const barY = y + itemH - 18;
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
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

    const back = Theme.layout.backBtn;
    const panelY = back.y + back.h + Theme.layout.gap.lg;

    this.drawGlassPanel(ctx, 16, panelY, w - 32, 78, {
      border: realm.color,
      accentColor: realm.color,
    });
    ctx.font = '34px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(realm.icon, 32, panelY + 46);
    ctx.font = `bold ${Theme.fonts.sizes.header}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.gold;
    ctx.fillText(realm.name, 72, panelY + 36);
    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.secondary;
    ctx.fillText(realm.desc, 72, panelY + 60);
    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.cyan;
    ctx.textAlign = 'right';
    ctx.fillText('🌿 点击灵叶开始', w - 28, panelY + 46);

    const totalStages = realm.endStage - realm.startStage + 1;
    const nodeSize = Math.min(72, (w - 48) / 4);
    const gap = 16;
    const cols = totalStages <= 4 ? totalStages : 4;
    const rows = Math.ceil(totalStages / cols);
    const startY = panelY + 88 + Theme.layout.gap.md;
    const maxScroll = Math.max(0, rows * (nodeSize + gap + 8) - (h - startY - 30));
    this.maxScrollY = maxScroll;

    // 背景柔光（不要竖线藤蔓）
    ctx.save();
    ctx.globalAlpha = 0.12;
    const glow = ctx.createRadialGradient(w / 2, startY + rows * nodeSize * 0.4, 0, w / 2, startY + rows * nodeSize * 0.4, w * 0.45);
    glow.addColorStop(0, realm.color);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, startY - 20, w, h);
    ctx.restore();

    const maxCompleted = this._getMaxCompleted();

    for (let i = 0; i < totalStages; i++) {
      const stageNum = realm.startStage + i;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const itemsInRow = Math.min(cols, totalStages - row * cols);
      const rowW = itemsInRow * nodeSize + (itemsInRow - 1) * gap;
      const rowStartX = (w - rowW) / 2;
      const x = rowStartX + col * (nodeSize + gap);
      const y = startY + row * (nodeSize + gap + 8) - this.scrollY;

      if (y + nodeSize < 50 || y > h + 20) continue;

      const isCompleted = this.completedStages.includes(stageNum);
      const isCurrent = !isCompleted && stageNum === maxCompleted + 1;
      const isLocked = !isCompleted && stageNum > maxCompleted + 1;

      this.drawLeafNode(ctx, x, y, nodeSize, {
        index: i + 1,
        isCompleted,
        isCurrent,
        isLocked,
        realmColor: realm.color,
      });

      if (!isLocked) {
        this.addButton(x, y, nodeSize, nodeSize, '', 'transparent', () => {
          this.manager.switchTo('game', { stage: stageNum });
        });
      }
    }
  }

  /** 灵叶关卡节点 — 对齐 Web 原型 .leaf-node */
  drawLeafNode(ctx, x, y, size, opts) {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const r = size / 2 - 2;

    ctx.save();
    if (opts.isLocked) ctx.globalAlpha = 0.38;

    // 当前关外圈光晕
    if (opts.isCurrent) {
      ctx.globalAlpha = 1;
      ctx.shadowColor = opts.realmColor || Theme.colors.button.primary;
      ctx.shadowBlur = 18;
      ctx.strokeStyle = opts.realmColor || Theme.colors.button.primary;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 节点底：紫玻璃 + 可见填充
    const bg = ctx.createRadialGradient(cx, cy - r * 0.2, r * 0.1, cx, cy, r);
    bg.addColorStop(0, 'rgba(90,58,158,0.95)');
    bg.addColorStop(1, 'rgba(42,24,88,0.92)');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // 边框
    ctx.lineWidth = 2.5;
    if (opts.isCompleted) {
      ctx.strokeStyle = Theme.colors.accent.gold;
      ctx.shadowColor = Theme.colors.accent.gold;
      ctx.shadowBlur = 10;
    } else if (opts.isCurrent) {
      ctx.strokeStyle = opts.realmColor || '#6bcb77';
    } else if (opts.isLocked) {
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    } else {
      ctx.strokeStyle = 'rgba(107,203,119,0.65)';
    }
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 叶子 + 关卡号
    ctx.font = `${size * 0.34}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍃', cx, cy - size * 0.14);

    ctx.font = `bold ${size * 0.26}px ${Theme.fonts.primary}`;
    ctx.fillStyle = opts.isCompleted ? Theme.colors.accent.gold : Theme.colors.text.primary;
    ctx.fillText(`${opts.index}`, cx, cy + size * 0.16);

    if (opts.isCompleted) {
      ctx.font = `${size * 0.22}px sans-serif`;
      ctx.fillText('⭐', cx + r * 0.55, cy - r * 0.55);
    }

    ctx.restore();
  }
}
