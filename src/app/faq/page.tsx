"use client";

import { useState } from "react";
import Link from "next/link";

// Contenu migré depuis la plateforme V1 (pages/faq.html) — porté fidèlement.
// 15 questions/réponses réparties en 5 sections. Langue source : français.
type Item = { q: string; a: React.ReactNode };
type Section = { title: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    title: "📋 TEF & TCF Canada",
    items: [
      {
        q: "Quelle différence entre le TEF Canada et le TCF Canada ?",
        a: (
          <>
            Le <strong>TEF Canada</strong> est organisé par la Chambre de Commerce et d&apos;Industrie de Paris
            (CCIP). Le <strong>TCF Canada</strong> est organisé par France Éducation international. Les deux sont
            reconnus par IRCC pour l&apos;immigration au Canada et par le MIFI pour le Québec. Le TEF Canada comporte
            4 épreuves obligatoires (CO, CE, EO, EE). Le TCF Canada comporte 5 composantes (CO, MSL, CE, EO, EE). Le
            choix dépend souvent de la disponibilité dans votre pays et de votre profil.
          </>
        ),
      },
      {
        q: "Les résultats du TEF & TCF Canada sont-ils valides longtemps ?",
        a: "Les résultats sont valides 2 ans à compter de la date du test, conformément aux exigences d'IRCC. Passé ce délai, vous devrez repasser le test si votre demande de résidence permanente n'a pas encore été soumise.",
      },
      {
        q: "Qu'est-ce que le NCLC et pourquoi est-ce important ?",
        a: "Le NCLC (Niveaux de Compétence Linguistique Canadiens) est le système officiel utilisé par IRCC pour évaluer les compétences en français. Chaque épreuve du TEF & TCF Canada est convertie en niveau NCLC (de 1 à 12). Pour Express Entry, un NCLC 7 ou 9 dans chaque compétence vous donne des points supplémentaires significatifs.",
      },
      {
        q: "Où passer le TEF & TCF Canada officiellement ?",
        a: "Les examens officiels TEF & TCF Canada se passent dans des centres agréés dans votre pays. Pour trouver un centre, consultez les sites officiels de la CCIP (TEF Canada) et de France Éducation international (TCF Canada). ARCADINS Training Center vous prépare au test mais n'est pas un centre de passage officiel.",
      },
    ],
  },
  {
    title: "🎓 Nos programmes de tutorat",
    items: [
      {
        q: "Combien de temps faut-il pour se préparer ?",
        a: "Cela dépend de votre niveau de départ. En général : 4 semaines pour un niveau B2 qui vise NCLC 7-8, 8 à 12 semaines pour un niveau B1 qui vise NCLC 7. Notre test de niveau initial vous donnera une estimation personnalisée dès votre première connexion.",
      },
      {
        q: "Est-ce que le programme de tutorat est entièrement en ligne ?",
        a: "Oui, tous nos programmes de tutorat sont 100% en ligne, accessibles 24h/24 depuis un ordinateur, une tablette ou un smartphone. Le coaching individuel (plan VIP) se déroule par visioconférence.",
      },
      {
        q: "Combien de temps mon accès est-il valide ?",
        a: "Entre 6 et 12 semaines, selon le forfait ou le plan souscrit.",
      },
      {
        q: "Y a-t-il des exercices audio pour la compréhension orale ?",
        a: "Oui. Les plans Standard, Premium et VIP incluent des exercices de compréhension orale avec des enregistrements audio variés (dialogues, monologues, annonces) accompagnés de questions et de corrections.",
      },
    ],
  },
  {
    title: "🔐 Compte & Espace membre",
    items: [
      {
        q: "Est-ce que j'aurai un compte privé ?",
        a: "Oui. Chaque étudiant dispose d'un espace membre sécurisé avec son tableau de bord, sa progression module par module, ses scores, ses programmes de tutorat achetés, ses documents téléchargeables et son attestation de complétion ARCADINS.",
      },
      {
        q: "Comment créer mon compte ?",
        a: "Remplissez le formulaire d'inscription sur notre page d'accueil. Notre équipe activera votre compte sous 24h et vous enverra vos identifiants de connexion par email.",
      },
      {
        q: "J'ai oublié mon mot de passe — que faire ?",
        a: "Cliquez sur « Connexion » puis sur « Mot de passe oublié ? ». Entrez votre adresse email et vous recevrez un lien de réinitialisation sous quelques minutes.",
      },
    ],
  },
  {
    title: "💳 Paiement & Remboursement",
    items: [
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal et les virements bancaires. Tous les paiements sont sécurisés par chiffrement SSL.",
      },
      {
        q: "Y a-t-il une garantie satisfait ou remboursé ?",
        a: "Oui. Nous offrons une garantie de remboursement de 7 jours si vous n'êtes pas satisfait(e), à condition de n'avoir pas accédé à plus de 20% du contenu. Contactez-nous à info@arcadins-training.com.",
      },
    ],
  },
  {
    title: "⚠️ Important — Informations légales",
    items: [
      {
        q: "Est-ce que ce programme de tutorat garantit l'obtention d'un visa ?",
        a: "Non. ARCADINS Training Center est une plateforme de préparation linguistique. Elle vous aide à améliorer votre français et à atteindre le score NCLC cible pour votre dossier d'immigration. Elle ne garantit pas l'obtention d'un visa, d'une résidence permanente ou d'un résultat officiel au TEF & TCF Canada. Les décisions d'immigration relèvent exclusivement d'IRCC et des autorités compétentes.",
      },
      {
        q: "ARCADINS est-il affilié au gouvernement canadien ?",
        a: "Non. ARCADINS Training Center est une plateforme privée de tutorat. Elle n'est pas affiliée à IRCC (Immigration, Réfugiés et Citoyenneté Canada), au MIFI (Québec), à la CCIP (TEF), ni à France Éducation international (TCF). Pour toute démarche officielle d'immigration, consultez le site officiel d'IRCC (canada.ca).",
      },
    ],
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>("0-0");

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[820px] mx-auto px-7">
        <div className="mb-12">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold-ink mb-2.5">Aide &amp; Réponses</p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-navy mb-4">Questions fréquentes</h1>
          <p className="text-[17px] text-muted max-w-[640px] leading-[1.75]">
            Toutes les réponses sur nos programmes de tutorat TEF &amp; TCF Canada et l&apos;espace membre.
          </p>
        </div>

        {SECTIONS.map((section, si) => (
          <div key={section.title} className="mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-[19px] text-navy mb-4">{section.title}</h2>
            <div className="flex flex-col gap-3">
              {section.items.map((item, ii) => {
                const id = `${si}-${ii}`;
                const isOpen = open === id;
                return (
                  <div key={id} className="bg-white rounded-[16px] border border-gold/15 overflow-hidden">
                    <button
                      onClick={() => setOpen(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 transition-colors hover:bg-gold/5"
                    >
                      <span className="text-[15.5px] font-semibold text-navy leading-[1.5]">{item.q}</span>
                      <span
                        className={`shrink-0 w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center text-lg font-bold transition-transform ${isOpen ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-[14.5px] text-body leading-[1.8]">{item.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-14 bg-navy rounded-[24px] p-9 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-white mb-3">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-white/55 text-[15px] mb-6 max-w-[480px] mx-auto leading-[1.7]">
            Notre équipe vous répond sous 24h. Écrivez-nous et nous vous accompagnons dans votre préparation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold text-navy font-bold text-[15px] px-8 py-3.5 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
