import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Linkedin, Github, Code, Database, Globe, User, Briefcase, Contact, ArrowDown, Sparkles, Star, Server, Braces, FileCode, GitBranch, Layers, ExternalLink, Clock, Zap, Brain, Bot, FlaskConical, Cpu, BarChart3, Lightbulb, Rocket, MapPin, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Navigation from '@/components/Navigation';
import TypewriterText from '@/components/TypewriterText';
import CurrentlyLearning from '@/components/CurrentlyLearning';
import VisitorGreeting from '@/components/VisitorGreeting';
import MemoryGame from '@/components/MemoryGame';
import TicTacToeGame from '@/components/TicTacToeGame';
import EndlessRunnerGame from '@/components/EndlessRunnerGame';
import GameSelector from '@/components/GameSelector';
import SkillModal from '@/components/SkillModal';
import TripleClickHint from '@/components/TripleClickHint';
import { useLanguage } from '@/contexts/LanguageContext';
import { RESUME_CONFIG } from '@/config/resume';
import { VibrationManager } from '@/utils/vibrationUtils';

const NeuralNetwork3D = lazy(() => import('@/components/NeuralNetwork3D'));

const Index = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  // Game states
  const [showGameSelector, setShowGameSelector] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [showTicTacToe, setShowTicTacToe] = useState(false);
  const [showEndlessRunner, setShowEndlessRunner] = useState(false);
  
  const [showHint, setShowHint] = useState(false);
  const [isGameFeatureDiscovered, setIsGameFeatureDiscovered] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const discovered = localStorage.getItem('gameFeatureDiscovered') === 'true';
      const dismissed = localStorage.getItem('hintDismissed') === 'true';
      setIsGameFeatureDiscovered(discovered);
      setHintDismissed(dismissed);
      if (!discovered && !dismissed) {
        const timer = setTimeout(() => setShowHint(true), 2000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      const timer = setTimeout(() => setShowHint(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // AI-focused skill categories
  const skillCategories = [
    {
      title: 'AI / Machine Learning',
      icon: Brain,
      skills: [
        { name: 'Recommendation Systems (LightFM)', icon: Sparkles, description: 'Hybrid collaborative + content-based recommendation engines', detailedDescription: 'Building hybrid recommendation systems using LightFM combining collaborative filtering with content-based approaches for personalized recommendations.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
        { name: 'RAG', icon: Brain, description: 'Retrieval-Augmented Generation pipelines', detailedDescription: 'Implementing RAG pipelines to enhance LLM outputs with contextual knowledge retrieval for accurate, grounded AI responses.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
        { name: 'Explainable AI (SHAP, LIME)', icon: Lightbulb, description: 'Making AI decisions transparent and interpretable', detailedDescription: 'Using SHAP and LIME to surface human-readable explanations for AI model predictions, building trust in AI systems.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
        { name: 'LLM Integration (Ollama)', icon: Bot, description: 'Local LLM deployment and integration', detailedDescription: 'Integrating local large language models via Ollama for privacy-preserving, low-latency AI-powered features.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
        { name: 'Prompt Engineering', icon: Braces, description: 'Designing effective prompts for LLMs', detailedDescription: 'Crafting precise prompts and prompt chains to maximize LLM output quality for production applications.', keyProjects: [{ name: 'AI Resume Customizer', url: 'https://github.com/sidddharthhahir/ai-resume-customizer' }] },
      ]
    },
    {
      title: 'AI Application Development',
      icon: Rocket,
      skills: [
        { name: 'Python', icon: Code, description: 'Core language for AI/ML development', detailedDescription: 'Advanced Python for building AI applications, ML pipelines, data processing, and backend services.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }, { name: 'AI Resume Customizer', url: 'https://github.com/sidddharthhahir/ai-resume-customizer' }] },
        { name: 'AI-Powered Product Design', icon: Lightbulb, description: 'Designing AI-first user experiences', detailedDescription: 'Designing products where AI is the core value proposition — from recommendation engines to intelligent coaching systems.', keyProjects: [{ name: 'PocketFit AI Coach', url: 'https://github.com/sidddharthhahir/pocketfit-ai-coach.git' }] },
        { name: 'AI System Architecture', icon: Layers, description: 'Architecting scalable AI systems', detailedDescription: 'Designing end-to-end architectures for AI applications including model serving, data pipelines, and API layers.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
        { name: 'Data Pipelines for AI', icon: Database, description: 'Building data infrastructure for ML', detailedDescription: 'Creating efficient data pipelines that feed ML models with clean, structured data for training and inference.', keyProjects: [{ name: 'Game KPI Dashboard', url: 'https://github.com/sidddharthhahir/Dashboard' }] },
      ]
    },
    {
      title: 'Backend & Data Systems',
      icon: Server,
      skills: [
        { name: 'Django / DRF', icon: Server, description: 'Python web framework & REST APIs', detailedDescription: 'Building robust backend systems with Django and Django REST Framework for AI-powered applications.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
        { name: 'Node.js / Express', icon: Server, description: 'JavaScript runtime & framework', detailedDescription: 'Server-side JavaScript for building fast, scalable API services and real-time applications.', keyProjects: [{ name: 'Game KPI Dashboard', url: 'https://github.com/sidddharthhahir/Dashboard' }] },
        { name: 'PostgreSQL / Supabase', icon: Database, description: 'Relational databases & BaaS', detailedDescription: 'Database design, query optimization, and using Supabase for rapid backend development with real-time features.', keyProjects: [{ name: 'RoomSplit', url: 'https://github.com/sidddharthhahir/roomsplit' }, { name: 'Game KPI Dashboard', url: 'https://github.com/sidddharthhahir/Dashboard' }] },
        { name: 'Prisma / MySQL', icon: Database, description: 'ORM & database management', detailedDescription: 'Type-safe database access with Prisma ORM and MySQL for structured data management.', keyProjects: [{ name: 'RoomSplit', url: 'https://github.com/sidddharthhahir/roomsplit' }] },
      ]
    },
    {
      title: 'Frontend for AI Products',
      icon: Globe,
      skills: [
        { name: 'React / TypeScript', icon: Layers, description: 'Modern frontend development', detailedDescription: 'Building dynamic, type-safe user interfaces for AI-powered applications with React and TypeScript.', keyProjects: [{ name: 'PocketFit AI Coach', url: 'https://github.com/sidddharthhahir/pocketfit-ai-coach.git' }] },
        { name: 'Next.js', icon: Globe, description: 'Full-stack React framework', detailedDescription: 'Server-side rendering and full-stack development with Next.js for production AI applications.', keyProjects: [{ name: 'RoomSplit', url: 'https://github.com/sidddharthhahir/roomsplit' }] },
        { name: 'Tailwind CSS / Vite', icon: FileCode, description: 'Modern styling & build tools', detailedDescription: 'Rapid UI development with utility-first CSS and lightning-fast build tooling.', keyProjects: [{ name: 'Portfolio Website' }] },
      ]
    },
    {
      title: 'DevOps & Infrastructure',
      icon: Cpu,
      skills: [
        { name: 'Docker', icon: Server, description: 'Containerized deployments', detailedDescription: 'Containerizing AI applications and development environments for consistent, reproducible deployments.', keyProjects: [{ name: 'Game KPI Dashboard', url: 'https://github.com/sidddharthhahir/Dashboard' }] },
        { name: 'GitHub Actions', icon: GitBranch, description: 'CI/CD automation', detailedDescription: 'Automating testing, building, and deployment pipelines with GitHub Actions.', keyProjects: [{ name: 'Game KPI Dashboard', url: 'https://github.com/sidddharthhahir/Dashboard' }] },
        { name: 'AWS / Heroku', icon: Globe, description: 'Cloud deployment platforms', detailedDescription: 'Deploying and scaling applications on cloud infrastructure.', keyProjects: [] },
        { name: 'Git / GitHub', icon: GitBranch, description: 'Version control & collaboration', detailedDescription: 'Professional version control workflows, code review, and open-source collaboration.', keyProjects: [{ name: 'All Projects' }] },
      ]
    },
  ];

  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      title: '🤖 MovieWise-XAI',
      subtitle: 'Featured AI Project',
      description: 'An explainable movie recommendation system that combines hybrid recommendation models with large language models to generate human-readable explanations.',
      technologies: ['Python', 'Django', 'LightFM', 'Ollama', 'RAG'],
      features: [
        'Hybrid recommendation engine (collaborative + content-based)',
        'Explainable AI using SHAP/LIME concepts',
        'LLM-generated natural language explanations',
        'Retrieval-augmented reasoning pipeline'
      ],
      githubUrl: 'https://github.com/sidddharthhahir/MovieWise-XAI',
      metrics: '🧠 XAI-powered recommendations',
      featured: true,
      caseStudy: {
        problem: 'Most recommendation systems act as black boxes — users get suggestions with no insight into why. This erodes trust and limits adoption in real-world applications.',
        approach: 'Built a hybrid recommendation engine combining collaborative filtering (LightFM) with content-based signals, then layered an RAG pipeline using Ollama to generate natural language explanations grounded in SHAP/LIME feature attributions.',
        results: 'Achieved transparent, explainable recommendations where users can understand the reasoning behind every suggestion. The RAG layer produces coherent, context-aware explanations in real time.'
      }
    },
    {
      title: '🏠 RoomSplit',
      subtitle: 'AI-Ready System Architecture',
      description: 'A multi-user expense management platform designed with scalable data models and optimized transaction settlement algorithms.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      features: [
        'Optimized expense settlement algorithm',
        'Multi-user system architecture',
        'Scalable relational database design',
        'Modern dashboard UI'
      ],
      githubUrl: 'https://github.com/sidddharthhahir/roomsplit',
      metrics: '⚙️ Optimized algorithms',
      caseStudy: {
        problem: 'Splitting expenses among groups often leads to complex debt chains. Existing tools lacked efficient settlement algorithms and scalable multi-user data models.',
        approach: 'Designed a normalized relational schema with Prisma ORM, implemented a graph-based settlement algorithm that minimizes total transactions, and built a real-time dashboard with Next.js and TypeScript.',
        results: 'Reduced settlement transactions by up to 60% compared to naive approaches. The architecture supports unlimited groups and users with sub-second query performance.'
      }
    },
    {
      title: '📄 AI Resume Customizer',
      subtitle: 'LLM-Powered Tool',
      description: 'An AI-powered tool that customizes resumes automatically based on job descriptions using LLM-based text analysis.',
      technologies: ['Python', 'LLM APIs', 'NLP'],
      features: [
        'Resume-job description matching',
        'AI-powered resume tailoring',
        'NLP text analysis pipeline',
        'Automation of job application preparation'
      ],
      githubUrl: 'https://github.com/sidddharthhahir/ai-resume-customizer',
      metrics: '🤖 AI-automated workflow',
      caseStudy: {
        problem: 'Tailoring resumes for each job application is time-consuming and error-prone. Job seekers often miss critical keyword alignment with job descriptions.',
        approach: 'Built an NLP pipeline that parses job descriptions, extracts key requirements, and uses LLM APIs to intelligently rewrite resume sections to maximize relevance while preserving authenticity.',
        results: 'Automated a process that typically takes 30-45 minutes per application down to under 2 minutes, with improved keyword matching and ATS compatibility.'
      }
    },
    {
      title: '📊 Game KPI Dashboard',
      subtitle: 'Analytics & Data Systems',
      description: 'An analytics dashboard that processes marketing performance data and visualizes KPIs for decision-making.',
      technologies: ['React', 'Node.js', 'Express', 'Supabase', 'Recharts'],
      features: [
        'KPI tracking and visualization',
        'Server-side filtering with cached APIs',
        'Indexed queries for sub-second analytics'
      ],
      githubUrl: 'https://github.com/sidddharthhahir/Dashboard',
      metrics: '⏱️ Sub-second response time',
      caseStudy: {
        problem: 'Marketing teams lacked real-time visibility into game campaign performance, relying on slow, manually exported spreadsheets for KPI tracking.',
        approach: 'Designed a server-side filtering architecture with Express and Supabase, using indexed queries and API-level caching. Built an interactive Recharts-based frontend for drill-down analytics.',
        results: 'Achieved sub-second query response times on datasets with 100K+ rows. Reduced reporting time from hours to real-time interactive exploration.'
      }
    },
    {
      title: '🏋️ PocketFit AI Coach',
      subtitle: 'AI-Powered Application',
      description: 'An AI-powered fitness assistant that generates personalized workout and diet plans with natural language meal logging.',
      technologies: ['React', 'TypeScript', 'Supabase', 'AI Integration'],
      features: [
        'AI-generated fitness recommendations',
        'Natural language meal logging',
        'Progress tracking dashboard'
      ],
      githubUrl: 'https://github.com/sidddharthhahir/pocketfit-ai-coach.git',
      metrics: '🤖 AI-powered coaching',
      caseStudy: {
        problem: 'Generic fitness apps fail to adapt to individual goals and dietary preferences. Manual meal logging with calorie counting creates friction and low adherence.',
        approach: 'Integrated AI to generate personalized plans based on user profiles. Implemented natural language meal logging so users can type "had a chicken salad for lunch" instead of searching databases.',
        results: 'Created a frictionless fitness tracking experience with AI-driven personalization, increasing potential user engagement through conversational interfaces.'
      }
    },
  ];

  const aiInterests = [
    { icon: Bot, label: 'Large Language Model Applications' },
    { icon: Lightbulb, label: 'Explainable AI' },
    { icon: Sparkles, label: 'Recommendation Systems' },
    { icon: Rocket, label: 'AI Product Engineering' },
    { icon: Database, label: 'AI + Data Infrastructure' },
    { icon: Globe, label: 'AI-powered SaaS Products' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      emailjs.init('1XEPgOlzfPoTgaput');
      const result = await emailjs.send('service_5n5oy19', 'template_ixyj8he', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Siddharth Ahir'
      });
      toast({ title: t('contact.success.title'), description: t('contact.success.desc') });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({ title: t('contact.error.title'), description: t('contact.error.desc'), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProfileClick = () => {
    const profileElement = document.querySelector('[data-profile-image]') as HTMLElement;
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount < 3) {
        VibrationManager.profileClick(profileElement);
      } else if (newCount === 3) {
        VibrationManager.gameReveal(profileElement);
        setShowGameSelector(true);
        if (!isGameFeatureDiscovered) {
          setIsGameFeatureDiscovered(true);
          localStorage.setItem('gameFeatureDiscovered', 'true');
          setShowHint(false);
        }
        return 0;
      }
      return newCount;
    });
  };

  const handleGameSelectorClose = () => setShowGameSelector(false);
  const handleSelectMemoryGame = () => { setShowGameSelector(false); setShowMemoryGame(true); };
  const handleSelectTicTacToe = () => { setShowGameSelector(false); setShowTicTacToe(true); };
  const handleSelectEndlessRunner = () => { setShowGameSelector(false); setShowEndlessRunner(true); };
  const handleMemoryGameComplete = () => setShowMemoryGame(false);
  const handleTicTacToeComplete = () => setShowTicTacToe(false);
  const handleEndlessRunnerComplete = () => setShowEndlessRunner(false);

  const handleResumeDownload = () => {
    try {
      let downloadUrl = RESUME_CONFIG.url;
      if (downloadUrl.includes('drive.google.com')) {
        const fileId = downloadUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (fileId) downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
      toast({ title: "Resume Opened", description: `${RESUME_CONFIG.fileName} has been opened in a new tab!` });
    } catch (error) {
      toast({ title: "Download Error", description: "Failed to open resume. Please try again.", variant: "destructive" });
    }
  };

  const handleSkillClick = (skill: any) => { setSelectedSkill(skill); setIsSkillModalOpen(true); };
  const handleProjectClick = (githubUrl?: string) => { if (githubUrl) window.open(githubUrl, '_blank'); };
  const handleHintDismiss = () => { setShowHint(false); setHintDismissed(true); localStorage.setItem('hintDismissed', 'true'); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <style>{`
        @keyframes float-up-down { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes float-up-down-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        .float-animation { animation: float-up-down 3s ease-in-out infinite; }
        .float-animation-delayed { animation: float-up-down-delayed 3s ease-in-out infinite 1.5s; }
        @keyframes neural-pulse { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.3; } }
        .neural-bg { animation: neural-pulse 4s ease-in-out infinite; }
      `}</style>

      {/* 3D Neural Network Background */}
      <div className="fixed inset-0 -z-10">
        <Suspense fallback={null}>
          <NeuralNetwork3D />
        </Suspense>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl neural-bg"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl neural-bg" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navigation scrollToSection={scrollToSection} />

      <TripleClickHint 
        isVisible={showHint && !isGameFeatureDiscovered && !hintDismissed}
        onDismiss={handleHintDismiss}
      />

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-24" data-animate>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="relative w-80 h-80 mx-auto mb-8 group p-8">
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 animate-spin opacity-75" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-6 rounded-full backdrop-blur-xl bg-black/30 border border-white/20 shadow-2xl"></div>
              <div 
                data-profile-image
                className="relative w-64 h-64 mx-auto rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 p-3 group-hover:scale-110 transition-all duration-700 shadow-2xl cursor-pointer overflow-hidden"
                onClick={handleProfileClick}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  <img 
                    src="https://i.postimg.cc/P5HS8SsF/FLUX-Playground-Image.png" 
                    alt="Siddharth Ahir — AI Engineer" 
                    className="w-full h-full object-cover rounded-full transition-all duration-700 group-hover:scale-105 filter brightness-110 contrast-110"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl text-gray-300 font-medium">{t('hero.greeting')}</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                {t('hero.name')}
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-gray-200 mb-4 font-medium max-w-4xl mx-auto leading-relaxed">
              <TypewriterText phrases={[
                'AI Engineer → LLMs, RAG & Intelligent Systems',
                'Building Explainable AI Products',
                'Designing Scalable Data Architectures',
                'Crafting AI-Powered User Experiences',
              ]} />
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed text-center">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {['LLM Integrations', 'RAG Pipelines', 'AI-Powered Features', 'Scalable Data Systems'].map((item) => (
                  <Badge key={item} className="backdrop-blur-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 px-4 py-1.5 text-sm">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button 
                onClick={() => scrollToSection('portfolio')} 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-10 py-5 text-lg rounded-full hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/25 backdrop-blur-xl border border-white/20 group"
              >
                <span className="flex items-center gap-3">
                  {t('hero.viewProjects')}
                  <Brain size={20} className="group-hover:rotate-12 transition-transform duration-500" />
                </span>
              </Button>
              <Button 
                onClick={() => window.open('https://github.com/sidddharthhahir', '_blank')}
                className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 px-10 py-5 text-lg rounded-full hover:scale-110 transition-all duration-500 font-medium shadow-xl"
              >
                <span className="flex items-center gap-3">
                  <Github size={20} />
                  GitHub
                </span>
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="backdrop-blur-xl bg-white/5 border border-white/15 text-gray-300 hover:bg-white/15 px-10 py-5 text-lg rounded-full hover:scale-110 transition-all duration-500 font-medium"
              >
                {t('nav.contact')}
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-gray-400 animate-pulse">{t('hero.scrollExplore')}</span>
              <div className="animate-bounce">
                <ArrowDown size={28} className="text-emerald-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ ABOUT SECTION ═══════════════ */}
      <section id="about" className="py-24" data-animate>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-16">
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {t('about.title')}
            </h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-emerald-400">{t('about.profileTitle')}</h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    {t('about.description')}
                  </p>
                  <h4 className="text-lg font-semibold text-gray-200 mb-4">{t('about.experienceTitle')}</h4>
                  <ul className="space-y-3">
                    {[t('about.experience1'), t('about.experience2'), t('about.experience3'), t('about.experience4'), t('about.experience5')].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-emerald-400/80 mt-6 font-medium italic">{t('about.tagline')}</p>
                </div>
              </div>
              <div>
                <Card className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-700 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-emerald-400 text-2xl">Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                      <h4 className="font-semibold text-gray-200 text-lg">MSc Computer Science</h4>
                      <p className="text-gray-300">International University of Applied Sciences</p>
                      <p className="text-gray-300">Berlin, Germany</p>
                      <p className="text-sm text-emerald-400 font-medium">Sept 2023 – Present</p>
                    </div>
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                      <h4 className="font-semibold text-gray-200 text-lg">Bachelor of Computer Application</h4>
                      <p className="text-gray-300">Gujarat University</p>
                      <p className="text-gray-300">Ahmedabad, India</p>
                      <p className="text-sm text-emerald-400 font-medium">July 2019 – April 2022</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ SKILLS SECTION ═══════════════ */}
      <section id="skills" className="py-24" data-animate>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          <div className="max-w-7xl mx-auto space-y-12">
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg border border-white/10">
                    <category.icon size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-200">{category.title}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.skills.map((skill, index) => (
                    <Card 
                      key={index}
                      className="backdrop-blur-2xl bg-black/30 border border-white/15 hover:bg-black/40 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer hover:border-emerald-400/30 group"
                      onClick={() => handleSkillClick(skill)}
                    >
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all duration-300 border border-white/10 flex-shrink-0">
                          <skill.icon size={22} className="text-emerald-400 group-hover:text-cyan-400 transition-all duration-300" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-200 group-hover:text-emerald-400 transition-all duration-300">
                            {skill.name}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-300 transition-all duration-300">
                            {skill.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ PROJECTS SECTION ═══════════════ */}
      <section id="portfolio" className="py-24" data-animate>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">{t('projects.subtitle')}</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={project.featured ? 'md:col-span-2' : ''}
              >
                <Card 
                  className={`backdrop-blur-2xl bg-black/30 border hover:bg-black/40 transition-all duration-700 hover:shadow-2xl group transform cursor-pointer ${
                    project.featured 
                      ? 'border-emerald-400/40 hover:shadow-emerald-500/20 hover:border-emerald-400/60' 
                      : 'border-white/15 hover:shadow-cyan-500/15 hover:border-cyan-400/40'
                  }`}
                >
                  <CardHeader onClick={() => handleProjectClick(project.githubUrl)}>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`text-xs px-3 py-1 ${project.featured ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : 'bg-cyan-500/15 text-cyan-300 border-cyan-400/25'}`}>
                        {project.subtitle}
                      </Badge>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={18} className="text-emerald-400" />
                      </div>
                    </div>
                    <CardTitle className="text-gray-200 group-hover:text-emerald-400 transition-all duration-500 text-xl">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 leading-relaxed text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} className="backdrop-blur-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/25 hover:bg-emerald-500/25 transition-all duration-500 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <ul className="text-sm text-gray-300 space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {project.metrics && (
                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-sm text-gray-400">{project.metrics}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedProject(expandedProject === index ? null : index);
                          }}
                          className="text-emerald-400 hover:text-cyan-400 hover:bg-white/5 text-xs gap-1.5"
                        >
                          <FlaskConical size={14} />
                          {expandedProject === index ? 'Hide Case Study' : 'View Case Study'}
                        </Button>
                      </div>
                    )}

                    {/* Expandable Case Study */}
                    <AnimatePresence>
                      {expandedProject === index && project.caseStudy && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 space-y-4 pt-4 border-t border-white/10">
                            {[
                              { label: '🔍 Problem', text: project.caseStudy.problem, color: 'from-red-500/20 to-orange-500/20 border-red-400/20' },
                              { label: '⚡ Approach', text: project.caseStudy.approach, color: 'from-emerald-500/20 to-cyan-500/20 border-emerald-400/20' },
                              { label: '🎯 Results', text: project.caseStudy.results, color: 'from-cyan-500/20 to-blue-500/20 border-cyan-400/20' },
                            ].map((section, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.3 }}
                                className={`p-4 rounded-xl bg-gradient-to-r ${section.color} border backdrop-blur-xl`}
                              >
                                <h5 className="text-sm font-bold text-gray-200 mb-2">{section.label}</h5>
                                <p className="text-sm text-gray-300 leading-relaxed">{section.text}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ AI INTERESTS SECTION ═══════════════ */}
      <section id="interests" className="py-24" data-animate>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t('interests.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {aiInterests.map((interest, index) => (
              <div key={index} className="flex items-center gap-4 p-5 rounded-xl backdrop-blur-2xl bg-black/30 border border-white/15 hover:bg-black/40 hover:border-emerald-400/30 transition-all duration-500 hover:scale-105 group">
                <interest.icon size={24} className="text-emerald-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                <span className="text-gray-300 font-medium text-sm group-hover:text-gray-200">{interest.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ GITHUB / OPEN SOURCE SECTION ═══════════════ */}
      <section id="github" className="py-24" data-animate>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t('github.title')}
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">{t('github.subtitle')}</p>
          <div className="max-w-2xl mx-auto text-center">
            <Card className="backdrop-blur-2xl bg-black/30 border border-white/15 hover:bg-black/40 transition-all duration-500 hover:scale-105 hover:border-emerald-400/30">
              <CardContent className="p-10 flex flex-col items-center gap-6">
                <div className="p-5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-white/10">
                  <Github size={48} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-200 mb-2">github.com/sidddharthhahir</h3>
                  <p className="text-gray-400">Explore my AI projects, experiments, and open-source contributions</p>
                </div>
                <Button 
                  onClick={() => window.open('https://github.com/sidddharthhahir', '_blank')}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full hover:scale-110 transition-all duration-500"
                >
                  <span className="flex items-center gap-2">
                    <Github size={18} />
                    {t('github.viewProfile')}
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ CONTACT SECTION ═══════════════ */}
      <section id="contact" className="py-24" data-animate>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-gray-200">{t('contact.subtitle')}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  {t('contact.lookingFor')}
                </p>
                <ul className="space-y-3 mb-8">
                  {[t('contact.role1'), t('contact.role2'), t('contact.role3')].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 text-lg">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 mb-10 p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={18} className="text-emerald-400" />
                    <span>{t('contact.location')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar size={18} className="text-emerald-400" />
                    <span>{t('contact.availability')}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <a href="mailto:sidahir25820@gmail.com" className="flex items-center p-5 rounded-xl backdrop-blur-2xl bg-black/30 border border-white/15 hover:bg-black/40 transition-all duration-500 group hover:scale-105">
                    <Mail className="text-emerald-400 mr-4 group-hover:scale-125 transition-transform duration-500" size={22} />
                    <span className="text-gray-200 hover:text-emerald-400 transition-colors duration-500 font-medium">Email</span>
                  </a>
                  <a href="https://linkedin.com/in/siddharth-ahir-798754262" target="_blank" rel="noopener noreferrer" className="flex items-center p-5 rounded-xl backdrop-blur-2xl bg-black/30 border border-white/15 hover:bg-black/40 transition-all duration-500 group hover:scale-105">
                    <Linkedin className="text-emerald-400 mr-4 group-hover:scale-125 transition-transform duration-500" size={22} />
                    <span className="text-gray-200 hover:text-emerald-400 transition-colors duration-500 font-medium">LinkedIn</span>
                  </a>
                  <a href="https://github.com/sidddharthhahir" target="_blank" rel="noopener noreferrer" className="flex items-center p-5 rounded-xl backdrop-blur-2xl bg-black/30 border border-white/15 hover:bg-black/40 transition-all duration-500 group hover:scale-105">
                    <Github className="text-emerald-400 mr-4 group-hover:scale-125 transition-transform duration-500" size={22} />
                    <span className="text-gray-200 hover:text-emerald-400 transition-colors duration-500 font-medium">GitHub</span>
                  </a>
                  <button onClick={handleResumeDownload} className="flex items-center w-full p-5 rounded-xl backdrop-blur-2xl bg-black/30 border border-white/15 hover:bg-black/40 transition-all duration-500 group hover:scale-105">
                    <User className="text-emerald-400 mr-4 group-hover:scale-125 transition-transform duration-500" size={22} />
                    <span className="text-gray-200 hover:text-emerald-400 transition-colors duration-500 font-medium">{t('contact.resume')}</span>
                  </button>
                </div>
              </div>
              <Card className="backdrop-blur-2xl bg-black/30 border border-white/15 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-200 text-2xl">{t('contact.form.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input type="text" name="name" placeholder={t('contact.form.name')} value={formData.name} onChange={handleInputChange} className="backdrop-blur-xl bg-black/40 border border-white/20 text-gray-200 placeholder-gray-400 focus:bg-black/60 transition-all duration-500 text-lg py-3" required disabled={isSubmitting} />
                    <Input type="email" name="email" placeholder={t('contact.form.email')} value={formData.email} onChange={handleInputChange} className="backdrop-blur-xl bg-black/40 border border-white/20 text-gray-200 placeholder-gray-400 focus:bg-black/60 transition-all duration-500 text-lg py-3" required disabled={isSubmitting} />
                    <Textarea name="message" placeholder={t('contact.form.message')} value={formData.message} onChange={handleInputChange} className="backdrop-blur-xl bg-black/40 border border-white/20 text-gray-200 placeholder-gray-400 min-h-[150px] focus:bg-black/60 transition-all duration-500 text-lg" required disabled={isSubmitting} />
                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/30 py-4 text-lg" disabled={isSubmitting}>
                      {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 backdrop-blur-2xl bg-black/30 border-t border-white/15">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 font-medium">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>

      <VisitorGreeting />
      <GameSelector isOpen={showGameSelector} onClose={handleGameSelectorClose} onSelectMemoryGame={handleSelectMemoryGame} onSelectTicTacToe={handleSelectTicTacToe} onSelectEndlessRunner={handleSelectEndlessRunner} />
      <MemoryGame isActive={showMemoryGame} onComplete={handleMemoryGameComplete} />
      <TicTacToeGame isActive={showTicTacToe} onComplete={handleTicTacToeComplete} />
      <EndlessRunnerGame isActive={showEndlessRunner} onComplete={handleEndlessRunnerComplete} />
      <SkillModal isOpen={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)} skill={selectedSkill} />
    </div>
  );
};

export default Index;
