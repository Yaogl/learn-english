import { ItemType } from '../game/ItemManager';

/**
 * WeChat ad integration.
 * Handles rewarded video ads and banner ads.
 * Falls back gracefully when not in WeChat environment.
 */
export class AdManager {
  private rewardedAd: any = null;
  private bannerAd: any = null;

  private static isWechat(): boolean {
    return typeof (globalThis as any).wx !== 'undefined';
  }

  /**
   * Initialize rewarded video ad.
   * @param adUnitId WeChat ad unit ID (from ad platform)
   */
  static initRewardedAd(adUnitId: string): void {
    if (!this.isWechat()) return;
    const wx = (globalThis as any).wx;
    this.rewardedAd = wx.createRewardedVideoAd({ adUnitId });

    this.rewardedAd.onClose((res: any) => {
      if (res && res.isEnded) {
        this.onAdCompleted?.();
      }
    });

    this.rewardedAd.onError((err: any) => {
      console.error('Rewarded ad error:', err);
    });
  }

  private static onAdCompleted: (() => void) | null = null;

  /**
   * Show rewarded video ad. Returns a promise that resolves
   * when the user completes watching.
   */
  static showRewardedAd(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isWechat() || !this.rewardedAd) {
        resolve(true);
        return;
      }

      this.onAdCompleted = () => {
        this.onAdCompleted = null;
        resolve(true);
      };

      this.rewardedAd.show().catch(() => {
        this.onAdCompleted = null;
        resolve(false);
      });
    });
  }

  /**
   * Initialize banner ad.
   * @param adUnitId WeChat banner ad unit ID
   * @param style Banner position and size
   */
  static initBannerAd(adUnitId: string, style?: { left: number; top: number; width: number }): void {
    if (!this.isWechat()) return;
    const wx = (globalThis as any).wx;
    const systemInfo = wx.getSystemInfoSync();

    this.bannerAd = wx.createBannerAd({
      adUnitId,
      style: style || {
        left: 10,
        top: systemInfo.windowHeight - 100,
        width: systemInfo.windowWidth - 20,
      },
    });

    this.bannerAd.onError((err: any) => {
      console.error('Banner ad error:', err);
    });
  }

  static showBanner(): void {
    this.bannerAd?.show().catch(() => {});
  }

  static hideBanner(): void {
    this.bannerAd?.hide().catch(() => {});
  }

  static destroyBanner(): void {
    this.bannerAd?.destroy();
    this.bannerAd = null;
  }
}
