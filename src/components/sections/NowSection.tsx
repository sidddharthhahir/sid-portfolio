import { motion } from 'framer-motion';
import { PORTFOLIO } from '@/config/portfolio';

export const NowSection = () => {
  const { now } = PORTFOLIO;
  return (
    <section id="now" className="py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-4 p-5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${now.available ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Now</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1">
            <span className="text-sm font-semibold text-foreground">{now.status}</span>
            <span className="text-sm text-muted-foreground hidden sm:block">·</span>
            <span className="text-sm text-muted-foreground">{now.focus}</span>
          </div>
          {now.available && (
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-medium flex-shrink-0">
              {now.availableText}
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
};
