import type { TombstoneTemplate, LiteraryIpTombstone, HeritageCraftTombstone, HotlineEntry } from '@/types'

/**
 * 墓碑模板列表（US-04 第一步选模板）
 * 三类：非遗工艺 / 文学 IP 同款 / 极简现代
 * 配色已调整为童话花园中的真实石材质感
 */
export const TEMPLATES: TombstoneTemplate[] = [
  // —— 非遗工艺类 ——
  {
    id: 'tpl-huian-stone',
    name: '惠安石雕',
    category: 'heritage',
    origin: '福建惠安 · 国家级非遗',
    palette: { bg: '#f0ece3', fg: '#3d3a35', accent: '#8c6d3f', border: '#a8a29e' },
    style: 'stone-classic',
    thumbnail: 'linear-gradient(135deg, #f0ece3 0%, #e0d8c8 100%)',
  },
  {
    id: 'tpl-huizhou-brick',
    name: '徽州砖雕',
    category: 'heritage',
    origin: '安徽徽州 · 国家级非遗',
    palette: { bg: '#f2ebe3', fg: '#3d3a35', accent: '#8c6d3f', border: '#b8a090' },
    style: 'brick-huizhou',
    thumbnail: 'linear-gradient(135deg, #f2ebe3 0%, #e2d4c4 100%)',
  },
  {
    id: 'tpl-suzhou-stele',
    name: '苏州碑刻',
    category: 'heritage',
    origin: '江苏苏州 · 国家级非遗',
    palette: { bg: '#e8ede8', fg: '#3d3a35', accent: '#4a7c59', border: '#8a9a8a' },
    style: 'stele-suzhou',
    thumbnail: 'linear-gradient(135deg, #e8ede8 0%, #d8ddd8 100%)',
  },
  {
    id: 'tpl-miao-silver',
    name: '苗族银饰',
    category: 'heritage',
    origin: '贵州黔东南 · 国家级非遗',
    palette: { bg: '#e8eaec', fg: '#3d3a35', accent: '#8a929a', border: '#a8a8ae' },
    style: 'silver-miao',
    thumbnail: 'linear-gradient(135deg, #e8eaec 0%, #d8dadf 100%)',
  },
  {
    id: 'tpl-yi-lacquer',
    name: '彝族漆器',
    category: 'heritage',
    origin: '四川凉山 · 国家级非遗',
    palette: { bg: '#f0e8e6', fg: '#3d3a35', accent: '#9b4a4a', border: '#b09088' },
    style: 'lacquer-yi',
    thumbnail: 'linear-gradient(135deg, #f0e8e6 0%, #e2d4d0 100%)',
  },
  // —— 文学 IP 同款 ——
  {
    id: 'tpl-dumbledore',
    name: '邓布利多同款',
    category: 'literary',
    origin: '《哈利·波特》· 魔法校长',
    palette: { bg: '#f4f1ea', fg: '#3d3a35', accent: '#c9985d', border: '#a89070' },
    style: 'literary-dumbledore',
    thumbnail: 'linear-gradient(135deg, #f4f1ea 0%, #e6dfc8 100%)',
  },
  {
    id: 'tpl-daiyu',
    name: '林黛玉同款',
    category: 'literary',
    origin: '《红楼梦》· 潇湘妃子',
    palette: { bg: '#f0eaee', fg: '#3d3a35', accent: '#9b6a8c', border: '#b8a0a8' },
    style: 'literary-daiyu',
    thumbnail: 'linear-gradient(135deg, #f0eaee 0%, #e4d8e0 100%)',
  },
  {
    id: 'tpl-prince',
    name: '小王子同款',
    category: 'literary',
    origin: '《小王子》· B612 星球',
    palette: { bg: '#eef2f5', fg: '#3d3a35', accent: '#c9985d', border: '#9a8a6a' },
    style: 'literary-prince',
    thumbnail: 'linear-gradient(135deg, #eef2f5 0%, #dde4eb 100%)',
  },
  {
    id: 'tpl-wukong',
    name: '孙悟空同款',
    category: 'literary',
    origin: '《西游记》· 齐天大圣',
    palette: { bg: '#f5ece4', fg: '#3d3a35', accent: '#c9985d', border: '#9b4a4a' },
    style: 'literary-wukong',
    thumbnail: 'linear-gradient(135deg, #f5ece4 0%, #eaddd0 100%)',
  },
  {
    id: 'tpl-quixote',
    name: '堂吉诃德同款',
    category: 'literary',
    origin: '《堂吉诃德》· 拉曼却骑士',
    palette: { bg: '#f5ede6', fg: '#3d3a35', accent: '#9b4a4a', border: '#8c6d3f' },
    style: 'literary-quixote',
    thumbnail: 'linear-gradient(135deg, #f5ede6 0%, #eadcc8 100%)',
  },
  // —— 极简现代 ——
  {
    id: 'tpl-minimal-white',
    name: '极简白',
    category: 'minimal',
    origin: '现代极简 · 留白之美',
    palette: { bg: '#fafaf8', fg: '#3d3a35', accent: '#8c6d3f', border: '#c8c8c0' },
    style: 'minimal-white',
    thumbnail: 'linear-gradient(135deg, #fafaf8 0%, #f0f0ec 100%)',
  },
  {
    id: 'tpl-minimal-black',
    name: '极简黑',
    category: 'minimal',
    origin: '现代极简 · 沉默之黑',
    palette: { bg: '#2a2826', fg: '#e7e5e4', accent: '#c9985d', border: '#57534e' },
    style: 'minimal-black',
    thumbnail: 'linear-gradient(135deg, #2a2826 0%, #3a3834 100%)',
  },
  {
    id: 'tpl-minimal-jade',
    name: '极简青',
    category: 'minimal',
    origin: '现代极简 · 青瓷之韵',
    palette: { bg: '#e8eee9', fg: '#3d3a35', accent: '#4a7c59', border: '#8a9a8a' },
    style: 'minimal-jade',
    thumbnail: 'linear-gradient(135deg, #e8eee9 0%, #d8e0d8 100%)',
  },
]

