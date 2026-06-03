// ============================================================
// PORTFOLIO CONFIG — Edit this file to update your entire portfolio
// ============================================================

export const PORTFOLIO = {
  personal: {
    name: 'Siddharth Ahir',
    title: 'AI Engineer',
    location: 'Berlin, Germany',
    email: 'sidahir25820@gmail.com',
    phone: '+49 17657938787',
    photo: 'https://i.postimg.cc/P5HS8SsF/FLUX-Playground-Image.png',
    bio: 'Started as a full-stack developer, moved into AI engineering by building systems that connect language models to real products. Now working on LLM microservices and observability at a Frankfurt tech company, while deepening my foundations in data science. Motivated by problems that require both technical depth and practical thinking. Excited to join a team that builds AI with purpose.',
    tagline: 'I enjoy building real-world AI products — not just training models.',
  },

  now: {
    status: 'AI Engineer Working Student @ Firmway GmbH, Frankfurt',
    focus: 'Building LLM microservices and observability systems',
    available: true,
    availableText: 'Open to AI Engineer roles',
  },

  typewriterPhrases: [
    'AI Engineer → LLMs, RAG & Intelligent Systems',
    'Building Observable AI Microservices',
    'Designing Scalable Data Architectures',
    'Working Student @ Firmway GmbH, Frankfurt',
  ],

  heroBadges: ['LLM Integrations', 'RAG Pipelines', 'AI Observability'],

  currentlyLearning: [
    { topic: 'Multi-Agent Systems', emoji: '🤖' },
    { topic: 'Fine-tuning LLMs', emoji: '🧠' },
    { topic: 'Vector Databases (Pinecone)', emoji: '📌' },
    { topic: 'LangChain & LangGraph', emoji: '🔗' },
    { topic: 'MLOps & Model Serving', emoji: '🚀' },
    { topic: 'OpenTelemetry & Langfuse', emoji: '📡' },
  ],

  aboutBullets: [
    'LLM microservices with distributed tracing (OpenTelemetry)',
    'Centralised prompt management systems',
    'Provider-agnostic AI search layer architecture',
    'RAG pipelines grounded in live business data',
    'Explainable AI systems using SHAP/LIME',
  ],

  social: {
    github: 'https://github.com/sidddharthhahir',
    githubHandle: 'github.com/sidddharthhahir',
    linkedin: 'https://linkedin.com/in/siddharth-ahir-798754262',
    linkedinHandle: 'linkedin.com/in/siddharth-ahir',
  },

  lookingFor: [
    'AI Engineer roles',
    'LLM / RAG product teams',
    'Working student or full-time in Berlin / Frankfurt / Remote',
  ],

  emailjs: {
    serviceId: 'service_5n5oy19',
    templateId: 'template_ixyj8he',
    publicKey: '1XEPgOlzfPoTgaput',
    toName: 'Siddharth Ahir',
  },

  resume: {
    url: '/siddharth-ahir-resume.pdf',
    fileName: 'Siddharth Ahir Resume.pdf',
  },

  experience: [
    {
      role: 'AI Engineer — Working Student',
      company: 'Firmway GmbH',
      location: 'Frankfurt, Germany',
      date: 'Mar 2026 – Present',
      bullets: [
        'Rolled out distributed tracing across 8 microservices using OpenTelemetry — giving the team full visibility into every AI request for the first time',
        'Built a centralised prompt management system — prompts were buried in the codebase and nobody could change them easily; fixed that entirely',
        'Designed a provider-agnostic AI search layer so the team is not locked into any one LLM provider',
        'Connected language models to live supply chain data, grounding AI responses in real business context',
        'Ran a structured evaluation of GPT-4o, Claude, and Gemini — presented findings clearly to the team; used to make real product decisions',
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
      degree: 'MSc Computer Science (Transferred)',
      school: 'IU International University of Applied Sciences',
      location: 'Berlin, Germany',
      date: 'Sep 2023 – May 2026',
      note: 'Thesis: MovieWise XAI — Explainable AI Recommender with LLM Integration',
    },
    {
      degree: 'Bachelor of Computer Application',
      school: 'Gujarat University',
      location: 'Ahmedabad, India',
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
      gradient: 'from-red-500/20 to-orange-500/20',
      borderColor: 'border-red-500/20',
      items: [
        { name: 'LLM Integration', description: 'Connecting LLMs to real products and pipelines' },
        { name: 'Prompt Engineering', description: 'Centralised, manageable prompt systems' },
        { name: 'RAG Pipelines', description: 'Retrieval-Augmented Generation with live data' },
        { name: 'Explainable AI (SHAP/LIME)', description: 'Making AI decisions transparent and auditable' },
        { name: 'LightFM', description: 'Hybrid collaborative + content-based recommendation' },
      ],
    },
    {
      category: 'Observability',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/20',
      items: [
        { name: 'OpenTelemetry (OTEL)', description: 'Distributed tracing across microservices' },
        { name: 'Langfuse', description: 'LLM observability and evaluation' },
        { name: 'Distributed Tracing', description: 'End-to-end request visibility in AI systems' },
      ],
    },
    {
      category: 'Backend',
      gradient: 'from-amber-500/20 to-yellow-500/20',
      borderColor: 'border-amber-500/20',
      items: [
        { name: 'Python', description: 'Core language for AI/ML and backend systems' },
        { name: 'Django / DRF', description: 'REST APIs and backend services' },
        { name: 'Node.js', description: 'Fast API services and tooling' },
        { name: 'REST APIs', description: 'Designing and building clean API layers' },
        { name: 'Redis', description: 'Caching and session management' },
        { name: 'Docker', description: 'Containerising AI applications' },
      ],
    },
    {
      category: 'Frontend',
      gradient: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-500/20',
      items: [
        { name: 'React', description: 'Dynamic UIs for AI-powered products' },
        { name: 'Next.js', description: 'Full-stack React with SSR' },
        { name: 'TypeScript', description: 'Type-safe frontend development' },
        { name: 'Tailwind CSS', description: 'Utility-first styling' },
      ],
    },
    {
      category: 'Databases',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/20',
      items: [
        { name: 'PostgreSQL', description: 'Relational DB design and query optimisation' },
        { name: 'Supabase', description: 'Managed Postgres with real-time features' },
      ],
    },
    {
      category: 'Tools',
      gradient: 'from-gray-500/20 to-slate-500/20',
      borderColor: 'border-gray-500/20',
      items: [
        { name: 'Git / GitHub / GitLab', description: 'Version control and collaboration' },
      ],
    },
  ],

  projects: [
    {
      title: 'MovieWise XAI',
      subtitle: "Master's Thesis — Graded 1.3 (94/100)",
      emoji: '🎬',
      featured: true,
      date: 'Aug 2025 – Dec 2025',
      description: "I'm a movie lover, so when it came to my master's thesis, I knew exactly what to build. Rate a few films and the app recommends what to watch next — but more importantly, it explains why in plain language.",
      technologies: ['Python', 'Django', 'LightFM', 'Ollama', 'RAG', 'SHAP/LIME'],
      features: [
        'Hybrid recommendation engine (collaborative + content-based)',
        'Explainable AI using SHAP and LIME',
        'LLM-generated natural language explanations via Ollama',
        'RAG pipeline for contextual grounding',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/MovieWise-XAI',
      metrics: '🧠 Graded 1.3 — 94/100',
      caseStudy: {
        problem: 'Most recommendation systems act as black boxes — users get suggestions with no insight into why.',
        approach: 'Built a hybrid engine combining collaborative filtering (LightFM) with content-based signals, layered with RAG using Ollama for natural language explanations, and SHAP/LIME for model transparency.',
        results: 'Transparent, explainable recommendations with coherent, context-aware explanations in real time. Graded 1.3 (94/100).',
      },
    },
    {
      title: 'BoomStart AI',
      subtitle: 'Personal Fitness Coach',
      emoji: '🏋️',
      featured: false,
      date: 'Nov 2025 – May 2026',
      description: "Built because I couldn't afford a personal trainer. The app uses AI to plan workouts and nutrition individually, and I added a Bhagavad Gita feature for mental reset between sets — something I genuinely use daily.",
      technologies: ['React', 'TypeScript', 'Supabase', 'Gemini', 'Edge Functions'],
      features: [
        'AI-generated personalised workout and diet plans',
        'Natural language meal logging',
        'Progress tracking and weekly AI insights',
        'Bhagavad Gita mental reset feature',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/pocketfit-ai-coach',
      metrics: '🤖 AI-powered personalisation',
      caseStudy: {
        problem: 'Generic fitness apps fail to adapt to individual goals. Manual logging creates friction.',
        approach: 'AI for personalised plans via Supabase Edge Functions and Gemini, natural language meal logging, weekly AI-generated insights.',
        results: 'Frictionless fitness tracking with AI-driven personalisation through conversational interfaces.',
      },
    },
    {
      title: 'RoomSplit',
      subtitle: 'AI-Powered Expense Manager',
      emoji: '🏠',
      featured: false,
      date: 'Feb 2026 – Apr 2026',
      description: 'Solving the most uncomfortable part of shared living. Snap a photo of any bill and the app handles the rest — logging the expense, deciding who owes what, and letting roommates raise conflicts without revealing who said what.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'AI OCR'],
      features: [
        'Photo receipt scanning with AI OCR',
        'Optimised settlement algorithm (graph-based)',
        'Anonymous conflict reporting between roommates',
        'Multi-user architecture with real-time dashboard',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/roomsplit',
      metrics: '⚙️ Up to 60% fewer settlement transactions',
      caseStudy: {
        problem: 'Splitting expenses leads to complex debt chains. Existing tools lacked efficient settlement and conflict handling.',
        approach: 'Normalised relational schema with Prisma, graph-based settlement minimising transactions, anonymous house voice system, AI OCR for receipt scanning.',
        results: 'Reduced settlement transactions by up to 60% with sub-second query performance.',
      },
    },
    {
      title: 'AI Resume Customizer',
      subtitle: 'LLM-Powered Job Tool',
      emoji: '📄',
      featured: false,
      date: 'Sep 2025 – Dec 2025',
      description: "Built for myself, out of necessity. Paste any job description and it rewrites your resume to match in one click, no fabrication. It also tracks every job you've applied to. The resume in front of you was shaped by this tool.",
      technologies: ['Python', 'LLM APIs', 'NLP'],
      features: [
        'Resume-JD matching and AI-powered tailoring',
        'No fabrication — rewrites only what exists',
        'Application tracking across all jobs',
        'ATS compatibility improvements',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/ai-resume-customizer',
      metrics: '⏱️ 30-45 min process → under 2 minutes',
      caseStudy: {
        problem: 'Tailoring resumes per application is time-consuming and error-prone.',
        approach: 'NLP pipeline parsing JDs, extracting requirements, using LLMs to rewrite resume sections without fabricating anything.',
        results: 'Reduced 30-45 minute process to under 2 minutes with improved ATS compatibility.',
      },
    },
    {
      title: 'Game KPI Dashboard',
      subtitle: 'Analytics & Data Systems',
      emoji: '📊',
      featured: false,
      date: 'Jun 2025 – Aug 2025',
      description: "Curiosity project. My friend builds games and talks about KPIs constantly. I never fully got it until I built a dashboard myself. Now I understand exactly how studios track performance — and it handles 5,000+ records in under a second.",
      technologies: ['React', 'Node.js', 'Express', 'Supabase', 'Recharts'],
      features: [
        'KPI tracking and interactive visualisation',
        'Server-side filtering with indexed queries',
        'Handles 5,000+ records sub-second',
        'Real-time interactive exploration',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/Dashboard',
      metrics: '⏱️ 5,000+ records in under a second',
      caseStudy: {
        problem: 'Game studios lacked real-time visibility into campaign and performance data.',
        approach: 'Server-side filtering with Express/Supabase, indexed queries, interactive Recharts frontend.',
        results: 'Sub-second response on 5,000+ rows with real-time interactive exploration.',
      },
    },
  ],

  aiInterests: [
    'Large Language Model Applications',
    'Explainable AI & Model Transparency',
    'Recommendation Systems',
    'AI Observability & Evaluation',
    'RAG & Knowledge Grounding',
    'AI-powered SaaS Products',
  ],

  buildings: [
    { id: 'hero',       label: 'City Entrance',  emoji: '🌆' },
    { id: 'about',      label: 'HQ Tower',        emoji: '🏢' },
    { id: 'now',        label: 'Status Board',    emoji: '📋' },
    { id: 'experience', label: 'The Office',      emoji: '💼' },
    { id: 'skills',     label: 'The Lab',         emoji: '🔬' },
    { id: 'projects',   label: 'The Workshop',    emoji: '🏗️' },
    { id: 'education',  label: 'The Archive',     emoji: '📚' },
    { id: 'contact',    label: 'Signal Tower',    emoji: '📡' },
  ],
};

// Backward compat
export const RESUME_CONFIG = PORTFOLIO.resume;
