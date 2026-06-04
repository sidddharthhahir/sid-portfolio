import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { motion } from 'framer-motion';

const COLOR_MAP: Record<string, { dot: string; tag: string; border: string; label: string }> = {
  red:    { dot: 'bg-red-400',    tag: 'bg-red-500/10 hover:bg-red-500/20',      border: 'border-red-500/20',    label: 'text-red-400' },
  purple: { dot: 'bg-purple-400', tag: 'bg-purple-500/10 hover:bg-purple-500/20', border: 'border-purple-500/20', label: 'text-purple-400' },
  amber:  { dot: 'bg-amber-400',  tag: 'bg-amber-500/10 hover:bg-amber-500/20',   border: 'border-amber-500/20',  label: 'text-amber-400' },
  emerald:{ dot: 'bg-emerald-400',tag: 'bg-emerald-500/10 hover:bg-emerald-500/20',border:'border-emerald-500/20', label: 'text-emerald-400' },
  blue:   { dot: 'bg-blue-400',   tag: 'bg-blue-500/10 hover:bg-blue-500/20',     border: 'border-blue-500/20',   label: 'text-blue-400' },
};

export const SkillsSection = () => {
  const { skills } = PORTFOLIO;

  return (
    <StreetSection id="skills" emoji="🔬" buildingName="The Lab" subtitle="Skills" side="left" accentColor="text-red-400" neonClass="neon-red">
      <div className="space-y-10">
        {skills.map((category, i) => {
          const colors = COLOR_MAP[category.color] ?? COLOR_MAP.blue;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${colors.dot}`} />
                <span className={`text-xs font-bold uppercase tracking-[0.2em] ${colors.label}`}>
                  {category.category}
                </span>
                <div className={`flex-1 h-px ${colors.border} border-t opacity-30`} />
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, j) => (
                  <div
                    key={j}
                    title={skill.description}
                    className={`group relative px-4 py-2 rounded-full border ${colors.tag} ${colors.border} cursor-default transition-all duration-200`}
                  >
                    <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {skill.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </StreetSection>
  );
};
