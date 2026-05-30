// 云函数：同步单词数据
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const { action, grade, semester, unit, words } = event;

  switch (action) {
    case 'get':
      // 获取单词数据
      try {
        const res = await db.collection('words')
          .where({ grade, semester, unit })
          .limit(1)
          .get();
        return { code: 0, data: res.data.length > 0 ? res.data[0] : null };
      } catch (e) {
        return { code: -1, msg: e.message };
      }

    case 'getAll':
      // 获取所有单词
      try {
        const res = await db.collection('words')
          .limit(100)
          .get();
        return { code: 0, data: res.data };
      } catch (e) {
        return { code: -1, msg: e.message };
      }

    case 'add':
      // 添加单词数据
      try {
        const existing = await db.collection('words')
          .where({ grade, semester, unit })
          .limit(1)
          .get();

        if (existing.data.length > 0) {
          await db.collection('words').doc(existing.data[0]._id).update({
            data: { words, updateTime: db.serverDate() }
          });
        } else {
          await db.collection('words').add({
            data: { grade, semester, unit, words, createTime: db.serverDate() }
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
