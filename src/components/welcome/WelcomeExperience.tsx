"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLang, t, type Lang } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { WELCOME as W, WELCOME_CARDS, WELCOME_LANG_CHOICES, type WelcomeCard } from "@/lib/welcome/welcome-content";

const STORAGE_KEY = "arcadins-welcome-v1";
const PLACEMENT_KEY = "arcadins-placement-done";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const LANG_LABELS: Record<Lang, string> = { fr: "FR", en: "EN", es: "ES", it: "IT", pt: "PT", de: "DE", ht: "HT" };

/** Le welcome ne s'affiche jamais pendant un flux (auth, tableau de bord, admin). */
function isSuppressedPath(pathname: string): boolean {
  return /^\/(auth|dashboard|admin|inscription)(\/|$)/.test(pathname);
}

/** Éligible : jamais vu, ou dernière fermeture > 30 jours. « never » = ne plus afficher. */
function isEligible(): boolean {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) return true;
    if (v === "never") return false;
    const ts = Number(v);
    if (!Number.isFinite(ts)) return true;
    return Date.now() - ts > THIRTY_DAYS_MS;
  } catch {
    return false; // localStorage indisponible → ne pas gêner
  }
}

export default function WelcomeExperience() {
  const { lang, setLang } = useLang();
  const pathname = usePathname() || "/";

  const [mounted, setMounted] = useState(false); // présent dans le DOM
  const [shown, setShown] = useState(false); // classes d'entrée (opacity/scale)
  const [authed, setAuthed] = useState(false);
  const [placementDone, setPlacementDone] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Décision d'affichage (client uniquement → aucun SSR/CLS/SEO).
  useEffect(() => {
    if (isSuppressedPath(pathname)) return;
    if (!isEligible()) return;
    let cancelled = false;
    (async () => {
      let isAuthed = false;
      try {
        const { data } = await createClient().auth.getUser();
        isAuthed = !!data.user;
      } catch {
        isAuthed = false; // hors-ligne / non configuré → invité
      }
      let done = false;
      try {
        done = localStorage.getItem(PLACEMENT_KEY) === "true";
      } catch {
        /* noop */
      }
      if (cancelled) return;
      setPlacementDone(done);
      setAuthed(isAuthed);
      lastFocused.current = (document.activeElement as HTMLElement) || null;
      setMounted(true);
      // Entrée douce (< 250 ms d'animation, court délai premium).
      requestAnimationFrame(() => {
        if (!cancelled) setShown(true);
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const dismiss = useCallback((value: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* noop */
    }
    setShown(false);
    window.setTimeout(() => {
      setMounted(false);
      lastFocused.current?.focus?.();
    }, 220);
  }, []);

  const closeFor30Days = useCallback(() => dismiss(String(Date.now())), [dismiss]);
  const closeForever = useCallback(() => dismiss("never"), [dismiss]);

  // Verrou du scroll + Escape + focus initial + piège à focus.
  useEffect(() => {
    if (!mounted) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    // Focus initial sur le panneau (annoncé par le lecteur d'écran).
    window.setTimeout(() => panel?.focus(), 30);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeFor30Days();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, closeFor30Days]);

  if (!mounted) return null;

  const cards: WelcomeCard[] = WELCOME_CARDS.filter((c) =>
    c.guestOnly ? !authed : c.authOnly ? authed : true
  );

  return (
    <div
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeFor30Days();
      }}
      className={`fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-6 bg-navy/88 backdrop-blur-[8px] transition-opacity duration-200 ease-out motion-reduce:transition-none ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        aria-describedby="welcome-sub"
        tabIndex={-1}
        className={`relative w-full max-w-[880px] max-h-[92vh] overflow-y-auto rounded-[28px] border border-gold/25 bg-navy shadow-[0_30px_90px_rgba(0,0,0,0.55)] outline-none transition-all duration-200 ease-out motion-reduce:transition-none ${
          shown ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-[0.97]"
        }`}
      >
        {/* Halo doré discret en haut */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 rounded-t-[28px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(201,168,76,0.18),transparent_70%)]"
        />

        {/* Fermer */}
        <button
          type="button"
          onClick={closeFor30Days}
          aria-label={t(W.close, lang)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/8 text-white/70 flex items-center justify-center transition-colors duration-150 hover:bg-white/15 hover:text-gold focus-visible:ring-2 focus-visible:ring-gold outline-none"
        >
          ✕
        </button>

        <div className="relative px-6 sm:px-9 pt-9 pb-7">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gold/12 border border-gold/25 flex items-center justify-center text-[28px] leading-none" aria-hidden="true">
              👋
            </div>
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-1.5">{t(W.greeting, lang)}</p>
            <h2 id="welcome-title" className="font-[family-name:var(--font-heading)] text-[27px] sm:text-[32px] text-white leading-tight mb-3">
              ARCADINS Training Center
            </h2>
            <p id="welcome-sub" className="text-[14.5px] text-white/55 leading-[1.6] max-w-[520px] mx-auto">
              {t(W.subtitle, lang)}
            </p>
          </div>

          {/* Cartes d'action */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cards.map((card) => {
              const showBadge = card.recommendable && !placementDone;
              return (
                <Link
                  key={card.id}
                  href={card.href}
                  onClick={closeFor30Days}
                  aria-label={`${t(W[card.titleKey], lang)} — ${t(W[card.ctaKey], lang)}`}
                  className={`group relative flex flex-col rounded-2xl border p-4 text-left transition-all duration-200 ease-out outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-gold ${
                    showBadge
                      ? "border-gold/60 bg-gold/[0.07] hover:border-gold"
                      : "border-gold/18 bg-white/[0.05] hover:border-gold/50 hover:bg-white/[0.08]"
                  }`}
                >
                  {showBadge && (
                    <span className="absolute -top-2.5 left-4 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[1px] text-navy shadow-sm">
                      ★ {t(W.recommended, lang)}
                    </span>
                  )}
                  <span className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/12 text-[22px] leading-none" aria-hidden="true">
                    {card.emoji}
                  </span>
                  <span className="font-[family-name:var(--font-heading)] text-[15.5px] leading-snug text-white mb-1">
                    {t(W[card.titleKey], lang)}
                  </span>
                  {card.descKey && (
                    <span className="text-[12.5px] leading-[1.5] text-white/50 mb-2.5">{t(W[card.descKey], lang)}</span>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-bold text-gold pt-1">
                    {t(W[card.ctaKey], lang)}
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Sélecteur de langue */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] uppercase tracking-[2px] text-white/35 mr-1">{t(W.langLabel, lang)}</span>
            {WELCOME_LANG_CHOICES.map((l) => {
              const active = l === lang;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={active}
                  aria-label={LANG_LABELS[l]}
                  className={`min-w-[40px] rounded-lg border px-2.5 py-1 text-[12px] font-bold transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    active
                      ? "border-gold bg-gold text-navy"
                      : "border-white/12 text-white/55 hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col-reverse items-center justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={closeForever}
              className="text-[12.5px] text-white/40 underline-offset-4 transition-colors duration-150 hover:text-white/70 hover:underline focus-visible:ring-2 focus-visible:ring-gold outline-none rounded"
            >
              {t(W.dontShow, lang)}
            </button>
            <button
              type="button"
              onClick={closeFor30Days}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2 text-[13px] font-semibold text-white/75 transition-colors duration-150 hover:border-gold/50 hover:text-gold focus-visible:ring-2 focus-visible:ring-gold outline-none"
            >
              {t(W.skip, lang)} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
