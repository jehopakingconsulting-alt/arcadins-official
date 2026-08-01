/**
 * Runtime — Certification Authority : service d'AUTORISATION (Sprint K4A, §4, §15).
 *
 * AUTORITÉ UNIQUE d'émission. Reçoit un handoff, le valide, charge la policy, vérifie éligibilité + restrictions
 * administratives + idempotence, produit une DÉCISION d'autorisation, journalise l'audit, renvoie un résultat
 * PUBLIC-SAFE. N'ÉMET RIEN : aucun certificat/badge/PDF/QR, aucun Stripe, aucun Supabase réel, aucun réseau,
 * aucune page publiée, aucun courriel. Fail-closed lorsque le flag d'autorité est OFF. PUR / node-testable.
 */
import { CERTIFICATION_AUTHORITY_ENABLED } from "./flags.ts";
import type { AuthorityIdProvider } from "./id-generator.ts";
import type { AuthorityRepositories, AuthorizationRecord } from "./repositories.ts";
import type { CertificationPolicyRegistry } from "./policy-registry.ts";
import type { IntegrityProvider } from "./integrity.ts";
import type { AuthorityErrorCode, AuthorityState, AuthorizationResult, CredentialType, IssuanceDecision } from "./authority-types.ts";
import { validateCertificationHandoffContract, type CertificationHandoffInput } from "./handoff-contract.ts";
import { safeError, validationStatusToError } from "./errors.ts";
import { makeAuditRecord } from "./audit.ts";

export interface AuthorizeContext {
  now: () => Date;
  ids: AuthorityIdProvider;
  policyRegistry: CertificationPolicyRegistry;
  repos: AuthorityRepositories;
  integrity: IntegrityProvider;
  /** Fail-closed : défaut = flag global (false). Les tests passent `true` pour exercer la logique. */
  featureEnabled?: boolean;
  /** Restriction administrative injectée (déjà résolue en amont). */
  administrativeBlock?: boolean;
}

function denied(errorCode: AuthorityErrorCode, state: AuthorityState, locale: string): AuthorizationResult {
  const e = safeError(errorCode);
  return {
    decision: "denied", state, authorizationReference: null, credentialType: null,
    publicReasonCode: e.publicReasonCode, errorCode, retryAllowed: errorCode === "duplicate_request" ? false : errorCode === "ineligible", appealAllowed: false, replacementAllowed: false, locale, emitted: false,
  };
}