/**
 * 文学 IP 墓碑（US-02 致敬区）
 */
export const LITERARY_IP_TOMBSTONES: LiteraryIpTombstone[] = [
  {
    id: 'ip-dumbledore',
    character: '邓布利多',
    work: '《哈利·波特》',
    role: '霍格沃茨魔法学校校长',
    epitaph: '死亡只是另一场伟大的冒险',
    lifespan: '1840–1997',
    relics: ['老魔杖', '熄灯器', '冥想盆', '福克斯凤凰羽毛'],
    scenes: ['与格林德沃的决斗', '洞穴取挂坠盒', '天文塔之坠', '王十字车站的来世对话'],
    quotes: [
      { text: '决定我们成为什么样人的，不是我们的能力，而是我们的选择。', context: '《密室》' },
      { text: '幸福可以在最黑暗的时刻被找到，只要你记得点亮一盏灯。', context: '《阿兹卡班囚徒》' },
      { text: '死亡只是另一场伟大的冒险。', context: '《魔法石》' },
    ],
    deathScene: '被斯内普在天文塔用阿瓦达索命咒击中后坠落，按其本人预先安排执行。',
    style: 'literary-dumbledore',
    palette: { bg: '#f4f1ea', fg: '#3d3a35', accent: '#c9985d', border: '#a89070' },
  },
  {
    id: 'ip-daiyu',
    character: '林黛玉',
    work: '《红楼梦》',
    role: '潇湘妃子 · 茶蘼花主',
    epitaph: '一朝春尽红颜老，花落人亡两不知',
    lifespan: '约 1700–1763',
    relics: ['葬花锄', '诗稿一束', '鹦鹉一只', '旧手帕两方'],
    scenes: ['黛玉葬花', '共读西厢', '题帕三绝', '焚稿断痴情'],
    quotes: [
      { text: '一朝春尽红颜老，花落人亡两不知。', context: '《葬花吟》' },
      { text: '质本洁来还洁去，强于污淖陷渠沟。', context: '《葬花吟》' },
      { text: '侬今葬花人笑痴，他年葬侬知是谁？', context: '《葬花吟》' },
    ],
    deathScene: '于贾宝玉与薛宝钗成婚之夜，焚毁诗稿，泪尽而逝于潇湘馆。',
    style: 'literary-daiyu',
    palette: { bg: '#f0eaee', fg: '#3d3a35', accent: '#9b6a8c', border: '#b8a0a8' },
  },
  {
    id: 'ip-prince',
    character: '小王子',
    work: '《小王子》',
    role: 'B612 小行星的居民',
    epitaph: '重要的东西用眼睛是看不见的',
    lifespan: '????–????',
    relics: ['一朵玫瑰', '一只狐狸的友谊', '画着绵羊的盒子', '迁移的鸟群'],
    scenes: ['与玫瑰相遇', '驯养狐狸', '与蛇的约定', '在撒哈拉沙漠降落'],
    quotes: [
      { text: '重要的东西用眼睛是看不见的，要用心去看。', context: '狐狸的临别赠言' },
      { text: '你为你的玫瑰花费的时间，使你的玫瑰变得重要。', context: '狐狸的驯养论' },
      { text: '所有大人都曾经是小孩，虽然只有少数人记得。', context: '献辞' },
    ],
    deathScene: '为了让飞行员回到他的飞机，让蛇咬伤自己，肉身倒下，灵魂回到 B612。',
    style: 'literary-prince',
    palette: { bg: '#eef2f5', fg: '#3d3a35', accent: '#c9985d', border: '#9a8a6a' },
  },
  {
    id: 'ip-wukong',
    character: '孙悟空',
    work: '《西游记》',
    role: '齐天大圣 · 斗战胜佛',
    epitaph: '皇帝轮流做，明年到我家',
    lifespan: '????–????',
    relics: ['如意金箍棒', '筋斗云', '火眼金睛', '虎皮裙一件'],
    scenes: ['大闹天宫', '五指山下被压五百年', '三打白骨精', '取得真经封佛'],
    quotes: [
      { text: '皇帝轮流做，明年到我家。', context: '大闹天宫' },
      { text: '俺老孙去也！', context: '常用口头禅' },
      { text: '踏碎凌霄，放肆桀骜。', context: '后世传颂' },
    ],
    deathScene: '取经功成，被封为斗战胜佛，肉身成圣，不入轮回。',
    style: 'literary-wukong',
    palette: { bg: '#f5ece4', fg: '#3d3a35', accent: '#c9985d', border: '#9b4a4a' },
  },
  {
    id: 'ip-quixote',
    character: '堂吉诃德',
    work: '《堂吉诃德》',
    role: '拉曼却的骑士',
    epitaph: '一生疯癫，临终清醒',
    lifespan: '1547–1615',
    relics: ['破旧铠甲', '瘦马罗西南多', '侍从桑丘', '想象中的杜尔西内娅'],
    scenes: ['大战风车', '冲击羊群当军队', '客栈封骑士', '临终立遗嘱恢复理智'],
    quotes: [
      { text: '事实是真理的死敌。', context: '骑士箴言' },
      { text: '不要等死了才看到生命的真相。', context: '临终之言' },
      { text: '疯子是我，疯子也是这个世界。', context: '骑士自白' },
    ],
    deathScene: '临终前恢复理智，立下遗嘱，否定骑士小说，平静离世。',
    style: 'literary-quixote',
    palette: { bg: '#f5ede6', fg: '#3d3a35', accent: '#9b4a4a', border: '#8c6d3f' },
  },
]

