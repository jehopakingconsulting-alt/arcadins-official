"use client";

import Link from "next/link";

// Contenu migré depuis la plateforme V1 (pages/guide.html) — porté fidèlement.
// Wording aligné sur V2 : « attestation de complétion » (et non « certificat officiel ») ;
// les tarifs renvoient à /tarifs plutôt que de figer des prix.
const STEPS = [
  {
    n: "1",
    title: "📝 Créez votre compte gratuitement",
    body: "Remplissez le formulaire d'inscription sur la page d'accueil : nom, email, téléphone, pays, objectif (TEF ou TCF Canada) et niveau actuel. C'est gratuit et prend moins de 2 minutes.",
    tip: "Utilisez une adresse email active — tous vos accès y seront envoyés.",
  },
  {
    n: "2",
    title: "🎯 Passez le test de niveau gratuit",
    body: "Avant de choisir votre plan, effectuez notre test de niveau interactif (15-20 minutes). Il évalue vos 4 compétences : compréhension orale, compréhension écrite, expression écrite et expression orale. Résultats instantanés avec votre score NCLC estimé.",
    tip: "Passez ce test dans le calme, sans aide extérieure, pour une évaluation réelle.",
  },
  {
    n: "3",
    title: "💳 Choisissez votre plan de formation",
    body: "En fonction de vos résultats et de votre budget, choisissez le plan qui vous convient. Chaque plan inclut l'accès aux modules, des tentatives au test final et, selon la formule, du coaching pédagogique.",
    tip: "Comparez les formules en détail sur la page Tarifs avant de vous décider.",
  },
  {
    n: "4",
    title: "🔒 Payez en toute sécurité via Stripe",
    body: "Après avoir sélectionné votre plan, vous êtes redirigé vers la page de paiement sécurisée Stripe (Visa, Mastercard, American Express). Votre paiement est chiffré SSL ; ARCADINS ne conserve aucune donnée bancaire.",
    tip: "Ne fermez pas la page pendant la redirection Stripe — attendez la confirmation.",
  },
  {
    n: "5",
    title: "📊 Test de qualification — Évaluation approfondie",
    body: "Une fois votre accès activé, vous commencez par un test de qualification plus complet (30-40 minutes) qui mesure précisément vos forces et vos zones d'amélioration dans les 4 compétences. Votre tableau de bord se met à jour en temps réel.",
    tip: "Réservez 45 minutes sans interruption pour ce test.",
  },
  {
    n: "6",
    title: "📚 Suivez les modules de formation",
    body: "Le cœur de votre préparation : des modules progressifs couvrant toutes les compétences exigées au TEF et TCF Canada. Chaque module comprend leçons théoriques, exercices corrigés, simulations chronométrées et suivi automatique de progression.",
    tip: "Consacrez 1 à 2 heures par jour pour un progrès optimal.",
  },
  {
    n: "7",
    title: "🏆 Passez le test final ARCADINS",
    body: "Une fois les modules complétés, passez le test final ARCADINS, qui simule les conditions réelles du TEF ou TCF Canada et évalue votre maîtrise globale. Le nombre de tentatives dépend de votre plan.",
    tip: "Ne passez le test final qu'après avoir terminé tous les modules.",
  },
  {
    n: "8",
    title: "🎓 Recevez votre attestation ARCADINS",
    body: "Après avoir réussi le test final, votre attestation de complétion ARCADINS Training Center est générée automatiquement. Elle mentionne votre nom, la date d'obtention, votre score global et par compétence, et le niveau NCLC équivalent estimé. Téléchargez-la depuis votre espace membre.",
    tip: "Vous pouvez vérifier l'authenticité d'une attestation depuis la page de vérification.",
  },
];

const FEATURES = [
  { icon: "📊", title: "Tableau de bord", desc: "Suivez votre progression, vos scores et le temps passé sur chaque module en temps réel." },
  { icon: "⏱️", title: "Simulations chronométrées", desc: "Reproduisez exactement les conditions du vrai examen TEF/TCF avec minuterie intégrée." },
  { icon: "✅", title: "Corrections détaillées", desc: "Chaque exercice est corrigé avec des explications pédagogiques pour comprendre vos erreurs." },
  { icon: "📱", title: "100% mobile", desc: "Accédez à votre formation depuis votre téléphone, tablette ou ordinateur. Aucune installation." },
  { icon: "🔒", title: "Espace membre sécurisé", desc: "Vos données et résultats sont protégés. Accès par email + mot de passe personnel." },
  { icon: "🎧", title: "Support réactif", desc: "Une question ? Notre équipe répond par email et WhatsApp. VIP : support 24/7." },
];

export default function GuidePage() {
  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[860px] mx-auto px-7">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">📚 Guide complet</p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-navy mb-4">Comment utiliser la plateforme ARCADINS ?</h1>
          <p className="text-[17px] text-muted max-w-[640px] leading-[1.75]">
            Suivez ces 8 étapes simples pour passer de l&apos;inscription à votre attestation. Tout est expliqué,
            rien n&apos;est compliqué.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/auth/register" className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">✏️ Commencer maintenant</Link>
            <Link href="/tarifs" className="border border-navy/20 text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-navy/5">Voir les plans →</Link>
          </div>
        </div>

        {/* Étapes */}
        <div className="flex flex-col gap-5 mb-16">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-5 bg-white rounded-[20px] p-7 border border-gold/15">
              <div className="shrink-0 w-11 h-11 rounded-full bg-navy text-gold font-[family-name:var(--font-heading)] text-xl font-bold flex items-center justify-center">{s.n}</div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-[19px] text-navy mb-2">{s.title}</h2>
                <p className="text-[14.5px] text-body leading-[1.8] mb-3">{s.body}</p>
                <p className="text-[13px] text-navy bg-gold/8 border border-gold/20 rounded-lg px-4 py-2.5 leading-[1.6]">💡 Conseil : {s.tip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fonctionnalités */}
        <div className="mb-14">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">Fonctionnalités</p>
          <h2 className="font-[family-name:var(--font-heading)] text-[28px] text-navy mb-6">Ce que vous trouverez sur la plateforme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-[18px] p-6 border border-gold/15">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-[family-name:var(--font-heading)] text-[17px] text-navy mb-2">{f.title}</h3>
                <p className="text-[13.5px] text-body leading-[1.7]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-navy rounded-[24px] p-9 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-white mb-3">Prêt(e) à commencer ?</h2>
          <p className="text-white/55 text-[15px] mb-6 max-w-[520px] mx-auto leading-[1.7]">
            Inscrivez-vous gratuitement en 2 minutes et passez votre test de niveau. Votre préparation TEF/TCF Canada
            commence aujourd&apos;hui.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/auth/register" className="bg-gold text-navy font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5">✏️ S&apos;inscrire gratuitement</Link>
            <Link href="/tarifs" className="border border-gold/40 text-gold font-bold text-[15px] px-7 py-3.5 rounded-[10px] transition-all hover:bg-gold/10">Voir les plans →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
