import type { Lang } from "@/lib/i18n";

/**
 * Contenu (source unique) de la Welcome Experience — 7 langues, cohérent avec le
 * système i18n existant (`Lang` + helper `t`). Aucune chaîne codée en dur dans le
 * composant : tout passe par ce dictionnaire pour rester traduisible et testable.
 */
type L = Record<Lang, string>;

export const WELCOME: Record<string, L> = {
  greeting: { fr: "Bienvenue chez", en: "Welcome to", es: "Bienvenido a", it: "Benvenuto in", pt: "Bem-vindo ao", de: "Willkommen bei", ht: "Byenveni nan" },
  subtitle: {
    fr: "Apprenez le français avec confiance. Préparez votre réussite. Choisissez par où commencer.",
    en: "Learn French with confidence. Prepare for success. Choose how you'd like to begin.",
    es: "Aprende francés con confianza. Prepárate para el éxito. Elige por dónde empezar.",
    it: "Impara il francese con fiducia. Preparati al successo. Scegli da dove iniziare.",
    pt: "Aprenda francês com confiança. Prepare-se para o sucesso. Escolha por onde começar.",
    de: "Lernen Sie Französisch mit Zuversicht. Bereiten Sie sich auf Ihren Erfolg vor. Wählen Sie, wie Sie beginnen möchten.",
    ht: "Aprann fransè ak konfyans. Prepare pou reyisit ou. Chwazi kote pou ou kòmanse.",
  },
  recommended: { fr: "Recommandé", en: "Recommended", es: "Recomendado", it: "Consigliato", pt: "Recomendado", de: "Empfohlen", ht: "Rekòmande" },

  // Carte 1 — Test de niveau
  placementTitle: { fr: "Faire mon test de niveau gratuit", en: "Take my free placement test", es: "Hacer mi test de nivel gratuito", it: "Fai il mio test di livello gratuito", pt: "Fazer o meu teste de nível gratuito", de: "Meinen kostenlosen Einstufungstest machen", ht: "Fè tès nivo gratis mwen an" },
  placementDesc: { fr: "Recommandé pour les nouveaux étudiants. Évaluez votre niveau de français actuel.", en: "Recommended for new students. Determine your current French level.", es: "Recomendado para nuevos estudiantes. Evalúa tu nivel actual de francés.", it: "Consigliato per i nuovi studenti. Valuta il tuo attuale livello di francese.", pt: "Recomendado para novos alunos. Avalie o seu nível atual de francês.", de: "Empfohlen für neue Studierende. Bestimmen Sie Ihr aktuelles Französischniveau.", ht: "Rekòmande pou nouvo etidyan. Evalye nivo fransè ou kounye a." },
  placementCta: { fr: "Commencer le test", en: "Start my test", es: "Comenzar mi test", it: "Inizia il test", pt: "Começar o teste", de: "Test starten", ht: "Kòmanse tès la" },

  // Carte 2 — TEF
  tefTitle: { fr: "Préparer le TEF Canada", en: "Prepare for TEF Canada", es: "Preparar el TEF Canadá", it: "Prepararsi al TEF Canada", pt: "Preparar o TEF Canadá", de: "Auf TEF Canada vorbereiten", ht: "Prepare pou TEF Canada" },
  tefCta: { fr: "Découvrir le TEF", en: "Discover TEF", es: "Descubrir el TEF", it: "Scopri il TEF", pt: "Descobrir o TEF", de: "TEF entdecken", ht: "Dekouvri TEF" },

  // Carte 3 — TCF
  tcfTitle: { fr: "Préparer le TCF Canada", en: "Prepare for TCF Canada", es: "Preparar el TCF Canadá", it: "Prepararsi al TCF Canada", pt: "Preparar o TCF Canadá", de: "Auf TCF Canada vorbereiten", ht: "Prepare pou TCF Canada" },
  tcfCta: { fr: "Découvrir le TCF", en: "Discover TCF", es: "Descubrir el TCF", it: "Scopri il TCF", pt: "Descobrir o TCF", de: "TCF entdecken", ht: "Dekouvri TCF" },

  // Carte 4 — Formations
  programsTitle: { fr: "Parcourir toutes les formations", en: "Browse all training programs", es: "Explorar todas las formaciones", it: "Sfoglia tutti i programmi", pt: "Explorar todas as formações", de: "Alle Programme durchsuchen", ht: "Gade tout fòmasyon yo" },
  programsCta: { fr: "Voir les formations", en: "View programs", es: "Ver formaciones", it: "Vedi i programmi", pt: "Ver formações", de: "Programme ansehen", ht: "Wè fòmasyon yo" },

  // Carte 5a — Créer un compte
  registerTitle: { fr: "Créer mon compte étudiant", en: "Create my student account", es: "Crear mi cuenta de estudiante", it: "Crea il mio account studente", pt: "Criar a minha conta de aluno", de: "Mein Studentenkonto erstellen", ht: "Kreye kont etidyan mwen an" },
  registerCta: { fr: "Créer un compte", en: "Register", es: "Registrarme", it: "Registrati", pt: "Registar", de: "Registrieren", ht: "Enskri" },

  // Carte 5b — Continuer (connecté)
  continueTitle: { fr: "Continuer mon apprentissage", en: "Continue learning", es: "Continuar aprendiendo", it: "Continua a imparare", pt: "Continuar a aprender", de: "Weiterlernen", ht: "Kontinye aprann" },
  continueCta: { fr: "Reprendre", en: "Resume", es: "Reanudar", it: "Riprendi", pt: "Retomar", de: "Fortsetzen", ht: "Rekòmanse" },

  // Carte 6 — Conseiller
  contactTitle: { fr: "Parler à un conseiller", en: "Talk with an advisor", es: "Hablar con un asesor", it: "Parla con un consulente", pt: "Falar com um consultor", de: "Mit einem Berater sprechen", ht: "Pale ak yon konseye" },
  contactCta: { fr: "Nous contacter", en: "Contact us", es: "Contáctanos", it: "Contattaci", pt: "Fale connosco", de: "Kontakt", ht: "Kontakte nou" },

  // Chrome
  langLabel: { fr: "Langue", en: "Language", es: "Idioma", it: "Lingua", pt: "Idioma", de: "Sprache", ht: "Lang" },
  skip: { fr: "Continuer sans choisir", en: "Continue browsing without choosing", es: "Seguir sin elegir", it: "Continua senza scegliere", pt: "Continuar sem escolher", de: "Ohne Auswahl fortfahren", ht: "Kontinye san chwazi" },
  dontShow: { fr: "Ne plus afficher", en: "Don't show this again", es: "No volver a mostrar", it: "Non mostrare più", pt: "Não mostrar novamente", de: "Nicht mehr anzeigen", ht: "Pa montre sa ankò" },
  close: { fr: "Fermer", en: "Close", es: "Cerrar", it: "Chiudi", pt: "Fechar", de: "Schließen", ht: "Fèmen" },
};

