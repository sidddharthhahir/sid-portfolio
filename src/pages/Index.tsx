import { CityBackground } from '@/components/city/CityBackground';
import { CityProgressBar } from '@/components/city/CityProgressBar';
import { CommandPalette } from '@/components/city/CommandPalette';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { NowSection } from '@/components/sections/NowSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => (
  <div className="relative min-h-screen text-foreground overflow-x-hidden">
    <CityBackground />
    <CommandPalette />
    <CityProgressBar />

    <div className="relative z-10">
      <HeroSection />
      <AboutSection />
      <NowSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />

      <footer className="relative py-12 px-6 text-center border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-muted-foreground text-sm font-mono">
            Built by Siddharth Ahir · {new Date().getFullYear()}
          </p>
          <p className="text-muted-foreground/30 text-xs mt-1 font-mono">
            City of Code · Always under construction
          </p>
          <p className="text-muted-foreground/20 text-[10px] mt-3 font-mono">
            Press <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]">⌘K</kbd> to navigate
          </p>
        </div>
      </footer>
    </div>
  </div>
);

export default Index;
