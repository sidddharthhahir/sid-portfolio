import { motion } from 'framer-motion';

interface StreetSectionProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Minimal section shell: quiet label, hairline rule, soft fade-up content. */
export const StreetSection = ({ id, label, children }: StreetSectionProps) => (
  <section id={id} className="relative py-16 px-6 scroll-mt-16">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex items-center gap-4 mb-8"
      >
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-mono">{label}</h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);
