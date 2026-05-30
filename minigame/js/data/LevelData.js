/**
 * 关卡数据 - 12境界 × 20-30关
 * 每关：故事、单词、难度配置
 */

// 境界定义
const REALMS = [
  { id: 'fanren', name: '凡人', icon: '🌿', desc: '初入仙途，初识修行', color: '#8BC34A', startStage: 1, endStage: 10 },
  { id: 'lianqi', name: '练气', icon: '💨', desc: '灵气入体，正式踏入仙途', color: '#4CAF50', startStage: 11, endStage: 25 },
  { id: 'zhuji', name: '筑基', icon: '🏔️', desc: '根基成型，拥有正式仙力', color: '#009688', startStage: 26, endStage: 45 },
  { id: 'jindan', name: '金丹', icon: '✨', desc: '凝结金丹，成为一方强者', color: '#FFD700', startStage: 46, endStage: 70 },
  { id: 'yuanying', name: '元婴', icon: '👶', desc: '元神凝聚，可元神出窍', color: '#FF9800', startStage: 71, endStage: 90 },
  { id: 'huashen', name: '化神', icon: '🔥', desc: '感悟天地法则，行走大千世界', color: '#F44336', startStage: 91, endStage: 110 },
  { id: 'lianxu', name: '炼虚', icon: '🌀', desc: '炼化天地灵气，闯天道试炼', color: '#9C27B0', startStage: 111, endStage: 120 },
  { id: 'heti', name: '合体', icon: '⚔️', desc: '肉身与灵力合一，镇压上古凶兽', color: '#673AB7', startStage: 121, endStage: 130 },
  { id: 'dacheng', name: '大乘', icon: '🌟', desc: '行走九天，收集九天神草', color: '#2196F3', startStage: 131, endStage: 140 },
  { id: 'dujie', name: '渡劫', icon: '⚡', desc: '天劫将至，抵御雷劫', color: '#E91E63', startStage: 141, endStage: 170 },
  { id: 'dixian', name: '地仙', icon: '🌍', desc: '位列地仙，执掌一方天地', color: '#795548', startStage: 171, endStage: 190 },
  { id: 'tianxian', name: '天仙', icon: '👑', desc: '功行圆满，羽化登仙', color: '#FFD700', startStage: 191, endStage: 200 },
];

// 单词库（按难度分级）
const WORD_POOL = {
  // 难度1：3年级基础词（4-5字母）
  easy: [
    'cat', 'dog', 'sun', 'run', 'hat', 'big', 'red', 'fun', 'cup', 'bus',
    'map', 'pen', 'box', 'fox', 'jam', 'leg', 'bed', 'pig', 'hen', 'mix',
    'top', 'pop', 'hit', 'sit', 'hot', 'not', 'got', 'lot', 'pot', 'dot',
    'man', 'can', 'fan', 'pan', 'tan', 'van', 'bag', 'tag', 'rag', 'wag',
    'dad', 'mom', 'boy', 'toy', 'joy', 'day', 'may', 'say', 'way', 'pay',
    'eat', 'tea', 'sea', 'bee', 'see', 'tree', 'free', 'three', 'home', 'name',
    'game', 'came', 'same', 'play', 'stay', 'day', 'way', 'say', 'may', 'pay',
  ],
  // 难度2：4年级词（5-6字母）
  medium: [
    'apple', 'happy', 'water', 'green', 'blue', 'white', 'black', 'brown',
    'house', 'horse', 'mouse', 'plane', 'train', 'brain', 'chain', 'plain',
    'tiger', 'snake', 'eagle', 'whale', 'sheep', 'goat', 'duck', 'frog',
    'bread', 'milk', 'juice', 'candy', 'cake', 'cookie', 'fruit', 'melon',
    'dance', 'speak', 'write', 'read', 'sing', 'swim', 'jump', 'run',
    'small', 'large', 'tall', 'short', 'long', 'wide', 'thick', 'thin',
    'quick', 'slow', 'fast', 'hard', 'soft', 'warm', 'cool', 'hot',
    'phone', 'table', 'chair', 'clock', 'light', 'sound', 'music', 'color',
    'spring', 'summer', 'autumn', 'winter', 'sunny', 'cloudy', 'rainy', 'windy',
  ],
  // 难度3：5-6年级词（6-8字母）
  hard: [
    'animal', 'person', 'family', 'friend', 'teacher', 'student', 'school',
    'garden', 'forest', 'river', 'mountain', 'island', 'ocean', 'beach',
    'doctor', 'nurse', 'police', 'driver', 'worker', 'farmer', 'cook',
    'pencil', 'rubber', 'ruler', 'eraser', 'folder', 'bottle', 'basket',
    'chicken', 'rabbit', 'monkey', 'elephant', 'giraffe', 'penguin', 'dolphin',
    'butterfly', 'crocodile', 'kangaroo', 'squirrel', 'dinosaur', 'whale',
    'breakfast', 'lunch', 'dinner', 'supper', 'kitchen', 'bedroom', 'bathroom',
    'sunny', 'rainy', 'cloudy', 'snowy', 'windy', 'foggy', 'stormy',
    'beautiful', 'wonderful', 'different', 'important', 'interesting', 'different',
    'exercise', 'healthy', 'balance', 'vitamin', 'protein', 'energy',
    'experiment', 'laboratory', 'molecule', 'oxygen', 'gravity', 'energy',
  ],
  // 难度4：初中词（7-10字母）
  expert: [
    'adventure', 'beautiful', 'celebrate', 'difficult', 'education', 'favorite',
    'government', 'happiness', 'important', 'knowledge', 'landscape', 'mystery',
    'necessary', 'opposite', 'politics', 'recognize', 'technology', 'university',
    'wonderful', 'atmosphere', 'boundary', 'carnival', 'detective', 'everyday',
    'furniture', 'guardian', 'heritage', 'illustrate', 'journalist', 'knowledge',
    'landscape', 'messenger', 'notebook', 'opposite', 'paragraph', 'question',
    'relationship', 'situation', 'tradition', 'understand', 'valuable', 'warehouse',
  ],
};

