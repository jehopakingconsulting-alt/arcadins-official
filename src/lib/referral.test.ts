import { test } from "node:test";
import assert from "node:assert/strict";
import {
  generateReferralCode,
  computeCommissions,
  computeCommissionLines,
  totalCommissionCents,
} from "./referral.ts";
import { REFERRAL_ENABLED, REFERRAL_PLAN } from "./data/referral-config.ts";

test("le code de parrainage a le format ARC-XXXXXX (alphabet non ambigu)", () => {
  const code = generateReferralCode(() => 0.5);
  assert.match(code, /^ARC-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/);
});

test("le programme est désactivé par défaut → computeCommissions renvoie []", () => {
  assert.equal(REFERRAL_ENABLED, false);
  assert.deepEqual(computeCommissions(150000, ["a", "b", "c"]), []);
});

test("computeCommissionLines applique les taux du plan par génération", () => {
  // Vente de 1500,00 CAD = 150000 cents. Plan par défaut 10 / 5 / 2 %.
  const lines = computeCommissionLines(150000, ["p1", "p2", "p3"]);
  assert.equal(lines.length, 3);
  assert.deepEqual(lines[0], { beneficiaryId: "p1", generation: 1, ratePercent: REFERRAL_PLAN[0].ratePercent, commissionCents: Math.floor(150000 * REFERRAL_PLAN[0].ratePercent / 100) });
  assert.equal(lines[1].beneficiaryId, "p2");
  assert.equal(lines[2].generation, 3);
});

test("la chaîne est tronquée à la profondeur du plan", () => {
  const lines = computeCommissionLines(150000, ["p1", "p2", "p3", "p4", "p5"]);
  assert.equal(lines.length, REFERRAL_PLAN.length);
});

test("une vente nulle ou négative ne génère aucune commission", () => {
  assert.deepEqual(computeCommissionLines(0, ["p1"]), []);
  assert.deepEqual(computeCommissionLines(-100, ["p1"]), []);
});

test("les montants sont des entiers (cents) et le total est cohérent", () => {
  const lines = computeCommissionLines(99999, ["p1", "p2", "p3"]);
  for (const l of lines) assert.ok(Number.isInteger(l.commissionCents));
  assert.equal(totalCommissionCents(lines), lines.reduce((s, l) => s + l.commissionCents, 0));
});
