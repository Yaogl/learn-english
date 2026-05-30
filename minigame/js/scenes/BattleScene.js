import { BaseScene } from './BaseScene';
import { Theme } from '../theme.js';
import { CloudService } from '../services/CloudService.js';
import { setShareConfig, resetShareConfig } from '../services/ShareBridge.js';

/**
 * 好友对战 — 邀请好友分享 PK（非随机匹配）
 */
export class BattleScene extends BaseScene {
  constructor() {
    super();
    this.battleState = 'lobby';
    this.roomId = '';
    this.role = 'creator';
    this.words = [];
    this.wordIndex = 0;
    this.myScore = 0;
    this.opponentScore = 0;
    this.opponentName = '好友';
    this.pollTimer = 0;
    this.playTimer = 90;
    this.statusHint = '';
    this.isCreator = true;
  }

  onEnter(params = {}) {
    super.onEnter(params);
    this.pollTimer = 0;

    if (params.roomId && params.role === 'joiner') {
      this.roomId = params.roomId;
      this.role = 'joiner';
      this.isCreator = false;
      this.battleState = 'joinConfirm';
      this.statusHint = '';
      return;
    }

    this.battleState = 'lobby';
    this.roomId = '';
    this.role = 'creator';
    this.isCreator = true;
    this.words = [];
    this.wordIndex = 0;
    this.myScore = 0;
    this.opponentScore = 0;
    this.statusHint = '';
    resetShareConfig();
  }

  onLeave() {
    resetShareConfig();
  }

  update(dt) {
    super.update(dt);

    if (this.battleState === 'playing') {
      this.playTimer -= dt;
      if (this.playTimer <= 0 && this.wordIndex < this.words.length) {
        this.finishWord();
      }
    }

    if (['waiting', 'playing', 'waitingResult'].includes(this.battleState) && this.roomId) {
      this.pollTimer -= dt;
      if (this.pollTimer <= 0) {
        this.pollTimer = 2;
        this.pollRoomStatus();
      }
    }
  }

  /** 创建房间并进入等待页 */
  async createInviteRoom() {
    wx.showLoading({ title: '创建房间...' });
    let roomId = null;

    if (CloudService.isAvailable()) {
      roomId = await CloudService.createBattleRoom();
    }

    wx.hideLoading();

    if (!roomId) {
      roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
      this.statusHint = CloudService.isAvailable() ? '创建失败，请重试' : '未连接云开发，分享后好友可能无法加入';
    } else {
      this.statusHint = '';
    }

    this.roomId = roomId;
    this.role = 'creator';
    this.isCreator = true;
    this.battleState = 'waiting';
    this.setupShare();
  }

  setupShare() {
    const query = `roomId=${this.roomId}&from=battle`;
    setShareConfig({
      title: `来和我一起拼单词 PK！房间号 ${this.roomId}`,
      query,
    });
  }

  /** 主动唤起分享给好友 */
  shareToFriend() {
    if (!this.roomId) return;
    this.setupShare();
    const query = `roomId=${this.roomId}&from=battle`;
    if (typeof wx.shareAppMessage === 'function') {
      wx.shareAppMessage({
        title: `来和我一起拼单词 PK！房间号 ${this.roomId}`,
        query,
      });
      return;
    }
    wx.showModal({
      title: '邀请好友',
      content: `点击右上角「···」，选择「转发」分享给好友\n房间号：${this.roomId}`,
      showCancel: false,
    });
  }

  /** 好友接受挑战 */
  async acceptInvite() {
    wx.showLoading({ title: '加入房间...' });
    const res = await CloudService.joinBattleRoom(this.roomId);
    wx.hideLoading();

    if (res?.error) {
      wx.showToast({ title: res.error, icon: 'none' });
      return;
    }

    this.words = res.words || CloudService.generateBattleWords();
    this.role = 'joiner';
    this.isCreator = false;
    this.battleState = 'playing';
    this.wordIndex = 0;
    this.myScore = 0;
    this.opponentScore = 0;
    this.playTimer = 90;
    this.pollTimer = 0;
  }

  async pollRoomStatus() {
    const room = await CloudService.getBattleRoomStatus(this.roomId);
    if (!room) return;

    const oppScore = this.isCreator ? (room.joinerScore || 0) : (room.creatorScore || 0);
    this.opponentScore = oppScore;

    if (this.battleState === 'waiting' && (room.status === 'ready' || room.status === 'playing')) {
      this.words = room.words || CloudService.generateBattleWords();
      this.battleState = 'playing';
      this.wordIndex = 0;
      this.myScore = room.creatorScore || 0;
      this.playTimer = 90;
    }

    if (this.battleState === 'playing' || this.battleState === 'waitingResult') {
      if (room.status === 'finished') {
        this.myScore = this.isCreator ? (room.creatorScore || 0) : (room.joinerScore || 0);
        this.opponentScore = this.isCreator ? (room.joinerScore || 0) : (room.creatorScore || 0);
        this.battleState = 'result';
      } else if (this.battleState === 'waitingResult' && this.wordIndex >= this.words.length) {
        const myField = this.isCreator ? room.creatorScore : room.joinerScore;
        const oppField = this.isCreator ? room.joinerScore : room.creatorScore;
        if ((myField || 0) >= this.words.length && (oppField || 0) >= this.words.length) {
          this.myScore = myField || 0;
          this.opponentScore = oppField || 0;
          this.battleState = 'result';
        }
      }
    }
  }

