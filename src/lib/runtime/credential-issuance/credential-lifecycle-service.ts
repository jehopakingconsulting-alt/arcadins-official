/**
 * Runtime — Credential Issuance : opérations de cycle de vie (Sprint K4B, §7).
 *
 * suspend / reactivate / expire — via la machine à états (transition interdite ⇒ pas de mutation) et CAS sur
 * la révision. Historique immuable conservé par le repository.
 */
import type { CredentialLifecycleStatus } from "./credential-types.ts";
import { reviseCredential, type CredentialRecord } from "./credential-record.ts";
import { canTransitionCredential } from "./credential-state-machine.ts";
import type { CredentialRepositories } from "./credential-repositories.ts";
import { isExpiredAt } from "./credential-expiration-policy.ts";
import { makeCredentialAudit, type CredentialAuditOperation } from "./credential-audit.ts";
import { credentialError, type SafeCredentialError } from "./credential-errors.ts";

export interface LifecycleContext { now: () => Date; repos: CredentialRepositories; eventId: () => string; }
export type LifecycleOutcome = { ok: true; record: CredentialRecord } | { ok: false; error: SafeCredentialError };

function apply(recordId: string, to: CredentialLifecycleStatus, op: CredentialAuditOperation, ctx: LifecycleContext, patch: Partial<CredentialRecord> = {}): LifecycleOutcome {
  const current = ctx.repos.findById(recordId);
  if (!current) return { ok: false, error: credentialError("not_found") };
  if (!canTransitionCredential(current.lifecycleStatus, to)) return { ok: false, error: credentialError("invalid_state_transition") };
  const at = ctx.now().toISOString();
  const next = reviseCredential(current, { lifecycleStatus: to, ...patch }, at);
  const saved = ctx.repos.saveRevision(next, current.revision);
  if (!saved.ok) return { ok: false, error: credentialError("concurrency_conflict") };
  ctx.repos.audit.append(makeCredentialAudit({ eventId: ctx.eventId(), at, operation: op, result: "ok", reasonCode: `credential.audit.${to}`, publicReference: recordId }));
  return { ok: true, record: saved.record };
}

export const CredentialLifecycleService = {
  suspend: (recordId: string, ctx: LifecycleContext): LifecycleOutcome => apply(recordId, "suspended", "CREDENTIAL_SUSPENDED", ctx),
  reactivate: (recordId: string, ctx: LifecycleContext): LifecycleOutcome => apply(recordId, "active", "CREDENTIAL_REACTIVATED", ctx),
  /** Marque expiré UNIQUEMENT si l'horloge injectée dépasse `expiresAt`. */
  expire(recordId: string, ctx: LifecycleContext): LifecycleOutcome {
    const current = ctx.repos.findById(recordId);
    if (!current) return { ok: false, error: credentialError("not_found") };
    if (!isExpiredAt(current.expiresAt, ctx.now())) return { ok: false, error: credentialError("invalid_state_transition") };
    return apply(recordId, "expired", "CREDENTIAL_EXPIRED", ctx);
  },
};
