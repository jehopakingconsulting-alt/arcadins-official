import { test } from "node:test";
import assert from "node:assert/strict";
import { validateCurriculum } from "./validate.ts";
import { marketingDigitalV2 } from "./marketing-digital-v2.ts";
import { marketingDigitalV2Bank } from "./question-bank/marketing-digital-v2.ts";

test("le cursus Marketing v2 passe la validation sans erreur", () => {
  const report = validateCurriculum(marketingDigitalV2, marketingDigitalV2Bank);
  assert.deepEqual(report.errors, [], `erreurs: ${JSON.stringify(report.errors, null, 2)}`);
  assert.equal(report.ok, true);
});

test("structure : 8 modules, 24 semaines, pondération = 100", () => {
  const report = validateCurriculum(marketingDigitalV2, marketingDigitalV2Bank);
  assert.equal(report.stats.modules, 8);
  assert.equal(report.stats.weeksCovered, 24);
  assert.equal(report.stats.weightsSum, 100);
});

test("Module 1 est authored et couvert par >= 20 questions", () => {
  const m1 = marketingDigitalV2.modules.find((m) => m.index === 1)!;
  assert.ok(m1.lessons.every((l) => l.authored), "toutes les leçons de M1 doivent être authored");
  const m1Questions = marketingDigitalV2Bank.filter((q) => q.module === 1);
  assert.ok(m1Questions.length >= 20, `M1 a ${m1Questions.length} questions, attendu >= 20`);
});

test("aucun identifiant de leçon ni de question dupliqué", () => {
  const lessonIds = marketingDigitalV2.modules.flatMap((m) => m.lessons.map((l) => l.id));
  assert.equal(new Set(lessonIds).size, lessonIds.length);
  const qIds = marketingDigitalV2Bank.map((q) => q.id);
  assert.equal(new Set(qIds).size, qIds.length);
});

test("chaque quiz de leçon authored référence des questions existantes de la banque", () => {
  const bankIds = new Set(marketingDigitalV2Bank.map((q) => q.id));
  for (const m of marketingDigitalV2.modules) {
    for (const l of m.lessons) {
      for (const qid of l.quiz?.questionIds ?? []) {
        assert.ok(bankIds.has(qid), `${l.id} référence ${qid} absent de la banque`);
      }
    }
  }
});

test("la validation détecte une pondération incorrecte", () => {
  const broken = { ...marketingDigitalV2, weights: { ...marketingDigitalV2.weights, finalExam: 99 } };
  const report = validateCurriculum(broken, marketingDigitalV2Bank);
  assert.equal(report.ok, false);
  assert.ok(report.errors.some((e) => e.code === "WEIGHTS_SUM"));
});

test("la validation détecte un trou de semaine", () => {
  const broken = {
    ...marketingDigitalV2,
    modules: marketingDigitalV2.modules.map((m, i) =>
      i === 0 ? { ...m, weeks: [1, 2, 99] as [number, number, number] } : m,
    ),
  };
  const report = validateCurriculum(broken, marketingDigitalV2Bank);
  assert.equal(report.ok, false);
  assert.ok(report.errors.some((e) => e.code === "WEEK_GAP"));
});
