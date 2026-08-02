import Link from "next/link";
import {
  TCF_COMPETENCIES,
  TCF_PREP_MODULES,
  TCF_LEVEL_TABLE,
  TCF_AUDIENCE,
  TCF_VS_TEF,
  TCF_STAGES,
  TCF_METHOD,
  TCF_ADMISSION_STEPS,
  TCF_FAQ,
  TCF_ADMISSION_HREF,
  TCF_PRICING_HREF,
} from "@/lib/data/tcf-program";

/**
 * Programme TCF Canada — Département A (Programmes officiels de langue).
 * Page vitrine complète orientée conversion, DISTINCTE du TEF Canada.
 * Composant SERVEUR (contenu français, meilleur SEO, aucun risque d'hydratation) :
 * l'accordéon FAQ utilise <details> natif ; aucun état client requis.
 * Curriculum réel = plateforme de tutorat mutualisée (/tutorat).
 * CTA d'admission → /contact?programme=tcf-canada (pas de paiement en ligne au lancement).
 */
const JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Préparation au TCF Canada",
  description:
    "Programme de préparation au TCF Canada (Test de Connaissance du Français) pour l'immigration au Canada et au Québec : 4 épreuves (CO, CE, EE, EO), tutorat encadré, préparation PEQ et simulations. ARCADINS prépare à l'examen, elle ne l'administre pas.",
  provider: { "@type": "EducationalOrganization", name: "ARCADINS Training Center" },
  inLanguage: "fr",
  educationalCredentialAwarded:
    "Attestation de complétion ARCADINS (la préparation ne remplace pas le résultat officiel du TCF Canada).",
};