/**
 * 文学 IP 墓碑（扩展，US-02 致敬区）
 */
export const LITERARY_IP_TOMBSTONES_EXTENDED: LiteraryIpTombstone[] = [
  {
    id: 'ip-hamlet',
    character: '哈姆雷特',
    work: '《哈姆雷特》',
    role: '丹麦王子 · 存在主义悲剧英雄',
    epitaph: '剩下的只有沉默。',
    lifespan: '约 12 世纪',
    relics: ['骷髅头约里克', '毒剑', '戏中戏剧本', '奥菲莉娅的信'],
    scenes: ['手持约里克骷髅独白 "To be or not to be"', '戏中戏试探叔父', '与雷欧提斯决斗'],
    quotes: [
      { text: 'To be, or not to be, that is the question.', context: '第三幕第一场' },
      { text: 'There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy.', context: '第一幕第五场' },
      { text: 'The rest is silence.', context: '临终遗言' },
    ],
    deathScene: '与雷欧提斯决斗中中毒剑，临死前杀死叔父克劳迪斯，嘱托霍拉旭传述故事。',
    style: 'literary-dumbledore',
    palette: { bg: '#1a1a1d', fg: '#c8c0b8', accent: '#8b0000', border: '#4a4a4e' },
  },
  {
    id: 'ip-romeo-juliet',
    character: '罗密欧与朱丽叶',
    work: '《罗密欧与朱丽叶》',
    role: '维罗纳的恋人 · 爱情悲剧的永恒象征',
    epitaph: '古往今来多少离合悲欢，谁曾见这样的哀怨辛酸。',
    lifespan: '约 14 世纪',
    relics: ['毒药瓶', '匕首', '戒指', '阳台上的月光'],
    scenes: ['阳台私会', '秘密婚礼', '墓穴双双殉情'],
    quotes: [
      { text: 'What\'s in a name? That which we call a rose by any other name would smell as sweet.', context: '阳台私会' },
      { text: 'Parting is such sweet sorrow.', context: '告别' },
      { text: 'Thus with a kiss I die.', context: '临终之言' },
    ],
    deathScene: '罗密欧以为朱丽叶已死，饮毒自尽；朱丽叶醒来发现罗密欧已死，用匕首自尽。',
    style: 'literary-daiyu',
    palette: { bg: '#f5f0eb', fg: '#4a2020', accent: '#8b0000', border: '#c4a882' },
  },
  {
    id: 'ip-gatsby',
    character: '杰伊·盖茨比',
    work: '《了不起的盖茨比》',
    role: '美国梦的化身与牺牲品 · 神秘百万富翁',
    epitaph: '我们奋力前行，小舟逆水而上，不断地被浪潮推回到过去。',
    lifespan: '1890–1922',
    relics: ['豪宅派对请柬', '绿色码头灯', '西装革履', '未寄出的信'],
    scenes: ['隔海凝望黛西家的绿色灯光', '豪华派对上的孤独身影', '泳池边被枪杀'],
    quotes: [
      { text: 'Can\'t repeat the past? Why of course you can!', context: '对尼克说' },
      { text: 'Her voice is full of money.', context: '描述黛西的声音' },
      { text: 'I was within and without, simultaneously enchanted and repelled.', context: '纽约公寓' },
    ],
    deathScene: '在自家泳池被威尔逊枪杀，死前仍以为电话是黛西打来的，葬礼冷清无人参加。',
    style: 'minimal-black',
    palette: { bg: '#1c1c1c', fg: '#e8d5a3', accent: '#d4af37', border: '#8a8a8a' },
  },
  {
    id: 'ip-anna',
    character: '安娜·卡列尼娜',
    work: '《安娜·卡列尼娜》',
    role: '俄国贵族女性 · 为爱与社会决裂的悲剧人物',
    epitaph: '伸冤在我，我必报应。',
    lifespan: '约 1845–1876',
    relics: ['红色手提包', '天鹅绒礼服', '儿子的照片', '渥伦斯基的信'],
    scenes: ['舞会上与渥伦斯基的相遇', '赛马场上为渥伦斯基失态', '火车站卧轨自杀'],
    quotes: [
      { text: 'All happy families are alike; each unhappy family is unhappy in its own way.', context: '开篇第一句' },
      { text: 'I think... if it is true that there are as many minds as there are heads, then there are as many kinds of love as there are hearts.', context: '内心独白' },
      { text: 'Respect was invented to cover the empty place where love should be.', context: '对渥伦斯基说' },
    ],
    deathScene: '在莫斯科火车站，于绝望中卧轨自杀，被火车碾压身亡。',
    style: 'literary-daiyu',
    palette: { bg: '#f5f0ea', fg: '#3d1c1c', accent: '#8b0000', border: '#b8a090' },
  },
  {
    id: 'ip-heathcliff',
    character: '希斯克利夫',
    work: '《呼啸山庄》',
    role: '复仇的孤儿 · 为爱疯狂的哥特式反英雄',
    epitaph: '没有我的生命我无法活下去！没有我的灵魂我无法活下去！',
    lifespan: '1764–1802',
    relics: ['凯瑟琳的头发', '呼啸山庄钥匙', '破旧圣经', '荒野上的石楠花'],
    scenes: ['偷听凯瑟琳说"嫁给希斯克利夫会降低我的身份"', '凯瑟琳死后在暴风雨中呼唤她的灵魂', '绝食死于凯瑟琳的旧房间'],
    quotes: [
      { text: 'Whatever our souls are made of, his and mine are the same.', context: '凯瑟琳对奈莉说' },
      { text: 'I have not broken your heart — you have broken it; and in breaking it, you have broken mine.', context: '对凯瑟琳说' },
      { text: 'Be with me always — take any form — drive me mad!', context: '凯瑟琳死后呼唤' },
    ],
    deathScene: '在呼啸山庄凯瑟琳的旧房间中绝食而亡，脸上带着诡异的微笑，暴雨之夜，窗开着。',
    style: 'literary-dumbledore',
    palette: { bg: '#2a2622', fg: '#c8b8a8', accent: '#6b3a5b', border: '#5a4a3a' },
  },
  {
    id: 'ip-ophelia',
    character: '奥菲莉娅',
    work: '《哈姆雷特》',
    role: '丹麦贵族少女 · 为爱疯癫、溺水而亡',
    epitaph: '这是迷迭香，代表记忆。',
    lifespan: '约 12 世纪',
    relics: ['花环', '迷迭香', '三色堇', '柳树枝'],
    scenes: ['疯癫后分发花朵', '溺水而亡漂浮河面'],
    quotes: [
      { text: 'Lord, we know what we are, but know not what we may be.', context: '疯癫之言' },
      { text: 'There\'s rosemary, that\'s for remembrance.', context: '分发花朵' },
      { text: 'I would give you some violets, but they withered all when my father died.', context: '疯癫之言' },
    ],
    deathScene: '疯癫后爬上柳树编花环，树枝断裂落水，衣裙吸水沉入河底，唱着歌溺亡。',
    style: 'literary-daiyu',
    palette: { bg: '#e8f0f5', fg: '#3a4050', accent: '#6b8e9b', border: '#a0b8c0' },
  },
  {
    id: 'ip-tom-robinson',
    character: '汤姆·罗宾逊',
    work: '《杀死一只知更鸟》',
    role: '被诬告的黑人 · 无辜的知更鸟',
    epitaph: '杀死一只知更鸟是罪过。',
    lifespan: '约 1910–1935',
    relics: ['残疾的左手', '圣经', '手铐残片'],
    scenes: ['法庭审判中阿提克斯的辩护', '被诬告', '逃跑被枪杀'],
    quotes: [
      { text: 'I felt right sorry for her.', context: '法庭上对白人女性的同情（引发轩然大波）' },
      { text: 'Shoot all the bluejays you want, if you can hit \'em, but remember it\'s a sin to kill a mockingbird.', context: '阿提克斯的教诲' },
    ],
    deathScene: '被诬告强奸罪后，绝望中试图越狱，被警卫连开17枪打死。',
    style: 'minimal-white',
    palette: { bg: '#f8f6f4', fg: '#2a2a2a', accent: '#4a6a8a', border: '#c0c0c0' },
  },
  {
    id: 'ip-lennie',
    character: '莱尼·斯莫尔',
    work: '《人鼠之间》',
    role: '智力障碍的农场工人 · 梦想养兔子的善良巨人',
    epitaph: '乔治，再给我讲讲兔子的事。',
    lifespan: '1902–1937',
    relics: ['死老鼠', '毛绒兔子', '乔治的帽子'],
    scenes: ['抚摸柔软的东西', '与乔治的梦想对话', '被乔治亲手射杀'],
    quotes: [
      { text: 'I like to pet nice things with my fingers, soft things.', context: '对乔治说' },
      { text: 'Tell me about the rabbits, George.', context: '反复请求' },
      { text: 'We got a future. We got somebody to talk to that gives a damn about us.', context: '乔治的梦想' },
    ],
    deathScene: '乔治在莱尼以为即将实现养兔子的梦想时，从背后开枪射杀了他，为了让他免受私刑折磨。',
    style: 'minimal-jade',
    palette: { bg: '#f0e8d8', fg: '#4a3a2a', accent: '#8a6a4a', border: '#c8b898' },
  },
  {
    id: 'ip-charlotte',
    character: '夏洛特',
    work: '《夏洛的网》',
    role: '一只聪明的蜘蛛 · 威尔伯的挚友',
    epitaph: '你一直是我的朋友，这本身就是一件了不起的事。',
    lifespan: '春季–秋季',
    relics: ['蛛网', '卵囊（514个小蜘蛛）', '谷仓角落'],
    scenes: ['在网上织出"Some Pig"', '织出"Terrific""Radiant""Humble"', '安静地死在集市角落'],
    quotes: [
      { text: 'You have been my friend. That in itself is a tremendous thing.', context: '对威尔伯的告别' },
      { text: 'Some Pig.', context: '织在网上的第一句话' },
      { text: 'I wove my webs for you because I liked you.', context: '对威尔伯说' },
    ],
    deathScene: '在集市产下卵囊后，独自在角落安详死去，无人知晓，只有威尔伯带着她的卵囊回到谷仓。',
    style: 'minimal-jade',
    palette: { bg: '#f5f0e8', fg: '#3a3028', accent: '#6a8a5a', border: '#c8b898' },
  },
  {
    id: 'ip-baochai',
    character: '薛宝钗',
    work: '《红楼梦》',
    role: '金陵十二钗之首 · 蘅芜苑主人 · 冷美人',
    epitaph: '金簪雪里埋。',
    lifespan: '约 1700–1765',
    relics: ['金锁', '冷香丸', '蘅芜苑香草', '螃蟹诗稿'],
    scenes: ['与宝玉成婚调包计', '劝宝玉仕途经济', '独守空闺'],
    quotes: [
      { text: '好风频借力，送我上青云。', context: '柳絮词' },
      { text: '淡极始知花更艳。', context: '咏白海棠' },
      { text: '任是无情也动人。', context: '花签' },
    ],
    deathScene: '贾家败落后，宝玉出家，宝钗独守空闺，最终"金簪雪里埋"——在寒冬雪地中凄凉死去。',
    style: 'minimal-jade',
    palette: { bg: '#e8ede8', fg: '#3d3a35', accent: '#4a7c59', border: '#8a9a8a' },
  },
]

