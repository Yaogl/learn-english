// 云函数：更新玩家进度
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const { action, openid, data } = event;

  switch (action) {
    case 'get':
      // 获取玩家进度
      try {
        const res = await db.collection('players')
          .where({ openid })
          .limit(1)
          .get();
        return { code: 0, data: res.data.length > 0 ? res.data[0] : null };
      } catch (e) {
        return { code: -1, msg: e.message };
      }

    case 'update':
      // 更新玩家进度
      try {
        const existing = await db.collection('players')
          .where({ openid })
          .limit(1)
          .get();

        if (existing.data.length > 0) {
          await db.collection('players').doc(existing.data[0]._id).update({
            data: { ...data, updateTime: db.serverDate() }
          });
        } else {
          await db.collection('players').add({
            data: {
              openid,
              ...data,
              createTime: db.serverDate(),
              updateTime: db.serverDate()
            }
          });
        }
        return { code: 0, msg: 'ok' };
      } catch (e) {
        return { code: -1, msg: e.message };
      }

    default:
      return { code: -1, msg: 'unknown action' };
  }
};
