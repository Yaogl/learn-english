/**
 * 闯关进度本地存储
 */
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

/** 记录关卡通关 */
export function saveCompletedStage(stage) {
  if (!Number.isInteger(stage) || stage <= 0) return;
  const stages = loadCompletedStages();
  if (stages.includes(stage)) return;
  stages.push(stage);
  stages.sort((a, b) => a - b);
  wx.setStorageSync(STORAGE_KEY, stages);
}

/** 最高已通关关卡号 */
export function getMaxCompletedStage(stages) {
  if (!stages || !stages.length) return 0;
  return Math.max(...stages);
}
