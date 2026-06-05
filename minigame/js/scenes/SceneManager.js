/**
 * Scene Manager - 场景管理器（带淡入淡出）
 */
export class SceneManager {
  constructor() {
    this.scenes = {};
    this.currentScene = null;
    this.fadeAlpha = 1;
    this.fadeDir = 0; // 0=none, 1=fading out, -1=fading in
    this.nextScene = null;
    this.nextParams = {};
  }

  register(name, scene) {
    this.scenes[name] = scene;
    scene.manager = this;
  }

  switchTo(name, params = {}) {
    const next = this.scenes[name];
    if (!next) return;
    if (next === this.currentScene) {
      next.onEnter(params);
      return;
    }
    this.currentScene?.onLeave?.();
    this.nextScene = next;
    this.nextParams = params;
    this.fadeDir = 1; // 开始淡出
    this.fadeAlpha = 1;
  }

  update(dt) {
    if (this.fadeDir === 1) {
      this.fadeAlpha -= dt * 4;
      if (this.fadeAlpha <= 0) {
        this.fadeAlpha = 0;
        this.currentScene = this.nextScene;
        this.currentScene.onEnter(this.nextParams);
        this.fadeDir = -1; // 开始淡入
      }
    } else if (this.fadeDir === -1) {
      this.fadeAlpha += dt * 4;
      if (this.fadeAlpha >= 1) {
        this.fadeAlpha = 1;
        this.fadeDir = 0;
      }
    }
    this.currentScene?.update(dt);
  }

  render(ctx, w, h) {
    this.currentScene?.render(ctx, w, h);

    // 淡入淡出遮罩
    if (this.fadeDir !== 0) {
      ctx.save();
      const alpha = 1 - this.fadeAlpha;
      ctx.fillStyle = `rgba(26,26,46,${alpha})`;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }
  }

  onTouchStart(x, y) {
    if (this.fadeDir !== 0) return;
    this.currentScene?.onTouchStart(x, y);
  }

  onTouchMove(x, y) {
    if (this.fadeDir !== 0) return;
    this.currentScene?.onTouchMove(x, y);
  }

  onTouchEnd(x, y) {
    if (this.fadeDir !== 0) return;
    this.currentScene?.onTouchEnd(x, y);
  }
}
