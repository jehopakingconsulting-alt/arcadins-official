import type { Lang } from "@/lib/i18n";
import type { CourseTranslation } from "./types";

// Note: this course teaches French itself. Pedagogical framing is translated,
// but French vocabulary given as examples (courriel, pourriel, RAMQ, STAR…) is
// deliberately kept in French, since it is the subject matter being learned.

const en: CourseTranslation = [
  {
    title: "Professional French: basics and vocabulary",
    objectives: [
      "Acquire the basic vocabulary of the Quebec workplace",
      "Distinguish the formal and informal register in a professional context",
      "Build simple, clear professional sentences",
    ],
    content: [
      "Professional French differs from everyday French through specific vocabulary: poste (position), embauche (hiring), échéancier (schedule), mandat (mandate), livrable (deliverable). Mastering these basic terms is essential before tackling more complex communication situations.",
      "The formal register is used with hierarchical superiors, clients and in official written communications. The more informal register, although present in some Quebec company cultures, should be used cautiously by newcomers until they know the codes of the environment well.",
      "Building professional sentences favors clarity and concision. Avoid overly long sentences, use precise action verbs (propose, recommend, analyze) and structure your ideas with logical connectors (first, then, consequently).",
    ],
    keyTakeaways: [
      "Basic professional vocabulary must become automatic before complex situations",
      "The formal register remains the safe bet in a new workplace",
      "Clarity always takes priority over sophisticated vocabulary",
    ],
    resourceLabels: [
      "Office québécois de la langue française — Workplace vocabulary",
      "TV5Monde — Professional French",
    ],
    quiz: [
      { question: "What does the term 'échéancier' mean in a professional context?", options: ["A type of coffee", "A forecast schedule of a project's stages and deadlines", "A management position", "An accounting software"], explanation: "An échéancier is a document that plans the different stages of a project with their deadlines." },
      { question: "When is the formal register particularly recommended?", options: ["Never", "With hierarchical superiors and clients", "Only between friends", "Only when speaking"], explanation: "The formal register is the safe bet in communications with the hierarchy and clients, especially for a newcomer." },
      { question: "Which element is recommended to structure your ideas logically in writing?", options: ["Emojis", "Logical connectors (first, then, consequently)", "Text-message abbreviations", "Silence"], explanation: "Logical connectors help the reader follow the progression of the reasoning clearly." },
      { question: "What does 'livrable' mean in a professional environment?", options: ["A postal parcel", "A concrete result expected from a project or task", "A type of drink", "A public holiday"], explanation: "A livrable refers to a tangible result expected at a given stage of a project (report, prototype, document, etc.)." },
      { question: "Which quality should take priority in professional writing according to the module?", options: ["Sophisticated vocabulary", "Clarity", "Sentence length", "The use of slang"], explanation: "Clarity and concision are valued in a professional environment, more than the complexity of the vocabulary." },
      { question: "Why must basic professional vocabulary become automatic?", options: ["To impress colleagues", "To be able to focus on more complex communication situations afterwards", "It isn't necessary", "Only to pass an exam"], explanation: "Mastering the basics makes it easier to be at ease in more demanding professional exchanges later on." },
    ],
  },
  {
    title: "Oral communication in the workplace",
    objectives: [
      "Participate effectively in a meeting in French",
      "Present an idea or project in a structured way",
      "Use the polite expressions appropriate to the Quebec context",
    ],
    content: [
      "Participating in a meeting requires knowing how to speak at the right moment, rephrasing to confirm understanding, and asking clarifying questions without fear. Quebecers value direct but courteous communication.",
      "A structured presentation generally follows the plan: context, problem, proposed solution, expected benefits. Using clear transitions helps the audience follow the reasoning, even for a non-native speaker.",
      "Polite expressions vary by context: a professional email often starts with 'Bonjour' followed by the first name (a more informal culture than in France), while a formal meeting keeps marks of respect like 'Merci de votre attention' at the conclusion.",
    ],
    keyTakeaways: [
      "Rephrasing to confirm understanding avoids costly misunderstandings",
      "A clear structure compensates for still-limited vocabulary",
      "Using first names and 'tu' is common in Quebec, even in a professional context",
    ],
    resourceLabels: [
      "Radio-Canada — Language resources",
    ],
    quiz: [
      { question: "Which technique helps avoid misunderstandings in a meeting?", options: ["Never speaking", "Rephrasing to confirm understanding", "Speaking as fast as possible", "Avoiding asking questions"], explanation: "Rephrasing what you understood lets you verify and correct any misunderstanding before it becomes a problem." },
      { question: "Which plan generally structures an effective professional presentation?", options: ["Conclusion, context, problem", "Context, problem, solution, benefits", "No order matters", "Benefits only"], explanation: "This logical plan guides the audience from context to a clear solution and its advantages." },
      { question: "How does a professional email generally start in Quebec?", options: ["With 'Cher Monsieur le Directeur'", "With 'Bonjour' followed by the first name", "With no greeting", "Always in English"], explanation: "Quebec culture is more informal than in France, and using the first name from the start is common and well accepted." },
      { question: "What does a clear structure allow in a presentation, even with limited vocabulary?", options: ["Nothing, vocabulary is all that matters", "To compensate and remain understandable despite linguistic limits", "To avoid speaking entirely", "To speak faster"], explanation: "A good structure helps the audience follow the message even if the speaker's vocabulary is still developing." },
      { question: "What characterizes communication in Quebec according to the module?", options: ["Direct frankness but courteous", "Extreme and rigid formality", "The total absence of politeness", "Systematic silence"], explanation: "Quebecers generally value direct communication while remaining courteous and respectful." },
      { question: "Using 'tu' in a professional environment in Quebec is:", options: ["Strictly forbidden", "Common, even with the hierarchy", "Reserved only for close friends", "A serious offense"], explanation: "Unlike other French-speaking cultures, using 'tu' is widespread at work in Quebec." },
    ],
  },
  {
    title: "Professional writing (emails, reports)",
    objectives: [
      "Write a clear and complete professional email",
      "Structure a simple report with introduction, body, conclusion",
      "Avoid common anglicisms in business French",
    ],
    content: [
      "An effective professional email contains a precise subject line, a suitable salutation, a message structured in short paragraphs and a closing salutation. Always proofread before sending to avoid errors that harm credibility.",
      "A professional report follows a logical structure: executive summary (if needed), context, methodology, results, recommendations. Titles and subtitles make it easier for busy recipients to skim quickly.",
      "Quebec business French avoids certain widespread anglicisms in speech: say 'courriel' rather than 'email', 'clavarder' rather than 'chatter', 'pourriel' rather than 'spam'. These terms are of official use in written communications.",
    ],
    keyTakeaways: [
      "A precise email subject line increases the response rate and clarity",
      "A report's structure must allow quick diagonal reading",
      "Official French terms are expected in professional written communications",
    ],
    resourceLabels: [
      "Banque de dépannage linguistique — OQLF",
    ],
    quiz: [
      { question: "Which official Quebec term replaces 'email'?", options: ["Courriel", "Mailbox", "Internet", "Messagerie"], explanation: "'Courriel' is the official term used in Quebec instead of the anglicism 'email'." },
      { question: "Which term officially replaces 'spam' in Quebec French?", options: ["Déchet numérique", "Pourriel", "Junk mail", "Bloqueur"], explanation: "'Pourriel' is the official French term for unwanted emails (spam)." },
      { question: "What must an effective professional email contain?", options: ["A vague subject line", "A precise subject line and a closing salutation", "No particular structure", "Only images"], explanation: "A precise subject line and a clear structure with a closing salutation increase the clarity and professionalism of the message." },
      { question: "What is the first step of a well-structured professional report?", options: ["The conclusion", "The context (after an executive summary if needed)", "The appendices", "No step is required"], explanation: "The report generally begins with the context that situates the topic before developing methodology and results." },
      { question: "What does the term 'clavarder' replace?", options: ["Printing", "Chatting (talking online)", "Deleting", "Saving"], explanation: "'Clavarder' is the official Quebec term for online keyboard conversation (chat)." },
      { question: "Why should you always proofread an email before sending?", options: ["It isn't necessary", "To avoid errors that harm professional credibility", "To waste time", "To comply with a law"], explanation: "Uncorrected errors can harm the sender's professional image." },
    ],
  },
  {
    title: "Quebec French: expressions and culture",
    objectives: [
      "Recognize common Quebec expressions in the workplace",
      "Understand the cultural nuances of workplace communication",
      "Avoid misunderstandings related to regional linguistic differences",
    ],
    content: [
      "Quebec French includes expressions specific to the workplace: 'faire du pouce' (take advantage of an opportunity), 'capoter' (be enthusiastic or overwhelmed depending on context), 'c'est correct' (that's acceptable). Understanding these expressions eases social integration at work.",
      "Quebec professional culture values apparent hierarchical equality: employees often use 'tu' with their superiors and meetings encourage everyone's participation, unlike more hierarchical cultures.",
      "Newcomers must also adapt to the pace of communication: Quebecers generally appreciate measured frankness, avoiding direct confrontations but valuing honesty in professional feedback.",
    ],
    keyTakeaways: [
      "Regional expressions ease integration but must be used with discernment",
      "Quebec culture values a less marked hierarchy than elsewhere in the French-speaking world",
      "Observing before imitating remains the best cultural adaptation strategy",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique",
    ],
    quiz: [
      { question: "What does the Quebec expression 'c'est correct' mean?", options: ["It's a serious mistake", "It's acceptable", "It's forbidden", "It's urgent"], explanation: "'C'est correct' is a common expression meaning that something is acceptable or satisfactory." },
      { question: "How to describe the hierarchy in a Quebec professional environment?", options: ["Extremely rigid and formal", "Less marked, with frequent use of 'tu' even toward superiors", "Nonexistent", "Identical everywhere in the French-speaking world"], explanation: "Quebec culture values a less marked hierarchy than in other French-speaking countries." },
      { question: "Which strategy is recommended for a newcomer facing regional expressions?", options: ["Use them immediately without discernment", "Observe before imitating", "Ignore them completely", "Systematically correct them"], explanation: "Observing the context of use before adopting expressions yourself avoids cultural blunders." },
      { question: "How do Quebecers generally approach professional feedback?", options: ["With measured frankness, honest but without direct confrontation", "No feedback is ever given", "Always very aggressively", "Only in anonymous writing"], explanation: "The culture values honest feedback while avoiding direct and abrupt confrontations." },
      { question: "What does the expression 'faire du pouce' mean in a professional context?", options: ["Only hitchhiking", "Take advantage of an opportunity", "Refuse an offer", "Quit your job"], explanation: "In this context, 'faire du pouce' means to take advantage of a favorable opportunity." },
      { question: "Why does understanding regional expressions ease integration?", options: ["It isn't useful", "It helps better understand colleagues and integrate socially", "It always complicates communication", "It has no link to work"], explanation: "Understanding the informal language used by colleagues eases social relationships and integration within the team." },
    ],
  },
  {
    title: "Preparing for job interviews",
    objectives: [
      "Prepare structured answers to frequent questions",
      "Present your background convincingly in French",
      "Ask relevant questions to the employer",
    ],
    content: [
      "Frequent questions in Quebec interviews include 'Parlez-moi de vous' (Tell me about yourself), 'Pourquoi ce poste vous intéresse-t-il' (Why does this position interest you), and 'Quelle est votre plus grande force/faiblesse' (What is your greatest strength/weakness). The STAR method (Situation, Task, Action, Result) effectively structures behavioral answers.",
      "Presenting your international background as an asset rather than an obstacle changes the employer's perception: highlight adaptability, transferable skills and the motivation to contribute to the Quebec economy.",
      "Asking questions at the end of the interview shows genuine interest in the position: asking about the team, the department's current challenges or growth prospects shows serious thought, not just the desire to get a job.",
    ],
    keyTakeaways: [
      "The STAR method structures clear and memorable answers",
      "International experience must be presented as added value",
      "Asking relevant questions at the end of the interview sets serious candidates apart",
    ],
    resourceLabels: [
      "Emploi-Québec — Interview preparation guide",
    ],
    quiz: [
      { question: "What does the STAR method used in interviews stand for?", options: ["Situation, Task, Action, Result", "Salary, Work, Benefits, Retirement", "Smile, Outfit, Attitude, Network", "No particular meaning"], explanation: "STAR structures behavioral answers by describing the Situation, the Task, the Action taken and the Result obtained." },
      { question: "How should international experience be presented according to the module?", options: ["As an obstacle to hide", "As an asset and added value", "You should never mention it", "As an excuse"], explanation: "International experience must be valued as a source of adaptability and transferable skills." },
      { question: "Why is asking questions at the end of an interview recommended?", options: ["It's never recommended", "To show genuine interest and serious thought for the position", "To needlessly prolong the interview", "To immediately negotiate the salary"], explanation: "Asking relevant questions shows the employer that the candidate has seriously thought about the position and the organization." },
      { question: "Which frequent question is mentioned in the module?", options: ["What is your astrological sign?", "Tell me about yourself (Parlez-moi de vous)", "How many children do you have?", "What is your religion?"], explanation: "'Parlez-moi de vous' is a very common opening question in job interviews in Quebec." },
      { question: "Which type of skills should be highlighted coming from an international background?", options: ["No skill is transferable", "Transferable skills and adaptability", "Only degrees obtained abroad", "The place of birth"], explanation: "Transferable skills and adaptability are strong arguments for an international background." },
      { question: "The STAR method is particularly useful for which type of question?", options: ["Only salary questions", "Behavioral questions", "Weather questions", "No specific question"], explanation: "STAR is designed specifically to structure answers to behavioral questions that require concrete examples." },
    ],
  },
  {
    title: "Negotiation and presentation in French",
    objectives: [
      "Use appropriate negotiation vocabulary",
      "Present a proposal with confidence",
      "Handle objections constructively",
    ],
    content: [
      "Negotiation vocabulary includes key expressions: 'Je propose que...' (I propose that), 'Serait-il possible de...' (Would it be possible to), 'Je comprends votre point, cependant...' (I understand your point, however). These expressions allow disagreement to be expressed while maintaining a cordial professional relationship.",
      "Presenting a proposal with confidence does not mean being aggressive: it is about structuring your argument with facts, anticipating possible objections and proposing solutions rather than simply stating a problem.",
      "Handling objections constructively means fully listening to the objection before responding, rephrasing to show understanding, then providing a factual rather than defensive answer.",
    ],
    keyTakeaways: [
      "Professional disagreement is expressed through nuanced expressions, not direct refusals",
      "A good negotiation anticipates objections before they are raised",
      "Listening fully before responding defuses most tensions",
    ],
    resourceLabels: [
      "HEC Montréal — Negotiation resources",
    ],
    quiz: [
      { question: "Which expression allows disagreement to be expressed while staying cordial?", options: ["'You're wrong'", "'Je comprends votre point, cependant...' (I understand your point, however)", "'That's false'", "Complete silence"], explanation: "This expression acknowledges the other's point of view while introducing a disagreement or clarification in a nuanced way." },
      { question: "What does presenting a proposal 'with confidence' mean according to the module?", options: ["Being aggressive", "Structuring your argument with facts, without aggression", "Speaking very loudly", "Avoiding all eye contact"], explanation: "Confidence shows through factual, structured argumentation, not through aggression." },
      { question: "What is the first step to handle an objection constructively?", options: ["Respond immediately without listening", "Fully listen to the objection before responding", "Ignore the objection", "Change the subject"], explanation: "Fully listening before responding lets you truly understand the concern and address it adequately." },
      { question: "What must a good negotiation do before objections are raised?", options: ["Nothing special", "Anticipate them", "Avoid them entirely by avoiding the subject", "Ignore them"], explanation: "Anticipating possible objections lets you prepare solid answers in advance." },
      { question: "What does rephrasing allow during an objection?", options: ["To waste time needlessly", "To show understanding of the other's concern", "To contradict immediately", "To avoid answering"], explanation: "Rephrasing demonstrates active listening and facilitates a relevant answer to the raised objection." },
      { question: "Why favor a factual rather than defensive answer to an objection?", options: ["Because it's faster", "Because facts are more convincing and defuse tensions", "It isn't recommended", "Because it's required by law"], explanation: "A fact-based answer is generally more persuasive and professional than an emotional or defensive reaction." },
    ],
  },
  {
    title: "Sector terminology (finance, tech, health)",
    objectives: [
      "Master the vocabulary specific to the targeted sector",
      "Understand common acronyms in the Quebec workplace",
      "Use precise terminology in your field of expertise",
    ],
    content: [
      "Each professional sector has its own terminology: in finance, we speak of 'REER', 'CELI', 'relevé bancaire' (bank statement); in technology, 'infonuagique' (cloud), 'pourriel'; in health, 'CLSC', 'CHSLD'. This lexical mastery is essential for rapid professional integration.",
      "Quebec institutional acronyms (RAMQ, CNESST, CSST, SAAQ) come up frequently in administrative and professional communications. Understanding them avoids costly misunderstandings in official procedures.",
      "Terminological precision demonstrates expertise: using the exact term rather than a general paraphrase strengthens professional credibility, particularly in technical or regulated sectors.",
    ],
    keyTakeaways: [
      "Sector terminology must be learned in context, not through isolated memorization",
      "Quebec institutional acronyms are essential to know for administrative procedures",
      "Lexical precision strengthens perceived professional credibility",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique — Search by sector",
    ],
    quiz: [
      { question: "What does the acronym RAMQ mean?", options: ["Régie de l'assurance maladie du Québec (Quebec health insurance board)", "Municipal purchasing network", "Administrative market regulation", "No official meaning"], explanation: "The RAMQ is the Régie de l'assurance maladie du Québec, the body responsible for public health coverage." },
      { question: "What does the term 'infonuagique' refer to?", options: ["A weather app", "Cloud computing", "A type of coffee", "An accounting software"], explanation: "'Infonuagique' is the official Quebec French term for 'cloud computing'." },
      { question: "What is a CHSLD?", options: ["A long-term care residential center", "A high school", "A type of tax", "An insurance company"], explanation: "The CHSLD is a Quebec facility providing long-term care to people with reduced autonomy." },
      { question: "Why is terminological precision important in a professional environment?", options: ["It isn't important", "It strengthens perceived professional credibility", "It always complicates communication", "It has no link to expertise"], explanation: "Using the exact term rather than a paraphrase demonstrates command of the field and strengthens trust." },
      { question: "What does the acronym CNESST mean?", options: ["A type of bank account", "Commission for labor standards, equity, health and safety", "A student union", "A television channel"], explanation: "The CNESST governs labor standards, pay equity and occupational health and safety in Quebec." },
      { question: "How should sector terminology be learned according to the module?", options: ["Through isolated memorization of lists", "In a real context of use", "It cannot be learned", "Only orally"], explanation: "Learning terminology in context promotes better retention and appropriate use." },
    ],
  },
  {
    title: "Final exam & certification",
    objectives: [
      "Demonstrate mastery of the professional French acquired",
      "Pass a simulated interview and professional writing task",
      "Obtain the ARCADINS business French certificate",
    ],
    content: [
      "The final exam evaluates the four skills worked on during the training: oral comprehension of a simulated meeting, writing a professional email, oral presentation of a project, and a job interview simulation.",
      "Evaluators pay particular attention to the clarity of the message rather than absolute grammatical perfection — the goal is effective professional communication, not academic mastery of the language.",
      "Upon passing the exam, a digital ARCADINS certificate is issued, attesting to the level of professional French achieved and which can be added to a CV or presented to a potential employer.",
    ],
    keyTakeaways: [
      "The exam evaluates effective communication, not grammatical perfection",
      "All four skills (oral, written, presentation, interaction) are evaluated",
      "The certificate issued is a concrete asset for the job search",
    ],
    resourceLabels: [],
    quiz: [
      { question: "Which skills are evaluated during the final exam?", options: ["Only written grammar", "Oral comprehension, writing, oral presentation, interview simulation", "Only dictation", "Typing speed"], explanation: "The final exam covers the four skills worked on throughout the training, in an integrated way." },
      { question: "What do the graders primarily evaluate according to the module?", options: ["Absolute grammatical perfection", "The clarity of the message and effective communication", "The candidate's accent", "Response speed only"], explanation: "The goal is effective professional communication, not perfect academic mastery of the language." },
      { question: "What does the student receive upon passing the exam?", options: ["Nothing special", "A digital ARCADINS certificate", "A fine", "An international university diploma"], explanation: "A digital ARCADINS certificate is issued, officially attesting to the level achieved." },
      { question: "The certificate issued can be used to:", options: ["Nothing concrete", "Be added to the CV or presented to an employer", "Only personal use with no professional value", "Travel without a visa"], explanation: "The certificate is concrete proof of professional language skill usable in a job search." },
      { question: "Does the final exam include a job interview simulation?", options: ["No, never", "Yes, it is one of the evaluated components", "Only for some students", "Only as a paid option"], explanation: "The interview simulation is an integral part of the program's final evaluation." },
      { question: "What is the overall goal of this business French training?", options: ["Theoretical academic mastery only", "Effective professional communication in the workplace", "Passing a university literature exam", "Learning to write poetry"], explanation: "The training aims at a practical, professional application of French, adapted to the Quebec workplace." },
    ],
  },
];

