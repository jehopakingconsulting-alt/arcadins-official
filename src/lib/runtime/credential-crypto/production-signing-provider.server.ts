/**
 * Runtime — Credential Crypto : ProductionCredentialSigningProvider (SERVER-ONLY, Sprint K4C-A, §8).
 *
 * Signe un digest canonique via le KeyProvider (clé privée en clôture du provider). Fail-closed. Refuse : clé
 * absente/révoquée/compromise/inactive, algorithme non autorisé, digest vide, policy inconnue, flag off. Ne
 * retourne JAMAIS de matière privée. `.server.ts` : jamais importé par un composant client.
 */
import { PRODUCTION_SIGNING_PROVIDER_ENABLED } from "./crypto-flags.ts";
import type { CredentialKeyProvider } from "./credential-key-provider.ts";
import type { CryptographicPolicyRegistry } from "./cryptographic-policy.ts";
import { SIGNATURE_ENVELOPE_VERSION, type SignatureEnvelopeV2 } from "./signature-envelope-v2.ts";

export interface ProductionSigningProvider {
  sign(payloadDigest: string, context: { signedAt: string }): SignatureEnvelopeV2 | null;
  getAlgorithm(): string;
  getActiveKeyReference(): string | null;
}

export interface ProductionSigningDeps {
  keyProvider: CredentialKeyProvider;
  policyRegistry: CryptographicPolicyRegistry;
  issuerCode: string;
  credentialType: string;
  environment: "production" | "ephemeral";
  enabled?: boolean; // défaut = flag (false)
}

export function createProductionCredentialSigningProvider(deps: ProductionSigningDeps): ProductionSigningProvider {
  return {
    getAlgorithm: () => deps.policyRegistry.resolve(deps.issuerCode, deps.credentialType)?.preferredAlgorithm ?? "Ed25519",
    getActiveKeyReference: () => deps.keyProvider.getActiveSigningKey({ issuerCode: deps.issuerCode })?.keyReference ?? null,
    sign(payloadDigest, context) {
      const enabled = deps.enabled ?? PRODUCTION_SIGNING_PROVIDER_ENABLED;
      if (!enabled) return null; // fail-closed
      if (!payloadDigest) return null;
      const policy = deps.policyRegistry.resolve(deps.issuerCode, deps.credentialType);
      if (!policy) return null;
      const handle = deps.keyProvider.getActiveSigningKey({ issuerCode: deps.issuerCode });
      if (!handle) return null;
      if (!policy.allowedAlgorithms.includes(handle.algorithm)) return null;
      const signatureValue = deps.keyProvider.sign(handle.keyReference, payloadDigest);
      if (!signatureValue) return null; // clé non signable (révoquée/inactive)
      const pub = deps.keyProvider.getPublicVerificationKey(handle.keyReference);
      const envelope: SignatureEnvelopeV2 = {
        signatureVersion: SIGNATURE_ENVELOPE_VERSION,
        algorithm: handle.algorithm,
        keyReference: handle.keyReference,
        issuerCode: deps.issuerCode,
        payloadDigest,
        signatureValue,
        signedAt: context.signedAt,
        keyCreatedAt: handle.createdAt,
        policyVersion: policy.policyVersion,
        environment: deps.environment,
        testOnly: false,
        providerName: "ProductionCredentialSigningProvider",
        publicKeyFingerprint: pub?.publicKeyFingerprint ?? "",
        canonicalizationVersion: policy.canonicalizationVersion,
      };
      return envelope;
    },
  };
}
