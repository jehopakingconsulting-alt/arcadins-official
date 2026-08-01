/**
 * Runtime — Certification : PublicCredentialSerializer (Sprint H).
 *
 * Produit un payload PUBLIC MINIMAL (liste blanche de champs). Aucune donnée personnelle sensible, aucun secret,
 * aucun identifiant interne, aucun score privé, aucune réponse. Défense en profondeur via `containsForbiddenKeys`.
 */
import type {
  CredentialPolicy,
  CredentialPrivateRecord,
  CredentialPublicView,
  PublicFieldKey,
} from "./types.ts";

/** Clés strictement interdites dans un objet public (défense en profondeur). */
export const FORBIDDEN_PUBLIC_KEYS = [
  "learnerId",
  "learnerReference",
  "internalCredentialId",
  "email",
  "phone",
  "address",
  "dateOfBirth",
  "birthDate",
  "supabaseId",
  "reviewerNotes",
  "payment",
  "paymentData",
  "privateScore",
  "answers",
  "answer",
  "secret",
  "privateKey",
  "signature",
  "privateReasonCode",
  "evidenceReference",
  "administrative",
  "privateReason",
  "internalHistory",
  "processedCommands",
] as const;

export function containsForbiddenKeys(value: unknown): boolean {
  const forbidden = new Set<string>(FORBIDDEN_PUBLIC_KEYS as readonly string[]);
  const seen = new Set<unknown>();
  const walk = (v: unknown): boolean => {
    if (v === null || typeof v !== "object" || seen.has(v)) return false;
    seen.add(v);
    if (Array.isArray(v)) return v.some(walk);
    for (const k of Object.keys(v as Record<string, unknown>)) {
      if (forbidden.has(k)) return true;
      if (walk((v as Record<string, unknown>)[k])) return true;
    }
    return false;
  };
  return walk(value);
}

export const PublicCredentialSerializer = {
  /** Sérialise l'enregistrement privé en vue publique, en respectant la liste blanche de la politique. */
  toPublicView(record: CredentialPrivateRecord, policy: CredentialPolicy): CredentialPublicView {
    const allowed = new Set<PublicFieldKey>(policy.allowedPublicFields);
    const snap = record.currentVersion.snapshot;
    const view: CredentialPublicView = {
      publicVerificationId: record.publicVerificationId,
      documentNumber: record.documentNumber,
      credentialType: record.credentialType,
      documentTitle: snap.documentTitle,
      learnerDisplayName: snap.learnerDisplayName,
      programTitle: snap.programTitle,
      issuedAt: snap.issuedAt,
      completionDate: snap.completionDate,
      status: record.status,
      issuerDisplayName: snap.issuerName,
      competencies: snap.competencies.map((c) => ({ competencyCode: c.competencyCode, labelKey: c.labelKey })),
      version: record.currentVersion.version,
      verificationStatementKey: "credential.verification.statement",
      replacementReference: record.replacedByPublicId,
    };
    // Score public uniquement si la politique l'autorise ET le champ est en liste blanche.
    if (allowed.has("finalScore") && policy.disclosesFinalScore) view.finalScore = snap.finalScore;
    return view;
  },

  containsForbiddenKeys,
};