const es: CourseTranslation = [
  {
    title: "Francés profesional: bases y vocabulario",
    objectives: [
      "Adquirir el vocabulario básico del mundo laboral quebequense",
      "Distinguir el registro formal e informal en contexto profesional",
      "Construir frases profesionales simples y claras",
    ],
    content: [
      "El francés profesional se distingue del francés corriente por un vocabulario específico: poste (puesto), embauche (contratación), échéancier (cronograma), mandat (mandato), livrable (entregable). Dominar estos términos básicos es esencial antes de abordar situaciones de comunicación más complejas.",
      "El registro formal se utiliza con los superiores jerárquicos, los clientes y en las comunicaciones escritas oficiales. El registro más informal, aunque presente en algunas culturas de empresa quebequenses, debe utilizarse con prudencia por los recién llegados hasta conocer bien los códigos del medio.",
      "La construcción de frases profesionales privilegia la claridad y la concisión. Evitar las frases demasiado largas, usar verbos de acción precisos (proponer, recomendar, analizar) y estructurar las ideas con conectores lógicos (primero, luego, por consiguiente).",
    ],
    keyTakeaways: [
      "El vocabulario profesional básico debe automatizarse antes de las situaciones complejas",
      "El registro formal sigue siendo la apuesta segura en un nuevo entorno laboral",
      "La claridad siempre prima sobre la sofisticación del vocabulario",
    ],
    resourceLabels: [
      "Office québécois de la langue française — Vocabulario del trabajo",
      "TV5Monde — Francés profesional",
    ],
    quiz: [
      { question: "¿Qué significa el término 'échéancier' en contexto profesional?", options: ["Un tipo de café", "Un calendario previsional de las etapas y plazos de un proyecto", "Un puesto de dirección", "Un software de contabilidad"], explanation: "Un échéancier es un documento que planifica las diferentes etapas de un proyecto con sus fechas límite." },
      { question: "¿Cuándo se recomienda particularmente el registro formal?", options: ["Nunca", "Con los superiores jerárquicos y los clientes", "Únicamente entre amigos", "Solo al hablar"], explanation: "El registro formal es la apuesta segura en las comunicaciones con la jerarquía y la clientela, sobre todo para un recién llegado." },
      { question: "¿Qué elemento se recomienda para estructurar lógicamente las ideas por escrito?", options: ["Los emojis", "Los conectores lógicos (primero, luego, por consiguiente)", "Las abreviaturas de mensajes de texto", "El silencio"], explanation: "Los conectores lógicos ayudan al lector a seguir la progresión del razonamiento de manera clara." },
      { question: "¿Qué quiere decir 'livrable' en el entorno profesional?", options: ["Un paquete postal", "Un resultado concreto esperado de un proyecto o una tarea", "Un tipo de bebida", "Un día festivo"], explanation: "Un livrable designa un resultado tangible esperado en una etapa dada de un proyecto (informe, prototipo, documento, etc.)." },
      { question: "¿Qué cualidad debe primar en la redacción profesional según el módulo?", options: ["La sofisticación del vocabulario", "La claridad", "La longitud de las frases", "El uso de jerga"], explanation: "La claridad y la concisión son valoradas en el entorno profesional, más que la complejidad del vocabulario." },
      { question: "¿Por qué el vocabulario profesional básico debe automatizarse?", options: ["Para impresionar a los colegas", "Para poder concentrarse luego en situaciones de comunicación más complejas", "No es necesario", "Solo para aprobar un examen"], explanation: "Dominar las bases facilita la soltura en intercambios profesionales más exigentes posteriormente." },
    ],
  },
  {
    title: "Comunicación oral en la empresa",
    objectives: [
      "Participar eficazmente en una reunión en francés",
      "Presentar una idea o un proyecto de manera estructurada",
      "Usar las fórmulas de cortesía apropiadas al contexto quebequense",
    ],
    content: [
      "Participar en una reunión exige saber tomar la palabra en el momento adecuado, reformular para confirmar la comprensión y hacer preguntas de aclaración sin temor. Los quebequenses valoran una comunicación directa pero cortés.",
      "Una presentación estructurada sigue generalmente el plan: contexto, problema, solución propuesta, beneficios esperados. El uso de transiciones claras ayuda al auditorio a seguir el razonamiento, incluso para un hablante no nativo.",
      "Las fórmulas de cortesía varían según el contexto: un correo profesional a menudo comienza por 'Bonjour' seguido del nombre (cultura más informal que en Francia), mientras que una reunión formal conserva marcas de respeto como 'Merci de votre attention' en la conclusión.",
    ],
    keyTakeaways: [
      "Reformular para confirmar la comprensión evita los malentendidos costosos",
      "Una estructura clara compensa un vocabulario aún limitado",
      "El tuteo y el uso del nombre son corrientes en Quebec, incluso en contexto profesional",
    ],
    resourceLabels: [
      "Radio-Canada — Recursos lingüísticos",
    ],
    quiz: [
      { question: "¿Qué técnica ayuda a evitar los malentendidos en una reunión?", options: ["No hablar nunca", "Reformular para confirmar la comprensión", "Hablar lo más rápido posible", "Evitar hacer preguntas"], explanation: "Reformular lo que se ha entendido permite verificar y corregir cualquier incomprensión antes de que se convierta en un problema." },
      { question: "¿Qué plan estructura generalmente una presentación profesional eficaz?", options: ["Conclusión, contexto, problema", "Contexto, problema, solución, beneficios", "Ningún orden es importante", "Solo beneficios"], explanation: "Este plan lógico guía al auditorio del contexto hacia una solución clara y sus ventajas." },
      { question: "¿Cómo comienza generalmente un correo profesional en Quebec?", options: ["Por 'Cher Monsieur le Directeur'", "Por 'Bonjour' seguido del nombre", "Sin ningún saludo", "Siempre en inglés"], explanation: "La cultura quebequense es más informal que en Francia, y el uso del nombre desde el inicio es corriente y bien aceptado." },
      { question: "¿Qué permite una estructura clara en una presentación, incluso con un vocabulario limitado?", options: ["Nada, el vocabulario es todo lo que cuenta", "Compensar y seguir siendo comprensible a pesar de los límites lingüísticos", "Evitar completamente hablar", "Hablar más rápido"], explanation: "Una buena estructura ayuda al auditorio a seguir el mensaje aunque el vocabulario del hablante esté aún en desarrollo." },
      { question: "¿Qué caracteriza la comunicación en Quebec según el módulo?", options: ["Una franqueza directa pero cortés", "Una formalidad extrema y rígida", "La ausencia total de cortesía", "El silencio sistemático"], explanation: "Los quebequenses valoran generalmente una comunicación directa manteniéndose corteses y respetuosos." },
      { question: "El tuteo en el entorno profesional en Quebec es:", options: ["Estrictamente prohibido", "Corriente, incluso con la jerarquía", "Reservado únicamente a los amigos cercanos", "Una grave ofensa"], explanation: "A diferencia de otras culturas francófonas, el tuteo está ampliamente extendido en el trabajo en Quebec." },
    ],
  },
  {
    title: "Redacción profesional (correos, informes)",
    objectives: [
      "Redactar un correo profesional claro y completo",
      "Estructurar un informe simple con introducción, desarrollo, conclusión",
      "Evitar los anglicismos corrientes en el francés de los negocios",
    ],
    content: [
      "Un correo profesional eficaz contiene un asunto preciso, una fórmula de saludo adaptada, un mensaje estructurado en párrafos cortos y una fórmula de despedida final. Siempre releer antes del envío para evitar los errores que perjudican la credibilidad.",
      "Un informe profesional sigue una estructura lógica: resumen ejecutivo (si es necesario), contexto, metodología, resultados, recomendaciones. Los títulos y subtítulos facilitan la lectura rápida por destinatarios apurados.",
      "El francés quebequense de los negocios evita ciertos anglicismos extendidos al hablar: se dice 'courriel' en lugar de 'email', 'clavarder' en lugar de 'chatter', 'pourriel' en lugar de 'spam'. Estos términos son de uso oficial en las comunicaciones escritas.",
    ],
    keyTakeaways: [
      "Un asunto de correo preciso aumenta la tasa de respuesta y la claridad",
      "La estructura de un informe debe permitir una lectura rápida en diagonal",
      "Los términos franceses oficiales se esperan en las comunicaciones escritas profesionales",
    ],
    resourceLabels: [
      "Banque de dépannage linguistique — OQLF",
    ],
    quiz: [
      { question: "¿Qué término oficial quebequense reemplaza 'email'?", options: ["Courriel", "Mailbox", "Internet", "Messagerie"], explanation: "'Courriel' es el término oficial utilizado en Quebec en lugar del anglicismo 'email'." },
      { question: "¿Qué término reemplaza oficialmente 'spam' en francés quebequense?", options: ["Déchet numérique", "Pourriel", "Junk mail", "Bloqueur"], explanation: "'Pourriel' es el término oficial francés para designar los correos no deseados (spam)." },
      { question: "¿Qué debe contener un correo profesional eficaz?", options: ["Un asunto vago", "Un asunto preciso y una fórmula de despedida final", "Ninguna estructura particular", "Únicamente imágenes"], explanation: "Un asunto preciso y una estructura clara con despedida final aumentan la claridad y el profesionalismo del mensaje." },
      { question: "¿Cuál es la primera etapa de un informe profesional bien estructurado?", options: ["La conclusión", "El contexto (tras un resumen ejecutivo si es necesario)", "Los anexos", "Ninguna etapa es requerida"], explanation: "El informe comienza generalmente por el contexto que sitúa el tema antes de desarrollar metodología y resultados." },
      { question: "¿Qué reemplaza el término 'clavarder'?", options: ["Imprimir", "Chatear (conversar en línea)", "Borrar", "Guardar"], explanation: "'Clavarder' es el término quebequense oficial para designar la conversación en línea por teclado (chat)." },
      { question: "¿Por qué hay que releer siempre un correo antes del envío?", options: ["No es necesario", "Para evitar los errores que perjudican la credibilidad profesional", "Para perder tiempo", "Para respetar una ley"], explanation: "Los errores no corregidos pueden perjudicar la imagen profesional del remitente." },
    ],
  },
  {
    title: "Francés quebequense: expresiones y cultura",
    objectives: [
      "Reconocer las expresiones quebequenses corrientes en el entorno profesional",
      "Comprender los matices culturales de la comunicación en el trabajo",
      "Evitar los malentendidos ligados a las diferencias lingüísticas regionales",
    ],
    content: [
      "El francés quebequense comporta expresiones propias del entorno profesional: 'faire du pouce' (aprovechar una oportunidad), 'capoter' (estar entusiasmado o superado según el contexto), 'c'est correct' (es aceptable). Comprender estas expresiones facilita la integración social en el trabajo.",
      "La cultura profesional quebequense valora la igualdad jerárquica aparente: los empleados tutean a menudo a sus superiores y las reuniones fomentan la participación de todos, a diferencia de culturas más jerárquicas.",
      "Los recién llegados deben también adaptarse al ritmo de comunicación: los quebequenses aprecian generalmente la franqueza mesurada, evitando las confrontaciones directas pero valorando la honestidad en el feedback profesional.",
    ],
    keyTakeaways: [
      "Las expresiones regionales facilitan la integración pero deben usarse con discernimiento",
      "La cultura quebequense valora una jerarquía menos marcada que en otras partes de la francofonía",
      "Observar antes de imitar sigue siendo la mejor estrategia de adaptación cultural",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique",
    ],
    quiz: [
      { question: "¿Qué significa la expresión quebequense 'c'est correct'?", options: ["Es un error grave", "Es aceptable", "Está prohibido", "Es urgente"], explanation: "'C'est correct' es una expresión corriente que significa que algo es aceptable o satisfactorio." },
      { question: "¿Cómo describir la jerarquía en el entorno profesional quebequense?", options: ["Extremadamente rígida y formal", "Menos marcada, con un tuteo frecuente incluso hacia los superiores", "Inexistente", "Idéntica en toda la francofonía"], explanation: "La cultura quebequense valora una jerarquía menos marcada que en otros países francófonos." },
      { question: "¿Qué estrategia se recomienda para un recién llegado frente a las expresiones regionales?", options: ["Usarlas inmediatamente sin discernimiento", "Observar antes de imitar", "Ignorarlas completamente", "Corregirlas sistemáticamente"], explanation: "Observar el contexto de uso antes de adoptar uno mismo las expresiones evita las torpezas culturales." },
      { question: "¿Cómo abordan generalmente los quebequenses el feedback profesional?", options: ["Con una franqueza mesurada, honesta pero sin confrontación directa", "Nunca se da feedback", "Siempre de manera muy agresiva", "Únicamente por escrito anónimo"], explanation: "La cultura valora la honestidad del feedback evitando al mismo tiempo las confrontaciones directas y bruscas." },
      { question: "¿Qué significa la expresión 'faire du pouce' en contexto profesional?", options: ["Hacer autostop únicamente", "Aprovechar una oportunidad", "Rechazar una oferta", "Dejar su empleo"], explanation: "En este contexto, 'faire du pouce' significa sacar provecho o aprovechar una ocasión favorable." },
      { question: "¿Por qué comprender las expresiones regionales facilita la integración?", options: ["No es útil", "Ayuda a comprender mejor a los colegas e integrarse socialmente", "Siempre complica la comunicación", "No tiene ningún vínculo con el trabajo"], explanation: "Comprender el lenguaje informal usado por los colegas facilita las relaciones sociales y la integración en el equipo." },
    ],
  },
  {
    title: "Preparación para las entrevistas de trabajo",
    objectives: [
      "Preparar respuestas estructuradas a las preguntas frecuentes",
      "Presentar su trayectoria de manera convincente en francés",
      "Hacer preguntas pertinentes al empleador",
    ],
    content: [
      "Las preguntas frecuentes en la entrevista quebequense incluyen 'Parlez-moi de vous' (Hábleme de usted), 'Pourquoi ce poste vous intéresse-t-il' (¿Por qué le interesa este puesto?) y 'Quelle est votre plus grande force/faiblesse' (¿Cuál es su mayor fortaleza/debilidad?). El método STAR (Situación, Tarea, Acción, Resultado) estructura eficazmente las respuestas conductuales.",
      "Presentar su trayectoria internacional como una ventaja en lugar de un obstáculo cambia la percepción del empleador: destacar la adaptabilidad, las competencias transferibles y la motivación para contribuir a la economía quebequense.",
      "Hacer preguntas al final de la entrevista demuestra el interés real por el puesto: preguntar sobre el equipo, los desafíos actuales del departamento o las perspectivas de evolución muestra una reflexión seria, no solo el deseo de obtener un empleo.",
    ],
    keyTakeaways: [
      "El método STAR estructura respuestas claras y memorables",
      "La experiencia internacional debe presentarse como un valor añadido",
      "Hacer preguntas pertinentes al final de la entrevista distingue a los candidatos serios",
    ],
    resourceLabels: [
      "Emploi-Québec — Guía de preparación para la entrevista",
    ],
    quiz: [
      { question: "¿Qué significa el método STAR utilizado en la entrevista?", options: ["Situación, Tarea, Acción, Resultado", "Salario, Trabajo, Beneficios, Jubilación", "Sonrisa, Vestimenta, Actitud, Red", "Ninguna significación particular"], explanation: "STAR estructura las respuestas conductuales describiendo la Situación, la Tarea, la Acción tomada y el Resultado obtenido." },
      { question: "¿Cómo debe presentarse la experiencia internacional según el módulo?", options: ["Como un obstáculo a ocultar", "Como una ventaja y un valor añadido", "Nunca hay que hablar de ella", "Como una excusa"], explanation: "La experiencia internacional debe valorarse como una fuente de adaptabilidad y competencias transferibles." },
      { question: "¿Por qué hacer preguntas al final de una entrevista es recomendado?", options: ["Nunca es recomendado", "Para demostrar un interés real y una reflexión seria por el puesto", "Para prolongar inútilmente la entrevista", "Para negociar inmediatamente el salario"], explanation: "Hacer preguntas pertinentes muestra al empleador que el candidato ha reflexionado seriamente sobre el puesto y la organización." },
      { question: "¿Qué pregunta frecuente se menciona en el módulo?", options: ["¿Cuál es su signo astrológico?", "Hábleme de usted (Parlez-moi de vous)", "¿Cuántos hijos tiene?", "¿Cuál es su religión?"], explanation: "'Parlez-moi de vous' es una pregunta de apertura muy corriente en la entrevista de trabajo en Quebec." },
      { question: "¿Qué tipo de competencias hay que destacar viniendo de una trayectoria internacional?", options: ["Ninguna competencia es transferible", "Las competencias transferibles y la adaptabilidad", "Únicamente los diplomas obtenidos en el extranjero", "El lugar de nacimiento"], explanation: "Las competencias transferibles y la capacidad de adaptación son argumentos fuertes para una trayectoria internacional." },
      { question: "El método STAR es particularmente útil para qué tipo de pregunta?", options: ["Solo las preguntas sobre el salario", "Las preguntas conductuales", "Las preguntas sobre el clima", "Ninguna pregunta específica"], explanation: "STAR está diseñado específicamente para estructurar las respuestas a las preguntas conductuales que piden ejemplos concretos." },
    ],
  },
  {
    title: "Negociación y presentación en francés",
    objectives: [
      "Usar un vocabulario de negociación apropiado",
      "Presentar una propuesta con seguridad",
      "Gestionar las objeciones de manera constructiva",
    ],
    content: [
      "El vocabulario de negociación incluye expresiones clave: 'Je propose que...' (Propongo que), 'Serait-il possible de...' (¿Sería posible), 'Je comprends votre point, cependant...' (Comprendo su punto, sin embargo). Estas fórmulas permiten expresar un desacuerdo manteniendo al mismo tiempo una relación profesional cordial.",
      "Presentar una propuesta con seguridad no significa ser agresivo: se trata de estructurar su argumentación con hechos, anticipar las objeciones posibles y proponer soluciones en lugar de simplemente enunciar un problema.",
      "Gestionar las objeciones de manera constructiva implica escuchar completamente la objeción antes de responder, reformular para mostrar su comprensión, y luego aportar una respuesta factual en lugar de defensiva.",
    ],
    keyTakeaways: [
      "El desacuerdo profesional se expresa mediante fórmulas matizadas, no rechazos directos",
      "Una buena negociación anticipa las objeciones antes de que sean planteadas",
      "Escuchar completamente antes de responder desactiva la mayoría de las tensiones",
    ],
    resourceLabels: [
      "HEC Montréal — Recursos en negociación",
    ],
    quiz: [
      { question: "¿Qué fórmula permite expresar un desacuerdo manteniéndose cordial?", options: ["'Usted se equivoca'", "'Je comprends votre point, cependant...' (Comprendo su punto, sin embargo)", "'Es falso'", "El silencio completo"], explanation: "Esta fórmula reconoce el punto de vista del otro introduciendo al mismo tiempo con matiz un desacuerdo o una precisión." },
      { question: "¿Qué significa presentar una propuesta 'con seguridad' según el módulo?", options: ["Ser agresivo", "Estructurar su argumentación con hechos, sin agresividad", "Hablar muy fuerte", "Evitar todo contacto visual"], explanation: "La seguridad se manifiesta por una argumentación factual y estructurada, no por la agresividad." },
      { question: "¿Cuál es la primera etapa para gestionar una objeción de manera constructiva?", options: ["Responder inmediatamente sin escuchar", "Escuchar completamente la objeción antes de responder", "Ignorar la objeción", "Cambiar de tema"], explanation: "Escuchar plenamente antes de responder permite comprender realmente la preocupación y responder adecuadamente." },
      { question: "¿Qué debe hacer una buena negociación antes de que las objeciones sean planteadas?", options: ["Nada especial", "Anticiparlas", "Evitarlas completamente evitando el tema", "Ignorarlas"], explanation: "Anticipar las objeciones posibles permite preparar respuestas sólidas de antemano." },
      { question: "¿Qué permite la reformulación durante una objeción?", options: ["Perder tiempo inútilmente", "Mostrar su comprensión de la preocupación del otro", "Contradecir inmediatamente", "Evitar responder"], explanation: "Reformular demuestra una escucha activa y facilita una respuesta pertinente a la objeción planteada." },
      { question: "¿Por qué privilegiar una respuesta factual en lugar de defensiva frente a una objeción?", options: ["Porque es más rápido", "Porque los hechos son más convincentes y desactivan las tensiones", "No es recomendado", "Porque es exigido por la ley"], explanation: "Una respuesta basada en hechos es generalmente más persuasiva y profesional que una reacción emocional o defensiva." },
    ],
  },
  {
    title: "Terminología sectorial (finanzas, tecnología, salud)",
    objectives: [
      "Dominar el vocabulario específico del sector de actividad buscado",
      "Comprender los acrónimos corrientes en el entorno profesional quebequense",
      "Usar una terminología precisa en su campo de experiencia",
    ],
    content: [
      "Cada sector profesional posee su terminología propia: en finanzas, se habla de 'REER', 'CELI', 'relevé bancaire' (extracto bancario); en tecnología, de 'infonuagique' (nube), 'pourriel'; en salud, de 'CLSC', 'CHSLD'. Este dominio léxico es indispensable para una integración profesional rápida.",
      "Los acrónimos institucionales quebequenses (RAMQ, CNESST, CSST, SAAQ) aparecen frecuentemente en las comunicaciones administrativas y profesionales. Comprenderlos evita malentendidos costosos en los trámites oficiales.",
      "La precisión terminológica demuestra la experiencia: usar el término exacto en lugar de una paráfrasis general refuerza la credibilidad profesional, particularmente en los sectores técnicos o regulados.",
    ],
    keyTakeaways: [
      "La terminología sectorial debe aprenderse en contexto, no por memorización aislada",
      "Los acrónimos institucionales quebequenses son esenciales de conocer para los trámites administrativos",
      "La precisión léxica refuerza la credibilidad profesional percibida",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique — Búsqueda por sector",
    ],
    quiz: [
      { question: "¿Qué significa el acrónimo RAMQ?", options: ["Régie de l'assurance maladie du Québec (organismo de seguro de salud de Quebec)", "Red de compra municipal", "Reglamento administrativo de mercados", "Ninguna significación oficial"], explanation: "La RAMQ es la Régie de l'assurance maladie du Québec, el organismo responsable de la cobertura de salud pública." },
      { question: "¿Qué designa el término 'infonuagique'?", options: ["Una aplicación meteorológica", "El cloud computing (computación en la nube)", "Un tipo de café", "Un software de contabilidad"], explanation: "'Infonuagique' es el término francés oficial quebequense para designar el 'cloud computing'." },
      { question: "¿Qué es un CHSLD?", options: ["Un centro de alojamiento de cuidados de larga duración", "Una escuela secundaria", "Un tipo de impuesto", "Una compañía de seguros"], explanation: "El CHSLD es un establecimiento quebequense que ofrece cuidados de larga duración a las personas en pérdida de autonomía." },
      { question: "¿Por qué la precisión terminológica es importante en el entorno profesional?", options: ["No es importante", "Refuerza la credibilidad profesional percibida", "Siempre complica la comunicación", "No tiene ningún vínculo con la experiencia"], explanation: "Usar el término exacto en lugar de una paráfrasis demuestra un dominio del campo y refuerza la confianza." },
      { question: "¿Qué significa el acrónimo CNESST?", options: ["Un tipo de cuenta bancaria", "Comisión de normas, equidad, salud y seguridad del trabajo", "Un sindicato estudiantil", "Un canal de televisión"], explanation: "La CNESST regula las normas del trabajo, la equidad salarial y la salud-seguridad en Quebec." },
      { question: "¿Cómo debe aprenderse la terminología sectorial según el módulo?", options: ["Por memorización aislada de listas", "En contexto de uso real", "No se aprende", "Únicamente de forma oral"], explanation: "Aprender la terminología en contexto favorece una mejor retención y un uso apropiado." },
    ],
  },
  {
    title: "Examen final y certificación",
    objectives: [
      "Demostrar el dominio del francés profesional adquirido",
      "Aprobar una simulación de entrevista y de redacción profesional",
      "Obtener el certificado ARCADINS de francés de los negocios",
    ],
    content: [
      "El examen final evalúa las cuatro competencias trabajadas durante la formación: comprensión oral de una reunión simulada, redacción de un correo profesional, presentación oral de un proyecto, y simulación de entrevista de trabajo.",
      "Los evaluadores prestan una atención particular a la claridad del mensaje en lugar de la perfección gramatical absoluta — el objetivo es la comunicación profesional eficaz, no el dominio académico de la lengua.",
      "Al aprobar el examen, se entrega un certificado digital ARCADINS, que atestigua el nivel de francés profesional alcanzado y que puede añadirse al CV o presentarse a un empleador potencial.",
    ],
    keyTakeaways: [
      "El examen evalúa la comunicación eficaz, no la perfección gramatical",
      "Las cuatro competencias (oral, escrito, presentación, interacción) son todas evaluadas",
      "El certificado entregado es una ventaja concreta para la búsqueda de empleo",
    ],
    resourceLabels: [],
    quiz: [
      { question: "¿Qué competencias se evalúan durante el examen final?", options: ["Únicamente la gramática escrita", "Comprensión oral, redacción, presentación oral, simulación de entrevista", "Solo el dictado", "La velocidad de mecanografía"], explanation: "El examen final cubre las cuatro competencias trabajadas a lo largo de la formación, de manera integrada." },
      { question: "¿Qué evalúan prioritariamente los correctores según el módulo?", options: ["La perfección gramatical absoluta", "La claridad del mensaje y la comunicación eficaz", "El acento del candidato", "Solo la velocidad de respuesta"], explanation: "El objetivo es la comunicación profesional eficaz, no un dominio académico perfecto de la lengua." },
      { question: "¿Qué recibe el estudiante al aprobar el examen?", options: ["Nada especial", "Un certificado digital ARCADINS", "Una multa", "Un diploma universitario internacional"], explanation: "Se entrega un certificado digital ARCADINS, que atestigua oficialmente el nivel alcanzado." },
      { question: "El certificado entregado puede usarse para:", options: ["Nada concreto", "Ser añadido al CV o presentado a un empleador", "Únicamente un uso personal sin valor profesional", "Viajar sin visa"], explanation: "El certificado constituye una prueba concreta de competencia lingüística profesional utilizable en una búsqueda de empleo." },
      { question: "¿El examen final incluye una simulación de entrevista de trabajo?", options: ["No, nunca", "Sí, es uno de los componentes evaluados", "Solo para algunos estudiantes", "Únicamente en opción de pago"], explanation: "La simulación de entrevista forma parte integral de la evaluación final del programa." },
      { question: "¿Cuál es el objetivo global de esta formación en francés de los negocios?", options: ["El dominio académico teórico únicamente", "La comunicación profesional eficaz en el entorno laboral", "Aprobar un examen universitario de literatura", "Aprender a escribir poesía"], explanation: "La formación busca una aplicación práctica y profesional del francés, adaptada al mundo laboral quebequense." },
    ],
  },
];

