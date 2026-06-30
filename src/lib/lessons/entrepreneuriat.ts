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
  },
];
