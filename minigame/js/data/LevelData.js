/**
 * 关卡数据 - 12境界 × 20-30关
 * 每关：故事、单词、难度配置
 * 试炼句对见 WordTrials.js（写死中英文，400 词全覆盖）
 */
import { WORD_TRIALS } from './WordTrials.js';

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
  // 难度1：5年级词汇（主力）
  easy: [
    // ===== 5年级 Unit1 餐饮饮食 =====
    { word: 'would', phonetic: '/wʊd/', meaning: '想要；愿意', past: null, example: 'I would like some water.' },
    { word: 'glad', phonetic: '/ɡlæd/', meaning: '高兴的', past: null, example: 'I am glad to see you.' },
    { word: 'together', phonetic: '/təˈɡeðə/', meaning: '一起', past: null, example: 'Let us play together.' },
    { word: 'hamburger', phonetic: '/ˈhæmbɜːɡə/', meaning: '汉堡包', past: null, example: 'I want a hamburger.' },
    { word: 'Coke', phonetic: '/kəʊk/', meaning: '可乐', past: null, example: 'I like Coke.' },
    { word: 'pie', phonetic: '/paɪ/', meaning: '馅饼', past: null, example: 'An apple pie.' },
    { word: 'drink', phonetic: '/drɪŋk/', meaning: '喝；饮品', past: 'drank', example: 'Drink some juice.' },
    { word: 'juice', phonetic: '/dʒuːs/', meaning: '果汁', past: null, example: 'I like orange juice.' },
    { word: 'or', phonetic: '/ɔː/', meaning: '或者', past: null, example: 'Tea or coffee?' },
    { word: 'enjoy', phonetic: '/ɪnˈdʒɔɪ/', meaning: '享用', past: 'enjoyed', example: 'Enjoy your meal.' },
    { word: 'sleepy', phonetic: '/ˈsliːpi/', meaning: '困倦的', past: null, example: 'I am sleepy.' },
    { word: 'bored', phonetic: '/bɔːd/', meaning: '烦闷的', past: null, example: 'I am bored.' },
    { word: 'noodles', phonetic: '/ˈnuːdlz/', meaning: '面条', past: null, example: 'I like noodles.' },
    { word: 'pizza', phonetic: '/ˈpiːtsə/', meaning: '披萨', past: null, example: 'Pizza is yummy.' },
    { word: 'lemonade', phonetic: '/ˌleməˈneɪd/', meaning: '柠檬汁', past: null, example: 'Cold lemonade.' },
    { word: 'hungry', phonetic: '/ˈhʌŋɡri/', meaning: '饥饿的', past: null, example: 'I am hungry.' },
    { word: 'corner', phonetic: '/ˈkɔːnə/', meaning: '拐角', past: null, example: 'Turn the corner.' },
    // ===== 5年级 Unit2 爱好与职业 =====
    { word: 'always', phonetic: '/ˈɔːlweɪz/', meaning: '总是', past: null, example: 'I always study.' },
    { word: 'usually', phonetic: '/ˈjuːʒuəli/', meaning: '通常', past: null, example: 'I usually walk.' },
    { word: 'never', phonetic: '/ˈnevə/', meaning: '从不', past: null, example: 'I never give up.' },
    { word: 'practice', phonetic: '/ˈpræktɪs/', meaning: '练习', past: 'practiced', example: 'Practice every day.' },
    { word: 'pool', phonetic: '/puːl/', meaning: '游泳池', past: null, example: 'Swim in the pool.' },
    { word: 'swimmer', phonetic: '/ˈswɪmə/', meaning: '游泳运动员', past: null, example: 'She is a swimmer.' },
    { word: 'pilot', phonetic: '/ˈpaɪlət/', meaning: '飞行员', past: null, example: 'He is a pilot.' },
    { word: 'fly', phonetic: '/flaɪ/', meaning: '驾驶（飞机）', past: 'flew', example: 'Birds fly high.' },
    { word: 'plane', phonetic: '/pleɪn/', meaning: '飞机', past: null, example: 'The plane is fast.' },
    { word: 'engineer', phonetic: '/ˌendʒɪˈnɪə/', meaning: '工程师', past: null, example: 'He is an engineer.' },
    { word: 'design', phonetic: '/dɪˈzaɪn/', meaning: '设计', past: 'designed', example: 'Design a house.' },
    { word: 'spaceship', phonetic: '/ˈspeɪsʃɪp/', meaning: '宇宙飞船', past: null, example: 'A cool spaceship.' },
    { word: 'artist', phonetic: '/ˈɑːtɪst/', meaning: '艺术家', past: null, example: 'She is an artist.' },
    { word: 'violinist', phonetic: '/ˌvaɪəˈlɪnɪst/', meaning: '小提琴手', past: null, example: 'A great violinist.' },
    { word: 'fantastic', phonetic: '/fænˈtæstɪk/', meaning: '极好的', past: null, example: 'That is fantastic!' },
    { word: 'hobby', phonetic: '/ˈhɒbi/', meaning: '爱好', past: null, example: 'My hobby is reading.' },
    { word: 'job', phonetic: '/dʒɒb/', meaning: '工作', past: null, example: 'A good job.' },
    { word: 'thought', phonetic: '/θɔːt/', meaning: '（think过去式）思考', past: 'thought', example: 'I thought about it.' },
    { word: 'sad', phonetic: '/sæd/', meaning: '难过的', past: null, example: 'I feel sad.' },
    { word: 'weekend', phonetic: '/ˌwiːkˈend/', meaning: '周末', past: null, example: 'Happy weekend!' },
    { word: 'hiking', phonetic: '/ˈhaɪkɪŋ/', meaning: '远足', past: null, example: 'Go hiking today.' },
    { word: 'family', phonetic: '/ˈfæməli/', meaning: '家人', past: null, example: 'I love my family.' },
    // ===== 5年级 Unit3 假期出行计划 =====
    { word: 'all', phonetic: '/ɔːl/', meaning: '全部', past: null, example: 'We all like it.' },
    { word: 'last', phonetic: '/lɑːst/', meaning: '上一个；最后的', past: null, example: 'Last week.' },
    { word: 'hear', phonetic: '/hɪə/', meaning: '听见', past: 'heard', example: 'I hear music.' },
    { word: 'plan', phonetic: '/plæn/', meaning: '计划', past: 'planned', example: 'Make a plan.' },
    { word: 'animal', phonetic: '/ˈænɪml/', meaning: '动物', past: null, example: 'I love animals.' },
    { word: 'farmer', phonetic: '/ˈfɑːmə/', meaning: '农民', past: null, example: 'He is a farmer.' },
    { word: 'vet', phonetic: '/vet/', meaning: '兽医', past: null, example: 'See the vet.' },
    { word: 'feed', phonetic: '/fiːd/', meaning: '喂养', past: 'fed', example: 'Feed the cat.' },
    { word: 'explore', phonetic: '/ɪkˈsplɔː/', meaning: '探险', past: 'explored', example: 'Explore the world.' },
    { word: 'beach', phonetic: '/biːtʃ/', meaning: '沙滩', past: null, example: 'On the beach.' },
    { word: 'mountain', phonetic: '/ˈmaʊntən/', meaning: '大山', past: null, example: 'Climb the mountain.' },
    { word: 'grandparent', phonetic: '/ˈɡrændˌpeərənt/', meaning: '祖父母', past: null, example: 'Visit grandparent.' },
    { word: 'astronaut', phonetic: '/ˈæstrənɔːt/', meaning: '宇航员', past: null, example: 'Be an astronaut.' },
    { word: 'police', phonetic: '/pəˈliːs/', meaning: '警察', past: null, example: 'Call the police.' },
    { word: 'Australia', phonetic: '/ɒˈstreɪliə/', meaning: '澳大利亚', past: null, example: 'Go to Australia.' },
    { word: 'vacation', phonetic: '/veɪˈkeɪʃn/', meaning: '假期', past: null, example: 'Happy vacation!' },
    { word: 'trip', phonetic: '/trɪp/', meaning: '旅行', past: null, example: 'A fun trip.' },
    // ===== 5年级 Unit4 过去假期 =====
    { word: 'camera', phonetic: '/ˈkæmrə/', meaning: '照相机', past: null, example: 'A new camera.' },
    { word: 'check', phonetic: '/tʃek/', meaning: '检查', past: 'checked', example: 'Check it now.' },
    { word: 'during', phonetic: '/ˈdjʊərɪŋ/', meaning: '在…期间', past: null, example: 'During the trip.' },
    { word: 'forget', phonetic: '/fəˈɡet/', meaning: '忘记', past: 'forgot', example: 'Do not forget.' },
    { word: 'holiday', phonetic: '/ˈhɒlədeɪ/', meaning: '假期', past: null, example: 'A nice holiday.' },
    { word: 'list', phonetic: '/lɪst/', meaning: '清单', past: null, example: 'A shopping list.' },
    { word: 'raincoat', phonetic: '/ˈreɪnkəʊt/', meaning: '雨衣', past: null, example: 'Wear a raincoat.' },
    { word: 'schoolbag', phonetic: '/ˈskuːlbæɡ/', meaning: '书包', past: null, example: 'My schoolbag.' },
    { word: 'sir', phonetic: '/sɜː/', meaning: '先生', past: null, example: 'Yes, sir.' },
    { word: 'ticket', phonetic: '/ˈtɪkɪt/', meaning: '车票', past: null, example: 'Buy a ticket.' },
    { word: 'week', phonetic: '/wiːk/', meaning: '星期', past: null, example: 'This week.' },
    { word: 'will', phonetic: '/wɪl/', meaning: '将要', past: null, example: 'I will go.' },
    { word: 'worry', phonetic: '/ˈwʌri/', meaning: '担心', past: 'worried', example: 'Do not worry.' },
    { word: 'yours', phonetic: '/jɔːz/', meaning: '你的（东西）', past: null, example: 'It is yours.' },
    // ===== 5年级 Unit5 方位城市地点 =====
    { word: 'bank', phonetic: '/bæŋk/', meaning: '银行', past: null, example: 'Go to the bank.' },
    { word: 'block', phonetic: '/blɒk/', meaning: '街区', past: null, example: 'Walk one block.' },
    { word: 'building', phonetic: '/ˈbɪldɪŋ/', meaning: '楼房', past: null, example: 'A tall building.' },
    { word: 'city', phonetic: '/ˈsɪti/', meaning: '城市', past: null, example: 'A big city.' },
    { word: 'country', phonetic: '/ˈkʌntri/', meaning: '国家', past: null, example: 'My country.' },
    { word: 'Egypt', phonetic: '/ˈiːdʒɪpt/', meaning: '埃及', past: null, example: 'Go to Egypt.' },
    { word: 'Paris', phonetic: '/ˈpærɪs/', meaning: '巴黎', past: null, example: 'Paris is nice.' },
    { word: 'place', phonetic: '/pleɪs/', meaning: '地点', past: null, example: 'A good place.' },
    { word: 'pyramid', phonetic: '/ˈpɪrəmɪd/', meaning: '金字塔', past: null, example: 'A big pyramid.' },
    { word: 'restaurant', phonetic: '/ˈrestərɒnt/', meaning: '餐馆', past: null, example: 'Eat at a restaurant.' },
    { word: 'restroom', phonetic: '/ˈrestruːm/', meaning: '卫生间', past: null, example: 'Where is the restroom?' },
    { word: 'theater', phonetic: '/ˈθiːətə/', meaning: '剧院', past: null, example: 'Go to the theater.' },
    { word: 'tower', phonetic: '/ˈtaʊə/', meaning: '塔', past: null, example: 'A tall tower.' },
    { word: 'zoo', phonetic: '/zuː/', meaning: '动物园', past: null, example: 'Go to the zoo.' },
    { word: 'left', phonetic: '/left/', meaning: '左边', past: null, example: 'Turn left.' },
    { word: 'right', phonetic: '/raɪt/', meaning: '右边', past: null, example: 'Turn right.' },
    { word: 'straight', phonetic: '/streɪt/', meaning: '笔直地', past: null, example: 'Go straight.' },
    { word: 'turn', phonetic: '/tɜːn/', meaning: '转弯', past: 'turned', example: 'Turn left.' },
    { word: 'welcome', phonetic: '/ˈwelkəm/', meaning: '欢迎', past: null, example: 'Welcome!' },
    // ===== 5年级 Unit6 天气 =====
    { word: 'cloud', phonetic: '/klaʊd/', meaning: '云', past: null, example: 'A white cloud.' },
    { word: 'cloudy', phonetic: '/ˈklaʊdi/', meaning: '多云的', past: null, example: 'It is cloudy.' },
    { word: 'dry', phonetic: '/draɪ/', meaning: '干燥的', past: null, example: 'The air is dry.' },
    { word: 'drop', phonetic: '/drɒp/', meaning: '雨滴', past: null, example: 'A rain drop.' },
    { word: 'feel', phonetic: '/fiːl/', meaning: '感觉', past: 'felt', example: 'I feel happy.' },
    { word: 'hard', phonetic: '/hɑːd/', meaning: '猛烈地', past: null, example: 'It rains hard.' },
    { word: 'kite', phonetic: '/kaɪt/', meaning: '风筝', past: null, example: 'Fly a kite.' },
    { word: 'pouring', phonetic: '/ˈpɔːrɪŋ/', meaning: '瓢泼大雨', past: null, example: 'It is pouring.' },
    { word: 'rain', phonetic: '/reɪn/', meaning: '下雨；雨水', past: 'rained', example: 'It rains today.' },
    { word: 'rainy', phonetic: '/ˈreɪni/', meaning: '下雨的', past: null, example: 'A rainy day.' },
    { word: 'snow', phonetic: '/snəʊ/', meaning: '雪；下雪', past: 'snowed', example: 'It snows in winter.' },
    { word: 'snowy', phonetic: '/ˈsnəʊi/', meaning: '下雪的', past: null, example: 'A snowy day.' },
    { word: 'sunny', phonetic: '/ˈsʌni/', meaning: '晴朗的', past: null, example: 'It is sunny.' },
    { word: 'wind', phonetic: '/wɪnd/', meaning: '风', past: null, example: 'The wind is strong.' },
    { word: 'windy', phonetic: '/ˈwɪndi/', meaning: '刮风的', past: null, example: 'It is windy.' },
    { word: 'best', phonetic: '/best/', meaning: '最好的', past: null, example: 'You are the best.' },
    // ===== 5年级 Unit7 季节与旅行 =====
    { word: 'spring', phonetic: '/sprɪŋ/', meaning: '春天', past: null, example: 'Spring is warm.' },
    { word: 'summer', phonetic: '/ˈsʌmə/', meaning: '夏天', past: null, example: 'Summer is hot.' },
    { word: 'autumn', phonetic: '/ˈɔːtəm/', meaning: '秋天', past: null, example: 'Autumn is cool.' },
    { word: 'winter', phonetic: '/ˈwɪntə/', meaning: '冬天', past: null, example: 'Winter is cold.' },
    { word: 'season', phonetic: '/ˈsiːzn/', meaning: '季节', past: null, example: 'My favorite season.' },
    { word: 'warm', phonetic: '/wɔːm/', meaning: '温暖', past: null, example: 'It is warm.' },
    { word: 'cool', phonetic: '/kuːl/', meaning: '凉爽', past: null, example: 'It is cool.' },
    { word: 'cold', phonetic: '/kəʊld/', meaning: '寒冷', past: null, example: 'It is cold.' },
    { word: 'hot', phonetic: '/hɒt/', meaning: '炎热', past: null, example: 'It is hot today.' },
    { word: 'travel', phonetic: '/ˈtrævl/', meaning: '旅行', past: 'traveled', example: 'Travel the world.' },
    { word: 'umbrella', phonetic: '/ʌmˈbrelə/', meaning: '雨伞', past: null, example: 'Bring an umbrella.' },
    { word: 'coat', phonetic: '/kəʊt/', meaning: '外套', past: null, example: 'Wear a coat.' },
    { word: 'boots', phonetic: '/buːts/', meaning: '靴子', past: null, example: 'My new boots.' },
    { word: 'gloves', phonetic: '/ɡlʌvz/', meaning: '手套', past: null, example: 'Wear gloves.' },
    { word: 'scarf', phonetic: '/skɑːf/', meaning: '围巾', past: null, example: 'A red scarf.' },
    { word: 'same', phonetic: '/seɪm/', meaning: '相同的', past: null, example: 'The same.' },
    { word: 'outside', phonetic: '/ˌaʊtˈsaɪd/', meaning: '在户外', past: null, example: 'Play outside.' },
  ],
  // 难度2：4-5年级进阶词
  medium: [
    { word: 'apple', phonetic: '/ˈæpəl/', meaning: '苹果', past: null, example: 'I eat an apple.' },
    { word: 'happy', phonetic: '/ˈhæpi/', meaning: '快乐的', past: null, example: 'I am happy.' },
    { word: 'water', phonetic: '/ˈwɔːtər/', meaning: '水', past: null, example: 'Drink water.' },
    { word: 'green', phonetic: '/ɡriːn/', meaning: '绿色', past: null, example: 'The grass is green.' },
    { word: 'house', phonetic: '/haʊs/', meaning: '房子', past: null, example: 'This is my house.' },
    { word: 'horse', phonetic: '/hɔːrs/', meaning: '马', past: null, example: 'The horse runs fast.' },
    { word: 'train', phonetic: '/treɪn/', meaning: '火车', past: null, example: 'I take a train.' },
    { word: 'tiger', phonetic: '/ˈtaɪɡər/', meaning: '老虎', past: null, example: 'The tiger is strong.' },
    { word: 'snake', phonetic: '/sneɪk/', meaning: '蛇', past: null, example: 'I see a snake.' },
    { word: 'sheep', phonetic: '/ʃiːp/', meaning: '绵羊', past: null, example: 'The sheep is white.' },
    { word: 'bread', phonetic: '/bred/', meaning: '面包', past: null, example: 'I eat bread.' },
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
    { word: 'friend', phonetic: '/frend/', meaning: '朋友', past: null, example: 'He is my friend.' },
    { word: 'school', phonetic: '/skuːl/', meaning: '学校', past: null, example: 'I go to school.' },
    { word: 'flower', phonetic: '/ˈflaʊər/', meaning: '花', past: null, example: 'The flower is pretty.' },
    { word: 'river', phonetic: '/ˈrɪvər/', meaning: '河', past: null, example: 'The river is long.' },
    // ===== 进阶词汇 =====
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
    { word: 'dream', phonetic: '/driːm/', meaning: '梦', past: 'dreamed', example: 'Sweet dreams.' },
    { word: 'grape', phonetic: '/ɡreɪp/', meaning: '葡萄', past: null, example: 'I like grapes.' },
    { word: 'lemon', phonetic: '/ˈlemən/', meaning: '柠檬', past: null, example: 'A sour lemon.' },
    { word: 'mango', phonetic: '/ˈmæŋɡoʊ/', meaning: '芒果', past: null, example: 'A sweet mango.' },
    { word: 'peach', phonetic: '/piːtʃ/', meaning: '桃子', past: null, example: 'A juicy peach.' },
  ],
  // 难度3：5-6年级词（6-8字母）
  hard: [
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
    { word: 'planet', phonetic: '/ˈplænɪt/', meaning: '行星', past: null, example: 'A blue planet.' },
    { word: 'silver', phonetic: '/ˈsɪlvər/', meaning: '银色', past: null, example: 'A silver ring.' },
    { word: 'spirit', phonetic: '/ˈspɪrɪt/', meaning: '精神', past: null, example: 'Team spirit.' },
    { word: 'temple', phonetic: '/ˈtempəl/', meaning: '寺庙', past: null, example: 'An old temple.' },
    { word: 'village', phonetic: '/ˈvɪlɪdʒ/', meaning: '村庄', past: null, example: 'A small village.' },
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
  // 生活常用（易混易忘）
  common: [
    { word: 'homework', phonetic: '/ˈhoʊmwɜːrk/', meaning: '家庭作业', past: null, example: 'I do my homework.' },
    { word: 'classroom', phonetic: '/ˈklæsruːm/', meaning: '教室', past: null, example: 'We are in the classroom.' },
    { word: 'library', phonetic: '/ˈlaɪbreri/', meaning: '图书馆', past: null, example: 'Go to the library.' },
    { word: 'playground', phonetic: '/ˈpleɪɡraʊnd/', meaning: '操场', past: null, example: 'Play on the playground.' },
    { word: 'eraser', phonetic: '/ɪˈreɪsər/', meaning: '橡皮', past: null, example: 'Use an eraser.' },
    { word: 'ruler', phonetic: '/ˈruːlər/', meaning: '尺子', past: null, example: 'I need a ruler.' },
    { word: 'backpack', phonetic: '/ˈbækpæk/', meaning: '背包', past: null, example: 'Pack your backpack.' },
    { word: 'uniform', phonetic: '/ˈjuːnɪfɔːrm/', meaning: '校服', past: null, example: 'Wear your uniform.' },
    { word: 'breakfast', phonetic: '/ˈbrekfəst/', meaning: '早餐', past: null, example: 'I eat breakfast.' },
    { word: 'lunch', phonetic: '/lʌntʃ/', meaning: '午餐', past: null, example: 'Lunch is ready.' },
    { word: 'dinner', phonetic: '/ˈdɪnər/', meaning: '晚餐', past: null, example: 'We have dinner together.' },
    { word: 'vegetable', phonetic: '/ˈvedʒtəbəl/', meaning: '蔬菜', past: null, example: 'Eat more vegetables.' },
    { word: 'tomato', phonetic: '/təˈmɑːtoʊ/', meaning: '西红柿', past: null, example: 'A red tomato.' },
    { word: 'potato', phonetic: '/pəˈteɪtoʊ/', meaning: '土豆', past: null, example: 'I like potatoes.' },
    { word: 'carrot', phonetic: '/ˈkærət/', meaning: '胡萝卜', past: null, example: 'A long carrot.' },
    { word: 'onion', phonetic: '/ˈʌnjən/', meaning: '洋葱', past: null, example: 'Cut the onion.' },
    { word: 'banana', phonetic: '/bəˈnænə/', meaning: '香蕉', past: null, example: 'Peel a banana.' },
    { word: 'orange', phonetic: '/ˈɒrɪndʒ/', meaning: '橙子', past: null, example: 'An orange fruit.' },
    { word: 'strawberry', phonetic: '/ˈstrɔːberi/', meaning: '草莓', past: null, example: 'Sweet strawberries.' },
    { word: 'sandwich', phonetic: '/ˈsænwɪtʃ/', meaning: '三明治', past: null, example: 'Make a sandwich.' },
    { word: 'supermarket', phonetic: '/ˈsuːpərmɑːrkɪt/', meaning: '超市', past: null, example: 'Go to the supermarket.' },
    { word: 'pharmacy', phonetic: '/ˈfɑːrməsi/', meaning: '药店', past: null, example: 'Find a pharmacy.' },
    { word: 'station', phonetic: '/ˈsteɪʃən/', meaning: '车站', past: null, example: 'Wait at the station.' },
    { word: 'subway', phonetic: '/ˈsʌbweɪ/', meaning: '地铁', past: null, example: 'Take the subway.' },
    { word: 'bicycle', phonetic: '/ˈbaɪsɪkəl/', meaning: '自行车', past: null, example: 'Ride a bicycle.' },
    { word: 'bathroom', phonetic: '/ˈbæθruːm/', meaning: '浴室', past: null, example: 'Where is the bathroom?' },
    { word: 'afternoon', phonetic: '/ˌæftərˈnuːn/', meaning: '下午', past: null, example: 'Good afternoon.' },
    { word: 'tomorrow', phonetic: '/təˈmɒrəʊ/', meaning: '明天', past: null, example: 'See you tomorrow.' },
    { word: 'yesterday', phonetic: '/ˈjestərdeɪ/', meaning: '昨天', past: null, example: 'I went there yesterday.' },
    { word: 'remember', phonetic: '/rɪˈmembər/', meaning: '记得', past: 'remembered', example: 'Remember this word.' },
    { word: 'enough', phonetic: '/ɪˈnʌf/', meaning: '足够的', past: null, example: 'That is enough.' },
    { word: 'almost', phonetic: '/ˈɔːlməʊst/', meaning: '几乎', past: null, example: 'I almost forgot.' },
    { word: 'quite', phonetic: '/kwaɪt/', meaning: '相当', past: null, example: 'It is quite good.' },
    { word: 'really', phonetic: '/ˈrɪəli/', meaning: '真的', past: null, example: 'I really like it.' },
    { word: 'because', phonetic: '/bɪˈkɒz/', meaning: '因为', past: null, example: 'Because I am tired.' },
    { word: 'before', phonetic: '/bɪˈfɔːr/', meaning: '在…之前', past: null, example: 'Before dinner.' },
    { word: 'behind', phonetic: '/bɪˈhaɪnd/', meaning: '在…后面', past: null, example: 'Behind the door.' },
    { word: 'between', phonetic: '/bɪˈtwiːn/', meaning: '在…之间', past: null, example: 'Between you and me.' },
    { word: 'above', phonetic: '/əˈbʌv/', meaning: '在…上方', past: null, example: 'Above the clouds.' },
    { word: 'below', phonetic: '/bɪˈloʊ/', meaning: '在…下方', past: null, example: 'Below the table.' },
    { word: 'often', phonetic: '/ˈɒfən/', meaning: '经常', past: null, example: 'I often read books.' },
    { word: 'sometimes', phonetic: '/ˈsʌmtaɪmz/', meaning: '有时', past: null, example: 'Sometimes I walk.' },
    { word: 'favorite', phonetic: '/ˈfeɪvərɪt/', meaning: '最喜欢的', past: null, example: 'My favorite food.' },
    { word: 'colour', phonetic: '/ˈkʌlər/', meaning: '颜色', past: null, example: 'What colour is it?' },
    { word: 'purple', phonetic: '/ˈpɜːrpəl/', meaning: '紫色', past: null, example: 'A purple flower.' },
    { word: 'brown', phonetic: '/braʊn/', meaning: '棕色', past: null, example: 'Brown shoes.' },
    { word: 'pink', phonetic: '/pɪŋk/', meaning: '粉色', past: null, example: 'A pink dress.' },
    { word: 'chocolate', phonetic: '/ˈtʃɒklət/', meaning: '巧克力', past: null, example: 'I love chocolate.' },
    { word: 'cookie', phonetic: '/ˈkʊki/', meaning: '曲奇饼干', past: null, example: 'Eat a cookie.' },
    { word: 'neighbor', phonetic: '/ˈneɪbər/', meaning: '邻居', past: null, example: 'My neighbor is kind.' },
    { word: 'medicine', phonetic: '/ˈmedɪsɪn/', meaning: '药', past: null, example: 'Take your medicine.' },
    { word: 'silence', phonetic: '/ˈsaɪləns/', meaning: '安静', past: null, example: 'Keep silence please.' },
    { word: 'careful', phonetic: '/ˈkerfəl/', meaning: '小心的', past: null, example: 'Be careful.' },
    { word: 'polite', phonetic: '/pəˈlaɪt/', meaning: '有礼貌的', past: null, example: 'Be polite.' },
    { word: 'window', phonetic: '/ˈwɪndoʊ/', meaning: '窗户', past: null, example: 'Open the window.' },
    { word: 'textbook', phonetic: '/ˈtekstbʊk/', meaning: '课本', past: null, example: 'Open your textbook.' },
    { word: 'toothbrush', phonetic: '/ˈtuːθbrʌʃ/', meaning: '牙刷', past: null, example: 'Use a toothbrush.' },
    { word: 'scissors', phonetic: '/ˈsɪzərz/', meaning: '剪刀', past: null, example: 'Pass the scissors.' },
    { word: 'calendar', phonetic: '/ˈkælɪndər/', meaning: '日历', past: null, example: 'Check the calendar.' },
  ],
};

