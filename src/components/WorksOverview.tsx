import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "../data";
import { Project } from "../types";
import { resolveImagePath } from "../utils/imageResolver";

interface WorksOverviewProps {
  onSelectProject: (projectId: string) => void;
}

export default function WorksOverview({ onSelectProject }: WorksOverviewProps) {
  return (
    <section
      id="works-gallery"
      className="relative min-h-screen w-full py-24 sm:py-32 px-6 sm:px-12 md:pl-8 lg:pl-16 selection:bg-accent-lavender selection:text-bg-dark overflow-hidden"
    >
      {/* Decorative vertical category line */}
      <div className="absolute top-0 right-12 w-[1px] h-full bg-[#ffffff03] pointer-events-none" />

      {/* Grid Header */}
      <div className="max-w-6xl mb-20 sm:mb-28 text-left">
        <p className="text-accent-lavender font-mono text-[11px] tracking-[0.25em] mb-4 uppercase">
          02 // INDEX OF WORKS
        </p>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light font-display tracking-tight text-linen leading-none">
            精选 <span className="font-mono italic font-light text-text-slate/60">项目经历</span>
          </h2>
        </div>
        
        <div className="w-full h-[1px] bg-white/5 mt-6" />
      </div>

      {/* Two-Column Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-24 sm:gap-y-32 max-w-6xl">
        {projectsData.map((project: Project, idx: number) => {
          // Add rhythmic vertical offset variation to columns (Tokyo Minimalism / Editorial style)
          const isOffset = idx % 2 === 1;

          return (
            <motion.div
              key={project.id}
              id={project.id}
              onClick={() => onSelectProject(project.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`group flex flex-col justify-start cursor-pointer relative scroll-mt-24 ${
                isOffset ? "md:mt-24 lg:mt-32" : ""
              }`}
            >
              {/* Project Card Serial Indicator */}
              <div className="flex justify-between items-center mb-4 font-mono text-[11px] text-text-slate/30 border-b border-white/5 pb-2">
                <span className="tracking-[0.2em]">CATALOG NO. 0{idx + 1}</span>
              </div>

              {/* Card Image Wrapper with Premium Interactions */}
              <div className="relative overflow-hidden aspect-[16/9] bg-panel-dark border border-white/5 shadow-2xl rounded-sm">
                
                {/* Slow interactive atmospheric hover shader overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-bg-dark/20 opacity-40 group-hover:opacity-70 transition-opacity duration-1000 z-10" />
                
                {/* Micro Ambient Glow behind the card on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-lavender/30 via-transparent to-accent-blue/20 opacity-0 group-hover:opacity-45 blur-lg transition-opacity duration-1000 -z-10" />

                <img
                  src={resolveImagePath(project.overviewImage)}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] object-center"
                />

                {/* Hover Trigger Details (Ethereal text blur-in) */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="bg-bg-dark/85 backdrop-blur-md border border-white/10 w-9 h-9 rounded-full flex items-center justify-center text-linen shadow-lg transform rotate-45 group-hover:rotate-0 transition-transform duration-700">
                    <ArrowUpRight size={14} className="text-accent-lavender" />
                  </div>
                </div>

                {/* Inner exhibition metrics */}
                <div className="absolute bottom-4 left-4 z-20 font-mono text-[9px] text-[#ffffff50] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span>CURATOR RECORDED: Y — {project.year}</span>
                </div>
              </div>

              {/* Typographic Meta details below card */}
              <div className="mt-6 flex flex-col space-y-1">
                <h3 className="text-2xl sm:text-3xl font-light font-sans tracking-tight text-linen uppercase flex items-center justify-between">
                  <span>{project.title}</span>
                </h3>
                <p className="text-[11px] font-mono text-text-slate/60 uppercase tracking-[0.11em] font-light">
                  {project.subtitle}
                </p>
              </div>

              {/* Left edge floating numbers for true catalog rhythm */}
              <div className="absolute -left-12 lg:-left-16 top-16 writing-mode-vertical uppercase font-mono text-[9px] text-text-slate/15 tracking-[0.4em] hidden xl:block">
                EXH // 00{idx + 1}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
