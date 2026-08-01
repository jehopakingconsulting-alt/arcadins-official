import type { MetadataRoute } from "next";
import { SKILLS, LEVELS } from "@/lib/data/tutorat";
import { REFERRAL_ENABLED } from "@/lib/data/referral-config";
import { PROGRAMS } from "@/lib/data/programs";
import { localeAlternates } from "@/lib/i18n/locale-routing";

/**
 * Sitemap multilingue. Chaque entrée pointe sur l'URL canonique (/fr…) et déclare
 * les alternates hreflang (/fr /en /es + x-default), cohérent avec les canonicals
 * émis par le root layout. Inclut le catalogue des Formations professionnelles.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app";
  const now = new Date();

  type Entry = { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number };
  const entries: Entry[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    // Département A — Programmes officiels de langue.
    { path: "/tef", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tcf", changeFrequency: "monthly", priority: 0.9 },
    { path: "/tutorat", changeFrequency: "monthly", priority: 0.85 },
    ...SKILLS.flatMap((s) => LEVELS.map((l) => ({ path: `/tutorat/${s.id}/${l.id}`, changeFrequency: "monthly" as const, priority: 0.6 }))),
    { path: "/tutorat/demande", changeFrequency: "yearly", priority: 0.6 },
    { path: "/devenir-tuteur", changeFrequency: "monthly", priority: 0.7 },
    // Département B — Formations professionnelles (catalogue + fiche par formation active).
    { path: "/formations", changeFrequency: "monthly", priority: 0.9 },
    ...PROGRAMS.filter((p) => !p.comingSoon).map((p) => ({ path: `/formations/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.75 })),
    // Transverse.
    { path: "/examens", changeFrequency: "monthly", priority: 0.8 },
    { path: "/immigration", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tarifs", changeFrequency: "weekly", priority: 0.8 },
    { path: "/temoignages", changeFrequency: "monthly", priority: 0.6 },
    { path: "/accreditations", changeFrequency: "monthly", priority: 0.5 },
    { path: "/a-propos", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "/guide", changeFrequency: "monthly", priority: 0.6 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/auth/login", changeFrequency: "yearly", priority: 0.3 },
    { path: "/auth/register", changeFrequency: "yearly", priority: 0.3 },
    ...(REFERRAL_ENABLED ? [{ path: "/parrainage", changeFrequency: "monthly" as const, priority: 0.6 }] : []),
  ];

  return entries.map(({ path, changeFrequency, priority }) => {
    const alt = localeAlternates(base, path, "fr");
    return {
      url: alt.canonical,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: alt.languages },
    };
  });
}
