import type { Program, Testimonial, VideoItem, PricingPlan, SlideData } from "@/types";

export const SLIDES: SlideData[] = [
  { image: "/assets/hero-canada.jpg", fallbackColor: "#0a1628", labelIcon: "🍁", labelText: "Canada · Votre destination" },
  { image: "/assets/hero-immigration-family.jpg", fallbackColor: "#0d1e10", labelIcon: "👨‍👩‍👧", labelText: "Familles · Nouveaux arrivants" },
  { image: "/assets/hero-pab.jpg", fallbackColor: "#0a1628", labelIcon: "🩺", labelText: "PAB · Formation certifiée Québec" },
  { image: "/assets/hero-classroom.jpg", fallbackColor: "#10101a", labelIcon: "🎓", labelText: "Formations · Emploi au Canada" },
  { image: "/assets/hero-students.jpg", fallbackColor: "#0f1820", labelIcon: "📚", labelText: "Apprenants · 47 pays représentés" },
];

export const STATS = [
  { value: 12400, label: "Apprenants", suffix: "" },
  { value: 47, label: "Pays", suffix: "" },
  { value: 96, label: "Réussite TEF", suffix: "%" },
  { value: 7, label: "Langues", suffix: "" },
  { value: 28, label: "Programmes", suffix: "" },
];

export const CERTIFICATIONS = [
  "IRCC Canada",
  "Gouvernement du Québec",
  "TEF — CCIP Paris",
  "TCF — France Éducation",
  "ISO 9001:2015",
  "Emploi Québec",
];

