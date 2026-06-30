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
    quiz: [
      { question: "Que signifie l'acronyme AARRR dans le modèle de funnel marketing ?", options: ["Acquisition, Activation, Rétention, Recommandation, Revenu", "Analyse, Audit, Recherche, Rapport, Résultat", "Audience, Action, Retour, Réussite, Rentabilité", "Achat, Abonnement, Retention, Référencement, ROI"], correctIndex: 0, explanation: "AARRR est le modèle classique de croissance qui structure le parcours client en 5 étapes mesurables." },
      { question: "Quel avantage principal distingue le marketing digital du marketing traditionnel ?", options: ["Il coûte toujours moins cher", "La possibilité de mesurer précisément chaque interaction", "Il ne nécessite aucune stratégie", "Il fonctionne uniquement sur mobile"], correctIndex: 1, explanation: "La traçabilité et la mesure précise de chaque action sont la différence fondamentale avec le marketing traditionnel." },
      { question: "Quel canal est principalement privilégié pour atteindre les audiences plus jeunes selon le texte ?", options: ["Le publipostage", "TikTok", "La radio", "Les pages jaunes"], correctIndex: 1, explanation: "TikTok est mentionné comme un canal en croissance pour toucher les audiences jeunes au Canada." },
      { question: "Le choix des canaux marketing dépend principalement de :", options: ["La météo", "Le persona cible, le budget et le cycle de vente", "La couleur du logo", "Le nombre d'employés de l'entreprise"], correctIndex: 1, explanation: "Ces trois facteurs (persona, budget, cycle de vente) déterminent la pertinence d'un canal pour une stratégie donnée." },
      { question: "Dans le funnel AARRR, quelle étape suit directement l'Acquisition ?", options: ["Revenu", "Recommandation", "Activation", "Rétention"], correctIndex: 2, explanation: "L'Activation correspond au moment où un visiteur acquis prend une première action significative." },
      { question: "Pourquoi est-il important de pouvoir ajuster une campagne en temps réel ?", options: ["Pour respecter une obligation légale", "Pour optimiser la performance et réduire le gaspillage budgétaire", "Parce que c'est obligatoire sur tous les réseaux sociaux", "Pour éviter de payer des taxes"], correctIndex: 1, explanation: "L'ajustement en temps réel permet d'optimiser le retour sur investissement en corrigeant rapidement ce qui ne fonctionne pas." },
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
    quiz: [
      { question: "Quels sont les trois piliers du SEO mentionnés dans le module ?", options: ["Vitesse, prix, design", "Technique, contenu, popularité", "Texte, image, vidéo", "Google, Bing, Yahoo"], correctIndex: 1, explanation: "Le SEO technique, le contenu et la popularité (backlinks) forment les trois piliers fondamentaux du référencement naturel." },
      { question: "Quel type de balise structure le titre principal d'une page pour le SEO ?", options: ["H1", "P", "DIV", "SPAN"], correctIndex: 0, explanation: "La balise H1 représente le titre principal et le plus important pour le SEO d'une page." },
      { question: "Combien de temps faut-il généralement pour voir les premiers résultats d'une stratégie SEO ?", options: ["24 heures", "1 semaine", "3 à 6 mois", "5 ans"], correctIndex: 2, explanation: "Le SEO est un investissement à moyen terme, les résultats significatifs apparaissent généralement entre 3 et 6 mois." },
      { question: "Que désigne un 'backlink' en SEO ?", options: ["Un lien retour vers la page précédente du navigateur", "Un lien provenant d'un autre site pointant vers le vôtre", "Un mot-clé répété plusieurs fois", "Une erreur 404"], correctIndex: 1, explanation: "Un backlink est un lien externe qui pointe vers votre site, renforçant sa popularité et son autorité aux yeux de Google." },
      { question: "Quelle étape doit précéder la création de contenu selon le module ?", options: ["L'achat de publicité", "La recherche de mots-clés", "La création du logo", "L'embauche d'un développeur"], correctIndex: 1, explanation: "La recherche de mots-clés permet d'identifier les sujets à fort potentiel avant de produire du contenu." },
      { question: "Lequel de ces éléments fait partie de l'optimisation on-page ?", options: ["La meta description", "Le salaire des employés", "La couleur du bureau", "Le numéro de téléphone du PDG"], correctIndex: 0, explanation: "La meta description, les balises de titre et les URLs propres font partie de l'optimisation on-page." },
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
    quiz: [
      { question: "Qu'est-ce que le Quality Score sur Google Ads ?", options: ["Le nombre de followers d'une page", "Un indicateur basé sur la pertinence de l'annonce et le taux de clic", "Le budget quotidien maximal", "La note attribuée par les clients"], correctIndex: 1, explanation: "Le Quality Score évalue la pertinence d'une annonce et influence directement le coût par clic et son positionnement." },
      { question: "Qu'est-ce qu'une audience 'lookalike' sur Facebook Ads ?", options: ["Une audience identique géographiquement", "Une audience similaire à vos clients existants", "Une audience composée uniquement de robots", "Une audience qui a déjà acheté"], correctIndex: 1, explanation: "Une audience lookalike (similaire) est générée par Meta à partir des caractéristiques de vos clients existants pour élargir votre portée." },
      { question: "Pourquoi le suivi des conversions est-il indispensable ?", options: ["Pour décorer le tableau de bord", "Pour mesurer le retour sur investissement publicitaire réel", "Parce que Google l'exige légalement", "Pour ralentir le site web"], correctIndex: 1, explanation: "Sans suivi des conversions, il est impossible de savoir quelles campagnes génèrent réellement des ventes ou des leads." },
      { question: "Sur quel principe fonctionne le système d'enchères de Google Ads ?", options: ["Premier arrivé, premier servi", "Enchères en temps réel sur des mots-clés", "Tirage au sort aléatoire", "Ancienneté du compte publicitaire"], correctIndex: 1, explanation: "Google Ads utilise un système d'enchères en temps réel où les annonceurs concourent pour apparaître sur des mots-clés." },
      { question: "Quel outil sert à suivre les conversions sur Facebook/Instagram Ads ?", options: ["Le pixel Meta", "Google Analytics uniquement", "Un QR code", "Le calendrier Facebook"], correctIndex: 0, explanation: "Le pixel Meta est l'outil de suivi installé sur le site web pour mesurer les actions des utilisateurs venant des publicités." },
      { question: "Que doit-on définir avant de lancer toute campagne publicitaire ?", options: ["Le nom de l'agence créative", "Un objectif de campagne clair", "La couleur préférée du PDG", "Le nombre d'employés"], correctIndex: 1, explanation: "Un objectif clair (notoriété, trafic, conversion) guide tous les choix de configuration de la campagne." },
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
    quiz: [
      { question: "Quelle plateforme est citée comme la plus adaptée au B2B et à l'expertise ?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], correctIndex: 1, explanation: "LinkedIn est le réseau privilégié pour le contenu B2B et le positionnement d'expertise professionnelle." },
      { question: "Que recommande la règle des 80/20 en gestion de contenu ?", options: ["80% de publicité, 20% de contenu organique", "80% de contenu de valeur, 20% de contenu promotionnel", "80% de vidéos, 20% de texte", "80% le matin, 20% le soir"], correctIndex: 1, explanation: "Cette règle équilibre le contenu utile à l'audience (80%) avec la promotion directe de produits/services (20%)." },
      { question: "Quel est l'un des outils mentionnés pour la planification éditoriale ?", options: ["Microsoft Excel uniquement", "Hootsuite", "Adobe Photoshop", "Google Maps"], correctIndex: 1, explanation: "Hootsuite est un outil de planification et gestion de publications sur plusieurs réseaux sociaux." },
      { question: "Comment gérer efficacement un avis négatif selon le module ?", options: ["L'ignorer complètement", "Le supprimer immédiatement", "Répondre rapidement et avec professionnalisme", "Bloquer l'utilisateur sans réponse"], correctIndex: 2, explanation: "Une réponse rapide et empathique peut transformer une critique en opportunité de fidélisation." },
      { question: "Qu'est-ce qui compte le plus selon le module : la fréquence brute ou la régularité ?", options: ["La fréquence brute", "La régularité de publication", "Aucune des deux", "Le nombre de likes uniquement"], correctIndex: 1, explanation: "La régularité (constance dans le temps) est plus importante qu'une fréquence élevée mais irrégulière." },
      { question: "Quel type de contenu est privilégié sur TikTok selon le texte ?", options: ["Articles de blog longs", "Divertissement rapide", "Rapports financiers", "Annonces d'emploi formelles"], correctIndex: 1, explanation: "TikTok est associé au divertissement rapide et au contenu court et engageant." },
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
    quiz: [
      { question: "Quelle plateforme e-commerce est décrite comme offrant flexibilité via WordPress ?", options: ["Shopify", "WooCommerce", "Wix", "Amazon"], correctIndex: 1, explanation: "WooCommerce est un plugin WordPress offrant une grande flexibilité de personnalisation pour l'e-commerce." },
      { question: "Quel est le taux de conversion moyen en e-commerce mentionné dans le module ?", options: ["50 à 60%", "2 à 3%", "90 à 100%", "0,01%"], correctIndex: 1, explanation: "Le taux de conversion moyen en e-commerce se situe généralement entre 2 et 3%, ce qui rend chaque optimisation précieuse." },
      { question: "Quel pourcentage d'abandon de panier est mentionné comme moyenne ?", options: ["Plus de 70%", "Environ 10%", "Moins de 5%", "Exactement 50%"], correctIndex: 0, explanation: "Le taux d'abandon de panier moyen dépasse 70%, souvent à cause de frais cachés découverts tardivement." },
      { question: "Qu'est-ce qui devrait être affiché de manière transparente pour réduire l'abandon de panier ?", options: ["Le nom du fondateur", "Les frais de livraison", "L'adresse du siège social", "Le nombre d'employés"], correctIndex: 1, explanation: "L'affichage transparent des frais de livraison dès le début évite les mauvaises surprises qui causent l'abandon." },
      { question: "Une description de produit efficace devrait être orientée vers :", options: ["Les caractéristiques techniques uniquement", "Les bénéfices pour le client", "Le prix uniquement", "L'historique de l'entreprise"], correctIndex: 1, explanation: "Une description orientée bénéfices répond à la question 'qu'est-ce que ça m'apporte' plutôt que de lister des caractéristiques froides." },
      { question: "Combien d'étapes maximum sont recommandées pour le processus de paiement ?", options: ["10 étapes", "3 étapes", "1 seule étape obligatoirement", "Aucune limite"], correctIndex: 1, explanation: "Un processus de paiement en 3 étapes maximum réduit les frictions et améliore le taux de conversion." },
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
    quiz: [
      { question: "Sur quel modèle repose Google Analytics 4 (GA4) ?", options: ["Les sessions uniquement", "Les événements", "Le nombre de pages vues uniquement", "Les cookies tiers exclusivement"], correctIndex: 1, explanation: "GA4 utilise un modèle basé sur les événements, permettant un suivi plus précis du parcours utilisateur multi-appareils." },
      { question: "Que désigne une 'métrique de vanité' ?", options: ["Une métrique financière critique", "Une métrique qui impressionne mais n'a pas d'impact direct sur le revenu", "Une métrique illégale à utiliser", "Le chiffre d'affaires net"], correctIndex: 1, explanation: "Les métriques de vanité (vues, likes) flattent l'ego mais ne reflètent pas toujours la performance business réelle." },
      { question: "Quelle méthode est recommandée pour valider une hypothèse marketing ?", options: ["L'intuition seule", "Le A/B testing", "Deviner au hasard", "Copier un concurrent sans analyse"], correctIndex: 1, explanation: "Le A/B testing permet de comparer deux versions et de déterminer objectivement laquelle performe mieux." },
      { question: "Quel KPI est pertinent pour une stratégie e-commerce selon le module ?", options: ["Le nombre d'abonnés Twitter", "Le taux de conversion et le panier moyen", "Le nombre d'employés", "La météo du jour"], correctIndex: 1, explanation: "Pour l'e-commerce, le taux de conversion et le panier moyen sont des KPI directement liés au chiffre d'affaires." },
      { question: "Que faire si le taux de rebond est élevé sur une landing page ?", options: ["Ne rien faire", "Tester un nouveau titre ou une nouvelle image", "Supprimer le site", "Augmenter le prix"], correctIndex: 1, explanation: "Tester des éléments comme le titre ou le visuel permet d'identifier ce qui retient mieux l'attention des visiteurs." },
      { question: "Pourquoi est-il inutile de simplement mesurer sans agir ?", options: ["Parce que mesurer coûte cher", "Parce qu'un rapport doit mener à une décision concrète", "Parce que c'est interdit par Google", "Parce que les chiffres sont toujours faux"], correctIndex: 1, explanation: "La mesure n'a de valeur que si elle débouche sur des actions concrètes pour améliorer la performance." },
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
    quiz: [
      { question: "Que signifie l'acronyme AIDA en copywriting ?", options: ["Attention, Intérêt, Désir, Action", "Audience, Information, Distribution, Analyse", "Achat, Inscription, Démonstration, Avis", "Aucune des réponses"], correctIndex: 0, explanation: "AIDA est une structure classique de persuasion : capter l'Attention, susciter l'Intérêt, créer le Désir, puis pousser à l'Action." },
      { question: "Quel type de contenu est recommandé en haut du funnel marketing ?", options: ["Offres limitées dans le temps", "Contenu éducatif (articles, vidéos explicatives)", "Témoignages clients uniquement", "Factures"], correctIndex: 1, explanation: "Le haut du funnel vise à éduquer et informer les prospects qui découvrent à peine leur problème." },
      { question: "Que signifie la structure PAS en copywriting ?", options: ["Problème, Agitation, Solution", "Prix, Avantage, Service", "Page, Action, Statistique", "Publicité, Annonce, Sponsoring"], correctIndex: 0, explanation: "PAS structure un message en identifiant le Problème, en l'Agitant (amplifiant son impact), puis en proposant la Solution." },
      { question: "Pourquoi privilégier les bénéfices plutôt que les caractéristiques dans un texte marketing ?", options: ["Parce que c'est plus court à écrire", "Parce que les bénéfices répondent au 'qu'est-ce que ça m'apporte' du client", "Parce que Google l'exige", "Parce que les caractéristiques sont interdites"], correctIndex: 1, explanation: "Les clients achètent des solutions à leurs problèmes, pas des listes de spécifications techniques." },
      { question: "Quel type de contenu est adapté au bas du funnel ?", options: ["Articles éducatifs généraux", "Témoignages et offres limitées", "Définitions de base du secteur", "Actualités générales sans rapport"], correctIndex: 1, explanation: "Le bas du funnel cible les prospects prêts à acheter, où les témoignages et offres incitent à la conversion finale." },
      { question: "Qu'est-ce qu'un guide de style éditorial sert à garantir ?", options: ["Le respect des délais de livraison", "La cohérence de ton et de message sur tous les supports", "Le budget publicitaire", "Le nombre de followers"], correctIndex: 1, explanation: "Un guide de style assure que toute une équipe produit du contenu avec un ton et un message cohérents." },
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
    quiz: [
      { question: "Quel élément est évalué en priorité dans le projet final ?", options: ["La longueur du document", "La cohérence entre objectifs, budget et canaux", "Le nombre de couleurs utilisées", "La police de caractères choisie"], correctIndex: 1, explanation: "La cohérence interne de la stratégie (objectifs alignés avec budget et canaux) est le critère d'évaluation principal." },
      { question: "Sur quelles périodes les résultats attendus doivent-ils être projetés ?", options: ["1 heure, 1 jour, 1 semaine", "30, 60 et 90 jours", "1 an, 5 ans, 10 ans", "Aucune période n'est requise"], correctIndex: 1, explanation: "Les résultats attendus doivent être projetés à 30, 60 et 90 jours pour démontrer une planification réaliste." },
      { question: "Que reproduit la présentation orale devant jury ?", options: ["Un examen écrit classique", "Les conditions réelles d'une soutenance de stratégie en entreprise", "Un jeu télévisé", "Un entretien d'embauche uniquement"], correctIndex: 1, explanation: "Cette présentation simule une situation professionnelle réelle de défense de stratégie devant des décideurs." },
      { question: "Une bonne stratégie se mesure avant tout à :", options: ["Sa complexité technique", "Sa cohérence interne", "Son coût élevé", "Le nombre de pages du document"], correctIndex: 1, explanation: "La cohérence entre les différents éléments de la stratégie prime sur la complexité ou la longueur." },
      { question: "Quelle compétence est spécifiquement évaluée en plus de la stratégie elle-même ?", options: ["La vitesse de frappe au clavier", "La capacité à communiquer clairement à des non-experts", "La connaissance du code informatique", "Le talent artistique"], correctIndex: 1, explanation: "Savoir vulgariser et communiquer une stratégie à des décideurs non-spécialistes est une compétence professionnelle clé." },
      { question: "Le projet final valide principalement quelle capacité ?", options: ["La mémorisation par cœur", "L'application de la théorie à un cas concret", "La rapidité d'exécution uniquement", "L'improvisation sans préparation"], correctIndex: 1, explanation: "L'objectif du projet final est de démontrer que l'étudiant peut appliquer les concepts appris à une situation réelle." },
    ],
  },
];
