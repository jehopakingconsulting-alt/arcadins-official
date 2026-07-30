import { test } from "node:test";
import assert from "node:assert/strict";
import { validateCurriculum } from "./validate.ts";
import { marketingDigitalV2 } from "./marketing-digital-v2.ts";
import { marketingDigitalV2Bank } from "./question-bank/marketing-digital-v2.ts";
import { toPublicQuestion } from "./question-public.ts";

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

// ─────────────────────────── MODULE 2 ───────────────────────────

test("Module 2 est authored, couvre les semaines 4-6 et compte 12 leçons", () => {
  const m2 = marketingDigitalV2.modules.find((m) => m.index === 2)!;
  assert.deepEqual(m2.weeks, [4, 5, 6]);
  assert.ok(m2.lessons.every((l) => l.authored), "toutes les leçons de M2 doivent être authored");
  assert.ok(m2.lessons.length >= 12, `M2 a ${m2.lessons.length} leçons, attendu >= 12`);
});

test("Module 2 : exactement 20 questions dans la banque", () => {
  const m2Questions = marketingDigitalV2Bank.filter((q) => q.module === 2);
  assert.equal(m2Questions.length, 20);
});

test("Module 2 : chaque leçon authored a activité, critères de réussite et rétroactions", () => {
  const m2 = marketingDigitalV2.modules.find((m) => m.index === 2)!;
  for (const l of m2.lessons) {
    const hasActivity = !!l.activity || (l.interactiveActivities?.length ?? 0) > 0 || !!l.exercise;
    assert.ok(hasActivity, `${l.id} sans activité`);
    assert.ok((l.successCriteria?.length ?? 0) > 0, `${l.id} sans critères de réussite`);
    const hasFeedback = (l.feedbackRules?.length ?? 0) > 0 || (l.interactiveActivities?.some((a) => a.feedback) ?? false);
    assert.ok(hasFeedback, `${l.id} sans rétroaction`);
    const hasBody = (l.content?.length ?? 0) > 0 || (l.sections?.length ?? 0) > 0;
    assert.ok(hasBody, `${l.id} sans contenu`);
  }
});

test("Module 2 : la rubrique du TP totalise 100 points", () => {
  const m2 = marketingDigitalV2.modules.find((m) => m.index === 2)!;
  const rubric = m2.rubric!;
  const sum = rubric.criteria.reduce((acc, c) => acc + c.points, 0);
  assert.equal(sum, 100);
  assert.equal(rubric.totalPoints, 100);
});

test("Module 2 : 3 quiz hebdomadaires valides (>= 8 questions, refs existantes)", () => {
  const m2 = marketingDigitalV2.modules.find((m) => m.index === 2)!;
  const bankIds = new Set(marketingDigitalV2Bank.map((q) => q.id));
  assert.equal(m2.weeklyQuizzes?.length, 3);
  for (const wq of m2.weeklyQuizzes ?? []) {
    assert.ok(wq.questionIds.length >= 8, `${wq.id} a ${wq.questionIds.length} questions`);
    for (const qid of wq.questionIds) assert.ok(bankIds.has(qid), `${wq.id} référence ${qid} absent`);
  }
});

test("Module 2 : liens pédagogiques de continuité avec le Module 1", () => {
  const m2 = marketingDigitalV2.modules.find((m) => m.index === 2)!;
  assert.ok(m2.links);
  assert.ok(m2.links!.prerequisitesFromPrevious.length > 0);
  assert.ok(m2.links!.deliverablesForNextModule.length > 0);
});

test("la vue publique d'une question n'expose ni bonne réponse ni justification", () => {
  const pub = toPublicQuestion(marketingDigitalV2Bank[0]) as unknown as Record<string, unknown>;
  assert.equal("correct" in pub, false);
  assert.equal("explanation" in pub, false);
  assert.equal("feedbackOnError" in pub, false);
  assert.ok(Array.isArray(pub.options));
});

test("aucune leçon authored ne contient de marqueur « À venir »", () => {
  const report = validateCurriculum(marketingDigitalV2, marketingDigitalV2Bank);
  assert.ok(!report.errors.some((e) => e.code === "LESSON_COMING_SOON"));
  assert.ok(!report.errors.some((e) => e.code === "LESSON_FAKE_RECOGNITION"));
});

// ─────────────────────────── MODULE 3 ───────────────────────────

test("Module 3 est authored, couvre les semaines 7-9 et compte 12 leçons", () => {
  const m3 = marketingDigitalV2.modules.find((m) => m.index === 3)!;
  assert.deepEqual(m3.weeks, [7, 8, 9]);
  assert.ok(m3.lessons.every((l) => l.authored), "toutes les leçons de M3 doivent être authored");
  assert.equal(m3.lessons.length, 12);
});

test("Module 3 : exactement 20 questions", () => {
  const m3Questions = marketingDigitalV2Bank.filter((q) => q.module === 3);
  assert.equal(m3Questions.length, 20);
});

test("Module 3 : chaque leçon a étude de cas fictive, activité interactive, critères et rétroactions", () => {
  const m3 = marketingDigitalV2.modules.find((m) => m.index === 3)!;
  for (const l of m3.lessons) {
    assert.ok(l.caseStudy, `${l.id} sans étude de cas`);
    assert.equal(l.caseStudy!.isFictional, true, `${l.id} : étude de cas non identifiée fictive`);
    assert.ok((l.interactiveActivities?.length ?? 0) > 0, `${l.id} sans activité interactive`);
    assert.ok((l.successCriteria?.length ?? 0) > 0, `${l.id} sans critères de réussite`);
    assert.ok((l.feedbackRules?.length ?? 0) > 0, `${l.id} sans rétroaction`);
  }
});

