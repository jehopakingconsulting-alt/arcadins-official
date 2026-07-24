import type { Skill, Level, SkillId, LevelId, TutoratModule } from "@/types/tutorat";

// ── Référentiel ─────────────────────────────────────────────────────────────

export const SKILLS: Skill[] = [
  { id: "comprehension-ecrite", labelFr: "Compréhension écrite", abbr: "CE", icon: "📖" },
  { id: "comprehension-orale", labelFr: "Compréhension orale", abbr: "CO", icon: "🎧" },
  { id: "expression-ecrite", labelFr: "Expression écrite", abbr: "EE", icon: "✍️" },
  { id: "expression-orale", labelFr: "Expression orale", abbr: "EO", icon: "🗣️" },
];

export const LEVELS: Level[] = [
  { id: "fondation", labelFr: "Fondation", cefr: "A1–A2", clb: "CLB / NCLC 1–4" },
  { id: "intermediaire", labelFr: "Intermédiaire", cefr: "B1", clb: "CLB / NCLC 5–6" },
  { id: "avance", labelFr: "Avancé", cefr: "B2", clb: "CLB / NCLC 7–8" },
  { id: "superieur", labelFr: "Supérieur", cefr: "C1–C2", clb: "CLB / NCLC 9–12" },
];

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}
export function getLevel(id: string): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}

// ── Modules (4 compétences × 4 niveaux = 16) ────────────────────────────────

