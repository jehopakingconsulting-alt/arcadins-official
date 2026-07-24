"use client";

import { useLang, t, UI } from "@/lib/i18n";
import { REFERRAL_PLAN } from "@/lib/data/referral-config";

export default function ParrainageView() {
  const { lang } = useLang();

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[900px] mx-auto px-7">
        <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["par.label"], lang)}</p>
        <h1 className="font-[family-name:var(--font-heading)] text-[40px] text-white mb-4 leading-[1.15]">{t(UI["par.title"], lang)}</h1>
        <p className="text-[17px] text-white/55 leading-[1.75] max-w-[640px] mb-10">{t(UI["par.desc"], lang)}</p>

        {/* Plan par génération */}
        <h2 className="font-[family-name:var(--font-heading)] text-[22px] text-gold mb-4">{t(UI["par.plan.title"], lang)}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {REFERRAL_PLAN.map((tier) => (
            <div key={tier.generation} className="bg-white/[0.04] border border-gold/17 rounded-[20px] p-6 text-center">
              <div className="font-[family-name:var(--font-heading)] text-[40px] font-bold text-gold leading-none">{tier.ratePercent}%</div>
              <div className="text-[13.5px] text-white/70 font-semibold mt-2">{tier.label}</div>
              <div className="text-[11.5px] text-white/40 mt-1">Génération {tier.generation}</div>
            </div>
          ))}
        </div>

        {/* Disclaimer conformité */}
        <div className="bg-white/[0.04] border border-gold/17 rounded-2xl p-5">
          <p className="text-[12.5px] text-white/55 leading-[1.7]">
            <strong className="text-gold">ⓘ </strong>{t(UI["par.disclaimer"], lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
