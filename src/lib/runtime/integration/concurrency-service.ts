/**
 * Runtime — Integration : AcademicConcurrencyService (Sprint I).
 *
 * Contrôle optimiste de version (compare-and-swap logique). PUR. Couvre : deux onglets, reprise hors ligne,
 * double clic, soumission concurrente, multi-appareils, mise à jour tuteur pendant activité, examen soumis
 * pendant expiration.
 */
import type { ConcurrencyCheck, VersionedEntity } from "./types.ts";

export const AcademicConcurrencyService = {
  /** Compare la version attendue à la version courante ; renvoie la version suivante si OK. */
  checkAndAdvance(current: VersionedEntity, expectedVersion: number): ConcurrencyCheck {
    if (expectedVersion !== current.version) {
      return { status: "conflict", nextVersion: null, conflictReason: `VERSION_MISMATCH:expected=${expectedVersion},actual=${current.version}`, reloadRequired: true };
    }
    return { status: "ok", nextVersion: current.version + 1, conflictReason: null, reloadRequired: false };
  },

  /** Politique de retry bornée pour un conflit optimiste. */
  shouldRetry(attempt: number, maxRetries: number): boolean {
    return attempt < maxRetries;
  },

  /** Résolution : dernière écriture gagnante interdite pour les commandes critiques → toujours rechargement. */
  resolve(check: ConcurrencyCheck, critical: boolean): { proceed: boolean; reloadRequired: boolean; reasonCodes: string[] } {
    if (check.status === "ok") return { proceed: true, reloadRequired: false, reasonCodes: [] };
    return { proceed: false, reloadRequired: true, reasonCodes: [critical ? "CRITICAL_CONFLICT_RELOAD" : "CONFLICT_RELOAD"] };
  },
};
