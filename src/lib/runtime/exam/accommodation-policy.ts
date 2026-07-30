/**
 * Runtime — Exam : ExamAccommodationPolicyEngine (Sprint G).
 *
 * Valide et applique les adaptations autorisées (accessibilité) sans exposer de données personnelles inutiles.
 * Chaque adaptation est versionnée et auditée. PUR.
 */
import type { ExamAccommodation, ExamAccommodationPolicy } from "./types.ts";

export const ExamAccommodationPolicyEngine = {
  /** Ne conserve que les adaptations autorisées par la politique. */
  filterAllowed(policy: ExamAccommodationPolicy, requested: ExamAccommodation[]): { accepted: ExamAccommodation[]; rejected: ExamAccommodation[] } {
    const allowed = new Set(policy.allowed);
    const accepted: ExamAccommodation[] = [];
    const rejected: ExamAccommodation[] = [];
    for (const a of requested) (allowed.has(a.type) ? accepted : rejected).push(a);
    return { accepted, rejected };
  },

  /** Trace non nominative auditée d'une adaptation (aucune donnée personnelle superflue). */
  toAuditEntry(a: ExamAccommodation, version: number): Record<string, unknown> {
    return {
      type: a.type,
      version,
      extraTimeSeconds: a.type === "extra_time" ? a.extraTimeSeconds ?? 0 : undefined,
      sectionId: a.type === "section_exemption" ? a.sectionId : undefined,
      // `detail` volontairement omis de l'audit pour ne pas divulguer d'information personnelle.
    };
  },
};
