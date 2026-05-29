/**
 * 修仙境界系统
 * 从练气到渡劫，每个境界9层
 */
const REALMS = [
  { id: 'lianqi', name: '练气', icon: '🌱', desc: '初入仙途，感应灵气', color: '#8BC34A', maxStage: 9 },
  { id: 'zhuji', name: '筑基', icon: '🏔️', desc: '奠定根基，凝聚真元', color: '#4CAF50', maxStage: 9 },
  { id: 'jindan', name: '金丹', icon: '✨', desc: '凝结金丹，脱胎换骨', color: '#FFD700', maxStage: 9 },
  { id: 'yuanying', name: '元婴', icon: '👶', desc: '元婴出世，神通初显', color: '#FF9800', maxStage: 9 },
  { id: 'huashen', name: '化神', icon: '🔥', desc: '化神入道，天地共鸣', color: '#F44336', maxStage: 9 },
  { id: 'heti', name: '合体', icon: '🌀', desc: '天人合一，掌控法则', color: '#9C27B0', maxStage: 9 },
  { id: 'dacheng', name: '大乘', icon: '🌟', desc: '大乘圆满，超凡入圣', color: '#2196F3', maxStage: 9 },
  { id: 'dujie', name: '渡劫', icon: '⚡', desc: '渡劫飞升，成就大道', color: '#E91E63', maxStage: 9 },
];

export class CultivationSystem {
  static getRealms() {
    return REALMS;
  }

  static getRealm(id) {
    return REALMS.find(r => r.id === id);
  }

  static getRealmByIndex(index) {
    return REALMS[index] || REALMS[REALMS.length - 1];
  }

  static getCurrentRealm(completedStages) {
    const stages = Math.max(0, Math.floor(completedStages));
    let remaining = stages;
    for (const realm of REALMS) {
      if (remaining < realm.maxStage) {
        return { realm, stage: remaining + 1 };
      }
      remaining -= realm.maxStage;
    }
    return { realm: REALMS[REALMS.length - 1], stage: REALMS[REALMS.length - 1].maxStage };
  }

  static getTotalStagesForRealm(realmIndex) {
    let total = 0;
    for (let i = 0; i <= realmIndex; i++) {
      total += REALMS[i].maxStage;
    }
    return total;
  }

  static getProgressInRealm(completedStages) {
    let remaining = completedStages;
    for (const realm of REALMS) {
      if (remaining < realm.maxStage) {
        return {
          realm,
          stage: remaining + 1,
          progress: remaining / realm.maxStage,
        };
      }
      remaining -= realm.maxStage;
    }
    return {
      realm: REALMS[REALMS.length - 1],
      stage: REALMS[REALMS.length - 1].maxStage,
      progress: 1,
    };
  }

  static getRealmStages(realmIndex) {
    const realm = REALMS[realmIndex];
    if (!realm) return [];
    return Array.from({ length: realm.maxStage }, (_, i) => ({
      realm: realm.id,
      realmName: realm.name,
      stage: i + 1,
      label: `${realm.name}${this.toChineseNum(i + 1)}层`,
    }));
  }

  static toChineseNum(num) {
    const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    return chars[num] || num;
  }

  static getFullLabel(completedStages) {
    const { realm, stage } = this.getCurrentRealm(completedStages);
    return `${realm.name}${this.toChineseNum(stage)}层`;
  }
}
