/**
 * Interrupteurs de LANCEMENT (Release Candidate).
 * Réactivables par variable d'environnement sans changement de code — pensés pour
 * les « fast-follow » post-lancement.
 */

/**
 * Sélecteur multilingue (EN/ES) dans l'UI. DÉSACTIVÉ au lancement : le contenu
 * long (blog, tcf, à-propos, guide, mentions légales) n'est pas encore traduit,
 * donc on lance en français d'abord et on masque le sélecteur pour ne pas promettre
 * des langues incomplètes. Réactiver (=> "true") une fois la localisation EN/ES finie.
 */
export const MULTILANG_SWITCHER_ENABLED =
  process.env.NEXT_PUBLIC_MULTILANG_SWITCHER === "true";
