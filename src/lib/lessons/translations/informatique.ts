import type { Lang } from "@/lib/i18n";
import type { CourseTranslation } from "./types";

const en: CourseTranslation = [
  {
    title: "Introduction to computer systems",
    objectives: [
      "Understand the hardware and software architecture of a system",
      "Distinguish the main operating systems (Windows, Linux, macOS)",
      "Master the basics of computer networking",
    ],
    content: [
      "A computer system combines hardware (processor, memory, storage) and software (operating system, applications). Understanding this basic architecture is essential before tackling more advanced topics like cloud or cybersecurity.",
      "Linux dominates servers and cloud computing thanks to its stability and cost, while Windows remains dominant on corporate workstations. macOS is favored in creative fields and mobile development (iOS).",
      "Computer networks rest on the TCP/IP model: each device has an IP address, data travels in packets, and protocols like HTTP, DNS and DHCP structure communication between machines.",
    ],
    keyTakeaways: [
      "Any advanced IT skill rests on a solid understanding of hardware and the OS",
      "Linux is the foundation of most of the world's cloud infrastructure",
      "Understanding TCP/IP is essential to diagnose network problems",
    ],
    resourceLabels: [
      "Microsoft Learn — IT Fundamentals",
      "Linux Foundation — Free Introduction to Linux",
    ],
    quiz: [
      { question: "Which operating system predominantly dominates servers and the cloud?", options: ["Windows", "Linux", "macOS", "Android"], explanation: "Linux dominates servers and the cloud thanks to its stability, security and cost (often free)." },
      { question: "On which model are modern computer networks based?", options: ["HTML/CSS", "TCP/IP", "USB/HDMI", "RAM/ROM"], explanation: "The TCP/IP model structures communication between devices via IP addresses and the transport of data packets." },
      { question: "Which protocol is responsible for resolving domain names into IP addresses?", options: ["HTTP", "DNS", "FTP", "SMTP"], explanation: "DNS (Domain Name System) translates readable domain names into the IP addresses used by machines." },
      { question: "Which operating system is favored for iOS development?", options: ["Linux", "macOS", "Windows Server", "Chrome OS"], explanation: "macOS is required to develop iOS applications via Xcode, Apple's tool." },
      { question: "What are the two fundamental components of a computer system?", options: ["The internet and the keyboard", "Hardware and software", "The mouse and the screen", "Wi-Fi and Bluetooth"], explanation: "A computer system always combines hardware and software to function." },
      { question: "What carries data on a TCP/IP network?", options: ["Packets", "PDF files only", "Virtual CD-ROMs", "Nothing, everything is instant"], explanation: "Data travels as split packets, routed and then reassembled at the destination." },
    ],
  },
  {
    title: "Cloud computing (AWS, Azure, GCP)",
    objectives: [
      "Differentiate the IaaS, PaaS and SaaS models",
      "Compare the three main cloud providers",
      "Deploy a simple resource on a public cloud",
    ],
    content: [
      "Cloud computing gives on-demand access to computing resources (servers, storage, databases) without owning the physical infrastructure. The three main models are IaaS (raw infrastructure), PaaS (development platform) and SaaS (ready-to-use software).",
      "AWS (Amazon Web Services) dominates the global market with the broadest range of services. Microsoft Azure integrates naturally with companies already in the Microsoft ecosystem. Google Cloud Platform (GCP) stands out for its data and artificial intelligence tools.",
      "In Canada, several providers now offer local data centers (Canada Central for Azure, ca-central-1 for AWS), an important issue for organizations subject to data sovereignty requirements.",
    ],
    keyTakeaways: [
      "The choice of cloud provider depends on the existing ecosystem and the team's skills",
      "Usage-based billing requires constant cost monitoring",
      "Data residency is an important regulatory issue in Canada",
    ],
    resourceLabels: [
      "AWS Skill Builder — Free training",
      "Microsoft Learn — Azure Fundamentals",
    ],
    quiz: [
      { question: "What does IaaS mean in the context of cloud computing?", options: ["Infrastructure as a Service", "Internet as a Solution", "Identity as a System", "Integration as a Standard"], explanation: "IaaS (Infrastructure as a Service) provides raw resources like virtual servers without platform management." },
      { question: "Which cloud provider dominates the global market according to the module?", options: ["Google Cloud Platform", "AWS", "IBM Cloud", "Oracle Cloud"], explanation: "AWS (Amazon Web Services) is described as the global leader with the broadest range of services." },
      { question: "What does Google Cloud Platform (GCP) particularly stand out for?", options: ["Video games", "Data and artificial intelligence tools", "Retail", "Printing"], explanation: "GCP is recognized for its advanced data analytics and artificial intelligence tools." },
      { question: "Which cloud model provides ready-to-use software with no technical management?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], explanation: "SaaS (Software as a Service) delivers a complete ready-to-use application, like Gmail or Microsoft 365." },
      { question: "Why is data residency an important issue in Canada?", options: ["For aesthetic reasons", "For regulatory data sovereignty requirements", "Because the cloud doesn't exist in Canada", "It isn't a real issue"], explanation: "Some organizations must guarantee that their data stays hosted in Canadian data centers for legal reasons." },
      { question: "What type of billing is typical of cloud computing?", options: ["One-time lifetime payment", "Usage-based billing", "Free forever", "Only a mandatory annual subscription"], explanation: "Usage-based billing (pay-as-you-go) is the standard cloud model, requiring cost monitoring." },
    ],
  },
  {
    title: "Artificial intelligence & machine learning",
    objectives: [
      "Understand the difference between AI, machine learning and deep learning",
      "Identify concrete AI use cases in business",
      "Use generative AI tools in a professional context",
    ],
    content: [
      "Artificial intelligence is the general field aiming to reproduce intelligent behaviors with a machine. Machine learning is a subcategory where the system learns from data rather than being explicitly programmed. Deep learning uses neural networks to process complex data such as images or language.",
      "In business, AI is used for customer service automation (chatbots), demand forecasting, fraud detection and marketing personalization. Generative AI tools like ChatGPT or Copilot transform productivity in writing, code and analysis.",
      "Responsible AI adoption requires understanding its limits: bias in training data, hallucinations in generative models, and ethical issues related to automated decision-making.",
    ],
    keyTakeaways: [
      "Generative AI is a productivity tool, not a replacement for human judgment",
      "Understanding AI's limits is as important as knowing its capabilities",
      "The most profitable use cases are often repetitive, low-risk tasks",
    ],
    resourceLabels: [
      "Google AI — Machine Learning crash course",
      "Microsoft Learn — Generative AI for professionals",
    ],
    quiz: [
      { question: "What is the relationship between AI, machine learning and deep learning?", options: ["They are three completely separate fields", "Machine learning is a subcategory of AI, and deep learning a subcategory of machine learning", "Deep learning encompasses AI", "There is no difference between these terms"], explanation: "AI is the general field, machine learning is a subcategory of it, and deep learning is a specific technique of machine learning." },
      { question: "What is a 'hallucination' in a generative AI model?", options: ["A visual bug on the screen", "False information generated confidently by the model", "A computer virus", "A disabled feature"], explanation: "A hallucination is incorrect or invented information that the model presents as true." },
      { question: "What is one of the business AI use cases mentioned in the module?", options: ["Fraud detection", "Furniture manufacturing", "Office cleaning", "Postal delivery only"], explanation: "Fraud detection is a common AI use case, particularly in the financial sector." },
      { question: "Generative AI should be considered as:", options: ["A total replacement for human judgment", "A productivity tool complementary to human judgment", "A technology with no limits", "Useless in business"], explanation: "Generative AI is presented as a tool to boost productivity, not to replace human discernment." },
      { question: "What can cause bias in an AI system?", options: ["The screen color", "The training data used", "The number of users", "The software price"], explanation: "Bias in training data is directly reflected in the AI model's predictions and results." },
      { question: "Which type of task is often the most profitable to automate with AI?", options: ["Only complex strategic decisions", "Repetitive, low-risk tasks", "Only creative tasks", "No task should be automated"], explanation: "Repetitive, low-risk tasks offer the best return on investment for AI automation." },
    ],
  },
  {
    title: "Cybersecurity & data protection",
    objectives: [
      "Identify the main IT threats (phishing, ransomware)",
      "Apply basic security best practices",
      "Understand Canadian legal obligations regarding data",
    ],
    content: [
      "Phishing remains the most common attack vector, exploiting human error rather than a technical flaw. Ransomware encrypts an organization's data and demands a ransom — its impact can be catastrophic without recent, tested backups.",
      "Basic best practices include two-factor authentication (2FA), unique and complex passwords managed via a password manager, regular system updates and regular backups following the 3-2-1 rule (3 copies, 2 different media, 1 off-site).",
      "In Canada, the Personal Information Protection and Electronic Documents Act (PIPEDA) and Law 25 in Quebec impose strict obligations on the collection, storage and breach notification of personal data.",
    ],
    keyTakeaways: [
      "Human error remains the number one cause of security incidents",
      "An untested backup is not real protection",
      "Compliance with Law 25 and PIPEDA is mandatory, not optional, for any Canadian organization",
    ],
    resourceLabels: [
      "Canadian Centre for Cyber Security",
      "CAI / Law 25 — Quebec compliance guide",
    ],
    quiz: [
      { question: "What is the most common attack vector according to the module?", options: ["Phishing", "Physical attack on the server", "Power outage", "Hardware theft only"], explanation: "Phishing exploits human error and remains statistically the most frequent attack vector." },
      { question: "What does ransomware do?", options: ["It speeds up the computer", "It encrypts data and demands a ransom", "It improves security", "It removes existing viruses"], explanation: "Ransomware encrypts the victim's data and demands a payment to decrypt it." },
      { question: "What does the 3-2-1 backup rule mean?", options: ["3 passwords, 2 emails, 1 account", "3 copies, 2 different media, 1 off-site copy", "3 hours, 2 days, 1 week", "No particular meaning"], explanation: "The 3-2-1 rule ensures data resilience: 3 copies on 2 different media, one of which is kept off-site." },
      { question: "Which Quebec law governs the protection of personal information?", options: ["Law 25", "The Criminal Code only", "The Patent Act", "The Tobacco Act"], explanation: "Law 25 imposes strict obligations in Quebec regarding the collection and protection of personal data." },
      { question: "What is two-factor authentication (2FA)?", options: ["Using two computers", "An extra security layer combining two verification methods", "Having two identical passwords", "An obsolete feature"], explanation: "2FA adds a second verification (e.g. an SMS code) on top of the password to strengthen access security." },
      { question: "Why is an untested backup not real protection?", options: ["Because it takes up too much space", "Because you don't know if it can actually be restored when needed", "Because backups are illegal", "It's never a problem"], explanation: "A backup must be tested regularly to guarantee it will actually work during an emergency restore." },
    ],
  },
  {
    title: "Database management",
    objectives: [
      "Differentiate relational and NoSQL databases",
      "Write basic SQL queries",
      "Understand the principles of data normalization",
    ],
    content: [
      "Relational databases (MySQL, PostgreSQL, SQL Server) organize data into tables linked by keys, ensuring consistency through strict constraints. NoSQL databases (MongoDB, Firebase) offer more flexibility for unstructured or very large-scale data.",
      "The SQL language (Structured Query Language) allows you to query, insert, modify and delete data. The basic commands — SELECT, INSERT, UPDATE, DELETE, JOIN — cover most of the daily needs of an analyst or developer.",
      "Data normalization aims to eliminate redundancy and ensure referential integrity. A well-designed database simplifies maintenance, improves performance and reduces the risk of inconsistency between data.",
    ],
    keyTakeaways: [
      "The relational vs NoSQL choice depends on the data structure and the project scale",
      "SQL remains the most transferable skill across all technical jobs",
      "A poorly normalized database creates consistency problems that worsen over time",
    ],
    resourceLabels: [
      "Official PostgreSQL Tutorial",
      "SQLBolt — Learn SQL interactively",
    ],
    quiz: [
      { question: "Which SQL command retrieves data from a table?", options: ["GET", "SELECT", "FETCH", "PULL"], explanation: "SELECT is the fundamental SQL command to query and retrieve data from one or more tables." },
      { question: "What type of database is MongoDB?", options: ["Relational", "NoSQL", "Text file", "Spreadsheet"], explanation: "MongoDB is a document-oriented NoSQL database, offering flexibility for unstructured data." },
      { question: "What is the main goal of data normalization?", options: ["To slow down queries", "To eliminate redundancy and ensure referential integrity", "To needlessly increase the number of tables", "To remove all relationships between tables"], explanation: "Normalization structures data to avoid duplication and maintain consistency between tables." },
      { question: "Which SQL command is used to insert new data?", options: ["ADD", "INSERT", "NEW", "CREATE ROW"], explanation: "INSERT is the command used to add new rows of data into a table." },
      { question: "Why is SQL considered a highly transferable skill?", options: ["Because it's only used in a single software", "Because it's used in most technical jobs involving data", "Because it's obsolete", "Because it replaces all other languages"], explanation: "SQL is widely used across many technical roles (analyst, developer, data scientist), making it a highly sought-after skill." },
      { question: "What does a foreign key allow in a relational database?", options: ["To delete a table", "To link one table to another and ensure referential integrity", "To encrypt data", "To increase internet speed"], explanation: "A foreign key establishes a relationship between two tables and ensures the consistency of linked data." },
    ],
  },
  {
    title: "Web & application development",
    objectives: [
      "Understand the difference between front-end and back-end",
      "Identify common languages and frameworks",
      "Follow the lifecycle of a simple web application",
    ],
    content: [
      "The front-end concerns everything the user sees and interacts with directly: HTML for structure, CSS for style, JavaScript for interactivity, with frameworks like React or Vue.js. The back-end handles server logic, databases and APIs, with languages like Node.js, Python or Java.",
      "A modern web application generally follows a client-server architecture: the browser (client) sends requests to a server that handles business logic and returns data, often in JSON format via a REST API.",
      "The development cycle includes design, coding, testing, deployment and maintenance. Agile methodologies allow features to be delivered in small iterations rather than in a single final block.",
    ],
    keyTakeaways: [
      "Front-end and back-end are complementary, not interchangeable",
      "A well-designed API is the key to a maintainable web architecture",
      "Continuous deployment reduces the risks of production releases",
    ],
    resourceLabels: [
      "MDN Web Docs — Web development reference",
      "freeCodeCamp — Free web development curriculum",
    ],
    quiz: [
      { question: "Which language is used to structure the content of a web page?", options: ["CSS", "HTML", "JavaScript", "SQL"], explanation: "HTML (HyperText Markup Language) defines the structure and content of a web page." },
      { question: "What does the back-end of a web application mainly handle?", options: ["The visual style", "Server logic, databases and APIs", "Only images", "CSS animations"], explanation: "The back-end handles the server-side business logic, manages data and exposes APIs for the front-end." },
      { question: "Which format is commonly used to exchange data via a REST API?", options: ["JSON", "MP3", "PDF", "EXE"], explanation: "JSON (JavaScript Object Notation) is the standard lightweight format for exchanging data between client and server." },
      { question: "Which architecture is typical of a modern web application?", options: ["Client-server", "Peer-to-peer only", "No defined architecture", "1970s centralized mainframe"], explanation: "The client-server architecture separates the browser (client) from the server that handles requests and logic." },
      { question: "What is the advantage of agile methodologies in web development?", options: ["Delivering everything in a single final block", "Delivering features in small iterations", "Avoiding testing entirely", "Working with no planning at all"], explanation: "Agility allows progressive delivery, adaptation to feedback and reduced risk of large monolithic projects." },
      { question: "Which of these is a front-end framework mentioned in the module?", options: ["React", "MySQL", "Docker", "Linux"], explanation: "React is a JavaScript framework used to build user interfaces on the front-end." },
    ],
  },
  {
    title: "IT project management (Agile/Scrum)",
    objectives: [
      "Understand the principles of the agile manifesto",
      "Master Scrum roles and rituals",
      "Use an agile project management tool (Jira, Trello)",
    ],
    content: [
      "The agile manifesto favors collaboration, adaptability and iterative delivery over rigid planning and exhaustive documentation. This approach better meets the changing needs of modern technology projects.",
      "Scrum structures work into sprints (generally 2 weeks) with defined roles: the Product Owner prioritizes needs, the Scrum Master facilitates the process, and the development team delivers the features. The key rituals are sprint planning, the daily standup, the sprint review and the retrospective.",
      "Tools like Jira, Trello or Azure DevOps allow you to visualize the backlog, track progress via Kanban boards and measure the team's velocity across sprints.",
    ],
    keyTakeaways: [
      "Agility is a philosophy of collaboration, not just a set of tools",
      "Scrum rituals serve to maintain transparency, not to create bureaucracy",
      "The retrospective is the most often neglected but most valuable ritual for improving",
    ],
    resourceLabels: [
      "Scrum.org — Official Scrum Guide (free)",
      "Atlassian Agile Coach",
    ],
    quiz: [
      { question: "Which role prioritizes needs in a Scrum team?", options: ["The Scrum Master", "The Product Owner", "The senior developer", "The end client only"], explanation: "The Product Owner is responsible for prioritizing the backlog and representing business needs." },
      { question: "What is the typical duration of a Scrum sprint?", options: ["1 day", "2 weeks", "6 months", "1 year"], explanation: "A sprint generally lasts 2 weeks, although this can vary between 1 and 4 weeks depending on the team." },
      { question: "What does the agile manifesto favor over exhaustive documentation?", options: ["Even more documentation", "Collaboration and adaptability", "The total absence of communication", "Working in isolation"], explanation: "The agile manifesto values individuals, interactions and adaptability over rigid documentation." },
      { question: "Which Scrum ritual is often neglected but particularly valuable according to the module?", options: ["The daily standup", "The retrospective", "The sprint planning", "The coffee break"], explanation: "The retrospective, which lets the team improve continuously, is often underestimated despite its great value." },
      { question: "Which tool is mentioned to visualize a Kanban backlog?", options: ["Photoshop", "Trello", "Excel only", "PowerPoint"], explanation: "Trello is a popular tool offering Kanban boards to visualize and track task progress." },
      { question: "What is the role of the Scrum Master?", options: ["To code all the features alone", "To facilitate the Scrum process for the team", "To decide the budget alone", "To replace the client"], explanation: "The Scrum Master facilitates the rituals and removes obstacles so the team can work effectively." },
    ],
  },
  {
    title: "Final project: enterprise digital transformation",
    objectives: [
      "Audit an organization's technological needs",
      "Propose a realistic digital transformation plan",
      "Present a technical and budgetary roadmap",
    ],
    content: [
      "The final project requires analyzing an organization (real or fictional) and identifying digitalization opportunities: automating manual processes, migrating to the cloud, adopting collaborative tools or integrating AI to gain efficiency.",
      "The roadmap must prioritize initiatives by impact and complexity, with a realistic timeline and an estimated budget. The most successful transformations start with quick wins before tackling deeper structural changes.",
      "Change management is as important as the technology itself: involving the teams concerned, training users and communicating concrete benefits often determine the success or failure of a digital transformation.",
    ],
    keyTakeaways: [
      "A successful digital transformation starts with business needs, not with technology",
      "Prioritizing quick wins builds confidence for more ambitious changes",
      "Human resistance to change is often the biggest obstacle, not the technical side",
    ],
    resourceLabels: [
      "MIT Sloan — Digital transformation research",
    ],
    quiz: [
      { question: "What must a successful digital transformation start with?", options: ["Buying the most expensive technology", "Business needs", "Laying off staff", "Only hiring an external consultant"], explanation: "An effective digital transformation always starts from the organization's real needs, not from the technology itself." },
      { question: "What does a 'quick win' mean in a transformation roadmap?", options: ["A quick failure", "A fast, visible gain that builds confidence", "A very long-term investment", "An acceptable financial loss"], explanation: "Quick wins are fast, tangible results that demonstrate the value of the transformation and ease buy-in." },
      { question: "What is often the biggest obstacle to a digital transformation?", options: ["The lack of Wi-Fi", "Human resistance to change", "The price of computers", "The weather"], explanation: "Human resistance to change is generally a bigger obstacle than purely technical challenges." },
      { question: "What must a digital transformation roadmap include?", options: ["Only a list of software", "A realistic timeline and an estimated budget", "No time planning", "Only verbal promises"], explanation: "A serious roadmap prioritizes initiatives with a clear timeline and budget." },
      { question: "Why is user training crucial in a digital transformation?", options: ["It isn't necessary", "Because adoption of new tools depends on users' understanding", "Only to comply with a law", "Because it's free"], explanation: "Without adequate training, even the best technological tools fail for lack of user adoption." },
      { question: "Which type of initiative is recommended before tackling deep structural changes?", options: ["Immediate radical changes", "Quick wins", "No prior action", "Laying off the IT team"], explanation: "Starting with quick wins creates the confidence needed before undertaking more complex transformations." },
    ],
  },
];

const es: CourseTranslation = [
  {
    title: "Introducción a los sistemas informáticos",
    objectives: [
      "Comprender la arquitectura de hardware y software de un sistema",
      "Distinguir los principales sistemas operativos (Windows, Linux, macOS)",
      "Dominar las bases de la red informática",
    ],
    content: [
      "Un sistema informático combina hardware (procesador, memoria, almacenamiento) y software (sistema operativo, aplicaciones). Comprender esta arquitectura básica es esencial antes de abordar temas más avanzados como la nube o la ciberseguridad.",
      "Linux domina los servidores y la computación en la nube gracias a su estabilidad y su costo, mientras que Windows sigue siendo dominante en los puestos de trabajo empresariales. macOS es privilegiado en los ámbitos creativos y el desarrollo móvil (iOS).",
      "Las redes informáticas se basan en el modelo TCP/IP: cada dispositivo posee una dirección IP, los datos circulan por paquetes, y protocolos como HTTP, DNS y DHCP estructuran la comunicación entre máquinas.",
    ],
    keyTakeaways: [
      "Toda competencia avanzada en TI se basa en una comprensión sólida del hardware y del sistema operativo",
      "Linux es la base de la mayoría de la infraestructura de nube mundial",
      "Comprender TCP/IP es indispensable para diagnosticar problemas de red",
    ],
    resourceLabels: [
      "Microsoft Learn — Fundamentos de TI",
      "Linux Foundation — Introducción gratuita a Linux",
    ],
    quiz: [
      { question: "¿Qué sistema operativo domina mayoritariamente los servidores y la nube?", options: ["Windows", "Linux", "macOS", "Android"], explanation: "Linux es dominante en los servidores y la nube gracias a su estabilidad, su seguridad y su costo (a menudo gratuito)." },
      { question: "¿En qué modelo se basan las redes informáticas modernas?", options: ["HTML/CSS", "TCP/IP", "USB/HDMI", "RAM/ROM"], explanation: "El modelo TCP/IP estructura la comunicación entre dispositivos mediante direcciones IP y el transporte de paquetes de datos." },
      { question: "¿Qué protocolo es responsable de la resolución de los nombres de dominio en direcciones IP?", options: ["HTTP", "DNS", "FTP", "SMTP"], explanation: "El DNS (Domain Name System) traduce los nombres de dominio legibles en direcciones IP utilizadas por las máquinas." },
      { question: "¿Qué sistema operativo es privilegiado para el desarrollo de iOS?", options: ["Linux", "macOS", "Windows Server", "Chrome OS"], explanation: "macOS es necesario para desarrollar aplicaciones iOS mediante Xcode, la herramienta de Apple." },
      { question: "¿Cuáles son los dos componentes fundamentales de un sistema informático?", options: ["Internet y el teclado", "El hardware y el software", "El ratón y la pantalla", "El wifi y el bluetooth"], explanation: "Un sistema informático combina siempre el hardware y el software para funcionar." },
      { question: "¿Qué transportan los datos en una red TCP/IP?", options: ["Paquetes", "Solo archivos PDF", "CD-ROM virtuales", "Nada, todo es instantáneo"], explanation: "Los datos circulan en forma de paquetes divididos, encaminados y luego reconstituidos en el destino." },
    ],
  },
  {
    title: "Computación en la nube (AWS, Azure, GCP)",
    objectives: [
      "Diferenciar los modelos IaaS, PaaS y SaaS",
      "Comparar los tres principales proveedores de nube",
      "Desplegar un recurso simple en una nube pública",
    ],
    content: [
      "La computación en la nube permite acceder a recursos informáticos (servidores, almacenamiento, bases de datos) bajo demanda, sin poseer la infraestructura física. Los tres modelos principales son el IaaS (infraestructura bruta), el PaaS (plataforma de desarrollo) y el SaaS (software listo para usar).",
      "AWS (Amazon Web Services) domina el mercado mundial con la gama de servicios más amplia. Microsoft Azure se integra naturalmente en las empresas ya bajo el ecosistema Microsoft. Google Cloud Platform (GCP) se distingue por sus herramientas de datos y de inteligencia artificial.",
      "En Canadá, varios proveedores ofrecen ahora centros de datos locales (Canada Central para Azure, ca-central-1 para AWS), un asunto importante para las organizaciones sujetas a exigencias de soberanía de los datos.",
    ],
    keyTakeaways: [
      "La elección del proveedor de nube depende del ecosistema existente y de las competencias del equipo",
      "La facturación por uso exige una vigilancia constante de los costos",
      "La residencia de los datos es un asunto regulatorio importante en Canadá",
    ],
    resourceLabels: [
      "AWS Skill Builder — Formación gratuita",
      "Microsoft Learn — Azure Fundamentals",
    ],
    quiz: [
      { question: "¿Qué significa IaaS en el contexto de la computación en la nube?", options: ["Infrastructure as a Service", "Internet as a Solution", "Identity as a System", "Integration as a Standard"], explanation: "IaaS (Infrastructure as a Service) proporciona recursos brutos como servidores virtuales sin gestión de plataforma." },
      { question: "¿Qué proveedor de nube domina el mercado mundial según el módulo?", options: ["Google Cloud Platform", "AWS", "IBM Cloud", "Oracle Cloud"], explanation: "AWS (Amazon Web Services) se describe como el líder mundial con la gama de servicios más amplia." },
      { question: "¿Por qué se distingue particularmente Google Cloud Platform (GCP)?", options: ["Los videojuegos", "Las herramientas de datos y de inteligencia artificial", "La venta al por menor", "La imprenta"], explanation: "GCP es reconocido por sus herramientas avanzadas de análisis de datos e inteligencia artificial." },
      { question: "¿Qué modelo de nube proporciona un software listo para usar sin gestión técnica?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], explanation: "El SaaS (Software as a Service) entrega una aplicación completa lista para usar, como Gmail o Microsoft 365." },
      { question: "¿Por qué la residencia de los datos es un asunto importante en Canadá?", options: ["Por razones estéticas", "Por exigencias regulatorias de soberanía de los datos", "Porque la nube no existe en Canadá", "No es un asunto real"], explanation: "Algunas organizaciones deben garantizar que sus datos permanezcan alojados en centros de datos canadienses por razones legales." },
      { question: "¿Qué tipo de facturación es típico de la computación en la nube?", options: ["Pago único de por vida", "Facturación por uso", "Gratuito para siempre", "Solo suscripción anual obligatoria"], explanation: "La facturación por uso (pay-as-you-go) es el modelo estándar de la nube, que requiere una vigilancia de los costos." },
    ],
  },
  {
    title: "Inteligencia artificial y machine learning",
    objectives: [
      "Comprender la diferencia entre IA, machine learning y deep learning",
      "Identificar casos de uso concretos de la IA en la empresa",
      "Utilizar herramientas de IA generativa en un contexto profesional",
    ],
    content: [
      "La inteligencia artificial es el ámbito general que busca reproducir comportamientos inteligentes mediante una máquina. El machine learning es una subcategoría donde el sistema aprende a partir de datos en lugar de ser programado explícitamente. El deep learning utiliza redes de neuronas para procesar datos complejos como las imágenes o el lenguaje.",
      "En la empresa, la IA se utiliza para la automatización del servicio al cliente (chatbots), la previsión de la demanda, la detección de fraude y la personalización del marketing. Las herramientas de IA generativa como ChatGPT o Copilot transforman la productividad en la redacción, el código y el análisis.",
      "La adopción responsable de la IA requiere comprender sus límites: sesgos en los datos de entrenamiento, alucinaciones en los modelos generativos, y cuestiones éticas ligadas a la toma de decisiones automatizada.",
    ],
    keyTakeaways: [
      "La IA generativa es una herramienta de productividad, no un reemplazo del juicio humano",
      "Comprender los límites de la IA es tan importante como conocer sus capacidades",
      "Los casos de uso más rentables son a menudo las tareas repetitivas de bajo riesgo",
    ],
    resourceLabels: [
      "Google AI — Curso de introducción al machine learning",
      "Microsoft Learn — IA generativa para profesionales",
    ],
    quiz: [
      { question: "¿Cuál es la relación entre la IA, el machine learning y el deep learning?", options: ["Son tres ámbitos totalmente separados", "El machine learning es una subcategoría de la IA, y el deep learning una subcategoría del machine learning", "El deep learning engloba la IA", "No hay ninguna diferencia entre estos términos"], explanation: "La IA es el ámbito general, el machine learning es una subcategoría de ella, y el deep learning una técnica específica del machine learning." },
      { question: "¿Qué es una 'alucinación' en un modelo de IA generativa?", options: ["Un fallo visual en la pantalla", "Una información falsa generada con seguridad por el modelo", "Un virus informático", "Una funcionalidad desactivada"], explanation: "Una alucinación corresponde a una información incorrecta o inventada que el modelo presenta como verdadera." },
      { question: "¿Cuál es uno de los casos de uso de la IA en la empresa mencionado en el módulo?", options: ["La detección de fraude", "La fabricación de muebles", "La limpieza de las oficinas", "Solo la entrega postal"], explanation: "La detección de fraude es un caso de uso común de la IA, especialmente en el sector financiero." },
      { question: "La IA generativa debe considerarse como:", options: ["Un reemplazo total del juicio humano", "Una herramienta de productividad complementaria al juicio humano", "Una tecnología sin ningún límite", "Inútil en la empresa"], explanation: "La IA generativa se presenta como una herramienta para aumentar la productividad, no para reemplazar el discernimiento humano." },
      { question: "¿Qué puede causar sesgos en un sistema de IA?", options: ["El color de la pantalla", "Los datos de entrenamiento utilizados", "El número de usuarios", "El precio del software"], explanation: "Los sesgos en los datos de entrenamiento se reflejan directamente en las predicciones y resultados del modelo de IA." },
      { question: "¿Qué tipo de tarea es a menudo la más rentable de automatizar con la IA?", options: ["Solo las decisiones estratégicas complejas", "Las tareas repetitivas de bajo riesgo", "Solo las tareas creativas", "Ninguna tarea debería automatizarse"], explanation: "Las tareas repetitivas y de bajo riesgo ofrecen el mejor retorno de la inversión para la automatización por IA." },
    ],
  },
  {
    title: "Ciberseguridad y protección de datos",
    objectives: [
      "Identificar las principales amenazas informáticas (phishing, ransomware)",
      "Aplicar las buenas prácticas de seguridad de base",
      "Comprender las obligaciones legales canadienses en materia de datos",
    ],
    content: [
      "El phishing sigue siendo el vector de ataque más común, explotando el error humano en lugar de una falla técnica. Los ransomware cifran los datos de una organización y exigen un rescate — su impacto puede ser catastrófico sin copias de seguridad recientes y probadas.",
      "Las buenas prácticas de base incluyen la autenticación de dos factores (2FA), contraseñas únicas y complejas gestionadas mediante un gestor de contraseñas, actualizaciones regulares de los sistemas y una copia de seguridad regular según la regla 3-2-1 (3 copias, 2 soportes diferentes, 1 fuera del sitio).",
      "En Canadá, la Ley de protección de la información personal y los documentos electrónicos (PIPEDA) y la Ley 25 en Quebec imponen obligaciones estrictas sobre la recopilación, el almacenamiento y la notificación en caso de fuga de datos personales.",
    ],
    keyTakeaways: [
      "El error humano sigue siendo la causa número uno de los incidentes de seguridad",
      "Una copia de seguridad no probada no es una verdadera protección",
      "El cumplimiento de la Ley 25 y de la PIPEDA es obligatorio, no opcional, para toda organización canadiense",
    ],
    resourceLabels: [
      "Centro canadiense para la ciberseguridad",
      "CAI / Ley 25 — Guía de cumplimiento Quebec",
    ],
    quiz: [
      { question: "¿Cuál es el vector de ataque más común según el módulo?", options: ["El phishing", "El ataque físico del servidor", "El corte de electricidad", "Solo el robo de material"], explanation: "El phishing explota el error humano y sigue siendo estadísticamente el vector de ataque más frecuente." },
      { question: "¿Qué hace un ransomware?", options: ["Acelera la computadora", "Cifra los datos y exige un rescate", "Mejora la seguridad", "Elimina los virus existentes"], explanation: "Un ransomware cifra los datos de la víctima y exige un pago para descifrarlos." },
      { question: "¿Qué significa la regla de copia de seguridad 3-2-1?", options: ["3 contraseñas, 2 correos, 1 cuenta", "3 copias, 2 soportes diferentes, 1 copia fuera del sitio", "3 horas, 2 días, 1 semana", "Ningún significado particular"], explanation: "La regla 3-2-1 garantiza una resiliencia de los datos: 3 copias en 2 soportes diferentes, de las cuales 1 se conserva fuera del sitio." },
      { question: "¿Qué ley quebequense regula la protección de la información personal?", options: ["La Ley 25", "Solo el Código Penal", "La Ley de patentes", "La Ley del tabaco"], explanation: "La Ley 25 impone obligaciones estrictas en Quebec en cuanto a la recopilación y la protección de los datos personales." },
      { question: "¿Qué es la autenticación de dos factores (2FA)?", options: ["Utilizar dos computadoras", "Una capa de seguridad adicional que combina dos métodos de verificación", "Tener dos contraseñas idénticas", "Una funcionalidad obsoleta"], explanation: "La 2FA añade una segunda verificación (ej. código SMS) además de la contraseña para reforzar la seguridad de acceso." },
      { question: "¿Por qué una copia de seguridad no probada no es una verdadera protección?", options: ["Porque ocupa demasiado espacio", "Porque no se sabe si podrá realmente restaurarse en caso de necesidad", "Porque las copias de seguridad son ilegales", "Nunca es un problema"], explanation: "Una copia de seguridad debe probarse regularmente para garantizar que funcionará realmente durante una restauración de emergencia." },
    ],
  },
  {
    title: "Gestión de bases de datos",
    objectives: [
      "Diferenciar bases de datos relacionales y NoSQL",
      "Escribir consultas SQL de base",
      "Comprender los principios de normalización de los datos",
    ],
    content: [
      "Las bases de datos relacionales (MySQL, PostgreSQL, SQL Server) organizan los datos en tablas ligadas por claves, garantizando la coherencia mediante restricciones estrictas. Las bases NoSQL (MongoDB, Firebase) ofrecen más flexibilidad para datos no estructurados o a muy gran escala.",
      "El lenguaje SQL (Structured Query Language) permite consultar, insertar, modificar y eliminar datos. Los comandos de base — SELECT, INSERT, UPDATE, DELETE, JOIN — cubren la mayoría de las necesidades diarias de un analista o desarrollador.",
      "La normalización de los datos busca eliminar la redundancia y garantizar la integridad referencial. Una base bien diseñada facilita el mantenimiento, mejora el rendimiento y reduce los riesgos de incoherencia entre los datos.",
    ],
    keyTakeaways: [
      "La elección relacional vs NoSQL depende de la estructura de los datos y de la escala del proyecto",
      "SQL sigue siendo la competencia más transferible entre todos los empleos técnicos",
      "Una base mal normalizada crea problemas de coherencia que se agravan con el tiempo",
    ],
    resourceLabels: [
      "PostgreSQL Tutorial oficial",
      "SQLBolt — Aprender SQL interactivamente",
    ],
    quiz: [
      { question: "¿Qué comando SQL permite recuperar datos en una tabla?", options: ["GET", "SELECT", "FETCH", "PULL"], explanation: "SELECT es el comando SQL fundamental para consultar y recuperar datos de una o varias tablas." },
      { question: "¿Qué tipo de base de datos es MongoDB?", options: ["Relacional", "NoSQL", "Archivo de texto", "Hoja de cálculo"], explanation: "MongoDB es una base de datos NoSQL orientada a documentos, que ofrece flexibilidad para datos no estructurados." },
      { question: "¿Cuál es el objetivo principal de la normalización de los datos?", options: ["Ralentizar las consultas", "Eliminar la redundancia y garantizar la integridad referencial", "Aumentar el número de tablas inútilmente", "Eliminar todas las relaciones entre tablas"], explanation: "La normalización estructura los datos para evitar la duplicación y mantener la coherencia entre las tablas." },
      { question: "¿Qué comando SQL sirve para insertar nuevos datos?", options: ["ADD", "INSERT", "NEW", "CREATE ROW"], explanation: "INSERT es el comando utilizado para añadir nuevas filas de datos en una tabla." },
      { question: "¿Por qué se considera SQL una competencia muy transferible?", options: ["Porque solo se usa en un único software", "Porque se usa en la mayoría de los empleos técnicos que implican datos", "Porque está obsoleto", "Porque reemplaza todos los demás lenguajes"], explanation: "SQL se usa ampliamente en numerosos roles técnicos (analista, desarrollador, data scientist), lo que lo convierte en una competencia muy demandada." },
      { question: "¿Qué permite una clave foránea en una base relacional?", options: ["Eliminar una tabla", "Ligar una tabla a otra y garantizar la integridad referencial", "Cifrar los datos", "Aumentar la velocidad de internet"], explanation: "Una clave foránea establece una relación entre dos tablas y asegura la coherencia de los datos ligados." },
    ],
  },
  {
    title: "Desarrollo web y aplicaciones",
    objectives: [
      "Comprender la diferencia entre front-end y back-end",
      "Identificar los lenguajes y frameworks comunes",
      "Seguir el ciclo de vida de una aplicación web simple",
    ],
    content: [
      "El front-end concierne todo lo que el usuario ve y manipula directamente: HTML para la estructura, CSS para el estilo, JavaScript para la interactividad, con frameworks como React o Vue.js. El back-end gestiona la lógica del servidor, las bases de datos y las API, con lenguajes como Node.js, Python o Java.",
      "Una aplicación web moderna sigue generalmente una arquitectura cliente-servidor: el navegador (cliente) envía solicitudes a un servidor que procesa la lógica de negocio y devuelve datos, a menudo en formato JSON mediante una API REST.",
      "El ciclo de desarrollo incluye el diseño, la codificación, las pruebas, el despliegue y el mantenimiento. Las metodologías ágiles permiten entregar funcionalidades por pequeñas iteraciones en lugar de en un solo bloque final.",
    ],
    keyTakeaways: [
      "Front-end y back-end son complementarios, no intercambiables",
      "Una API bien diseñada es la clave de una arquitectura web mantenible",
      "El despliegue continuo reduce los riesgos ligados a las puestas en producción",
    ],
    resourceLabels: [
      "MDN Web Docs — Referencia de desarrollo web",
      "freeCodeCamp — Currículo de desarrollo web gratuito",
    ],
    quiz: [
      { question: "¿Qué lenguaje se utiliza para estructurar el contenido de una página web?", options: ["CSS", "HTML", "JavaScript", "SQL"], explanation: "HTML (HyperText Markup Language) define la estructura y el contenido de una página web." },
      { question: "¿Qué gestiona principalmente el back-end de una aplicación web?", options: ["El estilo visual", "La lógica del servidor, las bases de datos y las API", "Únicamente las imágenes", "Las animaciones CSS"], explanation: "El back-end procesa la lógica de negocio del lado del servidor, gestiona los datos y expone API para el front-end." },
      { question: "¿Qué formato se utiliza comúnmente para intercambiar datos mediante una API REST?", options: ["JSON", "MP3", "PDF", "EXE"], explanation: "JSON (JavaScript Object Notation) es el formato estándar ligero para el intercambio de datos entre cliente y servidor." },
      { question: "¿Qué arquitectura es típica de una aplicación web moderna?", options: ["Cliente-servidor", "Solo par a par", "Ninguna arquitectura definida", "Mainframe centralizado de los años 1970"], explanation: "La arquitectura cliente-servidor separa el navegador (cliente) del servidor que procesa las solicitudes y la lógica." },
      { question: "¿Cuál es la ventaja de las metodologías ágiles en el desarrollo web?", options: ["Entregar todo en un solo bloque final", "Entregar funcionalidades por pequeñas iteraciones", "Evitar completamente las pruebas", "Trabajar sin ninguna planificación"], explanation: "La agilidad permite entregar progresivamente, adaptarse a los comentarios y reducir los riesgos de grandes proyectos monolíticos." },
      { question: "¿Cuál de estos elementos es un framework front-end mencionado en el módulo?", options: ["React", "MySQL", "Docker", "Linux"], explanation: "React es un framework JavaScript utilizado para construir interfaces de usuario del lado front-end." },
    ],
  },
  {
    title: "Gestión de proyectos TI (Agile/Scrum)",
    objectives: [
      "Comprender los principios del manifiesto ágil",
      "Dominar los roles y rituales Scrum",
      "Utilizar una herramienta de gestión de proyectos ágil (Jira, Trello)",
    ],
    content: [
      "El manifiesto ágil privilegia la colaboración, la adaptabilidad y la entrega iterativa en lugar de la planificación rígida y la documentación exhaustiva. Este enfoque responde mejor a las necesidades cambiantes de los proyectos tecnológicos modernos.",
      "Scrum estructura el trabajo en sprints (generalmente 2 semanas) con roles definidos: el Product Owner prioriza las necesidades, el Scrum Master facilita el proceso, y el equipo de desarrollo entrega las funcionalidades. Los rituales clave son el sprint planning, el daily standup, la sprint review y la retrospectiva.",
      "Herramientas como Jira, Trello o Azure DevOps permiten visualizar el backlog, seguir el avance mediante tableros Kanban y medir la velocidad del equipo a través de los sprints.",
    ],
    keyTakeaways: [
      "La agilidad es una filosofía de colaboración, no solo un conjunto de herramientas",
      "Los rituales Scrum sirven para mantener la transparencia, no para crear burocracia",
      "La retrospectiva es el ritual más frecuentemente descuidado pero el más valioso para mejorar",
    ],
    resourceLabels: [
      "Scrum.org — Guía Scrum oficial (gratuita)",
      "Atlassian Agile Coach",
    ],
    quiz: [
      { question: "¿Qué rol prioriza las necesidades en un equipo Scrum?", options: ["El Scrum Master", "El Product Owner", "El desarrollador senior", "Solo el cliente final"], explanation: "El Product Owner es responsable de priorizar el backlog y de representar las necesidades del negocio." },
      { question: "¿Cuál es la duración típica de un sprint Scrum?", options: ["1 día", "2 semanas", "6 meses", "1 año"], explanation: "Un sprint dura generalmente 2 semanas, aunque esto puede variar entre 1 y 4 semanas según el equipo." },
      { question: "¿Qué privilegia el manifiesto ágil frente a la documentación exhaustiva?", options: ["Aún más documentación", "La colaboración y la adaptabilidad", "La ausencia total de comunicación", "El trabajo aislado"], explanation: "El manifiesto ágil valora los individuos, las interacciones y la adaptabilidad en lugar de una documentación rígida." },
      { question: "¿Qué ritual Scrum es frecuentemente descuidado pero particularmente valioso según el módulo?", options: ["El daily standup", "La retrospectiva", "El sprint planning", "La pausa para el café"], explanation: "La retrospectiva, que permite al equipo mejorar continuamente, es a menudo subestimada a pesar de su gran valor." },
      { question: "¿Qué herramienta se menciona para visualizar un backlog Kanban?", options: ["Photoshop", "Trello", "Solo Excel", "PowerPoint"], explanation: "Trello es una herramienta popular que ofrece tableros Kanban para visualizar y seguir el avance de las tareas." },
      { question: "¿Cuál es el rol del Scrum Master?", options: ["Codificar todas las funcionalidades solo", "Facilitar el proceso Scrum para el equipo", "Decidir solo el presupuesto", "Reemplazar al cliente"], explanation: "El Scrum Master facilita los rituales y retira los obstáculos para permitir al equipo trabajar eficazmente." },
    ],
  },
  {
    title: "Proyecto final: transformación digital de empresa",
    objectives: [
      "Auditar las necesidades tecnológicas de una organización",
      "Proponer un plan de transformación digital realista",
      "Presentar una hoja de ruta técnica y presupuestaria",
    ],
    content: [
      "El proyecto final pide analizar una organización (real o ficticia) e identificar las oportunidades de digitalización: automatización de procesos manuales, migración a la nube, adopción de herramientas colaborativas o integración de IA para ganar en eficacia.",
      "La hoja de ruta debe jerarquizar las iniciativas por impacto y complejidad, con un calendario realista y un presupuesto estimado. Las transformaciones más exitosas comienzan por ganancias rápidas (quick wins) antes de abordar cambios estructurales más profundos.",
      "La gestión del cambio es tan importante como la tecnología misma: involucrar a los equipos afectados, formar a los usuarios y comunicar los beneficios concretos determinan a menudo el éxito o el fracaso de una transformación digital.",
    ],
    keyTakeaways: [
      "Una transformación digital exitosa comienza por las necesidades del negocio, no por la tecnología",
      "Priorizar las ganancias rápidas construye la confianza para los cambios más ambiciosos",
      "La resistencia al cambio humano es a menudo el mayor obstáculo, no la técnica",
    ],
    resourceLabels: [
      "MIT Sloan — Investigación sobre la transformación digital",
    ],
    quiz: [
      { question: "¿Por qué debe comenzar una transformación digital exitosa?", options: ["La compra de la tecnología más cara", "Las necesidades del negocio", "El despido del personal", "Solo la contratación de un consultor externo"], explanation: "Una transformación digital eficaz parte siempre de las necesidades reales de la organización, no de la tecnología misma." },
      { question: "¿Qué designa un 'quick win' en una hoja de ruta de transformación?", options: ["Un fracaso rápido", "Una ganancia rápida y visible que construye la confianza", "Una inversión a muy largo plazo", "Una pérdida financiera aceptable"], explanation: "Los quick wins son resultados rápidos y tangibles que demuestran el valor de la transformación y facilitan la adhesión." },
      { question: "¿Cuál es a menudo el mayor obstáculo para una transformación digital?", options: ["La falta de wifi", "La resistencia al cambio humano", "El precio de las computadoras", "El clima"], explanation: "La resistencia humana al cambio es generalmente un obstáculo más importante que los desafíos puramente técnicos." },
      { question: "¿Qué debe incluir una hoja de ruta de transformación digital?", options: ["Solo una lista de software", "Un calendario realista y un presupuesto estimado", "Ninguna planificación temporal", "Solo promesas verbales"], explanation: "Una hoja de ruta seria jerarquiza las iniciativas con un calendario y un presupuesto claros." },
      { question: "¿Por qué la formación de los usuarios es crucial en una transformación digital?", options: ["No es necesaria", "Porque la adopción de las nuevas herramientas depende de la comprensión de los usuarios", "Solo para respetar una ley", "Porque es gratuita"], explanation: "Sin una formación adecuada, incluso las mejores herramientas tecnológicas fracasan por falta de adopción por los usuarios." },
      { question: "¿Qué tipo de iniciativa se recomienda antes de abordar cambios estructurales profundos?", options: ["Cambios radicales inmediatos", "Ganancias rápidas (quick wins)", "Ninguna acción previa", "El despido del equipo TI"], explanation: "Comenzar por ganancias rápidas crea la confianza necesaria antes de emprender transformaciones más complejas." },
    ],
  },
];

const it: CourseTranslation = [
  {
    title: "Introduzione ai sistemi informatici",
    objectives: [
      "Comprendere l'architettura hardware e software di un sistema",
      "Distinguere i principali sistemi operativi (Windows, Linux, macOS)",
      "Padroneggiare le basi della rete informatica",
    ],
    content: [
      "Un sistema informatico combina hardware (processore, memoria, archiviazione) e software (sistema operativo, applicazioni). Comprendere questa architettura di base è essenziale prima di affrontare argomenti più avanzati come il cloud o la cybersicurezza.",
      "Linux domina i server e il cloud computing grazie alla sua stabilità e al suo costo, mentre Windows resta dominante sulle postazioni di lavoro aziendali. macOS è privilegiato nei settori creativi e nello sviluppo mobile (iOS).",
      "Le reti informatiche si basano sul modello TCP/IP: ogni dispositivo possiede un indirizzo IP, i dati circolano per pacchetti, e protocolli come HTTP, DNS e DHCP strutturano la comunicazione tra macchine.",
    ],
    keyTakeaways: [
      "Ogni competenza avanzata in IT si basa su una solida comprensione dell'hardware e del sistema operativo",
      "Linux è la base della maggior parte dell'infrastruttura cloud mondiale",
      "Comprendere TCP/IP è indispensabile per diagnosticare problemi di rete",
    ],
    resourceLabels: [
      "Microsoft Learn — Fondamenti IT",
      "Linux Foundation — Introduzione gratuita a Linux",
    ],
    quiz: [
      { question: "Quale sistema operativo domina maggioritariamente i server e il cloud?", options: ["Windows", "Linux", "macOS", "Android"], explanation: "Linux è dominante sui server e sul cloud grazie alla sua stabilità, alla sua sicurezza e al suo costo (spesso gratuito)." },
      { question: "Su quale modello si basano le reti informatiche moderne?", options: ["HTML/CSS", "TCP/IP", "USB/HDMI", "RAM/ROM"], explanation: "Il modello TCP/IP struttura la comunicazione tra dispositivi tramite indirizzi IP e il trasporto di pacchetti di dati." },
      { question: "Quale protocollo è responsabile della risoluzione dei nomi di dominio in indirizzi IP?", options: ["HTTP", "DNS", "FTP", "SMTP"], explanation: "Il DNS (Domain Name System) traduce i nomi di dominio leggibili negli indirizzi IP utilizzati dalle macchine." },
      { question: "Quale sistema operativo è privilegiato per lo sviluppo iOS?", options: ["Linux", "macOS", "Windows Server", "Chrome OS"], explanation: "macOS è necessario per sviluppare applicazioni iOS tramite Xcode, lo strumento di Apple." },
      { question: "Quali sono i due componenti fondamentali di un sistema informatico?", options: ["Internet e la tastiera", "L'hardware e il software", "Il mouse e lo schermo", "Il wifi e il bluetooth"], explanation: "Un sistema informatico combina sempre l'hardware e il software per funzionare." },
      { question: "Cosa trasportano i dati su una rete TCP/IP?", options: ["Pacchetti", "Solo file PDF", "CD-ROM virtuali", "Niente, tutto è istantaneo"], explanation: "I dati circolano sotto forma di pacchetti suddivisi, instradati e poi ricostituiti a destinazione." },
    ],
  },
  {
    title: "Cloud computing (AWS, Azure, GCP)",
    objectives: [
      "Differenziare i modelli IaaS, PaaS e SaaS",
      "Confrontare i tre principali fornitori cloud",
      "Distribuire una risorsa semplice su un cloud pubblico",
    ],
    content: [
      "Il cloud computing permette di accedere a risorse informatiche (server, archiviazione, database) su richiesta, senza possedere l'infrastruttura fisica. I tre modelli principali sono l'IaaS (infrastruttura grezza), il PaaS (piattaforma di sviluppo) e il SaaS (software pronto all'uso).",
      "AWS (Amazon Web Services) domina il mercato mondiale con la gamma di servizi più ampia. Microsoft Azure si integra naturalmente nelle aziende già sotto l'ecosistema Microsoft. Google Cloud Platform (GCP) si distingue per i suoi strumenti di dati e di intelligenza artificiale.",
      "In Canada, diversi fornitori offrono ormai data center locali (Canada Central per Azure, ca-central-1 per AWS), una questione importante per le organizzazioni soggette a requisiti di sovranità dei dati.",
    ],
    keyTakeaways: [
      "La scelta del fornitore cloud dipende dall'ecosistema esistente e dalle competenze del team",
      "La fatturazione a consumo richiede una sorveglianza costante dei costi",
      "La residenza dei dati è una questione normativa importante in Canada",
    ],
    resourceLabels: [
      "AWS Skill Builder — Formazione gratuita",
      "Microsoft Learn — Azure Fundamentals",
    ],
    quiz: [
      { question: "Cosa significa IaaS nel contesto del cloud computing?", options: ["Infrastructure as a Service", "Internet as a Solution", "Identity as a System", "Integration as a Standard"], explanation: "IaaS (Infrastructure as a Service) fornisce risorse grezze come server virtuali senza gestione della piattaforma." },
      { question: "Quale fornitore cloud domina il mercato mondiale secondo il modulo?", options: ["Google Cloud Platform", "AWS", "IBM Cloud", "Oracle Cloud"], explanation: "AWS (Amazon Web Services) è descritto come il leader mondiale con la gamma di servizi più ampia." },
      { question: "Per cosa si distingue particolarmente Google Cloud Platform (GCP)?", options: ["I videogiochi", "Gli strumenti di dati e di intelligenza artificiale", "La vendita al dettaglio", "La stampa"], explanation: "GCP è riconosciuto per i suoi strumenti avanzati di analisi dei dati e intelligenza artificiale." },
      { question: "Quale modello cloud fornisce un software pronto all'uso senza gestione tecnica?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], explanation: "Il SaaS (Software as a Service) fornisce un'applicazione completa pronta all'uso, come Gmail o Microsoft 365." },
      { question: "Perché la residenza dei dati è una questione importante in Canada?", options: ["Per ragioni estetiche", "Per requisiti normativi di sovranità dei dati", "Perché il cloud non esiste in Canada", "Non è una questione reale"], explanation: "Alcune organizzazioni devono garantire che i loro dati restino ospitati in data center canadesi per ragioni legali." },
      { question: "Quale tipo di fatturazione è tipico del cloud computing?", options: ["Pagamento unico a vita", "Fatturazione a consumo", "Gratuito per sempre", "Solo abbonamento annuale obbligatorio"], explanation: "La fatturazione a consumo (pay-as-you-go) è il modello standard del cloud, che richiede una sorveglianza dei costi." },
    ],
  },
  {
    title: "Intelligenza artificiale e machine learning",
    objectives: [
      "Comprendere la differenza tra IA, machine learning e deep learning",
      "Identificare casi d'uso concreti dell'IA in azienda",
      "Utilizzare strumenti di IA generativa in un contesto professionale",
    ],
    content: [
      "L'intelligenza artificiale è il campo generale che mira a riprodurre comportamenti intelligenti tramite una macchina. Il machine learning è una sottocategoria in cui il sistema apprende a partire dai dati invece di essere programmato esplicitamente. Il deep learning utilizza reti neurali per trattare dati complessi come le immagini o il linguaggio.",
      "In azienda, l'IA è utilizzata per l'automazione del servizio clienti (chatbot), la previsione della domanda, il rilevamento delle frodi e la personalizzazione del marketing. Gli strumenti di IA generativa come ChatGPT o Copilot trasformano la produttività nella redazione, nel codice e nell'analisi.",
      "L'adozione responsabile dell'IA richiede di comprenderne i limiti: bias nei dati di addestramento, allucinazioni nei modelli generativi, e questioni etiche legate al processo decisionale automatizzato.",
    ],
    keyTakeaways: [
      "L'IA generativa è uno strumento di produttività, non una sostituzione del giudizio umano",
      "Comprendere i limiti dell'IA è importante quanto conoscere le sue capacità",
      "I casi d'uso più redditizi sono spesso i compiti ripetitivi a basso rischio",
    ],
    resourceLabels: [
      "Google AI — Corso di introduzione al machine learning",
      "Microsoft Learn — IA generativa per i professionisti",
    ],
    quiz: [
      { question: "Qual è la relazione tra l'IA, il machine learning e il deep learning?", options: ["Sono tre campi totalmente separati", "Il machine learning è una sottocategoria dell'IA, e il deep learning una sottocategoria del machine learning", "Il deep learning ingloba l'IA", "Non c'è alcuna differenza tra questi termini"], explanation: "L'IA è il campo generale, il machine learning ne è una sottocategoria, e il deep learning una tecnica specifica del machine learning." },
      { question: "Cos'è un'allucinazione in un modello di IA generativa?", options: ["Un bug visivo sullo schermo", "Un'informazione falsa generata con sicurezza dal modello", "Un virus informatico", "Una funzionalità disattivata"], explanation: "Un'allucinazione corrisponde a un'informazione errata o inventata che il modello presenta come vera." },
      { question: "Qual è uno dei casi d'uso dell'IA in azienda menzionato nel modulo?", options: ["Il rilevamento delle frodi", "La fabbricazione di mobili", "La pulizia degli uffici", "Solo la consegna postale"], explanation: "Il rilevamento delle frodi è un caso d'uso comune dell'IA, in particolare nel settore finanziario." },
      { question: "L'IA generativa deve essere considerata come:", options: ["Una sostituzione totale del giudizio umano", "Uno strumento di produttività complementare al giudizio umano", "Una tecnologia senza alcun limite", "Inutile in azienda"], explanation: "L'IA generativa è presentata come uno strumento per aumentare la produttività, non per sostituire il discernimento umano." },
      { question: "Cosa può causare bias in un sistema di IA?", options: ["Il colore dello schermo", "I dati di addestramento utilizzati", "Il numero di utenti", "Il prezzo del software"], explanation: "I bias nei dati di addestramento si riflettono direttamente nelle previsioni e nei risultati del modello di IA." },
      { question: "Quale tipo di compito è spesso il più redditizio da automatizzare con l'IA?", options: ["Solo le decisioni strategiche complesse", "I compiti ripetitivi a basso rischio", "Solo i compiti creativi", "Nessun compito dovrebbe essere automatizzato"], explanation: "I compiti ripetitivi e a basso rischio offrono il miglior ritorno sull'investimento per l'automazione tramite IA." },
    ],
  },
  {
    title: "Cybersicurezza e protezione dei dati",
    objectives: [
      "Identificare le principali minacce informatiche (phishing, ransomware)",
      "Applicare le buone pratiche di sicurezza di base",
      "Comprendere gli obblighi legali canadesi in materia di dati",
    ],
    content: [
      "Il phishing resta il vettore d'attacco più comune, sfruttando l'errore umano invece di una falla tecnica. I ransomware cifrano i dati di un'organizzazione ed esigono un riscatto — il loro impatto può essere catastrofico senza backup recenti e testati.",
      "Le buone pratiche di base includono l'autenticazione a due fattori (2FA), password uniche e complesse gestite tramite un gestore di password, aggiornamenti regolari dei sistemi e un backup regolare secondo la regola 3-2-1 (3 copie, 2 supporti diversi, 1 fuori sede).",
      "In Canada, la Legge sulla protezione delle informazioni personali e dei documenti elettronici (PIPEDA) e la Legge 25 in Quebec impongono obblighi rigorosi sulla raccolta, l'archiviazione e la notifica in caso di violazione di dati personali.",
    ],
    keyTakeaways: [
      "L'errore umano resta la causa numero uno degli incidenti di sicurezza",
      "Un backup non testato non è una vera protezione",
      "La conformità alla Legge 25 e alla PIPEDA è obbligatoria, non facoltativa, per ogni organizzazione canadese",
    ],
    resourceLabels: [
      "Centro canadese per la cybersicurezza",
      "CAI / Legge 25 — Guida alla conformità Quebec",
    ],
    quiz: [
      { question: "Qual è il vettore d'attacco più comune secondo il modulo?", options: ["Il phishing", "L'attacco fisico al server", "L'interruzione di corrente", "Solo il furto di materiale"], explanation: "Il phishing sfrutta l'errore umano e resta statisticamente il vettore d'attacco più frequente." },
      { question: "Cosa fa un ransomware?", options: ["Accelera il computer", "Cifra i dati ed esige un riscatto", "Migliora la sicurezza", "Elimina i virus esistenti"], explanation: "Un ransomware cifra i dati della vittima ed esige un pagamento per decifrarli." },
      { question: "Cosa significa la regola di backup 3-2-1?", options: ["3 password, 2 email, 1 account", "3 copie, 2 supporti diversi, 1 copia fuori sede", "3 ore, 2 giorni, 1 settimana", "Nessun significato particolare"], explanation: "La regola 3-2-1 garantisce una resilienza dei dati: 3 copie su 2 supporti diversi, di cui 1 conservata fuori sede." },
      { question: "Quale legge quebecchese regola la protezione delle informazioni personali?", options: ["La Legge 25", "Solo il Codice penale", "La Legge sui brevetti", "La Legge sul tabacco"], explanation: "La Legge 25 impone obblighi rigorosi in Quebec riguardo alla raccolta e alla protezione dei dati personali." },
      { question: "Cos'è l'autenticazione a due fattori (2FA)?", options: ["Utilizzare due computer", "Un livello di sicurezza aggiuntivo che combina due metodi di verifica", "Avere due password identiche", "Una funzionalità obsoleta"], explanation: "La 2FA aggiunge una seconda verifica (es. codice SMS) oltre alla password per rafforzare la sicurezza d'accesso." },
      { question: "Perché un backup non testato non è una vera protezione?", options: ["Perché occupa troppo spazio", "Perché non si sa se potrà realmente essere ripristinato in caso di bisogno", "Perché i backup sono illegali", "Non è mai un problema"], explanation: "Un backup deve essere testato regolarmente per garantire che funzionerà realmente durante un ripristino d'emergenza." },
    ],
  },
  {
    title: "Gestione dei database",
    objectives: [
      "Differenziare database relazionali e NoSQL",
      "Scrivere query SQL di base",
      "Comprendere i principi di normalizzazione dei dati",
    ],
    content: [
      "I database relazionali (MySQL, PostgreSQL, SQL Server) organizzano i dati in tabelle collegate da chiavi, garantendo la coerenza tramite vincoli rigorosi. I database NoSQL (MongoDB, Firebase) offrono più flessibilità per dati non strutturati o su scala molto grande.",
      "Il linguaggio SQL (Structured Query Language) permette di interrogare, inserire, modificare ed eliminare dati. I comandi di base — SELECT, INSERT, UPDATE, DELETE, JOIN — coprono la maggior parte delle esigenze quotidiane di un analista o sviluppatore.",
      "La normalizzazione dei dati mira a eliminare la ridondanza e a garantire l'integrità referenziale. Un database ben progettato facilita la manutenzione, migliora le prestazioni e riduce i rischi di incoerenza tra i dati.",
    ],
    keyTakeaways: [
      "La scelta relazionale vs NoSQL dipende dalla struttura dei dati e dalla scala del progetto",
      "SQL resta la competenza più trasferibile tra tutti i lavori tecnici",
      "Un database mal normalizzato crea problemi di coerenza che si aggravano nel tempo",
    ],
    resourceLabels: [
      "PostgreSQL Tutorial ufficiale",
      "SQLBolt — Imparare SQL in modo interattivo",
    ],
    quiz: [
      { question: "Quale comando SQL permette di recuperare dati in una tabella?", options: ["GET", "SELECT", "FETCH", "PULL"], explanation: "SELECT è il comando SQL fondamentale per interrogare e recuperare dati da una o più tabelle." },
      { question: "Che tipo di database è MongoDB?", options: ["Relazionale", "NoSQL", "File di testo", "Foglio di calcolo"], explanation: "MongoDB è un database NoSQL orientato ai documenti, che offre flessibilità per dati non strutturati." },
      { question: "Qual è l'obiettivo principale della normalizzazione dei dati?", options: ["Rallentare le query", "Eliminare la ridondanza e garantire l'integrità referenziale", "Aumentare il numero di tabelle inutilmente", "Rimuovere tutte le relazioni tra tabelle"], explanation: "La normalizzazione struttura i dati per evitare la duplicazione e mantenere la coerenza tra le tabelle." },
      { question: "Quale comando SQL serve a inserire nuovi dati?", options: ["ADD", "INSERT", "NEW", "CREATE ROW"], explanation: "INSERT è il comando utilizzato per aggiungere nuove righe di dati in una tabella." },
      { question: "Perché SQL è considerato una competenza molto trasferibile?", options: ["Perché è usato solo in un singolo software", "Perché è usato nella maggior parte dei lavori tecnici che coinvolgono dati", "Perché è obsoleto", "Perché sostituisce tutti gli altri linguaggi"], explanation: "SQL è ampiamente usato in numerosi ruoli tecnici (analista, sviluppatore, data scientist), il che ne fa una competenza molto richiesta." },
      { question: "Cosa permette una chiave esterna in un database relazionale?", options: ["Di eliminare una tabella", "Di collegare una tabella a un'altra e garantire l'integrità referenziale", "Di cifrare i dati", "Di aumentare la velocità di internet"], explanation: "Una chiave esterna stabilisce una relazione tra due tabelle e assicura la coerenza dei dati collegati." },
    ],
  },
  {
    title: "Sviluppo web e applicazioni",
    objectives: [
      "Comprendere la differenza tra front-end e back-end",
      "Identificare i linguaggi e i framework comuni",
      "Seguire il ciclo di vita di un'applicazione web semplice",
    ],
    content: [
      "Il front-end riguarda tutto ciò che l'utente vede e manipola direttamente: HTML per la struttura, CSS per lo stile, JavaScript per l'interattività, con framework come React o Vue.js. Il back-end gestisce la logica del server, i database e le API, con linguaggi come Node.js, Python o Java.",
      "Un'applicazione web moderna segue generalmente un'architettura client-server: il browser (client) invia richieste a un server che tratta la logica di business e restituisce dati, spesso in formato JSON tramite un'API REST.",
      "Il ciclo di sviluppo include la progettazione, la codifica, i test, la distribuzione e la manutenzione. Le metodologie agili permettono di consegnare funzionalità per piccole iterazioni invece che in un solo blocco finale.",
    ],
    keyTakeaways: [
      "Front-end e back-end sono complementari, non intercambiabili",
      "Un'API ben progettata è la chiave di un'architettura web manutenibile",
      "La distribuzione continua riduce i rischi legati alle messe in produzione",
    ],
    resourceLabels: [
      "MDN Web Docs — Riferimento sviluppo web",
      "freeCodeCamp — Percorso di sviluppo web gratuito",
    ],
    quiz: [
      { question: "Quale linguaggio è utilizzato per strutturare il contenuto di una pagina web?", options: ["CSS", "HTML", "JavaScript", "SQL"], explanation: "HTML (HyperText Markup Language) definisce la struttura e il contenuto di una pagina web." },
      { question: "Cosa gestisce principalmente il back-end di un'applicazione web?", options: ["Lo stile visivo", "La logica del server, i database e le API", "Solo le immagini", "Le animazioni CSS"], explanation: "Il back-end tratta la logica di business lato server, gestisce i dati ed espone API per il front-end." },
      { question: "Quale formato è comunemente utilizzato per scambiare dati tramite un'API REST?", options: ["JSON", "MP3", "PDF", "EXE"], explanation: "JSON (JavaScript Object Notation) è il formato standard leggero per lo scambio di dati tra client e server." },
      { question: "Quale architettura è tipica di un'applicazione web moderna?", options: ["Client-server", "Solo peer-to-peer", "Nessuna architettura definita", "Mainframe centralizzato degli anni 1970"], explanation: "L'architettura client-server separa il browser (client) dal server che tratta le richieste e la logica." },
      { question: "Qual è il vantaggio delle metodologie agili nello sviluppo web?", options: ["Consegnare tutto in un solo blocco finale", "Consegnare funzionalità per piccole iterazioni", "Evitare completamente i test", "Lavorare senza alcuna pianificazione"], explanation: "L'agilità permette di consegnare progressivamente, di adattarsi ai feedback e di ridurre i rischi di grandi progetti monolitici." },
      { question: "Quale di questi elementi è un framework front-end menzionato nel modulo?", options: ["React", "MySQL", "Docker", "Linux"], explanation: "React è un framework JavaScript utilizzato per costruire interfacce utente lato front-end." },
    ],
  },
  {
    title: "Gestione di progetti IT (Agile/Scrum)",
    objectives: [
      "Comprendere i principi del manifesto agile",
      "Padroneggiare i ruoli e i rituali Scrum",
      "Utilizzare uno strumento di gestione di progetti agile (Jira, Trello)",
    ],
    content: [
      "Il manifesto agile privilegia la collaborazione, l'adattabilità e la consegna iterativa invece della pianificazione rigida e della documentazione esaustiva. Questo approccio risponde meglio alle esigenze mutevoli dei progetti tecnologici moderni.",
      "Scrum struttura il lavoro in sprint (generalmente 2 settimane) con ruoli definiti: il Product Owner prioritizza le esigenze, lo Scrum Master facilita il processo, e il team di sviluppo consegna le funzionalità. I rituali chiave sono lo sprint planning, il daily standup, la sprint review e la retrospettiva.",
      "Strumenti come Jira, Trello o Azure DevOps permettono di visualizzare il backlog, seguire l'avanzamento tramite lavagne Kanban e misurare la velocità del team attraverso gli sprint.",
    ],
    keyTakeaways: [
      "L'agilità è una filosofia di collaborazione, non solo un insieme di strumenti",
      "I rituali Scrum servono a mantenere la trasparenza, non a creare burocrazia",
      "La retrospettiva è il rituale più spesso trascurato ma il più prezioso per migliorare",
    ],
    resourceLabels: [
      "Scrum.org — Guida Scrum ufficiale (gratuita)",
      "Atlassian Agile Coach",
    ],
    quiz: [
      { question: "Quale ruolo prioritizza le esigenze in un team Scrum?", options: ["Lo Scrum Master", "Il Product Owner", "Lo sviluppatore senior", "Solo il cliente finale"], explanation: "Il Product Owner è responsabile di prioritizzare il backlog e di rappresentare le esigenze di business." },
      { question: "Qual è la durata tipica di uno sprint Scrum?", options: ["1 giorno", "2 settimane", "6 mesi", "1 anno"], explanation: "Uno sprint dura generalmente 2 settimane, anche se questo può variare tra 1 e 4 settimane secondo il team." },
      { question: "Cosa privilegia il manifesto agile rispetto alla documentazione esaustiva?", options: ["Ancora più documentazione", "La collaborazione e l'adattabilità", "L'assenza totale di comunicazione", "Il lavoro isolato"], explanation: "Il manifesto agile valorizza gli individui, le interazioni e l'adattabilità invece di una documentazione rigida." },
      { question: "Quale rituale Scrum è spesso trascurato ma particolarmente prezioso secondo il modulo?", options: ["Il daily standup", "La retrospettiva", "Lo sprint planning", "La pausa caffè"], explanation: "La retrospettiva, che permette al team di migliorare continuamente, è spesso sottovalutata nonostante il suo grande valore." },
      { question: "Quale strumento è menzionato per visualizzare un backlog Kanban?", options: ["Photoshop", "Trello", "Solo Excel", "PowerPoint"], explanation: "Trello è uno strumento popolare che offre lavagne Kanban per visualizzare e seguire l'avanzamento dei compiti." },
      { question: "Qual è il ruolo dello Scrum Master?", options: ["Codificare tutte le funzionalità da solo", "Facilitare il processo Scrum per il team", "Decidere da solo il budget", "Sostituire il cliente"], explanation: "Lo Scrum Master facilita i rituali e rimuove gli ostacoli per permettere al team di lavorare efficacemente." },
    ],
  },
  {
    title: "Progetto finale: trasformazione digitale aziendale",
    objectives: [
      "Verificare le esigenze tecnologiche di un'organizzazione",
      "Proporre un piano di trasformazione digitale realistico",
      "Presentare una tabella di marcia tecnica e di bilancio",
    ],
    content: [
      "Il progetto finale chiede di analizzare un'organizzazione (reale o fittizia) e di identificare le opportunità di digitalizzazione: automazione di processi manuali, migrazione verso il cloud, adozione di strumenti collaborativi o integrazione di IA per guadagnare in efficienza.",
      "La tabella di marcia deve gerarchizzare le iniziative per impatto e complessità, con un calendario realistico e un budget stimato. Le trasformazioni più riuscite iniziano con guadagni rapidi (quick wins) prima di affrontare cambiamenti strutturali più profondi.",
      "La gestione del cambiamento è importante quanto la tecnologia stessa: coinvolgere i team interessati, formare gli utenti e comunicare i benefici concreti determinano spesso il successo o il fallimento di una trasformazione digitale.",
    ],
    keyTakeaways: [
      "Una trasformazione digitale riuscita inizia dalle esigenze di business, non dalla tecnologia",
      "Prioritizzare i guadagni rapidi costruisce la fiducia per i cambiamenti più ambiziosi",
      "La resistenza al cambiamento umano è spesso il più grande ostacolo, non la tecnica",
    ],
    resourceLabels: [
      "MIT Sloan — Ricerca sulla trasformazione digitale",
    ],
    quiz: [
      { question: "Con cosa deve iniziare una trasformazione digitale riuscita?", options: ["L'acquisto della tecnologia più costosa", "Le esigenze di business", "Il licenziamento del personale", "Solo l'assunzione di un consulente esterno"], explanation: "Una trasformazione digitale efficace parte sempre dalle esigenze reali dell'organizzazione, non dalla tecnologia stessa." },
      { question: "Cosa indica un 'quick win' in una tabella di marcia di trasformazione?", options: ["Un fallimento rapido", "Un guadagno rapido e visibile che costruisce la fiducia", "Un investimento a lunghissimo termine", "Una perdita finanziaria accettabile"], explanation: "I quick win sono risultati rapidi e tangibili che dimostrano il valore della trasformazione e facilitano l'adesione." },
      { question: "Qual è spesso il più grande ostacolo a una trasformazione digitale?", options: ["La mancanza di wifi", "La resistenza al cambiamento umano", "Il prezzo dei computer", "Il meteo"], explanation: "La resistenza umana al cambiamento è generalmente un ostacolo più importante delle sfide puramente tecniche." },
      { question: "Cosa deve includere una tabella di marcia di trasformazione digitale?", options: ["Solo una lista di software", "Un calendario realistico e un budget stimato", "Nessuna pianificazione temporale", "Solo promesse verbali"], explanation: "Una tabella di marcia seria gerarchizza le iniziative con un calendario e un budget chiari." },
      { question: "Perché la formazione degli utenti è cruciale in una trasformazione digitale?", options: ["Non è necessaria", "Perché l'adozione dei nuovi strumenti dipende dalla comprensione degli utenti", "Solo per rispettare una legge", "Perché è gratuita"], explanation: "Senza una formazione adeguata, anche i migliori strumenti tecnologici falliscono per mancanza di adozione da parte degli utenti." },
      { question: "Quale tipo di iniziativa è raccomandato prima di affrontare cambiamenti strutturali profondi?", options: ["Cambiamenti radicali immediati", "Guadagni rapidi (quick wins)", "Nessuna azione preliminare", "Il licenziamento del team IT"], explanation: "Iniziare con guadagni rapidi crea la fiducia necessaria prima di intraprendere trasformazioni più complesse." },
    ],
  },
];

const pt: CourseTranslation = [
  {
    title: "Introdução aos sistemas informáticos",
    objectives: [
      "Compreender a arquitetura de hardware e software de um sistema",
      "Distinguir os principais sistemas operativos (Windows, Linux, macOS)",
      "Dominar as bases da rede informática",
    ],
    content: [
      "Um sistema informático combina hardware (processador, memória, armazenamento) e software (sistema operativo, aplicações). Compreender esta arquitetura básica é essencial antes de abordar temas mais avançados como a nuvem ou a cibersegurança.",
      "O Linux domina os servidores e a computação em nuvem graças à sua estabilidade e ao seu custo, enquanto o Windows continua dominante nos postos de trabalho empresariais. O macOS é privilegiado nos domínios criativos e no desenvolvimento móvel (iOS).",
      "As redes informáticas baseiam-se no modelo TCP/IP: cada dispositivo possui um endereço IP, os dados circulam por pacotes, e protocolos como HTTP, DNS e DHCP estruturam a comunicação entre máquinas.",
    ],
    keyTakeaways: [
      "Toda competência avançada em TI baseia-se numa compreensão sólida do hardware e do sistema operativo",
      "O Linux é a base da maioria da infraestrutura de nuvem mundial",
      "Compreender TCP/IP é indispensável para diagnosticar problemas de rede",
    ],
    resourceLabels: [
      "Microsoft Learn — Fundamentos de TI",
      "Linux Foundation — Introdução gratuita ao Linux",
    ],
    quiz: [
      { question: "Que sistema operativo domina maioritariamente os servidores e a nuvem?", options: ["Windows", "Linux", "macOS", "Android"], explanation: "O Linux é dominante nos servidores e na nuvem graças à sua estabilidade, à sua segurança e ao seu custo (frequentemente gratuito)." },
      { question: "Em que modelo se baseiam as redes informáticas modernas?", options: ["HTML/CSS", "TCP/IP", "USB/HDMI", "RAM/ROM"], explanation: "O modelo TCP/IP estrutura a comunicação entre dispositivos através de endereços IP e do transporte de pacotes de dados." },
      { question: "Que protocolo é responsável pela resolução dos nomes de domínio em endereços IP?", options: ["HTTP", "DNS", "FTP", "SMTP"], explanation: "O DNS (Domain Name System) traduz os nomes de domínio legíveis nos endereços IP utilizados pelas máquinas." },
      { question: "Que sistema operativo é privilegiado para o desenvolvimento iOS?", options: ["Linux", "macOS", "Windows Server", "Chrome OS"], explanation: "O macOS é necessário para desenvolver aplicações iOS através do Xcode, a ferramenta da Apple." },
      { question: "Quais são os dois componentes fundamentais de um sistema informático?", options: ["A internet e o teclado", "O hardware e o software", "O rato e o ecrã", "O wifi e o bluetooth"], explanation: "Um sistema informático combina sempre o hardware e o software para funcionar." },
      { question: "O que transportam os dados numa rede TCP/IP?", options: ["Pacotes", "Apenas ficheiros PDF", "CD-ROM virtuais", "Nada, tudo é instantâneo"], explanation: "Os dados circulam sob a forma de pacotes divididos, encaminhados e depois reconstituídos no destino." },
    ],
  },
  {
    title: "Computação em nuvem (AWS, Azure, GCP)",
    objectives: [
      "Diferenciar os modelos IaaS, PaaS e SaaS",
      "Comparar os três principais fornecedores de nuvem",
      "Implantar um recurso simples numa nuvem pública",
    ],
    content: [
      "A computação em nuvem permite aceder a recursos informáticos (servidores, armazenamento, bases de dados) a pedido, sem possuir a infraestrutura física. Os três modelos principais são o IaaS (infraestrutura bruta), o PaaS (plataforma de desenvolvimento) e o SaaS (software pronto a usar).",
      "A AWS (Amazon Web Services) domina o mercado mundial com a gama de serviços mais ampla. A Microsoft Azure integra-se naturalmente nas empresas já sob o ecossistema Microsoft. A Google Cloud Platform (GCP) distingue-se pelas suas ferramentas de dados e de inteligência artificial.",
      "No Canadá, vários fornecedores oferecem agora centros de dados locais (Canada Central para Azure, ca-central-1 para AWS), uma questão importante para as organizações sujeitas a exigências de soberania dos dados.",
    ],
    keyTakeaways: [
      "A escolha do fornecedor de nuvem depende do ecossistema existente e das competências da equipa",
      "A faturação por utilização exige uma vigilância constante dos custos",
      "A residência dos dados é uma questão regulatória importante no Canadá",
    ],
    resourceLabels: [
      "AWS Skill Builder — Formação gratuita",
      "Microsoft Learn — Azure Fundamentals",
    ],
    quiz: [
      { question: "O que significa IaaS no contexto da computação em nuvem?", options: ["Infrastructure as a Service", "Internet as a Solution", "Identity as a System", "Integration as a Standard"], explanation: "IaaS (Infrastructure as a Service) fornece recursos brutos como servidores virtuais sem gestão de plataforma." },
      { question: "Que fornecedor de nuvem domina o mercado mundial segundo o módulo?", options: ["Google Cloud Platform", "AWS", "IBM Cloud", "Oracle Cloud"], explanation: "A AWS (Amazon Web Services) é descrita como a líder mundial com a gama de serviços mais ampla." },
      { question: "Por que se distingue particularmente a Google Cloud Platform (GCP)?", options: ["Os videojogos", "As ferramentas de dados e de inteligência artificial", "A venda a retalho", "A tipografia"], explanation: "A GCP é reconhecida pelas suas ferramentas avançadas de análise de dados e inteligência artificial." },
      { question: "Que modelo de nuvem fornece um software pronto a usar sem gestão técnica?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], explanation: "O SaaS (Software as a Service) entrega uma aplicação completa pronta a usar, como o Gmail ou o Microsoft 365." },
      { question: "Por que a residência dos dados é uma questão importante no Canadá?", options: ["Por razões estéticas", "Por exigências regulatórias de soberania dos dados", "Porque a nuvem não existe no Canadá", "Não é uma questão real"], explanation: "Algumas organizações devem garantir que os seus dados permaneçam alojados em centros de dados canadianos por razões legais." },
      { question: "Que tipo de faturação é típico da computação em nuvem?", options: ["Pagamento único vitalício", "Faturação por utilização", "Gratuito para sempre", "Apenas assinatura anual obrigatória"], explanation: "A faturação por utilização (pay-as-you-go) é o modelo padrão da nuvem, exigindo uma vigilância dos custos." },
    ],
  },
  {
    title: "Inteligência artificial e machine learning",
    objectives: [
      "Compreender a diferença entre IA, machine learning e deep learning",
      "Identificar casos de uso concretos da IA na empresa",
      "Utilizar ferramentas de IA generativa num contexto profissional",
    ],
    content: [
      "A inteligência artificial é o domínio geral que visa reproduzir comportamentos inteligentes através de uma máquina. O machine learning é uma subcategoria onde o sistema aprende a partir de dados em vez de ser programado explicitamente. O deep learning utiliza redes de neurónios para processar dados complexos como as imagens ou a linguagem.",
      "Na empresa, a IA é utilizada para a automação do serviço ao cliente (chatbots), a previsão da procura, a deteção de fraude e a personalização do marketing. As ferramentas de IA generativa como o ChatGPT ou o Copilot transformam a produtividade na redação, no código e na análise.",
      "A adoção responsável da IA requer compreender os seus limites: enviesamentos nos dados de treino, alucinações nos modelos generativos, e questões éticas ligadas à tomada de decisão automatizada.",
    ],
    keyTakeaways: [
      "A IA generativa é uma ferramenta de produtividade, não uma substituição do julgamento humano",
      "Compreender os limites da IA é tão importante quanto conhecer as suas capacidades",
      "Os casos de uso mais rentáveis são frequentemente as tarefas repetitivas de baixo risco",
    ],
    resourceLabels: [
      "Google AI — Curso de introdução ao machine learning",
      "Microsoft Learn — IA generativa para profissionais",
    ],
    quiz: [
      { question: "Qual é a relação entre a IA, o machine learning e o deep learning?", options: ["São três domínios totalmente separados", "O machine learning é uma subcategoria da IA, e o deep learning uma subcategoria do machine learning", "O deep learning engloba a IA", "Não há nenhuma diferença entre estes termos"], explanation: "A IA é o domínio geral, o machine learning é uma subcategoria dela, e o deep learning uma técnica específica do machine learning." },
      { question: "O que é uma 'alucinação' num modelo de IA generativa?", options: ["Um erro visual no ecrã", "Uma informação falsa gerada com segurança pelo modelo", "Um vírus informático", "Uma funcionalidade desativada"], explanation: "Uma alucinação corresponde a uma informação incorreta ou inventada que o modelo apresenta como verdadeira." },
      { question: "Qual é um dos casos de uso da IA na empresa mencionado no módulo?", options: ["A deteção de fraude", "O fabrico de móveis", "A limpeza dos escritórios", "Apenas a entrega postal"], explanation: "A deteção de fraude é um caso de uso comum da IA, nomeadamente no setor financeiro." },
      { question: "A IA generativa deve ser considerada como:", options: ["Uma substituição total do julgamento humano", "Uma ferramenta de produtividade complementar ao julgamento humano", "Uma tecnologia sem qualquer limite", "Inútil na empresa"], explanation: "A IA generativa é apresentada como uma ferramenta para aumentar a produtividade, não para substituir o discernimento humano." },
      { question: "O que pode causar enviesamentos num sistema de IA?", options: ["A cor do ecrã", "Os dados de treino utilizados", "O número de utilizadores", "O preço do software"], explanation: "Os enviesamentos nos dados de treino refletem-se diretamente nas previsões e resultados do modelo de IA." },
      { question: "Que tipo de tarefa é frequentemente a mais rentável de automatizar com a IA?", options: ["Apenas as decisões estratégicas complexas", "As tarefas repetitivas de baixo risco", "Apenas as tarefas criativas", "Nenhuma tarefa deveria ser automatizada"], explanation: "As tarefas repetitivas e de baixo risco oferecem o melhor retorno do investimento para a automação por IA." },
    ],
  },
  {
    title: "Cibersegurança e proteção de dados",
    objectives: [
      "Identificar as principais ameaças informáticas (phishing, ransomware)",
      "Aplicar as boas práticas de segurança de base",
      "Compreender as obrigações legais canadianas em matéria de dados",
    ],
    content: [
      "O phishing continua a ser o vetor de ataque mais comum, explorando o erro humano em vez de uma falha técnica. Os ransomware cifram os dados de uma organização e exigem um resgate — o seu impacto pode ser catastrófico sem cópias de segurança recentes e testadas.",
      "As boas práticas de base incluem a autenticação de dois fatores (2FA), palavras-passe únicas e complexas geridas através de um gestor de palavras-passe, atualizações regulares dos sistemas e uma cópia de segurança regular segundo a regra 3-2-1 (3 cópias, 2 suportes diferentes, 1 fora do local).",
      "No Canadá, a Lei de proteção das informações pessoais e dos documentos eletrónicos (PIPEDA) e a Lei 25 no Quebec impõem obrigações rigorosas sobre a recolha, o armazenamento e a notificação em caso de fuga de dados pessoais.",
    ],
    keyTakeaways: [
      "O erro humano continua a ser a causa número um dos incidentes de segurança",
      "Uma cópia de segurança não testada não é uma verdadeira proteção",
      "A conformidade com a Lei 25 e com a PIPEDA é obrigatória, não opcional, para toda organização canadiana",
    ],
    resourceLabels: [
      "Centro canadiano para a cibersegurança",
      "CAI / Lei 25 — Guia de conformidade Quebec",
    ],
    quiz: [
      { question: "Qual é o vetor de ataque mais comum segundo o módulo?", options: ["O phishing", "O ataque físico ao servidor", "O corte de eletricidade", "Apenas o roubo de material"], explanation: "O phishing explora o erro humano e continua a ser estatisticamente o vetor de ataque mais frequente." },
      { question: "O que faz um ransomware?", options: ["Acelera o computador", "Cifra os dados e exige um resgate", "Melhora a segurança", "Elimina os vírus existentes"], explanation: "Um ransomware cifra os dados da vítima e exige um pagamento para os decifrar." },
      { question: "O que significa a regra de cópia de segurança 3-2-1?", options: ["3 palavras-passe, 2 emails, 1 conta", "3 cópias, 2 suportes diferentes, 1 cópia fora do local", "3 horas, 2 dias, 1 semana", "Nenhum significado particular"], explanation: "A regra 3-2-1 garante uma resiliência dos dados: 3 cópias em 2 suportes diferentes, das quais 1 conservada fora do local." },
      { question: "Que lei quebequense regula a proteção das informações pessoais?", options: ["A Lei 25", "Apenas o Código Penal", "A Lei das patentes", "A Lei do tabaco"], explanation: "A Lei 25 impõe obrigações rigorosas no Quebec quanto à recolha e à proteção dos dados pessoais." },
      { question: "O que é a autenticação de dois fatores (2FA)?", options: ["Utilizar dois computadores", "Uma camada de segurança adicional que combina dois métodos de verificação", "Ter duas palavras-passe idênticas", "Uma funcionalidade obsoleta"], explanation: "A 2FA acrescenta uma segunda verificação (ex. código SMS) além da palavra-passe para reforçar a segurança de acesso." },
      { question: "Por que uma cópia de segurança não testada não é uma verdadeira proteção?", options: ["Porque ocupa demasiado espaço", "Porque não se sabe se poderá realmente ser restaurada em caso de necessidade", "Porque as cópias de segurança são ilegais", "Nunca é um problema"], explanation: "Uma cópia de segurança deve ser testada regularmente para garantir que funcionará realmente durante uma restauração de emergência." },
    ],
  },
  {
    title: "Gestão de bases de dados",
    objectives: [
      "Diferenciar bases de dados relacionais e NoSQL",
      "Escrever consultas SQL de base",
      "Compreender os princípios de normalização dos dados",
    ],
    content: [
      "As bases de dados relacionais (MySQL, PostgreSQL, SQL Server) organizam os dados em tabelas ligadas por chaves, garantindo a coerência através de restrições rigorosas. As bases NoSQL (MongoDB, Firebase) oferecem mais flexibilidade para dados não estruturados ou de muito grande escala.",
      "A linguagem SQL (Structured Query Language) permite consultar, inserir, modificar e eliminar dados. Os comandos de base — SELECT, INSERT, UPDATE, DELETE, JOIN — cobrem a maioria das necessidades diárias de um analista ou programador.",
      "A normalização dos dados visa eliminar a redundância e garantir a integridade referencial. Uma base bem concebida facilita a manutenção, melhora o desempenho e reduz os riscos de incoerência entre os dados.",
    ],
    keyTakeaways: [
      "A escolha relacional vs NoSQL depende da estrutura dos dados e da escala do projeto",
      "SQL continua a ser a competência mais transferível entre todos os empregos técnicos",
      "Uma base mal normalizada cria problemas de coerência que se agravam com o tempo",
    ],
    resourceLabels: [
      "PostgreSQL Tutorial oficial",
      "SQLBolt — Aprender SQL interativamente",
    ],
    quiz: [
      { question: "Que comando SQL permite recuperar dados numa tabela?", options: ["GET", "SELECT", "FETCH", "PULL"], explanation: "SELECT é o comando SQL fundamental para consultar e recuperar dados de uma ou várias tabelas." },
      { question: "Que tipo de base de dados é o MongoDB?", options: ["Relacional", "NoSQL", "Ficheiro de texto", "Folha de cálculo"], explanation: "O MongoDB é uma base de dados NoSQL orientada a documentos, que oferece flexibilidade para dados não estruturados." },
      { question: "Qual é o objetivo principal da normalização dos dados?", options: ["Abrandar as consultas", "Eliminar a redundância e garantir a integridade referencial", "Aumentar o número de tabelas inutilmente", "Remover todas as relações entre tabelas"], explanation: "A normalização estrutura os dados para evitar a duplicação e manter a coerência entre as tabelas." },
      { question: "Que comando SQL serve para inserir novos dados?", options: ["ADD", "INSERT", "NEW", "CREATE ROW"], explanation: "INSERT é o comando utilizado para adicionar novas linhas de dados numa tabela." },
      { question: "Por que o SQL é considerado uma competência muito transferível?", options: ["Porque só é usado num único software", "Porque é usado na maioria dos empregos técnicos que envolvem dados", "Porque está obsoleto", "Porque substitui todas as outras linguagens"], explanation: "O SQL é amplamente usado em numerosos papéis técnicos (analista, programador, data scientist), o que faz dele uma competência muito procurada." },
      { question: "O que permite uma chave estrangeira numa base relacional?", options: ["Eliminar uma tabela", "Ligar uma tabela a outra e garantir a integridade referencial", "Cifrar os dados", "Aumentar a velocidade da internet"], explanation: "Uma chave estrangeira estabelece uma relação entre duas tabelas e assegura a coerência dos dados ligados." },
    ],
  },
  {
    title: "Desenvolvimento web e aplicações",
    objectives: [
      "Compreender a diferença entre front-end e back-end",
      "Identificar as linguagens e frameworks comuns",
      "Seguir o ciclo de vida de uma aplicação web simples",
    ],
    content: [
      "O front-end diz respeito a tudo o que o utilizador vê e manipula diretamente: HTML para a estrutura, CSS para o estilo, JavaScript para a interatividade, com frameworks como React ou Vue.js. O back-end gere a lógica do servidor, as bases de dados e as API, com linguagens como Node.js, Python ou Java.",
      "Uma aplicação web moderna segue geralmente uma arquitetura cliente-servidor: o navegador (cliente) envia pedidos a um servidor que processa a lógica de negócio e devolve dados, frequentemente em formato JSON através de uma API REST.",
      "O ciclo de desenvolvimento inclui a conceção, a codificação, os testes, a implantação e a manutenção. As metodologias ágeis permitem entregar funcionalidades por pequenas iterações em vez de num só bloco final.",
    ],
    keyTakeaways: [
      "Front-end e back-end são complementares, não intercambiáveis",
      "Uma API bem concebida é a chave de uma arquitetura web sustentável",
      "A implantação contínua reduz os riscos ligados às colocações em produção",
    ],
    resourceLabels: [
      "MDN Web Docs — Referência de desenvolvimento web",
      "freeCodeCamp — Currículo de desenvolvimento web gratuito",
    ],
    quiz: [
      { question: "Que linguagem é utilizada para estruturar o conteúdo de uma página web?", options: ["CSS", "HTML", "JavaScript", "SQL"], explanation: "HTML (HyperText Markup Language) define a estrutura e o conteúdo de uma página web." },
      { question: "O que gere principalmente o back-end de uma aplicação web?", options: ["O estilo visual", "A lógica do servidor, as bases de dados e as API", "Apenas as imagens", "As animações CSS"], explanation: "O back-end processa a lógica de negócio do lado do servidor, gere os dados e expõe API para o front-end." },
      { question: "Que formato é comummente utilizado para trocar dados através de uma API REST?", options: ["JSON", "MP3", "PDF", "EXE"], explanation: "JSON (JavaScript Object Notation) é o formato padrão leve para a troca de dados entre cliente e servidor." },
      { question: "Que arquitetura é típica de uma aplicação web moderna?", options: ["Cliente-servidor", "Apenas par a par", "Nenhuma arquitetura definida", "Mainframe centralizado dos anos 1970"], explanation: "A arquitetura cliente-servidor separa o navegador (cliente) do servidor que processa os pedidos e a lógica." },
      { question: "Qual é a vantagem das metodologias ágeis no desenvolvimento web?", options: ["Entregar tudo num só bloco final", "Entregar funcionalidades por pequenas iterações", "Evitar completamente os testes", "Trabalhar sem qualquer planeamento"], explanation: "A agilidade permite entregar progressivamente, adaptar-se aos comentários e reduzir os riscos de grandes projetos monolíticos." },
      { question: "Qual destes elementos é um framework front-end mencionado no módulo?", options: ["React", "MySQL", "Docker", "Linux"], explanation: "React é um framework JavaScript utilizado para construir interfaces de utilizador do lado front-end." },
    ],
  },
  {
    title: "Gestão de projetos TI (Agile/Scrum)",
    objectives: [
      "Compreender os princípios do manifesto ágil",
      "Dominar os papéis e rituais Scrum",
      "Utilizar uma ferramenta de gestão de projetos ágil (Jira, Trello)",
    ],
    content: [
      "O manifesto ágil privilegia a colaboração, a adaptabilidade e a entrega iterativa em vez do planeamento rígido e da documentação exaustiva. Esta abordagem responde melhor às necessidades mutáveis dos projetos tecnológicos modernos.",
      "O Scrum estrutura o trabalho em sprints (geralmente 2 semanas) com papéis definidos: o Product Owner prioriza as necessidades, o Scrum Master facilita o processo, e a equipa de desenvolvimento entrega as funcionalidades. Os rituais chave são o sprint planning, o daily standup, a sprint review e a retrospetiva.",
      "Ferramentas como Jira, Trello ou Azure DevOps permitem visualizar o backlog, seguir o avanço através de quadros Kanban e medir a velocidade da equipa ao longo dos sprints.",
    ],
    keyTakeaways: [
      "A agilidade é uma filosofia de colaboração, não apenas um conjunto de ferramentas",
      "Os rituais Scrum servem para manter a transparência, não para criar burocracia",
      "A retrospetiva é o ritual mais frequentemente negligenciado mas o mais valioso para melhorar",
    ],
    resourceLabels: [
      "Scrum.org — Guia Scrum oficial (gratuito)",
      "Atlassian Agile Coach",
    ],
    quiz: [
      { question: "Que papel prioriza as necessidades numa equipa Scrum?", options: ["O Scrum Master", "O Product Owner", "O programador sénior", "Apenas o cliente final"], explanation: "O Product Owner é responsável por priorizar o backlog e por representar as necessidades do negócio." },
      { question: "Qual é a duração típica de um sprint Scrum?", options: ["1 dia", "2 semanas", "6 meses", "1 ano"], explanation: "Um sprint dura geralmente 2 semanas, embora isso possa variar entre 1 e 4 semanas conforme a equipa." },
      { question: "O que privilegia o manifesto ágil face à documentação exaustiva?", options: ["Ainda mais documentação", "A colaboração e a adaptabilidade", "A ausência total de comunicação", "O trabalho isolado"], explanation: "O manifesto ágil valoriza os indivíduos, as interações e a adaptabilidade em vez de uma documentação rígida." },
      { question: "Que ritual Scrum é frequentemente negligenciado mas particularmente valioso segundo o módulo?", options: ["O daily standup", "A retrospetiva", "O sprint planning", "A pausa para o café"], explanation: "A retrospetiva, que permite à equipa melhorar continuamente, é frequentemente subestimada apesar do seu grande valor." },
      { question: "Que ferramenta é mencionada para visualizar um backlog Kanban?", options: ["Photoshop", "Trello", "Apenas Excel", "PowerPoint"], explanation: "O Trello é uma ferramenta popular que oferece quadros Kanban para visualizar e seguir o avanço das tarefas." },
      { question: "Qual é o papel do Scrum Master?", options: ["Codificar todas as funcionalidades sozinho", "Facilitar o processo Scrum para a equipa", "Decidir sozinho o orçamento", "Substituir o cliente"], explanation: "O Scrum Master facilita os rituais e retira os obstáculos para permitir à equipa trabalhar eficazmente." },
    ],
  },
  {
    title: "Projeto final: transformação digital de empresa",
    objectives: [
      "Auditar as necessidades tecnológicas de uma organização",
      "Propor um plano de transformação digital realista",
      "Apresentar um roteiro técnico e orçamental",
    ],
    content: [
      "O projeto final pede para analisar uma organização (real ou fictícia) e identificar as oportunidades de digitalização: automação de processos manuais, migração para a nuvem, adoção de ferramentas colaborativas ou integração de IA para ganhar em eficiência.",
      "O roteiro deve hierarquizar as iniciativas por impacto e complexidade, com um calendário realista e um orçamento estimado. As transformações mais bem-sucedidas começam por ganhos rápidos (quick wins) antes de abordar mudanças estruturais mais profundas.",
      "A gestão da mudança é tão importante quanto a tecnologia em si: envolver as equipas afetadas, formar os utilizadores e comunicar os benefícios concretos determinam frequentemente o sucesso ou o fracasso de uma transformação digital.",
    ],
    keyTakeaways: [
      "Uma transformação digital bem-sucedida começa pelas necessidades do negócio, não pela tecnologia",
      "Priorizar os ganhos rápidos constrói a confiança para as mudanças mais ambiciosas",
      "A resistência à mudança humana é frequentemente o maior obstáculo, não a técnica",
    ],
    resourceLabels: [
      "MIT Sloan — Investigação sobre a transformação digital",
    ],
    quiz: [
      { question: "Por que deve começar uma transformação digital bem-sucedida?", options: ["A compra da tecnologia mais cara", "As necessidades do negócio", "O despedimento do pessoal", "Apenas a contratação de um consultor externo"], explanation: "Uma transformação digital eficaz parte sempre das necessidades reais da organização, não da tecnologia em si." },
      { question: "O que designa um 'quick win' num roteiro de transformação?", options: ["Um fracasso rápido", "Um ganho rápido e visível que constrói a confiança", "Um investimento a muito longo prazo", "Uma perda financeira aceitável"], explanation: "Os quick wins são resultados rápidos e tangíveis que demonstram o valor da transformação e facilitam a adesão." },
      { question: "Qual é frequentemente o maior obstáculo a uma transformação digital?", options: ["A falta de wifi", "A resistência à mudança humana", "O preço dos computadores", "O clima"], explanation: "A resistência humana à mudança é geralmente um obstáculo mais importante que os desafios puramente técnicos." },
      { question: "O que deve incluir um roteiro de transformação digital?", options: ["Apenas uma lista de software", "Um calendário realista e um orçamento estimado", "Nenhum planeamento temporal", "Apenas promessas verbais"], explanation: "Um roteiro sério hierarquiza as iniciativas com um calendário e um orçamento claros." },
      { question: "Por que a formação dos utilizadores é crucial numa transformação digital?", options: ["Não é necessária", "Porque a adoção das novas ferramentas depende da compreensão dos utilizadores", "Apenas para respeitar uma lei", "Porque é gratuita"], explanation: "Sem uma formação adequada, mesmo as melhores ferramentas tecnológicas fracassam por falta de adoção pelos utilizadores." },
      { question: "Que tipo de iniciativa é recomendado antes de abordar mudanças estruturais profundas?", options: ["Mudanças radicais imediatas", "Ganhos rápidos (quick wins)", "Nenhuma ação prévia", "O despedimento da equipa TI"], explanation: "Começar por ganhos rápidos cria a confiança necessária antes de empreender transformações mais complexas." },
    ],
  },
];

const de: CourseTranslation = [
  {
    title: "Einführung in Computersysteme",
    objectives: [
      "Die Hardware- und Softwarearchitektur eines Systems verstehen",
      "Die wichtigsten Betriebssysteme unterscheiden (Windows, Linux, macOS)",
      "Die Grundlagen des Computernetzwerks beherrschen",
    ],
    content: [
      "Ein Computersystem kombiniert Hardware (Prozessor, Speicher, Datenträger) und Software (Betriebssystem, Anwendungen). Das Verständnis dieser grundlegenden Architektur ist wesentlich, bevor man fortgeschrittenere Themen wie Cloud oder Cybersicherheit angeht.",
      "Linux dominiert Server und Cloud Computing dank seiner Stabilität und seiner Kosten, während Windows auf betrieblichen Arbeitsplätzen dominant bleibt. macOS wird in kreativen Bereichen und der mobilen Entwicklung (iOS) bevorzugt.",
      "Computernetzwerke beruhen auf dem TCP/IP-Modell: Jedes Gerät besitzt eine IP-Adresse, Daten zirkulieren in Paketen, und Protokolle wie HTTP, DNS und DHCP strukturieren die Kommunikation zwischen Maschinen.",
    ],
    keyTakeaways: [
      "Jede fortgeschrittene IT-Kompetenz beruht auf einem soliden Verständnis der Hardware und des Betriebssystems",
      "Linux ist die Grundlage des Großteils der weltweiten Cloud-Infrastruktur",
      "TCP/IP zu verstehen ist unverzichtbar, um Netzwerkprobleme zu diagnostizieren",
    ],
    resourceLabels: [
      "Microsoft Learn — IT-Grundlagen",
      "Linux Foundation — Kostenlose Einführung in Linux",
    ],
    quiz: [
      { question: "Welches Betriebssystem dominiert mehrheitlich die Server und die Cloud?", options: ["Windows", "Linux", "macOS", "Android"], explanation: "Linux ist auf Servern und in der Cloud dominant dank seiner Stabilität, seiner Sicherheit und seiner Kosten (oft kostenlos)." },
      { question: "Auf welchem Modell beruhen moderne Computernetzwerke?", options: ["HTML/CSS", "TCP/IP", "USB/HDMI", "RAM/ROM"], explanation: "Das TCP/IP-Modell strukturiert die Kommunikation zwischen Geräten über IP-Adressen und den Transport von Datenpaketen." },
      { question: "Welches Protokoll ist für die Auflösung von Domainnamen in IP-Adressen verantwortlich?", options: ["HTTP", "DNS", "FTP", "SMTP"], explanation: "DNS (Domain Name System) übersetzt lesbare Domainnamen in die von Maschinen verwendeten IP-Adressen." },
      { question: "Welches Betriebssystem wird für die iOS-Entwicklung bevorzugt?", options: ["Linux", "macOS", "Windows Server", "Chrome OS"], explanation: "macOS ist erforderlich, um iOS-Anwendungen über Xcode, das Werkzeug von Apple, zu entwickeln." },
      { question: "Was sind die zwei grundlegenden Komponenten eines Computersystems?", options: ["Das Internet und die Tastatur", "Die Hardware und die Software", "Die Maus und der Bildschirm", "WLAN und Bluetooth"], explanation: "Ein Computersystem kombiniert immer Hardware und Software, um zu funktionieren." },
      { question: "Was transportieren die Daten in einem TCP/IP-Netzwerk?", options: ["Pakete", "Nur PDF-Dateien", "Virtuelle CD-ROMs", "Nichts, alles ist sofort"], explanation: "Daten zirkulieren in Form aufgeteilter Pakete, die geleitet und dann am Ziel wieder zusammengesetzt werden." },
    ],
  },
  {
    title: "Cloud Computing (AWS, Azure, GCP)",
    objectives: [
      "Die Modelle IaaS, PaaS und SaaS unterscheiden",
      "Die drei wichtigsten Cloud-Anbieter vergleichen",
      "Eine einfache Ressource in einer öffentlichen Cloud bereitstellen",
    ],
    content: [
      "Cloud Computing ermöglicht den Zugriff auf Computing-Ressourcen (Server, Speicher, Datenbanken) nach Bedarf, ohne die physische Infrastruktur zu besitzen. Die drei Hauptmodelle sind IaaS (rohe Infrastruktur), PaaS (Entwicklungsplattform) und SaaS (gebrauchsfertige Software).",
      "AWS (Amazon Web Services) dominiert den Weltmarkt mit dem breitesten Dienstleistungsangebot. Microsoft Azure integriert sich natürlich in Unternehmen, die bereits im Microsoft-Ökosystem sind. Google Cloud Platform (GCP) zeichnet sich durch seine Daten- und Künstliche-Intelligenz-Werkzeuge aus.",
      "In Kanada bieten mehrere Anbieter mittlerweile lokale Rechenzentren an (Canada Central für Azure, ca-central-1 für AWS), ein wichtiges Thema für Organisationen, die Anforderungen an die Datensouveränität unterliegen.",
    ],
    keyTakeaways: [
      "Die Wahl des Cloud-Anbieters hängt vom bestehenden Ökosystem und den Kompetenzen des Teams ab",
      "Die nutzungsbasierte Abrechnung erfordert eine ständige Kostenüberwachung",
      "Die Datenresidenz ist ein wichtiges regulatorisches Thema in Kanada",
    ],
    resourceLabels: [
      "AWS Skill Builder — Kostenlose Schulung",
      "Microsoft Learn — Azure Fundamentals",
    ],
    quiz: [
      { question: "Was bedeutet IaaS im Kontext des Cloud Computing?", options: ["Infrastructure as a Service", "Internet as a Solution", "Identity as a System", "Integration as a Standard"], explanation: "IaaS (Infrastructure as a Service) stellt rohe Ressourcen wie virtuelle Server ohne Plattformverwaltung bereit." },
      { question: "Welcher Cloud-Anbieter dominiert laut Modul den Weltmarkt?", options: ["Google Cloud Platform", "AWS", "IBM Cloud", "Oracle Cloud"], explanation: "AWS (Amazon Web Services) wird als der Weltmarktführer mit dem breitesten Dienstleistungsangebot beschrieben." },
      { question: "Wofür zeichnet sich Google Cloud Platform (GCP) besonders aus?", options: ["Videospiele", "Daten- und Künstliche-Intelligenz-Werkzeuge", "Einzelhandel", "Druckerei"], explanation: "GCP ist für seine fortgeschrittenen Werkzeuge zur Datenanalyse und Künstlichen Intelligenz bekannt." },
      { question: "Welches Cloud-Modell stellt gebrauchsfertige Software ohne technische Verwaltung bereit?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], explanation: "SaaS (Software as a Service) liefert eine vollständige, gebrauchsfertige Anwendung wie Gmail oder Microsoft 365." },
      { question: "Warum ist die Datenresidenz ein wichtiges Thema in Kanada?", options: ["Aus ästhetischen Gründen", "Wegen regulatorischer Anforderungen an die Datensouveränität", "Weil die Cloud in Kanada nicht existiert", "Es ist kein echtes Thema"], explanation: "Einige Organisationen müssen garantieren, dass ihre Daten aus rechtlichen Gründen in kanadischen Rechenzentren gehostet bleiben." },
      { question: "Welche Art der Abrechnung ist typisch für das Cloud Computing?", options: ["Einmalige lebenslange Zahlung", "Nutzungsbasierte Abrechnung", "Für immer kostenlos", "Nur ein obligatorisches Jahresabonnement"], explanation: "Die nutzungsbasierte Abrechnung (Pay-as-you-go) ist das Standardmodell der Cloud und erfordert eine Kostenüberwachung." },
    ],
  },
  {
    title: "Künstliche Intelligenz & Machine Learning",
    objectives: [
      "Den Unterschied zwischen KI, Machine Learning und Deep Learning verstehen",
      "Konkrete KI-Anwendungsfälle im Unternehmen identifizieren",
      "Generative KI-Werkzeuge in einem beruflichen Kontext nutzen",
    ],
    content: [
      "Künstliche Intelligenz ist das allgemeine Feld, das darauf abzielt, intelligente Verhaltensweisen durch eine Maschine zu reproduzieren. Machine Learning ist eine Unterkategorie, in der das System aus Daten lernt, anstatt explizit programmiert zu werden. Deep Learning verwendet neuronale Netze, um komplexe Daten wie Bilder oder Sprache zu verarbeiten.",
      "Im Unternehmen wird KI für die Automatisierung des Kundenservice (Chatbots), die Nachfrageprognose, die Betrugserkennung und die Marketingpersonalisierung eingesetzt. Generative KI-Werkzeuge wie ChatGPT oder Copilot transformieren die Produktivität beim Schreiben, Codieren und Analysieren.",
      "Die verantwortungsvolle Einführung von KI erfordert das Verständnis ihrer Grenzen: Verzerrungen in den Trainingsdaten, Halluzinationen in generativen Modellen und ethische Fragen im Zusammenhang mit automatisierter Entscheidungsfindung.",
    ],
    keyTakeaways: [
      "Generative KI ist ein Produktivitätswerkzeug, kein Ersatz für menschliches Urteilsvermögen",
      "Die Grenzen der KI zu verstehen ist genauso wichtig wie ihre Fähigkeiten zu kennen",
      "Die rentabelsten Anwendungsfälle sind oft repetitive Aufgaben mit geringem Risiko",
    ],
    resourceLabels: [
      "Google AI — Einführungskurs in Machine Learning",
      "Microsoft Learn — Generative KI für Fachleute",
    ],
    quiz: [
      { question: "Wie ist das Verhältnis zwischen KI, Machine Learning und Deep Learning?", options: ["Es sind drei völlig getrennte Felder", "Machine Learning ist eine Unterkategorie der KI, und Deep Learning eine Unterkategorie des Machine Learning", "Deep Learning umfasst die KI", "Es gibt keinen Unterschied zwischen diesen Begriffen"], explanation: "KI ist das allgemeine Feld, Machine Learning ist eine Unterkategorie davon, und Deep Learning eine spezifische Technik des Machine Learning." },
      { question: "Was ist eine 'Halluzination' in einem generativen KI-Modell?", options: ["Ein visueller Fehler auf dem Bildschirm", "Eine falsche Information, die vom Modell selbstsicher generiert wird", "Ein Computervirus", "Eine deaktivierte Funktion"], explanation: "Eine Halluzination entspricht einer falschen oder erfundenen Information, die das Modell als wahr präsentiert." },
      { question: "Was ist einer der im Modul genannten KI-Anwendungsfälle im Unternehmen?", options: ["Die Betrugserkennung", "Die Möbelherstellung", "Die Büroreinigung", "Nur die Postzustellung"], explanation: "Die Betrugserkennung ist ein gängiger KI-Anwendungsfall, insbesondere im Finanzsektor." },
      { question: "Generative KI sollte betrachtet werden als:", options: ["Ein vollständiger Ersatz für menschliches Urteilsvermögen", "Ein Produktivitätswerkzeug, das das menschliche Urteilsvermögen ergänzt", "Eine Technologie ohne jede Grenze", "Nutzlos im Unternehmen"], explanation: "Generative KI wird als Werkzeug zur Steigerung der Produktivität präsentiert, nicht zum Ersatz menschlichen Urteilsvermögens." },
      { question: "Was kann Verzerrungen in einem KI-System verursachen?", options: ["Die Bildschirmfarbe", "Die verwendeten Trainingsdaten", "Die Anzahl der Nutzer", "Der Softwarepreis"], explanation: "Verzerrungen in den Trainingsdaten spiegeln sich direkt in den Vorhersagen und Ergebnissen des KI-Modells wider." },
      { question: "Welche Art von Aufgabe ist mit KI oft am rentabelsten zu automatisieren?", options: ["Nur komplexe strategische Entscheidungen", "Repetitive Aufgaben mit geringem Risiko", "Nur kreative Aufgaben", "Keine Aufgabe sollte automatisiert werden"], explanation: "Repetitive Aufgaben mit geringem Risiko bieten die beste Kapitalrendite für die KI-Automatisierung." },
    ],
  },
  {
    title: "Cybersicherheit & Datenschutz",
    objectives: [
      "Die wichtigsten IT-Bedrohungen identifizieren (Phishing, Ransomware)",
      "Grundlegende Sicherheits-Best-Practices anwenden",
      "Die kanadischen gesetzlichen Verpflichtungen bezüglich Daten verstehen",
    ],
    content: [
      "Phishing bleibt der häufigste Angriffsvektor, der menschliches Versagen statt einer technischen Schwachstelle ausnutzt. Ransomware verschlüsselt die Daten einer Organisation und verlangt ein Lösegeld — ihre Auswirkung kann ohne aktuelle, getestete Backups katastrophal sein.",
      "Grundlegende Best Practices umfassen die Zwei-Faktor-Authentifizierung (2FA), eindeutige und komplexe Passwörter, die über einen Passwort-Manager verwaltet werden, regelmäßige Systemaktualisierungen und ein regelmäßiges Backup nach der 3-2-1-Regel (3 Kopien, 2 verschiedene Medien, 1 außer Haus).",
      "In Kanada erlegen das Gesetz zum Schutz personenbezogener Daten und elektronischer Dokumente (PIPEDA) und das Gesetz 25 in Quebec strenge Verpflichtungen bezüglich der Erhebung, Speicherung und Benachrichtigung im Falle eines Lecks personenbezogener Daten auf.",
    ],
    keyTakeaways: [
      "Menschliches Versagen bleibt die Ursache Nummer eins für Sicherheitsvorfälle",
      "Ein ungetestetes Backup ist kein echter Schutz",
      "Die Einhaltung von Gesetz 25 und PIPEDA ist verpflichtend, nicht optional, für jede kanadische Organisation",
    ],
    resourceLabels: [
      "Kanadisches Zentrum für Cybersicherheit",
      "CAI / Gesetz 25 — Compliance-Leitfaden Quebec",
    ],
    quiz: [
      { question: "Was ist laut Modul der häufigste Angriffsvektor?", options: ["Phishing", "Der physische Angriff auf den Server", "Der Stromausfall", "Nur der Diebstahl von Hardware"], explanation: "Phishing nutzt menschliches Versagen aus und bleibt statistisch der häufigste Angriffsvektor." },
      { question: "Was macht Ransomware?", options: ["Sie beschleunigt den Computer", "Sie verschlüsselt die Daten und verlangt ein Lösegeld", "Sie verbessert die Sicherheit", "Sie entfernt bestehende Viren"], explanation: "Ransomware verschlüsselt die Daten des Opfers und verlangt eine Zahlung, um sie zu entschlüsseln." },
      { question: "Was bedeutet die 3-2-1-Backup-Regel?", options: ["3 Passwörter, 2 E-Mails, 1 Konto", "3 Kopien, 2 verschiedene Medien, 1 Kopie außer Haus", "3 Stunden, 2 Tage, 1 Woche", "Keine besondere Bedeutung"], explanation: "Die 3-2-1-Regel gewährleistet eine Datenresilienz: 3 Kopien auf 2 verschiedenen Medien, davon 1 außer Haus aufbewahrt." },
      { question: "Welches Quebecer Gesetz regelt den Schutz personenbezogener Daten?", options: ["Das Gesetz 25", "Nur das Strafgesetzbuch", "Das Patentgesetz", "Das Tabakgesetz"], explanation: "Das Gesetz 25 erlegt in Quebec strenge Verpflichtungen bezüglich der Erhebung und des Schutzes personenbezogener Daten auf." },
      { question: "Was ist die Zwei-Faktor-Authentifizierung (2FA)?", options: ["Zwei Computer verwenden", "Eine zusätzliche Sicherheitsebene, die zwei Verifizierungsmethoden kombiniert", "Zwei identische Passwörter haben", "Eine veraltete Funktion"], explanation: "2FA fügt eine zweite Verifizierung (z. B. SMS-Code) zusätzlich zum Passwort hinzu, um die Zugriffssicherheit zu stärken." },
      { question: "Warum ist ein ungetestetes Backup kein echter Schutz?", options: ["Weil es zu viel Platz einnimmt", "Weil man nicht weiß, ob es bei Bedarf tatsächlich wiederhergestellt werden kann", "Weil Backups illegal sind", "Es ist nie ein Problem"], explanation: "Ein Backup muss regelmäßig getestet werden, um zu gewährleisten, dass es bei einer Notfallwiederherstellung tatsächlich funktioniert." },
    ],
  },
  {
    title: "Datenbankverwaltung",
    objectives: [
      "Relationale und NoSQL-Datenbanken unterscheiden",
      "Grundlegende SQL-Abfragen schreiben",
      "Die Prinzipien der Datennormalisierung verstehen",
    ],
    content: [
      "Relationale Datenbanken (MySQL, PostgreSQL, SQL Server) organisieren Daten in durch Schlüssel verknüpften Tabellen und gewährleisten die Konsistenz durch strenge Einschränkungen. NoSQL-Datenbanken (MongoDB, Firebase) bieten mehr Flexibilität für unstrukturierte Daten oder sehr große Maßstäbe.",
      "Die Sprache SQL (Structured Query Language) ermöglicht es, Daten abzufragen, einzufügen, zu ändern und zu löschen. Die Grundbefehle — SELECT, INSERT, UPDATE, DELETE, JOIN — decken die meisten täglichen Bedürfnisse eines Analysten oder Entwicklers ab.",
      "Die Datennormalisierung zielt darauf ab, Redundanz zu beseitigen und die referenzielle Integrität zu gewährleisten. Eine gut konzipierte Datenbank erleichtert die Wartung, verbessert die Leistung und verringert das Risiko von Inkonsistenzen zwischen den Daten.",
    ],
    keyTakeaways: [
      "Die Wahl relational vs NoSQL hängt von der Datenstruktur und dem Projektmaßstab ab",
      "SQL bleibt die übertragbarste Kompetenz über alle technischen Jobs hinweg",
      "Eine schlecht normalisierte Datenbank erzeugt Konsistenzprobleme, die sich mit der Zeit verschlimmern",
    ],
    resourceLabels: [
      "Offizielles PostgreSQL-Tutorial",
      "SQLBolt — SQL interaktiv lernen",
    ],
    quiz: [
      { question: "Welcher SQL-Befehl ermöglicht das Abrufen von Daten in einer Tabelle?", options: ["GET", "SELECT", "FETCH", "PULL"], explanation: "SELECT ist der grundlegende SQL-Befehl, um Daten aus einer oder mehreren Tabellen abzufragen und abzurufen." },
      { question: "Welche Art von Datenbank ist MongoDB?", options: ["Relational", "NoSQL", "Textdatei", "Tabellenkalkulation"], explanation: "MongoDB ist eine dokumentenorientierte NoSQL-Datenbank, die Flexibilität für unstrukturierte Daten bietet." },
      { question: "Was ist das Hauptziel der Datennormalisierung?", options: ["Abfragen verlangsamen", "Redundanz beseitigen und die referenzielle Integrität gewährleisten", "Die Anzahl der Tabellen unnötig erhöhen", "Alle Beziehungen zwischen Tabellen entfernen"], explanation: "Die Normalisierung strukturiert Daten, um Duplikate zu vermeiden und die Konsistenz zwischen den Tabellen zu wahren." },
      { question: "Welcher SQL-Befehl dient dazu, neue Daten einzufügen?", options: ["ADD", "INSERT", "NEW", "CREATE ROW"], explanation: "INSERT ist der Befehl, der verwendet wird, um neue Datenzeilen in eine Tabelle hinzuzufügen." },
      { question: "Warum gilt SQL als eine sehr übertragbare Kompetenz?", options: ["Weil es nur in einer einzigen Software verwendet wird", "Weil es in den meisten technischen Jobs verwendet wird, die Daten betreffen", "Weil es veraltet ist", "Weil es alle anderen Sprachen ersetzt"], explanation: "SQL wird in zahlreichen technischen Rollen (Analyst, Entwickler, Data Scientist) weit verbreitet verwendet, was es zu einer sehr gefragten Kompetenz macht." },
      { question: "Was ermöglicht ein Fremdschlüssel in einer relationalen Datenbank?", options: ["Eine Tabelle zu löschen", "Eine Tabelle mit einer anderen zu verknüpfen und die referenzielle Integrität zu gewährleisten", "Daten zu verschlüsseln", "Die Internetgeschwindigkeit zu erhöhen"], explanation: "Ein Fremdschlüssel stellt eine Beziehung zwischen zwei Tabellen her und sichert die Konsistenz der verknüpften Daten." },
    ],
  },
  {
    title: "Web- & Anwendungsentwicklung",
    objectives: [
      "Den Unterschied zwischen Front-End und Back-End verstehen",
      "Gängige Sprachen und Frameworks identifizieren",
      "Den Lebenszyklus einer einfachen Webanwendung verfolgen",
    ],
    content: [
      "Das Front-End betrifft alles, was der Nutzer direkt sieht und manipuliert: HTML für die Struktur, CSS für den Stil, JavaScript für die Interaktivität, mit Frameworks wie React oder Vue.js. Das Back-End verwaltet die Serverlogik, die Datenbanken und die APIs, mit Sprachen wie Node.js, Python oder Java.",
      "Eine moderne Webanwendung folgt im Allgemeinen einer Client-Server-Architektur: Der Browser (Client) sendet Anfragen an einen Server, der die Geschäftslogik verarbeitet und Daten zurückgibt, oft im JSON-Format über eine REST-API.",
      "Der Entwicklungszyklus umfasst die Konzeption, die Codierung, die Tests, die Bereitstellung und die Wartung. Agile Methoden ermöglichen es, Funktionen in kleinen Iterationen statt in einem einzigen finalen Block zu liefern.",
    ],
    keyTakeaways: [
      "Front-End und Back-End sind komplementär, nicht austauschbar",
      "Eine gut konzipierte API ist der Schlüssel zu einer wartbaren Webarchitektur",
      "Continuous Deployment verringert die Risiken von Produktionsveröffentlichungen",
    ],
    resourceLabels: [
      "MDN Web Docs — Webentwicklungsreferenz",
      "freeCodeCamp — Kostenloser Webentwicklungslehrplan",
    ],
    quiz: [
      { question: "Welche Sprache wird verwendet, um den Inhalt einer Webseite zu strukturieren?", options: ["CSS", "HTML", "JavaScript", "SQL"], explanation: "HTML (HyperText Markup Language) definiert die Struktur und den Inhalt einer Webseite." },
      { question: "Was verwaltet das Back-End einer Webanwendung hauptsächlich?", options: ["Den visuellen Stil", "Die Serverlogik, die Datenbanken und die APIs", "Nur die Bilder", "Die CSS-Animationen"], explanation: "Das Back-End verarbeitet die serverseitige Geschäftslogik, verwaltet die Daten und stellt APIs für das Front-End bereit." },
      { question: "Welches Format wird üblicherweise verwendet, um Daten über eine REST-API auszutauschen?", options: ["JSON", "MP3", "PDF", "EXE"], explanation: "JSON (JavaScript Object Notation) ist das leichtgewichtige Standardformat für den Datenaustausch zwischen Client und Server." },
      { question: "Welche Architektur ist typisch für eine moderne Webanwendung?", options: ["Client-Server", "Nur Peer-to-Peer", "Keine definierte Architektur", "Zentralisierter Großrechner der 1970er"], explanation: "Die Client-Server-Architektur trennt den Browser (Client) vom Server, der die Anfragen und die Logik verarbeitet." },
      { question: "Was ist der Vorteil agiler Methoden in der Webentwicklung?", options: ["Alles in einem einzigen finalen Block liefern", "Funktionen in kleinen Iterationen liefern", "Tests vollständig vermeiden", "Ohne jede Planung arbeiten"], explanation: "Agilität ermöglicht schrittweise Lieferung, Anpassung an Feedback und verringert die Risiken großer monolithischer Projekte." },
      { question: "Welches dieser Elemente ist ein im Modul genanntes Front-End-Framework?", options: ["React", "MySQL", "Docker", "Linux"], explanation: "React ist ein JavaScript-Framework, das verwendet wird, um Benutzeroberflächen auf der Front-End-Seite zu erstellen." },
    ],
  },
  {
    title: "IT-Projektmanagement (Agile/Scrum)",
    objectives: [
      "Die Prinzipien des agilen Manifests verstehen",
      "Die Scrum-Rollen und -Rituale beherrschen",
      "Ein agiles Projektmanagement-Werkzeug nutzen (Jira, Trello)",
    ],
    content: [
      "Das agile Manifest bevorzugt Zusammenarbeit, Anpassungsfähigkeit und iterative Lieferung gegenüber starrer Planung und erschöpfender Dokumentation. Dieser Ansatz erfüllt die sich ändernden Bedürfnisse moderner Technologieprojekte besser.",
      "Scrum strukturiert die Arbeit in Sprints (in der Regel 2 Wochen) mit definierten Rollen: Der Product Owner priorisiert die Bedürfnisse, der Scrum Master erleichtert den Prozess, und das Entwicklungsteam liefert die Funktionen. Die zentralen Rituale sind das Sprint Planning, das Daily Standup, der Sprint Review und die Retrospektive.",
      "Werkzeuge wie Jira, Trello oder Azure DevOps ermöglichen es, das Backlog zu visualisieren, den Fortschritt über Kanban-Boards zu verfolgen und die Velocity des Teams über die Sprints hinweg zu messen.",
    ],
    keyTakeaways: [
      "Agilität ist eine Philosophie der Zusammenarbeit, nicht nur ein Satz von Werkzeugen",
      "Scrum-Rituale dienen dazu, Transparenz zu wahren, nicht Bürokratie zu schaffen",
      "Die Retrospektive ist das am häufigsten vernachlässigte, aber wertvollste Ritual zur Verbesserung",
    ],
    resourceLabels: [
      "Scrum.org — Offizieller Scrum-Leitfaden (kostenlos)",
      "Atlassian Agile Coach",
    ],
    quiz: [
      { question: "Welche Rolle priorisiert die Bedürfnisse in einem Scrum-Team?", options: ["Der Scrum Master", "Der Product Owner", "Der Senior-Entwickler", "Nur der Endkunde"], explanation: "Der Product Owner ist dafür verantwortlich, das Backlog zu priorisieren und die geschäftlichen Bedürfnisse zu vertreten." },
      { question: "Wie lang ist die typische Dauer eines Scrum-Sprints?", options: ["1 Tag", "2 Wochen", "6 Monate", "1 Jahr"], explanation: "Ein Sprint dauert im Allgemeinen 2 Wochen, obwohl dies je nach Team zwischen 1 und 4 Wochen variieren kann." },
      { question: "Was bevorzugt das agile Manifest gegenüber der erschöpfenden Dokumentation?", options: ["Noch mehr Dokumentation", "Die Zusammenarbeit und die Anpassungsfähigkeit", "Das völlige Fehlen von Kommunikation", "Die isolierte Arbeit"], explanation: "Das agile Manifest schätzt Individuen, Interaktionen und Anpassungsfähigkeit gegenüber einer starren Dokumentation." },
      { question: "Welches Scrum-Ritual wird laut Modul oft vernachlässigt, ist aber besonders wertvoll?", options: ["Das Daily Standup", "Die Retrospektive", "Das Sprint Planning", "Die Kaffeepause"], explanation: "Die Retrospektive, die es dem Team ermöglicht, sich kontinuierlich zu verbessern, wird trotz ihres großen Werts oft unterschätzt." },
      { question: "Welches Werkzeug wird genannt, um ein Kanban-Backlog zu visualisieren?", options: ["Photoshop", "Trello", "Nur Excel", "PowerPoint"], explanation: "Trello ist ein beliebtes Werkzeug, das Kanban-Boards bietet, um den Fortschritt der Aufgaben zu visualisieren und zu verfolgen." },
      { question: "Was ist die Rolle des Scrum Masters?", options: ["Alle Funktionen allein codieren", "Den Scrum-Prozess für das Team erleichtern", "Allein über das Budget entscheiden", "Den Kunden ersetzen"], explanation: "Der Scrum Master erleichtert die Rituale und beseitigt Hindernisse, damit das Team effektiv arbeiten kann." },
    ],
  },
  {
    title: "Abschlussprojekt: digitale Transformation des Unternehmens",
    objectives: [
      "Die technologischen Bedürfnisse einer Organisation prüfen",
      "Einen realistischen Plan zur digitalen Transformation vorschlagen",
      "Einen technischen und budgetären Fahrplan präsentieren",
    ],
    content: [
      "Das Abschlussprojekt verlangt, eine Organisation (real oder fiktiv) zu analysieren und die Digitalisierungsmöglichkeiten zu identifizieren: Automatisierung manueller Prozesse, Migration in die Cloud, Einführung kollaborativer Werkzeuge oder Integration von KI, um an Effizienz zu gewinnen.",
      "Der Fahrplan muss die Initiativen nach Wirkung und Komplexität hierarchisieren, mit einem realistischen Zeitplan und einem geschätzten Budget. Die erfolgreichsten Transformationen beginnen mit Quick Wins, bevor sie tiefere strukturelle Veränderungen angehen.",
      "Das Change Management ist genauso wichtig wie die Technologie selbst: die betroffenen Teams einzubeziehen, die Nutzer zu schulen und die konkreten Vorteile zu kommunizieren, bestimmen oft den Erfolg oder Misserfolg einer digitalen Transformation.",
    ],
    keyTakeaways: [
      "Eine erfolgreiche digitale Transformation beginnt mit den geschäftlichen Bedürfnissen, nicht mit der Technologie",
      "Quick Wins zu priorisieren baut Vertrauen für ambitioniertere Veränderungen auf",
      "Der menschliche Widerstand gegen Veränderung ist oft das größte Hindernis, nicht die Technik",
    ],
    resourceLabels: [
      "MIT Sloan — Forschung zur digitalen Transformation",
    ],
    quiz: [
      { question: "Womit muss eine erfolgreiche digitale Transformation beginnen?", options: ["Dem Kauf der teuersten Technologie", "Den geschäftlichen Bedürfnissen", "Der Entlassung des Personals", "Nur der Einstellung eines externen Beraters"], explanation: "Eine effektive digitale Transformation geht immer von den realen Bedürfnissen der Organisation aus, nicht von der Technologie selbst." },
      { question: "Was bezeichnet ein 'Quick Win' in einem Transformationsfahrplan?", options: ["Ein schnelles Scheitern", "Ein schneller, sichtbarer Gewinn, der Vertrauen aufbaut", "Eine sehr langfristige Investition", "Ein akzeptabler finanzieller Verlust"], explanation: "Quick Wins sind schnelle, greifbare Ergebnisse, die den Wert der Transformation demonstrieren und die Akzeptanz erleichtern." },
      { question: "Was ist oft das größte Hindernis für eine digitale Transformation?", options: ["Der Mangel an WLAN", "Der menschliche Widerstand gegen Veränderung", "Der Preis der Computer", "Das Wetter"], explanation: "Der menschliche Widerstand gegen Veränderung ist im Allgemeinen ein größeres Hindernis als rein technische Herausforderungen." },
      { question: "Was muss ein digitaler Transformationsfahrplan enthalten?", options: ["Nur eine Liste von Software", "Einen realistischen Zeitplan und ein geschätztes Budget", "Keine zeitliche Planung", "Nur mündliche Versprechen"], explanation: "Ein seriöser Fahrplan hierarchisiert die Initiativen mit einem klaren Zeitplan und Budget." },
      { question: "Warum ist die Nutzerschulung bei einer digitalen Transformation entscheidend?", options: ["Sie ist nicht notwendig", "Weil die Einführung neuer Werkzeuge vom Verständnis der Nutzer abhängt", "Nur um ein Gesetz einzuhalten", "Weil sie kostenlos ist"], explanation: "Ohne angemessene Schulung scheitern selbst die besten technologischen Werkzeuge mangels Nutzerakzeptanz." },
      { question: "Welche Art von Initiative wird empfohlen, bevor tiefe strukturelle Veränderungen angegangen werden?", options: ["Sofortige radikale Veränderungen", "Quick Wins", "Keine vorherige Aktion", "Die Entlassung des IT-Teams"], explanation: "Mit Quick Wins zu beginnen schafft das nötige Vertrauen, bevor komplexere Transformationen unternommen werden." },
    ],
  },
];

const ht: CourseTranslation = [
  {
    title: "Entwodiksyon nan sistèm enfòmatik",
    objectives: [
      "Konprann achitekti materyèl ak lojisyèl yon sistèm",
      "Distenge prensipal sistèm operasyon yo (Windows, Linux, macOS)",
      "Metrize baz rezo enfòmatik la",
    ],
    content: [
      "Yon sistèm enfòmatik konbine materyèl (pwosesè, memwa, depo) ak lojisyèl (sistèm operasyon, aplikasyon). Konprann achitekti baz sa a esansyèl anvan abòde sijè ki pi avanse tankou cloud oswa sekirite enfòmatik.",
      "Linux domine sèvè yo ak cloud computing gras a estabilite li ak pri li, pandan ke Windows rete dominan sou pòs travay antrepriz yo. macOS privilejye nan domèn kreyatif yo ak devlopman mobil (iOS).",
      "Rezo enfòmatik yo chita sou modèl TCP/IP: chak aparèy gen yon adrès IP, done yo sikile pa pakè, epi pwotokòl tankou HTTP, DNS ak DHCP estriktire kominikasyon ant machin yo.",
    ],
    keyTakeaways: [
      "Tout konpetans avanse nan IT chita sou yon konpreyansyon solid materyèl la ak sistèm operasyon an",
      "Linux se baz majorite enfrastrikti cloud mondyal la",
      "Konprann TCP/IP endispansab pou dyagnostike pwoblèm rezo",
    ],
    resourceLabels: [
      "Microsoft Learn — Baz IT",
      "Linux Foundation — Entwodiksyon gratis nan Linux",
    ],
    quiz: [
      { question: "Ki sistèm operasyon ki domine majoritèman sèvè yo ak cloud la?", options: ["Windows", "Linux", "macOS", "Android"], explanation: "Linux dominan sou sèvè yo ak cloud la gras a estabilite li, sekirite li ak pri li (souvan gratis)." },
      { question: "Sou ki modèl rezo enfòmatik modèn yo chita?", options: ["HTML/CSS", "TCP/IP", "USB/HDMI", "RAM/ROM"], explanation: "Modèl TCP/IP estriktire kominikasyon ant aparèy yo atravè adrès IP ak transpò pakè done." },
      { question: "Ki pwotokòl ki responsab rezolisyon non domèn yo an adrès IP?", options: ["HTTP", "DNS", "FTP", "SMTP"], explanation: "DNS (Domain Name System) tradui non domèn ki lizib yo an adrès IP machin yo itilize." },
      { question: "Ki sistèm operasyon ki privilejye pou devlopman iOS?", options: ["Linux", "macOS", "Windows Server", "Chrome OS"], explanation: "macOS nesesè pou devlope aplikasyon iOS atravè Xcode, zouti Apple la." },
      { question: "Ki de konpozan fondamantal yon sistèm enfòmatik?", options: ["Entènèt ak klavye a", "Materyèl la ak lojisyèl la", "Souri a ak ekran an", "Wifi a ak bluetooth la"], explanation: "Yon sistèm enfòmatik toujou konbine materyèl la ak lojisyèl la pou fonksyone." },
      { question: "Kisa done yo transpòte sou yon rezo TCP/IP?", options: ["Pakè", "Sèlman fichye PDF", "CD-ROM vityèl", "Anyen, tout bagay enstantane"], explanation: "Done yo sikile sou fòm pakè ki dekoupe, achemine epi rekonstitye nan destinasyon an." },
    ],
  },
  {
    title: "Cloud computing (AWS, Azure, GCP)",
    objectives: [
      "Diferansye modèl IaaS, PaaS ak SaaS yo",
      "Konpare twa prensipal founisè cloud yo",
      "Deplwaye yon resous senp sou yon cloud piblik",
    ],
    content: [
      "Cloud computing pèmèt aksede a resous enfòmatik (sèvè, depo, baz done) sou demann, san posede enfrastrikti fizik la. Twa modèl prensipal yo se IaaS (enfrastrikti brit), PaaS (platfòm devlopman) ak SaaS (lojisyèl prè pou itilize).",
      "AWS (Amazon Web Services) domine mache mondyal la ak gam sèvis ki pi laj la. Microsoft Azure entegre natirèlman nan antrepriz ki deja anba ekosistèm Microsoft. Google Cloud Platform (GCP) distenge tèt li pa zouti done ak entèlijans atifisyèl li yo.",
      "Nan Kanada, plizyè founisè kounye a ofri sant done lokal (Canada Central pou Azure, ca-central-1 pou AWS), yon anje enpòtan pou òganizasyon ki soumèt ak egzijans souverènte done.",
    ],
    keyTakeaways: [
      "Chwa founisè cloud la depann de ekosistèm ki egziste a ak konpetans ekip la",
      "Faktirasyon pa itilizasyon egzije yon siveyans konstan sou depans yo",
      "Rezidans done yo se yon anje regilatwa enpòtan nan Kanada",
    ],
    resourceLabels: [
      "AWS Skill Builder — Fòmasyon gratis",
      "Microsoft Learn — Azure Fundamentals",
    ],
    quiz: [
      { question: "Kisa IaaS vle di nan kontèks cloud computing la?", options: ["Infrastructure as a Service", "Internet as a Solution", "Identity as a System", "Integration as a Standard"], explanation: "IaaS (Infrastructure as a Service) bay resous brit tankou sèvè vityèl san jesyon platfòm." },
      { question: "Ki founisè cloud ki domine mache mondyal la selon modil la?", options: ["Google Cloud Platform", "AWS", "IBM Cloud", "Oracle Cloud"], explanation: "AWS (Amazon Web Services) dekri kòm lidè mondyal la ak gam sèvis ki pi laj la." },
      { question: "Pou kisa Google Cloud Platform (GCP) distenge tèt li patikilyèman?", options: ["Jwèt videyo", "Zouti done ak entèlijans atifisyèl", "Vant an detay", "Enprimri"], explanation: "GCP rekonèt pou zouti avanse li yo nan analiz done ak entèlijans atifisyèl." },
      { question: "Ki modèl cloud ki bay yon lojisyèl prè pou itilize san jesyon teknik?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], explanation: "SaaS (Software as a Service) bay yon aplikasyon konplè prè pou itilize, tankou Gmail oswa Microsoft 365." },
      { question: "Poukisa rezidans done yo se yon anje enpòtan nan Kanada?", options: ["Pou rezon estetik", "Pou egzijans regilatwa souverènte done", "Paske cloud pa egziste nan Kanada", "Se pa yon anje reyèl"], explanation: "Kèk òganizasyon dwe garanti done yo rete ebèje nan sant done kanadyen pou rezon legal." },
      { question: "Ki kalite faktirasyon ki tipik nan cloud computing?", options: ["Peman inik pou tout lavi", "Faktirasyon pa itilizasyon", "Gratis pou tout tan", "Sèlman abònman anyèl obligatwa"], explanation: "Faktirasyon pa itilizasyon (pay-as-you-go) se modèl estanda cloud la, ki egzije yon siveyans depans yo." },
    ],
  },
  {
    title: "Entèlijans atifisyèl ak machine learning",
    objectives: [
      "Konprann diferans ant IA, machine learning ak deep learning",
      "Idantifye ka itilizasyon konkrè IA nan antrepriz",
      "Itilize zouti IA jeneratif nan yon kontèks pwofesyonèl",
    ],
    content: [
      "Entèlijans atifisyèl se domèn jeneral ki vize repwodui konpòtman entelijan pa yon machin. Machine learning se yon souskategori kote sistèm nan aprann apati done olye li pwograme eksplisitman. Deep learning itilize rezo newòn pou trete done konplèks tankou imaj oswa langaj.",
      "Nan antrepriz, IA itilize pou otomatizasyon sèvis kliyan (chatbots), previzyon demann, deteksyon fwod ak pèsonalizasyon maketing. Zouti IA jeneratif tankou ChatGPT oswa Copilot transfòme pwodiktivite nan redaksyon, kòd ak analiz.",
      "Adopsyon responsab IA egzije konprann limit li yo: patipri nan done antrènman, alisinasyon nan modèl jeneratif yo, ak anje etik ki lye ak pran desizyon otomatize.",
    ],
    keyTakeaways: [
      "IA jeneratif se yon zouti pwodiktivite, pa yon ranplasman jijman imen",
      "Konprann limit IA enpòtan menm jan ak konnen kapasite li yo",
      "Ka itilizasyon ki pi rantab yo se souvan travay repetitif ki gen ti risk",
    ],
    resourceLabels: [
      "Google AI — Kou entwodiksyon nan machine learning",
      "Microsoft Learn — IA jeneratif pou pwofesyonèl",
    ],
    quiz: [
      { question: "Ki relasyon ant IA, machine learning ak deep learning?", options: ["Se twa domèn totalman separe", "Machine learning se yon souskategori IA, epi deep learning yon souskategori machine learning", "Deep learning anglobe IA", "Pa gen okenn diferans ant tèm sa yo"], explanation: "IA se domèn jeneral la, machine learning se yon souskategori li, epi deep learning yon teknik espesifik machine learning." },
      { question: "Kisa yon 'alisinasyon' ye nan yon modèl IA jeneratif?", options: ["Yon bug vizyèl sou ekran an", "Yon enfòmasyon fo modèl la jenere ak asirans", "Yon viris enfòmatik", "Yon fonksyonalite dezaktive"], explanation: "Yon alisinasyon koresponn ak yon enfòmasyon ki pa kòrèk oswa envante modèl la prezante kòm vre." },
      { question: "Ki youn nan ka itilizasyon IA nan antrepriz yo mansyone nan modil la?", options: ["Deteksyon fwod", "Fabrikasyon mèb", "Netwayaj biwo yo", "Sèlman livrezon lapòs"], explanation: "Deteksyon fwod se yon ka itilizasyon komen IA, sitou nan sektè finansye a." },
      { question: "IA jeneratif dwe konsidere kòm:", options: ["Yon ranplasman total jijman imen", "Yon zouti pwodiktivite konplemantè ak jijman imen", "Yon teknoloji san okenn limit", "Initil nan antrepriz"], explanation: "IA jeneratif prezante kòm yon zouti pou ogmante pwodiktivite, pa pou ranplase disènman imen." },
      { question: "Kisa ki ka lakòz patipri nan yon sistèm IA?", options: ["Koulè ekran an", "Done antrènman yo itilize yo", "Kantite itilizatè", "Pri lojisyèl la"], explanation: "Patipri nan done antrènman yo reflete dirèkteman nan previzyon ak rezilta modèl IA a." },
      { question: "Ki kalite travay ki souvan pi rantab pou otomatize ak IA?", options: ["Sèlman desizyon estratejik konplèks", "Travay repetitif ki gen ti risk", "Sèlman travay kreyatif", "Okenn travay pa ta dwe otomatize"], explanation: "Travay repetitif ak ti risk yo ofri pi bon retou sou envestisman pou otomatizasyon pa IA." },
    ],
  },
  {
    title: "Sekirite enfòmatik ak pwoteksyon done",
    objectives: [
      "Idantifye prensipal menas enfòmatik yo (phishing, ransomware)",
      "Aplike bon pratik sekirite baz yo",
      "Konprann obligasyon legal kanadyen yo an matyè done",
    ],
    content: [
      "Phishing rete vektè atak ki pi komen an, ki eksplwate erè imen olye yon fay teknik. Ransomware yo chifre done yon òganizasyon epi egzije yon ranson — enpak yo ka katastwofik san bakòp resan ki teste.",
      "Bon pratik baz yo enkli otantifikasyon a de faktè (2FA), modpas inik ak konplèks ki jere atravè yon jesyonè modpas, mizajou regilye sistèm yo ak yon bakòp regilye selon règ 3-2-1 (3 kopi, 2 sipò diferan, 1 andeyò sit la).",
      "Nan Kanada, Lwa sou pwoteksyon ransèyman pèsonèl ak dokiman elektwonik (PIPEDA) ak Lwa 25 nan Quebec enpoze obligasyon strik sou koleksyon, depo ak notifikasyon nan ka gen yon fwit done pèsonèl.",
    ],
    keyTakeaways: [
      "Erè imen rete kòz nimewo en ensidan sekirite yo",
      "Yon bakòp ki pa teste se pa yon vrè pwoteksyon",
      "Konfòmite ak Lwa 25 ak PIPEDA obligatwa, pa opsyonèl, pou tout òganizasyon kanadyen",
    ],
    resourceLabels: [
      "Sant kanadyen pou sekirite enfòmatik",
      "CAI / Lwa 25 — Gid konfòmite Quebec",
    ],
    quiz: [
      { question: "Ki vektè atak ki pi komen an selon modil la?", options: ["Phishing", "Atak fizik sou sèvè a", "Koupi kouran", "Sèlman vòl materyèl"], explanation: "Phishing eksplwate erè imen epi rete estatistikman vektè atak ki pi frekan an." },
      { question: "Kisa yon ransomware fè?", options: ["Li akselere òdinatè a", "Li chifre done yo epi egzije yon ranson", "Li amelyore sekirite", "Li elimine viris ki egziste yo"], explanation: "Yon ransomware chifre done viktim nan epi egzije yon peman pou dechifre yo." },
      { question: "Kisa règ bakòp 3-2-1 la vle di?", options: ["3 modpas, 2 imel, 1 kont", "3 kopi, 2 sipò diferan, 1 kopi andeyò sit la", "3 èdtan, 2 jou, 1 semèn", "Okenn siyifikasyon patikilye"], explanation: "Règ 3-2-1 la garanti yon rezistans done: 3 kopi sou 2 sipò diferan, ki gen 1 konsève andeyò sit la." },
      { question: "Ki lwa kebekwa ki ankadre pwoteksyon ransèyman pèsonèl?", options: ["Lwa 25", "Sèlman Kòd kriminèl la", "Lwa sou brevè", "Lwa sou tabak"], explanation: "Lwa 25 enpoze obligasyon strik nan Quebec konsènan koleksyon ak pwoteksyon done pèsonèl." },
      { question: "Kisa otantifikasyon a de faktè (2FA) ye?", options: ["Itilize de òdinatè", "Yon kouch sekirite siplemantè ki konbine de metòd verifikasyon", "Gen de modpas idantik", "Yon fonksyonalite obsolèt"], explanation: "2FA ajoute yon dezyèm verifikasyon (egz. kòd SMS) anplis modpas la pou ranfòse sekirite aksè a." },
      { question: "Poukisa yon bakòp ki pa teste se pa yon vrè pwoteksyon?", options: ["Paske li pran twòp plas", "Paske nou pa konnen si li ka reyèlman restore lè gen bezwen", "Paske bakòp yo ilegal", "Se pa janm yon pwoblèm"], explanation: "Yon bakòp dwe teste regilyèman pou garanti li pral reyèlman fonksyone pandan yon restorasyon dijans." },
    ],
  },
  {
    title: "Jesyon baz done",
    objectives: [
      "Diferansye baz done relasyonèl ak NoSQL",
      "Ekri rekèt SQL baz yo",
      "Konprann prensip nòmalizasyon done yo",
    ],
    content: [
      "Baz done relasyonèl yo (MySQL, PostgreSQL, SQL Server) òganize done yo an tab ki lye pa kle, ki garanti koerans atravè kontrent strik. Baz NoSQL yo (MongoDB, Firebase) ofri plis fleksibilite pou done ki pa estriktire oswa nan trè gran echèl.",
      "Langaj SQL (Structured Query Language) pèmèt entèwoje, ensere, modifye ak efase done. Kòmand baz yo — SELECT, INSERT, UPDATE, DELETE, JOIN — kouvri majorite bezwen chak jou yon analis oswa devlopè.",
      "Nòmalizasyon done yo vize elimine redondans epi garanti entegrite referansyèl. Yon baz ki byen konsevwa fasilite antretyen, amelyore pèfòmans epi diminye risk enkoerans ant done yo.",
    ],
    keyTakeaways: [
      "Chwa relasyonèl vs NoSQL depann de estrikti done yo ak echèl pwojè a",
      "SQL rete konpetans ki pi transferab ant tout travay teknik yo",
      "Yon baz ki mal nòmalize kreye pwoblèm koerans ki agrave ak tan",
    ],
    resourceLabels: [
      "PostgreSQL Tutorial ofisyèl",
      "SQLBolt — Aprann SQL entèraktivman",
    ],
    quiz: [
      { question: "Ki kòmand SQL ki pèmèt rekipere done nan yon tab?", options: ["GET", "SELECT", "FETCH", "PULL"], explanation: "SELECT se kòmand SQL fondamantal pou entèwoje ak rekipere done nan youn oswa plizyè tab." },
      { question: "Ki kalite baz done MongoDB ye?", options: ["Relasyonèl", "NoSQL", "Fichye tèks", "Tablo"], explanation: "MongoDB se yon baz done NoSQL oryante dokiman, ki ofri fleksibilite pou done ki pa estriktire." },
      { question: "Ki objektif prensipal nòmalizasyon done yo?", options: ["Ralanti rekèt yo", "Elimine redondans epi garanti entegrite referansyèl", "Ogmante kantite tab initilman", "Retire tout relasyon ant tab yo"], explanation: "Nòmalizasyon estriktire done yo pou evite dedoublman epi kenbe koerans ant tab yo." },
      { question: "Ki kòmand SQL ki sèvi pou ensere nouvo done?", options: ["ADD", "INSERT", "NEW", "CREATE ROW"], explanation: "INSERT se kòmand yo itilize pou ajoute nouvo liy done nan yon tab." },
      { question: "Poukisa SQL konsidere kòm yon konpetans trè transferab?", options: ["Paske li itilize sèlman nan yon sèl lojisyèl", "Paske li itilize nan majorite travay teknik ki enplike done", "Paske li obsolèt", "Paske li ranplase tout lòt langaj yo"], explanation: "SQL lajman itilize atravè anpil wòl teknik (analis, devlopè, data scientist), sa ki fè li yon konpetans trè demann." },
      { question: "Kisa yon kle etranje pèmèt nan yon baz relasyonèl?", options: ["Efase yon tab", "Lye yon tab ak yon lòt epi garanti entegrite referansyèl", "Chifre done yo", "Ogmante vitès entènèt"], explanation: "Yon kle etranje etabli yon relasyon ant de tab epi asire koerans done ki lye yo." },
    ],
  },
  {
    title: "Devlopman wèb ak aplikasyon",
    objectives: [
      "Konprann diferans ant front-end ak back-end",
      "Idantifye langaj ak framework komen yo",
      "Swiv sik lavi yon aplikasyon wèb senp",
    ],
    content: [
      "Front-end konsène tout sa itilizatè a wè epi manipile dirèkteman: HTML pou estrikti a, CSS pou style la, JavaScript pou entèraktivite, ak framework tankou React oswa Vue.js. Back-end jere lojik sèvè a, baz done yo ak API yo, ak langaj tankou Node.js, Python oswa Java.",
      "Yon aplikasyon wèb modèn jeneralman swiv yon achitekti client-serveur: navigatè a (client) voye rekèt bay yon sèvè ki trete lojik biznis la epi retounen done, souvan nan fòma JSON atravè yon API REST.",
      "Sik devlopman an enkli konsepsyon, kodaj, tès, deplwaman ak antretyen. Metodoloji ajil yo pèmèt livre fonksyonalite pa ti iterasyon olye nan yon sèl blòk final.",
    ],
    keyTakeaways: [
      "Front-end ak back-end konplemantè, pa entèchanjab",
      "Yon API ki byen konsevwa se kle yon achitekti wèb ki ka antretni",
      "Deplwaman kontinyèl diminye risk ki lye ak mizanplas pwodiksyon",
    ],
    resourceLabels: [
      "MDN Web Docs — Referans devlopman wèb",
      "freeCodeCamp — Kourikoulòm devlopman wèb gratis",
    ],
    quiz: [
      { question: "Ki langaj yo itilize pou estriktire kontni yon paj wèb?", options: ["CSS", "HTML", "JavaScript", "SQL"], explanation: "HTML (HyperText Markup Language) defini estrikti a ak kontni yon paj wèb." },
      { question: "Kisa back-end yon aplikasyon wèb jere prensipalman?", options: ["Style vizyèl la", "Lojik sèvè a, baz done yo ak API yo", "Sèlman imaj yo", "Animasyon CSS yo"], explanation: "Back-end trete lojik biznis la bò sèvè a, jere done yo epi ekspoze API pou front-end la." },
      { question: "Ki fòma yo kominman itilize pou echanje done atravè yon API REST?", options: ["JSON", "MP3", "PDF", "EXE"], explanation: "JSON (JavaScript Object Notation) se fòma estanda lejè pou echanj done ant client ak serveur." },
      { question: "Ki achitekti ki tipik pou yon aplikasyon wèb modèn?", options: ["Client-serveur", "Sèlman pè a pè", "Okenn achitekti defini", "Mainframe santralize ane 1970 yo"], explanation: "Achitekti client-serveur separe navigatè a (client) de sèvè ki trete rekèt yo ak lojik la." },
      { question: "Ki avantaj metodoloji ajil yo nan devlopman wèb?", options: ["Livre tout nan yon sèl blòk final", "Livre fonksyonalite pa ti iterasyon", "Evite tès yo konplètman", "Travay san okenn planifikasyon"], explanation: "Ajilite pèmèt livre pwogresivman, adapte ak fidbak epi diminye risk gwo pwojè monolitik." },
      { question: "Kilès nan eleman sa yo ki se yon framework front-end mansyone nan modil la?", options: ["React", "MySQL", "Docker", "Linux"], explanation: "React se yon framework JavaScript yo itilize pou konstwi entèfas itilizatè bò front-end la." },
    ],
  },
  {
    title: "Jesyon pwojè IT (Agile/Scrum)",
    objectives: [
      "Konprann prensip manifès ajil la",
      "Metrize wòl ak rityèl Scrum yo",
      "Itilize yon zouti jesyon pwojè ajil (Jira, Trello)",
    ],
    content: [
      "Manifès ajil la privilejye kolaborasyon, adaptabilite ak livrezon iteratif olye planifikasyon rijid ak dokimantasyon egzostif. Apwòch sa a reponn pi byen ak bezwen chanjan pwojè teknolojik modèn yo.",
      "Scrum estriktire travay la an sprint (jeneralman 2 semèn) ak wòl defini: Product Owner priyorize bezwen yo, Scrum Master fasilite pwosesis la, epi ekip devlopman an livre fonksyonalite yo. Rityèl kle yo se sprint planning, daily standup, sprint review ak retwospektiv.",
      "Zouti tankou Jira, Trello oswa Azure DevOps pèmèt vizyalize backlog la, swiv avansman atravè tablo Kanban epi mezire vitès ekip la atravè sprint yo.",
    ],
    keyTakeaways: [
      "Ajilite se yon filozofi kolaborasyon, pa sèlman yon ansanm zouti",
      "Rityèl Scrum yo sèvi pou kenbe transparans, pa pou kreye biwokrasi",
      "Retwospektiv la se rityèl ki pi souvan neglije men ki pi presye pou amelyore",
    ],
    resourceLabels: [
      "Scrum.org — Gid Scrum ofisyèl (gratis)",
      "Atlassian Agile Coach",
    ],
    quiz: [
      { question: "Ki wòl ki priyorize bezwen yo nan yon ekip Scrum?", options: ["Scrum Master la", "Product Owner la", "Devlopè senyò a", "Sèlman kliyan final la"], explanation: "Product Owner la responsab pou priyorize backlog la epi reprezante bezwen biznis yo." },
      { question: "Ki dire tipik yon sprint Scrum?", options: ["1 jou", "2 semèn", "6 mwa", "1 ane"], explanation: "Yon sprint dire jeneralman 2 semèn, byenke sa ka varye ant 1 ak 4 semèn selon ekip la." },
      { question: "Kisa manifès ajil la privilejye pa rapò ak dokimantasyon egzostif?", options: ["Ankò plis dokimantasyon", "Kolaborasyon ak adaptabilite", "Absans total kominikasyon", "Travay izole"], explanation: "Manifès ajil la valorize endividi yo, entèraksyon yo ak adaptabilite olye yon dokimantasyon rijid." },
      { question: "Ki rityèl Scrum ki souvan neglije men patikilyèman presye selon modil la?", options: ["Daily standup la", "Retwospektiv la", "Sprint planning la", "Poz kafe a"], explanation: "Retwospektiv la, ki pèmèt ekip la amelyore kontinyèlman, souvan souzèstime malgre gwo valè li." },
      { question: "Ki zouti yo mansyone pou vizyalize yon backlog Kanban?", options: ["Photoshop", "Trello", "Sèlman Excel", "PowerPoint"], explanation: "Trello se yon zouti popilè ki ofri tablo Kanban pou vizyalize ak swiv avansman travay yo." },
      { question: "Ki wòl Scrum Master la?", options: ["Kode tout fonksyonalite yo pou kont li", "Fasilite pwosesis Scrum la pou ekip la", "Deside pou kont li sou bidjè a", "Ranplase kliyan an"], explanation: "Scrum Master la fasilite rityèl yo epi retire obstak yo pou pèmèt ekip la travay efikasman." },
    ],
  },
  {
    title: "Pwojè final: transfòmasyon dijital antrepriz",
    objectives: [
      "Odite bezwen teknolojik yon òganizasyon",
      "Pwopoze yon plan transfòmasyon dijital reyalis",
      "Prezante yon fèy wout teknik ak bidjetè",
    ],
    content: [
      "Pwojè final la mande analize yon òganizasyon (reyèl oswa fiktif) epi idantifye opòtinite dijitalizasyon yo: otomatizasyon pwosesis manyèl, migrasyon nan cloud, adopsyon zouti kolaboratif oswa entegrasyon IA pou genyen an efikasite.",
      "Fèy wout la dwe yerarchize inisyativ yo pa enpak ak konpleksite, ak yon kalandriye reyalis ak yon bidjè estime. Transfòmasyon ki pi reyisi yo kòmanse ak genyen rapid (quick wins) anvan abòde chanjman estriktirèl ki pi pwofon.",
      "Jesyon chanjman an enpòtan menm jan ak teknoloji a li menm: enplike ekip konsène yo, fòme itilizatè yo epi kominike benefis konkrè yo souvan detèmine siksè oswa echèk yon transfòmasyon dijital.",
    ],
    keyTakeaways: [
      "Yon transfòmasyon dijital reyisi kòmanse ak bezwen biznis yo, pa ak teknoloji a",
      "Priyorize genyen rapid yo konstwi konfyans pou chanjman ki pi anbisye yo",
      "Rezistans a chanjman imen souvan pi gwo obstak la, pa teknik la",
    ],
    resourceLabels: [
      "MIT Sloan — Rechèch sou transfòmasyon dijital",
    ],
    quiz: [
      { question: "Ak kisa yon transfòmasyon dijital reyisi dwe kòmanse?", options: ["Acha teknoloji ki pi chè a", "Bezwen biznis yo", "Ranvwa pèsonèl la", "Sèlman anbochaj yon konsiltan ekstèn"], explanation: "Yon transfòmasyon dijital efikas toujou pati de bezwen reyèl òganizasyon an, pa de teknoloji a li menm." },
      { question: "Kisa yon 'quick win' deziye nan yon fèy wout transfòmasyon?", options: ["Yon echèk rapid", "Yon genyen rapid ak vizib ki konstwi konfyans", "Yon envestisman a trè long tèm", "Yon pèt finansye akseptab"], explanation: "Quick wins yo se rezilta rapid ak tanjib ki demontre valè transfòmasyon an epi fasilite adezyon." },
      { question: "Ki sa ki souvan pi gwo obstak nan yon transfòmasyon dijital?", options: ["Mank wifi", "Rezistans a chanjman imen", "Pri òdinatè yo", "Meteyo a"], explanation: "Rezistans imen a chanjman jeneralman yon obstak pi enpòtan pase defi ki pi teknik yo." },
      { question: "Kisa yon fèy wout transfòmasyon dijital dwe enkli?", options: ["Sèlman yon lis lojisyèl", "Yon kalandriye reyalis ak yon bidjè estime", "Okenn planifikasyon tanporèl", "Sèlman pwomès vèbal"], explanation: "Yon fèy wout serye yerarchize inisyativ yo ak yon kalandriye ak yon bidjè klè." },
      { question: "Poukisa fòmasyon itilizatè yo enpòtan anpil nan yon transfòmasyon dijital?", options: ["Se pa nesesè", "Paske adopsyon nouvo zouti yo depann de konpreyansyon itilizatè yo", "Sèlman pou respekte yon lwa", "Paske li gratis"], explanation: "San yon fòmasyon adekwat, menm pi bon zouti teknolojik yo echwe akoz mank adopsyon pa itilizatè yo." },
      { question: "Ki kalite inisyativ yo rekòmande anvan abòde chanjman estriktirèl pwofon?", options: ["Chanjman radikal imedya", "Genyen rapid (quick wins)", "Okenn aksyon anvan", "Ranvwa ekip IT la"], explanation: "Kòmanse ak genyen rapid kreye konfyans nesesè anvan antreprann transfòmasyon ki pi konplèks." },
    ],
  },
];

export const informatiqueTranslations: Partial<Record<Lang, CourseTranslation>> = {
  en,
  es,
  it,
  pt,
  de,
  ht,
};
