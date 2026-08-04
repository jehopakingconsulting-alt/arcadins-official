import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildFormationCheckoutPlan,
  getFormationOffer,
  getFormationPaymentOptions,
  isSellableFormation,
  splitEqual,
  FORMATION_CURRENCY,
  FORMATION_REGISTRATION_FEE_CENTS,
  FORMATION_BNPL_PROVIDERS,
} from "./formation-commerce.ts";

test("devise = CAD, frais = 100 $, BNPL = Klarna/Affirm/Afterpay", () => {
  assert.equal(FORMATION_CURRENCY, "cad");
  assert.equal(FORMATION_REGISTRATION_FEE_CENTS, 10_000);
  assert.deepEqual([...FORMATION_BNPL_PROVIDERS], ["klarna", "affirm", "afterpay_clearpay"]);
});

test("offre : formation active = 1500 $ ; à venir/inconnue = null", () => {
  assert.equal(getFormationOffer("marketing-digital")!.amountCents, 150_000);
  assert.equal(getFormationOffer("epe"), null);
  assert.equal(isSellableFormation("informatique"), true);
});

test("splitEqual : N versements égaux, somme exacte, 1er absorbe le reste", () => {
  assert.deepEqual(splitEqual(150_000, 3), [50_000, 50_000, 50_000]);
  assert.deepEqual(splitEqual(150_000, 6), [25_000, 25_000, 25_000, 25_000, 25_000, 25_000]);
  const odd = splitEqual(100, 3);
  assert.equal(odd.reduce((a, b) => a + b, 0), 100);
  assert.equal(odd[0], 34);
});

test("options d'affichage : 3 modalités, BNPL seulement sur « 1 fois »", () => {
  const opts = getFormationPaymentOptions("informatique")!;
  assert.equal(opts.length, 3);
  assert.deepEqual(opts.map((o) => o.id), ["full", "installments_3", "installments_6"]);
  assert.equal(opts[0].bnplEligible, true);
  assert.equal(opts[1].bnplEligible, false);
  assert.equal(opts[1].perInstallmentCents, 50_000); // 1500/3
  assert.equal(opts[2].perInstallmentCents, 25_000); // 1500/6
});

test("plan FULL, nouvel étudiant : frais + prix payés aujourd'hui, BNPL éligible", () => {
  const plan = buildFormationCheckoutPlan({ slug: "informatique", userId: "u1", planId: "full", registrationFeeAlreadyPaid: false });
  assert.equal(plan.ok, true);
  assert.equal(plan.mode, "payment");
  assert.equal(plan.bnplEligible, true);
  assert.equal(plan.dueTodayCents, 160_000); // 100 + 1500
  assert.equal(plan.totalContractCents, 160_000);
  assert.equal(plan.cycles, 1);
});

test("plan 3 VERSEMENTS : abonnement, mensualité 500 $, frais au 1er", () => {
  const plan = buildFormationCheckoutPlan({ slug: "finance", userId: "u2", planId: "installments_3", registrationFeeAlreadyPaid: false });
  assert.equal(plan.mode, "subscription");
  assert.equal(plan.cycles, 3);
  assert.equal(plan.recurringCents, 50_000);
  assert.equal(plan.dueTodayCents, 60_000); // 100 frais + 500 (1er versement)
  assert.equal(plan.totalContractCents, 160_000); // 100 + 1500
  assert.equal(plan.bnplEligible, false);
});

test("plan 6 VERSEMENTS : 6 cycles, mensualité 250 $", () => {
  const plan = buildFormationCheckoutPlan({ slug: "rh", userId: "u3", planId: "installments_6", registrationFeeAlreadyPaid: false });
  assert.equal(plan.cycles, 6);
  assert.equal(plan.recurringCents, 25_000);
  assert.equal(plan.dueTodayCents, 35_000); // 100 + 250
});

test("frais déjà payé : non refacturé (dueToday réduit)", () => {
  const plan = buildFormationCheckoutPlan({ slug: "finance", userId: "u4", planId: "full", registrationFeeAlreadyPaid: true });
  assert.equal(plan.registrationFeeIncluded, false);
  assert.equal(plan.dueTodayCents, 150_000); // prix seul, sans frais
});

test("erreurs : formation inconnue, plan inconnu, non authentifié", () => {
  assert.equal(buildFormationCheckoutPlan({ slug: "xxx", userId: "u", registrationFeeAlreadyPaid: false }).error, "unknown_formation");
  // @ts-expect-error plan invalide
  assert.equal(buildFormationCheckoutPlan({ slug: "rh", userId: "u", planId: "monthly", registrationFeeAlreadyPaid: false }).error, "unknown_plan");
  assert.equal(buildFormationCheckoutPlan({ slug: "rh", userId: "", registrationFeeAlreadyPaid: false }).error, "unauthenticated");
});
