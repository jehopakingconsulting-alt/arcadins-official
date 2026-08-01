/**
 * Runtime — Credential Issuance : audit structuré (Sprint K4B, §21). PUBLIC-SAFE, versionné, horloge injectée,
 * immuable, sans PII inutile ni secret ni payload privé.
 */
import type { CredentialAuditRecord } from "./credential-repositories.ts";

export type CredentialAuditOperation =
  | "CREDENTIAL_ISSUANCE_REQUESTED"
  | "CREDENTIAL_ISSUANCE_AUTHORIZED"
  | "CREDENTIAL_RECORD_CREATED"
  | "INTEGRITY_DIGEST_CREATED"
  | "TEST_SIGNATURE_CREATED"
  | "CREDENTIAL_ISSUED"
  | "CREDENTIAL_ISSUANCE_REUSED"
  | "DUPLICATE_ISSUANCE_PREVENTED"
  | "CREDENTIAL_SUSPENDED"
  | "CREDENTIAL_REACTIVATED"
  | "REVOCATION_REQUESTED"
  | "CREDENTIAL_REVOKED"
  | "REPLACEMENT_REQUESTED"
  | "CREDENTIAL_REPLACED"
  | "CREDENTIAL_EXPIRED"
  | "VERIFICATION_PERFORMED";

export function makeCredentialAudit(input: {
  eventId: string; at: string; operation: CredentialAuditOperation;
  result: "ok" | "denied" | "reused" | "blocked"; reasonCode: string; publicReference: string; version?: number;
}): CredentialAuditRecord {
  return { eventId: input.eventId, at: input.at, operation: input.operation, result: input.result, reasonCode: input.reasonCode, publicReference: input.publicReference, version: input.version ?? 1 };
}
