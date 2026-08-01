/**
 * Runtime — Certification, Credentials & Badges Engine : point d'entrée (barrel), Sprint H.
 *
 * Moteur générique et SÉCURISÉ de certification interne d'ARCADINS. Attestations / certificats / badges VÉRIFIABLES
 * à partir d'un ExamResultContract finalisé (Sprint G). Correction/décision serveur, identifiants opaques, payload
 * public minimal, hash déterministe + signature injectée, idempotence, dédoublonnage, audit. Aucune UI, aucune base,
 * aucun réseau, aucun PDF, aucune image QR, aucun LLM. Flag `CERTIFICATION_ENGINE_ENABLED = false`.
 */
export * from "./types.ts";
export * from "./config.ts";
export * from "./credential-policy-registry.ts";
export * from "./certification-eligibility-engine.ts";
export * from "./credential-id-generator.ts";
export * from "./credential-snapshot-builder.ts";
export * from "./credential-integrity-engine.ts";
export * from "./public-credential-serializer.ts";
export * from "./verification-engine.ts";
export * from "./qr-verification-payload.ts";
export * from "./credential-status-engine.ts";
export * from "./credential-issuance-engine.ts";
export * from "./credential-replacement-engine.ts";
export * from "./credential-revocation-engine.ts";
export * from "./credential-appeal-workflow.ts";
export * from "./badge-engine.ts";
export * from "./credential-version-manager.ts";
export * from "./credential-audit-events.ts";
export * from "./credential-hooks.ts";
export * from "./repository-contracts.ts";
export * from "./in-memory-repository.ts";
export * from "./credential-document-model.ts";
export * from "./certification-engine.ts";
export * from "./validation.ts";
export * from "./specs.ts";
