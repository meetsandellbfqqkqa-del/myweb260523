import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Edit2,
  Check,
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

interface ProjectOneImmersiveProps {
  onBack: () => void;
  onNavigateToProject: (projectId: string) => void;
}

interface SlideContent {
  id: number; // 1 to 30
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

// 30 meticulously written slides covering:
// 1. Positioning & Goals (2 slides)
// 2. Current Insights (2 slides)
// 3. Process Optimization (11 slides)
// 4. Visual Updates (9 slides)
// 5. Other Projects (6 slides)
const SLIDES_DATA: SlideContent[] = [
  // SECTION 1: 产品定位与设计目标 (Page 1-2)
  {
    id: 1,
    sectionIndex: 1,
    sectionName: "产品定位与设计目标",
    sectionSub: "SECTION 01 // POSITIONING & TARGETS",
    title: "产品定位",
    titleEng: "Ambient Digital Presence: Redefining Human-Space Void",
    summary: "摆脱传统高亮度、高饱和屏幕对注意力的强行索取。以环境气候、气流波动和环境声学谱系，将不可见的复杂比特信息转化为实体空间内的诗意呼吸。",
    summaryEng: "Emancipate attention from high-luminance active pixels. Leverage spatial wind, thermal drift, and ambient haptics to translate silent data bytes into a respiratory architectural environment.",
    defaultImage: "/src/assets/images1/产品定位.webp",
    metrics: "Ambient Scale: 1:1 Physical",
    coordinates: "DEC.26 // POS.01"
  },
  {
    id: 2,
    sectionIndex: 1,
    sectionName: "产品定位与设计目标",
    sectionSub: "SECTION 01 // POSITIONING & TARGETS",
    title: "券裂变设计业务背景",
    titleEng: "Cognitive Silence & Decompression: Temporal Buffer Tracks",
    summary: "在触控惯性、手势流向中注入自然黏性阻尼。我们深信「留白是极致的奢华」，设计并非填满空间，而是通过深思熟虑的微调频律，恢复使用者在数字环境中的心流稳态。",
    summaryEng: "Inject micro-frictional viscosity into scroll speeds and motion trails. Designing silent time buffers returns the observer to a meditative homeostatic focus, validating the luxury of space.",
    defaultImage: "/src/assets/images1/业务背景.webp",
    metrics: "Refraction Index: 1.442",
    coordinates: "DEC.26 // POS.02"
  },

  // SECTION 2: 现状洞察 (Page 3-4)
  {
    id: 3,
    sectionIndex: 2,
    sectionName: "现状洞察",
    sectionSub: "SECTION 02 // CONTEXTUAL INSIGHTS",
    title: "设计目标与解决措施",
    titleEng: "Insight I: The Gridded Pixel Cage & Metric Overload",
    summary: "当下数字终端被繁杂的通知红点、生硬的直角矩形卡片与冰冷的信息图表所吞噬。产品过于追求显性转化，导致用户的空间本能与生理感知严重萎缩。",
    summaryEng: "Present-day viewports are overwhelmed by solid cards, intense metric labels, and constant alerts. Interface overload has severed our somatic relationship with the environment.",
    defaultImage: "/src/assets/images1/设计目标与解决措施.webp",
    metrics: "Attention Drift: +74%",
    coordinates: "DEC.26 // INS.01"
  },
  {
    id: 4,
    sectionIndex: 2,
    sectionName: "现状洞察",
    sectionSub: "SECTION 02 // CONTEXTUAL INSIGHTS",
    title: "现状洞察一",
    titleEng: "Insight II: Somatic Haptic Deprivation",
    summary: "在全玻璃屏幕的触控演练中，所有的按压皆被拉平为绝对光滑，冷冰冰的光子缺乏环境漫反射、微粒重力模拟、阻尼对抗以及物理空间的呼吸温度同步。",
    summaryEng: "Beneath glass plates, tactile feedback is flattened into absolute smoothness. Photons lack physical material shadows, kinetic gravity modeling, and organic haptic resonances.",
    defaultImage: "/src/assets/images1/现状洞察1.webp",
    metrics: "Tactile Index: 0.00 / Flat",
    coordinates: "DEC.26 // INS.02"
  },

  // SECTION 3: 举措一 - 流程优化 (Page 5-15) - 11 Pages
  {
    id: 5,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "现状洞察二",
    titleEng: "Step 01: Physical Touchpoint Topology Mapping",
    summary: "首先测量和量化用户置身于大型交互空间中的生理游移轨迹。利用激光深度雷达和生物网格定位，构建无感触点地图，将离散步骤拉平为连贯的自由流。",
    summaryEng: "Map somatic coordinates in physical space using LiDAR clusters and biometric grids. Turn disparate physical steps into single, continuous, unfettered walkpaths.",
    defaultImage: "/src/assets/images1/现状洞察2.webp",
    metrics: "LiDAR Resolution: 120Hz",
    coordinates: "FLOW.OPT // STP.01"
  },
  {
    id: 6,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "举措一：线性流程&游戏化",
    titleEng: "Step 02: Fluid Viscosity Momentum Interpolation",
    summary: "为了削弱极速滑动造成的视觉闪烁与焦虑，计算出顺滑至极的WebGL动量衰减和液体惯性方程。哪怕是一次剧烈的划动，页面亦能如同在橄榄油般缓缓化开。",
    summaryEng: "To banish high-frequency scrolling vibrations, we coded web momentum curves resembling organic oil viscosities. Taps glide and decelerate with absolute tactile weight.",
    defaultImage: "/src/assets/images1/措施一 流程优化.webp",
    metrics: "Damping coefficient: 0.82",
    coordinates: "FLOW.OPT // STP.02"
  },
  {
    id: 7,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "明确优化点",
    titleEng: "Step 03: Emotional Curve Modulation & Micro-Sabbatical",
    summary: "反对一味追求极速响应。我们在交互流向的关键转折处故意植入高达600ms的“留白黑场”作为精神缓冲，提供呼吸缓冲时段以帮助大脑清空冗余干扰。",
    summaryEng: "We reject relentless acceleration. In transitional steps, we intentionally embed elegant 600ms silent transitions to foster cognitive reset and mindful decompression.",
    defaultImage: "/src/assets/images1/明确优化点.webp",
    metrics: "Buffer window: 600ms",
    coordinates: "FLOW.OPT // STP.03"
  },
  {
    id: 8,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "搜索竞品对比",
    titleEng: "Step 04: Ambient Bio-Resonance Control Loop",
    summary: "摒弃传统的滑块与触控按钮。传感器自动探测观众靠近的速度与呼吸频率，隐性调整投影粒子的发散面积与画幅高宽比，使空间宛若用户的生命延伸物。",
    summaryEng: "Discard explicit sliders. Non-intrusive cameras detect proximity speed and respiratory pacing to morph canvas scale and particle counts, aligning the art with bodily rhythm.",
    defaultImage: "/src/assets/images1/竞品分析对比.webp",
    metrics: "Sync Rate: 0.08s latency",
    coordinates: "FLOW.OPT // STP.04"
  },
  {
    id: 9,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "交互方案推敲",
    titleEng: "Step 05: Removing 74% Redundant Interface Demands",
    summary: "极致梳理功能支流。将繁琐的多页面表单归并为基于重力悬停时间确认的“无点击单线程推进流程”，眼到之处即是所得，极大地降低用户的视觉摩擦。",
    summaryEng: "Eliminate multiple click thresholds. Replace traditional clicks with gravity hover dwell triggers, establishing immediate visual intention alignment with zero extra screens.",
    defaultImage: "/src/assets/images1/交互方案推敲-活动主页.webp",
    metrics: "Dwell confirmation: 1.2s",
    coordinates: "FLOW.OPT // STP.05"
  },
  {
    id: 10,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "最终方案输出",
    titleEng: "Step 06: Seamless Physical-to-Digital Routing Sequence",
    summary: "设计统一的任务调度状态机。当用户步行穿过主展区时，网页控制面板自动将多媒体序列静默投递至离他最近的16:9展壁，形成贯通的多维度交互链条。",
    summaryEng: "A state machine handles ambient handovers. As an observer steps near a concrete wall segment, the digital app pushes content to the nearest physical panel dynamically.",
    defaultImage: "src/assets/images1/交互流程.webp",
    metrics: "Mapping Acc: ±2.4 cm",
    coordinates: "FLOW.OPT // STP.06"
  },
  {
    id: 11,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "如何刺激用户参与？",
    titleEng: "Step 07: High-Precision Threshold Calibration",
    summary: "严密过滤各种环境物理噪音与无意晃动。引入了定制的压感微分算法，只有当持续的、轻柔但指向明确的意愿按压发生时，流程才会执行不可逆的跃迁。",
    summaryEng: "Filter physical disturbances and accidental sway via differential tap filters. The system only triggers state transitions under intentional, deliberate tactile weighting.",
    defaultImage: "/src/assets/images1/Slide 16_9 - 144.webp",
    metrics: "Trigger Force: 0.12 N",
    coordinates: "FLOW.OPT // STP.07"
  },
  {
    id: 12,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "用户如何完成活动？",
    titleEng: "Step 08: Sensory Sync Latency Tuning Under 100ms",
    summary: "保证大面积高刷屏幕在人眼余光运动时不产生任何眩晕。优化WebGL渲染管线、解耦传感器消息队列，使帧率锁定在恒定的90FPS，刷新瞬时感知记录。",
    summaryEng: "To offset periphery tracking disorientation, we micro-optimized WebGL threads. Decoupled controller messaging delivers solid 90FPS outputs below 100ms lag thresholds.",
    defaultImage: "src/assets/images1/用户如何完成活动？.webp",
    metrics: "Median Delay: 84ms",
    coordinates: "FLOW.OPT // STP.08"
  },
  {
    id: 13,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "如何在中途留住用户？",
    titleEng: "Step 09: Audio-Haptic Substitution & High Accessibility",
    summary: "特别针对听障或视觉障人群重构了信息交互链。全流程高度兼容骨传导轻微波动以及3D定向声学导流，无需观察，即可凭触手可及的声影轮廓信步漫游。",
    summaryEng: "We tailored spatial flows for visually or aurally restricted observers. Directional 3D audioscapes and subtle skin-conductive vibrations guide locomotion.",
    defaultImage: "/src/assets/images1/交互方案推敲-裂变中途激励.webp",
    metrics: "Haptic Grid: 8x8 matrix",
    coordinates: "FLOW.OPT // STP.09"
  },
  {
    id: 14,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "如何让用户使用裂变奖励形成闭环？",
    titleEng: "Step 10: Fail-Safe Silent Offline Reconstruction",
    summary: "当展厅网络出现偶发延迟或短时断开时，系统绝对不弹出任何刺眼的异常断网报错。页面以淡雅的灰色素描轮廓渐进式维持，并在暗中静默唤醒重试恢复。",
    summaryEng: "In moments of local signal loss, the screen avoids clinical error codes. It degrades into an elegant grayscale blueprint frame, silently attempting reconnection in back.",
    defaultImage: "/src/assets/images1/交互方案推敲-奖励领取闭环（券确认 + 核销转化）.webp",
    metrics: "Heartbeat check: 5s",
    coordinates: "FLOW.OPT // STP.10"
  },
  {
    id: 15,
    sectionIndex: 3,
    sectionName: "举措一：流程优化",
    sectionSub: "SECTION 03 // ACTION I — FLOW OPTIMIZATION",
    title: "页面组件复用",
    titleEng: "Step 11: Ephemeral Memory Archival & Personal Token",
    summary: "根据用户现场的微小眼神停留和行走深度，由算法实时编织出一款专属的、排版精细的极简高分辨率海报，通过柔性墨水屏或手机实现无损导出下载。",
    summaryEng: "At departure, fine-tuned graphics engines render a personalized generative raster art piece mapping actual dwell spots, available for native local download.",
    defaultImage: "src/assets/images1/页面组件复用.webp",
    metrics: "Export format: Raw PDF",
    coordinates: "FLOW.OPT // STP.11"
  },

  // SECTION 4: 举措二 - 视觉更新 (Page 16-24) - 9 Pages
  {
    id: 16,
    sectionIndex: 4,
    sectionName: "举措二：视觉更新",
    sectionSub: "SECTION 04 // ACTION II — VISUAL UPDATE",
    title: "场景延展-学生获客",
    titleEng: "Visual 01: Chromatic Harmony (Obsidian Black & Soft Aura)",
    summary: "整场UI界面将耀眼的白噪点降到最低，采用反光率为%0的极深炭黑为底色，界面宛如深夜美术馆的黑色墙壁，仅在功能微粒四周渗出暖金呼吸气流。",
    summaryEng: "Minimize high-frequency display glare. An infinite matte black workspace forms the stage, with primary micro-interface cells emitting elegant, amber backglow emissions.",
    defaultImage: "/src/assets/images1/场景延展-学生获客.webp",
    metrics: "Black level: 0.003 nits",
    coordinates: "VIS.UPD // STP.01"
  },
  {
    id: 17,
    sectionIndex: 4,
    sectionName: "举措二：视觉更新",
    sectionSub: "SECTION 04 // ACTION II — VISUAL UPDATE",
    title: "举措二：视觉更新",
    titleEng: "Visual 02: Elite Micro-Typography & Negative Space Tension",
    summary: "大量限制粗体与硕大字号，改用精雕细刻的9pt及10pt JetBrains Mono。在排版中保留了大量的空旷白区域，每一行文字与刻度皆是对虚空深切的致敬。",
    summaryEng: "Prohibit excessive bolding. Retain high-end negative fields relying strictly on 9pt to 10pt crisp JetBrains Mono. Large blank environments elevate reading focus.",
    defaultImage: "src/assets/images1/措施二 更新视觉.webp",
    metrics: "Typography scale: 9pt / 10pt",
    coordinates: "VIS.UPD // STP.02"
  },
  {
    id: 18,
    sectionIndex: 4,
    sectionName: "举措二：视觉更新",
    sectionSub: "SECTION 04 // ACTION II — VISUAL UPDATE",
    title: "方案构思",
    titleEng: "Visual 03: Generative Computational Fluid Sand",
    summary: "丢弃刻板扁平拟物块。所有空间信息或展馆节点状态皆采用无数枚自组装、具有重力学阻尼的虚拟沙盘微粒构成，随视线游走而缓慢舒展或塌陷。",
    summaryEng: "Shed bulky cards. Use multi-layered reactive vectors resembling programmatic fluid particulates, slowly organizing or fracturing responding to simulated drafts.",
    defaultImage: "src/assets/images1/项目拆解.webp",
    metrics: "Particle simulation: 4,500/fps",
    coordinates: "VIS.UPD // STP.03"
  },
  {
    id: 19,
    sectionIndex: 4,
    sectionName: "举措二：视觉更新",
    sectionSub: "SECTION 04 // ACTION II — VISUAL UPDATE",
    title: "风格探索",
    titleEng: "Visual 04: Five-Tier Fluid Parallax Matrix",
    summary: "页面引入了多达5层滑动落差：前景浮尘、焦平面16:9卡片框、单像素骨架背景以及极淡背光层各自具有独特的拖拽常数，产生厚重且自然的实体阻尼感。",
    summaryEng: "Introduce depth with five non-linear parallax intervals. Floating specks, active showcase windows, and dark layout grid structures slide in an exquisite syncopated tempo.",
    defaultImage: "/src/assets/images1/场景延展-学生获客-1.webp",
    metrics: "Depth scale: 5 independent layers",
    coordinates: "VIS.UPD // STP.04"
  },
  {
    id: 20,
    sectionIndex: 4,
    sectionName: "举措二：视觉更新",
    sectionSub: "SECTION 04 // ACTION II — VISUAL UPDATE",
    title: "方案推敲过程",
    titleEng: "Visual 05: Raw Brutalist Textures Meets Ethereal Laser",
    summary: "在视觉中心运用了高硬度的现浇混凝土柱体、冰冷的大理石岩板质感，与其抗衡的是极具数字化科技感的0.5像素冷蓝激光定位线，表达冷峻的工业和未来感。",
    summaryEng: "Juxtapose dense raw concrete fragments with highly energetic 0.5px cyan lines, delivering a stark contrast between classical physical mass and hyper-modern telemetry.",
    defaultImage: "src/assets/images1/方案推敲过程.webp",
    metrics: "Material scale: 12k photographic mapping",
    coordinates: "VIS.UPD // STP.05"
  },
  {
    id: 21,
    sectionIndex: 4,
    sectionName: "举措二：视觉更新",
    sectionSub: "SECTION 04 // ACTION II — VISUAL UPDATE",
    title: "形",
    titleEng: "Visual 06: Framed 16:9 Cinematic Viewports & Alignment Ticks",
    summary: "所有30张关键作品画面皆被精心装裱在长方形16:9硬质黑框内。每一幅画幅四周被刻有像素刻度。让观众如临其境，犹如在黑暗放映厅中审视宽银幕。",
    summaryEng: "Embed all critical visuals within precise, high-contrast 16:9 canvas grids. Surrounded by miniature pixel alignment markings, it transforms a standard interface. ",
    defaultImage: "src/assets/images1/形.webp",
    metrics: "Viewport aspect ratio: 1.777 (16:9)",
    coordinates: "VIS.UPD // STP.06"
  },
  {
    id: 22,
    sectionIndex: 4,
    sectionName: "举措二：视觉更新",
    sectionSub: "SECTION 04 // ACTION II — VISUAL UPDATE",
    title: "字",
    titleEng: "Visual 07: Single-Pixel Precision Wireframe Skeleton",
    summary: "不再使用厚重的重灰色背景或发光阴影色块。所有的卡片均由极细的、白粉微明线的线条对齐拼贴而成。这不仅减少了视觉渲染负担，更展示了高级的工艺感。",
    summaryEng: "Do not resort to bulky cards or dark drop shadows. Structural compartments are separated exclusively by minimal 0.5px white-and-gray alignment border skeletons.",
    defaultImage: "src/assets/images1/字.webp",
    metrics: "Line weight: 0.5px hairline",
    coordinates: "VIS.UPD // STP.07"
  },
  {
    id: 23,
    sectionIndex: 4,
    sectionName: "举措二：视觉更新",
    sectionSub: "SECTION 04 // ACTION II — VISUAL UPDATE",
    title: "质",
    titleEng: "Visual 08: Floating Shadows & Extremely Wide Depth Blur",
    summary: "针对漂浮的16:9设计图卡片，将阴影的高斯模糊扩展至惊人的120像素。超宽径向退化，使之悬于暗夜犹如夜空中被月影衬托的多维建筑，立体感拉满。",
    summaryEng: "For floated design mockups, we projected shadows using 120px Gaussian blur. The diffuse decay isolates visual levels gracefully in dark space.",
    defaultImage: "src/assets/images1/质-4.webp",
    metrics: "Shadow softness: 120px spread radius",
    coordinates: "VIS.UPD // STP.08"
  },
  {
    id: 24,
    sectionIndex: 4,
    sectionName: "举措二：视觉更新",
    sectionSub: "SECTION 04 // ACTION II — VISUAL UPDATE",
    title: "上线后数据复盘与优化方向",
    titleEng: "Visual 09: Global Ambient Light Feedback Mapping",
    summary: "大卡片中色彩突变时，底层的黑色画布会悄悄渲染出极其暗淡的同色调晕影，精确模拟“手机在漆黑被窝内亮起时照亮四周”的物理溢出体验，带来绝对真实感。",
    summaryEng: "As colorful visual frames evolve, background canvases slowly emit pale, matching chromatic glows, simulating authentic environmental light spill over real interior gallery walls.",
    defaultImage: "/src/assets/images1/上线后数据复盘与优化方向.webp",
    metrics: "Luminance spill ratio: 0.12",
    coordinates: "VIS.UPD // STP.09"
  },

  // SECTION 5: 其他实习项目 (Page 25-30) - 6 Pages
  {
    id: 25,
    sectionIndex: 5,
    sectionName: "其他实习项目",
    sectionSub: "SECTION 05 // INDEPENDENT INTERNSHIPS",
    title: "其他实习项目",
    titleEng: "Internship I: Chrono-Aesthetics & Ephemeral Time-Tracker",
    summary: "在东京知名媒体工作室实习期间，为新奢腕表品牌开发了三维时间粒子轨迹系统。时分秒不再是尖锐的指针，而是如细沙般漫舞的分形弧带。",
    summaryEng: "During an internship at a Tokyo studio, we engineered a 3D hourglass particle canvas for luxury timepiece brands. Hours and minutes dissolve like loose silicon sand.",
    defaultImage: "src/assets/images1/实习其他项目.webp",
    metrics: "Platform: Three.js / WebGL",
    coordinates: "INT.PRJ // EXH.01"
  },
  {
    id: 26,
    sectionIndex: 5,
    sectionName: "其他实习项目",
    sectionSub: "SECTION 05 // INDEPENDENT INTERNSHIPS",
    title: "我在实习期，上手任务从简单到复杂",
    titleEng: "Internship II: Hyper-Haptics High-End In-Car Dashboard",
    summary: "为豪华跑车智能座舱方案升级。摒弃了刺眼的日光蓝偏好，采用超低流明感的高对比夜宿线条，辅以特定手势深度回馈，消除了行驶操控视觉失焦。",
    summaryEng: "Upgraded user configurations for luxury EV sports cars. Low-lumen interfaces with high aesthetic contrast ensure safety while prioritizing minimalist touch sensations.",
    defaultImage: "/src/assets/images1/产品定位-1.webp",
    metrics: "Lumen count: <15 nits",
    coordinates: "INT.PRJ // EXH.02"
  },
  {
    id: 27,
    sectionIndex: 5,
    sectionName: "其他实习项目",
    sectionSub: "SECTION 05 // INDEPENDENT INTERNSHIPS",
    title: "灵动岛场景能力拓展",
    titleEng: "Internship III: Monolithic Stone Raw Material Digital Curation",
    summary: "为高端画廊建立石材和粗野主义水泥的高解纹理数据库。12K级微观法向贴图，在屏幕中生动反映了不同季节光照在质朴表面的温存与投影移动。",
    summaryEng: "Architected a materials library tracking the raw structural values of natural marbles and granites under evolving solar paths. It preserves the weight of mineral elements.",
    defaultImage: "src/assets/images1/灵动岛.webp",
    metrics: "Texture Resolution: 12000px",
    coordinates: "INT.PRJ // EXH.03"
  },
  {
    id: 28,
    sectionIndex: 5,
    sectionName: "其他实习项目",
    sectionSub: "SECTION 05 // INDEPENDENT INTERNSHIPS",
    title: "花小猪IP积累与延展",
    titleEng: "Internship IV: Phonetic Frequency Adaptive Layout System",
    summary: "根据麦克风环境分贝值，字体字宽、字重实时以弹性力学运动方程式发生膨胀和缩微，从而使字符能够像自然界声波一样发出肉眼可见的物理律动。",
    summaryEng: "Voice wave decibels interact directly with standard type skeletons. Font families expand and retract via spring mechanics to visually embody spoken patterns.",
    defaultImage: "src/assets/images1/花小猪IP积累.webp",
    metrics: "Frequency Range: 20-20k Hz",
    coordinates: "INT.PRJ // EXH.04"
  },
  {
    id: 29,
    sectionIndex: 5,
    sectionName: "其他实习项目",
    sectionSub: "SECTION 05 // INDEPENDENT INTERNSHIPS",
    title: "其他视觉项目",
    titleEng: "Internship V: Blank Out Aesthetic Extension for Mindful Browsing",
    summary: "设计的一款实验性脚本：自动将网站中闪烁、刺目的横幅广告、过度鲜艳的颜色，自动解析剥离，并全部置换为具有完美比例的极简无垠留白空域。",
    summaryEng: "A Chrome-extension prototype designed to parse noisy web grids, actively filtering busy ads or banner blocks and restoring quiet spaces based on golden ratio grids.",
    defaultImage: "src/assets/images1/其他视觉项目-2.webp",
    metrics: "Attention recovery rate: 92.4%",
    coordinates: "INT.PRJ // EXH.05"
  },
  {
    id: 30,
    sectionIndex: 5,
    sectionName: "其他实习项目",
    sectionSub: "SECTION 05 // INDEPENDENT INTERNSHIPS",
    title: "设计沉淀",
    titleEng: "Internship VI: Multi-Sensory Symphony of Ancient Ceramics",
    summary: "在东京新媒体学院联合期间，将出土千年的硬陶质地与粗糙参数输入转化器，合成深沉、宏大的低沉重力声场，实现了用听觉“触摸”泥土质地的梦幻交错。",
    summaryEng: "Digitized archeological pottery values to map spatial soundscapes, translating ancient coarse vessel topologies into atmospheric low-end synth echoes.",
    defaultImage: "src/assets/images1/设计沉淀.webp",
    metrics: "Somatic focus level: 18.2 mins",
    coordinates: "INT.PRJ // EXH.06"
  }
];

export default function ProjectOneImmersive({
  onBack,
  onNavigateToProject
}: ProjectOneImmersiveProps) {
  // 1. Static images array from default slides data
  const imageUrls = SLIDES_DATA.map(s => s.defaultImage);

  // Track the current active slide on screen via scroll monitoring or clicks
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0); // 0 is Cover, 1-30 are content slides

