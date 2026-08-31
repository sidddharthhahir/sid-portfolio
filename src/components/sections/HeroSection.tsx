import { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO } from '@/config/portfolio';
import TypewriterText from '@/components/TypewriterText';

const EASE = [0.16, 1, 0.3, 1] as const;

export const HeroSection = () => {
  const { personal, typewriterPhrases, social } = PORTFOLIO;
  const [imgFailed, setImgFailed] = useState(false);

  const initials = personal.name.split(' ').map(n => n[0]).join('');

  return (
    <section id="hero" className="relative min-h-[88vh] flex items-center justify-center py-24 px-6">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative w-28 h-28 mx-auto mb-8 rounded-full border border-border bg-muted overflow-hidden"
        >
          {imgFailed ? (
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-muted-foreground">
              {initials}
            </span>
          ) : (
            <img
              src={personal.photo}
              alt={`Portrait of ${personal.name}`}
              width={112}
              height={112}
              loading="eager"
              decoding="async"
              onError={() => setImgFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base md:text-lg text-muted-foreground min-h-[28px]"
        >
          <TypewriterText phrases={typewriterPhrases} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-3 text-sm text-muted-foreground/70"
        >
          {personal.title} · {personal.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm"
        >
          <a
            href={`mailto:${personal.email}`}
            className="px-4 py-2 rounded-full border border-blue-400/30 text-blue-400 hover:bg-blue-500/10 transition-colors"
          >
            Email
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            GitHub
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
          className="mt-16 text-muted-foreground/30 text-xs font-mono"
        >
          ↓ scroll
        </motion.div>
      </div>
    </section>
  );
};
