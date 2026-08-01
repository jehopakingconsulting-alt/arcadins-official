/**
 * Runtime — Certification Authority : barrel (Sprint K4A).
 *
 * Frontière d'AUTORITÉ unique + contrats préparatoires du futur moteur de certification (K4B+). N'ÉMET RIEN :
 * aucun certificat/badge/PDF/QR/signature. Tous les flags restent false. Neutralise la voie legacy d'émission.
 */
export * from "./flags.ts";
export * from "./authority-types.ts";
export * from "./handoff-contract.ts";
export * from "./authority-state-machine.ts";
export * from "./policy-registry.ts";
export * from "./id-generator.ts";
export * from "./integrity.ts";
export * from "./repositories.ts";
export * from "./audit.ts";
export * from "./errors.ts";
export * from "./legacy-emission-gate.ts";
export * from "./authorization-service.ts";
export * from "./view-models.ts";
