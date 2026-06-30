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

export interface Lesson {
  title: string;
  objectives: string[];
  content: string[];
  keyTakeaways: string[];
  resources: LessonResource[];
  quiz: QuizQuestion[];
}

export type CourseLessons = Record<string, Lesson[]>;

export const PASSING_SCORE = 65;
