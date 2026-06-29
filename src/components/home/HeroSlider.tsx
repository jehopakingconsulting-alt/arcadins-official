"use client";

import { useState, useEffect, useCallback } from "react";
import { SLIDES } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;
  const { lang } = useLang();

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden flex items-center justify-center bg-navy">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[7000ms] ease-out ${
              i === current ? "scale-100" : "scale-[1.06]"
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundColor: s.fallbackColor,
            }}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(105deg,rgba(6,15,28,0.90)_0%,rgba(13,27,46,0.78)_40%,rgba(13,27,46,0.62)_70%,rgba(6,15,28,0.80)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(0deg,rgba(6,15,28,0.88)_0%,transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 z-[2] opacity-[0.022] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[900px] px-6 md:px-10 text-center mx-auto">
        <div className="inline-flex items-center gap-2 bg-gold/12 border border-gold/36 px-5 py-2 rounded-full text-gold text-[11px] font-bold tracking-[2.5px] uppercase mb-7">
          <span className="w-[7px] h-[7px] rounded-full bg-gold animate-blink shrink-0" />
          {t(UI["hero.badge"], lang)}
        </div>

        <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-white mb-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.4)]">
          {t(UI["hero.title1"], lang)}
          <br />
          {t(UI["hero.title2"], lang)}{" "}
          <em className="text-gold italic">{t(UI["hero.title3"], lang)}</em>
        </h1>

        <p className="text-lg text-white/72 max-w-[700px] mx-auto mb-10 leading-[1.78] [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
          {t(UI["hero.desc"], lang)}
        </p>

        <div className="flex gap-4 justify-center flex-wrap mb-13">
          <a
            href="/formations"
            className="bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] transition-all inline-flex items-center gap-2 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(201,168,76,0.32)]"
          >
            🎓 {t(UI["hero.cta1"], lang)}
          </a>
          <a
            href="/formations"
            className="bg-transparent text-white font-semibold text-[15px] px-7 py-3 rounded-[10px] border-[1.5px] border-white/28 transition-all inline-flex items-center gap-2 hover:border-gold hover:text-gold"
          >
            {t(UI["hero.cta2"], lang)}
          </a>
        </div>

        <div className="inline-flex gap-6 md:gap-10 flex-wrap justify-center px-6 md:px-9 py-5 bg-white/6 backdrop-blur-[12px] border border-white/10 rounded-2xl">
          {[
            { n: "12,400", k: "stat.apprenants" },
            { n: "96%", k: "stat.reussite" },
            { n: "47", k: "stat.pays" },
            { n: "28", k: "stat.programmes" },
          ].map((s) => (
            <div key={s.k}>
              <div className="font-[family-name:var(--font-heading)] text-[26px] md:text-[30px] font-bold text-gold leading-none">
                {s.n}
              </div>
              <div className="text-[11px] text-white/50 mt-1 tracking-[0.5px]">
                {t(UI[s.k], lang)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button onClick={() => goTo(current - 1)} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-[50px] h-[50px] rounded-full bg-white/9 border border-white/18 backdrop-blur-[8px] text-white/75 text-xl flex items-center justify-center cursor-pointer transition-all hover:bg-gold/22 hover:border-gold/45 hover:text-gold hover:scale-[1.08]">←</button>
      <button onClick={() => goTo(current + 1)} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-[50px] h-[50px] rounded-full bg-white/9 border border-white/18 backdrop-blur-[8px] text-white/75 text-xl flex items-center justify-center cursor-pointer transition-all hover:bg-gold/22 hover:border-gold/45 hover:text-gold hover:scale-[1.08]">→</button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 items-center">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`transition-all rounded-full ${i === current ? "w-6 h-2 bg-gold rounded shadow-[0_0_8px_rgba(201,168,76,0.55)]" : "w-2 h-2 bg-white/35 hover:bg-white/60 hover:scale-[1.2]"}`} />
        ))}
      </div>

      {/* Slide label */}
      <div className="absolute bottom-10 left-10 z-20 hidden md:flex items-center gap-2.5 transition-all duration-600">
        <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-base shrink-0">{slide.labelIcon}</div>
        <div className="text-xs text-white/60 font-medium tracking-[0.5px]">{slide.labelText}</div>
      </div>
    </section>
  );
}
