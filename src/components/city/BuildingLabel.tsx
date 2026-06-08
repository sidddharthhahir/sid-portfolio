import { motion } from 'framer-motion';

interface BuildingLabelProps {
  emoji: string;
  name: string;
  subtitle: string;
  side: 'left' | 'right';
  accentColor: string;
  neonClass: string;
}

const SNAP = [0.16, 1, 0.3, 1] as const;

export const BuildingLabel = ({ emoji, name, subtitle, side, accentColor, neonClass }: BuildingLabelProps) => (
  <motion.div
    initial={{ opacity: 0, x: side === 'left' ? -50 : 50, y: -10 }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, ease: SNAP }}
    className={`flex items-center gap-3 mb-10 ${side === 'right' ? 'flex-row-reverse' : ''}`}
  >
    <motion.div
      initial={{ scale: 0.85 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: SNAP }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-black/40 backdrop-blur-sm border-current/15 ${accentColor} flex-shrink-0`}
    >
      <span className="text-sm">{emoji}</span>
      <span className={`text-[10px] uppercase tracking-[0.3em] font-mono opacity-70 ${neonClass}`}>{subtitle}</span>
    </motion.div>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: SNAP, delay: 0.1 }}
      style={{ transformOrigin: side === 'left' ? 'left' : 'right' }}
      className={`h-px flex-1 ${side === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-current/20 to-transparent opacity-30`}
    />
  </motion.div>
);
