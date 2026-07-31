import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marketingDigitalV2 } from "@/lib/academic/marketing-digital-v2";
import { QuizRuntimePreview } from "@/components/learn/assessment/QuizRuntimePreview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QA locale — quiz runtime (démo) — ARCADINS",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * PREVIEW LOCALE DE TEST (Sprint K3A) — expérience de quiz formatif branchée sur le moteur RÉEL du Sprint F.
 * ISOLÉE, jamais accessible en production (`LEARN_UI_PREVIEW_LOCAL === "1"` ET hors production, sinon
 * `notFound()`). Données de démonstration, aucune donnée réelle, `noindex/nofollow/nocache`.
 * Le flag `QUIZ_RUNTIME_ENABLED` reste `false` : le quiz n'est jamais rendu sur la plateforme publique.
 */
export default async function LocalQuizRuntimePreviewPage({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const localEnabled = process.env.LEARN_UI_PREVIEW_LOCAL === "1" && process.env.NODE_ENV !== "production";
  if (!localEnabled) notFound();
  const sp = await searchParams;
  const variant = sp?.d === "det" ? "det" : "real";
  return <QuizRuntimePreview curriculum={marketingDigitalV2} variant={variant} />;
}
