import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marketingDigitalV2 } from "@/lib/academic/marketing-digital-v2";
import { RuntimeProgressPreview } from "@/components/learn/progress/RuntimeProgressPreview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QA locale — progression runtime (démo) — ARCADINS",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * PREVIEW LOCALE DE TEST (Sprint K2C) — visualisation de la progression issue du Runtime. ISOLÉE, jamais
 * accessible en production (`LEARN_UI_PREVIEW_LOCAL === "1"` ET hors production, sinon `notFound()`).
 * Données de démonstration, aucune donnée réelle, `noindex/nofollow/nocache`.
 */
export default function LocalRuntimeProgressPreviewPage() {
  const localEnabled = process.env.LEARN_UI_PREVIEW_LOCAL === "1" && process.env.NODE_ENV !== "production";
  if (!localEnabled) notFound();
  return <RuntimeProgressPreview curriculum={marketingDigitalV2} />;
}
