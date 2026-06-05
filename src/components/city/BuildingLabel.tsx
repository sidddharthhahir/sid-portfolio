import { motion } from 'framer-motion';

interface BuildingLabelProps {
  emoji: string;
  name: string;
  subtitle: string;
  side: 'left' | 'right';
  accentColor: string;
  neonClass: string;
}

export const BuildingLabel = ({ emoji, name, subtitle, side, accentColor, neonClass }: BuildingLabelProps) => (
  <motion.div
    initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={`flex items-center gap-3 mb-10 ${side === 'right' ? 'flex-row-reverse' : ''}`}
  >
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-black/40 backdrop-blur-sm border-current/15 ${accentColor} flex-shrink-0`}>
      <span className="text-sm">{emoji}</span>
      <span className={`text-[10px] uppercase tracking-[0.3em] font-mono opacity-70 ${neonClass}`}>{subtitle}</span>
    </div>
    <div className={`h-px flex-1 ${side === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-current/20 to-transparent opacity-30`} />
  </motion.div>
);
