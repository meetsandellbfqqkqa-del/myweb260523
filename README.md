<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dfb235e3-2ffa-41fe-9824-1bd2cca5e16f

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Optional for local model fallback: install Ollama and pull the local model:
   `ollama pull qwen3:8b`
3. Optional: copy [.env.example](.env.example) to `.env.local` and set `GEMINI_API_KEY` for live AI responses, or adjust `OLLAMA_BASE_URL` / `OLLAMA_MODEL` for local fallback
4. Run the app:
   `npm run dev`

## Live AI Deployment

The portfolio agent calls `/api/portfolio-agent`. GitHub Pages can host the static Vite build, but it does not run `server.ts` or local Ollama, so live AI responses require a serverless/API host.

Recommended Vercel setup:

1. Import the GitHub repository `meetsandellbfqqkqa-del/myweb260523` into Vercel.
2. Use Framework `Vite`, Build Command `npm run build`, Output Directory `dist`, Production Branch `main`.
3. Add environment variables in Vercel Project Settings:
   `GEMINI_API_KEY=<your Google AI Studio API key>`
   `GEMINI_MODEL=gemini-3.5-flash`
4. Deploy. The Vercel Function at `/api/portfolio-agent` will use Gemini first, local Ollama only in local/dev contexts, and static portfolio fallback if the model is unavailable.
