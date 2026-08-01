/**
 * Runtime — Credential Issuance : service d'ÉMISSION du noyau (Sprint K4B, §8–§9).
 *
 * Consomme un `AuthorizationResult` K4A (`issuance_allowed`), crée un CredentialRecord INTERNE, son payload
 * canonique, son empreinte d'intégrité et une signature ABSTRAITE (provider injecté). N'ÉMET AUCUN document
 * (PDF/QR/image/page/email), n'appelle ni Supabase, ni réseau, ni Stripe. Fail-closed. Idempotent (CAS). PUR.
 */
import { CREDENTIAL_ISSUANCE_ENABLED } from "../certification-authority/flags.ts";
import type { AuthorizationResult, CredentialType } from "../certification-authority/authority-types.ts";
import type { CredentialErrorCode, CredentialLifecycleStatus } from "./credential-types.ts";
import { CREDENTIAL_RECORD_VERSION, type CredentialRecord } from "./credential-record.ts";
import { transitionCredential } from "./credential-state-machine.ts";
import { buildCanonicalCredentialPayload } from "./canonical-payload.ts";
import type { IntegrityProvider } from "./integrity-provider.ts";
import type { SigningProvider } from "./signing-provider.ts";
import type { CredentialIdProvider } from "./credential-id-generator.ts";
import type { CredentialRepositories } from "./credential-repositories.ts";
import { computeExpiresAt, NEVER_EXPIRES, type CredentialExpirationPolicy } from "./credential-expiration-policy.ts";
import { makeCredentialAudit } from "./credential-audit.ts";
import { credentialError } from "./credential-errors.ts";

export interface IssuanceHandoffData {
  handoffId: string;
  learnerReference: string;
  programReference: string;
  curriculumVersion: string;
  finalDecisionId: string;
  finalDecisionVersion: number;
  issuerCode: string;
  credentialType: CredentialType;
  locale: string;
}

export interface IssuanceInput {
  authorization: AuthorizationResult;
  handoff: IssuanceHandoffData;
  policyVersion: number;
  expiration?: CredentialExpirationPolicy;
  metadata?: Record<string, string | number | boolean>;
}

export interface IssuanceContext {
  now: () => Date;
  ids: CredentialIdProvider;
  integrity: IntegrityProvider;
  signing: SigningProvider;
  repos: CredentialRepositories;
  featureEnabled?: boolean; // défaut = flag (false) → fail-closed
}

export interface CredentialIssuanceResult {
  status: CredentialLifecycleStatus | "denied";
  credentialRecordId: string | null;
  credentialType: CredentialType | null;
  issuerCode: string | null;
  issuedAt: string | null;
  validFrom: string | null;
  expiresAt: string | null;
  integrityReference: string | null;
  signatureReference: string | null;
  reused: boolean;
  errorCode: CredentialErrorCode | null;
  publicReasonCode: string;
  locale: string;
  /** INVARIANT : aucun document (PDF/QR/image/page/email) n'est produit par K4B. */
  documentEmitted: false;
}

function issuanceKeyOf(input: IssuanceInput): string {
  const a = input.authorization.authorizationReference ?? "no-auth";
  return [a, input.handoff.finalDecisionId, input.handoff.learnerReference, input.handoff.programReference, input.handoff.credentialType, `p${input.policyVersion}`].join("::");
}

function denied(errorCode: CredentialErrorCode, locale: string): CredentialIssuanceResult {
  const e = credentialError(errorCode);
  return { status: "denied", credentialRecordId: null, credentialType: null, issuerCode: null, issuedAt: null, validFrom: null, expiresAt: null, integrityReference: null, signatureReference: null, reused: false, errorCode, publicReasonCode: e.publicReasonCode, locale, documentEmitted: false };
}

