/**
 * Runtime — Learning Player : types & interfaces (Sprint C).
 *
 * Couche de CONTRÔLEURS + INTERFACES injectables. Aucune UI React, aucune librairie spécifique.
 * Le Player consomme exclusivement le Runtime (Sprint A) et la Persistence (Sprint B).
 * Générique : fonctionne pour tout programme (marketing pilote comme futurs TEF/TCF/DELF).
 */
import type { LessonState, ProgramProgressView } from "../types.ts";

// ─────────────────────────── Ressources & téléchargements ───────────────────────────

export type ResourceKind = "link" | "pdf" | "video" | "audio" | "download";

export interface ResourceItem {
  id: string;
  kind: ResourceKind;
  label: string;
  /** URL/chemin (Storage signé côté serveur en pratique). Optionnel pour les liens purs. */
  src?: string;
}

export interface DownloadItem {
  id: string;
  label: string;
  src: string;
  mime?: string;
  bytes?: number;
}

// ─────────────────────────── Vues (données pour l'UI) ───────────────────────────

/** Bloc de contenu rendu (agnostique du framework ; l'UI choisit comment l'afficher). */
export type RenderBlock =
  | { type: "introduction"; text: string }
  | { type: "section"; heading: string; body: string[] }
  | { type: "paragraph"; text: string }
  | { type: "definition"; term: string; definition: string }
  | { type: "example"; text: string }
  | { type: "commonError"; title: string; body: string }
  | { type: "vigilance"; title: string; body: string }
  | { type: "caseStudy"; title: string; region: string; body: string[]; isFictional: boolean }
  | { type: "formula"; name: string; expression: string; example: string }
  | { type: "keyTakeaways"; items: string[] }
  | { type: "activity"; title: string; prompt: string[]; deliverables: string[] }
  | { type: "summary"; text: string }
  | { type: "quizRef"; quizId: string; questionCount: number }; // référence seulement (Quiz = Sprint D)

/** Modèle de barre de progression d'UNE leçon. */
export interface LessonProgressModel {
  lessonRef: string;
  positionSeconds: number;
  durationSeconds: number;
  /** 0..100 (position/durée) ; 0 si durée inconnue. */
  positionPercent: number;
  state: LessonState;
}

/** Entrée de timeline (parcours) côté Player. */
export interface TimelineEntry {
  lessonRef: string;
  moduleIndex: number;
  title: string;
  state: LessonState;
  isCurrent: boolean;
}

/** Vue complète d'une leçon pour le Player. */
export interface LessonView {
  lessonRef: string;
  moduleIndex: number;
  title: string;
  state: LessonState;
  accessible: boolean;
  durationMinutes: number;
  resumePositionSeconds: number;
  isFavorite: boolean;
  note: string | null;
  blocks: RenderBlock[];
  resources: ResourceItem[];
  downloads: DownloadItem[];
  hasPrev: boolean;
  hasNext: boolean;
  prevRef?: string;
  nextRef?: string;
}

/** Instantané complet exposé par le LessonPlayer. */
export interface PlayerView {
  current: LessonView | null;
  timeline: TimelineEntry[];
  program: ProgramProgressView;
  timeSpentSeconds: number;
  estimatedRemainingSeconds: number;
}

// ─────────────────────────── Validation ───────────────────────────

export interface PlayerIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}
export interface PlayerValidationReport {
  ok: boolean;
  errors: PlayerIssue[];
  warnings: PlayerIssue[];
}
