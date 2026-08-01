/**
 * Runtime — Secure Credential Orchestration : réservation d'émission (Sprint K4C-B, §12).
 *
 * Clé d'idempotence STABLE. Une réservation garantit qu'une décision finale ne produit qu'un seul credential
 * actif. `payloadFingerprint` détecte un replay incohérent (même clé, contenu différent).
 */
import type { CredentialType } from "../certification-authority/authority-types.ts";

export type ReservationStatus = "reserved" | "committed" | "failed" | "expired";

export interface IssuanceReservation {
  idempotencyKey: string;
  learnerReference: string;
  programReference: string;
  credentialType: CredentialType;
  finalDecisionReference: string;
  policyVersion: number;
  issuanceVersion: number;
  payloadFingerprint: string;
  status: ReservationStatus;
  credentialReference: string | null;
  createdAt: string;
  expiresAt: string | null;
}

/** Clé d'idempotence logique (§12). Déterministe. */
export function computeIssuanceIdempotencyKey(parts: {
  issuerCode: string; learnerReference: string; programReference: string;
  credentialType: CredentialType; finalDecisionReference: string; policyVersion: number; issuanceVersion: number;
}): string {
  return [parts.issuerCode, parts.learnerReference, parts.programReference, parts.credentialType, parts.finalDecisionReference, `p${parts.policyVersion}`, `i${parts.issuanceVersion}`].join("::");
}
