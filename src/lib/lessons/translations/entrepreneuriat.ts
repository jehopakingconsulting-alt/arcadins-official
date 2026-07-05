import type { Lang } from "@/lib/i18n";
import type { CourseTranslation } from "./types";

const en: CourseTranslation = [
  {
    title: "Canadian entrepreneurial ecosystem",
    objectives: [
      "Identify the main players in the Canadian entrepreneurial ecosystem",
      "Understand the available business legal structures",
      "Know the support resources for newcomers",
    ],
    content: [
      "The Canadian entrepreneurial ecosystem includes incubators (such as Futurpreneur, MaRS Discovery District), accelerators, regional economic development organizations and chambers of commerce that offer mentorship and networking to entrepreneurs.",
      "Common legal structures include the sole proprietorship (simple but unlimited liability), the corporation (incorporation, limited liability) and the general partnership. The choice depends on the level of risk, financing needs and the desired tax structure.",
      "Several programs specifically target newcomer entrepreneurs: the Quebec Immigrant Entrepreneur Program, Futurpreneur Canada's services offering loans and mentorship, and the business support centers (CLD, SADC) present in every region.",
    ],
    keyTakeaways: [
      "Support exists at every stage — you should never go into business alone",
      "The choice of legal structure has lasting tax and legal consequences",
      "Newcomers have access to specific support resources",
    ],
    resourceLabels: [
      "Futurpreneur Canada",
      "Business Development Bank of Canada (BDC)",
    ],
    quiz: [
      { question: "Which organization is mentioned as offering loans and mentorship to young entrepreneurs?", options: ["Futurpreneur Canada", "Revenu Québec", "The SAAQ", "The Ministry of Health"], explanation: "Futurpreneur Canada specifically supports young entrepreneurs with financing and mentorship." },
      { question: "Which legal structure offers limited liability?", options: ["The sole proprietorship", "The corporation (incorporation)", "No structure offers this", "Undeclared work"], explanation: "The corporation separates personal assets from those of the business, limiting the owner's liability." },
      { question: "What is the main risk of the sole proprietorship?", options: ["No risk", "The owner's unlimited liability", "Too much paperwork", "It is illegal in Canada"], explanation: "In a sole proprietorship, the entrepreneur's personal assets can be at stake in case of business debts." },
      { question: "What are the CLD/SADC mentioned in the module?", options: ["International banks", "Regional business support centers", "High schools", "Insurance companies"], explanation: "CLDs and SADCs are regional organizations supporting economic and entrepreneurial development." },
      { question: "The choice of a business legal structure depends on:", options: ["The entrepreneur's favorite color", "The level of risk, financing and the desired taxation", "Nothing important", "Only the size of the city"], explanation: "These three factors determine which legal structure best suits a given entrepreneurial project." },
      { question: "Why is going into business alone discouraged according to the module?", options: ["Because it is illegal", "Because support exists at every stage and increases the chances of success", "Because you always need a legal partner", "It is not advice given"], explanation: "Many support resources exist and using them significantly increases the chances of success." },
    ],
  },
  {
    title: "Ideation and concept validation",
    objectives: [
      "Apply business idea generation methods",
      "Conduct a simplified market study",
      "Test a concept hypothesis before investing",
    ],
    content: [
      "Generating business ideas often starts from observing an unsolved problem rather than searching for an original idea. The 'Jobs to be Done' method helps identify what customers are really trying to accomplish, beyond the product itself.",
      "A simplified market study includes competitor analysis, estimating the size of the target market and direct interviews with potential customers. This step avoids investing time and money in an idea with no real demand.",
      "The Lean Startup proposes to quickly validate a hypothesis with a minimum viable product (MVP) rather than developing a complete solution before testing the market. Failing quickly and cheaply allows iterating toward a better solution.",
    ],
    keyTakeaways: [
      "A good idea solves a real observed problem, not an assumed one",
      "Talking directly to potential customers is worth more than generic surveys",
      "The MVP allows testing the market before a major investment",
    ],
    resourceLabels: [
      "Lean Startup — Methodology resources",
    ],
    quiz: [
      { question: "What does MVP mean in the Lean Startup methodology?", options: ["Most Valuable Player", "Minimum Viable Product", "Marketing Sales Profit", "Premium Sales Model"], explanation: "The MVP (Minimum Viable Product) is a simplified version of a product allowing a hypothesis to be tested quickly on the market." },
      { question: "Where does a good business idea generally start according to the module?", options: ["From a baseless dream", "From observing a real unsolved problem", "From an exact copy of a competitor", "From chance only"], explanation: "The best ideas solve a real problem observed in potential customers." },
      { question: "What does the 'Jobs to be Done' method aim for?", options: ["Finding a job quickly", "Identifying what customers are really trying to accomplish", "Creating job postings", "Calculating a salary"], explanation: "This method helps understand the customer's deep need rather than focusing only on a product's features." },
      { question: "Why does the Lean Startup favor quick, low-cost failure?", options: ["To waste money", "To allow iterating quickly toward a better solution", "It is not a goal", "To discourage entrepreneurs"], explanation: "Failing fast and cheaply allows learning quickly and adjusting the concept before a major investment." },
      { question: "Which element is part of a simplified market study?", options: ["The founder's horoscope", "Competitor analysis", "The logo color", "The number of personally followed social networks"], explanation: "Competitor analysis is a central element to understand the possible positioning in a market." },
      { question: "Why is talking directly to potential customers valued?", options: ["It is not recommended", "It provides more reliable information than generic surveys", "It is a waste of time", "It is legally forbidden"], explanation: "Direct interviews provide valuable qualitative information often more useful than generic data." },
    ],
  },
  {
    title: "Business plan and financial model",
    objectives: [
      "Structure a complete and convincing business plan",
      "Build realistic financial projections",
      "Use the Business Model Canvas",
    ],
    content: [
      "A complete business plan includes: executive summary, company description, market analysis, marketing strategy, operational plan, organizational structure and financial projections. It serves both as an internal roadmap and as a document to convince investors or lenders.",
      "Financial projections must include a forecast income statement, a balance sheet and a cash flow statement over at least 3 years. The break-even point indicates the sales volume needed to cover all fixed and variable costs.",
      "The Business Model Canvas offers a synthetic view in 9 blocks: customer segments, value proposition, channels, customer relationships, revenue streams, key resources, key activities, key partnerships and cost structure. It allows quick iteration on the business model.",
    ],
    keyTakeaways: [
      "Financial projections must be conservative, not optimistic",
      "The break-even point is the most important indicator to assess viability",
      "The Business Model Canvas facilitates quick iterations before the full plan",
    ],
    resourceLabels: [
      "Strategyzer — Official Business Model Canvas",
      "BDC — Free business plan templates",
    ],
    quiz: [
      { question: "What does the 'break-even point' mean in a financial plan?", options: ["The company's closing date", "The profitability threshold where revenue covers all costs", "The legal minimum wage", "A public holiday"], explanation: "The break-even point indicates the sales volume needed for the business to be neither in profit nor in loss." },
      { question: "How many blocks make up the Business Model Canvas?", options: ["3", "9", "20", "1"], explanation: "The Business Model Canvas is structured in 9 blocks covering all the key aspects of a business model." },
      { question: "Over how many years minimum should financial projections extend?", options: ["1 month", "3 years", "20 years", "No duration required"], explanation: "Projections over at least 3 years allow assessing the medium-term viability of the project." },
      { question: "Which type of financial projections is recommended?", options: ["Very optimistic to impress", "Conservative and realistic", "Random", "Nonexistent"], explanation: "Conservative projections strengthen credibility with investors and avoid disappointment." },
      { question: "Which forecast financial document shows money inflows and outflows?", options: ["The cash flow statement", "The address book", "The marketing plan", "The organizational chart"], explanation: "The cash flow statement projects the movements of cash coming in and out of the business." },
      { question: "What is the main purpose of a business plan?", options: ["Only to decorate an office", "An internal roadmap and a document to convince investors/lenders", "To replace accounting", "It has no practical use"], explanation: "The business plan guides the entrepreneur internally while serving as a persuasion tool for external financing." },
    ],
  },
  {
    title: "Financing: grants, investors, loans",
    objectives: [
      "Identify the financing sources available in Canada",
      "Understand the differences between debt, equity and grants",
      "Prepare a convincing financing file",
    ],
    content: [
      "Financing options include traditional bank loans, crowdfunding, angel investors and venture capital, as well as federal and provincial government grants specific to certain sectors or populations.",
      "Debt financing (a loan) must be repaid with interest but does not dilute the ownership of the business. Equity financing (investors) does not require immediate repayment but gives up part of the ownership and decision-making control.",
      "A convincing financing file presents a solid business plan, realistic financial projections, a competent team and a clear use of the requested funds. Lenders and investors evaluate the entrepreneur's credibility as much as the quality of the project.",
    ],
    keyTakeaways: [
      "The type of financing chosen must match the company's development stage",
      "Debt preserves control but imposes a fixed repayment",
      "A solid file demonstrates the entrepreneur's credibility as much as the quality of the project",
    ],
    resourceLabels: [
      "Innovation, Science and Economic Development Canada — Financing",
      "Investissement Québec",
    ],
    quiz: [
      { question: "What is the main difference between debt and equity as financing?", options: ["No difference", "Debt must be repaid with interest, equity gives up part of ownership", "Equity is always free", "Debt never needs to be repaid"], explanation: "Debt involves mandatory repayment with interest, while equity gives up a share of ownership without immediate repayment." },
      { question: "What is an 'angel investor'?", options: ["A religious employee", "A private investor who funds startups", "A government official", "A type of bank loan"], explanation: "Angel investors are wealthy individuals who invest their own capital in promising startups." },
      { question: "What advantage does debt financing offer over equity?", options: ["It always dilutes ownership", "It preserves the founder's full control of the business", "It is always free", "It does not exist in Canada"], explanation: "Unlike equity, debt gives up no share of ownership or decision-making power to a third party." },
      { question: "What do lenders and investors evaluate in addition to the quality of the project?", options: ["Nothing else", "The entrepreneur's credibility", "Only the applicant's age", "Nationality only"], explanation: "The entrepreneur's credibility and perceived competence are key factors in any financing decision." },
      { question: "What must a convincing financing file clearly present?", options: ["No precise information", "The clear use of the requested funds", "Only photos of the team", "The personal phone number"], explanation: "Lenders and investors want to know precisely how the funds will be used before committing." },
      { question: "Crowdfunding generally involves:", options: ["A single large investor", "Many small contributors, often through an online platform", "Only banks", "The government exclusively"], explanation: "Crowdfunding mobilizes a large number of small contributions, often through dedicated online platforms." },
    ],
  },
  {
    title: "Business law in Canada",
    objectives: [
      "Understand a business's basic legal obligations",
      "Know the tax and registration requirements",
      "Identify the essential contracts to protect your business",
    ],
    content: [
      "Every business in Canada must register with the provincial business registry, obtain a federal business number (BN) from the Canada Revenue Agency, and comply with tax obligations (GST/QST depending on the revenue threshold).",
      "Obligations vary by legal structure: a corporation must keep corporate records, hold annual meetings and file tax returns separate from those of the shareholders.",
      "Essential contracts include terms of service with clients, confidentiality agreements with employees and partners, and clearly defined partnership contracts. A business lawyer should review these documents before they are put into effect.",
    ],
    keyTakeaways: [
      "Registration and tax compliance are mandatory from startup",
      "The chosen legal structure determines the ongoing administrative obligations",
      "Investing in solid contracts from the start avoids costly disputes later",
    ],
    resourceLabels: [
      "Registraire des entreprises du Québec",
      "Canada Revenue Agency — Businesses",
    ],
    quiz: [
      { question: "What must every business obtain from the Canada Revenue Agency?", options: ["A driver's license", "A federal business number (BN)", "A health insurance card", "Nothing is required"], explanation: "The federal business number (BN) is essential for the tax and administrative obligations of any Canadian business." },
      { question: "What additional obligation does a corporation have compared to a sole proprietorship?", options: ["No difference", "Keeping corporate records and holding annual meetings", "Paying more for electricity", "Having a maximum of one employee"], explanation: "The corporation involves more formal governance obligations, including keeping records and holding meetings." },
      { question: "Why is it important to have confidentiality agreements with employees?", options: ["It is never useful", "To protect the company's sensitive information", "It is only decorative", "To needlessly increase costs"], explanation: "Confidentiality agreements protect the company's strategic and sensitive information against disclosure." },
      { question: "Who should review a company's essential contracts according to the module?", options: ["No one, it is not necessary", "A business lawyer", "A non-specialist friend", "A random client"], explanation: "A business lawyer provides the necessary expertise to ensure the contracts truly protect the business." },
      { question: "When do tax and registration obligations become applicable?", options: ["Never", "From the startup of the business", "Only after 10 years of activity", "Only if the business goes bankrupt"], explanation: "Legal and tax obligations apply from startup, not after a certain period." },
      { question: "Which registry must be consulted to register a business in Quebec?", options: ["The Registraire des entreprises du Québec", "The post office", "A municipal library", "No registry exists"], explanation: "The Registraire des entreprises du Québec manages the official registration of businesses in the province." },
    ],
  },
  {
    title: "Marketing and customer acquisition",
    objectives: [
      "Define a clear and differentiated value proposition",
      "Choose acquisition channels suited to a limited budget",
      "Build the first lasting customer relationships",
    ],
    content: [
      "A clear value proposition answers three questions: what specific problem the business solves, for whom, and why better than existing alternatives. Without this clarity, any marketing effort becomes ineffective.",
      "For a young business with a limited budget, content marketing, structured word of mouth (referral programs) and local networking often remain more profitable than large-scale paid advertising.",
      "The first customers are the most valuable: their direct feedback allows adjusting the product, and their satisfaction generates recommendations that reduce the acquisition cost for subsequent customers. Excellent customer service often compensates for a limited marketing budget.",
    ],
    keyTakeaways: [
      "A vague value proposition makes any marketing ineffective",
      "Low-cost channels (content, network, referral) are often the most profitable at startup",
      "The first customers are a source of learning as much as of revenue",
    ],
    resourceLabels: [
      "Strategyzer — Value Proposition Canvas",
    ],
    quiz: [
      { question: "What are the three key questions of a clear value proposition?", options: ["When, where, how", "What problem, for whom, why better than alternatives", "How much it costs only", "Who is the CEO"], explanation: "These three questions precisely define what makes an offer relevant and differentiated in the market." },
      { question: "Which channel is often more profitable for a young business with a limited budget?", options: ["National TV advertising", "Content marketing and word of mouth", "Giant billboards", "International sports sponsorship"], explanation: "These low-cost channels are often more accessible and effective for a startup business." },
      { question: "Why are the first customers particularly valuable?", options: ["They always pay more", "Their feedback allows adjusting the product and generating recommendations", "They have no particular value", "They are always dissatisfied"], explanation: "The first customers provide valuable feedback and often become ambassadors reducing future acquisition cost." },
      { question: "What can excellent customer service compensate for according to the module?", options: ["Nothing at all", "A limited marketing budget", "The total absence of a product", "The lack of staff"], explanation: "Exceptional customer service generates positive word of mouth, compensating for a restricted marketing budget." },
      { question: "What happens if the value proposition is vague?", options: ["Nothing in particular", "Any marketing effort becomes ineffective", "Sales increase automatically", "It has no consequence"], explanation: "Without clarity on the value offered, it becomes very difficult to communicate effectively and convince potential customers." },
      { question: "What is a referral program in marketing?", options: ["A system that encourages structured word of mouth", "A type of tax", "An accounting software", "A legal obligation"], explanation: "A referral program encourages existing customers to recommend the business, often through rewards." },
    ],
  },
  {
    title: "Innovation and intellectual property",
    objectives: [
      "Understand the types of intellectual property protection",
      "Assess when to protect an innovation",
      "Know the process of filing a trademark or patent in Canada",
    ],
    content: [
      "Intellectual property is divided into several categories: patents protect technical inventions, trademarks protect names and logos, copyright protects creative works, and trade secrets protect undisclosed confidential information.",
      "Not every innovation requires a patent — the cost and complexity of the process must be weighed against the real strategic value of the protection. For many young businesses, protecting the brand is a priority before patenting a product.",
      "The Canadian Intellectual Property Office (CIPO) manages the registration of trademarks and patents. The process can take several months to several years depending on complexity, and a patent or trademark agent is often recommended to navigate the procedure.",
    ],
    keyTakeaways: [
      "The type of protection to favor depends on the nature of the innovation",
      "Not everything needs to be patented — cost-benefit analysis is essential",
      "Trademark registration is often the most accessible priority for a young business",
    ],
    resourceLabels: [
      "Canadian Intellectual Property Office",
    ],
    quiz: [
      { question: "What does a patent protect?", options: ["A trade name", "A technical invention", "A musical work", "A family secret"], explanation: "The patent specifically protects new and non-obvious technical inventions." },
      { question: "What does a trademark protect?", options: ["A secret manufacturing process", "A name or a logo", "A literary work", "An invention patent"], explanation: "The trademark protects distinctive identifying elements such as names and logos." },
      { question: "Which Canadian body manages the registration of trademarks and patents?", options: ["CIPO (Canadian Intellectual Property Office)", "The Bank of Canada", "Canada Post", "The Ministry of Agriculture"], explanation: "CIPO is the federal body responsible for managing trademarks, patents and other forms of intellectual property." },
      { question: "Must every innovation systematically be patented according to the module?", options: ["Yes, always mandatorily", "No, a cost-benefit analysis is necessary", "It is forbidden to patent anything", "Only Canadian inventions"], explanation: "The cost and complexity of the patent must be assessed against its real strategic value for the business." },
      { question: "Which protection is often a priority for a young business?", options: ["The patent only", "Trademark registration", "No protection is necessary", "Copyright exclusively"], explanation: "Protecting the brand (name, logo) is often more accessible and a priority than a complex patent for a young business." },
      { question: "What do trade secrets protect?", options: ["Undisclosed confidential information", "Only logos", "Physical buildings", "The employees themselves"], explanation: "Trade secrets protect strategic information (recipes, processes) as long as they remain confidential." },
    ],
  },
  {
    title: "Final project: pitch before a jury",
    objectives: [
      "Synthesize your entrepreneurial project into a striking presentation",
      "Answer the critical questions of an investor jury",
      "Demonstrate the viability and credibility of your project",
    ],
    content: [
      "The final pitch condenses the entrepreneurial project into 10 minutes maximum: problem, solution, target market, business model, traction (if applicable), team and request for financing or partnership. Every minute must be used to capture and maintain attention.",
      "An investor jury generally asks questions about the real size of the market, defensibility against competition, the planned use of funds and the team's credibility to execute the presented plan.",
      "Preparing for difficult questions is as important as the pitch itself: anticipating objections about risks, competition or financial assumptions demonstrates a deep understanding of the project, not just a memorized speech.",
    ],
    keyTakeaways: [
      "A good pitch captures attention within the first 30 seconds",
      "Preparing for difficult questions matters as much as the presentation itself",
      "The team's credibility often weighs more than the perfection of the plan",
    ],
    resourceLabels: [
      "Y Combinator — How to pitch (free guide)",
    ],
    quiz: [
      { question: "What is the typical maximum duration of a final pitch according to the module?", options: ["1 hour", "10 minutes", "5 seconds", "3 days"], explanation: "An effective pitch must be condensed into 10 minutes maximum to remain striking and respect the jury's time." },
      { question: "What does an investor jury generally ask questions about?", options: ["The logo color only", "The market size, competition, use of funds", "The entrepreneur's vacation", "The local weather"], explanation: "These elements are essential to assess the viability and real potential of the presented project." },
      { question: "What does preparing for difficult questions demonstrate?", options: ["Nothing important", "A deep understanding of the project", "A lack of confidence", "A needless waste of time"], explanation: "Anticipating objections and answering them confidently proves real command of the subject, beyond a memorized speech." },
      { question: "Which element often weighs more than the perfection of the plan according to the module?", options: ["The number of pages in the document", "The team's credibility", "The font used", "The company's creation date"], explanation: "Investors often bet as much on the team capable of executing as on the plan itself." },
      { question: "How long does a good pitch have to capture attention according to the module?", options: ["The first 30 seconds", "Only the last 5 minutes", "No moment is critical", "The whole presentation equally"], explanation: "The first seconds are crucial to immediately capture the audience's interest." },
      { question: "What is the 'traction' mentioned in a pitch?", options: ["The type of tires used", "Concrete evidence of progress or adoption of the product/service", "The company's weight", "A term unrelated to entrepreneurship"], explanation: "Traction refers to concrete indicators (sales, users, partnerships) showing that the project is really moving forward." },
    ],
  },
];

