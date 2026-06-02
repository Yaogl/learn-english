import { BaseScene } from './BaseScene';
import { getAllRealms, getRealmByStage, getStageIndexInRealm, getRealmTotalStages, getTotalStages } from '../data/LevelData';
import { loadCompletedStages, getMaxCompletedStage } from '../data/ProgressStore.js';
import { Theme } from '../theme.js';

/**
 * 关卡选择 — 对齐参考项目 RealmSelection.tsx
 * 圆形境界节点 + 交错左右布局 + 进度指示
 */
export class LevelSelect extends BaseScene {
  constructor() {
    super();
    this.view = 'realms'; // realms, stages
    this.selectedRealm = null;
    this.completedStages = [];
    this.scrollY = 0;
    this.realmImages = {};
    this.realmImagesReady = {};
  }

  onEnter(params) {
    super.onEnter(params);
    this.view = 'realms';
    this.selectedRealm = null;
    this.completedStages = loadCompletedStages();
    this.scrollY = 0;
    this._loadRealmImages();
  }

  _loadRealmImages() {
    // 仙气背景图
    if (!this._bgImgLoaded) {
      this._bgImgLoaded = true;
      this.bgImage = wx.createImage();
      this.bgImage.src = 'assets/imgs/celestialLandscapeBg.jpg';
    }
    // 4张图片循环复用覆盖12个境界
    const imgFiles = ['mortalVillage.png', 'qiMountain.png', 'foundationRuins.png', 'goldenCorePeak.png'];
    const realms = getAllRealms();
    for (let i = 0; i < realms.length; i++) {
      const key = realms[i].id;
      if (this.realmImages[key]) continue;
      const img = wx.createImage();
      img.onload = () => { this.realmImagesReady[key] = true; };
      img.src = `assets/imgs/${imgFiles[i % imgFiles.length]}`;
      this.realmImages[key] = img;
    }
  }

  _getMaxCompleted() {
    return getMaxCompletedStage(this.completedStages);
  }

  render(ctx, w, h) {
    this.completedStages = loadCompletedStages();
    // 境界页面用仙气背景图，跳过默认渐变蒙层
    if (this.view !== 'realms') {
      this.drawPageBackground(ctx, w, h);
    }
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
      this.renderRealms(ctx, w, h, onBack);
    } else {
      this.renderStages(ctx, w, h, onBack);
    }

