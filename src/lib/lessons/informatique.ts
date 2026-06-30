import type { Lesson } from "@/types/lesson";

export const informatiqueLessons: Lesson[] = [
  {
    title: "Introduction aux systèmes informatiques",
    objectives: [
      "Comprendre l'architecture matérielle et logicielle d'un système",
      "Distinguer les systèmes d'exploitation principaux (Windows, Linux, macOS)",
      "Maîtriser les bases du réseau informatique",
    ],
    content: [
      "Un système informatique combine du matériel (processeur, mémoire, stockage) et des logiciels (système d'exploitation, applications). Comprendre cette architecture de base est essentiel avant d'aborder des sujets plus avancés comme le cloud ou la cybersécurité.",
      "Linux domine les serveurs et le cloud computing grâce à sa stabilité et son coût, tandis que Windows reste dominant sur les postes de travail en entreprise. macOS est privilégié dans les domaines créatifs et le développement mobile (iOS).",
      "Les réseaux informatiques reposent sur le modèle TCP/IP : chaque appareil possède une adresse IP, les données circulent par paquets, et des protocoles comme HTTP, DNS et DHCP structurent la communication entre machines.",
    ],
    keyTakeaways: [
      "Toute compétence avancée en IT repose sur une compréhension solide du matériel et de l'OS",
      "Linux est la base de la majorité de l'infrastructure cloud mondiale",
      "Comprendre TCP/IP est indispensable pour diagnostiquer des problèmes réseau",
    ],
    resources: [
      { label: "Microsoft Learn — Fondamentaux IT", url: "https://learn.microsoft.com" },
      { label: "Linux Foundation — Introduction gratuite à Linux", url: "https://training.linuxfoundation.org" },
    ],
  },
  {
    title: "Cloud computing (AWS, Azure, GCP)",
    objectives: [
      "Différencier les modèles IaaS, PaaS et SaaS",
      "Comparer les trois principaux fournisseurs cloud",
      "Déployer une ressource simple sur un cloud public",
    ],
    content: [
      "Le cloud computing permet d'accéder à des ressources informatiques (serveurs, stockage, bases de données) à la demande, sans posséder l'infrastructure physique. Les trois modèles principaux sont l'IaaS (infrastructure brute), le PaaS (plateforme de développement) et le SaaS (logiciel prêt à l'emploi).",
      "AWS (Amazon Web Services) domine le marché mondial avec la gamme de services la plus large. Microsoft Azure s'intègre naturellement aux entreprises déjà sous écosystème Microsoft. Google Cloud Platform (GCP) se distingue par ses outils de données et d'intelligence artificielle.",
      "Au Canada, plusieurs fournisseurs proposent désormais des centres de données locaux (Canada Central pour Azure, ca-central-1 pour AWS), un enjeu important pour les organisations soumises à des exigences de souveraineté des données.",
    ],
    keyTakeaways: [
      "Le choix du fournisseur cloud dépend de l'écosystème existant et des compétences de l'équipe",
      "La facturation à l'usage exige une surveillance constante des coûts",
      "La résidence des données est un enjeu réglementaire important au Canada",
    ],
    resources: [
      { label: "AWS Skill Builder — Formation gratuite", url: "https://skillbuilder.aws" },
      { label: "Microsoft Learn — Azure Fundamentals", url: "https://learn.microsoft.com/training/azure" },
    ],
  },
  {
    title: "Intelligence artificielle & machine learning",
    objectives: [
      "Comprendre la différence entre IA, machine learning et deep learning",
      "Identifier des cas d'usage concrets de l'IA en entreprise",
      "Utiliser des outils d'IA générative dans un contexte professionnel",
    ],
    content: [
      "L'intelligence artificielle est le domaine général visant à reproduire des comportements intelligents par une machine. Le machine learning est une sous-catégorie où le système apprend à partir de données plutôt que d'être programmé explicitement. Le deep learning utilise des réseaux de neurones pour traiter des données complexes comme les images ou le langage.",
      "En entreprise, l'IA est utilisée pour l'automatisation du service client (chatbots), la prévision de la demande, la détection de fraude et la personnalisation marketing. Les outils d'IA générative comme ChatGPT ou Copilot transforment la productivité dans la rédaction, le code et l'analyse.",
      "L'adoption responsable de l'IA nécessite de comprendre ses limites : biais dans les données d'entraînement, hallucinations dans les modèles génératifs, et enjeux éthiques liés à la prise de décision automatisée.",
    ],
    keyTakeaways: [
      "L'IA générative est un outil de productivité, pas un remplacement du jugement humain",
      "Comprendre les limites de l'IA est aussi important que connaître ses capacités",
      "Les cas d'usage les plus rentables sont souvent les tâches répétitives à faible risque",
    ],
    resources: [
      { label: "Google AI — Cours d'introduction au machine learning", url: "https://developers.google.com/machine-learning/crash-course" },
      { label: "Microsoft Learn — IA générative pour les professionnels", url: "https://learn.microsoft.com/training/paths/introduction-generative-ai" },
    ],
  },
  {
    title: "Cybersécurité & protection des données",
    objectives: [
      "Identifier les principales menaces informatiques (phishing, ransomware)",
      "Appliquer les bonnes pratiques de sécurité de base",
      "Comprendre les obligations légales canadiennes en matière de données",
    ],
    content: [
      "Le phishing reste le vecteur d'attaque le plus courant, exploitant l'erreur humaine plutôt qu'une faille technique. Les ransomwares chiffrent les données d'une organisation et exigent une rançon — leur impact peut être catastrophique sans sauvegardes récentes et testées.",
      "Les bonnes pratiques de base incluent l'authentification à deux facteurs (2FA), des mots de passe uniques et complexes gérés via un gestionnaire de mots de passe, des mises à jour régulières des systèmes et une sauvegarde régulière selon la règle 3-2-1 (3 copies, 2 supports différents, 1 hors site).",
      "Au Canada, la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) et la Loi 25 au Québec imposent des obligations strictes sur la collecte, le stockage et la notification en cas de fuite de données personnelles.",
    ],
    keyTakeaways: [
      "L'erreur humaine reste la cause numéro un des incidents de sécurité",
      "Une sauvegarde non testée n'est pas une vraie protection",
      "La conformité à la Loi 25 et à la LPRPDE est obligatoire, pas optionnelle, pour toute organisation canadienne",
    ],
    resources: [
      { label: "Centre canadien pour la cybersécurité", url: "https://www.cyber.gc.ca" },
      { label: "CNIL / Loi 25 — Guide de conformité Québec", url: "https://www.cai.gouv.qc.ca" },
    ],
  },
  {
    title: "Gestion de bases de données",
    objectives: [
      "Différencier bases de données relationnelles et NoSQL",
      "Écrire des requêtes SQL de base",
      "Comprendre les principes de normalisation des données",
    ],
    content: [
      "Les bases de données relationnelles (MySQL, PostgreSQL, SQL Server) organisent les données en tables liées par des clés, garantissant la cohérence via des contraintes strictes. Les bases NoSQL (MongoDB, Firebase) offrent plus de flexibilité pour des données non structurées ou à très grande échelle.",
      "Le langage SQL (Structured Query Language) permet d'interroger, insérer, modifier et supprimer des données. Les commandes de base — SELECT, INSERT, UPDATE, DELETE, JOIN — couvrent la majorité des besoins quotidiens d'un analyste ou développeur.",
      "La normalisation des données vise à éliminer la redondance et à garantir l'intégrité référentielle. Une base bien conçue facilite la maintenance, améliore les performances et réduit les risques d'incohérence entre les données.",
    ],
    keyTakeaways: [
      "Le choix relationnel vs NoSQL dépend de la structure des données et de l'échelle du projet",
      "SQL reste la compétence la plus transférable entre tous les emplois techniques",
      "Une base mal normalisée crée des problèmes de cohérence qui s'aggravent avec le temps",
    ],
    resources: [
      { label: "PostgreSQL Tutorial officiel", url: "https://www.postgresql.org/docs" },
      { label: "SQLBolt — Apprendre SQL interactivement", url: "https://sqlbolt.com" },
    ],
  },
  {
    title: "Développement web & applications",
    objectives: [
      "Comprendre la différence entre front-end et back-end",
      "Identifier les langages et frameworks courants",
      "Suivre le cycle de vie d'une application web simple",
    ],
    content: [
      "Le front-end concerne tout ce que l'utilisateur voit et manipule directement : HTML pour la structure, CSS pour le style, JavaScript pour l'interactivité, avec des frameworks comme React ou Vue.js. Le back-end gère la logique serveur, les bases de données et les API, avec des langages comme Node.js, Python ou Java.",
      "Une application web moderne suit généralement une architecture client-serveur : le navigateur (client) envoie des requêtes à un serveur qui traite la logique métier et renvoie des données, souvent au format JSON via une API REST.",
      "Le cycle de développement inclut la conception, le codage, les tests, le déploiement et la maintenance. Les méthodologies agiles permettent de livrer des fonctionnalités par petites itérations plutôt qu'en un seul bloc final.",
    ],
    keyTakeaways: [
      "Front-end et back-end sont complémentaires, pas interchangeables",
      "Une API bien conçue est la clé d'une architecture web maintenable",
      "Le déploiement continu réduit les risques liés aux mises en production",
    ],
    resources: [
      { label: "MDN Web Docs — Référence développement web", url: "https://developer.mozilla.org/fr" },
      { label: "freeCodeCamp — Cursus développement web gratuit", url: "https://www.freecodecamp.org" },
    ],
  },
  {
    title: "Gestion de projets IT (Agile/Scrum)",
    objectives: [
      "Comprendre les principes du manifeste agile",
      "Maîtriser les rôles et rituels Scrum",
      "Utiliser un outil de gestion de projet agile (Jira, Trello)",
    ],
    content: [
      "Le manifeste agile privilégie la collaboration, l'adaptabilité et la livraison itérative plutôt que la planification rigide et la documentation exhaustive. Cette approche répond mieux aux besoins changeants des projets technologiques modernes.",
      "Scrum structure le travail en sprints (généralement 2 semaines) avec des rôles définis : le Product Owner priorise les besoins, le Scrum Master facilite le processus, et l'équipe de développement livre les fonctionnalités. Les rituels clés sont le sprint planning, le daily standup, la sprint review et la rétrospective.",
      "Des outils comme Jira, Trello ou Azure DevOps permettent de visualiser le backlog, suivre l'avancement via des tableaux Kanban et mesurer la vélocité de l'équipe à travers les sprints.",
    ],
    keyTakeaways: [
      "L'agilité est une philosophie de collaboration, pas seulement un ensemble d'outils",
      "Les rituels Scrum servent à maintenir la transparence, pas à créer de la bureaucratie",
      "La rétrospective est le rituel le plus souvent négligé mais le plus précieux pour s'améliorer",
    ],
    resources: [
      { label: "Scrum.org — Guide Scrum officiel (gratuit)", url: "https://www.scrum.org/resources/scrum-guide" },
      { label: "Atlassian Agile Coach", url: "https://www.atlassian.com/agile" },
    ],
  },
  {
    title: "Projet final : transformation digitale d'entreprise",
    objectives: [
      "Auditer les besoins technologiques d'une organisation",
      "Proposer un plan de transformation digitale réaliste",
      "Présenter une feuille de route technique et budgétaire",
    ],
    content: [
      "Le projet final demande d'analyser une organisation (réelle ou fictive) et d'identifier les opportunités de digitalisation : automatisation de processus manuels, migration vers le cloud, adoption d'outils collaboratifs ou intégration d'IA pour gagner en efficacité.",
      "La feuille de route doit hiérarchiser les initiatives par impact et complexité, avec un calendrier réaliste et un budget estimé. Les transformations les plus réussies commencent par des gains rapides (quick wins) avant d'aborder des changements structurels plus profonds.",
      "La gestion du changement est aussi importante que la technologie elle-même : impliquer les équipes concernées, former les utilisateurs et communiquer les bénéfices concrets déterminent souvent le succès ou l'échec d'une transformation digitale.",
    ],
    keyTakeaways: [
      "Une transformation digitale réussie commence par les besoins métier, pas par la technologie",
      "Prioriser les gains rapides construit la confiance pour les changements plus ambitieux",
      "La résistance au changement humain est souvent le plus grand obstacle, pas la technique",
    ],
    resources: [
      { label: "MIT Sloan — Recherche sur la transformation digitale", url: "https://sloanreview.mit.edu" },
    ],
  },
];
