import type { BankQuestion, ProgramCurriculumV2 } from "@/lib/academic/types";

export interface ValidationIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}

export interface ValidationReport {
  ok: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  stats: {
    modules: number;
    lessons: number;
    authoredLessons: number;
    weeksCovered: number;
    bankQuestions: number;
    weightsSum: number;
  };
}

/**
 * Moteur de validation du cursus v2 + banque de questions.
 * Vérifie les invariants structurels (garde-fous) sans toucher à la base ni au v1.
 */
export function validateCurriculum(
  curriculum: ProgramCurriculumV2,
  bank: BankQuestion[],
): ValidationReport {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  const err = (code: string, message: string) => errors.push({ level: "error", code, message });
  const warn = (code: string, message: string) => warnings.push({ level: "warning", code, message });

  // 1) Pondération = 100.
  const w = curriculum.weights;
  const weightsSum = w.activities + w.moduleQuizzes + w.practicals + w.finalProject + w.finalExam;
  if (weightsSum !== 100) err("WEIGHTS_SUM", `La pondération somme à ${weightsSum}, attendu 100.`);

  // 2) 8 modules.
  if (curriculum.modules.length !== 8) err("MODULE_COUNT", `${curriculum.modules.length} modules, attendu 8.`);

  // 3) Semaines : couverture 1..24 sans trou ni doublon.
  const weeks = curriculum.modules.flatMap((m) => m.weeks);
  const weekSet = new Set(weeks);
  if (weeks.length !== weekSet.size) err("WEEK_DUP", "Semaines dupliquées entre modules.");
  for (let wk = 1; wk <= curriculum.totalWeeks; wk++) {
    if (!weekSet.has(wk)) err("WEEK_GAP", `Semaine ${wk} non couverte.`);
  }
  if (weekSet.size !== curriculum.totalWeeks)
    err("WEEK_COUNT", `${weekSet.size} semaines couvertes, attendu ${curriculum.totalWeeks}.`);

  // 4) Identifiants de leçons uniques.
  const lessonIds = curriculum.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const dupLesson = firstDuplicate(lessonIds);
  if (dupLesson) err("LESSON_ID_DUP", `Identifiant de leçon dupliqué : ${dupLesson}.`);

  // 5) 3–5 leçons par module.
  for (const m of curriculum.modules) {
    if (m.lessons.length < 3 || m.lessons.length > 5)
      err("LESSON_PER_MODULE", `Module ${m.index} a ${m.lessons.length} leçons (attendu 3–5).`);
  }

  // 6) Banque : ids uniques.
  const dupQ = firstDuplicate(bank.map((q) => q.id));
  if (dupQ) err("QUESTION_ID_DUP", `Identifiant de question dupliqué : ${dupQ}.`);

  // 7) Intégrité de chaque question.
  for (const q of bank) {
    if (q.options.length < 2) err("Q_OPTIONS", `${q.id} : moins de 2 options.`);
    if (q.correct.length < 1) err("Q_NO_CORRECT", `${q.id} : aucune bonne réponse définie.`);
    for (const c of q.correct) {
      if (c < 0 || c >= q.options.length) err("Q_CORRECT_RANGE", `${q.id} : index de réponse hors bornes.`);
    }
    if (q.type === "mcq" && q.correct.length !== 1)
      err("Q_MCQ_SINGLE", `${q.id} : une question mcq doit avoir exactement 1 bonne réponse.`);
    if (!q.explanation.trim()) warn("Q_NO_EXPLANATION", `${q.id} : explication vide.`);
  }

  // 8) Les quiz référencent des questions existantes.
  const bankIds = new Set(bank.map((q) => q.id));
  for (const m of curriculum.modules) {
    for (const l of m.lessons) {
      for (const qid of l.quiz?.questionIds ?? []) {
        if (!bankIds.has(qid)) err("QUIZ_REF", `${l.id} référence une question inconnue : ${qid}.`);
      }
    }
  }

  // 9) Alignement objectif ↔ cursus : chaque question doit référencer une compétence du cursus.
  const competencySet = new Set(curriculum.exitCompetencies);
  for (const q of bank) {
    if (!competencySet.has(q.objectiveRef))
      err("Q_OBJECTIVE", `${q.id} référence une compétence hors cursus : ${q.objectiveRef}.`);
  }

  // 10) Couverture : chaque module authored doit avoir ≥ 20 questions dans la banque (cible).
  const authoredModules = new Set(
    curriculum.modules.filter((m) => m.lessons.every((l) => l.authored)).map((m) => m.index),
  );
  for (const mod of authoredModules) {
    const count = bank.filter((q) => q.module === mod).length;
    if (count < 20) warn("BANK_COVERAGE", `Module ${mod} authored mais ${count}/20 questions dans la banque.`);
  }

  const lessons = lessonIds.length;
  const authoredLessons = curriculum.modules.flatMap((m) => m.lessons).filter((l) => l.authored).length;

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    stats: {
      modules: curriculum.modules.length,
      lessons,
      authoredLessons,
      weeksCovered: weekSet.size,
      bankQuestions: bank.length,
      weightsSum,
    },
  };
}

function firstDuplicate(values: string[]): string | null {
  const seen = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) return v;
    seen.add(v);
  }
  return null;
}
