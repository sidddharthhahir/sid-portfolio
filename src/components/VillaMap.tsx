import { motion } from 'framer-motion';
import { 
  Home, Dumbbell, Waves, BookOpen, Clapperboard, TreePine, Gamepad2,
  ArrowRight
} from 'lucide-react';

interface VillaMapProps {
  onRoomSelect: (room: string) => void;
  activeRoom: string | null;
}

const rooms = [
  { 
    id: 'lobby', 
    label: 'Lobby', 
    subtitle: 'About Me', 
    icon: Home,
    color: 'from-primary to-secondary',
    glowColor: 'hsl(var(--primary) / 0.3)',
    position: 'col-span-2 row-span-2',
    description: 'Welcome — learn who I am',
  },
  { 
    id: 'gym', 
    label: 'Gym', 
    subtitle: 'Skills & Training', 
    icon: Dumbbell,
    color: 'from-red-500 to-orange-500',
    glowColor: 'rgba(239, 68, 68, 0.3)',
    position: 'col-span-1 row-span-1',
    description: 'Technical skills & expertise',
  },
  { 
    id: 'pool', 
    label: 'Pool', 
    subtitle: 'Projects', 
    icon: Waves,
    color: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    position: 'col-span-1 row-span-2',
    description: 'Dive into my work',
  },
  { 
    id: 'library', 
    label: 'Library', 
    subtitle: 'Education & Research', 
    icon: BookOpen,
    color: 'from-amber-500 to-yellow-400',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    position: 'col-span-1 row-span-1',
    description: 'Academic background',
  },
  { 
    id: 'theater', 
    label: 'Theater', 
    subtitle: 'AI Demos', 
    icon: Clapperboard,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    position: 'col-span-1 row-span-1',
    description: 'Interactive AI showcases',
  },
  { 
    id: 'garden', 
    label: 'Garden', 
    subtitle: 'Contact & GitHub', 
    icon: TreePine,
    color: 'from-emerald-500 to-green-400',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    position: 'col-span-1 row-span-1',
    description: 'Connect with me',
  },
  { 
    id: 'gameroom', 
    label: 'Game Room', 
    subtitle: 'Play Games', 
    icon: Gamepad2,
    color: 'from-pink-500 to-rose-400',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    position: 'col-span-1 row-span-1',
    description: 'Fun easter eggs',
  },
];

const VillaMap = ({ onRoomSelect, activeRoom }: VillaMapProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Villa Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4"
        >
          Welcome to
        </motion.p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
          <span className="glow-text">Sid's Villa</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground mt-4 max-w-md mx-auto"
        >
          Explore each room to discover my world — skills, projects, AI demos & more
        </motion.p>
      </motion.div>

      {/* Villa Floor Plan Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-5xl mx-auto"
      >
        {/* Villa outline */}
        <div className="relative p-6 md:p-8 rounded-3xl border-2 border-border/50 bg-muted/10 backdrop-blur-sm">
          {/* Blueprint grid pattern */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 relative z-10">
            {rooms.map((room, index) => {
              const Icon = room.icon;
              return (
                <motion.button
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onRoomSelect(room.id)}
                  className={`${room.id === 'lobby' ? 'col-span-2 row-span-2' : room.id === 'pool' ? 'md:row-span-2' : ''} 
                    group relative rounded-2xl border border-border/50 overflow-hidden
                    transition-all duration-500 cursor-pointer text-left
                    hover:border-white/20
                    ${room.id === 'lobby' ? 'min-h-[200px] md:min-h-[280px]' : 'min-h-[120px] md:min-h-[140px]'}
                  `}
                  style={{
                    background: 'hsl(var(--surface-glass) / 0.4)',
                  }}
                >
                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                    style={{ boxShadow: `inset 0 0 60px -20px ${room.glowColor}, 0 0 40px -15px ${room.glowColor}` }}
                  />

                  {/* Room content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6">
                    <div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${room.color} flex items-center justify-center mb-3 
                        group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                      >
                        <Icon size={22} className="text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
                        {room.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 group-hover:text-white/60 transition-colors">
                        {room.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-muted-foreground/70 group-hover:text-white/50 transition-colors hidden md:block">
                        {room.description}
                      </p>
                      <ArrowRight size={16} className="text-muted-foreground/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${room.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-3xl`} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-xs text-muted-foreground/50 mt-8 text-center"
      >
        Click any room to explore • Built by Siddharth Ahir
      </motion.p>
    </div>
  );
};

export default VillaMap;
