export interface LessonResource {
  label: string;
  url: string;
}

export interface Lesson {
  title: string;
  objectives: string[];
  content: string[];
  keyTakeaways: string[];
  resources: LessonResource[];
}

export type CourseLessons = Record<string, Lesson[]>;
