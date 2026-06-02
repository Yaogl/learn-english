/**
 * 主题配置 — 对齐 Web 原型滢滢知语（暖米色 + 翡翠绿 + 琥珀金）
 */
export const Theme = {
  colors: {
    background: {
      // 暖米色渐变（替代深紫）
      gradient: ['#fffadf', '#fff8e1', '#fffadf'],
      overlay: 'rgba(255,250,223,0.45)',
      base: '#fffadf',
    },

    accent: {
      gold: '#d4a017',
      goldDark: '#b8860b',
      green: '#059669',
      greenLight: '#abf4ac',
      amber: '#f59e0b',
      pink: '#f472b6',
      cyan: '#06b6d4',
      lavender: '#a78bfa',
    },

    glass: 'rgba(255,255,255,0.60)',

    card: {
      bgTop: 'rgba(255,255,255,0.75)',
      bgBottom: 'rgba(255,255,255,0.55)',
      border: 'rgba(6,78,59,0.15)',
      borderMuted: 'rgba(6,78,59,0.10)',
      shadow: 'rgba(6,78,59,0.08)',
      jade: '#c0c9bc',
    },

    button: {
      gold: '#d4a017',
      primary: '#059669',
      secondary: '#f59e0b',
      danger: '#ef4444',
      info: '#0284c7',
      purple: '#7c3aed',
      muted: 'rgba(255,255,255,0.60)',
    },

    text: {
      primary: '#1e1c00',
      secondary: 'rgba(30,28,0,0.70)',
      muted: 'rgba(30,28,0,0.45)',
      dark: '#1e1c00',
      gold: '#92700c',
      green: '#065f46',
      white: '#ffffff',
    },

    game: {
      tileTop: '#d1fae5',
      tileBottom: '#a7f3d0',
      tileBorder: '#059669',
      tileText: '#065f46',
      slotEmpty: 'rgba(6,78,59,0.08)',
      slotFilled: '#ecfdf5',
      slotBorder: 'rgba(6,78,59,0.20)',
      slotBar: 'rgba(255,250,223,0.90)',
    },

    realm: {
      mortal: '#059669',
      qi: '#0284c7',
      foundation: '#06b6d4',
      golden: '#d4a017',
      nascent: '#f59e0b',
      spirit: '#7c3aed',
      void: '#6b7280',
      body: '#ec4899',
      mahayana: '#f97316',
      tribulation: '#ef4444',
      earth: '#78716c',
      heaven: '#d4a017',
    },

    menu: {
      battle: '#ec4899',
      levels: '#059669',
      errorbook: '#f59e0b',
      rank: '#0284c7',
      globalRank: '#7c3aed',
      parent: '#78716c',
    },

    // 花瓣/粒子颜色（翡翠绿系）
    petal: ['#f472b6', '#abf4ac', '#fcd34d', '#a78bfa', '#6ee7b7'],
  },

  fonts: {
    // 圆润字体优先级：PingFang SC（iOS圆润）> Noto Sans SC（Android）> Microsoft YaHei
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
    button: { pressScale: 0.95, pressAlpha: 0.88 },
  },

  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 },
  borderRadius: { sm: 4, md: 8, lg: 12, xl: 16, xxl: 20, full: 999 },

  shadows: {
    md: { color: 'rgba(6,78,59,0.10)', blur: 10, offsetY: 4 },
    glow: { color: 'rgba(5,150,105,0.30)', blur: 16, offsetY: 0 },
    card: { color: 'rgba(179,229,252,0.20)', blur: 12, offsetY: 2 },
  },

  cultivation: {
    spiritColors: ['#d4a017', '#06b6d4', '#a78bfa', '#f472b6', '#059669'],
    star: 'rgba(30,28,0,0.15)',
    mist: 'rgba(167,243,176,0.12)',
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
