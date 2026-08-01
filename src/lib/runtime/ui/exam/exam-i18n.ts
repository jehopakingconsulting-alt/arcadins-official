/**
 * Runtime — UI/Exam : i18n MINIMAL de l'examen (Sprint K3B).
 *
 * PROVISOIRE. Les composants n'inscrivent PAS de texte métier en dur : ils passent par des CLÉS. Repli
 * FRANÇAIS canonique. Le dictionnaire multilingue complet (7 langues) = Sprint K6 ; ici, une clé inconnue est
 * rendue de façon contrôlée (la clé elle-même), sans casser le rendu.
 */
const FR: Record<string, string> = {
  "exam.title": "Examen final",
  "exam.loading_eligibility": "Vérification de l'admissibilité…",
  "exam.eligibility.title": "Admissibilité à l'examen final",
  "exam.eligibility.eligible": "Vous êtes admissible à l'examen final.",
  "exam.eligibility.not_eligible": "Vous n'êtes pas encore admissible à l'examen final.",
  "exam.eligibility.already_passed": "Examen déjà réussi.",
  "exam.eligibility.attempts_exhausted": "Nombre maximal de tentatives atteint.",
  "exam.eligibility.expired": "La fenêtre d'examen est fermée.",
  "exam.eligibility.suspended": "Accès à l'examen suspendu.",
  "exam.eligibility.administrative_hold": "Blocage administratif : contactez l'administration.",
  "exam.eligibility.feature_disabled": "L'examen final n'est pas activé dans cet environnement.",
  "exam.eligibility.unknown": "Statut d'admissibilité indéterminé.",
  "exam.instructions.title": "Instructions et règles de l'examen",
  "exam.instructions.body": "L'examen est chronométré et à soumission définitive. Lisez chaque question attentivement. La correction est effectuée par le serveur.",
  "exam.acknowledge": "J'ai lu et j'accepte les règles de l'examen.",
  "exam.start": "Démarrer l'examen",
  "exam.resume": "Reprendre l'examen",
  "exam.section": "Section",
  "exam.question": "Question",
  "exam.previous_section": "← Section précédente",
  "exam.next_section": "Section suivante →",
  "exam.flag": "Marquer pour révision",
  "exam.unflag": "Retirer le marquage",
  "exam.save": "Enregistrer",
  "exam.saved": "Enregistré",
  "exam.saving": "Enregistrement…",
  "exam.time_remaining": "Temps restant",
  "exam.time_warning": "Attention : il reste peu de temps.",
  "exam.expired": "Temps écoulé — l'examen a été soumis automatiquement.",
  "exam.submit": "Soumettre l'examen",
  "exam.submit_confirm_title": "Soumettre définitivement l'examen ?",
  "exam.submit_confirm_body": "Cette action est définitive. Vos réponses seront corrigées par le serveur.",
  "exam.confirm": "Confirmer la soumission",
  "exam.cancel": "Annuler",
  "exam.receipt.title": "Examen soumis",
  "exam.receipt.received": "Votre examen a bien été reçu.",
  "exam.result.provisional_title": "Résultat provisoire",
  "exam.result.provisional_note": "Résultat PROVISOIRE : la décision définitive peut dépendre d'une révision.",
  "exam.result.score": "Score provisoire",
  "exam.result.passed_provisional": "Réussite provisoire",
  "exam.result.failed_provisional": "Seuil non atteint (provisoire)",
  "exam.result.manual_review": "En attente de révision manuelle",
  "exam.navigation_blocked": "Navigation non autorisée par la politique de l'examen.",
  // Statuts de révision manuelle
  "exam.review.status.not_required": "Aucune révision manuelle requise",
  "exam.review.status.pending_assignment": "Révision manuelle en file d'attente",
  "exam.review.status.assigned": "Révision manuelle assignée",
  "exam.review.status.in_review": "Révision manuelle en cours",
  "exam.review.status.needs_second_review": "Seconde révision requise",
  "exam.review.status.escalated": "Révision escaladée",
  "exam.review.status.approved": "Révision approuvée",
  "exam.review.status.rejected": "Révision rejetée",
  "exam.review.status.finalized": "Révision finalisée",
  // Décision finale + jalons
  "exam.decision.pending": "Décision en attente",
  "exam.decision.title": "Décision finale",
  "exam.decision.passed": "Examen réussi",
  "exam.decision.failed": "Examen non réussi",
  "exam.next.decision_pending": "La décision finale sera communiquée après correction.",
  "exam.next.passed": "Examen réussi — poursuivez votre parcours.",
  "exam.next.certificate_available": "Admissible à la certification (attestation non encore émise).",
  "exam.next.retake": "Vous pourrez demander une nouvelle tentative selon la politique.",
  "exam.continue": "Continuer l'apprentissage",
  // Sections démo
  "exam.section.fundamentals": "Fondamentaux",
  "exam.section.strategy": "Stratégie",
};

export function examT(key: string): string {
  if (FR[key]) return FR[key];
  // Repli contrôlé pour les clés dynamiques de raison d'admissibilité / résultat.
  if (key.startsWith("exam.eligibility.reason.")) return "Condition d'admissibilité non satisfaite.";
  if (key.startsWith("exam.result.reason.")) return "Information de correction.";
  return key;
}

export function hasExamTranslation(key: string): boolean {
  return key in FR;
}
