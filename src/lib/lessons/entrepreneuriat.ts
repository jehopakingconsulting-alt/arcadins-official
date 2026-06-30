import type { Lesson } from "@/types/lesson";

export const entrepreneuriatLessons: Lesson[] = [
  {
    title: "Écosystème entrepreneurial canadien",
    objectives: [
      "Identifier les principaux acteurs de l'écosystème entrepreneurial au Canada",
      "Comprendre les structures juridiques d'entreprise disponibles",
      "Connaître les ressources d'accompagnement pour nouveaux arrivants",
    ],
    content: [
      "L'écosystème entrepreneurial canadien comprend des incubateurs (comme Futurpreneur, MaRS Discovery District), des accélérateurs, des organismes de développement économique régionaux et des chambres de commerce qui offrent mentorat et réseautage aux entrepreneurs.",
      "Les structures juridiques courantes incluent l'entreprise individuelle (simple mais responsabilité illimitée), la société par actions (incorporation, responsabilité limitée) et la société en nom collectif. Le choix dépend du niveau de risque, des besoins de financement et de la structure fiscale souhaitée.",
      "Plusieurs programmes ciblent spécifiquement les nouveaux arrivants entrepreneurs : le Programme d'entrepreneurs immigrants du Québec, les services de Futurpreneur Canada offrant prêts et mentorat, et les centres d'aide aux entreprises (CLD, SADC) présents dans chaque région.",
    ],
    keyTakeaways: [
      "L'accompagnement existe à chaque étape — il ne faut jamais entreprendre seul",
      "Le choix de structure juridique a des conséquences fiscales et légales durables",
      "Les nouveaux arrivants ont accès à des ressources d'accompagnement spécifiques",
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
      "Appliquer des méthodes de génération d'idées d'affaires",
      "Réaliser une étude de marché simplifiée",
      "Tester une hypothèse de concept avant l'investissement",
    ],
    content: [
      "La génération d'idées d'affaires part souvent de l'observation d'un problème non résolu plutôt que de la recherche d'une idée originale. La méthode du 'Jobs to be Done' aide à identifier ce que les clients cherchent réellement à accomplir, au-delà du produit lui-même.",
      "Une étude de marché simplifiée inclut l'analyse de la concurrence, l'estimation de la taille du marché cible et des entretiens directs avec des clients potentiels. Cette étape évite d'investir temps et argent dans une idée sans demande réelle.",
      "Le Lean Startup propose de valider rapidement une hypothèse avec un produit minimum viable (MVP) plutôt que de développer une solution complète avant de tester le marché. Échouer rapidement et à faible coût permet d'itérer vers une meilleure solution.",
    ],
    keyTakeaways: [
      "Une bonne idée résout un problème réel observé, pas un problème supposé",
      "Parler directement aux clients potentiels vaut plus que des sondages génériques",
      "Le MVP permet de tester le marché avant un investissement majeur",
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
      "Construire des projections financières réalistes",
      "Utiliser le Business Model Canvas",
    ],
    content: [
      "Un plan d'affaires complet comprend : résumé exécutif, description de l'entreprise, analyse de marché, stratégie marketing, plan opérationnel, structure organisationnelle et projections financières. Il sert à la fois de feuille de route interne et de document pour convaincre des investisseurs ou prêteurs.",
      "Les projections financières doivent inclure un état des résultats prévisionnel, un bilan et un tableau de flux de trésorerie sur 3 ans minimum. Le point mort (seuil de rentabilité) indique le volume de ventes nécessaire pour couvrir tous les coûts fixes et variables.",
      "Le Business Model Canvas offre une vue synthétique en 9 blocs : segments de clients, proposition de valeur, canaux, relation client, sources de revenus, ressources clés, activités clés, partenariats clés et structure de coûts. Il permet d'itérer rapidement sur le modèle d'affaires.",
    ],
    keyTakeaways: [
      "Les projections financières doivent être conservatrices, pas optimistes",
      "Le point mort est l'indicateur le plus important pour évaluer la viabilité",
      "Le Business Model Canvas facilite les itérations rapides avant le plan complet",
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
      "Comprendre les différences entre dette, équité et subvention",
      "Préparer un dossier de financement convaincant",
    ],
    content: [
      "Les options de financement incluent les prêts bancaires traditionnels, le financement participatif (crowdfunding), les investisseurs providentiels (anges) et de capital de risque, ainsi que des subventions gouvernementales fédérales et provinciales spécifiques à certains secteurs ou populations.",
      "Le financement par dette (prêt) doit être remboursé avec intérêt mais ne dilue pas la propriété de l'entreprise. Le financement par équité (investisseurs) n'exige pas de remboursement immédiat mais cède une partie de la propriété et du contrôle décisionnel.",
      "Un dossier de financement convaincant présente un plan d'affaires solide, des projections financières réalistes, une équipe compétente et une utilisation claire des fonds demandés. Les prêteurs et investisseurs évaluent autant la crédibilité de l'entrepreneur que la qualité du projet.",
    ],
    keyTakeaways: [
      "Le type de financement choisi doit correspondre au stade de développement de l'entreprise",
      "La dette préserve le contrôle mais impose un remboursement fixe",
      "Un dossier solide démontre la crédibilité de l'entrepreneur autant que la qualité du projet",
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
      "Connaître les exigences fiscales et d'enregistrement",
      "Identifier les contrats essentiels pour protéger son entreprise",
    ],
    content: [
      "Toute entreprise au Canada doit s'enregistrer auprès du registre des entreprises provincial, obtenir un numéro d'entreprise fédéral (NE) auprès de l'Agence du revenu du Canada, et respecter les obligations fiscales (TPS/TVQ selon le seuil de revenus).",
      "Les obligations varient selon la structure juridique : une société par actions doit tenir des registres corporatifs, organiser des assemblées annuelles et produire des déclarations fiscales distinctes de celles des actionnaires.",
      "Les contrats essentiels incluent les conditions de service avec les clients, les ententes de confidentialité avec les employés et partenaires, et les contrats de partenariat clairement définis. Un avocat d'affaires devrait réviser ces documents avant leur mise en application.",
    ],
    keyTakeaways: [
      "L'enregistrement et la conformité fiscale sont obligatoires dès le démarrage",
      "La structure juridique choisie détermine les obligations administratives continues",
      "Investir dans des contrats solides dès le début évite des litiges coûteux plus tard",
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
      "Construire les premières relations clients durables",
    ],
    content: [
      "Une proposition de valeur claire répond à trois questions : quel problème spécifique l'entreprise résout-elle, pour qui, et pourquoi mieux que les alternatives existantes. Sans cette clarté, tout effort marketing devient inefficace.",
      "Pour une jeune entreprise à budget limité, le marketing de contenu, le bouche-à-oreille structuré (programmes de référencement) et le réseautage local restent souvent plus rentables que la publicité payante à grande échelle.",
      "Les premiers clients sont les plus précieux : leur retour direct permet d'ajuster le produit, et leur satisfaction génère des recommandations qui réduisent le coût d'acquisition pour les clients suivants. Un excellent service client compense souvent un budget marketing limité.",
    ],
    keyTakeaways: [
      "Une proposition de valeur floue rend tout marketing inefficace",
      "Les canaux à faible coût (contenu, réseau, recommandation) sont souvent les plus rentables au démarrage",
      "Les premiers clients sont une source d'apprentissage autant que de revenu",
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
      "Comprendre les types de protection de la propriété intellectuelle",
      "Évaluer quand protéger une innovation",
      "Connaître le processus de dépôt de marque ou brevet au Canada",
    ],
    content: [
      "La propriété intellectuelle se divise en plusieurs catégories : les brevets protègent les inventions techniques, les marques de commerce protègent les noms et logos, le droit d'auteur protège les œuvres créatives, et les secrets commerciaux protègent les informations confidentielles non divulguées.",
      "Toute innovation ne nécessite pas un brevet — le coût et la complexité du processus doivent être mis en balance avec la valeur stratégique réelle de la protection. Pour beaucoup de jeunes entreprises, protéger la marque est prioritaire avant de breveter un produit.",
      "L'Office de la propriété intellectuelle du Canada (OPIC) gère l'enregistrement des marques et brevets. Le processus peut prendre plusieurs mois à plusieurs années selon la complexité, et un agent en brevets ou marques est souvent recommandé pour naviguer la procédure.",
    ],
    keyTakeaways: [
      "Le type de protection à privilégier dépend de la nature de l'innovation",
      "Tout n'a pas besoin d'être brevecté — l'analyse coût-bénéfice est essentielle",
      "L'enregistrement de marque est souvent la priorité la plus accessible pour une jeune entreprise",
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
      "Répondre aux questions critiques d'un jury d'investisseurs",
      "Démontrer la viabilité et la crédibilité de son projet",
    ],
    content: [
      "Le pitch final condense le projet entrepreneurial en 10 minutes maximum : problème, solution, marché cible, modèle d'affaires, traction (si applicable), équipe et demande de financement ou de partenariat. Chaque minute doit être utilisée pour capter et maintenir l'attention.",
      "Un jury d'investisseurs pose généralement des questions sur la taille réelle du marché, la défensabilité face à la concurrence, l'utilisation prévue des fonds et la crédibilité de l'équipe à exécuter le plan présenté.",
      "La préparation aux questions difficiles est aussi importante que le pitch lui-même : anticiper les objections sur les risques, la concurrence ou les hypothèses financières démontre une compréhension approfondie du projet, pas seulement un discours mémorisé.",
    ],
    keyTakeaways: [
      "Un bon pitch capte l'attention dès les 30 premières secondes",
      "La préparation aux questions difficiles compte autant que la présentation elle-même",
      "La crédibilité de l'équipe pèse souvent plus que la perfection du plan",
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
