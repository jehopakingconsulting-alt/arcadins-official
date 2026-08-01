/**
 * Runtime — Credential Issuance : RÉVOCATION (Sprint K4B, §16).
 *
 * Motif PUBLIC + motif INTERNE séparés (l'interne n'est jamais exposé). Une révocation finalisée est immuable,
 * conserve l'historique, ne supprime pas le record d'origine et empêche tout retour à `active`.
 */
import { reviseCredential, type CredentialRecord } from "./credential-record.ts";
import { canTransitionCredential } from "./credential-state-machine.ts";
import type { CredentialRepositories } from "./credential-repositories.ts";
import { makeCredentialAudit } from "./credential-audit.ts";
import { credentialError, type SafeCredentialError } from "./credential-errors.ts";

export type RevocationPublicReason =
  | "administrative_action" | "integrity_issue" | "superseded" | "issued_in_error" | "policy_violation" | "learner_request" | "other_public_reason";

export interface RevocationContext { now: () => Date; repos: CredentialRepositories; eventId: () => string; revocationRef: () => string; }
export type RevocationOutcome = { ok: true; record: CredentialRecord; revocationReference: string } | { ok: false; error: SafeCredentialError };

export const CredentialRevocationService = {
  revoke(recordId: string, reasons: { publicReason: RevocationPublicReason; internalReasonCode: string }, ctx: RevocationContext): RevocationOutcome {
    const current = ctx.repos.findById(recordId);
    if (!current) return { ok: false, error: credentialError("not_found") };
    if (current.lifecycleStatus === "revoked") return { ok: false, error: credentialError("already_revoked") };
    if (!canTransitionCredential(current.lifecycleStatus, "revoked")) return { ok: false, error: credentialError("invalid_state_transition") };
    const at = ctx.now().toISOString();
    const revocationReference = ctx.revocationRef();
    const next = reviseCredential(current, { lifecycleStatus: "revoked", revocationReference }, at);
    const saved = ctx.repos.saveRevision(next, current.revision);
    if (!saved.ok) return { ok: false, error: credentialError("concurrency_conflict") };
    // Enregistrement de révocation IMMUABLE (motif interne stocké côté serveur, jamais exposé publiquement).
    ctx.repos.revocations.save({ revocationReference, credentialRecordId: recordId, publicReasonCode: `credential.revocation.${reasons.publicReason}`, internalReasonCode: reasons.internalReasonCode, finalizedAt: at, version: 1 });
    ctx.repos.audit.append(makeCredentialAudit({ eventId: ctx.eventId(), at, operation: "REVOCATION_REQUESTED", result: "ok", reasonCode: `credential.revocation.${reasons.publicReason}`, publicReference: recordId }));
    ctx.repos.audit.append(makeCredentialAudit({ eventId: ctx.eventId(), at, operation: "CREDENTIAL_REVOKED", result: "ok", reasonCode: `credential.revocation.${reasons.publicReason}`, publicReference: recordId }));
    return { ok: true, record: saved.record, revocationReference };
  },
};