test("Module 3 : la rubrique du projet totalise 100 points", () => {
  const m3 = marketingDigitalV2.modules.find((m) => m.index === 3)!;
  const sum = m3.rubric!.criteria.reduce((acc, c) => acc + c.points, 0);
  assert.equal(sum, 100);
  assert.equal(m3.rubric!.totalPoints, 100);
});

test("Module 3 : 3 quiz hebdomadaires valides + projet pratique présent", () => {
  const m3 = marketingDigitalV2.modules.find((m) => m.index === 3)!;
  const bankIds = new Set(marketingDigitalV2Bank.map((q) => q.id));
  assert.equal(m3.weeklyQuizzes?.length, 3);
  for (const wq of m3.weeklyQuizzes ?? []) {
    assert.ok(wq.questionIds.length >= 8);
    for (const qid of wq.questionIds) assert.ok(bankIds.has(qid), `${wq.id} référence ${qid} absent`);
  }
  assert.ok(m3.assessments.some((a) => a.kind === "practical"));
});

test("Module 3 : métadonnées i18n en français source, sans relecteur validé", () => {
  const m3 = marketingDigitalV2.modules.find((m) => m.index === 3)!;
  assert.equal(m3.contentMeta?.sourceLang, "fr");
  assert.equal(m3.contentMeta?.translationStatus, "source");
});

test("aucune promesse trompeuse non encadrée ni faux témoignage dans les modules authored", () => {
  const report = validateCurriculum(marketingDigitalV2, marketingDigitalV2Bank);
  assert.ok(!report.errors.some((e) => e.code === "LESSON_MISLEADING_PROMISE"), JSON.stringify(report.errors.filter((e) => e.code === "LESSON_MISLEADING_PROMISE")));
  assert.ok(!report.errors.some((e) => e.code === "CASE_NOT_FLAGGED"));
});

// ─────────────────────────── MODULE 4 ───────────────────────────

test("Module 4 est authored, couvre les semaines 10-12 et compte 12 leçons", () => {
  const m4 = marketingDigitalV2.modules.find((m) => m.index === 4)!;
  assert.deepEqual(m4.weeks, [10, 11, 12]);
  assert.ok(m4.lessons.every((l) => l.authored));
  assert.equal(m4.lessons.length, 12);
});

test("Module 4 : exactement 20 questions et banque cumulée = 80", () => {
  const m4Questions = marketingDigitalV2Bank.filter((q) => q.module === 4);
  assert.equal(m4Questions.length, 20);
  assert.equal(marketingDigitalV2Bank.length, 80);
});

test("Module 4 : rubrique 100 pts, projet + mi-parcours présents", () => {
  const m4 = marketingDigitalV2.modules.find((m) => m.index === 4)!;
  const sum = m4.rubric!.criteria.reduce((acc, c) => acc + c.points, 0);
  assert.equal(sum, 100);
  assert.ok(m4.assessments.some((a) => a.kind === "practical"));
  assert.ok(m4.assessments.some((a) => a.kind === "midterm"));
});

test("Module 4 : les formules enseignées sont complètes (nom, expression, exemple)", () => {
  const m4 = marketingDigitalV2.modules.find((m) => m.index === 4)!;
  const formulas = m4.lessons.flatMap((l) => l.formulas ?? []);
  assert.ok(formulas.length >= 5, `attendu >= 5 formules, trouvé ${formulas.length}`);
  for (const f of formulas) {
    assert.ok(f.name.trim() && f.expression.trim() && f.example.trim(), `formule incomplète : ${f.name}`);
  }
});

test("Module 4 : 3 quiz hebdomadaires valides", () => {
  const m4 = marketingDigitalV2.modules.find((m) => m.index === 4)!;
  const bankIds = new Set(marketingDigitalV2Bank.map((q) => q.id));
  assert.equal(m4.weeklyQuizzes?.length, 3);
  for (const wq of m4.weeklyQuizzes ?? []) {
    assert.ok(wq.questionIds.length >= 8);
    for (const qid of wq.questionIds) assert.ok(bankIds.has(qid), `${wq.id} référence ${qid} absent`);
  }
});

test("Module 4 : contenu marqué simulation/fictif, sans promesse de résultat garanti non encadrée", () => {
  const report = validateCurriculum(marketingDigitalV2, marketingDigitalV2Bank);
  assert.ok(!report.errors.some((e) => e.code === "LESSON_MISLEADING_PROMISE"));
  assert.ok(!report.errors.some((e) => e.code === "CASE_NOT_FLAGGED"));
  // Les études de cas de campagne portent la mention de simulation.
  const m4 = marketingDigitalV2.modules.find((m) => m.index === 4)!;
  const simMentions = m4.lessons.filter((l) => /Simulation pédagogique|Jeu de données pédagogique fictif/.test(l.caseStudy?.title ?? "")).length;
  assert.ok(simMentions >= 3, `attendu >= 3 études de cas marquées simulation, trouvé ${simMentions}`);
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
