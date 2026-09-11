import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const SNAP = [0.16, 1, 0.3, 1] as const;

export const ExperienceSection = () => {
  const { experience } = PORTFOLIO;

  return (
    <StreetSection id="experience" label="Experience">
      <div className="space-y-6">
        {experience.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: SNAP }}
          >
            <Card className="glass-hover border-cyan-400/10 hover:border-cyan-400/25 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{job.role}</h3>
                    <p className="text-cyan-400 font-semibold">{job.company}</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                  <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/25 font-mono text-xs">
                    {job.date}
                  </Badge>
                </div>

                {/* Span bar: the same trace-waterfall grammar as the right-rail
                    nav, applied to a real, known span — this job's actual
                    duration — instead of a generic progress bar. */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground/40 mb-1">
                    <span>span: {job.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                      closed
                    </span>
                  </div>
                  <div className="relative h-[3px] w-full rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: SNAP, delay: 0.15 }}
                      style={{ transformOrigin: 'left' }}
                      className="h-full w-full rounded-full bg-gradient-to-r from-cyan-500/70 to-cyan-400/70"
                    />
                  </div>
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

                {/* Key work, as a trace waterfall of child spans — same
                    connected-node grammar as Goals' timeline, so the two
                    read as the same system rather than two different
                    devices. */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-mono mb-4">Key work</p>
                  <div className="relative pl-1">
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/30 via-cyan-400/10 to-transparent" />
                    <div className="space-y-3">
                      {job.highlights.map((h, j) => (
                        <motion.div key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: SNAP, delay: j * 0.06 }}
                          className="relative flex items-start gap-3 pl-5"
                        >
                          <span className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full bg-cyan-400 ring-4 ring-cyan-400/10" />
                          <span className="text-sm text-muted-foreground/90">{h}</span>
                        </motion.div>
                      ))}
                    </div>
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
