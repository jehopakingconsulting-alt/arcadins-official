export const REGISTRATION_FEE = 100;
export const PAYMENT_DEADLINE_DAYS = 30;

export interface InstallmentPlan {
  installments: [number, number, number];
  total: number;
}

/**
 * Splits a course price into 3 monthly installments as evenly as possible.
 * Recurring installments are rounded down; the first installment absorbs any
 * remainder so the three always sum exactly to `price`. The $100 registration
 * fee is paid separately, upfront, before this plan begins.
 */
export function getInstallmentPlan(price: number): InstallmentPlan {
  const recurring = Math.floor(price / 3);
  const first = price - 2 * recurring;
  return {
    installments: [first, recurring, recurring],
    total: price,
  };
}

export function getFullPaymentTotal(price: number): number {
  return price;
}

// build-marker: 2026-08-05 — rebuild propre (invalidation cache Vercel) pour publier le correctif #418.
/**
 * Formate un entier avec séparateur de milliers DÉTERMINISTE (espace insécable),
 * identique côté serveur et côté client. Contrairement à `Number.toLocaleString()`
 * sans locale — dont le résultat dépend de la locale ICU du runtime (Node vs
 * navigateur) et provoque un mismatch d'hydratation (React #418) — cette fonction
 * n'utilise aucune donnée de locale. Ex. : 1500 → "1 500".
 */
export function formatPrice(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
