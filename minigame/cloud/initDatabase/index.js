// 云函数：初始化数据库集合
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const results = [];

  // 创建 words 集合
  try {
    await db.createCollection('words');
    results.push({ collection: 'words', status: 'created' });
  } catch (e) {
    results.push({ collection: 'words', status: e.errCode === -502005 ? 'exists' : 'error', msg: e.message });
  }

  // 创建 players 集合
  try {
    await db.createCollection('players');
    results.push({ collection: 'players', status: 'created' });
  } catch (e) {
    results.push({ collection: 'players', status: e.errCode === -502005 ? 'exists' : 'error', msg: e.message });
  }

  // 创建 wrong_words 集合
  try {
    await db.createCollection('wrong_words');
    results.push({ collection: 'wrong_words', status: 'created' });
  } catch (e) {
    results.push({ collection: 'wrong_words', status: e.errCode === -502005 ? 'exists' : 'error', msg: e.message });
  }

  // 创建 battle_rooms 集合
  try {
    await db.createCollection('battle_rooms');
    results.push({ collection: 'battle_rooms', status: 'created' });
  } catch (e) {
    results.push({ collection: 'battle_rooms', status: e.errCode === -502005 ? 'exists' : 'error', msg: e.message });
  }

  // 插入初始单词数据
  const initialWords = [
    {
      grade: 3, semester: 1, unit: 1,
      words: [
        { id: 'g3s1u1w001', word: 'hello', meaning: '你好', difficulty: 1 },
        { id: 'g3s1u1w002', word: 'morning', meaning: '早晨', difficulty: 2 },
        { id: 'g3s1u1w003', word: 'afternoon', meaning: '下午', difficulty: 2 },
        { id: 'g3s1u1w004', word: 'evening', meaning: '傍晚', difficulty: 2 },
        { id: 'g3s1u1w005', word: 'welcome', meaning: '欢迎', difficulty: 2 },
        { id: 'g3s1u1w006', word: 'friend', meaning: '朋友', difficulty: 2 },
        { id: 'g3s1u1w007', word: 'teacher', meaning: '老师', difficulty: 2 },
        { id: 'g3s1u1w008', word: 'student', meaning: '学生', difficulty: 2 },
        { id: 'g3s1u1w009', word: 'school', meaning: '学校', difficulty: 1 },
        { id: 'g3s1u1w010', word: 'classroom', meaning: '教室', difficulty: 3 },
      ]
    },
    {
      grade: 3, semester: 1, unit: 2,
      words: [
        { id: 'g3s1u2w001', word: 'family', meaning: '家庭', difficulty: 2 },
        { id: 'g3s1u2w002', word: 'father', meaning: '父亲', difficulty: 2 },
        { id: 'g3s1u2w003', word: 'mother', meaning: '母亲', difficulty: 2 },
        { id: 'g3s1u2w004', word: 'brother', meaning: '兄弟', difficulty: 2 },
        { id: 'g3s1u2w005', word: 'sister', meaning: '姐妹', difficulty: 2 },
        { id: 'g3s1u2w006', word: 'grandfather', meaning: '祖父', difficulty: 3 },
        { id: 'g3s1u2w007', word: 'grandmother', meaning: '祖母', difficulty: 3 },
        { id: 'g3s1u2w008', word: 'daughter', meaning: '女儿', difficulty: 3 },
        { id: 'g3s1u2w009', word: 'children', meaning: '孩子们', difficulty: 3 },
        { id: 'g3s1u2w010', word: 'parents', meaning: '父母', difficulty: 2 },
      ]
    },
  ];

  for (const item of initialWords) {
    try {
      const existing = await db.collection('words')
        .where({ grade: item.grade, semester: item.semester, unit: item.unit })
        .limit(1)
        .get();

      if (existing.data.length === 0) {
        await db.collection('words').add({ data: item });
        results.push({ action: 'insertWords', grade: item.grade, unit: item.unit, status: 'ok' });
      } else {
        results.push({ action: 'insertWords', grade: item.grade, unit: item.unit, status: 'skipped' });
      }
    } catch (e) {
      results.push({ action: 'insertWords', grade: item.grade, unit: item.unit, status: 'error', msg: e.message });
    }
  }

  return { code: 0, data: results };
};
