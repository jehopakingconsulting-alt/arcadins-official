/**
 * ARCADINS — RÉCONCILIATION des étudiants V1 (LECTURE SEULE, aucune écriture prod).
 * PUR / node-testable. Catégorise chaque inscription héritée (table `enrollments`
 * System 1) pour préparer une future migration d'entitlements SANS jamais modifier
 * ni supprimer les données existantes. Aucune mise à jour destructive.
 */

/** Ligne héritée (colonnes réelles de public.enrollments en production). */
export interface LegacyEnrollment {
  user_id: string | null;
  program_id: string | null;
  program_slug?: string | null; // joint depuis programs.slug quand disponible
  plan: string | null;
  billing: string | null;
  status: string | null;
  stripe_subscription_id: string | null;
  expires_at: string | null;
}

export type ReconCategory =
  | "safe_automatic_mapping"
  | "manual_review_required"
  | "conflicting_record"
  | "missing_account"
  | "missing_program"
  | "expired_enrollment"
  | "active_paid_enrollment";

export interface ReconResult {
  category: ReconCategory;
  programCode: string | null;
  reason: string;
}

const OFFICIAL_SLUGS = new Set(["tef-canada", "tcf-canada"]);

/** Catégorise une inscription héritée (déterministe). `now` pour l'expiration. */
export function categorizeLegacyEnrollment(row: LegacyEnrollment, now: Date): ReconResult {
  if (!row.user_id) return { category: "missing_account", programCode: null, reason: "Aucun user_id lié." };
  if (!row.program_id && !row.program_slug) {
    return { category: "missing_program", programCode: null, reason: "Aucun programme lié à l'inscription." };
  }

  const slug = row.program_slug ?? null;
  const isOfficial = slug ? OFFICIAL_SLUGS.has(slug) : false;

  const status = (row.status ?? "").toLowerCase();
  const expired = row.expires_at != null && new Date(row.expires_at) < now;

  if (status === "suspended" || status === "cancelled" || status === "pending_payment") {
    return { category: "manual_review_required", programCode: slug, reason: `Statut « ${status} » — revue manuelle avant mapping.` };
  }
  if (expired) {
    return { category: "expired_enrollment", programCode: slug, reason: "Accès expiré — mapping en lecture seule, pas de re-facturation." };
  }
  if (status === "active" && isOfficial) {
    return { category: "active_paid_enrollment", programCode: slug, reason: "Inscription active à un programme officiel — NE PAS re-facturer ; mapping direct." };
  }
  if (status === "active" && !isOfficial) {
    return { category: "safe_automatic_mapping", programCode: slug, reason: "Inscription active (formation pro) — hors périmètre TEF/TCF, mapping sûr." };
  }
  return { category: "conflicting_record", programCode: slug, reason: `Combinaison inattendue (statut « ${status} ») — à arbitrer.` };
}

export interface ReconSummary {
  total: number;
  byCategory: Record<ReconCategory, number>;
}

/** Agrège un lot d'inscriptions héritées en compteurs par catégorie (lecture seule). */
export function summarizeReconciliation(rows: LegacyEnrollment[], now: Date): ReconSummary {
  const byCategory: Record<ReconCategory, number> = {
    safe_automatic_mapping: 0,
    manual_review_required: 0,
    conflicting_record: 0,
    missing_account: 0,
    missing_program: 0,
    expired_enrollment: 0,
    active_paid_enrollment: 0,
  };
  for (const r of rows) byCategory[categorizeLegacyEnrollment(r, now).category]++;
  return { total: rows.length, byCategory };
}
