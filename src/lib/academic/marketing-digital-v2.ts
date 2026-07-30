import type { ProgramCurriculumV2 } from "@/lib/academic/types";

/**
 * Cursus Marketing Digital et E-commerce — version académique v2 (24 semaines).
 *
 * PILOTE (LOT 3). Contenu en CODE, isolé du v1 (`src/lib/lessons/marketing-digital.ts` conservé intact).
 * Module 1 : AUTHORED en profondeur (exemplaire de référence). Modules 2–8 : structure complète
 * (objectifs, compétences, semaines, évaluations) ; contenu profond à rédiger module par module.
 *
 * Voir : MARKETING_24_WEEK_CURRICULUM.md, MARKETING_COMPETENCY_MATRIX.md,
 * MARKETING_ASSESSMENT_BLUEPRINT.md, MARKETING_CONTENT_GAP_REPORT.md.
 */
export const marketingDigitalV2: ProgramCurriculumV2 = {
  slug: "marketing-digital",
  programVersion: "v2",
  title: "Marketing Digital et E-commerce",
  totalWeeks: 24,
  passingScore: 70,
  weights: {
    activities: 20,
    moduleQuizzes: 20,
    practicals: 25,
    finalProject: 20,
    finalExam: 15,
  },
  exitCompetencies: Array.from({ length: 24 }, (_, i) => `C${i + 1}`),
  modules: [
    // ───────────────────────── MODULE 1 — AUTHORED ─────────────────────────
    {
      index: 1,
      title: "Fondamentaux du marketing digital",
      weeks: [1, 2, 3],
      summary:
        "Poser le socle : nature du marketing numérique, funnel AARRR, persona, canaux et indicateurs de base (CAC, LTV, conversion).",
      competencies: ["C1", "C2", "C3", "C4"],
      lessons: [
        {
          id: "mkt-v2-m1-l1",
          title: "Ce qu'est (vraiment) le marketing digital",
          objectives: [
            "Définir le marketing digital par la mesure et l'agilité",
            "Distinguer canaux numériques et traditionnels",
            "Expliquer pourquoi la donnée transforme la décision marketing",
          ],
          content: [
            "Le marketing digital regroupe l'ensemble des actions marketing menées sur des canaux numériques : moteurs de recherche, réseaux sociaux, courriel, sites web et applications mobiles. Ce qui le distingue du marketing traditionnel n'est ni son coût ni son audience, mais deux propriétés : la mesurabilité et l'agilité.",
            "La mesurabilité change tout. Une affiche ou une annonce radio ne livrent qu'une estimation approximative de leur audience. Une campagne numérique, elle, enregistre chaque impression, chaque clic, chaque achat. On sait combien coûte l'acquisition d'un client, quel canal la génère, et à quel moment du parcours un prospect abandonne. Le marketing cesse d'être un pari pour devenir une discipline pilotée par la donnée.",
            "L'agilité en découle : puisque l'on mesure en continu, on peut ajuster une campagne en cours de route — couper une annonce qui ne convertit pas, réallouer un budget vers le canal le plus rentable, tester deux messages et garder le gagnant. Cette boucle mesurer → décider → ajuster est le cœur du métier.",
            "Attention toutefois : mesurer beaucoup n'est pas mesurer utile. Un tableau de bord rempli de « j'aime » et d'abonnés qui ne sont reliés à aucun objectif d'affaires est une illusion de pilotage. Les bons indicateurs relient une dépense à un résultat (client acquis, vente, revenu).",
          ],
          activity: {
            title: "Auditer un canal existant",
            prompt: [
              "Choisissez une entreprise réelle (la vôtre, une PME que vous connaissez, ou une marque locale).",
              "Identifiez UN canal numérique qu'elle utilise et listez ce qu'elle peut y mesurer aujourd'hui.",
            ],
            deliverables: [
              "Une fiche d'une page : canal choisi, 3 indicateurs mesurables, 1 indicateur « vanité » à éviter, et pourquoi.",
            ],
            estimatedMinutes: 45,
          },
          quiz: {
            id: "mkt-v2-m1-l1-qz",
            questionIds: ["mkt-v2-m1-q01", "mkt-v2-m1-q11", "mkt-v2-m1-q17", "mkt-v2-m1-q18"],
            passThreshold: 70,
          },
          keyTakeaways: [
            "Le marketing digital se définit par la mesure et l'agilité, pas par le coût.",
            "Un bon indicateur relie une dépense à un résultat d'affaires.",
            "La boucle mesurer → décider → ajuster est le cœur du métier.",
          ],
          authored: true,
        },
        {
          id: "mkt-v2-m1-l2",
          title: "Le funnel AARRR et où il « fuit »",
          objectives: [
            "Décrire les 5 étapes du modèle AARRR",
            "Diagnostiquer l'étape où un funnel perd le plus de valeur",
            "Prioriser une action corrective au bon endroit",
          ],
          content: [
            "Le modèle AARRR — Acquisition, Activation, Rétention, Recommandation, Revenu — structure une stratégie digitale cohérente. Chaque étape a un objectif : attirer du trafic qualifié, convertir les visiteurs en clients, les faire revenir, les transformer en ambassadeurs, et générer du revenu.",
            "Ce funnel se lit comme un entonnoir : beaucoup entrent en haut (Acquisition), un sous-ensemble agit (Activation), une fraction revient (Rétention), certains recommandent (Recommandation), l'ensemble génère du chiffre d'affaires (Revenu). Le rôle du marketeur est d'identifier où le funnel fuit le plus, car c'est là qu'une amélioration a le plus d'impact.",
            "La conséquence est contre-intuitive : il est souvent inutile d'attirer plus de trafic. Si 93 % des visiteurs quittent la fiche produit sans agir, la fuite est à l'Activation ; dépenser plus en publicité ne ferait qu'amener davantage de gens vers une page qui ne convertit pas. On répare d'abord l'étape qui fuit, puis on remonte le volume.",
            "Diagnostiquer suppose de mesurer chaque étape séparément : taux de clic (Acquisition→visite), taux de conversion (visite→action), taux de retour (Rétention), taux de recommandation. Le chiffre le plus faible par rapport à son repère indique où agir.",
          ],
          activity: {
            title: "Cartographier un funnel AARRR",
            prompt: [
              "Pour l'entreprise choisie à la leçon 1, dessinez son funnel AARRR.",
              "Estimez ou hypothésez un chiffre par étape et repérez l'étape la plus faible.",
            ],
            deliverables: [
              "Un schéma AARRR annoté + une phrase justifiant l'étape à corriger en priorité.",
            ],
            estimatedMinutes: 60,
          },
          quiz: {
            id: "mkt-v2-m1-l2-qz",
            questionIds: ["mkt-v2-m1-q02", "mkt-v2-m1-q03", "mkt-v2-m1-q04", "mkt-v2-m1-q07", "mkt-v2-m1-q14"],
            passThreshold: 70,
          },
          keyTakeaways: [
            "AARRR = Acquisition, Activation, Rétention, Recommandation, Revenu.",
            "On corrige d'abord l'étape qui fuit, pas systématiquement l'Acquisition.",
            "Chaque étape se mesure séparément pour localiser la fuite.",
          ],
          authored: true,
        },
        {
          id: "mkt-v2-m1-l3",
          title: "Persona, choix des canaux et premiers indicateurs",
          objectives: [
            "Construire un persona utile (freins, habitudes, plateformes)",
            "Choisir des canaux alignés sur le persona et le cycle de vente",
            "Calculer et interpréter CAC, LTV et taux de conversion",
          ],
          content: [
            "Le persona est la représentation semi-fictive du client idéal : âge, habitudes, freins, plateformes fréquentées. Il oriente les messages et surtout le choix des canaux. L'erreur la plus fréquente et la plus coûteuse du débutant est de choisir un canal parce qu'il est « à la mode » plutôt que parce que le public cible s'y trouve.",
            "Le cycle de vente module ce choix. Un produit B2B à cycle long (plusieurs mois, plusieurs décideurs) se travaille par contenu éducatif et nurturing (LinkedIn, courriel), pas comme un achat impulsif à 20 $ sur TikTok. Le canal suit le persona ET le cycle.",
            "Trois indicateurs suffisent pour démarrer un pilotage sérieux. Le CAC (coût d'acquisition client) = dépense ÷ clients acquis : il dit combien coûte réellement un client. La LTV (valeur vie client) estime le revenu total qu'un client rapporte. Le ratio LTV/CAC juge la viabilité : un repère courant considère qu'un ratio ≥ 3 est sain.",
            "Le taux de conversion (actions ÷ visites) complète le tableau et permet de comparer des canaux de volumes différents : un canal à 100 clics et 5 ventes (5 %) convertit mieux qu'un canal à 400 clics et 8 ventes (2 %), même s'il génère moins de ventes brutes. Comparer des pourcentages, pas des volumes, évite les mauvaises décisions.",
          ],
          activity: {
            title: "Persona + tableau de bord minimal",
            prompt: [
              "Rédigez un persona d'une demi-page pour l'entreprise choisie (freins, habitudes, 2 plateformes).",
              "Proposez 3 indicateurs (dont CAC et taux de conversion) et une cible réaliste pour chacun.",
            ],
            deliverables: [
              "Une fiche persona + un mini tableau de bord (3 indicateurs, définition, cible).",
            ],
            estimatedMinutes: 75,
          },
          quiz: {
            id: "mkt-v2-m1-l3-qz",
            questionIds: [
              "mkt-v2-m1-q05",
              "mkt-v2-m1-q06",
              "mkt-v2-m1-q08",
              "mkt-v2-m1-q09",
              "mkt-v2-m1-q10",
              "mkt-v2-m1-q12",
              "mkt-v2-m1-q13",
              "mkt-v2-m1-q15",
              "mkt-v2-m1-q16",
              "mkt-v2-m1-q19",
              "mkt-v2-m1-q20",
            ],
            passThreshold: 70,
          },
          keyTakeaways: [
            "Le bon canal est celui où se trouve le persona, ajusté au cycle de vente.",
            "CAC = dépense ÷ clients ; un ratio LTV/CAC ≥ 3 est un repère sain.",
            "On compare les canaux par taux de conversion (%), pas par volume brut.",
          ],
          authored: true,
        },
      ],
      assessments: [
        {
          id: "mkt-v2-m1-sum",
          kind: "summative",
          title: "Sommatif Module 1 — Fondamentaux",
          passThreshold: 70,
          weightHint: "Quiz de modules (20 %)",
        },
        {
          id: "mkt-v2-m1-tp",
          kind: "practical",
          title: "TP1 — Diagnostic funnel + persona d'une entreprise (livrable 1/7 du projet)",
          passThreshold: 60,
          weightHint: "Travaux pratiques (25 %)",
        },
      ],
    },

    // ───────────────── MODULES 2–8 — STRUCTURE (authoring à venir) ─────────────────
    {
      index: 2,
      title: "Étude de marché, persona avancé et positionnement",
      weeks: [4, 5, 6],
      summary:
        "Module entièrement nouveau (aucun équivalent v1) : recherche de marché, analyse concurrentielle, persona approfondi, proposition de valeur et positionnement.",
      competencies: ["C5", "C6", "C7"],
      lessons: makeLessonStubs(2, [
        "Méthodes d'étude de marché (primaire/secondaire)",
        "Analyse concurrentielle et cartographie",
        "Proposition de valeur et positionnement",
      ]),
      assessments: makeModuleAssessments(2, "Étude de marché & positionnement"),
    },
    {
      index: 3,
      title: "Stratégie de marque et de contenu",
      weeks: [7, 8, 9],
      summary: "Identité de marque, ligne éditoriale, copywriting et calendrier de contenu (enrichit L7 v1).",
      competencies: ["C8", "C9", "C10"],
      lessons: makeLessonStubs(3, [
        "Identité et plateforme de marque",
        "Copywriting et messages clés",
        "Calendrier et piliers de contenu",
      ]),
      assessments: makeModuleAssessments(3, "Marque & contenu"),
    },
    {
      index: 4,
      title: "Réseaux sociaux et community management",
      weeks: [10, 11, 12],
      summary: "Stratégie par plateforme, calendrier social, animation de communauté (enrichit L4 v1). Mi-parcours en fin de module.",
      competencies: ["C11", "C12", "C13"],
      lessons: makeLessonStubs(4, [
        "Stratégie par plateforme",
        "Calendrier social et formats",
        "Community management et modération",
      ]),
      assessments: [
        ...makeModuleAssessments(4, "Réseaux sociaux"),
        {
          id: "mkt-v2-m4-midterm",
          kind: "midterm",
          title: "Évaluation de mi-parcours (diagnostic, après M4)",
          passThreshold: 70,
          weightHint: "intégré aux sommatifs",
        },
      ],
    },
    {
      index: 5,
      title: "Site web, SEO et expérience utilisateur",
      weeks: [13, 14, 15],
      summary: "Structure de site, SEO technique et éditorial, UX de conversion (approfondit L2 v1).",
      competencies: ["C14", "C15", "C16"],
      lessons: makeLessonStubs(5, [
        "Architecture de site et UX",
        "SEO technique",
        "SEO éditorial et mots-clés",
      ]),
      assessments: makeModuleAssessments(5, "Site & SEO"),
    },
    {
      index: 6,
      title: "E-commerce et optimisation de la conversion",
      weeks: [16, 17, 18],
      summary: "Création de boutique, tunnel d'achat, optimisation du taux de conversion (approfondit L5 v1).",
      competencies: ["C17", "C18", "C19"],
      lessons: makeLessonStubs(6, [
        "Créer une boutique en ligne",
        "Tunnel d'achat et paiement",
        "Optimisation de la conversion (CRO)",
      ]),
      assessments: makeModuleAssessments(6, "E-commerce & conversion"),
    },
    {
      index: 7,
      title: "Publicité, courriel et automatisation",
      weeks: [19, 20, 21],
      summary: "Google/Meta Ads, budget et ROAS, email marketing et automatisation (approfondit L3 v1).",
      competencies: ["C20", "C21", "C22"],
      lessons: makeLessonStubs(7, [
        "Publicité payante (Google & Meta Ads)",
        "Budget, enchères et ROAS",
        "Email marketing et automatisation",
      ]),
      assessments: makeModuleAssessments(7, "Publicité & automatisation"),
    },
    {
      index: 8,
      title: "Analytique, projet intégrateur et examen final",
      weeks: [22, 23, 24],
      summary: "Tableaux de bord et KPI (approfondit L6 v1), finalisation du projet intégrateur et examen final.",
      competencies: ["C23", "C24"],
      lessons: makeLessonStubs(8, [
        "Analytique et tableaux de bord",
        "Finalisation du projet intégrateur",
        "Révision et préparation à l'examen",
      ]),
      assessments: [
        ...makeModuleAssessments(8, "Analytique"),
        {
          id: "mkt-v2-final-project",
          kind: "final_project",
          title: "Projet final — Stratégie marketing & e-commerce complète (rubrique 100 pts)",
          passThreshold: 60,
          weightHint: "Projet final (20 %)",
        },
        {
          id: "mkt-v2-final-exam",
          kind: "final_exam",
          title: "Examen final — 60 questions, 120 min",
          passThreshold: 60,
          weightHint: "Examen final (15 %)",
        },
      ],
    },
  ],
};

/** Génère les stubs de leçons d'un module (structure, non « authored »). */
function makeLessonStubs(moduleIndex: number, titles: string[]) {
  return titles.map((title, i) => ({
    id: `mkt-v2-m${moduleIndex}-l${i + 1}`,
    title,
    objectives: [`Objectifs détaillés à rédiger lors de l'authoring du module ${moduleIndex}.`],
    content: [] as string[],
    keyTakeaways: [] as string[],
    authored: false,
  }));
}

/** Génère le sommatif + le TP standard d'un module. */
function makeModuleAssessments(moduleIndex: number, label: string) {
  return [
    {
      id: `mkt-v2-m${moduleIndex}-sum`,
      kind: "summative" as const,
      title: `Sommatif Module ${moduleIndex} — ${label}`,
      passThreshold: 70,
      weightHint: "Quiz de modules (20 %)",
    },
    {
      id: `mkt-v2-m${moduleIndex}-tp`,
      kind: "practical" as const,
      title: `TP${moduleIndex} — livrable ${moduleIndex}/7 du projet intégrateur`,
      passThreshold: 60,
      weightHint: "Travaux pratiques (25 %)",
    },
  ];
}
