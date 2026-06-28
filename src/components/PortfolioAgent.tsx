import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, Sparkles, X } from "lucide-react";
import {
  askPortfolioAgent,
  type PortfolioAgentSource
} from "../utils/portfolioAgentClient";
import { suggestedPortfolioQuestions } from "../utils/portfolioAgent";

interface AgentMessage {
  id: number;
  role: "agent" | "visitor";
  text: string;
}

interface PortfolioAgentProps {
  placement?: "floating" | "sidebar";
}

const initialMessages: AgentMessage[] = [
  {
    id: 1,
    role: "agent",
    text: "你好，我是这份作品集的 AI 导览。你可以问我项目亮点、设计经历、技能或联系方式。"
  }
];

export default function PortfolioAgent({ placement = "floating" }: PortfolioAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages);
  const [isThinking, setIsThinking] = useState(false);
  const [lastSource, setLastSource] = useState<PortfolioAgentSource>("fallback");
  const nextMessageId = useRef(2);
  const messageViewportRef = useRef<HTMLDivElement>(null);
  const isSidebar = placement === "sidebar";
  const rootClassName = isSidebar
    ? "relative z-50 w-full font-mono pointer-events-none"
    : "fixed left-5 bottom-5 md:left-8 md:bottom-28 z-20 md:z-40 font-mono pointer-events-none";
  const panelClassName = isSidebar
    ? "pointer-events-auto absolute left-[calc(100%+48px)] bottom-0 w-[360px] border border-white/10 bg-bg-dark/92 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.75),0_0_45px_rgba(140,124,255,0.13)] rounded-sm overflow-hidden"
    : "pointer-events-auto mb-4 w-[calc(100vw-40px)] max-w-[340px] md:w-[360px] border border-white/10 bg-bg-dark/92 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.75),0_0_45px_rgba(140,124,255,0.13)] rounded-sm overflow-hidden";

  useEffect(() => {
    if (!isOpen || !messageViewportRef.current) return;
    messageViewportRef.current.scrollTop = messageViewportRef.current.scrollHeight;
  }, [isOpen, messages]);

  const sendQuestion = async (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || isThinking) return;

    const thinkingMessageId = nextMessageId.current + 1;
    nextMessageId.current += 2;
    setMessages((current) => [
      ...current,
      { id: thinkingMessageId - 1, role: "visitor", text: question },
      { id: thinkingMessageId, role: "agent", text: "Archive Intelligence 正在阅读作品集档案..." }
    ]);
    setInput("");
    setIsOpen(true);
    setIsThinking(true);

    const result = await askPortfolioAgent(question);

    setMessages((current) =>
      current.map((message) =>
        message.id === thinkingMessageId
          ? {
              ...message,
              text: result.answer
            }
          : message
      )
    );
    setLastSource(result.source);
    setIsThinking(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendQuestion(input);
  };

  return (
    <div className={rootClassName}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-testid={`portfolio-agent-panel-${placement}`}
            initial={{ opacity: 0, x: -12, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, y: 10, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={panelClassName}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] text-accent-lavender uppercase">
                  <Sparkles size={12} />
                  <span>Archive Intelligence</span>
                </div>
                <p className="mt-1 text-[9px] tracking-[0.18em] text-text-slate/45 uppercase">
                  {isThinking
                    ? "Archive Intelligence Thinking..."
                    : lastSource === "gemini"
                      ? "Gemini Live"
                      : lastSource === "ollama"
                        ? "Qwen3:8b Local"
                        : "Local Archive Fallback"}
                </p>
              </div>
              <button
                type="button"
                onPointerDown={(event) => {
                  event.stopPropagation();
                  setIsOpen(false);
                }}
                onClick={() => setIsOpen(false)}
                className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-text-slate/70 transition hover:border-white/25 hover:text-linen"
                aria-label="关闭作品集问答智能体"
              >
                <X size={13} />
              </button>
            </div>

            <div
              ref={messageViewportRef}
              className="inner-scroll-viewport max-h-[280px] space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "visitor" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] border px-3 py-2 text-[12px] leading-relaxed ${
                      message.role === "visitor"
                        ? "border-accent-lavender/25 bg-accent-lavender/10 text-linen"
                        : "border-white/10 bg-white/[0.035] text-text-slate/90"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-4 py-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestedPortfolioQuestions.slice(0, 4).map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void sendQuestion(question)}
                    disabled={isThinking}
                    className="border border-white/10 px-2.5 py-1 text-[10px] tracking-[0.08em] text-text-slate/70 transition hover:border-accent-lavender/35 hover:text-linen disabled:cursor-wait disabled:opacity-45"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border border-white/10 bg-panel-dark/60 px-3 py-2"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="询问作品集内容..."
                  disabled={isThinking}
                  className="min-w-0 flex-1 bg-transparent text-[12px] text-linen placeholder:text-text-slate/35 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isThinking}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-lavender text-bg-dark transition hover:bg-linen disabled:cursor-wait disabled:opacity-55"
                  aria-label="发送作品集问题"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        data-testid={`portfolio-agent-button-${placement}`}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="pointer-events-auto group flex items-center gap-3"
        aria-expanded={isOpen}
        aria-label="打开作品集 AI 问答智能体"
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_35%_28%,rgba(245,245,242,0.2),rgba(140,124,255,0.16)_45%,rgba(10,10,10,0.96))] text-[11px] font-semibold tracking-[0.16em] text-linen shadow-[0_0_34px_rgba(140,124,255,0.26)] transition duration-500 group-hover:border-accent-lavender/50 group-hover:shadow-[0_0_46px_rgba(140,124,255,0.42)]">
          <span className="absolute inset-[-5px] rounded-full border border-accent-lavender/10 opacity-0 transition group-hover:opacity-100" />
          AI
        </span>
        <span className={`${isSidebar ? "block" : "hidden sm:block"} border border-white/10 bg-bg-dark/80 px-3 py-2 text-left text-[9px] uppercase tracking-[0.22em] text-text-slate/55 backdrop-blur-md transition group-hover:border-accent-lavender/30 group-hover:text-linen`}>
          Ask Portfolio
        </span>
      </button>
    </div>
  );
}