const es: CourseTranslation = [
  {
    title: "Ecosistema emprendedor canadiense",
    objectives: [
      "Identificar los principales actores del ecosistema emprendedor en Canadá",
      "Comprender las estructuras jurídicas de empresa disponibles",
      "Conocer los recursos de acompañamiento para recién llegados",
    ],
    content: [
      "El ecosistema emprendedor canadiense comprende incubadoras (como Futurpreneur, MaRS Discovery District), aceleradoras, organismos de desarrollo económico regional y cámaras de comercio que ofrecen mentoría y creación de redes a los emprendedores.",
      "Las estructuras jurídicas corrientes incluyen la empresa individual (simple pero responsabilidad ilimitada), la sociedad por acciones (incorporación, responsabilidad limitada) y la sociedad en nombre colectivo. La elección depende del nivel de riesgo, de las necesidades de financiación y de la estructura fiscal deseada.",
      "Varios programas se dirigen específicamente a los recién llegados emprendedores: el Programa de emprendedores inmigrantes de Quebec, los servicios de Futurpreneur Canada que ofrecen préstamos y mentoría, y los centros de ayuda a las empresas (CLD, SADC) presentes en cada región.",
    ],
    keyTakeaways: [
      "El acompañamiento existe en cada etapa — nunca hay que emprender solo",
      "La elección de estructura jurídica tiene consecuencias fiscales y legales duraderas",
      "Los recién llegados tienen acceso a recursos de acompañamiento específicos",
    ],
    resourceLabels: [
      "Futurpreneur Canada",
      "Banco de desarrollo de Canadá (BDC)",
    ],
    quiz: [
      { question: "¿Qué organismo se menciona como oferente de préstamos y mentoría a los jóvenes emprendedores?", options: ["Futurpreneur Canada", "Revenu Québec", "La SAAQ", "El ministerio de Salud"], explanation: "Futurpreneur Canada acompaña específicamente a los jóvenes emprendedores con financiación y mentoría." },
      { question: "¿Qué estructura jurídica ofrece una responsabilidad limitada?", options: ["La empresa individual", "La sociedad por acciones (incorporación)", "Ninguna estructura ofrece eso", "El trabajo no declarado"], explanation: "La sociedad por acciones separa los bienes personales de los de la empresa, limitando la responsabilidad del propietario." },
      { question: "¿Cuál es el principal riesgo de la empresa individual?", options: ["Ningún riesgo", "La responsabilidad ilimitada del propietario", "Demasiado papeleo", "Es ilegal en Canadá"], explanation: "En empresa individual, los bienes personales del emprendedor pueden comprometerse en caso de deudas de la empresa." },
      { question: "¿Qué son los CLD/SADC mencionados en el módulo?", options: ["Bancos internacionales", "Centros de ayuda a las empresas regionales", "Escuelas secundarias", "Compañías de seguros"], explanation: "Los CLD y SADC son organismos regionales de ayuda al desarrollo económico y emprendedor." },
      { question: "La elección de estructura jurídica de una empresa depende de:", options: ["El color preferido del emprendedor", "El nivel de riesgo, la financiación y la fiscalidad deseada", "Nada importante", "Únicamente del tamaño de la ciudad"], explanation: "Estos tres factores determinan qué estructura jurídica conviene mejor a un proyecto emprendedor dado." },
      { question: "¿Por qué se desaconseja emprender solo según el módulo?", options: ["Porque está prohibido por la ley", "Porque el acompañamiento existe en cada etapa y aumenta las posibilidades de éxito", "Porque siempre se necesita un socio legal", "No es un consejo dado"], explanation: "Numerosos recursos de acompañamiento existen y su uso aumenta significativamente las posibilidades de éxito." },
    ],
  },
  {
    title: "Ideación y validación de concepto",
    objectives: [
      "Aplicar métodos de generación de ideas de negocio",
      "Realizar un estudio de mercado simplificado",
      "Probar una hipótesis de concepto antes de la inversión",
    ],
    content: [
      "La generación de ideas de negocio parte a menudo de la observación de un problema no resuelto en lugar de la búsqueda de una idea original. El método del 'Jobs to be Done' ayuda a identificar lo que los clientes buscan realmente lograr, más allá del producto en sí.",
      "Un estudio de mercado simplificado incluye el análisis de la competencia, la estimación del tamaño del mercado objetivo y entrevistas directas con clientes potenciales. Esta etapa evita invertir tiempo y dinero en una idea sin demanda real.",
      "El Lean Startup propone validar rápidamente una hipótesis con un producto mínimo viable (MVP) en lugar de desarrollar una solución completa antes de probar el mercado. Fracasar rápido y a bajo costo permite iterar hacia una mejor solución.",
    ],
    keyTakeaways: [
      "Una buena idea resuelve un problema real observado, no un problema supuesto",
      "Hablar directamente con los clientes potenciales vale más que encuestas genéricas",
      "El MVP permite probar el mercado antes de una inversión mayor",
    ],
    resourceLabels: [
      "Lean Startup — Recursos metodológicos",
    ],
    quiz: [
      { question: "¿Qué significa MVP en la metodología Lean Startup?", options: ["Most Valuable Player", "Producto mínimo viable", "Marketing Venta Beneficio", "Modelo de Venta Premium"], explanation: "El MVP (Minimum Viable Product) es una versión simplificada de un producto que permite probar rápidamente una hipótesis en el mercado." },
      { question: "¿De dónde parte generalmente una buena idea de negocio según el módulo?", options: ["De un sueño sin fundamento", "De la observación de un problema real no resuelto", "De una copia exacta de un competidor", "Del azar únicamente"], explanation: "Las mejores ideas resuelven un verdadero problema observado en clientes potenciales." },
      { question: "¿Qué busca el método 'Jobs to be Done'?", options: ["Encontrar un empleo rápidamente", "Identificar lo que los clientes buscan realmente lograr", "Crear ofertas de empleo", "Calcular un salario"], explanation: "Este método ayuda a comprender la necesidad profunda del cliente en lugar de centrarse únicamente en las características de un producto." },
      { question: "¿Por qué el Lean Startup privilegia el fracaso rápido y a bajo costo?", options: ["Para desperdiciar dinero", "Para permitir iterar rápidamente hacia una mejor solución", "No es un objetivo", "Para desalentar a los emprendedores"], explanation: "Fracasar rápido y a menor costo permite aprender rápidamente y ajustar el concepto antes de una inversión mayor." },
      { question: "¿Qué elemento forma parte de un estudio de mercado simplificado?", options: ["El horóscopo del fundador", "El análisis de la competencia", "El color del logotipo", "El número de redes sociales seguidas personalmente"], explanation: "El análisis de la competencia es un elemento central para comprender el posicionamiento posible en un mercado." },
      { question: "¿Por qué se valora hablar directamente con los clientes potenciales?", options: ["No es recomendado", "Da información más fiable que encuestas genéricas", "Es una pérdida de tiempo", "Está prohibido legalmente"], explanation: "Las entrevistas directas proporcionan información cualitativa valiosa a menudo más útil que datos genéricos." },
    ],
  },
  {
    title: "Plan de negocio y modelo financiero",
    objectives: [
      "Estructurar un plan de negocio completo y convincente",
      "Construir proyecciones financieras realistas",
      "Usar el Business Model Canvas",
    ],
    content: [
      "Un plan de negocio completo comprende: resumen ejecutivo, descripción de la empresa, análisis de mercado, estrategia de marketing, plan operativo, estructura organizativa y proyecciones financieras. Sirve a la vez como hoja de ruta interna y como documento para convencer a inversores o prestamistas.",
      "Las proyecciones financieras deben incluir un estado de resultados previsional, un balance y un estado de flujo de caja sobre 3 años mínimo. El punto de equilibrio indica el volumen de ventas necesario para cubrir todos los costos fijos y variables.",
      "El Business Model Canvas ofrece una vista sintética en 9 bloques: segmentos de clientes, propuesta de valor, canales, relación con el cliente, fuentes de ingresos, recursos clave, actividades clave, asociaciones clave y estructura de costos. Permite iterar rápidamente sobre el modelo de negocio.",
    ],
    keyTakeaways: [
      "Las proyecciones financieras deben ser conservadoras, no optimistas",
      "El punto de equilibrio es el indicador más importante para evaluar la viabilidad",
      "El Business Model Canvas facilita las iteraciones rápidas antes del plan completo",
    ],
    resourceLabels: [
      "Strategyzer — Business Model Canvas oficial",
      "BDC — Plantillas de plan de negocio gratuitas",
    ],
    quiz: [
      { question: "¿Qué designa el 'punto de equilibrio' en un plan financiero?", options: ["La fecha de cierre de la empresa", "El umbral de rentabilidad donde los ingresos cubren todos los costos", "El salario mínimo legal", "Un día festivo"], explanation: "El punto de equilibrio indica el volumen de ventas necesario para que la empresa no esté ni en beneficio ni en pérdida." },
      { question: "¿Cuántos bloques componen el Business Model Canvas?", options: ["3", "9", "20", "1"], explanation: "El Business Model Canvas está estructurado en 9 bloques que cubren todos los aspectos clave de un modelo de negocio." },
      { question: "¿Sobre cuántos años mínimo deben extenderse las proyecciones financieras?", options: ["1 mes", "3 años", "20 años", "Ninguna duración requerida"], explanation: "Proyecciones sobre al menos 3 años permiten evaluar la viabilidad a medio plazo del proyecto." },
      { question: "¿Qué tipo de proyecciones financieras se recomienda?", options: ["Muy optimistas para impresionar", "Conservadoras y realistas", "Aleatorias", "Inexistentes"], explanation: "Proyecciones conservadoras refuerzan la credibilidad ante los inversores y evitan las desilusiones." },
      { question: "¿Qué documento financiero previsional muestra las entradas y salidas de dinero?", options: ["El estado de flujo de caja", "La libreta de direcciones", "El plan de marketing", "El organigrama"], explanation: "El estado de flujo de caja proyecta los movimientos de liquidez que entran y salen de la empresa." },
      { question: "¿Para qué sirve principalmente un plan de negocio?", options: ["Únicamente para decorar una oficina", "De hoja de ruta interna y documento para convencer a inversores/prestamistas", "Para reemplazar la contabilidad", "No tiene ninguna utilidad práctica"], explanation: "El plan de negocio guía al emprendedor internamente al tiempo que sirve de herramienta de persuasión para la financiación externa." },
    ],
  },
  {
    title: "Financiación: subvenciones, inversores, préstamos",
    objectives: [
      "Identificar las fuentes de financiación disponibles en Canadá",
      "Comprender las diferencias entre deuda, capital y subvención",
      "Preparar un expediente de financiación convincente",
    ],
    content: [
      "Las opciones de financiación incluyen los préstamos bancarios tradicionales, la financiación participativa (crowdfunding), los inversores providenciales (ángeles) y de capital de riesgo, así como subvenciones gubernamentales federales y provinciales específicas de ciertos sectores o poblaciones.",
      "La financiación por deuda (préstamo) debe reembolsarse con intereses pero no diluye la propiedad de la empresa. La financiación por capital (inversores) no exige reembolso inmediato pero cede una parte de la propiedad y del control de decisión.",
      "Un expediente de financiación convincente presenta un plan de negocio sólido, proyecciones financieras realistas, un equipo competente y un uso claro de los fondos solicitados. Los prestamistas e inversores evalúan tanto la credibilidad del emprendedor como la calidad del proyecto.",
    ],
    keyTakeaways: [
      "El tipo de financiación elegido debe corresponder a la etapa de desarrollo de la empresa",
      "La deuda preserva el control pero impone un reembolso fijo",
      "Un expediente sólido demuestra la credibilidad del emprendedor tanto como la calidad del proyecto",
    ],
    resourceLabels: [
      "Innovación, Ciencia y Desarrollo Económico Canadá — Financiación",
      "Investissement Québec",
    ],
    quiz: [
      { question: "¿Cuál es la principal diferencia entre deuda y capital como financiación?", options: ["Ninguna diferencia", "La deuda debe reembolsarse con intereses, el capital cede una parte de la propiedad", "El capital siempre es gratuito", "La deuda nunca necesita reembolsarse"], explanation: "La deuda implica un reembolso obligatorio con intereses, mientras que el capital cede una parte de propiedad sin reembolso inmediato." },
      { question: "¿Qué es un 'inversor providencial' (ángel)?", options: ["Un empleado religioso", "Un inversor privado que financia empresas emergentes", "Un funcionario gubernamental", "Un tipo de préstamo bancario"], explanation: "Los inversores providenciales (ángeles) son particulares adinerados que invierten su propio capital en startups prometedoras." },
      { question: "¿Qué ventaja ofrece la financiación por deuda respecto al capital?", options: ["Siempre diluye la propiedad", "Preserva el control total de la empresa por el fundador", "Siempre es gratuita", "No existe en Canadá"], explanation: "A diferencia del capital, la deuda no cede ninguna parte de propiedad o de poder de decisión a un tercero." },
      { question: "¿Qué evalúan los prestamistas e inversores además de la calidad del proyecto?", options: ["Nada más", "La credibilidad del emprendedor", "Únicamente la edad del solicitante", "La nacionalidad únicamente"], explanation: "La credibilidad y la competencia percibida del emprendedor son factores clave en toda decisión de financiación." },
      { question: "¿Qué debe presentar claramente un expediente de financiación convincente?", options: ["Ninguna información precisa", "El uso claro de los fondos solicitados", "Únicamente fotos del equipo", "El número de teléfono personal"], explanation: "Los prestamistas e inversores quieren saber precisamente cómo se usarán los fondos antes de comprometerse." },
      { question: "La financiación participativa (crowdfunding) implica generalmente:", options: ["Un solo gran inversor", "Numerosos pequeños contribuyentes, a menudo mediante una plataforma en línea", "Únicamente bancos", "El gobierno exclusivamente"], explanation: "El crowdfunding moviliza un gran número de pequeñas contribuciones, a menudo mediante plataformas en línea dedicadas." },
    ],
  },
  {
    title: "Derecho mercantil en Canadá",
    objectives: [
      "Comprender las obligaciones legales de base de una empresa",
      "Conocer las exigencias fiscales y de registro",
      "Identificar los contratos esenciales para proteger su empresa",
    ],
    content: [
      "Toda empresa en Canadá debe registrarse ante el registro de empresas provincial, obtener un número de empresa federal (NE) ante la Agencia de ingresos de Canadá, y respetar las obligaciones fiscales (GST/QST según el umbral de ingresos).",
      "Las obligaciones varían según la estructura jurídica: una sociedad por acciones debe llevar registros corporativos, organizar asambleas anuales y presentar declaraciones fiscales distintas de las de los accionistas.",
      "Los contratos esenciales incluyen las condiciones de servicio con los clientes, los acuerdos de confidencialidad con los empleados y socios, y los contratos de asociación claramente definidos. Un abogado mercantil debería revisar estos documentos antes de su puesta en aplicación.",
    ],
    keyTakeaways: [
      "El registro y la conformidad fiscal son obligatorios desde el arranque",
      "La estructura jurídica elegida determina las obligaciones administrativas continuas",
      "Invertir en contratos sólidos desde el principio evita litigios costosos más adelante",
    ],
    resourceLabels: [
      "Registraire des entreprises du Québec",
      "Agencia de ingresos de Canadá — Empresas",
    ],
    quiz: [
      { question: "¿Qué debe obtener toda empresa ante la Agencia de ingresos de Canadá?", options: ["Un permiso de conducir", "Un número de empresa federal (NE)", "Una tarjeta de seguro de salud", "Nada es requerido"], explanation: "El número de empresa federal (NE) es esencial para las obligaciones fiscales y administrativas de toda empresa canadiense." },
      { question: "¿Qué obligación adicional tiene una sociedad por acciones respecto a una empresa individual?", options: ["Ninguna diferencia", "Llevar registros corporativos y organizar asambleas anuales", "Pagar más cara la electricidad", "Tener un solo empleado máximo"], explanation: "La sociedad por acciones implica obligaciones de gobernanza más formales, entre ellas llevar registros y organizar asambleas." },
      { question: "¿Por qué es importante tener contratos de confidencialidad con los empleados?", options: ["Nunca es útil", "Para proteger las informaciones sensibles de la empresa", "Es únicamente decorativo", "Para aumentar los costos inútilmente"], explanation: "Los acuerdos de confidencialidad protegen las informaciones estratégicas y sensibles de la empresa contra la divulgación." },
      { question: "¿Quién debería revisar los contratos esenciales de una empresa según el módulo?", options: ["Nadie, no es necesario", "Un abogado mercantil", "Un amigo no especializado", "Un cliente al azar"], explanation: "Un abogado mercantil aporta la experiencia necesaria para asegurar que los contratos protejan realmente la empresa." },
      { question: "¿Cuándo se vuelven aplicables las obligaciones fiscales de registro?", options: ["Nunca", "Desde el arranque de la empresa", "Solo después de 10 años de actividad", "Únicamente si la empresa quiebra"], explanation: "Las obligaciones legales y fiscales se aplican desde el arranque, no después de un cierto plazo." },
      { question: "¿Qué registro debe consultarse para registrar una empresa en Quebec?", options: ["El Registraire des entreprises du Québec", "La oficina de correos", "Una biblioteca municipal", "No existe ningún registro"], explanation: "El Registraire des entreprises du Québec gestiona el registro oficial de las empresas en la provincia." },
    ],
  },
  {
    title: "Marketing y adquisición de clientes",
    objectives: [
      "Definir una propuesta de valor clara y diferenciada",
      "Elegir canales de adquisición adaptados a un presupuesto limitado",
      "Construir las primeras relaciones con clientes duraderas",
    ],
    content: [
      "Una propuesta de valor clara responde a tres preguntas: qué problema específico resuelve la empresa, para quién, y por qué mejor que las alternativas existentes. Sin esta claridad, todo esfuerzo de marketing se vuelve ineficaz.",
      "Para una empresa joven con presupuesto limitado, el marketing de contenido, el boca a boca estructurado (programas de referidos) y la creación de redes local siguen siendo a menudo más rentables que la publicidad pagada a gran escala.",
      "Los primeros clientes son los más valiosos: su retorno directo permite ajustar el producto, y su satisfacción genera recomendaciones que reducen el costo de adquisición para los clientes siguientes. Un excelente servicio al cliente compensa a menudo un presupuesto de marketing limitado.",
    ],
    keyTakeaways: [
      "Una propuesta de valor confusa vuelve todo marketing ineficaz",
      "Los canales de bajo costo (contenido, red, recomendación) son a menudo los más rentables al arranque",
      "Los primeros clientes son una fuente de aprendizaje tanto como de ingresos",
    ],
    resourceLabels: [
      "Strategyzer — Value Proposition Canvas",
    ],
    quiz: [
      { question: "¿Cuáles son las tres preguntas clave de una propuesta de valor clara?", options: ["Cuándo, dónde, cómo", "Qué problema, para quién, por qué mejor que las alternativas", "Cuánto cuesta únicamente", "Quién es el director general"], explanation: "Estas tres preguntas definen precisamente lo que hace que una oferta sea pertinente y diferenciada en el mercado." },
      { question: "¿Qué canal es a menudo más rentable para una empresa joven con presupuesto limitado?", options: ["La publicidad televisiva nacional", "El marketing de contenido y el boca a boca", "Las vallas publicitarias gigantes", "El patrocinio deportivo internacional"], explanation: "Estos canales de bajo costo son a menudo más accesibles y eficaces para una empresa en arranque." },
      { question: "¿Por qué los primeros clientes son particularmente valiosos?", options: ["Siempre pagan más caro", "Su retorno permite ajustar el producto y generar recomendaciones", "No tienen ningún valor particular", "Siempre están descontentos"], explanation: "Los primeros clientes proporcionan un feedback valioso y se convierten a menudo en embajadores que reducen el costo de adquisición futuro." },
      { question: "¿Qué puede compensar un excelente servicio al cliente según el módulo?", options: ["Nada en absoluto", "Un presupuesto de marketing limitado", "La ausencia total de producto", "La falta de personal"], explanation: "Un servicio al cliente excepcional genera boca a boca positivo, compensando un presupuesto de marketing restringido." },
      { question: "¿Qué pasa si la propuesta de valor es confusa?", options: ["Nada en particular", "Todo esfuerzo de marketing se vuelve ineficaz", "Las ventas aumentan automáticamente", "No tiene consecuencias"], explanation: "Sin claridad sobre el valor ofrecido, se vuelve muy difícil comunicar eficazmente y convencer a clientes potenciales." },
      { question: "¿Qué es un programa de referidos en marketing?", options: ["Un sistema que fomenta el boca a boca estructurado", "Un tipo de impuesto", "Un software de contabilidad", "Una obligación legal"], explanation: "Un programa de referidos incita a los clientes existentes a recomendar la empresa, a menudo mediante recompensas." },
    ],
  },
  {
    title: "Innovación y propiedad intelectual",
    objectives: [
      "Comprender los tipos de protección de la propiedad intelectual",
      "Evaluar cuándo proteger una innovación",
      "Conocer el proceso de registro de marca o patente en Canadá",
    ],
    content: [
      "La propiedad intelectual se divide en varias categorías: las patentes protegen las invenciones técnicas, las marcas de comercio protegen los nombres y logotipos, el derecho de autor protege las obras creativas, y los secretos comerciales protegen las informaciones confidenciales no divulgadas.",
      "No toda innovación necesita una patente — el costo y la complejidad del proceso deben sopesarse con el valor estratégico real de la protección. Para muchas empresas jóvenes, proteger la marca es prioritario antes de patentar un producto.",
      "La Oficina de la propiedad intelectual de Canadá (OPIC) gestiona el registro de marcas y patentes. El proceso puede tomar de varios meses a varios años según la complejidad, y un agente de patentes o marcas es a menudo recomendado para navegar el procedimiento.",
    ],
    keyTakeaways: [
      "El tipo de protección a privilegiar depende de la naturaleza de la innovación",
      "No todo necesita patentarse — el análisis costo-beneficio es esencial",
      "El registro de marca es a menudo la prioridad más accesible para una empresa joven",
    ],
    resourceLabels: [
      "Oficina de la propiedad intelectual de Canadá",
    ],
    quiz: [
      { question: "¿Qué protege una patente?", options: ["Un nombre comercial", "Una invención técnica", "Una obra musical", "Un secreto de familia"], explanation: "La patente protege específicamente las invenciones técnicas nuevas y no evidentes." },
      { question: "¿Qué protege una marca de comercio?", options: ["Un proceso de fabricación secreto", "Un nombre o un logotipo", "Una obra literaria", "Una patente de invención"], explanation: "La marca de comercio protege los elementos de identificación distintivos como los nombres y logotipos." },
      { question: "¿Qué organismo canadiense gestiona el registro de marcas y patentes?", options: ["La OPIC (Oficina de la propiedad intelectual de Canadá)", "El Banco de Canadá", "Correos de Canadá", "El ministerio de Agricultura"], explanation: "La OPIC es el organismo federal responsable de la gestión de marcas, patentes y otras formas de propiedad intelectual." },
      { question: "¿Toda innovación debe patentarse sistemáticamente según el módulo?", options: ["Sí, siempre obligatoriamente", "No, un análisis costo-beneficio es necesario", "Está prohibido patentar cualquier cosa", "Solo las invenciones canadienses"], explanation: "El costo y la complejidad de la patente deben evaluarse frente a su valor estratégico real para la empresa." },
      { question: "¿Qué protección es a menudo prioritaria para una empresa joven?", options: ["La patente únicamente", "El registro de la marca", "Ninguna protección es necesaria", "El derecho de autor exclusivamente"], explanation: "Proteger la marca (nombre, logotipo) es a menudo más accesible y prioritario que una patente compleja para una empresa joven." },
      { question: "¿Qué protegen los secretos comerciales?", options: ["Las informaciones confidenciales no divulgadas", "Únicamente los logotipos", "Los edificios físicos", "Los empleados mismos"], explanation: "Los secretos comerciales protegen informaciones estratégicas (recetas, procesos) mientras permanezcan confidenciales." },
    ],
  },
  {
    title: "Proyecto final: pitch ante un jurado",
    objectives: [
      "Sintetizar su proyecto emprendedor en una presentación contundente",
      "Responder a las preguntas críticas de un jurado de inversores",
      "Demostrar la viabilidad y la credibilidad de su proyecto",
    ],
    content: [
      "El pitch final condensa el proyecto emprendedor en 10 minutos máximo: problema, solución, mercado objetivo, modelo de negocio, tracción (si aplica), equipo y solicitud de financiación o de asociación. Cada minuto debe usarse para captar y mantener la atención.",
      "Un jurado de inversores plantea generalmente preguntas sobre el tamaño real del mercado, la defendibilidad frente a la competencia, el uso previsto de los fondos y la credibilidad del equipo para ejecutar el plan presentado.",
      "La preparación para las preguntas difíciles es tan importante como el pitch en sí: anticipar las objeciones sobre los riesgos, la competencia o las hipótesis financieras demuestra una comprensión profunda del proyecto, no solo un discurso memorizado.",
    ],
    keyTakeaways: [
      "Un buen pitch capta la atención desde los primeros 30 segundos",
      "La preparación para las preguntas difíciles cuenta tanto como la presentación misma",
      "La credibilidad del equipo pesa a menudo más que la perfección del plan",
    ],
    resourceLabels: [
      "Y Combinator — Cómo hacer un pitch (guía gratuita)",
    ],
    quiz: [
      { question: "¿Cuál es la duración máxima típica de un pitch final según el módulo?", options: ["1 hora", "10 minutos", "5 segundos", "3 días"], explanation: "Un pitch eficaz debe condensarse en 10 minutos máximo para seguir siendo contundente y respetar el tiempo del jurado." },
      { question: "¿Sobre qué plantea generalmente preguntas un jurado de inversores?", options: ["El color del logotipo únicamente", "El tamaño del mercado, la competencia, el uso de los fondos", "Las vacaciones del emprendedor", "El clima local"], explanation: "Estos elementos son esenciales para evaluar la viabilidad y el potencial real del proyecto presentado." },
      { question: "¿Qué demuestra la preparación para las preguntas difíciles?", options: ["Nada importante", "Una comprensión profunda del proyecto", "Una falta de confianza", "Una pérdida de tiempo inútil"], explanation: "Anticipar las objeciones y responderlas con seguridad prueba un dominio real del tema, más allá de un discurso memorizado." },
      { question: "¿Qué elemento pesa a menudo más que la perfección del plan según el módulo?", options: ["El número de páginas del documento", "La credibilidad del equipo", "La fuente tipográfica usada", "La fecha de creación de la empresa"], explanation: "Los inversores apuestan a menudo tanto por el equipo capaz de ejecutar como por el plan en sí." },
      { question: "¿Cuánto tiempo tiene un buen pitch para captar la atención según el módulo?", options: ["Los primeros 30 segundos", "Únicamente los últimos 5 minutos", "Ningún momento es crítico", "Toda la presentación por igual"], explanation: "Los primeros segundos son cruciales para captar inmediatamente el interés del auditorio." },
      { question: "¿Qué es la 'tracción' mencionada en un pitch?", options: ["El tipo de neumáticos usados", "Pruebas concretas de progreso o adopción del producto/servicio", "El peso de la empresa", "Un término sin relación con el emprendimiento"], explanation: "La tracción designa indicadores concretos (ventas, usuarios, asociaciones) que demuestran que el proyecto avanza realmente." },
    ],
  },
];