// 故事模板
const STORY_TEMPLATES = {
  fanren: [
    '山间草木蕴含灵气，快去采摘灵草，踏出修行第一步吧！',
    '路边小妖偷吃灵果，消除灵物赶走调皮小妖。',
    '村中年长者需要草药疗伤，收集药材施以援手。',
    '发现一簇灵草，集齐便可滋养肉身。',
    '林间窜出几只野狐精，动手将它们驱离山林。',
    '雨后天晴，山中灵菇丛生，抓紧时间采集。',
    '山路被碎石藤蔓阻挡，清理障碍继续前行。',
    '偶遇迷路的灵兔，收集灵食送它归家。',
    '收集基础灵材，为冲击练气境做准备。',
    '凡人肉身已淬炼完毕，准备突破至练气境！',
  ],
  lianqi: [
    '成功踏入练气境，灵气入体，先采摘灵草稳固修为。',
    '山林深处出现毒蚊妖兽，清除它们守护药田。',
    '炼丹学徒急需灵花，速速收集送来。',
    '溪流之下藏有灵蚌，收集蚌珠滋养灵气。',
    '野狼妖兽出没，出手将其猎杀，获取妖核。',
    '崖边稀有灵草迎风生长，小心采摘收入囊中。',
    '成群飞虫扰乱修行，尽数消除，静心修炼。',
    '同门委托收集灵木，集齐木材炼制法器。',
    '沼泽地带生出毒草，清理毒草净化土地。',
    '灵狐拦路，一战取胜，磨砺自身术法。',
    '漫山灵果成熟，收集灵果补充灵力。',
    '石洞中盘踞小蛇妖，扫清障碍探索洞府。',
    '集齐各类灵材，炼制低阶丹药。',
    '练气后期瓶颈将至，猎杀妖兽积攒突破之力。',
    '修为圆满，即刻冲击筑基境界！',
  ],
  zhuji: [
    '筑基成，道基稳固，前往外围秘境采摘珍稀灵药。',
    '秘境守卫石灵苏醒，击碎石灵继续探索。',
    '道友身受重伤，急需疗伤灵草，全力收集。',
    '丛林巨蜥横行，联手将其斩杀，获取修行资源。',
    '千年灵藤缠绕宝物，斩断藤蔓取出灵物。',
    '迷雾林中幻兽作祟，破除幻象击退幻兽。',
    '药谷盛产灵药，抓紧采摘切莫错过。',
    '盗药小妖组团来袭，守护药谷不失一物。',
    '深潭水怪兴风作浪，出手降服恢复平静。',
    '收集灵矿原石，锻造专属护身法器。',
    '荒原出现疾风狼，狩猎妖兽凝练真气。',
    '绝壁之上生有仙芝，冒险采摘增益修为。',
    '秘境机关遍布，消除符文破解机关。',
    '偶遇散修求助，共享灵草结下仙缘。',
    '毒瘴弥漫山谷，收集净世灵花驱散毒雾。',
    '猛虎妖兽镇守山口，奋力一战打通前路。',
    '灵花盛放，采集花蕊炼制凝神丹。',
    '筑基修为抵达巅峰，四处历练积累底蕴。',
    '集齐突破所需全部资源，静待突破契机。',
    '冲破壁垒，晋级金丹修士！',
  ],
};