export const PROGRAMS: Program[] = [
  { id: "1", slug: "marketing-digital", icon: "🌐", category: "tech", categoryLabel: "Marketing Digital", name: "Marketing Digital et E-commerce", description: "SEO/SEM, réseaux sociaux, publicité en ligne et création de boutiques e-commerce.", longDescription: "Cette formation complète de 6 mois vous prépare à maîtriser tous les aspects du marketing numérique et du commerce en ligne. Vous apprendrez à créer des stratégies de marketing digital efficaces, gérer des campagnes publicitaires, optimiser le référencement et lancer votre propre boutique en ligne.", duration: "6 mois", certification: "Certifié", price: 3500, modules: ["Fondamentaux du marketing digital", "SEO & référencement naturel", "Publicité Google Ads & Facebook Ads", "Réseaux sociaux & community management", "E-commerce : création de boutique en ligne", "Analytics & mesure de performance", "Stratégie de contenu & copywriting", "Projet final : lancement d'une campagne complète"] },
  { id: "2", slug: "informatique", icon: "💻", category: "tech", categoryLabel: "Technologie", name: "Informatique et Transformation Digitale", description: "Cloud computing, IA appliquée, cybersécurité et digitalisation des processus d'entreprise.", longDescription: "Formation intensive de 6 mois en technologies de l'information et transformation numérique. Vous développerez des compétences en cloud computing, intelligence artificielle, cybersécurité et gestion de projets technologiques pour accompagner les entreprises dans leur transition numérique.", duration: "6 mois", certification: "Certifié", price: 3500, modules: ["Introduction aux systèmes informatiques", "Cloud computing (AWS, Azure, GCP)", "Intelligence artificielle & machine learning", "Cybersécurité & protection des données", "Gestion de bases de données", "Développement web & applications", "Gestion de projets IT (Agile/Scrum)", "Projet final : transformation digitale d'entreprise"] },
  { id: "3", slug: "francais-affaires", icon: "🗣️", category: "lang", categoryLabel: "Langue", name: "Français des Affaires et du Travail", description: "Vocabulaire professionnel, communication d'entreprise et français québécois du milieu de travail.", longDescription: "Perfectionnez votre français professionnel en 6 mois. Cette formation cible le vocabulaire et les compétences de communication nécessaires pour réussir en milieu de travail canadien. Idéal pour les professionnels immigrants qui souhaitent s'intégrer rapidement.", duration: "6 mois", certification: "Certifié", price: 3000, modules: ["Français professionnel : bases et vocabulaire", "Communication orale en entreprise", "Rédaction professionnelle (courriels, rapports)", "Français québécois : expressions et culture", "Préparation aux entretiens d'embauche", "Négociation et présentation en français", "Terminologie sectorielle (finance, tech, santé)", "Examen final & certification"] },
  { id: "4", slug: "entrepreneuriat", icon: "🚀", category: "biz", categoryLabel: "Entrepreneuriat", name: "Entrepreneuriat et Innovation", description: "Créer et gérer une entreprise au Canada. Plan d'affaires, financement et innovation.", longDescription: "Devenez entrepreneur au Canada avec cette formation complète de 6 mois. Apprenez à concevoir un plan d'affaires solide, obtenir du financement, respecter les réglementations canadiennes et lancer votre entreprise avec succès.", duration: "6 mois", certification: "Certifié", price: 4000, modules: ["Écosystème entrepreneurial canadien", "Idéation et validation de concept", "Plan d'affaires et modèle financier", "Financement : subventions, investisseurs, prêts", "Droit des affaires au Canada", "Marketing et acquisition de clients", "Innovation et propriété intellectuelle", "Projet final : pitch devant un jury"] },
  { id: "5", slug: "finance", icon: "📊", category: "biz", categoryLabel: "Finance", name: "Gestion Financière et Comptabilité", description: "Analyse de bilan, planification budgétaire, comptabilité et fiscalité canadienne.", longDescription: "Maîtrisez la gestion financière et la comptabilité dans le contexte canadien. Cette formation de 6 mois couvre les principes comptables, la fiscalité, l'analyse financière et la planification budgétaire pour les entreprises et les particuliers.", duration: "6 mois", certification: "Certifié", price: 4000, modules: ["Principes comptables canadiens (NCECF/IFRS)", "Tenue de livres et états financiers", "Fiscalité canadienne (particuliers & entreprises)", "Analyse financière et ratios", "Planification budgétaire", "Paie et avantages sociaux", "Logiciels comptables (QuickBooks, Sage)", "Examen final & certification"] },
  { id: "6", slug: "rh", icon: "🤝", category: "biz", categoryLabel: "RH", name: "Gestion des Ressources Humaines", description: "Droit du travail québécois, recrutement, gestion des talents et relations de travail.", longDescription: "Formation complète en gestion des ressources humaines adaptée au marché canadien. En 6 mois, vous maîtriserez le droit du travail québécois, les techniques de recrutement, la gestion de la performance et les relations de travail.", duration: "6 mois", certification: "Certifié", price: 3500, modules: ["Droit du travail au Québec et au Canada", "Recrutement et sélection", "Gestion de la performance", "Rémunération et avantages sociaux", "Formation et développement des compétences", "Relations de travail et médiation", "Diversité et inclusion en milieu de travail", "Projet final : plan RH stratégique"] },
  { id: "7", slug: "tourisme", icon: "🏨", category: "biz", categoryLabel: "Tourisme", name: "Tourisme et Gestion Hôtelière", description: "Gestion hôtelière, tourisme d'accueil, événementiel et service à la clientèle premium.", longDescription: "Formez-vous aux métiers du tourisme et de l'hôtellerie au Canada. Cette formation de 6 mois vous prépare à gérer des établissements hôteliers, organiser des événements et offrir un service à la clientèle d'excellence.", duration: "6 mois", certification: "Certifié", price: 3500, modules: ["Introduction au tourisme canadien", "Gestion hôtelière et hébergement", "Service à la clientèle d'excellence", "Gestion de la restauration", "Organisation d'événements", "Marketing touristique et digital", "Réglementation et normes de l'industrie", "Stage pratique & certification"] },
  { id: "8", slug: "anglais-commercial", icon: "🇬🇧", category: "lang", categoryLabel: "Langue", name: "Anglais Commercial", description: "Anglais professionnel pour le milieu des affaires canadien. Communication, négociation et rédaction.", longDescription: "Développez vos compétences en anglais des affaires en 6 mois. Indispensable pour évoluer dans un environnement bilingue au Canada, cette formation couvre la communication professionnelle, la négociation, la rédaction et les présentations en anglais.", duration: "6 mois", certification: "Certifié", price: 3000, modules: ["Business English fundamentals", "Professional communication & emails", "Meetings, presentations & public speaking", "Negotiation skills in English", "Business writing & reports", "Industry-specific vocabulary", "Canadian workplace culture in English", "Final exam & certification"] },
  { id: "9", slug: "relation-aide", icon: "❤️", category: "soc", categoryLabel: "Services sociaux", name: "Relation d'Aide et Service Communautaire", description: "Intervention psychosociale, accompagnement communautaire et soutien aux personnes vulnérables.", longDescription: "Cette formation de 6 mois vous prépare aux métiers de la relation d'aide et du service communautaire au Canada. Vous apprendrez les techniques d'intervention, l'écoute active, la gestion de crise et l'accompagnement des personnes en situation de vulnérabilité.", duration: "6 mois", certification: "Certifié", price: 3500, modules: ["Fondements de la relation d'aide", "Écoute active et communication empathique", "Intervention en situation de crise", "Santé mentale et dépendances", "Travail avec les populations vulnérables", "Ressources communautaires au Canada", "Éthique et déontologie professionnelle", "Stage pratique & certification"] },
  // ── À VENIR ──
  { id: "10", slug: "francais-tef-tcf", icon: "🇫🇷", category: "lang", categoryLabel: "Langue", name: "Français Intensif TEF/TCF Canada", description: "Maîtrisez les 4 compétences linguistiques exigées pour l'immigration. Coaching oral inclus.", longDescription: "Programme à venir.", duration: "6 mois", certification: "Certifié", price: 0, modules: [], comingSoon: true },
  { id: "11", slug: "epe", icon: "👶", category: "soc", categoryLabel: "Éducation", name: "Éducatrice à la Petite Enfance (EPE)", description: "Formation reconnue Québec. Environnement éducatif 0–5 ans.", longDescription: "Programme à venir.", duration: "6 mois", certification: "Reconnu QC", price: 0, modules: [], comingSoon: true },
  { id: "12", slug: "pab", icon: "🩺", category: "soc", categoryLabel: "Soins", name: "Préposé(e) aux Bénéficiaires (PAB)", description: "Formation PAB reconnue MSSS Québec. Soins aux personnes vulnérables.", longDescription: "Programme à venir.", duration: "6 mois", certification: "MSSS QC", price: 0, modules: [], comingSoon: true },
  { id: "13", slug: "immigration-agent", icon: "🏛️", category: "leg", categoryLabel: "Immigration", name: "Agent(e) de Soutien en Immigration", description: "Formation complète : dossiers IRCC, formulaires, procédures et accompagnement.", longDescription: "Programme à venir.", duration: "6 mois", certification: "Certifié", price: 0, modules: [], comingSoon: true },
  { id: "14", slug: "famille-sans-dette", icon: "💰", category: "leg", categoryLabel: "Finance personnelle", name: "Famille Sans Dette", description: "Budget familial, crédit, épargne et planification pour nouveaux arrivants.", longDescription: "Programme à venir.", duration: "6 mois", certification: "Certifié", price: 0, modules: [], comingSoon: true },
];