export const CertificationAuthorizationService = {
  authorize(handoff: unknown, ctx: AuthorizeContext): AuthorizationResult {
    const enabled = ctx.featureEnabled ?? CERTIFICATION_AUTHORITY_ENABLED;
    const at = ctx.now().toISOString();
    const V = 1;
    const audit = (operation: Parameters<typeof makeAuditRecord>[0]["operation"], result: Parameters<typeof makeAuditRecord>[0]["result"], reasonCode: string, publicReference: string) =>
      ctx.repos.audit.append(makeAuditRecord({ eventId: ctx.ids.auditEventId(), at, operation, result, reasonCode, publicReference, version: V }));

    // Fail-closed : autorité désactivée → refus contrôlé, aucune émission.
    if (!enabled) {
      const localeGuess = typeof (handoff as { locale?: string })?.locale === "string" ? (handoff as { locale: string }).locale : "fr";
      audit("HANDOFF_REJECTED", "denied", "certification.error.feature_disabled", "n/a");
      return denied("feature_disabled", "rejected", localeGuess);
    }

    audit("HANDOFF_RECEIVED", "ok", "certification.audit.received", "n/a");

    // 1. Validation stricte du contrat.
    const validation = validateCertificationHandoffContract(handoff);
    if (validation.status !== "valid") {
      const code = validationStatusToError(validation.status);
      audit("HANDOFF_REJECTED", "denied", validation.reasonCodes[0] ?? code, "n/a");
      const locale = typeof (handoff as { locale?: string })?.locale === "string" ? (handoff as { locale: string }).locale : "fr";
      return denied(code, "rejected", locale);
    }
    const h = handoff as CertificationHandoffInput;
    const ref = h.handoffId;

    // 2. Restriction administrative.
    if (ctx.administrativeBlock) {
      audit("ADMINISTRATIVE_BLOCK_APPLIED", "blocked", "certification.error.administratively_blocked", ref);
      return denied("administratively_blocked", "administratively_blocked", h.locale);
    }

    // 3. Résolution de policy (issuer + type + programme + version).
    if (!ctx.policyRegistry.hasIssuer(h.issuerCode)) {
      audit("ELIGIBILITY_DENIED", "denied", "certification.error.issuer_not_allowed", ref);
      return denied("issuer_not_allowed", "rejected", h.locale);
    }
    if (!ctx.policyRegistry.hasCredentialType(h.issuerCode, h.credentialTypeRequested)) {
      audit("ELIGIBILITY_DENIED", "denied", "certification.error.credential_type_not_allowed", ref);
      return denied("credential_type_not_allowed", "rejected", h.locale);
    }
    const policy = ctx.policyRegistry.resolve({ issuerCode: h.issuerCode, credentialType: h.credentialTypeRequested, programReference: h.programReference, curriculumVersion: h.curriculumVersion });
    if (!policy) {
      audit("ELIGIBILITY_DENIED", "denied", "certification.error.policy_not_found", ref);
      return denied("policy_not_found", "rejected", h.locale);
    }
    audit("POLICY_VERSION_RESOLVED", "ok", `policy_v${policy.version}`, ref);

    // 4. Idempotence (§11) : une décision identique → même autorisation, aucun doublon.
    const existing = ctx.repos.authorizations.findByIdempotencyKey(h.idempotencyKey);
    if (existing) {
      audit("AUTHORIZATION_REUSED", "reused", "certification.audit.reused", existing.authorizationId);
      return toResult(existing, policy.allowAppeal, policy.allowReplacement, h.locale);
    }

    // 5. Création de l'autorisation (compare-and-swap → une seule sous concurrence).
    const candidate: AuthorizationRecord = {
      authorizationId: ctx.ids.authorizationId(), idempotencyKey: h.idempotencyKey,
      state: "issuance_authorized", decision: "issuance_allowed", credentialType: h.credentialTypeRequested,
      learnerReference: h.learnerReference, programReference: h.programReference, finalDecisionId: h.finalDecisionId,
      finalDecisionVersion: h.finalDecisionVersion, policyVersion: policy.version, contractVersion: h.contractVersion, createdAt: at, version: 1,
    };
    const { created, record } = ctx.repos.authorizations.createIfAbsent(candidate);
    audit(created ? "AUTHORIZATION_CREATED" : "DUPLICATE_PREVENTED", created ? "ok" : "reused", created ? "certification.audit.authorized" : "certification.audit.duplicate_prevented", record.authorizationId);
    // Référence d'intégrité préparée (jamais signée, jamais exposée en secret).
    ctx.integrity.integrityReference({ authorizationId: record.authorizationId, finalDecisionId: h.finalDecisionId, policyVersion: policy.version });
    return toResult(record, policy.allowAppeal, policy.allowReplacement, h.locale);
  },
};

function toResult(record: AuthorizationRecord, appealAllowed: boolean, replacementAllowed: boolean, locale: string): AuthorizationResult {
  const decision: IssuanceDecision = record.decision === "denied" ? "issuance_denied" : (record.decision as IssuanceDecision);
  return {
    decision, state: record.state, authorizationReference: record.authorizationId, credentialType: record.credentialType as CredentialType,
    publicReasonCode: "certification.status.issuance_authorized", errorCode: null, retryAllowed: false, appealAllowed, replacementAllowed, locale, emitted: false,
  };
}