export interface WelcomeCard {
  /** Identifiant stable (clé de titre/cta dans WELCOME). */
  id: "placement" | "tef" | "tcf" | "programs" | "register" | "continue" | "contact";
  emoji: string;
  href: string;
  titleKey: string;
  ctaKey: string;
  descKey?: string;
  /** Marqué « Recommandé » si le visiteur n'a jamais fait le test. */
  recommendable?: boolean;
  /** N'apparaît que si l'utilisateur N'EST PAS connecté. */
  guestOnly?: boolean;
  /** N'apparaît que si l'utilisateur EST connecté. */
  authOnly?: boolean;
}

/**
 * Ordre des cartes. `register` (invité) et `continue` (connecté) occupent la même
 * place : la logique d'affichage n'en montre qu'une seule selon la session.
 * NB : `/tutorat` est la meilleure destination existante pour le test de niveau
 * (sélection par compétence + niveau) tant qu'un moteur de test dédié n'existe pas.
 */
export const WELCOME_CARDS: WelcomeCard[] = [
  { id: "placement", emoji: "🎯", href: "/tutorat", titleKey: "placementTitle", ctaKey: "placementCta", descKey: "placementDesc", recommendable: true },
  { id: "tef", emoji: "🇨🇦", href: "/tef", titleKey: "tefTitle", ctaKey: "tefCta" },
  { id: "tcf", emoji: "🇨🇦", href: "/tcf", titleKey: "tcfTitle", ctaKey: "tcfCta" },
  { id: "programs", emoji: "📚", href: "/formations", titleKey: "programsTitle", ctaKey: "programsCta" },
  { id: "register", emoji: "📝", href: "/auth/register", titleKey: "registerTitle", ctaKey: "registerCta", guestOnly: true },
  { id: "continue", emoji: "🚀", href: "/dashboard", titleKey: "continueTitle", ctaKey: "continueCta", authOnly: true },
  { id: "contact", emoji: "💬", href: "/contact", titleKey: "contactTitle", ctaKey: "contactCta" },
];

/** Langues proposées dans le sélecteur compact du welcome (toutes réellement supportées). */
export const WELCOME_LANG_CHOICES: Lang[] = ["fr", "en", "es", "pt", "ht"];
