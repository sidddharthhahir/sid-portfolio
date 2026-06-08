import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const SNAP = [0.16, 1, 0.3, 1] as const;

export const ExperienceSection = () => {
  const { experience } = PORTFOLIO;

  return (
    <StreetSection id="experience" emoji="💼" buildingName="The Office" subtitle="Experience" side="right" accentColor="text-amber-400" neonClass="neon-amber">
      <div className="space-y-6">
        {experience.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: SNAP }}
          >
            <Card className="glass-hover border-amber-500/10 hover:border-amber-500/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{job.role}</h3>
                    <p className="text-amber-400 font-semibold">{job.company}</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/25 font-mono text-xs">
                    {job.date}
                  </Badge>
                </div>
                <div className="space-y-4 mb-6">
                  {job.story.map((paragraph, j) => (
                    <motion.p key={j}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: SNAP, delay: j * 0.1 }}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-mono mb-3">Key work</p>
                  <div className="flex flex-wrap gap-2">
                    {job.highlights.map((h, j) => (
                      <motion.span key={j}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, ease: SNAP, delay: j * 0.05 }}
                        className="text-xs px-3 py-1 rounded-full bg-amber-500/8 border border-amber-500/15 text-amber-400/80"
                      >
                        {h}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </StreetSection>
  );
};
