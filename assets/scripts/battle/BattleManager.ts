import { StorageManager } from '../data/StorageManager';

export interface ChallengeData {
  challengeId: string;
  wordSeed: number;
  words: string[];
  challenger: {
    openid: string;
    nickname: string;
    time: number | null;
    cleared: boolean;
  };
  opponent: {
    openid: string;
    nickname: string;
    time: number | null;
    cleared: boolean;
  };
}

/**
 * Manages async battle challenges.
 * Uses WeChat share for invites and cloud storage for results.
 */
export class BattleManager {
  static createChallenge(words: string[]): void {
    const challengeId = `ch_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const wordSeed = Math.floor(Math.random() * 1000000);

    const challenge: ChallengeData = {
      challengeId,
      wordSeed,
      words,
      challenger: {
        openid: StorageManager.get('openid', ''),
        nickname: StorageManager.get('nickname', '玩家'),
        time: null,
        cleared: false,
      },
      opponent: {
        openid: '',
        nickname: '',
        time: null,
        cleared: false,
      },
    };

    StorageManager.set(`challenge_${challengeId}`, challenge);
    this.shareChallenge(challengeId, words);
  }

  private static shareChallenge(challengeId: string, words: string[]): void {
    if (typeof (globalThis as any).wx === 'undefined') return;

    const wx = (globalThis as any).wx;
    wx.shareAppMessage({
      title: `来挑战！我用${words.length}个单词等你`,
      query: `challengeId=${challengeId}`,
      imageUrl: '',
    });
  }

  static recordCompletion(challengeId: string, time: number, cleared: boolean): void {
    const challenge = StorageManager.get<ChallengeData | null>(
      `challenge_${challengeId}`,
      null
    );
    if (!challenge) return;

    const myOpenid = StorageManager.get('openid', '');
    if (challenge.challenger.openid === myOpenid) {
      challenge.challenger.time = time;
      challenge.challenger.cleared = cleared;
    } else {
      challenge.opponent.time = time;
      challenge.opponent.cleared = cleared;
    }

    StorageManager.set(`challenge_${challengeId}`, challenge);
    this.uploadChallengeResult(challenge);
  }

  private static uploadChallengeResult(challenge: ChallengeData): void {
    if (typeof (globalThis as any).wx === 'undefined') return;

    const wx = (globalThis as any).wx;
    wx.setUserCloudStorage({
      KVDataList: [{
        key: `challenge_${challenge.challengeId}`,
        value: JSON.stringify(challenge),
      }],
    });
  }

  static getChallengeResult(challengeId: string): ChallengeData | null {
    return StorageManager.get<ChallengeData | null>(`challenge_${challengeId}`, null);
  }
}
