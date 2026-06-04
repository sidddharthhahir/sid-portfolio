import { motion } from 'framer-motion';
import { PORTFOLIO } from '@/config/portfolio';

export const NowSection = () => {
  const { now } = PORTFOLIO;
  return (
    <section id="now" className="py-6 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 px-5 py-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em]">Now</span>
          </div>
          <span className="h-3 w-px bg-white/15 flex-shrink-0" />
          <span className="text-sm font-semibold text-foreground">{now.status}</span>
          <span className="h-3 w-px bg-white/15 flex-shrink-0 hidden sm:block" />
          <span className="text-sm text-muted-foreground">{now.focus}</span>
        </motion.div>
      </div>
    </section>
  );
};
