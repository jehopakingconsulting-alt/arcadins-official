/**
 * Runtime — Credential Issuance : machine à états du cycle de vie (Sprint K4B, §7, §26).
 *
 * Transitions strictement contrôlées. Une transition interdite NE MUTE PAS l'état (lève une erreur). Un
 * credential révoqué/expiré/superseded/invalidé ne revient jamais à `active`.
 */
import type { CredentialLifecycleStatus } from "./credential-types.ts";

export const CREDENTIAL_TRANSITIONS: Record<CredentialLifecycleStatus, CredentialLifecycleStatus[]> = {
  pending_issuance: ["issued", "issuance_failed"],
  issued: ["active", "invalidated"],
  active: ["suspended", "revoked", "expired", "replacement_pending"],
  suspended: ["active", "revoked", "expired"],
  expired: ["replacement_pending"], // jamais → active
  revoked: ["replacement_pending"], // jamais → active
  replacement_pending: ["replaced", "active"], // annulation du remplacement possible tant que non finalisé
  replaced: ["superseded"],
  superseded: [], // terminal
  invalidated: [], // terminal ; jamais → active
  issuance_failed: ["pending_issuance"], // retry idempotent uniquement ; jamais → active
};

export function canTransitionCredential(from: CredentialLifecycleStatus, to: CredentialLifecycleStatus): boolean {
  return CREDENTIAL_TRANSITIONS[from]?.includes(to) ?? false;
}

/** Applique une transition ; lève `INVALID_CREDENTIAL_TRANSITION:<from>-><to>` si interdite. */
export function transitionCredential(from: CredentialLifecycleStatus, to: CredentialLifecycleStatus): CredentialLifecycleStatus {
  if (!canTransitionCredential(from, to)) throw new Error(`INVALID_CREDENTIAL_TRANSITION:${from}->${to}`);
  return to;
}

export function isTerminalCredential(status: CredentialLifecycleStatus): boolean {
  return CREDENTIAL_TRANSITIONS[status].length === 0;
}
