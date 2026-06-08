import { useScroll, useSpring, motion } from 'framer-motion';
import { CityBackground } from '@/components/city/CityBackground';
import { CityProgressBar } from '@/components/city/CityProgressBar';
import { CommandPalette } from '@/components/city/CommandPalette';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { GoalsSection } from '@/components/sections/GoalsSection';
import { EducationSection } from '@/components/sections/EducationSection';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 z-[100]"
      />
      <CityBackground />
      <CommandPalette />
      <CityProgressBar />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <GoalsSection />
        <EducationSection />
        <footer className="relative py-14 px-6 text-center border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <p className="text-muted-foreground text-sm font-mono">
              Built by Siddharth Ahir · {new Date().getFullYear()}
            </p>
            <p className="text-muted-foreground/20 text-[10px] mt-2 font-mono">
              Press <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]">⌘K</kbd> to navigate
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