/**
 * 获取境界信息
 */
export function getRealmByStage(stage) {
  for (const realm of REALMS) {
    if (stage >= realm.startStage && stage <= realm.endStage) {
      return realm;
    }
  }
  return REALMS[REALMS.length - 1];
}

/**
 * 获取境界内的第几关（1开始）
 */
export function getStageIndexInRealm(stage) {
  const realm = getRealmByStage(stage);
  return stage - realm.startStage + 1;
}

/**
 * 获取境界总关数
 */
export function getRealmTotalStages(realmId) {
  const realm = REALMS.find(r => r.id === realmId);
  return realm ? realm.endStage - realm.startStage + 1 : 0;
}

/**
 * 获取关卡数据
 */
export function getStageData(stage) {
  const realm = getRealmByStage(stage);
  const idx = getStageIndexInRealm(stage);

  // 选择单词
  const wordCount = stage <= 10 ? 1 : (stage <= 50 ? 1 : 2);
  let wordPool;
  if (stage <= 25) {
    wordPool = WORD_POOL.easy;
  } else if (stage <= 70) {
    wordPool = WORD_POOL.medium;
  } else if (stage <= 140) {
    wordPool = WORD_POOL.hard;
  } else {
    wordPool = WORD_POOL.expert;
  }

  // 用关卡号作为种子，确保同一关总是相同的单词
  const seed = stage * 7 + 13;
  const shuffled = [...wordPool].sort((a, b) => {
    const hashA = (a.charCodeAt(0) * 31 + a.charCodeAt(1) * 17 + seed) % 100;
    const hashB = (b.charCodeAt(0) * 31 + b.charCodeAt(1) * 17 + seed) % 100;
    return hashA - hashB;
  });
  const words = shuffled.slice(0, wordCount);

  // 选择故事
  const stories = STORY_TEMPLATES[realm.id] || STORY_TEMPLATES.fanren;
  const story = stories[(idx - 1) % stories.length];

  // 难度配置
  const extraLetters = Math.min(8, Math.floor(stage / 15) + 2);

  return {
    stage,
    realm,
    story,
    words: words.map(w => ({
      word: w,
      meaning: getWordMeaning(w),
    })),
    wordCount,
    extraLetters,
    maxSlots: 7,
  };
}

/**
 * 获取单词释义（简化版）
 */
