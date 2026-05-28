import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check, Mail, Phone, MessageSquare, Github, ArrowUp } from "lucide-react";
import { profileData } from "../data";

interface ContactSectionProps {
  onScrollToTop: () => void;
}

export default function ContactSection({ onScrollToTop }: ContactSectionProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const contacts = [
    {
      label: "Email",
      value: profileData.email,
      icon: <Mail size={13} />,
      link: `mailto:${profileData.email}`
    },
    {
      label: "Phone",
      value: profileData.phone,
      icon: <Phone size={13} />,
      link: `tel:${profileData.phone}`
    },
    {
      label: "WeChat",
      value: profileData.wechat,
      icon: <MessageSquare size={13} />,
      link: null
    },
    {
      label: "GitHub",
      value: profileData.github,
      icon: <Github size={13} />,
      link: `https://github.com/${profileData.github}`
    }
  ];

  return (
    <section
      id="contact"
      className="relative min-h-[90vh] w-full flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 md:pl-8 lg:pl-16 selection:bg-accent-lavender selection:text-bg-dark overflow-hidden border-t border-[#ffffff05]"
    >
      {/* Dynamic Ambient Backlight */}
      <div className="absolute bottom-[-15%] right-[-15%] w-[450px] h-[450px] bg-accent-lavender/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-accent-blue/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Decorative vertical category line */}
      <div className="absolute top-0 right-12 w-[1px] h-full bg-[#ffffff03] pointer-events-none" />

      {/* Header */}
      <div className="max-w-6xl w-full text-left">
        <p className="text-accent-lavender font-mono text-[11px] tracking-[0.25em] mb-4 uppercase">
          03 // TRANSMISSION / TRANSMIT
        </p>
        <h2 className="font-light font-display tracking-tight text-linen mb-6 text-[48px] leading-[46px]">
          联系 <span className="font-display italic font-light text-text-slate/60">方式</span>
        </h2>
        <p className="max-w-md font-mono text-text-slate/40 tracking-wider uppercase mb-12 text-[13px] leading-[14.25px]">
          联系我，便于了解关于更多信息
        </p>

        <div className="w-full h-[1px] bg-white/5" />
      </div>

      {/* Quiet Contact Link Directory */}
      <div className="max-w-4xl w-full my-auto py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {contacts.map((c) => (
            <div
              key={c.label}
              className="flex justify-between items-center group py-4 px-2 border-b border-white/5 hover:border-accent-lavender/40 transition-colors duration-500"
            >
              <div className="flex items-center space-x-4">
                <span className="text-accent-lavender/50 group-hover:text-accent-lavender transition-colors duration-500">
                  {c.icon}
                </span>
                <div>
                  <span className="block font-mono text-[9px] text-text-slate/30 uppercase tracking-[0.2em] mb-0.5">
                    {c.label}
                  </span>
                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-sans font-light tracking-wide text-linen/80 group-hover:text-linen transition-colors duration-300"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-sm font-sans font-light tracking-wide text-linen/80 group-hover:text-linen transition-colors duration-300">
                      {c.value}
                    </span>
                  )}
                </div>
              </div>

              {/* Utility Action Buttons */}
              <button
                onClick={() => handleCopy(c.value, c.label)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0 p-2 text-text-slate/30 hover:text-accent-lavender rounded-full hover:bg-white/[0.03] cursor-pointer focus:outline-none"
                title={`Copy ${c.label}`}
              >
                {copiedText === c.label ? (
                  <Check size={12} className="text-accent-blue" />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Copy confirmation toast */}
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 bg-panel-dark/95 backdrop-blur-md border border-white/15 px-4 py-2 text-[10px] text-linen font-mono uppercase tracking-[0.15em] shadow-2xl z-50 rounded-sm"
          >
            <span>{copiedText} copied to clipboard successfully</span>
          </motion.div>
        )}
      </div>

      {/* Footer and Return upward arrow */}
      <div className="max-w-6xl w-full flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
        <div className="font-mono text-[9px] text-[#ffffff20] uppercase tracking-[0.25em] text-center sm:text-left">
          <span>STEREOSCOPIC DIRECTORY © 2026 / CHRONO-SYS INLINE ON PORT 3000</span>
        </div>

        <button
          onClick={onScrollToTop}
          className="flex items-center space-x-3 group cursor-pointer font-mono text-[10px] text-text-slate/40 hover:text-linen tracking-[0.25em] uppercase transition-colors"
        >
          <span>ASCEND / TO TOP</span>
          <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-accent-lavender/50 flex items-center justify-center group-hover:translate-y-[-2px] transition-all duration-300">
            <ArrowUp size={12} className="text-accent-lavender group-hover:text-accent-blue transition-colors" />
          </div>
        </button>
      </div>
    </section>
  );
}
