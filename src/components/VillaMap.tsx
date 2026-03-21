import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Dumbbell, Waves, BookOpen, Clapperboard, TreePine, Gamepad2,
  ArrowRight, Sparkles, Map
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
    accent: 'var(--villa-lobby)',
    accent2: 'var(--villa-lobby-2)',
    position: 'col-span-2 row-span-2',
    description: 'Welcome — learn who I am',
    eyebrow: 'Grand Entry',
  },
  { 
    id: 'gym', 
    label: 'Gym', 
    subtitle: 'Skills & Training', 
    icon: Dumbbell,
    accent: 'var(--villa-gym)',
    accent2: 'var(--villa-gym-2)',
    position: 'col-span-1 row-span-1',
    description: 'Technical skills & expertise',
    eyebrow: 'Power Zone',
  },
  { 
    id: 'pool', 
    label: 'Pool', 
    subtitle: 'Projects', 
    icon: Waves,
    accent: 'var(--villa-pool)',
    accent2: 'var(--villa-pool-2)',
    position: 'col-span-1 row-span-2',
    description: 'Dive into my work',
    eyebrow: 'Deep Dive',
  },
  { 
    id: 'library', 
    label: 'Library', 
    subtitle: 'Education & Research', 
    icon: BookOpen,
    accent: 'var(--villa-library)',
    accent2: 'var(--villa-library-2)',
    position: 'col-span-1 row-span-1',
    description: 'Academic background',
    eyebrow: 'Knowledge Wing',
  },
  { 
    id: 'theater', 
    label: 'Theater', 
    subtitle: 'AI Demos', 
    icon: Clapperboard,
    accent: 'var(--villa-theater)',
    accent2: 'var(--villa-theater-2)',
    position: 'col-span-1 row-span-1',
    description: 'Interactive AI showcases',
    eyebrow: 'Showcase Hall',
  },
  { 
    id: 'garden', 
    label: 'Garden', 
    subtitle: 'Contact & GitHub', 
    icon: TreePine,
    accent: 'var(--villa-garden)',
    accent2: 'var(--villa-garden-2)',
    position: 'col-span-1 row-span-1',
    description: 'Connect with me',
    eyebrow: 'Open Air',
  },
  { 
    id: 'gameroom', 
    label: 'Game Room', 
    subtitle: 'Play Games', 
    icon: Gamepad2,
    accent: 'var(--villa-gameroom)',
    accent2: 'var(--villa-gameroom-2)',
    position: 'col-span-1 row-span-1',
    description: 'Fun easter eggs',
    eyebrow: 'Fun Corner',
  },
];

const VillaMap = ({ onRoomSelect, activeRoom }: VillaMapProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-[8%] h-72 w-72 rounded-full blur-[120px]"
          style={{ background: 'hsl(var(--primary) / 0.16)' }}
        />
        <motion.div
          animate={{ x: [0, -24, 16, 0], y: [0, 16, -12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-[6%] h-80 w-80 rounded-full blur-[140px]"
          style={{ background: 'hsl(var(--secondary) / 0.18)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-12 max-w-3xl"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span className="villa-room-pill">
            <Sparkles size={12} className="mr-2" />
            Interactive AI Portfolio
          </span>
          <span className="villa-room-pill">
            <Map size={12} className="mr-2" />
            7 immersive rooms
          </span>
        </div>
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
          className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed"
        >
          Explore a cinematic villa where every room reveals a different layer of my work — projects, skills, AI demos, research, and more.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="villa-shell p-6 md:p-8 lg:p-10">
          <div className="villa-blueprint absolute inset-0 rounded-[2rem] opacity-[0.12]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/70"
            style={{
              borderColor: 'hsl(var(--foreground) / 0.08)',
              background: 'hsl(var(--foreground) / 0.03)',
            }}
          >
            Central Hall
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 relative z-10">
            {rooms.map((room, index) => {
              const Icon = room.icon;
              const roomStyle = {
                '--room-accent': room.accent,
                '--room-accent-2': room.accent2,
              } as CSSProperties;

              return (
                <motion.button
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.035, y: -8 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onRoomSelect(room.id)}
                  className={`${room.id === 'lobby' ? 'col-span-2 row-span-2' : room.id === 'pool' ? 'md:row-span-2' : ''} 
                    villa-card group cursor-pointer text-left transition-all duration-500
                    ${room.id === 'lobby' ? 'min-h-[200px] md:min-h-[280px]' : 'min-h-[120px] md:min-h-[140px]'}
                  `}
                  style={roomStyle}
                >
                  <div className="villa-orb -right-8 top-0 h-24 w-24 opacity-80 transition-transform duration-700 group-hover:scale-125" />
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, hsl(var(--room-accent) / 0.8), transparent)',
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow: 'inset 0 0 80px -28px hsl(var(--room-accent) / 0.55), 0 0 60px -35px hsl(var(--room-accent-2) / 0.55)',
                    }}
                  />
                  <div
                    className="absolute inset-x-6 bottom-5 h-px opacity-40"
                    style={{
                      background: 'linear-gradient(90deg, transparent, hsl(var(--room-accent-2) / 0.7), transparent)',
                    }}
                  />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute right-4 top-4 h-2 w-2 rounded-full"
                    style={{ background: 'hsl(var(--room-accent-2))', boxShadow: '0 0 18px hsl(var(--room-accent-2) / 0.9)' }}
                  />

                  <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6">
                    <div>
                      <span className="villa-room-pill mb-4">
                        {room.eyebrow}
                      </span>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                        group-hover:scale-110 transition-transform duration-500 shadow-lg"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, hsl(var(--room-accent)), hsl(var(--room-accent-2)))',
                          boxShadow: '0 18px 30px -18px hsl(var(--room-accent) / 0.8)',
                        }}
                      >
                        <Icon size={22} className="text-primary-foreground" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground transition-colors duration-300">
                        {room.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 transition-colors">
                        {room.subtitle}
                      </p>
                    </div>
                    <div className="flex items-end justify-between gap-3 mt-6">
                      <p className="text-xs text-muted-foreground/80 transition-colors hidden md:block max-w-[14rem] leading-relaxed">
                        {room.description}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                        Explore
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-xs text-muted-foreground/60 mt-8 text-center uppercase tracking-[0.24em]"
      >
        Tap a room to enter the experience • crafted for immersive storytelling
      </motion.p>
    </div>
  );
};

export default VillaMap;