    this.renderButtons(ctx);
  }

  /** 境界列表 — 圆形节点交错布局 */
  renderRealms(ctx, w, h, onBack) {
    const maxCompleted = this._getMaxCompleted();
    const realms = getAllRealms();
    const totalCompleted = this.completedStages.length;
    const totalStages = getTotalStages();

    // 仙气背景图（无蒙层，直接铺满）
    if (this.bgImage) {
      ctx.drawImage(this.bgImage, 0, 0, w, h);
    } else {
      this.drawPageBackground(ctx, w, h);
    }
    // 花瓣飘落
    this.drawFallingPetals(ctx, w, h);

    // 装饰云雾
    this._drawMistClouds(ctx, w, h);

    // 返回按钮
    this.drawBackButton(ctx, 10, 10, onBack);

    // 标题
    const titleY = 68;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 标题文字 + 发光
    ctx.font = `bold ${Theme.fonts.sizes.header}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.accent.green;
    ctx.shadowColor = Theme.colors.accent.green;
    ctx.shadowBlur = 12;
    ctx.fillText('境界晋升图', w / 2, titleY);
    ctx.shadowBlur = 0;
    // 副标题
    ctx.font = `${Theme.fonts.sizes.small}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.secondary;
    ctx.fillText(`已通关 ${totalCompleted}/${totalStages} 关`, w / 2, titleY + 22);
    ctx.restore();

    // 圆形节点交错排列
    const nodeR = Math.min(48, (w - 60) / 4);
    const gapY = nodeR * 2.6;
    const startY = titleY + 50;
    const centerX = w / 2;
    const offsetX = w * 0.18;

    const maxScroll = Math.max(0, realms.length * gapY - (h - startY - 40));
    this.maxScrollY = maxScroll;

    // 连接发光路径（渐变 + 双层）
    ctx.save();
    const lineGrad = ctx.createLinearGradient(centerX, startY, centerX, startY + (realms.length - 1) * gapY);
    lineGrad.addColorStop(0, 'rgba(109,207,119,0.6)');
    lineGrad.addColorStop(0.5, 'rgba(187,233,255,0.5)');
    lineGrad.addColorStop(1, 'rgba(207,194,210,0.3)');
    // 发光层
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 6;
    ctx.setLineDash([4, 6]);
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let i = 0; i < realms.length - 1; i++) {
      const isOdd = i % 2 === 0;
      const x1 = centerX + (isOdd ? offsetX : -offsetX);
      const y1 = startY + i * gapY + nodeR - this.scrollY;
      const x2 = centerX + (!isOdd ? offsetX : -offsetX);
      const y2 = startY + (i + 1) * gapY - nodeR - this.scrollY;
      if (i === 0) ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.stroke();
    // 实线层
    ctx.strokeStyle = 'rgba(6,78,59,0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < realms.length - 1; i++) {
      const isOdd = i % 2 === 0;
      const x1 = centerX + (isOdd ? offsetX : -offsetX);
      const y1 = startY + i * gapY + nodeR - this.scrollY;
      const x2 = centerX + (!isOdd ? offsetX : -offsetX);
      const y2 = startY + (i + 1) * gapY - nodeR - this.scrollY;
      if (i === 0) ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    for (let i = 0; i < realms.length; i++) {
      const realm = realms[i];
      const isOdd = i % 2 === 0;
      const cx = centerX + (isOdd ? offsetX : -offsetX);
      const cy = startY + i * gapY + nodeR - this.scrollY;

      if (cy + nodeR < -20 || cy - nodeR > h + 20) continue;

      const isUnlocked = maxCompleted >= realm.startStage - 1;
      const completedInRealm = this.completedStages.filter(
        s => s >= realm.startStage && s <= realm.endStage
      ).length;
      const totalInRealm = realm.endStage - realm.startStage + 1;
      const isActive = isUnlocked && completedInRealm < totalInRealm;
      const isCompleted = isUnlocked && completedInRealm >= totalInRealm;

      // 活跃境界浮动动效
      const floatY = isActive ? Math.sin((this.animTime || 0) * 2) * 3 : 0;
      ctx.save();
      if (!isUnlocked) ctx.globalAlpha = 0.4;
      ctx.translate(0, floatY);

      // 圆形节点（活跃略大，通关略小）
      const imgKey = realm.id;
      const hasImg = this.realmImagesReady[imgKey];
      const nodeRDraw = isActive ? nodeR + 2 : (isCompleted ? nodeR - 2 : nodeR);

      // 外圈
      ctx.beginPath();
      ctx.arc(cx, cy, nodeRDraw, 0, Math.PI * 2);

      if (hasImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, nodeRDraw, 0, Math.PI * 2);
        ctx.clip();
        const img = this.realmImages[imgKey];
        const imgSize = nodeRDraw * 2;
        ctx.drawImage(img, cx - nodeRDraw, cy - nodeRDraw, imgSize, imgSize);
        ctx.restore();
      } else {
        // 纯色渐变底
        const bg = ctx.createRadialGradient(cx, cy - nodeRDraw * 0.2, 0, cx, cy, nodeRDraw);
        bg.addColorStop(0, this.lightenColor(realm.color, 30));
        bg.addColorStop(1, realm.color);
        ctx.fillStyle = bg;
        ctx.fill();
      }

      // 边框 + 发光
      ctx.beginPath();
      ctx.arc(cx, cy, nodeRDraw, 0, Math.PI * 2);
      if (isActive) {
        const pulse = 12 + Math.sin((this.animTime || 0) * 3) * 4;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = pulse;
      } else if (isCompleted) {
        ctx.strokeStyle = Theme.colors.accent.green;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = Theme.colors.accent.green;
        ctx.shadowBlur = 10;
      } else {
        ctx.strokeStyle = 'rgba(6,78,59,0.20)';
        ctx.lineWidth = 2;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 锁定图标
      if (!isUnlocked) {
        ctx.font = `${nodeR * 0.6}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔒', cx, cy);
      }

      // 完成星星
      if (isCompleted) {
        ctx.font = `${nodeR * 0.35}px sans-serif`;
        ctx.fillText('⭐', cx + nodeRDraw * 0.55, cy - nodeRDraw * 0.55);
      }

      ctx.restore();

      // 文字标签
      ctx.save();
      const labelY = cy + nodeR + 10;
      ctx.font = `bold 12px ${Theme.fonts.primary}`;
      ctx.fillStyle = isActive ? '#92400e' : Theme.colors.text.primary;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      const pillW = ctx.measureText(realm.name).width + 24;
      const pillH = 22;
      const pillX = cx - pillW / 2;
      ctx.fillStyle = isActive ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.70)';
      this.roundRect(ctx, pillX, labelY, pillW, pillH, 11);
      ctx.fill();
      ctx.strokeStyle = isActive ? 'rgba(251,191,36,0.40)' : 'rgba(6,78,59,0.12)';
      ctx.lineWidth = 1;
      this.roundRect(ctx, pillX, labelY, pillW, pillH, 11);
      ctx.stroke();

      ctx.fillStyle = isActive ? '#92400e' : Theme.colors.text.primary;
      ctx.fillText(realm.name, cx, labelY + 4);

      // 进度标签
      const progY = labelY + pillH + 4;
      if (isCompleted) {
        ctx.font = `bold 10px ${Theme.fonts.primary}`;
        ctx.fillStyle = Theme.colors.accent.green;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(`✅ ${completedInRealm}/${totalInRealm}`, cx, progY);
      } else if (isActive) {
        const pct = totalInRealm > 0 ? Math.round((completedInRealm / totalInRealm) * 100) : 0;
        const progText = `修行中 ${pct}%`;
        ctx.font = `bold 10px ${Theme.fonts.primary}`;
        const progPillW = ctx.measureText(progText).width + 16;
        ctx.fillStyle = 'rgba(251,191,36,0.12)';
        this.roundRect(ctx, cx - progPillW / 2, progY, progPillW, 16, 8);
        ctx.fill();
        ctx.strokeStyle = 'rgba(251,191,36,0.30)';
        ctx.lineWidth = 1;
        this.roundRect(ctx, cx - progPillW / 2, progY, progPillW, 16, 8);
        ctx.stroke();
        ctx.fillStyle = '#92400e';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(progText, cx, progY + 2);
      } else {
        ctx.font = `bold 10px ${Theme.fonts.primary}`;
        ctx.fillStyle = 'rgba(6,78,59,0.30)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('🔒 未解锁', cx, progY);
      }
      ctx.restore();

      // 点击热区
      if (isUnlocked) {
        this.addButton(cx - nodeR, cy - nodeR, nodeR * 2, nodeR * 2 + 30, '', 'transparent', () => {
          this.selectedRealm = realm;
          this.view = 'stages';
          this.scrollY = 0;
        });
      }
    }
  }

  /** 关卡网格 — 灵叶节点 */
  renderStages(ctx, w, h, onBack) {
    const realm = this.selectedRealm;
    if (!realm) return;

    this.drawBackButton(ctx, 10, 10, onBack);

    // 境界信息卡
    const panelY = 60;
    this.drawGlassPanel(ctx, 16, panelY, w - 32, 70, {
      border: realm.color,
      accentColor: realm.color,
    });
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(realm.icon, 30, panelY + 38);
    ctx.font = `bold ${Theme.fonts.sizes.body}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.green;
    ctx.fillText(realm.name, 66, panelY + 28);
    ctx.font = `${Theme.fonts.sizes.small}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.secondary;
    ctx.fillText(realm.desc, 66, panelY + 50);

    const totalStages = realm.endStage - realm.startStage + 1;
    const nodeSize = Math.min(64, (w - 48) / 4);
    const gap = 14;
    const cols = Math.min(4, totalStages);
    const rows = Math.ceil(totalStages / cols);
    const startY = panelY + 84;
    const maxScroll = Math.max(0, rows * (nodeSize + gap + 6) - (h - startY - 30));
    this.maxScrollY = maxScroll;

    const maxCompleted = this._getMaxCompleted();

    for (let i = 0; i < totalStages; i++) {
      const stageNum = realm.startStage + i;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const itemsInRow = Math.min(cols, totalStages - row * cols);
      const rowW = itemsInRow * nodeSize + (itemsInRow - 1) * gap;
      const rowStartX = (w - rowW) / 2;
      const x = rowStartX + col * (nodeSize + gap);
      const y = startY + row * (nodeSize + gap + 6) - this.scrollY;

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

  /** 灵叶关卡节点 */
  drawLeafNode(ctx, x, y, size, opts) {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const r = size / 2 - 2;

    ctx.save();
    if (opts.isLocked) ctx.globalAlpha = 0.35;

    // 当前关光晕
    if (opts.isCurrent) {
      ctx.globalAlpha = 1;
      ctx.shadowColor = opts.realmColor || Theme.colors.accent.green;
      ctx.shadowBlur = 16;
      ctx.strokeStyle = opts.realmColor || Theme.colors.accent.green;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 节点底 — 翡翠绿渐变
    const bg = ctx.createRadialGradient(cx, cy - r * 0.2, r * 0.1, cx, cy, r);
    bg.addColorStop(0, '#d1fae5');
    bg.addColorStop(1, '#a7f3d0');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // 边框
    ctx.lineWidth = 2.5;
    if (opts.isCompleted) {
      ctx.strokeStyle = Theme.colors.accent.green;
      ctx.shadowColor = Theme.colors.accent.green;
      ctx.shadowBlur = 8;
    } else if (opts.isCurrent) {
      ctx.strokeStyle = opts.realmColor || '#059669';
    } else if (opts.isLocked) {
      ctx.strokeStyle = 'rgba(6,78,59,0.12)';
    } else {
      ctx.strokeStyle = 'rgba(5,150,105,0.40)';
    }
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 叶子 + 关卡号
    ctx.font = `${size * 0.32}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍃', cx, cy - size * 0.12);

    ctx.font = `bold ${size * 0.24}px ${Theme.fonts.primary}`;
    ctx.fillStyle = opts.isCompleted ? Theme.colors.text.green : Theme.colors.text.primary;
    ctx.fillText(`${opts.index}`, cx, cy + size * 0.18);

    if (opts.isCompleted) {
      ctx.font = `${size * 0.2}px sans-serif`;
      ctx.fillText('⭐', cx + r * 0.55, cy - r * 0.55);
    }

    ctx.restore();
  }

  /** 装饰云雾 — 仙气飘飘效果 */
  _drawMistClouds(ctx, w, h) {
    ctx.save();
    const t = this.animTime || 0;

    // 左上云雾
    const lx = w * 0.05 + Math.sin(t * 0.3) * 8;
    const ly = h * 0.12;
    const lGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, w * 0.35);
    lGrad.addColorStop(0, 'rgba(255,255,255,0.28)');
    lGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = lGrad;
    ctx.beginPath();
    ctx.arc(lx, ly, w * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // 右侧云雾
    const rx = w * 0.95 + Math.cos(t * 0.25) * 10;
    const ry = h * 0.42;
    const rGrad = ctx.createRadialGradient(rx, ry, 0, rx, ry, w * 0.4);
    rGrad.addColorStop(0, 'rgba(255,255,255,0.22)');
    rGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rGrad;
    ctx.beginPath();
    ctx.arc(rx, ry, w * 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
