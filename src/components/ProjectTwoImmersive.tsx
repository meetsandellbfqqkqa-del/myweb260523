import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Image,
  Layers,
  Sliders,
  RotateCcw,
  ChevronDown,
  Sparkles,
  Settings,
  Tv,
  Eye,
  Camera,
  Grid
} from "lucide-react";

import { resolveImagePath } from "../utils/imageResolver";

interface ProjectTwoImmersiveProps {
  onBack: () => void;
  onNavigateToProject: (projectId: string) => void;
}

interface SlideContent {
  id: number; // 1 to 26
  sectionIndex: number; // 1 to 5
  sectionName: string;
  sectionSub: string;
  title: string;
  titleEng: string;
  summary: string;
  summaryEng: string;
  defaultImage: string;
  metrics?: string;
  coordinates?: string;
}

// 26 meticulously written slides covering the Tokyo Kinetic Void series:
const SLIDES_DATA: SlideContent[] = [
  // SECTION 1: 概念与设计哲学 (Page 1-4)
  {
    id: 1,
    sectionIndex: 1,
    sectionName: "概念与设计哲学",
    sectionSub: "SECTION 01 // CONCEPT & PHILOSOPHY",
    title: "关于项目",
    titleEng: "Kinetic Void: Embodying Data Silence in a Saturated City",
    summary: "东京街头闪动的霓虹灯与即时推送不断掠夺着人类微弱的感官带宽。本项目致力于在其对立面开辟一个减速空间，将不可见的数字滞留感化为高密度的纯净空间美学。",
    summaryEng: "As neon streets and push-notifications devour finite human sensory bandwidth, we architect a sanctuary of zero density, recasting the silent void as a luxury of time.",
    defaultImage: "/src/assets/images 2/75069790.webp",
    metrics: "Inertia Scale: 0.95 (Viscous)",
    coordinates: "KNT.VD // PHI.01"
  },
  {
    id: 2,
    sectionIndex: 1,
    sectionName: "概念与设计哲学",
    sectionSub: "SECTION 01 // CONCEPT & PHILOSOPHY",
    title: "问题走查/用户浏览链路自查",
    titleEng: "Temporal Decelerator: Rebuilding Gaze Rhythm with Viscous Grids",
    summary: "摒弃‘瞬时加载’的过度取悦，让滑动阻尼和元素露出的物理响应降至微秒级匀变速，赋予每个单词、每根发丝线条优雅的生长动画。沉浸式抚平数字时代的碎片焦虑。",
    summaryEng: "Instead of split-second instant loading, we engineer pixel friction to unfold layouts slowly, welcoming users into a calming browser state with rhythmic, elegant easing.",
    defaultImage: "/src/assets/images 2/75069791.webp",
    metrics: "Deceleration Rate: -3.8m/s²",
    coordinates: "KNT.VD // PHI.02"
  },
  {
    id: 3,
    sectionIndex: 1,
    sectionName: "概念与设计哲学",
    sectionSub: "SECTION 01 // CONCEPT & PHILOSOPHY",
    title: "问题走查/用户购买链路自查",
    titleEng: "Negative Spatials: Searching for Hidden Halos in Tokyo's Nights",
    summary: "从无主小巷中搜集深夜穿透围墙的零星灯影。将多余的三维繁复面剥除，运用冷寂光线的投影溢流在深色背景中刻划，展现出建筑几何在暗面中的本真重量。",
    summaryEng: "Collect single-source lunar shadows leaking over raw concrete boundary gates. High-contrast ambient mapping filters out urban noise to isolate absolute architectural weights.",
    defaultImage: "/src/assets/images 2/75069792.webp",
    metrics: "Shadow Spread: 180px",
    coordinates: "KNT.VD // PHI.03"
  },
  {
    id: 4,
    sectionIndex: 1,
    sectionName: "概念与设计哲学",
    sectionSub: "SECTION 01 // CONCEPT & PHILOSOPHY",
    title: "问题走查总结",
    titleEng: "Mindful Removals: Designing the Void by Relentless Stripping",
    summary: "我们将所有交互控件、点赞、多余的导航信息压缩。整个屏幕只留存高精度图像本身、精确的时空坐标与谦逊地隐于下方的极细控制标尺，重归专注本身。",
    summaryEng: "Banish notification flags and nested panels. By focusing only on raw imagery and standard alignment rules, the dynamic grid regains its functional silence.",
    defaultImage: "/src/assets/images 2/75069793.webp",
    metrics: "Clutter Reduction: 98.2%",
    coordinates: "KNT.VD // PHI.04"
  },

  // SECTION 2: 都市建筑网格 (Page 5-8)
  {
    id: 5,
    sectionIndex: 2,
    sectionName: "都市建筑网格",
    sectionSub: "SECTION 02 // URBAN ARCHITECTURAL GRID",
    title: "用户研究/访谈前准备",
    titleEng: "Brutalist Geometry: High-Fidelity Capture of Yoyogi Staircase",
    summary: "把代代木老建筑粗粝、饱含历史厚度的砂质外壁转化为数码图腾。灰色阶度在单色视口下呈现如沙石微雕般的壮观。极细白哈林色网格让建筑骨架完美漂浮。",
    summaryEng: "Decode the textured historic grains of aging Yoyogi concrete walls into numerical gradients. Surrounded by single-pixel lines, the monument feels lighter, almost weightless.",
    defaultImage: "/src/assets/images 2/75069802.webp",
    metrics: "Scan resolution: 12000px",
    coordinates: "ARC.GRD // EXH.01"
  },
  {
    id: 6,
    sectionIndex: 2,
    sectionName: "都市建筑网格",
    sectionSub: "SECTION 02 // URBAN ARCHITECTURAL GRID",
    title: "用户研究/问题聚焦",
    titleEng: "Nakano Widescreen: Rhythmic Horizontal Alignment Ticks",
    summary: "受早期黑泽明电影景别影响，我们将长方形卡片宽高比固定为完美的、能唤醒本能宏大感的16:9比例。配合左右微小刻度对齐，营造在艺术暗房中的肃穆感。",
    summaryEng: "Inspired by classic widescreen cinematography, we anchor visual frames in a ratio of 16:9, surrounding margins with hairline coordinates to mirror dark projection rooms.",
    defaultImage: "/src/assets/images 2/75069795.webp",
    metrics: "Ratio: 1.777 Cine",
    coordinates: "ARC.GRD // EXH.02"
  },
  {
    id: 7,
    sectionIndex: 2,
    sectionName: "都市建筑网格",
    sectionSub: "SECTION 02 // URBAN ARCHITECTURAL GRID",
    title: "竞品分析/首页运营模块",
    titleEng: "Chiaroscuro Discontinuity: Materializing the Negative Gap",
    summary: "不再依赖数码阴影生成器。我们手绘出符合东京极简画廊进深采光落点的物理退化晕，让画幅边缘的光晕和暗区宛如从真实的石膏框架中流泻出来一般。",
    summaryEng: "Avoid digital overlay artifacts. We mapped hand-drawn, falloff-accurate luminosity glows matching classic gypsum frames to deliver realistic physical weight.",
    defaultImage: "/src/assets/images 2/75069797.webp",
    metrics: "Gamma Falloff: 1.15",
    coordinates: "ARC.GRD // EXH.03"
  },
  {
    id: 8,
    sectionIndex: 2,
    sectionName: "都市建筑网格",
    sectionSub: "SECTION 02 // URBAN ARCHITECTURAL GRID",
    title: "竞品分析/商详页信息透出",
    titleEng: "Asymmetrical Tension: Elegant Negative Space Breathings",
    summary: "打破死板的对称居中。我们将摄影重心和极简文字一左一右，排版空隙被置入黄金比例距离，让用户的视线能够自由地游移，建立毫无逼迫感的浏览情绪状态。",
    summaryEng: "Shatter conventional symmetrical card templates. Displace geometric masses to create dynamic negative paths, giving visual layouts a serene, unforced reading curve.",
    defaultImage: "/src/assets/images 2/75069801.webp",
    metrics: "Grid Ratio: Golden Angle",
    coordinates: "ARC.GRD // EXH.04"
  },

  // SECTION 3: 算法重构与动能 (Page 9-14)
  {
    id: 9,
    sectionIndex: 3,
    sectionName: "算法重构与动能",
    sectionSub: "SECTION 03 // KINETIC VISCOSITY IMPLEMENTATION",
    title: "竞品分析/店铺页信息透出",
    titleEng: "Step 01: High-Viscosity Friction Momentum Engine",
    summary: "为了使横向滚动呈现出如在深色原油中缓缓滑过的质感，我们用弹性阻尼牛顿方程在前端重新编写了位移。让即使最激烈的拉动也变成缓慢释放的温柔仪式。",
    summaryEng: "To slow rapid gestures, we coded momentum-friction solvers in WebGL. Accelerations glide and decelerate gently, inviting users into a slow, meditative spatial flow.",
    defaultImage: "/src/assets/images 2/75069804.webp",
    metrics: "Viscosity Index: 0.88",
    coordinates: "KIN.ENG // STP.01"
  },
  {
    id: 10,
    sectionIndex: 3,
    sectionName: "算法重构与动能",
    sectionSub: "SECTION 03 // KINETIC VISCOSITY IMPLEMENTATION",
    title: "竞品分析总结",
    titleEng: "Step 02: Strategic Cognitive Sabbaticals & Intermissions",
    summary: "我们坚持反极速主义。在两个章节滑动过渡之时，人为插入高达500ms的“留白黑场”。此时文字和图像全部安静离场，让眼球和精神在深邃的绝对黑夜中沉静。",
    summaryEng: "In defiance of instant load, we render a pure black gap during section swaps. This 500ms delay resets the optical nerve and clears residual reading fatigue.",
    defaultImage: "/src/assets/images 2/75069803.webp",
    metrics: "Sabbatical: 500ms",
    coordinates: "KIN.ENG // STP.02"
  },
  {
    id: 11,
    sectionIndex: 3,
    sectionName: "算法重构与动能",
    sectionSub: "SECTION 03 // KINETIC VISCOSITY IMPLEMENTATION",
    title: "策略一:逛起来",
    titleEng: "Step 03: Simulated Biometric Breathing & Lens Easing",
    summary: "引入自适应图像聚焦缓动。卡片在滑入屏幕中端时自动解除边缘的高斯模糊，宛如使用者的眼睛在深夜中凝神聚焦；而离开时又重新没入朦胧夜霭，极为流畅。",
    summaryEng: "Implement dynamic focal falloffs. Cards clear up as they align center, simulating human eye adaptation, then gently return to industrial fog as they glide away.",
    defaultImage: "/src/assets/images 2/75069805.webp",
    metrics: "Focal Scale: 0.98",
    coordinates: "KIN.ENG // STP.03"
  },
  {
    id: 12,
    sectionIndex: 3,
    sectionName: "算法重构与动能",
    sectionSub: "SECTION 03 // KINETIC VISCOSITY IMPLEMENTATION",
    title: "首页新框架",
    titleEng: "Step 04: Ambient Light Spill & Low-Lumen Reflection",
    summary: "设计了一个自适应环境光投影算法。根据当前处于核心焦点的摄影画面色调，在黑色背景深层秘密地投射出折射溢色，宛如真实的投影在无光展墙上投下的漫反射。",
    summaryEng: "Project secondary glow profiles echoing the core visual colors onto background layers, simulating real gallery projectors reflecting in a darkened space.",
    defaultImage: "/src/assets/images 2/75069806.webp",
    metrics: "Luminance Spill: 12%",
    coordinates: "KIN.ENG // STP.04"
  },
  {
    id: 13,
    sectionIndex: 3,
    sectionName: "算法重构与动能",
    sectionSub: "SECTION 03 // KINETIC VISCOSITY IMPLEMENTATION",
    title: "首页Feed流卡片多元化",
    titleEng: "Step 05: Fluid Micro-particle Drift and Drag Dynamics",
    summary: "在全景控制中增加不易察觉的慢速粒子背景。利用经典流体力学，滚动速度越快则粒子产生的微弱推力阻力越大。在极其微妙的层面上，用指尖便能触摸到流逝的时间重量。",
    summaryEng: "Utilize hydrodynamics to drift delicate layout vectors under scroll thrusts. Moving faster increases drag coefficients, revealing the true gravity of motion.",
    defaultImage: "/src/assets/images 2/75069798.webp",
    metrics: "Particulate Drag: +18%",
    coordinates: "KIN.ENG // STP.05"
  },
  {
    id: 14,
    sectionIndex: 3,
    sectionName: "算法重构与动能",
    sectionSub: "SECTION 03 // KINETIC VISCOSITY IMPLEMENTATION",
    title: "首页Feed流卡片多元化",
    titleEng: "Step 06: Magnetic Slide Lock & Precision Scale Easing",
    summary: "让滚动轨道仿佛内部拥有磁力凹槽。一旦划动即将止息，程序将用精确的极值余弦算法将画面精确锁定在视口中央，提供如同昂贵胶片盘微调旋钮在手中锁定的爽朗手感。",
    summaryEng: "Create invisible magnetic notches on the axis. As deceleration wraps, the system gently locks to center, offering the tactical feel of premium mechanical cameras.",
    defaultImage: "/src/assets/images 2/75069799.webp",
    metrics: "Alignment tolerance: 0.1px",
    coordinates: "KIN.ENG // STP.06"
  },

  // SECTION 4: 网页实验性排版 (Page 15-21)
  {
    id: 15,
    sectionIndex: 4,
    sectionName: "网页实验性排版",
    sectionSub: "SECTION 04 // EXPERIMENTAL LAYOUTS & TYPOGRAPHY",
    title: "为什么搭建社区风格灵感簿",
    titleEng: "Minimal Skeletons: Elevating the Haunting Beauty of Micro-Type",
    summary: "摒弃粗厚色块。卡片由最细的单像素白色边界和暗夜发光线条分隔；字体全部降至10px以下，运用超宽字符间距让大片留白在没有负累的情况下展示其高贵的呼吸度。",
    summaryEng: "Avoid bulky cards. Structural borders are formed of single-pixel lines; fonts are scaled to micro size with wider tracking to allow negative areas to breathe.",
    defaultImage: "/src/assets/images 2/75069807.webp",
    metrics: "Border Weight: 0.5px hairline",
    coordinates: "EXP.TYP // STP.01"
  },
  {
    id: 16,
    sectionIndex: 4,
    sectionName: "网页实验性排版",
    sectionSub: "SECTION 04 // EXPERIMENTAL LAYOUTS & TYPOGRAPHY",
    title: "风格灵感页",
    titleEng: "Dynamic Serif Skeletal Flexing & Font Viscosities",
    summary: "我们将传统字体骨骼加入弹簧质点算法。字体的字宽、字重实时根据当下的阅读卷动速度、以及东京气象局的环境风速数值发生呼吸般的微缩舒张，使排版如植物般灵性生长。",
    summaryEng: "Traditional serif font characters react to scrolling kinetic streams or local weather stats. Skeletons widen and compress elegantly as if moved by gentle midnight air.",
    defaultImage: "/src/assets/images 2/75069800.webp",
    metrics: "Modulation Coefficient: 1.442",
    coordinates: "EXP.TYP // STP.02"
  },
  {
    id: 17,
    sectionIndex: 4,
    sectionName: "网页实验性排版",
    sectionSub: "SECTION 04 // EXPERIMENTAL LAYOUTS & TYPOGRAPHY",
    title: "扩充风格展示类型，高效引导",
    titleEng: "Swiss Blueprint Decals: Subtle Engineering Technical Markers",
    summary: "在画幅周围精确标注着坐标、色阶范围、以及系统开机时间的数字。去除了没有章法的感性线条，用冷冰冰、克制至极的技术语言去传达一种当代美学的数字策展仪式感。",
    summaryEng: "Surround visual layouts with high-precision engineering data, telemetry ranges, and strict scales to structure digital artifacts with Swiss modern detail.",
    defaultImage: "/src/assets/images 2/75069809.webp",
    metrics: "Decal alignment: 100% vector",
    coordinates: "EXP.TYP // STP.03"
  },
  {
    id: 18,
    sectionIndex: 4,
    sectionName: "网页实验性排版",
    sectionSub: "SECTION 04 // EXPERIMENTAL LAYOUTS & TYPOGRAPHY",
    title: "笔记结构优化",
    titleEng: "Diffuse Drop-Shadow: Overwhelming Depth in a Dark Abyss",
    summary: "在横向卡片背面投射出高达140像素模糊值、软边缘退化极其均匀的大跨度黑影。将原本平面的屏幕硬生生拉出三层物理空间，使影像在深沉中具有雕塑般的深度感。",
    summaryEng: "Project a massive, gradual 140px blurring shadow map behind cards, lifting horizontal rectangles physically off the monitor plane to evoke classic sculpture.",
    defaultImage: "/src/assets/images 2/75069811.webp",
    metrics: "Shadow Radius: 140px spread",
    coordinates: "EXP.TYP // STP.04"
  },
  {
    id: 19,
    sectionIndex: 4,
    sectionName: "网页实验性排版",
    sectionSub: "SECTION 04 // EXPERIMENTAL LAYOUTS & TYPOGRAPHY",
    title: "设计规范搭建",
    titleEng: "High Contrast Void: Rekindling Vision in Complete Darkness",
    summary: "大面积采用超黑低流明背板，与极其明亮、细节丰沛的高灰摄影画面。通过把视线强制集中在明亮方槽中，模拟了古典教堂在穹顶引入一道绝对光流震撼心灵的建筑巧思。",
    summaryEng: "Contrast deep low-lumen backdrop canvases with brilliant, graphic photo frames. This geometry mimics how dark temples trap down-pouring natural daylight.",
    defaultImage: "/src/assets/images 2/75069808.webp",
    metrics: "Contrast Ratio: Extrema",
    coordinates: "EXP.TYP // STP.05"
  },
  {
    id: 20,
    sectionIndex: 4,
    sectionName: "网页实验性排版",
    sectionSub: "SECTION 04 // EXPERIMENTAL LAYOUTS & TYPOGRAPHY",
    title: "策略二:买起来",
    titleEng: "Phonetic Mapping: Decoding Ancient Textures to Dark Low Synth",
    summary: "我们将摄影集中大理石的物理法线贴图和凹痕，通过实时矩阵转换，拼贴成了具有极低沉音高、能微微引起胸腔共鸣的管风琴式电子声，触碰即是听觉上的‘触摸泥质’。",
    summaryEng: "Translate normal-map texture values into long-wave sub-bass resonances, allowing visitors to feel the physical stones through atmospheric low-frequency synth.",
    defaultImage: "/src/assets/images 2/75069810.webp",
    metrics: "Acoustics loop: 24.2 Hz",
    coordinates: "EXP.TYP // STP.06"
  },
  {
    id: 21,
    sectionIndex: 4,
    sectionName: "网页实验性排版",
    sectionSub: "SECTION 04 // EXPERIMENTAL LAYOUTS & TYPOGRAPHY",
    title: "红包框架设计01/穿搭专属红包",
    titleEng: "Organic Bio-Trigger: Bypassing Buttons with Kinetic Breathing",
    summary: "在最后一组页面里，我们测试了完全抛弃指针的无感体验。图像随视线停留的深度而优雅伸长或翻滚，人机在这一刻达到无间融通的非介质化极致艺术状态。",
    summaryEng: "Banish cursor click demands. Layout layers morph organically matching user scroll speeds, arriving at a fluid state of ambient computing.",
    defaultImage: "/src/assets/images 2/75069812.webp",
    metrics: "Trigger delay: 0.00ms",
    coordinates: "EXP.TYP // STP.07"
  },

  // SECTION 5: 独立研究与实践 (Page 22-27)
  {
    id: 22,
    sectionIndex: 5,
    sectionName: "独立研究与实践",
    sectionSub: "SECTION 05 // METROPOLIS SILENCE EXHIBITS",
    title: "红包框架设计02/店铺专属红包",
    titleEng: "Chrono-Aesthetics: Elegiac Hourglass Digital Clock for Timepieces",
    summary: "在东京知名媒体工作室实习期间，为新奢腕表品牌开发了三维时间粒子轨迹系统。时分秒不再是尖锐的指针，而是如细沙般漫舞的分形弧带。",
    summaryEng: "During an internship at a Tokyo studio, we engineered a 3D hourglass particle canvas for luxury timepiece brands. Hours and minutes dissolve like loose silicon sand.",
    defaultImage: "/src/assets/images 2/75069815.webp",
    metrics: "Platform: Three.js / WebGL",
    coordinates: "MET.SIL // EXH.01"
  },
  {
    id: 23,
    sectionIndex: 5,
    sectionName: "独立研究与实践",
    sectionSub: "SECTION 05 // METROPOLIS SILENCE EXHIBITS",
    title: "多链路多场景红包传播",
    titleEng: "Hyper-Haptics: High-Aesthetic Tactile EV In-Car Dashboard",
    summary: "为豪华跑车智能座舱方案升级。摒弃了刺眼的日光蓝偏好，采用超低流明感的高对比夜宿线条，辅以特定手势深度回馈，消除了行驶操控视觉失焦。",
    summaryEng: "Upgraded user configurations for luxury EV sports cars. Low-lumen interfaces with high aesthetic contrast ensure safety while prioritizing minimalist touch sensations.",
    defaultImage: "/src/assets/images 2/75069814.webp",
    metrics: "Lumen count: <15 nits",
    coordinates: "MET.SIL // EXH.02"
  },
  {
    id: 24,
    sectionIndex: 5,
    sectionName: "独立研究与实践",
    sectionSub: "SECTION 05 // METROPOLIS SILENCE EXHIBITS",
    title: "浏览中红包传播",
    titleEng: "Monolithic Archives: Microscopic 12K Stone Digital Curation",
    summary: "为高端画廊建立石材和粗野主义水泥的高解纹理数据库。12K级微观法向贴图，在屏幕中生动反映了不同季节光照在质朴表面的温存与投影移动。",
    summaryEng: "Architected a materials library tracking the raw structural values of natural marbles and granites under evolving solar paths. It preserves the weight of mineral elements.",
    defaultImage: "/src/assets/images 2/75069816.webp",
    metrics: "Texture Resolution: 12000px",
    coordinates: "MET.SIL // EXH.03"
  },
  {
    id: 25,
    sectionIndex: 5,
    sectionName: "独立研究与实践",
    sectionSub: "SECTION 05 // METROPOLIS SILENCE EXHIBITS",
    title: "店铺滚动弹窗",
    titleEng: "Voice Dynamics: Voice Decibel Wave Adaptive Typography System",
    summary: "根据麦克风环境分贝值，字体字宽、字重实时以弹性力学运动方程式发生膨胀和缩微，从而使字符能够像自然界声波一样发出肉眼可见的物理律动。",
    summaryEng: "Voice wave decibels interact directly with standard type skeletons. Font families expand and retract via spring mechanics to visually embody spoken patterns.",
    defaultImage: "/src/assets/images 2/75069817.webp",
    metrics: "Frequency Range: 20-20k Hz",
    coordinates: "MET.SIL // EXH.04"
  },
  {
    id: 26,
    sectionIndex: 5,
    sectionName: "独立研究与实践",
    sectionSub: "SECTION 05 // METROPOLIS SILENCE EXHIBITS",
    title: "店铺结构优化",
    titleEng: "Anti-Clutter: Golden Ratio Browser Filtering Platform",
    summary: "设计的一款实验性脚本：自动将网站中闪烁、刺目的横幅广告、过度鲜艳的颜色，自动解析剥离，并全部置换为具有完美比例的极简无垠留白空域。",
    summaryEng: "A Chrome-extension prototype designed to parse noisy web grids, actively filtering busy ads or banner blocks and restoring quiet spaces based on golden ratio grids.",
    defaultImage: "/src/assets/images 2/75069818.webp",
    metrics: "Attention recovery rate: 92.4%",
    coordinates: "MET.SIL // EXH.05"
  }
];

