import type { Lesson } from "@/types/lesson";

export const francaisAffairesLessons: Lesson[] = [
  {
    title: "Français professionnel : bases et vocabulaire",
    objectives: [
      "Acquérir le vocabulaire de base du monde du travail québécois",
      "Distinguer le registre formel et informel en contexte professionnel",
      "Construire des phrases professionnelles simples et claires",
    ],
    content: [
      "Le français professionnel se distingue du français courant par un vocabulaire spécifique : poste, embauche, échéancier, mandat, livrable. Maîtriser ces termes de base est essentiel avant d'aborder des situations de communication plus complexes.",
      "Le registre formel s'utilise avec les supérieurs hiérarchiques, les clients et dans les communications écrites officielles. Le registre plus informel, bien que présent dans certaines cultures d'entreprise québécoises, doit être utilisé avec prudence par les nouveaux arrivants jusqu'à bien connaître les codes du milieu.",
      "La construction de phrases professionnelles privilégie la clarté et la concision. Éviter les phrases trop longues, utiliser des verbes d'action précis (proposer, recommander, analyser) et structurer ses idées avec des connecteurs logiques (d'abord, ensuite, par conséquent).",
    ],
    keyTakeaways: [
      "Le vocabulaire professionnel de base doit être automatisé avant les situations complexes",
      "Le registre formel reste la valeur sûre dans un nouveau milieu de travail",
      "La clarté prime toujours sur la sophistication du vocabulaire",
    ],
    resources: [
      { label: "Office québécois de la langue française — Vocabulaire du travail", url: "https://www.oqlf.gouv.qc.ca" },
      { label: "TV5Monde — Français professionnel", url: "https://langue-francaise.tv5monde.com" },
    ],
    quiz: [
      { question: "Que signifie le terme 'échéancier' en contexte professionnel ?", options: ["Un type de café", "Un calendrier prévisionnel des étapes et délais d'un projet", "Un poste de direction", "Un logiciel de comptabilité"], correctIndex: 1, explanation: "Un échéancier est un document qui planifie les différentes étapes d'un projet avec leurs dates limites." },
      { question: "Quand le registre formel est-il particulièrement recommandé ?", options: ["Jamais", "Avec les supérieurs hiérarchiques et les clients", "Uniquement entre amis", "Seulement à l'oral"], correctIndex: 1, explanation: "Le registre formel est la valeur sûre dans les communications avec la hiérarchie et la clientèle, surtout pour un nouvel arrivant." },
      { question: "Quel élément est recommandé pour structurer logiquement ses idées à l'écrit ?", options: ["Les emojis", "Les connecteurs logiques (d'abord, ensuite, par conséquent)", "Les abréviations textos", "Le silence"], correctIndex: 1, explanation: "Les connecteurs logiques aident le lecteur à suivre la progression du raisonnement de manière claire." },
      { question: "Que veut dire 'livrable' en milieu professionnel ?", options: ["Un colis postal", "Un résultat concret attendu d'un projet ou d'une tâche", "Un type de boisson", "Un jour férié"], correctIndex: 1, explanation: "Un livrable désigne un résultat tangible attendu à une étape donnée d'un projet (rapport, prototype, document, etc.)." },
      { question: "Quelle qualité doit primer dans la rédaction professionnelle selon le module ?", options: ["La sophistication du vocabulaire", "La clarté", "La longueur des phrases", "L'utilisation d'argot"], correctIndex: 1, explanation: "La clarté et la concision sont valorisées en milieu professionnel, plus que la complexité du vocabulaire." },
      { question: "Pourquoi le vocabulaire professionnel de base doit-il être automatisé ?", options: ["Pour impressionner les collègues", "Pour pouvoir se concentrer sur des situations de communication plus complexes ensuite", "Ce n'est pas nécessaire", "Pour passer un examen uniquement"], correctIndex: 1, explanation: "Maîtriser les bases facilite l'aisance dans des échanges professionnels plus exigeants par la suite." },
    ],
  },
  {
    title: "Communication orale en entreprise",
    objectives: [
      "Participer efficacement à une réunion en français",
      "Présenter une idée ou un projet de manière structurée",
      "Utiliser les formules de politesse appropriées au contexte québécois",
    ],
    content: [
      "Participer à une réunion exige de savoir prendre la parole au bon moment, reformuler pour confirmer sa compréhension, et poser des questions de clarification sans crainte. Les Québécois valorisent une communication directe mais courtoise.",
      "Une présentation structurée suit généralement le plan : contexte, problème, solution proposée, bénéfices attendus. L'utilisation de transitions claires aide l'auditoire à suivre le raisonnement, même pour un locuteur non natif.",
      "Les formules de politesse varient selon le contexte : un courriel professionnel commence souvent par 'Bonjour' suivi du prénom (culture plus informelle qu'en France), tandis qu'une réunion formelle conserve des marques de respect comme 'Merci de votre attention' en conclusion.",
    ],
    keyTakeaways: [
      "Reformuler pour confirmer sa compréhension évite les malentendus coûteux",
      "Une structure claire compense un vocabulaire encore limité",
      "Le tutoiement et l'usage du prénom sont courants au Québec, même en contexte professionnel",
    ],
    resources: [
      { label: "Radio-Canada — Ressources linguistiques", url: "https://ici.radio-canada.ca" },
    ],
    quiz: [
      { question: "Quelle technique aide à éviter les malentendus en réunion ?", options: ["Ne jamais parler", "Reformuler pour confirmer sa compréhension", "Parler le plus vite possible", "Éviter de poser des questions"], correctIndex: 1, explanation: "Reformuler ce qu'on a compris permet de vérifier et corriger toute incompréhension avant qu'elle ne devienne un problème." },
      { question: "Quel plan structure généralement une présentation professionnelle efficace ?", options: ["Conclusion, contexte, problème", "Contexte, problème, solution, bénéfices", "Aucun ordre n'est important", "Bénéfices uniquement"], correctIndex: 1, explanation: "Ce plan logique guide l'auditoire du contexte vers une solution claire et ses avantages." },
      { question: "Comment commence généralement un courriel professionnel au Québec ?", options: ["Par 'Cher Monsieur le Directeur'", "Par 'Bonjour' suivi du prénom", "Sans aucune salutation", "Toujours en anglais"], correctIndex: 1, explanation: "La culture québécoise est plus informelle qu'en France, et l'usage du prénom dès le début est courant et bien accepté." },
      { question: "Que permet une structure claire dans une présentation, même avec un vocabulaire limité ?", options: ["Rien, le vocabulaire est tout ce qui compte", "De compenser et de rester compréhensible malgré les limites linguistiques", "D'éviter complètement de parler", "De parler plus vite"], correctIndex: 1, explanation: "Une bonne structure aide l'auditoire à suivre le message même si le vocabulaire du locuteur est encore en développement." },
      { question: "Qu'est-ce qui caractérise la communication au Québec selon le module ?", options: ["Une franchise directe mais courtoise", "Une formalité extrême et rigide", "L'absence totale de politesse", "Le silence systématique"], correctIndex: 0, explanation: "Les Québécois valorisent généralement une communication directe tout en restant courtois et respectueux." },
      { question: "Le tutoiement en milieu professionnel au Québec est :", options: ["Strictement interdit", "Courant, même avec la hiérarchie", "Réservé uniquement aux amis proches", "Une grave offense"], correctIndex: 1, explanation: "Contrairement à d'autres cultures francophones, le tutoiement est largement répandu au travail au Québec." },
    ],
  },
  {
    title: "Rédaction professionnelle (courriels, rapports)",
    objectives: [
      "Rédiger un courriel professionnel clair et complet",
      "Structurer un rapport simple avec introduction, développement, conclusion",
      "Éviter les anglicismes courants en français des affaires",
    ],
    content: [
      "Un courriel professionnel efficace contient un objet précis, une formule d'appel adaptée, un message structuré en paragraphes courts et une formule de salutation finale. Toujours relire avant l'envoi pour éviter les erreurs qui nuisent à la crédibilité.",
      "Un rapport professionnel suit une structure logique : résumé exécutif (si nécessaire), contexte, méthodologie, résultats, recommandations. Les titres et sous-titres facilitent la lecture rapide par des destinataires pressés.",
      "Le français québécois des affaires évite certains anglicismes répandus à l'oral : on dit 'courriel' plutôt que 'email', 'clavarder' plutôt que 'chatter', 'pourriel' plutôt que 'spam'. Ces termes sont d'usage officiel dans les communications écrites.",
    ],
    keyTakeaways: [
      "Un objet de courriel précis augmente le taux de réponse et la clarté",
      "La structure d'un rapport doit permettre une lecture rapide en diagonale",
      "Les termes français officiels sont attendus dans les communications écrites professionnelles",
    ],
    resources: [
      { label: "Banque de dépannage linguistique — OQLF", url: "https://bdl.oqlf.gouv.qc.ca" },
    ],
    quiz: [
      { question: "Quel terme officiel québécois remplace 'email' ?", options: ["Courriel", "Mailbox", "Internet", "Messagerie"], correctIndex: 0, explanation: "'Courriel' est le terme officiel utilisé au Québec à la place de l'anglicisme 'email'." },
      { question: "Quel terme remplace officiellement 'spam' en français québécois ?", options: ["Déchet numérique", "Pourriel", "Junk mail", "Bloqueur"], correctIndex: 1, explanation: "'Pourriel' est le terme officiel français pour désigner les courriels indésirables (spam)." },
      { question: "Que doit contenir un courriel professionnel efficace ?", options: ["Un objet vague", "Un objet précis et une formule de salutation finale", "Aucune structure particulière", "Uniquement des images"], correctIndex: 1, explanation: "Un objet précis et une structure claire avec salutation finale augmentent la clarté et le professionnalisme du message." },
      { question: "Quelle est la première étape d'un rapport professionnel bien structuré ?", options: ["La conclusion", "Le contexte (après un résumé exécutif si nécessaire)", "Les annexes", "Aucune étape n'est requise"], correctIndex: 1, explanation: "Le rapport débute généralement par le contexte qui situe le sujet avant de développer méthodologie et résultats." },
      { question: "Que remplace le terme 'clavarder' ?", options: ["Imprimer", "Chatter (discuter en ligne)", "Effacer", "Sauvegarder"], correctIndex: 1, explanation: "'Clavarder' est le terme québécois officiel pour désigner la conversation en ligne par clavier (chat)." },
      { question: "Pourquoi faut-il toujours relire un courriel avant l'envoi ?", options: ["Ce n'est pas nécessaire", "Pour éviter les erreurs qui nuisent à la crédibilité professionnelle", "Pour perdre du temps", "Pour respecter une loi"], correctIndex: 1, explanation: "Les erreurs non corrigées peuvent nuire à l'image professionnelle de l'expéditeur." },
    ],
  },
  {
    title: "Français québécois : expressions et culture",
    objectives: [
      "Reconnaître les expressions québécoises courantes en milieu professionnel",
      "Comprendre les nuances culturelles de la communication au travail",
      "Éviter les malentendus liés aux différences linguistiques régionales",
    ],
    content: [
      "Le français québécois comporte des expressions propres au milieu professionnel : 'faire du pouce' (profiter d'une opportunité), 'capoter' (être enthousiaste ou dépassé selon le contexte), 'c'est correct' (c'est acceptable). Comprendre ces expressions facilite l'intégration sociale au travail.",
      "La culture professionnelle québécoise valorise l'égalité hiérarchique apparente : les employés tutoient souvent leurs supérieurs et les réunions encouragent la participation de tous, contrairement à des cultures plus hiérarchiques.",
      "Les nouveaux arrivants doivent aussi s'adapter au rythme de communication : les Québécois apprécient généralement la franchise mesurée, évitant les confrontations directes mais valorisant l'honnêteté dans le feedback professionnel.",
    ],
    keyTakeaways: [
      "Les expressions régionales facilitent l'intégration mais doivent être utilisées avec discernement",
      "La culture québécoise valorise une hiérarchie moins marquée qu'ailleurs dans la francophonie",
      "Observer avant d'imiter reste la meilleure stratégie d'adaptation culturelle",
    ],
    resources: [
      { label: "Le Grand Dictionnaire Terminologique", url: "https://gdt.oqlf.gouv.qc.ca" },
    ],
    quiz: [
      { question: "Que signifie l'expression québécoise 'c'est correct' ?", options: ["C'est une erreur grave", "C'est acceptable", "C'est interdit", "C'est urgent"], correctIndex: 1, explanation: "'C'est correct' est une expression courante signifiant que quelque chose est acceptable ou satisfaisant." },
      { question: "Comment décrire la hiérarchie en milieu professionnel québécois ?", options: ["Extrêmement rigide et formelle", "Moins marquée, avec un tutoiement fréquent même envers les supérieurs", "Inexistante", "Identique partout dans la francophonie"], correctIndex: 1, explanation: "La culture québécoise valorise une hiérarchie moins marquée que dans d'autres pays francophones." },
      { question: "Quelle stratégie est recommandée pour un nouvel arrivant face aux expressions régionales ?", options: ["Les utiliser immédiatement sans discernement", "Observer avant d'imiter", "Les ignorer complètement", "Les corriger systématiquement"], correctIndex: 1, explanation: "Observer le contexte d'usage avant d'adopter soi-même les expressions évite les maladresses culturelles." },
      { question: "Comment les Québécois abordent-ils généralement le feedback professionnel ?", options: ["Avec une franchise mesurée, honnête mais sans confrontation directe", "Jamais de feedback n'est donné", "Toujours de manière très agressive", "Uniquement par écrit anonyme"], correctIndex: 0, explanation: "La culture valorise l'honnêteté du feedback tout en évitant les confrontations directes et brusques." },
      { question: "Que signifie l'expression 'faire du pouce' en contexte professionnel ?", options: ["Faire de l'auto-stop uniquement", "Profiter d'une opportunité", "Refuser une offre", "Quitter son emploi"], correctIndex: 1, explanation: "Dans ce contexte, 'faire du pouce' signifie tirer parti ou profiter d'une occasion favorable." },
      { question: "Pourquoi comprendre les expressions régionales facilite-t-il l'intégration ?", options: ["Ce n'est pas utile", "Cela aide à mieux comprendre les collègues et à s'intégrer socialement", "Cela complique toujours la communication", "Cela n'a aucun lien avec le travail"], correctIndex: 1, explanation: "Comprendre le langage informel utilisé par les collègues facilite les relations sociales et l'intégration au sein de l'équipe." },
    ],
  },
  {
    title: "Préparation aux entretiens d'embauche",
    objectives: [
      "Préparer des réponses structurées aux questions fréquentes",
      "Présenter son parcours de manière convaincante en français",
      "Poser des questions pertinentes à l'employeur",
    ],
    content: [
      "Les questions fréquentes en entrevue québécoise incluent 'Parlez-moi de vous', 'Pourquoi ce poste vous intéresse-t-il', et 'Quelle est votre plus grande force/faiblesse'. La méthode STAR (Situation, Tâche, Action, Résultat) structure efficacement les réponses comportementales.",
      "Présenter son parcours international comme un atout plutôt qu'un obstacle change la perception de l'employeur : mettre en avant l'adaptabilité, les compétences transférables et la motivation à contribuer à l'économie québécoise.",
      "Poser des questions à la fin de l'entrevue démontre l'intérêt réel pour le poste : interroger sur l'équipe, les défis actuels du département ou les perspectives d'évolution montre une réflexion sérieuse, pas seulement le désir d'obtenir un emploi.",
    ],
    keyTakeaways: [
      "La méthode STAR structure des réponses claires et mémorables",
      "L'expérience internationale doit être présentée comme une valeur ajoutée",
      "Poser des questions pertinentes en fin d'entrevue distingue les candidats sérieux",
    ],
    resources: [
      { label: "Emploi-Québec — Guide de préparation à l'entrevue", url: "https://www.quebec.ca/emploi" },
    ],
    quiz: [
      { question: "Que signifie la méthode STAR utilisée en entrevue ?", options: ["Situation, Tâche, Action, Résultat", "Salaire, Travail, Avantages, Retraite", "Sourire, Tenue, Attitude, Réseau", "Aucune signification particulière"], correctIndex: 0, explanation: "STAR structure les réponses comportementales en décrivant la Situation, la Tâche, l'Action prise et le Résultat obtenu." },
      { question: "Comment l'expérience internationale doit-elle être présentée selon le module ?", options: ["Comme un obstacle à cacher", "Comme un atout et une valeur ajoutée", "Il ne faut jamais en parler", "Comme une excuse"], correctIndex: 1, explanation: "L'expérience internationale doit être valorisée comme une source d'adaptabilité et de compétences transférables." },
      { question: "Pourquoi poser des questions à la fin d'une entrevue est-il recommandé ?", options: ["Ce n'est jamais recommandé", "Pour démontrer un intérêt réel et une réflexion sérieuse pour le poste", "Pour prolonger inutilement l'entretien", "Pour négocier immédiatement le salaire"], correctIndex: 1, explanation: "Poser des questions pertinentes montre à l'employeur que le candidat a réfléchi sérieusement au poste et à l'organisation." },
      { question: "Quelle question fréquente est mentionnée dans le module ?", options: ["Quel est votre signe astrologique ?", "Parlez-moi de vous", "Combien d'enfants avez-vous ?", "Quelle est votre religion ?"], correctIndex: 1, explanation: "'Parlez-moi de vous' est une question d'ouverture très courante en entrevue d'embauche au Québec." },
      { question: "Quel type de compétences doit-on mettre en avant venant d'un parcours international ?", options: ["Aucune compétence n'est transférable", "Les compétences transférables et l'adaptabilité", "Uniquement les diplômes obtenus à l'étranger", "Le lieu de naissance"], correctIndex: 1, explanation: "Les compétences transférables et la capacité d'adaptation sont des arguments forts pour un parcours international." },
      { question: "La méthode STAR est particulièrement utile pour quel type de question ?", options: ["Les questions sur le salaire uniquement", "Les questions comportementales", "Les questions sur la météo", "Aucune question spécifique"], correctIndex: 1, explanation: "STAR est conçue spécifiquement pour structurer les réponses aux questions comportementales qui demandent des exemples concrets." },
    ],
  },
  {
    title: "Négociation et présentation en français",
    objectives: [
      "Utiliser un vocabulaire de négociation approprié",
      "Présenter une proposition avec assurance",
      "Gérer les objections de manière constructive",
    ],
    content: [
      "Le vocabulaire de négociation inclut des expressions clés : 'Je propose que...', 'Serait-il possible de...', 'Je comprends votre point, cependant...'. Ces formules permettent d'exprimer un désaccord tout en maintenant une relation professionnelle cordiale.",
      "Présenter une proposition avec assurance ne signifie pas être agressif : il s'agit de structurer son argumentaire avec des faits, d'anticiper les objections possibles et de proposer des solutions plutôt que de simplement énoncer un problème.",
      "Gérer les objections de manière constructive implique d'écouter complètement l'objection avant de répondre, de reformuler pour montrer sa compréhension, puis d'apporter une réponse factuelle plutôt que défensive.",
    ],
    keyTakeaways: [
      "Le désaccord professionnel s'exprime par des formules nuancées, pas des refus directs",
      "Une bonne négociation anticipe les objections avant qu'elles ne soient soulevées",
      "Écouter complètement avant de répondre désamorce la plupart des tensions",
    ],
    resources: [
      { label: "HEC Montréal — Ressources en négociation", url: "https://www.hec.ca" },
    ],
    quiz: [
      { question: "Quelle formule permet d'exprimer un désaccord tout en restant cordial ?", options: ["'Vous avez tort'", "'Je comprends votre point, cependant...'", "'C'est faux'", "Le silence complet"], correctIndex: 1, explanation: "Cette formule reconnaît le point de vue de l'autre tout en introduisant nuancément un désaccord ou une précision." },
      { question: "Que signifie présenter une proposition 'avec assurance' selon le module ?", options: ["Être agressif", "Structurer son argumentaire avec des faits, sans agressivité", "Parler très fort", "Éviter tout contact visuel"], correctIndex: 1, explanation: "L'assurance se manifeste par une argumentation factuelle et structurée, pas par l'agressivité." },
      { question: "Quelle est la première étape pour gérer une objection de manière constructive ?", options: ["Répondre immédiatement sans écouter", "Écouter complètement l'objection avant de répondre", "Ignorer l'objection", "Changer de sujet"], correctIndex: 1, explanation: "Écouter pleinement avant de répondre permet de comprendre réellement la préoccupation et d'y répondre adéquatement." },
      { question: "Qu'est-ce qu'une bonne négociation doit faire avant que les objections ne soient soulevées ?", options: ["Rien de spécial", "Les anticiper", "Les éviter complètement en évitant le sujet", "Les ignorer"], correctIndex: 1, explanation: "Anticiper les objections possibles permet de préparer des réponses solides à l'avance." },
      { question: "Que permet la reformulation lors d'une objection ?", options: ["De perdre du temps inutilement", "De montrer sa compréhension de la préoccupation de l'autre", "De contredire immédiatement", "D'éviter de répondre"], correctIndex: 1, explanation: "Reformuler démontre une écoute active et facilite une réponse pertinente à l'objection soulevée." },
      { question: "Pourquoi privilégier une réponse factuelle plutôt que défensive face à une objection ?", options: ["Parce que c'est plus rapide", "Parce que les faits sont plus convaincants et désamorcent les tensions", "Ce n'est pas recommandé", "Parce que c'est exigé par la loi"], correctIndex: 1, explanation: "Une réponse basée sur des faits est généralement plus persuasive et professionnelle qu'une réaction émotionnelle ou défensive." },
    ],
  },
  {
    title: "Terminologie sectorielle (finance, tech, santé)",
    objectives: [
      "Maîtriser le vocabulaire spécifique au secteur d'activité visé",
      "Comprendre les acronymes courants en milieu professionnel québécois",
      "Utiliser une terminologie précise dans son domaine d'expertise",
    ],
    content: [
      "Chaque secteur professionnel possède sa terminologie propre : en finance, on parle de 'REER', 'CELI', 'relevé bancaire' ; en technologie, de 'infonuagique' (cloud), 'pourriel' ; en santé, de 'CLSC', 'CHSLD'. Cette maîtrise lexicale est indispensable pour une intégration professionnelle rapide.",
      "Les acronymes institutionnels québécois (RAMQ, CNESST, CSST, SAAQ) reviennent fréquemment dans les communications administratives et professionnelles. Les comprendre évite des malentendus coûteux dans les démarches officielles.",
      "La précision terminologique démontre l'expertise : utiliser le terme exact plutôt qu'une paraphrase générale renforce la crédibilité professionnelle, particulièrement dans les secteurs techniques ou réglementés.",
    ],
    keyTakeaways: [
      "La terminologie sectorielle doit être apprise en contexte, pas par mémorisation isolée",
      "Les acronymes institutionnels québécois sont essentiels à connaître pour les démarches administratives",
      "La précision lexicale renforce la crédibilité professionnelle perçue",
    ],
    resources: [
      { label: "Le Grand Dictionnaire Terminologique — Recherche par secteur", url: "https://gdt.oqlf.gouv.qc.ca" },
    ],
    quiz: [
      { question: "Que signifie l'acronyme RAMQ ?", options: ["Régime d'assurance maladie du Québec", "Réseau d'achat municipal québécois", "Règlement administratif des marchés", "Aucune signification officielle"], correctIndex: 0, explanation: "La RAMQ est la Régie de l'assurance maladie du Québec, l'organisme responsable de la couverture santé publique." },
      { question: "Que désigne le terme 'infonuagique' ?", options: ["Une application météo", "Le cloud computing", "Un type de café", "Un logiciel de comptabilité"], correctIndex: 1, explanation: "'Infonuagique' est le terme français officiel québécois pour désigner le 'cloud computing'." },
      { question: "Qu'est-ce qu'un CHSLD ?", options: ["Un centre d'hébergement de soins de longue durée", "Une école secondaire", "Un type d'impôt", "Une compagnie d'assurance"], correctIndex: 0, explanation: "Le CHSLD est un établissement québécois offrant des soins de longue durée aux personnes en perte d'autonomie." },
      { question: "Pourquoi la précision terminologique est-elle importante en milieu professionnel ?", options: ["Ce n'est pas important", "Elle renforce la crédibilité professionnelle perçue", "Elle complique toujours la communication", "Elle n'a aucun lien avec l'expertise"], correctIndex: 1, explanation: "Utiliser le terme exact plutôt qu'une paraphrase démontre une maîtrise du domaine et renforce la confiance." },
      { question: "Que signifie l'acronyme CNESST ?", options: ["Un type de compte bancaire", "Commission des normes, de l'équité, de la santé et de la sécurité du travail", "Un syndicat étudiant", "Une chaîne de télévision"], correctIndex: 1, explanation: "La CNESST encadre les normes du travail, l'équité salariale et la santé-sécurité au Québec." },
      { question: "Comment la terminologie sectorielle doit-elle être apprise selon le module ?", options: ["Par mémorisation isolée de listes", "En contexte d'usage réel", "Elle ne s'apprend pas", "Uniquement à l'oral"], correctIndex: 1, explanation: "Apprendre la terminologie en contexte favorise une meilleure rétention et une utilisation appropriée." },
    ],
  },
  {
    title: "Examen final & certification",
    objectives: [
      "Démontrer la maîtrise du français professionnel acquis",
      "Réussir une simulation d'entrevue et de rédaction professionnelle",
      "Obtenir le certificat ARCADINS de français des affaires",
    ],
    content: [
      "L'examen final évalue les quatre compétences travaillées durant la formation : compréhension orale d'une réunion simulée, rédaction d'un courriel professionnel, présentation orale d'un projet, et simulation d'entrevue d'embauche.",
      "Les évaluateurs portent une attention particulière à la clarté du message plutôt qu'à la perfection grammaticale absolue — l'objectif est la communication professionnelle efficace, pas la maîtrise académique de la langue.",
      "À la réussite de l'examen, un certificat numérique ARCADINS est délivré, attestant du niveau de français professionnel atteint et pouvant être ajouté au CV ou présenté à un employeur potentiel.",
    ],
    keyTakeaways: [
      "L'examen évalue la communication efficace, pas la perfection grammaticale",
      "Les quatre compétences (oral, écrit, présentation, interaction) sont toutes évaluées",
      "Le certificat délivré est un atout concret pour la recherche d'emploi",
    ],
    resources: [],
    quiz: [
      { question: "Quelles compétences sont évaluées lors de l'examen final ?", options: ["Uniquement la grammaire écrite", "Compréhension orale, rédaction, présentation orale, simulation d'entrevue", "Seulement la dictée", "La vitesse de frappe"], correctIndex: 1, explanation: "L'examen final couvre les quatre compétences travaillées tout au long de la formation, de manière intégrée." },
      { question: "Qu'évaluent prioritairement les correcteurs selon le module ?", options: ["La perfection grammaticale absolue", "La clarté du message et la communication efficace", "L'accent du candidat", "La vitesse de réponse uniquement"], correctIndex: 1, explanation: "L'objectif est la communication professionnelle efficace, pas une maîtrise académique parfaite de la langue." },
      { question: "Que reçoit l'étudiant à la réussite de l'examen ?", options: ["Rien de spécial", "Un certificat numérique ARCADINS", "Une amende", "Un diplôme universitaire international"], correctIndex: 1, explanation: "Un certificat numérique ARCADINS est délivré, attestant officiellement du niveau atteint." },
      { question: "Le certificat délivré peut être utilisé pour :", options: ["Rien de concret", "Être ajouté au CV ou présenté à un employeur", "Uniquement un usage personnel sans valeur professionnelle", "Voyager sans visa"], correctIndex: 1, explanation: "Le certificat constitue une preuve concrète de compétence linguistique professionnelle utilisable dans une recherche d'emploi." },
      { question: "L'examen final inclut-il une simulation d'entrevue d'embauche ?", options: ["Non, jamais", "Oui, c'est l'une des composantes évaluées", "Seulement pour certains étudiants", "Uniquement en option payante"], correctIndex: 1, explanation: "La simulation d'entrevue fait partie intégrante de l'évaluation finale du programme." },
      { question: "Quel est l'objectif global de cette formation en français des affaires ?", options: ["La maîtrise académique théorique uniquement", "La communication professionnelle efficace en milieu de travail", "Réussir un examen universitaire de littérature", "Apprendre à écrire de la poésie"], correctIndex: 1, explanation: "La formation vise une application pratique et professionnelle du français, adaptée au monde du travail québécois." },
    ],
  },
];
