/**
 * Runtime — Certification Authority : contrats de types (Sprint K4A).
 *
 * Couche d'AUTORISATION uniquement : décide si une émission FUTURE est autorisée. Ne génère AUCUN certificat,
 * badge, PDF, QR ni signature. PUR / node-testable. Aucune donnée privée dans les types PUBLICS.
 */

/** États de la machine d'autorité (cycle de vie logique d'une demande). */
export type AuthorityState =
  | "received"
  | "validating"
  | "rejected"
  | "eligible"
  | "issuance_pending"
  | "issuance_authorized"
  | "issuance_in_progress"
  | "issued"
  | "issuance_failed"
  | "suspended"
  | "revoked"
  | "replacement_pending"
  | "replaced"
  | "appeal_pending"
  | "appeal_resolved"
  | "administratively_blocked";

/** Décisions d'émission que SEULE l'autorité peut prendre. */
export type IssuanceDecision =
  | "issuance_allowed"
  | "issuance_denied"
  | "issuance_pending"
  | "issuance_already_completed"
  | "issuance_blocked"
  | "issuance_revoked"
  | "issuance_replaced";

/** Codes d'erreur PUBLIC-SAFE (aucune stack, note privée, clé ou donnée sensible). */
export type AuthorityErrorCode =
  | "feature_disabled"
  | "invalid_handoff"
  | "unsupported_contract_version"
  | "ineligible"
  | "duplicate_request"
  | "stale_version"
  | "concurrency_conflict"
  | "policy_not_found"
  | "issuer_not_allowed"
  | "credential_type_not_allowed"
  | "administratively_blocked"
  | "legacy_path_disabled"
  | "internal_error";

/** Résultat de validation du handoff (§6). */
export type HandoffValidationStatus =
  | "valid"
  | "invalid"
  | "unsupported_version"
  | "ineligible"
  | "malformed"
  | "tampered"
  | "duplicate"
  | "expired"
  | "administratively_blocked";

export type CredentialType = "completion_certificate" | "competency_badge";

/** Identifiants INTERNES opaques (jamais des identifiants publics finaux actifs). */
export interface AuthorityIds {
  authorizationId: string;
  credentialRecordId: string | null;
  replacementChainId: string | null;
  revocationRecordId: string | null;
  appealId: string | null;
}

/** Résultat d'autorisation PUBLIC-SAFE renvoyé par le service. */
export interface AuthorizationResult {
  decision: IssuanceDecision | "denied";
  state: AuthorityState;
  authorizationReference: string | null; // référence OPAQUE, jamais un credential actif
  credentialType: CredentialType | null;
  publicReasonCode: string;
  errorCode: AuthorityErrorCode | null;
  retryAllowed: boolean;
  appealAllowed: boolean;
  replacementAllowed: boolean;
  locale: string;
  /** INVARIANT : K4A n'émet jamais. */
  emitted: false;
}
