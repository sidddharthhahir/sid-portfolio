import { useEffect, useRef, useState, useCallback } from 'react';
import { PORTFOLIO } from '@/config/portfolio';

interface Span {
  id: string;
  label: string;
  progress: number; // 0-1, how far scrolled through this section
  active: boolean;
}

/**
 * Section navigation styled as a trace waterfall (Jaeger/Honeycomb-style):
 * each section is a "span" whose bar fills with real scroll progress, not
 * a fabricated number — it's the honest visual metaphor for something you
 * actually built at Firmway, reused as the nav.
 */
export const TraceRail = () => {
  const sections = PORTFOLIO.sections;
  const [spans, setSpans] = useState<Span[]>(
    sections.map(s => ({ ...s, progress: 0, active: false }))
  );
  const rafRef = useRef<number>();

  const update = useCallback(() => {
    const vh = window.innerHeight;
    setSpans(
      sections.map(({ id, label }) => {
        const el = document.getElementById(id);
        if (!el) return { id, label, progress: 0, active: false };
        const rect = el.getBoundingClientRect();
        const total = rect.height + vh;
        const traveled = vh - rect.top;
        const progress = Math.min(1, Math.max(0, traveled / total));
        const active = rect.top < vh * 0.6 && rect.bottom > vh * 0.3;
        return { id, label, progress, active };
      })
    );
    rafRef.current = undefined;
  }, [sections]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== undefined) return;
      rafRef.current = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-2 w-32 rounded-xl border border-white/8 bg-[#070b14]/80 backdrop-blur-md px-3.5 py-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
    >
      <span className="text-[9px] font-mono text-muted-foreground/35 uppercase tracking-[0.25em] mb-1">
        trace
      </span>
      {spans.map(({ id, label, progress, active }) => (
        <button
          key={id}
          type="button"
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={`Jump to ${label}`}
          aria-current={active ? 'true' : undefined}
          className="group text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/60 rounded-sm py-0.5"
        >
          <div
            className={`text-[9px] font-mono mb-1 truncate transition-colors duration-200 ${
              active ? 'text-cyan-400' : 'text-muted-foreground/45 group-hover:text-muted-foreground/80'
            }`}
          >
            {label}
          </div>
          <div className="h-[2px] w-full rounded-full bg-white/8 overflow-hidden">
            <div
              className={`h-full rounded-full ${active ? 'bg-cyan-400' : 'bg-white/20'}`}
              style={{ width: `${Math.round(progress * 100)}%`, transition: 'width 120ms linear, background-color 200ms' }}
            />
          </div>
        </button>
      ))}
    </nav>
  );
};
