/**
 * Runtime — Learning Player : LessonPlayer + LessonControls (Sprint C).
 *
 * Orchestrateur PUR qui pilote un `RuntimeStore` (Sprint A) et, en option, la Persistence (Sprint B) et des
 * adaptateurs média injectables. Il n'implémente aucune règle métier : il DÉLÈGUE aux contrôleurs/moteurs.
 * Aucune UI. Le futur composant React se contentera de lier `getView()` et `controls`.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeStore } from "../store.ts";
import { ProgressCalculator } from "../progress-calculator.ts";
import { TimeTracker } from "../time-tracker.ts";
import { HeartbeatManager, AutosaveManager, RuntimePersistence } from "../persistence/runtime-persistence.ts";
import type { Awards } from "../persistence/types.ts";
import { BadgeRepository } from "../persistence/repositories.ts";
import {
  BookmarkController,
  CompletionController,
  LessonNavigator,
  LessonStateController,
  LessonTimeline,
  NotesController,
  ResumeController,
} from "./controllers.ts";
import { LearningEvents } from "../learning-events.ts";
import type { MediaAdapters } from "./media.ts";
import { RecordingDownloadManager } from "./media.ts";
import { DefaultResourceProvider, type ResourceProvider } from "./renderer.ts";
import { createPlayerHooks, type PlayerHooks } from "./player-hooks.ts";
import type { PlayerView, ResourceItem } from "./types.ts";

export interface LessonControls {
  open(lessonRef: string, at?: string): void;
  setPosition(seconds: number, at?: string): void;
  next(at?: string): void;
  prev(at?: string): void;
  markComplete(at?: string): void;
  saveNote(body: string, at?: string): void;
  toggleFavorite(at?: string): void;
  heartbeat(seconds: number, at?: string): void;
  openResource(resource: ResourceItem): void;
  requestDownload(resourceId: string): void;
}

export interface LessonPlayerOptions {
  curriculum: ProgramCurriculumV2;
  store: RuntimeStore;
  media?: MediaAdapters;
  resourceProvider?: ResourceProvider;
  /** Persistance optionnelle (Sprint B) pour l'autosave. */
  persistence?: { adapter: RuntimePersistence; userId: string; autosave?: AutosaveManager };
  heartbeatIntervalSeconds?: number;
}

/** Player de leçon : point d'accès unique pour l'UI future. */
export class LessonPlayer {
  readonly hooks: PlayerHooks = createPlayerHooks();
  private curriculum: ProgramCurriculumV2;
  private store: RuntimeStore;
  private media: MediaAdapters;
  private resourceProvider: ResourceProvider;
  private persistence?: LessonPlayerOptions["persistence"];
  private heartbeatIntervalSeconds: number;

  private currentRef: string | null = null;
  private heartbeat: HeartbeatManager | null = null;
  private awards: Awards = { badges: [], certificates: [] };
  private revision = 0;

  constructor(opts: LessonPlayerOptions) {
    this.curriculum = opts.curriculum;
    this.store = opts.store;
    this.media = opts.media ?? {};
    this.resourceProvider = opts.resourceProvider ?? DefaultResourceProvider;
    this.persistence = opts.persistence;
    this.heartbeatIntervalSeconds = opts.heartbeatIntervalSeconds ?? 30;
    if (!this.media.downloads) this.media.downloads = new RecordingDownloadManager();
  }

  /** Récupère (ou reprend) la dernière leçon consultée. */
  currentRefValue(): string | null {
    return this.currentRef;
  }

  /** Instantané complet pour l'UI. */
  getView(now?: Date): PlayerView {
    const state = this.store.getState();
    return {
      current: this.currentRef
        ? LessonStateController.viewModel(this.curriculum, state, this.currentRef, this.resourceProvider)
        : null,
      timeline: LessonTimeline.build(this.curriculum, state, this.currentRef ?? undefined),
      program: ProgressCalculator.programProgressView(this.curriculum, state, now),
      timeSpentSeconds: TimeTracker.timeSpentSeconds(state),
      estimatedRemainingSeconds: TimeTracker.estimatedRemainingSeconds(this.curriculum, state),
    };
  }

  /** Surface de commandes (déléguées au store + contrôleurs). */
  get controls(): LessonControls {
    return {
      open: (lessonRef, at) => this.open(lessonRef, at),
      setPosition: (seconds, at) => this.setPosition(seconds, at),
      next: (at) => this.goNext(at),
      prev: (at) => this.goPrev(at),
      markComplete: (at) => this.markComplete(at),
      saveNote: (body, at) => this.saveNote(body, at),
      toggleFavorite: (at) => this.toggleFavorite(at),
      heartbeat: (seconds, at) => this.tick(seconds, at),
      openResource: (resource) => this.openResource(resource),
      requestDownload: (resourceId) => this.requestDownload(resourceId),
    };
  }

