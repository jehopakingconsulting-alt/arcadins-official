import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ACADEMIC_PREVIEW_ENABLED } from "@/lib/academic/preview-config";
import { StudentLearningShell, type StudentPreviewBundle } from "@/components/learn/StudentLearningShell";
import {
  demoAssessment, demoAssessmentResult, demoBadges, demoBookmarks, demoCalendar, demoCredentials,
  demoDashboard, demoJourney, demoLesson, demoNotes, demoProgress,
} from "@/lib/runtime/ui/demo-data";

export const metadata: Metadata = {
  title: "Aperçu expérience étudiante (interne) — ARCADINS",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Aperçu INTERNE et NON PUBLIC de l'expérience étudiante (Sprint J).
 * Double garde : flag `ACADEMIC_PREVIEW_ENABLED` + zone `/admin` (RBAC appliqué par le layout admin).
 * Données ENTIÈREMENT FICTIVES (démonstration). Aucune donnée réelle, aucune écriture, aucune API académique
 * réelle, aucun certificat réel. `noindex, nofollow, nocache`.
 */
export default function StudentExperiencePreviewPage() {
  if (!ACADEMIC_PREVIEW_ENABLED) notFound();

  const bundle: StudentPreviewBundle = {
    dashboard: demoDashboard(),
    calendar: demoCalendar(),
    journey: demoJourney(),
    lesson: demoLesson(),
    notes: demoNotes(),
    bookmarks: demoBookmarks(),
    assessment: demoAssessment(),
    assessmentResult: demoAssessmentResult(),
    progress: demoProgress(),
    credentials: demoCredentials(),
    badges: demoBadges(),
  };

  return <StudentLearningShell bundle={bundle} />;
}
