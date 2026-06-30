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
  },
];
