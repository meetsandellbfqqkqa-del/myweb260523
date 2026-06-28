import assert from "node:assert/strict";
import { Readable } from "node:stream";
import test from "node:test";
import type { IncomingMessage, ServerResponse } from "node:http";
import {
  createPortfolioAgentApiResponse,
  handlePortfolioAgentNodeRequest
} from "./portfolioAgentApi";

function createRequest(method: string, chunks: string[] = []) {
  const req = Readable.from(chunks) as IncomingMessage;
  req.method = method;
  return req;
}

function createResponse() {
  const state = {
    body: "",
    headers: new Map<string, string>(),
    statusCode: 200
  };

  const res = {
    get statusCode() {
      return state.statusCode;
    },
    set statusCode(value: number) {
      state.statusCode = value;
    },
    setHeader(name: string, value: number | string | readonly string[]) {
      state.headers.set(name.toLowerCase(), Array.isArray(value) ? value.join(", ") : String(value));
      return res;
    },
    end(chunk?: unknown) {
      if (chunk !== undefined) {
        state.body += String(chunk);
      }
      return res;
    }
  } as ServerResponse;

  return { res, state };
}

test("creates a portfolio agent API response with an injected answer provider", async () => {
  const response = await createPortfolioAgentApiResponse(
    { question: "介绍一下作品集" },
    {
      answerQuestion: async (question) => {
        assert.equal(question, "介绍一下作品集");
        return {
          answer: "这是实时模型回答。",
          source: "gemini",
          model: "gemini-3.5-flash"
        };
      }
    }
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    answer: "这是实时模型回答。",
    source: "gemini",
    model: "gemini-3.5-flash"
  });
});

test("returns a stable 400 response for empty questions", async () => {
  const response = await createPortfolioAgentApiResponse({ question: "   " });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, {
    error: "Question is required."
  });
});

test("returns 405 for non-POST requests", async () => {
  const { res, state } = createResponse();

  await handlePortfolioAgentNodeRequest(createRequest("GET"), res);

  assert.equal(state.statusCode, 405);
  assert.equal(state.headers.get("allow"), "POST");
  assert.deepEqual(JSON.parse(state.body), {
    error: "Method not allowed."
  });
});

test("returns 400 for invalid JSON request bodies", async () => {
  const { res, state } = createResponse();

  await handlePortfolioAgentNodeRequest(createRequest("POST", ["{"]), res);

  assert.equal(state.statusCode, 400);
  assert.deepEqual(JSON.parse(state.body), {
    error: "Invalid JSON body."
  });
});
