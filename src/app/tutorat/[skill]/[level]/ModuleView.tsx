"use client";

import Link from "next/link";
import { SKILLS, LEVELS } from "@/lib/data/tutorat";
import type { SkillId, LevelId, TutoratModule } from "@/types/tutorat";
import { useLang, t, UI } from "@/lib/i18n";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.04] border border-gold/17 rounded-[22px] p-7 mb-5">
      <h2 className="font-[family-name:var(--font-heading)] text-[20px] text-gold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[14.5px] text-white/72 leading-[1.65]">
          <span className="w-5 h-5 rounded-full bg-gold/17 text-gold flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ModuleView({
  skillId,
  levelId,
  cefr,
  clb,
  module,
}: {
  skillId: SkillId;
  levelId: LevelId;
  cefr: string;
  clb: string;
  module: TutoratModule;
}) {
  const { lang } = useLang();
  const skill = SKILLS.find((s) => s.id === skillId)!;

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[900px] mx-auto px-7">
        {/* Fil d'Ariane */}
        <Link href="/tutorat" className="inline-flex items-center gap-2 text-[13px] text-white/55 hover:text-gold transition-all mb-7">
          ← {t(UI["tut.back"], lang)}
        </Link>

        {/* En-tête du module */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[30px]" aria-hidden>{skill.icon}</span>
            <span className="bg-gold text-navy text-[11px] font-bold px-3 py-0.5 rounded-full tracking-[0.8px]">{skill.abbr}</span>
            <span className="text-[11px] font-bold tracking-[2px] uppercase text-gold/80">
              {t(UI[`tut.level.${levelId}`], lang)} · {cefr}
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-[36px] text-white leading-[1.15] mb-3">
            {t(UI[`tut.skill.${skillId}`], lang)}
          </h1>
          <p className="text-[16px] text-white/55 leading-[1.75] mb-4">{module.summary}</p>
          <div className="inline-flex items-center gap-2 bg-gold/8 border border-gold/20 rounded-full px-4 py-1.5 text-[12.5px] text-gold">
            <strong>{t(UI["tut.target"], lang)} :</strong> {cefr} · {clb}
          </div>
        </div>

        <Section title={t(UI["tut.sec.objectives"], lang)}><List items={module.objectives} /></Section>
        <Section title={t(UI["tut.sec.strategies"], lang)}><List items={module.strategies} /></Section>
        <Section title={t(UI["tut.sec.focus"], lang)}><List items={module.focus} /></Section>

        <Section title={t(UI["tut.sec.task"], lang)}>
          <div className="font-semibold text-white/85 text-[15px] mb-3">{module.sampleTask.title}</div>
          {module.sampleTask.body.map((p, i) => (
            <p key={i} className="text-[14.5px] text-white/65 leading-[1.75] mb-2.5 last:mb-0">{p}</p>
          ))}
        </Section>

        <Section title={t(UI["tut.sec.tips"], lang)}><List items={module.tips} /></Section>

        {/* Navigation croisée */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <div className="bg-white/[0.04] border border-gold/17 rounded-[20px] p-6">
            <p className="text-[12.5px] font-semibold text-white/70 mb-3">{t(UI["tut.otherlevels"], lang)}</p>
            <div className="flex flex-wrap gap-2">
              {LEVELS.filter((l) => l.id !== levelId).map((l) => (
                <Link key={l.id} href={`/tutorat/${skillId}/${l.id}`} className="text-[12.5px] bg-gold/8 border border-gold/20 text-gold rounded-full px-3.5 py-1.5 hover:bg-gold/15 transition-all">
                  {t(UI[`tut.level.${l.id}`], lang)}
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white/[0.04] border border-gold/17 rounded-[20px] p-6">
            <p className="text-[12.5px] font-semibold text-white/70 mb-3">{t(UI["tut.otherskills"], lang)}</p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.filter((s) => s.id !== skillId).map((s) => (
                <Link key={s.id} href={`/tutorat/${s.id}/${levelId}`} className="text-[12.5px] bg-gold/8 border border-gold/20 text-gold rounded-full px-3.5 py-1.5 hover:bg-gold/15 transition-all">
                  {s.abbr}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link href="/tarifs" className="block mt-8 w-full bg-gold text-navy font-bold text-[15px] py-4 rounded-[10px] text-center transition-all hover:bg-gold-light hover:-translate-y-0.5">
          {t(UI["tut.cta.pricing"], lang)}
        </Link>

        {/* Disclaimer */}
        <div className="mt-6 bg-white/[0.04] border border-gold/17 rounded-2xl p-5">
          <p className="text-[12.5px] text-white/55 leading-[1.7]">
            <strong className="text-gold">ⓘ </strong>{t(UI["legal.exam.disclaimer"], lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
