import type { CourseLessons } from "@/types/lesson";
import { marketingDigitalLessons } from "./marketing-digital";
import { informatiqueLessons } from "./informatique";
import { francaisAffairesLessons } from "./francais-affaires";
import { entrepreneuriatLessons } from "./entrepreneuriat";
import { financeLessons } from "./finance";
import { rhLessons } from "./rh";
import { tourismeLessons } from "./tourisme";
import { anglaisCommercialLessons } from "./anglais-commercial";
import { relationAideLessons } from "./relation-aide";

export const COURSE_LESSONS: CourseLessons = {
  "marketing-digital": marketingDigitalLessons,
  "informatique": informatiqueLessons,
  "francais-affaires": francaisAffairesLessons,
  "entrepreneuriat": entrepreneuriatLessons,
  "finance": financeLessons,
  "rh": rhLessons,
  "tourisme": tourismeLessons,
  "anglais-commercial": anglaisCommercialLessons,
  "relation-aide": relationAideLessons,
};

export function getLessonsForCourse(slug: string) {
  return COURSE_LESSONS[slug] || [];
}
