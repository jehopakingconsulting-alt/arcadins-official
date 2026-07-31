/**
 * Runtime — UI/Exam : barrel (Sprint K3B).
 *
 * Câblage SÉCURISÉ de l'examen final : configuration (définition figée + banque réelle + admissibilité),
 * contrôleur pur (compose le Sprint G, tentative privée en clôture, chronomètre autoritaire, navigation
 * server-autoritaire, idempotence, snapshot/hydrate), tranche de progression dédiée, view models + gardes,
 * i18n minimal. Aucune UI ici. Aucun certificat/badge n'est émis.
 */
export * from "./exam-config.ts";
export * from "./exam-view-models.ts";
export * from "./exam-controller.ts";
export * from "./exam-runtime-store.ts";
export * from "./exam-i18n.ts";
