import type { Lesson } from "@/types/lesson";

export const anglaisCommercialLessons: Lesson[] = [
  {
    title: "Business English fundamentals",
    objectives: [
      "Build core business vocabulary used across industries",
      "Understand formal vs informal register in English business contexts",
      "Balance directness with politeness in requests",
      "Construct clear, action-first professional sentences",
    ],
    content: [
      "Business English relies on a specific vocabulary set: stakeholder, deadline, deliverable, revenue, onboarding. Mastering these terms early makes every subsequent interaction — meetings, emails, presentations — significantly easier to navigate.",
      "For a fluent English speaker arriving in Canada, this specialized vocabulary can still be the first invisible hurdle: you may understand the language perfectly yet feel lost when a colleague mentions a 'tight deadline', asks for the 'deliverable' before the 'stand-up', or refers to 'onboarding' a new hire. These words are no harder than others, but their precise use in the workplace must become automatic. As long as you are still decoding these basic terms, you cannot fully focus on the substance of the exchange. Mastering the vocabulary first frees your attention for what really matters.",
      "English business communication in Canada tends to favor directness balanced with politeness. Phrases like 'I was wondering if...' or 'Would it be possible to...' soften requests while remaining clear, a balance many non-native speakers find tricky at first.",
      "This balance is a genuine cultural code, and getting it wrong cuts both ways. Speakers from more direct cultures may sound abrupt or even rude to Canadian ears by saying 'Send me the report today', when 'Could you send me the report by end of day?' carries the exact same request more smoothly. Conversely, speakers from cultures where requests are heavily indirect may sound vague, leaving colleagues unsure of what is actually being asked. The Canadian sweet spot is clear about the 'what' but soft about the 'how' — the request is unmistakable, but wrapped in a politeness marker. Learning a handful of these softening phrases lets you make firm requests without ever sounding harsh.",
      "Clear sentence construction in a professional context means short, action-oriented statements: state the point first, then the supporting detail. Avoid overly complex sentences that can obscure your meaning, especially in writing.",
      "This is reassuring news for the non-native speaker: professional English rewards clarity, not literary flourish. Nobody at work is impressed by long, ornate sentences — they want to understand you the first time. Leading with the main point ('We need to delay the launch') before the explanation ('because testing revealed a bug') respects the reader's time and removes ambiguity. Trying to sound sophisticated with complex, clause-heavy sentences usually backfires, burying the message. In business English, mastered simplicity is a mark of competence, not of limited vocabulary — and it is far more achievable than fluency in ornate prose.",
    ],
    caseStudy: {
      title: "Amara's blunt emails",
      body: [
        "Amara, a skilled project manager from Nigeria, speaks flawless English but keeps getting terse, cool replies from her Canadian colleagues. She is confused — her messages are perfectly clear and grammatically correct. She writes things like 'Send me the figures by noon' and 'This is wrong, fix it.' In her professional background, this directness was normal and efficient; nobody took offense.",
        "A friendly teammate gently explains how these messages land in a Canadian office: they read as curt, even aggressive, even though Amara means nothing of the sort. The issue is not her English — it is the missing layer of politeness that Canadian colleagues expect around requests and criticism. 'Send me the figures by noon' feels like an order; 'Could you send me the figures by noon? Thanks!' feels like a normal request between equals.",
        "Amara adjusts quickly. She keeps her clarity — the request stays unmistakable — but adds softening phrases and a warmer tone: 'Would you be able to…', 'When you have a moment…', 'Thanks so much.' The cool replies disappear and her working relationships warm up. The lesson: in Canadian business English, being understood is not enough — the balance of directness and politeness is a cultural code, and mastering it matters as much as the language itself.",
      ],
    },
    exercise: {
      title: "Master core vocabulary and the politeness balance",
      prompt: [
        "Build a mini-glossary of ten core business English terms (e.g. stakeholder, deadline, deliverable, onboarding, revenue…) and, for each, write one sentence using it in a realistic workplace situation.",
        "Take three blunt or overly direct requests (e.g. 'Send me the report now') and rewrite each to keep the request perfectly clear while adding an appropriate Canadian-style politeness marker.",
        "Take one long, overly complex sentence of your own invention and rewrite it as a short, action-first professional statement, leading with the main point.",
      ],
      deliverables: [
        "A glossary of ten business terms, each used in a workplace sentence",
        "Three blunt requests rewritten to balance clarity and politeness",
        "One complex sentence rewritten in a short, action-first form",
        "A short note on why the directness/politeness balance is a cultural code, not just grammar",
      ],
    },
    keyTakeaways: [
      "Core vocabulary should be automatic before tackling complex communication",
      "Fluency in English and mastery of its workplace codes are two different skills",
      "The Canadian balance: clear about the 'what', soft about the 'how'",
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
      "Choose greetings and closings appropriate to each context",
      "Lead with the main point rather than burying it",
      "Respond to complaints professionally, without defensiveness",
    ],
    content: [
      "An effective business email has a clear subject line, a brief greeting, a focused message (one main topic per email when possible), and a professional closing. Avoid burying the main request in the third paragraph — lead with it.",
      "The subject line is the most underestimated part of an email: it decides whether your message is read now, later, or never. 'Question' or 'Follow-up' tell the reader nothing; 'Approval needed by Friday 3pm — Q3 budget' lets them prioritize at a glance. In an inbox flooded with dozens of messages a day, a precise subject line is a courtesy to the reader — and it measurably increases your response rate. The body should then state its purpose immediately: is this email informing, requesting an action, or asking for a decision? Making that clear in the first line saves everyone time.",
      "Greetings range from formal ('Dear Mr. Smith') to semi-formal ('Hi John') depending on the relationship and company culture. Canadian workplaces often default to a friendly but professional tone, even in first contact emails.",
      "Choosing the right register is a small decision with real consequences. Too formal ('Dear Sir/Madam, I am writing to inquire…') can feel stiff and distant in a Canadian office that runs on first names; too casual ('Hey!') with a senior client you've never met can seem presumptuous. A safe strategy for newcomers is to start one notch more formal than you think necessary and then mirror the other person: if they reply with 'Hi Amara, thanks!' and their first name, you can match that warmth in your next message. Reading and adapting to the other person's register is often more important than any fixed rule.",
      "Responding to complaints in writing requires acknowledging the issue, taking ownership without being defensive, and proposing a concrete next step. A well-written response can turn a frustrated client into a loyal one.",
      "Written complaints carry a special danger: unlike a phone call, they leave a permanent record, and a defensive reply can be forwarded and re-read, making things worse. The instinct to explain why it wasn't your fault almost always backfires. The effective structure is disciplined: acknowledge the problem sincerely, take ownership without excuses, and propose a concrete next step with a timeline. 'You're right that the shipment was late, I'm sorry for the disruption — here's what we'll do…' defuses far more anger than a paragraph of justifications. A frustrated client doesn't want to win an argument; they want to feel heard and to see the problem fixed. Handled well, a complaint in writing can build more loyalty than a flawless transaction ever would.",
    ],
    caseStudy: {
      title: "The defensive reply that went up the chain",
      body: [
        "Diego, new to a Canadian firm, receives an email from an important client complaining that a delivery arrived late and incomplete. Stung and eager to defend his team, Diego fires back a long reply explaining that the warehouse was short-staffed, that the client's own address details were unclear, and that 'these things happen.' Every point may be partly true — but the tone is defensive, and he never actually apologizes or offers a solution.",
        "The client, now angrier, forwards the exchange to Diego's manager, who is dismayed: a recoverable complaint has become a relationship crisis, all preserved in writing for everyone to read. The problem was never the late delivery — those can be forgiven — but the defensive written response, which read as if the company cared more about being right than about the client.",
        "The manager coaches Diego on the acknowledge–own–resolve structure. Diego sends a new message: he acknowledges the late, incomplete shipment, apologizes sincerely without excuses, and proposes a concrete fix with a date. The client's tone softens immediately and the account is saved. The lesson: written complaints are permanent and forwardable, defensiveness makes them worse, and acknowledging plus proposing a solution turns a frustrated client into a loyal one.",
      ],
    },
    exercise: {
      title: "Write emails that get read and defuse complaints",
      prompt: [
        "Write a complete professional email for a realistic workplace situation (e.g. requesting an approval or sending an update): craft a precise subject line, an appropriate greeting, a body that states its purpose in the first line, and a professional closing.",
        "For the same content, write two versions of the greeting/closing: one for a senior external client you've never met, and one for a close teammate — and note what changes between them and why.",
        "Write a model reply to a realistic customer complaint, applying the acknowledge–own–resolve structure, and explain why avoiding defensiveness matters especially in writing.",
      ],
      deliverables: [
        "A complete professional email with a precise subject line and purpose stated up front",
        "Two register variations of the greeting/closing (senior client vs teammate), with rationale",
        "A model complaint reply structured as acknowledge, own, resolve",
        "A short note on why defensiveness is especially damaging in written communication",
      ],
    },
    keyTakeaways: [
      "A precise subject line decides whether an email is read, and lifts response rates",
      "Lead with your main point and state the email's purpose in the first line",
      "Match your greeting to the relationship, then mirror the other person's register",
      "Written complaints are permanent and forwardable — never reply defensively",
      "Acknowledge, take ownership, and propose action to turn a complaint into loyalty",
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
      "Use polite phrases to interject and ask for clarification",
      "Structure a clear business presentation with a hook and a call to action",
      "Handle questions, including ones you can't answer, with composure",
    ],
    content: [
      "Active participation in meetings means knowing how to interject politely ('If I may add...'), ask for clarification ('Could you elaborate on that?'), and summarize discussion points to confirm shared understanding before moving forward.",
      "For many non-native speakers, the hardest part of a meeting is not understanding — it is finding the moment and the words to speak up. In fast, overlapping English discussion, staying silent feels safer, but silence is often misread as disengagement or lack of ideas. A small toolkit of ready-made phrases removes this barrier: 'Can I jump in here?', 'Building on what Sarah said…', 'Just to make sure I understand…'. Having these phrases automatic means you don't have to invent them under pressure. Asking a clarifying question, far from revealing weakness, signals engagement — and often voices a doubt others in the room share but didn't dare to raise.",
      "A strong business presentation follows a simple structure: hook the audience's attention, state the purpose clearly, present supporting points in a logical order, and end with a clear call to action or summary of next steps.",
      "The opening seconds decide everything. An audience forms an impression fast, and beginning with 'Hello, my name is… and today I'm going to talk about…' wastes that precious window. Opening with the problem made vivid — a striking statistic, a short story, a question — captures attention immediately; you introduce yourself after you've hooked them. This structure is also a lifeline for non-native speakers: a clear framework ('here's the problem, here's my solution, here's what I'm asking for') lets the audience follow even through an accent or a hesitation. Clarity of structure forgives imperfections of language, whereas a linguistically perfect but disorganized talk loses the room.",
      "Handling questions confidently — even when you don't know the answer immediately — involves acknowledging the question, offering what you do know, and committing to follow up rather than guessing or going silent.",
      "The question period intimidates presenters most, precisely because it can't be rehearsed — yet it is where credibility is truly won or lost. The worst responses are guessing (which risks being caught out) and freezing in silence. The professional move, when you don't have the answer, is honest and simple: 'That's a great question. I don't have the exact figure in front of me, but I'll follow up with you by tomorrow.' This builds more trust than a confident-sounding guess. Admitting the limits of what you know, and committing to close the gap, signals reliability. Nobody expects a presenter to know everything; they expect honesty and follow-through.",
    ],
    caseStudy: {
      title: "Wei's silent meetings and the question he couldn't answer",
      body: [
        "Wei, a talented analyst from China, understands English meetings well but rarely speaks. In his previous work culture, speaking up in front of senior people uninvited would have been inappropriate, and asking a question might suggest he hadn't understood. So he listens attentively and says nothing. After a few weeks, his manager grows concerned that he is disengaged — a complete misreading of his careful attention.",
        "Coached to use simple entry phrases, Wei starts small: 'Just to confirm my understanding…', which is low-risk and shows engagement. Encouraged, he later gives a short presentation. He opens not with his name but with a striking figure about wasted processing time — and the room leans in. Then comes the moment he dreaded: a director asks a question he cannot answer precisely. Wei feels the old urge to freeze.",
        "Instead of guessing or going silent, he applies what he learned: 'That's an important question — I don't have the precise number here, but I'll send it to you by end of day.' The director nods, satisfied; the honesty lands as competence, not weakness. Wei follows up that afternoon, cementing his credibility. The lesson: in English-speaking Canadian meetings, speaking up is expected, a clear structure carries a presentation despite an accent, and honestly deferring a question you can't answer builds more trust than a confident guess.",
      ],
    },
    exercise: {
      title: "Prepare to participate and present under pressure",
      prompt: [
        "Prepare a personal toolkit of at least five ready-made English phrases for meetings: one to interject, one to ask for clarification, one to build on someone's point, one to summarize, and one to politely disagree.",
        "Outline a short business presentation on a topic of your choice, writing out specifically the opening hook (do not start by introducing yourself) and the closing call to action.",
        "Write out how you would respond, word for word, to a question you cannot answer during your presentation, applying the acknowledge–offer–follow-up approach.",
      ],
      deliverables: [
        "A toolkit of five ready-made meeting phrases covering distinct functions",
        "A presentation outline with an explicit opening hook and closing call to action",
        "A word-for-word response to an unanswerable question using acknowledge–offer–follow-up",
        "A note on why structure carries a presentation despite an imperfect accent",
      ],
    },
    keyTakeaways: [
      "A small toolkit of ready-made phrases removes the barrier to speaking up",
      "Asking a clarifying question signals engagement, not weakness",
      "Open a presentation with a hook, not your name; end with a call to action",
      "A clear structure carries a presentation despite an accent or hesitation",
      "Honestly deferring a question you can't answer builds more trust than a guess",
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
      "Use appropriate negotiation vocabulary and phrasing in English",
      "Present a position assertively without aggression",
      "Handle counteroffers by reframing around shared interests",
      "Distinguish assertiveness from aggression across cultures",
    ],
    content: [
      "Negotiation language includes phrases like 'I propose that...', 'What if we considered...', and 'I understand your position, however...'. These expressions allow disagreement while maintaining a collaborative tone.",
      "These phrases are especially valuable for the non-native speaker because they steer a safe path between two failures: bluntness and passivity. 'You're wrong' shuts the conversation down and creates an opponent; saying nothing for fear of phrasing it badly forfeits your point entirely. The middle path — 'I see your point; however, the numbers suggest another approach' — acknowledges the other side while firmly holding your ground. In negotiation, form is not decoration: it determines whether the other party digs in or stays open. Mastering a small set of these expressions lets you disagree firmly without ever sounding hostile, which is exactly the balance English-speaking Canadian business culture rewards.",
      "Assertive presentation in English negotiation means stating your position with supporting facts, not just opinions, while remaining open to alternative solutions. Confidence comes from preparation, not volume or aggression.",
      "The line between assertive and aggressive is drawn differently across cultures, and newcomers must watch for it carefully. In some business cultures, raising your voice and pushing hard signal conviction and are expected; in Canada, the same behavior often reads as aggression that undermines your case, however sound it is. Canadian assertiveness shows itself differently — through the strength of your facts, a calm tone, and readiness to offer a solution rather than merely to complain. 'Here's the issue, and here are two options to solve it' inspires far more confidence than 'This is unacceptable, something must be done.' You win by preparation, not by the volume of your voice.",
      "When handling counteroffers, listening fully before responding, then reframing the conversation around shared interests rather than fixed positions, tends to produce better outcomes for both sides.",
      "The most powerful shift in negotiation is moving from positions to interests. A position is what someone says they want ('I need a 20% discount'); an interest is why they want it ('I need to hit my budget this quarter'). When two parties dig into opposing positions, they deadlock. When they uncover the interests beneath, new solutions appear — perhaps a longer payment term serves the budget just as well as a discount. Listening fully before you respond is what lets you hear those underlying interests instead of only the stated demand. Reframing around what both sides truly need turns a tug-of-war into a shared problem to solve, and it consistently produces better, more durable outcomes than a battle of fixed positions.",
    ],
    caseStudy: {
      title: "From ultimatum to agreement: Diego negotiates a contract",
      body: [
        "Diego, negotiating a supplier contract for his Canadian employer, is passionate and used to a forceful style. When the supplier resists on price, Diego raises his voice and declares the terms 'simply unacceptable,' pushing hard the way conviction was shown back home. The room tenses; the supplier grows defensive, and the talks stall. His manager later explains that his intensity read not as strength but as aggression, distracting from his otherwise solid case.",
        "At the next session, Diego changes his approach without abandoning his goal. He listens fully to the supplier's resistance and hears the real interest beneath the stated position: the supplier isn't simply greedy — they fear the low margin on a small first order. That is an interest, not just a price demand. Diego reframes: 'I understand the concern about margin on a first order; what if we committed to a larger annual volume in exchange for the price we need?'",
        "By trading a fixed position for a shared interest, both sides find room to agree — better price for Diego, guaranteed volume for the supplier. Calm, factual, and solution-oriented, Diego closes the deal. The lesson: in English-speaking Canadian negotiation, assertiveness comes from preparation and facts, not volume; and reframing around interests rather than positions turns a standoff into an agreement both sides can accept.",
      ],
    },
    exercise: {
      title: "Negotiate by reframing positions into interests",
      prompt: [
        "Choose a realistic negotiation scenario (e.g. price, deadline, workload) and write out your opening position along with two or three supporting facts — not just opinions — to present it assertively.",
        "For the other party, write their likely stated position, then infer the underlying interest behind it, and propose a reframe that addresses that interest and could unlock agreement.",
        "Write three English negotiation phrases you would use to disagree while keeping a collaborative tone, and add a short note distinguishing assertiveness from aggression in the Canadian context.",
      ],
      deliverables: [
        "An opening position supported by two or three facts",
        "The other party's position, its underlying interest, and a reframe that addresses it",
        "Three collaborative disagreement phrases in English",
        "A note distinguishing assertiveness from aggression across cultures",
      ],
    },
    keyTakeaways: [
      "Negotiation phrasing lets you disagree firmly without sounding hostile",
      "The line between assertive and aggressive differs by culture — in Canada, calm and facts win",
      "Assertiveness comes from preparation and facts, not tone of voice",
      "Move from positions ('what') to interests ('why') to unlock new solutions",
      "Listening fully before responding reveals the interests that resolve deadlocks",
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
      "Structure a professional business report for busy readers",
      "Write an executive summary that stands on its own",
      "Use active voice for clarity and accountability",
      "Avoid common grammar and style errors in business writing",
    ],
    content: [
      "A business report typically follows this structure: executive summary, introduction/context, methodology (if applicable), findings, and recommendations. Each section should be scannable with clear headings for busy readers.",
      "The key insight is that almost nobody reads a report from start to finish, word for word. A busy decision-maker scans it: they read the executive summary, jump between headings, and land on the recommendations. A good report is therefore designed for this scanning behavior — each heading is informative, the key points stand out, and the essentials sit at the top of each section rather than buried on page seven. Writing to be scanned is not a lowering of standards; it is respect for the reader's time, and it is what makes a report actually get used rather than filed away unread.",
      "An executive summary condenses the entire report into a few sentences or a short paragraph, allowing a reader to grasp the key takeaway without reading the full document — a skill highly valued by senior management.",
      "Because the executive summary is often the only part a senior reader ever reads, it must stand entirely on its own. Someone who reads nothing else should still understand the situation, the key findings, and the decision being asked of them. This is deceptively hard: it forces you to distill pages of analysis into its essence, which is far more difficult than simply writing more. A weak summary teases ('this report examines several factors…') without delivering the conclusion; a strong one states it plainly ('sales fell 12% due to the pricing change; we recommend reverting by Q3'). If you can only perfect one paragraph of a report, make it the executive summary.",
      "Common errors to avoid include overusing passive voice (which can obscure who is responsible for an action), inconsistent verb tense, and overly long sentences that bury the main point in subordinate clauses.",
      "Passive voice deserves special attention because it doesn't just muddy style — it hides accountability. 'Mistakes were made' conveniently omits who made them; 'The deadline was missed' avoids naming who missed it. In business writing, this vagueness is sometimes accidental and sometimes a way to dodge responsibility, but either way it weakens the message and can erode trust. Active voice ('Our team missed the deadline because…') is clearer, more honest, and more credible. Combined with consistent tense and short sentences that lead with the point, active voice is the single most reliable way for a non-native writer to sound competent and clear — no advanced vocabulary required.",
    ],
    caseStudy: {
      title: "The report nobody acted on",
      body: [
        "Priya, an analyst, spends two weeks producing a thorough, well-researched report on why a product line is losing money. She is proud of its depth. But weeks later, nothing has changed, and she is frustrated that her careful work seems ignored. When she asks her director, the answer stings: the director admits she only skimmed it and couldn't quickly find the bottom line.",
        "Reviewing the report, Priya sees the problems. The executive summary was vague — 'this report analyzes several contributing factors' — so it teased without delivering the conclusion. The findings that mattered were buried on page six under a generic heading. And key sentences hid behind passive voice: 'a decline in margin was observed,' rather than stating plainly what caused it and who should act. A busy reader scanning the document simply couldn't extract the message.",
        "Priya rewrites it for how executives actually read. The executive summary now stands alone and states the conclusion and recommendation up front. Headings are informative, the crucial finding leads its section, and active voice makes cause and responsibility clear. This time the director grasps it in two minutes and acts on the recommendation. The lesson: a report's value lies not in its depth but in whether its message reaches a scanning reader — a standalone executive summary, informative headings, and active voice are what turn analysis into action.",
      ],
    },
    exercise: {
      title: "Write a report that a busy reader will actually use",
      prompt: [
        "Draft a standalone executive summary (about five to six lines) for a fictional business report, ensuring that a reader who reads nothing else understands the situation, the key finding, and the decision or action requested.",
        "Write three informative section headings for the same report — headings that convey content at a glance, not generic labels like 'Introduction' or 'Analysis.'",
        "Take three sentences written in passive voice (of your own invention) and rewrite each in active voice, then note how the change clarifies who is responsible for each action.",
      ],
      deliverables: [
        "A standalone executive summary conveying situation, key finding, and requested decision",
        "Three informative, scannable section headings",
        "Three passive-voice sentences rewritten in active voice, with a note on clarity gained",
        "A short explanation of why reports are written to be scanned, not read in full",
      ],
    },
    keyTakeaways: [
      "Reports are scanned, not read in full — design them for that behavior",
      "Every report section should be scannable with clear, descriptive headings",
      "A strong executive summary must stand entirely on its own",
      "Passive voice hides accountability; active voice is clearer and more honest",
      "Active voice and short sentences make a non-native writer sound competent and clear",
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
      "Use precise terminology to demonstrate expertise and build trust",
      "Learn sector vocabulary in context rather than from isolated lists",
    ],
    content: [
      "Each industry carries specialized vocabulary: finance ('ROI', 'liquidity', 'portfolio'), tech ('deployment', 'scalability', 'stakeholder'), healthcare ('patient intake', 'compliance'). Building this vocabulary accelerates professional credibility.",
      "An experienced professional can arrive in Canada and feel the disorienting sensation of no longer recognizing the vocabulary of their own field — not because their expertise has vanished, but because the local terms differ. A seasoned accountant knows the concepts behind 'liquidity' and 'ROI' intimately, yet may stumble if the English labels are unfamiliar. The encouraging reality is that this gap is finite and sector-specific: a few dozen terms often separate a newcomer from sounding fully fluent in their own domain. Targeting the vocabulary of your specific industry, rather than trying to learn 'all of business English' at once, is by far the fastest route back to professional confidence.",
      "Canadian workplaces commonly use acronyms like KPI (Key Performance Indicator), SOP (Standard Operating Procedure), and ASAP — understanding these prevents confusion in fast-paced meetings and written communication.",
      "Acronyms are a language within the language, and they are used as if everyone already knows them — which is exactly what makes them treacherous for a newcomer. In a fast meeting, someone says 'we need the KPIs in the SOP ASAP,' and if those three acronyms are opaque to you, the whole sentence collapses into noise. There is no shame in not knowing them; there is real cost in pretending to. A practical habit is to keep a running personal list of the acronyms you hear at work and quietly look them up. Asking 'sorry, what does that acronym stand for?' once is far better than nodding through a dozen meetings without understanding.",
      "Using precise industry terminology, rather than vague general language, signals expertise and builds trust with colleagues and clients, particularly important for newcomers establishing professional credibility in a new market.",
      "How you learn this vocabulary matters as much as the words themselves. Memorizing isolated lists ('liquidity = …') fades fast and doesn't prepare you to use a term correctly at the right moment. Learning each term inside a real sentence, as it is actually used at work, anchors it in usage — you remember 'we improved liquidity by shortening payment terms,' not a dictionary definition floating free. Reading documents from your sector, listening to how colleagues phrase things, and noting terms in context turns vocabulary into reflex rather than recitation. The precision that results is what makes an employer hear an integrated professional rather than a hesitant beginner.",
    ],
    caseStudy: {
      title: "Kofi, the engineer who spoke his field in the wrong words",
      body: [
        "Kofi, an experienced mechanical engineer from Ghana, has strong English and deep expertise. Yet in his first weeks at a Canadian firm, he feels strangely incompetent: colleagues throw around acronyms — 'send me the BOM,' 'what's the ETA on the QA?' — and reference terms for tools and processes that differ from those he used abroad. He knows the underlying engineering perfectly, but the local vocabulary trips him up, and he begins to doubt himself.",
        "The misunderstanding runs both ways. Kofi reads his own confusion as a professional shortcoming, when it is only a vocabulary gap. And colleagues, seeing him hesitate on basic terms, briefly underestimate his considerable skill. The lexical mismatch was masking real expertise on both sides.",
        "Kofi builds a personal glossary: every unfamiliar acronym and term he hears, he notes with its meaning and a real sentence in which it was used. He isn't shy about asking, once, what an acronym stands for. Within weeks these words become natural, and his expertise — no longer hidden behind an unfamiliar vocabulary — is finally visible to everyone. The lesson: mastering your industry's local terminology in Canada doesn't add to your competence, it reveals it; learned in context, a finite set of terms is enough to close the gap fast.",
      ],
    },
    exercise: {
      title: "Build an industry glossary in context",
      prompt: [
        "Choose an industry (ideally your own) and build a glossary of at least ten key terms or acronyms common in Canadian workplaces in that field (including general ones like KPI, SOP, ROI where relevant).",
        "For each term, don't just give a definition — write one realistic sentence using it as it would actually be spoken or written at work.",
        "Identify three terms in your field whose Canadian English label differs from what you knew elsewhere, and write a short note on why using the precise local term builds credibility with colleagues and clients.",
      ],
      deliverables: [
        "A glossary of at least ten industry terms/acronyms",
        "A realistic in-context sentence for each term",
        "Three terms whose local English label differs from what you knew elsewhere",
        "A note linking precise terminology to professional credibility",
      ],
    },
    keyTakeaways: [
      "Mastering local industry vocabulary reveals your expertise rather than adding to it",
      "The gap is finite and sector-specific — target your field, not all of business English",
      "Common workplace acronyms are essential to avoid confusion in daily communication",
      "Asking once what an acronym means beats nodding through meetings without understanding",
      "Learning terms in real sentences turns vocabulary into reflex, not recitation",
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
      "Navigate a flat hierarchy and diplomatic disagreement",
      "Decode indirect feedback and the 'sandwich' approach",
      "Adapt your communication style by observing before assuming",
    ],
    content: [
      "Canadian workplace culture generally values politeness, consensus-building, and a relatively flat hierarchy compared to many other countries. Direct confrontation is rare; disagreement is usually expressed diplomatically.",
      "This flat hierarchy surprises newcomers from more hierarchical cultures, and misreading it causes real friction. When a Canadian manager asks a junior employee 'What do you think?' in a meeting, they usually mean it — they want genuine input, not a deferential echo of their own view. Staying silent out of respect can read as disengagement, while politely offering a different opinion, backed by reasons, is generally welcomed. This doesn't mean hierarchy has vanished; decisions still have owners. But participation is expected across levels, and the person who contributes thoughtfully — even to disagree with a superior — is usually valued, not penalized. Understanding this changes how actively you engage.",
      "Feedback culture in Canada tends to favor a 'sandwich' approach — positive comment, constructive criticism, positive comment — though this varies by industry and company size. Tech startups often favor more direct feedback than traditional corporations.",
      "This indirectness is a frequent source of cross-cultural misunderstanding, in both directions. A Canadian colleague's feedback often comes wrapped in softening language — 'This is a really good start; it might be worth revisiting the data section; overall great effort' — where the real message is 'the data section needs work.' A newcomer used to blunt feedback may miss the criticism entirely and hear only praise. Conversely, feedback that is normal and direct elsewhere can feel harsh here. The skill is learning to hear the message inside the politeness: when someone says 'it might be worth considering…', they are usually asking you to change something. When in doubt, rephrase to confirm: 'So you'd like me to rework the data section?'",
      "Adapting communication style means observing how colleagues interact before adopting a particular tone: some Canadian workplaces are quite informal (first names, casual language) while others, especially in finance or law, remain more formal.",
      "There is no single 'Canadian workplace' to memorize, which is why observation beats assumption. A tech startup and a law firm can both be thoroughly Canadian yet operate by very different codes — one with hoodies and first names and blunt Slack messages, the other with suits, titles, and carefully worded emails. Arriving with a fixed script for 'how Canadians communicate' will misfire in half of workplaces. The reliable strategy is to watch first: how do colleagues address the boss, how do they disagree, how formal are their emails, how much humor is acceptable? Then calibrate your own tone to match. Observing before imitating is the safest and fastest way to fit into any specific workplace culture.",
    ],
    caseStudy: {
      title: "The praise Ling didn't realize was criticism",
      body: [
        "Ling, newly arrived from a direct-feedback work culture, submits a draft plan to her Canadian manager. The manager replies warmly: 'This is a great start, Ling! It might be worth taking another look at the timeline section, but overall really solid work.' Ling hears mostly praise — 'great start,' 'really solid' — and files the plan as approved, moving on to other tasks. The soft 'it might be worth' registered to her as an optional suggestion.",
        "Two weeks later, the manager is puzzled that the timeline was never revised. To Ling, it had sounded like a compliment with a minor aside; to the manager, 'it might be worth taking another look' was a clear, if polite, request to redo that section. Neither was wrong — they were operating by different feedback codes, and the softened Canadian criticism had sailed past Ling entirely.",
        "A colleague helps Ling learn to 'translate' Canadian feedback: gentle phrases like 'you might consider…' or 'I wonder if…' usually contain a real ask. Ling adopts a simple safeguard — when unsure, she rephrases to confirm: 'Just to make sure — would you like me to rework the timeline?' The misunderstandings stop. The lesson: Canadian workplace feedback is often wrapped in politeness, and the skill is hearing the message beneath it; when in doubt, confirming by rephrasing is the best safety net.",
      ],
    },
    exercise: {
      title: "Decode Canadian feedback and calibrate your tone",
      prompt: [
        "Take three examples of softened Canadian-style feedback (e.g. 'it might be worth considering…', 'this is a good start, but…', 'I wonder if…') and, for each, spell out the direct request likely hidden inside it.",
        "Write two versions of a disagreement you might voice to a superior in a meeting: one appropriately diplomatic for a Canadian context, and note what makes it land as respectful rather than confrontational.",
        "Describe how you would 'observe before assuming' in a new workplace: list at least four specific things you would watch for (forms of address, email formality, how people disagree, use of humor) before calibrating your own tone.",
      ],
      deliverables: [
        "Three pieces of softened feedback 'translated' into their direct request",
        "A diplomatic way to disagree with a superior, with a note on why it lands as respectful",
        "A list of at least four workplace signals to observe before calibrating your tone",
        "A rephrasing technique to confirm feedback you're unsure about",
      ],
    },
    keyTakeaways: [
      "A flat hierarchy means input is expected across levels — silence reads as disengagement",
      "Canadian workplaces generally favor diplomatic disagreement over direct confrontation",
      "Softened feedback usually contains a real request — learn to hear the message beneath the politeness",
      "When unsure of feedback, confirm by rephrasing what is being asked",
      "There is no single Canadian workplace: observe the specific culture before imitating it",
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
      "Demonstrate integrated mastery of business English skills acquired",
      "Complete a realistic simulated business scenario in English",
      "Communicate effectively rather than aim for grammatical perfection",
      "Earn the ARCADINS Business English certification",
    ],
    content: [
      "The final exam evaluates all four core skills developed throughout the program: written communication (email/report), oral presentation, meeting participation, and negotiation role-play in a realistic business scenario.",
      "These four tasks are not chosen at random: they mirror the four situations in which professionals actually use English at work. Understanding and contributing in a meeting (module 3), writing a clear message or report (modules 2 and 5), presenting an idea (module 3), and negotiating or handling a difficult exchange (module 4) — the exam brings the whole program together into authentic simulations. You don't recite grammar rules; you demonstrate that you can function in an English-speaking Canadian workplace. Each component draws on the vocabulary, phrasing, and cultural codes practiced across the modules.",
      "Evaluators focus on effective communication and professional appropriateness rather than perfect grammar — the goal is functional business fluency, not academic perfection.",
      "This criterion should reassure the anxious candidate. A Canadian employer is not hiring a grammar teacher; they need someone who can understand, be understood, and collaborate. A candidate with imperfect English who is clear, structured, and confident outperforms a grammatically flawless one who is confusing or paralyzed by fear of mistakes. The exam therefore rewards what actually matters in the workplace: getting the message across and interacting professionally — accent and small imperfections included. Aiming for effective communication rather than perfection removes a counterproductive pressure and reflects how real workplaces judge people every day.",
      "Upon passing, the ARCADINS Business English certificate is issued, recognized by partner employers as proof of practical workplace English proficiency.",
      "This certificate carries concrete value in a job search. For an employer, it provides third-party, verifiable evidence that a candidate can operate in English in a professional setting — resolving a common uncertainty when hiring a newcomer. Added to a résumé or mentioned in an interview, it turns a hard-to-prove skill into a tangible asset, and opens doors, especially for those seeking a recognized first Canadian experience. But beyond the document, the real achievement of the program is confidence: knowing you can write an email that gets a reply, speak up in a meeting without fear, present an idea, and hold your own in a negotiation. The certificate attests; the fluency opens doors.",
    ],
    caseStudy: {
      title: "Exam day: everything comes together for Samuel",
      body: [
        "Samuel, a newcomer who worked hard through the program, walks into the final exam nervous about his imperfect English and afraid of making mistakes. The first task is a simulated meeting he must follow and then summarize. He draws on module 3: he listens actively, uses a clarifying phrase, and reformulates the key points — capturing the essence without catching every word.",
        "Next comes a written email, where he applies module 2: a precise subject line, the request stated in the first line, a professional close. His English isn't flawless, but the message is unmistakably clear. In the presentation, he opens with a hook rather than his name, and his clear structure carries him through a few hesitations. Finally, in the negotiation role-play, he stays calm, supports his position with facts, and reframes around a shared interest instead of pushing hard.",
        "At no point does Samuel produce perfect English — and yet he passes comfortably, because the evaluators measure effective communication, not perfection. Each task drew on a different module, proving these were never isolated lessons but one connected set of workplace skills. He earns his ARCADINS certificate and, through the partner network, soon lands a role. The lesson: business English mastery is judged not by the absence of errors, but by the ability to understand, be understood, and interact — exactly what the workplace needs.",
      ],
    },
    exercise: {
      title: "Self-assess across the four core skills",
      prompt: [
        "Prepare a self-assessment across the four skills the exam evaluates: written communication, oral presentation, meeting participation, and negotiation. For each, note one strength you've gained and one area to consolidate in real situations.",
        "Choose the skill where you feel least confident and do a concrete practice piece: for example, write the email, or the outline of a presentation, or a full negotiation exchange.",
        "Write a short personal reflection: how does aiming for 'effective communication' instead of 'grammatical perfection' change your relationship to the exam and, more broadly, to working in English in Canada?",
      ],
      deliverables: [
        "A self-assessment across the four core skills (one strength and one gap each)",
        "A concrete practice piece for your least confident skill",
        "A reflection on shifting from 'perfection' to 'effective communication'",
        "A three-point action plan to prepare for the final exam",
      ],
    },
    keyTakeaways: [
      "The exam brings the whole program together into four authentic workplace situations",
      "The exam prioritizes effective communication over grammatical perfection",
      "A clear, confident message outperforms flawless grammar that is confusing or fearful",
      "The certificate gives employers third-party, verifiable proof of workplace English",
      "The real achievement of the program is workplace confidence, beyond the certificate",
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
