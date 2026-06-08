import { useEffect, useState } from 'react';
import { PORTFOLIO } from '@/config/portfolio';

export const CityProgressBar = () => {
  const [active, setActive] = useState('hero');
  const sections = PORTFOLIO.buildings;

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
      {sections.map(({ id, emoji, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={`Jump to ${label}`}
            aria-current={isActive ? 'true' : undefined}
            className={`group flex items-center gap-2 transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
          >
            <span className="text-[10px] hidden group-hover:block group-focus-visible:block bg-black/80 backdrop-blur px-2 py-1 rounded text-white whitespace-nowrap font-mono">
              {emoji} {label}
            </span>
            <div aria-hidden="true" className={`rounded-full transition-all duration-300 ${
              isActive
                ? 'w-3 h-3 bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,1)]'
                : 'w-2 h-2 bg-white/40 group-hover:bg-white/70'
            }`} />
          </button>
        );
      })}
    </nav>
  );
};
