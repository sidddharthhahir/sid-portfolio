import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ExperienceSection = () => {
  const { experience } = PORTFOLIO;

  return (
    <StreetSection id="experience" emoji="💼" buildingName="The Office" subtitle="Experience" side="right" accentColor="text-amber-400" neonClass="neon-amber">
      <div className="space-y-6">
        {experience.map((job, i) => (
          <Card key={i} className="glass-hover border-amber-500/10 hover:border-amber-500/20 transition-all">
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
                  <p key={j} className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
                ))}
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-mono mb-3">Key work</p>
                <div className="flex flex-wrap gap-2">
                  {job.highlights.map((h, j) => (
                    <span key={j} className="text-xs px-3 py-1 rounded-full bg-amber-500/8 border border-amber-500/15 text-amber-400/80">{h}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </StreetSection>
  );
};
