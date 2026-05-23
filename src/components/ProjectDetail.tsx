import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, User, Eye, Layers } from "lucide-react";
import { Project } from "../types";
import { projectsData } from "../data";
import ProjectOneImmersive from "./ProjectOneImmersive";
import ProjectTwoImmersive from "./ProjectTwoImmersive";

interface ProjectDetailProps {
  key?: string;
  projectId: string;
  onBack: () => void;
  onNavigateToProject: (projectId: string) => void;
}

export default function ProjectDetail({
  projectId,
  onBack,
  onNavigateToProject,
}: ProjectDetailProps) {
  const currentProjectIndex = projectsData.findIndex((p) => p.id === projectId);
  const project = projectsData[currentProjectIndex] || projectsData[0];

  // Find the next project in our cyclic visual queue
  const nextProjectIndex = (currentProjectIndex + 1) % projectsData.length;
  const nextProject = projectsData[nextProjectIndex];

  // Auto scroll to top of details whenever project pivots
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [projectId]);

  if (projectId === "project-01") {
    return (
      <ProjectOneImmersive
        onBack={onBack}
        onNavigateToProject={onNavigateToProject}
      />
    );
  }

  if (projectId === "project-02") {
    return (
      <ProjectTwoImmersive
        onBack={onBack}
        onNavigateToProject={onNavigateToProject}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full bg-bg-dark text-linen select-none font-sans pl-0 md:pl-64"
    >
      {/* Dynamic atmospheric subtle glow inside details */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-accent-lavender/5 to-transparent pointer-events-none" />

      {/* Floating Header UI */}
      <div className="sticky top-0 w-full z-30 bg-bg-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-6 sm:px-12 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-3 group text-xs text-text-slate/60 hover:text-linen font-mono tracking-[0.2em] uppercase focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-linen/30 flex items-center justify-center transition-all">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Back to Directory</span>
        </button>

        <div className="font-mono text-[9px] text-text-slate/40 tracking-[0.25em] uppercase hidden sm:block">
          EXH // 00{project.number} : {project.title}
        </div>
      </div>

      {/* 1. Project Hero Section (Immersive, Cinematic Fullscreen Canvas) */}
      <section className="relative w-full h-[85vh] flex flex-col justify-end overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          {/* Subtle slow zooming landscape overlay */}
          <motion.img
            initial={{ scale: 1.1, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            src={project.overviewImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover contrast-115 brightness-90 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent z-10" />
        </div>
      </section>

      {/* 2. Project Introduction (Whisper Design Aesthetics and Giant Concept Whitespaces) */}
      <section className="py-24 sm:py-32 w-full max-w-5xl mx-auto px-6 sm:px-12 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 font-mono text-[11px] text-accent-lavender tracking-[0.25em] uppercase">
            THE CHRONO HYPOTHESIS
          </div>
          <div className="md:col-span-8 space-y-8">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display tracking-tight text-linen leading-snug">
              &ldquo;{project.conceptTitle}&rdquo;
            </h3>
            <p className="text-text-slate/85 font-sans font-light text-[15px] sm:text-[16px] leading-relaxed max-w-2xl">
              {project.conceptDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visual Showcase Showcase Grid (Massive staggered photo editorial layouts) */}
      <section className="py-24 sm:py-32 w-full max-w-5xl mx-auto px-6 sm:px-12 border-b border-white/5 space-y-24">
        <div className="font-mono text-[11px] text-text-slate/30 tracking-[0.25em] uppercase border-b border-white/5 pb-2">
          VISUAL SHOWCASE EXHIBITION / 视觉巡礼
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="md:col-span-7 overflow-hidden rounded-sm bg-panel-dark border border-white/5 aspect-[4/3] relative">
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/20 to-transparent pointer-events-none" />
            <img
              src={project.showcaseImages[0]}
              alt="Detailed design render A"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:scale-102 transition duration-1000 object-center"
            />
          </div>
          <div className="md:col-span-5 space-y-4">
            <span className="font-mono text-[10px] text-accent-lavender uppercase tracking-widest block">
              SOCIOPROPORTIONAL AESTHETIC —
            </span>
            <p className="text-text-slate/70 text-xs leading-relaxed font-sans font-light">
              High-fidelity tactile renderings exploring spatial alignments, micro-typography pairings, and calculated negative structures designed to create cognitive focus buffers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="md:col-span-5 space-y-4 order-2 md:order-1">
            <span className="font-mono text-[10px] text-accent-blue uppercase tracking-widest block">
              TACTILITY STUDY —
            </span>
            <p className="text-text-slate/70 text-xs leading-relaxed font-sans font-light">
              The layout adapts elegantly to visual weight. Deep graphite backgrounds allow primary layout boundaries to float naturally, offering an offline-studio look that isolates noise.
            </p>
          </div>
          <div className="md:col-span-7 overflow-hidden rounded-sm bg-panel-dark border border-white/5 aspect-[16/10] relative order-1 md:order-2">
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/20 to-transparent pointer-events-none" />
            <img
              src={project.showcaseImages[1]}
              alt="Detailed design render B"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:scale-102 transition duration-1000 object-center"
            />
          </div>
        </div>
      </section>

      {/* 4. Design Process (Staggered linear step progress catalog) */}
      <section className="py-24 sm:py-32 w-full max-w-5xl mx-auto px-6 sm:px-12 border-b border-white/5">
        <div className="font-mono text-[11px] text-text-slate/30 tracking-[0.25em] uppercase border-b border-white/5 pb-4 mb-16">
          FORMULATION METHODOLOGY / 创作过程
        </div>

        <div className="space-y-16">
          {project.designProcess.map((step, idx) => (
            <div
              key={step.phase}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative before:absolute before:left-[-1px] before:top-0 before:w-[1px] before:h-full before:bg-white/5 pl-4 md:pl-0"
            >
              <div className="md:col-span-3 flex items-center space-x-3">
                <span className="font-mono text-2xl font-light text-accent-lavender">
                  0{idx + 1}
                </span>
                <span className="font-mono text-[10px] text-[#ffffff20] uppercase tracking-widest">
                  PHASE
                </span>
              </div>
              <div className="md:col-span-4">
                <h4 className="text-xl font-light font-display tracking-wide text-linen uppercase">
                  {step.phase}
                </h4>
              </div>
              <div className="md:col-span-5">
                <p className="text-xs text-text-slate/75 leading-relaxed font-sans font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Final Result */}
      <section className="py-24 sm:py-32 w-full max-w-5xl mx-auto px-6 sm:px-12 border-b border-white/5">
        <div className="font-mono text-[11px] text-text-slate/30 tracking-[0.25em] uppercase border-b border-white/5 pb-4 mb-16">
          OUTCOME RESONANCE / 最终成果
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="block font-mono text-[9px] text-[#ffffff30] uppercase tracking-widest">
                VERIFIED METRIC
              </span>
              <p className="text-3xl font-display font-light text-accent-blue uppercase tracking-wide">
                {project.finalResult.metrics || "Pristine Execution"}
              </p>
            </div>

            <div className="space-y-3">
              <span className="block font-mono text-[9px] text-[#ffffff30] uppercase tracking-widest">
                SUMMARY MATRIX
              </span>
              <p className="text-xs text-text-slate/85 leading-relaxed font-sans font-light">
                {project.finalResult.achievement}
              </p>
            </div>
          </div>

          <div className="md:col-span-7 overflow-hidden rounded-sm bg-panel-dark border border-white/5 aspect-[16/9] relative shadow-2xl">
            <img
              src={project.finalResult.image}
              alt="Outcome showcase"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:scale-102 transition duration-1000 object-center"
            />
          </div>
        </div>
      </section>

      {/* 6. Next Project Navigation (Dynamic, cinema transition) */}
      <section
        onClick={() => onNavigateToProject(nextProject.id)}
        className="w-full py-32 bg-[#0d0d0d] hover:bg-[#121212] transition-colors duration-700 cursor-pointer text-center relative overflow-hidden group"
      >
        {/* Soft background light */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[350px] h-[350px] bg-accent-lavender/5 rounded-full blur-[110px] pointer-events-none group-hover:scale-110 transition duration-1000" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-3 text-accent-lavender font-mono text-[11px] tracking-[0.3em] uppercase">
            <span>NEXT EXHIBITION ROOM / 下个作品</span>
            <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-sans tracking-tight text-[#ffffff30] group-hover:text-linen transition-colors duration-700 uppercase">
            {nextProject.title}
          </h2>

          <p className="text-[11px] font-mono text-text-slate/40 group-hover:text-text-slate/70 transition-colors uppercase tracking-[0.2em]">
            {nextProject.subtitle}
          </p>
        </div>

        {/* Dynamic slow-gliding linear timeline indicator at bottom of card */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
          <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-accent-lavender to-accent-blue transition-all duration-[3000ms] ease-out" />
        </div>
      </section>
    </motion.div>
  );
}