export const PROGRAM_CATEGORIES = [
  { key: "all", label: "Tous", icon: "" },
  { key: "lang", label: "Langue", icon: "🗣" },
  { key: "biz", label: "Business", icon: "💼" },
  { key: "tech", label: "Technologie", icon: "💻" },
  { key: "soc", label: "Services", icon: "❤️" },
  { key: "leg", label: "Immigration", icon: "⚖️" },
];

export const TESTIMONIALS: Testimonial[] = [
  { stars: 5, text: "Grâce à la préparation TEF Canada d'ARCADINS, j'ai obtenu le score B2 nécessaire pour ma résidence permanente. Les simulations d'examen étaient identiques au vrai test. Je suis maintenant installée à Montréal !", initials: "AF", name: "Aminata Fatoumata D.", from: "🇸🇳 Dakar → Montréal, QC" },
  { stars: 5, text: "The Professional package is exactly what I needed. I prepared my TEF in French, got my digital certificate instantly, and the immigration team guided me every step of the way to Winnipeg.", initials: "JB", name: "Jean-Baptiste M.", from: "🇭🇹 Port-au-Prince → Winnipeg, MB" },
  { stars: 5, text: "La formation Leadership d'ARCADINS m'a permis d'obtenir un poste de superviseur dès mon arrivée. Le certificat est reconnu par mon employeur québécois. Merci à toute l'équipe !", initials: "KT", name: "Kofi Théodore A.", from: "🇨🇮 Abidjan → Québec City, QC" },
  { stars: 5, text: "Las simulaciones de examen TCF son increíblemente precisas. Pasé mi prueba al primer intento con nivel B2. El equipo ARCADINS habla español y me apoyó en todo el proceso.", initials: "MR", name: "María Rosa V.", from: "🇲🇦 Casablanca → Ottawa, ON" },
  { stars: 5, text: "Als deutschsprachiger Nutzer war ich begeistert, dass der Support auch auf Deutsch verfügbar ist. Die Prüfungsvorbereitung ist sehr effektiv und professionell aufbereitet.", initials: "HM", name: "Hans-Michael B.", from: "🇩🇪 Berlin → Calgary, AB" },
  { stars: 5, text: "Mèsi ARCADINS! Preparasyon TEF mwen te bon anpil. Mwen jwenn sco B1 mwen vle a. Ekip la pale kreyòl, sa ki fè mwen konfyan pou reyisi. Mwen nan Montréal kounye a!", initials: "RJ", name: "Roseline J.", from: "🇭🇹 Les Cayes → Montréal, QC" },
];

