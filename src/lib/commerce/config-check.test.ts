import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluateCommerceConfig } from "./config-check.ts";

const full = {
  STRIPE_SECRET_KEY: "sk_test_realkey123",
  STRIPE_WEBHOOK_SECRET: "whsec_abc",
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "pk_test_abc",
  SUPABASE_SERVICE_ROLE_KEY: "service-role-xyz",
  NEXT_PUBLIC_SUPABASE_URL: "https://real.supabase.co",
  PROGRAM_CHECKOUT_ENABLED: "true",
};

test("flag OFF → jamais activable, production inchangée", () => {
  const s = evaluateCommerceConfig({ ...full, PROGRAM_CHECKOUT_ENABLED: "false" });
  assert.equal(s.flagOn, false);
  assert.equal(s.canActivate, false);
});

test("flag ON + config complète → activable", () => {
  const s = evaluateCommerceConfig(full);
  assert.equal(s.canActivate, true);
  assert.equal(s.missing.length, 0);
  assert.equal(s.stripePlaceholder, false);
});

test("flag ON mais secrets manquants → refus (pas de repli silencieux)", () => {
  const s = evaluateCommerceConfig({ PROGRAM_CHECKOUT_ENABLED: "true" });
  assert.equal(s.canActivate, false);
  assert.ok(s.missing.includes("STRIPE_SECRET_KEY"));
  assert.ok(s.missing.includes("STRIPE_WEBHOOK_SECRET"));
});

test("clé Stripe placeholder détectée (aucun paiement réel possible)", () => {
  const s = evaluateCommerceConfig({ ...full, STRIPE_SECRET_KEY: "sk_test_placeholder" });
  assert.equal(s.stripePlaceholder, true);
  assert.equal(s.canActivate, false);
  assert.ok(s.missing.includes("STRIPE_SECRET_KEY"));
});