const it: CourseTranslation = [
  {
    title: "Francese professionale: basi e vocabolario",
    objectives: [
      "Acquisire il vocabolario di base del mondo del lavoro quebecchese",
      "Distinguere il registro formale e informale in contesto professionale",
      "Costruire frasi professionali semplici e chiare",
    ],
    content: [
      "Il francese professionale si distingue dal francese corrente per un vocabolario specifico: poste (posizione), embauche (assunzione), échéancier (scadenzario), mandat (mandato), livrable (deliverable). Padroneggiare questi termini di base è essenziale prima di affrontare situazioni di comunicazione più complesse.",
      "Il registro formale si usa con i superiori gerarchici, i clienti e nelle comunicazioni scritte ufficiali. Il registro più informale, benché presente in alcune culture aziendali quebecchesi, deve essere usato con prudenza dai nuovi arrivati fino a conoscere bene i codici dell'ambiente.",
      "La costruzione di frasi professionali privilegia la chiarezza e la concisione. Evitare le frasi troppo lunghe, usare verbi d'azione precisi (proporre, raccomandare, analizzare) e strutturare le proprie idee con connettori logici (prima, poi, di conseguenza).",
    ],
    keyTakeaways: [
      "Il vocabolario professionale di base deve essere automatizzato prima delle situazioni complesse",
      "Il registro formale resta la scelta sicura in un nuovo ambiente di lavoro",
      "La chiarezza prevale sempre sulla sofisticazione del vocabolario",
    ],
    resourceLabels: [
      "Office québécois de la langue française — Vocabolario del lavoro",
      "TV5Monde — Francese professionale",
    ],
    quiz: [
      { question: "Cosa significa il termine 'échéancier' in contesto professionale?", options: ["Un tipo di caffè", "Un calendario previsionale delle tappe e delle scadenze di un progetto", "Una posizione dirigenziale", "Un software di contabilità"], explanation: "Un échéancier è un documento che pianifica le diverse tappe di un progetto con le loro date limite." },
      { question: "Quando il registro formale è particolarmente raccomandato?", options: ["Mai", "Con i superiori gerarchici e i clienti", "Solo tra amici", "Solo all'orale"], explanation: "Il registro formale è la scelta sicura nelle comunicazioni con la gerarchia e la clientela, soprattutto per un nuovo arrivato." },
      { question: "Quale elemento è raccomandato per strutturare logicamente le proprie idee allo scritto?", options: ["Le emoji", "I connettori logici (prima, poi, di conseguenza)", "Le abbreviazioni degli SMS", "Il silenzio"], explanation: "I connettori logici aiutano il lettore a seguire la progressione del ragionamento in modo chiaro." },
      { question: "Cosa vuol dire 'livrable' in ambiente professionale?", options: ["Un pacco postale", "Un risultato concreto atteso da un progetto o un compito", "Un tipo di bevanda", "Un giorno festivo"], explanation: "Un livrable designa un risultato tangibile atteso a una data tappa di un progetto (rapporto, prototipo, documento, ecc.)." },
      { question: "Quale qualità deve prevalere nella redazione professionale secondo il modulo?", options: ["La sofisticazione del vocabolario", "La chiarezza", "La lunghezza delle frasi", "L'uso del gergo"], explanation: "La chiarezza e la concisione sono valorizzate in ambiente professionale, più della complessità del vocabolario." },
      { question: "Perché il vocabolario professionale di base deve essere automatizzato?", options: ["Per impressionare i colleghi", "Per potersi concentrare poi su situazioni di comunicazione più complesse", "Non è necessario", "Solo per superare un esame"], explanation: "Padroneggiare le basi facilita la disinvoltura in scambi professionali più esigenti in seguito." },
    ],
  },
  {
    title: "Comunicazione orale in azienda",
    objectives: [
      "Partecipare efficacemente a una riunione in francese",
      "Presentare un'idea o un progetto in modo strutturato",
      "Usare le formule di cortesia appropriate al contesto quebecchese",
    ],
    content: [
      "Partecipare a una riunione richiede di saper prendere la parola al momento giusto, riformulare per confermare la propria comprensione e porre domande di chiarimento senza timore. I quebecchesi valorizzano una comunicazione diretta ma cortese.",
      "Una presentazione strutturata segue generalmente il piano: contesto, problema, soluzione proposta, benefici attesi. L'uso di transizioni chiare aiuta l'uditorio a seguire il ragionamento, anche per un parlante non nativo.",
      "Le formule di cortesia variano secondo il contesto: un'email professionale inizia spesso con 'Bonjour' seguito dal nome (cultura più informale che in Francia), mentre una riunione formale conserva marche di rispetto come 'Merci de votre attention' in conclusione.",
    ],
    keyTakeaways: [
      "Riformulare per confermare la propria comprensione evita i malintesi costosi",
      "Una struttura chiara compensa un vocabolario ancora limitato",
      "Il darsi del tu e l'uso del nome sono correnti in Quebec, anche in contesto professionale",
    ],
    resourceLabels: [
      "Radio-Canada — Risorse linguistiche",
    ],
    quiz: [
      { question: "Quale tecnica aiuta a evitare i malintesi in riunione?", options: ["Non parlare mai", "Riformulare per confermare la propria comprensione", "Parlare il più velocemente possibile", "Evitare di porre domande"], explanation: "Riformulare ciò che si è capito permette di verificare e correggere ogni incomprensione prima che diventi un problema." },
      { question: "Quale piano struttura generalmente una presentazione professionale efficace?", options: ["Conclusione, contesto, problema", "Contesto, problema, soluzione, benefici", "Nessun ordine è importante", "Solo benefici"], explanation: "Questo piano logico guida l'uditorio dal contesto verso una soluzione chiara e i suoi vantaggi." },
      { question: "Come inizia generalmente un'email professionale in Quebec?", options: ["Con 'Cher Monsieur le Directeur'", "Con 'Bonjour' seguito dal nome", "Senza alcun saluto", "Sempre in inglese"], explanation: "La cultura quebecchese è più informale che in Francia, e l'uso del nome fin dall'inizio è corrente e ben accettato." },
      { question: "Cosa permette una struttura chiara in una presentazione, anche con un vocabolario limitato?", options: ["Niente, il vocabolario è tutto ciò che conta", "Di compensare e restare comprensibile nonostante i limiti linguistici", "Di evitare completamente di parlare", "Di parlare più velocemente"], explanation: "Una buona struttura aiuta l'uditorio a seguire il messaggio anche se il vocabolario del parlante è ancora in sviluppo." },
      { question: "Cosa caratterizza la comunicazione in Quebec secondo il modulo?", options: ["Una franchezza diretta ma cortese", "Una formalità estrema e rigida", "L'assenza totale di cortesia", "Il silenzio sistematico"], explanation: "I quebecchesi valorizzano generalmente una comunicazione diretta pur restando cortesi e rispettosi." },
      { question: "Il darsi del tu in ambiente professionale in Quebec è:", options: ["Rigorosamente vietato", "Corrente, anche con la gerarchia", "Riservato solo agli amici stretti", "Un grave affronto"], explanation: "A differenza di altre culture francofone, il darsi del tu è ampiamente diffuso al lavoro in Quebec." },
    ],
  },
  {
    title: "Redazione professionale (email, rapporti)",
    objectives: [
      "Redigere un'email professionale chiara e completa",
      "Strutturare un rapporto semplice con introduzione, sviluppo, conclusione",
      "Evitare gli anglicismi correnti nel francese degli affari",
    ],
    content: [
      "Un'email professionale efficace contiene un oggetto preciso, una formula d'apertura adatta, un messaggio strutturato in paragrafi brevi e una formula di saluto finale. Rileggere sempre prima dell'invio per evitare gli errori che nuocciono alla credibilità.",
      "Un rapporto professionale segue una struttura logica: riassunto esecutivo (se necessario), contesto, metodologia, risultati, raccomandazioni. I titoli e i sottotitoli facilitano la lettura rapida da parte di destinatari di fretta.",
      "Il francese quebecchese degli affari evita alcuni anglicismi diffusi all'orale: si dice 'courriel' invece di 'email', 'clavarder' invece di 'chatter', 'pourriel' invece di 'spam'. Questi termini sono d'uso ufficiale nelle comunicazioni scritte.",
    ],
    keyTakeaways: [
      "Un oggetto d'email preciso aumenta il tasso di risposta e la chiarezza",
      "La struttura di un rapporto deve permettere una lettura rapida in diagonale",
      "I termini francesi ufficiali sono attesi nelle comunicazioni scritte professionali",
    ],
    resourceLabels: [
      "Banque de dépannage linguistique — OQLF",
    ],
    quiz: [
      { question: "Quale termine ufficiale quebecchese sostituisce 'email'?", options: ["Courriel", "Mailbox", "Internet", "Messagerie"], explanation: "'Courriel' è il termine ufficiale usato in Quebec al posto dell'anglicismo 'email'." },
      { question: "Quale termine sostituisce ufficialmente 'spam' in francese quebecchese?", options: ["Déchet numérique", "Pourriel", "Junk mail", "Bloqueur"], explanation: "'Pourriel' è il termine ufficiale francese per designare le email indesiderate (spam)." },
      { question: "Cosa deve contenere un'email professionale efficace?", options: ["Un oggetto vago", "Un oggetto preciso e una formula di saluto finale", "Nessuna struttura particolare", "Solo immagini"], explanation: "Un oggetto preciso e una struttura chiara con saluto finale aumentano la chiarezza e la professionalità del messaggio." },
      { question: "Qual è la prima tappa di un rapporto professionale ben strutturato?", options: ["La conclusione", "Il contesto (dopo un riassunto esecutivo se necessario)", "Gli allegati", "Nessuna tappa è richiesta"], explanation: "Il rapporto inizia generalmente con il contesto che situa l'argomento prima di sviluppare metodologia e risultati." },
      { question: "Cosa sostituisce il termine 'clavarder'?", options: ["Stampare", "Chattare (conversare online)", "Cancellare", "Salvare"], explanation: "'Clavarder' è il termine quebecchese ufficiale per designare la conversazione online con la tastiera (chat)." },
      { question: "Perché bisogna sempre rileggere un'email prima dell'invio?", options: ["Non è necessario", "Per evitare gli errori che nuocciono alla credibilità professionale", "Per perdere tempo", "Per rispettare una legge"], explanation: "Gli errori non corretti possono nuocere all'immagine professionale del mittente." },
    ],
  },
  {
    title: "Francese quebecchese: espressioni e cultura",
    objectives: [
      "Riconoscere le espressioni quebecchesi correnti in ambiente professionale",
      "Comprendere le sfumature culturali della comunicazione al lavoro",
      "Evitare i malintesi legati alle differenze linguistiche regionali",
    ],
    content: [
      "Il francese quebecchese comporta espressioni proprie dell'ambiente professionale: 'faire du pouce' (approfittare di un'opportunità), 'capoter' (essere entusiasti o sopraffatti secondo il contesto), 'c'est correct' (è accettabile). Comprendere queste espressioni facilita l'integrazione sociale al lavoro.",
      "La cultura professionale quebecchese valorizza l'uguaglianza gerarchica apparente: i dipendenti danno spesso del tu ai loro superiori e le riunioni incoraggiano la partecipazione di tutti, a differenza di culture più gerarchiche.",
      "I nuovi arrivati devono anche adattarsi al ritmo di comunicazione: i quebecchesi apprezzano generalmente la franchezza misurata, evitando i confronti diretti ma valorizzando l'onestà nel feedback professionale.",
    ],
    keyTakeaways: [
      "Le espressioni regionali facilitano l'integrazione ma devono essere usate con discernimento",
      "La cultura quebecchese valorizza una gerarchia meno marcata che altrove nella francofonia",
      "Osservare prima di imitare resta la migliore strategia di adattamento culturale",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique",
    ],
    quiz: [
      { question: "Cosa significa l'espressione quebecchese 'c'est correct'?", options: ["È un errore grave", "È accettabile", "È vietato", "È urgente"], explanation: "'C'est correct' è un'espressione corrente che significa che qualcosa è accettabile o soddisfacente." },
      { question: "Come descrivere la gerarchia in ambiente professionale quebecchese?", options: ["Estremamente rigida e formale", "Meno marcata, con un darsi del tu frequente anche verso i superiori", "Inesistente", "Identica ovunque nella francofonia"], explanation: "La cultura quebecchese valorizza una gerarchia meno marcata che in altri paesi francofoni." },
      { question: "Quale strategia è raccomandata per un nuovo arrivato di fronte alle espressioni regionali?", options: ["Usarle immediatamente senza discernimento", "Osservare prima di imitare", "Ignorarle completamente", "Correggerle sistematicamente"], explanation: "Osservare il contesto d'uso prima di adottare le espressioni da soli evita le gaffe culturali." },
      { question: "Come affrontano generalmente i quebecchesi il feedback professionale?", options: ["Con una franchezza misurata, onesta ma senza confronto diretto", "Non viene mai dato feedback", "Sempre in modo molto aggressivo", "Solo per iscritto anonimo"], explanation: "La cultura valorizza l'onestà del feedback evitando al contempo i confronti diretti e bruschi." },
      { question: "Cosa significa l'espressione 'faire du pouce' in contesto professionale?", options: ["Fare autostop solamente", "Approfittare di un'opportunità", "Rifiutare un'offerta", "Lasciare il proprio impiego"], explanation: "In questo contesto, 'faire du pouce' significa trarre vantaggio o approfittare di un'occasione favorevole." },
      { question: "Perché comprendere le espressioni regionali facilita l'integrazione?", options: ["Non è utile", "Aiuta a comprendere meglio i colleghi e a integrarsi socialmente", "Complica sempre la comunicazione", "Non ha alcun legame con il lavoro"], explanation: "Comprendere il linguaggio informale usato dai colleghi facilita le relazioni sociali e l'integrazione nel team." },
    ],
  },
  {
    title: "Preparazione ai colloqui di lavoro",
    objectives: [
      "Preparare risposte strutturate alle domande frequenti",
      "Presentare il proprio percorso in modo convincente in francese",
      "Porre domande pertinenti al datore di lavoro",
    ],
    content: [
      "Le domande frequenti nel colloquio quebecchese includono 'Parlez-moi de vous' (Mi parli di lei), 'Pourquoi ce poste vous intéresse-t-il' (Perché questa posizione la interessa) e 'Quelle est votre plus grande force/faiblesse' (Qual è il suo più grande punto di forza/debolezza). Il metodo STAR (Situazione, Compito, Azione, Risultato) struttura efficacemente le risposte comportamentali.",
      "Presentare il proprio percorso internazionale come un vantaggio invece che un ostacolo cambia la percezione del datore di lavoro: mettere in avanti l'adattabilità, le competenze trasferibili e la motivazione a contribuire all'economia quebecchese.",
      "Porre domande alla fine del colloquio dimostra l'interesse reale per la posizione: informarsi sul team, sulle sfide attuali del dipartimento o sulle prospettive di evoluzione mostra una riflessione seria, non solo il desiderio di ottenere un impiego.",
    ],
    keyTakeaways: [
      "Il metodo STAR struttura risposte chiare e memorabili",
      "L'esperienza internazionale deve essere presentata come un valore aggiunto",
      "Porre domande pertinenti alla fine del colloquio distingue i candidati seri",
    ],
    resourceLabels: [
      "Emploi-Québec — Guida alla preparazione al colloquio",
    ],
    quiz: [
      { question: "Cosa significa il metodo STAR usato nel colloquio?", options: ["Situazione, Compito, Azione, Risultato", "Salario, Lavoro, Vantaggi, Pensione", "Sorriso, Abbigliamento, Atteggiamento, Rete", "Nessun significato particolare"], explanation: "STAR struttura le risposte comportamentali descrivendo la Situazione, il Compito, l'Azione presa e il Risultato ottenuto." },
      { question: "Come deve essere presentata l'esperienza internazionale secondo il modulo?", options: ["Come un ostacolo da nascondere", "Come un vantaggio e un valore aggiunto", "Non bisogna mai parlarne", "Come una scusa"], explanation: "L'esperienza internazionale deve essere valorizzata come una fonte di adattabilità e competenze trasferibili." },
      { question: "Perché porre domande alla fine di un colloquio è raccomandato?", options: ["Non è mai raccomandato", "Per dimostrare un interesse reale e una riflessione seria per la posizione", "Per prolungare inutilmente il colloquio", "Per negoziare immediatamente il salario"], explanation: "Porre domande pertinenti mostra al datore di lavoro che il candidato ha riflettuto seriamente sulla posizione e sull'organizzazione." },
      { question: "Quale domanda frequente è menzionata nel modulo?", options: ["Qual è il suo segno zodiacale?", "Mi parli di lei (Parlez-moi de vous)", "Quanti figli ha?", "Qual è la sua religione?"], explanation: "'Parlez-moi de vous' è una domanda d'apertura molto corrente nel colloquio di lavoro in Quebec." },
      { question: "Quale tipo di competenze bisogna mettere in avanti provenendo da un percorso internazionale?", options: ["Nessuna competenza è trasferibile", "Le competenze trasferibili e l'adattabilità", "Solo i diplomi ottenuti all'estero", "Il luogo di nascita"], explanation: "Le competenze trasferibili e la capacità di adattamento sono argomenti forti per un percorso internazionale." },
      { question: "Il metodo STAR è particolarmente utile per quale tipo di domanda?", options: ["Solo le domande sul salario", "Le domande comportamentali", "Le domande sul meteo", "Nessuna domanda specifica"], explanation: "STAR è concepito specificamente per strutturare le risposte alle domande comportamentali che richiedono esempi concreti." },
    ],
  },
  {
    title: "Negoziazione e presentazione in francese",
    objectives: [
      "Usare un vocabolario di negoziazione appropriato",
      "Presentare una proposta con sicurezza",
      "Gestire le obiezioni in modo costruttivo",
    ],
    content: [
      "Il vocabolario di negoziazione include espressioni chiave: 'Je propose que...' (Propongo che), 'Serait-il possible de...' (Sarebbe possibile), 'Je comprends votre point, cependant...' (Capisco il suo punto, tuttavia). Queste formule permettono di esprimere un disaccordo pur mantenendo una relazione professionale cordiale.",
      "Presentare una proposta con sicurezza non significa essere aggressivi: si tratta di strutturare la propria argomentazione con fatti, anticipare le obiezioni possibili e proporre soluzioni invece di enunciare semplicemente un problema.",
      "Gestire le obiezioni in modo costruttivo implica ascoltare completamente l'obiezione prima di rispondere, riformulare per mostrare la propria comprensione, e poi apportare una risposta fattuale invece che difensiva.",
    ],
    keyTakeaways: [
      "Il disaccordo professionale si esprime tramite formule sfumate, non rifiuti diretti",
      "Una buona negoziazione anticipa le obiezioni prima che siano sollevate",
      "Ascoltare completamente prima di rispondere disinnesca la maggior parte delle tensioni",
    ],
    resourceLabels: [
      "HEC Montréal — Risorse in negoziazione",
    ],
    quiz: [
      { question: "Quale formula permette di esprimere un disaccordo restando cordiali?", options: ["'Lei ha torto'", "'Je comprends votre point, cependant...' (Capisco il suo punto, tuttavia)", "'È falso'", "Il silenzio completo"], explanation: "Questa formula riconosce il punto di vista dell'altro pur introducendo con sfumatura un disaccordo o una precisazione." },
      { question: "Cosa significa presentare una proposta 'con sicurezza' secondo il modulo?", options: ["Essere aggressivi", "Strutturare la propria argomentazione con fatti, senza aggressività", "Parlare molto forte", "Evitare ogni contatto visivo"], explanation: "La sicurezza si manifesta con un'argomentazione fattuale e strutturata, non con l'aggressività." },
      { question: "Qual è la prima tappa per gestire un'obiezione in modo costruttivo?", options: ["Rispondere immediatamente senza ascoltare", "Ascoltare completamente l'obiezione prima di rispondere", "Ignorare l'obiezione", "Cambiare argomento"], explanation: "Ascoltare pienamente prima di rispondere permette di comprendere realmente la preoccupazione e di rispondervi adeguatamente." },
      { question: "Cosa deve fare una buona negoziazione prima che le obiezioni siano sollevate?", options: ["Niente di speciale", "Anticiparle", "Evitarle completamente evitando l'argomento", "Ignorarle"], explanation: "Anticipare le obiezioni possibili permette di preparare risposte solide in anticipo." },
      { question: "Cosa permette la riformulazione durante un'obiezione?", options: ["Di perdere tempo inutilmente", "Di mostrare la propria comprensione della preoccupazione dell'altro", "Di contraddire immediatamente", "Di evitare di rispondere"], explanation: "Riformulare dimostra un ascolto attivo e facilita una risposta pertinente all'obiezione sollevata." },
      { question: "Perché privilegiare una risposta fattuale invece che difensiva di fronte a un'obiezione?", options: ["Perché è più rapido", "Perché i fatti sono più convincenti e disinnescano le tensioni", "Non è raccomandato", "Perché è richiesto dalla legge"], explanation: "Una risposta basata sui fatti è generalmente più persuasiva e professionale di una reazione emotiva o difensiva." },
    ],
  },
  {
    title: "Terminologia settoriale (finanza, tech, salute)",
    objectives: [
      "Padroneggiare il vocabolario specifico del settore di attività mirato",
      "Comprendere gli acronimi correnti in ambiente professionale quebecchese",
      "Usare una terminologia precisa nel proprio campo di competenza",
    ],
    content: [
      "Ogni settore professionale possiede la sua terminologia propria: in finanza, si parla di 'REER', 'CELI', 'relevé bancaire' (estratto conto); in tecnologia, di 'infonuagique' (cloud), 'pourriel'; in salute, di 'CLSC', 'CHSLD'. Questa padronanza lessicale è indispensabile per un'integrazione professionale rapida.",
      "Gli acronimi istituzionali quebecchesi (RAMQ, CNESST, CSST, SAAQ) ricorrono frequentemente nelle comunicazioni amministrative e professionali. Comprenderli evita malintesi costosi nelle pratiche ufficiali.",
      "La precisione terminologica dimostra la competenza: usare il termine esatto invece di una parafrasi generale rafforza la credibilità professionale, in particolare nei settori tecnici o regolamentati.",
    ],
    keyTakeaways: [
      "La terminologia settoriale deve essere appresa in contesto, non per memorizzazione isolata",
      "Gli acronimi istituzionali quebecchesi sono essenziali da conoscere per le pratiche amministrative",
      "La precisione lessicale rafforza la credibilità professionale percepita",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique — Ricerca per settore",
    ],
    quiz: [
      { question: "Cosa significa l'acronimo RAMQ?", options: ["Régie de l'assurance maladie du Québec (ente dell'assicurazione malattia del Quebec)", "Rete d'acquisto municipale", "Regolamento amministrativo dei mercati", "Nessun significato ufficiale"], explanation: "La RAMQ è la Régie de l'assurance maladie du Québec, l'ente responsabile della copertura sanitaria pubblica." },
      { question: "Cosa designa il termine 'infonuagique'?", options: ["Un'applicazione meteo", "Il cloud computing", "Un tipo di caffè", "Un software di contabilità"], explanation: "'Infonuagique' è il termine francese ufficiale quebecchese per designare il 'cloud computing'." },
      { question: "Cos'è un CHSLD?", options: ["Un centro di accoglienza di cure di lunga durata", "Una scuola secondaria", "Un tipo di imposta", "Una compagnia di assicurazioni"], explanation: "Il CHSLD è una struttura quebecchese che offre cure di lunga durata alle persone in perdita di autonomia." },
      { question: "Perché la precisione terminologica è importante in ambiente professionale?", options: ["Non è importante", "Rafforza la credibilità professionale percepita", "Complica sempre la comunicazione", "Non ha alcun legame con la competenza"], explanation: "Usare il termine esatto invece di una parafrasi dimostra una padronanza del campo e rafforza la fiducia." },
      { question: "Cosa significa l'acronimo CNESST?", options: ["Un tipo di conto bancario", "Commissione delle norme, dell'equità, della salute e della sicurezza del lavoro", "Un sindacato studentesco", "Un canale televisivo"], explanation: "La CNESST regola le norme del lavoro, l'equità salariale e la salute-sicurezza in Quebec." },
      { question: "Come deve essere appresa la terminologia settoriale secondo il modulo?", options: ["Per memorizzazione isolata di liste", "In contesto d'uso reale", "Non si apprende", "Solo all'orale"], explanation: "Apprendere la terminologia in contesto favorisce una migliore ritenzione e un uso appropriato." },
    ],
  },
  {
    title: "Esame finale e certificazione",
    objectives: [
      "Dimostrare la padronanza del francese professionale acquisito",
      "Superare una simulazione di colloquio e di redazione professionale",
      "Ottenere il certificato ARCADINS di francese degli affari",
    ],
    content: [
      "L'esame finale valuta le quattro competenze lavorate durante la formazione: comprensione orale di una riunione simulata, redazione di un'email professionale, presentazione orale di un progetto, e simulazione di colloquio di lavoro.",
      "I valutatori prestano un'attenzione particolare alla chiarezza del messaggio piuttosto che alla perfezione grammaticale assoluta — l'obiettivo è la comunicazione professionale efficace, non la padronanza accademica della lingua.",
      "Al superamento dell'esame, viene rilasciato un certificato digitale ARCADINS, che attesta il livello di francese professionale raggiunto e che può essere aggiunto al CV o presentato a un potenziale datore di lavoro.",
    ],
    keyTakeaways: [
      "L'esame valuta la comunicazione efficace, non la perfezione grammaticale",
      "Tutte e quattro le competenze (orale, scritto, presentazione, interazione) sono valutate",
      "Il certificato rilasciato è un vantaggio concreto per la ricerca di impiego",
    ],
    resourceLabels: [],
    quiz: [
      { question: "Quali competenze sono valutate durante l'esame finale?", options: ["Solo la grammatica scritta", "Comprensione orale, redazione, presentazione orale, simulazione di colloquio", "Solo il dettato", "La velocità di battitura"], explanation: "L'esame finale copre le quattro competenze lavorate durante tutta la formazione, in modo integrato." },
      { question: "Cosa valutano prioritariamente i correttori secondo il modulo?", options: ["La perfezione grammaticale assoluta", "La chiarezza del messaggio e la comunicazione efficace", "L'accento del candidato", "Solo la velocità di risposta"], explanation: "L'obiettivo è la comunicazione professionale efficace, non una padronanza accademica perfetta della lingua." },
      { question: "Cosa riceve lo studente al superamento dell'esame?", options: ["Niente di speciale", "Un certificato digitale ARCADINS", "Una multa", "Un diploma universitario internazionale"], explanation: "Viene rilasciato un certificato digitale ARCADINS, che attesta ufficialmente il livello raggiunto." },
      { question: "Il certificato rilasciato può essere usato per:", options: ["Niente di concreto", "Essere aggiunto al CV o presentato a un datore di lavoro", "Solo un uso personale senza valore professionale", "Viaggiare senza visto"], explanation: "Il certificato costituisce una prova concreta di competenza linguistica professionale utilizzabile in una ricerca di impiego." },
      { question: "L'esame finale include una simulazione di colloquio di lavoro?", options: ["No, mai", "Sì, è una delle componenti valutate", "Solo per alcuni studenti", "Solo in opzione a pagamento"], explanation: "La simulazione di colloquio fa parte integrante della valutazione finale del programma." },
      { question: "Qual è l'obiettivo globale di questa formazione in francese degli affari?", options: ["La padronanza accademica teorica solamente", "La comunicazione professionale efficace in ambiente di lavoro", "Superare un esame universitario di letteratura", "Imparare a scrivere poesia"], explanation: "La formazione mira a un'applicazione pratica e professionale del francese, adattata al mondo del lavoro quebecchese." },
    ],
  },
];

