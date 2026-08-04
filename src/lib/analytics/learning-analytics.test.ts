import { test } from "node:test";
import assert from "node:assert/strict";
import { computeLearningAnalytics, type AnalyticsInput } from "./learning-analytics.ts";

const base: AnalyticsInput = {
  sales: [
    { program: "tef-canada", amountCents: 14700, currency: "usd", at: "2026-08-01T00:00:00Z" },
    { program: "tef-canada", amountCents: 9700, currency: "usd", at: "2026-08-02T00:00:00Z" },
    { program: "marketing-digital", amountCents: 150000, currency: "cad", at: "2026-08-03T00:00:00Z" },
  ],
  enrollments: [
    { program: "tef-canada", userId: "u1", status: "active", at: "2026-08-01T00:00:00Z" },
    { program: "tef-canada", userId: "u2", status: "active", at: "2026-08-02T00:00:00Z" },
    { program: "marketing-digital", userId: "u3", status: "expired", at: "2026-07-01T00:00:00Z" },
  ],
  completions: [
    { program: "tef-canada", userId: "u1", percent: 100, completed: true },
    { program: "tef-canada", userId: "u2", percent: 50, completed: false },
  ],
  exams: [
    { program: "tef-canada", passed: true, score: 80 },
    { program: "tef-canada", passed: false, score: 40 },
  ],
  certificates: [{ program: "tef-canada" }],
};

test("revenu par devise", () => {
  const a = computeLearningAnalytics(base);
  assert.equal(a.revenueByCurrency.usd, 24400); // 147 + 97
  assert.equal(a.revenueByCurrency.cad, 150000);
});

test("comptes de base", () => {
  const a = computeLearningAnalytics(base);
  assert.equal(a.salesCount, 3);
  assert.equal(a.enrollmentsCount, 3);
  assert.equal(a.activeStudents, 2); // u1, u2
  assert.equal(a.certificatesIssued, 1);
});

test("taux de complétion + progression moyenne", () => {
  const a = computeLearningAnalytics(base);
  assert.equal(a.completionRatePct, 50); // 1 terminé / 2 avec progression
  assert.equal(a.avgProgressPct, 75); // (100 + 50) / 2
});

test("taux d'abandon (expiré non terminé)", () => {
  const a = computeLearningAnalytics(base);
  assert.equal(a.dropoutRatePct, 33.3); // 1 abandon (u3 expiré) / 3 inscriptions
});

test("examens : taux de réussite + score moyen", () => {
  const a = computeLearningAnalytics(base);
  assert.equal(a.examPassRatePct, 50);
  assert.equal(a.avgExamScore, 60); // (80 + 40) / 2
});

test("top programmes triés par inscriptions puis revenu", () => {
  const a = computeLearningAnalytics(base);
  assert.equal(a.topPrograms[0].program, "tef-canada"); // 2 inscriptions
  assert.equal(a.topPrograms[0].enrollments, 2);
  assert.equal(a.topPrograms[0].revenueCents, 24400);
});

test("entrées vides → zéros, pas de division par zéro", () => {
  const a = computeLearningAnalytics({ sales: [], enrollments: [], completions: [], exams: [], certificates: [] });
  assert.equal(a.completionRatePct, 0);
  assert.equal(a.avgProgressPct, 0);
  assert.equal(a.dropoutRatePct, 0);
  assert.equal(a.examPassRatePct, 0);
  assert.deepEqual(a.topPrograms, []);
});
