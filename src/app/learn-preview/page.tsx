import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marketingDigitalV2 } from "@/lib/academic/marketing-digital-v2";
import { StudentLearningShell } from "@/components/learn/StudentLearningShell";
import { buildAcademicStudentBundle } from "@/lib/runtime/ui/academic-preview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QA locale — expérience étudiante (démo) — ARCADINS",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * PREVIEW LOCALE DE TEST (Sprint J-QA) — ISOLÉE, jamais accessible en production.
 *
 * Accessible UNIQUEMENT quand `LEARN_UI_PREVIEW_LOCAL === "1"` ET hors production. En production
 * (`NODE_ENV === "production"`), la route renvoie toujours `notFound()`, quelle que soit la variable
 * d'environnement. Elle sert exclusivement au harnais de test navigateur (Playwright) : données ENTIÈREMENT
 * FICTIVES, aucune API, aucune donnée réelle, aucune écriture, `noindex/nofollow/nocache`. Ne modifie pas le
 * comportement de la preview officielle `/admin/academic-preview/student` (toujours gardée RBAC + flag).
 */
export default function LocalLearnPreviewPage() {
  const localEnabled = process.env.LEARN_UI_PREVIEW_LOCAL === "1" && process.env.NODE_ENV !== "production";
  if (!localEnabled) notFound();
  const bundle = buildAcademicStudentBundle(marketingDigitalV2);
  return <StudentLearningShell bundle={bundle} />;
}
