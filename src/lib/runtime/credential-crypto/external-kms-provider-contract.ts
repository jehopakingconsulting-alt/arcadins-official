/**
 * Runtime — Credential Crypto : CONTRAT d'un provider KMS externe (Sprint K4C-A, §6). INTERFACE UNIQUEMENT —
 * aucune implémentation, aucun appel réseau, aucune connexion KMS réelle en K4C-A. Prépare K4C-B/C.
 */
import type { CredentialKeyProvider } from "./credential-key-provider.ts";

export interface ExternalKmsCredentialKeyProviderContract extends CredentialKeyProvider {
  /** Localisateur OPAQUE d'une clé côté KMS — jamais un secret ni un identifiant de credentials KMS. */
  readonly kmsLocatorReference: string;
  /** Nom du fournisseur KMS envisagé (documentation), sans credentials. */
  readonly kmsProviderName: string;
}
