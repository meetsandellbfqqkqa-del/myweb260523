import { motion } from "motion/react";
import { projectsData } from "../data";
import PortfolioAgent from "./PortfolioAgent";

interface NavigationProps {
  activeSection: string; // "about" | "project-01" | "project-02" | "project-03" | "contact"
  activeProjectId: string | null;
  onNavigate: (sectionId: string, projectId: string | null) => void;
}

export default function Navigation({
  activeSection,
  activeProjectId,
  onNavigate,
}: NavigationProps) {
  const currentHighlight = activeProjectId || activeSection;

  const navItems = [
    { label: "About", id: "about", type: "home-section", projectVal: null },
    ...projectsData.map((p) => ({
      label: `Project ${p.number}`,
      id: p.id,
      type: "project",
      projectVal: p.id,
    })),
    { label: "Contact", id: "contact", type: "home-section", projectVal: null },
  ];

  return (
    <nav
      id="left-catalog-nav"
      className="fixed left-0 top-0 h-full w-48 sm:w-64 border-r border-[#ffffff08] bg-[#0A0A0A90] backdrop-blur-md z-40 hidden md:flex flex-col justify-between p-8 pt-12 pb-12 font-mono text-xs text-text-slate tracking-widest select-none"
    >
      {/* Top Brand Tag */}
      <div>
        <button
          onClick={() => onNavigate("about", null)}
          className="text-left group cursor-pointer"
        >
          <div className="text-linen font-bold text-sm tracking-[0.3em] font-display transition-transform duration-300 group-hover:translate-x-1">
            洪旗
          </div>
          <p className="text-[9px] text-text-slate/40 mt-1 uppercase font-mono tracking-[0.15em]">
            DIGITAL PORTFOLIO
          </p>
        </button>
      </div>

      {/* Directory Menu */}
      <div className="flex flex-col space-y-7 my-auto">
        <p className="text-[10px] text-text-slate/30 font-medium pb-2 border-b border-white/5 uppercase tracking-[0.25em]">
          Directory / 目录
        </p>

        {navItems.map((item) => {
          const isSelected = currentHighlight === item.id;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.id, item.projectVal)}
              className="text-left cursor-pointer group relative py-1 focus:outline-none"
            >
              <div className="flex items-center space-x-3">
                {/* Micro Dot Selector */}
                <div className="relative w-1.5 h-1.5">
                  {isSelected ? (
                    <motion.div
                      layoutId="nav-dot"
                      transition={{ type: "spring", stiffness: 350, damping: 40 }}
                      className="absolute inset-0 bg-accent-lavender rounded-full shadow-[0_0_8px_#8C7CFF]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/10 rounded-full group-hover:bg-white/40 transition-colors" />
                  )}
                </div>

                <span
                  className={`uppercase tracking-[0.2em] transition-all duration-500 text-[11px] ${
                    isSelected
                      ? "text-linen font-medium translate-x-1"
                      : "text-text-slate/60 hover:text-linen hover:translate-x-0.5"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Sub-label for premium catalog aesthetic */}
              <div className="pl-[18px] mt-0.5 text-[9px] text-text-slate/30 uppercase tracking-[0.1em]">
                {item.id === "about" && "introduction"}
                {item.id === "project-01" && "fluid ether"}
                {item.id === "project-02" && "kinetic study"}
                {item.id === "project-03" && "tokyo silence"}
                {item.id === "contact" && "transmission"}
              </div>
            </button>
          );
        })}
      </div>

      <PortfolioAgent placement="sidebar" />
    </nav>
  );
}
