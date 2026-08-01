/**
 * ARCADINS — Instance de présentation : TEF Canada (premier produit de référence).
 * Contenu marketing localisé FR (autorité) / EN / ES. Les tarifs reflètent le baseline
 * provisoire (décision 4) et proviendront du catalogue (offers) une fois branché (S3+).
 */
import type { ProgramPresentation } from "./types.ts";

export const tefPresentation: ProgramPresentation = {
  slug: "tef-canada",
  productTitle: "TEF Canada",
  hero: {
    eyebrow: { fr: "Préparation officielle · 100% en ligne", en: "Official preparation · 100% online", es: "Preparación oficial · 100% en línea" },
    title: { fr: "Réussissez votre", en: "Ace your", es: "Apruebe su" },
    highlight: { fr: "TEF Canada", en: "TEF Canada", es: "TEF Canada" },
    subtitle: {
      fr: "Une préparation structurée, adaptative et suivie pour atteindre votre score NCLC cible pour l'immigration au Canada et au Québec.",
      en: "A structured, adaptive, tracked preparation to reach your target NCLC score for immigration to Canada and Québec.",
      es: "Una preparación estructurada, adaptativa y con seguimiento para alcanzar su puntuación NCLC objetivo para la inmigración a Canadá y Quebec.",
    },
    primaryCta: { label: { fr: "Commencer ma préparation", en: "Start preparing", es: "Empezar mi preparación" }, href: "/auth/register", variant: "primary" },
    secondaryCta: { label: { fr: "Voir les forfaits", en: "See plans", es: "Ver planes" }, href: "#tarifs", variant: "outline" },
    stats: [
      { value: "2 400+", label: { fr: "Étudiants formés", en: "Students trained", es: "Estudiantes formados" } },
      { value: "94%", label: { fr: "Satisfaction", en: "Satisfaction", es: "Satisfacción" } },
      { value: "40+", label: { fr: "Pays", en: "Countries", es: "Países" } },
      { value: "NCLC 7–9", label: { fr: "Objectif visé", en: "Target level", es: "Nivel objetivo" } },
    ],
  },
  about: {
    eyebrow: { fr: "Le programme", en: "The program", es: "El programa" },
    title: { fr: "Qu'est-ce que le TEF Canada ?", en: "What is the TEF Canada?", es: "¿Qué es el TEF Canadá?" },
    body: {
      fr: "Le Test d'Évaluation de Français Canada est organisé par la CCI Paris Île-de-France et reconnu par IRCC pour l'immigration. Nos parcours ciblent précisément les 4 épreuves et convertissent votre niveau en NCLC.",
      en: "The Test d'Évaluation de Français Canada is run by CCI Paris Île-de-France and recognized by IRCC for immigration. Our tracks precisely target the 4 skills and map your level to NCLC.",
      es: "El Test d'Évaluation de Français Canada es organizado por la CCI Paris Île-de-France y reconocido por IRCC para la inmigración. Nuestros itinerarios abordan las 4 pruebas y convierten su nivel a NCLC.",
    },
    points: [
      { icon: "🎯", title: { fr: "Orienté résultat", en: "Result-driven", es: "Orientado a resultados" }, body: { fr: "Chaque module rapproche du score NCLC dont vous avez besoin.", en: "Every module moves you toward the NCLC score you need.", es: "Cada módulo lo acerca a la puntuación NCLC que necesita." } },
      { icon: "🧠", title: { fr: "Adaptatif", en: "Adaptive", es: "Adaptativo" }, body: { fr: "Le parcours s'ajuste à vos compétences les plus faibles.", en: "The path adapts to your weakest competencies.", es: "El itinerario se adapta a sus competencias más débiles." } },
      { icon: "🌍", title: { fr: "Partout, 24/7", en: "Anywhere, 24/7", es: "En todas partes, 24/7" }, body: { fr: "Accessible sur tous vos appareils, où que vous soyez.", en: "Accessible on all your devices, wherever you are.", es: "Accesible en todos sus dispositivos, esté donde esté." } },
      { icon: "🔒", title: { fr: "Transparent", en: "Transparent", es: "Transparente" }, body: { fr: "Nous ne promettons pas de visa — la meilleure préparation, oui.", en: "We don't promise a visa — the best preparation, yes.", es: "No prometemos una visa — la mejor preparación, sí." } },
    ],
  },
  epreuves: {
    eyebrow: { fr: "Structure", en: "Structure", es: "Estructura" },
    title: { fr: "Les 4 épreuves du TEF Canada", en: "The 4 TEF Canada skills", es: "Las 4 pruebas del TEF Canadá" },
    items: [
      { icon: "🎧", name: { fr: "Compréhension orale", en: "Listening", es: "Comprensión oral" }, meta: { fr: "~40 min", en: "~40 min", es: "~40 min" } },
      { icon: "📖", name: { fr: "Compréhension écrite", en: "Reading", es: "Comprensión escrita" }, meta: { fr: "~60 min", en: "~60 min", es: "~60 min" } },
      { icon: "🎤", name: { fr: "Expression orale", en: "Speaking", es: "Expresión oral" }, meta: { fr: "~15 min", en: "~15 min", es: "~15 min" } },
      { icon: "✍️", name: { fr: "Expression écrite", en: "Writing", es: "Expresión escrita" }, meta: { fr: "~60 min", en: "~60 min", es: "~60 min" } },
    ],
  },
  pricing: {
    eyebrow: { fr: "Tarifs", en: "Pricing", es: "Precios" },
    title: { fr: "Choisissez votre forfait", en: "Choose your plan", es: "Elija su plan" },
    subtitle: { fr: "Des niveaux de service et d'accompagnement, pas des contenus différents. Changez à tout moment.", en: "Service and support levels, not different content. Change anytime.", es: "Niveles de servicio y acompañamiento, no contenidos diferentes. Cambie cuando quiera." },
    packages: [
      { slug: "tef-starter", name: "Starter", price: { amountCents: 9700, currency: "USD", billing: "one_time" }, tagline: { fr: "Pour démarrer", en: "To get started", es: "Para empezar" }, highlights: [{ fr: "Accès 6 semaines", en: "6-week access", es: "Acceso 6 semanas" }, { fr: "1 examen blanc", en: "1 mock exam", es: "1 examen simulado" }, { fr: "Support standard", en: "Standard support", es: "Soporte estándar" }], cta: { label: { fr: "Choisir Starter", en: "Choose Starter", es: "Elegir Starter" }, href: "/auth/register" } },
      { slug: "tef-essential", name: "Essential", price: { amountCents: 14700, currency: "USD", billing: "one_time" }, tagline: { fr: "Le plus choisi", en: "Most chosen", es: "El más elegido" }, highlights: [{ fr: "Accès 6 semaines", en: "6-week access", es: "Acceso 6 semanas" }, { fr: "2 examens blancs", en: "2 mock exams", es: "2 exámenes simulados" }, { fr: "Ressources téléchargeables", en: "Downloadable resources", es: "Recursos descargables" }], cta: { label: { fr: "Choisir Essential", en: "Choose Essential", es: "Elegir Essential" }, href: "/auth/register" } },
      { slug: "tef-premium", name: "Premium", badge: { fr: "★ Populaire", en: "★ Popular", es: "★ Popular" }, featured: true, price: { amountCents: 24700, currency: "USD", billing: "one_time" }, tagline: { fr: "Avec coaching", en: "With coaching", es: "Con coaching" }, highlights: [{ fr: "3 examens blancs", en: "3 mock exams", es: "3 exámenes simulados" }, { fr: "2h de coaching", en: "2h coaching", es: "2h de coaching" }, { fr: "Support prioritaire", en: "Priority support", es: "Soporte prioritario" }], cta: { label: { fr: "Choisir Premium", en: "Choose Premium", es: "Elegir Premium" }, href: "/auth/register" } },
      { slug: "tef-vip", name: "VIP", price: { amountCents: 34700, currency: "USD", billing: "one_time" }, tagline: { fr: "Accompagnement maximal", en: "Maximum support", es: "Acompañamiento máximo" }, highlights: [{ fr: "Accès 12 semaines", en: "12-week access", es: "Acceso 12 semanas" }, { fr: "6 examens + 4h coaching", en: "6 mocks + 4h coaching", es: "6 simulacros + 4h coaching" }, { fr: "Assistant IA illimité", en: "Unlimited AI assistant", es: "Asistente IA ilimitado" }], cta: { label: { fr: "Choisir VIP", en: "Choose VIP", es: "Elegir VIP" }, href: "/auth/register" } },
    ],
    comparison: {
      featureLabel: { fr: "Comparer les forfaits", en: "Compare plans", es: "Comparar planes" },
      features: [
        { label: { fr: "Durée d'accès", en: "Access duration", es: "Duración de acceso" }, tiers: { "tef-starter": "6 sem.", "tef-essential": "6 sem.", "tef-premium": "6 sem.", "tef-vip": "12 sem." } },
        { label: { fr: "Examens blancs", en: "Mock exams", es: "Exámenes simulados" }, tiers: { "tef-starter": "1", "tef-essential": "2", "tef-premium": "3", "tef-vip": "6" } },
        { label: { fr: "Coaching", en: "Coaching", es: "Coaching" }, tiers: { "tef-starter": false, "tef-essential": false, "tef-premium": "2h", "tef-vip": "4h" } },
        { label: { fr: "Assistant IA", en: "AI assistant", es: "Asistente IA" }, tiers: { "tef-starter": false, "tef-essential": false, "tef-premium": false, "tef-vip": true } },
        { label: { fr: "Ressources téléchargeables", en: "Downloadable resources", es: "Recursos descargables" }, tiers: { "tef-starter": false, "tef-essential": true, "tef-premium": true, "tef-vip": true } },
        { label: { fr: "Support", en: "Support", es: "Soporte" }, tiers: { "tef-starter": "Standard", "tef-essential": "Standard", "tef-premium": "Prioritaire", "tef-vip": "VIP" } },
      ],
    },
  },
  testimonials: {
    eyebrow: { fr: "Témoignages", en: "Testimonials", es: "Testimonios" },
    title: { fr: "Ils ont atteint leur objectif", en: "They reached their goal", es: "Alcanzaron su objetivo" },
    items: [
      { quote: { fr: "Structure claire et coaching précieux. J'ai atteint NCLC 8.", en: "Clear structure and priceless coaching. I reached NCLC 8.", es: "Estructura clara y coaching valioso. Alcancé NCLC 8." }, name: "James S.", role: { fr: "Candidat Express Entry", en: "Express Entry candidate", es: "Candidato Express Entry" }, score: "NCLC 8" },
      { quote: { fr: "Les examens blancs m'ont mise en confiance le jour J.", en: "The mock exams gave me confidence on test day.", es: "Los exámenes simulados me dieron confianza el día del examen." }, name: "Jenny H.", role: { fr: "Immigration Québec", en: "Québec immigration", es: "Inmigración Quebec" }, score: "NCLC 9" },
      { quote: { fr: "Accessible depuis mon téléphone, à mon rythme. Parfait.", en: "Accessible from my phone, at my pace. Perfect.", es: "Accesible desde mi teléfono, a mi ritmo. Perfecto." }, name: "Edvard L.", role: { fr: "Travailleur qualifié", en: "Skilled worker", es: "Trabajador cualificado" }, score: "NCLC 9" },
    ],
  },
  faq: {
    eyebrow: { fr: "Aide", en: "Help", es: "Ayuda" },
    title: { fr: "Questions fréquentes", en: "Frequently asked questions", es: "Preguntas frecuentes" },
    items: [
      { q: { fr: "Combien de temps pour me préparer ?", en: "How long to prepare?", es: "¿Cuánto tiempo para prepararme?" }, a: { fr: "En général 4 à 12 semaines selon votre niveau de départ. Un test de niveau initial personnalise votre parcours.", en: "Usually 4–12 weeks depending on your starting level. An initial placement test personalizes your path.", es: "Generalmente de 4 a 12 semanas según su nivel inicial. Una prueba de nivel personaliza su itinerario." } },
      { q: { fr: "Le programme est-il 100% en ligne ?", en: "Is the program 100% online?", es: "¿El programa es 100% en línea?" }, a: { fr: "Oui, accessible 24/7 sur ordinateur, tablette et téléphone. Le coaching se fait en visioconférence.", en: "Yes, accessible 24/7 on computer, tablet and phone. Coaching is by video call.", es: "Sí, accesible 24/7 en ordenador, tableta y teléfono. El coaching es por videollamada." } },
      { q: { fr: "Garantissez-vous l'obtention d'un visa ?", en: "Do you guarantee a visa?", es: "¿Garantizan la obtención de una visa?" }, a: { fr: "Non. ARCADINS est une plateforme privée de préparation linguistique, non affiliée à IRCC, au MIFI ou aux organismes TEF/TCF. Les décisions d'immigration relèvent des autorités compétentes.", en: "No. ARCADINS is a private language-preparation platform, not affiliated with IRCC, MIFI or TEF/TCF organizations. Immigration decisions rest with the competent authorities.", es: "No. ARCADINS es una plataforma privada de preparación lingüística, no afiliada a IRCC, MIFI ni a los organismos TEF/TCF. Las decisiones de inmigración corresponden a las autoridades competentes." } },
    ],
  },
  finalCta: {
    title: { fr: "Prêt à réussir votre TEF Canada ?", en: "Ready to ace your TEF Canada?", es: "¿Listo para aprobar su TEF Canadá?" },
    subtitle: { fr: "Commencez par un test de niveau gratuit et découvrez votre NCLC actuel.", en: "Start with a free placement test and discover your current NCLC.", es: "Comience con una prueba de nivel gratuita y descubra su NCLC actual." },
    primaryCta: { label: { fr: "S'inscrire gratuitement", en: "Sign up free", es: "Registrarse gratis" }, href: "/auth/register", variant: "primary" },
    secondaryCta: { label: { fr: "Voir les forfaits", en: "See plans", es: "Ver planes" }, href: "#tarifs", variant: "outline" },
  },
  seo: {
    title: { fr: "TEF Canada — Préparation en ligne | ARCADINS", en: "TEF Canada — Online preparation | ARCADINS", es: "TEF Canadá — Preparación en línea | ARCADINS" },
    description: {
      fr: "Préparez le TEF Canada en ligne avec ARCADINS : parcours adaptatif, examens blancs, coaching et suivi NCLC pour l'immigration au Canada et au Québec.",
      en: "Prepare for the TEF Canada online with ARCADINS: adaptive path, mock exams, coaching and NCLC tracking for immigration to Canada and Québec.",
      es: "Prepare el TEF Canadá en línea con ARCADINS: itinerario adaptativo, exámenes simulados, coaching y seguimiento NCLC para la inmigración a Canadá y Quebec.",
    },
  },
};

/** Registre des présentations par slug (générique : ajouter TCF/IELTS/… ici). */
export const PROGRAM_PRESENTATIONS: Record<string, ProgramPresentation> = {
  "tef-canada": tefPresentation,
};
