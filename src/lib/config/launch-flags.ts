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

/**
 * Achat self-service des Programmes officiels (TEF & TCF Canada) : checkout Stripe
 * → webhook → inscription automatique → déblocage. DÉSACTIVÉ par défaut : ne s'active
 * que lorsque (1) les secrets Stripe/Supabase sont configurés, (2) la migration
 * commerciale est appliquée en prod, (3) le parcours est vérifié en mode test Stripe.
 * Tant qu'il est OFF, les pages /tef et /tcf conservent leur comportement actuel —
 * AUCUN checkout partiel n'est exposé en production. Côté serveur uniquement.
 */
export const PROGRAM_CHECKOUT_ENABLED =
  process.env.PROGRAM_CHECKOUT_ENABLED === "true";

/**
 * Miroir CÔTÉ CLIENT du commerce self-service, pour l'affichage des CTA (UI seulement).
 * La sécurité reste gérée par le flag serveur PROGRAM_CHECKOUT_ENABLED (routes/webhook).
 * DÉSACTIVÉ par défaut : tant qu'il est OFF, les pages /tef /tcf gardent leurs CTA actuels.
 */
export const PROGRAM_CHECKOUT_UI_ENABLED =
  process.env.NEXT_PUBLIC_PROGRAM_CHECKOUT_ENABLED === "true";
