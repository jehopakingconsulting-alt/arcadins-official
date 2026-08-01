import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/data/programs";

/**
 * Métadonnées SEO PAR formation (titre/description spécifiques dérivés du catalogue),
 * sinon toutes les pages /formations/[slug] hériteraient d'un titre générique unique.
 * La page enfant est un client component ; ce layout serveur fournit les métadonnées.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — Formation professionnelle`,
    description: p.description,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
