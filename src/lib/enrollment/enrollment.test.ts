import { test } from "node:test";
import assert from "node:assert/strict";
import { provisionEnrollment, isEnrollmentActive } from "./provision.ts";
import type { EnrollmentRecord, ProvisionContext } from "./provision.ts";
import type { Offer, Package } from "../catalog/types.ts";

const NOW = new Date("2026-08-01T00:00:00Z");

function pkg(over: Partial<Package> = {}): Package {
  return { id: "pk", slug: "tef-premium", productId: "pr", kind: "single", name: "Premium",
    grants: over.grants ?? [{ type: "product_access", productSlug: "tef-canada", accessModel: "limited", weeks: 6 }, { type: "mock_exam_pack", attempts: 3 }],
    sort: 0, active: true, ...over };
}
function offer(over: Partial<Offer> = {}): Offer {
  return { id: "of", sku: "S", packageId: "pk", currency: "USD", countryScope: [], amountCents: 24700, billing: over.billing ?? "one_time", interval: null, accessModel: over.accessModel ?? "limited", accessWeeks: over.accessWeeks ?? 6, stripePriceId: null, activeFrom: null, activeTo: null, active: true };
}
function ctx(over: Partial<ProvisionContext> = {}): ProvisionContext {
  return { userId: "u1", learnerId: "u1", product: { id: "prod-tef", programId: "prog-tef" }, package: pkg(), offer: offer(), source: over.source ?? "one_time", now: NOW, ...over };
}

test("provision: one-time crée l'inscription + entitlement composé + expiration", () => {
  const { record, created } = provisionEnrollment(ctx());
  assert.equal(created, true);
  assert.equal(record.status, "active");
  assert.equal(record.entitlement.mockAttempts, 3);
  assert.equal(record.accessExpiresAt, new Date("2026-09-12T00:00:00Z").toISOString(), "6 semaines");
  assert.equal(record.source, "one_time");
});

test("provision: IDEMPOTENT — inscription existante renvoyée, jamais dupliquée", () => {
  const existing: EnrollmentRecord = { ...provisionEnrollment(ctx()).record, accessExpiresAt: "2099-01-01T00:00:00Z" };
  const { record, created } = provisionEnrollment(ctx(), existing);
  assert.equal(created, false);
  assert.equal(record.accessExpiresAt, "2099-01-01T00:00:00Z", "progression/état préservés");
});

test("provision: lifetime → pas d'expiration", () => {
  const { record } = provisionEnrollment(ctx({ source: "lifetime", offer: offer({ accessModel: "lifetime", billing: "lifetime" }) }));
  assert.equal(record.accessExpiresAt, null);
  assert.equal(record.entitlement.accessModel, "lifetime");
  assert.equal(isEnrollmentActive(record, new Date("2099-01-01T00:00:00Z")), true);
});

test("provision: subscription → expiration = fin de période", () => {
  const end = new Date("2026-09-01T00:00:00Z");
  const { record } = provisionEnrollment(ctx({ source: "subscription", offer: offer({ billing: "subscription" }), subscriptionPeriodEnd: end }));
  assert.equal(record.accessExpiresAt, end.toISOString());
});

test("provision: scholarship / institution license sans offre payante", () => {
  const s = provisionEnrollment(ctx({ source: "scholarship", offer: null }));
  assert.equal(s.record.source, "scholarship");
  assert.equal(s.record.offerId, null);
  const lic = provisionEnrollment(ctx({ source: "institution_license", offer: null, licenseId: "lic-1" }));
  assert.equal(lic.record.licenseId, "lic-1");
  assert.equal(lic.record.source, "institution_license");
});

test("isEnrollmentActive: fenêtre respectée + statut", () => {
  const { record } = provisionEnrollment(ctx());
  assert.equal(isEnrollmentActive(record, new Date("2026-08-15T00:00:00Z")), true);
  assert.equal(isEnrollmentActive(record, new Date("2026-10-01T00:00:00Z")), false);
  assert.equal(isEnrollmentActive({ ...record, status: "suspended" }, NOW), false);
});
