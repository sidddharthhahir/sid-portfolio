import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EducationSection = () => {
  const { education, aiInterests, resume, languages } = PORTFOLIO;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = resume.url;
    a.download = resume.fileName;
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <StreetSection id="education" emoji="📚" buildingName="The Archive" subtitle="Education & Resume" side="left" accentColor="text-amber-400" neonClass="neon-amber">
      <div className="space-y-8">
        <Card className="glass-hover">
          <CardHeader><CardTitle className="text-amber-400">Education</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-amber-500/10 hover:border-amber-500/25 transition-all">
                <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                <p className="text-muted-foreground text-sm">{edu.school}</p>
                <p className="text-muted-foreground text-sm">{edu.location}</p>
                <p className="text-xs text-amber-400 font-medium mt-1">{edu.date}</p>
                {edu.note && <p className="text-xs text-muted-foreground mt-1 italic">{edu.note}</p>}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-3 flex-wrap">
          {languages.map((lang, i) => (
            <div key={i} className="px-4 py-2 rounded-lg glass-hover border border-border text-sm">
              <span className="font-medium text-foreground">{lang.language}</span>
              <span className="text-muted-foreground ml-2 text-xs">{lang.level}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-base font-bold text-foreground mb-4">AI Research & Engineering Interests</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {aiInterests.map((interest, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl glass-hover group">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{interest}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <Button onClick={handleDownload}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 text-background px-10 py-6 text-lg rounded-full hover:scale-105 transition-all">
            📄 Download Resume
          </Button>
        </div>
      </div>
    </StreetSection>
  );
};
