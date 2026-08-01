/**
 * Runtime — Credential Issuance : VÉRIFICATION INTERNE en mémoire (Sprint K4B, §20).
 *
 * Aucune route publique active, aucun réseau. Recalcule l'intégrité à partir des champs d'émission (stables),
 * vérifie la signature de TEST, l'expiration, la révocation, le remplacement/supersession, la version de schéma.
 */
import type { CredentialVerificationStatus } from "./credential-types.ts";
import { buildCanonicalCredentialPayload, CREDENTIAL_SCHEMA_VERSION } from "./canonical-payload.ts";
import type { IntegrityProvider } from "./integrity-provider.ts";
import type { SigningProvider } from "./signing-provider.ts";
import type { CredentialRepositories } from "./credential-repositories.ts";
import { isExpiredAt } from "./credential-expiration-policy.ts";
import { makeCredentialAudit } from "./credential-audit.ts";

export interface VerificationContext { now: () => Date; repos: CredentialRepositories; integrity: IntegrityProvider; signing: SigningProvider; eventId: () => string; }

export interface CredentialVerification {
  status: CredentialVerificationStatus;
  integrityValid: boolean;
  signatureValid: boolean;
}

export const CredentialVerificationService = {
  verify(recordId: string, ctx: VerificationContext): CredentialVerification {
    const at = ctx.now().toISOString();
    const record = ctx.repos.findById(recordId);
    const audit = (status: string, reason: string) => ctx.repos.audit.append(makeCredentialAudit({ eventId: ctx.eventId(), at, operation: "VERIFICATION_PERFORMED", result: status === "valid" ? "ok" : "denied", reasonCode: `credential.verify.${reason}`, publicReference: recordId }));

    if (!record) { audit("unknown", "unknown"); return { status: "unknown", integrityValid: false, signatureValid: false }; }
    if (record.recordVersion !== CREDENTIAL_SCHEMA_VERSION) { audit("unsupported_version", "unsupported_version"); return { status: "unsupported_version", integrityValid: false, signatureValid: false }; }

    // Intégrité : recalcul déterministe (champs d'émission stables) et comparaison au digest stocké.
    const stored = ctx.repos.integrity.find(recordId);
    const recomputed = ctx.integrity.compute(buildCanonicalCredentialPayload(record, ctx.integrity.algorithm()));
    const integrityValid = stored !== null && stored.integrityDigest === recomputed.integrityDigest;

    // Signature de TEST (si présente).
    const envelope = ctx.repos.signatures.find(recordId);
    const signatureValid = envelope ? ctx.signing.verify(recomputed.integrityDigest, envelope) : true;

    if (!integrityValid) { audit("invalid_integrity", "invalid_integrity"); return { status: "invalid_integrity", integrityValid, signatureValid }; }
    if (!signatureValid) { audit("invalid_signature", "invalid_signature"); return { status: "invalid_signature", integrityValid, signatureValid }; }

    // État courant.
    const st = record.lifecycleStatus;
    let status: CredentialVerificationStatus = "valid";
    if (st === "revoked") status = "revoked";
    else if (st === "replaced" || st === "replacement_pending") status = "replaced";
    else if (st === "superseded") status = "superseded";
    else if (st === "suspended") status = "suspended";
    else if (st === "expired" || isExpiredAt(record.expiresAt, ctx.now())) status = "expired";
    audit(status, status);
    return { status, integrityValid, signatureValid };
  },
};
