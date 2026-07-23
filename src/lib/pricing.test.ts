import { test } from "node:test";
import assert from "node:assert/strict";
import { getInstallmentPlan, getFullPaymentTotal, REGISTRATION_FEE } from "./pricing.ts";

test("les frais d'inscription sont de 100 CAD", () => {
  assert.equal(REGISTRATION_FEE, 100);
});

test("un prix de 1500 se divise en 3 versements de 500", () => {
  const plan = getInstallmentPlan(1500);
  assert.deepEqual(plan.installments, [500, 500, 500]);
  assert.equal(plan.total, 1500);
});

test("les versements somment toujours exactement au prix (reste absorbé par le 1er)", () => {
  for (const price of [1000, 1250, 1499, 1600, 2000, 3500]) {
    const { installments, total } = getInstallmentPlan(price);
    assert.equal(installments[0] + installments[1] + installments[2], price);
    assert.equal(total, price);
    // les deux derniers versements sont égaux
    assert.equal(installments[1], installments[2]);
  }
});

test("getFullPaymentTotal renvoie le prix tel quel", () => {
  assert.equal(getFullPaymentTotal(1500), 1500);
});
