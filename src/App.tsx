import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profileData, projectsData } from "./data";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import WorksOverview from "./components/WorksOverview";
import ContactSection from "./components/ContactSection";
import ProjectDetail from "./components/ProjectDetail";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>(() => {
    try {
      return localStorage.getItem("activeSection") || "about";
    } catch (_) {
      return "about";
    }
  });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => {
    try {
      return localStorage.getItem("activeProjectId") || null;
    } catch (_) {
      return null;
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Sync active states to localStorage to prevent resets on reload/sleep
  useEffect(() => {
    try {
      localStorage.setItem("activeSection", activeSection);
    } catch (_) {}
  }, [activeSection]);

  useEffect(() => {
    try {
      if (activeProjectId !== null) {
        localStorage.setItem("activeProjectId", activeProjectId);
      } else {
        localStorage.removeItem("activeProjectId");
      }
    } catch (_) {}
  }, [activeProjectId]);

  // Initial load scroll restoration
  useEffect(() => {
    try {
      const savedProjectId = localStorage.getItem("activeProjectId");
      if (!savedProjectId) {
        const savedSection = localStorage.getItem("activeSection");
        if (savedSection && savedSection !== "about") {
          setTimeout(() => {
            const el = document.getElementById(savedSection);
            if (el) {
              el.scrollIntoView({ behavior: "instant" as any });
            }
          }, 350);
        }
      }
    } catch (_) {}
  }, []);

  // 1. Double-linked scroll section observer (IntersectionObserver)
  useEffect(() => {
    if (activeProjectId !== null) return; // Disable intersection observing inside detail views

    const sectionIds = ["about", "project-01", "project-02", "project-03", "contact"];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-25% 0px -55% 0px", // Strict focus viewport range for perfect section-highlight timing
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, [activeProjectId]);

  // 2. Intelligent anchor-scrolling & details pivot router
  const handleNavigate = (sectionId: string, projectId: string | null) => {
    setMobileMenuOpen(false);

    if (projectId) {
      // Toggle immediately to the selected Project's detail view
      setActiveProjectId(projectId);
      setActiveSection(sectionId);
    } else {
      // Return to homepage and slide dynamically to requested element
      if (activeProjectId !== null) {
        setActiveProjectId(null);
        setActiveSection(sectionId);
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 120);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToWorks = () => {
    const el = document.getElementById("works-gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-dark text-linen text-sans selection:bg-accent-lavender selection:text-bg-dark">
      {/* Absolute Background Canvas Ambient Noise & Ethereal Glowing Dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[radial-gradient(#1c1c1f_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      {/* Left fixed Catalog Directory sidebar */}
      <Navigation
        activeSection={activeSection}
        activeProjectId={activeProjectId}
        onNavigate={handleNavigate}
      />

      {/* Mobile-only layout directory header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-bg-dark/75 backdrop-blur-md border-b border-white/5 py-4 px-6 md:hidden flex justify-between items-center">
        <button
          onClick={() => handleNavigate("about", null)}
          className="font-display font-medium text-sm tracking-[0.2em] text-linen flex items-center space-x-1"
        >
          <span>洪旗</span>
          <span className="text-[8px] px-1.5 py-0.5 border border-white/10 text-[#ffffff30] tracking-normal font-mono rounded-sm">
            ED.26
          </span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 focus:outline-none focus:ring-0 text-text-slate/80 hover:text-linen cursor-pointer"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Drawer menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-bg-dark/98 backdrop-blur-lg z-30 pt-24 px-8 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col space-y-7 font-mono text-sm tracking-widest uppercase">
              <span className="text-[10px] text-text-slate/30 border-b border-white/5 pb-2">
                EXHIBITION DIRECTORY
              </span>
              
              <button
                onClick={() => handleNavigate("about", null)}
                className={`text-left text-lg flex items-center space-x-3 ${
                  activeSection === "about" && activeProjectId === null ? "text-accent-lavender" : "text-text-slate"
                }`}
              >
                <span className="text-xs text-[#ffffff20]">01 //</span>
                <span>ABOUT</span>
              </button>

              {projectsData.map((p, index) => {
                const isActive = activeProjectId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleNavigate(p.id, p.id)}
                    className={`text-left text-lg flex items-center space-x-3 ${
                      isActive ? "text-accent-lavender" : "text-text-slate"
                    }`}
                  >
                    <span className="text-xs text-[#ffffff20]">0{index + 2} //</span>
                    <span>PROJECT {p.number}</span>
                  </button>
                );
              })}

              <button
                onClick={() => handleNavigate("contact", null)}
                className={`text-left text-lg flex items-center space-x-3 ${
                  activeSection === "contact" ? "text-accent-lavender" : "text-text-slate"
                }`}
              >
                <span className="text-xs text-[#ffffff20]">05 //</span>
                <span>CONTACT</span>
              </button>
            </div>

            <div className="font-mono text-[10px] text-text-slate/40 leading-relaxed border-t border-white/5 pt-6">
              <p>REI SATO © 2026</p>
              <p className="text-[9px] mt-1 text-accent-lavender">LAT 35.6762° N // TOKYO DIR</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main viewport area */}
      <main className="min-h-screen w-full">
        <AnimatePresence mode="wait">
          {activeProjectId === null ? (
            // ONE-PAGE IMMERSIVE HOME VIEW (scrolls smoothly)
            <motion.div
              key="home-viewport"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="pt-12 md:pt-0 pl-0 md:pl-64"
            >
              <Hero onScrollToWorks={handleScrollToWorks} />
              <WorksOverview onSelectProject={(id) => handleNavigate(id, id)} />
              <ContactSection onScrollToTop={handleScrollToTop} />
            </motion.div>
          ) : (
            // SECOND-PAGE DETAILED PROJECT SLIDE VIEW (scrolls on separate scope)
            <ProjectDetail
              key={`project-detail-${activeProjectId}`}
              projectId={activeProjectId}
              onBack={() => handleNavigate("about", null)}
              onNavigateToProject={(id) => handleNavigate(id, id)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
