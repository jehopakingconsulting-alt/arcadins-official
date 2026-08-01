import type { ModuleV2 } from "@/lib/academic/types";

/**
 * MODULE 7 — Croissance, fidélisation, stratégie omnicanale et développement durable
 * d'une entreprise numérique (semaines 19–21).
 * Programme pilote Marketing Digital et E-commerce, version académique v2.
 *
 * Transforme l'analytique et l'optimisation (M6) en une stratégie de croissance durable, fidélisation,
 * orchestration omnicanale et pérennité. Isolé du contenu v1 ; ne modifie aucune donnée. Prépare le Module 8.
 *
 * NB architecture : ce module n'ajoute AUCUNE logique spécifique au marketing dans le moteur académique
 * (types, validation, banque, sérialiseur public restent génériques et réutilisables pour TEF/TCF/DELF, etc.).
 * Toute donnée chiffrée est un « Jeu de données pédagogique fictif ». Aucune campagne réelle, aucune donnée réelle.
 */
export const marketingDigitalV2Module7: ModuleV2 = {
  index: 7,
  title: "Croissance, fidélisation, stratégie omnicanale et développement durable",
  weeks: [19, 20, 21],
  summary:
    "Faire croître durablement : comprendre les moteurs de croissance et les boucles, faire de la rétention un levier, orchestrer une expérience omnicanale, animer une communauté, et bâtir un modèle économique responsable et résilient.",
  competencies: ["C20", "C21", "C22"],
  introduction:
    "Les Modules 1 à 6 ont bâti la marque, l'acquisition, la vente et la mesure. Le Module 7 répond à : « comment croître durablement, fidéliser et rester pérenne sans épuiser ni tromper le marché ? ». On y étudie les moteurs de croissance, les boucles, la rétention, l'omnicanal, la communauté et les fondements d'un modèle économique responsable — toujours sur données simulées et dans le respect de l'éthique.",
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
      "Analytique, cohortes, LTV et boucle d'optimisation (M6) — base des moteurs de croissance",
      "Fidélisation, réachat et service client (M5) — approfondis en croissance par la rétention",
      "Acquisition, CAC et entonnoir (M4) — combinés à la rétention pour l'économie unitaire",
      "Marque, messages et calendrier (M3) — cohérence omnicanale et communauté",
    ],
    consolidatedCompetencies: [
      "C16/C19 (fidélisation/optimisation) → intégrés dans la croissance durable (C20/C22)",
      "C11 (acquisition) → équilibré avec la rétention dans l'économie unitaire",
    ],
    newCompetencies: [
      "C20 — moteurs et boucles de croissance, rétention comme levier, expérimentation de croissance",
      "C21 — fidélisation avancée, communauté et stratégie omnicanale (CRM, cycle de vie)",
      "C22 — modèle économique durable, marketing responsable, résilience et pérennité",
    ],
    deliverablesForNextModule: [
      "Plan de croissance durable + économie unitaire → base de synthèse du Module 8",
      "Stratégie omnicanale + gouvernance responsable → cadre d'ensemble du Module 8",
    ],
  },
  lessons: [
    // ══════════ SEMAINE 19 — MOTEURS ET BOUCLES DE CROISSANCE ══════════
    {
      id: "mkt-v2-m7-l1",
      module: 7,
      week: 19,
      title: "Comprendre la croissance d'une entreprise numérique",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Croître n'est pas seulement « vendre plus » : c'est construire un système qui grandit de façon répétable. Cette leçon distingue les types de croissance et introduit l'indicateur d'étoile polaire (North Star).",
      objectives: [
        "Distinguer croissance organique, virale, payante et portée par la rétention",
        "Différencier croissance saine et croissance de vanité",
        "Définir un indicateur d'étoile polaire (North Star Metric)",
        "Relier la croissance à la valeur réellement livrée au client",
      ],
      competencies: ["C20"],
      prerequisites: ["Module 6 — analytique et LTV"],
      sections: [
        {
          heading: "Les types de croissance",
          body: [
            "La croissance organique vient du contenu, du référencement et du bouche-à-oreille ; la croissance payante de la publicité ; la croissance virale du partage entre utilisateurs ; la croissance portée par la rétention du fait que les clients restent et rachètent. Les entreprises durables combinent ces moteurs plutôt que de dépendre d'un seul — surtout pas de la seule publicité (rappel du Module 4).",
          ],
        },
        {
          heading: "Croissance saine vs vanité",
          body: [
            "Une croissance saine s'appuie sur de la valeur réellement livrée et une économie unitaire positive (on gagne à servir un client de plus). Une croissance de vanité gonfle des chiffres (inscriptions, téléchargements) sans rétention ni rentabilité : elle s'effondre dès qu'on cesse de dépenser. On juge la croissance à sa répétabilité et à sa rentabilité, pas à sa vitesse apparente.",
          ],
        },
        {
          heading: "L'indicateur d'étoile polaire",
          body: [
            "Le North Star Metric est l'indicateur unique qui capture le mieux la valeur livrée au client et prédit la croissance durable (ex. « commandes récurrentes livrées », « leçons complétées »). Il aligne toute l'équipe : chaque action vise à le faire progresser. Un bon North Star mesure la valeur reçue, pas seulement l'activité de l'entreprise.",
          ],
        },
        {
          heading: "Croissance et valeur",
          body: [
            "La croissance durable découle de la valeur : un produit qui résout vraiment un problème se recommande et se rachète. Chercher à croître sans valeur (acquisition forcée, promesses exagérées) produit une croissance creuse. On construit d'abord la valeur et la rétention, puis on amplifie.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Croissance organique", definition: "Croissance issue du contenu, du référencement et du bouche-à-oreille." },
        { term: "North Star Metric", definition: "Indicateur unique capturant la valeur livrée et prédisant la croissance durable." },
        { term: "Croissance de vanité", definition: "Hausse de chiffres sans rétention ni rentabilité, non durable." },
      ],
      examples: [
        "North Star d'une plateforme de formation : « leçons complétées par semaine » (valeur reçue), pas « inscriptions brutes ».",
        "Croissance saine : réachat élevé + économie unitaire positive — jeu de données pédagogique fictif.",
      ],
      commonError: {
        title: "Confondre vitesse et santé de la croissance",
        body:
          "Une croissance rapide portée uniquement par la publicité, sans rétention, n'est pas saine : elle s'effondre dès l'arrêt des dépenses. On mesure la répétabilité et la rentabilité.",
      },
      vigilancePoint: {
        title: "La valeur d'abord",
        body:
          "Chercher la croissance sans valeur réelle (promesses exagérées, acquisition forcée) est trompeur et non durable. Aucune promesse de croissance garantie.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada) — Jeu de données pédagogique fictif",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO se vantait d'une explosion d'inscriptions grâce à un gros budget publicitaire, mais la rétention était faible et l'activité déficitaire.",
          "En définissant un North Star (« clients recevant leur 2e commande »), en équilibrant acquisition et rétention et en visant une économie unitaire positive, InfusiO a transformé une croissance de vanité en croissance saine et répétable. Mesurer la valeur reçue a changé la trajectoire.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l1-ia1",
          title: "Choisir un North Star Metric",
          objective: "Distinguer un North Star (valeur reçue) d'une métrique de vanité.",
          instructions: [
            "Pour une plateforme de cours en ligne, choisissez le meilleur North Star : (a) nombre d'inscriptions ; (b) leçons complétées par apprenant actif ; (c) nombre d'abonnés sur les réseaux.",
          ],
          answerKey: ["(b) — il mesure la valeur réellement reçue et prédit la rétention/croissance ; (a) et (c) sont des vanités."],
          feedback: "Un bon North Star capture la valeur livrée au client.",
          successCriterion: "(b) choisi et justifié.",
        },
      ],
      exercise: {
        title: "Définir sa croissance",
        prompt: [
          "Pour votre projet, identifiez vos 2 principaux moteurs de croissance et un North Star Metric.",
          "Justifiez en quoi ce North Star reflète la valeur livrée.",
        ],
        deliverables: ["Une fiche : 2 moteurs de croissance + North Star Metric justifié."],
        estimatedMinutes: 45,
      },
      successCriteria: [
        "Les moteurs de croissance sont identifiés et diversifiés.",
        "Le North Star reflète la valeur reçue, pas l'activité brute.",
        "La distinction croissance saine/vanité est appliquée.",
      ],
      resources: ["Notes de cours ARCADINS — moteurs de croissance (ressource interne)"],
      glossary: [{ term: "Croissance portée par la rétention", definition: "Croissance issue du fait que les clients restent et rachètent." }],
      summary:
        "La croissance durable combine plusieurs moteurs, s'appuie sur la valeur réellement livrée et une économie unitaire positive, et s'aligne sur un North Star Metric — pas sur des chiffres de vanité.",
      selfAssessment: [
        "Mon North Star reflète-t-il la valeur reçue par le client ?",
        "Ma croissance est-elle répétable et rentable ?",
      ],
      quiz: { id: "mkt-v2-m7-l1-qz", questionIds: ["mkt-v2-m7-q01", "mkt-v2-m7-q02"], passThreshold: 70 },
      keyTakeaways: [
        "Plusieurs moteurs de croissance valent mieux qu'un seul.",
        "Croissance saine = valeur + économie unitaire positive.",
        "Le North Star aligne l'équipe sur la valeur livrée.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Solide. Passez aux boucles de croissance (leçon 19.2)." },
        { condition: "score < 70", message: "Revoyez les types de croissance et le North Star Metric." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 19.2.",
    },
    {
      id: "mkt-v2-m7-l2",
      module: 7,
      week: 19,
      title: "Boucles de croissance et effets de levier",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Les entreprises qui croissent durablement s'appuient sur des boucles où chaque client en amène d'autres. Cette leçon présente les boucles de croissance, la viralité et le coefficient K.",
      objectives: [
        "Distinguer entonnoir (linéaire) et boucle de croissance (cyclique)",
        "Reconnaître les boucles courantes (recommandation, contenu, effets de réseau)",
        "Comprendre la viralité et le coefficient K",
        "Éviter la viralité forcée ou trompeuse",
      ],
      competencies: ["C20"],
      prerequisites: ["Leçon 19.1 ; entonnoir (M4)"],
      formulas: [
        { name: "Coefficient viral (K)", expression: "invitations par utilisateur × taux de conversion des invitations", example: "5 × 0,2 = 1,0 (chaque utilisateur en amène 1) — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "De l'entonnoir à la boucle",
          body: [
            "Un entonnoir est linéaire : on y verse du trafic en haut, on récupère des clients en bas. Une boucle de croissance est cyclique : la sortie alimente l'entrée (un nouveau client en amène d'autres). Les boucles composent la croissance dans le temps, là où l'entonnoir exige toujours plus de carburant en entrée.",
          ],
        },
        {
          heading: "Boucles courantes",
          body: [
            "Boucle de recommandation (un client satisfait en parraine un autre), boucle de contenu (le contenu attire, l'usage crée du contenu qui attire encore), boucle d'effets de réseau (le produit vaut plus à mesure qu'il y a d'utilisateurs). Identifier sa boucle principale oriente les efforts vers ce qui compose la croissance.",
          ],
        },
        {
          heading: "Viralité et coefficient K",
          body: [
            "La viralité mesure combien de nouveaux utilisateurs chaque utilisateur amène. Le coefficient K = invitations par utilisateur × taux de conversion des invitations. Un K ≥ 1 signifie une croissance auto-entretenue (chaque utilisateur en amène au moins un). En pratique, K < 1 est fréquent : la viralité réduit alors le coût d'acquisition sans suffire seule.",
          ],
        },
        {
          heading: "Viralité honnête",
          body: [
            "On stimule la recommandation en rendant le partage naturel et en récompensant honnêtement (parrainage réel, avantage réciproque). On évite la viralité forcée (spammer les contacts, partages trompeurs, incitations mensongères) qui abîme la confiance et la marque. La croissance ne justifie pas la manipulation.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Boucle de croissance", definition: "Mécanisme cyclique où la sortie (nouveaux clients) alimente l'entrée." },
        { term: "Coefficient viral (K)", definition: "Nombre de nouveaux utilisateurs générés par utilisateur (invitations × conversion)." },
        { term: "Effet de réseau", definition: "Le produit gagne en valeur à mesure que le nombre d'utilisateurs augmente." },
      ],
      examples: [
        "Boucle de recommandation : parrainage avec avantage réciproque réel.",
        "Jeu de données pédagogique fictif : 5 invitations × 20 % de conversion = K de 1,0.",
      ],
      commonError: {
        title: "Croire qu'une boucle remplace la valeur",
        body:
          "Une boucle n'amplifie que ce qui a de la valeur. Sans produit qui satisfait, aucune recommandation durable : la boucle amplifie aussi l'insatisfaction.",
      },
      vigilancePoint: {
        title: "Pas de viralité forcée",
        body:
          "Spammer les contacts d'un utilisateur, imposer des partages ou promettre de faux avantages nuit à la marque et enfreint souvent les règles. Le partage doit être volontaire et honnête.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — OutiPro (B2B, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "Le logiciel fictif OutiPro dépensait tout en acquisition sans boucle. Chaque nouveau client coûtait cher et rien ne se composait.",
          "En construisant une boucle de recommandation honnête (parrainage à valeur réciproque réelle) et une boucle de contenu, OutiPro a réduit son coût d'acquisition et amorcé une croissance qui se compose. Les boucles ont complété — sans remplacer — la valeur du produit.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l2-ia1",
          title: "Calculer un coefficient viral",
          objective: "Appliquer la formule du coefficient K.",
          instructions: [
            "Jeu de données pédagogique fictif : chaque utilisateur envoie 4 invitations, converties à 15 %. Calculez K et dites si la croissance est auto-entretenue.",
          ],
          answerKey: ["K = 4 × 0,15 = 0,6 ; K < 1 → non auto-entretenue, mais la viralité réduit le coût d'acquisition."],
          feedback: "K = invitations × taux de conversion ; K ≥ 1 = auto-entretenue.",
          successCriterion: "K = 0,6 calculé + interprétation.",
        },
      ],
      exercise: {
        title: "Identifier sa boucle de croissance",
        prompt: [
          "Identifiez la boucle de croissance principale de votre projet (recommandation, contenu, réseau).",
          "Décrivez comment un client en amène d'autres, honnêtement, et estimez un K plausible (simulé).",
        ],
        deliverables: ["Un schéma de boucle de croissance + estimation de K (données simulées)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La boucle principale est identifiée et cyclique.",
        "Le calcul de K est correct.",
        "La viralité proposée est honnête et volontaire.",
      ],
      resources: ["Gabarit de boucle de croissance (ressource interne)"],
      glossary: [{ term: "Boucle de contenu", definition: "Le contenu attire des utilisateurs dont l'usage crée du contenu attirant d'autres utilisateurs." }],
      summary:
        "Les boucles de croissance composent la croissance en faisant qu'un client en amène d'autres ; le coefficient K mesure la viralité ; on stimule la recommandation honnêtement, sans jamais forcer.",
      selfAssessment: [
        "Ai-je identifié ma boucle de croissance principale ?",
        "Ma viralité reste-t-elle volontaire et honnête ?",
      ],
      quiz: { id: "mkt-v2-m7-l2-qz", questionIds: ["mkt-v2-m7-q03", "mkt-v2-m7-q02"], passThreshold: 70 },
      keyTakeaways: [
        "Une boucle compose la croissance, un entonnoir la consomme.",
        "K = invitations × conversion ; K ≥ 1 = auto-entretenue.",
        "Une boucle amplifie la valeur — et l'insatisfaction ; viralité honnête only.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à faire de la rétention un moteur (leçon 19.3)." },
        { condition: "score < 70", message: "Revoyez les boucles de croissance et le coefficient K." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 19.3.",
    },
    {
      id: "mkt-v2-m7-l3",
      module: 7,
      week: 19,
      title: "La rétention comme moteur de croissance",
      authored: true,
      durationMinutes: 90,
      introduction:
        "On ne peut pas remplir un seau percé. La rétention est le fondement de toute croissance durable. Cette leçon présente l'activation, l'habitude et la lecture des courbes de rétention.",
      objectives: [
        "Expliquer pourquoi la rétention conditionne la croissance",
        "Distinguer activation, rétention et résurrection",
        "Lire une courbe de rétention (plateau vs effondrement)",
        "Relier rétention et valeur vie client",
      ],
      competencies: ["C20"],
      prerequisites: ["Leçons 19.1-19.2 ; cohortes (M6)"],
      sections: [
        {
          heading: "Le seau percé",
          body: [
            "Acquérir des clients qui partent aussitôt revient à remplir un seau percé : on dépense sans accumuler. La rétention (les clients qui restent) détermine si l'acquisition construit quelque chose. Améliorer la rétention a souvent plus d'effet sur la croissance que d'augmenter l'acquisition, car elle bénéficie à tous les clients futurs.",
          ],
        },
        {
          heading: "Activation, rétention, résurrection",
          body: [
            "L'activation est le premier moment où le client perçoit la valeur (« aha moment ») ; sans activation, pas de rétention. La rétention est le retour répété. La résurrection réengage un client parti. Chaque phase se travaille : une bonne activation dès le départ améliore durablement la rétention.",
          ],
        },
        {
          heading: "Lire la courbe de rétention",
          body: [
            "Une courbe de rétention qui s'effondre vers zéro signale un produit qui ne crée pas d'habitude ou une attente déçue. Une courbe qui se stabilise sur un plateau indique un socle de clients fidèles — c'est le signe d'une valeur durable. On compare les cohortes (M6) pour voir si les améliorations relèvent le plateau.",
          ],
        },
        {
          heading: "Rétention et valeur vie client",
          body: [
            "Une meilleure rétention augmente directement la valeur vie client (LTV = panier × fréquence × durée) et donc le budget d'acquisition soutenable (rappel du CAC, Module 4). Rétention et économie unitaire sont liées : améliorer la rétention rend l'acquisition plus rentable.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Rétention", definition: "Capacité à conserver les clients dans le temps (retours répétés)." },
        { term: "Activation", definition: "Premier moment où le client perçoit clairement la valeur (« aha moment »)." },
        { term: "Résurrection", definition: "Réengagement d'un client parti." },
      ],
      examples: [
        "Aha moment d'une app de facturation : première facture envoyée en 2 minutes.",
        "Courbe de rétention avec plateau à 40 % : socle fidèle — jeu de données pédagogique fictif.",
      ],
      commonError: {
        title: "Acquérir sans retenir",
        body:
          "Investir en acquisition alors que la rétention est basse gaspille le budget (seau percé). On répare la rétention avant d'amplifier l'acquisition.",
      },
      vigilancePoint: {
        title: "Rétention par la valeur, pas par la contrainte",
        body:
          "On retient par la valeur et une bonne expérience, jamais par des freins abusifs (désabonnement caché, engagement piégé). La rétention forcée est un dark pattern à proscrire.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (détail, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "La boutique fictive Boréalille acquérait beaucoup mais retenait peu : sa courbe de rétention s'effondrait après le premier achat.",
          "En travaillant l'activation (première expérience soignée), l'habitude (rappels utiles) et la valeur perçue, Boréalille a relevé son plateau de rétention. Le même budget d'acquisition a alors produit bien plus de valeur cumulée. Réparer le seau a précédé — et démultiplié — l'acquisition.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l3-ia1",
          title: "Interpréter deux courbes de rétention",
          objective: "Distinguer effondrement et plateau.",
          instructions: [
            "Jeu de données pédagogique fictif : courbe A tombe à 2 % au mois 3 ; courbe B se stabilise à 35 %. Laquelle indique une valeur durable ?",
          ],
          answerKey: ["Courbe B (plateau à 35 %) indique un socle fidèle et une valeur durable ; A signale un produit sans habitude/valeur."],
          feedback: "Un plateau = valeur durable ; un effondrement = problème d'activation/valeur.",
          successCriterion: "Courbe B identifiée comme durable.",
        },
      ],
      exercise: {
        title: "Plan de rétention",
        prompt: [
          "Définissez l'« aha moment » (activation) de votre projet et 3 leviers de rétention.",
          "Décrivez comment vous mesureriez la rétention (cohortes) et son effet sur la LTV.",
        ],
        deliverables: ["Un plan de rétention (activation + 3 leviers + mesure par cohortes)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "L'aha moment (activation) est identifié.",
        "Les leviers de rétention sont pertinents et honnêtes.",
        "Le lien rétention → LTV est explicite.",
      ],
      resources: ["Gabarit de courbe de rétention (ressource interne)"],
      glossary: [{ term: "Plateau de rétention", definition: "Niveau où la rétention se stabilise, signe d'un socle fidèle." }],
      summary:
        "La rétention est le fondement de la croissance : sans elle, l'acquisition remplit un seau percé. On travaille activation, habitude et valeur, on lit les courbes (plateau vs effondrement) et on relie rétention et LTV.",
      selfAssessment: [
        "Ai-je identifié mon aha moment ?",
        "Ma rétention repose-t-elle sur la valeur, pas la contrainte ?",
      ],
      quiz: { id: "mkt-v2-m7-l3-qz", questionIds: ["mkt-v2-m7-q04", "mkt-v2-m7-q01"], passThreshold: 70 },
      keyTakeaways: [
        "On ne remplit pas un seau percé : la rétention d'abord.",
        "Activation → rétention → résurrection.",
        "Un plateau de rétention = valeur durable ; il nourrit la LTV.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour l'expérimentation de croissance (leçon 19.4)." },
        { condition: "score < 70", message: "Revoyez l'activation et la lecture des courbes de rétention." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 19.4.",
    },
    {
      id: "mkt-v2-m7-l4",
      module: 7,
      week: 19,
      title: "Expérimentation de croissance et priorisation",
      authored: true,
      durationMinutes: 90,
      introduction:
        "La croissance se construit par une suite d'expériences priorisées, pas par de grands paris. Cette leçon présente le backlog d'expériences et la priorisation (ICE/RICE).",
      objectives: [
        "Structurer un backlog d'expériences de croissance",
        "Prioriser avec un cadre (ICE ou RICE)",
        "Formuler des hypothèses testables reliées au North Star",
        "Documenter et capitaliser sur les apprentissages",
      ],
      competencies: ["C20"],
      prerequisites: ["Leçons 19.1-19.3 ; tests A/B (M6)"],
      formulas: [
        { name: "Score ICE", expression: "(Impact + Confiance + Facilité) / 3", example: "(8 + 6 + 7) / 3 ≈ 7,0 — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "Le backlog d'expériences",
          body: [
            "La croissance se pilote par un flux continu d'expériences : chacune teste une hypothèse (« si l'on simplifie l'inscription, l'activation augmentera »). On tient un backlog priorisé plutôt que de lancer des idées au hasard. Chaque expérience vise à faire progresser le North Star ou une étape clé.",
          ],
        },
        {
          heading: "Prioriser avec ICE / RICE",
          body: [
            "On priorise avec un score : ICE = moyenne d'Impact, Confiance et Facilité ; RICE ajoute la Portée (Reach) et divise par l'Effort. Ces cadres rendent la priorisation explicite et évitent de suivre l'idée la plus bruyante. On commence par les expériences à fort score.",
          ],
        },
        {
          heading: "Des hypothèses testables",
          body: [
            "Une bonne expérience part d'une hypothèse claire, mesurable et reliée à un indicateur. On conçoit le test avec la rigueur du Module 6 (variable unique, échantillon et durée suffisants, pas de faux gagnant). Une expérience mal conçue produit des conclusions trompeuses.",
          ],
        },
        {
          heading: "Capitaliser sur les apprentissages",
          body: [
            "Chaque expérience — réussie ou non — enseigne quelque chose. On documente hypothèse, résultat, décision et apprentissage. Les échecs bien documentés valent autant que les réussites : ils évitent de répéter les erreurs et affinent l'intuition de l'équipe.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Backlog d'expériences", definition: "Liste priorisée d'expériences de croissance à mener." },
        { term: "ICE", definition: "Score de priorisation = moyenne d'Impact, Confiance et Facilité." },
        { term: "RICE", definition: "Priorisation par Portée × Impact × Confiance / Effort." },
      ],
      examples: [
        "Hypothèse : « simplifier l'inscription augmentera l'activation de X % » — jeu de données pédagogique fictif.",
        "ICE = (Impact 8 + Confiance 6 + Facilité 7)/3 ≈ 7,0.",
      ],
      commonError: {
        title: "Suivre l'idée la plus bruyante",
        body:
          "Lancer les idées les plus mises en avant plutôt que les mieux notées disperse l'effort. Un cadre de priorisation (ICE/RICE) objective les choix.",
      },
      vigilancePoint: {
        title: "Expérimenter honnêtement",
        body:
          "Aucune expérience de croissance ne doit tromper l'utilisateur (fausse urgence, dark pattern) ni exploiter des biais au détriment du client. La croissance reste éthique.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — TrajectO (tourisme, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "L'agence fictive TrajectO lançait des « grands projets de croissance » risqués, coûteux et rarement mesurés.",
          "En adoptant un backlog d'expériences priorisées par ICE, en formulant des hypothèses testables et en documentant chaque résultat, TrajectO a progressé par petits gains cumulés fiables. La discipline expérimentale a battu les paris hasardeux.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l4-ia1",
          title: "Prioriser des expériences avec ICE",
          objective: "Calculer et comparer des scores ICE.",
          instructions: [
            "Jeu de données pédagogique fictif : Exp. A (Impact 9, Confiance 5, Facilité 4) ; Exp. B (Impact 6, Confiance 7, Facilité 8). Calculez les scores ICE et dites laquelle prioriser.",
          ],
          answerKey: ["A = (9+5+4)/3 = 6,0 ; B = (6+7+8)/3 = 7,0 → prioriser B (score plus élevé, plus faisable/confiante)."],
          feedback: "ICE = moyenne des trois critères ; on commence par le score le plus élevé.",
          successCriterion: "Scores 6,0 et 7,0 calculés + B priorisée.",
        },
      ],
      exercise: {
        title: "Backlog d'expériences de croissance",
        prompt: [
          "Proposez 4 expériences de croissance pour votre projet (hypothèse reliée au North Star).",
          "Notez-les avec ICE et priorisez les 2 premières.",
        ],
        deliverables: ["Un backlog de 4 expériences noté ICE, avec les 2 priorités justifiées."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les expériences ont des hypothèses testables reliées au North Star.",
        "La priorisation utilise un cadre explicite (ICE/RICE).",
        "L'éthique de l'expérimentation est respectée.",
      ],
      resources: ["Gabarit de backlog d'expériences (ressource interne)"],
      glossary: [{ term: "Hypothèse de croissance", definition: "Prédiction testable reliant une action à un effet mesurable." }],
      summary:
        "La croissance se construit par un backlog d'expériences priorisées (ICE/RICE), fondées sur des hypothèses testables reliées au North Star, menées avec rigueur et documentées — les échecs enseignent autant que les réussites.",
      selfAssessment: [
        "Mes expériences sont-elles priorisées objectivement ?",
        "Mes hypothèses sont-elles testables et reliées au North Star ?",
      ],
      quiz: { id: "mkt-v2-m7-l4-qz", questionIds: ["mkt-v2-m7-q05", "mkt-v2-m7-q03"], passThreshold: 70 },
      keyTakeaways: [
        "La croissance = un flux d'expériences priorisées.",
        "ICE/RICE objectivent la priorisation.",
        "On documente tout ; les échecs enseignent.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 19 maîtrisée. Passez à la fidélisation et l'omnicanal (semaine 20)." },
        { condition: "score < 70", message: "Revoyez le backlog d'expériences et la priorisation ICE/RICE." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 19 + le quiz hebdomadaire avant la semaine 20.",
    },

    // ══════════ SEMAINE 20 — FIDÉLISATION, COMMUNAUTÉ ET OMNICANAL ══════════
    {
      id: "mkt-v2-m7-l5",
      module: 7,
      week: 20,
      title: "Fidélisation avancée et programmes de fidélité",
      authored: true,
      durationMinutes: 90,
      introduction:
        "La fidélisation avancée va au-delà de la satisfaction : elle organise des mécanismes qui récompensent et renforcent la relation. Cette leçon présente les programmes de fidélité et la gamification responsable.",
      objectives: [
        "Concevoir un programme de fidélité aligné sur la valeur",
        "Structurer des niveaux (tiers) et des récompenses pertinentes",
        "Utiliser la gamification de façon responsable",
        "Éviter les programmes coûteux ou manipulateurs",
      ],
      competencies: ["C21"],
      prerequisites: ["Fidélisation (M5) ; rétention (19.3)"],
      sections: [
        {
          heading: "Un programme aligné sur la valeur",
          body: [
            "Un bon programme de fidélité récompense les comportements qui créent de la valeur mutuelle (réachat, recommandation, engagement utile), pas seulement la dépense. Il doit être simple à comprendre, atteignable et cohérent avec la marque. Un programme trop complexe ou hors de portée démotive.",
          ],
        },
        {
          heading: "Niveaux et récompenses",
          body: [
            "Les niveaux (tiers) créent une progression et un sentiment de reconnaissance ; les récompenses doivent être perçues comme justes et utiles (avantages réels, exclusivités pertinentes). On calibre le coût des récompenses sur la marge et la LTV (rappel du Module 5) : un programme qui coûte plus qu'il ne rapporte n'est pas viable.",
          ],
        },
        {
          heading: "Gamification responsable",
          body: [
            "La gamification (points, badges, défis) peut renforcer l'engagement si elle est ludique et honnête. Responsable signifie : pas d'exploitation de la compulsion, pas de pression excessive, pas de mécaniques addictives nuisibles. On engage par le plaisir et la reconnaissance, pas par la manipulation psychologique.",
          ],
        },
        {
          heading: "Éviter les dérives",
          body: [
            "Un programme mal conçu peut coûter cher (récompenses trop généreuses), attirer les mauvais clients (chasseurs de promotions non fidèles), ou devenir manipulateur. On mesure le programme (participation, effet sur la rétention et la marge) et on l'ajuste ; on ne le maintient pas par habitude s'il ne crée pas de valeur nette.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Programme de fidélité", definition: "Mécanisme récompensant les comportements créateurs de valeur mutuelle." },
        { term: "Niveaux (tiers)", definition: "Paliers de fidélité offrant une progression et des avantages croissants." },
        { term: "Gamification responsable", definition: "Usage ludique et honnête de mécaniques de jeu, sans manipulation." },
      ],
      examples: [
        "Programme : points au réachat + avantage réciproque au parrainage — jeu de données pédagogique fictif.",
        "Récompense calibrée sur la marge : un avantage qui reste rentable au vu de la LTV.",
      ],
      commonError: {
        title: "Récompenser la seule dépense",
        body:
          "Un programme qui ne récompense que la dépense attire les chasseurs de rabais peu fidèles. On récompense aussi la recommandation et l'engagement utile.",
      },
      vigilancePoint: {
        title: "Gamification sans manipulation",
        body:
          "Aucune mécanique addictive nuisible ni pression excessive. La gamification engage par le plaisir et la reconnaissance, jamais par l'exploitation de la compulsion.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Néva Cosmétiques (e-commerce, Canada) — Jeu de données pédagogique fictif",
        region: "canadienne",
        isFictional: true,
        body: [
          "La marque fictive Néva offrait des récompenses très généreuses à toute dépense : le programme coûtait plus qu'il ne rapportait et attirait des chasseurs de promotions.",
          "En recalibrant les récompenses sur la marge et la LTV, en récompensant le réachat et la recommandation, et en ajoutant une gamification légère et honnête, Néva a rendu son programme rentable et fidélisant. Un programme aligné sur la valeur a remplacé la générosité coûteuse.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l5-ia1",
          title: "Concevoir un programme de fidélité aligné",
          objective: "Choisir des comportements à récompenser créateurs de valeur.",
          instructions: [
            "Parmi ces comportements, lesquels récompenser en priorité : (a) réachat ; (b) recommandation réussie ; (c) simple visite du site ; (d) rédaction d'un avis authentique ?",
          ],
          answerKey: ["(a), (b) et (d) créent de la valeur mutuelle ; (c) seule est peu significative."],
          feedback: "On récompense les comportements créateurs de valeur, pas la simple activité.",
          successCriterion: "(a), (b), (d) retenus.",
        },
      ],
      exercise: {
        title: "Programme de fidélité",
        prompt: [
          "Concevez un programme de fidélité pour votre projet : comportements récompensés, niveaux, récompenses calibrées sur la marge.",
          "Ajoutez un élément de gamification responsable.",
        ],
        deliverables: ["Un programme de fidélité (comportements, niveaux, récompenses, gamification responsable)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le programme récompense la valeur mutuelle, pas la seule dépense.",
        "Les récompenses sont calibrées sur la marge/LTV.",
        "La gamification est responsable.",
      ],
      resources: ["Gabarit de programme de fidélité (ressource interne)"],
      glossary: [{ term: "Chasseur de promotions", definition: "Client attiré uniquement par les rabais, peu fidèle." }],
      summary:
        "Un programme de fidélité efficace récompense les comportements créateurs de valeur, propose des niveaux et récompenses calibrés sur la marge, et utilise une gamification responsable — sans manipulation ni coût excessif.",
      selfAssessment: [
        "Mon programme récompense-t-il la valeur, pas la seule dépense ?",
        "Ma gamification reste-t-elle honnête et non manipulatrice ?",
      ],
      quiz: { id: "mkt-v2-m7-l5-qz", questionIds: ["mkt-v2-m7-q09", "mkt-v2-m7-q10"], passThreshold: 70 },
      keyTakeaways: [
        "Récompenser la valeur mutuelle, pas la seule dépense.",
        "Calibrer les récompenses sur la marge et la LTV.",
        "Gamification ludique et honnête, jamais manipulatrice.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la communauté et les ambassadeurs (leçon 20.2)." },
        { condition: "score < 70", message: "Revoyez l'alignement du programme sur la valeur et la marge." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 20.2.",
    },
    {
      id: "mkt-v2-m7-l6",
      module: 7,
      week: 20,
      title: "Communauté, ambassadeurs et croissance par la recommandation",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une communauté engagée devient un moteur de croissance et de fidélité. Cette leçon présente la croissance portée par la communauté, le contenu généré par les utilisateurs et le parrainage éthique.",
      objectives: [
        "Comprendre la croissance portée par la communauté",
        "Encourager le contenu généré par les utilisateurs (UGC) de façon authentique",
        "Structurer un programme d'ambassadeurs et de parrainage éthique",
        "Modérer et animer une communauté sainement",
      ],
      competencies: ["C21"],
      prerequisites: ["Leçon 20.1 ; storytelling (M3)"],
      sections: [
        {
          heading: "La croissance par la communauté",
          body: [
            "Une communauté (clients qui échangent, s'entraident, partagent) crée de la valeur et de la rétention : les membres restent pour la relation autant que pour le produit. Elle génère aussi de la croissance par la recommandation. Animer une communauté demande du temps et de l'authenticité, mais construit un actif difficile à copier.",
          ],
        },
        {
          heading: "Le contenu généré par les utilisateurs (UGC)",
          body: [
            "L'UGC (avis, photos, témoignages, tutoriels créés par les clients) est crédible et peu coûteux, mais il doit être authentique et consenti. On l'encourage (facilité de partage, mise en valeur) sans jamais l'inventer ni le manipuler. Un faux UGC détruit la confiance et enfreint souvent la loi.",
          ],
        },
        {
          heading: "Ambassadeurs et parrainage éthique",
          body: [
            "Les ambassadeurs sont des clients qui recommandent activement la marque. Un programme d'ambassadeurs/parrainage récompense honnêtement (avantage réciproque réel) et exige la transparence des partenariats rémunérés (divulgation). On ne cache jamais une relation commerciale derrière un avis « spontané ».",
          ],
        },
        {
          heading: "Modération et santé de la communauté",
          body: [
            "Une communauté saine repose sur des règles claires, une modération équitable et une culture de respect. On protège les membres (contre le harcèlement, le spam), on valorise les contributions utiles, et on écoute les retours. Une communauté négligée ou toxique devient un passif au lieu d'un actif.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "UGC", definition: "Contenu généré par les utilisateurs (avis, photos, tutoriels), authentique et consenti." },
        { term: "Ambassadeur", definition: "Client qui recommande activement la marque, honnêtement récompensé." },
        { term: "Croissance portée par la communauté", definition: "Croissance issue de l'engagement et de la recommandation d'une communauté." },
      ],
      examples: [
        "UGC : photos clients (avec consentement) mises en valeur sur les fiches produit.",
        "Parrainage transparent : avantage réciproque réel + divulgation de la relation.",
      ],
      commonError: {
        title: "Fabriquer un faux engagement",
        body:
          "Inventer des avis, des membres ou un enthousiasme communautaire est trompeur, contre-productif et souvent illégal. L'engagement se gagne, il ne se fabrique pas.",
      },
      vigilancePoint: {
        title: "Transparence des partenariats",
        body:
          "Toute recommandation rémunérée doit être divulguée. On ne présente jamais un contenu sponsorisé comme un avis spontané. L'UGC doit être authentique et consenti.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Racine & Sol (organisme, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "L'organisme fictif Racine & Sol communiquait de façon descendante, sans communauté ni relais.",
          "En animant une communauté d'anciens participants (entraide, témoignages authentiques et consentis, ambassadeurs transparents), Racine & Sol a gagné en crédibilité et en recommandations. Une communauté authentique a créé une croissance et une fidélité impossibles à acheter.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l6-ia1",
          title: "Vérifier l'éthique d'un programme d'ambassadeurs",
          objective: "Distinguer une pratique éthique d'une pratique trompeuse.",
          instructions: [
            "Laquelle est acceptable ? (a) un ambassadeur rémunéré qui divulgue le partenariat ; (b) de faux avis achetés présentés comme spontanés ; (c) inventer des membres de communauté.",
          ],
          answerKey: ["(a) est acceptable (transparence) ; (b) et (c) sont trompeurs et interdits."],
          feedback: "La transparence rend le partenariat acceptable ; l'invention et la dissimulation sont interdites.",
          successCriterion: "(a) retenue, (b) et (c) rejetées.",
        },
      ],
      exercise: {
        title: "Stratégie de communauté et de recommandation",
        prompt: [
          "Décrivez comment vous animeriez une communauté autour de votre projet (règles, valorisation des contributions).",
          "Concevez un programme d'ambassadeurs/parrainage éthique (avantage réciproque + divulgation).",
        ],
        deliverables: ["Une stratégie de communauté + un programme d'ambassadeurs éthique."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La communauté est animée avec des règles et de l'authenticité.",
        "L'UGC est encouragé sans jamais être inventé.",
        "Le parrainage est transparent et réciproque.",
      ],
      resources: ["Gabarit de stratégie de communauté (ressource interne)"],
      glossary: [{ term: "Modération", definition: "Encadrement des échanges d'une communauté selon des règles claires et équitables." }],
      summary:
        "Une communauté authentique et bien animée devient un moteur de fidélité et de croissance par la recommandation ; UGC et parrainage doivent rester authentiques, consentis et transparents.",
      selfAssessment: [
        "Mon engagement communautaire est-il authentique ?",
        "Mes partenariats et UGC sont-ils transparents et consentis ?",
      ],
      quiz: { id: "mkt-v2-m7-l6-qz", questionIds: ["mkt-v2-m7-q11", "mkt-v2-m7-q09"], passThreshold: 70 },
      keyTakeaways: [
        "Une communauté est un actif de fidélité et de croissance.",
        "L'UGC doit être authentique et consenti.",
        "Parrainage et partenariats : transparence obligatoire.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la stratégie omnicanale (leçon 20.3)." },
        { condition: "score < 70", message: "Revoyez la communauté, l'UGC et le parrainage éthique." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 20.3.",
    },
    {
      id: "mkt-v2-m7-l7",
      module: 7,
      week: 20,
      title: "Stratégie omnicanale",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le client passe d'un canal à l'autre et attend une expérience cohérente. La stratégie omnicanale orchestre les canaux autour du client. Cette leçon la distingue du multicanal et en présente les principes.",
      objectives: [
        "Distinguer multicanal, cross-canal et omnicanal",
        "Orchestrer une expérience cohérente centrée client",
        "Assurer la cohérence de marque et de données entre canaux",
        "Éviter les silos et les incohérences",
      ],
      competencies: ["C21"],
      prerequisites: ["Adaptation multicanale (M3) ; expérience client (M5)"],
      sections: [
        {
          heading: "Multicanal, cross-canal, omnicanal",
          body: [
            "Le multicanal utilise plusieurs canaux séparés. Le cross-canal les relie partiellement (un parcours passe de l'un à l'autre). L'omnicanal orchestre tous les canaux autour du client, avec une expérience et des données unifiées : le client reprend là où il s'était arrêté, quel que soit le canal. L'omnicanal met le client au centre, pas les canaux.",
          ],
        },
        {
          heading: "Orchestrer autour du client",
          body: [
            "L'orchestration coordonne les canaux (site, courriel, réseaux, magasin, service) pour un message et une expérience cohérents au bon moment. On évite les redondances (recevoir la même relance sur trois canaux) et les contradictions (une offre différente selon le canal). Le fil conducteur est le client et son parcours, pas l'organisation interne.",
          ],
        },
        {
          heading: "Cohérence de marque et de données",
          body: [
            "La marque (voix, promesse, identité) doit être cohérente sur tous les canaux (rappel du Module 3). Les données client, unifiées (dans le respect du consentement et de la minimisation), permettent une expérience continue : reconnaître un client d'un canal à l'autre sans le faire se répéter. La cohérence des données rend l'omnicanal possible.",
          ],
        },
        {
          heading: "Éviter les silos",
          body: [
            "Les silos (équipes/canaux qui ne partagent ni données ni vision) produisent des expériences incohérentes et frustrantes. On aligne les équipes sur le parcours client et on partage une vue unifiée. L'omnicanal est autant une question d'organisation que de technologie.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Omnicanal", definition: "Orchestration de tous les canaux autour du client, avec expérience et données unifiées." },
        { term: "Silo", definition: "Équipe ou canal isolé, ne partageant ni données ni vision." },
        { term: "Orchestration", definition: "Coordination cohérente des canaux au service du parcours client." },
      ],
      examples: [
        "Client ajoute au panier sur mobile, reçoit un rappel cohérent par courriel, finalise sur ordinateur.",
        "Même promesse et même offre sur le site, les réseaux et le service client.",
      ],
      commonError: {
        title: "Confondre multicanal et omnicanal",
        body:
          "Être présent sur plusieurs canaux séparés (multicanal) n'est pas l'omnicanal : sans orchestration ni données unifiées, l'expérience reste fragmentée et incohérente.",
      },
      vigilancePoint: {
        title: "Unifier les données dans le respect du consentement",
        body:
          "L'unification des données client se fait avec consentement et minimisation. La continuité de l'expérience ne justifie pas une collecte ou un croisement de données excessifs.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (détail, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "La boutique fictive Boréalille avait un site, une infolettre et une page sociale gérés en silos : offres contradictoires, messages redondants, expérience incohérente.",
          "En orchestrant les canaux autour du client (message et offre cohérents, données unifiées avec consentement, parcours continu), Boréalille a offert une expérience fluide et augmenté sa fidélité simulée. Passer du multicanal à l'omnicanal a mis le client au centre.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l7-ia1",
          title: "Distinguer multicanal et omnicanal",
          objective: "Classer des situations selon le degré d'intégration.",
          instructions: [
            "Classez : (a) trois canaux gérés séparément avec offres différentes ; (b) parcours continu où le client reprend où il s'était arrêté, message cohérent partout.",
          ],
          answerKey: ["(a) multicanal (silos) ; (b) omnicanal (orchestration, données unifiées)."],
          feedback: "L'omnicanal met le client au centre avec continuité et cohérence.",
          successCriterion: "(a) et (b) correctement qualifiées.",
        },
      ],
      exercise: {
        title: "Plan omnicanal",
        prompt: [
          "Cartographiez 3-4 canaux de votre projet et un parcours client qui les traverse de façon cohérente.",
          "Précisez comment vous assurez cohérence de marque et de données (consentement).",
        ],
        deliverables: ["Un plan omnicanal (canaux + parcours cohérent + cohérence marque/données)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le parcours est continu et cohérent entre canaux.",
        "La marque est cohérente partout.",
        "L'unification des données respecte le consentement.",
      ],
      resources: ["Gabarit de plan omnicanal (ressource interne)"],
      glossary: [{ term: "Cross-canal", definition: "Canaux partiellement reliés, permettant un parcours de l'un à l'autre." }],
      summary:
        "L'omnicanal orchestre tous les canaux autour du client, avec une marque et des données cohérentes (dans le respect du consentement), pour une expérience continue — au-delà du simple multicanal en silos.",
      selfAssessment: [
        "Mon expérience est-elle continue et cohérente entre canaux ?",
        "L'unification des données respecte-t-elle le consentement ?",
      ],
      quiz: { id: "mkt-v2-m7-l7-qz", questionIds: ["mkt-v2-m7-q12", "mkt-v2-m7-q11"], passThreshold: 70 },
      keyTakeaways: [
        "Omnicanal = client au centre, canaux orchestrés, données unifiées.",
        "Cohérence de marque et de données obligatoire.",
        "On brise les silos ; consentement respecté.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour le CRM et le cycle de vie client (leçon 20.4)." },
        { condition: "score < 70", message: "Revoyez la distinction multicanal/omnicanal et la cohérence des données." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 20.4.",
    },
    {
      id: "mkt-v2-m7-l8",
      module: 7,
      week: 20,
      title: "CRM et gestion du cycle de vie client",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le CRM organise la relation client sur toute sa durée de vie. Cette leçon présente la segmentation par cycle de vie, l'analyse RFM et la personnalisation responsable.",
      objectives: [
        "Comprendre le rôle d'un CRM dans la relation client",
        "Segmenter par cycle de vie (prospect → fidèle → à risque)",
        "Appliquer une analyse RFM (récence, fréquence, montant)",
        "Personnaliser de façon responsable",
      ],
      competencies: ["C21"],
      prerequisites: ["Leçons 20.1-20.3 ; segmentation (M2/M6)"],
      sections: [
        {
          heading: "Le rôle du CRM",
          body: [
            "Un CRM (gestion de la relation client) centralise les informations et interactions pour offrir une relation cohérente et personnalisée dans le temps. Il permet de savoir où en est chaque client (nouveau, actif, à risque, parti) et d'adapter les actions. Bien utilisé, il fait passer d'une relation anonyme à une relation suivie.",
          ],
        },
        {
          heading: "Segmentation par cycle de vie",
          body: [
            "On segmente les clients selon leur étape : prospect, nouveau client, client actif, client fidèle, client à risque (baisse d'activité), client inactif. Chaque étape appelle des actions différentes (onboarding, fidélisation, réactivation). Agir selon le cycle de vie est plus pertinent qu'un message unique pour tous.",
          ],
        },
        {
          heading: "L'analyse RFM",
          body: [
            "RFM classe les clients selon la Récence (dernier achat), la Fréquence (nombre d'achats) et le Montant (valeur dépensée). Elle identifie rapidement les meilleurs clients (récents, fréquents, à forte valeur) et ceux à risque (récence faible). C'est un outil simple et puissant pour prioriser les efforts relationnels.",
          ],
        },
        {
          heading: "Personnalisation responsable",
          body: [
            "La personnalisation (adapter message et offre au profil et au comportement) améliore la pertinence, mais reste responsable : consentement, minimisation, transparence, et pas de sur-personnalisation intrusive qui met mal à l'aise. On personnalise pour aider le client, pas pour l'exploiter.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "CRM", definition: "Gestion de la relation client : centralisation des informations et interactions." },
        { term: "Cycle de vie client", definition: "Étapes d'un client : prospect, nouveau, actif, fidèle, à risque, inactif." },
        { term: "Analyse RFM", definition: "Classement par Récence, Fréquence et Montant des achats." },
      ],
      examples: [
        "Client « à risque » (pas d'achat depuis longtemps) → action de réactivation ciblée.",
        "RFM : client récent + fréquent + forte valeur = meilleur client à choyer — jeu de données pédagogique fictif.",
      ],
      commonError: {
        title: "Un message unique pour tous",
        body:
          "Traiter de la même façon un nouveau client et un client fidèle à risque gaspille des opportunités. On adapte l'action au cycle de vie et au profil RFM.",
      },
      vigilancePoint: {
        title: "Personnalisation sans intrusion",
        body:
          "La personnalisation reste responsable : consentement, minimisation, transparence. Une personnalisation trop intrusive (révélant une surveillance) met mal à l'aise et nuit à la confiance.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada) — Jeu de données pédagogique fictif",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO envoyait le même message à tous, sans distinguer nouveaux, fidèles et clients à risque.",
          "En segmentant par cycle de vie et en priorisant avec une analyse RFM, InfusiO a choyé ses meilleurs clients, réactivé les clients à risque et personnalisé de façon responsable. La relation suivie a amélioré rétention et valeur, dans le respect du consentement.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l8-ia1",
          title: "Classer des clients par RFM et cycle de vie",
          objective: "Prioriser des actions selon le profil client.",
          instructions: [
            "Jeu de données pédagogique fictif : (a) client récent, fréquent, forte valeur ; (b) client sans achat depuis 8 mois. Quelle action pour chacun ?",
          ],
          answerKey: [
            "(a) meilleur client → le choyer/fidéliser (avantages, reconnaissance) ; (b) client à risque/inactif → réactivation ciblée.",
          ],
          feedback: "RFM et cycle de vie orientent l'action : fidéliser les meilleurs, réactiver ceux à risque.",
          successCriterion: "Actions cohérentes proposées pour (a) et (b).",
        },
      ],
      exercise: {
        title: "Segmentation cycle de vie + RFM",
        prompt: [
          "Définissez les segments de cycle de vie de votre projet et une action par segment.",
          "Esquissez une analyse RFM simple et l'action pour vos meilleurs clients et ceux à risque.",
        ],
        deliverables: ["Une segmentation cycle de vie (actions) + une esquisse RFM (données simulées)."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Les segments de cycle de vie ont des actions adaptées.",
        "L'analyse RFM priorise correctement.",
        "La personnalisation reste responsable.",
      ],
      resources: ["Gabarit RFM et cycle de vie (ressource interne)"],
      glossary: [{ term: "Client à risque", definition: "Client dont l'activité baisse, susceptible de partir." }],
      summary:
        "Le CRM organise une relation suivie : on segmente par cycle de vie, on priorise avec RFM (récence, fréquence, montant) et on personnalise de façon responsable — un message adapté vaut mieux qu'un message unique.",
      selfAssessment: [
        "Est-ce que j'adapte mes actions au cycle de vie et au RFM ?",
        "Ma personnalisation reste-t-elle responsable ?",
      ],
      quiz: { id: "mkt-v2-m7-l8-qz", questionIds: ["mkt-v2-m7-q13", "mkt-v2-m7-q14"], passThreshold: 70 },
      keyTakeaways: [
        "Le CRM permet une relation suivie et personnalisée.",
        "On agit selon le cycle de vie et le profil RFM.",
        "Personnalisation responsable : consentement, minimisation, transparence.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 20 maîtrisée. Passez au développement durable (semaine 21)." },
        { condition: "score < 70", message: "Revoyez le cycle de vie client et l'analyse RFM." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 20 + le quiz hebdomadaire avant la semaine 21.",
    },

    // ══════════ SEMAINE 21 — DÉVELOPPEMENT DURABLE, RESPONSABILITÉ ET PÉRENNITÉ ══════════
    {
      id: "mkt-v2-m7-l9",
      module: 7,
      week: 21,
      title: "Modèle économique durable et économie unitaire",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une croissance qui perd de l'argent à chaque client n'est pas durable. Cette leçon présente l'économie unitaire (LTV/CAC, délai de récupération) qui fonde la pérennité.",
      objectives: [
        "Calculer et interpréter le ratio LTV/CAC",
        "Comprendre le délai de récupération (payback)",
        "Relier rétention, marge et durabilité",
        "Reconnaître un modèle non viable",
      ],
      competencies: ["C22"],
      prerequisites: ["CAC (M4), LTV (M5), rétention (19.3)"],
      formulas: [
        { name: "Ratio LTV/CAC", expression: "valeur vie client / coût d'acquisition client", example: "300 $ / 100 $ = 3 (repère sain ≥ 3) — jeu de données pédagogique fictif" },
        { name: "Délai de récupération (payback)", expression: "CAC / marge par client et par période", example: "100 $ / 25 $ par mois = 4 mois — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "L'économie unitaire",
          body: [
            "L'économie unitaire répond à : « gagne-t-on de l'argent à servir un client de plus ? ». Elle compare ce qu'un client rapporte (LTV) à ce qu'il coûte à acquérir (CAC) et à servir. Un modèle est durable si, en moyenne, chaque client rapporte plus qu'il ne coûte, avec une marge suffisante.",
          ],
        },
        {
          heading: "Le ratio LTV/CAC",
          body: [
            "Le ratio LTV/CAC juge la viabilité : un repère courant considère qu'un ratio ≥ 3 est sain (le client rapporte au moins trois fois son coût d'acquisition). Un ratio proche de 1 signale un modèle fragile ; inférieur à 1, on perd de l'argent à chaque client. Améliorer la rétention augmente la LTV et donc ce ratio.",
          ],
        },
        {
          heading: "Le délai de récupération",
          body: [
            "Le payback est le temps nécessaire pour récupérer le coût d'acquisition d'un client (CAC / marge par période). Un payback court libère de la trésorerie pour réinvestir ; un payback long fragilise la trésorerie même si la LTV est bonne. On surveille les deux : ratio LTV/CAC ET délai de récupération.",
          ],
        },
        {
          heading: "Reconnaître un modèle non viable",
          body: [
            "Un modèle non viable croît en perdant de l'argent à chaque client (LTV/CAC < 1, payback interminable), en comptant sur des levées de fonds ou des promotions permanentes. On le corrige en améliorant la rétention (LTV), en réduisant le CAC (canaux plus efficaces, boucles) ou la structure de coûts — pas en accélérant une croissance déficitaire.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Économie unitaire", definition: "Rentabilité au niveau d'un client (rapporte-t-il plus qu'il ne coûte ?)." },
        { term: "Ratio LTV/CAC", definition: "Valeur vie client divisée par coût d'acquisition ; ≥ 3 = repère sain." },
        { term: "Délai de récupération (payback)", definition: "Temps pour récupérer le CAC d'un client." },
      ],
      examples: [
        "Jeu de données pédagogique fictif : LTV 300 $, CAC 100 $ → ratio 3 (sain).",
        "Jeu de données pédagogique fictif : CAC 100 $, marge 25 $/mois → payback 4 mois.",
      ],
      commonError: {
        title: "Accélérer une croissance déficitaire",
        body:
          "Investir plus pour croître quand LTV/CAC < 1 accélère les pertes. On corrige d'abord l'économie unitaire (rétention, CAC, marge) avant d'accélérer.",
      },
      vigilancePoint: {
        title: "Aucune croissance rentable garantie",
        body:
          "L'économie unitaire est une estimation prudente sur données simulées. On ne promet jamais un ratio ou une rentabilité garantis ; on présente des repères, pas des certitudes.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréal Tech (technologie, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "L'entreprise fictive Boréal Tech affichait une croissance rapide mais un ratio LTV/CAC inférieur à 1 : chaque client perdait de l'argent.",
          "En améliorant la rétention (LTV), en réduisant le CAC via une boucle de recommandation et en surveillant le payback, Boréal Tech a redressé son économie unitaire au-dessus du seuil sain. Corriger l'économie unitaire a rendu la croissance durable — plutôt que de l'accélérer à perte.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l9-ia1",
          title: "Calculer LTV/CAC et payback",
          objective: "Juger la viabilité d'un modèle.",
          instructions: [
            "Jeu de données pédagogique fictif : LTV 240 $, CAC 120 $, marge 30 $/mois. Calculez le ratio LTV/CAC et le payback ; le modèle est-il sain ?",
          ],
          answerKey: ["Ratio = 240/120 = 2 (sous le repère de 3, fragile) ; payback = 120/30 = 4 mois. À améliorer (rétention/CAC)."],
          feedback: "Ratio ≥ 3 = sain ; on surveille aussi le payback.",
          successCriterion: "Ratio 2 et payback 4 mois calculés + jugement.",
        },
      ],
      exercise: {
        title: "Économie unitaire du projet",
        prompt: [
          "Estimez LTV, CAC, ratio LTV/CAC et payback de votre projet (données simulées).",
          "Proposez 2 leviers pour améliorer l'économie unitaire.",
        ],
        deliverables: ["Une analyse d'économie unitaire (LTV/CAC, payback) + 2 leviers d'amélioration (données simulées)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le ratio LTV/CAC et le payback sont calculés correctement.",
        "La viabilité est jugée honnêtement.",
        "Les leviers d'amélioration sont pertinents.",
      ],
      resources: ["Feuille de calcul d'économie unitaire (ressource interne)"],
      glossary: [{ term: "Marge de contribution", definition: "Ce qu'un client rapporte après déduction des coûts variables associés." }],
      summary:
        "La durabilité repose sur l'économie unitaire : LTV/CAC (≥ 3 sain) et délai de récupération. On améliore la rétention, le CAC et la marge plutôt que d'accélérer une croissance déficitaire.",
      selfAssessment: [
        "Mon ratio LTV/CAC est-il sain (≥ 3) ?",
        "Mon payback préserve-t-il ma trésorerie ?",
      ],
      quiz: { id: "mkt-v2-m7-l9-qz", questionIds: ["mkt-v2-m7-q15", "mkt-v2-m7-q16"], passThreshold: 70 },
      keyTakeaways: [
        "Un modèle durable gagne à servir un client de plus.",
        "LTV/CAC ≥ 3 (repère) et payback court = santé.",
        "On corrige l'économie unitaire avant d'accélérer.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour le marketing responsable (leçon 21.2)." },
        { condition: "score < 70", message: "Revoyez le ratio LTV/CAC et le délai de récupération." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 21.2.",
    },
    {
      id: "mkt-v2-m7-l10",
      module: 7,
      week: 21,
      title: "Marketing responsable et durable",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Un marketing durable crée de la valeur sans tromper ni nuire. Cette leçon présente les principes du marketing responsable, l'accessibilité, l'inclusion et le piège de l'écoblanchiment.",
      objectives: [
        "Définir le marketing responsable et durable",
        "Éviter l'écoblanchiment (greenwashing) et les allégations trompeuses",
        "Intégrer accessibilité et inclusion",
        "Mesurer et communiquer un impact honnêtement",
      ],
      competencies: ["C22"],
      prerequisites: ["Éthique publicitaire (M4) ; storytelling (M3)"],
      sections: [
        {
          heading: "Qu'est-ce que le marketing responsable",
          body: [
            "Le marketing responsable crée de la valeur pour le client et la société sans tromperie ni exploitation. Il respecte la vérité (pas de surpromesse), la vie privée (consentement, minimisation), l'équité (pas de manipulation ni de discrimination) et l'environnement. Ce n'est pas un supplément moral : c'est une condition de confiance et de pérennité.",
          ],
        },
        {
          heading: "Éviter l'écoblanchiment",
          body: [
            "L'écoblanchiment (greenwashing) consiste à exagérer ou inventer des vertus écologiques. Toute allégation environnementale doit être vraie, précise et vérifiable (« 30 % de plastique recyclé, certifié », pas « produit vert »). Une allégation vague ou fausse est trompeuse, souvent illégale, et détruit la confiance quand elle est révélée.",
          ],
        },
        {
          heading: "Accessibilité et inclusion",
          body: [
            "Un marketing durable est accessible (contrastes, textes alternatifs, sous-titres, navigation claire) pour ne pas exclure les personnes en situation de handicap, et inclusif (représentations respectueuses, langage qui n'exclut personne). L'accessibilité élargit l'audience et répond souvent à des obligations légales.",
          ],
        },
        {
          heading: "Mesurer et communiquer l'impact",
          body: [
            "Si l'on communique sur un impact (social, environnemental), on le mesure honnêtement et on présente les faits sans les embellir. Reconnaître ses limites (« nous progressons, voici où nous en sommes ») est plus crédible qu'une perfection affichée. La transparence sur l'impact renforce la marque durablement.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Marketing responsable", definition: "Marketing créant de la valeur sans tromperie, exploitation ni nuisance." },
        { term: "Écoblanchiment (greenwashing)", definition: "Exagération ou invention de vertus écologiques ; trompeur." },
        { term: "Accessibilité", definition: "Conception permettant l'usage par les personnes en situation de handicap." },
      ],
      examples: [
        "Allégation honnête : « emballage à 30 % de matière recyclée (certifié X) », pas « emballage écologique ».",
        "Accessibilité : sous-titres sur les vidéos, contrastes suffisants, textes alternatifs.",
      ],
      commonError: {
        title: "L'allégation environnementale vague",
        body:
          "« Produit vert », « respectueux de la planète » sans preuve précise est de l'écoblanchiment. Toute allégation doit être vraie, précise et vérifiable.",
      },
      vigilancePoint: {
        title: "Honnêteté sur l'impact",
        body:
          "On ne surestime jamais un impact social ou environnemental. Mesurer honnêtement et reconnaître ses limites est plus crédible et évite les accusations de tromperie.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Néva Cosmétiques (e-commerce, Canada) — Jeu de données pédagogique fictif",
        region: "canadienne",
        isFictional: true,
        body: [
          "La marque fictive Néva communiquait « 100 % naturel et écologique » sans preuve. Un client a relevé l'imprécision ; la confiance a été entamée (risque d'écoblanchiment).",
          "En remplaçant les allégations vagues par des faits précis et vérifiables, en rendant ses contenus accessibles et en communiquant honnêtement sur ses progrès (et ses limites), Néva a rebâti la confiance. Un marketing responsable et transparent a renforcé la marque durablement.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l10-ia1",
          title: "Repérer l'écoblanchiment",
          objective: "Distinguer une allégation honnête d'un écoblanchiment.",
          instructions: [
            "Laquelle est acceptable ? (a) « produit 100 % écologique » (sans preuve) ; (b) « emballage à 30 % de matière recyclée, certifié » ; (c) « respectueux de la planète ».",
          ],
          answerKey: ["(b) — précise, vraie et vérifiable ; (a) et (c) sont vagues et relèvent de l'écoblanchiment."],
          feedback: "Une allégation environnementale doit être précise, vraie et vérifiable.",
          successCriterion: "(b) retenue, (a) et (c) rejetées.",
        },
      ],
      exercise: {
        title: "Charte de marketing responsable",
        prompt: [
          "Rédigez une courte charte de marketing responsable pour votre projet : vérité, vie privée, accessibilité, inclusion, allégations vérifiables.",
          "Donnez un exemple d'allégation honnête et un exemple d'écoblanchiment à éviter.",
        ],
        deliverables: ["Une charte de marketing responsable + exemples honnête/écoblanchiment."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La charte couvre vérité, vie privée, accessibilité, inclusion.",
        "Les allégations sont vérifiables (pas d'écoblanchiment).",
        "L'impact est présenté honnêtement.",
      ],
      resources: ["Notes de cours — marketing responsable (ressource interne)"],
      glossary: [{ term: "Inclusion", definition: "Représentations et langage qui n'excluent ni ne stéréotypent personne." }],
      summary:
        "Un marketing durable est honnête, respectueux de la vie privée, accessible et inclusif ; il évite l'écoblanchiment en n'affichant que des allégations précises et vérifiables, et communique son impact avec transparence.",
      selfAssessment: [
        "Mes allégations sont-elles précises et vérifiables ?",
        "Mes contenus sont-ils accessibles et inclusifs ?",
      ],
      quiz: { id: "mkt-v2-m7-l10-qz", questionIds: ["mkt-v2-m7-q17", "mkt-v2-m7-q18"], passThreshold: 70 },
      keyTakeaways: [
        "Le marketing responsable est une condition de confiance et de pérennité.",
        "Toute allégation (surtout environnementale) doit être précise et vérifiable.",
        "Accessibilité et inclusion élargissent l'audience et respectent la loi.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la résilience et les risques (leçon 21.3)." },
        { condition: "score < 70", message: "Revoyez l'écoblanchiment et les principes du marketing responsable." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 21.3.",
    },
    {
      id: "mkt-v2-m7-l11",
      module: 7,
      week: 21,
      title: "Résilience, risques et diversification",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une entreprise numérique pérenne anticipe les risques et diversifie ses appuis. Cette leçon présente les risques courants (dépendance, concentration, réputation) et les stratégies de résilience.",
      objectives: [
        "Identifier les risques d'une entreprise numérique",
        "Réduire la dépendance à une plateforme, un canal ou un client",
        "Préparer une gestion de crise et de réputation",
        "Diversifier pour renforcer la résilience",
      ],
      competencies: ["C22"],
      prerequisites: ["Acquisition/dépendance (M4), sources d'acquisition (M4)"],
      sections: [
        {
          heading: "Les risques courants",
          body: [
            "Dépendance à une plateforme (un changement d'algorithme ou une suspension coupe l'activité), concentration (un seul canal, un seul gros client, un seul fournisseur), risque de réputation (une crise mal gérée), risque de conformité (données, publicité), et fragilité de trésorerie (payback long). Nommer ses risques est le premier pas pour s'en protéger.",
          ],
        },
        {
          heading: "Réduire la dépendance",
          body: [
            "On réduit la dépendance en diversifiant : plusieurs canaux d'acquisition (rappel du Module 4), des actifs détenus (liste, communauté), plusieurs fournisseurs, une base de clients répartie. La règle : ne jamais dépendre à plus d'un seuil critique d'une source unique qu'on ne contrôle pas.",
          ],
        },
        {
          heading: "Gestion de crise et réputation",
          body: [
            "Une crise (produit défaillant, incident de données, bad buzz) se gère par la préparation : plan de réponse, porte-parole, transparence rapide, reconnaissance des faits et correction. Cacher ou minimiser aggrave. Une réponse honnête et rapide peut même renforcer la confiance. On protège la réputation en agissant avec intégrité, pas en dissimulant.",
          ],
        },
        {
          heading: "Diversifier pour durer",
          body: [
            "La résilience vient de la diversification (canaux, revenus, clients, fournisseurs) et d'une trésorerie saine. On accepte parfois un peu moins d'efficacité à court terme pour plus de robustesse à long terme. Une entreprise concentrée est efficace mais fragile ; une entreprise diversifiée est plus robuste face aux chocs.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Dépendance de plateforme", definition: "Risque lié à l'appui sur une plateforme tierce non contrôlée." },
        { term: "Concentration", definition: "Risque lié à un seul canal, client ou fournisseur." },
        { term: "Résilience", definition: "Capacité à résister et se rétablir face aux chocs, via diversification et trésorerie saine." },
      ],
      examples: [
        "Un compte publicitaire suspendu coupe l'acquisition d'une entreprise qui n'en dépendait que d'un seul canal.",
        "Gestion de crise : reconnaissance rapide + correction transparente d'un incident de données.",
      ],
      commonError: {
        title: "Tout miser sur une seule source",
        body:
          "Dépendre d'un seul canal, client ou plateforme rend l'entreprise fragile : un seul changement peut tout couper. On diversifie et on garde des actifs détenus.",
      },
      vigilancePoint: {
        title: "Transparence en cas de crise",
        body:
          "En cas d'incident (surtout de données), on informe honnêtement et rapidement les personnes concernées et on corrige. Dissimuler aggrave le préjudice et la responsabilité.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — OutiPro (B2B, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "Le logiciel fictif OutiPro dépendait d'un seul canal d'acquisition et d'un unique gros client. Quand le canal a changé ses règles et que le client est parti, l'activité a vacillé.",
          "En diversifiant ses canaux, en bâtissant des actifs détenus (communauté, liste) et en répartissant sa base de clients, OutiPro a gagné en résilience. Un plan de gestion de crise a complété le dispositif. La diversification a transformé la fragilité en robustesse.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l11-ia1",
          title: "Identifier et réduire un risque",
          objective: "Repérer une dépendance critique et proposer une parade.",
          instructions: [
            "Jeu de données pédagogique fictif : une entreprise réalise 80 % de ses ventes via une seule plateforme tierce. Citez le risque et 2 parades.",
          ],
          answerKey: [
            "Risque : dépendance/concentration critique (une décision de la plateforme peut couper 80 % des ventes). Parades : diversifier les canaux ; développer des actifs détenus (site, liste, communauté).",
          ],
          feedback: "On réduit la concentration en diversifiant et en bâtissant des actifs détenus.",
          successCriterion: "Risque nommé + 2 parades pertinentes.",
        },
      ],
      exercise: {
        title: "Analyse de risques et résilience",
        prompt: [
          "Identifiez 3 risques principaux de votre projet (dépendance, concentration, réputation, trésorerie).",
          "Proposez une parade par risque et une esquisse de plan de gestion de crise.",
        ],
        deliverables: ["Une analyse de risques (3 risques + parades) + une esquisse de plan de crise."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les risques sont identifiés concrètement.",
        "Les parades réduisent la dépendance/concentration.",
        "Un plan de crise minimal est esquissé.",
      ],
      resources: ["Gabarit d'analyse de risques (ressource interne)"],
      glossary: [{ term: "Actif détenu", definition: "Canal/ressource que l'entreprise possède (site, liste, communauté), réduisant la dépendance." }],
      summary:
        "La pérennité exige d'anticiper les risques (dépendance, concentration, réputation, trésorerie) et de diversifier ; une gestion de crise transparente et des actifs détenus renforcent la résilience.",
      selfAssessment: [
        "Ai-je identifié mes dépendances critiques ?",
        "Suis-je préparé à gérer une crise avec transparence ?",
      ],
      quiz: { id: "mkt-v2-m7-l11-qz", questionIds: ["mkt-v2-m7-q19", "mkt-v2-m7-q15"], passThreshold: 70 },
      keyTakeaways: [
        "Ne jamais dépendre d'une seule source non contrôlée.",
        "La diversification et les actifs détenus renforcent la résilience.",
        "Une crise se gère par la transparence et la correction rapide.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour le plan de croissance durable (leçon 21.4)." },
        { condition: "score < 70", message: "Revoyez les risques et les stratégies de diversification." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 21.4.",
    },
    {
      id: "mkt-v2-m7-l12",
      module: 7,
      week: 21,
      title: "Plan de croissance durable et amélioration continue",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Cette leçon de synthèse relie tout le module en un plan de croissance durable, avec feuille de route, gouvernance et mesure d'impact, et prépare la section correspondante du projet intégrateur.",
      objectives: [
        "Assembler un plan de croissance durable cohérent",
        "Établir une feuille de route priorisée (court/moyen terme)",
        "Définir la gouvernance et la mesure d'impact",
        "Installer une culture d'amélioration continue",
      ],
      competencies: ["C22"],
      prerequisites: ["Leçons 21.1-21.3 et semaines 19-20"],
      sections: [
        {
          heading: "Un plan qui relie les pièces",
          body: [
            "Le plan de croissance durable articule : North Star et moteurs (S19), boucles et rétention, fidélisation, communauté et omnicanal (S20), économie unitaire, responsabilité et résilience (S21). Chaque élément se renforce : la rétention nourrit la LTV, la LTV soutient l'acquisition, la communauté amplifie la boucle. La cohérence de l'ensemble fait la solidité du plan.",
          ],
        },
        {
          heading: "Feuille de route priorisée",
          body: [
            "On traduit le plan en une feuille de route : actions à court terme (gains rapides), à moyen terme (chantiers structurants), avec des priorités (impact/effort, M6) et des jalons mesurables. Une feuille de route réaliste, séquencée, vaut mieux qu'une liste d'ambitions simultanées.",
          ],
        },
        {
          heading: "Gouvernance et mesure d'impact",
          body: [
            "On définit qui pilote quoi, avec quels indicateurs (North Star + garde-fous comme la marge et la satisfaction), et à quelle cadence on revoit. On mesure aussi l'impact responsable (accessibilité, transparence, éventuel impact social/environnemental) honnêtement. La gouvernance rend le plan vivant et redevable.",
          ],
        },
        {
          heading: "Amélioration continue",
          body: [
            "La croissance durable est une pratique continue : mesurer, apprendre, ajuster (boucle du Module 6). On institutionnalise l'expérimentation, la revue régulière et la documentation des apprentissages. Une culture d'amélioration continue, honnête et responsable, est ce qui distingue les entreprises qui durent.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Plan de croissance durable", definition: "Feuille de route reliant croissance, rétention, économie unitaire, responsabilité et résilience." },
        { term: "Feuille de route", definition: "Séquence priorisée d'actions à court et moyen terme avec jalons." },
        { term: "Mesure d'impact", definition: "Suivi honnête des effets, y compris responsables (accessibilité, social/environnemental)." },
      ],
      examples: [
        "Court terme : améliorer l'activation (rétention) ; moyen terme : bâtir une boucle de recommandation.",
        "Garde-fous : suivre la marge et la satisfaction en plus du North Star.",
      ],
      commonError: {
        title: "Un plan sans priorités ni jalons",
        body:
          "Lister toutes les initiatives sans priorisation ni jalons mesurables mène à la dispersion. Une feuille de route séquencée et mesurable rend le plan exécutable.",
      },
      vigilancePoint: {
        title: "Croissance sous garde-fous",
        body:
          "On poursuit la croissance sous garde-fous (marge, satisfaction, éthique). Aucune croissance ne se fait au prix de la tromperie, de l'exploitation des données ou d'un modèle déficitaire caché.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Café Nord-Berge (torréfacteur, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le café fictif Nord-Berge avait de nombreuses idées de croissance mais aucun plan cohérent ni priorités.",
          "En assemblant un plan de croissance durable (North Star, rétention, boucle de recommandation, omnicanal, économie unitaire saine, marketing responsable, résilience) sous forme de feuille de route priorisée avec gouvernance et amélioration continue, Nord-Berge a transformé ses idées éparses en trajectoire solide et mesurable.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m7-l12-ia1",
          title: "Séquencer une feuille de route",
          objective: "Classer des initiatives en court/moyen terme selon l'impact/effort.",
          instructions: [
            "Classez : (a) améliorer l'activation (fort impact rétention, effort moyen) ; (b) bâtir une boucle de recommandation (fort impact, effort élevé) ; (c) refondre toute l'identité (effort très élevé, impact incertain).",
          ],
          answerKey: [
            "Court terme : (a) ; moyen terme : (b) ; à réévaluer/plus tard : (c). On commence par le fort impact réalisable.",
          ],
          feedback: "On séquence par impact/effort ; gains rapides d'abord, chantiers structurants ensuite.",
          successCriterion: "(a) en court terme, (b) moyen terme, (c) reporté/réévalué.",
        },
      ],
      exercise: {
        title: "Section « Croissance durable » du projet intégrateur",
        prompt: [
          "Assemblez la section croissance durable de votre projet : North Star, moteurs/boucles, plan de rétention, fidélisation/communauté, plan omnicanal, économie unitaire, marketing responsable, analyse de risques, feuille de route priorisée, gouvernance et mesure d'impact.",
          "Réutilisez les livrables des Modules 1 à 6.",
        ],
        deliverables: ["La section « Croissance, fidélisation, omnicanal et durabilité » du projet intégrateur (données simulées)."],
        estimatedMinutes: 90,
      },
      successCriteria: [
        "Le plan relie cohéremment croissance, rétention, économie unitaire, responsabilité et résilience.",
        "La feuille de route est priorisée et mesurable.",
        "La gouvernance et les garde-fous sont définis.",
      ],
      resources: ["Gabarit de plan de croissance durable (ressource interne)"],
      glossary: [{ term: "Garde-fou", definition: "Indicateur de sécurité (marge, satisfaction) surveillé en plus du North Star." }],
      summary:
        "Le plan de croissance durable relie tous les leviers du module en une feuille de route priorisée, gouvernée et mesurable, sous garde-fous éthiques et financiers, animée par une culture d'amélioration continue.",
      selfAssessment: [
        "Mon plan relie-t-il croissance, rétention, économie unitaire et responsabilité ?",
        "Ma feuille de route est-elle priorisée, mesurable et sous garde-fous ?",
      ],
      quiz: { id: "mkt-v2-m7-l12-qz", questionIds: ["mkt-v2-m7-q20", "mkt-v2-m7-q16"], passThreshold: 70 },
      keyTakeaways: [
        "Un plan durable relie tous les leviers de façon cohérente.",
        "Feuille de route priorisée et mesurable, sous garde-fous.",
        "L'amélioration continue distingue les entreprises qui durent.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Module 7 maîtrisé. Finalisez la section croissance durable du projet intégrateur." },
        { condition: "score < 70", message: "Revoyez l'assemblage du plan et la feuille de route priorisée." },
      ],
      progressionRule:
        "Compléter les 4 leçons de la semaine 21, le quiz hebdomadaire, le sommatif du module (≥ 70 %) et déposer la section croissance durable du projet intégrateur pour valider le Module 7.",
    },
  ],

  weeklyQuizzes: [
    {
      id: "mkt-v2-m7-week19-quiz",
      // Semaine 19 : croissance, boucles, rétention, expérimentation (8 M7)
      questionIds: [
        "mkt-v2-m7-q01",
        "mkt-v2-m7-q02",
        "mkt-v2-m7-q03",
        "mkt-v2-m7-q04",
        "mkt-v2-m7-q05",
        "mkt-v2-m7-q06",
        "mkt-v2-m7-q07",
        "mkt-v2-m7-q08",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m7-week20-quiz",
      // Semaine 20 : fidélisation, communauté, omnicanal, CRM (6 M7 + 2 rappels M5)
      questionIds: [
        "mkt-v2-m7-q09",
        "mkt-v2-m7-q10",
        "mkt-v2-m7-q11",
        "mkt-v2-m7-q12",
        "mkt-v2-m7-q13",
        "mkt-v2-m7-q14",
        "mkt-v2-m5-q18",
        "mkt-v2-m5-q19",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m7-week21-quiz",
      // Semaine 21 : durabilité, responsable, résilience, plan (6 M7 + 2 rappels M4/M6)
      questionIds: [
        "mkt-v2-m7-q15",
        "mkt-v2-m7-q16",
        "mkt-v2-m7-q17",
        "mkt-v2-m7-q18",
        "mkt-v2-m7-q19",
        "mkt-v2-m7-q20",
        "mkt-v2-m4-q02",
        "mkt-v2-m6-q17",
      ],
      passThreshold: 70,
    },
  ],

  rubric: {
    id: "mkt-v2-m7-rubric",
    title: "Rubrique — Section croissance, fidélisation, omnicanale et durabilité du projet intégrateur",
    totalPoints: 100,
    passThreshold: 60,
    criteria: [
      { label: "North Star et moteurs de croissance", points: 10 },
      { label: "Boucles de croissance et rétention", points: 15 },
      { label: "Expérimentation et priorisation", points: 10 },
      { label: "Fidélisation et programme", points: 10 },
      { label: "Communauté et recommandation éthique", points: 10 },
      { label: "Stratégie omnicanale et CRM", points: 10 },
      { label: "Économie unitaire (LTV/CAC, payback)", points: 15 },
      { label: "Marketing responsable et résilience", points: 10 },
      { label: "Feuille de route, gouvernance et présentation", points: 10 },
    ],
  },

  assessments: [
    {
      id: "mkt-v2-m7-sum",
      kind: "summative",
      title: "Sommatif Module 7 — Croissance, fidélisation, omnicanale et durabilité (20 questions)",
      passThreshold: 70,
      weightHint: "Quiz de modules (20 %)",
    },
    {
      id: "mkt-v2-m7-tp",
      kind: "practical",
      title: "Projet Module 7 — Section croissance durable du projet intégrateur (livrable 7/7, rubrique 100 pts)",
      passThreshold: 60,
      weightHint: "Travaux pratiques (25 %)",
    },
  ],
};
