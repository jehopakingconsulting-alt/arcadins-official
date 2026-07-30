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
  | "truefalse" // vrai ou faux raisonné
  | "ranking" // classement / ordonnancement
  | "association" // appariement
  | "scenario" // décision appliquée
  | "calc" // calcul simple
  | "interpret" // interprétation de données
  | "analysis"; // analyse de campagne (identification d'erreur, meilleur message…)

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

/** Une définition de glossaire / terme clé. */
export interface GlossaryTerm {
  term: string;
  definition: string;
}

/** Encadré « Erreur fréquente ». */
export interface CommonError {
  title: string;
  body: string;
}

/** Étude de cas rattachée à une leçon. Toujours identifiée comme fictive si elle l'est. */
export interface LessonCaseStudy {
  title: string;
  /** "québécoise" | "canadienne" | "internationale" | "erreur-positionnement" ... */
  region: string;
  body: string[];
  /** true = entreprise fictive utilisée à des fins pédagogiques (jamais présentée comme réelle). */
  isFictional: boolean;
}

/** Une section logique de contenu à l'intérieur d'une leçon. */
export interface LessonSection {
  heading: string;
  body: string[];
}

/**
 * Activité interactive avec correction (classement, identification d'erreur, appariement…).
 * Autonome par rapport au quiz : sert à l'entraînement guidé.
 */
export interface InteractiveActivity {
  id: string;
  title: string;
  objective: string;
  instructions: string[];
  /** Grille / clé de correction (réponse attendue expliquée). */
  answerKey: string[];
  feedback: string;
  successCriterion: string;
}

/** Une règle de rétroaction conditionnelle (selon la performance au quiz). */
export interface FeedbackRule {
  /** ex: "score >= 70", "score < 50" */
  condition: string;
  message: string;
}

/** Une formule / indicateur enseigné (ex. CTR, CPC, ROAS), avec un exemple chiffré simulé. */
export interface Formula {
  name: string; // ex: "CTR"
  expression: string; // ex: "clics / impressions × 100"
  example: string; // ex: "(50 / 5000) × 100 = 1 % — jeu de données pédagogique fictif"
}

/** Quiz formatif intégré à une leçon (feedback, non bloquant seul). */
export interface FormativeQuiz {
  id: string;
  questionIds: string[]; // références vers la banque
  passThreshold: number; // 0..100 (indicatif; formatif)
}

/**
 * Examen final d'un programme : sélection depuis la banque cumulée, corrigée côté serveur.
 * Générique (réutilisable pour tout programme : marketing, TEF, TCF, DELF…).
 */
export interface FinalExam {
  id: string;
  title: string;
  /** Sélection de questions (références vers la banque). La correction reste serveur. */
  questionIds: string[];
  durationMinutes: number;
  passThreshold: number; // en % (ex: 60)
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

  // ─── Champs enrichis (optionnels ; utilisés par les modules « authored » riches) ───
  module?: number;
  week?: number;
  introduction?: string;
  competencies?: string[];
  prerequisites?: string[];
  durationMinutes?: number;
  /** Contenu structuré en sections (alternative/complément à `content`). */
  sections?: LessonSection[];
  definitions?: GlossaryTerm[];
  examples?: string[];
  commonError?: CommonError;
  caseStudy?: LessonCaseStudy;
  /** Exercice pratique noté (distinct des activités interactives). */
  exercise?: Activity;
  interactiveActivities?: InteractiveActivity[];
  /** Encadré « Point de vigilance » (éthique, conformité, pièges). */
  vigilancePoint?: CommonError;
  /** Formules / indicateurs enseignés (ex. CTR, CPC, ROAS). */
  formulas?: Formula[];
  successCriteria?: string[];
  resources?: string[];
  glossary?: GlossaryTerm[];
  summary?: string;
  selfAssessment?: string[];
  feedbackRules?: FeedbackRule[];
  progressionRule?: string;
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

/** Un critère de rubrique de correction. */
export interface RubricCriterion {
  label: string;
  points: number;
}

/** Rubrique de correction d'un travail pratique / projet. */
export interface Rubric {
  id: string;
  title: string;
  totalPoints: number; // doit égaler la somme des critères
  passThreshold: number; // en % (ex: 60)
  criteria: RubricCriterion[];
}

/**
 * Métadonnées de contenu pour l'internationalisation et la gouvernance éditoriale.
 * Le français est la langue canonique ; aucune traduction n'est « validée » sans relecture.
 */
export interface ContentMeta {
  sourceLang: "fr";
  /** Statut de traduction de ce contenu (source = original FR). */
  translationStatus: "source" | "pending" | "in_review" | "validated";
  version: string; // ex: "1.0.0"
  revisionDate: string; // ISO ex: "2026-07-30"
  reviewer: string | null; // null tant qu'aucune relecture n'a eu lieu
  editorialStatus: EditorialStatus;
}

/** Liens pédagogiques explicites entre modules (continuité du cursus). */
export interface PedagogicalLinks {
  prerequisitesFromPrevious: string[];
  consolidatedCompetencies: string[];
  newCompetencies: string[];
  deliverablesForNextModule: string[];
}

export interface ModuleV2 {
  index: number; // 1..8
  title: string;
  weeks: [number, number, number]; // 3 semaines
  summary: string;
  competencies: string[]; // ex: ["C1","C2","C3"]
  lessons: LessonV2[];
  assessments: SummativeAssessment[];

  // ─── Champs enrichis (optionnels) ───
  introduction?: string;
  /** Quiz formatifs hebdomadaires (1 par semaine). */
  weeklyQuizzes?: FormativeQuiz[];
  /** Rubrique du travail pratique / projet du module. */
  rubric?: Rubric;
  links?: PedagogicalLinks;
  /** Métadonnées i18n / gouvernance éditoriale. */
  contentMeta?: ContentMeta;
  /** Examen final du programme (module de synthèse uniquement). */
  finalExam?: FinalExam;
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
