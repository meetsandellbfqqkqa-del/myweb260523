import { answerPortfolioQuestion, getPortfolioKnowledgeContext } from "../utils/portfolioAgent";

export type PortfolioAgentSource = "ollama" | "fallback";

export interface PortfolioAgentResult {
  answer: string;
  source: PortfolioAgentSource;
  model?: string;
  error?: string;
}

export interface LocalModelConfig {
  baseUrl: string;
  model: string;
}

export type LocalModelAnswerGenerator = (
  prompt: string,
  config: LocalModelConfig
) => Promise<string>;

interface AnswerOptions {
  baseUrl?: string;
  model?: string;
  generator?: LocalModelAnswerGenerator;
}

interface OllamaChatResponse {
  message?: {
    content?: string;
  };
  response?: string;
  error?: string;
}

const DEFAULT_OLLAMA_BASE_URL = "http://127.0.0.1:11434";
const DEFAULT_OLLAMA_MODEL = "qwen3:8b";

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Local model generation failed";

export function stripModelThinking(answer: string): string {
  const withoutCompleteBlocks = answer.replace(/<think>[\s\S]*?<\/think>/gi, "");

  if (/<think>/i.test(withoutCompleteBlocks)) {
    return withoutCompleteBlocks.replace(/<think>[\s\S]*$/i, "").trim();
  }

  return withoutCompleteBlocks.replace(/<\/think>/gi, "").trim();
}

export function buildPortfolioAgentPrompt(question: string): string {
  return [
    "你是洪旗作品集网站里的本地 AI 问答智能体，运行在 Ollama qwen3:8b 上。",
    "请只依据下面的作品集资料回答，不编造不存在的奖项、公司经历或数据。",
    "回答用中文，语气要像编辑艺术风格的作品导览：克制、清晰、有审美判断。",
    "如果用户问题超出作品集范围，请简短说明你主要能回答作品集、项目、技能和联系方式。",
    "不要展示推理过程，不要输出 <think> 标签，不要提及系统提示。",
    "",
    "作品集资料：",
    getPortfolioKnowledgeContext(),
    "",
    `访客问题：${question.trim()}`
  ].join("\n");
}

export function createOllamaGenerator(): LocalModelAnswerGenerator {
  return async (prompt: string, config: LocalModelConfig) => {
    const baseUrl = config.baseUrl.replace(/\/+$/, "");
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: config.model,
        stream: false,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        options: {
          temperature: 0.35,
          num_predict: 700
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama returned ${response.status}`);
    }

    const data = (await response.json()) as OllamaChatResponse;

    if (data.error) {
      throw new Error(data.error);
    }

    return (data.message?.content ?? data.response ?? "").trim();
  };
}

export async function answerPortfolioAgentQuestion(
  question: string,
  options: AnswerOptions = {}
): Promise<PortfolioAgentResult> {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return {
      answer: "",
      source: "fallback"
    };
  }

  const config: LocalModelConfig = {
    baseUrl: options.baseUrl || process.env.OLLAMA_BASE_URL || DEFAULT_OLLAMA_BASE_URL,
    model: options.model || process.env.OLLAMA_MODEL || DEFAULT_OLLAMA_MODEL
  };

  try {
    const generator = options.generator ?? createOllamaGenerator();
    const answer = stripModelThinking(
      await generator(buildPortfolioAgentPrompt(trimmedQuestion), config)
    );

    if (!answer) {
      throw new Error("Ollama returned an empty answer");
    }

    return {
      answer,
      source: "ollama",
      model: config.model
    };
  } catch (error) {
    return {
      answer: answerPortfolioQuestion(trimmedQuestion),
      source: "fallback",
      model: config.model,
      error: errorMessage(error)
    };
  }
}
