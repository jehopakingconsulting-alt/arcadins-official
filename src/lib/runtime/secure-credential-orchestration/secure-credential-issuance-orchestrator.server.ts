/**
 * Runtime — Secure Credential Orchestration : orchestrateur UNIQUE (SERVER-ONLY, Sprint K4C-B, §4).
 *
 * Seul point d'entrée applicatif pour émettre un CredentialRecord SIGNÉ. Chaîne : validation handoff → autorité
 * K4A → émission K4B → payload canonique → digest SHA-256 → signature Ed25519 (K4C-A) → vérification immédiate
 * (authenticité) → persistance (UnitOfWork/ports) → résultat public-safe. Fail-closed, idempotent, transaction
 * logique (commit/rollback en mémoire). N'émet AUCUN document (PDF/QR/page/email), n'appelle ni KMS réel, ni
 * Supabase, ni réseau, ni la route legacy. `.server.ts` : jamais importé par un composant client.
 */
import { SECURE_ISSUANCE_ORCHESTRATOR_ENABLED } from "./issuance-flags.ts";
import type { OrchestrationStatus, SecureIssuanceOutcome, SecureIssuanceRequest } from "./issuance-orchestration-types.ts";
import { computeIssuanceIdempotencyKey } from "./issuance-reservation.ts";
import type { CredentialAuditPersistencePort, CredentialIssuanceReservationPort, CredentialPersistencePort, CredentialPersistenceUnitOfWorkFactory } from "./persistence-ports.ts";
import { makeSecureIssuanceAudit, type SecureIssuanceAuditOperation } from "./issuance-audit.ts";
import { secureIssuanceError, type SecureIssuanceErrorCode } from "./issuance-errors.ts";
// K4A
import { CertificationAuthorizationService, type AuthorizeContext } from "../certification-authority/authorization-service.ts";
import { validateCertificationHandoffContract } from "../certification-authority/handoff-contract.ts";
// K4B
import { CredentialIssuanceService } from "../credential-issuance/credential-issuance-service.ts";
import { reviseCredential, type CredentialRecord } from "../credential-issuance/credential-record.ts";
import { buildCanonicalCredentialPayload } from "../credential-issuance/canonical-payload.ts";
import { createSha256IntegrityProvider } from "../credential-issuance/integrity-provider.ts";
import { createDisabledSigningProvider } from "../credential-issuance/signing-provider.ts";
import type { CredentialIdProvider } from "../credential-issuance/credential-id-generator.ts";
import type { CredentialRepositories } from "../credential-issuance/credential-repositories.ts";
// K4C-A
import type { ProductionSigningProvider } from "../credential-crypto/production-signing-provider.server.ts";
import { CredentialAuthenticityVerifier } from "../credential-crypto/credential-authenticity-verifier.ts";
import type { CredentialKeyProvider } from "../credential-crypto/credential-key-provider.ts";
import type { CryptographicPolicyRegistry } from "../credential-crypto/cryptographic-policy.ts";

export interface OrchestratorDeps {
  now: () => Date;
  eventId: () => string;
  environment: "production" | "ephemeral" | "test";
  issuanceVersion: number;
  // K4A
  authorizeContext: AuthorizeContext;
  // K4B
  credentialIds: CredentialIdProvider;
  credentialRepos: CredentialRepositories;
  // K4C-A
  signing: ProductionSigningProvider;
  keyProvider: CredentialKeyProvider;
  cryptoPolicyRegistry: CryptographicPolicyRegistry;
  // persistance
  reservation: CredentialIssuanceReservationPort;
  uowFactory: CredentialPersistenceUnitOfWorkFactory;
  credentialsPort: CredentialPersistencePort;
  // flags injectés (tests)
  orchestratorEnabled?: boolean;
  issuanceEnabled?: boolean;
}

function blank(publicReasonCode: string): SecureIssuanceOutcome {
  return { status: "issuance_failed", credentialReference: null, credentialType: null, issuerCode: null, issuedAt: null, expiresAt: null, authenticityStatus: null, signatureAlgorithm: null, publicKeyFingerprint: null, policyVersion: null, testOnly: true, reused: false, errorCode: null, publicReasonCode, locale: "fr" };
}

