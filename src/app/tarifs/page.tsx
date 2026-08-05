"use client";

import { PROGRAMS, PAYMENT_METHODS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";
import { getInstallmentPlan, REGISTRATION_FEE, formatPrice } from "@/lib/pricing";
import { PROGRAM_PLANS, PROGRAM_PLANS_NOTE } from "@/lib/data/program-plans";
import Link from "next/link";

export default function TarifsPage() {
  const { lang } = useLang();
  const activeCourses = PROGRAMS.filter((p) => !p.comingSoon);

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20 px-7">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["tarifs.label"], lang)}</p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-white mb-4">
            {t(UI["tarifs.title1"], lang)}<br />{t(UI["tarifs.title2"], lang)} <em className="text-gold italic">{t(UI["tarifs.title3"], lang)}</em>
          </h1>
          <p className="text-[17px] text-white/50 max-w-[500px] mx-auto">{t(UI["tarifs.desc"], lang)}</p>
        </div>

        {/* ══ DÉPARTEMENT A — Programmes officiels de langue (Tutorat TEF & TCF) ══ */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Programmes officiels de langue</p>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl text-white mb-2">Tutorat TEF &amp; TCF Canada</h3>
          <p className="text-[15px] text-white/50 max-w-[560px] mx-auto">Choisissez votre plan de préparation en ligne — du niveau débutant au supérieur, par compétence.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROGRAM_PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`relative bg-white/[0.044] rounded-[24px] p-7 flex flex-col transition-all hover:-translate-y-1 border ${plan.popular ? "border-gold" : "border-gold/17 hover:border-gold/44"}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy text-[10px] font-bold px-3 py-1 rounded-full tracking-[1px] uppercase whitespace-nowrap">★ Plus populaire</span>
              )}
              <div className="text-[11px] font-bold tracking-[2px] uppercase text-gold mb-3">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-[family-name:var(--font-heading)] text-[40px] font-bold text-gold leading-none">${plan.price}</span>
                <span className="text-white/50 text-sm">{plan.currency}</span>
              </div>
              <div className="text-[12px] text-white/45 mb-3">⏱ Accès {plan.accessWeeks} semaines</div>
              <p className="text-[13px] text-white/55 leading-[1.55] mb-5 min-h-[42px]">{plan.tagline}</p>
              <ul className="space-y-1.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className={`flex items-start gap-2 text-[12.5px] leading-[1.5] ${f.included ? "text-white/75" : "text-white/30"}`}>
                    <span className={`shrink-0 mt-[1px] ${f.included ? "text-gold" : "text-white/25"}`}>{f.included ? "✓" : "✕"}</span>{f.text}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?programme=tef-canada&plan=${plan.key}`}
                className={`block w-full py-3 rounded-[9px] font-bold text-[14px] text-center transition-all ${plan.popular ? "bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5" : "bg-transparent text-gold border-[1.5px] border-gold/43 hover:bg-gold/10 hover:border-gold"}`}
              >
                Choisir {plan.name} →
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-[12.5px] text-white/40 mt-5 max-w-[760px] mx-auto">{PROGRAM_PLANS_NOTE}</p>

        {/* Séparateur — deux départements de tarification distincts */}
        <div className="border-t border-white/10 my-14" />

        {/* ══ DÉPARTEMENT B — Formations professionnelles ══ */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Formations professionnelles</p>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl text-white mb-2">Développement professionnel</h3>
          <p className="text-[15px] text-white/50 max-w-[560px] mx-auto">9 formations de 24 semaines avec attestation de complétion — tarification distincte des programmes de langue.</p>
        </div>

        {/* Courses pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCourses.map((course) => {
            const name = UI[`c.${course.slug}`] ? t(UI[`c.${course.slug}`], lang) : course.name;
            const desc = UI[`cd.${course.slug}`] ? t(UI[`cd.${course.slug}`], lang) : course.description;
            return (
            <div
              key={course.id}
              className="bg-white/[0.044] border border-gold/17 rounded-[28px] p-8 transition-all hover:-translate-y-1 hover:border-gold/44 flex flex-col"
            >
              <div className="text-3xl mb-3">{course.icon}</div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1.5">
                {course.categoryLabel} · 24 semaines
              </div>
              <div className="font-[family-name:var(--font-heading)] text-xl text-white mb-2 leading-[1.3]">
                {name}
              </div>
              <p className="text-[13px] text-white/48 leading-[1.65] mb-6 flex-1">
                {desc}
              </p>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[15px] text-white/50">CAD</span>
                <span className="font-[family-name:var(--font-heading)] text-[40px] font-bold text-gold leading-none">
                  {formatPrice(course.price)}
                </span>
              </div>
              <div className="text-[11.5px] text-white/40 mb-5">
                + {REGISTRATION_FEE}$ inscription (séparés) · puis complet ou 3× ({getInstallmentPlan(course.price).installments.map((v) => `${v}$`).join(", ")})
              </div>

              <ul className="mb-6 space-y-0">
                {[
                  { text: "Formation complète 24 semaines", included: true },
                  { text: "Attestation de complétion incluse", included: true },
                  { text: "8 modules progressifs", included: true },
                  { text: "Support multilingue", included: true },
                  { text: "Accès 100% en ligne", included: true },
                ].map((f) => (
                  <li key={f.text} className="flex items-start gap-2 py-[6px] border-b border-white/[0.06] text-[13px] text-white/70">
                    <span className="text-gold text-sm shrink-0 mt-0.5">✓</span>{f.text}
                  </li>
                ))}
              </ul>

              <Link
                href={`/formations/${course.slug}`}
                className="block w-full py-3.5 rounded-[9px] font-bold text-[14.5px] text-center transition-all bg-transparent text-gold border-[1.5px] border-gold/43 hover:bg-gold/10 hover:border-gold"
              >
                {t(UI["form.see"], lang)}
              </Link>
            </div>
          );
          })}
        </div>

        {/* Enterprise card */}
        <div className="mt-8 bg-gold rounded-[28px] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-block text-[10.5px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full mb-3 bg-navy/18 text-navy">
              Institutions
            </div>
            <div className="font-[family-name:var(--font-heading)] text-3xl text-navy mb-2">
              Forfait Entreprise
            </div>
            <p className="text-navy/70 text-[15px] max-w-[500px] leading-[1.65]">
              Pour les écoles, entreprises, gouvernements et organismes. Licences multi-utilisateurs, LMS whitelabel, formateurs dédiés et programmes sur mesure.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-navy text-gold font-bold text-[15px] px-10 py-4 rounded-[10px] transition-all hover:bg-navy-mid shrink-0"
          >
            Nous contacter →
          </Link>
        </div>

        {/* Payment methods */}
        <div className="text-center mt-9">
          <p className="text-white/36 text-[13px]">{t(UI["tarifs.payments"], lang)}</p>
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            {PAYMENT_METHODS.map((m) => (<span key={m} className="bg-white/[0.055] border border-gold/17 rounded-md px-3 py-[5px] text-xs text-white/52">{m}</span>))}
          </div>
        </div>
      </div>
    </div>
  );
}
