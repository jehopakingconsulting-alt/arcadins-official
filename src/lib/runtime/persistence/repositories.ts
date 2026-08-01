/**
 * Runtime — Persistence : Repositories (Sprint B).
 *
 * Façades PURES d'accès aux données du runtime. Elles lisent l'état (Sprint A) et les récompenses
 * (couche persistence), sans écrire en base : la persistance passe par `RuntimePersistence`.
 * Réutilisables pour tout programme (marketing, TEF/TCF/DELF…).
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type {
  Bookmark,
  LessonProgress,
  ModuleProgress,
  ProgramProgressView,
  RuntimeState,
  StudentNote,
} from "../types.ts";
import { ProgressCalculator } from "../progress-calculator.ts";
import { BookmarkManager } from "../bookmark-manager.ts";
import { NoteManager } from "../note-manager.ts";
import { StudySessionManager } from "../study-session-manager.ts";
import { CompletionCalculator } from "../completion-calculator.ts";
import type { Awards, CertificateRecord } from "./types.ts";

// ── ProgressRepository ──
export const ProgressRepository = {
  program(curriculum: ProgramCurriculumV2, state: RuntimeState, now?: Date): ProgramProgressView {
    return ProgressCalculator.programProgressView(curriculum, state, now);
  },
  lesson(state: RuntimeState, lessonRef: string): LessonProgress | undefined {
    return state.lessons[lessonRef];
  },
  module(state: RuntimeState, moduleIndex: number): ModuleProgress | undefined {
    return state.modules[moduleIndex];
  },
};

// ── StudySessionRepository ──
export const StudySessionRepository = {
  total(state: RuntimeState): number {
    return state.study.totalSeconds;
  },
  forLesson(state: RuntimeState, lessonRef: string): number {
    return StudySessionManager.forLesson(state.study, lessonRef);
  },
  forDay(state: RuntimeState, day: string): number {
    return StudySessionManager.forDay(state.study, day);
  },
  byDay(state: RuntimeState): Record<string, number> {
    return { ...state.study.byDay };
  },
};

// ── BookmarkRepository ──
export const BookmarkRepository = {
  favorites(state: RuntimeState): string[] {
    return BookmarkManager.favorites(state.bookmarks);
  },
  isFavorite(state: RuntimeState, lessonRef: string): boolean {
    return BookmarkManager.has(state.bookmarks, lessonRef, "favorite");
  },
};

// ── NotesRepository ──
export const NotesRepository = {
  get(state: RuntimeState, lessonRef: string): StudentNote | undefined {
    return NoteManager.get(state.notes, lessonRef);
  },
  all(state: RuntimeState): StudentNote[] {
    return NoteManager.all(state.notes);
  },
};

// ── HistoryRepository ──
export const HistoryRepository = {
  recent(state: RuntimeState, limit = 20): Bookmark[] {
    return BookmarkManager.history(state.bookmarks).slice(0, limit);
  },
};

// ── BadgeRepository ── (catalogue générique + attribution PURE, hors RuntimeState)
export interface BadgeDefinition {
  code: string;
  label: string;
  description: string;
  /** Critère PUR évalué sur la progression. */
  criteria: (view: ProgramProgressView, ctx: { curriculum: ProgramCurriculumV2; state: RuntimeState }) => boolean;
}

/** Catalogue par défaut (générique, indépendant du contenu). */
export const DEFAULT_BADGES: BadgeDefinition[] = [
  { code: "first-lesson", label: "Première leçon", description: "Compléter une première leçon.", criteria: (v) => v.lessonsCompleted >= 1 },
  { code: "halfway", label: "Mi-parcours", description: "Atteindre 50 % de progression.", criteria: (v) => v.percent >= 50 },
  {
    code: "first-module",
    label: "Premier module validé",
    description: "Valider un module complet.",
    criteria: (_v, ctx) => ctx.curriculum.modules.some((m) => CompletionCalculator.isModulePassed(ctx.curriculum, ctx.state, m.index)),
  },
  { code: "program-complete", label: "Programme complété", description: "Valider tous les modules.", criteria: (_v, ctx) => ctx.curriculum.modules.every((m) => CompletionCalculator.isModulePassed(ctx.curriculum, ctx.state, m.index)) },
];

export const BadgeRepository = {
  /** Badges obtenus (déjà attribués dans les récompenses). */
  owned(awards: Awards): string[] {
    return [...awards.badges];
  },
  /** Codes de badges nouvellement éligibles (non encore attribués). */
  newlyEligible(
    curriculum: ProgramCurriculumV2,
    state: RuntimeState,
    awards: Awards,
    catalog: BadgeDefinition[] = DEFAULT_BADGES,
    now?: Date,
  ): string[] {
    const view = ProgressCalculator.programProgressView(curriculum, state, now);
    return catalog
      .filter((b) => b.criteria(view, { curriculum, state }))
      .map((b) => b.code)
      .filter((code) => !awards.badges.includes(code));
  },
  /** Renvoie de nouvelles récompenses avec les badges nouvellement obtenus (immuable). */
  award(curriculum: ProgramCurriculumV2, state: RuntimeState, awards: Awards, catalog?: BadgeDefinition[], now?: Date): Awards {
    const toAdd = BadgeRepository.newlyEligible(curriculum, state, awards, catalog, now);
    if (toAdd.length === 0) return awards;
    return { ...awards, badges: [...awards.badges, ...toAdd] };
  },
};

// ── CertificateRepository ── (éligibilité/brouillon PUR ; jamais d'émission officielle ici)
export const CertificateRepository = {
  /** Le programme est-il éligible à une attestation interne ? */
  isEligible(curriculum: ProgramCurriculumV2, state: RuntimeState): boolean {
    return ProgressCalculator.eligibleForCertificate(curriculum, state);
  },
  /** Construit un enregistrement d'attestation en BROUILLON (jamais « issued »). */
  draft(curriculum: ProgramCurriculumV2, state: RuntimeState, revision: number, now?: string): CertificateRecord | null {
    if (!CertificateRepository.isEligible(curriculum, state)) return null;
    return {
      id: `cert-draft-${state.programSlug}-${revision}`,
      programSlug: state.programSlug,
      programVersion: state.programVersion,
      status: "eligible",
      revision,
      createdAt: now ?? new Date().toISOString(),
    };
  },
  owned(awards: Awards): CertificateRecord[] {
    return [...awards.certificates];
  },
};
