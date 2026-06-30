import type { Lesson } from "@/types/lesson";

export const financeLessons: Lesson[] = [
  {
    title: "Principes comptables canadiens (NCECF/IFRS)",
    objectives: [
      "Distinguer les normes NCECF et IFRS",
      "Comprendre les principes comptables fondamentaux",
      "Identifier quel référentiel s'applique selon le type d'entreprise",
    ],
    content: [
      "Au Canada, les entreprises privées utilisent généralement les Normes comptables pour les entreprises à capital fermé (NCECF), plus simples et moins coûteuses à appliquer. Les sociétés publiques doivent suivre les normes IFRS (International Financial Reporting Standards), harmonisées à l'échelle internationale.",
      "Les principes comptables fondamentaux incluent la comptabilité d'exercice (les revenus et dépenses sont enregistrés quand ils surviennent, pas quand l'argent change de mains), la continuité d'exploitation, la prudence et la cohérence dans l'application des méthodes d'une période à l'autre.",
      "Le choix du référentiel comptable a des implications sur la présentation des états financiers, la valorisation des actifs et les obligations de divulgation. Une entreprise en croissance visant un financement externe doit anticiper ces exigences dès le départ.",
    ],
    keyTakeaways: [
      "Le NCECF convient à la majorité des PME canadiennes non cotées en bourse",
      "La comptabilité d'exercice diffère fondamentalement de la simple gestion de trésorerie",
      "Le choix de référentiel doit anticiper les besoins futurs de financement",
    ],
    resources: [
      { label: "CPA Canada — Normes comptables", url: "https://www.cpacanada.ca" },
    ],
  },
  {
    title: "Tenue de livres et états financiers",
    objectives: [
      "Maîtriser le cycle comptable de base",
      "Produire un bilan et un état des résultats simples",
      "Comprendre le lien entre les trois états financiers principaux",
    ],
    content: [
      "Le cycle comptable comprend l'enregistrement des transactions (journal), leur classification (grand livre), la balance de vérification, les ajustements de fin de période et la production des états financiers finaux. Chaque transaction respecte le principe de la partie double : tout débit a un crédit correspondant.",
      "Le bilan présente la situation financière à un instant donné : actifs (ce que possède l'entreprise), passifs (ce qu'elle doit) et capitaux propres (la différence). L'état des résultats montre la performance sur une période : revenus moins dépenses égale le bénéfice net.",
      "Les trois états financiers principaux — bilan, état des résultats et tableau des flux de trésorerie — sont interconnectés : le bénéfice net de l'état des résultats affecte les capitaux propres du bilan, et les flux de trésorerie expliquent les variations de liquidités non visibles dans les deux autres états.",
    ],
    keyTakeaways: [
      "Chaque transaction comptable respecte toujours l'équilibre débit-crédit",
      "Le bilan est une photographie, l'état des résultats est un film sur une période",
      "Les trois états financiers doivent être lus ensemble pour une vision complète",
    ],
    resources: [
      { label: "QuickBooks — Guide de la comptabilité pour PME", url: "https://quickbooks.intuit.com/ca/resources" },
    ],
  },
  {
    title: "Fiscalité canadienne (particuliers & entreprises)",
    objectives: [
      "Comprendre les paliers d'imposition au Canada (fédéral, provincial)",
      "Connaître les principales obligations fiscales des entreprises",
      "Identifier les crédits et déductions courants",
    ],
    content: [
      "Le système fiscal canadien fonctionne sur deux paliers : l'impôt fédéral, géré par l'Agence du revenu du Canada (ARC), et l'impôt provincial, géré par Revenu Québec dans le cas du Québec. Les taux d'imposition sont progressifs : plus le revenu est élevé, plus le taux marginal augmente.",
      "Les entreprises doivent percevoir et remettre la TPS (5%) et la TVQ (9,975% au Québec) au-delà d'un seuil de revenus de 30 000$, produire des déclarations de revenus annuelles et effectuer des retenues à la source si elles ont des employés (impôt, RRQ, assurance-emploi).",
      "Plusieurs crédits et déductions réduisent la charge fiscale : le crédit d'impôt à la recherche scientifique et développement expérimental (RS&DE), les déductions pour amortissement d'actifs, et divers crédits provinciaux selon le secteur d'activité.",
    ],
    keyTakeaways: [
      "Le seuil de 30 000$ de revenus déclenche l'obligation de percevoir TPS/TVQ",
      "Les retenues à la source sont une obligation légale stricte avec pénalités en cas de manquement",
      "Les crédits RS&DE représentent une opportunité souvent sous-utilisée par les PME innovantes",
    ],
    resources: [
      { label: "Agence du revenu du Canada", url: "https://www.canada.ca/fr/agence-revenu.html" },
      { label: "Revenu Québec", url: "https://www.revenuquebec.ca" },
    ],
  },
  {
    title: "Analyse financière et ratios",
    objectives: [
      "Calculer et interpréter les principaux ratios financiers",
      "Évaluer la rentabilité, la liquidité et la solvabilité d'une entreprise",
      "Utiliser l'analyse financière pour la prise de décision",
    ],
    content: [
      "Les ratios de rentabilité (marge bénéficiaire nette, rendement de l'actif) mesurent la capacité de l'entreprise à générer des profits. Les ratios de liquidité (ratio de fonds de roulement, ratio rapide) évaluent la capacité à honorer les obligations à court terme.",
      "Les ratios de solvabilité (ratio d'endettement, couverture des intérêts) mesurent la capacité à long terme de l'entreprise à rembourser ses dettes. Un ratio d'endettement élevé n'est pas nécessairement négatif s'il finance une croissance rentable.",
      "L'analyse financière prend tout son sens en comparaison : avec les périodes précédentes (tendance), avec des entreprises similaires du secteur (benchmark), ou avec les objectifs budgétés. Un ratio isolé sans contexte de comparaison a une valeur limitée.",
    ],
    keyTakeaways: [
      "Chaque ratio doit être interprété en contexte, jamais isolément",
      "La comparaison historique révèle les tendances plus utiles que les chiffres ponctuels",
      "Un niveau d'endettement élevé n'est problématique que s'il dépasse la capacité de remboursement",
    ],
    resources: [
      { label: "Investopedia — Ratios financiers (en anglais)", url: "https://www.investopedia.com/financial-ratios-4689817" },
    ],
  },
  {
    title: "Planification budgétaire",
    objectives: [
      "Construire un budget d'exploitation annuel",
      "Suivre les écarts entre budget et résultats réels",
      "Ajuster les prévisions en cours d'exercice",
    ],
    content: [
      "Un budget d'exploitation projette les revenus et dépenses attendus sur une période, généralement annuelle, divisée par mois ou trimestre. Il sert de référence pour mesurer la performance réelle et orienter les décisions de gestion en cours d'année.",
      "Le suivi des écarts compare régulièrement les résultats réels au budget prévu, identifiant les écarts favorables (revenus supérieurs ou dépenses inférieures aux prévisions) et défavorables. Comprendre la cause de chaque écart guide les actions correctives.",
      "La planification budgétaire ne doit pas être figée : un budget glissant, révisé trimestriellement selon les nouvelles informations disponibles, reste plus pertinent qu'un budget rigide établi une fois par an et jamais révisé.",
    ],
    keyTakeaways: [
      "Le budget est un outil de pilotage, pas une prédiction figée",
      "Comprendre la cause d'un écart importe plus que l'écart lui-même",
      "Réviser le budget régulièrement le maintient pertinent face aux réalités changeantes",
    ],
    resources: [
      { label: "BDC — Modèles de budget pour PME", url: "https://www.bdc.ca/fr/articles-outils" },
    ],
  },
  {
    title: "Paie et avantages sociaux",
    objectives: [
      "Comprendre les obligations légales de la paie au Canada",
      "Calculer les retenues obligatoires sur le salaire",
      "Connaître les principaux avantages sociaux offerts au Québec",
    ],
    content: [
      "Tout employeur canadien doit effectuer des retenues obligatoires sur chaque paie : impôt fédéral et provincial, cotisations au Régime de rentes du Québec (RRQ) ou Régime de pensions du Canada (RPC), assurance-emploi (AE) et, au Québec, le Régime québécois d'assurance parentale (RQAP).",
      "Le calcul de la paie doit aussi tenir compte des heures supplémentaires (généralement payées à 150% au-delà de 40 heures/semaine au Québec), des congés payés (vacances, jours fériés) et des normes minimales du travail provinciales.",
      "Les avantages sociaux courants au Québec incluent l'assurance collective (santé, dentaire, invalidité), les régimes de retraite (REER collectif), et de plus en plus, des avantages flexibles comme le télétravail ou les congés de santé mentale, devenus des facteurs clés d'attraction de talents.",
    ],
    keyTakeaways: [
      "Les retenues à la source sont une obligation légale stricte, jamais optionnelle",
      "Les normes minimales du travail varient par province et doivent être respectées scrupuleusement",
      "Les avantages sociaux sont devenus un facteur compétitif majeur dans l'attraction de talents",
    ],
    resources: [
      { label: "CNESST — Normes du travail au Québec", url: "https://www.cnesst.gouv.qc.ca" },
    ],
  },
  {
    title: "Logiciels comptables (QuickBooks, Sage)",
    objectives: [
      "Configurer un dossier comptable dans QuickBooks ou Sage",
      "Automatiser la facturation et le suivi des comptes clients",
      "Générer des rapports financiers à partir d'un logiciel comptable",
    ],
    content: [
      "QuickBooks et Sage sont les deux logiciels comptables les plus utilisés par les PME canadiennes. Leur configuration initiale inclut la création du plan comptable, la liaison aux comptes bancaires et la configuration des taxes applicables (TPS/TVQ).",
      "L'automatisation de la facturation permet de générer des factures récurrentes, suivre les comptes clients en souffrance et envoyer des rappels automatiques. Le suivi des comptes à payer fonctionne de manière similaire pour les obligations envers les fournisseurs.",
      "Ces logiciels génèrent automatiquement les états financiers de base (bilan, état des résultats) et permettent l'export direct vers un comptable ou pour la production des déclarations fiscales, réduisant considérablement le temps de gestion administrative.",
    ],
    keyTakeaways: [
      "Une configuration initiale soignée du plan comptable facilite tout le travail futur",
      "L'automatisation de la facturation réduit les délais de paiement clients",
      "Ces outils ne remplacent pas un comptable mais réduisent considérablement son temps de travail",
    ],
    resources: [
      { label: "QuickBooks Canada", url: "https://quickbooks.intuit.com/ca" },
      { label: "Sage Canada", url: "https://www.sage.com/fr-ca" },
    ],
  },
  {
    title: "Examen final & certification",
    objectives: [
      "Démontrer la maîtrise des compétences comptables et financières acquises",
      "Résoudre un cas pratique complet de gestion financière",
      "Obtenir le certificat ARCADINS en gestion financière et comptabilité",
    ],
    content: [
      "L'examen final présente un cas d'entreprise complet nécessitant l'application de l'ensemble des compétences du programme : production d'états financiers, calcul de ratios, préparation d'un budget et identification des obligations fiscales applicables.",
      "Les candidats doivent démontrer non seulement la capacité technique de calcul, mais aussi la capacité d'interprétation : que signifient ces chiffres pour la santé financière de l'entreprise, et quelles recommandations en découlent.",
      "À la réussite de l'examen, le certificat ARCADINS en gestion financière et comptabilité est délivré, reconnu par les employeurs partenaires comme preuve de compétence pratique applicable immédiatement en milieu de travail.",
    ],
    keyTakeaways: [
      "L'examen évalue l'application pratique, pas uniquement la mémorisation théorique",
      "Savoir interpréter les chiffres est aussi important que savoir les calculer",
      "Le certificat délivré est reconnu par le réseau d'employeurs partenaires d'ARCADINS",
    ],
    resources: [],
  },
];