const pt: CourseTranslation = [
  {
    title: "Francês profissional: bases e vocabulário",
    objectives: [
      "Adquirir o vocabulário básico do mundo do trabalho quebequense",
      "Distinguir o registo formal e informal em contexto profissional",
      "Construir frases profissionais simples e claras",
    ],
    content: [
      "O francês profissional distingue-se do francês corrente por um vocabulário específico: poste (cargo), embauche (contratação), échéancier (cronograma), mandat (mandato), livrable (entregável). Dominar estes termos básicos é essencial antes de abordar situações de comunicação mais complexas.",
      "O registo formal utiliza-se com os superiores hierárquicos, os clientes e nas comunicações escritas oficiais. O registo mais informal, embora presente em algumas culturas de empresa quebequenses, deve ser utilizado com prudência pelos recém-chegados até conhecerem bem os códigos do meio.",
      "A construção de frases profissionais privilegia a clareza e a concisão. Evitar as frases demasiado longas, usar verbos de ação precisos (propor, recomendar, analisar) e estruturar as ideias com conectores lógicos (primeiro, depois, por conseguinte).",
    ],
    keyTakeaways: [
      "O vocabulário profissional básico deve ser automatizado antes das situações complexas",
      "O registo formal continua a ser a aposta segura num novo ambiente de trabalho",
      "A clareza prima sempre sobre a sofisticação do vocabulário",
    ],
    resourceLabels: [
      "Office québécois de la langue française — Vocabulário do trabalho",
      "TV5Monde — Francês profissional",
    ],
    quiz: [
      { question: "O que significa o termo 'échéancier' em contexto profissional?", options: ["Um tipo de café", "Um calendário previsional das etapas e prazos de um projeto", "Um cargo de direção", "Um software de contabilidade"], explanation: "Um échéancier é um documento que planeia as diferentes etapas de um projeto com as suas datas limite." },
      { question: "Quando o registo formal é particularmente recomendado?", options: ["Nunca", "Com os superiores hierárquicos e os clientes", "Apenas entre amigos", "Só ao falar"], explanation: "O registo formal é a aposta segura nas comunicações com a hierarquia e a clientela, sobretudo para um recém-chegado." },
      { question: "Que elemento é recomendado para estruturar logicamente as ideias por escrito?", options: ["Os emojis", "Os conectores lógicos (primeiro, depois, por conseguinte)", "As abreviaturas de mensagens de texto", "O silêncio"], explanation: "Os conectores lógicos ajudam o leitor a seguir a progressão do raciocínio de maneira clara." },
      { question: "O que quer dizer 'livrable' no ambiente profissional?", options: ["Uma encomenda postal", "Um resultado concreto esperado de um projeto ou tarefa", "Um tipo de bebida", "Um feriado"], explanation: "Um livrable designa um resultado tangível esperado numa etapa dada de um projeto (relatório, protótipo, documento, etc.)." },
      { question: "Que qualidade deve primar na redação profissional segundo o módulo?", options: ["A sofisticação do vocabulário", "A clareza", "O comprimento das frases", "O uso de gíria"], explanation: "A clareza e a concisão são valorizadas no ambiente profissional, mais do que a complexidade do vocabulário." },
      { question: "Por que o vocabulário profissional básico deve ser automatizado?", options: ["Para impressionar os colegas", "Para poder concentrar-se depois em situações de comunicação mais complexas", "Não é necessário", "Apenas para passar num exame"], explanation: "Dominar as bases facilita a desenvoltura em trocas profissionais mais exigentes posteriormente." },
    ],
  },
  {
    title: "Comunicação oral na empresa",
    objectives: [
      "Participar eficazmente numa reunião em francês",
      "Apresentar uma ideia ou um projeto de maneira estruturada",
      "Usar as fórmulas de cortesia apropriadas ao contexto quebequense",
    ],
    content: [
      "Participar numa reunião exige saber tomar a palavra no momento certo, reformular para confirmar a compreensão e fazer perguntas de clarificação sem receio. Os quebequenses valorizam uma comunicação direta mas cortês.",
      "Uma apresentação estruturada segue geralmente o plano: contexto, problema, solução proposta, benefícios esperados. O uso de transições claras ajuda o auditório a seguir o raciocínio, mesmo para um falante não nativo.",
      "As fórmulas de cortesia variam conforme o contexto: um email profissional começa frequentemente por 'Bonjour' seguido do nome próprio (cultura mais informal do que em França), enquanto uma reunião formal conserva marcas de respeito como 'Merci de votre attention' na conclusão.",
    ],
    keyTakeaways: [
      "Reformular para confirmar a compreensão evita os mal-entendidos custosos",
      "Uma estrutura clara compensa um vocabulário ainda limitado",
      "O tratamento por 'tu' e o uso do nome próprio são correntes no Quebec, mesmo em contexto profissional",
    ],
    resourceLabels: [
      "Radio-Canada — Recursos linguísticos",
    ],
    quiz: [
      { question: "Que técnica ajuda a evitar os mal-entendidos numa reunião?", options: ["Nunca falar", "Reformular para confirmar a compreensão", "Falar o mais rápido possível", "Evitar fazer perguntas"], explanation: "Reformular o que se compreendeu permite verificar e corrigir qualquer incompreensão antes que se torne um problema." },
      { question: "Que plano estrutura geralmente uma apresentação profissional eficaz?", options: ["Conclusão, contexto, problema", "Contexto, problema, solução, benefícios", "Nenhuma ordem é importante", "Apenas benefícios"], explanation: "Este plano lógico guia o auditório do contexto para uma solução clara e as suas vantagens." },
      { question: "Como começa geralmente um email profissional no Quebec?", options: ["Por 'Cher Monsieur le Directeur'", "Por 'Bonjour' seguido do nome próprio", "Sem qualquer saudação", "Sempre em inglês"], explanation: "A cultura quebequense é mais informal do que em França, e o uso do nome próprio desde o início é corrente e bem aceite." },
      { question: "O que permite uma estrutura clara numa apresentação, mesmo com um vocabulário limitado?", options: ["Nada, o vocabulário é tudo o que conta", "Compensar e continuar a ser compreensível apesar dos limites linguísticos", "Evitar completamente falar", "Falar mais rápido"], explanation: "Uma boa estrutura ajuda o auditório a seguir a mensagem mesmo que o vocabulário do falante ainda esteja em desenvolvimento." },
      { question: "O que caracteriza a comunicação no Quebec segundo o módulo?", options: ["Uma franqueza direta mas cortês", "Uma formalidade extrema e rígida", "A ausência total de cortesia", "O silêncio sistemático"], explanation: "Os quebequenses valorizam geralmente uma comunicação direta mantendo-se corteses e respeitosos." },
      { question: "O tratamento por 'tu' no ambiente profissional no Quebec é:", options: ["Estritamente proibido", "Corrente, mesmo com a hierarquia", "Reservado apenas aos amigos próximos", "Uma grave ofensa"], explanation: "Ao contrário de outras culturas francófonas, o tratamento por 'tu' está amplamente difundido no trabalho no Quebec." },
    ],
  },
  {
    title: "Redação profissional (emails, relatórios)",
    objectives: [
      "Redigir um email profissional claro e completo",
      "Estruturar um relatório simples com introdução, desenvolvimento, conclusão",
      "Evitar os anglicismos correntes no francês dos negócios",
    ],
    content: [
      "Um email profissional eficaz contém um assunto preciso, uma fórmula de saudação adaptada, uma mensagem estruturada em parágrafos curtos e uma fórmula de despedida final. Reler sempre antes do envio para evitar os erros que prejudicam a credibilidade.",
      "Um relatório profissional segue uma estrutura lógica: resumo executivo (se necessário), contexto, metodologia, resultados, recomendações. Os títulos e subtítulos facilitam a leitura rápida por destinatários apressados.",
      "O francês quebequense dos negócios evita certos anglicismos difundidos na oralidade: diz-se 'courriel' em vez de 'email', 'clavarder' em vez de 'chatter', 'pourriel' em vez de 'spam'. Estes termos são de uso oficial nas comunicações escritas.",
    ],
    keyTakeaways: [
      "Um assunto de email preciso aumenta a taxa de resposta e a clareza",
      "A estrutura de um relatório deve permitir uma leitura rápida na diagonal",
      "Os termos franceses oficiais são esperados nas comunicações escritas profissionais",
    ],
    resourceLabels: [
      "Banque de dépannage linguistique — OQLF",
    ],
    quiz: [
      { question: "Que termo oficial quebequense substitui 'email'?", options: ["Courriel", "Mailbox", "Internet", "Messagerie"], explanation: "'Courriel' é o termo oficial utilizado no Quebec em vez do anglicismo 'email'." },
      { question: "Que termo substitui oficialmente 'spam' em francês quebequense?", options: ["Déchet numérique", "Pourriel", "Junk mail", "Bloqueur"], explanation: "'Pourriel' é o termo oficial francês para designar os emails indesejados (spam)." },
      { question: "O que deve conter um email profissional eficaz?", options: ["Um assunto vago", "Um assunto preciso e uma fórmula de despedida final", "Nenhuma estrutura particular", "Apenas imagens"], explanation: "Um assunto preciso e uma estrutura clara com despedida final aumentam a clareza e o profissionalismo da mensagem." },
      { question: "Qual é a primeira etapa de um relatório profissional bem estruturado?", options: ["A conclusão", "O contexto (após um resumo executivo se necessário)", "Os anexos", "Nenhuma etapa é exigida"], explanation: "O relatório começa geralmente pelo contexto que situa o tema antes de desenvolver metodologia e resultados." },
      { question: "O que substitui o termo 'clavarder'?", options: ["Imprimir", "Conversar (falar online)", "Apagar", "Guardar"], explanation: "'Clavarder' é o termo quebequense oficial para designar a conversa online por teclado (chat)." },
      { question: "Por que é preciso reler sempre um email antes do envio?", options: ["Não é necessário", "Para evitar os erros que prejudicam a credibilidade profissional", "Para perder tempo", "Para respeitar uma lei"], explanation: "Os erros não corrigidos podem prejudicar a imagem profissional do remetente." },
    ],
  },
  {
    title: "Francês quebequense: expressões e cultura",
    objectives: [
      "Reconhecer as expressões quebequenses correntes no ambiente profissional",
      "Compreender as nuances culturais da comunicação no trabalho",
      "Evitar os mal-entendidos ligados às diferenças linguísticas regionais",
    ],
    content: [
      "O francês quebequense comporta expressões próprias do ambiente profissional: 'faire du pouce' (aproveitar uma oportunidade), 'capoter' (estar entusiasmado ou sobrecarregado conforme o contexto), 'c'est correct' (é aceitável). Compreender estas expressões facilita a integração social no trabalho.",
      "A cultura profissional quebequense valoriza a igualdade hierárquica aparente: os empregados tratam frequentemente os seus superiores por 'tu' e as reuniões incentivam a participação de todos, ao contrário de culturas mais hierárquicas.",
      "Os recém-chegados devem também adaptar-se ao ritmo de comunicação: os quebequenses apreciam geralmente a franqueza comedida, evitando os confrontos diretos mas valorizando a honestidade no feedback profissional.",
    ],
    keyTakeaways: [
      "As expressões regionais facilitam a integração mas devem ser usadas com discernimento",
      "A cultura quebequense valoriza uma hierarquia menos marcada do que noutras partes da francofonia",
      "Observar antes de imitar continua a ser a melhor estratégia de adaptação cultural",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique",
    ],
    quiz: [
      { question: "O que significa a expressão quebequense 'c'est correct'?", options: ["É um erro grave", "É aceitável", "É proibido", "É urgente"], explanation: "'C'est correct' é uma expressão corrente que significa que algo é aceitável ou satisfatório." },
      { question: "Como descrever a hierarquia no ambiente profissional quebequense?", options: ["Extremamente rígida e formal", "Menos marcada, com um tratamento por 'tu' frequente mesmo para com os superiores", "Inexistente", "Idêntica em toda a francofonia"], explanation: "A cultura quebequense valoriza uma hierarquia menos marcada do que noutros países francófonos." },
      { question: "Que estratégia é recomendada para um recém-chegado perante as expressões regionais?", options: ["Usá-las imediatamente sem discernimento", "Observar antes de imitar", "Ignorá-las completamente", "Corrigi-las sistematicamente"], explanation: "Observar o contexto de uso antes de adotar as expressões evita as gafes culturais." },
      { question: "Como os quebequenses abordam geralmente o feedback profissional?", options: ["Com uma franqueza comedida, honesta mas sem confronto direto", "Nunca é dado feedback", "Sempre de maneira muito agressiva", "Apenas por escrito anónimo"], explanation: "A cultura valoriza a honestidade do feedback evitando ao mesmo tempo os confrontos diretos e bruscos." },
      { question: "O que significa a expressão 'faire du pouce' em contexto profissional?", options: ["Fazer boleia apenas", "Aproveitar uma oportunidade", "Recusar uma oferta", "Deixar o emprego"], explanation: "Neste contexto, 'faire du pouce' significa tirar partido ou aproveitar uma ocasião favorável." },
      { question: "Por que compreender as expressões regionais facilita a integração?", options: ["Não é útil", "Ajuda a compreender melhor os colegas e a integrar-se socialmente", "Complica sempre a comunicação", "Não tem qualquer ligação com o trabalho"], explanation: "Compreender a linguagem informal usada pelos colegas facilita as relações sociais e a integração na equipa." },
    ],
  },
  {
    title: "Preparação para as entrevistas de emprego",
    objectives: [
      "Preparar respostas estruturadas às perguntas frequentes",
      "Apresentar o seu percurso de maneira convincente em francês",
      "Fazer perguntas pertinentes ao empregador",
    ],
    content: [
      "As perguntas frequentes na entrevista quebequense incluem 'Parlez-moi de vous' (Fale-me de si), 'Pourquoi ce poste vous intéresse-t-il' (Por que este cargo lhe interessa) e 'Quelle est votre plus grande force/faiblesse' (Qual é o seu maior ponto forte/fraco). O método STAR (Situação, Tarefa, Ação, Resultado) estrutura eficazmente as respostas comportamentais.",
      "Apresentar o seu percurso internacional como uma vantagem em vez de um obstáculo muda a perceção do empregador: destacar a adaptabilidade, as competências transferíveis e a motivação para contribuir para a economia quebequense.",
      "Fazer perguntas no final da entrevista demonstra o interesse real pelo cargo: perguntar sobre a equipa, os desafios atuais do departamento ou as perspetivas de evolução mostra uma reflexão séria, não apenas o desejo de obter um emprego.",
    ],
    keyTakeaways: [
      "O método STAR estrutura respostas claras e memoráveis",
      "A experiência internacional deve ser apresentada como um valor acrescentado",
      "Fazer perguntas pertinentes no final da entrevista distingue os candidatos sérios",
    ],
    resourceLabels: [
      "Emploi-Québec — Guia de preparação para a entrevista",
    ],
    quiz: [
      { question: "O que significa o método STAR usado na entrevista?", options: ["Situação, Tarefa, Ação, Resultado", "Salário, Trabalho, Benefícios, Reforma", "Sorriso, Traje, Atitude, Rede", "Nenhuma significação particular"], explanation: "STAR estrutura as respostas comportamentais descrevendo a Situação, a Tarefa, a Ação tomada e o Resultado obtido." },
      { question: "Como deve ser apresentada a experiência internacional segundo o módulo?", options: ["Como um obstáculo a ocultar", "Como uma vantagem e um valor acrescentado", "Nunca se deve falar dela", "Como uma desculpa"], explanation: "A experiência internacional deve ser valorizada como uma fonte de adaptabilidade e competências transferíveis." },
      { question: "Por que fazer perguntas no final de uma entrevista é recomendado?", options: ["Nunca é recomendado", "Para demonstrar um interesse real e uma reflexão séria pelo cargo", "Para prolongar inutilmente a entrevista", "Para negociar imediatamente o salário"], explanation: "Fazer perguntas pertinentes mostra ao empregador que o candidato refletiu seriamente sobre o cargo e a organização." },
      { question: "Que pergunta frequente é mencionada no módulo?", options: ["Qual é o seu signo astrológico?", "Fale-me de si (Parlez-moi de vous)", "Quantos filhos tem?", "Qual é a sua religião?"], explanation: "'Parlez-moi de vous' é uma pergunta de abertura muito corrente na entrevista de emprego no Quebec." },
      { question: "Que tipo de competências se deve destacar vindo de um percurso internacional?", options: ["Nenhuma competência é transferível", "As competências transferíveis e a adaptabilidade", "Apenas os diplomas obtidos no estrangeiro", "O local de nascimento"], explanation: "As competências transferíveis e a capacidade de adaptação são argumentos fortes para um percurso internacional." },
      { question: "O método STAR é particularmente útil para que tipo de pergunta?", options: ["Apenas as perguntas sobre o salário", "As perguntas comportamentais", "As perguntas sobre o clima", "Nenhuma pergunta específica"], explanation: "STAR foi concebido especificamente para estruturar as respostas às perguntas comportamentais que pedem exemplos concretos." },
    ],
  },
  {
    title: "Negociação e apresentação em francês",
    objectives: [
      "Usar um vocabulário de negociação apropriado",
      "Apresentar uma proposta com segurança",
      "Gerir as objeções de maneira construtiva",
    ],
    content: [
      "O vocabulário de negociação inclui expressões-chave: 'Je propose que...' (Proponho que), 'Serait-il possible de...' (Seria possível), 'Je comprends votre point, cependant...' (Compreendo o seu ponto, no entanto). Estas fórmulas permitem exprimir um desacordo mantendo ao mesmo tempo uma relação profissional cordial.",
      "Apresentar uma proposta com segurança não significa ser agressivo: trata-se de estruturar a sua argumentação com factos, antecipar as objeções possíveis e propor soluções em vez de simplesmente enunciar um problema.",
      "Gerir as objeções de maneira construtiva implica ouvir completamente a objeção antes de responder, reformular para mostrar a sua compreensão, e depois apresentar uma resposta factual em vez de defensiva.",
    ],
    keyTakeaways: [
      "O desacordo profissional exprime-se através de fórmulas matizadas, não de recusas diretas",
      "Uma boa negociação antecipa as objeções antes de serem levantadas",
      "Ouvir completamente antes de responder desarma a maioria das tensões",
    ],
    resourceLabels: [
      "HEC Montréal — Recursos em negociação",
    ],
    quiz: [
      { question: "Que fórmula permite exprimir um desacordo mantendo-se cordial?", options: ["'O senhor está enganado'", "'Je comprends votre point, cependant...' (Compreendo o seu ponto, no entanto)", "'É falso'", "O silêncio completo"], explanation: "Esta fórmula reconhece o ponto de vista do outro introduzindo ao mesmo tempo com nuance um desacordo ou uma precisão." },
      { question: "O que significa apresentar uma proposta 'com segurança' segundo o módulo?", options: ["Ser agressivo", "Estruturar a sua argumentação com factos, sem agressividade", "Falar muito alto", "Evitar todo o contacto visual"], explanation: "A segurança manifesta-se por uma argumentação factual e estruturada, não pela agressividade." },
      { question: "Qual é a primeira etapa para gerir uma objeção de maneira construtiva?", options: ["Responder imediatamente sem ouvir", "Ouvir completamente a objeção antes de responder", "Ignorar a objeção", "Mudar de assunto"], explanation: "Ouvir plenamente antes de responder permite compreender realmente a preocupação e responder-lhe adequadamente." },
      { question: "O que deve fazer uma boa negociação antes de as objeções serem levantadas?", options: ["Nada de especial", "Antecipá-las", "Evitá-las completamente evitando o assunto", "Ignorá-las"], explanation: "Antecipar as objeções possíveis permite preparar respostas sólidas antecipadamente." },
      { question: "O que permite a reformulação durante uma objeção?", options: ["Perder tempo inutilmente", "Mostrar a sua compreensão da preocupação do outro", "Contradizer imediatamente", "Evitar responder"], explanation: "Reformular demonstra uma escuta ativa e facilita uma resposta pertinente à objeção levantada." },
      { question: "Por que privilegiar uma resposta factual em vez de defensiva perante uma objeção?", options: ["Porque é mais rápido", "Porque os factos são mais convincentes e desarmam as tensões", "Não é recomendado", "Porque é exigido pela lei"], explanation: "Uma resposta baseada em factos é geralmente mais persuasiva e profissional do que uma reação emocional ou defensiva." },
    ],
  },
  {
    title: "Terminologia setorial (finanças, tech, saúde)",
    objectives: [
      "Dominar o vocabulário específico do setor de atividade visado",
      "Compreender os acrónimos correntes no ambiente profissional quebequense",
      "Usar uma terminologia precisa no seu campo de especialização",
    ],
    content: [
      "Cada setor profissional possui a sua terminologia própria: em finanças, fala-se de 'REER', 'CELI', 'relevé bancaire' (extrato bancário); em tecnologia, de 'infonuagique' (nuvem), 'pourriel'; em saúde, de 'CLSC', 'CHSLD'. Este domínio lexical é indispensável para uma integração profissional rápida.",
      "Os acrónimos institucionais quebequenses (RAMQ, CNESST, CSST, SAAQ) surgem frequentemente nas comunicações administrativas e profissionais. Compreendê-los evita mal-entendidos custosos nos trâmites oficiais.",
      "A precisão terminológica demonstra a especialização: usar o termo exato em vez de uma paráfrase geral reforça a credibilidade profissional, particularmente nos setores técnicos ou regulados.",
    ],
    keyTakeaways: [
      "A terminologia setorial deve ser aprendida em contexto, não por memorização isolada",
      "Os acrónimos institucionais quebequenses são essenciais de conhecer para os trâmites administrativos",
      "A precisão lexical reforça a credibilidade profissional percebida",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique — Pesquisa por setor",
    ],
    quiz: [
      { question: "O que significa o acrónimo RAMQ?", options: ["Régie de l'assurance maladie du Québec (organismo de seguro de saúde do Quebec)", "Rede de compra municipal", "Regulamento administrativo dos mercados", "Nenhuma significação oficial"], explanation: "A RAMQ é a Régie de l'assurance maladie du Québec, o organismo responsável pela cobertura de saúde pública." },
      { question: "O que designa o termo 'infonuagique'?", options: ["Uma aplicação meteorológica", "O cloud computing (computação em nuvem)", "Um tipo de café", "Um software de contabilidade"], explanation: "'Infonuagique' é o termo francês oficial quebequense para designar o 'cloud computing'." },
      { question: "O que é um CHSLD?", options: ["Um centro de alojamento de cuidados de longa duração", "Uma escola secundária", "Um tipo de imposto", "Uma companhia de seguros"], explanation: "O CHSLD é um estabelecimento quebequense que oferece cuidados de longa duração às pessoas em perda de autonomia." },
      { question: "Por que a precisão terminológica é importante no ambiente profissional?", options: ["Não é importante", "Reforça a credibilidade profissional percebida", "Complica sempre a comunicação", "Não tem qualquer ligação com a especialização"], explanation: "Usar o termo exato em vez de uma paráfrase demonstra um domínio do campo e reforça a confiança." },
      { question: "O que significa o acrónimo CNESST?", options: ["Um tipo de conta bancária", "Comissão das normas, da equidade, da saúde e da segurança do trabalho", "Um sindicato estudantil", "Um canal de televisão"], explanation: "A CNESST regula as normas do trabalho, a equidade salarial e a saúde-segurança no Quebec." },
      { question: "Como deve ser aprendida a terminologia setorial segundo o módulo?", options: ["Por memorização isolada de listas", "Em contexto de uso real", "Não se aprende", "Apenas de forma oral"], explanation: "Aprender a terminologia em contexto favorece uma melhor retenção e um uso apropriado." },
    ],
  },
  {
    title: "Exame final e certificação",
    objectives: [
      "Demonstrar o domínio do francês profissional adquirido",
      "Passar numa simulação de entrevista e de redação profissional",
      "Obter o certificado ARCADINS de francês dos negócios",
    ],
    content: [
      "O exame final avalia as quatro competências trabalhadas durante a formação: compreensão oral de uma reunião simulada, redação de um email profissional, apresentação oral de um projeto, e simulação de entrevista de emprego.",
      "Os avaliadores prestam uma atenção particular à clareza da mensagem em vez da perfeição gramatical absoluta — o objetivo é a comunicação profissional eficaz, não o domínio académico da língua.",
      "Ao passar no exame, é emitido um certificado digital ARCADINS, que atesta o nível de francês profissional alcançado e que pode ser adicionado ao CV ou apresentado a um empregador potencial.",
    ],
    keyTakeaways: [
      "O exame avalia a comunicação eficaz, não a perfeição gramatical",
      "As quatro competências (oral, escrito, apresentação, interação) são todas avaliadas",
      "O certificado emitido é uma vantagem concreta para a procura de emprego",
    ],
    resourceLabels: [],
    quiz: [
      { question: "Que competências são avaliadas durante o exame final?", options: ["Apenas a gramática escrita", "Compreensão oral, redação, apresentação oral, simulação de entrevista", "Só o ditado", "A velocidade de digitação"], explanation: "O exame final cobre as quatro competências trabalhadas ao longo da formação, de maneira integrada." },
      { question: "O que avaliam prioritariamente os corretores segundo o módulo?", options: ["A perfeição gramatical absoluta", "A clareza da mensagem e a comunicação eficaz", "O sotaque do candidato", "Apenas a velocidade de resposta"], explanation: "O objetivo é a comunicação profissional eficaz, não um domínio académico perfeito da língua." },
      { question: "O que recebe o estudante ao passar no exame?", options: ["Nada de especial", "Um certificado digital ARCADINS", "Uma multa", "Um diploma universitário internacional"], explanation: "É emitido um certificado digital ARCADINS, que atesta oficialmente o nível alcançado." },
      { question: "O certificado emitido pode ser usado para:", options: ["Nada concreto", "Ser adicionado ao CV ou apresentado a um empregador", "Apenas um uso pessoal sem valor profissional", "Viajar sem visto"], explanation: "O certificado constitui uma prova concreta de competência linguística profissional utilizável numa procura de emprego." },
      { question: "O exame final inclui uma simulação de entrevista de emprego?", options: ["Não, nunca", "Sim, é uma das componentes avaliadas", "Só para alguns estudantes", "Apenas em opção paga"], explanation: "A simulação de entrevista faz parte integrante da avaliação final do programa." },
      { question: "Qual é o objetivo global desta formação em francês dos negócios?", options: ["O domínio académico teórico apenas", "A comunicação profissional eficaz no ambiente de trabalho", "Passar num exame universitário de literatura", "Aprender a escrever poesia"], explanation: "A formação visa uma aplicação prática e profissional do francês, adaptada ao mundo do trabalho quebequense." },
    ],
  },
];

