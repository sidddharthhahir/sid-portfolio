import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const SNAP = [0.16, 1, 0.3, 1] as const;

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
          <CardHeader><CardTitle className="text-cyan-400 text-base">Education</CardTitle></CardHeader>
          <CardContent>
            {/* Same connected-timeline grammar as Experience's "Key work" and
                Goals' roadmap — a chronological chain, not a stack of cards,
                so a degree reads as one more span in the same system. */}
            <div className="relative pl-1">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/30 via-cyan-400/15 to-transparent" />
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: SNAP, delay: i * 0.08 }}
                    className="relative pl-6"
                  >
                    <span className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full bg-cyan-400 ring-4 ring-cyan-400/10" />
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold text-foreground text-sm">{edu.degree}</h4>
                      <span className="flex-shrink-0 flex items-center gap-1.5 text-[9px] font-mono text-emerald-400/70 uppercase tracking-wider mt-0.5">
                        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        verified
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{edu.school}</p>
                    <p className="text-muted-foreground text-xs">{edu.location}</p>
                    <p className="text-xs text-cyan-400 font-mono mt-1">{edu.date}</p>
                    {edu.note && <p className="text-xs text-muted-foreground mt-1 italic">{edu.note}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="pt-2">
          <Button onClick={handleDownload}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-background px-8 py-5 rounded-full hover:scale-105 transition-all text-sm font-semibold">
            📄 Download Resume
          </Button>
        </div>
      </div>
    </StreetSection>
  );
};
