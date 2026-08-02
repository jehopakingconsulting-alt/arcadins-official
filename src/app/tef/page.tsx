"use client";

import { useLang, t, UI } from "@/lib/i18n";
import Link from "next/link";
import {
  TEF_COMPETENCIES,
  TEF_PREP_MODULES,
  TEF_NCLC_TABLE,
  TEF_AUDIENCE,
  TEF_STAGES,
  TEF_ADMISSION_STEPS,
  TEF_FAQ,
  TEF_ADMISSION_HREF,
  TEF_PRICING_HREF,
} from "@/lib/data/tef-program";
import { PROGRAM_CHECKOUT_UI_ENABLED } from "@/lib/config/launch-flags";

// Programme TEF Canada — Département A (Programmes officiels de langue). Page vitrine
// complète orientée conversion. Curriculum réel = plateforme de tutorat (/tutorat).
// CTA d'admission → /contact?programme=tef-canada (pas de paiement en ligne au lancement).
const JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Préparation au TEF Canada",
  description:
    "Programme de préparation au TEF Canada (Test d'Évaluation de Français) pour l'immigration au Canada : 4 compétences, 4 niveaux (NCLC 1–12), tutorat encadré et simulations.",
  provider: { "@type": "EducationalOrganization", name: "ARCADINS Training Center" },
  inLanguage: "fr",
  educationalCredentialAwarded: "Attestation de complétion ARCADINS (la préparation ne remplace pas le résultat officiel TEF Canada).",
};

