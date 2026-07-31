/**
 * Runtime — UI/Assessment : i18n MINIMAL du quiz (Sprint K3A).
 *
 * PROVISOIRE. Les composants de quiz n'inscrivent PAS de texte métier en dur : ils passent par des CLÉS.
 * Ce module fournit un repli FRANÇAIS canonique (langue de référence). Le dictionnaire multilingue complet
 * (7 langues) est le périmètre du Sprint K6 ; ici, une clé inconnue est rendue de façon contrôlée (la clé
 * elle-même), sans jamais casser le rendu.
 */
const FR: Record<string, string> = {
  // Titres / structure
  "quiz.title": "Quiz formatif",
  "quiz.loading": "Chargement du quiz…",
  "quiz.start": "Commencer le quiz",
  "quiz.question": "Question",
  "quiz.of": "sur",
  "quiz.previous": "← Précédent",
  "quiz.next": "Suivant →",
  "quiz.submit": "Soumettre",
  "quiz.submitting": "Correction en cours…",
  "quiz.retry": "Reprendre le quiz",
  "quiz.retry_blocked": "Nombre maximal de tentatives atteint",
  "quiz.continue": "Continuer l'apprentissage",
  "quiz.result_title": "Résultat",
  "quiz.answered": "Réponses",
  "quiz.empty": "Aucune question disponible pour ce module.",
  "quiz.disabled": "Le quiz n'est pas activé dans cet environnement.",
  "quiz.unauthorized": "Accès non autorisé.",
  "quiz.error": "Une erreur est survenue. Veuillez réessayer.",
  "quiz.invalid_session": "Session de quiz invalide.",
  "quiz.strengths": "Points forts",
  "quiz.to_review": "À revoir",
  "quiz.competencies": "Compétences évaluées",
  "quiz.correct_count": "Réponses correctes",
  "quiz.passed": "Réussi",
  "quiz.failed": "À retravailler",
  "quiz.manual_review": "En attente de correction",
  "quiz.expired": "Temps écoulé",
  // Prochaines étapes
  "quiz.next.continue": "Continuer vers la suite du parcours",
  "quiz.next.retry": "Revoir puis reprendre le quiz",
  // Rétroaction (clés produites par le FeedbackEngine du Sprint F)
  "assessment.feedback.passed": "Félicitations, vous avez atteint le seuil de réussite.",
  "assessment.feedback.retry": "Le seuil n'est pas atteint : révisez les points signalés.",
  "assessment.feedback.retry_available": "Une nouvelle tentative est disponible.",
  "assessment.feedback.manual_review": "Certaines réponses nécessitent une correction manuelle.",
  "assessment.feedback.expired": "La tentative a expiré avant la soumission.",
  "assessment.summary.passed": "Quiz réussi",
  "assessment.summary.failed": "Quiz non réussi",
  "assessment.summary.pending": "Correction en attente",
};

/** Traduit une clé de quiz vers le français canonique ; repli contrôlé sur la clé si non traduite. */
export function quizT(key: string): string {
  return FR[key] ?? key;
}

/** Indique si une clé possède une traduction française (utile pour marquer les clés manquantes en test). */
export function hasQuizTranslation(key: string): boolean {
  return key in FR;
}
