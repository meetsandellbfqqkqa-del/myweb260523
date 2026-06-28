import { Buffer } from "node:buffer";
import type { IncomingMessage, ServerResponse } from "node:http";
import { answerPortfolioAgentQuestion } from "./portfolioAgentService";

interface PortfolioAgentRequestBody {
  question?: unknown;
}

interface ApiResponse {
  status: number;
  body: object;
}

export async function readJsonRequestBody(req: IncomingMessage): Promise<PortfolioAgentRequestBody> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) return {};

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return JSON.parse(rawBody) as PortfolioAgentRequestBody;
}

export async function createPortfolioAgentApiResponse(
  body: PortfolioAgentRequestBody
): Promise<ApiResponse> {
  const question = typeof body.question === "string" ? body.question : "";

  if (!question.trim()) {
    return {
      status: 400,
      body: {
        error: "Question is required."
      }
    };
  }

  const result = await answerPortfolioAgentQuestion(question);

  return {
    status: 200,
    body: result
  };
}

export function writeJsonResponse(res: ServerResponse, status: number, body: object) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export async function handlePortfolioAgentNodeRequest(
  req: IncomingMessage,
  res: ServerResponse
) {
  if (req.method !== "POST") {
    writeJsonResponse(res, 405, { error: "Method not allowed." });
    return;
  }

  try {
    const body = await readJsonRequestBody(req);
    const response = await createPortfolioAgentApiResponse(body);
    writeJsonResponse(res, response.status, response.body);
  } catch (error) {
    writeJsonResponse(res, 500, {
      error: error instanceof Error ? error.message : "Unexpected server error."
    });
  }
}
