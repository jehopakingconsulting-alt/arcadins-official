/**
 * Runtime — Integration : point d'entrée (barrel), Sprint I.
 *
 * Couche serveur générique et sécurisée reliant les moteurs académiques (A–H) à une persistance Supabase.
 * Aucune écriture directe par le navigateur. Flag `ACADEMIC_PERSISTENCE_ENABLED = false`.
 */
export * from "./config.ts";
export * from "./types.ts";
export * from "./errors.ts";
export * from "./request-context.ts";
export * from "./authorization-service.ts";
export * from "./idempotency-service.ts";
export * from "./concurrency-service.ts";
export * from "./transaction-manager.ts";
export * from "./rate-limit-service.ts";
export * from "./audit-service.ts";
export * from "./observability.ts";
