import type { ModuleV2 } from "@/lib/academic/types";

/**
 * MODULE 8 — Synthèse stratégique, projet intégrateur et examen final (semaines 22–24).
 * Programme pilote Marketing Digital et E-commerce, version académique v2. MODULE CAPSTONE.
 *
 * Relie les Modules 1 à 7 en une stratégie cohérente de bout en bout, finalise le projet intégrateur,
 * prépare et fait passer l'examen final, et ouvre sur le portfolio, l'éthique professionnelle et l'apprentissage continu.
 * Isolé du contenu v1 ; ne modifie aucune donnée. Complète les 24 semaines du programme.
 *
 * Toute donnée chiffrée est un « Jeu de données pédagogique fictif ». Aucune donnée réelle, aucune reconnaissance
 * officielle revendiquée. Le score interne (/100) n'est jamais présenté comme une note officielle externe.
 */
export const marketingDigitalV2Module8: ModuleV2 = {
  index: 8,
  title: "Synthèse stratégique, projet intégrateur et examen final",
  weeks: [22, 23, 24],
  summary:
    "Relier, finaliser et démontrer : synthétiser la stratégie de bout en bout, auditer sa cohérence, assembler et présenter le projet intégrateur, constituer un portfolio, réviser et passer l'examen final, et planifier son développement professionnel.",
  competencies: ["C23", "C24"],
  introduction:
    "Les Modules 1 à 7 ont construit, brique par brique, une stratégie marketing et e-commerce complète. Le Module 8 répond à : « comment relier le tout en une stratégie cohérente, le démontrer et poursuivre son développement ? ». On y synthétise le parcours, on finalise et présente le projet intégrateur, on prépare et passe l'examen final, et on prépare l'après-formation (portfolio, éthique, apprentissage continu).",
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
      "Tous les livrables des Modules 1 à 7 (marché, marque, acquisition, vente, analytique, croissance durable)",
      "Le projet intégrateur assemblé section par section (M2 à M7)",
      "Les compétences C1 à C22 mobilisées et consolidées",
    ],
    consolidatedCompetencies: [
      "C1–C22 → intégrées et démontrées dans une stratégie cohérente (C23)",
    ],
    newCompetencies: [
      "C23 — synthétiser et auditer la cohérence d'une stratégie de bout en bout, finaliser et présenter un projet professionnel",
      "C24 — constituer un portfolio, agir avec éthique professionnelle et organiser son apprentissage continu",
    ],
    deliverablesForNextModule: [
      "Programme complété : le cursif de 24 semaines constitue la référence technique générique pour les futurs programmes (TEF/TCF/DELF…)",
    ],
  },
  lessons: [
    // ══════════ SEMAINE 22 — SYNTHÈSE STRATÉGIQUE ET COHÉRENCE ══════════
    {
      id: "mkt-v2-m8-l1",
      module: 8,
      week: 22,
      title: "Synthèse du parcours : de la stratégie à l'exécution",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une stratégie n'a de valeur que si ses parties tiennent ensemble. Cette leçon relie les sept modules en une chaîne logique et montre comment chaque décision découle de la précédente.",
      objectives: [
        "Relier les sept modules en une chaîne stratégique cohérente",
        "Expliquer comment chaque livrable alimente le suivant",
        "Reconnaître la logique « comprendre → construire → attirer → vendre → mesurer → croître »",
        "Situer chaque compétence dans l'ensemble",
      ],
      competencies: ["C23"],
      prerequisites: ["Modules 1 à 7"],
      sections: [
        {
          heading: "La chaîne stratégique",
          body: [
            "Le programme suit une logique : comprendre le marketing (M1), comprendre le marché et le client (M2), construire la marque et les messages (M3), attirer et convertir (M4), vendre et fidéliser (M5), mesurer et optimiser (M6), croître durablement (M7). Chaque étape présuppose la précédente : on ne construit pas une marque sans connaître le client, on n'acquiert pas sans offre, on n'optimise pas sans mesure.",
          ],
        },
        {
          heading: "Chaque livrable alimente le suivant",
          body: [
            "Les personas (M2) nourrissent les messages (M3) ; les messages nourrissent les campagnes (M4) ; les campagnes mènent aux pages de vente (M5) ; la vente génère des données (M6) ; les données guident la croissance (M7). Un projet intégrateur cohérent se lit comme un fil continu, pas comme des sections indépendantes juxtaposées.",
          ],
        },
        {
          heading: "Comprendre, construire, attirer, vendre, mesurer, croître",
          body: [
            "Cette séquence est un cadre mental réutilisable : face à tout projet, on se demande où l'on en est dans la chaîne et quelle étape est la plus faible. Sauter une étape (vendre sans comprendre le client, croître sans mesurer) fragilise l'ensemble. La force d'une stratégie tient à la cohérence de la chaîne, pas à la brillance d'un maillon isolé.",
          ],
        },
        {
          heading: "Situer les compétences",
          body: [
            "Les 22 compétences (C1–C22) acquises se répartissent le long de la chaîne. Les situer aide à s'auto-évaluer et à identifier ses points forts et à consolider. Le Module 8 mobilise et démontre l'ensemble plutôt que d'ajouter beaucoup de nouveau : c'est un module d'intégration.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Chaîne stratégique", definition: "Enchaînement logique des étapes marché → marque → acquisition → vente → mesure → croissance." },
        { term: "Projet intégrateur", definition: "Dossier reliant tous les livrables du programme en une stratégie cohérente." },
        { term: "Cadre mental réutilisable", definition: "Grille (comprendre→construire→attirer→vendre→mesurer→croître) applicable à tout projet." },
      ],
      examples: [
        "Un persona flou (M2) produit des messages flous (M3), des campagnes inefficaces (M4) : la faiblesse se propage.",
        "Une bonne mesure (M6) révèle où agir pour croître (M7) : les maillons se renforcent.",
      ],
      commonError: {
        title: "Traiter les modules comme des silos",
        body:
          "Présenter des sections indépendantes sans fil conducteur affaiblit le projet. La valeur vient de la cohérence de la chaîne, pas de la somme des parties.",
      },
      vigilancePoint: {
        title: "Cohérence avant exhaustivité",
        body:
          "Un projet cohérent et centré vaut mieux qu'un projet exhaustif mais décousu. On vérifie que chaque décision découle logiquement de la précédente.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Café Nord-Berge (torréfacteur, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le café fictif Nord-Berge avait, au fil des modules, produit d'excellentes sections isolées (persona, marque, campagnes) mais sans les relier.",
          "En synthétisant sa stratégie comme une chaîne continue (le persona guide la marque, qui guide les campagnes, dont les données guident la croissance), Nord-Berge a transformé des sections juxtaposées en un projet cohérent et convaincant. La cohérence a révélé la force de l'ensemble.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l1-ia1",
          title: "Ordonner la chaîne stratégique",
          objective: "Remettre les étapes du programme dans l'ordre logique.",
          instructions: ["Ordonnez : vendre/fidéliser · comprendre le client · mesurer/optimiser · construire la marque · attirer/convertir · croître durablement."],
          answerKey: ["comprendre le client → construire la marque → attirer/convertir → vendre/fidéliser → mesurer/optimiser → croître durablement."],
          feedback: "Chaque étape présuppose la précédente ; la chaîne va du client à la croissance.",
          successCriterion: "Ordre exact.",
        },
      ],
      exercise: {
        title: "Carte de synthèse stratégique",
        prompt: [
          "Résumez votre projet en une carte reliant les 7 étapes (un encadré par module) avec une flèche montrant comment chacune alimente la suivante.",
          "Indiquez l'étape actuellement la plus faible.",
        ],
        deliverables: ["Une carte de synthèse stratégique (7 étapes reliées) + l'étape la plus faible identifiée."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les 7 étapes sont reliées logiquement.",
        "Le fil conducteur est explicite.",
        "L'étape faible est identifiée.",
      ],
      resources: ["Gabarit de carte de synthèse (ressource interne)"],
      glossary: [{ term: "Fil conducteur", definition: "Logique reliant toutes les décisions d'une stratégie." }],
      summary:
        "Le programme forme une chaîne : comprendre → construire → attirer → vendre → mesurer → croître. Chaque livrable alimente le suivant ; la force d'une stratégie tient à la cohérence de la chaîne.",
      selfAssessment: [
        "Mon projet se lit-il comme un fil continu ?",
        "Puis-je situer chaque décision dans la chaîne ?",
      ],
      quiz: { id: "mkt-v2-m8-l1-qz", questionIds: ["mkt-v2-m8-q01", "mkt-v2-m8-q02"], passThreshold: 70 },
      keyTakeaways: [
        "La stratégie est une chaîne, pas une somme de silos.",
        "Chaque livrable alimente le suivant.",
        "La cohérence prime sur l'exhaustivité.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Solide. Passez au tableau de bord intégré (leçon 22.2)." },
        { condition: "score < 70", message: "Revoyez la chaîne stratégique et le fil conducteur." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 22.2.",
    },
    {
      id: "mkt-v2-m8-l2",
      module: 8,
      week: 22,
      title: "Tableau de bord intégré et North Star consolidé",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Piloter une stratégie complète exige une vue d'ensemble. Cette leçon consolide les indicateurs des modules précédents en un tableau de bord intégré aligné sur le North Star.",
      objectives: [
        "Consolider les indicateurs clés du programme en une vue unique",
        "Aligner les indicateurs sur le North Star et des garde-fous",
        "Relier indicateurs d'acquisition, de vente, de rétention et de rentabilité",
        "Éviter la surcharge et les métriques de vanité",
      ],
      competencies: ["C23"],
      prerequisites: ["Leçon 22.1 ; analytique (M6) ; croissance (M7)"],
      formulas: [
        { name: "Note globale du programme (pondération)", expression: "0,20·activités + 0,20·quiz modules + 0,25·TP + 0,20·projet + 0,15·examen", example: "0,20·80 + 0,20·75 + 0,25·70 + 0,20·72 + 0,15·68 = 73,1 / 100 — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "Une vue d'ensemble",
          body: [
            "Un tableau de bord intégré rassemble, sur une seule vue, les indicateurs qui pilotent réellement la stratégie : acquisition (CAC), conversion (taux, panier moyen), rétention (réachat, LTV), rentabilité (marge, ratio LTV/CAC), et le North Star. Il permet de voir d'un coup d'œil la santé de toute la chaîne, pas seulement d'un canal.",
          ],
        },
        {
          heading: "Aligner sur le North Star et des garde-fous",
          body: [
            "Le North Star (M7) reste l'indicateur central, entouré de garde-fous (marge, satisfaction) qui évitent d'optimiser un chiffre au détriment des autres (M6). On regarde toujours le North Star ET les garde-fous ensemble : une croissance qui dégrade la marge ou la satisfaction n'est pas une victoire.",
          ],
        },
        {
          heading: "Relier les indicateurs",
          body: [
            "Les indicateurs se lisent en système : un CAC élevé peut rester sain si la LTV et la rétention sont fortes ; un bon taux de conversion ne suffit pas si la marge est négative. Le tableau de bord montre les relations, pas des chiffres isolés — c'est ce qui permet une décision d'ensemble.",
          ],
        },
        {
          heading: "Éviter la surcharge",
          body: [
            "Un tableau de bord intégré reste sobre : quelques indicateurs décisionnels, pas des dizaines de métriques (dont des vanités). On sélectionne ce qui pilote la stratégie et on relègue le reste. La lisibilité est une condition de l'action.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Tableau de bord intégré", definition: "Vue unique consolidant les indicateurs clés de toute la chaîne stratégique." },
        { term: "Garde-fou", definition: "Indicateur de sécurité (marge, satisfaction) surveillé avec le North Star." },
        { term: "Note globale du programme", definition: "Score pondéré combinant activités, quiz, TP, projet et examen (score interne)." },
      ],
      examples: [
        "Tableau intégré : CAC, LTV/CAC, taux de conversion, réachat, marge, North Star — jeu de données pédagogique fictif.",
        "Note globale (pondération 20/20/25/20/15) : score interne, jamais présenté comme note officielle externe.",
      ],
      commonError: {
        title: "Juger un canal isolément",
        body:
          "Regarder un indicateur hors système (un bon taux de conversion mais une marge négative) mène à de mauvaises décisions. On lit les indicateurs en relation.",
      },
      vigilancePoint: {
        title: "Score interne ≠ note officielle",
        body:
          "Le score /100 est un indicateur pédagogique interne. Il ne doit jamais être présenté comme une note officielle externe (TEF, CECRL…) ni comme une garantie.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréal Tech (technologie, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "L'entreprise fictive Boréal Tech avait un tableau de bord par équipe, sans vue d'ensemble : chacune optimisait son indicateur, parfois au détriment des autres.",
          "En consolidant un tableau de bord intégré (North Star + garde-fous, indicateurs reliés), Boréal Tech a pris des décisions d'ensemble et cessé d'optimiser un chiffre au détriment de la marge. La vue intégrée a aligné les équipes sur la santé globale.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l2-ia1",
          title: "Calculer une note globale pondérée",
          objective: "Appliquer la pondération 20/20/25/20/15.",
          instructions: [
            "Jeu de données pédagogique fictif : activités 80, quiz modules 70, TP 60, projet 80, examen 60. Calculez la note globale.",
          ],
          answerKey: ["0,20·80 + 0,20·70 + 0,25·60 + 0,20·80 + 0,15·60 = 16 + 14 + 15 + 16 + 9 = 70 / 100."],
          feedback: "On applique chaque poids puis on additionne ; le résultat est un score interne.",
          successCriterion: "Note globale 70 calculée.",
        },
      ],
      exercise: {
        title: "Tableau de bord intégré du projet",
        prompt: [
          "Construisez un tableau de bord intégré de 6-8 indicateurs décisionnels pour votre projet, aligné sur un North Star + garde-fous.",
          "Montrez une relation clé entre deux indicateurs (ex. CAC ↔ LTV).",
        ],
        deliverables: ["Un tableau de bord intégré (North Star + garde-fous + indicateurs reliés) — données simulées."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les indicateurs couvrent toute la chaîne et restent peu nombreux.",
        "Le North Star et les garde-fous sont présents.",
        "Au moins une relation entre indicateurs est explicitée.",
      ],
      resources: ["Gabarit de tableau de bord intégré (ressource interne)"],
      glossary: [{ term: "North Star consolidé", definition: "Indicateur central de la stratégie, entouré de garde-fous." }],
      summary:
        "Un tableau de bord intégré consolide en une vue sobre les indicateurs de toute la chaîne, alignés sur le North Star et des garde-fous, lus en système — le score /100 reste un indicateur interne.",
      selfAssessment: [
        "Mon tableau de bord montre-t-il la santé de toute la chaîne ?",
        "Est-ce que je lis les indicateurs en relation ?",
      ],
      quiz: { id: "mkt-v2-m8-l2-qz", questionIds: ["mkt-v2-m8-q03", "mkt-v2-m8-q02"], passThreshold: 70 },
      keyTakeaways: [
        "Une vue intégrée montre la santé de toute la chaîne.",
        "North Star + garde-fous, indicateurs lus en système.",
        "Le score /100 est interne, jamais une note officielle.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour l'audit de cohérence (leçon 22.3)." },
        { condition: "score < 70", message: "Revoyez la consolidation des indicateurs et la pondération." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 22.3.",
    },
    {
      id: "mkt-v2-m8-l3",
      module: 8,
      week: 22,
      title: "Audit de cohérence stratégique de bout en bout",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une stratégie peut sembler complète mais receler des contradictions. Cette leçon apprend à auditer la cohérence entre marché, offre, message, acquisition, vente et rétention.",
      objectives: [
        "Vérifier la cohérence marché → offre → message → canal → vente → rétention",
        "Détecter les contradictions internes",
        "Aligner promesse, expérience et capacité de livraison",
        "Corriger les incohérences prioritaires",
      ],
      competencies: ["C23"],
      prerequisites: ["Leçons 22.1-22.2"],
      sections: [
        {
          heading: "Le principe de l'audit de cohérence",
          body: [
            "Auditer la cohérence, c'est vérifier que chaque élément de la stratégie parle du même client, tient la même promesse et sert le même objectif. Un persona haut de gamme (M2) avec des messages « discount » (M3), ou une promesse de rapidité (M3) qu'une logistique lente (M5) ne peut tenir, sont des incohérences qui sabotent la stratégie.",
          ],
        },
        {
          heading: "Détecter les contradictions",
          body: [
            "On passe la stratégie au crible : le segment cible correspond-il aux canaux d'acquisition ? Le message reflète-t-il la proposition de valeur ? La page de vente tient-elle la promesse de l'annonce ? La rétention est-elle alignée sur le type de client visé ? Chaque rupture de cohérence est un point de fuite.",
          ],
        },
        {
          heading: "Aligner promesse, expérience, capacité",
          body: [
            "Trois éléments doivent s'accorder : la promesse (ce qu'on dit), l'expérience (ce que le client vit) et la capacité de livraison (ce qu'on peut réellement faire). Promettre plus qu'on ne peut livrer (M5) crée déceptions et réclamations. L'alignement des trois est la marque d'une stratégie solide.",
          ],
        },
        {
          heading: "Corriger en priorité",
          body: [
            "Toutes les incohérences n'ont pas le même impact. On priorise celles qui touchent le cœur de la promesse ou l'étape la plus fréquentée. Corriger une contradiction majeure vaut mieux que peaufiner dix détails cohérents. L'audit débouche sur un plan de correction priorisé.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Audit de cohérence", definition: "Vérification que tous les éléments de la stratégie s'accordent (client, promesse, objectif)." },
        { term: "Incohérence stratégique", definition: "Contradiction entre deux éléments (ex. persona premium vs message discount)." },
        { term: "Alignement promesse-expérience-capacité", definition: "Accord entre ce qu'on dit, ce que le client vit et ce qu'on peut livrer." },
      ],
      examples: [
        "Incohérence : cibler des dirigeants B2B (M2) mais tout miser sur un réseau de divertissement (M4).",
        "Alignement : promesse « livraison 48 h » tenue par une logistique réellement capable.",
      ],
      commonError: {
        title: "Une stratégie complète mais contradictoire",
        body:
          "Chaque section peut être bonne isolément tout en se contredisant. Sans audit de cohérence, ces contradictions restent invisibles et coûteuses.",
      },
      vigilancePoint: {
        title: "Honnêteté de l'audit",
        body:
          "On audite honnêtement, y compris ses propres choix. Reconnaître une incohérence est une force ; la masquer la laisse nuire à la stratégie.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (détail, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "La boutique fictive Boréalille visait un positionnement premium mais utilisait des messages « prix cassés » et une expérience d'emballage bas de gamme.",
          "Un audit de cohérence a révélé ces contradictions ; en réalignant messages, expérience et promesse sur le positionnement premium, Boréalille a rendu sa stratégie crédible et efficace. L'audit a transformé des incohérences invisibles en corrections ciblées.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l3-ia1",
          title: "Repérer une incohérence stratégique",
          objective: "Détecter la contradiction dans une stratégie donnée.",
          instructions: [
            "Une stratégie cible des familles économes (M2), promet « le luxe accessible » (M3), et fixe des prix très élevés (M5). Citez l'incohérence principale.",
          ],
          answerKey: ["Contradiction entre le segment (familles économes) et le prix élevé / positionnement luxe : le message et le prix ne correspondent pas au persona ciblé."],
          feedback: "On vérifie que persona, message et prix parlent du même client.",
          successCriterion: "Incohérence persona/prix identifiée.",
        },
      ],
      exercise: {
        title: "Audit de cohérence du projet",
        prompt: [
          "Auditez votre projet : vérifiez la cohérence marché → offre → message → canal → vente → rétention.",
          "Listez 2 incohérences (ou risques d'incohérence) et un plan de correction priorisé.",
        ],
        deliverables: ["Un audit de cohérence + 2 incohérences relevées + plan de correction priorisé."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La cohérence est vérifiée sur toute la chaîne.",
        "Les incohérences sont identifiées honnêtement.",
        "Le plan de correction est priorisé.",
      ],
      resources: ["Grille d'audit de cohérence (ressource interne)"],
      glossary: [{ term: "Point de fuite (stratégie)", definition: "Endroit où une incohérence fait perdre de l'efficacité." }],
      summary:
        "L'audit de cohérence vérifie que marché, offre, message, canal, vente et rétention parlent du même client et tiennent la même promesse, en alignant promesse, expérience et capacité — et débouche sur des corrections priorisées.",
      selfAssessment: [
        "Ma stratégie parle-t-elle partout du même client ?",
        "Ma promesse est-elle alignée sur mon expérience et ma capacité ?",
      ],
      quiz: { id: "mkt-v2-m8-l3-qz", questionIds: ["mkt-v2-m8-q04", "mkt-v2-m8-q01"], passThreshold: 70 },
      keyTakeaways: [
        "Une stratégie peut être complète mais contradictoire.",
        "On aligne promesse, expérience et capacité.",
        "L'audit débouche sur des corrections priorisées.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour le diagnostic et la priorisation finale (leçon 22.4)." },
        { condition: "score < 70", message: "Revoyez l'audit de cohérence et l'alignement promesse-expérience-capacité." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 22.4.",
    },
    {
      id: "mkt-v2-m8-l4",
      module: 8,
      week: 22,
      title: "Diagnostic global et priorisation finale",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Avant de finaliser, on identifie le maillon faible du système global et ce qui aura le plus d'impact. Cette leçon consolide le diagnostic et la priorisation à l'échelle de toute la stratégie.",
      objectives: [
        "Diagnostiquer le maillon le plus faible de la chaîne globale",
        "Prioriser les actions par impact et faisabilité (à l'échelle de la stratégie)",
        "Distinguer symptômes et causes profondes",
        "Formuler des recommandations claires et justifiées",
      ],
      competencies: ["C23"],
      prerequisites: ["Leçons 22.1-22.3"],
      sections: [
        {
          heading: "Le maillon le plus faible",
          body: [
            "Une chaîne ne vaut que son maillon le plus faible. À l'échelle de la stratégie, on identifie l'étape qui limite le plus le résultat global (acquisition trop chère, conversion faible, rétention basse, économie unitaire fragile). Renforcer ce maillon a plus d'effet que d'améliorer un maillon déjà solide.",
          ],
        },
        {
          heading: "Prioriser à l'échelle globale",
          body: [
            "On priorise les actions par impact (sur le North Star et la rentabilité) et faisabilité (effort, risque), comme au Module 6 mais à l'échelle de toute la stratégie. Une matrice impact/effort globale aide à choisir les quelques actions qui feront la différence.",
          ],
        },
        {
          heading: "Symptômes vs causes",
          body: [
            "Un symptôme (ventes en baisse) a une cause profonde (rétention faible, offre inadaptée, incohérence). On remonte du symptôme à la cause avant d'agir : traiter le symptôme sans la cause ne règle rien durablement. Le diagnostic distingue les deux.",
          ],
        },
        {
          heading: "Recommandations claires",
          body: [
            "Le diagnostic débouche sur des recommandations : quoi faire, pourquoi (justification par les données/l'audit), dans quel ordre, et comment mesurer le succès. Une recommandation vague (« améliorer le marketing ») ne guide personne ; une recommandation précise et justifiée oriente l'action.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Maillon faible", definition: "Étape qui limite le plus le résultat global de la chaîne." },
        { term: "Symptôme vs cause profonde", definition: "Effet visible vs origine réelle d'un problème." },
        { term: "Recommandation", definition: "Action précise, justifiée, ordonnée et mesurable." },
      ],
      examples: [
        "Symptôme : CAC qui grimpe. Cause : dépendance à un seul canal saturé (M4/M7).",
        "Recommandation : « diversifier vers 2 canaux détenus d'ici 3 mois, cible CAC ≤ X (simulé) ».",
      ],
      commonError: {
        title: "Traiter le symptôme, pas la cause",
        body:
          "Agir sur l'effet visible sans remonter à la cause profonde ne règle rien durablement. On diagnostique la cause avant de recommander.",
      },
      vigilancePoint: {
        title: "Recommandations honnêtes et mesurables",
        body:
          "On ne promet pas de résultats garantis. Les recommandations s'appuient sur des données (simulées ici) et prévoient une mesure du succès, sans exagérer les effets attendus.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — OutiPro (B2B, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "Le logiciel fictif OutiPro voulait « tout améliorer » et se dispersait. Son maillon faible réel était la rétention.",
          "En diagnostiquant la cause (activation défaillante → rétention basse) et en priorisant une recommandation claire et mesurable, OutiPro a concentré ses efforts là où l'impact était maximal. Le diagnostic global a évité la dispersion.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l4-ia1",
          title: "Remonter du symptôme à la cause",
          objective: "Distinguer symptôme et cause profonde.",
          instructions: [
            "Symptôme : « le chiffre d'affaires baisse ». Proposez 2 causes profondes possibles à investiguer.",
          ],
          answerKey: [
            "Exemples : rétention/réachat en baisse (clients qui ne reviennent pas) ; ou conversion en baisse (page/offre) ; ou acquisition tarie (canal saturé). On investigue avant d'agir.",
          ],
          feedback: "On remonte du symptôme à des causes plausibles à vérifier par la mesure.",
          successCriterion: "2 causes profondes plausibles proposées.",
        },
      ],
      exercise: {
        title: "Diagnostic global et recommandations",
        prompt: [
          "Identifiez le maillon le plus faible de votre stratégie et sa cause profonde.",
          "Formulez 3 recommandations priorisées (impact/effort), justifiées et mesurables.",
        ],
        deliverables: ["Un diagnostic global (maillon faible + cause) + 3 recommandations priorisées et mesurables."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le maillon faible et sa cause sont identifiés.",
        "Les recommandations sont priorisées, justifiées, mesurables.",
        "Aucun résultat garanti n'est promis.",
      ],
      resources: ["Matrice impact/effort globale (ressource interne)"],
      glossary: [{ term: "Diagnostic global", definition: "Analyse du maillon faible à l'échelle de toute la stratégie." }],
      summary:
        "Le diagnostic global identifie le maillon le plus faible et sa cause profonde, priorise les actions par impact/effort à l'échelle de la stratégie, et débouche sur des recommandations claires, justifiées et mesurables.",
      selfAssessment: [
        "Ai-je identifié mon maillon faible et sa cause ?",
        "Mes recommandations sont-elles précises et mesurables ?",
      ],
      quiz: { id: "mkt-v2-m8-l4-qz", questionIds: ["mkt-v2-m8-q05", "mkt-v2-m8-q04"], passThreshold: 70 },
      keyTakeaways: [
        "Une chaîne vaut son maillon le plus faible.",
        "On remonte du symptôme à la cause.",
        "Recommandations précises, justifiées, mesurables.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 22 maîtrisée. Passez à la finalisation du projet (semaine 23)." },
        { condition: "score < 70", message: "Revoyez le diagnostic du maillon faible et la priorisation globale." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 22 + le quiz hebdomadaire avant la semaine 23.",
    },

    // ══════════ SEMAINE 23 — FINALISATION ET PRÉSENTATION DU PROJET ══════════
    {
      id: "mkt-v2-m8-l5",
      module: 8,
      week: 23,
      title: "Assembler le dossier intégrateur complet",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le projet intégrateur réunit toutes les sections produites au fil du programme. Cette leçon apprend à l'assembler en un dossier professionnel cohérent, complet et étayé.",
      objectives: [
        "Structurer le dossier intégrateur complet",
        "Assurer cohérence, complétude et étayage par les preuves",
        "Distinguer faits, hypothèses et données simulées",
        "Vérifier la qualité éditoriale et l'accessibilité",
      ],
      competencies: ["C23"],
      prerequisites: ["Sections M2-M7 du projet ; audit (22.3)"],
      sections: [
        {
          heading: "La structure du dossier",
          body: [
            "Le dossier intégrateur suit une structure claire : résumé exécutif, marché et cible (M2), marque et messages (M3), acquisition et conversion (M4), commerce et expérience (M5), analytique et optimisation (M6), croissance durable (M7), recommandations et plan. Chaque section réutilise le livrable correspondant, révisé pour la cohérence globale.",
          ],
        },
        {
          heading: "Cohérence, complétude, preuves",
          body: [
            "On vérifie que le dossier est cohérent (fil conducteur), complet (aucune section clé manquante) et étayé : chaque affirmation importante s'appuie sur une donnée (simulée, identifiée), une source ou un raisonnement. Un dossier étayé convainc ; un dossier d'affirmations non soutenues laisse sceptique.",
          ],
        },
        {
          heading: "Faits, hypothèses, simulations",
          body: [
            "On distingue clairement les faits (observés), les hypothèses (à vérifier) et les données pédagogiques simulées (identifiées comme telles). Cette honnêteté intellectuelle, exigée depuis le Module 2, protège la crédibilité : mieux vaut une hypothèse marquée qu'une fausse certitude.",
          ],
        },
        {
          heading: "Qualité éditoriale et accessibilité",
          body: [
            "Le dossier est relu (clarté, orthographe, ton cohérent avec la marque), structuré (titres, sommaire) et accessible (lisibilité, contrastes si présenté visuellement). La forme sert le fond : un excellent contenu mal présenté perd de son impact.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Dossier intégrateur", definition: "Document professionnel réunissant toutes les sections du projet en une stratégie cohérente." },
        { term: "Étayage", definition: "Appui de chaque affirmation sur une donnée, une source ou un raisonnement." },
        { term: "Résumé exécutif", definition: "Synthèse d'une page présentant l'essentiel de la stratégie et des recommandations." },
      ],
      examples: [
        "Chaque section du dossier réutilise et révise le livrable du module correspondant.",
        "Affirmation étayée : « le segment cible représente ~X (source/estimation simulée), d'où… ».",
      ],
      commonError: {
        title: "Juxtaposer les livrables sans les réviser",
        body:
          "Coller les sections telles quelles, sans les réviser pour la cohérence globale, produit un dossier décousu. On révise chaque section à la lumière de l'ensemble.",
      },
      vigilancePoint: {
        title: "Honnêteté des données",
        body:
          "On identifie clairement les données simulées et les hypothèses ; on n'invente aucune performance ni source. La crédibilité repose sur cette honnêteté.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada) — Jeu de données pédagogique fictif",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO avait d'excellentes sections mais un dossier décousu, avec des affirmations non étayées et des chiffres non identifiés comme simulés.",
          "En assemblant un dossier structuré, cohérent, étayé et honnête (faits/hypothèses/simulations distingués), InfusiO a obtenu un livrable professionnel et crédible. L'assemblage soigné a révélé la valeur du travail.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l5-ia1",
          title: "Distinguer fait, hypothèse et simulation",
          objective: "Classer des énoncés d'un dossier.",
          instructions: [
            "Classez : (a) « nos analytics montrent 2 % de conversion » ; (b) « nous supposons que le prix est un frein » ; (c) « jeu de données pédagogique fictif : LTV estimée à 300 $ ».",
          ],
          answerKey: ["(a) fait (observé) ; (b) hypothèse (à vérifier) ; (c) donnée simulée (identifiée)."],
          feedback: "On étiquette clairement faits, hypothèses et données simulées.",
          successCriterion: "Les 3 correctement classés.",
        },
      ],
      exercise: {
        title: "Assemblage du dossier intégrateur",
        prompt: [
          "Assemblez le plan complet de votre dossier intégrateur (toutes les sections M2-M7 révisées + résumé exécutif + recommandations).",
          "Vérifiez cohérence, complétude, étayage et distinction faits/hypothèses/simulations.",
        ],
        deliverables: ["Le dossier intégrateur assemblé (structure complète, sections révisées, données identifiées)."],
        estimatedMinutes: 90,
      },
      successCriteria: [
        "Le dossier est structuré, cohérent et complet.",
        "Les affirmations sont étayées.",
        "Faits, hypothèses et simulations sont distingués.",
      ],
      resources: ["Gabarit de dossier intégrateur (ressource interne)"],
      glossary: [{ term: "Complétude", definition: "Présence de toutes les sections clés du dossier." }],
      summary:
        "Le dossier intégrateur réunit et révise toutes les sections en un document structuré, cohérent, complet et étayé, distinguant faits, hypothèses et données simulées — la forme au service du fond.",
      selfAssessment: [
        "Mon dossier est-il cohérent, complet et étayé ?",
        "Ai-je distingué faits, hypothèses et simulations ?",
      ],
      quiz: { id: "mkt-v2-m8-l5-qz", questionIds: ["mkt-v2-m8-q06", "mkt-v2-m8-q07"], passThreshold: 70 },
      keyTakeaways: [
        "On révise chaque section à la lumière de l'ensemble.",
        "Chaque affirmation importante est étayée.",
        "Faits, hypothèses et simulations restent distingués.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à rédiger le résumé exécutif (leçon 23.2)." },
        { condition: "score < 70", message: "Revoyez la structure du dossier et l'étayage." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 23.2.",
    },
    {
      id: "mkt-v2-m8-l6",
      module: 8,
      week: 23,
      title: "Résumé exécutif et recommandation stratégique",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le résumé exécutif est souvent la seule partie lue par un décideur. Cette leçon apprend à condenser l'essentiel de la stratégie et à formuler une recommandation convaincante et honnête.",
      objectives: [
        "Rédiger un résumé exécutif clair et complet en une page",
        "Formuler une recommandation stratégique justifiée",
        "Hiérarchiser l'information (l'essentiel d'abord)",
        "Rester honnête sur les limites et hypothèses",
      ],
      competencies: ["C23"],
      prerequisites: ["Leçon 23.1 ; copywriting (M3)"],
      sections: [
        {
          heading: "Le rôle du résumé exécutif",
          body: [
            "Le résumé exécutif condense en une page l'essentiel : le contexte, le problème, la stratégie proposée, les résultats attendus (prudents) et la recommandation principale. Il doit se suffire à lui-même : un décideur pressé doit comprendre la stratégie et la décision sans lire tout le dossier.",
          ],
        },
        {
          heading: "La recommandation stratégique",
          body: [
            "La recommandation dit clairement quoi faire et pourquoi, appuyée sur le diagnostic (22.4). Elle est précise (pas « faire du marketing »), justifiée (par les données/l'audit) et ordonnée (par quoi commencer). Une bonne recommandation est décisive sans être exagérée.",
          ],
        },
        {
          heading: "Hiérarchiser l'information",
          body: [
            "On place l'essentiel en premier (principe de la pyramide inversée) : la conclusion et la recommandation avant les détails. Le lecteur doit saisir le message clé dès les premières lignes. Noyer la recommandation en fin de document la rend invisible.",
          ],
        },
        {
          heading: "Honnêteté sur les limites",
          body: [
            "Un bon résumé reconnaît ses limites et hypothèses (données simulées, incertitudes) plutôt que de projeter une fausse certitude. Cette honnêteté renforce la crédibilité : un décideur fait davantage confiance à une analyse qui connaît ses limites qu'à une promesse trop belle.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Résumé exécutif", definition: "Synthèse d'une page se suffisant à elle-même (contexte, stratégie, recommandation)." },
        { term: "Pyramide inversée", definition: "Structure plaçant l'essentiel (conclusion, recommandation) en premier." },
        { term: "Recommandation stratégique", definition: "Décision proposée, précise, justifiée et ordonnée." },
      ],
      examples: [
        "Résumé : « Contexte X ; problème Y ; nous recommandons Z, car [données] ; résultats attendus prudents… ».",
        "Recommandation ordonnée : « commencer par améliorer l'activation, puis diversifier l'acquisition ».",
      ],
      commonError: {
        title: "Cacher la recommandation à la fin",
        body:
          "Enterrer la recommandation en fin de document la rend invisible pour un lecteur pressé. On place l'essentiel en premier.",
      },
      vigilancePoint: {
        title: "Pas de projection exagérée",
        body:
          "On ne promet pas de résultats garantis. Les résultats attendus sont prudents, fondés sur des données simulées identifiées, avec leurs limites.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Studio Lumen (services, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le studio fictif Lumen noyait sa recommandation en fin de dossier et projetait des résultats irréalistes.",
          "En plaçant un résumé exécutif clair en tête (recommandation d'abord), fondé sur des données simulées et honnête sur ses limites, Lumen a rendu sa stratégie immédiatement compréhensible et crédible. L'essentiel en premier a changé la réception du dossier.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l6-ia1",
          title: "Améliorer un résumé exécutif",
          objective: "Réorganiser pour placer l'essentiel en premier.",
          instructions: [
            "Un résumé commence par 3 paragraphes de contexte et finit par la recommandation. Comment l'améliorer ?",
          ],
          answerKey: [
            "Placer la recommandation et la conclusion en tête (pyramide inversée), résumer le contexte, et ajouter les limites/hypothèses — pour qu'un lecteur pressé saisisse l'essentiel immédiatement.",
          ],
          feedback: "L'essentiel d'abord ; le contexte se résume.",
          successCriterion: "Réorganisation plaçant la recommandation en tête proposée.",
        },
      ],
      exercise: {
        title: "Résumé exécutif du projet",
        prompt: [
          "Rédigez le résumé exécutif d'une page de votre projet : contexte, problème, stratégie, recommandation principale, résultats attendus prudents, limites.",
          "Placez la recommandation en tête.",
        ],
        deliverables: ["Un résumé exécutif d'une page (recommandation en tête, honnête sur les limites)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "L'essentiel et la recommandation sont en tête.",
        "La recommandation est précise et justifiée.",
        "Les limites/hypothèses sont reconnues ; aucune projection exagérée.",
      ],
      resources: ["Gabarit de résumé exécutif (ressource interne)"],
      glossary: [{ term: "Décideur", definition: "Personne qui lit le résumé pour prendre une décision, souvent sans lire tout le dossier." }],
      summary:
        "Le résumé exécutif condense la stratégie en une page se suffisant à elle-même, place l'essentiel et la recommandation en premier, et reste honnête sur les limites — sans projection exagérée.",
      selfAssessment: [
        "Mon résumé se suffit-il à lui-même ?",
        "Ma recommandation est-elle en tête, précise et honnête ?",
      ],
      quiz: { id: "mkt-v2-m8-l6-qz", questionIds: ["mkt-v2-m8-q07", "mkt-v2-m8-q06"], passThreshold: 70 },
      keyTakeaways: [
        "Le résumé exécutif se suffit à lui-même.",
        "L'essentiel et la recommandation d'abord.",
        "Honnêteté sur les limites, pas de projection exagérée.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la présentation professionnelle (leçon 23.3)." },
        { condition: "score < 70", message: "Revoyez la hiérarchisation de l'information et l'honnêteté des projections." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 23.3.",
    },
    {
      id: "mkt-v2-m8-l7",
      module: 8,
      week: 23,
      title: "Présentation et pitch professionnel",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Présenter sa stratégie à l'oral est une compétence à part entière. Cette leçon applique le storytelling à la présentation d'une stratégie, avec clarté, structure et honnêteté.",
      objectives: [
        "Structurer une présentation claire et convaincante",
        "Appliquer le storytelling à une stratégie (problème → solution → impact)",
        "Adapter le propos au public et au temps imparti",
        "Répondre aux questions avec honnêteté",
      ],
      competencies: ["C23"],
      prerequisites: ["Storytelling (M3) ; résumé exécutif (23.2)"],
      sections: [
        {
          heading: "Structurer la présentation",
          body: [
            "Une présentation efficace a une structure claire : accroche (le problème et l'enjeu), stratégie (la solution proposée), preuves (données simulées, raisonnement), recommandation et prochaines étapes. On limite le nombre de messages clés (trois idées fortes valent mieux que vingt) et on soigne les transitions.",
          ],
        },
        {
          heading: "Le storytelling de la stratégie",
          body: [
            "On raconte la stratégie comme une histoire : la situation initiale et le problème du client, la transformation apportée par la stratégie, l'impact attendu. Le client (ou le marché) reste le héros ; la stratégie est le chemin. Cette narration rend la présentation mémorable, sans jamais déformer les faits.",
          ],
        },
        {
          heading: "Adapter au public et au temps",
          body: [
            "On adapte le niveau de détail au public (décideur pressé vs équipe technique) et au temps imparti. En 5 minutes, on va à l'essentiel (résumé exécutif oralisé) ; avec plus de temps, on développe. Respecter le temps et le niveau du public est une marque de professionnalisme.",
          ],
        },
        {
          heading: "Répondre honnêtement",
          body: [
            "Face aux questions, on répond avec honnêteté : reconnaître ce qu'on ne sait pas (« bonne question, cela reste à vérifier »), ne pas bluffer, et distinguer faits et hypothèses. Une réponse honnête inspire plus confiance qu'une assurance feinte. On ne promet jamais de résultats garantis.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Pitch", definition: "Présentation courte et convaincante d'une stratégie ou d'un projet." },
        { term: "Message clé", definition: "Idée forte que l'audience doit retenir (on en limite le nombre)." },
        { term: "Storytelling de stratégie", definition: "Narration problème → transformation → impact, le marché en héros." },
      ],
      examples: [
        "Pitch 5 min : accroche (problème) → stratégie → 2 preuves → recommandation → prochaines étapes.",
        "Réponse honnête : « Cette hypothèse reste à valider par un test ; voici comment nous le ferions. »",
      ],
      commonError: {
        title: "Vouloir tout dire",
        body:
          "Entasser vingt messages noie l'audience. On choisit trois idées fortes et on les sert clairement, en respectant le temps.",
      },
      vigilancePoint: {
        title: "Honnêteté à l'oral aussi",
        body:
          "On ne bluffe pas et on ne promet aucun résultat garanti. Reconnaître ses limites et distinguer faits/hypothèses renforce la crédibilité.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — TrajectO (tourisme, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "L'agence fictive TrajectO présentait sa stratégie avec des dizaines de diapositives denses et des promesses exagérées.",
          "En structurant un pitch clair (problème → stratégie → preuves → recommandation), en racontant le marché comme héros et en répondant honnêtement aux questions, TrajectO a convaincu par la clarté et la crédibilité. Moins mais mieux a plus d'impact.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l7-ia1",
          title: "Structurer un pitch de 5 minutes",
          objective: "Ordonner les éléments d'un pitch efficace.",
          instructions: ["Ordonnez : recommandation et prochaines étapes · accroche (problème) · preuves · stratégie proposée."],
          answerKey: ["accroche (problème) → stratégie proposée → preuves → recommandation et prochaines étapes."],
          feedback: "On accroche par le problème, on propose, on prouve, on recommande.",
          successCriterion: "Ordre correct.",
        },
      ],
      exercise: {
        title: "Pitch de votre stratégie",
        prompt: [
          "Préparez un pitch de 5 minutes de votre stratégie (structure claire, 3 messages clés, storytelling marché-héros).",
          "Anticipez 3 questions difficiles et préparez des réponses honnêtes.",
        ],
        deliverables: ["Un plan de pitch (5 min, 3 messages clés) + 3 réponses honnêtes à des questions difficiles."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La présentation est structurée et limitée à quelques messages clés.",
        "Le storytelling met le marché/client au centre.",
        "Les réponses préparées sont honnêtes.",
      ],
      resources: ["Gabarit de pitch (ressource interne)"],
      glossary: [{ term: "Pyramide des messages", definition: "Hiérarchie plaçant les idées clés en premier." }],
      summary:
        "Une bonne présentation structure le propos (accroche → stratégie → preuves → recommandation), raconte le marché comme héros, s'adapte au public et au temps, et répond honnêtement — sans promesse garantie.",
      selfAssessment: [
        "Mon pitch tient-il en quelques messages clés ?",
        "Mes réponses aux questions restent-elles honnêtes ?",
      ],
      quiz: { id: "mkt-v2-m8-l7-qz", questionIds: ["mkt-v2-m8-q08", "mkt-v2-m8-q07"], passThreshold: 70 },
      keyTakeaways: [
        "Trois messages clés valent mieux que vingt.",
        "Le marché/client est le héros du récit.",
        "Honnêteté à l'oral : pas de bluff, pas de garantie.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la revue par les pairs (leçon 23.4)." },
        { condition: "score < 70", message: "Revoyez la structure du pitch et l'honnêteté des réponses." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 23.4.",
    },
    {
      id: "mkt-v2-m8-l8",
      module: 8,
      week: 23,
      title: "Revue par les pairs et amélioration finale",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Un regard extérieur révèle ce qu'on ne voit plus. Cette leçon présente la revue par les pairs constructive et l'intégration des retours pour améliorer le projet.",
      objectives: [
        "Donner une rétroaction constructive et respectueuse",
        "Recevoir la critique sans se braquer",
        "Prioriser et intégrer les retours pertinents",
        "Utiliser une grille de revue objective",
      ],
      competencies: ["C23"],
      prerequisites: ["Dossier assemblé (23.1) et pitch (23.3)"],
      sections: [
        {
          heading: "Une rétroaction constructive",
          body: [
            "Une bonne rétroaction est spécifique (pointe un élément précis), équilibrée (forces et pistes d'amélioration), respectueuse et orientée solution. On critique le travail, jamais la personne. « La recommandation gagnerait à préciser le délai » vaut mieux que « c'est flou ».",
          ],
        },
        {
          heading: "Recevoir la critique",
          body: [
            "Recevoir un retour sans se braquer est une compétence : on écoute, on cherche à comprendre plutôt qu'à se défendre, on remercie. Tous les retours ne sont pas justes, mais chacun mérite d'être considéré. La critique bien reçue est une occasion d'améliorer, pas une attaque.",
          ],
        },
        {
          heading: "Prioriser et intégrer",
          body: [
            "On ne peut pas tout corriger. On priorise les retours qui touchent la cohérence, la clarté ou une faiblesse majeure, et on intègre ceux qui améliorent réellement le projet. On documente ce qu'on retient et pourquoi. Intégrer les bons retours renforce le projet ; suivre tous les avis le disperse.",
          ],
        },
        {
          heading: "Une grille de revue",
          body: [
            "Une grille objective (cohérence, complétude, étayage, clarté, faisabilité, éthique) rend la revue systématique et équitable, entre pairs comme pour l'auto-évaluation. Elle évite les jugements vagues et guide vers des améliorations concrètes.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Revue par les pairs", definition: "Évaluation constructive d'un travail par d'autres apprenants selon une grille." },
        { term: "Rétroaction constructive", definition: "Retour spécifique, équilibré, respectueux et orienté solution." },
        { term: "Grille de revue", definition: "Critères objectifs (cohérence, clarté, étayage, éthique…) guidant l'évaluation." },
      ],
      examples: [
        "Retour constructif : « La section acquisition est solide ; la rétention gagnerait à chiffrer un objectif. »",
        "Grille : noter cohérence, complétude, étayage, clarté, faisabilité, éthique.",
      ],
      commonError: {
        title: "Se braquer ou tout accepter",
        body:
          "Rejeter en bloc la critique, ou au contraire suivre tous les avis sans discernement, nuisent au projet. On écoute, on priorise, on intègre les retours pertinents.",
      },
      vigilancePoint: {
        title: "Critiquer le travail, pas la personne",
        body:
          "La rétroaction porte sur le travail, avec respect. On ne juge jamais la personne ; une revue bienveillante est plus utile qu'une critique blessante.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Racine & Sol (organisme, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Dans l'organisme fictif Racine & Sol, les revues internes viraient au règlement de comptes ou à la complaisance.",
          "En adoptant une grille objective et une culture de rétroaction constructive (spécifique, respectueuse), l'équipe a transformé ses revues en un levier d'amélioration. Recevoir et intégrer les bons retours a renforcé chaque projet.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l8-ia1",
          title: "Reformuler une critique en rétroaction constructive",
          objective: "Transformer un jugement vague en retour utile.",
          instructions: [
            "Reformulez de façon constructive : « Ta section analytique est nulle. »",
          ],
          answerKey: [
            "Exemple : « La section analytique a de bonnes idées ; elle gagnerait à relier chaque indicateur à une décision et à distinguer les données simulées. » — spécifique, équilibré, orienté solution.",
          ],
          feedback: "On pointe un élément précis, on équilibre, on oriente vers la solution ; on ne juge pas la personne.",
          successCriterion: "Reformulation spécifique, respectueuse, orientée solution.",
        },
      ],
      exercise: {
        title: "Revue croisée et plan d'amélioration",
        prompt: [
          "À l'aide d'une grille (cohérence, complétude, étayage, clarté, faisabilité, éthique), évaluez un projet (le vôtre en auto-revue ou celui d'un pair).",
          "Produisez un plan d'amélioration priorisé à partir des retours.",
        ],
        deliverables: ["Une revue selon grille + un plan d'amélioration priorisé du projet."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La rétroaction est spécifique, équilibrée et respectueuse.",
        "Les retours sont priorisés et intégrés avec discernement.",
        "La grille de revue est appliquée.",
      ],
      resources: ["Grille de revue par les pairs (ressource interne)"],
      glossary: [{ term: "Auto-revue", definition: "Application de la grille de revue à son propre travail." }],
      summary:
        "La revue par les pairs, guidée par une grille objective, offre une rétroaction constructive ; on reçoit la critique ouvertement, on priorise et on intègre les retours pertinents pour améliorer le projet.",
      selfAssessment: [
        "Est-ce que je donne des retours spécifiques et respectueux ?",
        "Est-ce que j'intègre la critique avec discernement ?",
      ],
      quiz: { id: "mkt-v2-m8-l8-qz", questionIds: ["mkt-v2-m8-q09", "mkt-v2-m8-q08"], passThreshold: 70 },
      keyTakeaways: [
        "Une rétroaction utile est spécifique, équilibrée, respectueuse.",
        "On reçoit la critique sans se braquer, on priorise.",
        "Une grille objective rend la revue équitable.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 23 maîtrisée. Passez au portfolio et à l'examen (semaine 24)." },
        { condition: "score < 70", message: "Revoyez les principes de la rétroaction constructive." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 23 + le quiz hebdomadaire avant la semaine 24.",
    },

    // ══════════ SEMAINE 24 — PORTFOLIO, EXAMEN FINAL ET DÉVELOPPEMENT PROFESSIONNEL ══════════
    {
      id: "mkt-v2-m8-l9",
      module: 8,
      week: 24,
      title: "Portfolio professionnel et preuve de compétences",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Un portfolio démontre concrètement ce qu'on sait faire. Cette leçon apprend à constituer un portfolio professionnel à partir des livrables du programme.",
      objectives: [
        "Comprendre le rôle d'un portfolio",
        "Sélectionner et présenter les meilleurs livrables comme preuves",
        "Relier livrables et compétences",
        "Respecter confidentialité et honnêteté",
      ],
      competencies: ["C24"],
      prerequisites: ["Livrables des Modules 1 à 8"],
      sections: [
        {
          heading: "Le rôle du portfolio",
          body: [
            "Un portfolio rassemble des preuves concrètes de compétences : projets, analyses, réalisations. Il est plus convaincant qu'une liste de diplômes, car il montre ce qu'on sait faire. Pour un professionnel du marketing, le projet intégrateur et ses sections constituent un portfolio de départ solide.",
          ],
        },
        {
          heading: "Sélectionner les preuves",
          body: [
            "On sélectionne les livrables les plus démonstratifs et variés (stratégie, analyse de données, création, plan de croissance) plutôt que de tout inclure. Chaque pièce est présentée avec son contexte (le problème, la démarche, le résultat) pour que le lecteur comprenne la valeur du travail.",
          ],
        },
        {
          heading: "Relier livrables et compétences",
          body: [
            "On relie explicitement chaque livrable aux compétences démontrées (analyse de marché → C5/C6, campagne → C12, analytique → C17…). Cela aide le lecteur (recruteur, client) à voir précisément ce qu'on maîtrise. Un portfolio annoté par compétences est plus lisible.",
          ],
        },
        {
          heading: "Confidentialité et honnêteté",
          body: [
            "On respecte la confidentialité (pas de données réelles sensibles sans autorisation) et l'honnêteté (on ne présente pas un travail d'équipe comme entièrement sien, on identifie les données simulées). Un portfolio malhonnête se retourne contre son auteur ; l'authenticité est la meilleure stratégie.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Portfolio", definition: "Ensemble de preuves concrètes de compétences (projets, analyses, réalisations)." },
        { term: "Preuve de compétence", definition: "Livrable démontrant concrètement une capacité." },
        { term: "Annotation par compétences", definition: "Association explicite d'un livrable aux compétences qu'il démontre." },
      ],
      examples: [
        "Portfolio : dossier intégrateur + analyse de tunnel + plan de croissance, chacun avec contexte.",
        "Annotation : « Analyse de cohortes → compétence C17 (analytique avancée). »",
      ],
      commonError: {
        title: "Tout inclure sans contexte",
        body:
          "Empiler tous les livrables sans sélection ni contexte noie les meilleures pièces. On choisit, on annote et on explique la valeur de chacune.",
      },
      vigilancePoint: {
        title: "Honnêteté et confidentialité",
        body:
          "On n'inclut pas de données réelles sensibles sans autorisation, on identifie les données simulées, et on n'attribue pas un travail collectif à soi seul. L'authenticité prime.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Néva Cosmétiques (e-commerce, Canada) — Jeu de données pédagogique fictif",
        region: "canadienne",
        isFictional: true,
        body: [
          "Une professionnelle fictive ayant travaillé sur la marque Néva incluait tous ses fichiers sans tri ni contexte dans son portfolio.",
          "En sélectionnant 3 pièces démonstratives, en les présentant avec leur contexte et en les reliant aux compétences (le tout avec données simulées identifiées), elle a obtenu un portfolio clair et convaincant. La sélection et l'annotation ont fait la différence.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l9-ia1",
          title: "Relier un livrable à une compétence",
          objective: "Associer des livrables aux compétences démontrées.",
          instructions: [
            "Associez : (1) une analyse de marché ; (2) un dossier de campagne publicitaire ; (3) un tableau de bord analytique.",
            "Compétences : analytique avancée · étude de marché/client · campagnes publicitaires.",
          ],
          answerKey: ["1 → étude de marché/client ; 2 → campagnes publicitaires ; 3 → analytique avancée."],
          feedback: "Chaque livrable démontre une ou des compétences précises.",
          successCriterion: "Les 3 associations correctes.",
        },
      ],
      exercise: {
        title: "Portfolio professionnel",
        prompt: [
          "Sélectionnez 3-4 livrables de votre projet pour un portfolio, chacun présenté avec contexte (problème, démarche, résultat).",
          "Annotez chaque pièce par les compétences démontrées.",
        ],
        deliverables: ["Un portfolio (3-4 pièces contextualisées et annotées par compétences)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les pièces sont sélectionnées et contextualisées.",
        "Chaque pièce est reliée à des compétences.",
        "Confidentialité et honnêteté sont respectées.",
      ],
      resources: ["Gabarit de portfolio (ressource interne)"],
      glossary: [{ term: "Contexte d'un livrable", definition: "Problème, démarche et résultat expliquant la valeur d'une pièce." }],
      summary:
        "Un portfolio démontre des compétences par des preuves concrètes : on sélectionne les meilleurs livrables, on les contextualise, on les relie aux compétences, dans le respect de la confidentialité et de l'honnêteté.",
      selfAssessment: [
        "Mes pièces sont-elles sélectionnées, contextualisées et annotées ?",
        "Mon portfolio est-il honnête et respectueux de la confidentialité ?",
      ],
      quiz: { id: "mkt-v2-m8-l9-qz", questionIds: ["mkt-v2-m8-q11", "mkt-v2-m8-q12"], passThreshold: 70 },
      keyTakeaways: [
        "Un portfolio montre ce qu'on sait faire, pas seulement des diplômes.",
        "On sélectionne, contextualise et annote par compétences.",
        "Authenticité et confidentialité avant tout.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à préparer l'examen final (leçon 24.2)." },
        { condition: "score < 70", message: "Revoyez la sélection et l'annotation du portfolio." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 24.2.",
    },
    {
      id: "mkt-v2-m8-l10",
      module: 8,
      week: 24,
      title: "Préparation à l'examen final",
      authored: true,
      durationMinutes: 90,
      introduction:
        "L'examen final couvre l'ensemble du programme. Cette leçon présente une méthode de révision transversale efficace et honnête, sans triche ni bachotage stérile.",
      objectives: [
        "Réviser de façon transversale (les 8 modules)",
        "Prioriser les concepts clés et les calculs",
        "Utiliser la répétition espacée et l'auto-test",
        "Aborder l'examen avec méthode et intégrité",
      ],
      competencies: ["C24"],
      prerequisites: ["Modules 1 à 7 ; synthèse (22.1)"],
      sections: [
        {
          heading: "Réviser de façon transversale",
          body: [
            "L'examen final (60 questions) porte sur tout le programme. On révise par thèmes transversaux (les fondamentaux, le client, la marque, l'acquisition, la vente, la mesure, la croissance) plutôt que module par module isolément. Relier les concepts (comme la chaîne stratégique de 22.1) ancre mieux les connaissances.",
          ],
        },
        {
          heading: "Prioriser concepts et calculs",
          body: [
            "On identifie les concepts clés (funnel, persona, positionnement, CAC/LTV, tunnel, cohortes, économie unitaire) et on s'assure de maîtriser les calculs récurrents (taux de conversion, CPA, ROAS, marge, LTV/CAC). Les calculs bien maîtrisés sont des points sûrs à l'examen.",
          ],
        },
        {
          heading: "Répétition espacée et auto-test",
          body: [
            "La répétition espacée (réviser à intervalles croissants) et l'auto-test (se poser des questions, refaire des quiz) sont plus efficaces que la relecture passive. Se tester révèle ce qu'on ne maîtrise pas encore et renforce la mémorisation. Les quiz formatifs du programme sont un bon support.",
          ],
        },
        {
          heading: "Méthode et intégrité",
          body: [
            "Le jour de l'examen : lire attentivement, gérer son temps (120 minutes pour 60 questions), ne pas rester bloqué, vérifier ses calculs. L'intégrité est non négociable : aucune triche, aucune aide non autorisée. Un résultat honnête reflète réellement ses compétences ; un résultat truqué ne sert à rien.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Révision transversale", definition: "Révision par thèmes reliant plusieurs modules, plutôt qu'isolément." },
        { term: "Répétition espacée", definition: "Révision à intervalles croissants, plus efficace que la relecture massée." },
        { term: "Auto-test", definition: "Se poser des questions pour évaluer et renforcer sa maîtrise." },
      ],
      examples: [
        "Fiche transversale « indicateurs » : conversion, CPA, ROAS, marge, LTV/CAC, rétention.",
        "Refaire les quiz de modules en conditions d'auto-test.",
      ],
      commonError: {
        title: "La relecture passive",
        body:
          "Relire ses notes sans se tester donne une fausse impression de maîtrise. L'auto-test et la répétition espacée sont bien plus efficaces.",
      },
      vigilancePoint: {
        title: "Intégrité de l'examen",
        body:
          "Aucune triche ni aide non autorisée. Un résultat doit refléter réellement les compétences. Le score interne n'est pas une note officielle externe.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (détail, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Un apprenant fictif préparant l'examen relisait passivement ses notes la veille, sans se tester.",
          "En adoptant une révision transversale, l'auto-test avec les quiz du programme et la répétition espacée sur plusieurs jours, il a mieux mémorisé et abordé l'examen avec méthode et sérénité. Se tester a remplacé la relecture stérile.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l10-ia1",
          title: "Construire une fiche de révision transversale",
          objective: "Regrouper des concepts par thème transversal.",
          instructions: [
            "Regroupez sous le thème « rentabilité » les concepts pertinents parmi : CAC, LTV, ROAS, marge, persona, couleur du logo, seuil de rentabilité.",
          ],
          answerKey: ["Thème rentabilité : CAC, LTV, ROAS, marge, seuil de rentabilité (le persona et la couleur du logo relèvent d'autres thèmes)."],
          feedback: "On regroupe par thème transversal pour réviser en reliant les concepts.",
          successCriterion: "Concepts de rentabilité correctement regroupés.",
        },
      ],
      exercise: {
        title: "Plan de révision de l'examen final",
        prompt: [
          "Construisez un plan de révision transversal (thèmes + concepts + calculs clés) sur plusieurs jours (répétition espacée).",
          "Refaites un quiz d'auto-test et notez vos points faibles à revoir.",
        ],
        deliverables: ["Un plan de révision transversal + un bilan d'auto-test (points faibles identifiés)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La révision est transversale et priorise concepts/calculs.",
        "L'auto-test et la répétition espacée sont utilisés.",
        "L'intégrité est respectée.",
      ],
      resources: ["Fiches de révision transversales (ressource interne)", "Quiz des Modules 1 à 7 (auto-test)"],
      glossary: [{ term: "Bachotage", definition: "Révision intensive de dernière minute, peu efficace pour la mémorisation durable." }],
      summary:
        "On prépare l'examen final par une révision transversale reliant les modules, en priorisant concepts et calculs, avec répétition espacée et auto-test, et on l'aborde avec méthode et intégrité.",
      selfAssessment: [
        "Est-ce que je me teste au lieu de relire passivement ?",
        "Ma révision relie-t-elle les modules par thèmes ?",
      ],
      quiz: { id: "mkt-v2-m8-l10-qz", questionIds: ["mkt-v2-m8-q13", "mkt-v2-m8-q14"], passThreshold: 70 },
      keyTakeaways: [
        "Réviser par thèmes transversaux, pas module isolé.",
        "Auto-test + répétition espacée > relecture passive.",
        "Méthode et intégrité le jour de l'examen.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour l'éthique professionnelle et l'apprentissage continu (leçon 24.3)." },
        { condition: "score < 70", message: "Revoyez les méthodes de révision efficaces." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 24.3.",
    },
    {
      id: "mkt-v2-m8-l11",
      module: 8,
      week: 24,
      title: "Éthique professionnelle et apprentissage continu",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le marketing évolue vite et engage la responsabilité. Cette leçon consolide l'éthique professionnelle et pose les bases d'un apprentissage continu, y compris l'usage responsable de l'IA.",
      objectives: [
        "Synthétiser les principes d'éthique professionnelle du programme",
        "Reconnaître ses responsabilités (vérité, vie privée, non-manipulation)",
        "Organiser une veille et un apprentissage continu",
        "Utiliser l'IA de façon responsable dans sa pratique",
      ],
      competencies: ["C24"],
      prerequisites: ["Encadrés éthiques des Modules 1 à 7"],
      sections: [
        {
          heading: "L'éthique professionnelle en synthèse",
          body: [
            "Tout au long du programme, des principes éthiques sont revenus : vérité (pas de surpromesse, pas de faux témoignage), respect de la vie privée (consentement, minimisation), non-manipulation (pas de fausse urgence ni de dark pattern), transparence (partenariats, allégations), inclusion et accessibilité, et honnêteté des données. Ces principes ne sont pas des contraintes externes : ils fondent la confiance, condition de toute réussite durable.",
          ],
        },
        {
          heading: "Ses responsabilités",
          body: [
            "Un professionnel du marketing est responsable de ce qu'il diffuse : véracité des messages, respect des personnes et de leurs données, absence de manipulation. Face à une demande contraire à l'éthique (exagérer, tromper), on la refuse et on propose une alternative honnête. La responsabilité individuelle protège le public et la profession.",
          ],
        },
        {
          heading: "Apprentissage continu et veille",
          body: [
            "Le marketing numérique change constamment (canaux, outils, règles). Un professionnel organise une veille (sources fiables, communautés, formations) et un apprentissage continu. Ce qui compte n'est pas de tout savoir, mais de savoir apprendre : les fondamentaux (client, valeur, mesure) restent, les outils changent.",
          ],
        },
        {
          heading: "IA responsable dans la pratique",
          body: [
            "L'IA (M3, M6) est un accélérateur puissant, à utiliser sous supervision humaine : vérification des faits, protection des données, transparence, contrôle des biais, pas de décision irréversible automatisée. Un professionnel responsable garde le jugement et la responsabilité ; l'IA assiste, elle ne remplace ni l'éthique ni la responsabilité humaine.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Éthique professionnelle", definition: "Principes de vérité, respect, non-manipulation et transparence guidant la pratique." },
        { term: "Veille", definition: "Suivi organisé des évolutions du domaine à partir de sources fiables." },
        { term: "Apprentissage continu", definition: "Démarche permanente de mise à jour des compétences." },
      ],
      examples: [
        "Refuser une demande d'exagérer un bénéfice et proposer une formulation honnête et vérifiable.",
        "Veille : suivre quelques sources fiables et se former régulièrement sur les évolutions.",
      ],
      commonError: {
        title: "Croire l'éthique optionnelle",
        body:
          "Traiter l'éthique comme un supplément qu'on néglige « pour la performance » détruit la confiance et expose juridiquement. L'éthique est la base de la réussite durable.",
      },
      vigilancePoint: {
        title: "Responsabilité humaine sur l'IA",
        body:
          "L'IA n'exonère jamais de la responsabilité : vérification humaine, protection des données, transparence. Aucune décision irréversible automatisée sans validation.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — OutiPro (B2B, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "Un professionnel fictif chez OutiPro subissait la pression d'exagérer les résultats et d'utiliser l'IA sans vérification.",
          "En s'appuyant sur des principes éthiques clairs (vérité, vérification des faits, responsabilité humaine sur l'IA) et en organisant sa veille, il a maintenu une pratique honnête et à jour. L'éthique et l'apprentissage continu ont soutenu une carrière durable.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l11-ia1",
          title: "Réagir à une demande contraire à l'éthique",
          objective: "Proposer une réponse professionnelle et honnête.",
          instructions: [
            "On vous demande d'écrire « résultats garantis » et d'ajouter de faux avis. Que répondez-vous ?",
          ],
          answerKey: [
            "Refuser la surpromesse et les faux avis (trompeurs, souvent illégaux) et proposer une alternative honnête : bénéfices réels prouvés, vrais témoignages consentis, garantie honnête.",
          ],
          feedback: "On refuse la tromperie et on propose une alternative véridique et vérifiable.",
          successCriterion: "Refus argumenté + alternative honnête proposée.",
        },
      ],
      exercise: {
        title: "Charte éthique et plan de veille",
        prompt: [
          "Rédigez votre charte éthique professionnelle (5-7 principes issus du programme).",
          "Établissez un plan de veille et d'apprentissage continu (sources, rythme) incluant l'usage responsable de l'IA.",
        ],
        deliverables: ["Une charte éthique personnelle + un plan de veille/apprentissage continu (IA responsable incluse)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La charte couvre les principes éthiques clés du programme.",
        "Le plan de veille est réaliste et régulier.",
        "L'usage de l'IA est responsable (supervision, vérification).",
      ],
      resources: ["Notes de cours — éthique professionnelle (ressource interne)"],
      glossary: [{ term: "Déontologie", definition: "Ensemble des devoirs et principes éthiques d'une profession." }],
      summary:
        "L'éthique professionnelle (vérité, vie privée, non-manipulation, transparence) fonde la confiance et la réussite durable ; l'apprentissage continu et l'usage responsable de l'IA, sous responsabilité humaine, complètent la posture professionnelle.",
      selfAssessment: [
        "Mes principes éthiques sont-ils clairs et tenus ?",
        "Ai-je un plan de veille et un usage responsable de l'IA ?",
      ],
      quiz: { id: "mkt-v2-m8-l11-qz", questionIds: ["mkt-v2-m8-q15", "mkt-v2-m8-q16"], passThreshold: 70 },
      keyTakeaways: [
        "L'éthique fonde la confiance et la réussite durable.",
        "On refuse la tromperie et on propose une alternative honnête.",
        "Apprentissage continu + IA responsable sous responsabilité humaine.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour l'examen final et le bilan (leçon 24.4)." },
        { condition: "score < 70", message: "Revoyez la synthèse éthique et l'usage responsable de l'IA." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 24.4.",
    },
    {
      id: "mkt-v2-m8-l12",
      module: 8,
      week: 24,
      title: "Examen final, bilan et prochaines étapes",
      authored: true,
      durationMinutes: 120,
      introduction:
        "Cette leçon finale encadre la passation de l'examen final, dresse le bilan du parcours et prépare un plan de développement professionnel personnalisé.",
      objectives: [
        "Passer l'examen final dans de bonnes conditions",
        "Interpréter honnêtement ses résultats (score interne)",
        "Dresser le bilan de ses compétences acquises",
        "Formuler un plan de développement professionnel",
      ],
      competencies: ["C24"],
      prerequisites: ["Toutes les leçons du programme ; préparation (24.2)"],
      sections: [
        {
          heading: "La passation de l'examen final",
          body: [
            "L'examen final comporte 60 questions en 120 minutes, sélectionnées depuis la banque cumulée du programme, avec un seuil de réussite de 60 %. La correction est automatique côté serveur (les bonnes réponses ne sont jamais exposées au client). On applique la méthode et l'intégrité vues en 24.2 : lecture attentive, gestion du temps, vérification, aucune triche.",
          ],
        },
        {
          heading: "Interpréter ses résultats",
          body: [
            "Le score obtenu est un indicateur pédagogique interne (/100), reflétant la maîtrise des concepts du programme. Il n'est pas une note officielle externe ni une garantie d'emploi ou de revenu. Un échec partiel indique des points à retravailler (avec un parcours de révision), pas une fin de parcours : l'apprentissage continue.",
          ],
        },
        {
          heading: "Le bilan des compétences",
          body: [
            "On dresse le bilan des compétences acquises (C1–C24) : ce qu'on maîtrise, ce qui reste à consolider. Ce bilan honnête, appuyé sur le portfolio et l'examen, oriente la suite : il montre ses forces à valoriser et ses axes de progression. Se connaître est le point de départ de tout développement.",
          ],
        },
        {
          heading: "Plan de développement professionnel",
          body: [
            "On formule un plan : objectifs professionnels, compétences à approfondir, veille et formations à suivre, expériences à acquérir, et éventuellement les prochaines formations (le moteur académique ARCADINS accueillera d'autres programmes). Ce plan transforme la fin du cours en un début : la formation ouvre un chemin, elle ne le clôt pas.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Examen final", definition: "Évaluation transversale (60 questions, 120 min, seuil 60 %), corrigée côté serveur." },
        { term: "Bilan de compétences", definition: "Évaluation honnête de ce qu'on maîtrise et de ce qui reste à consolider." },
        { term: "Plan de développement professionnel", definition: "Objectifs, compétences, veille et expériences à acquérir après la formation." },
      ],
      examples: [
        "Score interne 74/100 : bon niveau, avec 2 axes à consolider identifiés — jeu de données pédagogique fictif.",
        "Plan : approfondir l'analytique, suivre une veille mensuelle, réaliser un projet réel.",
      ],
      commonError: {
        title: "Voir l'examen comme une fin",
        body:
          "Considérer l'examen comme l'aboutissement, plutôt qu'une étape, fait manquer l'essentiel : la formation ouvre un chemin d'apprentissage continu, elle ne le termine pas.",
      },
      vigilancePoint: {
        title: "Score interne, pas garantie",
        body:
          "Le résultat est un indicateur pédagogique interne. Il ne garantit ni emploi ni revenu, et n'est pas une reconnaissance officielle externe. Aucune promesse de ce type n'est faite.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Parcours d'un apprenant — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Un apprenant fictif termine le programme avec un bon score interne et un portfolio solide, mais sans plan pour la suite.",
          "En dressant un bilan honnête de ses compétences (forces + axes de progression) et en formulant un plan de développement (veille, approfondissement, projet réel), il a transformé la fin de la formation en tremplin. Le bilan et le plan ont donné un sens à la suite.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m8-l12-ia1",
          title: "Interpréter un résultat d'examen",
          objective: "Réagir de façon constructive à un score.",
          instructions: [
            "Jeu de données pédagogique fictif : score interne 58/100 (sous le seuil de 60 %). Que faire ?",
          ],
          answerKey: [
            "Identifier les thèmes échoués, suivre un parcours de révision ciblé, refaire des auto-tests, puis retenter — l'apprentissage continue, ce n'est pas une fin. Le score interne n'est pas une note officielle.",
          ],
          feedback: "Un échec partiel oriente la révision ; il ne clôt pas le parcours.",
          successCriterion: "Réaction constructive (révision ciblée + reprise) proposée.",
        },
      ],
      exercise: {
        title: "Bilan et plan de développement",
        prompt: [
          "Après avoir (en simulation) passé l'examen final, dressez le bilan de vos compétences (C1–C24 : forces et axes).",
          "Formulez un plan de développement professionnel (objectifs, compétences à approfondir, veille, expériences, prochaines formations).",
        ],
        deliverables: ["Un bilan de compétences honnête + un plan de développement professionnel."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Le bilan distingue forces et axes de progression.",
        "Le plan est concret et réaliste.",
        "Le score est traité comme un indicateur interne, pas une garantie.",
      ],
      resources: ["Gabarit de bilan et plan de développement (ressource interne)"],
      glossary: [{ term: "Tremplin", definition: "Point de départ vers la suite, plutôt qu'aboutissement." }],
      summary:
        "L'examen final (60 q, 120 min, seuil 60 %, correction serveur) clôt le programme ; on interprète le score comme un indicateur interne, on dresse un bilan honnête des compétences et on formule un plan de développement — la formation ouvre un chemin.",
      selfAssessment: [
        "Ai-je un bilan honnête de mes compétences ?",
        "Mon plan de développement est-il concret ?",
      ],
      quiz: { id: "mkt-v2-m8-l12-qz", questionIds: ["mkt-v2-m8-q17", "mkt-v2-m8-q20"], passThreshold: 70 },
      keyTakeaways: [
        "L'examen final est corrigé côté serveur, réponses jamais exposées.",
        "Le score est un indicateur interne, pas une garantie ni une note officielle.",
        "Le bilan et le plan de développement font de la fin un tremplin.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Programme complété. Félicitations — poursuivez votre développement continu." },
        { condition: "score < 70", message: "Revoyez l'interprétation des résultats et la construction du plan de développement." },
      ],
      progressionRule:
        "Compléter les 4 leçons de la semaine 24, le quiz hebdomadaire, le sommatif du module (≥ 70 %), le projet intégrateur final (≥ 60 %) et l'examen final (≥ 60 %) pour valider le programme.",
    },
  ],

  weeklyQuizzes: [
    {
      id: "mkt-v2-m8-week22-quiz",
      // Semaine 22 : synthèse, tableau de bord, cohérence, diagnostic (6 M8 + 2 rappels M6/M7)
      questionIds: [
        "mkt-v2-m8-q01",
        "mkt-v2-m8-q02",
        "mkt-v2-m8-q03",
        "mkt-v2-m8-q04",
        "mkt-v2-m8-q05",
        "mkt-v2-m8-q10",
        "mkt-v2-m6-q17",
        "mkt-v2-m7-q16",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m8-week23-quiz",
      // Semaine 23 : dossier, résumé, pitch, revue (6 M8 + 2 rappels M3)
      questionIds: [
        "mkt-v2-m8-q06",
        "mkt-v2-m8-q07",
        "mkt-v2-m8-q08",
        "mkt-v2-m8-q09",
        "mkt-v2-m8-q11",
        "mkt-v2-m8-q18",
        "mkt-v2-m3-q18",
        "mkt-v2-m3-q19",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m8-week24-quiz",
      // Semaine 24 : portfolio, examen, éthique, bilan (6 M8 + 2 rappels M6/M7)
      questionIds: [
        "mkt-v2-m8-q12",
        "mkt-v2-m8-q13",
        "mkt-v2-m8-q14",
        "mkt-v2-m8-q15",
        "mkt-v2-m8-q16",
        "mkt-v2-m8-q17",
        "mkt-v2-m6-q20",
        "mkt-v2-m7-q17",
      ],
      passThreshold: 70,
    },
  ],

  rubric: {
    id: "mkt-v2-m8-rubric",
    title: "Rubrique — Projet intégrateur final (stratégie complète)",
    totalPoints: 100,
    passThreshold: 60,
    criteria: [
      { label: "Cohérence stratégique de bout en bout", points: 15 },
      { label: "Complétude et étayage du dossier", points: 10 },
      { label: "Marché, client et positionnement (M2-M3)", points: 10 },
      { label: "Acquisition, vente et expérience (M4-M5)", points: 10 },
      { label: "Analytique, croissance et durabilité (M6-M7)", points: 15 },
      { label: "Diagnostic et recommandations priorisées", points: 10 },
      { label: "Résumé exécutif et présentation", points: 10 },
      { label: "Éthique, confidentialité et honnêteté des données", points: 10 },
      { label: "Portfolio et plan de développement", points: 10 },
    ],
  },

  finalExam: {
    id: "mkt-v2-final-exam",
    title: "Examen final — Marketing Digital et E-commerce (60 questions, 120 min, seuil 60 %)",
    durationMinutes: 120,
    passThreshold: 60,
    // 60 questions sélectionnées depuis la banque cumulée (M1–M8), correction serveur (réponses jamais exposées).
    questionIds: [
      // M1 (8)
      "mkt-v2-m1-q01", "mkt-v2-m1-q02", "mkt-v2-m1-q04", "mkt-v2-m1-q08", "mkt-v2-m1-q10", "mkt-v2-m1-q13", "mkt-v2-m1-q17", "mkt-v2-m1-q20",
      // M2 (8)
      "mkt-v2-m2-q01", "mkt-v2-m2-q02", "mkt-v2-m2-q05", "mkt-v2-m2-q08", "mkt-v2-m2-q10", "mkt-v2-m2-q13", "mkt-v2-m2-q16", "mkt-v2-m2-q18",
      // M3 (7)
      "mkt-v2-m3-q01", "mkt-v2-m3-q05", "mkt-v2-m3-q08", "mkt-v2-m3-q11", "mkt-v2-m3-q13", "mkt-v2-m3-q17", "mkt-v2-m3-q18",
      // M4 (7)
      "mkt-v2-m4-q01", "mkt-v2-m4-q04", "mkt-v2-m4-q07", "mkt-v2-m4-q10", "mkt-v2-m4-q13", "mkt-v2-m4-q17", "mkt-v2-m4-q19",
      // M5 (7)
      "mkt-v2-m5-q01", "mkt-v2-m5-q07", "mkt-v2-m5-q08", "mkt-v2-m5-q11", "mkt-v2-m5-q14", "mkt-v2-m5-q18", "mkt-v2-m5-q19",
      // M6 (7)
      "mkt-v2-m6-q01", "mkt-v2-m6-q06", "mkt-v2-m6-q08", "mkt-v2-m6-q11", "mkt-v2-m6-q12", "mkt-v2-m6-q16", "mkt-v2-m6-q18",
      // M7 (7)
      "mkt-v2-m7-q01", "mkt-v2-m7-q03", "mkt-v2-m7-q09", "mkt-v2-m7-q12", "mkt-v2-m7-q15", "mkt-v2-m7-q17", "mkt-v2-m7-q19",
      // M8 (9)
      "mkt-v2-m8-q01", "mkt-v2-m8-q03", "mkt-v2-m8-q05", "mkt-v2-m8-q08", "mkt-v2-m8-q10", "mkt-v2-m8-q13", "mkt-v2-m8-q15", "mkt-v2-m8-q18", "mkt-v2-m8-q20",
    ],
  },

  assessments: [
    {
      id: "mkt-v2-m8-sum",
      kind: "summative",
      title: "Sommatif Module 8 — Synthèse et intégration (20 questions)",
      passThreshold: 70,
      weightHint: "Quiz de modules (20 %)",
    },
    {
      id: "mkt-v2-m8-tp",
      kind: "practical",
      title: "Projet intégrateur final — Stratégie complète (rubrique 100 pts)",
      passThreshold: 60,
      weightHint: "Projet final (20 %)",
    },
    {
      id: "mkt-v2-m8-final-exam",
      kind: "final_exam",
      title: "Examen final — 60 questions, 120 min, seuil 60 %",
      passThreshold: 60,
      weightHint: "Examen final (15 %)",
    },
  ],
};
