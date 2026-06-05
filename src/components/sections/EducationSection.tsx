import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EducationSection = () => {
  const { education, languages, resume } = PORTFOLIO;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = resume.url;
    a.download = resume.fileName;
    a.click();
  };

  return (
    <StreetSection id="education" emoji="📚" buildingName="The Archive" subtitle="Education" side="left" accentColor="text-amber-400" neonClass="neon-amber">
      <div className="space-y-8">
        <Card className="glass-hover">
          <CardHeader><CardTitle className="text-amber-400 text-base">Education</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-amber-500/10 hover:border-amber-500/20 transition-all">
                <h4 className="font-semibold text-foreground text-sm">{edu.degree}</h4>
                <p className="text-muted-foreground text-sm">{edu.school}</p>
                <p className="text-muted-foreground text-xs">{edu.location}</p>
                <p className="text-xs text-amber-400 font-medium mt-1">{edu.date}</p>
                {edu.note && <p className="text-xs text-muted-foreground mt-1 italic">{edu.note}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex gap-3">
          {languages.map((lang, i) => (
            <div key={i} className="px-4 py-2 rounded-lg glass-hover border border-border text-sm">
              <span className="font-medium text-foreground">{lang.language}</span>
              <span className="text-muted-foreground ml-2 text-xs">{lang.level}</span>
            </div>
          ))}
        </div>
        <div className="pt-2">
          <Button onClick={handleDownload}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 text-background px-8 py-5 rounded-full hover:scale-105 transition-all text-sm font-semibold">
            📄 Download Resume
          </Button>
          <p className="text-xs text-muted-foreground/40 mt-3 font-mono">
            The resume is the filtered version — this portfolio is the full story.
          </p>
        </div>
      </div>
    </StreetSection>
  );
};