  // Safe reference monitoring for scrolling interaction
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverPercentage, setHoverPercentage] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Helper to extract granular interaction values from pointer events
  const getProgressSpecs = (clientX: number) => {
    if (!progressBarRef.current) return { percentage: 0, index: 0 };
    const rect = progressBarRef.current.getBoundingClientRect();
    const width = rect.width || 1;
    const left = rect.left;
    const relativeX = clientX - left;
    let percentage = relativeX / width;
    percentage = Math.max(0, Math.min(1, percentage));
    const targetIndex = Math.round(percentage * 30);
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

    if (bestIndex !== activeSlideIndex && bestIndex >= 0 && bestIndex <= 30) {
      setActiveSlideIndex(bestIndex);
    }
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      scrollToSlide(activeSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < 30) {
      scrollToSlide(activeSlideIndex + 1);
    }
  };

  // Define section grouping coordinates
  const sections = [
    { name: "首屏封面", sub: "COVER", idRange: [0, 0] },
    { name: "产品定位与目标的解读", sub: "TARGETS & GOALS", idRange: [1, 2] },
    { name: "现状洞察的重构与解析", sub: "INSIGHTS", idRange: [3, 4] },
    { name: "举措一：流程优化的核心探讨", sub: "FLOW (11P)", idRange: [5, 15] },
    { name: "举措二：视觉更新的小字美学", sub: "VISUAL (9P)", idRange: [16, 24] },
    { name: "其他实习项目的多维拼贴", sub: "INTERNS (6P)", idRange: [25, 30] }
  ];

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
            ACTIVE EXHIBITING // {activeSlideIndex === 0 ? "封面导引 : INTRO" : `第 ${activeSlideIndex} / 30 幅`}
          </div>
          <div className="font-mono text-[9px] text-[#ffffff20] tracking-widest hidden xl:block border-l border-white/10 pl-4">
            CORE: HONG QI Portfolio.1
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
              className="absolute bottom-12 bg-black/95 border border-white/15 px-3 py-2 rounded-xs shadow-[0_30px_70px_rgba(0,0,0,0.98)] backdrop-blur-xl pointer-events-none select-none w-max max-w-[280px] xs:max-w-[340px] sm:max-w-[500px] flex flex-col space-y-1 z-50 font-mono text-left"
              style={{
                left: `${Math.max(10, Math.min(90, hoverPercentage * 100))}%`,
                transform: "translateX(-50%)"
              }}
            >
              <div className="text-[10px] text-accent-lavender font-bold tracking-wider">
                PAGE {(hoverIndex + 1).toString().padStart(2, '0')}
              </div>
              <div className="font-sans text-[12px] font-medium text-[#F5F5F2] tracking-wide truncate">
                {hoverIndex === 0 ? "滴滴出行-产品设计岗位实习总结" : SLIDES_DATA[hoverIndex - 1]?.title}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Absolute base timeline rules & visual tracks */}
        <div className="w-[calc(100%-32px)] h-[3px] bg-white/5 relative flex items-center rounded-full transition-all duration-300">

          {/* Static subtle tick marks representing 30 slide increments */}
          {Array.from({ length: 31 }).map((_, i) => {
            const isMajor = i % 5 === 0;
            const isActive = i <= activeSlideIndex;
            const isUnderHover = hoverIndex !== null && i === hoverIndex && isHovered;
            return (
              <div
                key={i}
                className="absolute transition-all duration-300 pointer-events-none"
                style={{
                  left: `${(i / 30) * 100}%`,
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
            animate={{ width: `${(activeSlideIndex / 30) * 100}%` }}
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
            animate={{ left: `${(activeSlideIndex / 30) * 100}%` }}
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
              src={resolveImagePath("/src/assets/images1/首页.webp")}
              alt="Ethereal Cover Layout Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Elegant fading mask: Black at absolute bottom, transparent for the vast majority */}
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

        {/* SLIDES 01 TO 30: PROJECT IMAGE VISUAL CARDS */}
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
                {/* Image Frame Watermarks representing digital art cataloging */}
                <span className="absolute top-2 left-2 font-mono text-[6.5px] sm:text-[7.5px] text-[#ffffff15] tracking-widest pointer-events-none">[ FRAME {slideNum} : X_GRID_SYS ]</span>
                <span className="absolute top-2 right-2 font-mono text-[6.5px] sm:text-[7.5px] text-accent-blue/20 tracking-normal pointer-events-none">LAT 35.6762° N // 1.77A</span>
                <span className="absolute bottom-2 left-2 font-mono text-[6.5px] sm:text-[7.5px] text-[#ffffff15] tracking-wide pointer-events-none font-light">REI SATO CURATORIAL PORTFOLIO</span>
                <span className="absolute bottom-2 right-2 font-mono text-[7px] sm:text-[8px] text-accent-lavender/30 tracking-widest pointer-events-none">HONG QI © 2026</span>

                {slideNum === 10 || slideNum === 13 || slideNum === 28 ? (
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
              key="intro-desc"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-2 pointer-events-auto bg-black/40 backdrop-blur-md p-4 rounded-sm border border-white/5 shadow-2xl"
            >
              <span className="font-mono text-[8.5px] text-accent-blue tracking-[0.25em] uppercase block">
                PROJECT INITIATION //
              </span>

              <h3 className="text-sm sm:text-base font-light font-sans tracking-wide text-[#F5F5F2] uppercase leading-tight">
                滴滴出行-产品设计岗位实习总结
              </h3>

              <p className="text-[11px] text-text-slate/60 font-sans font-light leading-relaxed tracking-wide">
                整个券裂变活动以「好友助力得打车券 / 免单券」核心抓手，全程通过阶梯式激励、即时反馈降低用户行动门槛，同时实现拉新、促活、消费转化的多重目标。
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
          disabled={activeSlideIndex === 30}
          className={`flex items-center space-x-1 px-1.5 py-1 transition-colors cursor-pointer bg-transparent border-0 outline-none uppercase ${
            activeSlideIndex === 30 ? "text-[#ffffff15] cursor-not-allowed" : "text-white font-bold hover:text-accent-lavender"
          }`}
        >
          <span>NEXT →</span>
        </button>
      </div>

    </div>
  );
}
