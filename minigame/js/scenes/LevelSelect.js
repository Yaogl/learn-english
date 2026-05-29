import { BaseScene } from './BaseScene';
import { GameData } from '../data/GameData';
import { CultivationSystem } from '../data/CultivationSystem';

export class LevelSelect extends BaseScene {
  constructor() {
    super();
    this.source = 'textbook';
    this.selectedGrade = 0;
    this.selectedSemester = 0;
    this.completedStages = 0;
    this.view = 'realms';
    this.selectedRealm = -1;
  }

  onEnter(params) {
    super.onEnter(params);
    this.source = params?.source || 'textbook';
    this.selectedGrade = 0;
    this.selectedSemester = 0;
    this.completedStages = this.loadCompletedStages();
    this.view = 'realms';
    this.selectedRealm = -1;
  }

  loadCompletedStages() {
    try {
      const data = wx.getStorageSync('completed_stages');
      return data ? JSON.parse(data).length : 0;
    } catch (e) {
      return 0;
    }
  }

  render(ctx, w, h) {
    this.drawSkyBackground(ctx, w, h);

    this.buttons = [];
    this.addButton(10, 10, 60, 30, '← 返回', 'rgba(0,0,0,0.3)', () => {
      if (this.view === 'stages') {
        this.view = 'grades';
      } else if (this.view === 'grades') {
        this.view = 'realms';
      } else {
        this.manager.switchTo('mainMenu');
      }
    });

    if (this.view === 'realms') {
      this.renderRealms(ctx, w, h);
    } else if (this.view === 'grades') {
      this.renderGrades(ctx, w, h);
    } else if (this.view === 'stages') {
      this.renderStages(ctx, w, h);
    }

    this.renderButtons(ctx);
  }

