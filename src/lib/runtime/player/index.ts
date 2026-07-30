/**
 * Runtime — Learning Player : point d'entrée (barrel), Sprint C.
 *
 * Couche de contrôleurs + interfaces injectables du Player. PURE, aucune UI React, aucune migration,
 * aucune DB. Consomme le Runtime (Sprint A) et la Persistence (Sprint B).
 */
export * from "./types.ts";
export * from "./media.ts";
export * from "./renderer.ts";
export * from "./controllers.ts";
export * from "./player-hooks.ts";
export * from "./player.ts";
export * from "./specs.ts";
