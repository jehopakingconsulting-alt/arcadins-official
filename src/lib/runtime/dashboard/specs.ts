/**
 * Runtime — Dashboard Étudiant : DeepSpecs & validation (Sprint D).
 */
import type { DashboardIssue, DashboardValidationReport, StudentDashboardState } from "./types.ts";

/** Spécification vivante du dashboard (couverte par les tests). */
export const DASHBOARD_DEEP_SPECS: { id: string; description: string }[] = [
  { id: "D1", description: "Le dashboard n'ajoute aucune logique métier : il agrège les données de A (Runtime), B (Persistence) et C (Player)." },
  { id: "D2", description: "Totalement générique : fonctionne pour Marketing, TEF, TCF, DELF, tout programme (contenu injecté)." },
  { id: "D3", description: "Statistiques : temps total, temps aujourd'hui, score moyen, leçons/modules, badges obtenus/restants." },
  { id: "D4", description: "Progression : globale, hebdomadaire, quotidienne, par module (état + %)." },
  { id: "D5", description: "Résumé : « continuer où j'étais », % global, temps restant estimé, prochain objectif." },
  { id: "D6", description: "Réalisations : badges obtenus vs restants (avec éligibilité)." },
  { id: "D7", description: "Recommandations : continuer, prochaine leçon, à revoir, prochain objectif." },
  { id: "D8", description: "Notifications in-app dérivées (révision, examen prêt, badge, certificat) — jamais d'e-mails." },
  { id: "D9", description: "Calendrier et activité récente construits à partir des événements et du temps d'étude." },
  { id: "D10", description: "Certification : éligibilité + examens disponibles (référence seulement, pas d'Exam Engine)." },
  { id: "D11", description: "Aucune UI React, aucune écriture, aucune migration, aucun Stripe/Auth/Checkout/Webhook." },
];

/** Valide la cohérence d'un état de dashboard (structure et bornes). */
export function validateDashboardState(state: StudentDashboardState): DashboardValidationReport {
  const errors: DashboardIssue[] = [];
  const warnings: DashboardIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  if (!state.programSlug) err("SLUG", "programSlug manquant.");
  const p = state.progress.globalPercent;
  if (p < 0 || p > 100) err("PERCENT", "Progression globale hors bornes 0..100.");
  if (state.statistics.lessonsCompleted > state.statistics.lessonsTotal) err("LESSONS", "Leçons complétées > total.");
  if (state.statistics.modulesPassed > state.statistics.modulesTotal) err("MODULES", "Modules validés > total.");
  if (state.statistics.timeTodaySeconds > state.statistics.timeTotalSeconds)
    warnings.push({ level: "warning", code: "TIME_TODAY", message: "Temps du jour > temps total (incohérence horloge ?)." });

  return { ok: errors.length === 0, errors, warnings };
}
