// Aperçu du cursus académique v2 — configuration.
//
// ⚠️ DÉSACTIVÉ PAR DÉFAUT. L'aperçu reste invisible (notFound) tant que :
//   1. le contenu des modules 2–8 n'est pas rédigé et vérifié, et
//   2. la migration 0009 (modèle académique) n'a pas été appliquée en production.
//
// Cet aperçu ne sert qu'à la relecture interne du pilote Marketing Digital v2.
// Il ne remplace pas les formations v1 en production et n'est jamais indexé.

/** Interrupteur maître de l'aperçu interne. Laisser à `false` en dehors de la relecture. */
export const ACADEMIC_PREVIEW_ENABLED = false;

/** Programmes disponibles en aperçu v2 (pilote uniquement pour l'instant). */
export const ACADEMIC_PREVIEW_SLUGS = ["marketing-digital"] as const;
