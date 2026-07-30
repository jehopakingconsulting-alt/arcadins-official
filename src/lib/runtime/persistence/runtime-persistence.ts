/**
 * Runtime — Persistence : RuntimePersistence + AutosaveManager + HeartbeatManager (Sprint B).
 *
 * Orchestration PURE de la persistance : charger (hydrater), sauvegarder (instantané versionné).
 * Autosave et Heartbeat sont pilotés par des ticks/événements (aucun timer interne), donc testables.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeState, StudyTimeEvent } from "../types.ts";
import { LearningEvents } from "../learning-events.ts";
import type { Awards, LearningSnapshot, PersistencePort, SnapshotKey } from "./types.ts";
import { RuntimeSerializer } from "./serializer.ts";
import { RuntimeHydration } from "./hydration.ts";

// ─────────────────────────── RuntimePersistence ───────────────────────────

export class RuntimePersistence {
  private port: PersistencePort;
  constructor(port: PersistencePort) {
    this.port = port;
  }

  get mode() {
    return this.port.mode;
  }

  /** Charge et hydrate l'état d'un étudiant sur un programme (état frais si absent). */
  async load(
    curriculum: ProgramCurriculumV2,
    key: SnapshotKey,
  ): Promise<{ snapshot: LearningSnapshot | null; state: RuntimeState; revision: number; awards: Awards }> {
    const snapshot = await this.port.load(key);
    const state = RuntimeHydration.fromSnapshot(curriculum, snapshot);
    return {
      snapshot,
      state,
      revision: snapshot?.revision ?? 0,
      awards: snapshot?.awards ?? { badges: [], certificates: [] },
    };
  }

  /** Sauvegarde un état (crée un nouvel instantané, révision incrémentée). */
  async save(params: {
    userId: string;
    state: RuntimeState;
    awards?: Awards;
    prevRevision?: number;
    updatedAt?: string;
  }): Promise<LearningSnapshot> {
    const snapshot = RuntimeSerializer.createSnapshot({
      userId: params.userId,
      state: params.state,
      awards: params.awards,
      revision: params.prevRevision ?? 0,
      updatedAt: params.updatedAt,
    });
    await this.port.save(snapshot);
    return snapshot;
  }

  async remove(key: SnapshotKey): Promise<void> {
    await this.port.remove(key);
  }
}

// ─────────────────────────── AutosaveManager ───────────────────────────

export interface AutosaveOptions {
  /** Sauvegarde après ce nombre de changements. */
  maxDirty: number;
  /** …ou après cet intervalle (ms) depuis la dernière sauvegarde. */
  maxIntervalMs: number;
}

/** Décide (PUREMENT) quand déclencher une sauvegarde. Aucun timer : l'appelant fournit `now`. */
export class AutosaveManager {
  private dirty = 0;
  private lastSavedAt: number;
  private opts: AutosaveOptions;
  constructor(opts: AutosaveOptions = { maxDirty: 5, maxIntervalMs: 30_000 }, startAt = 0) {
    this.opts = opts;
    this.lastSavedAt = startAt;
  }

  markDirty(count = 1): void {
    this.dirty += count;
  }
  pendingChanges(): number {
    return this.dirty;
  }
  /** Une sauvegarde est-elle due (assez de changements, ou assez de temps écoulé) ? */
  isDue(nowMs: number): boolean {
    if (this.dirty === 0) return false;
    return this.dirty >= this.opts.maxDirty || nowMs - this.lastSavedAt >= this.opts.maxIntervalMs;
  }
  /** À appeler après une sauvegarde réussie. */
  saved(nowMs: number): void {
    this.dirty = 0;
    this.lastSavedAt = nowMs;
  }
}

// ─────────────────────────── HeartbeatManager ───────────────────────────

/** Accumule le temps d'une leçon et émet un événement STUDY_TIME par paliers. PURE. */
export class HeartbeatManager {
  private accumulated = 0;
  private lessonRef: string;
  private intervalSeconds: number;
  constructor(lessonRef: string, intervalSeconds = 30) {
    this.lessonRef = lessonRef;
    this.intervalSeconds = intervalSeconds;
  }

  /** Ajoute `seconds` observées. */
  tick(seconds: number): void {
    this.accumulated += Math.max(0, seconds);
  }

  /** Renvoie un événement STUDY_TIME si le palier est atteint (et réinitialise), sinon null. */
  drain(at?: string): StudyTimeEvent | null {
    if (this.accumulated < this.intervalSeconds) return null;
    const seconds = this.accumulated;
    this.accumulated = 0;
    return LearningEvents.studyTime(this.lessonRef, seconds, at);
  }

  /** Force l'émission du temps restant (ex. sortie de leçon), même sous le palier. */
  flush(at?: string): StudyTimeEvent | null {
    if (this.accumulated <= 0) return null;
    const seconds = this.accumulated;
    this.accumulated = 0;
    return LearningEvents.studyTime(this.lessonRef, seconds, at);
  }

  pending(): number {
    return this.accumulated;
  }
}
