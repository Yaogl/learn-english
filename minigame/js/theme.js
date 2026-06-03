/**
 * 主题配置 — Q版仙侠卡通风
 * 水墨天色 · 金丹暖金 · 玉色灵气 · 卡通描边
 */
export const Theme = {
  colors: {
    background: {
      gradient: ['#dce9f8', '#f5f0e8', '#fff0d4'],
      sky: '#dce9f8',
      ground: '#fff0d4',
      overlay: 'rgba(255,240,212,0.35)',
      base: '#f5f0e8',
      fallback: '#fff5e4',
      imageOverlay: 'rgba(255,245,228,0.22)',
    },

    accent: {
      gold: '#f0b429',
      goldDark: '#c8870a',
      goldLight: '#ffe082',
      green: '#28a86e',
      greenLight: '#7ddea8',
      jade: '#3cb178',
      amber: '#f59e0b',
      pink: '#f472b6',
      cyan: '#38bdf8',
      lavender: '#9b7fd4',
      cinnabar: '#e05a4a',
      spirit: '#a78bfa',
    },

    outline: {
      dark: '#4a3728',
      soft: 'rgba(74,55,40,0.25)',
      ink: '#3d2f1a',
    },

    glass: 'rgba(255,252,245,0.72)',

    card: {
      bgTop: 'rgba(255,252,245,0.88)',
      bgBottom: 'rgba(255,245,228,0.78)',
      border: 'rgba(74,55,40,0.18)',
      borderMuted: 'rgba(74,55,40,0.12)',
      shadow: 'rgba(74,55,40,0.10)',
      jade: '#b8d4c0',
      goldTrim: 'rgba(240,180,41,0.55)',
    },

    button: {
      gold: '#f0b429',
      primary: '#28a86e',
      primaryDark: '#1a7a50',
      secondary: '#f59e0b',
      danger: '#e05a4a',
      info: '#38bdf8',
      purple: '#9b7fd4',
      muted: 'rgba(255,252,245,0.85)',
      shadow: 'rgba(74,55,40,0.22)',
    },

    text: {
      primary: '#3d2f1a',
      secondary: 'rgba(61,47,26,0.72)',
      muted: 'rgba(61,47,26,0.45)',
      dark: '#3d2f1a',
      gold: '#a06800',
      green: '#1a6b45',
      forest: '#4a6741',
      white: '#ffffff',
    },

    game: {
      tileTop: '#c8f0dc',
      tileBottom: '#7ddea8',
      tileBorder: '#28a86e',
      tileOutline: '#1a6b45',
      tileText: '#1a4a32',
      slotEmpty: 'rgba(40,168,110,0.10)',
      slotFilled: '#eefaf3',
      slotBorder: 'rgba(40,168,110,0.28)',
      slotBar: 'rgba(255,245,228,0.92)',
    },

    realm: {
      mortal: '#28a86e',
      qi: '#38bdf8',
      foundation: '#06b6d4',
      golden: '#f0b429',
      nascent: '#f59e0b',
      spirit: '#9b7fd4',
      void: '#8b9aab',
      body: '#f472b6',
      mahayana: '#f97316',
      tribulation: '#e05a4a',
      earth: '#78716c',
      heaven: '#f0b429',
    },

    menu: {
      battle: '#e05a4a',
      levels: '#28a86e',
      errorbook: '#f59e0b',
      rank: '#38bdf8',
      globalRank: '#9b7fd4',
      parent: '#78716c',
    },

    petal: ['#f472b6', '#7ddea8', '#ffe082', '#c4b5fd', '#7dd3fc'],
    qiSpark: ['#f0b429', '#7ddea8', '#c4b5fd', '#f472b6', '#38bdf8'],
  },

  fonts: {
    primary: '"PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif',
    letter: '"Arial Rounded MT Bold", "Helvetica Rounded", "PingFang SC", sans-serif',
    sizes: { title: 26, header: 20, subtitle: 18, body: 16, caption: 14, small: 12 },
  },

  layout: {
    safeTop: 72,
    backBtn: { x: 12, y: 56, w: 76, h: 36 },
    tabBar: { h: 34, gap: 7 },
    gap: { sm: 8, md: 14, lg: 22, xl: 28 },
  },

  animation: {
    button: { pressScale: 0.94, pressAlpha: 0.90 },
  },

  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 },
  borderRadius: { sm: 6, md: 10, lg: 14, xl: 18, xxl: 22, full: 999 },

  /** 卡通风描边宽度 */
  cartoon: {
    outlineWidth: 2,
    outlineWidthLg: 2.5,
    depthOffset: 3,
  },

  shadows: {
    md: { color: 'rgba(74,55,40,0.14)', blur: 8, offsetY: 4 },
    glow: { color: 'rgba(240,180,41,0.35)', blur: 18, offsetY: 0 },
    card: { color: 'rgba(74,55,40,0.08)', blur: 14, offsetY: 3 },
    cartoon: { color: 'rgba(74,55,40,0.28)', blur: 0, offsetY: 4 },
  },

  cultivation: {
    spiritColors: ['#f0b429', '#38bdf8', '#9b7fd4', '#f472b6', '#28a86e'],
    star: 'rgba(61,47,26,0.18)',
    mist: 'rgba(125,222,168,0.14)',
    mountain: ['#8aab9a', '#6d8f7e', '#5a7a6a'],
  },
};

export function applyShadow(ctx, cfg) {
  ctx.shadowColor = cfg.color;
  ctx.shadowBlur = cfg.blur;
  ctx.shadowOffsetX = cfg.offsetX || 0;
  ctx.shadowOffsetY = cfg.offsetY || 0;
}

export function clearShadow(ctx) {
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

export function getRealmColor(i) {
  return Object.values(Theme.colors.realm)[i % 12];
}

export function createGradient(ctx, x0, y0, x1, y1, stops) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  stops.forEach(([pos, color]) => g.addColorStop(pos, color));
  return g;
}