/**
 * 获取所有文学 IP 墓碑（含扩展）
 */
export function getAllLiteraryIpTombstones(): LiteraryIpTombstone[] {
  return [...LITERARY_IP_TOMBSTONES, ...LITERARY_IP_TOMBSTONES_EXTENDED]
}

/**
 * 非遗工艺墓碑（US-03 致敬区）
 */
export const HERITAGE_CRAFT_TOMBSTONES: HeritageCraftTombstone[] = [
  {
    id: 'craft-huian',
    craft: '惠安石雕',
    region: '福建泉州惠安',
    knowledge: {
      origin: '源于中原古汉族雕刻技艺，唐宋时期随衣冠南渡传入惠安。',
      feature: '以青石为材，融圆雕、浮雕、线雕、沉雕于一体，刚柔并济。',
      history: '2006 年列入首批国家级非遗名录，被誉为"南派石雕艺术代表"。',
    },
    templates: [
      { name: '青石古韵', style: 'stone-classic', palette: { bg: '#f0ece3', fg: '#3d3a35', accent: '#8c6d3f', border: '#a8a29e' } },
      { name: '影雕墨韵', style: 'stone-classic', palette: { bg: '#e8e4d9', fg: '#3d3a35', accent: '#6a5a4a', border: '#9a9088' } },
    ],
  },
  {
    id: 'craft-huizhou',
    craft: '徽州砖雕',
    region: '安徽徽州',
    knowledge: {
      origin: '徽派建筑重要装饰，明清时期随徽商兴起而鼎盛。',
      feature: '以青砖为材，层次分明，最多可达九层透雕，繁而不乱。',
      history: '2006 年列入国家级非遗，是徽派建筑"三雕"之一。',
    },
    templates: [
      { name: '徽派门楼', style: 'brick-huizhou', palette: { bg: '#f2ebe3', fg: '#3d3a35', accent: '#8c6d3f', border: '#b8a090' } },
      { name: '九层透雕', style: 'brick-huizhou', palette: { bg: '#e8ded4', fg: '#3d3a35', accent: '#6a4a3a', border: '#a89080' } },
    ],
  },
  {
    id: 'craft-suzhou',
    craft: '苏州碑刻',
    region: '江苏苏州',
    knowledge: {
      origin: '源于唐宋，以苏州文庙府学碑刻为代表，技法成熟于明清。',
      feature: '讲究刀法与书法的统一，"双钩""单刀"各得其妙，碑文清晰。',
      history: '2007 年列入国家级非遗，与苏州园林、苏州评弹并称"苏州三绝"。',
    },
    templates: [
      { name: '文庙古碑', style: 'stele-suzhou', palette: { bg: '#e8ede8', fg: '#3d3a35', accent: '#4a7c59', border: '#8a9a8a' } },
      { name: '瘦金体韵', style: 'stele-suzhou', palette: { bg: '#dde4dd', fg: '#3d3a35', accent: '#3a6a4a', border: '#7a8a7a' } },
    ],
  },
  {
    id: 'craft-miao',
    craft: '苗族银饰',
    region: '贵州黔东南',
    knowledge: {
      origin: '苗族世代相传的民间手工技艺，可追溯至唐宋时期。',
      feature: '以银为材，錾刻、掐丝、编结等工艺繁复，纹样多取蝴蝶、龙凤。',
      history: '2006 年列入首批国家级非遗，是苗族"穿在身上的史书"。',
    },
    templates: [
      { name: '蝴蝶妈妈', style: 'silver-miao', palette: { bg: '#e8eaec', fg: '#3d3a35', accent: '#8a929a', border: '#a8a8ae' } },
      { name: '银冠华彩', style: 'silver-miao', palette: { bg: '#e0e2e6', fg: '#3d3a35', accent: '#a0a0a8', border: '#98989e' } },
    ],
  },
  {
    id: 'craft-yi',
    craft: '彝族漆器',
    region: '四川凉山',
    knowledge: {
      origin: '彝族传统手工技艺，距今约 1700 年历史，古称"髹饰"。',
      feature: '以黑红黄三色为主，纹样取自然万物，色彩浓烈，古朴厚重。',
      history: '2008 年列入国家级非遗，是彝族"三色文化"的物质载体。',
    },
    templates: [
      { name: '三色古髹', style: 'lacquer-yi', palette: { bg: '#f0e8e6', fg: '#3d3a35', accent: '#9b4a4a', border: '#b09088' } },
      { name: '火焰纹饰', style: 'lacquer-yi', palette: { bg: '#f0e4e0', fg: '#3d3a35', accent: '#7a3a3a', border: '#a08078' } },
    ],
  },
]

