"use client";

import { VIDEOS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";

export default function VideoSection() {
  const { lang } = useLang();

  return (
    <div className="bg-navy py-22 px-7 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)]" />

      <div className="max-w-[1160px] mx-auto relative z-[1]">
        <div className="text-center mb-14">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">
            {t(UI["video.label"], lang)}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-[40px] text-white mb-3 leading-[1.15]">
            {t(UI["video.title1"], lang)}
            <br />
            <em className="text-gold italic">{t(UI["video.title2"], lang)}</em>
          </h2>
          <p className="text-[15.5px] text-white/48 max-w-[560px] mx-auto">
            {t(UI["video.desc"], lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 mb-5">
          <div>
            <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-[14px] bg-navy-mid border-[1.5px] border-gold/28">
              <iframe className="absolute inset-0 w-full h-full border-none rounded-[14px]" src={`https://www.youtube.com/embed/${VIDEOS[0].id}`} title={VIDEOS[0].title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="pt-4 px-0.5">
              <div className="inline-flex items-center gap-1.5 bg-gold text-navy text-[10px] font-bold px-3 py-1 rounded-full tracking-[1px] uppercase mb-2.5">{VIDEOS[0].chip}</div>
              <div className="font-[family-name:var(--font-heading)] text-xl text-white mb-2 leading-[1.3]">{VIDEOS[0].title}</div>
              <div className="text-[13px] text-white/46 leading-[1.7]">{VIDEOS[0].desc}</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {VIDEOS.slice(1, 3).map((v) => (
              <div key={v.id} className="bg-white/[0.042] border border-gold/16 rounded-2xl overflow-hidden transition-all hover:border-gold/42 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.25)] flex-1 flex flex-col">
                <div className="relative w-full pb-[52%] h-0 overflow-hidden rounded-t-2xl">
                  <iframe className="absolute inset-0 w-full h-full border-none rounded-t-2xl" src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <div className="p-3.5 flex-1">
                  <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1">{v.chip}</div>
                  <div className="text-[13.5px] font-semibold text-white leading-[1.4]">{v.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gold/7 border border-gold/20 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <div className="font-[family-name:var(--font-heading)] text-xl text-white">
              {t(UI["cta.ready"], lang)}{" "}
              <em className="text-gold italic">{t(UI["cta.canada"], lang)}</em> ?
            </div>
            <div className="text-[13.5px] text-white/45 mt-1">
              {t(UI["cta.join"], lang)}
            </div>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap">
            <a href="/tef" className="bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5">
              🎯 {t(UI["cta.start_tef"], lang)}
            </a>
            <a href="/formations" className="bg-transparent text-white font-semibold text-[15px] px-7 py-3 rounded-[10px] border-[1.5px] border-white/28 transition-all inline-flex items-center gap-2 hover:border-gold hover:text-gold">
              {t(UI["cta.see_formations"], lang)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