export const VIDEOS: VideoItem[] = [
  { id: "kj6WkZFr-MY", chip: "⭐ Recommandé", title: "TEF vs TCF Canada : Lequel choisir pour l'immigration 2026 ?", desc: "Comparaison complète TEF Canada / TCF Canada pour choisir le bon test selon votre profil.", thumb: "https://img.youtube.com/vi/kj6WkZFr-MY/hqdefault.jpg" },
  { id: "5evAnxEm9fQ", chip: "📋 TEF/TCF 2024", title: "TEF, TCF, TEFAQ — Nouveau format 2024 pour l'immigration Canada", desc: "Analyse complète du nouveau format des examens TEF et TCF Canada 2024.", thumb: "https://img.youtube.com/vi/5evAnxEm9fQ/hqdefault.jpg" },
  { id: "ewinNomlrtU", chip: "🎓 Structure TEF", title: "Structure complète de l'examen TEF Canada 2025 — Guide mis à jour", desc: "De zéro au CLB 7 en moins de 12 mois : tout sur la structure du TEF Canada 2025.", thumb: "https://img.youtube.com/vi/ewinNomlrtU/hqdefault.jpg" },
  { id: "Sp_xEMrgd3c", chip: "✍️ Expression Écrite", title: "TEF Canada 2025 — Modèle Expression Écrite C1/C2 corrigé", desc: "Modèle complet d'examen officiel TEF Canada avec corrigé détaillé.", thumb: "https://img.youtube.com/vi/Sp_xEMrgd3c/hqdefault.jpg" },
  { id: "upK5cKYXbS4", chip: "🍁 Immigration 2025", title: "Projections immigration Canada 2025 — Entrée Express, PNP et plus", desc: "Analyse des objectifs d'immigration Canada 2025 : Entrée Express et programmes provinciaux.", thumb: "https://img.youtube.com/vi/upK5cKYXbS4/hqdefault.jpg" },
  { id: "MwKgBqpWt-g", chip: "📰 Actualités IRCC", title: "Immigration Canada 2024 — 3 mises à jour essentielles", desc: "Les trois changements majeurs de la politique d'immigration canadienne en 2024.", thumb: "https://img.youtube.com/vi/MwKgBqpWt-g/hqdefault.jpg" },
];

