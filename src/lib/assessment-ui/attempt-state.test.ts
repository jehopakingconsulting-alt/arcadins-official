import { test } from "node:test";
import assert from "node:assert/strict";
import { createAttempt, setAnswer, toggleAnswer, goTo, nextQuestion, prevQuestion, isAnswered, answeredCount, isComplete, progressPercent, toSubmission } from "./attempt-state.ts";
import type { PublicQuestionViewModel } from "../runtime/ui/view-models.ts";

const Q: PublicQuestionViewModel[] = [
  { questionId: "q1", kind: "single", prompt: "?", options: [{ id: "a", label: "A" }, { id: "b", label: "B" }], points: 1 },
  { questionId: "q2", kind: "multiple", prompt: "?", options: [{ id: "x", label: "X" }, { id: "y", label: "Y" }], points: 2 },
  { questionId: "q3", kind: "short_answer", prompt: "?", points: 1 },
];

test("createAttempt + navigation bornée", () => {
  let s = createAttempt(Q);
  assert.equal(s.currentIndex, 0);
  s = nextQuestion(s); assert.equal(s.currentIndex, 1);
  s = goTo(s, 99); assert.equal(s.currentIndex, 2, "borné à la dernière");
  s = prevQuestion(prevQuestion(prevQuestion(s))); assert.equal(s.currentIndex, 0, "borné à 0");
});

test("setAnswer / toggle (multiple) déterministe", () => {
  let s = createAttempt(Q);
  s = setAnswer(s, "q1", "a");
  assert.equal(isAnswered(s, "q1"), true);
  s = toggleAnswer(s, "q2", "x");
  s = toggleAnswer(s, "q2", "y");
  s = toggleAnswer(s, "q2", "x"); // décoche x
  assert.deepEqual(s.answers["q2"], ["y"]);
});

test("answeredCount / isComplete / progress", () => {
  let s = createAttempt(Q);
  assert.equal(isComplete(s), false);
  assert.equal(progressPercent(s), 0);
  s = setAnswer(s, "q1", "a");
  s = setAnswer(s, "q2", ["x"]);
  assert.equal(answeredCount(s), 2);
  assert.equal(progressPercent(s), 67);
  s = setAnswer(s, "q3", "réponse");
  assert.equal(isComplete(s), true);
  assert.equal(progressPercent(s), 100);
});

test("isAnswered ignore vide/blancs", () => {
  let s = createAttempt(Q);
  s = setAnswer(s, "q3", "   ");
  assert.equal(isAnswered(s, "q3"), false);
  s = setAnswer(s, "q2", []);
  assert.equal(isAnswered(s, "q2"), false);
});

test("toSubmission = réponses fournies, AUCUN barème", () => {
  let s = createAttempt(Q);
  s = setAnswer(s, "q1", "a");
  s = setAnswer(s, "q3", "x");
  const sub = toSubmission(s);
  assert.deepEqual(sub, [{ questionId: "q1", value: "a" }, { questionId: "q3", value: "x" }]);
  assert.ok(!JSON.stringify(sub).includes("correct"), "aucune donnée de correction");
});