const it: CourseTranslation = [
  {
    title: "Ecosistema imprenditoriale canadese",
    objectives: [
      "Identificare i principali attori dell'ecosistema imprenditoriale in Canada",
      "Comprendere le strutture giuridiche d'impresa disponibili",
      "Conoscere le risorse di accompagnamento per i nuovi arrivati",
    ],
    content: [
      "L'ecosistema imprenditoriale canadese comprende incubatori (come Futurpreneur, MaRS Discovery District), acceleratori, organismi di sviluppo economico regionale e camere di commercio che offrono mentorship e networking agli imprenditori.",
      "Le strutture giuridiche correnti includono l'impresa individuale (semplice ma responsabilità illimitata), la società per azioni (incorporazione, responsabilità limitata) e la società in nome collettivo. La scelta dipende dal livello di rischio, dai bisogni di finanziamento e dalla struttura fiscale desiderata.",
      "Diversi programmi mirano specificamente ai nuovi arrivati imprenditori: il Programma imprenditori immigrati del Quebec, i servizi di Futurpreneur Canada che offrono prestiti e mentorship, e i centri di aiuto alle imprese (CLD, SADC) presenti in ogni regione.",
    ],
    keyTakeaways: [
      "L'accompagnamento esiste a ogni tappa — non bisogna mai intraprendere da soli",
      "La scelta della struttura giuridica ha conseguenze fiscali e legali durature",
      "I nuovi arrivati hanno accesso a risorse di accompagnamento specifiche",
    ],
    resourceLabels: [
      "Futurpreneur Canada",
      "Banca di sviluppo del Canada (BDC)",
    ],
    quiz: [
      { question: "Quale organismo è menzionato come offerente di prestiti e mentorship ai giovani imprenditori?", options: ["Futurpreneur Canada", "Revenu Québec", "La SAAQ", "Il ministero della Salute"], explanation: "Futurpreneur Canada accompagna specificamente i giovani imprenditori con finanziamento e mentorship." },
      { question: "Quale struttura giuridica offre una responsabilità limitata?", options: ["L'impresa individuale", "La società per azioni (incorporazione)", "Nessuna struttura offre questo", "Il lavoro in nero"], explanation: "La società per azioni separa i beni personali da quelli dell'impresa, limitando la responsabilità del proprietario." },
      { question: "Qual è il principale rischio dell'impresa individuale?", options: ["Nessun rischio", "La responsabilità illimitata del proprietario", "Troppa burocrazia", "È illegale in Canada"], explanation: "Nell'impresa individuale, i beni personali dell'imprenditore possono essere impegnati in caso di debiti dell'impresa." },
      { question: "Cosa sono i CLD/SADC menzionati nel modulo?", options: ["Banche internazionali", "Centri di aiuto alle imprese regionali", "Scuole secondarie", "Compagnie di assicurazioni"], explanation: "I CLD e SADC sono organismi regionali di aiuto allo sviluppo economico e imprenditoriale." },
      { question: "La scelta della struttura giuridica di un'impresa dipende da:", options: ["Il colore preferito dell'imprenditore", "Il livello di rischio, il finanziamento e la fiscalità desiderata", "Niente di importante", "Solo dalla dimensione della città"], explanation: "Questi tre fattori determinano quale struttura giuridica conviene meglio a un progetto imprenditoriale dato." },
      { question: "Perché è sconsigliato intraprendere da soli secondo il modulo?", options: ["Perché è vietato dalla legge", "Perché l'accompagnamento esiste a ogni tappa e aumenta le possibilità di successo", "Perché serve sempre un socio legale", "Non è un consiglio dato"], explanation: "Numerose risorse di accompagnamento esistono e il loro uso aumenta significativamente le possibilità di successo." },
    ],
  },
  {
    title: "Ideazione e validazione del concetto",
    objectives: [
      "Applicare metodi di generazione di idee d'affari",
      "Realizzare uno studio di mercato semplificato",
      "Testare un'ipotesi di concetto prima dell'investimento",
    ],
    content: [
      "La generazione di idee d'affari parte spesso dall'osservazione di un problema non risolto piuttosto che dalla ricerca di un'idea originale. Il metodo del 'Jobs to be Done' aiuta a identificare ciò che i clienti cercano realmente di realizzare, al di là del prodotto stesso.",
      "Uno studio di mercato semplificato include l'analisi della concorrenza, la stima della dimensione del mercato target e interviste dirette con clienti potenziali. Questa tappa evita di investire tempo e denaro in un'idea senza domanda reale.",
      "Il Lean Startup propone di validare rapidamente un'ipotesi con un prodotto minimo funzionante (MVP) piuttosto che sviluppare una soluzione completa prima di testare il mercato. Fallire rapidamente e a basso costo permette di iterare verso una soluzione migliore.",
    ],
    keyTakeaways: [
      "Una buona idea risolve un problema reale osservato, non un problema supposto",
      "Parlare direttamente ai clienti potenziali vale più di sondaggi generici",
      "L'MVP permette di testare il mercato prima di un investimento maggiore",
    ],
    resourceLabels: [
      "Lean Startup — Risorse metodologiche",
    ],
    quiz: [
      { question: "Cosa significa MVP nella metodologia Lean Startup?", options: ["Most Valuable Player", "Prodotto minimo funzionante", "Marketing Vendita Profitto", "Modello di Vendita Premium"], explanation: "L'MVP (Minimum Viable Product) è una versione semplificata di un prodotto che permette di testare rapidamente un'ipotesi sul mercato." },
      { question: "Da dove parte generalmente una buona idea d'affari secondo il modulo?", options: ["Da un sogno senza fondamento", "Dall'osservazione di un problema reale non risolto", "Da una copia esatta di un concorrente", "Dal caso solamente"], explanation: "Le migliori idee risolvono un vero problema osservato in potenziali clienti." },
      { question: "Cosa mira il metodo 'Jobs to be Done'?", options: ["Trovare un lavoro rapidamente", "Identificare ciò che i clienti cercano realmente di realizzare", "Creare offerte di lavoro", "Calcolare uno stipendio"], explanation: "Questo metodo aiuta a comprendere il bisogno profondo del cliente piuttosto che concentrarsi solo sulle caratteristiche di un prodotto." },
      { question: "Perché il Lean Startup privilegia il fallimento rapido e a basso costo?", options: ["Per sprecare denaro", "Per permettere di iterare rapidamente verso una soluzione migliore", "Non è un obiettivo", "Per scoraggiare gli imprenditori"], explanation: "Fallire velocemente e a minor costo permette di apprendere rapidamente e di aggiustare il concetto prima di un investimento maggiore." },
      { question: "Quale elemento fa parte di uno studio di mercato semplificato?", options: ["L'oroscopo del fondatore", "L'analisi della concorrenza", "Il colore del logo", "Il numero di social network seguiti personalmente"], explanation: "L'analisi della concorrenza è un elemento centrale per comprendere il posizionamento possibile su un mercato." },
      { question: "Perché parlare direttamente ai clienti potenziali è valorizzato?", options: ["Non è raccomandato", "Dà informazioni più affidabili di sondaggi generici", "È una perdita di tempo", "È vietato legalmente"], explanation: "Le interviste dirette forniscono informazioni qualitative preziose spesso più utili di dati generici." },
    ],
  },
  {
    title: "Business plan e modello finanziario",
    objectives: [
      "Strutturare un business plan completo e convincente",
      "Costruire proiezioni finanziarie realistiche",
      "Usare il Business Model Canvas",
    ],
    content: [
      "Un business plan completo comprende: riassunto esecutivo, descrizione dell'impresa, analisi di mercato, strategia di marketing, piano operativo, struttura organizzativa e proiezioni finanziarie. Serve sia da tabella di marcia interna sia da documento per convincere investitori o prestatori.",
      "Le proiezioni finanziarie devono includere un conto economico previsionale, uno stato patrimoniale e un rendiconto dei flussi di cassa su almeno 3 anni. Il punto di pareggio indica il volume di vendite necessario per coprire tutti i costi fissi e variabili.",
      "Il Business Model Canvas offre una vista sintetica in 9 blocchi: segmenti di clienti, proposta di valore, canali, relazione con il cliente, fonti di ricavi, risorse chiave, attività chiave, partnership chiave e struttura dei costi. Permette di iterare rapidamente sul modello d'affari.",
    ],
    keyTakeaways: [
      "Le proiezioni finanziarie devono essere conservative, non ottimistiche",
      "Il punto di pareggio è l'indicatore più importante per valutare la fattibilità",
      "Il Business Model Canvas facilita le iterazioni rapide prima del piano completo",
    ],
    resourceLabels: [
      "Strategyzer — Business Model Canvas ufficiale",
      "BDC — Modelli di business plan gratuiti",
    ],
    quiz: [
      { question: "Cosa indica il 'punto di pareggio' in un piano finanziario?", options: ["La data di chiusura dell'impresa", "La soglia di redditività dove i ricavi coprono tutti i costi", "Il salario minimo legale", "Un giorno festivo"], explanation: "Il punto di pareggio indica il volume di vendite necessario perché l'impresa non sia né in profitto né in perdita." },
      { question: "Da quanti blocchi è composto il Business Model Canvas?", options: ["3", "9", "20", "1"], explanation: "Il Business Model Canvas è strutturato in 9 blocchi che coprono tutti gli aspetti chiave di un modello d'affari." },
      { question: "Su quanti anni minimo devono estendersi le proiezioni finanziarie?", options: ["1 mese", "3 anni", "20 anni", "Nessuna durata richiesta"], explanation: "Proiezioni su almeno 3 anni permettono di valutare la fattibilità a medio termine del progetto." },
      { question: "Quale tipo di proiezioni finanziarie è raccomandato?", options: ["Molto ottimistiche per impressionare", "Conservative e realistiche", "Casuali", "Inesistenti"], explanation: "Proiezioni conservative rafforzano la credibilità presso gli investitori ed evitano le delusioni." },
      { question: "Quale documento finanziario previsionale mostra le entrate e uscite di denaro?", options: ["Il rendiconto dei flussi di cassa", "La rubrica", "Il piano di marketing", "L'organigramma"], explanation: "Il rendiconto dei flussi di cassa proietta i movimenti di liquidità in entrata e in uscita dall'impresa." },
      { question: "A cosa serve principalmente un business plan?", options: ["Solo a decorare un ufficio", "Da tabella di marcia interna e documento per convincere investitori/prestatori", "A sostituire la contabilità", "Non ha alcuna utilità pratica"], explanation: "Il business plan guida l'imprenditore internamente pur servendo da strumento di persuasione per il finanziamento esterno." },
    ],
  },
  {
    title: "Finanziamento: sovvenzioni, investitori, prestiti",
    objectives: [
      "Identificare le fonti di finanziamento disponibili in Canada",
      "Comprendere le differenze tra debito, capitale e sovvenzione",
      "Preparare un dossier di finanziamento convincente",
    ],
    content: [
      "Le opzioni di finanziamento includono i prestiti bancari tradizionali, il finanziamento partecipativo (crowdfunding), gli investitori providenziali (angeli) e di capitale di rischio, così come sovvenzioni governative federali e provinciali specifiche a certi settori o popolazioni.",
      "Il finanziamento tramite debito (prestito) deve essere rimborsato con interessi ma non diluisce la proprietà dell'impresa. Il finanziamento tramite capitale (investitori) non esige rimborso immediato ma cede una parte della proprietà e del controllo decisionale.",
      "Un dossier di finanziamento convincente presenta un business plan solido, proiezioni finanziarie realistiche, un team competente e un utilizzo chiaro dei fondi richiesti. I prestatori e gli investitori valutano tanto la credibilità dell'imprenditore quanto la qualità del progetto.",
    ],
    keyTakeaways: [
      "Il tipo di finanziamento scelto deve corrispondere allo stadio di sviluppo dell'impresa",
      "Il debito preserva il controllo ma impone un rimborso fisso",
      "Un dossier solido dimostra la credibilità dell'imprenditore tanto quanto la qualità del progetto",
    ],
    resourceLabels: [
      "Innovazione, Scienza e Sviluppo economico Canada — Finanziamento",
      "Investissement Québec",
    ],
    quiz: [
      { question: "Qual è la principale differenza tra debito e capitale come finanziamento?", options: ["Nessuna differenza", "Il debito deve essere rimborsato con interessi, il capitale cede una parte della proprietà", "Il capitale è sempre gratuito", "Il debito non ha mai bisogno di essere rimborsato"], explanation: "Il debito implica un rimborso obbligatorio con interessi, mentre il capitale cede una parte di proprietà senza rimborso immediato." },
      { question: "Cos'è un 'investitore providenziale' (angelo)?", options: ["Un dipendente religioso", "Un investitore privato che finanzia imprese in avvio", "Un funzionario governativo", "Un tipo di prestito bancario"], explanation: "Gli investitori providenziali (angeli) sono privati facoltosi che investono il proprio capitale in startup promettenti." },
      { question: "Quale vantaggio offre il finanziamento tramite debito rispetto al capitale?", options: ["Diluisce sempre la proprietà", "Preserva il controllo totale dell'impresa da parte del fondatore", "È sempre gratuito", "Non esiste in Canada"], explanation: "A differenza del capitale, il debito non cede alcuna parte di proprietà o di potere decisionale a un terzo." },
      { question: "Cosa valutano i prestatori e gli investitori oltre alla qualità del progetto?", options: ["Niente altro", "La credibilità dell'imprenditore", "Solo l'età del richiedente", "La nazionalità solamente"], explanation: "La credibilità e la competenza percepita dell'imprenditore sono fattori chiave in ogni decisione di finanziamento." },
      { question: "Cosa deve presentare chiaramente un dossier di finanziamento convincente?", options: ["Nessuna informazione precisa", "L'utilizzo chiaro dei fondi richiesti", "Solo foto del team", "Il numero di telefono personale"], explanation: "I prestatori e gli investitori vogliono sapere precisamente come saranno utilizzati i fondi prima di impegnarsi." },
      { question: "Il finanziamento partecipativo (crowdfunding) implica generalmente:", options: ["Un solo grande investitore", "Numerosi piccoli contributori, spesso tramite una piattaforma online", "Solo banche", "Il governo esclusivamente"], explanation: "Il crowdfunding mobilita un gran numero di piccoli contributi, spesso tramite piattaforme online dedicate." },
    ],
  },
  {
    title: "Diritto commerciale in Canada",
    objectives: [
      "Comprendere gli obblighi legali di base di un'impresa",
      "Conoscere i requisiti fiscali e di registrazione",
      "Identificare i contratti essenziali per proteggere la propria impresa",
    ],
    content: [
      "Ogni impresa in Canada deve registrarsi presso il registro delle imprese provinciale, ottenere un numero d'impresa federale (NE) presso l'Agenzia delle entrate del Canada, e rispettare gli obblighi fiscali (GST/QST secondo la soglia di ricavi).",
      "Gli obblighi variano secondo la struttura giuridica: una società per azioni deve tenere registri societari, organizzare assemblee annuali e produrre dichiarazioni fiscali distinte da quelle degli azionisti.",
      "I contratti essenziali includono le condizioni di servizio con i clienti, gli accordi di riservatezza con i dipendenti e i partner, e i contratti di partnership chiaramente definiti. Un avvocato d'affari dovrebbe rivedere questi documenti prima della loro messa in applicazione.",
    ],
    keyTakeaways: [
      "La registrazione e la conformità fiscale sono obbligatorie fin dall'avvio",
      "La struttura giuridica scelta determina gli obblighi amministrativi continui",
      "Investire in contratti solidi fin dall'inizio evita contenziosi costosi in seguito",
    ],
    resourceLabels: [
      "Registraire des entreprises du Québec",
      "Agenzia delle entrate del Canada — Imprese",
    ],
    quiz: [
      { question: "Cosa deve ottenere ogni impresa presso l'Agenzia delle entrate del Canada?", options: ["Una patente di guida", "Un numero d'impresa federale (NE)", "Una tessera di assicurazione malattia", "Niente è richiesto"], explanation: "Il numero d'impresa federale (NE) è essenziale per gli obblighi fiscali e amministrativi di ogni impresa canadese." },
      { question: "Quale obbligo aggiuntivo ha una società per azioni rispetto a un'impresa individuale?", options: ["Nessuna differenza", "Tenere registri societari e organizzare assemblee annuali", "Pagare più cara l'elettricità", "Avere un solo dipendente massimo"], explanation: "La società per azioni implica obblighi di governance più formali, tra cui la tenuta di registri e assemblee." },
      { question: "Perché è importante avere contratti di riservatezza con i dipendenti?", options: ["Non è mai utile", "Per proteggere le informazioni sensibili dell'impresa", "È solo decorativo", "Per aumentare i costi inutilmente"], explanation: "Gli accordi di riservatezza proteggono le informazioni strategiche e sensibili dell'impresa contro la divulgazione." },
      { question: "Chi dovrebbe rivedere i contratti essenziali di un'impresa secondo il modulo?", options: ["Nessuno, non è necessario", "Un avvocato d'affari", "Un amico non specializzato", "Un cliente a caso"], explanation: "Un avvocato d'affari apporta la competenza necessaria per assicurare che i contratti proteggano realmente l'impresa." },
      { question: "Quando diventano applicabili gli obblighi fiscali di registrazione?", options: ["Mai", "Fin dall'avvio dell'impresa", "Solo dopo 10 anni di attività", "Solo se l'impresa fallisce"], explanation: "Gli obblighi legali e fiscali si applicano fin dall'avvio, non dopo un certo termine." },
      { question: "Quale registro deve essere consultato per registrare un'impresa in Quebec?", options: ["Il Registraire des entreprises du Québec", "L'ufficio postale", "Una biblioteca municipale", "Nessun registro esiste"], explanation: "Il Registraire des entreprises du Québec gestisce la registrazione ufficiale delle imprese nella provincia." },
    ],
  },
  {
    title: "Marketing e acquisizione di clienti",
    objectives: [
      "Definire una proposta di valore chiara e differenziata",
      "Scegliere canali di acquisizione adatti a un budget limitato",
      "Costruire le prime relazioni con i clienti durature",
    ],
    content: [
      "Una proposta di valore chiara risponde a tre domande: quale problema specifico risolve l'impresa, per chi, e perché meglio delle alternative esistenti. Senza questa chiarezza, ogni sforzo di marketing diventa inefficace.",
      "Per una giovane impresa con budget limitato, il marketing di contenuti, il passaparola strutturato (programmi di referral) e il networking locale restano spesso più redditizi della pubblicità a pagamento su larga scala.",
      "I primi clienti sono i più preziosi: il loro riscontro diretto permette di aggiustare il prodotto, e la loro soddisfazione genera raccomandazioni che riducono il costo di acquisizione per i clienti successivi. Un eccellente servizio clienti compensa spesso un budget di marketing limitato.",
    ],
    keyTakeaways: [
      "Una proposta di valore vaga rende ogni marketing inefficace",
      "I canali a basso costo (contenuto, rete, raccomandazione) sono spesso i più redditizi all'avvio",
      "I primi clienti sono una fonte di apprendimento tanto quanto di ricavi",
    ],
    resourceLabels: [
      "Strategyzer — Value Proposition Canvas",
    ],
    quiz: [
      { question: "Quali sono le tre domande chiave di una proposta di valore chiara?", options: ["Quando, dove, come", "Quale problema, per chi, perché meglio delle alternative", "Quanto costa solamente", "Chi è l'amministratore delegato"], explanation: "Queste tre domande definiscono precisamente ciò che rende un'offerta pertinente e differenziata sul mercato." },
      { question: "Quale canale è spesso più redditizio per una giovane impresa con budget limitato?", options: ["La pubblicità televisiva nazionale", "Il marketing di contenuti e il passaparola", "I cartelloni pubblicitari giganti", "La sponsorizzazione sportiva internazionale"], explanation: "Questi canali a basso costo sono spesso più accessibili ed efficaci per un'impresa in avvio." },
      { question: "Perché i primi clienti sono particolarmente preziosi?", options: ["Pagano sempre di più", "Il loro riscontro permette di aggiustare il prodotto e generare raccomandazioni", "Non hanno alcun valore particolare", "Sono sempre insoddisfatti"], explanation: "I primi clienti forniscono un feedback prezioso e diventano spesso ambasciatori che riducono il costo di acquisizione futuro." },
      { question: "Cosa può compensare un eccellente servizio clienti secondo il modulo?", options: ["Niente del tutto", "Un budget di marketing limitato", "L'assenza totale di prodotto", "La mancanza di personale"], explanation: "Un servizio clienti eccezionale genera passaparola positivo, compensando un budget di marketing ristretto." },
      { question: "Cosa succede se la proposta di valore è vaga?", options: ["Niente di particolare", "Ogni sforzo di marketing diventa inefficace", "Le vendite aumentano automaticamente", "Non ha conseguenze"], explanation: "Senza chiarezza sul valore offerto, diventa molto difficile comunicare efficacemente e convincere clienti potenziali." },
      { question: "Cos'è un programma di referral nel marketing?", options: ["Un sistema che incoraggia il passaparola strutturato", "Un tipo di imposta", "Un software di contabilità", "Un obbligo legale"], explanation: "Un programma di referral incita i clienti esistenti a raccomandare l'impresa, spesso tramite ricompense." },
    ],
  },
  {
    title: "Innovazione e proprietà intellettuale",
    objectives: [
      "Comprendere i tipi di protezione della proprietà intellettuale",
      "Valutare quando proteggere un'innovazione",
      "Conoscere il processo di deposito di marchio o brevetto in Canada",
    ],
    content: [
      "La proprietà intellettuale si divide in diverse categorie: i brevetti proteggono le invenzioni tecniche, i marchi commerciali proteggono i nomi e i loghi, il diritto d'autore protegge le opere creative, e i segreti commerciali proteggono le informazioni riservate non divulgate.",
      "Non ogni innovazione necessita di un brevetto — il costo e la complessità del processo devono essere bilanciati con il valore strategico reale della protezione. Per molte giovani imprese, proteggere il marchio è prioritario prima di brevettare un prodotto.",
      "L'Ufficio della proprietà intellettuale del Canada (OPIC) gestisce la registrazione dei marchi e brevetti. Il processo può richiedere da diversi mesi a diversi anni secondo la complessità, e un agente in brevetti o marchi è spesso raccomandato per navigare la procedura.",
    ],
    keyTakeaways: [
      "Il tipo di protezione da privilegiare dipende dalla natura dell'innovazione",
      "Non tutto ha bisogno di essere brevettato — l'analisi costi-benefici è essenziale",
      "La registrazione del marchio è spesso la priorità più accessibile per una giovane impresa",
    ],
    resourceLabels: [
      "Ufficio della proprietà intellettuale del Canada",
    ],
    quiz: [
      { question: "Cosa protegge un brevetto?", options: ["Un nome commerciale", "Un'invenzione tecnica", "Un'opera musicale", "Un segreto di famiglia"], explanation: "Il brevetto protegge specificamente le invenzioni tecniche nuove e non ovvie." },
      { question: "Cosa protegge un marchio commerciale?", options: ["Un processo di fabbricazione segreto", "Un nome o un logo", "Un'opera letteraria", "Un brevetto d'invenzione"], explanation: "Il marchio commerciale protegge gli elementi di identificazione distintivi come i nomi e i loghi." },
      { question: "Quale organismo canadese gestisce la registrazione dei marchi e brevetti?", options: ["L'OPIC (Ufficio della proprietà intellettuale del Canada)", "La Banca del Canada", "Poste Canada", "Il ministero dell'Agricoltura"], explanation: "L'OPIC è l'organismo federale responsabile della gestione dei marchi, brevetti e altre forme di proprietà intellettuale." },
      { question: "Ogni innovazione deve sistematicamente essere brevettata secondo il modulo?", options: ["Sì, sempre obbligatoriamente", "No, un'analisi costi-benefici è necessaria", "È vietato brevettare qualsiasi cosa", "Solo le invenzioni canadesi"], explanation: "Il costo e la complessità del brevetto devono essere valutati rispetto al suo valore strategico reale per l'impresa." },
      { question: "Quale protezione è spesso prioritaria per una giovane impresa?", options: ["Il brevetto solamente", "La registrazione del marchio", "Nessuna protezione è necessaria", "Il diritto d'autore esclusivamente"], explanation: "Proteggere il marchio (nome, logo) è spesso più accessibile e prioritario di un brevetto complesso per una giovane impresa." },
      { question: "Cosa proteggono i segreti commerciali?", options: ["Le informazioni riservate non divulgate", "Solo i loghi", "Gli edifici fisici", "I dipendenti stessi"], explanation: "I segreti commerciali proteggono informazioni strategiche (ricette, processi) finché restano riservate." },
    ],
  },
  {
    title: "Progetto finale: pitch davanti a una giuria",
    objectives: [
      "Sintetizzare il proprio progetto imprenditoriale in una presentazione incisiva",
      "Rispondere alle domande critiche di una giuria di investitori",
      "Dimostrare la fattibilità e la credibilità del proprio progetto",
    ],
    content: [
      "Il pitch finale condensa il progetto imprenditoriale in 10 minuti massimo: problema, soluzione, mercato target, modello d'affari, trazione (se applicabile), team e richiesta di finanziamento o di partnership. Ogni minuto deve essere usato per catturare e mantenere l'attenzione.",
      "Una giuria di investitori pone generalmente domande sulla dimensione reale del mercato, la difendibilità di fronte alla concorrenza, l'utilizzo previsto dei fondi e la credibilità del team a eseguire il piano presentato.",
      "La preparazione alle domande difficili è importante quanto il pitch stesso: anticipare le obiezioni sui rischi, la concorrenza o le ipotesi finanziarie dimostra una comprensione approfondita del progetto, non solo un discorso memorizzato.",
    ],
    keyTakeaways: [
      "Un buon pitch cattura l'attenzione fin dai primi 30 secondi",
      "La preparazione alle domande difficili conta quanto la presentazione stessa",
      "La credibilità del team pesa spesso più della perfezione del piano",
    ],
    resourceLabels: [
      "Y Combinator — Come fare pitch (guida gratuita)",
    ],
    quiz: [
      { question: "Qual è la durata massima tipica di un pitch finale secondo il modulo?", options: ["1 ora", "10 minuti", "5 secondi", "3 giorni"], explanation: "Un pitch efficace deve essere condensato in 10 minuti massimo per restare incisivo e rispettare il tempo della giuria." },
      { question: "Su cosa pone generalmente domande una giuria di investitori?", options: ["Solo il colore del logo", "La dimensione del mercato, la concorrenza, l'utilizzo dei fondi", "Le vacanze dell'imprenditore", "Il clima locale"], explanation: "Questi elementi sono essenziali per valutare la fattibilità e il potenziale reale del progetto presentato." },
      { question: "Cosa dimostra la preparazione alle domande difficili?", options: ["Niente di importante", "Una comprensione approfondita del progetto", "Una mancanza di fiducia", "Una perdita di tempo inutile"], explanation: "Anticipare le obiezioni e rispondervi con sicurezza prova una padronanza reale del soggetto, al di là di un discorso memorizzato." },
      { question: "Quale elemento pesa spesso più della perfezione del piano secondo il modulo?", options: ["Il numero di pagine del documento", "La credibilità del team", "Il font usato", "La data di creazione dell'impresa"], explanation: "Gli investitori puntano spesso tanto sul team capace di eseguire quanto sul piano stesso." },
      { question: "Quanto tempo ha un buon pitch per catturare l'attenzione secondo il modulo?", options: ["I primi 30 secondi", "Solo gli ultimi 5 minuti", "Nessun momento è critico", "Tutta la presentazione allo stesso modo"], explanation: "I primi secondi sono cruciali per catturare immediatamente l'interesse dell'uditorio." },
      { question: "Cos'è la 'trazione' menzionata in un pitch?", options: ["Il tipo di pneumatici usati", "Prove concrete di progresso o adozione del prodotto/servizio", "Il peso dell'impresa", "Un termine senza relazione con l'imprenditoria"], explanation: "La trazione designa indicatori concreti (vendite, utenti, partnership) che dimostrano che il progetto avanza realmente." },
    ],
  },
];

