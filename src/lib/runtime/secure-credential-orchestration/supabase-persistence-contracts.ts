/**
 * Runtime — Secure Credential Orchestration : CONTRATS de persistance Supabase (Sprint K4C-B, §10–§11).
 *
 * INTERFACES + schéma LOGIQUE proposé UNIQUEMENT. AUCUNE implémentation, AUCUN import `@supabase`, AUCUN appel
 * réseau, AUCUNE migration. Prépare un futur branchement (sous backup + preflight + GO). Server-only par nature.
 */
import type { CredentialPersistencePort, CredentialAuditPersistencePort, CredentialIssuanceReservationPort, SignatureMetadataPersistencePort } from "./persistence-ports.ts";

/** Contraintes attendues d'un adaptateur Supabase (documentation exécutable, non implémentée en K4C-B). */
export interface SupabasePersistenceContractMeta {
  /** Contrainte d'unicité (idempotence) attendue côté DB. */
  uniqueConstraints: string[];
  /** Champs SERVER-ONLY (jamais renvoyés au client). */
  serverOnlyColumns: string[];
  /** Champs PUBLICS exposables via une projection future. */
  publicColumns: string[];
  /** Stratégie de concurrence (ex. upsert ON CONFLICT DO NOTHING + version optimiste). */
  concurrencyStrategy: string;
  /** Comportement de rollback (transaction / RPC atomique). */
  rollbackStrategy: string;
  supportsIdempotency: true;
  supportsVersioning: true;
}

export interface SupabaseCredentialPersistenceContract extends CredentialPersistencePort { readonly meta: SupabasePersistenceContractMeta; }
export interface SupabaseSignatureMetadataContract extends SignatureMetadataPersistencePort { readonly meta: SupabasePersistenceContractMeta; }
export interface SupabaseCredentialAuditContract extends CredentialAuditPersistencePort { readonly meta: SupabasePersistenceContractMeta; }
export interface SupabaseIssuanceReservationContract extends CredentialIssuanceReservationPort { readonly meta: SupabasePersistenceContractMeta; }

/** Schéma LOGIQUE proposé (aucune migration produite ; référence pour K4C-C / Sprint L). */
export const PROPOSED_CREDENTIAL_SCHEMA = {
  credentials: {
    columns: ["id", "public_reference", "learner_id", "program_id", "credential_type", "issuer_code", "status", "version", "policy_version", "final_decision_reference", "issued_at", "expires_at", "replaced_by", "supersedes", "integrity_digest", "canonicalization_version", "created_at", "updated_at"],
    unique: ["(issuer_code, learner_id, program_id, credential_type, final_decision_reference, policy_version)"],
    serverOnly: ["learner_id"],
    public: ["public_reference", "credential_type", "issuer_code", "status", "issued_at", "expires_at"],
  },
  credential_signatures: {
    columns: ["id", "credential_id", "signature_version", "algorithm", "key_reference", "public_key_fingerprint", "payload_digest", "signature_value", "signed_at", "policy_version", "provider_name", "test_only"],
    serverOnly: [] as string[],
    public: ["algorithm", "public_key_fingerprint", "signed_at", "test_only"],
  },
  credential_audit: {
    columns: ["id", "credential_id", "event_type", "public_reason_code", "internal_reason_code", "actor_reference", "correlation_id", "command_id", "timestamp"],
    serverOnly: ["internal_reason_code", "actor_reference"],
    public: ["event_type", "public_reason_code", "timestamp"],
  },
  credential_issuance_reservations: {
    columns: ["idempotency_key", "learner_id", "program_id", "credential_type", "final_decision_reference", "status", "credential_id", "created_at", "expires_at"],
    unique: ["(idempotency_key)"],
    serverOnly: ["learner_id"],
    public: ["status"],
  },
} as const;
