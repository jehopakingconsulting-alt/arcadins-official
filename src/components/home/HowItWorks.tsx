"use client";

import Link from "next/link";
import { useLang, t, UI } from "@/lib/i18n";
import { PROGRAM_CHECKOUT_UI_ENABLED } from "@/lib/config/launch-flags";

/**
 * « Comment ça marche » — 3 étapes, entièrement traduites (7 langues).
 * L'étape 2 et le CTA suivent l'état réel du commerce : self-service quand le
 * checkout est actif (paiement en ligne, accès immédiat), demande d'admission
 * sinon. On n'annonce donc jamais un parcours qui ne correspond pas à la réalité.
 */
const STEPS = ["1", "2", "3"];

export default function HowItWorks() {
  const { lang } = useLang();
  const cta = PROGRAM_CHECKOUT_UI_ENABLED
    ? { href: "/tarifs", label: t(UI["how.cta.buy"], lang) }
    : { href: "/contact", label: t(UI["how.cta.contact"], lang) };

  return (
    <section className="bg-navy py-[72px] px-7 border-t border-gold/10">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["how.label"], lang)}</p>
          <h2 className="font-[family-name:var(--font-heading)] text-[34px] md:text-[40px] text-white">
            {t(UI["how.title1"], lang)} <em className="text-gold italic">{t(UI["how.title2"], lang)}</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((n) => (
            <div key={n} className="relative bg-white/[0.04] border border-gold/16 rounded-[22px] p-8">
              <div className="w-12 h-12 rounded-full bg-gold text-navy font-[family-name:var(--font-heading)] text-xl font-bold flex items-center justify-center mb-5">
                {n}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-[19px] text-white mb-2.5">
                {t(UI[`how.${n}.t`], lang)}
              </h3>
              <p className="text-[13.5px] text-white/60 leading-[1.7]">{t(UI[`how.${n}.d`], lang)}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href={cta.href} className="inline-flex items-center gap-2 bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">
            {cta.label} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
