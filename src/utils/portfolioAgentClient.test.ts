import assert from "node:assert/strict";
import test from "node:test";
import {
  askPortfolioAgent,
  type PortfolioAgentFetch
} from "./portfolioAgentClient";

test("uses the Ollama API answer when the portfolio agent endpoint succeeds", async () => {
  let requestBody = "";
  const fetcher: PortfolioAgentFetch = async (input, init) => {
    assert.equal(input, "/api/portfolio-agent");
    requestBody = String(init?.body);

    return new Response(
      JSON.stringify({
        answer: "这是 qwen3:8b 本地模型生成的作品集回答。",
        source: "ollama",
        model: "qwen3:8b"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  };

  const result = await askPortfolioAgent(" 项目亮点是什么？ ", fetcher);

  assert.equal(JSON.parse(requestBody).question, "项目亮点是什么？");
  assert.equal(result.answer, "这是 qwen3:8b 本地模型生成的作品集回答。");
  assert.equal(result.source, "ollama");
  assert.equal(result.model, "qwen3:8b");
});

test("falls back to local portfolio knowledge when the API request fails", async () => {
  const fetcher: PortfolioAgentFetch = async () => {
    throw new Error("network unavailable");
  };

  const result = await askPortfolioAgent("他有什么技能？", fetcher);

  assert.equal(result.source, "fallback");
  assert.match(result.answer, /产品设计|交互设计|视觉表达/);
  assert.equal(result.error, "network unavailable");
});

test("does not call the API for blank questions", async () => {
  let calls = 0;
  const fetcher: PortfolioAgentFetch = async () => {
    calls += 1;
    return new Response("{}");
  };

  const result = await askPortfolioAgent("   ", fetcher);

  assert.equal(calls, 0);
  assert.deepEqual(result, {
    answer: "",
    source: "fallback"
  });
});
