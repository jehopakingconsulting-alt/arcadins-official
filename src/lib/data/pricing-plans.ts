import type { PricingPlan } from "@/types";

export const PRICING: PricingPlan[] = [
  {
    badge: "Essentiel", name: "Starter",
    description: "Idéal pour commencer votre préparation linguistique et accéder aux formations de base.",
    priceMonthly: 199, priceAnnual: 159, currency: "CAD",
    features: [
      { text: "Accès à 3 formations au choix", included: true },
      { text: "Préparation TEF/TCF niveau débutant", included: true },
      { text: "2 examens blancs par mois", included: true },
      { text: "Attestation de complétion incluse", included: true },
      { text: "Support en 3 langues", included: true },
      { text: "Coaching individuel", included: false },
      { text: "Accompagnement immigration", included: false },
    ],
    featured: false, cta: "Commencer →",
  },
  {
    badge: "⭐ Plus populaire", name: "Professionnel",
    description: "Préparation complète TEF/TCF + formations + accompagnement immigration intégré.",
    priceMonthly: 449, priceAnnual: 359, currency: "CAD",
    features: [
      { text: "Accès à l'ensemble des formations disponibles", included: true },
      { text: "Préparation TEF/TCF A1 → C2", included: true },
      { text: "Examens blancs illimités", included: true },
      { text: "Coaching oral individuel (4h/mois)", included: true },
      { text: "Ressources d'information sur l'immigration", included: true },
      { text: "Support en 7 langues", included: true },
      { text: "Plan de préparation personnalisé", included: true },
    ],
    featured: true, cta: "S'inscrire maintenant →",
  },
  {
    badge: "Institutions", name: "Entreprise",
    description: "Pour les écoles, entreprises, gouvernements et organismes souhaitant former leurs équipes.",
    priceMonthly: null, priceAnnual: null, currency: "CAD",
    features: [
      { text: "Licences multi-utilisateurs illimitées", included: true },
      { text: "LMS whitelabel à votre marque", included: true },
      { text: "Programmes sur mesure", included: true },
      { text: "Formateurs dédiés on-site / online", included: true },
      { text: "Rapports & analytics avancés", included: true },
      { text: "API d'intégration", included: true },
      { text: "SLA & support prioritaire 24h", included: true },
    ],
    featured: false, cta: "Nous contacter →",
  },
];

export const PAYMENT_METHODS = [
  "💳 VISA", "💳 Mastercard", "🏦 Virement",
  "📱 MTN Money", "📱 Orange Money", "📱 Wave",
  "💸 Western Union", "💸 MoneyGram",
];
