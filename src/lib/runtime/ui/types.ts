/**
 * Runtime — UI : types partagés (Sprint J).
 *
 * Types d'état d'interface, statuts visuels et blocs de contenu. Aucune logique métier : les statuts proviennent
 * des moteurs/services (view models), les composants ne les recalculent jamais.
 */

/** États d'interface obligatoires pour chaque vue. */
export type UiState =
  | "loading"
  | "skeleton"
  | "empty"
  | "success"
  | "error"
  | "retry"
  | "offline"
  | "stale"
  | "locked"
  | "forbidden"
  | "expired"
  | "suspended"
  | "feature_disabled";

/** Statut visuel d'une leçon/module/semaine dans le parcours (fourni par le moteur). */
export type JourneyStatus =
  | "not_started"
  | "available"
  | "in_progress"
  | "completed"
  | "locked"
  | "needs_review"
  | "submitted"
  | "grading"
  | "passed"
  | "failed"
  | "expired";

/** Statut d'inscription reflété dans le shell. */
export type EnrollmentUiStatus = "new" | "none" | "active" | "completed" | "expired" | "suspended";

/** Types de blocs de contenu supportés par le renderer (tolérant aux inconnus). */
export type ContentBlockType =
  | "heading"
  | "paragraph"
  | "list"
  | "quote"
  | "callout"
  | "warning"
  | "definition"
  | "keyTakeaway"
  | "example"
  | "caseStudy"
  | "table"
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "code"
  | "formula"
  | "interactiveActivity"
  | "checklist"
  | "reflection"
  | "resource"
  | "assignment"
  | "summary";

export interface ContentBlock {
  id: string;
  type: ContentBlockType | string; // string : tolérance aux types inconnus → fallback sûr
  /** Texte principal (déjà assaini : jamais de HTML brut). */
  text?: string;
  heading?: string;
  items?: string[];
  rows?: string[][];
  /** Métadonnées non sensibles (durée, langue, placeholder…). */
  meta?: Record<string, string | number | boolean>;
}

/** Type de question tel que présenté à l'élève (jamais de barème). */
export type PublicQuestionKind = "single" | "multiple" | "true_false" | "short_answer" | "matching" | "ordering" | "case";

export interface DataResult<T> {
  state: UiState;
  data: T | null;
  errorCode?: string;
  demo: boolean;
}
