import { motion } from 'framer-motion';
import { BuildingLabel } from './BuildingLabel';

interface StreetSectionProps {
  id: string;
  emoji: string;
  buildingName: string;
  subtitle: string;
  side: 'left' | 'right';
  accentColor: string;
  children: React.ReactNode;
}

export const StreetSection = ({ id, emoji, buildingName, subtitle, side, accentColor, children }: StreetSectionProps) => (
  <section id={id} className="relative py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <BuildingLabel emoji={emoji} name={buildingName} subtitle={subtitle} side={side} accentColor={accentColor} />
      <motion.div
        initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);
