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
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 items-end">
      {sections.map(({ id, emoji, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          title={label}
          className={`group flex items-center gap-2 transition-all duration-300 ${active === id ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
        >
          <span className="text-[10px] hidden group-hover:block bg-black/70 backdrop-blur px-2 py-1 rounded text-white whitespace-nowrap font-mono">
            {emoji} {label}
          </span>
          <div className={`rounded-full transition-all duration-300 ${
            active === id
              ? 'w-3 h-3 bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,1)]'
              : 'w-2 h-2 bg-white/30 hover:bg-white/50'
          }`} />
        </button>
      ))}
    </div>
  );
};
