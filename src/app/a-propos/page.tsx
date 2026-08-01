"use client";

import Link from "next/link";

// Contenu migré depuis la plateforme V1 (pages/about.html) — porté fidèlement.
const STATS = [
  { n: "2 400+", label: "Étudiants formés" },
  { n: "94%", label: "Taux de satisfaction" },
  { n: "40+", label: "Pays représentés" },
  { n: "9", label: "Programmes complets" },
];

const VALUES = [
  { icon: "🎯", title: "Spécialisation unique", desc: "Contrairement aux plateformes généralistes, nous nous concentrons exclusivement sur le TEF & TCF Canada pour l'immigration." },
  { icon: "💡", title: "Pédagogie orientée résultats", desc: "Chaque exercice, chaque module est conçu pour vous rapprocher du score NCLC dont vous avez besoin pour votre programme d'immigration." },
  { icon: "🌍", title: "Accessible partout dans le monde", desc: "Depuis la France, l'Afrique, le Maghreb ou l'Asie — notre plateforme est disponible 24h/24 sur tous vos appareils." },
  { icon: "🔒", title: "Transparence et intégrité", desc: "Nous ne promettons pas de visa. Nous vous promettons la meilleure préparation possible pour décrocher votre score NCLC cible." },
];

const WE_DO = [
  "Préparation linguistique au TEF Canada",
  "Préparation linguistique au TCF Canada",
  "Tests interactifs et simulations",
  "Exercices corrigés et expliqués",
  "Suivi de progression personnalisé",
  "Coaching pédagogique (plan VIP)",
  "Attestation de complétion ARCADINS",
];

const WE_DONT = [
  "Garantir l'obtention d'un visa",
  "Garantir un résultat officiel TEF/TCF",
  "Remplacer IRCC ou le MIFI",
  "Être un centre de passage officiel TEF/TCF",
  "Traiter les dossiers d'immigration",
  "Représenter le gouvernement canadien",
  "Promettre la résidence permanente",
];

export default function AProposPage() {
  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1000px] mx-auto px-7">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Notre histoire</p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-navy mb-4">À propos d&apos;ARCADINS Training Center</h1>
          <p className="text-[17px] text-muted max-w-[680px] leading-[1.75]">
            Une plateforme créée pour accompagner les candidats à l&apos;immigration vers leur réussite linguistique.
            Spécialiste de la préparation au TEF &amp; TCF Canada, accessible partout dans le monde.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="bg-navy rounded-[20px] p-6 text-center">
              <div className="font-[family-name:var(--font-heading)] text-[32px] text-gold">{s.n}</div>
              <div className="text-white/55 text-[13px] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="mb-16">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Notre mission</p>
          <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-navy mb-4">Votre réussite linguistique, notre priorité</h2>
          <p className="text-[15px] text-body leading-[1.85] mb-4">
            ARCADINS Training Center est né d&apos;un constat simple : de nombreux candidats à l&apos;immigration au
            Canada ont le projet, les compétences et la motivation — mais manquent d&apos;une préparation ciblée et
            efficace pour réussir leur test de langue.
          </p>
          <p className="text-[15px] text-body leading-[1.85]">
            Notre plateforme a été conçue par des experts en FLE (Français Langue Étrangère) et en immigration
            canadienne pour offrir une préparation structurée, accessible 24h/24, depuis n&apos;importe quel pays du monde.
          </p>
        </div>

        {/* Valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-white rounded-[20px] p-7 border border-gold/15">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-[family-name:var(--font-heading)] text-[19px] text-navy mb-2">{v.title}</h3>
              <p className="text-[14px] text-body leading-[1.75]">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Transparence */}
        <div className="mb-8">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Transparence</p>
          <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-navy mb-6">Ce que nous sommes — et ce que nous ne sommes pas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-[20px] p-7 border border-emerald-500/25">
              <h3 className="font-bold text-[16px] text-navy mb-4">✅ Ce que nous faisons</h3>
              <ul className="flex flex-col gap-2.5">
                {WE_DO.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-[14px] text-body leading-[1.6]">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>{w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-[20px] p-7 border border-red-400/25">
              <h3 className="font-bold text-[16px] text-navy mb-4">❌ Ce que nous ne faisons pas</h3>
              <ul className="flex flex-col gap-2.5">
                {WE_DONT.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-[14px] text-body leading-[1.6]">
                    <span className="text-red-500 font-bold shrink-0">✗</span>{w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Note légale */}
        <div className="bg-navy/[0.03] border border-navy/10 rounded-2xl p-5 mb-14">
          <p className="text-[12.5px] text-muted leading-[1.75]">
            <strong className="text-navy">⚠️ Note légale : </strong>
            ARCADINS Training Center est une plateforme privée de programme de tutorat linguistique. Elle n&apos;est
            affiliée ni à IRCC, ni au MIFI, ni aux organismes officiels TEF (CCIP) ou TCF (France Éducation
            international). Les scores obtenus lors de nos simulations sont indicatifs et ne constituent pas des
            résultats officiels.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-navy rounded-[24px] p-9 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-white mb-3">Rejoignez ARCADINS Training Center</h2>
          <p className="text-white/55 text-[15px] mb-6">Commencez par un test de niveau et découvrez votre niveau NCLC actuel.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/auth/register" className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">✏️ S&apos;inscrire maintenant</Link>
            <Link href="/examens" className="border border-gold/40 text-gold font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold/10">🎯 Test d&apos;essai</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
