/**
 * ARCADINS — CONTENU APPROFONDI des Formations professionnelles (Département B).
 * Complète src/lib/data/programs.ts (qui reste la source des noms/prix/statuts) avec,
 * pour chaque formation : objectifs d'apprentissage, public visé, débouchés (métiers
 * VISÉS, jamais garantis), prérequis et une description par module.
 *
 * INTÉGRITÉ : aucun chiffre inventé, aucune garantie d'emploi, aucune accréditation
 * non prouvée. La reconnaissance délivrée est une « attestation de complétion ARCADINS ».
 * Français d'abord (lancement FR) — localisation ultérieure.
 */

export interface FormationModuleDetail {
  /** Doit correspondre au titre listé dans programs.ts (même ordre). */
  title: string;
  /** Ce que couvre le module (1–2 phrases factuelles). */
  description: string;
}

export interface FormationDetail {
  /** Accroche courte affichée sous le titre de section. */
  tagline: string;
  /** « À la fin de cette formation, vous serez capable de… » */
  objectives: string[];
  /** « À qui s'adresse cette formation » */
  audience: string[];
  /** Métiers et débouchés VISÉS (présentés comme possibilités, pas des garanties). */
  careers: string[];
  /** Prérequis honnêtes (souvent : aucun prérequis technique). */
  prerequisites: string[];
  /** Description module par module (même ordre que programs.ts). */
  modules: FormationModuleDetail[];
}

