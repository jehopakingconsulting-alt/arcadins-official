/**
 * Runtime — Credential Crypto : audit structuré (Sprint K4C-A, §18). PUBLIC-SAFE : jamais de clé privée, seed,
 * PEM privé, secret ni matière de signature privée. Horloge/eventId injectés, versionné, immuable.
 */
export type CryptoAuditOperation =
  | "SIGNING_REQUESTED" | "SIGNING_KEY_RESOLVED" | "SIGNATURE_CREATED" | "SIGNATURE_VERIFIED"
  | "SIGNATURE_REJECTED" | "UNKNOWN_KEY_REFERENCE" | "KEY_ROTATION_REQUESTED" | "KEY_ROTATED"
  | "KEY_RETIREMENT_COMPLETED" | "KEY_REVOCATION_REQUESTED" | "KEY_REVOKED" | "KEY_COMPROMISE_RECORDED"
  | "UNSUPPORTED_ALGORITHM_REJECTED" | "PRIVATE_KEY_ACCESS_DENIED" | "CLIENT_IMPORT_BLOCKED";

export interface CryptoAuditRecord {
  eventId: string; at: string; operation: CryptoAuditOperation; result: string;
  reasonCode: string; keyReference: string; version: number;
}
export function makeCryptoAudit(input: { eventId: string; at: string; operation: CryptoAuditOperation; result: "ok" | "denied" | "rejected"; reasonCode: string; keyReference: string; version?: number }): CryptoAuditRecord {
  return { eventId: input.eventId, at: input.at, operation: input.operation, result: input.result, reasonCode: input.reasonCode, keyReference: input.keyReference, version: input.version ?? 1 };
}
