import { WorkExperience, Project, Education, Skill, SkillLevel } from './types';
import { 
  Briefcase, 
  User, 
  Cpu, 
  GraduationCap, 
  Film, 
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: "邱谦业",
  englishName: "Terry Qiu",
  phone: "19512405629",
  email: "akita_terry@163.com",
  location: "上海 松江 九亭",
  role: "剪辑师 / 动效师",
  avatar: "https://youke1.picui.cn/s1/2025/11/27/692805564d52c.png" 
};

export const EXPERIENCE_DATA: WorkExperience[] = [
  {
    company: "胡罗贝文化",
    role: "后期 / Post-Production",
    period: "2023.07 — 至今",
    description: [
      "独立完成“兔叭咯”账号在各平台的科普视频调色剪辑、素材收集、文案拆解、包装设计及剪辑动效。独立剪辑项目60+。",
      "完成各系列视频模板化，编写制定项目SOP【兔叭咯账号：剪辑标准作业程序白皮书】。",
      "参与前期拍摄指导，提供后期创意和建议。",
      "在部分项目中担任编导统筹、设计、动画动效、摄影摄像等其他工作。"
    ],
    tags: ["SOP制定", "医学科普", "自媒体", "百大UP"],
    highlights: [
      "《发烧要不要尽早吃药？》 (格致科学传播奖)",
      "《每天凌晨3点睡，多少天会死？》 (B站第277期每周必看)",
      "《一天“卤”2次算多吗？》 (B站全站排行榜最高第3名)",
      "《凶手如何把投毒伪装成“意外”？》",
      "《恋爱脑的脑子跟“正常人”不一样吗？》"
    ]
  },
  {
    company: "轻蜓健康",
    role: "视频制作 / Video Producer",
    period: "2022.08 — 2023.05",
    description: [
      "主要负责独立完成系列科普MG动画制作、视频拍摄与制作。",
      "负责三维产品建模及渲染；参与直播间搭建、网站建设与制作。"
    ],
    tags: ["MG动画", "三维建模", "直播", "官网制作"],
    highlights: [
      "系列科普MG动画《糖足科普动画》"
    ]
  },
  {
    company: "字节跳动 (大力智能)",
    role: "后期 / Post-Production",
    period: "2021.08 — 2022.06",
    description: [
      "主要负责大力智能教育产品线的课程内容制作，为前期和拍摄提供创意和建议。",
      "参与制作包括真人授课、动画短片、互动直播等各类型视频。",
      "承接大力智能内部需求，为公司内部活动、社区运营、产品推广提供视频支持。"
    ],
    tags: ["K-12教育", "Vlog", "模板设计", "SOP"],
    highlights: [
      "大力台灯电商详情页宣传视频《美术馆售卖视频》",
      "线上互动直播答题《知识小英雄2.0》"
    ]
  },
  {
    company: "天泰动画",
    role: "动画师 / Animator",
    period: "2017.08 — 2018.06",
    description: [
      "负责二维动画的制作和后期工作。"
    ],
    tags: ["剧集动画", "Flash动画", "二维电影"],
    highlights: [
      "央视动画贺岁电影《新大头儿子和小头爸爸之兜兜传奇》"
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    title: "湫鱼 2021-2022 作品汇总",
    subtitle: "作品集",
    link: "https://www.xinpianchang.com/a11994547?from=UserProfile",
    description: "汇集了在校期间&在字节实习期间的作品、产出和练习",
    tags: ["作品集", "AE", "3D","剪辑"]
  },
  {
    title: "每天凌晨3点睡，多少天会死？",
    subtitle: "B站第277期每周必看",
    stats: "播放量 1217.4万",
    link: "https://www.bilibili.com/video/BV1rx4y1t7XT",
    description: "深入探讨睡眠剥夺对人体的极限影响，结合医学数据进行可视化呈现。",
    tags: ["1000W+", "科普", "爆款","每周必看"]
  },
  {
    title: "一天“卤”2次算多吗？",
    subtitle: "B站全站排行榜最高第3名",
    stats: "播放量 1156.28W",
    link: "https://www.bilibili.com/video/BV1EC92YBEnv/",
    description: "针对青少年关注的生理健康话题进行科学、幽默的解读与可视化。",
    tags: ["1000W+", "全站热门"]
  },
  {
    title: "发烧要不要尽早吃药？",
    subtitle: "格致科学传播奖 年度健康科普视频",
    stats: "播放量 217.83W",
    link: "https://www.bilibili.com/video/BV1bu411G76Z/",
    description: "B站全站排行榜最高第37名。硬核医学科普，解释免疫系统工作原理。",
    tags: ["获奖作品", "硬核科普"]
  },
  {
    title: "凶手如何把投毒伪装成“意外”？",
    subtitle: "B站第258期每周必看",
    stats: "播放量 205.45W",
    link: "https://www.bilibili.com/video/BV1GF4m1E73H/",
    description: "法医毒理学可视化，解析复杂化学成分与人体反应。",
    tags: ["悬疑科普", "每周必看"]
  },
  {
    title: "恋爱脑的脑子跟“正常人”不一样吗？",
    subtitle: "心理学科普",
    stats: "热门科普",
    link: "https://www.bilibili.com/video/BV1PXtmzhE4H/",
    description: "脑科学视角解读恋爱心理学，通过音乐、素材、剪辑节奏等方式铺垫情绪。",
    tags: ["心理学", "脑科学"]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    school: "上海师范大学",
    degree: "硕士",
    period: "2019 — 2022",
    major: "影视传媒学院 | 戏剧(动画)",
    description: ["谢晋杯一等奖 二维动画短片"],
    highlights: ["《彼岸》", "《母与子》 (水墨拉毛剪纸动画短片)"]
  },
  {
    school: "南通大学",
    degree: "本科",
    period: "2014 — 2018",
    major: "杏林学院 | 动画"
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: "Pr", level: SkillLevel.HIGH },
  { name: "Ae", level: SkillLevel.HIGH },
  { name: "Ps", level: SkillLevel.HIGH },
  { name: "An", level: SkillLevel.HIGH },
  { name: "Blender", level: SkillLevel.MEDIUM },
  { name: "C4D", level: SkillLevel.MEDIUM },
  { name: "Ai", level: SkillLevel.MEDIUM },
  { name: "达芬奇", level: SkillLevel.MEDIUM },
  { name: "FCP", level: SkillLevel.MEDIUM },
  { name: "Au", level: SkillLevel.LOW },
];

export const SYSTEM_CAPABILITIES = [
  "全流程视效掌控：精通调色、剪辑、特效合成与动效制作，独立把控视频质量。",
  "创意与审美驱动：深厚的视听语言功底，精准把握剪辑节奏与包装设计。",
  "高效工程化思维：擅长制定SOP标准化流程，具备快速技术迁移与自我迭代能力。"
];

export const CATEGORY_ICONS = {
  PROFILE: <User size={18} />,
  EXPERIENCE: <Briefcase size={18} />,
  PROJECTS: <Film size={18} />,
  EDUCATION: <GraduationCap size={18} />,
  SKILLS: <Cpu size={18} />
};
