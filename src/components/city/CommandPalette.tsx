import { useState, useEffect, useRef } from 'react';
import { PORTFOLIO } from '@/config/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const sections = PORTFOLIO.buildings;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
        setQuery('');
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const filtered = sections.filter(s =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32 px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigate the city"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-md bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <span aria-hidden="true" className="text-muted-foreground text-sm">🏙️</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Navigate the city..."
                aria-label="Search sections"
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground font-mono"
              />
              <kbd className="text-[10px] text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded border border-white/10">ESC</kbd>
            </div>
            <div className="py-2 max-h-64 overflow-y-auto" role="listbox">
              {filtered.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-6">No buildings found</p>
              ) : filtered.map(({ id, emoji, label }) => (
                <button
                  key={id}
                  type="button"
                  role="option"
                  aria-selected="false"
                  onClick={() => navigate(id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none transition-colors text-left group"
                >
                  <span aria-hidden="true">{emoji}</span>
                  <span className="text-sm text-foreground group-hover:text-blue-400 transition-colors">{label}</span>
                </button>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-white/10 text-[10px] text-muted-foreground font-mono">
              ↑↓ navigate · Enter select · Esc close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
