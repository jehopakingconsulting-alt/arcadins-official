/**
 * Runtime — Credential Issuance : provider d'INTÉGRITÉ (Sprint K4B, §11).
 *
 * Réutilise le SHA-256 PUR du Sprint H (déterministe, standard). Produit un CHECKSUM / integrityDigest — JAMAIS
 * présenté comme une signature d'émetteur (voir `signing-provider.ts` pour la signature abstraite). Aucune clé.
 */
import { sha256Hex } from "../certification/credential-integrity-engine.ts";
import { serializeCanonical, type CanonicalCredentialPayload } from "./canonical-payload.ts";

export interface CredentialIntegrity {
  integrityAlgorithm: string; // ex. "SHA-256"
  canonicalPayloadDigest: string;
  integrityDigest: string;
  integrityReference: string;
}

export interface IntegrityProvider {
  algorithm(): string;
  compute(payload: CanonicalCredentialPayload): CredentialIntegrity;
}

/** Provider d'intégrité SHA-256 (checksum déterministe, sans clé — ne prouve pas l'authenticité). */
export function createSha256IntegrityProvider(): IntegrityProvider {
  const ALGO = "SHA-256";
  return {
    algorithm: () => ALGO,
    compute(payload) {
      const canonical = serializeCanonical(payload);
      const digest = sha256Hex(canonical);
      return {
        integrityAlgorithm: ALGO,
        canonicalPayloadDigest: digest,
        integrityDigest: digest,
        integrityReference: `k4b-integrity:${ALGO}:${digest.slice(0, 32)}`,
      };
    },
  };
}
