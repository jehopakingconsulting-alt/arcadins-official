/**
 * Runtime — couche Persistence : point d'entrée (barrel), Sprint B.
 *
 * Mémorisation de l'état du cerveau (Sprint A) : instantanés versionnés, adapters (local / web-storage / mobile /
 * supabase injecté), repositories, sync/offline/conflits, autosave, heartbeat. PURE, aucune UI,
 * aucune migration, aucune base modifiée.
 */
export * from "./types.ts";
export * from "./serializer.ts";
export * from "./hydration.ts";
export * from "./adapters.ts";
export * from "./repositories.ts";
export * from "./sync.ts";
export * from "./runtime-persistence.ts";
export * from "./specs.ts";
