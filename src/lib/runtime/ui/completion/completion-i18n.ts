/**
 * Runtime — UI/Completion : i18n MINIMAL (Sprint K3C). PROVISOIRE (K6 fera les 7 langues). Repli FR canonique ;
 * clé inconnue rendue de façon contrôlée. Aucun texte métier critique codé en dur dans les composants.
 */
const FR: Record<string, string> = {
  "completion.title": "Bilan d'évaluation",
  "completion.program.title": "Marketing Digital et E-commerce",
  "completion.decision.provisional": "Résultat provisoire",
  "completion.decision.final": "Décision définitive",
  "completion.decision.none": "Évaluation en cours",
  "completion.score": "Score",
  "completion.competencies": "Compétences",
  "completion.acquired": "Acquise",
  "completion.not_acquired": "À consolider",
  "completion.remaining": "Éléments restants",
  "completion.review": "Révision",
  "completion.retake": "Reprise",
  "completion.next": "Prochaine action",
  "completion.certification": "Certification",
  "completion.notice.no_certificate_yet": "Aucun certificat n'a encore été émis (l'émission relève d'une étape ultérieure).",
  // Statuts de complétion
  "completion.status.not_started": "Non commencé",
  "completion.status.quiz_requirements_pending": "Quiz obligatoires à terminer",
  "completion.status.quiz_requirements_completed": "Quiz obligatoires validés",
  "completion.status.final_exam_not_eligible": "Examen final non accessible",
  "completion.status.final_exam_eligible": "Admissible à l'examen final",
  "completion.status.final_exam_in_progress": "Examen final en cours",
  "completion.status.final_exam_submitted": "Examen final soumis",
  "completion.status.provisional_pass": "Réussite provisoire",
  "completion.status.provisional_fail": "Échec provisoire",
  "completion.status.manual_review_pending": "Révision manuelle en attente",
  "completion.status.manual_review_in_progress": "Révision manuelle en cours",
  "completion.status.manual_review_completed": "Révision manuelle terminée",
  "completion.status.retake_available": "Reprise disponible",
  "completion.status.retake_exhausted": "Reprises épuisées",
  "completion.status.final_pass": "Programme réussi",
  "completion.status.final_fail": "Programme non réussi",
  "completion.status.suspended": "Accès suspendu",
  "completion.status.expired": "Délai expiré",
  "completion.status.administratively_blocked": "Blocage administratif",
  // Raisons publiques
  "completion.reason.manual_review_required": "Certaines réponses nécessitent une révision manuelle.",
  "completion.reason.quiz_incomplete": "Des quiz obligatoires ne sont pas encore réussis.",
  "completion.reason.eliminatory_section": "Une section éliminatoire n'a pas atteint le seuil requis.",
  "completion.reason.below_threshold": "Le seuil global n'est pas atteint.",
  "completion.reason.provisional_pass": "Seuils atteints (résultat provisoire).",
  "completion.reason.final_pass": "Programme validé.",
  "completion.reason.final_fail": "Programme non validé.",
  "completion.reason.expired": "La tentative a expiré.",
  "completion.reason.invalidated": "La tentative a été invalidée.",
  // Reprise
  "completion.retake.available": "Une nouvelle tentative est disponible.",
  "completion.retake.exhausted": "Nombre maximal de tentatives atteint.",
  "completion.retake.cooldown": "Reprise possible après le délai d'attente.",
  "completion.retake.not_needed": "Aucune reprise nécessaire.",
  // Compétences / restants
  "completion.competency.review": "Revoir cette compétence.",
  "completion.remaining.competencies": "Compétences à consolider.",
  "completion.remaining.quizzes": "Quiz obligatoires à réussir.",
  // Prochaines actions
  "completion.next.finish_quizzes": "Terminer les quiz obligatoires.",
  "completion.next.start_exam": "Démarrer l'examen final.",
  "completion.next.meet_requirements": "Satisfaire les prérequis d'admissibilité.",
  "completion.next.await_review": "Attendre la fin de la révision manuelle.",
  "completion.next.await_decision": "Attendre la décision définitive.",
  "completion.next.review_material": "Revoir puis reprendre selon la politique.",
  "completion.next.retake": "Demander une nouvelle tentative.",
  "completion.next.completed": "Programme terminé — poursuivre.",
  "completion.next.contact_admin": "Contacter l'administration.",
  "completion.next.continue": "Poursuivre l'apprentissage.",
};
export function completionT(key: string): string {
  return FR[key] ?? key;
}
export function hasCompletionTranslation(key: string): boolean {
  return key in FR;
}
