import { test } from "node:test";
import assert from "node:assert/strict";
import { composeEntitlements, accessExpiry } from "./entitlement.ts";
import { validateCoupon, isDiscountApplicable, discountAmount, scholarshipAmount } from "./discounts.ts";
import { quoteOffer } from "./pricing.ts";
import type { Coupon, Discount, EntitlementGrant, Offer, Package, QuoteContext, Scholarship } from "./types.ts";

const NOW = new Date("2026-08-01T00:00:00Z");

function pkg(grants: EntitlementGrant[], over: Partial<Package> = {}): Package {
  return { id: "pk", slug: over.slug ?? "premium", productId: "pr", kind: "single", name: "Premium", description: null, grants, sort: 0, active: true, ...over };
}
function offer(over: Partial<Offer> = {}): Offer {
  return { id: "of", sku: "SKU", packageId: "pk", currency: over.currency ?? "USD", countryScope: over.countryScope ?? [], amountCents: over.amountCents ?? 24700, billing: over.billing ?? "one_time", interval: null, accessModel: over.accessModel ?? "limited", accessWeeks: over.accessWeeks ?? 6, stripePriceId: null, activeFrom: over.activeFrom ?? null, activeTo: over.activeTo ?? null, active: over.active ?? true };
}
function ctx(over: Partial<QuoteContext> = {}): QuoteContext {
  return { currency: over.currency ?? "USD", country: over.country ?? null, now: over.now ?? NOW, taxBps: over.taxBps, campaignDiscount: over.campaignDiscount ?? null, coupon: over.coupon ?? null, scholarship: over.scholarship ?? null };
}

// ── Composition ──────────────────────────────────────────────────────────────
test("composeEntitlements: somme + max + niveau support le plus élevé + AI illimité", () => {
  const e = composeEntitlements([
    { type: "product_access", productSlug: "tef-canada", accessModel: "limited", weeks: 6 },
    { type: "product_access", productSlug: "tef-canada", accessModel: "limited", weeks: 12 },
    { type: "mock_exam_pack", attempts: 2 },
    { type: "mock_exam_pack", attempts: 3 },
    { type: "coaching_hours", hours: 2 },
    { type: "ai_assistant", quota: 100 },
    { type: "ai_assistant", quota: "unlimited" },
    { type: "support_level", level: "priority" },
    { type: "support_level", level: "vip" },
    { type: "downloadable_resources", scope: "all" },
  ]);
  assert.deepEqual(e.productSlugs, ["tef-canada"]);
  assert.equal(e.accessWeeks, 12, "max des semaines");
  assert.equal(e.mockAttempts, 5, "somme des tentatives");
  assert.equal(e.coachingHours, 2);
  assert.equal(e.aiAssistant, "unlimited", "illimité l'emporte");
  assert.equal(e.supportLevel, "vip");
  assert.deepEqual(e.downloadableResources, ["all"]);
});

test("composeEntitlements: lifetime écrase weeks ; bundle ajoute des produits", () => {
  const e = composeEntitlements([
    { type: "product_access", accessModel: "lifetime" },
    { type: "product_access", productSlug: "x", accessModel: "limited", weeks: 8 },
    { type: "bundle_products", productSlugs: ["tef-canada", "tcf-canada"] },
  ]);
  assert.equal(e.accessModel, "lifetime");
  assert.equal(e.accessWeeks, null);
  assert.deepEqual(e.productSlugs, ["tcf-canada", "tef-canada", "x"]);
  assert.equal(accessExpiry(e, NOW), null, "lifetime = pas d'expiration");
});

// ── Réductions ────────────────────────────────────────────────────────────────
test("discountAmount: percent en bps + fixed borné à la base", () => {
  const pct: Discount = { id: "d", name: "25%", kind: "percent", value: 2500, appliesScope: {}, redemptions: 0, active: true };
  assert.equal(discountAmount(pct, 24700), 6175);
  const fixed: Discount = { id: "d2", name: "-$500", kind: "fixed", value: 999999, appliesScope: {}, redemptions: 0, active: true };
  assert.equal(discountAmount(fixed, 24700), 24700, "fixed ne dépasse pas la base");
});

test("isDiscountApplicable: portée devise/produit + fenêtre + quota", () => {
  const d: Discount = { id: "d", name: "c", kind: "percent", value: 1000, appliesScope: { currencies: ["USD"], productSlugs: ["tef-canada"] }, startsAt: "2026-07-01T00:00:00Z", endsAt: "2026-09-01T00:00:00Z", maxRedemptions: 100, redemptions: 100, active: true };
  assert.equal(isDiscountApplicable(d, { productSlug: "tef-canada", currency: "USD" }, NOW), false, "quota épuisé");
  const d2 = { ...d, redemptions: 0 };
  assert.equal(isDiscountApplicable(d2, { productSlug: "tef-canada", currency: "USD" }, NOW), true);
  assert.equal(isDiscountApplicable(d2, { productSlug: "tcf-canada", currency: "USD" }, NOW), false, "hors produit");
  assert.equal(isDiscountApplicable(d2, { productSlug: "tef-canada", currency: "CAD" }, NOW), false, "hors devise");
});

