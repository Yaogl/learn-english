/**
 * 关卡数据 - 12境界 × 20-30关
 * 每关：故事、单词、难度配置
 */

// 境界定义
const REALMS = [
  { id: 'fanren', name: '凡人', icon: '🌿', desc: '初入仙途，初识修行', color: '#6bcb77', startStage: 1, endStage: 10 },
  { id: 'lianqi', name: '练气', icon: '💨', desc: '灵气入体，正式踏入仙途', color: '#4d96ff', startStage: 11, endStage: 25 },
  { id: 'zhuji', name: '筑基', icon: '🏔️', desc: '根基成型，拥有正式仙力', color: '#4dffe8', startStage: 26, endStage: 45 },
  { id: 'jindan', name: '金丹', icon: '✨', desc: '凝结金丹，成为一方强者', color: '#ffd700', startStage: 46, endStage: 70 },
  { id: 'yuanying', name: '元婴', icon: '👶', desc: '元神凝聚，可元神出窍', color: '#ff9500', startStage: 71, endStage: 90 },
  { id: 'huashen', name: '化神', icon: '🔥', desc: '感悟天地法则，行走大千世界', color: '#c084fc', startStage: 91, endStage: 110 },
  { id: 'lianxu', name: '炼虚', icon: '🌀', desc: '炼化天地灵气，闯天道试炼', color: '#9eb0c9', startStage: 111, endStage: 120 },
  { id: 'heti', name: '合体', icon: '⚔️', desc: '肉身与灵力合一，镇压上古凶兽', color: '#ff6b9d', startStage: 121, endStage: 130 },
  { id: 'dacheng', name: '大乘', icon: '🌟', desc: '行走九天，收集九天神草', color: '#ff9500', startStage: 131, endStage: 140 },
  { id: 'dujie', name: '渡劫', icon: '⚡', desc: '天劫将至，抵御雷劫', color: '#ff6b6b', startStage: 141, endStage: 170 },
  { id: 'dixian', name: '地仙', icon: '🌍', desc: '位列地仙，执掌一方天地', color: '#b8a898', startStage: 171, endStage: 190 },
  { id: 'tianxian', name: '天仙', icon: '👑', desc: '功行圆满，羽化登仙', color: '#ffd700', startStage: 191, endStage: 200 },
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
    // ===== 新增基础词汇 =====
    { word: 'arm', phonetic: '/ɑːrm/', meaning: '手臂', past: null, example: 'My arm is strong.' },
    { word: 'ear', phonetic: '/ɪr/', meaning: '耳朵', past: null, example: 'I hear with my ear.' },
    { word: 'eye', phonetic: '/aɪ/', meaning: '眼睛', past: null, example: 'Close your eyes.' },
    { word: 'egg', phonetic: '/eɡ/', meaning: '鸡蛋', past: null, example: 'I eat an egg.' },
    { word: 'ice', phonetic: '/aɪs/', meaning: '冰', past: null, example: 'The ice is cold.' },
    { word: 'old', phonetic: '/oʊld/', meaning: '老的', past: null, example: 'The tree is old.' },
    { word: 'new', phonetic: '/nuː/', meaning: '新的', past: null, example: 'I have a new book.' },
    { word: 'try', phonetic: '/traɪ/', meaning: '尝试', past: 'tried', example: 'Try your best.' },
    { word: 'ask', phonetic: '/æsk/', meaning: '问', past: 'asked', example: 'Ask a question.' },
    { word: 'put', phonetic: '/pʊt/', meaning: '放', past: 'put', example: 'Put it here.' },
    { word: 'cut', phonetic: '/kʌt/', meaning: '切', past: 'cut', example: 'Cut the paper.' },
    { word: 'let', phonetic: '/let/', meaning: '让', past: 'let', example: 'Let me try.' },
    { word: 'get', phonetic: '/ɡet/', meaning: '得到', past: 'got', example: 'I get it.' },
    { word: 'ball', phonetic: '/bɔːl/', meaning: '球', past: null, example: 'Kick the ball.' },
    { word: 'call', phonetic: '/kɔːl/', meaning: '打电话', past: 'called', example: 'Call me later.' },
    { word: 'fall', phonetic: '/fɔːl/', meaning: '落下', past: 'fell', example: 'Leaves fall down.' },
    { word: 'wall', phonetic: '/wɔːl/', meaning: '墙', past: null, example: 'On the wall.' },
    { word: 'back', phonetic: '/bæk/', meaning: '回来', past: null, example: 'Come back.' },
    { word: 'face', phonetic: '/feɪs/', meaning: '脸', past: null, example: 'Wash your face.' },
    { word: 'hand', phonetic: '/hænd/', meaning: '手', past: null, example: 'Raise your hand.' },
    { word: 'head', phonetic: '/hed/', meaning: '头', past: null, example: 'Nod your head.' },
    { word: 'help', phonetic: '/help/', meaning: '帮助', past: 'helped', example: 'Help me please.' },
    { word: 'jump', phonetic: '/dʒʌmp/', meaning: '跳', past: 'jumped', example: 'Jump high!' },
    { word: 'keep', phonetic: '/kiːp/', meaning: '保持', past: 'kept', example: 'Keep quiet.' },
    { word: 'kind', phonetic: '/kaɪnd/', meaning: '善良的', past: null, example: 'She is kind.' },
    { word: 'like', phonetic: '/laɪk/', meaning: '喜欢', past: 'liked', example: 'I like it.' },
    { word: 'look', phonetic: '/lʊk/', meaning: '看', past: 'looked', example: 'Look at me.' },
    { word: 'love', phonetic: '/lʌv/', meaning: '爱', past: 'loved', example: 'I love you.' },
    { word: 'make', phonetic: '/meɪk/', meaning: '制作', past: 'made', example: 'Make a cake.' },
    { word: 'move', phonetic: '/muːv/', meaning: '移动', past: 'moved', example: 'Move it here.' },
    { word: 'need', phonetic: '/niːd/', meaning: '需要', past: 'needed', example: 'I need help.' },
    { word: 'open', phonetic: '/ˈoʊpən/', meaning: '打开', past: 'opened', example: 'Open the door.' },
    { word: 'pick', phonetic: '/pɪk/', meaning: '挑选', past: 'picked', example: 'Pick one.' },
    { word: 'ride', phonetic: '/raɪd/', meaning: '骑', past: 'rode', example: 'Ride a bike.' },
    { word: 'sing', phonetic: '/sɪŋ/', meaning: '唱歌', past: 'sang', example: 'Sing a song.' },
    { word: 'swim', phonetic: '/swɪm/', meaning: '游泳', past: 'swam', example: 'I can swim.' },
    { word: 'take', phonetic: '/teɪk/', meaning: '拿', past: 'took', example: 'Take this.' },
    { word: 'talk', phonetic: '/tɔːk/', meaning: '说话', past: 'talked', example: 'Let us talk.' },
    { word: 'tell', phonetic: '/tel/', meaning: '告诉', past: 'told', example: 'Tell me why.' },
    { word: 'turn', phonetic: '/tɜːrn/', meaning: '转', past: 'turned', example: 'Turn left.' },
    { word: 'walk', phonetic: '/wɔːk/', meaning: '走', past: 'walked', example: 'Walk slowly.' },
    { word: 'want', phonetic: '/wɒnt/', meaning: '想要', past: 'wanted', example: 'I want it.' },
    { word: 'wash', phonetic: '/wɒʃ/', meaning: '洗', past: 'washed', example: 'Wash your hands.' },
    { word: 'work', phonetic: '/wɜːrk/', meaning: '工作', past: 'worked', example: 'I work hard.' },
    { word: 'year', phonetic: '/jɪr/', meaning: '年', past: null, example: 'Happy new year.' },
    { word: 'your', phonetic: '/jʊr/', meaning: '你的', past: null, example: 'Your turn.' },
    { word: 'star', phonetic: '/stɑːr/', meaning: '星星', past: null, example: 'A bright star.' },
    { word: 'moon', phonetic: '/muːn/', meaning: '月亮', past: null, example: 'The moon is bright.' },
    { word: 'fire', phonetic: '/ˈfaɪər/', meaning: '火', past: null, example: 'Fire is hot.' },
    { word: 'king', phonetic: '/kɪŋ/', meaning: '国王', past: null, example: 'The king smiles.' },
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
    // ===== 新增进阶词汇 =====
    { word: 'about', phonetic: '/əˈbaʊt/', meaning: '关于', past: null, example: 'Tell me about it.' },
    { word: 'after', phonetic: '/ˈæftər/', meaning: '之后', past: null, example: 'After school.' },
    { word: 'again', phonetic: '/əˈɡen/', meaning: '再', past: null, example: 'Try again.' },
    { word: 'begin', phonetic: '/bɪˈɡɪn/', meaning: '开始', past: 'began', example: 'Let us begin.' },
    { word: 'bring', phonetic: '/brɪŋ/', meaning: '带来', past: 'brought', example: 'Bring it here.' },
    { word: 'carry', phonetic: '/ˈkæri/', meaning: '携带', past: 'carried', example: 'Carry the box.' },
    { word: 'clean', phonetic: '/kliːn/', meaning: '干净的', past: 'cleaned', example: 'Clean the room.' },
    { word: 'climb', phonetic: '/klaɪm/', meaning: '爬', past: 'climbed', example: 'Climb the tree.' },
    { word: 'close', phonetic: '/kloʊz/', meaning: '关闭', past: 'closed', example: 'Close the door.' },
    { word: 'draw', phonetic: '/drɔː/', meaning: '画', past: 'drew', example: 'Draw a picture.' },
    { word: 'drink', phonetic: '/drɪŋk/', meaning: '喝', past: 'drank', example: 'Drink water.' },
    { word: 'early', phonetic: '/ˈɜːrli/', meaning: '早的', past: null, example: 'Wake up early.' },
    { word: 'earth', phonetic: '/ɜːrθ/', meaning: '地球', past: null, example: 'The earth is round.' },
    { word: 'every', phonetic: '/ˈevri/', meaning: '每个', past: null, example: 'Every day.' },
    { word: 'fruit', phonetic: '/fruːt/', meaning: '水果', past: null, example: 'I like fruit.' },
    { word: 'grow', phonetic: '/ɡroʊ/', meaning: '生长', past: 'grew', example: 'Plants grow.' },
    { word: 'guess', phonetic: '/ɡes/', meaning: '猜', past: 'guessed', example: 'Guess what?' },
    { word: 'heart', phonetic: '/hɑːrt/', meaning: '心', past: null, example: 'My heart beats.' },
    { word: 'heavy', phonetic: '/ˈhevi/', meaning: '重的', past: null, example: 'It is heavy.' },
    { word: 'learn', phonetic: '/lɜːrn/', meaning: '学习', past: 'learned', example: 'Learn English.' },
    { word: 'leave', phonetic: '/liːv/', meaning: '离开', past: 'left', example: 'I must leave.' },
    { word: 'money', phonetic: '/ˈmʌni/', meaning: '钱', past: null, example: 'Save money.' },
    { word: 'month', phonetic: '/mʌnθ/', meaning: '月', past: null, example: 'This month.' },
    { word: 'night', phonetic: '/naɪt/', meaning: '夜晚', past: null, example: 'Good night.' },
    { word: 'paper', phonetic: '/ˈpeɪpər/', meaning: '纸', past: null, example: 'A piece of paper.' },
    { word: 'plant', phonetic: '/plænt/', meaning: '植物', past: 'planted', example: 'Plant a tree.' },
    { word: 'quiet', phonetic: '/ˈkwaɪət/', meaning: '安静的', past: null, example: 'Be quiet.' },
    { word: 'right', phonetic: '/raɪt/', meaning: '正确的', past: null, example: 'That is right.' },
    { word: 'share', phonetic: '/ʃer/', meaning: '分享', past: 'shared', example: 'Share with me.' },
    { word: 'sleep', phonetic: '/sliːp/', meaning: '睡觉', past: 'slept', example: 'I need sleep.' },
    { word: 'smile', phonetic: '/smaɪl/', meaning: '微笑', past: 'smiled', example: 'She smiles.' },
    { word: 'space', phonetic: '/speɪs/', meaning: '空间', past: null, example: 'Outer space.' },
    { word: 'spend', phonetic: '/spend/', meaning: '花费', past: 'spent', example: 'Spend time.' },
    { word: 'start', phonetic: '/stɑːrt/', meaning: '开始', past: 'started', example: 'Start now.' },
    { word: 'story', phonetic: '/ˈstɔːri/', meaning: '故事', past: null, example: 'Tell a story.' },
    { word: 'study', phonetic: '/ˈstʌdi/', meaning: '学习', past: 'studied', example: 'Study hard.' },
    { word: 'think', phonetic: '/θɪŋk/', meaning: '想', past: 'thought', example: 'I think so.' },
    { word: 'tired', phonetic: '/taɪərd/', meaning: '累的', past: null, example: 'I am tired.' },
    { word: 'today', phonetic: '/təˈdeɪ/', meaning: '今天', past: null, example: 'Today is Monday.' },
    { word: 'visit', phonetic: '/ˈvɪzɪt/', meaning: '拜访', past: 'visited', example: 'Visit grandma.' },
    { word: 'watch', phonetic: '/wɒtʃ/', meaning: '观看', past: 'watched', example: 'Watch TV.' },
    { word: 'white', phonetic: '/waɪt/', meaning: '白色', past: null, example: 'Snow is white.' },
    { word: 'world', phonetic: '/wɜːrld/', meaning: '世界', past: null, example: 'Around the world.' },
    { word: 'young', phonetic: '/jʌŋ/', meaning: '年轻的', past: null, example: 'She is young.' },
    { word: 'beach', phonetic: '/biːtʃ/', meaning: '海滩', past: null, example: 'On the beach.' },
    { word: 'dream', phonetic: '/driːm/', meaning: '梦', past: 'dreamed', example: 'Sweet dreams.' },
    { word: 'grape', phonetic: '/ɡreɪp/', meaning: '葡萄', past: null, example: 'I like grapes.' },
    { word: 'lemon', phonetic: '/ˈlemən/', meaning: '柠檬', past: null, example: 'A sour lemon.' },
    { word: 'mango', phonetic: '/ˈmæŋɡoʊ/', meaning: '芒果', past: null, example: 'A sweet mango.' },
    { word: 'peach', phonetic: '/piːtʃ/', meaning: '桃子', past: null, example: 'A juicy peach.' },
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
    // ===== 新增高阶词汇 =====
    { word: 'airport', phonetic: '/ˈerpɔːrt/', meaning: '机场', past: null, example: 'Go to the airport.' },
    { word: 'already', phonetic: '/ɔːlˈredi/', meaning: '已经', past: null, example: 'I already know.' },
    { word: 'bottle', phonetic: '/ˈbɒtəl/', meaning: '瓶子', past: null, example: 'A water bottle.' },
    { word: 'bridge', phonetic: '/brɪdʒ/', meaning: '桥', past: null, example: 'Cross the bridge.' },
    { word: 'castle', phonetic: '/ˈkæsəl/', meaning: '城堡', past: null, example: 'A big castle.' },
    { word: 'clever', phonetic: '/ˈklevər/', meaning: '聪明的', past: null, example: 'She is clever.' },
    { word: 'collect', phonetic: '/kəˈlekt/', meaning: '收集', past: 'collected', example: 'Collect stamps.' },
    { word: 'company', phonetic: '/ˈkʌmpəni/', meaning: '公司', past: null, example: 'A big company.' },
    { word: 'country', phonetic: '/ˈkʌntri/', meaning: '国家', past: null, example: 'My country.' },
    { word: 'cousin', phonetic: '/ˈkʌzən/', meaning: '表亲', past: null, example: 'My cousin.' },
    { word: 'crystal', phonetic: '/ˈkrɪstəl/', meaning: '水晶', past: null, example: 'A crystal ball.' },
    { word: 'culture', phonetic: '/ˈkʌltʃər/', meaning: '文化', past: null, example: 'Chinese culture.' },
    { word: 'danger', phonetic: '/ˈdeɪndʒər/', meaning: '危险', past: null, example: 'Be careful!' },
    { word: 'desert', phonetic: '/ˈdezərt/', meaning: '沙漠', past: null, example: 'A hot desert.' },
    { word: 'develop', phonetic: '/dɪˈveləp/', meaning: '发展', past: 'developed', example: 'Develop skills.' },
    { word: 'diamond', phonetic: '/ˈdaɪəmənd/', meaning: '钻石', past: null, example: 'A shining diamond.' },
    { word: 'dinosaur', phonetic: '/ˈdaɪnəsɔːr/', meaning: '恐龙', past: null, example: 'A big dinosaur.' },
    { word: 'discover', phonetic: '/dɪˈskʌvər/', meaning: '发现', past: 'discovered', example: 'Discover new things.' },
    { word: 'dragon', phonetic: '/ˈdræɡən/', meaning: '龙', past: null, example: 'A fire dragon.' },
    { word: 'escape', phonetic: '/ɪˈskeɪp/', meaning: '逃跑', past: 'escaped', example: 'Escape from here.' },
    { word: 'example', phonetic: '/ɪɡˈzæmpəl/', meaning: '例子', past: null, example: 'Give an example.' },
    { word: 'explore', phonetic: '/ɪkˈsplɔːr/', meaning: '探索', past: 'explored', example: 'Explore the world.' },
    { word: 'famous', phonetic: '/ˈfeɪməs/', meaning: '著名的', past: null, example: 'A famous person.' },
    { word: 'feather', phonetic: '/ˈfeðər/', meaning: '羽毛', past: null, example: 'A soft feather.' },
    { word: 'finger', phonetic: '/ˈfɪŋɡər/', meaning: '手指', past: null, example: 'Point your finger.' },
    { word: 'flight', phonetic: '/flaɪt/', meaning: '航班', past: null, example: 'A long flight.' },
    { word: 'follow', phonetic: '/ˈfɒloʊ/', meaning: '跟随', past: 'followed', example: 'Follow me.' },
    { word: 'freeze', phonetic: '/friːz/', meaning: '冻结', past: 'froze', example: 'Water freezes.' },
    { word: 'future', phonetic: '/ˈfjuːtʃər/', meaning: '未来', past: null, example: 'In the future.' },
    { word: 'gentle', phonetic: '/ˈdʒentəl/', meaning: '温柔的', past: null, example: 'She is gentle.' },
    { word: 'golden', phonetic: '/ˈɡoʊldən/', meaning: '金色的', past: null, example: 'Golden sun.' },
    { word: 'guitar', phonetic: '/ɡɪˈtɑːr/', meaning: '吉他', past: null, example: 'Play the guitar.' },
    { word: 'honest', phonetic: '/ˈɒnɪst/', meaning: '诚实的', past: null, example: 'Be honest.' },
    { word: 'jungle', phonetic: '/ˈdʒʌŋɡəl/', meaning: '丛林', past: null, example: 'In the jungle.' },
    { word: 'kingdom', phonetic: '/ˈkɪŋdəm/', meaning: '王国', past: null, example: 'A magic kingdom.' },
    { word: 'ladder', phonetic: '/ˈlædər/', meaning: '梯子', past: null, example: 'Climb the ladder.' },
    { word: 'launch', phonetic: '/lɔːntʃ/', meaning: '发射', past: 'launched', example: 'Launch the rocket.' },
    { word: 'market', phonetic: '/ˈmɑːrkɪt/', meaning: '市场', past: null, example: 'The market is busy.' },
    { word: 'master', phonetic: '/ˈmæstər/', meaning: '大师', past: null, example: 'A kung fu master.' },
    { word: 'mirror', phonetic: '/ˈmɪrər/', meaning: '镜子', past: null, example: 'Look in the mirror.' },
    { word: 'modern', phonetic: '/ˈmɒdərn/', meaning: '现代的', past: null, example: 'Modern technology.' },
    { word: 'monkey', phonetic: '/ˈmʌŋki/', meaning: '猴子', past: null, example: 'A funny monkey.' },
    { word: 'planet', phonetic: '/ˈplænɪt/', meaning: '行星', past: null, example: 'A blue planet.' },
    { word: 'silver', phonetic: '/ˈsɪlvər/', meaning: '银色', past: null, example: 'A silver ring.' },
    { word: 'spirit', phonetic: '/ˈspɪrɪt/', meaning: '精神', past: null, example: 'Team spirit.' },
    { word: 'temple', phonetic: '/ˈtempəl/', meaning: '寺庙', past: null, example: 'An old temple.' },
    { word: 'travel', phonetic: '/ˈtrævəl/', meaning: '旅行', past: 'traveled', example: 'Travel the world.' },
    { word: 'village', phonetic: '/ˈvɪlɪdʒ/', meaning: '村庄', past: null, example: 'A small village.' },
    { word: 'winter', phonetic: '/ˈwɪntər/', meaning: '冬天', past: null, example: 'Winter is cold.' },
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
    // ===== 新增精英词汇 =====
    { word: 'absolute', phonetic: '/ˈæbsəluːt/', meaning: '绝对的', past: null, example: 'Absolute power.' },
    { word: 'accurate', phonetic: '/ˈækjərət/', meaning: '准确的', past: null, example: 'Accurate data.' },
    { word: 'ambition', phonetic: '/æmˈbɪʃən/', meaning: '野心', past: null, example: 'Big ambition.' },
    { word: 'analysis', phonetic: '/əˈnæləsɪs/', meaning: '分析', past: null, example: 'Data analysis.' },
    { word: 'ancient', phonetic: '/ˈeɪnʃənt/', meaning: '古代的', past: null, example: 'Ancient history.' },
    { word: 'announce', phonetic: '/əˈnaʊns/', meaning: '宣布', past: 'announced', example: 'Announce the news.' },
    { word: 'approach', phonetic: '/əˈproʊtʃ/', meaning: '方法', past: 'approached', example: 'A new approach.' },
    { word: 'argument', phonetic: '/ˈɑːrɡjəmənt/', meaning: '争论', past: null, example: 'A strong argument.' },
    { word: 'campaign', phonetic: '/kæmˈpeɪn/', meaning: '运动', past: null, example: 'A campaign.' },
    { word: 'capacity', phonetic: '/kəˈpæsəti/', meaning: '容量', past: null, example: 'Full capacity.' },
    { word: 'category', phonetic: '/ˈkætəɡɔːri/', meaning: '类别', past: null, example: 'A new category.' },
    { word: 'cautious', phonetic: '/ˈkɔːʃəs/', meaning: '谨慎的', past: null, example: 'Be cautious.' },
    { word: 'ceremony', phonetic: '/ˈserəmoʊni/', meaning: '仪式', past: null, example: 'A ceremony.' },
    { word: 'champion', phonetic: '/ˈtʃæmpiən/', meaning: '冠军', past: null, example: 'A champion.' },
    { word: 'chemical', phonetic: '/ˈkemɪkəl/', meaning: '化学的', past: null, example: 'Chemical reaction.' },
    { word: 'collapse', phonetic: '/kəˈlæps/', meaning: '倒塌', past: 'collapsed', example: 'The bridge collapsed.' },
    { word: 'commerce', phonetic: '/ˈkɒmɜːrs/', meaning: '商业', past: null, example: 'International commerce.' },
    { word: 'complain', phonetic: '/kəmˈpleɪn/', meaning: '抱怨', past: 'complained', example: 'Do not complain.' },
    { word: 'conclude', phonetic: '/kənˈkluːd/', meaning: '总结', past: 'concluded', example: 'Conclude the meeting.' },
    { word: 'concrete', phonetic: '/ˈkɒnkriːt/', meaning: '具体的', past: null, example: 'Concrete evidence.' },
    { word: 'conflict', phonetic: '/ˈkɒnflɪkt/', meaning: '冲突', past: null, example: 'A conflict.' },
    { word: 'consider', phonetic: '/kənˈsɪdər/', meaning: '考虑', past: 'considered', example: 'Consider this.' },
    { word: 'constant', phonetic: '/ˈkɒnstənt/', meaning: '不变的', past: null, example: 'A constant value.' },
    { word: 'consumer', phonetic: '/kənˈsjuːmər/', meaning: '消费者', past: null, example: 'A consumer.' },
    { word: 'contrast', phonetic: '/ˈkɒntræst/', meaning: '对比', past: null, example: 'In contrast.' },
    { word: 'convince', phonetic: '/kənˈvɪns/', meaning: '说服', past: 'convinced', example: 'Convince him.' },
    { word: 'corridor', phonetic: '/ˈkɔːrɪdɔːr/', meaning: '走廊', past: null, example: 'In the corridor.' },
    { word: 'creature', phonetic: '/ˈkriːtʃər/', meaning: '生物', past: null, example: 'A strange creature.' },
    { word: 'criminal', phonetic: '/ˈkrɪmɪnəl/', meaning: '罪犯', past: null, example: 'A criminal.' },
    { word: 'critical', phonetic: '/ˈkrɪtɪkəl/', meaning: '关键的', past: null, example: 'Critical moment.' },
    { word: 'daughter', phonetic: '/ˈdɔːtər/', meaning: '女儿', past: null, example: 'My daughter.' },
    { word: 'deadline', phonetic: '/ˈdedlaɪn/', meaning: '截止日期', past: null, example: 'Meet the deadline.' },
    { word: 'decrease', phonetic: '/dɪˈkriːs/', meaning: '减少', past: 'decreased', example: 'Decrease the cost.' },
    { word: 'definite', phonetic: '/ˈdefɪnət/', meaning: '明确的', past: null, example: 'A definite answer.' },
    { word: 'democrat', phonetic: '/ˈdeməkræt/', meaning: '民主主义者', past: null, example: 'A democrat.' },
    { word: 'describe', phonetic: '/dɪˈskraɪb/', meaning: '描述', past: 'described', example: 'Describe it.' },
    { word: 'designer', phonetic: '/dɪˈzaɪnər/', meaning: '设计师', past: null, example: 'A fashion designer.' },
    { word: 'dialogue', phonetic: '/ˈdaɪəlɒɡ/', meaning: '对话', past: null, example: 'A dialogue.' },
    { word: 'dimension', phonetic: '/dɪˈmenʃən/', meaning: '维度', past: null, example: 'Another dimension.' },
    { word: 'direction', phonetic: '/dɪˈrekʃən/', meaning: '方向', past: null, example: 'Which direction?' },
    { word: 'director', phonetic: '/dɪˈrektər/', meaning: '导演', past: null, example: 'A film director.' },
    { word: 'disaster', phonetic: '/dɪˈzæstər/', meaning: '灾难', past: null, example: 'A natural disaster.' },
    { word: 'discount', phonetic: '/ˈdɪskaʊnt/', meaning: '折扣', past: null, example: 'A big discount.' },
    { word: 'discover', phonetic: '/dɪˈskʌvər/', meaning: '发现', past: 'discovered', example: 'Discover the truth.' },
    { word: 'disorder', phonetic: '/dɪsˈɔːrdər/', meaning: '混乱', past: null, example: 'In disorder.' },
    { word: 'district', phonetic: '/ˈdɪstrɪkt/', meaning: '地区', past: null, example: 'A school district.' },
    { word: 'document', phonetic: '/ˈdɒkjəmənt/', meaning: '文件', past: null, example: 'A document.' },
    { word: 'domestic', phonetic: '/dəˈmestɪk/', meaning: '国内的', past: null, example: 'Domestic flights.' },
    { word: 'dominant', phonetic: '/ˈdɒmɪnənt/', meaning: '占主导的', past: null, example: 'A dominant position.' },
    { word: 'dramatic', phonetic: '/drəˈmætɪk/', meaning: '戏剧性的', past: null, example: 'A dramatic change.' },
  ],
};

