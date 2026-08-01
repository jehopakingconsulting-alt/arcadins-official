/**
 * Runtime — Certification : CredentialIssuanceEngine (Sprint H).
 *
 * Construit un enregistrement de credential IMMUABLE à partir d'une requête admissible : clé logique d'émission
 * (dédoublonnage), identifiants opaques, snapshot gelé, version scellée (hash + signature). PUR. La persistance,
 * l'idempotence et l'audit sont orchestrés par la façade `CertificationEngine`.
 */
import type {
  CredentialIssuanceRequest,
  CredentialPrivateRecord,
  CredentialVersion,
  FinalExamVersion,
  HashProvider,
  SignerProvider,
} from "./types.ts";
import { CredentialIdGenerator } from "./credential-id-generator.ts";
import { CredentialSnapshotBuilder } from "./credential-snapshot-builder.ts";
import { CredentialVersionManager } from "./credential-version-manager.ts";

/** Clé logique de dédoublonnage : deux credentials actifs identiques pour la même réussite sont interdits. */
export function computeIssuanceKey(params: {
  learnerReference: string;
  programId: string;
  programVersion: FinalExamVersion | number;
  credentialType: string;
  finalResultReference: string;
  credentialPolicyVersion: number;
}, hashProvider: HashProvider): string {
  const canonical = [
    params.learnerReference,
    params.programId,
    typeof params.programVersion === "number" ? String(params.programVersion) : JSON.stringify(params.programVersion),
    params.credentialType,
    params.finalResultReference,
    String(params.credentialPolicyVersion),
  ].join("|");
  return hashProvider.hash(`isskey:${canonical}`);
}

export const CredentialIssuanceEngine = {
  computeIssuanceKey,

  /** Construit un enregistrement `issued` (non encore actif). Déterministe pour un même (internalId, contexte). */
  build(request: CredentialIssuanceRequest, internalId: string, issuerCode: string, hashProvider: HashProvider, signer: SignerProvider, now: Date): CredentialPrivateRecord {
    const fr = request.eligibilityContext.finalResult;
    const issuanceKey = computeIssuanceKey(
      {
        learnerReference: request.eligibilityContext.learnerReference,
        programId: fr.programId,
        programVersion: request.programVersion,
        credentialType: request.credentialType,
        finalResultReference: fr.attemptId,
        credentialPolicyVersion: request.policy.version,
      },
      hashProvider,
    );

    const contentSeed = `${internalId}:${issuanceKey}`;
    const publicVerificationId = CredentialIdGenerator.publicVerificationId(contentSeed, hashProvider);
    const documentNumber = CredentialIdGenerator.documentNumber(issuerCode, now.getUTCFullYear(), contentSeed, hashProvider);

    const snapshot = CredentialSnapshotBuilder.build(request, { documentNumber, verificationId: publicVerificationId }, now);
    const version: CredentialVersion = CredentialVersionManager.create(snapshot, 1, contentSeed, hashProvider, signer, now);

    const expiresAt = request.policy.expiration.kind === "duration" ? new Date(now.getTime() + request.policy.expiration.validitySeconds * 1000).toISOString() : null;

    return {
      internalCredentialId: internalId,
      publicVerificationId,
      documentNumber,
      credentialType: request.credentialType,
      status: "issued",
      issuanceKey,
      learnerReference: request.eligibilityContext.learnerReference,
      programId: fr.programId,
      currentVersion: version,
      versionHistory: [version],
      replacedByPublicId: null,
      replacesPublicId: null,
      expiresAt,
      suspendedReasonCode: null,
      revocation: null,
      badgePublicIds: [],
      processedCommands: {},
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
  },
};
