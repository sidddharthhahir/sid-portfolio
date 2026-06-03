import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent } from '@/components/ui/card';

export const AboutSection = () => {
  const { personal, aboutBullets, social } = PORTFOLIO;
  return (
    <StreetSection id="about" emoji="🏢" buildingName="HQ Tower" subtitle="About Me" side="left" accentColor="text-blue-400">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <h3 className="text-xl font-bold text-blue-400">AI Engineer Profile</h3>
          <p className="text-muted-foreground leading-relaxed">{personal.bio}</p>
          <ul className="space-y-2">
            {aboutBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
          <p className="text-blue-400/80 font-medium italic text-sm">{personal.tagline}</p>
        </div>
        <Card className="glass-hover glow-box h-fit">
          <CardContent className="p-6 space-y-3">
            <h4 className="font-bold text-blue-400">Quick Info</h4>
            {[
              { label: '📍', value: personal.location },
              { label: '📧', value: personal.email },
              { label: '🐙', value: social.githubHandle },
              { label: '💼', value: social.linkedinHandle },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                <span className="text-sm w-6 flex-shrink-0">{item.label}</span>
                <span className="text-sm text-muted-foreground truncate">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </StreetSection>
  );
};
