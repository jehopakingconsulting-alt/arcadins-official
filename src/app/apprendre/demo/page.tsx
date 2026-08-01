import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEARNING_EXPERIENCE_ENABLED } from "@/lib/config/experience-flags";
import LessonPlayer from "@/components/learn/experience/LessonPlayer";
import { demoLesson } from "@/lib/lesson-runtime/demo";

/**
 * /apprendre/demo — démonstration du lecteur de leçon universel (S4). Flag-gated :
 * 404 en prod. Générique : rendra n'importe quelle leçon issue du curriculum à
 * l'activation (S+). noindex (surface interne).
 */
export const metadata: Metadata = { title: "Lecteur de leçon | ARCADINS", robots: { index: false } };

export default function LessonDemoPage() {
  if (!LEARNING_EXPERIENCE_ENABLED) notFound();
  return <LessonPlayer model={demoLesson} />;
}
