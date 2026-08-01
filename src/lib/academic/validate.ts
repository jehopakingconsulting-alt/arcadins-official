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

  // 5) Nombre de leçons : au moins 3 par module (module structuré).
  //    Un module « authored » couvrant 3 semaines vise ≥ 4 leçons par semaine (≥ 12).
  for (const m of curriculum.modules) {
    if (m.lessons.length < 3)
      err("LESSON_PER_MODULE", `Module ${m.index} a ${m.lessons.length} leçons (attendu ≥ 3).`);
    const fullyAuthored = m.lessons.length > 0 && m.lessons.every((l) => l.authored);
    if (fullyAuthored && m.lessons.length < 12)
      warn("LESSON_DEPTH", `Module ${m.index} authored mais seulement ${m.lessons.length} leçons (cible ≥ 12).`);
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

  // 11) Contrôles de qualité sur chaque leçon « authored ».
  const forbiddenComingSoon = /(à venir|a venir|coming soon|bientôt disponible)/i;
  // Signaux de fausse reconnaissance officielle / gouvernementale à ne jamais laisser passer.
  const forbiddenRecognition = /(reconnu par le gouvernement|diplôme d'état|accréditation officielle|certifié par le ministère|agréé par l'état)/i;
  // Promesses trompeuses interdites (revenu / emploi garanti, enrichissement).
  const forbiddenPromise = /(emploi garanti|revenu garanti|devenez riche|gains? garantis?|résultats? garantis?|salaire garanti)/i;
  for (const m of curriculum.modules) {
    // Un module « profond » (toutes leçons authored, ≥ 12 leçons) exige étude de cas + activité interactive par leçon.
    const deepModule = m.lessons.length >= 12 && m.lessons.every((l) => l.authored);
    for (const l of m.lessons) {
      if (!l.authored) continue;
      const hasBody = (l.content && l.content.length > 0) || (l.sections && l.sections.length > 0);
      if (!hasBody) err("LESSON_EMPTY", `${l.id} : leçon authored sans contenu (ni content ni sections).`);
      if (!l.objectives || l.objectives.length === 0)
        err("LESSON_NO_OBJECTIVES", `${l.id} : aucun objectif.`);
      // Objectifs reliés à une activité (entraînement/exercice).
      const hasActivity = !!l.activity || (l.interactiveActivities?.length ?? 0) > 0 || !!l.exercise;
      if (!hasActivity) err("LESSON_NO_ACTIVITY", `${l.id} : objectifs sans activité associée.`);
      // Critères de réussite.
      if (!l.successCriteria || l.successCriteria.length === 0)
        err("LESSON_NO_SUCCESS", `${l.id} : critères de réussite manquants.`);
      // Rétroactions (règles de feedback ou feedback d'activité interactive).
      const hasFeedback =
        (l.feedbackRules?.length ?? 0) > 0 || (l.interactiveActivities?.some((a) => !!a.feedback) ?? false);
      if (!hasFeedback) err("LESSON_NO_FEEDBACK", `${l.id} : aucune rétroaction définie.`);
      // Module profond : étude de cas + activité interactive obligatoires.
      if (deepModule) {
        if (!l.caseStudy) err("LESSON_NO_CASE", `${l.id} : étude de cas manquante (module profond).`);
        if ((l.interactiveActivities?.length ?? 0) === 0)
          err("LESSON_NO_IA", `${l.id} : activité interactive manquante (module profond).`);
      }
      // Étude de cas fictive : doit être explicitement identifiée.
      if (l.caseStudy && !l.caseStudy.isFictional)
        err("CASE_NOT_FLAGGED", `${l.id} : étude de cas non identifiée comme fictive (ou témoignage non consenti).`);
      // Aucun contenu « À venir » / fausse reconnaissance / promesse trompeuse dans une leçon authored.
      const blob = [
        ...(l.content ?? []),
        ...((l.sections ?? []).flatMap((s) => s.body)),
        ...(l.caseStudy?.body ?? []),
        l.introduction ?? "",
        l.summary ?? "",
      ].join(" ");
      if (forbiddenComingSoon.test(blob)) err("LESSON_COMING_SOON", `${l.id} : contient un marqueur « À venir » interdit.`);
      if (forbiddenRecognition.test(blob))
        err("LESSON_FAKE_RECOGNITION", `${l.id} : revendication de reconnaissance officielle interdite.`);
      // Une promesse trompeuse n'est admise que comme contre-exemple explicitement encadré.
      if (forbiddenPromise.test(blob) && !/(à éviter|interdit|trompeus|surpromess|non conforme|aucun|sans|jamais|ne (jamais|pas))/i.test(blob))
        err("LESSON_MISLEADING_PROMISE", `${l.id} : promesse trompeuse non encadrée détectée.`);
    }
    // Activités interactives : présence d'une clé de correction et d'un critère de réussite.
    for (const l of m.lessons) {
      for (const ia of l.interactiveActivities ?? []) {
        if (ia.answerKey.length === 0) err("IA_NO_KEY", `${ia.id} : activité interactive sans clé de correction.`);
        if (!ia.successCriterion.trim()) err("IA_NO_SUCCESS", `${ia.id} : activité interactive sans critère de réussite.`);
      }
    }
  }

  // 12) Rubriques : somme des critères = totalPoints.
  for (const m of curriculum.modules) {
    if (!m.rubric) continue;
    const sum = m.rubric.criteria.reduce((acc, c) => acc + c.points, 0);
    if (sum !== m.rubric.totalPoints)
      err("RUBRIC_SUM", `Module ${m.index} : rubrique somme ${sum} ≠ total ${m.rubric.totalPoints}.`);
  }

  // 13) Quiz hebdomadaires : références valides + volume raisonnable (≥ 8).
  for (const m of curriculum.modules) {
    for (const wq of m.weeklyQuizzes ?? []) {
      if (wq.questionIds.length < 8)
        warn("WEEKLY_QUIZ_SIZE", `${wq.id} : ${wq.questionIds.length} questions (cible 8–10).`);
      for (const qid of wq.questionIds) {
        if (!bankIds.has(qid)) err("WEEKLY_QUIZ_REF", `${wq.id} référence une question inconnue : ${qid}.`);
      }
    }
  }

  // 14) Modules profonds « authored » (M2, M3…) : 20 questions, 12 leçons, semaines, continuité, projet, i18n.
  const deepSpecs: { index: number; weeks: number[] }[] = [
    { index: 2, weeks: [4, 5, 6] },
    { index: 3, weeks: [7, 8, 9] },
    { index: 4, weeks: [10, 11, 12] },
    { index: 5, weeks: [13, 14, 15] },
    { index: 6, weeks: [16, 17, 18] },
    { index: 7, weeks: [19, 20, 21] },
    { index: 8, weeks: [22, 23, 24] },
  ];
  for (const spec of deepSpecs) {
    const mod = curriculum.modules.find((m) => m.index === spec.index);
    if (!mod) continue;
    const count = bank.filter((q) => q.module === spec.index).length;
    if (count !== 20) err(`M${spec.index}_QUESTION_COUNT`, `Module ${spec.index} : ${count} questions, attendu exactement 20.`);
    const allAuthored = mod.lessons.length > 0 && mod.lessons.every((l) => l.authored);
    if (allAuthored) {
      if (mod.lessons.length !== 12)
        err(`M${spec.index}_LESSON_COUNT`, `Module ${spec.index} : ${mod.lessons.length} leçons, attendu exactement 12.`);
      for (const wk of spec.weeks) {
        if (!mod.weeks.includes(wk)) err(`M${spec.index}_WEEKS`, `Module ${spec.index} : semaine ${wk} manquante.`);
      }
      if (!mod.links || mod.links.prerequisitesFromPrevious.length === 0)
        err(`M${spec.index}_CONTINUITY`, `Module ${spec.index} : liens pédagogiques avec le module précédent manquants.`);
      // Projet pratique présent.
      if (!mod.assessments.some((a) => a.kind === "practical"))
        err(`M${spec.index}_NO_PROJECT`, `Module ${spec.index} : travail pratique / projet manquant.`);
      // Rubrique à 100 points.
      if (!mod.rubric || mod.rubric.totalPoints !== 100)
        err(`M${spec.index}_RUBRIC_100`, `Module ${spec.index} : rubrique absente ou ≠ 100 points.`);
    }
  }

  // 15) Banque cumulée = 20 × (nombre de modules entièrement authored).
  const authoredModuleCount = curriculum.modules.filter(
    (m) => m.lessons.length > 0 && m.lessons.every((l) => l.authored),
  ).length;
  const expectedBank = authoredModuleCount * 20;
  if (bank.length !== expectedBank)
    err("BANK_TOTAL", `Banque = ${bank.length}, attendu ${expectedBank} (20 × ${authoredModuleCount} modules authored).`);

  // 15b) Cohérence des formules enseignées (nom, expression, exemple présents).
  for (const m of curriculum.modules) {
    for (const l of m.lessons) {
      for (const f of l.formulas ?? []) {
        if (!f.name.trim() || !f.expression.trim() || !f.example.trim())
          err("FORMULA_INCOMPLETE", `${l.id} : formule incomplète (${f.name || "sans nom"}).`);
      }
    }
  }

  // 15c) Examen final (module capstone) : références valides, sans doublon, seuil défini.
  for (const m of curriculum.modules) {
    const fx = m.finalExam;
    if (!fx) continue;
    if (fx.questionIds.length < 60)
      warn("FINAL_EXAM_SIZE", `${fx.id} : ${fx.questionIds.length} questions (cible 60).`);
    const dupFx = firstDuplicate(fx.questionIds);
    if (dupFx) err("FINAL_EXAM_DUP", `${fx.id} : question dupliquée ${dupFx}.`);
    for (const qid of fx.questionIds) {
      if (!bankIds.has(qid)) err("FINAL_EXAM_REF", `${fx.id} référence une question inconnue : ${qid}.`);
    }
    if (fx.passThreshold <= 0 || fx.passThreshold > 100)
      err("FINAL_EXAM_THRESHOLD", `${fx.id} : seuil de réussite invalide.`);
    if (fx.durationMinutes <= 0) err("FINAL_EXAM_DURATION", `${fx.id} : durée invalide.`);
  }

  // 16) Continuité inter-modules : liens pédagogiques cohérents M1 → … → M8.
  for (const idx of [2, 3, 4, 5, 6, 7, 8]) {
    const mod = curriculum.modules.find((m) => m.index === idx);
    if (mod && mod.lessons.every((l) => l.authored)) {
      if (!mod.links || mod.links.deliverablesForNextModule.length === 0)
        warn("LINK_NEXT", `Module ${idx} : livrables pour le module suivant non déclarés.`);
    }
  }

  // 17) Métadonnées i18n / gouvernance (français canonique, pas de traduction « validée » sans relecteur).
  for (const m of curriculum.modules) {
    const cm = m.contentMeta;
    if (!cm) continue;
    if (cm.sourceLang !== "fr") err("META_LANG", `Module ${m.index} : langue source ≠ fr.`);
    if (cm.translationStatus === "validated" && !cm.reviewer)
      err("META_TRANSLATION", `Module ${m.index} : traduction « validated » sans relecteur.`);
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
