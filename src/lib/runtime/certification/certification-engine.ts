/**
 * Runtime — Certification : CertificationEngine (façade principale, Sprint H).
 *
 * Orchestration PURE et sécurisée : admissibilité, émission (idempotente + dédoublonnée), activation, vérification,
 * suspension, révocation, remplacement, appel, badges, audit, vue publique. Aucune base réelle (dépôts injectés),
 * aucun réseau, aucun PDF, aucune image QR. Le navigateur ne décide jamais de l'admissibilité/émission/validité.
 */
import type {
  BadgeDefinition,
  BadgeRecord,
  CertificationEngineResult,
  CredentialAppeal,
  CredentialEligibilityContext,
  CredentialEligibilityResult,
  CredentialIssuanceRequest,
  CredentialPolicy,
  CredentialPrivateRecord,
  CredentialPublicView,
  CredentialReplacementRequest,
  CredentialReplacementResult,
  CredentialRevocationRequest,
  CredentialVerificationRequest,
  CredentialVerificationResult,
} from "./types.ts";
import type { CredentialRepositories } from "./repository-contracts.ts";
import type { CertificationContext } from "./config.ts";
import { CertificationEligibilityEngine } from "./certification-eligibility-engine.ts";
import { CredentialIssuanceEngine } from "./credential-issuance-engine.ts";
import { CredentialRevocationEngine } from "./credential-revocation-engine.ts";
import { CredentialReplacementEngine } from "./credential-replacement-engine.ts";
import { CredentialAppealWorkflow } from "./credential-appeal-workflow.ts";
import { BadgeEngine } from "./badge-engine.ts";
import { VerificationEngine } from "./verification-engine.ts";
import { PublicCredentialSerializer } from "./public-credential-serializer.ts";
import { CredentialStatusEngine } from "./credential-status-engine.ts";
import { CredentialAuditEvents } from "./credential-audit-events.ts";

function persist(record: CredentialPrivateRecord, repos: CredentialRepositories): void {
  repos.credentials.save(record);
  repos.statuses.setStatus(record.internalCredentialId, record.status);
}