export const CredentialIssuanceService = {
  issue(input: IssuanceInput, ctx: IssuanceContext): CredentialIssuanceResult {
    const enabled = ctx.featureEnabled ?? CREDENTIAL_ISSUANCE_ENABLED;
    const at = ctx.now().toISOString();
    const locale = input.handoff.locale;
    const audit = (operation: Parameters<typeof makeCredentialAudit>[0]["operation"], result: Parameters<typeof makeCredentialAudit>[0]["result"], reasonCode: string, publicReference: string) =>
      ctx.repos.audit.append(makeCredentialAudit({ eventId: ctx.ids.issuanceEventId(), at, operation, result, reasonCode, publicReference }));

    if (!enabled) { audit("CREDENTIAL_ISSUANCE_REQUESTED", "denied", "credential.error.feature_disabled", "n/a"); return denied("feature_disabled", locale); }
    audit("CREDENTIAL_ISSUANCE_REQUESTED", "ok", "credential.audit.requested", input.handoff.handoffId);

    // Autorisation K4A obligatoire.
    const a = input.authorization;
    if (a.decision !== "issuance_allowed" || a.state !== "issuance_authorized" || !a.authorizationReference) {
      audit("CREDENTIAL_ISSUANCE_REQUESTED", "denied", "credential.error.not_authorized", input.handoff.handoffId);
      return denied("not_authorized", locale);
    }
    audit("CREDENTIAL_ISSUANCE_AUTHORIZED", "ok", "credential.audit.authorized", a.authorizationReference);

    // Idempotence.
    const key = issuanceKeyOf(input);
    const existing = ctx.repos.findByIssuanceKey(key);
    if (existing) { audit("CREDENTIAL_ISSUANCE_REUSED", "reused", "credential.audit.reused", existing.credentialRecordId); return toResult(existing, true); }

    // Émission atomique : pending_issuance → issued → active (transitions vérifiées par la machine à états).
    transitionCredential("pending_issuance", "issued");
    transitionCredential("issued", "active");
    const validFrom = at;
    const expiresAt = computeExpiresAt(input.expiration ?? NEVER_EXPIRES, { issuedAt: at, validFrom });
    const recordId = ctx.ids.credentialRecordId();

    let record: CredentialRecord = {
      recordVersion: CREDENTIAL_RECORD_VERSION, credentialRecordId: recordId, authorizationId: a.authorizationReference,
      handoffId: input.handoff.handoffId, learnerReference: input.handoff.learnerReference, programReference: input.handoff.programReference,
      curriculumVersion: input.handoff.curriculumVersion, credentialType: input.handoff.credentialType, issuerCode: input.handoff.issuerCode,
      policyVersion: input.policyVersion, finalDecisionId: input.handoff.finalDecisionId, finalDecisionVersion: input.handoff.finalDecisionVersion,
      issuedAt: at, validFrom, expiresAt, lifecycleStatus: "active", publicCredentialReference: null,
      integrityReference: "", signatureReference: null, replacementChainId: null, replacesCredentialRecordId: null,
      replacedByCredentialRecordId: null, revocationReference: null, metadata: { ...(input.metadata ?? {}) }, createdAt: at, updatedAt: at, revision: 1,
    };

    // Intégrité (checksum SHA-256, aucune clé).
    const integrity = ctx.integrity.compute(buildCanonicalCredentialPayload(record, ctx.integrity.algorithm()));
    record = { ...record, integrityReference: integrity.integrityReference };
    audit("INTEGRITY_DIGEST_CREATED", "ok", integrity.integrityAlgorithm, recordId);

    // Signature ABSTRAITE (Disabled → null ; TestOnly → enveloppe déterministe).
    const envelope = ctx.signing.sign(integrity.integrityDigest, { signedAt: at });
    if (envelope) {
      const sigRef = ctx.ids.signatureReference();
      record = { ...record, signatureReference: sigRef };
      ctx.repos.signatures.save(recordId, envelope);
      audit("TEST_SIGNATURE_CREATED", "ok", envelope.testOnly ? "test_only" : "unknown", sigRef);
    }

    // Persistance (CAS sur la clé d'émission → un seul record sous concurrence).
    const { created, record: stored } = ctx.repos.createIfAbsent(key, record);
    if (!created) { audit("DUPLICATE_ISSUANCE_PREVENTED", "reused", "credential.audit.duplicate_prevented", stored.credentialRecordId); return toResult(stored, true); }
    ctx.repos.integrity.save(recordId, integrity);
    audit("CREDENTIAL_RECORD_CREATED", "ok", "credential.audit.record_created", recordId);
    audit("CREDENTIAL_ISSUED", "ok", "credential.audit.issued", recordId);
    return toResult(stored, false);
  },
};

function toResult(record: CredentialRecord, reused: boolean): CredentialIssuanceResult {
  return {
    status: record.lifecycleStatus, credentialRecordId: record.credentialRecordId, credentialType: record.credentialType,
    issuerCode: record.issuerCode, issuedAt: record.issuedAt, validFrom: record.validFrom, expiresAt: record.expiresAt,
    integrityReference: record.integrityReference, signatureReference: record.signatureReference, reused,
    errorCode: null, publicReasonCode: "credential.status.active", locale: "fr", documentEmitted: false,
  };
}