const pt: CourseTranslation = [
  {
    title: "Ecossistema empreendedor canadiano",
    objectives: [
      "Identificar os principais atores do ecossistema empreendedor no Canadá",
      "Compreender as estruturas jurídicas de empresa disponíveis",
      "Conhecer os recursos de acompanhamento para recém-chegados",
    ],
    content: [
      "O ecossistema empreendedor canadiano compreende incubadoras (como Futurpreneur, MaRS Discovery District), aceleradoras, organismos de desenvolvimento económico regional e câmaras de comércio que oferecem mentoria e networking aos empreendedores.",
      "As estruturas jurídicas correntes incluem a empresa individual (simples mas responsabilidade ilimitada), a sociedade por ações (incorporação, responsabilidade limitada) e a sociedade em nome coletivo. A escolha depende do nível de risco, das necessidades de financiamento e da estrutura fiscal desejada.",
      "Vários programas visam especificamente os recém-chegados empreendedores: o Programa de empreendedores imigrantes do Quebec, os serviços da Futurpreneur Canada que oferecem empréstimos e mentoria, e os centros de ajuda às empresas (CLD, SADC) presentes em cada região.",
    ],
    keyTakeaways: [
      "O acompanhamento existe em cada etapa — nunca se deve empreender sozinho",
      "A escolha da estrutura jurídica tem consequências fiscais e legais duradouras",
      "Os recém-chegados têm acesso a recursos de acompanhamento específicos",
    ],
    resourceLabels: [
      "Futurpreneur Canada",
      "Banco de desenvolvimento do Canadá (BDC)",
    ],
    quiz: [
      { question: "Que organismo é mencionado como oferecendo empréstimos e mentoria aos jovens empreendedores?", options: ["Futurpreneur Canada", "Revenu Québec", "A SAAQ", "O ministério da Saúde"], explanation: "A Futurpreneur Canada acompanha especificamente os jovens empreendedores com financiamento e mentoria." },
      { question: "Que estrutura jurídica oferece uma responsabilidade limitada?", options: ["A empresa individual", "A sociedade por ações (incorporação)", "Nenhuma estrutura oferece isso", "O trabalho não declarado"], explanation: "A sociedade por ações separa os bens pessoais dos da empresa, limitando a responsabilidade do proprietário." },
      { question: "Qual é o principal risco da empresa individual?", options: ["Nenhum risco", "A responsabilidade ilimitada do proprietário", "Demasiada burocracia", "É ilegal no Canadá"], explanation: "Na empresa individual, os bens pessoais do empreendedor podem ser comprometidos em caso de dívidas da empresa." },
      { question: "O que são os CLD/SADC mencionados no módulo?", options: ["Bancos internacionais", "Centros de ajuda às empresas regionais", "Escolas secundárias", "Companhias de seguros"], explanation: "Os CLD e SADC são organismos regionais de ajuda ao desenvolvimento económico e empreendedor." },
      { question: "A escolha da estrutura jurídica de uma empresa depende de:", options: ["A cor preferida do empreendedor", "O nível de risco, o financiamento e a fiscalidade desejada", "Nada importante", "Apenas do tamanho da cidade"], explanation: "Estes três fatores determinam que estrutura jurídica convém melhor a um projeto empreendedor dado." },
      { question: "Por que é desaconselhado empreender sozinho segundo o módulo?", options: ["Porque é proibido por lei", "Porque o acompanhamento existe em cada etapa e aumenta as hipóteses de sucesso", "Porque é sempre preciso um sócio legal", "Não é um conselho dado"], explanation: "Numerosos recursos de acompanhamento existem e o seu uso aumenta significativamente as hipóteses de sucesso." },
    ],
  },
  {
    title: "Ideação e validação de conceito",
    objectives: [
      "Aplicar métodos de geração de ideias de negócio",
      "Realizar um estudo de mercado simplificado",
      "Testar uma hipótese de conceito antes do investimento",
    ],
    content: [
      "A geração de ideias de negócio parte frequentemente da observação de um problema não resolvido em vez da procura de uma ideia original. O método do 'Jobs to be Done' ajuda a identificar o que os clientes procuram realmente alcançar, para além do produto em si.",
      "Um estudo de mercado simplificado inclui a análise da concorrência, a estimativa do tamanho do mercado-alvo e entrevistas diretas com clientes potenciais. Esta etapa evita investir tempo e dinheiro numa ideia sem procura real.",
      "O Lean Startup propõe validar rapidamente uma hipótese com um produto mínimo viável (MVP) em vez de desenvolver uma solução completa antes de testar o mercado. Falhar rápido e a baixo custo permite iterar para uma melhor solução.",
    ],
    keyTakeaways: [
      "Uma boa ideia resolve um problema real observado, não um problema suposto",
      "Falar diretamente com os clientes potenciais vale mais do que inquéritos genéricos",
      "O MVP permite testar o mercado antes de um investimento maior",
    ],
    resourceLabels: [
      "Lean Startup — Recursos metodológicos",
    ],
    quiz: [
      { question: "O que significa MVP na metodologia Lean Startup?", options: ["Most Valuable Player", "Produto mínimo viável", "Marketing Venda Lucro", "Modelo de Venda Premium"], explanation: "O MVP (Minimum Viable Product) é uma versão simplificada de um produto que permite testar rapidamente uma hipótese no mercado." },
      { question: "De onde parte geralmente uma boa ideia de negócio segundo o módulo?", options: ["De um sonho sem fundamento", "Da observação de um problema real não resolvido", "De uma cópia exata de um concorrente", "Do acaso apenas"], explanation: "As melhores ideias resolvem um verdadeiro problema observado em potenciais clientes." },
      { question: "O que visa o método 'Jobs to be Done'?", options: ["Encontrar um emprego rapidamente", "Identificar o que os clientes procuram realmente alcançar", "Criar ofertas de emprego", "Calcular um salário"], explanation: "Este método ajuda a compreender a necessidade profunda do cliente em vez de se concentrar apenas nas características de um produto." },
      { question: "Por que o Lean Startup privilegia o fracasso rápido e a baixo custo?", options: ["Para desperdiçar dinheiro", "Para permitir iterar rapidamente para uma melhor solução", "Não é um objetivo", "Para desencorajar os empreendedores"], explanation: "Falhar rápido e a menor custo permite aprender rapidamente e ajustar o conceito antes de um investimento maior." },
      { question: "Que elemento faz parte de um estudo de mercado simplificado?", options: ["O horóscopo do fundador", "A análise da concorrência", "A cor do logótipo", "O número de redes sociais seguidas pessoalmente"], explanation: "A análise da concorrência é um elemento central para compreender o posicionamento possível num mercado." },
      { question: "Por que falar diretamente com os clientes potenciais é valorizado?", options: ["Não é recomendado", "Dá informações mais fiáveis do que inquéritos genéricos", "É uma perda de tempo", "É proibido legalmente"], explanation: "As entrevistas diretas fornecem informações qualitativas valiosas frequentemente mais úteis do que dados genéricos." },
    ],
  },
  {
    title: "Plano de negócio e modelo financeiro",
    objectives: [
      "Estruturar um plano de negócio completo e convincente",
      "Construir projeções financeiras realistas",
      "Usar o Business Model Canvas",
    ],
    content: [
      "Um plano de negócio completo compreende: resumo executivo, descrição da empresa, análise de mercado, estratégia de marketing, plano operacional, estrutura organizacional e projeções financeiras. Serve ao mesmo tempo de roteiro interno e de documento para convencer investidores ou credores.",
      "As projeções financeiras devem incluir uma demonstração de resultados previsional, um balanço e uma demonstração de fluxo de caixa sobre pelo menos 3 anos. O ponto de equilíbrio indica o volume de vendas necessário para cobrir todos os custos fixos e variáveis.",
      "O Business Model Canvas oferece uma vista sintética em 9 blocos: segmentos de clientes, proposta de valor, canais, relação com o cliente, fontes de receita, recursos-chave, atividades-chave, parcerias-chave e estrutura de custos. Permite iterar rapidamente sobre o modelo de negócio.",
    ],
    keyTakeaways: [
      "As projeções financeiras devem ser conservadoras, não otimistas",
      "O ponto de equilíbrio é o indicador mais importante para avaliar a viabilidade",
      "O Business Model Canvas facilita as iterações rápidas antes do plano completo",
    ],
    resourceLabels: [
      "Strategyzer — Business Model Canvas oficial",
      "BDC — Modelos de plano de negócio gratuitos",
    ],
    quiz: [
      { question: "O que designa o 'ponto de equilíbrio' num plano financeiro?", options: ["A data de encerramento da empresa", "O limiar de rentabilidade onde as receitas cobrem todos os custos", "O salário mínimo legal", "Um feriado"], explanation: "O ponto de equilíbrio indica o volume de vendas necessário para que a empresa não esteja nem em lucro nem em perda." },
      { question: "Quantos blocos compõem o Business Model Canvas?", options: ["3", "9", "20", "1"], explanation: "O Business Model Canvas está estruturado em 9 blocos que cobrem todos os aspetos-chave de um modelo de negócio." },
      { question: "Sobre quantos anos no mínimo devem estender-se as projeções financeiras?", options: ["1 mês", "3 anos", "20 anos", "Nenhuma duração exigida"], explanation: "Projeções sobre pelo menos 3 anos permitem avaliar a viabilidade a médio prazo do projeto." },
      { question: "Que tipo de projeções financeiras é recomendado?", options: ["Muito otimistas para impressionar", "Conservadoras e realistas", "Aleatórias", "Inexistentes"], explanation: "Projeções conservadoras reforçam a credibilidade junto dos investidores e evitam as desilusões." },
      { question: "Que documento financeiro previsional mostra as entradas e saídas de dinheiro?", options: ["A demonstração de fluxo de caixa", "A lista de contactos", "O plano de marketing", "O organograma"], explanation: "A demonstração de fluxo de caixa projeta os movimentos de liquidez a entrar e a sair da empresa." },
      { question: "Para que serve principalmente um plano de negócio?", options: ["Apenas para decorar um escritório", "De roteiro interno e documento para convencer investidores/credores", "Para substituir a contabilidade", "Não tem qualquer utilidade prática"], explanation: "O plano de negócio guia o empreendedor internamente ao mesmo tempo que serve de ferramenta de persuasão para o financiamento externo." },
    ],
  },
  {
    title: "Financiamento: subsídios, investidores, empréstimos",
    objectives: [
      "Identificar as fontes de financiamento disponíveis no Canadá",
      "Compreender as diferenças entre dívida, capital e subsídio",
      "Preparar um dossiê de financiamento convincente",
    ],
    content: [
      "As opções de financiamento incluem os empréstimos bancários tradicionais, o financiamento participativo (crowdfunding), os investidores providenciais (anjos) e de capital de risco, assim como subsídios governamentais federais e provinciais específicos a certos setores ou populações.",
      "O financiamento por dívida (empréstimo) deve ser reembolsado com juros mas não dilui a propriedade da empresa. O financiamento por capital (investidores) não exige reembolso imediato mas cede uma parte da propriedade e do controlo de decisão.",
      "Um dossiê de financiamento convincente apresenta um plano de negócio sólido, projeções financeiras realistas, uma equipa competente e um uso claro dos fundos solicitados. Os credores e investidores avaliam tanto a credibilidade do empreendedor como a qualidade do projeto.",
    ],
    keyTakeaways: [
      "O tipo de financiamento escolhido deve corresponder à etapa de desenvolvimento da empresa",
      "A dívida preserva o controlo mas impõe um reembolso fixo",
      "Um dossiê sólido demonstra a credibilidade do empreendedor tanto como a qualidade do projeto",
    ],
    resourceLabels: [
      "Inovação, Ciência e Desenvolvimento Económico Canadá — Financiamento",
      "Investissement Québec",
    ],
    quiz: [
      { question: "Qual é a principal diferença entre dívida e capital como financiamento?", options: ["Nenhuma diferença", "A dívida deve ser reembolsada com juros, o capital cede uma parte da propriedade", "O capital é sempre gratuito", "A dívida nunca precisa de ser reembolsada"], explanation: "A dívida implica um reembolso obrigatório com juros, enquanto o capital cede uma parte de propriedade sem reembolso imediato." },
      { question: "O que é um 'investidor providencial' (anjo)?", options: ["Um empregado religioso", "Um investidor privado que financia empresas em arranque", "Um funcionário governamental", "Um tipo de empréstimo bancário"], explanation: "Os investidores providenciais (anjos) são particulares abastados que investem o seu próprio capital em startups promissoras." },
      { question: "Que vantagem oferece o financiamento por dívida em relação ao capital?", options: ["Dilui sempre a propriedade", "Preserva o controlo total da empresa pelo fundador", "É sempre gratuito", "Não existe no Canadá"], explanation: "Ao contrário do capital, a dívida não cede qualquer parte de propriedade ou de poder de decisão a um terceiro." },
      { question: "O que avaliam os credores e investidores além da qualidade do projeto?", options: ["Nada mais", "A credibilidade do empreendedor", "Apenas a idade do requerente", "A nacionalidade apenas"], explanation: "A credibilidade e a competência percebida do empreendedor são fatores-chave em toda decisão de financiamento." },
      { question: "O que deve apresentar claramente um dossiê de financiamento convincente?", options: ["Nenhuma informação precisa", "O uso claro dos fundos solicitados", "Apenas fotos da equipa", "O número de telefone pessoal"], explanation: "Os credores e investidores querem saber precisamente como os fundos serão usados antes de se comprometerem." },
      { question: "O financiamento participativo (crowdfunding) implica geralmente:", options: ["Um único grande investidor", "Numerosos pequenos contribuintes, frequentemente através de uma plataforma online", "Apenas bancos", "O governo exclusivamente"], explanation: "O crowdfunding mobiliza um grande número de pequenas contribuições, frequentemente através de plataformas online dedicadas." },
    ],
  },
  {
    title: "Direito comercial no Canadá",
    objectives: [
      "Compreender as obrigações legais de base de uma empresa",
      "Conhecer as exigências fiscais e de registo",
      "Identificar os contratos essenciais para proteger a sua empresa",
    ],
    content: [
      "Toda empresa no Canadá deve registar-se junto do registo de empresas provincial, obter um número de empresa federal (NE) junto da Agência de receitas do Canadá, e respeitar as obrigações fiscais (GST/QST conforme o limiar de receitas).",
      "As obrigações variam conforme a estrutura jurídica: uma sociedade por ações deve manter registos societários, organizar assembleias anuais e produzir declarações fiscais distintas das dos acionistas.",
      "Os contratos essenciais incluem as condições de serviço com os clientes, os acordos de confidencialidade com os empregados e parceiros, e os contratos de parceria claramente definidos. Um advogado comercial deveria rever estes documentos antes da sua entrada em aplicação.",
    ],
    keyTakeaways: [
      "O registo e a conformidade fiscal são obrigatórios desde o arranque",
      "A estrutura jurídica escolhida determina as obrigações administrativas contínuas",
      "Investir em contratos sólidos desde o início evita litígios custosos mais tarde",
    ],
    resourceLabels: [
      "Registraire des entreprises du Québec",
      "Agência de receitas do Canadá — Empresas",
    ],
    quiz: [
      { question: "O que deve obter toda empresa junto da Agência de receitas do Canadá?", options: ["Uma carta de condução", "Um número de empresa federal (NE)", "Um cartão de seguro de saúde", "Nada é exigido"], explanation: "O número de empresa federal (NE) é essencial para as obrigações fiscais e administrativas de toda empresa canadiana." },
      { question: "Que obrigação adicional tem uma sociedade por ações em relação a uma empresa individual?", options: ["Nenhuma diferença", "Manter registos societários e organizar assembleias anuais", "Pagar mais cara a eletricidade", "Ter um só empregado no máximo"], explanation: "A sociedade por ações implica obrigações de governança mais formais, entre as quais manter registos e assembleias." },
      { question: "Por que é importante ter contratos de confidencialidade com os empregados?", options: ["Nunca é útil", "Para proteger as informações sensíveis da empresa", "É apenas decorativo", "Para aumentar os custos inutilmente"], explanation: "Os acordos de confidencialidade protegem as informações estratégicas e sensíveis da empresa contra a divulgação." },
      { question: "Quem deveria rever os contratos essenciais de uma empresa segundo o módulo?", options: ["Ninguém, não é necessário", "Um advogado comercial", "Um amigo não especializado", "Um cliente ao acaso"], explanation: "Um advogado comercial aporta a experiência necessária para assegurar que os contratos protejam realmente a empresa." },
      { question: "Quando se tornam aplicáveis as obrigações fiscais de registo?", options: ["Nunca", "Desde o arranque da empresa", "Só após 10 anos de atividade", "Apenas se a empresa falir"], explanation: "As obrigações legais e fiscais aplicam-se desde o arranque, não após um certo prazo." },
      { question: "Que registo deve ser consultado para registar uma empresa no Quebec?", options: ["O Registraire des entreprises du Québec", "A estação de correios", "Uma biblioteca municipal", "Não existe qualquer registo"], explanation: "O Registraire des entreprises du Québec gere o registo oficial das empresas na província." },
    ],
  },
  {
    title: "Marketing e aquisição de clientes",
    objectives: [
      "Definir uma proposta de valor clara e diferenciada",
      "Escolher canais de aquisição adaptados a um orçamento limitado",
      "Construir as primeiras relações com clientes duradouras",
    ],
    content: [
      "Uma proposta de valor clara responde a três perguntas: que problema específico resolve a empresa, para quem, e por que melhor do que as alternativas existentes. Sem esta clareza, todo esforço de marketing torna-se ineficaz.",
      "Para uma empresa jovem com orçamento limitado, o marketing de conteúdo, o boca a boca estruturado (programas de referência) e o networking local continuam a ser frequentemente mais rentáveis do que a publicidade paga em grande escala.",
      "Os primeiros clientes são os mais valiosos: o seu retorno direto permite ajustar o produto, e a sua satisfação gera recomendações que reduzem o custo de aquisição para os clientes seguintes. Um excelente serviço ao cliente compensa frequentemente um orçamento de marketing limitado.",
    ],
    keyTakeaways: [
      "Uma proposta de valor confusa torna todo marketing ineficaz",
      "Os canais de baixo custo (conteúdo, rede, recomendação) são frequentemente os mais rentáveis no arranque",
      "Os primeiros clientes são uma fonte de aprendizagem tanto como de receita",
    ],
    resourceLabels: [
      "Strategyzer — Value Proposition Canvas",
    ],
    quiz: [
      { question: "Quais são as três perguntas-chave de uma proposta de valor clara?", options: ["Quando, onde, como", "Que problema, para quem, por que melhor do que as alternativas", "Quanto custa apenas", "Quem é o diretor-geral"], explanation: "Estas três perguntas definem precisamente o que torna uma oferta pertinente e diferenciada no mercado." },
      { question: "Que canal é frequentemente mais rentável para uma empresa jovem com orçamento limitado?", options: ["A publicidade televisiva nacional", "O marketing de conteúdo e o boca a boca", "Os outdoors gigantes", "O patrocínio desportivo internacional"], explanation: "Estes canais de baixo custo são frequentemente mais acessíveis e eficazes para uma empresa em arranque." },
      { question: "Por que os primeiros clientes são particularmente valiosos?", options: ["Pagam sempre mais caro", "O seu retorno permite ajustar o produto e gerar recomendações", "Não têm qualquer valor particular", "Estão sempre descontentes"], explanation: "Os primeiros clientes fornecem um feedback valioso e tornam-se frequentemente embaixadores que reduzem o custo de aquisição futuro." },
      { question: "O que pode compensar um excelente serviço ao cliente segundo o módulo?", options: ["Nada de todo", "Um orçamento de marketing limitado", "A ausência total de produto", "A falta de pessoal"], explanation: "Um serviço ao cliente excecional gera boca a boca positivo, compensando um orçamento de marketing restrito." },
      { question: "O que acontece se a proposta de valor é confusa?", options: ["Nada de particular", "Todo esforço de marketing torna-se ineficaz", "As vendas aumentam automaticamente", "Não tem consequências"], explanation: "Sem clareza sobre o valor oferecido, torna-se muito difícil comunicar eficazmente e convencer clientes potenciais." },
      { question: "O que é um programa de referência no marketing?", options: ["Um sistema que incentiva o boca a boca estruturado", "Um tipo de imposto", "Um software de contabilidade", "Uma obrigação legal"], explanation: "Um programa de referência incita os clientes existentes a recomendar a empresa, frequentemente através de recompensas." },
    ],
  },
  {
    title: "Inovação e propriedade intelectual",
    objectives: [
      "Compreender os tipos de proteção da propriedade intelectual",
      "Avaliar quando proteger uma inovação",
      "Conhecer o processo de registo de marca ou patente no Canadá",
    ],
    content: [
      "A propriedade intelectual divide-se em várias categorias: as patentes protegem as invenções técnicas, as marcas comerciais protegem os nomes e logótipos, o direito de autor protege as obras criativas, e os segredos comerciais protegem as informações confidenciais não divulgadas.",
      "Nem toda inovação necessita de uma patente — o custo e a complexidade do processo devem ser ponderados com o valor estratégico real da proteção. Para muitas empresas jovens, proteger a marca é prioritário antes de patentear um produto.",
      "O Escritório da propriedade intelectual do Canadá (OPIC) gere o registo de marcas e patentes. O processo pode levar de vários meses a vários anos conforme a complexidade, e um agente de patentes ou marcas é frequentemente recomendado para navegar o procedimento.",
    ],
    keyTakeaways: [
      "O tipo de proteção a privilegiar depende da natureza da inovação",
      "Nem tudo precisa de ser patenteado — a análise custo-benefício é essencial",
      "O registo de marca é frequentemente a prioridade mais acessível para uma empresa jovem",
    ],
    resourceLabels: [
      "Escritório da propriedade intelectual do Canadá",
    ],
    quiz: [
      { question: "O que protege uma patente?", options: ["Um nome comercial", "Uma invenção técnica", "Uma obra musical", "Um segredo de família"], explanation: "A patente protege especificamente as invenções técnicas novas e não óbvias." },
      { question: "O que protege uma marca comercial?", options: ["Um processo de fabrico secreto", "Um nome ou um logótipo", "Uma obra literária", "Uma patente de invenção"], explanation: "A marca comercial protege os elementos de identificação distintivos como os nomes e logótipos." },
      { question: "Que organismo canadiano gere o registo de marcas e patentes?", options: ["O OPIC (Escritório da propriedade intelectual do Canadá)", "O Banco do Canadá", "Os Correios do Canadá", "O ministério da Agricultura"], explanation: "O OPIC é o organismo federal responsável pela gestão de marcas, patentes e outras formas de propriedade intelectual." },
      { question: "Toda inovação deve sistematicamente ser patenteada segundo o módulo?", options: ["Sim, sempre obrigatoriamente", "Não, uma análise custo-benefício é necessária", "É proibido patentear seja o que for", "Só as invenções canadianas"], explanation: "O custo e a complexidade da patente devem ser avaliados face ao seu valor estratégico real para a empresa." },
      { question: "Que proteção é frequentemente prioritária para uma empresa jovem?", options: ["A patente apenas", "O registo da marca", "Nenhuma proteção é necessária", "O direito de autor exclusivamente"], explanation: "Proteger a marca (nome, logótipo) é frequentemente mais acessível e prioritário do que uma patente complexa para uma empresa jovem." },
      { question: "O que protegem os segredos comerciais?", options: ["As informações confidenciais não divulgadas", "Apenas os logótipos", "Os edifícios físicos", "Os próprios empregados"], explanation: "Os segredos comerciais protegem informações estratégicas (receitas, processos) enquanto permanecerem confidenciais." },
    ],
  },
  {
    title: "Projeto final: pitch perante um júri",
    objectives: [
      "Sintetizar o seu projeto empreendedor numa apresentação impactante",
      "Responder às perguntas críticas de um júri de investidores",
      "Demonstrar a viabilidade e a credibilidade do seu projeto",
    ],
    content: [
      "O pitch final condensa o projeto empreendedor em 10 minutos no máximo: problema, solução, mercado-alvo, modelo de negócio, tração (se aplicável), equipa e pedido de financiamento ou de parceria. Cada minuto deve ser usado para captar e manter a atenção.",
      "Um júri de investidores coloca geralmente perguntas sobre o tamanho real do mercado, a defensabilidade face à concorrência, o uso previsto dos fundos e a credibilidade da equipa para executar o plano apresentado.",
      "A preparação para as perguntas difíceis é tão importante como o pitch em si: antecipar as objeções sobre os riscos, a concorrência ou as hipóteses financeiras demonstra uma compreensão profunda do projeto, não apenas um discurso memorizado.",
    ],
    keyTakeaways: [
      "Um bom pitch capta a atenção desde os primeiros 30 segundos",
      "A preparação para as perguntas difíceis conta tanto como a apresentação em si",
      "A credibilidade da equipa pesa frequentemente mais do que a perfeição do plano",
    ],
    resourceLabels: [
      "Y Combinator — Como fazer um pitch (guia gratuito)",
    ],
    quiz: [
      { question: "Qual é a duração máxima típica de um pitch final segundo o módulo?", options: ["1 hora", "10 minutos", "5 segundos", "3 dias"], explanation: "Um pitch eficaz deve ser condensado em 10 minutos no máximo para continuar impactante e respeitar o tempo do júri." },
      { question: "Sobre o que coloca geralmente perguntas um júri de investidores?", options: ["A cor do logótipo apenas", "O tamanho do mercado, a concorrência, o uso dos fundos", "As férias do empreendedor", "O clima local"], explanation: "Estes elementos são essenciais para avaliar a viabilidade e o potencial real do projeto apresentado." },
      { question: "O que demonstra a preparação para as perguntas difíceis?", options: ["Nada de importante", "Uma compreensão profunda do projeto", "Uma falta de confiança", "Uma perda de tempo inútil"], explanation: "Antecipar as objeções e responder-lhes com segurança prova um domínio real do assunto, para além de um discurso memorizado." },
      { question: "Que elemento pesa frequentemente mais do que a perfeição do plano segundo o módulo?", options: ["O número de páginas do documento", "A credibilidade da equipa", "A fonte usada", "A data de criação da empresa"], explanation: "Os investidores apostam frequentemente tanto na equipa capaz de executar como no plano em si." },
      { question: "Quanto tempo tem um bom pitch para captar a atenção segundo o módulo?", options: ["Os primeiros 30 segundos", "Apenas os últimos 5 minutos", "Nenhum momento é crítico", "Toda a apresentação por igual"], explanation: "Os primeiros segundos são cruciais para captar imediatamente o interesse do auditório." },
      { question: "O que é a 'tração' mencionada num pitch?", options: ["O tipo de pneus usados", "Provas concretas de progresso ou adoção do produto/serviço", "O peso da empresa", "Um termo sem relação com o empreendedorismo"], explanation: "A tração designa indicadores concretos (vendas, utilizadores, parcerias) que demonstram que o projeto avança realmente." },
    ],
  },
];

