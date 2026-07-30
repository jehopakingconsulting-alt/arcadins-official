import type { ModuleV2 } from "@/lib/academic/types";

/**
 * MODULE 2 — Étude de marché, client idéal et positionnement (semaines 4–6).
 * Programme pilote Marketing Digital et E-commerce, version académique v2.
 *
 * Rédigé en profondeur (leçons, activités interactives, exercices, quiz, études de cas).
 * Isolé du contenu v1 ; ne modifie aucune donnée. Prolonge le Module 1 (funnel, persona, CAC/LTV)
 * et prépare le Module 3 (marque et stratégie de contenu).
 *
 * Études de cas : entreprises FICTIVES, utilisées à des fins pédagogiques (jamais présentées comme
 * de vraies organisations clientes). Aucune reconnaissance officielle n'est revendiquée.
 */
export const marketingDigitalV2Module2: ModuleV2 = {
  index: 2,
  title: "Étude de marché, client idéal et positionnement",
  weeks: [4, 5, 6],
  summary:
    "Passer de l'intuition à la décision fondée sur des faits : étudier un marché, segmenter, construire un client idéal (persona + Jobs-to-be-Done), analyser la concurrence et formuler un positionnement défendable.",
  competencies: ["C5", "C6", "C7"],
  introduction:
    "Le Module 1 a posé le vocabulaire et le cadre du marketing numérique (funnel AARRR, persona, CAC/LTV). Le Module 2 répond à la question qui précède toute campagne : « à qui vend-on, sur quel marché, et pourquoi nous plutôt qu'un autre ? ». On y apprend à remplacer les suppositions par des faits vérifiés, à choisir un segment, à décrire un client idéal crédible et à construire un positionnement clair — le socle de toute la suite du programme.",
  links: {
    prerequisitesFromPrevious: [
      "Notion de persona (M1, leçon 3) — approfondie ici avec données et JTBD",
      "Funnel AARRR (M1, leçon 2) — réutilisé pour le parcours client",
      "Indicateurs CAC/LTV/conversion (M1, leçon 3) — mobilisés pour juger l'attractivité d'un marché",
    ],
    consolidatedCompetencies: ["C3 (persona) devient C6 (segmentation + persona fondé sur données)"],
    newCompetencies: [
      "C5 — étudier et mesurer un marché (recherche primaire/secondaire, TAM/SAM/SOM)",
      "C6 — segmenter et décrire un client idéal (persona, besoins, JTBD, parcours)",
      "C7 — analyser la concurrence et formuler proposition de valeur et positionnement",
    ],
    deliverablesForNextModule: [
      "Segment cible + persona principal → guideront la ligne éditoriale du Module 3",
      "Proposition de valeur + déclaration de positionnement → base des messages du Module 3",
    ],
  },
  lessons: [
    // ══════════════ SEMAINE 4 — COMPRENDRE ET ÉTUDIER UN MARCHÉ ══════════════
    {
      id: "mkt-v2-m2-l1",
      module: 2,
      week: 4,
      title: "Définir le marché et son environnement",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Avant d'étudier un marché, il faut savoir ce qu'est un marché. Beaucoup d'entrepreneurs décrivent leur « marché » comme « tout le monde » — ce qui revient à ne cibler personne. Cette leçon définit le marché avec précision et situe l'entreprise dans son environnement.",
      objectives: [
        "Définir un marché en termes de besoin, de demande et d'offre",
        "Distinguer les périmètres géographiques et les canaux (physique/numérique)",
        "Classer un modèle d'affaires (B2C, B2B, D2C, C2C, hybride)",
        "Repérer les facteurs d'environnement (PESTEL simplifié) qui influencent un marché",
      ],
      competencies: ["C5"],
      prerequisites: ["Module 1 — vocabulaire du marketing numérique et notion de persona"],
      sections: [
        {
          heading: "Qu'est-ce qu'un marché ?",
          body: [
            "Un marché est la rencontre entre une demande (des personnes ou organisations qui ont un besoin et la capacité de payer) et une offre (des solutions proposées par des vendeurs). Un marché n'existe que si trois conditions sont réunies : un besoin réel, un pouvoir d'achat, et une volonté d'agir. « Beaucoup de gens aimeraient » ne suffit pas ; encore faut-il qu'ils puissent et veuillent payer.",
            "On distingue le besoin (l'écart entre une situation actuelle et une situation souhaitée), la demande (le besoin assorti d'un pouvoir d'achat et dirigé vers une catégorie de solutions) et la solution (l'offre concrète qui répond à la demande). Confondre besoin et demande est une erreur classique : un besoin non solvable n'est pas un marché.",
          ],
        },
        {
          heading: "Périmètres et canaux",
          body: [
            "Un marché a un périmètre géographique : local (un quartier, une ville), national ou international. Le périmètre change tout — réglementation, langue, logistique, concurrence. Un marché a aussi un canal : physique (boutique, salon) ou numérique (site, marketplace, réseaux sociaux). Le commerce moderne est souvent hybride (« phygital ») : on découvre en ligne et on achète en magasin, ou l'inverse.",
          ],
        },
        {
          heading: "Modèles d'affaires",
          body: [
            "B2C (Business-to-Consumer) : l'entreprise vend à des particuliers. B2B (Business-to-Business) : elle vend à d'autres entreprises, avec des cycles plus longs et plusieurs décideurs. D2C (Direct-to-Consumer) : le fabricant vend directement au consommateur, sans intermédiaire. C2C (Consumer-to-Consumer) : des particuliers vendent à d'autres particuliers via une plateforme. Beaucoup d'entreprises combinent plusieurs modèles (hybride).",
          ],
        },
        {
          heading: "L'environnement : PESTEL simplifié",
          body: [
            "Aucun marché n'est isolé. L'analyse PESTEL examine six familles de facteurs externes : Politiques, Économiques, Sociaux, Technologiques, Environnementaux et Légaux. En version simplifiée, on retient surtout : la conjoncture économique (pouvoir d'achat, taux d'intérêt), les tendances sociales (habitudes, valeurs), les évolutions technologiques (nouveaux canaux, IA) et le cadre réglementaire (protection des données, publicité, étiquetage).",
            "L'utilité de PESTEL n'est pas de tout lister, mais d'anticiper : quel facteur externe pourrait faire grandir ou fragiliser ce marché dans les 12 à 24 mois ?",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Marché", definition: "Rencontre entre une demande solvable et une offre." },
        { term: "Demande", definition: "Besoin assorti d'un pouvoir d'achat, dirigé vers une catégorie de solutions." },
        { term: "PESTEL", definition: "Grille d'analyse des facteurs externes : Politique, Économique, Social, Technologique, Environnemental, Légal." },
        { term: "Marché hybride (phygital)", definition: "Combinaison de canaux physiques et numériques dans le parcours d'achat." },
      ],
      examples: [
        "Une microbrasserie qui vend en boutique (physique, B2C local) et livre aux restaurants (B2B) : deux marchés, un seul producteur.",
        "Une marque de cosmétiques qui abandonne les pharmacies pour vendre directement sur son site : passage à un modèle D2C.",
      ],
      commonError: {
        title: "« Mon marché, c'est tout le monde »",
        body:
          "Déclarer un marché trop large empêche toute décision : on ne peut ni choisir un canal, ni écrire un message, ni fixer un prix pour « tout le monde ». Un marché se définit toujours par un besoin précis et un groupe capable de payer.",
      },
      caseStudy: {
        title: "Café Nord-Berge (Montréal) : redéfinir son marché",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le Café Nord-Berge, un torréfacteur fictif de Montréal, se décrivait comme vendant « du bon café à tous les amateurs ». Résultat : des publicités génériques, un site sans cap, des ventes plates.",
          "En redéfinissant son marché, l'équipe identifie deux marchés distincts : un marché B2C local (particuliers du quartier achetant en boutique) et un marché B2B national (petits cafés indépendants cherchant un torréfacteur régulier). Les deux n'ont ni le même besoin, ni le même cycle d'achat, ni le même message. Séparer les deux marchés a permis de bâtir deux offres claires plutôt qu'une communication tiède destinée à personne.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l1-ia1",
          title: "Classer des modèles d'affaires",
          objective: "Reconnaître B2C, B2B, D2C et C2C sur des cas concrets.",
          instructions: [
            "Pour chaque situation, indiquez le modèle : (a) un fabricant de savon vend sur sa propre boutique en ligne ; (b) une agence vend des services à des PME ; (c) une plateforme où des particuliers revendent des vêtements ; (d) une épicerie de quartier.",
          ],
          answerKey: [
            "(a) D2C — le fabricant vend directement au consommateur.",
            "(b) B2B — vente à d'autres entreprises.",
            "(c) C2C — particuliers vendant à particuliers via une plateforme.",
            "(d) B2C — commerce vendant à des particuliers.",
          ],
          feedback:
            "Le critère décisif est QUI achète (particulier, entreprise, autre particulier) et s'il y a un intermédiaire.",
          successCriterion: "Au moins 3 des 4 cas correctement classés.",
        },
      ],
      activity: {
        title: "Situer son marché",
        prompt: [
          "Reprenez l'entreprise/projet choisi au Module 1.",
          "Rédigez une fiche : besoin adressé, périmètre géographique, canal (physique/numérique/hybride), modèle d'affaires, et 2 facteurs PESTEL pertinents.",
        ],
        deliverables: ["Une fiche « Mon marché » d'une page, prête à alimenter le dossier de marché du module."],
        estimatedMinutes: 45,
      },
      successCriteria: [
        "Le marché est défini par un besoin précis (pas « tout le monde »).",
        "Le modèle d'affaires est correctement identifié.",
        "Au moins deux facteurs d'environnement pertinents sont nommés et justifiés.",
      ],
      resources: [
        "Statistique Canada — données démographiques et économiques (statcan.gc.ca)",
        "Institut de la statistique du Québec (statistique.quebec.ca)",
      ],
      glossary: [
        { term: "B2C / B2B / D2C / C2C", definition: "Modèles selon la nature de l'acheteur et la présence d'intermédiaires." },
        { term: "Solvabilité", definition: "Capacité réelle d'un acheteur à payer la solution." },
      ],
      summary:
        "Un marché = une demande solvable + une offre, dans un périmètre et un canal donnés, encadré par un environnement (PESTEL). Le définir avec précision est le préalable à toute décision marketing.",
      selfAssessment: [
        "Puis-je énoncer mon marché en une phrase sans dire « tout le monde » ?",
        "Puis-je nommer mon modèle d'affaires et un facteur d'environnement clé ?",
      ],
      quiz: { id: "mkt-v2-m2-l1-qz", questionIds: ["mkt-v2-m2-q01", "mkt-v2-m2-q02"], passThreshold: 70 },
      keyTakeaways: [
        "Un marché exige un besoin réel, un pouvoir d'achat et une volonté d'agir.",
        "Définir périmètre, canal et modèle d'affaires oriente toutes les décisions suivantes.",
        "PESTEL sert à anticiper ce qui peut faire grandir ou fragiliser le marché.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Solide. Vous pouvez passer à la recherche de marché (leçon 4.2)." },
        { condition: "score < 70", message: "Revoyez la distinction besoin/demande/solution et les modèles d'affaires avant de continuer." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 4.2 ; non bloquant seul.",
    },
    {
      id: "mkt-v2-m2-l2",
      module: 2,
      week: 4,
      title: "Recherche primaire et recherche secondaire",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Étudier un marché, c'est chercher des faits. Encore faut-il savoir où chercher et à quel point faire confiance à ce qu'on trouve. Cette leçon distingue les deux grandes familles de données et apprend à évaluer la fiabilité des sources.",
      objectives: [
        "Distinguer données primaires et secondaires",
        "Identifier des sources fiables et repérer les sources douteuses",
        "Choisir la bonne méthode de collecte selon la question posée",
        "Vérifier une source (récence, autorité, méthode, intérêt)",
      ],
      competencies: ["C5"],
      prerequisites: ["Leçon 4.1 — définition du marché"],
      sections: [
        {
          heading: "Primaire vs secondaire",
          body: [
            "Les données secondaires existent déjà : quelqu'un les a collectées avant vous. Ce sont les statistiques publiques (Statistique Canada, ISQ), les rapports sectoriels, les articles, les données des plateformes, les avis en ligne. Elles sont rapides et peu coûteuses, mais rarement taillées pour votre question précise.",
            "Les données primaires, vous les collectez vous-même : entretiens, sondages, observation, tests. Elles sont sur mesure et récentes, mais coûtent du temps et exigent de la méthode pour éviter les biais.",
            "La règle pratique : commencer par le secondaire (pour cadrer et éviter de réinventer ce qui est connu), puis compléter par du primaire là où le secondaire est muet ou trop général.",
          ],
        },
        {
          heading: "Où chercher des données secondaires",
          body: [
            "Sources publiques fiables : organismes statistiques (Statistique Canada, ISQ), ministères, banques centrales. Rapports sectoriels : associations professionnelles, cabinets d'études. Plateformes : tendances de recherche, données d'audience des réseaux, plateformes d'avis (avec prudence). Données internes : vos propres ventes, votre service client, vos analyses de site — souvent la mine la plus sous-exploitée.",
          ],
        },
        {
          heading: "Méthodes de collecte primaire",
          body: [
            "Entretien individuel : idéal pour comprendre le « pourquoi », en profondeur, sur un petit nombre de personnes. Sondage : idéal pour mesurer « combien », sur un grand nombre, mais ne capte que ce que les gens déclarent. Observation : regarder ce que les gens font réellement (en boutique, sur un site), souvent plus fiable que ce qu'ils disent. Test : proposer une offre et mesurer la réaction réelle.",
          ],
        },
        {
          heading: "Vérifier une source",
          body: [
            "Quatre questions : Récence (la donnée est-elle à jour ?), Autorité (qui l'a produite, avec quelle légitimité ?), Méthode (comment a-t-elle été collectée, sur quel échantillon ?), Intérêt (l'auteur a-t-il un intérêt à orienter le résultat ?). Une statistique impressionnante sans méthode ni source vérifiable ne vaut rien pour décider.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Donnée secondaire", definition: "Donnée déjà collectée par un tiers (statistiques, rapports, avis)." },
        { term: "Donnée primaire", definition: "Donnée que l'on collecte soi-même (entretien, sondage, observation)." },
        { term: "Source fiable", definition: "Source récente, faisant autorité, à la méthode transparente et sans conflit d'intérêt évident." },
      ],
      examples: [
        "Utiliser Statistique Canada pour estimer le nombre de ménages d'un quartier (secondaire), puis interviewer 8 clients pour comprendre leurs freins (primaire).",
        "Croiser les avis d'une marketplace (secondaire, à pondérer) avec ses propres tickets de service client (primaire interne).",
      ],
      commonError: {
        title: "Prendre un chiffre trouvé en ligne pour argent comptant",
        body:
          "Un chiffre partagé sur un réseau social ou un blog sans source ni méthode n'est pas une donnée : c'est une rumeur. Toujours remonter à la source d'origine et vérifier récence, autorité et méthode.",
      },
      caseStudy: {
        title: "Boutique Verdoyant (Canada) : le sondage qui mentait",
        region: "canadienne",
        isFictional: true,
        body: [
          "Verdoyant, une boutique fictive de plantes d'intérieur, sonde ses abonnés : « Seriez-vous prêts à payer pour un service d'entretien à domicile ? » 78 % répondent oui. Enthousiaste, l'entreprise lance le service. Trois mois plus tard, presque personne n'a acheté.",
          "L'erreur : le sondage mesurait une intention déclarée, pas un comportement réel. Les gens disent « oui » facilement à une question hypothétique. Une observation (ou un pré-achat payant test) aurait révélé la vérité plus tôt. Leçon : ce que les gens disent et ce qu'ils font diffèrent souvent — croiser déclaratif et comportement.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l2-ia1",
          title: "Classer des sources par fiabilité",
          objective: "Hiérarchiser des sources selon récence, autorité, méthode et intérêt.",
          instructions: [
            "Classez du plus fiable au moins fiable : (a) rapport 2025 de Statistique Canada ; (b) publication anonyme sur un forum ; (c) étude sectorielle d'une association professionnelle datée de 2024 ; (d) page de vente d'un concurrent affirmant « 90 % de clients satisfaits ».",
          ],
          answerKey: [
            "Ordre fiable → douteux : (a) > (c) > (d) > (b).",
            "(a) autorité + méthode publiques et récentes ; (c) crédible mais possiblement orientée ; (d) intérêt commercial évident, méthode inconnue ; (b) ni autorité ni méthode.",
          ],
          feedback: "L'intérêt de l'auteur et l'absence de méthode font chuter la fiabilité, même si le chiffre est flatteur.",
          successCriterion: "Ordre correct ou (a) et (c) placés devant (d) et (b).",
        },
        {
          id: "mkt-v2-m2-l2-ia2",
          title: "Associer une donnée à sa méthode",
          objective: "Choisir la méthode de collecte adaptée à une question.",
          instructions: [
            "Associez : (1) « Combien de personnes du quartier connaissent la marque ? » ; (2) « Pourquoi les clients abandonnent-ils le panier ? » ; (3) « Que font réellement les visiteurs sur la page produit ? »",
            "Méthodes : sondage · entretien · observation.",
          ],
          answerKey: ["1 → sondage (mesurer combien).", "2 → entretien (comprendre le pourquoi).", "3 → observation (mesurer le comportement réel)."],
          feedback: "« Combien » → sondage ; « pourquoi » → entretien ; « ce qu'ils font » → observation.",
          successCriterion: "Les 3 associations correctes.",
        },
      ],
      activity: {
        title: "Constituer un dossier de sources",
        prompt: [
          "Pour votre marché, rassemblez 3 sources secondaires (dont au moins une publique) et notez pour chacune : récence, autorité, méthode, intérêt.",
          "Formulez 2 questions que seul du primaire (entretien/observation) pourra éclairer.",
        ],
        deliverables: ["Un tableau de 3 sources évaluées + 2 questions de recherche primaire."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Au moins une source publique fiable est utilisée et correctement évaluée.",
        "La distinction primaire/secondaire est appliquée sans confusion.",
        "Les questions de primaire portent sur ce que le secondaire ne dit pas.",
      ],
      resources: [
        "Statistique Canada (statcan.gc.ca)",
        "Institut de la statistique du Québec (statistique.quebec.ca)",
        "Google Trends — tendances de recherche (trends.google.com)",
      ],
      glossary: [
        { term: "Biais de déclaration", definition: "Écart entre ce que les gens disent et ce qu'ils font réellement." },
        { term: "Donnée interne", definition: "Donnée issue de votre propre activité (ventes, service client, analytics)." },
      ],
      summary:
        "On commence par le secondaire pour cadrer, on complète par le primaire là où c'est nécessaire, et on vérifie toujours récence, autorité, méthode et intérêt.",
      selfAssessment: [
        "Sais-je distinguer une source fiable d'une source douteuse ?",
        "Sais-je choisir entre sondage, entretien et observation selon ma question ?",
      ],
      quiz: { id: "mkt-v2-m2-l2-qz", questionIds: ["mkt-v2-m2-q03", "mkt-v2-m2-q04"], passThreshold: 70 },
      keyTakeaways: [
        "Secondaire = déjà collecté (rapide) ; primaire = collecté par vous (sur mesure).",
        "« Combien » → sondage ; « pourquoi » → entretien ; « ce qu'ils font » → observation.",
        "Vérifier chaque source : récence, autorité, méthode, intérêt.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Bien. Passez à la conception d'une recherche (leçon 4.3)." },
        { condition: "score < 70", message: "Revoyez la vérification des sources et le choix de méthode." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 4.3.",
    },
    {
      id: "mkt-v2-m2-l3",
      module: 2,
      week: 4,
      title: "Concevoir une recherche de marché",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une recherche mal conçue produit des réponses trompeuses avec un air de rigueur. Cette leçon apprend à cadrer une question de recherche, à définir qui interroger et à éviter les biais les plus fréquents — dans le respect du consentement et des données personnelles.",
      objectives: [
        "Formuler une question de recherche et une hypothèse claires",
        "Distinguer population et échantillon, et repérer les biais courants",
        "Choisir entre approche qualitative et quantitative",
        "Rédiger un questionnaire / guide d'entretien respectueux du consentement",
      ],
      competencies: ["C5"],
      prerequisites: ["Leçon 4.2 — sources et méthodes"],
      sections: [
        {
          heading: "Question de recherche et hypothèse",
          body: [
            "Une recherche commence par une question précise : non pas « est-ce que mon idée est bonne ? » (invérifiable), mais « quel est le principal frein à l'achat chez les parents de jeunes enfants de mon quartier ? ». On formule ensuite une hypothèse : une réponse probable que la recherche va confirmer ou infirmer. L'hypothèse rend la recherche falsifiable : on doit pouvoir avoir tort.",
          ],
        },
        {
          heading: "Population et échantillon",
          body: [
            "La population est l'ensemble des personnes concernées par la question. L'échantillon est le sous-ensemble que l'on interroge réellement. Un bon échantillon ressemble à la population (représentativité) et est de taille suffisante. Interroger uniquement ses amis ou ses abonnés fidèles introduit un biais de sélection : on entend une opinion non représentative.",
          ],
        },
        {
          heading: "Qualitatif vs quantitatif",
          body: [
            "Le qualitatif (entretiens, groupes) explore en profondeur, fait émerger des thèmes, répond au « pourquoi » — sur peu de personnes. Le quantitatif (sondage) mesure et généralise, répond au « combien » — sur beaucoup de personnes. On combine souvent : qualitatif d'abord pour comprendre et formuler les bonnes questions, quantitatif ensuite pour mesurer l'ampleur.",
          ],
        },
        {
          heading: "Biais fréquents et éthique",
          body: [
            "Questions orientées (« Ne trouvez-vous pas que notre produit est excellent ? »), questions doubles (deux idées en une), ordre suggestif, échantillon de complaisance : autant de biais qui fabriquent la réponse souhaitée. Sur le plan éthique et légal : recueillir le consentement, expliquer l'usage des réponses, ne collecter que le nécessaire, protéger les données personnelles. Interpréter avec prudence : une tendance sur 12 réponses n'est pas une preuve.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Hypothèse", definition: "Réponse probable et vérifiable à la question de recherche." },
        { term: "Échantillon représentatif", definition: "Sous-groupe interrogé qui ressemble à la population visée." },
        { term: "Biais de sélection", definition: "Distorsion due au fait d'interroger des personnes non représentatives." },
        { term: "Question orientée", definition: "Formulation qui suggère la réponse attendue." },
      ],
      examples: [
        "Mauvaise question : « Aimeriez-vous un service rapide et abordable ? » (double + orientée). Meilleure : « Lors de votre dernier achat, qu'est-ce qui a été le plus difficile ? »",
        "Qualitatif → 8 entretiens révèlent 3 freins récurrents ; quantitatif → un sondage mesure lequel domine.",
      ],
      commonError: {
        title: "Interroger seulement ses fans",
        body:
          "Sonder uniquement ses abonnés les plus fidèles donne un portrait flatteur mais faux du marché. Ils ne représentent pas les prospects qui hésitent ou ignorent la marque — précisément ceux qu'il faut comprendre.",
      },
      caseStudy: {
        title: "Atelier Racine (organisme communautaire) : la bonne question",
        region: "québécoise",
        isFictional: true,
        body: [
          "Un organisme communautaire fictif, Atelier Racine, voulait lancer des ateliers de cuisine pour nouveaux arrivants. Première version du sondage : « Aimeriez-vous des ateliers de cuisine gratuits ? » — 95 % de oui, mais faible participation réelle.",
          "En reformulant la recherche autour d'une vraie question (« Quels sont les obstacles concrets à la participation à une activité en soirée ? »), l'équipe découvre par entretiens que le frein n'était pas l'intérêt, mais la garde d'enfants et les horaires. En ajoutant une halte-garderie et en déplaçant l'horaire, la participation a bondi. La bonne question a révélé le vrai problème.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l3-ia1",
          title: "Repérer les erreurs d'un questionnaire",
          objective: "Identifier questions orientées, doubles et biais d'échantillon.",
          instructions: [
            "Repérez le problème dans chacune : (a) « Ne pensez-vous pas que nos prix sont justes ? » ; (b) « Trouvez-vous le produit beau et pas cher ? » ; (c) sondage envoyé uniquement aux clients ayant laissé 5 étoiles.",
          ],
          answerKey: [
            "(a) question orientée (suggère la réponse).",
            "(b) question double (beauté ET prix mêlés).",
            "(c) biais de sélection (échantillon non représentatif).",
          ],
          feedback: "Une bonne question est neutre, porte sur une seule idée, et s'adresse à un échantillon représentatif.",
          successCriterion: "Les 3 problèmes correctement nommés.",
        },
      ],
      activity: {
        title: "Concevoir un mini-protocole de recherche",
        prompt: [
          "Formulez 1 question de recherche + 1 hypothèse pour votre marché.",
          "Décrivez la population, un échantillon réaliste, et choisissez qualitatif ou quantitatif.",
          "Rédigez 5 questions neutres (sans biais) et une phrase de consentement.",
        ],
        deliverables: ["Un protocole d'une page : question, hypothèse, population/échantillon, méthode, 5 questions, consentement."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "La question est précise et l'hypothèse est falsifiable.",
        "Les questions sont neutres (ni orientées ni doubles).",
        "Le consentement et l'usage des données sont mentionnés.",
      ],
      resources: [
        "Commissariat à la protection de la vie privée du Canada — bonnes pratiques (priv.gc.ca)",
        "Guide de rédaction de questionnaires (ressource pédagogique interne)",
      ],
      glossary: [
        { term: "Consentement", definition: "Accord libre et éclairé de la personne interrogée sur l'usage de ses réponses." },
        { term: "Question double", definition: "Question mêlant deux idées, impossible à répondre clairement." },
      ],
      summary:
        "Une recherche utile part d'une question précise et d'une hypothèse falsifiable, s'appuie sur un échantillon représentatif, choisit la bonne méthode et évite les biais — dans le respect du consentement.",
      selfAssessment: [
        "Ma question de recherche est-elle précise et vérifiable ?",
        "Mes questions sont-elles neutres et respectueuses du consentement ?",
      ],
      quiz: { id: "mkt-v2-m2-l3-qz", questionIds: ["mkt-v2-m2-q05"], passThreshold: 70 },
      keyTakeaways: [
        "Une hypothèse doit pouvoir être infirmée : la recherche doit pouvoir vous donner tort.",
        "Qualitatif pour le « pourquoi », quantitatif pour le « combien ».",
        "Éviter questions orientées/doubles et biais d'échantillon ; recueillir le consentement.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour l'évaluation de l'attractivité du marché (leçon 4.4)." },
        { condition: "score < 70", message: "Revoyez les biais de questionnaire et la notion d'échantillon." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 4.4.",
    },
    {
      id: "mkt-v2-m2-l4",
      module: 2,
      week: 4,
      title: "Mesurer l'attractivité d'un marché (TAM, SAM, SOM)",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Tous les marchés ne se valent pas. Cette leçon donne des critères pour juger l'attractivité d'un marché et introduit, en langage accessible, les notions de TAM, SAM et SOM pour estimer une opportunité de façon réaliste.",
      objectives: [
        "Évaluer un marché selon la taille, la croissance, l'accessibilité et les risques",
        "Expliquer TAM, SAM et SOM en langage simple",
        "Estimer une opportunité de marché de façon prudente",
        "Construire une matrice d'attractivité simple",
      ],
      competencies: ["C5"],
      prerequisites: ["Leçons 4.1 à 4.3"],
      sections: [
        {
          heading: "Les critères d'attractivité",
          body: [
            "Un marché attractif combine plusieurs traits : une taille suffisante (assez d'acheteurs), une croissance (le marché grandit plutôt qu'il ne s'éteint), une fréquence d'achat et un pouvoir d'achat corrects, une concurrence pas trop écrasante, une bonne accessibilité (peut-on l'atteindre avec son budget ?), des barrières à l'entrée surmontables, une saisonnalité gérable et des risques identifiés. Aucun marché n'est parfait : il s'agit de peser les critères, pas d'attendre le score idéal.",
          ],
        },
        {
          heading: "TAM, SAM, SOM en clair",
          body: [
            "TAM (Total Addressable Market) : le marché total théorique — tout le monde qui pourrait avoir besoin de ce type de solution. SAM (Serviceable Available Market) : la part que votre offre peut réellement servir (bon segment, bonne zone, bon canal). SOM (Serviceable Obtainable Market) : la part que vous pouvez réalistement capter à court terme, compte tenu de votre budget et de la concurrence.",
            "Image : TAM = tout l'océan ; SAM = la baie que vos bateaux peuvent atteindre ; SOM = les poissons que vous pêcherez vraiment cette année. Les investisseurs se méfient des plans qui confondent TAM et SOM (« le marché fait 10 milliards, si on prend 1 %… ») : ce raisonnement ignore l'accessibilité réelle.",
          ],
        },
        {
          heading: "Estimer prudemment",
          body: [
            "Une estimation crédible s'appuie sur des chiffres vérifiables (données secondaires) et affiche ses hypothèses. Mieux vaut une fourchette prudente et documentée qu'un chiffre unique impressionnant mais invérifiable. Toujours distinguer les faits des hypothèses dans le dossier.",
          ],
        },
        {
          heading: "Matrice d'attractivité",
          body: [
            "Pour comparer plusieurs segments ou marchés, on note chaque critère (par ex. de 1 à 5) et on visualise le résultat. La matrice ne décide pas à votre place : elle rend explicites les compromis (un marché gros mais très concurrentiel vs un marché petit mais accessible).",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "TAM", definition: "Marché total théorique pour ce type de solution." },
        { term: "SAM", definition: "Part du marché que votre offre peut réellement servir." },
        { term: "SOM", definition: "Part que vous pouvez réalistement capter à court terme." },
        { term: "Barrière à l'entrée", definition: "Obstacle (coût, réglementation, notoriété) qui freine l'arrivée sur un marché." },
      ],
      examples: [
        "TAM : tous les amateurs de café au Canada. SAM : les amateurs de café de spécialité à Montréal achetant en ligne. SOM : ceux que votre budget publicitaire peut réalistement toucher cette année.",
        "Un marché saisonnier (décorations de fête) exige une trésorerie adaptée aux pics et aux creux.",
      ],
      commonError: {
        title: "Le piège du « 1 % d'un énorme marché »",
        body:
          "« Le marché fait des milliards, il suffit d'en prendre 1 % » ignore l'accessibilité. Sans canal, budget et différenciation, ce 1 % est purement théorique. On raisonne en SOM, pas en TAM.",
      },
      caseStudy: {
        title: "PédalNeuf (international) : surestimer son marché",
        region: "internationale",
        isFictional: true,
        body: [
          "PédalNeuf, une entreprise fictive de vélos électriques, présente un plan fondé sur « 2 % du marché mondial du vélo ». Séduisant sur le papier, irréaliste en pratique : l'entreprise n'a ni la distribution, ni la notoriété, ni le budget pour toucher ce marché.",
          "En recalculant en SOM — les acheteurs d'une seule région, atteignables par ses canaux actuels et son budget réel — l'opportunité se réduit fortement mais devient crédible et pilotable. Le plan corrigé, plus modeste, a convaincu davantage qu'un chiffre grandiose invérifiable.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l4-ia1",
          title: "Distinguer TAM, SAM et SOM",
          objective: "Associer trois énoncés aux bons niveaux de marché.",
          instructions: [
            "Associez : (1) « toutes les personnes au Canada qui boivent du thé » ; (2) « les buveurs de thé bio de Québec achetant en ligne » ; (3) « les clients que notre budget peut toucher cette année ».",
            "Niveaux : TAM · SAM · SOM.",
          ],
          answerKey: ["1 → TAM.", "2 → SAM.", "3 → SOM."],
          feedback: "Du plus large (TAM) au plus réaliste à court terme (SOM), en passant par ce que l'offre peut servir (SAM).",
          successCriterion: "Les 3 associations correctes.",
        },
      ],
      activity: {
        title: "Évaluer l'attractivité de son marché",
        prompt: [
          "Notez votre marché sur 6 critères (taille, croissance, pouvoir d'achat, concurrence, accessibilité, risque) de 1 à 5.",
          "Proposez une estimation prudente de TAM, SAM et SOM avec vos hypothèses.",
        ],
        deliverables: ["Une matrice d'attractivité (6 critères notés) + une estimation TAM/SAM/SOM documentée."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les trois niveaux TAM/SAM/SOM sont distingués correctement.",
        "L'estimation affiche ses hypothèses et distingue faits et suppositions.",
        "La matrice révèle explicitement les compromis.",
      ],
      resources: ["Données sectorielles publiques (statcan.gc.ca)", "Modèle de matrice d'attractivité (ressource interne)"],
      glossary: [
        { term: "Saisonnalité", definition: "Variation régulière de la demande selon les périodes de l'année." },
        { term: "Accessibilité", definition: "Capacité réelle à atteindre un marché avec ses canaux et son budget." },
      ],
      summary:
        "L'attractivité se juge sur plusieurs critères pondérés ; TAM/SAM/SOM aident à estimer prudemment l'opportunité en distinguant le théorique du réalisable.",
      selfAssessment: [
        "Sais-je distinguer TAM, SAM et SOM sur mon propre marché ?",
        "Mon estimation affiche-t-elle clairement ses hypothèses ?",
      ],
      quiz: { id: "mkt-v2-m2-l4-qz", questionIds: ["mkt-v2-m2-q02", "mkt-v2-m2-q05"], passThreshold: 70 },
      keyTakeaways: [
        "Un marché attractif combine taille, croissance, accessibilité et risque maîtrisé.",
        "TAM = total, SAM = servable, SOM = réalisable à court terme.",
        "On planifie en SOM, jamais sur le « 1 % d'un énorme TAM ».",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 4 maîtrisée. Passez à la segmentation (semaine 5)." },
        { condition: "score < 70", message: "Revoyez TAM/SAM/SOM et les critères d'attractivité." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 4 + le quiz hebdomadaire avant la semaine 5.",
    },

    // ══════════════ SEMAINE 5 — SEGMENTATION, CLIENT IDÉAL ET PERSONA ══════════════
    {
      id: "mkt-v2-m2-l5",
      module: 2,
      week: 5,
      title: "Segmenter un marché",
      authored: true,
      durationMinutes: 90,
      introduction:
        "On ne parle pas de la même façon à tout le monde. Segmenter, c'est découper un marché en groupes homogènes pour choisir où concentrer ses efforts. Cette leçon présente les critères de segmentation et les pièges des segments mal taillés.",
      objectives: [
        "Appliquer les principaux critères de segmentation (géo, démo, socio-éco, psychographique, comportemental, technographique)",
        "Adapter la segmentation au B2B",
        "Juger la qualité d'un segment (mesurable, accessible, substantiel, actionnable)",
        "Prioriser et sélectionner un segment cible",
      ],
      competencies: ["C6"],
      prerequisites: ["Semaine 4 — marché défini et évalué"],
      sections: [
        {
          heading: "Les critères de segmentation",
          body: [
            "Géographique (région, ville, climat), démographique (âge, sexe, taille du foyer), socio-économique (revenu, profession, éducation), psychographique (valeurs, mode de vie, personnalité), comportementale (fréquence d'achat, fidélité, usage), technographique (appareils, plateformes, aisance numérique). On combine souvent plusieurs critères pour obtenir un segment vraiment utile.",
          ],
        },
        {
          heading: "Segmentation B2B",
          body: [
            "En B2B, on segmente autrement : par secteur d'activité, taille d'entreprise, chiffre d'affaires, zone, maturité numérique, ou par rôle du décideur. Le « firmographique » (l'équivalent du démographique pour les entreprises) structure la plupart des segmentations B2B.",
          ],
        },
        {
          heading: "Qu'est-ce qu'un bon segment ?",
          body: [
            "Un segment utile est mesurable (on peut estimer sa taille), accessible (on peut l'atteindre par un canal), substantiel (assez gros pour valoir l'effort) et actionnable (on peut lui proposer une offre différenciée). Un segment trop large ne permet aucun message précis ; trop étroit, il ne rentabilise pas l'effort.",
          ],
        },
        {
          heading: "Prioriser et choisir",
          body: [
            "On rarement peut tout servir d'emblée. On priorise les segments selon leur attractivité (taille, croissance, pouvoir d'achat) et notre capacité à les servir (adéquation offre-segment, concurrence). Le segment cible est celui où l'on a les meilleures chances de gagner, pas forcément le plus gros.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Segmentation", definition: "Découpage d'un marché en groupes homogènes selon des critères pertinents." },
        { term: "Segment actionnable", definition: "Segment auquel on peut réellement proposer une offre et un message différenciés." },
        { term: "Firmographique", definition: "Critères de segmentation propres aux entreprises (secteur, taille, CA…)." },
      ],
      examples: [
        "Une salle de sport segmente par mode de vie (débutants anxieux vs sportifs confirmés) : deux offres, deux messages.",
        "Un logiciel B2B segmente par taille d'entreprise : les PME et les grands comptes n'ont ni le même besoin ni le même cycle.",
      ],
      commonError: {
        title: "Segments « démographiques » vides de sens",
        body:
          "« Femmes 25-45 ans » n'est pas un segment actionnable : il mélange des besoins, des budgets et des modes de vie très différents. Ajouter un critère comportemental ou psychographique rend le segment utile.",
      },
      caseStudy: {
        title: "Studio Lumen (entreprise de services) : trop large tue le ciblage",
        region: "québécoise",
        isFictional: true,
        body: [
          "Studio Lumen, un studio de photographie fictif, ciblait « les gens qui veulent de belles photos ». Publicités dispersées, budget dilué, peu de contrats.",
          "En segmentant, l'équipe identifie trois segments distincts : familles pour portraits, PME pour photos de produits, et couples pour mariages. Chaque segment a un besoin, un budget et un canal différents. En concentrant six mois d'efforts sur le segment PME (récurrent, moins saisonnier, accessible via LinkedIn), le studio a stabilisé son chiffre d'affaires avant d'élargir. Choisir un segment a permis un message précis et rentable.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l5-ia1",
          title: "Segmenter un marché",
          objective: "Proposer des segments à partir de critères pertinents.",
          instructions: [
            "Pour une boulangerie de quartier, proposez 3 segments distincts en combinant au moins deux critères (ex. comportemental + géographique). Justifiez pourquoi chacun est actionnable.",
          ],
          answerKey: [
            "Exemples valides : (1) résidents du quartier achetant quotidiennement (géo + comportemental) ; (2) travailleurs de bureau cherchant un dîner rapide (comportemental + contexte) ; (3) hôtes recevant le week-end, achats occasionnels haut de gamme (comportemental + psychographique).",
          ],
          feedback: "Un bon segment combine des critères et permet un message et une offre spécifiques.",
          successCriterion: "3 segments distincts, chacun combinant ≥ 2 critères et justifié comme actionnable.",
        },
      ],
      activity: {
        title: "Segmenter son marché et choisir une cible",
        prompt: [
          "Découpez votre marché en 3 à 4 segments (critères combinés).",
          "Évaluez chaque segment (mesurable, accessible, substantiel, actionnable) et choisissez un segment cible en justifiant.",
        ],
        deliverables: ["Un tableau de segmentation + le choix argumenté d'un segment cible."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les segments combinent des critères et sont actionnables.",
        "Le segment cible est choisi selon attractivité ET capacité à servir.",
        "Aucun segment n'est réduit à un simple découpage démographique vague.",
      ],
      resources: ["Données démographiques locales (statcan.gc.ca, statistique.quebec.ca)"],
      glossary: [
        { term: "Segment cible", definition: "Segment retenu comme priorité, où l'on a les meilleures chances de gagner." },
        { term: "Psychographique", definition: "Segmentation par valeurs, mode de vie et personnalité." },
      ],
      summary:
        "Segmenter, c'est combiner des critères pour former des groupes homogènes, en évaluer la qualité, puis choisir la cible où l'on peut gagner — pas forcément la plus grosse.",
      selfAssessment: [
        "Mes segments sont-ils actionnables (message et offre spécifiques possibles) ?",
        "Ai-je choisi ma cible selon l'attractivité ET ma capacité à la servir ?",
      ],
      quiz: { id: "mkt-v2-m2-l5-qz", questionIds: ["mkt-v2-m2-q06", "mkt-v2-m2-q07"], passThreshold: 70 },
      keyTakeaways: [
        "Un bon segment est mesurable, accessible, substantiel et actionnable.",
        "Combiner des critères (ex. comportemental + géo) rend un segment utile.",
        "La cible est le segment où l'on peut gagner, pas le plus gros.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Passez à la compréhension des besoins (leçon 5.2)." },
        { condition: "score < 70", message: "Revoyez les critères de qualité d'un segment." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 5.2.",
    },
    {
      id: "mkt-v2-m2-l6",
      module: 2,
      week: 5,
      title: "Comprendre les besoins du client",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Segmenter dit à qui l'on parle ; comprendre les besoins dit quoi leur dire. Cette leçon distingue besoins explicites et implicites, motivations et freins, et surtout l'écart entre ce que les clients disent et ce qu'ils font.",
      objectives: [
        "Distinguer besoins explicites et implicites",
        "Cartographier motivations, frustrations, objections et déclencheurs",
        "Relier le besoin au contexte d'utilisation et au parcours de décision",
        "Reconnaître l'écart entre opinion déclarée et comportement réel",
      ],
      competencies: ["C6"],
      prerequisites: ["Leçon 5.1 — segmentation"],
      sections: [
        {
          heading: "Besoins explicites et implicites",
          body: [
            "Le besoin explicite est celui que le client formule (« je veux un logiciel de facturation »). Le besoin implicite est ce qu'il ne dit pas mais recherche vraiment (« gagner du temps », « avoir l'air professionnel », « éviter les erreurs fiscales »). Une offre qui ne répond qu'à l'explicite passe à côté de ce qui motive réellement l'achat.",
          ],
        },
        {
          heading: "Motivations, freins, objections, déclencheurs",
          body: [
            "Les motivations poussent à l'achat (gagner, économiser, appartenir, se rassurer). Les frustrations décrivent la douleur actuelle. Les objections sont les raisons de ne pas acheter (prix, risque, complexité, méfiance). Les déclencheurs sont les événements qui font passer à l'action (un déménagement, une hausse de charge de travail, une mauvaise expérience avec un concurrent). Comprendre ces quatre dimensions permet d'écrire des messages qui résonnent.",
          ],
        },
        {
          heading: "Contexte d'utilisation et parcours de décision",
          body: [
            "Un même produit peut répondre à des besoins différents selon le contexte (un café acheté le matin en vitesse vs le week-end pour se détendre). Le parcours de décision décrit les étapes entre la prise de conscience d'un besoin et l'achat : chercher, comparer, hésiter, se décider. Savoir où le client se trouve dans ce parcours change le message à lui adresser.",
          ],
        },
        {
          heading: "Déclaratif vs comportement réel",
          body: [
            "Les gens rationalisent après coup et déclarent des intentions qu'ils ne suivent pas. « Je paierais pour ça » ne vaut pas un achat. On croise donc toujours ce que les clients disent (entretiens, sondages) avec ce qu'ils font (achats, comportements sur le site, tests réels).",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Besoin implicite", definition: "Motivation profonde non formulée que le client cherche vraiment à satisfaire." },
        { term: "Objection", definition: "Raison invoquée pour ne pas acheter (prix, risque, complexité…)." },
        { term: "Déclencheur", definition: "Événement qui fait passer un prospect à l'action." },
      ],
      examples: [
        "Explicite : « un cours d'anglais ». Implicite : « décrocher une promotion » ou « ne plus avoir honte en réunion ».",
        "Déclencheur B2B : l'arrivée d'un nouveau dirigeant qui exige des rapports mensuels → besoin soudain d'un outil.",
      ],
      commonError: {
        title: "Vendre la caractéristique, pas le besoin",
        body:
          "Décrire son produit par ses caractéristiques (« 12 fonctionnalités, 3 formats ») sans relier au besoin implicite laisse le client indifférent. Il achète un résultat, pas une liste de fonctions.",
      },
      caseStudy: {
        title: "InfusiO (e-commerce) : le vrai besoin derrière l'achat",
        region: "canadienne",
        isFictional: true,
        body: [
          "InfusiO, une boutique en ligne fictive de thés, vantait « 40 variétés et une livraison rapide ». Ventes correctes mais fidélité faible.",
          "Des entretiens révèlent que le besoin implicite dominant n'était pas la variété, mais un rituel de détente en fin de journée et la découverte guidée (les clients étaient submergés par le choix). InfusiO crée alors des « box découverte » thématiques avec un rituel suggéré. La fidélité augmente : l'entreprise avait enfin répondu au besoin réel, pas au besoin déclaré (« plus de choix »).",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l6-ia1",
          title: "Distinguer faits et hypothèses",
          objective: "Séparer ce qui est observé de ce qui est supposé.",
          instructions: [
            "Classez en FAIT ou HYPOTHÈSE : (a) « 30 % des paniers sont abandonnés à l'étape livraison » (issu des analytics) ; (b) « les clients trouvent la livraison trop chère » ; (c) « 8 clients sur 10 interrogés citent le délai comme frein ».",
          ],
          answerKey: [
            "(a) FAIT (donnée observée).",
            "(b) HYPOTHÈSE (interprétation non vérifiée).",
            "(c) FAIT sur un petit échantillon (déclaratif mesuré) — à confirmer, mais observé.",
          ],
          feedback: "Un fait est observé ; une hypothèse est une explication plausible à vérifier. Ne pas confondre les deux dans un dossier.",
          successCriterion: "(a) et (c) classés en fait, (b) en hypothèse.",
        },
      ],
      activity: {
        title: "Cartographier les besoins de sa cible",
        prompt: [
          "Pour votre segment cible, listez 2 besoins explicites, 2 besoins implicites, 3 objections et 2 déclencheurs.",
          "Indiquez pour chaque élément s'il s'agit d'un fait (observé) ou d'une hypothèse (à vérifier).",
        ],
        deliverables: ["Une carte des besoins (explicites/implicites, objections, déclencheurs) annotée fait/hypothèse."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les besoins implicites sont distingués des besoins explicites.",
        "Chaque élément est étiqueté fait ou hypothèse.",
        "Au moins deux objections réalistes sont identifiées.",
      ],
      resources: ["Grille besoins/objections (ressource interne)"],
      glossary: [
        { term: "Contexte d'utilisation", definition: "Situation concrète dans laquelle le produit est utilisé, influençant le besoin." },
        { term: "Parcours de décision", definition: "Étapes entre la prise de conscience d'un besoin et l'achat." },
      ],
      summary:
        "Comprendre un client, c'est saisir ses besoins implicites, ses objections et ses déclencheurs, en distinguant toujours ce qu'il dit de ce qu'il fait.",
      selfAssessment: [
        "Ai-je identifié le besoin implicite, pas seulement l'explicite ?",
        "Ai-je séparé faits observés et hypothèses à vérifier ?",
      ],
      quiz: { id: "mkt-v2-m2-l6-qz", questionIds: ["mkt-v2-m2-q08", "mkt-v2-m2-q09"], passThreshold: 70 },
      keyTakeaways: [
        "Le client achète un résultat (besoin implicite), pas une liste de caractéristiques.",
        "Motivations, frustrations, objections et déclencheurs guident les messages.",
        "Toujours croiser déclaratif et comportement réel.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à construire un persona crédible (leçon 5.3)." },
        { condition: "score < 70", message: "Revoyez besoins implicites vs explicites et l'écart déclaratif/comportement." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 5.3.",
    },
    {
      id: "mkt-v2-m2-l7",
      module: 2,
      week: 5,
      title: "Construire un persona crédible",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le persona du Module 1 était une esquisse ; ici, on le construit sérieusement, à partir de données, sans tomber dans le stéréotype ni l'invention. Un bon persona est un outil de décision, pas une fiche décorative.",
      objectives: [
        "Différencier persona (fondé sur données) et stéréotype (fondé sur préjugés)",
        "Structurer un persona : objectifs, problèmes, comportements, canaux, objections",
        "Ancrer le persona dans des données ou des hypothèses explicitement identifiées",
        "Valider un persona et éviter les informations inventées",
      ],
      competencies: ["C6"],
      prerequisites: ["Leçons 5.1 et 5.2"],
      sections: [
        {
          heading: "Persona ou stéréotype ?",
          body: [
            "Un persona est une représentation synthétique d'un segment, construite à partir de données réelles (entretiens, analytics, ventes). Un stéréotype est une projection non vérifiée fondée sur des préjugés (« les jeunes veulent tout gratuit »). La différence n'est pas le format, mais la source : un persona s'appuie sur des faits, un stéréotype sur des suppositions.",
          ],
        },
        {
          heading: "Que contient un persona utile",
          body: [
            "Objectifs (ce qu'il cherche à accomplir), problèmes/frustrations, comportements (habitudes, fréquence), canaux (où il s'informe et achète), critères de choix (ce qui fait pencher la décision), objections (ce qui le retient), contexte (situation de vie/travail) et une citation représentative qui capte sa voix. On évite les détails décoratifs sans utilité décisionnelle (marque de voiture, plat préféré) s'ils n'éclairent aucune décision marketing.",
          ],
        },
        {
          heading: "Ancrer dans les données",
          body: [
            "Chaque affirmation du persona devrait pouvoir être reliée à une source : « préfère acheter le soir » (analytics), « craint de se tromper de taille » (entretiens), « compare toujours trois options » (sondage). Ce qui relève de l'hypothèse doit être marqué comme tel, pour être vérifié plus tard. Un persona 100 % inventé est pire que pas de persona : il fabrique une fausse certitude.",
          ],
        },
        {
          heading: "Valider et faire vivre",
          body: [
            "On valide un persona en le confrontant à de nouvelles données et au terrain (l'équipe de vente le reconnaît-elle ?). Un persona n'est pas figé : il évolue quand le marché ou les données changent. Deux à trois personas suffisent généralement ; en multiplier dix dilue le focus.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Persona", definition: "Représentation synthétique d'un segment, fondée sur des données." },
        { term: "Stéréotype", definition: "Projection non vérifiée fondée sur des préjugés." },
        { term: "Citation représentative", definition: "Phrase qui capte la voix et la préoccupation centrale du persona." },
      ],
      examples: [
        "Persona « Sophie, 34 ans, gère une PME » : objectif = gagner du temps ; objection = peur d'un outil compliqué ; canal = LinkedIn + recommandations.",
        "Marquage d'hypothèse : « [hypothèse] Sophie consulte surtout sur mobile — à vérifier via analytics. »",
      ],
      commonError: {
        title: "Inventer des détails précis sans données",
        body:
          "Attribuer au persona un âge exact, un salaire précis et des loisirs détaillés sans aucune donnée crée une fausse précision. Mieux vaut une fourchette honnête et des hypothèses marquées que des chiffres inventés qui trompent l'équipe.",
      },
      caseStudy: {
        title: "OutiPro (B2B, consultant indépendant) : du stéréotype au persona",
        region: "internationale",
        isFictional: true,
        body: [
          "Un consultant fictif vendant l'outil OutiPro imaginait son client comme « un dirigeant de 50 ans réfractaire à la technologie ». Ses messages tombaient à plat.",
          "En interrogant dix clients réels, il découvre un tout autre portrait : des responsables d'exploitation de 30-40 ans, à l'aise avec le numérique, mais débordés et méfiants envers les outils qui demandent une longue formation. Le persona corrigé (objectif : implémentation en une journée ; objection : temps d'apprentissage) a transformé les messages et le taux de réponse. Le stéréotype coûtait des ventes.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l7-ia1",
          title: "Construire un persona à partir d'indices",
          objective: "Assembler un persona en séparant faits et hypothèses.",
          instructions: [
            "À partir de ces indices — analytics : 70 % des achats le soir sur mobile ; service client : questions fréquentes sur la taille ; 6 entretiens : peur de se tromper — rédigez un mini-persona (objectif, comportement, objection) en marquant ce qui est hypothèse.",
          ],
          answerKey: [
            "Objectif : acheter sans risque de se tromper. Comportement (fait) : achète le soir, sur mobile. Objection (fait) : crainte de la mauvaise taille. [Hypothèse] : compare avec d'autres boutiques avant d'acheter — à vérifier.",
          ],
          feedback: "Chaque trait doit renvoyer à une source ; les suppositions sont marquées [hypothèse].",
          successCriterion: "Persona cohérent où faits et hypothèses sont distingués.",
        },
      ],
      activity: {
        title: "Rédiger persona principal et secondaire",
        prompt: [
          "Rédigez un persona PRINCIPAL et un persona SECONDAIRE pour votre segment cible.",
          "Pour chacun : objectifs, problèmes, comportements, canaux, critères de choix, objections, une citation. Marquez clairement les hypothèses.",
        ],
        deliverables: ["Deux fiches persona (principal + secondaire) ancrées données/hypothèses, prêtes pour le dossier « Client idéal »."],
        estimatedMinutes: 90,
      },
      successCriteria: [
        "Chaque persona s'appuie sur des données ou des hypothèses explicitement marquées.",
        "Aucune fausse précision inventée.",
        "Objectifs, objections et canaux sont présents et utiles à la décision.",
      ],
      resources: ["Gabarit de persona (ressource interne)", "Vos propres analytics et retours service client"],
      glossary: [
        { term: "Persona principal", definition: "Le persona prioritaire, cœur de cible de l'offre." },
        { term: "Fausse précision", definition: "Détails chiffrés inventés donnant une illusion de rigueur." },
      ],
      summary:
        "Un persona crédible est fondé sur des données, distingue faits et hypothèses, contient ce qui sert à décider, et se valide au contact du terrain.",
      selfAssessment: [
        "Chaque trait de mon persona renvoie-t-il à une source ou est-il marqué comme hypothèse ?",
        "Mon persona aide-t-il vraiment à décider d'un message et d'un canal ?",
      ],
      quiz: { id: "mkt-v2-m2-l7-qz", questionIds: ["mkt-v2-m2-q10", "mkt-v2-m2-q11"], passThreshold: 70 },
      keyTakeaways: [
        "La différence persona/stéréotype tient à la source : données vs préjugés.",
        "Marquer les hypothèses évite la fausse certitude.",
        "Deux à trois personas suffisent ; ils servent à décider, pas à décorer.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour Jobs-to-be-Done et le parcours client (leçon 5.4)." },
        { condition: "score < 70", message: "Revoyez persona vs stéréotype et le marquage des hypothèses." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 5.4.",
    },
    {
      id: "mkt-v2-m2-l8",
      module: 2,
      week: 5,
      title: "Jobs-to-be-Done et parcours client",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Les gens n'achètent pas un produit : ils l'« embauchent » pour accomplir un travail dans leur vie. L'approche Jobs-to-be-Done (JTBD) recentre l'attention sur ce travail, et le parcours client décrit les étapes qu'il traverse pour l'accomplir.",
      objectives: [
        "Expliquer l'approche JTBD (travail fonctionnel, émotionnel, social)",
        "Identifier la situation déclenchante et le résultat attendu",
        "Reconnaître les solutions alternatives « embauchées » aujourd'hui",
        "Cartographier le parcours client (découverte → recommandation)",
      ],
      competencies: ["C6"],
      prerequisites: ["Leçon 5.3 — persona"],
      sections: [
        {
          heading: "Les trois dimensions d'un « job »",
          body: [
            "Le travail fonctionnel est la tâche concrète (« déplacer un meuble », « suivre mes dépenses »). Le travail émotionnel est ce que la personne veut ressentir (se sentir en sécurité, fière, sereine). Le travail social est l'image qu'elle veut projeter auprès des autres. Une offre gagnante répond souvent aux trois à la fois — la perceuse achète « un trou », mais aussi « la fierté d'avoir bien fait » et « l'image du bricoleur compétent ».",
          ],
        },
        {
          heading: "Situation déclenchante et résultat attendu",
          body: [
            "Un job émerge dans une situation précise (« quand je reçois des invités à l'improviste, je veux… »). Le résultat attendu est le critère de réussite du client (« que le repas soit prêt en 20 minutes sans stress »). Décrire le job sous la forme « Quand [situation], je veux [motivation], afin de [résultat] » aligne l'offre sur ce qui compte vraiment.",
          ],
        },
        {
          heading: "Les solutions alternatives",
          body: [
            "Avant votre produit, le client accomplit déjà son job d'une manière ou d'une autre — parfois avec un concurrent, parfois avec un bricolage (un fichier Excel, un ami, ne rien faire). Identifier ces alternatives révèle la vraie concurrence, souvent plus large que les concurrents directs.",
          ],
        },
        {
          heading: "Le parcours client",
          body: [
            "Le parcours relie les étapes : découverte (le client prend conscience du besoin), considération (il compare des options), décision (il choisit), achat, puis usage, fidélisation et recommandation. À chaque étape correspondent des questions, des freins et des contenus différents. Le funnel AARRR du Module 1 et le parcours client se recoupent : l'un mesure, l'autre décrit l'expérience vécue.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Jobs-to-be-Done (JTBD)", definition: "Le « travail » que le client cherche à accomplir en embauchant un produit." },
        { term: "Situation déclenchante", definition: "Contexte précis qui fait émerger le besoin." },
        { term: "Solution alternative", definition: "Autre façon dont le client accomplit déjà son job (concurrent, bricolage, inaction)." },
      ],
      examples: [
        "JTBD d'un logiciel de facturation : fonctionnel = envoyer des factures ; émotionnel = ne plus stresser à l'impôt ; social = paraître professionnel.",
        "Alternative « embauchée » aujourd'hui : un tableur maison — la vraie concurrence n'est pas qu'un autre logiciel.",
      ],
      commonError: {
        title: "Confondre le produit et le job",
        body:
          "Se focaliser sur les fonctions de son produit (« notre appli a un mode sombre ») fait oublier le job. Le client n'embauche pas un mode sombre : il embauche un résultat. On part du job, puis on justifie les fonctions.",
      },
      caseStudy: {
        title: "TrajectO (entreprise touristique) : le vrai job du voyageur",
        region: "internationale",
        isFictional: true,
        body: [
          "TrajectO, une agence fictive de circuits, vendait « des itinéraires détaillés de 40 pages ». Peu de conversions.",
          "En creusant le JTBD, l'équipe comprend que le job émotionnel dominant était « voyager sans angoisse d'avoir mal planifié » et le job social « revenir avec de belles histoires à raconter ». Le pavé de 40 pages augmentait l'angoisse au lieu de la réduire. TrajectO a remplacé le document par un accompagnement rassurant et des expériences « racontables ». Les réservations ont progressé : l'offre répondait enfin au vrai job.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l8-ia1",
          title: "Identifier les Jobs-to-be-Done",
          objective: "Distinguer travail fonctionnel, émotionnel et social.",
          instructions: [
            "Pour un service de livraison de repas santé, classez : (a) « manger équilibré sans cuisiner » ; (b) « se sentir en contrôle de sa santé » ; (c) « montrer à ses proches qu'on prend soin de soi ».",
          ],
          answerKey: ["(a) fonctionnel.", "(b) émotionnel.", "(c) social."],
          feedback: "Fonctionnel = la tâche ; émotionnel = le ressenti ; social = l'image projetée.",
          successCriterion: "Les 3 dimensions correctement attribuées.",
        },
        {
          id: "mkt-v2-m2-l8-ia2",
          title: "Ordonner un parcours client",
          objective: "Remettre les étapes du parcours dans le bon ordre.",
          instructions: ["Ordonnez : achat · découverte · recommandation · considération · fidélisation · décision."],
          answerKey: ["découverte → considération → décision → achat → fidélisation → recommandation."],
          feedback: "On prend conscience, on compare, on choisit, on achète, on revient, on recommande.",
          successCriterion: "Ordre exact.",
        },
      ],
      activity: {
        title: "Formuler le job et cartographier le parcours",
        prompt: [
          "Rédigez le job principal de votre persona au format « Quand [situation], je veux [motivation], afin de [résultat] ».",
          "Listez 2 solutions alternatives actuelles et cartographiez le parcours (découverte → recommandation) avec une préoccupation par étape.",
        ],
        deliverables: ["Un énoncé JTBD + une carte du parcours client annotée (préoccupation par étape)."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Le job est formulé sous forme situation/motivation/résultat.",
        "Au moins deux solutions alternatives réelles sont identifiées.",
        "Le parcours comporte une préoccupation par étape.",
      ],
      resources: ["Gabarit JTBD et carte de parcours (ressource interne)"],
      glossary: [
        { term: "Travail émotionnel", definition: "Ce que le client veut ressentir en accomplissant son job." },
        { term: "Carte de parcours", definition: "Représentation des étapes vécues par le client, de la découverte à la recommandation." },
      ],
      summary:
        "JTBD recentre l'offre sur le travail (fonctionnel, émotionnel, social) que le client veut accomplir ; le parcours client décrit les étapes et préoccupations menant à l'achat et au-delà.",
      selfAssessment: [
        "Ai-je formulé le job au format situation/motivation/résultat ?",
        "Ai-je identifié les vraies alternatives que mon client utilise déjà ?",
      ],
      quiz: { id: "mkt-v2-m2-l8-qz", questionIds: ["mkt-v2-m2-q11", "mkt-v2-m2-q12"], passThreshold: 70 },
      keyTakeaways: [
        "Le client embauche un produit pour accomplir un job à trois dimensions.",
        "La vraie concurrence inclut les alternatives (bricolage, inaction).",
        "Le parcours client relie découverte, considération, décision, achat, fidélisation, recommandation.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 5 maîtrisée. Passez à l'analyse concurrentielle (semaine 6)." },
        { condition: "score < 70", message: "Revoyez les trois dimensions du job et l'ordre du parcours client." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 5 + le quiz hebdomadaire avant la semaine 6.",
    },

    // ══════════ SEMAINE 6 — CONCURRENCE, PROPOSITION DE VALEUR ET POSITIONNEMENT ══════════
    {
      id: "mkt-v2-m2-l9",
      module: 2,
      week: 6,
      title: "Analyser les concurrents",
      authored: true,
      durationMinutes: 90,
      introduction:
        "On ne se positionne pas dans le vide. Cette leçon apprend à identifier concurrents directs et indirects, à les comparer avec méthode et éthique, et à en tirer des enseignements exploitables plutôt qu'une simple liste.",
      objectives: [
        "Distinguer concurrents directs, indirects et solutions de substitution",
        "Comparer les offres sur des critères pertinents (prix, qualité, canaux, expérience, réputation)",
        "Évaluer la visibilité numérique d'un concurrent",
        "Construire une grille comparative et pratiquer un benchmark éthique",
      ],
      competencies: ["C7"],
      prerequisites: ["Semaine 5 — segment cible, besoins, persona, JTBD"],
      sections: [
        {
          heading: "Directs, indirects, substituts",
          body: [
            "Un concurrent direct offre une solution similaire à la vôtre pour le même job (deux torréfacteurs). Un concurrent indirect résout le même job autrement (un service d'abonnement de café vs un torréfacteur local). Une solution de substitution est une alternative hors catégorie (faire son café soluble, ne pas en boire). Ignorer les indirects et les substituts est une erreur fréquente : la concurrence est plus large que « ceux qui font la même chose ».",
          ],
        },
        {
          heading: "Sur quoi comparer",
          body: [
            "On compare sur les dimensions qui comptent pour le client : prix et modèle tarifaire, qualité perçue, gamme, canaux de vente, expérience client (avant/pendant/après), communication et ton, réputation (avis, notes), et visibilité numérique (référencement, présence sociale, contenu). Le but n'est pas de tout copier, mais de repérer les zones où l'on peut se différencier.",
          ],
        },
        {
          heading: "Évaluer la visibilité numérique",
          body: [
            "Observer comment un concurrent apparaît : se classe-t-il sur les recherches clés ? publie-t-il du contenu régulier ? quelle est sa présence sociale et son engagement réel (pas seulement le nombre d'abonnés) ? comment gère-t-il les avis ? Ces signaux révèlent sa stratégie et ses failles.",
          ],
        },
        {
          heading: "Benchmark éthique",
          body: [
            "Le benchmark s'appuie sur des informations publiques et légitimes (sites, réseaux, avis, tarifs affichés). Il exclut l'espionnage, l'usurpation d'identité, l'extraction de données privées ou toute manœuvre trompeuse. Comparer, oui ; tricher, non. Le respect de la concurrence fait partie du professionnalisme.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Concurrent direct", definition: "Offre similaire répondant au même job." },
        { term: "Concurrent indirect", definition: "Solution différente répondant au même job." },
        { term: "Benchmark", definition: "Comparaison méthodique des offres à partir d'informations publiques." },
      ],
      examples: [
        "Pour une salle d'escalade : direct = autre salle ; indirect = abonnement gym ; substitut = randonnée gratuite en plein air.",
        "Visibilité : un concurrent domine les recherches locales mais néglige les avis — une faille exploitable.",
      ],
      commonError: {
        title: "Ne regarder que les concurrents directs",
        body:
          "Se comparer uniquement à « ceux qui font la même chose » masque la vraie menace : les alternatives indirectes et les substituts qui captent le budget du client autrement.",
      },
      caseStudy: {
        title: "Pédale & Café (commerce alimentaire) : la concurrence invisible",
        region: "québécoise",
        isFictional: true,
        body: [
          "Pédale & Café, un café-vélo fictif, surveillait ses deux concurrents directs du quartier. Ses ventes du matin baissaient pourtant.",
          "Une analyse plus large révèle que la vraie concurrence venait d'ailleurs : un dépanneur avec machine à café à 1 $ et le télétravail qui gardait les gens chez eux (substitut = café maison). En intégrant indirects et substituts, Pédale & Café a repositionné son offre matinale autour d'une expérience et d'un rituel impossibles à reproduire au dépanneur ou à la maison. La grille comparative élargie a évité une guerre de prix perdue d'avance.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l9-ia1",
          title: "Comparer des concurrents",
          objective: "Remplir une grille comparative sur des critères pertinents.",
          instructions: [
            "Pour trois cafés (A premium, B rapide/pas cher, C livraison), remplissez mentalement une grille sur : prix, expérience, canal, réputation. Identifiez pour chacun UNE force distinctive.",
          ],
          answerKey: [
            "A : force = expérience/qualité perçue. B : force = prix/rapidité. C : force = commodité/canal de livraison.",
            "Chaque concurrent domine un critère : la différenciation consiste à choisir un terrain où l'on peut gagner.",
          ],
          feedback: "Une grille révèle où chacun est fort et, en creux, l'espace libre pour se différencier.",
          successCriterion: "Une force distinctive plausible identifiée par concurrent.",
        },
      ],
      activity: {
        title: "Analyser trois concurrents",
        prompt: [
          "Identifiez 2 concurrents directs, 1 indirect (ou substitut) pour votre marché.",
          "Comparez-les sur 5 critères (prix, qualité, canal, expérience, visibilité numérique) et notez forces/faiblesses de chacun.",
        ],
        deliverables: ["Une grille comparative de 3 concurrents (5 critères) + forces/faiblesses, base du dossier de positionnement."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Au moins un concurrent indirect ou substitut est inclus.",
        "La comparaison porte sur des critères pertinents pour le client.",
        "Les sources sont publiques (benchmark éthique).",
      ],
      resources: ["Recherches publiques, avis en ligne, sites et réseaux des concurrents"],
      glossary: [
        { term: "Solution de substitution", definition: "Alternative hors catégorie qui capte le même besoin/budget." },
        { term: "Grille comparative", definition: "Tableau confrontant les concurrents sur des critères communs." },
      ],
      summary:
        "Analyser la concurrence, c'est inclure directs, indirects et substituts, comparer sur ce qui compte pour le client, et le faire éthiquement pour repérer un terrain de différenciation.",
      selfAssessment: [
        "Ai-je inclus un concurrent indirect ou un substitut ?",
        "Ma comparaison éclaire-t-elle un espace de différenciation ?",
      ],
      quiz: { id: "mkt-v2-m2-l9-qz", questionIds: ["mkt-v2-m2-q13", "mkt-v2-m2-q14"], passThreshold: 70 },
      keyTakeaways: [
        "La concurrence inclut directs, indirects et substituts.",
        "On compare sur les critères qui comptent pour le client, pas sur tout.",
        "Le benchmark reste éthique : informations publiques uniquement.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la SWOT (leçon 6.2)." },
        { condition: "score < 70", message: "Revoyez directs/indirects/substituts et les critères de comparaison." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 6.2.",
    },
    {
      id: "mkt-v2-m2-l10",
      module: 2,
      week: 6,
      title: "Réaliser une analyse SWOT utile",
      authored: true,
      durationMinutes: 75,
      introduction:
        "La SWOT est l'outil le plus utilisé et le plus mal utilisé du marketing. Cette leçon montre comment la transformer d'une liste vague en un véritable outil de décision par le croisement des facteurs.",
      objectives: [
        "Distinguer facteurs internes (forces/faiblesses) et externes (opportunités/menaces)",
        "Éviter la SWOT « liste vague » au profit d'un diagnostic étayé",
        "Prioriser les éléments selon leur impact",
        "Croiser la SWOT pour en tirer des décisions",
      ],
      competencies: ["C7"],
      prerequisites: ["Leçon 6.1 — analyse concurrentielle"],
      sections: [
        {
          heading: "Interne vs externe",
          body: [
            "Forces et faiblesses sont internes : elles dépendent de vous (savoir-faire, équipe, coûts, notoriété). Opportunités et menaces sont externes : elles viennent du marché et de l'environnement (tendances, réglementation, nouveaux entrants). Confondre les deux (classer une tendance de marché comme « force ») rend la SWOT inutilisable.",
          ],
        },
        {
          heading: "Diagnostic, pas liste",
          body: [
            "Une SWOT faible aligne des généralités (« bonne qualité », « concurrence forte »). Une SWOT utile est précise et étayée : « délai de livraison de 24 h, deux fois plus rapide que le concurrent B » (force mesurable) ; « dépendance à un seul fournisseur » (faiblesse concrète). Chaque élément devrait pouvoir être justifié par la recherche des semaines précédentes.",
          ],
        },
        {
          heading: "Prioriser",
          body: [
            "Tous les éléments n'ont pas le même poids. On priorise selon l'impact potentiel et la probabilité. Trois forces décisives valent mieux que quinze forces anecdotiques. La priorisation prépare la décision.",
          ],
        },
        {
          heading: "Croiser la SWOT",
          body: [
            "La vraie valeur vient du croisement : Forces × Opportunités (comment utiliser mes forces pour saisir une opportunité ?), Faiblesses × Menaces (comment me protéger ?), Forces × Menaces (comment défendre ?), Faiblesses × Opportunités (que corriger pour saisir l'occasion ?). Chaque croisement produit une décision, pas un constat.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Force / Faiblesse", definition: "Facteur interne, sous votre contrôle." },
        { term: "Opportunité / Menace", definition: "Facteur externe, issu du marché ou de l'environnement." },
        { term: "SWOT croisée", definition: "Mise en relation des facteurs pour en tirer des décisions." },
      ],
      examples: [
        "Force × Opportunité : expertise locale (force) + demande croissante pour le « local » (opportunité) → axe de communication.",
        "Faiblesse × Menace : trésorerie fragile (faiblesse) + saison creuse (menace) → besoin d'une réserve ou d'une offre hors-saison.",
      ],
      commonError: {
        title: "Mettre une opportunité de marché dans « Forces »",
        body:
          "Une tendance favorable du marché n'est pas une force : c'est une opportunité (externe). Mal classer les facteurs fausse tout le raisonnement et empêche les bons croisements.",
      },
      caseStudy: {
        title: "Néva Cosmétiques (e-commerce) : de la liste à la décision",
        region: "canadienne",
        isFictional: true,
        body: [
          "Néva, marque fictive de cosmétiques, avait produit une SWOT typique : « Forces : bons produits. Faiblesses : peu connus. Opportunités : marché en croissance. Menaces : concurrence. » Aucune décision n'en sortait.",
          "Retravaillée en diagnostic précis et croisée, la SWOT devient actionnable : force = formulation clean vérifiable ; opportunité = demande pour la transparence des ingrédients ; croisement → axe de contenu « transparence totale » qui différencie et répond à une attente réelle. La SWOT croisée a directement nourri le positionnement.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l10-ia1",
          title: "Compléter et corriger une SWOT",
          objective: "Classer correctement des facteurs internes/externes.",
          instructions: [
            "Classez : (a) « équipe expérimentée » ; (b) « nouvelle réglementation favorable » ; (c) « trésorerie limitée » ; (d) « arrivée d'un concurrent international ».",
          ],
          answerKey: ["(a) Force (interne).", "(b) Opportunité (externe).", "(c) Faiblesse (interne).", "(d) Menace (externe)."],
          feedback: "Interne = sous votre contrôle ; externe = venant du marché/environnement.",
          successCriterion: "Les 4 facteurs correctement classés.",
        },
      ],
      activity: {
        title: "SWOT croisée de son projet",
        prompt: [
          "Rédigez une SWOT précise (2-3 éléments étayés par quadrant) à partir de votre recherche.",
          "Produisez 2 décisions issues de croisements (ex. Force × Opportunité, Faiblesse × Menace).",
        ],
        deliverables: ["Une SWOT étayée + 2 décisions issues de croisements, pour le dossier de positionnement."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Chaque facteur est bien classé (interne/externe).",
        "Les éléments sont étayés, pas génériques.",
        "Au moins deux décisions découlent de croisements.",
      ],
      resources: ["Gabarit de SWOT croisée (ressource interne)"],
      glossary: [
        { term: "Priorisation", definition: "Classement des facteurs selon impact et probabilité." },
      ],
      summary:
        "Une SWOT utile classe correctement interne/externe, s'appuie sur des faits, priorise, et surtout se croise pour produire des décisions.",
      selfAssessment: [
        "Mes facteurs sont-ils bien internes/externes et étayés ?",
        "Ai-je tiré des décisions de croisements, pas seulement une liste ?",
      ],
      quiz: { id: "mkt-v2-m2-l10-qz", questionIds: ["mkt-v2-m2-q16", "mkt-v2-m2-q17"], passThreshold: 70 },
      keyTakeaways: [
        "Forces/faiblesses = interne ; opportunités/menaces = externe.",
        "Une SWOT utile est précise, priorisée et croisée.",
        "Le croisement transforme le constat en décision.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à construire la proposition de valeur (leçon 6.3)." },
        { condition: "score < 70", message: "Revoyez le classement interne/externe et le croisement SWOT." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 6.3.",
    },
    {
      id: "mkt-v2-m2-l11",
      module: 2,
      week: 6,
      title: "Construire une proposition de valeur",
      authored: true,
      durationMinutes: 90,
      introduction:
        "La proposition de valeur répond en une phrase à la question du client : « pourquoi devrais-je te choisir ? ». Cette leçon en décompose les ingrédients et introduit le value proposition canvas.",
      objectives: [
        "Identifier le problème prioritaire et le public cible",
        "Articuler bénéfice principal, bénéfices secondaires et preuve",
        "Formuler une différenciation et une réduction du risque",
        "Rédiger et valider une proposition de valeur claire",
      ],
      competencies: ["C7"],
      prerequisites: ["Leçons 6.1 et 6.2 + personas/JTBD de la semaine 5"],
      sections: [
        {
          heading: "Les ingrédients",
          body: [
            "Une proposition de valeur repose sur : le problème prioritaire du client (le job le plus douloureux), le public cible (le segment), le bénéfice principal (le résultat clé promis), des bénéfices secondaires, une preuve (ce qui rend la promesse crédible : chiffres, garanties, témoignages), une différenciation (pourquoi vous plutôt qu'un autre) et une réduction du risque (garantie, essai, retour facile). Une promesse sans preuve n'est qu'un slogan.",
          ],
        },
        {
          heading: "Le value proposition canvas",
          body: [
            "Cet outil met en face à face le profil du client (ses jobs, ses gains attendus, ses douleurs) et l'offre (les produits/services, les créateurs de gains, les soulageurs de douleurs). L'adéquation (le « fit ») est atteinte quand l'offre soulage des douleurs réelles et crée des gains attendus. Le canvas force à partir du client, pas du produit.",
          ],
        },
        {
          heading: "Formuler clairement",
          body: [
            "Une formule utile : « Pour [cible] qui [problème/job], [offre] apporte [bénéfice principal] grâce à [différenciateur], contrairement à [alternative]. » Elle est concrète, spécifique et vérifiable. On évite le jargon (« solution innovante de nouvelle génération ») qui ne dit rien.",
          ],
        },
        {
          heading: "Valider auprès du public",
          body: [
            "Une proposition de valeur se teste : la présenter à des membres réels du segment et observer s'ils comprennent immédiatement le bénéfice et s'ils la trouvent crédible. Si le client doit demander « mais concrètement, ça fait quoi ? », la proposition n'est pas prête.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Proposition de valeur", definition: "Promesse claire du bénéfice principal apporté à un segment, et pourquoi vous." },
        { term: "Value proposition canvas", definition: "Outil confrontant profil client (jobs/gains/douleurs) et offre." },
        { term: "Preuve", definition: "Élément qui rend la promesse crédible (chiffre, garantie, témoignage)." },
      ],
      examples: [
        "« Pour les PME qui perdent du temps en facturation, OutiPro émet des factures conformes en 2 minutes, contrairement aux tableurs manuels. »",
        "Réduction du risque : essai 14 jours sans carte + remboursement — abaisse la barrière à l'achat.",
      ],
      commonError: {
        title: "Une promesse sans preuve ni différence",
        body:
          "« La meilleure qualité au meilleur prix » n'est ni prouvé ni différenciant : tout le monde le dit. Une proposition de valeur doit être spécifique, prouvée et distincte des alternatives.",
      },
      caseStudy: {
        title: "Racine & Sol (organisme communautaire) : clarifier la valeur",
        region: "québécoise",
        isFictional: true,
        body: [
          "Racine & Sol, un organisme fictif d'aide à l'emploi pour nouveaux arrivants, se présentait comme « accompagnement personnalisé de qualité » — flou et indifférenciant.",
          "En repartant du job (« obtenir un premier emploi qualifié rapidement ») et de la preuve (taux de placement, partenariats employeurs), l'organisme reformule : « Pour les nouveaux arrivants qualifiés, nous décrochons un premier emploi dans votre domaine en moins de 3 mois, grâce à notre réseau d'employeurs partenaires. » Concrète, prouvée, différenciante — les inscriptions et le soutien des partenaires ont augmenté.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l11-ia1",
          title: "Sélectionner la meilleure proposition de valeur",
          objective: "Reconnaître une proposition spécifique, prouvée et différenciante.",
          instructions: [
            "Choisissez la meilleure : (a) « Des produits de qualité à prix imbattables » ; (b) « Pour les parents pressés, nos repas prêts en 5 min sont approuvés par une nutritionniste, sans additifs » ; (c) « La solution innovante pour votre bien-être ».",
          ],
          answerKey: ["(b) — cible claire, bénéfice concret, preuve (nutritionniste), différenciation (sans additifs)."],
          feedback: "(a) et (c) sont vagues et non prouvés ; (b) est spécifique, crédible et distinct.",
          successCriterion: "(b) sélectionnée avec justification.",
        },
      ],
      activity: {
        title: "Rédiger sa proposition de valeur",
        prompt: [
          "Remplissez un mini value proposition canvas (jobs/gains/douleurs vs offre).",
          "Rédigez votre proposition avec la formule « Pour [cible] qui [job], [offre] apporte [bénéfice] grâce à [différence], contrairement à [alternative] », avec au moins une preuve.",
        ],
        deliverables: ["Un canvas rempli + une proposition de valeur rédigée et prête à tester."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "La proposition cible un segment précis et un problème prioritaire.",
        "Elle contient un bénéfice concret, une preuve et une différenciation.",
        "Elle évite le jargon vague.",
      ],
      resources: ["Gabarit value proposition canvas (ressource interne)"],
      glossary: [
        { term: "Fit (adéquation)", definition: "Correspondance entre les douleurs/gains du client et l'offre." },
        { term: "Réduction du risque", definition: "Dispositif (garantie, essai) qui abaisse la barrière à l'achat." },
      ],
      summary:
        "Une proposition de valeur relie un problème prioritaire à un bénéfice concret, prouvé et différencié, formulé clairement et testé auprès du public.",
      selfAssessment: [
        "Ma proposition est-elle spécifique, prouvée et différenciante ?",
        "Un membre de ma cible en comprendrait-il le bénéfice immédiatement ?",
      ],
      quiz: { id: "mkt-v2-m2-l11-qz", questionIds: ["mkt-v2-m2-q18", "mkt-v2-m2-q19"], passThreshold: 70 },
      keyTakeaways: [
        "Une promesse sans preuve n'est qu'un slogan.",
        "Le value proposition canvas force à partir du client.",
        "Une bonne proposition est spécifique, prouvée, différenciante et testée.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour le positionnement et le message (leçon 6.4)." },
        { condition: "score < 70", message: "Revoyez les ingrédients (preuve, différenciation) et la formule." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 6.4.",
    },
    {
      id: "mkt-v2-m2-l12",
      module: 2,
      week: 6,
      title: "Définir le positionnement et le message",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le positionnement est la place que votre marque occupe dans l'esprit du client par rapport aux alternatives. Cette leçon apprend à rédiger une déclaration de positionnement, à en dériver un message cohérent, et à savoir quand se repositionner.",
      objectives: [
        "Définir les composantes d'un positionnement (catégorie, cible, promesse, différence, raison de croire)",
        "Rédiger une déclaration de positionnement claire",
        "Décliner message principal, messages secondaires et slogan cohérents",
        "Tester le positionnement et reconnaître un besoin de repositionnement",
      ],
      competencies: ["C7"],
      prerequisites: ["Leçon 6.3 — proposition de valeur"],
      sections: [
        {
          heading: "Les composantes du positionnement",
          body: [
            "Un positionnement complet précise : la catégorie de référence (dans quel univers vous situez-vous ?), le public cible, la promesse (le bénéfice central), la différence (ce qui vous distingue), et la raison de croire (les preuves qui rendent la promesse crédible). Le positionnement est relatif : il se définit toujours par rapport aux alternatives dans l'esprit du client.",
          ],
        },
        {
          heading: "La déclaration de positionnement",
          body: [
            "Un format éprouvé : « Pour [cible], [marque] est la [catégorie] qui [promesse/différence], parce que [raison de croire]. » Cette phrase interne (pas un slogan public) aligne toute l'équipe sur ce que la marque veut occuper comme place. Elle découle directement de la proposition de valeur et de la SWOT croisée.",
          ],
        },
        {
          heading: "Du positionnement au message",
          body: [
            "Le message principal traduit le positionnement dans le langage du client. Les messages secondaires soutiennent le principal (bénéfices annexes, preuves, réponses aux objections). Le slogan est une formulation courte et mémorable — utile mais optionnel. La cohérence est essentielle : offre, positionnement et communication doivent raconter la même histoire, sinon la marque devient confuse.",
          ],
        },
        {
          heading: "Tester et repositionner",
          body: [
            "On teste un positionnement en vérifiant qu'il est crédible, distinctif et pertinent pour la cible. Un repositionnement devient nécessaire quand le marché change, quand la cible évolue, quand la promesse n'est plus crédible ou quand un concurrent occupe la même place. Repositionner est coûteux : mieux vaut un positionnement juste dès le départ, ce que tout le Module 2 a préparé.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Positionnement", definition: "Place occupée par la marque dans l'esprit du client, relativement aux alternatives." },
        { term: "Raison de croire", definition: "Preuve qui rend la promesse du positionnement crédible." },
        { term: "Message principal", definition: "Traduction du positionnement dans le langage du client." },
      ],
      examples: [
        "« Pour les PME débordées, OutiPro est le logiciel de facturation qui s'installe en une journée, parce qu'il ne demande aucune formation. »",
        "Cohérence : si la promesse est « simplicité », le site, le ton et le service doivent tous être simples.",
      ],
      commonError: {
        title: "Un positionnement « fourre-tout »",
        body:
          "Vouloir être « le meilleur pour tout le monde sur tout » n'occupe aucune place claire. Un positionnement fort assume un choix : une cible, une promesse dominante, une différence — quitte à renoncer au reste.",
      },
      caseStudy: {
        title: "Boréal Tech (technologique) : erreur de positionnement corrigée",
        region: "internationale",
        isFictional: true,
        body: [
          "Boréal Tech, entreprise fictive, se positionnait comme « la plateforme tout-en-un pour toutes les entreprises ». Message flou, cible introuvable, ventes dispersées — un cas classique d'erreur de positionnement.",
          "Après le travail du Module 2 (segment cible, JTBD, SWOT, proposition de valeur), Boréal Tech choisit une place précise : « la plateforme de gestion de projet pour les agences créatives de 5 à 50 personnes ». En renonçant à « tout le monde », elle a gagné en clarté, en crédibilité et en efficacité commerciale. Assumer un choix a créé la place.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m2-l12-ia1",
          title: "Corriger un positionnement trop vague",
          objective: "Transformer un positionnement flou en positionnement précis.",
          instructions: [
            "Reformulez ce positionnement vague : « Nous offrons des solutions de qualité pour tous vos besoins. » Proposez une version précise (cible + catégorie + promesse + différence).",
          ],
          answerKey: [
            "Exemple valide : « Pour les cafés indépendants, nous sommes le torréfacteur local qui livre du café frais en 48 h, parce que nous torréfions à la commande. »",
          ],
          feedback: "Un bon positionnement nomme une cible, une catégorie, une promesse et une différence — jamais « tous vos besoins ».",
          successCriterion: "Reformulation contenant cible, catégorie, promesse et différence.",
        },
      ],
      activity: {
        title: "Rédiger sa déclaration de positionnement et son message",
        prompt: [
          "Rédigez votre déclaration de positionnement au format « Pour [cible], [marque] est la [catégorie] qui [promesse/différence], parce que [raison de croire] ».",
          "Dérivez un message principal, 2 messages secondaires et un slogan optionnel, cohérents avec la proposition de valeur.",
        ],
        deliverables: ["Une déclaration de positionnement + message principal, messages secondaires et slogan — pièces finales du dossier."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "La déclaration nomme catégorie, cible, promesse, différence et raison de croire.",
        "Les messages sont cohérents avec la proposition de valeur.",
        "Le positionnement assume un choix (pas « tout le monde »).",
      ],
      resources: ["Gabarit de déclaration de positionnement (ressource interne)"],
      glossary: [
        { term: "Repositionnement", definition: "Changement volontaire de la place occupée dans l'esprit du client." },
        { term: "Slogan", definition: "Formulation courte et mémorable du positionnement (optionnelle)." },
      ],
      summary:
        "Le positionnement fixe la place de la marque par rapport aux alternatives ; il se rédige en déclaration claire, se décline en messages cohérents, et se teste — un bon positionnement assume un choix.",
      selfAssessment: [
        "Ma déclaration contient-elle catégorie, cible, promesse, différence et raison de croire ?",
        "Mon offre, mon positionnement et mes messages racontent-ils la même histoire ?",
      ],
      quiz: { id: "mkt-v2-m2-l12-qz", questionIds: ["mkt-v2-m2-q20", "mkt-v2-m2-q15"], passThreshold: 70 },
      keyTakeaways: [
        "Le positionnement est relatif : il se définit par rapport aux alternatives.",
        "Une déclaration claire aligne l'équipe ; les messages en découlent.",
        "Un positionnement fort assume un choix ; cohérence offre/message obligatoire.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Module 2 maîtrisé. Finalisez le dossier de marché et de positionnement." },
        { condition: "score < 70", message: "Revoyez les composantes du positionnement et la cohérence offre/message." },
      ],
      progressionRule:
        "Compléter les 4 leçons de la semaine 6, le quiz hebdomadaire, le sommatif du module (≥ 70 %) et déposer le dossier (TP) pour valider le Module 2.",
    },
  ],

  weeklyQuizzes: [
    {
      id: "mkt-v2-m2-week4-quiz",
      // Semaine 4 : recherche et marché (5 questions M2 + 3 questions de révision M1)
      questionIds: [
        "mkt-v2-m2-q01",
        "mkt-v2-m2-q02",
        "mkt-v2-m2-q03",
        "mkt-v2-m2-q04",
        "mkt-v2-m2-q05",
        "mkt-v2-m1-q05",
        "mkt-v2-m1-q10",
        "mkt-v2-m1-q13",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m2-week5-quiz",
      // Semaine 5 : segmentation, besoins, persona, JTBD (7 M2 + 1 révision M1)
      questionIds: [
        "mkt-v2-m2-q06",
        "mkt-v2-m2-q07",
        "mkt-v2-m2-q08",
        "mkt-v2-m2-q09",
        "mkt-v2-m2-q10",
        "mkt-v2-m2-q11",
        "mkt-v2-m2-q12",
        "mkt-v2-m1-q05",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m2-week6-quiz",
      // Semaine 6 : concurrence, SWOT, proposition de valeur, positionnement (8 M2)
      questionIds: [
        "mkt-v2-m2-q13",
        "mkt-v2-m2-q14",
        "mkt-v2-m2-q15",
        "mkt-v2-m2-q16",
        "mkt-v2-m2-q17",
        "mkt-v2-m2-q18",
        "mkt-v2-m2-q19",
        "mkt-v2-m2-q20",
      ],
      passThreshold: 70,
    },
  ],

  rubric: {
    id: "mkt-v2-m2-rubric",
    title: "Rubrique — Dossier de marché, client idéal et positionnement",
    totalPoints: 100,
    passThreshold: 60,
    criteria: [
      { label: "Qualité de la recherche", points: 15 },
      { label: "Utilisation des sources", points: 10 },
      { label: "Segmentation", points: 10 },
      { label: "Personas", points: 15 },
      { label: "Analyse des besoins", points: 10 },
      { label: "Concurrence", points: 10 },
      { label: "SWOT", points: 10 },
      { label: "Proposition de valeur", points: 10 },
      { label: "Positionnement et message", points: 10 },
    ],
  },

  assessments: [
    {
      id: "mkt-v2-m2-sum",
      kind: "summative",
      title: "Sommatif Module 2 — Étude de marché et positionnement (20 questions)",
      passThreshold: 70,
      weightHint: "Quiz de modules (20 %)",
    },
    {
      id: "mkt-v2-m2-tp",
      kind: "practical",
      title: "TP2 — Dossier de marché, client idéal et positionnement (livrable 2/7 du projet, rubrique 100 pts)",
      passThreshold: 60,
      weightHint: "Travaux pratiques (25 %)",
    },
  ],
};
