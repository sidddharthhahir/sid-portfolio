import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Lightbulb, Sparkles, Rocket, Database, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RESUME_CONFIG } from '@/config/resume';
import { useToast } from '@/hooks/use-toast';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const aiInterests = [
  { icon: Bot, label: 'Large Language Model Applications' },
  { icon: Lightbulb, label: 'Explainable AI' },
  { icon: Sparkles, label: 'Recommendation Systems' },
  { icon: Rocket, label: 'AI Product Engineering' },
  { icon: Database, label: 'AI + Data Infrastructure' },
  { icon: Globe, label: 'AI-powered SaaS Products' },
];

const LibraryRoom = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleResumeDownload = () => {
    try {
      let url = RESUME_CONFIG.url;
      if (url.includes('drive.google.com')) {
        const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (fileId) url = `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      toast({ title: 'Error', description: 'Failed to open resume.', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={item} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400/80 mb-3">Knowledge Archive</p>
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-400">The Library</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Education, research interests, and resume</p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Education */}
          <motion.div variants={item}>
            <Card className="glass-hover">
              <CardHeader><CardTitle className="text-amber-400 text-2xl">Education</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { degree: 'MSc Computer Science', school: 'International University of Applied Sciences', location: 'Berlin, Germany', date: 'Sept 2023 – Present' },
                  { degree: 'Bachelor of Computer Application', school: 'Gujarat University', location: 'Ahmedabad, India', date: 'July 2019 – April 2022' },
                ].map((edu, i) => (
                  <div key={i} className="p-5 rounded-xl bg-muted/30 border border-amber-500/10 hover:border-amber-500/25 transition-all">
                    <h4 className="font-semibold text-foreground text-lg">{edu.degree}</h4>
                    <p className="text-muted-foreground">{edu.school}</p>
                    <p className="text-muted-foreground">{edu.location}</p>
                    <p className="text-sm text-amber-400 font-medium mt-1">{edu.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Research Interests */}
          <motion.div variants={item}>
            <h3 className="text-2xl font-bold text-foreground mb-6">AI Research & Engineering Interests</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {aiInterests.map((interest, i) => (
                <motion.div key={i} variants={item}
                  className="flex items-center gap-3 p-4 rounded-xl glass-hover group">
                  <interest.icon size={20} className="text-amber-400 group-hover:text-yellow-400 transition-colors flex-shrink-0" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">{interest.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resume Download */}
          <motion.div variants={item} className="text-center">
            <Button onClick={handleResumeDownload}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 text-background px-10 py-6 text-lg rounded-full hover:scale-105 transition-all glow-box">
              📄 Download Resume
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LibraryRoom;
