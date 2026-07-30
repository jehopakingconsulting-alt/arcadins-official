import type { ModuleV2 } from "@/lib/academic/types";

/**
 * MODULE 6 — Analytique avancée, automatisation et optimisation (semaines 16–18).
 * Programme pilote Marketing Digital et E-commerce, version académique v2.
 *
 * Transforme les indicateurs et la boucle de rétroaction (M4-M5) en un système de mesure, d'automatisation
 * et d'optimisation fondé sur des données fiables. Isolé du contenu v1 ; ne modifie aucune donnée.
 * Prépare le Module 7.
 *
 * Toute donnée chiffrée est un « Jeu de données pédagogique fictif ». Toute automatisation est une
 * « Simulation pédagogique — aucune diffusion réelle ». Aucun compte réel connecté, aucune campagne lancée,
 * aucune donnée personnelle réelle. Aucun indicateur isolé ne garantit un succès commercial.
 */
export const marketingDigitalV2Module6: ModuleV2 = {
  index: 6,
  title: "Analytique avancée, automatisation et optimisation",
  weeks: [16, 17, 18],
  summary:
    "Mesurer, interpréter et optimiser : bâtir un plan de mesure et des tableaux de bord, analyser tunnels, segments, attribution et cohortes, expérimenter (A/B), automatiser de façon responsable et décider sur des données fiables — dans le respect de la confidentialité.",
  competencies: ["C17", "C18", "C19"],
  introduction:
    "Les Modules 4 et 5 ont produit des indicateurs et une boucle de rétroaction. Le Module 6 répond à : « comment mesurer juste, automatiser sans perdre le contrôle, et optimiser sur des données fiables ? ». On y construit un plan de mesure, on analyse tunnels, segments, attribution et cohortes, on expérimente rigoureusement, et on conçoit des automatisations — toujours en simulation, sous supervision humaine et dans le respect du consentement.",
  contentMeta: {
    sourceLang: "fr",
    translationStatus: "source",
    version: "1.0.0",
    revisionDate: "2026-07-30",
    reviewer: null,
    editorialStatus: "approved",
  },
  links: {
    prerequisitesFromPrevious: [
      "Indicateurs et tableau de bord e-commerce (M5) — base du plan de mesure",
      "CTR/CPC/CPA/ROAS, tests A/B, UTM/attribution (M4) — approfondis en analytique",
      "Entonnoir et parcours (M4/M2) — analyse de tunnel et de cohortes",
      "Fidélisation, réachat, LTV (M5/M1) — rétention et automatisation du cycle de vie",
    ],
    consolidatedCompetencies: [
      "C13/C16 (mesure/optimisation) → étendus en C17 (analytique avancée) et C19 (optimisation continue)",
      "C12 (campagnes) → prolongé par l'automatisation responsable (C18)",
    ],
    newCompetencies: [
      "C17 — analytique avancée (plan de mesure, tableaux de bord, tunnels, segments, attribution, cohortes)",
      "C18 — automatisation marketing responsable (scénarios, séquences, lead scoring)",
      "C19 — optimisation continue et décision fondée sur des données fiables et gouvernées",
    ],
    deliverablesForNextModule: [
      "Plan de mesure + tableau de bord + protocole de test → base d'industrialisation du Module 7",
      "Plan d'automatisation + règles de gouvernance des données → cadre responsable du Module 7",
    ],
  },
  lessons: [
    // ══════════ SEMAINE 16 — FONDEMENTS DE L'ANALYTIQUE ET PLAN DE MESURE ══════════
    {
      id: "mkt-v2-m6-l1",
      module: 6,
      week: 16,
      title: "Fondements de l'analytique numérique",
      authored: true,
      durationMinutes: 90,
      introduction:
        "L'analytique transforme des données brutes en décisions. Encore faut-il savoir ce qu'on mesure, pourquoi, et avec quelles limites. Cette leçon pose les fondements et distingue données utiles et métriques de vanité.",
      objectives: [
        "Définir l'analytique numérique et son rôle décisionnel",
        "Distinguer données de vanité et indicateurs actionnables",
        "Relier chaque mesure à une question et une décision",
        "Reconnaître les limites et biais des données",
      ],
      competencies: ["C17"],
      prerequisites: ["Module 5 — indicateurs et tableau de bord"],
      sections: [
        {
          heading: "À quoi sert l'analytique",
          body: [
            "L'analytique numérique est la collecte, la mesure et l'interprétation des données d'une activité en ligne pour éclairer les décisions. Elle ne remplace pas le jugement : elle le fonde sur des faits. Mesurer sans intention (« collecter au cas où ») produit du bruit ; on part toujours d'une question à laquelle la donnée doit répondre.",
          ],
        },
        {
          heading: "Vanité vs actionnable",
          body: [
            "Une métrique de vanité flatte sans guider (nombre de visites brutes, abonnés). Un indicateur actionnable relie une mesure à une décision : le taux de conversion dit s'il faut améliorer la page, le CPA s'il faut ajuster le budget. Le test : « si ce chiffre change, quelle décision cela modifie-t-il ? ». Si la réponse est « aucune », c'est probablement de la vanité.",
          ],
        },
        {
          heading: "De la question à la donnée",
          body: [
            "La bonne démarche part de la question d'affaires (« pourquoi les visiteurs abandonnent-ils ? »), en déduit l'indicateur (taux d'abandon par étape), puis la collecte nécessaire (événements). L'inverse — collecter d'abord, chercher un sens ensuite — mène à des tableaux de bord encombrés et inutiles.",
          ],
        },
        {
          heading: "Limites et biais",
          body: [
            "Les données ont des limites : échantillonnage, blocage de traceurs, données déclaratives peu fiables, périodes atypiques. Elles peuvent aussi être biaisées (un segment sur-représenté, une mesure mal définie). Interpréter avec prudence et connaître ces limites évite des décisions fondées sur des chiffres trompeurs.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Analytique numérique", definition: "Collecte, mesure et interprétation des données pour éclairer les décisions." },
        { term: "Indicateur actionnable", definition: "Mesure reliée à une décision concrète." },
        { term: "Métrique de vanité", definition: "Chiffre flatteur sans lien avec une décision ou un résultat." },
      ],
      examples: [
        "Question « où fuit le tunnel ? » → indicateur « taux de passage par étape » → collecte d'événements.",
        "« 100 000 impressions » sans conversion : vanité si aucune décision n'en découle.",
      ],
      commonError: {
        title: "Collecter d'abord, réfléchir ensuite",
        body:
          "Empiler des données sans question préalable produit des tableaux de bord illisibles. On part de la décision à éclairer, puis on choisit la mesure.",
      },
      vigilancePoint: {
        title: "Prudence d'interprétation",
        body:
          "Un chiffre n'est jamais neutre : vérifier sa définition, sa période et son échantillon avant d'en tirer une décision. Toutes les données du module sont simulées.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Café Nord-Berge (torréfacteur, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le café fictif Nord-Berge suivait fièrement son nombre d'abonnés et d'impressions, sans savoir quoi en faire. Les décisions restaient à l'instinct.",
          "En repartant de questions d'affaires (« quelle étape fuit ? », « quel canal rapporte ? ») et en ne gardant que les indicateurs reliés à une décision, Nord-Berge a transformé son analytique en outil de pilotage. Mesurer moins, mais utile, a mieux guidé que mesurer tout.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l1-ia1",
          title: "Distinguer vanité et indicateur actionnable",
          objective: "Classer des mesures selon leur utilité décisionnelle.",
          instructions: [
            "Classez actionnable/vanité : (a) taux de conversion ; (b) nombre total de « j'aime » ; (c) coût par acquisition ; (d) nombre de vues brutes.",
          ],
          answerKey: ["(a) actionnable ; (b) vanité ; (c) actionnable ; (d) vanité (sauf reliée à une décision)."],
          feedback: "Un indicateur actionnable change une décision quand il varie.",
          successCriterion: "Au moins 3 des 4 correctement classés.",
        },
      ],
      exercise: {
        title: "Cadrer ses questions d'analytique",
        prompt: [
          "Pour votre projet, formulez 3 questions d'affaires prioritaires.",
          "Associez à chacune un indicateur actionnable et la décision qu'il éclaire.",
        ],
        deliverables: ["Un tableau question → indicateur → décision (3 lignes)."],
        estimatedMinutes: 45,
      },
      successCriteria: [
        "Chaque indicateur est relié à une question et une décision.",
        "Les métriques de vanité sont écartées.",
        "Les limites des données sont mentionnées.",
      ],
      resources: ["Notes de cours ARCADINS — fondements de l'analytique (ressource interne)"],
      glossary: [{ term: "Biais de données", definition: "Distorsion systématique faussant l'interprétation (échantillon, mesure)." }],
      summary:
        "L'analytique éclaire les décisions : on part d'une question, on choisit un indicateur actionnable, on collecte le nécessaire et on interprète avec prudence — pas de collecte sans intention.",
      selfAssessment: [
        "Chacun de mes indicateurs éclaire-t-il une décision ?",
        "Ai-je conscience des limites de mes données ?",
      ],
      quiz: { id: "mkt-v2-m6-l1-qz", questionIds: ["mkt-v2-m6-q01", "mkt-v2-m6-q02"], passThreshold: 70 },
      keyTakeaways: [
        "On part de la décision, pas de la donnée.",
        "Actionnable = change une décision quand il varie.",
        "Toute donnée a des limites ; on interprète avec prudence.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Solide. Passez aux objectifs, événements et conversions (leçon 16.2)." },
        { condition: "score < 70", message: "Revoyez la distinction vanité/actionnable et la démarche question → donnée." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 16.2.",
    },
    {
      id: "mkt-v2-m6-l2",
      module: 6,
      week: 16,
      title: "Objectifs, événements, conversions et indicateurs",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Mesurer suppose de définir précisément ce que l'on compte. Cette leçon structure objectifs, événements, conversions (micro/macro) et indicateurs, pour poser des bases de mesure cohérentes.",
      objectives: [
        "Définir objectifs, événements et conversions",
        "Distinguer micro et macroconversions",
        "Choisir des indicateurs cohérents avec les objectifs",
        "Éviter les définitions ambiguës qui faussent les rapports",
      ],
      competencies: ["C17"],
      prerequisites: ["Leçon 16.1 ; entonnoir (M4)"],
      sections: [
        {
          heading: "Objectifs et événements",
          body: [
            "Un objectif est un résultat visé (obtenir des inscriptions). Un événement est une action mesurable enregistrée (clic, ajout au panier, formulaire soumis). Les objectifs guident le choix des événements à suivre : on n'instrumente pas tout, on instrumente ce qui compte pour les objectifs.",
          ],
        },
        {
          heading: "Conversions micro et macro",
          body: [
            "La macroconversion est l'objectif principal (achat, inscription payante). Les microconversions sont les jalons intermédiaires (téléchargement, création de compte, ajout au panier). Suivre les deux permet de diagnostiquer le parcours étape par étape et d'anticiper les résultats avant la macroconversion.",
          ],
        },
        {
          heading: "Choisir les indicateurs",
          body: [
            "À chaque objectif correspondent des indicateurs : pour la conversion, le taux de conversion et le CPA ; pour la rétention, le taux de réachat et la LTV ; pour l'engagement, des mesures d'interaction reliées à un résultat. On limite le nombre d'indicateurs à ceux qui pilotent réellement.",
          ],
        },
        {
          heading: "Définitions sans ambiguïté",
          body: [
            "Une « conversion » mal définie (compte-t-on les doublons ? les remboursements ? les visiteurs ou les sessions ?) produit des rapports incohérents et des décisions erronées. On documente chaque définition (dictionnaire d'indicateurs) pour que tout le monde compte la même chose.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Événement", definition: "Action mesurable enregistrée (clic, ajout au panier, formulaire)." },
        { term: "Conversion", definition: "Action atteignant un objectif défini (achat, inscription…)." },
        { term: "Dictionnaire d'indicateurs", definition: "Documentation des définitions de chaque mesure." },
      ],
      examples: [
        "Objectif « inscriptions » → événement « formulaire soumis » → indicateur « taux de conversion inscription ».",
        "Définir « conversion » = achat payé net des remboursements, par visiteur unique.",
      ],
      commonError: {
        title: "Des définitions floues",
        body:
          "Compter les conversions tantôt par session, tantôt par visiteur, sans le dire, rend les rapports incomparables. On fixe et documente chaque définition.",
      },
      vigilancePoint: {
        title: "Exactitude des rapports",
        body:
          "Un rapport n'est fiable que si les définitions sont claires et constantes. On évite de changer une définition en cours de route sans le signaler.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada) — Jeu de données pédagogique fictif",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO comptait ses « conversions » différemment selon les rapports (parfois les ajouts au panier, parfois les achats). Les chiffres se contredisaient.",
          "En établissant un dictionnaire d'indicateurs (conversion = achat payé, net de remboursements) et en distinguant micro et macroconversions, InfusiO a obtenu des rapports cohérents et des décisions fiables. Des définitions claires ont mis fin aux contradictions.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l2-ia1",
          title: "Associer objectif, événement et indicateur",
          objective: "Relier chaque objectif à son événement et son indicateur.",
          instructions: [
            "Associez pour l'objectif « obtenir des prospects » : l'événement et l'indicateur pertinents parmi — événement : « formulaire soumis » / « page vue » ; indicateur : « taux de conversion prospect » / « nombre d'abonnés ».",
          ],
          answerKey: ["Événement : « formulaire soumis » ; indicateur : « taux de conversion prospect »."],
          feedback: "L'événement mesure l'action visée ; l'indicateur la rapporte à un volume.",
          successCriterion: "Événement et indicateur corrects choisis.",
        },
      ],
      exercise: {
        title: "Ébauche de plan de mesure",
        prompt: [
          "Listez 1 macroconversion et 3 microconversions pour votre projet.",
          "Définissez chacune sans ambiguïté (dictionnaire d'indicateurs).",
        ],
        deliverables: ["Une liste micro/macroconversions + un mini-dictionnaire d'indicateurs (définitions)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Micro et macroconversions sont distinguées.",
        "Chaque indicateur a une définition claire.",
        "Les indicateurs servent les objectifs.",
      ],
      resources: ["Gabarit de dictionnaire d'indicateurs (ressource interne)"],
      glossary: [{ term: "Macroconversion", definition: "Objectif principal (achat, inscription payante)." }],
      summary:
        "On relie objectifs → événements → conversions (micro/macro) → indicateurs, chacun défini sans ambiguïté, pour des rapports cohérents et des décisions fiables.",
      selfAssessment: [
        "Mes conversions sont-elles définies clairement ?",
        "Mes indicateurs servent-ils mes objectifs ?",
      ],
      quiz: { id: "mkt-v2-m6-l2-qz", questionIds: ["mkt-v2-m6-q03", "mkt-v2-m6-q02"], passThreshold: 70 },
      keyTakeaways: [
        "Objectif → événement → conversion → indicateur.",
        "Micro/macroconversions diagnostiquent le parcours.",
        "Des définitions claires garantissent des rapports fiables.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à construire un plan de mesure (leçon 16.3)." },
        { condition: "score < 70", message: "Revoyez la définition des conversions et le dictionnaire d'indicateurs." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 16.3.",
    },
    {
      id: "mkt-v2-m6-l3",
      module: 6,
      week: 16,
      title: "Construire un plan de mesure",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le plan de mesure relie objectifs, indicateurs, événements et responsabilités en un document opérationnel. Cette leçon apprend à le construire dans le respect de la confidentialité et du consentement.",
      objectives: [
        "Structurer un plan de mesure (objectifs → indicateurs → événements)",
        "Définir sources, responsables et fréquence de suivi",
        "Intégrer consentement et minimisation dès la conception",
        "Garantir la qualité et la cohérence des données",
      ],
      competencies: ["C17"],
      prerequisites: ["Leçons 16.1-16.2"],
      sections: [
        {
          heading: "Qu'est-ce qu'un plan de mesure",
          body: [
            "Le plan de mesure est le document de référence qui relie chaque objectif à ses indicateurs, chaque indicateur à ses événements et sources, et précise qui suit quoi, à quelle fréquence. Il évite le double écueil : mesurer trop (bruit) ou trop peu (angles morts).",
          ],
        },
        {
          heading: "Sources, responsables, fréquence",
          body: [
            "Chaque indicateur a une source (analytics, base de commandes, service client), un responsable (qui le suit et agit) et une fréquence de revue (quotidienne, hebdomadaire, mensuelle selon l'enjeu). Sans responsable ni cadence, un indicateur n'est jamais regardé et ne sert à rien.",
          ],
        },
        {
          heading: "Confidentialité dès la conception",
          body: [
            "Le plan intègre la protection des données dès le départ : consentement au suivi, minimisation (ne collecter que le nécessaire), finalité claire, et durée de conservation. La mesure ne justifie jamais une collecte excessive ou non consentie. C'est une exigence éthique et souvent légale.",
          ],
        },
        {
          heading: "Qualité des données",
          body: [
            "Un plan prévoit des contrôles de qualité : cohérence des définitions, détection des anomalies (pics improbables), déduplication, gestion des données manquantes. Des données de mauvaise qualité produisent des décisions de mauvaise qualité — « garbage in, garbage out ».",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Plan de mesure", definition: "Document reliant objectifs, indicateurs, événements, sources et responsables." },
        { term: "Minimisation", definition: "Ne collecter que les données strictement nécessaires à la finalité." },
        { term: "Qualité des données", definition: "Exactitude, cohérence et complétude des données mesurées." },
      ],
      examples: [
        "Ligne de plan : objectif « ventes » → indicateur « taux de conversion » → événement « achat » → source « base commandes » → responsable « resp. e-commerce » → hebdo.",
        "Consentement au suivi demandé avant tout traçage non essentiel.",
      ],
      commonError: {
        title: "Un plan sans responsable ni cadence",
        body:
          "Des indicateurs listés sans responsable ni fréquence de revue ne sont jamais regardés. Chaque indicateur a un propriétaire et un rythme de suivi.",
      },
      vigilancePoint: {
        title: "Consentement et minimisation",
        body:
          "On intègre le consentement et la minimisation dès la conception du plan. Aucune collecte excessive, aucune finalité floue ; la conformité prime sur la curiosité.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Studio Lumen (services, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le studio fictif Lumen collectait quantité de données « au cas où », sans plan, sans responsable, et sans base de consentement claire.",
          "En construisant un plan de mesure (objectifs → indicateurs → événements → sources → responsables → fréquence) avec consentement et minimisation intégrés, Lumen a réduit sa collecte au nécessaire, clarifié les responsabilités et fiabilisé ses décisions. Un bon plan mesure moins, mais mieux et légalement.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l3-ia1",
          title: "Compléter une ligne de plan de mesure",
          objective: "Relier objectif, indicateur, événement, source et responsable.",
          instructions: [
            "Complétez pour l'objectif « augmenter le réachat » : indicateur, événement, source, responsable, fréquence.",
          ],
          answerKey: [
            "Indicateur : taux de réachat ; événement : 2e commande ; source : base commandes ; responsable : resp. fidélisation ; fréquence : mensuelle.",
          ],
          feedback: "Chaque indicateur a une source, un responsable et une cadence.",
          successCriterion: "Ligne complète et cohérente.",
        },
      ],
      exercise: {
        title: "Plan de mesure du projet",
        prompt: [
          "Construisez un plan de mesure de 5 lignes (objectif → indicateur → événement → source → responsable → fréquence).",
          "Ajoutez une note de consentement/minimisation.",
        ],
        deliverables: ["Un plan de mesure (5 lignes) + note de confidentialité (consentement, minimisation)."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Chaque indicateur a source, responsable et fréquence.",
        "Consentement et minimisation sont intégrés.",
        "Le plan couvre les objectifs prioritaires sans surcollecte.",
      ],
      resources: ["Gabarit de plan de mesure (ressource interne)"],
      glossary: [{ term: "Finalité", definition: "But précis justifiant la collecte d'une donnée." }],
      summary:
        "Le plan de mesure relie objectifs, indicateurs, événements, sources et responsables, à une cadence définie, avec consentement, minimisation et contrôles de qualité intégrés dès la conception.",
      selfAssessment: [
        "Chaque indicateur a-t-il un responsable et une cadence ?",
        "Mon plan respecte-t-il consentement et minimisation ?",
      ],
      quiz: { id: "mkt-v2-m6-l3-qz", questionIds: ["mkt-v2-m6-q04", "mkt-v2-m6-q19"], passThreshold: 70 },
      keyTakeaways: [
        "Un plan relie objectifs, indicateurs, événements, sources, responsables.",
        "Sans responsable ni cadence, un indicateur est inutile.",
        "Consentement, minimisation et qualité dès la conception.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour les tableaux de bord (leçon 16.4)." },
        { condition: "score < 70", message: "Revoyez la structure du plan de mesure et la confidentialité." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 16.4.",
    },
    {
      id: "mkt-v2-m6-l4",
      module: 6,
      week: 16,
      title: "Tableaux de bord et visualisation",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Un bon tableau de bord rend la donnée compréhensible et actionnable en un coup d'œil. Cette leçon présente les principes de visualisation et les pièges des graphiques trompeurs.",
      objectives: [
        "Concevoir un tableau de bord orienté décision",
        "Choisir la bonne visualisation selon la donnée",
        "Comparer dans le temps et par segment",
        "Éviter les graphiques trompeurs",
      ],
      competencies: ["C17"],
      prerequisites: ["Leçon 16.3 — plan de mesure"],
      sections: [
        {
          heading: "Un tableau de bord pour décider",
          body: [
            "Un tableau de bord met en avant peu d'indicateurs, ceux qui pilotent réellement, avec le contexte nécessaire (objectif, tendance, seuil). Chaque élément doit répondre à « quelle décision cela éclaire-t-il ? ». Un tableau de bord n'est pas une collection de chiffres : c'est un outil de décision.",
          ],
        },
        {
          heading: "Choisir la visualisation",
          body: [
            "La forme suit la donnée : courbe pour une évolution dans le temps, barres pour comparer des catégories, tableau pour des valeurs précises, entonnoir pour un tunnel. Une mauvaise forme (camembert à 12 parts, échelle trompeuse) noie le message. La simplicité et la clarté priment sur l'esthétique.",
          ],
        },
        {
          heading: "Comparer",
          body: [
            "Un chiffre isolé ne dit rien : on le compare dans le temps (vs période précédente), à un objectif, ou par segment. « 2 % de conversion » prend son sens face à « 1,5 % le mois dernier » ou « 3 % pour un autre canal ». La comparaison transforme la mesure en information.",
          ],
        },
        {
          heading: "Graphiques trompeurs",
          body: [
            "Échelle tronquée qui exagère une variation, axes manipulés, périodes cherry-pickées, moyennes qui cachent des extrêmes : autant de pièges qui trompent, volontairement ou non. On présente la donnée honnêtement, avec échelle complète et période représentative — l'exactitude des rapports est une exigence éthique.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Tableau de bord", definition: "Vue synthétique d'indicateurs décisionnels avec leur contexte." },
        { term: "Graphique trompeur", definition: "Visualisation qui fausse la perception (échelle tronquée, période choisie)." },
        { term: "Comparaison", definition: "Mise en regard d'un chiffre avec le temps, un objectif ou un segment." },
      ],
      examples: [
        "Courbe de conversion sur 6 mois avec ligne d'objectif — jeu de données pédagogique fictif.",
        "Échelle tronquée faisant paraître énorme une hausse de 1 % : à éviter.",
      ],
      commonError: {
        title: "Le tableau de bord fourre-tout",
        body:
          "Empiler 40 graphiques noie le signal. On sélectionne quelques indicateurs décisionnels et on donne le contexte (tendance, objectif).",
      },
      vigilancePoint: {
        title: "Honnêteté visuelle",
        body:
          "On ne manipule jamais une échelle ni une période pour appuyer une conclusion. La visualisation doit refléter fidèlement la donnée.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréal Tech (technologie, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "L'entreprise fictive Boréal Tech présentait à sa direction des graphiques à échelle tronquée qui exagéraient les progrès. Les décisions reposaient sur une illusion.",
          "En adoptant des visualisations honnêtes (échelle complète, comparaisons dans le temps et par segment, peu d'indicateurs décisionnels), Boréal Tech a fondé ses décisions sur la réalité. Un tableau de bord clair et honnête a remplacé la mise en scène.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l4-ia1",
          title: "Choisir la bonne visualisation",
          objective: "Associer une donnée au bon type de graphique.",
          instructions: [
            "Associez : (1) évolution du CA sur 12 mois ; (2) comparaison des ventes par canal ; (3) passage d'étape en étape d'un tunnel.",
            "Types : courbe · barres · entonnoir.",
          ],
          answerKey: ["1 → courbe ; 2 → barres ; 3 → entonnoir."],
          feedback: "La forme suit la nature de la donnée (temps, catégories, tunnel).",
          successCriterion: "Les 3 associations correctes.",
        },
      ],
      exercise: {
        title: "Maquette de tableau de bord",
        prompt: [
          "Concevez un tableau de bord de 5 indicateurs décisionnels pour votre projet, avec la visualisation adaptée à chacun.",
          "Ajoutez une comparaison (temps ou segment) par indicateur.",
        ],
        deliverables: ["Une maquette de tableau de bord (5 indicateurs, visualisations, comparaisons)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les indicateurs sont décisionnels et peu nombreux.",
        "La visualisation est adaptée à chaque donnée.",
        "Aucune échelle ni période trompeuse.",
      ],
      resources: ["Guide de visualisation (ressource interne)"],
      glossary: [{ term: "Entonnoir (visualisation)", definition: "Graphique montrant le passage d'une étape à l'autre d'un tunnel." }],
      summary:
        "Un bon tableau de bord met en avant peu d'indicateurs décisionnels, choisit la visualisation adaptée, compare (temps/objectif/segment) et présente la donnée honnêtement.",
      selfAssessment: [
        "Mon tableau de bord aide-t-il vraiment à décider ?",
        "Mes visualisations sont-elles honnêtes et adaptées ?",
      ],
      quiz: { id: "mkt-v2-m6-l4-qz", questionIds: ["mkt-v2-m6-q05", "mkt-v2-m6-q01"], passThreshold: 70 },
      keyTakeaways: [
        "Un tableau de bord sert à décider, pas à impressionner.",
        "La forme du graphique suit la nature de la donnée.",
        "Comparer donne du sens ; l'honnêteté visuelle est obligatoire.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 16 maîtrisée. Passez à l'analyse (semaine 17)." },
        { condition: "score < 70", message: "Revoyez le choix des visualisations et l'honnêteté des graphiques." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 16 + le quiz hebdomadaire avant la semaine 17.",
    },

    // ══════════ SEMAINE 17 — ANALYSE : TUNNEL, SEGMENTS, ATTRIBUTION, EXPÉRIMENTATION, COHORTES ══════════
    {
      id: "mkt-v2-m6-l5",
      module: 6,
      week: 17,
      title: "Analyse du tunnel de conversion",
      authored: true,
      durationMinutes: 90,
      introduction:
        "L'analyse de tunnel révèle où et pourquoi les gens abandonnent. Cette leçon apprend à mesurer chaque étape, calculer les taux de passage et prioriser les corrections.",
      objectives: [
        "Décomposer un tunnel en étapes mesurables",
        "Calculer les taux de passage et repérer la fuite principale",
        "Distinguer problème de volume et problème de conversion",
        "Prioriser les corrections par impact",
      ],
      competencies: ["C17"],
      prerequisites: ["Semaine 16 ; entonnoir (M4)"],
      formulas: [
        { name: "Taux de passage (étape)", expression: "personnes étape N+1 / personnes étape N × 100", example: "(350 / 400) × 100 = 87,5 % — jeu de données pédagogique fictif" },
        { name: "Taux de conversion global", expression: "conversions / entrées du tunnel × 100", example: "(60 / 1000) × 100 = 6 % — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "Décomposer le tunnel",
          body: [
            "On découpe le parcours en étapes mesurables (visite → vue produit → panier → paiement → achat). Chaque étape a un nombre d'entrants et de sortants. Cette décomposition transforme un « on convertit mal » vague en un diagnostic précis étape par étape.",
          ],
        },
        {
          heading: "Taux de passage et fuite",
          body: [
            "Le taux de passage d'une étape = entrants de l'étape suivante / entrants de l'étape courante. La fuite principale est l'étape au taux de passage le plus faible par rapport à son repère. C'est là qu'une amélioration a le plus d'effet, comme vu au Module 4 — on le quantifie ici précisément.",
          ],
        },
        {
          heading: "Volume vs conversion",
          body: [
            "Deux problèmes distincts : un manque de volume en haut du tunnel (peu de visiteurs) ou un problème de conversion (beaucoup entrent, peu avancent). Les remèdes diffèrent : plus d'acquisition pour le volume, amélioration de l'expérience pour la conversion. Confondre les deux mène à investir au mauvais endroit.",
          ],
        },
        {
          heading: "Prioriser",
          body: [
            "On priorise la correction de l'étape qui, améliorée, rapporte le plus (fort trafic × forte fuite). Un petit gain sur une étape à fort volume vaut souvent plus qu'un grand gain sur une étape marginale. La priorisation par impact guide l'effort d'optimisation.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Tunnel de conversion", definition: "Suite d'étapes menant de l'entrée à la conversion." },
        { term: "Taux de passage", definition: "Proportion de personnes franchissant une étape vers la suivante." },
        { term: "Fuite", definition: "Étape où la perte de personnes est la plus forte." },
      ],
      examples: [
        "Jeu de données pédagogique fictif : 1000 → 400 → 350 → 60. Plus forte fuite : panier → achat (350→60).",
        "Beaucoup de visiteurs mais peu de vues produit : problème d'expérience, pas de volume.",
      ],
      commonError: {
        title: "Ajouter du trafic sur un tunnel qui fuit",
        body:
          "Investir en acquisition alors que la fuite est à la conversion amplifie la perte. On corrige d'abord l'étape défaillante.",
      },
      vigilancePoint: {
        title: "Comparer des étapes comparables",
        body:
          "On compare les taux de passage à leurs repères respectifs, pas dans l'absolu. Une étape « normale » à 90 % peut être excellente, une autre à 90 % médiocre selon le contexte.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Néva Cosmétiques (e-commerce, Canada) — Jeu de données pédagogique fictif",
        region: "canadienne",
        isFictional: true,
        body: [
          "La marque fictive Néva voulait « plus de trafic » alors que son analyse de tunnel montrait une fuite massive au paiement.",
          "En quantifiant les taux de passage, Néva a identifié le paiement comme fuite principale, corrigé le checkout, et vu sa conversion globale grimper — sans dépenser davantage en acquisition. L'analyse de tunnel a redirigé l'effort au bon endroit.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l5-ia1",
          title: "Calculer des taux de passage",
          objective: "Quantifier un tunnel et localiser la fuite.",
          instructions: [
            "Jeu de données pédagogique fictif : 2000 visites → 800 vues produit → 600 paniers → 120 achats. Calculez le taux de passage panier→achat et désignez la fuite principale.",
          ],
          answerKey: ["Panier→achat = 120/600 × 100 = 20 % ; fuite principale : panier→achat (chute la plus forte)."],
          feedback: "On calcule chaque taux de passage et on repère la plus forte chute.",
          successCriterion: "Taux 20 % et fuite panier→achat identifiés.",
        },
      ],
      exercise: {
        title: "Analyse de tunnel du projet",
        prompt: [
          "Décomposez le tunnel de votre projet (4-5 étapes) avec des chiffres simulés.",
          "Calculez les taux de passage, identifiez la fuite et proposez la correction prioritaire.",
        ],
        deliverables: ["Une analyse de tunnel (taux de passage, fuite, correction prioritaire) — données simulées."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les taux de passage sont calculés correctement.",
        "La fuite principale est identifiée.",
        "La correction est priorisée par impact.",
      ],
      resources: ["Feuille d'analyse de tunnel (ressource interne)"],
      glossary: [{ term: "Priorisation par impact", definition: "Choix de la correction rapportant le plus (volume × fuite)." }],
      summary:
        "L'analyse de tunnel décompose le parcours, calcule les taux de passage, localise la fuite principale et priorise la correction à plus fort impact — on distingue problème de volume et de conversion.",
      selfAssessment: [
        "Sais-je calculer les taux de passage de mon tunnel ?",
        "Ai-je distingué problème de volume et de conversion ?",
      ],
      quiz: { id: "mkt-v2-m6-l5-qz", questionIds: ["mkt-v2-m6-q06", "mkt-v2-m6-q07"], passThreshold: 70 },
      keyTakeaways: [
        "On décompose le tunnel en étapes mesurables.",
        "La fuite principale = plus forte chute de taux de passage.",
        "Volume et conversion appellent des remèdes différents.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la segmentation (leçon 17.2)." },
        { condition: "score < 70", message: "Revoyez le calcul des taux de passage et la priorisation." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 17.2.",
    },
    {
      id: "mkt-v2-m6-l6",
      module: 6,
      week: 17,
      title: "Segmentation des audiences et analyse de cohortes",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une moyenne cache souvent des réalités opposées. La segmentation et l'analyse de cohortes révèlent quels groupes se comportent différemment dans le temps. Cette leçon présente les deux et leurs usages.",
      objectives: [
        "Segmenter une audience selon des critères analytiques pertinents",
        "Comprendre l'analyse de cohortes (groupes suivis dans le temps)",
        "Interpréter la rétention par cohorte",
        "Éviter le piège de la moyenne globale",
      ],
      competencies: ["C17"],
      prerequisites: ["Leçon 17.1 ; segmentation (M2)"],
      formulas: [
        { name: "Rétention de cohorte (période N)", expression: "clients actifs de la cohorte en période N / taille initiale × 100", example: "(60 / 200) × 100 = 30 % au mois 3 — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "Segmenter pour comprendre",
          body: [
            "La segmentation analytique découpe l'audience (source de trafic, appareil, nouveau vs récurrent, géographie, comportement) pour comparer les performances. Un taux de conversion global de 2 % peut cacher 5 % sur un canal et 0,5 % sur un autre. Segmenter révèle où agir précisément.",
          ],
        },
        {
          heading: "L'analyse de cohortes",
          body: [
            "Une cohorte est un groupe partageant un point de départ commun (ex. les clients acquis en janvier). L'analyse de cohortes suit ce groupe dans le temps pour observer un comportement (rétention, réachat). Elle répond à des questions que la moyenne globale masque : « les clients acquis ce mois reviennent-ils plus que ceux du mois dernier ? ».",
          ],
        },
        {
          heading: "Lire la rétention par cohorte",
          body: [
            "Un tableau de cohortes montre, pour chaque cohorte, la part encore active à chaque période. Une rétention qui s'effondre après le premier mois signale un problème d'onboarding ou d'attente déçue ; une rétention stable indique une valeur durable. On compare les cohortes pour voir si les améliorations portent leurs fruits.",
          ],
        },
        {
          heading: "Le piège de la moyenne",
          body: [
            "La moyenne globale peut masquer des tendances opposées (paradoxe de Simpson). Un chiffre global stable peut cacher un segment qui s'effondre et un autre qui progresse. On segmente avant de conclure : une décision fondée sur la seule moyenne peut être exactement à l'envers de ce qu'il faut faire.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Cohorte", definition: "Groupe partageant un point de départ commun, suivi dans le temps." },
        { term: "Segment analytique", definition: "Sous-groupe d'audience comparé sur ses performances." },
        { term: "Rétention par cohorte", definition: "Part d'une cohorte encore active à chaque période." },
      ],
      examples: [
        "Segment : conversion 5 % sur un canal, 0,5 % sur un autre → agir sur le second.",
        "Cohorte de janvier : 30 % encore actifs au mois 3 — jeu de données pédagogique fictif.",
      ],
      commonError: {
        title: "Décider sur la moyenne globale",
        body:
          "Une moyenne peut cacher des segments opposés. On segmente avant de conclure, sous peine de prendre une décision inverse au besoin réel.",
      },
      vigilancePoint: {
        title: "Segments suffisamment grands",
        body:
          "Un segment minuscule donne des chiffres instables. On vérifie que chaque segment a un volume suffisant avant d'en tirer des conclusions.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — OutiPro (B2B, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "Le logiciel fictif OutiPro voyait une rétention globale « stable » et se rassurait. Une analyse de cohortes a révélé que les nouvelles cohortes s'effondraient, compensées par d'anciennes fidèles.",
          "En segmentant et en analysant les cohortes, OutiPro a découvert un problème d'onboarding sur les nouveaux clients, l'a corrigé, et a redressé la rétention des cohortes récentes. La moyenne cachait le vrai problème ; les cohortes l'ont révélé.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l6-ia1",
          title: "Interpréter une analyse de cohortes",
          objective: "Lire une rétention par cohorte.",
          instructions: [
            "Jeu de données pédagogique fictif : cohorte de 200 clients, 60 encore actifs au mois 3. Calculez la rétention au mois 3 et dites ce qu'elle suggère si le mois 1 était à 80 %.",
          ],
          answerKey: [
            "Rétention mois 3 = 60/200 × 100 = 30 %. La forte chute depuis 80 % (mois 1) suggère un problème d'onboarding/valeur perçue après le premier mois.",
          ],
          feedback: "On lit la rétention période par période et on interprète la tendance.",
          successCriterion: "30 % calculé + interprétation de la chute.",
        },
      ],
      exercise: {
        title: "Segments et cohortes du projet",
        prompt: [
          "Définissez 3 segments analytiques pertinents pour votre projet.",
          "Esquissez une analyse de cohortes (rétention sur 3 périodes, données simulées) et une hypothèse d'action.",
        ],
        deliverables: ["3 segments + une esquisse d'analyse de cohortes (données simulées) + une hypothèse d'action."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Les segments sont pertinents et suffisamment grands.",
        "La rétention par cohorte est correctement interprétée.",
        "Le piège de la moyenne est évité.",
      ],
      resources: ["Gabarit d'analyse de cohortes (ressource interne)"],
      glossary: [{ term: "Paradoxe de Simpson", definition: "Situation où une tendance globale s'inverse une fois les données segmentées." }],
      summary:
        "Segmenter et analyser les cohortes révèle ce que la moyenne globale masque : quels groupes convertissent, retiennent ou s'effondrent — on segmente avant de conclure.",
      selfAssessment: [
        "Ai-je segmenté avant de conclure ?",
        "Sais-je lire une rétention par cohorte ?",
      ],
      quiz: { id: "mkt-v2-m6-l6-qz", questionIds: ["mkt-v2-m6-q08", "mkt-v2-m6-q09"], passThreshold: 70 },
      keyTakeaways: [
        "La moyenne globale cache des segments opposés.",
        "Une cohorte suit un groupe dans le temps (rétention).",
        "On vérifie la taille des segments avant de conclure.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour l'attribution (leçon 17.3)." },
        { condition: "score < 70", message: "Revoyez la segmentation et la lecture des cohortes." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 17.3.",
    },
    {
      id: "mkt-v2-m6-l7",
      module: 6,
      week: 17,
      title: "Attribution marketing et limites des modèles",
      authored: true,
      durationMinutes: 90,
      introduction:
        "L'attribution répond à « qu'est-ce qui a provoqué la conversion ? ». Aucune méthode n'est parfaite. Cette leçon présente les modèles d'attribution et surtout leurs limites, pour interpréter sans se tromper.",
      objectives: [
        "Comprendre les principaux modèles d'attribution",
        "Identifier les limites (fenêtre, navigateurs, données déclaratives)",
        "Interpréter l'attribution comme une indication, pas une vérité",
        "Combiner attribution et jugement pour décider",
      ],
      competencies: ["C17"],
      prerequisites: ["UTM/attribution (M4) ; leçon 17.1"],
      sections: [
        {
          heading: "Les modèles d'attribution",
          body: [
            "Premier clic (tout le mérite au premier contact, utile pour la découverte), dernier clic (au déclencheur final, simple mais réducteur), linéaire (réparti également), en U ou selon la position (plus de poids au premier et au dernier), et attribution assistée (chaque contact reçoit une part). Chaque modèle raconte une histoire différente du même parcours.",
          ],
        },
        {
          heading: "Les limites",
          body: [
            "Aucune attribution n'est exacte : la fenêtre de conversion (délai retenu) inclut ou exclut des contacts ; les restrictions des navigateurs et le blocage des traceurs créent des angles morts ; les parcours multi-appareils et hors ligne échappent à la mesure ; les données déclaratives (« comment nous avez-vous connus ? ») sont approximatives. L'attribution est une estimation, pas une comptabilité exacte.",
          ],
        },
        {
          heading: "Interpréter avec prudence",
          body: [
            "On ne prend pas une décision majeure sur un seul modèle d'attribution. Comparer plusieurs modèles révèle la sensibilité des conclusions. Un canal « invisible » en dernier clic peut être crucial en premier clic (découverte). On combine l'attribution avec le bon sens et d'autres signaux.",
          ],
        },
        {
          heading: "Attribution et décision",
          body: [
            "L'attribution guide l'allocation du budget, mais elle éclaire sans dicter. On l'utilise pour formuler des hypothèses (« ce canal semble sous-valorisé »), qu'on vérifie ensuite par l'expérimentation (tests). L'attribution informe la décision ; l'expérimentation la confirme.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Attribution", definition: "Association d'une conversion aux points de contact qui l'ont provoquée." },
        { term: "Fenêtre de conversion", definition: "Délai pendant lequel une conversion est rattachée à un contact." },
        { term: "Attribution assistée", definition: "Répartition du mérite entre plusieurs points de contact." },
      ],
      examples: [
        "Un canal de découverte paraît nul en dernier clic mais essentiel en premier clic.",
        "Fenêtre de 7 vs 30 jours : le même canal semble plus ou moins performant.",
      ],
      commonError: {
        title: "Croire un seul modèle d'attribution",
        body:
          "Décider sur le seul dernier clic sous-valorise la découverte et peut couper un canal pourtant crucial. On compare plusieurs modèles avant de conclure.",
      },
      vigilancePoint: {
        title: "Attribution ≠ vérité exacte",
        body:
          "On présente l'attribution comme une estimation avec des limites, jamais comme une comptabilité exacte. Aucune décision majeure sur un seul modèle.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — TrajectO (tourisme, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "L'agence fictive TrajectO allait couper son canal de découverte (invisible en dernier clic) pour concentrer le budget sur le canal de conversion finale.",
          "En comparant plusieurs modèles d'attribution et en testant, TrajectO a constaté que le canal de découverte alimentait tout le tunnel : le couper aurait tari les conversions. L'analyse multi-modèles et l'expérimentation ont évité une erreur coûteuse.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l7-ia1",
          title: "Associer modèle d'attribution et usage",
          objective: "Relier un modèle à ce qu'il met en valeur.",
          instructions: [
            "Associez : (1) valoriser la découverte ; (2) valoriser le déclencheur final ; (3) répartir le mérite sur tout le parcours.",
            "Modèles : premier clic · dernier clic · assistée/linéaire.",
          ],
          answerKey: ["1 → premier clic ; 2 → dernier clic ; 3 → assistée/linéaire."],
          feedback: "Chaque modèle éclaire une facette du parcours ; aucun n'est complet.",
          successCriterion: "Les 3 associations correctes.",
        },
      ],
      exercise: {
        title: "Analyse d'attribution du projet",
        prompt: [
          "Pour votre projet, décrivez comment premier clic et dernier clic valoriseraient différemment vos canaux (données simulées).",
          "Formulez une hypothèse à vérifier par un test.",
        ],
        deliverables: ["Une comparaison d'attribution (2 modèles) + une hypothèse testable — données simulées."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les limites de l'attribution sont explicitées.",
        "Plusieurs modèles sont comparés.",
        "Une hypothèse à tester est formulée.",
      ],
      resources: ["Notes de cours — modèles d'attribution (ressource interne)"],
      glossary: [{ term: "Multi-appareils", definition: "Parcours d'un utilisateur réparti sur plusieurs appareils, difficile à attribuer." }],
      summary:
        "L'attribution associe conversions et contacts selon divers modèles, tous imparfaits (fenêtre, navigateurs, multi-appareils) ; on la compare, on l'interprète avec prudence et on la confirme par l'expérimentation.",
      selfAssessment: [
        "Ai-je conscience des limites de l'attribution ?",
        "Est-ce que je compare plusieurs modèles avant de décider ?",
      ],
      quiz: { id: "mkt-v2-m6-l7-qz", questionIds: ["mkt-v2-m6-q10", "mkt-v2-m6-q06"], passThreshold: 70 },
      keyTakeaways: [
        "Chaque modèle d'attribution raconte une histoire partielle.",
        "L'attribution est une estimation, pas une vérité exacte.",
        "On confirme par l'expérimentation.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour les tests A/B et l'expérimentation (leçon 17.4)." },
        { condition: "score < 70", message: "Revoyez les modèles d'attribution et leurs limites." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 17.4.",
    },
    {
      id: "mkt-v2-m6-l8",
      module: 6,
      week: 17,
      title: "Tests A/B et expérimentation",
      authored: true,
      durationMinutes: 90,
      introduction:
        "L'expérimentation remplace les opinions par des preuves. Cette leçon approfondit la méthode d'un test A/B fiable, la notion de significativité et les pièges (faux gagnants, tests multiples).",
      objectives: [
        "Formuler une hypothèse de test claire",
        "Concevoir un test à variable unique avec groupe témoin",
        "Comprendre taille d'échantillon, durée et significativité",
        "Éviter faux gagnants, arrêt prématuré et tests multiples abusifs",
      ],
      competencies: ["C17"],
      prerequisites: ["Test A/B (M4) ; leçon 17.1"],
      sections: [
        {
          heading: "L'hypothèse et la variable unique",
          body: [
            "Un test part d'une hypothèse claire (« ce titre augmentera le taux de conversion ») et ne modifie qu'UNE variable, pour attribuer sans ambiguïté l'effet observé. On compare la version A (témoin) et la version B, sur des visiteurs répartis aléatoirement et simultanément.",
          ],
        },
        {
          heading: "Taille d'échantillon et durée",
          body: [
            "Un test a besoin d'assez de données (taille d'échantillon) et de temps (durée) pour que le résultat soit fiable. Trop peu de visiteurs → hasard ; trop court → biais de jour/semaine. On estime à l'avance l'échantillon nécessaire et on attend qu'il soit atteint avant de conclure.",
          ],
        },
        {
          heading: "Significativité et prudence",
          body: [
            "La significativité statistique estime la probabilité que la différence observée ne soit pas due au hasard. Un écart non significatif ne prouve rien. On se méfie des faux gagnants (une version paraît gagnante par chance) et de l'arrêt prématuré (arrêter dès qu'un résultat plaît fausse la conclusion).",
          ],
        },
        {
          heading: "Tests multiples et éthique",
          body: [
            "Tester beaucoup de variantes en même temps multiplie les chances d'un faux positif ; on en tient compte. On documente chaque test (hypothèse, résultat, décision) pour apprendre. Enfin, on n'expérimente jamais de façon trompeuse ou au détriment de l'utilisateur (prix cachés, dark patterns) : l'expérimentation reste honnête.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Groupe témoin", definition: "Version de référence (A) à laquelle on compare la variante (B)." },
        { term: "Significativité statistique", definition: "Probabilité que l'écart observé ne soit pas dû au hasard." },
        { term: "Arrêt prématuré", definition: "Conclure un test avant d'avoir assez de données, ce qui fausse le résultat." },
      ],
      examples: [
        "Hypothèse : « le titre B augmentera la conversion » ; on ne change QUE le titre.",
        "Arrêter un test après 30 visites parce que B « gagne » : faux gagnant probable.",
      ],
      commonError: {
        title: "Arrêter le test dès qu'il plaît",
        body:
          "Stopper un test au premier résultat favorable, avant d'atteindre l'échantillon prévu, fabrique de faux gagnants. On fixe la taille et la durée à l'avance.",
      },
      vigilancePoint: {
        title: "Expérimentation honnête",
        body:
          "On ne teste jamais des procédés trompeurs (fausse urgence, prix cachés) et on respecte l'utilisateur. Un test ne justifie pas un dark pattern.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (détail, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "La boutique fictive Boréalille changeait titre, image et bouton en même temps, puis attribuait la hausse au « nouveau design », et arrêtait ses tests dès qu'un résultat plaisait.",
          "En isolant une variable, en fixant à l'avance échantillon et durée, et en attendant la significativité, Boréalille a obtenu des résultats fiables et reproductibles. La rigueur expérimentale a remplacé les fausses certitudes.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l8-ia1",
          title: "Concevoir un test A/B correct",
          objective: "Corriger un protocole de test défaillant.",
          instructions: [
            "Un test change titre + image + prix, sur 40 visiteurs, arrêté au bout d'un jour. Citez 3 corrections.",
          ],
          answerKey: [
            "1) Ne changer qu'une variable ; 2) atteindre une taille d'échantillon suffisante ; 3) laisser tourner assez longtemps (durée) avant de conclure.",
          ],
          feedback: "Une variable, échantillon et durée suffisants, pas d'arrêt prématuré.",
          successCriterion: "Les 3 corrections proposées.",
        },
      ],
      exercise: {
        title: "Protocole de test A/B",
        prompt: [
          "Rédigez un protocole de test A/B pour améliorer un indicateur de votre projet : hypothèse, variable unique, métrique, échantillon/durée, conditions d'interprétation.",
        ],
        deliverables: ["Un protocole de test A/B complet (hypothèse, variable, métrique, échantillon, interprétation)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Une seule variable est testée.",
        "Échantillon et durée sont fixés à l'avance.",
        "L'interprétation évite faux gagnants et arrêt prématuré.",
      ],
      resources: ["Gabarit de protocole d'expérimentation (ressource interne)"],
      glossary: [{ term: "Faux gagnant", definition: "Variante paraissant gagnante par hasard, faute de données suffisantes." }],
      summary:
        "Un test fiable isole une variable, utilise un groupe témoin, atteint une taille et une durée suffisantes, et s'interprète avec prudence (significativité) — l'expérimentation reste honnête.",
      selfAssessment: [
        "Mon test isole-t-il une seule variable ?",
        "Ai-je fixé échantillon et durée à l'avance ?",
      ],
      quiz: { id: "mkt-v2-m6-l8-qz", questionIds: ["mkt-v2-m6-q11", "mkt-v2-m6-q07"], passThreshold: 70 },
      keyTakeaways: [
        "Une variable, un groupe témoin, un échantillon suffisant.",
        "La significativité protège des faux gagnants.",
        "L'expérimentation reste honnête, jamais trompeuse.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 17 maîtrisée. Passez à l'automatisation (semaine 18)." },
        { condition: "score < 70", message: "Revoyez la conception d'un test fiable et la significativité." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 17 + le quiz hebdomadaire avant la semaine 18.",
    },

    // ══════════ SEMAINE 18 — AUTOMATISATION, OPTIMISATION ET GOUVERNANCE ══════════
    {
      id: "mkt-v2-m6-l9",
      module: 6,
      week: 18,
      title: "Automatisation marketing et scénarios",
      authored: true,
      durationMinutes: 90,
      introduction:
        "L'automatisation exécute des actions marketing sur déclencheurs, à grande échelle. Cette leçon présente les scénarios courants et les principes d'une automatisation responsable, sous supervision humaine.",
      objectives: [
        "Définir l'automatisation marketing et ses déclencheurs",
        "Concevoir des scénarios courants (bienvenue, panier, réactivation…)",
        "Encadrer l'automatisation (supervision, escalade, réversibilité)",
        "Éviter les excès (sur-sollicitation, décisions irréversibles)",
      ],
      competencies: ["C18"],
      prerequisites: ["Semaine 17 ; fidélisation (M5)"],
      sections: [
        {
          heading: "Déclencheurs et scénarios",
          body: [
            "Une automatisation associe un déclencheur (événement : inscription, panier abandonné, inactivité) à une action (courriel, notification, tâche). Scénarios courants : email de bienvenue, relance d'abandon de panier, suivi après achat, réactivation d'un client inactif, demande d'avis, rappel d'échéance, recommandation de contenu. Chacun sert un moment précis du cycle de vie.",
          ],
        },
        {
          heading: "Segmentation comportementale et nurturing",
          body: [
            "L'automatisation s'appuie sur la segmentation comportementale (agir selon ce que fait la personne) et le lead nurturing (faire mûrir un prospect par une séquence de contenus utiles jusqu'à ce qu'il soit prêt). Bien fait, cela apporte le bon message au bon moment ; mal fait, cela devient du harcèlement.",
          ],
        },
        {
          heading: "Automatisation responsable",
          body: [
            "Toute automatisation reste sous supervision humaine : on peut la suspendre, la corriger, et une escalade humaine est prévue pour les cas complexes. On évite les décisions automatisées irréversibles (annuler une commande, bannir un client) sans validation. La réversibilité et le contrôle priment sur l'efficacité brute.",
          ],
        },
        {
          heading: "Éviter les excès",
          body: [
            "Trop de messages (sur-sollicitation), des séquences qui ne s'arrêtent pas quand le client a agi, ou une personnalisation intrusive détruisent la relation. On plafonne la fréquence, on prévoit des règles de sortie (arrêter la relance dès l'achat) et on respecte le consentement et le désabonnement. Tout ceci est enseigné en simulation, sans compte réel connecté.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Automatisation marketing", definition: "Exécution d'actions déclenchées par des événements, à grande échelle." },
        { term: "Déclencheur", definition: "Événement qui lance une automatisation (inscription, abandon, inactivité)." },
        { term: "Lead nurturing", definition: "Séquence de contenus faisant mûrir un prospect jusqu'à la décision." },
      ],
      examples: [
        "Déclencheur « panier abandonné » → séquence de 2 rappels, arrêtée dès l'achat — simulation pédagogique.",
        "Réactivation : après 90 jours d'inactivité, un message personnalisé utile — simulation pédagogique.",
      ],
      commonError: {
        title: "La séquence qui ne s'arrête jamais",
        body:
          "Continuer à relancer un client qui a déjà acheté agace et nuit. Toute automatisation doit avoir des règles de sortie et un plafond de fréquence.",
      },
      vigilancePoint: {
        title: "Supervision humaine obligatoire",
        body:
          "Aucune décision automatisée irréversible sans validation humaine ; une escalade humaine et un bouton d'arrêt sont toujours prévus. Aucune campagne réelle n'est lancée ici.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada) — Simulation pédagogique, aucune diffusion réelle",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO avait (en simulation) une relance d'abandon de panier qui continuait même après l'achat, et envoyait trop de messages.",
          "En ajoutant des règles de sortie (arrêt dès l'achat), un plafond de fréquence et une supervision humaine, InfusiO a rendu son automatisation utile et respectueuse. Automatiser avec des garde-fous a amélioré la relation plutôt que de l'abîmer.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l9-ia1",
          title: "Associer déclencheur et scénario",
          objective: "Relier un événement à l'automatisation adaptée.",
          instructions: [
            "Associez : (1) nouvelle inscription ; (2) panier laissé sans achat ; (3) client sans achat depuis 90 jours.",
            "Scénarios : email de bienvenue · relance d'abandon · réactivation.",
          ],
          answerKey: ["1 → email de bienvenue ; 2 → relance d'abandon ; 3 → réactivation."],
          feedback: "Chaque déclencheur appelle un scénario adapté au moment du cycle de vie.",
          successCriterion: "Les 3 associations correctes.",
        },
      ],
      exercise: {
        title: "Plan d'automatisation (simulé)",
        prompt: [
          "Concevez 3 scénarios d'automatisation pour votre projet (déclencheur → action → règle de sortie).",
          "Précisez le plafond de fréquence et le point de supervision humaine.",
        ],
        deliverables: ["Un plan d'automatisation simulé (3 scénarios avec déclencheurs, actions, règles de sortie, supervision)."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Chaque scénario a un déclencheur, une action et une règle de sortie.",
        "La fréquence est plafonnée et la supervision prévue.",
        "Aucune campagne réelle ; consentement respecté.",
      ],
      resources: ["Gabarit de scénarios d'automatisation (ressource interne)"],
      glossary: [{ term: "Règle de sortie", definition: "Condition qui arrête une automatisation (ex. achat réalisé)." }],
      summary:
        "L'automatisation associe déclencheurs et actions au bon moment du cycle de vie ; elle reste responsable (règles de sortie, plafond de fréquence, supervision humaine) et se conçoit ici en simulation.",
      selfAssessment: [
        "Mes automatisations ont-elles des règles de sortie ?",
        "La supervision humaine est-elle prévue ?",
      ],
      quiz: { id: "mkt-v2-m6-l9-qz", questionIds: ["mkt-v2-m6-q12", "mkt-v2-m6-q13"], passThreshold: 70 },
      keyTakeaways: [
        "Déclencheur → action, au bon moment du cycle de vie.",
        "Règles de sortie + plafond de fréquence évitent le harcèlement.",
        "Supervision humaine et réversibilité obligatoires.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour les séquences courriel et le lead scoring (leçon 18.2)." },
        { condition: "score < 70", message: "Revoyez les scénarios et les garde-fous de l'automatisation." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 18.2.",
    },
    {
      id: "mkt-v2-m6-l10",
      module: 6,
      week: 18,
      title: "Email marketing, séquences comportementales et lead scoring",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le courriel reste un canal puissant, à condition d'être pertinent et consenti. Cette leçon présente les séquences comportementales, les indicateurs d'email et le lead scoring pour qualifier les prospects.",
      objectives: [
        "Concevoir des séquences courriel comportementales",
        "Calculer et interpréter taux d'ouverture et taux de clic",
        "Mettre en place un lead scoring simple",
        "Respecter consentement et désabonnement",
      ],
      competencies: ["C18"],
      prerequisites: ["Leçon 18.1 ; email (M3)"],
      formulas: [
        { name: "Taux d'ouverture", expression: "courriels ouverts / courriels délivrés × 100", example: "(400 / 2000) × 100 = 20 % — jeu de données pédagogique fictif" },
        { name: "Taux de clic (CTR courriel)", expression: "clics / courriels délivrés × 100", example: "(60 / 2000) × 100 = 3 % — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "Séquences comportementales",
          body: [
            "Une séquence comportementale envoie des messages selon les actions du destinataire (a ouvert / cliqué / acheté ou non). Plutôt qu'un envoi de masse identique, on adapte le message suivant au comportement : c'est plus pertinent et mieux reçu. Chaque séquence a un objectif et une fin.",
          ],
        },
        {
          heading: "Mesurer l'email",
          body: [
            "Le taux d'ouverture (ouvertures/délivrés) et le taux de clic (clics/délivrés) mesurent l'engagement, mais l'indicateur qui compte reste le résultat (conversion, revenu). Un fort taux d'ouverture sans conversion est une vanité. On surveille aussi la délivrabilité et le taux de désabonnement (signal de sur-sollicitation ou d'inadéquation).",
          ],
        },
        {
          heading: "Lead scoring",
          body: [
            "Le lead scoring attribue des points à un prospect selon ses caractéristiques (adéquation avec la cible) et ses comportements (visites, ouvertures, clics, téléchargements). Un score élevé signale un prospect prêt à être contacté. C'est une aide à la priorisation, pas une vérité absolue : on l'ajuste et on garde le jugement humain.",
          ],
        },
        {
          heading: "Consentement et désabonnement",
          body: [
            "On n'envoie qu'à des personnes ayant consenti, avec un désabonnement simple et respecté à tout moment. Acheter des listes ou envoyer sans consentement est contraire à l'éthique et généralement à la loi. Le respect du consentement protège la réputation et la délivrabilité.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Séquence comportementale", definition: "Suite de courriels adaptée aux actions du destinataire." },
        { term: "Taux d'ouverture", definition: "Ouvertures divisées par courriels délivrés." },
        { term: "Lead scoring", definition: "Attribution de points à un prospect selon adéquation et comportement." },
      ],
      examples: [
        "Séquence : bienvenue → si clic, contenu approfondi ; si inactif, message de réengagement.",
        "Lead scoring : +10 si cible idéale, +5 par téléchargement ; à partir de 30, contacter — jeu de données pédagogique fictif.",
      ],
      commonError: {
        title: "Envoyer sans consentement",
        body:
          "Acheter une liste ou envoyer sans consentement nuit à la réputation, à la délivrabilité et enfreint souvent la loi. On ne contacte que des personnes ayant consenti.",
      },
      vigilancePoint: {
        title: "Désabonnement respecté",
        body:
          "Le désabonnement doit être simple, visible et immédiat. Continuer à écrire après un désabonnement est interdit. Le taux de désabonnement est un signal à surveiller.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Racine & Sol (organisme, Québec) — Simulation pédagogique, aucune diffusion réelle",
        region: "québécoise",
        isFictional: true,
        body: [
          "L'organisme fictif Racine & Sol envoyait le même courriel de masse à tous et se réjouissait d'un taux d'ouverture élevé sans conversions.",
          "En passant à des séquences comportementales, en mesurant la conversion (pas seulement l'ouverture) et en mettant en place un lead scoring simple avec consentement respecté, Racine & Sol a amélioré ses résultats simulés. La pertinence et le respect ont battu l'envoi de masse.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l10-ia1",
          title: "Calculer taux d'ouverture et de clic",
          objective: "Appliquer les formules d'email marketing.",
          instructions: [
            "Jeu de données pédagogique fictif : 2000 courriels délivrés, 500 ouvertures, 80 clics. Calculez le taux d'ouverture et le taux de clic.",
          ],
          answerKey: ["Ouverture = 500/2000 × 100 = 25 % ; clic = 80/2000 × 100 = 4 %."],
          feedback: "Ouverture = ouvertures/délivrés ; clic = clics/délivrés.",
          successCriterion: "25 % et 4 % trouvés.",
        },
        {
          id: "mkt-v2-m6-l10-ia2",
          title: "Construire un lead scoring simple",
          objective: "Attribuer des points selon adéquation et comportement.",
          instructions: [
            "Proposez un barème simple : combien de points pour (a) correspondre au persona cible ; (b) ouvrir un courriel ; (c) télécharger un guide ? À partir de quel seuil contacter ?",
          ],
          answerKey: [
            "Exemple : (a) +10 (adéquation), (b) +2 (ouverture), (c) +5 (téléchargement) ; contacter à partir de 20 — barème indicatif à ajuster.",
          ],
          feedback: "On pondère plus l'adéquation et les actions à forte intention ; le seuil s'ajuste.",
          successCriterion: "Barème cohérent + seuil de contact proposés.",
        },
      ],
      exercise: {
        title: "Séquence courriel + lead scoring",
        prompt: [
          "Concevez une séquence comportementale de 3 courriels pour votre projet (avec règles selon ouverture/clic).",
          "Définissez un lead scoring simple et le seuil de contact (données simulées).",
        ],
        deliverables: ["Une séquence de 3 courriels comportementale + un barème de lead scoring (données simulées)."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "La séquence s'adapte au comportement.",
        "Les taux d'email sont calculés correctement.",
        "Consentement et désabonnement sont respectés.",
      ],
      resources: ["Gabarit de séquence + barème de lead scoring (ressource interne)"],
      glossary: [{ term: "Délivrabilité", definition: "Capacité d'un courriel à arriver en boîte de réception plutôt qu'en indésirable." }],
      summary:
        "Les séquences comportementales et le lead scoring apportent le bon message au bon prospect au bon moment ; on mesure au-delà de l'ouverture (conversion) et on respecte strictement consentement et désabonnement.",
      selfAssessment: [
        "Ma séquence s'adapte-t-elle au comportement ?",
        "Mon envoi respecte-t-il consentement et désabonnement ?",
      ],
      quiz: { id: "mkt-v2-m6-l10-qz", questionIds: ["mkt-v2-m6-q14", "mkt-v2-m6-q15"], passThreshold: 70 },
      keyTakeaways: [
        "Séquences comportementales > envoi de masse identique.",
        "On mesure la conversion, pas seulement l'ouverture.",
        "Consentement et désabonnement sont non négociables.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour l'optimisation continue et la décision (leçon 18.3)." },
        { condition: "score < 70", message: "Revoyez les séquences comportementales et le lead scoring." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 18.3.",
    },
    {
      id: "mkt-v2-m6-l11",
      module: 6,
      week: 18,
      title: "Optimisation continue et décision fondée sur les données",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Optimiser n'est pas un projet ponctuel mais une discipline continue. Cette leçon installe la boucle d'amélioration et les principes d'une décision fondée sur des données fiables, sans survaloriser un indicateur isolé.",
      objectives: [
        "Installer une boucle mesurer → analyser → décider → tester",
        "Prioriser les optimisations par impact et faisabilité",
        "Décider sur un faisceau d'indicateurs, pas un seul",
        "Documenter décisions et apprentissages",
      ],
      competencies: ["C19"],
      prerequisites: ["Leçons 17.x et 18.1-18.2"],
      sections: [
        {
          heading: "La boucle d'optimisation",
          body: [
            "L'optimisation continue suit un cycle : mesurer (indicateurs), analyser (tunnels, segments, cohortes), décider (hypothèse d'amélioration), tester (expérimentation), puis mesurer à nouveau. Ce cycle ne s'arrête jamais : une activité numérique se pilote dans la durée, pas une fois pour toutes.",
          ],
        },
        {
          heading: "Prioriser",
          body: [
            "On ne peut pas tout optimiser à la fois. On priorise selon l'impact potentiel (étape à fort volume et forte fuite) et la faisabilité (effort, risque). Une matrice impact/effort aide à choisir : on commence par les gains rapides à fort impact, on planifie les chantiers lourds.",
          ],
        },
        {
          heading: "Décider sur un faisceau",
          body: [
            "Une décision solide s'appuie sur plusieurs signaux convergents (indicateurs, segments, test), pas sur un chiffre isolé. Un seul indicateur peut tromper (une hausse de conversion avec une chute de marge n'est pas un progrès). On regarde l'ensemble et on garde le jugement : les données éclairent, l'humain décide.",
          ],
        },
        {
          heading: "Documenter et apprendre",
          body: [
            "Chaque décision et chaque test sont documentés (hypothèse, résultat, décision, apprentissage). Cette mémoire évite de refaire les mêmes erreurs et fait progresser l'équipe. L'optimisation continue est autant une culture (apprendre) qu'une méthode.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Boucle d'optimisation", definition: "Cycle mesurer → analyser → décider → tester → mesurer." },
        { term: "Matrice impact/effort", definition: "Outil de priorisation croisant l'impact attendu et l'effort requis." },
        { term: "Décision fondée sur les données", definition: "Choix appuyé sur un faisceau de signaux fiables, arbitré par le jugement." },
      ],
      examples: [
        "Gain rapide à fort impact : simplifier un checkout à 14 champs responsable de 75 % d'abandon.",
        "Faisceau : conversion en hausse + marge stable + satisfaction stable = vrai progrès.",
      ],
      commonError: {
        title: "Optimiser un indicateur au détriment des autres",
        body:
          "Augmenter la conversion en cassant la marge ou la satisfaction n'est pas un progrès. On décide sur un faisceau d'indicateurs, pas un seul.",
      },
      vigilancePoint: {
        title: "Aucun indicateur isolé ne garantit le succès",
        body:
          "Un bon chiffre unique (ex. taux d'ouverture élevé) ne garantit aucun résultat commercial. On juge sur l'ensemble et sur des données fiables.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Café Nord-Berge (torréfacteur, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le café fictif Nord-Berge avait boosté sa conversion par de gros rabais… tout en devenant déficitaire (marge écrasée). L'indicateur « conversion » montait, le bénéfice chutait.",
          "En décidant sur un faisceau (conversion + marge + satisfaction) et en priorisant par impact/effort, Nord-Berge a retrouvé un équilibre rentable. Optimiser l'ensemble, pas un seul chiffre, a rétabli la performance réelle.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l11-ia1",
          title: "Prioriser des optimisations",
          objective: "Classer des chantiers par impact/effort.",
          instructions: [
            "Classez par priorité : (a) simplifier un checkout responsable de 75 % d'abandon (effort moyen) ; (b) changer une couleur de bouton (effort faible, impact faible) ; (c) refondre tout le site (effort très élevé).",
          ],
          answerKey: ["Priorité : (a) d'abord (fort impact, effort raisonnable), puis (b) si utile, (c) planifié plus tard (chantier lourd)."],
          feedback: "On commence par le fort impact réalisable, on planifie les chantiers lourds.",
          successCriterion: "(a) priorisé en premier, justifié par l'impact/effort.",
        },
      ],
      exercise: {
        title: "Boucle et priorisation d'optimisation",
        prompt: [
          "Décrivez la boucle d'optimisation de votre projet et 3 chantiers priorisés (matrice impact/effort).",
          "Pour le chantier prioritaire, précisez le faisceau d'indicateurs à surveiller.",
        ],
        deliverables: ["Une boucle d'optimisation + 3 chantiers priorisés + le faisceau d'indicateurs du chantier prioritaire."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La boucle d'optimisation est décrite.",
        "Les chantiers sont priorisés par impact/effort.",
        "La décision s'appuie sur un faisceau d'indicateurs.",
      ],
      resources: ["Matrice impact/effort (ressource interne)"],
      glossary: [{ term: "Gain rapide", definition: "Amélioration à fort impact et faible effort, à réaliser en priorité." }],
      summary:
        "L'optimisation continue est une boucle mesurer → analyser → décider → tester, priorisée par impact/effort ; on décide sur un faisceau d'indicateurs fiables et on documente les apprentissages.",
      selfAssessment: [
        "Ma décision s'appuie-t-elle sur plusieurs signaux ?",
        "Ai-je priorisé par impact et effort ?",
      ],
      quiz: { id: "mkt-v2-m6-l11-qz", questionIds: ["mkt-v2-m6-q16", "mkt-v2-m6-q17"], passThreshold: 70 },
      keyTakeaways: [
        "L'optimisation est une boucle continue.",
        "On priorise par impact et effort.",
        "On décide sur un faisceau, jamais sur un indicateur isolé.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la gouvernance et la confidentialité des données (leçon 18.4)." },
        { condition: "score < 70", message: "Revoyez la boucle d'optimisation et la décision multi-indicateurs." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 18.4.",
    },
    {
      id: "mkt-v2-m6-l12",
      module: 6,
      week: 18,
      title: "Qualité, gouvernance et confidentialité des données",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Des données fiables et bien gouvernées sont la condition d'une analytique digne de confiance. Cette leçon présente la qualité, la gouvernance, le consentement et l'utilisation responsable des données.",
      objectives: [
        "Assurer la qualité des données (exactitude, cohérence, complétude)",
        "Mettre en place une gouvernance (rôles, définitions, accès)",
        "Appliquer consentement, minimisation et finalité",
        "Reconnaître les limites des outils et les erreurs d'interprétation",
      ],
      competencies: ["C19"],
      prerequisites: ["Leçons 16.3 et 18.1-18.3"],
      sections: [
        {
          heading: "Qualité des données",
          body: [
            "Des données de qualité sont exactes (mesurent ce qu'elles prétendent), cohérentes (mêmes définitions partout), complètes (peu de manquants) et à jour. On met en place des contrôles (validation, détection d'anomalies, déduplication). « Garbage in, garbage out » : une analytique brillante sur des données douteuses produit des décisions douteuses.",
          ],
        },
        {
          heading: "Gouvernance des données",
          body: [
            "La gouvernance définit qui est responsable de quelles données, avec quelles définitions (dictionnaire d'indicateurs), quels accès (rôles/permissions) et quelles durées de conservation. Elle évite les silos, les définitions contradictoires et les accès non maîtrisés. C'est le cadre qui rend l'analytique fiable et sûre dans la durée.",
          ],
        },
        {
          heading: "Consentement, minimisation, finalité",
          body: [
            "On ne collecte des données qu'avec consentement (pour ce qui l'exige), en se limitant au nécessaire (minimisation), pour une finalité claire, et pour une durée justifiée. La protection des renseignements personnels est une exigence éthique et légale. Ce module ne donne aucun avis juridique personnalisé : il présente des principes à faire valider professionnellement selon le contexte.",
          ],
        },
        {
          heading: "Limites des outils et erreurs d'interprétation",
          body: [
            "Les outils d'analytique ont des limites (échantillonnage, blocage de traceurs, écarts entre plateformes) et ne s'accordent pas toujours entre eux. Les erreurs d'interprétation courantes : confondre corrélation et causalité, généraliser à partir d'un petit échantillon, ignorer la saisonnalité. Une analyste responsable connaît ces limites et reste humble face aux chiffres.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Gouvernance des données", definition: "Cadre de responsabilités, définitions, accès et conservation des données." },
        { term: "Corrélation vs causalité", definition: "Deux variables liées ne s'expliquent pas forcément l'une l'autre." },
        { term: "Minimisation", definition: "Ne collecter que les données strictement nécessaires." },
      ],
      examples: [
        "Deux outils affichent des conversions différentes : normal (fenêtres et méthodes distinctes), on documente l'écart.",
        "Corrélation trompeuse : les ventes de glaces et les coups de soleil montent ensemble (cause commune : l'été).",
      ],
      commonError: {
        title: "Confondre corrélation et causalité",
        body:
          "Deux courbes qui montent ensemble ne prouvent pas un lien de cause à effet. On cherche la cause réelle (parfois commune) et on confirme par l'expérimentation.",
      },
      vigilancePoint: {
        title: "Protection des renseignements personnels",
        body:
          "Consentement, minimisation, finalité et durée de conservation encadrent toute collecte. Aucun avis juridique personnalisé ici ; on fait valider les politiques selon le contexte. Aucune donnée réelle n'est utilisée dans le module.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréal Tech (technologie, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "L'entreprise fictive Boréal Tech tirait des conclusions de données incohérentes (définitions contradictoires entre équipes) et confondait corrélation et causalité.",
          "En instaurant une gouvernance (dictionnaire d'indicateurs, responsables, accès), en fiabilisant la qualité des données et en distinguant corrélation et causalité, Boréal Tech a rendu son analytique digne de confiance. Une bonne gouvernance a transformé des chiffres douteux en décisions solides.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m6-l12-ia1",
          title: "Distinguer corrélation et causalité",
          objective: "Repérer un raisonnement causal abusif.",
          instructions: [
            "« Les mois où l'on envoie plus de courriels, les ventes montent : donc les courriels causent les ventes. » Ce raisonnement est-il solide ? Pourquoi ?",
          ],
          answerKey: [
            "Non : corrélation n'est pas causalité. Une cause commune (saisonnalité, promotions simultanées) peut expliquer les deux ; il faut isoler l'effet par un test.",
          ],
          feedback: "On se méfie des liens de cause à effet non prouvés ; on confirme par l'expérimentation.",
          successCriterion: "Raisonnement jugé non solide + mention corrélation ≠ causalité.",
        },
      ],
      exercise: {
        title: "Section gouvernance du projet intégrateur",
        prompt: [
          "Rédigez les règles de gouvernance des données de votre projet : responsables, définitions clés, accès, consentement, minimisation, conservation.",
          "Ajoutez 2 limites d'interprétation à garder en tête.",
        ],
        deliverables: ["Une section « Gouvernance des données » (responsables, définitions, accès, consentement, minimisation, conservation, limites)."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "La qualité et la gouvernance sont adressées (responsables, définitions, accès).",
        "Consentement, minimisation et finalité sont intégrés.",
        "Des limites d'interprétation sont reconnues.",
      ],
      resources: ["Gabarit de gouvernance des données (ressource interne)"],
      glossary: [{ term: "Durée de conservation", definition: "Période justifiée pendant laquelle une donnée est conservée." }],
      summary:
        "Une analytique fiable repose sur la qualité des données, une gouvernance claire (responsables, définitions, accès), le respect du consentement et de la minimisation, et la conscience des limites et des pièges d'interprétation.",
      selfAssessment: [
        "Mes données sont-elles gouvernées (responsables, définitions, accès) ?",
        "Est-ce que je distingue corrélation et causalité ?",
      ],
      quiz: { id: "mkt-v2-m6-l12-qz", questionIds: ["mkt-v2-m6-q18", "mkt-v2-m6-q20"], passThreshold: 70 },
      keyTakeaways: [
        "« Garbage in, garbage out » : la qualité des données conditionne tout.",
        "Gouvernance = responsables, définitions, accès, conservation.",
        "Consentement, minimisation ; corrélation ≠ causalité.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Module 6 maîtrisé. Finalisez la section analytique du projet intégrateur." },
        { condition: "score < 70", message: "Revoyez la gouvernance des données et les erreurs d'interprétation." },
      ],
      progressionRule:
        "Compléter les 4 leçons de la semaine 18, le quiz hebdomadaire, le sommatif du module (≥ 70 %) et déposer la section analytique du projet intégrateur pour valider le Module 6.",
    },
  ],

  weeklyQuizzes: [
    {
      id: "mkt-v2-m6-week16-quiz",
      // Semaine 16 : fondements, événements, plan de mesure, tableaux de bord (8 M6)
      questionIds: [
        "mkt-v2-m6-q01",
        "mkt-v2-m6-q02",
        "mkt-v2-m6-q03",
        "mkt-v2-m6-q04",
        "mkt-v2-m6-q05",
        "mkt-v2-m6-q19",
        "mkt-v2-m6-q18",
        "mkt-v2-m6-q20",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m6-week17-quiz",
      // Semaine 17 : tunnel, segments/cohortes, attribution, tests (6 M6 + 2 rappels M4)
      questionIds: [
        "mkt-v2-m6-q06",
        "mkt-v2-m6-q07",
        "mkt-v2-m6-q08",
        "mkt-v2-m6-q09",
        "mkt-v2-m6-q10",
        "mkt-v2-m6-q11",
        "mkt-v2-m4-q17",
        "mkt-v2-m4-q20",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m6-week18-quiz",
      // Semaine 18 : automatisation, email/scoring, optimisation, gouvernance (6 M6 + rappels M5)
      questionIds: [
        "mkt-v2-m6-q12",
        "mkt-v2-m6-q13",
        "mkt-v2-m6-q14",
        "mkt-v2-m6-q15",
        "mkt-v2-m6-q16",
        "mkt-v2-m6-q17",
        "mkt-v2-m5-q18",
        "mkt-v2-m5-q20",
      ],
      passThreshold: 70,
    },
  ],

  rubric: {
    id: "mkt-v2-m6-rubric",
    title: "Rubrique — Section analytique, automatisation et optimisation du projet intégrateur",
    totalPoints: 100,
    passThreshold: 60,
    criteria: [
      { label: "Plan de mesure et indicateurs prioritaires", points: 15 },
      { label: "Architecture du tableau de bord et visualisation", points: 10 },
      { label: "Analyse de tunnel de conversion", points: 10 },
      { label: "Segmentation et cohortes", points: 10 },
      { label: "Attribution et interprétation prudente", points: 10 },
      { label: "Protocole de test A/B", points: 10 },
      { label: "Plan d'automatisation responsable", points: 15 },
      { label: "Mécanisme d'optimisation continue", points: 10 },
      { label: "Gouvernance, consentement et confidentialité", points: 10 },
    ],
  },

  assessments: [
    {
      id: "mkt-v2-m6-sum",
      kind: "summative",
      title: "Sommatif Module 6 — Analytique, automatisation et optimisation (20 questions)",
      passThreshold: 70,
      weightHint: "Quiz de modules (20 %)",
    },
    {
      id: "mkt-v2-m6-tp",
      kind: "practical",
      title: "Projet Module 6 — Section analytique, automatisation et optimisation (livrable 6/7, rubrique 100 pts)",
      passThreshold: 60,
      weightHint: "Travaux pratiques (25 %)",
    },
  ],
};
