/**
 * ARCADINS — Modèle de présentation du LECTEUR DE LEÇON (générique, métadonnées).
 * RÉUTILISE le modèle existant : `ContentBlock`/`ContentBlockType` (runtime/ui) et
 * `ResourceKind` (runtime/player). Aucune logique dupliquée : ici, uniquement la
 * projection présentation consommée par l'UI. Aucun média codé en dur — tout est
 * piloté par `type` + `meta` (URL/placeholder/durée…). i18n via Localized.
 */
import type { ContentBlock } from "../runtime/ui/types.ts";
import type { ResourceKind } from "../runtime/player/types.ts";
import type { Localized } from "../program-presentation/types.ts";

export type { ContentBlock } from "../runtime/ui/types.ts";
export type { ResourceKind } from "../runtime/player/types.ts";

export interface LessonResource {
  id: string;
  kind: ResourceKind; // link | pdf | video | audio | download
  label: string;
  href?: string; // absent = placeholder (aucun média réel encore)
  meta?: Record<string, string | number | boolean>;
}

export interface LessonNavItem {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
  locked: boolean;
}

export interface CompetencyTag {
  code: string;
  label: Localized;
}

/** Modèle complet consommé par le lecteur (projection ; jamais de barème/clé privée). */
export interface LessonPlayerModel {
  lessonId: string;
  moduleTitle: string;
  title: string;
  objectives: string[];
  competencies: CompetencyTag[];
  blocks: ContentBlock[];
  resources: LessonResource[];
  progressPercent: number;
  moduleLessons: LessonNavItem[];
  previousLessonId: string | null;
  nextLessonId: string | null;
  /** Position de reprise (offset dans les blocs) — persistée en aval (S+). */
  resumeBlockIndex: number;
}
