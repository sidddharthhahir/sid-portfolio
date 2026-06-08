import { motion } from 'framer-motion';
import { PORTFOLIO } from '@/config/portfolio';
import TypewriterText from '@/components/TypewriterText';

const SNAP = [0.16, 1, 0.3, 1] as const;

const DELAYS = {
  city: 0,
  photo: 0.15,
  hello: 0.35,
  name: 0.5,
  typewriter: 0.7,
  scroll: 1.1,
};

export const HeroSection = () => {
  const { personal, typewriterPhrases } = PORTFOLIO;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-6">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: DELAYS.city, ease: SNAP }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-blue-400/50"
        >
          Welcome to the City of
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: DELAYS.photo, ease: SNAP }}
          className="relative w-36 h-36 mx-auto mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-60 blur-lg animate-pulse" />
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-70 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-[5px] rounded-full bg-[#0a0f1e]" />
          <img
            src={personal.photo}
            alt={personal.name}
            className="absolute inset-[7px] rounded-full object-cover w-[calc(100%-14px)] h-[calc(100%-14px)] filter brightness-110"
            style={{ objectPosition: 'center 15%' }}
          />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: DELAYS.hello, ease: SNAP }}
          className="text-base text-muted-foreground block mb-1"
        >
          Hello, I'm
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: DELAYS.name, ease: SNAP }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-5"
        >
          <span className="glow-text">{personal.name}</span>
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: DELAYS.typewriter }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-0 min-h-[28px]"
        >
          <TypewriterText phrases={typewriterPhrases} />
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: DELAYS.scroll }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="mt-20 text-muted-foreground/30 text-xs font-mono"
          >
            ↓ scroll
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
