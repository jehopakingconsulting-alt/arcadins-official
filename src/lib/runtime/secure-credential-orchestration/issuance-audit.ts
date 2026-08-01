/**
 * Runtime — Secure Credential Orchestration : audit (Sprint K4C-B, §17). PUBLIC-SAFE, versionné, horloge
 * injectée, sans clé/secret/donnée privée.
 */
export type SecureIssuanceAuditOperation =
  | "SECURE_ISSUANCE_REQUESTED" | "ISSUANCE_RESERVATION_CREATED" | "ISSUANCE_RESERVATION_REUSED"
  | "CERTIFICATION_HANDOFF_VALIDATED" | "AUTHORIZATION_CONFIRMED" | "CREDENTIAL_RECORD_PREPARED"
  | "CANONICAL_PAYLOAD_BUILT" | "INTEGRITY_DIGEST_CREATED" | "SIGNING_REQUESTED" | "SIGNATURE_CREATED"
  | "SIGNATURE_VERIFIED" | "CREDENTIAL_PERSISTENCE_STARTED" | "CREDENTIAL_PERSISTED" | "SIGNATURE_METADATA_PERSISTED"
  | "ISSUANCE_COMMITTED" | "ISSUANCE_REPLAYED" | "ISSUANCE_CONFLICT_DETECTED" | "ISSUANCE_ROLLED_BACK"
  | "ISSUANCE_FAILED" | "TEST_CREDENTIAL_CREATED" | "PRODUCTION_PERSISTENCE_BLOCKED" | "LEGACY_ISSUANCE_BLOCKED";
export interface SecureIssuanceAuditRecord {
  eventId: string; at: string; operation: SecureIssuanceAuditOperation; result: string;
  reasonCode: string; correlationId: string; commandId: string; publicReference: string; version: number;
}
export function makeSecureIssuanceAudit(i: { eventId: string; at: string; operation: SecureIssuanceAuditOperation; result: "ok" | "denied" | "failed" | "reused" | "blocked"; reasonCode: string; correlationId: string; commandId: string; publicReference: string; version?: number }): SecureIssuanceAuditRecord {
  return { eventId: i.eventId, at: i.at, operation: i.operation, result: i.result, reasonCode: i.reasonCode, correlationId: i.correlationId, commandId: i.commandId, publicReference: i.publicReference, version: i.version ?? 1 };
}
