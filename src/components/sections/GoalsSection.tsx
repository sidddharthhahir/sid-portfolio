import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { motion } from 'framer-motion';

export const GoalsSection = () => {
  const { goals } = PORTFOLIO;

  return (
    <StreetSection id="goals" emoji="🎯" buildingName="Vision" subtitle="Next 5 Years" side="right" accentColor="text-cyan-400" neonClass="neon-cyan">
      <div className="space-y-8 max-w-3xl">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/50 font-mono mb-1">{goals.subheadline}</p>
          <h3 className="text-2xl font-black text-foreground">{goals.headline}</h3>
        </div>
        <div className="relative">
          <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/15 to-transparent hidden sm:block" />
          <div className="space-y-10">
            {goals.story.map((chapter, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black/50 border border-cyan-400/20 items-center justify-center text-base z-10 relative hidden sm:flex">
                  {chapter.icon}
                </div>
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-5 border-t border-white/6"
        >
          <p className="text-sm text-muted-foreground/60 italic leading-relaxed">{goals.closing}</p>
        </motion.div>
      </div>
    </StreetSection>
  );
};
