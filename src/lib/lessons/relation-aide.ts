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
  },
];
