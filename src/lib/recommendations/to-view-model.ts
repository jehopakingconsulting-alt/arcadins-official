/**
 * ARCADINS — Projection PURE : sortie du moteur (JourneyRecommendation) → view-model
 * public canonique (RecommendationViewModel). RÉUTILISE le moteur `RecommendationEngine`
 * existant ; ne duplique aucune logique de recommandation. Déterministe, triable par
 * priorité. API/AI-ready (pur, sérialisable). Imports RELATIFS (node-testable).
 */
import type { JourneyRecommendation } from "../runtime/journey/types.ts";
import type { RecommendationViewModel } from "../runtime/ui/view-models.ts";

type Kind = RecommendationViewModel["kind"];

/** Correspondance type moteur → kind public (repli sûr : view_resource). */
const KIND_MAP: Record<string, Kind> = {
  continue: "continue_lesson",
  resume: "continue_lesson",
  review: "review_competency",
  "strengthen-skill": "review_competency",
  "redo-activity": "redo_exercise",
  "prepare-assessment": "retry_quiz",
  "complete-prerequisite": "view_resource",
  "start-next": "next_module",
  "finish-project": "prepare_project",
};

export function toRecommendationViewModel(reco: JourneyRecommendation): RecommendationViewModel {
  return {
    id: reco.id,
    kind: KIND_MAP[reco.type] ?? "view_resource",
    labelKey: reco.titleKey,
    reasonKey: reco.reasonCodes[0] ?? reco.descriptionKey,
    targetId: reco.targetId ?? null,
  };
}

/** Trie par priorité décroissante (déterministe : départage par id) puis projette. */
export function toRecommendationViewModels(recos: readonly JourneyRecommendation[]): RecommendationViewModel[] {
  return [...recos]
    .sort((a, b) => (b.priority - a.priority) || a.id.localeCompare(b.id))
    .map(toRecommendationViewModel);
}
