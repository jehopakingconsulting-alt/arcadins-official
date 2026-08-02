/**
 * TARIFS — Département A : Programmes officiels de langue (tutorat TEF & TCF).
 * SÉPARÉ des Formations professionnelles (Département B, 1500 CAD, cf. programs.ts).
 * Valeurs officielles fournies (USD). Source unique de vérité pour l'affichage des plans.
 * Au lancement : pas de paiement en ligne — les CTA mènent à la demande d'admission (/contact).
 */
export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface ProgramPlan {
  key: string;
  name: string;
  /** Prix en USD. */
  price: number;
  currency: "USD";
  popular?: boolean;
  /** Durée d'accès en semaines. */
  accessWeeks: number;
  tagline: string;
  features: PlanFeature[];
}

export const PROGRAM_PLANS: ProgramPlan[] = [
  {
    key: "starter",
    name: "Starter",
    price: 97,
    currency: "USD",
    accessWeeks: 6,
    tagline: "Idéal pour débuter votre préparation TEF/TCF",
    features: [
      { text: "Accès aux 14 modules de formation", included: true },
      { text: "Test de qualification inclus", included: true },
      { text: "Test final · 1 tentative", included: true },
      { text: "Support par email", included: true },
      { text: "Certificat officiel ARCADINS", included: false },
      { text: "Support prioritaire", included: false },
      { text: "Coaching individuel", included: false },
    ],
  },
  {
    key: "essential",
    name: "Essential",
    price: 147,
    currency: "USD",
    popular: true,
    accessWeeks: 6,
    tagline: "Le choix le plus populaire pour une préparation complète",
    features: [
      { text: "Tout le plan Starter", included: true },
      { text: "Test final · 2 tentatives", included: true },
      { text: "Certificat officiel ARCADINS", included: true },
      { text: "Support prioritaire", included: true },
      { text: "Tableau de progression", included: true },
      { text: "Sessions de coaching", included: false },
      { text: "Ressources supplémentaires", included: false },
    ],
  },
  {
    key: "premium",
    name: "Premium",
    price: 247,
    currency: "USD",
    accessWeeks: 6,
    tagline: "Préparez-vous avec un accompagnement personnalisé",
    features: [
      { text: "Tout le plan Essential", included: true },
      { text: "Test final · 3 tentatives", included: true },
      { text: "Coaching individuel · 2h", included: true },
      { text: "Ressources supplémentaires", included: true },
      { text: "Certificat ARCADINS + recommandation", included: true },
      { text: "Coaching privé 4h", included: false },
      { text: "Garantie de résultat", included: false },
    ],
  },
  {
    key: "vip",
    name: "VIP",
    price: 347,
    currency: "USD",
    accessWeeks: 12,
    tagline: "L'excellence avec suivi personnalisé complet",
    features: [
      { text: "Tout le plan Premium", included: true },
      { text: "Test final · 6 tentatives", included: true },
      { text: "Coaching privé · 4h", included: true },
      { text: "Préparation orale intensive", included: true },
      { text: "Garantie de résultat", included: true },
      { text: "Support 24/7", included: true },
      { text: "Certificat + lettre de recommandation", included: true },
    ],
  },
];

/** Réassurance affichée sous les plans (garantie honnête, pas de promesse de score officiel). */
export const PROGRAM_PLANS_NOTE = "Garantie satisfait ou remboursé sous 7 jours · Accompagnement pédagogique — la préparation ne remplace pas le résultat officiel TEF/TCF.";
