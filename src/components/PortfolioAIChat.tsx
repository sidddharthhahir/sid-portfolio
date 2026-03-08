import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Deep knowledge base
const KNOWLEDGE_BASE = {
  moviewise: {
    keywords: ['moviewise', 'recommendation', 'xai', 'explainable', 'lightfm', 'movie', 'recommend'],
    response: `**MovieWise XAI** is Siddharth's featured AI project — a hybrid movie recommendation system with explainable AI.

**How it works:**
1. **Hybrid Model (LightFM):** Combines collaborative filtering (learning from user behavior patterns) with content-based filtering (analyzing movie attributes like genre, cast, themes).
2. **Explainable AI Layer:** Uses SHAP and LIME concepts to identify *which features* drove each recommendation.
3. **LLM Explanation Generation:** An Ollama-powered language model takes those feature attributions and generates human-readable explanations — so users understand *why* each movie was recommended.
4. **RAG Pipeline:** Retrieval-Augmented Generation grounds the LLM's explanations in actual data, preventing hallucinations.

**Tech Stack:** Python, Django, LightFM, Ollama, RAG pipeline

This project demonstrates Siddharth's ability to build production-grade AI systems that are not just accurate, but *transparent and trustworthy*.`,
  },
  roomsplit: {
    keywords: ['roomsplit', 'expense', 'split', 'settlement', 'prisma'],
    response: `**RoomSplit** is a multi-user expense management platform designed with scalable architecture.

**What problem does it solve?**
Splitting expenses among groups creates complex debt chains. RoomSplit simplifies this with an optimized settlement algorithm.

**Technical highlights:**
- **Settlement Algorithm:** A graph-based approach that minimizes the total number of transactions needed to settle all debts — reducing settlements by up to 60% compared to naive approaches.
- **Database Design:** Normalized relational schema built with Prisma ORM, supporting unlimited groups and users.
- **Architecture:** Next.js with TypeScript for type safety, PostgreSQL for reliable data storage.
- **Performance:** Sub-second query performance even with complex multi-user calculations.

**Tech Stack:** Next.js, TypeScript, Prisma, PostgreSQL

This project showcases Siddharth's strength in algorithm design and scalable system architecture.`,
  },
  dashboard: {
    keywords: ['dashboard', 'kpi', 'game', 'analytics', 'marketing', 'chart'],
    response: `**Game KPI Dashboard** is a real-time analytics platform for marketing performance data.

**What it does:**
Provides interactive visualization of key performance indicators (KPIs) for game marketing campaigns, replacing slow manual spreadsheet workflows.

**Technical highlights:**
- **Server-side Filtering:** Express.js backend with API-level caching for fast data retrieval.
- **Indexed Queries:** PostgreSQL with carefully designed indexes for sub-second response times on 100K+ row datasets.
- **Interactive Charts:** Recharts-based frontend with drill-down analytics capabilities.
- **Docker Deployment:** Containerized for consistent deployments with GitHub Actions CI/CD.

**Tech Stack:** React, Node.js, Express, Supabase, Recharts, Docker

This project demonstrates Siddharth's expertise in data infrastructure and building performant analytics systems.`,
  },
  pocketfit: {
    keywords: ['pocketfit', 'fitness', 'coach', 'workout', 'diet', 'health'],
    response: `**PocketFit AI Coach** is an AI-powered fitness assistant that generates personalized plans.

**Key features:**
- **AI-Generated Plans:** Uses AI to create personalized workout and diet recommendations based on user profiles, goals, and preferences.
- **Natural Language Meal Logging:** Users can type "had a chicken salad for lunch" instead of manually searching food databases — the AI parses and logs it automatically.
- **Progress Tracking:** Interactive dashboard showing fitness metrics and trends over time.
- **Supabase Backend:** Real-time data sync and user authentication.

**Tech Stack:** React, TypeScript, Supabase, AI Integration

This project shows how Siddharth designs AI-first user experiences that reduce friction and increase engagement.`,
  },
  skills: {
    keywords: ['skill', 'technology', 'tech stack', 'programming', 'language', 'what can', 'tools'],
    response: `Siddharth's core technical skills span AI/ML and full-stack development:

**AI & Machine Learning:**
- Recommendation Systems (LightFM), RAG Pipelines, Explainable AI (SHAP/LIME)
- LLM Integration (Ollama), Prompt Engineering

**Backend:** Python, Django/DRF, Node.js/Express, PostgreSQL, Prisma, Supabase

**Frontend:** React, TypeScript, Next.js, Tailwind CSS

**DevOps:** Docker, GitHub Actions, AWS/Heroku

His strongest differentiator is combining AI expertise with production engineering — building AI systems that are not just smart, but reliable, explainable, and user-friendly.`,
  },
  general: {
    keywords: ['who', 'about', 'siddharth', 'tell me', 'background', 'education'],
    response: `Siddharth Ahir is an **AI Engineer** currently pursuing his Master's in Computer Science at International University of Applied Sciences in Berlin, Germany.

He specializes in building **AI-powered products** — from recommendation engines with explainable AI to intelligent fitness coaches. His work focuses on making AI practical, transparent, and user-friendly.

**What makes him stand out:**
- Builds end-to-end AI systems (not just models)
- Focuses on explainability and user trust
- Strong full-stack skills to ship complete products
- Experience with LLMs, RAG, and modern AI architectures

Feel free to ask about any specific project for deeper details!`,
  },
};

