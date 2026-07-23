import type { Lesson } from "@/types/lesson";

export const tourismeLessons: Lesson[] = [
  {
    title: "Introduction au tourisme canadien",
    objectives: [
      "Comprendre la structure et le poids économique de l'industrie touristique canadienne",
      "Analyser l'impact de la saisonnalité sur la planification",
      "Identifier les principales destinations et saisons touristiques",
      "Connaître les organismes de promotion et leurs ressources",
    ],
    content: [
      "L'industrie touristique canadienne génère des dizaines de milliards de dollars annuellement et emploie directement et indirectement des centaines de milliers de personnes. Elle comprend l'hébergement, la restauration, le transport, les attractions et les services connexes.",
      "Cette imbrication de secteurs est essentielle à saisir : le tourisme n'est pas une industrie isolée mais un écosystème où tout se répercute. Un festival qui attire des visiteurs remplit les hôtels, les restaurants, les taxis et les boutiques bien au-delà de l'événement lui-même. C'est ce qu'on appelle l'effet multiplicateur : un dollar dépensé par un touriste circule dans toute l'économie locale. Comprendre cette interdépendance change la perspective — le succès d'un maillon (une attraction phare, un bon accueil) profite à toute la chaîne, et sa défaillance nuit à tous.",
      "Le tourisme québécois et canadien est fortement saisonnier : l'été attire les visiteurs pour les activités extérieures et les festivals, l'hiver pour les sports de glisse, tandis que l'automne séduit par les couleurs des feuillages. Comprendre cette saisonnalité est essentiel pour la planification opérationnelle.",
      "La saisonnalité est le défi structurel numéro un du tourisme canadien. Un établissement peut afficher complet en juillet et être quasi désert en novembre, ce qui pose des casse-têtes concrets : comment payer un loyer à l'année avec des revenus concentrés sur quelques mois ? Comment garder du personnel qualifié entre deux saisons ? Les gestionnaires avisés y répondent par des stratégies délibérées : diversifier l'offre pour attirer une clientèle hors saison (tourisme d'affaires, forfaits thématiques), ajuster les effectifs et les prix, et gérer la trésorerie pour absorber les creux. Ignorer la saisonnalité, c'est se condamner à des mois d'euphorie suivis de mois d'angoisse financière.",
      "Des organismes comme Destination Canada à l'échelle nationale, et Tourisme Québec à l'échelle provinciale, coordonnent la promotion internationale et soutiennent les entreprises touristiques locales par du financement et de la formation.",
      "Beaucoup de petits acteurs touristiques ignorent l'existence de ces ressources ou les croient réservées aux grands joueurs, se privant ainsi d'un appui précieux. Or ces organismes offrent bien plus que de la promotion : des programmes de financement, des formations, des données sur les tendances de marché, et une visibilité internationale qu'un petit hôtel ou une auberge ne pourrait jamais s'offrir seul. Faire partie d'une association touristique régionale, participer aux campagnes collectives, utiliser les données disponibles : ce sont des leviers concrets pour rester compétitif. Dans une industrie où la promotion coûte cher, mutualiser les efforts via ces organismes est souvent la stratégie la plus rentable pour un petit établissement.",
    ],
    caseStudy: {
      title: "L'auberge des Laurentides face au creux de novembre",
      body: [
        "L'Auberge du Lac, une petite auberge des Laurentides, vit une réalité typique du tourisme canadien : elle affiche complet tout l'été et pendant la saison de ski, mais se vide presque entièrement en novembre et au début du printemps. Chaque année, la propriétaire, Denise, subit ces creux avec anxiété, tirant sur sa marge de crédit pour tenir jusqu'à la haute saison.",
        "Denise croyait devoir simplement « endurer » ces périodes mortes. En participant à un atelier de son association touristique régionale, elle découvre deux choses : d'abord que la saisonnalité se gère activement plutôt que subir passivement, et ensuite que des ressources existent pour l'y aider. Elle apprend à cibler une clientèle hors saison — retraites d'entreprise, forfaits « nature et détente » d'automne, ateliers thématiques — et bénéficie d'un programme de financement régional pour promouvoir ces nouvelles offres.",
        "En deux ans, novembre cesse d'être un désert : les retraites corporatives et les forfaits d'automne comblent une partie du creux, lissant les revenus sur l'année et détendant la trésorerie. La leçon : la saisonnalité est le défi central du tourisme canadien, mais elle se pilote — en diversifiant l'offre et en s'appuyant sur les ressources des organismes du secteur, qu'un petit établissement a tout intérêt à ne pas ignorer.",
      ],
    },
    exercise: {
      title: "Analyser et atténuer la saisonnalité d'un établissement",
      prompt: [
        "Choisissez un type d'établissement touristique canadien (auberge, restaurant, entreprise d'activités…) et décrivez son profil de saisonnalité : quelles sont ses hautes et basses saisons, et quels problèmes concrets (trésorerie, personnel) en découlent ?",
        "Proposez au moins trois stratégies concrètes pour atténuer les creux hors saison (diversification de l'offre, nouvelle clientèle cible, ajustement des prix ou des effectifs), en expliquant l'effet attendu de chacune.",
        "Identifiez enfin deux organismes ou ressources (nationaux ou régionaux) qui pourraient soutenir cet établissement, et précisez concrètement ce que chacun pourrait lui apporter.",
      ],
      deliverables: [
        "Le profil de saisonnalité de l'établissement et les problèmes concrets associés",
        "Trois stratégies d'atténuation des creux, avec leur effet attendu",
        "Deux organismes/ressources identifiés, avec leur apport concret",
        "Une explication de l'effet multiplicateur du tourisme sur l'économie locale",
      ],
    },
    keyTakeaways: [
      "Le tourisme est un écosystème interdépendant à fort effet multiplicateur local",
      "La saisonnalité est le défi structurel numéro un et se pilote activement",
      "Diversifier l'offre hors saison lisse les revenus et détend la trésorerie",
      "L'industrie touristique a des retombées économiques bien au-delà de l'hébergement",
      "Les organismes de promotion offrent financement, formation et visibilité, même aux petits acteurs",
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
      "Calculer et interpréter le taux d'occupation et le RevPAR",
      "Comprendre la logique de la tarification dynamique",
      "Éviter les erreurs de surbooking grâce à un PMS bien géré",
    ],
    content: [
      "Les opérations hôtelières incluent la réception (check-in/check-out), l'entretien ménager, la maintenance, la restauration (si applicable) et la gestion des réservations à travers plusieurs canaux (site direct, agences en ligne comme Booking ou Expedia).",
      "La gestion des canaux de distribution est un enjeu financier majeur souvent sous-estimé. Une réservation via une agence en ligne comme Booking ou Expedia est pratique et amène de la visibilité, mais l'agence prélève une commission qui peut atteindre 15 à 25 % du prix de la chambre. La même chambre vendue directement sur le site de l'hôtel rapporte donc bien davantage. Tout l'art consiste à profiter de la visibilité des grandes plateformes pour se faire connaître, tout en incitant le client à réserver ensuite en direct (programme de fidélité, meilleur tarif direct). Négliger cet arbitrage, c'est offrir une part importante de sa marge aux intermédiaires.",
      "Le taux d'occupation (chambres occupées / chambres disponibles) et le RevPAR (revenu par chambre disponible) sont les indicateurs de performance centraux en hôtellerie, permettant d'ajuster les stratégies de tarification dynamique selon la demande.",
      "Le RevPAR est plus subtil et plus utile que le seul taux d'occupation, et voici pourquoi : afficher complet ne signifie pas nécessairement bien gagner sa vie. Un hôtel rempli à 100 % à des prix bradés peut être moins rentable qu'un hôtel occupé à 70 % à bon prix. Le RevPAR (qui combine occupation ET tarif moyen) capte cette réalité en une seule mesure. C'est pourquoi la tarification dynamique existe : à l'image des billets d'avion, le prix d'une chambre varie selon la demande prévue — plus élevé un soir de festival, plus bas un mardi de novembre. L'objectif n'est pas de remplir à tout prix, mais de maximiser le revenu total par chambre disponible.",
      "La gestion efficace de la réception combine accueil chaleureux, résolution rapide des problèmes (chambre non conforme, surbooking) et utilisation fluide des systèmes de gestion de propriété (PMS) pour synchroniser les réservations entre tous les canaux de distribution.",
      "Le surbooking illustre parfaitement l'importance d'un PMS bien géré. Quand un hôtel vend ses chambres sur plusieurs plateformes à la fois sans les synchroniser en temps réel, deux clients peuvent réserver la même dernière chambre — et l'un d'eux arrivera pour découvrir qu'il n'a pas de chambre. C'est l'un des pires incidents en hôtellerie : humiliant pour l'établissement, catastrophique pour le client, et désastreux en avis en ligne. Un système de gestion de propriété (PMS) performant met à jour instantanément les disponibilités sur tous les canaux, rendant le surbooking accidentel quasi impossible. La technologie, ici, n'est pas un luxe mais une protection contre une faute qui détruit la réputation.",
    ],
    caseStudy: {
      title: "L'Hôtel Belmont : plein mais peu rentable",
      body: [
        "L'Hôtel Belmont, un établissement urbain de taille moyenne, se targue d'un taux d'occupation quasi parfait toute l'année. Son propriétaire est fier de « toujours afficher complet ». Pourtant, les résultats financiers déçoivent, et il ne comprend pas pourquoi un hôtel toujours plein peine à dégager des profits.",
        "Une consultante analyse ses chiffres et révèle le problème : pour garantir ce taux de remplissage, le Belmont bradait ses prix et vendait l'essentiel de ses chambres via des agences en ligne prélevant 20 % de commission. Résultat : un RevPAR médiocre. Chaque chambre était certes occupée, mais rapportait peu, une fois le tarif cassé et la commission déduite. Le taux d'occupation flatteur masquait une rentabilité anémique.",
        "Le Belmont change de stratégie : tarification dynamique (prix plus élevés lors des pics de demande, plutôt que remplissage à tout prix), et effort actif pour rediriger les clients vers la réservation directe via un tarif préférentiel et un programme de fidélité. Le taux d'occupation baisse légèrement, mais le RevPAR — et surtout le profit — grimpe nettement. La leçon : en hôtellerie, remplir n'est pas gagner. Le bon indicateur est le revenu par chambre disponible, et maîtriser ses canaux de distribution protège une marge que les commissions grignotent silencieusement.",
      ],
    },
    exercise: {
      title: "Analyser la performance et la tarification d'un hôtel",
      prompt: [
        "Pour un hôtel fictif de 50 chambres, on vous donne deux scénarios d'une même nuit : (A) 50 chambres occupées à 90 $ ; (B) 40 chambres occupées à 130 $. Calculez le taux d'occupation, le revenu total et le RevPAR de chaque scénario, puis déterminez lequel est le plus rentable et expliquez pourquoi.",
        "Expliquez, avec un exemple chiffré simple, pourquoi une réservation directe est plus rentable pour l'hôtel qu'une réservation via une agence en ligne prélevant 20 % de commission, et proposez deux façons d'inciter les clients à réserver en direct.",
        "Décrivez enfin comment un système de gestion de propriété (PMS) prévient le surbooking, et pourquoi un incident de surbooking est particulièrement dommageable pour un hôtel.",
      ],
      deliverables: [
        "Le calcul du taux d'occupation, du revenu et du RevPAR pour les deux scénarios, avec conclusion",
        "Une démonstration chiffrée de l'intérêt de la réservation directe + deux façons de l'encourager",
        "Une explication du rôle du PMS dans la prévention du surbooking",
        "Une justification du choix du RevPAR plutôt que du seul taux d'occupation",
      ],
    },
    keyTakeaways: [
      "Les commissions des agences en ligne (15-25 %) rendent la réservation directe bien plus rentable",
      "Le RevPAR reste l'indicateur de référence : remplir n'est pas gagner",
      "La tarification dynamique maximise le revenu par chambre plutôt que le seul remplissage",
      "Un système de gestion de propriété (PMS) performant évite les erreurs de surbooking coûteuses",
      "Un surbooking accidentel détruit la réputation autant que la relation client",
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
      "Gérer les plaintes clients selon un processus structuré",
      "Transformer une plainte en occasion de fidélisation",
      "Créer des expériences mémorables par la personnalisation",
    ],
    content: [
      "Le service client d'excellence en tourisme repose sur l'anticipation des besoins plutôt que la simple réaction aux demandes : reconnaître un client récurrent, personnaliser l'accueil selon le motif du séjour, et offrir des attentions qui dépassent les attentes standards.",
      "La différence entre réagir et anticiper est celle qui sépare un service correct d'un service inoubliable. Un service réactif attend la demande : le client réclame une couverture supplémentaire, on la lui apporte. Un service anticipatif observe et devine : on remarque qu'un couple fête son anniversaire de mariage et on prépare une petite attention sans qu'il ait rien demandé. Dans le tourisme, où l'on vend une expérience et non un simple produit, cette anticipation crée l'effet « wow » qui fait revenir les clients et les transforme en ambassadeurs. Elle ne coûte souvent presque rien — juste de l'attention et de l'écoute — mais elle exige une culture où chaque employé se sent responsable de l'expérience du client.",
      "La gestion des plaintes suit un processus structuré : écouter complètement sans interrompre, présenter des excuses sincères même sans faute clairement établie, proposer une solution concrète, et faire un suivi après résolution pour confirmer la satisfaction.",
      "Le paradoxe de la plainte est bien documenté et contre-intuitif : un client dont le problème est résolu rapidement et chaleureusement devient souvent plus fidèle qu'un client qui n'a jamais eu de problème. C'est le « paradoxe du rétablissement de service » — bien gérer un accroc laisse une impression plus forte qu'un séjour parfait mais anonyme, car le client voit alors concrètement à quel point l'établissement se soucie de lui. L'erreur fatale est de se mettre sur la défensive ou de chercher qui a tort. Le client mécontent ne veut pas gagner un débat ; il veut être entendu et voir son problème réglé. Une plainte est donc moins une menace qu'une seconde chance offerte à l'établissement.",
      "Les expériences mémorables naissent souvent de petits détails personnalisés plutôt que de grands gestes coûteux : se souvenir d'une préférence exprimée, offrir une attention surprise pour un anniversaire, ou simplement faire preuve d'une attention authentique au bien-être du client.",
      "Cette vérité est libératrice pour les établissements aux moyens limités : on n'a pas besoin d'un budget de palace pour marquer un client. Ce dont les gens se souviennent, ce n'est presque jamais le marbre du hall ou le prix de la suite, mais le moment où quelqu'un s'est souvenu de leur nom, a anticipé un besoin, ou a fait un geste sincère et inattendu. Un mot manuscrit, une recommandation personnalisée d'un restaurant local, une attention pour un enfant : ces détails coûtent quelques dollars mais créent des souvenirs et des avis dithyrambiques. Le luxe impressionne un instant ; l'attention authentique touche durablement. Dans une industrie où les avis en ligne font ou défont une réputation, ces petits gestes sont l'investissement le plus rentable qui soit.",
    ],
    caseStudy: {
      title: "La chambre inondée qui a créé un client à vie",
      body: [
        "Au Gîte du Fjord, un couple en voyage d'anniversaire découvre en pleine nuit une fuite d'eau au plafond de sa chambre. Contrariés, ils descendent à la réception, prêts à un affrontement. Le veilleur, formé au service d'excellence, ne se met pas sur la défensive et ne cherche pas d'excuses techniques. Il écoute, s'excuse sincèrement, et agit immédiatement.",
        "En quelques minutes, il reloge le couple dans la plus belle chambre disponible, sans supplément. Mais surtout, ayant remarqué en les écoutant qu'ils fêtaient leur anniversaire de mariage, il fait monter une petite bouteille de mousseux et un mot manuscrit d'excuses et de félicitations. Ce qui aurait pu être un désastre — une chambre inondée un soir spécial — se transforme sous leurs yeux en une attention qui les touche profondément.",
        "Le couple repart enchanté, laisse un avis cinq étoiles élogieux racontant précisément cet incident et sa gestion, et revient chaque année. Le coût réel pour le gîte : une chambre surclassée et une bouteille de mousseux. Le retour : un client fidèle et une publicité authentique inestimable. La leçon parfaite du paradoxe du rétablissement : une plainte magnifiquement gérée fidélise plus qu'un séjour sans accroc, et ce sont l'écoute et les petits gestes personnalisés, pas le budget, qui créent des souvenirs.",
      ],
    },
    exercise: {
      title: "Concevoir un service anticipatif et gérer une plainte",
      prompt: [
        "Pour un type d'établissement touristique de votre choix, décrivez trois exemples concrets de service anticipatif (deviner un besoin avant qu'il soit exprimé), en précisant l'indice observable qui déclenche chaque attention et son coût réel (souvent minime).",
        "Rédigez le déroulé complet de la gestion d'une plainte client réaliste, en appliquant les quatre étapes : écouter, s'excuser sincèrement, proposer une solution concrète, faire un suivi. Rédigez les phrases clés que vous prononceriez à chaque étape.",
        "Expliquez enfin, avec vos mots, le « paradoxe du rétablissement de service » et pourquoi de petits détails personnalisés marquent plus durablement que le luxe matériel.",
      ],
      deliverables: [
        "Trois exemples de service anticipatif avec l'indice déclencheur et le coût réel de chacun",
        "Le déroulé d'une gestion de plainte en quatre étapes, avec phrases clés",
        "Une explication du paradoxe du rétablissement de service",
        "Une justification de la primauté des détails personnalisés sur le luxe matériel",
      ],
    },
    keyTakeaways: [
      "Anticiper les besoins, plutôt que réagir, crée l'effet « wow » qui fidélise",
      "Une plainte bien gérée peut renforcer la fidélité plus qu'un séjour sans incident",
      "Le client mécontent ne veut pas gagner un débat : il veut être entendu et réglé",
      "Les détails personnalisés créent des souvenirs plus durables que le luxe matériel seul",
      "L'attention authentique est l'investissement le plus rentable, à la portée de tous les budgets",
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
      "Calculer et interpréter le coût de nourriture (food cost)",
      "Analyser la rentabilité réelle des plats d'un menu",
      "Connaître et respecter les normes sanitaires du MAPAQ",
    ],
    content: [
      "Les opérations de restauration combinent la gestion des achats et stocks, la planification des menus, la gestion du personnel de cuisine et de salle, et le contrôle des coûts. Le coût de nourriture (food cost) idéal se situe généralement entre 28% et 35% du prix de vente selon le type d'établissement.",
      "La restauration est réputée pour ses marges minces et son taux d'échec élevé, et la raison tient souvent à un contrôle insuffisant des coûts. Contrairement à d'autres commerces, un restaurant vend un produit périssable : ce qui n'est pas vendu se gâte et devient une perte sèche. Le food cost — la part du prix de vente que représente le coût des ingrédients — est l'indicateur vital. Un plat vendu 20 $ dont les ingrédients coûtent 6 $ affiche un food cost de 30 %, dans la fourchette saine. Le laisser déraper (portions non standardisées, gaspillage, vol, prix des fournisseurs non surveillés) suffit à faire basculer un restaurant de la rentabilité au déficit, sans que le propriétaire comprenne pourquoi.",
      "Le calcul de marge sur chaque plat doit tenir compte non seulement du coût des ingrédients, mais aussi du gaspillage, des pertes et des coûts de main-d'œuvre associés à la préparation. Une analyse régulière du menu identifie les plats les plus et moins rentables.",
      "L'analyse de la rentabilité par plat réserve presque toujours des surprises et déjoue l'intuition. Le plat le plus vendu n'est pas forcément le plus rentable : un burger vedette à fort food cost peut rapporter moins, à l'unité, qu'une salade discrète à faibles coûts d'ingrédients. L'ingénierie de menu croise deux données — la popularité et la marge — pour classer chaque plat : les « stars » (populaires et rentables) à mettre en avant, les « gouffres » (peu populaires et peu rentables) à retirer, et les plats populaires mais peu rentables à repenser. Un menu n'est pas qu'une liste de plats : c'est un outil de rentabilité qu'on conçoit et ajuste avec des chiffres, pas seulement avec le goût du chef.",
      "Le Québec impose des normes sanitaires strictes via le ministère de l'Agriculture, des Pêcheries et de l'Alimentation (MAPAQ) : permis d'exploitation obligatoire, formation en hygiène et salubrité alimentaire pour le personnel, et inspections régulières.",
      "La conformité MAPAQ n'est pas une contrainte parmi d'autres : c'est une question de survie de l'entreprise et de sécurité publique. Un manquement grave à l'hygiène peut entraîner une intoxication alimentaire — un drame humain et un désastre médiatique dont un restaurant se remet rarement. Au-delà du permis d'exploitation obligatoire et de la formation en hygiène et salubrité exigée du personnel, les inspections peuvent survenir sans préavis, et les infractions mènent à des amendes, voire à une fermeture. La bonne nouvelle : les règles (chaîne du froid, dates, hygiène des surfaces, traçabilité) sont claires et documentées. Les respecter rigoureusement au quotidien protège les clients, la réputation et l'existence même de l'établissement.",
    ],
    caseStudy: {
      title: "Le burger vedette qui coulait Le Comptoir",
      body: [
        "Le Comptoir, un bistro sympathique, ne comprenait pas pourquoi il peinait à être rentable malgré une salle toujours bien remplie et un plat vedette adoré : son fameux burger gourmet, de loin le plus commandé. Le propriétaire, Théo, était convaincu que ce best-seller était le moteur de son succès.",
        "Une analyse de menu révèle l'inverse. Le burger, avec ses ingrédients haut de gamme et ses grosses portions non standardisées, affichait un food cost de près de 45 % — bien au-delà de la fourchette saine. Chaque burger vendu ne rapportait presque rien, une fois le gaspillage et la main-d'œuvre inclus. Pendant ce temps, des plats moins commandés mais à faible coût d'ingrédients étaient, eux, très rentables. Le « moteur » était en réalité un gouffre financier que le volume ne faisait qu'amplifier.",
        "Théo agit avec méthode : il standardise les portions, renégocie certains fournisseurs, ajuste légèrement le prix du burger et met davantage en avant, sur le menu, ses plats à forte marge (les « stars »). Sans rien perdre de sa clientèle, sa rentabilité redresse enfin la barre. La leçon : le plat le plus populaire n'est pas forcément le plus rentable, et un contrôle rigoureux du food cost, doublé d'une véritable ingénierie de menu, sépare souvent le restaurant qui survit de celui qui coule.",
      ],
    },
    exercise: {
      title: "Calculer un food cost et faire l'ingénierie d'un menu",
      prompt: [
        "Pour trois plats de votre invention, indiquez le prix de vente et le coût estimé des ingrédients, puis calculez le food cost (%) de chacun. Identifiez lesquels se situent dans la fourchette saine (28-35 %) et lesquels dérapent.",
        "Classez ces trois plats selon deux axes — popularité (supposée) et rentabilité — et déterminez, pour chacun, l'action recommandée : mettre en avant, repenser, ou retirer. Justifiez.",
        "Dressez enfin une courte liste de règles d'hygiène MAPAQ essentielles au quotidien (chaîne du froid, dates, hygiène des surfaces…) et expliquez pourquoi la conformité sanitaire est une question de survie pour l'établissement.",
      ],
      deliverables: [
        "Le calcul du food cost de trois plats, avec identification des dérapages",
        "Un classement popularité/rentabilité des plats et l'action recommandée pour chacun",
        "Une liste de règles d'hygiène MAPAQ essentielles au quotidien",
        "Une explication de pourquoi le plat le plus populaire n'est pas forcément le plus rentable",
      ],
    },
    keyTakeaways: [
      "Le contrôle du food cost est central à la rentabilité d'un restaurant aux marges minces",
      "Un produit périssable non vendu devient une perte sèche : le gaspillage tue la marge",
      "Le plat le plus populaire n'est pas forcément le plus rentable — l'ingénierie de menu le révèle",
      "Un menu est un outil de rentabilité conçu avec des chiffres, pas seulement avec le goût",
      "La conformité MAPAQ est une obligation légale et une question de survie de l'entreprise",
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
      "Planifier un événement de bout en bout selon un échéancier",
      "Gérer le budget avec une marge de contingence adéquate",
      "Coordonner de multiples fournisseurs par une communication centralisée",
      "Préparer un plan de contingence pour les imprévus",
    ],
    content: [
      "La planification d'événement suit un échéancier rigoureux : définition des objectifs, sélection du lieu, réservation des fournisseurs (traiteur, audiovisuel, décoration), promotion et inscription, puis exécution le jour même avec un plan de contingence pour les imprévus.",
      "La règle d'or de l'organisation d'événements tient en une image : le jour J, tout doit déjà être prévu, car il n'y a pas de seconde prise. Un événement est éphémère et public — contrairement à un produit qu'on peut corriger après coup, un mariage raté ou une conférence chaotique le sont définitivement, devant tous les participants. C'est pourquoi l'essentiel du travail se fait en amont : rétroplanning à partir de la date, chaque tâche assignée avec une échéance, chaque détail verrouillé avant le jour même. L'organisateur expérimenté ne se distingue pas par son calme le jour J, mais par la rigueur de sa préparation qui rend ce calme possible.",
      "La gestion budgétaire d'un événement doit inclure une marge de contingence de 10 à 15% pour les dépenses imprévues, et prioriser les postes de dépense selon leur impact direct sur l'expérience des participants.",
      "Cette marge de contingence n'est pas du gaspillage ni un manque de confiance : c'est du réalisme professionnel. Dans un événement, l'imprévu n'est pas une possibilité mais une certitude — un fournisseur qui se désiste, une commande sous-estimée, une exigence de dernière minute. Un budget tendu au dollar près, sans coussin, se transforme au premier accroc en crise ou en dépassement. Par ailleurs, tous les postes de dépense ne se valent pas : il faut investir là où les participants le ressentent (nourriture, confort, expérience) plutôt que dans des détails qu'ils ne remarqueront jamais. Prioriser selon l'impact vécu, et garder une réserve pour l'inattendu, sont les deux réflexes budgétaires du bon organisateur.",
      "La coordination de multiples fournisseurs (traiteur, technique, sécurité, transport) exige une communication centralisée, généralement via un document de logistique partagé précisant les horaires, responsabilités et points de contact de chaque intervenant.",
      "La plupart des désastres d'événements ne viennent pas d'un fournisseur incompétent, mais d'un défaut de coordination entre des fournisseurs pourtant compétents. Le traiteur croit servir à 19 h, la technique a prévu le discours à 19 h aussi, personne ne s'est parlé : c'est le chaos. Un document de logistique partagé — un déroulé minuté indiquant qui fait quoi, quand, et qui appeler en cas de problème — est l'outil qui prévient l'immense majorité de ces ratés. Chaque intervenant sait exactement son rôle et son timing, et une seule personne détient la vue d'ensemble. Dans l'événementiel, la communication n'est pas un supplément d'organisation : c'est l'organisation elle-même.",
    ],
    caseStudy: {
      title: "Le gala où le traiteur et le discours se sont télescopés",
      body: [
        "Une organisatrice débutante, Léa, prépare un gala de reconnaissance pour une entreprise. Elle a soigneusement choisi chaque fournisseur — un excellent traiteur, une équipe technique réputée, une salle magnifique — et travaillé son budget au dollar près, sans marge, pour respecter l'enveloppe. Confiante, elle aborde le jour J persuadée que tout ira bien puisque chaque prestataire est de qualité.",
        "Le soir venu, deux problèmes surgissent. D'abord, le traiteur commence le service du plat principal au moment précis où le PDG monte sur scène pour son discours : personne n'avait synchronisé les deux, et le cliquetis des couverts couvre l'allocution. Ensuite, un panneau décoratif se brise à l'installation ; il faudrait 200 $ pour le remplacer en urgence, mais le budget sans contingence ne le permet pas. De bons fournisseurs, mais aucune coordination et aucun coussin : le gala vacille.",
        "Léa en tire deux leçons durables. Elle adopte désormais un document de logistique partagé — un déroulé minuté que tous les fournisseurs reçoivent et valident — qui aurait évité le télescopage traiteur/discours d'un simple coup d'œil. Et elle intègre systématiquement une marge de contingence de 10 à 15 % pour absorber les accrocs inévitables. La leçon : la qualité individuelle des prestataires ne suffit pas ; c'est la coordination centralisée et la préparation aux imprévus qui font la réussite d'un événement.",
      ],
    },
    exercise: {
      title: "Planifier la logistique et le budget d'un événement",
      prompt: [
        "Choisissez un type d'événement (gala, conférence, festival local…) et établissez un rétroplanning simplifié : listez les grandes étapes de la définition des objectifs jusqu'au jour J, avec une échéance indicative pour chacune.",
        "Ébauchez un budget avec au moins quatre postes de dépense, en incluant explicitement une marge de contingence de 10 à 15 %. Indiquez quels postes vous prioriseriez car ils touchent directement l'expérience des participants.",
        "Créez enfin un extrait de document de logistique du jour J : un déroulé minuté d'au moins cinq moments clés indiquant, pour chacun, l'heure, le fournisseur responsable et le point de contact — de façon à éviter tout télescopage entre intervenants.",
      ],
      deliverables: [
        "Un rétroplanning des grandes étapes avec échéances",
        "Un budget à quatre postes minimum incluant une marge de contingence de 10-15 %",
        "L'identification des postes prioritaires selon l'impact sur l'expérience",
        "Un extrait de document de logistique minuté (heure, responsable, contact) sur cinq moments clés",
      ],
    },
    keyTakeaways: [
      "Un événement n'a pas de seconde prise : l'essentiel du travail se fait en amont",
      "Une marge de contingence de 10-15 % absorbe l'imprévu, qui est une certitude, pas une possibilité",
      "Prioriser les dépenses selon leur impact vécu par les participants",
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
      "Promouvoir un établissement touristique par un contenu visuel de qualité",
      "Utiliser et gérer les avis clients comme levier marketing",
      "Optimiser sa présence locale (Google My Business)",
      "Sélectionner des partenariats influenceurs pertinents",
    ],
    content: [
      "Le marketing touristique digital s'appuie fortement sur le contenu visuel : photos et vidéos de qualité professionnelle sur les réseaux sociaux, présence optimisée sur Google My Business, et inscription sur les plateformes de réservation et de comparaison touristique.",
      "Cette primauté du visuel s'explique par la nature même du tourisme : on n'achète pas un produit qu'on peut toucher, mais une promesse d'expérience et de rêve. Le voyageur choisit largement avec ses yeux, en se projetant dans les images. Des photos ternes, sombres ou datées d'un établissement pourtant magnifique le condamnent à l'invisibilité, tandis qu'un concurrent médiocre mais bien photographié attire. Investir dans des photos professionnelles n'est donc pas une coquetterie mais l'un des meilleurs retours sur investissement en tourisme — c'est souvent la première et parfois la seule impression sur laquelle se joue la décision de réserver.",
      "Les avis clients sur des plateformes comme TripAdvisor ou Google sont devenus l'un des facteurs de décision les plus influents pour les voyageurs. Répondre systématiquement aux avis, positifs comme négatifs, démontre un engagement actif envers la qualité du service.",
      "Les avis en ligne ont opéré un renversement de pouvoir : ce n'est plus l'établissement qui contrôle son image par sa publicité, mais la voix cumulée de ses clients. Un voyageur fait aujourd'hui davantage confiance à des dizaines d'inconnus qu'à la plus belle brochure. D'où l'importance capitale de la gestion des avis. Répondre à un avis positif entretient la relation ; répondre à un avis négatif, publiquement, avec calme et une volonté de régler, est encore plus stratégique — car ce sont les futurs clients qui lisent l'échange. Une réponse posée à une critique transforme un point faible affiché en démonstration de professionnalisme. Ignorer ou, pire, s'emporter contre un avis négatif fait fuir plus de clients que la critique elle-même.",
      "Les partenariats avec des influenceurs et créateurs de contenu touristique permettent d'atteindre de nouvelles audiences de manière authentique, à condition de bien sélectionner des collaborateurs dont l'audience correspond réellement à la clientèle cible.",
      "L'erreur classique est de courir après les gros chiffres : un influenceur à un million d'abonnés semble irrésistible. Mais si son audience est dispersée et sans lien avec votre clientèle cible, l'investissement est perdu. Un créateur de contenu plus modeste, spécialisé dans le tourisme régional ou une niche précise (plein air, gastronomie, voyage en famille), dont les abonnés correspondent réellement à vos clients potentiels, apporte souvent bien plus de réservations concrètes. L'authenticité prime aussi : une audience détecte immédiatement une collaboration forcée et purement publicitaire. Le bon partenariat repose sur une adéquation réelle entre le lieu, le créateur et son public — la pertinence bat toujours la taille brute.",
    ],
    caseStudy: {
      title: "Le chalet invisible et l'influenceuse mal choisie",
      body: [
        "Les Chalets du Ruisseau, un hébergement en pleine nature, généraient peu de réservations en ligne malgré un cadre superbe. Deux problèmes se cumulaient. D'abord, les photos du site, prises au téléphone un jour gris, ne rendaient rien de la beauté des lieux : en ligne, le chalet paraissait quelconque. Ensuite, pour se faire connaître, la propriétaire avait payé cher une influenceuse mode urbaine à énorme audience — dont les abonnés, citadins amateurs de sorties branchées, ne cherchaient absolument pas un chalet isolé en forêt.",
        "Le retour de cette campagne fut quasi nul : beaucoup de « j'aime », aucune réservation. En parallèle, un avis négatif isolé restait sans réponse depuis des mois, laissant croire à un établissement indifférent. La propriétaire réalise que sa stratégie visait le prestige et le volume, pas la pertinence.",
        "Elle change tout : investissement dans un reportage photo professionnel qui capte enfin la magie du site, réponse posée et attentionnée à chaque avis (dont le négatif, transformé en démonstration de sérieux), et partenariat avec une créatrice de contenu spécialisée en plein air et voyage nature, dont l'audience correspond exactement à sa clientèle. Les réservations décollent. La leçon : en marketing touristique, des visuels de qualité, une gestion active des avis et un partenariat pertinent — pas le plus gros — valent mieux qu'un budget dispersé sur du prestige inadapté.",
      ],
    },
    exercise: {
      title: "Bâtir une stratégie de marketing touristique digital",
      prompt: [
        "Pour un établissement touristique de votre choix, dressez un plan de contenu visuel : quels types de photos/vidéos produire en priorité et pourquoi le visuel est déterminant dans la décision de réserver en tourisme.",
        "Rédigez deux réponses modèles à des avis clients : une réponse à un avis positif, et une réponse posée et constructive à un avis négatif réaliste, en gardant à l'esprit que ce sont les futurs clients qui les liront.",
        "Décrivez enfin le profil d'un partenaire influenceur idéal pour cet établissement (thématique, type d'audience) et expliquez pourquoi la pertinence de l'audience prime sur la taille brute du nombre d'abonnés.",
      ],
      deliverables: [
        "Un plan de contenu visuel prioritaire, avec justification de l'importance du visuel",
        "Une réponse modèle à un avis positif et une à un avis négatif (orientées futurs lecteurs)",
        "Le profil d'un partenaire influenceur pertinent, avec justification pertinence vs taille",
        "Une phrase expliquant le renversement de pouvoir opéré par les avis en ligne",
      ],
    },
    keyTakeaways: [
      "En tourisme on vend une expérience : le visuel de qualité est déterminant, pas décoratif",
      "Les avis en ligne influencent désormais plus de décisions de voyage que la publicité traditionnelle",
      "Répondre calmement à un avis négatif convainc les futurs clients qui lisent l'échange",
      "L'authenticité et la pertinence de l'audience priment sur la taille brute d'un influenceur",
      "Un partenariat de niche bien ciblé rapporte souvent plus qu'une grosse audience dispersée",
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
      "Comprendre la classification hôtelière et son rôle marketing",
      "Identifier les obligations d'assurance et de responsabilité civile",
      "Relier le niveau de risque d'une activité à sa couverture nécessaire",
    ],
    content: [
      "Les établissements touristiques au Québec doivent souvent détenir plusieurs permis selon leur activité : permis d'établissement d'hébergement touristique, permis d'exploitation de restaurant (MAPAQ), et licences spécifiques pour la vente d'alcool ou l'organisation d'activités d'aventure.",
      "La difficulté, pour un nouvel entrepreneur, est que ces permis se cumulent et se croisent : une auberge qui sert des repas et de l'alcool, et propose des sorties en kayak, relève simultanément de plusieurs réglementations et organismes. Ignorer un seul permis requis peut suffire à faire fermer toute l'activité, même si le reste est irréprochable. La démarche prudente consiste à cartographier, avant l'ouverture, l'ensemble des activités prévues et à identifier, pour chacune, les permis et licences correspondants. Mieux vaut consacrer du temps à cette conformité en amont que de découvrir, après investissement, qu'une activité clé est illégale faute d'une autorisation.",
      "La classification hôtelière par étoiles au Québec est gérée par la Corporation de l'industrie touristique du Québec (CITQ), évaluant les établissements selon des critères standardisés de confort, services et installations.",
      "Cette classification est bien plus qu'un décor : c'est un langage de promesse envers le client, et un outil de positionnement à double tranchant. Les étoiles fixent des attentes — un 4 étoiles promet un niveau de confort et de services que le client jugera. Viser haut peut attirer une clientèle plus exigeante et justifier des prix supérieurs, mais crée aussi une obligation de tenir la promesse : un établissement qui affiche plus d'étoiles qu'il n'en mérite génère des déceptions et des avis négatifs dévastateurs. À l'inverse, une classification honnête, même modeste, bien tenue, fidélise. La classification doit donc refléter la réalité et guider cohéremment le positionnement, les prix et le marketing.",
      "La responsabilité civile est particulièrement critique dans le secteur touristique, surtout pour les activités d'aventure ou impliquant des risques physiques : une couverture d'assurance adéquate et des protocoles de sécurité documentés sont essentiels pour protéger l'entreprise et les clients.",
      "Le principe est simple : plus l'activité comporte de risque physique, plus la couverture et la rigueur doivent être élevées. Un gîte tranquille et une entreprise de descente en eaux vives ou d'escalade n'ont pas les mêmes obligations, parce qu'ils n'exposent pas leurs clients aux mêmes dangers. Pour les activités d'aventure, une assurance responsabilité civile adaptée n'est qu'une partie de la protection : il faut aussi des protocoles de sécurité documentés, du personnel formé, de l'équipement vérifié, et souvent des décharges de responsabilité signées. Un accident grave sans couverture ni protocole peut anéantir l'entreprise et ruiner son propriétaire personnellement. Sous-assurer pour économiser sur les primes est un pari qui, le jour où il est perdu, coûte tout.",
    ],
    caseStudy: {
      title: "La sortie en kayak qui a failli tout emporter chez Aventure Rivière",
      body: [
        "Aventure Rivière, une petite entreprise proposant des sorties guidées en kayak, se développe vite. Pour maximiser sa marge, le propriétaire a choisi une assurance responsabilité civile minimale — celle d'un commerce ordinaire — sans souscrire de couverture spécifique aux activités à risque, et sans formaliser de protocoles de sécurité écrits ni de décharges signées par les clients. « Il n'est jamais rien arrivé », se rassurait-il.",
        "Un jour, un participant se blesse sérieusement lors d'une sortie, dans des conditions où l'encadrement et l'équipement auraient pu être mis en cause. L'entreprise se retrouve exposée à une réclamation dépassant très largement sa couverture dérisoire. Sans protocoles documentés ni décharges, elle peut difficilement démontrer qu'elle a agi avec la diligence attendue pour une activité à risque. Ce qui semblait une économie de primes menace désormais l'existence même de l'entreprise et le patrimoine personnel du propriétaire.",
        "L'entreprise survit de justesse et tire une leçon coûteuse : elle souscrit une assurance adaptée au niveau réel de risque, met en place des protocoles de sécurité écrits, forme ses guides et fait signer des décharges. La leçon : dans le tourisme d'aventure, la couverture et la rigueur doivent être proportionnelles au risque physique réel ; sous-assurer une activité dangereuse pour économiser est un pari qui peut tout emporter le jour d'un accident.",
      ],
    },
    exercise: {
      title: "Cartographier la conformité d'une entreprise touristique",
      prompt: [
        "Imaginez une entreprise touristique combinant plusieurs activités (par exemple hébergement + restaurant + vente d'alcool + une activité d'aventure). Dressez la liste des permis et licences requis pour chacune, en indiquant l'organisme concerné, et expliquez le risque d'en négliger un seul.",
        "Pour un établissement d'hébergement, expliquez comment la classification par étoiles devrait guider de façon cohérente son positionnement, ses prix et son marketing — et le danger d'afficher plus d'étoiles qu'il n'en tient réellement.",
        "Comparez enfin les besoins d'assurance et de sécurité de deux activités de niveaux de risque différents (par exemple un gîte paisible vs une entreprise d'escalade), en justifiant pourquoi la couverture doit être proportionnelle au risque.",
      ],
      deliverables: [
        "Une cartographie des permis/licences par activité, avec l'organisme concerné",
        "Une explication du rôle de la classification par étoiles dans le positionnement cohérent",
        "Une comparaison des besoins d'assurance/sécurité selon le niveau de risque de deux activités",
        "Une justification du principe : la couverture proportionnelle au risque réel",
      ],
    },
    keyTakeaways: [
      "Les permis se cumulent : négliger une seule autorisation peut faire fermer toute l'activité",
      "Opérer sans les permis requis expose à des sanctions sévères et une fermeture potentielle",
      "La classification par étoiles est une promesse : elle doit refléter la réalité et guider le positionnement",
      "La couverture d'assurance et la rigueur doivent être proportionnelles au risque physique réel",
      "Sous-assurer une activité à risque pour économiser est un pari qui peut tout emporter",
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
      "Appliquer l'ensemble des compétences dans un contexte professionnel réel",
      "Démontrer la maîtrise opérationnelle et la gestion des imprévus",
      "Transformer la théorie en réflexe professionnel",
      "Obtenir le certificat ARCADINS en tourisme et gestion hôtelière",
    ],
    content: [
      "Le stage pratique permet de mettre en application l'ensemble des compétences développées durant la formation, dans un contexte réel d'hébergement, de restauration ou d'organisation d'événements, sous la supervision d'un professionnel du secteur.",
      "C'est le moment où tout se rejoint : la saisonnalité et l'accueil (modules 1 et 3), la gestion hôtelière et la restauration (modules 2 et 4), l'événementiel, le marketing et la réglementation (modules 5 à 7). Mais le stage enseigne surtout une chose que la salle de classe ne peut pas : le tourisme se vit en temps réel, au contact de vrais clients, sans pause ni reprise. Un savoir théorique parfait ne vaut rien si l'on se fige devant un client mécontent ou un imprévu opérationnel. Le stage transforme la connaissance en réflexe — la capacité d'appliquer le bon principe, vite et sous pression, dans le feu de l'action.",
      "L'évaluation finale porte sur la capacité à gérer des situations concrètes : accueil de clientèle, résolution de plaintes, coordination logistique et respect des normes sanitaires et réglementaires applicables au secteur.",
      "L'accent mis sur la gestion des imprévus n'est pas un hasard : c'est précisément là que se révèle le professionnel du tourisme. Dans ce secteur, l'imprévu est le quotidien — un client difficile, une réservation qui se télescope, un fournisseur défaillant, une plainte inattendue. On n'évalue donc pas seulement si l'étudiant connaît les procédures quand tout va bien, mais s'il garde son calme, applique le bon réflexe et préserve l'expérience du client quand tout déraille. C'est cette capacité à bien réagir sous pression, plus que la récitation théorique, qui distingue celui qui est prêt à travailler dans l'industrie.",
      "À l'issue du stage et de l'évaluation, le certificat ARCADINS en tourisme et gestion hôtelière est délivré, reconnu par le réseau de partenaires employeurs du secteur touristique québécois.",
      "Ce certificat a une valeur concrète sur un marché du travail touristique en demande constante de personnel qualifié et fiable. Pour un employeur, il atteste non seulement de connaissances, mais d'une expérience pratique validée en contexte réel — une assurance précieuse au moment d'embaucher. Reconnu par le réseau de partenaires employeurs, il ouvre des portes, particulièrement pour les nouveaux arrivants qui cherchent une première expérience canadienne reconnue. Mais au-delà du document, le vrai acquis de la formation est la confiance opérationnelle : savoir accueillir, gérer, réagir et servir avec professionnalisme dans un secteur où l'humain et l'expérience sont au cœur de tout.",
    ],
    caseStudy: {
      title: "Le stage de Rosa : la théorie à l'épreuve du réel",
      body: [
        "Rosa, nouvelle arrivante ayant brillamment suivi la formation, aborde son stage en hôtellerie avec d'excellentes connaissances théoriques — food cost, RevPAR, gestion des plaintes, elle connaît tout sur le bout des doigts. Mais dès la première semaine, la réalité la déstabilise : un client furieux d'un surbooking, un autre exigeant en pleine heure de pointe, un fournisseur en retard le jour d'un événement. En classe, elle avait les réponses ; sur le terrain, sous pression, elle se fige d'abord.",
        "Sous la supervision d'une gestionnaire expérimentée, Rosa apprend ce qu'aucun manuel ne transmet : appliquer le bon principe vite et calmement, dans le feu de l'action. Face au client du surbooking, elle mobilise ce qu'elle a appris sur la gestion des plaintes — écouter, s'excuser, reloger, offrir une attention — et voit le client repartir apaisé. Chaque imprévu surmonté ancre un réflexe. La théorie qu'elle possédait déjà devient enfin un savoir-faire opérationnel.",
        "À l'évaluation finale, ce n'est pas sa connaissance des concepts qui impressionne — elle était acquise — mais son sang-froid et sa capacité à bien réagir quand tout déraille. Elle obtient son certificat ARCADINS et, grâce au réseau de partenaires, décroche rapidement un poste. La leçon : le stage transforme la connaissance en réflexe professionnel, et dans le tourisme, c'est la capacité à gérer l'imprévu avec calme, plus que la théorie seule, qui fait le professionnel prêt à l'emploi.",
      ],
    },
    exercise: {
      title: "Se préparer à l'évaluation par la gestion d'imprévus",
      prompt: [
        "Dressez votre bilan de préparation au stage : pour chacune des grandes compétences du programme (accueil, gestion hôtelière/restauration, événementiel, marketing, réglementation), notez une force acquise et un point à consolider en situation réelle.",
        "Choisissez trois imprévus typiques du secteur (par exemple : surbooking, plainte en heure de pointe, fournisseur défaillant) et, pour chacun, rédigez la réaction professionnelle que vous appliqueriez, en mobilisant les principes appris dans les modules précédents.",
        "Rédigez enfin une courte réflexion : pourquoi la capacité à bien réagir sous pression est-elle, dans le tourisme, aussi déterminante que la connaissance théorique ?",
      ],
      deliverables: [
        "Un bilan des compétences (force + point à consolider) par grand domaine du programme",
        "Trois imprévus typiques avec la réaction professionnelle appliquée à chacun",
        "Une réflexion sur l'importance de la gestion des imprévus dans le tourisme",
        "Un plan d'action pour transformer ses connaissances en réflexes durant le stage",
      ],
    },
    keyTakeaways: [
      "Le stage fait converger tous les modules et transforme la théorie en réflexe professionnel",
      "Le stage pratique valide les compétences théoriques par une mise en situation réelle",
      "La gestion de situations imprévues est au cœur de l'évaluation finale",
      "Dans le tourisme, réagir calmement sous pression distingue le professionnel prêt à l'emploi",
      "Le certificat, reconnu par les employeurs partenaires, ouvre des portes aux nouveaux arrivants",
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
