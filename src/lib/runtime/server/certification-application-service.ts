/**
 * Runtime — Server : CertificationApplicationService (Sprint I).
 *
 * Compose le moteur de certification (Sprint H) avec la persistance académique. L'émission reste idempotente et
 * dédoublonnée (garanties du Sprint H) ; le credential émis est MIROITÉ dans les repositories académiques pour la
 * lecture (dashboard/vérification). Aucun PDF, aucune image QR. Le client ne décide jamais de l'émission.
 */
import type { ServiceEnv } from "./service-env.ts";
import { audit, requireAuthorized } from "./service-env.ts";
import type { CredentialRow } from "../repositories/contracts.ts";
import type { CredentialIssuanceRequest, CredentialVerificationRequest, CredentialVerificationResult, CredentialPublicView } from "../../runtime/certification/types.ts";
import type { CredentialRepositories } from "../../runtime/certification/repository-contracts.ts";
import type { CertificationContext } from "../../runtime/certification/config.ts";
import { CertificationEngine } from "../../runtime/certification/certification-engine.ts";

export const CertificationApplicationService = {
  /** Émet un credential (Sprint H) puis miroir en persistance académique. Idempotent + dédoublonné. */
  async issue(env: ServiceEnv, request: CredentialIssuanceRequest, cctx: CertificationContext, credRepos: CredentialRepositories): Promise<{ publicView: CredentialPublicView | null; issued: boolean }> {
    requireAuthorized(env, { requiresFeature: "certificationEngine" });
    audit(env, "credential.eligibility_checked", { resourceId: request.eligibilityContext.finalResult.attemptId });
    const res = CertificationEngine.issue(request, cctx, credRepos);
    if (!res.record) return { publicView: null, issued: false };

    const rec = res.record;
    const existing = await env.repos.credentials.findByPublicId(rec.publicVerificationId);
    if (!existing) {
      const row: CredentialRow = {
        id: rec.internalCredentialId, ownerLearnerId: rec.learnerReference, programId: rec.programId,
        publicVerificationId: rec.publicVerificationId, documentNumber: rec.documentNumber, status: rec.status,
        issuanceKey: rec.issuanceKey, recordJson: JSON.stringify(rec), version: 0, updatedAt: env.now.toISOString(),
      };
      await env.repos.credentials.save(row, null).catch(() => undefined);
      await env.repos.credentialVersions.append({ credentialId: rec.internalCredentialId, version: rec.currentVersion.version, snapshotJson: JSON.stringify(rec.currentVersion.snapshot), integrityJson: JSON.stringify(rec.currentVersion.integrity) }).catch(() => undefined);
      audit(env, "credential.issued", { resourceId: rec.publicVerificationId, metadata: { documentNumber: rec.documentNumber } });
    }
    return { publicView: res.publicView, issued: !existing };
  },

  /** Vérification publique déléguée au moteur (révélation minimale). */
  async verify(env: ServiceEnv, request: CredentialVerificationRequest, cctx: CertificationContext, credRepos: CredentialRepositories): Promise<CredentialVerificationResult> {
    // La vérification publique ne requiert pas la persistance académique (flag) — elle a son propre endpoint gaté.
    const res = CertificationEngine.verify(request, cctx, credRepos);
    if (request.publicVerificationId) await env.repos.credentialVerifications.record({ publicVerificationId: request.publicVerificationId, at: env.now.toISOString(), status: res.result.status }).catch(() => undefined);
    audit(env, "credential.eligibility_checked", { resourceId: request.publicVerificationId ?? null, reasonCodes: res.result.reasonCodes });
    return res.result;
  },
};
