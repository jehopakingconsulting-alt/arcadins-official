import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEARNING_EXPERIENCE_ENABLED } from "@/lib/config/experience-flags";
import DashboardShell from "@/components/dashboard/DashboardShell";

/**
 * /espace — espace apprenant CANONIQUE (V3), générique et réutilisé par tous les
 * produits. Flag-gated : 404 en prod tant que l'expérience n'est pas validée (S9).
 * L'authentification/session/route-protection réelles réutilisent l'existant
 * (src/middleware.ts + Supabase auth) et seront branchées au flag à l'activation.
 */
export const metadata: Metadata = { title: "Mon espace | ARCADINS", robots: { index: false } };

export default function EspacePage() {
  if (!LEARNING_EXPERIENCE_ENABLED) notFound();
  return <DashboardShell />;
}
