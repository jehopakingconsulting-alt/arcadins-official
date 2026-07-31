import { test } from "node:test";
import assert from "node:assert/strict";
import { ensureClientSafePayload, inspectClientSafe } from "./ensure-client-safe.ts";

// Sentinelles PRIVÉES : n'existent QUE dans ce test ; ne doivent jamais fuiter.
const S = {
  answer: "PRIVATE_ANSWER_KEY_SENTINEL_K3S",
  option: "PRIVATE_CORRECT_OPTION_SENTINEL_K3S",
  grading: "PRIVATE_GRADING_SENTINEL_K3S",
  explanation: "PRIVATE_EXPLANATION_SENTINEL_K3S",
  rubric: "PRIVATE_RUBRIC_SENTINEL_K3S",
};

test("payload public valide accepté (inchangé)", () => {
  const vm = { scorePercent: 80, passed: true, progress: { answered: 3, total: 5 }, gradingStatus: "graded", correctCount: 3 };
  assert.equal(ensureClientSafePayload(vm), vm);
  assert.equal(inspectClientSafe(vm).safe, true);
});

for (const [label, key] of [
  ["answerKey", "answerKey"],
  ["correctOptionId", "correctOptionId"],
  ["correctAnswer", "correctAnswer"],
  ["privateExplanation", "privateExplanation"],
  ["gradingRules", "gradingRules"],
  ["rubric", "rubric"],
  ["evaluatorNotes", "evaluatorNotes"],
  ["integritySignals", "integritySignals"],
  ["correct (BankQuestion)", "correct"],
  ["questionBank", "questionBank"],
] as const) {
  test(`clé interdite rejetée : ${label}`, () => {
    assert.throws(() => ensureClientSafePayload({ [key]: "x" }), /UNSAFE_CLIENT/);
    assert.equal(inspectClientSafe({ [key]: "x" }).safe, false);
  });
}

test("objet privé IMBRIQUÉ rejeté", () => {
  assert.throws(() => ensureClientSafePayload({ a: { b: { answerKey: [S.answer] } } }), /UNSAFE_CLIENT/);
});

test("tableau contenant un objet privé rejeté", () => {
  assert.throws(() => ensureClientSafePayload({ list: [{ ok: 1 }, { correctOptionId: S.option }] }), /UNSAFE_CLIENT/);
});

test("variante de casse rejetée (AnswerKey / CORRECTANSWER)", () => {
  assert.equal(inspectClientSafe({ AnswerKey: 1 }).safe, false);
  assert.equal(inspectClientSafe({ CORRECTANSWER: 1 }).safe, false);
});

test("champs publics légitimes acceptés (publicScore/gradingStatus/percentage/correctCount)", () => {
  assert.equal(inspectClientSafe({ publicScore: 1, gradingStatus: "ok", percentage: 90, correctCount: 4, resultStatus: "passed" }).safe, true);
});

test("objet cyclique traité sans fuite ni boucle", () => {
  const a: Record<string, unknown> = { x: 1 };
  a.self = a;
  assert.equal(inspectClientSafe(a).safe, true);
  a.answerKey = [S.answer];
  assert.equal(inspectClientSafe(a).safe, false);
});

test("l'erreur ne recopie JAMAIS la valeur secrète", () => {
  try {
    ensureClientSafePayload({ answerKey: [S.answer], privateExplanation: S.explanation });
    assert.fail("aurait dû lever");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    assert.ok(msg.includes("answerKey"), "les NOMS de clés sont signalés");
    for (const v of Object.values(S)) assert.ok(!msg.includes(v), `la valeur secrète ${v} ne doit pas être recopiée`);
  }
});

test("profondeur excessive rejetée proprement", () => {
  let deep: Record<string, unknown> = {};
  const root = deep;
  for (let i = 0; i < 80; i++) { deep.next = {}; deep = deep.next as Record<string, unknown>; }
  assert.throws(() => inspectClientSafe(root), /MAX_DEPTH/);
});

test("aucune mutation de la source", () => {
  const vm = { scorePercent: 50, nested: { a: 1 } };
  const copy = JSON.parse(JSON.stringify(vm));
  ensureClientSafePayload(vm);
  assert.deepEqual(vm, copy);
});

test("déterminisme : mêmes clés fautives à chaque analyse", () => {
  const v = { correctOptionId: 1, answerKey: 2 };
  assert.deepEqual(inspectClientSafe(v).offendingKeys, inspectClientSafe(v).offendingKeys);
});

test("primitives et null sûrs", () => {
  for (const v of [null, undefined, 1, "x", true]) assert.equal(inspectClientSafe(v).safe, true);
});