const de: CourseTranslation = [
  {
    title: "Kanadisches Gründerökosystem",
    objectives: [
      "Die wichtigsten Akteure des kanadischen Gründerökosystems identifizieren",
      "Die verfügbaren rechtlichen Unternehmensstrukturen verstehen",
      "Die Unterstützungsressourcen für Neuankömmlinge kennen",
    ],
    content: [
      "Das kanadische Gründerökosystem umfasst Inkubatoren (wie Futurpreneur, MaRS Discovery District), Beschleuniger, regionale Wirtschaftsförderungsorganisationen und Handelskammern, die Unternehmern Mentoring und Networking bieten.",
      "Gängige Rechtsstrukturen umfassen das Einzelunternehmen (einfach, aber unbeschränkte Haftung), die Kapitalgesellschaft (Inkorporierung, beschränkte Haftung) und die offene Handelsgesellschaft. Die Wahl hängt vom Risikoniveau, den Finanzierungsbedürfnissen und der gewünschten Steuerstruktur ab.",
      "Mehrere Programme richten sich speziell an Gründer, die Neuankömmlinge sind: das Programm für eingewanderte Unternehmer in Quebec, die Dienste von Futurpreneur Canada mit Darlehen und Mentoring, und die Unternehmensberatungszentren (CLD, SADC), die in jeder Region präsent sind.",
    ],
    keyTakeaways: [
      "Unterstützung existiert in jeder Phase — man sollte nie allein gründen",
      "Die Wahl der Rechtsstruktur hat dauerhafte steuerliche und rechtliche Folgen",
      "Neuankömmlinge haben Zugang zu spezifischen Unterstützungsressourcen",
    ],
    resourceLabels: [
      "Futurpreneur Canada",
      "Business Development Bank of Canada (BDC)",
    ],
    quiz: [
      { question: "Welche Organisation wird als Anbieter von Darlehen und Mentoring für junge Unternehmer genannt?", options: ["Futurpreneur Canada", "Revenu Québec", "Die SAAQ", "Das Gesundheitsministerium"], explanation: "Futurpreneur Canada unterstützt speziell junge Unternehmer mit Finanzierung und Mentoring." },
      { question: "Welche Rechtsstruktur bietet eine beschränkte Haftung?", options: ["Das Einzelunternehmen", "Die Kapitalgesellschaft (Inkorporierung)", "Keine Struktur bietet das", "Schwarzarbeit"], explanation: "Die Kapitalgesellschaft trennt das persönliche Vermögen von dem des Unternehmens und beschränkt die Haftung des Eigentümers." },
      { question: "Was ist das Hauptrisiko des Einzelunternehmens?", options: ["Kein Risiko", "Die unbeschränkte Haftung des Eigentümers", "Zu viel Bürokratie", "Es ist in Kanada illegal"], explanation: "Beim Einzelunternehmen kann das persönliche Vermögen des Unternehmers bei Unternehmensschulden herangezogen werden." },
      { question: "Was sind die im Modul erwähnten CLD/SADC?", options: ["Internationale Banken", "Regionale Unternehmensberatungszentren", "Weiterführende Schulen", "Versicherungsgesellschaften"], explanation: "CLDs und SADCs sind regionale Organisationen zur Förderung der wirtschaftlichen und unternehmerischen Entwicklung." },
      { question: "Die Wahl der Rechtsstruktur eines Unternehmens hängt ab von:", options: ["Der Lieblingsfarbe des Unternehmers", "Dem Risikoniveau, der Finanzierung und der gewünschten Besteuerung", "Nichts Wichtigem", "Nur der Größe der Stadt"], explanation: "Diese drei Faktoren bestimmen, welche Rechtsstruktur am besten zu einem gegebenen Gründungsprojekt passt." },
      { question: "Warum wird laut Modul davon abgeraten, allein zu gründen?", options: ["Weil es gesetzlich verboten ist", "Weil Unterstützung in jeder Phase existiert und die Erfolgschancen erhöht", "Weil man immer einen rechtlichen Partner braucht", "Es ist kein gegebener Rat"], explanation: "Es existieren zahlreiche Unterstützungsressourcen, und ihre Nutzung erhöht die Erfolgschancen erheblich." },
    ],
  },
  {
    title: "Ideenfindung und Konzeptvalidierung",
    objectives: [
      "Methoden zur Generierung von Geschäftsideen anwenden",
      "Eine vereinfachte Marktstudie durchführen",
      "Eine Konzepthypothese vor der Investition testen",
    ],
    content: [
      "Die Generierung von Geschäftsideen beginnt oft mit der Beobachtung eines ungelösten Problems statt mit der Suche nach einer originellen Idee. Die 'Jobs to be Done'-Methode hilft zu identifizieren, was Kunden wirklich erreichen wollen, über das Produkt selbst hinaus.",
      "Eine vereinfachte Marktstudie umfasst die Wettbewerbsanalyse, die Schätzung der Größe des Zielmarkts und direkte Interviews mit potenziellen Kunden. Dieser Schritt vermeidet, Zeit und Geld in eine Idee ohne echte Nachfrage zu investieren.",
      "Der Lean Startup schlägt vor, eine Hypothese schnell mit einem minimal funktionsfähigen Produkt (MVP) zu validieren, statt eine vollständige Lösung zu entwickeln, bevor der Markt getestet wird. Schnell und günstig zu scheitern ermöglicht das Iterieren zu einer besseren Lösung.",
    ],
    keyTakeaways: [
      "Eine gute Idee löst ein reales beobachtetes Problem, kein angenommenes",
      "Direkt mit potenziellen Kunden zu sprechen ist mehr wert als generische Umfragen",
      "Das MVP ermöglicht, den Markt vor einer großen Investition zu testen",
    ],
    resourceLabels: [
      "Lean Startup — Methodologie-Ressourcen",
    ],
    quiz: [
      { question: "Was bedeutet MVP in der Lean-Startup-Methodik?", options: ["Most Valuable Player", "Minimal funktionsfähiges Produkt", "Marketing Verkauf Profit", "Premium-Verkaufsmodell"], explanation: "Das MVP (Minimum Viable Product) ist eine vereinfachte Version eines Produkts, die es erlaubt, eine Hypothese schnell am Markt zu testen." },
      { question: "Wo beginnt laut Modul im Allgemeinen eine gute Geschäftsidee?", options: ["Aus einem grundlosen Traum", "Aus der Beobachtung eines realen ungelösten Problems", "Aus einer exakten Kopie eines Wettbewerbers", "Nur aus Zufall"], explanation: "Die besten Ideen lösen ein echtes bei potenziellen Kunden beobachtetes Problem." },
      { question: "Was bezweckt die 'Jobs to be Done'-Methode?", options: ["Schnell einen Job finden", "Identifizieren, was Kunden wirklich erreichen wollen", "Stellenanzeigen erstellen", "Ein Gehalt berechnen"], explanation: "Diese Methode hilft, das tiefe Bedürfnis des Kunden zu verstehen, statt sich nur auf die Merkmale eines Produkts zu konzentrieren." },
      { question: "Warum bevorzugt der Lean Startup schnelles, kostengünstiges Scheitern?", options: ["Um Geld zu verschwenden", "Um schnell zu einer besseren Lösung iterieren zu können", "Es ist kein Ziel", "Um Unternehmer zu entmutigen"], explanation: "Schnell und günstig zu scheitern ermöglicht schnelles Lernen und die Anpassung des Konzepts vor einer großen Investition." },
      { question: "Welches Element ist Teil einer vereinfachten Marktstudie?", options: ["Das Horoskop des Gründers", "Die Wettbewerbsanalyse", "Die Logofarbe", "Die Anzahl der persönlich verfolgten sozialen Netzwerke"], explanation: "Die Wettbewerbsanalyse ist ein zentrales Element, um die mögliche Positionierung in einem Markt zu verstehen." },
      { question: "Warum wird das direkte Gespräch mit potenziellen Kunden geschätzt?", options: ["Es wird nicht empfohlen", "Es liefert zuverlässigere Informationen als generische Umfragen", "Es ist Zeitverschwendung", "Es ist gesetzlich verboten"], explanation: "Direkte Interviews liefern wertvolle qualitative Informationen, die oft nützlicher sind als generische Daten." },
    ],
  },
  {
    title: "Businessplan und Finanzmodell",
    objectives: [
      "Einen vollständigen und überzeugenden Businessplan strukturieren",
      "Realistische Finanzprognosen erstellen",
      "Das Business Model Canvas verwenden",
    ],
    content: [
      "Ein vollständiger Businessplan umfasst: Zusammenfassung, Unternehmensbeschreibung, Marktanalyse, Marketingstrategie, Betriebsplan, Organisationsstruktur und Finanzprognosen. Er dient sowohl als interner Fahrplan als auch als Dokument, um Investoren oder Kreditgeber zu überzeugen.",
      "Die Finanzprognosen müssen eine voraussichtliche Gewinn- und Verlustrechnung, eine Bilanz und eine Cashflow-Rechnung über mindestens 3 Jahre umfassen. Der Break-even-Punkt gibt das Verkaufsvolumen an, das nötig ist, um alle fixen und variablen Kosten zu decken.",
      "Das Business Model Canvas bietet eine übersichtliche Darstellung in 9 Blöcken: Kundensegmente, Wertangebot, Kanäle, Kundenbeziehung, Einnahmequellen, Schlüsselressourcen, Schlüsselaktivitäten, Schlüsselpartnerschaften und Kostenstruktur. Es ermöglicht schnelles Iterieren am Geschäftsmodell.",
    ],
    keyTakeaways: [
      "Finanzprognosen müssen konservativ sein, nicht optimistisch",
      "Der Break-even-Punkt ist der wichtigste Indikator zur Bewertung der Rentabilität",
      "Das Business Model Canvas erleichtert schnelle Iterationen vor dem vollständigen Plan",
    ],
    resourceLabels: [
      "Strategyzer — Offizielles Business Model Canvas",
      "BDC — Kostenlose Businessplan-Vorlagen",
    ],
    quiz: [
      { question: "Was bezeichnet der 'Break-even-Punkt' in einem Finanzplan?", options: ["Das Schließungsdatum des Unternehmens", "Die Rentabilitätsschwelle, bei der die Einnahmen alle Kosten decken", "Der gesetzliche Mindestlohn", "Ein Feiertag"], explanation: "Der Break-even-Punkt gibt das Verkaufsvolumen an, das nötig ist, damit das Unternehmen weder Gewinn noch Verlust macht." },
      { question: "Aus wie vielen Blöcken besteht das Business Model Canvas?", options: ["3", "9", "20", "1"], explanation: "Das Business Model Canvas ist in 9 Blöcken strukturiert, die alle Schlüsselaspekte eines Geschäftsmodells abdecken." },
      { question: "Über wie viele Jahre mindestens sollten sich die Finanzprognosen erstrecken?", options: ["1 Monat", "3 Jahre", "20 Jahre", "Keine Dauer erforderlich"], explanation: "Prognosen über mindestens 3 Jahre ermöglichen es, die mittelfristige Rentabilität des Projekts zu bewerten." },
      { question: "Welche Art von Finanzprognosen wird empfohlen?", options: ["Sehr optimistisch, um zu beeindrucken", "Konservativ und realistisch", "Zufällig", "Nicht existent"], explanation: "Konservative Prognosen stärken die Glaubwürdigkeit bei Investoren und vermeiden Enttäuschungen." },
      { question: "Welches voraussichtliche Finanzdokument zeigt die Geldein- und -ausgänge?", options: ["Die Cashflow-Rechnung", "Das Adressbuch", "Der Marketingplan", "Das Organigramm"], explanation: "Die Cashflow-Rechnung projiziert die ein- und ausgehenden Liquiditätsbewegungen des Unternehmens." },
      { question: "Wozu dient ein Businessplan hauptsächlich?", options: ["Nur zur Dekoration eines Büros", "Als interner Fahrplan und Dokument zur Überzeugung von Investoren/Kreditgebern", "Um die Buchhaltung zu ersetzen", "Er hat keinen praktischen Nutzen"], explanation: "Der Businessplan leitet den Unternehmer intern und dient gleichzeitig als Überzeugungsinstrument für die externe Finanzierung." },
    ],
  },
  {
    title: "Finanzierung: Zuschüsse, Investoren, Darlehen",
    objectives: [
      "Die in Kanada verfügbaren Finanzierungsquellen identifizieren",
      "Die Unterschiede zwischen Fremdkapital, Eigenkapital und Zuschuss verstehen",
      "Ein überzeugendes Finanzierungsdossier vorbereiten",
    ],
    content: [
      "Die Finanzierungsoptionen umfassen traditionelle Bankdarlehen, Crowdfunding, Angel-Investoren und Risikokapital sowie bundesstaatliche und provinzielle Regierungszuschüsse, die für bestimmte Branchen oder Bevölkerungsgruppen spezifisch sind.",
      "Die Fremdkapitalfinanzierung (Darlehen) muss mit Zinsen zurückgezahlt werden, verwässert aber nicht das Eigentum am Unternehmen. Die Eigenkapitalfinanzierung (Investoren) erfordert keine sofortige Rückzahlung, gibt aber einen Teil des Eigentums und der Entscheidungskontrolle ab.",
      "Ein überzeugendes Finanzierungsdossier präsentiert einen soliden Businessplan, realistische Finanzprognosen, ein kompetentes Team und eine klare Verwendung der beantragten Mittel. Kreditgeber und Investoren bewerten die Glaubwürdigkeit des Unternehmers ebenso wie die Qualität des Projekts.",
    ],
    keyTakeaways: [
      "Die gewählte Finanzierungsart muss zur Entwicklungsphase des Unternehmens passen",
      "Fremdkapital bewahrt die Kontrolle, erlegt aber eine feste Rückzahlung auf",
      "Ein solides Dossier zeigt die Glaubwürdigkeit des Unternehmers ebenso wie die Qualität des Projekts",
    ],
    resourceLabels: [
      "Innovation, Wissenschaft und wirtschaftliche Entwicklung Kanada — Finanzierung",
      "Investissement Québec",
    ],
    quiz: [
      { question: "Was ist der Hauptunterschied zwischen Fremd- und Eigenkapital als Finanzierung?", options: ["Kein Unterschied", "Fremdkapital muss mit Zinsen zurückgezahlt werden, Eigenkapital gibt einen Teil des Eigentums ab", "Eigenkapital ist immer kostenlos", "Fremdkapital muss nie zurückgezahlt werden"], explanation: "Fremdkapital bedeutet eine verpflichtende Rückzahlung mit Zinsen, während Eigenkapital einen Eigentumsanteil ohne sofortige Rückzahlung abgibt." },
      { question: "Was ist ein 'Angel-Investor'?", options: ["Ein religiöser Angestellter", "Ein privater Investor, der Startups finanziert", "Ein Regierungsbeamter", "Eine Art Bankdarlehen"], explanation: "Angel-Investoren sind vermögende Privatpersonen, die ihr eigenes Kapital in vielversprechende Startups investieren." },
      { question: "Welchen Vorteil bietet die Fremdkapitalfinanzierung gegenüber dem Eigenkapital?", options: ["Sie verwässert immer das Eigentum", "Sie bewahrt die volle Kontrolle des Gründers über das Unternehmen", "Sie ist immer kostenlos", "Sie existiert in Kanada nicht"], explanation: "Anders als Eigenkapital gibt Fremdkapital keinen Eigentums- oder Entscheidungsanteil an einen Dritten ab." },
      { question: "Was bewerten Kreditgeber und Investoren zusätzlich zur Qualität des Projekts?", options: ["Nichts anderes", "Die Glaubwürdigkeit des Unternehmers", "Nur das Alter des Antragstellers", "Nur die Nationalität"], explanation: "Die Glaubwürdigkeit und die wahrgenommene Kompetenz des Unternehmers sind Schlüsselfaktoren bei jeder Finanzierungsentscheidung." },
      { question: "Was muss ein überzeugendes Finanzierungsdossier klar darlegen?", options: ["Keine genauen Informationen", "Die klare Verwendung der beantragten Mittel", "Nur Fotos des Teams", "Die persönliche Telefonnummer"], explanation: "Kreditgeber und Investoren wollen genau wissen, wie die Mittel verwendet werden, bevor sie sich verpflichten." },
      { question: "Crowdfunding beinhaltet im Allgemeinen:", options: ["Einen einzigen großen Investor", "Zahlreiche kleine Beitragende, oft über eine Online-Plattform", "Nur Banken", "Ausschließlich die Regierung"], explanation: "Crowdfunding mobilisiert eine große Anzahl kleiner Beiträge, oft über dedizierte Online-Plattformen." },
    ],
  },
  {
    title: "Wirtschaftsrecht in Kanada",
    objectives: [
      "Die grundlegenden rechtlichen Pflichten eines Unternehmens verstehen",
      "Die Steuer- und Registrierungsanforderungen kennen",
      "Die wesentlichen Verträge zum Schutz des Unternehmens identifizieren",
    ],
    content: [
      "Jedes Unternehmen in Kanada muss sich beim provinziellen Unternehmensregister registrieren, eine bundesstaatliche Unternehmensnummer (BN) bei der kanadischen Steuerbehörde erhalten und die Steuerpflichten (GST/QST je nach Umsatzschwelle) erfüllen.",
      "Die Pflichten variieren je nach Rechtsstruktur: eine Kapitalgesellschaft muss Gesellschaftsunterlagen führen, jährliche Versammlungen abhalten und von den Aktionären getrennte Steuererklärungen erstellen.",
      "Wesentliche Verträge umfassen die Dienstleistungsbedingungen mit Kunden, Vertraulichkeitsvereinbarungen mit Angestellten und Partnern sowie klar definierte Partnerschaftsverträge. Ein Wirtschaftsanwalt sollte diese Dokumente vor ihrem Inkrafttreten prüfen.",
    ],
    keyTakeaways: [
      "Registrierung und Steuerkonformität sind ab dem Start verpflichtend",
      "Die gewählte Rechtsstruktur bestimmt die laufenden administrativen Pflichten",
      "In solide Verträge von Anfang an zu investieren vermeidet kostspielige Streitigkeiten später",
    ],
    resourceLabels: [
      "Registraire des entreprises du Québec",
      "Kanadische Steuerbehörde — Unternehmen",
    ],
    quiz: [
      { question: "Was muss jedes Unternehmen bei der kanadischen Steuerbehörde erhalten?", options: ["Einen Führerschein", "Eine bundesstaatliche Unternehmensnummer (BN)", "Eine Krankenversicherungskarte", "Nichts ist erforderlich"], explanation: "Die bundesstaatliche Unternehmensnummer (BN) ist wesentlich für die steuerlichen und administrativen Pflichten jedes kanadischen Unternehmens." },
      { question: "Welche zusätzliche Pflicht hat eine Kapitalgesellschaft gegenüber einem Einzelunternehmen?", options: ["Kein Unterschied", "Gesellschaftsunterlagen führen und jährliche Versammlungen abhalten", "Mehr für Strom zahlen", "Höchstens einen Angestellten haben"], explanation: "Die Kapitalgesellschaft bringt formellere Governance-Pflichten mit sich, darunter das Führen von Unterlagen und das Abhalten von Versammlungen." },
      { question: "Warum ist es wichtig, Vertraulichkeitsvereinbarungen mit Angestellten zu haben?", options: ["Es ist nie nützlich", "Um die sensiblen Informationen des Unternehmens zu schützen", "Es ist nur dekorativ", "Um die Kosten unnötig zu erhöhen"], explanation: "Vertraulichkeitsvereinbarungen schützen die strategischen und sensiblen Informationen des Unternehmens vor Offenlegung." },
      { question: "Wer sollte laut Modul die wesentlichen Verträge eines Unternehmens prüfen?", options: ["Niemand, es ist nicht notwendig", "Ein Wirtschaftsanwalt", "Ein nicht spezialisierter Freund", "Ein zufälliger Kunde"], explanation: "Ein Wirtschaftsanwalt bringt die nötige Expertise, um sicherzustellen, dass die Verträge das Unternehmen wirklich schützen." },
      { question: "Wann werden die steuerlichen und Registrierungspflichten anwendbar?", options: ["Nie", "Ab dem Start des Unternehmens", "Erst nach 10 Jahren Tätigkeit", "Nur wenn das Unternehmen insolvent wird"], explanation: "Rechtliche und steuerliche Pflichten gelten ab dem Start, nicht nach einer bestimmten Frist." },
      { question: "Welches Register muss konsultiert werden, um ein Unternehmen in Quebec zu registrieren?", options: ["Das Registraire des entreprises du Québec", "Das Postamt", "Eine kommunale Bibliothek", "Es existiert kein Register"], explanation: "Das Registraire des entreprises du Québec verwaltet die offizielle Registrierung der Unternehmen in der Provinz." },
    ],
  },
  {
    title: "Marketing und Kundengewinnung",
    objectives: [
      "Ein klares und differenziertes Wertangebot definieren",
      "An ein begrenztes Budget angepasste Akquisitionskanäle wählen",
      "Die ersten dauerhaften Kundenbeziehungen aufbauen",
    ],
    content: [
      "Ein klares Wertangebot beantwortet drei Fragen: welches spezifische Problem das Unternehmen löst, für wen, und warum besser als die bestehenden Alternativen. Ohne diese Klarheit wird jede Marketingbemühung wirkungslos.",
      "Für ein junges Unternehmen mit begrenztem Budget bleiben Content-Marketing, strukturierte Mundpropaganda (Empfehlungsprogramme) und lokales Networking oft rentabler als bezahlte Werbung im großen Maßstab.",
      "Die ersten Kunden sind die wertvollsten: ihr direktes Feedback erlaubt es, das Produkt anzupassen, und ihre Zufriedenheit erzeugt Empfehlungen, die die Akquisitionskosten für nachfolgende Kunden senken. Exzellenter Kundenservice gleicht oft ein begrenztes Marketingbudget aus.",
    ],
    keyTakeaways: [
      "Ein vages Wertangebot macht jedes Marketing wirkungslos",
      "Kostengünstige Kanäle (Content, Netzwerk, Empfehlung) sind am Start oft die rentabelsten",
      "Die ersten Kunden sind eine Quelle des Lernens ebenso wie des Umsatzes",
    ],
    resourceLabels: [
      "Strategyzer — Value Proposition Canvas",
    ],
    quiz: [
      { question: "Was sind die drei Schlüsselfragen eines klaren Wertangebots?", options: ["Wann, wo, wie", "Welches Problem, für wen, warum besser als die Alternativen", "Nur wie viel es kostet", "Wer der Geschäftsführer ist"], explanation: "Diese drei Fragen definieren genau, was ein Angebot am Markt relevant und differenziert macht." },
      { question: "Welcher Kanal ist für ein junges Unternehmen mit begrenztem Budget oft rentabler?", options: ["Nationale Fernsehwerbung", "Content-Marketing und Mundpropaganda", "Riesige Werbetafeln", "Internationales Sportsponsoring"], explanation: "Diese kostengünstigen Kanäle sind für ein Startup-Unternehmen oft zugänglicher und wirksamer." },
      { question: "Warum sind die ersten Kunden besonders wertvoll?", options: ["Sie zahlen immer mehr", "Ihr Feedback erlaubt es, das Produkt anzupassen und Empfehlungen zu erzeugen", "Sie haben keinen besonderen Wert", "Sie sind immer unzufrieden"], explanation: "Die ersten Kunden liefern wertvolles Feedback und werden oft zu Botschaftern, die die zukünftigen Akquisitionskosten senken." },
      { question: "Was kann exzellenter Kundenservice laut Modul ausgleichen?", options: ["Gar nichts", "Ein begrenztes Marketingbudget", "Das völlige Fehlen eines Produkts", "Den Personalmangel"], explanation: "Außergewöhnlicher Kundenservice erzeugt positive Mundpropaganda und gleicht ein eingeschränktes Marketingbudget aus." },
      { question: "Was passiert, wenn das Wertangebot vage ist?", options: ["Nichts Besonderes", "Jede Marketingbemühung wird wirkungslos", "Der Umsatz steigt automatisch", "Es hat keine Folgen"], explanation: "Ohne Klarheit über den gebotenen Wert wird es sehr schwierig, effektiv zu kommunizieren und potenzielle Kunden zu überzeugen." },
      { question: "Was ist ein Empfehlungsprogramm im Marketing?", options: ["Ein System, das strukturierte Mundpropaganda fördert", "Eine Steuerart", "Eine Buchhaltungssoftware", "Eine gesetzliche Pflicht"], explanation: "Ein Empfehlungsprogramm ermutigt bestehende Kunden, das Unternehmen weiterzuempfehlen, oft über Belohnungen." },
    ],
  },
  {
    title: "Innovation und geistiges Eigentum",
    objectives: [
      "Die Arten des Schutzes geistigen Eigentums verstehen",
      "Bewerten, wann eine Innovation zu schützen ist",
      "Den Prozess der Anmeldung einer Marke oder eines Patents in Kanada kennen",
    ],
    content: [
      "Geistiges Eigentum unterteilt sich in mehrere Kategorien: Patente schützen technische Erfindungen, Marken schützen Namen und Logos, das Urheberrecht schützt kreative Werke, und Geschäftsgeheimnisse schützen nicht offengelegte vertrauliche Informationen.",
      "Nicht jede Innovation erfordert ein Patent — die Kosten und die Komplexität des Prozesses müssen gegen den realen strategischen Wert des Schutzes abgewogen werden. Für viele junge Unternehmen hat der Schutz der Marke Vorrang vor der Patentierung eines Produkts.",
      "Das kanadische Amt für geistiges Eigentum (CIPO) verwaltet die Registrierung von Marken und Patenten. Der Prozess kann je nach Komplexität mehrere Monate bis mehrere Jahre dauern, und ein Patent- oder Markenagent wird oft empfohlen, um das Verfahren zu navigieren.",
    ],
    keyTakeaways: [
      "Die zu bevorzugende Schutzart hängt von der Natur der Innovation ab",
      "Nicht alles muss patentiert werden — die Kosten-Nutzen-Analyse ist wesentlich",
      "Die Markenregistrierung ist für ein junges Unternehmen oft die zugänglichste Priorität",
    ],
    resourceLabels: [
      "Kanadisches Amt für geistiges Eigentum",
    ],
    quiz: [
      { question: "Was schützt ein Patent?", options: ["Einen Handelsnamen", "Eine technische Erfindung", "Ein Musikwerk", "Ein Familiengeheimnis"], explanation: "Das Patent schützt speziell neue und nicht offensichtliche technische Erfindungen." },
      { question: "Was schützt eine Marke?", options: ["Einen geheimen Herstellungsprozess", "Einen Namen oder ein Logo", "Ein literarisches Werk", "Ein Erfindungspatent"], explanation: "Die Marke schützt die unterscheidungskräftigen Identifikationselemente wie Namen und Logos." },
      { question: "Welche kanadische Behörde verwaltet die Registrierung von Marken und Patenten?", options: ["CIPO (Kanadisches Amt für geistiges Eigentum)", "Die Bank of Canada", "Canada Post", "Das Landwirtschaftsministerium"], explanation: "CIPO ist die für die Verwaltung von Marken, Patenten und anderen Formen geistigen Eigentums zuständige Bundesbehörde." },
      { question: "Muss laut Modul jede Innovation systematisch patentiert werden?", options: ["Ja, immer zwingend", "Nein, eine Kosten-Nutzen-Analyse ist notwendig", "Es ist verboten, irgendetwas zu patentieren", "Nur kanadische Erfindungen"], explanation: "Die Kosten und die Komplexität des Patents müssen gegen seinen realen strategischen Wert für das Unternehmen abgewogen werden." },
      { question: "Welcher Schutz hat für ein junges Unternehmen oft Vorrang?", options: ["Nur das Patent", "Die Markenregistrierung", "Kein Schutz ist notwendig", "Ausschließlich das Urheberrecht"], explanation: "Die Marke (Name, Logo) zu schützen ist für ein junges Unternehmen oft zugänglicher und vorrangiger als ein komplexes Patent." },
      { question: "Was schützen Geschäftsgeheimnisse?", options: ["Nicht offengelegte vertrauliche Informationen", "Nur Logos", "Physische Gebäude", "Die Angestellten selbst"], explanation: "Geschäftsgeheimnisse schützen strategische Informationen (Rezepte, Verfahren), solange sie vertraulich bleiben." },
    ],
  },
  {
    title: "Abschlussprojekt: Pitch vor einer Jury",
    objectives: [
      "Sein Gründungsprojekt in einer prägnanten Präsentation zusammenfassen",
      "Die kritischen Fragen einer Investorenjury beantworten",
      "Die Rentabilität und Glaubwürdigkeit seines Projekts demonstrieren",
    ],
    content: [
      "Der finale Pitch verdichtet das Gründungsprojekt auf höchstens 10 Minuten: Problem, Lösung, Zielmarkt, Geschäftsmodell, Traktion (falls zutreffend), Team und Finanzierungs- oder Partnerschaftsanfrage. Jede Minute muss genutzt werden, um die Aufmerksamkeit zu gewinnen und zu halten.",
      "Eine Investorenjury stellt im Allgemeinen Fragen zur realen Größe des Marktes, zur Verteidigungsfähigkeit gegenüber dem Wettbewerb, zur geplanten Verwendung der Mittel und zur Glaubwürdigkeit des Teams, den präsentierten Plan umzusetzen.",
      "Die Vorbereitung auf schwierige Fragen ist ebenso wichtig wie der Pitch selbst: Einwände zu Risiken, Wettbewerb oder finanziellen Annahmen zu antizipieren demonstriert ein tiefes Verständnis des Projekts, nicht nur eine auswendig gelernte Rede.",
    ],
    keyTakeaways: [
      "Ein guter Pitch gewinnt die Aufmerksamkeit in den ersten 30 Sekunden",
      "Die Vorbereitung auf schwierige Fragen zählt ebenso viel wie die Präsentation selbst",
      "Die Glaubwürdigkeit des Teams wiegt oft mehr als die Perfektion des Plans",
    ],
    resourceLabels: [
      "Y Combinator — Wie man pitcht (kostenloser Leitfaden)",
    ],
    quiz: [
      { question: "Was ist die typische maximale Dauer eines finalen Pitches laut Modul?", options: ["1 Stunde", "10 Minuten", "5 Sekunden", "3 Tage"], explanation: "Ein effektiver Pitch muss auf höchstens 10 Minuten verdichtet werden, um prägnant zu bleiben und die Zeit der Jury zu respektieren." },
      { question: "Wozu stellt eine Investorenjury im Allgemeinen Fragen?", options: ["Nur zur Logofarbe", "Zur Marktgröße, zum Wettbewerb, zur Verwendung der Mittel", "Zum Urlaub des Unternehmers", "Zum lokalen Wetter"], explanation: "Diese Elemente sind wesentlich, um die Rentabilität und das reale Potenzial des präsentierten Projekts zu bewerten." },
      { question: "Was demonstriert die Vorbereitung auf schwierige Fragen?", options: ["Nichts Wichtiges", "Ein tiefes Verständnis des Projekts", "Einen Mangel an Selbstvertrauen", "Eine unnötige Zeitverschwendung"], explanation: "Einwände zu antizipieren und selbstsicher zu beantworten beweist echte Beherrschung des Themas, über eine auswendig gelernte Rede hinaus." },
      { question: "Welches Element wiegt laut Modul oft mehr als die Perfektion des Plans?", options: ["Die Seitenzahl des Dokuments", "Die Glaubwürdigkeit des Teams", "Die verwendete Schriftart", "Das Gründungsdatum des Unternehmens"], explanation: "Investoren setzen oft ebenso sehr auf das umsetzungsfähige Team wie auf den Plan selbst." },
      { question: "Wie viel Zeit hat ein guter Pitch laut Modul, um die Aufmerksamkeit zu gewinnen?", options: ["Die ersten 30 Sekunden", "Nur die letzten 5 Minuten", "Kein Moment ist entscheidend", "Die gesamte Präsentation gleichermaßen"], explanation: "Die ersten Sekunden sind entscheidend, um das Interesse des Publikums sofort zu gewinnen." },
      { question: "Was ist die in einem Pitch erwähnte 'Traktion'?", options: ["Die Art der verwendeten Reifen", "Konkrete Belege für Fortschritt oder Annahme des Produkts/Dienstes", "Das Gewicht des Unternehmens", "Ein Begriff ohne Bezug zum Unternehmertum"], explanation: "Traktion bezeichnet konkrete Indikatoren (Verkäufe, Nutzer, Partnerschaften), die zeigen, dass das Projekt wirklich voranschreitet." },
    ],
  },
];

