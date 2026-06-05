/**
 * 单词试炼句对 — 每词含陈述句与疑问句，供拼词闯关使用
 */

export const WORD_TRIALS = {
  would: {
    declarative: { sentence: 'I would like some water.', chinese: '我想要一些水。', type: 'declarative' },
    interrogative: { sentence: 'Would you like some juice?', chinese: '你想要一些果汁吗？', type: 'interrogative' },
  },
  glad: {
    declarative: { sentence: 'I am glad to see you.', chinese: '我很高兴见到你。', type: 'declarative' },
    interrogative: { sentence: 'Are you glad about the news?', chinese: '你对这个消息高兴吗？', type: 'interrogative' },
  },
  together: {
    declarative: { sentence: 'Let us eat together.', chinese: '我们一起吃吧。', type: 'declarative' },
    interrogative: { sentence: 'Can we play together?', chinese: '我们能一起玩吗？', type: 'interrogative' },
  },
  hamburger: {
    declarative: { sentence: 'I want a hamburger.', chinese: '我想要一个汉堡。', type: 'declarative' },
    interrogative: { sentence: 'Do you like hamburgers?', chinese: '你喜欢汉堡吗？', type: 'interrogative' },
  },
  Coke: {
    declarative: { sentence: 'I like Coke with ice.', chinese: '我喜欢加冰的可乐。', type: 'declarative' },
    interrogative: { sentence: 'Would you like some Coke?', chinese: '你想要来点可乐吗？', type: 'interrogative' },
  },
  pie: {
    declarative: { sentence: 'Mom made an apple pie.', chinese: '妈妈做了一个苹果派。', type: 'declarative' },
    interrogative: { sentence: 'Do you want a piece of pie?', chinese: '你想要一块派吗？', type: 'interrogative' },
  },
  drink: {
    declarative: { sentence: 'Drink some warm water.', chinese: '喝点温水吧。', type: 'declarative' },
    interrogative: { sentence: 'What would you like to drink?', chinese: '你想喝什么？', type: 'interrogative' },
  },
  juice: {
    declarative: { sentence: 'I like orange juice.', chinese: '我喜欢橙汁。', type: 'declarative' },
    interrogative: { sentence: 'Do you want more juice?', chinese: '你还要果汁吗？', type: 'interrogative' },
  },
  or: {
    declarative: { sentence: 'Tea or juice, please.', chinese: '请给我茶或者果汁。', type: 'declarative' },
    interrogative: { sentence: 'Do you want pie or cake?', chinese: '你想要派还是蛋糕？', type: 'interrogative' },
  },
  enjoy: {
    declarative: { sentence: 'Enjoy your lunch, please.', chinese: '请享用你的午餐。', type: 'declarative' },
    interrogative: { sentence: 'Did you enjoy the party?', chinese: '你享受这次聚会吗？', type: 'interrogative' },
  },
  sleepy: {
    declarative: { sentence: 'I feel sleepy now.', chinese: '我现在困了。', type: 'declarative' },
    interrogative: { sentence: 'Are you sleepy after lunch?', chinese: '你午饭后困吗？', type: 'interrogative' },
  },
  bored: {
    declarative: { sentence: 'I am bored at home.', chinese: '我在家很无聊。', type: 'declarative' },
    interrogative: { sentence: 'Do you feel bored today?', chinese: '你今天觉得无聊吗？', type: 'interrogative' },
  },
  noodles: {
    declarative: { sentence: 'I like beef noodles.', chinese: '我喜欢牛肉面。', type: 'declarative' },
    interrogative: { sentence: 'Do you want more noodles?', chinese: '你还要面条吗？', type: 'interrogative' },
  },
  pizza: {
    declarative: { sentence: 'Pizza is my favorite food.', chinese: '披萨是我最喜欢的食物。', type: 'declarative' },
    interrogative: { sentence: 'Do you like pizza?', chinese: '你喜欢披萨吗？', type: 'interrogative' },
  },
  lemonade: {
    declarative: { sentence: 'Cold lemonade tastes good.', chinese: '冰柠檬汁很好喝。', type: 'declarative' },
    interrogative: { sentence: 'Do you want some lemonade?', chinese: '你想要柠檬汁吗？', type: 'interrogative' },
  },
  hungry: {
    declarative: { sentence: 'I am very hungry now.', chinese: '我现在很饿。', type: 'declarative' },
    interrogative: { sentence: 'Are you hungry for dinner?', chinese: '你晚饭饿了吗？', type: 'interrogative' },
  },
  corner: {
    declarative: { sentence: 'Turn left at the corner.', chinese: '在拐角处向左转。', type: 'declarative' },
    interrogative: { sentence: 'Is the shop on the corner?', chinese: '商店在拐角处吗？', type: 'interrogative' },
  },
  always: {
    declarative: { sentence: 'I always do my homework.', chinese: '我总是做家庭作业。', type: 'declarative' },
    interrogative: { sentence: 'Do you always walk to school?', chinese: '你总是走路去学校吗？', type: 'interrogative' },
  },
  usually: {
    declarative: { sentence: 'I usually get up early.', chinese: '我通常起得很早。', type: 'declarative' },
    interrogative: { sentence: 'Do you usually eat breakfast?', chinese: '你通常吃早餐吗？', type: 'interrogative' },
  },
  never: {
    declarative: { sentence: 'I never give up easily.', chinese: '我从不轻易放弃。', type: 'declarative' },
    interrogative: { sentence: 'Do you never eat candy?', chinese: '你从不吃糖果吗？', type: 'interrogative' },
  },
  practice: {
    declarative: { sentence: 'I practice piano every day.', chinese: '我每天练钢琴。', type: 'declarative' },
    interrogative: { sentence: 'Do you practice after school?', chinese: '你放学后练习吗？', type: 'interrogative' },
  },
  pool: {
    declarative: { sentence: 'We swim in the pool.', chinese: '我们在游泳池里游泳。', type: 'declarative' },
    interrogative: { sentence: 'Is the pool open today?', chinese: '游泳池今天开放吗？', type: 'interrogative' },
  },
  swimmer: {
    declarative: { sentence: 'She is a good swimmer.', chinese: '她是一名游泳好手。', type: 'declarative' },
    interrogative: { sentence: 'Is he a fast swimmer?', chinese: '他游得快吗？', type: 'interrogative' },
  },
  pilot: {
    declarative: { sentence: 'My uncle is a pilot.', chinese: '我叔叔是一名飞行员。', type: 'declarative' },
    interrogative: { sentence: 'Does a pilot fly planes?', chinese: '飞行员开飞机吗？', type: 'interrogative' },
  },
  fly: {
    declarative: { sentence: 'Birds fly in the sky.', chinese: '鸟儿在天空飞翔。', type: 'declarative' },
    interrogative: { sentence: 'Can you fly a kite?', chinese: '你会放风筝吗？', type: 'interrogative' },
  },
  plane: {
    declarative: { sentence: 'The plane is very fast.', chinese: '飞机非常快。', type: 'declarative' },
    interrogative: { sentence: 'Is that plane very big?', chinese: '那架飞机很大吗？', type: 'interrogative' },
  },
  engineer: {
    declarative: { sentence: 'He wants to be an engineer.', chinese: '他想当一名工程师。', type: 'declarative' },
    interrogative: { sentence: 'Is your dad an engineer?', chinese: '你爸爸是工程师吗？', type: 'interrogative' },
  },
  design: {
    declarative: { sentence: 'She can design a house.', chinese: '她能设计一座房子。', type: 'declarative' },
    interrogative: { sentence: 'Can you design a logo?', chinese: '你能设计一个标志吗？', type: 'interrogative' },
  },
  spaceship: {
    declarative: { sentence: 'The spaceship flies to space.', chinese: '宇宙飞船飞向太空。', type: 'declarative' },
    interrogative: { sentence: 'Do you like that spaceship?', chinese: '你喜欢那艘宇宙飞船吗？', type: 'interrogative' },
  },
  artist: {
    declarative: { sentence: 'She is a great artist.', chinese: '她是一位伟大的艺术家。', type: 'declarative' },
    interrogative: { sentence: 'Is he a famous artist?', chinese: '他是著名艺术家吗？', type: 'interrogative' },
  },
  violinist: {
    declarative: { sentence: 'The violinist plays well.', chinese: '小提琴手演奏得很好。', type: 'declarative' },
    interrogative: { sentence: 'Is she a young violinist?', chinese: '她是年轻的小提琴手吗？', type: 'interrogative' },
  },
  fantastic: {
    declarative: { sentence: 'Your drawing is fantastic!', chinese: '你的画太棒了！', type: 'declarative' },
    interrogative: { sentence: 'Is the show fantastic?', chinese: '这场演出很棒吗？', type: 'interrogative' },
  },
  hobby: {
    declarative: { sentence: 'My hobby is reading books.', chinese: '我的爱好是读书。', type: 'declarative' },
    interrogative: { sentence: 'What is your hobby?', chinese: '你的爱好是什么？', type: 'interrogative' },
  },
  job: {
    declarative: { sentence: 'Teaching is a good job.', chinese: '教书是一份好工作。', type: 'declarative' },
    interrogative: { sentence: 'Do you like your job?', chinese: '你喜欢你的工作吗？', type: 'interrogative' },
  },
  thought: {
    declarative: { sentence: 'I thought about the plan.', chinese: '我思考了这个计划。', type: 'declarative' },
    interrogative: { sentence: 'What did you think about it?', chinese: '你对它怎么想？', type: 'interrogative' },
  },
  sad: {
    declarative: { sentence: 'I feel sad today.', chinese: '我今天很难过。', type: 'declarative' },
    interrogative: { sentence: 'Are you sad about the test?', chinese: '你对考试难过吗？', type: 'interrogative' },
  },
  weekend: {
    declarative: { sentence: 'I love the weekend.', chinese: '我喜欢周末。', type: 'declarative' },
    interrogative: { sentence: 'What will you do this weekend?', chinese: '这个周末你要做什么？', type: 'interrogative' },
  },
  hiking: {
    declarative: { sentence: 'We go hiking on Sunday.', chinese: '我们星期天去远足。', type: 'declarative' },
    interrogative: { sentence: 'Do you like hiking?', chinese: '你喜欢远足吗？', type: 'interrogative' },
  },
  family: {
    declarative: { sentence: 'I love my family.', chinese: '我爱我的家人。', type: 'declarative' },
    interrogative: { sentence: 'Is your family big?', chinese: '你的家庭大吗？', type: 'interrogative' },
  },
  all: {
    declarative: { sentence: 'We all like English class.', chinese: '我们都喜欢英语课。', type: 'declarative' },
    interrogative: { sentence: 'Did you finish all the work?', chinese: '你完成所有作业了吗？', type: 'interrogative' },
  },
  last: {
    declarative: { sentence: 'I saw him last week.', chinese: '我上周见过他。', type: 'declarative' },
    interrogative: { sentence: 'Was that your last trip?', chinese: '那是你上次旅行吗？', type: 'interrogative' },
  },
  hear: {
    declarative: { sentence: 'I hear birds singing.', chinese: '我听到鸟儿在唱歌。', type: 'declarative' },
    interrogative: { sentence: 'Can you hear the music?', chinese: '你能听到音乐吗？', type: 'interrogative' },
  },
  plan: {
    declarative: { sentence: 'We made a travel plan.', chinese: '我们制定了旅行计划。', type: 'declarative' },
    interrogative: { sentence: 'What is your plan today?', chinese: '你今天有什么计划？', type: 'interrogative' },
  },
  animal: {
    declarative: { sentence: 'I love cute animals.', chinese: '我喜欢可爱的动物。', type: 'declarative' },
    interrogative: { sentence: 'Do you like wild animals?', chinese: '你喜欢野生动物吗？', type: 'interrogative' },
  },
  farmer: {
    declarative: { sentence: 'The farmer feeds the cows.', chinese: '农民喂养奶牛。', type: 'declarative' },
    interrogative: { sentence: 'Is he a busy farmer?', chinese: '他是忙碌的农民吗？', type: 'interrogative' },
  },
  vet: {
    declarative: { sentence: 'The vet helps sick pets.', chinese: '兽医帮助生病的宠物。', type: 'declarative' },
    interrogative: { sentence: 'Should we see the vet?', chinese: '我们应该去看兽医吗？', type: 'interrogative' },
  },
  feed: {
    declarative: { sentence: 'I feed my cat every day.', chinese: '我每天喂我的猫。', type: 'declarative' },
    interrogative: { sentence: 'Did you feed the dog?', chinese: '你喂狗了吗？', type: 'interrogative' },
  },
  explore: {
    declarative: { sentence: 'We explore the old forest.', chinese: '我们探索古老的森林。', type: 'declarative' },
    interrogative: { sentence: 'Do you want to explore caves?', chinese: '你想探索洞穴吗？', type: 'interrogative' },
  },
  beach: {
    declarative: { sentence: 'We play on the beach.', chinese: '我们在沙滩上玩耍。', type: 'declarative' },
    interrogative: { sentence: 'Is the beach clean today?', chinese: '今天海滩干净吗？', type: 'interrogative' },
  },
  mountain: {
    declarative: { sentence: 'The mountain is very high.', chinese: '这座山非常高。', type: 'declarative' },
    interrogative: { sentence: 'Can we climb the mountain?', chinese: '我们能爬这座山吗？', type: 'interrogative' },
  },
  grandparent: {
    declarative: { sentence: 'I visit my grandparent often.', chinese: '我经常看望我的祖父母。', type: 'declarative' },
    interrogative: { sentence: 'Do you love your grandparent?', chinese: '你爱你的祖父母吗？', type: 'interrogative' },
  },
  astronaut: {
    declarative: { sentence: 'He wants to be an astronaut.', chinese: '他想当一名宇航员。', type: 'declarative' },
    interrogative: { sentence: 'Is an astronaut brave?', chinese: '宇航员勇敢吗？', type: 'interrogative' },
  },
  police: {
    declarative: { sentence: 'Call the police for help.', chinese: '打电话向警察求助。', type: 'declarative' },
    interrogative: { sentence: 'Did you see the police?', chinese: '你看到警察了吗？', type: 'interrogative' },
  },
  Australia: {
    declarative: { sentence: 'We will visit Australia.', chinese: '我们将去澳大利亚。', type: 'declarative' },
    interrogative: { sentence: 'Is Australia far from China?', chinese: '澳大利亚离中国远吗？', type: 'interrogative' },
  },
  vacation: {
    declarative: { sentence: 'We had a fun vacation.', chinese: '我们度过了一个有趣的假期。', type: 'declarative' },
    interrogative: { sentence: 'Where did you go on vacation?', chinese: '你假期去了哪里？', type: 'interrogative' },
  },
  trip: {
    declarative: { sentence: 'Our trip was wonderful.', chinese: '我们的旅行很棒。', type: 'declarative' },
    interrogative: { sentence: 'Are you ready for the trip?', chinese: '你准备好旅行了吗？', type: 'interrogative' },
  },
  camera: {
    declarative: { sentence: 'I took photos with a camera.', chinese: '我用相机拍了照片。', type: 'declarative' },
    interrogative: { sentence: 'Is your camera new?', chinese: '你的相机是新的吗？', type: 'interrogative' },
  },
  check: {
    declarative: { sentence: 'Please check your homework.', chinese: '请检查你的家庭作业。', type: 'declarative' },
    interrogative: { sentence: 'Did you check the list?', chinese: '你检查清单了吗？', type: 'interrogative' },
  },
  during: {
    declarative: { sentence: 'I read books during the trip.', chinese: '旅行期间我看书。', type: 'declarative' },
    interrogative: { sentence: 'What did you do during class?', chinese: '上课期间你做了什么？', type: 'interrogative' },
  },
  forget: {
    declarative: { sentence: 'Do not forget your ticket.', chinese: '别忘了你的票。', type: 'declarative' },
    interrogative: { sentence: 'Did you forget your bag?', chinese: '你忘带书包了吗？', type: 'interrogative' },
  },
  holiday: {
    declarative: { sentence: 'Happy holiday to you!', chinese: '祝你假期快乐！', type: 'declarative' },
    interrogative: { sentence: 'How was your holiday?', chinese: '你的假期怎么样？', type: 'interrogative' },
  },
  list: {
    declarative: { sentence: 'I made a shopping list.', chinese: '我做了一份购物清单。', type: 'declarative' },
    interrogative: { sentence: 'Is your name on the list?', chinese: '你的名字在清单上吗？', type: 'interrogative' },
  },
  raincoat: {
    declarative: { sentence: 'Wear your raincoat today.', chinese: '今天穿上你的雨衣。', type: 'declarative' },
    interrogative: { sentence: 'Do you have a yellow raincoat?', chinese: '你有黄色雨衣吗？', type: 'interrogative' },
  },
  schoolbag: {
    declarative: { sentence: 'My schoolbag is heavy.', chinese: '我的书包很重。', type: 'declarative' },
    interrogative: { sentence: 'Is this your schoolbag?', chinese: '这是你的书包吗？', type: 'interrogative' },
  },
  sir: {
    declarative: { sentence: 'Yes, sir, I understand.', chinese: '是的，先生，我明白了。', type: 'declarative' },
    interrogative: { sentence: 'Can I help you, sir?', chinese: '先生，我能帮您吗？', type: 'interrogative' },
  },
  ticket: {
    declarative: { sentence: 'I bought a train ticket.', chinese: '我买了一张火车票。', type: 'declarative' },
    interrogative: { sentence: 'Do you have your ticket?', chinese: '你有票吗？', type: 'interrogative' },
  },
  week: {
    declarative: { sentence: 'I am busy this week.', chinese: '我这周很忙。', type: 'declarative' },
    interrogative: { sentence: 'What day is it this week?', chinese: '这周今天是星期几？', type: 'interrogative' },
  },
  will: {
    declarative: { sentence: 'I will go to school tomorrow.', chinese: '我明天将去学校。', type: 'declarative' },
    interrogative: { sentence: 'Will you help me?', chinese: '你会帮我吗？', type: 'interrogative' },
  },
  worry: {
    declarative: { sentence: 'Do not worry about it.', chinese: '别担心这件事。', type: 'declarative' },
    interrogative: { sentence: 'Why do you worry so much?', chinese: '你为什么这么担心？', type: 'interrogative' },
  },
  yours: {
    declarative: { sentence: 'This book is yours.', chinese: '这本书是你的。', type: 'declarative' },
    interrogative: { sentence: 'Is the red pen yours?', chinese: '这支红笔是你的吗？', type: 'interrogative' },
  },
  bank: {
    declarative: { sentence: 'The bank opens at nine.', chinese: '银行九点开门。', type: 'declarative' },
    interrogative: { sentence: 'Is the bank near here?', chinese: '银行在这附近吗？', type: 'interrogative' },
  },
  block: {
    declarative: { sentence: 'Walk one more block.', chinese: '再走一个街区。', type: 'declarative' },
    interrogative: { sentence: 'Is the park two blocks away?', chinese: '公园离这里两个街区吗？', type: 'interrogative' },
  },
  building: {
    declarative: { sentence: 'That building is very tall.', chinese: '那栋楼非常高。', type: 'declarative' },
    interrogative: { sentence: 'Is the library in that building?', chinese: '图书馆在那栋楼里吗？', type: 'interrogative' },
  },
  city: {
    declarative: { sentence: 'Beijing is a big city.', chinese: '北京是一座大城市。', type: 'declarative' },
    interrogative: { sentence: 'Do you like this city?', chinese: '你喜欢这座城市吗？', type: 'interrogative' },
  },
  country: {
    declarative: { sentence: 'China is a beautiful country.', chinese: '中国是一个美丽的国家。', type: 'declarative' },
    interrogative: { sentence: 'Which country do you like?', chinese: '你喜欢哪个国家？', type: 'interrogative' },
  },
  Egypt: {
    declarative: { sentence: 'We learned about Egypt.', chinese: '我们学习了埃及。', type: 'declarative' },
    interrogative: { sentence: 'Have you been to Egypt?', chinese: '你去过埃及吗？', type: 'interrogative' },
  },
  Paris: {
    declarative: { sentence: 'Paris is a famous city.', chinese: '巴黎是一座著名的城市。', type: 'declarative' },
    interrogative: { sentence: 'Would you like to visit Paris?', chinese: '你想去巴黎吗？', type: 'interrogative' },
  },
  place: {
    declarative: { sentence: 'This is a nice place.', chinese: '这是一个好地方。', type: 'declarative' },
    interrogative: { sentence: 'Is this a safe place?', chinese: '这里安全吗？', type: 'interrogative' },
  },
  pyramid: {
    declarative: { sentence: 'The pyramid is very old.', chinese: '金字塔非常古老。', type: 'declarative' },
    interrogative: { sentence: 'Did you see the pyramid?', chinese: '你看到金字塔了吗？', type: 'interrogative' },
  },
  restaurant: {
    declarative: { sentence: 'We eat at a restaurant.', chinese: '我们在餐馆吃饭。', type: 'declarative' },
    interrogative: { sentence: 'Is the restaurant open now?', chinese: '餐馆现在开门吗？', type: 'interrogative' },
  },
  restroom: {
    declarative: { sentence: 'Where is the restroom, please?', chinese: '请问洗手间在哪里？', type: 'declarative' },
    interrogative: { sentence: 'Is the restroom on the left?', chinese: '洗手间在左边吗？', type: 'interrogative' },
  },
  theater: {
    declarative: { sentence: 'We went to the theater.', chinese: '我们去了剧院。', type: 'declarative' },
    interrogative: { sentence: 'Is the theater far from here?', chinese: '剧院离这里远吗？', type: 'interrogative' },
  },
  tower: {
    declarative: { sentence: 'The tower is very tall.', chinese: '这座塔非常高。', type: 'declarative' },
    interrogative: { sentence: 'Can you see the tower?', chinese: '你能看到那座塔吗？', type: 'interrogative' },
  },
  zoo: {
    declarative: { sentence: 'We saw pandas at the zoo.', chinese: '我们在动物园看到了熊猫。', type: 'declarative' },
    interrogative: { sentence: 'Do you like the zoo?', chinese: '你喜欢动物园吗？', type: 'interrogative' },
  },
  left: {
    declarative: { sentence: 'Turn left at the light.', chinese: '在红绿灯处向左转。', type: 'declarative' },
    interrogative: { sentence: 'Is the bank on the left?', chinese: '银行在左边吗？', type: 'interrogative' },
  },
  right: {
    declarative: { sentence: 'Turn right at the corner.', chinese: '在拐角处向右转。', type: 'declarative' },
    interrogative: { sentence: 'Is the school on the right?', chinese: '学校在右边吗？', type: 'interrogative' },
  },
  straight: {
    declarative: { sentence: 'Go straight for two blocks.', chinese: '直走两个街区。', type: 'declarative' },
    interrogative: { sentence: 'Should I go straight ahead?', chinese: '我应该一直往前走吗？', type: 'interrogative' },
  },
  turn: {
    declarative: { sentence: 'Turn left at the bank.', chinese: '在银行处向左转。', type: 'declarative' },
    interrogative: { sentence: 'Where should I turn?', chinese: '我应该在哪里转弯？', type: 'interrogative' },
  },
  welcome: {
    declarative: { sentence: 'Welcome to our school!', chinese: '欢迎来到我们学校！', type: 'declarative' },
    interrogative: { sentence: 'Are you welcome here?', chinese: '你在这里受欢迎吗？', type: 'interrogative' },
  },
  cloud: {
    declarative: { sentence: 'A white cloud floats by.', chinese: '一朵白云飘过。', type: 'declarative' },
    interrogative: { sentence: 'Can you see the cloud?', chinese: '你能看到那朵云吗？', type: 'interrogative' },
  },
  cloudy: {
    declarative: { sentence: 'It is cloudy this morning.', chinese: '今天早上多云。', type: 'declarative' },
    interrogative: { sentence: 'Will it be cloudy tomorrow?', chinese: '明天会多云吗？', type: 'interrogative' },
  },
  dry: {
    declarative: { sentence: 'The air feels very dry.', chinese: '空气感觉很干燥。', type: 'declarative' },
    interrogative: { sentence: 'Is the ground dry now?', chinese: '地面现在干吗？', type: 'interrogative' },
  },
  drop: {
    declarative: { sentence: 'A rain drop fell on me.', chinese: '一滴雨落在我身上。', type: 'declarative' },
    interrogative: { sentence: 'Did you feel a rain drop?', chinese: '你感觉到雨滴了吗？', type: 'interrogative' },
  },
  feel: {
    declarative: { sentence: 'I feel happy today.', chinese: '我今天感到开心。', type: 'declarative' },
    interrogative: { sentence: 'How do you feel now?', chinese: '你现在感觉怎么样？', type: 'interrogative' },
  },
  hard: {
    declarative: { sentence: 'It rains hard outside.', chinese: '外面雨下得很大。', type: 'declarative' },
    interrogative: { sentence: 'Is the wind blowing hard?', chinese: '风刮得很大吗？', type: 'interrogative' },
  },
  kite: {
    declarative: { sentence: 'I fly a kite in spring.', chinese: '春天我放风筝。', type: 'declarative' },
    interrogative: { sentence: 'Can you fly a kite?', chinese: '你会放风筝吗？', type: 'interrogative' },
  },
  pouring: {
    declarative: { sentence: 'It is pouring outside now.', chinese: '外面正在下瓢泼大雨。', type: 'declarative' },
    interrogative: { sentence: 'Is it pouring rain now?', chinese: '现在正在下大雨吗？', type: 'interrogative' },
  },
  rain: {
    declarative: { sentence: 'It may rain this afternoon.', chinese: '今天下午可能会下雨。', type: 'declarative' },
    interrogative: { sentence: 'Will it rain tomorrow?', chinese: '明天会下雨吗？', type: 'interrogative' },
  },
  rainy: {
    declarative: { sentence: 'It is a rainy day today.', chinese: '今天是雨天。', type: 'declarative' },
    interrogative: { sentence: 'Do you like rainy days?', chinese: '你喜欢雨天吗？', type: 'interrogative' },
  },
  snow: {
    declarative: { sentence: 'It snows in winter here.', chinese: '这里冬天会下雪。', type: 'declarative' },
    interrogative: { sentence: 'Does it snow in your city?', chinese: '你的城市下雪吗？', type: 'interrogative' },
  },
  snowy: {
    declarative: { sentence: 'We had a snowy morning.', chinese: '我们度过了一个下雪的早晨。', type: 'declarative' },
    interrogative: { sentence: 'Is it snowy outside now?', chinese: '外面现在下雪吗？', type: 'interrogative' },
  },
  sunny: {
    declarative: { sentence: 'It is sunny and warm today.', chinese: '今天阳光明媚又温暖。', type: 'declarative' },
    interrogative: { sentence: 'Will it be sunny tomorrow?', chinese: '明天会晴朗吗？', type: 'interrogative' },
  },
  wind: {
    declarative: { sentence: 'The wind is strong today.', chinese: '今天风很大。', type: 'declarative' },
    interrogative: { sentence: 'Can you feel the wind?', chinese: '你能感觉到风吗？', type: 'interrogative' },
  },
  windy: {
    declarative: { sentence: 'It is windy on the hill.', chinese: '山上风很大。', type: 'declarative' },
    interrogative: { sentence: 'Is it windy at the beach?', chinese: '海滩上风大吗？', type: 'interrogative' },
  },
  best: {
    declarative: { sentence: 'You are the best student.', chinese: '你是最好的学生。', type: 'declarative' },
    interrogative: { sentence: 'Who is the best singer?', chinese: '谁是最好的歌手？', type: 'interrogative' },
  },
  spring: {
    declarative: { sentence: 'Spring is warm and green.', chinese: '春天温暖又充满绿色。', type: 'declarative' },
    interrogative: { sentence: 'Do you like spring?', chinese: '你喜欢春天吗？', type: 'interrogative' },
  },
  summer: {
    declarative: { sentence: 'Summer is hot and sunny.', chinese: '夏天炎热又晴朗。', type: 'declarative' },
    interrogative: { sentence: 'What do you do in summer?', chinese: '夏天你做什么？', type: 'interrogative' },
  },
  autumn: {
    declarative: { sentence: 'Autumn leaves turn red.', chinese: '秋天的叶子变红了。', type: 'declarative' },
    interrogative: { sentence: 'Is autumn your favorite season?', chinese: '秋天是你最喜欢的季节吗？', type: 'interrogative' },
  },
  winter: {
    declarative: { sentence: 'Winter is cold and snowy.', chinese: '冬天寒冷又多雪。', type: 'declarative' },
    interrogative: { sentence: 'Do you like winter sports?', chinese: '你喜欢冬季运动吗？', type: 'interrogative' },
  },
  season: {
    declarative: { sentence: 'Spring is my favorite season.', chinese: '春天是我最喜欢的季节。', type: 'declarative' },
    interrogative: { sentence: 'Which season do you like?', chinese: '你喜欢哪个季节？', type: 'interrogative' },
  },
  warm: {
    declarative: { sentence: 'The soup is warm and nice.', chinese: '汤温热又好喝。', type: 'declarative' },
    interrogative: { sentence: 'Is it warm enough for you?', chinese: '对你来说够暖和吗？', type: 'interrogative' },
  },
  cool: {
    declarative: { sentence: 'The evening air feels cool.', chinese: '傍晚的空气很凉爽。', type: 'declarative' },
    interrogative: { sentence: 'Is the water cool enough?', chinese: '水够凉吗？', type: 'interrogative' },
  },
  cold: {
    declarative: { sentence: 'It is cold in winter.', chinese: '冬天很冷。', type: 'declarative' },
    interrogative: { sentence: 'Are you cold without a coat?', chinese: '没穿外套你冷吗？', type: 'interrogative' },
  },
  hot: {
    declarative: { sentence: 'The soup is too hot.', chinese: '汤太烫了。', type: 'declarative' },
    interrogative: { sentence: 'Is it hot in summer here?', chinese: '这里夏天热吗？', type: 'interrogative' },
  },
  travel: {
    declarative: { sentence: 'We travel by train.', chinese: '我们乘火车旅行。', type: 'declarative' },
    interrogative: { sentence: 'Do you like to travel?', chinese: '你喜欢旅行吗？', type: 'interrogative' },
  },
  umbrella: {
    declarative: { sentence: 'Take an umbrella with you.', chinese: '带上雨伞吧。', type: 'declarative' },
    interrogative: { sentence: 'Do you have an umbrella?', chinese: '你有雨伞吗？', type: 'interrogative' },
  },
  coat: {
    declarative: { sentence: 'Wear your coat in winter.', chinese: '冬天穿上你的外套。', type: 'declarative' },
    interrogative: { sentence: 'Is your coat warm enough?', chinese: '你的外套够暖和吗？', type: 'interrogative' },
  },
  boots: {
    declarative: { sentence: 'My new boots are brown.', chinese: '我的新靴子是棕色的。', type: 'declarative' },
    interrogative: { sentence: 'Do you like your boots?', chinese: '你喜欢你的靴子吗？', type: 'interrogative' },
  },
  gloves: {
    declarative: { sentence: 'Wear gloves on cold days.', chinese: '冷天戴上手套。', type: 'declarative' },
    interrogative: { sentence: 'Where are your gloves?', chinese: '你的手套在哪里？', type: 'interrogative' },
  },
  scarf: {
    declarative: { sentence: 'She wears a red scarf.', chinese: '她戴着一条红围巾。', type: 'declarative' },
    interrogative: { sentence: 'Is this scarf yours?', chinese: '这条围巾是你的吗？', type: 'interrogative' },
  },
  same: {
    declarative: { sentence: 'We wear the same uniform.', chinese: '我们穿同样的校服。', type: 'declarative' },
    interrogative: { sentence: 'Is your answer the same?', chinese: '你的答案一样吗？', type: 'interrogative' },
  },
  outside: {
    declarative: { sentence: 'Let us play outside.', chinese: '我们去外面玩吧。', type: 'declarative' },
    interrogative: { sentence: 'Is it safe to play outside?', chinese: '在外面玩安全吗？', type: 'interrogative' },
  },
  apple: {
    declarative: { sentence: 'I eat an apple every day.', chinese: '我每天吃一个苹果。', type: 'declarative' },
    interrogative: { sentence: 'Do you like green apples?', chinese: '你喜欢青苹果吗？', type: 'interrogative' },
  },
  happy: {
    declarative: { sentence: 'I am happy at school.', chinese: '我在学校很开心。', type: 'declarative' },
    interrogative: { sentence: 'Are you happy today?', chinese: '你今天开心吗？', type: 'interrogative' },
  },
  water: {
    declarative: { sentence: 'Drink more water, please.', chinese: '请多喝水。', type: 'declarative' },
    interrogative: { sentence: 'Do you want cold water?', chinese: '你想要冷水吗？', type: 'interrogative' },
  },
  green: {
    declarative: { sentence: 'The grass is green.', chinese: '草是绿色的。', type: 'declarative' },
    interrogative: { sentence: 'Is your bag green?', chinese: '你的包是绿色的吗？', type: 'interrogative' },
  },
  house: {
    declarative: { sentence: 'This is my new house.', chinese: '这是我的新房子。', type: 'declarative' },
    interrogative: { sentence: 'Is your house big?', chinese: '你的房子大吗？', type: 'interrogative' },
  },
  horse: {
    declarative: { sentence: 'The horse runs very fast.', chinese: '马跑得很快。', type: 'declarative' },
    interrogative: { sentence: 'Do you like horses?', chinese: '你喜欢马吗？', type: 'interrogative' },
  },
  train: {
    declarative: { sentence: 'I take a train to school.', chinese: '我乘火车去学校。', type: 'declarative' },
    interrogative: { sentence: 'Is the train on time?', chinese: '火车准时吗？', type: 'interrogative' },
  },
  tiger: {
    declarative: { sentence: 'The tiger is very strong.', chinese: '老虎非常强壮。', type: 'declarative' },
    interrogative: { sentence: 'Did you see a tiger?', chinese: '你看到老虎了吗？', type: 'interrogative' },
  },
  snake: {
    declarative: { sentence: 'I saw a snake in the zoo.', chinese: '我在动物园看到一条蛇。', type: 'declarative' },
    interrogative: { sentence: 'Are you afraid of snakes?', chinese: '你怕蛇吗？', type: 'interrogative' },
  },
  sheep: {
    declarative: { sentence: 'The sheep is white and soft.', chinese: '绵羊又白又软。', type: 'declarative' },
    interrogative: { sentence: 'How many sheep are there?', chinese: '有多少只绵羊？', type: 'interrogative' },
  },
  bread: {
    declarative: { sentence: 'I eat bread for breakfast.', chinese: '我早餐吃面包。', type: 'declarative' },
    interrogative: { sentence: 'Do you want more bread?', chinese: '你还要面包吗？', type: 'interrogative' },
  },
  candy: {
    declarative: { sentence: 'Too much candy is bad.', chinese: '吃太多糖果不好。', type: 'declarative' },
    interrogative: { sentence: 'Do you want some candy?', chinese: '你想要一些糖果吗？', type: 'interrogative' },
  },
  dance: {
    declarative: { sentence: 'I like to dance with friends.', chinese: '我喜欢和朋友跳舞。', type: 'declarative' },
    interrogative: { sentence: 'Can you dance well?', chinese: '你舞跳得好吗？', type: 'interrogative' },
  },
  speak: {
    declarative: { sentence: 'I speak English at school.', chinese: '我在学校说英语。', type: 'declarative' },
    interrogative: { sentence: 'Can you speak Chinese?', chinese: '你会说中文吗？', type: 'interrogative' },
  },
  write: {
    declarative: { sentence: 'I write a letter to Mom.', chinese: '我给妈妈写了一封信。', type: 'declarative' },
    interrogative: { sentence: 'Can you write your name?', chinese: '你会写你的名字吗？', type: 'interrogative' },
  },
  small: {
    declarative: { sentence: 'The cat is very small.', chinese: '这只猫很小。', type: 'declarative' },
    interrogative: { sentence: 'Is your room small?', chinese: '你的房间小吗？', type: 'interrogative' },
  },
  large: {
    declarative: { sentence: 'The park is very large.', chinese: '这个公园很大。', type: 'declarative' },
    interrogative: { sentence: 'Is the elephant large?', chinese: '大象大吗？', type: 'interrogative' },
  },
  tall: {
    declarative: { sentence: 'My brother is very tall.', chinese: '我哥哥很高。', type: 'declarative' },
    interrogative: { sentence: 'Is the building tall?', chinese: '那栋楼高吗？', type: 'interrogative' },
  },
  short: {
    declarative: { sentence: 'The pencil is too short.', chinese: '这支铅笔太短了。', type: 'declarative' },
    interrogative: { sentence: 'Is the story short?', chinese: '这个故事短吗？', type: 'interrogative' },
  },
  quick: {
    declarative: { sentence: 'Be quick, we are late!', chinese: '快点，我们迟到了！', type: 'declarative' },
    interrogative: { sentence: 'Can you give a quick answer?', chinese: '你能快速回答吗？', type: 'interrogative' },
  },
  slow: {
    declarative: { sentence: 'The turtle is very slow.', chinese: '乌龟很慢。', type: 'declarative' },
    interrogative: { sentence: 'Why is the bus so slow?', chinese: '公交车为什么这么慢？', type: 'interrogative' },
  },
  fast: {
    declarative: { sentence: 'I can run very fast.', chinese: '我能跑得很快。', type: 'declarative' },
    interrogative: { sentence: 'Is the train fast enough?', chinese: '火车够快吗？', type: 'interrogative' },
  },
  phone: {
    declarative: { sentence: 'Answer the phone, please.', chinese: '请接电话。', type: 'declarative' },
    interrogative: { sentence: 'Is that your phone ringing?', chinese: '那是你的电话在响吗？', type: 'interrogative' },
  },
  table: {
    declarative: { sentence: 'The book is on the table.', chinese: '书在桌子上。', type: 'declarative' },
    interrogative: { sentence: 'Is the table clean?', chinese: '桌子干净吗？', type: 'interrogative' },
  },
  chair: {
    declarative: { sentence: 'Sit on the chair, please.', chinese: '请坐在椅子上。', type: 'declarative' },
    interrogative: { sentence: 'Is this chair for me?', chinese: '这把椅子是给我的吗？', type: 'interrogative' },
  },
  clock: {
    declarative: { sentence: 'The clock shows eight o\'clock.', chinese: '钟显示八点。', type: 'declarative' },
    interrogative: { sentence: 'Is the clock on the wall?', chinese: '钟在墙上吗？', type: 'interrogative' },
  },
  light: {
    declarative: { sentence: 'Turn on the light, please.', chinese: '请开灯。', type: 'declarative' },
    interrogative: { sentence: 'Is the light too bright?', chinese: '灯太亮了吗？', type: 'interrogative' },
  },
  music: {
    declarative: { sentence: 'I love listening to music.', chinese: '我喜欢听音乐。', type: 'declarative' },
    interrogative: { sentence: 'Do you like this music?', chinese: '你喜欢这首音乐吗？', type: 'interrogative' },
  },
  friend: {
    declarative: { sentence: 'She is my best friend.', chinese: '她是我最好的朋友。', type: 'declarative' },
    interrogative: { sentence: 'Is he your new friend?', chinese: '他是你的新朋友吗？', type: 'interrogative' },
  },
  school: {
    declarative: { sentence: 'I go to school by bus.', chinese: '我乘公交车去学校。', type: 'declarative' },
    interrogative: { sentence: 'Do you like your school?', chinese: '你喜欢你的学校吗？', type: 'interrogative' },
  },
  flower: {
    declarative: { sentence: 'The flower smells sweet.', chinese: '这朵花闻起来很香。', type: 'declarative' },
    interrogative: { sentence: 'Do you like this flower?', chinese: '你喜欢这朵花吗？', type: 'interrogative' },
  },
  river: {
    declarative: { sentence: 'The river is long and wide.', chinese: '这条河又长又宽。', type: 'declarative' },
    interrogative: { sentence: 'Can we cross the river?', chinese: '我们能过河吗？', type: 'interrogative' },
  },
  about: {
    declarative: { sentence: 'Tell me about your trip.', chinese: '告诉我你的旅行。', type: 'declarative' },
    interrogative: { sentence: 'What is the book about?', chinese: '这本书是关于什么的？', type: 'interrogative' },
  },
  after: {
    declarative: { sentence: 'We play after school.', chinese: '我们放学后玩耍。', type: 'declarative' },
    interrogative: { sentence: 'What do you do after dinner?', chinese: '晚饭后你做什么？', type: 'interrogative' },
  },
  again: {
    declarative: { sentence: 'Please try again.', chinese: '请再试一次。', type: 'declarative' },
    interrogative: { sentence: 'Can we meet again tomorrow?', chinese: '我们明天能再见面吗？', type: 'interrogative' },
  },
  begin: {
    declarative: { sentence: 'Let us begin the lesson.', chinese: '让我们开始上课吧。', type: 'declarative' },
    interrogative: { sentence: 'When does class begin?', chinese: '课什么时候开始？', type: 'interrogative' },
  },
  bring: {
    declarative: { sentence: 'Bring your book tomorrow.', chinese: '明天带上你的书。', type: 'declarative' },
    interrogative: { sentence: 'Can you bring some fruit?', chinese: '你能带些水果吗？', type: 'interrogative' },
  },
  carry: {
    declarative: { sentence: 'Carry the box carefully.', chinese: '小心搬这个箱子。', type: 'declarative' },
    interrogative: { sentence: 'Can you carry this bag?', chinese: '你能拎这个包吗？', type: 'interrogative' },
  },
  clean: {
    declarative: { sentence: 'Keep your room clean.', chinese: '保持你的房间干净。', type: 'declarative' },
    interrogative: { sentence: 'Is the classroom clean now?', chinese: '教室现在干净吗？', type: 'interrogative' },
  },
  climb: {
    declarative: { sentence: 'We climb the hill together.', chinese: '我们一起爬山。', type: 'declarative' },
    interrogative: { sentence: 'Can you climb the tree?', chinese: '你能爬那棵树吗？', type: 'interrogative' },
  },
  close: {
    declarative: { sentence: 'Please close the door.', chinese: '请关上门。', type: 'declarative' },
    interrogative: { sentence: 'Did you close the window?', chinese: '你关窗户了吗？', type: 'interrogative' },
  },
  draw: {
    declarative: { sentence: 'I draw a cat on paper.', chinese: '我在纸上画了一只猫。', type: 'declarative' },
    interrogative: { sentence: 'Can you draw a house?', chinese: '你能画一座房子吗？', type: 'interrogative' },
  },
  early: {
    declarative: { sentence: 'I get up early every day.', chinese: '我每天早起。', type: 'declarative' },
    interrogative: { sentence: 'Are you early for class?', chinese: '你上课来早了吗？', type: 'interrogative' },
  },
  earth: {
    declarative: { sentence: 'The earth goes around the sun.', chinese: '地球绕着太阳转。', type: 'declarative' },
    interrogative: { sentence: 'Is the earth round?', chinese: '地球是圆的吗？', type: 'interrogative' },
  },
  every: {
    declarative: { sentence: 'I read books every night.', chinese: '我每晚读书。', type: 'declarative' },
    interrogative: { sentence: 'Do you exercise every day?', chinese: '你每天锻炼吗？', type: 'interrogative' },
  },
  fruit: {
    declarative: { sentence: 'Eat more fruit every day.', chinese: '每天多吃水果。', type: 'declarative' },
    interrogative: { sentence: 'What fruit do you like?', chinese: '你喜欢什么水果？', type: 'interrogative' },
  },
  grow: {
    declarative: { sentence: 'Plants grow in spring.', chinese: '植物在春天生长。', type: 'declarative' },
    interrogative: { sentence: 'Will the tree grow tall?', chinese: '这棵树会长高吗？', type: 'interrogative' },
  },
  guess: {
    declarative: { sentence: 'Guess what I have!', chinese: '猜猜我有什么！', type: 'declarative' },
    interrogative: { sentence: 'Can you guess the answer?', chinese: '你能猜出答案吗？', type: 'interrogative' },
  },
  heart: {
    declarative: { sentence: 'My heart beats fast.', chinese: '我的心跳得很快。', type: 'declarative' },
    interrogative: { sentence: 'Do you feel it in your heart?', chinese: '你心里感觉到了吗？', type: 'interrogative' },
  },
  heavy: {
    declarative: { sentence: 'The bag is too heavy.', chinese: '这个包太重了。', type: 'declarative' },
    interrogative: { sentence: 'Is the box heavy for you?', chinese: '这个箱子对你来说重吗？', type: 'interrogative' },
  },
  learn: {
    declarative: { sentence: 'I learn English at school.', chinese: '我在学校学英语。', type: 'declarative' },
    interrogative: { sentence: 'What did you learn today?', chinese: '你今天学了什么？', type: 'interrogative' },
  },
  leave: {
    declarative: { sentence: 'I must leave at five.', chinese: '我五点必须离开。', type: 'declarative' },
    interrogative: { sentence: 'When will you leave?', chinese: '你什么时候离开？', type: 'interrogative' },
  },
  money: {
    declarative: { sentence: 'Save your money wisely.', chinese: '明智地存钱吧。', type: 'declarative' },
    interrogative: { sentence: 'Do you have enough money?', chinese: '你有足够的钱吗？', type: 'interrogative' },
  },
  month: {
    declarative: { sentence: 'This month is very busy.', chinese: '这个月很忙。', type: 'declarative' },
    interrogative: { sentence: 'Which month is your birthday?', chinese: '你的生日是几月？', type: 'interrogative' },
  },
  night: {
    declarative: { sentence: 'Good night, sleep well.', chinese: '晚安，睡个好觉。', type: 'declarative' },
    interrogative: { sentence: 'Did you study last night?', chinese: '你昨晚学习了吗？', type: 'interrogative' },
  },
  paper: {
    declarative: { sentence: 'I need a piece of paper.', chinese: '我需要一张纸。', type: 'declarative' },
    interrogative: { sentence: 'Is this your paper?', chinese: '这是你的纸吗？', type: 'interrogative' },
  },
  plant: {
    declarative: { sentence: 'We plant trees in spring.', chinese: '我们在春天种树。', type: 'declarative' },
    interrogative: { sentence: 'Did you water the plant?', chinese: '你给植物浇水了吗？', type: 'interrogative' },
  },
  quiet: {
    declarative: { sentence: 'Please be quiet in class.', chinese: '请在课堂上保持安静。', type: 'declarative' },
    interrogative: { sentence: 'Is the library quiet now?', chinese: '图书馆现在安静吗？', type: 'interrogative' },
  },
  share: {
    declarative: { sentence: 'Share the cake with me.', chinese: '和我分享蛋糕吧。', type: 'declarative' },
    interrogative: { sentence: 'Will you share your toys?', chinese: '你会分享你的玩具吗？', type: 'interrogative' },
  },
  sleep: {
    declarative: { sentence: 'I need more sleep tonight.', chinese: '今晚我需要更多睡眠。', type: 'declarative' },
    interrogative: { sentence: 'Did you sleep well?', chinese: '你睡得好吗？', type: 'interrogative' },
  },
  smile: {
    declarative: { sentence: 'She smiles at her friend.', chinese: '她对朋友微笑。', type: 'declarative' },
    interrogative: { sentence: 'Why do you smile?', chinese: '你为什么微笑？', type: 'interrogative' },
  },
  space: {
    declarative: { sentence: 'There is space on the desk.', chinese: '桌子上有空间。', type: 'declarative' },
    interrogative: { sentence: 'Is there space for one more?', chinese: '还有空位吗？', type: 'interrogative' },
  },
  spend: {
    declarative: { sentence: 'I spend time with family.', chinese: '我和家人共度时光。', type: 'declarative' },
    interrogative: { sentence: 'How do you spend weekends?', chinese: '你怎么度过周末？', type: 'interrogative' },
  },
  start: {
    declarative: { sentence: 'Let us start the game.', chinese: '让我们开始游戏吧。', type: 'declarative' },
    interrogative: { sentence: 'When does the show start?', chinese: '演出什么时候开始？', type: 'interrogative' },
  },
  story: {
    declarative: { sentence: 'Tell me a funny story.', chinese: '给我讲个有趣的故事。', type: 'declarative' },
    interrogative: { sentence: 'Do you like this story?', chinese: '你喜欢这个故事吗？', type: 'interrogative' },
  },
  study: {
    declarative: { sentence: 'Study hard every day.', chinese: '每天努力学习。', type: 'declarative' },
    interrogative: { sentence: 'Do you study after school?', chinese: '你放学后学习吗？', type: 'interrogative' },
  },
  think: {
    declarative: { sentence: 'I think you are right.', chinese: '我认为你是对的。', type: 'declarative' },
    interrogative: { sentence: 'What do you think about it?', chinese: '你对它怎么看？', type: 'interrogative' },
  },
  tired: {
    declarative: { sentence: 'I am tired after running.', chinese: '跑步后我很累。', type: 'declarative' },
    interrogative: { sentence: 'Are you tired now?', chinese: '你现在累吗？', type: 'interrogative' },
  },
  today: {
    declarative: { sentence: 'Today is a sunny Monday.', chinese: '今天是晴朗的星期一。', type: 'declarative' },
    interrogative: { sentence: 'What will you do today?', chinese: '你今天要做什么？', type: 'interrogative' },
  },
  visit: {
    declarative: { sentence: 'We visit Grandma on Sunday.', chinese: '我们星期天去看望奶奶。', type: 'declarative' },
    interrogative: { sentence: 'Will you visit me tomorrow?', chinese: '你明天会来看我吗？', type: 'interrogative' },
  },
  watch: {
    declarative: { sentence: 'I watch TV after dinner.', chinese: '晚饭后我看电视。', type: 'declarative' },
    interrogative: { sentence: 'Do you watch cartoons?', chinese: '你看动画片吗？', type: 'interrogative' },
  },
  white: {
    declarative: { sentence: 'Snow is white and soft.', chinese: '雪又白又软。', type: 'declarative' },
    interrogative: { sentence: 'Is your shirt white?', chinese: '你的衬衫是白色的吗？', type: 'interrogative' },
  },
  world: {
    declarative: { sentence: 'Travel around the world.', chinese: '环游世界。', type: 'declarative' },
    interrogative: { sentence: 'Do you know the world map?', chinese: '你认识世界地图吗？', type: 'interrogative' },
  },
  young: {
    declarative: { sentence: 'She is young and kind.', chinese: '她年轻又善良。', type: 'declarative' },
    interrogative: { sentence: 'Is the tree still young?', chinese: '这棵树还年轻吗？', type: 'interrogative' },
  },
  dream: {
    declarative: { sentence: 'I had a sweet dream.', chinese: '我做了一个甜美的梦。', type: 'declarative' },
    interrogative: { sentence: 'What was your dream about?', chinese: '你的梦是关于什么的？', type: 'interrogative' },
  },
  grape: {
    declarative: { sentence: 'I like sweet grapes.', chinese: '我喜欢甜葡萄。', type: 'declarative' },
    interrogative: { sentence: 'Do you want more grapes?', chinese: '你还要葡萄吗？', type: 'interrogative' },
  },
  lemon: {
    declarative: { sentence: 'The lemon tastes sour.', chinese: '柠檬尝起来很酸。', type: 'declarative' },
    interrogative: { sentence: 'Do you like lemon juice?', chinese: '你喜欢柠檬汁吗？', type: 'interrogative' },
  },
  mango: {
    declarative: { sentence: 'The mango is sweet and juicy.', chinese: '芒果又甜又多汁。', type: 'declarative' },
    interrogative: { sentence: 'Is this mango ripe?', chinese: '这个芒果熟了吗？', type: 'interrogative' },
  },
  peach: {
    declarative: { sentence: 'I ate a juicy peach.', chinese: '我吃了一个多汁的桃子。', type: 'declarative' },
    interrogative: { sentence: 'Do you like peaches?', chinese: '你喜欢桃子吗？', type: 'interrogative' },
  },
  teacher: {
    declarative: { sentence: 'My teacher is very kind.', chinese: '我的老师很善良。', type: 'declarative' },
    interrogative: { sentence: 'Is your teacher strict?', chinese: '你的老师严格吗？', type: 'interrogative' },
  },
  student: {
    declarative: { sentence: 'I am a good student.', chinese: '我是一个好学生。', type: 'declarative' },
    interrogative: { sentence: 'Are you a new student?', chinese: '你是新学生吗？', type: 'interrogative' },
  },
  garden: {
    declarative: { sentence: 'Flowers grow in the garden.', chinese: '花在花园里生长。', type: 'declarative' },
    interrogative: { sentence: 'Is the garden behind the house?', chinese: '花园在房子后面吗？', type: 'interrogative' },
  },
  forest: {
    declarative: { sentence: 'Birds live in the forest.', chinese: '鸟儿住在森林里。', type: 'declarative' },
    interrogative: { sentence: 'Is the forest far away?', chinese: '森林很远吗？', type: 'interrogative' },
  },
  doctor: {
    declarative: { sentence: 'The doctor helps sick people.', chinese: '医生帮助生病的人。', type: 'declarative' },
    interrogative: { sentence: 'Should I see a doctor?', chinese: '我应该去看医生吗？', type: 'interrogative' },
  },
  pencil: {
    declarative: { sentence: 'I write with a pencil.', chinese: '我用铅笔写字。', type: 'declarative' },
    interrogative: { sentence: 'Is this your pencil?', chinese: '这是你的铅笔吗？', type: 'interrogative' },
  },
  chicken: {
    declarative: { sentence: 'I like fried chicken.', chinese: '我喜欢炸鸡。', type: 'declarative' },
    interrogative: { sentence: 'Do you eat chicken often?', chinese: '你经常吃鸡肉吗？', type: 'interrogative' },
  },
  rabbit: {
    declarative: { sentence: 'The rabbit has long ears.', chinese: '兔子有长耳朵。', type: 'declarative' },
    interrogative: { sentence: 'Is the rabbit white?', chinese: '兔子是白色的吗？', type: 'interrogative' },
  },
  monkey: {
    declarative: { sentence: 'The monkey climbs the tree.', chinese: '猴子爬树。', type: 'declarative' },
    interrogative: { sentence: 'Can the monkey jump high?', chinese: '猴子能跳得高吗？', type: 'interrogative' },
  },
  elephant: {
    declarative: { sentence: 'The elephant is very big.', chinese: '大象非常大。', type: 'declarative' },
    interrogative: { sentence: 'Did you see the elephant?', chinese: '你看到大象了吗？', type: 'interrogative' },
  },
  giraffe: {
    declarative: { sentence: 'The giraffe has a long neck.', chinese: '长颈鹿有长脖子。', type: 'declarative' },
    interrogative: { sentence: 'Is the giraffe tall?', chinese: '长颈鹿高吗？', type: 'interrogative' },
  },
  penguin: {
    declarative: { sentence: 'The penguin cannot fly.', chinese: '企鹅不会飞。', type: 'declarative' },
    interrogative: { sentence: 'Do you like penguins?', chinese: '你喜欢企鹅吗？', type: 'interrogative' },
  },
  dolphin: {
    declarative: { sentence: 'The dolphin can jump high.', chinese: '海豚能跳得很高。', type: 'declarative' },
    interrogative: { sentence: 'Did you see a dolphin?', chinese: '你看到海豚了吗？', type: 'interrogative' },
  },
  butterfly: {
    declarative: { sentence: 'The butterfly is beautiful.', chinese: '蝴蝶很美丽。', type: 'declarative' },
    interrogative: { sentence: 'Can you catch a butterfly?', chinese: '你能抓到蝴蝶吗？', type: 'interrogative' },
  },
  kitchen: {
    declarative: { sentence: 'Mom cooks in the kitchen.', chinese: '妈妈在厨房做饭。', type: 'declarative' },
    interrogative: { sentence: 'Is the kitchen clean?', chinese: '厨房干净吗？', type: 'interrogative' },
  },
  bedroom: {
    declarative: { sentence: 'I sleep in my bedroom.', chinese: '我在卧室睡觉。', type: 'declarative' },
    interrogative: { sentence: 'Is your bedroom tidy?', chinese: '你的卧室整洁吗？', type: 'interrogative' },
  },
  morning: {
    declarative: { sentence: 'Good morning, class!', chinese: '早上好，同学们！', type: 'declarative' },
    interrogative: { sentence: 'What do you do every morning?', chinese: '你每天早上做什么？', type: 'interrogative' },
  },
  evening: {
    declarative: { sentence: 'Good evening, Mr. Li.', chinese: '晚上好，李老师。', type: 'declarative' },
    interrogative: { sentence: 'Will you study this evening?', chinese: '你今晚要学习吗？', type: 'interrogative' },
  },
  exercise: {
    declarative: { sentence: 'I exercise every morning.', chinese: '我每天早上锻炼。', type: 'declarative' },
    interrogative: { sentence: 'Do you exercise after school?', chinese: '你放学后锻炼吗？', type: 'interrogative' },
  },
  healthy: {
    declarative: { sentence: 'Eating fruit keeps you healthy.', chinese: '吃水果让你保持健康。', type: 'declarative' },
    interrogative: { sentence: 'Are you healthy this year?', chinese: '你今年健康吗？', type: 'interrogative' },
  },
  balance: {
    declarative: { sentence: 'Keep your balance on the rope.', chinese: '在绳子上保持平衡。', type: 'declarative' },
    interrogative: { sentence: 'Can you keep good balance?', chinese: '你能保持良好平衡吗？', type: 'interrogative' },
  },
  energy: {
    declarative: { sentence: 'I have lots of energy today.', chinese: '我今天精力充沛。', type: 'declarative' },
    interrogative: { sentence: 'Do you have enough energy?', chinese: '你有足够的精力吗？', type: 'interrogative' },
  },
  wonderful: {
    declarative: { sentence: 'What a wonderful day!', chinese: '多么美好的一天！', type: 'declarative' },
    interrogative: { sentence: 'Is the trip wonderful?', chinese: '这次旅行很棒吗？', type: 'interrogative' },
  },
  beautiful: {
    declarative: { sentence: 'The sunset is beautiful.', chinese: '日落很美丽。', type: 'declarative' },
    interrogative: { sentence: 'Is the garden beautiful?', chinese: '花园美丽吗？', type: 'interrogative' },
  },
  different: {
    declarative: { sentence: 'We are different but friends.', chinese: '我们不同但是朋友。', type: 'declarative' },
    interrogative: { sentence: 'Are your answers different?', chinese: '你们的答案不同吗？', type: 'interrogative' },
  },
  important: {
    declarative: { sentence: 'Homework is very important.', chinese: '家庭作业非常重要。', type: 'declarative' },
    interrogative: { sentence: 'Is this rule important?', chinese: '这条规则重要吗？', type: 'interrogative' },
  },
  interesting: {
    declarative: { sentence: 'This book is very interesting.', chinese: '这本书非常有趣。', type: 'declarative' },
    interrogative: { sentence: 'Is the story interesting?', chinese: '这个故事有趣吗？', type: 'interrogative' },
  },
  ocean: {
    declarative: { sentence: 'The ocean is very deep.', chinese: '海洋非常深。', type: 'declarative' },
    interrogative: { sentence: 'Have you seen the ocean?', chinese: '你见过海洋吗？', type: 'interrogative' },
  },
  airport: {
    declarative: { sentence: 'We go to the airport early.', chinese: '我们早早去机场。', type: 'declarative' },
    interrogative: { sentence: 'Is the airport far from here?', chinese: '机场离这里远吗？', type: 'interrogative' },
  },
  already: {
    declarative: { sentence: 'I already finished my work.', chinese: '我已经完成了作业。', type: 'declarative' },
    interrogative: { sentence: 'Have you already eaten lunch?', chinese: '你已经吃午饭了吗？', type: 'interrogative' },
  },
  bottle: {
    declarative: { sentence: 'I have a water bottle.', chinese: '我有一个水瓶。', type: 'declarative' },
    interrogative: { sentence: 'Is your bottle empty?', chinese: '你的瓶子空了吗？', type: 'interrogative' },
  },
  bridge: {
    declarative: { sentence: 'We cross the old bridge.', chinese: '我们穿过那座旧桥。', type: 'declarative' },
    interrogative: { sentence: 'Is the bridge safe?', chinese: '这座桥安全吗？', type: 'interrogative' },
  },
  castle: {
    declarative: { sentence: 'The castle looks like a dream.', chinese: '城堡看起来像梦一样。', type: 'declarative' },
    interrogative: { sentence: 'Did you visit the castle?', chinese: '你参观城堡了吗？', type: 'interrogative' },
  },
  clever: {
    declarative: { sentence: 'She is a clever girl.', chinese: '她是一个聪明的女孩。', type: 'declarative' },
    interrogative: { sentence: 'Are you clever at math?', chinese: '你数学聪明吗？', type: 'interrogative' },
  },
  collect: {
    declarative: { sentence: 'I collect stamps for fun.', chinese: '我集邮取乐。', type: 'declarative' },
    interrogative: { sentence: 'Do you collect coins?', chinese: '你收集硬币吗？', type: 'interrogative' },
  },
  company: {
    declarative: { sentence: 'My dad works at a company.', chinese: '我爸爸在一家公司工作。', type: 'declarative' },
    interrogative: { sentence: 'Is the company very big?', chinese: '这家公司很大吗？', type: 'interrogative' },
  },
  cousin: {
    declarative: { sentence: 'My cousin lives in Beijing.', chinese: '我的表亲住在北京。', type: 'declarative' },
    interrogative: { sentence: 'Do you see your cousin often?', chinese: '你经常见表亲吗？', type: 'interrogative' },
  },
  crystal: {
    declarative: { sentence: 'The crystal ball shines bright.', chinese: '水晶球闪闪发光。', type: 'declarative' },
    interrogative: { sentence: 'Is that a real crystal?', chinese: '那是真水晶吗？', type: 'interrogative' },
  },
  culture: {
    declarative: { sentence: 'We learn Chinese culture.', chinese: '我们学习中国文化。', type: 'declarative' },
    interrogative: { sentence: 'Do you like local culture?', chinese: '你喜欢当地文化吗？', type: 'interrogative' },
  },
  danger: {
    declarative: { sentence: 'Stay away from danger.', chinese: '远离危险。', type: 'declarative' },
    interrogative: { sentence: 'Is there danger ahead?', chinese: '前面有危险吗？', type: 'interrogative' },
  },
  desert: {
    declarative: { sentence: 'The desert is hot and dry.', chinese: '沙漠又热又干燥。', type: 'declarative' },
    interrogative: { sentence: 'Have you seen a desert?', chinese: '你见过沙漠吗？', type: 'interrogative' },
  },
  develop: {
    declarative: { sentence: 'We develop good habits.', chinese: '我们养成好习惯。', type: 'declarative' },
    interrogative: { sentence: 'Can you develop new skills?', chinese: '你能培养新技能吗？', type: 'interrogative' },
  },
  diamond: {
    declarative: { sentence: 'The diamond ring is shiny.', chinese: '钻石戒指闪闪发光。', type: 'declarative' },
    interrogative: { sentence: 'Is that a real diamond?', chinese: '那是真钻石吗？', type: 'interrogative' },
  },
  dinosaur: {
    declarative: { sentence: 'The dinosaur lived long ago.', chinese: '恐龙生活在很久以前。', type: 'declarative' },
    interrogative: { sentence: 'Do you like dinosaur stories?', chinese: '你喜欢恐龙故事吗？', type: 'interrogative' },
  },
  discover: {
    declarative: { sentence: 'Scientists discover new stars.', chinese: '科学家发现新的星星。', type: 'declarative' },
    interrogative: { sentence: 'What did you discover today?', chinese: '你今天发现了什么？', type: 'interrogative' },
  },
  dragon: {
    declarative: { sentence: 'The dragon flies in the sky.', chinese: '龙在天空飞翔。', type: 'declarative' },
    interrogative: { sentence: 'Do you like the dragon dance?', chinese: '你喜欢舞龙吗？', type: 'interrogative' },
  },
  escape: {
    declarative: { sentence: 'The rabbit tried to escape.', chinese: '兔子试图逃跑。', type: 'declarative' },
    interrogative: { sentence: 'Can we escape from the maze?', chinese: '我们能逃出迷宫吗？', type: 'interrogative' },
  },
  example: {
    declarative: { sentence: 'Give me an example, please.', chinese: '请给我一个例子。', type: 'declarative' },
    interrogative: { sentence: 'Is this a good example?', chinese: '这是一个好例子吗？', type: 'interrogative' },
  },
  famous: {
    declarative: { sentence: 'He is a famous writer.', chinese: '他是一位著名作家。', type: 'declarative' },
    interrogative: { sentence: 'Is Paris a famous city?', chinese: '巴黎是著名城市吗？', type: 'interrogative' },
  },
  feather: {
    declarative: { sentence: 'The bird lost a feather.', chinese: '鸟掉了一根羽毛。', type: 'declarative' },
    interrogative: { sentence: 'Is the feather soft?', chinese: '羽毛软吗？', type: 'interrogative' },
  },
  finger: {
    declarative: { sentence: 'Point with one finger only.', chinese: '只用一根手指指。', type: 'declarative' },
    interrogative: { sentence: 'Did you hurt your finger?', chinese: '你伤到手了吗？', type: 'interrogative' },
  },
  flight: {
    declarative: { sentence: 'Our flight leaves at ten.', chinese: '我们的航班十点起飞。', type: 'declarative' },
    interrogative: { sentence: 'Is the flight on time?', chinese: '航班准时吗？', type: 'interrogative' },
  },
  follow: {
    declarative: { sentence: 'Follow me, please.', chinese: '请跟我来。', type: 'declarative' },
    interrogative: { sentence: 'Will you follow the rules?', chinese: '你会遵守规则吗？', type: 'interrogative' },
  },
  freeze: {
    declarative: { sentence: 'Water freezes in winter.', chinese: '水在冬天结冰。', type: 'declarative' },
    interrogative: { sentence: 'Will the lake freeze tonight?', chinese: '今晚湖面会结冰吗？', type: 'interrogative' },
  },
  future: {
    declarative: { sentence: 'Think about your future.', chinese: '想想你的未来。', type: 'declarative' },
    interrogative: { sentence: 'What do you want in the future?', chinese: '你未来想要什么？', type: 'interrogative' },
  },
  gentle: {
    declarative: { sentence: 'She has a gentle voice.', chinese: '她声音温柔。', type: 'declarative' },
    interrogative: { sentence: 'Is the dog gentle?', chinese: '这只狗温顺吗？', type: 'interrogative' },
  },
  golden: {
    declarative: { sentence: 'The golden sun rises early.', chinese: '金色的太阳早早升起。', type: 'declarative' },
    interrogative: { sentence: 'Is the ring golden?', chinese: '戒指是金色的吗？', type: 'interrogative' },
  },
  guitar: {
    declarative: { sentence: 'He plays the guitar well.', chinese: '他吉他弹得很好。', type: 'declarative' },
    interrogative: { sentence: 'Can you play the guitar?', chinese: '你会弹吉他吗？', type: 'interrogative' },
  },
  honest: {
    declarative: { sentence: 'Be honest with your teacher.', chinese: '对老师要诚实。', type: 'declarative' },
    interrogative: { sentence: 'Are you always honest?', chinese: '你总是诚实吗？', type: 'interrogative' },
  },
  jungle: {
    declarative: { sentence: 'Monkeys live in the jungle.', chinese: '猴子住在丛林里。', type: 'declarative' },
    interrogative: { sentence: 'Is the jungle dangerous?', chinese: '丛林危险吗？', type: 'interrogative' },
  },
  kingdom: {
    declarative: { sentence: 'The kingdom has a kind king.', chinese: '王国有一位善良的国王。', type: 'declarative' },
    interrogative: { sentence: 'Is this a magic kingdom?', chinese: '这是魔法王国吗？', type: 'interrogative' },
  },
  ladder: {
    declarative: { sentence: 'Climb the ladder carefully.', chinese: '小心爬梯子。', type: 'declarative' },
    interrogative: { sentence: 'Is the ladder tall enough?', chinese: '梯子够高吗？', type: 'interrogative' },
  },
  launch: {
    declarative: { sentence: 'They launch the rocket today.', chinese: '他们今天发射火箭。', type: 'declarative' },
    interrogative: { sentence: 'When will they launch it?', chinese: '他们什么时候发射？', type: 'interrogative' },
  },
  market: {
    declarative: { sentence: 'The market is busy today.', chinese: '今天市场很热闹。', type: 'declarative' },
    interrogative: { sentence: 'Is the market open now?', chinese: '市场现在开门吗？', type: 'interrogative' },
  },
  master: {
    declarative: { sentence: 'He is a kung fu master.', chinese: '他是一位功夫大师。', type: 'declarative' },
    interrogative: { sentence: 'Can the master teach us?', chinese: '大师能教我们吗？', type: 'interrogative' },
  },
  mirror: {
    declarative: { sentence: 'Look in the mirror, please.', chinese: '请照照镜子。', type: 'declarative' },
    interrogative: { sentence: 'Is the mirror clean?', chinese: '镜子干净吗？', type: 'interrogative' },
  },
  modern: {
    declarative: { sentence: 'This is a modern school.', chinese: '这是一所现代化学校。', type: 'declarative' },
    interrogative: { sentence: 'Do you like modern art?', chinese: '你喜欢现代艺术吗？', type: 'interrogative' },
  },
  planet: {
    declarative: { sentence: 'Earth is a blue planet.', chinese: '地球是一颗蓝色行星。', type: 'declarative' },
    interrogative: { sentence: 'Is Mars a red planet?', chinese: '火星是红色行星吗？', type: 'interrogative' },
  },
  silver: {
    declarative: { sentence: 'She wears a silver ring.', chinese: '她戴着银戒指。', type: 'declarative' },
    interrogative: { sentence: 'Is the moon silver tonight?', chinese: '今晚月亮银光闪闪吗？', type: 'interrogative' },
  },
  spirit: {
    declarative: { sentence: 'We have strong team spirit.', chinese: '我们有很强的团队精神。', type: 'declarative' },
    interrogative: { sentence: 'Do you have school spirit?', chinese: '你有校园精神吗？', type: 'interrogative' },
  },
  temple: {
    declarative: { sentence: 'The old temple is quiet.', chinese: '古老的寺庙很安静。', type: 'declarative' },
    interrogative: { sentence: 'Did you visit the temple?', chinese: '你参观寺庙了吗？', type: 'interrogative' },
  },
  village: {
    declarative: { sentence: 'He lives in a small village.', chinese: '他住在一个小村庄。', type: 'declarative' },
    interrogative: { sentence: 'Is the village far away?', chinese: '村庄很远吗？', type: 'interrogative' },
  },
  adventure: {
    declarative: { sentence: 'I love adventure stories.', chinese: '我喜欢冒险故事。', type: 'declarative' },
    interrogative: { sentence: 'Do you want an adventure?', chinese: '你想要一次冒险吗？', type: 'interrogative' },
  },
  celebrate: {
    declarative: { sentence: 'We celebrate the New Year.', chinese: '我们庆祝新年。', type: 'declarative' },
    interrogative: { sentence: 'How will you celebrate today?', chinese: '你今天怎么庆祝？', type: 'interrogative' },
  },
  difficult: {
    declarative: { sentence: 'This question is difficult.', chinese: '这个问题很难。', type: 'declarative' },
    interrogative: { sentence: 'Is the test difficult?', chinese: '考试难吗？', type: 'interrogative' },
  },
  education: {
    declarative: { sentence: 'Education is very important.', chinese: '教育非常重要。', type: 'declarative' },
    interrogative: { sentence: 'Do you value good education?', chinese: '你重视良好的教育吗？', type: 'interrogative' },
  },
  favorite: {
    declarative: { sentence: 'Blue is my favorite color.', chinese: '蓝色是我最喜欢的颜色。', type: 'declarative' },
    interrogative: { sentence: 'What is your favorite food?', chinese: '你最喜欢的食物是什么？', type: 'interrogative' },
  },
  happiness: {
    declarative: { sentence: 'Happiness comes from family love.', chinese: '幸福来自家人的爱。', type: 'declarative' },
    interrogative: { sentence: 'Does music bring you happiness?', chinese: '音乐给你带来幸福吗？', type: 'interrogative' },
  },
  knowledge: {
    declarative: { sentence: 'Knowledge helps us grow.', chinese: '知识帮助我们成长。', type: 'declarative' },
    interrogative: { sentence: 'Do you want more knowledge?', chinese: '你想要更多知识吗？', type: 'interrogative' },
  },
  mystery: {
    declarative: { sentence: 'The old box is a mystery.', chinese: '旧盒子是个谜。', type: 'declarative' },
    interrogative: { sentence: 'Can you solve the mystery?', chinese: '你能解开这个谜吗？', type: 'interrogative' },
  },
  necessary: {
    declarative: { sentence: 'Sleep is necessary for health.', chinese: '睡眠对健康是必要的。', type: 'declarative' },
    interrogative: { sentence: 'Is it necessary to go now?', chinese: '现在有必要去吗？', type: 'interrogative' },
  },
  opposite: {
    declarative: { sentence: 'Hot is the opposite of cold.', chinese: '热是冷的反义词。', type: 'declarative' },
    interrogative: { sentence: 'What is the opposite of up?', chinese: '上的反义词是什么？', type: 'interrogative' },
  },
  recognize: {
    declarative: { sentence: 'I recognize that old song.', chinese: '我认出那首老歌。', type: 'declarative' },
    interrogative: { sentence: 'Do you recognize this place?', chinese: '你认出这个地方吗？', type: 'interrogative' },
  },
  technology: {
    declarative: { sentence: 'Technology changes our lives.', chinese: '技术改变我们的生活。', type: 'declarative' },
    interrogative: { sentence: 'Do you like new technology?', chinese: '你喜欢新技术吗？', type: 'interrogative' },
  },
  atmosphere: {
    declarative: { sentence: 'The party has a fun atmosphere.', chinese: '聚会气氛很有趣。', type: 'declarative' },
    interrogative: { sentence: 'Is the atmosphere friendly?', chinese: '气氛友好吗？', type: 'interrogative' },
  },
  furniture: {
    declarative: { sentence: 'We bought new furniture.', chinese: '我们买了新家具。', type: 'declarative' },
    interrogative: { sentence: 'Is the furniture heavy?', chinese: '家具重吗？', type: 'interrogative' },
  },
  guardian: {
    declarative: { sentence: 'Parents are our guardians.', chinese: '父母是我们的守护者。', type: 'declarative' },
    interrogative: { sentence: 'Who is your guardian angel?', chinese: '谁是你的守护天使？', type: 'interrogative' },
  },
  heritage: {
    declarative: { sentence: 'We protect cultural heritage.', chinese: '我们保护文化遗产。', type: 'declarative' },
    interrogative: { sentence: 'Do you know your heritage?', chinese: '你了解你的遗产吗？', type: 'interrogative' },
  },
  notebook: {
    declarative: { sentence: 'Write notes in your notebook.', chinese: '在笔记本里做笔记。', type: 'declarative' },
    interrogative: { sentence: 'Is this your notebook?', chinese: '这是你的笔记本吗？', type: 'interrogative' },
  },
  question: {
    declarative: { sentence: 'I have a hard question.', chinese: '我有一个难题。', type: 'declarative' },
    interrogative: { sentence: 'May I ask a question?', chinese: '我可以问一个问题吗？', type: 'interrogative' },
  },
  tradition: {
    declarative: { sentence: 'It is our family tradition.', chinese: '这是我们家的传统。', type: 'declarative' },
    interrogative: { sentence: 'Do you follow this tradition?', chinese: '你遵循这个传统吗？', type: 'interrogative' },
  },
  valuable: {
    declarative: { sentence: 'Time is very valuable.', chinese: '时间非常宝贵。', type: 'declarative' },
    interrogative: { sentence: 'Is this book valuable?', chinese: '这本书有价值吗？', type: 'interrogative' },
  },
  absolute: {
    declarative: { sentence: 'I need an absolute answer.', chinese: '我需要一个绝对的答案。', type: 'declarative' },
    interrogative: { sentence: 'Is that an absolute rule?', chinese: '那是绝对规则吗？', type: 'interrogative' },
  },
  accurate: {
    declarative: { sentence: 'Your answer is accurate.', chinese: '你的答案是准确的。', type: 'declarative' },
    interrogative: { sentence: 'Is the map accurate enough?', chinese: '地图够准确吗？', type: 'interrogative' },
  },
  ambition: {
    declarative: { sentence: 'She has big ambition.', chinese: '她有很大的抱负。', type: 'declarative' },
    interrogative: { sentence: 'What is your ambition?', chinese: '你的抱负是什么？', type: 'interrogative' },
  },
  analysis: {
    declarative: { sentence: 'We did a data analysis.', chinese: '我们做了数据分析。', type: 'declarative' },
    interrogative: { sentence: 'Did you finish the analysis?', chinese: '你完成分析了吗？', type: 'interrogative' },
  },
  ancient: {
    declarative: { sentence: 'This is an ancient temple.', chinese: '这是一座古老的寺庙。', type: 'declarative' },
    interrogative: { sentence: 'Do you like ancient history?', chinese: '你喜欢古代历史吗？', type: 'interrogative' },
  },
  announce: {
    declarative: { sentence: 'They announce the winner now.', chinese: '他们现在宣布获胜者。', type: 'declarative' },
    interrogative: { sentence: 'Who will announce the news?', chinese: '谁将宣布这个消息？', type: 'interrogative' },
  },
  approach: {
    declarative: { sentence: 'We need a new approach.', chinese: '我们需要新方法。', type: 'declarative' },
    interrogative: { sentence: 'Is this approach better?', chinese: '这种方法更好吗？', type: 'interrogative' },
  },
  argument: {
    declarative: { sentence: 'They had a loud argument.', chinese: '他们大吵了一架。', type: 'declarative' },
    interrogative: { sentence: 'Did you win the argument?', chinese: '你赢得争论了吗？', type: 'interrogative' },
  },
  campaign: {
    declarative: { sentence: 'The school starts a reading campaign.', chinese: '学校开展阅读活动。', type: 'declarative' },
    interrogative: { sentence: 'Is the campaign successful?', chinese: '活动成功吗？', type: 'interrogative' },
  },
  capacity: {
    declarative: { sentence: 'The hall is full capacity.', chinese: '大厅已满员。', type: 'declarative' },
    interrogative: { sentence: 'What is the room capacity?', chinese: '房间容量是多少？', type: 'interrogative' },
  },
  category: {
    declarative: { sentence: 'Put it in this category.', chinese: '把它放在这个类别里。', type: 'declarative' },
    interrogative: { sentence: 'Which category is it in?', chinese: '它在哪个类别？', type: 'interrogative' },
  },
  cautious: {
    declarative: { sentence: 'Be cautious on wet roads.', chinese: '在湿滑路上要小心。', type: 'declarative' },
    interrogative: { sentence: 'Are you cautious enough?', chinese: '你足够谨慎吗？', type: 'interrogative' },
  },
  ceremony: {
    declarative: { sentence: 'We had a short ceremony.', chinese: '我们举行了一个简短的仪式。', type: 'declarative' },
    interrogative: { sentence: 'When does the ceremony start?', chinese: '仪式什么时候开始？', type: 'interrogative' },
  },
  champion: {
    declarative: { sentence: 'She is the school champion.', chinese: '她是学校冠军。', type: 'declarative' },
    interrogative: { sentence: 'Who is the new champion?', chinese: '新冠军是谁？', type: 'interrogative' },
  },
  chemical: {
    declarative: { sentence: 'Wear gloves for chemical work.', chinese: '做化学工作要戴手套。', type: 'declarative' },
    interrogative: { sentence: 'Is this a chemical change?', chinese: '这是化学变化吗？', type: 'interrogative' },
  },
  collapse: {
    declarative: { sentence: 'The old wall may collapse.', chinese: '旧墙可能会倒塌。', type: 'declarative' },
    interrogative: { sentence: 'Did the bridge collapse?', chinese: '桥倒塌了吗？', type: 'interrogative' },
  },
  commerce: {
    declarative: { sentence: 'Commerce helps cities grow.', chinese: '商业帮助城市发展。', type: 'declarative' },
    interrogative: { sentence: 'Do you study commerce?', chinese: '你学商业吗？', type: 'interrogative' },
  },
  complain: {
    declarative: { sentence: 'Do not complain all day.', chinese: '不要整天抱怨。', type: 'declarative' },
    interrogative: { sentence: 'Why do you complain so much?', chinese: '你为什么抱怨这么多？', type: 'interrogative' },
  },
  conclude: {
    declarative: { sentence: 'Let us conclude the meeting.', chinese: '让我们结束会议吧。', type: 'declarative' },
    interrogative: { sentence: 'What did you conclude?', chinese: '你得出了什么结论？', type: 'interrogative' },
  },
  concrete: {
    declarative: { sentence: 'We need concrete evidence.', chinese: '我们需要具体证据。', type: 'declarative' },
    interrogative: { sentence: 'Is the plan concrete enough?', chinese: '计划够具体吗？', type: 'interrogative' },
  },
  conflict: {
    declarative: { sentence: 'Try to avoid conflict.', chinese: '尽量避免冲突。', type: 'declarative' },
    interrogative: { sentence: 'Was there a conflict today?', chinese: '今天有冲突吗？', type: 'interrogative' },
  },
  consider: {
    declarative: { sentence: 'Consider my idea carefully.', chinese: '仔细考虑我的想法。', type: 'declarative' },
    interrogative: { sentence: 'Will you consider helping me?', chinese: '你会考虑帮我吗？', type: 'interrogative' },
  },
  constant: {
    declarative: { sentence: 'Practice needs constant effort.', chinese: '练习需要持续努力。', type: 'declarative' },
    interrogative: { sentence: 'Is the speed constant?', chinese: '速度恒定吗？', type: 'interrogative' },
  },
  consumer: {
    declarative: { sentence: 'The consumer buys fresh food.', chinese: '消费者购买新鲜食物。', type: 'declarative' },
    interrogative: { sentence: 'Are you a careful consumer?', chinese: '你是细心的消费者吗？', type: 'interrogative' },
  },
  contrast: {
    declarative: { sentence: 'Use contrast in your drawing.', chinese: '在画中使用对比。', type: 'declarative' },
    interrogative: { sentence: 'What is the contrast here?', chinese: '这里的对比是什么？', type: 'interrogative' },
  },
  convince: {
    declarative: { sentence: 'I try to convince my friend.', chinese: '我试图说服我的朋友。', type: 'declarative' },
    interrogative: { sentence: 'Can you convince your dad?', chinese: '你能说服你爸爸吗？', type: 'interrogative' },
  },
  corridor: {
    declarative: { sentence: 'Walk quietly in the corridor.', chinese: '在走廊里安静行走。', type: 'declarative' },
    interrogative: { sentence: 'Is the corridor very long?', chinese: '走廊很长吗？', type: 'interrogative' },
  },
  creature: {
    declarative: { sentence: 'The creature lives in the sea.', chinese: '这种生物生活在海里。', type: 'declarative' },
    interrogative: { sentence: 'What creature did you see?', chinese: '你看到了什么生物？', type: 'interrogative' },
  },
  criminal: {
    declarative: { sentence: 'The police caught the criminal.', chinese: '警察抓住了罪犯。', type: 'declarative' },
    interrogative: { sentence: 'Is he a dangerous criminal?', chinese: '他是危险罪犯吗？', type: 'interrogative' },
  },
  critical: {
    declarative: { sentence: 'This is a critical moment.', chinese: '这是关键时刻。', type: 'declarative' },
    interrogative: { sentence: 'Is thinking critical for study?', chinese: '思考对学习关键吗？', type: 'interrogative' },
  },
  daughter: {
    declarative: { sentence: 'His daughter is in Grade Five.', chinese: '他女儿上五年级。', type: 'declarative' },
    interrogative: { sentence: 'Is your daughter at home?', chinese: '你女儿在家吗？', type: 'interrogative' },
  },
  deadline: {
    declarative: { sentence: 'Meet the deadline on Friday.', chinese: '星期五前赶上截止日期。', type: 'declarative' },
    interrogative: { sentence: 'Is the deadline tomorrow?', chinese: '截止日期是明天吗？', type: 'interrogative' },
  },
  decrease: {
    declarative: { sentence: 'Prices may decrease next week.', chinese: '价格下周可能下降。', type: 'declarative' },
    interrogative: { sentence: 'Did sales decrease this month?', chinese: '本月销量下降了吗？', type: 'interrogative' },
  },
  definite: {
    declarative: { sentence: 'I need a definite answer.', chinese: '我需要一个明确的答案。', type: 'declarative' },
    interrogative: { sentence: 'Is the time definite now?', chinese: '时间现在确定了吗？', type: 'interrogative' },
  },
  democrat: {
    declarative: { sentence: 'He is a proud democrat.', chinese: '他是一位自豪的民主主义者。', type: 'declarative' },
    interrogative: { sentence: 'Are you a democrat too?', chinese: '你也是民主主义者吗？', type: 'interrogative' },
  },
  describe: {
    declarative: { sentence: 'Describe the picture, please.', chinese: '请描述这幅画。', type: 'declarative' },
    interrogative: { sentence: 'Can you describe your friend?', chinese: '你能描述你的朋友吗？', type: 'interrogative' },
  },
  designer: {
    declarative: { sentence: 'She is a fashion designer.', chinese: '她是一名时装设计师。', type: 'declarative' },
    interrogative: { sentence: 'Is he a game designer?', chinese: '他是游戏设计师吗？', type: 'interrogative' },
  },
  dialogue: {
    declarative: { sentence: 'We had a short dialogue.', chinese: '我们进行了一段简短对话。', type: 'declarative' },
    interrogative: { sentence: 'Is the dialogue easy to read?', chinese: '对话容易读吗？', type: 'interrogative' },
  },
  dimension: {
    declarative: { sentence: 'Draw it in two dimensions.', chinese: '用二维画它。', type: 'declarative' },
    interrogative: { sentence: 'What is the third dimension?', chinese: '第三维是什么？', type: 'interrogative' },
  },
  direction: {
    declarative: { sentence: 'Which direction should we go?', chinese: '我们应该朝哪个方向走？', type: 'declarative' },
    interrogative: { sentence: 'Is north the right direction?', chinese: '北方是正确的方向吗？', type: 'interrogative' },
  },
  director: {
    declarative: { sentence: 'The director made a great film.', chinese: '导演拍了一部好电影。', type: 'declarative' },
    interrogative: { sentence: 'Who is the film director?', chinese: '电影导演是谁？', type: 'interrogative' },
  },
  disaster: {
    declarative: { sentence: 'The storm was a disaster.', chinese: '暴风雨是一场灾难。', type: 'declarative' },
    interrogative: { sentence: 'Was the flood a disaster?', chinese: '洪水是灾难吗？', type: 'interrogative' },
  },
  discount: {
    declarative: { sentence: 'We got a big discount.', chinese: '我们得到了很大折扣。', type: 'declarative' },
    interrogative: { sentence: 'Is there a student discount?', chinese: '有学生折扣吗？', type: 'interrogative' },
  },
  disorder: {
    declarative: { sentence: 'The room was in disorder.', chinese: '房间一片混乱。', type: 'declarative' },
    interrogative: { sentence: 'Is there disorder in the hall?', chinese: '大厅里有混乱吗？', type: 'interrogative' },
  },
  district: {
    declarative: { sentence: 'Our school is in this district.', chinese: '我们学校在这个区。', type: 'declarative' },
    interrogative: { sentence: 'Which district do you live in?', chinese: '你住在哪个区？', type: 'interrogative' },
  },
  document: {
    declarative: { sentence: 'Read the document carefully.', chinese: '仔细阅读文件。', type: 'declarative' },
    interrogative: { sentence: 'Did you sign the document?', chinese: '你签署文件了吗？', type: 'interrogative' },
  },
  domestic: {
    declarative: { sentence: 'We took a domestic flight.', chinese: '我们乘坐了国内航班。', type: 'declarative' },
    interrogative: { sentence: 'Is this a domestic product?', chinese: '这是国产产品吗？', type: 'interrogative' },
  },
  dominant: {
    declarative: { sentence: 'He has a dominant role.', chinese: '他扮演主导角色。', type: 'declarative' },
    interrogative: { sentence: 'Is English dominant here?', chinese: '英语在这里占主导吗？', type: 'interrogative' },
  },
  dramatic: {
    declarative: { sentence: 'There was a dramatic change.', chinese: '发生了戏剧性的变化。', type: 'declarative' },
    interrogative: { sentence: 'Is the ending dramatic?', chinese: '结局戏剧性吗？', type: 'interrogative' },
  },
  homework: {
    declarative: { sentence: 'I do my homework after school.', chinese: '我放学后做作业。', type: 'declarative' },
    interrogative: { sentence: 'Did you finish your homework?', chinese: '你完成作业了吗？', type: 'interrogative' },
  },
  classroom: {
    declarative: { sentence: 'We study in the classroom.', chinese: '我们在教室里学习。', type: 'declarative' },
    interrogative: { sentence: 'Is the classroom big?', chinese: '教室大吗？', type: 'interrogative' },
  },
  library: {
    declarative: { sentence: 'I read books in the library.', chinese: '我在图书馆看书。', type: 'declarative' },
    interrogative: { sentence: 'Is the library open today?', chinese: '图书馆今天开放吗？', type: 'interrogative' },
  },
  playground: {
    declarative: { sentence: 'Kids play on the playground.', chinese: '孩子们在操场上玩。', type: 'declarative' },
    interrogative: { sentence: 'Is the playground safe?', chinese: '操场安全吗？', type: 'interrogative' },
  },
  eraser: {
    declarative: { sentence: 'Use an eraser, please.', chinese: '请用橡皮。', type: 'declarative' },
    interrogative: { sentence: 'Do you have an eraser?', chinese: '你有橡皮吗？', type: 'interrogative' },
  },
  ruler: {
    declarative: { sentence: 'I need a long ruler.', chinese: '我需要一把长尺子。', type: 'declarative' },
    interrogative: { sentence: 'Is this ruler yours?', chinese: '这把尺子是你的吗？', type: 'interrogative' },
  },
  backpack: {
    declarative: { sentence: 'Pack your backpack tonight.', chinese: '今晚收拾好你的背包。', type: 'declarative' },
    interrogative: { sentence: 'Is your backpack heavy?', chinese: '你的背包重吗？', type: 'interrogative' },
  },
  uniform: {
    declarative: { sentence: 'Wear your school uniform.', chinese: '穿上你的校服。', type: 'declarative' },
    interrogative: { sentence: 'Is your uniform clean?', chinese: '你的校服干净吗？', type: 'interrogative' },
  },
  breakfast: {
    declarative: { sentence: 'I eat breakfast at seven.', chinese: '我七点吃早餐。', type: 'declarative' },
    interrogative: { sentence: 'Did you eat breakfast today?', chinese: '你今天吃早餐了吗？', type: 'interrogative' },
  },
  lunch: {
    declarative: { sentence: 'Lunch is ready at noon.', chinese: '午饭中午准备好了。', type: 'declarative' },
    interrogative: { sentence: 'What did you have for lunch?', chinese: '你午饭吃了什么？', type: 'interrogative' },
  },
  dinner: {
    declarative: { sentence: 'We have dinner together.', chinese: '我们一起吃晚餐。', type: 'declarative' },
    interrogative: { sentence: 'Is dinner ready now?', chinese: '晚饭准备好了吗？', type: 'interrogative' },
  },
  vegetable: {
    declarative: { sentence: 'Eat more vegetables every day.', chinese: '每天多吃蔬菜。', type: 'declarative' },
    interrogative: { sentence: 'Do you like green vegetables?', chinese: '你喜欢绿色蔬菜吗？', type: 'interrogative' },
  },
  tomato: {
    declarative: { sentence: 'The tomato is red and round.', chinese: '西红柿又红又圆。', type: 'declarative' },
    interrogative: { sentence: 'Do you want a tomato?', chinese: '你想要一个西红柿吗？', type: 'interrogative' },
  },
  potato: {
    declarative: { sentence: 'I like baked potatoes.', chinese: '我喜欢烤土豆。', type: 'declarative' },
    interrogative: { sentence: 'Do you peel the potato?', chinese: '你给土豆削皮吗？', type: 'interrogative' },
  },
  carrot: {
    declarative: { sentence: 'The carrot is long and orange.', chinese: '胡萝卜又长又橙。', type: 'declarative' },
    interrogative: { sentence: 'Do rabbits like carrots?', chinese: '兔子喜欢胡萝卜吗？', type: 'interrogative' },
  },
  onion: {
    declarative: { sentence: 'Cut the onion carefully.', chinese: '小心切洋葱。', type: 'declarative' },
    interrogative: { sentence: 'Does the onion make you cry?', chinese: '洋葱让你哭吗？', type: 'interrogative' },
  },
  banana: {
    declarative: { sentence: 'Peel the banana before eating.', chinese: '吃前剥香蕉。', type: 'declarative' },
    interrogative: { sentence: 'Do you want a banana?', chinese: '你想要一根香蕉吗？', type: 'interrogative' },
  },
  orange: {
    declarative: { sentence: 'I ate a sweet orange.', chinese: '我吃了一个甜橙子。', type: 'declarative' },
    interrogative: { sentence: 'Is the orange juice fresh?', chinese: '橙汁新鲜吗？', type: 'interrogative' },
  },
  strawberry: {
    declarative: { sentence: 'Strawberries taste very sweet.', chinese: '草莓尝起来很甜。', type: 'declarative' },
    interrogative: { sentence: 'Do you like strawberries?', chinese: '你喜欢草莓吗？', type: 'interrogative' },
  },
  sandwich: {
    declarative: { sentence: 'I made a ham sandwich.', chinese: '我做了一个火腿三明治。', type: 'declarative' },
    interrogative: { sentence: 'Do you want a sandwich?', chinese: '你想要三明治吗？', type: 'interrogative' },
  },
  supermarket: {
    declarative: { sentence: 'We shop at the supermarket.', chinese: '我们在超市购物。', type: 'declarative' },
    interrogative: { sentence: 'Is the supermarket near here?', chinese: '超市在这附近吗？', type: 'interrogative' },
  },
  pharmacy: {
    declarative: { sentence: 'Buy medicine at the pharmacy.', chinese: '在药店买药。', type: 'declarative' },
    interrogative: { sentence: 'Is the pharmacy open now?', chinese: '药店现在开门吗？', type: 'interrogative' },
  },
  station: {
    declarative: { sentence: 'Wait at the bus station.', chinese: '在公交车站等候。', type: 'declarative' },
    interrogative: { sentence: 'Is the station crowded?', chinese: '车站拥挤吗？', type: 'interrogative' },
  },
  subway: {
    declarative: { sentence: 'We take the subway to school.', chinese: '我们乘地铁去学校。', type: 'declarative' },
    interrogative: { sentence: 'Is the subway fast?', chinese: '地铁快吗？', type: 'interrogative' },
  },
  bicycle: {
    declarative: { sentence: 'I ride my bicycle to park.', chinese: '我骑自行车去公园。', type: 'declarative' },
    interrogative: { sentence: 'Is your bicycle new?', chinese: '你的自行车新吗？', type: 'interrogative' },
  },
  bathroom: {
    declarative: { sentence: 'Where is the bathroom, please?', chinese: '请问浴室在哪里？', type: 'declarative' },
    interrogative: { sentence: 'Is the bathroom clean?', chinese: '浴室干净吗？', type: 'interrogative' },
  },
  afternoon: {
    declarative: { sentence: 'Good afternoon, everyone.', chinese: '大家下午好。', type: 'declarative' },
    interrogative: { sentence: 'What will you do this afternoon?', chinese: '今天下午你要做什么？', type: 'interrogative' },
  },
  tomorrow: {
    declarative: { sentence: 'See you tomorrow at school.', chinese: '明天学校见。', type: 'declarative' },
    interrogative: { sentence: 'Will it rain tomorrow?', chinese: '明天会下雨吗？', type: 'interrogative' },
  },
  yesterday: {
    declarative: { sentence: 'I went there yesterday.', chinese: '我昨天去了那里。', type: 'declarative' },
    interrogative: { sentence: 'Did you study yesterday?', chinese: '你昨天学习了吗？', type: 'interrogative' },
  },
  remember: {
    declarative: { sentence: 'Remember to bring your book.', chinese: '记得带上你的书。', type: 'declarative' },
    interrogative: { sentence: 'Do you remember my name?', chinese: '你记得我的名字吗？', type: 'interrogative' },
  },
  enough: {
    declarative: { sentence: 'That is enough for today.', chinese: '今天够了。', type: 'declarative' },
    interrogative: { sentence: 'Do you have enough time?', chinese: '你有足够的时间吗？', type: 'interrogative' },
  },
  almost: {
    declarative: { sentence: 'I almost missed the bus.', chinese: '我差点错过公交车。', type: 'declarative' },
    interrogative: { sentence: 'Are you almost finished?', chinese: '你快完成了吗？', type: 'interrogative' },
  },
  quite: {
    declarative: { sentence: 'The test was quite easy.', chinese: '考试相当简单。', type: 'declarative' },
    interrogative: { sentence: 'Is it quite far from here?', chinese: '离这里相当远吗？', type: 'interrogative' },
  },
  really: {
    declarative: { sentence: 'I really like this song.', chinese: '我真的很喜欢这首歌。', type: 'declarative' },
    interrogative: { sentence: 'Do you really mean it?', chinese: '你是认真的吗？', type: 'interrogative' },
  },
  because: {
    declarative: { sentence: 'I stayed home because I was sick.', chinese: '我待在家因为我生病了。', type: 'declarative' },
    interrogative: { sentence: 'Are you late because of rain?', chinese: '你因为下雨迟到吗？', type: 'interrogative' },
  },
  before: {
    declarative: { sentence: 'Wash hands before dinner.', chinese: '晚饭前洗手。', type: 'declarative' },
    interrogative: { sentence: 'Did you see him before class?', chinese: '你上课前见过他吗？', type: 'interrogative' },
  },
  behind: {
    declarative: { sentence: 'The cat is behind the door.', chinese: '猫在门后面。', type: 'declarative' },
    interrogative: { sentence: 'Who is standing behind you?', chinese: '谁站在你后面？', type: 'interrogative' },
  },
  between: {
    declarative: { sentence: 'Sit between Tom and me.', chinese: '坐在汤姆和我之间。', type: 'declarative' },
    interrogative: { sentence: 'Is the park between two roads?', chinese: '公园在两条路之间吗？', type: 'interrogative' },
  },
  above: {
    declarative: { sentence: 'Birds fly above the trees.', chinese: '鸟儿在树上空飞翔。', type: 'declarative' },
    interrogative: { sentence: 'Is your room above mine?', chinese: '你的房间在我上面吗？', type: 'interrogative' },
  },
  below: {
    declarative: { sentence: 'The shop is below our flat.', chinese: '商店在我们公寓下面。', type: 'declarative' },
    interrogative: { sentence: 'Is it cold below zero?', chinese: '零度以下冷吗？', type: 'interrogative' },
  },
  often: {
    declarative: { sentence: 'I often read before bed.', chinese: '我经常睡前读书。', type: 'declarative' },
    interrogative: { sentence: 'How often do you exercise?', chinese: '你多久锻炼一次？', type: 'interrogative' },
  },
  sometimes: {
    declarative: { sentence: 'Sometimes I walk to school.', chinese: '有时我走路去学校。', type: 'declarative' },
    interrogative: { sentence: 'Do you sometimes feel tired?', chinese: '你有时觉得累吗？', type: 'interrogative' },
  },
  colour: {
    declarative: { sentence: 'What colour is your bag?', chinese: '你的包是什么颜色？', type: 'declarative' },
    interrogative: { sentence: 'Do you like bright colours?', chinese: '你喜欢鲜艳的颜色吗？', type: 'interrogative' },
  },
  purple: {
    declarative: { sentence: 'She has a purple dress.', chinese: '她有一条紫色连衣裙。', type: 'declarative' },
    interrogative: { sentence: 'Is purple your favourite colour?', chinese: '紫色是你最喜欢的颜色吗？', type: 'interrogative' },
  },
  brown: {
    declarative: { sentence: 'He wears brown shoes.', chinese: '他穿棕色鞋子。', type: 'declarative' },
    interrogative: { sentence: 'Do you like brown bears?', chinese: '你喜欢棕熊吗？', type: 'interrogative' },
  },
  pink: {
    declarative: { sentence: 'The pink flower is pretty.', chinese: '粉色的花很漂亮。', type: 'declarative' },
    interrogative: { sentence: 'Is your hat pink?', chinese: '你的帽子是粉色的吗？', type: 'interrogative' },
  },
  chocolate: {
    declarative: { sentence: 'I love dark chocolate.', chinese: '我喜欢黑巧克力。', type: 'declarative' },
    interrogative: { sentence: 'Do you want some chocolate?', chinese: '你想要巧克力吗？', type: 'interrogative' },
  },
  cookie: {
    declarative: { sentence: 'Mom baked a chocolate cookie.', chinese: '妈妈烤了一块巧克力曲奇。', type: 'declarative' },
    interrogative: { sentence: 'May I have another cookie?', chinese: '我可以再吃一块曲奇吗？', type: 'interrogative' },
  },
  neighbor: {
    declarative: { sentence: 'My neighbor is very kind.', chinese: '我的邻居很善良。', type: 'declarative' },
    interrogative: { sentence: 'Do you know your neighbor?', chinese: '你认识你的邻居吗？', type: 'interrogative' },
  },
  medicine: {
    declarative: { sentence: 'Take your medicine on time.', chinese: '按时吃药。', type: 'declarative' },
    interrogative: { sentence: 'Did the doctor give you medicine?', chinese: '医生给你药了吗？', type: 'interrogative' },
  },
  silence: {
    declarative: { sentence: 'Please keep silence in class.', chinese: '请在课堂上保持安静。', type: 'declarative' },
    interrogative: { sentence: 'Why is there silence now?', chinese: '现在为什么安静？', type: 'interrogative' },
  },
  careful: {
    declarative: { sentence: 'Be careful on the road.', chinese: '在路上要小心。', type: 'declarative' },
    interrogative: { sentence: 'Are you careful with fire?', chinese: '你用火小心吗？', type: 'interrogative' },
  },
  polite: {
    declarative: { sentence: 'Be polite to your guests.', chinese: '对客人要有礼貌。', type: 'declarative' },
    interrogative: { sentence: 'Are you polite at table?', chinese: '你在餐桌上礼貌吗？', type: 'interrogative' },
  },
  window: {
    declarative: { sentence: 'Open the window, please.', chinese: '请打开窗户。', type: 'declarative' },
    interrogative: { sentence: 'Is the window closed now?', chinese: '窗户现在关了吗？', type: 'interrogative' },
  },
  textbook: {
    declarative: { sentence: 'Open your textbook to page ten.', chinese: '把课本翻到第十页。', type: 'declarative' },
    interrogative: { sentence: 'Is this your English textbook?', chinese: '这是你的英语课本吗？', type: 'interrogative' },
  },
  toothbrush: {
    declarative: { sentence: 'Brush teeth with a toothbrush.', chinese: '用牙刷刷牙。', type: 'declarative' },
    interrogative: { sentence: 'Is your toothbrush new?', chinese: '你的牙刷新吗？', type: 'interrogative' },
  },
  scissors: {
    declarative: { sentence: 'Use scissors to cut paper.', chinese: '用剪刀剪纸。', type: 'declarative' },
    interrogative: { sentence: 'Where are the scissors?', chinese: '剪刀在哪里？', type: 'interrogative' },
  },
  calendar: {
    declarative: { sentence: 'Mark the date on the calendar.', chinese: '在日历上标记日期。', type: 'declarative' },
    interrogative: { sentence: 'Is today on your calendar?', chinese: '今天在你日历上吗？', type: 'interrogative' },
  },
};