export const SecureCredentialIssuanceOrchestrator = {
  issue(request: SecureIssuanceRequest, deps: OrchestratorDeps): SecureIssuanceOutcome {
    const at = deps.now().toISOString();
    const correlationId = request.correlationId ?? `corr-${request.commandId}`;
    const auditPort: CredentialAuditPersistencePort | null = null; // audit passe par l'UnitOfWork (voir plus bas)
    const auditLog: ReturnType<typeof makeSecureIssuanceAudit>[] = [];
    const audit = (operation: SecureIssuanceAuditOperation, result: "ok" | "denied" | "failed" | "reused" | "blocked", reasonCode: string, publicReference: string) =>
      auditLog.push(makeSecureIssuanceAudit({ eventId: deps.eventId(), at, operation, result, reasonCode, correlationId, commandId: request.commandId, publicReference }));
    void auditPort;

    const fail = (errorCode: SecureIssuanceErrorCode, status: OrchestrationStatus = "issuance_failed"): SecureIssuanceOutcome => {
      const e = secureIssuanceError(errorCode);
      audit("ISSUANCE_FAILED", "failed", e.publicReasonCode, request.handoff.handoffId ?? "n/a");
      return { ...blank(e.publicReasonCode), status, errorCode };
    };

    // 0. Flag fail-closed.
    const enabled = deps.orchestratorEnabled ?? SECURE_ISSUANCE_ORCHESTRATOR_ENABLED;
    audit("SECURE_ISSUANCE_REQUESTED", enabled ? "ok" : "denied", enabled ? "requested" : "feature_disabled", request.handoff.handoffId ?? "n/a");
    if (!enabled) return { ...fail("feature_disabled", "feature_disabled") };

    // 1. Validation stricte du handoff.
    if (validateCertificationHandoffContract(request.handoff).status !== "valid") return fail("invalid_handoff");
    audit("CERTIFICATION_HANDOFF_VALIDATED", "ok", "valid", request.handoff.handoffId);

    // 2. Décision finale = final_pass obligatoire.
    if (!request.finalDecision.finalPassed || request.finalDecision.finalStatus !== "final_pass") return fail("not_final_pass");

    // 3. Autorisation K4A.
    const authorization = CertificationAuthorizationService.authorize(request.handoff, deps.authorizeContext);
    if (authorization.decision !== "issuance_allowed" || authorization.state !== "issuance_authorized") return fail("authorization_denied", "authorization_rejected");
    audit("AUTHORIZATION_CONFIRMED", "ok", "issuance_allowed", authorization.authorizationReference ?? "n/a");

    // 4. Idempotence : réservation.
    const idempotencyKey = computeIssuanceIdempotencyKey({ issuerCode: request.handoff.issuerCode, learnerReference: request.handoff.learnerReference, programReference: request.handoff.programReference, credentialType: request.credentialType, finalDecisionReference: request.finalDecision.finalDecisionId, policyVersion: request.handoff.contractVersion, issuanceVersion: deps.issuanceVersion });
    const payloadFingerprint = createSha256IntegrityProvider().compute({ schemaVersion: 1, credentialRecordId: "reservation", learnerReference: request.handoff.learnerReference, programReference: request.handoff.programReference, curriculumVersion: request.handoff.curriculumVersion, credentialType: request.credentialType, issuerCode: request.handoff.issuerCode, policyVersion: request.handoff.contractVersion, finalDecisionId: request.finalDecision.finalDecisionId, issuedAt: "", validFrom: "", expiresAt: null, lifecycleInitial: "issued", integrityAlgorithm: "SHA-256", publicClaims: {} }).integrityDigest;
    const existing = deps.reservation.get(idempotencyKey);
    if (existing) {
      if (existing.payloadFingerprint !== payloadFingerprint) { audit("ISSUANCE_CONFLICT_DETECTED", "failed", "replay_conflict", idempotencyKey); return { ...fail("replay_conflict", "conflict") }; }
      if (existing.status === "committed" && existing.credentialReference) {
        audit("ISSUANCE_REPLAYED", "reused", "replayed", existing.credentialReference);
        const rec = deps.credentialsPort.findByReference(existing.credentialReference);
        return toOutcome(rec, deps.environment !== "production", true, "replayed");
      }
    }
    const reserved = deps.reservation.reserve({ idempotencyKey, learnerReference: request.handoff.learnerReference, programReference: request.handoff.programReference, credentialType: request.credentialType, finalDecisionReference: request.finalDecision.finalDecisionId, policyVersion: request.handoff.contractVersion, issuanceVersion: deps.issuanceVersion, payloadFingerprint, status: "reserved", credentialReference: null, createdAt: at, expiresAt: null });
    audit(reserved.created ? "ISSUANCE_RESERVATION_CREATED" : "ISSUANCE_RESERVATION_REUSED", reserved.created ? "ok" : "reused", "reserved", idempotencyKey);

    // 5. Émission K4B (record NON signé ; provider de signature désactivé à ce stade).
    const issue = CredentialIssuanceService.issue({ authorization, handoff: { handoffId: request.handoff.handoffId, learnerReference: request.handoff.learnerReference, programReference: request.handoff.programReference, curriculumVersion: request.handoff.curriculumVersion, finalDecisionId: request.finalDecision.finalDecisionId, finalDecisionVersion: request.handoff.finalDecisionVersion, issuerCode: request.handoff.issuerCode, credentialType: request.credentialType, locale: request.handoff.locale }, policyVersion: request.handoff.contractVersion }, { now: deps.now, ids: deps.credentialIds, integrity: createSha256IntegrityProvider(), signing: createDisabledSigningProvider(), repos: deps.credentialRepos, featureEnabled: deps.issuanceEnabled ?? false });
    if (!issue.credentialRecordId) return fail("policy_disabled");
    const baseRecord = deps.credentialRepos.findById(issue.credentialRecordId)!;
    audit("CREDENTIAL_RECORD_PREPARED", "ok", "prepared", baseRecord.credentialRecordId);

    // 6. Payload canonique + intégrité.
    const integrity = createSha256IntegrityProvider();
    const canonical = buildCanonicalCredentialPayload(baseRecord, integrity.algorithm());
    const digest = integrity.compute(canonical).integrityDigest;
    audit("CANONICAL_PAYLOAD_BUILT", "ok", "built", baseRecord.credentialRecordId);
    audit("INTEGRITY_DIGEST_CREATED", "ok", integrity.algorithm(), baseRecord.credentialRecordId);

    // 7. Signature (K4C-A).
    audit("SIGNING_REQUESTED", "ok", "requested", baseRecord.credentialRecordId);
    const envelope = deps.signing.sign(digest, { signedAt: at });
    const uow = deps.uowFactory.create();
    const testOnly = deps.environment !== "production";
    if (!envelope) {
      uow.rollback();
      deps.reservation.updateStatus(idempotencyKey, "failed", null);
      audit("ISSUANCE_ROLLED_BACK", "failed", "signature_failed", baseRecord.credentialRecordId);
      return persistFailAudit(fail("signature_failed", "signature_verification_failed"), auditLog, deps);
    }
    audit("SIGNATURE_CREATED", "ok", String(envelope.algorithm), baseRecord.credentialRecordId);

    // 8. Attacher la signature au record (additif, immuable → nouvelle révision).
    const signedRecord = reviseCredential(baseRecord, { integrityDigest: digest, signatureStatus: "signed", signedAt: at, signingPolicyVersion: envelope.policyVersion, cryptographicAlgorithm: String(envelope.algorithm), publicKeyFingerprint: envelope.publicKeyFingerprint, canonicalizationVersion: envelope.canonicalizationVersion, signatureReference: envelope.keyReference }, at);

    // 9. VÉRIFICATION IMMÉDIATE — commit interdit si non authentique.
    const authenticity = CredentialAuthenticityVerifier.verify({ record: signedRecord, envelope, keyProvider: deps.keyProvider, integrity, policyRegistry: deps.cryptoPolicyRegistry });
    const acceptable = authenticity.status === "authentic" || authenticity.status === "retired_key_valid_at_signing_time" || authenticity.status === "test_signature_only";
    if (!acceptable) {
      uow.rollback();
      deps.reservation.updateStatus(idempotencyKey, "failed", null);
      audit("ISSUANCE_ROLLED_BACK", "failed", `verification_${authenticity.status}`, baseRecord.credentialRecordId);
      return persistFailAudit(fail("verification_failed", "signature_verification_failed"), auditLog, deps);
    }
    audit("SIGNATURE_VERIFIED", "ok", authenticity.status, baseRecord.credentialRecordId);

    // 10. Persistance transactionnelle (stage → commit).
    audit("CREDENTIAL_PERSISTENCE_STARTED", "ok", "started", signedRecord.credentialRecordId);
    const persisted = uow.persistCredential(signedRecord, { testOnly });
    if (!persisted.ok) {
      uow.rollback();
      deps.reservation.updateStatus(idempotencyKey, "failed", null);
      audit("PRODUCTION_PERSISTENCE_BLOCKED", "blocked", persisted.reasonCode, signedRecord.credentialRecordId);
      return persistFailAudit(fail("production_persistence_blocked"), auditLog, deps);
    }
    uow.persistSignatureMetadata(signedRecord.credentialRecordId, envelope);
    audit("CREDENTIAL_PERSISTED", "ok", "persisted", signedRecord.credentialRecordId);
    audit("SIGNATURE_METADATA_PERSISTED", "ok", "persisted", signedRecord.credentialRecordId);
    if (testOnly) audit("TEST_CREDENTIAL_CREATED", "ok", "test_only", signedRecord.credentialRecordId);
    for (const a of auditLog) uow.persistAudit(a);
    uow.commit();
    deps.reservation.updateStatus(idempotencyKey, "committed", signedRecord.credentialRecordId);

    return toOutcome(signedRecord, testOnly, false, "issued", { authenticityStatus: authenticity.status, algorithm: String(envelope.algorithm), fingerprint: envelope.publicKeyFingerprint, policyVersion: envelope.policyVersion });
  },
};

