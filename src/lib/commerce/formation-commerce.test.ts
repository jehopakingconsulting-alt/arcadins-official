import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildFormationCheckoutPlan,
  getFormationOffer,
  isSellableFormation,
  FORMATION_CURRENCY,
  FORMATION_REGISTRATION_FEE_CENTS,
} from "./formation-commerce.ts";

test("devise = CAD, frais d'inscription = 100 $", () => {
  assert.equal(FORMATION_CURRENCY, "cad");
  assert.equal(FORMATION_REGISTRATION_FEE_CENTS, 10_000);
});

test("offre : formation active = 1500 $ (150000 cents)", () => {
  const o = getFormationOffer("marketing-digital");
  assert.ok(o);
  assert.equal(o!.amountCents, 150_000);
});

test("formation « à venir » ou inconnue → non vendable", () => {
  assert.equal(getFormationOffer("epe"), null); // comingSoon
  assert.equal(getFormationOffer("nexiste-pas"), null);
  assert.equal(isSellableFormation("epe"), false);
  assert.equal(isSellableFormation("informatique"), true);
});

test("nouvel étudiant : frais + formation (total 1600 $)", () => {
  const plan = buildFormationCheckoutPlan({ slug: "informatique", userId: "u1", registrationFeeAlreadyPaid: false });
  assert.equal(plan.ok, true);
  assert.equal(plan.currency, "cad");
  assert.equal(plan.mode, "payment");
  assert.equal(plan.registrationFeeIncluded, true);
  assert.equal(plan.lineItems.length, 2);
  assert.equal(plan.totalCents, 160_000); // 100 + 1500
});

test("étudiant existant (frais déjà payés) : formation seule, jamais deux fois", () => {
  const plan = buildFormationCheckoutPlan({ slug: "finance", userId: "u2", registrationFeeAlreadyPaid: true });
  assert.equal(plan.registrationFeeIncluded, false);
  assert.equal(plan.lineItems.length, 1);
  assert.equal(plan.lineItems[0].kind, "formation");
  assert.equal(plan.totalCents, 150_000);
});

test("métadonnées webhook cohérentes", () => {
  const plan = buildFormationCheckoutPlan({ slug: "rh", userId: "u3", registrationFeeAlreadyPaid: false });
  assert.equal(plan.metadata!.type, "formation-purchase");
  assert.equal(plan.metadata!.slug, "rh");
  assert.equal(plan.metadata!.userId, "u3");
});

test("formation inconnue / non authentifié rejetés", () => {
  assert.equal(buildFormationCheckoutPlan({ slug: "xxx", userId: "u", registrationFeeAlreadyPaid: false }).error, "unknown_formation");
  assert.equal(buildFormationCheckoutPlan({ slug: "rh", userId: "", registrationFeeAlreadyPaid: false }).error, "unauthenticated");
});
