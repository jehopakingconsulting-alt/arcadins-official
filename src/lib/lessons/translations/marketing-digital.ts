import type { Lang } from "@/lib/i18n";
import type { CourseTranslation } from "./types";

const en: CourseTranslation = [
  {
    title: "Digital marketing fundamentals",
    objectives: [
      "Understand the pillars of digital marketing (acquisition, conversion, retention)",
      "Identify the relevant digital channels for your target audience",
      "Build a simple marketing funnel (AARRR funnel)",
    ],
    content: [
      "Digital marketing covers all marketing actions carried out on digital channels: search engines, social media, email, websites and mobile apps. Unlike traditional marketing, it lets you measure every interaction precisely and adjust campaigns in real time.",
      "The AARRR model (Acquisition, Activation, Retention, Referral, Revenue) provides a framework for structuring a coherent digital strategy. Each stage maps to a specific goal: attract qualified traffic, convert visitors into customers, retain them, then turn them into brand ambassadors.",
      "In Canada, the digital market is dominated by Google (search), Meta (Facebook/Instagram) and increasingly TikTok for younger audiences. The choice of channels depends on the target persona, the available budget and the product or service's sales cycle.",
    ],
    keyTakeaways: [
      "Digital marketing is measurable: every dollar invested must be traceable",
      "A well-defined marketing funnel guides every channel and content decision",
      "The right channel depends on the audience, not on current trends",
    ],
    resourceLabels: [
      "Google Skillshop — Digital Marketing Fundamentals",
      "Meta Blueprint — Free marketing training",
    ],
    quiz: [
      { question: "What does the acronym AARRR stand for in the marketing funnel model?", options: ["Acquisition, Activation, Retention, Referral, Revenue", "Analysis, Audit, Research, Report, Result", "Audience, Action, Return, Success, Profitability", "Purchase, Subscription, Retention, Referencing, ROI"], explanation: "AARRR is the classic growth model that structures the customer journey into 5 measurable stages." },
      { question: "What main advantage sets digital marketing apart from traditional marketing?", options: ["It always costs less", "The ability to measure every interaction precisely", "It requires no strategy", "It only works on mobile"], explanation: "Traceability and precise measurement of every action are the fundamental difference from traditional marketing." },
      { question: "Which channel is primarily favored to reach younger audiences according to the text?", options: ["Direct mail", "TikTok", "Radio", "Yellow pages"], explanation: "TikTok is mentioned as a growing channel for reaching young audiences in Canada." },
      { question: "The choice of marketing channels mainly depends on:", options: ["The weather", "The target persona, the budget and the sales cycle", "The logo color", "The number of company employees"], explanation: "These three factors (persona, budget, sales cycle) determine how relevant a channel is for a given strategy." },
      { question: "In the AARRR funnel, which stage directly follows Acquisition?", options: ["Revenue", "Referral", "Activation", "Retention"], explanation: "Activation is the moment when an acquired visitor takes a first meaningful action." },
      { question: "Why is it important to be able to adjust a campaign in real time?", options: ["To meet a legal obligation", "To optimize performance and reduce budget waste", "Because it is mandatory on all social networks", "To avoid paying taxes"], explanation: "Real-time adjustment optimizes return on investment by quickly correcting what isn't working." },
    ],
  },
  {
    title: "SEO & organic search",
    objectives: [
      "Master the 3 pillars of SEO: technical, content, authority",
      "Carry out relevant keyword research",
      "Optimize a web page for search engines",
    ],
    content: [
      "SEO (Search Engine Optimization) aims to improve a site's visibility in Google's organic results. It rests on three pillars: technical SEO (speed, structure, indexing), content (relevance, quality, keywords) and authority (backlinks, domain authority).",
      "Keyword research is the first step of any SEO strategy. Tools like Google Keyword Planner, Ubersuggest or Ahrefs help identify search volume and ranking difficulty for each term, so you can prioritize the content to produce.",
      "On-page optimization means structuring content with heading tags (H1, H2), an engaging meta description, clean URLs and coherent internal linking. Google also values user experience: load time, mobile compatibility and original content.",
    ],
    keyTakeaways: [
      "SEO is a long-term investment; results appear within 3 to 6 months",
      "Quality content remains the most durable ranking factor",
      "Keyword research must precede any content creation",
    ],
    resourceLabels: [
      "Google Search Central — Beginner SEO guide",
      "Ubersuggest — Free keyword tool",
    ],
    quiz: [
      { question: "What are the three pillars of SEO mentioned in the module?", options: ["Speed, price, design", "Technical, content, authority", "Text, image, video", "Google, Bing, Yahoo"], explanation: "Technical SEO, content and authority (backlinks) form the three fundamental pillars of organic search." },
      { question: "Which tag structures the main title of a page for SEO?", options: ["H1", "P", "DIV", "SPAN"], explanation: "The H1 tag represents the main and most important title for a page's SEO." },
      { question: "How long does it generally take to see the first results of an SEO strategy?", options: ["24 hours", "1 week", "3 to 6 months", "5 years"], explanation: "SEO is a medium-term investment; significant results usually appear between 3 and 6 months." },
      { question: "What does a 'backlink' mean in SEO?", options: ["A link back to the browser's previous page", "A link from another site pointing to yours", "A keyword repeated several times", "A 404 error"], explanation: "A backlink is an external link pointing to your site, strengthening its popularity and authority in Google's eyes." },
      { question: "Which step must precede content creation according to the module?", options: ["Buying advertising", "Keyword research", "Creating the logo", "Hiring a developer"], explanation: "Keyword research identifies high-potential topics before producing content." },
      { question: "Which of these elements is part of on-page optimization?", options: ["The meta description", "Employee salaries", "The office color", "The CEO's phone number"], explanation: "The meta description, heading tags and clean URLs are part of on-page optimization." },
    ],
  },
  {
    title: "Google Ads & Facebook Ads",
    objectives: [
      "Set up a search-oriented Google Ads campaign",
      "Create a targeted Facebook/Instagram Ads campaign",
      "Understand bidding mechanics and cost per click",
    ],
    content: [
      "Google Ads runs on a real-time auction system where advertisers pay to appear on specific keywords. The Quality Score, calculated from ad relevance and click-through rate, directly influences the cost per click and the ad's position.",
      "Facebook Ads (Meta Ads Manager) allows very precise targeting based on interests, behaviors and demographics. The best-performing campaigns use custom audiences (existing customers) and lookalike audiences to extend reach.",
      "Conversion tracking via the Meta pixel or Google Tag Manager is essential to measure return on ad spend (ROAS). Without tracking, it's impossible to know which campaigns actually generate sales.",
    ],
    keyTakeaways: [
      "Always define a clear campaign objective before launching an ad",
      "Precise targeting beats a large but poorly directed budget",
      "Conversion tracking must be in place before launching any campaign",
    ],
    resourceLabels: [
      "Google Ads — Official Help Center",
      "Meta Ads Manager — Documentation",
    ],
    quiz: [
      { question: "What is the Quality Score on Google Ads?", options: ["The number of followers of a page", "An indicator based on ad relevance and click-through rate", "The maximum daily budget", "The rating given by customers"], explanation: "The Quality Score evaluates an ad's relevance and directly influences cost per click and positioning." },
      { question: "What is a 'lookalike' audience on Facebook Ads?", options: ["A geographically identical audience", "An audience similar to your existing customers", "An audience made only of bots", "An audience that has already purchased"], explanation: "A lookalike audience is generated by Meta from your existing customers' characteristics to broaden your reach." },
      { question: "Why is conversion tracking essential?", options: ["To decorate the dashboard", "To measure real return on ad spend", "Because Google legally requires it", "To slow down the website"], explanation: "Without conversion tracking, it's impossible to know which campaigns actually generate sales or leads." },
      { question: "On what principle does the Google Ads auction system work?", options: ["First come, first served", "Real-time auctions on keywords", "Random draw", "Seniority of the ad account"], explanation: "Google Ads uses a real-time auction system where advertisers compete to appear on keywords." },
      { question: "Which tool is used to track conversions on Facebook/Instagram Ads?", options: ["The Meta pixel", "Google Analytics only", "A QR code", "The Facebook calendar"], explanation: "The Meta pixel is the tracking tool installed on the website to measure actions by users coming from ads." },
      { question: "What must be defined before launching any advertising campaign?", options: ["The creative agency's name", "A clear campaign objective", "The CEO's favorite color", "The number of employees"], explanation: "A clear objective (awareness, traffic, conversion) guides every choice in the campaign setup." },
    ],
  },
  {
    title: "Social media & community management",
    objectives: [
      "Develop an editorial line tailored to each platform",
      "Plan a coherent publishing calendar",
      "Manage customer relations and online reputation",
    ],
    content: [
      "Each social network has its own language and expectations: LinkedIn for B2B and expertise, Instagram for visuals and inspiration, TikTok for quick entertainment, Facebook for local communities. An effective editorial line adapts the tone and format to each platform.",
      "Editorial planning through tools like Meta Business Suite, Hootsuite or Buffer ensures a regular presence without daily overload. The 80/20 rule recommends 80% value content (educational, entertaining) and 20% promotional content.",
      "Community management involves replying quickly to comments and messages, handling negative reviews professionally and monitoring brand reputation. A fast, empathetic response often turns criticism into a loyalty opportunity.",
    ],
    keyTakeaways: [
      "Publishing consistency matters more than raw frequency",
      "Each platform requires a specific format and tone",
      "Managing negative reviews is as important as creating content",
    ],
    resourceLabels: [
      "Meta Business Suite",
      "Hootsuite Academy — Free training",
    ],
    quiz: [
      { question: "Which platform is cited as the most suited to B2B and expertise?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], explanation: "LinkedIn is the preferred network for B2B content and professional expertise positioning." },
      { question: "What does the 80/20 rule recommend in content management?", options: ["80% advertising, 20% organic content", "80% value content, 20% promotional content", "80% videos, 20% text", "80% in the morning, 20% in the evening"], explanation: "This rule balances content useful to the audience (80%) with direct promotion of products/services (20%)." },
      { question: "What is one of the tools mentioned for editorial planning?", options: ["Microsoft Excel only", "Hootsuite", "Adobe Photoshop", "Google Maps"], explanation: "Hootsuite is a tool for planning and managing posts across multiple social networks." },
      { question: "How should you effectively handle a negative review according to the module?", options: ["Ignore it completely", "Delete it immediately", "Respond quickly and professionally", "Block the user without responding"], explanation: "A fast, empathetic response can turn criticism into a loyalty opportunity." },
      { question: "What matters most according to the module: raw frequency or consistency?", options: ["Raw frequency", "Publishing consistency", "Neither", "The number of likes only"], explanation: "Consistency (steadiness over time) matters more than a high but irregular frequency." },
      { question: "Which type of content is favored on TikTok according to the text?", options: ["Long blog articles", "Quick entertainment", "Financial reports", "Formal job postings"], explanation: "TikTok is associated with quick entertainment and short, engaging content." },
    ],
  },
  {
    title: "E-commerce: building an online store",
    objectives: [
      "Choose the right e-commerce platform for your needs",
      "Structure a product page that converts",
      "Set up a smooth purchase journey",
    ],
    content: [
      "The most-used e-commerce platforms in Canada are Shopify (simplicity, app ecosystem), WooCommerce (flexibility via WordPress) and Wix (for small stores). The choice depends on product volume, technical budget and integration needs with other tools.",
      "A high-performing product page combines professional-quality photos, a benefit-oriented description (not just features), visible customer reviews and a clear call to action. The average e-commerce conversion rate is around 2 to 3% — every detail counts.",
      "The purchase journey must minimize friction: a checkout process of 3 steps maximum, multiple payment options (card, PayPal, Apple Pay), transparent display of shipping costs and a clear return policy. The average cart abandonment exceeds 70% — often due to hidden fees discovered too late.",
    ],
    keyTakeaways: [
      "The platform must match the size and complexity of the catalog",
      "Photos and customer reviews influence conversion more than price",
      "Reducing checkout steps directly lowers cart abandonment",
    ],
    resourceLabels: [
      "Shopify Compass — Free e-commerce courses",
      "Baymard Institute — E-commerce UX research",
    ],
    quiz: [
      { question: "Which e-commerce platform is described as offering flexibility via WordPress?", options: ["Shopify", "WooCommerce", "Wix", "Amazon"], explanation: "WooCommerce is a WordPress plugin offering great customization flexibility for e-commerce." },
      { question: "What is the average e-commerce conversion rate mentioned in the module?", options: ["50 to 60%", "2 to 3%", "90 to 100%", "0.01%"], explanation: "The average e-commerce conversion rate is generally between 2 and 3%, which makes every optimization valuable." },
      { question: "What cart abandonment percentage is mentioned as the average?", options: ["Over 70%", "About 10%", "Less than 5%", "Exactly 50%"], explanation: "The average cart abandonment rate exceeds 70%, often due to hidden fees discovered late." },
      { question: "What should be displayed transparently to reduce cart abandonment?", options: ["The founder's name", "Shipping costs", "The headquarters address", "The number of employees"], explanation: "Transparent display of shipping costs from the start avoids the bad surprises that cause abandonment." },
      { question: "An effective product description should be oriented toward:", options: ["Technical features only", "Benefits for the customer", "Price only", "The company's history"], explanation: "A benefit-oriented description answers 'what's in it for me' rather than listing cold features." },
      { question: "How many steps maximum are recommended for the checkout process?", options: ["10 steps", "3 steps", "Strictly 1 step", "No limit"], explanation: "A checkout process of 3 steps maximum reduces friction and improves the conversion rate." },
    ],
  },
  {
    title: "Analytics & performance measurement",
    objectives: [
      "Set up Google Analytics 4 to track conversions",
      "Identify the relevant key performance indicators (KPIs)",
      "Interpret a report to adjust a strategy",
    ],
    content: [
      "Google Analytics 4 (GA4) replaces Universal Analytics with an event-based model rather than sessions. It lets you follow a user's complete journey, from social media to purchase, across several devices.",
      "Essential KPIs vary by business objective: conversion rate and average order value for e-commerce, lead generation rate for B2B, engagement rate for media. Avoid drowning in vanity metrics (views, likes) that have no direct impact on revenue.",
      "Data analysis must lead to concrete actions: if the bounce rate is high on a landing page, test a new title or a new image. Digital marketing is a continuous cycle of measurement, hypothesis and testing (A/B testing).",
    ],
    keyTakeaways: [
      "Measuring without acting has no value — every report must lead to a decision",
      "KPIs must align with real business objectives, not vanity",
      "A/B testing is the most reliable method to validate a marketing hypothesis",
    ],
    resourceLabels: [
      "Google Analytics Academy",
      "Google Optimize — A/B testing guide",
    ],
    quiz: [
      { question: "On which model is Google Analytics 4 (GA4) based?", options: ["Sessions only", "Events", "Page views only", "Third-party cookies exclusively"], explanation: "GA4 uses an event-based model, enabling more precise tracking of the multi-device user journey." },
      { question: "What does a 'vanity metric' refer to?", options: ["A critical financial metric", "A metric that impresses but has no direct impact on revenue", "A metric illegal to use", "Net revenue"], explanation: "Vanity metrics (views, likes) flatter the ego but don't always reflect real business performance." },
      { question: "Which method is recommended to validate a marketing hypothesis?", options: ["Intuition alone", "A/B testing", "Guessing at random", "Copying a competitor without analysis"], explanation: "A/B testing compares two versions and objectively determines which performs better." },
      { question: "Which KPI is relevant for an e-commerce strategy according to the module?", options: ["The number of Twitter followers", "The conversion rate and average order value", "The number of employees", "Today's weather"], explanation: "For e-commerce, conversion rate and average order value are KPIs directly tied to revenue." },
      { question: "What should you do if the bounce rate is high on a landing page?", options: ["Do nothing", "Test a new title or a new image", "Delete the site", "Raise the price"], explanation: "Testing elements like the title or visual helps identify what better holds visitors' attention." },
      { question: "Why is it pointless to simply measure without acting?", options: ["Because measuring is expensive", "Because a report must lead to a concrete decision", "Because Google forbids it", "Because the numbers are always wrong"], explanation: "Measurement only has value if it leads to concrete actions to improve performance." },
    ],
  },
  {
    title: "Content strategy & copywriting",
    objectives: [
      "Define a content strategy aligned with the customer journey",
      "Apply the basics of persuasive copywriting",
      "Produce content suited to each funnel stage",
    ],
    content: [
      "An effective content strategy answers the customer's questions at each stage of their journey: educational content at the top of the funnel (blog articles, explainer videos), comparison content in the middle (case studies, demos) and conversion content at the bottom (testimonials, limited offers).",
      "Copywriting relies on proven structures like AIDA (Attention, Interest, Desire, Action) or PAS (Problem, Agitation, Solution). The goal is always to speak to the customer's benefits rather than the product's features.",
      "Consistency of tone and message across all media (website, social media, emails) strengthens brand trust. A simple editorial style guide — vocabulary to use, tone, values to convey — helps a whole team produce aligned content.",
    ],
    keyTakeaways: [
      "Each piece of content must match a specific stage of the customer journey",
      "Speaking to benefits converts better than listing features",
      "Consistent tone across all channels builds trust in the brand",
    ],
    resourceLabels: [
      "Copyblogger — Copywriting resources",
      "HubSpot Academy — Content Marketing",
    ],
    quiz: [
      { question: "What does the acronym AIDA stand for in copywriting?", options: ["Attention, Interest, Desire, Action", "Audience, Information, Distribution, Analysis", "Acquisition, Inscription, Demonstration, Advice", "None of the answers"], explanation: "AIDA is a classic persuasion structure: capture Attention, spark Interest, create Desire, then drive Action." },
      { question: "Which type of content is recommended at the top of the marketing funnel?", options: ["Time-limited offers", "Educational content (articles, explainer videos)", "Customer testimonials only", "Invoices"], explanation: "The top of the funnel aims to educate and inform prospects who are just discovering their problem." },
      { question: "What does the PAS structure mean in copywriting?", options: ["Problem, Agitation, Solution", "Price, Advantage, Service", "Page, Action, Statistic", "Publicity, Announcement, Sponsorship"], explanation: "PAS structures a message by identifying the Problem, Agitating it (amplifying its impact), then offering the Solution." },
      { question: "Why favor benefits over features in a marketing text?", options: ["Because it's shorter to write", "Because benefits answer the customer's 'what's in it for me'", "Because Google requires it", "Because features are forbidden"], explanation: "Customers buy solutions to their problems, not lists of technical specifications." },
      { question: "Which type of content suits the bottom of the funnel?", options: ["General educational articles", "Testimonials and limited offers", "Basic industry definitions", "Unrelated general news"], explanation: "The bottom of the funnel targets prospects ready to buy, where testimonials and offers drive the final conversion." },
      { question: "What does an editorial style guide help guarantee?", options: ["Meeting delivery deadlines", "Consistency of tone and message across all media", "The advertising budget", "The number of followers"], explanation: "A style guide ensures a whole team produces content with a consistent tone and message." },
    ],
  },
  {
    title: "Final project: launching a full campaign",
    objectives: [
      "Design an end-to-end digital marketing strategy",
      "Present a campaign plan with budget and KPIs",
      "Defend your strategic choices before a jury",
    ],
    content: [
      "The final project consists of designing a complete marketing campaign for a fictional or real company: defining the target, choosing channels, creating content, media plan and budget, as well as the success indicators to track.",
      "Each student must justify their choices: why this channel rather than another, how the budget is split between acquisition and retention, and what results are expected at 30, 60 and 90 days. Consistency between objectives, budget and channels is evaluated as a priority.",
      "The oral presentation before a jury of trainers reproduces the real conditions of a corporate strategy defense. It evaluates both the soundness of the strategy and the ability to communicate it clearly to non-expert decision-makers.",
    ],
    keyTakeaways: [
      "A good strategy is measured by its internal coherence, not its complexity",
      "Being able to defend your choices before a non-expert audience is a key skill",
      "The final project validates the ability to apply theory to a real case",
    ],
    resourceLabels: [
      "Free marketing plan template — HubSpot",
    ],
    quiz: [
      { question: "Which element is evaluated as a priority in the final project?", options: ["The length of the document", "Consistency between objectives, budget and channels", "The number of colors used", "The chosen font"], explanation: "The internal coherence of the strategy (objectives aligned with budget and channels) is the main evaluation criterion." },
      { question: "Over which periods must the expected results be projected?", options: ["1 hour, 1 day, 1 week", "30, 60 and 90 days", "1 year, 5 years, 10 years", "No period is required"], explanation: "Expected results must be projected at 30, 60 and 90 days to demonstrate realistic planning." },
      { question: "What does the oral presentation before a jury reproduce?", options: ["A classic written exam", "The real conditions of a corporate strategy defense", "A TV game show", "A job interview only"], explanation: "This presentation simulates a real professional situation of defending a strategy before decision-makers." },
      { question: "A good strategy is measured above all by:", options: ["Its technical complexity", "Its internal coherence", "Its high cost", "The number of pages in the document"], explanation: "Consistency between the strategy's different elements takes priority over complexity or length." },
      { question: "Which skill is specifically evaluated in addition to the strategy itself?", options: ["Typing speed", "The ability to communicate clearly to non-experts", "Knowledge of computer code", "Artistic talent"], explanation: "Being able to simplify and communicate a strategy to non-specialist decision-makers is a key professional skill." },
      { question: "What capability does the final project mainly validate?", options: ["Rote memorization", "Applying theory to a real case", "Execution speed only", "Improvising without preparation"], explanation: "The goal of the final project is to demonstrate that the student can apply learned concepts to a real situation." },
    ],
  },
];

const es: CourseTranslation = [
  {
    title: "Fundamentos del marketing digital",
    objectives: [
      "Comprender los pilares del marketing digital (adquisición, conversión, fidelización)",
      "Identificar los canales digitales pertinentes según el público objetivo",
      "Construir un embudo de marketing sencillo (embudo AARRR)",
    ],
    content: [
      "El marketing digital reúne todas las acciones de marketing llevadas a cabo en canales digitales: motores de búsqueda, redes sociales, correo electrónico, sitios web y aplicaciones móviles. A diferencia del marketing tradicional, permite medir con precisión cada interacción y ajustar las campañas en tiempo real.",
      "El modelo AARRR (Adquisición, Activación, Retención, Recomendación, Ingresos) sirve de marco para estructurar una estrategia digital coherente. Cada etapa corresponde a un objetivo preciso: atraer tráfico cualificado, convertir a los visitantes en clientes, fidelizarlos y luego transformarlos en embajadores de la marca.",
      "En Canadá, el mercado digital está dominado por Google (búsqueda), Meta (Facebook/Instagram) y cada vez más TikTok para las audiencias más jóvenes. La elección de los canales depende del perfil objetivo, del presupuesto disponible y del ciclo de venta del producto o servicio.",
    ],
    keyTakeaways: [
      "El marketing digital se mide: cada dólar invertido debe ser rastreable",
      "Un embudo de marketing bien definido guía todas las decisiones de canal y de contenido",
      "El canal adecuado depende del público, no de las tendencias del momento",
    ],
    resourceLabels: [
      "Google Skillshop — Fundamentos del marketing digital",
      "Meta Blueprint — Formación de marketing gratuita",
    ],
    quiz: [
      { question: "¿Qué significa el acrónimo AARRR en el modelo de embudo de marketing?", options: ["Adquisición, Activación, Retención, Recomendación, Ingresos", "Análisis, Auditoría, Investigación, Informe, Resultado", "Audiencia, Acción, Retorno, Éxito, Rentabilidad", "Compra, Suscripción, Retención, Referencia, ROI"], explanation: "AARRR es el modelo clásico de crecimiento que estructura el recorrido del cliente en 5 etapas medibles." },
      { question: "¿Qué ventaja principal distingue al marketing digital del tradicional?", options: ["Siempre cuesta menos", "La posibilidad de medir con precisión cada interacción", "No requiere ninguna estrategia", "Solo funciona en móvil"], explanation: "La trazabilidad y la medición precisa de cada acción son la diferencia fundamental con el marketing tradicional." },
      { question: "¿Qué canal se privilegia principalmente para llegar a las audiencias más jóvenes según el texto?", options: ["El correo postal", "TikTok", "La radio", "Las páginas amarillas"], explanation: "TikTok se menciona como un canal en crecimiento para llegar a las audiencias jóvenes en Canadá." },
      { question: "La elección de los canales de marketing depende principalmente de:", options: ["El clima", "El perfil objetivo, el presupuesto y el ciclo de venta", "El color del logotipo", "El número de empleados de la empresa"], explanation: "Estos tres factores (perfil, presupuesto, ciclo de venta) determinan la pertinencia de un canal para una estrategia dada." },
      { question: "En el embudo AARRR, ¿qué etapa sigue directamente a la Adquisición?", options: ["Ingresos", "Recomendación", "Activación", "Retención"], explanation: "La Activación corresponde al momento en que un visitante adquirido realiza una primera acción significativa." },
      { question: "¿Por qué es importante poder ajustar una campaña en tiempo real?", options: ["Para cumplir una obligación legal", "Para optimizar el rendimiento y reducir el desperdicio de presupuesto", "Porque es obligatorio en todas las redes sociales", "Para evitar pagar impuestos"], explanation: "El ajuste en tiempo real optimiza el retorno de la inversión corrigiendo rápidamente lo que no funciona." },
    ],
  },
  {
    title: "SEO y posicionamiento orgánico",
    objectives: [
      "Dominar los 3 pilares del SEO: técnico, contenido, autoridad",
      "Realizar una investigación de palabras clave pertinente",
      "Optimizar una página web para los motores de búsqueda",
    ],
    content: [
      "El SEO (Search Engine Optimization) busca mejorar la visibilidad de un sitio en los resultados orgánicos de Google. Se basa en tres pilares: el SEO técnico (velocidad, estructura, indexación), el contenido (relevancia, calidad, palabras clave) y la autoridad (backlinks, autoridad del dominio).",
      "La investigación de palabras clave es el primer paso de toda estrategia SEO. Herramientas como Google Keyword Planner, Ubersuggest o Ahrefs permiten identificar el volumen de búsqueda y la dificultad de posicionamiento de cada término, para priorizar los contenidos a producir.",
      "La optimización on-page consiste en estructurar el contenido con etiquetas de título (H1, H2), una meta descripción atractiva, URLs limpias y un enlazado interno coherente. Google también valora la experiencia del usuario: tiempo de carga, compatibilidad móvil y contenido original.",
    ],
    keyTakeaways: [
      "El SEO es una inversión a largo plazo; los resultados aparecen en 3 a 6 meses",
      "El contenido de calidad sigue siendo el factor de posicionamiento más duradero",
      "La investigación de palabras clave debe preceder a toda creación de contenido",
    ],
    resourceLabels: [
      "Google Search Central — Guía SEO para principiantes",
      "Ubersuggest — Herramienta gratuita de palabras clave",
    ],
    quiz: [
      { question: "¿Cuáles son los tres pilares del SEO mencionados en el módulo?", options: ["Velocidad, precio, diseño", "Técnico, contenido, autoridad", "Texto, imagen, vídeo", "Google, Bing, Yahoo"], explanation: "El SEO técnico, el contenido y la autoridad (backlinks) forman los tres pilares fundamentales del posicionamiento orgánico." },
      { question: "¿Qué tipo de etiqueta estructura el título principal de una página para el SEO?", options: ["H1", "P", "DIV", "SPAN"], explanation: "La etiqueta H1 representa el título principal y más importante para el SEO de una página." },
      { question: "¿Cuánto tiempo se necesita generalmente para ver los primeros resultados de una estrategia SEO?", options: ["24 horas", "1 semana", "3 a 6 meses", "5 años"], explanation: "El SEO es una inversión a medio plazo; los resultados significativos aparecen generalmente entre 3 y 6 meses." },
      { question: "¿Qué designa un 'backlink' en SEO?", options: ["Un enlace de retorno a la página anterior del navegador", "Un enlace procedente de otro sitio que apunta al suyo", "Una palabra clave repetida varias veces", "Un error 404"], explanation: "Un backlink es un enlace externo que apunta a su sitio, reforzando su popularidad y autoridad a ojos de Google." },
      { question: "¿Qué etapa debe preceder a la creación de contenido según el módulo?", options: ["La compra de publicidad", "La investigación de palabras clave", "La creación del logotipo", "La contratación de un desarrollador"], explanation: "La investigación de palabras clave permite identificar los temas con alto potencial antes de producir contenido." },
      { question: "¿Cuál de estos elementos forma parte de la optimización on-page?", options: ["La meta descripción", "El salario de los empleados", "El color de la oficina", "El número de teléfono del director general"], explanation: "La meta descripción, las etiquetas de título y las URLs limpias forman parte de la optimización on-page." },
    ],
  },
  {
    title: "Publicidad en Google Ads y Facebook Ads",
    objectives: [
      "Configurar una campaña de Google Ads orientada a la búsqueda",
      "Crear una campaña segmentada de Facebook/Instagram Ads",
      "Comprender los mecanismos de puja y el coste por clic",
    ],
    content: [
      "Google Ads funciona con un sistema de pujas en tiempo real donde los anunciantes pagan por aparecer en palabras clave específicas. El Quality Score, calculado a partir de la relevancia del anuncio y la tasa de clics, influye directamente en el coste por clic y la posición del anuncio.",
      "Facebook Ads (Meta Ads Manager) permite una segmentación muy precisa basada en los intereses, los comportamientos y los datos demográficos. Las campañas de mejor rendimiento utilizan audiencias personalizadas (clientes existentes) y audiencias similares (lookalike) para ampliar el alcance.",
      "El seguimiento de las conversiones mediante el píxel de Meta o Google Tag Manager es indispensable para medir el retorno de la inversión publicitaria (ROAS). Sin seguimiento, es imposible saber qué campañas generan realmente ventas.",
    ],
    keyTakeaways: [
      "Definir siempre un objetivo de campaña claro antes de lanzar un anuncio",
      "La segmentación precisa vale más que un gran presupuesto mal orientado",
      "El seguimiento de las conversiones debe estar implementado antes del lanzamiento de toda campaña",
    ],
    resourceLabels: [
      "Google Ads — Centro de ayuda oficial",
      "Meta Ads Manager — Documentación",
    ],
    quiz: [
      { question: "¿Qué es el Quality Score en Google Ads?", options: ["El número de seguidores de una página", "Un indicador basado en la relevancia del anuncio y la tasa de clics", "El presupuesto diario máximo", "La nota otorgada por los clientes"], explanation: "El Quality Score evalúa la relevancia de un anuncio e influye directamente en el coste por clic y su posicionamiento." },
      { question: "¿Qué es una audiencia 'lookalike' en Facebook Ads?", options: ["Una audiencia idéntica geográficamente", "Una audiencia similar a sus clientes existentes", "Una audiencia compuesta únicamente por robots", "Una audiencia que ya ha comprado"], explanation: "Una audiencia lookalike (similar) es generada por Meta a partir de las características de sus clientes existentes para ampliar su alcance." },
      { question: "¿Por qué es indispensable el seguimiento de las conversiones?", options: ["Para decorar el panel de control", "Para medir el retorno real de la inversión publicitaria", "Porque Google lo exige legalmente", "Para ralentizar el sitio web"], explanation: "Sin seguimiento de conversiones, es imposible saber qué campañas generan realmente ventas o clientes potenciales." },
      { question: "¿En qué principio se basa el sistema de pujas de Google Ads?", options: ["Primero en llegar, primero en ser servido", "Pujas en tiempo real sobre palabras clave", "Sorteo aleatorio", "Antigüedad de la cuenta publicitaria"], explanation: "Google Ads utiliza un sistema de pujas en tiempo real donde los anunciantes compiten por aparecer en palabras clave." },
      { question: "¿Qué herramienta sirve para hacer seguimiento de las conversiones en Facebook/Instagram Ads?", options: ["El píxel de Meta", "Google Analytics únicamente", "Un código QR", "El calendario de Facebook"], explanation: "El píxel de Meta es la herramienta de seguimiento instalada en el sitio web para medir las acciones de los usuarios que provienen de los anuncios." },
      { question: "¿Qué se debe definir antes de lanzar toda campaña publicitaria?", options: ["El nombre de la agencia creativa", "Un objetivo de campaña claro", "El color preferido del director general", "El número de empleados"], explanation: "Un objetivo claro (notoriedad, tráfico, conversión) guía todas las decisiones de configuración de la campaña." },
    ],
  },
  {
    title: "Redes sociales y community management",
    objectives: [
      "Elaborar una línea editorial adaptada a cada plataforma",
      "Planificar un calendario de publicación coherente",
      "Gestionar la relación con el cliente y la reputación en línea",
    ],
    content: [
      "Cada red social tiene su propio lenguaje y sus propias expectativas: LinkedIn para el B2B y la experiencia, Instagram para lo visual y la inspiración, TikTok para el entretenimiento rápido, Facebook para las comunidades locales. Una línea editorial eficaz adapta el tono y el formato a cada plataforma.",
      "La planificación editorial mediante herramientas como Meta Business Suite, Hootsuite o Buffer permite asegurar una presencia regular sin sobrecarga diaria. La regla del 80/20 recomienda un 80% de contenido de valor (educativo, entretenido) y un 20% de contenido promocional.",
      "El community management implica responder rápidamente a los comentarios y mensajes, gestionar las reseñas negativas con profesionalismo y vigilar la reputación de la marca. Una respuesta rápida y empática a menudo transforma una crítica en una oportunidad de fidelización.",
    ],
    keyTakeaways: [
      "La regularidad de publicación cuenta más que la frecuencia bruta",
      "Cada plataforma exige un formato y un tono específicos",
      "La gestión de las reseñas negativas es tan importante como la creación de contenido",
    ],
    resourceLabels: [
      "Meta Business Suite",
      "Hootsuite Academy — Formación gratuita",
    ],
    quiz: [
      { question: "¿Qué plataforma se cita como la más adaptada al B2B y a la experiencia?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], explanation: "LinkedIn es la red privilegiada para el contenido B2B y el posicionamiento de experiencia profesional." },
      { question: "¿Qué recomienda la regla del 80/20 en la gestión de contenido?", options: ["80% de publicidad, 20% de contenido orgánico", "80% de contenido de valor, 20% de contenido promocional", "80% de vídeos, 20% de texto", "80% por la mañana, 20% por la tarde"], explanation: "Esta regla equilibra el contenido útil para la audiencia (80%) con la promoción directa de productos/servicios (20%)." },
      { question: "¿Cuál es una de las herramientas mencionadas para la planificación editorial?", options: ["Microsoft Excel únicamente", "Hootsuite", "Adobe Photoshop", "Google Maps"], explanation: "Hootsuite es una herramienta de planificación y gestión de publicaciones en varias redes sociales." },
      { question: "¿Cómo gestionar eficazmente una reseña negativa según el módulo?", options: ["Ignorarla completamente", "Eliminarla inmediatamente", "Responder rápidamente y con profesionalismo", "Bloquear al usuario sin respuesta"], explanation: "Una respuesta rápida y empática puede transformar una crítica en una oportunidad de fidelización." },
      { question: "¿Qué cuenta más según el módulo: la frecuencia bruta o la regularidad?", options: ["La frecuencia bruta", "La regularidad de publicación", "Ninguna de las dos", "El número de 'me gusta' únicamente"], explanation: "La regularidad (constancia en el tiempo) es más importante que una frecuencia elevada pero irregular." },
      { question: "¿Qué tipo de contenido se privilegia en TikTok según el texto?", options: ["Artículos de blog largos", "Entretenimiento rápido", "Informes financieros", "Anuncios de empleo formales"], explanation: "TikTok se asocia con el entretenimiento rápido y el contenido corto y atractivo." },
    ],
  },
  {
    title: "E-commerce: creación de una tienda en línea",
    objectives: [
      "Elegir la plataforma de e-commerce adecuada según la necesidad",
      "Estructurar una ficha de producto que convierta",
      "Implementar un recorrido de compra fluido",
    ],
    content: [
      "Las plataformas de e-commerce más utilizadas en Canadá son Shopify (simplicidad, ecosistema de aplicaciones), WooCommerce (flexibilidad mediante WordPress) y Wix (para tiendas pequeñas). La elección depende del volumen de productos, del presupuesto técnico y de las necesidades de integración con otras herramientas.",
      "Una ficha de producto eficaz combina fotos de calidad profesional, una descripción orientada a los beneficios (no solo características), reseñas de clientes visibles y una llamada a la acción clara. La tasa de conversión media en e-commerce ronda el 2 a 3% — cada detalle cuenta.",
      "El recorrido de compra debe minimizar las fricciones: proceso de pago de 3 etapas como máximo, opciones de pago múltiples (tarjeta, PayPal, Apple Pay), visualización transparente de los gastos de envío y política de devolución clara. El abandono medio del carrito supera el 70% — a menudo debido a gastos ocultos descubiertos demasiado tarde.",
    ],
    keyTakeaways: [
      "La plataforma debe corresponder al tamaño y a la complejidad del catálogo",
      "Las fotos y las reseñas de clientes influyen más en la conversión que el precio",
      "Reducir las etapas del embudo de compra disminuye directamente el abandono del carrito",
    ],
    resourceLabels: [
      "Shopify Compass — Cursos de e-commerce gratuitos",
      "Baymard Institute — Investigación UX de e-commerce",
    ],
    quiz: [
      { question: "¿Qué plataforma de e-commerce se describe como la que ofrece flexibilidad mediante WordPress?", options: ["Shopify", "WooCommerce", "Wix", "Amazon"], explanation: "WooCommerce es un plugin de WordPress que ofrece una gran flexibilidad de personalización para el e-commerce." },
      { question: "¿Cuál es la tasa de conversión media en e-commerce mencionada en el módulo?", options: ["50 a 60%", "2 a 3%", "90 a 100%", "0,01%"], explanation: "La tasa de conversión media en e-commerce se sitúa generalmente entre el 2 y el 3%, lo que hace valiosa cada optimización." },
      { question: "¿Qué porcentaje de abandono de carrito se menciona como media?", options: ["Más del 70%", "Alrededor del 10%", "Menos del 5%", "Exactamente el 50%"], explanation: "La tasa media de abandono de carrito supera el 70%, a menudo a causa de gastos ocultos descubiertos tardíamente." },
      { question: "¿Qué debería mostrarse de manera transparente para reducir el abandono del carrito?", options: ["El nombre del fundador", "Los gastos de envío", "La dirección de la sede social", "El número de empleados"], explanation: "La visualización transparente de los gastos de envío desde el principio evita las malas sorpresas que causan el abandono." },
      { question: "Una descripción de producto eficaz debería estar orientada hacia:", options: ["Las características técnicas únicamente", "Los beneficios para el cliente", "El precio únicamente", "La historia de la empresa"], explanation: "Una descripción orientada a los beneficios responde a la pregunta '¿qué me aporta?' en lugar de enumerar características frías." },
      { question: "¿Cuántas etapas como máximo se recomiendan para el proceso de pago?", options: ["10 etapas", "3 etapas", "1 sola etapa obligatoriamente", "Sin límite"], explanation: "Un proceso de pago de 3 etapas como máximo reduce las fricciones y mejora la tasa de conversión." },
    ],
  },
  {
    title: "Analítica y medición del rendimiento",
    objectives: [
      "Configurar Google Analytics 4 para hacer seguimiento de las conversiones",
      "Identificar los indicadores clave de rendimiento (KPI) pertinentes",
      "Interpretar un informe para ajustar una estrategia",
    ],
    content: [
      "Google Analytics 4 (GA4) reemplaza a Universal Analytics con un modelo basado en los eventos en lugar de las sesiones. Permite seguir el recorrido completo de un usuario, desde las redes sociales hasta la compra, pasando por varios dispositivos.",
      "Los KPI esenciales varían según el objetivo de negocio: tasa de conversión y valor medio del pedido para el e-commerce, tasa de generación de leads para el B2B, tasa de interacción para los medios. Hay que evitar ahogarse en métricas de vanidad (visualizaciones, 'me gusta') que no tienen un impacto directo en los ingresos.",
      "El análisis de datos debe desembocar en acciones concretas: si la tasa de rebote es elevada en una página de destino, probar un nuevo título o una nueva imagen. El marketing digital es un ciclo continuo de medición, hipótesis y prueba (test A/B).",
    ],
    keyTakeaways: [
      "Medir sin actuar no tiene ningún valor — cada informe debe llevar a una decisión",
      "Los KPI deben alinearse con los objetivos de negocio reales, no con la vanidad",
      "El test A/B es el método más fiable para validar una hipótesis de marketing",
    ],
    resourceLabels: [
      "Google Analytics Academy",
      "Google Optimize — Guía de tests A/B",
    ],
    quiz: [
      { question: "¿En qué modelo se basa Google Analytics 4 (GA4)?", options: ["Las sesiones únicamente", "Los eventos", "El número de páginas vistas únicamente", "Las cookies de terceros exclusivamente"], explanation: "GA4 utiliza un modelo basado en los eventos, permitiendo un seguimiento más preciso del recorrido del usuario multidispositivo." },
      { question: "¿Qué designa una 'métrica de vanidad'?", options: ["Una métrica financiera crítica", "Una métrica que impresiona pero no tiene impacto directo en los ingresos", "Una métrica ilegal de usar", "El volumen de negocio neto"], explanation: "Las métricas de vanidad (visualizaciones, 'me gusta') halagan el ego pero no siempre reflejan el rendimiento real del negocio." },
      { question: "¿Qué método se recomienda para validar una hipótesis de marketing?", options: ["La intuición sola", "El test A/B", "Adivinar al azar", "Copiar a un competidor sin análisis"], explanation: "El test A/B permite comparar dos versiones y determinar objetivamente cuál rinde mejor." },
      { question: "¿Qué KPI es pertinente para una estrategia de e-commerce según el módulo?", options: ["El número de seguidores en Twitter", "La tasa de conversión y el valor medio del pedido", "El número de empleados", "El clima del día"], explanation: "Para el e-commerce, la tasa de conversión y el valor medio del pedido son KPI directamente ligados al volumen de negocio." },
      { question: "¿Qué hacer si la tasa de rebote es elevada en una página de destino?", options: ["No hacer nada", "Probar un nuevo título o una nueva imagen", "Eliminar el sitio", "Aumentar el precio"], explanation: "Probar elementos como el título o el visual permite identificar lo que retiene mejor la atención de los visitantes." },
      { question: "¿Por qué es inútil simplemente medir sin actuar?", options: ["Porque medir cuesta caro", "Porque un informe debe llevar a una decisión concreta", "Porque Google lo prohíbe", "Porque las cifras siempre son falsas"], explanation: "La medición solo tiene valor si desemboca en acciones concretas para mejorar el rendimiento." },
    ],
  },
  {
    title: "Estrategia de contenido y copywriting",
    objectives: [
      "Definir una estrategia de contenido alineada con el recorrido del cliente",
      "Aplicar las bases del copywriting persuasivo",
      "Producir contenidos adaptados a cada etapa del embudo",
    ],
    content: [
      "Una estrategia de contenido eficaz responde a las preguntas del cliente en cada etapa de su recorrido: contenido educativo en la parte alta del embudo (artículos de blog, vídeos explicativos), contenido de comparación en el medio (estudios de caso, demostraciones) y contenido de conversión en la parte baja (testimonios, ofertas limitadas).",
      "El copywriting se basa en estructuras probadas como AIDA (Atención, Interés, Deseo, Acción) o PAS (Problema, Agitación, Solución). El objetivo es siempre hablar de los beneficios para el cliente en lugar de las características del producto.",
      "La coherencia de tono y de mensaje a través de todos los soportes (sitio web, redes sociales, correos) refuerza la confianza en la marca. Una guía de estilo editorial sencilla — vocabulario a utilizar, tono, valores a transmitir — ayuda a todo un equipo a producir contenido alineado.",
    ],
    keyTakeaways: [
      "Cada contenido debe corresponder a una etapa precisa del recorrido del cliente",
      "Hablar de los beneficios convierte mejor que enumerar características",
      "La coherencia de tono en todos los canales construye la confianza en la marca",
    ],
    resourceLabels: [
      "Copyblogger — Recursos de copywriting",
      "HubSpot Academy — Content Marketing",
    ],
    quiz: [
      { question: "¿Qué significa el acrónimo AIDA en copywriting?", options: ["Atención, Interés, Deseo, Acción", "Audiencia, Información, Distribución, Análisis", "Adquisición, Inscripción, Demostración, Aviso", "Ninguna de las respuestas"], explanation: "AIDA es una estructura clásica de persuasión: captar la Atención, suscitar el Interés, crear el Deseo, y luego impulsar a la Acción." },
      { question: "¿Qué tipo de contenido se recomienda en la parte alta del embudo de marketing?", options: ["Ofertas limitadas en el tiempo", "Contenido educativo (artículos, vídeos explicativos)", "Testimonios de clientes únicamente", "Facturas"], explanation: "La parte alta del embudo busca educar e informar a los prospectos que apenas descubren su problema." },
      { question: "¿Qué significa la estructura PAS en copywriting?", options: ["Problema, Agitación, Solución", "Precio, Ventaja, Servicio", "Página, Acción, Estadística", "Publicidad, Anuncio, Patrocinio"], explanation: "PAS estructura un mensaje identificando el Problema, Agitándolo (amplificando su impacto), y luego proponiendo la Solución." },
      { question: "¿Por qué privilegiar los beneficios en lugar de las características en un texto de marketing?", options: ["Porque es más corto de escribir", "Porque los beneficios responden al '¿qué me aporta?' del cliente", "Porque Google lo exige", "Porque las características están prohibidas"], explanation: "Los clientes compran soluciones a sus problemas, no listas de especificaciones técnicas." },
      { question: "¿Qué tipo de contenido se adapta a la parte baja del embudo?", options: ["Artículos educativos generales", "Testimonios y ofertas limitadas", "Definiciones básicas del sector", "Noticias generales sin relación"], explanation: "La parte baja del embudo apunta a los prospectos listos para comprar, donde los testimonios y ofertas incitan a la conversión final." },
      { question: "¿Qué sirve para garantizar una guía de estilo editorial?", options: ["El respeto de los plazos de entrega", "La coherencia de tono y de mensaje en todos los soportes", "El presupuesto publicitario", "El número de seguidores"], explanation: "Una guía de estilo asegura que todo un equipo produzca contenido con un tono y un mensaje coherentes." },
    ],
  },
  {
    title: "Proyecto final: lanzamiento de una campaña completa",
    objectives: [
      "Concebir una estrategia de marketing digital de principio a fin",
      "Presentar un plan de campaña con presupuesto y KPI",
      "Defender sus decisiones estratégicas ante un jurado",
    ],
    content: [
      "El proyecto final consiste en concebir una campaña de marketing completa para una empresa ficticia o real: definición del objetivo, elección de los canales, creación de contenidos, plan de medios y presupuesto, así como los indicadores de éxito a seguir.",
      "Cada estudiante debe justificar sus decisiones: por qué este canal en lugar de otro, cómo se reparte el presupuesto entre adquisición y fidelización, y qué resultados se esperan a 30, 60 y 90 días. La coherencia entre objetivos, presupuesto y canales se evalúa con prioridad.",
      "La presentación oral ante un jurado de formadores reproduce las condiciones reales de una defensa de estrategia en empresa. Evalúa a la vez la solidez de la estrategia y la capacidad de comunicarla claramente a responsables no expertos.",
    ],
    keyTakeaways: [
      "Una buena estrategia se mide por su coherencia interna, no por su complejidad",
      "Saber defender sus decisiones ante un público no experto es una competencia clave",
      "El proyecto final valida la capacidad de aplicar la teoría a un caso concreto",
    ],
    resourceLabels: [
      "Plantilla gratuita de plan de marketing — HubSpot",
    ],
    quiz: [
      { question: "¿Qué elemento se evalúa con prioridad en el proyecto final?", options: ["La longitud del documento", "La coherencia entre objetivos, presupuesto y canales", "El número de colores utilizados", "La fuente tipográfica elegida"], explanation: "La coherencia interna de la estrategia (objetivos alineados con presupuesto y canales) es el criterio de evaluación principal." },
      { question: "¿En qué periodos deben proyectarse los resultados esperados?", options: ["1 hora, 1 día, 1 semana", "30, 60 y 90 días", "1 año, 5 años, 10 años", "No se requiere ningún periodo"], explanation: "Los resultados esperados deben proyectarse a 30, 60 y 90 días para demostrar una planificación realista." },
      { question: "¿Qué reproduce la presentación oral ante el jurado?", options: ["Un examen escrito clásico", "Las condiciones reales de una defensa de estrategia en empresa", "Un concurso televisivo", "Una entrevista de trabajo únicamente"], explanation: "Esta presentación simula una situación profesional real de defensa de estrategia ante responsables." },
      { question: "Una buena estrategia se mide ante todo por:", options: ["Su complejidad técnica", "Su coherencia interna", "Su coste elevado", "El número de páginas del documento"], explanation: "La coherencia entre los diferentes elementos de la estrategia prima sobre la complejidad o la longitud." },
      { question: "¿Qué competencia se evalúa específicamente además de la estrategia en sí?", options: ["La velocidad de mecanografía", "La capacidad de comunicar claramente a no expertos", "El conocimiento del código informático", "El talento artístico"], explanation: "Saber divulgar y comunicar una estrategia a responsables no especialistas es una competencia profesional clave." },
      { question: "¿Qué capacidad valida principalmente el proyecto final?", options: ["La memorización de memoria", "La aplicación de la teoría a un caso concreto", "La rapidez de ejecución únicamente", "La improvisación sin preparación"], explanation: "El objetivo del proyecto final es demostrar que el estudiante puede aplicar los conceptos aprendidos a una situación real." },
    ],
  },
];

const it: CourseTranslation = [
  {
    title: "Fondamenti del marketing digitale",
    objectives: [
      "Comprendere i pilastri del marketing digitale (acquisizione, conversione, fidelizzazione)",
      "Identificare i canali digitali pertinenti in base al pubblico target",
      "Costruire un funnel di marketing semplice (funnel AARRR)",
    ],
    content: [
      "Il marketing digitale raggruppa l'insieme delle azioni di marketing condotte su canali digitali: motori di ricerca, social media, email, siti web e applicazioni mobili. A differenza del marketing tradizionale, permette di misurare con precisione ogni interazione e di aggiustare le campagne in tempo reale.",
      "Il modello AARRR (Acquisizione, Attivazione, Retention, Raccomandazione, Ricavi) serve da quadro per strutturare una strategia digitale coerente. Ogni fase corrisponde a un obiettivo preciso: attirare traffico qualificato, convertire i visitatori in clienti, fidelizzarli, poi trasformarli in ambasciatori del marchio.",
      "In Canada, il mercato digitale è dominato da Google (ricerca), Meta (Facebook/Instagram) e sempre più TikTok per il pubblico più giovane. La scelta dei canali dipende dal persona target, dal budget disponibile e dal ciclo di vendita del prodotto o servizio.",
    ],
    keyTakeaways: [
      "Il marketing digitale si misura: ogni dollaro investito deve essere tracciabile",
      "Un funnel di marketing ben definito guida tutte le decisioni di canale e di contenuto",
      "Il canale giusto dipende dal pubblico, non dalle tendenze del momento",
    ],
    resourceLabels: [
      "Google Skillshop — Fondamenti del marketing digitale",
      "Meta Blueprint — Formazione marketing gratuita",
    ],
    quiz: [
      { question: "Cosa significa l'acronimo AARRR nel modello di funnel di marketing?", options: ["Acquisizione, Attivazione, Retention, Raccomandazione, Ricavi", "Analisi, Audit, Ricerca, Rapporto, Risultato", "Audience, Azione, Ritorno, Riuscita, Redditività", "Acquisto, Abbonamento, Retention, Referenziazione, ROI"], explanation: "AARRR è il modello classico di crescita che struttura il percorso del cliente in 5 fasi misurabili." },
      { question: "Quale vantaggio principale distingue il marketing digitale da quello tradizionale?", options: ["Costa sempre meno", "La possibilità di misurare con precisione ogni interazione", "Non richiede alcuna strategia", "Funziona solo su mobile"], explanation: "La tracciabilità e la misurazione precisa di ogni azione sono la differenza fondamentale rispetto al marketing tradizionale." },
      { question: "Quale canale è principalmente privilegiato per raggiungere il pubblico più giovane secondo il testo?", options: ["Il mailing postale", "TikTok", "La radio", "Le pagine gialle"], explanation: "TikTok è menzionato come un canale in crescita per raggiungere il pubblico giovane in Canada." },
      { question: "La scelta dei canali di marketing dipende principalmente da:", options: ["Il meteo", "Il persona target, il budget e il ciclo di vendita", "Il colore del logo", "Il numero di dipendenti dell'azienda"], explanation: "Questi tre fattori (persona, budget, ciclo di vendita) determinano la pertinenza di un canale per una strategia data." },
      { question: "Nel funnel AARRR, quale fase segue direttamente l'Acquisizione?", options: ["Ricavi", "Raccomandazione", "Attivazione", "Retention"], explanation: "L'Attivazione corrisponde al momento in cui un visitatore acquisito compie una prima azione significativa." },
      { question: "Perché è importante poter aggiustare una campagna in tempo reale?", options: ["Per rispettare un obbligo legale", "Per ottimizzare la performance e ridurre lo spreco di budget", "Perché è obbligatorio su tutti i social network", "Per evitare di pagare le tasse"], explanation: "L'aggiustamento in tempo reale ottimizza il ritorno sull'investimento correggendo rapidamente ciò che non funziona." },
    ],
  },
  {
    title: "SEO e posizionamento organico",
    objectives: [
      "Padroneggiare i 3 pilastri della SEO: tecnico, contenuto, autorità",
      "Realizzare una ricerca di parole chiave pertinente",
      "Ottimizzare una pagina web per i motori di ricerca",
    ],
    content: [
      "La SEO (Search Engine Optimization) mira a migliorare la visibilità di un sito nei risultati organici di Google. Si basa su tre pilastri: la SEO tecnica (velocità, struttura, indicizzazione), il contenuto (pertinenza, qualità, parole chiave) e l'autorità (backlink, autorità del dominio).",
      "La ricerca di parole chiave è il primo passo di ogni strategia SEO. Strumenti come Google Keyword Planner, Ubersuggest o Ahrefs permettono di identificare il volume di ricerca e la difficoltà di posizionamento per ogni termine, al fine di dare priorità ai contenuti da produrre.",
      "L'ottimizzazione on-page consiste nello strutturare il contenuto con tag di titolo (H1, H2), una meta description accattivante, URL puliti e una struttura di link interni coerente. Google valorizza anche l'esperienza utente: tempo di caricamento, compatibilità mobile e contenuto originale.",
    ],
    keyTakeaways: [
      "La SEO è un investimento a lungo termine, i risultati appaiono in 3-6 mesi",
      "Il contenuto di qualità resta il fattore di posizionamento più duraturo",
      "La ricerca di parole chiave deve precedere ogni creazione di contenuto",
    ],
    resourceLabels: [
      "Google Search Central — Guida SEO per principianti",
      "Ubersuggest — Strumento gratuito di parole chiave",
    ],
    quiz: [
      { question: "Quali sono i tre pilastri della SEO menzionati nel modulo?", options: ["Velocità, prezzo, design", "Tecnico, contenuto, autorità", "Testo, immagine, video", "Google, Bing, Yahoo"], explanation: "La SEO tecnica, il contenuto e l'autorità (backlink) formano i tre pilastri fondamentali del posizionamento organico." },
      { question: "Quale tipo di tag struttura il titolo principale di una pagina per la SEO?", options: ["H1", "P", "DIV", "SPAN"], explanation: "Il tag H1 rappresenta il titolo principale e più importante per la SEO di una pagina." },
      { question: "Quanto tempo ci vuole generalmente per vedere i primi risultati di una strategia SEO?", options: ["24 ore", "1 settimana", "3-6 mesi", "5 anni"], explanation: "La SEO è un investimento a medio termine, i risultati significativi appaiono generalmente tra 3 e 6 mesi." },
      { question: "Cosa indica un 'backlink' in SEO?", options: ["Un link di ritorno alla pagina precedente del browser", "Un link proveniente da un altro sito che punta al vostro", "Una parola chiave ripetuta più volte", "Un errore 404"], explanation: "Un backlink è un link esterno che punta al vostro sito, rafforzando la sua popolarità e autorità agli occhi di Google." },
      { question: "Quale fase deve precedere la creazione di contenuto secondo il modulo?", options: ["L'acquisto di pubblicità", "La ricerca di parole chiave", "La creazione del logo", "L'assunzione di uno sviluppatore"], explanation: "La ricerca di parole chiave permette di identificare gli argomenti ad alto potenziale prima di produrre contenuto." },
      { question: "Quale di questi elementi fa parte dell'ottimizzazione on-page?", options: ["La meta description", "Lo stipendio dei dipendenti", "Il colore dell'ufficio", "Il numero di telefono dell'amministratore delegato"], explanation: "La meta description, i tag di titolo e gli URL puliti fanno parte dell'ottimizzazione on-page." },
    ],
  },
  {
    title: "Pubblicità Google Ads e Facebook Ads",
    objectives: [
      "Configurare una campagna Google Ads orientata alla ricerca",
      "Creare una campagna Facebook/Instagram Ads mirata",
      "Comprendere i meccanismi di offerta e il costo per clic",
    ],
    content: [
      "Google Ads funziona su un sistema di aste in tempo reale dove gli inserzionisti pagano per apparire su parole chiave specifiche. Il Quality Score, calcolato a partire dalla pertinenza dell'annuncio e dal tasso di clic, influenza direttamente il costo per clic e la posizione dell'annuncio.",
      "Facebook Ads (Meta Ads Manager) permette un targeting molto preciso basato sugli interessi, sui comportamenti e sui dati demografici. Le campagne più performanti utilizzano pubblici personalizzati (clienti esistenti) e pubblici simili (lookalike) per estendere la portata.",
      "Il monitoraggio delle conversioni tramite il pixel Meta o Google Tag Manager è indispensabile per misurare il ritorno sull'investimento pubblicitario (ROAS). Senza monitoraggio, è impossibile sapere quali campagne generano realmente vendite.",
    ],
    keyTakeaways: [
      "Definire sempre un obiettivo di campagna chiaro prima di lanciare una pubblicità",
      "Il targeting preciso vale più di un grande budget mal orientato",
      "Il monitoraggio delle conversioni deve essere in atto prima del lancio di ogni campagna",
    ],
    resourceLabels: [
      "Google Ads — Centro assistenza ufficiale",
      "Meta Ads Manager — Documentazione",
    ],
    quiz: [
      { question: "Cos'è il Quality Score su Google Ads?", options: ["Il numero di follower di una pagina", "Un indicatore basato sulla pertinenza dell'annuncio e sul tasso di clic", "Il budget giornaliero massimo", "Il voto attribuito dai clienti"], explanation: "Il Quality Score valuta la pertinenza di un annuncio e influenza direttamente il costo per clic e il suo posizionamento." },
      { question: "Cos'è un pubblico 'lookalike' su Facebook Ads?", options: ["Un pubblico identico geograficamente", "Un pubblico simile ai vostri clienti esistenti", "Un pubblico composto unicamente da robot", "Un pubblico che ha già acquistato"], explanation: "Un pubblico lookalike (simile) è generato da Meta a partire dalle caratteristiche dei vostri clienti esistenti per ampliare la vostra portata." },
      { question: "Perché il monitoraggio delle conversioni è indispensabile?", options: ["Per decorare la dashboard", "Per misurare il ritorno reale sull'investimento pubblicitario", "Perché Google lo esige legalmente", "Per rallentare il sito web"], explanation: "Senza monitoraggio delle conversioni, è impossibile sapere quali campagne generano realmente vendite o lead." },
      { question: "Su quale principio funziona il sistema di aste di Google Ads?", options: ["Primo arrivato, primo servito", "Aste in tempo reale su parole chiave", "Sorteggio casuale", "Anzianità dell'account pubblicitario"], explanation: "Google Ads utilizza un sistema di aste in tempo reale dove gli inserzionisti competono per apparire su parole chiave." },
      { question: "Quale strumento serve a monitorare le conversioni su Facebook/Instagram Ads?", options: ["Il pixel Meta", "Google Analytics unicamente", "Un codice QR", "Il calendario Facebook"], explanation: "Il pixel Meta è lo strumento di monitoraggio installato sul sito web per misurare le azioni degli utenti provenienti dalle pubblicità." },
      { question: "Cosa si deve definire prima di lanciare ogni campagna pubblicitaria?", options: ["Il nome dell'agenzia creativa", "Un obiettivo di campagna chiaro", "Il colore preferito dell'amministratore delegato", "Il numero di dipendenti"], explanation: "Un obiettivo chiaro (notorietà, traffico, conversione) guida tutte le scelte di configurazione della campagna." },
    ],
  },
  {
    title: "Social media e community management",
    objectives: [
      "Elaborare una linea editoriale adattata a ciascuna piattaforma",
      "Pianificare un calendario di pubblicazione coerente",
      "Gestire la relazione con il cliente e la reputazione online",
    ],
    content: [
      "Ogni social network ha il proprio linguaggio e le proprie aspettative: LinkedIn per il B2B e l'expertise, Instagram per il visivo e l'ispirazione, TikTok per l'intrattenimento rapido, Facebook per le comunità locali. Una linea editoriale efficace adatta il tono e il formato a ciascuna piattaforma.",
      "La pianificazione editoriale tramite strumenti come Meta Business Suite, Hootsuite o Buffer permette di assicurare una presenza regolare senza sovraccarico quotidiano. La regola dell'80/20 raccomanda l'80% di contenuto di valore (educativo, divertente) e il 20% di contenuto promozionale.",
      "Il community management implica rispondere rapidamente ai commenti e ai messaggi, gestire le recensioni negative con professionalità e sorvegliare la reputazione del marchio. Una risposta rapida ed empatica trasforma spesso una critica in un'opportunità di fidelizzazione.",
    ],
    keyTakeaways: [
      "La regolarità di pubblicazione conta più della frequenza grezza",
      "Ogni piattaforma esige un formato e un tono specifici",
      "La gestione delle recensioni negative è importante quanto la creazione di contenuto",
    ],
    resourceLabels: [
      "Meta Business Suite",
      "Hootsuite Academy — Formazione gratuita",
    ],
    quiz: [
      { question: "Quale piattaforma è citata come la più adatta al B2B e all'expertise?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], explanation: "LinkedIn è il network privilegiato per il contenuto B2B e il posizionamento di expertise professionale." },
      { question: "Cosa raccomanda la regola dell'80/20 nella gestione del contenuto?", options: ["80% di pubblicità, 20% di contenuto organico", "80% di contenuto di valore, 20% di contenuto promozionale", "80% di video, 20% di testo", "80% al mattino, 20% alla sera"], explanation: "Questa regola bilancia il contenuto utile al pubblico (80%) con la promozione diretta di prodotti/servizi (20%)." },
      { question: "Qual è uno degli strumenti menzionati per la pianificazione editoriale?", options: ["Microsoft Excel unicamente", "Hootsuite", "Adobe Photoshop", "Google Maps"], explanation: "Hootsuite è uno strumento di pianificazione e gestione di pubblicazioni su più social network." },
      { question: "Come gestire efficacemente una recensione negativa secondo il modulo?", options: ["Ignorarla completamente", "Eliminarla immediatamente", "Rispondere rapidamente e con professionalità", "Bloccare l'utente senza risposta"], explanation: "Una risposta rapida ed empatica può trasformare una critica in un'opportunità di fidelizzazione." },
      { question: "Cosa conta di più secondo il modulo: la frequenza grezza o la regolarità?", options: ["La frequenza grezza", "La regolarità di pubblicazione", "Nessuna delle due", "Il numero di 'mi piace' unicamente"], explanation: "La regolarità (costanza nel tempo) è più importante di una frequenza elevata ma irregolare." },
      { question: "Quale tipo di contenuto è privilegiato su TikTok secondo il testo?", options: ["Articoli di blog lunghi", "Intrattenimento rapido", "Rapporti finanziari", "Annunci di lavoro formali"], explanation: "TikTok è associato all'intrattenimento rapido e al contenuto breve e coinvolgente." },
    ],
  },
  {
    title: "E-commerce: creazione di un negozio online",
    objectives: [
      "Scegliere la giusta piattaforma e-commerce in base alle proprie esigenze",
      "Strutturare una scheda prodotto che converte",
      "Implementare un percorso d'acquisto fluido",
    ],
    content: [
      "Le piattaforme e-commerce più utilizzate in Canada sono Shopify (semplicità, ecosistema di applicazioni), WooCommerce (flessibilità tramite WordPress) e Wix (per i piccoli negozi). La scelta dipende dal volume di prodotti, dal budget tecnico e dalle esigenze di integrazione con altri strumenti.",
      "Una scheda prodotto performante combina foto di qualità professionale, una descrizione orientata ai benefici (non solo caratteristiche), recensioni dei clienti visibili e una call to action chiara. Il tasso di conversione medio in e-commerce si aggira intorno al 2-3% — ogni dettaglio conta.",
      "Il percorso d'acquisto deve minimizzare gli attriti: processo di pagamento in 3 fasi massimo, opzioni di pagamento multiple (carta, PayPal, Apple Pay), visualizzazione trasparente delle spese di spedizione e politica di reso chiara. L'abbandono medio del carrello supera il 70% — spesso dovuto a spese nascoste scoperte troppo tardi.",
    ],
    keyTakeaways: [
      "La piattaforma deve corrispondere alla dimensione e alla complessità del catalogo",
      "Le foto e le recensioni dei clienti influenzano la conversione più del prezzo",
      "Ridurre le fasi del funnel d'acquisto diminuisce direttamente l'abbandono del carrello",
    ],
    resourceLabels: [
      "Shopify Compass — Corsi e-commerce gratuiti",
      "Baymard Institute — Ricerca UX e-commerce",
    ],
    quiz: [
      { question: "Quale piattaforma e-commerce è descritta come quella che offre flessibilità tramite WordPress?", options: ["Shopify", "WooCommerce", "Wix", "Amazon"], explanation: "WooCommerce è un plugin WordPress che offre una grande flessibilità di personalizzazione per l'e-commerce." },
      { question: "Qual è il tasso di conversione medio in e-commerce menzionato nel modulo?", options: ["50-60%", "2-3%", "90-100%", "0,01%"], explanation: "Il tasso di conversione medio in e-commerce si situa generalmente tra il 2 e il 3%, il che rende preziosa ogni ottimizzazione." },
      { question: "Quale percentuale di abbandono del carrello è menzionata come media?", options: ["Più del 70%", "Circa il 10%", "Meno del 5%", "Esattamente il 50%"], explanation: "Il tasso medio di abbandono del carrello supera il 70%, spesso a causa di spese nascoste scoperte tardivamente." },
      { question: "Cosa dovrebbe essere visualizzato in modo trasparente per ridurre l'abbandono del carrello?", options: ["Il nome del fondatore", "Le spese di spedizione", "L'indirizzo della sede sociale", "Il numero di dipendenti"], explanation: "La visualizzazione trasparente delle spese di spedizione fin dall'inizio evita le brutte sorprese che causano l'abbandono." },
      { question: "Una descrizione di prodotto efficace dovrebbe essere orientata verso:", options: ["Le caratteristiche tecniche unicamente", "I benefici per il cliente", "Il prezzo unicamente", "La storia dell'azienda"], explanation: "Una descrizione orientata ai benefici risponde alla domanda 'cosa mi porta' invece di elencare caratteristiche fredde." },
      { question: "Quante fasi al massimo sono raccomandate per il processo di pagamento?", options: ["10 fasi", "3 fasi", "1 sola fase obbligatoriamente", "Nessun limite"], explanation: "Un processo di pagamento in 3 fasi massimo riduce gli attriti e migliora il tasso di conversione." },
    ],
  },
  {
    title: "Analytics e misurazione della performance",
    objectives: [
      "Configurare Google Analytics 4 per monitorare le conversioni",
      "Identificare gli indicatori chiave di performance (KPI) pertinenti",
      "Interpretare un report per aggiustare una strategia",
    ],
    content: [
      "Google Analytics 4 (GA4) sostituisce Universal Analytics con un modello basato sugli eventi piuttosto che sulle sessioni. Permette di seguire il percorso completo di un utente, dai social media fino all'acquisto, passando per più dispositivi.",
      "I KPI essenziali variano in base all'obiettivo di business: tasso di conversione e valore medio del carrello per l'e-commerce, tasso di generazione di lead per il B2B, tasso di engagement per i media. Bisogna evitare di annegare in metriche di vanità (visualizzazioni, like) che non hanno un impatto diretto sui ricavi.",
      "L'analisi dei dati deve sfociare in azioni concrete: se il tasso di rimbalzo è elevato su una landing page, testare un nuovo titolo o una nuova immagine. Il marketing digitale è un ciclo continuo di misurazione, ipotesi e test (A/B testing).",
    ],
    keyTakeaways: [
      "Misurare senza agire non ha alcun valore — ogni report deve portare a una decisione",
      "I KPI devono essere allineati agli obiettivi di business reali, non alla vanità",
      "L'A/B testing è il metodo più affidabile per validare un'ipotesi di marketing",
    ],
    resourceLabels: [
      "Google Analytics Academy",
      "Google Optimize — Guida A/B testing",
    ],
    quiz: [
      { question: "Su quale modello si basa Google Analytics 4 (GA4)?", options: ["Le sessioni unicamente", "Gli eventi", "Il numero di pagine viste unicamente", "I cookie di terze parti esclusivamente"], explanation: "GA4 utilizza un modello basato sugli eventi, permettendo un monitoraggio più preciso del percorso utente multi-dispositivo." },
      { question: "Cosa indica una 'metrica di vanità'?", options: ["Una metrica finanziaria critica", "Una metrica che impressiona ma non ha impatto diretto sui ricavi", "Una metrica illegale da usare", "Il fatturato netto"], explanation: "Le metriche di vanità (visualizzazioni, like) lusingano l'ego ma non riflettono sempre la performance reale del business." },
      { question: "Quale metodo è raccomandato per validare un'ipotesi di marketing?", options: ["L'intuizione da sola", "L'A/B testing", "Indovinare a caso", "Copiare un concorrente senza analisi"], explanation: "L'A/B testing permette di confrontare due versioni e di determinare oggettivamente quale rende meglio." },
      { question: "Quale KPI è pertinente per una strategia e-commerce secondo il modulo?", options: ["Il numero di follower su Twitter", "Il tasso di conversione e il valore medio del carrello", "Il numero di dipendenti", "Il meteo del giorno"], explanation: "Per l'e-commerce, il tasso di conversione e il valore medio del carrello sono KPI direttamente legati al fatturato." },
      { question: "Cosa fare se il tasso di rimbalzo è elevato su una landing page?", options: ["Non fare nulla", "Testare un nuovo titolo o una nuova immagine", "Eliminare il sito", "Aumentare il prezzo"], explanation: "Testare elementi come il titolo o il visual permette di identificare ciò che trattiene meglio l'attenzione dei visitatori." },
      { question: "Perché è inutile semplicemente misurare senza agire?", options: ["Perché misurare costa caro", "Perché un report deve portare a una decisione concreta", "Perché Google lo vieta", "Perché le cifre sono sempre false"], explanation: "La misurazione ha valore solo se sfocia in azioni concrete per migliorare la performance." },
    ],
  },
  {
    title: "Strategia di contenuto e copywriting",
    objectives: [
      "Definire una strategia di contenuto allineata al percorso del cliente",
      "Applicare le basi del copywriting persuasivo",
      "Produrre contenuti adattati a ciascuna fase del funnel",
    ],
    content: [
      "Una strategia di contenuto efficace risponde alle domande del cliente a ciascuna fase del suo percorso: contenuto educativo in cima al funnel (articoli di blog, video esplicativi), contenuto di confronto nel mezzo (case study, dimostrazioni) e contenuto di conversione in fondo (testimonianze, offerte limitate).",
      "Il copywriting si basa su strutture comprovate come AIDA (Attenzione, Interesse, Desiderio, Azione) o PAS (Problema, Agitazione, Soluzione). L'obiettivo è sempre parlare dei benefici per il cliente piuttosto che delle caratteristiche del prodotto.",
      "La coerenza di tono e di messaggio attraverso tutti i supporti (sito web, social media, email) rafforza la fiducia nel marchio. Una guida di stile editoriale semplice — vocabolario da usare, tono, valori da trasmettere — aiuta un intero team a produrre contenuto allineato.",
    ],
    keyTakeaways: [
      "Ogni contenuto deve corrispondere a una fase precisa del percorso del cliente",
      "Parlare dei benefici converte meglio che elencare caratteristiche",
      "La coerenza di tono su tutti i canali costruisce la fiducia nel marchio",
    ],
    resourceLabels: [
      "Copyblogger — Risorse copywriting",
      "HubSpot Academy — Content Marketing",
    ],
    quiz: [
      { question: "Cosa significa l'acronimo AIDA in copywriting?", options: ["Attenzione, Interesse, Desiderio, Azione", "Audience, Informazione, Distribuzione, Analisi", "Acquisizione, Iscrizione, Dimostrazione, Avviso", "Nessuna delle risposte"], explanation: "AIDA è una struttura classica di persuasione: catturare l'Attenzione, suscitare l'Interesse, creare il Desiderio, poi spingere all'Azione." },
      { question: "Quale tipo di contenuto è raccomandato in cima al funnel di marketing?", options: ["Offerte limitate nel tempo", "Contenuto educativo (articoli, video esplicativi)", "Testimonianze dei clienti unicamente", "Fatture"], explanation: "La cima del funnel mira a educare e informare i prospect che scoprono appena il loro problema." },
      { question: "Cosa significa la struttura PAS in copywriting?", options: ["Problema, Agitazione, Soluzione", "Prezzo, Vantaggio, Servizio", "Pagina, Azione, Statistica", "Pubblicità, Annuncio, Sponsorizzazione"], explanation: "PAS struttura un messaggio identificando il Problema, Agitandolo (amplificandone l'impatto), poi proponendo la Soluzione." },
      { question: "Perché privilegiare i benefici piuttosto che le caratteristiche in un testo di marketing?", options: ["Perché è più breve da scrivere", "Perché i benefici rispondono al 'cosa mi porta' del cliente", "Perché Google lo esige", "Perché le caratteristiche sono vietate"], explanation: "I clienti acquistano soluzioni ai loro problemi, non liste di specifiche tecniche." },
      { question: "Quale tipo di contenuto si adatta al fondo del funnel?", options: ["Articoli educativi generali", "Testimonianze e offerte limitate", "Definizioni di base del settore", "Notizie generali senza relazione"], explanation: "Il fondo del funnel mira ai prospect pronti ad acquistare, dove le testimonianze e le offerte incitano alla conversione finale." },
      { question: "Cosa serve a garantire una guida di stile editoriale?", options: ["Il rispetto delle scadenze di consegna", "La coerenza di tono e di messaggio su tutti i supporti", "Il budget pubblicitario", "Il numero di follower"], explanation: "Una guida di stile assicura che un intero team produca contenuto con un tono e un messaggio coerenti." },
    ],
  },
  {
    title: "Progetto finale: lancio di una campagna completa",
    objectives: [
      "Concepire una strategia di marketing digitale dall'inizio alla fine",
      "Presentare un piano di campagna con budget e KPI",
      "Difendere le proprie scelte strategiche davanti a una giuria",
    ],
    content: [
      "Il progetto finale consiste nel concepire una campagna di marketing completa per un'azienda fittizia o reale: definizione del target, scelta dei canali, creazione di contenuti, piano media e budget, così come gli indicatori di successo da seguire.",
      "Ogni studente deve giustificare le proprie scelte: perché questo canale piuttosto che un altro, come il budget è ripartito tra acquisizione e fidelizzazione, e quali risultati sono attesi a 30, 60 e 90 giorni. La coerenza tra obiettivi, budget e canali è valutata con priorità.",
      "La presentazione orale davanti a una giuria di formatori riproduce le condizioni reali di una difesa di strategia in azienda. Valuta sia la solidità della strategia sia la capacità di comunicarla chiaramente a decisori non esperti.",
    ],
    keyTakeaways: [
      "Una buona strategia si misura dalla sua coerenza interna, non dalla sua complessità",
      "Saper difendere le proprie scelte davanti a un pubblico non esperto è una competenza chiave",
      "Il progetto finale valida la capacità di applicare la teoria a un caso concreto",
    ],
    resourceLabels: [
      "Template gratuito di piano marketing — HubSpot",
    ],
    quiz: [
      { question: "Quale elemento è valutato con priorità nel progetto finale?", options: ["La lunghezza del documento", "La coerenza tra obiettivi, budget e canali", "Il numero di colori utilizzati", "Il font scelto"], explanation: "La coerenza interna della strategia (obiettivi allineati con budget e canali) è il criterio di valutazione principale." },
      { question: "Su quali periodi devono essere proiettati i risultati attesi?", options: ["1 ora, 1 giorno, 1 settimana", "30, 60 e 90 giorni", "1 anno, 5 anni, 10 anni", "Nessun periodo è richiesto"], explanation: "I risultati attesi devono essere proiettati a 30, 60 e 90 giorni per dimostrare una pianificazione realistica." },
      { question: "Cosa riproduce la presentazione orale davanti alla giuria?", options: ["Un esame scritto classico", "Le condizioni reali di una difesa di strategia in azienda", "Un gioco televisivo", "Un colloquio di lavoro unicamente"], explanation: "Questa presentazione simula una situazione professionale reale di difesa di strategia davanti a decisori." },
      { question: "Una buona strategia si misura innanzitutto da:", options: ["La sua complessità tecnica", "La sua coerenza interna", "Il suo costo elevato", "Il numero di pagine del documento"], explanation: "La coerenza tra i diversi elementi della strategia prevale sulla complessità o sulla lunghezza." },
      { question: "Quale competenza è specificamente valutata oltre alla strategia stessa?", options: ["La velocità di battitura", "La capacità di comunicare chiaramente a non esperti", "La conoscenza del codice informatico", "Il talento artistico"], explanation: "Saper divulgare e comunicare una strategia a decisori non specialisti è una competenza professionale chiave." },
      { question: "Quale capacità valida principalmente il progetto finale?", options: ["La memorizzazione a memoria", "L'applicazione della teoria a un caso concreto", "La rapidità di esecuzione unicamente", "L'improvvisazione senza preparazione"], explanation: "L'obiettivo del progetto finale è dimostrare che lo studente può applicare i concetti appresi a una situazione reale." },
    ],
  },
];

const pt: CourseTranslation = [
  {
    title: "Fundamentos do marketing digital",
    objectives: [
      "Compreender os pilares do marketing digital (aquisição, conversão, fidelização)",
      "Identificar os canais digitais pertinentes conforme o público-alvo",
      "Construir um funil de marketing simples (funil AARRR)",
    ],
    content: [
      "O marketing digital reúne o conjunto de ações de marketing realizadas em canais digitais: motores de busca, redes sociais, e-mail, sites e aplicativos móveis. Ao contrário do marketing tradicional, permite medir com precisão cada interação e ajustar as campanhas em tempo real.",
      "O modelo AARRR (Aquisição, Ativação, Retenção, Recomendação, Receita) serve de quadro para estruturar uma estratégia digital coerente. Cada etapa corresponde a um objetivo preciso: atrair tráfego qualificado, converter os visitantes em clientes, fidelizá-los e depois transformá-los em embaixadores da marca.",
      "No Canadá, o mercado digital é dominado pelo Google (busca), Meta (Facebook/Instagram) e cada vez mais TikTok para os públicos mais jovens. A escolha dos canais depende da persona-alvo, do orçamento disponível e do ciclo de venda do produto ou serviço.",
    ],
    keyTakeaways: [
      "O marketing digital se mede: cada dólar investido deve ser rastreável",
      "Um funil de marketing bem definido orienta todas as decisões de canal e de conteúdo",
      "O canal certo depende do público, não das tendências do momento",
    ],
    resourceLabels: [
      "Google Skillshop — Fundamentos do marketing digital",
      "Meta Blueprint — Formação de marketing gratuita",
    ],
    quiz: [
      { question: "O que significa a sigla AARRR no modelo de funil de marketing?", options: ["Aquisição, Ativação, Retenção, Recomendação, Receita", "Análise, Auditoria, Pesquisa, Relatório, Resultado", "Audiência, Ação, Retorno, Sucesso, Rentabilidade", "Compra, Assinatura, Retenção, Referência, ROI"], explanation: "AARRR é o modelo clássico de crescimento que estrutura a jornada do cliente em 5 etapas mensuráveis." },
      { question: "Qual vantagem principal distingue o marketing digital do tradicional?", options: ["Custa sempre menos", "A possibilidade de medir com precisão cada interação", "Não requer nenhuma estratégia", "Funciona apenas no celular"], explanation: "A rastreabilidade e a medição precisa de cada ação são a diferença fundamental em relação ao marketing tradicional." },
      { question: "Qual canal é principalmente privilegiado para alcançar os públicos mais jovens segundo o texto?", options: ["A mala direta", "TikTok", "O rádio", "As páginas amarelas"], explanation: "O TikTok é mencionado como um canal em crescimento para alcançar os públicos jovens no Canadá." },
      { question: "A escolha dos canais de marketing depende principalmente de:", options: ["O clima", "A persona-alvo, o orçamento e o ciclo de venda", "A cor do logotipo", "O número de funcionários da empresa"], explanation: "Esses três fatores (persona, orçamento, ciclo de venda) determinam a pertinência de um canal para uma estratégia dada." },
      { question: "No funil AARRR, qual etapa segue diretamente a Aquisição?", options: ["Receita", "Recomendação", "Ativação", "Retenção"], explanation: "A Ativação corresponde ao momento em que um visitante adquirido realiza uma primeira ação significativa." },
      { question: "Por que é importante poder ajustar uma campanha em tempo real?", options: ["Para cumprir uma obrigação legal", "Para otimizar o desempenho e reduzir o desperdício de orçamento", "Porque é obrigatório em todas as redes sociais", "Para evitar pagar impostos"], explanation: "O ajuste em tempo real otimiza o retorno sobre o investimento corrigindo rapidamente o que não funciona." },
    ],
  },
  {
    title: "SEO e posicionamento orgânico",
    objectives: [
      "Dominar os 3 pilares do SEO: técnico, conteúdo, autoridade",
      "Realizar uma pesquisa de palavras-chave pertinente",
      "Otimizar uma página web para os motores de busca",
    ],
    content: [
      "O SEO (Search Engine Optimization) visa melhorar a visibilidade de um site nos resultados orgânicos do Google. Baseia-se em três pilares: o SEO técnico (velocidade, estrutura, indexação), o conteúdo (relevância, qualidade, palavras-chave) e a autoridade (backlinks, autoridade do domínio).",
      "A pesquisa de palavras-chave é a primeira etapa de toda estratégia SEO. Ferramentas como Google Keyword Planner, Ubersuggest ou Ahrefs permitem identificar o volume de busca e a dificuldade de posicionamento de cada termo, a fim de priorizar os conteúdos a produzir.",
      "A otimização on-page consiste em estruturar o conteúdo com tags de título (H1, H2), uma meta descrição atrativa, URLs limpas e uma malha interna coerente. O Google também valoriza a experiência do usuário: tempo de carregamento, compatibilidade móvel e conteúdo original.",
    ],
    keyTakeaways: [
      "O SEO é um investimento de longo prazo; os resultados aparecem em 3 a 6 meses",
      "O conteúdo de qualidade continua sendo o fator de posicionamento mais duradouro",
      "A pesquisa de palavras-chave deve preceder toda criação de conteúdo",
    ],
    resourceLabels: [
      "Google Search Central — Guia SEO para iniciantes",
      "Ubersuggest — Ferramenta gratuita de palavras-chave",
    ],
    quiz: [
      { question: "Quais são os três pilares do SEO mencionados no módulo?", options: ["Velocidade, preço, design", "Técnico, conteúdo, autoridade", "Texto, imagem, vídeo", "Google, Bing, Yahoo"], explanation: "O SEO técnico, o conteúdo e a autoridade (backlinks) formam os três pilares fundamentais do posicionamento orgânico." },
      { question: "Qual tipo de tag estrutura o título principal de uma página para o SEO?", options: ["H1", "P", "DIV", "SPAN"], explanation: "A tag H1 representa o título principal e mais importante para o SEO de uma página." },
      { question: "Quanto tempo é geralmente necessário para ver os primeiros resultados de uma estratégia SEO?", options: ["24 horas", "1 semana", "3 a 6 meses", "5 anos"], explanation: "O SEO é um investimento de médio prazo; os resultados significativos aparecem geralmente entre 3 e 6 meses." },
      { question: "O que designa um 'backlink' em SEO?", options: ["Um link de retorno à página anterior do navegador", "Um link proveniente de outro site apontando para o seu", "Uma palavra-chave repetida várias vezes", "Um erro 404"], explanation: "Um backlink é um link externo que aponta para o seu site, reforçando sua popularidade e autoridade aos olhos do Google." },
      { question: "Qual etapa deve preceder a criação de conteúdo segundo o módulo?", options: ["A compra de publicidade", "A pesquisa de palavras-chave", "A criação do logotipo", "A contratação de um desenvolvedor"], explanation: "A pesquisa de palavras-chave permite identificar os temas com alto potencial antes de produzir conteúdo." },
      { question: "Qual destes elementos faz parte da otimização on-page?", options: ["A meta descrição", "O salário dos funcionários", "A cor do escritório", "O número de telefone do diretor-geral"], explanation: "A meta descrição, as tags de título e as URLs limpas fazem parte da otimização on-page." },
    ],
  },
  {
    title: "Publicidade Google Ads e Facebook Ads",
    objectives: [
      "Configurar uma campanha Google Ads orientada para a busca",
      "Criar uma campanha Facebook/Instagram Ads segmentada",
      "Compreender os mecanismos de lance e o custo por clique",
    ],
    content: [
      "O Google Ads funciona com um sistema de leilões em tempo real onde os anunciantes pagam para aparecer em palavras-chave específicas. O Quality Score, calculado a partir da relevância do anúncio e da taxa de cliques, influencia diretamente o custo por clique e a posição do anúncio.",
      "O Facebook Ads (Meta Ads Manager) permite uma segmentação muito precisa baseada nos interesses, nos comportamentos e nos dados demográficos. As campanhas de melhor desempenho utilizam públicos personalizados (clientes existentes) e públicos semelhantes (lookalike) para estender o alcance.",
      "O acompanhamento das conversões através do pixel Meta ou Google Tag Manager é indispensável para medir o retorno sobre o investimento publicitário (ROAS). Sem acompanhamento, é impossível saber quais campanhas geram realmente vendas.",
    ],
    keyTakeaways: [
      "Sempre definir um objetivo de campanha claro antes de lançar uma publicidade",
      "A segmentação precisa vale mais que um grande orçamento mal orientado",
      "O acompanhamento das conversões deve estar implementado antes do lançamento de toda campanha",
    ],
    resourceLabels: [
      "Google Ads — Central de ajuda oficial",
      "Meta Ads Manager — Documentação",
    ],
    quiz: [
      { question: "O que é o Quality Score no Google Ads?", options: ["O número de seguidores de uma página", "Um indicador baseado na relevância do anúncio e na taxa de cliques", "O orçamento diário máximo", "A nota atribuída pelos clientes"], explanation: "O Quality Score avalia a relevância de um anúncio e influencia diretamente o custo por clique e seu posicionamento." },
      { question: "O que é um público 'lookalike' no Facebook Ads?", options: ["Um público idêntico geograficamente", "Um público semelhante aos seus clientes existentes", "Um público composto unicamente por robôs", "Um público que já comprou"], explanation: "Um público lookalike (semelhante) é gerado pela Meta a partir das características dos seus clientes existentes para ampliar seu alcance." },
      { question: "Por que o acompanhamento das conversões é indispensável?", options: ["Para decorar o painel de controle", "Para medir o retorno real sobre o investimento publicitário", "Porque o Google o exige legalmente", "Para deixar o site mais lento"], explanation: "Sem acompanhamento das conversões, é impossível saber quais campanhas geram realmente vendas ou leads." },
      { question: "Em qual princípio funciona o sistema de leilões do Google Ads?", options: ["Primeiro a chegar, primeiro a ser servido", "Leilões em tempo real sobre palavras-chave", "Sorteio aleatório", "Antiguidade da conta publicitária"], explanation: "O Google Ads utiliza um sistema de leilões em tempo real onde os anunciantes competem para aparecer em palavras-chave." },
      { question: "Qual ferramenta serve para acompanhar as conversões no Facebook/Instagram Ads?", options: ["O pixel Meta", "Google Analytics unicamente", "Um código QR", "O calendário do Facebook"], explanation: "O pixel Meta é a ferramenta de acompanhamento instalada no site para medir as ações dos usuários vindos das publicidades." },
      { question: "O que se deve definir antes de lançar toda campanha publicitária?", options: ["O nome da agência criativa", "Um objetivo de campanha claro", "A cor preferida do diretor-geral", "O número de funcionários"], explanation: "Um objetivo claro (notoriedade, tráfego, conversão) orienta todas as escolhas de configuração da campanha." },
    ],
  },
  {
    title: "Redes sociais e community management",
    objectives: [
      "Elaborar uma linha editorial adaptada a cada plataforma",
      "Planejar um calendário de publicação coerente",
      "Gerir a relação com o cliente e a reputação online",
    ],
    content: [
      "Cada rede social tem a sua própria linguagem e as suas próprias expectativas: LinkedIn para o B2B e a expertise, Instagram para o visual e a inspiração, TikTok para o entretenimento rápido, Facebook para as comunidades locais. Uma linha editorial eficaz adapta o tom e o formato a cada plataforma.",
      "O planejamento editorial através de ferramentas como Meta Business Suite, Hootsuite ou Buffer permite assegurar uma presença regular sem sobrecarga diária. A regra dos 80/20 recomenda 80% de conteúdo de valor (educativo, divertido) e 20% de conteúdo promocional.",
      "O community management implica responder rapidamente aos comentários e mensagens, gerir as avaliações negativas com profissionalismo e vigiar a reputação da marca. Uma resposta rápida e empática transforma frequentemente uma crítica numa oportunidade de fidelização.",
    ],
    keyTakeaways: [
      "A regularidade de publicação conta mais que a frequência bruta",
      "Cada plataforma exige um formato e um tom específicos",
      "A gestão das avaliações negativas é tão importante quanto a criação de conteúdo",
    ],
    resourceLabels: [
      "Meta Business Suite",
      "Hootsuite Academy — Formação gratuita",
    ],
    quiz: [
      { question: "Qual plataforma é citada como a mais adaptada ao B2B e à expertise?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], explanation: "O LinkedIn é a rede privilegiada para o conteúdo B2B e o posicionamento de expertise profissional." },
      { question: "O que recomenda a regra dos 80/20 na gestão de conteúdo?", options: ["80% de publicidade, 20% de conteúdo orgânico", "80% de conteúdo de valor, 20% de conteúdo promocional", "80% de vídeos, 20% de texto", "80% de manhã, 20% à noite"], explanation: "Esta regra equilibra o conteúdo útil para o público (80%) com a promoção direta de produtos/serviços (20%)." },
      { question: "Qual é uma das ferramentas mencionadas para o planejamento editorial?", options: ["Microsoft Excel unicamente", "Hootsuite", "Adobe Photoshop", "Google Maps"], explanation: "O Hootsuite é uma ferramenta de planejamento e gestão de publicações em várias redes sociais." },
      { question: "Como gerir eficazmente uma avaliação negativa segundo o módulo?", options: ["Ignorá-la completamente", "Eliminá-la imediatamente", "Responder rapidamente e com profissionalismo", "Bloquear o usuário sem resposta"], explanation: "Uma resposta rápida e empática pode transformar uma crítica numa oportunidade de fidelização." },
      { question: "O que conta mais segundo o módulo: a frequência bruta ou a regularidade?", options: ["A frequência bruta", "A regularidade de publicação", "Nenhuma das duas", "O número de curtidas unicamente"], explanation: "A regularidade (constância ao longo do tempo) é mais importante que uma frequência elevada mas irregular." },
      { question: "Qual tipo de conteúdo é privilegiado no TikTok segundo o texto?", options: ["Artigos de blog longos", "Entretenimento rápido", "Relatórios financeiros", "Anúncios de emprego formais"], explanation: "O TikTok é associado ao entretenimento rápido e ao conteúdo curto e envolvente." },
    ],
  },
  {
    title: "E-commerce: criação de uma loja online",
    objectives: [
      "Escolher a plataforma de e-commerce adequada conforme a necessidade",
      "Estruturar uma ficha de produto que converte",
      "Implementar uma jornada de compra fluida",
    ],
    content: [
      "As plataformas de e-commerce mais utilizadas no Canadá são Shopify (simplicidade, ecossistema de aplicativos), WooCommerce (flexibilidade via WordPress) e Wix (para pequenas lojas). A escolha depende do volume de produtos, do orçamento técnico e das necessidades de integração com outras ferramentas.",
      "Uma ficha de produto eficaz combina fotos de qualidade profissional, uma descrição orientada para os benefícios (não apenas características), avaliações de clientes visíveis e uma chamada à ação clara. A taxa de conversão média em e-commerce gira em torno de 2 a 3% — cada detalhe conta.",
      "A jornada de compra deve minimizar os atritos: processo de pagamento em 3 etapas no máximo, opções de pagamento múltiplas (cartão, PayPal, Apple Pay), exibição transparente dos custos de envio e política de devolução clara. O abandono médio do carrinho ultrapassa 70% — frequentemente devido a custos ocultos descobertos tarde demais.",
    ],
    keyTakeaways: [
      "A plataforma deve corresponder ao tamanho e à complexidade do catálogo",
      "As fotos e as avaliações de clientes influenciam mais a conversão que o preço",
      "Reduzir as etapas do funil de compra diminui diretamente o abandono do carrinho",
    ],
    resourceLabels: [
      "Shopify Compass — Cursos de e-commerce gratuitos",
      "Baymard Institute — Pesquisa UX de e-commerce",
    ],
    quiz: [
      { question: "Qual plataforma de e-commerce é descrita como a que oferece flexibilidade via WordPress?", options: ["Shopify", "WooCommerce", "Wix", "Amazon"], explanation: "O WooCommerce é um plugin do WordPress que oferece uma grande flexibilidade de personalização para o e-commerce." },
      { question: "Qual é a taxa de conversão média em e-commerce mencionada no módulo?", options: ["50 a 60%", "2 a 3%", "90 a 100%", "0,01%"], explanation: "A taxa de conversão média em e-commerce situa-se geralmente entre 2 e 3%, o que torna cada otimização valiosa." },
      { question: "Qual percentual de abandono de carrinho é mencionado como média?", options: ["Mais de 70%", "Cerca de 10%", "Menos de 5%", "Exatamente 50%"], explanation: "A taxa média de abandono de carrinho ultrapassa 70%, frequentemente por causa de custos ocultos descobertos tardiamente." },
      { question: "O que deveria ser exibido de maneira transparente para reduzir o abandono do carrinho?", options: ["O nome do fundador", "Os custos de envio", "O endereço da sede social", "O número de funcionários"], explanation: "A exibição transparente dos custos de envio desde o início evita as más surpresas que causam o abandono." },
      { question: "Uma descrição de produto eficaz deveria estar orientada para:", options: ["As características técnicas unicamente", "Os benefícios para o cliente", "O preço unicamente", "A história da empresa"], explanation: "Uma descrição orientada para os benefícios responde à pergunta 'o que isso me traz' em vez de enumerar características frias." },
      { question: "Quantas etapas no máximo são recomendadas para o processo de pagamento?", options: ["10 etapas", "3 etapas", "1 só etapa obrigatoriamente", "Sem limite"], explanation: "Um processo de pagamento em 3 etapas no máximo reduz os atritos e melhora a taxa de conversão." },
    ],
  },
  {
    title: "Analytics e medição do desempenho",
    objectives: [
      "Configurar o Google Analytics 4 para acompanhar as conversões",
      "Identificar os indicadores-chave de desempenho (KPI) pertinentes",
      "Interpretar um relatório para ajustar uma estratégia",
    ],
    content: [
      "O Google Analytics 4 (GA4) substitui o Universal Analytics com um modelo baseado nos eventos em vez das sessões. Permite seguir a jornada completa de um usuário, das redes sociais até a compra, passando por vários dispositivos.",
      "Os KPI essenciais variam conforme o objetivo de negócio: taxa de conversão e valor médio do pedido para o e-commerce, taxa de geração de leads para o B2B, taxa de engajamento para as mídias. É preciso evitar afogar-se em métricas de vaidade (visualizações, curtidas) que não têm impacto direto na receita.",
      "A análise de dados deve resultar em ações concretas: se a taxa de rejeição é elevada numa landing page, testar um novo título ou uma nova imagem. O marketing digital é um ciclo contínuo de medição, hipótese e teste (teste A/B).",
    ],
    keyTakeaways: [
      "Medir sem agir não tem nenhum valor — cada relatório deve levar a uma decisão",
      "Os KPI devem estar alinhados aos objetivos de negócio reais, não à vaidade",
      "O teste A/B é o método mais confiável para validar uma hipótese de marketing",
    ],
    resourceLabels: [
      "Google Analytics Academy",
      "Google Optimize — Guia de testes A/B",
    ],
    quiz: [
      { question: "Em qual modelo se baseia o Google Analytics 4 (GA4)?", options: ["As sessões unicamente", "Os eventos", "O número de páginas vistas unicamente", "Os cookies de terceiros exclusivamente"], explanation: "O GA4 utiliza um modelo baseado nos eventos, permitindo um acompanhamento mais preciso da jornada do usuário multi-dispositivo." },
      { question: "O que designa uma 'métrica de vaidade'?", options: ["Uma métrica financeira crítica", "Uma métrica que impressiona mas não tem impacto direto na receita", "Uma métrica ilegal de usar", "O faturamento líquido"], explanation: "As métricas de vaidade (visualizações, curtidas) lisonjeiam o ego mas nem sempre refletem o desempenho real do negócio." },
      { question: "Qual método é recomendado para validar uma hipótese de marketing?", options: ["A intuição sozinha", "O teste A/B", "Adivinhar ao acaso", "Copiar um concorrente sem análise"], explanation: "O teste A/B permite comparar duas versões e determinar objetivamente qual tem melhor desempenho." },
      { question: "Qual KPI é pertinente para uma estratégia de e-commerce segundo o módulo?", options: ["O número de seguidores no Twitter", "A taxa de conversão e o valor médio do pedido", "O número de funcionários", "O clima do dia"], explanation: "Para o e-commerce, a taxa de conversão e o valor médio do pedido são KPI diretamente ligados ao faturamento." },
      { question: "O que fazer se a taxa de rejeição é elevada numa landing page?", options: ["Não fazer nada", "Testar um novo título ou uma nova imagem", "Eliminar o site", "Aumentar o preço"], explanation: "Testar elementos como o título ou o visual permite identificar o que retém melhor a atenção dos visitantes." },
      { question: "Por que é inútil simplesmente medir sem agir?", options: ["Porque medir custa caro", "Porque um relatório deve levar a uma decisão concreta", "Porque o Google o proíbe", "Porque os números são sempre falsos"], explanation: "A medição só tem valor se resultar em ações concretas para melhorar o desempenho." },
    ],
  },
  {
    title: "Estratégia de conteúdo e copywriting",
    objectives: [
      "Definir uma estratégia de conteúdo alinhada com a jornada do cliente",
      "Aplicar as bases do copywriting persuasivo",
      "Produzir conteúdos adaptados a cada etapa do funil",
    ],
    content: [
      "Uma estratégia de conteúdo eficaz responde às perguntas do cliente em cada etapa da sua jornada: conteúdo educativo no topo do funil (artigos de blog, vídeos explicativos), conteúdo de comparação no meio (estudos de caso, demonstrações) e conteúdo de conversão na base (depoimentos, ofertas limitadas).",
      "O copywriting baseia-se em estruturas comprovadas como AIDA (Atenção, Interesse, Desejo, Ação) ou PAS (Problema, Agitação, Solução). O objetivo é sempre falar dos benefícios para o cliente em vez das características do produto.",
      "A coerência de tom e de mensagem através de todos os suportes (site, redes sociais, e-mails) reforça a confiança na marca. Um guia de estilo editorial simples — vocabulário a usar, tom, valores a transmitir — ajuda toda uma equipe a produzir conteúdo alinhado.",
    ],
    keyTakeaways: [
      "Cada conteúdo deve corresponder a uma etapa precisa da jornada do cliente",
      "Falar dos benefícios converte melhor que enumerar características",
      "A coerência de tom em todos os canais constrói a confiança na marca",
    ],
    resourceLabels: [
      "Copyblogger — Recursos de copywriting",
      "HubSpot Academy — Content Marketing",
    ],
    quiz: [
      { question: "O que significa a sigla AIDA em copywriting?", options: ["Atenção, Interesse, Desejo, Ação", "Audiência, Informação, Distribuição, Análise", "Aquisição, Inscrição, Demonstração, Aviso", "Nenhuma das respostas"], explanation: "AIDA é uma estrutura clássica de persuasão: captar a Atenção, suscitar o Interesse, criar o Desejo, depois impulsionar à Ação." },
      { question: "Qual tipo de conteúdo é recomendado no topo do funil de marketing?", options: ["Ofertas limitadas no tempo", "Conteúdo educativo (artigos, vídeos explicativos)", "Depoimentos de clientes unicamente", "Faturas"], explanation: "O topo do funil visa educar e informar os prospects que apenas descobrem o seu problema." },
      { question: "O que significa a estrutura PAS em copywriting?", options: ["Problema, Agitação, Solução", "Preço, Vantagem, Serviço", "Página, Ação, Estatística", "Publicidade, Anúncio, Patrocínio"], explanation: "PAS estrutura uma mensagem identificando o Problema, Agitando-o (amplificando o seu impacto), depois propondo a Solução." },
      { question: "Por que privilegiar os benefícios em vez das características num texto de marketing?", options: ["Porque é mais curto de escrever", "Porque os benefícios respondem ao 'o que isso me traz' do cliente", "Porque o Google o exige", "Porque as características são proibidas"], explanation: "Os clientes compram soluções para os seus problemas, não listas de especificações técnicas." },
      { question: "Qual tipo de conteúdo se adapta à base do funil?", options: ["Artigos educativos gerais", "Depoimentos e ofertas limitadas", "Definições básicas do setor", "Notícias gerais sem relação"], explanation: "A base do funil visa os prospects prontos para comprar, onde os depoimentos e ofertas incitam à conversão final." },
      { question: "O que serve para garantir um guia de estilo editorial?", options: ["O respeito dos prazos de entrega", "A coerência de tom e de mensagem em todos os suportes", "O orçamento publicitário", "O número de seguidores"], explanation: "Um guia de estilo assegura que toda uma equipe produza conteúdo com um tom e uma mensagem coerentes." },
    ],
  },
  {
    title: "Projeto final: lançamento de uma campanha completa",
    objectives: [
      "Conceber uma estratégia de marketing digital de ponta a ponta",
      "Apresentar um plano de campanha com orçamento e KPI",
      "Defender as suas escolhas estratégicas diante de uma banca",
    ],
    content: [
      "O projeto final consiste em conceber uma campanha de marketing completa para uma empresa fictícia ou real: definição do alvo, escolha dos canais, criação de conteúdos, plano de mídia e orçamento, assim como os indicadores de sucesso a acompanhar.",
      "Cada estudante deve justificar as suas escolhas: por que este canal em vez de outro, como o orçamento é repartido entre aquisição e fidelização, e quais resultados são esperados a 30, 60 e 90 dias. A coerência entre objetivos, orçamento e canais é avaliada com prioridade.",
      "A apresentação oral diante de uma banca de formadores reproduz as condições reais de uma defesa de estratégia em empresa. Avalia ao mesmo tempo a solidez da estratégia e a capacidade de comunicá-la claramente a decisores não especialistas.",
    ],
    keyTakeaways: [
      "Uma boa estratégia se mede pela sua coerência interna, não pela sua complexidade",
      "Saber defender as suas escolhas diante de um público não especialista é uma competência-chave",
      "O projeto final valida a capacidade de aplicar a teoria a um caso concreto",
    ],
    resourceLabels: [
      "Modelo gratuito de plano de marketing — HubSpot",
    ],
    quiz: [
      { question: "Qual elemento é avaliado com prioridade no projeto final?", options: ["O comprimento do documento", "A coerência entre objetivos, orçamento e canais", "O número de cores utilizadas", "A fonte escolhida"], explanation: "A coerência interna da estratégia (objetivos alinhados com orçamento e canais) é o critério de avaliação principal." },
      { question: "Em quais períodos devem ser projetados os resultados esperados?", options: ["1 hora, 1 dia, 1 semana", "30, 60 e 90 dias", "1 ano, 5 anos, 10 anos", "Nenhum período é exigido"], explanation: "Os resultados esperados devem ser projetados a 30, 60 e 90 dias para demonstrar um planejamento realista." },
      { question: "O que reproduz a apresentação oral diante da banca?", options: ["Um exame escrito clássico", "As condições reais de uma defesa de estratégia em empresa", "Um programa de televisão", "Uma entrevista de emprego unicamente"], explanation: "Esta apresentação simula uma situação profissional real de defesa de estratégia diante de decisores." },
      { question: "Uma boa estratégia se mede acima de tudo por:", options: ["A sua complexidade técnica", "A sua coerência interna", "O seu custo elevado", "O número de páginas do documento"], explanation: "A coerência entre os diferentes elementos da estratégia prevalece sobre a complexidade ou o comprimento." },
      { question: "Qual competência é especificamente avaliada além da estratégia em si?", options: ["A velocidade de digitação", "A capacidade de comunicar claramente a não especialistas", "O conhecimento do código informático", "O talento artístico"], explanation: "Saber divulgar e comunicar uma estratégia a decisores não especialistas é uma competência profissional chave." },
      { question: "Qual capacidade valida principalmente o projeto final?", options: ["A memorização de cor", "A aplicação da teoria a um caso concreto", "A rapidez de execução unicamente", "A improvisação sem preparação"], explanation: "O objetivo do projeto final é demonstrar que o estudante pode aplicar os conceitos aprendidos a uma situação real." },
    ],
  },
];

const de: CourseTranslation = [
  {
    title: "Grundlagen des digitalen Marketings",
    objectives: [
      "Die Säulen des digitalen Marketings verstehen (Akquise, Konversion, Kundenbindung)",
      "Die relevanten digitalen Kanäle je nach Zielgruppe identifizieren",
      "Einen einfachen Marketing-Funnel aufbauen (AARRR-Funnel)",
    ],
    content: [
      "Digitales Marketing umfasst alle Marketingmaßnahmen, die über digitale Kanäle durchgeführt werden: Suchmaschinen, soziale Netzwerke, E-Mail, Websites und mobile Apps. Im Gegensatz zum traditionellen Marketing ermöglicht es, jede Interaktion präzise zu messen und Kampagnen in Echtzeit anzupassen.",
      "Das AARRR-Modell (Akquise, Aktivierung, Bindung, Empfehlung, Umsatz) dient als Rahmen, um eine kohärente digitale Strategie zu strukturieren. Jede Phase entspricht einem präzisen Ziel: qualifizierten Traffic anziehen, Besucher in Kunden umwandeln, sie binden und sie dann zu Markenbotschaftern machen.",
      "In Kanada wird der digitale Markt von Google (Suche), Meta (Facebook/Instagram) und zunehmend TikTok für jüngere Zielgruppen dominiert. Die Wahl der Kanäle hängt von der Zielpersona, dem verfügbaren Budget und dem Verkaufszyklus des Produkts oder der Dienstleistung ab.",
    ],
    keyTakeaways: [
      "Digitales Marketing ist messbar: Jeder investierte Dollar muss nachverfolgbar sein",
      "Ein gut definierter Marketing-Funnel leitet alle Kanal- und Inhaltsentscheidungen",
      "Der richtige Kanal hängt vom Publikum ab, nicht von aktuellen Trends",
    ],
    resourceLabels: [
      "Google Skillshop — Grundlagen des digitalen Marketings",
      "Meta Blueprint — Kostenlose Marketing-Schulung",
    ],
    quiz: [
      { question: "Wofür steht das Akronym AARRR im Marketing-Funnel-Modell?", options: ["Akquise, Aktivierung, Bindung, Empfehlung, Umsatz", "Analyse, Audit, Recherche, Bericht, Resultat", "Audience, Aktion, Rückkehr, Erfolg, Rentabilität", "Kauf, Abonnement, Bindung, Referenzierung, ROI"], explanation: "AARRR ist das klassische Wachstumsmodell, das die Customer Journey in 5 messbare Phasen strukturiert." },
      { question: "Welcher Hauptvorteil unterscheidet digitales Marketing vom traditionellen Marketing?", options: ["Es kostet immer weniger", "Die Möglichkeit, jede Interaktion präzise zu messen", "Es erfordert keine Strategie", "Es funktioniert nur auf dem Handy"], explanation: "Die Nachverfolgbarkeit und die präzise Messung jeder Aktion sind der grundlegende Unterschied zum traditionellen Marketing." },
      { question: "Welcher Kanal wird laut Text hauptsächlich bevorzugt, um jüngere Zielgruppen zu erreichen?", options: ["Postwurfsendung", "TikTok", "Radio", "Gelbe Seiten"], explanation: "TikTok wird als wachsender Kanal genannt, um junge Zielgruppen in Kanada zu erreichen." },
      { question: "Die Wahl der Marketingkanäle hängt hauptsächlich ab von:", options: ["Dem Wetter", "Der Zielpersona, dem Budget und dem Verkaufszyklus", "Der Logofarbe", "Der Anzahl der Mitarbeiter des Unternehmens"], explanation: "Diese drei Faktoren (Persona, Budget, Verkaufszyklus) bestimmen die Relevanz eines Kanals für eine gegebene Strategie." },
      { question: "Welche Phase folgt im AARRR-Funnel direkt auf die Akquise?", options: ["Umsatz", "Empfehlung", "Aktivierung", "Bindung"], explanation: "Die Aktivierung entspricht dem Moment, in dem ein akquirierter Besucher eine erste bedeutsame Aktion ausführt." },
      { question: "Warum ist es wichtig, eine Kampagne in Echtzeit anpassen zu können?", options: ["Um eine gesetzliche Verpflichtung zu erfüllen", "Um die Leistung zu optimieren und Budgetverschwendung zu reduzieren", "Weil es auf allen sozialen Netzwerken Pflicht ist", "Um keine Steuern zu zahlen"], explanation: "Die Anpassung in Echtzeit optimiert die Kapitalrendite, indem sie schnell korrigiert, was nicht funktioniert." },
    ],
  },
  {
    title: "SEO & organische Suche",
    objectives: [
      "Die 3 Säulen der SEO beherrschen: Technik, Inhalt, Autorität",
      "Eine relevante Keyword-Recherche durchführen",
      "Eine Webseite für Suchmaschinen optimieren",
    ],
    content: [
      "SEO (Search Engine Optimization) zielt darauf ab, die Sichtbarkeit einer Website in den organischen Ergebnissen von Google zu verbessern. Es beruht auf drei Säulen: technisches SEO (Geschwindigkeit, Struktur, Indexierung), Inhalt (Relevanz, Qualität, Keywords) und Autorität (Backlinks, Domain-Autorität).",
      "Die Keyword-Recherche ist der erste Schritt jeder SEO-Strategie. Tools wie Google Keyword Planner, Ubersuggest oder Ahrefs ermöglichen es, das Suchvolumen und die Positionierungsschwierigkeit für jeden Begriff zu identifizieren, um die zu produzierenden Inhalte zu priorisieren.",
      "Die On-Page-Optimierung besteht darin, den Inhalt mit Titel-Tags (H1, H2), einer ansprechenden Meta-Beschreibung, sauberen URLs und einer kohärenten internen Verlinkung zu strukturieren. Google schätzt auch die Nutzererfahrung: Ladezeit, mobile Kompatibilität und originaler Inhalt.",
    ],
    keyTakeaways: [
      "SEO ist eine langfristige Investition, die Ergebnisse erscheinen in 3 bis 6 Monaten",
      "Qualitätsinhalt bleibt der nachhaltigste Ranking-Faktor",
      "Die Keyword-Recherche muss jeder Inhaltserstellung vorausgehen",
    ],
    resourceLabels: [
      "Google Search Central — SEO-Leitfaden für Einsteiger",
      "Ubersuggest — Kostenloses Keyword-Tool",
    ],
    quiz: [
      { question: "Was sind die drei im Modul genannten Säulen der SEO?", options: ["Geschwindigkeit, Preis, Design", "Technik, Inhalt, Autorität", "Text, Bild, Video", "Google, Bing, Yahoo"], explanation: "Technisches SEO, Inhalt und Autorität (Backlinks) bilden die drei grundlegenden Säulen der organischen Suche." },
      { question: "Welcher Tag-Typ strukturiert den Haupttitel einer Seite für die SEO?", options: ["H1", "P", "DIV", "SPAN"], explanation: "Der H1-Tag stellt den wichtigsten Haupttitel für die SEO einer Seite dar." },
      { question: "Wie lange dauert es im Allgemeinen, um die ersten Ergebnisse einer SEO-Strategie zu sehen?", options: ["24 Stunden", "1 Woche", "3 bis 6 Monate", "5 Jahre"], explanation: "SEO ist eine mittelfristige Investition; signifikante Ergebnisse erscheinen normalerweise zwischen 3 und 6 Monaten." },
      { question: "Was bezeichnet ein 'Backlink' in der SEO?", options: ["Ein Link zurück zur vorherigen Browser-Seite", "Ein Link von einer anderen Website, der auf Ihre zeigt", "Ein mehrmals wiederholtes Keyword", "Ein 404-Fehler"], explanation: "Ein Backlink ist ein externer Link, der auf Ihre Website zeigt und ihre Popularität und Autorität in den Augen von Google stärkt." },
      { question: "Welcher Schritt muss laut Modul der Inhaltserstellung vorausgehen?", options: ["Der Kauf von Werbung", "Die Keyword-Recherche", "Die Erstellung des Logos", "Die Einstellung eines Entwicklers"], explanation: "Die Keyword-Recherche ermöglicht es, Themen mit hohem Potenzial zu identifizieren, bevor Inhalte produziert werden." },
      { question: "Welches dieser Elemente gehört zur On-Page-Optimierung?", options: ["Die Meta-Beschreibung", "Das Gehalt der Mitarbeiter", "Die Bürofarbe", "Die Telefonnummer des Geschäftsführers"], explanation: "Die Meta-Beschreibung, die Titel-Tags und die sauberen URLs gehören zur On-Page-Optimierung." },
    ],
  },
  {
    title: "Werbung mit Google Ads & Facebook Ads",
    objectives: [
      "Eine suchorientierte Google-Ads-Kampagne einrichten",
      "Eine gezielte Facebook/Instagram-Ads-Kampagne erstellen",
      "Die Auktionsmechanismen und die Kosten pro Klick verstehen",
    ],
    content: [
      "Google Ads funktioniert über ein Echtzeit-Auktionssystem, bei dem Werbetreibende zahlen, um bei bestimmten Keywords zu erscheinen. Der Quality Score, berechnet aus der Anzeigenrelevanz und der Klickrate, beeinflusst direkt die Kosten pro Klick und die Position der Anzeige.",
      "Facebook Ads (Meta Ads Manager) ermöglicht ein sehr präzises Targeting basierend auf Interessen, Verhalten und demografischen Daten. Die leistungsstärksten Kampagnen verwenden benutzerdefinierte Zielgruppen (bestehende Kunden) und ähnliche Zielgruppen (Lookalike), um die Reichweite zu erweitern.",
      "Das Conversion-Tracking über den Meta-Pixel oder Google Tag Manager ist unverzichtbar, um die Rendite der Werbeausgaben (ROAS) zu messen. Ohne Tracking ist es unmöglich zu wissen, welche Kampagnen tatsächlich Verkäufe generieren.",
    ],
    keyTakeaways: [
      "Definieren Sie immer ein klares Kampagnenziel, bevor Sie eine Anzeige starten",
      "Präzises Targeting ist besser als ein großes, schlecht ausgerichtetes Budget",
      "Das Conversion-Tracking muss vor dem Start jeder Kampagne eingerichtet sein",
    ],
    resourceLabels: [
      "Google Ads — Offizielles Hilfecenter",
      "Meta Ads Manager — Dokumentation",
    ],
    quiz: [
      { question: "Was ist der Quality Score bei Google Ads?", options: ["Die Anzahl der Follower einer Seite", "Ein Indikator basierend auf der Anzeigenrelevanz und der Klickrate", "Das maximale Tagesbudget", "Die von den Kunden vergebene Bewertung"], explanation: "Der Quality Score bewertet die Relevanz einer Anzeige und beeinflusst direkt die Kosten pro Klick und ihre Positionierung." },
      { question: "Was ist eine 'Lookalike'-Zielgruppe bei Facebook Ads?", options: ["Eine geografisch identische Zielgruppe", "Eine Zielgruppe, die Ihren bestehenden Kunden ähnelt", "Eine Zielgruppe, die nur aus Robotern besteht", "Eine Zielgruppe, die bereits gekauft hat"], explanation: "Eine Lookalike-Zielgruppe wird von Meta aus den Merkmalen Ihrer bestehenden Kunden generiert, um Ihre Reichweite zu erweitern." },
      { question: "Warum ist das Conversion-Tracking unverzichtbar?", options: ["Um das Dashboard zu verschönern", "Um die reale Rendite der Werbeausgaben zu messen", "Weil Google es gesetzlich verlangt", "Um die Website zu verlangsamen"], explanation: "Ohne Conversion-Tracking ist es unmöglich zu wissen, welche Kampagnen tatsächlich Verkäufe oder Leads generieren." },
      { question: "Auf welchem Prinzip funktioniert das Auktionssystem von Google Ads?", options: ["Wer zuerst kommt, mahlt zuerst", "Echtzeit-Auktionen auf Keywords", "Zufällige Auslosung", "Alter des Werbekontos"], explanation: "Google Ads verwendet ein Echtzeit-Auktionssystem, bei dem Werbetreibende konkurrieren, um bei Keywords zu erscheinen." },
      { question: "Welches Tool dient zum Tracking von Conversions bei Facebook/Instagram Ads?", options: ["Der Meta-Pixel", "Nur Google Analytics", "Ein QR-Code", "Der Facebook-Kalender"], explanation: "Der Meta-Pixel ist das auf der Website installierte Tracking-Tool, um die Aktionen der von den Anzeigen kommenden Nutzer zu messen." },
      { question: "Was muss vor dem Start jeder Werbekampagne definiert werden?", options: ["Der Name der Kreativagentur", "Ein klares Kampagnenziel", "Die Lieblingsfarbe des Geschäftsführers", "Die Anzahl der Mitarbeiter"], explanation: "Ein klares Ziel (Bekanntheit, Traffic, Conversion) leitet alle Einstellungsentscheidungen der Kampagne." },
    ],
  },
  {
    title: "Soziale Netzwerke & Community-Management",
    objectives: [
      "Eine an jede Plattform angepasste redaktionelle Linie entwickeln",
      "Einen kohärenten Veröffentlichungskalender planen",
      "Die Kundenbeziehung und die Online-Reputation verwalten",
    ],
    content: [
      "Jedes soziale Netzwerk hat seine eigene Sprache und seine eigenen Erwartungen: LinkedIn für B2B und Expertise, Instagram für Visuelles und Inspiration, TikTok für schnelle Unterhaltung, Facebook für lokale Gemeinschaften. Eine effektive redaktionelle Linie passt den Ton und das Format an jede Plattform an.",
      "Die redaktionelle Planung über Tools wie Meta Business Suite, Hootsuite oder Buffer ermöglicht es, eine regelmäßige Präsenz ohne tägliche Überlastung sicherzustellen. Die 80/20-Regel empfiehlt 80 % Wertinhalt (lehrreich, unterhaltsam) und 20 % Werbeinhalt.",
      "Das Community-Management bedeutet, schnell auf Kommentare und Nachrichten zu antworten, negative Bewertungen professionell zu handhaben und die Markenreputation zu überwachen. Eine schnelle, empathische Antwort verwandelt Kritik oft in eine Chance zur Kundenbindung.",
    ],
    keyTakeaways: [
      "Die Regelmäßigkeit der Veröffentlichung zählt mehr als die reine Häufigkeit",
      "Jede Plattform erfordert ein spezifisches Format und einen spezifischen Ton",
      "Das Management negativer Bewertungen ist genauso wichtig wie die Inhaltserstellung",
    ],
    resourceLabels: [
      "Meta Business Suite",
      "Hootsuite Academy — Kostenlose Schulung",
    ],
    quiz: [
      { question: "Welche Plattform wird als die am besten für B2B und Expertise geeignete genannt?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], explanation: "LinkedIn ist das bevorzugte Netzwerk für B2B-Inhalte und die Positionierung professioneller Expertise." },
      { question: "Was empfiehlt die 80/20-Regel im Content-Management?", options: ["80 % Werbung, 20 % organischer Inhalt", "80 % Wertinhalt, 20 % Werbeinhalt", "80 % Videos, 20 % Text", "80 % morgens, 20 % abends"], explanation: "Diese Regel balanciert den für das Publikum nützlichen Inhalt (80 %) mit der direkten Bewerbung von Produkten/Dienstleistungen (20 %)." },
      { question: "Was ist eines der für die redaktionelle Planung genannten Tools?", options: ["Nur Microsoft Excel", "Hootsuite", "Adobe Photoshop", "Google Maps"], explanation: "Hootsuite ist ein Tool zur Planung und Verwaltung von Veröffentlichungen auf mehreren sozialen Netzwerken." },
      { question: "Wie handhabt man laut Modul eine negative Bewertung effektiv?", options: ["Sie vollständig ignorieren", "Sie sofort löschen", "Schnell und professionell antworten", "Den Nutzer ohne Antwort blockieren"], explanation: "Eine schnelle, empathische Antwort kann Kritik in eine Chance zur Kundenbindung verwandeln." },
      { question: "Was zählt laut Modul mehr: die reine Häufigkeit oder die Regelmäßigkeit?", options: ["Die reine Häufigkeit", "Die Regelmäßigkeit der Veröffentlichung", "Keines von beiden", "Nur die Anzahl der Likes"], explanation: "Die Regelmäßigkeit (Beständigkeit über die Zeit) ist wichtiger als eine hohe, aber unregelmäßige Häufigkeit." },
      { question: "Welcher Inhaltstyp wird laut Text auf TikTok bevorzugt?", options: ["Lange Blog-Artikel", "Schnelle Unterhaltung", "Finanzberichte", "Formelle Stellenanzeigen"], explanation: "TikTok wird mit schneller Unterhaltung und kurzem, fesselndem Inhalt assoziiert." },
    ],
  },
  {
    title: "E-Commerce: Erstellung eines Online-Shops",
    objectives: [
      "Die richtige E-Commerce-Plattform nach Bedarf auswählen",
      "Eine Produktseite strukturieren, die konvertiert",
      "Eine reibungslose Kaufreise einrichten",
    ],
    content: [
      "Die meistgenutzten E-Commerce-Plattformen in Kanada sind Shopify (Einfachheit, App-Ökosystem), WooCommerce (Flexibilität über WordPress) und Wix (für kleine Shops). Die Wahl hängt vom Produktvolumen, vom technischen Budget und vom Integrationsbedarf mit anderen Tools ab.",
      "Eine leistungsstarke Produktseite kombiniert Fotos in professioneller Qualität, eine nutzenorientierte Beschreibung (nicht nur Merkmale), sichtbare Kundenbewertungen und einen klaren Handlungsaufruf. Die durchschnittliche E-Commerce-Konversionsrate liegt bei etwa 2 bis 3 % — jedes Detail zählt.",
      "Die Kaufreise muss Reibungen minimieren: Bezahlvorgang mit maximal 3 Schritten, mehrere Zahlungsoptionen (Karte, PayPal, Apple Pay), transparente Anzeige der Versandkosten und klare Rückgaberichtlinie. Der durchschnittliche Warenkorbabbruch übersteigt 70 % — oft aufgrund versteckter Kosten, die zu spät entdeckt werden.",
    ],
    keyTakeaways: [
      "Die Plattform muss zur Größe und Komplexität des Katalogs passen",
      "Fotos und Kundenbewertungen beeinflussen die Konversion mehr als der Preis",
      "Die Reduzierung der Checkout-Schritte senkt direkt den Warenkorbabbruch",
    ],
    resourceLabels: [
      "Shopify Compass — Kostenlose E-Commerce-Kurse",
      "Baymard Institute — E-Commerce-UX-Forschung",
    ],
    quiz: [
      { question: "Welche E-Commerce-Plattform wird als die beschrieben, die Flexibilität über WordPress bietet?", options: ["Shopify", "WooCommerce", "Wix", "Amazon"], explanation: "WooCommerce ist ein WordPress-Plugin, das eine große Anpassungsflexibilität für den E-Commerce bietet." },
      { question: "Was ist die im Modul genannte durchschnittliche E-Commerce-Konversionsrate?", options: ["50 bis 60 %", "2 bis 3 %", "90 bis 100 %", "0,01 %"], explanation: "Die durchschnittliche E-Commerce-Konversionsrate liegt im Allgemeinen zwischen 2 und 3 %, was jede Optimierung wertvoll macht." },
      { question: "Welcher Warenkorbabbruch-Prozentsatz wird als Durchschnitt genannt?", options: ["Über 70 %", "Etwa 10 %", "Weniger als 5 %", "Genau 50 %"], explanation: "Die durchschnittliche Warenkorbabbruchrate übersteigt 70 %, oft aufgrund spät entdeckter versteckter Kosten." },
      { question: "Was sollte transparent angezeigt werden, um den Warenkorbabbruch zu reduzieren?", options: ["Der Name des Gründers", "Die Versandkosten", "Die Adresse des Firmensitzes", "Die Anzahl der Mitarbeiter"], explanation: "Die transparente Anzeige der Versandkosten von Anfang an vermeidet die bösen Überraschungen, die zum Abbruch führen." },
      { question: "Eine effektive Produktbeschreibung sollte ausgerichtet sein auf:", options: ["Nur die technischen Merkmale", "Die Vorteile für den Kunden", "Nur den Preis", "Die Geschichte des Unternehmens"], explanation: "Eine nutzenorientierte Beschreibung beantwortet die Frage 'was bringt mir das', anstatt kalte Merkmale aufzulisten." },
      { question: "Wie viele Schritte werden maximal für den Bezahlvorgang empfohlen?", options: ["10 Schritte", "3 Schritte", "Zwingend nur 1 Schritt", "Keine Grenze"], explanation: "Ein Bezahlvorgang mit maximal 3 Schritten reduziert Reibungen und verbessert die Konversionsrate." },
    ],
  },
  {
    title: "Analytics & Leistungsmessung",
    objectives: [
      "Google Analytics 4 einrichten, um Conversions zu verfolgen",
      "Die relevanten Leistungskennzahlen (KPI) identifizieren",
      "Einen Bericht interpretieren, um eine Strategie anzupassen",
    ],
    content: [
      "Google Analytics 4 (GA4) ersetzt Universal Analytics durch ein ereignisbasiertes Modell statt eines sitzungsbasierten. Es ermöglicht, die komplette Reise eines Nutzers zu verfolgen, von den sozialen Netzwerken bis zum Kauf, über mehrere Geräte hinweg.",
      "Die wesentlichen KPIs variieren je nach Geschäftsziel: Konversionsrate und durchschnittlicher Warenkorb für den E-Commerce, Lead-Generierungsrate für B2B, Engagement-Rate für Medien. Man muss vermeiden, in Vanity-Metriken (Aufrufe, Likes) zu ertrinken, die keine direkte Auswirkung auf den Umsatz haben.",
      "Die Datenanalyse muss zu konkreten Aktionen führen: Wenn die Absprungrate auf einer Landingpage hoch ist, testen Sie einen neuen Titel oder ein neues Bild. Digitales Marketing ist ein kontinuierlicher Zyklus aus Messung, Hypothese und Test (A/B-Testing).",
    ],
    keyTakeaways: [
      "Messen ohne Handeln hat keinen Wert — jeder Bericht muss zu einer Entscheidung führen",
      "Die KPIs müssen sich an realen Geschäftszielen orientieren, nicht an Eitelkeit",
      "A/B-Testing ist die zuverlässigste Methode, um eine Marketing-Hypothese zu validieren",
    ],
    resourceLabels: [
      "Google Analytics Academy",
      "Google Optimize — A/B-Testing-Leitfaden",
    ],
    quiz: [
      { question: "Auf welchem Modell basiert Google Analytics 4 (GA4)?", options: ["Nur die Sitzungen", "Die Ereignisse", "Nur die Anzahl der Seitenaufrufe", "Ausschließlich Drittanbieter-Cookies"], explanation: "GA4 verwendet ein ereignisbasiertes Modell und ermöglicht so eine präzisere Verfolgung der geräteübergreifenden Nutzerreise." },
      { question: "Was bezeichnet eine 'Vanity-Metrik'?", options: ["Eine kritische Finanzkennzahl", "Eine Kennzahl, die beeindruckt, aber keine direkte Auswirkung auf den Umsatz hat", "Eine illegal zu verwendende Kennzahl", "Der Nettoumsatz"], explanation: "Vanity-Metriken (Aufrufe, Likes) schmeicheln dem Ego, spiegeln aber nicht immer die reale Geschäftsleistung wider." },
      { question: "Welche Methode wird empfohlen, um eine Marketing-Hypothese zu validieren?", options: ["Allein die Intuition", "A/B-Testing", "Zufällig raten", "Einen Wettbewerber ohne Analyse kopieren"], explanation: "A/B-Testing ermöglicht es, zwei Versionen zu vergleichen und objektiv zu bestimmen, welche besser abschneidet." },
      { question: "Welcher KPI ist laut Modul für eine E-Commerce-Strategie relevant?", options: ["Die Anzahl der Twitter-Follower", "Die Konversionsrate und der durchschnittliche Warenkorb", "Die Anzahl der Mitarbeiter", "Das Wetter des Tages"], explanation: "Für den E-Commerce sind die Konversionsrate und der durchschnittliche Warenkorb KPIs, die direkt mit dem Umsatz verbunden sind." },
      { question: "Was tun, wenn die Absprungrate auf einer Landingpage hoch ist?", options: ["Nichts tun", "Einen neuen Titel oder ein neues Bild testen", "Die Website löschen", "Den Preis erhöhen"], explanation: "Das Testen von Elementen wie Titel oder Visual hilft zu identifizieren, was die Aufmerksamkeit der Besucher besser hält." },
      { question: "Warum ist es nutzlos, einfach zu messen, ohne zu handeln?", options: ["Weil Messen teuer ist", "Weil ein Bericht zu einer konkreten Entscheidung führen muss", "Weil Google es verbietet", "Weil die Zahlen immer falsch sind"], explanation: "Die Messung hat nur einen Wert, wenn sie zu konkreten Aktionen führt, um die Leistung zu verbessern." },
    ],
  },
  {
    title: "Content-Strategie & Copywriting",
    objectives: [
      "Eine an die Customer Journey angepasste Content-Strategie definieren",
      "Die Grundlagen des überzeugenden Copywritings anwenden",
      "An jede Funnel-Phase angepasste Inhalte produzieren",
    ],
    content: [
      "Eine effektive Content-Strategie beantwortet die Fragen des Kunden in jeder Phase seiner Reise: lehrreicher Inhalt am oberen Ende des Funnels (Blog-Artikel, Erklärvideos), Vergleichsinhalt in der Mitte (Fallstudien, Demonstrationen) und Konversionsinhalt am unteren Ende (Testimonials, begrenzte Angebote).",
      "Copywriting beruht auf bewährten Strukturen wie AIDA (Aufmerksamkeit, Interesse, Verlangen, Aktion) oder PAS (Problem, Agitation, Lösung). Das Ziel ist immer, über die Vorteile für den Kunden zu sprechen statt über die Merkmale des Produkts.",
      "Die Kohärenz von Ton und Botschaft über alle Medien hinweg (Website, soziale Netzwerke, E-Mails) stärkt das Markenvertrauen. Ein einfacher redaktioneller Stilleitfaden — zu verwendendes Vokabular, Ton, zu vermittelnde Werte — hilft einem ganzen Team, abgestimmten Inhalt zu produzieren.",
    ],
    keyTakeaways: [
      "Jeder Inhalt muss einer präzisen Phase der Customer Journey entsprechen",
      "Über Vorteile zu sprechen konvertiert besser als Merkmale aufzulisten",
      "Ein kohärenter Ton über alle Kanäle hinweg baut Vertrauen in die Marke auf",
    ],
    resourceLabels: [
      "Copyblogger — Copywriting-Ressourcen",
      "HubSpot Academy — Content Marketing",
    ],
    quiz: [
      { question: "Wofür steht das Akronym AIDA im Copywriting?", options: ["Aufmerksamkeit, Interesse, Verlangen, Aktion", "Audience, Information, Distribution, Analyse", "Akquise, Anmeldung, Demonstration, Hinweis", "Keine der Antworten"], explanation: "AIDA ist eine klassische Überzeugungsstruktur: die Aufmerksamkeit erregen, das Interesse wecken, das Verlangen erzeugen, dann zur Aktion antreiben." },
      { question: "Welcher Inhaltstyp wird am oberen Ende des Marketing-Funnels empfohlen?", options: ["Zeitlich begrenzte Angebote", "Lehrreicher Inhalt (Artikel, Erklärvideos)", "Nur Kundenstimmen", "Rechnungen"], explanation: "Das obere Ende des Funnels zielt darauf ab, Interessenten zu bilden und zu informieren, die ihr Problem gerade erst entdecken." },
      { question: "Was bedeutet die PAS-Struktur im Copywriting?", options: ["Problem, Agitation, Lösung", "Preis, Vorteil, Service", "Seite, Aktion, Statistik", "Werbung, Anzeige, Sponsoring"], explanation: "PAS strukturiert eine Botschaft, indem es das Problem identifiziert, es agitiert (seine Wirkung verstärkt) und dann die Lösung anbietet." },
      { question: "Warum sollte man in einem Marketingtext die Vorteile gegenüber den Merkmalen bevorzugen?", options: ["Weil es kürzer zu schreiben ist", "Weil die Vorteile das 'was bringt mir das' des Kunden beantworten", "Weil Google es verlangt", "Weil Merkmale verboten sind"], explanation: "Kunden kaufen Lösungen für ihre Probleme, nicht Listen technischer Spezifikationen." },
      { question: "Welcher Inhaltstyp passt zum unteren Ende des Funnels?", options: ["Allgemeine lehrreiche Artikel", "Testimonials und begrenzte Angebote", "Grundlegende Branchendefinitionen", "Allgemeine, themenfremde Nachrichten"], explanation: "Das untere Ende des Funnels zielt auf kaufbereite Interessenten ab, wo Testimonials und Angebote zur finalen Konversion anregen." },
      { question: "Was hilft ein redaktioneller Stilleitfaden zu gewährleisten?", options: ["Die Einhaltung der Lieferfristen", "Die Kohärenz von Ton und Botschaft über alle Medien", "Das Werbebudget", "Die Anzahl der Follower"], explanation: "Ein Stilleitfaden stellt sicher, dass ein ganzes Team Inhalte mit einem kohärenten Ton und einer kohärenten Botschaft produziert." },
    ],
  },
  {
    title: "Abschlussprojekt: Start einer kompletten Kampagne",
    objectives: [
      "Eine durchgängige digitale Marketingstrategie entwerfen",
      "Einen Kampagnenplan mit Budget und KPIs präsentieren",
      "Seine strategischen Entscheidungen vor einer Jury verteidigen",
    ],
    content: [
      "Das Abschlussprojekt besteht darin, eine komplette Marketingkampagne für ein fiktives oder reales Unternehmen zu entwerfen: Definition der Zielgruppe, Wahl der Kanäle, Inhaltserstellung, Medienplan und Budget sowie die zu verfolgenden Erfolgsindikatoren.",
      "Jeder Student muss seine Entscheidungen rechtfertigen: warum dieser Kanal statt eines anderen, wie das Budget zwischen Akquise und Bindung aufgeteilt wird und welche Ergebnisse nach 30, 60 und 90 Tagen erwartet werden. Die Kohärenz zwischen Zielen, Budget und Kanälen wird vorrangig bewertet.",
      "Die mündliche Präsentation vor einer Jury von Ausbildern reproduziert die realen Bedingungen einer Strategieverteidigung im Unternehmen. Sie bewertet sowohl die Solidität der Strategie als auch die Fähigkeit, sie klar an nicht fachkundige Entscheidungsträger zu kommunizieren.",
    ],
    keyTakeaways: [
      "Eine gute Strategie misst sich an ihrer inneren Kohärenz, nicht an ihrer Komplexität",
      "Seine Entscheidungen vor einem nicht fachkundigen Publikum verteidigen zu können ist eine Schlüsselkompetenz",
      "Das Abschlussprojekt validiert die Fähigkeit, die Theorie auf einen konkreten Fall anzuwenden",
    ],
    resourceLabels: [
      "Kostenlose Marketingplan-Vorlage — HubSpot",
    ],
    quiz: [
      { question: "Welches Element wird im Abschlussprojekt vorrangig bewertet?", options: ["Die Länge des Dokuments", "Die Kohärenz zwischen Zielen, Budget und Kanälen", "Die Anzahl der verwendeten Farben", "Die gewählte Schriftart"], explanation: "Die innere Kohärenz der Strategie (an Budget und Kanäle angepasste Ziele) ist das wichtigste Bewertungskriterium." },
      { question: "Über welche Zeiträume müssen die erwarteten Ergebnisse projiziert werden?", options: ["1 Stunde, 1 Tag, 1 Woche", "30, 60 und 90 Tage", "1 Jahr, 5 Jahre, 10 Jahre", "Kein Zeitraum ist erforderlich"], explanation: "Die erwarteten Ergebnisse müssen auf 30, 60 und 90 Tage projiziert werden, um eine realistische Planung zu demonstrieren." },
      { question: "Was reproduziert die mündliche Präsentation vor der Jury?", options: ["Eine klassische schriftliche Prüfung", "Die realen Bedingungen einer Strategieverteidigung im Unternehmen", "Eine Fernsehshow", "Nur ein Vorstellungsgespräch"], explanation: "Diese Präsentation simuliert eine reale berufliche Situation der Strategieverteidigung vor Entscheidungsträgern." },
      { question: "Eine gute Strategie misst sich vor allem an:", options: ["Ihrer technischen Komplexität", "Ihrer inneren Kohärenz", "Ihren hohen Kosten", "Der Anzahl der Seiten des Dokuments"], explanation: "Die Kohärenz zwischen den verschiedenen Elementen der Strategie hat Vorrang vor Komplexität oder Länge." },
      { question: "Welche Kompetenz wird zusätzlich zur Strategie selbst spezifisch bewertet?", options: ["Die Tippgeschwindigkeit", "Die Fähigkeit, klar an Nicht-Fachleute zu kommunizieren", "Die Kenntnis des Computercodes", "Das künstlerische Talent"], explanation: "Eine Strategie an nicht fachkundige Entscheidungsträger zu vermitteln und zu kommunizieren ist eine zentrale berufliche Kompetenz." },
      { question: "Welche Fähigkeit validiert das Abschlussprojekt hauptsächlich?", options: ["Das Auswendiglernen", "Die Anwendung der Theorie auf einen konkreten Fall", "Nur die Ausführungsgeschwindigkeit", "Die Improvisation ohne Vorbereitung"], explanation: "Das Ziel des Abschlussprojekts ist zu demonstrieren, dass der Student die gelernten Konzepte auf eine reale Situation anwenden kann." },
    ],
  },
];

const ht: CourseTranslation = [
  {
    title: "Baz maketing dijital",
    objectives: [
      "Konprann pilye maketing dijital yo (akizisyon, konvèsyon, fidelizasyon)",
      "Idantifye kanal dijital ki enpòtan yo selon piblik sib la",
      "Konstwi yon antònwa maketing senp (antònwa AARRR)",
    ],
    content: [
      "Maketing dijital reyini tout aksyon maketing yo fè sou kanal dijital yo: motè rechèch, rezo sosyal, imel, sitwèb ak aplikasyon mobil. Kontrèman ak maketing tradisyonèl, li pèmèt mezire chak entèraksyon ak presizyon epi ajiste kanpay yo an tan reyèl.",
      "Modèl AARRR (Akizisyon, Aktivasyon, Retansyon, Rekòmandasyon, Revni) sèvi kòm yon kad pou estriktire yon estrateji dijital ki koweran. Chak etap koresponn ak yon objektif presi: atire trafik ki kalifye, konvèti vizitè yo an kliyan, fidelize yo, epi transfòme yo an anbasadè mak la.",
      "Nan Kanada, mache dijital la domine pa Google (rechèch), Meta (Facebook/Instagram) epi de pli zan pli TikTok pou piblik ki pi jèn yo. Chwa kanal yo depann de persona sib la, bidjè ki disponib la ak sik vant pwodwi a oswa sèvis la.",
    ],
    keyTakeaways: [
      "Maketing dijital mezirab: chak dola yo envesti dwe ka swiv",
      "Yon antònwa maketing ki byen defini gide tout desizyon kanal ak kontni",
      "Bon kanal la depann de piblik la, pa de tandans moman an",
    ],
    resourceLabels: [
      "Google Skillshop — Baz maketing dijital",
      "Meta Blueprint — Fòmasyon maketing gratis",
    ],
    quiz: [
      { question: "Kisa akwonim AARRR vle di nan modèl antònwa maketing la?", options: ["Akizisyon, Aktivasyon, Retansyon, Rekòmandasyon, Revni", "Analiz, Odit, Rechèch, Rapò, Rezilta", "Piblik, Aksyon, Retou, Reyisit, Rantabilite", "Acha, Abònman, Retansyon, Referansman, ROI"], explanation: "AARRR se modèl klasik kwasans ki estriktire pakou kliyan an nan 5 etap mezirab." },
      { question: "Ki avantaj prensipal ki distenge maketing dijital ak maketing tradisyonèl?", options: ["Li toujou koute mwens chè", "Posibilite pou mezire chak entèraksyon ak presizyon", "Li pa bezwen okenn estrateji", "Li fonksyone sèlman sou mobil"], explanation: "Kapasite pou swiv ak mezire chak aksyon ak presizyon se diferans fondamantal ak maketing tradisyonèl." },
      { question: "Ki kanal yo prensipalman privilejye pou rive jwenn piblik ki pi jèn yo selon tèks la?", options: ["Lapòs", "TikTok", "Radyo", "Paj jòn yo"], explanation: "Yo mansyone TikTok kòm yon kanal k ap grandi pou rive jwenn piblik jèn yo nan Kanada." },
      { question: "Chwa kanal maketing yo depann prensipalman de:", options: ["Tan an (meteyo)", "Persona sib la, bidjè a ak sik vant la", "Koulè logo a", "Kantite anplwaye antrepriz la"], explanation: "Twa faktè sa yo (persona, bidjè, sik vant) detèmine enpòtans yon kanal pou yon estrateji bay." },
      { question: "Nan antònwa AARRR la, ki etap ki swiv Akizisyon an dirèkteman?", options: ["Revni", "Rekòmandasyon", "Aktivasyon", "Retansyon"], explanation: "Aktivasyon an koresponn ak moman yon vizitè yo akeri pran yon premye aksyon ki gen sans." },
      { question: "Poukisa li enpòtan pou ka ajiste yon kanpay an tan reyèl?", options: ["Pou respekte yon obligasyon legal", "Pou optimize pèfòmans epi diminye gaspiyaj bidjè", "Paske li obligatwa sou tout rezo sosyal", "Pou evite peye taks"], explanation: "Ajisteman an tan reyèl optimize retou sou envestisman an lè li korije rapidman sa ki pa mache." },
    ],
  },
  {
    title: "SEO ak referansman natirèl",
    objectives: [
      "Metrize 3 pilye SEO yo: teknik, kontni, popilarite",
      "Reyalize yon rechèch mo kle ki enpòtan",
      "Optimize yon paj wèb pou motè rechèch yo",
    ],
    content: [
      "SEO (Search Engine Optimization) gen pou objektif amelyore vizibilite yon sit nan rezilta òganik Google yo. Li chita sou twa pilye: SEO teknik (vitès, estrikti, endèksasyon), kontni (enpòtans, kalite, mo kle) ak popilarite (backlinks, otorite domèn nan).",
      "Rechèch mo kle se premye etap nan tout estrateji SEO. Zouti tankou Google Keyword Planner, Ubersuggest oswa Ahrefs pèmèt idantifye volim rechèch la ak difikilte pozisyònman pou chak tèm, pou priyorize kontni pou pwodwi yo.",
      "Optimizasyon on-page konsiste nan estriktire kontni an ak balèz tit (H1, H2), yon meta deskripsyon ki atiran, URL ki pwòp ak yon rezo lyen entèn ki koweran. Google valorize tou eksperyans itilizatè a: tan chajman, konpatibilite mobil ak kontni orijinal.",
    ],
    keyTakeaways: [
      "SEO se yon envestisman alontèm, rezilta yo parèt nan 3 a 6 mwa",
      "Kontni ki gen kalite rete faktè klasman ki pi dirab la",
      "Rechèch mo kle dwe vini anvan tout kreyasyon kontni",
    ],
    resourceLabels: [
      "Google Search Central — Gid SEO pou kòmansè",
      "Ubersuggest — Zouti mo kle gratis",
    ],
    quiz: [
      { question: "Kisa twa pilye SEO ki mansyone nan modil la?", options: ["Vitès, pri, dizay", "Teknik, kontni, popilarite", "Tèks, imaj, videyo", "Google, Bing, Yahoo"], explanation: "SEO teknik, kontni ak popilarite (backlinks) fòme twa pilye fondamantal referansman natirèl la." },
      { question: "Ki kalite balèz ki estriktire tit prensipal yon paj pou SEO?", options: ["H1", "P", "DIV", "SPAN"], explanation: "Balèz H1 la reprezante tit prensipal ak pi enpòtan an pou SEO yon paj." },
      { question: "Konbyen tan li jeneralman pran pou wè premye rezilta yon estrateji SEO?", options: ["24 èdtan", "1 semèn", "3 a 6 mwa", "5 ane"], explanation: "SEO se yon envestisman mwayen tèm; rezilta enpòtan yo parèt jeneralman ant 3 ak 6 mwa." },
      { question: "Kisa yon 'backlink' deziye nan SEO?", options: ["Yon lyen retou nan paj presedan navigatè a", "Yon lyen ki soti nan yon lòt sit ki pwente sou pa w la", "Yon mo kle ki repete plizyè fwa", "Yon erè 404"], explanation: "Yon backlink se yon lyen ekstèn ki pwente sou sit ou a, ki ranfòse popilarite ak otorite li nan je Google." },
      { question: "Ki etap ki dwe vini anvan kreyasyon kontni selon modil la?", options: ["Acha piblisite", "Rechèch mo kle", "Kreyasyon logo a", "Anboche yon devlopè"], explanation: "Rechèch mo kle pèmèt idantifye sijè ki gen gwo potansyèl anvan pwodwi kontni." },
      { question: "Kilès nan eleman sa yo ki fè pati optimizasyon on-page?", options: ["Meta deskripsyon an", "Salè anplwaye yo", "Koulè biwo a", "Nimewo telefòn PDG la"], explanation: "Meta deskripsyon an, balèz tit yo ak URL ki pwòp yo fè pati optimizasyon on-page." },
    ],
  },
  {
    title: "Piblisite Google Ads ak Facebook Ads",
    objectives: [
      "Konfigire yon kanpay Google Ads ki oryante sou rechèch",
      "Kreye yon kanpay Facebook/Instagram Ads ki sible",
      "Konprann mekanis ankè yo ak pri pa klik",
    ],
    content: [
      "Google Ads fonksyone sou yon sistèm ankè an tan reyèl kote anonsè yo peye pou parèt sou mo kle espesifik. Quality Score la, ki kalkile apati enpòtans anons lan ak to klik la, enfliyanse dirèkteman pri pa klik la ak pozisyon anons lan.",
      "Facebook Ads (Meta Ads Manager) pèmèt yon siblaj trè presi ki baze sou enterè, konpòtman ak done demografik. Kanpay ki gen pi bon pèfòmans yo itilize odyans pèsonalize (kliyan ki egziste deja) ak odyans menm jan (lookalike) pou elaji pòte a.",
      "Swivi konvèsyon yo atravè piksèl Meta a oswa Google Tag Manager endispansab pou mezire retou sou envestisman piblisitè a (ROAS). San swivi, li enposib pou konnen ki kanpay ki reyèlman jenere vant.",
    ],
    keyTakeaways: [
      "Toujou defini yon objektif kanpay ki klè anvan lanse yon piblisite",
      "Siblaj presi vo plis pase yon gwo bidjè ki mal oryante",
      "Swivi konvèsyon yo dwe an plas anvan lansman tout kanpay",
    ],
    resourceLabels: [
      "Google Ads — Sant èd ofisyèl",
      "Meta Ads Manager — Dokimantasyon",
    ],
    quiz: [
      { question: "Kisa Quality Score sou Google Ads ye?", options: ["Kantite followers yon paj", "Yon endikatè ki baze sou enpòtans anons lan ak to klik la", "Bidjè jounalye maksimòm", "Nòt kliyan yo bay"], explanation: "Quality Score evalye enpòtans yon anons epi enfliyanse dirèkteman pri pa klik la ak pozisyònman li." },
      { question: "Kisa yon odyans 'lookalike' sou Facebook Ads ye?", options: ["Yon odyans ki idantik jewografikman", "Yon odyans ki sanble ak kliyan ou ki egziste deja yo", "Yon odyans ki konpoze sèlman ak robo", "Yon odyans ki te deja achte"], explanation: "Yon odyans lookalike (menm jan) jenere pa Meta apati karakteristik kliyan ou ki egziste deja yo pou elaji pòte ou." },
      { question: "Poukisa swivi konvèsyon yo endispansab?", options: ["Pou dekore tablo bò a", "Pou mezire retou reyèl sou envestisman piblisitè a", "Paske Google egzije li legalman", "Pou ralanti sitwèb la"], explanation: "San swivi konvèsyon, li enposib pou konnen ki kanpay ki reyèlman jenere vant oswa lead." },
      { question: "Sou ki prensip sistèm ankè Google Ads la fonksyone?", options: ["Premye ki rive, premye yo sèvi", "Ankè an tan reyèl sou mo kle", "Tiraj o aza", "Ansyènte kont piblisitè a"], explanation: "Google Ads itilize yon sistèm ankè an tan reyèl kote anonsè yo konkouri pou parèt sou mo kle." },
      { question: "Ki zouti ki sèvi pou swiv konvèsyon yo sou Facebook/Instagram Ads?", options: ["Piksèl Meta a", "Google Analytics sèlman", "Yon kòd QR", "Kalandriye Facebook la"], explanation: "Piksèl Meta a se zouti swivi yo enstale sou sitwèb la pou mezire aksyon itilizatè ki soti nan piblisite yo." },
      { question: "Kisa nou dwe defini anvan lanse tout kanpay piblisitè?", options: ["Non ajans kreyatif la", "Yon objektif kanpay ki klè", "Koulè prefere PDG la", "Kantite anplwaye"], explanation: "Yon objektif klè (notoryete, trafik, konvèsyon) gide tout chwa konfigirasyon kanpay la." },
    ],
  },
  {
    title: "Rezo sosyal ak community management",
    objectives: [
      "Elabore yon liy editoryal ki adapte ak chak platfòm",
      "Planifye yon kalandriye piblikasyon ki koweran",
      "Jere relasyon ak kliyan an ak repitasyon an liy",
    ],
    content: [
      "Chak rezo sosyal gen pwòp lang li ak pwòp atant li: LinkedIn pou B2B ak ekspètiz, Instagram pou vizyèl ak enspirasyon, TikTok pou divètisman rapid, Facebook pou kominote lokal yo. Yon liy editoryal ki efikas adapte ton an ak fòma a pou chak platfòm.",
      "Planifikasyon editoryal atravè zouti tankou Meta Business Suite, Hootsuite oswa Buffer pèmèt asire yon prezans regilye san sichaj chak jou. Règ 80/20 a rekòmande 80% kontni ki gen valè (edikatif, divètisan) ak 20% kontni pwomosyonèl.",
      "Community management enplike reponn rapidman ak kòmantè ak mesaj, jere avi negatif yo ak pwofesyonalis epi siveye repitasyon mak la. Yon repons rapid ak anpatik souvan transfòme yon kritik an yon opòtinite fidelizasyon.",
    ],
    keyTakeaways: [
      "Regilarite piblikasyon konte plis pase frekans brit la",
      "Chak platfòm egzije yon fòma ak yon ton espesifik",
      "Jesyon avi negatif yo enpòtan menm jan ak kreyasyon kontni",
    ],
    resourceLabels: [
      "Meta Business Suite",
      "Hootsuite Academy — Fòmasyon gratis",
    ],
    quiz: [
      { question: "Ki platfòm yo site kòm pi adapte pou B2B ak ekspètiz?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], explanation: "LinkedIn se rezo ki privilejye pou kontni B2B ak pozisyònman ekspètiz pwofesyonèl." },
      { question: "Kisa règ 80/20 a rekòmande nan jesyon kontni?", options: ["80% piblisite, 20% kontni òganik", "80% kontni ki gen valè, 20% kontni pwomosyonèl", "80% videyo, 20% tèks", "80% nan maten, 20% nan aswè"], explanation: "Règ sa a balanse kontni ki itil pou odyans la (80%) ak pwomosyon dirèk pwodwi/sèvis yo (20%)." },
      { question: "Kilès nan zouti yo mansyone pou planifikasyon editoryal la?", options: ["Microsoft Excel sèlman", "Hootsuite", "Adobe Photoshop", "Google Maps"], explanation: "Hootsuite se yon zouti planifikasyon ak jesyon piblikasyon sou plizyè rezo sosyal." },
      { question: "Kijan pou jere yon avi negatif ak efikasite selon modil la?", options: ["Inyore l konplètman", "Efase l imedyatman", "Reponn rapidman epi ak pwofesyonalis", "Bloke itilizatè a san repons"], explanation: "Yon repons rapid ak anpatik ka transfòme yon kritik an yon opòtinite fidelizasyon." },
      { question: "Kisa ki konte plis selon modil la: frekans brit la oswa regilarite a?", options: ["Frekans brit la", "Regilarite piblikasyon", "Okenn nan de yo", "Kantite like sèlman"], explanation: "Regilarite (konstans nan tan) pi enpòtan pase yon frekans ki wo men iregilye." },
      { question: "Ki kalite kontni yo privilejye sou TikTok selon tèks la?", options: ["Atik blog long", "Divètisman rapid", "Rapò finansye", "Anons travay fòmèl"], explanation: "TikTok asosye ak divètisman rapid ak kontni kout ki angajan." },
    ],
  },
  {
    title: "E-commerce: kreyasyon yon boutik an liy",
    objectives: [
      "Chwazi bon platfòm e-commerce la selon bezwen ou",
      "Estriktire yon fich pwodwi ki konvèti",
      "Mete an plas yon pakou acha ki flwid",
    ],
    content: [
      "Platfòm e-commerce ki pi itilize nan Kanada yo se Shopify (senplisite, ekosistèm aplikasyon), WooCommerce (fleksibilite atravè WordPress) ak Wix (pou ti boutik). Chwa a depann de volim pwodwi, bidjè teknik ak bezwen entegrasyon ak lòt zouti.",
      "Yon fich pwodwi ki pèfòman konbine foto kalite pwofesyonèl, yon deskripsyon ki oryante sou benefis (pa sèlman karakteristik), avi kliyan ki vizib ak yon apèl a aksyon ki klè. To konvèsyon mwayèn nan e-commerce ozalantou 2 a 3% — chak detay konte.",
      "Pakou acha a dwe minimize friksyon yo: pwosesis peman an 3 etap maksimòm, plizyè opsyon peman (kat, PayPal, Apple Pay), afichaj transparan frè livrezon yo ak yon politik retou ki klè. Abandon panye mwayèn depase 70% — souvan akoz frè kache yo dekouvri twò ta.",
    ],
    keyTakeaways: [
      "Platfòm la dwe koresponn ak gwosè ak konpleksite katalòg la",
      "Foto yo ak avi kliyan yo enfliyanse konvèsyon plis pase pri a",
      "Diminye etap antònwa acha a diminye dirèkteman abandon panye a",
    ],
    resourceLabels: [
      "Shopify Compass — Kou e-commerce gratis",
      "Baymard Institute — Rechèch UX e-commerce",
    ],
    quiz: [
      { question: "Ki platfòm e-commerce yo dekri kòm yon ki ofri fleksibilite atravè WordPress?", options: ["Shopify", "WooCommerce", "Wix", "Amazon"], explanation: "WooCommerce se yon plugin WordPress ki ofri yon gwo fleksibilite pèsonalizasyon pou e-commerce." },
      { question: "Ki to konvèsyon mwayèn nan e-commerce yo mansyone nan modil la?", options: ["50 a 60%", "2 a 3%", "90 a 100%", "0,01%"], explanation: "To konvèsyon mwayèn nan e-commerce jeneralman ant 2 ak 3%, sa ki fè chak optimizasyon gen valè." },
      { question: "Ki pousantaj abandon panye yo mansyone kòm mwayèn?", options: ["Plis pase 70%", "Anviwon 10%", "Mwens pase 5%", "Egzakteman 50%"], explanation: "To mwayèn abandon panye a depase 70%, souvan akoz frè kache yo dekouvri ta." },
      { question: "Kisa ki ta dwe afiche yon fason transparan pou diminye abandon panye a?", options: ["Non fondatè a", "Frè livrezon yo", "Adrès syèj sosyal la", "Kantite anplwaye"], explanation: "Afichaj transparan frè livrezon yo depi nan kòmansman evite move sipriz ki lakòz abandon." },
      { question: "Yon deskripsyon pwodwi ki efikas ta dwe oryante sou:", options: ["Karakteristik teknik sèlman", "Benefis pou kliyan an", "Pri sèlman", "Istwa antrepriz la"], explanation: "Yon deskripsyon ki oryante sou benefis reponn kesyon 'kisa sa pote pou mwen' olye li liste karakteristik frèt." },
      { question: "Konbyen etap maksimòm yo rekòmande pou pwosesis peman an?", options: ["10 etap", "3 etap", "1 sèl etap obligatwaman", "Pa gen limit"], explanation: "Yon pwosesis peman an 3 etap maksimòm diminye friksyon epi amelyore to konvèsyon an." },
    ],
  },
  {
    title: "Analytics ak mezi pèfòmans",
    objectives: [
      "Konfigire Google Analytics 4 pou swiv konvèsyon yo",
      "Idantifye endikatè kle pèfòmans yo (KPI) ki enpòtan",
      "Entèprete yon rapò pou ajiste yon estrateji",
    ],
    content: [
      "Google Analytics 4 (GA4) ranplase Universal Analytics ak yon modèl ki baze sou evènman olye seyans. Li pèmèt swiv pakou konplè yon itilizatè, depi rezo sosyal yo jiska acha a, an pasan pa plizyè aparèy.",
      "KPI esansyèl yo varye selon objektif biznis la: to konvèsyon ak panye mwayen pou e-commerce, to jenerasyon lead pou B2B, to angajman pou medya yo. Fòk nou evite nwaye nan metrik vanite (vi, like) ki pa gen enpak dirèk sou revni.",
      "Analiz done dwe debouche sou aksyon konkrè: si to rebondisman an wo sou yon landing page, teste yon nouvo tit oswa yon nouvo imaj. Maketing dijital se yon sik kontinyèl mezi, ipotèz ak tès (A/B testing).",
    ],
    keyTakeaways: [
      "Mezire san aji pa gen okenn valè — chak rapò dwe mennen nan yon desizyon",
      "KPI yo dwe aliyen ak objektif biznis reyèl yo, pa ak vanite",
      "A/B testing se metòd ki pi fyab pou valide yon ipotèz maketing",
    ],
    resourceLabels: [
      "Google Analytics Academy",
      "Google Optimize — Gid A/B testing",
    ],
    quiz: [
      { question: "Sou ki modèl Google Analytics 4 (GA4) chita?", options: ["Seyans yo sèlman", "Evènman yo", "Kantite paj yo gade sèlman", "Cookies twazyèm pati eksklizivman"], explanation: "GA4 itilize yon modèl ki baze sou evènman, ki pèmèt yon swivi pakou itilizatè milti-aparèy ki pi presi." },
      { question: "Kisa yon 'metrik vanite' deziye?", options: ["Yon metrik finansye kritik", "Yon metrik ki enpresyone men ki pa gen enpak dirèk sou revni", "Yon metrik ilegal pou itilize", "Chif dafè nèt"], explanation: "Metrik vanite (vi, like) flate ego a men yo pa toujou reflete pèfòmans biznis reyèl la." },
      { question: "Ki metòd yo rekòmande pou valide yon ipotèz maketing?", options: ["Entwisyon sèlman", "A/B testing", "Devine o aza", "Kopye yon konkiran san analiz"], explanation: "A/B testing pèmèt konpare de vèsyon epi detèmine objektivman kilès ki pèfòme pi byen." },
      { question: "Ki KPI ki enpòtan pou yon estrateji e-commerce selon modil la?", options: ["Kantite followers Twitter", "To konvèsyon an ak panye mwayen an", "Kantite anplwaye", "Meteyo jounen an"], explanation: "Pou e-commerce, to konvèsyon ak panye mwayen se KPI ki dirèkteman lye ak chif dafè." },
      { question: "Kisa pou fè si to rebondisman an wo sou yon landing page?", options: ["Pa fè anyen", "Teste yon nouvo tit oswa yon nouvo imaj", "Efase sit la", "Ogmante pri a"], explanation: "Teste eleman tankou tit la oswa vizyèl la pèmèt idantifye sa ki kenbe atansyon vizitè yo pi byen." },
      { question: "Poukisa li initil pou senpman mezire san aji?", options: ["Paske mezire koute chè", "Paske yon rapò dwe mennen nan yon desizyon konkrè", "Paske Google entèdi l", "Paske chif yo toujou fo"], explanation: "Mezi gen valè sèlman si li debouche sou aksyon konkrè pou amelyore pèfòmans." },
    ],
  },
  {
    title: "Estrateji kontni ak copywriting",
    objectives: [
      "Defini yon estrateji kontni ki aliyen ak pakou kliyan an",
      "Aplike baz copywriting pèsiyazif la",
      "Pwodwi kontni ki adapte ak chak etap antònwa a",
    ],
    content: [
      "Yon estrateji kontni ki efikas reponn kesyon kliyan an nan chak etap pakou li: kontni edikatif anwo antònwa a (atik blog, videyo eksplikatif), kontni konparezon nan mitan (etid ka, demonstrasyon) ak kontni konvèsyon anba (temwayaj, òf limite).",
      "Copywriting chita sou estrikti ki pwouve tankou AIDA (Atansyon, Enterè, Dezi, Aksyon) oswa PAS (Pwoblèm, Ajitasyon, Solisyon). Objektif la se toujou pale de benefis pou kliyan an olye karakteristik pwodwi a.",
      "Koerans ton ak mesaj atravè tout sipò yo (sitwèb, rezo sosyal, imel) ranfòse konfyans mak la. Yon gid estil editoryal senp — vokabilè pou itilize, ton, valè pou transmèt — ede yon ekip antye pwodwi kontni ki aliyen.",
    ],
    keyTakeaways: [
      "Chak kontni dwe koresponn ak yon etap presi nan pakou kliyan an",
      "Pale de benefis konvèti pi byen pase liste karakteristik",
      "Koerans ton sou tout kanal yo konstwi konfyans nan mak la",
    ],
    resourceLabels: [
      "Copyblogger — Resous copywriting",
      "HubSpot Academy — Content Marketing",
    ],
    quiz: [
      { question: "Kisa akwonim AIDA vle di nan copywriting?", options: ["Atansyon, Enterè, Dezi, Aksyon", "Piblik, Enfòmasyon, Distribisyon, Analiz", "Akizisyon, Enskripsyon, Demonstrasyon, Avi", "Okenn nan repons yo"], explanation: "AIDA se yon estrikti klasik pèsiyasyon: kaptire Atansyon, sisite Enterè, kreye Dezi, epi pouse nan Aksyon." },
      { question: "Ki kalite kontni yo rekòmande anwo antònwa maketing la?", options: ["Òf limite nan tan", "Kontni edikatif (atik, videyo eksplikatif)", "Temwayaj kliyan sèlman", "Faktè"], explanation: "Anwo antònwa a gen pou objektif edike ak enfòme pwospè ki fèk dekouvri pwoblèm yo." },
      { question: "Kisa estrikti PAS la vle di nan copywriting?", options: ["Pwoblèm, Ajitasyon, Solisyon", "Pri, Avantaj, Sèvis", "Paj, Aksyon, Estatistik", "Piblisite, Anons, Patwonaj"], explanation: "PAS estriktire yon mesaj lè li idantifye Pwoblèm nan, Ajite l (anplifye enpak li), epi pwopoze Solisyon an." },
      { question: "Poukisa privilejye benefis olye karakteristik nan yon tèks maketing?", options: ["Paske li pi kout pou ekri", "Paske benefis yo reponn 'kisa sa pote pou mwen' kliyan an", "Paske Google egzije li", "Paske karakteristik yo entèdi"], explanation: "Kliyan yo achte solisyon pou pwoblèm yo, pa lis espesifikasyon teknik." },
      { question: "Ki kalite kontni ki adapte ak anba antònwa a?", options: ["Atik edikatif jeneral", "Temwayaj ak òf limite", "Definisyon baz sektè a", "Nouvèl jeneral san rapò"], explanation: "Anba antònwa a sible pwospè ki pare pou achte, kote temwayaj ak òf ankouraje konvèsyon final la." },
      { question: "Kisa yon gid estil editoryal sèvi pou garanti?", options: ["Respè delè livrezon yo", "Koerans ton ak mesaj sou tout sipò yo", "Bidjè piblisitè a", "Kantite followers"], explanation: "Yon gid estil asire yon ekip antye pwodwi kontni ak yon ton ak yon mesaj ki koweran." },
    ],
  },
  {
    title: "Pwojè final: lansman yon kanpay konplè",
    objectives: [
      "Konsevwa yon estrateji maketing dijital depi nan kòmansman jiska lafen",
      "Prezante yon plan kanpay ak bidjè ak KPI",
      "Defann chwa estratejik ou yo devan yon jiri",
    ],
    content: [
      "Pwojè final la konsiste nan konsevwa yon kanpay maketing konplè pou yon antrepriz fiktif oswa reyèl: definisyon sib la, chwa kanal yo, kreyasyon kontni, plan medya ak bidjè, ansanm ak endikatè siksè pou swiv yo.",
      "Chak etidyan dwe jistifye chwa li yo: poukisa kanal sa a olye yon lòt, kijan bidjè a separe ant akizisyon ak fidelizasyon, epi ki rezilta yo atann nan 30, 60 ak 90 jou. Koerans ant objektif, bidjè ak kanal yo evalye an priyorite.",
      "Prezantasyon oral devan yon jiri fòmatè reprodui kondisyon reyèl yon defans estrateji nan antrepriz. Li evalye ni solidite estrateji a ni kapasite pou kominike li klèman ak desidè ki pa ekspè.",
    ],
    keyTakeaways: [
      "Yon bon estrateji mezire pa koerans entèn li, pa konpleksite li",
      "Konnen defann chwa ou devan yon piblik ki pa ekspè se yon konpetans kle",
      "Pwojè final la valide kapasite pou aplike teyori a sou yon ka konkrè",
    ],
    resourceLabels: [
      "Modèl gratis plan maketing — HubSpot",
    ],
    quiz: [
      { question: "Ki eleman yo evalye an priyorite nan pwojè final la?", options: ["Longè dokiman an", "Koerans ant objektif, bidjè ak kanal yo", "Kantite koulè yo itilize", "Polis karaktè yo chwazi"], explanation: "Koerans entèn estrateji a (objektif ki aliyen ak bidjè ak kanal) se kritè evalyasyon prensipal la." },
      { question: "Sou ki peryòd rezilta yo atann yo dwe pwojte?", options: ["1 èdtan, 1 jou, 1 semèn", "30, 60 ak 90 jou", "1 ane, 5 ane, 10 ane", "Pa gen peryòd ki obligatwa"], explanation: "Rezilta yo atann yo dwe pwojte sou 30, 60 ak 90 jou pou demontre yon planifikasyon reyalis." },
      { question: "Kisa prezantasyon oral devan jiri a reprodui?", options: ["Yon egzamen ekri klasik", "Kondisyon reyèl yon defans estrateji nan antrepriz", "Yon jwèt televizyon", "Yon entèvyou travay sèlman"], explanation: "Prezantasyon sa a similye yon sitiyasyon pwofesyonèl reyèl defans estrateji devan desidè." },
      { question: "Yon bon estrateji mezire avan tou pa:", options: ["Konpleksite teknik li", "Koerans entèn li", "Pri elve li", "Kantite paj dokiman an"], explanation: "Koerans ant diferan eleman estrateji a gen priyorite sou konpleksite oswa longè." },
      { question: "Ki konpetans yo evalye espesifikman anplis estrateji a li menm?", options: ["Vitès tap sou klavye", "Kapasite pou kominike klèman ak moun ki pa ekspè", "Konesans kòd enfòmatik", "Talan atistik"], explanation: "Konnen vulgarize epi kominike yon estrateji ak desidè ki pa espesyalis se yon konpetans pwofesyonèl kle." },
      { question: "Ki kapasite pwojè final la valide prensipalman?", options: ["Memorizasyon pa kè", "Aplikasyon teyori a sou yon ka konkrè", "Rapidite egzekisyon sèlman", "Enpwovizasyon san preparasyon"], explanation: "Objektif pwojè final la se demontre etidyan an ka aplike konsèp li aprann yo sou yon sitiyasyon reyèl." },
    ],
  },
];

export const marketingDigitalTranslations: Partial<Record<Lang, CourseTranslation>> = {
  en,
  es,
  it,
  pt,
  de,
  ht,
};
