/**
 * Runtime — UI : configuration & flags (Sprint J).
 *
 * Interface étudiante du Learning Runtime. Tant que `STUDENT_LEARNING_UI_ENABLED = false` : aucune route
 * étudiante nouvelle accessible, aucun composant académique en production publique, aucune API académique
 * appelée, aucune donnée réelle chargée. La preview interne est doublement gardée (flag preview + rôle admin).
 */
import { ACADEMIC_PREVIEW_ENABLED } from "../../academic/preview-config.ts";

/** Interrupteur maître de l'expérience étudiante (indépendant). */
export const STUDENT_LEARNING_UI_ENABLED = false;

/** Réutilise le flag d'aperçu interne existant (zone /admin, RBAC + notFound si OFF). */
export { ACADEMIC_PREVIEW_ENABLED };

/** Étiquette obligatoire sur tout jeu de données de démonstration. */
export const DEMO_DATA_LABEL = "Données de démonstration";

/** Intitulé officiel du document (aucune reconnaissance gouvernementale inventée). */
export const CREDENTIAL_DOCUMENT_TITLE = "Attestation de réussite ARCADINS";

/** La preview étudiante est-elle accessible ? (flag preview + flag UI, fail-closed). */
export function isStudentPreviewAccessible(flags: { preview?: boolean; ui?: boolean } = {}): boolean {
  const preview = flags.preview ?? ACADEMIC_PREVIEW_ENABLED;
  // La preview interne dépend uniquement du flag preview (le flag UI garde la PROD publique).
  return preview === true;
}
