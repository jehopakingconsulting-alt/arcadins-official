import type { Lesson } from "@/types/lesson";

export const entrepreneuriatLessons: Lesson[] = [
  {
    title: "Écosystème entrepreneurial canadien",
    objectives: [
      "Identifier les principaux acteurs de l'écosystème entrepreneurial au Canada",
      "Comparer les structures juridiques et leurs conséquences",
      "Connaître les ressources d'accompagnement pour nouveaux arrivants",
      "Comprendre pourquoi l'accompagnement augmente les chances de succès",
    ],
    content: [
      "L'écosystème entrepreneurial canadien comprend des incubateurs (comme Futurpreneur, MaRS Discovery District), des accélérateurs, des organismes de développement économique régionaux et des chambres de commerce qui offrent mentorat et réseautage aux entrepreneurs.",
      "Pour un nouvel arrivant, cet écosystème est à la fois une chance et un labyrinthe. La chance : un tissu dense d'organismes, souvent gratuits ou subventionnés, existe précisément pour épauler ceux qui se lancent. Le labyrinthe : encore faut-il savoir qu'ils existent et à qui s'adresser. Beaucoup d'entrepreneurs échouent non par manque d'idée, mais par isolement — ils ignorent qu'un mentor, un prêt adapté ou un conseil juridique gratuit se trouvaient à une porte de distance. La première compétence entrepreneuriale au Canada est souvent de savoir naviguer ce réseau de soutien.",
      "Les structures juridiques courantes incluent l'entreprise individuelle (simple mais responsabilité illimitée), la société par actions (incorporation, responsabilité limitée) et la société en nom collectif. Le choix dépend du niveau de risque, des besoins de financement et de la structure fiscale souhaitée.",
      "Ce choix est loin d'être une formalité administrative : il a des conséquences durables. L'entreprise individuelle est simple et peu coûteuse à démarrer, mais l'entrepreneur y répond des dettes sur ses biens personnels — sa maison, ses économies. La société par actions (l'incorporation) sépare le patrimoine personnel de celui de l'entreprise, offrant une responsabilité limitée précieuse dès qu'il y a du risque ou des employés, au prix d'une gestion plus lourde et de coûts supérieurs. Changer de structure plus tard est possible mais coûteux ; d'où l'importance de choisir en fonction non seulement d'aujourd'hui, mais des ambitions des prochaines années.",
      "Plusieurs programmes ciblent spécifiquement les nouveaux arrivants entrepreneurs : le Programme d'entrepreneurs immigrants du Québec, les services de Futurpreneur Canada offrant prêts et mentorat, et les centres d'aide aux entreprises (CLD, SADC) présents dans chaque région.",
      "Ces dispositifs répondent à un désavantage réel : un nouvel arrivant démarre sans historique de crédit local, sans réseau professionnel établi, et sans connaissance intime des règles du marché. Les programmes de mentorat comblent le réseau ; les prêts adaptés (comme ceux de Futurpreneur, souvent assortis d'un mentor) contournent l'absence d'historique bancaire ; les centres régionaux (CLD, SADC) offrent conseils et parfois financement de proximité. Recourir à ces ressources n'est pas un aveu de faiblesse mais une décision stratégique : les données montrent qu'un entrepreneur accompagné survit nettement mieux qu'un entrepreneur isolé.",
    ],
    caseStudy: {
      title: "Le restaurant de Yusuf : l'isolement qui coûte cher",
      body: [
        "Yusuf, arrivé de Syrie, veut ouvrir un restaurant de cuisine levantine à Gatineau. Fier et pressé, il puise dans ses économies personnelles, signe un bail comme entreprise individuelle et démarre seul, convaincu que son talent culinaire suffira. Il ignore l'existence des organismes d'accompagnement, persuadé qu'ils sont réservés aux « gros » ou noyés dans une bureaucratie inaccessible.",
        "Deux difficultés le rattrapent. D'abord, un dégât d'eau majeur engendre des dettes que, faute d'incorporation, il doit assumer sur ses biens personnels — sa responsabilité est illimitée. Ensuite, il découvre trop tard qu'un prêt de Futurpreneur assorti d'un mentor, et l'aide gratuite du CLD local pour son plan d'affaires, auraient allégé son démarrage et sécurisé sa structure juridique.",
        "En rencontrant enfin un conseiller du CLD, Yusuf redresse la barre : il s'incorpore pour protéger désormais son patrimoine, obtient un mentor via un programme dédié aux nouveaux arrivants, et restructure son financement. Le restaurant survit et prospère. La leçon : l'écosystème d'accompagnement existe précisément pour éviter ces erreurs coûteuses, et le choix de structure juridique n'est jamais un détail — entreprendre seul et mal structuré multiplie les risques évitables.",
      ],
    },
    exercise: {
      title: "Cartographier son écosystème et choisir sa structure",
      prompt: [
        "Choisissez un projet d'entreprise (réel ou fictif) et un lieu au Canada. Identifiez au moins trois ressources d'accompagnement pertinentes (incubateur, programme de mentorat/prêt, organisme régional type CLD/SADC) et précisez ce que chacune pourrait apporter à ce projet précis.",
        "Comparez, pour ce projet, l'entreprise individuelle et la société par actions : dressez un tableau des avantages et inconvénients de chacune sur les plans de la responsabilité, du coût, et des besoins de financement, puis recommandez une structure en la justifiant.",
        "Rédigez enfin une courte réflexion : quels désavantages spécifiques un nouvel arrivant doit-il surmonter au démarrage, et comment les ressources identifiées y répondent-elles concrètement ?",
      ],
      deliverables: [
        "Trois ressources d'accompagnement identifiées, chacune reliée à un apport concret",
        "Un tableau comparatif entreprise individuelle vs société par actions",
        "Une recommandation de structure juridique justifiée pour le projet",
        "Une réflexion sur les désavantages du nouvel arrivant et leurs parades",
      ],
    },
    keyTakeaways: [
      "L'accompagnement existe à chaque étape — il ne faut jamais entreprendre seul",
      "Savoir naviguer le réseau de soutien est la première compétence entrepreneuriale au Canada",
      "L'entreprise individuelle expose le patrimoine personnel ; l'incorporation le protège",
      "Le choix de structure juridique a des conséquences fiscales et légales durables",
      "Un entrepreneur accompagné survit nettement mieux qu'un entrepreneur isolé",
    ],
    resources: [
      { label: "Futurpreneur Canada", url: "https://www.futurpreneur.ca" },
      { label: "Banque de développement du Canada (BDC)", url: "https://www.bdc.ca" },
    ],
    quiz: [
      { question: "Quel organisme est mentionné comme offrant prêts et mentorat aux jeunes entrepreneurs ?", options: ["Futurpreneur Canada", "Revenu Québec", "La SAAQ", "Le ministère de la Santé"], correctIndex: 0, explanation: "Futurpreneur Canada accompagne spécifiquement les jeunes entrepreneurs avec du financement et du mentorat." },
      { question: "Quelle structure juridique offre une responsabilité limitée ?", options: ["L'entreprise individuelle", "La société par actions (incorporation)", "Aucune structure n'offre cela", "Le travail au noir"], correctIndex: 1, explanation: "La société par actions sépare les biens personnels de ceux de l'entreprise, limitant la responsabilité du propriétaire." },
      { question: "Quel est le principal risque de l'entreprise individuelle ?", options: ["Aucun risque", "La responsabilité illimitée du propriétaire", "Trop de paperasse", "Elle est illégale au Canada"], correctIndex: 1, explanation: "En entreprise individuelle, les biens personnels de l'entrepreneur peuvent être engagés en cas de dettes de l'entreprise." },
      { question: "Que sont les CLD/SADC mentionnés dans le module ?", options: ["Des banques internationales", "Des centres d'aide aux entreprises régionaux", "Des écoles secondaires", "Des compagnies d'assurance"], correctIndex: 1, explanation: "Les CLD et SADC sont des organismes régionaux d'aide au développement économique et entrepreneurial." },
      { question: "Le choix de structure juridique d'une entreprise dépend de :", options: ["La couleur préférée de l'entrepreneur", "Du niveau de risque, du financement et de la fiscalité souhaitée", "Rien d'important", "Uniquement de la taille de la ville"], correctIndex: 1, explanation: "Ces trois facteurs déterminent quelle structure juridique convient le mieux à un projet entrepreneurial donné." },
      { question: "Pourquoi est-il déconseillé d'entreprendre seul selon le module ?", options: ["Parce que c'est interdit par la loi", "Parce que l'accompagnement existe à chaque étape et augmente les chances de succès", "Parce qu'il faut toujours un associé légal", "Ce n'est pas un conseil donné"], correctIndex: 1, explanation: "De nombreuses ressources d'accompagnement existent et leur utilisation augmente significativement les chances de réussite." },
    ],
  },
  {
    title: "Idéation et validation de concept",
    objectives: [
      "Générer des idées à partir de problèmes réels observés",
      "Réaliser une étude de marché simplifiée",
      "Valider une hypothèse de concept avec un MVP avant d'investir",
      "Distinguer une demande réelle d'une demande supposée",
    ],
    content: [
      "La génération d'idées d'affaires part souvent de l'observation d'un problème non résolu plutôt que de la recherche d'une idée originale. La méthode du 'Jobs to be Done' aide à identifier ce que les clients cherchent réellement à accomplir, au-delà du produit lui-même.",
      "C'est un renversement libérateur pour l'entrepreneur débutant : il n'a pas besoin d'une idée géniale et inédite, mais d'un vrai problème à résoudre. Les gens n'achètent pas un produit pour ce qu'il est, mais pour la tâche qu'il accomplit dans leur vie — la fameuse question « quel travail le client engage-t-il ce produit à faire ? ». On n'achète pas une perceuse par amour des perceuses, mais pour obtenir un trou. Partir du problème réel plutôt que de la solution qu'on rêve de vendre évite le piège le plus courant : tomber amoureux d'une idée que personne ne veut.",
      "Une étude de marché simplifiée inclut l'analyse de la concurrence, l'estimation de la taille du marché cible et des entretiens directs avec des clients potentiels. Cette étape évite d'investir temps et argent dans une idée sans demande réelle.",
      "Le piège mortel de l'entrepreneur est la « demande supposée » : être convaincu que les gens veulent quelque chose parce que soi-même on le voudrait. La seule parade est de sortir de son bureau et de parler à de vrais clients potentiels — pas pour leur demander « aimeriez-vous mon produit ? » (à quoi tout le monde répond poliment oui), mais pour comprendre leurs problèmes actuels, ce qu'ils font aujourd'hui pour les régler, et combien ce problème leur coûte. Ces entretiens directs valent infiniment plus que des sondages génériques, car ils révèlent la vérité inconfortable avant qu'elle ne coûte cher.",
      "Le Lean Startup propose de valider rapidement une hypothèse avec un produit minimum viable (MVP) plutôt que de développer une solution complète avant de tester le marché. Échouer rapidement et à faible coût permet d'itérer vers une meilleure solution.",
      "Le MVP n'est pas une version bâclée du produit final : c'est la plus petite chose qu'on puisse mettre entre les mains de vrais clients pour tester l'hypothèse la plus risquée. Souvent, il ne s'agit même pas d'un produit fini — une simple page web décrivant l'offre, une maquette, une prévente. L'idée centrale est de transformer les convictions en expériences : plutôt que de parier des mois de travail et d'argent sur une hypothèse non vérifiée, on la teste vite et à moindre coût. Échouer tôt n'est pas un drame mais un raccourci : chaque échec bon marché élimine une mauvaise piste et rapproche de la bonne.",
    ],
    caseStudy: {
      title: "L'application de Nadia : valider avant de coder",
      body: [
        "Nadia, développeuse arrivée d'Iran, rêve d'une application de mise en relation entre parents pour le covoiturage scolaire. Convaincue du succès, elle s'apprête à investir six mois de développement et ses économies. Un mentor la freine : et si les parents ne voulaient pas confier leurs enfants à des inconnus, aussi pratique soit l'application ?",
        "Plutôt que de coder, Nadia construit un MVP minimal : une simple page décrivant le service et un formulaire d'inscription, qu'elle diffuse dans quelques groupes de parents d'école. En parallèle, elle mène dix entretiens directs. La réalité la surprend : les parents adorent l'idée du covoiturage, mais la confiance est le vrai obstacle — ils ne veulent covoiturer qu'avec des parents qu'ils connaissent déjà, pas des inconnus.",
        "Cette découverte, obtenue en deux semaines et pour presque rien, aurait coûté six mois et des milliers de dollars si Nadia avait développé d'abord. Elle pivote : son application se recentre sur l'organisation du covoiturage entre parents d'une même classe qui se connaissent déjà, répondant au vrai besoin (la logistique) sans buter sur le vrai frein (la confiance entre inconnus). La leçon : valider une hypothèse avec un MVP et de vrais entretiens avant d'investir transforme une idée risquée en concept solide.",
      ],
    },
    exercise: {
      title: "Valider un concept avant d'investir",
      prompt: [
        "Partez d'un problème réel que vous avez observé (pas d'une solution). Formulez-le clairement, puis décrivez l'idée d'affaires qui pourrait le résoudre, en précisant le « job to be done » — ce que le client cherche vraiment à accomplir.",
        "Identifiez l'hypothèse la plus risquée de votre idée (celle qui, si elle est fausse, fait tout échouer) et concevez un MVP minimal pour la tester rapidement et à faible coût. Décrivez concrètement ce MVP et ce que vous mesureriez.",
        "Rédigez enfin cinq questions à poser en entretien direct à des clients potentiels — des questions qui révèlent leurs problèmes réels et leurs comportements actuels, sans leur demander simplement s'ils « aimeraient » votre produit.",
      ],
      deliverables: [
        "Un problème réel formulé et le « job to be done » associé",
        "L'identification de l'hypothèse la plus risquée du concept",
        "La description d'un MVP minimal pour tester cette hypothèse, avec l'indicateur mesuré",
        "Cinq questions d'entretien client centrées sur les problèmes réels, pas sur l'adhésion polie",
      ],
    },
    keyTakeaways: [
      "Une bonne idée résout un problème réel observé, pas un problème supposé",
      "On n'achète pas un produit mais la tâche qu'il accomplit (Jobs to be Done)",
      "La demande supposée est le piège mortel : parler à de vrais clients le déjoue",
      "Le MVP teste l'hypothèse la plus risquée au plus faible coût possible",
      "Échouer tôt et à peu de frais est un raccourci, pas un drame",
    ],
    resources: [
      { label: "Lean Startup — Ressources méthodologiques", url: "https://theleanstartup.com" },
    ],
    quiz: [
      { question: "Que signifie MVP dans la méthodologie Lean Startup ?", options: ["Most Valuable Player", "Produit minimum viable", "Marketing Vente Profit", "Modèle de Vente Premium"], correctIndex: 1, explanation: "Le MVP (Minimum Viable Product) est une version simplifiée d'un produit permettant de tester rapidement une hypothèse sur le marché." },
      { question: "D'où part généralement une bonne idée d'affaires selon le module ?", options: ["D'un rêve sans fondement", "De l'observation d'un problème réel non résolu", "D'une copie exacte d'un concurrent", "Du hasard uniquement"], correctIndex: 1, explanation: "Les meilleures idées résolvent un vrai problème observé chez de potentiels clients." },
      { question: "Que vise la méthode 'Jobs to be Done' ?", options: ["Trouver un emploi rapidement", "Identifier ce que les clients cherchent réellement à accomplir", "Créer des offres d'emploi", "Calculer un salaire"], correctIndex: 1, explanation: "Cette méthode aide à comprendre le besoin profond du client plutôt que de se concentrer uniquement sur les caractéristiques d'un produit." },
      { question: "Pourquoi le Lean Startup privilégie-t-il l'échec rapide et à faible coût ?", options: ["Pour gaspiller de l'argent", "Pour permettre d'itérer rapidement vers une meilleure solution", "Ce n'est pas un objectif", "Pour décourager les entrepreneurs"], correctIndex: 1, explanation: "Échouer vite et à moindre coût permet d'apprendre rapidement et d'ajuster le concept avant un investissement majeur." },
      { question: "Quel élément fait partie d'une étude de marché simplifiée ?", options: ["L'horoscope du fondateur", "L'analyse de la concurrence", "La couleur du logo", "Le nombre de réseaux sociaux suivis personnellement"], correctIndex: 1, explanation: "L'analyse de la concurrence est un élément central pour comprendre le positionnement possible sur un marché." },
      { question: "Pourquoi parler directement aux clients potentiels est-il valorisé ?", options: ["Ce n'est pas recommandé", "Cela donne des informations plus fiables que des sondages génériques", "C'est une perte de temps", "C'est interdit légalement"], correctIndex: 1, explanation: "Les entretiens directs fournissent des informations qualitatives précieuses souvent plus utiles que des données génériques." },
    ],
  },
  {
    title: "Plan d'affaires et modèle financier",
    objectives: [
      "Structurer un plan d'affaires complet et convaincant",
      "Construire des projections financières réalistes et conservatrices",
      "Calculer et interpréter le point mort d'un projet",
      "Utiliser le Business Model Canvas pour itérer sur son modèle",
    ],
    content: [
      "Un plan d'affaires complet comprend : résumé exécutif, description de l'entreprise, analyse de marché, stratégie marketing, plan opérationnel, structure organisationnelle et projections financières. Il sert à la fois de feuille de route interne et de document pour convaincre des investisseurs ou prêteurs.",
      "Ce double usage est essentiel à comprendre. Trop d'entrepreneurs voient le plan d'affaires comme une corvée administrative à produire uniquement pour la banque, puis à ranger dans un tiroir. C'est une erreur : l'exercice de le rédiger force à répondre à des questions qu'on préférerait éviter — qui sont vraiment mes clients, comment vais-je les atteindre, à partir de quand serai-je rentable ? Le vrai bénéfice n'est pas le document, mais la clarté de pensée qu'il impose. Un plan qui ne sert qu'à convaincre un prêteur, sans guider les décisions réelles, a manqué sa fonction la plus importante.",
      "Les projections financières doivent inclure un état des résultats prévisionnel, un bilan et un tableau de flux de trésorerie sur 3 ans minimum. Le point mort (seuil de rentabilité) indique le volume de ventes nécessaire pour couvrir tous les coûts fixes et variables.",
      "La tentation, en projetant, est de peindre un avenir radieux pour impressionner. C'est contre-productif : un prêteur expérimenté a vu mille projections optimistes s'effondrer, et des chiffres irréalistes détruisent la crédibilité au lieu de la bâtir. Mieux vaut des projections conservatrices, prudentes sur les revenus et généreuses sur les coûts et les délais — car dans la réalité, les revenus arrivent plus tard et les dépenses dépassent toujours les prévisions. Un entrepreneur qui atteint des objectifs modestes inspire plus confiance que celui qui rate des objectifs mirobolants.",
      "Le Business Model Canvas offre une vue synthétique en 9 blocs : segments de clients, proposition de valeur, canaux, relation client, sources de revenus, ressources clés, activités clés, partenariats clés et structure de coûts. Il permet d'itérer rapidement sur le modèle d'affaires.",
      "Le Business Model Canvas et le plan d'affaires complet ne s'opposent pas : ils se succèdent. Le Canvas, sur une seule page, sert à explorer et faire évoluer rapidement le modèle — on y déplace des idées, on teste des combinaisons, on repère les incohérences en quelques minutes. Le plan d'affaires détaillé vient ensuite formaliser le modèle stabilisé pour convaincre un banquier ou un investisseur. Commencer par rédiger un plan de quarante pages avant d'avoir validé le modèle, c'est graver dans le marbre des hypothèses encore fragiles. Le bon ordre : itérer vite sur le Canvas, puis rédiger le plan une fois le modèle éprouvé.",
    ],
    caseStudy: {
      title: "Le point mort qui a sauvé le café de Léa",
      body: [
        "Léa veut ouvrir un café-librairie à Québec. Son plan d'affaires, enthousiaste, projette une rentabilité rapide grâce à des ventes qu'elle imagine généreuses. Fière de son document soigné, elle le présente à sa caisse populaire pour obtenir un prêt. Le conseiller, bienveillant, lui pose une question simple : « combien de cafés devez-vous vendre chaque jour, juste pour ne pas perdre d'argent ? »",
        "Léa ne le sait pas. Ensemble, ils calculent son point mort : en additionnant le loyer, les salaires, les assurances (coûts fixes) et le coût de chaque produit (coûts variables), ils déterminent le volume de ventes strictement nécessaire pour couvrir tous les frais. Le résultat la glace : il faudrait vendre bien plus que ce que la taille du local et l'achalandage du quartier permettent réalistement.",
        "Plutôt qu'un refus, ce calcul devient un outil de conception. Léa révise son modèle sur le Business Model Canvas : elle ajoute des sources de revenus (ateliers d'écriture, ventes en ligne de livres), réduit certains coûts fixes, et refait ses projections de façon conservatrice. Son point mort devient atteignable. Le prêt est accordé, et le café ouvre sur des bases saines. La leçon : le point mort n'est pas un détail comptable mais l'indicateur de vérité qui révèle si un projet tient debout — le connaître avant de se lancer évite les rêves qui coûtent cher.",
      ],
    },
    exercise: {
      title: "Modéliser une entreprise et calculer son point mort",
      prompt: [
        "Choisissez une idée d'entreprise et remplissez les 9 blocs du Business Model Canvas pour elle, en veillant à la cohérence entre la proposition de valeur, les segments de clients et les sources de revenus.",
        "Calculez ensuite le point mort de ce projet : listez les coûts fixes mensuels estimés, le prix de vente et le coût variable d'un produit ou service type, puis déterminez le volume de ventes nécessaire pour couvrir tous les coûts. Montrez votre raisonnement.",
        "Rédigez enfin de courtes projections de revenus sur trois ans, en adoptant une posture conservatrice, et expliquez pourquoi des projections prudentes renforcent votre crédibilité auprès d'un prêteur.",
      ],
      deliverables: [
        "Un Business Model Canvas complet (9 blocs) cohérent",
        "Le calcul détaillé du point mort (coûts fixes, prix, coût variable, volume seuil)",
        "Des projections de revenus conservatrices sur trois ans",
        "Une justification du lien entre projections prudentes et crédibilité",
      ],
    },
    keyTakeaways: [
      "Les projections financières doivent être conservatrices, pas optimistes",
      "Le point mort est l'indicateur de vérité qui révèle si un projet tient debout",
      "Le Business Model Canvas facilite les itérations rapides avant le plan complet",
      "On itère d'abord sur le Canvas, puis on formalise le plan une fois le modèle éprouvé",
      "Un plan d'affaires sert de feuille de route interne et d'outil de persuasion externe",
    ],
    resources: [
      { label: "Strategyzer — Business Model Canvas officiel", url: "https://www.strategyzer.com/canvas" },
      { label: "BDC — Modèles de plan d'affaires gratuits", url: "https://www.bdc.ca/fr/articles-outils/modeles-affaires" },
    ],
    quiz: [
      { question: "Que désigne le 'point mort' dans un plan financier ?", options: ["La date de fermeture de l'entreprise", "Le seuil de rentabilité où les revenus couvrent tous les coûts", "Le salaire minimum légal", "Un jour férié"], correctIndex: 1, explanation: "Le point mort indique le volume de ventes nécessaire pour que l'entreprise ne soit ni en profit ni en perte." },
      { question: "Combien de blocs compose le Business Model Canvas ?", options: ["3", "9", "20", "1"], correctIndex: 1, explanation: "Le Business Model Canvas est structuré en 9 blocs couvrant tous les aspects clés d'un modèle d'affaires." },
      { question: "Sur combien d'années minimum les projections financières doivent-elles s'étendre ?", options: ["1 mois", "3 ans", "20 ans", "Aucune durée requise"], correctIndex: 1, explanation: "Des projections sur au moins 3 ans permettent d'évaluer la viabilité à moyen terme du projet." },
      { question: "Quel type de projections financières est recommandé ?", options: ["Très optimistes pour impressionner", "Conservatrices et réalistes", "Aléatoires", "Inexistantes"], correctIndex: 1, explanation: "Des projections conservatrices renforcent la crédibilité auprès des investisseurs et évitent les désillusions." },
      { question: "Quel document financier prévisionnel montre les entrées et sorties d'argent ?", options: ["Le tableau de flux de trésorerie", "Le carnet d'adresses", "Le plan marketing", "L'organigramme"], correctIndex: 0, explanation: "Le tableau de flux de trésorerie projette les mouvements de liquidités entrant et sortant de l'entreprise." },
      { question: "À quoi sert principalement un plan d'affaires ?", options: ["Uniquement à décorer un bureau", "De feuille de route interne et de document pour convaincre investisseurs/prêteurs", "À remplacer la comptabilité", "Il n'a aucune utilité pratique"], correctIndex: 1, explanation: "Le plan d'affaires guide l'entrepreneur en interne tout en servant d'outil de persuasion pour le financement externe." },
    ],
  },
  {
    title: "Financement : subventions, investisseurs, prêts",
    objectives: [
      "Identifier les sources de financement disponibles au Canada",
      "Distinguer dette, équité et subvention et leurs conséquences",
      "Faire correspondre le type de financement au stade de l'entreprise",
      "Préparer un dossier de financement convaincant",
    ],
    content: [
      "Les options de financement incluent les prêts bancaires traditionnels, le financement participatif (crowdfunding), les investisseurs providentiels (anges) et de capital de risque, ainsi que des subventions gouvernementales fédérales et provinciales spécifiques à certains secteurs ou populations.",
      "Il n'existe pas de « meilleur » financement dans l'absolu : le bon choix dépend du stade de l'entreprise et de la nature du projet. Une subvention est de l'argent qu'on ne rembourse pas — idéale, mais souvent conditionnelle, ciblée et longue à obtenir. Une idée au stade embryonnaire se finance rarement par un prêt bancaire (les banques veulent des garanties et un historique), mais peut convenir à un investisseur providentiel qui parie sur le potentiel. Confondre les sources, c'est frapper à la mauvaise porte : demander un prêt bancaire pour une start-up sans revenus mène à un refus certain, tout comme chercher un investisseur pour une entreprise stable et rentable qui n'a pas besoin de céder de parts.",
      "Le financement par dette (prêt) doit être remboursé avec intérêt mais ne dilue pas la propriété de l'entreprise. Le financement par équité (investisseurs) n'exige pas de remboursement immédiat mais cède une partie de la propriété et du contrôle décisionnel.",
      "Cet arbitrage entre dette et équité est l'une des décisions les plus lourdes de conséquences. La dette est exigeante à court terme — il faut rembourser, avec intérêt, que l'entreprise gagne de l'argent ou non — mais l'entrepreneur reste seul maître à bord. L'équité soulage la trésorerie immédiate et apporte souvent un investisseur expérimenté, mais chaque part cédée est une part de contrôle et de profits futurs abandonnée pour toujours. Céder 30 % de son entreprise à un stade précoce peut sembler indolore quand elle ne vaut rien ; c'est parfois un regret cuisant quand elle prospère. La règle : ne céder de l'équité que lorsque c'est réellement nécessaire, et en mesurant ce qu'on abandonne.",
      "Un dossier de financement convaincant présente un plan d'affaires solide, des projections financières réalistes, une équipe compétente et une utilisation claire des fonds demandés. Les prêteurs et investisseurs évaluent autant la crédibilité de l'entrepreneur que la qualité du projet.",
      "Cette dernière phrase est cruciale et souvent sous-estimée : on ne finance pas seulement un projet, on finance une personne. Un prêteur ou un investisseur mise sur la capacité de l'entrepreneur à exécuter, à traverser les imprévus et à tenir ses engagements. La crédibilité se construit par des détails : une demande précise (« 50 000 $, dont 30 000 en équipement et 20 000 en fonds de roulement pour six mois »), la connaissance intime de ses chiffres, et l'honnêteté sur les risques. Un entrepreneur qui prétend n'avoir aucun risque paraît naïf ou malhonnête ; celui qui identifie ses risques et montre comment il les gère inspire confiance. Savoir exactement à quoi serviront les fonds — et le prouver — distingue le dossier sérieux de l'amateur.",
    ],
    caseStudy: {
      title: "Les 40 % de trop cédés par Marcus",
      body: [
        "Marcus, développeur de jeux vidéo arrivé du Nigéria, obtient un premier investisseur providentiel pour lancer son studio. Enthousiaste et pressé d'avoir des liquidités, il accepte de céder 40 % de son entreprise en échange d'un montant qui, à l'époque, lui semble énorme. Il n'a ni comparé les sources de financement, ni mesuré ce que représentait cette part cédée à un stade aussi précoce.",
        "Deux ans plus tard, le studio décolle : un premier jeu rencontre le succès, la valeur de l'entreprise est multipliée. C'est alors que Marcus réalise le coût réel de sa décision. Ces 40 % pèsent désormais très lourd — en profits partagés comme en pouvoir de décision. Or, avec le recul, une partie de son besoin initial aurait pu être couverte par une subvention destinée aux entreprises culturelles et par un petit prêt, sans céder autant de contrôle.",
        "Marcus ne peut pas revenir en arrière — l'équité cédée l'est pour de bon — mais il en tire une règle qu'il applique désormais à toute nouvelle levée : ne céder de l'équité qu'en dernier recours, après avoir épuisé subventions et dette adaptée, et toujours en mesurant précisément ce qu'on abandonne. La leçon : le financement le plus rapide n'est pas le moins cher ; chaque source a un prix, et l'équité cédée trop tôt est le plus élevé de tous.",
      ],
    },
    exercise: {
      title: "Bâtir une stratégie de financement par étapes",
      prompt: [
        "Pour un projet d'entreprise de votre choix, identifiez son stade de développement (idée, démarrage, croissance) et dressez la liste des sources de financement les plus adaptées à ce stade, en justifiant pourquoi certaines sont pertinentes et d'autres non.",
        "Pour un besoin de financement chiffré (par exemple 50 000 $), comparez une option par dette et une option par équité : présentez les avantages, les inconvénients et le « coût » réel de chacune, notamment en termes de contrôle cédé.",
        "Rédigez enfin l'ossature d'un dossier de financement convaincant : la demande précise (montant et utilisation détaillée des fonds), et l'identification honnête d'au moins deux risques du projet avec la façon dont vous les gérez.",
      ],
      deliverables: [
        "Le stade de l'entreprise et les sources de financement adaptées, justifiées",
        "Une comparaison chiffrée dette vs équité, incluant le coût en contrôle",
        "Une demande de financement précise avec utilisation détaillée des fonds",
        "Deux risques du projet identifiés honnêtement, avec leur mode de gestion",
      ],
    },
    keyTakeaways: [
      "Il n'y a pas de meilleur financement : le bon dépend du stade et du projet",
      "La dette préserve le contrôle mais impose un remboursement fixe",
      "L'équité soulage la trésorerie mais cède contrôle et profits futurs pour toujours",
      "On finance une personne autant qu'un projet : la crédibilité de l'entrepreneur compte",
      "Un dossier solide montre une demande précise et une gestion honnête des risques",
    ],
    resources: [
      { label: "Innovation, Sciences et Développement économique Canada — Financement", url: "https://ised-isde.canada.ca" },
      { label: "Investissement Québec", url: "https://www.investquebec.com" },
    ],
    quiz: [
      { question: "Quelle est la principale différence entre dette et équité comme financement ?", options: ["Aucune différence", "La dette doit être remboursée avec intérêt, l'équité cède une partie de la propriété", "L'équité est toujours gratuite", "La dette n'a jamais besoin d'être remboursée"], correctIndex: 1, explanation: "La dette implique un remboursement obligatoire avec intérêt, tandis que l'équité cède une part de propriété sans remboursement immédiat." },
      { question: "Qu'est-ce qu'un 'investisseur providentiel' (ange) ?", options: ["Un employé religieux", "Un investisseur privé qui finance des entreprises en démarrage", "Un fonctionnaire gouvernemental", "Un type de prêt bancaire"], correctIndex: 1, explanation: "Les investisseurs providentiels (anges) sont des particuliers fortunés qui investissent leur propre capital dans des startups prometteuses." },
      { question: "Quel avantage offre le financement par dette par rapport à l'équité ?", options: ["Il dilue toujours la propriété", "Il préserve le contrôle total de l'entreprise par le fondateur", "Il est toujours gratuit", "Il n'existe pas au Canada"], correctIndex: 1, explanation: "Contrairement à l'équité, la dette ne cède aucune part de propriété ou de pouvoir décisionnel à un tiers." },
      { question: "Qu'évaluent les prêteurs et investisseurs en plus de la qualité du projet ?", options: ["Rien d'autre", "La crédibilité de l'entrepreneur", "Uniquement l'âge du demandeur", "La nationalité uniquement"], correctIndex: 1, explanation: "La crédibilité et la compétence perçue de l'entrepreneur sont des facteurs clés dans toute décision de financement." },
      { question: "Que doit clairement présenter un dossier de financement convaincant ?", options: ["Aucune information précise", "L'utilisation claire des fonds demandés", "Uniquement des photos de l'équipe", "Le numéro de téléphone personnel"], correctIndex: 1, explanation: "Les prêteurs et investisseurs veulent savoir précisément comment les fonds seront utilisés avant de s'engager." },
      { question: "Le financement participatif (crowdfunding) implique généralement :", options: ["Un seul gros investisseur", "De nombreux petits contributeurs, souvent via une plateforme en ligne", "Uniquement des banques", "Le gouvernement exclusivement"], correctIndex: 1, explanation: "Le crowdfunding mobilise un grand nombre de petites contributions, souvent via des plateformes en ligne dédiées." },
    ],
  },
  {
    title: "Droit des affaires au Canada",
    objectives: [
      "Comprendre les obligations légales de base d'une entreprise",
      "Connaître les exigences fiscales et d'enregistrement dès le démarrage",
      "Identifier les contrats essentiels pour protéger son entreprise",
      "Savoir quand recourir à un avocat d'affaires",
    ],
    content: [
      "Toute entreprise au Canada doit s'enregistrer auprès du registre des entreprises provincial, obtenir un numéro d'entreprise fédéral (NE) auprès de l'Agence du revenu du Canada, et respecter les obligations fiscales (TPS/TVQ selon le seuil de revenus).",
      "Ces démarches ne sont pas optionnelles ni reportables : elles s'appliquent dès le démarrage, et les négliger expose à des pénalités qui s'accumulent silencieusement. Beaucoup de nouveaux entrepreneurs, absorbés par leur produit, remettent l'administratif à « plus tard » — jusqu'à ce que l'Agence du revenu réclame des taxes non perçues ou qu'un contrat ne puisse être signé faute d'enregistrement en règle. Traiter la conformité légale comme une fondation à poser avant de construire, et non comme une corvée à repousser, évite des blocages coûteux au pire moment.",
      "Les obligations varient selon la structure juridique : une société par actions doit tenir des registres corporatifs, organiser des assemblées annuelles et produire des déclarations fiscales distinctes de celles des actionnaires.",
      "C'est le revers de la protection qu'offre l'incorporation : la responsabilité limitée a pour contrepartie une gouvernance plus formelle. Une société par actions est une personne morale distincte de son propriétaire, avec ses propres obligations — registres à jour, résolutions consignées, déclarations séparées. Négliger ce formalisme peut, dans certains cas, permettre à un tribunal de « lever le voile corporatif » et de rendre l'entrepreneur personnellement responsable, annulant précisément la protection recherchée. La rigueur administrative n'est donc pas de la paperasse inutile : c'est ce qui maintient réelle la séparation entre le patrimoine personnel et celui de l'entreprise.",
      "Les contrats essentiels incluent les conditions de service avec les clients, les ententes de confidentialité avec les employés et partenaires, et les contrats de partenariat clairement définis. Un avocat d'affaires devrait réviser ces documents avant leur mise en application.",
      "L'erreur classique, surtout entre amis ou associés qui « se font confiance », est de démarrer sans rien écrire. Or les conflits surgissent presque toujours du non-dit : qui décide en cas de désaccord, comment se répartissent les profits, que se passe-t-il si un associé veut partir ? Un contrat de partenariat clair ne traduit pas une méfiance, mais une prévoyance — il protège l'amitié précisément en évitant les malentendus futurs. Recourir à un avocat d'affaires pour rédiger ou réviser ces documents coûte bien moins cher qu'un litige, et l'adage se vérifie : mieux vaut payer un avocat au départ qu'un tribunal à l'arrivée.",
    ],
    caseStudy: {
      title: "Deux amis, une poignée de main, un litige : l'atelier de Samir et Théo",
      body: [
        "Samir et Théo, amis de longue date, lancent ensemble un atelier de fabrication de meubles sur mesure. Confiants dans leur amitié, ils démarrent sur une simple poignée de main : pas de contrat de partenariat, pas de règles écrites sur le partage des profits ou des décisions. Les premiers mois se passent bien, portés par l'enthousiasme.",
        "Le conflit surgit avec le succès. L'atelier devient rentable, et les non-dits explosent : Théo estime avoir apporté plus de clients et réclame une plus grande part ; Samir, qui gère la production, juge sa contribution sous-estimée. Aucun document ne tranche la répartition, ni ne prévoit comment sortir de l'impasse. Ce qui aurait dû se régler en une clause de contrat devient une dispute personnelle qui empoisonne à la fois l'entreprise et l'amitié.",
        "Un médiateur, puis un avocat, les aident à formaliser tardivement ce qui aurait dû l'être au départ : parts de propriété, rôles, mécanisme de décision et clause de sortie. L'entreprise survit, mais l'amitié en garde des cicatrices. La leçon : ce n'est pas la méfiance mais la clarté qui protège une association. Un contrat écrit dès le début, révisé par un avocat, aurait évité le conflit — car les meilleurs partenariats sont ceux qui ont prévu par écrit ce qui arrive quand tout va mal.",
      ],
    },
    exercise: {
      title: "Établir la base légale et contractuelle d'une entreprise",
      prompt: [
        "Pour un projet d'entreprise de votre choix au Québec, dressez la liste ordonnée des démarches légales et fiscales à effectuer dès le démarrage (enregistrement, numéro d'entreprise, inscription aux taxes le cas échéant), en indiquant l'organisme concerné pour chacune.",
        "Identifiez les trois contrats les plus essentiels à mettre en place pour ce projet précis (par exemple conditions de service, entente de confidentialité, contrat de partenariat) et expliquez, pour chacun, quel risque il permet d'éviter.",
        "Rédigez enfin, pour un partenariat fictif à deux associés, une liste de cinq points cruciaux que leur contrat devrait absolument trancher pour éviter un futur conflit (répartition, décisions, sortie…).",
      ],
      deliverables: [
        "Une liste ordonnée des démarches légales et fiscales de démarrage, avec l'organisme concerné",
        "Trois contrats essentiels identifiés, chacun relié au risque qu'il évite",
        "Cinq points cruciaux qu'un contrat de partenariat devrait trancher",
        "Une justification du recours à un avocat d'affaires au démarrage",
      ],
    },
    keyTakeaways: [
      "L'enregistrement et la conformité fiscale sont obligatoires dès le démarrage, pas reportables",
      "La responsabilité limitée exige en contrepartie une gouvernance formelle rigoureuse",
      "Un contrat de partenariat clair protège l'association, il ne traduit pas la méfiance",
      "Les conflits surgissent du non-dit : mieux vaut tout écrire au départ",
      "Payer un avocat au départ coûte bien moins cher qu'un litige à l'arrivée",
    ],
    resources: [
      { label: "Registraire des entreprises du Québec", url: "https://www.registreentreprises.gouv.qc.ca" },
      { label: "Agence du revenu du Canada — Entreprises", url: "https://www.canada.ca/fr/agence-revenu.html" },
    ],
    quiz: [
      { question: "Que doit obtenir toute entreprise auprès de l'Agence du revenu du Canada ?", options: ["Un permis de conduire", "Un numéro d'entreprise fédéral (NE)", "Une carte d'assurance maladie", "Rien n'est requis"], correctIndex: 1, explanation: "Le numéro d'entreprise fédéral (NE) est essentiel pour les obligations fiscales et administratives de toute entreprise canadienne." },
      { question: "Quelle obligation supplémentaire a une société par actions par rapport à une entreprise individuelle ?", options: ["Aucune différence", "Tenir des registres corporatifs et organiser des assemblées annuelles", "Payer plus cher l'électricité", "Avoir un seul employé maximum"], correctIndex: 1, explanation: "La société par actions implique des obligations de gouvernance plus formelles, dont la tenue de registres et d'assemblées." },
      { question: "Pourquoi est-il important d'avoir des contrats de confidentialité avec les employés ?", options: ["Ce n'est jamais utile", "Pour protéger les informations sensibles de l'entreprise", "C'est uniquement décoratif", "Pour augmenter les coûts inutilement"], correctIndex: 1, explanation: "Les ententes de confidentialité protègent les informations stratégiques et sensibles de l'entreprise contre la divulgation." },
      { question: "Qui devrait réviser les contrats essentiels d'une entreprise selon le module ?", options: ["Personne, ce n'est pas nécessaire", "Un avocat d'affaires", "Un ami non spécialisé", "Un client au hasard"], correctIndex: 1, explanation: "Un avocat d'affaires apporte l'expertise nécessaire pour s'assurer que les contrats protègent réellement l'entreprise." },
      { question: "Quand les obligations fiscales d'enregistrement deviennent-elles applicables ?", options: ["Jamais", "Dès le démarrage de l'entreprise", "Seulement après 10 ans d'activité", "Uniquement si l'entreprise fait faillite"], correctIndex: 1, explanation: "Les obligations légales et fiscales s'appliquent dès le démarrage, pas après un certain délai." },
      { question: "Quel registre doit être consulté pour enregistrer une entreprise au Québec ?", options: ["Le Registraire des entreprises du Québec", "Le bureau de poste", "Une bibliothèque municipale", "Aucun registre n'existe"], correctIndex: 0, explanation: "Le Registraire des entreprises du Québec gère l'enregistrement officiel des entreprises dans la province." },
    ],
  },
  {
    title: "Marketing et acquisition de clients",
    objectives: [
      "Définir une proposition de valeur claire et différenciée",
      "Choisir des canaux d'acquisition adaptés à un budget limité",
      "Traiter ses premiers clients comme une source d'apprentissage",
      "Comprendre le rôle du service client dans l'acquisition à faible coût",
    ],
    content: [
      "Une proposition de valeur claire répond à trois questions : quel problème spécifique l'entreprise résout-elle, pour qui, et pourquoi mieux que les alternatives existantes. Sans cette clarté, tout effort marketing devient inefficace.",
      "C'est le fondement sur lequel tout le reste repose, et l'erreur la plus fréquente est de vouloir plaire à tout le monde. Une proposition de valeur qui s'adresse à « tous ceux qui veulent bien manger » ne parle à personne ; « des repas préparés sains livrés aux professionnels débordés du centre-ville » parle fort à un public précis. Le paradoxe de l'entrepreneur débutant est qu'en cherchant à ne exclure personne, il se rend invisible. Choisir un segment clair et un bénéfice différencié, quitte à renoncer à d'autres, est ce qui rend le marketing efficace — on ne peut pas être mémorable en étant générique.",
      "Pour une jeune entreprise à budget limité, le marketing de contenu, le bouche-à-oreille structuré (programmes de référencement) et le réseautage local restent souvent plus rentables que la publicité payante à grande échelle.",
      "L'entrepreneur qui débute rêve souvent de grandes campagnes publicitaires, alors que son meilleur levier est presque toujours plus modeste et plus proche. Le réseautage local, un contenu utile qui démontre son expertise, et surtout un bouche-à-oreille organisé transforment de petits budgets en résultats réels. Ces canaux ont un avantage décisif : ils construisent la confiance, denrée rare pour une marque inconnue. Une recommandation d'un ami vaut mille publicités, car elle apporte la crédibilité qu'une jeune entreprise n'a pas encore. Structurer le bouche-à-oreille — inciter explicitement les clients satisfaits à recommander — démultiplie ce levier au lieu de le laisser au hasard.",
      "Les premiers clients sont les plus précieux : leur retour direct permet d'ajuster le produit, et leur satisfaction génère des recommandations qui réduisent le coût d'acquisition pour les clients suivants. Un excellent service client compense souvent un budget marketing limité.",
      "Il faut voir ses premiers clients autrement que comme une simple source de revenu : ils sont des partenaires d'apprentissage et les futurs ambassadeurs de la marque. Chaque interaction avec eux enseigne quelque chose que nulle étude de marché ne révèle. Et un premier client traité de façon exceptionnelle — écouté, choyé, dépanné au-delà de ses attentes — devient un porte-parole qui amène gratuitement les suivants. C'est pourquoi un service client remarquable est, pour une jeune entreprise, l'un des meilleurs investissements marketing : il coûte peu, fidélise, et transforme des acheteurs en recommandations. Bichonner ses dix premiers clients rapporte souvent plus que de courir après les mille suivants.",
    ],
    caseStudy: {
      title: "Le traiteur d'Aïcha : dix clients choyés valent mille publicités",
      body: [
        "Aïcha lance un service de traiteur de cuisine ouest-africaine à Montréal. Tentée de dépenser son maigre budget en publicités en ligne visant « tout Montréal », elle obtient d'abord des résultats décevants : son message générique se noie, et les rares commandes ne suffisent pas à couvrir le coût des annonces. Elle songe même à abandonner.",
        "Une conseillère l'aide à changer de stratégie. D'abord, resserrer la proposition de valeur : non plus « traiteur pour tous », mais « buffets africains authentiques pour événements d'entreprise et fêtes familiales ». Ensuite, abandonner la publicité de masse au profit du réseautage local et du soin extrême apporté à ses premiers clients. Pour chaque commande, Aïcha ajoute une attention personnelle, recueille les retours, et demande simplement : « si vous avez aimé, parlez-en autour de vous ».",
        "Ces premiers clients, enchantés, la recommandent spontanément à leurs collègues et amis. En quelques mois, l'essentiel de ses nouvelles commandes provient du bouche-à-oreille — un canal quasi gratuit et bien plus efficace que ses anciennes annonces. La leçon : pour une jeune entreprise, une proposition de valeur ciblée et des premiers clients traités comme des trésors battent presque toujours un budget publicitaire dispersé. La confiance se propage de personne à personne, pas à coups de bannières.",
      ],
    },
    exercise: {
      title: "Concevoir une acquisition client à petit budget",
      prompt: [
        "Pour une entreprise de votre choix, rédigez une proposition de valeur claire répondant aux trois questions : quel problème, pour qui précisément, et pourquoi mieux que les alternatives. Résistez à la tentation de viser « tout le monde ».",
        "Proposez un plan d'acquisition à budget limité mobilisant au moins trois canaux à faible coût (contenu, réseautage local, bouche-à-oreille structuré…), en expliquant pourquoi chacun convient à ce stade et à ce public.",
        "Concevez enfin un programme simple pour transformer vos premiers clients en ambassadeurs : comment recueillir leurs retours, comment les inciter à recommander, et quel geste de service exceptionnel vous offririez.",
      ],
      deliverables: [
        "Une proposition de valeur ciblée répondant aux trois questions clés",
        "Un plan d'acquisition mobilisant au moins trois canaux à faible coût, justifiés",
        "Un programme de bouche-à-oreille structuré (retours + incitation à recommander)",
        "Un geste de service client exceptionnel à offrir aux premiers clients",
      ],
    },
    keyTakeaways: [
      "Une proposition de valeur floue rend tout marketing inefficace",
      "Vouloir plaire à tout le monde rend invisible : cibler un segment rend mémorable",
      "Les canaux à faible coût (contenu, réseau, recommandation) sont souvent les plus rentables au démarrage",
      "Une recommandation apporte la confiance qu'une marque inconnue n'a pas encore",
      "Bichonner ses premiers clients rapporte plus que courir après les mille suivants",
    ],
    resources: [
      { label: "Strategyzer — Value Proposition Canvas", url: "https://www.strategyzer.com/canvas/value-proposition-canvas" },
    ],
    quiz: [
      { question: "Quelles sont les trois questions clés d'une proposition de valeur claire ?", options: ["Quand, où, comment", "Quel problème, pour qui, pourquoi mieux que les alternatives", "Combien ça coûte uniquement", "Qui est le PDG"], correctIndex: 1, explanation: "Ces trois questions définissent précisément ce qui rend une offre pertinente et différenciée sur le marché." },
      { question: "Quel canal est souvent plus rentable pour une jeune entreprise à budget limité ?", options: ["La publicité télévisée nationale", "Le marketing de contenu et le bouche-à-oreille", "Les panneaux publicitaires géants", "Le sponsoring sportif international"], correctIndex: 1, explanation: "Ces canaux à faible coût sont souvent plus accessibles et efficaces pour une entreprise en démarrage." },
      { question: "Pourquoi les premiers clients sont-ils particulièrement précieux ?", options: ["Ils paient toujours plus cher", "Leur retour permet d'ajuster le produit et de générer des recommandations", "Ils n'ont aucune valeur particulière", "Ils sont toujours mécontents"], correctIndex: 1, explanation: "Les premiers clients fournissent un feedback précieux et deviennent souvent des ambassadeurs réduisant le coût d'acquisition futur." },
      { question: "Que peut compenser un excellent service client selon le module ?", options: ["Rien du tout", "Un budget marketing limité", "L'absence totale de produit", "Le manque de personnel"], correctIndex: 1, explanation: "Un service client exceptionnel génère du bouche-à-oreille positif, compensant un budget marketing restreint." },
      { question: "Que se passe-t-il si la proposition de valeur est floue ?", options: ["Rien de particulier", "Tout effort marketing devient inefficace", "Les ventes augmentent automatiquement", "C'est sans conséquence"], correctIndex: 1, explanation: "Sans clarté sur la valeur offerte, il devient très difficile de communiquer efficacement et de convaincre des clients potentiels." },
      { question: "Qu'est-ce qu'un programme de référencement en marketing ?", options: ["Un système qui encourage le bouche-à-oreille structuré", "Un type d'impôt", "Un logiciel de comptabilité", "Une obligation légale"], correctIndex: 0, explanation: "Un programme de référencement incite les clients existants à recommander l'entreprise, souvent via des récompenses." },
    ],
  },
  {
    title: "Innovation et propriété intellectuelle",
    objectives: [
      "Distinguer les quatre grands types de propriété intellectuelle",
      "Évaluer quand et quoi protéger selon un rapport coût-bénéfice",
      "Connaître le rôle de l'OPIC et le processus de dépôt au Canada",
      "Prioriser la protection de marque pour une jeune entreprise",
    ],
    content: [
      "La propriété intellectuelle se divise en plusieurs catégories : les brevets protègent les inventions techniques, les marques de commerce protègent les noms et logos, le droit d'auteur protège les œuvres créatives, et les secrets commerciaux protègent les informations confidentielles non divulguées.",
      "Comprendre laquelle s'applique évite de coûteuses méprises. Un entrepreneur croit souvent qu'il faut « breveter son idée », alors qu'une idée en soi ne se protège pas — seule une invention technique concrète le peut, et un concept d'affaires, un nom ou un savoir-faire relèvent d'autres protections. Le secret commercial, souvent négligé, est parfois la meilleure stratégie : la recette du Coca-Cola n'a jamais été brevetée (un brevet aurait obligé à la divulguer et expirerait), elle est gardée secrète depuis plus d'un siècle. Choisir le bon type de protection commence donc par identifier précisément ce que l'on cherche à protéger.",
      "Toute innovation ne nécessite pas un brevet — le coût et la complexité du processus doivent être mis en balance avec la valeur stratégique réelle de la protection. Pour beaucoup de jeunes entreprises, protéger la marque est prioritaire avant de breveter un produit.",
      "Le brevet exerce une fascination trompeuse sur les entrepreneurs débutants, qui y engloutissent parfois des sommes considérables avant même d'avoir un client. Or un brevet coûte cher, prend des années, et ne vaut que si l'on a les moyens de le défendre en justice — sans quoi il n'est qu'un bout de papier. Pour la plupart des jeunes entreprises, l'analyse coût-bénéfice penche autrement : protéger d'abord sa marque (nom, logo), rapide et abordable, sécurise l'identité sur laquelle se bâtira la réputation. On brevette quand l'invention est réellement centrale, défendable et que l'entreprise en a les moyens — pas par réflexe.",
      "L'Office de la propriété intellectuelle du Canada (OPIC) gère l'enregistrement des marques et brevets. Le processus peut prendre plusieurs mois à plusieurs années selon la complexité, et un agent en brevets ou marques est souvent recommandé pour naviguer la procédure.",
      "Un point crucial et souvent découvert trop tard : la protection n'est pas automatique et le temps joue contre l'imprudent. Divulguer publiquement une invention avant de l'avoir protégée peut, dans bien des cas, rendre le brevet impossible. Choisir un nom d'entreprise et bâtir sa réputation dessus sans vérifier qu'il n'est pas déjà déposé peut obliger à tout renommer plus tard, à grands frais. Vérifier la disponibilité d'une marque avant de la lancer, et consulter un agent pour les enjeux importants, relève de la simple prudence. En propriété intellectuelle, l'anticipation coûte peu ; la négliger peut coûter l'actif le plus précieux de l'entreprise.",
    ],
    caseStudy: {
      title: "La marque volée sous le nez de BioPousse",
      body: [
        "Karine fonde BioPousse, une petite entreprise de produits d'entretien écologiques. Persuadée que le plus important est de « breveter sa formule », elle consacre temps et argent à explorer un brevet complexe et coûteux pour sa recette de nettoyant. Pendant ce temps, elle bâtit tranquillement sa réputation sous le nom BioPousse, sans jamais vérifier ni enregistrer la marque, la jugeant secondaire.",
        "Le succès venu, une mauvaise surprise l'attend : une autre entreprise dépose officiellement la marque « BioPousse » et lui envoie une mise en demeure de cesser de l'utiliser. Karine découvre alors, amèrement, que le nom sur lequel repose toute sa réputation ne lui appartenait pas légalement. Elle avait concentré ses efforts sur un brevet incertain tout en négligeant la protection la plus accessible et la plus stratégique pour elle : sa marque.",
        "Elle doit soit racheter les droits à prix fort, soit tout renommer et reconstruire sa notoriété de zéro — deux options coûteuses qu'une simple recherche et un enregistrement de marque au départ auraient évitées. La leçon : pour une jeune entreprise, protéger d'abord sa marque est souvent bien plus stratégique que courir après un brevet ; et vérifier la disponibilité d'un nom avant de bâtir dessus est une précaution élémentaire dont l'oubli se paie très cher.",
      ],
    },
    exercise: {
      title: "Élaborer une stratégie de propriété intellectuelle",
      prompt: [
        "Pour un projet d'entreprise de votre choix, identifiez ce qui, dans ce projet, mérite d'être protégé, et associez chaque élément au type de propriété intellectuelle approprié (brevet, marque, droit d'auteur, secret commercial).",
        "Pour l'un de ces éléments, menez une courte analyse coût-bénéfice de sa protection : la valeur stratégique justifie-t-elle le coût et le délai ? Concluez sur la priorité à accorder (par exemple : enregistrer la marque d'abord).",
        "Rédigez enfin une liste de précautions à prendre pour ne pas perdre ses droits : par exemple vérifier la disponibilité d'un nom, ne pas divulguer une invention avant protection, ou recourir à un agent. Justifiez chaque précaution par le risque qu'elle évite.",
      ],
      deliverables: [
        "Les éléments à protéger, chacun associé au bon type de propriété intellectuelle",
        "Une analyse coût-bénéfice de la protection d'un élément, avec conclusion de priorité",
        "Une liste de précautions pour ne pas perdre ses droits, chacune justifiée",
        "Une recommandation de la protection à réaliser en premier pour ce projet",
      ],
    },
    keyTakeaways: [
      "Une idée ne se protège pas en soi : chaque type de PI protège une chose différente",
      "Le secret commercial est parfois une meilleure stratégie qu'un brevet",
      "Tout n'a pas besoin d'être breveté — l'analyse coût-bénéfice est essentielle",
      "L'enregistrement de marque est souvent la priorité la plus accessible pour une jeune entreprise",
      "La protection n'est pas automatique : vérifier et anticiper évite de perdre un actif précieux",
    ],
    resources: [
      { label: "Office de la propriété intellectuelle du Canada", url: "https://www.ic.gc.ca/eic/site/cipointernet-internetopic.nsf" },
    ],
    quiz: [
      { question: "Que protège un brevet ?", options: ["Un nom commercial", "Une invention technique", "Une œuvre musicale", "Un secret de famille"], correctIndex: 1, explanation: "Le brevet protège spécifiquement les inventions techniques nouvelles et non évidentes." },
      { question: "Que protège une marque de commerce ?", options: ["Un processus de fabrication secret", "Un nom ou un logo", "Une œuvre littéraire", "Un brevet d'invention"], correctIndex: 1, explanation: "La marque de commerce protège les éléments d'identification distinctifs comme les noms et logos." },
      { question: "Quel organisme canadien gère l'enregistrement des marques et brevets ?", options: ["L'OPIC (Office de la propriété intellectuelle du Canada)", "La Banque du Canada", "Postes Canada", "Le ministère de l'Agriculture"], correctIndex: 0, explanation: "L'OPIC est l'organisme fédéral responsable de la gestion des marques, brevets et autres formes de propriété intellectuelle." },
      { question: "Toute innovation doit-elle systématiquement être brevetée selon le module ?", options: ["Oui, toujours obligatoirement", "Non, une analyse coût-bénéfice est nécessaire", "C'est interdit de breveter quoi que ce soit", "Seulement les inventions canadiennes"], correctIndex: 1, explanation: "Le coût et la complexité du brevet doivent être évalués face à sa valeur stratégique réelle pour l'entreprise." },
      { question: "Quelle protection est souvent prioritaire pour une jeune entreprise ?", options: ["Le brevet uniquement", "L'enregistrement de la marque", "Aucune protection n'est nécessaire", "Le droit d'auteur exclusivement"], correctIndex: 1, explanation: "Protéger la marque (nom, logo) est souvent plus accessible et prioritaire qu'un brevet complexe pour une jeune entreprise." },
      { question: "Que protègent les secrets commerciaux ?", options: ["Les informations confidentielles non divulguées", "Uniquement les logos", "Les bâtiments physiques", "Les employés eux-mêmes"], correctIndex: 0, explanation: "Les secrets commerciaux protègent des informations stratégiques (recettes, procédés) tant qu'elles restent confidentielles." },
    ],
  },
  {
    title: "Projet final : pitch devant un jury",
    objectives: [
      "Synthétiser son projet entrepreneurial en présentation percutante",
      "Capter l'attention dès les premières secondes d'un pitch",
      "Anticiper et répondre aux questions critiques d'un jury d'investisseurs",
      "Démontrer la viabilité et la crédibilité de son projet et de son équipe",
    ],
    content: [
      "Le pitch final condense le projet entrepreneurial en 10 minutes maximum : problème, solution, marché cible, modèle d'affaires, traction (si applicable), équipe et demande de financement ou de partenariat. Chaque minute doit être utilisée pour capter et maintenir l'attention.",
      "C'est ici que convergent tous les modules du programme : l'idée validée (module 2), le modèle et le point mort (module 3), la stratégie de financement (module 4), la structure juridique (module 5), le marketing (module 6) et la propriété intellectuelle (module 7). Le pitch n'est pas un exercice de vente superficiel, mais la démonstration condensée que toutes ces pièces s'emboîtent en un projet cohérent. Un investisseur repère instantanément l'entrepreneur qui récite un beau discours sans maîtriser ses fondations — d'où l'importance que chaque affirmation du pitch repose sur le travail réel des modules précédents.",
      "Les premières secondes décident du reste. Un jury enchaîne les présentations et se forge une première impression très vite : commencer par « bonjour, je m'appelle… et je vais vous parler de mon entreprise » gaspille ce moment précieux. Ouvrir par le problème rendu vivant — une statistique frappante, une question, une petite histoire — capte immédiatement. On accroche d'abord, on se présente ensuite. Un bon pitch raconte une histoire claire : voici un problème réel, voici notre solution, voici la preuve que ça marche, voici où nous allons et ce que nous demandons. La clarté et le rythme comptent autant que le contenu.",
      "Un jury d'investisseurs pose généralement des questions sur la taille réelle du marché, la défensabilité face à la concurrence, l'utilisation prévue des fonds et la crédibilité de l'équipe à exécuter le plan présenté.",
      "La séance de questions est souvent plus déterminante que le pitch lui-même, car c'est là que tombent les masques. Un discours peut être répété et poli ; les réponses aux questions difficiles, elles, révèlent la profondeur de la compréhension. Anticiper les objections probables — « pourquoi vous et pas un concurrent mieux financé ? », « qu'est-ce qui vous empêche d'être copié ? », « et si vos ventes sont deux fois plus lentes que prévu ? » — et préparer des réponses honnêtes et étayées démontre une maîtrise que nul discours mémorisé ne peut simuler.",
      "Enfin, une vérité que tout investisseur expérimenté répète : on investit dans une équipe autant que dans une idée. Une idée brillante portée par une équipe faible échoue plus souvent qu'une idée ordinaire portée par une équipe déterminée et capable d'exécuter. Le jury évalue donc, au-delà du plan, la crédibilité des personnes : leur connaissance du marché, leur résilience, leur honnêteté face aux risques, leur capacité à s'adapter. Reconnaître calmement une faiblesse et montrer comment on la gère inspire bien plus confiance que prétendre que tout est parfait. La crédibilité de l'équipe pèse souvent plus lourd, dans la décision finale, que l'élégance du plan.",
    ],
    caseStudy: {
      title: "Deux pitchs, une même idée : la préparation de Grace fait la différence",
      body: [
        "Deux équipes présentent un concept similaire d'application de livraison locale devant le même jury. La première, menée par Éric, livre un pitch brillant et fluide, magnifiquement répété. Mais dès la séance de questions — « comment vous défendez-vous contre un géant qui copierait votre idée ? » —, Éric hésite, se contredit, et finit par minimiser le risque en affirmant qu'« il n'y en a pas vraiment ». La belle façade se fissure.",
        "Grace, elle, ouvre son pitch non par sa présentation mais par le problème rendu vivant : « chaque semaine, les commerçants de ce quartier perdent des ventes faute de livraison abordable — voici l'un d'eux ». Elle accroche d'emblée. Son pitch s'appuie visiblement sur un vrai travail : un point mort calculé, une traction naissante (dix commerces déjà inscrits), une stratégie de marque protégée. Surtout, face aux questions, elle répond avec des faits et reconnaît honnêtement ses risques : « oui, un gros acteur pourrait entrer ; notre avantage, c'est notre ancrage local et ces relations déjà bâties ».",
        "Le jury retient Grace, non parce que son idée était meilleure, mais parce que sa préparation, sa maîtrise sous pression et son honnêteté ont inspiré confiance en sa capacité à exécuter. La leçon : un pitch se gagne autant dans les réponses aux questions difficiles que dans le discours, et la crédibilité d'une équipe qui connaît ses chiffres et assume ses risques pèse plus que la plus belle des présentations.",
      ],
    },
    exercise: {
      title: "Préparer et défendre un pitch d'investisseurs",
      prompt: [
        "Construisez la trame d'un pitch de 10 minutes pour un projet entrepreneurial (idéalement celui travaillé tout au long du cours), couvrant : problème, solution, marché cible, modèle d'affaires, traction éventuelle, équipe et demande. Rédigez en particulier une accroche d'ouverture qui capte l'attention dès les premières secondes, sans commencer par vous présenter.",
        "Vérifiez la cohérence : chaque affirmation clé du pitch (marché, rentabilité, financement) s'appuie-t-elle sur le travail des modules précédents ? Notez les points qui auraient besoin d'être étayés davantage.",
        "Anticipez enfin quatre questions difficiles qu'un jury pourrait poser (marché, concurrence, utilisation des fonds, risques) et rédigez pour chacune une réponse honnête et étayée, reconnaissant les risques réels plutôt que de prétendre qu'il n'y en a pas.",
      ],
      deliverables: [
        "Une trame de pitch de 10 minutes couvrant les éléments essentiels",
        "Une accroche d'ouverture captant l'attention dès les premières secondes",
        "Une vérification de la cohérence du pitch avec le travail des modules précédents",
        "Quatre questions difficiles anticipées avec des réponses honnêtes et étayées",
      ],
    },
    keyTakeaways: [
      "Le pitch démontre que tous les modules s'emboîtent en un projet cohérent",
      "Un bon pitch capte l'attention dès les 30 premières secondes, sans commencer par se présenter",
      "La séance de questions révèle la maîtrise réelle mieux que le discours répété",
      "La préparation aux questions difficiles compte autant que la présentation elle-même",
      "On investit dans une équipe autant que dans une idée : la crédibilité prime",
    ],
    resources: [
      { label: "Y Combinator — Comment pitcher (guide gratuit)", url: "https://www.ycombinator.com/library" },
    ],
    quiz: [
      { question: "Quelle est la durée maximale typique d'un pitch final selon le module ?", options: ["1 heure", "10 minutes", "5 secondes", "3 jours"], correctIndex: 1, explanation: "Un pitch efficace doit être condensé en 10 minutes maximum pour rester percutant et respecter le temps du jury." },
      { question: "Sur quoi un jury d'investisseurs pose-t-il généralement des questions ?", options: ["La couleur du logo uniquement", "La taille du marché, la concurrence, l'utilisation des fonds", "Les vacances de l'entrepreneur", "Le climat local"], correctIndex: 1, explanation: "Ces éléments sont essentiels pour évaluer la viabilité et le potentiel réel du projet présenté." },
      { question: "Que démontre la préparation aux questions difficiles ?", options: ["Rien d'important", "Une compréhension approfondie du projet", "Un manque de confiance", "Une perte de temps inutile"], correctIndex: 1, explanation: "Anticiper les objections et y répondre avec assurance prouve une maîtrise réelle du sujet, au-delà d'un discours mémorisé." },
      { question: "Quel élément pèse souvent plus que la perfection du plan selon le module ?", options: ["Le nombre de pages du document", "La crédibilité de l'équipe", "La police de caractères utilisée", "La date de création de l'entreprise"], correctIndex: 1, explanation: "Les investisseurs misent souvent autant sur l'équipe capable d'exécuter que sur le plan lui-même." },
      { question: "Combien de temps un bon pitch a-t-il pour capter l'attention selon le module ?", options: ["Les 30 premières secondes", "Les 5 dernières minutes uniquement", "Aucun moment n'est critique", "Toute la présentation égale"], correctIndex: 0, explanation: "Les premières secondes sont cruciales pour capter immédiatement l'intérêt de l'auditoire." },
      { question: "Qu'est-ce que la 'traction' mentionnée dans un pitch ?", options: ["Le type de pneus utilisés", "Des preuves concrètes de progrès ou d'adoption du produit/service", "Le poids de l'entreprise", "Un terme sans rapport avec l'entrepreneuriat"], correctIndex: 1, explanation: "La traction désigne des indicateurs concrets (ventes, utilisateurs, partenariats) démontrant que le projet avance réellement." },
    ],
  },
];
