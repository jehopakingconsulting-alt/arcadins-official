/**
 * Runtime — Certification, Credentials & Badges Engine : types & interfaces (Sprint H).
 *
 * Moteur GÉNÉRIQUE et SÉCURISÉ de certification interne d'ARCADINS. Émet des attestations / certificats / badges
 * VÉRIFIABLES à partir d'un `ExamResultContract` FINALISÉ (Sprint G) ou d'un contrat académique équivalent validé.
 *
 * Garanties : source de vérité = résultat définitif réussi ; document émis IMMUABLE ; identifiant public opaque ;
 * payload public minimal ; hash déterministe + signature injectée (aucune clé réelle en dur) ; idempotence ;
 * dédoublonnage ; audit. Aucune UI, aucune base, aucun réseau, aucun PDF, aucune image QR, aucun LLM.
 * Aucune reconnaissance officielle inventée. Aucune logique propre à un programme.
 */
import type { ExamResultContract, FinalExamVersion } from "../exam/types.ts";

export type { ExamResultContract, FinalExamVersion };

// ─────────────────────────── Types de credential ───────────────────────────
export type CredentialType =
  | "achievement_attestation"
  | "course_completion_certificate"
  | "competency_badge"
  | "distinction_badge"
  | "participation_attestation";

export type CredentialLanguage = "fr" | "en" | "es" | "it" | "pt" | "de" | "ht";

/** Langue canonique initiale. */
export const CANONICAL_LANGUAGE: CredentialLanguage = "fr";

// ─────────────────────────── Statuts ───────────────────────────
export type CredentialStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "issued"
  | "active"
  | "suspended"
  | "revoked"
  | "replaced"
  | "expired"
  | "cancelled"
  | "invalidated";

// ─────────────────────────── Politique versionnée ───────────────────────────
export type ExpirationPolicy = { kind: "never" } | { kind: "duration"; validitySeconds: number };
export type ReplacementPolicy = { allowed: boolean; supersedePrevious: boolean };
export type RevocationPolicy = { allowed: boolean; publicReasonAllowed: CredentialPublicRevocationReason[] };

export interface CredentialPolicy {
  credentialType: CredentialType;
  programId: string;
  publicTitleKey: string;
  descriptionKey: string;
  /** Conditions d'émission propres à la politique (agnostiques du contenu). */
  issuanceConditions: {
    requireFinalExamPassed: boolean;
    requireFinalProjectValidated: boolean;
    requireFullProgress: boolean;
    minimumFinalScorePercent: number | null;
    requiredCompetencyCodes: string[];
  };
  /** Champs publics autorisés dans le document (liste blanche). */
  allowedPublicFields: PublicFieldKey[];
  /** La politique autorise-t-elle l'affichage du score final ? */
  disclosesFinalScore: boolean;
  expiration: ExpirationPolicy;
  replacement: ReplacementPolicy;
  revocation: RevocationPolicy;
  associatedBadgeDefinitionIds: string[];
  institutionalSignatureKeyId: string;
  languages: CredentialLanguage[];
  templateVersion: number;
  brandingVersion: number;
  legalNoticeKeys: string[];
  version: number;
  activatedAt: string | null;
  retiredAt: string | null;
  /** La politique est-elle activable ? (par défaut seul achievement_attestation le sera plus tard). */
  activatable: boolean;
}

export interface CredentialPolicyVersion {
  policyVersion: number;
  templateVersion: number;
  brandingVersion: number;
  signatureKeyId: string;
}

export type PublicFieldKey =
  | "publicVerificationId"
  | "documentNumber"
  | "credentialType"
  | "documentTitle"
  | "learnerDisplayName"
  | "programTitle"
  | "issuedAt"
  | "completionDate"
  | "status"
  | "issuerDisplayName"
  | "competencies"
  | "version"
  | "verificationStatement"
  | "replacementReference"
  | "finalScore";

