import type { Lesson } from "@/types/lesson";

export const tourismeLessons: Lesson[] = [
  {
    title: "Introduction au tourisme canadien",
    objectives: [
      "Comprendre la structure de l'industrie touristique canadienne",
      "Identifier les principales destinations et saisons touristiques",
      "Connaître les organismes de promotion touristique",
    ],
    content: [
      "L'industrie touristique canadienne génère des dizaines de milliards de dollars annuellement et emploie directement et indirectement des centaines de milliers de personnes. Elle comprend l'hébergement, la restauration, le transport, les attractions et les services connexes.",
      "Le tourisme québécois et canadien est fortement saisonnier : l'été attire les visiteurs pour les activités extérieures et les festivals, l'hiver pour les sports de glisse, tandis que l'automne séduit par les couleurs des feuillages. Comprendre cette saisonnalité est essentiel pour la planification opérationnelle.",
      "Des organismes comme Destination Canada à l'échelle nationale, et Tourisme Québec à l'échelle provinciale, coordonnent la promotion internationale et soutiennent les entreprises touristiques locales par du financement et de la formation.",
    ],
    keyTakeaways: [
      "La saisonnalité dicte une grande partie de la planification en tourisme canadien",
      "L'industrie touristique a des retombées économiques bien au-delà de l'hébergement",
      "Les organismes de promotion offrent des ressources concrètes aux entreprises du secteur",
    ],
    resources: [
      { label: "Destination Canada", url: "https://www.destinationcanada.com" },
      { label: "Tourisme Québec — Alliance de l'industrie touristique", url: "https://www.alliancetouristique.com" },
    ],
    quiz: [
      { question: "Quel organisme coordonne la promotion touristique à l'échelle nationale au Canada ?", options: ["Destination Canada", "La SAAQ", "Postes Canada", "Revenu Québec"], correctIndex: 0, explanation: "Destination Canada est l'organisme national responsable de la promotion touristique du pays à l'international." },
      { question: "Quelle saison attire les visiteurs pour les sports de glisse au Canada ?", options: ["L'été", "L'hiver", "Le printemps", "Aucune saison spécifique"], correctIndex: 1, explanation: "L'hiver canadien attire les amateurs de ski et autres sports de glisse, un attrait touristique majeur." },
      { question: "Qu'est-ce qui attire particulièrement les touristes à l'automne au Québec ?", options: ["Les couleurs des feuillages", "La chaleur extrême", "Les tempêtes de neige", "Aucun attrait particulier"], correctIndex: 0, explanation: "L'automne québécois est réputé pour ses paysages colorés qui attirent de nombreux visiteurs." },
      { question: "Quels secteurs sont inclus dans l'industrie touristique selon le module ?", options: ["Uniquement l'hébergement", "Hébergement, restauration, transport, attractions", "Uniquement les attractions", "L'agriculture seulement"], correctIndex: 1, explanation: "L'industrie touristique englobe un large éventail de secteurs interconnectés au-delà du simple hébergement." },
      { question: "Pourquoi la saisonnalité est-elle importante en tourisme canadien ?", options: ["Elle n'a aucune importance", "Elle dicte une grande partie de la planification opérationnelle", "Elle concerne uniquement les restaurants", "C'est un détail sans conséquence"], correctIndex: 1, explanation: "La forte variation saisonnière de la demande touristique influence directement la gestion des ressources et du personnel." },
      { question: "Quel rôle joue Tourisme Québec auprès des entreprises locales ?", options: ["Aucun rôle particulier", "Il offre financement et formation", "Il interdit les nouvelles entreprises", "Il gère uniquement les impôts"], correctIndex: 1, explanation: "Tourisme Québec soutient concrètement les entreprises touristiques locales par des programmes de financement et de formation." },
    ],
  },
  {
    title: "Gestion hôtelière et hébergement",
    objectives: [
      "Comprendre les opérations clés d'un établissement hôtelier",
      "Maîtriser les notions de taux d'occupation et de revenu par chambre",
      "Gérer la réception et les réservations efficacement",
    ],
    content: [
      "Les opérations hôtelières incluent la réception (check-in/check-out), l'entretien ménager, la maintenance, la restauration (si applicable) et la gestion des réservations à travers plusieurs canaux (site direct, agences en ligne comme Booking ou Expedia).",
      "Le taux d'occupation (chambres occupées / chambres disponibles) et le RevPAR (revenu par chambre disponible) sont les indicateurs de performance centraux en hôtellerie, permettant d'ajuster les stratégies de tarification dynamique selon la demande.",
      "La gestion efficace de la réception combine accueil chaleureux, résolution rapide des problèmes (chambre non conforme, surbooking) et utilisation fluide des systèmes de gestion de propriété (PMS) pour synchroniser les réservations entre tous les canaux de distribution.",
    ],
    keyTakeaways: [
      "Le RevPAR reste l'indicateur de référence pour évaluer la performance hôtelière",
      "La tarification dynamique ajuste les prix en temps réel selon la demande",
      "Un système de gestion de propriété (PMS) performant évite les erreurs de surbooking coûteuses",
    ],
    resources: [
      { label: "Association Hôtellerie Québec", url: "https://www.hotelleriequebec.com" },
    ],
    quiz: [
      { question: "Que signifie RevPAR en gestion hôtelière ?", options: ["Revenu par chambre disponible", "Réservation pour absence requise", "Revenu personnel administratif régulier", "Aucune signification reconnue"], correctIndex: 0, explanation: "Le RevPAR (Revenue Per Available Room) est un indicateur clé combinant taux d'occupation et tarif moyen." },
      { question: "Comment se calcule le taux d'occupation ?", options: ["Chambres occupées divisées par chambres disponibles", "Nombre d'employés divisé par nombre de chambres", "Revenu total divisé par 365", "Il ne se calcule pas"], correctIndex: 0, explanation: "Le taux d'occupation mesure la proportion de chambres occupées par rapport à la capacité totale disponible." },
      { question: "Qu'est-ce que la tarification dynamique en hôtellerie ?", options: ["Un prix fixe toute l'année", "L'ajustement des prix en temps réel selon la demande", "Une interdiction de changer les prix", "Un tarif unique pour tous les hôtels"], correctIndex: 1, explanation: "La tarification dynamique adapte les tarifs en fonction de la demande, de la saison et d'autres facteurs en temps réel." },
      { question: "Que permet d'éviter un système de gestion de propriété (PMS) performant ?", options: ["Les erreurs de surbooking", "L'augmentation des prix", "La climatisation", "Le nettoyage des chambres"], correctIndex: 0, explanation: "Un PMS efficace synchronise les réservations entre tous les canaux, évitant les doubles réservations coûteuses." },
      { question: "Quels canaux de distribution sont mentionnés pour les réservations hôtelières ?", options: ["Uniquement le téléphone", "Le site direct et les agences en ligne (Booking, Expedia)", "Uniquement le courrier postal", "Aucun canal mentionné"], correctIndex: 1, explanation: "Les hôtels gèrent généralement plusieurs canaux de distribution simultanément pour maximiser leur visibilité." },
      { question: "Quelles opérations font partie de la gestion hôtelière de base ?", options: ["Réception, entretien ménager, maintenance", "Uniquement la comptabilité", "Uniquement le marketing", "La construction de nouveaux hôtels"], correctIndex: 0, explanation: "Ces opérations quotidiennes sont essentielles au bon fonctionnement d'un établissement hôtelier." },
    ],
  },
  {
    title: "Service à la clientèle d'excellence",
    objectives: [
      "Appliquer les principes du service client haut de gamme",
      "Gérer les plaintes clients avec professionnalisme",
      "Créer des expériences mémorables pour les visiteurs",
    ],
    content: [
      "Le service client d'excellence en tourisme repose sur l'anticipation des besoins plutôt que la simple réaction aux demandes : reconnaître un client récurrent, personnaliser l'accueil selon le motif du séjour, et offrir des attentions qui dépassent les attentes standards.",
      "La gestion des plaintes suit un processus structuré : écouter complètement sans interrompre, présenter des excuses sincères même sans faute clairement établie, proposer une solution concrète, et faire un suivi après résolution pour confirmer la satisfaction.",
      "Les expériences mémorables naissent souvent de petits détails personnalisés plutôt que de grands gestes coûteux : se souvenir d'une préférence exprimée, offrir une attention surprise pour un anniversaire, ou simplement faire preuve d'une attention authentique au bien-être du client.",
    ],
    keyTakeaways: [
      "L'anticipation des besoins distingue le service excellent du service simplement correct",
      "Une plainte bien gérée peut renforcer la fidélité plus qu'un séjour sans incident",
      "Les détails personnalisés créent des souvenirs plus durables que le luxe matériel seul",
    ],
    resources: [
      { label: "Tourisme Québec — Formation service client", url: "https://www.tourisme-quebec.qc.ca" },
    ],
    quiz: [
      { question: "Qu'est-ce qui distingue le service client d'excellence du service simplement correct ?", options: ["L'anticipation des besoins", "Le prix élevé uniquement", "Le nombre d'employés", "La taille de l'établissement"], correctIndex: 0, explanation: "Anticiper les besoins avant qu'ils ne soient exprimés est la marque distinctive d'un service véritablement excellent." },
      { question: "Quelle est la première étape recommandée pour gérer une plainte client ?", options: ["Interrompre immédiatement le client", "Écouter complètement sans interrompre", "Ignorer la plainte", "Accuser le client"], correctIndex: 1, explanation: "Écouter pleinement avant de répondre montre du respect et permet de comprendre réellement le problème." },
      { question: "Une plainte bien gérée peut-elle renforcer la fidélité d'un client ?", options: ["Non, jamais", "Oui, parfois plus qu'un séjour sans incident", "Cela n'a aucun effet", "Uniquement si le client reçoit de l'argent"], correctIndex: 1, explanation: "Une résolution professionnelle et empathique d'une plainte peut transformer une expérience négative en fidélisation renforcée." },
      { question: "Qu'est-ce qui crée le plus souvent des expériences mémorables selon le module ?", options: ["Uniquement le luxe matériel", "Les détails personnalisés", "Le prix élevé uniquement", "La taille de la chambre"], correctIndex: 1, explanation: "De petites attentions personnalisées marquent souvent plus les clients que des installations luxueuses impersonnelles." },
      { question: "Que doit-on faire après avoir résolu une plainte client ?", options: ["Rien de plus", "Un suivi pour confirmer la satisfaction", "Oublier immédiatement l'incident", "Facturer des frais supplémentaires"], correctIndex: 1, explanation: "Le suivi post-résolution démontre un engagement réel envers la satisfaction durable du client." },
      { question: "Faut-il présenter des excuses même sans faute clairement établie ?", options: ["Non, jamais", "Oui, des excuses sincères apaisent souvent la situation", "Uniquement si le client est célèbre", "C'est interdit"], correctIndex: 1, explanation: "Des excuses sincères, même en l'absence de faute claire, démontrent de l'empathie et désamorcent souvent les tensions." },
    ],
  },
  {
    title: "Gestion de la restauration",
    objectives: [
      "Comprendre les opérations de base d'un service de restauration",
      "Maîtriser les notions de coût de nourriture et marge",
      "Connaître les normes sanitaires applicables au Québec",
    ],
    content: [
      "Les opérations de restauration combinent la gestion des achats et stocks, la planification des menus, la gestion du personnel de cuisine et de salle, et le contrôle des coûts. Le coût de nourriture (food cost) idéal se situe généralement entre 28% et 35% du prix de vente selon le type d'établissement.",
      "Le calcul de marge sur chaque plat doit tenir compte non seulement du coût des ingrédients, mais aussi du gaspillage, des pertes et des coûts de main-d'œuvre associés à la préparation. Une analyse régulière du menu identifie les plats les plus et moins rentables.",
      "Le Québec impose des normes sanitaires strictes via le ministère de l'Agriculture, des Pêcheries et de l'Alimentation (MAPAQ) : permis d'exploitation obligatoire, formation en hygiène et salubrité alimentaire pour le personnel, et inspections régulières.",
    ],
    keyTakeaways: [
      "Le contrôle du coût de nourriture est central à la rentabilité d'un restaurant",
      "L'analyse de rentabilité par plat révèle souvent des surprises sur les best-sellers",
      "La conformité MAPAQ est une obligation légale stricte avec conséquences sérieuses en cas de manquement",
    ],
    resources: [
      { label: "MAPAQ — Permis et normes alimentaires", url: "https://www.mapaq.gouv.qc.ca" },
    ],
    quiz: [
      { question: "Quel organisme québécois encadre les normes sanitaires alimentaires ?", options: ["Le MAPAQ", "La CNESST", "La RAMQ", "Le ministère des Transports"], correctIndex: 0, explanation: "Le MAPAQ (ministère de l'Agriculture, des Pêcheries et de l'Alimentation) est responsable de la réglementation alimentaire au Québec." },
      { question: "Quel est le coût de nourriture (food cost) idéal mentionné dans le module ?", options: ["Entre 28% et 35% du prix de vente", "Toujours 0%", "Toujours 100%", "Exactement 50%"], correctIndex: 0, explanation: "Cette fourchette permet généralement de maintenir une rentabilité saine tout en offrant des produits de qualité." },
      { question: "Que doit prendre en compte le calcul de marge d'un plat, au-delà des ingrédients ?", options: ["Rien d'autre", "Le gaspillage, les pertes et la main-d'œuvre", "Uniquement la décoration de l'assiette", "Le climat extérieur"], correctIndex: 1, explanation: "Une analyse de rentabilité complète intègre tous les coûts associés, pas seulement le prix brut des ingrédients." },
      { question: "Que peut révéler une analyse régulière du menu ?", options: ["Rien d'utile", "Les plats les plus et moins rentables", "Uniquement les préférences personnelles du chef", "Le nombre de tables disponibles"], correctIndex: 1, explanation: "Cette analyse identifie quels plats contribuent réellement à la rentabilité, même parmi les best-sellers." },
      { question: "Qu'est-ce qui est obligatoire selon les normes MAPAQ ?", options: ["Un permis d'exploitation et une formation en hygiène alimentaire", "Aucune obligation particulière", "Uniquement un certificat de naissance", "Un permis de conduire"], correctIndex: 0, explanation: "Le MAPAQ exige un permis d'exploitation valide ainsi qu'une formation appropriée en hygiène et salubrité." },
      { question: "Que comprennent les opérations de base d'un service de restauration ?", options: ["Achats, planification des menus, gestion du personnel", "Uniquement la décoration intérieure", "Uniquement la musique d'ambiance", "La gestion immobilière"], correctIndex: 0, explanation: "Ces éléments forment le cœur opérationnel quotidien de tout établissement de restauration." },
    ],
  },
  {
    title: "Organisation d'événements",
    objectives: [
      "Planifier un événement de bout en bout",
      "Gérer la logistique et le budget d'un événement",
      "Coordonner les différents fournisseurs et partenaires",
    ],
    content: [
      "La planification d'événement suit un échéancier rigoureux : définition des objectifs, sélection du lieu, réservation des fournisseurs (traiteur, audiovisuel, décoration), promotion et inscription, puis exécution le jour même avec un plan de contingence pour les imprévus.",
      "La gestion budgétaire d'un événement doit inclure une marge de contingence de 10 à 15% pour les dépenses imprévues, et prioriser les postes de dépense selon leur impact direct sur l'expérience des participants.",
      "La coordination de multiples fournisseurs (traiteur, technique, sécurité, transport) exige une communication centralisée, généralement via un document de logistique partagé précisant les horaires, responsabilités et points de contact de chaque intervenant.",
    ],
    keyTakeaways: [
      "Une marge de contingence budgétaire évite les mauvaises surprises de dernière minute",
      "La communication centralisée entre fournisseurs prévient la majorité des problèmes logistiques",
      "Un plan de contingence pour les imprévus distingue les organisateurs expérimentés",
    ],
    resources: [
      { label: "Société des attractions touristiques du Québec", url: "https://www.satq.ca" },
    ],
    quiz: [
      { question: "Quelle marge de contingence budgétaire est recommandée pour un événement ?", options: ["10 à 15%", "0%", "90 à 100%", "50%"], correctIndex: 0, explanation: "Une marge de 10 à 15% permet de couvrir les dépenses imprévues sans compromettre le budget global." },
      { question: "Qu'est-ce qu'un plan de contingence en organisation d'événements ?", options: ["Un plan préparé pour gérer les imprévus", "Un type de décoration", "Un menu spécial", "Une liste d'invités"], correctIndex: 0, explanation: "Le plan de contingence anticipe les problèmes potentiels et prépare des solutions de secours avant qu'ils ne surviennent." },
      { question: "Qu'est-ce qui prévient la majorité des problèmes logistiques selon le module ?", options: ["Le hasard", "La communication centralisée entre fournisseurs", "L'absence de planification", "Le silence total"], correctIndex: 1, explanation: "Un document de logistique partagé entre tous les fournisseurs réduit considérablement les risques de confusion." },
      { question: "Quelle est la première étape de la planification d'un événement ?", options: ["L'exécution le jour même", "La définition des objectifs", "Le démontage", "La facturation finale"], correctIndex: 1, explanation: "Définir clairement les objectifs de l'événement guide toutes les décisions ultérieures de planification." },
      { question: "Selon quel critère les postes de dépense doivent-ils être priorisés ?", options: ["Au hasard", "Leur impact direct sur l'expérience des participants", "Uniquement leur coût le plus bas", "L'ordre alphabétique"], correctIndex: 1, explanation: "Prioriser selon l'impact sur l'expérience garantit que le budget est investi là où il compte le plus pour les participants." },
      { question: "Quels types de fournisseurs doivent être coordonnés lors d'un événement ?", options: ["Traiteur, technique, sécurité, transport", "Uniquement le traiteur", "Aucun fournisseur n'est nécessaire", "Uniquement la sécurité"], correctIndex: 0, explanation: "Un événement réussi nécessite la coordination de multiples intervenants travaillant en synchronisation." },
    ],
  },
  {
    title: "Marketing touristique et digital",
    objectives: [
      "Promouvoir une destination ou un établissement touristique en ligne",
      "Utiliser les avis clients comme levier marketing",
      "Collaborer avec des influenceurs et créateurs de contenu",
    ],
    content: [
      "Le marketing touristique digital s'appuie fortement sur le contenu visuel : photos et vidéos de qualité professionnelle sur les réseaux sociaux, présence optimisée sur Google My Business, et inscription sur les plateformes de réservation et de comparaison touristique.",
      "Les avis clients sur des plateformes comme TripAdvisor ou Google sont devenus l'un des facteurs de décision les plus influents pour les voyageurs. Répondre systématiquement aux avis, positifs comme négatifs, démontre un engagement actif envers la qualité du service.",
      "Les partenariats avec des influenceurs et créateurs de contenu touristique permettent d'atteindre de nouvelles audiences de manière authentique, à condition de bien sélectionner des collaborateurs dont l'audience correspond réellement à la clientèle cible.",
    ],
    keyTakeaways: [
      "Le contenu visuel de qualité est devenu non négociable en marketing touristique",
      "Les avis en ligne influencent désormais plus de décisions de voyage que la publicité traditionnelle",
      "L'authenticité d'un partenariat influenceur compte plus que la taille brute de son audience",
    ],
    resources: [
      { label: "Tourisme Québec — Ressources marketing numérique", url: "https://www.tourisme-quebec.qc.ca" },
    ],
    quiz: [
      { question: "Quelles plateformes sont mentionnées comme influentes pour les avis clients touristiques ?", options: ["TripAdvisor et Google", "Aucune plateforme spécifique", "Uniquement les journaux papier", "La radio uniquement"], correctIndex: 0, explanation: "Ces plateformes sont citées comme particulièrement influentes dans la décision de voyage des consommateurs." },
      { question: "Que faut-il faire avec les avis clients négatifs selon le module ?", options: ["Les ignorer complètement", "Y répondre systématiquement", "Les supprimer si possible", "Bloquer le client"], correctIndex: 1, explanation: "Répondre aux avis, qu'ils soient positifs ou négatifs, démontre un engagement actif envers la qualité du service." },
      { question: "Qu'est-ce qui compte le plus dans un partenariat influenceur selon le module ?", options: ["La taille brute de l'audience uniquement", "L'authenticité et la correspondance avec la clientèle cible", "Le prix le plus bas", "La nationalité de l'influenceur"], correctIndex: 1, explanation: "Un partenariat efficace dépend de l'adéquation réelle entre l'audience de l'influenceur et la clientèle visée, pas seulement du nombre de followers." },
      { question: "Sur quoi le marketing touristique digital s'appuie-t-il fortement ?", options: ["Le contenu visuel de qualité", "Uniquement le texte sans image", "Les communiqués papier", "Le bouche-à-oreille uniquement"], correctIndex: 0, explanation: "Photos et vidéos professionnelles sont devenues essentielles pour capter l'attention sur les plateformes touristiques." },
      { question: "Que permet une présence optimisée sur Google My Business ?", options: ["Rien d'utile", "Une meilleure visibilité locale pour l'établissement touristique", "Une réduction d'impôt automatique", "L'élimination de la concurrence"], correctIndex: 1, explanation: "Google My Business améliore la visibilité locale et facilite la découverte par les voyageurs potentiels." },
      { question: "Les avis en ligne influencent-ils plus ou moins les décisions de voyage que la publicité traditionnelle selon le module ?", options: ["Moins", "Plus", "Aucune influence", "C'est exactement égal"], correctIndex: 1, explanation: "Le module souligne que les avis clients sont devenus un facteur de décision plus influent que la publicité classique." },
    ],
  },
  {
    title: "Réglementation et normes de l'industrie",
    objectives: [
      "Connaître les permis et licences requis dans le secteur touristique",
      "Comprendre les normes de classification hôtelière",
      "Identifier les obligations en matière d'assurance et de responsabilité civile",
    ],
    content: [
      "Les établissements touristiques au Québec doivent souvent détenir plusieurs permis selon leur activité : permis d'établissement d'hébergement touristique, permis d'exploitation de restaurant (MAPAQ), et licences spécifiques pour la vente d'alcool ou l'organisation d'activités d'aventure.",
      "La classification hôtelière par étoiles au Québec est gérée par la Corporation de l'industrie touristique du Québec (CITQ), évaluant les établissements selon des critères standardisés de confort, services et installations.",
      "La responsabilité civile est particulièrement critique dans le secteur touristique, surtout pour les activités d'aventure ou impliquant des risques physiques : une couverture d'assurance adéquate et des protocoles de sécurité documentés sont essentiels pour protéger l'entreprise et les clients.",
    ],
    keyTakeaways: [
      "Opérer sans les permis requis expose à des sanctions sévères et une fermeture potentielle",
      "La classification par étoiles influence directement le positionnement marketing",
      "Une couverture d'assurance adaptée au niveau de risque réel est non négociable",
    ],
    resources: [
      { label: "CITQ — Classification des établissements touristiques", url: "https://www.citq.qc.ca" },
    ],
    quiz: [
      { question: "Quel organisme gère la classification hôtelière par étoiles au Québec ?", options: ["La CITQ", "La SAAQ", "La RAMQ", "Revenu Québec"], correctIndex: 0, explanation: "La CITQ (Corporation de l'industrie touristique du Québec) gère officiellement la classification des établissements." },
      { question: "Que risque une entreprise touristique opérant sans les permis requis ?", options: ["Aucun risque", "Des sanctions sévères et une fermeture potentielle", "Une récompense gouvernementale", "Rien de particulier"], correctIndex: 1, explanation: "L'absence des permis nécessaires expose l'entreprise à de sérieuses conséquences légales, incluant la fermeture." },
      { question: "Pourquoi la responsabilité civile est-elle particulièrement critique pour les activités d'aventure ?", options: ["Ce n'est pas important", "En raison des risques physiques impliqués pour les clients", "Parce que c'est gratuit", "Cela ne concerne que les hôtels"], correctIndex: 1, explanation: "Les activités à risque physique élevé nécessitent une couverture d'assurance adéquate pour protéger l'entreprise et les participants." },
      { question: "Quel permis est nécessaire pour exploiter un restaurant au Québec ?", options: ["Un permis MAPAQ", "Aucun permis n'est requis", "Un permis de conduire uniquement", "Un visa touristique"], correctIndex: 0, explanation: "Le permis d'exploitation MAPAQ est obligatoire pour tout établissement de restauration au Québec." },
      { question: "Selon quels critères la CITQ évalue-t-elle les établissements pour la classification par étoiles ?", options: ["Confort, services et installations", "Uniquement le prix", "La popularité sur les réseaux sociaux", "L'âge du propriétaire"], correctIndex: 0, explanation: "La classification standardisée repose sur des critères objectifs de qualité d'hébergement et de services." },
      { question: "Comment la classification par étoiles influence-t-elle l'entreprise ?", options: ["Elle n'a aucune influence", "Elle influence directement le positionnement marketing", "Elle détermine uniquement les impôts", "Elle est purement décorative"], correctIndex: 1, explanation: "Le nombre d'étoiles communique un niveau de qualité attendu, influençant directement les attentes et le marketing." },
    ],
  },
  {
    title: "Stage pratique & certification",
    objectives: [
      "Appliquer les compétences acquises dans un contexte professionnel réel",
      "Démontrer la maîtrise opérationnelle du secteur touristique",
      "Obtenir le certificat ARCADINS en tourisme et gestion hôtelière",
    ],
    content: [
      "Le stage pratique permet de mettre en application l'ensemble des compétences développées durant la formation, dans un contexte réel d'hébergement, de restauration ou d'organisation d'événements, sous la supervision d'un professionnel du secteur.",
      "L'évaluation finale porte sur la capacité à gérer des situations concrètes : accueil de clientèle, résolution de plaintes, coordination logistique et respect des normes sanitaires et réglementaires applicables au secteur.",
      "À l'issue du stage et de l'évaluation, le certificat ARCADINS en tourisme et gestion hôtelière est délivré, reconnu par le réseau de partenaires employeurs du secteur touristique québécois.",
    ],
    keyTakeaways: [
      "Le stage pratique valide les compétences théoriques par une mise en situation réelle",
      "La gestion de situations imprévues est au cœur de l'évaluation finale",
      "Le certificat délivré ouvre la voie vers les partenaires employeurs du secteur",
    ],
    resources: [],
    quiz: [
      { question: "Sous quelle supervision se déroule le stage pratique ?", options: ["Un professionnel du secteur", "Aucune supervision n'est nécessaire", "Uniquement des camarades de classe", "Un robot automatisé"], correctIndex: 0, explanation: "Le stage est encadré par un professionnel expérimenté garantissant un apprentissage de qualité en contexte réel." },
      { question: "Sur quoi porte principalement l'évaluation finale du stage ?", options: ["La capacité à gérer des situations concrètes réelles", "Uniquement la mémorisation théorique", "L'apparence physique", "La rapidité de frappe au clavier"], correctIndex: 0, explanation: "L'évaluation se concentre sur l'application pratique des compétences dans des situations professionnelles réelles." },
      { question: "Que reçoit l'étudiant à l'issue du stage et de l'évaluation réussie ?", options: ["Le certificat ARCADINS en tourisme et gestion hôtelière", "Rien de spécifique", "Une amende", "Un séjour gratuit uniquement"], correctIndex: 0, explanation: "Le certificat ARCADINS atteste officiellement des compétences acquises en tourisme et gestion hôtelière." },
      { question: "Le certificat est-il reconnu par des employeurs ?", options: ["Non, jamais", "Oui, par le réseau de partenaires employeurs du secteur", "Uniquement à l'international", "Seulement par la famille de l'étudiant"], correctIndex: 1, explanation: "Le certificat est conçu pour être reconnu par les employeurs partenaires du secteur touristique québécois." },
      { question: "Quel type de compétence est central dans l'évaluation finale ?", options: ["La gestion de situations imprévues", "Uniquement la connaissance théorique", "La vitesse de course à pied", "Le talent artistique"], correctIndex: 0, explanation: "Savoir réagir efficacement face à des imprévus est une compétence clé évaluée lors du stage pratique." },
      { question: "Dans quels contextes le stage peut-il se dérouler ?", options: ["Hébergement, restauration ou organisation d'événements", "Uniquement dans un bureau administratif", "Uniquement à l'étranger", "Aucun contexte spécifique n'est requis"], correctIndex: 0, explanation: "Le stage offre une flexibilité de contextes pratiques alignés avec les différentes facettes du secteur touristique." },
    ],
  },
];
