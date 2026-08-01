/**
 * Runtime — Certification : CredentialVersionManager (Sprint H).
 *
 * Construit et versionne les documents (politique, snapshot, modèle, langue, branding, signature, vérification,
 * remplacement). Une version publiée est IMMUABLE — toute évolution crée une NOUVELLE version. PUR.
 */
import type {
  CredentialSnapshot,
  CredentialVersion,
  HashProvider,
  SignerProvider,
} from "./types.ts";
import { CredentialIntegrityEngine } from "./credential-integrity-engine.ts";
import { CredentialIdGenerator } from "./credential-id-generator.ts";

export const CredentialVersionManager = {
  create(snapshot: CredentialSnapshot, version: number, contentSeed: string, hashProvider: HashProvider, signer: SignerProvider, now: Date): CredentialVersion {
    const integrity = CredentialIntegrityEngine.seal(snapshot, hashProvider, signer);
    return {
      versionId: CredentialIdGenerator.versionId(contentSeed, version, hashProvider),
      version,
      snapshot: structuredClone(snapshot),
      integrity,
      policyVersion: snapshot.credentialPolicyVersion,
      templateVersion: snapshot.templateVersion,
      brandingVersion: snapshot.brandingVersion,
      language: snapshot.language,
      createdAt: now.toISOString(),
    };
  },

  /** Ajoute une version à un historique sans jamais modifier les versions existantes (immutabilité). */
  append(history: CredentialVersion[], next: CredentialVersion): CredentialVersion[] {
    return [...history.map((v) => structuredClone(v)), structuredClone(next)];
  },
};