export const PRICING: PricingPlan[] = [
  {
    badge: "Essentiel", name: "Starter",
    description: "Idéal pour commencer votre préparation linguistique et accéder aux formations de base.",
    priceMonthly: 199, priceAnnual: 159, currency: "CAD",
    features: [
      { text: "Accès à 3 formations au choix", included: true },
      { text: "Préparation TEF/TCF niveau débutant", included: true },
      { text: "2 examens blancs par mois", included: true },
      { text: "Certificats numériques inclus", included: true },
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
      { text: "Toutes les formations (28 programmes)", included: true },
      { text: "Préparation TEF/TCF A1 → C2", included: true },
      { text: "Examens blancs illimités", included: true },
      { text: "Coaching oral individuel (4h/mois)", included: true },
      { text: "Accompagnement dossier IRCC", included: true },
      { text: "Support 7 langues 7j/7", included: true },
      { text: "Garantie score TEF/TCF", included: true },
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

export const TEF_TESTS = [
  { tag: "IRCC Reconnu", name: "TEF Canada", desc: "Test d'Évaluation de Français pour le Canada — Oral, Écrit, Compréhension", meta: ["📅 Sessions mensuelles", "⏱ 3h45", "🎯 CLB 1–12"] },
  { tag: "IRCC Reconnu", name: "TCF Canada", desc: "Test de Connaissance du Français — Format numérique adaptatif", meta: ["📅 Toute l'année", "⏱ 2h30", "🎯 A1–C2"] },
  { tag: "En ligne", name: "TFI", desc: "Test de Français International — Résultats immédiats, accès 7j/7", meta: ["📅 24h/24", "⏱ 1h30", "🎯 Employeurs"] },
  { tag: "Diplôme à vie", name: "DELF / DALF", desc: "Diplômes d'État français valables à vie — Alliance Française partenaire", meta: ["📅 2× par an", "⏱ Variable", "🎯 A1–C2"] },
];

export const IMMIGRATION_STEPS = [
  { num: 1, title: "Évaluation du profil d'immigration", desc: "Test de positionnement linguistique + analyse de votre dossier pour identifier le programme optimal (Express Entry, PEQ, MPNP, etc.)." },
  { num: 2, title: "Préparation TEF / TCF certifiée", desc: "Cours intensifs ciblés sur votre objectif de score CLB. Simulation d'examen officielle incluse. Garantie de résultat." },
  { num: 3, title: "Constitution du dossier IRCC", desc: "Accompagnement par nos agents certifiés pour les formulaires, les documents justificatifs et le portail IRCC." },
  { num: 4, title: "Intégration & Emploi au Québec", desc: "Coaching d'insertion professionnelle, CV québécois, préparation aux entretiens et réseau d'employeurs partenaires." },
];

export const COUNTRIES = ["🇭🇹 Haïti", "🇸🇳 Sénégal", "🇲🇦 Maroc", "🇨🇲 Cameroun", "🇨🇮 Côte d'Ivoire", "🇬🇳 Guinée", "🇧🇫 Burkina Faso", "🇩🇿 Algérie", "🇫🇷 France", "🇧🇪 Belgique"];

export const PROVINCES = [
  { name: "🍁 Québec", sub: "PEQ · Investisseurs · RAMQ" },
  { name: "🌾 Manitoba", sub: "MPNP · Travailleurs qualifiés" },
  { name: "🏙️ Ontario", sub: "OINP · Express Entry" },
  { name: "🌊 C.-Britannique", sub: "BC PNP · Tech Pilot" },
];

export const PAYMENT_METHODS = [
  "💳 VISA", "💳 Mastercard", "🏦 Virement",
  "📱 MTN Money", "📱 Orange Money", "📱 Wave",
  "💸 Western Union", "💸 MoneyGram",
];
