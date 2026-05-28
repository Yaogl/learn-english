/**
 * Manages leaderboard data using WeChat open data domain.
 * Uploads player progress and displays friend rankings.
 */
export class RankManager {
  /**
   * Upload player's progress to WeChat cloud storage.
   */
  static uploadProgress(data: {
    grade: number;
    semester: number;
    unit: number;
    stage: number;
    totalWordsCleared: number;
  }): void {
    if (typeof (globalThis as any).wx === 'undefined') return;

    const wx = (globalThis as any).wx;
    const keyData = JSON.stringify({
      level: `${data.grade}-${data.semester}-${data.unit}-${data.stage}`,
      grade: data.grade,
      semester: data.semester,
      unit: data.unit,
      stage: data.stage,
      totalWordsCleared: data.totalWordsCleared,
      timestamp: Date.now(),
    });

    wx.setUserCloudStorage({
      KVDataList: [{ key: 'progress', value: keyData }],
      success: () => console.log('Progress uploaded'),
      fail: (err: any) => console.error('Upload failed:', err),
    });
  }

  /**
   * Request friend ranking data from open data domain.
   */
  static showFriendRank(): void {
    if (typeof (globalThis as any).wx === 'undefined') return;

    const wx = (globalThis as any).wx;
    const openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage({ type: 'showRank' });
  }

  /**
   * Hide the friend ranking display.
   */
  static hideFriendRank(): void {
    if (typeof (globalThis as any).wx === 'undefined') return;

    const wx = (globalThis as any).wx;
    const openDataContext = wx.getOpenDataContext();
    openDataContext.postMessage({ type: 'hideRank' });
  }
}
