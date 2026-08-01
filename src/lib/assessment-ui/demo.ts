/**
 * ARCADINS — Données de DÉMONSTRATION d'évaluation (publiques, génériques).
 * Questions SANS bonne réponse (PublicQuestionViewModel) + résultat public simulé
 * (comme corrigé serveur). Les vraies questions/résultats viennent du moteur
 * (AssessmentEngine) branché en S6. Aucun barème ici.
 */
import type { PublicQuestionViewModel, AssessmentResultViewModel } from "../runtime/ui/view-models.ts";
import type { Localized } from "../program-presentation/types.ts";

export interface DemoAssessment {
  title: Localized;
  passThreshold: number;
  questions: PublicQuestionViewModel[];
  /** Résultat public simulé (rendu après soumission ; en prod = corrigé serveur). */
  demoResult: AssessmentResultViewModel;
}

export const demoQuiz: DemoAssessment = {
  title: { fr: "Quiz — Expression écrite", en: "Quiz — Writing", es: "Cuestionario — Expresión escrita" },
  passThreshold: 70,
  questions: [
    { questionId: "q1", kind: "single", prompt: "Quelle formule d'appel convient à une lettre formelle ?", options: [{ id: "a", label: "Salut," }, { id: "b", label: "Madame, Monsieur," }, { id: "c", label: "Coucou," }], points: 1 },
    { questionId: "q2", kind: "true_false", prompt: "Le corps d'une lettre formelle comporte 3 paragraphes.", options: [{ id: "true", label: "Vrai" }, { id: "false", label: "Faux" }], points: 1 },
    { questionId: "q3", kind: "multiple", prompt: "Quels éléments figurent dans l'en-tête ?", options: [{ id: "date", label: "Date" }, { id: "objet", label: "Objet" }, { id: "emoji", label: "Emoji" }, { id: "coord", label: "Coordonnées" }], points: 2 },
    { questionId: "q4", kind: "short_answer", prompt: "Citez une formule de politesse formelle.", points: 1 },
  ],
  demoResult: {
    scorePercent: 80,
    passed: true,
    feedbackKeys: ["result.solid_structure", "result.watch_register"],
    strengths: ["Structure", "Formules d'appel"],
    toReview: ["Registre soutenu"],
    recommendations: [],
    nextStepKey: "next.module5",
    correctCount: 3,
    totalQuestions: 4,
    competencies: ["EE", "GR"],
    retryAvailable: true,
  },
};