const de: CourseTranslation = [
  {
    title: "Berufsfranzösisch: Grundlagen und Vokabular",
    objectives: [
      "Das Grundvokabular der Quebecer Arbeitswelt erwerben",
      "Das formelle und informelle Register im beruflichen Kontext unterscheiden",
      "Einfache, klare berufliche Sätze bilden",
    ],
    content: [
      "Berufsfranzösisch unterscheidet sich vom Alltagsfranzösisch durch ein spezifisches Vokabular: poste (Stelle), embauche (Einstellung), échéancier (Zeitplan), mandat (Mandat), livrable (Liefergegenstand). Diese Grundbegriffe zu beherrschen ist wesentlich, bevor man komplexere Kommunikationssituationen angeht.",
      "Das formelle Register wird mit hierarchischen Vorgesetzten, Kunden und in offiziellen schriftlichen Mitteilungen verwendet. Das informellere Register, obwohl in manchen Quebecer Unternehmenskulturen präsent, sollte von Neuankömmlingen vorsichtig verwendet werden, bis sie die Codes des Umfelds gut kennen.",
      "Der Aufbau beruflicher Sätze bevorzugt Klarheit und Prägnanz. Vermeiden Sie zu lange Sätze, verwenden Sie präzise Aktionsverben (vorschlagen, empfehlen, analysieren) und strukturieren Sie Ihre Ideen mit logischen Konnektoren (zuerst, dann, folglich).",
    ],
    keyTakeaways: [
      "Das berufliche Grundvokabular muss vor komplexen Situationen automatisiert sein",
      "Das formelle Register bleibt die sichere Wahl in einem neuen Arbeitsumfeld",
      "Klarheit hat immer Vorrang vor einem anspruchsvollen Vokabular",
    ],
    resourceLabels: [
      "Office québécois de la langue française — Arbeitsvokabular",
      "TV5Monde — Berufsfranzösisch",
    ],
    quiz: [
      { question: "Was bedeutet der Begriff 'échéancier' im beruflichen Kontext?", options: ["Eine Kaffeesorte", "Ein Terminplan der Etappen und Fristen eines Projekts", "Eine Führungsposition", "Eine Buchhaltungssoftware"], explanation: "Ein échéancier ist ein Dokument, das die verschiedenen Etappen eines Projekts mit ihren Fristen plant." },
      { question: "Wann wird das formelle Register besonders empfohlen?", options: ["Nie", "Mit hierarchischen Vorgesetzten und Kunden", "Nur unter Freunden", "Nur mündlich"], explanation: "Das formelle Register ist die sichere Wahl in der Kommunikation mit der Hierarchie und der Kundschaft, besonders für einen Neuankömmling." },
      { question: "Welches Element wird empfohlen, um die Ideen schriftlich logisch zu strukturieren?", options: ["Emojis", "Logische Konnektoren (zuerst, dann, folglich)", "SMS-Abkürzungen", "Schweigen"], explanation: "Logische Konnektoren helfen dem Leser, dem Fortschritt der Argumentation klar zu folgen." },
      { question: "Was bedeutet 'livrable' im beruflichen Umfeld?", options: ["Ein Postpaket", "Ein konkretes von einem Projekt oder einer Aufgabe erwartetes Ergebnis", "Eine Getränkeart", "Ein Feiertag"], explanation: "Ein livrable bezeichnet ein greifbares Ergebnis, das in einer bestimmten Projektphase erwartet wird (Bericht, Prototyp, Dokument usw.)." },
      { question: "Welche Qualität sollte laut Modul beim beruflichen Schreiben Vorrang haben?", options: ["Ein anspruchsvolles Vokabular", "Die Klarheit", "Die Satzlänge", "Die Verwendung von Slang"], explanation: "Klarheit und Prägnanz werden im beruflichen Umfeld mehr geschätzt als die Komplexität des Vokabulars." },
      { question: "Warum muss das berufliche Grundvokabular automatisiert werden?", options: ["Um Kollegen zu beeindrucken", "Um sich danach auf komplexere Kommunikationssituationen konzentrieren zu können", "Es ist nicht notwendig", "Nur um eine Prüfung zu bestehen"], explanation: "Die Grundlagen zu beherrschen erleichtert später die Sicherheit in anspruchsvolleren beruflichen Austauschen." },
    ],
  },
  {
    title: "Mündliche Kommunikation im Unternehmen",
    objectives: [
      "Effektiv an einer Besprechung auf Französisch teilnehmen",
      "Eine Idee oder ein Projekt strukturiert präsentieren",
      "Die dem Quebecer Kontext angemessenen Höflichkeitsformeln verwenden",
    ],
    content: [
      "Die Teilnahme an einer Besprechung erfordert, im richtigen Moment das Wort zu ergreifen, umzuformulieren, um das eigene Verständnis zu bestätigen, und ohne Angst Klärungsfragen zu stellen. Quebecer schätzen eine direkte, aber höfliche Kommunikation.",
      "Eine strukturierte Präsentation folgt im Allgemeinen dem Plan: Kontext, Problem, vorgeschlagene Lösung, erwartete Vorteile. Die Verwendung klarer Übergänge hilft dem Publikum, der Argumentation zu folgen, selbst bei einem Nicht-Muttersprachler.",
      "Höflichkeitsformeln variieren je nach Kontext: eine berufliche E-Mail beginnt oft mit 'Bonjour' gefolgt vom Vornamen (eine informellere Kultur als in Frankreich), während eine formelle Besprechung Respektzeichen wie 'Merci de votre attention' zum Abschluss bewahrt.",
    ],
    keyTakeaways: [
      "Umformulieren, um das Verständnis zu bestätigen, vermeidet kostspielige Missverständnisse",
      "Eine klare Struktur gleicht ein noch begrenztes Vokabular aus",
      "Das Duzen und die Verwendung des Vornamens sind in Quebec üblich, selbst im beruflichen Kontext",
    ],
    resourceLabels: [
      "Radio-Canada — Sprachressourcen",
    ],
    quiz: [
      { question: "Welche Technik hilft, Missverständnisse in einer Besprechung zu vermeiden?", options: ["Nie sprechen", "Umformulieren, um das Verständnis zu bestätigen", "So schnell wie möglich sprechen", "Fragen vermeiden"], explanation: "Umzuformulieren, was man verstanden hat, ermöglicht es, jedes Missverständnis zu überprüfen und zu korrigieren, bevor es zum Problem wird." },
      { question: "Welcher Plan strukturiert im Allgemeinen eine effektive berufliche Präsentation?", options: ["Schluss, Kontext, Problem", "Kontext, Problem, Lösung, Vorteile", "Keine Reihenfolge ist wichtig", "Nur Vorteile"], explanation: "Dieser logische Plan führt das Publikum vom Kontext zu einer klaren Lösung und ihren Vorteilen." },
      { question: "Wie beginnt eine berufliche E-Mail in Quebec im Allgemeinen?", options: ["Mit 'Cher Monsieur le Directeur'", "Mit 'Bonjour' gefolgt vom Vornamen", "Ohne jede Begrüßung", "Immer auf Englisch"], explanation: "Die Quebecer Kultur ist informeller als in Frankreich, und die Verwendung des Vornamens von Anfang an ist üblich und gut akzeptiert." },
      { question: "Was ermöglicht eine klare Struktur in einer Präsentation, selbst mit begrenztem Vokabular?", options: ["Nichts, das Vokabular ist alles, was zählt", "Auszugleichen und trotz sprachlicher Grenzen verständlich zu bleiben", "Das Sprechen ganz zu vermeiden", "Schneller zu sprechen"], explanation: "Eine gute Struktur hilft dem Publikum, der Botschaft zu folgen, selbst wenn das Vokabular des Sprechers noch in Entwicklung ist." },
      { question: "Was kennzeichnet die Kommunikation in Quebec laut Modul?", options: ["Eine direkte, aber höfliche Offenheit", "Eine extreme und starre Förmlichkeit", "Das völlige Fehlen von Höflichkeit", "Systematisches Schweigen"], explanation: "Quebecer schätzen im Allgemeinen eine direkte Kommunikation, während sie höflich und respektvoll bleiben." },
      { question: "Das Duzen im beruflichen Umfeld in Quebec ist:", options: ["Streng verboten", "Üblich, selbst mit der Hierarchie", "Nur engen Freunden vorbehalten", "Eine schwere Beleidigung"], explanation: "Anders als in anderen frankophonen Kulturen ist das Duzen bei der Arbeit in Quebec weit verbreitet." },
    ],
  },
  {
    title: "Berufliches Schreiben (E-Mails, Berichte)",
    objectives: [
      "Eine klare und vollständige berufliche E-Mail verfassen",
      "Einen einfachen Bericht mit Einleitung, Hauptteil, Schluss strukturieren",
      "Gängige Anglizismen im Geschäftsfranzösisch vermeiden",
    ],
    content: [
      "Eine effektive berufliche E-Mail enthält eine präzise Betreffzeile, eine passende Anrede, eine in kurze Absätze strukturierte Nachricht und eine Schlussformel. Vor dem Senden immer Korrektur lesen, um Fehler zu vermeiden, die der Glaubwürdigkeit schaden.",
      "Ein beruflicher Bericht folgt einer logischen Struktur: Zusammenfassung (falls nötig), Kontext, Methodik, Ergebnisse, Empfehlungen. Titel und Untertitel erleichtern das schnelle Überfliegen durch eilige Empfänger.",
      "Das Quebecer Geschäftsfranzösisch vermeidet bestimmte im Mündlichen verbreitete Anglizismen: man sagt 'courriel' statt 'email', 'clavarder' statt 'chatter', 'pourriel' statt 'spam'. Diese Begriffe sind im offiziellen Gebrauch in schriftlichen Mitteilungen.",
    ],
    keyTakeaways: [
      "Eine präzise E-Mail-Betreffzeile erhöht die Antwortquote und die Klarheit",
      "Die Struktur eines Berichts muss ein schnelles diagonales Lesen ermöglichen",
      "Offizielle französische Begriffe werden in beruflichen schriftlichen Mitteilungen erwartet",
    ],
    resourceLabels: [
      "Banque de dépannage linguistique — OQLF",
    ],
    quiz: [
      { question: "Welcher offizielle Quebecer Begriff ersetzt 'email'?", options: ["Courriel", "Mailbox", "Internet", "Messagerie"], explanation: "'Courriel' ist der offizielle Begriff, der in Quebec anstelle des Anglizismus 'email' verwendet wird." },
      { question: "Welcher Begriff ersetzt offiziell 'spam' im Quebecer Französisch?", options: ["Déchet numérique", "Pourriel", "Junk mail", "Bloqueur"], explanation: "'Pourriel' ist der offizielle französische Begriff zur Bezeichnung unerwünschter E-Mails (Spam)." },
      { question: "Was muss eine effektive berufliche E-Mail enthalten?", options: ["Eine vage Betreffzeile", "Eine präzise Betreffzeile und eine Schlussformel", "Keine besondere Struktur", "Nur Bilder"], explanation: "Eine präzise Betreffzeile und eine klare Struktur mit Schlussformel erhöhen die Klarheit und Professionalität der Nachricht." },
      { question: "Was ist die erste Etappe eines gut strukturierten beruflichen Berichts?", options: ["Der Schluss", "Der Kontext (nach einer Zusammenfassung, falls nötig)", "Die Anhänge", "Keine Etappe ist erforderlich"], explanation: "Der Bericht beginnt im Allgemeinen mit dem Kontext, der das Thema situiert, bevor Methodik und Ergebnisse entwickelt werden." },
      { question: "Was ersetzt der Begriff 'clavarder'?", options: ["Drucken", "Chatten (online sich unterhalten)", "Löschen", "Speichern"], explanation: "'Clavarder' ist der offizielle Quebecer Begriff zur Bezeichnung des Online-Gesprächs per Tastatur (Chat)." },
      { question: "Warum sollte man eine E-Mail vor dem Senden immer Korrektur lesen?", options: ["Es ist nicht notwendig", "Um Fehler zu vermeiden, die der beruflichen Glaubwürdigkeit schaden", "Um Zeit zu verschwenden", "Um ein Gesetz einzuhalten"], explanation: "Nicht korrigierte Fehler können dem beruflichen Image des Absenders schaden." },
    ],
  },
  {
    title: "Quebecer Französisch: Ausdrücke und Kultur",
    objectives: [
      "Gängige Quebecer Ausdrücke im beruflichen Umfeld erkennen",
      "Die kulturellen Nuancen der Kommunikation am Arbeitsplatz verstehen",
      "Missverständnisse aufgrund regionaler sprachlicher Unterschiede vermeiden",
    ],
    content: [
      "Das Quebecer Französisch enthält für das berufliche Umfeld eigene Ausdrücke: 'faire du pouce' (eine Gelegenheit nutzen), 'capoter' (begeistert oder überfordert sein, je nach Kontext), 'c'est correct' (das ist akzeptabel). Diese Ausdrücke zu verstehen erleichtert die soziale Integration bei der Arbeit.",
      "Die Quebecer Berufskultur schätzt eine scheinbare hierarchische Gleichheit: Angestellte duzen oft ihre Vorgesetzten und Besprechungen fördern die Teilnahme aller, anders als in hierarchischeren Kulturen.",
      "Neuankömmlinge müssen sich auch an das Kommunikationstempo anpassen: Quebecer schätzen im Allgemeinen eine gemäßigte Offenheit, vermeiden direkte Konfrontationen, schätzen aber Ehrlichkeit im beruflichen Feedback.",
    ],
    keyTakeaways: [
      "Regionale Ausdrücke erleichtern die Integration, müssen aber mit Bedacht verwendet werden",
      "Die Quebecer Kultur schätzt eine weniger ausgeprägte Hierarchie als anderswo in der Frankophonie",
      "Beobachten vor dem Nachahmen bleibt die beste Strategie zur kulturellen Anpassung",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique",
    ],
    quiz: [
      { question: "Was bedeutet der Quebecer Ausdruck 'c'est correct'?", options: ["Es ist ein schwerer Fehler", "Es ist akzeptabel", "Es ist verboten", "Es ist dringend"], explanation: "'C'est correct' ist ein gängiger Ausdruck, der bedeutet, dass etwas akzeptabel oder zufriedenstellend ist." },
      { question: "Wie lässt sich die Hierarchie im Quebecer beruflichen Umfeld beschreiben?", options: ["Extrem starr und formell", "Weniger ausgeprägt, mit häufigem Duzen selbst gegenüber Vorgesetzten", "Nicht existent", "Überall in der Frankophonie identisch"], explanation: "Die Quebecer Kultur schätzt eine weniger ausgeprägte Hierarchie als in anderen frankophonen Ländern." },
      { question: "Welche Strategie wird einem Neuankömmling angesichts regionaler Ausdrücke empfohlen?", options: ["Sie sofort ohne Bedacht verwenden", "Beobachten vor dem Nachahmen", "Sie völlig ignorieren", "Sie systematisch korrigieren"], explanation: "Den Verwendungskontext zu beobachten, bevor man die Ausdrücke selbst übernimmt, vermeidet kulturelle Fehltritte." },
      { question: "Wie gehen Quebecer im Allgemeinen mit beruflichem Feedback um?", options: ["Mit gemäßigter Offenheit, ehrlich, aber ohne direkte Konfrontation", "Es wird nie Feedback gegeben", "Immer sehr aggressiv", "Nur schriftlich anonym"], explanation: "Die Kultur schätzt die Ehrlichkeit des Feedbacks, während sie direkte und schroffe Konfrontationen vermeidet." },
      { question: "Was bedeutet der Ausdruck 'faire du pouce' im beruflichen Kontext?", options: ["Nur trampen", "Eine Gelegenheit nutzen", "Ein Angebot ablehnen", "Seine Stelle kündigen"], explanation: "In diesem Kontext bedeutet 'faire du pouce', aus einer günstigen Gelegenheit Nutzen zu ziehen." },
      { question: "Warum erleichtert das Verständnis regionaler Ausdrücke die Integration?", options: ["Es ist nicht nützlich", "Es hilft, Kollegen besser zu verstehen und sich sozial zu integrieren", "Es kompliziert die Kommunikation immer", "Es hat keinen Bezug zur Arbeit"], explanation: "Die von Kollegen verwendete informelle Sprache zu verstehen erleichtert die sozialen Beziehungen und die Integration im Team." },
    ],
  },
  {
    title: "Vorbereitung auf Vorstellungsgespräche",
    objectives: [
      "Strukturierte Antworten auf häufige Fragen vorbereiten",
      "Seinen Werdegang überzeugend auf Französisch präsentieren",
      "Relevante Fragen an den Arbeitgeber stellen",
    ],
    content: [
      "Häufige Fragen im Quebecer Vorstellungsgespräch sind 'Parlez-moi de vous' (Erzählen Sie mir von sich), 'Pourquoi ce poste vous intéresse-t-il' (Warum interessiert Sie diese Stelle) und 'Quelle est votre plus grande force/faiblesse' (Was ist Ihre größte Stärke/Schwäche). Die STAR-Methode (Situation, Aufgabe, Aktion, Resultat) strukturiert Verhaltensantworten effektiv.",
      "Den internationalen Werdegang als Vorteil statt als Hindernis zu präsentieren, ändert die Wahrnehmung des Arbeitgebers: Anpassungsfähigkeit, übertragbare Kompetenzen und die Motivation, zur Quebecer Wirtschaft beizutragen, hervorheben.",
      "Am Ende des Gesprächs Fragen zu stellen zeigt echtes Interesse an der Stelle: nach dem Team, den aktuellen Herausforderungen der Abteilung oder den Entwicklungsperspektiven zu fragen, zeigt ernsthaftes Nachdenken, nicht nur den Wunsch, eine Stelle zu bekommen.",
    ],
    keyTakeaways: [
      "Die STAR-Methode strukturiert klare und einprägsame Antworten",
      "Internationale Erfahrung muss als Mehrwert präsentiert werden",
      "Am Ende des Gesprächs relevante Fragen zu stellen, hebt ernsthafte Kandidaten hervor",
    ],
    resourceLabels: [
      "Emploi-Québec — Leitfaden zur Gesprächsvorbereitung",
    ],
    quiz: [
      { question: "Wofür steht die im Gespräch verwendete STAR-Methode?", options: ["Situation, Aufgabe, Aktion, Resultat", "Gehalt, Arbeit, Vorteile, Rente", "Lächeln, Kleidung, Haltung, Netzwerk", "Keine besondere Bedeutung"], explanation: "STAR strukturiert Verhaltensantworten, indem sie die Situation, die Aufgabe, die ergriffene Aktion und das erzielte Resultat beschreibt." },
      { question: "Wie sollte internationale Erfahrung laut Modul präsentiert werden?", options: ["Als zu verbergendes Hindernis", "Als Vorteil und Mehrwert", "Man sollte nie davon sprechen", "Als Ausrede"], explanation: "Internationale Erfahrung muss als Quelle von Anpassungsfähigkeit und übertragbaren Kompetenzen aufgewertet werden." },
      { question: "Warum wird empfohlen, am Ende eines Gesprächs Fragen zu stellen?", options: ["Es wird nie empfohlen", "Um echtes Interesse und ernsthaftes Nachdenken über die Stelle zu zeigen", "Um das Gespräch unnötig zu verlängern", "Um sofort das Gehalt zu verhandeln"], explanation: "Relevante Fragen zu stellen zeigt dem Arbeitgeber, dass der Kandidat ernsthaft über die Stelle und die Organisation nachgedacht hat." },
      { question: "Welche häufige Frage wird im Modul erwähnt?", options: ["Was ist Ihr Sternzeichen?", "Erzählen Sie mir von sich (Parlez-moi de vous)", "Wie viele Kinder haben Sie?", "Was ist Ihre Religion?"], explanation: "'Parlez-moi de vous' ist eine sehr gängige Eröffnungsfrage im Vorstellungsgespräch in Quebec." },
      { question: "Welche Art von Kompetenzen sollte man aus einem internationalen Werdegang hervorheben?", options: ["Keine Kompetenz ist übertragbar", "Die übertragbaren Kompetenzen und die Anpassungsfähigkeit", "Nur die im Ausland erworbenen Abschlüsse", "Der Geburtsort"], explanation: "Übertragbare Kompetenzen und Anpassungsfähigkeit sind starke Argumente für einen internationalen Werdegang." },
      { question: "Die STAR-Methode ist besonders nützlich für welche Art von Frage?", options: ["Nur Gehaltsfragen", "Verhaltensfragen", "Wetterfragen", "Keine spezifische Frage"], explanation: "STAR ist speziell dafür konzipiert, Antworten auf Verhaltensfragen zu strukturieren, die konkrete Beispiele verlangen." },
    ],
  },
  {
    title: "Verhandlung und Präsentation auf Französisch",
    objectives: [
      "Ein angemessenes Verhandlungsvokabular verwenden",
      "Einen Vorschlag mit Selbstvertrauen präsentieren",
      "Einwände konstruktiv handhaben",
    ],
    content: [
      "Das Verhandlungsvokabular umfasst Schlüsselausdrücke: 'Je propose que...' (Ich schlage vor, dass), 'Serait-il possible de...' (Wäre es möglich), 'Je comprends votre point, cependant...' (Ich verstehe Ihren Punkt, jedoch). Diese Formeln ermöglichen es, Uneinigkeit auszudrücken, während eine herzliche berufliche Beziehung gewahrt bleibt.",
      "Einen Vorschlag mit Selbstvertrauen zu präsentieren bedeutet nicht, aggressiv zu sein: Es geht darum, seine Argumentation mit Fakten zu strukturieren, mögliche Einwände zu antizipieren und Lösungen vorzuschlagen, statt einfach ein Problem zu benennen.",
      "Einwände konstruktiv zu handhaben bedeutet, dem Einwand vollständig zuzuhören, bevor man antwortet, umzuformulieren, um Verständnis zu zeigen, und dann eine faktische statt defensive Antwort zu geben.",
    ],
    keyTakeaways: [
      "Berufliche Uneinigkeit wird durch nuancierte Formeln ausgedrückt, nicht durch direkte Ablehnungen",
      "Eine gute Verhandlung antizipiert Einwände, bevor sie geäußert werden",
      "Vollständig zuzuhören, bevor man antwortet, entschärft die meisten Spannungen",
    ],
    resourceLabels: [
      "HEC Montréal — Verhandlungsressourcen",
    ],
    quiz: [
      { question: "Welche Formel ermöglicht es, Uneinigkeit auszudrücken und dabei herzlich zu bleiben?", options: ["'Sie liegen falsch'", "'Je comprends votre point, cependant...' (Ich verstehe Ihren Punkt, jedoch)", "'Das ist falsch'", "Völliges Schweigen"], explanation: "Diese Formel anerkennt den Standpunkt des anderen und führt gleichzeitig nuanciert eine Uneinigkeit oder Präzisierung ein." },
      { question: "Was bedeutet es laut Modul, einen Vorschlag 'mit Selbstvertrauen' zu präsentieren?", options: ["Aggressiv sein", "Seine Argumentation mit Fakten strukturieren, ohne Aggression", "Sehr laut sprechen", "Jeden Blickkontakt vermeiden"], explanation: "Selbstvertrauen zeigt sich durch eine faktische, strukturierte Argumentation, nicht durch Aggression." },
      { question: "Was ist der erste Schritt, um einen Einwand konstruktiv zu handhaben?", options: ["Sofort antworten, ohne zuzuhören", "Dem Einwand vollständig zuhören, bevor man antwortet", "Den Einwand ignorieren", "Das Thema wechseln"], explanation: "Vollständig zuzuhören, bevor man antwortet, ermöglicht es, das Anliegen wirklich zu verstehen und angemessen darauf einzugehen." },
      { question: "Was muss eine gute Verhandlung tun, bevor Einwände geäußert werden?", options: ["Nichts Besonderes", "Sie antizipieren", "Sie völlig vermeiden, indem man das Thema meidet", "Sie ignorieren"], explanation: "Mögliche Einwände zu antizipieren ermöglicht es, im Voraus solide Antworten vorzubereiten." },
      { question: "Was ermöglicht das Umformulieren bei einem Einwand?", options: ["Unnötig Zeit zu verschwenden", "Verständnis für das Anliegen des anderen zu zeigen", "Sofort zu widersprechen", "Eine Antwort zu vermeiden"], explanation: "Umformulieren zeigt aktives Zuhören und erleichtert eine relevante Antwort auf den geäußerten Einwand." },
      { question: "Warum eine faktische statt defensive Antwort auf einen Einwand bevorzugen?", options: ["Weil es schneller ist", "Weil Fakten überzeugender sind und Spannungen entschärfen", "Es wird nicht empfohlen", "Weil es gesetzlich vorgeschrieben ist"], explanation: "Eine faktenbasierte Antwort ist im Allgemeinen überzeugender und professioneller als eine emotionale oder defensive Reaktion." },
    ],
  },
  {
    title: "Fachterminologie (Finanzen, Tech, Gesundheit)",
    objectives: [
      "Das für die angestrebte Branche spezifische Vokabular beherrschen",
      "Gängige Akronyme im Quebecer beruflichen Umfeld verstehen",
      "Eine präzise Terminologie in seinem Fachgebiet verwenden",
    ],
    content: [
      "Jede Berufsbranche hat ihre eigene Terminologie: im Finanzwesen spricht man von 'REER', 'CELI', 'relevé bancaire' (Kontoauszug); in der Technologie von 'infonuagique' (Cloud), 'pourriel'; im Gesundheitswesen von 'CLSC', 'CHSLD'. Diese lexikalische Beherrschung ist für eine schnelle berufliche Integration unverzichtbar.",
      "Quebecer institutionelle Akronyme (RAMQ, CNESST, CSST, SAAQ) tauchen häufig in administrativen und beruflichen Mitteilungen auf. Sie zu verstehen vermeidet kostspielige Missverständnisse bei offiziellen Verfahren.",
      "Terminologische Präzision demonstriert Fachkompetenz: den genauen Begriff statt einer allgemeinen Paraphrase zu verwenden, stärkt die berufliche Glaubwürdigkeit, besonders in technischen oder regulierten Branchen.",
    ],
    keyTakeaways: [
      "Die Fachterminologie muss im Kontext gelernt werden, nicht durch isoliertes Auswendiglernen",
      "Quebecer institutionelle Akronyme sind für administrative Verfahren wesentlich zu kennen",
      "Lexikalische Präzision stärkt die wahrgenommene berufliche Glaubwürdigkeit",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique — Suche nach Branche",
    ],
    quiz: [
      { question: "Was bedeutet das Akronym RAMQ?", options: ["Régie de l'assurance maladie du Québec (Quebecer Krankenversicherungsbehörde)", "Kommunales Einkaufsnetzwerk", "Administrative Marktregelung", "Keine offizielle Bedeutung"], explanation: "Die RAMQ ist die Régie de l'assurance maladie du Québec, die für die öffentliche Gesundheitsversorgung zuständige Behörde." },
      { question: "Was bezeichnet der Begriff 'infonuagique'?", options: ["Eine Wetter-App", "Cloud Computing", "Eine Kaffeesorte", "Eine Buchhaltungssoftware"], explanation: "'Infonuagique' ist der offizielle Quebecer französische Begriff zur Bezeichnung von 'Cloud Computing'." },
      { question: "Was ist ein CHSLD?", options: ["Ein Pflegeheim für Langzeitpflege", "Eine weiterführende Schule", "Eine Steuerart", "Eine Versicherungsgesellschaft"], explanation: "Das CHSLD ist eine Quebecer Einrichtung, die Langzeitpflege für Menschen mit eingeschränkter Autonomie bietet." },
      { question: "Warum ist terminologische Präzision im beruflichen Umfeld wichtig?", options: ["Sie ist nicht wichtig", "Sie stärkt die wahrgenommene berufliche Glaubwürdigkeit", "Sie kompliziert die Kommunikation immer", "Sie hat keinen Bezug zur Fachkompetenz"], explanation: "Den genauen Begriff statt einer Paraphrase zu verwenden demonstriert Beherrschung des Fachgebiets und stärkt das Vertrauen." },
      { question: "Was bedeutet das Akronym CNESST?", options: ["Eine Art Bankkonto", "Kommission für Arbeitsnormen, Gleichheit, Gesundheit und Sicherheit der Arbeit", "Eine Studentengewerkschaft", "Ein Fernsehsender"], explanation: "Die CNESST regelt die Arbeitsnormen, die Lohngleichheit und den Arbeitsschutz in Quebec." },
      { question: "Wie sollte Fachterminologie laut Modul gelernt werden?", options: ["Durch isoliertes Auswendiglernen von Listen", "Im realen Verwendungskontext", "Sie kann nicht gelernt werden", "Nur mündlich"], explanation: "Terminologie im Kontext zu lernen fördert eine bessere Behaltensleistung und einen angemessenen Gebrauch." },
    ],
  },
  {
    title: "Abschlussprüfung & Zertifizierung",
    objectives: [
      "Die Beherrschung des erworbenen Berufsfranzösisch demonstrieren",
      "Eine simulierte Gesprächs- und berufliche Schreibaufgabe bestehen",
      "Das ARCADINS-Zertifikat für Geschäftsfranzösisch erhalten",
    ],
    content: [
      "Die Abschlussprüfung bewertet die vier während der Ausbildung bearbeiteten Kompetenzen: Hörverständnis einer simulierten Besprechung, Verfassen einer beruflichen E-Mail, mündliche Präsentation eines Projekts und Simulation eines Vorstellungsgesprächs.",
      "Die Prüfer achten besonders auf die Klarheit der Botschaft statt auf absolute grammatikalische Perfektion — das Ziel ist die effektive berufliche Kommunikation, nicht die akademische Beherrschung der Sprache.",
      "Nach Bestehen der Prüfung wird ein digitales ARCADINS-Zertifikat ausgestellt, das das erreichte Niveau des Berufsfranzösisch bescheinigt und dem Lebenslauf hinzugefügt oder einem potenziellen Arbeitgeber vorgelegt werden kann.",
    ],
    keyTakeaways: [
      "Die Prüfung bewertet die effektive Kommunikation, nicht die grammatikalische Perfektion",
      "Alle vier Kompetenzen (mündlich, schriftlich, Präsentation, Interaktion) werden bewertet",
      "Das ausgestellte Zertifikat ist ein konkreter Vorteil für die Jobsuche",
    ],
    resourceLabels: [],
    quiz: [
      { question: "Welche Kompetenzen werden in der Abschlussprüfung bewertet?", options: ["Nur die schriftliche Grammatik", "Hörverständnis, Schreiben, mündliche Präsentation, Gesprächssimulation", "Nur das Diktat", "Die Tippgeschwindigkeit"], explanation: "Die Abschlussprüfung deckt die vier während der gesamten Ausbildung bearbeiteten Kompetenzen integriert ab." },
      { question: "Was bewerten die Korrektoren laut Modul vorrangig?", options: ["Die absolute grammatikalische Perfektion", "Die Klarheit der Botschaft und die effektive Kommunikation", "Den Akzent des Kandidaten", "Nur die Antwortgeschwindigkeit"], explanation: "Das Ziel ist die effektive berufliche Kommunikation, nicht eine perfekte akademische Beherrschung der Sprache." },
      { question: "Was erhält der Student nach Bestehen der Prüfung?", options: ["Nichts Besonderes", "Ein digitales ARCADINS-Zertifikat", "Eine Geldstrafe", "Ein internationales Universitätsdiplom"], explanation: "Ein digitales ARCADINS-Zertifikat wird ausgestellt, das offiziell das erreichte Niveau bescheinigt." },
      { question: "Das ausgestellte Zertifikat kann verwendet werden, um:", options: ["Nichts Konkretes", "Dem Lebenslauf hinzugefügt oder einem Arbeitgeber vorgelegt zu werden", "Nur zur persönlichen Nutzung ohne beruflichen Wert", "Ohne Visum zu reisen"], explanation: "Das Zertifikat ist ein konkreter Nachweis beruflicher Sprachkompetenz, der bei einer Jobsuche verwendbar ist." },
      { question: "Beinhaltet die Abschlussprüfung eine Simulation eines Vorstellungsgesprächs?", options: ["Nein, nie", "Ja, es ist eine der bewerteten Komponenten", "Nur für manche Studenten", "Nur als kostenpflichtige Option"], explanation: "Die Gesprächssimulation ist integraler Bestandteil der Abschlussbewertung des Programms." },
      { question: "Was ist das Gesamtziel dieser Ausbildung in Geschäftsfranzösisch?", options: ["Nur die theoretische akademische Beherrschung", "Die effektive berufliche Kommunikation am Arbeitsplatz", "Eine universitäre Literaturprüfung bestehen", "Gedichte schreiben lernen"], explanation: "Die Ausbildung zielt auf eine praktische, berufliche Anwendung des Französischen ab, angepasst an die Quebecer Arbeitswelt." },
    ],
  },
];

