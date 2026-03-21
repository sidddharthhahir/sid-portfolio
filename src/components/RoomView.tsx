import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Dumbbell, Waves, BookOpen, Clapperboard, TreePine, Gamepad2 } from 'lucide-react';

interface RoomViewProps {
  roomId: string;
  onBack: () => void;
  children: React.ReactNode;
}

const roomMeta: Record<string, { label: string; icon: any; accent: string; accent2: string; eyebrow: string }> = {
  lobby: { label: 'Lobby', icon: Home, accent: 'var(--villa-lobby)', accent2: 'var(--villa-lobby-2)', eyebrow: 'Grand Entry' },
  gym: { label: 'Gym', icon: Dumbbell, accent: 'var(--villa-gym)', accent2: 'var(--villa-gym-2)', eyebrow: 'Power Zone' },
  pool: { label: 'Pool', icon: Waves, accent: 'var(--villa-pool)', accent2: 'var(--villa-pool-2)', eyebrow: 'Deep Dive' },
  library: { label: 'Library', icon: BookOpen, accent: 'var(--villa-library)', accent2: 'var(--villa-library-2)', eyebrow: 'Knowledge Wing' },
  theater: { label: 'Theater', icon: Clapperboard, accent: 'var(--villa-theater)', accent2: 'var(--villa-theater-2)', eyebrow: 'Showcase Hall' },
  garden: { label: 'Garden', icon: TreePine, accent: 'var(--villa-garden)', accent2: 'var(--villa-garden-2)', eyebrow: 'Open Air' },
  gameroom: { label: 'Game Room', icon: Gamepad2, accent: 'var(--villa-gameroom)', accent2: 'var(--villa-gameroom-2)', eyebrow: 'Fun Corner' },
};

const RoomView = ({ roomId, onBack, children }: RoomViewProps) => {
  const meta = roomMeta[roomId] || roomMeta.lobby;
  const Icon = meta.icon;
  const roomStyle = {
    '--room-accent': meta.accent,
    '--room-accent-2': meta.accent2,
  } as CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen relative overflow-hidden"
      style={roomStyle}
    >
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: 'radial-gradient(circle at 18% 22%, hsl(var(--room-accent) / 0.16), transparent 22%), radial-gradient(circle at 82% 18%, hsl(var(--room-accent-2) / 0.14), transparent 18%), linear-gradient(180deg, hsl(var(--background)), hsl(var(--surface-elevated)))',
          }}
        />
        <div className="villa-blueprint absolute inset-0 opacity-[0.06]" />
        <motion.div
          animate={{ x: [0, 18, -10, 0], y: [0, -14, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-12 top-20 h-72 w-72 rounded-full blur-[120px]"
          style={{ background: 'hsl(var(--room-accent) / 0.2)' }}
        />
        <motion.div
          animate={{ x: [0, -16, 8, 0], y: [0, 10, -14, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-[140px]"
          style={{ background: 'hsl(var(--room-accent-2) / 0.18)' }}
        />
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <div className="container mx-auto">
          <div className="villa-header-panel px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Villa</span>
            </button>

            <div className="flex items-center gap-3 text-center">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundImage: 'linear-gradient(135deg, hsl(var(--room-accent)), hsl(var(--room-accent-2)))',
                  boxShadow: '0 16px 30px -18px hsl(var(--room-accent) / 0.85)',
                }}
              >
                <Icon size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70">{meta.eyebrow}</p>
                <span className="font-bold text-foreground text-lg">{meta.label}</span>
              </div>
            </div>

            <div className="hidden md:inline-flex villa-room-pill">
              Immersive Room
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="pt-28 pb-10 relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default RoomView;
