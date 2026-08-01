import { test } from "node:test";
import assert from "node:assert/strict";
import { selectActivePrice, isPromoActive, availableCurrencies } from "./pricing.ts";
import { resolveEntitlement, isAccessActive } from "./entitlement.ts";
import type { ProductPrice, ProductPackage } from "./types.ts";

const NOW = new Date("2026-08-01T00:00:00Z");

function price(p: Partial<ProductPrice>): ProductPrice {
  return {
    id: p.id ?? "px", packageId: "pk", currency: p.currency ?? "USD",
    amountCents: p.amountCents ?? 9700, billing: p.billing ?? "one_time",
    interval: p.interval ?? null, stripePriceId: p.stripePriceId ?? null,
    promoLabel: p.promoLabel ?? null, promoStarts: p.promoStarts ?? null,
    promoEnds: p.promoEnds ?? null, active: p.active ?? true,
  };
}

test("selectActivePrice: filtre par devise", () => {
  const prices = [price({ id: "usd", currency: "USD", amountCents: 9700 }), price({ id: "cad", currency: "CAD", amountCents: 13000 })];
  assert.equal(selectActivePrice(prices, "CAD", NOW)?.id, "cad");
  assert.equal(selectActivePrice(prices, "EUR", NOW), null, "devise absente → null");
});

test("selectActivePrice: promo hors fenêtre ignorée, promo active choisie", () => {
  const base = price({ id: "base", amountCents: 14700 });
  const promoExpired = price({ id: "old", amountCents: 9900, promoLabel: "-30%", promoEnds: "2026-07-01T00:00:00Z" });
  const promoLive = price({ id: "live", amountCents: 11700, promoLabel: "Rentrée", promoStarts: "2026-07-15T00:00:00Z", promoEnds: "2026-09-01T00:00:00Z" });
  // promo expirée écartée ; le meilleur prix valide à NOW est la promo live (117 < 147).
  assert.equal(selectActivePrice([base, promoExpired, promoLive], "USD", NOW)?.id, "live");
});

test("isPromoActive: bornes optionnelles", () => {
  assert.equal(isPromoActive(price({ promoLabel: "x" }), NOW), true, "sans bornes = active si label");
  assert.equal(isPromoActive(price({ promoLabel: "x", promoStarts: "2026-09-01T00:00:00Z" }), NOW), false);
});

test("availableCurrencies: distinctes + triées + actives", () => {
  const prices = [price({ currency: "usd" }), price({ currency: "USD" }), price({ currency: "CAD" }), price({ currency: "EUR", active: false })];
  assert.deepEqual(availableCurrencies(prices), ["CAD", "USD"]);
});

test("resolveEntitlement: fenêtre d'accès = accessWeeks", () => {
  const pkg: ProductPackage = { id: "pk", productId: "pr", tier: "vip", name: "VIP", accessWeeks: 12, mockAttempts: 6, coachingHours: 4, supportLevel: "vip", perks: [], sort: 0, active: true };
  const ent = resolveEntitlement(pkg, NOW);
  assert.equal(ent.accessExpiresAt, new Date("2026-10-24T00:00:00Z").toISOString(), "12 semaines après NOW");
  assert.equal(ent.mockAttempts, 6);
  assert.equal(isAccessActive(ent, new Date("2026-10-01T00:00:00Z")), true);
  assert.equal(isAccessActive(ent, new Date("2026-11-01T00:00:00Z")), false, "au-delà de la fenêtre");
});