  // ── Implémentations (délèguent au store/contrôleurs) ──
  private open(lessonRef: string, at?: string): void {
    if (!LessonStateController.isAccessible(this.store.getState(), lessonRef)) return; // leçon verrouillée
    this.flushHeartbeat(at); // vide le temps de la leçon précédente
    this.currentRef = lessonRef;
    this.heartbeat = new HeartbeatManager(lessonRef, this.heartbeatIntervalSeconds);
    this.store.dispatch(LearningEvents.lessonViewed(lessonRef, at));
    this.markDirty();
    this.hooks.emit("lessonOpened", { lessonRef });
  }

  private setPosition(seconds: number, at?: string): void {
    if (!this.currentRef) return;
    this.store.dispatch(LearningEvents.lessonPosition(this.currentRef, seconds, at));
    this.markDirty();
    this.hooks.emit("positionChanged", { lessonRef: this.currentRef, seconds });
  }

  private goNext(at?: string): void {
    if (!this.currentRef) return;
    const nextRef = LessonNavigator.nextAccessible(this.curriculum, this.store.getState(), this.currentRef);
    if (nextRef) this.open(nextRef, at);
  }

  private goPrev(at?: string): void {
    if (!this.currentRef) return;
    const prevRef = LessonNavigator.prev(this.curriculum, this.currentRef);
    if (prevRef && LessonStateController.isAccessible(this.store.getState(), prevRef)) this.open(prevRef, at);
  }

  private markComplete(at?: string): void {
    if (!this.currentRef) return;
    const event = CompletionController.markComplete(this.store.getState(), this.currentRef, at);
    if (!event) return;
    this.store.dispatch(event);
    this.markDirty();
    this.refreshAwards();
    this.hooks.emit("lessonCompleted", { lessonRef: this.currentRef });
  }

  private saveNote(body: string, at?: string): void {
    if (!this.currentRef) return;
    this.store.dispatch(NotesController.save(this.currentRef, body, at));
    this.markDirty();
    this.hooks.emit("noteSaved", { lessonRef: this.currentRef });
  }

  private toggleFavorite(at?: string): void {
    if (!this.currentRef) return;
    const event = BookmarkController.toggle(this.store.getState(), this.currentRef, at);
    this.store.dispatch(event);
    this.markDirty();
    const on = "on" in event ? (event as { on: boolean }).on : true;
    this.hooks.emit("favoriteToggled", { lessonRef: this.currentRef, on });
  }

  private tick(seconds: number, at?: string): void {
    if (!this.currentRef || !this.heartbeat) return;
    this.heartbeat.tick(seconds);
    const event = this.heartbeat.drain(at);
    if (event) {
      this.store.dispatch(event);
      this.markDirty();
    }
  }

  private flushHeartbeat(at?: string): void {
    if (!this.heartbeat) return;
    const event = this.heartbeat.flush(at);
    if (event) {
      this.store.dispatch(event);
      this.markDirty();
    }
    this.heartbeat = null;
  }

  private openResource(resource: ResourceItem): void {
    this.media.resources?.open(resource);
    if (this.currentRef) this.hooks.emit("resourceOpened", { lessonRef: this.currentRef, resourceId: resource.id });
  }

  private requestDownload(resourceId: string): void {
    if (!this.currentRef) return;
    const view = LessonStateController.viewModel(this.curriculum, this.store.getState(), this.currentRef, this.resourceProvider);
    const item = view?.downloads.find((d) => d.id === resourceId);
    if (item) this.media.downloads?.request(item);
  }

  // ── Reprise ──
  resume(): string | undefined {
    const ref = ResumeController.continueWhereILeftOff(this.curriculum, this.store.getState());
    if (ref) this.open(ref);
    return ref;
  }

  // ── Badges (lecture seule ici ; attribution effective = Sprint ultérieur) ──
  private refreshAwards(): void {
    this.awards = BadgeRepository.award(this.curriculum, this.store.getState(), this.awards);
  }
  ownedBadges(): string[] {
    return BadgeRepository.owned(this.awards);
  }

  // ── Autosave (optionnel, via Persistence Sprint B) ──
  private markDirty(): void {
    this.persistence?.autosave?.markDirty();
  }
  /** À appeler périodiquement par l'UI : sauvegarde si l'autosave est dû. */
  async maybeAutosave(nowMs: number): Promise<boolean> {
    if (!this.persistence?.autosave || !this.persistence.autosave.isDue(nowMs)) return false;
    const snap = await this.persistence.adapter.save({
      userId: this.persistence.userId,
      state: this.store.getState(),
      awards: this.awards,
      prevRevision: this.revision,
    });
    this.revision = snap.revision;
    this.persistence.autosave.saved(nowMs);
    return true;
  }
}
