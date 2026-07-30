/**
 * Runtime — Certification : InMemoryCredentialRepository (Sprint H).
 *
 * Implémentation EN MÉMOIRE des contrats de dépôt, pour les tests uniquement. Aucune I/O, aucune base, aucun réseau.
 * NON destinée à la production (aucun adapter Supabase ici).
 */
import type {
  BadgeRecord,
  CredentialAuditEvent,
  CredentialPrivateRecord,
  CredentialStatus,
  CredentialVersion,
} from "./types.ts";
import type { CredentialRepositories } from "./repository-contracts.ts";

export function createInMemoryRepositories(): CredentialRepositories {
  const credentials = new Map<string, CredentialPrivateRecord>();
  const byPublic = new Map<string, string>();
  const byDoc = new Map<string, string>();
  const versions = new Map<string, CredentialVersion[]>();
  const statuses = new Map<string, CredentialStatus>();
  const audit: CredentialAuditEvent[] = [];
  const badges = new Map<string, BadgeRecord>();
  const verifications = new Map<string, { at: string; status: string }[]>();
  const commands = new Map<string, string>();

  return {
    credentials: {
      save(record) {
        credentials.set(record.internalCredentialId, structuredClone(record));
        byPublic.set(record.publicVerificationId, record.internalCredentialId);
        byDoc.set(record.documentNumber, record.internalCredentialId);
        statuses.set(record.internalCredentialId, record.status);
      },
      getByInternalId(id) {
        const r = credentials.get(id);
        return r ? structuredClone(r) : undefined;
      },
      getByPublicId(pid) {
        const id = byPublic.get(pid);
        return id ? structuredClone(credentials.get(id)!) : undefined;
      },
      getByDocumentNumber(dn) {
        const id = byDoc.get(dn);
        return id ? structuredClone(credentials.get(id)!) : undefined;
      },
      findActiveByIssuanceKey(issuanceKey) {
        for (const r of credentials.values()) {
          if (r.issuanceKey === issuanceKey && (r.status === "active" || r.status === "issued")) return structuredClone(r);
        }
        return undefined;
      },
    },
    versions: {
      append(internalId, version) {
        const list = versions.get(internalId) ?? [];
        list.push(structuredClone(version));
        versions.set(internalId, list);
      },
      history(internalId) {
        return (versions.get(internalId) ?? []).map((v) => structuredClone(v));
      },
    },
    statuses: {
      setStatus(internalId, status) {
        statuses.set(internalId, status);
      },
      getStatus(internalId) {
        return statuses.get(internalId);
      },
    },
    audit: {
      append(events) {
        for (const e of events) audit.push(e);
      },
      all() {
        return [...audit];
      },
    },
    badges: {
      save(badge) {
        badges.set(badge.publicVerificationId, structuredClone(badge));
      },
      getByPublicId(pid) {
        const b = badges.get(pid);
        return b ? structuredClone(b) : undefined;
      },
      findActiveByIssuanceKey(issuanceKey) {
        for (const b of badges.values()) {
          if (b.issuanceKey === issuanceKey && (b.status === "active" || b.status === "issued")) return structuredClone(b);
        }
        return undefined;
      },
    },
    verifications: {
      record(pid, at, status) {
        const list = verifications.get(pid) ?? [];
        list.push({ at, status });
        verifications.set(pid, list);
      },
      count(pid) {
        return (verifications.get(pid) ?? []).length;
      },
    },
    issuanceCommands: {
      get(commandId) {
        return commands.get(commandId);
      },
      set(commandId, credentialId) {
        commands.set(commandId, credentialId);
      },
    },
  };
}
