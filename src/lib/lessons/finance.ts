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
    quiz: [
      { question: "Quelles normes comptables utilisent généralement les sociétés publiques au Canada ?", options: ["NCECF", "IFRS", "Aucune norme n'est requise", "Les normes américaines uniquement"], correctIndex: 1, explanation: "Les sociétés publiques canadiennes doivent suivre les normes IFRS, harmonisées internationalement." },
      { question: "Que signifie la comptabilité d'exercice ?", options: ["Enregistrer les transactions seulement quand l'argent change de mains", "Enregistrer les revenus et dépenses au moment où ils surviennent", "Ne jamais enregistrer les dépenses", "Un système réservé aux grandes entreprises uniquement"], correctIndex: 1, explanation: "La comptabilité d'exercice enregistre les opérations économiques au moment où elles se produisent, indépendamment du paiement effectif." },
      { question: "Quel référentiel convient généralement à la majorité des PME canadiennes ?", options: ["NCECF", "IFRS exclusivement", "Aucun référentiel n'est nécessaire", "Les normes japonaises"], correctIndex: 0, explanation: "Les NCECF sont conçues pour être plus simples et moins coûteuses, adaptées aux entreprises privées non cotées." },
      { question: "Pourquoi le choix du référentiel comptable est-il important dès le départ ?", options: ["Ce n'est pas important", "Il a des implications sur la présentation financière et les besoins futurs de financement", "Il change automatiquement chaque année", "Il n'affecte que la couleur des rapports"], correctIndex: 1, explanation: "Une entreprise visant une croissance ou un financement externe doit anticiper les exigences associées au bon référentiel." },
      { question: "Quel principe comptable assure la cohérence dans le temps ?", options: ["Le principe de continuité d'exploitation et de cohérence des méthodes", "Le principe du hasard", "Aucun principe n'existe à ce sujet", "Le principe de l'improvisation"], correctIndex: 0, explanation: "La cohérence garantit que les mêmes méthodes comptables sont appliquées de manière constante d'une période à l'autre." },
      { question: "Que signifie l'acronyme NCECF ?", options: ["Normes comptables pour les entreprises à capital fermé", "Nouvelle commission d'évaluation comptable fédérale", "Norme canadienne d'exportation et de commerce fiscal", "Aucune signification reconnue"], correctIndex: 0, explanation: "Les NCECF sont les Normes comptables pour les entreprises à capital fermé, applicables aux PME privées au Canada." },
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
    quiz: [
      { question: "Que présente le bilan d'une entreprise ?", options: ["Sa performance sur une année complète uniquement", "Sa situation financière à un instant donné (actifs, passifs, capitaux propres)", "Uniquement ses dépenses publicitaires", "Le nombre d'employés"], correctIndex: 1, explanation: "Le bilan est une photographie de la situation financière d'une entreprise à une date précise." },
      { question: "Que montre l'état des résultats ?", options: ["La performance financière sur une période donnée", "Uniquement les actifs", "Le nombre de clients", "Les adresses des fournisseurs"], correctIndex: 0, explanation: "L'état des résultats récapitule revenus et dépenses sur une période pour déterminer le bénéfice net." },
      { question: "Quel principe fondamental régit chaque transaction comptable ?", options: ["Le principe de la partie double (débit = crédit)", "Le hasard", "L'absence de règles", "Le principe du premier arrivé premier servi"], correctIndex: 0, explanation: "Chaque transaction comptable doit toujours équilibrer un débit avec un crédit correspondant." },
      { question: "Quel état financier explique les variations de liquidités ?", options: ["Le bilan", "Le tableau des flux de trésorerie", "L'organigramme", "Le plan marketing"], correctIndex: 1, explanation: "Le tableau des flux de trésorerie détaille les entrées et sorties d'argent, complétant l'information du bilan et de l'état des résultats." },
      { question: "Comment le bénéfice net affecte-t-il le bilan ?", options: ["Il n'a aucun effet", "Il affecte les capitaux propres", "Il modifie uniquement les passifs", "Il supprime les actifs"], correctIndex: 1, explanation: "Le bénéfice net généré sur la période vient augmenter (ou diminuer en cas de perte) les capitaux propres au bilan." },
      { question: "Que représentent les passifs au bilan ?", options: ["Ce que possède l'entreprise", "Ce que l'entreprise doit (ses dettes et obligations)", "Le nombre d'employés", "Le chiffre d'affaires annuel"], correctIndex: 1, explanation: "Les passifs représentent les obligations financières de l'entreprise envers des tiers (fournisseurs, banques, etc.)." },
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
    quiz: [
      { question: "Quel est le seuil de revenus qui déclenche l'obligation de percevoir la TPS/TVQ ?", options: ["10 000$", "30 000$", "1 000 000$", "Il n'existe aucun seuil"], correctIndex: 1, explanation: "Au-delà de 30 000$ de revenus, une entreprise doit s'inscrire et percevoir la TPS et la TVQ." },
      { question: "Quels sont les deux paliers d'imposition au Canada ?", options: ["Municipal et national", "Fédéral et provincial", "International et local", "Aucun palier n'existe"], correctIndex: 1, explanation: "Le système fiscal canadien combine l'impôt fédéral (ARC) et l'impôt provincial (Revenu Québec au Québec)." },
      { question: "Que désigne le crédit RS&DE ?", options: ["Un crédit pour la recherche scientifique et le développement expérimental", "Une réduction pour les achats immobiliers", "Un crédit réservé aux organismes religieux", "Une taxe additionnelle"], correctIndex: 0, explanation: "Le crédit RS&DE encourage l'innovation en réduisant la charge fiscale des entreprises qui investissent en recherche et développement." },
      { question: "Que sont les retenues à la source mentionnées dans le module ?", options: ["Des dons volontaires", "Des prélèvements obligatoires sur le salaire des employés (impôt, RRQ, assurance-emploi)", "Une taxe sur les ventes uniquement", "Un type d'assurance privée optionnelle"], correctIndex: 1, explanation: "Les retenues à la source sont des montants légalement obligatoires que l'employeur prélève sur le salaire de ses employés." },
      { question: "Comment fonctionnent les taux d'imposition au Canada ?", options: ["Ils sont fixes peu importe le revenu", "Ils sont progressifs : plus le revenu est élevé, plus le taux marginal augmente", "Ils diminuent avec le revenu", "Ils n'existent pas pour les entreprises"], correctIndex: 1, explanation: "Le système fiscal canadien est progressif, avec des tranches de revenus imposées à des taux croissants." },
      { question: "Quel est le taux de TPS fédérale mentionné dans le module ?", options: ["5%", "15%", "0%", "25%"], correctIndex: 0, explanation: "La TPS (Taxe sur les produits et services) fédérale est de 5% au Canada." },
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
    quiz: [
      { question: "Que mesurent les ratios de liquidité ?", options: ["La capacité à honorer les obligations à court terme", "La popularité de l'entreprise", "Le nombre d'employés", "La couleur du logo"], correctIndex: 0, explanation: "Les ratios de liquidité évaluent si l'entreprise peut couvrir ses dettes et obligations à court terme avec ses actifs liquides." },
      { question: "Un ratio d'endettement élevé est-il toujours négatif ?", options: ["Oui, toujours", "Non, pas nécessairement s'il finance une croissance rentable", "C'est sans importance", "Cela dépend uniquement de la météo"], correctIndex: 1, explanation: "Un endettement élevé peut être stratégique s'il finance des investissements générant un rendement supérieur au coût de la dette." },
      { question: "Comment un ratio financier doit-il être interprété selon le module ?", options: ["Toujours isolément, sans contexte", "En contexte, en comparaison avec d'autres périodes ou entreprises", "Il n'a jamais d'utilité réelle", "Uniquement par les comptables"], correctIndex: 1, explanation: "Un ratio isolé a une valeur limitée ; la comparaison (tendance, secteur, budget) lui donne tout son sens." },
      { question: "Que mesure la marge bénéficiaire nette ?", options: ["Le nombre de clients", "La capacité de l'entreprise à générer des profits", "Le nombre d'employés", "La taille des bureaux"], correctIndex: 1, explanation: "La marge bénéficiaire nette est un ratio de rentabilité indiquant le pourcentage de profit net par rapport aux revenus." },
      { question: "Quel type de comparaison révèle les tendances d'une entreprise dans le temps ?", options: ["La comparaison historique avec les périodes précédentes", "Aucune comparaison n'est utile", "Uniquement la comparaison météo", "La comparaison avec des entreprises sans rapport"], correctIndex: 0, explanation: "Comparer les ratios actuels avec les périodes précédentes permet d'identifier des tendances d'amélioration ou de détérioration." },
      { question: "Que mesurent les ratios de solvabilité ?", options: ["La capacité à long terme de rembourser les dettes", "Le nombre de produits vendus", "La satisfaction des employés", "La qualité du service client"], correctIndex: 0, explanation: "Les ratios de solvabilité évaluent la viabilité financière à long terme et la capacité de remboursement des dettes." },
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
    quiz: [
      { question: "Qu'est-ce qu'un écart favorable dans le suivi budgétaire ?", options: ["Des revenus supérieurs ou des dépenses inférieures aux prévisions", "Toujours une perte financière", "Une erreur de calcul", "Un budget jamais respecté"], correctIndex: 0, explanation: "Un écart favorable signifie une performance meilleure que prévu, que ce soit en revenus ou en maîtrise des dépenses." },
      { question: "Qu'est-ce qu'un 'budget glissant' ?", options: ["Un budget figé pour 10 ans", "Un budget révisé régulièrement (ex. trimestriellement)", "Un budget qui n'existe pas", "Un budget réservé aux grandes entreprises uniquement"], correctIndex: 1, explanation: "Un budget glissant est régulièrement mis à jour pour rester pertinent face aux nouvelles informations disponibles." },
      { question: "Pourquoi comprendre la cause d'un écart importe-t-il plus que l'écart lui-même ?", options: ["Ce n'est pas important", "Car cela guide les actions correctives appropriées", "Parce que les écarts n'ont aucune signification", "Pour impressionner les actionnaires uniquement"], correctIndex: 1, explanation: "Identifier la cause profonde d'un écart permet de prendre des décisions de gestion pertinentes et ciblées." },
      { question: "Sur quelle période est généralement établi un budget d'exploitation ?", options: ["Une heure", "Annuelle, divisée par mois ou trimestre", "Un siècle", "Aucune période définie"], correctIndex: 1, explanation: "Le budget d'exploitation est généralement annuel, segmenté pour permettre un suivi régulier en cours d'année." },
      { question: "À quoi sert principalement un budget selon le module ?", options: ["Décorer un rapport annuel", "D'outil de pilotage pour orienter les décisions de gestion", "Remplacer la comptabilité", "Aucune utilité réelle"], correctIndex: 1, explanation: "Le budget guide les décisions de gestion en cours d'exercice, servant de référence pour mesurer la performance." },
      { question: "Qu'est-ce qui rend un budget rigide moins pertinent qu'un budget glissant ?", options: ["Rien, ils sont équivalents", "Il ne s'adapte pas aux changements et nouvelles informations", "Il coûte plus cher à produire", "Il est toujours plus précis"], correctIndex: 1, explanation: "Un budget rigide ne tient pas compte de l'évolution des conditions, contrairement à un budget révisé régulièrement." },
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
    quiz: [
      { question: "Quel régime québécois s'ajoute aux retenues fédérales sur la paie ?", options: ["Le RQAP (Régime québécois d'assurance parentale)", "L'assurance auto", "L'assurance habitation", "Le permis de conduire"], correctIndex: 0, explanation: "Le RQAP est une retenue spécifique au Québec en plus des cotisations fédérales habituelles." },
      { question: "À quel taux sont généralement payées les heures supplémentaires au Québec ?", options: ["100%", "150%", "50%", "200%"], correctIndex: 1, explanation: "Les heures supplémentaires au-delà de 40h/semaine sont généralement payées à 150% du taux horaire régulier." },
      { question: "Qu'est-ce que le RRQ ?", options: ["Le Régime de rentes du Québec", "Un type d'assurance auto", "Une taxe municipale", "Un syndicat"], correctIndex: 0, explanation: "Le RRQ (Régime de rentes du Québec) est un régime public de pension auquel cotisent employeurs et employés." },
      { question: "Les retenues à la source sont-elles optionnelles pour l'employeur ?", options: ["Oui, c'est au choix de l'employeur", "Non, elles sont une obligation légale stricte", "Seulement pour les grandes entreprises", "Seulement les vendredis"], correctIndex: 1, explanation: "Les retenues à la source constituent une obligation légale incontournable pour tout employeur." },
      { question: "Quel avantage social est devenu un facteur clé d'attraction de talents selon le module ?", options: ["Le télétravail et les congés de santé mentale", "Le stationnement gratuit uniquement", "Aucun avantage n'a d'importance", "Le café gratuit uniquement"], correctIndex: 0, explanation: "La flexibilité (télétravail) et le bien-être (santé mentale) sont devenus des critères importants pour attirer et retenir les employés." },
      { question: "Que régissent les normes minimales du travail provinciales ?", options: ["Uniquement les vacances scolaires", "Les conditions minimales de travail (salaire, heures, congés)", "Les impôts fédéraux", "Le prix de l'essence"], correctIndex: 1, explanation: "Les normes du travail établissent un plancher légal pour les conditions d'emploi que tout employeur doit respecter." },
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
    quiz: [
      { question: "Quels sont les deux logiciels comptables les plus utilisés par les PME canadiennes selon le module ?", options: ["QuickBooks et Sage", "Photoshop et Illustrator", "Word et PowerPoint", "Chrome et Firefox"], correctIndex: 0, explanation: "QuickBooks et Sage sont identifiés comme les solutions comptables dominantes pour les PME au Canada." },
      { question: "Que permet l'automatisation de la facturation ?", options: ["Générer des factures récurrentes et envoyer des rappels automatiques", "Supprimer tous les clients", "Augmenter les prix automatiquement", "Remplacer les employés"], correctIndex: 0, explanation: "L'automatisation simplifie la gestion des factures récurrentes et accélère le suivi des paiements en retard." },
      { question: "Que doit-on configurer en premier dans un logiciel comptable ?", options: ["Le plan comptable", "Les vacances des employés", "La musique d'ambiance", "Le logo uniquement"], correctIndex: 0, explanation: "La configuration du plan comptable est l'étape fondatrice qui structure toutes les opérations comptables futures." },
      { question: "Ces logiciels comptables remplacent-ils complètement un comptable professionnel ?", options: ["Oui, totalement", "Non, ils réduisent son temps de travail mais ne le remplacent pas", "Ils n'ont aucun lien avec un comptable", "Ils sont interdits avec un comptable"], correctIndex: 1, explanation: "Ces outils facilitent le travail comptable mais l'expertise professionnelle d'un comptable reste précieuse pour l'analyse et la conformité." },
      { question: "Quels états financiers ces logiciels génèrent-ils automatiquement ?", options: ["Le bilan et l'état des résultats", "Uniquement des cartes de vœux", "Le menu du restaurant", "Aucun état financier"], correctIndex: 0, explanation: "Ces logiciels produisent automatiquement les états financiers de base à partir des données saisies." },
      { question: "Quelles taxes doivent être configurées lors de l'installation au Québec ?", options: ["TPS/TVQ", "Aucune taxe n'est nécessaire", "Uniquement les droits de douane", "La taxe sur l'essence"], correctIndex: 0, explanation: "La configuration de la TPS et de la TVQ est essentielle pour une facturation conforme aux exigences fiscales québécoises." },
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
    quiz: [
      { question: "Que doit démontrer l'étudiant lors de l'examen final, en plus du calcul technique ?", options: ["Rien d'autre n'est requis", "La capacité d'interprétation des chiffres financiers", "Sa connaissance de la météo", "Sa capacité à dessiner"], correctIndex: 1, explanation: "L'examen évalue à la fois la compétence technique et la capacité à interpréter les résultats pour formuler des recommandations." },
      { question: "Quel type de cas est présenté lors de l'examen final ?", options: ["Un cas d'entreprise complet intégrant plusieurs compétences", "Une simple question à choix unique", "Aucun cas pratique", "Un jeu sans rapport avec la finance"], correctIndex: 0, explanation: "L'examen final intègre un cas pratique complet nécessitant l'application combinée de toutes les compétences du programme." },
      { question: "Que reçoit l'étudiant à la réussite de l'examen ?", options: ["Le certificat ARCADINS en gestion financière et comptabilité", "Rien de spécifique", "Un diplôme universitaire international", "Une amende"], correctIndex: 0, explanation: "Le certificat ARCADINS atteste officiellement de la maîtrise des compétences du programme." },
      { question: "Le certificat délivré est-il reconnu par des employeurs ?", options: ["Non, jamais", "Oui, par le réseau d'employeurs partenaires d'ARCADINS", "Uniquement à l'étranger", "Seulement par la famille de l'étudiant"], correctIndex: 1, explanation: "Le certificat est conçu pour être reconnu et valorisé par les employeurs partenaires du réseau ARCADINS." },
      { question: "L'examen évalue-t-il uniquement la mémorisation théorique ?", options: ["Oui, exclusivement", "Non, il évalue l'application pratique des compétences", "Il n'évalue rien de précis", "Uniquement la vitesse d'écriture"], correctIndex: 1, explanation: "L'objectif est de vérifier la capacité à appliquer concrètement les connaissances dans un contexte professionnel réaliste." },
      { question: "Quelles compétences sont intégrées dans le cas pratique de l'examen final ?", options: ["États financiers, ratios, budget et obligations fiscales", "Uniquement le calcul mental", "Le dessin technique", "La gestion des réseaux sociaux"], correctIndex: 0, explanation: "Le cas pratique final couvre l'ensemble du programme : production d'états financiers, ratios, budget et fiscalité." },
    ],
  },
];
