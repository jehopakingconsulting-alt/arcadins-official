/**
 * Runtime — Credential Issuance : modèle interne IMMUABLE et versionné (Sprint K4B, §6).
 *
 * Un CredentialRecord n'est jamais écrasé : chaque mutation produit une nouvelle révision (monotone). AUCUN
 * champ privé (réponses, barème, notes, signaux de risque, clé, secret, ligne Supabase brute, PII inutile).
 */
import type { CredentialLifecycleStatus, CredentialType } from "./credential-types.ts";

export const CREDENTIAL_RECORD_VERSION = 1;

export interface CredentialRecord {
  recordVersion: number;
  credentialRecordId: string;
  authorizationId: string;
  handoffId: string;
  learnerReference: string; // opaque
  programReference: string;
  curriculumVersion: string;
  credentialType: CredentialType;
  issuerCode: string;
  policyVersion: number;
  finalDecisionId: string;
  finalDecisionVersion: number;
  issuedAt: string;
  validFrom: string;
  expiresAt: string | null;
  lifecycleStatus: CredentialLifecycleStatus;
  publicCredentialReference: string | null; // reste null en K4B (aucun identifiant public actif)
  integrityReference: string;
  signatureReference: string | null;
  replacementChainId: string | null;
  replacesCredentialRecordId: string | null;
  replacedByCredentialRecordId: string | null;
  revocationReference: string | null;
  metadata: Record<string, string | number | boolean>; // whitelist publique
  createdAt: string;
  updatedAt: string;
  revision: number;
}

/** Champs INTERDITS (défense en profondeur : ne doivent jamais apparaître dans un record). */
export const CREDENTIAL_FORBIDDEN_KEYS: readonly string[] = [
  "answers", "answerKey", "correctOptionId", "reviewerNotes", "internalRiskSignals",
  "privateScoreBreakdown", "gradingRule", "privateKey", "seed", "cryptoSeed", "tokenSecret",
  "rawRow", "supabaseRow", "signatureValue",
];

/** Produit une nouvelle RÉVISION immuable (révision monotone, `updatedAt` mis à jour). */
export function reviseCredential(record: CredentialRecord, patch: Partial<CredentialRecord>, updatedAt: string): CredentialRecord {
  return { ...record, ...patch, revision: record.revision + 1, updatedAt, recordVersion: CREDENTIAL_RECORD_VERSION };
}