/** 合并去重后的全量词库（200关×2词=400），附带写死的试炼句对 */
function _buildAllWords() {
  const seen = new Set();
  const all = [];
  for (const pool of [WORD_POOL.easy, WORD_POOL.medium, WORD_POOL.hard, WORD_POOL.expert, WORD_POOL.common]) {
    for (const item of pool) {
      const key = item.word.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const trial = WORD_TRIALS[item.word] || WORD_TRIALS[key];
      if (!trial) {
        console.warn('[LevelData] missing trial for word:', item.word);
      }
      all.push({ ...item, trial });
    }
  }
  return all;
}

const ALL_WORDS = _buildAllWords();

/** 根据单词计算灵槽上限 */
export function calcWordMaxSlots(wordStr) {
  const len = wordStr.length;
  const slotBonus = len >= 8 ? 3 : 2;
  return Math.min(15, len + slotBonus);
}

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

  // 每关固定 2 词，按总表顺序分配（400 词对应 200 关）
  const wordCount = 2;
  const baseIdx = (stage - 1) * 2;
  const words = [
    ALL_WORDS[baseIdx],
    ALL_WORDS[baseIdx + 1],
  ].filter(Boolean);

  // 选择故事
  const stories = STORY_TEMPLATES[realm.id] || STORY_TEMPLATES.fanren;
  const story = stories[(idx - 1) % stories.length];

  // 难度配置
  const extraLetters = Math.min(8, Math.floor(stage / 15) + 2);

  // 单 word 模式下的灵槽上限（取本关较长单词）
  const maxSlots = words.length ? calcWordMaxSlots(words.reduce((a, b) => (a.word.length >= b.word.length ? a : b)).word) : 8;

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
      trial: w.trial,
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
    // 5年级词汇
    'would': '想要', 'glad': '高兴的', 'together': '一起', 'hamburger': '汉堡包',
    'Coke': '可乐', 'pie': '馅饼', 'drink': '喝', 'juice': '果汁', 'or': '或者',
    'enjoy': '享用', 'sleepy': '困倦的', 'bored': '烦闷的', 'noodles': '面条',
    'pizza': '披萨', 'lemonade': '柠檬汁', 'hungry': '饥饿的', 'corner': '拐角',
    'always': '总是', 'usually': '通常', 'never': '从不', 'practice': '练习',
    'pool': '游泳池', 'swimmer': '游泳运动员', 'pilot': '飞行员', 'fly': '飞',
    'plane': '飞机', 'engineer': '工程师', 'design': '设计', 'spaceship': '宇宙飞船',
    'artist': '艺术家', 'violinist': '小提琴手', 'fantastic': '极好的', 'hobby': '爱好',
    'job': '工作', 'thought': '思考', 'sad': '难过的', 'weekend': '周末', 'hiking': '远足',
    'family': '家人', 'all': '全部', 'last': '上一个', 'hear': '听见', 'plan': '计划',
    'animal': '动物', 'farmer': '农民', 'vet': '兽医', 'feed': '喂养', 'explore': '探险',
    'beach': '沙滩', 'mountain': '大山', 'grandparent': '祖父母', 'astronaut': '宇航员',
    'police': '警察', 'Australia': '澳大利亚', 'vacation': '假期', 'trip': '旅行',
    'camera': '照相机', 'check': '检查', 'during': '在…期间', 'forget': '忘记',
    'holiday': '假期', 'list': '清单', 'raincoat': '雨衣', 'schoolbag': '书包',
    'sir': '先生', 'ticket': '车票', 'week': '星期', 'will': '将要', 'worry': '担心',
    'yours': '你的', 'bank': '银行', 'block': '街区', 'building': '楼房', 'city': '城市',
    'country': '国家', 'Egypt': '埃及', 'Paris': '巴黎', 'place': '地点', 'pyramid': '金字塔',
    'restaurant': '餐馆', 'restroom': '卫生间', 'theater': '剧院', 'tower': '塔',
    'zoo': '动物园', 'left': '左边', 'right': '右边', 'straight': '笔直地', 'turn': '转弯',
    'welcome': '欢迎', 'cloud': '云', 'cloudy': '多云的', 'dry': '干燥的', 'drop': '雨滴',
    'feel': '感觉', 'hard': '猛烈地', 'kite': '风筝', 'pouring': '瓢泼大雨', 'rain': '下雨',
    'rainy': '下雨的', 'snow': '雪', 'snowy': '下雪的', 'sunny': '晴朗的', 'wind': '风',
    'windy': '刮风的', 'best': '最好的', 'spring': '春天', 'summer': '夏天', 'autumn': '秋天',
    'winter': '冬天', 'season': '季节', 'warm': '温暖', 'cool': '凉爽', 'cold': '寒冷',
    'hot': '炎热', 'travel': '旅行', 'umbrella': '雨伞', 'coat': '外套', 'boots': '靴子',
    'gloves': '手套', 'scarf': '围巾', 'same': '相同的', 'outside': '在户外',
    // 基础词
    'cat': '猫', 'dog': '狗', 'sun': '太阳', 'run': '跑', 'hat': '帽子',
    'big': '大的', 'red': '红色', 'fun': '乐趣', 'cup': '杯子', 'bus': '公交车',
    'map': '地图', 'pen': '钢笔', 'box': '盒子', 'fox': '狐狸', 'jam': '果酱',
    'leg': '腿', 'bed': '床', 'pig': '猪', 'hen': '母鸡', 'hot': '热的',
    'not': '不', 'got': '得到', 'man': '男人', 'can': '能', 'fan': '粉丝',
    'dad': '爸爸', 'mom': '妈妈', 'boy': '男孩', 'toy': '玩具', 'joy': '快乐',
    'day': '天', 'may': '可能', 'say': '说', 'eat': '吃', 'tea': '茶',
    'sea': '海', 'bee': '蜜蜂', 'see': '看见', 'tree': '树', 'home': '家',
    'name': '名字', 'game': '游戏', 'play': '玩', 'book': '书', 'fish': '鱼',
    'bird': '鸟', 'cake': '蛋糕', 'milk': '牛奶', 'like': '喜欢', 'love': '爱',
    'want': '想要', 'help': '帮助', 'make': '制作', 'take': '拿', 'come': '来',
    // 中级词
    'apple': '苹果', 'happy': '快乐', 'water': '水', 'green': '绿色', 'house': '房子',
    'horse': '马', 'train': '火车', 'tiger': '老虎', 'snake': '蛇', 'sheep': '绵羊',
    'bread': '面包', 'candy': '糖果', 'dance': '跳舞', 'speak': '说', 'write': '写',
    'small': '小的', 'large': '大的', 'tall': '高的', 'short': '矮的', 'quick': '快的',
    'slow': '慢的', 'fast': '快的', 'phone': '电话', 'table': '桌子', 'chair': '椅子',
    'clock': '钟', 'light': '灯', 'music': '音乐', 'friend': '朋友', 'school': '学校',
    'flower': '花', 'river': '河', 'about': '关于', 'after': '之后', 'again': '再',
    'begin': '开始', 'bring': '带来', 'carry': '携带', 'clean': '干净的', 'climb': '爬',
    'close': '关闭', 'draw': '画', 'early': '早的', 'earth': '地球', 'every': '每个',
    'fruit': '水果', 'grow': '生长', 'guess': '猜', 'heart': '心', 'heavy': '重的',
    'learn': '学习', 'leave': '离开', 'money': '钱', 'month': '月', 'night': '夜晚',
    'paper': '纸', 'plant': '植物', 'quiet': '安静的', 'share': '分享', 'sleep': '睡觉',
    'smile': '微笑', 'space': '空间', 'spend': '花费', 'start': '开始', 'story': '故事',
    'study': '学习', 'think': '想', 'tired': '累的', 'today': '今天', 'visit': '拜访',
    'watch': '观看', 'white': '白色', 'world': '世界', 'young': '年轻的', 'dream': '梦',
    'grape': '葡萄', 'lemon': '柠檬', 'mango': '芒果', 'peach': '桃子',
    // 高级词
    'teacher': '老师', 'student': '学生', 'garden': '花园', 'forest': '森林', 'doctor': '医生',
    'pencil': '铅笔', 'chicken': '鸡', 'rabbit': '兔子', 'monkey': '猴子', 'elephant': '大象',
    'giraffe': '长颈鹿', 'penguin': '企鹅', 'dolphin': '海豚', 'butterfly': '蝴蝶',
    'kitchen': '厨房', 'bedroom': '卧室', 'morning': '早晨', 'evening': '傍晚',
    'exercise': '锻炼', 'healthy': '健康的', 'balance': '平衡', 'energy': '能量',
    'wonderful': '精彩的', 'beautiful': '美丽的', 'different': '不同的', 'important': '重要的',
    'interesting': '有趣的', 'ocean': '海洋', 'airport': '机场', 'already': '已经',
    'bottle': '瓶子', 'bridge': '桥', 'castle': '城堡', 'clever': '聪明的', 'collect': '收集',
    'company': '公司', 'cousin': '表亲', 'crystal': '水晶', 'culture': '文化', 'danger': '危险',
    'desert': '沙漠', 'develop': '发展', 'diamond': '钻石', 'dinosaur': '恐龙', 'discover': '发现',
    'dragon': '龙', 'escape': '逃跑', 'example': '例子', 'famous': '著名的', 'feather': '羽毛',
    'finger': '手指', 'flight': '航班', 'follow': '跟随', 'freeze': '冻结', 'future': '未来',
    'gentle': '温柔的', 'golden': '金色的', 'guitar': '吉他', 'honest': '诚实的', 'jungle': '丛林',
    'kingdom': '王国', 'ladder': '梯子', 'launch': '发射', 'market': '市场', 'master': '大师',
    'mirror': '镜子', 'modern': '现代的', 'planet': '行星', 'silver': '银色', 'spirit': '精神',
    'temple': '寺庙', 'village': '村庄',
    // 精英词
    'adventure': '冒险', 'celebrate': '庆祝', 'difficult': '困难的', 'education': '教育',
    'favorite': '最喜欢的', 'happiness': '幸福', 'knowledge': '知识', 'mystery': '神秘',
    'necessary': '必要的', 'opposite': '相反的', 'recognize': '认出', 'technology': '技术',
    'atmosphere': '气氛', 'furniture': '家具', 'guardian': '守护者', 'heritage': '遗产',
    'notebook': '笔记本', 'question': '问题', 'tradition': '传统', 'valuable': '有价值的',
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
