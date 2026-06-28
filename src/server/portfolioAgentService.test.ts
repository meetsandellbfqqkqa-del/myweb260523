import assert from "node:assert/strict";
import test from "node:test";
import {
  answerPortfolioAgentQuestion,
  buildPortfolioAgentPrompt,
  stripModelThinking,
  type GeminiModelAnswerGenerator,
  type LocalModelAnswerGenerator
} from "./portfolioAgentService";

test("builds an AI agent prompt with portfolio context and visitor question", () => {
  const prompt = buildPortfolioAgentPrompt("这个作品集主要展示了什么？");

  assert.match(prompt, /作品集资料/);
  assert.match(prompt, /滴滴产品实习总结/);
  assert.match(prompt, /小红书市集体验提升/);
  assert.match(prompt, /快手2025年度回忆/);
  assert.match(prompt, /访客问题：这个作品集主要展示了什么？/);
  assert.match(prompt, /不要展示推理过程/);
});

test("uses the Gemini generator when an API key is configured", async () => {
  let receivedPrompt = "";
  const geminiGenerator: GeminiModelAnswerGenerator = async (prompt, config) => {
    receivedPrompt = prompt;
    assert.equal(config.apiKey, "test-gemini-key");
    assert.equal(config.model, "gemini-3.5-flash");
    return "这是 Gemini 实时生成的作品集回答。";
  };

  const result = await answerPortfolioAgentQuestion("洪旗有哪些项目？", {
    geminiApiKey: "test-gemini-key",
    geminiModel: "gemini-3.5-flash",
    geminiGenerator,
    useOllama: false
  });

  assert.match(receivedPrompt, /洪旗有哪些项目/);
  assert.deepEqual(result, {
    answer: "这是 Gemini 实时生成的作品集回答。",
    source: "gemini",
    model: "gemini-3.5-flash"
  });
});

test("uses the local Qwen3 Ollama generator when available", async () => {
  let receivedPrompt = "";
  const generator: LocalModelAnswerGenerator = async (prompt, config) => {
    receivedPrompt = prompt;
    assert.equal(config.model, "qwen3:8b");
    assert.equal(config.baseUrl, "http://127.0.0.1:11434");
    return "这是 qwen3:8b 本地模型生成的作品集回答。";
  };

  const result = await answerPortfolioAgentQuestion("洪旗会哪些技能？", {
    geminiApiKey: null,
    generator
  });

  assert.match(receivedPrompt, /洪旗会哪些技能/);
  assert.deepEqual(result, {
    answer: "这是 qwen3:8b 本地模型生成的作品集回答。",
    source: "ollama",
    model: "qwen3:8b"
  });
});

test("removes Qwen thinking tags before returning an answer", async () => {
  const generator: LocalModelAnswerGenerator = async () =>
    "<think>先分析作品集结构。</think>\n作品集重点是 UX、AIGC 与三段项目经历。";

  const result = await answerPortfolioAgentQuestion("简单介绍一下", {
    geminiApiKey: null,
    generator
  });

  assert.equal(result.source, "ollama");
  assert.equal(result.answer, "作品集重点是 UX、AIGC 与三段项目经历。");
});

test("falls back to local portfolio knowledge when Ollama generation fails", async () => {
  const generator: LocalModelAnswerGenerator = async () => {
    throw new Error("Ollama is not running");
  };

  const result = await answerPortfolioAgentQuestion("滴滴项目做了什么？", {
    geminiApiKey: null,
    generator
  });

  assert.equal(result.source, "fallback");
  assert.match(result.answer, /滴滴/);
  assert.match(result.answer, /花小猪/);
  assert.equal(result.model, "qwen3:8b");
  assert.equal(result.error, "Ollama is not running");
});

test("falls back to local portfolio knowledge when Gemini generation fails", async () => {
  const geminiGenerator: GeminiModelAnswerGenerator = async () => {
    throw new Error("Gemini is unavailable");
  };

  const result = await answerPortfolioAgentQuestion("小红书项目做了什么？", {
    geminiApiKey: "test-gemini-key",
    geminiModel: "gemini-3.5-flash",
    geminiGenerator,
    useOllama: false
  });

  assert.equal(result.source, "fallback");
  assert.equal(result.model, "gemini-3.5-flash");
  assert.match(result.answer, /小红书|市集/);
  assert.equal(result.error, "Gemini is unavailable");
});

test("does not call Gemini or Ollama for blank questions", async () => {
  let calls = 0;
  const generator: LocalModelAnswerGenerator = async () => {
    calls += 1;
    return "should not run";
  };

  const geminiGenerator: GeminiModelAnswerGenerator = async () => {
    calls += 1;
    return "should not run";
  };

  const result = await answerPortfolioAgentQuestion("   ", {
    geminiApiKey: "test-gemini-key",
    geminiGenerator,
    generator
  });

  assert.equal(calls, 0);
  assert.deepEqual(result, {
    answer: "",
    source: "fallback"
  });
});

test("stripModelThinking removes complete and open thinking blocks", () => {
  assert.equal(stripModelThinking("<think>hidden</think>\n可见答案"), "可见答案");
  assert.equal(stripModelThinking("<think>hidden only"), "");
});