export default function TefPage() {
  const { lang } = useLang();

  const checklist = [
    t(UI["tef.ck1"], lang), t(UI["tef.ck2"], lang), t(UI["tef.ck3"], lang),
    t(UI["tef.ck4"], lang), t(UI["tef.ck5"], lang), t(UI["tef.ck6"], lang), t(UI["tef.ck7"], lang),
  ];

  // CTA primaire : commerce self-service si activé (UI), sinon demande d'admission.
  const primaryCta = PROGRAM_CHECKOUT_UI_ENABLED
    ? { href: "/inscription?program=tef-canada", label: "Choisir mon forfait" }
    : { href: TEF_ADMISSION_HREF, label: "Demander mon admission" };

  return (
    <div className="bg-navy min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />

      <div className="max-w-[1200px] mx-auto px-7 pt-32 pb-20">
        {/* 1 — HERO */}
        <div className="mb-6">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["tef.label"], lang)}</p>
          <h1 className="font-[family-name:var(--font-heading)] text-[40px] md:text-[46px] text-white mb-4 leading-[1.12]">
            {t(UI["tef.title1"], lang)} <em className="text-gold italic">{t(UI["tef.title2"], lang)}</em>
            <br />{t(UI["tef.title3"], lang)}
          </h1>
          <p className="text-[17px] text-white/55 max-w-[640px] leading-[1.75] mb-7">{t(UI["tef.desc"], lang)}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={primaryCta.href} className="bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] inline-flex items-center gap-2 transition-all hover:bg-gold-light hover:-translate-y-0.5">
              {primaryCta.label} <span aria-hidden>→</span>
            </Link>
            <Link href="/tutorat" className="bg-transparent text-white font-semibold text-[15px] px-7 py-3.5 rounded-[10px] border-[1.5px] border-white/28 inline-flex items-center gap-2 transition-all hover:border-gold hover:text-gold">
              Découvrir la méthode de tutorat
            </Link>
          </div>
          <p className="text-[13px] text-white/45 mt-4">
            Vous préparez plutôt le TCF Canada ?{" "}
            <Link href="/tcf" className="text-gold font-semibold hover:underline">Découvrir le programme TCF Canada →</Link>
          </p>
        </div>

        {/* 2 — QU'EST-CE QUE LE TEF CANADA + POUR QUI */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 mt-14">
          <div className="bg-white/[0.04] border border-gold/16 rounded-[24px] p-8">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-3">Qu&apos;est-ce que le TEF Canada ?</p>
            <p className="text-[15px] text-white/70 leading-[1.8] mb-4">
              Le <strong className="text-white">TEF Canada</strong> (Test d&apos;Évaluation de Français) est un test de français
              reconnu par Immigration, Réfugiés et Citoyenneté Canada (IRCC) pour l&apos;immigration et la citoyenneté. Les
              résultats sont convertis en <strong className="text-white">niveaux NCLC</strong> utilisés notamment pour le
              système Entrée express.
            </p>
            <p className="text-[13.5px] text-white/45 leading-[1.7]">
              ARCADINS vous <strong className="text-white/70">prépare</strong> à cet examen — nous ne l&apos;administrons pas.
              Vous passez l&apos;épreuve officielle dans un centre agréé.
            </p>
          </div>
          <div className="bg-white/[0.04] border border-gold/16 rounded-[24px] p-8">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-4">À qui s&apos;adresse ce programme ?</p>
            <ul className="flex flex-col gap-2.5">
              {TEF_AUDIENCE.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-[13.5px] text-white/70 leading-[1.55]">
                  <span className="text-gold shrink-0 mt-0.5">✓</span>{a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3 — LES 4 COMPÉTENCES */}
        <div className="mt-16">
          <div className="text-center mb-9">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Structure de l&apos;examen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-[32px] text-white">Les 4 compétences évaluées</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEF_COMPETENCIES.map((c) => (
              <Link
                key={c.skill}
                href={`/tutorat/${c.skill}/${c.entryLevel}`}
                className="group bg-white/[0.044] border border-gold/17 rounded-[22px] p-6 flex flex-col transition-all hover:-translate-y-1 hover:border-gold/45"
              >
                <div className="text-[30px] mb-3">{c.icon}</div>
                <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1.5">{c.abbr}</div>
                <div className="font-[family-name:var(--font-heading)] text-[18px] text-white mb-2 leading-tight">{c.name}</div>
                <div className="text-[12px] text-gold/85 font-semibold">{c.format}</div>
                <div className="text-[11px] text-white/40 mb-2.5">{c.nclc}</div>
                <p className="text-[13px] text-white/55 leading-[1.6] flex-1">{c.focus}</p>
                <span className="text-[13px] font-semibold text-white/70 mt-4 group-hover:text-gold transition-all">Travailler cette compétence →</span>
              </Link>
            ))}
          </div>

          {/* Modules de préparation complémentaires */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {TEF_PREP_MODULES.map((m) => (
              <div key={m.title} className="bg-white/[0.044] border border-gold/17 rounded-[22px] p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/12 border border-gold/25 flex items-center justify-center text-2xl shrink-0" aria-hidden>{m.icon}</div>
                <div>
                  <div className="font-[family-name:var(--font-heading)] text-[17px] text-white mb-1.5 leading-tight">{m.title}</div>
                  <p className="text-[13px] text-white/55 leading-[1.6]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3b — BARÈME NCLC pour Entrée express */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Barème NCLC</p>
            <h2 className="font-[family-name:var(--font-heading)] text-[30px] text-white mb-2">Comprendre les niveaux NCLC pour Entrée express</h2>
            <p className="text-[15px] text-white/50 max-w-[560px] mx-auto">Chaque compétence du TEF Canada est convertie en niveau NCLC — voici les seuils clés pour l&apos;immigration.</p>
          </div>
          <div className="overflow-x-auto rounded-[20px] border border-gold/17">
            <table className="w-full text-left border-collapse min-w-[520px]">
              <thead>
                <tr className="bg-white/[0.05]">
                  {TEF_NCLC_TABLE.headers.map((h) => (
                    <th key={h} className="text-[12.5px] font-bold text-gold px-5 py-3.5 tracking-[0.5px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TEF_NCLC_TABLE.rows.map((r, i) => (
                  <tr key={r.level} className={i % 2 ? "bg-white/[0.015]" : ""}>
                    <td className="text-[13.5px] font-semibold text-white px-5 py-3.5 border-t border-white/[0.06]">{r.level}</td>
                    <td className="text-[13.5px] text-white/70 px-5 py-3.5 border-t border-white/[0.06]">{r.co}</td>
                    <td className="text-[13.5px] text-white/70 px-5 py-3.5 border-t border-white/[0.06]">{r.ce}</td>
                    <td className="text-[13.5px] text-white/70 px-5 py-3.5 border-t border-white/[0.06]">{r.eo}</td>
                    <td className="text-[13.5px] text-white/70 px-5 py-3.5 border-t border-white/[0.06]">{r.ee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-white/40 mt-3">* {TEF_NCLC_TABLE.note}</p>
        </div>

        {/* 4 — MÉTHODE (panneau réutilisé) + 5 PARCOURS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 items-start">
          <div className="bg-white/[0.04] border border-gold/17 rounded-[28px] p-8">
            <div className="font-[family-name:var(--font-heading)] text-[22px] text-gold mb-1">{t(UI["tef.panel.title"], lang)}</div>
            <div className="text-[13.5px] text-white/46 mb-6">{t(UI["tef.panel.sub"], lang)}</div>
            <ul>
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 py-2.5 border-b border-white/[0.054] text-sm text-white/72">
                  <span className="w-5 h-5 rounded-full bg-gold/17 text-gold flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/[0.04] border border-gold/17 rounded-[28px] p-8">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-4">Le parcours de préparation</p>
            <div className="flex flex-col gap-3.5">
              {TEF_STAGES.map((s) => (
                <div key={s.n} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-gold text-navy font-[family-name:var(--font-heading)] text-base font-bold flex items-center justify-center shrink-0">{s.n}</div>
                  <div>
                    <div className="text-[15px] font-semibold text-white leading-tight">{s.title}</div>
                    <div className="text-[13px] text-white/55 leading-[1.55] mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/tutorat" className="inline-flex items-center gap-2 mt-6 text-gold font-semibold text-[14px] hover:underline">
              Explorer la plateforme de tutorat →
            </Link>
          </div>
        </div>

        {/* 6 — TARIFICATION (séparée, renvoi vers /tarifs Dept A) */}
        <div className="mt-16 bg-gold/[0.06] border border-gold/25 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-2">Forfaits de préparation</p>
            <h3 className="font-[family-name:var(--font-heading)] text-[24px] text-white mb-2">Des plans dédiés au TEF & TCF</h3>
            <p className="text-[14px] text-white/55 max-w-[520px] leading-[1.6]">
              Starter, Essential, Premium et VIP — une tarification propre aux Programmes officiels de langue,
              distincte des formations professionnelles.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href={TEF_PRICING_HREF} className="bg-gold text-navy font-bold text-[14.5px] px-7 py-3.5 rounded-[10px] text-center transition-all hover:bg-gold-light hover:-translate-y-0.5">Voir les forfaits</Link>
            <Link href={TEF_ADMISSION_HREF} className="bg-transparent text-gold font-semibold text-[14.5px] px-7 py-3.5 rounded-[10px] border-[1.5px] border-gold/40 text-center transition-all hover:bg-gold/10">Demander une évaluation</Link>
          </div>
        </div>

        {/* 7 — PROCESSUS D'ADMISSION */}
        <div className="mt-16">
          <div className="text-center mb-9">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Admission</p>
            <h2 className="font-[family-name:var(--font-heading)] text-[32px] text-white">Comment rejoindre le programme</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEF_ADMISSION_STEPS.map((s) => (
              <div key={s.n} className="bg-white/[0.04] border border-gold/16 rounded-[20px] p-6">
                <div className="w-10 h-10 rounded-full bg-gold text-navy font-[family-name:var(--font-heading)] text-lg font-bold flex items-center justify-center mb-4">{s.n}</div>
                <div className="text-[15px] font-semibold text-white mb-1.5 leading-tight">{s.title}</div>
                <div className="text-[13px] text-white/55 leading-[1.6]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 8 — FAQ (accordéon natif accessible) */}
        <div className="mt-16 max-w-[820px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Questions fréquentes</p>
            <h2 className="font-[family-name:var(--font-heading)] text-[30px] text-white">TEF Canada — vos questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {TEF_FAQ.map((f) => (
              <details key={f.q} className="group bg-white/[0.04] border border-gold/16 rounded-2xl px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-[15px] font-semibold text-white">
                  {f.q}
                  <span className="text-gold shrink-0 transition-transform group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <p className="text-[14px] text-white/60 leading-[1.75] mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* 9 — CTA FINAL */}
        <div className="mt-16 bg-white/[0.04] border border-gold/20 rounded-[28px] p-9 md:p-12 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[34px] text-white mb-3">Prêt à préparer votre TEF Canada ?</h2>
          <p className="text-white/55 text-[15px] mb-7 max-w-[560px] mx-auto">Faites votre demande d&apos;admission : un conseiller évalue votre profil et vous propose un plan de préparation adapté à votre objectif d&apos;immigration.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={primaryCta.href} className="bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">{primaryCta.label} →</Link>
            <Link href="/tutorat" className="bg-transparent text-white font-semibold text-[15px] px-7 py-3.5 rounded-[10px] border-[1.5px] border-white/28 transition-all hover:border-gold hover:text-gold">Découvrir le tutorat</Link>
          </div>
        </div>

        {/* 10 — CLAUSE DE NON-RESPONSABILITÉ */}
        <div className="mt-10 bg-white/[0.03] border border-gold/12 rounded-2xl p-5">
          <p className="text-[12.5px] text-white/55 leading-[1.7]">
            <strong className="text-gold">ⓘ </strong>{t(UI["legal.exam.disclaimer"], lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
