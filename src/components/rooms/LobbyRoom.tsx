import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Github, MapPin, Calendar } from 'lucide-react';
import MagneticProfile from '@/components/MagneticProfile';
import TypewriterText from '@/components/TypewriterText';
import CurrentlyLearning from '@/components/CurrentlyLearning';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

interface LobbyRoomProps {
  onNavigate: (room: string) => void;
}

const LobbyRoom = ({ onNavigate }: LobbyRoomProps) => {
  const { t } = useLanguage();

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="container mx-auto px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-20">
        <motion.div variants={item} className="mb-8">
          <MagneticProfile>
            <div className="relative w-48 h-48 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-md animate-glow-pulse" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-[spin_6s_linear_infinite] opacity-75" />
              <div className="absolute inset-4 rounded-full bg-background/90" />
              <div className="relative w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary p-[3px] overflow-hidden glow-box" style={{ marginTop: '16px' }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <img 
                    src="https://i.postimg.cc/P5HS8SsF/FLUX-Playground-Image.png" 
                    alt="Siddharth Ahir — AI Engineer" 
                    className="w-full h-full object-cover rounded-full filter brightness-110 contrast-110"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
              </div>
            </div>
          </MagneticProfile>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <span className="text-lg text-muted-foreground">{t('hero.greeting')}</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="glow-text">{t('hero.name')}</span>
          </h1>
          <h2 className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            <TypewriterText phrases={[
              'AI Engineer → LLMs, RAG & Intelligent Systems',
              'Building Explainable AI Products',
              'Designing Scalable Data Architectures',
            ]} />
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['LLM Integrations', 'RAG Pipelines', 'AI-Powered Features'].map((tag) => (
              <Badge key={tag} className="glass px-4 py-1.5 text-sm text-primary border-primary/20">{tag}</Badge>
            ))}
          </div>
          <CurrentlyLearning />
        </motion.div>
      </div>

      {/* About */}
      <motion.div variants={item} className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black mb-10 glow-text text-center">{t('about.title')}</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">{t('about.profileTitle')}</h3>
            <p className="text-muted-foreground leading-relaxed">{t('about.description')}</p>
            <ul className="space-y-2">
              {[t('about.experience1'), t('about.experience2'), t('about.experience3'), t('about.experience4'), t('about.experience5')].map((exp, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 flex-shrink-0" />
                  {exp}
                </li>
              ))}
            </ul>
            <p className="text-primary/80 font-medium italic">{t('about.tagline')}</p>
          </div>

          <Card className="glass-hover glow-box">
            <CardHeader>
              <CardTitle className="text-primary text-xl">Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { degree: 'MSc Computer Science', school: 'International University of Applied Sciences', location: 'Berlin, Germany', date: 'Sept 2023 – Present' },
                { degree: 'Bachelor of Computer Application', school: 'Gujarat University', location: 'Ahmedabad, India', date: 'July 2019 – April 2022' },
              ].map((edu, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/20 transition-all duration-500">
                  <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.location}</p>
                  <p className="text-xs text-primary font-medium mt-1">{edu.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Quick Navigation */}
      <motion.div variants={item} className="mt-20 text-center">
        <p className="text-muted-foreground mb-6">Explore the villa →</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { id: 'gym', label: '🏋️ Gym (Skills)' },
            { id: 'pool', label: '🏊 Pool (Projects)' },
            { id: 'theater', label: '🎬 Theater (AI Demos)' },
            { id: 'garden', label: '🌿 Garden (Contact)' },
          ].map((r) => (
            <Button key={r.id} variant="outline" onClick={() => onNavigate(r.id)} className="glass hover:border-primary/30 transition-all duration-300">
              {r.label}
            </Button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LobbyRoom;
