/**
 * Runtime — Credential Issuance : REMPLACEMENT (Sprint K4B, §17).
 *
 * L'ancien credential est conservé, lié de manière bidirectionnelle, chaîné. Aucune boucle, aucun double
 * successeur actif. Le nouveau record est distinct ; l'ancien devient `replaced` puis `superseded`. Idempotent.
 */
import { reviseCredential, type CredentialRecord } from "./credential-record.ts";
import { canTransitionCredential } from "./credential-state-machine.ts";
import type { CredentialRepositories } from "./credential-repositories.ts";
import type { CredentialIdProvider } from "./credential-id-generator.ts";
import { makeCredentialAudit } from "./credential-audit.ts";
import { credentialError, type SafeCredentialError } from "./credential-errors.ts";

export interface ReplacementContext { now: () => Date; repos: CredentialRepositories; ids: CredentialIdProvider; }
export type ReplacementOutcome = { ok: true; successor: CredentialRecord; predecessor: CredentialRecord } | { ok: false; error: SafeCredentialError };

export const CredentialReplacementService = {
  replace(predecessorId: string, ctx: ReplacementContext): ReplacementOutcome {
    const predecessor = ctx.repos.findById(predecessorId);
    if (!predecessor) return { ok: false, error: credentialError("not_found") };
    if (predecessor.replacedByCredentialRecordId) return { ok: false, error: credentialError("already_replaced") }; // pas de double successeur
    if (!canTransitionCredential(predecessor.lifecycleStatus, "replacement_pending")) return { ok: false, error: credentialError("invalid_state_transition") };

    const at = ctx.now().toISOString();
    const chainId = predecessor.replacementChainId ?? ctx.ids.replacementChainId();
    const successorId = ctx.ids.credentialRecordId();

    // Nouveau record DISTINCT (successeur), même type ; chaîne conservée.
    const successor: CredentialRecord = { ...predecessor, credentialRecordId: successorId, replacementChainId: chainId, replacesCredentialRecordId: predecessorId, replacedByCredentialRecordId: null, revocationReference: null, lifecycleStatus: "active", issuedAt: at, validFrom: at, createdAt: at, updatedAt: at, revision: 1 };
    // L'ancien : active/revoked/expired → replacement_pending → replaced → superseded.
    let old = reviseCredential(predecessor, { lifecycleStatus: "replacement_pending", replacementChainId: chainId, replacedByCredentialRecordId: successorId }, at);
    let saved = ctx.repos.saveRevision(old, predecessor.revision);
    if (!saved.ok) return { ok: false, error: credentialError("concurrency_conflict") };
    old = reviseCredential(saved.record, { lifecycleStatus: "replaced" }, at);
    saved = ctx.repos.saveRevision(old, saved.record.revision);
    old = reviseCredential(saved.record, { lifecycleStatus: "superseded" }, at);
    saved = ctx.repos.saveRevision(old, saved.record.revision);

    const key = `replacement::${chainId}::${successorId}`;
    ctx.repos.createIfAbsent(key, successor);
    ctx.repos.replacements.save({ replacementChainId: chainId, predecessorId, successorId, at });
    ctx.repos.audit.append(makeCredentialAudit({ eventId: ctx.ids.issuanceEventId(), at, operation: "REPLACEMENT_REQUESTED", result: "ok", reasonCode: "credential.audit.replacement", publicReference: predecessorId }));
    ctx.repos.audit.append(makeCredentialAudit({ eventId: ctx.ids.issuanceEventId(), at, operation: "CREDENTIAL_REPLACED", result: "ok", reasonCode: "credential.audit.replaced", publicReference: successorId }));
    return { ok: true, successor: ctx.repos.findById(successorId)!, predecessor: saved.record };
  },
};
