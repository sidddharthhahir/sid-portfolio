import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent } from '@/components/ui/card';

export const AboutSection = () => {
  const { personal, howIWork, social } = PORTFOLIO;

  const quickLinks = [
    { label: '📍', value: personal.location, href: null as string | null },
    { label: '📧', value: personal.email, href: `mailto:${personal.email}` },
    { label: '🐙', value: social.githubHandle, href: social.github },
    { label: '💼', value: social.linkedinHandle, href: social.linkedin },
  ];

  return (
    <StreetSection id="about" label="About">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {personal.bio.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed text-sm">{paragraph}</p>
          ))}
          <div className="pt-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 font-mono mb-3">How I work</p>
            <ul className="space-y-2">
              {howIWork.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-blue-400/60 rounded-full mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        <Card className="glass-hover glow-box h-fit overflow-hidden p-0">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-3 text-[10px] font-mono text-muted-foreground/50">~/quick-info</span>
          </div>
          <CardContent className="p-6 space-y-3">
            {quickLinks.map((item, i) => (
              item.href ? (
                <a key={i} href={item.href}
                  target={item.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border hover:border-blue-400/30 hover:bg-blue-500/5 transition-all group"
                >
                  <span className="w-6 flex-shrink-0 text-sm">{item.label}</span>
                  <span className="text-sm text-muted-foreground group-hover:text-blue-400 transition-colors truncate">{item.value}</span>
                  <span className="ml-auto text-muted-foreground/30 group-hover:text-blue-400/50 text-xs">↗</span>
                </a>
              ) : (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                  <span className="w-6 flex-shrink-0 text-sm">{item.label}</span>
                  <span className="text-sm text-muted-foreground truncate">{item.value}</span>
                </div>
              )
            ))}
          </CardContent>
        </Card>
      </div>
    </StreetSection>
  );
};
