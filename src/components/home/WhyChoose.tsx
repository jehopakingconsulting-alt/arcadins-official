"use client";

import Icon, { type IconName } from "@/components/ui/Icon";
import { useLang, t, UI } from "@/lib/i18n";

/**
 * « Pourquoi choisir ARCADINS ? » — 6 arguments de confiance, factuels et vérifiables
 * (aucune promesse de visa ni statistique non prouvée). Entièrement traduit (7 langues) :
 * les libellés passent par le dictionnaire i18n, jamais en dur.
 */
const REASONS: { icon: IconName; key: string }[] = [
  { icon: "clipboard", key: "1" },
  { icon: "cap", key: "2" },
  { icon: "chart", key: "3" },
  { icon: "globe", key: "4" },
  { icon: "star", key: "5" },
  { icon: "chat", key: "6" },
];

export default function WhyChoose() {
  const { lang } = useLang();

  return (
    <section className="bg-off-white py-[72px] px-7">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-11">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold-ink mb-2.5">{t(UI["why.label"], lang)}</p>
          <h2 className="font-[family-name:var(--font-heading)] text-[34px] md:text-[40px] text-navy">
            {t(UI["why.title1"], lang)} <em className="text-gold-ink italic">{t(UI["why.title2"], lang)}</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r) => (
            <div key={r.key} className="bg-white border border-gold/14 rounded-[20px] p-7 transition-all hover:border-gold/40 hover:shadow-[0_12px_34px_rgba(13,27,46,0.08)]">
              <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center mb-4">
                <Icon name={r.icon} size={22} />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-[18px] text-navy mb-2 leading-snug">
                {t(UI[`why.${r.key}.t`], lang)}
              </h3>
              <p className="text-[13.5px] text-muted leading-[1.7]">{t(UI[`why.${r.key}.d`], lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
