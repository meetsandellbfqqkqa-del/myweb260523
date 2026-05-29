import { Project, Profile } from "./types";

export const profileData: Profile = {
  firstName: "洪",
  lastName: "旗",
  tagline: "UX设计师 & AI技术爱好",
  story: "HIII，欢迎来到我的网站，我是洪旗。本科在中央美院，研究生目前在中国美院在读，性格开朗，喜欢拥抱新技术。目前经历主要包含在滴滴的产品实习经历，小红书和快手的项目经历，掌握FIGMA， AIGC视觉生成，VIBE CODING等技能",
  imageUrl: "/src/assets/images1/证件照.webp",
  email: "2860816256@qq.com",
  phone: "+86 15228718329",
  wechat: "15228718329",
  github: "meetsandellbfqgkga-del"
};

export const projectsData: Project[] = [
  {
    id: "project-01",
    number: "01",
    title: "滴滴产品实习总结",
    subtitle: "花小猪券裂变活动",
    year: "2026",
    category: "UE设计",
    role: "首席创意技术专家 & UX总监",
    client: "巴黎空灵精粹 (Ethereal Essence Paris)",
    duration: "4 个月",
    overviewImage: "/src/assets/images1/首页.webp",
    conceptTitle: "无形之物的具象转译。",
    conceptDescription: "ETHER 是一个交互空间项目，旨在为无形的数字数据流赋予形态。为巴黎 Ethereal Essence 打造，我们设计了一个实体空间，其中局部气流、音景和对用户生物特征输入做出反应的投影映射创造了独特的嗅觉-视觉反馈循环。数字 UI 被剥离了所有典型指标，以此来让位给人类的好奇心和持续的氛围感反馈。",
    showcaseImages: [
      "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
    ],
    designProcess: [
      {
        phase: "感知虚无",
        description: "我们首先分析了画廊环境中人类姿势的微妙变化。选择生体特征手环和热成像相机，绘制了动能存在如何改变室内光影的图谱。"
      },
      {
        phase: "流动原型设计",
        description: "利用高帧率反馈屏幕和流体动力学算法，我们模拟了模仿慢镜头云彩的虹彩颗粒，将参与者包裹在光的茧中。"
      }
    ],
    finalResult: {
      metrics: "94% 感官共鸣得分",
      achievement: "以太 (ETHER) 在 2026 年巴黎设计周展出，斩获空间体验和数字装置类双料金奖。该装置迎来了超过两万名参观者，人均停留时间达十六分钟。",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
    }
  },
  {
    id: "project-02",
    number: "02",
    title: "小红书市集体验提升",
    subtitle: "设计优化小红书市集相关界面",
    year: "2025",
    category: "UX设计",
    role: "UX架构师 & 视觉程序员",
    client: "东京现代空间美术馆",
    duration: "6 个月",
    overviewImage: "/src/assets/images 2/75069789.webp",
    conceptTitle: "于速度中探索静谧。",
    conceptDescription: "在一个被即时信息高度饱和的世界中，KINETIC VOID 充当了数字避难所。基于具有惯性的物理网格，作品将用户的滚动行为减慢至微秒级。利用程序性生成画布，它展示了基于东京最安静场所的建筑比例而缓慢组装和消隐的抽象混凝土楼梯与光学会学结构。",
    showcaseImages: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200"
    ],
    designProcess: [
      {
        phase: "粗野主义几何",
        description: "绘制来自东京混凝土小巷的建筑学坐标，我们利用黄金分割比例建立网格对齐，将冰冷的砌石结构转化为发光的矢量线条。"
      },
      {
        phase: "摩擦阻尼引擎",
        description: "在 WebGL 中开发了自定义动量摩擦曲线。与其允许快速轻扫，页面会平稳减速，鼓励冥想般缓慢的阅读速度。"
      }
    ],
    finalResult: {
      metrics: "12分钟平均冥想时长",
      achievement: "获东京媒体艺术联会颁发最佳实验性网页交互奖。被誉为「数字卫生领域的里程碑式演练」，恢复了数字排版的有机平衡。",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
    }
  },
  {
    id: "project-03",
    number: "03",
    title: "快手2025年度回忆",
    subtitle: "基于快手年度报告进行虚拟创作",
    year: "2025",
    category: "UI设计",
    role: "艺术总监 & 策展人",
    client: "独立出版机构 (Independent Publication Co.)",
    duration: "8 个月",
    overviewImage: "/src/assets/images 3/regenerated_image_1779694602997.webp",
    conceptTitle: "空无之地的形态。",
    conceptDescription: "在日本美学中，“间”（Ma）是对事物之间纯粹寂静与空间的颂扬。本项目是一个经过策划、音画同步的摄影社论，赞美了东京深夜寂静的街巷、空旷的列车车厢以及穿透夜雾的单盏路灯。网站将这一感官序列平铺于横向时间线上，并采用了极具张力的排版对比。",
    showcaseImages: [
      "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=1200",
      "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200"
    ],
    designProcess: [
      {
        phase: "追逐暗影",
        description: "策划了对东京外围林区两年的深夜探索，共包含140张夜间曝光底片。采用中画幅胶片捕捉，保留了午夜青石与潮湿沥青最丰富微妙的渐变。"
      },
      {
        phase: "断续网格",
        description: "设计了一个视口响应式布局，使图像非对称地交错排列，从而使阅读体验犹如独自在幽静、蜿蜒的住宅街道上漫步。"
      }
    ],
    finalResult: {
      metrics: "4万+ 视觉杂志读者",
      achievement: "成功作为在线流媒体交互艺术目录及限量版精装版画册出版，在东京、伦敦和巴黎的艺术书店均已售罄。",
      image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200"
    }
  }
];
