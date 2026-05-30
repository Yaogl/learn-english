// 云函数：好友对战房间
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

// 对战单词池
const BATTLE_WORDS = [
  'cat', 'dog', 'sun', 'run', 'hat', 'big', 'red', 'fun',
  'cup', 'bus', 'map', 'pen', 'box', 'fox', 'jam', 'leg',
  'bed', 'pig', 'hen', 'mix', 'top', 'pop', 'hit', 'sit',
];

function generateBattleWords() {
  const shuffled = [...BATTLE_WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

exports.main = async (event, context) => {
  const { action, roomId } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  switch (action) {
    case 'create':
      // 创建房间
      try {
        const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        await db.collection('battle_rooms').add({
          data: {
            roomId: newRoomId,
            creator: openid,
            status: 'waiting',
            creatorScore: 0,
            joinerScore: 0,
            createTime: db.serverDate(),
          }
        });
        return { code: 0, data: { roomId: newRoomId } };
      } catch (e) {
        return { code: -1, msg: e.message };
      }

    case 'join':
      // 加入房间
      try {
        const res = await db.collection('battle_rooms')
          .where({ roomId, status: 'waiting' })
          .limit(1)
          .get();

        if (res.data.length === 0) {
          return { code: -2, msg: '房间不存在或已开始' };
        }

        const room = res.data[0];
        if (room.creator === openid) {
          return { code: -3, msg: '不能加入自己的房间' };
        }

        const words = generateBattleWords();
        await db.collection('battle_rooms').doc(room._id).update({
          data: {
            joiner: openid,
            status: 'ready',
            words,
          }
        });

        return { code: 0, data: { roomId, words, status: 'ready' } };
      } catch (e) {
        return { code: -1, msg: e.message };
      }

    case 'updateScore':
      // 更新分数
      try {
        const { score } = event;
        const res = await db.collection('battle_rooms')
          .where({ roomId })
          .limit(1)
          .get();

        if (res.data.length === 0) {
          return { code: -2, msg: '房间不存在' };
        }

        const room = res.data[0];
        const isCreator = room.creator === openid;
        const field = isCreator ? 'creatorScore' : 'joinerScore';
        const newStatus = score >= 3 ? 'finished' : 'playing';

        await db.collection('battle_rooms').doc(room._id).update({
          data: {
            [field]: score,
            status: newStatus,
          }
        });

        return { code: 0, msg: 'ok' };
      } catch (e) {
        return { code: -1, msg: e.message };
      }

    case 'getStatus':
      // 获取房间状态
      try {
        const res = await db.collection('battle_rooms')
          .where({ roomId })
          .limit(1)
          .get();

        if (res.data.length === 0) {
          return { code: -2, msg: '房间不存在' };
        }

        return { code: 0, data: res.data[0] };
      } catch (e) {
        return { code: -1, msg: e.message };
      }

    default:
      return { code: -1, msg: 'unknown action' };
  }
};
