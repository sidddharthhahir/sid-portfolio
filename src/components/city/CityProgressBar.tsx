import { useEffect, useState } from 'react';
import { PORTFOLIO } from '@/config/portfolio';

export const CityProgressBar = () => {
  const [active, setActive] = useState('hero');
  const sections = PORTFOLIO.sections;

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [sections]);

  return (
    <nav aria-label="Section navigation" className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 items-end">
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={`Jump to ${label}`}
            aria-current={isActive ? 'true' : undefined}
            className={`group flex items-center gap-2 rounded-full transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${isActive ? 'opacity-100' : 'opacity-35 hover:opacity-75'}`}
          >
            <span className="text-[10px] hidden group-hover:block group-focus-visible:block bg-black/80 backdrop-blur px-2 py-1 rounded text-foreground whitespace-nowrap font-mono">
              {label}
            </span>
            <div aria-hidden="true" className={`rounded-full transition-all duration-300 ${isActive ? 'w-2.5 h-2.5 bg-blue-400' : 'w-1.5 h-1.5 bg-muted-foreground'}`} />
          </button>
        );
      })}
    </nav>
  );
};
