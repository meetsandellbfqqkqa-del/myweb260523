# AI Portfolio Agent Design

## Goal

Add one AI Q&A agent button at the lower-left area of the portfolio project navigation. Visitors can click it to ask about the portfolio content, including the profile, skills, project summaries, and contact details.

## Chosen Direction

Use the **B. Floating Signal** direction:

- A circular `AI` signal button sits near the left catalog navigation bottom on desktop.
- On smaller screens, the button remains accessible as a fixed floating control without blocking the mobile header.
- The button uses the existing editorial art style: dark glass, thin borders, lavender/blue glow, small monospace labels, and soft motion.

## Interaction

- Default state: a compact glowing circular button with a small companion label such as `ASK PORTFOLIO`.
- Open state: a floating panel expands from the button area.
- The panel includes:
  - A short agent identity line, such as `Archive Intelligence`.
  - A scrollable message area.
  - Suggested prompt chips for common questions.
  - A text input and send button.
  - A close control.
- Pressing `Enter` sends a question. Empty questions are ignored.
- The panel should stay visually above page content but below the mobile menu overlay when the menu is open.

## Knowledge Source

The first implementation uses a local deterministic knowledge base instead of a remote model. It should answer from existing portfolio data:

- `profileData`: name, identity, education, interests, skills, email, phone, WeChat, GitHub.
- `projectsData`: three project titles, subtitles, categories, years, and descriptions.
- Project detail context visible in component data:
  - Didi product design internship and Huaxiaozhu coupon/fission activity.
  - Xiaohongshu marketplace outfit experience improvement.
  - Kuaishou 2025 annual memory H5 visual creation.

This keeps the feature reliable in static deployment and avoids requiring an API key.

## Answer Behavior

- Match Chinese user questions by keywords such as `滴滴`, `小红书`, `快手`, `技能`, `联系方式`, `经历`, `项目`, `作品集`, `AI`, `AIGC`, `Figma`.
- If no keyword matches, return a concise overview of the portfolio and suggest asking about one of the three projects or the designer's skills.
- Answers should be short, curated, and written in the same polished Chinese tone as the site.
- The agent must not claim it is connected to a live external model.

## Component Structure

- Add a new React component such as `PortfolioAgent.tsx`.
- Keep local state inside the component: open/closed, input text, message list.
- Derive answers from small helper functions in the same component or a focused local module if the logic grows.
- Mount the component once in `App.tsx` next to `Navigation`, so it appears across the home and project detail views.

## Visual Constraints

- Reuse current Tailwind tokens: `bg-bg-dark`, `panel-dark`, `linen`, `accent-lavender`, `accent-blue`, `text-slate`.
- Keep radius small except the circular button.
- Use `lucide-react` icons where useful.
- Avoid large marketing copy, heavy cards, or bright chatbot styling.
- Ensure text fits on desktop and mobile.

## Verification

- Add focused tests if the project test setup supports them. If no test runner exists, rely on TypeScript build checks and manual browser verification.
- Run `npm run lint` and `npm run build`.
- Verify the button opens/closes, suggested prompts answer, typed questions answer, and layout works on desktop and mobile widths.
