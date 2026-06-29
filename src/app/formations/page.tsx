"use client";

import { useState } from "react";
import { PROGRAMS, PROGRAM_CATEGORIES } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";
import Link from "next/link";

export default function FormationsPage() {
  const [filter, setFilter] = useState("all");
  const { lang } = useLang();
  const filtered = filter === "all" ? PROGRAMS : PROGRAMS.filter((p) => p.category === filter);

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="mb-13">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["form.label"], lang)}</p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-navy">
            {t(UI["form.title1"], lang)} <em className="text-gold italic">{t(UI["form.title2"], lang)}</em> {t(UI["form.title3"], lang)}
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap mb-9">
          {PROGRAM_CATEGORIES.map((cat) => (
            <button key={cat.key} onClick={() => setFilter(cat.key)} className={`px-5 py-2 rounded-full border-[1.5px] text-[13px] font-medium transition-all ${filter === cat.key ? "bg-navy text-gold border-navy" : "bg-white text-body border-gold/24 hover:bg-navy hover:text-gold hover:border-navy"}`}>
              {cat.icon} {cat.key === "all" ? t(UI["form.all"], lang) : cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/formations/${p.slug}`}
              className="bg-white rounded-[20px] overflow-hidden border border-gold/11 transition-all hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(13,27,46,0.1)] hover:border-gold/38 block"
            >
              <div className="p-6 pb-4">
                <div className="text-[32px] mb-3">{p.icon}</div>
                <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1.5">{p.categoryLabel}</div>
                <div className="font-[family-name:var(--font-heading)] text-lg font-bold text-navy mb-2 leading-[1.3]">{p.name}</div>
                <div className="text-[13px] text-muted leading-[1.65]">{p.description}</div>
              </div>
              <div className="px-6 py-3 border-t border-off-white flex items-center justify-between">
                <div className="flex gap-3">
                  <span className="text-xs text-muted">⏱ {p.duration}</span>
                  <span className="text-xs font-semibold text-gold">{p.price.toLocaleString()} CAD</span>
                </div>
                <span className="text-[13px] font-semibold text-navy transition-all hover:text-gold">
                  {t(UI["form.see"], lang)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
