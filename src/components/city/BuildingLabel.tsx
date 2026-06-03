import { motion } from 'framer-motion';

interface BuildingLabelProps {
  emoji: string;
  name: string;
  subtitle: string;
  side: 'left' | 'right';
  accentColor: string;
}

export const BuildingLabel = ({ emoji, name, subtitle, side, accentColor }: BuildingLabelProps) => (
  <motion.div
    initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className={`flex items-center gap-4 mb-10 ${side === 'right' ? 'flex-row-reverse' : ''}`}
  >
    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border bg-black/50 backdrop-blur-sm border-white/10 ${accentColor} flex-shrink-0`}>
      <span className="text-2xl">{emoji}</span>
      <div className={side === 'right' ? 'text-right' : ''}>
        <div className="text-[10px] uppercase tracking-[0.35em] opacity-50 font-mono">{subtitle}</div>
        <div className="text-lg font-black leading-tight">{name}</div>
      </div>
    </div>
    <div className={`h-px flex-1 ${side === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-current/25 to-transparent opacity-50 ${accentColor}`} />
  </motion.div>
);
