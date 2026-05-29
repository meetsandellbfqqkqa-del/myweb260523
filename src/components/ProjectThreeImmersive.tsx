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

interface ProjectThreeImmersiveProps {
  onBack: () => void;
  onNavigateToProject: (projectId: string) => void;
}

interface SlideContent {
  id: number; // 1 to 9
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

// 9 meticulously written luxury slides covering the Tokyo Silence photography thesis
const SLIDES_DATA: SlideContent[] = [
  {
    id: 1,
    sectionIndex: 1,
    sectionName: "间之序章",
    sectionSub: "SECTION 01 // SPATIAL INTERVAL & PREFACE",
    title: "方案构思1",
    titleEng: "Atmosphere of Ma: Suspending the Gaze in the Gaps",
    summary: "日本美学中的“间”（Ma）既不是纯粹的虚空，也不是实体的堆砌，而是事物与事物之间留存的灵性距离。在这里，我们引导用户的视线在无常的留白中自主呼吸。",
    summaryEng: "The philosophy of Ma celebrates the invisible thresholds that define objects. We orchestrate digital pauses to invite the observer into a serene, meditative reading state.",
    defaultImage: "/src/assets/images 3/regenerated_image_1779693479885.webp",
    metrics: "Ma-Interval: 1.618 Golden Ratio",
    coordinates: "MA.SLNC // PRF.01"
  },
  {
    id: 2,
    sectionIndex: 1,
    sectionName: "方案构思2",
    sectionSub: "SECTION 01 // SPATIAL INTERVAL & PREFACE",
    title: "方案构思2",
    titleEng: "Monochrome Latency: Under-saturated Tonalities of the Void",
    summary: "拒绝喧嚣的高对比数字直射，利用中性微光摄影底图，在屏幕中还原如细腻陶土般的漫反射暗影，在明与暗消长的那条线上，摸索微波粼粼的静寂感知。",
    summaryEng: "Bypassing intense digital screen illumination, we craft under-saturated lightscapes that preserve the soft granular nature of night air and plaster surfaces.",
    defaultImage: "/src/assets/images 3/regenerated_image_1779728042054.webp",
    metrics: "Luminance Easing: Midtone Falloff",
    coordinates: "MA.SLNC // PRF.02"
  },
  {
    id: 3,
    sectionIndex: 2,
    sectionName: "风格探索",
    sectionSub: "SECTION 02 // METROPOLITAN NOCTURNAL SHADOWS",
    title: "风格探索",
    titleEng: "Nameless Corridors: Deep Narrow Paths Behind Shinjuku",
    summary: "远离繁华喧嚣的涉谷，我们在新宿老建筑之间的窄巷中，用镜头收集仅存的黑白质重。高耸外墙形成狭长的阴影，将现实世界的多余噪音完美吸附。",
    summaryEng: "Slipping behind towering Shinjuku glass monoliths, we capture quiet alley crevices. Lofty concrete walls cast deep vertical shadows, acting as psychological sound traps.",
    defaultImage: "/src/assets/images 3/regenerated_image_1779725475567.webp",
    metrics: "Visual Noise Bias: -12.4dB",
    coordinates: "MA.SLNC // SHD.01"
  },
  {
    id: 4,
    sectionIndex: 2,
    sectionName: "都市暗影",
    sectionSub: "SECTION 02 // METROPOLITAN NOCTURNAL SHADOWS",
    title: "Ai 元素生成",
    titleEng: "Architectural Tonalities: Gypsum Retraction Under Moonpaths",
    summary: "探讨物体的边缘是如何在黑夜中与暗空消融在一起的。没有多余的人造锐化，光晕在湿滑的大理石表面上，划出一道沉静、渐变的漫步视界。",
    summaryEng: "Investigate how raw building profiles dissolve gently into empty night backdrops. Shadows glide across clean, wet facades, forming a canvas of quiet transitions.",
    defaultImage: "/src/assets/images 3/Ai 元素生成.webp",
    metrics: "Shadow Falloff: Natural Gaussian",
    coordinates: "MA.SLNC // SHD.02"
  },
  {
    id: 5,
    sectionIndex: 3,
    sectionName: "寂静日常",
    sectionSub: "SECTION 03 // MEDITATIVE DAILY INTERSTICES",
    title: "首页设计",
    titleEng: "Transit Abyss: Mind Wander on the Last Yamanote Train",
    summary: "深夜11点的车厢，被磨损的皮质拉手、泛黄的窗框与远方渐隐的站台拉成一条长长的寂静通道。窗外的极速流光退化，仅有时间自身的轻轻低震。",
    summaryEng: "Late-night cabins stretch into perspective tubes of silence. Fleeting neon lights outside turn into soft abstract tracers, leaving passengers inside their private realms.",
    defaultImage: "src/assets/images 3/首页设计.webp",
    metrics: "Vibration Index: Constant low-end Hz",
    coordinates: "MA.SLNC // DYL.01"
  },
  {
    id: 6,
    sectionIndex: 3,
    sectionName: "寂静日常",
    sectionSub: "SECTION 03 // MEDITATIVE DAILY INTERSTICES",
    title: "内容页设计1",
    titleEng: "Solitary Beacon: Warm Luminous Cones Over Midnight T-Junctions",
    summary: "东京郊区的小巷交叉点，一盏橙色钠灯下，潮湿的水汽在半空中慢速舞动。整个视口被光与暗对称拉切，将寂静物质化，如同深海中等待的呼吸气孔。",
    summaryEng: "A single sodium vapor lamp projects warm orange cones over asphalt. Hovering ambient mists materialize the quiet air, acting as a sensory lung of the neighborhood.",
    defaultImage: "src/assets/images 3/内容页1.webp",
    metrics: "Color Temp: 2200K Sodium Glow",
    coordinates: "MA.SLNC // DYL.02"
  },
  {
    id: 7,
    sectionIndex: 4,
    sectionName: "天候留白",
    sectionSub: "SECTION 04 // CLIMATIC METAPHOR & NOISE-FILTERS",
    title: "内容页设计2",
    titleEng: "Hydromorphic Grains: Acoustic Absorption of wet Asphalt",
    summary: "雨后的路面在镜面投射中泛着沥青黑。细密的水滴填补了柏油碎石的缝隙，无形中吸收了高频啸叫，将整个街区压低到极低、微弱、沉实的无声境界。",
    summaryEng: "Post-rain road surfaces shimmer with deep pitch-black paint. Millions of water droplets fill paving crevices, dampening high-end noise to settle urban acoustics.",
    defaultImage: "src/assets/images 3/内容页2.webp",
    metrics: "Noise Dampening Rate: +38%",
    coordinates: "MA.SLNC // CLM.01"
  },
  {
    id: 8,
    sectionIndex: 4,
    sectionName: "天候留白",
    sectionSub: "SECTION 04 // CLIMATIC METAPHOR & NOISE-FILTERS",
    title: "总结页设计",
    titleEng: "Shinto Seclusion: Shadows of Pine needles in Hidden Shrines",
    summary: "城市夹缝中的斑驳鸟居，树叶微抚之声被古树林紧紧裹藏。我们在空气微粒中看到了历史与当下的对峙，多出的信息感在此被过滤，只留下宁静心流。",
    summaryEng: "Nestled between Shinjuku walls, Torii gates gather botanical safety. Shadows of ancient trees absorb footsteps, offering a protective buffer of serene awareness.",
    defaultImage: "/src/assets/images 3/总结页设计.webp",
    metrics: "Relative Decibel: 16 dBA",
    coordinates: "MA.SLNC // CLM.02"
  },
  {
    id: 9,
    sectionIndex: 5,
    sectionName: "尾声印记",
    sectionSub: "SECTION 05 // RESIDUAL TRAILING EPI-LOGUES",
    title: "结果页元素展示",
    titleEng: "Stygian River: Stagnant Waters Mirroring High-Voltage Fades",
    summary: "隅田川分支的一处废弃渠口。凝滞的水面宛如墨玉，默默平铺着远方电网高压塔的微弱倒影。河面上浮游着缓慢的时间粘性，犹如胶片底带的漫匀冲洗。",
    summaryEng: "An idle canal off the main Sumida. Tectonic water panels lie as flat as black glass, holding fading reflections of high-voltage masts in a state of terminal slow decay.",
    defaultImage: "/src/assets/images 3/Ai 元素生成-1.webp",
    metrics: "Fluency factor: Viscous static",
    coordinates: "MA.SLNC // EPI.01"
  }
];

export default function ProjectThreeImmersive({
  onBack,
  onNavigateToProject
}: ProjectThreeImmersiveProps) {
  const imageUrls = SLIDES_DATA.map(s => s.defaultImage);

  // Track the current active slide on screen (0 is Cover, 1-9 are content slides)
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // Safe reference monitoring for scrolling interaction
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverPercentage, setHoverPercentage] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Helper to extract granular interaction values from pointer events (0 to 9 slides)
  const getProgressSpecs = (clientX: number) => {
    if (!progressBarRef.current) return { percentage: 0, index: 0 };
    const rect = progressBarRef.current.getBoundingClientRect();
    const width = rect.width || 1;
    const left = rect.left;
    const relativeX = clientX - left;
    let percentage = relativeX / width;
    percentage = Math.max(0, Math.min(1, percentage));
    const targetIndex = Math.round(percentage * 9);
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

    if (bestIndex !== activeSlideIndex && bestIndex >= 0 && bestIndex <= 9) {
      setActiveSlideIndex(bestIndex);
    }
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      scrollToSlide(activeSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < 9) {
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
            ACTIVE EXHIBITING // {activeSlideIndex === 0 ? "封面导引 : INTRO" : `第 ${activeSlideIndex} / 9 幅`}
          </div>
          <div className="font-mono text-[9px] text-[#ffffff20] tracking-widest hidden xl:block border-l border-white/10 pl-4">
            CORE: HONG QI Portfolio.3
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
                {hoverIndex === 0 ? "快手-2025我的年度回忆" : SLIDES_DATA[hoverIndex - 1]?.title}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Absolute base timeline rules & visual tracks */}
        <div className="w-[calc(100%-32px)] h-[3px] bg-white/5 relative flex items-center rounded-full transition-all duration-300">

          {/* Static subtle tick marks representing 9 slide increments */}
          {Array.from({ length: 10 }).map((_, i) => {
            const isMajor = i % 2 === 0 || i === 9;
            const isActive = i <= activeSlideIndex;
            const isUnderHover = hoverIndex !== null && i === hoverIndex && isHovered;
            return (
              <div
                key={i}
                className="absolute transition-all duration-300 pointer-events-none"
                style={{
                  left: `${(i / 9) * 100}%`,
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
            animate={{ width: `${(activeSlideIndex / 9) * 100}%` }}
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
            animate={{ left: `${(activeSlideIndex / 9) * 100}%` }}
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
              src={resolveImagePath("/src/assets/images 3/regenerated_image_1779694602997.webp")}
              alt="Tokyo Silence Cover Background"
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

        {/* SLIDES 01 TO 09: 16:9 IMAGE VISUAL CARDS */}
        {SLIDES_DATA.map((slide, index) => {
          const slideNum = slide.id;
          const currentImage = imageUrls[index];

          return (
            <div
              key={slide.id}
              data-slide-index={slideNum}
              className="w-[85vw] sm:w-[75vw] md:w-[65vw] max-w-[850px] shrink-0 snap-center flex flex-col justify-center relative select-none"
            >
              <div className={`w-full ${(slide.title === "内容页设计1" || slide.title === "内容页设计2") ? "h-[65vh] sm:h-[74vh] md:h-[78vh]" : slide.title === "结果页元素展示" ? "aspect-[1920/689]" : "aspect-video"} border border-white/10 p-1 bg-[#121212]/30 shadow-[0_30px_100px_rgba(0,0,0,0.85)] hover:border-accent-lavender/40 transition-all duration-700 relative overflow-hidden flex items-center justify-center rounded-sm group`}>
                {/* Image Frame Watermarks */}
                <span className="absolute top-2 left-2 font-mono text-[6.5px] sm:text-[7.5px] text-[#ffffff15] tracking-widest pointer-events-none">[ FRAME {slideNum} : X_GRID_SYS ]</span>
                <span className="absolute top-2 right-2 font-mono text-[6.5px] sm:text-[7.5px] text-accent-blue/20 tracking-normal pointer-events-none">LAT 35.6762° N // MA.SLNC</span>
                <span className="absolute bottom-2 left-2 font-mono text-[6.5px] sm:text-[7.5px] text-[#ffffff15] tracking-wide pointer-events-none font-light">MA SHADOW PHOTOGRAPHY GALLERY</span>
                <span className="absolute bottom-2 right-2 font-mono text-[7px] sm:text-[8px] text-accent-lavender/30 tracking-widest pointer-events-none">HONG QI © 2026</span>

                {slide.title === "内容页设计1" || slide.title === "内容页设计2" ? (
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
                <span className="text-accent-blue/40 tracking-wider font-medium">{slide.title}</span>
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
              key="intro-desc-03"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-2 pointer-events-auto bg-black/40 backdrop-blur-md p-4 rounded-sm border border-white/5 shadow-2xl"
            >
              <span className="font-mono text-[8.5px] text-accent-blue tracking-[0.25em] uppercase block">
                PROJECT INITIATION //
              </span>

              <h3 className="text-sm sm:text-base font-light font-sans tracking-wide text-[#F5F5F2] uppercase leading-tight" id="project-03-title">
                快手-2025我的年度回忆
              </h3>

              <p className="text-[11px] text-text-slate/60 font-sans font-light leading-relaxed tracking-wide">
                基于快手年度报告进行虚拟创作，为每一页构建关联和故事感的画面。画面通过可爱的风格化处理，以及不同的质感对比，使整个H5流程轻松活泼，让用户有代入感地体验。
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
          disabled={activeSlideIndex === 9}
          className={`flex items-center space-x-1 px-1.5 py-1 transition-colors cursor-pointer bg-transparent border-0 outline-none uppercase ${
            activeSlideIndex === 9 ? "text-[#ffffff15] cursor-not-allowed" : "text-white font-bold hover:text-accent-lavender"
          }`}
        >
          <span>NEXT →</span>
        </button>
      </div>

    </div>
  );
}