export default function TcfPage() {
  return (
    <div className="bg-navy min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />

      <div className="max-w-[1200px] mx-auto px-7 pt-32 pb-20">
        {/* 1 — HERO */}
        <div className="mb-6">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">
            Programmes officiels de langue · TCF Canada
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[40px] md:text-[46px] text-white mb-4 leading-[1.12]">
            Préparez le <em className="text-gold italic">TCF Canada</em>
            <br />pour l&apos;immigration au Canada et au Québec
          </h1>
          <p className="text-[17px] text-white/55 max-w-[660px] leading-[1.75] mb-7">
            Un programme structuré, compétence par compétence, pour préparer les 4 épreuves du TCF Canada —
            reconnu par IRCC (fédéral) et par le MIFI (Québec), y compris pour le Programme de l&apos;expérience québécoise (PEQ).
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={TCF_ADMISSION_HREF} className="bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] inline-flex items-center gap-2 transition-all hover:bg-gold-light hover:-translate-y-0.5">
              Demander mon admission <span aria-hidden>→</span>
            </Link>
            <Link href="/tutorat" className="bg-transparent text-white font-semibold text-[15px] px-7 py-3.5 rounded-[10px] border-[1.5px] border-white/28 inline-flex items-center gap-2 transition-all hover:border-gold hover:text-gold">
              Découvrir la méthode de tutorat
            </Link>
          </div>
        </div>

        {/* 2 — QU'EST-CE QUE LE TCF CANADA + 3 — POUR QUI */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 mt-14">
          <div className="bg-white/[0.04] border border-gold/16 rounded-[24px] p-8">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-3">Qu&apos;est-ce que le TCF Canada ?</p>
            <p className="text-[15px] text-white/70 leading-[1.8] mb-4">
              Le <strong className="text-white">TCF Canada</strong> (Test de Connaissance du Français pour le Canada) est
              organisé par <strong className="text-white">France Éducation international</strong>. Il est reconnu par
              Immigration, Réfugiés et Citoyenneté Canada (<strong className="text-white">IRCC</strong>) pour l&apos;immigration
              fédérale et par le <strong className="text-white">MIFI</strong> pour les programmes d&apos;immigration du Québec. Les
              résultats sont exprimés en niveaux <strong className="text-white">CECRL</strong> et convertis en <strong className="text-white">NCLC</strong>.
            </p>
            <p className="text-[13.5px] text-white/45 leading-[1.7]">
              ARCADINS vous <strong className="text-white/70">prépare</strong> à cet examen — nous ne l&apos;administrons pas.
              Vous passez l&apos;épreuve officielle dans un centre agréé.
            </p>
          </div>
          <div className="bg-white/[0.04] border border-gold/16 rounded-[24px] p-8">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-4">À qui s&apos;adresse ce programme ?</p>
            <ul className="flex flex-col gap-2.5">
              {TCF_AUDIENCE.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-[13.5px] text-white/70 leading-[1.55]">
                  <span className="text-gold shrink-0 mt-0.5">✓</span>{a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 — LES 4 COMPÉTENCES (épreuves) */}
        <div className="mt-16">
          <div className="text-center mb-9">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Structure de l&apos;examen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-[32px] text-white">Les 4 épreuves du TCF Canada</h2>
            <p className="text-[15px] text-white/50 max-w-[620px] mx-auto mt-3">
              Le TCF Canada évalue quatre compétences. Chacune se travaille dans la plateforme de tutorat,
              du niveau Fondation au niveau Supérieur.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TCF_COMPETENCIES.map((c) => (
              <Link
                key={c.skill}
                href={`/tutorat/${c.skill}/${c.entryLevel}`}
                className="group bg-white/[0.044] border border-gold/17 rounded-[22px] p-6 flex flex-col transition-all hover:-translate-y-1 hover:border-gold/45"
              >
                <div className="text-[30px] mb-3">{c.icon}</div>
                <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1.5">{c.abbr}</div>
                <div className="font-[family-name:var(--font-heading)] text-[18px] text-white mb-2 leading-tight">{c.name}</div>
                <div className="text-[12px] text-gold/85 font-semibold">{c.format}</div>
                <div className="text-[11px] text-white/40 mb-2.5">{c.scale}</div>
                <p className="text-[13px] text-white/55 leading-[1.6] flex-1">{c.focus}</p>
                <span className="text-[13px] font-semibold text-white/70 mt-4 group-hover:text-gold transition-all">Travailler cette compétence →</span>
              </Link>
            ))}
          </div>
          <p className="text-[12px] text-white/40 mt-4">
            * Formats et durées indicatifs — vérifiez le format en vigueur sur le site officiel de France Éducation international.
            Le TCF Canada ne comporte pas d&apos;épreuve de « maîtrise des structures de la langue » (MSL).
          </p>

          {/* Modules de préparation complémentaires (spécifiques TCF) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            {TCF_PREP_MODULES.map((m) => (
              <div key={m.title} className="bg-white/[0.044] border border-gold/17 rounded-[22px] p-6">
                <div className="w-12 h-12 rounded-2xl bg-gold/12 border border-gold/25 flex items-center justify-center text-2xl mb-4" aria-hidden>{m.icon}</div>
                <div className="font-[family-name:var(--font-heading)] text-[17px] text-white mb-1.5 leading-tight">{m.title}</div>
                <p className="text-[13px] text-white/55 leading-[1.6]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 — MÉTHODE + 6 — CURRICULUM / PROGRESSION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 items-start">
          <div className="bg-white/[0.04] border border-gold/17 rounded-[28px] p-8">
            <div className="font-[family-name:var(--font-heading)] text-[22px] text-gold mb-1">La méthode de préparation TCF Canada</div>
            <div className="text-[13.5px] text-white/46 mb-6">Fondations de langue mutualisées, appliquées au format spécifique du TCF Canada.</div>
            <ul>
              {TCF_METHOD.map((item) => (
                <li key={item} className="flex items-start gap-3 py-2.5 border-b border-white/[0.054] text-sm text-white/72">
                  <span className="w-5 h-5 rounded-full bg-gold/17 text-gold flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/[0.04] border border-gold/17 rounded-[28px] p-8">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-4">Le parcours de préparation</p>
            <div className="flex flex-col gap-3.5">
              {TCF_STAGES.map((s) => (
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

        {/* 7 — PRATIQUE & SIMULATIONS + interprétation des scores (CECRL ↔ NCLC) */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Scores & simulations</p>
            <h2 className="font-[family-name:var(--font-heading)] text-[30px] text-white mb-2">Comprendre vos niveaux CECRL et NCLC</h2>
            <p className="text-[15px] text-white/50 max-w-[600px] mx-auto">
              Le TCF Canada situe chaque compétence sur l&apos;échelle CECRL (A1–C2), convertie en NCLC pour l&apos;immigration.
              Voici des repères de lecture.
            </p>
          </div>
          <div className="overflow-x-auto rounded-[20px] border border-gold/17">
            <table className="w-full text-left border-collapse min-w-[520px]">
              <thead>
                <tr className="bg-white/[0.05]">
                  {TCF_LEVEL_TABLE.headers.map((h) => (
                    <th key={h} className="text-[12.5px] font-bold text-gold px-5 py-3.5 tracking-[0.5px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TCF_LEVEL_TABLE.rows.map((r, i) => (
                  <tr key={r.cecrl} className={i % 2 ? "bg-white/[0.015]" : ""}>
                    <td className="text-[13.5px] font-semibold text-white px-5 py-3.5 border-t border-white/[0.06]">{r.cecrl}</td>
                    <td className="text-[13.5px] text-white/70 px-5 py-3.5 border-t border-white/[0.06]">{r.nclc}</td>
                    <td className="text-[13.5px] text-white/70 px-5 py-3.5 border-t border-white/[0.06]">{r.repere}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-white/40 mt-3">* {TCF_LEVEL_TABLE.note}</p>
          <div className="mt-5 bg-white/[0.03] border border-gold/12 rounded-2xl p-5">
            <p className="text-[13px] text-white/60 leading-[1.7]">
              <strong className="text-gold">Pratique &amp; simulations —</strong> les exercices d&apos;entraînement et les simulations
              chronométrées sont progressifs et proches du format réel. Ils sont <strong className="text-white/80">indicatifs</strong> et
              ne constituent pas l&apos;examen officiel. L&apos;accès complet aux simulations encadrées se fait après admission, selon votre forfait.
            </p>
          </div>
        </div>

        {/* TCF ≠ TEF — séparation explicite + lien croisé */}
        <div className="mt-16 bg-white/[0.04] border border-gold/16 rounded-[24px] p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-2">TCF Canada en bref</p>
              <h3 className="font-[family-name:var(--font-heading)] text-[22px] text-white">Deux examens distincts : TCF et TEF</h3>
            </div>
            <Link href="/tef" className="shrink-0 inline-flex items-center gap-2 text-gold font-semibold text-[14px] border border-gold/40 rounded-[10px] px-5 py-3 transition-all hover:bg-gold/10">
              Comparer avec le TEF Canada →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TCF_VS_TEF.map((row) => (
              <div key={row.label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4">
                <div className="text-[10.5px] font-bold tracking-[1.5px] uppercase text-gold/85 mb-1.5">{row.label}</div>
                <div className="text-[13px] text-white/72 leading-[1.5]">{row.tcf}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 8 — SUPPORT + 9 — FORMAT DU PROGRAMME */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 items-stretch">
          <div className="bg-white/[0.04] border border-gold/16 rounded-[24px] p-8">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-4">Accompagnement</p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Tutorat pédagogique en ligne, compétence par compétence.",
                "Retours et corrections sur l'expression écrite et orale, selon le forfait.",
                "Conseiller dédié pour orienter votre plan de préparation.",
                "Support par email — support prioritaire selon le forfait.",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[13.5px] text-white/70 leading-[1.55]">
                  <span className="text-gold shrink-0 mt-0.5">✓</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/[0.04] border border-gold/16 rounded-[24px] p-8">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-4">Format du programme</p>
            <ul className="flex flex-col gap-2.5">
              {[
                "100 % en ligne — accessible où que vous soyez.",
                "À votre rythme, avec accompagnement encadré selon le forfait.",
                "Parcours modulaire du niveau Fondation au niveau Supérieur.",
                "Objectif fédéral (Entrée express) ou Québec (PEQ / MIFI), au choix.",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[13.5px] text-white/70 leading-[1.55]">
                  <span className="text-gold shrink-0 mt-0.5">✓</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 10 — TARIFICATION (séparée, renvoi vers /tarifs Dept A) */}
        <div className="mt-16 bg-gold/[0.06] border border-gold/25 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-gold mb-2">Forfaits de préparation</p>
            <h3 className="font-[family-name:var(--font-heading)] text-[24px] text-white mb-2">Des forfaits dédiés aux Programmes officiels de langue</h3>
            <p className="text-[14px] text-white/55 max-w-[520px] leading-[1.6]">
              Starter, Essential, Premium et VIP — une tarification propre aux Programmes officiels de langue (TEF &amp; TCF Canada),
              distincte des Formations professionnelles. Au lancement, l&apos;inscription se fait par demande d&apos;admission.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href={TCF_PRICING_HREF} className="bg-gold text-navy font-bold text-[14.5px] px-7 py-3.5 rounded-[10px] text-center transition-all hover:bg-gold-light hover:-translate-y-0.5">Voir les forfaits</Link>
            <Link href={TCF_ADMISSION_HREF} className="bg-transparent text-gold font-semibold text-[14.5px] px-7 py-3.5 rounded-[10px] border-[1.5px] border-gold/40 text-center transition-all hover:bg-gold/10">Recevoir les tarifs TCF</Link>
          </div>
        </div>

        {/* 11 — PROCESSUS D'ADMISSION */}
        <div className="mt-16">
          <div className="text-center mb-9">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Admission</p>
            <h2 className="font-[family-name:var(--font-heading)] text-[32px] text-white">Comment rejoindre le programme</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TCF_ADMISSION_STEPS.map((s) => (
              <div key={s.n} className="bg-white/[0.04] border border-gold/16 rounded-[20px] p-6">
                <div className="w-10 h-10 rounded-full bg-gold text-navy font-[family-name:var(--font-heading)] text-lg font-bold flex items-center justify-center mb-4">{s.n}</div>
                <div className="text-[15px] font-semibold text-white mb-1.5 leading-tight">{s.title}</div>
                <div className="text-[13px] text-white/55 leading-[1.6]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 12 — FAQ (accordéon natif accessible) */}
        <div className="mt-16 max-w-[820px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Questions fréquentes</p>
            <h2 className="font-[family-name:var(--font-heading)] text-[30px] text-white">TCF Canada — vos questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {TCF_FAQ.map((f) => (
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

        {/* 13 — CTA FINAL */}
        <div className="mt-16 bg-white/[0.04] border border-gold/20 rounded-[28px] p-9 md:p-12 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[34px] text-white mb-3">Prêt à préparer votre TCF Canada ?</h2>
          <p className="text-white/55 text-[15px] mb-7 max-w-[560px] mx-auto">Faites votre demande d&apos;admission : un conseiller évalue votre profil et vous propose un plan de préparation adapté à votre objectif d&apos;immigration.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={TCF_ADMISSION_HREF} className="bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">Demander mon admission →</Link>
            <Link href="/tutorat" className="bg-transparent text-white font-semibold text-[15px] px-7 py-3.5 rounded-[10px] border-[1.5px] border-white/28 transition-all hover:border-gold hover:text-gold">Découvrir le tutorat</Link>
          </div>
        </div>

        {/* 14 — CLAUSE DE NON-RESPONSABILITÉ + positionnement légal/immigration */}
        <div className="mt-10 bg-white/[0.03] border border-gold/12 rounded-2xl p-5">
          <p className="text-[12.5px] text-white/55 leading-[1.7]">
            <strong className="text-gold">ⓘ </strong>
            ARCADINS Training Center est un organisme privé de préparation linguistique. Il n&apos;est ni affilié à, ni
            approuvé par France Éducation international, IRCC, le gouvernement du Canada ou le MIFI (Québec), et ne
            constitue pas un centre de passage officiel du TCF Canada. ARCADINS ne garantit aucun résultat d&apos;examen ni
            aucune issue d&apos;immigration, et ne fournit pas de représentation en immigration réglementée. Nos simulations
            sont indicatives et ne remplacent pas le test officiel. Vérifiez toujours les informations d&apos;examen et
            d&apos;immigration auprès des autorités compétentes.
          </p>
        </div>

        {/* 15 — CONTACT & ACCÈS SUPPORT */}
        <div className="mt-6 text-center">
          <p className="text-[13.5px] text-white/50">
            Une question sur le programme TCF Canada ?{" "}
            <Link href="/contact" className="text-gold font-semibold hover:underline">Parler à un conseiller</Link>
            {" "}·{" "}
            <a href="https://wa.me/15144513436" target="_blank" rel="noopener noreferrer" className="text-gold font-semibold hover:underline">WhatsApp</a>
            {" "}·{" "}
            <a href="mailto:info@arcadins-training.com" className="text-gold font-semibold hover:underline">info@arcadins-training.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
