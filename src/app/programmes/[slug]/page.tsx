import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { LEARNING_EXPERIENCE_ENABLED } from "@/lib/config/experience-flags";
import { PROGRAM_PRESENTATIONS } from "@/lib/program-presentation/tef";
import ProgramLanding from "@/components/program/ProgramLanding";
import { localeAlternates, isRoutedLocale, DEFAULT_LOCALE, type RoutedLocale } from "@/lib/i18n/locale-routing";

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
  const h = await headers();
  const hl = h.get("x-arcadins-locale");
  const locale: RoutedLocale = isRoutedLocale(hl) ? hl : DEFAULT_LOCALE;
  const alt = localeAlternates(base, `/programmes/${p.slug}`, locale);
  return {
    title: p.seo.title[locale] ?? p.seo.title.fr,
    description: p.seo.description[locale] ?? p.seo.description.fr,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: { title: p.seo.title[locale] ?? p.seo.title.fr, description: p.seo.description[locale] ?? p.seo.description.fr, url: alt.canonical, type: "website", siteName: "ARCADINS Training Center" },
    twitter: { card: "summary_large_image", title: p.seo.title[locale] ?? p.seo.title.fr, description: p.seo.description[locale] ?? p.seo.description.fr },
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
