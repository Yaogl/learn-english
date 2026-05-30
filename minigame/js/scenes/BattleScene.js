import { BaseScene } from './BaseScene';
import { Theme } from '../theme.js';

export class BattleScene extends BaseScene {
  constructor() {
    super();
    this.battleState = 'lobby';
    this.matchTimer = 0;
    this.opponent = null;
    this.playerScore = 0;
  }

  onEnter() {
    super.onEnter();
    this.battleState = 'lobby';
    this.opponent = null;
    this.playerScore = 0;
  }

  update(dt) {
    super.update(dt);
    if (this.battleState === 'matching') {
      this.matchTimer -= dt;
      if (this.matchTimer <= 0) {
        this.battleState = 'result';
        this.opponent = {
          name: '小明',
          avatar: '👦',
          words: Math.floor(Math.random() * 10) + 5,
        };
      }
    }
  }

  render(ctx, w, h) {
    // 仙气背景 - 对战专用
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#EDE7F6');      // 浅紫仙气
    bg.addColorStop(0.5, '#D1C4E9');    // 中紫
    bg.addColorStop(1, '#B39DDB');      // 深紫
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // 云雾装饰
    this.drawCloudMist(ctx, w, h);

    // 修仙风格标题
    this.drawTitle(ctx, '好友对战', w / 2, 45, 22, Theme.colors.text.primary);

    this.buttons = [];
    this.drawBackButton(ctx, 10, 10, () => {
      this.manager.switchTo('mainMenu');
    });

    if (this.battleState === 'lobby') {
      this.renderLobby(ctx, w, h);
    } else if (this.battleState === 'matching') {
      this.renderMatching(ctx, w, h);
    } else if (this.battleState === 'result') {
      this.renderResult(ctx, w, h);
    }

    this.renderButtons(ctx);
  }

  renderLobby(ctx, w, h) {
    const cardW = w * 0.85;
    const cardH = 200;
    const cardX = (w - cardW) / 2;
    const cardY = h * 0.22;

    // 灵气卡片
    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: '#9C27B0',
      glow: '#9C27B0',
    });

    // 对战图标 - 灵气光效
    this.drawSpiritGlow(ctx, w / 2, cardY + 80, 25, '#9C27B0', 1.2);

    ctx.font = '60px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚔️', w / 2, cardY + 80);

    ctx.font = `18px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.fillText('邀请好友一起学英语', w / 2, cardY + 120);

    ctx.font = `13px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.muted;
    ctx.fillText('比比谁记单词更快', w / 2, cardY + 145);

    this.addButton(w / 2 - 70, cardY + cardH + 25, 140, 44, '开始匹配', '#9C27B0', () => {
      this.battleState = 'matching';
      this.matchTimer = 3;
    });
  }

  renderMatching(ctx, w, h) {
    const dots = '.'.repeat(Math.floor(Date.now() / 500) % 4);
    this.drawTitle(ctx, `匹配中${dots}`, w / 2, h * 0.4, 20, '#9C27B0');

    // 灵气光效动画
    const t = this.animTime || 0;
    const pulse = 0.5 + Math.sin(t * 3) * 0.5;
    this.drawSpiritGlow(ctx, w / 2, h * 0.45, 30, '#9C27B0', pulse);

    this.drawSubTitle(ctx, '正在寻找对手...', w / 2, h * 0.45);
  }

  renderResult(ctx, w, h) {
    if (!this.opponent) return;

    const cardW = w * 0.85;
    const cardH = 300;
    const cardX = (w - cardW) / 2;
    const cardY = h * 0.18;

    // 灵气卡片
    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: '#9C27B0',
      glow: '#9C27B0',
    });

    this.drawTitle(ctx, '对战结果', w / 2, cardY + 35, 20, Theme.colors.text.primary);

    const vsY = cardY + 80;

    // 玩家
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🧑', w / 4, vsY);
    ctx.font = `13px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.fillText('我', w / 4, vsY + 28);
    ctx.font = `bold 28px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#4CAF50';
    ctx.fillText(`${this.playerScore}`, w / 4, vsY + 60);

    // VS 灵气光效
    this.drawSpiritGlow(ctx, w / 2, vsY + 25, 15, '#9C27B0', 0.8);
    this.drawTitle(ctx, 'VS', w / 2, vsY + 25, 16, Theme.colors.text.muted);

    // 对手
    ctx.font = '36px sans-serif';
    ctx.fillText(this.opponent.avatar, w * 3 / 4, vsY);
    ctx.font = `13px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.fillText(this.opponent.name, w * 3 / 4, vsY + 28);
    ctx.font = `bold 28px ${Theme.fonts.primary}`;
    ctx.fillStyle = '#FF6B6B';
    ctx.fillText(`${this.opponent.words}`, w * 3 / 4, vsY + 60);

    // 结果
    const isWin = this.playerScore >= this.opponent.words;
    this.drawTitle(ctx, isWin ? '你赢了！' : '再接再厉！', w / 2, cardY + cardH - 65, 22,
      isWin ? '#4CAF50' : '#FF6B6B');

    this.buttons = [];
    this.addButton(w / 2 - 60, cardY + cardH - 45, 120, 38, '再来一局', '#9C27B0', () => {
      this.battleState = 'lobby';
      this.opponent = null;
    });

    this.drawBackButton(ctx, 10, 10, () => {
      this.manager.switchTo('mainMenu');
    });
  }
}
