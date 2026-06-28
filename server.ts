import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createPortfolioAgentApiResponse } from "./src/server/portfolioAgentApi";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "dist");

app.use(express.json({ limit: "1mb" }));

app.post("/api/portfolio-agent", async (req, res) => {
  try {
    const response = await createPortfolioAgentApiResponse(req.body ?? {});
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unexpected server error."
    });
  }
});

app.use(express.static(distPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Portfolio server listening on http://localhost:${port}`);
});
