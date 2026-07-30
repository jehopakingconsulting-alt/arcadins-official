import type { ModuleV2 } from "@/lib/academic/types";

/**
 * MODULE 4 — Acquisition, publicité numérique et conversion (semaines 10–12).
 * Programme pilote Marketing Digital et E-commerce, version académique v2.
 *
 * Transforme la marque, les personas, les messages et le calendrier (M2-M3) en un système
 * d'acquisition, de campagnes, de pages de conversion, de mesure et d'optimisation.
 * Isolé du contenu v1 ; ne modifie aucune donnée. Prépare le Module 5 (e-commerce et expérience client).
 *
 * Toute campagne est une « Simulation pédagogique — aucune diffusion réelle ». Toute donnée chiffrée est un
 * « Jeu de données pédagogique fictif ». Aucune campagne réelle, aucune dépense, aucun compte publicitaire connecté,
 * aucune performance ni promesse de résultat garanti.
 */
export const marketingDigitalV2Module4: ModuleV2 = {
  index: 4,
  title: "Acquisition, publicité numérique et conversion",
  weeks: [10, 11, 12],
  summary:
    "Attirer, convertir et mesurer : construire une stratégie d'acquisition et un entonnoir, concevoir des campagnes publicitaires (sans les lancer), créer des pages de conversion, suivre les performances (CTR, CPC, CPL, CPA, ROAS) et optimiser de façon responsable.",
  competencies: ["C11", "C12", "C13"],
  introduction:
    "Les Modules 2 et 3 ont défini à qui l'on parle, avec quelle marque et quels messages. Le Module 4 répond à : « comment attirer ces personnes, les convertir et mesurer la rentabilité ? ». On y construit un entonnoir, on conçoit des campagnes en simulation, on assemble des pages de conversion, et on apprend à lire les indicateurs pour décider — sans jamais dépenser ni lancer de campagne réelle.",
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
      "Personas, besoins, parcours client et proposition de valeur (M2) — cible et offre des campagnes",
      "Plateforme de marque, messages et appels à l'action (M3) — créations publicitaires et pages",
      "Calendrier éditorial (M3) — coordination avec les campagnes payantes",
      "Funnel AARRR et CAC/LTV (M1) — fondations de l'entonnoir et des indicateurs",
    ],
    consolidatedCompetencies: [
      "C4 (indicateurs de base : CAC, conversion) → approfondi en C13 (mesure et optimisation)",
      "C10 (messages, CTA) → opérationnalisé en C12 (créations publicitaires)",
    ],
    newCompetencies: [
      "C11 — concevoir une stratégie d'acquisition et un entonnoir de conversion",
      "C12 — construire des campagnes publicitaires (plateformes, audiences, créations, budget) en simulation",
      "C13 — mesurer, attribuer et optimiser (indicateurs, tests A/B, décisions) de façon responsable",
    ],
    deliverablesForNextModule: [
      "Entonnoir + pages de conversion → base de l'expérience d'achat du Module 5",
      "Système de mesure (UTM, événements, indicateurs) → suivi du commerce en ligne du Module 5",
    ],
  },
  lessons: [
    // ══════════════ SEMAINE 10 — STRATÉGIE D'ACQUISITION ET ENTONNOIR ══════════════
    {
      id: "mkt-v2-m4-l1",
      module: 4,
      week: 10,
      title: "Comprendre l'acquisition numérique",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Attirer des prospects peut se faire de plusieurs manières, chacune avec ses forces et ses coûts. Cette leçon distingue les sources de trafic et le cadre médias détenus / gagnés / payants, et met en garde contre la dépendance à la seule publicité.",
      objectives: [
        "Distinguer acquisition organique, payante et relationnelle",
        "Classer les sources de trafic (direct, organique, payant, recommandation, affiliation, partenariats, communautés)",
        "Appliquer le cadre médias détenus / gagnés / payants",
        "Comparer durabilité de l'acquisition et dépendance publicitaire",
      ],
      competencies: ["C11"],
      prerequisites: ["Module 1 — funnel AARRR ; Module 2 — personas et marché"],
      sections: [
        {
          heading: "Trois grandes familles d'acquisition",
          body: [
            "L'acquisition organique attire sans payer directement chaque visite (référencement naturel, contenu, réseaux). L'acquisition payante achète de la visibilité (publicité). L'acquisition relationnelle passe par les recommandations, partenariats, affiliations et communautés. Les trois se complètent : la payante amorce vite, l'organique construit dans la durée, la relationnelle démultiplie par la confiance.",
          ],
        },
        {
          heading: "Les sources de trafic",
          body: [
            "Trafic direct (on tape l'adresse), organique (moteurs de recherche, contenu), payant (annonces), recommandation (liens d'autres sites, bouche-à-oreille), affiliation (partenaires rémunérés à la performance), partenariats et communautés. Chaque source a un coût, un délai et un niveau de contrôle différents.",
          ],
        },
        {
          heading: "Médias détenus, gagnés, payants",
          body: [
            "Les médias détenus vous appartiennent (site, liste de courriels, blogue) : contrôle total, actif durable. Les médias gagnés sont offerts par d'autres (mentions, partages, avis) : très crédibles mais peu contrôlables. Les médias payants sont loués (publicité) : rapides et pilotables, mais s'arrêtent dès qu'on cesse de payer. Une stratégie saine combine les trois et investit dans les médias détenus.",
          ],
        },
        {
          heading: "Durabilité vs dépendance",
          body: [
            "Une entreprise qui ne vit que de publicité est fragile : si le coût monte ou qu'un compte est suspendu, l'acquisition s'effondre. La publicité est un accélérateur, pas une fondation. Bâtir des actifs détenus (audience, contenu, liste) et de la confiance (médias gagnés) réduit la dépendance et le coût d'acquisition dans le temps.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Médias détenus", definition: "Canaux que vous possédez (site, liste courriel) — actif durable." },
        { term: "Médias gagnés", definition: "Visibilité offerte par des tiers (mentions, partages, avis)." },
        { term: "Médias payants", definition: "Visibilité louée par la publicité — s'arrête quand on cesse de payer." },
        { term: "Affiliation", definition: "Partenaires rémunérés à la performance (par vente/prospect généré)." },
      ],
      examples: [
        "Un torréfacteur combine SEO (organique), une liste courriel (détenu) et des annonces (payant) pour lancer un produit.",
        "Un partenariat avec un blogue local (média gagné) apporte des recommandations crédibles à faible coût.",
      ],
      commonError: {
        title: "Tout miser sur la publicité",
        body:
          "Dépendre uniquement des médias payants expose à la hausse des coûts et aux suspensions de compte. La publicité amorce ; les actifs détenus et la confiance pérennisent.",
      },
      vigilancePoint: {
        title: "Le bon canal suit le persona",
        body:
          "Choisir un canal d'acquisition « à la mode » sans vérifier que le persona s'y trouve gaspille le budget (rappel du Module 1). Cohérence marché-canal-offre d'abord.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (détail, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "La boutique fictive Boréalille dépensait tout son budget en publicité et n'avait ni liste courriel ni contenu. Quand le coût des annonces a doublé, ses ventes ont chuté brutalement.",
          "En rééquilibrant vers les médias détenus (constitution d'une liste courriel, contenu de blogue) et gagnés (partenariats locaux) tout en gardant la publicité comme accélérateur, Boréalille a réduit sa dépendance et son coût d'acquisition moyen. La diversification a stabilisé l'acquisition.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l1-ia1",
          title: "Classer des sources de trafic",
          objective: "Attribuer chaque source à détenu / gagné / payant.",
          instructions: [
            "Classez : (a) liste de courriels ; (b) annonce sur un réseau social ; (c) mention spontanée par un blogue ; (d) blogue de l'entreprise.",
          ],
          answerKey: ["(a) détenu ; (b) payant ; (c) gagné ; (d) détenu."],
          feedback: "Détenu = vous le possédez ; gagné = offert par un tiers ; payant = loué par la publicité.",
          successCriterion: "Au moins 3 des 4 correctement classés.",
        },
        {
          id: "mkt-v2-m4-l1-ia2",
          title: "Associer un canal à un persona",
          objective: "Choisir un canal cohérent avec un persona.",
          instructions: [
            "Persona B2B (responsable d'exploitation, cycle long) : quel canal privilégier entre une plateforme professionnelle, un réseau de vidéos courtes de divertissement, ou une affiche ?",
          ],
          answerKey: ["Plateforme professionnelle (recherche/contenu B2B) — alignée sur le persona et le cycle long."],
          feedback: "Le canal doit correspondre aux habitudes du persona et au cycle de vente.",
          successCriterion: "Canal cohérent choisi et justifié.",
        },
      ],
      exercise: {
        title: "Cartographie des sources d'acquisition",
        prompt: [
          "Pour votre projet, listez 2 sources détenues, 1 gagnée et 1 payante réalistes.",
          "Indiquez pour chacune un coût approximatif (temps ou argent, simulé) et un délai d'effet.",
        ],
        deliverables: ["Un tableau des sources d'acquisition (détenu/gagné/payant, coût simulé, délai)."],
        estimatedMinutes: 45,
      },
      successCriteria: [
        "Les trois familles de médias sont représentées.",
        "Les choix sont cohérents avec le persona.",
        "La dépendance à la seule publicité est évitée.",
      ],
      resources: ["Notes de cours ARCADINS — sources d'acquisition (ressource interne)"],
      glossary: [{ term: "Acquisition relationnelle", definition: "Prospects issus de recommandations, partenariats, communautés." }],
      summary:
        "L'acquisition combine organique, payant et relationnel, dans le cadre médias détenus/gagnés/payants ; la publicité accélère mais les actifs détenus pérennisent.",
      selfAssessment: [
        "Puis-je classer mes sources en détenu/gagné/payant ?",
        "Mon acquisition évite-t-elle la dépendance à la seule publicité ?",
      ],
      quiz: { id: "mkt-v2-m4-l1-qz", questionIds: ["mkt-v2-m4-q01", "mkt-v2-m4-q02"], passThreshold: 70 },
      keyTakeaways: [
        "Détenu (durable), gagné (crédible), payant (rapide mais éphémère).",
        "La publicité est un accélérateur, pas une fondation.",
        "Le bon canal suit le persona.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Solide. Passez à l'entonnoir de conversion (leçon 10.2)." },
        { condition: "score < 70", message: "Revoyez le cadre médias détenus/gagnés/payants." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 10.2.",
    },
    {
      id: "mkt-v2-m4-l2",
      module: 4,
      week: 10,
      title: "Construire un entonnoir de conversion",
      authored: true,
      durationMinutes: 90,
      introduction:
        "L'entonnoir organise le passage d'un inconnu à un client fidèle. Cette leçon en détaille les étapes, les micro et macroconversions, et apprend à repérer les points de friction où le parcours « fuit ».",
      objectives: [
        "Décrire les étapes de l'entonnoir (découverte → recommandation)",
        "Distinguer microconversion et macroconversion",
        "Repérer les points de friction et l'abandon",
        "Adapter l'entonnoir au B2C, B2B, services et formation",
      ],
      competencies: ["C11"],
      prerequisites: ["Leçon 10.1 ; parcours client (M2)"],
      sections: [
        {
          heading: "Les étapes de l'entonnoir",
          body: [
            "Découverte/sensibilisation (l'inconnu prend conscience d'un besoin ou de la marque), considération (il compare des options), intention (il manifeste un intérêt concret), conversion (il agit : achat, inscription, demande), fidélisation et recommandation. C'est une lecture opérationnelle du parcours client du Module 2 et du funnel AARRR du Module 1.",
          ],
        },
        {
          heading: "Micro et macroconversions",
          body: [
            "La macroconversion est l'objectif principal (achat, contrat, inscription payante). Les microconversions sont les petits pas qui y mènent (télécharger un guide, s'abonner, ajouter au panier, prendre rendez-vous). Suivre les microconversions permet de voir où le parcours progresse ou bloque, bien avant la vente.",
          ],
        },
        {
          heading: "Friction et abandon",
          body: [
            "Chaque étape perd une partie des personnes. Les points de friction (formulaire trop long, page lente, information manquante, doute non levé) accélèrent l'abandon. Repérer l'étape qui fuit le plus (rappel du diagnostic AARRR) indique où agir en priorité : améliorer là où l'on perd le plus a le plus d'impact.",
          ],
        },
        {
          heading: "Entonnoir selon le modèle",
          body: [
            "En B2C impulsif, l'entonnoir est court ; en B2B ou en formation, il est long, avec plusieurs décideurs et étapes de réassurance. Le parcours réel est rarement linéaire : les gens reviennent, comparent, hésitent. On conçoit un entonnoir souple qui accompagne ces allers-retours plutôt qu'un tunnel rigide.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Macroconversion", definition: "Objectif principal de l'entonnoir (achat, inscription payante, contrat)." },
        { term: "Microconversion", definition: "Petit pas mesurable menant à la macroconversion (téléchargement, abonnement)." },
        { term: "Point de friction", definition: "Obstacle qui provoque l'abandon à une étape du parcours." },
      ],
      examples: [
        "Micro : télécharger un guide (découverte) → macro : s'inscrire à une formation (conversion).",
        "B2B : démonstration + devis + validation par plusieurs décideurs avant l'achat.",
      ],
      commonError: {
        title: "Ne mesurer que la vente finale",
        body:
          "Ignorer les microconversions empêche de voir où le parcours bloque. On mesure chaque étape pour localiser la fuite avant la macroconversion.",
      },
      vigilancePoint: {
        title: "Réparer la fuite avant d'ajouter du trafic",
        body:
          "Amener plus de visiteurs vers un entonnoir qui fuit amplifie la perte. On corrige d'abord l'étape la plus défaillante.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Café Nord-Berge (torréfacteur, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le café fictif Nord-Berge ne suivait que ses ventes en ligne. Elles stagnaient malgré du trafic.",
          "En cartographiant l'entonnoir et ses microconversions, l'équipe a vu que l'abandon culminait à l'ajout au panier (frais de livraison surprises). En clarifiant les frais en amont (réduction de la friction), le taux de passage a nettement progressé — sans dépenser un dollar de plus en acquisition. Mesurer les micro-étapes a révélé la vraie fuite.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l2-ia1",
          title: "Construire un entonnoir",
          objective: "Ordonner les étapes d'un entonnoir.",
          instructions: ["Ordonnez : conversion · découverte · considération · fidélisation · intention · recommandation."],
          answerKey: ["découverte → considération → intention → conversion → fidélisation → recommandation."],
          feedback: "L'entonnoir va de la prise de conscience à la recommandation.",
          successCriterion: "Ordre exact.",
        },
        {
          id: "mkt-v2-m4-l2-ia2",
          title: "Identifier une fuite de conversion",
          objective: "Repérer l'étape défaillante à partir de données simulées.",
          instructions: [
            "Jeu de données pédagogique fictif : 1000 visiteurs → 400 vues produit → 350 ajouts panier → 60 achats. Où est la principale fuite ?",
          ],
          answerKey: ["Entre l'ajout au panier (350) et l'achat (60) : ~83 % d'abandon au paiement — c'est la fuite principale."],
          feedback: "On compare le taux de passage entre étapes ; la plus forte chute indique la priorité.",
          successCriterion: "Fuite panier→achat identifiée.",
        },
      ],
      exercise: {
        title: "Entonnoir de votre projet",
        prompt: [
          "Dessinez l'entonnoir de votre projet (étapes + 2 microconversions + macroconversion).",
          "Anticipez un point de friction probable par étape.",
        ],
        deliverables: ["Un schéma d'entonnoir annoté (étapes, micro/macro, frictions anticipées)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les étapes et les micro/macroconversions sont distinguées.",
        "Au moins un point de friction par étape est anticipé.",
        "L'entonnoir est adapté au modèle (B2C/B2B/services/formation).",
      ],
      resources: ["Gabarit d'entonnoir (ressource interne)"],
      glossary: [{ term: "Taux de passage", definition: "Proportion de personnes franchissant une étape vers la suivante." }],
      summary:
        "L'entonnoir opérationnalise le parcours : étapes, micro/macroconversions et points de friction ; on répare d'abord l'étape qui fuit le plus.",
      selfAssessment: [
        "Ai-je identifié mes micro et macroconversions ?",
        "Sais-je repérer l'étape qui fuit ?",
      ],
      quiz: { id: "mkt-v2-m4-l2-qz", questionIds: ["mkt-v2-m4-q04", "mkt-v2-m4-q05"], passThreshold: 70 },
      keyTakeaways: [
        "L'entonnoir va de la découverte à la recommandation.",
        "Les microconversions révèlent les blocages avant la vente.",
        "On corrige la fuite avant d'ajouter du trafic.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à définir offre et objectif (leçon 10.3)." },
        { condition: "score < 70", message: "Revoyez micro/macroconversions et le repérage des fuites." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 10.3.",
    },
    {
      id: "mkt-v2-m4-l3",
      module: 4,
      week: 10,
      title: "Définir une offre et un objectif de campagne",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une campagne sans offre claire ni objectif mesurable gaspille le budget. Cette leçon apprend à structurer une offre (dont l'aimant à prospects) et à fixer des objectifs SMART cohérents avec le but commercial.",
      objectives: [
        "Distinguer offre principale, offre d'entrée et aimant à prospects",
        "Renforcer une offre (preuve, réduction du risque, bonus, rareté réelle)",
        "Formuler des objectifs SMART et un indicateur principal",
        "Aligner objectif commercial et objectif publicitaire",
      ],
      competencies: ["C11"],
      prerequisites: ["Leçons 10.1-10.2 ; proposition de valeur (M2)"],
      sections: [
        {
          heading: "Structurer l'offre",
          body: [
            "L'offre principale est ce que l'on vend vraiment. L'offre d'entrée est une première marche à faible risque (produit d'appel, essai). L'aimant à prospects (lead magnet) est un contenu ou avantage gratuit échangé contre un contact (guide, checklist, démo). Ces trois niveaux permettent d'entrer en relation avant de demander l'achat principal.",
          ],
        },
        {
          heading: "Renforcer l'offre",
          body: [
            "Une offre convainc mieux avec une proposition de valeur claire, une preuve (avis, démonstration, chiffres vérifiables), une réduction du risque (garantie, essai, retour facile) et éventuellement un bonus pertinent. L'urgence et la rareté ne sont acceptables que si elles sont RÉELLES (stock limité authentique, date de fin vraie) : une fausse urgence est trompeuse et interdite.",
          ],
        },
        {
          heading: "Objectifs SMART",
          body: [
            "Un objectif utile est Spécifique, Mesurable, Atteignable, Réaliste et Temporel : non pas « avoir plus de ventes », mais « obtenir 50 inscriptions à l'essai en 30 jours à un CPA ≤ 15 $ (simulé) ». On désigne un indicateur principal (celui qui juge le succès) et des indicateurs secondaires (pour diagnostiquer).",
          ],
        },
        {
          heading: "Aligner commercial et publicitaire",
          body: [
            "L'objectif publicitaire (ce que la plateforme optimise : clics, prospects, ventes) doit servir l'objectif commercial (revenu, clients). Optimiser des clics quand on veut des ventes peut attirer du trafic curieux mais non acheteur. La cohérence entre les deux objectifs évite de « réussir » une métrique sans effet réel.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Aimant à prospects (lead magnet)", definition: "Avantage gratuit échangé contre un contact (guide, checklist, démo)." },
        { term: "Offre d'entrée", definition: "Première marche à faible risque menant à l'offre principale." },
        { term: "Objectif SMART", definition: "Objectif Spécifique, Mesurable, Atteignable, Réaliste, Temporel." },
      ],
      examples: [
        "Aimant : « Guide gratuit : 5 erreurs de facturation » → offre d'entrée : essai 14 jours → offre principale : abonnement.",
        "Objectif SMART (simulé) : « 50 prospects qualifiés en 30 jours, CPL ≤ 8 $ — jeu de données pédagogique fictif ».",
      ],
      commonError: {
        title: "La fausse urgence",
        body:
          "Un compte à rebours qui redémarre ou une « rareté » inventée trompent le client et sont interdits. L'urgence et la rareté doivent être réelles et vérifiables.",
      },
      vigilancePoint: {
        title: "Aligner l'objectif publicitaire sur le but réel",
        body:
          "Optimiser une métrique de vanité (clics, impressions) sans lien avec le revenu peut « réussir » sans rien rapporter. L'indicateur principal doit refléter le but commercial.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — OutiPro (logiciel B2B, international)",
        region: "internationale",
        isFictional: true,
        body: [
          "Le logiciel fictif OutiPro lançait des campagnes « pour avoir de la visibilité », sans objectif chiffré ni offre d'entrée. Beaucoup de clics, peu de clients.",
          "En définissant un aimant (modèle gratuit), une offre d'entrée (essai) et un objectif SMART aligné sur les inscriptions qualifiées (simulé), OutiPro a cessé d'acheter des clics curieux pour attirer des prospects pertinents. L'alignement objectif-offre a transformé le rendement des campagnes.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l3-ia1",
          title: "Choisir un objectif publicitaire",
          objective: "Aligner l'objectif de campagne sur le but commercial.",
          instructions: [
            "But commercial : obtenir des essais gratuits qualifiés. Quel objectif publicitaire choisir : « maximiser les impressions », « maximiser les clics », ou « maximiser les prospects/conversions » ?",
          ],
          answerKey: ["« Maximiser les prospects/conversions » — aligné sur l'obtention d'essais, pas sur la simple visibilité."],
          feedback: "L'objectif publicitaire doit refléter le résultat commercial visé.",
          successCriterion: "Objectif « conversions/prospects » choisi et justifié.",
        },
      ],
      exercise: {
        title: "Offre + objectif SMART",
        prompt: [
          "Définissez pour votre projet : un aimant à prospects, une offre d'entrée, l'offre principale.",
          "Formulez un objectif SMART (simulé) avec un indicateur principal.",
        ],
        deliverables: ["Une fiche offre (3 niveaux) + un objectif SMART avec indicateur principal (données simulées)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les trois niveaux d'offre sont définis.",
        "L'objectif est SMART et aligné sur le but commercial.",
        "Aucune fausse urgence ni rareté inventée.",
      ],
      resources: ["Gabarit d'offre + objectifs SMART (ressource interne)"],
      glossary: [{ term: "Indicateur principal", definition: "Métrique qui juge le succès d'une campagne." }],
      summary:
        "Une campagne efficace repose sur une offre structurée (aimant, entrée, principale), renforcée honnêtement, et un objectif SMART aligné sur le but commercial.",
      selfAssessment: [
        "Mon offre comporte-t-elle un aimant et une marche d'entrée ?",
        "Mon objectif publicitaire sert-il vraiment le but commercial ?",
      ],
      quiz: { id: "mkt-v2-m4-l3-qz", questionIds: ["mkt-v2-m4-q07", "mkt-v2-m4-q08"], passThreshold: 70 },
      keyTakeaways: [
        "Aimant → offre d'entrée → offre principale : une progression du risque.",
        "Urgence et rareté seulement si RÉELLES.",
        "L'objectif publicitaire doit servir l'objectif commercial.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à cartographier le parcours de conversion (leçon 10.4)." },
        { condition: "score < 70", message: "Revoyez la structure de l'offre et les objectifs SMART." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 10.4.",
    },
    {
      id: "mkt-v2-m4-l4",
      module: 4,
      week: 10,
      title: "Cartographier le parcours de conversion",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Entre l'annonce et le client fidèle, il y a une chaîne d'étapes techniques et humaines. Cette leçon apprend à cartographier ce parcours de bout en bout et à repérer les points de rupture.",
      objectives: [
        "Relier annonce, page, formulaire, courriel et suivi en un parcours",
        "Identifier les dépendances techniques",
        "Détecter les points de rupture",
        "Prévoir la relance et la fidélisation",
      ],
      competencies: ["C11"],
      prerequisites: ["Leçons 10.1 à 10.3"],
      sections: [
        {
          heading: "La chaîne de conversion",
          body: [
            "Un parcours typique : point d'entrée (annonce ou contenu) → page de destination → formulaire ou panier → courriel de confirmation → éventuel appel/réservation → paiement → confirmation → suivi → relance → fidélisation. Chaque maillon doit fonctionner et rester cohérent avec le précédent (le message de l'annonce se retrouve sur la page).",
          ],
        },
        {
          heading: "Dépendances techniques",
          body: [
            "Le parcours repose sur des éléments techniques : liens fonctionnels, formulaire qui enregistre, courriels qui partent, paiement opérationnel, suivi qui se déclenche. Un maillon technique défaillant (courriel non envoyé, bouton cassé) rompt tout le parcours, quel que soit le budget publicitaire.",
          ],
        },
        {
          heading: "Points de rupture",
          body: [
            "Un point de rupture est un endroit où le parcours s'interrompt : incohérence annonce/page, formulaire qui échoue, absence de confirmation, relance manquante. On les repère en parcourant soi-même le tunnel comme un client et en vérifiant chaque transition.",
          ],
        },
        {
          heading: "Relance et fidélisation",
          body: [
            "Tout le monde ne convertit pas du premier coup. Une séquence de relance (courriels de rappel, offre complémentaire) récupère une partie des indécis. Après l'achat, la fidélisation (accueil, aide, contenu utile) prépare le rachat et la recommandation. Le parcours ne s'arrête pas à la vente.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Point de rupture", definition: "Endroit où le parcours de conversion s'interrompt (technique ou message)." },
        { term: "Séquence de relance", definition: "Suite de messages récupérant les prospects non convertis." },
        { term: "Cohérence annonce-page", definition: "Continuité du message entre l'annonce et la page d'atterrissage." },
      ],
      examples: [
        "Rupture : l'annonce promet « -20 % » mais la page n'en parle pas → perte de confiance et abandon.",
        "Relance : trois courriels espacés récupèrent une partie des paniers abandonnés.",
      ],
      commonError: {
        title: "Oublier la confirmation et la relance",
        body:
          "Sans courriel de confirmation ni relance, on perd des conversions récupérables et on inquiète le client. Le parcours doit être complet jusqu'au suivi.",
      },
      vigilancePoint: {
        title: "Tester le parcours comme un vrai client",
        body:
          "Un parcours jamais testé cache des ruptures invisibles. Le parcourir soi-même, sur mobile, révèle les maillons cassés avant de payer pour du trafic.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada)",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO diffusait des annonces vers une page dont le formulaire d'inscription échouait sur mobile. Le budget partait en fumée sans conversions.",
          "En cartographiant et en testant le parcours de bout en bout, l'équipe a trouvé la rupture (formulaire mobile), l'a corrigée et a ajouté une confirmation + relance. Les conversions sont apparues — le trafic était bon, le parcours était cassé.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l4-ia1",
          title: "Repérer un point de rupture",
          objective: "Détecter l'incohérence ou la panne dans un parcours.",
          instructions: [
            "Parcours : annonce « essai gratuit 30 jours » → page qui parle d'un « achat immédiat » → formulaire long de 12 champs. Citez 2 problèmes.",
          ],
          answerKey: [
            "1) Incohérence annonce/page (essai gratuit vs achat immédiat) ; 2) formulaire trop long (friction) — les deux cassent la conversion.",
          ],
          feedback: "On vérifie la cohérence du message et la simplicité de chaque étape.",
          successCriterion: "Au moins l'incohérence annonce/page identifiée.",
        },
      ],
      exercise: {
        title: "Carte d'acquisition et d'entonnoir",
        prompt: [
          "Assemblez la CARTE D'ACQUISITION ET D'ENTONNOIR de votre projet.",
          "Incluez : objectif, persona, problème, offre, source de trafic, contenu/annonce, page, CTA, formulaire, séquence de suivi, conversion attendue, indicateurs, risques, points de friction, fidélisation.",
        ],
        deliverables: ["La CARTE D'ACQUISITION ET D'ENTONNOIR complète (livrable de la semaine 10)."],
        estimatedMinutes: 90,
      },
      successCriteria: [
        "Le parcours est complet, du point d'entrée à la fidélisation.",
        "Les dépendances techniques et points de rupture sont identifiés.",
        "La cohérence annonce-page est respectée.",
      ],
      resources: ["Gabarit de carte de parcours de conversion (ressource interne)"],
      glossary: [{ term: "Attribution", definition: "Association d'une conversion aux points de contact qui l'ont provoquée." }],
      summary:
        "Le parcours de conversion est une chaîne (annonce → page → formulaire → confirmation → suivi → fidélisation) dont chaque maillon, technique et de message, doit tenir ; on le teste comme un vrai client.",
      selfAssessment: [
        "Mon parcours est-il complet et cohérent d'un bout à l'autre ?",
        "Ai-je testé chaque transition, y compris sur mobile ?",
      ],
      quiz: { id: "mkt-v2-m4-l4-qz", questionIds: ["mkt-v2-m4-q06", "mkt-v2-m4-q05"], passThreshold: 70 },
      keyTakeaways: [
        "Chaque maillon technique et de message doit fonctionner.",
        "Confirmation + relance récupèrent des conversions.",
        "Tester le parcours révèle les ruptures invisibles.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 10 maîtrisée. Passez aux plateformes publicitaires (semaine 11)." },
        { condition: "score < 70", message: "Revoyez la chaîne de conversion et les points de rupture." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 10 + le quiz hebdomadaire avant la semaine 11.",
    },

    // ══════════════ SEMAINE 11 — PUBLICITÉ NUMÉRIQUE ET CRÉATION DE CAMPAGNES ══════════════
    {
      id: "mkt-v2-m4-l5",
      module: 4,
      week: 11,
      title: "Principes des plateformes publicitaires",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Chaque plateforme publicitaire a sa logique. Cette leçon présente les principales (Meta, Google, YouTube, LinkedIn, TikTok), leur structure commune et la différence clé entre intention de recherche et interruption sociale.",
      objectives: [
        "Connaître les grandes plateformes et leurs usages typiques",
        "Comprendre la structure compte → campagne → ensemble → annonce",
        "Expliquer enchères, portée, fréquence, pertinence et phase d'apprentissage",
        "Distinguer publicité sur moteur de recherche et sur réseau social",
      ],
      competencies: ["C12"],
      prerequisites: ["Semaine 10 — entonnoir et objectifs"],
      sections: [
        {
          heading: "Un paysage de plateformes",
          body: [
            "Meta Ads (Facebook/Instagram) : large portée, ciblage par intérêts, formats visuels. Google Ads : capte l'intention via la recherche (mots-clés) et le display/vidéo. YouTube Ads : vidéo, notoriété et considération. LinkedIn Ads : B2B, ciblage professionnel. TikTok Ads : vidéo courte, audiences jeunes. Le choix dépend du persona et de l'objectif, pas de la mode.",
          ],
        },
        {
          heading: "Structure commune",
          body: [
            "La plupart des plateformes s'organisent en niveaux : compte → campagne (objectif) → ensemble de publicités (audience, budget, placement) → annonce (création). Comprendre cette hiérarchie permet de tester proprement (une audience par ensemble, plusieurs créations par annonce) et de lire les résultats.",
          ],
        },
        {
          heading: "Enchères et apprentissage",
          body: [
            "La visibilité s'obtient par enchères : on ne paie pas un prix fixe mais on entre en concurrence pour l'attention, selon l'offre, la pertinence et la qualité de l'annonce. Les plateformes ont une phase d'apprentissage pendant laquelle l'algorithme cherche les bonnes personnes : changer trop souvent les réglages la réinitialise et gaspille le budget. Portée (personnes touchées), impressions (affichages) et fréquence (répétitions par personne) décrivent la diffusion.",
          ],
        },
        {
          heading: "Recherche vs réseau social",
          body: [
            "Sur un moteur de recherche, l'utilisateur exprime une intention (il cherche activement) : la publicité répond à une demande. Sur un réseau social, la publicité interrompt un contenu de divertissement : elle doit d'abord capter l'attention et créer l'intérêt. Cette différence change l'angle créatif et l'étape de l'entonnoir visée.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Structure de campagne", definition: "Hiérarchie compte → campagne → ensemble de publicités → annonce." },
        { term: "Phase d'apprentissage", definition: "Période où l'algorithme optimise la diffusion ; à ne pas perturber." },
        { term: "Fréquence", definition: "Nombre moyen de fois qu'une personne voit l'annonce." },
      ],
      examples: [
        "Intention : « comptable Montréal » sur un moteur de recherche → annonce très ciblée. Interruption : vidéo courte inspirante sur un réseau social.",
        "Un ensemble = une audience ; plusieurs annonces = plusieurs créations testées.",
      ],
      commonError: {
        title: "Modifier une campagne en pleine phase d'apprentissage",
        body:
          "Changer sans cesse budget, audience ou création réinitialise l'apprentissage et gaspille le budget. On laisse la campagne stabiliser avant de juger.",
      },
      vigilancePoint: {
        title: "Simulation uniquement",
        body:
          "Dans ce module, aucune campagne n'est lancée, aucun compte publicitaire n'est connecté, aucune dépense n'est engagée. Toute campagne est une « Simulation pédagogique — aucune diffusion réelle ».",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — TrajectO (tourisme, international) — Simulation pédagogique, aucune diffusion réelle",
        region: "internationale",
        isFictional: true,
        body: [
          "L'agence fictive TrajectO hésitait entre un moteur de recherche et un réseau social. Son persona découvre les destinations par inspiration, sans recherche active.",
          "En choisissant (en simulation) un réseau social vidéo pour la découverte, puis un moteur de recherche pour capter l'intention au moment de réserver, TrajectO a aligné chaque plateforme sur l'étape de l'entonnoir. Comprendre intention vs interruption a guidé le choix — aucune campagne n'a été réellement lancée.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l5-ia1",
          title: "Choisir la plateforme selon l'objectif",
          objective: "Associer une plateforme à un objectif/persona.",
          instructions: [
            "Associez : (1) capter une intention d'achat active ; (2) toucher des décideurs B2B ; (3) atteindre une audience jeune par vidéo courte.",
            "Plateformes : moteur de recherche · plateforme professionnelle · réseau de vidéos courtes.",
          ],
          answerKey: ["1 → moteur de recherche ; 2 → plateforme professionnelle ; 3 → réseau de vidéos courtes."],
          feedback: "On relie la plateforme à l'intention et au persona.",
          successCriterion: "Les 3 associations correctes.",
        },
      ],
      exercise: {
        title: "Choix de plateforme justifié",
        prompt: [
          "Pour votre projet, choisissez 1 à 2 plateformes et justifiez par le persona, l'objectif et l'étape de l'entonnoir.",
          "Esquissez la structure compte → campagne → ensemble → annonce.",
        ],
        deliverables: ["Une note de choix de plateforme (justification) + un schéma de structure de campagne (simulé)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le choix de plateforme est justifié par persona et objectif.",
        "La structure de campagne est correctement esquissée.",
        "La mention de simulation est présente.",
      ],
      resources: ["Aide-mémoire plateformes publicitaires (ressource interne)"],
      glossary: [{ term: "Portée", definition: "Nombre de personnes uniques ayant vu l'annonce." }],
      summary:
        "Les plateformes partagent une structure (compte→campagne→ensemble→annonce) et fonctionnent par enchères avec une phase d'apprentissage ; le choix suit le persona et distingue intention (recherche) et interruption (social).",
      selfAssessment: [
        "Sais-je distinguer intention et interruption ?",
        "Ai-je choisi ma plateforme selon le persona et l'objectif ?",
      ],
      quiz: { id: "mkt-v2-m4-l5-qz", questionIds: ["mkt-v2-m4-q10", "mkt-v2-m4-q11"], passThreshold: 70 },
      keyTakeaways: [
        "Structure commune : compte → campagne → ensemble → annonce.",
        "Ne pas perturber la phase d'apprentissage.",
        "Recherche = intention ; réseau social = interruption.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la segmentation et les audiences (leçon 11.2)." },
        { condition: "score < 70", message: "Revoyez la structure de campagne et intention vs interruption." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 11.2.",
    },
    {
      id: "mkt-v2-m4-l6",
      module: 4,
      week: 11,
      title: "Segmentation et audiences publicitaires",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Bien cibler évite de payer pour de mauvaises personnes. Cette leçon distingue audiences froide/tiède/chaude, présente les modes de ciblage et le retargeting, et rappelle les limites du microciblage et le respect du consentement.",
      objectives: [
        "Distinguer audience froide, tiède et chaude",
        "Choisir un mode de ciblage (démographique, intérêts, intention, personnalisée, similaire)",
        "Utiliser exclusions et retargeting à bon escient",
        "Respecter la confidentialité, le consentement et éviter le ciblage discriminatoire",
      ],
      competencies: ["C12"],
      prerequisites: ["Leçon 11.1 ; personas (M2)"],
      sections: [
        {
          heading: "Froide, tiède, chaude",
          body: [
            "L'audience froide ne connaît pas la marque : on l'informe et on capte l'attention. L'audience tiède a déjà interagi (visite, engagement) : on la fait avancer (considération). L'audience chaude connaît et a montré une intention (panier, formulaire) : on la convertit. Le message et l'offre s'adaptent à la température : proposer un achat direct à une audience froide convertit rarement.",
          ],
        },
        {
          heading: "Modes de ciblage",
          body: [
            "Démographique (âge, lieu), centres d'intérêt, comportement, intention de recherche (mots-clés), audience personnalisée (à partir de vos propres contacts, avec consentement), audience similaire (personnes ressemblant à vos clients). Chaque mode sert des objectifs différents ; on part du persona pour choisir.",
          ],
        },
        {
          heading: "Exclusions et retargeting",
          body: [
            "Les exclusions évitent de payer pour des personnes non pertinentes (clients déjà acquis, audiences hors cible). Le retargeting réengage ceux qui ont déjà interagi (visiteurs, paniers abandonnés) : souvent le meilleur rendement, mais à doser pour éviter la fatigue publicitaire (voir trop souvent la même annonce lasse et agace).",
          ],
        },
        {
          heading: "Confidentialité et limites",
          body: [
            "Le ciblage doit respecter la vie privée et le consentement (données collectées avec finalité claire, conformité). Le microciblage a des limites (fiabilité, dépendance aux plateformes, restrictions des navigateurs) et des interdits : aucun ciblage discriminatoire, aucune collecte sans finalité. Cibler « juste » n'autorise pas à cibler « n'importe comment ».",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Audience froide/tiède/chaude", definition: "Niveaux de proximité avec la marque (inconnue / a interagi / a montré une intention)." },
        { term: "Audience similaire", definition: "Personnes ressemblant à une audience source (clients existants)." },
        { term: "Retargeting", definition: "Rediffusion ciblée vers ceux qui ont déjà interagi." },
        { term: "Fatigue publicitaire", definition: "Baisse d'efficacité quand une audience voit trop souvent la même annonce." },
      ],
      examples: [
        "Froide : vidéo de découverte. Chaude : rappel « votre panier vous attend » (retargeting).",
        "Exclusion : retirer les clients déjà abonnés d'une campagne d'acquisition.",
      ],
      commonError: {
        title: "Vendre à une audience froide comme à une audience chaude",
        body:
          "Proposer un achat immédiat à des gens qui découvrent la marque convertit peu. On adapte le message et l'offre à la température de l'audience.",
      },
      vigilancePoint: {
        title: "Consentement et non-discrimination",
        body:
          "Aucune donnée collectée sans finalité claire, aucun ciblage discriminatoire, respect du consentement. La performance ne justifie jamais une atteinte à la vie privée.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Néva Cosmétiques (e-commerce, Canada) — Simulation pédagogique, aucune diffusion réelle",
        region: "canadienne",
        isFictional: true,
        body: [
          "La marque fictive Néva diffusait (en simulation) la même offre d'achat à toutes ses audiences, froides comme chaudes. Le rendement était faible sur l'audience froide.",
          "En segmentant par température — découverte pour la froide, réassurance pour la tiède, retargeting du panier pour la chaude — et en excluant les clients déjà acquis, Néva a amélioré son rendement simulé. Adapter le message à la température a fait la différence, dans le respect du consentement.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l6-ia1",
          title: "Distinguer froide, tiède, chaude",
          objective: "Classer des audiences par température.",
          instructions: [
            "Classez : (a) personnes n'ayant jamais entendu parler de la marque ; (b) visiteurs ayant abandonné un panier ; (c) abonnés à la infolettre ayant lu plusieurs articles.",
          ],
          answerKey: ["(a) froide ; (b) chaude (forte intention) ; (c) tiède."],
          feedback: "Plus l'interaction et l'intention sont fortes, plus l'audience est chaude.",
          successCriterion: "Les 3 correctement classées.",
        },
        {
          id: "mkt-v2-m4-l6-ia2",
          title: "Corriger un ciblage inadéquat",
          objective: "Repérer et corriger une erreur de ciblage.",
          instructions: [
            "Une campagne d'acquisition cible aussi les clients déjà abonnés et affiche l'annonce 15 fois/personne/semaine. Citez 2 corrections.",
          ],
          answerKey: ["1) Exclure les clients déjà abonnés ; 2) réduire la fréquence pour éviter la fatigue publicitaire."],
          feedback: "Exclusions pertinentes + fréquence maîtrisée améliorent le rendement.",
          successCriterion: "Les 2 corrections proposées.",
        },
      ],
      exercise: {
        title: "Plan d'audiences",
        prompt: [
          "Pour votre projet, définissez une audience froide, une tiède et une chaude, avec message et offre adaptés.",
          "Précisez au moins une exclusion et une règle de fréquence.",
        ],
        deliverables: ["Un plan d'audiences (froide/tiède/chaude, messages, exclusions, fréquence)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les trois températures sont couvertes avec des messages adaptés.",
        "Exclusions et gestion de la fréquence sont prévues.",
        "Le consentement et la non-discrimination sont respectés.",
      ],
      resources: ["Gabarit de plan d'audiences (ressource interne)"],
      glossary: [{ term: "Audience personnalisée", definition: "Audience bâtie à partir de vos propres contacts, avec consentement." }],
      summary:
        "On adapte message et offre à la température de l'audience (froide/tiède/chaude), on exclut le non-pertinent, on retargete avec mesure, et on respecte confidentialité et non-discrimination.",
      selfAssessment: [
        "Ai-je adapté mes messages à la température des audiences ?",
        "Mon ciblage respecte-t-il consentement et non-discrimination ?",
      ],
      quiz: { id: "mkt-v2-m4-l6-qz", questionIds: ["mkt-v2-m4-q13", "mkt-v2-m4-q14"], passThreshold: 70 },
      keyTakeaways: [
        "Froide (informer), tiède (faire avancer), chaude (convertir).",
        "Exclusions + retargeting maîtrisé = meilleur rendement.",
        "Confidentialité, consentement, non-discrimination : non négociables.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la création publicitaire (leçon 11.3)." },
        { condition: "score < 70", message: "Revoyez les températures d'audience et les exclusions." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 11.3.",
    },
    {
      id: "mkt-v2-m4-l7",
      module: 4,
      week: 11,
      title: "Création publicitaire et rédaction d'annonce",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une bonne annonce capte, convainc et fait agir — honnêtement. Cette leçon décompose l'annonce (angle, accroche, bénéfice, preuve, CTA), rappelle la cohérence annonce-page et les interdits de la publicité trompeuse.",
      objectives: [
        "Choisir un angle publicitaire et une accroche",
        "Structurer une annonce (problème, bénéfice, preuve, objection, offre, CTA)",
        "Adapter la création aux formats et au mobile",
        "Assurer la cohérence annonce-page et éviter la publicité trompeuse",
      ],
      competencies: ["C12"],
      prerequisites: ["Copywriting (M3, 9.1) ; audiences (11.2)"],
      sections: [
        {
          heading: "L'angle publicitaire",
          body: [
            "L'angle est la porte d'entrée du message : le même produit peut être présenté sous l'angle du gain de temps, de la tranquillité, du statut ou de l'économie. On choisit l'angle en fonction du persona et de son besoin dominant (Module 2). Tester plusieurs angles révèle celui qui résonne le mieux.",
          ],
        },
        {
          heading: "La structure d'une annonce",
          body: [
            "Une annonce efficace enchaîne : une accroche (capte l'attention), le problème ou le désir, le bénéfice principal, une preuve (avis, chiffre vérifiable, démonstration), la levée d'une objection, l'offre et un appel à l'action clair. Sur les réseaux, l'accroche est décisive : les premières secondes/mots décident si le reste est vu.",
          ],
        },
        {
          heading: "Formats et mobile",
          body: [
            "Image, vidéo, carrousel, démonstration : chaque format sert des objectifs différents. La majorité des vues se font sur mobile : on conçoit vertical, lisible sans son (sous-titres), avec un message compréhensible en quelques secondes. On prépare plusieurs variations créatives pour tester et lutter contre la fatigue publicitaire.",
          ],
        },
        {
          heading: "Cohérence et honnêteté",
          body: [
            "L'annonce doit tenir la même promesse que la page vers laquelle elle mène (cohérence annonce-page). Elle respecte les politiques des plateformes et n'utilise jamais de témoignage inventé, de fausse performance, ni de publicité trompeuse. On ne promet jamais de résultat garanti ; une allégation chiffrée doit être vraie et vérifiable.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Angle publicitaire", definition: "Porte d'entrée du message (gain de temps, tranquillité, économie…)." },
        { term: "Variation créative", definition: "Version alternative d'une annonce testée pour comparer l'efficacité." },
        { term: "Cohérence annonce-page", definition: "La page tient la promesse faite dans l'annonce." },
      ],
      examples: [
        "Angle « tranquillité » pour un logiciel : « Dormez tranquille, vos factures sont en règle ».",
        "Vidéo mobile verticale sous-titrée : compréhensible sans le son, accroche en 2 secondes.",
      ],
      commonError: {
        title: "La publicité trompeuse",
        body:
          "Faux témoignages, fausses performances, promesses de résultats garantis : interdits, contraires aux politiques des plateformes et à la loi. Une annonce persuade par la vérité et la preuve, jamais par la tromperie.",
      },
      vigilancePoint: {
        title: "Cohérence annonce-page obligatoire",
        body:
          "Une annonce qui promet ce que la page ne tient pas fait fuir et dégrade la confiance. La promesse doit être identique de l'annonce à la page.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Studio Lumen (services, Québec) — Simulation pédagogique, aucune diffusion réelle",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le studio fictif Lumen testait (en simulation) une seule annonce à l'angle « pas cher », qui attirait des demandes non qualifiées.",
          "En testant trois angles (qualité, rapidité, tranquillité) auprès du bon persona et en alignant l'annonce sur la page, Lumen a identifié l'angle « tranquillité » comme le plus pertinent. La création honnête et cohérente a amélioré la qualité des prospects simulés — sans aucune publicité réellement diffusée.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l7-ia1",
          title: "Améliorer une annonce",
          objective: "Transformer une annonce faible en annonce claire et honnête.",
          instructions: [
            "Améliorez : « La meilleure agence, résultats garantis, cliquez ! » pour un studio photo B2B.",
          ],
          answerKey: [
            "Exemple : « Des photos produits qui vendent — réservez une séance, premiers visuels sous 5 jours. » Bénéfice concret, preuve implicite, CTA honnête, aucune garantie trompeuse.",
          ],
          feedback: "On remplace le superlatif et la garantie par un bénéfice concret et un CTA vrai.",
          successCriterion: "Annonce claire, spécifique, sans promesse de résultat garanti.",
        },
        {
          id: "mkt-v2-m4-l7-ia2",
          title: "Comparer trois angles publicitaires",
          objective: "Choisir l'angle le plus pertinent pour un persona.",
          instructions: [
            "Persona : dirigeant B2B débordé et prudent. Classez par pertinence : (a) « le moins cher » ; (b) « installation en 1 jour, sans formation » ; (c) « design tendance ».",
          ],
          answerKey: ["(b) le plus pertinent (gain de temps, faible risque) ; (a) et (c) secondaires pour ce persona."],
          feedback: "L'angle gagnant répond au besoin dominant du persona.",
          successCriterion: "Angle (b) identifié comme le plus pertinent.",
        },
      ],
      exercise: {
        title: "Trois annonces, trois angles",
        prompt: [
          "Pour votre offre, rédigez 3 annonces selon 3 angles différents (accroche, bénéfice, preuve, CTA).",
          "Vérifiez la cohérence avec la page cible et l'absence de tromperie.",
        ],
        deliverables: ["3 annonces (3 angles) + 2 concepts visuels décrits, conformes et cohérents avec la page."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Les trois angles sont distincts et adaptés au persona.",
        "Chaque annonce a accroche, bénéfice, preuve, CTA.",
        "Aucune tromperie ; cohérence annonce-page respectée.",
      ],
      resources: ["Aide-mémoire structure d'annonce (ressource interne)"],
      glossary: [{ term: "Accroche", definition: "Élément d'ouverture qui capte l'attention dans les premières secondes." }],
      summary:
        "Une annonce efficace choisit un angle adapté au persona, enchaîne accroche-bénéfice-preuve-CTA, est pensée mobile, cohérente avec la page et strictement honnête.",
      selfAssessment: [
        "Mes annonces testent-elles des angles adaptés au persona ?",
        "Sont-elles cohérentes avec la page et sans tromperie ?",
      ],
      quiz: { id: "mkt-v2-m4-l7-qz", questionIds: ["mkt-v2-m4-q12", "mkt-v2-m4-q10"], passThreshold: 70 },
      keyTakeaways: [
        "L'angle se choisit selon le besoin dominant du persona.",
        "Accroche-bénéfice-preuve-CTA, pensé mobile.",
        "Jamais de publicité trompeuse ; cohérence annonce-page.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour le budget et les enchères (leçon 11.4)." },
        { condition: "score < 70", message: "Revoyez la structure d'annonce et la cohérence annonce-page." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 11.4.",
    },
    {
      id: "mkt-v2-m4-l8",
      module: 4,
      week: 11,
      title: "Budget, enchères et planification",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Un budget publicitaire se pilote avec méthode : tester petit, mesurer, puis amplifier ce qui marche. Cette leçon présente les types de budget, le CPA maximal acceptable et la planification par scénarios.",
      objectives: [
        "Distinguer budget journalier, total et budget de test",
        "Calculer un CPA maximal acceptable selon la marge",
        "Planifier par scénarios (pessimiste, réaliste, optimiste)",
        "Décider d'arrêter ou d'amplifier une campagne",
      ],
      competencies: ["C12"],
      prerequisites: ["Leçons 11.1 à 11.3"],
      formulas: [
        { name: "CPA maximal acceptable", expression: "marge disponible par vente (avant acquisition)", example: "Marge 40 $/vente → CPA max ≈ 40 $ pour être au seuil de rentabilité — jeu de données pédagogique fictif" },
        { name: "Budget de test", expression: "petit budget borné pour valider une hypothèse avant d'amplifier", example: "100 $ (simulé) pour tester 3 annonces avant d'investir davantage — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "Types de budget",
          body: [
            "Le budget journalier plafonne la dépense par jour ; le budget total borne l'ensemble d'une campagne. Le budget de test est un petit montant dédié à valider une hypothèse (audience, angle) avant d'investir davantage. On ne mise jamais gros sur une hypothèse non testée.",
          ],
        },
        {
          heading: "Le CPA maximal acceptable",
          body: [
            "La question centrale : combien peut-on payer pour acquérir un client sans perdre d'argent ? Le CPA maximal acceptable découle de la marge réellement disponible par vente (et idéalement de la valeur vie client). Si la marge est de 40 $ (simulé), payer plus de 40 $ pour un achat unique fait perdre de l'argent. Ce seuil guide toutes les décisions de budget.",
          ],
        },
        {
          heading: "Planifier par scénarios",
          body: [
            "Comme on ne connaît pas les résultats d'avance, on planifie trois scénarios : pessimiste (coûts élevés, faible conversion), réaliste et optimiste. Cette prudence évite les prévisions grandioses et prépare aux mauvaises surprises. On ne promet jamais de performances garanties.",
          ],
        },
        {
          heading: "Arrêter ou amplifier",
          body: [
            "On laisse d'abord la phase d'apprentissage se stabiliser, puis on décide sur des données suffisantes : arrêter ce qui dépasse le CPA maximal sans espoir d'amélioration, amplifier progressivement ce qui est rentable (augmenter le budget par paliers pour ne pas casser l'apprentissage). Chaque décision est documentée pour apprendre.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "CPA maximal acceptable", definition: "Coût d'acquisition à ne pas dépasser pour rester rentable, selon la marge." },
        { term: "Budget de test", definition: "Petit budget borné servant à valider une hypothèse avant d'amplifier." },
        { term: "Montée en puissance", definition: "Augmentation progressive du budget d'une campagne rentable." },
      ],
      examples: [
        "Marge 40 $/vente (simulé) → CPA max ≈ 40 $. À 55 $ de CPA, la campagne perd de l'argent : on l'arrête ou on l'optimise.",
        "Test à 100 $ (simulé) sur 3 annonces → on amplifie uniquement la gagnante.",
      ],
      commonError: {
        title: "Miser gros sans tester",
        body:
          "Investir un gros budget sur une hypothèse non validée est le meilleur moyen de perdre de l'argent. On teste petit, puis on amplifie ce qui fonctionne.",
      },
      vigilancePoint: {
        title: "Aucune performance garantie",
        body:
          "On ne promet jamais de résultat garanti ni de ROAS assuré. Les prévisions sont des scénarios prudents, clairement identifiés comme simulations, jamais des certitudes.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréal Tech (technologie, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "L'entreprise fictive Boréal Tech avait engagé (en simulation) un gros budget sur une seule audience non testée, avec un CPA cible flou.",
          "En repartant du CPA maximal acceptable (calculé sur sa marge simulée) et en testant petit avant d'amplifier, Boréal Tech a évité de brûler son budget et a concentré l'investissement sur l'audience rentable. La discipline budgétaire — tester, mesurer, amplifier — a protégé la rentabilité simulée.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l8-ia1",
          title: "Répartir un budget simulé",
          objective: "Allouer un budget de test entre hypothèses.",
          instructions: [
            "Jeu de données pédagogique fictif : budget de test 150 $, 3 audiences à comparer. Comment répartir prudemment ?",
          ],
          answerKey: [
            "Répartir ~50 $ par audience pour comparer à conditions égales, puis réallouer vers la plus rentable — sans tout miser d'emblée.",
          ],
          feedback: "On teste à conditions comparables avant de concentrer le budget.",
          successCriterion: "Répartition équilibrée de test proposée + réallocation vers la gagnante.",
        },
        {
          id: "mkt-v2-m4-l8-ia2",
          title: "Calculer un CPA maximal acceptable",
          objective: "Déduire le CPA plafond d'une marge.",
          instructions: ["Jeu de données pédagogique fictif : marge de 30 $ par vente, achat unique. Quel est le CPA maximal au seuil de rentabilité ?"],
          answerKey: ["≈ 30 $ : au-delà, chaque acquisition fait perdre de l'argent (hors valeur vie client)."],
          feedback: "Le CPA max au seuil = marge disponible par vente.",
          successCriterion: "CPA max ≈ 30 $ identifié.",
        },
      ],
      exercise: {
        title: "Plan budgétaire simulé",
        prompt: [
          "Pour votre campagne simulée, fixez un budget de test, un budget journalier et un CPA maximal acceptable (à partir d'une marge simulée).",
          "Rédigez 3 scénarios (pessimiste, réaliste, optimiste) et vos règles d'arrêt/amplification.",
        ],
        deliverables: ["Un plan budgétaire simulé (test, journalier, CPA max, 3 scénarios, règles d'arrêt)."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Le CPA maximal acceptable est calculé à partir de la marge.",
        "Un budget de test précède l'amplification.",
        "Les scénarios sont prudents ; aucune performance garantie.",
      ],
      resources: ["Gabarit plan budgétaire + scénarios (ressource interne)"],
      glossary: [{ term: "Seuil de rentabilité", definition: "Point où les revenus couvrent exactement les coûts." }],
      summary:
        "On pilote le budget par le CPA maximal acceptable (issu de la marge), on teste petit avant d'amplifier, et on planifie par scénarios prudents — jamais de performance garantie.",
      selfAssessment: [
        "Ai-je calculé mon CPA maximal acceptable ?",
        "Est-ce que je teste avant d'amplifier ?",
      ],
      quiz: { id: "mkt-v2-m4-l8-qz", questionIds: ["mkt-v2-m4-q15", "mkt-v2-m4-q16"], passThreshold: 70 },
      keyTakeaways: [
        "Le CPA maximal acceptable découle de la marge (et de la LTV).",
        "Tester petit, amplifier ce qui marche.",
        "Scénarios prudents ; aucune performance garantie.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 11 maîtrisée. Passez à la conversion et à la mesure (semaine 12)." },
        { condition: "score < 70", message: "Revoyez le CPA maximal acceptable et la logique test → amplification." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 11 + le quiz hebdomadaire ; déposer le DOSSIER DE CAMPAGNE PUBLICITAIRE (simulé) avant la semaine 12.",
    },

    // ══════════════ SEMAINE 12 — CONVERSION, MESURE ET OPTIMISATION ══════════════
    {
      id: "mkt-v2-m4-l9",
      module: 4,
      week: 12,
      title: "Concevoir une page de destination",
      authored: true,
      durationMinutes: 90,
      introduction:
        "La page de destination transforme un clic en action. Cette leçon en présente les composantes, l'importance de l'objectif unique et de la cohérence avec l'annonce, et les erreurs qui tuent la conversion.",
      objectives: [
        "Concevoir une page à objectif unique",
        "Structurer titre, promesse, bénéfices, preuve, objections, CTA",
        "Optimiser formulaire, mobile, vitesse et accessibilité",
        "Assurer la cohérence message-annonce-page et supprimer les distractions",
      ],
      competencies: ["C13"],
      prerequisites: ["Création d'annonce (11.3) ; copywriting (M3)"],
      sections: [
        {
          heading: "Un objectif unique",
          body: [
            "Une page de destination efficace vise UNE action (s'inscrire, acheter, réserver). Multiplier les objectifs et les liens disperse l'attention et réduit la conversion. On supprime les distractions (menus superflus, liens sortants) pour concentrer le visiteur sur l'action visée.",
          ],
        },
        {
          heading: "Les composantes",
          body: [
            "Titre clair (la promesse), sous-titre, bénéfices concrets, preuve (avis authentiques, chiffres vérifiables, démonstration), levée des objections, réassurance (garantie, sécurité), FAQ, et un appel à l'action visible et répété. Chaque élément répond à une question ou une hésitation du visiteur.",
          ],
        },
        {
          heading: "Formulaire, mobile, vitesse, accessibilité",
          body: [
            "Le formulaire ne demande que le nécessaire : chaque champ en plus réduit la conversion. La page doit être rapide (une page lente fait fuir), pensée mobile d'abord, et accessible (contrastes, textes alternatifs, navigation clavier). Ces facteurs techniques pèsent autant que le texte.",
          ],
        },
        {
          heading: "Cohérence message-annonce-page",
          body: [
            "La page doit tenir exactement la promesse de l'annonce (mêmes mots-clés, même offre). Une rupture entre l'annonce et la page (message différent, offre absente) provoque l'abandon immédiat. La continuité rassure et confirme au visiteur qu'il est au bon endroit.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Page de destination", definition: "Page conçue pour une action unique (inscription, achat, réservation)." },
        { term: "Réassurance", definition: "Éléments qui rassurent (garantie, sécurité, avis) et lèvent le risque perçu." },
        { term: "Objectif unique", definition: "Une seule action visée par la page, sans distraction concurrente." },
      ],
      examples: [
        "Page d'essai gratuit : titre = promesse, un bouton unique « Démarrer l'essai », formulaire à 2 champs, avis clients.",
        "Suppression du menu de navigation pour éviter les sorties.",
      ],
      commonError: {
        title: "Une page à tout faire",
        body:
          "Une page avec plusieurs objectifs, de longs menus et des liens partout disperse le visiteur. Un objectif unique et le retrait des distractions augmentent la conversion.",
      },
      vigilancePoint: {
        title: "Accessibilité et honnêteté",
        body:
          "La page doit être accessible (contrastes, alternatives textuelles) et ne comporter ni faux avis, ni fausse rareté, ni dark pattern (case précochée trompeuse, désinscription cachée).",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada)",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO envoyait son trafic vers sa page d'accueil chargée de liens, sans objectif clair. Peu de conversions.",
          "En créant une page de destination à objectif unique (cohérente avec l'annonce, formulaire court, preuve, accessible et rapide), InfusiO a fortement augmenté son taux de conversion. Concentrer la page sur une seule action a suffi à débloquer le résultat.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l9-ia1",
          title: "Analyser une page d'atterrissage",
          objective: "Repérer les défauts qui nuisent à la conversion.",
          instructions: [
            "Une page a : un menu complet, 3 CTA différents, un formulaire de 10 champs, aucune preuve. Citez 3 améliorations.",
          ],
          answerKey: [
            "1) Retirer le menu/distractions ; 2) un seul CTA (objectif unique) ; 3) réduire le formulaire + ajouter une preuve (avis).",
          ],
          feedback: "Objectif unique + formulaire court + preuve = meilleure conversion.",
          successCriterion: "Au moins 2 améliorations pertinentes.",
        },
      ],
      exercise: {
        title: "Maquette de page de destination",
        prompt: [
          "Concevez la maquette (structure) d'une page de destination pour votre offre : titre, bénéfices, preuve, objections, CTA, formulaire.",
          "Vérifiez la cohérence avec l'annonce et l'accessibilité.",
        ],
        deliverables: ["Une maquette structurée de page de destination (objectif unique, cohérente, accessible)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La page a un objectif unique et supprime les distractions.",
        "Preuve, réassurance et CTA clair sont présents.",
        "Cohérence annonce-page et accessibilité respectées.",
      ],
      resources: ["Gabarit de page de destination (ressource interne)"],
      glossary: [{ term: "Dark pattern", definition: "Procédé d'interface trompeur poussant à une action non voulue (interdit)." }],
      summary:
        "Une page de destination efficace poursuit un objectif unique, présente promesse, bénéfices, preuve et CTA clair, reste rapide/mobile/accessible, et tient exactement la promesse de l'annonce.",
      selfAssessment: [
        "Ma page a-t-elle un objectif unique et une preuve ?",
        "Est-elle cohérente avec l'annonce et accessible ?",
      ],
      quiz: { id: "mkt-v2-m4-l9-qz", questionIds: ["mkt-v2-m4-q19", "mkt-v2-m4-q06"], passThreshold: 70 },
      keyTakeaways: [
        "Un objectif unique, sans distraction, convertit mieux.",
        "Formulaire court + preuve + accessibilité.",
        "La page tient exactement la promesse de l'annonce.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à mesurer les performances (leçon 12.2)." },
        { condition: "score < 70", message: "Revoyez l'objectif unique et la cohérence annonce-page." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 12.2.",
    },
    {
      id: "mkt-v2-m4-l10",
      module: 4,
      week: 12,
      title: "Mesurer les performances",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Sans mesure, impossible de savoir si une campagne rapporte. Cette leçon présente les indicateurs clés et leurs calculs, distingue les métriques de vanité des indicateurs utiles, et introduit le ROAS.",
      objectives: [
        "Calculer CTR, CPC, CPM, taux de conversion, CPL et CPA",
        "Interpréter ROAS, ROI, CAC et valeur vie client",
        "Distinguer métriques de vanité et indicateurs de décision",
        "Lire un tableau de bord de performance",
      ],
      competencies: ["C13"],
      prerequisites: ["Indicateurs de base (M1) ; objectifs (10.3)"],
      formulas: [
        { name: "CTR", expression: "clics / impressions × 100", example: "(50 / 5000) × 100 = 1 % — jeu de données pédagogique fictif" },
        { name: "CPC", expression: "dépenses / clics", example: "100 $ / 50 = 2 $ — jeu de données pédagogique fictif" },
        { name: "CPM", expression: "dépenses / impressions × 1000", example: "100 $ / 5000 × 1000 = 20 $ — jeu de données pédagogique fictif" },
        { name: "Taux de conversion", expression: "conversions / visiteurs × 100", example: "(10 / 500) × 100 = 2 % — jeu de données pédagogique fictif" },
        { name: "CPL", expression: "dépenses / prospects", example: "200 $ / 40 = 5 $ — jeu de données pédagogique fictif" },
        { name: "CPA", expression: "dépenses / acquisitions", example: "300 $ / 15 = 20 $ — jeu de données pédagogique fictif" },
        { name: "ROAS", expression: "revenus attribués / dépenses publicitaires", example: "800 $ / 200 $ = 4 (soit 4×) — jeu de données pédagogique fictif" },
        { name: "ROI", expression: "gain net / coût total × 100", example: "((800 − 200) / 200) × 100 = 300 % — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "Les indicateurs de diffusion et de clic",
          body: [
            "Impressions (affichages), portée (personnes uniques), fréquence (répétitions), clics, CTR (taux de clic = clics/impressions), CPC (coût par clic), CPM (coût pour mille impressions). Ces indicateurs décrivent l'attention captée mais ne disent rien, seuls, de la rentabilité.",
          ],
        },
        {
          heading: "Les indicateurs de conversion et de coût",
          body: [
            "Taux de conversion (conversions/visiteurs), CPL (coût par prospect), CPA (coût par acquisition). Ils relient la dépense à un résultat. Le CPA se compare au CPA maximal acceptable (leçon 11.4) pour juger la rentabilité.",
          ],
        },
        {
          heading: "Rentabilité : ROAS, ROI, CAC, LTV",
          body: [
            "Le ROAS (revenus attribués / dépenses) mesure le retour publicitaire : un ROAS de 4 signifie 4 $ de revenu pour 1 $ dépensé (avant marge). Le ROI intègre le coût total. Le CAC (coût d'acquisition client) et la LTV (valeur vie client) situent la rentabilité dans la durée : un CPA élevé peut rester viable si la LTV est forte. Tous ces chiffres, ici, sont des simulations pédagogiques.",
          ],
        },
        {
          heading: "Vanité vs décision",
          body: [
            "Les métriques de vanité (« j'aime », abonnés, impressions brutes) flattent sans guider la décision. Les indicateurs utiles relient une dépense à un résultat d'affaires (CPA, ROAS, taux de conversion). Un tableau de bord bien conçu met en avant ces derniers et relègue les métriques de vanité.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "CTR", definition: "Taux de clic = clics / impressions × 100." },
        { term: "ROAS", definition: "Retour sur dépenses publicitaires = revenus attribués / dépenses." },
        { term: "Métrique de vanité", definition: "Indicateur flatteur sans lien direct avec un résultat d'affaires." },
      ],
      examples: [
        "Jeu de données pédagogique fictif : 5000 impressions, 50 clics → CTR 1 % ; 100 $ dépensés → CPC 2 $.",
        "Jeu de données pédagogique fictif : 200 $ dépensés, 800 $ de revenu attribué → ROAS 4×.",
      ],
      commonError: {
        title: "Se réjouir des métriques de vanité",
        body:
          "Un fort nombre de clics ou d'abonnés peut masquer une absence de ventes. On juge sur le CPA, le ROAS et le taux de conversion, pas sur les indicateurs flatteurs.",
      },
      vigilancePoint: {
        title: "Données simulées, jamais garanties",
        body:
          "Tous les chiffres du module sont des « Jeu de données pédagogique fictif ». Aucun ROAS ni performance ne doit être présenté comme réel ou garanti.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Café Nord-Berge (torréfacteur, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le café fictif Nord-Berge se félicitait d'un fort nombre de clics et d'abonnés (métriques de vanité), mais ignorait son CPA.",
          "En calculant CPA et ROAS (sur données simulées), l'équipe a découvert que la campagne « populaire » n'était pas rentable, tandis qu'une autre, plus discrète, l'était. Mesurer les bons indicateurs a réorienté le budget vers ce qui rapportait vraiment.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l10-ia1",
          title: "Calculer CTR, CPC et ROAS",
          objective: "Appliquer les formules sur des données simulées.",
          instructions: [
            "Jeu de données pédagogique fictif : 8000 impressions, 160 clics, 240 $ dépensés, 4 ventes, 720 $ de revenu. Calculez CTR, CPC et ROAS.",
          ],
          answerKey: [
            "CTR = 160/8000 × 100 = 2 % ; CPC = 240/160 = 1,50 $ ; ROAS = 720/240 = 3 (3×).",
          ],
          feedback: "CTR = clics/impressions ; CPC = dépenses/clics ; ROAS = revenus/dépenses.",
          successCriterion: "Les 3 valeurs correctes (2 %, 1,50 $, 3×).",
        },
        {
          id: "mkt-v2-m4-l10-ia2",
          title: "Interpréter un tableau de performances",
          objective: "Repérer la campagne rentable au-delà des vanités.",
          instructions: [
            "Jeu de données pédagogique fictif : Campagne A — CPA 12 $, marge 30 $ ; Campagne B — 5000 clics, CPA 45 $, marge 30 $. Laquelle est rentable ?",
          ],
          answerKey: ["Campagne A (CPA 12 $ < marge 30 $) est rentable ; B (CPA 45 $ > marge 30 $) perd de l'argent malgré ses clics."],
          feedback: "On compare le CPA à la marge (CPA maximal acceptable), pas le volume de clics.",
          successCriterion: "Campagne A identifiée comme rentable.",
        },
      ],
      exercise: {
        title: "Tableau de bord d'indicateurs",
        prompt: [
          "Construisez un tableau de bord simulé pour votre campagne : impressions, clics, CTR, CPC, conversions, taux de conversion, CPA, ROAS.",
          "Indiquez quels indicateurs sont décisionnels et lesquels sont des vanités.",
        ],
        deliverables: ["Un tableau de bord d'indicateurs (données simulées) distinguant décision et vanité."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les calculs (CTR, CPC, CPA, ROAS) sont exacts.",
        "Les indicateurs décisionnels sont distingués des vanités.",
        "Toutes les données sont identifiées comme simulées.",
      ],
      resources: ["Feuille de calcul d'indicateurs (ressource interne)"],
      glossary: [{ term: "CPA", definition: "Coût par acquisition = dépenses / acquisitions." }],
      summary:
        "On mesure la performance par des indicateurs reliant dépense et résultat (CTR, CPC, CPA, ROAS, LTV) et non par des métriques de vanité ; ici, tous les chiffres sont des simulations.",
      selfAssessment: [
        "Sais-je calculer CTR, CPC, CPA et ROAS ?",
        "Est-ce que je juge sur des indicateurs de décision, pas de vanité ?",
      ],
      quiz: { id: "mkt-v2-m4-l10-qz", questionIds: ["mkt-v2-m4-q17", "mkt-v2-m4-q18"], passThreshold: 70 },
      keyTakeaways: [
        "CTR = clics/impressions ; CPC = dépenses/clics ; CPA = dépenses/acquisitions ; ROAS = revenus/dépenses.",
        "On juge sur CPA/ROAS, pas sur les métriques de vanité.",
        "Toutes les données sont simulées, jamais garanties.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour le suivi, l'attribution et les tests A/B (leçon 12.3)." },
        { condition: "score < 70", message: "Revoyez les formules et la distinction vanité/décision." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 12.3.",
    },
    {
      id: "mkt-v2-m4-l11",
      module: 4,
      week: 12,
      title: "Suivi, attribution et tests A/B",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Mesurer suppose de savoir d'où viennent les résultats. Cette leçon présente UTM, événements et attribution, puis les principes d'un test A/B fiable et les pièges des « faux gagnants ».",
      objectives: [
        "Mettre en place un suivi (UTM, événements) respectueux du consentement",
        "Comprendre les modèles d'attribution et leurs limites",
        "Concevoir un test A/B à variable unique",
        "Interpréter prudemment et éviter les faux gagnants",
      ],
      competencies: ["C13"],
      prerequisites: ["Mesure des performances (12.2)"],
      sections: [
        {
          heading: "Suivre l'origine : UTM et événements",
          body: [
            "Les paramètres UTM ajoutés aux liens identifient la source, le support et la campagne d'une visite (d'où vient le trafic). Les événements (clic, inscription, achat) enregistrent les actions clés. Ce suivi doit respecter le consentement et la vie privée : on informe et on ne collecte que le nécessaire.",
          ],
        },
        {
          heading: "L'attribution et ses limites",
          body: [
            "L'attribution associe une conversion aux points de contact qui l'ont provoquée : premier clic (mérite à la découverte), dernier clic (au déclencheur final), ou attribution assistée (répartie). Aucune n'est parfaite : la fenêtre de conversion, les restrictions des navigateurs et les données déclaratives limitent la précision. On interprète l'attribution comme une indication, pas une vérité absolue.",
          ],
        },
        {
          heading: "Le test A/B",
          body: [
            "Un test A/B compare deux versions en ne changeant qu'UNE variable (un titre, une image, un CTA), sur un échantillon suffisant et une durée suffisante, avec un groupe témoin. Changer plusieurs éléments à la fois empêche de savoir lequel a agi. Le test part d'une hypothèse claire (« ce titre augmentera le taux de clic »).",
          ],
        },
        {
          heading: "Faux gagnants et prudence",
          body: [
            "Sur trop peu de données ou trop peu de temps, une version peut sembler gagnante par hasard (faux gagnant). On attend un volume et une durée suffisants avant de conclure, et on documente chaque test. La prudence statistique évite de tirer des règles de quelques clics.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Paramètre UTM", definition: "Étiquette ajoutée à un lien pour identifier la source d'une visite." },
        { term: "Attribution", definition: "Modèle associant une conversion à ses points de contact (premier/dernier clic, assistée)." },
        { term: "Test A/B", definition: "Comparaison de deux versions ne différant que par une seule variable." },
        { term: "Faux gagnant", definition: "Version paraissant gagnante à cause d'un échantillon insuffisant." },
      ],
      examples: [
        "UTM : ...?utm_source=infolettre&utm_medium=courriel&utm_campaign=lancement_hiver.",
        "Test A/B : même page, deux titres différents ; on mesure le taux de conversion sur un volume suffisant.",
      ],
      commonError: {
        title: "Conclure trop vite un test A/B",
        body:
          "Déclarer un gagnant après 20 visites est trompeur : c'est probablement du hasard. On attend un échantillon et une durée suffisants avant de décider.",
      },
      vigilancePoint: {
        title: "Consentement et respect des données",
        body:
          "Le suivi (UTM, événements, pixels) doit respecter le consentement et la vie privée, avec une finalité claire. Aucune donnée personnelle réelle n'est utilisée dans ce module.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — OutiPro (logiciel B2B, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "Le logiciel fictif OutiPro changeait à la fois le titre, l'image et le CTA d'une page, puis attribuait la hausse au « nouveau design ». Impossible de savoir ce qui avait agi.",
          "En testant une seule variable à la fois, sur un volume suffisant et avec un suivi UTM propre, OutiPro a identifié précisément le changement gagnant (le titre) et évité les faux gagnants. La rigueur du test a rendu les décisions fiables.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l11-ia1",
          title: "Créer des paramètres UTM",
          objective: "Composer une URL suivie correctement.",
          instructions: [
            "Complétez les UTM d'un lien pour : source = infolettre, support = courriel, campagne = promo_printemps.",
          ],
          answerKey: ["...?utm_source=infolettre&utm_medium=courriel&utm_campaign=promo_printemps."],
          feedback: "source = d'où vient la visite ; medium = type de canal ; campaign = nom de la campagne.",
          successCriterion: "Les 3 paramètres correctement renseignés.",
        },
        {
          id: "mkt-v2-m4-l11-ia2",
          title: "Définir une hypothèse A/B",
          objective: "Formuler un test à variable unique.",
          instructions: [
            "Proposez une hypothèse A/B correcte pour améliorer une page dont le taux de conversion est faible (une seule variable).",
          ],
          answerKey: [
            "Exemple : « Remplacer le titre X par le titre Y augmentera le taux de conversion » — on ne change QUE le titre, on mesure sur un volume suffisant.",
          ],
          feedback: "Une seule variable, une hypothèse mesurable, un échantillon suffisant.",
          successCriterion: "Hypothèse à variable unique, mesurable.",
        },
      ],
      exercise: {
        title: "Plan de suivi + test A/B",
        prompt: [
          "Définissez le suivi de votre campagne : 3 événements clés + un schéma d'UTM.",
          "Rédigez une hypothèse de test A/B (variable unique) et les conditions d'interprétation prudente.",
        ],
        deliverables: ["Un plan de suivi (événements + UTM) + une hypothèse A/B avec conditions d'interprétation."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le suivi respecte le consentement et une finalité claire.",
        "Le test A/B ne change qu'une variable.",
        "L'interprétation prévoit un volume/durée suffisants (anti faux gagnant).",
      ],
      resources: ["Générateur d'UTM et gabarit de test A/B (ressource interne)"],
      glossary: [{ term: "Fenêtre de conversion", definition: "Délai pendant lequel une conversion est attribuée à un contact." }],
      summary:
        "Le suivi (UTM, événements) et l'attribution situent l'origine des résultats, avec leurs limites ; un test A/B fiable ne change qu'une variable, sur un volume suffisant, dans le respect du consentement.",
      selfAssessment: [
        "Mon suivi respecte-t-il le consentement ?",
        "Mes tests A/B ne changent-ils qu'une variable à la fois ?",
      ],
      quiz: { id: "mkt-v2-m4-l11-qz", questionIds: ["mkt-v2-m4-q20", "mkt-v2-m4-q17"], passThreshold: 70 },
      keyTakeaways: [
        "UTM + événements = savoir d'où viennent les résultats.",
        "Aucune attribution n'est parfaite ; on interprète avec prudence.",
        "Test A/B : une seule variable, volume suffisant, pas de faux gagnant.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à optimiser et décider (leçon 12.4)." },
        { condition: "score < 70", message: "Revoyez UTM/attribution et les règles d'un test A/B fiable." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 12.4.",
    },
    {
      id: "mkt-v2-m4-l12",
      module: 4,
      week: 12,
      title: "Optimiser une campagne et prendre une décision",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Optimiser, c'est diagnostiquer la cause d'un résultat décevant et décider : continuer, modifier ou arrêter. Cette leçon fournit une méthode de diagnostic et des règles de décision fondées sur la rentabilité.",
      objectives: [
        "Diagnostiquer la cause d'une sous-performance (trafic, CTR, page, offre…)",
        "Prioriser les améliorations à fort impact",
        "Appliquer des règles d'arrêt fondées sur la rentabilité",
        "Décider : continuer, modifier ou arrêter, et communiquer les résultats",
      ],
      competencies: ["C13"],
      prerequisites: ["Leçons 12.1 à 12.3"],
      sections: [
        {
          heading: "Diagnostiquer par étape",
          body: [
            "Une campagne décevante a une cause localisable. Peu de trafic → problème d'audience/budget ; CTR faible → annonce/angle peu pertinent ; CPC élevé → concurrence/qualité ; page lente ou peu claire → conversion faible ; formulaire trop long → abandon ; prospects de mauvaise qualité → ciblage ou offre inadaptés. On isole l'étape défaillante avant d'agir, comme pour l'entonnoir.",
          ],
        },
        {
          heading: "Prioriser l'impact",
          body: [
            "Toutes les corrections n'ont pas le même effet. On priorise celles qui touchent l'étape qui fuit le plus et qui sont réalisables rapidement. Corriger un formulaire de 12 champs a souvent plus d'impact que peaufiner une couleur de bouton.",
          ],
        },
        {
          heading: "Règles d'arrêt",
          body: [
            "On fixe à l'avance des règles d'arrêt fondées sur la rentabilité : par exemple, arrêter une annonce dont le CPA dépasse durablement le CPA maximal acceptable sans signe d'amélioration après la phase d'apprentissage. Ces règles évitent de « laisser tourner par espoir » une campagne qui perd de l'argent.",
          ],
        },
        {
          heading: "Décider et communiquer",
          body: [
            "Trois décisions possibles : continuer (rentable, on peut amplifier), modifier (une cause identifiée, on itère), arrêter (non rentable sans perspective). On documente la décision, ses raisons et les apprentissages, puis on communique les résultats de façon honnête — sans embellir ni inventer de performance.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Règle d'arrêt", definition: "Critère fixé d'avance déclenchant l'arrêt d'une campagne (souvent lié au CPA)." },
        { term: "Itération", definition: "Amélioration successive fondée sur le diagnostic et la mesure." },
        { term: "Priorisation par impact", definition: "Choix des corrections ayant le plus d'effet pour l'effort." },
      ],
      examples: [
        "CTR correct mais conversion faible → problème de page ou d'offre, pas d'annonce.",
        "Règle d'arrêt : « arrêter si CPA > 1,5 × CPA max pendant 5 jours après apprentissage » (simulé).",
      ],
      commonError: {
        title: "Laisser tourner par espoir",
        body:
          "Maintenir une campagne non rentable « au cas où » brûle le budget. Des règles d'arrêt définies à l'avance imposent une décision fondée sur les données.",
      },
      vigilancePoint: {
        title: "Communiquer honnêtement",
        body:
          "On ne présente jamais de fausse performance ni de résultat embelli. Les résultats — bons ou mauvais — sont rapportés fidèlement, avec les hypothèses et les limites.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Racine & Sol (organisme, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "L'organisme fictif Racine & Sol laissait tourner une campagne au CPA très supérieur à son seuil, en espérant un redressement.",
          "En appliquant un diagnostic (bon CTR, mauvaise conversion → page et formulaire) et des règles d'arrêt, l'équipe a corrigé la page, réduit le formulaire, puis relancé un test. La décision fondée sur les données — modifier plutôt que subir — a rétabli la rentabilité simulée, communiquée honnêtement.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m4-l12-ia1",
          title: "Décider : continuer, modifier ou arrêter",
          objective: "Choisir la bonne décision à partir d'un diagnostic.",
          instructions: [
            "Jeu de données pédagogique fictif : CTR élevé, trafic correct, mais taux de conversion très faible et CPA au-dessus du seuil. Que décider en priorité ?",
          ],
          answerKey: [
            "Modifier : la cause est en aval (page/offre/formulaire), pas l'annonce. On corrige la page/le formulaire, puis on reteste ; on n'arrête pas encore, on n'amplifie pas.",
          ],
          feedback: "Le diagnostic (annonce bonne, conversion faible) oriente vers une modification de la page/offre.",
          successCriterion: "Décision « modifier » (page/offre) justifiée.",
        },
      ],
      exercise: {
        title: "Plan d'optimisation + décision",
        prompt: [
          "À partir d'un jeu de données pédagogique fictif (fourni ou construit), diagnostiquez la cause principale et proposez un plan d'optimisation priorisé.",
          "Définissez vos règles d'arrêt et la décision (continuer/modifier/arrêter) justifiée.",
        ],
        deliverables: ["Un plan d'optimisation priorisé + règles d'arrêt + décision justifiée (données simulées)."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "La cause principale est correctement diagnostiquée.",
        "Les améliorations sont priorisées par impact.",
        "La décision s'appuie sur des règles d'arrêt et la rentabilité.",
      ],
      resources: ["Grille de diagnostic + règles d'arrêt (ressource interne)"],
      glossary: [{ term: "Qualité du prospect", definition: "Degré d'adéquation d'un prospect avec la cible et l'intention d'achat." }],
      summary:
        "Optimiser, c'est diagnostiquer l'étape défaillante, prioriser les corrections à fort impact, appliquer des règles d'arrêt fondées sur la rentabilité, puis décider (continuer/modifier/arrêter) et communiquer honnêtement.",
      selfAssessment: [
        "Sais-je diagnostiquer la cause d'une sous-performance ?",
        "Mes décisions reposent-elles sur des règles d'arrêt et la rentabilité ?",
      ],
      quiz: { id: "mkt-v2-m4-l12-qz", questionIds: ["mkt-v2-m4-q18", "mkt-v2-m4-q20"], passThreshold: 70 },
      keyTakeaways: [
        "On diagnostique l'étape qui fuit avant d'agir.",
        "Des règles d'arrêt évitent de brûler le budget par espoir.",
        "Décider (continuer/modifier/arrêter) et communiquer honnêtement.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Module 4 maîtrisé. Finalisez le plan complet d'acquisition et de conversion." },
        { condition: "score < 70", message: "Revoyez le diagnostic par étape et les règles d'arrêt." },
      ],
      progressionRule:
        "Compléter les 4 leçons de la semaine 12, le quiz hebdomadaire, le sommatif du module (≥ 70 %) et déposer le PLAN COMPLET D'ACQUISITION, PUBLICITÉ ET CONVERSION pour valider le Module 4.",
    },
  ],

  weeklyQuizzes: [
    {
      id: "mkt-v2-m4-week10-quiz",
      // Semaine 10 : acquisition, entonnoir, offre, parcours (8 questions M4)
      questionIds: [
        "mkt-v2-m4-q01",
        "mkt-v2-m4-q02",
        "mkt-v2-m4-q03",
        "mkt-v2-m4-q04",
        "mkt-v2-m4-q05",
        "mkt-v2-m4-q06",
        "mkt-v2-m4-q07",
        "mkt-v2-m4-q08",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m4-week11-quiz",
      // Semaine 11 : plateformes, audiences, budget (7 M4 + 1 rappel M3)
      questionIds: [
        "mkt-v2-m4-q10",
        "mkt-v2-m4-q11",
        "mkt-v2-m4-q12",
        "mkt-v2-m4-q13",
        "mkt-v2-m4-q14",
        "mkt-v2-m4-q15",
        "mkt-v2-m4-q16",
        "mkt-v2-m3-q17",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m4-week12-quiz",
      // Semaine 12 : conversion, mesure, attribution, optimisation (4 M4 + rappels M1/M2/M3)
      questionIds: [
        "mkt-v2-m4-q17",
        "mkt-v2-m4-q18",
        "mkt-v2-m4-q19",
        "mkt-v2-m4-q20",
        "mkt-v2-m4-q09",
        "mkt-v2-m1-q08",
        "mkt-v2-m2-q20",
        "mkt-v2-m3-q11",
      ],
      passThreshold: 70,
    },
  ],

  rubric: {
    id: "mkt-v2-m4-rubric",
    title: "Rubrique — Plan complet d'acquisition, publicité et conversion",
    totalPoints: 100,
    passThreshold: 60,
    criteria: [
      { label: "Cohérence avec le marché et le persona", points: 10 },
      { label: "Qualité de l'offre", points: 10 },
      { label: "Architecture de l'entonnoir", points: 15 },
      { label: "Choix des canaux", points: 10 },
      { label: "Segmentation et audiences", points: 10 },
      { label: "Créations et annonces", points: 10 },
      { label: "Page de conversion", points: 10 },
      { label: "Budget et indicateurs", points: 10 },
      { label: "Suivi et optimisation", points: 10 },
      { label: "Conformité, consentement et présentation", points: 5 },
    ],
  },

  assessments: [
    {
      id: "mkt-v2-m4-sum",
      kind: "summative",
      title: "Sommatif Module 4 — Acquisition, publicité et conversion (20 questions)",
      passThreshold: 70,
      weightHint: "Quiz de modules (20 %)",
    },
    {
      id: "mkt-v2-m4-tp",
      kind: "practical",
      title: "Projet Module 4 — Plan complet d'acquisition, publicité et conversion (livrable 4/7, rubrique 100 pts)",
      passThreshold: 60,
      weightHint: "Travaux pratiques (25 %)",
    },
    {
      id: "mkt-v2-m4-midterm",
      kind: "midterm",
      title: "Évaluation de mi-parcours (diagnostic, après le Module 4)",
      passThreshold: 70,
      weightHint: "intégré aux sommatifs",
    },
  ],
};
