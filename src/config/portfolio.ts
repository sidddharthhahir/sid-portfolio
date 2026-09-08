// ============================================================
// PORTFOLIO CONFIG — single source of truth for all content.
// Voice rule: nothing here is copied from the resume or LinkedIn.
// Same facts, calm and specific — matching the resume's tone.
// ============================================================

export const PORTFOLIO = {

  personal: {
    name: 'Siddharth Ahir',
    title: 'AI Engineer',
    location: 'Berlin, Germany',
    email: 'sidahir25820@gmail.com',
    phone: '+49 17657938787',
    photo: '/__l5e/assets-v1/ad4f1d2a-f86a-4d84-869c-0da320ed0313/siddharth-photo.png',

    bio: `I build LLM systems end to end — the model calls, and the infrastructure that has to hold them up. For six months at Firmway that meant finding cost and performance problems in a production AI system before users or invoices found them.

I came to AI from full-stack work expecting the model to be the hard part. It was not. The hard part is proving what a system costs, where it spends its time, and whether an answer is grounded in something real. So that is what I build: retrieval, agents and backends that can show their work.

Alongside an MSc in Data Science in Berlin, I keep building my own projects — mostly because each one started as a problem I had.`,
  },

  typewriterPhrases: [
    'AI Engineer · MSc Data Science, Berlin',
    'LLM systems built end to end — model to infrastructure',
    'Six months keeping a production AI system honest about cost',
    'Retrieval, multi-agent systems, applied AI',
    'Python · FastAPI · TypeScript · OpenTelemetry',
  ],

  social: {
    github: 'https://github.com/sidddharthhahir',
    githubHandle: 'github.com/sidddharthhahir',
    linkedin: 'https://www.linkedin.com/in/siddharth-ahir-798754262/',
    linkedinHandle: 'linkedin.com/in/siddharth-ahir',
  },

  resume: {
    url: '/siddharth-ahir-resume.pdf',
    fileName: 'Siddharth Ahir Resume.pdf',
  },

  howIWork: [
    'Make it visible before optimising it — guessing is the expensive option',
    'Configuration over code changes, so swapping a vendor is a one-line edit',
    'A number nobody can trace is not a number I trust',
    'I would rather remove a clever abstraction than defend it',
    'Most of my projects began as something that was annoying me personally',
  ],

  experience: [
    {
      role: 'AI Engineer — Working Student',
      company: 'Firmway GmbH',
      location: 'Frankfurt, Germany',
      date: 'Mar 2026 – Sep 2026',
      story: [
        `Six months on a production AI system, mostly spent on the question nobody asks until it is late: what is this actually costing us, and where is the time going?`,
        `I built a cost dashboard that breaks spend down by model and provider. It paid for itself before launch — when a new model was added, the pricing logic would have undercounted our spend by a third, and the breakdown made that obvious. I also built the Quotation Planner, a config-driven service that estimates project cost and yield from company data before a single request is made.`,
        `On the infrastructure side I put OpenTelemetry tracing across 8 microservices in Python and Java. One waterfall view ended weeks of speculation: a single API call accounted for 88% of request time. I moved hardcoded prompts into Langfuse so AI behaviour became configurable instead of a deployment, made Exa and Bright Data interchangeable search providers behind one config value, and added PostHog to the customer app so product decisions ran on real usage rather than assumptions.`,
      ],
      highlights: [
        'AI cost dashboard by model and provider',
        'Pricing bug caught pre-deploy — a third of spend uncounted',
        'Quotation Planner: config-driven cost and yield prediction',
        'OpenTelemetry across 8 services — found the 88% bottleneck',
        'Prompts moved to Langfuse; Exa/Bright Data made swappable',
        'PostHog analytics in the customer app',
      ],
    },
  ],

  education: [
    {
      degree: 'MSc Data Science',
      school: 'Arden University Berlin',
      location: 'Berlin, Germany',
      date: 'May 2026 – Present',
      note: 'Taking the maths seriously instead of on faith',
    },
    {
      degree: 'MSc Computer Science',
      school: 'IU International University of Applied Sciences',
      location: 'Berlin, Germany',
      date: 'Sep 2023 – Apr 2026',
      note: 'Thesis: MovieWise XAI — graded 1.3 (94/100)',
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      school: 'Gujarat University',
      location: 'India',
      date: 'Jul 2019 – Apr 2022',
      note: '',
    },
  ],

  skills: [
    {
      category: 'AI & LLM',
      color: 'red',
      items: [
        { name: 'LLM Integration', description: 'Model calls wrapped in cost, retry and trace context', linkedProject: 'Pulse' },
        { name: 'RAG', description: 'Answers that must cite a source that actually exists', linkedProject: 'Madhav' },
        { name: 'Prompt Engineering', description: 'Versioned, configurable prompts — not redeployments', linkedProject: 'Pulse' },
        { name: 'AI Agents', description: 'Specialised agents in a pipeline, with a human gate', linkedProject: 'Pulse' },
        { name: 'Hybrid Retrieval', description: 'Keyword and semantic search working together', linkedProject: 'Madhav' },
        { name: 'Structured Output', description: 'Schema-bound results that are storable and comparable', linkedProject: 'Startup Intelligence Agent' },
      ],
    },
    {
      category: 'Backend',
      color: 'emerald',
      items: [
        { name: 'Python', description: 'Where most of my AI services live', linkedProject: 'Madhav' },
        { name: 'Java', description: 'Production backend services at Firmway', linkedProject: null },
        { name: 'FastAPI', description: 'Thin, typed APIs in front of retrieval', linkedProject: 'Madhav' },
        { name: 'Django', description: 'Earlier full-stack Python products, end to end', linkedProject: null },
        { name: 'Node.js', description: 'API layers and document-processing jobs', linkedProject: 'AI Resume Customizer' },
        { name: 'REST APIs', description: 'Boring, predictable contracts on purpose', linkedProject: 'Startup Intelligence Agent' },
        { name: 'Docker', description: 'If it runs on my laptop, it runs on yours', linkedProject: null },
      ],
    },
    {
      category: 'Observability',
      color: 'amber',
      items: [
        { name: 'OpenTelemetry', description: 'Rolled out across 8 services — the 88% discovery', linkedProject: null },
        { name: 'Langfuse', description: 'Tracing and configuring LLM calls, not just logging them', linkedProject: null },
        { name: 'Distributed Tracing', description: 'Replacing "it feels slow" with a waterfall chart', linkedProject: null },
      ],
    },
    {
      category: 'Databases',
      color: 'purple',
      items: [
        { name: 'PostgreSQL', description: 'Default choice until something proves otherwise', linkedProject: 'Startup Intelligence Agent' },
        { name: 'Supabase', description: 'Auth, storage and Postgres without the setup tax', linkedProject: null },
        { name: 'MySQL', description: 'Relational storage for earlier products', linkedProject: 'AI Resume Customizer' },
      ],
    },
    {
      category: 'Frontend',
      color: 'blue',
      items: [
        { name: 'React', description: 'Interfaces for the systems I build', linkedProject: 'AI Resume Customizer' },
        { name: 'Next.js', description: 'Full-stack apps with server-side LLM calls', linkedProject: 'Startup Intelligence Agent' },
        { name: 'TypeScript', description: 'Types as the documentation I will actually read', linkedProject: 'AI Resume Customizer' },
        { name: 'Tailwind CSS', description: 'Ship the UI without inventing a design system', linkedProject: null },
      ],
    },
  ],

  projects: [
    {
      title: 'MovieWise XAI',
      subtitle: "Master's thesis · graded 1.3",
      emoji: '🎬',
      featured: true,
      description: `A recommender that has to justify itself. Every suggestion arrives with a plain-language reason, written by a locally hosted LLM from the same evidence that drove the ranking — no external API, no data leaving the machine.`,
      technologies: ['Python', 'LightFM', 'TF-IDF', 'Ollama', 'Streamlit'],
      features: [
        'Hybrid collaborative + content ranking',
        'Explanations grounded in the ranking evidence',
        'Fully local inference for privacy',
        'Independently developed thesis — graded 1.3 (94/100)',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/MovieWise-XAI',
      metrics: '🎓 Graded 1.3 (94/100) · Dec 2025',
      caseStudy: {
        problem: 'People do not act on a ranking they cannot interrogate. Accuracy without a reason is a dead end.',
        approach: 'Rank with a hybrid model, retrieve supporting metadata with TF-IDF, then let a local LLM turn that evidence — and only that evidence — into a short explanation.',
        results: 'Every recommendation ships with a readable, checkable reason. Graded 1.3 (94/100).',
      },
    },
    {
      title: 'Madhav',
      subtitle: 'Citation-grounded RAG',
      emoji: '📖',
      featured: false,
      description: `Question answering over the Bhagavad Gita where a citation is a promise. Keyword and semantic retrieval find candidate verses, then every citation is verified against the source text before an answer is generated.`,
      technologies: ['Python', 'FastAPI', 'Hybrid Retrieval', 'Embeddings'],
      features: [
        'Hybrid keyword + semantic retrieval',
        'Citations verified against the source before responding',
        'Verse-level grounding, no invented references',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/madhav',
      metrics: '📅 Aug 2026',
      caseStudy: {
        problem: 'RAG systems invent sources with complete confidence. On a text people hold sacred, that is not a rough edge — it is a dealbreaker.',
        approach: 'Run lexical and vector retrieval together, then gate the response on a verification pass that resolves each cited verse in the corpus.',
        results: 'Every answer is traceable to a verse you can open yourself.',
      },
    },
    {
      title: 'Pulse',
      subtitle: 'Five agents, one human veto',
      emoji: '⚡',
      featured: false,
      description: `A LinkedIn content pipeline run by five specialised agents — research, ranking, drafting, editing, tone — that stops for human approval before anything publishes. Post performance feeds back in, so next week's topic ranking is informed by last week's reality.`,
      technologies: ['Python', 'Multi-Agent Orchestration', 'LLM APIs'],
      features: [
        'Five specialised agents in one coordinated pipeline',
        'Hard human approval gate before publishing',
        'Performance data feeding back into topic selection',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/Pulse-',
      metrics: '📅 Jun 2026',
      caseStudy: {
        problem: 'One-shot prompting produces content that sounds like everyone else, with no control over what ships.',
        approach: 'Split the work across research, ranking, drafting, editing and tone agents, with an explicit approval step and metrics fed back into ranking.',
        results: 'Drafts that sound like a person, with a person still deciding.',
      },
    },
    {
      title: 'Startup Intelligence Agent',
      subtitle: 'A verdict, not a vibe',
      emoji: '🧭',
      featured: false,
      description: `Feed it an idea and it evaluates market size, competition and execution feasibility, each as its own schema-bound reasoning pass, before producing a structured verdict. If the idea looks promising, it generates a working landing page in the same session.`,
      technologies: ['Next.js', 'PostgreSQL', 'TypeScript', 'Structured LLM Output'],
      features: [
        'Market, competition and feasibility scored separately',
        'Strict output schemas — results are comparable and storable',
        'Landing page generated for promising ideas',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/startup-intelligence-agent',
      metrics: '📅 May 2026',
      caseStudy: {
        problem: 'Validating an idea usually means a week of scattered tabs and an answer you cannot compare to anything.',
        approach: 'Each analysis stage is its own LLM call with a strict schema, so results are storable, comparable across ideas, and cheap to re-run.',
        results: 'A repeatable validation report plus a landing page to test demand for real.',
      },
    },
    {
      title: 'AI Resume Customizer',
      subtitle: 'Tailoring without fiction',
      emoji: '📄',
      featured: false,
      description: `Parses a resume and a job description, then rewrites emphasis and phrasing to match — without inventing a single skill. Includes ATS checks, application tracking and PDF/DOCX export. Built because the process was wearing me down.`,
      technologies: ['React', 'Node.js', 'MySQL', 'LLM APIs'],
      features: [
        'One-click tailoring with zero fabricated experience',
        'ATS optimisation checks',
        'Application tracking and PDF/DOCX export',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/ai-resume-customizer',
      metrics: '📅 Sep 2025',
      caseStudy: {
        problem: 'Tailoring a resume per application is slow, and most AI tools "solve" it by lying on your behalf.',
        approach: 'Match real experience against the job requirements and rewrite only wording and ordering — claims stay untouched.',
        results: 'Faster applications, and a resume that still holds up in the interview.',
      },
    },
  ],

  goals: {
    headline: 'Where I am headed',
    subheadline: 'Next five years',
    story: [
      {
        year: 'Now — 2026',
        title: 'Production, not prototypes',
        content: 'Tracing requests across services, keeping AI spend honest, and building retrieval that survives real users rather than a curated demo.',
        icon: '🔧',
      },
      {
        year: '2027',
        title: 'Getting good at the unglamorous parts',
        content: 'Evaluation that measures something a user would care about, RAG that holds on ugly edge cases, and agent systems that degrade gracefully when one link fails.',
        icon: '🧠',
      },
      {
        year: '2028',
        title: 'Owning the AI layer',
        content: 'Being the engineer a team pulls in when the question is "how should we actually build this" — and being able to defend the answer in plain language.',
        icon: '🏗️',
      },
      {
        year: '2029 — 2030',
        title: 'Building something people depend on',
        content: 'Every project here began as a problem I had. Eventually I want to take what production taught me and build the one that outlives my own need for it.',
        icon: '🚀',
      },
    ],
    closing: 'The direction matters more than the exact path: AI systems that are observable, honest about cost, and genuinely useful.',
  },

  sections: [
    { id: 'hero',       label: 'Top' },
    { id: 'about',      label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills',     label: 'Skills' },
    { id: 'projects',   label: 'Projects' },
    { id: 'goals',      label: 'Goals' },
    { id: 'education',  label: 'Education' },
  ],
};

export const RESUME_CONFIG = PORTFOLIO.resume;