export default function ProjectTwoImmersive({
  onBack,
  onNavigateToProject
}: ProjectTwoImmersiveProps) {
  const imageUrls = SLIDES_DATA.map(s => s.defaultImage);

  // Track the current active slide on screen (0 is Cover, 1-26 are content slides)
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // Safe reference monitoring for scrolling interaction
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverPercentage, setHoverPercentage] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Helper to extract granular interaction values from pointer events (0 to 26 slides)
  const getProgressSpecs = (clientX: number) => {
    if (!progressBarRef.current) return { percentage: 0, index: 0 };
    const rect = progressBarRef.current.getBoundingClientRect();
    const width = rect.width || 1;
    const left = rect.left;
    const relativeX = clientX - left;
    let percentage = relativeX / width;
    percentage = Math.max(0, Math.min(1, percentage));
    const targetIndex = Math.round(percentage * 26);
    return { percentage, index: targetIndex };
  };

  // Soft slider scrolling function centering the horizontal target card
  const scrollToSlide = (index: number, behavior: ScrollBehavior = "smooth") => {
    const container = horizontalScrollRef.current;
    if (!container) return;

    const slides = container.children;
    const target = slides[index] as HTMLElement;
    if (target) {
      const containerWidth = container.offsetWidth;
      const targetLeft = target.offsetLeft;
      const targetWidth = target.offsetWidth;
      const scrollPosition = targetLeft - (containerWidth / 2) + (targetWidth / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: behavior
      });
      setActiveSlideIndex(index);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const { percentage, index } = getProgressSpecs(e.clientX);

    setIsDraggingProgress(true);
    setIsHovered(true);
    setHoverPercentage(percentage);
    setHoverIndex(index);

    progressBarRef.current.setPointerCapture(e.pointerId);
    scrollToSlide(index, "smooth");
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const { percentage, index } = getProgressSpecs(e.clientX);

    setHoverPercentage(percentage);
    setHoverIndex(index);

    if (isDraggingProgress) {
      scrollToSlide(index, "auto");
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      try {
        progressBarRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Safe check for legacy or synthetic captures
      }
    }
    setIsDraggingProgress(false);
  };

  // Sync scroll positioning to active index with inertia mapping
  const handleScroll = () => {
    const container = horizontalScrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const slides = container.children;

    let bestIndex = activeSlideIndex;
    let minDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i] as HTMLElement;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const containerCenter = scrollLeft + containerWidth / 2;
      const distance = Math.abs(slideCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        bestIndex = i;
      }
    }

    if (bestIndex !== activeSlideIndex && bestIndex >= 0 && bestIndex <= 26) {
      setActiveSlideIndex(bestIndex);
    }
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      scrollToSlide(activeSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < 26) {
      scrollToSlide(activeSlideIndex + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-[#0A0A0A] text-[#F5F5F2] selection:bg-[#8C7CFF] selection:text-black font-sans relative overflow-hidden flex flex-col justify-between pl-0 md:pl-64 transition-all duration-300"
    >
      {/* Background static elegant grid lines for technical arts feeling */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.02] mix-blend-screen">
        <div className="absolute top-0 left-12 h-full w-[1px] bg-white" />
        <div className="absolute top-0 left-[35%] h-full w-[1px] bg-white" />
        <div className="absolute top-0 right-12 h-full w-[1px] bg-white" />
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-white" />
        <div className="absolute top-[65%] left-0 w-full h-[1px] bg-white" />
      </div>

      {/* FIXED METADATA OVERLAYS (Cinematic exhibition headers) */}
      <div className="fixed top-0 left-0 md:left-64 right-0 z-30 flex justify-between items-center py-5 px-6 sm:px-12 backdrop-blur-md bg-bg-dark/45 border-b border-white/5 pointer-events-auto transition-all duration-300">
        <button
          onClick={onBack}
          className="flex items-center space-x-3 group text-[10px] text-text-slate/60 hover:text-linen font-mono tracking-[0.25em] uppercase cursor-pointer bg-transparent border-0 outline-none"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-linen/30 flex items-center justify-center transition-all bg-black/40">
            <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="hidden sm:inline">返回画廊 / RET DIRECTORY</span>
          <span className="sm:hidden">返回 / RET</span>
        </button>

        {/* Dynamic Chapter Status Indicator - High Quality */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="block w-2 h-2 rounded-full bg-accent-lavender shadow-[0_0_8px_#8C7CFF] animate-pulse" />
          <div className="font-mono text-[9px] text-accent-lavender tracking-[0.25em] uppercase">
            ACTIVE EXHIBITING // {activeSlideIndex === 0 ? "封面导引 : INTRO" : `第 ${activeSlideIndex} / 26 幅`}
          </div>
          <div className="font-mono text-[9px] text-[#ffffff20] tracking-widest hidden xl:block border-l border-white/10 pl-4">
            CORE: HONG QI Portfolio.2
          </div>
        </div>
      </div>

      {/* SENSORY PROGRESS FOOTER BAR - TACTILE GAUGE CALIBRATION SCALE */}
      <div
         ref={progressBarRef}
         onPointerDown={handlePointerDown}
         onPointerMove={handlePointerMove}
         onPointerUp={handlePointerUp}
         onPointerCancel={handlePointerUp}
         onPointerEnter={() => setIsHovered(true)}
         onPointerLeave={() => { if (!isDraggingProgress) setIsHovered(false); }}
         className="fixed bottom-3 left-6 md:left-[280px] right-6 md:right-11 z-40 h-10 flex items-center justify-center cursor-pointer touch-none select-none group"
         title="拖动或点击进度条跳转页面 / Drag or Click to jump"
      >
        {/* Transparent glassmorphism backing */}
        <div className="absolute inset-0 bg-[#070707]/60 backdrop-blur-md rounded-xs border border-white/[0.04] group-hover:bg-[#070707]/80 group-hover:border-white/[0.08] transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.8)]" />

        {/* Floating Scanner HUD Tooltip */}
        <AnimatePresence>
          {isHovered && hoverIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="absolute bottom-12 bg-black/95 border border-white/10 px-3 py-2 rounded-xs shadow-[0_30px_70px_rgba(0,0,0,0.98)] backdrop-blur-xl pointer-events-none select-none w-max max-w-[280px] xs:max-w-[340px] sm:max-w-[500px] flex flex-col space-y-1 z-50 font-mono text-left"
              style={{
                left: `${Math.max(10, Math.min(90, hoverPercentage * 100))}%`,
                transform: "translateX(-50%)"
              }}
            >
              <div className="text-[10px] text-accent-lavender font-bold tracking-wider">
                PAGE {(hoverIndex + 1).toString().padStart(2, '0')}
              </div>
              <div className="font-sans text-[12px] font-medium text-[#F5F5F2] tracking-wide truncate">
                {hoverIndex === 0 ? "小红书-市集穿搭体验提升" : SLIDES_DATA[hoverIndex - 1]?.title}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Absolute base timeline rules & visual tracks */}
        <div className="w-[calc(100%-32px)] h-[3px] bg-white/5 relative flex items-center rounded-full transition-all duration-300">

          {/* Static subtle tick marks representing 26 slide increments */}
          {Array.from({ length: 27 }).map((_, i) => {
            const isMajor = i % 3 === 0 || i === 26;
            const isActive = i <= activeSlideIndex;
            const isUnderHover = hoverIndex !== null && i === hoverIndex && isHovered;
            return (
              <div
                key={i}
                className="absolute transition-all duration-300 pointer-events-none"
                style={{
                  left: `${(i / 26) * 100}%`,
                  transform: "translateX(-50%)"
                }}
              >
                <div
                  className={`w-[1px] rounded-full transition-all duration-300 ${
                    isUnderHover
                      ? "h-4 bg-white shadow-[0_0_8px_#ffffff] z-10"
                      : isMajor
                        ? isActive ? "h-2.5 bg-accent-blue" : "h-2 bg-white/20"
                        : isActive ? "h-1.5 bg-accent-lavender/50" : "h-1 bg-white/5"
                  }`}
                />

                {/* Major ticks label readings */}
                {isMajor && (
                  <span
                    className={`absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[7px] tracking-normal transition-colors duration-300 ${
                      isActive ? "text-accent-blue/80 font-medium" : "text-[#ffffff15]"
                    }`}
                  >
                    {i.toString().padStart(2, '0')}
                  </span>
                )}
              </div>
            );
          })}

          {/* Active Progress Filler Line */}
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-lavender to-accent-blue rounded-full shadow-[0_0_12px_rgba(140,124,255,0.6)] cursor-pointer"
            animate={{ width: `${(activeSlideIndex / 26) * 100}%` }}
            transition={{ duration: isDraggingProgress ? 0 : 0.3, ease: "easeOut" }}
          />

          {/* Virtual dragging cursor line tracker */}
          {isHovered && hoverPercentage !== null && (
            <motion.div
              className="absolute top-[-4px] bottom-[-4px] w-[1px] bg-accent-lavender/60 cursor-pointer pointer-events-none"
              animate={{ left: `${hoverPercentage * 100}%` }}
              transition={{ duration: 0.05 }}
            />
          )}

          {/* Glowing Tactile handle thumb on the progress endpoint */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] border border-neutral-950 cursor-pointer pointer-events-none z-20"
            animate={{ left: `${(activeSlideIndex / 26) * 100}%` }}
            transition={{ duration: isDraggingProgress ? 0 : 0.3, ease: "easeOut" }}
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>
      </div>

      {/* THE SOVEREIGN HORIZONTAL TRACK */}
      <div
        ref={horizontalScrollRef}
        onScroll={handleScroll}
        className="w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory py-4 px-6 md:px-0 select-none z-10 scrollbar-none gap-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* SLIDE 00: IMMERSIVE COVER FRAME */}
        <div
          data-slide-index={0}
          className="w-[85vw] sm:w-[75vw] md:w-[65vw] max-w-[850px] shrink-0 snap-center flex flex-col justify-center relative select-none"
        >
          <div className="w-full aspect-video border border-white/10 p-1 bg-[#121212]/30 shadow-[0_30px_100px_rgba(0,0,0,0.85)] relative overflow-hidden flex items-center justify-center rounded-sm">
            <img
              src={resolveImagePath("/src/assets/images 2/75069789.webp")}
              alt="Kinetic Void Cover Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Elegant fading mask */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, #0A0A0A 0%, rgba(10, 10, 10, 0.45) 15%, rgba(10, 10, 10, 0) 35%)"
              }}
            />
          </div>
          <div className="mt-3 flex justify-between items-center font-mono text-[8px] text-[#ffffff20] px-1 uppercase tracking-widest leading-none">
            <span>COVER_FRAME.PNG</span>
            <span className="text-accent-lavender/40">EXHIBITION COVER</span>
          </div>
        </div>

        {/* SLIDES 01 TO 26: 16:9 IMAGE VISUAL CARDS */}
        {SLIDES_DATA.map((slide, index) => {
          const slideNum = slide.id;
          const currentImage = imageUrls[index];

          return (
            <div
              key={slide.id}
              data-slide-index={slideNum}
              className="w-[85vw] sm:w-[75vw] md:w-[65vw] max-w-[850px] shrink-0 snap-center flex flex-col justify-center relative select-none"
            >
              <div className="w-full aspect-video border border-white/10 p-1 bg-[#121212]/30 shadow-[0_30px_100px_rgba(0,0,0,0.85)] hover:border-accent-lavender/40 transition-all duration-700 relative overflow-hidden flex items-center justify-center rounded-sm group">
                {/* Image Frame Watermarks */}
                <span className="absolute top-2 left-2 font-mono text-[6.5px] sm:text-[7.5px] text-[#ffffff15] tracking-widest pointer-events-none">[ FRAME {slideNum} : X_GRID_SYS ]</span>
                <span className="absolute top-2 right-2 font-mono text-[6.5px] sm:text-[7.5px] text-accent-blue/20 tracking-normal pointer-events-none">LAT 35.6762° N // 2.04B</span>
                <span className="absolute bottom-2 left-2 font-mono text-[6.5px] sm:text-[7.5px] text-[#ffffff15] tracking-wide pointer-events-none font-light">REI SATO CURATORIAL PORTFOLIO</span>
                <span className="absolute bottom-2 right-2 font-mono text-[7px] sm:text-[8px] text-accent-lavender/30 tracking-widest pointer-events-none">HONG QI © 2026</span>

                {slide.title === "用户研究/访谈前准备" || slideNum === 5 ? (
                  <div className="w-full h-full overflow-y-auto relative scroll-smooth pointer-events-auto cursor-ns-resize inner-scroll-viewport" style={{ scrollbarWidth: 'thin' }}>
                    <img
                      src={resolveImagePath(currentImage)}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block brightness-[0.88] grayscale-[0.05] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    />
                    {/* Visual instruction overlay that fades on hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/85 backdrop-blur-md px-3.5 py-2.5 border border-white/10 rounded-sm pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500 flex flex-col items-center text-center shadow-xl">
                      <span className="font-mono text-[7.5px] tracking-[0.25em] text-accent-lavender mb-1.5 uppercase">[ DETAILED DESIGN SPECIFICATION ]</span>
                      <span className="font-sans text-[10px] text-[#F5F5F2] font-light">↕ 鼠标滚轮/拖动手势：可上下滑动查看完整内容</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={resolveImagePath(currentImage)}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] object-center brightness-[0.88] grayscale-[0.05] group-hover:grayscale-0 group-hover:brightness-100"
                  />
                )}

                {/* Ambient glow mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="mt-3 flex justify-between items-center font-mono text-[8px] text-[#ffffff20] px-1 uppercase tracking-widest leading-none">
                <span>REF_IDX_{slideNum.toString().padStart(2, '0')}.PNG</span>
                <span className="text-accent-blue/40 tracking-wider">{slide.sectionName}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MINIMIZED TEXT DESCRIPTION AT THE BOTTOM LEFT CORNER */}
      <div className="fixed bottom-12 left-6 md:left-[280px] max-w-[340px] sm:max-w-[420px] md:max-w-md z-30 pointer-events-none text-left">
        <AnimatePresence mode="wait">
          {activeSlideIndex === 0 && (
            <motion.div
              key="intro-desc-02"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-2 pointer-events-auto bg-black/40 backdrop-blur-md p-4 rounded-sm border border-white/5 shadow-2xl"
            >
              <span className="font-mono text-[8.5px] text-accent-blue tracking-[0.25em] uppercase block">
                PROJECT INITIATION //
              </span>

              <h3 className="text-sm sm:text-base font-light font-sans tracking-wide text-[#F5F5F2] uppercase leading-tight" id="project-02-title">
                小红书-市集穿搭体验提升
              </h3>

              <p className="text-[11px] text-text-slate/60 font-sans font-light leading-relaxed tracking-wide">
                通过设计优化小红书市集穿搭模块相关界面，优化穿搭模块消费体验，提高市集购买力，增强用户消费粘性，推动小红书市集电商发展。
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PREV / NEXT NAVIGATION TRIDENTS */}
      <div className="fixed bottom-12 right-6 md:right-12 z-30 flex items-center space-x-6 sm:space-x-8 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] bg-black/30 backdrop-blur-sm py-2 px-4 rounded-full border border-white/5">
        <button
          onClick={handlePrevSlide}
          disabled={activeSlideIndex === 0}
          className={`flex items-center space-x-1 px-1.5 py-1 transition-colors cursor-pointer bg-transparent border-0 outline-none uppercase ${
            activeSlideIndex === 0 ? "text-[#ffffff15] cursor-not-allowed" : "text-text-slate/60 hover:text-white"
          }`}
        >
          <span>← PREV</span>
        </button>
        <span className="text-[#ffffff15] pointer-events-none select-none">|</span>
        <button
          onClick={handleNextSlide}
          disabled={activeSlideIndex === 26}
          className={`flex items-center space-x-1 px-1.5 py-1 transition-colors cursor-pointer bg-transparent border-0 outline-none uppercase ${
            activeSlideIndex === 26 ? "text-[#ffffff15] cursor-not-allowed" : "text-white font-bold hover:text-accent-lavender"
          }`}
        >
          <span>NEXT →</span>
        </button>
      </div>

    </div>
  );
}
