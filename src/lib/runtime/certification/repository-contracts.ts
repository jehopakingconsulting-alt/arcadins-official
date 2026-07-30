/**
 * Runtime — Certification : contrats de dépôt injectables (Sprint H).
 *
 * UNIQUEMENT des interfaces (aucune base réelle, aucun adapter Supabase). Le moteur dépend de ces contrats ;
 * l'implémentation concrète (InMemory pour les tests, DB plus tard) est injectée.
 */
import type {
  BadgeRecord,
  CredentialAuditEvent,
  CredentialPrivateRecord,
  CredentialStatus,
  CredentialVersion,
} from "./types.ts";

export interface CredentialRepository {
  save(record: CredentialPrivateRecord): void;
  getByInternalId(internalId: string): CredentialPrivateRecord | undefined;
  getByPublicId(publicVerificationId: string): CredentialPrivateRecord | undefined;
  getByDocumentNumber(documentNumber: string): CredentialPrivateRecord | undefined;
  /** Enregistrement ACTIF portant une clé logique d'émission donnée (dédoublonnage). */
  findActiveByIssuanceKey(issuanceKey: string): CredentialPrivateRecord | undefined;
}

export interface CredentialVersionRepository {
  append(internalId: string, version: CredentialVersion): void;
  history(internalId: string): CredentialVersion[];
}

export interface CredentialStatusRepository {
  setStatus(internalId: string, status: CredentialStatus): void;
  getStatus(internalId: string): CredentialStatus | undefined;
}

export interface CredentialAuditRepository {
  append(events: CredentialAuditEvent[]): void;
  all(): CredentialAuditEvent[];
}

export interface BadgeRepository {
  save(badge: BadgeRecord): void;
  getByPublicId(publicVerificationId: string): BadgeRecord | undefined;
  findActiveByIssuanceKey(issuanceKey: string): BadgeRecord | undefined;
}

export interface VerificationRepository {
  record(publicVerificationId: string, at: string, status: string): void;
  count(publicVerificationId: string): number;
}

export interface IssuanceCommandRepository {
  /** Retourne le credentialId déjà produit pour ce commandId, s'il existe (idempotence). */
  get(commandId: string): string | undefined;
  set(commandId: string, credentialId: string): void;
}

export interface CredentialRepositories {
  credentials: CredentialRepository;
  versions: CredentialVersionRepository;
  statuses: CredentialStatusRepository;
  audit: CredentialAuditRepository;
  badges: BadgeRepository;
  verifications: VerificationRepository;
  issuanceCommands: IssuanceCommandRepository;
}