export const CertificationEngine = {
  publicView(record: CredentialPrivateRecord, policy: CredentialPolicy): CredentialPublicView {
    return PublicCredentialSerializer.toPublicView(record, policy);
  },

  // ─────────────────────── Admissibilité ───────────────────────
  checkEligibility(policy: CredentialPolicy, ctx: CredentialEligibilityContext, cctx: CertificationContext): { result: CredentialEligibilityResult; events: CertificationEngineResult["events"] } {
    const result = CertificationEligibilityEngine.evaluate(policy, ctx, cctx.now);
    return { result, events: [CredentialAuditEvents.eligibilityChecked(cctx.now.toISOString(), result.status, result.reasonCodes)] };
  },

  // ─────────────────────── Émission ───────────────────────
  issue(request: CredentialIssuanceRequest, cctx: CertificationContext, repos: CredentialRepositories): CertificationEngineResult {
    const at = cctx.now.toISOString();

    // Idempotence : même commandId → même credential, aucun nouvel effet.
    const existingId = repos.issuanceCommands.get(request.commandId);
    if (existingId) {
      const rec = repos.credentials.getByInternalId(existingId)!;
      return { record: rec, publicView: CertificationEngine.publicView(rec, request.policy), events: [] };
    }

    // Dédoublonnage : credential actif identique pour la même réussite ?
    const issuanceKey = CredentialIssuanceEngine.computeIssuanceKey(
      {
        learnerReference: request.eligibilityContext.learnerReference,
        programId: request.eligibilityContext.finalResult.programId,
        programVersion: request.programVersion,
        credentialType: request.credentialType,
        finalResultReference: request.eligibilityContext.finalResult.attemptId,
        credentialPolicyVersion: request.policy.version,
      },
      cctx.hashProvider,
    );
    const active = repos.credentials.findActiveByIssuanceKey(issuanceKey);

    // Admissibilité (avec connaissance d'une émission active identique).
    const eligibility = CertificationEligibilityEngine.evaluate(
      request.policy,
      { ...request.eligibilityContext, existingActiveIssuanceKey: active ? issuanceKey : request.eligibilityContext.existingActiveIssuanceKey ?? null },
      cctx.now,
    );
    const events = [CredentialAuditEvents.eligibilityChecked(at, eligibility.status, eligibility.reasonCodes), CredentialAuditEvents.issuanceRequested(at, request.commandId, issuanceKey)];

    if (eligibility.status === "already_issued" && active) {
      return { record: active, publicView: CertificationEngine.publicView(active, request.policy), events: [...events, CredentialAuditEvents.issuanceBlocked(at, ["ALREADY_ISSUED"])] };
    }
    if (eligibility.status !== "eligible") {
      return { record: null, publicView: null, events: [...events, CredentialAuditEvents.issuanceBlocked(at, eligibility.reasonCodes)] };
    }

    // Construction (issued) puis activation.
    const internalId = cctx.idFactory();
    const built = CredentialIssuanceEngine.build(request, internalId, cctx.issuerCode, cctx.hashProvider, cctx.signer, cctx.now);
    const activated: CredentialPrivateRecord = {
      ...built,
      status: CredentialStatusEngine.transition(built.status, "active"),
      processedCommands: { [request.commandId]: "issued" },
    };

    persist(activated, repos);
    repos.versions.append(internalId, activated.currentVersion);
    repos.issuanceCommands.set(request.commandId, internalId);
    const emitted = [
      ...events,
      CredentialAuditEvents.snapshotCreated(at, activated.publicVerificationId),
      CredentialAuditEvents.integrityHashCreated(at, activated.currentVersion.integrity.contentHash.algorithm),
      CredentialAuditEvents.signatureCreated(at, activated.currentVersion.integrity.signature.keyId),
      CredentialAuditEvents.issued(at, activated.publicVerificationId, activated.documentNumber),
      CredentialAuditEvents.activated(at, activated.publicVerificationId),
    ];
    repos.audit.append(emitted);
    return { record: activated, publicView: CertificationEngine.publicView(activated, request.policy), events: emitted };
  },

  // ─────────────────────── Vérification ───────────────────────
  verify(request: CredentialVerificationRequest, cctx: CertificationContext, repos: CredentialRepositories): { result: CredentialVerificationResult; events: CertificationEngineResult["events"] } {
    const result = VerificationEngine.verify(request, repos.credentials, cctx.hashProvider, cctx.signer, cctx.now);
    if (request.publicVerificationId) repos.verifications.record(request.publicVerificationId, cctx.now.toISOString(), result.status);
    const at = cctx.now.toISOString();
    const events = result.status === "valid"
      ? [CredentialAuditEvents.verified(at, request.publicVerificationId ?? request.documentNumber ?? "unknown", result.status)]
      : [CredentialAuditEvents.verificationFailed(at, result.status, result.reasonCodes)];
    repos.audit.append(events);
    return { result, events };
  },

  // ─────────────────────── Suspension ───────────────────────
  suspend(publicId: string, reasonCode: string, commandId: string, policy: CredentialPolicy, cctx: CertificationContext, repos: CredentialRepositories): CertificationEngineResult {
    const record = repos.credentials.getByPublicId(publicId);
    if (!record) return { record: null, publicView: null, events: [] };
    if (record.processedCommands[commandId]) return { record, publicView: CertificationEngine.publicView(record, policy), events: [] };
    const next = { ...CredentialRevocationEngine.suspend(record, reasonCode, cctx.now), processedCommands: { ...record.processedCommands, [commandId]: "suspended" } };
    persist(next, repos);
    const events = [CredentialAuditEvents.suspended(cctx.now.toISOString(), publicId, reasonCode)];
    repos.audit.append(events);
    return { record: next, publicView: CertificationEngine.publicView(next, policy), events };
  },

  // ─────────────────────── Révocation ───────────────────────
  revoke(request: CredentialRevocationRequest, policy: CredentialPolicy, cctx: CertificationContext, repos: CredentialRepositories): CertificationEngineResult {
    const record = repos.credentials.getByPublicId(request.credentialPublicId);
    if (!record) return { record: null, publicView: null, events: [] };
    if (record.processedCommands[request.commandId]) return { record, publicView: CertificationEngine.publicView(record, policy), events: [] };
    const { record: revokedBase, changed } = CredentialRevocationEngine.revoke(record, request, cctx.now);
    const revoked = { ...revokedBase, processedCommands: { ...record.processedCommands, [request.commandId]: "revoked" } };
    persist(revoked, repos);
    const events = changed ? [CredentialAuditEvents.revoked(cctx.now.toISOString(), request.credentialPublicId, request.publicReasonCode)] : [];
    repos.audit.append(events);
    return { record: revoked, publicView: CertificationEngine.publicView(revoked, policy), events };
  },

  // ─────────────────────── Remplacement ───────────────────────
  replace(request: CredentialReplacementRequest, policy: CredentialPolicy, cctx: CertificationContext, repos: CredentialRepositories): { result: CredentialReplacementResult; record: CredentialPrivateRecord | null; events: CertificationEngineResult["events"] } {
    const at = cctx.now.toISOString();
    const previous = repos.credentials.getByPublicId(request.credentialPublicId);
    if (!previous) return { result: { outcome: "blocked", previousPublicId: request.credentialPublicId, newPublicId: null, reasonCodes: ["NOT_FOUND"], replacedAt: at }, record: null, events: [] };
    if (!policy.replacement.allowed) return { result: { outcome: "blocked", previousPublicId: request.credentialPublicId, newPublicId: null, reasonCodes: ["REPLACEMENT_NOT_ALLOWED"], replacedAt: at }, record: null, events: [] };
    if (previous.processedCommands[request.commandId] && previous.replacedByPublicId) {
      return { result: { outcome: "already_replaced", previousPublicId: previous.publicVerificationId, newPublicId: previous.replacedByPublicId, reasonCodes: ["ALREADY_REPLACED"], replacedAt: at }, record: repos.credentials.getByPublicId(previous.replacedByPublicId) ?? null, events: [] };
    }
    const newInternalId = cctx.idFactory();
    const { previous: replaced, next } = CredentialReplacementEngine.replace(previous, request, newInternalId, cctx.issuerCode, cctx.hashProvider, cctx.signer, cctx.now);
    const replacedMarked = { ...replaced, processedCommands: { ...previous.processedCommands, [request.commandId]: "replaced" } };
    persist(replacedMarked, repos);
    persist(next, repos);
    repos.versions.append(next.internalCredentialId, next.currentVersion);
    const events = [CredentialAuditEvents.replacementRequested(at, previous.publicVerificationId, request.reason), CredentialAuditEvents.replaced(at, previous.publicVerificationId, next.publicVerificationId)];
    repos.audit.append(events);
    return { result: { outcome: "replaced", previousPublicId: previous.publicVerificationId, newPublicId: next.publicVerificationId, reasonCodes: ["REPLACED"], replacedAt: at }, record: next, events };
  },

  // ─────────────────────── Appel + restauration ───────────────────────
  requestAppeal(publicId: string, requestedByReference: string, reason: string, cctx: CertificationContext, repos: CredentialRepositories): { appeal: CredentialAppeal; events: CertificationEngineResult["events"] } {
    const appeal = CredentialAppealWorkflow.create({ id: cctx.idFactory(), credentialPublicId: publicId, requestedByReference, reason, now: cctx.now });
    const events = [CredentialAuditEvents.appealRequested(cctx.now.toISOString(), publicId, appeal.id)];
    repos.audit.append(events);
    return { appeal, events };
  },

  /** Restauration APRÈS appel approuvé uniquement (jamais automatique). */
  restoreFromAppeal(publicId: string, appeal: CredentialAppeal, policy: CredentialPolicy, cctx: CertificationContext, repos: CredentialRepositories): CertificationEngineResult {
    if (!CredentialAppealWorkflow.authorizesRestoration(appeal)) throw new Error("RESTORE_NOT_AUTHORIZED");
    const record = repos.credentials.getByPublicId(publicId);
    if (!record) return { record: null, publicView: null, events: [] };
    const restored = CredentialRevocationEngine.restore(record, cctx.now);
    persist(restored, repos);
    const events = [CredentialAuditEvents.restored(cctx.now.toISOString(), publicId)];
    repos.audit.append(events);
    return { record: restored, publicView: CertificationEngine.publicView(restored, policy), events };
  },

  // ─────────────────────── Badges ───────────────────────
  issueBadge(input: Parameters<typeof BadgeEngine.build>[0], definition: BadgeDefinition, cctx: CertificationContext, repos: CredentialRepositories): { badge: BadgeRecord | null; events: CertificationEngineResult["events"] } {
    const at = cctx.now.toISOString();
    const key = BadgeEngine.computeBadgeIssuanceKey(definition.badgeDefinitionId, input.learnerReference, definition.criteriaVersion, cctx.hashProvider);
    const active = repos.badges.findActiveByIssuanceKey(key);
    if (active) {
      if (active.processedCommands[input.commandId]) return { badge: active, events: [] };
      return { badge: active, events: [] }; // dédoublonnage : badge identique déjà actif
    }
    const gate = BadgeEngine.canIssue(input);
    if (!gate.allowed) return { badge: null, events: [CredentialAuditEvents.verificationFailed(at, "invalid", gate.reasonCodes)] };
    const badge = BadgeEngine.build(input, cctx.hashProvider, cctx.issuerCode);
    repos.badges.save(badge);
    const events = [CredentialAuditEvents.badgeIssued(at, badge.publicVerificationId, badge.kind)];
    repos.audit.append(events);
    return { badge, events };
  },

  revokeBadge(publicId: string, commandId: string, cctx: CertificationContext, repos: CredentialRepositories): { badge: BadgeRecord | null; events: CertificationEngineResult["events"] } {
    const badge = repos.badges.getByPublicId(publicId);
    if (!badge) return { badge: null, events: [] };
    if (badge.processedCommands[commandId]) return { badge, events: [] };
    const revoked = BadgeEngine.revoke(badge, commandId, cctx.now);
    repos.badges.save(revoked);
    const events = [CredentialAuditEvents.badgeRevoked(cctx.now.toISOString(), publicId)];
    repos.audit.append(events);
    return { badge: revoked, events };
  },
};
