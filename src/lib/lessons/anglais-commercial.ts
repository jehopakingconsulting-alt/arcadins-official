import type { Lesson } from "@/types/lesson";

export const anglaisCommercialLessons: Lesson[] = [
  {
    title: "Business English fundamentals",
    objectives: [
      "Build core business vocabulary used across industries",
      "Understand formal vs informal register in English business contexts",
      "Construct clear, professional sentences in everyday work situations",
    ],
    content: [
      "Business English relies on a specific vocabulary set: stakeholder, deadline, deliverable, revenue, onboarding. Mastering these terms early makes every subsequent interaction — meetings, emails, presentations — significantly easier to navigate.",
      "English business communication in Canada tends to favor directness balanced with politeness. Phrases like 'I was wondering if...' or 'Would it be possible to...' soften requests while remaining clear, a balance many non-native speakers find tricky at first.",
      "Clear sentence construction in a professional context means short, action-oriented statements: state the point first, then the supporting detail. Avoid overly complex sentences that can obscure your meaning, especially in writing.",
    ],
    keyTakeaways: [
      "Core vocabulary should be automatic before tackling complex communication",
      "Politeness markers soften direct requests without losing clarity",
      "Short, action-first sentences communicate more effectively than complex ones",
    ],
    resources: [
      { label: "BBC Learning English — Business English", url: "https://www.bbc.co.uk/learningenglish/business-english" },
    ],
    quiz: [
      { question: "What does the term 'stakeholder' refer to in a business context?", options: ["A type of investment fund", "A person or group with an interest in the outcome of a project", "A physical office location", "A government tax form"], correctIndex: 1, explanation: "A stakeholder is anyone affected by or invested in the outcome of a business decision or project." },
      { question: "Which phrase is an example of softening a request politely?", options: ["'Do it now.'", "'I was wondering if...'", "'You must comply immediately.'", "'This is non-negotiable.'"], correctIndex: 1, explanation: "This phrase softens a direct request while maintaining clarity, a balance valued in Canadian business communication." },
      { question: "What structure is recommended for clear professional sentences?", options: ["Long complex sentences with many subordinate clauses", "Short, action-oriented statements with the point first", "Random word order", "Only questions, never statements"], correctIndex: 1, explanation: "Leading with the main point in a short, clear sentence improves comprehension in professional communication." },
      { question: "What does 'deliverable' mean in business English?", options: ["A type of vehicle", "A concrete result or output expected from a project", "An employee's lunch break", "A holiday schedule"], correctIndex: 1, explanation: "A deliverable is a tangible output expected at a given stage of a project, like a report or prototype." },
      { question: "How does Canadian business communication typically balance directness?", options: ["With excessive aggression", "With politeness markers alongside clarity", "By avoiding all communication", "By only using formal Latin terms"], correctIndex: 1, explanation: "Canadian workplaces favor a balance of clear, direct communication softened with politeness." },
      { question: "What should be avoided in professional written communication according to the module?", options: ["Clear action verbs", "Overly complex sentences that obscure meaning", "Short paragraphs", "Direct statements"], correctIndex: 1, explanation: "Overly complex sentence structures can confuse readers and reduce the effectiveness of professional communication." },
    ],
  },
  {
    title: "Professional communication & emails",
    objectives: [
      "Write a clear, well-structured professional email",
      "Use appropriate greetings and closings for different contexts",
      "Respond professionally to requests and complaints in writing",
    ],
    content: [
      "An effective business email has a clear subject line, a brief greeting, a focused message (one main topic per email when possible), and a professional closing. Avoid burying the main request in the third paragraph — lead with it.",
      "Greetings range from formal ('Dear Mr. Smith') to semi-formal ('Hi John') depending on the relationship and company culture. Canadian workplaces often default to a friendly but professional tone, even in first contact emails.",
      "Responding to complaints in writing requires acknowledging the issue, taking ownership without being defensive, and proposing a concrete next step. A well-written response can turn a frustrated client into a loyal one.",
    ],
    keyTakeaways: [
      "Lead with your main point — don't bury the request",
      "Match your greeting formality to the relationship and company culture",
      "Acknowledge and propose action when responding to complaints, never get defensive",
    ],
    resources: [
      { label: "Purdue OWL — Business Writing Guide", url: "https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing" },
    ],
    quiz: [
      { question: "Where should the main request be placed in a professional email?", options: ["Buried in the third paragraph", "Near the beginning, leading with the point", "Only in the subject line", "At the very end without context"], correctIndex: 1, explanation: "Leading with the main request ensures busy readers immediately understand the email's purpose." },
      { question: "What tone do Canadian workplaces typically favor in emails?", options: ["Extremely formal Latin phrasing", "A friendly but professional tone", "No greeting at all", "Overly casual slang"], correctIndex: 1, explanation: "Canadian business culture often blends professionalism with approachability, even in initial contact." },
      { question: "What is the recommended first step when responding to a written complaint?", options: ["Ignoring the complaint", "Acknowledging the issue", "Blaming the customer", "Deleting the email"], correctIndex: 1, explanation: "Acknowledgment shows the recipient that their concern has been heard and taken seriously." },
      { question: "How many main topics should an effective business email ideally cover?", options: ["As many as possible", "One main topic when possible", "Exactly five topics", "None, only greetings"], correctIndex: 1, explanation: "Focusing on a single topic per email improves clarity and makes responses easier to manage." },
      { question: "What should be avoided when responding to a complaint?", options: ["Being defensive", "Proposing a concrete solution", "Acknowledging the issue", "Taking ownership"], correctIndex: 0, explanation: "Defensiveness escalates conflict; acknowledgment and solution-focused responses are more effective." },
      { question: "What element is essential at the start of a professional email?", options: ["A clear subject line", "A long personal story", "An attachment with no explanation", "Random capitalization"], correctIndex: 0, explanation: "A clear subject line helps the recipient immediately understand the email's purpose and priority." },
    ],
  },
  {
    title: "Meetings, presentations & public speaking",
    objectives: [
      "Participate confidently in English-language meetings",
      "Structure a clear business presentation",
      "Handle questions and unexpected interruptions smoothly",
    ],
    content: [
      "Active participation in meetings means knowing how to interject politely ('If I may add...'), ask for clarification ('Could you elaborate on that?'), and summarize discussion points to confirm shared understanding before moving forward.",
      "A strong business presentation follows a simple structure: hook the audience's attention, state the purpose clearly, present supporting points in a logical order, and end with a clear call to action or summary of next steps.",
      "Handling questions confidently — even when you don't know the answer immediately — involves acknowledging the question, offering what you do know, and committing to follow up rather than guessing or going silent.",
    ],
    keyTakeaways: [
      "Polite interjection phrases help you participate without appearing rude",
      "Every presentation needs a clear hook, structure, and call to action",
      "It's better to commit to following up than to guess an uncertain answer",
    ],
    resources: [
      { label: "TED — How to give a great presentation", url: "https://www.ted.com/playlists/574" },
    ],
    quiz: [
      { question: "What phrase is recommended to politely interject in a meeting?", options: ["'Shut up, it's my turn.'", "'If I may add...'", "Complete silence forever", "Interrupting without any phrase"], correctIndex: 1, explanation: "This phrase allows participation while maintaining politeness and respect for the ongoing discussion." },
      { question: "What should a strong business presentation end with?", options: ["No conclusion at all", "A clear call to action or summary of next steps", "An unrelated joke", "A random question with no answer"], correctIndex: 1, explanation: "Ending with clear next steps ensures the audience knows what to do with the information presented." },
      { question: "What is recommended when you don't know the answer to a question immediately?", options: ["Guessing randomly", "Acknowledging the question and committing to follow up", "Ignoring the question entirely", "Changing the subject abruptly"], correctIndex: 1, explanation: "Committing to follow up maintains credibility better than guessing or avoiding the question." },
      { question: "What is the first step of a strong presentation structure?", options: ["Hooking the audience's attention", "Ending abruptly", "Listing irrelevant facts", "Skipping the introduction"], correctIndex: 0, explanation: "Capturing attention at the start ensures the audience stays engaged throughout the presentation." },
      { question: "What phrase helps confirm shared understanding during a meeting?", options: ["Summarizing the discussion points", "Staying silent the whole time", "Repeating random words", "Leaving the meeting early"], correctIndex: 0, explanation: "Summarizing helps ensure everyone is aligned before the discussion moves forward." },
      { question: "How should questions be handled to maintain confidence according to the module?", options: ["By always guessing an answer", "By acknowledging, sharing what is known, and following up if needed", "By avoiding all questions", "By becoming defensive"], correctIndex: 1, explanation: "This approach maintains professionalism and credibility, even when an immediate answer isn't available." },
    ],
  },
  {
    title: "Negotiation skills in English",
    objectives: [
      "Use appropriate negotiation vocabulary and phrasing",
      "Present a position assertively without aggression",
      "Handle counteroffers and objections constructively",
    ],
    content: [
      "Negotiation language includes phrases like 'I propose that...', 'What if we considered...', and 'I understand your position, however...'. These expressions allow disagreement while maintaining a collaborative tone.",
      "Assertive presentation in English negotiation means stating your position with supporting facts, not just opinions, while remaining open to alternative solutions. Confidence comes from preparation, not volume or aggression.",
      "When handling counteroffers, listening fully before responding, then reframing the conversation around shared interests rather than fixed positions, tends to produce better outcomes for both sides.",
    ],
    keyTakeaways: [
      "Negotiation phrasing allows disagreement while preserving the relationship",
      "Assertiveness comes from preparation and facts, not tone of voice",
      "Reframing around shared interests resolves more conflicts than rigid positions",
    ],
    resources: [
      { label: "Harvard PON — Negotiation resources", url: "https://www.pon.harvard.edu" },
    ],
    quiz: [
      { question: "Which phrase allows expressing disagreement while staying collaborative?", options: ["'You are completely wrong.'", "'I understand your position, however...'", "Total silence", "'That's a stupid idea.'"], correctIndex: 1, explanation: "This phrase acknowledges the other party's view while introducing a nuanced disagreement." },
      { question: "Where does true assertiveness come from according to the module?", options: ["Loud volume and aggression", "Preparation and facts", "Random guessing", "Avoiding eye contact"], correctIndex: 1, explanation: "Genuine assertiveness in negotiation is rooted in solid preparation and factual support, not aggression." },
      { question: "What is recommended when handling a counteroffer?", options: ["Listening fully before responding", "Interrupting immediately", "Rejecting it without consideration", "Ignoring it completely"], correctIndex: 0, explanation: "Full listening ensures a thoughtful, effective response rather than a reactive one." },
      { question: "What does reframing around 'shared interests' help achieve?", options: ["Nothing useful", "Better outcomes for both negotiating parties", "Only benefits for one side", "Complete deadlock"], correctIndex: 1, explanation: "Focusing on shared interests rather than rigid positions often leads to mutually beneficial solutions." },
      { question: "What type of support should be used when presenting a negotiating position?", options: ["Only personal opinions", "Facts, not just opinions", "Emotional outbursts", "No support at all"], correctIndex: 1, explanation: "Factual support strengthens credibility and persuasiveness in a negotiation context." },
      { question: "What phrase introduces a proposal in negotiation English?", options: ["'I propose that...'", "'Whatever, I don't care.'", "'This is pointless.'", "Complete silence"], correctIndex: 0, explanation: "This phrase formally and constructively introduces a proposed solution during negotiation." },
    ],
  },
  {
    title: "Business writing & reports",
    objectives: [
      "Structure a professional business report",
      "Write clear executive summaries",
      "Avoid common grammar and style errors in business writing",
    ],
    content: [
      "A business report typically follows this structure: executive summary, introduction/context, methodology (if applicable), findings, and recommendations. Each section should be scannable with clear headings for busy readers.",
      "An executive summary condenses the entire report into a few sentences or a short paragraph, allowing a reader to grasp the key takeaway without reading the full document — a skill highly valued by senior management.",
      "Common errors to avoid include overusing passive voice (which can obscure who is responsible for an action), inconsistent verb tense, and overly long sentences that bury the main point in subordinate clauses.",
    ],
    keyTakeaways: [
      "Every report section should be scannable with clear, descriptive headings",
      "A strong executive summary is often the only part senior readers actually read",
      "Active voice and short sentences improve clarity in business writing",
    ],
    resources: [
      { label: "Grammarly Business Writing Handbook", url: "https://www.grammarly.com/business-writing" },
    ],
    quiz: [
      { question: "What does an executive summary aim to do?", options: ["Hide important information", "Condense the entire report's key takeaway into a short section", "Replace the entire report", "List irrelevant details only"], correctIndex: 1, explanation: "The executive summary allows busy readers to grasp the essential message without reading the full document." },
      { question: "What writing style issue can obscure who is responsible for an action?", options: ["Active voice", "Overuse of passive voice", "Short sentences", "Clear headings"], correctIndex: 1, explanation: "Passive voice can hide the subject performing an action, reducing clarity about accountability." },
      { question: "What is recommended for report sections to improve readability?", options: ["No headings at all", "Clear, descriptive headings", "Random formatting", "Extremely small font"], correctIndex: 1, explanation: "Clear headings allow readers to scan and quickly find relevant information within the report." },
      { question: "What part of a report is often the only one senior management reads?", options: ["The appendix", "The executive summary", "The footnotes", "The bibliography"], correctIndex: 1, explanation: "Senior readers often rely on the executive summary alone due to time constraints." },
      { question: "What sentence structure is recommended for clarity in business writing?", options: ["Very long sentences with multiple subordinate clauses", "Active voice and short sentences", "Random word order", "Exclusively passive voice"], correctIndex: 1, explanation: "Active voice and concise sentences improve clarity and reduce the risk of misinterpretation." },
      { question: "What typical structure does a business report follow?", options: ["Summary, introduction, findings, recommendations", "Random order with no structure", "Only a conclusion", "Just a list of names"], correctIndex: 0, explanation: "This logical structure guides the reader through context, evidence, and actionable conclusions." },
    ],
  },
  {
    title: "Industry-specific vocabulary",
    objectives: [
      "Build vocabulary specific to your target industry",
      "Understand common acronyms used in Canadian workplaces",
      "Use precise terminology to demonstrate expertise",
    ],
    content: [
      "Each industry carries specialized vocabulary: finance ('ROI', 'liquidity', 'portfolio'), tech ('deployment', 'scalability', 'stakeholder'), healthcare ('patient intake', 'compliance'). Building this vocabulary accelerates professional credibility.",
      "Canadian workplaces commonly use acronyms like KPI (Key Performance Indicator), SOP (Standard Operating Procedure), and ASAP — understanding these prevents confusion in fast-paced meetings and written communication.",
      "Using precise industry terminology, rather than vague general language, signals expertise and builds trust with colleagues and clients, particularly important for newcomers establishing professional credibility in a new market.",
    ],
    keyTakeaways: [
      "Industry-specific vocabulary should be learned in context, not through isolated lists",
      "Common workplace acronyms are essential to avoid confusion in daily communication",
      "Precise terminology builds professional credibility faster than general language",
    ],
    resources: [
      { label: "Investopedia — Business & finance terms", url: "https://www.investopedia.com" },
    ],
    quiz: [
      { question: "What does KPI stand for in a business context?", options: ["Key Performance Indicator", "Keep Personal Information", "Known Public Issue", "Kitchen Process Inventory"], correctIndex: 0, explanation: "KPI (Key Performance Indicator) is a measurable value used to evaluate success against objectives." },
      { question: "What does the acronym ROI mean in finance?", options: ["Return on Investment", "Rate of Interest only", "Risk of Inflation", "Record of Income"], correctIndex: 0, explanation: "ROI measures the profitability of an investment relative to its cost." },
      { question: "What does using precise industry terminology signal according to the module?", options: ["Confusion", "Expertise and builds trust", "Lack of preparation", "Nothing significant"], correctIndex: 1, explanation: "Precise vocabulary demonstrates genuine knowledge and competence in a specific field." },
      { question: "Why are common workplace acronyms important to understand?", options: ["They have no real use", "They prevent confusion in fast-paced meetings", "They are only used in writing, never spoken", "They are illegal to use"], correctIndex: 1, explanation: "Acronyms are frequently used in Canadian workplaces, and understanding them avoids miscommunication." },
      { question: "What does SOP stand for?", options: ["Standard Operating Procedure", "Special Office Policy", "Sales Opening Plan", "Staff Off-time Permission"], correctIndex: 0, explanation: "SOP refers to a documented standard process for completing a task consistently." },
      { question: "How should industry-specific vocabulary ideally be learned?", options: ["By memorizing random isolated lists", "In context of actual use", "It cannot be learned", "Only through formal exams"], correctIndex: 1, explanation: "Learning vocabulary in real context improves retention and appropriate usage." },
    ],
  },
  {
    title: "Canadian workplace culture in English",
    objectives: [
      "Understand Canadian workplace norms and expectations",
      "Navigate hierarchy and feedback culture appropriately",
      "Adapt communication style to Canadian professional contexts",
    ],
    content: [
      "Canadian workplace culture generally values politeness, consensus-building, and a relatively flat hierarchy compared to many other countries. Direct confrontation is rare; disagreement is usually expressed diplomatically.",
      "Feedback culture in Canada tends to favor a 'sandwich' approach — positive comment, constructive criticism, positive comment — though this varies by industry and company size. Tech startups often favor more direct feedback than traditional corporations.",
      "Adapting communication style means observing how colleagues interact before adopting a particular tone: some Canadian workplaces are quite informal (first names, casual language) while others, especially in finance or law, remain more formal.",
    ],
    keyTakeaways: [
      "Canadian workplaces generally favor diplomatic disagreement over direct confrontation",
      "Feedback styles vary significantly by industry — observe before assuming",
      "Watching colleagues' communication patterns is the safest way to calibrate your own tone",
    ],
    resources: [
      { label: "Government of Canada — Working in Canada Guide", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/pursue-career.html" },
    ],
    quiz: [
      { question: "How is hierarchy generally described in Canadian workplaces?", options: ["Extremely rigid", "Relatively flat compared to many other countries", "Non-existent everywhere", "Identical worldwide"], correctIndex: 1, explanation: "Canadian workplace culture tends toward a flatter hierarchy than many other national business cultures." },
      { question: "What is the 'sandwich' approach to feedback?", options: ["A type of lunch break", "Positive comment, constructive criticism, positive comment", "Only negative comments", "Ignoring feedback entirely"], correctIndex: 1, explanation: "This feedback structure softens criticism by surrounding it with positive remarks, common in many Canadian workplaces." },
      { question: "How is disagreement typically expressed in Canadian workplace culture?", options: ["Through direct confrontation", "Diplomatically", "Never expressed at all", "Through written threats"], correctIndex: 1, explanation: "Diplomatic, indirect expression of disagreement is generally preferred over confrontation." },
      { question: "What is recommended before adopting a particular communication tone at a new workplace?", options: ["Immediately being very casual", "Observing how colleagues interact first", "Refusing to communicate at all", "Copying a foreign workplace style"], correctIndex: 1, explanation: "Observation helps calibrate an appropriate tone matching the specific workplace culture." },
      { question: "Do all Canadian industries share the exact same feedback culture?", options: ["Yes, always identical", "No, it varies by industry and company size", "Feedback doesn't exist in Canada", "Only large companies give feedback"], correctIndex: 1, explanation: "Feedback styles differ between sectors, such as tech startups versus traditional corporations." },
      { question: "What level of formality might be expected in finance or law sectors in Canada?", options: ["Extremely casual always", "More formal than many other industries", "No communication standards exist", "Exactly the same as tech startups"], correctIndex: 1, explanation: "Sectors like finance and law tend to maintain more formal communication norms than some other industries." },
    ],
  },
  {
    title: "Final exam & certification",
    objectives: [
      "Demonstrate mastery of business English skills acquired",
      "Successfully complete a simulated business scenario in English",
      "Earn the ARCADINS Business English certification",
    ],
    content: [
      "The final exam evaluates all four core skills developed throughout the program: written communication (email/report), oral presentation, meeting participation, and negotiation role-play in a realistic business scenario.",
      "Evaluators focus on effective communication and professional appropriateness rather than perfect grammar — the goal is functional business fluency, not academic perfection.",
      "Upon passing, the ARCADINS Business English certificate is issued, recognized by partner employers as proof of practical workplace English proficiency.",
    ],
    keyTakeaways: [
      "The exam prioritizes effective communication over grammatical perfection",
      "All four core skills (writing, speaking, meetings, negotiation) are evaluated",
      "The certificate is recognized across ARCADINS's employer partner network",
    ],
    resources: [],
    quiz: [
      { question: "What does the final exam primarily prioritize according to the module?", options: ["Perfect grammar above all else", "Effective communication and professional appropriateness", "Speed of typing only", "Memorization of vocabulary lists"], correctIndex: 1, explanation: "The exam focuses on functional, real-world communication ability rather than academic grammatical perfection." },
      { question: "Which four core skills are evaluated in the final exam?", options: ["Writing, speaking, meetings, negotiation", "Only grammar exercises", "Singing and dancing", "Only multiple-choice questions"], correctIndex: 0, explanation: "These four skills represent the full scope of business English competencies developed throughout the program." },
      { question: "What is issued upon successfully passing the final exam?", options: ["Nothing specific", "The ARCADINS Business English certificate", "A fine", "A free vacation"], correctIndex: 1, explanation: "Successful completion results in an official certificate recognizing the student's proficiency." },
      { question: "Is the certificate recognized by employers according to the module?", options: ["No, never", "Yes, by ARCADINS's partner employer network", "Only in one specific country", "Only for unrelated fields"], correctIndex: 1, explanation: "The certificate is designed to be recognized and valued by ARCADINS's network of partner employers." },
      { question: "What does the negotiation role-play component simulate?", options: ["A cooking competition", "A realistic business scenario", "A sports match", "An academic essay contest"], correctIndex: 1, explanation: "This component tests practical application of negotiation skills in a realistic professional context." },
      { question: "What is the overall goal of this Business English program according to the module?", options: ["Academic theoretical mastery only", "Functional workplace fluency", "Memorizing poetry", "Passing a driving test"], correctIndex: 1, explanation: "The program aims for practical, applicable English skills usable directly in Canadian workplace settings." },
    ],
  },
];
