/**
 * ARCADINS — Moteur d'ANALYTIQUE d'apprentissage (System 6). PUR / déterministe /
 * node-testable. Aucune I/O : le tableau de bord admin mappe les lignes de base
 * (program_enrollments, enrollments, program_purchase_events, credentials…) vers ces
 * enregistrements normalisés, puis appelle computeLearningAnalytics().
 *
 * Architecture propre : moteur pur + adaptateurs de données. Aucune dépendance UI/DB.
 */

export interface SaleRecord {
  program: string;
  amountCents: number;
  currency: string;
  at: string; // ISO
}
export interface EnrollmentRecord {
  program: string;
  userId: string;
  status: string; // 'active' | 'suspended' | 'expired' | 'refunded' | 'pending'
  at: string;
}
export interface CompletionRecord {
  program: string;
  userId: string;
  percent: number; // 0..100
  completed: boolean;
}
export interface ExamRecord {
  program: string;
  passed: boolean;
  score: number; // 0..100
}
export interface CertificateRecord {
  program: string;
}

export interface AnalyticsInput {
  sales: SaleRecord[];
  enrollments: EnrollmentRecord[];
  completions: CompletionRecord[];
  exams: ExamRecord[];
  certificates: CertificateRecord[];
}

export interface ProgramBreakdown {
  program: string;
  enrollments: number;
  revenueCents: number;
}

export interface LearningAnalytics {
  /** Revenu total par devise (cents). */
  revenueByCurrency: Record<string, number>;
  salesCount: number;
  enrollmentsCount: number;
  /** Étudiants uniques avec au moins une inscription active. */
  activeStudents: number;
  /** % d'inscriptions terminées (completed / total avec progression). */
  completionRatePct: number;
  /** Progression moyenne (0..100). */
  avgProgressPct: number;
  /** % d'inscriptions abandonnées (expirées/suspendues sans complétion). */
  dropoutRatePct: number;
  /** Programmes triés par nombre d'inscriptions (desc). */
  topPrograms: ProgramBreakdown[];
  examPassRatePct: number;
  avgExamScore: number;
  certificatesIssued: number;
}

function pct(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 1000) / 10; // 1 décimale
}

/** Calcule l'ensemble des métriques d'apprentissage (déterministe, sans I/O). */
export function computeLearningAnalytics(input: AnalyticsInput): LearningAnalytics {
  const revenueByCurrency: Record<string, number> = {};
  for (const s of input.sales) {
    revenueByCurrency[s.currency] = (revenueByCurrency[s.currency] ?? 0) + s.amountCents;
  }

  const activeUsers = new Set<string>();
  const byProgram = new Map<string, { enrollments: number; revenueCents: number }>();
  for (const e of input.enrollments) {
    if (e.status === "active") activeUsers.add(e.userId);
    const b = byProgram.get(e.program) ?? { enrollments: 0, revenueCents: 0 };
    b.enrollments += 1;
    byProgram.set(e.program, b);
  }
  for (const s of input.sales) {
    const b = byProgram.get(s.program) ?? { enrollments: 0, revenueCents: 0 };
    b.revenueCents += s.amountCents;
    byProgram.set(s.program, b);
  }

  const withProgress = input.completions.length;
  const completed = input.completions.filter((c) => c.completed).length;
  const avgProgress = withProgress
    ? Math.round((input.completions.reduce((sum, c) => sum + c.percent, 0) / withProgress) * 10) / 10
    : 0;

  // Abandon : inscriptions expirées/suspendues qui ne sont pas terminées.
  const completedUsers = new Set(input.completions.filter((c) => c.completed).map((c) => `${c.userId}:${c.program}`));
  const droppable = input.enrollments.filter((e) => e.status === "expired" || e.status === "suspended");
  const dropped = droppable.filter((e) => !completedUsers.has(`${e.userId}:${e.program}`)).length;

  const examsPassed = input.exams.filter((x) => x.passed).length;
  const avgScore = input.exams.length
    ? Math.round((input.exams.reduce((sum, x) => sum + x.score, 0) / input.exams.length) * 10) / 10
    : 0;

  const topPrograms: ProgramBreakdown[] = [...byProgram.entries()]
    .map(([program, b]) => ({ program, enrollments: b.enrollments, revenueCents: b.revenueCents }))
    .sort((a, b) => b.enrollments - a.enrollments || b.revenueCents - a.revenueCents);

  return {
    revenueByCurrency,
    salesCount: input.sales.length,
    enrollmentsCount: input.enrollments.length,
    activeStudents: activeUsers.size,
    completionRatePct: pct(completed, withProgress),
    avgProgressPct: avgProgress,
    dropoutRatePct: pct(dropped, input.enrollments.length),
    topPrograms,
    examPassRatePct: pct(examsPassed, input.exams.length),
    avgExamScore: avgScore,
    certificatesIssued: input.certificates.length,
  };
}
