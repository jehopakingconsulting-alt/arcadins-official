import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEARNING_EXPERIENCE_ENABLED } from "@/lib/config/experience-flags";
import { PROGRAM_PRESENTATIONS } from "@/lib/program-presentation/tef";
import ProgramLanding from "@/components/program/ProgramLanding";

/**
 * Vitrine GÉNÉRIQUE d'un programme : /programmes/[slug]. Server Component (RSC) pour
 * SEO + performance ; rendu initial FR (marché principal). Flag-gated : 404 en prod tant
 * que l'expérience n'est pas validée (S9). Réutilisé par TEF, TCF, IELTS, … (données).
 */
export function generateStaticParams() {
  return Object.keys(PROGRAM_PRESENTATIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAM_PRESENTATIONS[slug];
  if (!p) return {};
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://arcadins-official.vercel.app").trim();
  const url = `${base}/programmes/${p.slug}`;
  return {
    title: p.seo.title.fr,
    description: p.seo.description.fr,
    alternates: { canonical: url, languages: { fr: url, en: url, es: url } },
    openGraph: { title: p.seo.title.fr, description: p.seo.description.fr, url, type: "website", siteName: "ARCADINS Training Center" },
    twitter: { card: "summary_large_image", title: p.seo.title.fr, description: p.seo.description.fr },
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!LEARNING_EXPERIENCE_ENABLED) notFound();
  const { slug } = await params;
  const program = PROGRAM_PRESENTATIONS[slug];
  if (!program) notFound();

  // Données structurées (SEO) — FAQPage + Course.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.seo.title.fr,
    description: program.seo.description.fr,
    provider: { "@type": "Organization", name: "ARCADINS Training Center" },
    mainEntityOfPage: {
      "@type": "FAQPage",
      mainEntity: program.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q.fr,
        acceptedAnswer: { "@type": "Answer", text: f.a.fr },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProgramLanding program={program} />
    </>
  );
}
