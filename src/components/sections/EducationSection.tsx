import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EducationSection = () => {
  const { education, resume } = PORTFOLIO;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = resume.url;
    a.download = resume.fileName;
    a.click();
  };

  return (
    <StreetSection id="education" label="Education">
      <div className="space-y-8">
        <Card className="glass-hover">
          <CardHeader><CardTitle className="text-amber-400 text-base">Education</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-amber-500/10 hover:border-amber-500/20 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-semibold text-foreground text-sm">{edu.degree}</h4>
                  <span className="flex-shrink-0 flex items-center gap-1.5 text-[9px] font-mono text-emerald-400/70 uppercase tracking-wider mt-0.5">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    verified
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{edu.school}</p>
                <p className="text-muted-foreground text-xs">{edu.location}</p>
                <p className="text-xs text-amber-400 font-medium mt-1">{edu.date}</p>
                {edu.note && <p className="text-xs text-muted-foreground mt-1 italic">{edu.note}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="pt-2">
          <Button onClick={handleDownload}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 text-background px-8 py-5 rounded-full hover:scale-105 transition-all text-sm font-semibold">
            📄 Download Resume
          </Button>
        </div>
      </div>
    </StreetSection>
  );
};
