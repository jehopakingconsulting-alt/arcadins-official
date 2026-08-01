/**
 * Runtime — Certification Authority : contrat d'ENTRÉE K4 + validation stricte (Sprint K4A, §5–§6).
 *
 * K4 ne consomme QU'UN CertificationHandoffContract validé. Whitelist EXPLICITE : toute propriété inconnue est
 * rejetée ; toute clé interdite (réponses, notes, barème, signature, PDF, QR…) est rejetée. PUR / node-testable.
 */
import type { CredentialType, HandoffValidationStatus } from "./authority-types.ts";
import { FORBIDDEN_CLIENT_KEYS, inspectClientSafe } from "../ui/security/ensure-client-safe.ts";

/** Contrat d'entrée K4 durci (minimal). */
export interface CertificationHandoffInput {
  contractVersion: number;
  handoffId: string;
  learnerReference: string; // opaque
  programReference: string;
  curriculumVersion: string;
  finalDecisionId: string;
  finalDecisionVersion: number;
  resultIntegrityReference: string;
  certificationEligibility: boolean;
  eligibilityDecidedAt: string; // ISO
  issuerCode: string;
  credentialTypeRequested: CredentialType;
  locale: string;
  idempotencyKey: string;
  /** Métadonnées PUBLIQUES explicitement autorisées (clé→chaîne/nombre/booléen). */
  metadata: Record<string, string | number | boolean>;
}

/** Whitelist EXCLUSIVE des propriétés autorisées à la racine du contrat. */
export const HANDOFF_ALLOWED_KEYS: readonly (keyof CertificationHandoffInput)[] = [
  "contractVersion", "handoffId", "learnerReference", "programReference", "curriculumVersion",
  "finalDecisionId", "finalDecisionVersion", "resultIntegrityReference", "certificationEligibility",
  "eligibilityDecidedAt", "issuerCode", "credentialTypeRequested", "locale", "idempotencyKey", "metadata",
];

/** Clés INTERDITES supplémentaires (spécifiques certification) en plus des clés privées globales K3-S. */
export const HANDOFF_FORBIDDEN_EXTRA_KEYS: readonly string[] = [
  "examAnswers", "quizAnswers", "answers", "scoringKey", "scoreBreakdown", "privateScore",
  "signature", "signingKey", "signingMaterial", "privateKey", "publicKeyFinal",
  "pdf", "qr", "qrImage", "image", "file", "documentUrl", "verificationUrl", "certificate", "badge",
  "certificateId", "badgeId", "fraudSignals",
];

export const SUPPORTED_CONTRACT_VERSION = 1;
export const SUPPORTED_LOCALES = ["fr", "en", "es", "ht", "pt", "de", "it"];
export const ALLOWED_CREDENTIAL_TYPES: readonly CredentialType[] = ["completion_certificate", "competency_badge"];

const ALL_FORBIDDEN = new Set<string>([...FORBIDDEN_CLIENT_KEYS, ...HANDOFF_FORBIDDEN_EXTRA_KEYS].map((k) => k.toLowerCase()));

export interface HandoffValidationResult {
  status: HandoffValidationStatus;
  reasonCodes: string[]; // PUBLIC-SAFE
}

