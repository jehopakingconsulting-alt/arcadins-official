"use client";

import { useLang, t, UI } from "@/lib/i18n";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

// Faits vérifiables sur la plateforme (aucune statistique non prouvée).
const STATS = [
  { value: 9, suffix: "", key: "stats.formations" },
  { value: 72, suffix: "", key: "stats.modules" },
  { value: 7, suffix: "", key: "stats.langues" },
  { value: 4, suffix: "", key: "stats.competences" },
];

export default function StatsBar() {
  const { lang } = useLang();

  return (
    <div className="bg-gold px-7">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.key}
            className={`text-center py-6 px-3.5 ${
              i < STATS.length - 1 ? "border-r border-navy/13" : ""
            }`}
          >
            <div className="font-[family-name:var(--font-heading)] text-[38px] font-bold text-navy leading-none">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[11px] font-semibold text-navy/52 tracking-[1px] uppercase mt-1">
              {t(UI[stat.key], lang)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
