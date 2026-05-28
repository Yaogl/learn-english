/**
 * WeChat Open Data Domain script.
 * Runs in an isolated Canvas context for accessing friend data.
 */
const wx = (typeof wx !== 'undefined') ? wx : {};

const sharedCanvas = wx.getSharedCanvas && wx.getSharedCanvas();
const ctx = sharedCanvas && sharedCanvas.getContext('2d');

wx.onMessage((data) => {
  if (data.type === 'showRank') {
    showFriendRank();
  } else if (data.type === 'hideRank') {
    clearRank();
  }
});

function showFriendRank() {
  if (!ctx || !sharedCanvas) return;

  wx.getFriendCloudStorage({
    keyList: ['progress'],
    success: (res) => {
      const friends = res.data
        .map((friend) => {
          let progress = {};
          try {
            progress = JSON.parse(friend.KVDataList[0]?.value || '{}');
          } catch (e) {}
          return {
            nickname: friend.nickname,
            avatarUrl: friend.avatarUrl,
            ...progress,
          };
        })
        .filter((f) => f.level)
        .sort((a, b) => (b.totalWordsCleared || 0) - (a.totalWordsCleared || 0));

      renderRanking(friends);
    },
  });
}

function clearRank() {
  if (!ctx || !sharedCanvas) return;
  ctx.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
}

function renderRanking(friends) {
  if (!ctx || !sharedCanvas) return;

  const width = sharedCanvas.width;
  const height = sharedCanvas.height;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#f0f8ff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#333';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('好友排行榜', width / 2, 40);

  const startY = 70;
  const rowHeight = 50;

  friends.slice(0, 10).forEach((friend, index) => {
    const y = startY + index * rowHeight;

    ctx.fillStyle = index < 3 ? '#ff6b00' : '#666';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${index + 1}.`, 20, y);

    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.fillText(friend.nickname || '微信用户', 50, y);

    ctx.fillStyle = '#666';
    ctx.textAlign = 'right';
    const levelText = friend.level ? `第${friend.stage || 1}关` : '未开始';
    ctx.fillText(levelText, width - 20, y);

    ctx.fillStyle = '#888';
    ctx.font = '12px Arial';
    ctx.fillText(`${friend.totalWordsCleared || 0}词`, width - 20, y + 18);
  });

  if (friends.length === 0) {
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('暂无好友数据', width / 2, height / 2);
  }
}