const MODULES: TutoratModule[] = [
  // ─────────────────── COMPRÉHENSION ÉCRITE ───────────────────
  {
    skill: "comprehension-ecrite", level: "fondation",
    summary: "Décoder des messages courts et des documents de la vie quotidienne : panneaux, courriels simples, petites annonces, horaires.",
    objectives: [
      "Repérer l'information explicite d'un texte court (qui, quoi, où, quand).",
      "Comprendre des consignes et des instructions simples.",
      "Identifier le sens général d'un message même sans connaître tous les mots.",
      "Reconnaître les mots-outils fréquents (mais, donc, parce que, avant, après).",
    ],
    strategies: [
      "Lire la question avant le texte pour savoir quoi chercher.",
      "Surligner les mots-clés de la consigne et les retrouver dans le document.",
      "S'appuyer sur le contexte et les images pour lever un doute de vocabulaire.",
      "Éliminer les réponses manifestement fausses avant de trancher.",
    ],
    focus: [
      "Confusion entre des mots proches (à / a, ou / où, son / sont).",
      "Tendance à vouloir tout comprendre au lieu de cibler l'information utile.",
    ],
    sampleTask: {
      title: "Lire une petite annonce",
      body: [
        "Vous lisez : « Studio meublé à louer, 650 $/mois, proche du métro, disponible le 1er juin. Non-fumeur. Contacter Marie au 514-555-0198. »",
        "Questions type : Quel est le prix ? À partir de quand peut-on emménager ? Que faut-il faire pour visiter ?",
      ],
    },
    tips: [
      "Lisez chaque jour un texte court en français (annonce, menu, notice).",
      "Tenez un carnet des 10 mots nouveaux les plus utiles de la semaine.",
      "Chronométrez-vous doucement : d'abord comprendre, ensuite accélérer.",
    ],
  },
  {
    skill: "comprehension-ecrite", level: "intermediaire",
    summary: "Comprendre des articles courants, des courriels professionnels et des textes informatifs en dégageant l'idée principale et les détails.",
    objectives: [
      "Distinguer l'idée principale des idées secondaires d'un paragraphe.",
      "Comprendre l'enchaînement logique d'un texte (cause, conséquence, opposition).",
      "Inférer le sens d'un mot inconnu à partir du contexte.",
      "Repérer le point de vue ou l'intention de l'auteur.",
    ],
    strategies: [
      "Lecture en deux temps : survol (titres, structure) puis lecture ciblée.",
      "Repérer les connecteurs logiques pour suivre le raisonnement.",
      "Reformuler mentalement chaque paragraphe en une phrase.",
      "Se méfier des pièges de reformulation : le mot exact du texte n'est pas toujours la bonne réponse.",
    ],
    focus: [
      "Se laisser piéger par un synonyme placé dans une réponse fausse.",
      "Gestion du temps sur les textes longs.",
    ],
    sampleTask: {
      title: "Article d'information",
      body: [
        "À partir d'un court article (200–300 mots) sur un sujet de société, identifiez : le thème, la position de l'auteur, deux arguments avancés.",
        "Puis répondez à des questions à choix multiple sur des détails précis (chiffres, dates, causes).",
      ],
    },
    tips: [
      "Lisez un article de presse francophone par jour (Radio-Canada, La Presse).",
      "Après lecture, résumez le texte en 3 phrases sans le regarder.",
      "Notez les connecteurs logiques rencontrés et leur fonction.",
    ],
  },
  {
    skill: "comprehension-ecrite", level: "avance",
    summary: "Traiter des textes argumentatifs et spécialisés, saisir les nuances, l'implicite et le ton, sous contrainte de temps.",
    objectives: [
      "Analyser une argumentation complexe et ses présupposés.",
      "Comprendre l'implicite, l'ironie et les sous-entendus.",
      "Comparer les points de vue de plusieurs sources sur un même sujet.",
      "Repérer les nuances de registre et de modalité (certitude, doute, obligation).",
    ],
    strategies: [
      "Cartographier l'argumentation : thèse, arguments, objections, réfutations.",
      "Prêter attention aux marqueurs de modalisation (il semble, sans doute, il est certain).",
      "Anticiper les distracteurs conçus pour ressembler à la bonne réponse.",
      "Gérer un budget-temps strict par question pour ne pas s'enliser.",
    ],
    focus: [
      "Confondre l'opinion de l'auteur avec une opinion qu'il rapporte pour la critiquer.",
      "Sur-interpréter un texte au-delà de ce qui est écrit.",
    ],
    sampleTask: {
      title: "Texte d'opinion nuancé",
      body: [
        "Lisez une tribune où l'auteur défend une position tout en concédant certaines objections.",
        "Distinguez ce qu'il affirme, ce qu'il concède et ce qu'il rejette ; identifiez le ton (critique, ironique, mesuré).",
      ],
    },
    tips: [
      "Lisez des éditoriaux et des chroniques d'opinion, pas seulement des faits divers.",
      "Entraînez-vous à repérer l'implicite : « que veut vraiment dire l'auteur ? ».",
      "Travaillez sous chronomètre pour reproduire la pression de l'examen.",
    ],
  },
  {
    skill: "comprehension-ecrite", level: "superieur",
    summary: "Lire finement des textes longs, abstraits ou littéraires, et maîtriser la précision lexicale attendue aux plus hauts niveaux CLB.",
    objectives: [
      "Comprendre des textes abstraits, techniques ou littéraires denses.",
      "Saisir les subtilités stylistiques et les effets de sens voulus par l'auteur.",
      "Synthétiser rapidement une information dispersée dans un long document.",
      "Maîtriser un vocabulaire précis et les expressions idiomatiques soutenues.",
    ],
    strategies: [
      "Lecture experte : identifier la structure macro avant d'entrer dans le détail.",
      "Travailler les familles de mots et les collocations pour lever toute ambiguïté.",
      "Distinguer les nuances entre quasi-synonymes (souvent la clé des questions difficiles).",
      "Maintenir un rythme soutenu sans sacrifier la précision.",
    ],
    focus: [
      "Fatigue de lecture sur les textes longs qui fait chuter la précision en fin d'épreuve.",
      "Négliger les nuances lexicales fines qui départagent deux réponses proches.",
    ],
    sampleTask: {
      title: "Extrait dense et abstrait",
      body: [
        "À partir d'un extrait exigeant (essai, texte scientifique de vulgarisation, page littéraire), répondez à des questions portant sur des nuances de sens et de style.",
        "Justifiez chaque réponse par un indice précis du texte.",
      ],
    },
    tips: [
      "Lisez des essais et de la littérature francophone contemporaine.",
      "Constituez un répertoire de synonymes nuancés et d'expressions idiomatiques.",
      "Simulez l'épreuve complète chronométrée une fois par semaine.",
    ],
  },

  // ─────────────────── COMPRÉHENSION ORALE ───────────────────
  {
    skill: "comprehension-orale", level: "fondation",
    summary: "Comprendre des messages oraux simples et prévisibles : annonces, consignes, échanges de la vie courante prononcés lentement.",
    objectives: [
      "Reconnaître les sons et l'intonation du français standard.",
      "Comprendre des chiffres, des heures, des prix et des dates à l'oral.",
      "Suivre des consignes simples et des indications d'itinéraire.",
      "Identifier le sujet d'une conversation courte.",
    ],
    strategies: [
      "Écouter d'abord pour le sens global, sans bloquer sur un mot manqué.",
      "Anticiper le contenu à partir de la situation (au magasin, à la gare).",
      "S'entraîner à distinguer les sons proches (u/ou, é/è, on/an).",
      "Utiliser les mots-clés entendus pour choisir la bonne réponse.",
    ],
    focus: [
      "Panique au premier mot inconnu qui fait perdre la suite du message.",
      "Confusion sur les nombres (soixante-dix, quatre-vingts).",
    ],
    sampleTask: {
      title: "Annonce en gare",
      body: [
        "Vous entendez : « Le train à destination de Montréal, départ 14 h 25, partira du quai numéro 3. »",
        "Questions : Quelle est la destination ? À quelle heure ? Quel quai ?",
      ],
    },
    tips: [
      "Écoutez de courts dialogues francophones avec transcription pour vérifier.",
      "Entraînez votre oreille aux nombres : dictez-vous des prix et des heures.",
      "Répétez à voix haute ce que vous entendez (technique du « shadowing »).",
    ],
  },
  {
    skill: "comprehension-orale", level: "intermediaire",
    summary: "Suivre des conversations, des messages et des bulletins à débit normal, et en extraire les informations principales et secondaires.",
    objectives: [
      "Comprendre l'essentiel d'un message à débit courant.",
      "Repérer des informations précises dans un flux continu.",
      "Identifier le ton et l'intention d'un locuteur (demande, refus, conseil).",
      "Comprendre différents accents francophones courants.",
    ],
    strategies: [
      "Lire les questions avant l'écoute pour orienter l'attention.",
      "Prendre des notes en abrégé (mots-clés, chiffres) pendant l'écoute.",
      "Se raccrocher aux connecteurs pour suivre la logique de l'échange.",
      "Ne pas s'arrêter sur un mot manqué : continuer et recontextualiser.",
    ],
    focus: [
      "Perte du fil quand le débit s'accélère.",
      "Difficulté avec les accents (québécois, africain, européen).",
    ],
    sampleTask: {
      title: "Message sur répondeur",
      body: [
        "Vous écoutez un message professionnel qui donne un rendez-vous, un motif et une consigne.",
        "Notez : qui appelle, pour quoi, quand, et ce qu'il faut faire en retour.",
      ],
    },
    tips: [
      "Écoutez des balados (podcasts) et la radio francophone chaque jour.",
      "Variez volontairement les accents pour habituer votre oreille.",
      "Entraînez la prise de notes rapide en écoutant sans transcription.",
    ],
  },
  {
    skill: "comprehension-orale", level: "avance",
    summary: "Comprendre des débats, des exposés et des échanges rapides comportant de l'implicite, de l'humour et des points de vue contrastés.",
    objectives: [
      "Suivre une argumentation orale et en distinguer les étapes.",
      "Comprendre l'implicite, l'humour et l'ironie à l'oral.",
      "Distinguer les points de vue de plusieurs intervenants dans un débat.",
      "Saisir les nuances de ton (réserve, insistance, désaccord poli).",
    ],
    strategies: [
      "Identifier rapidement le rôle de chaque locuteur dans un échange.",
      "Repérer les marqueurs d'accord/désaccord et de concession.",
      "Anticiper les distracteurs sonores (information vraie mais hors sujet).",
      "Maintenir la concentration sur des séquences longues.",
    ],
    focus: [
      "Confondre l'avis d'un intervenant avec celui d'un autre.",
      "Manquer l'implicite quand l'attention se focalise sur les mots.",
    ],
    sampleTask: {
      title: "Extrait de débat",
      body: [
        "Vous écoutez deux personnes qui discutent d'un sujet de société avec des positions opposées.",
        "Attribuez chaque argument au bon locuteur et identifiez sur quoi ils sont d'accord malgré leur désaccord.",
      ],
    },
    tips: [
      "Écoutez des débats et des entretiens (émissions d'actualité, tables rondes).",
      "Entraînez-vous sans support écrit pour développer la mémoire auditive.",
      "Résumez à l'oral, après écoute, la position de chaque intervenant.",
    ],
  },
  {
    skill: "comprehension-orale", level: "superieur",
    summary: "Comprendre sans effort une langue orale rapide, spécialisée ou idiomatique, y compris dans des conditions d'écoute dégradées.",
    objectives: [
      "Comprendre des exposés spécialisés et un débit rapide et naturel.",
      "Saisir les registres, les régionalismes et les expressions idiomatiques.",
      "Suivre un raisonnement complexe sur une longue durée.",
      "Comprendre malgré un bruit de fond ou une qualité sonore imparfaite.",
    ],
    strategies: [
      "Écoute globale experte : la structure d'ensemble guide la compréhension du détail.",
      "Traiter l'implicite culturel et les références idiomatiques.",
      "Gérer sa concentration sur des documents longs sans décrochage.",
      "Distinguer les nuances fines qui départagent deux options proches.",
    ],
    focus: [
      "Baisse de vigilance en fin d'épreuve sur les documents longs.",
      "Références culturelles ou idiomatiques non maîtrisées.",
    ],
    sampleTask: {
      title: "Conférence spécialisée",
      body: [
        "Vous écoutez un extrait de conférence dense, à débit soutenu, avec vocabulaire spécialisé.",
        "Répondez à des questions portant sur des nuances de position et des détails techniques.",
      ],
    },
    tips: [
      "Écoutez des conférences, documentaires et émissions culturelles exigeantes.",
      "Notez et mémorisez les expressions idiomatiques entendues.",
      "Faites des simulations complètes en conditions réelles chronométrées.",
    ],
  },

  // ─────────────────── EXPRESSION ÉCRITE ───────────────────
  {
    skill: "expression-ecrite", level: "fondation",
    summary: "Rédiger des messages courts et fonctionnels : formulaire, courriel simple, note, petite description, avec des phrases correctes.",
    objectives: [
      "Écrire des phrases simples et correctes (sujet + verbe + complément).",
      "Remplir un formulaire et rédiger un message court du quotidien.",
      "Utiliser les temps de base (présent, passé composé, futur proche).",
      "Structurer un message avec une formule d'ouverture et de clôture.",
    ],
    strategies: [
      "Faire des phrases courtes et sûres plutôt que longues et risquées.",
      "Vérifier systématiquement l'accord sujet–verbe et les accords simples.",
      "Réutiliser des formules types (Bonjour…, Merci d'avance…, Cordialement).",
      "Relire une fois pour la ponctuation, une fois pour les accords.",
    ],
    focus: [
      "Oublis d'accord (pluriel, féminin) et de la ponctuation.",
      "Traduction mot à mot depuis la langue maternelle.",
    ],
    sampleTask: {
      title: "Courriel court",
      body: [
        "Écrivez un courriel de 40 à 60 mots pour annuler un rendez-vous et en proposer un autre.",
        "Attendu : formule d'appel, motif clair, nouvelle proposition, formule de politesse.",
      ],
    },
    tips: [
      "Apprenez 5 formules de politesse par cœur et réutilisez-les.",
      "Écrivez chaque jour 3 à 5 phrases sur votre journée.",
      "Faites-vous corriger et notez vos erreurs récurrentes.",
    ],
  },
  {
    skill: "expression-ecrite", level: "intermediaire",
    summary: "Rédiger des textes structurés d'une certaine longueur : courriel argumenté, message d'opinion, compte rendu simple.",
    objectives: [
      "Organiser un texte en paragraphes cohérents (introduction, développement, conclusion).",
      "Exprimer et justifier une opinion avec des arguments.",
      "Employer des connecteurs logiques variés.",
      "Adapter le registre (formel / informel) au destinataire.",
    ],
    strategies: [
      "Faire un plan rapide avant de rédiger (1 idée = 1 paragraphe).",
      "Varier les connecteurs pour éviter les répétitions (de plus, cependant, en effet).",
      "Soigner l'accroche et la conclusion, souvent valorisées.",
      "Garder 3 minutes en fin d'épreuve pour la relecture ciblée.",
    ],
    focus: [
      "Texte qui liste des idées sans les relier logiquement.",
      "Mélange des registres (tu/vous, familier/soutenu).",
    ],
    sampleTask: {
      title: "Message d'opinion",
      body: [
        "Rédigez un texte de 120 à 150 mots pour donner votre avis sur une question (ex. : les transports en commun gratuits).",
        "Attendu : position claire, deux arguments illustrés, une conclusion.",
      ],
    },
    tips: [
      "Mémorisez une banque de connecteurs classés par fonction.",
      "Rédigez un texte argumenté par semaine et faites-le corriger.",
      "Relisez à voix basse pour repérer les phrases bancales.",
    ],
  },
  {
    skill: "expression-ecrite", level: "avance",
    summary: "Produire une argumentation nuancée et bien construite, avec un vocabulaire précis et une syntaxe maîtrisée.",
    objectives: [
      "Construire une argumentation nuancée (thèse, antithèse, synthèse).",
      "Utiliser un vocabulaire précis et varié, éviter les répétitions.",
      "Maîtriser des structures syntaxiques complexes (subordonnées, hypothèses).",
      "Adopter un ton et un registre parfaitement adaptés à la situation.",
    ],
    strategies: [
      "Nuancer avec la modalisation (il semble que, on pourrait penser que).",
      "Introduire et réfuter une objection pour montrer la profondeur du propos.",
      "Enrichir le lexique par des reformulations plutôt que des répétitions.",
      "Contrôler la cohérence des temps et la concordance.",
    ],
    focus: [
      "Argumentation à sens unique, sans prise en compte des objections.",
      "Erreurs de concordance des temps dans les phrases complexes.",
    ],
    sampleTask: {
      title: "Prise de position argumentée",
      body: [
        "Rédigez un texte de 200 à 250 mots défendant une position sur un sujet de société, en tenant compte d'une objection.",
        "Attendu : introduction cadrée, arguments hiérarchisés, concession, conclusion ouverte.",
      ],
    },
    tips: [
      "Travaillez la reformulation : dire la même idée de trois façons.",
      "Étudiez des modèles de textes argumentatifs et leur plan.",
      "Faites relire vos productions en ciblant nuance et concordance.",
    ],
  },
  {
    skill: "expression-ecrite", level: "superieur",
    summary: "Écrire avec aisance, précision et style sur des sujets complexes ou abstraits, au niveau attendu des plus hauts scores CLB.",
    objectives: [
      "Traiter par écrit des sujets abstraits ou spécialisés avec clarté.",
      "Maîtriser le style, le rythme des phrases et les effets rhétoriques.",
      "Employer un lexique riche, précis et idiomatique sans erreur.",
      "Structurer une démonstration longue et parfaitement cohérente.",
    ],
    strategies: [
      "Varier la longueur et la structure des phrases pour le rythme.",
      "Utiliser des transitions élégantes entre les parties.",
      "Choisir le mot juste plutôt que le mot approximatif.",
      "Relire en deux passes : logique d'ensemble, puis finitions stylistiques.",
    ],
    focus: [
      "Lourdeurs et répétitions qui trahissent un niveau non natif.",
      "Sur-complexification qui nuit à la clarté.",
    ],
    sampleTask: {
      title: "Essai structuré",
      body: [
        "Rédigez un essai de 250 à 300 mots sur une question abstraite (ex. : le rôle de la culture dans l'intégration).",
        "Attendu : problématique, plan argumenté, style soigné, conclusion synthétique.",
      ],
    },
    tips: [
      "Lisez des essayistes pour vous imprégner du style écrit soutenu.",
      "Retravaillez vos textes pour éliminer toute lourdeur.",
      "Faites évaluer vos essais complets en conditions d'examen.",
    ],
  },

  // ─────────────────── EXPRESSION ORALE ───────────────────
  {
    skill: "expression-orale", level: "fondation",
    summary: "Se présenter et communiquer dans des situations simples et prévisibles du quotidien, avec une prononciation compréhensible.",
    objectives: [
      "Se présenter et donner des informations personnelles.",
      "Poser et répondre à des questions simples.",
      "Gérer des échanges courants (achat, rendez-vous, renseignement).",
      "Prononcer de façon compréhensible malgré un accent.",
    ],
    strategies: [
      "Préparer des phrases-types pour les situations fréquentes.",
      "Parler lentement mais sans blancs : privilégier la fluidité simple.",
      "Utiliser des gestes et des reformulations pour se faire comprendre.",
      "Travailler l'intonation des questions et des affirmations.",
    ],
    focus: [
      "Blocages liés à la peur de faire des fautes.",
      "Prononciation des sons spécifiques du français (r, u, nasales).",
    ],
    sampleTask: {
      title: "Jeu de rôle : au guichet",
      body: [
        "Vous demandez un renseignement à un guichet (horaire, prix, démarche).",
        "Attendu : salutation, demande claire, question de précision, remerciement.",
      ],
    },
    tips: [
      "Parlez à voix haute chaque jour, même seul, 5 minutes.",
      "Enregistrez-vous et comparez avec un modèle natif.",
      "Mémorisez des phrases d'ouverture pour ne jamais rester bloqué.",
    ],
  },
  {
    skill: "expression-orale", level: "intermediaire",
    summary: "Prendre part à une conversation, décrire, raconter et donner son avis sur des sujets familiers avec une fluidité correcte.",
    objectives: [
      "Décrire une expérience, raconter un événement au passé.",
      "Exprimer et justifier une opinion simplement.",
      "Relancer et maintenir une conversation.",
      "Se corriger et se reformuler sans perdre le fil.",
    ],
    strategies: [
      "Structurer sa réponse (d'abord… ensuite… enfin).",
      "Utiliser des expressions de relance pour gagner du temps de réflexion.",
      "Illustrer par des exemples concrets tirés de son vécu.",
      "Accepter l'erreur et poursuivre plutôt que de tout recommencer.",
    ],
    focus: [
      "Hésitations et pauses trop longues qui cassent la fluidité.",
      "Vocabulaire limité qui oblige à répéter les mêmes mots.",
    ],
    sampleTask: {
      title: "Donner son avis",
      body: [
        "On vous demande votre opinion sur un sujet familier (ex. : télétravail) pendant 2 à 3 minutes.",
        "Attendu : position, deux raisons illustrées d'exemples, une phrase de conclusion.",
      ],
    },
    tips: [
      "Trouvez un partenaire d'échange ou parlez en continu sur un sujet imposé.",
      "Chronométrez-vous : tenir 2 minutes sans blocage sur un thème.",
      "Enrichissez votre vocabulaire par familles thématiques.",
    ],
  },
  {
    skill: "expression-orale", level: "avance",
    summary: "Argumenter, convaincre et débattre avec aisance sur des sujets variés, en s'adaptant à l'interlocuteur.",
    objectives: [
      "Développer une argumentation structurée à l'oral.",
      "Défendre un point de vue et répondre à une objection.",
      "Nuancer, concéder et reformuler avec aisance.",
      "Adapter le registre et le ton à la situation de communication.",
    ],
    strategies: [
      "Annoncer son plan pour guider l'interlocuteur.",
      "Utiliser des marqueurs d'argumentation (certes… mais, en revanche).",
      "Rebondir sur une objection sans se déstabiliser.",
      "Soigner le débit et les intonations pour convaincre.",
    ],
    focus: [
      "Argumentation qui s'essouffle faute d'exemples.",
      "Difficulté à réagir à l'imprévu (question inattendue).",
    ],
    sampleTask: {
      title: "Défendre une position",
      body: [
        "Vous devez convaincre votre interlocuteur d'un point de vue et répondre à ses objections pendant 4 à 5 minutes.",
        "Attendu : thèse claire, arguments hiérarchisés, gestion des objections, conclusion.",
      ],
    },
    tips: [
      "Entraînez-vous à improviser sur des sujets tirés au sort.",
      "Enregistrez des monologues argumentés et analysez vos hésitations.",
      "Travaillez la prosodie (accent d'insistance, pauses stratégiques).",
    ],
  },
  {
    skill: "expression-orale", level: "superieur",
    summary: "S'exprimer spontanément, avec précision, aisance et nuance, sur des sujets complexes ou abstraits, au niveau quasi natif.",
    objectives: [
      "Traiter à l'oral des sujets abstraits ou spécialisés avec fluidité.",
      "Nuancer finement et manier l'implicite et l'idiomatique.",
      "Maintenir un discours long, cohérent et bien rythmé.",
      "Réagir avec spontanéité et pertinence à l'imprévu.",
    ],
    strategies: [
      "Structurer spontanément un discours complexe sans notes.",
      "Employer des expressions idiomatiques à bon escient.",
      "Varier le rythme et l'intonation pour maintenir l'intérêt.",
      "Gérer la nuance : concéder, relativiser, reformuler avec finesse.",
    ],
    focus: [
      "Recours à des tournures scolaires qui plafonnent le niveau.",
      "Perte de spontanéité quand le sujet devient très abstrait.",
    ],
    sampleTask: {
      title: "Exposé et échange",
      body: [
        "Présentez un point de vue argumenté sur un sujet abstrait, puis débattez librement avec l'examinateur.",
        "Attendu : richesse lexicale, nuance, fluidité, réactivité aux relances.",
      ],
    },
    tips: [
      "Débattez régulièrement de sujets d'actualité complexes.",
      "Constituez un répertoire d'expressions idiomatiques et employez-les.",
      "Faites des simulations d'entretien avec un locuteur exigeant.",
    ],
  },
];

// ── Accès ────────────────────────────────────────────────────────────────────

export function getModule(skill: string, level: string): TutoratModule | undefined {
  return MODULES.find((m) => m.skill === skill && m.level === level);
}

/** Tous les couples (compétence, niveau) — pour generateStaticParams. */
export function allModuleParams(): { skill: SkillId; level: LevelId }[] {
  return MODULES.map((m) => ({ skill: m.skill, level: m.level }));
}

export { MODULES };