/**
 * 心理援助热线数据（footer CSV 下载用）
 * 数据来源：docs/assets/心理援助热线.csv
 */
export const HOTLINES: HotlineEntry[] = [
  { region: '全国', organization: '全国统一心理援助热线', number: '12356', hours: '24小时', note: '国家卫健委2025年5月1日统一启用' },
  { region: '全国', organization: '希望24热线', number: '400-161-9995', hours: '24小时', note: '公益心理危机干预' },
  { region: '全国', organization: '全国公共卫生公益热线', number: '12320', hours: '24小时', note: '卫生系统公益热线' },
  { region: '全国', organization: '共青团青少年心理咨询热线', number: '12355', hours: '24小时', note: '面向青少年' },
  { region: '北京', organization: '北京心理危机研究与干预中心', number: '010-82951332', hours: '24小时', note: '回龙观医院' },
  { region: '上海', organization: '上海市心理援助热线', number: '021-12320-5', hours: '24小时', note: '上海市精神卫生中心' },
  { region: '广东', organization: '广东省心理援助热线', number: '020-12320-5', hours: '24小时', note: '广东省精神卫生中心' },
  { region: '浙江', organization: '浙江省心理援助热线', number: '0571-86798276', hours: '24小时', note: '浙江省立同德医院' },
  { region: '江苏', organization: '江苏省心理危机干预热线', number: '025-83712977', hours: '24小时', note: '南京脑科医院' },
  { region: '四川', organization: '四川省心理援助热线', number: '028-12320-5', hours: '24小时', note: '四川省精神卫生中心' },
  { region: '湖北', organization: '武汉市心理医院心理热线', number: '027-85844666', hours: '24小时', note: '武汉市精神卫生中心' },
  { region: '湖南', organization: '湖南省心理援助热线', number: '0731-12320', hours: '24小时', note: '湖南省脑科医院' },
  { region: '山东', organization: '山东省心理援助热线', number: '0531-12320', hours: '24小时', note: '山东省精神卫生中心' },
  { region: '河南', organization: '河南省心理援助热线', number: '0371-12320', hours: '24小时', note: '河南省精神卫生中心' },
  { region: '福建', organization: '福建省心理援助热线', number: '0591-12320', hours: '24小时', note: '福建省精神卫生中心' },
  { region: '辽宁', organization: '辽宁省心理援助热线', number: '024-12320', hours: '24小时', note: '辽宁省精神卫生中心' },
  { region: '香港', organization: '撒玛利亚防止自杀会', number: '23892222', hours: '24小时', note: '粤语/英语' },
  { region: '香港', organization: '生命热线', number: '23820000', hours: '24小时', note: '粤语' },
  { region: '香港', organization: '香港撒玛利亚会', number: '28960000', hours: '24小时', note: '多语言' },
  { region: '澳门', organization: '明爱生命热线', number: '28525222', hours: '24小时', note: '粤语/普通话' },
  { region: '澳门', organization: '澳门明爱辅导服务', number: '28322222', hours: '办公时间', note: '粤语' },
  { region: '台湾', organization: '1925安心专线', number: '1925', hours: '24小时', note: '卫福部心理及口腔健康司' },
  { region: '台湾', organization: '1995生命线协谈专线', number: '1995', hours: '24小时', note: '国际生命线台湾总会' },
  { region: '台湾', organization: '张老师专线', number: '1980', hours: '每日9-23时', note: '辅导青少年' },
]

