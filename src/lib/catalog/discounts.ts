/**
 * ARCADINS — Validation & calcul de réductions PURS (coupons, bourses, campagnes).
 * Déterministe, horloge injectée. Aucune énumération de code côté client (validé serveur).
 * Imports RELATIFS uniquement.
 */
import type { Coupon, Discount, Scholarship } from "./types.ts";

export interface DiscountScopeCtx { productSlug?: string | null; packageSlug?: string | null; currency: string }

function inWindow(startsAt: string | null | undefined, endsAt: string | null | undefined, now: Date): boolean {
  if (startsAt && now < new Date(startsAt)) return false;
  if (endsAt && now > new Date(endsAt)) return false;
  return true;
}

/** Une réduction s'applique-t-elle (fenêtre + portée produit/package/devise + quota global) ? */
export function isDiscountApplicable(d: Discount, ctx: DiscountScopeCtx, now: Date): boolean {
  if (!d.active) return false;
  if (!inWindow(d.startsAt, d.endsAt, now)) return false;
  if (d.maxRedemptions != null && d.redemptions >= d.maxRedemptions) return false;
  const s = d.appliesScope || {};
  if (s.currencies && s.currencies.length && !s.currencies.map((c) => c.toUpperCase()).includes(ctx.currency.toUpperCase())) return false;
  if (s.productSlugs && s.productSlugs.length && !(ctx.productSlug && s.productSlugs.includes(ctx.productSlug))) return false;
  if (s.packageSlugs && s.packageSlugs.length && !(ctx.packageSlug && s.packageSlugs.includes(ctx.packageSlug))) return false;
  return true;
}

/** Montant remisé (cents) d'une réduction sur une base, borné à la base. */
export function discountAmount(d: Discount, baseCents: number): number {
  const raw = d.kind === "percent" ? Math.round((baseCents * d.value) / 10_000) : d.value;
  return Math.max(0, Math.min(raw, baseCents));
}

export interface CouponCheck { valid: boolean; reason?: string }

/** Validation coupon PURE : actif, réduction applicable, quotas global + par utilisateur. */
export function validateCoupon(
  coupon: Coupon, discount: Discount, ctx: DiscountScopeCtx, now: Date, userRedemptions: number,
): CouponCheck {
  if (!coupon.active) return { valid: false, reason: "coupon_inactive" };
  if (coupon.maxRedemptions != null && discount.redemptions >= coupon.maxRedemptions) return { valid: false, reason: "coupon_exhausted" };
  if (userRedemptions >= coupon.perUserLimit) return { valid: false, reason: "coupon_user_limit" };
  if (!isDiscountApplicable(discount, ctx, now)) return { valid: false, reason: "discount_not_applicable" };
  return { valid: true };
}

/** Montant remisé par une bourse (full = base entière ; partial = percentBps). */
export function scholarshipAmount(s: Scholarship, baseCents: number, now: Date): number {
  if (s.status !== "active") return 0;
  if (!inWindow(s.startsAt, s.endsAt, now)) return 0;
  if (s.kind === "full") return baseCents;
  const bps = s.percentBps ?? 0;
  return Math.max(0, Math.min(Math.round((baseCents * bps) / 10_000), baseCents));
}
