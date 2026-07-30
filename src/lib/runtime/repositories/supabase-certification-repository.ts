/**
 * Runtime — Repositories : certification & badges Supabase (Sprint I). Aucune logique métier.
 */
import type { AcademicDbClient } from "./supabase-client-factory.ts";
import { makeVersionedRepo, rowToDomain } from "./mappers.ts";
import type {
  BadgeRepository, BadgeRow, CredentialRepository, CredentialRow, CredentialVerificationRepository,
  CredentialVersionRepository, CredentialVersionRow,
} from "./contracts.ts";

export function createSupabaseCertificationRepositories(db: AcademicDbClient): {
  credentials: CredentialRepository; credentialVersions: CredentialVersionRepository;
  credentialVerifications: CredentialVerificationRepository; badges: BadgeRepository;
} {
  const cred = makeVersionedRepo<CredentialRow>(db, "credentials_v2");
  const badge = makeVersionedRepo<BadgeRow>(db, "badges_v2");
  return {
    credentials: {
      get: cred.get, save: cred.save,
      listByLearner: (l) => cred.where({ owner_learner_id: l }),
      findByPublicId: async (pid) => (await cred.where({ public_verification_id: pid }))[0] ?? null,
      findActiveByIssuanceKey: async (key) => (await cred.where({ issuance_key: key, status: "active" }))[0] ?? (await cred.where({ issuance_key: key, status: "issued" }))[0] ?? null,
    },
    credentialVersions: {
      append: async (row) => void (await db.insert("credential_versions_v2", { ...row })),
      history: async (credentialId) => (await db.select("credential_versions_v2", { credential_id: credentialId })).map((r) => rowToDomain<CredentialVersionRow>(r)),
    },
    credentialVerifications: {
      record: async (row) => void (await db.insert("public_verification_events", { ...row })),
      count: async (pid) => (await db.select("public_verification_events", { public_verification_id: pid })).length,
    },
    badges: {
      save: badge.save, listByLearner: (l) => badge.where({ owner_learner_id: l }),
      findByPublicId: async (pid) => (await badge.where({ public_verification_id: pid }))[0] ?? null,
    },
  };
}
