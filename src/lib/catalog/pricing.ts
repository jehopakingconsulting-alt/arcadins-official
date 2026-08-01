/**
 * ARCADINS — Sélection de tarif PURE (générique). Horloge injectée (déterministe).
 * Choisit le prix applicable pour une devise à un instant donné (promo datée gérée).
 * PUR / node-testable. Imports RELATIFS uniquement.
 */
import type { ProductPrice } from "./types.ts";

/** Une promo est active si active + fenêtre [starts, ends] contient `now` (bornes optionnelles). */
export function isPromoActive(price: ProductPrice, now: Date): boolean {
  if (price.promoStarts && now < new Date(price.promoStarts)) return false;
  if (price.promoEnds && now > new Date(price.promoEnds)) return false;
  return Boolean(price.promoLabel);
}

/**
 * Prix applicable pour une devise à `now` : filtre actif + devise, écarte les promos hors fenêtre,
 * puis renvoie le montant le plus bas actuellement valide (promo en cours prioritaire à montant égal).
 * Renvoie null si aucun prix valide pour la devise.
 */
export function selectActivePrice(
  prices: readonly ProductPrice[],
  currency: string,
  now: Date,
): ProductPrice | null {
  const eligible = prices.filter((p) => {
    if (!p.active) return false;
    if (p.currency.toUpperCase() !== currency.toUpperCase()) return false;
    // Un prix promotionnel hors fenêtre n'est pas éligible ; un prix non promo l'est toujours.
    if (p.promoLabel) return isPromoActive(p, now);
    return true;
  });
  if (eligible.length === 0) return null;
  return [...eligible].sort((a, b) => {
    if (a.amountCents !== b.amountCents) return a.amountCents - b.amountCents;
    // à montant égal, préférer une promo active (mise en avant)
    return (b.promoLabel ? 1 : 0) - (a.promoLabel ? 1 : 0);
  })[0];
}

/** Devises distinctes disponibles pour un ensemble de prix actifs. */
export function availableCurrencies(prices: readonly ProductPrice[]): string[] {
  return [...new Set(prices.filter((p) => p.active).map((p) => p.currency.toUpperCase()))].sort();
}
