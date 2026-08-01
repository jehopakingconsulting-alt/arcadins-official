/**
 * Runtime — Certification : CredentialReplacementEngine (Sprint H).
 *
 * Remplace un credential (faute de nom, correction administrative, changement de modèle, erreur programme,
 * réémission, nouvelle version, document compromis). L'ancien passe `replaced` et référence PUBLIQUEMENT le
 * nouveau ; le nouveau référence l'ancien (lien bidirectionnel), sans aucune divulgation privée. PUR.
 */
import type {
  CredentialPrivateRecord,
  CredentialReplacementRequest,
  CredentialSnapshot,
  CredentialVersion,
  HashProvider,
  SignerProvider,
} from "./types.ts";
import { CredentialStatusEngine } from "./credential-status-engine.ts";
import { CredentialVersionManager } from "./credential-version-manager.ts";
import { CredentialIdGenerator } from "./credential-id-generator.ts";

export const CredentialReplacementEngine = {
  /**
   * Produit le nouveau document (nouvelle version + nouveaux identifiants publics) et marque l'ancien `replaced`.
   * Le snapshot du nouveau part de l'ancien avec surcharges contrôlées (ex. correction de nom).
   */
  replace(
    previous: CredentialPrivateRecord,
    request: CredentialReplacementRequest,
    newInternalId: string,
    issuerCode: string,
    hashProvider: HashProvider,
    signer: SignerProvider,
    now: Date,
  ): { previous: CredentialPrivateRecord; next: CredentialPrivateRecord } {
    CredentialStatusEngine.transition(previous.status, "replaced");

    const baseSnapshot = previous.currentVersion.snapshot;
    const contentSeed = `${newInternalId}:${previous.issuanceKey}:repl:${request.reason}`;
    const publicVerificationId = CredentialIdGenerator.publicVerificationId(contentSeed, hashProvider);
    const documentNumber = CredentialIdGenerator.documentNumber(issuerCode, now.getUTCFullYear(), contentSeed, hashProvider);

    const nextSnapshot: CredentialSnapshot = {
      ...structuredClone(baseSnapshot),
      ...(request.snapshotOverrides ?? {}),
      documentNumber,
      verificationId: publicVerificationId,
      issuedAt: now.toISOString(),
    };
    const nextVersion: CredentialVersion = CredentialVersionManager.create(nextSnapshot, 1, contentSeed, hashProvider, signer, now);

    const next: CredentialPrivateRecord = {
      internalCredentialId: newInternalId,
      publicVerificationId,
      documentNumber,
      credentialType: previous.credentialType,
      status: "active",
      issuanceKey: previous.issuanceKey,
      learnerReference: previous.learnerReference,
      programId: previous.programId,
      currentVersion: nextVersion,
      versionHistory: [nextVersion],
      replacedByPublicId: null,
      replacesPublicId: previous.publicVerificationId,
      expiresAt: previous.expiresAt,
      suspendedReasonCode: null,
      revocation: null,
      badgePublicIds: [...previous.badgePublicIds],
      processedCommands: {},
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const previousReplaced: CredentialPrivateRecord = {
      ...previous,
      status: "replaced",
      replacedByPublicId: publicVerificationId,
      updatedAt: now.toISOString(),
    };

    return { previous: previousReplaced, next };
  },
};