  async finishWord() {
    this.wordIndex += 1;
    this.myScore = this.wordIndex;
    await CloudService.updateBattleProgress(this.roomId, this.myScore);

    if (this.wordIndex >= this.words.length) {
      this.battleState = 'waitingResult';
      this.pollTimer = 0;
    } else {
      this.playTimer = 90;
    }
  }

  render(ctx, w, h) {
    this.drawPageBackground(ctx, w, h);
    this.buttons = [];

    const { headerBottom } = this.drawPageHeader(ctx, w, '好友对战', () => {
      resetShareConfig();
      this.manager.switchTo('mainMenu');
    });

    switch (this.battleState) {
      case 'lobby':
        this.renderLobby(ctx, w, h, headerBottom);
        break;
      case 'waiting':
        this.renderWaiting(ctx, w, h, headerBottom);
        break;
      case 'joinConfirm':
        this.renderJoinConfirm(ctx, w, h, headerBottom);
        break;
      case 'playing':
      case 'waitingResult':
        this.renderPlaying(ctx, w, h, headerBottom);
        break;
      case 'result':
        this.renderResult(ctx, w, h, headerBottom);
        break;
      default:
        break;
    }

    this.renderButtons(ctx);
  }

  renderLobby(ctx, w, h, headerBottom) {
    const cardW = w * 0.85;
    const cardH = 210;
    const cardX = (w - cardW) / 2;
    const cardY = headerBottom + Theme.layout.gap.lg;

    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: Theme.colors.button.purple,
      glow: Theme.colors.button.purple,
    });

    this.drawSpiritGlow(ctx, w / 2, cardY + 75, 25, Theme.colors.button.purple, 1.2);

    ctx.font = '56px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚔️', w / 2, cardY + 75);

    ctx.font = `bold ${Theme.fonts.sizes.subtitle}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.fillText('邀请好友一起 PK', w / 2, cardY + 118);

    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.muted;
    ctx.fillText('创建房间后分享给微信好友', w / 2, cardY + 148);
    ctx.fillText('比比谁记单词更快', w / 2, cardY + 170);

    this.addButton(w / 2 - 80, cardY + cardH + 28, 160, 44, '邀请好友 PK', Theme.colors.button.purple, () => {
      this.createInviteRoom();
    });
  }

  renderWaiting(ctx, w, h, headerBottom) {
    const cardW = w * 0.85;
    const cardH = 240;
    const cardX = (w - cardW) / 2;
    const cardY = headerBottom + Theme.layout.gap.lg;

    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: Theme.colors.button.purple,
      glow: Theme.colors.button.purple,
    });

    const pulse = 0.5 + Math.sin((this.animTime || 0) * 3) * 0.5;
    this.drawSpiritGlow(ctx, w / 2, cardY + 70, 20, Theme.colors.button.purple, pulse);

    ctx.font = `bold ${Theme.fonts.sizes.subtitle}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('等待好友加入...', w / 2, cardY + 55);

    ctx.font = `13px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.muted;
    ctx.fillText('分享卡片给好友，好友点击即可加入', w / 2, cardY + 85);

    ctx.font = `bold 36px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.accent.gold;
    ctx.fillText(this.roomId, w / 2, cardY + 130);

    ctx.font = `12px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.secondary;
    ctx.fillText('房间号', w / 2, cardY + 158);

    if (this.statusHint) {
      ctx.fillStyle = Theme.colors.button.danger;
      ctx.fillText(this.statusHint, w / 2, cardY + 182);
    }

    this.addButton(w / 2 - 80, cardY + cardH + 24, 160, 44, '分享给好友', Theme.colors.button.gold, () => {
      this.shareToFriend();
    });
    this.addButton(w / 2 - 60, cardY + cardH + 78, 120, 36, '取消', Theme.colors.button.muted, () => {
      resetShareConfig();
      this.battleState = 'lobby';
      this.roomId = '';
    });
  }

  renderJoinConfirm(ctx, w, h, headerBottom) {
    const cardW = w * 0.85;
    const cardH = 220;
    const cardX = (w - cardW) / 2;
    const cardY = headerBottom + Theme.layout.gap.lg;

    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: Theme.colors.button.gold,
      glow: Theme.colors.button.gold,
    });

    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚔️', w / 2, cardY + 60);

    ctx.font = `bold ${Theme.fonts.sizes.subtitle}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.fillText('好友邀请你 PK！', w / 2, cardY + 105);

    ctx.font = `${Theme.fonts.sizes.caption}px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.muted;
    ctx.fillText(`房间号 ${this.roomId}`, w / 2, cardY + 135);
    ctx.fillText('接受挑战，一起拼速度记单词', w / 2, cardY + 158);

    this.addButton(w / 2 - 80, cardY + cardH + 28, 160, 44, '接受挑战', Theme.colors.button.gold, () => {
      this.acceptInvite();
    });
    this.addButton(w / 2 - 60, cardY + cardH + 82, 120, 36, '暂不', Theme.colors.button.muted, () => {
      this.manager.switchTo('mainMenu');
    });
  }

  renderPlaying(ctx, w, h, headerBottom) {
    const isWaiting = this.battleState === 'waitingResult';
    const currentWord = this.words[this.wordIndex] || '';

    ctx.font = `14px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.secondary;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      isWaiting ? '已完成，等待好友...' : `第 ${Math.min(this.wordIndex + 1, this.words.length)}/${this.words.length} 词`,
      w / 2,
      headerBottom + Theme.layout.gap.md
    );

    const cardW = w * 0.85;
    const cardH = 180;
    const cardX = (w - cardW) / 2;
    const cardY = headerBottom + Theme.layout.gap.lg + 20;

    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: Theme.colors.button.purple,
      glow: Theme.colors.button.purple,
    });

    if (!isWaiting && currentWord) {
      ctx.font = `bold 48px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.primary;
      ctx.fillText(currentWord, w / 2, cardY + 80);

      ctx.font = `13px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText(`剩余 ${Math.ceil(this.playTimer)} 秒`, w / 2, cardY + 130);

      this.addButton(w / 2 - 80, cardY + cardH + 30, 160, 44, '拼对了！', Theme.colors.button.primary, () => {
        this.finishWord();
      });
    } else {
      ctx.font = `16px ${Theme.fonts.primary}`;
      ctx.fillStyle = Theme.colors.text.muted;
      ctx.fillText('等待好友完成...', w / 2, cardY + 90);
    }

    const scoreY = cardY + cardH + (isWaiting ? 40 : 100);
    ctx.font = `bold 22px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.button.primary;
    ctx.fillText(`我 ${this.myScore}`, w / 4, scoreY);

    ctx.fillStyle = Theme.colors.text.muted;
    ctx.font = `16px ${Theme.fonts.primary}`;
    ctx.fillText('VS', w / 2, scoreY);

    ctx.font = `bold 22px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.button.danger;
    ctx.fillText(`好友 ${this.opponentScore}`, w * 3 / 4, scoreY);
  }

  renderResult(ctx, w, h, headerBottom) {
    const cardW = w * 0.85;
    const cardH = 280;
    const cardX = (w - cardW) / 2;
    const cardY = headerBottom + Theme.layout.gap.lg;

    this.drawCard(ctx, cardX, cardY, cardW, cardH, {
      border: Theme.colors.button.purple,
      glow: Theme.colors.button.purple,
    });

    this.drawTitle(ctx, '对战结果', w / 2, cardY + 35, 20, Theme.colors.text.primary);

    const vsY = cardY + 90;
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧑', w / 4, vsY);
    ctx.font = `13px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.fillText('我', w / 4, vsY + 28);
    ctx.font = `bold 28px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.button.primary;
    ctx.fillText(`${this.myScore}`, w / 4, vsY + 58);

    this.drawTitle(ctx, 'VS', w / 2, vsY + 10, 16, Theme.colors.text.muted);

    ctx.font = '36px sans-serif';
    ctx.fillText('👦', w * 3 / 4, vsY);
    ctx.font = `13px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.text.primary;
    ctx.fillText(this.opponentName, w * 3 / 4, vsY + 28);
    ctx.font = `bold 28px ${Theme.fonts.primary}`;
    ctx.fillStyle = Theme.colors.button.danger;
    ctx.fillText(`${this.opponentScore}`, w * 3 / 4, vsY + 58);

    const isWin = this.myScore > this.opponentScore;
    const isDraw = this.myScore === this.opponentScore;
    const resultText = isDraw ? '平局！' : (isWin ? '你赢了！' : '再接再厉！');
    const resultColor = isDraw ? Theme.colors.text.secondary : (isWin ? Theme.colors.button.primary : Theme.colors.button.danger);
    this.drawTitle(ctx, resultText, w / 2, cardY + cardH - 70, 22, resultColor);

    this.addButton(w / 2 - 80, cardY + cardH + 20, 160, 40, '再邀好友', Theme.colors.button.purple, () => {
      this.onEnter({});
      this.createInviteRoom();
    });
    this.addButton(w / 2 - 50, cardY + cardH + 68, 100, 32, '返回', Theme.colors.button.muted, () => {
      resetShareConfig();
      this.manager.switchTo('mainMenu');
    });
  }
}
