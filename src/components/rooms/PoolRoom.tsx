import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FlaskConical } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const projects = [
  {
    title: '🤖 MovieWise-XAI', subtitle: 'Featured AI Project', featured: true,
    description: 'An explainable movie recommendation system combining hybrid models with LLMs for human-readable explanations.',
    technologies: ['Python', 'Django', 'LightFM', 'Ollama', 'RAG'],
    features: ['Hybrid recommendation engine', 'Explainable AI using SHAP/LIME', 'LLM-generated explanations', 'RAG pipeline'],
    githubUrl: 'https://github.com/sidddharthhahir/MovieWise-XAI',
    metrics: '🧠 XAI-powered recommendations',
    caseStudy: {
      problem: 'Most recommendation systems act as black boxes — users get suggestions with no insight into why.',
      approach: 'Built a hybrid engine combining collaborative filtering (LightFM) with content-based signals, layered with RAG using Ollama for natural language explanations.',
      results: 'Transparent, explainable recommendations with coherent, context-aware explanations in real time.'
    }
  },
  {
    title: '🏠 RoomSplit', subtitle: 'AI-Ready System Architecture',
    description: 'Multi-user expense management with scalable data models and optimized settlement algorithms.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    features: ['Optimized settlement algorithm', 'Multi-user architecture', 'Scalable relational design', 'Modern dashboard'],
    githubUrl: 'https://github.com/sidddharthhahir/roomsplit',
    metrics: '⚙️ Optimized algorithms',
    caseStudy: {
      problem: 'Splitting expenses leads to complex debt chains. Existing tools lacked efficient settlement.',
      approach: 'Normalized relational schema with Prisma, graph-based settlement minimizing transactions, real-time dashboard.',
      results: 'Reduced settlement transactions by up to 60% with sub-second query performance.'
    }
  },
  {
    title: '📄 AI Resume Customizer', subtitle: 'LLM-Powered Tool',
    description: 'AI-powered tool that customizes resumes based on job descriptions using LLM text analysis.',
    technologies: ['Python', 'LLM APIs', 'NLP'],
    features: ['Resume-JD matching', 'AI-powered tailoring', 'NLP analysis pipeline', 'Automation workflow'],
    githubUrl: 'https://github.com/sidddharthhahir/ai-resume-customizer',
    metrics: '🤖 AI-automated workflow',
    caseStudy: {
      problem: 'Tailoring resumes per application is time-consuming and error-prone.',
      approach: 'NLP pipeline parsing JDs, extracting requirements, using LLMs to rewrite resume sections.',
      results: 'Reduced 30-45 min process to under 2 minutes with improved ATS compatibility.'
    }
  },
  {
    title: '📊 Game KPI Dashboard', subtitle: 'Analytics & Data Systems',
    description: 'Analytics dashboard processing marketing data and visualizing KPIs.',
    technologies: ['React', 'Node.js', 'Express', 'Supabase', 'Recharts'],
    features: ['KPI tracking & visualization', 'Server-side filtering', 'Indexed sub-second queries'],
    githubUrl: 'https://github.com/sidddharthhahir/Dashboard',
    metrics: '⏱️ Sub-second response',
    caseStudy: {
      problem: 'Marketing teams lacked real-time visibility into campaign performance.',
      approach: 'Server-side filtering with Express/Supabase, indexed queries, interactive Recharts frontend.',
      results: 'Sub-second response on 100K+ rows. Real-time interactive exploration.'
    }
  },
  {
    title: '🏋️ PocketFit AI Coach', subtitle: 'AI-Powered Application',
    description: 'AI fitness assistant generating personalized workout and diet plans with NL meal logging.',
    technologies: ['React', 'TypeScript', 'Supabase', 'AI Integration'],
    features: ['AI-generated recommendations', 'Natural language meal logging', 'Progress tracking'],
    githubUrl: 'https://github.com/sidddharthhahir/pocketfit-ai-coach.git',
    metrics: '🤖 AI-powered coaching',
    caseStudy: {
      problem: 'Generic fitness apps fail to adapt to individual goals. Manual logging creates friction.',
      approach: 'AI for personalized plans, NL meal logging ("had chicken salad for lunch").',
      results: 'Frictionless fitness tracking with AI-driven personalization via conversational interfaces.'
    }
  },
];

const PoolRoom = () => {
  const { t } = useLanguage();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={item} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400/80 mb-3">Deep Dive</p>
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">The Pool</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Dive into my projects — click any card for the full case study</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div key={index} variants={item} className={project.featured ? 'md:col-span-2' : ''}>
              <Card className={`glass-hover transition-all duration-700 group cursor-pointer ${
                project.featured ? 'border-blue-500/30 hover:border-blue-500/50' : 'hover:border-cyan-400/30'
              }`}>
                <CardHeader onClick={() => project.githubUrl && window.open(project.githubUrl, '_blank')}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="text-xs px-3 py-1 bg-blue-500/15 text-blue-400 border-blue-500/25">
                      {project.subtitle}
                    </Badge>
                    <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-foreground group-hover:text-blue-400 transition-colors text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">{tech}</Badge>
                    ))}
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5 mb-4">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0" />{f}</li>
                    ))}
                  </ul>
                  {project.caseStudy && (
                    <>
                      <div className="pt-3 border-t border-border flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{project.metrics}</span>
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setExpandedProject(expandedProject === index ? null : index); }}
                          className="text-blue-400 hover:text-cyan-400 text-xs gap-1.5">
                          <FlaskConical size={14} />{expandedProject === index ? 'Hide' : 'Case Study'}
                        </Button>
                      </div>
                      <AnimatePresence>
                        {expandedProject === index && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-4 space-y-3 pt-3 border-t border-border">
                              {[
                                { label: '🔍 Problem', text: project.caseStudy.problem, bg: 'bg-red-500/5 border-red-500/15' },
                                { label: '⚡ Approach', text: project.caseStudy.approach, bg: 'bg-blue-500/5 border-blue-500/15' },
                                { label: '🎯 Results', text: project.caseStudy.results, bg: 'bg-emerald-500/5 border-emerald-500/15' },
                              ].map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                  className={`p-4 rounded-xl ${s.bg} border`}>
                                  <h5 className="text-sm font-bold text-foreground mb-1">{s.label}</h5>
                                  <p className="text-sm text-muted-foreground">{s.text}</p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PoolRoom;
