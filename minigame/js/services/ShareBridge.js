/**
 * 分享配置桥接 — 供 wx.onShareAppMessage 读取当前页分享参数
 */
const DEFAULT_SHARE = {
  title: '滢滢知语 - 一起来学英语 PK！',
  query: '',
};

let currentShare = { ...DEFAULT_SHARE };

/** 设置当前分享卡片内容 */
export function setShareConfig({ title, query } = {}) {
  if (title) currentShare.title = title;
  if (query !== undefined) currentShare.query = query;
}

/** 重置为默认分享 */
export function resetShareConfig() {
  currentShare = { ...DEFAULT_SHARE };
}

/** 获取分享配置副本 */
export function getShareConfig() {
  return { ...currentShare };
}

/** 解析启动/展示 query 字符串 */
export function parseLaunchQuery(query) {
  if (!query) return {};
  const params = {};
  String(query).split('&').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx <= 0) return;
    const key = pair.slice(0, idx);
    const val = pair.slice(idx + 1);
    params[key] = decodeURIComponent(val || '');
  });
  return params;
}
