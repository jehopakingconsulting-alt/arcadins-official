"use client";

import { useLang, t, UI } from "@/lib/i18n";

export default function ExamensPage() {
  const { lang } = useLang();

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="mb-13">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["exam.label"], lang)}</p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-navy mb-4">
            {t(UI["exam.title1"], lang)}<br />{t(UI["exam.title2"], lang)} <em className="text-gold italic">{t(UI["exam.title3"], lang)}</em>
          </h2>
          <p className="text-[17px] text-muted max-w-[600px] leading-[1.75]">{t(UI["exam.desc"], lang)}</p>
        </div>

        <div className="bg-navy rounded-[22px] overflow-hidden border border-gold/17">
          <div className="bg-gold/7 border-b border-gold/15 px-6 py-4 flex items-center gap-3">
            <div className="flex gap-[7px]"><span className="w-3 h-3 rounded-full bg-[#ff5f57]" /><span className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><span className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
            <div className="bg-white/7 rounded-md px-4 py-1.5 text-white/36 font-[family-name:var(--font-mono)] text-xs flex-1 text-center">https://lms.arcadins-training.com/exam/tef-canada-module-3</div>
          </div>
          <div className="p-8 grid grid-cols-1 lg:grid-cols-[1fr_295px] gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-[5px] bg-white/7 rounded-full overflow-hidden"><div className="h-full w-[65%] bg-gradient-to-r from-gold to-gold-light rounded-full" /></div>
                <span className="text-white/38 text-[12.5px]">13 / 20</span>
                <div className="bg-gold/13 border border-gold/28 rounded-[7px] px-3 py-[7px] text-gold font-[family-name:var(--font-mono)] text-[15px]">32:14</div>
              </div>
              <p className="text-white/32 text-[11.5px] mb-2">TEF Canada — Compréhension Écrite · Module 3</p>
              <div className="font-[family-name:var(--font-heading)] text-[19px] text-white mb-5 leading-[1.55]">Selon l&apos;auteur, quelle est la principale raison pour laquelle les nouveaux arrivants choisissent le Québec pour s&apos;établir ?</div>
              <div className="flex flex-col gap-2">
                {[
                  { l: "A", t: "Les opportunités d'emploi dans le secteur technologique" },
                  { l: "B", t: "La vitalité culturelle et la langue française comme langue commune", s: true },
                  { l: "C", t: "Le système de santé universel et les allocations familiales" },
                  { l: "D", t: "La proximité géographique avec les États-Unis" },
                ].map((o) => (
                  <div key={o.l} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-[1.5px] text-sm cursor-pointer transition-all ${o.s ? "border-gold bg-gold/10 text-white" : "border-white/8 bg-white/[0.046] text-white/68 hover:border-gold/33 hover:bg-gold/5 hover:text-white"}`}>
                    <div className="w-[26px] h-[26px] rounded-full border-[1.5px] border-current flex items-center justify-center text-xs font-bold shrink-0">{o.l}</div>{o.t}
                  </div>
                ))}
              </div>
              <div className="flex gap-2.5 mt-5">
                <button className="bg-transparent text-white font-semibold text-[13.5px] px-5 py-2.5 rounded-[10px] border-[1.5px] border-white/28 transition-all hover:border-gold hover:text-gold">
                  {t(UI["exam.prev"], lang)}
                </button>
                <button className="bg-gold text-navy font-bold text-[13.5px] px-6 py-2.5 rounded-[10px] transition-all hover:bg-gold-light">
                  {t(UI["exam.next"], lang)}
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/[0.046] border border-gold/17 rounded-xl p-5 mb-3">
                <div className="text-gold text-[11px] font-bold tracking-[2px] uppercase mb-3">{t(UI["exam.score"], lang)}</div>
                <div className="text-center mb-3"><div className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-white">B2</div><div className="text-[10px] text-white/38">{t(UI["exam.level"], lang)}</div></div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-white/46">{t(UI["exam.co"], lang)}</span><span className="text-gold">B2</span></div>
                  <div className="flex justify-between"><span className="text-white/46">{t(UI["exam.ee"], lang)}</span><span className="text-gold">B1</span></div>
                  <div className="flex justify-between"><span className="text-white/46">{t(UI["exam.eo"], lang)}</span><span className="text-white/30">{t(UI["exam.inprogress"], lang)}</span></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gold/13 to-gold/4 border border-gold/27 rounded-xl p-5 text-center">
                <div className="text-gold font-[family-name:var(--font-heading)] text-sm mb-1.5">🏆 {t(UI["exam.cert"], lang)}</div>
                <div className="text-white/42 text-xs leading-[1.5] mb-3">{t(UI["exam.certdesc"], lang)}</div>
              </div>
              <div className="bg-white/[0.046] border border-gold/17 rounded-xl p-5 mt-3">
                <div className="text-gold text-[11px] font-bold tracking-[2px] uppercase mb-2">{t(UI["exam.security"], lang)}</div>
                <div className="flex items-center gap-2 text-[13px] text-white/52"><span className="w-[9px] h-[9px] rounded-full bg-[#28c840] animate-blink shrink-0" />{t(UI["exam.proctor"], lang)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
