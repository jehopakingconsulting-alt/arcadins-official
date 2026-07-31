import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marketingDigitalV2 } from "@/lib/academic/marketing-digital-v2";
import { FinalExamPreview, type ExamPreviewVariant } from "@/components/learn/exam/FinalExamPreview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QA locale — examen final runtime (démo) — ARCADINS",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * PREVIEW LOCALE DE TEST (Sprint K3B) — expérience d'examen final branchée sur le moteur RÉEL du Sprint G.
 * ISOLÉE, jamais accessible en production (`LEARN_UI_PREVIEW_LOCAL === "1"` ET hors production, sinon
 * `notFound()`). Données de démonstration, aucune donnée réelle, `noindex/nofollow/nocache`. Le flag
 * `FINAL_EXAM_RUNTIME_ENABLED` reste `false` : l'examen n'est jamais rendu sur la plateforme publique.
 */
export default async function LocalFinalExamPreviewPage({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const localEnabled = process.env.LEARN_UI_PREVIEW_LOCAL === "1" && process.env.NODE_ENV !== "production";
  if (!localEnabled) notFound();
  const sp = await searchParams;
  const allowed: ExamPreviewVariant[] = ["real", "det", "blocked", "timeout"];
  const variant = (allowed.includes(sp?.d as ExamPreviewVariant) ? sp!.d : "real") as ExamPreviewVariant;
  return <FinalExamPreview programSlug={marketingDigitalV2.slug} variant={variant} />;
}
