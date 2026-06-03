import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ExperienceSection = () => {
  const { experience } = PORTFOLIO;
  return (
    <StreetSection id="experience" emoji="💼" buildingName="The Office" subtitle="Work Experience" side="right" accentColor="text-amber-400">
      <div className="space-y-6">
        {experience.map((job, i) => (
          <Card key={i} className="glass-hover border-amber-500/10 hover:border-amber-500/25 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                  <p className="text-amber-400 font-semibold">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                </div>
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/25 font-mono text-xs">
                  {job.date}
                </Badge>
              </div>
              <ul className="space-y-3">
                {job.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </StreetSection>
  );
};
