/**
 * Runtime — Secure Credential Orchestration : types (Sprint K4C-B).
 *
 * Chaîne UNIQUE d'émission signée : handoff → autorité K4A → émission K4B → signature K4C-A → vérification →
 * persistance (ports). Public-safe. Aucune matière privée dans les types PUBLICS.
 */
import type { CertificationHandoffInput } from "../certification-authority/handoff-contract.ts";
import type { CredentialType } from "../certification-authority/authority-types.ts";

/** Statuts de l'orchestration (§19). */
export type OrchestrationStatus =
  | "requested"
  | "validating_handoff"
  | "authorization_pending"
  | "authorization_rejected"
  | "preparing_record"
  | "signing"
  | "signature_verification_failed"
  | "persistence_pending"
  | "issued"
  | "replayed"
  | "conflict"
  | "rolled_back"
  | "issuance_failed"
  | "feature_disabled"
  | "test_credential_only";

/** Décision finale minimale exigée (doit être `final_pass`). */
export interface FinalDecisionRef {
  finalDecisionId: string;
  finalStatus: string;
  finalPassed: boolean;
}

/** Requête d'émission sécurisée. */
export interface SecureIssuanceRequest {
  handoff: CertificationHandoffInput;
  finalDecision: FinalDecisionRef;
  credentialType: CredentialType;
  commandId: string;
  correlationId?: string;
}

/** Résultat d'orchestration (interne — le ViewModel public en dérive). */
export interface SecureIssuanceOutcome {
  status: OrchestrationStatus;
  credentialReference: string | null; // opaque
  credentialType: CredentialType | null;
  issuerCode: string | null;
  issuedAt: string | null;
  expiresAt: string | null;
  authenticityStatus: string | null;
  signatureAlgorithm: string | null;
  publicKeyFingerprint: string | null;
  policyVersion: number | null;
  testOnly: boolean;
  reused: boolean;
  errorCode: string | null;
  publicReasonCode: string;
  locale: string;
}
