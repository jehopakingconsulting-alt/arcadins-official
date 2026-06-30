import type { Lesson } from "@/types/lesson";

export const rhLessons: Lesson[] = [
  {
    title: "Droit du travail au Québec et au Canada",
    objectives: [
      "Comprendre les normes minimales du travail au Québec",
      "Distinguer les compétences fédérales et provinciales en droit du travail",
      "Identifier les obligations légales de l'employeur",
    ],
    content: [
      "La Loi sur les normes du travail du Québec établit les seuils minimaux : salaire minimum, durée maximale de la semaine de travail avant heures supplémentaires (40h), congés annuels (minimum 2 semaines après un an de service) et préavis de fin d'emploi selon l'ancienneté.",
      "Certains secteurs relèvent de la compétence fédérale (banques, télécommunications, transport interprovincial) et suivent le Code canadien du travail plutôt que les normes provinciales. Il est essentiel d'identifier la juridiction applicable avant toute décision RH.",
      "L'employeur a l'obligation légale de fournir un milieu de travail sans harcèlement, de respecter les droits relatifs à la vie privée des employés, et de se conformer aux dispositions sur l'équité salariale, particulièrement strictes au Québec.",
    ],
    keyTakeaways: [
      "Les normes minimales du travail sont un plancher légal, pas une suggestion",
      "Identifier la juridiction fédérale vs provinciale est la première étape de toute analyse RH",
      "L'équité salariale est une obligation proactive, pas seulement réactive en cas de plainte",
    ],
    resources: [
      { label: "CNESST — Normes du travail", url: "https://www.cnesst.gouv.qc.ca" },
      { label: "Programme du travail — Gouvernement du Canada", url: "https://www.canada.ca/fr/emploi-developpement-social/programmes/travail.html" },
    ],
  },
  {
    title: "Recrutement et sélection",
    objectives: [
      "Rédiger une description de poste claire et attractive",
      "Structurer un processus d'entrevue structuré et équitable",
      "Éviter les biais discriminatoires dans la sélection",
    ],
    content: [
      "Une description de poste efficace précise les responsabilités principales, les compétences requises (distinguées des compétences souhaitables), les conditions de travail et la fourchette salariale — cette transparence salariale devient une attente croissante des candidats.",
      "Un processus d'entrevue structuré utilise les mêmes questions de base pour tous les candidats à un poste donné, facilitant une comparaison équitable. Les questions comportementales (méthode STAR) prédisent mieux la performance future que les questions hypothétiques.",
      "La loi interdit toute discrimination basée sur l'origine ethnique, le sexe, l'âge, la religion ou le handicap durant le recrutement. Les questions sur la situation familiale, l'âge précis ou le pays d'origine doivent être évitées sauf si directement pertinentes au poste.",
    ],
    keyTakeaways: [
      "La transparence salariale dans les affichages devient une norme attendue",
      "Un processus structuré réduit les biais et améliore la qualité des décisions d'embauche",
      "Certaines questions d'entrevue sont légalement interdites, peu importe l'intention",
    ],
    resources: [
      { label: "Commission des droits de la personne — Embauche sans discrimination", url: "https://www.cdpdj.qc.ca" },
    ],
  },
  {
    title: "Gestion de la performance",
    objectives: [
      "Concevoir un système d'évaluation de la performance équitable",
      "Donner une rétroaction constructive et actionnable",
      "Gérer les situations de sous-performance avec rigueur et respect",
    ],
    content: [
      "Un système d'évaluation efficace repose sur des objectifs clairs établis en début de période (souvent selon la méthode SMART), un suivi régulier plutôt qu'une seule évaluation annuelle, et des critères mesurables connus à l'avance par l'employé.",
      "La rétroaction constructive suit généralement une structure factuelle : décrire le comportement observé, son impact, et la solution attendue, plutôt que de juger la personnalité de l'employé. Le feedback continu est plus efficace que l'attente d'une évaluation formelle annuelle.",
      "La gestion de la sous-performance doit être documentée rigoureusement : avertissements écrits, plans d'amélioration avec échéances claires, et suivi systématique. Cette documentation protège l'organisation en cas de contestation tout en donnant une chance réelle d'amélioration à l'employé.",
    ],
    keyTakeaways: [
      "Le feedback continu prévient les surprises lors de l'évaluation formelle",
      "La rétroaction doit toujours porter sur le comportement observable, jamais sur la personne",
      "La documentation rigoureuse protège autant l'employeur que l'employé",
    ],
    resources: [
      { label: "CPHR Canada — Ressources en gestion de la performance", url: "https://cphr.ca" },
    ],
  },
  {
    title: "Rémunération et avantages sociaux",
    objectives: [
      "Concevoir une structure salariale compétitive et équitable",
      "Comprendre les composantes de la rémunération globale",
      "Évaluer les avantages sociaux les plus valorisés par les employés",
    ],
    content: [
      "Une structure salariale compétitive s'appuie sur des données de marché (enquêtes salariales sectorielles) et sur une évaluation interne de l'équité entre postes comparables. L'équité interne et la compétitivité externe doivent être équilibrées.",
      "La rémunération globale inclut le salaire de base, les primes et bonis, les avantages sociaux (assurances, REER), et les avantages indirects (flexibilité, télétravail, développement professionnel). Les candidats évaluent désormais l'ensemble du package, pas seulement le salaire.",
      "Les enquêtes récentes montrent que la flexibilité du travail, l'équilibre vie-travail et la santé mentale sont devenus des critères aussi importants que le salaire pour attirer et retenir les talents, particulièrement chez les jeunes générations.",
    ],
    keyTakeaways: [
      "L'équité interne et la compétitivité externe sont les deux piliers d'une structure salariale saine",
      "La rémunération globale dépasse largement le seul salaire de base",
      "La flexibilité de travail rivalise désormais avec le salaire comme facteur d'attraction",
    ],
    resources: [
      { label: "Emploi-Québec — Données salariales par secteur", url: "https://www.quebec.ca/emploi" },
    ],
  },
  {
    title: "Formation et développement des compétences",
    objectives: [
      "Identifier les besoins de formation d'une organisation",
      "Concevoir un plan de développement des compétences",
      "Mesurer l'impact d'un programme de formation",
    ],
    content: [
      "L'identification des besoins de formation combine l'analyse des écarts de compétences actuels, les objectifs stratégiques futurs de l'organisation et les aspirations de développement individuelles des employés. Une approche purement réactive néglige souvent les compétences critiques pour l'avenir.",
      "Un plan de développement combine généralement formation formelle (cours, certifications), apprentissage social (mentorat, coaching) et apprentissage en situation de travail (rotation de postes, projets stretch). Le modèle 70-20-10 illustre cette répartition idéale.",
      "Mesurer l'impact d'une formation va au-delà de la satisfaction immédiate des participants : il faut évaluer le transfert réel des compétences au travail et, idéalement, l'impact sur des indicateurs de performance business concrets.",
    ],
    keyTakeaways: [
      "Les besoins de formation doivent anticiper l'avenir, pas seulement corriger le présent",
      "L'apprentissage informel (mentorat, projets) est souvent plus impactant que la formation formelle seule",
      "Mesurer la satisfaction d'une formation ne suffit pas — il faut mesurer le transfert réel au travail",
    ],
    resources: [
      { label: "Commission des partenaires du marché du travail — Loi du 1%", url: "https://www.cpmt.gouv.qc.ca" },
    ],
  },
  {
    title: "Relations de travail et médiation",
    objectives: [
      "Comprendre le cadre des relations syndicales-patronales au Québec",
      "Appliquer des techniques de résolution de conflits en milieu de travail",
      "Gérer un grief ou une plainte avec rigueur procédurale",
    ],
    content: [
      "Le Québec a un taux de syndicalisation parmi les plus élevés en Amérique du Nord. Le Code du travail encadre les relations syndicales-patronales : accréditation syndicale, négociation collective, droit de grève et de lock-out, et mécanismes d'arbitrage des griefs.",
      "La résolution de conflits en milieu de travail privilégie d'abord le dialogue direct entre les parties, puis la médiation par un tiers neutre si nécessaire, avant de recourir à des processus plus formels comme l'arbitrage ou les recours légaux.",
      "Un grief doit être traité selon une procédure rigoureuse définie dans la convention collective : délais stricts, documentation complète, et implication appropriée des représentants syndicaux et patronaux à chaque étape du processus.",
    ],
    keyTakeaways: [
      "Le Québec a un environnement de relations de travail fortement syndiqué comparé au reste du Canada",
      "La résolution informelle rapide est toujours préférable aux processus formels longs et coûteux",
      "Le non-respect des délais procéduraux peut invalider une décision même fondée",
    ],
    resources: [
      { label: "Tribunal administratif du travail du Québec", url: "https://www.tat.gouv.qc.ca" },
    ],
  },
  {
    title: "Diversité et inclusion en milieu de travail",
    objectives: [
      "Comprendre les enjeux de diversité propres au contexte d'immigration canadien",
      "Mettre en place des pratiques d'inclusion concrètes",
      "Sensibiliser les équipes aux biais inconscients",
    ],
    content: [
      "Le Canada, et particulièrement le Québec, accueille un nombre croissant de travailleurs issus de l'immigration. Les organisations RH doivent adapter leurs pratiques pour reconnaître les diplômes étrangers, valoriser l'expérience internationale et faciliter l'intégration culturelle des nouveaux employés.",
      "Des pratiques d'inclusion concrètes incluent des comités de diversité, des programmes de mentorat interculturel, l'adaptation des fêtes et congés religieux, et une communication interne accessible en plusieurs langues lorsque pertinent.",
      "La sensibilisation aux biais inconscients — préférence pour les candidats au parcours similaire au sien, jugement basé sur l'accent ou le nom — passe par une formation continue des gestionnaires impliqués dans les décisions d'embauche et de promotion.",
    ],
    keyTakeaways: [
      "La reconnaissance des diplômes et expériences étrangers est un enjeu RH stratégique au Canada",
      "L'inclusion se construit par des pratiques concrètes, pas seulement des déclarations de principe",
      "La formation continue sur les biais inconscients doit cibler particulièrement les décideurs RH",
    ],
    resources: [
      { label: "Conseil canadien pour les carrières internationales", url: "https://www.cicic.ca" },
    ],
  },
  {
    title: "Projet final : plan RH stratégique",
    objectives: [
      "Élaborer un plan RH aligné sur la stratégie d'une organisation",
      "Intégrer recrutement, performance, rémunération et développement",
      "Présenter une feuille de route RH avec indicateurs de succès",
    ],
    content: [
      "Le projet final demande de concevoir un plan RH complet pour une organisation, en partant de ses objectifs stratégiques : quels talents recruter, comment les retenir, quelle structure de rémunération adopter et quels programmes de développement prioriser.",
      "Le plan doit démontrer la cohérence entre toutes les fonctions RH : un plan de recrutement ambitieux sans budget de rémunération compétitif, par exemple, révèle une faille stratégique majeure qui doit être identifiée et corrigée.",
      "La présentation finale inclut des indicateurs de succès mesurables (taux de roulement, délai de recrutement, satisfaction des employés) permettant de suivre l'efficacité du plan RH dans le temps et d'ajuster les actions en conséquence.",
    ],
    keyTakeaways: [
      "Un plan RH efficace découle toujours de la stratégie globale de l'organisation, jamais l'inverse",
      "La cohérence entre les différentes fonctions RH est aussi importante que la qualité de chacune",
      "Sans indicateurs de mesure, impossible de savoir si le plan RH fonctionne réellement",
    ],
    resources: [
      { label: "CPHR Canada — Cadre de compétences RH", url: "https://cphr.ca" },
    ],
  },
];
