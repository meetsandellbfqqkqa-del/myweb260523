import type { IncomingMessage, ServerResponse } from "node:http";
import { handlePortfolioAgentNodeRequest } from "../src/server/portfolioAgentApi";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await handlePortfolioAgentNodeRequest(req, res);
}
