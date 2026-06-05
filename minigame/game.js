import { SceneManager } from './js/scenes/SceneManager';
import { MainMenu } from './js/scenes/MainMenu';
import { GameScene } from './js/scenes/GameScene';
import { LevelSelect } from './js/scenes/LevelSelect';
import { ErrorBookScene } from './js/scenes/ErrorBookScene';
import { RankScene } from './js/scenes/RankScene';
import { BattleScene } from './js/scenes/BattleScene';
import { ParentScene } from './js/scenes/ParentScene';
import { CloudService } from './js/services/CloudService';
import { getShareConfig, parseLaunchQuery } from './js/services/ShareBridge.js';
import { initAudio, playGameBgm } from './js/services/AudioService';

// 初始化云开发
CloudService.init();

// 初始化音频
initAudio();

// 进入小程序即开始播放背景音乐，全程循环
playGameBgm();

// 分享菜单与转发卡片
if (typeof wx.showShareMenu === 'function') {
  wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
}
wx.onShareAppMessage(() => {
  const share = getShareConfig();
  return {
    title: share.title,
    query: share.query,
  };
});

function handleBattleInvite(query) {
  const params = parseLaunchQuery(query);
  if (!params.roomId || params.from !== 'battle') return;

  const battleScene = sceneManager.scenes?.battle;
  if (battleScene?.roomId === params.roomId && battleScene?.battleState === 'waiting') {
    return;
  }

  sceneManager.switchTo('battle', { roomId: params.roomId, role: 'joiner' });
}

const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');

// 高清适配：获取设备像素比，设置 canvas 物理分辨率
const sysInfo = wx.getSystemInfoSync();
const dpr = sysInfo.pixelRatio || 2;
const W = sysInfo.windowWidth;
const H = sysInfo.windowHeight;
// 设置 canvas 物理像素尺寸（高清）
canvas.width = W * dpr;
canvas.height = H * dpr;
// 缩放上下文，使逻辑坐标与物理像素对齐
ctx.scale(dpr, dpr);

const sceneManager = new SceneManager();
sceneManager.register('mainMenu', new MainMenu());
sceneManager.register('levels', new LevelSelect());
sceneManager.register('game', new GameScene());
sceneManager.register('errorbook', new ErrorBookScene());
sceneManager.register('rank', new RankScene());
sceneManager.register('battle', new BattleScene());
sceneManager.register('parent', new ParentScene());

sceneManager.switchTo('mainMenu');

const launchOpts = wx.getLaunchOptionsSync?.() || {};
handleBattleInvite(launchOpts.query);

wx.onShow((res) => {
  handleBattleInvite(res?.query);
});

let lastTime = Date.now();

function gameLoop() {
  const now = Date.now();
  const dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  sceneManager.update(dt);
  ctx.clearRect(0, 0, W, H);
  sceneManager.render(ctx, W, H);

  requestAnimationFrame(gameLoop);
}

function getTouchXY(touch) {
  return {
    x: touch.clientX ?? touch.x ?? 0,
    y: touch.clientY ?? touch.y ?? 0,
  };
}

// 触摸事件（真机须用 wx.onTouch*，canvas.addEventListener 仅开发者工具可用）
wx.onTouchStart((e) => {
  const touch = e.touches[0];
  if (!touch) return;
  const { x, y } = getTouchXY(touch);
  sceneManager.onTouchStart(x, y);
});

wx.onTouchMove((e) => {
  const touch = e.touches[0];
  if (!touch) return;
  const { x, y } = getTouchXY(touch);
  sceneManager.onTouchMove(x, y);
});

wx.onTouchEnd((e) => {
  const touch = e.changedTouches[0];
  if (!touch) return;
  const { x, y } = getTouchXY(touch);
  sceneManager.onTouchEnd(x, y);
});

gameLoop();
