import { answerPortfolioQuestion } from "./portfolioAgent";

export type PortfolioAgentSource = "ollama" | "fallback";

export interface PortfolioAgentClientResult {
  answer: string;
  source: PortfolioAgentSource;
  model?: string;
  error?: string;
}

export type PortfolioAgentFetch = typeof fetch;

const apiErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Portfolio agent request failed";

const normalizeAgentResult = (
  data: Partial<PortfolioAgentClientResult>
): PortfolioAgentClientResult => {
  if (typeof data.answer !== "string") {
    throw new Error("Agent API returned an invalid answer");
  }

  return {
    answer: data.answer,
    source: data.source === "ollama" ? "ollama" : "fallback",
    model: typeof data.model === "string" ? data.model : undefined,
    error: typeof data.error === "string" ? data.error : undefined
  };
};

export async function askPortfolioAgent(
  question: string,
  fetcher: PortfolioAgentFetch = fetch
): Promise<PortfolioAgentClientResult> {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return {
      answer: "",
      source: "fallback"
    };
  }

  try {
    const response = await fetcher("/api/portfolio-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
  } catch (error) {
    return {
      answer: answerPortfolioQuestion(trimmedQuestion),
      source: "fallback",
      error: apiErrorMessage(error)
    };
  }
}
