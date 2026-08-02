"use client";

import Link from "next/link";
import { TESTIMONIALS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";

export default function TemoignagesPage() {
  const { lang } = useLang();

  // UNIQUEMENT des témoignages VÉRIFIÉS (réels, consentis) — alimentés depuis
  // l'administration. Aucun exemple « illustratif » : l'authenticité prime.
  const verified = TESTIMONIALS;

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="text-center mb-13">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["testi.label"], lang)}</p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-navy">
            {t(UI["testi.title1"], lang)} <em className="text-gold italic">{t(UI["testi.title2"], lang)}</em>
          </h2>
        </div>

        {verified.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Témoignages VÉRIFIÉS uniquement (note + nom consentis) */}
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
          </div>
        ) : (
          // Aucun témoignage vérifié : état vide honnête (pas de faux avis).
          <div className="max-w-[680px] mx-auto bg-white rounded-[24px] p-10 border border-gold/15 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gold/12 border border-gold/25 flex items-center justify-center text-2xl mx-auto mb-4" aria-hidden="true">⭐</div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-navy mb-3">Vos réussites, bientôt ici</h3>
            <p className="text-[14.5px] text-body leading-[1.75] mb-7 max-w-[520px] mx-auto">
              ARCADINS Training Center accueille ses premiers étudiants. Les témoignages publiés ici seront
              tous réels et vérifiés, avec l&apos;accord de leurs auteurs. Soyez parmi les premiers à bâtir
              votre réussite avec nous.
            </p>
            <Link href="/contact" className="inline-block bg-navy text-gold font-bold text-[14.5px] px-7 py-3 rounded-xl transition-all hover:bg-navy-mid hover:-translate-y-0.5">
              Commencer mon parcours →
            </Link>
          </div>
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
