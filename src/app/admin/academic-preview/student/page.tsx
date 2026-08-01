import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ACADEMIC_PREVIEW_ENABLED } from "@/lib/academic/preview-config";
import { marketingDigitalV2 } from "@/lib/academic/marketing-digital-v2";
import { StudentLearningShell } from "@/components/learn/StudentLearningShell";
import { buildAcademicStudentBundle } from "@/lib/runtime/ui/academic-preview";
import { ensureClientSafePayload } from "@/lib/runtime/ui/security/ensure-client-safe";

export const metadata: Metadata = {
  title: "Aperçu expérience étudiante (interne) — ARCADINS",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Aperçu INTERNE et NON PUBLIC de l'expérience étudiante (Sprint J + K1).
 * Double garde : flag `ACADEMIC_PREVIEW_ENABLED` + zone `/admin` (RBAC appliqué par le layout admin).
 * Le PARCOURS, le LECTEUR et la PROGRESSION proviennent du CONTENU ACADÉMIQUE RÉEL (Marketing Digital v2) ;
 * les parties non encore branchées (évaluation/badges/certificats/notifications) restent en démonstration fictive.
 * Aucune donnée étudiante réelle, aucune écriture, aucune API réelle. `noindex, nofollow, nocache`.
 */
export default function StudentExperiencePreviewPage() {
  if (!ACADEMIC_PREVIEW_ENABLED) notFound();
  // K3-S : garde de frontière — le bundle (view models K1) ne doit contenir aucune clé privée avant d'atteindre
  // le composant client (défense en profondeur ; le bundle est déjà nettoyé à la construction).
  const bundle = ensureClientSafePayload(buildAcademicStudentBundle(marketingDigitalV2), "student-bundle");
  return <StudentLearningShell bundle={bundle} />;
}
