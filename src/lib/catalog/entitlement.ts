/**
 * ARCADINS — Résolution de droits (entitlement) PURE, générique. Horloge injectée.
 * À l'inscription, fige un snapshot de droits à partir du forfait choisi (aucune logique produit).
 * PUR / node-testable. Imports RELATIFS uniquement.
 */
import type { Entitlement, ProductPackage } from "./types.ts";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Fige les droits à partir d'un forfait, à `startsAt`. La fenêtre d'accès = accessWeeks semaines.
 * Résultat immuable, stocké tel quel dans enrollments.entitlement (jamais recalculé côté client).
 */
export function resolveEntitlement(pkg: ProductPackage, startsAt: Date): Entitlement {
  const expires = new Date(startsAt.getTime() + pkg.accessWeeks * WEEK_MS);
  return {
    accessWeeks: pkg.accessWeeks,
    mockAttempts: pkg.mockAttempts,
    coachingHours: pkg.coachingHours,
    supportLevel: pkg.supportLevel,
    accessStartsAt: startsAt.toISOString(),
    accessExpiresAt: expires.toISOString(),
  };
}

/** L'accès est-il encore valide à `now` selon l'entitlement figé ? (décision serveur uniquement). */
export function isAccessActive(entitlement: Entitlement, now: Date): boolean {
  return now <= new Date(entitlement.accessExpiresAt);
}
