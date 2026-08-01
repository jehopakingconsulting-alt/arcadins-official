/**
 * Runtime — Persistence : SyncManager, OfflineQueue, ConflictResolver (Sprint B).
 *
 * Synchronisation multi-device PURE. La résolution de conflit est content-agnostique par défaut
 * (last-write-wins par révision) ; une fusion de journaux d'événements est disponible pour un rejeu
 * déterministe (via `RuntimeHydration.replay`, injecté par l'appelant qui détient le cursus).
 */
import type { LearningEvent } from "../types.ts";
import { sortEvents } from "../learning-events.ts";
import type { LearningSnapshot, PersistencePort, QueueItem, SnapshotKey, SyncResult } from "./types.ts";

// ─────────────────────────── ConflictResolver ───────────────────────────

export const ConflictResolver = {
  /** Last-write-wins : la plus haute révision gagne ; à égalité, le plus récent `updatedAt`. */
  resolveByRevision(a: LearningSnapshot, b: LearningSnapshot): LearningSnapshot {
    if (a.revision !== b.revision) return a.revision > b.revision ? a : b;
    return a.updatedAt >= b.updatedAt ? a : b;
  },

  /** Fusionne deux journaux d'événements : union dédupliquée + tri chronologique. */
  mergeEventLogs(a: LearningEvent[], b: LearningEvent[]): LearningEvent[] {
    const seen = new Set<string>();
    const merged: LearningEvent[] = [];
    for (const e of sortEvents([...a, ...b])) {
      const id = eventIdentity(e);
      if (seen.has(id)) continue;
      seen.add(id);
      merged.push(e);
    }
    return merged;
  },

  /** Compte les divergences d'événements entre deux instantanés (indicatif). */
  countConflicts(a: LearningSnapshot, b: LearningSnapshot): number {
    const idsA = new Set(a.state.events.map(eventIdentity));
    const idsB = new Set(b.state.events.map(eventIdentity));
    let diff = 0;
    for (const id of idsA) if (!idsB.has(id)) diff++;
    for (const id of idsB) if (!idsA.has(id)) diff++;
    return diff;
  },
};

function eventIdentity(e: LearningEvent): string {
  // Identité déterministe d'un événement (type + horodatage + clé métier).
  const key =
    "lessonRef" in e ? e.lessonRef : "moduleIndex" in e ? `m${e.moduleIndex}` : "";
  return `${e.type}|${e.at}|${key}`;
}

// ─────────────────────────── OfflineQueue ───────────────────────────

/** File d'attente d'opérations en mode hors-ligne, vidée au retour en ligne. PURE (structure immuable). */
export class OfflineQueue {
  private items: QueueItem[] = [];

  enqueue(item: QueueItem): void {
    this.items.push(item);
  }
  pending(): QueueItem[] {
    return [...this.items];
  }
  size(): number {
    return this.items.length;
  }
  clear(): void {
    this.items = [];
  }
  /** Applique chaque item ; conserve ceux qui échouent (pour réessai). */
  async flush(apply: (item: QueueItem) => Promise<void>): Promise<{ done: number; failed: number }> {
    const remaining: QueueItem[] = [];
    let done = 0;
    let failed = 0;
    for (const item of this.items) {
      try {
        await apply(item);
        done++;
      } catch {
        failed++;
        remaining.push(item);
      }
    }
    this.items = remaining;
    return { done, failed };
  }
}

// ─────────────────────────── SyncManager ───────────────────────────

export class SyncManager {
  private local: PersistencePort;
  private remote: PersistencePort;
  constructor(local: PersistencePort, remote: PersistencePort) {
    this.local = local;
    this.remote = remote;
  }

  /** Récupère l'instantané distant. */
  async pull(key: SnapshotKey): Promise<LearningSnapshot | null> {
    return this.remote.load(key);
  }

  /** Pousse un instantané vers le distant (et le garde en local). */
  async push(snapshot: LearningSnapshot): Promise<void> {
    await this.local.save(snapshot);
    await this.remote.save(snapshot);
  }

  /**
   * Synchronise local ↔ distant pour une clé. Sans `rehydrate`, applique un LWW par révision.
   * Avec `rehydrate` (fusion de journaux → rejeu déterministe), produit un instantané fusionné.
   */
  async sync(
    key: SnapshotKey,
    opts?: { rehydrate?: (events: LearningEvent[]) => LearningSnapshot },
  ): Promise<SyncResult> {
    const [localSnap, remoteSnap] = await Promise.all([this.local.load(key), this.remote.load(key)]);

    if (!localSnap && !remoteSnap) throw new Error("Aucun instantané local ni distant à synchroniser.");
    if (localSnap && !remoteSnap) {
      await this.remote.save(localSnap);
      return { merged: localSnap, strategy: "local-only", conflicts: 0 };
    }
    if (!localSnap && remoteSnap) {
      await this.local.save(remoteSnap);
      return { merged: remoteSnap, strategy: "remote-only", conflicts: 0 };
    }

    const a = localSnap as LearningSnapshot;
    const b = remoteSnap as LearningSnapshot;
    const conflicts = ConflictResolver.countConflicts(a, b);

    let merged: LearningSnapshot;
    let strategy: SyncResult["strategy"];
    if (opts?.rehydrate) {
      const events = ConflictResolver.mergeEventLogs(a.state.events, b.state.events);
      merged = opts.rehydrate(events);
      strategy = "event-merge";
    } else {
      merged = ConflictResolver.resolveByRevision(a, b);
      strategy = "revision-lww";
    }

    await this.local.save(merged);
    await this.remote.save(merged);
    return { merged, strategy, conflicts };
  }
}
