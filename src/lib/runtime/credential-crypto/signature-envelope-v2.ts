/**
 * Runtime — Credential Crypto : SignatureEnvelope V2 (Sprint K4C-A, §9).
 *
 * Enveloppe PUBLIQUE d'une signature asymétrique. Rétrocompatible avec la V1 (K4B) : ajoute issuerCode,
 * publicKeyFingerprint, policyVersion, keyCreatedAt, canonicalizationVersion. NE CONTIENT JAMAIS de matière
 * privée (clé privée, PEM privé, seed, secret, KMS credentials, handle brut).
 */
import type { CredentialCryptoAlgorithm } from "./crypto-types.ts";

export const SIGNATURE_ENVELOPE_VERSION = 2;

export interface SignatureEnvelopeV2 {
  signatureVersion: number;
  algorithm: CredentialCryptoAlgorithm | string;
  keyReference: string;
  issuerCode: string;
  payloadDigest: string;
  signatureValue: string; // base64 (signature publique, jamais un secret)
  signedAt: string;
  keyCreatedAt: string;
  policyVersion: number;
  environment: "production" | "ephemeral" | "test" | "disabled";
  testOnly: boolean;
  providerName: string;
  publicKeyFingerprint: string;
  canonicalizationVersion: number;
}

/** Clés STRICTEMENT interdites dans une enveloppe (défense en profondeur). */
export const ENVELOPE_FORBIDDEN_KEYS: readonly string[] = [
  "privateKey", "privateKeyPem", "seed", "secret", "password", "recoveryMaterial",
  "kmsCredentials", "environmentSecret", "rawSigningHandle", "signingHandle",
];

export interface EnvelopeValidation { ok: boolean; reasonCodes: string[] }

/** Valide la structure d'une enveloppe et l'absence de matière privée. */
export function validateSignatureEnvelope(envelope: unknown): EnvelopeValidation {
  if (envelope === null || typeof envelope !== "object") return { ok: false, reasonCodes: ["NOT_OBJECT"] };
  const e = envelope as Record<string, unknown>;
  const forbidden = new Set(ENVELOPE_FORBIDDEN_KEYS.map((k) => k.toLowerCase()));
  for (const k of Object.keys(e)) if (forbidden.has(k.toLowerCase())) return { ok: false, reasonCodes: ["FORBIDDEN_KEY_PRESENT"] };
  const reasons: string[] = [];
  const req = (k: keyof SignatureEnvelopeV2, ok: boolean) => { if (!ok) reasons.push(`MISSING_${String(k).toUpperCase()}`); };
  req("signatureVersion", typeof e.signatureVersion === "number");
  req("algorithm", typeof e.algorithm === "string");
  req("keyReference", typeof e.keyReference === "string" && (e.keyReference as string).length > 0);
  req("payloadDigest", typeof e.payloadDigest === "string" && (e.payloadDigest as string).length > 0);
  req("signatureValue", typeof e.signatureValue === "string" && (e.signatureValue as string).length > 0);
  req("issuerCode", typeof e.issuerCode === "string" && (e.issuerCode as string).length > 0);
  return { ok: reasons.length === 0, reasonCodes: reasons };
}
