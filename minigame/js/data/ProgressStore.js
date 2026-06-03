/**
 * 闯关进度 — 本地存储 + 云同步
 */
import { CloudService } from '../services/CloudService';

const STORAGE_KEY = 'completed_stages';

/** 统一转为已通关关卡号数组 */
export function normalizeCompletedStages(data) {
  if (data === null || data === undefined || data === '') return [];
  if (Array.isArray(data)) {
    return [...new Set(data.filter((s) => Number.isInteger(s) && s > 0))].sort((a, b) => a - b);
  }
  if (typeof data === 'number' && data > 0) return [Math.floor(data)];
  if (typeof data === 'string') {
    if (!data.trim()) return [];
    try {
      return normalizeCompletedStages(JSON.parse(data));
    } catch (e) {
      return [];
    }
  }
  return [];
}

/** 读取已通关关卡列表 */
export function loadCompletedStages() {
  try {
    return normalizeCompletedStages(wx.getStorageSync(STORAGE_KEY));
  } catch (e) {
    return [];
  }
}

/** 记录关卡通关（本地 + 云同步） */
export function saveCompletedStage(stage) {
  if (!Number.isInteger(stage) || stage <= 0) return;
  const stages = loadCompletedStages();
  if (stages.includes(stage)) return;
  stages.push(stage);
  stages.sort((a, b) => a - b);
  wx.setStorageSync(STORAGE_KEY, stages);

  // 更新 player_stats
  _updatePlayerStats(stages);

  // 异步同步到云端
  _syncToCloud(stages);
}

/** 更新本地 player_stats */
function _updatePlayerStats(stages) {
  try {
    const stats = JSON.parse(wx.getStorageSync('player_stats') || '{}');
    stats.totalStages = stages.length;
    stats.maxStage = stages[stages.length - 1] || 0;
    stats.lastPlayDate = new Date().toISOString().slice(0, 10);
    // 简单连续天数计算
    const today = stats.lastPlayDate;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (stats._lastDate === yesterday) {
      stats.streak = (stats.streak || 0) + 1;
    } else if (stats._lastDate !== today) {
      stats.streak = 1;
    }
    stats._lastDate = today;
    wx.setStorageSync('player_stats', stats);
  } catch (e) {}
}

/** 后台同步到云端（静默，不阻塞） */
async function _syncToCloud(stages) {
  try {
    if (!CloudService.isAvailable()) return;
    const openid = await CloudService.getOpenid();
    if (!openid) return;
    // 读取用户信息
    let name = '灵语行者';
    let avatarUrl = '';
    try {
      const userInfo = JSON.parse(wx.getStorageSync('user_info') || '{}');
      name = userInfo.nickName || name;
      avatarUrl = userInfo.avatarUrl || avatarUrl;
    } catch (e) {}
    const stats = JSON.parse(wx.getStorageSync('player_stats') || '{}');
    await CloudService.updatePlayerProgress(openid, {
      name,
      avatarUrl,
      completedStages: stages.length,
      totalStages: stages.length,
      totalWords: stats.totalWords || 0,
      streak: stats.streak || 0,
      maxStage: stages[stages.length - 1] || 0,
      updateTime: new Date().toISOString(),
    });
  } catch (e) {
    console.warn('[ProgressStore] 云同步失败', e);
  }
}

/** 最高已通关关卡号 */
export function getMaxCompletedStage(stages) {
  if (!stages || !stages.length) return 0;
  return Math.max(...stages);
}
