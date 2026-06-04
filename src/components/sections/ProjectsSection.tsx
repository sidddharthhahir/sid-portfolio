import { useState } from 'react';
import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectsSection = () => {
  const { projects } = PORTFOLIO;
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <StreetSection id="projects" emoji="🏗️" buildingName="The Workshop" subtitle="Projects" side="right" accentColor="text-cyan-400" neonClass="neon-cyan">
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <Card
            key={i}
            className={`glass-hover group cursor-pointer transition-all duration-500 ${
              project.featured
                ? 'md:col-span-2 border-cyan-400/30 hover:border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.08)]'
                : 'hover:border-cyan-400/20'
            }`}
          >
            <CardHeader onClick={() => project.githubUrl && window.open(project.githubUrl, '_blank')}>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs">
                  {project.emoji} {project.subtitle}
                </Badge>
                <ExternalLink size={15} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardTitle className={`group-hover:text-cyan-400 transition-colors ${project.featured ? 'text-2xl' : 'text-lg'}`}>
                {project.title}
                {project.featured && <span className="ml-3 text-xs font-normal text-cyan-400/60 font-mono">★ thesis</span>}
              </CardTitle>
              <CardDescription className="text-sm">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech, j) => (
                  <Badge key={j} className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs">{tech}</Badge>
                ))}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1.5 mb-4">
                {project.features.map((f, j) => (
                  <li key={j} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{project.metrics}</span>
                <Button variant="ghost" size="sm"
                  onClick={e => { e.stopPropagation(); setExpanded(expanded === i ? null : i); }}
                  className="text-cyan-400 hover:text-blue-400 text-xs gap-1.5">
                  <FlaskConical size={13} />{expanded === i ? 'Hide' : 'Case Study'}
                </Button>
              </div>
              <AnimatePresence>
                {expanded === i && project.caseStudy && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 pt-3 border-t border-border">
                      {[
                        { label: '🔍 Problem', text: project.caseStudy.problem, bg: 'bg-red-500/5 border-red-500/15' },
                        { label: '⚡ Approach', text: project.caseStudy.approach, bg: 'bg-cyan-500/5 border-cyan-500/15' },
                        { label: '🎯 Results', text: project.caseStudy.results, bg: 'bg-emerald-500/5 border-emerald-500/15' },
                      ].map((s, j) => (
                        <motion.div key={j}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.08 }}
                          className={`p-4 rounded-xl ${s.bg} border`}
                        >
                          <h5 className="text-sm font-bold text-foreground mb-1">{s.label}</h5>
                          <p className="text-sm text-muted-foreground">{s.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </StreetSection>
  );
};
