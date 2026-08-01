/**
 * ARCADINS — Moteur de tarification PUR (le cœur commercial). Déterministe, horloge
 * injectée, AUCUN appel Stripe/réseau. Calcule un devis complet à partir d'une offre
 * vendable + contexte acheteur (devise, pays, coupon, bourse, campagne, taxe).
 * Empilement déterministe : bourse → coupon → campagne, chaque ligne sur le sous-total
 * courant, borné à 0. Taxe sur le sous-total remisé. Imports RELATIFS uniquement.
 */
import type { DiscountScopeCtx } from "./discounts.ts";
import type { Offer, Package, PriceQuote, QuoteContext, DiscountLine } from "./types.ts";
import { composeEntitlements } from "./entitlement.ts";
import { discountAmount, isDiscountApplicable, scholarshipAmount, validateCoupon } from "./discounts.ts";

function offerSellable(offer: Offer, currency: string, country: string | null | undefined, now: Date): string | null {
  if (!offer.active) return "offer_inactive";
  if (offer.currency.toUpperCase() !== currency.toUpperCase()) return "currency_mismatch";
  if (offer.activeFrom && now < new Date(offer.activeFrom)) return "offer_not_started";
  if (offer.activeTo && now > new Date(offer.activeTo)) return "offer_ended";
  if (offer.countryScope.length && country && !offer.countryScope.map((c) => c.toUpperCase()).includes(country.toUpperCase())) return "country_out_of_scope";
  return null;
}

/**
 * Devis complet. `pkg` doit être le package référencé par `offer.packageId`.
 * L'offre peut surcharger le modèle d'accès (limited/lifetime + weeks) des grants.
 */
export function quoteOffer(offer: Offer, pkg: Package, ctx: QuoteContext, productSlug?: string | null): PriceQuote {
  const errors: string[] = [];
  const base: PriceQuote = {
    ok: false, errors, currency: offer.currency, billing: offer.billing,
    baseCents: offer.amountCents, discountLines: [], discountedCents: offer.amountCents,
    taxCents: 0, totalCents: offer.amountCents,
    entitlement: composeEntitlements(pkg.grants),
  };

  const sellErr = offerSellable(offer, ctx.currency, ctx.country, ctx.now);
  if (sellErr) { errors.push(sellErr); return base; }

  // Surcharge du modèle d'accès par l'offre (source de vérité commerciale).
  const ent = composeEntitlements(pkg.grants);
  ent.accessModel = offer.accessModel;
  ent.accessWeeks = offer.accessModel === "lifetime" ? null : (offer.accessWeeks ?? ent.accessWeeks);
  base.entitlement = ent;

  const scopeCtx: DiscountScopeCtx = { productSlug, packageSlug: pkg.slug, currency: ctx.currency };
  const lines: DiscountLine[] = [];
  let running = offer.amountCents;

  // 1) Bourse (prioritaire — peut annuler tout le prix).
  if (ctx.scholarship) {
    const amt = scholarshipAmount(ctx.scholarship, running, ctx.now);
    if (amt > 0) { lines.push({ source: "scholarship", label: ctx.scholarship.kind === "full" ? "Bourse (100%)" : "Bourse", amountCents: amt }); running -= amt; }
  }

  // 2) Coupon (validé ; sinon erreur non bloquante signalée).
  if (running > 0 && ctx.coupon) {
    const chk = validateCoupon(ctx.coupon.coupon, ctx.coupon.discount, scopeCtx, ctx.now, ctx.coupon.userRedemptions);
    if (chk.valid) {
      const amt = discountAmount(ctx.coupon.discount, running);
      if (amt > 0) { lines.push({ source: "coupon", label: ctx.coupon.coupon.code, amountCents: amt }); running -= amt; }
    } else {
      errors.push(`coupon:${chk.reason}`);
    }
  }

  // 3) Campagne automatique (si applicable).
  if (running > 0 && ctx.campaignDiscount && isDiscountApplicable(ctx.campaignDiscount, scopeCtx, ctx.now)) {
    const amt = discountAmount(ctx.campaignDiscount, running);
    if (amt > 0) { lines.push({ source: "campaign", label: ctx.campaignDiscount.name, amountCents: amt }); running -= amt; }
  }

  const discounted = Math.max(0, running);
  const taxBps = ctx.taxBps ?? 0;
  const tax = Math.round((discounted * taxBps) / 10_000);

  return {
    ok: errors.length === 0,
    errors,
    currency: offer.currency,
    billing: offer.billing,
    baseCents: offer.amountCents,
    discountLines: lines,
    discountedCents: discounted,
    taxCents: tax,
    totalCents: discounted + tax,
    entitlement: ent,
  };
}
