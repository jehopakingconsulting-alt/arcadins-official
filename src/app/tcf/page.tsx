"use client";

import Link from "next/link";

// Contenu migré depuis la plateforme V1 (pages/tcf-canada.html) — porté fidèlement.
const EPREUVES = [
  { icon: "🎧", name: "Compréhension orale (CO)", meta: "29 questions · ~35 min · A1–C2" },
  { icon: "📄", name: "Maîtrise des structures de la langue (MSL)", meta: "18 questions · ~20 min · A1–C2" },
  { icon: "📖", name: "Compréhension écrite (CE)", meta: "29 questions · ~45 min · A1–C2" },
  { icon: "✍️", name: "Expression écrite (EE)", meta: "3 tâches · 60 min · A1–C2" },
  { icon: "🎤", name: "Expression orale (EO)", meta: "4 tâches · ~12 min · A1–C2" },
];

const MODULES = [
  { icon: "🎧", title: "Compréhension orale", desc: "Dialogues et documents sonores authentiques. Repérage d'informations, compréhension globale et sélective, écoute intensive." },
  { icon: "📖", title: "Structures de la langue", desc: "Grammaire contextuelle, conjugaison, accord, morphologie et syntaxe. Exercices ciblés par niveau CECRL." },
  { icon: "📄", title: "Compréhension écrite", desc: "Textes variés (articles, publicités, emails, formulaires). Techniques de lecture rapide et compréhension en contexte québécois." },
  { icon: "✍️", title: "Expression écrite", desc: "Message court (Tâche 1), message formel (Tâche 2), prise de position (Tâche 3). Structures et vocabulaire immigration." },
  { icon: "🎤", title: "Expression orale", desc: "Interaction, monologue, argumentation. Prononciation, fluidité et richesse lexicale pour atteindre NCLC 7+." },
  { icon: "🏔️", title: "Préparation Québec (PEQ)", desc: "Vocabulaire et contextes spécifiques au Québec. Expressions québécoises, culture et institutions utiles pour le MIFI." },
];

const USAGES = [
  "Express Entry – Entrée Express",
  "PEQ – Programme de l'Expérience Québécoise",
  "Programme des Travailleurs Qualifiés du Québec",
  "Résidence permanente au Canada",
  "Études dans les universités québécoises",
];

export default function TcfPage() {
  return (
    <div className="bg-navy min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="mb-11">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">
            📋 Conforme aux standards du Canada &amp; MIFI Québec
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-[42px] text-white mb-4 leading-[1.15]">
            Programme de Tutorat <em className="text-gold italic">TCF Canada</em>
          </h1>
          <p className="text-[17px] text-white/52 max-w-[640px] leading-[1.75]">
            Préparez le Test de Connaissance du Français pour l&apos;immigration au Canada et au Québec, le Programme
            de l&apos;Expérience Québécoise (PEQ) et les études en milieu francophone.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/auth/register" className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">
              ✏️ Je commence ma préparation TCF
            </Link>
            <Link href="/examens" className="border border-gold/40 text-gold font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold/10">
              🎯 Test d&apos;essai libre
            </Link>
          </div>
        </div>

        {/* Lien vers le tutorat pédagogique */}
        <Link href="/tutorat" className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gold/10 border border-gold/40 rounded-[20px] p-6 mb-11 transition-all hover:bg-gold/15 hover:-translate-y-0.5">
          <div>
            <div className="font-[family-name:var(--font-heading)] text-[21px] text-white font-bold mb-1">Tutorat pédagogique en ligne</div>
            <div className="text-[13.5px] text-white/60 max-w-[560px] leading-[1.6]">Un accompagnement structuré, compétence par compétence, pour atteindre votre score NCLC cible.</div>
          </div>
          <span className="shrink-0 bg-gold text-navy font-bold text-[14px] px-6 py-3 rounded-[10px] text-center group-hover:bg-gold-light transition-all">Explorer le tutorat →</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Présentation */}
          <div>
            <div className="font-[family-name:var(--font-heading)] text-[22px] text-gold mb-3">Qu&apos;est-ce que le TCF Canada ?</div>
            <p className="text-[14.5px] text-white/70 leading-[1.85] mb-5">
              Le <strong className="text-white">TCF Canada</strong> (Test de Connaissance du Français pour le Canada) est
              organisé par France Éducation international (anciennement CIEP). Il est reconnu par <strong className="text-white">IRCC</strong>
              {" "}pour l&apos;immigration au Canada et par le <strong className="text-white">MIFI (Québec)</strong> pour les programmes
              d&apos;immigration québécois. Les résultats sont valides <strong className="text-white">2 ans</strong> et convertis en
              niveaux NCLC pour le Canada et en niveaux CECRL pour le Québec.
            </p>
            <div className="bg-white/[0.04] border border-gold/17 rounded-2xl p-6">
              <p className="text-white/52 text-[13px] font-semibold mb-3">🎯 Utilisé pour :</p>
              <ul>
                {USAGES.map((u) => (
                  <li key={u} className="flex items-start gap-3 py-2 text-sm text-white/72">
                    <span className="w-5 h-5 rounded-full bg-gold/17 text-gold flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">✓</span>{u}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Structure */}
          <div className="bg-white/[0.04] border border-gold/17 rounded-[28px] p-8">
            <div className="font-[family-name:var(--font-heading)] text-[22px] text-gold mb-1">📊 Structure du TCF Canada</div>
            <div className="text-[13.5px] text-white/46 mb-6">Cinq composantes évaluées sur l&apos;échelle A1–C2.</div>
            <ul>
              {EPREUVES.map((e) => (
                <li key={e.name} className="py-3 border-b border-white/[0.054]">
                  <div className="text-[14.5px] text-white/80 font-semibold">{e.icon} {e.name}</div>
                  <div className="text-xs text-white/45 mt-0.5">{e.meta}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modules de préparation */}
        <div className="mt-16">
          <div className="font-[family-name:var(--font-heading)] text-[26px] text-white mb-2">Modules de préparation TCF Canada</div>
          <p className="text-white/50 text-[15px] mb-8">Un parcours intensif couvrant toutes les épreuves du TCF Canada.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((m) => (
              <div key={m.title} className="bg-white/[0.04] border border-gold/17 rounded-[20px] p-6">
                <div className="text-3xl mb-3">{m.icon}</div>
                <div className="font-[family-name:var(--font-heading)] text-[18px] text-gold mb-2">{m.title}</div>
                <p className="text-[13.5px] text-white/60 leading-[1.7]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gold/8 border border-gold/25 rounded-[24px] p-9 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-white mb-3">Prêt à réussir votre TCF Canada ?</h2>
          <p className="text-white/55 text-[15px] mb-6">Rejoignez ARCADINS Training Center et démarrez dès aujourd&apos;hui.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/auth/register" className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">✏️ Je m&apos;inscris maintenant</Link>
            <Link href="/tarifs" className="border border-gold/40 text-gold font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold/10">💰 Voir les tarifs</Link>
          </div>
        </div>

        {/* Disclaimer conformité */}
        <div className="mt-12 bg-white/[0.04] border border-gold/17 rounded-2xl p-5">
          <p className="text-[12.5px] text-white/55 leading-[1.7]">
            <strong className="text-gold">ⓘ </strong>
            ARCADINS Training Center est une plateforme privée de préparation. Elle n&apos;est pas affiliée à France
            Éducation international ni à IRCC/MIFI, et ne constitue pas un centre de passage officiel du TCF Canada.
            Les simulations sont indicatives et ne remplacent pas le test officiel.
          </p>
        </div>
      </div>
    </div>
  );
}
