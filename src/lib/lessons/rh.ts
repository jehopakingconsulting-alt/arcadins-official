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
    quiz: [
      { question: "Après combien d'heures par semaine les heures supplémentaires s'appliquent-elles au Québec ?", options: ["35 heures", "40 heures", "50 heures", "Aucune limite"], correctIndex: 1, explanation: "Au-delà de 40 heures par semaine, les heures travaillées sont considérées comme supplémentaires au Québec." },
      { question: "Quels secteurs relèvent de la compétence fédérale en droit du travail ?", options: ["Les restaurants locaux", "Les banques, télécommunications et transport interprovincial", "Les épiceries de quartier", "Les salons de coiffure"], correctIndex: 1, explanation: "Ces secteurs spécifiques relèvent du Code canadien du travail plutôt que des normes provinciales." },
      { question: "Combien de semaines de congé annuel minimum après un an de service au Québec ?", options: ["1 semaine", "2 semaines", "6 semaines", "Aucun congé n'est garanti"], correctIndex: 1, explanation: "La Loi sur les normes du travail garantit un minimum de 2 semaines de vacances annuelles après un an de service." },
      { question: "Les normes minimales du travail sont-elles négociables à la baisse ?", options: ["Oui, librement", "Non, elles constituent un plancher légal incompressible", "Seulement avec l'accord verbal", "Cela dépend de l'humeur de l'employeur"], correctIndex: 1, explanation: "Les normes minimales représentent un seuil légal que l'employeur ne peut pas contourner, même avec l'accord de l'employé." },
      { question: "Quelle est la première étape de toute analyse RH selon le module ?", options: ["Identifier la juridiction fédérale ou provinciale applicable", "Licencier immédiatement", "Ignorer la loi", "Consulter l'horoscope"], correctIndex: 0, explanation: "Déterminer quelle juridiction s'applique est essentiel avant toute décision RH, car les règles diffèrent selon le secteur." },
      { question: "Quelle obligation légale concerne l'équité salariale au Québec ?", options: ["Elle est purement facultative", "Elle est une obligation proactive de l'employeur", "Elle ne s'applique qu'aux hommes", "Elle n'existe pas au Québec"], correctIndex: 1, explanation: "L'équité salariale au Québec impose aux employeurs une démarche proactive, pas seulement réactive en cas de plainte." },
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
    quiz: [
      { question: "Que recommande le module concernant le salaire dans une offre d'emploi ?", options: ["Ne jamais le mentionner", "Une transparence salariale, devenue une attente croissante", "L'indiquer uniquement aux hommes", "Le négocier en secret uniquement"], correctIndex: 1, explanation: "La transparence salariale est de plus en plus attendue par les candidats et devient une bonne pratique RH." },
      { question: "Pourquoi un processus d'entrevue structuré est-il recommandé ?", options: ["Pour compliquer le processus", "Pour faciliter une comparaison équitable entre candidats", "Ce n'est jamais recommandé", "Pour exclure systématiquement des candidats"], correctIndex: 1, explanation: "Utiliser les mêmes questions pour tous les candidats réduit les biais et permet une évaluation plus juste." },
      { question: "Quelle méthode est mentionnée pour structurer les questions comportementales en entrevue ?", options: ["La méthode STAR", "La méthode aléatoire", "La méthode du tirage au sort", "Aucune méthode n'est recommandée"], correctIndex: 0, explanation: "La méthode STAR aide à structurer des questions qui prédisent mieux la performance future du candidat." },
      { question: "Quel type de question est légalement interdit en entrevue, sauf pertinence directe au poste ?", options: ["Les questions sur l'expérience professionnelle", "Les questions sur la situation familiale ou l'âge précis", "Les questions sur les compétences techniques", "Les questions sur la motivation"], correctIndex: 1, explanation: "Les questions discriminatoires sur la situation familiale, l'âge ou l'origine sont interdites par la loi, sauf exigence professionnelle justifiée." },
      { question: "Que doit distinguer une bonne description de poste ?", options: ["Rien en particulier", "Les compétences requises des compétences souhaitables", "Uniquement le salaire", "La couleur préférée du candidat idéal"], correctIndex: 1, explanation: "Distinguer le 'requis' du 'souhaitable' aide les candidats à évaluer leur adéquation réelle au poste." },
      { question: "Sur quoi la loi interdit-elle toute discrimination en recrutement ?", options: ["L'origine ethnique, le sexe, l'âge, la religion ou le handicap", "Uniquement les compétences techniques", "Le salaire désiré", "L'expérience professionnelle"], correctIndex: 0, explanation: "Ces caractéristiques sont protégées légalement contre toute discrimination dans le processus de recrutement." },
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
    quiz: [
      { question: "Que signifie la méthode SMART pour définir des objectifs ?", options: ["Aucune signification précise", "Spécifique, Mesurable, Atteignable, Réaliste, Temporel", "Salaire Maximum Annuel Réduit Temporairement", "Stratégie de Marketing Avancée"], correctIndex: 1, explanation: "SMART est un cadre largement utilisé pour définir des objectifs clairs et évaluables." },
      { question: "Sur quoi doit toujours porter la rétroaction constructive ?", options: ["La personnalité de l'employé", "Le comportement observable et son impact", "Les opinions personnelles non vérifiées", "Les rumeurs de bureau"], correctIndex: 1, explanation: "Se concentrer sur des comportements observables évite les jugements personnels et reste objectif et actionnable." },
      { question: "Pourquoi le feedback continu est-il préférable à l'évaluation annuelle unique ?", options: ["Ce n'est pas préférable", "Il prévient les surprises et permet des ajustements rapides", "Il prend plus de temps sans bénéfice", "Il n'a aucun avantage"], correctIndex: 1, explanation: "Un feedback régulier permet de corriger rapidement les écarts plutôt que d'attendre une évaluation annuelle tardive." },
      { question: "Pourquoi documenter rigoureusement les situations de sous-performance ?", options: ["Ce n'est pas nécessaire", "Pour protéger l'organisation et donner une chance réelle d'amélioration à l'employé", "Pour punir systématiquement l'employé", "Uniquement pour des raisons esthétiques"], correctIndex: 1, explanation: "Une documentation rigoureuse protège juridiquement l'employeur tout en assurant un processus équitable pour l'employé." },
      { question: "Quels critères doivent être connus à l'avance par l'employé dans un système d'évaluation efficace ?", options: ["Aucun critère n'est nécessaire", "Des critères mesurables et clairs", "Uniquement le salaire", "Les secrets de l'entreprise"], correctIndex: 1, explanation: "La transparence des critères d'évaluation dès le départ favorise l'équité et la motivation de l'employé." },
      { question: "Que doit inclure un plan d'amélioration pour un employé en sous-performance ?", options: ["Aucun détail particulier", "Des échéances claires et un suivi systématique", "Uniquement des menaces verbales", "Rien de structuré"], correctIndex: 1, explanation: "Un plan d'amélioration structuré avec échéances donne à l'employé une chance concrète et mesurable de progresser." },
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
    quiz: [
      { question: "Quels sont les deux piliers d'une structure salariale saine selon le module ?", options: ["L'équité interne et la compétitivité externe", "Le hasard et l'improvisation", "Uniquement le budget disponible", "L'âge des employés"], correctIndex: 0, explanation: "Une structure salariale solide équilibre la cohérence interne entre postes et la compétitivité par rapport au marché." },
      { question: "Que comprend la rémunération globale au-delà du salaire de base ?", options: ["Rien d'autre", "Primes, avantages sociaux et avantages indirects (flexibilité, développement)", "Uniquement les vacances", "Le prix du café au bureau"], correctIndex: 1, explanation: "La rémunération globale englobe l'ensemble des avantages financiers et non financiers offerts à l'employé." },
      { question: "Quel facteur rivalise désormais avec le salaire selon les enquêtes récentes ?", options: ["La couleur du bureau", "La flexibilité du travail", "Le nombre de plantes au bureau", "Aucun autre facteur n'a d'importance"], correctIndex: 1, explanation: "La flexibilité (télétravail, horaires) est devenue un critère d'attraction aussi important que le salaire pour de nombreux candidats." },
      { question: "Sur quoi s'appuie une structure salariale compétitive externe ?", options: ["Des données de marché et enquêtes salariales sectorielles", "Des suppositions sans données", "Uniquement l'intuition du dirigeant", "Le salaire minimum légal uniquement"], correctIndex: 0, explanation: "Les enquêtes salariales sectorielles permettent de positionner les salaires de manière compétitive par rapport au marché." },
      { question: "Quelle génération valorise particulièrement la santé mentale et l'équilibre vie-travail selon le module ?", options: ["Aucune génération en particulier", "Les jeunes générations", "Uniquement les retraités", "Personne ne valorise cela"], correctIndex: 1, explanation: "Les jeunes générations accordent une importance croissante au bien-être et à l'équilibre vie-travail dans leur choix d'emploi." },
      { question: "Qu'est-ce que l'équité interne en matière de rémunération ?", options: ["Payer tout le monde de manière identique sans distinction", "La cohérence salariale entre postes comparables au sein de l'organisation", "Une obligation légale inexistante", "Un concept sans rapport avec les RH"], correctIndex: 1, explanation: "L'équité interne assure que des postes de valeur comparable soient rémunérés de manière cohérente au sein de l'organisation." },
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
    quiz: [
      { question: "Que représente le modèle 70-20-10 en développement des compétences ?", options: ["Une répartition entre apprentissage en situation, social et formel", "Un pourcentage de réduction salariale", "Un horaire de travail", "Une formule de calcul d'impôt"], correctIndex: 0, explanation: "Le modèle 70-20-10 illustre une répartition typique : 70% apprentissage en situation de travail, 20% social, 10% formel." },
      { question: "Pourquoi une approche purement réactive en formation est-elle limitée ?", options: ["Elle n'a aucune limite", "Elle néglige souvent les compétences critiques pour l'avenir", "C'est la meilleure approche possible", "Elle coûte toujours moins cher"], correctIndex: 1, explanation: "Se concentrer uniquement sur les besoins actuels ignore la préparation aux compétences futures nécessaires." },
      { question: "Que faut-il mesurer au-delà de la satisfaction immédiate des participants ?", options: ["Rien d'autre n'est nécessaire", "Le transfert réel des compétences au travail", "Uniquement le nombre de présences", "La météo du jour de formation"], correctIndex: 1, explanation: "L'impact réel se mesure par l'application concrète des compétences apprises dans le travail quotidien." },
      { question: "Quel type d'apprentissage est souvent plus impactant que la formation formelle seule ?", options: ["L'apprentissage informel (mentorat, projets)", "Aucun autre type n'existe", "La lecture de manuels uniquement", "L'absence totale de formation"], correctIndex: 0, explanation: "Le mentorat et l'apprentissage par projets concrets complètent efficacement la formation formelle traditionnelle." },
      { question: "Quels éléments combine l'identification des besoins de formation ?", options: ["Écarts de compétences, objectifs stratégiques futurs et aspirations individuelles", "Uniquement le budget disponible", "Le hasard", "Les préférences personnelles du gestionnaire uniquement"], correctIndex: 0, explanation: "Une analyse complète des besoins prend en compte ces trois dimensions pour un plan de formation pertinent." },
      { question: "Quel pourcentage du modèle 70-20-10 représente la formation formelle ?", options: ["70%", "20%", "10%", "100%"], correctIndex: 2, explanation: "Selon ce modèle, la formation formelle (cours, certifications) ne représente généralement que 10% de l'apprentissage total." },
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
    quiz: [
      { question: "Comment se compare le taux de syndicalisation au Québec par rapport au reste du Canada ?", options: ["Il est parmi les plus élevés en Amérique du Nord", "Il est inexistant", "Il est le plus bas du pays", "Il n'y a aucune différence notable"], correctIndex: 0, explanation: "Le Québec se distingue par un taux de syndicalisation particulièrement élevé comparé au reste de l'Amérique du Nord." },
      { question: "Quelle est généralement la première approche privilégiée pour résoudre un conflit en milieu de travail ?", options: ["Le recours légal immédiat", "Le dialogue direct entre les parties", "Le licenciement immédiat", "L'ignorer complètement"], correctIndex: 1, explanation: "Le dialogue direct est l'approche la plus rapide et la moins coûteuse, à privilégier avant les processus plus formels." },
      { question: "Que peut provoquer le non-respect des délais procéduraux dans un grief ?", options: ["Rien de particulier", "L'invalidation d'une décision même fondée", "Une augmentation de salaire automatique", "Aucune conséquence légale"], correctIndex: 1, explanation: "Les délais procéduraux sont stricts ; leur non-respect peut compromettre la validité d'une décision, peu importe son bien-fondé." },
      { question: "Que régit le Code du travail au Québec ?", options: ["L'accréditation syndicale, la négociation collective, le droit de grève", "Uniquement les vacances scolaires", "Le code de la route", "Les impôts fonciers"], correctIndex: 0, explanation: "Le Code du travail encadre l'ensemble des relations syndicales-patronales, incluant accréditation et négociation collective." },
      { question: "Qu'est-ce que la médiation dans la résolution de conflits ?", options: ["L'intervention d'un tiers neutre pour faciliter une résolution", "Une sanction disciplinaire", "Un licenciement automatique", "Une absence totale d'intervention"], correctIndex: 0, explanation: "La médiation implique un tiers neutre qui aide les parties en conflit à trouver une solution mutuellement acceptable." },
      { question: "Quel élément est essentiel dans le traitement d'un grief selon le module ?", options: ["L'improvisation totale", "Le respect des délais et une documentation complète", "L'absence de procédure", "L'exclusion du syndicat"], correctIndex: 1, explanation: "Une procédure rigoureuse avec délais respectés et documentation complète est essentielle au traitement valide d'un grief." },
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
    quiz: [
      { question: "Quel exemple de biais inconscient est mentionné dans le module ?", options: ["Préférer un candidat au parcours similaire au sien", "Évaluer uniquement les compétences techniques", "Comparer les salaires uniquement", "Aucun biais n'existe en recrutement"], correctIndex: 0, explanation: "Ce biais d'affinité pousse souvent à favoriser inconsciemment des candidats au parcours ou profil similaire au sien." },
      { question: "Quelle pratique concrète d'inclusion est mentionnée dans le module ?", options: ["Les comités de diversité et le mentorat interculturel", "Aucune pratique concrète n'est nécessaire", "L'uniformisation forcée de tous les employés", "L'exclusion des nouveaux arrivants"], correctIndex: 0, explanation: "Ces initiatives concrètes favorisent une véritable culture d'inclusion au-delà des simples déclarations." },
      { question: "Pourquoi la reconnaissance des diplômes étrangers est-elle un enjeu stratégique au Canada ?", options: ["Ce n'est pas un enjeu réel", "En raison du nombre croissant de travailleurs issus de l'immigration", "Parce que c'est interdit par la loi", "Cela ne concerne que certains pays"], correctIndex: 1, explanation: "Avec l'augmentation de l'immigration, faciliter la reconnaissance des qualifications devient crucial pour intégrer efficacement les talents." },
      { question: "Comment l'inclusion doit-elle se construire selon le module ?", options: ["Par des déclarations de principe uniquement", "Par des pratiques concrètes", "Elle ne peut pas se construire", "Par le hasard"], correctIndex: 1, explanation: "L'inclusion réelle nécessite des actions tangibles, pas seulement des engagements théoriques sans application pratique." },
      { question: "Qui doit particulièrement être formé sur les biais inconscients ?", options: ["Personne en particulier", "Les gestionnaires impliqués dans l'embauche et la promotion", "Uniquement les nouveaux employés", "Les clients de l'entreprise"], correctIndex: 1, explanation: "Les décideurs RH ont un impact direct sur les opportunités offertes, rendant leur sensibilisation prioritaire." },
      { question: "Que peut inclure l'adaptation organisationnelle à la diversité religieuse ?", options: ["L'adaptation des fêtes et congés religieux", "L'interdiction de toute pratique religieuse", "Aucune adaptation n'est nécessaire", "Le licenciement automatique"], correctIndex: 0, explanation: "Reconnaître et adapter certaines pratiques aux différentes traditions religieuses favorise un climat de travail inclusif." },
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
    quiz: [
      { question: "D'où doit toujours découler un plan RH efficace selon le module ?", options: ["De la stratégie globale de l'organisation", "D'une décision aléatoire", "Uniquement du budget disponible", "Des préférences personnelles du directeur RH"], correctIndex: 0, explanation: "Un plan RH efficace s'aligne sur les objectifs stratégiques de l'organisation, et non l'inverse." },
      { question: "Que révèle un plan de recrutement ambitieux sans budget de rémunération compétitif ?", options: ["Rien d'important", "Une faille stratégique majeure dans la cohérence du plan", "Une excellente stratégie", "Un succès garanti"], correctIndex: 1, explanation: "L'incohérence entre les différentes composantes RH compromet l'efficacité globale du plan." },
      { question: "Quel indicateur de succès est mentionné pour mesurer l'efficacité d'un plan RH ?", options: ["Le taux de roulement", "La couleur du logo", "Le nombre de plantes au bureau", "La météo"], correctIndex: 0, explanation: "Le taux de roulement (turnover) est un indicateur clé pour évaluer la rétention et la satisfaction des employés." },
      { question: "Pourquoi des indicateurs de mesure sont-ils indispensables dans un plan RH ?", options: ["Ce n'est pas indispensable", "Sans eux, impossible de savoir si le plan fonctionne réellement", "Pour décorer la présentation uniquement", "Ils n'ont aucune utilité pratique"], correctIndex: 1, explanation: "Les indicateurs permettent un suivi objectif de l'efficacité du plan et guident les ajustements nécessaires." },
      { question: "Quelles fonctions RH doivent être intégrées dans le plan final ?", options: ["Recrutement, performance, rémunération et développement", "Uniquement le recrutement", "Aucune fonction spécifique", "Uniquement la paie"], correctIndex: 0, explanation: "Un plan RH stratégique complet couvre l'ensemble du cycle de vie de l'employé, de l'embauche au développement continu." },
      { question: "Que démontre la cohérence entre les fonctions RH selon le module ?", options: ["Rien d'important", "Une qualité essentielle du plan, aussi importante que chaque fonction individuelle", "Une perte de temps", "Un détail sans conséquence"], correctIndex: 1, explanation: "La cohérence d'ensemble garantit que les différentes initiatives RH se soutiennent mutuellement plutôt que de se contredire." },
    ],
  },
];
