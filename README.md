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
2. Install Ollama and pull the local model:
   `ollama pull qwen3:8b`
3. Optional: copy [.env.example](.env.example) to `.env.local` and adjust `OLLAMA_BASE_URL` / `OLLAMA_MODEL`
4. Run the app:
   `npm run dev`
