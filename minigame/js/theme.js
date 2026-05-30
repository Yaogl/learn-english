/**
 * 修仙国风主题配置
 * 统一管理颜色、字体、动画等样式参数
 */
export const Theme = {
  // ==================== 颜色方案 ====================
  colors: {
    // 主色调 - 仙气渐变
    primary: {
      start: '#E8F5E9',    // 浅绿仙气
      end: '#C8E6C9',      // 深绿仙气
      accent: '#4CAF50',   // 灵动绿
    },

    // 背景色系 - 云雾仙山
    background: {
      sky: ['#87CEEB', '#B5E8F7', '#D4F1F9'],      // 天空渐变
      cloud: ['#FFFFFF', '#F5F5F5'],                // 云朵
      mountain: ['#7BC67E', '#5DAE60', '#4A9E4D'],  // 远山
      grass: ['#7BC67E', '#5DAE60', '#4A9E4D'],     // 草地
    },

    // 卡片色系 - 灵纹古风
    card: {
      bgTop: '#FFFFFF',
      bgBottom: '#FAFAFA',
      border: '#E8E8E8',
      shadow: 'rgba(0,0,0,0.08)',
    },

    // 按钮色系 - 祥云灵纹
    button: {
      primary: '#4CAF50',
      secondary: '#FF9800',
      danger: '#FF6B6B',
      info: '#4A90D9',
      purple: '#9C27B0',
    },

    // 文字色系
    text: {
      primary: '#333333',
      secondary: '#666666',
      muted: '#999999',
      light: '#CCCCCC',
      white: '#FFFFFF',
    },

    // 修仙境界色系
    realm: {
      mortal: '#8BC34A',      // 凡人 - 绿
      qi: '#4CAF50',          // 练气 - 深绿
      foundation: '#2196F3',  // 筑基 - 蓝
      golden: '#FFD700',      // 金丹 - 金
      nascent: '#FF9800',     // 元婴 - 橙
      spirit: '#9C27B0',      // 化神 - 紫
      void: '#607D8B',        // 炼虚 - 灰蓝
      body: '#795548',        // 合体 - 棕
      mahayana: '#E91E63',    // 大乘 - 粉
      tribulation: '#F44336', // 渡劫 - 红
      earth: '#8D6E63',       // 地仙 - 土
      heaven: '#FFD700',      // 天仙 - 金
    },
  },

  // ==================== 字体配置 ====================
  fonts: {
    primary: '"Microsoft YaHei", "PingFang SC", sans-serif',
    sizes: {
      title: 30,
      subtitle: 18,
      body: 14,
      caption: 12,
      small: 10,
    },
  },

  // ==================== 动画配置 ====================
  animation: {
    // 缓动函数
    easing: {
      linear: (t) => t,
      easeInQuad: (t) => t * t,
      easeOutQuad: (t) => t * (2 - t),
      easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      easeOutBack: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      },
      easeOutElastic: (t) => {
        if (t === 0 || t === 1) return t;
        return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
      },
    },

    // 持续时间
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.5,
    },

    // 按钮动画
    button: {
      pressScale: 0.95,
      hoverScale: 1.02,
      pressAlpha: 0.8,
    },
  },

  // ==================== 间距配置 ====================
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },

  // ==================== 圆角配置 ====================
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    full: 999,
  },

  // ==================== 阴影配置 ====================
  shadows: {
    sm: {
      color: 'rgba(0,0,0,0.05)',
      blur: 4,
      offsetY: 2,
    },
    md: {
      color: 'rgba(0,0,0,0.08)',
      blur: 8,
      offsetY: 3,
    },
    lg: {
      color: 'rgba(0,0,0,0.12)',
      blur: 12,
      offsetY: 4,
    },
  },

  // ==================== 修仙元素配置 ====================
  cultivation: {
    // 灵气光效颜色
    spiritColors: ['#FFD700', '#87CEEB', '#98FB98', '#DDA0DD', '#FFA07A'],

    // 祥云装饰
    cloudColors: ['#FFFFFF', '#F5F5F5', '#EEEEEE'],

    // 灵纹图案
    spiritPattern: {
      lineWidth: 1,
      strokeStyle: 'rgba(255,255,255,0.3)',
    },
  },
};

// ==================== 辅助函数 ====================

/**
 * 获取渐变对象
 */
export function createGradient(ctx, x1, y1, x2, y2, colors) {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  colors.forEach((color, index) => {
    grad.addColorStop(index / (colors.length - 1), color);
  });
  return grad;
}

/**
 * 获取径向渐变对象
 */
export function createRadialGradient(ctx, x1, y1, r1, x2, y2, r2, colors) {
  const grad = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
  colors.forEach((color, index) => {
    grad.addColorStop(index / (colors.length - 1), color);
  });
  return grad;
}

/**
 * 应用阴影样式
 */
export function applyShadow(ctx, shadowConfig) {
  ctx.shadowColor = shadowConfig.color;
  ctx.shadowBlur = shadowConfig.blur;
  ctx.shadowOffsetX = shadowConfig.offsetX || 0;
  ctx.shadowOffsetY = shadowConfig.offsetY || 0;
}

/**
 * 清除阴影样式
 */
export function clearShadow(ctx) {
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

/**
 * 获取修仙境界颜色
 */
export function getRealmColor(realmIndex) {
  const realmColors = Object.values(Theme.colors.realm);
  return realmColors[realmIndex % realmColors.length];
}