// 故事模板 — 小滢修仙记（搞笑修仙风）
const STORY_TEMPLATES = {
  fanren: [
    '小滢一觉醒来穿越了！面前一堆发光的草，她以为是荧光棒，啃了一口——哇，好苦！原来这就是灵草啊。',
    '路边蹦出一只会说话的兔子，朝小滢做鬼脸。小滢追着它跑了三座山，结果自己学会了轻功！',
    '村口大爷腰疼，小滢摘了一堆野菜炖汤，大爷喝完不但腰好了，还返老还童变成了帅小伙，全村惊呆。',
    '小滢发现一株会跳舞的灵草，追了半天灵草累得跳不动了，两人握手言和，灵草自己跳进了篮子。',
    '山里窜出几只小狐狸精，朝小滢抛媚眼。小滢掏出一根鸡腿诱惑它们，狐狸精秒变哈巴狗排队跟她走。',
    '下雨后山上长满蘑菇，小滢采了一箩筐。有一只是蘑菇精，被采后哇哇大哭，小滢把它种回去还浇了灵泉水。',
    '前路被藤蔓堵住，小滢使劲拽藤蔓结果弹回来把自己弹飞了。她拿剪刀一根根剪，藤蔓害羞地自己缩回去了。',
    '一只迷路的小灵兔哭鼻子，小滢用灵果哄开心了。灵兔送了她一颗亮晶晶的石头，小滢一咬——崩掉半颗牙，是灵矿石！',
    '小滢捡到一本《修仙入门指南》，翻开写着"深呼吸"。她深吸一口气吸进一只蚊子，不过确实感觉到体内有暖流了。',
    '突破时刻！小滢盘腿打坐三天三夜，结果睡着了。梦里仙人教她运气，醒来发现自己踏入练气境——原来睡觉也能修仙！',
  ],
  lianqi: [
    '练气成功！小滢想秀御物术，结果把师父的假发吹飞了。师父表面微笑内心滴血，罚她采一百株灵草赔罪。',
    '山林里出现毒蚊妖兽，小滢被叮了满头包。她抄起芭蕉扇一顿猛扇，蚊子们被吹到隔壁山头去了。',
    '炼丹师兄急需灵花，花田被蜜蜂妖兽占领。小滢掏出糖葫芦，蜜蜂们瞬间叛变乖乖让出花田。',
    '溪流里有灵蚌，小滢跳下去摸蚌被夹住了手指。她甩了半天甩不掉，最后用灵力把蚌震晕，蚌珠到手手指肿了三天。',
    '一头野狼妖兽挡路，小滢爬上树。狼不会爬树在下面转圈圈，小滢在树上丢松果砸了三百颗把狼砸晕了。',
    '悬崖边有株灵草，小滢用鞋带绑住树枝做绳子够到了，结果鞋带断了——幸好她已经学会轻功！',
    '一群飞虫嗡嗡叫，小滢使出"灵气护体"想挡住，结果灵气太弱虫子直接穿过去了。她只好用最原始的办法——拍蚊子。',
    '师兄让小滢砍灵木做法器，她砍了一天纹丝不动。隔壁大叔递给她一把附了灵力的斧头，三下就砍倒了。',
    '沼泽地里长满毒草，小滢踩进去陷到膝盖。拼命挣扎越陷越深，最后一只大乌龟把她驮出来，代价是帮乌龟挠了一刻钟痒痒。',
    '二阶灵狐拦路要过路费，小滢翻遍口袋只有一块饼干。灵狐咬了一口眼睛亮了——从此成了小滢的跟班。',
    '满山灵果熟了，小滢边摘边吃吃到打嗝都是灵气。师兄说吃太多会撑爆，她吓得原地蹦了三百下消耗灵气。',
    '石洞里盘着一条小蛇妖，小滢和它大眼瞪小眼对视了半天。小蛇妖先眨眼了，愿赌服输让出洞府。',
    '小滢尝试炼丹把灵材全丢进炉子，点火——砰！炸炉了。满脸黑灰但炉子里居然凝出一颗歪歪扭扭的丹药。',
    '练气后期瓶颈，小滢气得对着山壁练拳打了三天。山壁碎了碎石里掉出一颗妖核，吸收后居然突破了。',
    '冲击筑基！小滢找个风水宝地打坐，坐到一半肚子咕咕叫。她吃完零食继续，居然在饱腹状态下成功筑基！',
  ],
  zhuji: [
    '筑基成功！小滢得意地去秘境探险，结果迷路了。在秘境里转了三天，最后循着烤肉香味找到出口——师兄在出口烤肉等她。',
    '秘境里石像守卫突然活了，小滢吓得尖叫。石像被她的高音震裂了一条缝，她趁机一脚踹过去，石像碎了一地。',
    '一位道友受伤急需灵草，小滢翻遍药篓找到一株——是她昨天啃剩的半根萝卜。道友吃完居然伤好了，萝卜里有灵气！',
    '丛林巨蜥挡路，小滢和它比谁眼睛瞪得大。瞪了一炷香，小滢眼睛酸得流泪，巨蜥主动让路——它从未见过这么能瞪的人类。',
    '千年灵藤缠着宝物，小滢用剪刀剪不断用火烧不动。她把灵藤当绳子跳了一百下，灵藤被跳散架了。',
    '迷雾林里出现幻象，小滢看到满桌美食正要开吃，突然想起自己在秘境里不可能有炸鸡。破除幻象后幻兽气得直跺脚。',
    '药谷灵药大丰收，小滢装满了十个篮子。回程背不动了，沿途种了一路灵草当路标，堪称"可持续发展修仙"。',
    '一群小妖来偷药，小滢在药田周围设了粘鼠板陷阱。小妖们踩上去全部被粘住，被小滢一个个教育后哭着保证不再偷。',
    '深潭水怪冒出来吓人，小滢吓得往后跳了三米。水怪一看没吓到自己也愣住了，被小滢丢的石头砸哭了——原来是个胆小的水怪。',
    '找到灵矿原石开始锻造法器。锤了三天打出来一个四不像，师兄说这是"抽象派法器"，威力不大但敌人看了会笑场。',
    '荒原上遇到疾风狼群，小滢骑上一只狼狂奔边跑边喊"狼来了"。其他狼以为同伴叛变了纷纷追上来，小滢趁乱溜走。',
    '绝壁上的仙芝在向她招手，爬到一半发现上面有只老鹰在孵蛋。她跟老鹰商量"借过一下"，老鹰居然听懂了挪了挪屁股。',
    '秘境机关要消除符文，小滢一个一个认真擦。擦到最后发现顺序反了机关重置了，她又擦了一遍这次边擦边数数终于过关。',
    '遇到散修在路边卖"祖传灵丹"，小滢尝了一颗——是薄荷糖。两人成了好朋友坐在路边分享零食。',
    '毒雾弥漫山谷，小滢用净世灵花驱散。花香太浓她自己先打了个大喷嚏，喷嚏的气浪居然把毒雾吹散了一大片。',
    '三阶猛虎妖兽守山口，小滢拿出"猫语"跟它沟通。猛虎听得一脸懵，小滢趁它发愣一拳打过去——没打动但猛虎被她的勇气打动了。',
    '灵花花蕊能炼凝神丹，小滢小心翼翼摘花。花粉飘进鼻子连打一百个喷嚏把周围的花全震落了，花瓣雨中完成采集。',
    '筑基巅峰在集市用灵石买了串糖葫芦，咬一口发现是灵果做的吃完修为涨了一点，她决定以后修仙就靠吃。',
    '集齐突破资源摆好阵势冲击金丹。结果太紧张放了个屁把灵阵吹歪了，师兄在旁边憋笑憋到内伤，小滢羞得原地突破了。',
    '金丹成！小滢激动地摸肚子感觉有颗小太阳。师兄说那是金丹不是怀孕，小滢白了他一眼从此踏上金丹大道。',
  ],
  jindan: [
    '金丹修士小滢进入中古秘境，灰尘呛得她打了三十个喷嚏。每次喷嚏都带灵气冲击波，把秘境灰尘全清干净了。',
    '上古灵草长在秘境核心周围全是机关。小滢闭着眼睛乱走居然完美避开所有机关——因为她根本没看路全靠第六感。',
    '铁甲熊妖力大无穷，小滢跟它掰手腕。掰了半个时辰双方握手言和，熊妖还请小滢吃了顿蜂蜜大餐。',
    '丹堂征集高阶药材，小滢把"歪瓜裂枣丹"交上去。堂主差点笑岔气但检测后发现药效意外地好，命名为"小滢特供丹"。',
    '暗影蝙蝠洞穴黑漆漆的，小滢点亮灵力当手电筒。蝙蝠们以为太阳出来了全部倒头就睡，她趁机搜刮了整个洞穴。',
    '冰原雪莲在暴风雪中绽放，小滢冻得直哆嗦。她围着雪莲跳了一段热身操，体温升高把雪融化了，雪莲感动地自己跳到她手里。',
    '邪修来抢灵物，小滢法宝拿反了发出灵光把自己晃花了眼。邪修笑得前仰后合，她趁机偷袭成功——这叫战术性失误。',
    '灵玉矿脉外露，小滢挖得满手茧。她抱怨修仙怎么跟搬砖一样累，师兄说"天将降大任于斯人也"，她回"天将降大任于搬砖人也"。',
    '毒蛟盘踞寒潭，小滢站在潭边喊"蛟龙出来单挑"。毒蛟探出头看了她一眼觉得太小不够塞牙缝懒得理她。',
    '秘境符文大阵启动，小滢消到一半手抽筋了。甩手的节奏正好激活了隐藏机关，意外获得了额外奖励。',
    '仙树结出圣果，小滢爬上去摘。果子太重把她从树上拽下来，她抱着果子滚了三十米起来后发现果子和她都完好无损。',
    '四足火兽烈焰缠身，小滢从包里掏出灵鱼干扔过去。火兽吃了眼睛亮了——从此成了她的宠物。',
    '师弟闭关遇阻，小滢送去灵药在瓶子上画了笑脸。师弟看到笑得岔气，但笑完心情舒畅居然突破了——"笑疗大师"。',
    '荒漠沙妖隐匿黄沙中找不到，小滢索性坐下吃零食。薯片碎屑掉进沙子里，沙妖闻到香味自己爬出来了。',
    '九叶灵参现世！小滢追着灵参跑了九座山。灵参跑累了说"算了跟你走吧，你太能跑了"。',
    '妖兽群潮来袭，小滢站在城墙上大喊"你们过来呀"。妖兽们被气势震慑犹豫不敢上前，她趁机用灵力把前排全弹飞了。',
    '海底灵藻在深海里，小滢憋了一口气潜下去。头发被水草缠住挣扎半天才脱身，灵藻自己飘过来了——它也想看看这个笨手笨脚的人类。',
    '修复护山大阵需要阵眼灵材，小滢找遍全山只找到一块鹅卵石。她把灵力灌进去鹅卵石居然亮了——原来是被遗忘的远古阵眼。',
    '金丹后期筹备元婴突破，她列清单第一条"保持好心情"第二条"多吃零食"。师兄看了直摇头但说不出哪里不对。',
    '走遍四方秘境收集奇珍，背包塞得鼓鼓囊囊。路上遇到劫匪她把包打开——里面全是吃的，劫匪无语放她走了。',
    '遭遇老牌妖兽阻拦，小滢摆出架势准备大战。结果妖兽打了个哈欠说"今天没心情"转身就走了——这算赢了还是没赢？',
    '炼制固元神丹火候没控制好，丹药变成了软糖但意外地好吃。师兄师弟们抢着要，小滢决定改行开零食店。',
    '天地灵气汇聚突破时机已到。小滢深呼吸准备打坐突然想起忘了关炉子上的汤，跑去关火回来继续突破，元婴居然在手忙脚乱中成形了。',
    '闭关冲击元婴坐到第七天，肚子咕咕叫得比雷声还响。睁开眼发现洞外师兄们都在偷笑——肚子声传遍了整座山。',
    '元婴成！小滢感觉轻飘飘低头一看——元婴从头顶冒出来了长得跟她一模一样，还朝她做了个鬼脸。她跟自己的元婴吵了一架谁才是本体。',
  ],
  yuanying: [
    '元婴出窍！小滢的元婴飘出去玩忘了回来的路。在天上飘了半天被一只老鹰当成猎物追着跑，最后灵体躲进云层才甩掉。',
    '上古遗迹里的石像战神苏醒了，小滢的元婴跟它比武。石像不会打灵体每一拳都穿过去了，小滢在旁边笑得前仰后合。',
    '千年仙药能滋养元神，小滢跑去采摘。仙药有守护灵蛇，她跟蛇谈判"分我一半"，蛇居然同意了一人一半皆大欢喜。',
    '域外小妖入侵，小滢一抬手就荡平了。她惊讶地看了看自己的手——原来元婴境这么强？早知道之前就不用追着妖兽跑那么久了。',
    '元婴圆满准备冲击化神。小滢盘腿打坐，元婴从头顶飘出来跟她一起打坐，两个"小滢"同时修炼进度翻倍。',
  ],
  huashen: [
    '化神成功！小滢领悟了天地法则一挥手就能呼风唤雨。结果第一次施展就下起暴雨把正在晒被子的师兄淋成了落汤鸡。',
    '远古巨兽苏醒，小滢用法则之力与之抗衡。巨兽打了个喷嚏把她吹飞了十里地，她爬起来拍拍灰说"这次不算风太大了"又冲了回去。',
    '炼制法则丹药把各种法则之力混在一起。丹药出炉时天降异象——下了一阵彩虹雨，全城的人都跑出来看，小滢成了网红炼丹师。',
    '道心稳固准备突破炼虚。她静坐感悟大道，元婴突然开口说"我饿了"，她只好先给元婴喂了颗灵果，大道在零食中圆满。',
  ],
  lianxu: [
    '炼虚融灵，小滢把天地灵气炼入体内。炼化过程太舒服了她差点睡着，元婴在旁边掐了她一下才醒——自带闹钟。',
    '合体归一，肉身与灵力合二为一。小滢感觉自己轻得能飞起来，结果真的飘了——飘到天上去了，师兄们拿绳子才把她拽下来。',
    '大乘在望行走九天收集神草。九天风景太美了她边采草边自拍，元婴也飘出来一起合影，两个"小滢"的合照成了修仙界最火明信片。',
    '天劫将至收集避雷灵物。她把自己裹成粽子浑身贴满避雷符，师兄说她像木乃伊，小滢说"木乃伊不怕雷我也不怕"。',
  ],
  heti: [
    '渡劫前夕扫清世间妖邪积累功德。她一边打妖兽一边念叨"这是为了功德不是因为我记仇"——虽然上次被妖兽追着跑的事她确实记着。',
    '雷海翻腾天劫降临！小滢裹着避雷符站在雷云下，第一道雷劈下来避雷符全烧了。她用消除之力把雷电消除了大半，剩下的靠金丹硬扛。',
    '渡劫成功！小滢浑身冒烟从雷云里走出来头发全炸了像个蒲公英。她看了看倒影笑了——"至少成功了就是造型不太好看"。',
  ],
  dacheng: [
    '大乘修为行走四方，小滢每到一处都留下传说。最出名的传说不是她多强，而是她每到一个秘境都能找到零食店。',
    '九天之上灵气浓郁，小滢在云层上打坐修炼。元婴飘出来在旁边跳舞助兴，两个"小滢"一个修炼一个表演堪称修仙界最奇特的风景。',
  ],
  dujie: [
    '天劫九重雷一重比一重猛。小滢被劈得外焦里嫩但她的金丹居然把雷电吸收了——原来金丹还能当充电宝用。',
    '最后一道天劫雷蕴含天道意志。小滢使出毕生所学连消带打，最后关头元婴跳出来挡了一雷，两个"小滢"一起扛过了天劫。',
    '天劫余波散去小滢成功渡劫。她浑身冒烟头发炸成蒲公英，师兄说她现在像行走的烟花——虽然好看但太危险了。',
  ],
  dixian: [
    '列位地仙小滢执掌一方天地。她把辖区治理得井井有条唯一的缺点是零食店太多了——她开的每条街都有一家。',
    '魔界余孽跨界入侵，小滢一掌拍过去魔物碎了一地。旁边的小仙童崇拜地看着她，小滢潇洒地甩了甩头发——结果甩出了一只藏在头发里的灵虫。',
    '地仙修炼日渐精进，小滢开始研究天地大道。她发现大道至简——就是把复杂的事情简单化，简单的事情零食化。',
  ],
  tianxian: [
    '集齐诸天灵物冲击仙道巅峰。小滢把收集了一路的宝贝全摆出来——灵参灵果灵石还有当年灵兔送的石头，她终于没舍得咬把它炼成了最珍贵的法宝。',
    '最后一战！天魔降临，小滢使出毕生所学。关键时刻元婴跳出来帮忙，两个小滢配合默契——毕竟吵了这么多年架彼此太了解了。',
    '天魔败退三界太平。小滢站在云端俯瞰大地想起第一天穿越时啃灵草的傻样。她笑着对元婴说："咱们终于修成正果了。"',
    '功行圆满羽化登仙！登仙大典上所有她帮助过的灵兔灵狐水怪沙妖都来了。小滢笑着说："修仙路上最大的收获不是成仙是交了你们这群朋友。"',
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
  // 8字母以下+2个灵槽，8字母及以上+3个灵槽
  const maxWordLen = Math.max(...words.map(w => w.word.length));
  const slotBonus = maxWordLen >= 8 ? 3 : 2;
  const maxSlots = Math.min(15, totalWordLetters + slotBonus);

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
