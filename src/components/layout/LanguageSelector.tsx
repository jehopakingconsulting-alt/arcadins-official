"use client";

import { useState, useRef, useEffect } from "react";
import { useLang, LANGS, type Lang } from "@/lib/i18n";

const LANG_LABELS: Record<Lang, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  de: "Deutsch",
  ht: "Kreyòl",
};

const LANG_FLAGS: Record<Lang, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  es: "🇪🇸",
  it: "🇮🇹",
  pt: "🇵🇹",
  de: "🇩🇪",
  ht: "🇭🇹",
};

export default function LanguageSelector() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <>
      {/* Desktop: inline pills */}
      <div className="hidden sm:flex gap-1">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-2 py-0.5 rounded-full border-[1.5px] text-[10.5px] font-bold transition-all font-[family-name:var(--font-body)] ${
              lang === l
                ? "bg-navy text-gold border-navy"
                : "bg-transparent text-navy border-navy/40 hover:bg-navy hover:text-gold hover:border-navy"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className="relative sm:hidden" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border-[1.5px] border-navy/40 text-navy text-[10.5px] font-bold bg-transparent"
        >
          {LANG_FLAGS[lang]} {lang.toUpperCase()}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={`w-2.5 h-2.5 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-1.5 z-50 bg-navy border border-gold/25 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.4)] overflow-hidden min-w-[150px]">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-left transition-all ${
                  lang === l
                    ? "bg-gold/15 text-gold"
                    : "text-white/75 hover:bg-gold/10 hover:text-gold"
                }`}
              >
                <span>{LANG_FLAGS[l]}</span>
                <span>{LANG_LABELS[l]}</span>
                {lang === l && <span className="ml-auto text-gold">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
