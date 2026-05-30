// 云函数：获取排行榜
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const { type = 'stages', limit = 50, openid } = event;

  try {
    // 获取排行榜
    const field = type === 'stages' ? 'completedStages' :
                  type === 'words' ? 'totalWords' : 'streak';

    const res = await db.collection('players')
      .orderBy(field, 'desc')
      .limit(limit)
      .get();

    // 获取当前用户排名
    let myRank = -1;
    if (openid) {
      const allPlayers = await db.collection('players')
        .orderBy(field, 'desc')
        .get();

      myRank = allPlayers.data.findIndex(p => p.openid === openid) + 1;
    }

    return {
      code: 0,
      data: {
        rankings: res.data,
        myRank,
      }
    };
  } catch (e) {
    return { code: -1, msg: e.message };
  }
};