const ht: CourseTranslation = [
  {
    title: "Ekosistèm antreprenarial kanadyen",
    objectives: [
      "Idantifye prensipal aktè ekosistèm antreprenarial nan Kanada",
      "Konprann estrikti jiridik antrepriz ki disponib yo",
      "Konnen resous akonpayman pou nouvo arivan yo",
    ],
    content: [
      "Ekosistèm antreprenarial kanadyen an gen ladan enkibatè (tankou Futurpreneur, MaRS Discovery District), akseleratè, òganis devlopman ekonomik rejyonal ak chanm komès ki ofri mentora ak rezotaj bay antreprenè yo.",
      "Estrikti jiridik kouran yo enkli antrepriz endividyèl (senp men responsablite san limit), sosyete pa aksyon (enkòporasyon, responsablite limite) ak sosyete an non kolektif. Chwa a depann de nivo risk, bezwen finansman ak estrikti fiskal yo vle a.",
      "Plizyè pwogram vize espesifikman nouvo arivan antreprenè yo: Pwogram antreprenè imigran Quebec la, sèvis Futurpreneur Canada ki ofri prè ak mentora, ak sant èd antrepriz yo (CLD, SADC) ki prezan nan chak rejyon.",
    ],
    keyTakeaways: [
      "Akonpayman egziste nan chak etap — fòk pa janm antreprann pou kont ou",
      "Chwa estrikti jiridik la gen konsekans fiskal ak legal ki dire",
      "Nouvo arivan yo gen aksè ak resous akonpayman espesifik",
    ],
    resourceLabels: [
      "Futurpreneur Canada",
      "Bank devlopman Kanada (BDC)",
    ],
    quiz: [
      { question: "Ki òganis yo mansyone kòm ofri prè ak mentora bay jèn antreprenè yo?", options: ["Futurpreneur Canada", "Revenu Québec", "SAAQ la", "Ministè Sante a"], explanation: "Futurpreneur Canada akonpaye espesifikman jèn antreprenè yo ak finansman ak mentora." },
      { question: "Ki estrikti jiridik ki ofri yon responsablite limite?", options: ["Antrepriz endividyèl la", "Sosyete pa aksyon (enkòporasyon)", "Okenn estrikti pa ofri sa", "Travay an nwa"], explanation: "Sosyete pa aksyon separe byen pèsonèl yo ak byen antrepriz la, ki limite responsablite pwopriyetè a." },
      { question: "Ki prensipal risk antrepriz endividyèl la?", options: ["Okenn risk", "Responsablite san limit pwopriyetè a", "Twòp papye", "Li ilegal nan Kanada"], explanation: "Nan antrepriz endividyèl, byen pèsonèl antreprenè a ka angaje an ka dèt antrepriz la." },
      { question: "Kisa CLD/SADC yo mansyone nan modil la ye?", options: ["Bank entènasyonal", "Sant èd antrepriz rejyonal", "Lekòl segondè", "Konpayi asirans"], explanation: "CLD ak SADC se òganis rejyonal èd nan devlopman ekonomik ak antreprenarial." },
      { question: "Chwa estrikti jiridik yon antrepriz depann de:", options: ["Koulè prefere antreprenè a", "Nivo risk, finansman ak fiskalite yo vle a", "Anyen enpòtan", "Sèlman gwosè vil la"], explanation: "Twa faktè sa yo detèmine ki estrikti jiridik ki pi bon pou yon pwojè antreprenarial bay." },
      { question: "Poukisa yo dekonseye antreprann pou kont ou selon modil la?", options: ["Paske li entèdi pa lwa", "Paske akonpayman egziste nan chak etap epi ogmante chans siksè", "Paske toujou bezwen yon asosye legal", "Se pa yon konsèy yo bay"], explanation: "Anpil resous akonpayman egziste epi itilizasyon yo ogmante siyifikativman chans siksè." },
    ],
  },
  {
    title: "Ideyasyon ak validasyon konsèp",
    objectives: [
      "Aplike metòd jenerasyon lide zafè",
      "Reyalize yon etid mache senplifye",
      "Teste yon ipotèz konsèp anvan envestisman",
    ],
    content: [
      "Jenerasyon lide zafè souvan pati de obsèvasyon yon pwoblèm ki pa rezoud olye rechèch yon lide orijinal. Metòd 'Jobs to be Done' la ede idantifye sa kliyan yo reyèlman chèche akonpli, pi lwen pase pwodwi a li menm.",
      "Yon etid mache senplifye enkli analiz konkiran an, estimasyon gwosè mache sib la ak entèvyou dirèk ak kliyan potansyèl. Etap sa a evite envesti tan ak lajan nan yon lide san demann reyèl.",
      "Lean Startup pwopoze valide rapidman yon ipotèz ak yon pwodwi minimòm vyab (MVP) olye devlope yon solisyon konplè anvan teste mache a. Echwe rapidman epi a ba pri pèmèt itere vè yon pi bon solisyon.",
    ],
    keyTakeaways: [
      "Yon bon lide rezoud yon pwoblèm reyèl yo obsève, pa yon pwoblèm sipoze",
      "Pale dirèkteman ak kliyan potansyèl yo vo plis pase sondaj jenerik",
      "MVP la pèmèt teste mache a anvan yon envestisman majè",
    ],
    resourceLabels: [
      "Lean Startup — Resous metodolojik",
    ],
    quiz: [
      { question: "Kisa MVP vle di nan metodoloji Lean Startup la?", options: ["Most Valuable Player", "Pwodwi minimòm vyab", "Marketing Vant Pwofi", "Modèl Vant Premium"], explanation: "MVP (Minimum Viable Product) se yon vèsyon senplifye yon pwodwi ki pèmèt teste rapidman yon ipotèz sou mache a." },
      { question: "Ki kote yon bon lide zafè jeneralman pati selon modil la?", options: ["De yon rèv san fondman", "De obsèvasyon yon pwoblèm reyèl ki pa rezoud", "De yon kopi egzak yon konkiran", "De aza sèlman"], explanation: "Pi bon lide yo rezoud yon vre pwoblèm yo obsève lakay kliyan potansyèl." },
      { question: "Kisa metòd 'Jobs to be Done' la vize?", options: ["Jwenn yon travay rapidman", "Idantifye sa kliyan yo reyèlman chèche akonpli", "Kreye òf travay", "Kalkile yon salè"], explanation: "Metòd sa a ede konprann bezwen pwofon kliyan an olye konsantre sèlman sou karakteristik yon pwodwi." },
      { question: "Poukisa Lean Startup la privilejye echèk rapid ak a ba pri?", options: ["Pou gaspiye lajan", "Pou pèmèt itere rapidman vè yon pi bon solisyon", "Se pa yon objektif", "Pou dekouraje antreprenè yo"], explanation: "Echwe vit epi a mwens pri pèmèt aprann rapidman epi ajiste konsèp la anvan yon envestisman majè." },
      { question: "Ki eleman ki fè pati yon etid mache senplifye?", options: ["Oroskòp fondatè a", "Analiz konkiran an", "Koulè logo a", "Kantite rezo sosyal yo swiv pèsonèlman"], explanation: "Analiz konkiran an se yon eleman santral pou konprann pozisyònman posib sou yon mache." },
      { question: "Poukisa pale dirèkteman ak kliyan potansyèl yo valorize?", options: ["Se pa rekòmande", "Li bay enfòmasyon pi fyab pase sondaj jenerik", "Se yon pèt tan", "Li entèdi legalman"], explanation: "Entèvyou dirèk yo bay enfòmasyon kalitatif presye souvan pi itil pase done jenerik." },
    ],
  },
  {
    title: "Plan zafè ak modèl finansye",
    objectives: [
      "Estriktire yon plan zafè konplè ak konvenkan",
      "Konstwi pwojeksyon finansye reyalis",
      "Itilize Business Model Canvas la",
    ],
    content: [
      "Yon plan zafè konplè gen ladan: rezime egzekitif, deskripsyon antrepriz la, analiz mache, estrateji maketing, plan operasyonèl, estrikti òganizasyonèl ak pwojeksyon finansye. Li sèvi alafwa kòm yon fèy wout entèn ak yon dokiman pou konvenk envestisè oswa prete.",
      "Pwojeksyon finansye yo dwe enkli yon eta rezilta previzyonèl, yon bilan ak yon tablo flwo trezorri sou omwen 3 ane. Pwen mòt la (sèy rantabilite) endike volim vant ki nesesè pou kouvri tout kou fiks ak varyab.",
      "Business Model Canvas la ofri yon vi sentetik nan 9 blòk: segman kliyan, pwopozisyon valè, kanal, relasyon kliyan, sous revni, resous kle, aktivite kle, patenarya kle ak estrikti kou. Li pèmèt itere rapidman sou modèl zafè a.",
    ],
    keyTakeaways: [
      "Pwojeksyon finansye yo dwe konsèvatè, pa optimis",
      "Pwen mòt la se endikatè ki pi enpòtan pou evalye viyabilite",
      "Business Model Canvas la fasilite iterasyon rapid anvan plan konplè a",
    ],
    resourceLabels: [
      "Strategyzer — Business Model Canvas ofisyèl",
      "BDC — Modèl plan zafè gratis",
    ],
    quiz: [
      { question: "Kisa 'pwen mòt' la deziye nan yon plan finansye?", options: ["Dat fèmti antrepriz la", "Sèy rantabilite kote revni yo kouvri tout kou yo", "Salè minimòm legal la", "Yon jou ferye"], explanation: "Pwen mòt la endike volim vant ki nesesè pou antrepriz la pa ni nan pwofi ni nan pèt." },
      { question: "Konbyen blòk ki konpoze Business Model Canvas la?", options: ["3", "9", "20", "1"], explanation: "Business Model Canvas la estriktire nan 9 blòk ki kouvri tout aspè kle yon modèl zafè." },
      { question: "Sou konbyen ane minimòm pwojeksyon finansye yo dwe pwolonje?", options: ["1 mwa", "3 ane", "20 ane", "Okenn dire obligatwa"], explanation: "Pwojeksyon sou omwen 3 ane pèmèt evalye viyabilite mwayen tèm pwojè a." },
      { question: "Ki kalite pwojeksyon finansye yo rekòmande?", options: ["Trè optimis pou enpresyone", "Konsèvatè ak reyalis", "Owaza", "Ki pa egziste"], explanation: "Pwojeksyon konsèvatè ranfòse kredibilite anfas envestisè yo epi evite dezilizyon." },
      { question: "Ki dokiman finansye previzyonèl ki montre antre ak sòti lajan?", options: ["Tablo flwo trezorri a", "Kanè adrès la", "Plan maketing la", "Òganigram la"], explanation: "Tablo flwo trezorri a pwojte mouvman likidite k ap antre ak sòti nan antrepriz la." },
      { question: "Pou kisa yon plan zafè sèvi prensipalman?", options: ["Sèlman pou dekore yon biwo", "Fèy wout entèn ak dokiman pou konvenk envestisè/prete", "Pou ranplase kontabilite", "Li pa gen okenn itilite pratik"], explanation: "Plan zafè a gide antreprenè a andedan pandan l ap sèvi kòm yon zouti pèsyazyon pou finansman ekstèn." },
    ],
  },
  {
    title: "Finansman: sibvansyon, envestisè, prè",
    objectives: [
      "Idantifye sous finansman ki disponib nan Kanada",
      "Konprann diferans ant dèt, ekite ak sibvansyon",
      "Prepare yon dosye finansman konvenkan",
    ],
    content: [
      "Opsyon finansman yo enkli prè bankè tradisyonèl, finansman patisipatif (crowdfunding), envestisè pwovidansyèl (zanj) ak kapital risk, ansanm ak sibvansyon gouvènmantal federal ak pwovensyal espesifik ak kèk sektè oswa popilasyon.",
      "Finansman pa dèt (prè) dwe ranbouse ak enterè men li pa dilye pwopriyete antrepriz la. Finansman pa ekite (envestisè) pa egzije ranbousman imedya men li sede yon pati nan pwopriyete a ak kontwòl desizyonèl la.",
      "Yon dosye finansman konvenkan prezante yon plan zafè solid, pwojeksyon finansye reyalis, yon ekip konpetan ak yon itilizasyon klè fon yo mande yo. Prete ak envestisè yo evalye ni kredibilite antreprenè a ni kalite pwojè a.",
    ],
    keyTakeaways: [
      "Kalite finansman yo chwazi a dwe koresponn ak etap devlopman antrepriz la",
      "Dèt la prezève kontwòl la men li enpoze yon ranbousman fiks",
      "Yon dosye solid demontre kredibilite antreprenè a menm jan ak kalite pwojè a",
    ],
    resourceLabels: [
      "Inovasyon, Syans ak Devlopman ekonomik Kanada — Finansman",
      "Investissement Québec",
    ],
    quiz: [
      { question: "Ki prensipal diferans ant dèt ak ekite kòm finansman?", options: ["Okenn diferans", "Dèt dwe ranbouse ak enterè, ekite sede yon pati nan pwopriyete a", "Ekite toujou gratis", "Dèt pa janm bezwen ranbouse"], explanation: "Dèt enplike yon ranbousman obligatwa ak enterè, pandan ekite sede yon pati pwopriyete san ranbousman imedya." },
      { question: "Kisa yon 'envestisè pwovidansyèl' (zanj) ye?", options: ["Yon anplwaye relijye", "Yon envestisè prive ki finanse antrepriz k ap kòmanse", "Yon fonksyonè gouvènmantal", "Yon kalite prè bankè"], explanation: "Envestisè pwovidansyèl (zanj) se patikilye rich ki envesti pwòp kapital yo nan startup ki pwomtan." },
      { question: "Ki avantaj finansman pa dèt ofri parapò ak ekite?", options: ["Li toujou dilye pwopriyete a", "Li prezève kontwòl total antrepriz la pa fondatè a", "Li toujou gratis", "Li pa egziste nan Kanada"], explanation: "Kontrèman ak ekite, dèt pa sede okenn pati pwopriyete oswa pouvwa desizyonèl bay yon tyès." },
      { question: "Kisa prete ak envestisè yo evalye anplis kalite pwojè a?", options: ["Anyen lòt", "Kredibilite antreprenè a", "Sèlman laj demandè a", "Nasyonalite sèlman"], explanation: "Kredibilite ak konpetans yo pèsevwa nan antreprenè a se faktè kle nan tout desizyon finansman." },
      { question: "Kisa yon dosye finansman konvenkan dwe prezante klèman?", options: ["Okenn enfòmasyon presi", "Itilizasyon klè fon yo mande yo", "Sèlman foto ekip la", "Nimewo telefòn pèsonèl la"], explanation: "Prete ak envestisè yo vle konnen presizeman kijan fon yo pral itilize anvan yo angaje yo." },
      { question: "Finansman patisipatif (crowdfunding) jeneralman enplike:", options: ["Yon sèl gwo envestisè", "Anpil ti kontribitè, souvan atravè yon platfòm anliy", "Sèlman bank", "Gouvènman an eksklizivman"], explanation: "Crowdfunding mobilize yon gran kantite ti kontribisyon, souvan atravè platfòm anliy dedye." },
    ],
  },
  {
    title: "Dwa zafè nan Kanada",
    objectives: [
      "Konprann obligasyon legal baz yon antrepriz",
      "Konnen egzijans fiskal ak anrejistreman",
      "Idantifye kontra esansyèl pou pwoteje antrepriz ou",
    ],
    content: [
      "Tout antrepriz nan Kanada dwe anrejistre nan rejis antrepriz pwovensyal la, jwenn yon nimewo antrepriz federal (NE) nan Ajans revni Kanada a, epi respekte obligasyon fiskal yo (GST/QST selon sèy revni a).",
      "Obligasyon yo varye selon estrikti jiridik la: yon sosyete pa aksyon dwe kenbe rejis kòporatif, òganize asanble anyèl epi pwodwi deklarasyon fiskal distenk de sa aksyonè yo.",
      "Kontra esansyèl yo enkli kondisyon sèvis ak kliyan yo, antant konfidansyalite ak anplwaye ak patnè yo, ak kontra patenarya ki byen defini. Yon avoka zafè ta dwe revize dokiman sa yo anvan yo antre an aplikasyon.",
    ],
    keyTakeaways: [
      "Anrejistreman ak konfòmite fiskal obligatwa depi nan demaraj",
      "Estrikti jiridik yo chwazi a detèmine obligasyon administratif kontinyèl yo",
      "Envesti nan kontra solid depi nan kòmansman evite litij ki koute chè pita",
    ],
    resourceLabels: [
      "Registraire des entreprises du Québec",
      "Ajans revni Kanada — Antrepriz",
    ],
    quiz: [
      { question: "Kisa tout antrepriz dwe jwenn nan Ajans revni Kanada a?", options: ["Yon pèmi kondwi", "Yon nimewo antrepriz federal (NE)", "Yon kat asirans maladi", "Anyen pa obligatwa"], explanation: "Nimewo antrepriz federal (NE) esansyèl pou obligasyon fiskal ak administratif tout antrepriz kanadyen." },
      { question: "Ki obligasyon anplis yon sosyete pa aksyon genyen parapò ak yon antrepriz endividyèl?", options: ["Okenn diferans", "Kenbe rejis kòporatif epi òganize asanble anyèl", "Peye elektrisite pi chè", "Gen yon sèl anplwaye maksimòm"], explanation: "Sosyete pa aksyon enplike obligasyon gouvènans pi fòmèl, tankou kenbe rejis ak asanble." },
      { question: "Poukisa li enpòtan pou gen kontra konfidansyalite ak anplwaye yo?", options: ["Li pa janm itil", "Pou pwoteje enfòmasyon sansib antrepriz la", "Se sèlman dekoratif", "Pou ogmante kou initilman"], explanation: "Antant konfidansyalite pwoteje enfòmasyon estratejik ak sansib antrepriz la kont divilgasyon." },
      { question: "Kilès ki ta dwe revize kontra esansyèl yon antrepriz selon modil la?", options: ["Pèsonn, se pa nesesè", "Yon avoka zafè", "Yon zanmi ki pa espesyalize", "Yon kliyan owaza"], explanation: "Yon avoka zafè pote ekspètiz nesesè pou asire kontra yo reyèlman pwoteje antrepriz la." },
      { question: "Kilè obligasyon fiskal anrejistreman yo vin aplikab?", options: ["Janmen", "Depi nan demaraj antrepriz la", "Sèlman apre 10 ane aktivite", "Sèlman si antrepriz la fè fayit"], explanation: "Obligasyon legal ak fiskal yo aplike depi nan demaraj, pa apre yon sèten delè." },
      { question: "Ki rejis ki dwe konsilte pou anrejistre yon antrepriz nan Quebec?", options: ["Registraire des entreprises du Québec la", "Biwo lapòs la", "Yon bibliyotèk minisipal", "Okenn rejis pa egziste"], explanation: "Registraire des entreprises du Québec la jere anrejistreman ofisyèl antrepriz yo nan pwovens lan." },
    ],
  },
  {
    title: "Maketing ak akizisyon kliyan",
    objectives: [
      "Defini yon pwopozisyon valè klè ak diferansye",
      "Chwazi kanal akizisyon adapte ak yon bidjè limite",
      "Konstwi premye relasyon kliyan ki dire",
    ],
    content: [
      "Yon pwopozisyon valè klè reponn twa kesyon: ki pwoblèm espesifik antrepriz la rezoud, pou kilès, epi poukisa pi bon pase altènativ ki egziste yo. San klète sa a, tout efò maketing vin inefikas.",
      "Pou yon jèn antrepriz ak bidjè limite, maketing kontni, bouch-a-zòrèy estriktire (pwogram referans) ak rezotaj lokal souvan rete pi rantab pase piblisite peye a gran echèl.",
      "Premye kliyan yo se yo ki pi presye: retou dirèk yo pèmèt ajiste pwodwi a, epi satisfaksyon yo jenere rekòmandasyon ki diminye kou akizisyon pou kliyan ki vin apre yo. Yon eksèlan sèvis kliyan souvan konpanse yon bidjè maketing limite.",
    ],
    keyTakeaways: [
      "Yon pwopozisyon valè flou rann tout maketing inefikas",
      "Kanal a ba kou (kontni, rezo, rekòmandasyon) souvan pi rantab nan demaraj",
      "Premye kliyan yo se yon sous aprantisaj menm jan ak revni",
    ],
    resourceLabels: [
      "Strategyzer — Value Proposition Canvas",
    ],
    quiz: [
      { question: "Ki twa kesyon kle yon pwopozisyon valè klè?", options: ["Kilè, kote, kijan", "Ki pwoblèm, pou kilès, poukisa pi bon pase altènativ yo", "Konbyen li koute sèlman", "Kilès ki PDG"], explanation: "Twa kesyon sa yo defini presizeman sa ki fè yon òf pertinan ak diferansye sou mache a." },
      { question: "Ki kanal ki souvan pi rantab pou yon jèn antrepriz ak bidjè limite?", options: ["Piblisite televizyon nasyonal", "Maketing kontni ak bouch-a-zòrèy", "Gwo pankat piblisite", "Patwonaj espòtif entènasyonal"], explanation: "Kanal a ba kou sa yo souvan pi aksesib ak efikas pou yon antrepriz nan demaraj." },
      { question: "Poukisa premye kliyan yo patikilyèman presye?", options: ["Yo toujou peye pi chè", "Retou yo pèmèt ajiste pwodwi a epi jenere rekòmandasyon", "Yo pa gen okenn valè patikilye", "Yo toujou mekontan"], explanation: "Premye kliyan yo bay yon fidbak presye epi souvan vin anbasadè ki diminye kou akizisyon fiti." },
      { question: "Kisa yon eksèlan sèvis kliyan ka konpanse selon modil la?", options: ["Anyen ditou", "Yon bidjè maketing limite", "Absans total pwodwi", "Mank pèsonèl"], explanation: "Yon sèvis kliyan eksepsyonèl jenere bouch-a-zòrèy pozitif, ki konpanse yon bidjè maketing restren." },
      { question: "Kisa ki rive si pwopozisyon valè a flou?", options: ["Anyen patikilye", "Tout efò maketing vin inefikas", "Vant yo ogmante otomatikman", "Li san konsekans"], explanation: "San klète sou valè yo ofri a, li vin trè difisil pou kominike efikasman epi konvenk kliyan potansyèl." },
      { question: "Kisa yon pwogram referans ye nan maketing?", options: ["Yon sistèm ki ankouraje bouch-a-zòrèy estriktire", "Yon kalite taks", "Yon lojisyèl kontabilite", "Yon obligasyon legal"], explanation: "Yon pwogram referans ankouraje kliyan ki egziste yo rekòmande antrepriz la, souvan atravè rekonpans." },
    ],
  },
  {
    title: "Inovasyon ak pwopriyete entelektyèl",
    objectives: [
      "Konprann kalite pwoteksyon pwopriyete entelektyèl",
      "Evalye kilè pou pwoteje yon inovasyon",
      "Konnen pwosesis depo mak oswa brevè nan Kanada",
    ],
    content: [
      "Pwopriyete entelektyèl divize an plizyè kategori: brevè pwoteje envansyon teknik, mak komès pwoteje non ak logo, dwa dotè pwoteje zèv kreyatif, epi sekrè komèsyal pwoteje enfòmasyon konfidansyèl ki pa divilge.",
      "Se pa tout inovasyon ki bezwen yon brevè — kou ak konpleksite pwosesis la dwe balanse ak valè estratejik reyèl pwoteksyon an. Pou anpil jèn antrepriz, pwoteje mak la se priyorite anvan brevete yon pwodwi.",
      "Biwo pwopriyete entelektyèl Kanada (OPIC) jere anrejistreman mak ak brevè. Pwosesis la ka pran plizyè mwa jiska plizyè ane selon konpleksite, epi yon ajan brevè oswa mak souvan rekòmande pou navige pwosedi a.",
    ],
    keyTakeaways: [
      "Kalite pwoteksyon pou privilejye depann de nati inovasyon an",
      "Se pa tout bagay ki bezwen brevete — analiz kou-benefis esansyèl",
      "Anrejistreman mak souvan priyorite ki pi aksesib pou yon jèn antrepriz",
    ],
    resourceLabels: [
      "Biwo pwopriyete entelektyèl Kanada",
    ],
    quiz: [
      { question: "Kisa yon brevè pwoteje?", options: ["Yon non komèsyal", "Yon envansyon teknik", "Yon zèv mizikal", "Yon sekrè fanmi"], explanation: "Brevè a pwoteje espesifikman envansyon teknik nouvo ak ki pa evidan." },
      { question: "Kisa yon mak komès pwoteje?", options: ["Yon pwosesis fabrikasyon sekrè", "Yon non oswa yon logo", "Yon zèv literè", "Yon brevè envansyon"], explanation: "Mak komès la pwoteje eleman idantifikasyon distenktif tankou non ak logo." },
      { question: "Ki òganis kanadyen ki jere anrejistreman mak ak brevè?", options: ["OPIC (Biwo pwopriyete entelektyèl Kanada)", "Bank Kanada", "Lapòs Kanada", "Ministè Agrikilti a"], explanation: "OPIC se òganis federal responsab jesyon mak, brevè ak lòt fòm pwopriyete entelektyèl." },
      { question: "Èske tout inovasyon dwe sistematikman brevete selon modil la?", options: ["Wi, toujou obligatwaman", "Non, yon analiz kou-benefis nesesè", "Li entèdi brevete nenpòt bagay", "Sèlman envansyon kanadyen"], explanation: "Kou ak konpleksite brevè a dwe evalye anfas valè estratejik reyèl li pou antrepriz la." },
      { question: "Ki pwoteksyon ki souvan priyorite pou yon jèn antrepriz?", options: ["Brevè sèlman", "Anrejistreman mak la", "Okenn pwoteksyon pa nesesè", "Dwa dotè eksklizivman"], explanation: "Pwoteje mak la (non, logo) souvan pi aksesib ak priyorite pase yon brevè konplèks pou yon jèn antrepriz." },
      { question: "Kisa sekrè komèsyal yo pwoteje?", options: ["Enfòmasyon konfidansyèl ki pa divilge", "Sèlman logo", "Bilding fizik", "Anplwaye yo menm"], explanation: "Sekrè komèsyal pwoteje enfòmasyon estratejik (resèt, pwosede) toutotan yo rete konfidansyèl." },
    ],
  },
  {
    title: "Pwojè final: pitch devan yon jiri",
    objectives: [
      "Sentetize pwojè antreprenarial ou nan yon prezantasyon frapan",
      "Reponn kesyon kritik yon jiri envestisè",
      "Demontre viyabilite ak kredibilite pwojè ou",
    ],
    content: [
      "Pitch final la kondanse pwojè antreprenarial la nan 10 minit maksimòm: pwoblèm, solisyon, mache sib, modèl zafè, traksyon (si aplikab), ekip ak demann finansman oswa patenarya. Chak minit dwe itilize pou kaptire ak kenbe atansyon.",
      "Yon jiri envestisè jeneralman poze kesyon sou gwosè reyèl mache a, defansabilite anfas konkirans lan, itilizasyon prevwa fon yo ak kredibilite ekip la pou egzekite plan yo prezante a.",
      "Preparasyon pou kesyon difisil yo enpòtan menm jan ak pitch la li menm: antisipe objeksyon sou risk, konkirans oswa ipotèz finansye demontre yon konpreyansyon apwofondi pwojè a, pa sèlman yon diskou memorize.",
    ],
    keyTakeaways: [
      "Yon bon pitch kaptire atansyon depi nan premye 30 segond yo",
      "Preparasyon pou kesyon difisil yo konte menm jan ak prezantasyon an li menm",
      "Kredibilite ekip la souvan peze plis pase pèfeksyon plan an",
    ],
    resourceLabels: [
      "Y Combinator — Kijan pou pitch (gid gratis)",
    ],
    quiz: [
      { question: "Ki dire maksimòm tipik yon pitch final selon modil la?", options: ["1 èdtan", "10 minit", "5 segond", "3 jou"], explanation: "Yon pitch efikas dwe kondanse nan 10 minit maksimòm pou rete frapan epi respekte tan jiri a." },
      { question: "Sou kisa yon jiri envestisè jeneralman poze kesyon?", options: ["Koulè logo a sèlman", "Gwosè mache a, konkirans lan, itilizasyon fon yo", "Vakans antreprenè a", "Meteyo lokal la"], explanation: "Eleman sa yo esansyèl pou evalye viyabilite ak potansyèl reyèl pwojè yo prezante a." },
      { question: "Kisa preparasyon pou kesyon difisil yo demontre?", options: ["Anyen enpòtan", "Yon konpreyansyon apwofondi pwojè a", "Yon mank konfyans", "Yon pèt tan initil"], explanation: "Antisipe objeksyon epi reponn yo ak asirans pwouve yon metriz reyèl sijè a, pi lwen pase yon diskou memorize." },
      { question: "Ki eleman ki souvan peze plis pase pèfeksyon plan an selon modil la?", options: ["Kantite paj dokiman an", "Kredibilite ekip la", "Polis karaktè yo itilize a", "Dat kreyasyon antrepriz la"], explanation: "Envestisè yo souvan mize menm jan sou ekip ki kapab egzekite a tankou sou plan an li menm." },
      { question: "Konbyen tan yon bon pitch genyen pou kaptire atansyon selon modil la?", options: ["Premye 30 segond yo", "Sèlman dènye 5 minit yo", "Okenn moman pa kritik", "Tout prezantasyon an egalman"], explanation: "Premye segond yo kritik pou kaptire imedyatman enterè odyans la." },
      { question: "Kisa 'traksyon' yo mansyone nan yon pitch la ye?", options: ["Kalite kawotchou yo itilize", "Prèv konkrè pwogrè oswa adopsyon pwodwi/sèvis la", "Pwa antrepriz la", "Yon tèm san rapò ak antreprenarya"], explanation: "Traksyon deziye endikatè konkrè (vant, itilizatè, patenarya) ki demontre pwojè a reyèlman ap avanse." },
    ],
  },
];

export const entrepreneuriatTranslations: Partial<Record<Lang, CourseTranslation>> = {
  en,
  es,
  it,
  pt,
  de,
  ht,
};