/** 底部援助条常驻的 3 条核心热线 */
export const CORE_HOTLINES = HOTLINES.slice(0, 3)

/**
 * DIY 装饰元素库（US-05 左侧组件库）
 */
export const DIY_ELEMENTS = [
  { id: 'el-text-epitaph', type: 'text' as const, label: '墓志铭文本', content: '在此处填写墓志铭' },
  { id: 'el-text-name', type: 'text' as const, label: '姓名文本', content: '某 某 之 墓' },
  { id: 'el-text-year', type: 'text' as const, label: '生卒年', content: '???? – 20??' },
  { id: 'el-text-passerby', type: 'text' as const, label: '路过者寄语', content: '谢谢你停下来看我' },
  { id: 'el-pattern-cloud', type: 'pattern' as const, label: '祥云纹' },
  { id: 'el-pattern-lotus', type: 'pattern' as const, label: '莲花纹' },
  { id: 'el-pattern-wave', type: 'pattern' as const, label: '海水江崖' },
  { id: 'el-pattern-dragon', type: 'pattern' as const, label: '云龙纹' },
  { id: 'el-heritage-butterfly', type: 'heritage' as const, label: '苗族蝴蝶纹' },
  { id: 'el-heritage-fire', type: 'heritage' as const, label: '彝族火焰纹' },
  { id: 'el-heritage-brick', type: 'heritage' as const, label: '徽州砖雕纹' },
  { id: 'el-heritage-silver', type: 'heritage' as const, label: '苗族银饰纹' },
  { id: 'el-qrcode', type: 'qrcode' as const, label: '二维码（链接）', content: 'https://' },
  { id: 'el-image', type: 'image' as const, label: '上传图片' },
  { id: 'el-link', type: 'link' as const, label: '链接卡片', content: 'https://' },
]
