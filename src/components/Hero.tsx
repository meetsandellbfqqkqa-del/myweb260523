import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { profileData } from "../data";

interface HeroProps {
  onScrollToWorks: () => void;
}

export default function Hero({ onScrollToWorks }: HeroProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-between pt-16 pb-12 px-6 sm:px-12 md:pl-8 lg:pl-16 selection:bg-accent-lavender selection:text-bg-dark overflow-hidden"
    >
      {/* Background soft ambiance - Ethereal Gradient Glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent-lavender/10 rounded-full blur-[120px] pointer-events-none animate-glow" />
      <div className="absolute bottom-[-10%] left-[10%] w-[350px] h-[350px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Index Tag / Exhibition Metadata */}
      <div className="flex justify-between items-center w-full max-w-6xl font-mono text-[9px] text-[#ffffff30] tracking-[0.3em] uppercase">
        <div className="flex items-center space-x-2">
          <span>CATALOG NO. 26 // HANGZHOU EXPORT</span>
        </div>
        <div className="hidden lg:block text-right">
          <span>PORTFOLIO AS DIRECTORY [EDITION 04]</span>
        </div>
      </div>

      {/* Main Split Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center w-full max-w-6xl my-auto py-8">
        
        {/* Left Column: Swiss Typography Narrative */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-8 text-left z-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center space-x-3 text-accent-lavender font-mono text-[11px] tracking-[0.25em] uppercase"
            >
              <span className="w-8 h-[1px] bg-accent-lavender" />
              <span>HELLO —</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-5xl sm:text-7xl lg:text-8xl tracking-tighter leading-[0.95] text-linen font-light font-sans"
              >
                <span className="font-display tracking-tight font-extralight text-transparent bg-clip-text bg-gradient-to-r from-linen via-linen to-text-slate/40 animate-pulse">{profileData.firstName} {profileData.lastName}</span>
              </motion.h1>
            </div>

            <div className="overflow-hidden mt-2">
              <motion.h2
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="text-[21px] leading-[30px] text-text-slate font-light font-display tracking-wide"
              >
                UX设计师 &<br />
                <span className="text-linen pr-2">AIGC爱好者</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="max-w-md space-y-6"
          >
            <p className="text-[13px] sm:text-[14px] text-text-slate/75 leading-relaxed font-light">
              {profileData.story}
            </p>

            <div className="flex items-center space-x-6 pt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-text-slate/50">
              <div className="flex flex-col">
                <span className="text-[#ffffff20] text-[9px] tracking-widest pb-0.5">空间定位 / LOCATION</span>
                <span className="text-linen/80">杭州</span>
              </div>
              <div className="w-1.5 h-1.5 bg-accent-lavender rounded-full" />
              <div className="flex flex-col">
                <span className="text-[#ffffff20] text-[9px] tracking-widest pb-0.5">核心领域 / DISCIPLINE</span>
                <span className="text-linen/80">逻辑与视觉</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Poetic Profile Frame */}
        <div className="md:col-span-5 flex justify-center items-center z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[340px] md:max-w-none group"
          >
            {/* Soft backdrop glow to create depths */}
            <div className="absolute -inset-2 bg-gradient-to-r from-accent-lavender/20 to-accent-blue/10 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000" />

            {/* Artistic Cropped Image Container */}
            <div className="relative overflow-hidden clip-artistic border border-white/5 bg-[#121212] aspect-[3/4] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
              <motion.img
                src={profileData.imageUrl}
                alt="Portrait of REI"
                referrerPolicy="no-referrer"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                className="w-full h-full object-cover contrast-115 brightness-95 scale-100 group-hover:scale-105 transition-all duration-1000 object-center"
              />

              {/* Decorative crosshairs / overlay metrics for digital art look */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-bg-dark/80 to-transparent flex justify-between items-end font-mono text-[9px] text-[#ffffff40]">
                <span>REI.S — IN-CAMERA SENSING</span>
                <span>F/5.6 ISO 100</span>
              </div>
              
              {/* Geometric corner brackets */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" />
            </div>

            {/* Artistic Offset frame outline */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-accent-lavender/20 clip-artistic pointer-events-none -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-700" />
          </motion.div>
        </div>

      </div>

      {/* Down indicators - Scroll trigger */}
      <motion.button
        onClick={onScrollToWorks}
        whileHover={{ y: 2 }}
        className="w-fit self-start md:self-center flex items-center space-x-4 group cursor-pointer text-text-slate/40 hover:text-linen font-mono text-[10px] tracking-[0.25em] uppercase border-b border-white/5 pb-2 transition-colors duration-300"
      >
        <span>PORTFOLIO DIRECTORY WORK</span>
        <ArrowDown size={12} className="text-accent-lavender group-hover:translate-y-1 transition-transform duration-300" />
      </motion.button>
    </section>
  );
}
