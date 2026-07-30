/**
 * Runtime — Persistence : Adapters (Sprint B).
 *
 * Trois modes, une même interface `PersistencePort` :
 *  - InMemoryPersistenceAdapter    → mode local (tests, éphémère)
 *  - WebStoragePersistenceAdapter  → mode navigateur (localStorage) ET futur mobile (AsyncStorage-like)
 *  - SupabasePersistenceAdapter    → mode Supabase, via un client INJECTÉ (aucune DB touchée sans wiring réel)
 *
 * ⚠️ Aucun adapter n'importe le SDK Supabase ni ne modifie de base : tout passe par des interfaces injectées.
 */
import type { KeyValueStorage, LearningSnapshot, PersistencePort, SnapshotKey, SupabaseSnapshotClient } from "./types.ts";
import { RuntimeSerializer } from "./serializer.ts";

/** Clé de stockage stable pour un instantané. */
export function storageKeyOf(key: SnapshotKey): string {
  return `arcadins:rt:${key.userId}:${key.programSlug}`;
}

/** Mode local (mémoire) — par défaut, sans persistance durable. */
export class InMemoryPersistenceAdapter implements PersistencePort {
  readonly mode = "local" as const;
  private store = new Map<string, LearningSnapshot>();

  async load(key: SnapshotKey): Promise<LearningSnapshot | null> {
    return this.store.get(storageKeyOf(key)) ?? null;
  }
  async save(snapshot: LearningSnapshot): Promise<void> {
    this.store.set(storageKeyOf({ userId: snapshot.userId, programSlug: snapshot.programSlug }), snapshot);
  }
  async remove(key: SnapshotKey): Promise<void> {
    this.store.delete(storageKeyOf(key));
  }
}

/**
 * Mode navigateur / mobile : s'appuie sur un `KeyValueStorage` injecté (localStorage, AsyncStorage…).
 * Le même adapter sert au futur mode mobile en injectant un stockage AsyncStorage-like.
 */
export class WebStoragePersistenceAdapter implements PersistencePort {
  readonly mode: PersistencePort["mode"];
  private storage: KeyValueStorage;
  constructor(storage: KeyValueStorage, mode: "web-storage" | "mobile" = "web-storage") {
    this.storage = storage;
    this.mode = mode;
  }

  async load(key: SnapshotKey): Promise<LearningSnapshot | null> {
    const raw = await this.storage.getItem(storageKeyOf(key));
    if (!raw) return null;
    return RuntimeSerializer.fromJSON(raw);
  }
  async save(snapshot: LearningSnapshot): Promise<void> {
    await this.storage.setItem(
      storageKeyOf({ userId: snapshot.userId, programSlug: snapshot.programSlug }),
      RuntimeSerializer.toJSON(snapshot),
    );
  }
  async remove(key: SnapshotKey): Promise<void> {
    await this.storage.removeItem(storageKeyOf(key));
  }
}

/**
 * Mode Supabase : via un `SupabaseSnapshotClient` INJECTÉ. N'importe aucun SDK, n'exécute aucune requête
 * tant qu'un vrai client n'est pas branché. Table cible `runtime_snapshots` (proposée en 0010, NON appliquée).
 */
export class SupabasePersistenceAdapter implements PersistencePort {
  readonly mode = "supabase" as const;
  private client: SupabaseSnapshotClient;
  constructor(client: SupabaseSnapshotClient) {
    this.client = client;
  }

  async load(key: SnapshotKey): Promise<LearningSnapshot | null> {
    const json = await this.client.fetchSnapshot(key);
    if (!json) return null;
    return RuntimeSerializer.fromJSON(json);
  }
  async save(snapshot: LearningSnapshot): Promise<void> {
    await this.client.upsertSnapshot(
      { userId: snapshot.userId, programSlug: snapshot.programSlug },
      RuntimeSerializer.toJSON(snapshot),
      snapshot.revision,
      snapshot.updatedAt,
    );
  }
  async remove(key: SnapshotKey): Promise<void> {
    await this.client.deleteSnapshot(key);
  }
}
