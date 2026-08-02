import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROGRAMS } from "@/lib/data/programs";

/**
 * Layout SERVEUR de /formations/[slug].
 *  - Fournit les métadonnées SEO par formation (titre/description spécifiques).
 *  - Garde d'existence : tout slug inconnu ou archivé (comingSoon) renvoie un VRAI 404
 *    (plus de soft-404 « introuvable » en 200). Empêche notamment une route TEF parasite
 *    (/formations/tef-canada appartient au Département A, pas au catalogue des formations).
 * La page enfant est un client component ; cette validation se fait donc ici, côté serveur.
 */
function isPublicSlug(slug: string): boolean {
  return PROGRAMS.some((p) => p.slug === slug && !p.comingSoon);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — Formation professionnelle`,
    description: p.description,
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isPublicSlug(slug)) notFound();
  return children;
}
