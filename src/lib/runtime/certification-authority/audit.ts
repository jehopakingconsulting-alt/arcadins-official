/**
 * Runtime — Certification Authority : événements d'audit structurés (Sprint K4A, §17).
 *
 * PUBLIC-SAFE : jamais de secret, de réponse privée, de note de reviewer ni de barème. Horodatage et eventId
 * INJECTÉS. Sert la traçabilité des décisions d'AUTORISATION (pas d'émission).
 */
import type { AuditRecord } from "./repositories.ts";

export type AuthorityAuditOperation =
  | "HANDOFF_RECEIVED"
  | "HANDOFF_REJECTED"
  | "ELIGIBILITY_CONFIRMED"
  | "ELIGIBILITY_DENIED"
  | "AUTHORIZATION_CREATED"
  | "AUTHORIZATION_REUSED"
  | "LEGACY_PATH_BLOCKED"
  | "LEGACY_PATH_ADAPTED"
  | "DUPLICATE_PREVENTED"
  | "ADMINISTRATIVE_BLOCK_APPLIED"
  | "POLICY_VERSION_RESOLVED";

export function makeAuditRecord(input: {
  eventId: string;
  at: string;
  operation: AuthorityAuditOperation;
  result: "ok" | "denied" | "blocked" | "reused";
  reasonCode: string; // public-safe
  publicReference: string; // référence opaque
  version: number;
  actorType?: string;
}): AuditRecord {
  return {
    eventId: input.eventId,
    at: input.at,
    operation: input.operation,
    result: input.result,
    reasonCode: input.reasonCode,
    publicReference: input.publicReference,
    version: input.version,
    actorType: input.actorType ?? "certification_authority",
  };
}
