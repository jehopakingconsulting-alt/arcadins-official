"use client";

import { CERTIFICATIONS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS = [
  { value: 12400, suffix: "", key: "stats.apprenants" },
  { value: 47, suffix: "", key: "stats.pays" },
  { value: 96, suffix: "%", key: "stats.reussite" },
  { value: 7, suffix: "", key: "stats.langues" },
  { value: 28, suffix: "", key: "stats.programmes" },
];

export default function StatsBar() {
  const { lang } = useLang();

  return (
    <>
      <div className="bg-gold px-7">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.key}
              className={`text-center py-6 px-3.5 ${
                i < STATS.length - 1 ? "border-r border-navy/13" : ""
              } ${i >= 3 ? "hidden lg:block" : ""}`}
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

      <div className="bg-navy-mid py-5 px-7">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-7 flex-wrap">
          <span className="text-white/40 text-[11px] font-bold tracking-[2.5px] uppercase whitespace-nowrap shrink-0">
            {t(UI["stats.reconnu"], lang)}
          </span>
          <div className="flex gap-2 flex-wrap">
            {CERTIFICATIONS.map((cert) => (
              <span key={cert} className="flex items-center gap-1.5 bg-gold/9 border border-gold/26 px-4 py-1.5 rounded-full text-gold-light text-[11.5px] font-semibold">
                ✓ {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
