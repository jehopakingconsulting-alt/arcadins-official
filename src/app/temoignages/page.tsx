"use client";

import { TESTIMONIALS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";

export default function TemoignagesPage() {
  const { lang } = useLang();

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="text-center mb-13">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["testi.label"], lang)}</p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-navy">
            {t(UI["testi.title1"], lang)} <em className="text-gold italic">{t(UI["testi.title2"], lang)}</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((te, i) => (
            <div key={i} className="bg-white rounded-[20px] p-7 border border-gold/11 transition-all hover:border-gold/38 hover:shadow-[0_8px_30px_rgba(201,168,76,0.1)]">
              <div className="text-gold text-[15px] tracking-[2px] mb-3">{"★".repeat(te.stars)}</div>
              <p className="text-[14.5px] leading-[1.75] text-body mb-5 italic">{te.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-navy text-gold flex items-center justify-center font-[family-name:var(--font-heading)] text-base font-bold shrink-0">{te.initials}</div>
                <div><div className="text-sm font-semibold text-navy">{te.name}</div><div className="text-xs text-muted">{te.from}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
