import { motion } from 'framer-motion';
import { BuildingLabel } from './BuildingLabel';

interface StreetSectionProps {
  id: string;
  emoji: string;
  buildingName: string;
  subtitle: string;
  side: 'left' | 'right';
  accentColor: string;
  neonClass: string;
  children: React.ReactNode;
}

const SNAP = [0.16, 1, 0.3, 1];

export const StreetSection = ({ id, emoji, buildingName, subtitle, side, accentColor, neonClass, children }: StreetSectionProps) => (
  <section id={id} className="relative py-14 px-6">
    <div className="max-w-5xl mx-auto">
      <BuildingLabel emoji={emoji} name={buildingName} subtitle={subtitle} side={side} accentColor={accentColor} neonClass={neonClass} />
      <motion.div
        initial={{ opacity: 0, x: side === 'left' ? -90 : 90, y: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0, ease: SNAP, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);
