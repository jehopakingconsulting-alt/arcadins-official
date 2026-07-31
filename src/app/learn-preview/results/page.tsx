import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALL_SCENARIOS, type CompletionScenario } from "@/lib/runtime/ui/completion/completion-config";
import { AssessmentCompletionPreview } from "@/components/learn/results/AssessmentCompletionPreview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QA locale — bilan d'évaluation (démo) — ARCADINS",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * PREVIEW LOCALE DE TEST (Sprint K3C) — orchestration des résultats/décisions d'évaluation. ISOLÉE, jamais
 * accessible en production (`LEARN_UI_PREVIEW_LOCAL === "1"` ET hors production, sinon `notFound()`). Données
 * SYNTHÉTIQUES déterministes, aucune donnée réelle, aucun certificat émis, `noindex/nofollow/nocache`. Le flag
 * `ASSESSMENT_COMPLETION_RUNTIME_ENABLED` reste `false` : jamais rendu sur la plateforme publique.
 */
export default async function LocalCompletionPreviewPage({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const localEnabled = process.env.LEARN_UI_PREVIEW_LOCAL === "1" && process.env.NODE_ENV !== "production";
  if (!localEnabled) notFound();
  const sp = await searchParams;
  const initial = (ALL_SCENARIOS.includes(sp?.d as CompletionScenario) ? sp!.d : "final_pass") as CompletionScenario;
  return <AssessmentCompletionPreview initialScenario={initial} />;
}
