import { SceneManager } from './js/scenes/SceneManager';
import { MainMenu } from './js/scenes/MainMenu';
import { GameScene } from './js/scenes/GameScene';
import { LevelSelect } from './js/scenes/LevelSelect';
import { ErrorBookScene } from './js/scenes/ErrorBookScene';
import { RankScene } from './js/scenes/RankScene';
import { BattleScene } from './js/scenes/BattleScene';
import { ParentScene } from './js/scenes/ParentScene';
import { CloudService } from './js/services/CloudService';

// 初始化云开发
CloudService.init();

const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;

const sceneManager = new SceneManager();
sceneManager.register('mainMenu', new MainMenu());
sceneManager.register('levels', new LevelSelect());
sceneManager.register('game', new GameScene());
sceneManager.register('errorbook', new ErrorBookScene());
sceneManager.register('rank', new RankScene());
sceneManager.register('battle', new BattleScene());
sceneManager.register('parent', new ParentScene());

sceneManager.switchTo('mainMenu');

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

// 触摸事件
canvas.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  sceneManager.onTouchStart(touch.clientX, touch.clientY);
});

canvas.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  sceneManager.onTouchMove(touch.clientX, touch.clientY);
});

canvas.addEventListener('touchend', (e) => {
  const touch = e.changedTouches[0];
  sceneManager.onTouchEnd(touch.clientX, touch.clientY);
});

gameLoop();
