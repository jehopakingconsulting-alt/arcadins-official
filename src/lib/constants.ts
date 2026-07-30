/**
 * Barrel de compatibilité.
 *
 * Les données ont été éclatées par domaine dans `src/lib/data/*` (Étape 3 —
 * refonte architecture). Ce fichier réexporte l'ensemble pour ne casser aucun
 * import existant `@/lib/constants`. Les nouveaux modules peuvent importer
 * directement depuis `@/lib/data/<domaine>`.
 */
export { PROGRAMS, PROGRAM_CATEGORIES } from "./data/programs";
export { SLIDES, VIDEOS, TESTIMONIALS, ILLUSTRATIVE_TESTIMONIALS } from "./data/content";
export { TEF_TESTS } from "./data/tef-tests";
export { IMMIGRATION_STEPS, COUNTRIES, PROVINCES } from "./data/immigration";
export { PRICING, PAYMENT_METHODS } from "./data/pricing-plans";
export { ACCREDITATIONS } from "./data/accreditations";