const ht: CourseTranslation = [
  {
    title: "Franse pwofesyonèl: baz ak vokabilè",
    objectives: [
      "Akeri vokabilè baz mond travay kebekwa a",
      "Distenge rejis fòmèl ak enfòmèl nan kontèks pwofesyonèl",
      "Konstwi fraz pwofesyonèl senp ak klè",
    ],
    content: [
      "Franse pwofesyonèl distenge tèt li de franse kouran an pa yon vokabilè espesifik: poste (pòs), embauche (anbochaj), échéancier (kalandriye), mandat (manda), livrable (rezilta ki dwe livre). Metrize tèm baz sa yo esansyèl anvan abòde sitiyasyon kominikasyon ki pi konplèks.",
      "Rejis fòmèl la itilize ak siperyè yerarchik yo, kliyan yo epi nan kominikasyon ekri ofisyèl yo. Rejis ki pi enfòmèl la, byenke prezan nan kèk kilti antrepriz kebekwa, dwe itilize ak pridans pa nouvo arivan yo jiskaske yo byen konnen kòd milye a.",
      "Konstriksyon fraz pwofesyonèl privilejye klète ak konsizyon. Evite fraz ki twò long, itilize vèb aksyon presi (pwopoze, rekòmande, analize) epi estriktire lide yo ak konektè lojik (dabò, apre sa, an konsekans).",
    ],
    keyTakeaways: [
      "Vokabilè pwofesyonèl baz la dwe otomatize anvan sitiyasyon konplèks yo",
      "Rejis fòmèl la rete valè sèten nan yon nouvo milye travay",
      "Klète toujou pran priyorite sou sofistikasyon vokabilè a",
    ],
    resourceLabels: [
      "Office québécois de la langue française — Vokabilè travay",
      "TV5Monde — Franse pwofesyonèl",
    ],
    quiz: [
      { question: "Kisa tèm 'échéancier' vle di nan kontèks pwofesyonèl?", options: ["Yon kalite kafe", "Yon kalandriye previzyonèl etap ak delè yon pwojè", "Yon pòs direksyon", "Yon lojisyèl kontabilite"], explanation: "Yon échéancier se yon dokiman ki planifye diferan etap yon pwojè ak dat limit yo." },
      { question: "Kilè rejis fòmèl la patikilyèman rekòmande?", options: ["Janmen", "Ak siperyè yerarchik yo ak kliyan yo", "Sèlman ant zanmi", "Sèlman aloral"], explanation: "Rejis fòmèl la se valè sèten nan kominikasyon ak yerarchi a ak kliyantèl la, sitou pou yon nouvo arivan." },
      { question: "Ki eleman ki rekòmande pou estriktire lide yo lojikman alerit?", options: ["Emoji yo", "Konektè lojik yo (dabò, apre sa, an konsekans)", "Abrevyasyon tèks yo", "Silans"], explanation: "Konektè lojik yo ede lektè a swiv pwogresyon rezònman an yon fason klè." },
      { question: "Kisa 'livrable' vle di nan milye pwofesyonèl?", options: ["Yon pake lapòs", "Yon rezilta konkrè yo atann de yon pwojè oswa yon travay", "Yon kalite bwason", "Yon jou ferye"], explanation: "Yon livrable deziye yon rezilta tanjib yo atann nan yon etap bay nan yon pwojè (rapò, pwototip, dokiman, elatriye)." },
      { question: "Ki kalite ki dwe pran priyorite nan redaksyon pwofesyonèl selon modil la?", options: ["Sofistikasyon vokabilè a", "Klète", "Longè fraz yo", "Itilizasyon jagon"], explanation: "Klète ak konsizyon valorize nan milye pwofesyonèl, plis pase konpleksite vokabilè a." },
      { question: "Poukisa vokabilè pwofesyonèl baz la dwe otomatize?", options: ["Pou enpresyone kolèg yo", "Pou ka konsantre apre sa sou sitiyasyon kominikasyon ki pi konplèks", "Se pa nesesè", "Sèlman pou pase yon egzamen"], explanation: "Metrize baz yo fasilite alèz nan echanj pwofesyonèl ki pi egzijan apre." },
    ],
  },
  {
    title: "Kominikasyon oral nan antrepriz",
    objectives: [
      "Patisipe efikasman nan yon reyinyon an franse",
      "Prezante yon lide oswa yon pwojè yon fason estriktire",
      "Itilize fòmil politès ki apwopriye ak kontèks kebekwa a",
    ],
    content: [
      "Patisipe nan yon reyinyon egzije konnen pran lapawòl nan bon moman an, refòmile pou konfime konpreyansyon w, epi poze kesyon klarifikasyon san laperèz. Kebekwa yo valorize yon kominikasyon dirèk men koutwa.",
      "Yon prezantasyon estriktire jeneralman swiv plan an: kontèks, pwoblèm, solisyon pwopoze, benefis yo atann. Itilizasyon tranzisyon klè ede odyans la swiv rezònman an, menm pou yon lokitè ki pa natif.",
      "Fòmil politès yo varye selon kontèks la: yon imel pwofesyonèl souvan kòmanse ak 'Bonjour' swiv pa prenon (kilti pi enfòmèl pase an Frans), pandan ke yon reyinyon fòmèl konsève mak respè tankou 'Merci de votre attention' nan konklizyon.",
    ],
    keyTakeaways: [
      "Refòmile pou konfime konpreyansyon evite malantandi ki koute chè",
      "Yon estrikti klè konpanse yon vokabilè ki toujou limite",
      "Sèvi ak tu ak prenon kouran nan Quebec, menm nan kontèks pwofesyonèl",
    ],
    resourceLabels: [
      "Radio-Canada — Resous lengwistik",
    ],
    quiz: [
      { question: "Ki teknik ki ede evite malantandi nan reyinyon?", options: ["Pa janm pale", "Refòmile pou konfime konpreyansyon", "Pale pi vit posib", "Evite poze kesyon"], explanation: "Refòmile sa ou konprann pèmèt verifye ak korije nenpòt enkonpreyansyon anvan li vin yon pwoblèm." },
      { question: "Ki plan ki jeneralman estriktire yon prezantasyon pwofesyonèl efikas?", options: ["Konklizyon, kontèks, pwoblèm", "Kontèks, pwoblèm, solisyon, benefis", "Okenn lòd pa enpòtan", "Sèlman benefis"], explanation: "Plan lojik sa a gide odyans la depi kontèks la rive nan yon solisyon klè ak avantaj li yo." },
      { question: "Kijan yon imel pwofesyonèl jeneralman kòmanse nan Quebec?", options: ["Ak 'Cher Monsieur le Directeur'", "Ak 'Bonjour' swiv pa prenon", "San okenn salitasyon", "Toujou an anglè"], explanation: "Kilti kebekwa a pi enfòmèl pase an Frans, epi itilizasyon prenon depi kòmansman kouran epi byen aksepte." },
      { question: "Kisa yon estrikti klè pèmèt nan yon prezantasyon, menm ak yon vokabilè limite?", options: ["Anyen, vokabilè se tout sa ki konte", "Konpanse epi rete konpreyansib malgre limit lengwistik", "Evite konplètman pale", "Pale pi vit"], explanation: "Yon bon estrikti ede odyans la swiv mesaj la menm si vokabilè lokitè a toujou ap devlope." },
      { question: "Kisa ki karakterize kominikasyon nan Quebec selon modil la?", options: ["Yon fransèz dirèk men koutwa", "Yon fòmalite ekstrèm ak rijid", "Absans total politès", "Silans sistematik"], explanation: "Kebekwa yo jeneralman valorize yon kominikasyon dirèk pandan y ap rete koutwa ak respektye." },
      { question: "Sèvi ak tu nan milye pwofesyonèl nan Quebec se:", options: ["Estrikteman entèdi", "Kouran, menm ak yerarchi a", "Rezève sèlman pou zanmi pwòch", "Yon gwo ofans"], explanation: "Kontrèman ak lòt kilti frankofòn, sèvi ak tu lajman gaye nan travay nan Quebec." },
    ],
  },
  {
    title: "Redaksyon pwofesyonèl (imel, rapò)",
    objectives: [
      "Redije yon imel pwofesyonèl klè ak konplè",
      "Estriktire yon rapò senp ak entwodiksyon, devlopman, konklizyon",
      "Evite anglisism kouran nan franse zafè yo",
    ],
    content: [
      "Yon imel pwofesyonèl efikas gen yon objè presi, yon fòmil salitasyon adapte, yon mesaj estriktire an paragraf kout ak yon fòmil salitasyon final. Toujou reli anvan voye a pou evite erè ki nwi kredibilite.",
      "Yon rapò pwofesyonèl swiv yon estrikti lojik: rezime egzekitif (si nesesè), kontèks, metodoloji, rezilta, rekòmandasyon. Tit ak soutit yo fasilite lekti rapid pa destinatè ki prese.",
      "Franse kebekwa zafè a evite kèk anglisism gaye aloral: yo di 'courriel' olye 'email', 'clavarder' olye 'chatter', 'pourriel' olye 'spam'. Tèm sa yo se yon itilizasyon ofisyèl nan kominikasyon ekri yo.",
    ],
    keyTakeaways: [
      "Yon objè imel presi ogmante to repons lan ak klète",
      "Estrikti yon rapò dwe pèmèt yon lekti rapid an dyagonal",
      "Tèm franse ofisyèl yo atann nan kominikasyon ekri pwofesyonèl",
    ],
    resourceLabels: [
      "Banque de dépannage linguistique — OQLF",
    ],
    quiz: [
      { question: "Ki tèm ofisyèl kebekwa ki ranplase 'email'?", options: ["Courriel", "Mailbox", "Internet", "Messagerie"], explanation: "'Courriel' se tèm ofisyèl yo itilize nan Quebec olye anglisism 'email' la." },
      { question: "Ki tèm ki ofisyèlman ranplase 'spam' an franse kebekwa?", options: ["Déchet numérique", "Pourriel", "Junk mail", "Bloqueur"], explanation: "'Pourriel' se tèm ofisyèl franse a pou deziye imel endezirab yo (spam)." },
      { question: "Kisa yon imel pwofesyonèl efikas dwe gen?", options: ["Yon objè vag", "Yon objè presi ak yon fòmil salitasyon final", "Okenn estrikti patikilye", "Sèlman imaj"], explanation: "Yon objè presi ak yon estrikti klè ak salitasyon final ogmante klète ak pwofesyonalis mesaj la." },
      { question: "Ki premye etap yon rapò pwofesyonèl ki byen estriktire?", options: ["Konklizyon an", "Kontèks la (apre yon rezime egzekitif si nesesè)", "Anèks yo", "Okenn etap pa obligatwa"], explanation: "Rapò a jeneralman kòmanse ak kontèks la ki sitiye sijè a anvan devlope metodoloji ak rezilta." },
      { question: "Kisa tèm 'clavarder' ranplase?", options: ["Enprime", "Chatte (pale anliy)", "Efase", "Sovgade"], explanation: "'Clavarder' se tèm kebekwa ofisyèl pou deziye konvèsasyon anliy pa klavye (chat)." },
      { question: "Poukisa fòk toujou reli yon imel anvan voye l?", options: ["Se pa nesesè", "Pou evite erè ki nwi kredibilite pwofesyonèl", "Pou pèdi tan", "Pou respekte yon lwa"], explanation: "Erè ki pa korije ka nwi imaj pwofesyonèl moun ki voye a." },
    ],
  },
  {
    title: "Franse kebekwa: ekspresyon ak kilti",
    objectives: [
      "Rekonèt ekspresyon kebekwa kouran nan milye pwofesyonèl",
      "Konprann nuans kiltirèl kominikasyon nan travay",
      "Evite malantandi ki lye ak diferans lengwistik rejyonal",
    ],
    content: [
      "Franse kebekwa a gen ekspresyon ki pwòp ak milye pwofesyonèl la: 'faire du pouce' (pwofite yon opòtinite), 'capoter' (antouzyas oswa depase selon kontèks la), 'c'est correct' (li akseptab). Konprann ekspresyon sa yo fasilite entegrasyon sosyal nan travay.",
      "Kilti pwofesyonèl kebekwa a valorize egalite yerarchik aparan: anplwaye yo souvan bay siperyè yo tu epi reyinyon yo ankouraje patisipasyon tout moun, kontrèman ak kilti ki pi yerarchik.",
      "Nouvo arivan yo dwe tou adapte ak ritm kominikasyon an: kebekwa yo jeneralman apresye fransèz mezire, evite konfwontasyon dirèk men valorize onètete nan fidbak pwofesyonèl.",
    ],
    keyTakeaways: [
      "Ekspresyon rejyonal yo fasilite entegrasyon men dwe itilize ak disènman",
      "Kilti kebekwa a valorize yon yerarchi mwens make pase lòt kote nan frankofoni a",
      "Obsève anvan imite rete pi bon estrateji adaptasyon kiltirèl",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique",
    ],
    quiz: [
      { question: "Kisa ekspresyon kebekwa 'c'est correct' vle di?", options: ["Se yon erè grav", "Li akseptab", "Li entèdi", "Li ijan"], explanation: "'C'est correct' se yon ekspresyon kouran ki vle di yon bagay akseptab oswa satisfezan." },
      { question: "Kijan pou dekri yerarchi nan milye pwofesyonèl kebekwa?", options: ["Ekstrèmman rijid ak fòmèl", "Mwens make, ak yon tu frekan menm anvè siperyè yo", "Ki pa egziste", "Idantik toupatou nan frankofoni a"], explanation: "Kilti kebekwa a valorize yon yerarchi mwens make pase nan lòt peyi frankofòn." },
      { question: "Ki estrateji ki rekòmande pou yon nouvo arivan fas ak ekspresyon rejyonal yo?", options: ["Itilize yo imedyatman san disènman", "Obsève anvan imite", "Inyore yo konplètman", "Korije yo sistematikman"], explanation: "Obsève kontèks itilizasyon anvan adopte ekspresyon yo evite maladwas kiltirèl." },
      { question: "Kijan kebekwa yo jeneralman abòde fidbak pwofesyonèl?", options: ["Ak yon fransèz mezire, onèt men san konfwontasyon dirèk", "Yo pa janm bay fidbak", "Toujou yon fason trè agresif", "Sèlman alerit anonim"], explanation: "Kilti a valorize onètete fidbak la pandan l ap evite konfwontasyon dirèk ak brital." },
      { question: "Kisa ekspresyon 'faire du pouce' vle di nan kontèks pwofesyonèl?", options: ["Fè otostòp sèlman", "Pwofite yon opòtinite", "Refize yon òf", "Kite travay ou"], explanation: "Nan kontèks sa a, 'faire du pouce' vle di pwofite oswa tire avantaj de yon okazyon favorab." },
      { question: "Poukisa konprann ekspresyon rejyonal yo fasilite entegrasyon?", options: ["Se pa itil", "Li ede pi byen konprann kolèg yo epi entegre sosyalman", "Li toujou konplike kominikasyon", "Li pa gen okenn lyen ak travay"], explanation: "Konprann langaj enfòmèl kolèg yo itilize fasilite relasyon sosyal ak entegrasyon nan ekip la." },
    ],
  },
  {
    title: "Preparasyon pou entèvyou travay",
    objectives: [
      "Prepare repons estriktire pou kesyon frekan yo",
      "Prezante pakou w yon fason konvenkan an franse",
      "Poze kesyon pertinan bay anplwayè a",
    ],
    content: [
      "Kesyon frekan nan entèvyou kebekwa yo enkli 'Parlez-moi de vous' (Pale m de ou), 'Pourquoi ce poste vous intéresse-t-il' (Poukisa pòs sa a enterese w) ak 'Quelle est votre plus grande force/faiblesse' (Ki pi gwo fòs/feblès ou). Metòd STAR (Sitiyasyon, Tach, Aksyon, Rezilta) estriktire efikasman repons konpòtmantal yo.",
      "Prezante pakou entènasyonal ou kòm yon atou olye yon obstak chanje pèsepsyon anplwayè a: mete devan adaptabilite, konpetans transferab ak motivasyon pou kontribye nan ekonomi kebekwa a.",
      "Poze kesyon nan fen entèvyou a demontre enterè reyèl pou pòs la: mande sou ekip la, defi aktyèl depatman an oswa pèspektiv evolisyon montre yon refleksyon serye, pa sèlman dezi pou jwenn yon travay.",
    ],
    keyTakeaways: [
      "Metòd STAR estriktire repons klè ak memorab",
      "Eksperyans entènasyonal dwe prezante kòm yon valè ajoute",
      "Poze kesyon pertinan nan fen entèvyou a distenge kandida serye yo",
    ],
    resourceLabels: [
      "Emploi-Québec — Gid preparasyon pou entèvyou",
    ],
    quiz: [
      { question: "Kisa metòd STAR yo itilize nan entèvyou a vle di?", options: ["Sitiyasyon, Tach, Aksyon, Rezilta", "Salè, Travay, Avantaj, Retrèt", "Souri, Rad, Atitid, Rezo", "Okenn siyifikasyon patikilye"], explanation: "STAR estriktire repons konpòtmantal yo lè li dekri Sitiyasyon an, Tach la, Aksyon yo pran an ak Rezilta yo jwenn nan." },
      { question: "Kijan eksperyans entènasyonal dwe prezante selon modil la?", options: ["Kòm yon obstak pou kache", "Kòm yon atou ak yon valè ajoute", "Fòk pa janm pale de li", "Kòm yon eskiz"], explanation: "Eksperyans entènasyonal dwe valorize kòm yon sous adaptabilite ak konpetans transferab." },
      { question: "Poukisa poze kesyon nan fen yon entèvyou rekòmande?", options: ["Li pa janm rekòmande", "Pou demontre yon enterè reyèl ak yon refleksyon serye pou pòs la", "Pou pwolonje entèvyou a initilman", "Pou negosye imedyatman salè a"], explanation: "Poze kesyon pertinan montre anplwayè a kandida a te reflechi seryezman sou pòs la ak òganizasyon an." },
      { question: "Ki kesyon frekan yo mansyone nan modil la?", options: ["Ki siy astwolojik ou?", "Pale m de ou (Parlez-moi de vous)", "Konbyen pitit ou genyen?", "Ki relijyon ou?"], explanation: "'Parlez-moi de vous' se yon kesyon ouvèti trè kouran nan entèvyou travay nan Quebec." },
      { question: "Ki kalite konpetans pou mete devan lè w soti nan yon pakou entènasyonal?", options: ["Okenn konpetans pa transferab", "Konpetans transferab yo ak adaptabilite", "Sèlman diplòm yo jwenn aletranje", "Kote nesans"], explanation: "Konpetans transferab yo ak kapasite adaptasyon se agiman fò pou yon pakou entènasyonal." },
      { question: "Metòd STAR patikilyèman itil pou ki kalite kesyon?", options: ["Sèlman kesyon sou salè", "Kesyon konpòtmantal yo", "Kesyon sou meteyo", "Okenn kesyon espesifik"], explanation: "STAR konsevwa espesyalman pou estriktire repons pou kesyon konpòtmantal ki mande egzanp konkrè." },
    ],
  },
  {
    title: "Negosyasyon ak prezantasyon an franse",
    objectives: [
      "Itilize yon vokabilè negosyasyon apwopriye",
      "Prezante yon pwopozisyon ak asirans",
      "Jere objeksyon yo yon fason konstriktif",
    ],
    content: [
      "Vokabilè negosyasyon an enkli ekspresyon kle: 'Je propose que...' (Mwen pwopoze ke), 'Serait-il possible de...' (Èske li ta posib), 'Je comprends votre point, cependant...' (Mwen konprann pwen ou, sepandan). Fòmil sa yo pèmèt eksprime yon dezakò pandan y ap kenbe yon relasyon pwofesyonèl kòdyal.",
      "Prezante yon pwopozisyon ak asirans pa vle di se agresif: se estriktire agiman ou ak reyalite, antisipe objeksyon posib yo epi pwopoze solisyon olye senpman enonse yon pwoblèm.",
      "Jere objeksyon yo yon fason konstriktif enplike koute konplètman objeksyon an anvan reponn, refòmile pou montre konpreyansyon w, epi apre bay yon repons faktyèl olye defansif.",
    ],
    keyTakeaways: [
      "Dezakò pwofesyonèl eksprime pa fòmil nuanse, pa refi dirèk",
      "Yon bon negosyasyon antisipe objeksyon yo anvan yo leve yo",
      "Koute konplètman anvan reponn dezamòse pifò tansyon",
    ],
    resourceLabels: [
      "HEC Montréal — Resous nan negosyasyon",
    ],
    quiz: [
      { question: "Ki fòmil ki pèmèt eksprime yon dezakò pandan w rete kòdyal?", options: ["'Ou gen tò'", "'Je comprends votre point, cependant...' (Mwen konprann pwen ou, sepandan)", "'Se fo'", "Silans konplè a"], explanation: "Fòmil sa a rekonèt pwennvi lòt la pandan l ap entwodui ak nuans yon dezakò oswa yon presizyon." },
      { question: "Kisa prezante yon pwopozisyon 'ak asirans' vle di selon modil la?", options: ["Se agresif", "Estriktire agiman ou ak reyalite, san agresivite", "Pale trè fò", "Evite tout kontak vizyèl"], explanation: "Asirans manifeste pa yon agimantasyon faktyèl ak estriktire, pa pa agresivite." },
      { question: "Ki premye etap pou jere yon objeksyon yon fason konstriktif?", options: ["Reponn imedyatman san koute", "Koute konplètman objeksyon an anvan reponn", "Inyore objeksyon an", "Chanje sijè"], explanation: "Koute konplètman anvan reponn pèmèt konprann reyèlman enkyetid la epi reponn li adekwatman." },
      { question: "Kisa yon bon negosyasyon dwe fè anvan objeksyon yo leve?", options: ["Anyen espesyal", "Antisipe yo", "Evite yo konplètman lè w evite sijè a", "Inyore yo"], explanation: "Antisipe objeksyon posib yo pèmèt prepare repons solid alavans." },
      { question: "Kisa refòmilasyon pèmèt pandan yon objeksyon?", options: ["Pèdi tan initilman", "Montre konpreyansyon w de enkyetid lòt la", "Kontredi imedyatman", "Evite reponn"], explanation: "Refòmile demontre yon koute aktif epi fasilite yon repons pertinan pou objeksyon yo leve a." },
      { question: "Poukisa privilejye yon repons faktyèl olye defansif fas ak yon objeksyon?", options: ["Paske li pi rapid", "Paske reyalite yo pi konvenkan epi dezamòse tansyon", "Li pa rekòmande", "Paske lwa a egzije li"], explanation: "Yon repons ki baze sou reyalite jeneralman pi pèsyazif ak pwofesyonèl pase yon reyaksyon emosyonèl oswa defansif." },
    ],
  },
  {
    title: "Terminoloji sektoryèl (finans, tech, sante)",
    objectives: [
      "Metrize vokabilè espesifik sektè aktivite vize a",
      "Konprann akwonim kouran nan milye pwofesyonèl kebekwa",
      "Itilize yon terminoloji presi nan domèn ekspètiz ou",
    ],
    content: [
      "Chak sektè pwofesyonèl gen pwòp terminoloji li: nan finans, yo pale de 'REER', 'CELI', 'relevé bancaire' (rlèvman bankè); nan teknoloji, de 'infonuagique' (cloud), 'pourriel'; nan sante, de 'CLSC', 'CHSLD'. Metriz leksikal sa a endispansab pou yon entegrasyon pwofesyonèl rapid.",
      "Akwonim enstitisyonèl kebekwa yo (RAMQ, CNESST, CSST, SAAQ) parèt frekan nan kominikasyon administratif ak pwofesyonèl. Konprann yo evite malantandi ki koute chè nan demach ofisyèl yo.",
      "Presizyon terminolojik demontre ekspètiz: itilize tèm egzak la olye yon parafraz jeneral ranfòse kredibilite pwofesyonèl, patikilyèman nan sektè teknik oswa reglemante.",
    ],
    keyTakeaways: [
      "Terminoloji sektoryèl dwe aprann an kontèks, pa pa memorizasyon izole",
      "Akwonim enstitisyonèl kebekwa yo esansyèl pou konnen pou demach administratif",
      "Presizyon leksikal ranfòse kredibilite pwofesyonèl yo pèsevwa",
    ],
    resourceLabels: [
      "Le Grand Dictionnaire Terminologique — Rechèch pa sektè",
    ],
    quiz: [
      { question: "Kisa akwonim RAMQ vle di?", options: ["Régie de l'assurance maladie du Québec (òganis asirans maladi Quebec)", "Rezo acha minisipal", "Reglemantasyon administratif mache yo", "Okenn siyifikasyon ofisyèl"], explanation: "RAMQ se Régie de l'assurance maladie du Québec, òganis ki responsab kouvèti sante piblik la." },
      { question: "Kisa tèm 'infonuagique' deziye?", options: ["Yon aplikasyon meteyo", "Cloud computing lan", "Yon kalite kafe", "Yon lojisyèl kontabilite"], explanation: "'Infonuagique' se tèm franse ofisyèl kebekwa pou deziye 'cloud computing'." },
      { question: "Kisa yon CHSLD ye?", options: ["Yon sant ebèjman swen alontèm", "Yon lekòl segondè", "Yon kalite taks", "Yon konpayi asirans"], explanation: "CHSLD se yon etablisman kebekwa ki ofri swen alontèm bay moun ki pèdi otonomi." },
      { question: "Poukisa presizyon terminolojik enpòtan nan milye pwofesyonèl?", options: ["Se pa enpòtan", "Li ranfòse kredibilite pwofesyonèl yo pèsevwa", "Li toujou konplike kominikasyon", "Li pa gen okenn lyen ak ekspètiz"], explanation: "Itilize tèm egzak la olye yon parafraz demontre yon metriz domèn nan epi ranfòse konfyans." },
      { question: "Kisa akwonim CNESST vle di?", options: ["Yon kalite kont bankè", "Komisyon nòm, ekite, sante ak sekirite travay", "Yon sendika etidyan", "Yon chèn televizyon"], explanation: "CNESST ankadre nòm travay yo, ekite salaryal ak sante-sekirite nan Quebec." },
      { question: "Kijan terminoloji sektoryèl dwe aprann selon modil la?", options: ["Pa memorizasyon izole lis", "An kontèks itilizasyon reyèl", "Li pa aprann", "Sèlman aloral"], explanation: "Aprann terminoloji an kontèks favorize yon pi bon retansyon ak yon itilizasyon apwopriye." },
    ],
  },
  {
    title: "Egzamen final ak sètifikasyon",
    objectives: [
      "Demontre metriz franse pwofesyonèl yo akeri a",
      "Reyisi yon similasyon entèvyou ak redaksyon pwofesyonèl",
      "Jwenn sètifika ARCADINS franse zafè yo",
    ],
    content: [
      "Egzamen final la evalye kat konpetans yo travay pandan fòmasyon an: konpreyansyon oral yon reyinyon similye, redaksyon yon imel pwofesyonèl, prezantasyon oral yon pwojè, ak similasyon entèvyou travay.",
      "Evalyatè yo prete yon atansyon patikilye ak klète mesaj la olye pèfeksyon gramatikal absoli — objektif la se kominikasyon pwofesyonèl efikas, pa metriz akademik lang lan.",
      "Nan reyisit egzamen an, yo delivre yon sètifika dijital ARCADINS, ki ateste nivo franse pwofesyonèl yo rive a epi ki ka ajoute nan CV a oswa prezante bay yon anplwayè potansyèl.",
    ],
    keyTakeaways: [
      "Egzamen an evalye kominikasyon efikas, pa pèfeksyon gramatikal",
      "Kat konpetans yo (oral, ekri, prezantasyon, entèraksyon) tout evalye",
      "Sètifika yo delivre a se yon atou konkrè pou rechèch travay",
    ],
    resourceLabels: [],
    quiz: [
      { question: "Ki konpetans yo evalye pandan egzamen final la?", options: ["Sèlman gramè ekri", "Konpreyansyon oral, redaksyon, prezantasyon oral, similasyon entèvyou", "Sèlman dikte", "Vitès tap"], explanation: "Egzamen final la kouvri kat konpetans yo travay pandan tout fòmasyon an, yon fason entegre." },
      { question: "Kisa korektè yo evalye an priyorite selon modil la?", options: ["Pèfeksyon gramatikal absoli", "Klète mesaj la ak kominikasyon efikas", "Aksan kandida a", "Sèlman vitès repons"], explanation: "Objektif la se kominikasyon pwofesyonèl efikas, pa yon metriz akademik pafè lang lan." },
      { question: "Kisa etidyan an resevwa nan reyisit egzamen an?", options: ["Anyen espesyal", "Yon sètifika dijital ARCADINS", "Yon amann", "Yon diplòm inivèsitè entènasyonal"], explanation: "Yo delivre yon sètifika dijital ARCADINS, ki ateste ofisyèlman nivo yo rive a." },
      { question: "Sètifika yo delivre a ka itilize pou:", options: ["Anyen konkrè", "Ajoute nan CV a oswa prezante bay yon anplwayè", "Sèlman yon itilizasyon pèsonèl san valè pwofesyonèl", "Vwayaje san viza"], explanation: "Sètifika a konstitye yon prèv konkrè konpetans lengwistik pwofesyonèl ki itilizab nan yon rechèch travay." },
      { question: "Èske egzamen final la enkli yon similasyon entèvyou travay?", options: ["Non, janmen", "Wi, se youn nan konpozan yo evalye yo", "Sèlman pou kèk etidyan", "Sèlman nan opsyon peye"], explanation: "Similasyon entèvyou a fè pati entegral evalyasyon final pwogram nan." },
      { question: "Ki objektif global fòmasyon franse zafè sa a?", options: ["Sèlman metriz akademik teyorik", "Kominikasyon pwofesyonèl efikas nan milye travay", "Reyisi yon egzamen inivèsitè literati", "Aprann ekri pwezi"], explanation: "Fòmasyon an vize yon aplikasyon pratik ak pwofesyonèl franse a, adapte ak mond travay kebekwa a." },
    ],
  },
];

export const francaisAffairesTranslations: Partial<Record<Lang, CourseTranslation>> = {
  en,
  es,
  it,
  pt,
  de,
  ht,
};
