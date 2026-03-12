import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Code, Server, Globe, Cpu, Rocket, Database, Sparkles, Bot, Lightbulb, Layers, Braces, FileCode, GitBranch } from 'lucide-react';
import { useState } from 'react';
import SkillModal from '@/components/SkillModal';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const skillCategories = [
  {
    title: 'AI / Machine Learning', icon: Brain, gradient: 'from-red-500/20 to-orange-500/20', borderColor: 'border-red-500/20',
    skills: [
      { name: 'Recommendation Systems (LightFM)', icon: Sparkles, description: 'Hybrid collaborative + content-based recommendation engines', detailedDescription: 'Building hybrid recommendation systems using LightFM combining collaborative filtering with content-based approaches.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
      { name: 'RAG', icon: Brain, description: 'Retrieval-Augmented Generation pipelines', detailedDescription: 'Implementing RAG pipelines to enhance LLM outputs with contextual knowledge retrieval.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
      { name: 'Explainable AI (SHAP, LIME)', icon: Lightbulb, description: 'Making AI decisions transparent', detailedDescription: 'Using SHAP and LIME for human-readable explanations of AI predictions.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
      { name: 'LLM Integration (Ollama)', icon: Bot, description: 'Local LLM deployment', detailedDescription: 'Integrating local LLMs via Ollama for privacy-preserving AI features.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
      { name: 'Prompt Engineering', icon: Braces, description: 'Designing effective prompts', detailedDescription: 'Crafting prompts and prompt chains for production applications.', keyProjects: [{ name: 'AI Resume Customizer', url: 'https://github.com/sidddharthhahir/ai-resume-customizer' }] },
    ]
  },
  {
    title: 'AI Application Development', icon: Rocket, gradient: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-500/20',
    skills: [
      { name: 'Python', icon: Code, description: 'Core AI/ML language', detailedDescription: 'Advanced Python for AI applications, ML pipelines, and backend services.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
      { name: 'AI-Powered Product Design', icon: Lightbulb, description: 'AI-first UX design', detailedDescription: 'Designing products where AI is the core value proposition.', keyProjects: [{ name: 'PocketFit AI Coach', url: 'https://github.com/sidddharthhahir/pocketfit-ai-coach.git' }] },
      { name: 'AI System Architecture', icon: Layers, description: 'Scalable AI systems', detailedDescription: 'End-to-end architectures for AI applications.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
      { name: 'Data Pipelines for AI', icon: Database, description: 'ML data infrastructure', detailedDescription: 'Efficient data pipelines for ML model training and inference.', keyProjects: [{ name: 'Game KPI Dashboard', url: 'https://github.com/sidddharthhahir/Dashboard' }] },
    ]
  },
  {
    title: 'Backend & Data Systems', icon: Server, gradient: 'from-amber-500/20 to-yellow-500/20', borderColor: 'border-amber-500/20',
    skills: [
      { name: 'Django / DRF', icon: Server, description: 'Python web framework', detailedDescription: 'Robust backend systems with Django REST Framework.', keyProjects: [{ name: 'MovieWise-XAI', url: 'https://github.com/sidddharthhahir/MovieWise-XAI' }] },
      { name: 'Node.js / Express', icon: Server, description: 'JavaScript runtime', detailedDescription: 'Fast, scalable API services.', keyProjects: [{ name: 'Game KPI Dashboard', url: 'https://github.com/sidddharthhahir/Dashboard' }] },
      { name: 'PostgreSQL / Supabase', icon: Database, description: 'Relational databases', detailedDescription: 'Database design and query optimization.', keyProjects: [{ name: 'RoomSplit', url: 'https://github.com/sidddharthhahir/roomsplit' }] },
      { name: 'Prisma / MySQL', icon: Database, description: 'ORM & database mgmt', detailedDescription: 'Type-safe database access.', keyProjects: [{ name: 'RoomSplit', url: 'https://github.com/sidddharthhahir/roomsplit' }] },
    ]
  },
  {
    title: 'Frontend for AI Products', icon: Globe, gradient: 'from-emerald-500/20 to-green-500/20', borderColor: 'border-emerald-500/20',
    skills: [
      { name: 'React / TypeScript', icon: Layers, description: 'Modern frontend', detailedDescription: 'Dynamic, type-safe UIs for AI apps.', keyProjects: [{ name: 'PocketFit AI Coach', url: 'https://github.com/sidddharthhahir/pocketfit-ai-coach.git' }] },
      { name: 'Next.js', icon: Globe, description: 'Full-stack React', detailedDescription: 'SSR and full-stack development.', keyProjects: [{ name: 'RoomSplit', url: 'https://github.com/sidddharthhahir/roomsplit' }] },
      { name: 'Tailwind CSS / Vite', icon: FileCode, description: 'Modern styling & build', detailedDescription: 'Utility-first CSS and fast build tools.', keyProjects: [{ name: 'Portfolio Website' }] },
    ]
  },
  {
    title: 'DevOps & Infrastructure', icon: Cpu, gradient: 'from-purple-500/20 to-pink-500/20', borderColor: 'border-purple-500/20',
    skills: [
      { name: 'Docker', icon: Server, description: 'Containers', detailedDescription: 'Containerizing AI applications.', keyProjects: [{ name: 'Game KPI Dashboard', url: 'https://github.com/sidddharthhahir/Dashboard' }] },
      { name: 'GitHub Actions', icon: GitBranch, description: 'CI/CD', detailedDescription: 'Automated pipelines.', keyProjects: [{ name: 'Game KPI Dashboard', url: 'https://github.com/sidddharthhahir/Dashboard' }] },
      { name: 'AWS / Heroku', icon: Globe, description: 'Cloud platforms', detailedDescription: 'Cloud deployment and scaling.', keyProjects: [] },
      { name: 'Git / GitHub', icon: GitBranch, description: 'Version control', detailedDescription: 'Professional version control workflows.', keyProjects: [{ name: 'All Projects' }] },
    ]
  },
];

const GymRoom = () => {
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={item} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400/80 mb-3">Training Zone</p>
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">The Gym</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Every skill is a muscle — here's what I've been training</p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div key={catIndex} variants={item}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl bg-gradient-to-r ${category.gradient} border ${category.borderColor}`}>
                  <category.icon size={20} className="text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
              </div>
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {category.skills.map((skill, index) => (
                  <motion.div key={index} variants={item}>
                    <Card 
                      className="glass-hover cursor-pointer group h-full"
                      onClick={() => { setSelectedSkill(skill); setIsModalOpen(true); }}
                    >
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className={`p-2 rounded-lg border ${category.borderColor} bg-gradient-to-r ${category.gradient} flex-shrink-0`}>
                          <skill.icon size={16} className="text-foreground" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{skill.name}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{skill.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SkillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} skill={selectedSkill} />
    </div>
  );
};

export default GymRoom;
