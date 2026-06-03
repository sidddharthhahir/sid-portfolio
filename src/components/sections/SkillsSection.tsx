import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent } from '@/components/ui/card';

export const SkillsSection = () => {
  const { skills } = PORTFOLIO;
  return (
    <StreetSection id="skills" emoji="🔬" buildingName="The Lab" subtitle="Skills & Training" side="left" accentColor="text-red-400">
      <div className="space-y-8">
        {skills.map((category, i) => (
          <div key={i}>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 opacity-70">{category.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {category.items.map((skill, j) => (
                <Card key={j} className={`glass-hover border ${category.borderColor} bg-gradient-to-br ${category.gradient}`}>
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold text-foreground">{skill.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </StreetSection>
  );
};
