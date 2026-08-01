"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LangContext, LANGS, type Lang } from "@/lib/i18n";
import { stripLocale, withLocale, isRoutedLocale } from "@/lib/i18n/locale-routing";

function setLocaleCookie(l: Lang) {
  document.cookie = `arcadins-lang=${l}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * LangProvider — fournit la locale à l'app. Initialise depuis la locale SERVEUR
 * (déduite de l'URL /fr/en/es ou du cookie par le middleware) → SSR cohérent + hreflang.
 * Le changement de langue met à jour l'URL (locales routées) + cookie + localStorage.
 * Rétro-compatible : sur une URL sans préfixe, la préférence localStorage reste appliquée.
 */
export default function LangProvider({ children, initialLang = "fr" }: { children: React.ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { locale: urlPrefix } = stripLocale(pathname || "/");
    if (urlPrefix) {
      // L'URL fait autorité (deep-link /fr /en /es). Synchronise localStorage/cookie/lang.
      localStorage.setItem("arcadins-lang", urlPrefix);
      setLocaleCookie(urlPrefix);
      document.documentElement.lang = urlPrefix;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (urlPrefix !== lang) setLangState(urlPrefix);
      return;
    }
    // URL sans préfixe : on respecte la préférence client (langues non routées incluses).
    const saved = localStorage.getItem("arcadins-lang");
    if (saved && LANGS.includes(saved as Lang) && saved !== lang) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved as Lang);
      document.documentElement.lang = saved;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    localStorage.setItem("arcadins-lang", l);
    setLocaleCookie(l);
    const { path } = stripLocale(pathname || "/");
    // Locales routées → l'URL reflète la langue (/fr /en /es). Autres langues → URL sans préfixe.
    router.push(isRoutedLocale(l) ? withLocale(l, path) : path);
  }, [pathname, router]);

  return (
    <LangContext value={{ lang, setLang }}>
      {children}
    </LangContext>
  );
}
