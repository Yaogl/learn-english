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

// 单词库（按难度分级，含音标、过去式、例句）
const WORD_POOL = {
  // 难度1：3年级基础词（3-5字母）
  easy: [
    { word: 'cat', phonetic: '/kæt/', meaning: '猫', past: null, example: 'I have a cat.' },
    { word: 'dog', phonetic: '/dɒɡ/', meaning: '狗', past: null, example: 'The dog is big.' },
    { word: 'sun', phonetic: '/sʌn/', meaning: '太阳', past: null, example: 'The sun is hot.' },
    { word: 'run', phonetic: '/rʌn/', meaning: '跑', past: 'ran', example: 'I run every day.' },
    { word: 'hat', phonetic: '/hæt/', meaning: '帽子', past: null, example: 'This is my hat.' },
    { word: 'big', phonetic: '/bɪɡ/', meaning: '大的', past: null, example: 'The elephant is big.' },
    { word: 'red', phonetic: '/red/', meaning: '红色', past: null, example: 'I like red.' },
    { word: 'fun', phonetic: '/fʌn/', meaning: '乐趣', past: null, example: 'This is fun!' },
    { word: 'cup', phonetic: '/kʌp/', meaning: '杯子', past: null, example: 'A cup of tea.' },
    { word: 'bus', phonetic: '/bʌs/', meaning: '公交车', past: null, example: 'I take a bus.' },
    { word: 'map', phonetic: '/mæp/', meaning: '地图', past: null, example: 'Look at the map.' },
    { word: 'pen', phonetic: '/pen/', meaning: '钢笔', past: null, example: 'This is a pen.' },
    { word: 'box', phonetic: '/bɒks/', meaning: '盒子', past: null, example: 'In the box.' },
    { word: 'fox', phonetic: '/fɒks/', meaning: '狐狸', past: null, example: 'The fox is fast.' },
    { word: 'jam', phonetic: '/dʒæm/', meaning: '果酱', past: null, example: 'I like jam.' },
    { word: 'leg', phonetic: '/leɡ/', meaning: '腿', past: null, example: 'My leg hurts.' },
    { word: 'bed', phonetic: '/bed/', meaning: '床', past: null, example: 'Go to bed.' },
    { word: 'pig', phonetic: '/pɪɡ/', meaning: '猪', past: null, example: 'The pig is pink.' },
    { word: 'hen', phonetic: '/hen/', meaning: '母鸡', past: null, example: 'The hen lays eggs.' },
    { word: 'hot', phonetic: '/hɒt/', meaning: '热的', past: null, example: 'It is hot today.' },
    { word: 'not', phonetic: '/nɒt/', meaning: '不', past: null, example: 'I am not happy.' },
    { word: 'got', phonetic: '/ɡɒt/', meaning: '得到', past: 'got', example: 'I got a gift.' },
    { word: 'man', phonetic: '/mæn/', meaning: '男人', past: null, example: 'The man is tall.' },
    { word: 'can', phonetic: '/kæn/', meaning: '能', past: null, example: 'I can swim.' },
    { word: 'fan', phonetic: '/fæn/', meaning: '粉丝', past: null, example: 'I am a fan.' },
    { word: 'dad', phonetic: '/dæd/', meaning: '爸爸', past: null, example: 'My dad is here.' },
    { word: 'mom', phonetic: '/mɒm/', meaning: '妈妈', past: null, example: 'My mom is kind.' },
    { word: 'boy', phonetic: '/bɔɪ/', meaning: '男孩', past: null, example: 'The boy runs.' },
    { word: 'toy', phonetic: '/tɔɪ/', meaning: '玩具', past: null, example: 'This is my toy.' },
    { word: 'joy', phonetic: '/dʒɔɪ/', meaning: '快乐', past: null, example: 'I feel joy.' },
    { word: 'day', phonetic: '/deɪ/', meaning: '天', past: null, example: 'Good day!' },
    { word: 'may', phonetic: '/meɪ/', meaning: '可能', past: null, example: 'May I go?' },
    { word: 'say', phonetic: '/seɪ/', meaning: '说', past: 'said', example: 'I say hello.' },
    { word: 'eat', phonetic: '/iːt/', meaning: '吃', past: 'ate', example: 'I eat lunch.' },
    { word: 'tea', phonetic: '/tiː/', meaning: '茶', past: null, example: 'A cup of tea.' },
    { word: 'sea', phonetic: '/siː/', meaning: '海', past: null, example: 'I love the sea.' },
    { word: 'bee', phonetic: '/biː/', meaning: '蜜蜂', past: null, example: 'A bee is flying.' },
    { word: 'see', phonetic: '/siː/', meaning: '看见', past: 'saw', example: 'I see a bird.' },
    { word: 'tree', phonetic: '/triː/', meaning: '树', past: null, example: 'The tree is tall.' },
    { word: 'home', phonetic: '/hoʊm/', meaning: '家', past: null, example: 'I go home.' },
    { word: 'name', phonetic: '/neɪm/', meaning: '名字', past: null, example: 'My name is Tom.' },
    { word: 'game', phonetic: '/ɡeɪm/', meaning: '游戏', past: null, example: 'I like this game.' },
    { word: 'play', phonetic: '/pleɪ/', meaning: '玩', past: 'played', example: 'I play every day.' },
    { word: 'book', phonetic: '/bʊk/', meaning: '书', past: null, example: 'Read a book.' },
    { word: 'fish', phonetic: '/fɪʃ/', meaning: '鱼', past: null, example: 'I see a fish.' },
    { word: 'bird', phonetic: '/bɜːrd/', meaning: '鸟', past: null, example: 'The bird can fly.' },
    { word: 'cake', phonetic: '/keɪk/', meaning: '蛋糕', past: null, example: 'I like cake.' },
    { word: 'milk', phonetic: '/mɪlk/', meaning: '牛奶', past: null, example: 'Drink milk.' },
    { word: 'rain', phonetic: '/reɪn/', meaning: '雨', past: 'rained', example: 'It rains today.' },
    { word: 'wind', phonetic: '/wɪnd/', meaning: '风', past: null, example: 'The wind is strong.' },
    { word: 'snow', phonetic: '/snoʊ/', meaning: '雪', past: 'snowed', example: 'It snows in winter.' },
  ],
  // 难度2：4年级词（5-7字母）
  medium: [
    { word: 'apple', phonetic: '/ˈæpəl/', meaning: '苹果', past: null, example: 'I eat an apple.' },
    { word: 'happy', phonetic: '/ˈhæpi/', meaning: '快乐的', past: null, example: 'I am happy.' },
    { word: 'water', phonetic: '/ˈwɔːtər/', meaning: '水', past: null, example: 'Drink water.' },
    { word: 'green', phonetic: '/ɡriːn/', meaning: '绿色', past: null, example: 'The grass is green.' },
    { word: 'house', phonetic: '/haʊs/', meaning: '房子', past: null, example: 'This is my house.' },
    { word: 'horse', phonetic: '/hɔːrs/', meaning: '马', past: null, example: 'The horse runs fast.' },
    { word: 'plane', phonetic: '/pleɪn/', meaning: '飞机', past: null, example: 'The plane flies high.' },
    { word: 'train', phonetic: '/treɪn/', meaning: '火车', past: null, example: 'I take a train.' },
    { word: 'tiger', phonetic: '/ˈtaɪɡər/', meaning: '老虎', past: null, example: 'The tiger is strong.' },
    { word: 'snake', phonetic: '/sneɪk/', meaning: '蛇', past: null, example: 'I see a snake.' },
    { word: 'sheep', phonetic: '/ʃiːp/', meaning: '绵羊', past: null, example: 'The sheep is white.' },
    { word: 'bread', phonetic: '/bred/', meaning: '面包', past: null, example: 'I eat bread.' },
    { word: 'juice', phonetic: '/dʒuːs/', meaning: '果汁', past: null, example: 'I like juice.' },
    { word: 'candy', phonetic: '/ˈkændi/', meaning: '糖果', past: null, example: 'I like candy.' },
    { word: 'dance', phonetic: '/dæns/', meaning: '跳舞', past: 'danced', example: 'I like to dance.' },
    { word: 'speak', phonetic: '/spiːk/', meaning: '说', past: 'spoke', example: 'I speak English.' },
    { word: 'write', phonetic: '/raɪt/', meaning: '写', past: 'wrote', example: 'I write a letter.' },
    { word: 'small', phonetic: '/smɔːl/', meaning: '小的', past: null, example: 'The cat is small.' },
    { word: 'large', phonetic: '/lɑːrdʒ/', meaning: '大的', past: null, example: 'The house is large.' },
    { word: 'tall', phonetic: '/tɔːl/', meaning: '高的', past: null, example: 'He is tall.' },
    { word: 'short', phonetic: '/ʃɔːrt/', meaning: '矮的', past: null, example: 'She is short.' },
    { word: 'quick', phonetic: '/kwɪk/', meaning: '快的', past: null, example: 'Be quick!' },
    { word: 'slow', phonetic: '/sloʊ/', meaning: '慢的', past: null, example: 'The turtle is slow.' },
    { word: 'fast', phonetic: '/fæst/', meaning: '快的', past: null, example: 'I run fast.' },
    { word: 'phone', phonetic: '/foʊn/', meaning: '电话', past: null, example: 'Answer the phone.' },
    { word: 'table', phonetic: '/ˈteɪbəl/', meaning: '桌子', past: null, example: 'On the table.' },
    { word: 'chair', phonetic: '/tʃer/', meaning: '椅子', past: null, example: 'Sit on the chair.' },
    { word: 'clock', phonetic: '/klɒk/', meaning: '钟', past: null, example: 'The clock ticks.' },
    { word: 'light', phonetic: '/laɪt/', meaning: '灯', past: null, example: 'Turn on the light.' },
    { word: 'music', phonetic: '/ˈmjuːzɪk/', meaning: '音乐', past: null, example: 'I love music.' },
    { word: 'spring', phonetic: '/sprɪŋ/', meaning: '春天', past: null, example: 'Spring is warm.' },
    { word: 'summer', phonetic: '/ˈsʌmər/', meaning: '夏天', past: null, example: 'Summer is hot.' },
    { word: 'winter', phonetic: '/ˈwɪntər/', meaning: '冬天', past: null, example: 'Winter is cold.' },
    { word: 'friend', phonetic: '/frend/', meaning: '朋友', past: null, example: 'He is my friend.' },
    { word: 'family', phonetic: '/ˈfæməli/', meaning: '家庭', past: null, example: 'I love my family.' },
    { word: 'school', phonetic: '/skuːl/', meaning: '学校', past: null, example: 'I go to school.' },
    { word: 'flower', phonetic: '/ˈflaʊər/', meaning: '花', past: null, example: 'The flower is pretty.' },
    { word: 'river', phonetic: '/ˈrɪvər/', meaning: '河', past: null, example: 'The river is long.' },
    { word: 'green', phonetic: '/ɡriːn/', meaning: '绿色', past: null, example: 'I like green.' },
    { word: 'happy', phonetic: '/ˈhæpi/', meaning: '快乐', past: null, example: 'Be happy!' },
  ],
  // 难度3：5-6年级词（6-8字母）
  hard: [
    { word: 'animal', phonetic: '/ˈænɪməl/', meaning: '动物', past: null, example: 'I love animals.' },
    { word: 'teacher', phonetic: '/ˈtiːtʃər/', meaning: '老师', past: null, example: 'My teacher is kind.' },
    { word: 'student', phonetic: '/ˈstjuːdənt/', meaning: '学生', past: null, example: 'I am a student.' },
    { word: 'garden', phonetic: '/ˈɡɑːrdən/', meaning: '花园', past: null, example: 'In the garden.' },
    { word: 'forest', phonetic: '/ˈfɔːrɪst/', meaning: '森林', past: null, example: 'In the forest.' },
    { word: 'doctor', phonetic: '/ˈdɒktər/', meaning: '医生', past: null, example: 'I see a doctor.' },
    { word: 'pencil', phonetic: '/ˈpensəl/', meaning: '铅笔', past: null, example: 'I have a pencil.' },
    { word: 'chicken', phonetic: '/ˈtʃɪkɪn/', meaning: '鸡', past: null, example: 'I like chicken.' },
    { word: 'rabbit', phonetic: '/ˈræbɪt/', meaning: '兔子', past: null, example: 'The rabbit is cute.' },
    { word: 'monkey', phonetic: '/ˈmʌŋki/', meaning: '猴子', past: null, example: 'The monkey climbs.' },
    { word: 'elephant', phonetic: '/ˈelɪfənt/', meaning: '大象', past: null, example: 'The elephant is big.' },
    { word: 'giraffe', phonetic: '/dʒɪˈræf/', meaning: '长颈鹿', past: null, example: 'The giraffe is tall.' },
    { word: 'penguin', phonetic: '/ˈpeŋɡwɪn/', meaning: '企鹅', past: null, example: 'The penguin is cute.' },
    { word: 'dolphin', phonetic: '/ˈdɒlfɪn/', meaning: '海豚', past: null, example: 'The dolphin can jump.' },
    { word: 'butterfly', phonetic: '/ˈbʌtərflaɪ/', meaning: '蝴蝶', past: null, example: 'The butterfly flies.' },
    { word: 'kitchen', phonetic: '/ˈkɪtʃɪn/', meaning: '厨房', past: null, example: 'In the kitchen.' },
    { word: 'bedroom', phonetic: '/ˈbedruːm/', meaning: '卧室', past: null, example: 'In my bedroom.' },
    { word: 'morning', phonetic: '/ˈmɔːrnɪŋ/', meaning: '早晨', past: null, example: 'Good morning!' },
    { word: 'evening', phonetic: '/ˈiːvnɪŋ/', meaning: '傍晚', past: null, example: 'Good evening!' },
    { word: 'exercise', phonetic: '/ˈeksərsaɪz/', meaning: '锻炼', past: 'exercised', example: 'I exercise daily.' },
    { word: 'healthy', phonetic: '/ˈhelθi/', meaning: '健康的', past: null, example: 'I am healthy.' },
    { word: 'balance', phonetic: '/ˈbæləns/', meaning: '平衡', past: null, example: 'Keep your balance.' },
    { word: 'energy', phonetic: '/ˈenərdʒi/', meaning: '能量', past: null, example: 'I have energy.' },
    { word: 'wonderful', phonetic: '/ˈwʌndərfəl/', meaning: '精彩的', past: null, example: 'How wonderful!' },
    { word: 'beautiful', phonetic: '/ˈbjuːtɪfəl/', meaning: '美丽的', past: null, example: 'The sunset is beautiful.' },
    { word: 'different', phonetic: '/ˈdɪfrənt/', meaning: '不同的', past: null, example: 'We are different.' },
    { word: 'important', phonetic: '/ɪmˈpɔːrtənt/', meaning: '重要的', past: null, example: 'This is important.' },
    { word: 'interesting', phonetic: '/ˈɪntrəstɪŋ/', meaning: '有趣的', past: null, example: 'This is interesting.' },
    { word: 'mountain', phonetic: '/ˈmaʊntən/', meaning: '山', past: null, example: 'The mountain is high.' },
    { word: 'ocean', phonetic: '/ˈoʊʃən/', meaning: '海洋', past: null, example: 'The ocean is big.' },
  ],
  // 难度4：初中词（7-10字母）
  expert: [
    { word: 'adventure', phonetic: '/ədˈventʃər/', meaning: '冒险', past: null, example: 'I love adventure.' },
    { word: 'celebrate', phonetic: '/ˈselɪbreɪt/', meaning: '庆祝', past: 'celebrated', example: 'We celebrate today.' },
    { word: 'difficult', phonetic: '/ˈdɪfɪkəlt/', meaning: '困难的', past: null, example: 'This is difficult.' },
    { word: 'education', phonetic: '/ˌedʒuˈkeɪʃən/', meaning: '教育', past: null, example: 'Education is important.' },
    { word: 'favorite', phonetic: '/ˈfeɪvərɪt/', meaning: '最喜欢的', past: null, example: 'My favorite color.' },
    { word: 'happiness', phonetic: '/ˈhæpinəs/', meaning: '幸福', past: null, example: 'Happiness is key.' },
    { word: 'important', phonetic: '/ɪmˈpɔːrtənt/', meaning: '重要的', past: null, example: 'This is important.' },
    { word: 'knowledge', phonetic: '/ˈnɒlɪdʒ/', meaning: '知识', past: null, example: 'Knowledge is power.' },
    { word: 'mystery', phonetic: '/ˈmɪstəri/', meaning: '神秘', past: null, example: 'It is a mystery.' },
    { word: 'necessary', phonetic: '/ˈnesəseri/', meaning: '必要的', past: null, example: 'It is necessary.' },
    { word: 'opposite', phonetic: '/ˈɒpəzɪt/', meaning: '相反的', past: null, example: 'On the opposite side.' },
    { word: 'recognize', phonetic: '/ˈrekəɡnaɪz/', meaning: '认出', past: 'recognized', example: 'I recognize him.' },
    { word: 'technology', phonetic: '/tekˈnɒlədʒi/', meaning: '技术', past: null, example: 'I love technology.' },
    { word: 'wonderful', phonetic: '/ˈwʌndərfəl/', meaning: '精彩的', past: null, example: 'How wonderful!' },
    { word: 'atmosphere', phonetic: '/ˈætməsfɪr/', meaning: '气氛', past: null, example: 'The atmosphere is great.' },
    { word: 'beautiful', phonetic: '/ˈbjuːtɪfəl/', meaning: '美丽的', past: null, example: 'How beautiful!' },
    { word: 'different', phonetic: '/ˈdɪfrənt/', meaning: '不同的', past: null, example: 'We are different.' },
    { word: 'furniture', phonetic: '/ˈfɜːrnɪtʃər/', meaning: '家具', past: null, example: 'New furniture.' },
    { word: 'guardian', phonetic: '/ˈɡɑːrdiən/', meaning: '守护者', past: null, example: 'My guardian angel.' },
    { word: 'heritage', phonetic: '/ˈherɪtɪdʒ/', meaning: '遗产', past: null, example: 'Cultural heritage.' },
    { word: 'notebook', phonetic: '/ˈnoʊtbʊk/', meaning: '笔记本', past: null, example: 'I have a notebook.' },
    { word: 'question', phonetic: '/ˈkwestʃən/', meaning: '问题', past: null, example: 'Ask a question.' },
    { word: 'tradition', phonetic: '/trəˈdɪʃən/', meaning: '传统', past: null, example: 'It is a tradition.' },
    { word: 'valuable', phonetic: '/ˈvæljuəbəl/', meaning: '有价值的', past: null, example: 'This is valuable.' },
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
    const hashA = (a.word.charCodeAt(0) * 31 + a.word.charCodeAt(1) * 17 + seed) % 100;
    const hashB = (b.word.charCodeAt(0) * 31 + b.word.charCodeAt(1) * 17 + seed) % 100;
    return hashA - hashB;
  });
  const words = shuffled.slice(0, wordCount);

  // 选择故事
  const stories = STORY_TEMPLATES[realm.id] || STORY_TEMPLATES.fanren;
  const story = stories[(idx - 1) % stories.length];

  // 难度配置
  const extraLetters = Math.min(8, Math.floor(stage / 15) + 2);

  // 计算槽位数：单词总字母数 + 2个错误位
  const totalWordLetters = words.reduce((sum, w) => sum + w.word.length, 0);
  const maxSlots = Math.min(12, totalWordLetters + 2);

  return {
    stage,
    realm,
    story,
    words: words.map(w => ({
      word: w.word,
      meaning: w.meaning,
      phonetic: w.phonetic,
      past: w.past,
      example: w.example,
    })),
    wordCount,
    extraLetters,
    maxSlots,
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
