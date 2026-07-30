/**
 * Runtime étudiant — configuration (Sprint A).
 *
 * ⚠️ Le runtime est DÉSACTIVÉ par défaut. Aucune UI, aucune écriture base, aucune migration.
 * Ce module ne contient que des constantes pures, réutilisables pour tout programme (marketing, TEF, TCF, DELF…).
 */

/** Interrupteur maître du runtime étudiant. Laisser à `false` tant que l'UI et la base ne sont pas prêtes. */
export const LEARNING_RUNTIME_ENABLED = false;

/** Seuils de réussite (version académique v2). Découplés du scoring v1 (65 %). */
export const RUNTIME_THRESHOLDS = {
  /** Quiz formatif de leçon : score de réussite indicatif. */
  lessonQuizPass: 70,
  /** Sommatif de module : requis pour débloquer le module suivant. */
  summativePass: 70,
  /** Projet / travail pratique et examen final : plancher. */
  practicalMinPass: 60,
  /** Note globale du programme. */
  globalPass: 70,
} as const;

/** Paramètres de suivi du temps. */
export const RUNTIME_TIME = {
  /** Fréquence conseillée des heartbeats (secondes) — indicatif pour l'UI future. */
  heartbeatIntervalSeconds: 30,
  /** Plafond raisonnable par heartbeat pour éviter les valeurs aberrantes. */
  maxSecondsPerHeartbeat: 120,
} as const;
