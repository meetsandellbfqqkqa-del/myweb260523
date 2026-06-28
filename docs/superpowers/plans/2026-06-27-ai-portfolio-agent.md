# AI Portfolio Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Floating Signal AI Q&A agent that lets visitors ask about the portfolio from the project navigation area.

**Architecture:** Put deterministic answer generation in `src/utils/portfolioAgent.ts` so it can be tested independently. Render the floating button and chat panel in `src/components/PortfolioAgent.tsx`, then mount it once from `src/App.tsx`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4 utility classes, `motion/react`, `lucide-react`, Node built-in test runner with `tsx`.

---

## File Structure

- Create `src/utils/portfolioAgent.ts`: local knowledge base, suggested prompts, and answer matching helper.
- Create `src/utils/portfolioAgent.test.ts`: Node test coverage for project, skills, contact, fallback, and empty-question behavior.
- Create `src/components/PortfolioAgent.tsx`: Floating Signal button, animated panel, prompt chips, input, messages, and close behavior.
- Modify `src/App.tsx`: import and render `PortfolioAgent` next to `Navigation`.
- Modify `package.json`: add a `test` script that runs the focused TypeScript unit test with `node --import tsx --test`.

### Task 1: Agent Answer Logic

**Files:**
- Create: `src/utils/portfolioAgent.test.ts`
- Create: `src/utils/portfolioAgent.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

Create `src/utils/portfolioAgent.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { answerPortfolioQuestion, suggestedPortfolioQuestions } from "./portfolioAgent";

test("answers Didi project questions from portfolio context", () => {
  const answer = answerPortfolioQuestion("滴滴项目主要做了什么？");

  assert.match(answer, /滴滴/);
  assert.match(answer, /花小猪/);
  assert.match(answer, /券裂变/);
});

test("answers skill questions with design and AI tooling", () => {
  const answer = answerPortfolioQuestion("她会哪些技能？");

  assert.match(answer, /FIGMA|Figma/);
  assert.match(answer, /AIGC/);
  assert.match(answer, /VIBE CODING/);
});

test("answers contact questions with portfolio contact details", () => {
  const answer = answerPortfolioQuestion("如何联系洪旗？");

  assert.match(answer, /2860816256@qq\.com/);
  assert.match(answer, /15228718329/);
});

test("falls back to a concise portfolio overview", () => {
  const answer = answerPortfolioQuestion("随便讲讲");

  assert.match(answer, /作品集/);
  assert.match(answer, /滴滴/);
  assert.match(answer, /小红书/);
  assert.match(answer, /快手/);
});

test("returns an empty string for blank questions", () => {
  assert.equal(answerPortfolioQuestion("   "), "");
});

test("exposes suggested questions for the UI", () => {
  assert.ok(suggestedPortfolioQuestions.length >= 4);
  assert.ok(suggestedPortfolioQuestions.some((question) => question.includes("项目")));
});
```

- [ ] **Step 2: Add the test script**

Modify `package.json` scripts:

```json
"test": "node --import tsx --test src/utils/portfolioAgent.test.ts"
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because `src/utils/portfolioAgent.ts` does not exist or does not export the functions.

- [ ] **Step 4: Write minimal implementation**

Create `src/utils/portfolioAgent.ts` with:

```ts
import { profileData, projectsData } from "../data";

export const suggestedPortfolioQuestions = [
  "这个作品集主要展示了什么？",
  "滴滴项目做了什么？",
  "小红书项目的亮点是什么？",
  "快手年度回忆是什么风格？",
  "洪旗会哪些技能？",
  "如何联系洪旗？"
];

const includesAny = (source: string, keywords: string[]) =>
  keywords.some((keyword) => source.includes(keyword.toLowerCase()));

const projectById = (id: string) => projectsData.find((project) => project.id === id);

export function answerPortfolioQuestion(question: string): string {
  const normalized = question.trim().toLowerCase();
  if (!normalized) return "";

  if (includesAny(normalized, ["联系", "邮箱", "电话", "微信", "wechat", "email"])) {
    return `可以通过邮箱 ${profileData.email} 联系洪旗，也可以通过电话 / 微信 ${profileData.wechat} 沟通。GitHub 账号为 ${profileData.github}。`;
  }

  if (includesAny(normalized, ["技能", "会什么", "能力", "figma", "aigc", "ai", "coding"])) {
    return `洪旗是一名 ${profileData.tagline}，熟悉 FIGMA、AIGC 视觉生成和 VIBE CODING，并有产品体验、交互流程和视觉表达相关项目经历。`;
  }

  if (includesAny(normalized, ["滴滴", "花小猪", "裂变", "券", "实习"])) {
    const project = projectById("project-01");
    return `${project?.title}聚焦${project?.subtitle}。项目围绕“好友助力得打车券 / 免单券”，通过阶梯式激励、即时反馈、流程优化和视觉更新，降低用户参与门槛，并服务拉新、促活与消费转化。`;
  }

  if (includesAny(normalized, ["小红书", "市集", "穿搭", "电商", "购买"])) {
    const project = projectById("project-02");
    return `${project?.title}是一个${project?.category}项目，目标是优化小红书市集穿搭模块相关界面，提升浏览与购买链路体验，增强消费粘性并推动市集电商发展。`;
  }

  if (includesAny(normalized, ["快手", "年度", "回忆", "h5", "虚拟", "生成"])) {
    const project = projectById("project-03");
    return `${project?.title}基于快手年度报告进行虚拟创作，通过可爱的风格化处理、不同质感对比和连续故事感，构建轻松活泼、有代入感的 H5 体验。`;
  }

  if (includesAny(normalized, ["是谁", "介绍", "经历", "教育", "学校", "关于", "洪旗"])) {
    return `${profileData.firstName}${profileData.lastName}是${profileData.tagline}。本科就读中央美院，研究生在中国美院在读，经历包含滴滴产品实习、小红书和快手项目，并持续探索 AI 与设计结合。`;
  }

  return `这个作品集主要展示洪旗的 UX / UI / AIGC 相关项目：滴滴花小猪券裂变活动、小红书市集穿搭体验提升，以及快手 2025 年度回忆 H5 虚拟创作。你可以继续问我某个项目、技能或联系方式。`;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`

