import type { Lesson } from "@/types/lesson";

export const relationAideLessons: Lesson[] = [
  {
    title: "Fondements de la relation d'aide",
    objectives: [
      "Comprendre les principes éthiques de base de la relation d'aide",
      "Distinguer aide professionnelle et soutien informel",
      "Identifier ses propres limites et besoin de supervision",
    ],
    content: [
      "La relation d'aide repose sur des principes fondamentaux : le respect inconditionnel de la personne aidée, la confidentialité, la non-jugement et le respect de l'autonomie de la personne dans ses décisions, même lorsqu'elles diffèrent des recommandations de l'intervenant.",
      "L'aide professionnelle se distingue du soutien informel par un cadre structuré : objectifs définis, limites de temps et de rôle claires, et une distance professionnelle qui protège à la fois l'intervenant et la personne aidée d'une dépendance malsaine.",
      "Reconnaître ses propres limites — émotionnelles, de compétence ou de temps — et savoir référer vers d'autres ressources ou demander une supervision est une compétence professionnelle essentielle, pas un signe de faiblesse.",
    ],
    keyTakeaways: [
      "Le respect de l'autonomie de la personne prime même en désaccord avec ses choix",
      "Un cadre professionnel clair protège l'intervenant autant que la personne aidée",
      "Savoir référer ou demander de l'aide est une compétence, pas un échec",
    ],
    resources: [
      { label: "Ordre des travailleurs sociaux du Québec (OTSTCFQ)", url: "https://www.otstcfq.org" },
    ],
    quiz: [
      { question: "Quel principe doit primer même en désaccord avec les choix de la personne aidée ?", options: ["Le respect de son autonomie", "L'imposition de la décision de l'intervenant", "L'abandon immédiat du dossier", "Aucun principe particulier"], correctIndex: 0, explanation: "Le respect de l'autonomie est fondamental, même si l'intervenant n'approuve pas personnellement le choix fait." },
      { question: "Qu'est-ce qui distingue l'aide professionnelle du soutien informel ?", options: ["Aucune différence", "Un cadre structuré avec objectifs et limites définies", "L'absence totale de règles", "Le prix uniquement"], correctIndex: 1, explanation: "L'aide professionnelle se caractérise par une structure claire qui protège les deux parties impliquées." },
      { question: "Reconnaître ses limites professionnelles est-il un signe de faiblesse ?", options: ["Oui, toujours", "Non, c'est une compétence professionnelle essentielle", "Cela dépend de l'humeur du jour", "Cela n'a aucune importance"], correctIndex: 1, explanation: "Savoir identifier ses limites et référer si nécessaire démontre justement une maturité professionnelle." },
      { question: "Que protège la distance professionnelle en relation d'aide ?", options: ["Rien d'important", "L'intervenant et la personne aidée d'une dépendance malsaine", "Uniquement le salaire de l'intervenant", "Le budget de l'organisme"], correctIndex: 1, explanation: "Une distance professionnelle appropriée évite les dynamiques de dépendance néfastes pour les deux parties." },
      { question: "Quel principe garantit que les informations partagées restent privées ?", options: ["La confidentialité", "La publicité", "L'indiscrétion", "Aucun principe spécifique"], correctIndex: 0, explanation: "La confidentialité est un pilier fondamental de la relation de confiance en intervention." },
      { question: "Quand un intervenant devrait-il demander une supervision ?", options: ["Jamais, c'est interdit", "Lorsqu'il atteint ses limites de compétence ou émotionnelles", "Uniquement en fin de carrière", "Seulement si on le lui demande"], correctIndex: 1, explanation: "La supervision est un outil essentiel pour gérer les situations dépassant les compétences ou capacités émotionnelles de l'intervenant." },
    ],
  },
  {
    title: "Écoute active et communication empathique",
    objectives: [
      "Pratiquer les techniques d'écoute active",
      "Utiliser la reformulation pour valider la compréhension",
      "Communiquer avec empathie sans perdre l'objectivité professionnelle",
    ],
    content: [
      "L'écoute active implique une attention complète à la personne — contact visuel approprié, langage corporel ouvert, absence d'interruption — combinée à des signaux verbaux et non verbaux confirmant que le message est reçu et compris.",
      "La reformulation consiste à redire dans ses propres mots ce que la personne vient d'exprimer, permettant de vérifier sa compréhension et donnant à la personne aidée le sentiment d'être réellement entendue, souvent un besoin fondamental en lui-même.",
      "L'empathie professionnelle signifie comprendre et valider les émotions de la personne sans s'y fondre complètement — maintenir une distance suffisante pour rester un soutien stable plutôt que de devenir submergé par les émotions de l'autre.",
    ],
    keyTakeaways: [
      "L'écoute active est une compétence qui se pratique consciemment, elle n'est pas automatique",
      "La reformulation valide la compréhension et renforce le sentiment d'être entendu",
      "L'empathie professionnelle maintient une distance protectrice sans devenir froide",
    ],
    resources: [
      { label: "Tel-Aide — Ressources sur l'écoute active", url: "https://www.telaide.org" },
    ],
    quiz: [
      { question: "Qu'est-ce que la reformulation en intervention ?", options: ["Répéter exactement les mots de la personne", "Redire dans ses propres mots ce que la personne a exprimé", "Ignorer ce que dit la personne", "Changer complètement le sujet"], correctIndex: 1, explanation: "La reformulation valide la compréhension de l'intervenant et montre à la personne qu'elle est réellement entendue." },
      { question: "L'écoute active est-elle une compétence automatique ?", options: ["Oui, totalement innée", "Non, elle se pratique consciemment", "Elle n'existe pas vraiment", "Elle est inutile en intervention"], correctIndex: 1, explanation: "L'écoute active demande un effort conscient et continu, ce n'est pas un comportement spontané." },
      { question: "Que signifie l'empathie professionnelle selon le module ?", options: ["Se fondre complètement dans les émotions de l'autre", "Comprendre et valider les émotions sans s'y fondre complètement", "Ignorer toute émotion", "Juger les émotions de la personne"], correctIndex: 1, explanation: "L'empathie professionnelle maintient une distance suffisante pour rester un soutien stable et objectif." },
      { question: "Quels éléments font partie de l'écoute active ?", options: ["Contact visuel approprié et absence d'interruption", "Regarder son téléphone constamment", "Interrompre fréquemment", "Éviter tout contact visuel"], correctIndex: 0, explanation: "Ces comportements démontrent une attention réelle et favorisent un climat de confiance." },
      { question: "Pourquoi se sentir 'réellement entendu' est-il un besoin fondamental ?", options: ["Ce n'est pas un besoin réel", "Cela valide l'expérience vécue de la personne", "C'est une perte de temps", "Cela n'a aucun lien avec l'intervention"], correctIndex: 1, explanation: "Être entendu valide l'expérience de la personne et constitue souvent un besoin psychologique fondamental." },
      { question: "Que risque un intervenant qui devient submergé par les émotions de l'autre ?", options: ["Rien de particulier", "De perdre sa capacité à offrir un soutien stable", "De devenir plus efficace", "D'améliorer son objectivité"], correctIndex: 1, explanation: "Une fusion émotionnelle excessive compromet la capacité de l'intervenant à offrir un accompagnement stable et professionnel." },
    ],
  },
  {
    title: "Intervention en situation de crise",
    objectives: [
      "Reconnaître les signes d'une situation de crise",
      "Appliquer un protocole d'intervention de premier contact",
      "Connaître les ressources d'urgence disponibles au Québec",
    ],
    content: [
      "Une situation de crise se reconnaît par des signes comportementaux et émotionnels marqués : agitation extrême, propos suicidaires, désorganisation de la pensée, ou détresse intense disproportionnée par rapport à l'événement déclencheur apparent.",
      "Le protocole de premier contact en situation de crise privilégie d'abord la sécurité immédiate de la personne et de l'intervenant, puis l'établissement d'un contact calme et rassurant, avant d'évaluer la nature et la gravité de la crise.",
      "Le Québec dispose de ressources d'urgence dédiées : la ligne 811 pour l'information socio-sanitaire, les centres de crise régionaux, et le 911 pour les situations de danger immédiat. Connaître ces ressources et savoir orienter rapidement est essentiel.",
    ],
    keyTakeaways: [
      "La sécurité immédiate prime toujours avant toute autre considération en situation de crise",
      "Un ton calme et rassurant désamorce souvent une situation avant qu'elle ne s'aggrave",
      "Connaître les ressources d'urgence par cœur évite la perte de temps précieuse en situation réelle",
    ],
    resources: [
      { label: "Association québécoise de prévention du suicide", url: "https://www.aqps.info" },
      { label: "Info-Social 811", url: "https://www.quebec.ca/sante/systeme-et-services-de-sante/info-social-811" },
    ],
    quiz: [
      { question: "Quelle est la priorité absolue en situation de crise selon le module ?", options: ["La paperasse administrative", "La sécurité immédiate de la personne et de l'intervenant", "Le respect strict des horaires", "L'analyse théorique approfondie"], correctIndex: 1, explanation: "La sécurité immédiate doit toujours primer avant toute autre considération en situation de crise." },
      { question: "Quel numéro est mentionné pour les situations de danger immédiat au Québec ?", options: ["811", "911", "411", "611"], correctIndex: 1, explanation: "Le 911 est le numéro d'urgence à utiliser en cas de danger immédiat pour la sécurité d'une personne." },
      { question: "Quel ton est recommandé lors du premier contact en situation de crise ?", options: ["Agressif et autoritaire", "Calme et rassurant", "Indifférent", "Très bruyant"], correctIndex: 1, explanation: "Un ton calme aide à désamorcer la situation et à établir un contact de confiance avec la personne en détresse." },
      { question: "Quel service offre de l'information socio-sanitaire au Québec ?", options: ["Le 811 (Info-Social)", "Le 411", "La météo", "Aucun service n'existe"], correctIndex: 0, explanation: "La ligne 811 offre un accès à de l'information et du soutien socio-sanitaire au Québec." },
      { question: "Quels signes peuvent indiquer une situation de crise ?", options: ["Calme excessif et silence", "Agitation extrême, propos suicidaires, désorganisation de la pensée", "Aucun signe particulier", "Uniquement la fatigue"], correctIndex: 1, explanation: "Ces signes marqués peuvent indiquer une détresse sévère nécessitant une intervention rapide et appropriée." },
      { question: "Pourquoi connaître les ressources d'urgence par cœur est-il important ?", options: ["Ce n'est pas important", "Pour éviter la perte de temps précieuse en situation réelle", "Pour impressionner les collègues", "Aucune raison particulière"], correctIndex: 1, explanation: "En situation de crise, chaque seconde compte ; connaître rapidement les ressources disponibles peut faire une différence cruciale." },
    ],
  },
  {
    title: "Santé mentale et dépendances",
    objectives: [
      "Comprendre les principaux troubles de santé mentale courants",
      "Connaître les bases de l'intervention auprès des personnes aux prises avec une dépendance",
      "Identifier les ressources spécialisées disponibles",
    ],
    content: [
      "Les troubles de santé mentale les plus fréquemment rencontrés en intervention communautaire incluent les troubles anxieux, la dépression, les troubles de stress post-traumatique et, dans certains contextes, les troubles psychotiques nécessitant une référence spécialisée rapide.",
      "L'intervention auprès des personnes aux prises avec une dépendance privilégie une approche de réduction des méfaits plutôt qu'une exigence d'abstinence immédiate, reconnaissant que le changement est un processus graduel nécessitant un accompagnement patient.",
      "Le réseau québécois offre des ressources spécialisées : Centres de réadaptation en dépendance (CRD), lignes d'écoute spécialisées, et groupes de soutien comme les Alcooliques Anonymes, qui complètent l'intervention de première ligne.",
    ],
    keyTakeaways: [
      "Reconnaître les limites de son rôle et référer vers un spécialiste est crucial en santé mentale",
      "L'approche de réduction des méfaits est plus efficace que l'exigence d'abstinence immédiate",
      "Le réseau de ressources spécialisées doit être connu pour orienter efficacement",
    ],
    resources: [
      { label: "Association québécoise des centres d'intervention en dépendance", url: "https://www.aiderqc.com" },
    ],
    quiz: [
      { question: "Quelle approche est privilégiée pour les personnes aux prises avec une dépendance ?", options: ["L'exigence d'abstinence immédiate", "La réduction des méfaits", "L'abandon total du suivi", "L'isolement complet"], correctIndex: 1, explanation: "La réduction des méfaits reconnaît que le changement est graduel et privilégie un accompagnement patient plutôt qu'une exigence immédiate." },
      { question: "Que désigne un CRD au Québec ?", options: ["Un Centre de réadaptation en dépendance", "Un type de carte de crédit", "Une compagnie d'assurance", "Un syndicat"], correctIndex: 0, explanation: "Les CRD offrent des services spécialisés pour accompagner les personnes aux prises avec des dépendances." },
      { question: "Quel trouble de santé mentale est mentionné comme nécessitant une référence spécialisée rapide ?", options: ["Les troubles psychotiques", "Le rhume", "La fatigue normale", "Aucun trouble ne nécessite de référence"], correctIndex: 0, explanation: "Les troubles psychotiques requièrent une intervention spécialisée rapide en raison de leur gravité potentielle." },
      { question: "Pourquoi est-il crucial de reconnaître les limites de son rôle en santé mentale ?", options: ["Ce n'est pas important", "Pour référer adéquatement vers des spécialistes lorsque nécessaire", "Pour éviter tout travail", "Aucune raison valable"], correctIndex: 1, explanation: "Savoir quand référer protège la personne aidée en lui donnant accès à l'expertise spécialisée appropriée." },
      { question: "Quel type de ressource communautaire complète l'intervention de première ligne ?", options: ["Les groupes de soutien comme les Alcooliques Anonymes", "Aucune ressource n'existe", "Uniquement les hôpitaux", "Les centres commerciaux"], correctIndex: 0, explanation: "Ces groupes de soutien offrent un accompagnement complémentaire précieux dans le processus de rétablissement." },
      { question: "Le changement dans le processus de dépendance est-il généralement immédiat ?", options: ["Oui, toujours instantané", "Non, c'est un processus graduel", "Cela n'a aucune importance", "Le changement n'existe jamais"], correctIndex: 1, explanation: "Le module souligne que le changement est progressif, nécessitant patience et accompagnement continu." },
    ],
  },
  {
    title: "Travail avec les populations vulnérables",
    objectives: [
      "Adapter son approche selon les besoins de populations spécifiques",
      "Comprendre les enjeux propres aux nouveaux arrivants vulnérables",
      "Travailler avec sensibilité culturelle",
    ],
    content: [
      "Le travail auprès des personnes âgées, des personnes en situation d'itinérance, des familles à faible revenu ou des personnes en situation de handicap exige une adaptation de l'approche : rythme, langage, accessibilité physique et compréhension des obstacles systémiques spécifiques.",
      "Les nouveaux arrivants vulnérables font face à des défis particuliers : barrière linguistique, méconnaissance des services disponibles, isolement social et parfois traumatismes liés au parcours migratoire. Une approche d'accompagnement patient et informé est essentielle.",
      "La sensibilité culturelle implique de reconnaître ses propres biais culturels, d'éviter les généralisations sur des groupes entiers et de comprendre que les normes de communication, de famille ou d'autorité varient considérablement selon les cultures d'origine.",
    ],
    keyTakeaways: [
      "Chaque population vulnérable présente des obstacles systémiques qui doivent être compris spécifiquement",
      "Les nouveaux arrivants combinent souvent plusieurs facteurs de vulnérabilité simultanément",
      "La sensibilité culturelle commence par la reconnaissance de ses propres biais",
    ],
    resources: [
      { label: "Table de concertation des organismes au service des personnes réfugiées et immigrantes (TCRI)", url: "https://tcri.qc.ca" },
    ],
    quiz: [
      { question: "Par quoi commence la sensibilité culturelle selon le module ?", options: ["La reconnaissance de ses propres biais culturels", "L'ignorance totale des différences", "L'imposition de sa propre culture", "Aucune démarche particulière"], correctIndex: 0, explanation: "Prendre conscience de ses propres biais est la première étape vers une approche réellement sensible aux différences culturelles." },
      { question: "Quels défis particuliers rencontrent les nouveaux arrivants vulnérables ?", options: ["Aucun défi spécifique", "Barrière linguistique, isolement social, parfois traumatismes migratoires", "Uniquement des problèmes financiers", "Aucun problème d'intégration"], correctIndex: 1, explanation: "Ces défis combinés rendent l'accompagnement des nouveaux arrivants particulièrement complexe et nécessitent une approche adaptée." },
      { question: "Que faut-il éviter en matière de sensibilité culturelle ?", options: ["Les généralisations sur des groupes entiers", "L'écoute attentive", "Le respect", "La patience"], correctIndex: 0, explanation: "Généraliser sur un groupe culturel entier ignore les différences individuelles et peut mener à des erreurs d'approche." },
      { question: "Que doit comprendre l'intervenant à propos des normes familiales et d'autorité ?", options: ["Elles sont identiques partout dans le monde", "Elles varient considérablement selon les cultures d'origine", "Elles n'ont aucune importance", "Elles doivent être ignorées"], correctIndex: 1, explanation: "Comprendre cette variabilité culturelle aide à mieux interpréter les comportements et besoins des personnes aidées." },
      { question: "Quels éléments doivent être adaptés selon la population vulnérable rencontrée ?", options: ["Rythme, langage et accessibilité physique", "Rien ne doit être adapté", "Uniquement le prix des services", "Le code vestimentaire de l'intervenant uniquement"], correctIndex: 0, explanation: "Une approche flexible et adaptée aux besoins spécifiques de chaque population est essentielle pour un accompagnement efficace." },
      { question: "Les nouveaux arrivants cumulent-ils souvent plusieurs facteurs de vulnérabilité ?", options: ["Non, jamais", "Oui, souvent simultanément", "Cela ne concerne que certains pays", "C'est sans rapport avec l'intervention"], correctIndex: 1, explanation: "La combinaison de plusieurs vulnérabilités (linguistique, sociale, traumatique) complique souvent leur situation et nécessite une attention particulière." },
    ],
  },
  {
    title: "Ressources communautaires au Canada",
    objectives: [
      "Cartographier les ressources communautaires disponibles localement",
      "Savoir orienter efficacement une personne vers le bon service",
      "Comprendre le fonctionnement du réseau communautaire québécois",
    ],
    content: [
      "Le réseau communautaire québécois comprend les CLSC (Centres locaux de services communautaires), les organismes communautaires spécialisés (banques alimentaires, refuges, centres pour femmes), et les services municipaux d'aide sociale, chacun ayant un mandat et des critères d'admissibilité spécifiques.",
      "Savoir orienter efficacement signifie connaître non seulement l'existence d'une ressource, mais aussi ses critères d'accès, ses délais d'attente et la meilleure façon d'initier le contact pour la personne aidée, parfois en l'accompagnant directement dans cette démarche.",
      "Le 211 est un service téléphonique et en ligne gratuit qui recense l'ensemble des ressources communautaires et sociales par région au Québec et dans plusieurs provinces canadiennes, un outil essentiel pour tout intervenant.",
    ],
    keyTakeaways: [
      "Une bonne orientation exige de connaître les critères d'accès, pas seulement l'existence d'une ressource",
      "Le 211 est un outil de référence essentiel à connaître et utiliser régulièrement",
      "Accompagner physiquement une démarche augmente significativement les chances de succès",
    ],
    resources: [
      { label: "211 Québec — Répertoire des ressources communautaires", url: "https://www.211qc.ca" },
    ],
    quiz: [
      { question: "Que représente le service 211 au Québec ?", options: ["Un répertoire gratuit des ressources communautaires et sociales", "Un numéro d'urgence policière", "Un service payant uniquement", "Un service réservé aux médecins"], correctIndex: 0, explanation: "Le 211 est un outil gratuit essentiel recensant les ressources communautaires disponibles par région." },
      { question: "Que signifie CLSC ?", options: ["Centre local de services communautaires", "Une compagnie d'assurance privée", "Un syndicat étudiant", "Un type de prêt bancaire"], correctIndex: 0, explanation: "Le CLSC est un point d'accès de première ligne aux services sociaux et de santé communautaires au Québec." },
      { question: "Que faut-il connaître au-delà de la simple existence d'une ressource pour bien orienter ?", options: ["Rien d'autre n'est nécessaire", "Les critères d'accès et les délais d'attente", "Uniquement l'adresse", "Le nom du directeur"], correctIndex: 1, explanation: "Une orientation efficace nécessite une connaissance approfondie des modalités d'accès réelles à chaque ressource." },
      { question: "Pourquoi accompagner physiquement une démarche peut-il être bénéfique ?", options: ["Cela n'a aucun effet", "Cela augmente significativement les chances de succès", "C'est toujours contre-productif", "C'est interdit par la loi"], correctIndex: 1, explanation: "L'accompagnement direct facilite souvent l'accès aux services, particulièrement pour des personnes vulnérables ou peu familières avec le système." },
      { question: "Quels types d'organismes font partie du réseau communautaire québécois ?", options: ["Banques alimentaires, refuges, centres pour femmes", "Uniquement des banques commerciales", "Uniquement des écoles privées", "Des compagnies d'assurance"], correctIndex: 0, explanation: "Le réseau communautaire englobe une grande diversité d'organismes répondant à des besoins sociaux variés." },
      { question: "Le 211 est-il disponible uniquement au Québec ?", options: ["Oui, exclusivement", "Non, il est aussi disponible dans plusieurs autres provinces canadiennes", "Il n'existe nulle part", "Uniquement à l'extérieur du Canada"], correctIndex: 1, explanation: "Le service 211 s'étend à plusieurs provinces canadiennes, pas seulement au Québec." },
    ],
  },
  {
    title: "Éthique et déontologie professionnelle",
    objectives: [
      "Comprendre les principes déontologiques applicables en relation d'aide",
      "Gérer les dilemmes éthiques courants",
      "Maintenir des limites professionnelles appropriées",
    ],
    content: [
      "Les principes déontologiques fondamentaux incluent la confidentialité (avec ses exceptions légales, comme le signalement obligatoire en cas de risque pour un enfant), le consentement éclairé, et l'évitement des conflits d'intérêts dans la relation d'aide.",
      "Les dilemmes éthiques courants incluent la tension entre le respect de l'autonomie et la protection de la personne en danger, ou la gestion d'une demande d'aide dépassant son champ de compétence professionnelle. Ces situations exigent réflexion et souvent consultation avec un superviseur.",
      "Le maintien de limites professionnelles appropriées — éviter les relations personnelles avec les personnes aidées, ne pas accepter de cadeaux significatifs, respecter les heures et le cadre de l'intervention — protège l'intégrité de la relation d'aide à long terme.",
    ],
    keyTakeaways: [
      "La confidentialité a des limites légales claires qu'il faut connaître précisément",
      "Les dilemmes éthiques complexes méritent toujours une consultation, jamais une décision isolée",
      "Des limites professionnelles claires protègent la relation d'aide sur la durée",
    ],
    resources: [
      { label: "OTSTCFQ — Code de déontologie", url: "https://www.otstcfq.org" },
    ],
    quiz: [
      { question: "La confidentialité a-t-elle des exceptions légales ?", options: ["Non, jamais", "Oui, comme le signalement obligatoire en cas de risque pour un enfant", "Uniquement les jours fériés", "Elle n'existe pas vraiment"], correctIndex: 1, explanation: "Certaines situations, comme le risque pour un enfant, imposent légalement de lever la confidentialité." },
      { question: "Que faut-il faire face à un dilemme éthique complexe selon le module ?", options: ["Décider seul rapidement sans consultation", "Consulter, jamais décider isolément", "Ignorer le dilemme", "Démissionner immédiatement"], correctIndex: 1, explanation: "Les dilemmes éthiques complexes méritent une réflexion partagée avec un superviseur plutôt qu'une décision unilatérale." },
      { question: "Quelle pratique est déconseillée pour maintenir des limites professionnelles appropriées ?", options: ["Respecter les heures de travail", "Accepter des relations personnelles avec les personnes aidées", "Refuser les cadeaux significatifs", "Maintenir un cadre clair"], correctIndex: 1, explanation: "Les relations personnelles avec les personnes aidées compromettent l'objectivité et l'intégrité professionnelle de la relation d'aide." },
      { question: "Qu'est-ce que le consentement éclairé ?", options: ["Un principe déontologique fondamental de la relation d'aide", "Un document sans importance", "Une option facultative", "Un terme sans rapport avec l'éthique"], correctIndex: 0, explanation: "Le consentement éclairé garantit que la personne aidée comprend et accepte volontairement le processus d'intervention." },
      { question: "Pourquoi des limites professionnelles claires sont-elles importantes ?", options: ["Elles n'ont aucune importance", "Elles protègent l'intégrité de la relation d'aide à long terme", "Elles compliquent inutilement le travail", "Elles sont optionnelles"], correctIndex: 1, explanation: "Des limites claires préservent la relation de confiance et évitent les dérives potentiellement nuisibles." },
      { question: "Quelle tension est mentionnée comme dilemme éthique courant ?", options: ["Le respect de l'autonomie versus la protection en cas de danger", "Le choix de la couleur du bureau", "Le prix du café", "Aucun dilemme n'existe réellement"], correctIndex: 0, explanation: "Cette tension entre autonomie et protection est un dilemme éthique fréquent en relation d'aide nécessitant un jugement professionnel nuancé." },
    ],
  },
  {
    title: "Stage pratique & certification",
    objectives: [
      "Appliquer les compétences d'intervention dans un contexte réel supervisé",
      "Démontrer la maîtrise des techniques de relation d'aide",
      "Obtenir le certificat ARCADINS en relation d'aide et service communautaire",
    ],
    content: [
      "Le stage pratique place l'apprenant dans un contexte réel d'intervention communautaire, sous la supervision d'un professionnel expérimenté, permettant de mettre en pratique l'écoute active, l'intervention de crise et l'orientation vers les ressources appropriées.",
      "L'évaluation finale porte sur la capacité à établir une relation d'aide respectueuse, à reconnaître les limites de son rôle, et à appliquer les principes éthiques appris dans des situations concrètes, parfois complexes ou imprévues.",
      "Le certificat ARCADINS en relation d'aide et service communautaire, délivré à l'issue du stage et de l'évaluation, atteste d'une compétence pratique reconnue par les organismes communautaires partenaires pour des postes d'intervention de première ligne.",
    ],
    keyTakeaways: [
      "Le stage supervisé est l'occasion de transformer la théorie en réflexe professionnel",
      "L'évaluation porte sur le jugement professionnel autant que sur les techniques apprises",
      "Le certificat ouvre la voie vers le réseau d'organismes communautaires partenaires",
    ],
    resources: [],
    quiz: [
      { question: "Sous quelle supervision se déroule le stage pratique ?", options: ["Aucune supervision n'est requise", "Un professionnel expérimenté", "Uniquement des pairs étudiants", "Un système automatisé"], correctIndex: 1, explanation: "Le stage est encadré par un professionnel pour garantir un apprentissage de qualité et sécuritaire." },
      { question: "Sur quoi porte principalement l'évaluation finale du stage ?", options: ["La capacité à établir une relation d'aide respectueuse et à appliquer l'éthique", "Uniquement la mémorisation théorique", "La rapidité d'exécution des tâches", "L'apparence physique"], correctIndex: 0, explanation: "L'évaluation se concentre sur le jugement professionnel et l'application pratique des compétences éthiques et relationnelles." },
      { question: "Que reçoit l'étudiant à l'issue du stage et de l'évaluation réussie ?", options: ["Le certificat ARCADINS en relation d'aide et service communautaire", "Rien de spécifique", "Une amende", "Un diplôme universitaire international"], correctIndex: 0, explanation: "Ce certificat atteste officiellement de la compétence pratique acquise durant la formation." },
      { question: "Le certificat est-il reconnu par des organismes communautaires ?", options: ["Non, jamais", "Oui, par le réseau de partenaires communautaires", "Uniquement à l'international", "Seulement par la famille de l'étudiant"], correctIndex: 1, explanation: "Le certificat est conçu pour être reconnu par les organismes communautaires partenaires d'ARCADINS." },
      { question: "Quelles compétences le stage permet-il de mettre en pratique ?", options: ["Écoute active, intervention de crise, orientation vers ressources", "Uniquement la comptabilité", "La programmation informatique", "Le pilotage d'avion"], correctIndex: 0, explanation: "Ces compétences clés de la formation sont directement appliquées dans un contexte professionnel réel pendant le stage." },
      { question: "Quel est l'objectif principal du stage pratique selon le module ?", options: ["Transformer la théorie en réflexe professionnel", "Uniquement remplir des heures obligatoires", "Évaluer la ponctualité uniquement", "Aucun objectif particulier"], correctIndex: 0, explanation: "Le stage vise à ancrer concrètement les apprentissages théoriques dans une pratique professionnelle réelle et réflexe." },
    ],
  },
];