test("validateCoupon: quota par utilisateur + coupon inactif", () => {
  const d: Discount = { id: "d", name: "c", kind: "percent", value: 1000, appliesScope: {}, redemptions: 0, active: true };
  const c: Coupon = { code: "WELCOME", discountId: "d", maxRedemptions: null, perUserLimit: 1, active: true };
  assert.equal(validateCoupon(c, d, { currency: "USD" }, NOW, 0).valid, true);
  assert.equal(validateCoupon(c, d, { currency: "USD" }, NOW, 1).reason, "coupon_user_limit");
  assert.equal(validateCoupon({ ...c, active: false }, d, { currency: "USD" }, NOW, 0).reason, "coupon_inactive");
});

test("scholarshipAmount: full = base, partial = percentBps, hors fenêtre = 0", () => {
  const full: Scholarship = { id: "s", kind: "full", status: "active" };
  assert.equal(scholarshipAmount(full, 24700, NOW), 24700);
  const partial: Scholarship = { id: "s2", kind: "partial", percentBps: 5000, status: "active" };
  assert.equal(scholarshipAmount(partial, 24700, NOW), 12350);
  const expired: Scholarship = { id: "s3", kind: "full", status: "active", endsAt: "2026-07-01T00:00:00Z" };
  assert.equal(scholarshipAmount(expired, 24700, NOW), 0);
});

// ── Moteur de devis ────────────────────────────────────────────────────────────
test("quoteOffer: prix de base + entitlement composé + surcharge d'accès par l'offre", () => {
  const q = quoteOffer(offer({ amountCents: 24700, accessModel: "limited", accessWeeks: 6 }), pkg([{ type: "mock_exam_pack", attempts: 3 }, { type: "product_access", productSlug: "tef-canada", accessModel: "limited", weeks: 4 }]), ctx());
  assert.equal(q.ok, true);
  assert.equal(q.totalCents, 24700);
  assert.equal(q.entitlement.accessWeeks, 6, "l'offre surcharge la durée d'accès");
  assert.equal(q.entitlement.mockAttempts, 3);
});

test("quoteOffer: devise/pays/fenêtre bloquent la vente", () => {
  assert.equal(quoteOffer(offer({ currency: "USD" }), pkg([]), ctx({ currency: "CAD" })).errors[0], "currency_mismatch");
  assert.equal(quoteOffer(offer({ countryScope: ["CA"] }), pkg([]), ctx({ country: "HT" })).errors[0], "country_out_of_scope");
  assert.equal(quoteOffer(offer({ activeTo: "2026-07-01T00:00:00Z" }), pkg([]), ctx()).errors[0], "offer_ended");
});

test("quoteOffer: empilement bourse→coupon→campagne + taxe sur remisé", () => {
  const coupon: Coupon = { code: "SAVE10", discountId: "d", maxRedemptions: null, perUserLimit: 5, active: true };
  const couponDiscount: Discount = { id: "d", name: "SAVE10", kind: "percent", value: 1000, appliesScope: {}, redemptions: 0, active: true };
  const partial: Scholarship = { id: "s", kind: "partial", percentBps: 5000, status: "active" };
  const campaign: Discount = { id: "c", name: "Rentrée", kind: "fixed", value: 1000, appliesScope: {}, redemptions: 0, active: true };
  const q = quoteOffer(offer({ amountCents: 20000 }), pkg([]), ctx({
    taxBps: 1500, scholarship: partial, campaignDiscount: campaign,
    coupon: { coupon, discount: couponDiscount, userRedemptions: 0 },
  }));
  // 20000 -50% bourse =10000 ; -10% coupon =9000 ; -1000 campagne =8000 ; +15% taxe =1200 → 9200
  assert.deepEqual(q.discountLines.map((l) => l.amountCents), [10000, 1000, 1000]);
  assert.equal(q.discountedCents, 8000);
  assert.equal(q.taxCents, 1200);
  assert.equal(q.totalCents, 9200);
});

test("quoteOffer: coupon invalide → erreur non bloquante, prix de base conservé", () => {
  const coupon: Coupon = { code: "X", discountId: "d", maxRedemptions: null, perUserLimit: 1, active: true };
  const d: Discount = { id: "d", name: "x", kind: "percent", value: 1000, appliesScope: {}, redemptions: 0, active: true };
  const q = quoteOffer(offer({ amountCents: 9700 }), pkg([]), ctx({ coupon: { coupon, discount: d, userRedemptions: 3 } }));
  assert.equal(q.ok, false);
  assert.equal(q.errors[0], "coupon:coupon_user_limit");
  assert.equal(q.totalCents, 9700, "aucune remise appliquée");
});
