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
    initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className={`flex items-center gap-4 mb-12 ${side === 'right' ? 'flex-row-reverse' : ''}`}
  >
    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border bg-black/60 backdrop-blur-md border-white/10 ${accentColor} flex-shrink-0 shadow-lg`}>
      <span className="text-xl">{emoji}</span>
      <div className={side === 'right' ? 'text-right' : ''}>
        <div className="text-[9px] uppercase tracking-[0.4em] opacity-50 font-mono">{subtitle}</div>
        <div className={`text-lg font-black leading-tight ${neonClass}`}>{name}</div>
      </div>
    </div>
    <div className={`h-px flex-1 ${side === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-current/30 to-transparent opacity-40 ${accentColor}`} />
  </motion.div>
);
