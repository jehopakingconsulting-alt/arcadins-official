// Parrainage — logique pure (sans I/O), testable en isolation.
// Aucune commission n'est calculée si le programme est désactivé.

import {
  REFERRAL_ENABLED,
  REFERRAL_PLAN,
  MAX_GENERATIONS,
  tierForGeneration,
} from "./data/referral-config.ts";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sans I,O,0,1 ambigus

/** Génère un code de parrainage lisible (ex. "ARC-7K9QX2"). */
export function generateReferralCode(rand: () => number = Math.random): string {
  let body = "";
  for (let i = 0; i < 6; i++) {
    body += CODE_ALPHABET[Math.floor(rand() * CODE_ALPHABET.length)];
  }
  return `ARC-${body}`;
}

export interface CommissionLine {
  beneficiaryId: string;
  generation: number;
  ratePercent: number;
  commissionCents: number;
}

/**
 * Calcule les commissions d'une vente réelle, réparties sur la chaîne de
 * parrains. `chain[0]` est le parrain direct (génération 1), `chain[1]` le
 * grand-parrain (génération 2), etc. La chaîne est tronquée à MAX_GENERATIONS.
 *
 * Renvoie [] si le programme est désactivé ou si la vente est nulle.
 * Les montants sont en cents (entiers), arrondis à l'entier inférieur.
 */
export function computeCommissions(
  saleAmountCents: number,
  chain: string[],
): CommissionLine[] {
  // Interrupteur maître : rien tant que le programme n'est pas activé.
  if (!REFERRAL_ENABLED) return [];
  return computeCommissionLines(saleAmountCents, chain);
}

/**
 * Cœur de calcul, INDÉPENDANT du flag d'activation (pour les tests et pour un
 * appel déjà gardé par REFERRAL_ENABLED en amont). Ne pas exposer côté client
 * sans vérifier le flag.
 */
export function computeCommissionLines(
  saleAmountCents: number,
  chain: string[],
): CommissionLine[] {
  if (!Number.isFinite(saleAmountCents) || saleAmountCents <= 0) return [];

  const lines: CommissionLine[] = [];
  const depth = Math.min(chain.length, MAX_GENERATIONS);
  for (let i = 0; i < depth; i++) {
    const generation = i + 1;
    const tier = tierForGeneration(generation);
    if (!tier || tier.ratePercent <= 0) continue;
    const commissionCents = Math.floor((saleAmountCents * tier.ratePercent) / 100);
    if (commissionCents <= 0) continue;
    lines.push({
      beneficiaryId: chain[i],
      generation,
      ratePercent: tier.ratePercent,
      commissionCents,
    });
  }
  return lines;
}

/** Total des commissions d'une vente (cents) — utile pour le contrôle. */
export function totalCommissionCents(lines: CommissionLine[]): number {
  return lines.reduce((sum, l) => sum + l.commissionCents, 0);
}

export { REFERRAL_PLAN };