Expected: PASS.

### Task 2: Floating Signal UI

**Files:**
- Create: `src/components/PortfolioAgent.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the UI component**

Create `src/components/PortfolioAgent.tsx`:

```tsx
import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, Sparkles, X } from "lucide-react";
import { answerPortfolioQuestion, suggestedPortfolioQuestions } from "../utils/portfolioAgent";

interface AgentMessage {
  id: number;
  role: "agent" | "visitor";
  text: string;
}

const initialMessages: AgentMessage[] = [
  {
    id: 1,
    role: "agent",
    text: "你好，我是这份作品集的 AI 导览。你可以问我项目亮点、设计经历、技能或联系方式。"
  }
];

export default function PortfolioAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages);
  const nextMessageId = useRef(2);

  const sendQuestion = (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question) return;

    const answer = answerPortfolioQuestion(question);
    setMessages((current) => [
      ...current,
      { id: nextMessageId.current++, role: "visitor", text: question },
      { id: nextMessageId.current++, role: "agent", text: answer }
    ]);
    setInput("");
    setIsOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendQuestion(input);
  };

  return (
    <div className="fixed left-5 bottom-5 md:left-8 md:bottom-28 z-40 font-mono pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -12, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, y: 10, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mb-4 w-[calc(100vw-40px)] max-w-[340px] md:w-[360px] border border-white/10 bg-bg-dark/92 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.75),0_0_45px_rgba(140,124,255,0.13)] rounded-sm overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] text-accent-lavender uppercase">
                  <Sparkles size={12} />
                  Archive Intelligence
                </div>
                <p className="mt-1 text-[9px] tracking-[0.18em] text-text-slate/45 uppercase">
                  Portfolio Q&A Signal
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-text-slate/70 transition hover:border-white/25 hover:text-linen"
                aria-label="关闭作品集问答智能体"
              >
                <X size={13} />
              </button>
            </div>

            <div className="max-h-[280px] space-y-3 overflow-y-auto px-4 py-4 inner-scroll-viewport">
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
                    onClick={() => sendQuestion(question)}
                    className="border border-white/10 px-2.5 py-1 text-[10px] tracking-[0.08em] text-text-slate/70 transition hover:border-accent-lavender/35 hover:text-linen"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2 border border-white/10 bg-panel-dark/60 px-3 py-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="询问作品集内容..."
                  className="min-w-0 flex-1 bg-transparent text-[12px] text-linen placeholder:text-text-slate/35 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-lavender text-bg-dark transition hover:bg-linen"
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
        <span className="hidden border border-white/10 bg-bg-dark/80 px-3 py-2 text-left text-[9px] uppercase tracking-[0.22em] text-text-slate/55 backdrop-blur-md transition group-hover:border-accent-lavender/30 group-hover:text-linen sm:block">
          Ask Portfolio
        </span>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Mount the component**

Modify `src/App.tsx`:

```tsx
import PortfolioAgent from "./components/PortfolioAgent";
```

Render it after `Navigation`:

```tsx
<PortfolioAgent />
```

- [ ] **Step 3: Run type and build checks**

Run: `npm run lint`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

### Task 3: Browser Verification

**Files:**
- No file changes expected.

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

Expected: Vite serves the app on a local port.

- [ ] **Step 2: Verify desktop behavior**

Open the local URL in the browser and verify:

- Floating `AI` button appears at the lower-left near the project catalog area.
- Clicking opens the panel.
- Suggested questions produce answers.
- Typed question `小红书项目亮点是什么？` produces a Xiaohongshu answer.
- Closing hides the panel.

- [ ] **Step 3: Verify mobile behavior**

At a mobile viewport width:

- Floating button remains accessible.
- Panel fits within the viewport.
- It does not block the top mobile header.

- [ ] **Step 4: Final status check**

Run: `git status --short`

Expected: only intended files changed, with existing unrelated user changes left untouched.
