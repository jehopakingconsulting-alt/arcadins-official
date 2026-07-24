"use client";

import { useState } from "react";
import Link from "next/link";
import { SKILLS, LEVELS } from "@/lib/data/tutorat";
import { useLang, t, UI } from "@/lib/i18n";

export default function TutoratPage() {
  const { lang } = useLang();
  const [level, setLevel] = useState(LEVELS[0].id);
  const activeLevel = LEVELS.find((l) => l.id === level)!;

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        {/* En-tête */}
        <div className="mb-11">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">
            {t(UI["tut.label"], lang)}
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[42px] text-white mb-4 leading-[1.15]">
            {t(UI["tut.title"], lang)}
          </h1>
          <p className="text-[17px] text-white/52 max-w-[640px] leading-[1.75]">
            {t(UI["tut.desc"], lang)}
          </p>
        </div>

        {/* Sélecteur de niveau */}
        <div className="mb-8">
          <p className="text-[13px] font-semibold text-white/70 mb-3">{t(UI["tut.levels.title"], lang)}</p>
          <div className="flex flex-wrap gap-2.5">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLevel(l.id)}
                className={`text-left rounded-[14px] px-5 py-3 border transition-all ${
                  l.id === level
                    ? "bg-gold/10 border-gold"
                    : "bg-white/[0.044] border-gold/19 hover:bg-gold/8 hover:border-gold"
                }`}
              >
                <div className="font-[family-name:var(--font-heading)] text-[16px] font-bold text-white">
                  {t(UI[`tut.level.${l.id}`], lang)}
                </div>
                <div className="text-[11.5px] text-gold/80 mt-0.5">{l.cefr} · {l.clb}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Grille des 4 compétences (liée au niveau sélectionné) */}
        <p className="text-[13px] font-semibold text-white/70 mb-3">
          {t(UI["tut.skills.title"], lang)} — <span className="text-gold">{t(UI[`tut.level.${activeLevel.id}`], lang)}</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {SKILLS.map((s) => (
            <Link
              key={s.id}
              href={`/tutorat/${s.id}/${level}`}
              className="group bg-white/[0.04] border border-gold/17 rounded-[22px] p-6 transition-all hover:bg-gold/8 hover:border-gold hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[26px]" aria-hidden>{s.icon}</span>
                <span className="bg-gold text-navy text-[10.5px] font-bold px-2.5 py-0.5 rounded-full tracking-[0.8px]">{s.abbr}</span>
              </div>
              <div className="font-[family-name:var(--font-heading)] text-[20px] font-bold text-white mb-1">
                {t(UI[`tut.skill.${s.id}`], lang)}
              </div>
              <div className="text-[13.5px] text-gold/85 font-semibold mt-3 group-hover:text-gold">
                {t(UI["tut.cta.explore"], lang)} →
              </div>
            </Link>
          ))}
        </div>

        {/* Comment ça marche */}
        <div className="bg-white/[0.04] border border-gold/17 rounded-[24px] p-8 mb-8">
          <div className="font-[family-name:var(--font-heading)] text-[22px] text-gold mb-2">{t(UI["tut.how.title"], lang)}</div>
          <p className="text-[14.5px] text-white/60 leading-[1.75] max-w-[760px]">{t(UI["tut.how.desc"], lang)}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/tutorat/demande" className="bg-gold text-navy font-bold text-[14.5px] px-6 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">
              {t(UI["tut.cta.request"], lang)}
            </Link>
            <Link href="/devenir-tuteur" className="bg-white/8 border border-gold/30 text-gold font-bold text-[14.5px] px-6 py-3.5 rounded-[10px] transition-all hover:bg-white/12">
              {t(UI["tut.cta.becometutor"], lang)}
            </Link>
            <Link href="/tarifs" className="bg-white/8 border border-gold/30 text-gold font-bold text-[14.5px] px-6 py-3.5 rounded-[10px] transition-all hover:bg-white/12">
              {t(UI["tut.cta.pricing"], lang)}
            </Link>
          </div>
        </div>

        {/* Clause de non-responsabilité (conformité) */}
        <div className="bg-white/[0.04] border border-gold/17 rounded-2xl p-5">
          <p className="text-[12.5px] text-white/55 leading-[1.7]">
            <strong className="text-gold">ⓘ </strong>{t(UI["legal.exam.disclaimer"], lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
