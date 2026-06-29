"use client";

import { useState } from "react";
import { TEF_TESTS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";
import Link from "next/link";

export default function TefPage() {
  const [selected, setSelected] = useState(0);
  const { lang } = useLang();

  const checklist = [
    t(UI["tef.ck1"], lang), t(UI["tef.ck2"], lang), t(UI["tef.ck3"], lang),
    t(UI["tef.ck4"], lang), t(UI["tef.ck5"], lang), t(UI["tef.ck6"], lang),
    t(UI["tef.ck7"], lang),
  ];

  const steps = [
    { n: "1", t: t(UI["tef.step1"], lang) },
    { n: "2", t: t(UI["tef.step2"], lang) },
    { n: "3", t: t(UI["tef.step3"], lang) },
    { n: "4", t: t(UI["tef.step4"], lang) },
  ];

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="mb-13">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">
            {t(UI["tef.label"], lang)}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-[42px] text-white mb-4 leading-[1.15]">
            {t(UI["tef.title1"], lang)} <em className="text-gold italic">{t(UI["tef.title2"], lang)}</em>
            <br />{t(UI["tef.title3"], lang)}
          </h2>
          <p className="text-[17px] text-white/52 max-w-[600px] leading-[1.75]">
            {t(UI["tef.desc"], lang)} <strong className="text-gold">96%</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-3.5">
            {TEF_TESTS.map((test, i) => (
              <button key={test.name} onClick={() => setSelected(i)} className={`text-left rounded-[20px] p-6 transition-all relative overflow-hidden border ${i === selected ? "bg-gold/8 border-gold" : "bg-white/[0.044] border-gold/19 hover:bg-gold/8 hover:border-gold"}`}>
                {i === selected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold rounded-l" />}
                <div className="float-right bg-gold text-navy text-[10.5px] font-bold px-3 py-0.5 rounded-full tracking-[0.8px]">{test.tag}</div>
                <div className="font-[family-name:var(--font-heading)] text-[21px] font-bold text-white mb-1">{test.name}</div>
                <div className="text-[13.5px] text-white/55 leading-[1.6]">{test.desc}</div>
                <div className="flex gap-4 mt-3 flex-wrap">{test.meta.map((m) => (<span key={m} className="text-xs text-white/40">{m}</span>))}</div>
              </button>
            ))}
          </div>

          <div className="bg-white/[0.04] border border-gold/17 rounded-[28px] p-8">
            <div className="font-[family-name:var(--font-heading)] text-[22px] text-gold mb-1">{t(UI["tef.panel.title"], lang)}</div>
            <div className="text-[13.5px] text-white/46 mb-6">{t(UI["tef.panel.sub"], lang)}</div>
            <ul className="mb-7">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 py-2.5 border-b border-white/[0.054] text-sm text-white/72">
                  <span className="w-5 h-5 rounded-full bg-gold/17 text-gold flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✓</span>{item}
                </li>
              ))}
            </ul>
            <p className="text-white/52 text-[13px] font-semibold mb-3">{t(UI["tef.panel.how"], lang)}</p>
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {steps.map((s) => (
                <div key={s.n} className="bg-gold/8 border border-gold/17 rounded-xl p-4 text-center">
                  <div className="font-[family-name:var(--font-heading)] text-[26px] font-bold text-gold">{s.n}</div>
                  <div className="text-xs text-white/50 mt-1 leading-[1.4]">{s.t}</div>
                </div>
              ))}
            </div>
            <Link href="/tarifs" className="block mt-6 w-full bg-gold text-navy font-bold text-[15px] py-3.5 rounded-[10px] text-center transition-all hover:bg-gold-light hover:-translate-y-0.5">
              {t(UI["tef.panel.cta"], lang)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
