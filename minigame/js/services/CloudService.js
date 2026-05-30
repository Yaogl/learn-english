/**
 * Cloud Service - 微信云开发服务模块
 * 环境ID: cloud1-d7giehwchbc1527f3
 */
const CLOUD_ENV = 'cloud1-d7giehwchbc1527f3';

let db = null;
let initialized = false;

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
   * 创建对战房间
   */
  static async createBattleRoom(openid) {
    if (!this.isAvailable()) return null;
    try {
      const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
      await db.collection('battle_rooms').add({
        data: {
          roomId,
          creator: openid,
          status: 'waiting',
          createTime: db.serverDate(),
        }
      });
      return roomId;
    } catch (e) {
      console.warn('[Cloud] 创建房间失败', e);
      return null;
    }
  }

  /**
   * 加入对战房间
   */
  static async joinBattleRoom(roomId, openid) {
    if (!this.isAvailable()) return null;
    try {
      const res = await db.collection('battle_rooms')
        .where({ roomId, status: 'waiting' })
        .limit(1)
        .get();

      if (res.data.length === 0) return null;

      const room = res.data[0];
      await db.collection('battle_rooms').doc(room._id).update({
        data: {
          joiner: openid,
          status: 'ready',
          words: this.generateBattleWords(),
        }
      });
      return room;
    } catch (e) {
      console.warn('[Cloud] 加入房间失败', e);
      return null;
    }
  }

  /**
   * 生成对战单词
   */
  static generateBattleWords() {
    const words = [
      'cat', 'dog', 'sun', 'run', 'hat', 'big', 'red', 'fun',
      'cup', 'bus', 'map', 'pen', 'box', 'fox', 'jam', 'leg',
    ];
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }

  /**
   * 更新对战状态
   */
  static async updateBattleProgress(roomId, openid, score) {
    if (!this.isAvailable()) return false;
    try {
      const res = await db.collection('battle_rooms')
        .where({ roomId })
        .limit(1)
        .get();

      if (res.data.length === 0) return false;

      const room = res.data[0];
      const isCreator = room.creator === openid;
      const field = isCreator ? 'creatorScore' : 'joinerScore';

      await db.collection('battle_rooms').doc(room._id).update({
        data: {
          [field]: score,
          status: score >= 3 ? 'finished' : 'playing',
        }
      });
      return true;
    } catch (e) {
      console.warn('[Cloud] 更新对战进度失败', e);
      return false;
    }
  }

  /**
   * 获取对战房间状态
   */
  static async getBattleRoomStatus(roomId) {
    if (!this.isAvailable()) return null;
    try {
      const res = await db.collection('battle_rooms')
        .where({ roomId })
        .limit(1)
        .get();
      return res.data.length > 0 ? res.data[0] : null;
    } catch (e) {
      console.warn('[Cloud] 获取房间状态失败', e);
      return null;
    }
  }
}