function getWordMeaning(word) {
  const meanings = {
    'cat': '猫', 'dog': '狗', 'sun': '太阳', 'run': '跑', 'hat': '帽子',
    'big': '大的', 'red': '红色', 'fun': '乐趣', 'cup': '杯子', 'bus': '公交车',
    'map': '地图', 'pen': '钢笔', 'box': '盒子', 'fox': '狐狸', 'jam': '果酱',
    'leg': '腿', 'bed': '床', 'pig': '猪', 'hen': '母鸡', 'mix': '混合',
    'top': '顶部', 'pop': '流行', 'hit': '打击', 'sit': '坐', 'hot': '热的',
    'not': '不', 'got': '得到', 'lot': '许多', 'pot': '锅', 'dot': '点',
    'man': '男人', 'can': '能', 'fan': '粉丝', 'pan': '平底锅', 'tan': '晒黑',
    'van': '货车', 'bag': '包', 'tag': '标签', 'rag': '抹布', 'wag': '摇摆',
    'dad': '爸爸', 'mom': '妈妈', 'boy': '男孩', 'toy': '玩具', 'joy': '快乐',
    'day': '天', 'may': '可能', 'say': '说', 'way': '路', 'pay': '支付',
    'eat': '吃', 'tea': '茶', 'sea': '海', 'bee': '蜜蜂', 'see': '看见',
    'tree': '树', 'free': '自由', 'three': '三', 'home': '家', 'name': '名字',
    'game': '游戏', 'came': '来', 'same': '相同', 'play': '玩', 'stay': '停留',
    'apple': '苹果', 'happy': '快乐', 'water': '水', 'green': '绿色', 'blue': '蓝色',
    'white': '白色', 'black': '黑色', 'brown': '棕色', 'house': '房子', 'horse': '马',
    'mouse': '老鼠', 'plane': '飞机', 'train': '火车', 'brain': '大脑', 'chain': '链条',
    'plain': '平原', 'tiger': '老虎', 'snake': '蛇', 'eagle': '鹰', 'whale': '鲸鱼',
    'sheep': '绵羊', 'goat': '山羊', 'duck': '鸭子', 'frog': '青蛙',
    'bread': '面包', 'milk': '牛奶', 'juice': '果汁', 'candy': '糖果', 'cake': '蛋糕',
    'cookie': '饼干', 'fruit': '水果', 'melon': '甜瓜',
    'dance': '跳舞', 'speak': '说', 'write': '写', 'read': '读', 'sing': '唱歌',
    'swim': '游泳', 'jump': '跳', 'small': '小的', 'large': '大的', 'tall': '高的',
    'short': '矮的', 'long': '长的', 'wide': '宽的', 'thick': '厚的', 'thin': '薄的',
    'quick': '快的', 'slow': '慢的', 'fast': '快的', 'hard': '硬的', 'soft': '软的',
    'warm': '温暖', 'cool': '凉爽', 'phone': '电话', 'table': '桌子', 'chair': '椅子',
    'clock': '钟', 'light': '灯', 'sound': '声音', 'music': '音乐', 'color': '颜色',
    'spring': '春天', 'summer': '夏天', 'autumn': '秋天', 'winter': '冬天',
    'sunny': '晴天', 'cloudy': '多云', 'rainy': '下雨', 'windy': '有风',
    'animal': '动物', 'person': '人', 'family': '家庭', 'friend': '朋友',
    'teacher': '老师', 'student': '学生', 'school': '学校',
    'garden': '花园', 'forest': '森林', 'river': '河流', 'mountain': '山',
    'island': '岛屿', 'ocean': '海洋', 'beach': '海滩',
    'doctor': '医生', 'nurse': '护士', 'police': '警察', 'driver': '司机',
    'worker': '工人', 'farmer': '农民', 'cook': '厨师',
    'pencil': '铅笔', 'rubber': '橡皮', 'ruler': '尺子', 'eraser': '橡皮',
    'folder': '文件夹', 'bottle': '瓶子', 'basket': '篮子',
    'chicken': '鸡', 'rabbit': '兔子', 'monkey': '猴子', 'elephant': '大象',
    'giraffe': '长颈鹿', 'penguin': '企鹅', 'dolphin': '海豚',
    'butterfly': '蝴蝶', 'crocodile': '鳄鱼', 'kangaroo': '袋鼠',
    'squirrel': '松鼠', 'dinosaur': '恐龙',
    'breakfast': '早餐', 'lunch': '午餐', 'dinner': '晚餐', 'supper': '晚餐',
    'kitchen': '厨房', 'bedroom': '卧室', 'bathroom': '浴室',
    'snowy': '下雪', 'foggy': '有雾', 'stormy': '暴风雨',
    'beautiful': '美丽的', 'wonderful': '精彩的', 'different': '不同的',
    'important': '重要的', 'interesting': '有趣的',
    'exercise': '锻炼', 'healthy': '健康的', 'balance': '平衡',
    'vitamin': '维生素', 'protein': '蛋白质', 'energy': '能量',
    'experiment': '实验', 'laboratory': '实验室', 'molecule': '分子',
    'oxygen': '氧气', 'gravity': '重力',
    'adventure': '冒险', 'celebrate': '庆祝', 'difficult': '困难的',
    'education': '教育', 'favorite': '最喜欢的', 'government': '政府',
    'happiness': '幸福', 'knowledge': '知识', 'landscape': '风景',
    'mystery': '神秘', 'necessary': '必要的', 'opposite': '相反的',
    'politics': '政治', 'recognize': '认出', 'technology': '技术',
    'university': '大学', 'atmosphere': '气氛', 'boundary': '边界',
    'carnival': '嘉年华', 'detective': '侦探', 'everyday': '每天',
    'furniture': '家具', 'guardian': '守护者', 'heritage': '遗产',
    'illustrate': '说明', 'journalist': '记者', 'messenger': '信使',
    'notebook': '笔记本', 'paragraph': '段落', 'question': '问题',
    'relationship': '关系', 'situation': '情况', 'tradition': '传统',
    'understand': '理解', 'valuable': '有价值的', 'warehouse': '仓库',
  };
  return meanings[word] || word;
}

/**
 * 获取所有境界
 */
export function getAllRealms() {
  return REALMS;
}

/**
 * 获取总关数
 */
export function getTotalStages() {
  return 200;
}

export { REALMS, WORD_POOL };
