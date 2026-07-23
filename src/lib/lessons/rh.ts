import type { Lesson } from "@/types/lesson";

export const rhLessons: Lesson[] = [
  {
    title: "Droit du travail au Québec et au Canada",
    objectives: [
      "Comprendre les normes minimales du travail comme un plancher légal",
      "Distinguer les compétences fédérales et provinciales en droit du travail",
      "Identifier les obligations légales de l'employeur",
      "Reconnaître l'équité salariale comme une obligation proactive",
    ],
    content: [
      "Le droit du travail n'est pas qu'une contrainte pour l'employeur : c'est le cadre qui protège la relation d'emploi et prévient les litiges coûteux. Le comprendre est le socle de toute fonction RH, car une décision prise en ignorant la loi — un congédiement mal fait, une heure supplémentaire non payée — peut coûter à l'organisation bien plus que ce qu'elle croyait économiser.",
      "La Loi sur les normes du travail du Québec établit les seuils minimaux : salaire minimum, durée maximale de la semaine de travail avant heures supplémentaires (40h), congés annuels (minimum 2 semaines après un an de service) et préavis de fin d'emploi selon l'ancienneté.",
      "Le mot clé est « minimales » : ce sont des planchers, jamais des plafonds ni des cibles. Un employeur peut toujours offrir mieux, mais jamais moins — et surtout, un employé ne peut pas y renoncer, même par écrit et de son plein gré. Un contrat qui prévoit un salaire sous le minimum ou l'abandon des vacances est tout simplement nul, quelle que soit la signature apposée. Cette règle protège précisément les travailleurs vulnérables, comme les nouveaux arrivants, qu'un employeur peu scrupuleux pourrait pousser à « accepter » des conditions illégales par méconnaissance de leurs droits.",
      "Certains secteurs relèvent de la compétence fédérale (banques, télécommunications, transport interprovincial) et suivent le Code canadien du travail plutôt que les normes provinciales. Il est essentiel d'identifier la juridiction applicable avant toute décision RH.",
      "Cette distinction est la toute première question à se poser, car appliquer les mauvaises règles invalide toute la démarche. Une même situation — un licenciement, un congé — n'obéit pas aux mêmes normes selon qu'on travaille dans une épicerie (provincial, CNESST) ou dans une banque (fédéral, Code canadien du travail). Se tromper de juridiction, c'est bâtir une décision RH sur un fondement erroné. Le réflexe du professionnel RH est donc toujours : de quelle juridiction relève cet emploi, avant même d'examiner le fond.",
      "L'employeur a l'obligation légale de fournir un milieu de travail sans harcèlement, de respecter les droits relatifs à la vie privée des employés, et de se conformer aux dispositions sur l'équité salariale, particulièrement strictes au Québec.",
      "L'équité salariale mérite une attention spéciale, car elle surprend souvent les employeurs venus d'ailleurs : au Québec, ce n'est pas une simple interdiction de discriminer en cas de plainte, mais une obligation proactive. La loi impose aux entreprises d'une certaine taille de réaliser activement un exercice pour corriger les écarts de rémunération entre les emplois à prédominance féminine et masculine de valeur comparable — et de le maintenir dans le temps. Attendre une plainte pour agir, c'est déjà être en défaut. C'est l'illustration parfaite que la conformité RH exige d'anticiper la loi, pas seulement d'y réagir.",
    ],
    caseStudy: {
      title: "Le « renoncement » signé chez Resto Mirabel",
      body: [
        "Le gérant de Resto Mirabel embauche Fatou, nouvellement arrivée, et lui fait signer une entente où elle « accepte » de ne pas être payée en heures supplémentaires au-delà de 40 heures, en échange d'un emploi stable. Fatou, heureuse d'être embauchée et méconnaissant ses droits, signe de bonne foi. Pendant des mois, elle travaille 45 à 50 heures payées au taux normal.",
        "Le gérant croit se protéger par cette signature. C'est une erreur juridique fondamentale : les normes minimales du travail sont un plancher incompressible auquel un salarié ne peut renoncer, même par écrit. L'entente est nulle. Lorsque Fatou, mieux informée par un organisme d'aide aux nouveaux arrivants, dépose une plainte à la CNESST, l'employeur se retrouve à devoir verser rétroactivement toutes les heures supplémentaires dues, majorées, plus des pénalités.",
        "Ce qui semblait une économie devient une dépense bien plus lourde, sans compter l'atteinte à la réputation de l'entreprise. La leçon, essentielle pour tout gestionnaire RH : une signature ne rend pas légale une condition sous le minimum. Les normes protègent particulièrement les travailleurs vulnérables, et un employeur averti applique la loi non par crainte, mais parce que la contourner coûte toujours plus cher au bout du compte.",
      ],
    },
    exercise: {
      title: "Analyser la conformité d'une situation d'emploi",
      prompt: [
        "On vous présente trois situations d'emploi (par exemple : un employé de commerce local payé sous le salaire minimum ; un employé de banque licencié sans préavis ; une employée qui a « accepté » de renoncer à ses vacances). Pour chacune, identifiez d'abord la juridiction applicable (provinciale ou fédérale) et justifiez.",
        "Pour chaque situation, déterminez si elle respecte ou viole les normes minimales, en expliquant la règle en jeu et pourquoi une signature de l'employé ne change rien à la légalité.",
        "Rédigez enfin une courte note expliquant à un employeur pourquoi l'équité salariale au Québec est une obligation proactive et non une simple réaction aux plaintes.",
      ],
      deliverables: [
        "L'identification justifiée de la juridiction pour chacune des trois situations",
        "Une analyse de conformité par situation, avec la règle en jeu",
        "Une explication de pourquoi un renoncement signé à une norme minimale est nul",
        "Une note sur le caractère proactif de l'équité salariale au Québec",
      ],
    },
    keyTakeaways: [
      "Les normes minimales du travail sont un plancher légal, pas une suggestion",
      "Un employé ne peut renoncer aux normes minimales, même par écrit et de son plein gré",
      "Identifier la juridiction fédérale vs provinciale est la première étape de toute analyse RH",
      "L'équité salariale est une obligation proactive, pas seulement réactive en cas de plainte",
      "Contourner la loi coûte presque toujours plus cher que de l'appliquer",
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
      "Structurer un processus d'entrevue équitable et prédictif",
      "Reconnaître et éviter les biais et questions discriminatoires",
      "Distinguer compétences requises et compétences souhaitables",
    ],
    content: [
      "Une description de poste efficace précise les responsabilités principales, les compétences requises (distinguées des compétences souhaitables), les conditions de travail et la fourchette salariale — cette transparence salariale devient une attente croissante des candidats.",
      "La distinction entre « requis » et « souhaitable » a un effet inattendu et documenté : une liste d'exigences trop longue et trop stricte décourage de bons candidats, en particulier ceux issus de groupes sous-représentés, qui ont tendance à ne postuler que s'ils remplissent la quasi-totalité des critères. En gonflant les « requis » avec des éléments en réalité seulement souhaitables, une organisation se prive elle-même de talents. Une description honnête sur ce qui est vraiment indispensable élargit le bassin de candidatures et améliore la diversité, sans rien sacrifier de la qualité.",
      "Un processus d'entrevue structuré utilise les mêmes questions de base pour tous les candidats à un poste donné, facilitant une comparaison équitable. Les questions comportementales (méthode STAR) prédisent mieux la performance future que les questions hypothétiques.",
      "La force du processus structuré est qu'il combat directement le biais le plus insidieux du recrutement : le « feeling ». Sans structure, un recruteur juge sur une impression globale, souvent teintée d'affinité — il aime le candidat qui lui ressemble, qui a fréquenté la même école, qui partage ses références culturelles. Poser à tous les mêmes questions et évaluer les réponses sur une grille commune force à comparer ce qui est comparable. Les questions comportementales (« racontez-moi une fois où… ») sont particulièrement prédictives, car le meilleur indicateur du comportement futur est le comportement passé réel, bien plus que des réponses hypothétiques polies (« que feriez-vous si… »).",
      "La loi interdit toute discrimination basée sur l'origine ethnique, le sexe, l'âge, la religion ou le handicap durant le recrutement. Les questions sur la situation familiale, l'âge précis ou le pays d'origine doivent être évitées sauf si directement pertinentes au poste.",
      "L'intention ne protège pas : une question discriminatoire posée « par simple curiosité » ou « pour faire la conversation » demeure illégale et expose l'organisation. Demander à une candidate si elle compte avoir des enfants, à un candidat d'où vient son nom, ou son âge exact, sont des fautes classiques et lourdes de conséquences, même sans mauvaise intention. Le bon réflexe est de ne poser que des questions directement liées à la capacité d'accomplir le travail. En cas de doute, la règle est simple : si l'information ne sert pas à évaluer l'aptitude au poste, elle n'a pas sa place dans l'entrevue.",
    ],
    caseStudy: {
      title: "Le poste que personne ne « méritait » chez TechnoNord",
      body: [
        "TechnoNord peine à recruter un analyste et se plaint de « ne trouver personne de qualifié ». En examinant l'affichage, la nouvelle responsable RH découvre une liste de quinze exigences « requises », dont plusieurs sont en réalité souhaitables : une certification précise, dix ans d'expérience, la maîtrise d'un logiciel spécifique de niche. Peu de candidats cochent toutes les cases, et beaucoup de bons profils, notamment des nouvelles arrivées compétentes, ne postulent même pas.",
        "Elle repense l'affichage : trois compétences réellement indispensables en « requis », le reste en « atouts ». Le bassin de candidatures triple, avec une diversité nettement accrue. En parallèle, elle constate que les entrevues se faisaient « au feeling », sans grille : le gestionnaire favorisait spontanément les diplômés de son ancienne université. Un candidat prometteur avait même été écarté après une question déplacée sur ses « origines ».",
        "Elle instaure un processus structuré : mêmes questions comportementales pour tous, grille d'évaluation commune, et suppression de toute question sans lien avec le poste. La qualité des embauches s'améliore, et le risque juridique disparaît. La leçon : trop d'exigences éloignent les talents, le « feeling » masque des biais, et certaines questions restent interdites quelle que soit l'intention — un recrutement rigoureux est à la fois plus juste, plus légal et plus efficace.",
      ],
    },
    exercise: {
      title: "Concevoir un recrutement structuré et sans biais",
      prompt: [
        "Rédigez une description de poste pour un emploi de votre choix, en séparant clairement trois à cinq compétences réellement requises des compétences seulement souhaitables. Incluez une fourchette salariale et expliquez pourquoi limiter les « requis » élargit et diversifie le bassin de candidats.",
        "Élaborez une grille d'entrevue structurée : quatre questions comportementales (méthode STAR) identiques pour tous les candidats, avec les critères d'évaluation de chaque réponse.",
        "Dressez enfin une liste d'au moins cinq questions à ne jamais poser en entrevue (situation familiale, âge, origine, etc.) et, pour chacune, proposez une question légale et pertinente qui évalue réellement l'aptitude au poste.",
      ],
      deliverables: [
        "Une description de poste distinguant compétences requises et souhaitables",
        "Une grille d'entrevue structurée avec quatre questions comportementales et leurs critères",
        "Cinq questions interdites, chacune remplacée par une question légale et pertinente",
        "Une justification de l'effet d'une liste d'exigences trop stricte sur la diversité",
      ],
    },
    keyTakeaways: [
      "La transparence salariale dans les affichages devient une norme attendue",
      "Trop d'exigences « requises » éloignent de bons candidats et réduisent la diversité",
      "Un processus structuré combat le biais du « feeling » et améliore la qualité des embauches",
      "Les questions comportementales prédisent mieux la performance que les questions hypothétiques",
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
      "Donner une rétroaction constructive centrée sur les faits",
      "Gérer les situations de sous-performance avec rigueur et respect",
      "Documenter pour protéger à la fois l'organisation et l'employé",
    ],
    content: [
      "Un système d'évaluation efficace repose sur des objectifs clairs établis en début de période (souvent selon la méthode SMART), un suivi régulier plutôt qu'une seule évaluation annuelle, et des critères mesurables connus à l'avance par l'employé.",
      "Le principe cardinal est celui de l'absence de surprise. Une évaluation annuelle qui révèle brutalement à un employé qu'il déçoit depuis des mois est un échec de gestion, pas de l'employé : on lui a caché l'information au moment où il aurait pu corriger le tir. Des objectifs clairs fixés au départ, connus et mesurables, transforment l'évaluation en simple constat partagé plutôt qu'en verdict redouté. L'employé doit pouvoir, à tout moment, savoir où il en est par rapport à ce qui est attendu. C'est une question d'équité autant que d'efficacité.",
      "La rétroaction constructive suit généralement une structure factuelle : décrire le comportement observé, son impact, et la solution attendue, plutôt que de juger la personnalité de l'employé. Le feedback continu est plus efficace que l'attente d'une évaluation formelle annuelle.",
      "La différence entre « tu es désorganisé » et « les trois derniers rapports sont arrivés après l'échéance, ce qui a retardé l'équipe » est fondamentale. La première attaque la personne, provoque la défensive et n'indique rien à corriger ; la seconde décrit un comportement observable, son impact concret, et ouvre sur une solution. Cette discipline — parler des actes, jamais du caractère — désamorce l'émotion et rend le feedback actionnable. Elle vaut aussi pour le feedback positif : « bon travail » motive moins que « ta présentation était claire parce que tu avais anticipé les questions ». Un feedback précis et régulier vaut mille évaluations annuelles vagues.",
      "La gestion de la sous-performance doit être documentée rigoureusement : avertissements écrits, plans d'amélioration avec échéances claires, et suivi systématique. Cette documentation protège l'organisation en cas de contestation tout en donnant une chance réelle d'amélioration à l'employé.",
      "On croit souvent, à tort, que la documentation sert uniquement à « se couvrir » pour licencier. En réalité, elle protège les deux parties. Pour l'employeur, elle démontre, en cas de contestation devant un tribunal du travail, que le congédiement était fondé et précédé d'une démarche équitable — sans quoi même un licenciement justifié peut être invalidé. Pour l'employé, un plan d'amélioration écrit, avec des attentes claires et des échéances, est une chance réelle et loyale de redresser la situation, plutôt qu'un renvoi arbitraire. La rigueur procédurale n'est pas de la froideur bureaucratique : c'est ce qui garantit qu'une décision lourde soit à la fois défendable et juste.",
    ],
    caseStudy: {
      title: "Le congédiement invalidé de chez Logistix",
      body: [
        "Chez Logistix, un gestionnaire est excédé par un employé, Daniel, dont le rendement le déçoit. Sans jamais lui avoir donné de feedback précis ni fixé d'objectifs clairs, il le congédie du jour au lendemain, convaincu que « tout le monde voyait bien qu'il ne performait pas ». Aucune trace écrite, aucun avertissement, aucun plan d'amélioration.",
        "Daniel conteste son congédiement. Devant le tribunal du travail, l'employeur se retrouve incapable de prouver quoi que ce soit : pas de documentation de la sous-performance, pas de preuve qu'on ait signalé le problème à Daniel ni qu'on lui ait donné une chance de s'améliorer. Du point de vue de Daniel, il a été renvoyé sans avertissement pour des reproches jamais formulés. Le congédiement est jugé abusif, et Logistix doit verser une indemnité.",
        "La responsable RH tire les leçons : elle instaure des objectifs clairs en début d'année, un feedback continu et factuel, et, en cas de sous-performance, un plan d'amélioration écrit avec échéances et suivi. Quelques mois plus tard, un autre employé en difficulté, encadré par ce processus, finit par se ressaisir — preuve que la démarche donne une vraie chance. La leçon : sans documentation ni feedback préalable, même une décision fondée s'effondre, et l'absence de surprise protège autant l'entreprise que l'employé.",
      ],
    },
    exercise: {
      title: "Structurer feedback et gestion de sous-performance",
      prompt: [
        "Choisissez un poste et fixez-lui deux objectifs de performance selon la méthode SMART (spécifiques, mesurables, atteignables, réalistes, temporels), en expliquant en quoi leur clarté élimine les mauvaises surprises lors de l'évaluation.",
        "Rédigez deux exemples de rétroaction : reformulez d'abord un jugement de personnalité (« il est négligent ») en un feedback factuel décrivant le comportement, son impact et la solution attendue ; puis faites de même pour un feedback positif précis.",
        "Élaborez enfin les grandes lignes d'un plan d'amélioration pour un employé en sous-performance : attentes claires, échéances, points de suivi, et expliquez en quoi cette documentation protège à la fois l'employeur et l'employé.",
      ],
      deliverables: [
        "Deux objectifs SMART pour un poste, avec justification de l'absence de surprise",
        "Un jugement de personnalité reformulé en feedback factuel (comportement, impact, solution)",
        "Un exemple de feedback positif précis",
        "Les grandes lignes d'un plan d'amélioration documenté et son rôle de protection mutuelle",
      ],
    },
    keyTakeaways: [
      "Le principe de l'absence de surprise : l'employé doit toujours savoir où il en est",
      "Le feedback continu prévient les surprises lors de l'évaluation formelle",
      "La rétroaction doit toujours porter sur le comportement observable, jamais sur la personne",
      "Sans documentation ni feedback préalable, même un congédiement fondé peut être invalidé",
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
      "Équilibrer équité interne et compétitivité externe",
      "Comprendre les composantes de la rémunération globale",
      "Évaluer les avantages les plus valorisés selon les profils",
      "Reconnaître le poids croissant de la flexibilité et du bien-être",
    ],
    content: [
      "Une structure salariale compétitive s'appuie sur des données de marché (enquêtes salariales sectorielles) et sur une évaluation interne de l'équité entre postes comparables. L'équité interne et la compétitivité externe doivent être équilibrées.",
      "Ces deux forces tirent souvent dans des directions opposées, et tout l'art de la rémunération consiste à les concilier. La compétitivité externe pousse à payer un profil rare au prix fort du marché ; mais si ce nouveau venu gagne soudain plus qu'un employé loyal et compétent au même poste, l'équité interne est rompue — et rien ne démoralise plus une équipe que de découvrir une iniquité salariale. Ignorer le marché, c'est perdre ses talents au profit de la concurrence ; ignorer l'équité interne, c'est les perdre par ressentiment. Une structure salariale saine tient les deux bouts en toute transparence sur les critères.",
      "La rémunération globale inclut le salaire de base, les primes et bonis, les avantages sociaux (assurances, REER), et les avantages indirects (flexibilité, télétravail, développement professionnel). Les candidats évaluent désormais l'ensemble du package, pas seulement le salaire.",
      "Ce changement de perspective est stratégique pour une organisation aux moyens limités. Une PME qui ne peut aligner le salaire d'une multinationale peut néanmoins se rendre très attractive par le reste du package : une réelle flexibilité, un environnement humain, des perspectives de développement, une assurance collective généreuse. Présenter la rémunération globale — et non le seul chiffre du salaire — permet de rivaliser sur un terrain plus large. À l'inverse, un employeur qui ne communique que le salaire de base sous-vend ce qu'il offre réellement et se compare défavorablement à tort.",
      "Les enquêtes récentes montrent que la flexibilité du travail, l'équilibre vie-travail et la santé mentale sont devenus des critères aussi importants que le salaire pour attirer et retenir les talents, particulièrement chez les jeunes générations.",
      "Attention toutefois à ne pas appliquer une recette unique : ce qui est valorisé varie selon les profils et les moments de vie. Un jeune diplômé peut privilégier le développement de compétences et la flexibilité ; un parent, l'assurance familiale et des horaires prévisibles ; un employé proche de la retraite, les contributions au régime de retraite. Les meilleurs programmes de rémunération offrent une part de choix — des avantages « flexibles » où chacun compose selon ses besoins. Comprendre son effectif réel, plutôt que de supposer, est ce qui distingue une politique de rémunération qui retient d'une qui gaspille son budget sur des avantages que personne n'utilise.",
    ],
    caseStudy: {
      title: "Comment la PME Veribois a gardé ses talents sans surenchère salariale",
      body: [
        "Veribois, une PME d'ébénisterie, perd régulièrement ses meilleurs employés au profit de plus grosses entreprises qui offrent des salaires supérieurs. La direction, persuadée que « seul le salaire compte », se résigne, faute de pouvoir suivre la surenchère. La responsable RH doute de ce diagnostic et décide d'interroger réellement les employés sur ce qui compte pour eux.",
        "Les réponses la surprennent : au-delà d'un salaire jugé « correct », les employés valorisent surtout la prévisibilité des horaires, une meilleure assurance familiale, et la possibilité de développer de nouvelles compétences. Un artisan expérimenté venait de partir non pour l'argent, mais parce qu'un concurrent lui offrait de la formation. Le vrai problème n'était pas le salaire de base, mais une rémunération globale mal pensée et jamais mise en valeur.",
        "Veribois ajuste sa stratégie sans exploser sa masse salariale : elle bonifie l'assurance collective, formalise un budget de formation, offre plus de flexibilité, et surtout présente désormais aux candidats la rémunération globale plutôt que le seul salaire. Le roulement chute nettement. La leçon : une PME ne gagne pas la guerre des salaires de base, mais elle peut gagner celle de la rémunération globale — à condition de connaître ce que ses gens valorisent vraiment plutôt que de le supposer.",
      ],
    },
    exercise: {
      title: "Bâtir une offre de rémunération globale équilibrée",
      prompt: [
        "Pour un poste et une organisation de votre choix (idéalement une PME au budget limité), décrivez une offre de rémunération globale complète : salaire de base, primes éventuelles, avantages sociaux et avantages indirects. Mettez en évidence ce qui la rend attractive au-delà du seul salaire.",
        "Expliquez comment vous concilieriez équité interne et compétitivité externe pour ce poste : où trouver les données de marché, et comment éviter qu'une nouvelle embauche bien payée ne démotive les employés en place.",
        "Proposez enfin une part d'avantages « flexibles » adaptée à trois profils d'employés différents (par exemple jeune diplômé, parent, employé proche de la retraite), en expliquant pourquoi le choix compte.",
      ],
      deliverables: [
        "Une offre de rémunération globale détaillée, dont les atouts hors salaire",
        "Une approche pour concilier équité interne et compétitivité externe",
        "Une proposition d'avantages flexibles adaptée à trois profils distincts",
        "Une justification de l'importance de connaître son effectif plutôt que de le supposer",
      ],
    },
    keyTakeaways: [
      "L'équité interne et la compétitivité externe sont les deux piliers d'une structure salariale saine",
      "Une iniquité salariale interne découverte démoralise plus que tout",
      "La rémunération globale permet à une PME de rivaliser au-delà du seul salaire de base",
      "Ce qui est valorisé varie selon les profils : offrir du choix bat la recette unique",
      "La flexibilité et le bien-être rivalisent désormais avec le salaire comme facteurs d'attraction",
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
      "Identifier les besoins de formation en anticipant l'avenir",
      "Concevoir un plan de développement combinant les modes d'apprentissage",
      "Mesurer le transfert réel des compétences, pas seulement la satisfaction",
      "Comprendre le modèle 70-20-10",
    ],
    content: [
      "L'identification des besoins de formation combine l'analyse des écarts de compétences actuels, les objectifs stratégiques futurs de l'organisation et les aspirations de développement individuelles des employés. Une approche purement réactive néglige souvent les compétences critiques pour l'avenir.",
      "La formation est trop souvent traitée comme un pansement : on forme quand un problème est déjà là. Cette approche réactive laisse toujours l'organisation en retard. Anticiper, c'est se demander non pas « quelles compétences manquent aujourd'hui ? » mais « de quelles compétences aurons-nous besoin dans deux ou trois ans, compte tenu de nos objectifs et de l'évolution du secteur ? ». Une entreprise qui automatise ses processus, se numérise ou s'internationalise doit préparer ses gens en amont. La formation devient alors un investissement stratégique dans la capacité future, et non une simple dépense de rattrapage.",
      "Un plan de développement combine généralement formation formelle (cours, certifications), apprentissage social (mentorat, coaching) et apprentissage en situation de travail (rotation de postes, projets stretch). Le modèle 70-20-10 illustre cette répartition idéale.",
      "Le modèle 70-20-10 corrige une illusion tenace : celle que « former » se réduit à « envoyer en cours ». En réalité, la recherche suggère que l'essentiel de l'apprentissage — environ 70 % — se fait en situation de travail réelle (projets ambitieux, nouvelles responsabilités, apprentissage par l'erreur), 20 % par les autres (mentorat, coaching, observation), et seulement 10 % par la formation formelle. Cela ne dévalue pas les cours, mais rappelle qu'une compétence s'ancre surtout par la pratique et l'échange. Un plan de développement efficace orchestre les trois : un cours donne les bases, un mentor guide, et un projet concret transforme le savoir en savoir-faire.",
      "Mesurer l'impact d'une formation va au-delà de la satisfaction immédiate des participants : il faut évaluer le transfert réel des compétences au travail et, idéalement, l'impact sur des indicateurs de performance business concrets.",
      "Le piège classique est de mesurer une formation par le « sourire » des participants à la sortie — ont-ils aimé la journée ? Cet indicateur, s'il rassure, ne dit rien de l'essentiel : les compétences apprises sont-elles réellement appliquées au travail des semaines plus tard ? Une formation appréciée mais jamais mise en pratique est un budget gaspillé. Évaluer le transfert réel — par l'observation, le suivi des gestionnaires, l'évolution d'indicateurs concrets — est plus exigeant mais seul révélateur. La vraie question n'est pas « la formation était-elle agréable ? » mais « qu'est-ce qui a changé dans le travail grâce à elle ? ».",
    ],
    caseStudy: {
      title: "La formation « appréciée » mais inutile de chez ServiPro",
      body: [
        "ServiPro, entreprise de service à la clientèle, investit chaque année dans une grande journée de formation sur la relation client, animée par un conférencier dynamique. Les évaluations de fin de journée sont excellentes : les employés adorent, rient, repartent motivés. La direction est satisfaite et reconduit l'exercice, persuadée de bien former ses équipes.",
        "Une nouvelle responsable formation s'interroge : malgré ces formations « réussies », les plaintes clients ne diminuent pas. Elle mesure autre chose que la satisfaction immédiate : elle observe les appels et suit les indicateurs quelques semaines après. Le constat est net — presque rien de la formation n'est appliqué au quotidien. Les employés ont passé un bon moment, mais aucun mécanisme ne les aidait à transférer les techniques apprises dans leur travail réel.",
        "Elle repense l'approche selon le 70-20-10 : la journée de cours (le 10 %) est conservée mais complétée par du coaching entre pairs (le 20 %) et surtout par des mises en situation suivies et débriefées sur le terrain (le 70 %). Cette fois, les indicateurs de satisfaction client s'améliorent réellement. La leçon : une formation appréciée n'est pas une formation efficace ; c'est le transfert au travail qui compte, et l'apprentissage s'ancre surtout par la pratique encadrée, pas par une seule journée en salle.",
      ],
    },
    exercise: {
      title: "Concevoir et mesurer un plan de développement",
      prompt: [
        "Pour une organisation de votre choix, identifiez un besoin de compétence futur (pas seulement actuel) en le reliant à un objectif stratégique ou à une évolution du secteur, et expliquez en quoi une approche anticipée vaut mieux qu'une approche réactive.",
        "Concevez un plan de développement pour combler ce besoin en appliquant le modèle 70-20-10 : précisez la part de formation formelle (10 %), d'apprentissage social (20 %) et d'apprentissage en situation (70 %), avec des activités concrètes pour chacune.",
        "Proposez enfin une façon de mesurer le transfert réel de cette formation au travail, au-delà de la satisfaction des participants, en identifiant au moins un indicateur concret à suivre.",
      ],
      deliverables: [
        "Un besoin de compétence futur relié à un objectif stratégique",
        "Un plan de développement structuré selon le modèle 70-20-10, avec activités concrètes",
        "Une méthode de mesure du transfert réel au travail, avec un indicateur concret",
        "Une justification de l'approche anticipée face à l'approche réactive",
      ],
    },
    keyTakeaways: [
      "Les besoins de formation doivent anticiper l'avenir, pas seulement corriger le présent",
      "Le 70-20-10 rappelle que l'apprentissage se fait surtout par la pratique et l'échange",
      "L'apprentissage informel (mentorat, projets) est souvent plus impactant que la formation formelle seule",
      "Une formation appréciée mais non appliquée est un budget gaspillé",
      "Mesurer la satisfaction ne suffit pas — il faut mesurer le transfert réel au travail",
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
      "Privilégier la résolution informelle avant les processus formels",
      "Gérer un grief avec rigueur procédurale et respect des délais",
      "Distinguer les rôles de la médiation et de l'arbitrage",
    ],
    content: [
      "Le Québec a un taux de syndicalisation parmi les plus élevés en Amérique du Nord. Le Code du travail encadre les relations syndicales-patronales : accréditation syndicale, négociation collective, droit de grève et de lock-out, et mécanismes d'arbitrage des griefs.",
      "Cette réalité surprend souvent les gestionnaires venus de contextes moins syndiqués. Dans un milieu syndiqué, la relation entre l'employeur et les employés est médiatisée par la convention collective — un contrat qui fixe les règles du jeu et que nul ne peut contourner unilatéralement. Un gestionnaire ne peut pas modifier un horaire, discipliner ou promouvoir « comme il l'entend » : il doit respecter la convention. Cela peut sembler contraignant, mais un cadre clair, bien maîtrisé, prévient aussi l'arbitraire et les conflits. Comprendre et appliquer la convention collective n'est pas une option dans ces milieux : c'est le b.a.-ba du gestionnaire.",
      "La résolution de conflits en milieu de travail privilégie d'abord le dialogue direct entre les parties, puis la médiation par un tiers neutre si nécessaire, avant de recourir à des processus plus formels comme l'arbitrage ou les recours légaux.",
      "Cette escalade graduée n'est pas qu'une politesse : c'est une logique d'efficacité. Un désaccord réglé par une conversation directe entre les parties coûte quelques minutes ; le même désaccord porté jusqu'à l'arbitrage formel peut mobiliser des mois, des avocats et des sommes considérables, tout en détériorant durablement les relations. Le rôle du professionnel RH est souvent d'agir tôt, comme facilitateur, pour éviter qu'un petit irritant ne s'envenime jusqu'aux instances formelles. La médiation par un tiers neutre est une étape intermédiaire précieuse : elle aide les parties à trouver elles-mêmes une solution, sans le caractère perdant-gagnant d'une décision imposée.",
      "Un grief doit être traité selon une procédure rigoureuse définie dans la convention collective : délais stricts, documentation complète, et implication appropriée des représentants syndicaux et patronaux à chaque étape du processus.",
      "Ici, la forme est aussi importante que le fond, ce qui déconcerte souvent les nouveaux gestionnaires. Un grief parfaitement fondé sur le fond peut être rejeté uniquement parce qu'un délai a été dépassé ou qu'une étape procédurale a été omise. Les conventions collectives fixent des délais stricts pour déposer un grief et pour y répondre, et ces délais ont force de loi entre les parties. Rater une échéance peut faire perdre une cause légitime — pour l'employé comme pour l'employeur. D'où l'importance d'une documentation rigoureuse et d'un suivi méticuleux des étapes : dans les relations de travail, la rigueur procédurale n'est pas de la bureaucratie, c'est la condition même de la validité.",
    ],
    caseStudy: {
      title: "Le grief perdu pour deux jours de retard chez Métallika",
      body: [
        "Chez Métallika, une usine syndiquée, un employé, Roberto, est suspendu pour un incident. Le syndicat comme plusieurs collègues estiment la sanction excessive et probablement injustifiée sur le fond : Roberto avait de bons arguments. Convaincu d'avoir raison, tout le monde traite le dossier sans urgence, persuadé que « la justice suivra son cours ».",
        "Or la convention collective prévoit un délai strict de quinze jours pour déposer un grief contestant une mesure disciplinaire. Dans le flottement, personne ne s'assure du respect de ce délai, et le grief est déposé deux jours trop tard. L'employeur soulève l'irrecevabilité : peu importe le bien-fondé de la cause de Roberto, le non-respect du délai procédural rend le grief irrecevable. La suspension tient, non pas parce qu'elle était justifiée, mais parce que la procédure n'a pas été respectée.",
        "Le représentant syndical et la RH tirent la même leçon, chacun de leur côté : dans les relations de travail, une cause juste mal portée est une cause perdue. Ils instaurent un suivi rigoureux des délais et une documentation systématique dès qu'un différend surgit. La leçon : la rigueur procédurale n'est pas un détail administratif mais la condition de validité — un grief fondé mais hors délai ne vaut rien, et le respect des étapes protège autant l'employé que l'employeur.",
      ],
    },
    exercise: {
      title: "Gérer un différend, de l'informel au grief",
      prompt: [
        "Décrivez une escalade de résolution de conflit pour un différend fictif en milieu de travail : quelle serait la première étape informelle (dialogue direct), la deuxième (médiation par un tiers), et la dernière (processus formel/arbitrage) ? Expliquez pourquoi commencer par l'informel est préférable en termes de coût et de relations.",
        "Pour un grief disciplinaire fictif, dressez la liste des éléments procéduraux essentiels à respecter : délais, documentation à réunir, parties à impliquer à chaque étape.",
        "Rédigez enfin une courte note expliquant à un nouveau gestionnaire pourquoi, dans les relations de travail, le respect des délais et de la procédure peut l'emporter sur le bien-fondé d'une cause.",
      ],
      deliverables: [
        "Une escalade de résolution en trois niveaux (informel, médiation, formel), justifiée",
        "La liste des éléments procéduraux essentiels d'un grief (délais, documentation, parties)",
        "Une note sur la primauté de la rigueur procédurale dans les relations de travail",
        "La distinction claire entre le rôle de la médiation et celui de l'arbitrage",
      ],
    },
    keyTakeaways: [
      "En milieu syndiqué, la convention collective fixe les règles que nul ne peut contourner",
      "Le Québec a un environnement de relations de travail fortement syndiqué",
      "La résolution informelle rapide est toujours préférable aux processus formels longs et coûteux",
      "La médiation aide les parties à trouver elles-mêmes une solution, sans verdict imposé",
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
      "Distinguer la diversité (présence) de l'inclusion (appartenance)",
      "Mettre en place des pratiques d'inclusion concrètes",
      "Reconnaître et atténuer les biais inconscients chez les décideurs",
    ],
    content: [
      "Le Canada, et particulièrement le Québec, accueille un nombre croissant de travailleurs issus de l'immigration. Les organisations RH doivent adapter leurs pratiques pour reconnaître les diplômes étrangers, valoriser l'expérience internationale et faciliter l'intégration culturelle des nouveaux employés.",
      "Il faut distinguer deux notions souvent confondues : la diversité et l'inclusion. La diversité, c'est la composition — qui est présent dans l'organisation, dans toute sa variété d'origines, de parcours, de profils. L'inclusion, c'est l'expérience vécue — chacun se sent-il respecté, entendu, capable de contribuer pleinement et de progresser ? On peut avoir une équipe très diverse mais peu inclusive, où les nouveaux arrivants restent cantonnés aux marges, jamais promus, jamais réellement écoutés. Recruter la diversité sans construire l'inclusion, c'est ouvrir la porte sans offrir de place à table. Le second effort est plus exigeant que le premier, et c'est lui qui fait la différence.",
      "Des pratiques d'inclusion concrètes incluent des comités de diversité, des programmes de mentorat interculturel, l'adaptation des fêtes et congés religieux, et une communication interne accessible en plusieurs langues lorsque pertinent.",
      "La clé est le mot « concret » : l'inclusion se juge aux actes, pas aux déclarations. Afficher une belle charte de valeurs sur le mur ne change rien si, dans les faits, les promotions vont toujours aux mêmes profils et les idées des nouveaux arrivants sont systématiquement écartées. Les pratiques qui comptent sont mesurables et vérifiables : un mentorat qui accélère réellement l'intégration, une révision des critères de promotion pour en retirer les biais, une flexibilité authentique sur les congés religieux. Une organisation sérieuse sur l'inclusion se donne des indicateurs — qui est promu, qui part, qui se sent écouté — et agit sur les écarts, plutôt que de se contenter d'un discours vertueux.",
      "La sensibilisation aux biais inconscients — préférence pour les candidats au parcours similaire au sien, jugement basé sur l'accent ou le nom — passe par une formation continue des gestionnaires impliqués dans les décisions d'embauche et de promotion.",
      "Le mot « inconscient » est essentiel : ces biais n'ont rien à voir avec la méchanceté ou le racisme assumé. Des gestionnaires bienveillants, convaincus d'être équitables, écartent pourtant, sans s'en rendre compte, le CV au nom peu familier, jugent un accent comme un signe de moindre compétence, ou favorisent le candidat qui leur ressemble. Précisément parce qu'ils sont inconscients, ces biais ne se corrigent pas par la seule bonne volonté : il faut les nommer, les illustrer, et instaurer des garde-fous (processus structurés, décisions à plusieurs, critères explicites). Former les décideurs — ceux dont les choix ouvrent ou ferment des opportunités — est le levier le plus efficace, car c'est là que les biais font le plus de dégâts.",
    ],
    caseStudy: {
      title: "L'équipe diverse mais fermée de chez GlobalServ",
      body: [
        "GlobalServ est fière de sa diversité : son effectif compte des employés d'une vingtaine de nationalités, fruit d'un recrutement volontariste. La direction affiche cette diversité comme une réussite. Pourtant, une enquête interne révèle un malaise : les employés issus de l'immigration se disent peu écoutés, rarement promus, et cantonnés aux postes d'exécution. La diversité était là ; l'inclusion, non.",
        "La responsable RH creuse et identifie le mécanisme. Le recrutement, structuré, amenait bien des profils variés. Mais les promotions, elles, se décidaient de façon informelle, « au feeling », entre gestionnaires — et reproduisaient systématiquement les mêmes profils, par pur biais inconscient d'affinité. Un employé compétent au fort accent avait vu son idée ignorée en réunion, puis reprise et applaudie quand un collègue « local » l'a reformulée. Personne n'était malveillant ; les biais opéraient en silence.",
        "GlobalServ passe des déclarations aux actes : critères de promotion explicites et communs, décisions collégiales plutôt qu'individuelles, mentorat interculturel, et formation des gestionnaires aux biais inconscients avec des exemples concrets. En deux ans, la composition des postes de responsabilité commence enfin à refléter la diversité de la base. La leçon : recruter divers ne suffit pas ; sans inclusion concrète et sans s'attaquer aux biais des décideurs, la diversité reste une façade, et les talents finissent par partir.",
      ],
    },
    exercise: {
      title: "Passer de la diversité à l'inclusion réelle",
      prompt: [
        "Expliquez, avec vos propres mots et un exemple concret, la différence entre diversité et inclusion, et pourquoi une organisation peut être diverse sans être inclusive.",
        "Proposez pour une organisation trois pratiques d'inclusion concrètes et mesurables (pas de simples déclarations), en précisant pour chacune l'indicateur qui permettrait de vérifier qu'elle produit un effet réel.",
        "Identifiez enfin trois biais inconscients susceptibles d'affecter les décisions d'embauche ou de promotion, et pour chacun, proposez un garde-fou concret (processus, critère explicite, décision collégiale…) pour l'atténuer.",
      ],
      deliverables: [
        "Une explication illustrée de la différence entre diversité et inclusion",
        "Trois pratiques d'inclusion concrètes, chacune assortie d'un indicateur de suivi",
        "Trois biais inconscients identifiés avec, pour chacun, un garde-fou concret",
        "Une justification du ciblage prioritaire des décideurs pour la formation aux biais",
      ],
    },
    keyTakeaways: [
      "La diversité est la présence ; l'inclusion est l'expérience d'appartenance réelle",
      "Recruter divers sans construire l'inclusion, c'est ouvrir la porte sans offrir de place",
      "L'inclusion se juge aux actes concrets et mesurables, pas aux déclarations de principe",
      "Les biais inconscients touchent même des gestionnaires bienveillants et exigent des garde-fous",
      "La formation aux biais doit cibler en priorité les décideurs d'embauche et de promotion",
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
      "Intégrer recrutement, performance, rémunération et développement de façon cohérente",
      "Définir des indicateurs de succès mesurables",
      "Présenter et défendre une feuille de route RH",
    ],
    content: [
      "Le projet final demande de concevoir un plan RH complet pour une organisation, en partant de ses objectifs stratégiques : quels talents recruter, comment les retenir, quelle structure de rémunération adopter et quels programmes de développement prioriser.",
      "C'est ici que convergent tous les modules : le droit du travail (module 1), le recrutement (module 2), la performance (module 3), la rémunération (module 4), le développement (module 5), les relations de travail (module 6) et l'inclusion (module 7). Mais le point de départ n'est jamais les RH elles-mêmes : c'est la stratégie de l'organisation. Une entreprise qui vise une croissance rapide, une autre qui cherche à stabiliser une équipe experte, une troisième qui s'internationalise n'ont pas les mêmes besoins RH. Le plan RH est au service de la stratégie d'affaires, pas l'inverse — s'en écarter, c'est bâtir un bel édifice RH déconnecté de ce dont l'entreprise a réellement besoin.",
      "Le plan doit démontrer la cohérence entre toutes les fonctions RH : un plan de recrutement ambitieux sans budget de rémunération compétitif, par exemple, révèle une faille stratégique majeure qui doit être identifiée et corrigée.",
      "Cette cohérence d'ensemble est le vrai test de maturité d'un professionnel RH. Les fonctions RH forment un système où tout se tient : recruter des talents rares qu'on ne peut pas payer les fera fuir ; former les gens sans perspectives d'évolution les rendra employables ailleurs ; exiger de la performance sans reconnaissance démobilise. Une seule fonction brillante mais isolée ne suffit pas — c'est l'articulation entre elles qui crée la valeur. Le jury (comme un vrai comité de direction) repère immédiatement les contradictions : promettre l'inclusion tout en gardant des promotions « au feeling », viser la rétention tout en négligeant la rémunération. Un bon plan est cohérent de bout en bout.",
      "La présentation finale inclut des indicateurs de succès mesurables (taux de roulement, délai de recrutement, satisfaction des employés) permettant de suivre l'efficacité du plan RH dans le temps et d'ajuster les actions en conséquence.",
      "Les indicateurs transforment un plan RH d'une liste de bonnes intentions en un dispositif pilotable. Sans eux, impossible de savoir si les efforts portent : le roulement baisse-t-il ? Le délai de recrutement s'améliore-t-il ? Les employés se sentent-ils plus engagés ? Ces chiffres donnent aussi aux RH une crédibilité précieuse face à la direction, en traduisant leur action en résultats concrets plutôt qu'en promesses. Longtemps perçues comme un centre de coûts, les RH modernes se légitiment en démontrant, données à l'appui, leur contribution à la performance de l'organisation. Mesurer, c'est pouvoir prouver — et pouvoir ajuster.",
    ],
    caseStudy: {
      title: "Le plan RH qui se contredisait chez Croissance Plus",
      body: [
        "Une étudiante, Amina, présente son projet final : un plan RH pour une PME technologique en forte croissance. Son plan est ambitieux et bien documenté sur chaque fonction prise séparément — un recrutement agressif pour doubler l'effectif, des standards de performance élevés, un beau discours sur la rétention et l'inclusion.",
        "Le jury, jouant le rôle d'un comité de direction, pointe les contradictions internes. Le plan prévoit de recruter des profils très recherchés, mais le budget de rémunération proposé est sous le marché : ces talents partiront aussitôt embauchés. On vise la rétention, mais aucun programme de développement n'offre de perspectives d'évolution. On proclame l'inclusion, mais les critères de promotion restent flous et informels. Chaque brique était solide ; l'édifice, lui, ne tenait pas ensemble.",
        "Amina retravaille son plan en système cohérent : elle aligne le budget de rémunération sur l'ambition de recrutement, relie développement et rétention, formalise des critères de promotion au service de l'inclusion, et surtout ancre le tout dans la stratégie de croissance de l'entreprise. Elle ajoute des indicateurs (taux de roulement, délai de recrutement, engagement) pour piloter le plan. La version révisée convainc. La leçon : en RH stratégique, la cohérence entre les fonctions vaut plus que l'excellence de chacune isolément, et sans indicateurs, un plan reste un vœu invérifiable.",
      ],
    },
    exercise: {
      title: "Concevoir un plan RH stratégique cohérent",
      prompt: [
        "Choisissez une organisation (réelle ou fictive) et un objectif stratégique clair (croissance, internationalisation, stabilisation…). À partir de cet objectif, esquissez un plan RH intégré couvrant recrutement, performance, rémunération et développement, en montrant comment chaque volet sert la stratégie.",
        "Vérifiez explicitement la cohérence d'ensemble : identifiez au moins une contradiction potentielle entre deux fonctions RH de votre plan (par exemple recrutement vs rémunération) et corrigez-la.",
        "Définissez enfin trois indicateurs de succès mesurables pour suivre l'efficacité du plan dans le temps, en expliquant ce que chacun révélerait et comment il renforcerait la crédibilité des RH auprès de la direction.",
      ],
      deliverables: [
        "Un plan RH intégré découlant explicitement d'un objectif stratégique",
        "L'identification et la correction d'au moins une contradiction entre deux fonctions RH",
        "Trois indicateurs de succès mesurables, chacun relié à ce qu'il révèle",
        "Une justification du rôle des indicateurs dans la crédibilité des RH",
      ],
    },
    keyTakeaways: [
      "Le projet final fait converger tous les modules autour de la stratégie d'affaires",
      "Un plan RH efficace découle toujours de la stratégie globale de l'organisation, jamais l'inverse",
      "Les fonctions RH forment un système : la cohérence entre elles vaut plus que l'excellence isolée",
      "Les indicateurs transforment un plan de bonnes intentions en dispositif pilotable",
      "Mesurer donne aux RH la crédibilité de prouver leur contribution à la performance",
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
