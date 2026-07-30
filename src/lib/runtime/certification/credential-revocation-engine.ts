/**
 * Runtime — Certification : CredentialRevocationEngine (Sprint H).
 *
 * Révoque un credential avec motif PRIVÉ (détaillé) et motif PUBLIC (neutre). Une révocation conservée dans
 * l'historique ; le document révoqué n'est plus valide mais ne disparaît jamais. PUR. Motifs sensibles non publiés.
 */
import type {
  CredentialPrivateRecord,
  CredentialRevocationDecision,
  CredentialRevocationRequest,
} from "./types.ts";
import { CredentialStatusEngine } from "./credential-status-engine.ts";

export const CredentialRevocationEngine = {
  /** Applique une révocation (immuable). Idempotent : re-révoquer renvoie la décision existante. */
  revoke(record: CredentialPrivateRecord, request: CredentialRevocationRequest, now: Date): { record: CredentialPrivateRecord; decision: CredentialRevocationDecision; changed: boolean } {
    if (record.status === "revoked" && record.revocation) {
      return { record, decision: record.revocation, changed: false };
    }
    CredentialStatusEngine.transition(record.status, "revoked");
    const decision: CredentialRevocationDecision = {
      publicReasonCode: request.publicReasonCode,
      privateReasonCode: request.privateReasonCode,
      revokedAt: now.toISOString(),
      revokedByReference: request.revokedByReference,
      evidenceReference: request.evidenceReference ?? null,
      appealStatus: "none",
    };
    return {
      record: { ...record, status: "revoked", revocation: decision, updatedAt: now.toISOString() },
      decision,
      changed: true,
    };
  },

  /** Suspension (réversible) avec motif. */
  suspend(record: CredentialPrivateRecord, reasonCode: string, now: Date): CredentialPrivateRecord {
    if (record.status === "suspended") return record;
    CredentialStatusEngine.transition(record.status, "suspended");
    return { ...record, status: "suspended", suspendedReasonCode: reasonCode, updatedAt: now.toISOString() };
  },

  /** Restauration explicite (révoqué/suspendu → actif) — jamais automatique, doit être auditée en amont. */
  restore(record: CredentialPrivateRecord, now: Date): CredentialPrivateRecord {
    const status = CredentialStatusEngine.restore(record.status);
    return { ...record, status, suspendedReasonCode: null, updatedAt: now.toISOString() };
  },
};
