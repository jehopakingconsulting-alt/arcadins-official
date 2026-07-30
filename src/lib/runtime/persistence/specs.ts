/**
 * Runtime — Persistence : DeepSpecs & validation (Sprint B).
 */
import type { LearningSnapshot, PersistenceIssue, PersistenceValidationReport } from "./types.ts";
import { SNAPSHOT_SCHEMA_VERSION } from "./types.ts";
import { RuntimeSerializer } from "./serializer.ts";

/** Spécification vivante de la couche persistence (couverte par les tests). */
export const PERSISTENCE_DEEP_SPECS: { id: string; description: string }[] = [
  { id: "P1", description: "Un instantané est versionné (schemaVersion) et porte une somme de contrôle vérifiable." },
  { id: "P2", description: "sérialiser puis désérialiser un instantané redonne un objet équivalent (round-trip)." },
  { id: "P3", description: "Trois adapters partagent la même interface PersistencePort (local, web-storage/mobile, supabase)." },
  { id: "P4", description: "L'adapter Supabase n'exécute aucune requête sans client injecté ; aucune base n'est modifiée." },
  { id: "P5", description: "Hydratation : charger un instantané recalcule les états dérivés (cohérence des déblocages)." },
  { id: "P6", description: "Sync : local-only, remote-only, revision-LWW ou event-merge selon la situation." },
  { id: "P7", description: "ConflictResolver LWW : la plus haute révision gagne ; à égalité, le plus récent updatedAt." },
  { id: "P8", description: "OfflineQueue conserve les items en échec pour réessai ; vide ceux qui réussissent." },
  { id: "P9", description: "Autosave se déclenche par nombre de changements OU intervalle écoulé (sans timer interne)." },
  { id: "P10", description: "Heartbeat émet un STUDY_TIME par paliers ; flush émet le reste. Aucune donnée réelle requise." },
  { id: "P11", description: "La révision s'incrémente à chaque sauvegarde (multi-device / resume)." },
  { id: "P12", description: "Aucune migration, aucune base modifiée, aucun Stripe/Auth/Checkout touché." },
];

/** Valide un instantané (structure, version, intégrité). */
export function validateSnapshot(snapshot: LearningSnapshot): PersistenceValidationReport {
  const errors: PersistenceIssue[] = [];
  const warnings: PersistenceIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  if (snapshot.schemaVersion !== SNAPSHOT_SCHEMA_VERSION) err("SCHEMA", "Version de schéma incompatible.");
  if (!snapshot.userId) err("USER", "userId manquant.");
  if (snapshot.programSlug !== snapshot.state.programSlug) err("SLUG", "programSlug incohérent avec l'état.");
  if (snapshot.revision < 1) err("REVISION", "La révision doit être ≥ 1.");
  if (!RuntimeSerializer.verify(snapshot)) err("CHECKSUM", "Somme de contrôle invalide (corruption possible).");

  return { ok: errors.length === 0, errors, warnings };
}