/** Détecte, en profondeur, une clé interdite (défense en profondeur, sans recopier de valeur). */
function containsForbidden(value: unknown, depth = 0): boolean {
  if (depth > 32 || value === null || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some((v) => containsForbidden(v, depth + 1));
  for (const key of Object.keys(value as Record<string, unknown>)) {
    if (ALL_FORBIDDEN.has(key.toLowerCase())) return true;
    if (containsForbidden((value as Record<string, unknown>)[key], depth + 1)) return true;
  }
  return false;
}

/** Validation STRICTE du contrat d'entrée K4 (§6). Renvoie un statut + raisons publiques. */
export function validateCertificationHandoffContract(input: unknown): HandoffValidationResult {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return { status: "malformed", reasonCodes: ["HANDOFF_NOT_OBJECT"] };
  }
  const obj = input as Record<string, unknown>;

  // Clé interdite / valeur sensible → tamponné (vérifié EN PREMIER : plus spécifique/sévère qu'inconnu).
  if (containsForbidden(obj)) return { status: "tampered", reasonCodes: ["FORBIDDEN_KEY_PRESENT"] };

  // Propriété INCONNUE (non interdite) → rejet (whitelist stricte).
  const allowed = new Set<string>(HANDOFF_ALLOWED_KEYS as readonly string[]);
  const unknownKeys = Object.keys(obj).filter((k) => !allowed.has(k));
  if (unknownKeys.length > 0) return { status: "malformed", reasonCodes: ["UNKNOWN_PROPERTY"] };

  const c = obj as Partial<CertificationHandoffInput>;

  if (typeof c.contractVersion !== "number") return { status: "malformed", reasonCodes: ["MISSING_CONTRACT_VERSION"] };
  if (c.contractVersion !== SUPPORTED_CONTRACT_VERSION) return { status: "unsupported_version", reasonCodes: ["UNSUPPORTED_CONTRACT_VERSION"] };

  const reasons: string[] = [];
  const missing = (k: keyof CertificationHandoffInput, ok: boolean) => { if (!ok) reasons.push(`MISSING_${String(k).toUpperCase()}`); };
  missing("handoffId", typeof c.handoffId === "string" && c.handoffId.length > 0);
  missing("learnerReference", typeof c.learnerReference === "string" && c.learnerReference.length > 0);
  missing("programReference", typeof c.programReference === "string" && c.programReference.length > 0);
  missing("finalDecisionId", typeof c.finalDecisionId === "string" && c.finalDecisionId.length > 0);
  missing("finalDecisionVersion", typeof c.finalDecisionVersion === "number");
  missing("resultIntegrityReference", typeof c.resultIntegrityReference === "string" && c.resultIntegrityReference.length > 0);
  missing("eligibilityDecidedAt", typeof c.eligibilityDecidedAt === "string" && c.eligibilityDecidedAt.length > 0);
  missing("issuerCode", typeof c.issuerCode === "string" && c.issuerCode.length > 0);
  missing("idempotencyKey", typeof c.idempotencyKey === "string" && c.idempotencyKey.length > 0);
  if (reasons.length > 0) return { status: "malformed", reasonCodes: reasons };

  if (typeof c.locale !== "string" || !SUPPORTED_LOCALES.includes(c.locale)) return { status: "invalid", reasonCodes: ["LOCALE_NOT_SUPPORTED"] };
  if (!ALLOWED_CREDENTIAL_TYPES.includes(c.credentialTypeRequested as CredentialType)) return { status: "invalid", reasonCodes: ["CREDENTIAL_TYPE_NOT_ALLOWED"] };

  // Décision DÉFINITIVE et ÉLIGIBLE (jamais provisoire).
  if (c.certificationEligibility !== true) return { status: "ineligible", reasonCodes: ["NOT_ELIGIBLE"] };

  // Défense en profondeur : aucune valeur privée résiduelle.
  if (!inspectClientSafe(obj).safe) return { status: "tampered", reasonCodes: ["FORBIDDEN_KEY_PRESENT"] };

  return { status: "valid", reasonCodes: [] };
}

/** Clé d'idempotence logique (§11). Déterministe. */
export function computeIdempotencyKey(parts: { learnerReference: string; programReference: string; finalDecisionId: string; credentialType: CredentialType; policyVersion: number }): string {
  return [parts.learnerReference, parts.programReference, parts.finalDecisionId, parts.credentialType, `p${parts.policyVersion}`].join("::");
}

/** Forme minimale du handoff K3C consommée (sous-ensemble PUBLIC ; jamais de donnée privée). */
export interface K3CHandoffLike {
  learnerRefOpaque: string;
  programId: string;
  curriculumVersion: string;
  finalDecisionId: string;
  certificationEligibility: boolean;
  completedAt: string;
  resultIntegrityReference: string;
  issuerCode: string;
  requestedLocale: string;
  policyVersion: number;
  contractVersion: number;
}

/** Construit le contrat d'entrée K4 durci à partir du handoff K3C (aucune donnée privée transportée). */
export function buildHandoffInputFromK3C(
  k3c: K3CHandoffLike,
  opts: { handoffId: string; credentialType: CredentialType; finalDecisionVersion: number },
): CertificationHandoffInput {
  return {
    contractVersion: SUPPORTED_CONTRACT_VERSION,
    handoffId: opts.handoffId,
    learnerReference: k3c.learnerRefOpaque,
    programReference: k3c.programId,
    curriculumVersion: k3c.curriculumVersion,
    finalDecisionId: k3c.finalDecisionId,
    finalDecisionVersion: opts.finalDecisionVersion,
    resultIntegrityReference: k3c.resultIntegrityReference,
    certificationEligibility: k3c.certificationEligibility,
    eligibilityDecidedAt: k3c.completedAt,
    issuerCode: k3c.issuerCode,
    credentialTypeRequested: opts.credentialType,
    locale: k3c.requestedLocale,
    idempotencyKey: computeIdempotencyKey({ learnerReference: k3c.learnerRefOpaque, programReference: k3c.programId, finalDecisionId: k3c.finalDecisionId, credentialType: opts.credentialType, policyVersion: k3c.policyVersion }),
    metadata: {},
  };
}
