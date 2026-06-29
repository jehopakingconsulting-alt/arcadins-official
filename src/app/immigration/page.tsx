"use client";

import { COUNTRIES, PROVINCES } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";
import Link from "next/link";

export default function ImmigrationPage() {
  const { lang } = useLang();

  const steps = [
    { num: 1, title: t(UI["imm.s1.title"], lang), desc: t(UI["imm.s1.desc"], lang) },
    { num: 2, title: t(UI["imm.s2.title"], lang), desc: t(UI["imm.s2.desc"], lang) },
    { num: 3, title: t(UI["imm.s3.title"], lang), desc: t(UI["imm.s3.desc"], lang) },
    { num: 4, title: t(UI["imm.s4.title"], lang), desc: t(UI["imm.s4.desc"], lang) },
  ];

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="mb-13">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["imm.label"], lang)}</p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-navy mb-4">
            {t(UI["imm.title1"], lang)} <em className="text-gold italic">{t(UI["imm.title2"], lang)}</em><br />{t(UI["imm.title3"], lang)}
          </h2>
          <p className="text-[17px] text-muted max-w-[600px] leading-[1.75]">{t(UI["imm.desc"], lang)}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <div className="flex flex-col">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-4 py-5 border-b border-gold/11 last:border-b-0">
                  <div className="w-11 h-11 rounded-full bg-navy text-gold font-[family-name:var(--font-heading)] text-lg font-bold flex items-center justify-center shrink-0">{step.num}</div>
                  <div><h4 className="font-[family-name:var(--font-heading)] text-base text-navy mb-1">{step.title}</h4><p className="text-[13.5px] text-muted leading-[1.65]">{step.desc}</p></div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="mt-8 inline-flex bg-navy text-gold font-bold text-[15px] px-8 py-3.5 rounded-[10px] items-center gap-2 transition-all hover:bg-navy-mid">{t(UI["imm.cta"], lang)}</Link>
          </div>
          <div className="bg-navy rounded-[28px] p-9 text-white">
            <h3 className="font-[family-name:var(--font-heading)] text-[22px] mb-4">{t(UI["imm.panel.title"], lang)}</h3>
            <div className="flex gap-2 flex-wrap mb-6">{COUNTRIES.map((c) => (<div key={c} className="bg-white/7 border border-gold/17 rounded-lg px-3.5 py-2 text-[13px] text-white/70">{c}</div>))}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{PROVINCES.map((p) => (<div key={p.name} className="bg-gold/7 border border-gold/17 rounded-xl p-3.5"><div className="text-[15px] font-semibold text-white mb-0.5">{p.name}</div><div className="text-xs text-white/42">{p.sub}</div></div>))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
