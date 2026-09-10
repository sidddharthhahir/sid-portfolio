import { useEffect, useState } from 'react';

const fmt = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/**
 * A slim top bar framing the page as a running system rather than a
 * document. The uptime is real — measured from page load via
 * performance.now(), not a fabricated number.
 */
export const StatusBar = () => {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => setUptime((performance.now() - start) / 1000), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-40 hidden sm:flex items-center justify-between px-5 py-1.5 text-[10px] font-mono text-muted-foreground/40 border-b border-white/5 bg-[#070b14]/70 backdrop-blur-sm"
    >
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        siddharth-ahir · env:production
      </span>
      <span>session {fmt(uptime)}</span>
    </div>
  );
};
