/**
 * Modèle de contenu académique v2 (24 semaines) — LOT 3.
 *
 * ISOLÉ du modèle v1 (`src/types/lesson.ts` + `src/lib/lessons/*`) : ne remplace ni ne
 * modifie les 8 leçons v1 existantes. Compatible avec le modèle de données de la
 * migration 0009 (program_versions / modules / lessons / assessments / assessment_questions),
 * mais reste ici du contenu en CODE, versionné, non couplé à la base tant que 0009 n'est pas appliquée.
 */

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionType =
  | "mcq" // choix unique
  | "multi" // choix multiple
  | "scenario" // décision appliquée
  | "calc" // calcul simple
  | "interpret" // interprétation de données
  | "analysis"; // analyse de campagne

export type EditorialStatus = "draft" | "review" | "approved";

/** Une question de la banque. `correct` ne doit JAMAIS être exposé au client public. */
export interface BankQuestion {
  id: string; // ex: "mkt-v2-m1-q01"
  module: number; // 1..8
  week: number; // 1..24
  objectiveRef: string; // ex: "C1"
  difficulty: Difficulty;
  type: QuestionType;
  prompt: string;
  options: string[]; // >= 2
  /** Index(es) de la/les bonne(s) réponse(s). PRIVÉ. */
  correct: number[];
  explanation: string;
  feedbackOnError: string;
  tags: string[];
  editorialStatus: EditorialStatus;
}

/** Activité / exercice pratique d'une leçon (compte dans les 20 % « Activités »). */
export interface Activity {
  title: string;
  prompt: string[];
  deliverables: string[];
  estimatedMinutes: number;
}

/** Quiz formatif intégré à une leçon (feedback, non bloquant seul). */
export interface FormativeQuiz {
  id: string;
  questionIds: string[]; // références vers la banque
  passThreshold: number; // 0..100 (indicatif; formatif)
}

export interface LessonV2 {
  id: string; // ex: "mkt-v2-m1-l1"
  title: string;
  objectives: string[];
  /** Contenu rédigé (paragraphes). Vide tant que la leçon n'est pas « authored ». */
  content: string[];
  activity?: Activity;
  quiz?: FormativeQuiz;
  keyTakeaways: string[];
  authored: boolean; // true seulement quand le contenu profond est rédigé et vérifié
}

/** Évaluation sommative rattachée à un module. */
export interface SummativeAssessment {
  id: string;
  kind: "summative" | "practical" | "midterm" | "final_project" | "final_exam";
  title: string;
  /** Seuil de réussite en % (ex: 70 sommatif, 60 projet/examen). */
  passThreshold: number;
  /** Poids relatif dans sa catégorie de pondération. */
  weightHint: string;
}

export interface ModuleV2 {
  index: number; // 1..8
  title: string;
  weeks: [number, number, number]; // 3 semaines
  summary: string;
  competencies: string[]; // ex: ["C1","C2","C3"]
  lessons: LessonV2[];
  assessments: SummativeAssessment[];
}

/** Pondération globale (doit sommer à 100). */
export interface GradingWeights {
  activities: number;
  moduleQuizzes: number;
  practicals: number;
  finalProject: number;
  finalExam: number;
}

export interface ProgramCurriculumV2 {
  slug: string; // "marketing-digital"
  programVersion: string; // "v2"
  title: string;
  totalWeeks: number; // 24
  passingScore: number; // 70 (v2)
  weights: GradingWeights;
  modules: ModuleV2[]; // 8
  /** Toutes les compétences de sortie C1..Cn couvertes par le cursus. */
  exitCompetencies: string[];
}
