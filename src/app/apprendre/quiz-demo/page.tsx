import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEARNING_EXPERIENCE_ENABLED } from "@/lib/config/experience-flags";
import QuizPlayer from "@/components/learn/assessment/QuizPlayer";
import { demoQuiz } from "@/lib/assessment-ui/demo";

/**
 * /apprendre/quiz-demo — démonstration du lecteur d'évaluation universel (S5).
 * Questions PUBLIQUES uniquement ; la correction réelle est faite CÔTÉ SERVEUR par
 * AssessmentEngine (branché en S6). Flag-gated : 404 en prod. noindex.
 */
export const metadata: Metadata = { title: "Évaluation | ARCADINS", robots: { index: false } };

export default function QuizDemoPage() {
  if (!LEARNING_EXPERIENCE_ENABLED) notFound();
  return <QuizPlayer assessment={demoQuiz} />;
}