// ─────────────────────────── Admissibilité ───────────────────────────
export interface CredentialEligibilityContext {
  /** Contrat FINAL du Sprint G (source de vérité). */
  finalResult: ExamResultContract;
  /** Identité académique publique (jamais l'id interne). */
  learnerDisplayName: string | null;
  /** Référence opaque de l'apprenant (dédoublonnage uniquement, jamais publiée). */
  learnerReference: string;
  programAdmissibleForIssuance: boolean;
  fullProgressCompleted: boolean;
  finalProjectValidated: boolean;
  administrativeDebtBlocking: boolean;
  documentTitleAuthorized: boolean;
  specialApproval?: "granted" | "denied" | null;
  /** Une émission active identique existe-t-elle déjà ? (fournie par l'appelant / repo). */
  existingActiveIssuanceKey?: string | null;
}

export type CredentialEligibilityStatus =
  | "eligible"
  | "ineligible"
  | "conditionally_eligible"
  | "requires_manual_approval"
  | "already_issued"
  | "blocked";

export interface CredentialEligibilityResult {
  status: CredentialEligibilityStatus;
  reasonCodes: CredentialReasonCode[];
  unmetCodes: CredentialReasonCode[];
  checkedAt: string;
}

export type CredentialReasonCode = string;

// ─────────────────────────── Émission ───────────────────────────
export interface CredentialIssuanceRequest {
  commandId: string;
  credentialType: CredentialType;
  policy: CredentialPolicy;
  eligibilityContext: CredentialEligibilityContext;
  language: CredentialLanguage;
  issuerName: string;
  issuerDisplayName: string;
  authorizedSignatoryReferences: string[];
  programTitle: string;
  programVersion: FinalExamVersion | number;
}

export type CredentialIssuanceOutcome = "issued" | "already_issued" | "blocked";
export interface CredentialIssuanceDecision {
  outcome: CredentialIssuanceOutcome;
  credentialId: string | null;
  reasonCodes: CredentialReasonCode[];
  decidedAt: string;
}

// ─────────────────────────── Snapshot (gelé) ───────────────────────────
export interface CredentialCompetencyView {
  competencyCode: string;
  labelKey: string;
  achieved: boolean;
}
export interface CredentialSnapshot {
  learnerDisplayName: string;
  programId: string;
  programTitle: string;
  programVersion: FinalExamVersion | number;
  credentialPolicyVersion: number;
  language: CredentialLanguage;
  completionDate: string;
  finalResultReference: string;
  /** Score final gelé uniquement si la politique l'autorise (sinon null). */
  finalScore: number | null;
  competencies: CredentialCompetencyView[];
  issuerName: string;
  issuedAt: string;
  authorizedSignatoryReferences: string[];
  legalNoticeKeys: string[];
  documentTitle: string;
  documentNumber: string;
  verificationId: string;
  templateVersion: number;
  brandingVersion: number;
}

// ─────────────────────────── Intégrité cryptographique ───────────────────────────
export interface CredentialHash {
  algorithm: string;
  value: string;
}
export interface CredentialSignature {
  algorithm: string;
  keyId: string;
  value: string;
}
export interface CredentialIntegrityEnvelope {
  canonicalVersion: number;
  contentHash: CredentialHash;
  signature: CredentialSignature;
}

/** Fournisseur de hachage injectable (défaut = SHA-256 pur, déterministe, testable). */
export interface HashProvider {
  algorithm: string;
  hash(input: string): string;
}
/** Fournisseur de signature injectable. AUCUNE clé réelle en dur — la clé est fournie au runtime. */
export interface SignerProvider {
  algorithm: string;
  activeKeyId: string;
  sign(canonical: string): CredentialSignature;
  verify(canonical: string, signature: CredentialSignature): boolean;
}

// ─────────────────────────── Enregistrements ───────────────────────────
export interface CredentialVersion {
  versionId: string;
  version: number;
  snapshot: CredentialSnapshot;
  integrity: CredentialIntegrityEnvelope;
  policyVersion: number;
  templateVersion: number;
  brandingVersion: number;
  language: CredentialLanguage;
  createdAt: string;
}

