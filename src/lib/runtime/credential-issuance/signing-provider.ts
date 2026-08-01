/**
 * Runtime — Credential Issuance : abstraction de SIGNATURE (Sprint K4B, §12–§13).
 *
 * K4B ne signe RIEN en production : deux providers seulement — `DisabledSigningProvider` (défaut, ne signe pas)
 * et `DeterministicTestSigningProvider` (TEST ONLY, aucune clé réelle, enveloppe déterministe). AUCUNE clé
 * privée en dur, aucun PEM, aucun secret d'environnement, aucun KMS, aucun appel externe, aucun X.509/JWT prod.
 */
import { sha256Hex } from "../certification/credential-integrity-engine.ts";

export interface SignatureEnvelope {
  signatureVersion: number;
  algorithm: string;
  keyReference: string; // référence LOGIQUE, jamais une clé
  payloadDigest: string;
  signatureValue: string;
  signedAt: string;
  environment: "test" | "disabled";
  testOnly: boolean;
  providerName: string;
}

export interface SigningContext {
  keyReference?: string;
  signedAt: string;
}

export interface SigningProvider {
  sign(payloadDigest: string, context: SigningContext): SignatureEnvelope | null;
  verify(payloadDigest: string, envelope: SignatureEnvelope): boolean;
  getKeyReference(): string;
  getAlgorithm(): string;
}

/** Provider par DÉFAUT : ne signe pas (fail-closed). Aucune enveloppe produite. */
export function createDisabledSigningProvider(): SigningProvider {
  return {
    sign: () => null,
    verify: () => false,
    getKeyReference: () => "disabled",
    getAlgorithm: () => "none",
  };
}

/**
 * Provider de TEST déterministe — NON destiné à la production, impossible à confondre (environment="test",
 * testOnly=true, keyReference="TEST-KEY-REF"). N'utilise AUCUNE clé réelle : l'« enveloppe » est un HMAC-like
 * de démonstration sur (digest + keyRef), suffisant pour tester la vérification/altération.
 */
export function createDeterministicTestSigningProvider(): SigningProvider {
  const KEY_REF = "TEST-KEY-REF";
  const ALGO = "test-deterministic-sha256";
  const compute = (digest: string) => sha256Hex(`TEST_ONLY::${KEY_REF}::${digest}`);
  return {
    sign(payloadDigest, context) {
      return {
        signatureVersion: 1,
        algorithm: ALGO,
        keyReference: context.keyReference ?? KEY_REF,
        payloadDigest,
        signatureValue: compute(payloadDigest),
        signedAt: context.signedAt,
        environment: "test",
        testOnly: true,
        providerName: "DeterministicTestSigningProvider",
      };
    },
    verify(payloadDigest, envelope) {
      return envelope.testOnly === true && envelope.signatureValue === compute(payloadDigest);
    },
    getKeyReference: () => KEY_REF,
    getAlgorithm: () => ALGO,
  };
}
