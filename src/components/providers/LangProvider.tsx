"use client";

import { useState, useCallback, useEffect } from "react";
import { LangContext, LANGS, type Lang } from "@/lib/i18n";

function getSavedLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const saved = localStorage.getItem("arcadins-lang");
  if (saved && LANGS.includes(saved as Lang)) return saved as Lang;
  return "fr";
}

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  // Hydration : le SSR rend "fr", puis on synchronise avec la langue
  // sauvegardée (localStorage, indisponible côté serveur) après le montage.
  useEffect(() => {
    const saved = getSavedLang();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(saved);
    document.documentElement.lang = saved;
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    localStorage.setItem("arcadins-lang", l);
  }, []);

  return (
    <LangContext value={{ lang, setLang }}>
      {children}
    </LangContext>
  );
}
