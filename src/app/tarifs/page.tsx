"use client";

import { useState } from "react";
import { PRICING, PAYMENT_METHODS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";

export default function TarifsPage() {
  const [annual, setAnnual] = useState(false);
  const { lang } = useLang();

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20 px-7">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-6">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["tarifs.label"], lang)}</p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white mb-4">
            {t(UI["tarifs.title1"], lang)}<br />{t(UI["tarifs.title2"], lang)} <em className="text-gold italic">{t(UI["tarifs.title3"], lang)}</em>
          </h2>
          <p className="text-[17px] text-white/50 max-w-[500px] mx-auto">{t(UI["tarifs.desc"], lang)}</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-11">
          <span className={annual ? "text-white/50 text-sm font-medium" : "text-gold text-sm font-medium"}>{t(UI["tarifs.monthly"], lang)}</span>
          <button onClick={() => setAnnual(!annual)} className={`w-12 h-[26px] rounded-full relative border-none cursor-pointer transition-all ${annual ? "bg-gold/40" : "bg-gold/24"}`}>
            <div className={`w-5 h-5 bg-gold rounded-full absolute top-[3px] transition-all ${annual ? "left-[25px]" : "left-[3px]"}`} />
          </button>
          <span className={annual ? "text-gold text-sm font-medium" : "text-white/50 text-sm font-medium"}>
            {t(UI["tarifs.annual"], lang)} <span className="bg-gold/20 text-gold text-[11px] px-2 py-0.5 rounded-xl ml-1">-20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRICING.map((plan) => (
            <div key={plan.name} className={`rounded-[28px] p-8 transition-all hover:-translate-y-1 ${plan.featured ? "bg-gold border-gold [&_*]:!text-navy" : "bg-white/[0.044] border border-gold/17 hover:border-gold/44"}`}>
              <div className={`inline-block text-[10.5px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full mb-4 ${plan.featured ? "bg-navy/18 text-navy" : "bg-gold/17 text-gold"}`}>{plan.badge}</div>
              <div className="font-[family-name:var(--font-heading)] text-2xl text-white mb-1.5">{plan.name}</div>
              <p className="text-[13.5px] text-white/48 mb-6 leading-[1.65]">{plan.description}</p>
              {plan.priceMonthly ? (
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-[17px] text-white">{plan.currency}</span>
                  <span className="font-[family-name:var(--font-heading)] text-[44px] font-bold text-white leading-none">{annual ? plan.priceAnnual : plan.priceMonthly}</span>
                  <span className="text-[13px] text-white/42">{t(UI["tarifs.month"], lang)}</span>
                </div>
              ) : (
                <div className="mb-4"><span className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-white">{t(UI["tarifs.custom"], lang)}</span></div>
              )}
              <ul className="mb-7 space-y-0">
                {plan.features.map((f) => (
                  <li key={f.text} className={`flex items-start gap-2 py-[7px] border-b border-white/[0.062] text-[13.5px] ${f.included ? "text-white/70" : "text-white/70 opacity-35"}`}>
                    <span className={`text-sm shrink-0 mt-0.5 ${f.included ? "text-gold" : "text-white/30"}`}>{f.included ? "✓" : "✗"}</span>{f.text}
                  </li>
                ))}
              </ul>
              <a href={plan.priceMonthly ? `/api/checkout?plan=${plan.name.toLowerCase()}&billing=${annual ? "annual" : "monthly"}` : "/contact"} className={`block w-full py-3.5 rounded-[9px] font-bold text-[14.5px] text-center transition-all ${plan.featured ? "bg-navy text-gold border-2 border-navy hover:bg-navy-mid" : "bg-transparent text-gold border-[1.5px] border-gold/43 hover:bg-gold/10 hover:border-gold"}`}>{plan.cta}</a>
            </div>
          ))}
        </div>

        <div className="text-center mt-9">
          <p className="text-white/36 text-[13px]">{t(UI["tarifs.payments"], lang)}</p>
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            {PAYMENT_METHODS.map((m) => (<span key={m} className="bg-white/[0.055] border border-gold/17 rounded-md px-3 py-[5px] text-xs text-white/52">{m}</span>))}
          </div>
        </div>
      </div>
    </div>
  );
}
