// Inline word data for offline use
const GRADE3 = {"grade":3,"semester":1,"units":[{"unit":1,"name":"Hello!","words":[{"id":"g3s1u1w001","word":"hello","meaning":"你好","difficulty":1},{"id":"g3s1u1w002","word":"morning","meaning":"早晨","difficulty":2},{"id":"g3s1u1w003","word":"afternoon","meaning":"下午","difficulty":2},{"id":"g3s1u1w004","word":"evening","meaning":"傍晚","difficulty":2},{"id":"g3s1u1w005","word":"welcome","meaning":"欢迎","difficulty":2},{"id":"g3s1u1w006","word":"friend","meaning":"朋友","difficulty":2},{"id":"g3s1u1w007","word":"teacher","meaning":"老师","difficulty":2},{"id":"g3s1u1w008","word":"student","meaning":"学生","difficulty":2},{"id":"g3s1u1w009","word":"school","meaning":"学校","difficulty":1},{"id":"g3s1u1w010","word":"classroom","meaning":"教室","difficulty":3}]},{"unit":2,"name":"My Family","words":[{"id":"g3s1u2w001","word":"family","meaning":"家庭","difficulty":2},{"id":"g3s1u2w002","word":"father","meaning":"父亲","difficulty":2},{"id":"g3s1u2w003","word":"mother","meaning":"母亲","difficulty":2},{"id":"g3s1u2w004","word":"brother","meaning":"兄弟","difficulty":2},{"id":"g3s1u2w005","word":"sister","meaning":"姐妹","difficulty":2},{"id":"g3s1u2w006","word":"grandfather","meaning":"祖父","difficulty":3},{"id":"g3s1u2w007","word":"grandmother","meaning":"祖母","difficulty":3},{"id":"g3s1u2w008","word":"daughter","meaning":"女儿","difficulty":3},{"id":"g3s1u2w009","word":"children","meaning":"孩子们","difficulty":3},{"id":"g3s1u2w010","word":"parents","meaning":"父母","difficulty":2}]},{"unit":3,"name":"Animals","words":[{"id":"g3s1u3w001","word":"elephant","meaning":"大象","difficulty":3},{"id":"g3s1u3w002","word":"giraffe","meaning":"长颈鹿","difficulty":3},{"id":"g3s1u3w003","word":"monkey","meaning":"猴子","difficulty":2},{"id":"g3s1u3w004","word":"penguin","meaning":"企鹅","difficulty":3},{"id":"g3s1u3w005","word":"rabbit","meaning":"兔子","difficulty":2},{"id":"g3s1u3w006","word":"dolphin","meaning":"海豚","difficulty":3},{"id":"g3s1u3w007","word":"butterfly","meaning":"蝴蝶","difficulty":3},{"id":"g3s1u3w008","word":"crocodile","meaning":"鳄鱼","difficulty":3},{"id":"g3s1u3w009","word":"kangaroo","meaning":"袋鼠","difficulty":3},{"id":"g3s1u3w010","word":"squirrel","meaning":"松鼠","difficulty":3}]},{"unit":4,"name":"Food","words":[{"id":"g3s1u4w001","word":"chocolate","meaning":"巧克力","difficulty":3},{"id":"g3s1u4w002","word":"sandwich","meaning":"三明治","difficulty":3},{"id":"g3s1u4w003","word":"vegetable","meaning":"蔬菜","difficulty":3},{"id":"g3s1u4w004","word":"strawberry","meaning":"草莓","difficulty":3},{"id":"g3s1u4w005","word":"hamburger","meaning":"汉堡包","difficulty":3}]}]};
const GRADE4 = {"grade":4,"semester":1,"units":[{"unit":1,"name":"Classroom","words":[{"id":"g4s1u1w001","word":"window","meaning":"窗户","difficulty":2},{"id":"g4s1u1w002","word":"blackboard","meaning":"黑板","difficulty":3},{"id":"g4s1u1w003","word":"dictionary","meaning":"字典","difficulty":3},{"id":"g4s1u1w004","word":"exercise","meaning":"练习","difficulty":3},{"id":"g4s1u1w005","word":"homework","meaning":"作业","difficulty":2},{"id":"g4s1u1w006","word":"library","meaning":"图书馆","difficulty":3},{"id":"g4s1u1w007","word":"magazine","meaning":"杂志","difficulty":3},{"id":"g4s1u1w008","word":"newspaper","meaning":"报纸","difficulty":3},{"id":"g4s1u1w009","word":"playground","meaning":"操场","difficulty":3},{"id":"g4s1u1w010","word":"umbrella","meaning":"雨伞","difficulty":3}]},{"unit":2,"name":"My Day","words":[{"id":"g4s1u2w001","word":"breakfast","meaning":"早餐","difficulty":3},{"id":"g4s1u2w002","word":"schedule","meaning":"时间表","difficulty":3},{"id":"g4s1u2w003","word":"midnight","meaning":"午夜","difficulty":3},{"id":"g4s1u2w004","word":"weekday","meaning":"工作日","difficulty":2},{"id":"g4s1u2w005","word":"weekend","meaning":"周末","difficulty":2}]}]};
const GRADE5 = {"grade":5,"semester":1,"units":[{"unit":1,"name":"Daily Life","words":[{"id":"g5s1u1w001","word":"exercise","meaning":"锻炼","difficulty":3},{"id":"g5s1u1w002","word":"healthy","meaning":"健康的","difficulty":3},{"id":"g5s1u1w003","word":"balance","meaning":"平衡","difficulty":3},{"id":"g5s1u1w004","word":"vitamin","meaning":"维生素","difficulty":3},{"id":"g5s1u1w005","word":"protein","meaning":"蛋白质","difficulty":3}]}]};
const GRADE6 = {"grade":6,"semester":1,"units":[{"unit":1,"name":"Science","words":[{"id":"g6s1u1w001","word":"experiment","meaning":"实验","difficulty":3},{"id":"g6s1u1w002","word":"laboratory","meaning":"实验室","difficulty":3},{"id":"g6s1u1w003","word":"molecule","meaning":"分子","difficulty":3},{"id":"g6s1u1w004","word":"oxygen","meaning":"氧气","difficulty":3},{"id":"g6s1u1w005","word":"gravity","meaning":"重力","difficulty":3}]}]};
const THEMES = [{"id":"animals","name":"动物","icon":"🐾","words":[{"id":"t001","word":"elephant","meaning":"大象","difficulty":3},{"id":"t002","word":"giraffe","meaning":"长颈鹿","difficulty":3},{"id":"t003","word":"monkey","meaning":"猴子","difficulty":2}]},{"id":"food","name":"食物","icon":"🍎","words":[{"id":"t006","word":"chocolate","meaning":"巧克力","difficulty":3},{"id":"t007","word":"sandwich","meaning":"三明治","difficulty":3}]}];

export class GameData {
  static grades = [GRADE3, GRADE4, GRADE5, GRADE6];
  static themes = THEMES;

  static getGrades() {
    return this.grades.map(g => ({
      id: g.grade,
      label: `${g.grade}年级`,
      semesters: 1,
      units: g.units,
    }));
  }

  static getUnitWords(grade, semester, unit) {
    const gradeData = this.grades.find(item => item.grade === grade);
    if (!gradeData) return [];
    const unitData = gradeData.units.find(item => item.unit === unit);
    return unitData ? unitData.words : [];
  }

  static getUnitCount(grade, semester) {
    const gradeData = this.grades.find(item => item.grade === grade);
    return gradeData ? gradeData.units.length : 0;
  }

  static getThemeWords(themeId) {
    const theme = this.themes.find(item => item.id === themeId);
    return theme ? theme.words : [];
  }

  static getThemes() {
    return this.themes;
  }
}
