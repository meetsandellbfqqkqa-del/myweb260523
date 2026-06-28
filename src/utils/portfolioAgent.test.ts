import test from "node:test";
import assert from "node:assert/strict";
import { answerPortfolioQuestion, suggestedPortfolioQuestions } from "./portfolioAgent";

test("answers Didi project questions from portfolio context", () => {
  const answer = answerPortfolioQuestion("滴滴项目主要做了什么？");

  assert.match(answer, /滴滴/);
  assert.match(answer, /花小猪/);
  assert.match(answer, /券裂变/);
});

test("answers skill questions with design and AI tooling", () => {
  const answer = answerPortfolioQuestion("她会哪些技能？");

  assert.match(answer, /FIGMA|Figma/);
  assert.match(answer, /AIGC/);
  assert.match(answer, /VIBE CODING/);
});

test("answers contact questions with portfolio contact details", () => {
  const answer = answerPortfolioQuestion("如何联系洪旗？");

  assert.match(answer, /2860816256@qq\.com/);
  assert.match(answer, /15228718329/);
});

test("falls back to a concise portfolio overview", () => {
  const answer = answerPortfolioQuestion("随便讲讲");

  assert.match(answer, /作品集/);
  assert.match(answer, /滴滴/);
  assert.match(answer, /小红书/);
  assert.match(answer, /快手/);
});

test("returns an empty string for blank questions", () => {
  assert.equal(answerPortfolioQuestion("   "), "");
});

test("exposes suggested questions for the UI", () => {
  assert.ok(suggestedPortfolioQuestions.length >= 4);
  assert.ok(suggestedPortfolioQuestions.some((question) => question.includes("项目")));
});
