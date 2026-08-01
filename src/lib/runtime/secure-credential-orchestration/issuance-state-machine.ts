/**
 * Runtime — Secure Credential Orchestration : machine à états de l'orchestration (Sprint K4C-B, §19).
 * Transitions strictes ; une transition interdite ne mute pas l'état.
 */
import type { OrchestrationStatus } from "./issuance-orchestration-types.ts";

export const ORCHESTRATION_TRANSITIONS: Record<OrchestrationStatus, OrchestrationStatus[]> = {
  requested: ["validating_handoff", "feature_disabled", "issuance_failed"],
  validating_handoff: ["authorization_pending", "issuance_failed"],
  authorization_pending: ["preparing_record", "authorization_rejected"],
  authorization_rejected: [],
  preparing_record: ["signing", "issuance_failed", "replayed"],
  signing: ["persistence_pending", "signature_verification_failed"],
  signature_verification_failed: ["rolled_back"],
  persistence_pending: ["issued", "rolled_back", "conflict"],
  issued: [],
  replayed: [],
  conflict: [],
  rolled_back: ["issuance_failed"],
  issuance_failed: [],
  feature_disabled: [],
  test_credential_only: [],
};

export function canOrchestrationTransition(from: OrchestrationStatus, to: OrchestrationStatus): boolean {
  return ORCHESTRATION_TRANSITIONS[from]?.includes(to) ?? false;
}
export function isOrchestrationTerminal(s: OrchestrationStatus): boolean {
  return ORCHESTRATION_TRANSITIONS[s].length === 0;
}