function persistFailAudit(outcome: SecureIssuanceOutcome, auditLog: ReturnType<typeof makeSecureIssuanceAudit>[], deps: OrchestratorDeps): SecureIssuanceOutcome {
  // En cas d'échec avant commit : l'audit d'échec est enregistré directement (pas de record/signature persistés).
  const uow = deps.uowFactory.create();
  for (const a of auditLog) uow.persistAudit(a);
  uow.commit();
  return outcome;
}

function toOutcome(record: CredentialRecord | null, testOnly: boolean, reused: boolean, status: OrchestrationStatus, sig?: { authenticityStatus: string; algorithm: string; fingerprint: string; policyVersion: number }): SecureIssuanceOutcome {
  if (!record) return { status: "issuance_failed", credentialReference: null, credentialType: null, issuerCode: null, issuedAt: null, expiresAt: null, authenticityStatus: null, signatureAlgorithm: null, publicKeyFingerprint: null, policyVersion: null, testOnly, reused, errorCode: "internal_error", publicReasonCode: "credential.issuance.error.internal_error", locale: "fr" };
  return {
    status, credentialReference: record.credentialRecordId, credentialType: record.credentialType, issuerCode: record.issuerCode,
    issuedAt: record.issuedAt, expiresAt: record.expiresAt, authenticityStatus: sig?.authenticityStatus ?? record.signatureStatus ?? null,
    signatureAlgorithm: sig?.algorithm ?? record.cryptographicAlgorithm ?? null, publicKeyFingerprint: sig?.fingerprint ?? record.publicKeyFingerprint ?? null,
    policyVersion: sig?.policyVersion ?? record.signingPolicyVersion ?? null, testOnly, reused, errorCode: null,
    publicReasonCode: `credential.issuance.status.${status}`, locale: "fr",
  };
}
