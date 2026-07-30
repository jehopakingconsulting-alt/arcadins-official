"use client";

import Link from "next/link";
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
        {TESTIMONIALS.length === 0 ? (
          <div className="max-w-[640px] mx-auto text-center bg-white rounded-[24px] p-10 sm:p-12 border border-gold/15 shadow-[0_8px_40px_rgba(13,27,46,0.06)]">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gold/12 border border-gold/25 flex items-center justify-center text-3xl" aria-hidden="true">💬</div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-navy mb-3">
              {t(UI["testi.empty.title"], lang)}
            </h3>
            <p className="text-[15px] text-body leading-[1.75] mb-7">
              {t(UI["testi.empty"], lang)}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="bg-navy text-gold font-bold text-[14.5px] px-7 py-3 rounded-xl transition-all hover:bg-navy-mid hover:-translate-y-0.5">
                {t(UI["testi.share"], lang)}
              </Link>
              <Link href="/formations" className="bg-transparent text-navy font-semibold text-[14.5px] px-7 py-3 rounded-xl border-[1.5px] border-navy/20 transition-all hover:border-gold hover:text-gold">
                {t(UI["cta.see_formations"], lang)}
              </Link>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