/** Enregistrement PRIVÉ complet (serveur). Ne va jamais au client tel quel. */
export interface CredentialPrivateRecord {
  internalCredentialId: string;
  publicVerificationId: string;
  documentNumber: string;
  credentialType: CredentialType;
  status: CredentialStatus;
  issuanceKey: string; // clé logique de dédoublonnage
  learnerReference: string; // opaque, jamais publié
  programId: string;
  currentVersion: CredentialVersion;
  versionHistory: CredentialVersion[];
  replacedByPublicId: string | null;
  replacesPublicId: string | null;
  expiresAt: string | null;
  suspendedReasonCode: string | null;
  revocation: CredentialRevocationDecision | null;
  badgePublicIds: string[];
  processedCommands: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}
export type CredentialRecord = CredentialPrivateRecord;

// ─────────────────────────── Vue publique ───────────────────────────
export interface CredentialPublicView {
  publicVerificationId: string;
  documentNumber: string;
  credentialType: CredentialType;
  documentTitle: string;
  learnerDisplayName: string;
  programTitle: string;
  issuedAt: string;
  completionDate: string;
  status: CredentialStatus;
  issuerDisplayName: string;
  competencies: { competencyCode: string; labelKey: string }[];
  version: number;
  verificationStatementKey: string;
  replacementReference: string | null;
  finalScore?: number | null;
}

// ─────────────────────────── Vérification ───────────────────────────
export type VerificationMethod = "public_id" | "document_number" | "qr" | "hash" | "signature";
export interface CredentialVerificationRequest {
  method: VerificationMethod;
  publicVerificationId?: string;
  documentNumber?: string;
  qrPayload?: QRVerificationPayload;
  hash?: string;
  signature?: CredentialSignature;
  /** Version de vérification supportée par l'appelant. */
  supportedVersion?: number;
  commandId?: string;
}
export type VerificationStatus =
  | "valid"
  | "invalid"
  | "revoked"
  | "suspended"
  | "replaced"
  | "expired"
  | "not_found"
  | "tampered"
  | "unsupported_version"
  | "requires_manual_verification";
export interface CredentialVerificationResult {
  status: VerificationStatus;
  documentTitle: string | null;
  learnerDisplayName: string | null;
  programTitle: string | null;
  issuedAt: string | null;
  issuerDisplayName: string | null;
  replacementReference: string | null;
  verificationStatementKey: string;
  reasonCodes: CredentialReasonCode[];
  checkedAt: string;
}

// ─────────────────────────── QR (contrat logique, pas d'image) ───────────────────────────
export interface QRVerificationPayload {
  version: number;
  verificationUrlBase: string;
  publicVerificationId: string;
  documentNumber?: string;
  checksum: string;
  issuerCode: string;
}

// ─────────────────────────── Remplacement ───────────────────────────
export type ReplacementReason =
  | "name_typo"
  | "administrative_correction"
  | "template_change"
  | "program_error"
  | "reissue"
  | "new_version"
  | "compromised_document";
export interface CredentialReplacementRequest {
  commandId: string;
  credentialPublicId: string;
  reason: ReplacementReason;
  snapshotOverrides?: Partial<CredentialSnapshot>;
  requestedByReference: string;
}
export interface CredentialReplacementResult {
  outcome: "replaced" | "blocked" | "already_replaced";
  previousPublicId: string;
  newPublicId: string | null;
  reasonCodes: CredentialReasonCode[];
  replacedAt: string;
}

// ─────────────────────────── Révocation ───────────────────────────
export type CredentialPrivateRevocationReason =
  | "issued_in_error"
  | "academic_result_invalidated"
  | "identity_mismatch"
  | "duplicate_issuance"
  | "policy_violation"
  | "administrative_decision"
  | "fraud_confirmed_after_due_process"
  | "superseded"
  | "technical_compromise"
  | "other_reviewed_reason";
export type CredentialPublicRevocationReason = "revoked_by_issuer" | "superseded" | "academic_review" | "technical_reissue";
export type AppealStatus =
  | "none"
  | "appeal_requested"
  | "under_review"
  | "additional_information_required"
  | "approved"
  | "denied"
  | "credential_restored"
  | "replacement_issued"
  | "closed";
export interface CredentialRevocationRequest {
  commandId: string;
  credentialPublicId: string;
  privateReasonCode: CredentialPrivateRevocationReason;
  publicReasonCode: CredentialPublicRevocationReason;
  revokedByReference: string;
  evidenceReference?: string | null;
}
export interface CredentialRevocationDecision {
  publicReasonCode: CredentialPublicRevocationReason;
  privateReasonCode: CredentialPrivateRevocationReason;
  revokedAt: string;
  revokedByReference: string;
  evidenceReference: string | null;
  appealStatus: AppealStatus;
}

