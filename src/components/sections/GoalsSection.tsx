import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { motion } from 'framer-motion';

const SNAP = [0.16, 1, 0.3, 1] as const;

export const GoalsSection = () => {
  const { goals } = PORTFOLIO;

  return (
    <StreetSection id="goals" emoji="🎯" buildingName="Vision" subtitle="Next 5 Years" side="right" accentColor="text-cyan-400" neonClass="neon-cyan">
      <div className="space-y-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: SNAP }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/50 font-mono mb-1">{goals.subheadline}</p>
          <h3 className="text-2xl font-black text-foreground">{goals.headline}</h3>
        </motion.div>
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: SNAP, delay: 0.3 }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/15 to-transparent hidden sm:block"
          />
          <div className="space-y-10">
            {goals.story.map((chapter, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.65, ease: SNAP, delay: i * 0.12 }}
                className="flex gap-5"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: SNAP, delay: i * 0.12 + 0.1 }}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-black/50 border border-cyan-400/20 items-center justify-center text-base z-10 relative hidden sm:flex"
                >
                  {chapter.icon}
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-wider">{chapter.year}</span>
                    <span className="h-px flex-1 bg-cyan-400/8" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-2">{chapter.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{chapter.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: SNAP, delay: 0.4 }}
          className="pt-5 border-t border-white/6"
        >
          <p className="text-sm text-muted-foreground/60 italic leading-relaxed">{goals.closing}</p>
        </motion.div>
      </div>
    </StreetSection>
  );
};
