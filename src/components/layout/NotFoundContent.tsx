"use client";

import Link from "next/link";
import { useLang, t, UI } from "@/lib/i18n";

/**
 * Corps de la page 404, traduit (7 langues). Séparé de `not-found.tsx` car ce
 * dernier doit rester un server component pour exporter `metadata` — le contenu
 * visible, lui, a besoin du contexte de langue côté client.
 */
export default function NotFoundContent() {
  const { lang } = useLang();

  return (
    <main className="min-h-[70vh] bg-navy flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-[560px]">
        <p className="text-gold font-bold tracking-[4px] uppercase text-[12px] mb-4">{t(UI["nf.label"], lang)}</p>
        <h1 className="font-[family-name:var(--font-heading)] text-[34px] md:text-[42px] text-white mb-4 leading-tight">
          {t(UI["nf.title"], lang)}
        </h1>
        <p className="text-white/60 text-[15px] leading-[1.75] mb-9">{t(UI["nf.desc"], lang)}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="bg-gold text-navy font-bold text-[14px] px-6 py-3 rounded-[10px] transition-all hover:bg-gold-light">
            {t(UI["nf.home"], lang)}
          </Link>
          <Link href="/tef" className="bg-white/8 border border-gold/25 text-gold font-semibold text-[14px] px-6 py-3 rounded-[10px] transition-all hover:bg-white/12">
            {t(UI["nav.programs"], lang)}
          </Link>
          <Link href="/formations" className="bg-white/8 border border-gold/25 text-gold font-semibold text-[14px] px-6 py-3 rounded-[10px] transition-all hover:bg-white/12">
            {t(UI["nav.formations"], lang)}
          </Link>
        </div>
      </div>
    </main>
  );
}
