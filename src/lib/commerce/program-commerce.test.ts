import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildProgramCheckoutPlan,
  getProgramOffer,
  getProgramGrants,
  isProgramCode,
  REGISTRATION_FEE_CENTS,
  PROGRAM_CURRENCY,
} from "./program-commerce.ts";
import { composeEntitlements } from "../catalog/entitlement.ts";

test("devise = USD, frais d'inscription = $100", () => {
  assert.equal(PROGRAM_CURRENCY, "usd");
  assert.equal(REGISTRATION_FEE_CENTS, 10_000);
});

test("tiers TEF/TCF : montants confirmés", () => {
  for (const program of ["tef-canada", "tcf-canada"] as const) {
    assert.equal(getProgramOffer(program, "starter")!.amountCents, 9_700);
    assert.equal(getProgramOffer(program, "essential")!.amountCents, 14_700);
    assert.equal(getProgramOffer(program, "premium")!.amountCents, 24_700);
    assert.equal(getProgramOffer(program, "vip")!.amountCents, 34_700);
  }
});

test("VIP = 12 semaines d'accès ; autres = 6", () => {
  assert.equal(getProgramOffer("tef-canada", "vip")!.accessWeeks, 12);
  assert.equal(getProgramOffer("tef-canada", "starter")!.accessWeeks, 6);
});

test("nouvel étudiant : frais d'inscription + forfait (TEF Starter = $197)", () => {
  const plan = buildProgramCheckoutPlan({
    program: "tef-canada",
    packageKey: "starter",
    userId: "user-1",
    registrationFeeAlreadyPaid: false,
  });
  assert.equal(plan.ok, true);
  assert.equal(plan.mode, "payment");
  assert.equal(plan.currency, "usd");
  assert.equal(plan.registrationFeeIncluded, true);
  assert.equal(plan.lineItems.length, 2);
  assert.equal(plan.lineItems[0].kind, "registration_fee");
  assert.equal(plan.lineItems[0].amountCents, 10_000);
  assert.equal(plan.lineItems[1].kind, "package");
  assert.equal(plan.lineItems[1].amountCents, 9_700);
  assert.equal(plan.totalCents, 19_700); // $197.00
});

test("étudiant existant (frais déjà payés) : forfait seul, JAMAIS deux fois (TCF VIP = $347)", () => {
  const plan = buildProgramCheckoutPlan({
    program: "tcf-canada",
    packageKey: "vip",
    userId: "user-2",
    registrationFeeAlreadyPaid: true,
  });
  assert.equal(plan.ok, true);
  assert.equal(plan.registrationFeeIncluded, false);
  assert.equal(plan.lineItems.length, 1);
  assert.equal(plan.lineItems[0].kind, "package");
  assert.equal(plan.totalCents, 34_700); // $347.00, aucun frais
});

test("métadonnées webhook cohérentes (programme, forfait, fee flag)", () => {
  const plan = buildProgramCheckoutPlan({
    program: "tcf-canada",
    packageKey: "premium",
    userId: "user-3",
    registrationFeeAlreadyPaid: false,
  });
  assert.equal(plan.metadata!.type, "program-purchase");
  assert.equal(plan.metadata!.program, "tcf-canada");
  assert.equal(plan.metadata!.packageKey, "premium");
  assert.equal(plan.metadata!.userId, "user-3");
  assert.equal(plan.metadata!.registrationFeeIncluded, true);
  assert.equal(plan.metadata!.accessWeeks, "6");
});

test("programme inconnu rejeté", () => {
  const plan = buildProgramCheckoutPlan({
    program: "marketing-digital",
    packageKey: "starter",
    userId: "user-4",
    registrationFeeAlreadyPaid: false,
  });
  assert.equal(plan.ok, false);
  assert.equal(plan.error, "unknown_program");
});

test("forfait inconnu rejeté", () => {
  const plan = buildProgramCheckoutPlan({
    program: "tef-canada",
    packageKey: "diamond",
    userId: "user-5",
    registrationFeeAlreadyPaid: false,
  });
  assert.equal(plan.ok, false);
  assert.equal(plan.error, "unknown_package");
});

test("non authentifié rejeté (pas de userId)", () => {
  const plan = buildProgramCheckoutPlan({
    program: "tef-canada",
    packageKey: "starter",
    userId: "",
    registrationFeeAlreadyPaid: false,
  });
  assert.equal(plan.ok, false);
  assert.equal(plan.error, "unauthenticated");
});

test("isProgramCode : ne reconnaît que TEF/TCF", () => {
  assert.equal(isProgramCode("tef-canada"), true);
  assert.equal(isProgramCode("tcf-canada"), true);
  assert.equal(isProgramCode("informatique"), false);
});

test("grants : achat TEF ne débloque QUE TEF (séparation stricte)", () => {
  const ent = composeEntitlements(getProgramGrants("tef-canada", "premium")!);
  assert.deepEqual(ent.productSlugs, ["tef-canada"]);
  assert.ok(!ent.productSlugs.includes("tcf-canada"));
});

test("grants : achat TCF ne débloque QUE TCF", () => {
  const ent = composeEntitlements(getProgramGrants("tcf-canada", "starter")!);
  assert.deepEqual(ent.productSlugs, ["tcf-canada"]);
});

test("grants VIP : 12 semaines, coaching, tutorat, IA illimitée, support vip", () => {
  const ent = composeEntitlements(getProgramGrants("tef-canada", "vip")!);
  assert.equal(ent.accessWeeks, 12);
  assert.equal(ent.mockAttempts, 6);
  assert.equal(ent.coachingHours, 4);
  assert.equal(ent.tutoringSessions, 2);
  assert.equal(ent.aiAssistant, "unlimited");
  assert.equal(ent.supportLevel, "vip");
});

test("grants Starter : 6 semaines, 1 examen blanc, support standard, pas de coaching", () => {
  const ent = composeEntitlements(getProgramGrants("tcf-canada", "starter")!);
  assert.equal(ent.accessWeeks, 6);
  assert.equal(ent.mockAttempts, 1);
  assert.equal(ent.coachingHours, 0);
  assert.equal(ent.supportLevel, "standard");
});

test("grants : programme/forfait inconnu → null", () => {
  assert.equal(getProgramGrants("informatique", "starter"), null);
  assert.equal(getProgramGrants("tef-canada", "diamond"), null);
});
