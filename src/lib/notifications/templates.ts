// Modèles de notification multilingues, DISTINCTS par parcours et par événement.
// Repli automatique vers le français si une langue n'est pas fournie.
// Variables dynamiques au format {{clé}}.

import type { NotificationEvent } from "./events.ts";

export type TemplateLang = "fr" | "en";

export interface RenderedTemplate {
  subject: string;
  body: string;
}

type TemplateSet = Partial<Record<TemplateLang, RenderedTemplate>>;

const SIGN_FR = "Cordialement,\nL'équipe ARCADINS Training Center";
const SIGN_EN = "Best regards,\nThe ARCADINS Training Center team";

// ── Modèles courriel (destinataire externe : élève ou candidat tuteur) ──────
const EMAIL_TEMPLATES: Record<NotificationEvent, TemplateSet> = {
  // ---------- PARCOURS ÉLÈVE ----------
  tutoring_request_submitted: {
    fr: {
      subject: "Confirmation de votre demande de tutorat en TEF et TCF",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Nous avons bien reçu votre demande concernant le programme de tutorat en TEF et TCF d'ARCADINS Training Center.\n\n" +
        "Notre équipe examinera les renseignements fournis afin de déterminer le parcours pédagogique le plus adapté à votre niveau, à vos objectifs et à vos disponibilités.\n\n" +
        "La réception de ce message confirme uniquement que votre demande a été enregistrée. Un membre de notre équipe communiquera avec vous pour les prochaines étapes.\n\n" +
        SIGN_FR,
    },
    en: {
      subject: "Confirmation of your TEF/TCF tutoring request",
      body:
        "Hello {{firstName}},\n\n" +
        "We have received your request regarding ARCADINS Training Center's TEF/TCF tutoring program.\n\n" +
        "Our team will review the information provided to determine the learning path best suited to your level, goals and availability.\n\n" +
        "This message only confirms that your request has been recorded. A member of our team will contact you about the next steps.\n\n" +
        SIGN_EN,
    },
  },
  tutoring_request_under_review: {
    fr: {
      subject: "Votre demande de tutorat est en cours d'examen",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Votre demande de tutorat en TEF et TCF est maintenant à l'étude par notre équipe pédagogique. Nous reviendrons vers vous prochainement.\n\n" +
        SIGN_FR,
    },
  },
  tutoring_request_contacted: {
    fr: {
      subject: "Suivi de votre demande de tutorat",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Un membre de notre équipe a pris contact avec vous au sujet de votre demande de tutorat. Si vous n'avez pas reçu notre message, n'hésitez pas à nous répondre.\n\n" +
        SIGN_FR,
    },
  },
  tutoring_session_scheduled: {
    fr: {
      subject: "Votre séance de tutorat est planifiée",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Une première séance de tutorat a été planifiée dans le cadre de votre accompagnement. Les détails vous seront transmis par notre équipe.\n\n" +
        SIGN_FR,
    },
  },
  tutoring_request_enrolled: {
    fr: {
      subject: "Bienvenue dans votre parcours de tutorat",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Votre inscription au parcours de tutorat est confirmée. Nous sommes ravis de vous accompagner vers vos objectifs au TEF et au TCF.\n\n" +
        SIGN_FR,
    },
  },
  tutoring_request_closed: {
    fr: {
      subject: "Clôture de votre demande de tutorat",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Votre demande de tutorat a été clôturée. Si vous souhaitez reprendre un accompagnement à l'avenir, vous pouvez soumettre une nouvelle demande à tout moment.\n\n" +
        SIGN_FR,
    },
  },

  // ---------- PARCOURS TUTEUR ----------
  tutor_application_submitted: {
    fr: {
      subject: "Confirmation de votre candidature comme tuteur",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Nous avons bien reçu votre candidature pour devenir tuteur au sein d'ARCADINS Training Center.\n\n" +
        "Votre profil, votre expérience, vos compétences linguistiques et vos disponibilités seront examinés par notre équipe.\n\n" +
        "Cette confirmation ne constitue pas une acceptation. Nous communiquerons avec vous si votre candidature est retenue pour une entrevue ou une prochaine étape.\n\n" +
        SIGN_FR,
    },
    en: {
      subject: "Confirmation of your tutor application",
      body:
        "Hello {{firstName}},\n\n" +
        "We have received your application to become a tutor at ARCADINS Training Center.\n\n" +
        "Your profile, experience, language skills and availability will be reviewed by our team.\n\n" +
        "This confirmation does not constitute an acceptance. We will contact you if your application is selected for an interview or a next step.\n\n" +
        SIGN_EN,
    },
  },
  tutor_application_under_review: {
    fr: {
      subject: "Votre candidature comme tuteur est en cours d'examen",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Votre candidature pour devenir tuteur est actuellement à l'étude par notre équipe. Nous vous tiendrons informé(e) de la suite.\n\n" +
        SIGN_FR,
    },
  },
  tutor_interview_requested: {
    fr: {
      subject: "Invitation à une entrevue — candidature tuteur",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Votre candidature a retenu notre attention et nous souhaitons vous rencontrer en entrevue. Notre équipe vous proposera prochainement des disponibilités.\n\n" +
        SIGN_FR,
    },
  },
  tutor_interview_scheduled: {
    fr: {
      subject: "Votre entrevue est planifiée — candidature tuteur",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Votre entrevue dans le cadre de votre candidature comme tuteur a été planifiée. Les détails vous seront communiqués séparément.\n\n" +
        SIGN_FR,
    },
  },
  tutor_application_approved: {
    fr: {
      subject: "Votre candidature comme tuteur a été approuvée",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Nous avons le plaisir de vous informer que votre candidature comme tuteur au sein d'ARCADINS Training Center a été approuvée.\n\n" +
        "Prochaines étapes :\n" +
        "• compléter votre dossier et les documents internes qui vous seront demandés ;\n" +
        "• suivre la formation d'intégration destinée aux tuteurs ;\n" +
        "• prendre connaissance et accepter la convention de collaboration avant tout accompagnement.\n\n" +
        "Veuillez noter que cette approbation ne garantit aucun volume minimal d'heures ni de revenus : les affectations dépendent des besoins réels des apprenants.\n\n" +
        SIGN_FR,
    },
  },
  tutor_application_rejected: {
    fr: {
      subject: "Mise à jour concernant votre candidature comme tuteur",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Nous vous remercions de l'intérêt que vous portez à ARCADINS Training Center et du temps consacré à votre candidature comme tuteur.\n\n" +
        "Après examen, nous ne sommes pas en mesure de donner une suite favorable à votre candidature pour le moment.\n\n" +
        "Cette décision ne remet nullement en cause vos qualités. Nous vous invitons à soumettre une nouvelle candidature à l'avenir si vous le souhaitez, et nous vous souhaitons beaucoup de succès dans vos projets.\n\n" +
        SIGN_FR,
    },
  },
  tutor_application_suspended: {
    fr: {
      subject: "Suspension temporaire de votre collaboration comme tuteur",
      body:
        "Bonjour {{firstName}},\n\n" +
        "Nous vous informons que votre collaboration comme tuteur est temporairement suspendue. Un membre de notre équipe communiquera avec vous pour en préciser les modalités et les prochaines étapes.\n\n" +
        SIGN_FR,
    },
  },
};

const FALLBACK: TemplateLang = "fr";

function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => vars[key] ?? "");
}

/** Rend le modèle courriel d'un événement dans la langue voulue (repli FR). */
export function renderEmailTemplate(
  event: NotificationEvent,
  lang: string,
  vars: Record<string, string>,
): RenderedTemplate | null {
  const set = EMAIL_TEMPLATES[event];
  if (!set) return null;
  const tpl = set[lang as TemplateLang] ?? set[FALLBACK];
  if (!tpl) return null;
  return { subject: interpolate(tpl.subject, vars), body: interpolate(tpl.body, vars) };
}

export { EMAIL_TEMPLATES, interpolate };
