import type { MetadataRoute } from "next";
import { SKILLS, LEVELS } from "@/lib/data/tutorat";
import { REFERRAL_ENABLED } from "@/lib/data/referral-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "").trim() || "https://arcadins-official.vercel.app";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tef`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tcf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tutorat`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...SKILLS.flatMap((s) =>
      LEVELS.map((l) => ({
        url: `${base}/tutorat/${s.id}/${l.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ),
    { url: `${base}/tutorat/demande`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/devenir-tuteur`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...(REFERRAL_ENABLED
      ? [{ url: `${base}/parrainage`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }]
      : []),
    { url: `${base}/formations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/examens`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/immigration`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tarifs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/temoignages`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/accreditations`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/auth/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/auth/register`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
