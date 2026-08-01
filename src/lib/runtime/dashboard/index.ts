/**
 * Runtime — Dashboard Étudiant : point d'entrée (barrel), Sprint D.
 *
 * Couche d'agrégation LECTURE SEULE : consomme Runtime (A) + Persistence (B) + Player (C).
 * Aucune UI, aucune logique métier nouvelle, aucune migration, aucune DB. Générique.
 */
export * from "./types.ts";
export * from "./controllers.ts";
export * from "./state.ts";
export * from "./hooks.ts";
export * from "./factories.ts";
export * from "./specs.ts";