// ─────────────────────────── Appel ───────────────────────────
export interface CredentialAppeal {
  id: string;
  credentialPublicId: string;
  status: AppealStatus;
  requestedByReference: string;
  reason: string;
  decisions: { at: string; status: AppealStatus; byReference: string; note?: string }[];
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────── Badges ───────────────────────────
export type BadgeKind = "program_completed" | "competency_acquired" | "distinction" | "final_project" | "attendance" | "mastery_level";
export type BadgeStatus = "issued" | "active" | "revoked" | "expired";
export interface BadgeDefinition {
  badgeDefinitionId: string;
  kind: BadgeKind;
  titleKey: string;
  descriptionKey: string;
  competencyCodes: string[];
  criteriaVersion: number;
  /** Preuve requise pour émettre (jamais un simple affichage client). */
  requiresEvidence: boolean;
  expiration: ExpirationPolicy;
}
export interface BadgeRecord {
  internalBadgeId: string;
  badgeDefinitionId: string;
  kind: BadgeKind;
  titleKey: string;
  descriptionKey: string;
  competencyCodes: string[];
  criteriaVersion: number;
  issuedAt: string;
  publicVerificationId: string;
  status: BadgeStatus;
  evidenceReference: string;
  expiresAt: string | null;
  parentCredentialReference: string | null;
  issuanceKey: string;
  processedCommands: Record<string, string>;
}

// ─────────────────────────── Modèle de document abstrait ───────────────────────────
export interface CredentialDocumentModel {
  header: { issuerName: string; brandingVersion: number; templateVersion: number };
  issuer: { name: string; displayName: string; signatoryReferences: string[] };
  title: { key: string; text: string };
  recipient: { displayName: string };
  program: { title: string; programId: string; version: FinalExamVersion | number };
  completion: { date: string; finalScore: number | null };
  competencies: { competencyCode: string; labelKey: string; achieved: boolean }[];
  distinction: { present: boolean; labelKey: string | null };
  issuance: { documentNumber: string; issuedAt: string; version: number };
  signatures: { reference: string }[];
  verification: { publicVerificationId: string; statementKey: string; humanReadableId: string };
  qrPayload: QRVerificationPayload;
  legalNotices: string[];
  footer: { languageOrder: CredentialLanguage[]; canonicalLanguage: CredentialLanguage };
  versionMetadata: { policyVersion: number; templateVersion: number; brandingVersion: number; language: CredentialLanguage };
  accessibility: { selectableText: true; logicalReadingOrder: true; humanReadableId: string; altTextKeys: string[] };
}

// ─────────────────────────── Audit ───────────────────────────
export type CredentialAuditEventType =
  | "credential.eligibility_checked"
  | "credential.issuance_requested"
  | "credential.issuance_blocked"
  | "credential.approval_requested"
  | "credential.approved"
  | "credential.snapshot_created"
  | "credential.integrity_hash_created"
  | "credential.signature_created"
  | "credential.issued"
  | "credential.activated"
  | "credential.verified"
  | "credential.verification_failed"
  | "credential.suspended"
  | "credential.revoked"
  | "credential.replacement_requested"
  | "credential.replaced"
  | "credential.expired"
  | "credential.cancelled"
  | "credential.appeal_requested"
  | "credential.appeal_reviewed"
  | "credential.restored"
  | "badge.issued"
  | "badge.revoked";
export interface CredentialAuditEvent {
  type: CredentialAuditEventType;
  at: string;
  payload: Record<string, unknown>;
}

// ─────────────────────────── Validation ───────────────────────────
export interface CredentialValidationIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}
export interface CredentialValidationReport {
  ok: boolean;
  errors: CredentialValidationIssue[];
  warnings: CredentialValidationIssue[];
}

// ─────────────────────────── Résultat moteur ───────────────────────────
export interface CertificationEngineResult {
  record: CredentialPrivateRecord | null;
  publicView: CredentialPublicView | null;
  events: CredentialAuditEvent[];
}
