"use client";

import Link from "next/link";
import { TESTIMONIALS, ILLUSTRATIVE_TESTIMONIALS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";

export default function TemoignagesPage() {
  const { lang } = useLang();

  // Témoignages VÉRIFIÉS (réels, consentis) — alimentés depuis l'administration.
  const verified = TESTIMONIALS;
  // Exemples ILLUSTRATIFS temporaires : on complète jusqu'à 3 cartes. Chaque
  // témoignage vérifié ajouté « remplace » automatiquement une carte illustrative.
  const illustrative = ILLUSTRATIVE_TESTIMONIALS.slice(0, Math.max(0, 3 - verified.length));

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
          {/* Témoignages VÉRIFIÉS (avec note + nom consentis) */}
          {verified.map((te, i) => (
            <div key={`v-${i}`} className="bg-white rounded-[20px] p-7 border border-gold/11 transition-all hover:border-gold/38 hover:shadow-[0_8px_30px_rgba(201,168,76,0.1)]">
              <div className="text-gold text-[15px] tracking-[2px] mb-3">{"★".repeat(te.stars)}</div>
              <p className="text-[14.5px] leading-[1.75] text-body mb-5 italic">{te.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-navy text-gold flex items-center justify-center font-[family-name:var(--font-heading)] text-base font-bold shrink-0">{te.initials}</div>
                <div><div className="text-sm font-semibold text-navy">{te.name}</div><div className="text-xs text-muted">{te.from}</div></div>
              </div>
            </div>
          ))}

          {/* Exemples ILLUSTRATIFS : badge visible, profil générique, AUCUN nom /
              photo / ville / note en étoiles. Ne doivent pas passer pour vérifiés. */}
          {illustrative.map((it, i) => (
            <div key={`i-${i}`} className="bg-white rounded-[20px] p-7 border border-dashed border-gold/30 flex flex-col relative">
              <span className="absolute top-3.5 right-3.5 bg-navy/90 text-gold text-[9.5px] font-bold px-2.5 py-1 rounded-full tracking-[1px] uppercase">
                {t(UI["testi.ill.badge"], lang)}
              </span>
              <div className="text-2xl text-gold/70 mb-2 leading-none" aria-hidden="true">“</div>
              <p className="text-[14.5px] leading-[1.75] text-body mb-5 italic flex-1">{t(UI[it.textKey], lang)}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-off-white">
                <div className="w-9 h-9 rounded-lg bg-gold/12 border border-gold/25 flex items-center justify-center text-navy/50" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z"/></svg>
                </div>
                <div className="text-[12.5px] font-semibold text-navy/70">{t(UI[it.profileKey], lang)}</div>
              </div>
            </div>
          ))}
        </div>

        {illustrative.length > 0 && (
          <p className="text-center text-[12.5px] text-muted mt-6 max-w-[720px] mx-auto">
            {t(UI["testi.ill.notice"], lang)}
          </p>
        )}

        {/* CTA */}
        <div className="max-w-[640px] mx-auto text-center mt-14">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="bg-navy text-gold font-bold text-[14.5px] px-7 py-3 rounded-xl transition-all hover:bg-navy-mid hover:-translate-y-0.5">
              {t(UI["testi.share"], lang)}
            </Link>
            <Link href="/formations" className="bg-transparent text-navy font-semibold text-[14.5px] px-7 py-3 rounded-xl border-[1.5px] border-navy/20 transition-all hover:border-gold hover:text-gold">
              {t(UI["cta.see_formations"], lang)}
            </Link>
          </div>
        </div>

        {/* Notre engagement (messages éditoriaux ARCADINS) */}
        <div className="max-w-[1000px] mx-auto mt-16">
          <p className="text-center text-[11px] font-bold tracking-[4px] uppercase text-gold mb-7">{t(UI["testi.motiv.label"], lang)}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {([["🎯", "testi.motiv.a"], ["📚", "testi.motiv.b"], ["🤝", "testi.motiv.c"]] as const).map(([icon, key]) => (
              <div key={key} className="bg-white rounded-[20px] p-7 border border-gold/11 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gold/12 border border-gold/25 flex items-center justify-center text-2xl mb-4" aria-hidden="true">{icon}</div>
                <p className="text-[14.5px] leading-[1.7] text-body flex-1">{t(UI[key], lang)}</p>
                <p className="text-xs font-semibold text-navy/60 mt-4">{t(UI["testi.motiv.by"], lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
