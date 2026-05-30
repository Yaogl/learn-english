/**
 * 主题配置 — 对齐 Web 原型 index.html（深紫 + 香槟金）
 */
export const Theme = {
  colors: {
    background: {
      gradient: ['#0f0c29', '#302b63', '#24243e'],
      overlay: 'rgba(0,0,0,0.45)',
    },

    accent: {
      gold: '#ffd700',
      goldDark: '#c9a000',
      purple: '#1a0a2e',
      purpleMid: '#2d1b4e',
      pink: '#ff6b9d',
      cyan: '#4dffe8',
      lavender: '#c084fc',
    },

    glass: 'rgba(255,255,255,0.08)',

    card: {
      bgTop: 'rgba(45,27,78,0.85)',
      bgBottom: 'rgba(26,10,46,0.9)',
      border: 'rgba(255,215,0,0.35)',
      borderMuted: 'rgba(255,255,255,0.15)',
      shadow: 'rgba(0,0,0,0.35)',
    },

    button: {
      gold: '#ffd700',
      primary: '#6bcb77',
      secondary: '#ff9500',
      danger: '#ff6b6b',
      info: '#4d96ff',
      purple: '#c084fc',
      muted: 'rgba(255,255,255,0.12)',
    },

    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.75)',
      muted: 'rgba(255,255,255,0.45)',
      dark: '#1a0a2e',
      gold: '#ffd700',
      cyan: '#4dffe8',
    },

    game: {
      tileTop: '#5a3a9e',
      tileBottom: '#2a1858',
      tileBorder: '#ffd700',
      tileText: '#ffd700',
      slotEmpty: 'rgba(0,0,0,0.3)',
      slotFilled: '#3d2a6e',
      slotBorder: 'rgba(255,215,0,0.35)',
      slotBar: 'rgba(15,12,41,0.85)',
    },

    realm: {
      mortal: '#6bcb77',
      qi: '#4d96ff',
      foundation: '#4dffe8',
      golden: '#ffd700',
      nascent: '#ff9500',
      spirit: '#c084fc',
      void: '#9eb0c9',
      body: '#ff6b9d',
      mahayana: '#ff9500',
      tribulation: '#ff6b6b',
      earth: '#b8a898',
      heaven: '#ffd700',
    },

    menu: {
      battle: '#ff6b9d',
      levels: '#6bcb77',
      errorbook: '#ff9500',
      rank: '#4d96ff',
      globalRank: '#c084fc',
      parent: '#b8a898',
    },
  },

  fonts: {
    primary: '"STYuanti SC", "Yuanti SC", "YouYuan", "Microsoft YaHei", "PingFang SC", sans-serif',
    letter: '"Arial Rounded MT Bold", "Helvetica Rounded", "STYuanti SC", sans-serif',
    sizes: { title: 26, header: 20, subtitle: 18, body: 16, caption: 14, small: 12 },
  },

  layout: {
    safeTop: 72,
    backBtn: { x: 12, y: 56, w: 76, h: 36 },
    tabBar: { h: 34, gap: 7 },
    gap: { sm: 8, md: 14, lg: 22, xl: 28 },
  },

  animation: {
    button: { pressScale: 0.95, pressAlpha: 0.88 },
  },

  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 },
  borderRadius: { sm: 4, md: 8, lg: 12, xl: 16, xxl: 20, full: 999 },

  shadows: {
    md: { color: 'rgba(0,0,0,0.35)', blur: 10, offsetY: 4 },
    glow: { color: 'rgba(255,215,0,0.4)', blur: 16, offsetY: 0 },
  },

  cultivation: {
    spiritColors: ['#ffd700', '#4dffe8', '#c084fc', '#ff6b9d', '#6bcb77'],
    star: '#ffffff',
    mist: 'rgba(180,130,255,0.12)',
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
