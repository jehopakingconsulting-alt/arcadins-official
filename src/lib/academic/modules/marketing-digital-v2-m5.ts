import type { ModuleV2 } from "@/lib/academic/types";

/**
 * MODULE 5 — Commerce électronique, vente en ligne et expérience client (semaines 13–15).
 * Programme pilote Marketing Digital et E-commerce, version académique v2.
 *
 * Transforme la stratégie, l'entonnoir et les systèmes d'acquisition (M1-M4) en une architecture
 * de vente en ligne cohérente, rentable et centrée client. Isolé du contenu v1 ; ne modifie aucune donnée.
 * Prépare le Module 6 (analytique avancée, automatisation, optimisation).
 *
 * Tout exemple commercial est une « Simulation pédagogique — aucune transaction réelle ». Toute donnée chiffrée
 * est un « Jeu de données pédagogique fictif ». Aucune vente/commande/revenu réel, aucune donnée bancaire ou
 * personnelle réelle, aucune consultation juridique ou fiscale personnalisée.
 */
export const marketingDigitalV2Module5: ModuleV2 = {
  index: 5,
  title: "Commerce électronique, vente en ligne et expérience client",
  weeks: [13, 14, 15],
  summary:
    "Vendre, livrer et fidéliser : choisir un modèle e-commerce, structurer catalogue et fiches, maîtriser prix/coûts/marges, concevoir panier et paiement (en simulation), organiser opérations et retours, et bâtir une expérience client qui fidélise.",
  competencies: ["C14", "C15", "C16"],
  introduction:
    "Les Modules 1 à 4 ont défini la marque, le marché, les messages et l'acquisition. Le Module 5 répond à : « comment vendre en ligne de façon fiable, rentable et centrée client, puis fidéliser ? ». On y conçoit l'architecture de l'offre, la mécanique de prix et de paiement (simulée), les opérations (livraison, retours) et l'expérience client — sans jamais effectuer de transaction réelle.",
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
      "Proposition de valeur, personas et parcours client (M2) — base de l'offre et des fiches",
      "Plateforme de marque et messages (M3) — voix des fiches produit et du service client",
      "Entonnoir, page de conversion et indicateurs (M4) — panier, checkout et mesure e-commerce",
      "CAC/LTV et funnel (M1) — rentabilité et fidélisation",
    ],
    consolidatedCompetencies: [
      "C13 (mesure/optimisation) → étendu à C16 (indicateurs et optimisation e-commerce)",
      "C11 (entonnoir) → prolongé jusqu'à l'achat, la livraison et le réachat (C14/C15)",
    ],
    newCompetencies: [
      "C14 — modèles e-commerce, architecture de l'offre, catalogue et fiches",
      "C15 — prix/coûts/marges, panier, paiement, opérations et service client",
      "C16 — expérience client, fidélisation, indicateurs et optimisation e-commerce",
    ],
    deliverablesForNextModule: [
      "Indicateurs e-commerce + tableau de bord → base de l'analytique avancée du Module 6",
      "Boucle de rétroaction et automatisations responsables → optimisation du Module 6",
    ],
  },
  lessons: [
    // ══════════ SEMAINE 13 — MODÈLES E-COMMERCE ET ARCHITECTURE DE L'OFFRE ══════════
    {
      id: "mkt-v2-m5-l1",
      module: 5,
      week: 13,
      title: "Comprendre le commerce électronique",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Vendre en ligne recouvre des réalités très différentes selon ce qu'on vend et à qui. Cette leçon présente les grands modèles de commerce électronique et aide à choisir celui qui convient au projet.",
      objectives: [
        "Distinguer produits physiques, numériques, services et abonnements",
        "Différencier B2C, B2B, C2C, D2C et modèles hybrides",
        "Comparer avantages, contraintes, coûts et risques de chaque modèle",
        "Choisir un modèle adapté au projet",
      ],
      competencies: ["C14"],
      prerequisites: ["Module 2 — marché et proposition de valeur"],
      sections: [
        {
          heading: "Ce que l'on vend",
          body: [
            "Le commerce électronique est la vente de produits ou services via des canaux numériques. On distingue les produits physiques (stock, expédition), les produits numériques (livraison instantanée, pas de stock), les services (réservation, prestation humaine) et les abonnements (revenu récurrent). Chaque nature impose une logistique et des indicateurs différents.",
          ],
        },
        {
          heading: "À qui l'on vend",
          body: [
            "B2C (au particulier), B2B (à des entreprises, cycles plus longs), C2C (entre particuliers via une plateforme), D2C (le fabricant vend directement, sans intermédiaire). Beaucoup d'entreprises combinent plusieurs modèles (hybride). Les places de marché et le commerce social (vente directement dans les réseaux) sont des canaux qui se superposent à ces modèles.",
          ],
        },
        {
          heading: "Avantages, contraintes, coûts",
          body: [
            "Chaque modèle a ses forces et ses coûts : une place de marché apporte du trafic mais prélève des commissions et limite la relation client ; une boutique propre offre contrôle et marge mais exige d'attirer soi-même le trafic. Le numérique évite le stock mais expose au piratage ; le physique fidélise par l'objet mais coûte en logistique.",
          ],
        },
        {
          heading: "Risques et choix",
          body: [
            "Les risques opérationnels (ruptures de stock, retards, dépendance à une plateforme tierce) et la dépendance technologique doivent être évalués. On choisit le modèle selon le produit, le persona, la capacité de livraison et le budget — pas selon la mode. Un mauvais choix de modèle coûte cher à corriger.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "D2C", definition: "Direct-to-Consumer : le fabricant vend directement au consommateur, sans intermédiaire." },
        { term: "Commerce social", definition: "Vente réalisée directement au sein des réseaux sociaux." },
        { term: "Place de marché", definition: "Plateforme regroupant plusieurs vendeurs, avec trafic mutualisé et commissions." },
        { term: "Abonnement", definition: "Modèle à revenu récurrent (paiement périodique contre accès/livraison continue)." },
      ],
      examples: [
        "Un torréfacteur : boutique D2C (marge, relation) + présence sur une place de marché (trafic) — modèle hybride.",
        "Un créateur de cours en ligne : produit numérique, livraison instantanée, pas de stock.",
      ],
      commonError: {
        title: "Choisir le modèle « à la mode »",
        body:
          "Adopter un modèle parce qu'il est tendance (ex. tout miser sur le commerce social) sans vérifier l'adéquation au produit et au persona mène à des coûts et des déceptions. Le modèle suit le projet.",
      },
      vigilancePoint: {
        title: "Dépendance à une plateforme tierce",
        body:
          "S'appuyer uniquement sur une place de marché expose à ses règles, commissions et suspensions. On garde un canal propre (média détenu) pour maîtriser la relation client.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (détail, Québec) — Simulation pédagogique, aucune transaction réelle",
        region: "québécoise",
        isFictional: true,
        body: [
          "La boutique fictive Boréalille vendait uniquement via une place de marché, séduite par le trafic. Les commissions rognaient ses marges et elle n'avait aucune relation directe avec ses clients.",
          "En ajoutant une boutique D2C propre (pour la marge et la relation) tout en gardant la place de marché comme canal de découverte, Boréalille a diversifié son modèle et repris le contrôle de la relation client. Le choix hybride, adapté à son produit, a stabilisé sa rentabilité simulée.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l1-ia1",
          title: "Choisir un modèle e-commerce",
          objective: "Associer un projet au modèle e-commerce le plus adapté.",
          instructions: [
            "Associez : (1) un formateur vendant un cours téléchargeable ; (2) un fabricant de savons vendant sur son propre site ; (3) une entreprise vendant un logiciel par paiements mensuels.",
            "Modèles : produit numérique · D2C physique · abonnement.",
          ],
          answerKey: ["1 → produit numérique ; 2 → D2C physique ; 3 → abonnement."],
          feedback: "On relie la nature de l'offre (numérique/physique/récurrent) au modèle.",
          successCriterion: "Les 3 associations correctes.",
        },
      ],
      exercise: {
        title: "Choix de modèle justifié",
        prompt: [
          "Pour votre projet, choisissez un modèle e-commerce (ou hybride) et justifiez par le produit, le persona et la capacité de livraison.",
          "Listez 2 avantages, 2 contraintes et 1 risque du modèle choisi.",
        ],
        deliverables: ["Une note de choix de modèle e-commerce (justification, avantages, contraintes, risque)."],
        estimatedMinutes: 45,
      },
      successCriteria: [
        "Le modèle est cohérent avec le produit et le persona.",
        "Avantages, contraintes et un risque sont identifiés.",
        "La dépendance à un tiers est prise en compte.",
      ],
      resources: ["Notes de cours ARCADINS — modèles e-commerce (ressource interne)"],
      glossary: [{ term: "Modèle hybride", definition: "Combinaison de plusieurs modèles/canaux de vente." }],
      summary:
        "Le commerce électronique se décline selon ce que l'on vend (physique/numérique/service/abonnement) et à qui (B2C/B2B/C2C/D2C) ; on choisit le modèle selon le projet, en évitant la dépendance à un tiers unique.",
      selfAssessment: [
        "Puis-je nommer mon modèle e-commerce et le justifier ?",
        "Ai-je un canal propre pour maîtriser la relation client ?",
      ],
      quiz: { id: "mkt-v2-m5-l1-qz", questionIds: ["mkt-v2-m5-q01", "mkt-v2-m5-q02"], passThreshold: 70 },
      keyTakeaways: [
        "Le modèle dépend de la nature de l'offre et du client.",
        "Chaque modèle a ses coûts, contraintes et risques.",
        "Garder un canal propre limite la dépendance aux plateformes.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Solide. Passez à la conception de l'offre (leçon 13.2)." },
        { condition: "score < 70", message: "Revoyez les modèles e-commerce et leurs contraintes." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 13.2.",
    },
    {
      id: "mkt-v2-m5-l2",
      module: 5,
      week: 13,
      title: "Concevoir une offre vendable en ligne",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une offre en ligne doit convaincre sans vendeur présent. Cette leçon structure l'offre (bénéfices, preuve, réassurance) et rappelle que la promesse doit rester alignée sur la capacité réelle de livraison.",
      objectives: [
        "Relier besoin, problème, solution et résultat attendu",
        "Traduire des caractéristiques en bénéfices et différenciation",
        "Renforcer l'offre par la preuve, la réassurance et une garantie honnête",
        "Structurer offre principale, compléments, bundles et abonnements",
      ],
      competencies: ["C14"],
      prerequisites: ["Leçon 13.1 ; proposition de valeur (M2) ; copywriting (M3)"],
      sections: [
        {
          heading: "Du besoin au résultat",
          body: [
            "Une offre part d'un besoin ou d'un problème du persona et promet un résultat attendu concret. On relie chaque caractéristique (ce que le produit est) à un bénéfice (ce que le client y gagne). En ligne, sans vendeur, cette traduction caractéristique → bénéfice est décisive : le client doit comprendre seul pourquoi cela compte pour lui.",
          ],
        },
        {
          heading: "Preuve et réassurance",
          body: [
            "L'absence de contact humain augmente le besoin de preuve (avis authentiques, démonstrations, chiffres vérifiables) et de réassurance (garantie, sécurité du paiement, politique de retour claire). Une garantie commerciale honnête (satisfait ou remboursé réel) abaisse le risque perçu. On énonce aussi les limites honnêtes de l'offre : mieux vaut fixer les attentes que décevoir.",
          ],
        },
        {
          heading: "Architecture de l'offre",
          body: [
            "Autour de l'offre principale, on organise des produits complémentaires, des bundles (regroupements à valeur ajoutée), des niveaux de service et éventuellement des abonnements. Cette architecture augmente la valeur par client tout en servant réellement le besoin — jamais en gonflant artificiellement le panier.",
          ],
        },
        {
          heading: "Promesse et capacité de livraison",
          body: [
            "Une offre ne vaut que si l'on peut la tenir. La promesse (délais, qualité, service) doit être alignée sur la capacité réelle de livraison. Promettre une livraison en 24 h qu'on ne peut assurer détruit la confiance et génère retours et réclamations. La cohérence promesse-capacité est une règle d'or.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Bundle", definition: "Regroupement de produits/services vendus ensemble avec une valeur ajoutée." },
        { term: "Réassurance", definition: "Éléments qui réduisent le risque perçu (garantie, sécurité, retour facile)." },
        { term: "Garantie commerciale", definition: "Engagement honnête (ex. satisfait ou remboursé) réduisant le risque d'achat." },
      ],
      examples: [
        "Caractéristique « 500 ml » → bénéfice « 2 mois d'utilisation » : on traduit toujours en valeur pour le client.",
        "Bundle « démarrage » : produit principal + accessoire utile, à prix cohérent — jeu de données pédagogique fictif.",
      ],
      commonError: {
        title: "Promettre plus que ce qu'on peut livrer",
        body:
          "Une promesse (délai, qualité) supérieure à la capacité réelle génère déceptions, retours et réclamations. On aligne la promesse sur la capacité de livraison.",
      },
      vigilancePoint: {
        title: "Limites honnêtes",
        body:
          "Énoncer clairement ce que l'offre ne fait pas évite les malentendus et les remboursements. La transparence protège la confiance et réduit les litiges.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada) — Simulation pédagogique, aucune transaction réelle",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO listait de longues caractéristiques techniques de ses thés sans expliquer les bénéfices, et promettait une « livraison express » qu'elle peinait à tenir.",
          "En traduisant les caractéristiques en bénéfices (rituel, découverte), en ajoutant preuves et réassurance, et en alignant la promesse de livraison sur sa capacité réelle, InfusiO a augmenté ses conversions simulées et réduit ses réclamations. Une offre claire et tenable convainc mieux.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l2-ia1",
          title: "Traduire une caractéristique en bénéfice",
          objective: "Transformer des caractéristiques en bénéfices clients.",
          instructions: [
            "Traduisez en bénéfices : (a) « batterie 5000 mAh » ; (b) « support 7j/7 » ; (c) « matériau recyclé ».",
          ],
          answerKey: [
            "(a) « deux jours d'autonomie sans recharge » ; (b) « une aide disponible quand vous en avez besoin » ; (c) « un achat cohérent avec vos valeurs écologiques ».",
          ],
          feedback: "On relie chaque caractéristique à ce que le client y gagne concrètement.",
          successCriterion: "Les 3 caractéristiques traduites en bénéfices.",
        },
      ],
      exercise: {
        title: "Structurer son offre",
        prompt: [
          "Définissez l'offre principale de votre projet (besoin, résultat, 3 bénéfices, preuve, réassurance).",
          "Proposez 1 complément et 1 bundle cohérents, et énoncez 2 limites honnêtes.",
        ],
        deliverables: ["Une fiche offre structurée (principale + complément + bundle + preuves + limites honnêtes)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les caractéristiques sont traduites en bénéfices.",
        "Preuve et réassurance sont présentes.",
        "La promesse est alignée sur la capacité de livraison.",
      ],
      resources: ["Gabarit d'offre e-commerce (ressource interne)"],
      glossary: [{ term: "Niveau de service", definition: "Palier d'offre correspondant à un ensemble de prestations et un prix." }],
      summary:
        "Une offre vendable relie besoin et résultat, traduit les caractéristiques en bénéfices, s'appuie sur preuve et réassurance, et tient une promesse alignée sur la capacité réelle de livraison.",
      selfAssessment: [
        "Mes caractéristiques sont-elles traduites en bénéfices ?",
        "Ma promesse est-elle tenable avec ma capacité de livraison ?",
      ],
      quiz: { id: "mkt-v2-m5-l2-qz", questionIds: ["mkt-v2-m5-q04", "mkt-v2-m5-q03"], passThreshold: 70 },
      keyTakeaways: [
        "Traduire caractéristiques → bénéfices est vital sans vendeur.",
        "Preuve + réassurance + garantie honnête réduisent le risque.",
        "La promesse doit être alignée sur la capacité de livraison.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à structurer le catalogue (leçon 13.3)." },
        { condition: "score < 70", message: "Revoyez la traduction bénéfices et la cohérence promesse-capacité." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 13.3.",
    },
    {
      id: "mkt-v2-m5-l3",
      module: 5,
      week: 13,
      title: "Structurer un catalogue",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Un catalogue bien organisé aide le client à trouver et comprendre l'offre. Cette leçon présente catégories, variantes, attributs et les règles d'une navigation claire.",
      objectives: [
        "Organiser catégories, collections, variantes et attributs",
        "Rédiger titres et descriptions cohérents",
        "Gérer disponibilité (actif/archivé), inventaire et types de produits",
        "Faciliter recherche, filtres et navigation",
      ],
      competencies: ["C14"],
      prerequisites: ["Leçon 13.2 — offre"],
      sections: [
        {
          heading: "Catégories, collections, variantes",
          body: [
            "Les catégories regroupent les produits par type ; les collections par thème ou usage (ex. « cadeaux », « nouveautés »). Les variantes déclinent un produit (taille, couleur) et les attributs décrivent ses caractéristiques filtrables. Une structure claire réduit l'effort du client pour trouver ce qu'il cherche.",
          ],
        },
        {
          heading: "Titres, descriptions, prix, images",
          body: [
            "Chaque produit a un titre clair (compréhensible et cherchable), une description qui traduit les bénéfices, un prix, des images de qualité et un inventaire à jour. La cohérence éditoriale (même ton, même structure) sur tout le catalogue renforce la marque et la confiance.",
          ],
        },
        {
          heading: "Disponibilité et types de produits",
          body: [
            "On distingue produits actifs (visibles, achetables) et archivés (retirés sans casser les liens/historique). Les produits numériques, physiques et services ont des règles de disponibilité différentes (stock pour le physique, capacité pour le service). Une disponibilité mal gérée (vendre un produit en rupture) crée des litiges.",
          ],
        },
        {
          heading: "Recherche, filtres, navigation",
          body: [
            "La recherche interne, les filtres (par attribut, prix, disponibilité) et une navigation logique permettent de trouver vite. Sur un grand catalogue, ces outils font la différence entre un client qui achète et un client qui abandonne, faute de trouver.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Variante", definition: "Déclinaison d'un produit (taille, couleur…) partageant la même fiche de base." },
        { term: "Attribut", definition: "Caractéristique descriptive et filtrable d'un produit." },
        { term: "Produit archivé", definition: "Produit retiré de la vente sans supprimer son historique ni casser les liens." },
      ],
      examples: [
        "Catégorie « Thés verts », collection « Détente du soir », variantes « 50 g / 100 g ».",
        "Filtre par prix et disponibilité pour un catalogue de plusieurs centaines de références.",
      ],
      commonError: {
        title: "Un catalogue plat et incohérent",
        body:
          "Des centaines de produits sans catégories, filtres ni cohérence éditoriale noient le client. Une structure claire et des titres cherchables sont indispensables.",
      },
      vigilancePoint: {
        title: "Disponibilité fiable",
        body:
          "Afficher comme disponible un produit en rupture crée des annulations et des litiges. L'inventaire doit refléter la réalité et gérer les ruptures/précommandes explicitement.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Café Nord-Berge (torréfacteur, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le café fictif Nord-Berge listait tous ses cafés sur une seule page, sans catégories ni filtres. Les clients ne trouvaient pas le profil qu'ils cherchaient.",
          "En structurant le catalogue (catégories par intensité, collections par origine, variantes de format) avec recherche et filtres, Nord-Berge a facilité la découverte et augmenté les ajouts au panier simulés. Une bonne architecture de catalogue vend mieux qu'un simple empilement.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l3-ia1",
          title: "Construire un catalogue",
          objective: "Organiser des produits en catégories/variantes cohérentes.",
          instructions: [
            "Pour une boutique de vêtements, proposez 2 catégories, 1 collection thématique et 2 attributs de variante pertinents.",
          ],
          answerKey: [
            "Exemple : catégories « Hauts » et « Bas » ; collection « Nouveautés » ; attributs de variante « taille » et « couleur ».",
          ],
          feedback: "Catégories par type, collections par thème, variantes par attributs filtrables.",
          successCriterion: "Catégories + collection + 2 attributs cohérents proposés.",
        },
      ],
      exercise: {
        title: "Architecture de catalogue",
        prompt: [
          "Structurez le catalogue de votre projet : catégories, 1 collection, variantes/attributs, règles de disponibilité.",
          "Précisez la logique de recherche et de filtres.",
        ],
        deliverables: ["Un schéma d'architecture de catalogue (catégories, collections, variantes, disponibilité, filtres)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le catalogue a une structure claire et cohérente.",
        "La disponibilité (actif/archivé, stock) est gérée.",
        "Recherche et filtres facilitent la découverte.",
      ],
      resources: ["Gabarit d'architecture de catalogue (ressource interne)"],
      glossary: [{ term: "Collection", definition: "Regroupement thématique de produits (usage, saison, occasion)." }],
      summary:
        "Un catalogue efficace organise catégories, collections, variantes et attributs, gère la disponibilité de façon fiable, et facilite recherche et navigation.",
      selfAssessment: [
        "Mon catalogue est-il facile à parcourir et à filtrer ?",
        "Ma disponibilité reflète-t-elle la réalité du stock ?",
      ],
      quiz: { id: "mkt-v2-m5-l3-qz", questionIds: ["mkt-v2-m5-q05", "mkt-v2-m5-q06"], passThreshold: 70 },
      keyTakeaways: [
        "Catégories (type) + collections (thème) + variantes (attributs).",
        "Actif vs archivé, inventaire fiable.",
        "Recherche et filtres réduisent l'abandon.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à construire la fiche produit (leçon 13.4)." },
        { condition: "score < 70", message: "Revoyez l'organisation du catalogue et la gestion de disponibilité." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 13.4.",
    },
    {
      id: "mkt-v2-m5-l4",
      module: 5,
      week: 13,
      title: "Construire une fiche produit ou une page d'offre",
      authored: true,
      durationMinutes: 90,
      introduction:
        "La fiche produit est le lieu de la décision d'achat. Cette leçon en détaille les composantes, l'importance de la preuve authentique et de la transparence (livraison, retour), et les erreurs fréquentes.",
      objectives: [
        "Structurer une fiche (titre, promesse, images, bénéfices, objections, FAQ)",
        "Intégrer preuve authentique, prix, CTA et informations de livraison/retour",
        "Optimiser accessibilité, mobile et SEO de la fiche",
        "Éviter les erreurs qui tuent la conversion",
      ],
      competencies: ["C14"],
      prerequisites: ["Leçons 13.2-13.3 ; page de destination (M4)"],
      sections: [
        {
          heading: "Les composantes d'une fiche",
          body: [
            "Titre clair, sous-titre, promesse, images (et vidéo si utile), bénéfices et caractéristiques, usages, audience visée, réponses aux objections, FAQ, preuve authentique (avis réels avec consentement), prix visible, appel à l'action, informations de livraison et politique de retour. Chaque élément répond à une question du client avant l'achat.",
          ],
        },
        {
          heading: "Preuve et transparence",
          body: [
            "Les avis doivent être authentiques (jamais inventés). Le prix, les frais de livraison et la politique de retour doivent être transparents et visibles : les frais surprises au paiement sont la première cause d'abandon. La transparence rassure et réduit les litiges.",
          ],
        },
        {
          heading: "Accessibilité, mobile, SEO",
          body: [
            "La fiche doit être accessible (contrastes, textes alternatifs des images, navigation clavier), pensée mobile (la majorité des achats), rapide, et optimisée pour la recherche (titre et description cherchables, images nommées). Ces facteurs élargissent l'audience et la conversion.",
          ],
        },
        {
          heading: "Erreurs fréquentes",
          body: [
            "Photos de mauvaise qualité, description centrée sur les caractéristiques sans bénéfices, objections non traitées, frais cachés, CTA absent ou noyé, absence d'avis. Chacune réduit la conversion ; une fiche efficace les évite systématiquement.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Fiche produit", definition: "Page présentant un produit et déclenchant la décision d'achat." },
        { term: "Preuve authentique", definition: "Avis/démonstration réels (jamais inventés), obtenus avec consentement." },
        { term: "SEO de la fiche", definition: "Optimisation du titre/description/images pour la recherche." },
      ],
      examples: [
        "Fiche : titre clair + 3 photos + bénéfices + avis authentiques + frais de livraison affichés + retour 30 jours.",
        "Image nommée « savon-lavande-artisanal.jpg » plutôt que « IMG_2048.jpg » (SEO + accessibilité).",
      ],
      commonError: {
        title: "Les frais cachés jusqu'au paiement",
        body:
          "Révéler les frais de livraison seulement à la dernière étape provoque l'abandon. On affiche prix et frais tôt et clairement sur la fiche.",
      },
      vigilancePoint: {
        title: "Avis authentiques uniquement",
        body:
          "Aucun faux avis ni témoignage inventé. Les preuves sociales doivent être réelles et obtenues avec consentement ; les exemples pédagogiques sont étiquetés comme fictifs.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Néva Cosmétiques (e-commerce, Canada)",
        region: "canadienne",
        isFictional: true,
        body: [
          "La marque fictive Néva avait des fiches avec photos floues, descriptions techniques et frais de livraison cachés jusqu'au paiement. Les abandons étaient nombreux.",
          "En refaisant les fiches (photos nettes, bénéfices, objections traitées, avis authentiques, frais et retour affichés dès la fiche, version mobile accessible), Néva a augmenté sa conversion simulée et réduit ses abandons. La transparence et la qualité de la fiche ont fait la différence.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l4-ia1",
          title: "Améliorer une fiche produit",
          objective: "Repérer et corriger les défauts d'une fiche.",
          instructions: [
            "Une fiche a : 1 photo floue, une liste de caractéristiques, aucun avis, aucun prix visible, frais révélés au paiement. Citez 3 corrections.",
          ],
          answerKey: [
            "1) Photos nettes multiples ; 2) traduire les caractéristiques en bénéfices + ajouter des avis authentiques ; 3) afficher prix et frais dès la fiche.",
          ],
          feedback: "Photos, bénéfices, preuves et transparence des frais améliorent la conversion.",
          successCriterion: "Au moins 2 corrections pertinentes.",
        },
      ],
      exercise: {
        title: "Dossier d'architecture de l'offre",
        prompt: [
          "Assemblez le DOSSIER D'ARCHITECTURE DE L'OFFRE : modèle, audience, besoin, offre principale, produits/services, catégories, variantes, prix simulés, différenciation, bundles, règles de disponibilité, structure de fiche produit, risques, critères de qualité.",
          "Rédigez une fiche produit complète comme exemple.",
        ],
        deliverables: ["Le DOSSIER D'ARCHITECTURE DE L'OFFRE + une fiche produit exemple (données simulées)."],
        estimatedMinutes: 90,
      },
      successCriteria: [
        "La fiche contient preuve, prix, CTA, livraison et retour.",
        "Elle est accessible, mobile et optimisée pour la recherche.",
        "Aucun faux avis ni frais caché.",
      ],
      resources: ["Gabarit de fiche produit (ressource interne)"],
      glossary: [{ term: "FAQ produit", definition: "Réponses aux questions fréquentes levant les objections avant l'achat." }],
      summary:
        "Une fiche produit efficace présente promesse, bénéfices, preuve authentique, prix et transparence (livraison/retour), tout en étant accessible, mobile et optimisée pour la recherche.",
      selfAssessment: [
        "Ma fiche affiche-t-elle prix, frais et retour clairement ?",
        "Est-elle accessible, mobile et sans faux avis ?",
      ],
      quiz: { id: "mkt-v2-m5-l4-qz", questionIds: ["mkt-v2-m5-q06", "mkt-v2-m5-q04"], passThreshold: 70 },
      keyTakeaways: [
        "La fiche répond à toutes les questions avant l'achat.",
        "Transparence des frais dès la fiche (anti-abandon).",
        "Avis authentiques, accessibilité et SEO.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 13 maîtrisée. Passez aux prix, panier et paiement (semaine 14)." },
        { condition: "score < 70", message: "Revoyez les composantes de la fiche et la transparence des frais." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 13 + le quiz hebdomadaire avant la semaine 14.",
    },

    // ══════════ SEMAINE 14 — PRIX, PANIER, PAIEMENT ET OPÉRATIONS ══════════
    {
      id: "mkt-v2-m5-l5",
      module: 5,
      week: 14,
      title: "Prix, coûts et marge",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Un prix mal calculé peut faire perdre de l'argent à chaque vente. Cette leçon présente coûts, marges et seuil de rentabilité, avec des calculs appliqués sur des données simulées.",
      objectives: [
        "Distinguer coûts fixes et variables et les frais e-commerce",
        "Calculer marge brute, taux de marge, bénéfice net et panier moyen",
        "Calculer un seuil de rentabilité en unités",
        "Éviter les erreurs de tarification (prix psychologique, rabais)",
      ],
      competencies: ["C15"],
      prerequisites: ["Semaine 13 ; indicateurs (M4)"],
      formulas: [
        { name: "Marge brute", expression: "prix de vente − coût direct", example: "40 $ − 15 $ = 25 $ — jeu de données pédagogique fictif" },
        { name: "Taux de marge brute", expression: "marge brute / prix de vente × 100", example: "(25 / 40) × 100 = 62,5 % — jeu de données pédagogique fictif" },
        { name: "Bénéfice net", expression: "revenus − dépenses totales", example: "10 000 $ − 8 500 $ = 1 500 $ — jeu de données pédagogique fictif" },
        { name: "Panier moyen", expression: "chiffre d'affaires / nombre de commandes", example: "10 000 $ / 200 = 50 $ — jeu de données pédagogique fictif" },
        { name: "Seuil de rentabilité (unités)", expression: "coûts fixes / marge unitaire", example: "2 000 $ / 25 $ = 80 unités — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "Coûts fixes et variables",
          body: [
            "Les coûts variables dépendent du volume vendu (coût d'achat/production, emballage, frais de paiement, livraison, retours). Les coûts fixes existent quel que soit le volume (abonnements de plateforme, salaires, loyer). En e-commerce, les frais de plateforme, de paiement et de publicité rognent la marge et doivent être intégrés au calcul.",
          ],
        },
        {
          heading: "Marges et bénéfice",
          body: [
            "La marge brute = prix de vente − coût direct ; le taux de marge = marge/prix × 100. Le bénéfice net = revenus − dépenses totales (coûts fixes inclus). Confondre chiffre d'affaires et bénéfice est une erreur classique : vendre beaucoup à marge négative fait perdre de l'argent plus vite.",
          ],
        },
        {
          heading: "Seuil de rentabilité",
          body: [
            "Le seuil de rentabilité en unités = coûts fixes / marge unitaire : c'est le nombre de ventes nécessaires pour couvrir les coûts fixes. En dessous, on perd ; au-dessus, on gagne. Ce repère guide les objectifs de vente et les décisions de prix.",
          ],
        },
        {
          heading: "Tarification et rabais",
          body: [
            "Le prix psychologique (ex. 19,99 $), les niveaux de prix, les abonnements et les rabais/coupons sont des leviers, mais un rabais mal calculé peut annuler la marge. Chaque promotion se vérifie sur la marge : un rabais de 30 % sur une marge de 25 % vend à perte.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Coût variable", definition: "Coût dépendant du volume vendu (achat, emballage, livraison, frais de paiement)." },
        { term: "Marge brute", definition: "Prix de vente − coût direct." },
        { term: "Seuil de rentabilité", definition: "Nombre de ventes nécessaires pour couvrir les coûts fixes." },
        { term: "Panier moyen", definition: "Chiffre d'affaires divisé par le nombre de commandes." },
      ],
      examples: [
        "Jeu de données pédagogique fictif : prix 40 $, coût direct 15 $ → marge brute 25 $, taux 62,5 %.",
        "Jeu de données pédagogique fictif : coûts fixes 2000 $, marge unitaire 25 $ → seuil = 80 unités.",
      ],
      commonError: {
        title: "Confondre chiffre d'affaires et bénéfice",
        body:
          "Un fort chiffre d'affaires peut masquer une perte si la marge est négative une fois tous les frais comptés. On raisonne sur le bénéfice net, pas sur le revenu brut.",
      },
      vigilancePoint: {
        title: "Vérifier chaque rabais sur la marge",
        body:
          "Un rabais supérieur à la marge vend à perte. Toute promotion doit être calculée sur la marge réelle avant d'être lancée.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréal Tech (technologie, international) — Jeu de données pédagogique fictif",
        region: "internationale",
        isFictional: true,
        body: [
          "L'entreprise fictive Boréal Tech se réjouissait de son chiffre d'affaires mais perdait de l'argent : elle avait oublié les frais de paiement, de plateforme et de retours dans son prix.",
          "En recalculant marges et seuil de rentabilité (données simulées) et en ajustant ses prix et rabais, Boréal Tech est passée d'un volume déficitaire à une activité rentable. Le calcul complet des coûts a transformé la décision de prix.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l5-ia1",
          title: "Classer coûts fixes et variables",
          objective: "Distinguer coûts fixes et variables.",
          instructions: [
            "Classez : (a) frais de paiement par transaction ; (b) abonnement mensuel de la plateforme ; (c) emballage par commande ; (d) loyer du local.",
          ],
          answerKey: ["(a) variable ; (b) fixe ; (c) variable ; (d) fixe."],
          feedback: "Variable = dépend du volume ; fixe = indépendant du volume.",
          successCriterion: "Les 4 correctement classés.",
        },
        {
          id: "mkt-v2-m5-l5-ia2",
          title: "Calculer marge et seuil de rentabilité",
          objective: "Appliquer les formules de marge et de seuil.",
          instructions: [
            "Jeu de données pédagogique fictif : prix 50 $, coût direct 20 $, coûts fixes 3000 $. Calculez la marge unitaire et le seuil de rentabilité en unités.",
          ],
          answerKey: ["Marge unitaire = 50 − 20 = 30 $ ; seuil = 3000 / 30 = 100 unités."],
          feedback: "Marge unitaire = prix − coût direct ; seuil = coûts fixes / marge unitaire.",
          successCriterion: "Marge 30 $ et seuil 100 unités trouvés.",
        },
      ],
      exercise: {
        title: "Structure de prix et de marges",
        prompt: [
          "Pour votre offre, établissez prix, coûts (fixes/variables), marge brute, taux de marge et seuil de rentabilité (données simulées).",
          "Vérifiez qu'un rabais envisagé ne vend pas à perte.",
        ],
        deliverables: ["Une feuille de prix/marges (données simulées) + vérification d'un rabais sur la marge."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "Les calculs de marge et de seuil sont exacts.",
        "Coûts fixes et variables sont distingués.",
        "Aucun rabais ne vend à perte.",
      ],
      resources: ["Feuille de calcul prix/marges (ressource interne)"],
      glossary: [{ term: "Prix psychologique", definition: "Prix perçu comme plus attractif (ex. 19,99 $ vs 20 $)." }],
      summary:
        "On fixe un prix à partir des coûts (fixes/variables) et de la marge, on calcule le seuil de rentabilité, et on vérifie chaque rabais sur la marge — le bénéfice net, pas le chiffre d'affaires, juge la rentabilité.",
      selfAssessment: [
        "Sais-je calculer ma marge et mon seuil de rentabilité ?",
        "Mes rabais restent-ils au-dessus de la marge ?",
      ],
      quiz: { id: "mkt-v2-m5-l5-qz", questionIds: ["mkt-v2-m5-q07", "mkt-v2-m5-q08"], passThreshold: 70 },
      keyTakeaways: [
        "Marge brute = prix − coût direct ; seuil = coûts fixes / marge unitaire.",
        "On raisonne sur le bénéfice net, pas le chiffre d'affaires.",
        "Chaque rabais se vérifie sur la marge.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à concevoir le panier et le paiement (leçon 14.2)." },
        { condition: "score < 70", message: "Revoyez les formules de marge et de seuil de rentabilité." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 14.2.",
    },
    {
      id: "mkt-v2-m5-l6",
      module: 5,
      week: 14,
      title: "Concevoir le panier et le processus de paiement",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le panier et le paiement sont l'étape où se gagnent ou se perdent les ventes. Cette leçon montre comment réduire la friction et rassurer, et comment lutter contre l'abandon de panier.",
      objectives: [
        "Structurer un panier clair (quantité, coûts, taxes, livraison)",
        "Concevoir un checkout à faible friction (invité vs compte)",
        "Assurer sécurité, transparence et reprise après interruption",
        "Réduire l'abandon de panier",
      ],
      competencies: ["C15"],
      prerequisites: ["Leçon 14.1 ; page de conversion (M4)"],
      sections: [
        {
          heading: "Un panier clair",
          body: [
            "Le panier doit permettre d'ajouter, modifier la quantité, supprimer, et voir une estimation transparente des coûts (produits, livraison, taxes) avant de payer. Les surprises de dernière minute (frais non annoncés) sont la cause majeure d'abandon. La transparence dès le panier rassure.",
          ],
        },
        {
          heading: "Réduire la friction du checkout",
          body: [
            "Chaque étape et chaque champ superflus font perdre des acheteurs. On propose la commande invitée (sans création de compte obligatoire), on minimise les champs, on pré-remplit ce qui peut l'être, et on garde un parcours court et clair. La création de compte peut être proposée après l'achat, pas imposée avant.",
          ],
        },
        {
          heading: "Sécurité, transparence, reprise",
          body: [
            "Le paiement doit être sécurisé et perçu comme tel (signaux de confiance). Les erreurs (carte refusée, champ invalide) doivent être expliquées clairement pour permettre de corriger. La reprise après interruption (retrouver son panier) évite de perdre une vente à cause d'une coupure. Tout ceci en simulation : aucune donnée bancaire réelle n'est demandée ni stockée.",
          ],
        },
        {
          heading: "Abandon de panier",
          body: [
            "L'abandon de panier a des causes récurrentes : frais surprises, checkout trop long, création de compte imposée, doutes sur la sécurité, absence de moyen de paiement préféré. On les traite une à une. Une relance (courriel de rappel) récupère une partie des paniers abandonnés — dans le respect du consentement.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Commande invitée", definition: "Achat sans création de compte obligatoire." },
        { term: "Friction", definition: "Tout obstacle (étape, champ, doute) qui freine la finalisation de l'achat." },
        { term: "Abandon de panier", definition: "Départ d'un client avant de finaliser un achat entamé." },
      ],
      examples: [
        "Afficher les frais de livraison dès le panier plutôt qu'à la dernière étape (anti-abandon).",
        "Checkout à 3 champs + commande invitée vs formulaire de 12 champs imposant un compte.",
      ],
      commonError: {
        title: "Imposer la création de compte",
        body:
          "Obliger à créer un compte avant de payer fait fuir de nombreux acheteurs. On propose la commande invitée et on suggère le compte après l'achat.",
      },
      vigilancePoint: {
        title: "Aucune donnée bancaire réelle",
        body:
          "Dans ce module, on ne demande ni ne stocke aucune information bancaire réelle. Le paiement est simulé ; on enseigne les principes, pas la collecte de données sensibles.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada) — Simulation pédagogique, aucune transaction réelle",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO imposait la création de compte et révélait les frais de livraison à la dernière étape. Le taux d'abandon de panier était élevé.",
          "En activant la commande invitée, en affichant les frais dès le panier et en raccourcissant le checkout, InfusiO a fortement réduit l'abandon simulé. Une relance courriel consentie a récupéré une partie des paniers restants. Réduire la friction a débloqué les ventes.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l6-ia1",
          title: "Identifier une friction du checkout",
          objective: "Repérer les causes d'abandon dans un tunnel de paiement.",
          instructions: [
            "Un checkout : compte obligatoire, 14 champs, frais de livraison affichés à la dernière étape, un seul moyen de paiement. Citez 3 frictions à corriger.",
          ],
          answerKey: [
            "1) Rendre la commande invitée possible ; 2) réduire les champs ; 3) afficher les frais dès le panier (et ajouter des moyens de paiement).",
          ],
          feedback: "Compte imposé, formulaire long et frais tardifs sont des causes majeures d'abandon.",
          successCriterion: "Au moins 2 frictions correctement identifiées.",
        },
      ],
      exercise: {
        title: "Maquette de panier et checkout",
        prompt: [
          "Concevez la maquette d'un panier transparent et d'un checkout à faible friction (invité, champs minimaux, frais visibles tôt).",
          "Listez 3 causes d'abandon que votre conception traite.",
        ],
        deliverables: ["Une maquette panier + checkout (données simulées) + 3 causes d'abandon traitées."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les coûts sont transparents dès le panier.",
        "Le checkout est court et propose la commande invitée.",
        "Aucune donnée bancaire réelle n'est demandée.",
      ],
      resources: ["Gabarit de checkout à faible friction (ressource interne)"],
      glossary: [{ term: "Signal de confiance", definition: "Élément rassurant sur la sécurité (cadenas, mentions, moyens connus)." }],
      summary:
        "Un panier transparent et un checkout court (commande invitée, champs minimaux, frais visibles tôt, sécurité perçue) réduisent l'abandon ; tout est simulé, sans donnée bancaire réelle.",
      selfAssessment: [
        "Mon checkout est-il court et transparent ?",
        "Ai-je évité d'imposer la création de compte ?",
      ],
      quiz: { id: "mkt-v2-m5-l6-qz", questionIds: ["mkt-v2-m5-q09", "mkt-v2-m5-q10"], passThreshold: 70 },
      keyTakeaways: [
        "Transparence des frais dès le panier.",
        "Commande invitée + champs minimaux réduisent l'abandon.",
        "Aucune donnée bancaire réelle (simulation).",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour les paiements et la sécurité (leçon 14.3)." },
        { condition: "score < 70", message: "Revoyez les causes d'abandon et la réduction de friction." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 14.3.",
    },
    {
      id: "mkt-v2-m5-l7",
      module: 5,
      week: 14,
      title: "Paiements, sécurité et prévention de la fraude",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Comprendre les moyens de paiement et la sécurité protège l'entreprise et le client. Cette leçon présente les principes (passerelle, tokenisation, authentification) et la prévention de la fraude — sans jamais manipuler de données bancaires réelles.",
      objectives: [
        "Connaître les moyens de paiement et le rôle d'une passerelle",
        "Comprendre tokenisation, authentification et minimisation des données",
        "Reconnaître fraude et chargeback et les prévenir",
        "Appliquer rôles/permissions et journalisation",
      ],
      competencies: ["C15"],
      prerequisites: ["Leçon 14.2 — panier et paiement"],
      sections: [
        {
          heading: "Moyens de paiement et passerelle",
          body: [
            "Carte bancaire, portefeuille numérique, virement, paiement différé : chaque moyen a ses usages et ses frais. La passerelle de paiement est l'intermédiaire technique qui traite la transaction de façon sécurisée. Le commerçant ne manipule pas directement les données de carte : elles transitent par des acteurs conformes.",
          ],
        },
        {
          heading: "Sécurité : tokenisation, authentification, minimisation",
          body: [
            "La tokenisation remplace les données sensibles par un jeton inexploitable en cas de fuite. L'authentification (ex. validation forte) confirme l'identité du payeur. Le principe de minimisation impose de ne collecter que les données strictement nécessaires. Ces mécanismes réduisent le risque — on enseigne les principes, sans jamais demander de vraies données bancaires.",
          ],
        },
        {
          heading: "Fraude et chargeback",
          body: [
            "La fraude (paiement avec des données volées) et le chargeback (contestation d'un paiement) coûtent au commerçant. On les prévient par des vérifications raisonnables, la détection d'anomalies (commandes inhabituelles), et une bonne documentation des commandes. La prévention ne doit jamais devenir une surveillance intrusive ou discriminatoire.",
          ],
        },
        {
          heading: "Rôles, permissions, journalisation",
          body: [
            "L'accès aux données de commande et de paiement est limité par des rôles et permissions (qui peut voir/faire quoi). La journalisation (traçabilité des actions) permet de détecter et d'expliquer les incidents. Ces contrôles protègent les données et clarifient les responsabilités.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Passerelle de paiement", definition: "Intermédiaire technique qui traite les paiements de façon sécurisée." },
        { term: "Tokenisation", definition: "Remplacement d'une donnée sensible par un jeton inexploitable." },
        { term: "Chargeback", definition: "Contestation d'un paiement entraînant son remboursement forcé au client." },
        { term: "Minimisation des données", definition: "Ne collecter que les données strictement nécessaires." },
      ],
      examples: [
        "Signature de webhook vérifiée avant de valider une commande (intégrité de la notification de paiement).",
        "Rôle « support » qui voit l'état d'une commande mais pas les données de paiement complètes.",
      ],
      commonError: {
        title: "Vouloir stocker les données de carte",
        body:
          "Conserver soi-même les numéros de carte est risqué et généralement non conforme. On confie le paiement à une passerelle conforme et on applique la minimisation.",
      },
      vigilancePoint: {
        title: "Jamais de données bancaires réelles",
        body:
          "Ce module ne demande, ne saisit ni ne stocke aucune information bancaire réelle. On enseigne les principes de sécurité sur des cas simulés uniquement.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — OutiPro (B2B, international) — Simulation pédagogique, aucune transaction réelle",
        region: "internationale",
        isFictional: true,
        body: [
          "Le service fictif OutiPro envisageait (en simulation) de stocker lui-même les données de carte de ses clients pour « simplifier ». Risque majeur de fuite et de non-conformité.",
          "En confiant le paiement à une passerelle conforme (tokenisation, authentification), en limitant les accès par rôles et en journalisant les actions, OutiPro a sécurisé le processus sans jamais manipuler de données sensibles. Les principes appliqués en simulation ont protégé données et responsabilités.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l7-ia1",
          title: "Détecter un risque de fraude",
          objective: "Repérer un signal d'anomalie dans une commande simulée.",
          instructions: [
            "Jeu de données pédagogique fictif : une commande de montant très élevé, adresse de livraison différente de la facturation, dans un pays inhabituel, passée en pleine nuit. Que faire ?",
          ],
          answerKey: [
            "Traiter comme signal de risque : vérifier (authentification, contact), ne pas expédier automatiquement, documenter — sans discriminer ni conclure trop vite.",
          ],
          feedback: "On applique des vérifications raisonnables et proportionnées, jamais une suspicion discriminatoire.",
          successCriterion: "Réponse : vérification + prudence + documentation.",
        },
      ],
      exercise: {
        title: "Contrôles de sécurité (simulés)",
        prompt: [
          "Pour votre boutique simulée, définissez : moyens de paiement, principe de minimisation, rôles/permissions d'accès aux commandes, et 2 mesures anti-fraude raisonnables.",
        ],
        deliverables: ["Un plan de contrôles de sécurité e-commerce (simulé, sans donnée bancaire réelle)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les principes (passerelle, tokenisation, minimisation) sont compris.",
        "Rôles/permissions et journalisation sont prévus.",
        "La prévention de fraude reste raisonnable et non discriminatoire.",
      ],
      resources: ["Notes de cours — sécurité des paiements (ressource interne)"],
      glossary: [{ term: "Signature de webhook", definition: "Vérification d'intégrité d'une notification serveur (ex. paiement)." }],
      summary:
        "Le paiement passe par une passerelle conforme (tokenisation, authentification), on minimise les données, on limite les accès (rôles, journalisation) et on prévient la fraude raisonnablement — sans jamais manipuler de données bancaires réelles.",
      selfAssessment: [
        "Ai-je compris pourquoi on ne stocke pas les données de carte ?",
        "Mes contrôles anti-fraude restent-ils proportionnés et non discriminatoires ?",
      ],
      quiz: { id: "mkt-v2-m5-l7-qz", questionIds: ["mkt-v2-m5-q11", "mkt-v2-m5-q20"], passThreshold: 70 },
      keyTakeaways: [
        "La passerelle et la tokenisation évitent de manipuler les données sensibles.",
        "Minimisation, rôles et journalisation protègent les données.",
        "Prévention de fraude raisonnable, jamais discriminatoire ; aucune donnée réelle.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour livraison, commandes et retours (leçon 14.4)." },
        { condition: "score < 70", message: "Revoyez les principes de sécurité des paiements et la minimisation." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 14.4.",
    },
    {
      id: "mkt-v2-m5-l8",
      module: 5,
      week: 14,
      title: "Livraison, commandes, retours et remboursements",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Après le paiement commence l'exécution de la promesse. Cette leçon présente le cycle de vie d'une commande, la gestion des retours et remboursements, et la communication client aux moments clés.",
      objectives: [
        "Décrire les états d'une commande (traitement → livraison)",
        "Gérer retours, échanges et remboursements (dont partiels) équitablement",
        "Communiquer aux étapes clés (notifications, preuve)",
        "Gérer stocks, ruptures, précommandes et exceptions",
      ],
      competencies: ["C15"],
      prerequisites: ["Leçons 14.1-14.3"],
      sections: [
        {
          heading: "Le cycle de vie d'une commande",
          body: [
            "Une commande passe par des états : reçue → en traitement → préparée → expédiée → livrée (ou retirée / accès numérique livré / service réservé). Chaque état correspond à une action et, idéalement, à une notification au client. Un suivi clair réduit l'anxiété post-achat et les demandes au service client.",
          ],
        },
        {
          heading: "Retours, échanges, remboursements",
          body: [
            "Une politique de retour claire (délais, conditions, qui paie le retour) rassure avant l'achat et cadre l'après-vente. On distingue retour, échange, remboursement total et partiel. Traiter les remboursements équitablement et rapidement protège la réputation, même si cela coûte à court terme.",
          ],
        },
        {
          heading: "Communication et preuve",
          body: [
            "Aux moments clés (confirmation, expédition, livraison, retard), on informe le client de façon proactive. Conserver une preuve (confirmation, suivi) protège les deux parties en cas de litige. Une bonne communication transforme un incident (retard) en expérience gérée plutôt qu'en réclamation.",
          ],
        },
        {
          heading: "Stocks et exceptions",
          body: [
            "La gestion des stocks (mise à jour, seuils d'alerte), des ruptures (retrait ou précommande explicite), et des exceptions (adresse invalide, colis perdu) fait partie des opérations. On prévoit des procédures pour les cas hors norme : un plan d'exception évite l'improvisation qui mécontente le client.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "État de commande", definition: "Étape du cycle de vie (reçue, en traitement, expédiée, livrée…)." },
        { term: "Remboursement partiel", definition: "Remboursement d'une partie du montant (ex. article manquant)." },
        { term: "Précommande", definition: "Commande d'un produit non encore disponible, avec délai annoncé." },
      ],
      examples: [
        "Notification à chaque état : « commande confirmée », « expédiée », « livrée » — jeu de données pédagogique fictif.",
        "Politique de retour 30 jours affichée sur la fiche et rappelée à la confirmation.",
      ],
      commonError: {
        title: "Politique de retour floue ou cachée",
        body:
          "Une politique de retour absente ou peu claire génère méfiance avant l'achat et litiges après. On l'affiche clairement et on l'applique équitablement.",
      },
      vigilancePoint: {
        title: "Communiquer les mauvaises nouvelles tôt",
        body:
          "Cacher un retard aggrave le mécontentement. Prévenir proactivement, avec une solution proposée, transforme un incident en expérience gérée.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Studio Lumen (services, Québec) — Simulation pédagogique, aucune transaction réelle",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le studio fictif Lumen n'informait pas ses clients de l'avancement de leurs commandes de tirages et avait une politique de retour vague. Les clients inquiets multipliaient les messages.",
          "En mettant en place des notifications d'état, une politique de retour claire et une communication proactive en cas de retard, Lumen a réduit les demandes au support et amélioré la satisfaction simulée. Une exécution transparente fidélise autant qu'une bonne offre.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l8-ia1",
          title: "Ordonner les étapes d'une commande",
          objective: "Remettre le cycle de vie d'une commande dans l'ordre.",
          instructions: ["Ordonnez : expédiée · reçue · livrée · en traitement · préparée."],
          answerKey: ["reçue → en traitement → préparée → expédiée → livrée."],
          feedback: "La commande progresse de la réception à la livraison, avec notification à chaque étape.",
          successCriterion: "Ordre exact.",
        },
        {
          id: "mkt-v2-m5-l8-ia2",
          title: "Traiter une demande de remboursement",
          objective: "Appliquer une politique de retour équitablement.",
          instructions: [
            "Jeu de données pédagogique fictif : un client reçoit un article endommagé et demande un remboursement dans le délai prévu. Que faire ?",
          ],
          answerKey: [
            "Reconnaître le problème, appliquer la politique (remboursement ou échange), communiquer clairement, documenter — sans faire porter la faute au client.",
          ],
          feedback: "Un remboursement légitime traité rapidement protège la réputation.",
          successCriterion: "Réponse : appliquer la politique + communiquer + documenter.",
        },
      ],
      exercise: {
        title: "Plan opérationnel de vente en ligne",
        prompt: [
          "Assemblez le PLAN OPÉRATIONNEL DE VENTE EN LIGNE : prix, coûts, marge, frais, panier, paiement, confirmation, gestion de commande, livraison, retours, remboursements, notifications, risques, contrôles de sécurité, scénarios d'exception.",
        ],
        deliverables: ["Le PLAN OPÉRATIONNEL DE VENTE EN LIGNE complet (données simulées)."],
        estimatedMinutes: 90,
      },
      successCriteria: [
        "Le cycle de commande et les notifications sont définis.",
        "La politique de retour/remboursement est claire et équitable.",
        "Stocks, ruptures et exceptions sont prévus.",
      ],
      resources: ["Gabarit de plan opérationnel e-commerce (ressource interne)"],
      glossary: [{ term: "Gestion des exceptions", definition: "Procédures pour les cas hors norme (colis perdu, adresse invalide)." }],
      summary:
        "Après le paiement, on exécute la promesse : cycle de commande clair, notifications proactives, politique de retour équitable, et gestion des stocks et exceptions — la transparence fidélise.",
      selfAssessment: [
        "Mon cycle de commande informe-t-il le client à chaque étape ?",
        "Ma politique de retour est-elle claire et équitable ?",
      ],
      quiz: { id: "mkt-v2-m5-l8-qz", questionIds: ["mkt-v2-m5-q12", "mkt-v2-m5-q13"], passThreshold: 70 },
      keyTakeaways: [
        "Notifier le client à chaque état de commande.",
        "Politique de retour claire et remboursements équitables.",
        "Prévoir stocks, ruptures et exceptions.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 14 maîtrisée. Passez à l'expérience client (semaine 15)." },
        { condition: "score < 70", message: "Revoyez le cycle de commande et la gestion des retours." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 14 + le quiz hebdomadaire avant la semaine 15.",
    },

    // ══════════ SEMAINE 15 — EXPÉRIENCE CLIENT, FIDÉLISATION ET OPTIMISATION ══════════
    {
      id: "mkt-v2-m5-l9",
      module: 5,
      week: 15,
      title: "Concevoir l'expérience client",
      authored: true,
      durationMinutes: 90,
      introduction:
        "L'expérience client englobe tout ce que vit le client avant, pendant et après l'achat. Cette leçon apprend à la cartographier et à soigner les moments critiques.",
      objectives: [
        "Distinguer expérience avant, pendant et après l'achat",
        "Identifier les moments critiques et les points de friction",
        "Appliquer clarté, rapidité, cohérence et personnalisation responsable",
        "Cartographier l'expérience et mesurer la satisfaction",
      ],
      competencies: ["C16"],
      prerequisites: ["Semaine 14 ; parcours client (M2)"],
      sections: [
        {
          heading: "Avant, pendant, après",
          body: [
            "L'expérience client ne se limite pas à l'achat : avant (découverte, information, confiance), pendant (navigation, panier, paiement), après (livraison, usage, service, fidélisation). Une expérience cohérente sur les trois temps construit la confiance ; une rupture à n'importe quel moment la fragilise.",
          ],
        },
        {
          heading: "Les fondamentaux",
          body: [
            "Clarté (le client comprend), rapidité (pas d'attente inutile), cohérence (même qualité partout, omnicanal), personnalisation responsable (utile, sans intrusion). Ces fondamentaux se déclinent à chaque point de contact. La personnalisation ne doit jamais franchir la ligne de l'intrusion ou de l'exploitation des données.",
          ],
        },
        {
          heading: "Moments critiques et friction",
          body: [
            "Certains moments pèsent plus (premier achat, réception, problème). Ce sont les moments de vérité : les réussir marque durablement, les rater aussi. On identifie les points de friction (attente, information manquante, effort demandé) et on les réduit en priorité, comme pour l'entonnoir.",
          ],
        },
        {
          heading: "Cartographier et mesurer",
          body: [
            "La cartographie de l'expérience (les étapes, émotions et attentes du client) révèle où agir. On mesure la satisfaction (enquêtes courtes, indicateurs de satisfaction) pour suivre l'effet des améliorations. Mesurer l'émotion autant que la transaction complète le pilotage.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Expérience client", definition: "Ensemble des perceptions et émotions vécues avant, pendant et après l'achat." },
        { term: "Moment de vérité", definition: "Moment critique qui marque durablement la perception (réception, problème)." },
        { term: "Omnicanal", definition: "Cohérence de l'expérience à travers tous les canaux." },
      ],
      examples: [
        "Moment de vérité : l'ouverture du colis (emballage soigné, mot de remerciement) marque positivement.",
        "Personnalisation responsable : recommander un produit complémentaire utile, sans traquer excessivement.",
      ],
      commonError: {
        title: "Soigner l'achat mais négliger l'après",
        body:
          "Une belle expérience d'achat suivie d'un service absent ou d'une livraison opaque détruit la confiance. L'après-achat compte autant que l'avant.",
      },
      vigilancePoint: {
        title: "Personnalisation sans intrusion",
        body:
          "La personnalisation doit rester utile et respectueuse : pas de collecte excessive, pas de traçage intrusif, consentement respecté. L'expérience ne se paie pas en vie privée.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (détail, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "La boutique fictive Boréalille offrait un bon site mais négligeait l'après-achat : aucune nouvelle après la commande, emballage négligé, service lent.",
          "En cartographiant l'expérience et en soignant les moments critiques (confirmation chaleureuse, emballage soigné, suivi proactif, service réactif), Boréalille a amélioré sa satisfaction simulée et son réachat. L'expérience complète, pas seulement l'achat, fidélise.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l9-ia1",
          title: "Cartographier l'expérience client",
          objective: "Associer des points de contact aux phases avant/pendant/après.",
          instructions: [
            "Classez : (a) lecture d'un avis avant achat ; (b) réception du colis ; (c) paiement ; (d) courriel de suivi post-achat.",
          ],
          answerKey: ["(a) avant ; (b) après ; (c) pendant ; (d) après."],
          feedback: "L'expérience couvre les trois temps : avant, pendant, après.",
          successCriterion: "Les 4 points correctement situés.",
        },
      ],
      exercise: {
        title: "Carte d'expérience client",
        prompt: [
          "Cartographiez l'expérience client de votre projet (avant/pendant/après) avec les émotions et attentes par étape.",
          "Identifiez 2 moments de vérité et une amélioration pour chacun.",
        ],
        deliverables: ["Une carte d'expérience client annotée (émotions, attentes, 2 moments de vérité + améliorations)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les trois temps de l'expérience sont couverts.",
        "Les moments de vérité sont identifiés et améliorés.",
        "La personnalisation reste respectueuse de la vie privée.",
      ],
      resources: ["Gabarit de carte d'expérience client (ressource interne)"],
      glossary: [{ term: "Point de contact", definition: "Toute interaction entre le client et la marque." }],
      summary:
        "L'expérience client couvre avant, pendant et après l'achat ; on soigne les moments de vérité, on réduit les frictions et on personnalise sans intrusion, en mesurant la satisfaction.",
      selfAssessment: [
        "Mon expérience client est-elle cohérente sur les trois temps ?",
        "Ma personnalisation respecte-t-elle la vie privée ?",
      ],
      quiz: { id: "mkt-v2-m5-l9-qz", questionIds: ["mkt-v2-m5-q16", "mkt-v2-m5-q14"], passThreshold: 70 },
      keyTakeaways: [
        "L'expérience couvre avant, pendant et après l'achat.",
        "Les moments de vérité marquent durablement.",
        "Personnalisation utile, jamais intrusive.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour le service client (leçon 15.2)." },
        { condition: "score < 70", message: "Revoyez les trois temps de l'expérience et les moments de vérité." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 15.2.",
    },
    {
      id: "mkt-v2-m5-l10",
      module: 5,
      week: 15,
      title: "Service client et gestion des réclamations",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Un bon service client transforme les problèmes en fidélité. Cette leçon présente l'organisation du support, le traitement des réclamations avec empathie, et l'encadrement responsable d'un chatbot.",
      objectives: [
        "Organiser les canaux d'assistance et les délais de réponse",
        "Traiter une réclamation avec empathie et méthode",
        "Encadrer un chatbot avec escalade humaine",
        "Documenter et protéger la confidentialité",
      ],
      competencies: ["C16"],
      prerequisites: ["Leçon 15.1 ; voix/ton (M3)"],
      sections: [
        {
          heading: "Organiser le support",
          body: [
            "On choisit des canaux d'assistance adaptés (FAQ, centre d'aide, messagerie, courriel, téléphone) avec des délais de réponse annoncés et tenus. Une FAQ et un centre d'aide bien faits réduisent le volume de demandes en répondant d'avance aux questions courantes. On définit des priorités et une procédure d'escalade pour les cas complexes.",
          ],
        },
        {
          heading: "Traiter une réclamation",
          body: [
            "Face à un client mécontent : écouter, reconnaître le problème (empathie), proposer une résolution claire, et suivre jusqu'à la clôture. Le ton reste professionnel et empathique, même face à l'agressivité. Une compensation proportionnée (remboursement, geste commercial) peut être justifiée, sans jamais céder à une fraude manifeste.",
          ],
        },
        {
          heading: "Chatbot encadré",
          body: [
            "Un chatbot peut traiter les demandes simples et orienter, mais il doit toujours offrir une escalade humaine et ne jamais prendre de décision irréversible seul (remboursement complexe, litige). On l'encadre : transparence (le client sait qu'il parle à un robot), limites claires, et transfert à un humain dès que nécessaire.",
          ],
        },
        {
          heading: "Documentation et confidentialité",
          body: [
            "On documente les échanges et les résolutions (traçabilité, apprentissage, litiges) tout en respectant la confidentialité (accès limité, minimisation des données). La continuité de service (un dossier suivi même si l'agent change) évite au client de se répéter et améliore l'expérience.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Escalade", definition: "Transfert d'une demande complexe à un niveau supérieur (humain, spécialiste)." },
        { term: "Chatbot encadré", definition: "Assistant automatisé transparent, à décisions limitées, avec escalade humaine." },
        { term: "Continuité de service", definition: "Suivi cohérent d'un dossier client d'un agent/canal à l'autre." },
      ],
      examples: [
        "FAQ qui répond à 60 % des questions courantes → moins de tickets — jeu de données pédagogique fictif.",
        "Chatbot : « Je peux vous aider ou vous transférer à un conseiller » (transparence + escalade).",
      ],
      commonError: {
        title: "Un chatbot sans issue humaine",
        body:
          "Un robot qui bloque le client sans possibilité de parler à un humain aggrave la frustration. L'escalade humaine doit toujours être possible.",
      },
      vigilancePoint: {
        title: "Empathie et confidentialité",
        body:
          "On traite chaque client avec respect, même mécontent, et on protège ses données (accès limité, pas de partage inutile). La documentation ne justifie pas la sur-collecte.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Racine & Sol (organisme, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "L'organisme fictif Racine & Sol laissait les demandes sans réponse pendant des jours et son chatbot bloquait les cas complexes sans escalade.",
          "En annonçant des délais tenus, en enrichissant la FAQ, et en encadrant le chatbot (transparence + escalade humaine), Racine & Sol a réduit la frustration et amélioré la satisfaction simulée. Un service humain, réactif et bien outillé, transforme les problèmes en fidélité.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l10-ia1",
          title: "Répondre à une réclamation",
          objective: "Structurer une réponse empathique et résolutive.",
          instructions: [
            "Jeu de données pédagogique fictif : un client écrit, en colère, que sa commande est arrivée cassée. Rédigez les 3 étapes clés de votre réponse.",
          ],
          answerKey: [
            "1) Reconnaître et s'excuser (empathie) ; 2) proposer une solution claire (remplacement/remboursement) ; 3) confirmer les prochaines étapes et documenter.",
          ],
          feedback: "Empathie → solution → suivi : le ton reste professionnel même face à la colère.",
          successCriterion: "Les 3 étapes (empathie, solution, suivi) présentes.",
        },
      ],
      exercise: {
        title: "Plan de service client",
        prompt: [
          "Définissez pour votre projet : canaux de support, délais annoncés, structure de FAQ, règles d'escalade, et encadrement d'un éventuel chatbot.",
          "Rédigez un modèle de réponse à une réclamation.",
        ],
        deliverables: ["Un plan de service client (canaux, délais, FAQ, escalade, chatbot encadré) + un modèle de réponse."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les canaux, délais et l'escalade sont définis.",
        "Le chatbot (le cas échéant) offre une escalade humaine.",
        "La confidentialité des données est respectée.",
      ],
      resources: ["Gabarit de plan de service client (ressource interne)"],
      glossary: [{ term: "Centre d'aide", definition: "Espace regroupant FAQ, guides et ressources d'assistance." }],
      summary:
        "Un bon service client repose sur des canaux et délais tenus, un traitement empathique et méthodique des réclamations, un chatbot encadré avec escalade humaine, et le respect de la confidentialité.",
      selfAssessment: [
        "Mon service prévoit-il des délais tenus et une escalade humaine ?",
        "Est-ce que je traite les réclamations avec empathie et méthode ?",
      ],
      quiz: { id: "mkt-v2-m5-l10-qz", questionIds: ["mkt-v2-m5-q17", "mkt-v2-m5-q16"], passThreshold: 70 },
      keyTakeaways: [
        "FAQ + délais tenus réduisent et accélèrent le support.",
        "Réclamation : empathie → solution → suivi.",
        "Chatbot encadré, escalade humaine toujours possible.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la fidélisation et la valeur client (leçon 15.3)." },
        { condition: "score < 70", message: "Revoyez le traitement des réclamations et l'encadrement du chatbot." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 15.3.",
    },
    {
      id: "mkt-v2-m5-l11",
      module: 5,
      week: 15,
      title: "Fidélisation, réachat et valeur client",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Fidéliser coûte souvent moins cher qu'acquérir. Cette leçon présente les leviers de fidélisation, la vente additionnelle responsable, et les indicateurs de valeur client, avec leurs calculs.",
      objectives: [
        "Relier satisfaction, fidélisation, réachat et recommandation",
        "Concevoir programmes de fidélité, vente croisée et montée en gamme responsables",
        "Calculer taux de réachat, taux de rétention et valeur vie client",
        "Prévenir le désabonnement",
      ],
      competencies: ["C16"],
      prerequisites: ["Leçons 15.1-15.2 ; CAC/LTV (M1/M4)"],
      formulas: [
        { name: "Taux de réachat", expression: "clients ayant acheté de nouveau / clients totaux × 100", example: "(120 / 400) × 100 = 30 % — jeu de données pédagogique fictif" },
        { name: "Taux de rétention", expression: "clients conservés / clients au début × 100", example: "(340 / 400) × 100 = 85 % — jeu de données pédagogique fictif" },
        { name: "Valeur vie client (simplifiée)", expression: "panier moyen × fréquence d'achat × durée moyenne de relation", example: "50 $ × 4/an × 3 ans = 600 $ — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "De la satisfaction à la recommandation",
          body: [
            "La satisfaction mène à la fidélisation (le client revient), au réachat, à l'abonnement, et à la recommandation (il amène d'autres clients). Un client fidèle coûte moins cher qu'un nouveau à acquérir et achète souvent davantage. La fidélisation est donc un levier de rentabilité, pas un simple « bonus ».",
          ],
        },
        {
          heading: "Leviers de fidélisation",
          body: [
            "Programmes de fidélité, parrainage, courriels post-achat, contenu éducatif utile, relance pertinente : autant de leviers pour faire revenir. La vente croisée (produits complémentaires) et la montée en gamme (offre supérieure) augmentent la valeur par client — à condition de servir réellement le besoin, jamais de forcer un achat inutile.",
          ],
        },
        {
          heading: "Mesurer la valeur client",
          body: [
            "Le taux de réachat et le taux de rétention mesurent la fidélité. La valeur vie client (simplifiée : panier moyen × fréquence × durée de relation) situe combien vaut un client dans le temps — un repère clé pour décider combien on peut investir en acquisition (lien avec le CAC du Module 4). Ces chiffres, ici, sont simulés.",
          ],
        },
        {
          heading: "Prévenir le désabonnement",
          body: [
            "Le désabonnement (churn) se prévient en repérant les signaux (baisse d'usage, insatisfaction) et en agissant (aide, relance, offre pertinente). Segmenter les clients permet d'adapter l'effort. Retenir un client existant est généralement plus rentable que d'en acquérir un nouveau.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Taux de rétention", definition: "Proportion de clients conservés sur une période." },
        { term: "Valeur vie client (LTV)", definition: "Revenu total estimé qu'un client génère durant sa relation avec la marque." },
        { term: "Vente croisée", definition: "Proposition de produits complémentaires pertinents." },
        { term: "Churn (désabonnement)", definition: "Perte de clients sur une période." },
      ],
      examples: [
        "Jeu de données pédagogique fictif : panier 50 $ × 4 achats/an × 3 ans = LTV 600 $.",
        "Courriel post-achat éducatif (utiliser le produit) → réachat plus élevé, sans forcer la vente.",
      ],
      commonError: {
        title: "Tout miser sur l'acquisition",
        body:
          "Négliger la fidélisation pour ne courir qu'après de nouveaux clients coûte cher : un client existant est plus rentable. On équilibre acquisition et rétention.",
      },
      vigilancePoint: {
        title: "Vente additionnelle honnête",
        body:
          "La vente croisée et la montée en gamme doivent servir un vrai besoin, jamais forcer un achat inutile ni dissimuler un abonnement. Aucune fausse rareté, aucun abonnement caché.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada) — Jeu de données pédagogique fictif",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO dépensait tout en acquisition et ne faisait rien pour retenir ses clients. Son taux de réachat simulé était faible.",
          "En ajoutant un programme de fidélité, des courriels post-achat éducatifs et une vente croisée pertinente, InfusiO a augmenté son taux de réachat et sa valeur vie client simulés. Investir dans la rétention a amélioré la rentabilité globale plus efficacement que d'acquérir davantage.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l11-ia1",
          title: "Calculer un panier moyen et une valeur vie client",
          objective: "Appliquer les formules de valeur client.",
          instructions: [
            "Jeu de données pédagogique fictif : CA 12 000 $ sur 240 commandes ; un client type achète 3 fois/an pendant 2 ans. Calculez le panier moyen et la LTV simplifiée.",
          ],
          answerKey: ["Panier moyen = 12 000 / 240 = 50 $ ; LTV = 50 × 3 × 2 = 300 $."],
          feedback: "Panier moyen = CA/commandes ; LTV = panier × fréquence × durée.",
          successCriterion: "Panier 50 $ et LTV 300 $ trouvés.",
        },
        {
          id: "mkt-v2-m5-l11-ia2",
          title: "Concevoir une stratégie de fidélisation",
          objective: "Proposer des leviers de fidélisation adaptés.",
          instructions: [
            "Pour une boutique de produits consommables (rachetés régulièrement), proposez 2 leviers de fidélisation pertinents.",
          ],
          answerKey: [
            "Exemples : abonnement/réassort automatique + programme de fidélité (points au réachat) ; courriel de rappel au bon moment.",
          ],
          feedback: "On aligne les leviers sur le cycle de rachat du produit.",
          successCriterion: "2 leviers cohérents avec un produit à rachat régulier.",
        },
      ],
      exercise: {
        title: "Stratégie de fidélisation + valeur client",
        prompt: [
          "Définissez pour votre projet 3 leviers de fidélisation, une action de vente croisée honnête, et calculez taux de réachat/rétention et LTV (données simulées).",
        ],
        deliverables: ["Un plan de fidélisation + calculs de réachat, rétention et LTV (données simulées)."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les leviers de fidélisation sont pertinents et honnêtes.",
        "Les calculs de rétention et de LTV sont exacts.",
        "La vente additionnelle sert un vrai besoin.",
      ],
      resources: ["Feuille de calcul valeur client (ressource interne)"],
      glossary: [{ term: "Montée en gamme", definition: "Proposition d'une offre supérieure répondant mieux au besoin." }],
      summary:
        "Fidéliser (programmes, relances, contenu) et vendre davantage honnêtement augmentent la valeur vie client ; on mesure réachat, rétention et LTV pour piloter la rentabilité durable.",
      selfAssessment: [
        "Sais-je calculer réachat, rétention et LTV ?",
        "Ma vente additionnelle sert-elle un vrai besoin ?",
      ],
      quiz: { id: "mkt-v2-m5-l11-qz", questionIds: ["mkt-v2-m5-q18", "mkt-v2-m5-q19"], passThreshold: 70 },
      keyTakeaways: [
        "Un client fidèle est plus rentable qu'un nouveau.",
        "LTV = panier moyen × fréquence × durée.",
        "Vente additionnelle honnête, jamais forcée ni cachée.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la mesure et l'optimisation e-commerce (leçon 15.4)." },
        { condition: "score < 70", message: "Revoyez les calculs de LTV et les leviers de fidélisation." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 15.4.",
    },
    {
      id: "mkt-v2-m5-l12",
      module: 5,
      week: 15,
      title: "Mesure et optimisation du commerce électronique",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Piloter une boutique suppose de suivre les bons indicateurs et d'améliorer en continu. Cette leçon présente les indicateurs e-commerce clés, le tableau de bord et la boucle d'amélioration.",
      objectives: [
        "Suivre les indicateurs e-commerce essentiels",
        "Construire un tableau de bord orienté décision",
        "Prioriser les améliorations à fort impact",
        "Installer une boucle de rétroaction et d'amélioration continue",
      ],
      competencies: ["C16"],
      prerequisites: ["Leçons 15.1-15.3 ; indicateurs (M4)"],
      formulas: [
        { name: "Taux de conversion", expression: "commandes / visiteurs × 100", example: "(200 / 10 000) × 100 = 2 % — jeu de données pédagogique fictif" },
        { name: "Panier moyen", expression: "chiffre d'affaires / nombre de commandes", example: "10 000 $ / 200 = 50 $ — jeu de données pédagogique fictif" },
        { name: "Taux d'abandon de panier", expression: "paniers abandonnés / paniers créés × 100", example: "(700 / 1000) × 100 = 70 % — jeu de données pédagogique fictif" },
      ],
      sections: [
        {
          heading: "Les indicateurs essentiels",
          body: [
            "Chiffre d'affaires, nombre de commandes, panier moyen, taux de conversion, taux d'abandon de panier, coût d'acquisition, marge, taux de remboursement/retour, taux de rétention, valeur vie client, satisfaction, délai de livraison, volume de tickets d'assistance. Chacun éclaire une facette : vente, rentabilité, opérations, expérience. On choisit ceux qui servent les décisions, pas les métriques de vanité.",
          ],
        },
        {
          heading: "Le tableau de bord",
          body: [
            "Un bon tableau de bord met en avant quelques indicateurs décisionnels, les compare dans le temps et par segment, et relie chaque chiffre à une action possible. Trop d'indicateurs noient le signal ; on sélectionne ceux qui pilotent réellement la boutique.",
          ],
        },
        {
          heading: "Prioriser et tester",
          body: [
            "L'amélioration se concentre sur l'étape qui pèse le plus (fort abandon de panier, faible réachat…). On teste les changements (comme les tests A/B du Module 4) et on mesure l'effet. On priorise par impact et faisabilité, sans disperser l'effort.",
          ],
        },
        {
          heading: "Boucle d'amélioration continue",
          body: [
            "Mesurer → analyser → décider → tester → mesurer : la boucle de rétroaction rend l'optimisation permanente. Les retours clients (avis, service, enquêtes) nourrissent aussi cette boucle. Une boutique se pilote dans la durée, pas une fois pour toutes.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Taux d'abandon de panier", definition: "Part des paniers créés non finalisés en commande." },
        { term: "Taux de retour", definition: "Part des commandes retournées par les clients." },
        { term: "Boucle de rétroaction", definition: "Cycle mesurer → analyser → décider → tester → mesurer." },
      ],
      examples: [
        "Jeu de données pédagogique fictif : 10 000 visiteurs, 200 commandes → conversion 2 %, panier 50 $.",
        "Fort taux d'abandon (70 %) → priorité au checkout avant d'augmenter le trafic.",
      ],
      commonError: {
        title: "Suivre trop d'indicateurs sans décision",
        body:
          "Un tableau de bord surchargé de métriques (dont des vanités) sans lien avec l'action ne pilote rien. On sélectionne peu d'indicateurs décisionnels reliés à des actions.",
      },
      vigilancePoint: {
        title: "Améliorer sur des données fiables",
        body:
          "On décide sur des données suffisantes et fiables, jamais sur une impression ou un échantillon minuscule. Toutes les données du module sont simulées.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Café Nord-Berge (torréfacteur, Québec) — Jeu de données pédagogique fictif",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le café fictif Nord-Berge suivait des dizaines de métriques sans savoir lesquelles piloter, et voulait « plus de trafic » alors que son taux d'abandon de panier simulé était de 70 %.",
          "En resserrant son tableau de bord sur quelques indicateurs décisionnels et en priorisant la réduction de l'abandon de panier (plutôt que l'acquisition), Nord-Berge a amélioré sa conversion simulée. Piloter les bons indicateurs, dans une boucle d'amélioration, a plus d'effet que d'empiler les chiffres.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m5-l12-ia1",
          title: "Analyser un tableau de bord",
          objective: "Choisir la priorité d'optimisation à partir d'indicateurs.",
          instructions: [
            "Jeu de données pédagogique fictif : conversion 2 %, abandon de panier 75 %, réachat 12 %, satisfaction élevée. Quelle priorité d'optimisation ?",
          ],
          answerKey: [
            "Priorité : réduire l'abandon de panier (75 % est très élevé) — c'est le plus fort levier avant d'investir ailleurs ; ensuite travailler le réachat.",
          ],
          feedback: "On agit d'abord sur l'indicateur le plus dégradé à fort impact (ici l'abandon de panier).",
          successCriterion: "Abandon de panier identifié comme priorité.",
        },
        {
          id: "mkt-v2-m5-l12-ia2",
          title: "Choisir une priorité d'optimisation",
          objective: "Prioriser par impact et faisabilité.",
          instructions: [
            "Entre : (a) changer la couleur d'un bouton ; (b) simplifier un checkout à 14 champs responsable de 75 % d'abandon — que prioriser et pourquoi ?",
          ],
          answerKey: ["(b) simplifier le checkout : impact bien plus élevé sur l'abandon que la couleur d'un bouton."],
          feedback: "On priorise l'action à fort impact sur l'étape qui fuit le plus.",
          successCriterion: "Choix (b) justifié par l'impact.",
        },
      ],
      exercise: {
        title: "Plan complet de commerce électronique et d'expérience client",
        prompt: [
          "Assemblez le PLAN COMPLET DE COMMERCE ÉLECTRONIQUE ET D'EXPÉRIENCE CLIENT (30 sections) : modèle, catalogue, fiches, prix/coûts/marges, seuil, panier, paiement simulé, commandes, stocks, livraison, retours, remboursements, notifications, parcours, service client, fidélisation, vente croisée, indicateurs, tableau de bord, risques, conformité, plan d'optimisation, synthèse.",
          "Terminez par un plan d'amélioration continue priorisé.",
        ],
        deliverables: ["Le PLAN COMPLET DE COMMERCE ÉLECTRONIQUE ET D'EXPÉRIENCE CLIENT (données simulées) + plan d'amélioration priorisé."],
        estimatedMinutes: 90,
      },
      successCriteria: [
        "Le tableau de bord met en avant des indicateurs décisionnels.",
        "La priorité d'optimisation vise l'étape à plus fort impact.",
        "Une boucle d'amélioration continue est décrite.",
      ],
      resources: ["Gabarit de tableau de bord e-commerce (ressource interne)"],
      glossary: [{ term: "Amélioration continue", definition: "Optimisation permanente fondée sur la mesure et les retours." }],
      summary:
        "On pilote une boutique par quelques indicateurs décisionnels reliés à des actions, on priorise l'étape à plus fort impact, et on installe une boucle mesurer → analyser → décider → tester — sur données fiables et simulées.",
      selfAssessment: [
        "Mon tableau de bord est-il centré sur des indicateurs de décision ?",
        "Ai-je une boucle d'amélioration continue ?",
      ],
      quiz: { id: "mkt-v2-m5-l12-qz", questionIds: ["mkt-v2-m5-q19", "mkt-v2-m5-q15"], passThreshold: 70 },
      keyTakeaways: [
        "Peu d'indicateurs, mais décisionnels et reliés à l'action.",
        "On optimise d'abord l'étape à plus fort impact.",
        "Boucle mesurer → analyser → décider → tester, sur données fiables.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Module 5 maîtrisé. Finalisez le plan complet e-commerce et expérience client." },
        { condition: "score < 70", message: "Revoyez le choix des indicateurs et la priorisation de l'optimisation." },
      ],
      progressionRule:
        "Compléter les 4 leçons de la semaine 15, le quiz hebdomadaire, le sommatif du module (≥ 70 %) et déposer le PLAN COMPLET DE COMMERCE ÉLECTRONIQUE ET D'EXPÉRIENCE CLIENT pour valider le Module 5.",
    },
  ],

  weeklyQuizzes: [
    {
      id: "mkt-v2-m5-week13-quiz",
      // Semaine 13 : modèles, offre, catalogue, fiche (8 questions M5)
      questionIds: [
        "mkt-v2-m5-q01",
        "mkt-v2-m5-q02",
        "mkt-v2-m5-q03",
        "mkt-v2-m5-q04",
        "mkt-v2-m5-q05",
        "mkt-v2-m5-q06",
        "mkt-v2-m5-q07",
        "mkt-v2-m5-q08",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m5-week14-quiz",
      // Semaine 14 : prix, panier, paiement, opérations (6 M5 + 2 rappels M4)
      questionIds: [
        "mkt-v2-m5-q08",
        "mkt-v2-m5-q09",
        "mkt-v2-m5-q10",
        "mkt-v2-m5-q11",
        "mkt-v2-m5-q12",
        "mkt-v2-m5-q13",
        "mkt-v2-m4-q15",
        "mkt-v2-m4-q19",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m5-week15-quiz",
      // Semaine 15 : expérience, service, fidélisation, mesure (6 M5 + rappels M1/M4)
      questionIds: [
        "mkt-v2-m5-q14",
        "mkt-v2-m5-q15",
        "mkt-v2-m5-q16",
        "mkt-v2-m5-q17",
        "mkt-v2-m5-q18",
        "mkt-v2-m5-q19",
        "mkt-v2-m1-q09",
        "mkt-v2-m4-q18",
      ],
      passThreshold: 70,
    },
  ],

  rubric: {
    id: "mkt-v2-m5-rubric",
    title: "Rubrique — Plan complet de commerce électronique et d'expérience client",
    totalPoints: 100,
    passThreshold: 60,
    criteria: [
      { label: "Cohérence du modèle commercial", points: 10 },
      { label: "Architecture de l'offre et du catalogue", points: 10 },
      { label: "Qualité des fiches produit ou services", points: 10 },
      { label: "Prix, coûts et marges", points: 15 },
      { label: "Panier et paiement", points: 10 },
      { label: "Opérations, livraison et retours", points: 10 },
      { label: "Expérience client", points: 10 },
      { label: "Service client et fidélisation", points: 10 },
      { label: "Indicateurs et optimisation", points: 10 },
      { label: "Conformité, sécurité et présentation", points: 5 },
    ],
  },

  assessments: [
    {
      id: "mkt-v2-m5-sum",
      kind: "summative",
      title: "Sommatif Module 5 — Commerce électronique et expérience client (20 questions)",
      passThreshold: 70,
      weightHint: "Quiz de modules (20 %)",
    },
    {
      id: "mkt-v2-m5-tp",
      kind: "practical",
      title: "Projet Module 5 — Plan complet de commerce électronique et d'expérience client (livrable 5/7, rubrique 100 pts)",
      passThreshold: 60,
      weightHint: "Travaux pratiques (25 %)",
    },
  ],
};