function findBestResponse(message: string): string {
  const lower = message.toLowerCase();

  // Check each knowledge area
  for (const [, data] of Object.entries(KNOWLEDGE_BASE)) {
    if (data.keywords.some(kw => lower.includes(kw))) {
      return data.response;
    }
  }

  // Greeting
  if (/^(hi|hello|hey|howdy)/i.test(lower.trim())) {
    return `Hey there! 👋 I'm Siddharth's AI portfolio assistant. I know all about his projects and skills.\n\nTry asking me:\n- "How does your recommendation system work?"\n- "What technologies did you use in MovieWise?"\n- "What problem does RoomSplit solve?"\n- "Tell me about PocketFit AI Coach"`;
  }

  // Fallback
  return `Great question! I can tell you about Siddharth's projects in detail:\n\n- **MovieWise XAI** — Explainable AI recommendation system\n- **RoomSplit** — Scalable expense management\n- **Game KPI Dashboard** — Real-time analytics\n- **PocketFit AI Coach** — AI fitness assistant\n\nJust ask about any of these, or about Siddharth's skills and background!`;
}

const PortfolioAIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm an AI assistant that knows everything about Siddharth's portfolio projects. Ask me anything about MovieWise XAI, RoomSplit, Game KPI Dashboard, or PocketFit AI Coach!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

    const response = findBestResponse(text);

    // Simulate typing character by character (chunked for performance)
    const assistantId = (Date.now() + 1).toString();
    const words = response.split(' ');
    let built = '';

    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    for (let i = 0; i < words.length; i += 3) {
      built += (built ? ' ' : '') + words.slice(i, i + 3).join(' ');
      const current = built;
      setMessages(prev =>
        prev.map(m => (m.id === assistantId ? { ...m, content: current } : m))
      );
      await new Promise(r => setTimeout(r, 40));
    }

    setIsTyping(false);
    inputRef.current?.focus();
  };

  const suggestedQuestions = [
    'How does your recommendation system work?',
    'What technologies did you use in MovieWise?',
    'What problem does RoomSplit solve?',
    'Tell me about PocketFit AI Coach',
  ];

  const handleSuggestion = (q: string) => {
    setInput(q);
    setTimeout(() => {
      setInput(q);
      handleSendWithText(q);
    }, 50);
  };

  const handleSendWithText = async (text: string) => {
    if (!text || isTyping) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));
    const response = findBestResponse(text);
    const assistantId = (Date.now() + 1).toString();
    const words = response.split(' ');
    let built = '';

    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    for (let i = 0; i < words.length; i += 3) {
      built += (built ? ' ' : '') + words.slice(i, i + 3).join(' ');
      const current = built;
      setMessages(prev =>
        prev.map(m => (m.id === assistantId ? { ...m, content: current } : m))
      );
      await new Promise(r => setTimeout(r, 40));
    }

    setIsTyping(false);
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Bold
      let rendered = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-300 font-semibold">$1</strong>');
      // List items
      if (rendered.startsWith('- ')) {
        return (
          <div key={i} className="flex items-start gap-2 ml-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: rendered.slice(2) }} />
          </div>
        );
      }
      // Numbered items
      const numMatch = rendered.match(/^(\d+)\.\s/);
      if (numMatch) {
        return (
          <div key={i} className="flex items-start gap-2 ml-2">
            <span className="text-emerald-400 font-bold text-sm mt-0.5">{numMatch[1]}.</span>
            <span dangerouslySetInnerHTML={{ __html: rendered.replace(/^\d+\.\s/, '') }} />
          </div>
        );
      }
      if (!rendered.trim()) return <div key={i} className="h-2" />;
      return <p key={i} dangerouslySetInnerHTML={{ __html: rendered }} />;
    });
  };

  return (
    <div className="flex flex-col h-[520px] backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl overflow-hidden">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/20 rounded-br-md'
                    : 'bg-white/5 text-gray-300 border border-white/10 rounded-bl-md'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="space-y-1">{renderContent(msg.content)}</div>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={16} className="text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 items-center"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}

        {/* Suggested questions (only show at start) */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedQuestions.map(q => (
              <button
                key={q}
                onClick={() => handleSuggestion(q)}
                className="text-xs px-3 py-2 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 hover:bg-emerald-500/20 transition-all duration-200"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Siddharth's projects..."
            className="flex-1 backdrop-blur-xl bg-black/40 border border-white/15 text-gray-200 placeholder-gray-500 focus:border-emerald-400/50"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 disabled:opacity-50"
          >
            {isTyping ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAIChat;
