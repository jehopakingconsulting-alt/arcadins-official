/**
 * Runtime — couche Persistence : types & interfaces (Sprint B).
 *
 * Conçue pour trois modes (local, Supabase, futur mobile) et pour autosave / offline / resume / multi-device.
 * AUCUNE migration, AUCUNE base modifiée : les adapters s'appuient sur des interfaces INJECTÉES.
 * Le Sprint A (cerveau) n'est pas modifié : on ne fait qu'importer ses types.
 */
import type { RuntimeState } from "../types.ts";

/** Version du schéma d'instantané (incrémentée en cas de changement de format). */
export const SNAPSHOT_SCHEMA_VERSION = 1;

export type PersistenceMode = "local" | "web-storage" | "supabase" | "mobile";

/** Clé d'un instantané : un étudiant × un programme. */
export interface SnapshotKey {
  userId: string;
  programSlug: string;
}

/** Attestation/certificat (jamais émis officiellement ici — brouillon/éligibilité seulement). */
export interface CertificateRecord {
  id: string;
  programSlug: string;
  programVersion: string;
  status: "draft" | "eligible"; // jamais "issued" automatiquement
  revision: number;
  createdAt: string; // ISO
}

/** Récompenses de la couche persistence (hors RuntimeState, pour ne pas modifier le Sprint A). */
export interface Awards {
  badges: string[]; // codes de badges obtenus
  certificates: CertificateRecord[];
}

/** Instantané complet, sérialisable, versionné. */
export interface LearningSnapshot {
  schemaVersion: number;
  userId: string;
  programSlug: string;
  programVersion: string;
  revision: number;
  updatedAt: string; // ISO
  state: RuntimeState; // état du cerveau (Sprint A)
  awards: Awards;
  checksum: string; // intégrité (déterministe)
}

/** Port de persistance générique (async pour supporter Supabase / mobile). */
export interface PersistencePort {
  readonly mode: PersistenceMode;
  load(key: SnapshotKey): Promise<LearningSnapshot | null>;
  save(snapshot: LearningSnapshot): Promise<void>;
  remove(key: SnapshotKey): Promise<void>;
}

/** Stockage clé-valeur (localStorage navigateur, AsyncStorage mobile…). */
export interface KeyValueStorage {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

/** Client Supabase minimal INJECTÉ (aucun import du SDK ici, aucune DB touchée sans wiring réel). */
export interface SupabaseSnapshotClient {
  fetchSnapshot(key: SnapshotKey): Promise<string | null>; // JSON sérialisé
  upsertSnapshot(key: SnapshotKey, json: string, revision: number, updatedAt: string): Promise<void>;
  deleteSnapshot(key: SnapshotKey): Promise<void>;
}

// ─────────────────────────── Sync / Offline ───────────────────────────

export interface SyncResult {
  merged: LearningSnapshot;
  strategy: "local-only" | "remote-only" | "revision-lww" | "event-merge";
  conflicts: number;
}

export interface QueueItem {
  id: string;
  at: string; // ISO
  kind: "event" | "snapshot";
  payload: unknown;
}

// ─────────────────────────── Validation ───────────────────────────

export interface PersistenceIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}
export interface PersistenceValidationReport {
  ok: boolean;
  errors: PersistenceIssue[];
  warnings: PersistenceIssue[];
}
