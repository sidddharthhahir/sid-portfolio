// ============================================================
// PORTFOLIO CONFIG — single source of truth for all content.
// Voice rule: nothing here is copied from the resume or LinkedIn.
// Same facts, different words. Personal, specific, hooky.
// ============================================================

export const PORTFOLIO = {

  personal: {
    name: 'Siddharth Ahir',
    title: 'AI Engineer',
    location: 'Berlin, Germany',
    email: 'sidahir25820@gmail.com',
    phone: '+49 17657938787',
    photo: '/__l5e/assets-v1/ad4f1d2a-f86a-4d84-869c-0da320ed0313/siddharth-photo.png',

    bio: `Twice, our AI cost tracker lied to us. Both times I was the one who noticed. That is the part of this job nobody puts in a job ad, and it is the part I turned out to be good at.

I came into AI from full-stack work, expecting the hard part to be the model. It was not. The hard part was proving what a system actually costs, where it actually spends its time, and whether an answer is actually grounded in something real. So that is what I build: LLM backends with receipts — traced, priced, and cited.

Right now I am doing an MSc in Data Science in Berlin, mostly to stop taking the maths on faith. Next, I want a team where "we use AI" is followed by a diagram, not a slide.`,

    tagline: `Ask me about the API call that was quietly eating 88% of our request time.`,
  },

  typewriterPhrases: [
    'I build LLM systems that can prove what they did',
    'Caught two cost-tracking bugs before they hit the invoice',
    'Traced 8 microservices — found the 88% bottleneck',
    'RAG with verified citations, not confident guesses',
    'Python · FastAPI · TypeScript · OpenTelemetry',
  ],

  social: {
    github: 'https://github.com/sidddharthhahir',
    githubHandle: 'github.com/sidddharthhahir',
    linkedin: 'https://linkedin.com/in/siddharth-ahir-798754262',
    linkedinHandle: 'linkedin.com/in/siddharth-ahir',
  },

  resume: {
    url: '/siddharth-ahir-resume.pdf',
    fileName: 'Siddharth Ahir Resume.pdf',
  },

  howIWork: [
    'My best projects started as something that was annoying me personally',
    'Before I optimise anything, I make it visible — guessing is expensive',
    'I read library source code more often than I read papers',
    'I would rather delete a clever abstraction than defend it',
    'Week one I ask a lot of questions. Week two I am useful.',
  ],

  experience: [
    {
      role: 'AI Engineer — Working Student',
      company: 'Firmway GmbH',
      location: 'Frankfurt, Germany',
      date: 'Mar 2026 – Aug 2026',
      story: [
        `I joined without a clear idea of what "production AI" meant. I left knowing it means being the person who spots the problem before the invoice or the user does.`,
        `My main build was a cost-tracking layer for every LLM call. It caught itself twice: once reporting zero output tokens, once about to undercount spend by a third after a pricing change. Small catches, real money, and the moment I stopped second-guessing my instincts.`,
        `Then I rolled OpenTelemetry tracing across 8 services in Python and Java. After weeks of everyone guessing why requests felt slow, one waterfall view showed a single API call consuming 88% of the time. I also shipped an embeddings + semantic search pipeline (Voyage, Exa, Bright Data), a PostHog consent flow, and refactored a core module — mostly by removing code.`,
        `Not glamorous work. All of it real, and it is why I now argue for observability before features.`,
      ],
      highlights: [
        'LLM cost tracking that caught two real billing bugs',
        '88% latency hotspot found via distributed tracing',
        'OpenTelemetry across 8 Python + Java services',
        'Embeddings & semantic search pipeline (Voyage, Exa, Bright Data)',
        'Core module refactor — smaller, not bigger',
      ],
    },
  ],

  education: [
    {
      degree: 'MSc Data Science',
      school: 'Arden University',
      location: 'Berlin, Germany',
      date: 'May 2026 – Present',
      note: 'Taking the maths seriously so I stop trusting it blindly',
    },
    {
      degree: 'MSc Computer Science',
      school: 'IU International University of Applied Sciences',
      location: 'Berlin, Germany',
      date: 'Sep 2023 – May 2026',
      note: 'Thesis: MovieWise XAI — graded 1.3 (94/100)',
    },
    {
      degree: 'Bachelor of Computer Application',
      school: 'Gujarat University',
      location: 'India',
      date: 'Jul 2019 – Apr 2022',
      note: '',
    },
  ],

  languages: [
    { language: 'English', level: 'Fluent' },
    { language: 'German', level: 'Basic (A2, improving weekly)' },
  ],

  skills: [
    {
      category: 'AI & LLM',
      color: 'red',
      items: [
        { name: 'LLM Integration', description: 'Model calls wrapped in cost, retry and trace context', linkedProject: 'Pulse' },
        { name: 'Prompt Engineering', description: 'Versioned prompts, structured outputs, diffable changes', linkedProject: 'Pulse' },
        { name: 'RAG', description: 'Answers that must cite a verse that really exists', linkedProject: 'Madhav' },
        { name: 'Semantic Search', description: 'Embedding pipelines shipped in production at Firmway', linkedProject: 'Madhav' },
        { name: 'Ollama', description: 'Local inference when data cannot leave the machine', linkedProject: 'MovieWise XAI' },
        { name: 'Claude', description: 'Reasoning chains and evaluation of generated output', linkedProject: 'Startup Intelligence Agent' },
      ],
    },
    {
      category: 'Backend',
      color: 'emerald',
      items: [
        { name: 'Python', description: 'Where most of my AI services live', linkedProject: 'Madhav' },
        { name: 'FastAPI', description: 'Thin, typed APIs in front of retrieval', linkedProject: 'Madhav' },
        { name: 'Java', description: 'Production backend work at Firmway — filtering logic and evidence pipeline services', linkedProject: null },
        { name: 'Django', description: 'Earlier full-stack Python products, end to end', linkedProject: null },
        { name: 'Node.js', description: 'API layers and document-processing jobs', linkedProject: 'AI Resume Customizer' },
        { name: 'REST APIs', description: 'Boring, predictable contracts on purpose', linkedProject: 'Startup Intelligence Agent' },
        { name: 'Docker', description: 'If it runs on my laptop, it runs on yours', linkedProject: null },
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
      category: 'Observability',
      color: 'amber',
      items: [
        { name: 'OpenTelemetry', description: 'Rolled out across 8 services — the 88% discovery', linkedProject: null },
        { name: 'Langfuse', description: 'Tracing and evaluating LLM calls, not just logging them', linkedProject: null },
        { name: 'Distributed Tracing', description: 'Replacing "it feels slow" with a waterfall chart', linkedProject: null },
      ],
    },
  ],

  projects: [
    {
      title: 'MovieWise XAI',
      subtitle: "Master's thesis · graded 1.3",
      emoji: '🎬',
      featured: true,
      description: `A recommender that has to justify itself. Every suggestion arrives with a sentence explaining why, written by a local LLM from the evidence that actually drove the ranking — no black box, no external API, no data leaving the machine.`,
      technologies: ['Python', 'LightFM', 'TF-IDF', 'Local LLM (Ollama)', 'Streamlit'],
      features: [
        'Hybrid collaborative + content ranking',
        'Evidence-grounded explanation per recommendation',
        'Fully local inference for privacy',
        'Graded 1.3 (94/100)',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/MovieWise-XAI',
      metrics: '🎓 Graded 1.3 (94/100) · Dec 2025',
      caseStudy: {
        problem: 'People do not act on a ranking they cannot interrogate. Accuracy without a reason is a dead end.',
        approach: 'Rank with a hybrid model, retrieve supporting metadata with TF-IDF, then let a locally hosted LLM turn that evidence — and only that evidence — into a short explanation.',
        results: 'Every recommendation ships with a readable, checkable reason. Graded 1.3 (94/100).',
      },
    },
    {
      title: 'Madhav',
      subtitle: 'RAG that refuses to bluff',
      emoji: '📖',
      featured: false,
      description: `Question answering over the Bhagavad Gita where a citation is a promise. Hybrid keyword + semantic retrieval finds candidate verses, then a verification step throws out any answer whose citation cannot be resolved back to a real verse.`,
      technologies: ['Python', 'FastAPI', 'Embeddings', 'Hybrid Search'],
      features: [
        'Hybrid keyword + semantic retrieval',
        'Citation verified before the answer is returned',
        'Verse-level grounding, no invented references',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/madhav',
      metrics: '📅 Aug 2026',
      caseStudy: {
        problem: 'RAG systems hallucinate sources with total confidence. On a text people hold sacred, that is not a rough edge — it is a dealbreaker.',
        approach: 'Run lexical and vector retrieval together, then gate the response on a verification pass that checks each cited verse exists in the corpus.',
        results: 'Every answer is traceable to a verse you can open yourself.',
      },
    },
    {
      title: 'Pulse',
      subtitle: 'Five agents, one human veto',
      emoji: '⚡',
      featured: false,
      description: `A content pipeline that researches a topic, ranks the ideas, and drafts LinkedIn posts in my voice — then stops and waits for me. Post performance flows back in, so next week's ranking is informed by last week's reality.`,
      technologies: ['Python', 'Multi-agent orchestration', 'LLM APIs'],
      features: [
        'Five specialised agents in one coordinated pipeline',
        'Hard human approval gate before anything publishes',
        'Performance feedback loop that reshapes idea ranking',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/Pulse-',
      metrics: '📅 Jun 2026',
      caseStudy: {
        problem: 'One-shot prompting produces content that sounds like everyone else and gives you no control over what ships.',
        approach: 'Split the job into research, ideation, ranking, drafting and review agents, with an explicit approval step and metrics fed back into ranking.',
        results: 'Drafts that sound like a person, with a person still deciding.',
      },
    },
    {
      title: 'Startup Intelligence Agent',
      subtitle: 'Kill bad ideas faster',
      emoji: '🧭',
      featured: false,
      description: `Feed it an idea, get back an honest verdict. Three reasoning passes — market size, competitive landscape, execution feasibility — each with a strict output schema, followed by a go-to-market plan and a landing page you can put in front of real people the same day.`,
      technologies: ['Next.js', 'PostgreSQL', 'TypeScript', 'Structured LLM output'],
      features: [
        'Three-step reasoning pipeline with structured outputs',
        'Market, competition and feasibility scored separately',
        'Generated GTM plan and deployable landing page',
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
      subtitle: 'It wrote the resume that got me hired',
      emoji: '📄',
      featured: false,
      description: `Parses a resume and a job description, then rewrites emphasis and phrasing to match — and never invents a skill. Includes ATS checks, application tracking, and PDF/DOCX export. I built it because I was tired of the process, then it landed me the job.`,
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
        content: 'Tracing requests across services, keeping AI spend honest, and building retrieval that survives contact with real users instead of a curated notebook demo.',
        icon: '🔧',
      },
      {
        year: '2027',
        title: 'Getting good at the unglamorous parts',
        content: 'Evaluation that measures something a user would care about, RAG that holds on the ugly edge cases, and agent systems that degrade gracefully when one link fails.',
        icon: '🧠',
      },
      {
        year: '2028',
        title: 'Owning the AI layer',
        content: 'Being the engineer a team pulls into the room when the question is "how should we actually build this" — and being able to defend the answer in plain language.',
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
