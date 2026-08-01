/**
 * ARCADINS — Drapeaux de la nouvelle Expérience d'Apprentissage (V3).
 * Tout OFF par défaut : les nouvelles routes vitrine/produit renvoient 404 en prod
 * tant que la validation staging (S9) n'est pas passée. Aucune activation prod ici.
 */
export const LEARNING_EXPERIENCE_ENABLED =
  process.env.NEXT_PUBLIC_LEARNING_EXPERIENCE_ENABLED === "true";
