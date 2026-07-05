export interface LessonResource {
  label: string;
  url: string;
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

/** A worked, real-world case study that illustrates the module's concepts. */
export interface CaseStudy {
  title: string;
  body: string[];
}

/** A hands-on exercise the learner completes and submits, beyond the quiz. */
export interface PracticalExercise {
  title: string;
  /** Context + step-by-step instructions, as paragraphs. */
  prompt: string[];
  /** Concrete deliverables / checklist the learner must produce. */
  deliverables: string[];
}

export interface Lesson {
  title: string;
  objectives: string[];
  content: string[];
  /** Optional during the enrichment rollout; becomes standard on enriched modules. */
  caseStudy?: CaseStudy;
  exercise?: PracticalExercise;
  keyTakeaways: string[];
  resources: LessonResource[];
  quiz: QuizQuestion[];
}

export type CourseLessons = Record<string, Lesson[]>;

export const PASSING_SCORE = 65;
