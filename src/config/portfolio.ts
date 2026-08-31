// ============================================================
// PORTFOLIO CONFIG — single source of truth for all content.
// Keep the voice plain and human. Short sentences. No hype.
// ============================================================

export const PORTFOLIO = {

  personal: {
    name: 'Siddharth Ahir',
    title: 'AI Engineer',
    location: 'Berlin, Germany',
    email: 'sidahir25820@gmail.com',
    phone: '+49 17657938787',
    photo: '/__l5e/assets-v1/ad4f1d2a-f86a-4d84-869c-0da320ed0313/siddharth-photo.png',

    bio: `I started as a full-stack developer, curious about how AI could actually work inside real products. That curiosity is what led me here. Today I build LLM-powered backend systems and work across observability and semantic search.

I'm deepening that curiosity with an MSc in Data Science in Berlin, because I want to understand AI at its foundations, not just use it. What I'm looking for next is a team that takes engineering seriously and treats AI as more than a buzzword.`,

    tagline: `I care more about systems being observable than being fast.`,
  },

  typewriterPhrases: [
    'AI Engineer — LLM systems in production',
    'RAG, semantic search, observability',
    'Python · FastAPI · TypeScript',
    'MSc Data Science, Berlin',
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
    'I usually start by building the thing that is frustrating me',
    'I care more about systems being observable than fast',
    'I read implementation code more than I read papers',
    'I am more useful in the second week than the first',
  ],

  experience: [
    {
      role: 'AI Engineer — Working Student',
      company: 'Firmway GmbH',
      location: 'Frankfurt, Germany',
      date: 'Mar 2026 – Aug 2026',
      story: [
        `This role taught me how real companies track and control AI costs at scale — mostly because I ended up building that system myself.`,
        `Working with embeddings and semantic search for the first time showed me a side of AI I had only read about. Turning that understanding into a working pipeline was my favourite part of the job.`,
        `Rolling out distributed tracing across 8 microservices taught me to think about the system as a whole rather than only the part I was working on. Refactoring a core piece of the codebase into a cleaner architecture taught me that good engineering is as much about what you remove as what you add.`,
      ],
      highlights: [
        'AI cost tracking and control system',
        'Embeddings + semantic search pipeline',
        'Distributed tracing across 8 microservices (OpenTelemetry)',
        'Core codebase refactor into cleaner architecture',
      ],
    },
  ],

  education: [
    {
      degree: 'MSc Data Science',
      school: 'Arden University',
      location: 'Berlin, Germany',
      date: 'May 2026 – Present',
      note: '',
    },
    {
      degree: 'MSc Computer Science',
      school: 'IU International University of Applied Sciences',
      location: 'Berlin, Germany',
      date: 'Sep 2023 – May 2026',
      note: 'Thesis: MovieWise XAI — graded 1.3',
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
    { language: 'German', level: 'Basic' },
  ],

  skills: [
    {
      category: 'AI & LLM',
      color: 'red',
      items: [
        { name: 'LLM Integration', description: 'Connecting language models to real products', linkedProject: 'Pulse' },
        { name: 'Prompt Engineering', description: 'Maintainable, versioned prompt systems', linkedProject: 'Pulse' },
        { name: 'RAG', description: 'Retrieval-augmented answers with citations', linkedProject: 'Madhav' },
        { name: 'Semantic Search', description: 'Embeddings-based retrieval pipelines', linkedProject: 'Madhav' },
        { name: 'Ollama', description: 'Running local models for private inference', linkedProject: 'MovieWise XAI' },
        { name: 'Claude', description: 'Reasoning-heavy tasks and evaluation', linkedProject: 'Startup Intelligence Agent' },
      ],
    },
    {
      category: 'Backend',
      color: 'emerald',
      items: [
        { name: 'Python', description: 'Primary language for AI services', linkedProject: 'Madhav' },
        { name: 'FastAPI', description: 'Lightweight APIs for retrieval services', linkedProject: 'Madhav' },
        { name: 'Java', description: 'Used across university and backend work', linkedProject: null },
        { name: 'Django', description: 'Full-stack Python applications', linkedProject: null },
        { name: 'Node.js', description: 'Backend services and API layers', linkedProject: 'AI Resume Customizer' },
        { name: 'REST APIs', description: 'Service boundaries that stay predictable', linkedProject: 'Startup Intelligence Agent' },
        { name: 'Docker', description: 'Reproducible local and deployed environments', linkedProject: null },
      ],
    },
    {
      category: 'Frontend',
      color: 'blue',
      items: [
        { name: 'React', description: 'Application UI', linkedProject: 'AI Resume Customizer' },
        { name: 'Next.js', description: 'Full-stack React apps', linkedProject: 'Startup Intelligence Agent' },
        { name: 'TypeScript', description: 'Types as documentation', linkedProject: 'AI Resume Customizer' },
        { name: 'Tailwind CSS', description: 'Fast, consistent styling', linkedProject: null },
      ],
    },
    {
      category: 'Databases',
      color: 'purple',
      items: [
        { name: 'PostgreSQL', description: 'Relational data for production apps', linkedProject: 'Startup Intelligence Agent' },
        { name: 'Supabase', description: 'Auth, storage, and Postgres in one', linkedProject: null },
        { name: 'MySQL', description: 'Relational storage', linkedProject: 'AI Resume Customizer' },
      ],
    },
    {
      category: 'Observability',
      color: 'amber',
      items: [
        { name: 'OpenTelemetry', description: 'Distributed tracing across microservices', linkedProject: null },
        { name: 'Langfuse', description: 'LLM tracing and evaluation', linkedProject: null },
        { name: 'Distributed Tracing', description: 'End-to-end visibility into AI requests', linkedProject: null },
      ],
    },
  ],

  projects: [
    {
      title: 'MovieWise XAI',
      subtitle: "Master's thesis",
      emoji: '🎬',
      featured: true,
      description: `A hybrid movie recommender that explains itself. Every recommendation comes with a natural language explanation generated by a local LLM over TF-IDF retrieval, so the reason is visible instead of hidden in a score.`,
      technologies: ['Python', 'LightFM', 'TF-IDF', 'Local LLM (Ollama)', 'Streamlit'],
      features: [
        'Hybrid collaborative + content-based recommendations',
        'Natural language explanation for every recommendation',
        'Local LLM inference — no external API calls',
        'Graded 1.3 (94/100)',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/MovieWise-XAI',
      metrics: '🎓 Thesis graded 1.3 · Dec 2025',
      caseStudy: {
        problem: 'Recommenders are accurate but opaque. People do not trust a ranking they cannot understand.',
        approach: 'Hybrid model for ranking, TF-IDF retrieval over movie metadata for evidence, and a locally hosted LLM to turn that evidence into a short explanation.',
        results: 'Every recommendation ships with a readable reason. Thesis graded 1.3 (94/100).',
      },
    },
    {
      title: 'Madhav',
      subtitle: 'RAG question answering',
      emoji: '📖',
      featured: false,
      description: `A retrieval-augmented question answering system over the Bhagavad Gita. It combines keyword and semantic search with citation verification, so every answer is grounded in a real, retrievable verse instead of a hallucinated reference.`,
      technologies: ['Python', 'FastAPI', 'Embeddings', 'Hybrid Search'],
      features: [
        'Hybrid keyword + semantic retrieval',
        'Citation verification before an answer is returned',
        'Verse-level grounding, no invented references',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/madhav',
      metrics: '📅 Aug 2026',
      caseStudy: {
        problem: 'RAG systems confidently cite sources that do not exist. On a text people care about, that is unacceptable.',
        approach: 'Keyword and semantic retrieval run together, then a verification step checks that each cited verse actually exists in the corpus before the answer is served.',
        results: 'Answers are traceable to a real verse, which makes the system safe to trust.',
      },
    },
    {
      title: 'Pulse',
      subtitle: 'Multi-agent pipeline',
      emoji: '⚡',
      featured: false,
      description: `A multi-agent content pipeline that researches topics, ranks ideas, and drafts LinkedIn posts in a specific voice. Nothing publishes without human approval, and a performance-learning loop feeds results back into idea ranking.`,
      technologies: ['Python', 'Multi-agent orchestration', 'LLM APIs'],
      features: [
        'Five specialised agents coordinated through one pipeline',
        'Human approval gate before anything publishes',
        'Performance-learning loop that improves ranking over time',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/Pulse-',
      metrics: '📅 Jun 2026',
      caseStudy: {
        problem: 'Single-prompt content tools produce generic output and give you no control over what goes out.',
        approach: 'Split the work across five agents — research, ideation, ranking, drafting, review — with an explicit approval step and feedback from post performance.',
        results: 'Drafts that sound like a person, with a human still deciding what ships.',
      },
    },
    {
      title: 'Startup Intelligence Agent',
      subtitle: 'Idea validation',
      emoji: '🧭',
      featured: false,
      description: `A multi-agent system that validates startup ideas through a three-step chain-of-thought pipeline: market size, competitive landscape, execution feasibility. It then generates a go-to-market plan and a production-ready landing page.`,
      technologies: ['Next.js', 'PostgreSQL', 'TypeScript', 'Structured LLM output'],
      features: [
        'Three-step reasoning pipeline with structured outputs',
        'Market, competition, and feasibility analysis',
        'Generated go-to-market plan and landing page',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/startup-intelligence-agent',
      metrics: '📅 May 2026',
      caseStudy: {
        problem: 'Idea validation usually means a week of scattered research with no consistent output.',
        approach: 'Each analysis step is its own LLM call with a strict output schema, so results are comparable across ideas and safe to store.',
        results: 'A repeatable validation report plus a landing page you can actually put in front of people.',
      },
    },
    {
      title: 'AI Resume Customizer',
      subtitle: 'Job application tool',
      emoji: '📄',
      featured: false,
      description: `Parses a resume and a job description, then tailors the resume to match in one click — without fabricating skills. Includes ATS optimisation, application tracking, and PDF/DOCX export.`,
      technologies: ['React', 'Node.js', 'MySQL', 'LLM APIs'],
      features: [
        'One-click tailoring with no invented experience',
        'ATS optimisation checks',
        'Application tracking and PDF/DOCX export',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/ai-resume-customizer',
      metrics: '📅 Sep 2025',
      caseStudy: {
        problem: 'Rewriting a resume for every application is slow, and most AI tools solve it by making things up.',
        approach: 'Parse both documents, match real experience to job requirements, and rewrite only phrasing and emphasis — never claims.',
        results: 'Faster applications with a resume that still tells the truth.',
      },
    },
  ],

  goals: {
    headline: 'Where I am headed',
    subheadline: 'Next five years',
    story: [
      {
        year: 'Now — 2026',
        title: 'Doing the real work',
        content: 'Production AI engineering rather than demos: tracing requests across services, controlling cost, building retrieval that holds up outside a notebook.',
        icon: '🔧',
      },
      {
        year: '2027',
        title: 'Getting good at the hard parts',
        content: 'Evaluation frameworks that measure what matters, RAG that does not fall apart on edge cases, and multi-agent systems that stay coherent when one agent fails.',
        icon: '🧠',
      },
      {
        year: '2028',
        title: 'Taking ownership',
        content: 'Becoming the person a team turns to when deciding how to build its AI layer — a technical lead who makes architecture decisions and can explain them clearly.',
        icon: '🏗️',
      },
      {
        year: '2029 — 2030',
        title: 'Building something that lasts',
        content: 'Every project I have built started as something I needed myself. Eventually I want to take what I have learned in production and build something people depend on.',
        icon: '🚀',
      },
    ],
    closing: 'The direction matters more than the exact path: reliable, observable AI systems that are genuinely useful.',
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
