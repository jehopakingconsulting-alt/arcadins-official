/**
 * Runtime — Credential Issuance : payload canonique déterministe (Sprint K4B, §10).
 *
 * Ordre stable, sérialisation déterministe, exclusion des nuls non nécessaires et des secrets. Réutilise la
 * canonicalisation PURE du Sprint H (aucune duplication). Même entrée → payload strictement identique.
 */
import { canonicalize } from "../certification/credential-integrity-engine.ts";
import type { CredentialRecord } from "./credential-record.ts";

export const CREDENTIAL_SCHEMA_VERSION = 1;

export interface CanonicalCredentialPayload {
  schemaVersion: number;
  credentialRecordId: string;
  learnerReference: string;
  programReference: string;
  curriculumVersion: string;
  credentialType: string;
  issuerCode: string;
  policyVersion: number;
  finalDecisionId: string;
  issuedAt: string;
  validFrom: string;
  expiresAt: string | null;
  /** Cycle de vie INITIAL (constant à l'émission) — l'empreinte reste stable malgré les mutations ultérieures. */
  lifecycleInitial: string;
  integrityAlgorithm: string;
  publicClaims: Record<string, string | number | boolean>;
}

/** Construit le payload canonique SIGNABLE (uniquement des données publiques autorisées). */
export function buildCanonicalCredentialPayload(record: CredentialRecord, integrityAlgorithm: string): CanonicalCredentialPayload {
  return {
    schemaVersion: CREDENTIAL_SCHEMA_VERSION,
    credentialRecordId: record.credentialRecordId,
    learnerReference: record.learnerReference,
    programReference: record.programReference,
    curriculumVersion: record.curriculumVersion,
    credentialType: record.credentialType,
    issuerCode: record.issuerCode,
    policyVersion: record.policyVersion,
    finalDecisionId: record.finalDecisionId,
    issuedAt: record.issuedAt,
    validFrom: record.validFrom,
    expiresAt: record.expiresAt,
    lifecycleInitial: "issued", // constant : indépendant du statut courant (mutations légitimes ultérieures)
    integrityAlgorithm,
    publicClaims: { ...record.metadata },
  };
}

/** Sérialisation canonique déterministe (clés triées, ordre stable). */
export function serializeCanonical(payload: CanonicalCredentialPayload): string {
  return canonicalize(payload);
}
