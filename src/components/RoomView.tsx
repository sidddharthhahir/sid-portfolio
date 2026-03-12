import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, Dumbbell, Waves, BookOpen, Clapperboard, TreePine, Gamepad2 } from 'lucide-react';

interface RoomViewProps {
  roomId: string;
  onBack: () => void;
  children: React.ReactNode;
}

const roomMeta: Record<string, { label: string; icon: any; gradient: string; bgAccent: string }> = {
  lobby: { label: 'Lobby', icon: Home, gradient: 'from-primary to-secondary', bgAccent: 'hsl(var(--primary) / 0.08)' },
  gym: { label: 'Gym', icon: Dumbbell, gradient: 'from-red-500 to-orange-500', bgAccent: 'rgba(239, 68, 68, 0.06)' },
  pool: { label: 'Pool', icon: Waves, gradient: 'from-blue-500 to-cyan-400', bgAccent: 'rgba(59, 130, 246, 0.06)' },
  library: { label: 'Library', icon: BookOpen, gradient: 'from-amber-500 to-yellow-400', bgAccent: 'rgba(245, 158, 11, 0.06)' },
  theater: { label: 'Theater', icon: Clapperboard, gradient: 'from-purple-500 to-pink-500', bgAccent: 'rgba(168, 85, 247, 0.06)' },
  garden: { label: 'Garden', icon: TreePine, gradient: 'from-emerald-500 to-green-400', bgAccent: 'rgba(16, 185, 129, 0.06)' },
  gameroom: { label: 'Game Room', icon: Gamepad2, gradient: 'from-pink-500 to-rose-400', bgAccent: 'rgba(236, 72, 153, 0.06)' },
};

const RoomView = ({ roomId, onBack, children }: RoomViewProps) => {
  const meta = roomMeta[roomId] || roomMeta.lobby;
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen relative"
    >
      {/* Room ambient background */}
      <div className="fixed inset-0 -z-10" style={{ background: meta.bgAccent }} />

      {/* Room Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/70 border-b border-border"
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Villa</span>
          </button>

          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
              <Icon size={16} className="text-white" />
            </div>
            <span className="font-bold text-foreground">{meta.label}</span>
          </div>

          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </motion.div>

      {/* Room Content */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="pt-20"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default RoomView;
