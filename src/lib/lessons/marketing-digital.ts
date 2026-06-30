import type { Lesson } from "@/types/lesson";

export const marketingDigitalLessons: Lesson[] = [
  {
    title: "Fondamentaux du marketing digital",
    objectives: [
      "Comprendre les piliers du marketing numérique (acquisition, conversion, fidélisation)",
      "Identifier les canaux digitaux pertinents selon le public cible",
      "Construire un entonnoir marketing simple (funnel AARRR)",
    ],
    content: [
      "Le marketing digital regroupe l'ensemble des actions marketing menées sur des canaux numériques : moteurs de recherche, réseaux sociaux, email, sites web et applications mobiles. Contrairement au marketing traditionnel, il permet de mesurer précisément chaque interaction et d'ajuster les campagnes en temps réel.",
      "Le modèle AARRR (Acquisition, Activation, Rétention, Recommandation, Revenu) sert de cadre pour structurer une stratégie digitale cohérente. Chaque étape correspond à un objectif précis : attirer du trafic qualifié, convertir les visiteurs en clients, les fidéliser, puis les transformer en ambassadeurs de la marque.",
      "Au Canada, le marché digital est dominé par Google (recherche), Meta (Facebook/Instagram) et de plus en plus TikTok pour les audiences plus jeunes. Le choix des canaux dépend du persona cible, du budget disponible et du cycle de vente du produit ou service.",
    ],
    keyTakeaways: [
      "Le marketing digital se mesure : chaque euro investi doit être traçable",
      "Un funnel marketing bien défini guide toutes les décisions de canal et de contenu",
      "Le bon canal dépend du public, pas des tendances du moment",
    ],
    resources: [
      { label: "Google Skillshop — Fondamentaux du marketing digital", url: "https://skillshop.withgoogle.com" },
      { label: "Meta Blueprint — Formation marketing gratuite", url: "https://www.facebook.com/business/learn" },
    ],
  },
  {
    title: "SEO & référencement naturel",
    objectives: [
      "Maîtriser les 3 piliers du SEO : technique, contenu, popularité",
      "Réaliser une recherche de mots-clés pertinente",
      "Optimiser une page web pour les moteurs de recherche",
    ],
    content: [
      "Le SEO (Search Engine Optimization) vise à améliorer la visibilité d'un site dans les résultats organiques de Google. Il repose sur trois piliers : le SEO technique (vitesse, structure, indexation), le contenu (pertinence, qualité, mots-clés) et la popularité (backlinks, autorité du domaine).",
      "La recherche de mots-clés est la première étape de toute stratégie SEO. Des outils comme Google Keyword Planner, Ubersuggest ou Ahrefs permettent d'identifier le volume de recherche et la difficulté de positionnement pour chaque terme, afin de prioriser les contenus à produire.",
      "L'optimisation on-page consiste à structurer le contenu avec des balises de titre (H1, H2), une meta description engageante, des URLs propres et un maillage interne cohérent. Google valorise également l'expérience utilisateur : temps de chargement, compatibilité mobile et contenu original.",
    ],
    keyTakeaways: [
      "Le SEO est un investissement long terme, les résultats apparaissent en 3 à 6 mois",
      "Le contenu de qualité reste le facteur de classement le plus durable",
      "La recherche de mots-clés doit précéder toute création de contenu",
    ],
    resources: [
      { label: "Google Search Central — Guide SEO débutant", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { label: "Ubersuggest — Outil gratuit de mots-clés", url: "https://neilpatel.com/ubersuggest" },
    ],
  },
  {
    title: "Publicité Google Ads & Facebook Ads",
    objectives: [
      "Configurer une campagne Google Ads orientée recherche",
      "Créer une campagne Facebook/Instagram Ads ciblée",
      "Comprendre les mécanismes d'enchères et le coût par clic",
    ],
    content: [
      "Google Ads fonctionne sur un système d'enchères en temps réel où les annonceurs paient pour apparaître sur des mots-clés spécifiques. Le Quality Score, calculé à partir de la pertinence de l'annonce et du taux de clic, influence directement le coût par clic et la position de l'annonce.",
      "Facebook Ads (Meta Ads Manager) permet un ciblage très précis basé sur les centres d'intérêt, les comportements et les données démographiques. Les campagnes les plus performantes utilisent des audiences personnalisées (clients existants) et des audiences similaires (lookalike) pour étendre la portée.",
      "Le suivi des conversions via le pixel Meta ou Google Tag Manager est indispensable pour mesurer le retour sur investissement publicitaire (ROAS). Sans suivi, impossible de savoir quelles campagnes génèrent réellement des ventes.",
    ],
    keyTakeaways: [
      "Toujours définir un objectif de campagne clair avant de lancer une publicité",
      "Le ciblage précis vaut mieux qu'un large budget mal orienté",
      "Le suivi des conversions doit être en place avant le lancement de toute campagne",
    ],
    resources: [
      { label: "Google Ads — Centre d'aide officiel", url: "https://support.google.com/google-ads" },
      { label: "Meta Ads Manager — Documentation", url: "https://www.facebook.com/business/ads-manager" },
    ],
  },
  {
    title: "Réseaux sociaux & community management",
    objectives: [
      "Élaborer une ligne éditoriale adaptée à chaque plateforme",
      "Planifier un calendrier de publication cohérent",
      "Gérer la relation client et la réputation en ligne",
    ],
    content: [
      "Chaque réseau social a son propre langage et ses propres attentes : LinkedIn pour le B2B et l'expertise, Instagram pour le visuel et l'inspiration, TikTok pour le divertissement rapide, Facebook pour les communautés locales. Une ligne éditoriale efficace adapte le ton et le format à chaque plateforme.",
      "La planification éditoriale via des outils comme Meta Business Suite, Hootsuite ou Buffer permet d'assurer une présence régulière sans surcharge quotidienne. La règle des 80/20 recommande 80% de contenu de valeur (éducatif, divertissant) et 20% de contenu promotionnel.",
      "Le community management implique de répondre rapidement aux commentaires et messages, de gérer les avis négatifs avec professionnalisme et de surveiller la réputation de la marque. Une réponse rapide et empathique transforme souvent une critique en opportunité de fidélisation.",
    ],
    keyTakeaways: [
      "La régularité de publication compte plus que la fréquence brute",
      "Chaque plateforme exige un format et un ton spécifiques",
      "La gestion des avis négatifs est aussi importante que la création de contenu",
    ],
    resources: [
      { label: "Meta Business Suite", url: "https://business.facebook.com" },
      { label: "Hootsuite Academy — Formation gratuite", url: "https://education.hootsuite.com" },
    ],
  },
  {
    title: "E-commerce : création de boutique en ligne",
    objectives: [
      "Choisir la bonne plateforme e-commerce selon son besoin",
      "Structurer une fiche produit qui convertit",
      "Mettre en place un parcours d'achat fluide",
    ],
    content: [
      "Les plateformes e-commerce les plus utilisées au Canada sont Shopify (simplicité, écosystème d'applications), WooCommerce (flexibilité via WordPress) et Wix (pour les petites boutiques). Le choix dépend du volume de produits, du budget technique et des besoins d'intégration avec d'autres outils.",
      "Une fiche produit performante combine des photos de qualité professionnelle, une description orientée bénéfices (pas seulement caractéristiques), des avis clients visibles et un appel à l'action clair. Le taux de conversion moyen en e-commerce tourne autour de 2 à 3% — chaque détail compte.",
      "Le parcours d'achat doit minimiser les frictions : processus de paiement en 3 étapes maximum, options de paiement multiples (carte, PayPal, Apple Pay), affichage transparent des frais de livraison et politique de retour claire. L'abandon de panier moyen dépasse 70% — souvent dû à des frais cachés découverts trop tard.",
    ],
    keyTakeaways: [
      "La plateforme doit correspondre à la taille et à la complexité du catalogue",
      "Les photos et avis clients influencent davantage la conversion que le prix",
      "Réduire les étapes du tunnel d'achat diminue directement l'abandon de panier",
    ],
    resources: [
      { label: "Shopify Compass — Cours e-commerce gratuits", url: "https://www.shopify.com/compass" },
      { label: "Baymard Institute — Recherche UX e-commerce", url: "https://baymard.com" },
    ],
  },
  {
    title: "Analytics & mesure de performance",
    objectives: [
      "Configurer Google Analytics 4 pour suivre les conversions",
      "Identifier les indicateurs clés de performance (KPI) pertinents",
      "Interpréter un rapport pour ajuster une stratégie",
    ],
    content: [
      "Google Analytics 4 (GA4) remplace Universal Analytics avec un modèle basé sur les événements plutôt que les sessions. Il permet de suivre le parcours complet d'un utilisateur, des réseaux sociaux jusqu'à l'achat, en passant par plusieurs appareils.",
      "Les KPI essentiels varient selon l'objectif business : taux de conversion et panier moyen pour l'e-commerce, taux de génération de leads pour le B2B, taux d'engagement pour les médias. Il faut éviter de se noyer dans des métriques de vanité (vues, likes) qui n'ont pas d'impact direct sur le revenu.",
      "L'analyse de données doit déboucher sur des actions concrètes : si le taux de rebond est élevé sur une landing page, tester un nouveau titre ou une nouvelle image. Le marketing digital est un cycle continu de mesure, hypothèse et test (A/B testing).",
    ],
    keyTakeaways: [
      "Mesurer sans agir n'a aucune valeur — chaque rapport doit mener à une décision",
      "Les KPI doivent être alignés sur les objectifs business réels, pas sur la vanité",
      "Le A/B testing est la méthode la plus fiable pour valider une hypothèse marketing",
    ],
    resources: [
      { label: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy" },
      { label: "Google Optimize — Guide A/B testing", url: "https://support.google.com/optimize" },
    ],
  },
  {
    title: "Stratégie de contenu & copywriting",
    objectives: [
      "Définir une stratégie de contenu alignée sur le parcours client",
      "Appliquer les bases du copywriting persuasif",
      "Produire des contenus adaptés à chaque étape du funnel",
    ],
    content: [
      "Une stratégie de contenu efficace répond aux questions du client à chaque étape de son parcours : contenu éducatif en haut de funnel (articles de blog, vidéos explicatives), contenu de comparaison au milieu (études de cas, démonstrations) et contenu de conversion en bas (témoignages, offres limitées).",
      "Le copywriting repose sur des structures éprouvées comme AIDA (Attention, Intérêt, Désir, Action) ou PAS (Problème, Agitation, Solution). L'objectif est toujours de parler des bénéfices pour le client plutôt que des caractéristiques du produit.",
      "La cohérence de ton et de message à travers tous les supports (site web, réseaux sociaux, emails) renforce la confiance de la marque. Un guide de style éditorial simple — vocabulaire à utiliser, ton, valeurs à transmettre — aide toute une équipe à produire du contenu aligné.",
    ],
    keyTakeaways: [
      "Chaque contenu doit correspondre à une étape précise du parcours client",
      "Parler des bénéfices convertit mieux que lister des caractéristiques",
      "La cohérence de ton sur tous les canaux construit la confiance dans la marque",
    ],
    resources: [
      { label: "Copyblogger — Ressources copywriting", url: "https://copyblogger.com" },
      { label: "HubSpot Academy — Content Marketing", url: "https://academy.hubspot.com" },
    ],
  },
  {
    title: "Projet final : lancement d'une campagne complète",
    objectives: [
      "Concevoir une stratégie marketing digitale de bout en bout",
      "Présenter un plan de campagne avec budget et KPI",
      "Défendre ses choix stratégiques devant un jury",
    ],
    content: [
      "Le projet final consiste à concevoir une campagne marketing complète pour une entreprise fictive ou réelle : définition de la cible, choix des canaux, création de contenus, plan média et budget, ainsi que les indicateurs de succès à suivre.",
      "Chaque étudiant doit justifier ses choix : pourquoi ce canal plutôt qu'un autre, comment le budget est réparti entre acquisition et fidélisation, et quels résultats sont attendus à 30, 60 et 90 jours. La cohérence entre objectifs, budget et canaux est évaluée en priorité.",
      "La présentation orale devant un jury de formateurs reproduit les conditions réelles d'une soutenance de stratégie en entreprise. Elle évalue à la fois la solidité de la stratégie et la capacité à la communiquer clairement à des décideurs non-experts.",
    ],
    keyTakeaways: [
      "Une bonne stratégie se mesure à sa cohérence interne, pas à sa complexité",
      "Savoir défendre ses choix devant un public non-expert est une compétence clé",
      "Le projet final valide la capacité à appliquer la théorie à un cas concret",
    ],
    resources: [
      { label: "Template gratuit de plan marketing — HubSpot", url: "https://www.hubspot.com/marketing-plan-template-generator" },
    ],
  },
];
