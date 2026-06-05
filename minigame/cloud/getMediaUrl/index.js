// 云函数：获取云存储文件的 base64 数据
// 云函数有权限读云存储，不受前端权限限制
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event) => {
  const { fileID } = event;
  if (!fileID) return { code: -1, msg: '缺少 fileID' };

  try {
    const res = await cloud.downloadFile({ fileID });
    const base64 = res.fileContent.toString('base64');
    return { code: 0, base64 };
  } catch (e) {
    return { code: -1, msg: e.message };
  }
};
