/**
 * Runtime — Certification : CredentialSnapshotBuilder (Sprint H).
 *
 * Gèle au moment de l'émission toutes les données du document. Une modification ultérieure de la formation, de la
 * politique ou du branding ne change JAMAIS un snapshot déjà émis. PUR. N'expose jamais l'identifiant interne.
 */
import type {
  CredentialCompetencyView,
  CredentialIssuanceRequest,
  CredentialSnapshot,
} from "./types.ts";
import { DEFAULT_DOCUMENT_TITLE } from "./config.ts";

export const CredentialSnapshotBuilder = {
  build(request: CredentialIssuanceRequest, ids: { documentNumber: string; verificationId: string }, now: Date): CredentialSnapshot {
    const policy = request.policy;
    const ctx = request.eligibilityContext;
    const fr = ctx.finalResult;

    const competencies: CredentialCompetencyView[] = fr.sectionResults.map((s) => ({
      competencyCode: s.sectionId,
      labelKey: `credential.competency.${s.sectionId}`,
      achieved: s.passed,
    }));

    const documentTitle = policy.publicTitleKey === "credential.title.achievement_attestation" ? DEFAULT_DOCUMENT_TITLE : DEFAULT_DOCUMENT_TITLE;

    return {
      learnerDisplayName: (ctx.learnerDisplayName ?? "").trim(),
      programId: fr.programId,
      programTitle: request.programTitle,
      programVersion: request.programVersion,
      credentialPolicyVersion: policy.version,
      language: request.language,
      completionDate: fr.finalizedAt ?? now.toISOString(),
      finalResultReference: fr.attemptId,
      finalScore: policy.disclosesFinalScore ? fr.finalScore : null,
      competencies,
      issuerName: request.issuerName,
      issuedAt: now.toISOString(),
      authorizedSignatoryReferences: [...request.authorizedSignatoryReferences],
      legalNoticeKeys: [...policy.legalNoticeKeys],
      documentTitle,
      documentNumber: ids.documentNumber,
      verificationId: ids.verificationId,
      templateVersion: policy.templateVersion,
      brandingVersion: policy.brandingVersion,
    };
  },
};
