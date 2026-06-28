import { answerPortfolioQuestion } from "./portfolioAgent";

export type PortfolioAgentSource = "gemini" | "ollama" | "fallback";

export interface PortfolioAgentClientResult {
  answer: string;
  source: PortfolioAgentSource;
  model?: string;
  error?: string;
}

export type PortfolioAgentFetch = typeof fetch;

interface AskPortfolioAgentOptions {
  timeoutMs?: number;
}

const DEFAULT_AGENT_TIMEOUT_MS = 16000;

const apiErrorMessage = (error: unknown) =>
  typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError"
    ? "Portfolio agent request timed out"
    : error instanceof Error ? error.message : "Portfolio agent request failed";

const normalizeAgentResult = (
  data: Partial<PortfolioAgentClientResult>
): PortfolioAgentClientResult => {
  if (typeof data.answer !== "string") {
    throw new Error("Agent API returned an invalid answer");
  }

  return {
    answer: data.answer,
    source:
      data.source === "gemini" || data.source === "ollama"
        ? data.source
        : "fallback",
    model: typeof data.model === "string" ? data.model : undefined,
    error: typeof data.error === "string" ? data.error : undefined
  };
};

export async function askPortfolioAgent(
  question: string,
  fetcher: PortfolioAgentFetch = fetch,
  options: AskPortfolioAgentOptions = {}
): Promise<PortfolioAgentClientResult> {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return {
      answer: "",
      source: "fallback"
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeoutMs ?? DEFAULT_AGENT_TIMEOUT_MS
    );

    try {
      const response = await fetcher("/api/portfolio-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          question: trimmedQuestion
        })
      });

      if (!response.ok) {
        throw new Error(`Agent API returned ${response.status}`);
      }

      return normalizeAgentResult(
        (await response.json()) as Partial<PortfolioAgentClientResult>
      );
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    return {
      answer: answerPortfolioQuestion(trimmedQuestion),
      source: "fallback",
      error: apiErrorMessage(error)
    };
  }
}
