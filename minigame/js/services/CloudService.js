/**
 * Cloud Service - 微信云开发服务模块
 * 环境ID: cloud1-d0gvx0j804a5c17c1
 */
const CLOUD_ENV = 'cloud1-d0gvx0j804a5c17c1';

let db = null;
let initialized = false;
let cachedOpenid = null;

export class CloudService {
  /**
   * 初始化云开发
   */
  static init() {
    if (initialized) return;
    try {
      wx.cloud.init({
        env: CLOUD_ENV,
        traceUser: true,
      });
      db = wx.cloud.database();
      initialized = true;
      console.log('[Cloud] 初始化成功');
    } catch (e) {
      console.warn('[Cloud] 初始化失败，使用本地模式', e);
    }
  }

  /**
   * 是否可用
   */
  static isAvailable() {
    return initialized && db !== null;
  }

  /**
   * 获取用户openid（缓存）
   */
  static async getOpenid() {
    if (cachedOpenid) return cachedOpenid;
    if (!this.isAvailable()) return null;
    try {
      const res = await wx.cloud.callFunction({ name: 'getRankings', data: { action: 'getSelf' } });
      cachedOpenid = res.result?.openid || null;
      return cachedOpenid;
    } catch (e) {
      return null;
    }
  }

  // ==================== 单词数据 ====================

  /**
   * 从云端获取单词数据
   */
  static async fetchWords(grade, semester, unit) {
    if (!this.isAvailable()) return null;
    try {
      const res = await db.collection('words')
        .where({ grade, semester, unit })
        .limit(1)
        .get();
      return res.data.length > 0 ? res.data[0] : null;
    } catch (e) {
      console.warn('[Cloud] 获取单词失败', e);
      return null;
    }
  }

  /**
   * 获取所有单词数据
   */
  static async fetchAllWords() {
    if (!this.isAvailable()) return null;
    try {
      const res = await db.collection('words')
        .limit(100)
        .get();
      return res.data;
    } catch (e) {
      console.warn('[Cloud] 获取全部单词失败', e);
      return null;
    }
  }

  // ==================== 玩家进度 ====================

  /**
   * 获取玩家进度
   */
  static async getPlayerProgress(openid) {
    if (!this.isAvailable()) return null;
    try {
      const res = await db.collection('players')
        .where({ openid })
        .limit(1)
        .get();
      return res.data.length > 0 ? res.data[0] : null;
    } catch (e) {
      console.warn('[Cloud] 获取玩家进度失败', e);
      return null;
    }
  }

  /**
   * 更新玩家进度
   */
  static async updatePlayerProgress(openid, data) {
    if (!this.isAvailable()) return false;
    try {
      const existing = await this.getPlayerProgress(openid);
      if (existing) {
        await db.collection('players').doc(existing._id).update({ data });
      } else {
        await db.collection('players').add({ data: { openid, ...data } });
      }
      return true;
    } catch (e) {
      console.warn('[Cloud] 更新玩家进度失败', e);
      return false;
    }
  }

  // ==================== 错题本 ====================

  /**
   * 获取错题本
   */
  static async getWrongWords(openid) {
    if (!this.isAvailable()) return null;
    try {
      const res = await db.collection('wrong_words')
        .where({ openid })
        .limit(1)
        .get();
      return res.data.length > 0 ? res.data[0].words : [];
    } catch (e) {
      console.warn('[Cloud] 获取错题本失败', e);
      return null;
    }
  }

  /**
   * 更新错题本
   */
  static async updateWrongWords(openid, words) {
    if (!this.isAvailable()) return false;
    try {
      const existing = await db.collection('wrong_words')
        .where({ openid })
        .limit(1)
        .get();

      if (existing.data.length > 0) {
        await db.collection('wrong_words').doc(existing.data[0]._id).update({
          data: { words, updateTime: db.serverDate() }
        });
      } else {
        await db.collection('wrong_words').add({
          data: { openid, words, createTime: db.serverDate(), updateTime: db.serverDate() }
        });
      }
      return true;
    } catch (e) {
      console.warn('[Cloud] 更新错题本失败', e);
      return false;
    }
  }

  // ==================== 排行榜 ====================

  /**
   * 获取排行榜
   */
  static async getRankings(type = 'stages', limit = 50) {
    if (!this.isAvailable()) return [];
    try {
      const field = type === 'stages' ? 'completedStages' :
                    type === 'words' ? 'totalWords' : 'streak';
      const res = await db.collection('players')
        .orderBy(field, 'desc')
        .limit(limit)
        .get();
      return res.data;
    } catch (e) {
      console.warn('[Cloud] 获取排行榜失败', e);
      return [];
    }
  }

  // ==================== 好友对战 ====================

  /**
   * 调用对战云函数
   */
  static async callBattleRoom(action, extra = {}) {
    if (!this.isAvailable()) return null;
    try {
      const res = await wx.cloud.callFunction({
        name: 'battleRoom',
        data: { action, ...extra },
      });
      return res.result || null;
    } catch (e) {
      console.warn('[Cloud] battleRoom 调用失败', e);
      return null;
    }
  }

  /**
   * 创建对战房间
   */
  static async createBattleRoom() {
    const res = await this.callBattleRoom('create');
    if (res?.code === 0) return res.data.roomId;
    return null;
  }

  /**
   * 加入对战房间
   */
  static async joinBattleRoom(roomId) {
    const res = await this.callBattleRoom('join', { roomId });
    if (res?.code === 0) return res.data;
    return { error: res?.msg || '加入失败' };
  }

  /**
   * 获取对战房间状态
   */
  static async getBattleRoomStatus(roomId) {
    const res = await this.callBattleRoom('getStatus', { roomId });
    if (res?.code === 0) return res.data;
    return null;
  }

  /**
   * 更新对战分数
   */
  static async updateBattleProgress(roomId, score) {
    const res = await this.callBattleRoom('updateScore', { roomId, score });
    return res?.code === 0;
  }

  /**
   * 生成对战单词（本地兜底）
   */
  static generateBattleWords() {
    const words = [
      'cat', 'dog', 'sun', 'run', 'hat', 'big', 'red', 'fun',
      'cup', 'bus', 'map', 'pen', 'box', 'fox', 'jam', 'leg',
    ];
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }
}
