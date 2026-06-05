import { useCallback } from 'react';
import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { motion } from 'framer-motion';

const COLOR_MAP: Record<string, { dot: string; tag: string; border: string; label: string }> = {
  red:     { dot: 'bg-red-400',     tag: 'bg-red-500/8 hover:bg-red-500/18',       border: 'border-red-500/20',     label: 'text-red-400'     },
  purple:  { dot: 'bg-purple-400',  tag: 'bg-purple-500/8 hover:bg-purple-500/18',  border: 'border-purple-500/20',  label: 'text-purple-400'  },
  amber:   { dot: 'bg-amber-400',   tag: 'bg-amber-500/8 hover:bg-amber-500/18',    border: 'border-amber-500/20',   label: 'text-amber-400'   },
  emerald: { dot: 'bg-emerald-400', tag: 'bg-emerald-500/8 hover:bg-emerald-500/18',border: 'border-emerald-500/20', label: 'text-emerald-400' },
  blue:    { dot: 'bg-blue-400',    tag: 'bg-blue-500/8 hover:bg-blue-500/18',      border: 'border-blue-500/20',    label: 'text-blue-400'    },
};

export const SkillsSection = () => {
  const { skills } = PORTFOLIO;

  const handleSkillClick = useCallback((linkedProject: string | null) => {
    if (!linkedProject) return;
    const el = document.getElementById('projects');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.querySelectorAll('[data-project-title]').forEach(card => {
        if (card.getAttribute('data-project-title') === linkedProject) {
          card.classList.add('ring-2', 'ring-cyan-400/60', 'ring-offset-2', 'ring-offset-transparent', 'transition-all');
          setTimeout(() => {
            card.classList.remove('ring-2', 'ring-cyan-400/60', 'ring-offset-2', 'ring-offset-transparent');
          }, 2000);
        }
      });
    }, 900);
  }, []);

  return (
    <StreetSection id="skills" emoji="🔬" buildingName="The Lab" subtitle="Skills" side="left" accentColor="text-red-400" neonClass="neon-red">
      <div className="space-y-8">
        {skills.map((category, i) => {
          const c = COLOR_MAP[category.color] ?? COLOR_MAP.blue;
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${c.label}`}>{category.category}</span>
                <div className={`flex-1 h-px border-t ${c.border} opacity-20`} />
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, j) => (
                  <button key={j}
                    onClick={() => handleSkillClick(skill.linkedProject)}
                    title={skill.linkedProject ? `Used in: ${skill.linkedProject}` : skill.description}
                    className={`group relative px-4 py-2 rounded-full border text-left transition-all duration-200 ${
                      skill.linkedProject
                        ? `${c.tag} ${c.border} cursor-pointer hover:scale-105 active:scale-95`
                        : 'bg-white/3 border-white/8 cursor-default opacity-60'
                    }`}
                  >
                    <span className="text-sm font-medium text-foreground/85">{skill.name}</span>
                    {skill.linkedProject && (
                      <span className={`ml-1 text-[10px] opacity-0 group-hover:opacity-50 transition-opacity ${c.label}`}>→</span>
                    )}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-black/90 border border-white/10 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      {skill.linkedProject ? `→ ${skill.linkedProject}` : skill.description}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
        <p className="text-[11px] text-muted-foreground/30 font-mono pt-2">
          Colored tags link to projects that used them — click to jump ↓
        </p>
      </div>
    </StreetSection>
  );
};
