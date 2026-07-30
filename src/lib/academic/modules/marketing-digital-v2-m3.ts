import type { ModuleV2 } from "@/lib/academic/types";

/**
 * MODULE 3 — Stratégie de marque, contenu et communication numérique (semaines 7–9).
 * Programme pilote Marketing Digital et E-commerce, version académique v2.
 *
 * Transforme les livrables du Module 2 (segment, personas, besoins, proposition de valeur,
 * positionnement) en une marque cohérente, une stratégie éditoriale et un système de communication.
 * Isolé du contenu v1 ; ne modifie aucune donnée. Prépare le Module 4 (acquisition, publicité, conversion).
 *
 * Toutes les études de cas sont des « Étude de cas pédagogique fictive » (jamais présentées comme réelles).
 * Aucune reconnaissance officielle, aucun faux témoignage, aucune promesse de revenu/emploi.
 */
export const marketingDigitalV2Module3: ModuleV2 = {
  index: 3,
  title: "Stratégie de marque, contenu et communication numérique",
  weeks: [7, 8, 9],
  summary:
    "Passer du positionnement à l'expression : construire une plateforme de marque cohérente, une voix et un ton, une stratégie éditoriale et un calendrier, puis produire des contenus multicanaux (copywriting, storytelling) avec une utilisation responsable de l'IA.",
  competencies: ["C8", "C9", "C10"],
  introduction:
    "Le Module 2 a défini à qui l'on s'adresse et pourquoi nous choisir. Le Module 3 répond à : « comment le dire, partout, de façon cohérente ? ». On y construit la marque (mission, valeurs, personnalité, voix), on structure une stratégie de contenu ancrée dans les personas et le parcours client, et on apprend à rédiger et à raconter — en encadrant l'IA plutôt qu'en la subissant.",
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
      "Segment cible + personas principal/secondaire (M2, S5) — données d'entrée des piliers éditoriaux",
      "Besoins, frustrations, objections et parcours client (M2, S5) — nourrissent les thèmes de contenu",
      "Proposition de valeur + déclaration de positionnement + message principal (M2, S6) — base de la plateforme de marque",
      "Fondamentaux et funnel AARRR (M1) — le contenu se relie aux étapes du parcours",
    ],
    consolidatedCompetencies: [
      "C7 (proposition de valeur / positionnement) → opérationnalisé en C8 (plateforme de marque)",
    ],
    newCompetencies: [
      "C8 — construire une marque cohérente (plateforme, personnalité, voix, ton)",
      "C9 — concevoir une stratégie et un calendrier de contenu ancrés dans les personas",
      "C10 — produire et adapter des contenus (copywriting, storytelling, multicanal) avec une IA encadrée",
    ],
    deliverablesForNextModule: [
      "Plateforme de marque + messages → alimenteront les créations publicitaires du Module 4",
      "Calendrier éditorial + appels à l'action → base des campagnes d'acquisition du Module 4",
    ],
  },
  lessons: [
    // ══════════════ SEMAINE 7 — CONSTRUIRE UNE MARQUE COHÉRENTE ══════════════
    {
      id: "mkt-v2-m3-l1",
      module: 3,
      week: 7,
      title: "Comprendre la marque",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une marque n'est pas un logo. C'est la perception qui vit dans l'esprit des gens à propos d'une entreprise, d'un produit ou d'une personne. Cette leçon clarifie ce qu'est réellement une marque et distingue ses composantes souvent confondues.",
      objectives: [
        "Définir une marque comme une perception et une expérience, pas un simple visuel",
        "Distinguer marque, logo, identité visuelle, produit et réputation",
        "Expliquer le capital de marque et le rôle de la cohérence",
        "Différencier marque personnelle, d'entreprise, de service et employeur",
      ],
      competencies: ["C8"],
      prerequisites: ["Module 2 — positionnement et message principal"],
      sections: [
        {
          heading: "La marque est une perception",
          body: [
            "Une marque est l'ensemble des perceptions, associations et émotions qu'une personne relie à une entreprise, un produit ou un individu. Elle n'existe pas dans un fichier graphique : elle vit dans l'esprit du public. On peut concevoir un logo, mais on ne « possède » pas sa marque — on l'influence par la cohérence de ce qu'on dit et fait.",
            "Le logo, la palette de couleurs et la typographie forment l'identité visuelle : ce sont des signaux de la marque, pas la marque elle-même. Le produit est ce que l'on vend ; la réputation est ce que les autres disent de nous. La marque est le fil qui relie tout cela en une perception cohérente.",
          ],
        },
        {
          heading: "Expérience, confiance et cohérence",
          body: [
            "Une marque forte se construit par l'expérience répétée : chaque interaction (site, service, courriel, publicité) confirme ou contredit la promesse. La confiance naît de la cohérence — quand ce que la marque promet correspond à ce que le client vit. Une belle identité visuelle sur une expérience décevante détruit la marque plus vite qu'elle ne la construit.",
          ],
        },
        {
          heading: "Capital de marque",
          body: [
            "Le capital de marque est la valeur qu'ajoute la marque au-delà du produit lui-même : notoriété, associations positives, fidélité, préférence. Un capital de marque élevé permet de vendre plus facilement, de résister à la concurrence et parfois de justifier un prix supérieur — parce que le client fait confiance.",
          ],
        },
        {
          heading: "Types de marques",
          body: [
            "Marque d'entreprise (l'organisation dans son ensemble), marque de service (une prestation intangible, où l'expérience humaine compte davantage), marque personnelle (un individu — consultant, créateur), et marque employeur (l'image auprès des candidats et employés). Les principes sont communs, mais l'accent diffère : le service mise sur la relation et la preuve, la marque personnelle sur l'authenticité et la constance.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Marque", definition: "Ensemble des perceptions et émotions associées à une entreprise/produit/personne." },
        { term: "Identité visuelle", definition: "Signaux visuels de la marque (logo, couleurs, typographie)." },
        { term: "Capital de marque", definition: "Valeur ajoutée par la marque au-delà du produit (notoriété, fidélité, préférence)." },
        { term: "Réputation", definition: "Ce que les autres disent et pensent de la marque." },
      ],
      examples: [
        "Deux cafés au produit identique : celui à la marque forte (expérience et cohérence) est préféré et fidélise davantage.",
        "Une marque de service (agence) : la constance de la relation client pèse plus que le logo.",
      ],
      commonError: {
        title: "Confondre marque et logo",
        body:
          "Refaire son logo en pensant « refaire sa marque » ignore l'essentiel : la marque se joue dans l'expérience et la cohérence, pas dans un habillage graphique.",
      },
      vigilancePoint: {
        title: "Cohérence avant esthétique",
        body:
          "Une identité visuelle soignée ne compense jamais une expérience incohérente. Vérifier d'abord que la promesse tenue correspond à la promesse affichée.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (commerce de détail, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "Boréalille, boutique fictive de vêtements, a investi dans un nouveau logo haut de gamme en espérant « monter en marque ». L'identité était superbe, mais le service en magasin restait lent et l'emballage bas de gamme.",
          "La perception ne changeait pas : les clients ressentaient un écart entre la promesse visuelle et l'expérience réelle. En alignant ensuite l'expérience (accueil, emballage, suivi) sur la nouvelle identité, la marque a enfin gagné en cohérence et en préférence. La leçon : la marque se construit par l'expérience, pas par le logo seul.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l1-ia1",
          title: "Distinguer marque, identité et réputation",
          objective: "Classer des éléments selon qu'ils relèvent de la marque, de l'identité visuelle ou de la réputation.",
          instructions: [
            "Classez : (a) le logo et la palette de couleurs ; (b) les avis Google des clients ; (c) la perception globale « fiable et chaleureuse » ; (d) la typographie du site.",
          ],
          answerKey: [
            "(a) identité visuelle.",
            "(b) réputation (ce que les autres disent).",
            "(c) marque (perception globale).",
            "(d) identité visuelle.",
          ],
          feedback: "L'identité visuelle est un signal ; la réputation vient des autres ; la marque est la perception d'ensemble.",
          successCriterion: "Au moins 3 des 4 éléments correctement classés.",
        },
      ],
      exercise: {
        title: "Diagnostic de marque de votre projet",
        prompt: [
          "Pour le projet des Modules 1-2, décrivez la perception actuelle de la marque (si elle existe) vs la perception visée.",
          "Repérez un écart entre promesse affichée et expérience vécue.",
        ],
        deliverables: ["Une fiche diagnostic : perception actuelle, perception visée, un écart à corriger."],
        estimatedMinutes: 45,
      },
      successCriteria: [
        "La marque est définie comme perception/expérience, pas comme logo.",
        "Les composantes (identité, produit, réputation) sont distinguées.",
        "Un écart promesse/expérience est identifié.",
      ],
      resources: ["Notes de cours ARCADINS — capital de marque (ressource interne)"],
      glossary: [
        { term: "Marque employeur", definition: "Image de l'organisation auprès des candidats et des employés." },
        { term: "Marque personnelle", definition: "Marque construite autour d'un individu (constance, authenticité)." },
      ],
      summary:
        "La marque est une perception construite par l'expérience et la cohérence ; le logo n'en est qu'un signal. Le capital de marque récompense la confiance gagnée.",
      selfAssessment: [
        "Puis-je expliquer pourquoi la marque n'est pas le logo ?",
        "Puis-je nommer un écart entre la promesse et l'expérience de mon projet ?",
      ],
      quiz: { id: "mkt-v2-m3-l1-qz", questionIds: ["mkt-v2-m3-q01", "mkt-v2-m3-q02"], passThreshold: 70 },
      keyTakeaways: [
        "La marque vit dans l'esprit du public, pas dans un fichier graphique.",
        "La confiance naît de la cohérence promesse/expérience.",
        "Le capital de marque ajoute de la valeur au-delà du produit.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Solide. Passez à la mission, vision et valeurs (leçon 7.2)." },
        { condition: "score < 70", message: "Revoyez la distinction marque / identité / réputation." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 7.2.",
    },
    {
      id: "mkt-v2-m3-l2",
      module: 3,
      week: 7,
      title: "Mission, vision, valeurs et raison d'être",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une marque cohérente repose sur des fondations claires : pourquoi elle existe, où elle va, ce en quoi elle croit. Cette leçon apprend à formuler mission, vision, valeurs et raison d'être — en évitant les déclarations vagues qui sonnent bien mais ne guident rien.",
      objectives: [
        "Distinguer mission, vision, valeurs et raison d'être",
        "Formuler des déclarations spécifiques plutôt que vagues",
        "Assurer la cohérence entre discours et réalité",
        "Valider les fondations auprès des parties prenantes",
      ],
      competencies: ["C8"],
      prerequisites: ["Leçon 7.1 — comprendre la marque"],
      sections: [
        {
          heading: "Quatre fondations, quatre rôles",
          body: [
            "La mission dit ce que la marque fait et pour qui, aujourd'hui (« aider les PME à facturer sans stress »). La vision décrit le futur souhaité (« un monde où aucune PME ne perd de temps en administration »). Les valeurs sont les principes de comportement (« transparence, simplicité, respect »). La raison d'être (le « pourquoi ») est la conviction profonde qui précède le produit. Ensemble, elles alignent les décisions et la communication.",
          ],
        },
        {
          heading: "Spécifique, pas vague",
          body: [
            "« Offrir la meilleure qualité et satisfaire nos clients » ne guide aucune décision : tout le monde le dit. Une déclaration utile est spécifique et distinctive (« rendre la facturation faisable en deux minutes, sans formation »). Le test : si un concurrent pourrait signer la même phrase sans changer un mot, elle est trop vague.",
          ],
        },
        {
          heading: "Cohérence discours / réalité",
          body: [
            "Des valeurs affichées mais démenties par les actes (« nous valorisons le client » avec un service injoignable) détruisent la confiance. Les fondations doivent être vécues, pas décoratives. Mieux vaut trois valeurs réellement appliquées que dix affichées et ignorées.",
          ],
        },
        {
          heading: "Formuler et valider",
          body: [
            "On formule à partir de la proposition de valeur et du positionnement du Module 2, puis on valide auprès des parties prenantes (équipe, premiers clients) : se reconnaissent-ils ? La déclaration résonne-t-elle et est-elle tenable ? Une fondation validée devient un repère pour toute la communication.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Mission", definition: "Ce que la marque fait et pour qui, au présent." },
        { term: "Vision", definition: "Le futur souhaité que la marque veut contribuer à créer." },
        { term: "Valeurs", definition: "Principes de comportement qui guident les décisions." },
        { term: "Raison d'être", definition: "La conviction profonde (« pourquoi ») qui précède le produit." },
      ],
      examples: [
        "Mission vague : « satisfaire nos clients » → mission spécifique : « livrer un premier emploi qualifié en moins de 3 mois ».",
        "Valeur vécue : un délai de réponse garanti sous 24 h incarne « respect du temps du client ».",
      ],
      commonError: {
        title: "La déclaration « qui pourrait être celle de n'importe qui »",
        body:
          "Si un concurrent peut reprendre votre mission mot pour mot, elle ne dit rien de vous. Ajoutez la spécificité qui vient de votre positionnement.",
      },
      vigilancePoint: {
        title: "Ne promettez que ce que vous tenez",
        body:
          "Des valeurs ou une mission non tenues sont pires que leur absence. Vérifiez que chaque affirmation correspond à une réalité opérationnelle.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Racine & Sol (organisme, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "L'organisme fictif Racine & Sol affichait « accompagnement de qualité, valeurs humaines ». Générique, indistinct, sans effet.",
          "En repartant de sa raison d'être (« que chaque nouvel arrivant qualifié retrouve rapidement un emploi à la hauteur de ses compétences ») et de valeurs vécues (réponse sous 48 h, suivi nominatif), les fondations sont devenues spécifiques et vérifiables. Les équipes s'y sont reconnues et la communication a gagné en force. Une fondation validée guide mieux qu'un slogan vague.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l2-ia1",
          title: "Corriger une mission trop vague",
          objective: "Rendre une mission spécifique et distinctive.",
          instructions: [
            "Reformulez : « Notre mission est d'offrir des produits de qualité et de satisfaire nos clients. » Ajoutez cible, résultat concret et différence.",
          ],
          answerKey: [
            "Exemple valide : « Aider les cafés indépendants à servir un café frais chaque matin, en livrant en 48 h du café torréfié à la commande. »",
          ],
          feedback: "Une bonne mission nomme la cible, un résultat concret et ce qui la distingue.",
          successCriterion: "Reformulation contenant cible + résultat concret + élément distinctif.",
        },
        {
          id: "mkt-v2-m3-l2-ia2",
          title: "Hiérarchiser des valeurs",
          objective: "Prioriser des valeurs réellement structurantes.",
          instructions: [
            "Parmi : rapidité, transparence, luxe, proximité, innovation — choisissez les 3 qui pourraient être VÉCUES par une petite épicerie de quartier et justifiez.",
          ],
          answerKey: [
            "Choix défendable : proximité, transparence, rapidité — cohérents avec une épicerie de quartier et vérifiables au quotidien. « Luxe » contredirait le positionnement.",
          ],
          feedback: "On retient les valeurs tenables et cohérentes avec le positionnement, pas les plus flatteuses.",
          successCriterion: "3 valeurs cohérentes et justifiées par leur applicabilité réelle.",
        },
      ],
      exercise: {
        title: "Rédiger les fondations de sa marque",
        prompt: [
          "Rédigez mission, vision, 3 valeurs et raison d'être pour votre projet, à partir de votre positionnement (M2).",
          "Pour chaque valeur, indiquez une preuve concrète de son application.",
        ],
        deliverables: ["Une page « Fondations de marque » : mission, vision, 3 valeurs (avec preuve), raison d'être."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les quatre fondations sont distinctes et spécifiques.",
        "Chaque valeur est assortie d'une preuve d'application.",
        "Aucune déclaration n'est interchangeable avec celle d'un concurrent.",
      ],
      resources: ["Gabarit fondations de marque (ressource interne)"],
      glossary: [
        { term: "Partie prenante", definition: "Personne concernée par la marque (équipe, client, partenaire)." },
      ],
      summary:
        "Mission, vision, valeurs et raison d'être alignent la marque ; elles doivent être spécifiques, vécues et validées, pas décoratives.",
      selfAssessment: [
        "Mes fondations sont-elles spécifiques et distinctives ?",
        "Chaque valeur est-elle réellement tenue ?",
      ],
      quiz: { id: "mkt-v2-m3-l2-qz", questionIds: ["mkt-v2-m3-q03", "mkt-v2-m3-q04"], passThreshold: 70 },
      keyTakeaways: [
        "Mission (présent), vision (futur), valeurs (comportements), raison d'être (pourquoi).",
        "Spécifique et distinctif l'emporte sur inspirant mais vague.",
        "Une valeur non vécue nuit plus qu'elle n'aide.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la personnalité, la voix et le ton (leçon 7.3)." },
        { condition: "score < 70", message: "Revoyez la distinction mission/vision/valeurs et le test de spécificité." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 7.3.",
    },
    {
      id: "mkt-v2-m3-l3",
      module: 3,
      week: 7,
      title: "Personnalité, archétype, voix et ton",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Deux marques peuvent dire la même chose et sonner totalement différemment. La personnalité, la voix et le ton donnent à la marque une manière de parler reconnaissable et adaptée à son public.",
      objectives: [
        "Définir la personnalité de marque et ses traits dominants",
        "Utiliser les archétypes comme outils, non comme règles absolues",
        "Distinguer voix (constante) et ton (contextuel)",
        "Établir un vocabulaire autorisé/à éviter et une communication inclusive",
      ],
      competencies: ["C8", "C9"],
      prerequisites: ["Leçon 7.2 — fondations de marque"],
      sections: [
        {
          heading: "Personnalité et archétypes",
          body: [
            "La personnalité de marque est l'ensemble des traits humains qu'on lui associe (chaleureuse, experte, audacieuse, rassurante). On la résume souvent par 3 à 4 traits dominants. Les archétypes (le Sage, le Héros, le Créateur, l'Ami…) sont des repères utiles pour incarner une personnalité, mais ce sont des outils d'inspiration, pas des cases rigides : on adapte, on ne se soumet pas.",
          ],
        },
        {
          heading: "Voix constante, ton contextuel",
          body: [
            "La voix est la personnalité exprimée en mots : elle reste constante (une marque « chaleureuse et claire » l'est partout). Le ton s'adapte au contexte : plus léger sur les réseaux, plus sobre dans un message de service client, plus rassurant dans une situation de crise. Même voix, tons différents selon la situation et l'émotion du lecteur.",
          ],
        },
        {
          heading: "Vocabulaire et niveau de formalité",
          body: [
            "On définit un vocabulaire autorisé (mots qui incarnent la marque) et des expressions à éviter (jargon, superlatifs creux, formules qui trahissent la personnalité). On fixe un niveau de formalité (tutoiement/vouvoiement, familiarité) cohérent avec le public et la culture.",
          ],
        },
        {
          heading: "Inclusion et cohérence multilingue",
          body: [
            "Une communication inclusive s'adresse à tous sans exclure ni stéréotyper ; elle soigne les formulations et l'accessibilité. Sur une plateforme multilingue, la voix doit rester reconnaissable d'une langue à l'autre : on adapte culturellement plutôt que de traduire mot à mot, sous peine de perdre la personnalité.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Voix de marque", definition: "Personnalité exprimée en mots, constante dans le temps." },
        { term: "Ton", definition: "Adaptation de la voix au contexte et à l'émotion du lecteur." },
        { term: "Archétype", definition: "Repère d'incarnation d'une personnalité, à utiliser comme outil souple." },
      ],
      examples: [
        "Voix « experte et rassurante » : ton pédagogique dans un guide, ton empathique dans une réponse à une plainte.",
        "Vocabulaire à éviter : « révolutionnaire », « leader incontesté » — superlatifs creux qui affaiblissent la crédibilité.",
      ],
      commonError: {
        title: "Changer de voix à chaque publication",
        body:
          "Une marque tantôt corporate, tantôt familière, tantôt agressive devient méconnaissable. La voix reste stable ; seul le ton s'ajuste.",
      },
      vigilancePoint: {
        title: "Inclusion et respect culturel",
        body:
          "Adapter le ton ne justifie jamais des stéréotypes ou des formulations excluantes. Vérifier l'accessibilité et le respect dans chaque langue.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada)",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive de thés InfusiO alternait un ton très commercial dans ses publicités et un ton froid dans son service client. Les clients percevaient deux marques différentes.",
          "En définissant une voix unique (« chaleureuse, curieuse, pédagogue ») déclinée en tons contextuels (enjoué sur les réseaux, attentionné en service, sobre sur les pages produit), InfusiO est devenue reconnaissable et rassurante partout. La cohérence de voix a renforcé la confiance et la fidélité.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l3-ia1",
          title: "Choisir une personnalité de marque",
          objective: "Associer des traits de personnalité cohérents à un positionnement.",
          instructions: [
            "Pour une clinique de santé rassurante et sérieuse, choisissez 3 traits parmi : provocante, chaleureuse, experte, festive, rassurante, ironique.",
          ],
          answerKey: ["Choix cohérent : chaleureuse, experte, rassurante. « Provocante », « festive » et « ironique » contrediraient le contexte."],
          feedback: "Les traits doivent servir le positionnement et l'attente émotionnelle du public.",
          successCriterion: "3 traits cohérents avec un positionnement rassurant/sérieux.",
        },
        {
          id: "mkt-v2-m3-l3-ia2",
          title: "Adapter le ton à plusieurs situations",
          objective: "Garder la voix, ajuster le ton selon le contexte.",
          instructions: [
            "Pour une voix « claire et bienveillante », indiquez le ton approprié pour : (1) une promotion sur Instagram ; (2) une réponse à un client mécontent ; (3) une page de conditions de service.",
          ],
          answerKey: ["(1) enjoué et concis ; (2) empathique et responsable ; (3) sobre et précis — sans jamais perdre la clarté ni la bienveillance."],
          feedback: "Même voix, tons différents ; l'émotion du lecteur guide l'ajustement.",
          successCriterion: "Trois tons distincts cohérents avec une même voix.",
        },
      ],
      exercise: {
        title: "Guide de voix et ton",
        prompt: [
          "Définissez 3-4 traits de personnalité pour votre marque, une voix en une phrase, et 3 tons contextuels.",
          "Listez 5 mots autorisés et 5 expressions à éviter.",
        ],
        deliverables: ["Un mini guide de voix : personnalité, voix, 3 tons, vocabulaire autorisé/interdit."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "La voix est constante et les tons contextuels sont distincts.",
        "Le vocabulaire autorisé/interdit reflète la personnalité.",
        "La communication reste inclusive et respectueuse.",
      ],
      resources: ["Gabarit guide de voix et ton (ressource interne)"],
      glossary: [
        { term: "Niveau de formalité", definition: "Degré de familiarité (tutoiement/vouvoiement) adopté selon le public." },
        { term: "Communication inclusive", definition: "Formulations qui s'adressent à tous sans exclure ni stéréotyper." },
      ],
      summary:
        "La personnalité se traduit en une voix constante et des tons contextuels ; un vocabulaire cadré et une communication inclusive rendent la marque reconnaissable partout.",
      selfAssessment: [
        "Ma voix reste-t-elle constante quand le ton change ?",
        "Mon vocabulaire reflète-t-il vraiment ma personnalité ?",
      ],
      quiz: { id: "mkt-v2-m3-l3-qz", questionIds: ["mkt-v2-m3-q05", "mkt-v2-m3-q06"], passThreshold: 70 },
      keyTakeaways: [
        "Voix = constante ; ton = contextuel.",
        "Les archétypes sont des outils, pas des règles absolues.",
        "Vocabulaire cadré + inclusion = cohérence multicanale et multilingue.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour la plateforme et l'architecture de marque (leçon 7.4)." },
        { condition: "score < 70", message: "Revoyez la différence voix/ton et le rôle des archétypes." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 7.4.",
    },
    {
      id: "mkt-v2-m3-l4",
      module: 3,
      week: 7,
      title: "Plateforme et architecture de marque",
      authored: true,
      durationMinutes: 90,
      introduction:
        "La plateforme de marque rassemble en un document de référence tout ce qui définit la marque, pour que chaque contenu en découle. Cette leçon apprend à la construire et à organiser une éventuelle hiérarchie de marques.",
      objectives: [
        "Structurer une plateforme de marque (essence, promesse, bénéfices, preuves, territoire)",
        "Relier bénéfices fonctionnels et émotionnels à des preuves",
        "Définir un slogan/signature cohérent",
        "Organiser une hiérarchie de marques (principale, sous-marques)",
      ],
      competencies: ["C8"],
      prerequisites: ["Leçons 7.1 à 7.3"],
      sections: [
        {
          heading: "Qu'est-ce qu'une plateforme de marque",
          body: [
            "La plateforme de marque est le document de référence qui condense l'essence (l'idée centrale en quelques mots), la promesse, les bénéfices fonctionnels (ce que le produit fait) et émotionnels (ce que le client ressent), les preuves (ce qui rend la promesse crédible), le territoire de communication (les thèmes et l'univers) et la signature/slogan. Tout contenu futur doit pouvoir se justifier par la plateforme.",
          ],
        },
        {
          heading: "Bénéfices et preuves",
          body: [
            "Un bénéfice fonctionnel (« factures en 2 minutes ») gagne à être doublé d'un bénéfice émotionnel (« la tranquillité de savoir que tout est en règle »). Chaque bénéfice doit s'appuyer sur une preuve : démonstration, garantie, chiffre vérifiable, exemple. Sans preuve, le bénéfice reste une affirmation.",
          ],
        },
        {
          heading: "Territoire, signature, slogan",
          body: [
            "Le territoire de communication délimite l'univers thématique légitime de la marque (ce dont elle peut parler avec crédibilité). La signature/slogan résume la promesse de façon mémorable — utile mais optionnel, et à ne pas confondre avec la déclaration de positionnement (interne).",
          ],
        },
        {
          heading: "Hiérarchie de marques",
          body: [
            "Quand une organisation a plusieurs offres, on organise une architecture : marque principale et sous-marques (ou gammes). On choisit le degré de lien (sous-marques très rattachées à la principale, ou plus autonomes) selon la cohérence recherchée. L'enjeu est d'éviter la confusion : le client doit comprendre qui parle et ce que chaque offre promet.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Plateforme de marque", definition: "Document de référence condensant essence, promesse, bénéfices, preuves et territoire." },
        { term: "Territoire de communication", definition: "Univers thématique légitime dont la marque peut parler avec crédibilité." },
        { term: "Architecture de marque", definition: "Organisation des relations entre marque principale et sous-marques/gammes." },
      ],
      examples: [
        "Essence : « la facturation sans stress ». Bénéfice émotionnel : sérénité fiscale. Preuve : conformité vérifiée automatiquement.",
        "Hiérarchie : une marque principale de cosmétiques avec une sous-gamme « peaux sensibles » clairement rattachée.",
      ],
      commonError: {
        title: "Un slogan sans plateforme",
        body:
          "Chercher « une belle phrase » avant d'avoir défini l'essence et les preuves produit un slogan creux. Le slogan découle de la plateforme, pas l'inverse.",
      },
      vigilancePoint: {
        title: "Chaque contenu doit se justifier par la plateforme",
        body:
          "Si une publication ne peut se rattacher ni au territoire ni à la promesse, elle affaiblit la marque. La plateforme est le filtre de cohérence.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréal Tech (technologie, international)",
        region: "internationale",
        isFictional: true,
        body: [
          "L'entreprise fictive Boréal Tech multipliait les messages sans fil conducteur : tantôt « puissance », tantôt « prix », tantôt « fun ». La marque semblait éparpillée.",
          "En construisant une plateforme (essence : « la gestion de projet limpide pour les agences créatives » ; bénéfices fonctionnels/émotionnels ; preuves ; territoire), chaque contenu a enfin découlé d'un socle commun. La signature a résumé la promesse, et la communication est devenue cohérente et reconnaissable.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l4-ia1",
          title: "Construire une architecture de messages",
          objective: "Relier essence, bénéfices et preuves de façon cohérente.",
          instructions: [
            "À partir de l'essence « voyager sans angoisse de planification », proposez 1 bénéfice fonctionnel, 1 bénéfice émotionnel et 1 preuve.",
          ],
          answerKey: [
            "Fonctionnel : itinéraire clé en main. Émotionnel : partir l'esprit tranquille. Preuve : accompagnement humain et réservations confirmées à l'avance.",
          ],
          feedback: "Un bénéfice tient debout grâce à une preuve ; fonctionnel et émotionnel se complètent.",
          successCriterion: "Bénéfice fonctionnel + émotionnel + preuve cohérents avec l'essence.",
        },
      ],
      exercise: {
        title: "Dossier de plateforme de marque",
        prompt: [
          "Rédigez la plateforme de marque de votre projet : essence, promesse, bénéfices fonctionnels/émotionnels, preuves, territoire, signature provisoire.",
          "Ajoutez les règles de cohérence (voix, vocabulaire) issues de la leçon 7.3.",
        ],
        deliverables: [
          "Le DOSSIER DE PLATEFORME DE MARQUE (nom, mission, vision, valeurs, raison d'être, promesse, personnalité, voix, tons, vocabulaire recommandé/interdit, preuves, slogan provisoire, règles de cohérence).",
        ],
        estimatedMinutes: 90,
      },
      successCriteria: [
        "La plateforme relie essence, bénéfices et preuves.",
        "La signature découle de la plateforme.",
        "Les règles de cohérence sont explicites.",
      ],
      resources: ["Gabarit de plateforme de marque (ressource interne)"],
      glossary: [
        { term: "Essence de marque", definition: "Idée centrale de la marque, résumée en quelques mots." },
        { term: "Signature", definition: "Phrase mémorable résumant la promesse (souvent le slogan)." },
      ],
      summary:
        "La plateforme de marque est le document de référence dont découle tout contenu ; elle relie essence, bénéfices, preuves et territoire, et cadre l'architecture des offres.",
      selfAssessment: [
        "Chaque futur contenu pourra-t-il se justifier par ma plateforme ?",
        "Mes bénéfices sont-ils tous soutenus par une preuve ?",
      ],
      quiz: { id: "mkt-v2-m3-l4-qz", questionIds: ["mkt-v2-m3-q07", "mkt-v2-m3-q02"], passThreshold: 70 },
      keyTakeaways: [
        "La plateforme de marque est le filtre de cohérence de tous les contenus.",
        "Chaque bénéfice a besoin d'une preuve.",
        "L'architecture de marque évite la confusion entre offres.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 7 maîtrisée. Passez à la stratégie de contenu (semaine 8)." },
        { condition: "score < 70", message: "Revoyez les composantes de la plateforme et le lien bénéfice/preuve." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 7 + le quiz hebdomadaire avant la semaine 8.",
    },

    // ══════════════ SEMAINE 8 — STRATÉGIE DE CONTENU ET PLANIFICATION ÉDITORIALE ══════════════
    {
      id: "mkt-v2-m3-l5",
      module: 3,
      week: 8,
      title: "Le rôle stratégique du contenu",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Publier n'est pas communiquer. Cette leçon distingue les types de contenu et leur rôle, et relie chaque contenu à un objectif et à une étape du parcours client.",
      objectives: [
        "Distinguer les types de contenu (informatif, éducatif, inspirationnel, relationnel, promotionnel, preuve…)",
        "Différencier « publier » et « communiquer stratégiquement »",
        "Fixer des objectifs de contenu clairs",
        "Relier le contenu aux étapes du parcours client",
      ],
      competencies: ["C9"],
      prerequisites: ["Semaine 7 — plateforme de marque ; M2 — parcours client"],
      sections: [
        {
          heading: "Des types de contenu, des rôles différents",
          body: [
            "Le contenu informatif renseigne, l'éducatif fait monter en compétence, l'inspirationnel motive, le relationnel crée du lien, le promotionnel pousse une offre, le transactionnel déclenche l'achat, le contenu de preuve rassure (études de cas, démonstrations), le contenu de fidélisation entretient la relation après l'achat. Une stratégie équilibrée combine ces rôles au lieu de tout miser sur la promotion.",
          ],
        },
        {
          heading: "Publier vs communiquer stratégiquement",
          body: [
            "Publier, c'est mettre du contenu en ligne. Communiquer stratégiquement, c'est publier le bon contenu, pour le bon persona, à la bonne étape, avec un objectif mesurable. Sans objectif ni cible, un flux de publications occupe l'espace sans produire d'effet — c'est du bruit, pas de la stratégie.",
          ],
        },
        {
          heading: "Objectifs de contenu",
          body: [
            "Chaque contenu sert un objectif : notoriété (se faire connaître), considération (aider à comparer), conversion (déclencher l'action) ou fidélisation (faire revenir/recommander). Nommer l'objectif avant de créer évite le contenu « pour publier » et permet de mesurer l'effet.",
          ],
        },
        {
          heading: "Contenu et parcours client",
          body: [
            "Le parcours du Module 2 (découverte → considération → décision → fidélisation → recommandation) guide le contenu : à la découverte, on informe et on inspire ; à la considération, on éduque et on prouve ; à la décision, on rassure et on facilite l'achat ; après, on fidélise. Aligner le contenu sur l'étape multiplie son efficacité.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Contenu de preuve", definition: "Contenu qui rassure (étude de cas, démonstration, comparatif honnête)." },
        { term: "Communication stratégique", definition: "Publier le bon contenu, pour la bonne cible, à la bonne étape, avec un objectif mesurable." },
        { term: "Objectif de contenu", definition: "Effet visé : notoriété, considération, conversion ou fidélisation." },
      ],
      examples: [
        "Découverte : un article « 5 erreurs de facturation » (éducatif). Décision : une démonstration (preuve).",
        "Après-vente : un guide d'utilisation (fidélisation) plutôt qu'une nouvelle promotion.",
      ],
      commonError: {
        title: "Ne faire que du promotionnel",
        body:
          "Un flux uniquement promotionnel lasse et ne construit ni confiance ni relation. L'équilibre entre valeur et promotion est essentiel.",
      },
      vigilancePoint: {
        title: "Un objectif par contenu",
        body:
          "Un contenu qui vise « tout à la fois » ne mesure rien. Fixer un objectif principal clair avant de créer.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Café Nord-Berge (torréfacteur, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le café fictif Nord-Berge publiait surtout des promotions. L'engagement s'essoufflait et peu de nouveaux clients arrivaient.",
          "En cartographiant ses contenus par objectif et par étape du parcours (contenu éducatif sur la torréfaction pour la découverte, preuves et avis pour la considération, offres pour la décision), la marque a rééquilibré son flux. Le contenu est devenu utile avant d'être commercial, et l'acquisition s'est améliorée. La stratégie a remplacé la simple publication.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l5-ia1",
          title: "Classer des contenus selon le parcours client",
          objective: "Associer un contenu à l'étape du parcours qu'il sert.",
          instructions: [
            "Associez : (a) article « comment choisir » ; (b) démonstration produit ; (c) guide d'utilisation post-achat.",
            "Étapes : découverte/considération · décision · fidélisation.",
          ],
          answerKey: ["(a) découverte/considération ; (b) décision (preuve) ; (c) fidélisation."],
          feedback: "Le contenu efficace correspond à l'étape et à l'objectif visés.",
          successCriterion: "Les 3 associations correctes.",
        },
      ],
      exercise: {
        title: "Cartographier ses objectifs de contenu",
        prompt: [
          "Pour votre projet, listez un objectif de contenu par étape du parcours (découverte, considération, décision, fidélisation).",
          "Proposez un type de contenu adapté à chacun.",
        ],
        deliverables: ["Un tableau étape → objectif → type de contenu."],
        estimatedMinutes: 45,
      },
      successCriteria: [
        "Chaque contenu est relié à un objectif et à une étape.",
        "Le flux n'est pas exclusivement promotionnel.",
        "La distinction publier/communiquer est appliquée.",
      ],
      resources: ["Grille contenu × parcours (ressource interne)"],
      glossary: [{ term: "Contenu de fidélisation", definition: "Contenu entretenant la relation après l'achat." }],
      summary:
        "Le contenu efficace sert un objectif clair et une étape du parcours ; l'équilibre entre valeur et promotion distingue la communication stratégique de la simple publication.",
      selfAssessment: [
        "Chacun de mes contenus a-t-il un objectif nommé ?",
        "Mon flux équilibre-t-il valeur et promotion ?",
      ],
      quiz: { id: "mkt-v2-m3-l5-qz", questionIds: ["mkt-v2-m3-q11", "mkt-v2-m3-q12"], passThreshold: 70 },
      keyTakeaways: [
        "Publier ≠ communiquer : la stratégie relie contenu, cible, étape et objectif.",
        "Chaque contenu sert un objectif (notoriété, considération, conversion, fidélisation).",
        "Équilibrer valeur et promotion construit la confiance.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à définir les piliers éditoriaux (leçon 8.2)." },
        { condition: "score < 70", message: "Revoyez les types de contenu et leur lien au parcours." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 8.2.",
    },
    {
      id: "mkt-v2-m3-l6",
      module: 3,
      week: 8,
      title: "Piliers et thèmes éditoriaux",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Les piliers éditoriaux sont les grands axes récurrents autour desquels une marque produit du contenu. Cette leçon apprend à les dériver directement des personas et des besoins du Module 2.",
      objectives: [
        "Définir piliers, thèmes et sous-thèmes",
        "Dériver les piliers des besoins, objections et expertise",
        "Équilibrer valeur et promotion",
        "Concevoir des séries et du contenu récurrent",
      ],
      competencies: ["C9"],
      prerequisites: ["Leçon 8.1 ; M2 — personas, besoins, objections"],
      sections: [
        {
          heading: "Piliers, thèmes, sous-thèmes",
          body: [
            "Un pilier est un grand axe de contenu durable (ex. « bien facturer », « gérer sa PME sereinement »). Chaque pilier se décline en thèmes (sujets plus précis) et sous-thèmes (angles concrets). Trois à cinq piliers suffisent : ils donnent de la cohérence et évitent de courir après l'actualité au hasard.",
          ],
        },
        {
          heading: "Dériver les piliers des personas",
          body: [
            "Les piliers ne s'inventent pas : ils répondent aux besoins, aux questions fréquentes, aux objections et aux problèmes des personas (Module 2), tout en mettant en valeur l'expertise et les preuves de la marque. On relie chaque pilier à un besoin réel : c'est ce qui rend le contenu pertinent plutôt que décoratif.",
          ],
        },
        {
          heading: "Équilibre valeur / promotion",
          body: [
            "Une règle éditoriale fixe la proportion entre contenu de valeur (informer, éduquer, prouver) et contenu promotionnel. Un déséquilibre vers la promotion épuise l'audience ; trop peu de promotion ne convertit pas. On calibre selon la marque et l'étape du parcours.",
          ],
        },
        {
          heading: "Séries et récurrence",
          body: [
            "Le contenu récurrent (rubriques régulières, séries) crée une attente et facilite la production : un rendez-vous hebdomadaire reconnaissable ancre la marque dans les habitudes du public et réduit la charge de création à chaque fois.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Pilier éditorial", definition: "Grand axe de contenu durable relié à un besoin du persona." },
        { term: "Règle éditoriale", definition: "Proportion cadrée entre contenu de valeur et contenu promotionnel." },
        { term: "Série éditoriale", definition: "Contenu récurrent reconnaissable créant une attente." },
      ],
      examples: [
        "Persona « PME débordée » → pilier « gagner du temps en administration » → thèmes : facturation, TPS/TVQ, automatisation.",
        "Série hebdomadaire « L'astuce du mardi » : rendez-vous reconnaissable, production facilitée.",
      ],
      commonError: {
        title: "Des piliers déconnectés des personas",
        body:
          "Choisir des piliers « parce qu'ils nous plaisent » sans les relier aux besoins des personas produit du contenu ignoré. Chaque pilier doit répondre à un besoin identifié.",
      },
      vigilancePoint: {
        title: "Valeur d'abord",
        body:
          "Un calendrier saturé de promotions détruit la confiance construite. Garder une majorité de contenu de valeur.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — OutiPro (logiciel B2B, international)",
        region: "internationale",
        isFictional: true,
        body: [
          "Le logiciel fictif OutiPro publiait au gré de l'inspiration, sans axe clair. Le contenu ne fidélisait pas.",
          "En dérivant trois piliers des besoins de son persona (« implémenter vite », « éviter les erreurs », « prouver le ROI »), chacun décliné en thèmes, la marque a gagné en cohérence et en pertinence. Une série mensuelle « cas concret » est devenue un rendez-vous attendu. Les piliers ancrés dans les personas ont transformé la portée du contenu.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l6-ia1",
          title: "Relier un persona à un pilier éditorial",
          objective: "Dériver un pilier d'un besoin de persona.",
          instructions: [
            "Le persona « nouvel arrivant cherchant un emploi qualifié » a pour besoins : comprendre le marché local, valoriser ses diplômes, réussir ses entrevues. Proposez 2 piliers éditoriaux.",
          ],
          answerKey: [
            "Piliers valides : « comprendre le marché de l'emploi local » et « valoriser son parcours (CV, entrevue, équivalences) ».",
          ],
          feedback: "Chaque pilier répond directement à un besoin identifié du persona.",
          successCriterion: "2 piliers reliés à des besoins réels du persona.",
        },
      ],
      exercise: {
        title: "Définir ses piliers éditoriaux",
        prompt: [
          "À partir de vos personas (M2), définissez 3-4 piliers, chacun décliné en 2-3 thèmes.",
          "Reliez chaque pilier à un besoin/objection précis et fixez votre règle valeur/promotion.",
        ],
        deliverables: ["Une carte des piliers (piliers → thèmes → besoin ciblé) + la règle éditoriale."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Chaque pilier est relié à un besoin de persona.",
        "Les thèmes déclinent concrètement les piliers.",
        "La règle valeur/promotion est explicite.",
      ],
      resources: ["Gabarit piliers éditoriaux (ressource interne)"],
      glossary: [{ term: "Thème éditorial", definition: "Sujet précis découlant d'un pilier." }],
      summary:
        "Trois à cinq piliers, dérivés des besoins des personas et déclinés en thèmes, donnent de la cohérence ; une règle valeur/promotion et des séries récurrentes soutiennent la production.",
      selfAssessment: [
        "Chaque pilier répond-il à un besoin réel de mon persona ?",
        "Ma règle valeur/promotion est-elle définie ?",
      ],
      quiz: { id: "mkt-v2-m3-l6-qz", questionIds: ["mkt-v2-m3-q13", "mkt-v2-m3-q14"], passThreshold: 70 },
      keyTakeaways: [
        "Les piliers se dérivent des personas, ils ne s'inventent pas.",
        "3 à 5 piliers suffisent pour rester cohérent.",
        "Récurrence + équilibre valeur/promotion = production durable.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à choisir formats et canaux (leçon 8.3)." },
        { condition: "score < 70", message: "Revoyez la dérivation des piliers à partir des besoins des personas." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 8.3.",
    },
    {
      id: "mkt-v2-m3-l7",
      module: 3,
      week: 8,
      title: "Choisir les formats et les canaux",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Un même message peut prendre mille formes. Cette leçon apprend à choisir le bon format sur le bon canal selon l'audience et l'objectif, et à réutiliser intelligemment le contenu.",
      objectives: [
        "Connaître les principaux formats (article, vidéo courte/longue, carrousel, courriel, étude de cas…)",
        "Comparer les canaux selon l'audience et l'objectif",
        "Assurer l'adéquation audience-format-canal",
        "Réutiliser et adapter le contenu sans copier-coller mécanique",
      ],
      competencies: ["C9", "C10"],
      prerequisites: ["Leçon 8.2 — piliers éditoriaux"],
      sections: [
        {
          heading: "Un éventail de formats",
          body: [
            "Article de fond, publication courte, carrousel, vidéo courte, vidéo longue, balado, courriel, infographie, étude de cas, guide, webinaire, page de destination, témoignage authentique, démonstration, comparaison : chaque format sert mieux certains objectifs. La vidéo courte capte l'attention à la découverte ; l'étude de cas et la démonstration rassurent à la décision ; le guide éduque en profondeur.",
          ],
        },
        {
          heading: "Comparer les canaux",
          body: [
            "Chaque canal a son audience, son langage et son rythme : réseaux visuels pour la découverte, plateformes professionnelles pour le B2B, courriel pour la relation directe et la conversion, site/page de destination pour l'action. Le bon canal est celui où se trouve le persona (rappel du Module 1), pas le plus à la mode.",
          ],
        },
        {
          heading: "Adéquation audience-format-canal",
          body: [
            "On aligne trois éléments : l'audience (le persona), le format (ce qui sert l'objectif) et le canal (où l'audience est présente). Un excellent format sur le mauvais canal, ou l'inverse, gaspille l'effort. On part toujours de l'audience et de l'objectif, jamais du format « tendance ».",
          ],
        },
        {
          heading: "Réutiliser sans copier",
          body: [
            "Un contenu de fond (guide, webinaire) peut se décliner en plusieurs formats (extraits vidéo, carrousels, courriel, publications). Réutiliser n'est pas copier-coller : on adapte le message, le ton et le format à chaque canal. Cette approche « créer une fois, décliner souvent » démultiplie la portée sans épuiser les ressources.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Adéquation audience-format-canal", definition: "Alignement entre le persona, le format choisi et le canal de diffusion." },
        { term: "Réutilisation (repurposing)", definition: "Décliner un contenu de fond en plusieurs formats adaptés." },
      ],
      examples: [
        "Un webinaire → 1 article + 3 carrousels + 5 vidéos courtes + 1 courriel : « créer une fois, décliner souvent ».",
        "Étude de cas sur le site (décision) + extrait vidéo sur un réseau (découverte) : même fond, formats adaptés.",
      ],
      commonError: {
        title: "Le même texte copié-collé partout",
        body:
          "Publier le même texte à l'identique sur tous les canaux ignore leurs codes et leurs audiences. Réutiliser = adapter, pas dupliquer.",
      },
      vigilancePoint: {
        title: "Partir de l'audience, pas du format tendance",
        body:
          "Choisir un format « parce qu'il marche » sans vérifier que le persona y est présent gaspille l'effort. Audience et objectif d'abord.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — TrajectO (tourisme, international)",
        region: "internationale",
        isFictional: true,
        body: [
          "L'agence fictive TrajectO produisait de longs articles… diffusés uniquement par courriel à une audience qui préférait la vidéo. Peu de portée.",
          "En partant de l'audience (grande consommatrice de vidéo courte à la découverte) et en réutilisant ses guides existants sous forme de courtes vidéos inspirantes, puis d'études de cas rassurantes à la décision, TrajectO a aligné format, canal et étape. La portée et les réservations ont progressé grâce à l'adéquation, pas à plus de production.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l7-ia1",
          title: "Sélectionner le bon format pour un objectif",
          objective: "Choisir un format adapté à l'objectif et à l'étape.",
          instructions: [
            "Quel format privilégier pour : (1) rassurer avant l'achat ? (2) capter l'attention à la découverte ? (3) éduquer en profondeur ?",
            "Formats : vidéo courte · étude de cas/démonstration · guide.",
          ],
          answerKey: ["(1) étude de cas/démonstration ; (2) vidéo courte ; (3) guide."],
          feedback: "Le format découle de l'objectif et de l'étape du parcours.",
          successCriterion: "Les 3 associations correctes.",
        },
        {
          id: "mkt-v2-m3-l7-ia2",
          title: "Transformer un contenu pour trois plateformes",
          objective: "Adapter un même fond à trois canaux distincts.",
          instructions: [
            "À partir d'un guide « 5 erreurs de facturation », proposez une déclinaison pour : un réseau visuel, une plateforme professionnelle, un courriel. Indiquez ce qui change (format, ton, longueur).",
          ],
          answerKey: [
            "Réseau visuel : carrousel court, ton enjoué. Plateforme pro : publication analytique, ton expert. Courriel : version personnalisée avec appel à l'action clair. Le fond reste, la forme s'adapte.",
          ],
          feedback: "On garde le fond et l'on adapte format, ton et longueur à chaque canal.",
          successCriterion: "Trois déclinaisons distinctes cohérentes avec chaque canal.",
        },
      ],
      exercise: {
        title: "Plan formats × canaux",
        prompt: [
          "Pour deux de vos piliers, choisissez des formats et canaux adaptés à vos personas et objectifs.",
          "Proposez un contenu de fond et 3 déclinaisons (réutilisation).",
        ],
        deliverables: ["Un tableau pilier → format → canal + un exemple de contenu décliné en 3 formats."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Les choix partent de l'audience et de l'objectif.",
        "La réutilisation adapte réellement le contenu (pas de copier-coller).",
        "L'adéquation audience-format-canal est justifiée.",
      ],
      resources: ["Grille formats × canaux (ressource interne)"],
      glossary: [{ term: "Page de destination", definition: "Page conçue pour une action précise (inscription, achat)." }],
      summary:
        "Le bon format sur le bon canal découle de l'audience et de l'objectif ; réutiliser un contenu de fond en l'adaptant démultiplie la portée sans épuiser les ressources.",
      selfAssessment: [
        "Mes choix partent-ils de l'audience et de l'objectif ?",
        "Ma réutilisation adapte-t-elle vraiment le contenu à chaque canal ?",
      ],
      quiz: { id: "mkt-v2-m3-l7-qz", questionIds: ["mkt-v2-m3-q15", "mkt-v2-m3-q11"], passThreshold: 70 },
      keyTakeaways: [
        "Audience et objectif avant le format tendance.",
        "Le bon canal est celui où se trouve le persona.",
        "Réutiliser = adapter, pas dupliquer.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt à construire le calendrier éditorial (leçon 8.4)." },
        { condition: "score < 70", message: "Revoyez l'adéquation audience-format-canal et la réutilisation." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 8.4.",
    },
    {
      id: "mkt-v2-m3-l8",
      module: 3,
      week: 8,
      title: "Construire un calendrier éditorial",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Une bonne stratégie sans planification reste un vœu. Le calendrier éditorial transforme les piliers en un plan concret et gouvernable de publication.",
      objectives: [
        "Planifier objectifs, fréquence et saisonnalité",
        "Organiser production, validation et publication (gouvernance)",
        "Prévoir le recyclage et la mesure",
        "Construire un calendrier sur 30 jours exploitable",
      ],
      competencies: ["C9"],
      prerequisites: ["Leçons 8.1 à 8.3"],
      sections: [
        {
          heading: "Objectifs, fréquence, saisonnalité",
          body: [
            "Le calendrier part d'objectifs mensuels (ex. notoriété ce mois-ci, conversion le suivant) et d'une fréquence réaliste (mieux vaut tenir un rythme modeste que promettre un rythme intenable). On intègre la saisonnalité, les campagnes et les dates importantes du secteur.",
          ],
        },
        {
          heading: "Gouvernance éditoriale",
          body: [
            "Chaque contenu passe par des étapes : idée, production, validation, publication, puis mesure. On attribue des responsabilités et un statut (à faire, en cours, validé, publié). Cette gouvernance évite les oublis, les doublons et les publications non relues.",
          ],
        },
        {
          heading: "Recyclage et mesure",
          body: [
            "Un bon calendrier prévoit le recyclage (réutiliser et rafraîchir les contenus performants) et la mesure (quels contenus atteignent leur objectif ?). Mesurer nourrit les décisions du mois suivant : on amplifie ce qui fonctionne, on ajuste le reste.",
          ],
        },
        {
          heading: "Calendriers hebdomadaire et mensuel",
          body: [
            "On combine une vue mensuelle (thèmes, campagnes, objectifs) et une vue hebdomadaire (contenus précis, formats, canaux, responsables, dates). La gestion des ressources (temps, budget, personnes) garde le plan réaliste et tenable dans la durée.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Calendrier éditorial", definition: "Plan organisant quoi publier, où, quand, par qui et pour quel objectif." },
        { term: "Gouvernance éditoriale", definition: "Règles de responsabilité, statut et validation des contenus." },
        { term: "Recyclage", definition: "Réutilisation et rafraîchissement de contenus performants." },
      ],
      examples: [
        "Vue mensuelle : « octobre = considération, thème facturation ». Vue hebdo : lundi carrousel, jeudi courriel.",
        "Statut de production : « en révision » évite la publication d'un contenu non relu.",
      ],
      commonError: {
        title: "Promettre un rythme intenable",
        body:
          "Annoncer une publication quotidienne puis abandonner nuit plus qu'un rythme modeste et régulier. Calibrer la fréquence sur les ressources réelles.",
      },
      vigilancePoint: {
        title: "Rien ne se publie sans validation",
        body:
          "Un contenu non relu peut contenir des erreurs, des promesses trompeuses ou des données non vérifiées. Le statut « validé » est un garde-fou obligatoire.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Studio Lumen (services, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "Le studio fictif Lumen publiait par à-coups, sans plan ni relecture. Résultat : périodes de silence, puis contenus précipités avec des erreurs.",
          "En adoptant un calendrier mensuel (objectifs, thèmes) et hebdomadaire (contenus, responsables, statuts, validation), le studio a stabilisé sa présence, éliminé les publications non relues et pu mesurer ce qui fonctionnait. La gouvernance éditoriale a transformé l'irrégularité en régularité fiable.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l8-ia1",
          title: "Compléter un calendrier éditorial",
          objective: "Organiser des contenus dans un calendrier hebdomadaire cohérent.",
          instructions: [
            "Répartissez sur une semaine : 1 vidéo courte (découverte), 1 étude de cas (décision), 1 courriel (fidélisation). Indiquez le jour, le canal et le statut initial.",
          ],
          answerKey: [
            "Exemple : mardi — vidéo courte, réseau visuel, statut « à produire » ; jeudi — étude de cas, site, statut « en révision » ; vendredi — courriel, statut « validé ». L'ordre suit les objectifs et les ressources.",
          ],
          feedback: "Un calendrier associe contenu, jour, canal, objectif et statut de validation.",
          successCriterion: "Les 3 contenus placés avec jour, canal et statut cohérents.",
        },
      ],
      exercise: {
        title: "Plan éditorial sur 30 jours",
        prompt: [
          "Construisez un calendrier de 30 jours à partir de vos piliers, personas et parcours.",
          "Incluez : objectifs, personas ciblés, étapes, piliers, thèmes, plateformes, formats, dates, responsables, appels à l'action, indicateurs, statut, méthode de réutilisation.",
        ],
        deliverables: ["Le PLAN ÉDITORIAL SUR 30 JOURS complet (vue mensuelle + détail hebdomadaire)."],
        estimatedMinutes: 90,
      },
      successCriteria: [
        "Le calendrier relie chaque contenu à un objectif, une étape et un persona.",
        "La gouvernance (responsable, statut, validation) est présente.",
        "La fréquence est réaliste et la réutilisation prévue.",
      ],
      resources: ["Gabarit calendrier éditorial 30 jours (ressource interne)"],
      glossary: [{ term: "Fréquence", definition: "Rythme de publication tenable dans la durée." }],
      summary:
        "Le calendrier éditorial rend la stratégie exécutable : objectifs, fréquence réaliste, gouvernance (responsables, statuts, validation), recyclage et mesure.",
      selfAssessment: [
        "Mon calendrier est-il réaliste et gouverné (statuts, validation) ?",
        "Chaque contenu est-il relié à un objectif et un persona ?",
      ],
      quiz: { id: "mkt-v2-m3-l8-qz", questionIds: ["mkt-v2-m3-q16", "mkt-v2-m3-q12"], passThreshold: 70 },
      keyTakeaways: [
        "Un rythme modeste et tenu vaut mieux qu'un rythme intenable.",
        "La gouvernance (statut, validation) évite les publications non relues.",
        "Mesurer nourrit les décisions du mois suivant.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Semaine 8 maîtrisée. Passez au copywriting et au storytelling (semaine 9)." },
        { condition: "score < 70", message: "Revoyez la gouvernance éditoriale et la fréquence réaliste." },
      ],
      progressionRule: "Compléter les 4 leçons de la semaine 8 + le quiz hebdomadaire avant la semaine 9.",
    },

    // ══════════ SEMAINE 9 — COPYWRITING, STORYTELLING ET PRODUCTION ASSISTÉE PAR L'IA ══════════
    {
      id: "mkt-v2-m3-l9",
      module: 3,
      week: 9,
      title: "Principes du copywriting professionnel",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Le copywriting est l'art d'écrire pour faire agir, avec clarté et honnêteté. Cette leçon présente ses principes, des structures éprouvées et les limites éthiques à ne jamais franchir.",
      objectives: [
        "Appliquer clarté, concision, bénéfice, preuve et spécificité",
        "Utiliser des structures (AIDA, PAS, BAB) à bon escient",
        "Rédiger titres, accroches et appels à l'action efficaces",
        "Éviter la surpromesse et respecter la conformité et la transparence",
      ],
      competencies: ["C10"],
      prerequisites: ["Plateforme de marque (S7) + voix/ton (7.3)"],
      sections: [
        {
          heading: "Les principes de base",
          body: [
            "Un bon texte est clair (compréhensible du premier coup), concis (chaque mot compte), centré sur le bénéfice (ce que le lecteur y gagne), appuyé par une preuve, spécifique (chiffres et faits plutôt que généralités) et crédible. L'urgence, quand elle existe, doit être réelle et éthique — jamais fabriquée pour manipuler.",
          ],
        },
        {
          heading: "Des structures éprouvées",
          body: [
            "AIDA (Attention, Intérêt, Désir, Action) guide un message du crochet à l'action. PAS (Problème, Agitation, Solution) part de la douleur du lecteur. BAB (Before, After, Bridge : avant, après, pont) montre la transformation. Ces structures sont des échafaudages, pas des formules magiques : on les adapte à la voix de la marque.",
          ],
        },
        {
          heading: "Titres, accroches, appels à l'action",
          body: [
            "Le titre décide si le reste est lu : il promet un bénéfice clair. L'accroche maintient l'attention. L'appel à l'action (CTA) indique l'étape suivante de façon précise (« Réservez votre essai gratuit »), sans pression trompeuse. Le microcopy (petits textes d'interface) rassure aux moments clés (« sans carte requise »).",
          ],
        },
        {
          heading: "Éthique : ni surpromesse ni tromperie",
          body: [
            "La surpromesse (« résultats garantis », « devenez riche ») détruit la confiance et expose juridiquement. On ne promet pas de revenu ni d'emploi garanti, on n'invente pas de rareté, on ne cache pas les conditions. La transparence (prix, conditions, limites) et la conformité (règles de publicité, mentions) font partie du professionnalisme.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "AIDA / PAS / BAB", definition: "Structures de rédaction persuasive (attention→action ; problème→solution ; avant→après→pont)." },
        { term: "Appel à l'action (CTA)", definition: "Instruction précise indiquant l'étape suivante." },
        { term: "Microcopy", definition: "Petits textes d'interface qui rassurent et guident." },
      ],
      examples: [
        "CTA honnête : « Essayez 14 jours, sans carte ». CTA trompeur à éviter : « Dernière chance, offre qui disparaît ! » (fausse urgence).",
        "PAS : problème (factures en retard) → agitation (stress fiscal) → solution (automatisation).",
      ],
      commonError: {
        title: "La surpromesse",
        body:
          "« Résultats garantis » ou « revenus assurés » attirent à court terme mais détruisent la crédibilité et peuvent être illégaux. Promettre seulement ce qui est vrai et prouvable.",
      },
      vigilancePoint: {
        title: "Transparence et conformité",
        body:
          "Toute affirmation chiffrée doit être vérifiable et qualifiée ; les conditions et limites doivent être visibles. Aucune promesse de revenu ou d'emploi garanti.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Néva Cosmétiques (e-commerce, Canada)",
        region: "canadienne",
        isFictional: true,
        body: [
          "La marque fictive Néva utilisait des accroches à surpromesse (« peau parfaite en 3 jours, garanti »). Ventes ponctuelles, retours et méfiance ensuite.",
          "En passant à un copywriting honnête (bénéfice réel, preuve d'ingrédients, CTA clair « essayez 30 jours, satisfait ou remboursé »), Néva a réduit les retours et gagné la confiance durable. Un message vrai convertit moins vite mais fidélise mieux — et respecte la loi.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l9-ia1",
          title: "Améliorer une accroche",
          objective: "Transformer une accroche vague/trompeuse en accroche claire et honnête.",
          instructions: [
            "Améliorez : « La meilleure solution du marché, résultats garantis ! » pour un logiciel de facturation.",
          ],
          answerKey: [
            "Exemple : « Émettez vos factures conformes en 2 minutes — essayez 14 jours, sans carte. » Bénéfice concret, preuve implicite, CTA honnête.",
          ],
          feedback: "On remplace le superlatif et la garantie trompeuse par un bénéfice concret et un CTA vrai.",
          successCriterion: "Accroche claire, spécifique, sans surpromesse.",
        },
        {
          id: "mkt-v2-m3-l9-ia2",
          title: "Identifier une promesse trompeuse",
          objective: "Repérer une surpromesse non conforme.",
          instructions: [
            "Laquelle est trompeuse ? (a) « Formez-vous à votre rythme » ; (b) « Emploi garanti à la fin » ; (c) « Certificat de réussite délivré selon les critères ».",
          ],
          answerKey: ["(b) — « emploi garanti » est une promesse trompeuse interdite."],
          feedback: "Aucune promesse d'emploi ou de revenu garanti ; les affirmations doivent être vraies et qualifiées.",
          successCriterion: "(b) identifiée comme trompeuse.",
        },
      ],
      exercise: {
        title: "Rédiger un bloc de vente honnête",
        prompt: [
          "Rédigez, avec la structure PAS ou AIDA, un court bloc de vente pour votre offre (titre + accroche + 2 bénéfices prouvés + CTA).",
          "Vérifiez l'absence de surpromesse et la présence des conditions clés.",
        ],
        deliverables: ["Un bloc de vente (titre, accroche, bénéfices prouvés, CTA) conforme et transparent."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le texte est clair, spécifique et centré sur le bénéfice.",
        "Le CTA est précis et honnête.",
        "Aucune surpromesse ; conditions clés visibles.",
      ],
      resources: ["Aide-mémoire structures AIDA/PAS/BAB (ressource interne)"],
      glossary: [{ term: "Surpromesse", definition: "Promesse exagérée ou non tenable, souvent trompeuse et non conforme." }],
      summary:
        "Le copywriting fait agir par la clarté, le bénéfice et la preuve, avec des structures éprouvées — et sans jamais surpromettre : transparence et conformité d'abord.",
      selfAssessment: [
        "Mon texte est-il clair, spécifique et honnête ?",
        "Mon CTA guide-t-il sans pression trompeuse ?",
      ],
      quiz: { id: "mkt-v2-m3-l9-qz", questionIds: ["mkt-v2-m3-q17", "mkt-v2-m3-q18"], passThreshold: 70 },
      keyTakeaways: [
        "Clarté + bénéfice + preuve + spécificité = copywriting efficace.",
        "AIDA/PAS/BAB sont des échafaudages, pas des recettes magiques.",
        "Jamais de surpromesse ni de revenu/emploi garanti ; transparence obligatoire.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour le storytelling de marque (leçon 9.2)." },
        { condition: "score < 70", message: "Revoyez les principes du copywriting et les limites éthiques." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 9.2.",
    },
    {
      id: "mkt-v2-m3-l10",
      module: 3,
      week: 9,
      title: "Storytelling de marque",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Les faits informent, les histoires font ressentir et retenir. Le storytelling de marque met le client au centre du récit et positionne la marque comme guide — dans le respect de la vérité et de la vie privée.",
      objectives: [
        "Structurer un récit (situation, problème, tension, transformation, résolution)",
        "Placer le client comme protagoniste et la marque comme guide",
        "Utiliser histoire fondatrice, études de cas et témoignages authentiques",
        "Respecter la vérité, le consentement et la vie privée",
      ],
      competencies: ["C10"],
      prerequisites: ["Leçon 9.1 — copywriting"],
      sections: [
        {
          heading: "La structure du récit",
          body: [
            "Un récit efficace suit un arc : une situation initiale, un problème qui rompt l'équilibre, une tension (les enjeux), une transformation (l'action et le changement), puis une résolution. Cet arc crée l'attention et l'émotion que les faits seuls ne produisent pas.",
          ],
        },
        {
          heading: "Le client héros, la marque guide",
          body: [
            "L'erreur fréquente est de faire de la marque le héros qui se vante. Le storytelling efficace fait du client le protagoniste : c'est lui qui a un problème et qui se transforme ; la marque est le guide qui l'aide. Le lecteur se reconnaît dans le héros, pas dans le fournisseur.",
          ],
        },
        {
          heading: "Histoire fondatrice, cas, témoignages",
          body: [
            "L'histoire fondatrice raconte le « pourquoi » de la marque de façon humaine. Les études de cas montrent une transformation concrète. Les témoignages authentiques (obtenus avec consentement) apportent une preuve sociale crédible. Chacun doit être vrai : un récit inventé présenté comme réel trahit la confiance et peut être illégal.",
          ],
        },
        {
          heading: "Vérité, consentement, vie privée",
          body: [
            "On n'invente jamais de témoignage ni de client. Les exemples pédagogiques ou fictifs sont clairement étiquetés comme tels. On obtient le consentement avant de raconter l'histoire d'un vrai client et on respecte sa vie privée (anonymisation si demandé). Un exemple illustratif doit porter la mention : « Exemple illustratif — à remplacer par un témoignage authentique obtenu avec consentement ».",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Storytelling de marque", definition: "Communication par le récit, centrée sur le client-héros et la marque-guide." },
        { term: "Histoire fondatrice", definition: "Récit humain du « pourquoi » de la marque." },
        { term: "Témoignage authentique", definition: "Récit réel d'un client, obtenu avec consentement." },
      ],
      examples: [
        "Client héros : « Karim, débordé par sa comptabilité (situation/problème)… retrouve sa sérénité (transformation) grâce à un outil-guide. » — récit illustratif à personnaliser.",
        "Exemple illustratif — à remplacer par un témoignage authentique obtenu avec consentement.",
      ],
      commonError: {
        title: "La marque qui se prend pour le héros",
        body:
          "Un récit centré sur « nous, notre grandeur » n'engage personne. Le héros est le client ; la marque est le guide qui l'aide à réussir.",
      },
      vigilancePoint: {
        title: "Jamais de faux témoignage",
        body:
          "Aucun témoignage inventé présenté comme réel ; aucune citation attribuée à une personne inexistante. Les exemples fictifs sont étiquetés « Étude de cas pédagogique fictive » ou « Exemple illustratif ».",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Racine & Sol (organisme, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "L'organisme fictif Racine & Sol communiquait par listes de services, sans émotion ni récit. Peu d'adhésion.",
          "En racontant le parcours (fictif, étiqueté) d'un nouvel arrivant — situation, obstacles, accompagnement, premier emploi — avec le candidat comme héros et l'organisme comme guide, la communication a gagné en résonance. Les vrais témoignages, eux, ont été recueillis ensuite avec consentement. Le récit, honnête, a fait ce que les listes ne faisaient pas.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l10-ia1",
          title: "Vérifier l'authenticité d'un témoignage",
          objective: "Distinguer un témoignage utilisable d'un contenu non conforme.",
          instructions: [
            "Lequel est conforme ? (a) une citation inventée signée d'un faux nom présentée comme réelle ; (b) un exemple étiqueté « Exemple illustratif — à remplacer par un témoignage authentique » ; (c) un vrai avis publié avec le consentement du client.",
          ],
          answerKey: ["(b) et (c) sont conformes ; (a) est un faux témoignage interdit."],
          feedback: "Soit c'est réel avec consentement, soit c'est clairement étiqueté comme illustratif ; jamais d'invention présentée comme réelle.",
          successCriterion: "(a) rejetée, (b) et (c) acceptées.",
        },
      ],
      exercise: {
        title: "Écrire un récit de marque",
        prompt: [
          "Rédigez un court récit de marque avec le client comme héros et votre marque comme guide (situation, problème, transformation, résolution).",
          "Si vous utilisez un exemple non réel, étiquetez-le clairement.",
        ],
        deliverables: ["Un récit de marque (client-héros / marque-guide), avec étiquetage correct de tout exemple fictif."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le client est le héros, la marque le guide.",
        "Le récit suit un arc clair.",
        "Tout exemple fictif est étiqueté ; aucun faux témoignage réel.",
      ],
      resources: ["Gabarit d'arc narratif (ressource interne)"],
      glossary: [{ term: "Preuve sociale", definition: "Influence rassurante des expériences d'autres clients (avis, témoignages)." }],
      summary:
        "Le storytelling met le client-héros au centre et la marque en guide, suit un arc narratif, et reste strictement véridique : consentement, vie privée et étiquetage des exemples fictifs.",
      selfAssessment: [
        "Mon récit fait-il du client le héros ?",
        "Ai-je étiqueté tout exemple fictif et évité tout faux témoignage ?",
      ],
      quiz: { id: "mkt-v2-m3-l10-qz", questionIds: ["mkt-v2-m3-q18", "mkt-v2-m3-q17"], passThreshold: 70 },
      keyTakeaways: [
        "Client héros, marque guide.",
        "Un récit suit un arc : situation, problème, tension, transformation, résolution.",
        "Vérité absolue : jamais de faux témoignage ; exemples fictifs étiquetés.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour l'adaptation multiplateforme (leçon 9.3)." },
        { condition: "score < 70", message: "Revoyez l'arc narratif et les règles d'authenticité." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 9.3.",
    },
    {
      id: "mkt-v2-m3-l11",
      module: 3,
      week: 9,
      title: "Adapter un message aux plateformes",
      authored: true,
      durationMinutes: 90,
      introduction:
        "Chaque plateforme a ses codes, son audience et son rythme. Cette leçon apprend à adapter un même message sans le copier-coller mécaniquement, en préservant sa cohérence.",
      objectives: [
        "Connaître les codes des principales plateformes",
        "Adapter longueur, langage, rythme et visuel au canal",
        "Préserver la cohérence du message central",
        "Éviter l'adaptation mécanique (copier-coller)",
      ],
      competencies: ["C10"],
      prerequisites: ["Leçons 9.1-9.2 ; formats/canaux (8.3)"],
      sections: [
        {
          heading: "Des codes différents",
          body: [
            "Un réseau visuel privilégie l'image et la vidéo courte, un ton spontané ; une plateforme professionnelle valorise l'analyse et l'expertise ; la vidéo courte mise sur l'accroche immédiate ; le courriel permet la personnalisation et la relation directe ; le site et la page de destination visent l'action. Chaque canal impose des contraintes de format et de longueur.",
          ],
        },
        {
          heading: "Ce qui s'adapte",
          body: [
            "On ajuste la longueur (courte sur les réseaux, développée sur un article), le langage (plus familier ou plus expert), le rythme (accroche rapide vs déroulé posé), le visuel (vertical, horizontal, carrousel), et les éléments propres au canal (hashtags, référencement, objet de courriel). Ce qui NE change pas : le message central et la voix de marque.",
          ],
        },
        {
          heading: "Cohérence sans uniformité",
          body: [
            "Adapter n'est pas trahir : le fond, la promesse et la voix restent constants d'un canal à l'autre, même si la forme varie. À l'inverse, publier le même texte partout ignore les audiences et affaiblit l'impact. L'objectif est la cohérence dans la diversité des formes.",
          ],
        },
        {
          heading: "Éviter l'adaptation mécanique",
          body: [
            "Recopier un texte long dans un format court, ou tronquer sans repenser, produit un contenu inadapté. On repense chaque déclinaison à partir de l'audience du canal et de l'objectif, tout en gardant le message et la voix. C'est un travail d'adaptation, pas de duplication.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Codes de plateforme", definition: "Conventions de format, ton et rythme propres à chaque canal." },
        { term: "Message central", definition: "Idée et promesse constantes, préservées quel que soit le canal." },
      ],
      examples: [
        "Un même lancement : accroche vidéo verticale (réseau), analyse posée (plateforme pro), courriel personnalisé — même promesse, formes différentes.",
        "Objet de courriel spécifique + hashtags pertinents : éléments propres au canal.",
      ],
      commonError: {
        title: "Le copier-coller multiplateforme",
        body:
          "Le même texte identique partout ignore les codes et audiences. Chaque canal mérite une déclinaison repensée, pas une copie.",
      },
      vigilancePoint: {
        title: "Cohérence de la promesse",
        body:
          "Adapter la forme ne doit jamais modifier la promesse ni la voix ; sinon la marque devient incohérente d'un canal à l'autre.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — Boréalille (détail, Québec)",
        region: "québécoise",
        isFictional: true,
        body: [
          "La boutique fictive Boréalille copiait-collait ses annonces à l'identique sur tous ses canaux. Sur le réseau visuel, les textes étaient trop longs ; sur la plateforme pro, trop familiers.",
          "En repensant chaque déclinaison (accroche visuelle courte d'un côté, analyse posée de l'autre, courriel personnalisé) tout en gardant la même promesse et la même voix, Boréalille a amélioré l'engagement sur chaque canal. L'adaptation cohérente a battu le copier-coller.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l11-ia1",
          title: "Adapter un contenu pour trois plateformes",
          objective: "Décliner un message central sur trois canaux en préservant la voix.",
          instructions: [
            "Message central : « Notre essai gratuit de 14 jours facilite votre première facture. » Déclinez-le pour un réseau visuel, une plateforme professionnelle et un courriel (indiquez ce qui change).",
          ],
          answerKey: [
            "Réseau visuel : accroche courte + visuel, ton enjoué. Plateforme pro : bénéfice + preuve, ton expert. Courriel : objet personnalisé + CTA clair. Promesse et voix identiques ; forme adaptée.",
          ],
          feedback: "La promesse et la voix restent ; longueur, ton et format changent selon le canal.",
          successCriterion: "Trois déclinaisons cohérentes préservant le message central.",
        },
      ],
      exercise: {
        title: "Kit multicanal d'un message",
        prompt: [
          "Choisissez un message central issu de votre plateforme de marque.",
          "Produisez 3 déclinaisons (3 canaux) en précisant longueur, ton, visuel et éléments propres au canal.",
        ],
        deliverables: ["Un kit de 3 déclinaisons d'un même message, cohérentes en promesse et en voix."],
        estimatedMinutes: 60,
      },
      successCriteria: [
        "Le message central et la voix sont préservés partout.",
        "Chaque déclinaison respecte les codes de son canal.",
        "Aucune déclinaison n'est un simple copier-coller.",
      ],
      resources: ["Grille d'adaptation multicanale (ressource interne)"],
      glossary: [{ term: "Déclinaison", definition: "Version d'un message adaptée à un canal spécifique." }],
      summary:
        "Adapter un message, c'est ajuster forme, longueur et ton aux codes de chaque canal tout en préservant la promesse et la voix : cohérence dans la diversité, jamais de copier-coller.",
      selfAssessment: [
        "Mes déclinaisons gardent-elles la même promesse et la même voix ?",
        "Chaque version respecte-t-elle les codes de son canal ?",
      ],
      quiz: { id: "mkt-v2-m3-l11-qz", questionIds: ["mkt-v2-m3-q15", "mkt-v2-m3-q05"], passThreshold: 70 },
      keyTakeaways: [
        "Le message central et la voix restent constants ; la forme s'adapte.",
        "Chaque canal a ses codes (longueur, ton, visuel).",
        "Adapter ≠ copier-coller.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Prêt pour l'IA et le contrôle éditorial (leçon 9.4)." },
        { condition: "score < 70", message: "Revoyez l'adaptation aux codes de plateforme sans perte de cohérence." },
      ],
      progressionRule: "Quiz formatif conseillé ≥ 70 % avant la leçon 9.4.",
    },
    {
      id: "mkt-v2-m3-l12",
      module: 3,
      week: 9,
      title: "Intelligence artificielle et contrôle éditorial",
      authored: true,
      durationMinutes: 90,
      introduction:
        "L'IA peut accélérer la production de contenu, mais elle ne remplace ni le jugement ni la responsabilité humaine. Cette leçon encadre son usage par une politique claire et une checklist de validation avant publication.",
      objectives: [
        "Identifier les usages utiles de l'IA (idéation, structuration, reformulation, variantes)",
        "Reconnaître les risques (hallucinations, biais, droit d'auteur, confidentialité)",
        "Appliquer un contrôle humain systématique et la vérification des faits",
        "Adopter une politique d'utilisation de l'IA et une checklist éditoriale",
      ],
      competencies: ["C10"],
      prerequisites: ["Leçons 9.1 à 9.3"],
      sections: [
        {
          heading: "Ce que l'IA fait bien (avec supervision)",
          body: [
            "L'IA aide à l'idéation (générer des angles), à la recherche assistée (dégrossir un sujet), à la structuration (plans), à la reformulation, à la personnalisation, à la production de variantes et à la traduction assistée. Ce sont des accélérateurs : le résultat est un brouillon à vérifier, jamais une publication automatique.",
          ],
        },
        {
          heading: "Les risques à connaître",
          body: [
            "L'IA peut halluciner (inventer des faits, des chiffres, des sources plausibles mais faux), reproduire des biais, produire du contenu non original ou proche d'œuvres protégées (droit d'auteur), et exposer des données si on lui confie des informations confidentielles ou personnelles. Ignorer ces risques mène à publier des erreurs sous une belle forme.",
          ],
        },
        {
          heading: "Contrôle humain et vérification",
          body: [
            "Toute production assistée par IA passe par un contrôle humain : vérification des faits et des chiffres (avec sources), contrôle de la cohérence avec la voix de marque, de l'accessibilité, de l'exactitude et de l'absence de promesse trompeuse. La responsabilité reste entièrement humaine : l'IA n'est pas une excuse pour une erreur publiée.",
          ],
        },
        {
          heading: "Politique d'utilisation de l'IA (pédagogique)",
          body: [
            "Usages autorisés : idéation, plan, reformulation, variantes, traduction assistée — toujours relus. Usages nécessitant déclaration/citation : contenu substantiellement généré, traductions. Usages interdits : publier sans vérification, confier des données personnelles/confidentielles à un outil non maîtrisé, présenter un contenu IA comme un témoignage humain réel, plagier. Principes : protection des données, vérification des faits, conservation des sources, originalité, transparence, responsabilité de l'auteur. Le module fonctionne sans aucune clé d'API IA payante : ces principes s'appliquent quel que soit l'outil.",
          ],
        },
      ],
      content: [],
      definitions: [
        { term: "Hallucination (IA)", definition: "Production d'un contenu faux mais présenté avec assurance (faits, chiffres, sources inventés)." },
        { term: "Contrôle éditorial", definition: "Vérification humaine (faits, voix, conformité) avant toute publication." },
        { term: "Politique d'utilisation de l'IA", definition: "Règles d'usages autorisés, à déclarer et interdits, avec protection des données." },
      ],
      examples: [
        "L'IA propose une statistique « 73 % des PME… » sans source : on la vérifie ou on la retire.",
        "Traduction assistée d'un contenu FR → EN : marquée « pending », relue avant d'être « validated ».",
      ],
      commonError: {
        title: "Publier un texte IA sans vérifier",
        body:
          "Copier une sortie d'IA telle quelle expose à des faits inventés, des biais et des problèmes de droit d'auteur. Le contrôle humain est non négociable.",
      },
      vigilancePoint: {
        title: "Données, faits, transparence",
        body:
          "Ne jamais confier de données personnelles/confidentielles à un outil non maîtrisé ; vérifier chaque fait ; déclarer l'usage substantiel de l'IA ; ne jamais présenter un contenu IA comme un témoignage humain réel.",
      },
      caseStudy: {
        title: "Étude de cas pédagogique fictive — InfusiO (e-commerce, Canada)",
        region: "canadienne",
        isFictional: true,
        body: [
          "La boutique fictive InfusiO a publié une fiche produit générée par IA affirmant des « bienfaits prouvés » avec des chiffres inventés. Un client a signalé l'inexactitude ; la confiance a été entamée.",
          "En adoptant une politique IA et une checklist (vérification des faits, sources, voix de marque, conformité, absence de promesse trompeuse), InfusiO a continué d'utiliser l'IA comme accélérateur, mais chaque contenu est désormais relu et vérifié avant publication. L'IA encadrée aide ; l'IA non contrôlée nuit.",
        ],
      },
      interactiveActivities: [
        {
          id: "mkt-v2-m3-l12-ia1",
          title: "Détecter les erreurs d'un contenu généré par IA",
          objective: "Repérer hallucination, biais et risque de conformité dans une sortie IA.",
          instructions: [
            "Dans ce brouillon IA : « Notre thé guérit l'anxiété. 89 % des clients l'affirment (source : étude interne non publiée). Idéal pour tous. » — identifiez 3 problèmes.",
          ],
          answerKey: [
            "1) « guérit l'anxiété » = allégation santé trompeuse/non conforme ; 2) « 89 % … source non publiée » = statistique non vérifiable ; 3) « idéal pour tous » = généralisation non fondée.",
          ],
          feedback: "On vérifie chaque allégation, chaque chiffre et chaque généralisation avant publication.",
          successCriterion: "Au moins 2 des 3 problèmes identifiés.",
        },
      ],
      exercise: {
        title: "Politique IA + checklist éditoriale",
        prompt: [
          "Rédigez une courte politique d'utilisation de l'IA pour votre projet (usages autorisés, à déclarer, interdits ; données ; vérification ; responsabilité ; originalité ; multilingue).",
          "Créez une checklist de validation avant publication (faits, sources, voix, accessibilité, conformité, absence de surpromesse).",
        ],
        deliverables: ["Une politique d'utilisation de l'IA + une checklist éditoriale de validation avant publication."],
        estimatedMinutes: 75,
      },
      successCriteria: [
        "La politique distingue usages autorisés, à déclarer et interdits.",
        "La checklist couvre faits, sources, voix, conformité et surpromesse.",
        "La protection des données et la responsabilité humaine sont explicites.",
      ],
      resources: ["Gabarit politique IA + checklist éditoriale (ressource interne)"],
      glossary: [
        { term: "Biais (IA)", definition: "Distorsion systématique reproduite par un modèle (stéréotypes, angles non neutres)." },
        { term: "Vérification des faits", definition: "Contrôle de l'exactitude d'une affirmation avec des sources fiables." },
      ],
      summary:
        "L'IA est un accélérateur sous supervision : utile pour idéer, structurer, reformuler et traduire, mais soumise à un contrôle humain systématique, à une politique claire et à une checklist de validation avant publication.",
      selfAssessment: [
        "Ai-je une politique IA et une checklist de validation ?",
        "Est-ce que je vérifie systématiquement faits, sources et conformité ?",
      ],
      quiz: { id: "mkt-v2-m3-l12-qz", questionIds: ["mkt-v2-m3-q19", "mkt-v2-m3-q20"], passThreshold: 70 },
      keyTakeaways: [
        "L'IA produit des brouillons à vérifier, jamais des publications automatiques.",
        "Risques clés : hallucinations, biais, droit d'auteur, confidentialité.",
        "Contrôle humain, politique et checklist rendent l'usage responsable — sans clé d'API payante.",
      ],
      feedbackRules: [
        { condition: "score >= 70", message: "Module 3 maîtrisé. Finalisez le dossier de stratégie de marque et de communication." },
        { condition: "score < 70", message: "Revoyez les risques de l'IA et le contrôle éditorial obligatoire." },
      ],
      progressionRule:
        "Compléter les 4 leçons de la semaine 9, le quiz hebdomadaire, le sommatif du module (≥ 70 %) et déposer le dossier (projet) pour valider le Module 3.",
    },
  ],

  weeklyQuizzes: [
    {
      id: "mkt-v2-m3-week7-quiz",
      // Semaine 7 : marque, fondations, voix, plateforme (8 questions M3)
      questionIds: [
        "mkt-v2-m3-q01",
        "mkt-v2-m3-q02",
        "mkt-v2-m3-q03",
        "mkt-v2-m3-q04",
        "mkt-v2-m3-q05",
        "mkt-v2-m3-q06",
        "mkt-v2-m3-q07",
        "mkt-v2-m3-q08",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m3-week8-quiz",
      // Semaine 8 : stratégie de contenu + calendrier (6 M3 + 2 rappels M2)
      questionIds: [
        "mkt-v2-m3-q11",
        "mkt-v2-m3-q12",
        "mkt-v2-m3-q13",
        "mkt-v2-m3-q14",
        "mkt-v2-m3-q15",
        "mkt-v2-m3-q16",
        "mkt-v2-m2-q10",
        "mkt-v2-m2-q18",
      ],
      passThreshold: 70,
    },
    {
      id: "mkt-v2-m3-week9-quiz",
      // Semaine 9 : copywriting, storytelling, IA (4 M3 + 4 rappels M1/M2)
      questionIds: [
        "mkt-v2-m3-q17",
        "mkt-v2-m3-q18",
        "mkt-v2-m3-q19",
        "mkt-v2-m3-q20",
        "mkt-v2-m3-q09",
        "mkt-v2-m3-q10",
        "mkt-v2-m2-q18",
        "mkt-v2-m1-q17",
      ],
      passThreshold: 70,
    },
  ],

  rubric: {
    id: "mkt-v2-m3-rubric",
    title: "Rubrique — Dossier de stratégie de marque et de communication numérique",
    totalPoints: 100,
    passThreshold: 60,
    criteria: [
      { label: "Cohérence avec le marché et les personas", points: 10 },
      { label: "Plateforme de marque", points: 15 },
      { label: "Voix, ton et architecture des messages", points: 10 },
      { label: "Stratégie éditoriale", points: 15 },
      { label: "Calendrier de contenu", points: 10 },
      { label: "Qualité rédactionnelle", points: 10 },
      { label: "Adaptation multicanale", points: 10 },
      { label: "Storytelling", points: 5 },
      { label: "Utilisation responsable de l'IA", points: 5 },
      { label: "Justification stratégique et présentation", points: 10 },
    ],
  },

  assessments: [
    {
      id: "mkt-v2-m3-sum",
      kind: "summative",
      title: "Sommatif Module 3 — Marque, contenu et communication (20 questions)",
      passThreshold: 70,
      weightHint: "Quiz de modules (20 %)",
    },
    {
      id: "mkt-v2-m3-tp",
      kind: "practical",
      title: "Projet Module 3 — Dossier de stratégie de marque et de communication numérique (livrable 3/7, rubrique 100 pts)",
      passThreshold: 60,
      weightHint: "Travaux pratiques (25 %)",
    },
  ],
};