  renderRealms(ctx, w, h) {
    this.drawTitle(ctx, '修炼境界', w / 2, 45, 22, '#5D4037');

    const realm = CultivationSystem.getCurrentRealm(this.completedStages);
    // 进度条
    const barY = 62;
    const barW = w - 60;
    const barH = 10;
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    this.roundRect(ctx, 30, barY, barW, barH, 5);
    ctx.fill();

    const progress = realm.progress;
    ctx.fillStyle = realm.realm.color;
    this.roundRect(ctx, 30, barY, barW * progress, barH, 5);
    ctx.fill();

    ctx.font = 'bold 12px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#666';
    ctx.textAlign = 'center';
    ctx.fillText(CultivationSystem.getFullLabel(this.completedStages), w / 2, barY + 22);

    const realms = CultivationSystem.getRealms();
    const startY = 95;
    const itemH = 58;
    const cardW = w - 40;

    realms.forEach((r, i) => {
      const y = startY + i * (itemH + 8);
      if (y > h - 20) return;

      const isUnlocked = this.completedStages >= CultivationSystem.getTotalStagesForRealm(i) - r.maxStage;
      const isCurrent = realm.realm.id === r.id;

      ctx.save();
      if (!isUnlocked) ctx.globalAlpha = 0.4;

      this.drawMenuCard(ctx, 20, y, cardW, itemH, {
        bgTop: '#fff',
        bgBottom: isCurrent ? r.color + '15' : '#f9f9f9',
        border: isCurrent ? r.color : '#E8E8E8',
        accentColor: isUnlocked ? r.color : '#ccc',
      });

      // Icon
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isUnlocked ? r.icon : '🔒', 48, y + itemH / 2 + 4);

      // Name
      ctx.font = 'bold 15px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = isUnlocked ? '#333' : '#aaa';
      ctx.textAlign = 'left';
      ctx.fillText(r.name, 78, y + 22);

      // Desc
      ctx.font = '12px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(r.desc, 78, y + 42);

      if (isUnlocked) {
        const completed = Math.max(0, this.completedStages - (CultivationSystem.getTotalStagesForRealm(i) - r.maxStage));
        ctx.font = '12px "Microsoft YaHei", sans-serif';
        ctx.fillStyle = r.color;
        ctx.textAlign = 'right';
        ctx.fillText(`${Math.min(completed, r.maxStage)}/${r.maxStage}`, cardW + 10, y + 22);
      }

      ctx.restore();

      if (isUnlocked) {
        this.addButton(20, y, cardW, itemH, '', 'transparent', () => {
          this.selectedRealm = i;
          this.view = 'grades';
        });
      }
    });
  }

  renderGrades(ctx, w, h) {
    const realm = CultivationSystem.getRealmByIndex(this.selectedRealm);
    this.drawTitle(ctx, `${realm.name} · 选择课本`, w / 2, 45, 20, '#5D4037');

    const grades = GameData.getGrades();
    const startY = 75;
    const cardW = w - 40;
    const cardH = 65;

    grades.forEach((grade, i) => {
      const y = startY + i * (cardH + 12);

      this.drawMenuCard(ctx, 20, y, cardW, cardH, {
        bgTop: '#fff',
        bgBottom: '#f5f5f5',
        border: '#E8E8E8',
        accentColor: realm.color,
      });

      ctx.font = 'bold 16px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'left';
      ctx.fillText(grade.label, 40, y + 30);

      ctx.font = '12px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      ctx.fillText(`${grade.semesters || 2}个学期`, 40, y + 50);

      ctx.fillStyle = realm.color;
      ctx.textAlign = 'right';
      ctx.fillText('→', cardW + 10, y + 35);

      this.addButton(20, y, cardW, cardH, '', 'transparent', () => {
        this.selectedGrade = i;
        this.view = 'stages';
      });
    });
  }

  renderStages(ctx, w, h) {
    const realm = CultivationSystem.getRealmByIndex(this.selectedRealm);
    const grade = GameData.getGrades()[this.selectedGrade];
    this.drawTitle(ctx, `${realm.name} · ${grade.label}`, w / 2, 40, 18, '#5D4037');

    // 学期选择
    const semY = 58;
    const semW = (w - 60) / 2;
    for (let s = 0; s < 2; s++) {
      const x = 20 + s * (semW + 20);
      const selected = this.selectedSemester === s;

      ctx.fillStyle = selected ? realm.color + '25' : '#fff';
      this.roundRect(ctx, x, semY, semW, 32, 8);
      ctx.fill();
      ctx.strokeStyle = selected ? realm.color : '#ddd';
      ctx.lineWidth = 1.5;
      this.roundRect(ctx, x, semY, semW, 32, 8);
      ctx.stroke();

      ctx.font = 'bold 13px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = selected ? realm.color : '#666';
      ctx.textAlign = 'center';
      ctx.fillText(s === 0 ? '上学期' : '下学期', x + semW / 2, semY + 20);

      this.addButton(x, semY, semW, 32, '', 'transparent', () => {
        this.selectedSemester = s;
      });
    }

    // 单元关卡
    const unitStartY = 100;
    const unitCount = GameData.getUnitCount(grade.id, this.selectedSemester + 1);
    const cols = 3;
    const cellW = (w - 50) / cols;
    const cellH = 80;

    for (let i = 0; i < unitCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = 20 + col * (cellW + 5);
      const y = unitStartY + row * (cellH + 10);

      this.drawMenuCard(ctx, x, y, cellW, cellH, {
        bgTop: '#fff',
        bgBottom: '#fafafa',
        border: '#E8E8E8',
        accentColor: realm.color,
      });

      ctx.font = 'bold 14px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(`第${i + 1}单元`, x + cellW / 2, y + 30);

      ctx.font = '12px "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#999';
      const words = GameData.getUnitWords(grade.id, this.selectedSemester + 1, i + 1);
      const stageCount = words ? Math.min(Math.ceil(words.length / 2), 15) : 5;
      ctx.fillText(`${stageCount}关`, x + cellW / 2, y + 50);

      this.addButton(x, y, cellW, cellH, '', 'transparent', () => {
        this.manager.switchTo('game', {
          grade: grade.id,
          semester: this.selectedSemester + 1,
          unit: i + 1,
          stage: 1,
        });
      });
    }
  }
}
