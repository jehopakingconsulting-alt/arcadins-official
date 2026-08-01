/**
 * Runtime — Certification : validation d'invariants (Sprint H).
 */
import type {
  CredentialPrivateRecord,
  CredentialPublicView,
  CredentialValidationIssue,
  CredentialValidationReport,
  QRVerificationPayload,
} from "./types.ts";
import { containsForbiddenKeys } from "./public-credential-serializer.ts";
import { FORBIDDEN_RECOGNITION_CLAIMS } from "./config.ts";

function report(errors: CredentialValidationIssue[], warnings: CredentialValidationIssue[] = []): CredentialValidationReport {
  return { ok: errors.length === 0, errors, warnings };
}

/** Vue publique minimale : aucune donnée privée, aucune reconnaissance officielle inventée. */
export function validatePublicView(view: CredentialPublicView): CredentialValidationReport {
  const errors: CredentialValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  if (containsForbiddenKeys(view)) err("PRIVATE_LEAK", "La vue publique contient une donnée interdite.");
  const blob = JSON.stringify(view).toLowerCase();
  for (const claim of FORBIDDEN_RECOGNITION_CLAIMS) if (blob.includes(claim)) err("FORBIDDEN_RECOGNITION", `Reconnaissance officielle inventée : « ${claim} ».`);
  if (!view.publicVerificationId) err("NO_PUBLIC_ID", "Identifiant public manquant.");
  return report(errors);
}

/** Le payload QR ne doit contenir aucune donnée personnelle / privée. */
export function validateQrPayload(payload: QRVerificationPayload): CredentialValidationReport {
  const errors: CredentialValidationIssue[] = [];
  if (containsForbiddenKeys(payload)) errors.push({ level: "error", code: "QR_PRIVATE_LEAK", message: "Le payload QR contient une donnée interdite." });
  const allowedKeys = new Set(["version", "verificationUrlBase", "publicVerificationId", "documentNumber", "checksum", "issuerCode"]);
  for (const k of Object.keys(payload)) if (!allowedKeys.has(k)) errors.push({ level: "error", code: "QR_EXTRA_FIELD", message: `Champ QR non autorisé : ${k}.` });
  return report(errors);
}

/** Un enregistrement de credential : identifiant public opaque (sans donnée personnelle), snapshot cohérent. */
export function validateRecord(record: CredentialPrivateRecord): CredentialValidationReport {
  const errors: CredentialValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  // L'identifiant public ne doit pas contenir la référence apprenant.
  if (record.learnerReference && record.publicVerificationId.includes(record.learnerReference)) err("PUBLIC_ID_LEAK", "L'identifiant public contient la référence apprenant.");
  // Le score n'est présent dans le snapshot que si la politique l'autorise (contrôlé à la sérialisation).
  if (record.versionHistory.length === 0) err("NO_VERSION", "Aucune version dans l'historique.");
  if (record.status === "replaced" && !record.replacedByPublicId) err("REPLACED_NO_REF", "Document remplacé sans référence de remplacement.");
  if (record.status === "revoked" && !record.revocation) err("REVOKED_NO_DECISION", "Document révoqué sans décision de révocation.");
  return report(errors);
}

/** Porte de certification : aucun credential sur résultat non définitif / échoué / non éligible. */
export function validateIssuanceSource(finalStatus: string, passed: boolean, certificateEligibility: boolean): CredentialValidationReport {
  const errors: CredentialValidationIssue[] = [];
  if (finalStatus !== "passed") errors.push({ level: "error", code: "NOT_PASSED", message: "Émission sur résultat non réussi." });
  if (!passed) errors.push({ level: "error", code: "NOT_PASSED_FLAG", message: "Émission alors que passed=false." });
  if (!certificateEligibility) errors.push({ level: "error", code: "NOT_ELIGIBLE", message: "Émission alors que certificateEligibility=false." });
  return report(errors);
}