export const FORMATION_DETAILS: Record<string, FormationDetail> = {
  "marketing-digital": {
    tagline: "Devenez opérationnel sur toute la chaîne du marketing numérique et de la vente en ligne.",
    objectives: [
      "Concevoir et piloter une stratégie de marketing digital cohérente, du positionnement à la mesure des résultats.",
      "Lancer et optimiser des campagnes publicitaires sur Google Ads et Meta (Facebook/Instagram).",
      "Améliorer la visibilité d'un site grâce au référencement naturel (SEO).",
      "Créer et gérer une boutique e-commerce fonctionnelle.",
      "Analyser la performance avec des outils d'analytics et ajuster vos actions.",
    ],
    audience: [
      "Nouveaux arrivants souhaitant une compétence numérique recherchée sur le marché canadien.",
      "Entrepreneurs et travailleurs autonomes voulant vendre en ligne.",
      "Professionnels en reconversion vers les métiers du digital.",
    ],
    careers: [
      "Spécialiste marketing digital",
      "Gestionnaire de médias sociaux / community manager",
      "Assistant e-commerce",
      "Chargé de campagnes publicitaires (Ads)",
      "Consultant SEO junior",
    ],
    prerequisites: [
      "Aucun prérequis technique.",
      "Aisance de base avec un ordinateur et Internet.",
      "Motivation à réaliser des exercices pratiques.",
    ],
    modules: [
      { title: "Fondamentaux du marketing digital", description: "Panorama des canaux, parcours client, positionnement et objectifs mesurables." },
      { title: "SEO & référencement naturel", description: "Recherche de mots-clés, optimisation on-page, contenu et bases du netlinking." },
      { title: "Publicité Google Ads & Facebook Ads", description: "Structurer des campagnes, cibler une audience, définir un budget et lire les résultats." },
      { title: "Réseaux sociaux & community management", description: "Calendrier éditorial, création de publications et animation d'une communauté." },
      { title: "E-commerce : création de boutique en ligne", description: "Mettre en place une boutique, gérer un catalogue produits et le tunnel d'achat." },
      { title: "Analytics & mesure de performance", description: "Suivre le trafic et les conversions, comprendre les indicateurs clés et itérer." },
      { title: "Stratégie de contenu & copywriting", description: "Écrire pour convertir : accroches, pages de vente et emails." },
      { title: "Projet final : lancement d'une campagne complète", description: "Concevoir, exécuter et présenter une campagne de bout en bout." },
    ],
  },

  "informatique": {
    tagline: "Acquérez des bases solides en technologies de l'information et en transformation numérique.",
    objectives: [
      "Comprendre l'architecture des systèmes informatiques et du cloud (AWS, Azure, GCP).",
      "Saisir les principes de l'intelligence artificielle et du machine learning appliqués à l'entreprise.",
      "Appliquer les bonnes pratiques de cybersécurité et de protection des données.",
      "Manipuler des bases de données et comprendre le développement web.",
      "Piloter un projet technologique selon les méthodes Agile/Scrum.",
    ],
    audience: [
      "Personnes souhaitant s'orienter vers les métiers de la tech sans diplôme préalable en informatique.",
      "Professionnels devant accompagner la digitalisation de leur organisation.",
      "Curieux motivés par une montée en compétences structurée.",
    ],
    careers: [
      "Technicien de support informatique",
      "Assistant administrateur cloud",
      "Analyste junior en cybersécurité",
      "Coordonnateur de projet IT",
      "Assistant data / bases de données",
    ],
    prerequisites: [
      "Aucun prérequis en programmation.",
      "Bonne logique et rigueur.",
      "Ordinateur avec connexion Internet.",
    ],
    modules: [
      { title: "Introduction aux systèmes informatiques", description: "Matériel, systèmes d'exploitation, réseaux et vocabulaire essentiel." },
      { title: "Cloud computing (AWS, Azure, GCP)", description: "Concepts du cloud, principaux services et cas d'usage en entreprise." },
      { title: "Intelligence artificielle & machine learning", description: "Notions clés, types d'apprentissage et applications concrètes." },
      { title: "Cybersécurité & protection des données", description: "Menaces courantes, hygiène numérique et protection des données personnelles." },
      { title: "Gestion de bases de données", description: "Modélisation, requêtes de base et bonnes pratiques de gestion des données." },
      { title: "Développement web & applications", description: "Fonctionnement du web, front/back et cycle de vie d'une application." },
      { title: "Gestion de projets IT (Agile/Scrum)", description: "Rôles, rituels et outils pour livrer un projet en équipe." },
      { title: "Projet final : transformation digitale d'entreprise", description: "Étude de cas : proposer et présenter un plan de digitalisation." },
    ],
  },

  "francais-affaires": {
    tagline: "Communiquez avec assurance en français dans le milieu de travail canadien.",
    objectives: [
      "Maîtriser le vocabulaire professionnel utile en entreprise.",
      "Communiquer clairement à l'oral en contexte professionnel.",
      "Rédiger des courriels et rapports professionnels structurés.",
      "Comprendre les expressions et codes du français québécois au travail.",
      "Aborder avec aisance un entretien d'embauche en français.",
    ],
    audience: [
      "Professionnels immigrants souhaitant s'intégrer rapidement au marché du travail francophone.",
      "Personnes ayant un français fonctionnel voulant gagner en aisance professionnelle.",
      "Candidats préparant des entretiens ou une prise de poste au Québec/Canada.",
    ],
    careers: [
      "Meilleure intégration en emploi francophone",
      "Postes à forte communication (service, administration, vente)",
      "Évolution vers des fonctions client ou d'équipe",
    ],
    prerequisites: [
      "Niveau de français intermédiaire recommandé (compréhension de base).",
      "Volonté de pratiquer à l'oral et à l'écrit.",
    ],
    modules: [
      { title: "Français professionnel : bases et vocabulaire", description: "Vocabulaire du bureau, de l'entreprise et des échanges courants." },
      { title: "Communication orale en entreprise", description: "Se présenter, participer à une réunion et échanger avec des collègues." },
      { title: "Rédaction professionnelle (courriels, rapports)", description: "Structurer un courriel clair et un rapport simple et efficace." },
      { title: "Français québécois : expressions et culture", description: "Expressions courantes, registres et codes culturels du milieu de travail." },
      { title: "Préparation aux entretiens d'embauche", description: "CV, lettre, questions fréquentes et posture en entretien." },
      { title: "Négociation et présentation en français", description: "Argumenter, convaincre et présenter devant un groupe." },
      { title: "Terminologie sectorielle (finance, tech, santé)", description: "Vocabulaire spécialisé selon votre domaine cible." },
      { title: "Examen final & certification", description: "Évaluation des acquis et attestation de complétion ARCADINS." },
    ],
  },

  "entrepreneuriat": {
    tagline: "Passez de l'idée au lancement d'une entreprise dans le contexte canadien.",
    objectives: [
      "Valider une idée d'entreprise et cerner son marché.",
      "Construire un plan d'affaires et un modèle financier crédibles.",
      "Identifier les sources de financement (subventions, prêts, investisseurs).",
      "Comprendre le cadre juridique des affaires au Canada.",
      "Acquérir vos premiers clients et présenter un pitch convaincant.",
    ],
    audience: [
      "Futurs entrepreneurs et travailleurs autonomes.",
      "Nouveaux arrivants voulant créer leur activité au Canada.",
      "Porteurs de projet cherchant une méthode structurée.",
    ],
    careers: [
      "Création de sa propre entreprise",
      "Travailleur autonome / consultant",
      "Chargé de développement dans une jeune entreprise",
    ],
    prerequisites: [
      "Aucun prérequis en gestion.",
      "Une idée ou une envie d'entreprendre.",
    ],
    modules: [
      { title: "Écosystème entrepreneurial canadien", description: "Acteurs, ressources et soutiens disponibles pour entreprendre au Canada." },
      { title: "Idéation et validation de concept", description: "Tester une idée, comprendre le besoin et valider auprès du marché." },
      { title: "Plan d'affaires et modèle financier", description: "Structurer son projet et bâtir des prévisions financières réalistes." },
      { title: "Financement : subventions, investisseurs, prêts", description: "Panorama des options et préparation d'une demande de financement." },
      { title: "Droit des affaires au Canada", description: "Formes juridiques, obligations et notions contractuelles essentielles." },
      { title: "Marketing et acquisition de clients", description: "Trouver ses premiers clients et bâtir une offre claire." },
      { title: "Innovation et propriété intellectuelle", description: "Protéger ses idées et intégrer l'innovation dans son projet." },
      { title: "Projet final : pitch devant un jury", description: "Présenter et défendre son projet d'entreprise." },
    ],
  },

  "finance": {
    tagline: "Maîtrisez la comptabilité et la gestion financière en contexte canadien.",
    objectives: [
      "Comprendre les principes comptables canadiens (NCECF/IFRS).",
      "Tenir des livres et produire des états financiers de base.",
      "Appréhender la fiscalité des particuliers et des entreprises.",
      "Réaliser une analyse financière avec les ratios clés.",
      "Utiliser des logiciels comptables courants (QuickBooks, Sage).",
    ],
    audience: [
      "Personnes visant un poste en comptabilité ou en gestion.",
      "Entrepreneurs voulant gérer eux-mêmes leurs finances.",
      "Professionnels souhaitant se mettre à jour sur le cadre canadien.",
    ],
    careers: [
      "Commis / technicien comptable",
      "Aide-comptable",
      "Assistant à la gestion financière",
      "Responsable de la tenue de livres (petite entreprise)",
    ],
    prerequisites: [
      "Aisance avec les chiffres.",
      "Aucun diplôme comptable requis.",
    ],
    modules: [
      { title: "Principes comptables canadiens (NCECF/IFRS)", description: "Cadre normatif, notions de base et vocabulaire comptable." },
      { title: "Tenue de livres et états financiers", description: "Enregistrer les opérations et produire bilan et résultat." },
      { title: "Fiscalité canadienne (particuliers & entreprises)", description: "Grands principes d'impôt et obligations déclaratives." },
      { title: "Analyse financière et ratios", description: "Lire des états financiers et interpréter les indicateurs clés." },
      { title: "Planification budgétaire", description: "Construire un budget et suivre les écarts." },
      { title: "Paie et avantages sociaux", description: "Notions de paie, retenues et avantages sociaux au Canada." },
      { title: "Logiciels comptables (QuickBooks, Sage)", description: "Prise en main pratique des outils de comptabilité." },
      { title: "Examen final & certification", description: "Évaluation des acquis et attestation de complétion ARCADINS." },
    ],
  },

  "rh": {
    tagline: "Développez les compétences clés de la gestion des ressources humaines au Canada.",
    objectives: [
      "Connaître les bases du droit du travail au Québec et au Canada.",
      "Mener un processus de recrutement et de sélection.",
      "Gérer la performance et le développement des employés.",
      "Comprendre la rémunération et les avantages sociaux.",
      "Favoriser des relations de travail saines et inclusives.",
    ],
    audience: [
      "Personnes visant un poste en ressources humaines.",
      "Gestionnaires souhaitant mieux encadrer leurs équipes.",
      "Professionnels en reconversion vers les RH.",
    ],
    careers: [
      "Adjoint / assistant RH",
      "Chargé de recrutement",
      "Coordonnateur formation & développement",
      "Généraliste RH junior",
    ],
    prerequisites: [
      "Aucun prérequis particulier.",
      "Intérêt pour les relations humaines et l'organisation.",
    ],
    modules: [
      { title: "Droit du travail au Québec et au Canada", description: "Cadre légal, contrats et obligations de l'employeur." },
      { title: "Recrutement et sélection", description: "Rédiger une offre, trier les candidatures et mener un entretien." },
      { title: "Gestion de la performance", description: "Objectifs, feedback et évaluation des employés." },
      { title: "Rémunération et avantages sociaux", description: "Structures de rémunération et avantages courants." },
      { title: "Formation et développement des compétences", description: "Identifier les besoins et bâtir un plan de développement." },
      { title: "Relations de travail et médiation", description: "Prévenir et gérer les conflits en milieu de travail." },
      { title: "Diversité et inclusion en milieu de travail", description: "Pratiques favorisant un environnement équitable et inclusif." },
      { title: "Projet final : plan RH stratégique", description: "Concevoir un plan RH pour une organisation type." },
    ],
  },

  "tourisme": {
    tagline: "Préparez-vous aux métiers du tourisme, de l'hôtellerie et de l'accueil.",
    objectives: [
      "Comprendre l'industrie touristique canadienne et ses acteurs.",
      "Gérer les opérations d'hébergement et de restauration.",
      "Offrir un service à la clientèle d'excellence.",
      "Participer à l'organisation d'événements.",
      "Appliquer les normes et la réglementation du secteur.",
    ],
    audience: [
      "Personnes attirées par l'accueil, l'hôtellerie et l'événementiel.",
      "Nouveaux arrivants visant un secteur qui recrute.",
      "Professionnels du service souhaitant se spécialiser.",
    ],
    careers: [
      "Agent / préposé à l'accueil et à la réception",
      "Employé en hôtellerie et hébergement",
      "Assistant en restauration",
      "Coordonnateur d'événements junior",
    ],
    prerequisites: [
      "Sens du service et de la relation client.",
      "Aucun prérequis technique.",
    ],
    modules: [
      { title: "Introduction au tourisme canadien", description: "Panorama du secteur, acteurs et tendances." },
      { title: "Gestion hôtelière et hébergement", description: "Réception, réservations et opérations d'hébergement." },
      { title: "Service à la clientèle d'excellence", description: "Accueil, gestion des demandes et satisfaction client." },
      { title: "Gestion de la restauration", description: "Bases des opérations en restauration et hygiène." },
      { title: "Organisation d'événements", description: "Planifier, coordonner et exécuter un événement." },
      { title: "Marketing touristique et digital", description: "Promouvoir une offre touristique en ligne." },
      { title: "Réglementation et normes de l'industrie", description: "Normes de sécurité, d'hygiène et obligations du secteur." },
      { title: "Stage pratique & certification", description: "Mise en pratique supervisée via études de cas, puis attestation de complétion ARCADINS." },
    ],
  },

  "anglais-commercial": {
    tagline: "Gagnez en aisance en anglais des affaires pour évoluer dans un environnement bilingue.",
    objectives: [
      "Maîtriser le vocabulaire de l'anglais des affaires (business English).",
      "Communiquer par courriel et à l'oral en contexte professionnel.",
      "Animer réunions et présentations en anglais.",
      "Négocier et argumenter en anglais.",
      "Rédiger des documents professionnels clairs.",
    ],
    audience: [
      "Professionnels évoluant dans un environnement bilingue au Canada.",
      "Personnes ayant un anglais fonctionnel voulant gagner en confiance.",
      "Candidats à des postes exigeant l'anglais professionnel.",
    ],
    careers: [
      "Postes bilingues (service, vente, administration)",
      "Fonctions client à l'international",
      "Meilleure mobilité professionnelle",
    ],
    prerequisites: [
      "Niveau d'anglais intermédiaire recommandé.",
      "Volonté de pratiquer régulièrement.",
    ],
    modules: [
      { title: "Business English fundamentals", description: "Vocabulaire et structures de l'anglais professionnel." },
      { title: "Professional communication & emails", description: "Rédiger des courriels clairs et adaptés au contexte." },
      { title: "Meetings, presentations & public speaking", description: "Participer et présenter avec assurance en anglais." },
      { title: "Negotiation skills in English", description: "Argumenter et négocier efficacement." },
      { title: "Business writing & reports", description: "Produire des documents et rapports professionnels." },
      { title: "Industry-specific vocabulary", description: "Vocabulaire spécialisé selon votre secteur." },
      { title: "Canadian workplace culture in English", description: "Codes et attentes du milieu de travail canadien." },
      { title: "Final exam & certification", description: "Évaluation des acquis et attestation de complétion ARCADINS." },
    ],
  },

  "relation-aide": {
    tagline: "Formez-vous aux fondements de la relation d'aide et du service communautaire.",
    objectives: [
      "Comprendre les fondements de la relation d'aide.",
      "Pratiquer l'écoute active et la communication empathique.",
      "Réagir de façon adaptée en situation de crise.",
      "Connaître les enjeux de santé mentale et de dépendances.",
      "Accompagner les personnes en situation de vulnérabilité de manière éthique.",
    ],
    audience: [
      "Personnes attirées par l'accompagnement et l'aide aux autres.",
      "Bénévoles et intervenants souhaitant se professionnaliser.",
      "Nouveaux arrivants visant les services communautaires.",
    ],
    careers: [
      "Intervenant communautaire",
      "Agent de soutien / accompagnateur",
      "Aide en organisme communautaire",
      "Bénévolat structuré vers l'emploi",
    ],
    prerequisites: [
      "Écoute, empathie et respect de la confidentialité.",
      "Aucun prérequis académique.",
    ],
    modules: [
      { title: "Fondements de la relation d'aide", description: "Cadre, posture et limites de l'intervenant." },
      { title: "Écoute active et communication empathique", description: "Techniques d'écoute et de reformulation." },
      { title: "Intervention en situation de crise", description: "Repérer, désamorcer et orienter en situation difficile." },
      { title: "Santé mentale et dépendances", description: "Notions de base et repères pour accompagner." },
      { title: "Travail avec les populations vulnérables", description: "Adapter son approche selon les publics." },
      { title: "Ressources communautaires au Canada", description: "Connaître et mobiliser le réseau d'aide." },
      { title: "Éthique et déontologie professionnelle", description: "Confidentialité, consentement et cadre éthique." },
      { title: "Stage pratique & certification", description: "Mise en pratique supervisée via études de cas, puis attestation de complétion ARCADINS." },
    ],
  },
};
