/**
 * Runtime — UI : mappers domaine → view model (Sprint J).
 *
 * Transforment les sorties PUBLIQUES des moteurs/services en view models stables. N'INTRODUISENT jamais de
 * donnée privée ; chaque sortie est vérifiée par la garde de sécurité (`ensureClean`). Aucune logique métier
 * (score/déblocage/admissibilité) n'est recalculée ici.
 */
import type { AssessmentSession, PublicQuestion } from "../assessment/types.ts";
import type { StudentDashboardView } from "../server/student-dashboard-query-service.ts";
import type {
  AssessmentViewModel,
  PublicQuestionViewModel,
  StudentDashboardViewModel,
  StudentIdentityViewModel,
  ProgramOverviewViewModel,
} from "./view-models.ts";
import type { PublicQuestionKind } from "./types.ts";
import { validateViewModel } from "./validation.ts";

/** Vérifie qu'un view model ne fuit aucune donnée privée avant de le rendre disponible à React. */
export function ensureClean<T>(vm: T): T {
  const report = validateViewModel(vm);
  if (!report.ok) throw new Error(`UI_VIEW_MODEL_LEAK:${report.issues.join(",")}`);
  return vm;
}

function mapQuestionKind(type: PublicQuestion["type"]): PublicQuestionKind {
  switch (type) {
    case "multiple": return "multiple";
    case "true_false": return "true_false";
    case "short_answer": return "short_answer";
    case "matching": return "matching";
    case "ordering": return "ordering";
    case "structured_text": case "file_reference": return "case";
    default: return "single";
  }
}

/** AssessmentSession (publique, déjà sans barème) → AssessmentViewModel. */
export function toAssessmentViewModel(session: AssessmentSession): AssessmentViewModel {
  const questions: PublicQuestionViewModel[] = session.publicQuestions.map((q) => ({
    questionId: q.id,
    kind: mapQuestionKind(q.type),
    prompt: q.prompt,
    options: q.options ? q.options.map((o) => ({ id: o.id, label: o.label })) : undefined,
    points: q.points,
  }));
  return ensureClean({
    assessmentId: session.assessmentId,
    attemptId: session.attemptId,
    questions,
    answered: session.progress.answered,
    total: session.progress.total,
    currentIndex: session.navigationState.currentIndex,
  });
}

function initialsOf(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase() ?? "").join("") || "?";
}

export function toIdentityViewModel(displayName: string): StudentIdentityViewModel {
  return { displayName, initials: initialsOf(displayName), demo: true };
}

/** StudentDashboardView (Sprint I, read-only) → StudentDashboardViewModel (partiel : champs disponibles). */
export function toDashboardViewModel(view: StudentDashboardView, identity: StudentIdentityViewModel, program: ProgramOverviewViewModel | null): Partial<StudentDashboardViewModel> {
  return ensureClean({
    identity,
    program,
    overallPercent: view.overallPercent,
    currentModuleTitle: null,
    nextLessonTitle: view.nextLessonId,
    totalStudyMinutes: Math.round(view.totalTimeSeconds / 60),
    averageScorePercent: view.assessments.length > 0 ? Math.round(view.assessments.reduce((a, s) => a + s.percentage, 0) / view.assessments.length) : null,
    badges: view.badges.map((b) => ({ badgeDefinitionId: b.publicVerificationId, titleKey: "badge.generic.title", descriptionKey: "badge.generic.desc", obtained: b.status === "active", criteriaKey: "badge.generic.criteria", obtainedAt: null, progressPercent: b.status === "active" ? 100 : 0 })),
    credentials: view.credentials.map((c) => ({ publicVerificationIdMasked: maskId(c.publicVerificationId), documentTitle: "Attestation de réussite ARCADINS", status: c.status as "active", issuedAt: null, version: 1, replacementReference: null })),
    recentActivity: view.recentActivity.map((a, i) => ({ id: `act-${i}`, type: a.type, at: a.at, labelKey: `activity.${a.type}` })),
  });
}

/** Masque un identifiant public (n'affiche que les extrémités). */
export function maskId(id: string): string {
  if (id.length <= 6) return "••••";
  return `${id.slice(0, 3)}••••${id.slice(-2)}`;
}
