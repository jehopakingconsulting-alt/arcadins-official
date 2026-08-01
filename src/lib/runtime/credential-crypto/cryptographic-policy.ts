/**
 * Runtime — Credential Crypto : registre de politiques cryptographiques (Sprint K4C-A, §14).
 *
 * Versionnées, déterministes, immuables après utilisation, injectables, sans secret.
 */
import type { CredentialCryptoAlgorithm } from "./crypto-types.ts";

export interface CryptographicPolicy {
  policyVersion: number;
  issuerCode: string;
  credentialType: string; // "*" = tous
  allowedAlgorithms: CredentialCryptoAlgorithm[];
  preferredAlgorithm: CredentialCryptoAlgorithm;
  minimumKeyStrengthBits: number;
  canonicalizationVersion: number;
  signatureVersion: number;
  rotationIntervalDays: number | null;
  verificationGracePeriodDays: number;
  allowRetiredKeyVerification: boolean;
  rejectRevokedKey: boolean;
  rejectCompromisedKey: boolean;
  environmentRestrictions: ("production" | "ephemeral" | "test")[];
}

export class CryptographicPolicyRegistry {
  private readonly policies: CryptographicPolicy[];
  constructor(policies: CryptographicPolicy[] = []) { this.policies = [...policies]; }
  register(p: CryptographicPolicy): void { this.policies.push(p); }
  resolve(issuerCode: string, credentialType: string): CryptographicPolicy | null {
    const matches = this.policies.filter((p) => p.issuerCode === issuerCode && (p.credentialType === credentialType || p.credentialType === "*"));
    if (matches.length === 0) return null;
    matches.sort((a, b) => (a.credentialType === "*" ? 1 : 0) - (b.credentialType === "*" ? 1 : 0) || b.policyVersion - a.policyVersion);
    return matches[0];
  }
}

/** Politique cryptographique par défaut : Ed25519, aucune expiration de vérification pour les clés retirées. */
export function defaultCryptographicPolicyRegistry(): CryptographicPolicyRegistry {
  return new CryptographicPolicyRegistry([
    {
      policyVersion: 1,
      issuerCode: "ARCADINS-PENDING",
      credentialType: "*",
      allowedAlgorithms: ["Ed25519"],
      preferredAlgorithm: "Ed25519",
      minimumKeyStrengthBits: 256,
      canonicalizationVersion: 1,
      signatureVersion: 2,
      rotationIntervalDays: 365,
      verificationGracePeriodDays: 0,
      allowRetiredKeyVerification: true, // les credentials historiques restent vérifiables
      rejectRevokedKey: true,
      rejectCompromisedKey: true,
      environmentRestrictions: ["production", "ephemeral", "test"],
    },
  ]);
}
