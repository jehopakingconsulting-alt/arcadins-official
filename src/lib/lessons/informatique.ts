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
    quiz: [
      { question: "Quel système d'exploitation domine majoritairement les serveurs et le cloud ?", options: ["Windows", "Linux", "macOS", "Android"], correctIndex: 1, explanation: "Linux est dominant sur les serveurs et le cloud grâce à sa stabilité, sa sécurité et son coût (souvent gratuit)." },
      { question: "Sur quel modèle reposent les réseaux informatiques modernes ?", options: ["HTML/CSS", "TCP/IP", "USB/HDMI", "RAM/ROM"], correctIndex: 1, explanation: "Le modèle TCP/IP structure la communication entre appareils via des adresses IP et le transport de paquets de données." },
      { question: "Quel protocole est responsable de la résolution des noms de domaine en adresses IP ?", options: ["HTTP", "DNS", "FTP", "SMTP"], correctIndex: 1, explanation: "Le DNS (Domain Name System) traduit les noms de domaine lisibles en adresses IP utilisées par les machines." },
      { question: "Quel système d'exploitation est privilégié pour le développement iOS ?", options: ["Linux", "macOS", "Windows Server", "Chrome OS"], correctIndex: 1, explanation: "macOS est nécessaire pour développer des applications iOS via Xcode, l'outil d'Apple." },
      { question: "Quels sont les deux composants fondamentaux d'un système informatique ?", options: ["Internet et le clavier", "Le matériel et les logiciels", "La souris et l'écran", "Le wifi et le bluetooth"], correctIndex: 1, explanation: "Un système informatique combine toujours le matériel (hardware) et les logiciels (software) pour fonctionner." },
      { question: "Que transportent les données sur un réseau TCP/IP ?", options: ["Des paquets", "Des fichiers PDF uniquement", "Des CD-ROM virtuels", "Rien, tout est instantané"], correctIndex: 0, explanation: "Les données circulent sous forme de paquets découpés, acheminés puis reconstitués à destination." },
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
    quiz: [
      { question: "Que signifie IaaS dans le contexte du cloud computing ?", options: ["Infrastructure as a Service", "Internet as a Solution", "Identity as a System", "Integration as a Standard"], correctIndex: 0, explanation: "IaaS (Infrastructure as a Service) fournit des ressources brutes comme des serveurs virtuels sans gestion de plateforme." },
      { question: "Quel fournisseur cloud domine le marché mondial selon le module ?", options: ["Google Cloud Platform", "AWS", "IBM Cloud", "Oracle Cloud"], correctIndex: 1, explanation: "AWS (Amazon Web Services) est décrit comme le leader mondial avec la gamme de services la plus large." },
      { question: "Pour quoi Google Cloud Platform (GCP) se distingue-t-il particulièrement ?", options: ["Les jeux vidéo", "Les outils de données et d'intelligence artificielle", "La vente au détail", "L'imprimerie"], correctIndex: 1, explanation: "GCP est reconnu pour ses outils avancés en analyse de données et intelligence artificielle." },
      { question: "Quel modèle cloud fournit un logiciel prêt à l'emploi sans gestion technique ?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], correctIndex: 2, explanation: "Le SaaS (Software as a Service) délivre une application complète prête à l'utilisation, comme Gmail ou Microsoft 365." },
      { question: "Pourquoi la résidence des données est-elle un enjeu important au Canada ?", options: ["Pour des raisons esthétiques", "Pour des exigences réglementaires de souveraineté des données", "Parce que le cloud n'existe pas au Canada", "Ce n'est pas un enjeu réel"], correctIndex: 1, explanation: "Certaines organisations doivent garantir que leurs données restent hébergées dans des centres de données canadiens pour des raisons légales." },
      { question: "Quel type de facturation est typique du cloud computing ?", options: ["Paiement unique à vie", "Facturation à l'usage", "Gratuit pour toujours", "Abonnement annuel obligatoire uniquement"], correctIndex: 1, explanation: "La facturation à l'usage (pay-as-you-go) est le modèle standard du cloud, nécessitant une surveillance des coûts." },
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
    quiz: [
      { question: "Quelle est la relation entre l'IA, le machine learning et le deep learning ?", options: ["Ce sont trois domaines totalement séparés", "Le machine learning est une sous-catégorie de l'IA, et le deep learning une sous-catégorie du machine learning", "Le deep learning englobe l'IA", "Il n'y a aucune différence entre ces termes"], correctIndex: 1, explanation: "L'IA est le domaine général, le machine learning en est une sous-catégorie, et le deep learning une technique spécifique du machine learning." },
      { question: "Qu'est-ce qu'une 'hallucination' dans un modèle d'IA générative ?", options: ["Un bug visuel sur l'écran", "Une information fausse générée avec assurance par le modèle", "Un virus informatique", "Une fonctionnalité désactivée"], correctIndex: 1, explanation: "Une hallucination correspond à une information incorrecte ou inventée que le modèle présente comme vraie." },
      { question: "Quel est l'un des cas d'usage de l'IA en entreprise mentionné dans le module ?", options: ["La détection de fraude", "La fabrication de meubles", "Le nettoyage des bureaux", "La livraison postale uniquement"], correctIndex: 0, explanation: "La détection de fraude est un cas d'usage courant de l'IA, notamment dans le secteur financier." },
      { question: "L'IA générative doit être considérée comme :", options: ["Un remplacement total du jugement humain", "Un outil de productivité complémentaire au jugement humain", "Une technologie sans aucune limite", "Inutile en entreprise"], correctIndex: 1, explanation: "L'IA générative est présentée comme un outil pour augmenter la productivité, pas pour remplacer le discernement humain." },
      { question: "Qu'est-ce qui peut causer des biais dans un système d'IA ?", options: ["La couleur de l'écran", "Les données d'entraînement utilisées", "Le nombre d'utilisateurs", "Le prix du logiciel"], correctIndex: 1, explanation: "Les biais dans les données d'entraînement se reflètent directement dans les prédictions et résultats du modèle d'IA." },
      { question: "Quel type de tâche est souvent le plus rentable à automatiser avec l'IA ?", options: ["Les décisions stratégiques complexes uniquement", "Les tâches répétitives à faible risque", "Les tâches créatives uniquement", "Aucune tâche ne devrait être automatisée"], correctIndex: 1, explanation: "Les tâches répétitives et à faible risque offrent le meilleur retour sur investissement pour l'automatisation par IA." },
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
    quiz: [
      { question: "Quel est le vecteur d'attaque le plus courant selon le module ?", options: ["Le phishing", "L'attaque physique du serveur", "La coupure d'électricité", "Le vol de matériel uniquement"], correctIndex: 0, explanation: "Le phishing exploite l'erreur humaine et reste statistiquement le vecteur d'attaque le plus fréquent." },
      { question: "Que fait un ransomware ?", options: ["Il accélère l'ordinateur", "Il chiffre les données et exige une rançon", "Il améliore la sécurité", "Il supprime les virus existants"], correctIndex: 1, explanation: "Un ransomware chiffre les données de la victime et exige un paiement pour les déchiffrer." },
      { question: "Que signifie la règle de sauvegarde 3-2-1 ?", options: ["3 mots de passe, 2 emails, 1 compte", "3 copies, 2 supports différents, 1 copie hors site", "3 heures, 2 jours, 1 semaine", "Aucune signification particulière"], correctIndex: 1, explanation: "La règle 3-2-1 garantit une résilience des données : 3 copies sur 2 supports différents, dont 1 conservée hors site." },
      { question: "Quelle loi québécoise encadre la protection des renseignements personnels ?", options: ["La Loi 25", "Le Code criminel uniquement", "La Loi sur les brevets", "La Loi sur le tabac"], correctIndex: 0, explanation: "La Loi 25 impose des obligations strictes au Québec concernant la collecte et la protection des données personnelles." },
      { question: "Qu'est-ce que l'authentification à deux facteurs (2FA) ?", options: ["Utiliser deux ordinateurs", "Une couche de sécurité supplémentaire combinant deux méthodes de vérification", "Avoir deux mots de passe identiques", "Une fonctionnalité obsolète"], correctIndex: 1, explanation: "Le 2FA ajoute une seconde vérification (ex. code SMS) en plus du mot de passe pour renforcer la sécurité d'accès." },
      { question: "Pourquoi une sauvegarde non testée n'est-elle pas une vraie protection ?", options: ["Parce qu'elle prend trop de place", "Parce qu'on ne sait pas si elle pourra réellement être restaurée en cas de besoin", "Parce que les sauvegardes sont illégales", "Ce n'est jamais un problème"], correctIndex: 1, explanation: "Une sauvegarde doit être testée régulièrement pour garantir qu'elle fonctionnera réellement lors d'une restauration d'urgence." },
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
    quiz: [
      { question: "Quelle commande SQL permet de récupérer des données dans une table ?", options: ["GET", "SELECT", "FETCH", "PULL"], correctIndex: 1, explanation: "SELECT est la commande SQL fondamentale pour interroger et récupérer des données d'une ou plusieurs tables." },
      { question: "Quel type de base de données est MongoDB ?", options: ["Relationnelle", "NoSQL", "Fichier texte", "Tableur"], correctIndex: 1, explanation: "MongoDB est une base de données NoSQL orientée documents, offrant flexibilité pour des données non structurées." },
      { question: "Quel est l'objectif principal de la normalisation des données ?", options: ["Ralentir les requêtes", "Éliminer la redondance et garantir l'intégrité référentielle", "Augmenter le nombre de tables inutilement", "Supprimer toutes les relations entre tables"], correctIndex: 1, explanation: "La normalisation structure les données pour éviter la duplication et maintenir la cohérence entre les tables." },
      { question: "Quelle commande SQL sert à insérer de nouvelles données ?", options: ["ADD", "INSERT", "NEW", "CREATE ROW"], correctIndex: 1, explanation: "INSERT est la commande utilisée pour ajouter de nouvelles lignes de données dans une table." },
      { question: "Pourquoi SQL est-il considéré comme une compétence très transférable ?", options: ["Parce qu'il n'est utilisé que dans un seul logiciel", "Parce qu'il est utilisé dans la majorité des emplois techniques impliquant des données", "Parce qu'il est obsolète", "Parce qu'il remplace tous les autres langages"], correctIndex: 1, explanation: "SQL est largement utilisé à travers de nombreux rôles techniques (analyste, développeur, data scientist), ce qui en fait une compétence très demandée." },
      { question: "Que permet une clé étrangère dans une base relationnelle ?", options: ["De supprimer une table", "De lier une table à une autre et garantir l'intégrité référentielle", "De chiffrer les données", "D'augmenter la vitesse d'internet"], correctIndex: 1, explanation: "Une clé étrangère établit une relation entre deux tables et assure la cohérence des données liées." },
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
    quiz: [
      { question: "Quel langage est utilisé pour structurer le contenu d'une page web ?", options: ["CSS", "HTML", "JavaScript", "SQL"], correctIndex: 1, explanation: "HTML (HyperText Markup Language) définit la structure et le contenu d'une page web." },
      { question: "Que gère principalement le back-end d'une application web ?", options: ["Le style visuel", "La logique serveur, les bases de données et les API", "Uniquement les images", "Les animations CSS"], correctIndex: 1, explanation: "Le back-end traite la logique métier côté serveur, gère les données et expose des API pour le front-end." },
      { question: "Quel format est couramment utilisé pour échanger des données via une API REST ?", options: ["JSON", "MP3", "PDF", "EXE"], correctIndex: 0, explanation: "JSON (JavaScript Object Notation) est le format standard léger pour l'échange de données entre client et serveur." },
      { question: "Quelle architecture est typique d'une application web moderne ?", options: ["Client-serveur", "Pair à pair uniquement", "Aucune architecture définie", "Mainframe centralisé des années 1970"], correctIndex: 0, explanation: "L'architecture client-serveur sépare le navigateur (client) du serveur qui traite les requêtes et la logique." },
      { question: "Quel est l'avantage des méthodologies agiles dans le développement web ?", options: ["Livrer tout en un seul bloc final", "Livrer des fonctionnalités par petites itérations", "Éviter complètement les tests", "Travailler sans aucune planification"], correctIndex: 1, explanation: "L'agilité permet de livrer progressivement, de s'adapter aux retours et de réduire les risques de gros projets monolithiques." },
      { question: "Lequel de ces éléments est un framework front-end mentionné dans le module ?", options: ["React", "MySQL", "Docker", "Linux"], correctIndex: 0, explanation: "React est un framework JavaScript utilisé pour construire des interfaces utilisateur côté front-end." },
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
    quiz: [
      { question: "Quel rôle priorise les besoins dans une équipe Scrum ?", options: ["Le Scrum Master", "Le Product Owner", "Le développeur senior", "Le client final uniquement"], correctIndex: 1, explanation: "Le Product Owner est responsable de prioriser le backlog et de représenter les besoins métier." },
      { question: "Quelle est la durée typique d'un sprint Scrum ?", options: ["1 jour", "2 semaines", "6 mois", "1 an"], correctIndex: 1, explanation: "Un sprint dure généralement 2 semaines, bien que cela puisse varier entre 1 et 4 semaines selon l'équipe." },
      { question: "Que privilégie le manifeste agile par rapport à la documentation exhaustive ?", options: ["Encore plus de documentation", "La collaboration et l'adaptabilité", "L'absence totale de communication", "Le travail isolé"], correctIndex: 1, explanation: "Le manifeste agile valorise les individus, les interactions et l'adaptabilité plutôt qu'une documentation rigide." },
      { question: "Quel rituel Scrum est souvent négligé mais particulièrement précieux selon le module ?", options: ["Le daily standup", "La rétrospective", "Le sprint planning", "La pause-café"], correctIndex: 1, explanation: "La rétrospective, qui permet à l'équipe de s'améliorer en continu, est souvent sous-estimée malgré sa grande valeur." },
      { question: "Quel outil est mentionné pour visualiser un backlog Kanban ?", options: ["Photoshop", "Trello", "Excel uniquement", "PowerPoint"], correctIndex: 1, explanation: "Trello est un outil populaire offrant des tableaux Kanban pour visualiser et suivre l'avancement des tâches." },
      { question: "Quel est le rôle du Scrum Master ?", options: ["Coder toutes les fonctionnalités seul", "Faciliter le processus Scrum pour l'équipe", "Décider seul du budget", "Remplacer le client"], correctIndex: 1, explanation: "Le Scrum Master facilite les rituels et retire les obstacles pour permettre à l'équipe de travailler efficacement." },
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
    quiz: [
      { question: "Par quoi doit commencer une transformation digitale réussie ?", options: ["L'achat de la technologie la plus chère", "Les besoins métier", "Le licenciement du personnel", "L'embauche d'un consultant externe uniquement"], correctIndex: 1, explanation: "Une transformation digitale efficace part toujours des besoins réels de l'organisation, pas de la technologie elle-même." },
      { question: "Que désigne un 'quick win' dans une feuille de route de transformation ?", options: ["Un échec rapide", "Un gain rapide et visible qui construit la confiance", "Un investissement à très long terme", "Une perte financière acceptable"], correctIndex: 1, explanation: "Les quick wins sont des résultats rapides et tangibles qui démontrent la valeur de la transformation et facilitent l'adhésion." },
      { question: "Quel est souvent le plus grand obstacle à une transformation digitale ?", options: ["Le manque de wifi", "La résistance au changement humain", "Le prix des ordinateurs", "La météo"], correctIndex: 1, explanation: "La résistance humaine au changement est généralement un obstacle plus important que les défis purement techniques." },
      { question: "Que doit inclure une feuille de route de transformation digitale ?", options: ["Uniquement une liste de logiciels", "Un calendrier réaliste et un budget estimé", "Aucune planification temporelle", "Seulement des promesses verbales"], correctIndex: 1, explanation: "Une feuille de route sérieuse hiérarchise les initiatives avec un calendrier et un budget clairs." },
      { question: "Pourquoi la formation des utilisateurs est-elle cruciale dans une transformation digitale ?", options: ["Ce n'est pas nécessaire", "Parce que l'adoption des nouveaux outils dépend de la compréhension des utilisateurs", "Uniquement pour respecter une loi", "Parce que c'est gratuit"], correctIndex: 1, explanation: "Sans formation adéquate, même les meilleurs outils technologiques échouent faute d'adoption par les utilisateurs." },
      { question: "Quel type d'initiative est recommandé avant d'aborder des changements structurels profonds ?", options: ["Des changements radicaux immédiats", "Des gains rapides (quick wins)", "Aucune action préalable", "Le licenciement de l'équipe IT"], correctIndex: 1, explanation: "Commencer par des gains rapides crée la confiance nécessaire avant d'entreprendre des transformations plus complexes." },
    ],
  },
];
