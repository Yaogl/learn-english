---
name: minigame-xianxia-ui
description: >-
  滢滢知语微信小游戏 Canvas UI 样式规范。用于 minigame 目录下的页面美化、主题调整、
  修仙卡通风视觉升级。触发词：minigame、小游戏、Canvas 样式、theme.js、BaseScene、
  修仙风、卡通风、Q版仙侠、境界选择、闯关界面。
---

# Minigame Q版仙侠 Canvas UI

## 技术栈约束

- **渲染**：微信小游戏 Canvas 2D（`wx.createCanvas()`），无 DOM/CSS
- **样式入口**：`minigame/js/theme.js`（配色 token）+ `minigame/js/scenes/BaseScene.js`（公共绘制）
- **场景**：各 `*Scene.js` / `MainMenu.js` / `LevelSelect.js` 继承 BaseScene
- **禁止**：引入 CSS、DOM 库、Web 字体 CDN（仅用系统字体栈）

## 美学方向：Q版仙侠 · 水墨天色

| 元素 | 规范 |
|------|------|
| 背景 | 水墨天色渐变 `#dce9f8 → #f5f0e8 → #fff0d4` + 远山剪影 + Q版祥云 |
| 按钮 | 3D 卡通：底部阴影层 + 墨棕描边 + 顶部高光 |
| 卡片 | 宣纸色面板 + 四角金丹装饰点 + `Theme.colors.outline` 描边 |
| 主色 | 玉色 `#28a86e`、金丹 `#f0b429`、灵气紫 `#9b7fd4` |
| 文字 | 水墨棕 `#3d2f1a`，背景图标题用 `Theme.colors.text.forest` |
| 粒子 | 花瓣 + 灵气十字星混合飘落 |

## 修改优先级（最小扩散）

1. **改 token** → `theme.js`（颜色/圆角/阴影/卡通参数）
2. **改组件** → `BaseScene.js`（`drawGlassPanel`、`renderButtons`、`drawPageBackground`、`drawSpiritTile` 等）
3. **改页面** → 仅当页面有自定义绘制逻辑时动 `*Scene.js`
4. **禁止硬编码色值** → 统一用 `Theme.colors.*`

## 关键 API（BaseScene）

```js
drawPageBackground(ctx, w, h)      // 无图页面背景
drawImageBackground(ctx, w, h, img) // 有背景图 + 统一蒙层
drawGlassPanel(ctx, x, y, w, h, opts)
drawCartoonDepth / _drawCartoonDepth  // 3D 底部阴影
drawSpiritTile(ctx, x, y, size, opts) // 六边形字母块
drawPageHeader(ctx, w, title, onBack, opts)
drawTitle(ctx, text, x, y, size, 'gradient')
```

## 场景文件职责

| 文件 | 背景策略 |
|------|----------|
| `MainMenu.js` | `mainParallaxBg.jpg` + 自定义粒子/按钮 |
| `LevelSelect.js` | `storyForestBg.jpg` / `celestialLandscapeBg.jpg` |
| `GameScene.js` | 多状态（story/memory/playing）各自背景 |
| `ErrorBookScene.js` / `ParentScene.js` | `drawImageBackground` + `storyForestBg.png` |
| `RankScene.js` | `drawPageBackground` |

## 样式升级工作流

1. 读 `theme.js` 确认当前 token
2. 读 `BaseScene.js` 确认公共组件是否覆盖需求
3. 先改 theme + BaseScene，预览全页面继承效果
4. 再逐个场景清理硬编码色（搜 `#3D6B4F`、`#059669`、`#FFF9E8`、`rgba(6,78,59`）
5. 微信开发者工具预览：首页 → 境界 → 闯关 → 排行榜

## 反模式

- ❌ 毛玻璃半透明叠多层（性能差、风格糊）
- ❌ 每个 Scene 复制背景绘制逻辑（用 `drawImageBackground`）
- ❌ 纯扁平按钮无描边（不符合卡通风）
- ❌ 紫色渐变白底（generic AI 审美）

## 参考对齐

Web 原型组件在 `yingyingzhiyu/滢滢知语app/src/components/`（RealmSelection、RankingBoard），Canvas 版应对齐其信息架构而非像素级复制。
