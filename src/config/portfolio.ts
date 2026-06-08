// ============================================================
// PORTFOLIO CONFIG — single source of truth for all content.
// This is NOT the resume. The voice here is personal and honest.
// Resume = filtered keywords. Portfolio = the full story.
// ============================================================

export const PORTFOLIO = {

  personal: {
    name: 'Siddharth Ahir',
    title: 'AI Engineer',
    location: 'Berlin, Germany',
    email: 'sidahir25820@gmail.com',
    photo: 'https://i.postimg.cc/P5HS8SsF/FLUX-Playground-Image.png',

    bio: `I got into AI the wrong way — by building things I actually needed. A recommendation system because I wanted better movie suggestions. An expense splitter because living with roommates is socially complicated. A resume tool because job hunting was exhausting me. At some point I looked up and realised everything I was making had a language model in it.

Now I'm at Firmway doing this professionally — tracing AI requests across production microservices, building prompt infrastructure the whole team depends on, running structured evaluations of GPT-4o vs Claude vs Gemini and turning the results into actual product decisions. That's the work I find interesting: not the demo, the deployment.`,

    tagline: `I care more about systems being observable than being fast.`,
  },

  typewriterPhrases: [
    'AI Engineer — production systems, not demos',
    'Working Student @ Firmway GmbH',
    'Building observable LLM microservices',
    'Connecting models to real business data',
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
    'I usually start by building the thing that\'s frustrating me',
    'I care more about systems being observable than fast',
    'I read implementation code more than I read papers',
    'I\'m more useful in the second week than the first',
  ],

  experience: [
    {
      role: 'AI Engineer — Working Student',
      company: 'Firmway GmbH',
      location: 'Frankfurt, Germany',
      date: 'Mar 2026 – Present',
      story: [
        `When I joined, nobody could see what the AI was actually doing. A request would go in, an answer would come out, and if it was wrong you had no idea where in the chain it broke. I spent the first weeks rolling out distributed tracing across 8 microservices using OpenTelemetry — not because anyone asked me to, but because I couldn't work seriously on something I couldn't observe.`,
        `The prompt management problem was similar. Prompts were buried in the codebase, mixed in with business logic, scattered across files. Changing one thing meant hunting. I built a centralised system that treats prompts as configuration, not code — separate, versioned, editable without a deployment. It sounds simple. It changed how the whole team works.`,
        `The LLM evaluation was the most interesting part. I ran a structured comparison of GPT-4o, Claude, and Gemini across our actual use cases — not benchmarks, real tasks. Wrote it up, presented it to the team, and they used it to make the product decision. That's the kind of work I want to keep doing.`,
      ],
      highlights: [
        'Distributed tracing across 8 microservices (OpenTelemetry)',
        'Centralised prompt management system',
        'Provider-agnostic AI search architecture',
        'GPT-4o vs Claude vs Gemini structured evaluation',
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
      color: 'red',
      items: [
        { name: 'LLM Integration', description: 'Connecting language models to real products', linkedProject: 'Content Intelligence Agent' },
        { name: 'Prompt Engineering', description: 'Centralised, maintainable prompt systems', linkedProject: 'Content Intelligence Agent' },
        { name: 'RAG Pipelines', description: 'Retrieval-Augmented Generation with live data', linkedProject: 'MovieWise XAI' },
        { name: 'Explainable AI (SHAP/LIME)', description: 'Making model decisions transparent', linkedProject: 'MovieWise XAI' },
        { name: 'LightFM', description: 'Hybrid collaborative + content-based recommendation', linkedProject: 'MovieWise XAI' },
      ],
    },
    {
      category: 'Observability',
      color: 'purple',
      items: [
        { name: 'OpenTelemetry', description: 'Distributed tracing across microservices', linkedProject: null },
        { name: 'Langfuse', description: 'LLM evaluation and monitoring', linkedProject: null },
        { name: 'Distributed Tracing', description: 'End-to-end visibility into AI request flows', linkedProject: null },
      ],
    },
    {
      category: 'Backend',
      color: 'amber',
      items: [
        { name: 'Python', description: 'Core language for AI/ML and backend work', linkedProject: 'AI Resume Customizer' },
        { name: 'Django / DRF', description: 'REST APIs and backend services', linkedProject: 'MovieWise XAI' },
        { name: 'Node.js', description: 'Fast API services and tooling', linkedProject: 'RoomSplit' },
        { name: 'Redis', description: 'Caching and session management', linkedProject: null },
        { name: 'Docker', description: 'Containerising applications', linkedProject: 'AI Resume Customizer' },
      ],
    },
    {
      category: 'Frontend',
      color: 'emerald',
      items: [
        { name: 'React / TypeScript', description: 'Dynamic, type-safe interfaces', linkedProject: 'BoomStart AI' },
        { name: 'Next.js', description: 'Full-stack React with SSR', linkedProject: 'Content Intelligence Agent' },
        { name: 'Tailwind CSS', description: 'Utility-first styling', linkedProject: null },
      ],
    },
    {
      category: 'Data',
      color: 'blue',
      items: [
        { name: 'PostgreSQL', description: 'Relational DB design and query optimisation', linkedProject: 'RoomSplit' },
        { name: 'Supabase', description: 'Managed Postgres with real-time features', linkedProject: 'BoomStart AI' },
        { name: 'tRPC', description: 'End-to-end type-safe APIs', linkedProject: 'AI Resume Customizer' },
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
      description: `Most recommendation systems are black boxes. They tell you what to watch but never why — and when they're wrong, you can't debug them, you can't learn from them, you can't trust them. I'm a movie lover, so when it came to my thesis I knew what I wanted to fix.

The grade surprised me — not because I thought it would be bad, but because the project started as me wanting better movie suggestions. The explainability part came from genuine frustration: every time a streaming platform recommended something I didn't like, I wanted to understand the reasoning. SHAP made that possible. The hardest part wasn't the model — it was making the explanations readable to someone who doesn't know what a feature importance score is.`,
      technologies: ['Python', 'Django', 'LightFM', 'Ollama', 'RAG', 'SHAP', 'LIME'],
      features: [
        'Hybrid engine combining collaborative filtering (LightFM) and content-based signals',
        'SHAP and LIME explainability — every recommendation surfaces the features that drove it',
        'RAG pipeline using Ollama to convert model outputs into plain-language explanations',
        'Django REST backend with structured JSON API',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/MovieWise-XAI',
      metrics: '🎓 Graded 1.3 — 94/100',
      caseStudy: {
        problem: 'Recommendation systems give suggestions without reasons. When they\'re wrong, there\'s no way to understand why — which erodes trust over time.',
        approach: 'Trained a LightFM hybrid model on user-item interactions and content features. Added a SHAP/LIME layer to surface the top features driving each recommendation, then fed those into an Ollama RAG pipeline to generate a readable explanation in plain English.',
        results: 'Every recommendation ships with a human-readable explanation grounded in actual model outputs. Graded 1.3 (94/100). Users in testing said they trusted recommendations more even when they disagreed with them.',
      },
    },
    {
      title: 'Content Intelligence Agent',
      subtitle: 'AI Content Strategy Tool',
      emoji: '📹',
      featured: false,
      date: 'Apr 2025 – Jun 2025',
      description: `I kept seeing creators post content that clearly wasn't going to work — wrong hook, wrong format, wrong timing — and there was no fast way to figure that out before committing 8 hours of production. So I built a verdict machine.

You type an idea, you get Create, Improve, or Drop in under 10 seconds, with a full breakdown across algorithm mechanics, audience psychology, market saturation, and execution reality. The hardest part was designing the scoring so it doesn't just tell you what you want to hear. Most ideas deserve a 5, not an 8.`,
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'SSE Streaming'],
      features: [
        'SSE streaming — analysis appears in real time as the LLM processes',
        'Four-lens evaluation: Algorithm, Psychology, Market, Execution — simultaneously',
        '5 sub-scores: Hook Strength, Retention Potential, Shareability, Uniqueness, Trend Alignment',
        'Generates production-ready script structures with [VISUAL], [CUT TO], [RETENTION HOOK] markers',
        'PostgreSQL caching — same idea and niche returns instantly, zero API cost',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/content-intelligence-agent',
      metrics: '⚡ Verdict, 5 sub-scores, full script structure in under 10 seconds',
      caseStudy: {
        problem: 'Creators invest hours in content that underperforms. There was no structured, fast way to evaluate an idea before committing to it.',
        approach: 'SSE streaming so analysis appears progressively. System prompt evaluates across four lenses simultaneously and returns a structured JSON schema: verdict, sub-scores, hooks, script structure, sample script, refined idea. Results cached in PostgreSQL.',
        results: 'Under 10 seconds from submission to full verdict. Caching means the second person to analyze a popular idea gets an instant result.',
      },
    },
    {
      title: 'AI Startup Evaluator',
      subtitle: 'Three-Step Due Diligence Pipeline',
      emoji: '🚀',
      featured: false,
      date: 'Mar 2025 – May 2025',
      description: `Proper startup due diligence takes days when done well. Most people skip it entirely, which is why so many ideas die in week 3. I wanted to make a serious first-pass evaluation accessible in under a minute.

The interesting engineering problem was the chain: Step 1 outputs structured JSON that Step 2 uses as context. Step 2 outputs a plan that Step 3 uses to write landing page copy. Each step has its own Zod schema. If Step 1 returns malformed output, Steps 2 and 3 never fire. Getting consistent structured output across three sequential LLM calls took more work than I expected.`,
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Zod'],
      features: [
        'Step 1: Market research — TAM/SAM/SOM, named competitors, market timing, SWOT',
        'Step 2: Execution plan — MVP features, tech stack, go-to-market, monetization, YC-format pitch',
        'Step 3: Landing page HTML — generated from the plan, immediately deployable',
        'Strict Zod schemas — one bad output halts the chain cleanly',
        '24-hour deduplication cache — same idea never runs twice in a day',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/startup-intelligence-agent',
      metrics: '⚡ Research → plan → landing page in under 60 seconds',
      caseStudy: {
        problem: 'Most people evaluate startup ideas informally. Proper due diligence takes days. Most skip it entirely.',
        approach: 'Chained three LLM calls with strict Zod schemas. Each step receives the previous step\'s validated output as context. Failure in Step 1 surfaces cleanly rather than passing bad data downstream.',
        results: 'Full research, execution plan, and deployable landing page in under 60 seconds. Structured output consistent enough to use directly in a pitch deck.',
      },
    },
    {
      title: 'RoomSplit',
      subtitle: 'Shared Expense Manager',
      emoji: '🏠',
      featured: false,
      date: 'Feb 2026 – Apr 2026',
      description: `Splitting bills with roommates gets complicated fast — not just the math, but the social dynamics. Someone pays for something, someone else forgets, someone keeps a mental tab. It accumulates.

The debt minimisation algorithm was the fun computer science problem: reduce N debts to the minimum number of transactions. The anonymous conflict system was the human problem: how do you let someone say "this isn't working" without making it personal? My actual roommates used both. The ledger invariant — the sum of all balances must always equal zero — was the thing I'm most proud of technically. It's never fired.`,
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'bcryptjs', 'JWT'],
      features: [
        'Greedy debt-minimisation algorithm — reduces O(N²) debts to the minimum transaction count',
        'Ledger invariant validation — sum of all balances enforced to equal zero on every computation',
        'Anonymous house voice system — raise a conflict without revealing who raised it',
        'Recurring expense auto-generation — rent, utilities, subscriptions logged once',
        'Full auth: JWT sessions, group management, invite codes, role-based access',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/roomsplit',
      metrics: '⚙️ Mathematically minimum transactions — the invariant has never fired',
      caseStudy: {
        problem: 'Three roommates can accumulate 6 separate debt relationships when 2 transactions would clear everything. No structured way to surface conflicts without attribution.',
        approach: 'Greedy settlement: sort debtors and creditors by amount, iteratively match largest to largest. Ledger invariant (sum of net balances = 0) fires on every balance computation. Anonymous conflict system stores complaints without user attribution.',
        results: 'Complex expense histories resolve in minimum transactions. Invariant has stayed consistent across all tested scenarios.',
      },
    },
    {
      title: 'AI Resume Customizer',
      subtitle: 'LLM-Powered Job Application Tool',
      emoji: '📄',
      featured: false,
      date: 'Sep 2025 – Dec 2025',
      description: `I built this while actively job hunting and finding the process demoralising. Every AI tool I tried either did nothing useful or made things up — added skills I didn't have, inflated numbers that weren't there. If it fabricates and you get the interview, you're the one who has to answer for it.

The no-fabrication constraint is enforced at the code level, not just the prompt level. After the LLM rewrites your bullets, a validator extracts technical terms from the suggestion and checks each one against your original resume. If it introduces a new skill, it flags it. The resume in front of you was shaped by an earlier version of this tool.`,
      technologies: ['React', 'TypeScript', 'Node.js', 'tRPC', 'Drizzle ORM', 'MySQL', 'Docker'],
      features: [
        'No-fabrication rule — rewrites existing bullets using Action → Technology → Impact formula',
        'Post-processing validator — checks LLM suggestions for new technical terms not in the original',
        'ATS compatibility scanner — keyword gap analysis, formatting warnings, score 0-100',
        'Job description analyser — extracts required skills, responsibilities, ATS keywords',
        'Cover letter generator — company-specific, no clichés, 3-4 paragraphs',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/ai-resume-customizer',
      metrics: '🛡️ No fabrication — the validator catches what the prompt alone does not',
      caseStudy: {
        problem: 'AI resume tools hallucinate. They add skills you don\'t have and inflate metrics that don\'t exist — which backfires in interviews.',
        approach: 'Multi-step pipeline: parse JD → extract requirements → score match → rewrite bullets using only existing content. Post-processing validator flags any new technical term the LLM introduces that wasn\'t in the original resume.',
        results: 'Validator has caught fabricated skills in testing. Match scores improve 20-35 points without inventing credentials.',
      },
    },
    {
      title: 'BoomStart AI',
      subtitle: 'Personal Fitness Coach',
      emoji: '🏋️',
      featured: false,
      date: 'Nov 2025 – May 2026',
      description: `I couldn't afford a personal trainer, so I built one. The AI generates personalised workout and nutrition plans based on your body metrics and goals, adapts when you tell it something isn't working, and logs meals from natural language descriptions or photos.

I added a Bhagavad Gita feature for mental reset between sets — a verse and reflection when you need a moment between the hard parts. It's the feature that surprised me most. I expected it to feel like a novelty. I use it daily.`,
      technologies: ['React', 'TypeScript', 'Supabase', 'Gemini', 'Deno Edge Functions'],
      features: [
        'AI-generated personalised workout and nutrition plans from body metrics and goals',
        'Natural language meal logging — describe what you ate, get calorie and protein breakdown',
        'Photo meal logging — AI identifies food items and estimates portions from a photo',
        'Plan adjustment — tell the AI what isn\'t working, it recalculates',
        'Weekly AI-generated insights from your logged data',
      ],
      githubUrl: 'https://github.com/sidddharthhahir/pocketfit-ai-coach',
      metrics: '🤖 Built because I couldn\'t afford a trainer — I use it daily',
      caseStudy: {
        problem: 'Generic fitness apps don\'t adapt. They give everyone the same plan and expect manual logging. The friction is too high.',
        approach: 'Supabase Edge Functions on Deno call Gemini for plan generation, meal parsing, and weekly insights. Meal logging accepts text and photos — photo endpoint uses Gemini vision to identify items and estimate portions. Plan adjustment is a separate LLM call with current plan + complaint as context.',
        results: 'Frictionless daily tracking with AI that adapts to feedback. Natural language meal logging removed the main reason I used to skip it.',
      },
    },
  ],

  goals: {
    headline: 'Where I\'m headed',
    subheadline: 'The next five years',
    story: [
      {
        year: 'Now — 2026',
        title: 'Doing the real work',
        content: 'I\'m at Firmway doing AI engineering in production — not demos, not side projects. Tracing requests across microservices, building infrastructure the team actually depends on, running evaluations that shape product decisions. This is the part where I learn what separates systems that work in a notebook from systems that work at 2am when something breaks.',
        icon: '🔧',
      },
      {
        year: '2027',
        title: 'Getting good at the hard parts',
        content: 'Evaluation frameworks that actually measure what matters. RAG architectures that don\'t hallucinate under edge cases. Multi-agent systems that stay coherent when one agent fails. I want to be the person who has debugged these things, not the person who has read about them. That takes time and real failures.',
        icon: '🧠',
      },
      {
        year: '2028',
        title: 'Taking ownership',
        content: 'I want to be the person a team turns to when they need to decide how to build the AI layer. Not a manager — a technical lead. Someone who makes architecture decisions, knows why they made them, and can explain them clearly. The kind of engineer who makes a team better just by being in the room.',
        icon: '🏗️',
      },
      {
        year: '2029 — 2030',
        title: 'Building something that lasts',
        content: 'Every project I\'ve built — the content analyzer, the startup evaluator, BoomStart, RoomSplit — started as something I personally needed. That instinct doesn\'t go away. At some point I want to take everything I\'ve learned in production AI and build something people genuinely depend on. The form it takes matters less than the fact that it\'s real.',
        icon: '🚀',
      },
    ],
    closing: 'The specific path is less important than the direction. I want to be someone who ships AI systems that are reliable, observable, and actually useful — not just impressive in a pitch.',
  },

  buildings: [
    { id: 'hero',       label: 'Entrance',   emoji: '🌆' },
    { id: 'about',      label: 'About',      emoji: '🏢' },
    { id: 'experience', label: 'Experience', emoji: '💼' },
    { id: 'skills',     label: 'Skills',     emoji: '🔬' },
    { id: 'projects',   label: 'Projects',   emoji: '🏗️' },
    { id: 'goals',      label: 'Goals',      emoji: '🎯' },
    { id: 'education',  label: 'Education',  emoji: '📚' },
  ],
};

export const RESUME_CONFIG = PORTFOLIO.resume;
