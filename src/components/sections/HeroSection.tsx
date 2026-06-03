import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PORTFOLIO } from '@/config/portfolio';
import TypewriterText from '@/components/TypewriterText';
import CurrentlyLearning from '@/components/CurrentlyLearning';

export const HeroSection = () => {
  const { personal, typewriterPhrases, heroBadges } = PORTFOLIO;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-blue-400/50">
          Welcome to the City of
        </div>

        <div className="relative w-36 h-36 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-60 blur-lg animate-pulse" />
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-80 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-[5px] rounded-full bg-[#0a0f1e]" />
          <img
            src={personal.photo}
            alt={personal.name}
            className="absolute inset-[7px] rounded-full object-cover w-[calc(100%-14px)] h-[calc(100%-14px)] filter brightness-110"
            style={{ objectPosition: 'center 15%' }}
          />
        </div>

        <span className="text-base text-muted-foreground block mb-1">Hello, I'm</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
          <span className="glow-text">{personal.name}</span>
        </h1>

        <h2 className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-4 min-h-[28px]">
          <TypewriterText phrases={typewriterPhrases} />
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {heroBadges.map(badge => (
            <Badge key={badge} className="glass px-4 py-1.5 text-sm text-blue-400 border-blue-400/20">{badge}</Badge>
          ))}
        </div>

        <div className="flex justify-center mb-10">
          <CurrentlyLearning />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all"
          >
            Get in Touch
          </Button>
          <Button
            variant="outline"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass border-blue-400/20 hover:border-blue-400/40 px-8 py-3 rounded-full"
          >
            View My Work
          </Button>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="mt-16 text-muted-foreground/30 text-xs font-mono"
        >
          ↓ scroll to walk the city
        </motion.div>
      </motion.div>
    </section>
  );
};
