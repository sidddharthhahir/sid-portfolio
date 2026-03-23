import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Dumbbell, Waves, BookOpen, Clapperboard, TreePine, Gamepad2,
  ArrowRight, Sparkles, Map, Scan, Hexagon, Activity
} from 'lucide-react';

interface VillaMapProps {
  onRoomSelect: (room: string) => void;
  activeRoom: string | null;
}

const rooms = [
  { 
    id: 'lobby', label: 'Lobby', subtitle: 'About Me', icon: Home,
    accent: 'var(--villa-lobby)', accent2: 'var(--villa-lobby-2)',
    description: 'Welcome — learn who I am', eyebrow: 'GRAND ENTRY',
    status: 'ONLINE', size: 'large',
  },
  { 
    id: 'gym', label: 'Gym', subtitle: 'Skills & Training', icon: Dumbbell,
    accent: 'var(--villa-gym)', accent2: 'var(--villa-gym-2)',
    description: 'Technical skills & expertise', eyebrow: 'POWER ZONE',
    status: 'ACTIVE',
  },
  { 
    id: 'pool', label: 'Pool', subtitle: 'Projects', icon: Waves,
    accent: 'var(--villa-pool)', accent2: 'var(--villa-pool-2)',
    description: 'Dive into my work', eyebrow: 'DEEP DIVE',
    status: 'LOADED', size: 'tall',
  },
  { 
    id: 'library', label: 'Library', subtitle: 'Education & Research', icon: BookOpen,
    accent: 'var(--villa-library)', accent2: 'var(--villa-library-2)',
    description: 'Academic background', eyebrow: 'KNOWLEDGE WING',
    status: 'INDEXED',
  },
  { 
    id: 'theater', label: 'Theater', subtitle: 'AI Demos', icon: Clapperboard,
    accent: 'var(--villa-theater)', accent2: 'var(--villa-theater-2)',
    description: 'Interactive AI showcases', eyebrow: 'SHOWCASE HALL',
    status: 'LIVE',
  },
  { 
    id: 'garden', label: 'Garden', subtitle: 'Contact & GitHub', icon: TreePine,
    accent: 'var(--villa-garden)', accent2: 'var(--villa-garden-2)',
    description: 'Connect with me', eyebrow: 'OPEN AIR',
    status: 'READY',
  },
  { 
    id: 'gameroom', label: 'Game Room', subtitle: 'Play Games', icon: Gamepad2,
    accent: 'var(--villa-gameroom)', accent2: 'var(--villa-gameroom-2)',
    description: 'Fun easter eggs', eyebrow: 'FUN CORNER',
    status: 'PLAY',
  },
];

const VillaMap = ({ onRoomSelect }: VillaMapProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-40 -z-10" />

      {/* Ambient neon orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-[5%] h-96 w-96 rounded-full blur-[160px]"
          style={{ background: 'hsl(var(--neon-cyan) / 0.12)' }}
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-[3%] h-80 w-80 rounded-full blur-[140px]"
          style={{ background: 'hsl(var(--neon-magenta) / 0.1)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[200px]"
          style={{ background: 'hsl(var(--neon-blue) / 0.08)' }}
        />
      </div>

      {/* Scan line overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-30">
        <div className="absolute inset-0 data-stream" />
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-14 max-w-3xl relative z-10"
      >
        {/* HUD badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="hud-badge">
            <Scan size={10} />
            Interactive AI Portfolio
          </span>
          <span className="hud-badge">
            <Hexagon size={10} />
            7 Immersive Rooms
          </span>
          <span className="hud-badge">
            <Activity size={10} />
            System Online
          </span>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hud-label mb-4"
        >
          ▸ Initializing Experience
        </motion.p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight font-orbitron">
          <span className="holo-text">SID'S VILLA</span>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-px w-64 mx-auto mt-6 mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--neon-cyan) / 0.6), transparent)' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-rajdhani"
        >
          Explore a cinematic villa where every room reveals a different layer of my work — projects, skills, AI demos, research, and more.
        </motion.p>
      </motion.div>

      {/* Room Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-5xl mx-auto relative z-10"
      >
        <div className="villa-shell p-5 md:p-8 lg:p-10 scan-line">
          <div className="cyber-grid-dense absolute inset-0 rounded-[2rem] opacity-30" />

          {/* Center nexus */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full border border-dashed animate-[spin_20s_linear_infinite]"
              style={{ borderColor: 'hsl(var(--neon-cyan) / 0.15)' }} />
            <div className="absolute inset-2 rounded-full"
              style={{ background: 'radial-gradient(circle, hsl(var(--neon-cyan) / 0.08), transparent)' }} />
            <span className="text-[8px] font-orbitron font-bold uppercase tracking-[0.2em]"
              style={{ color: 'hsl(var(--neon-cyan) / 0.5)' }}>
              HUB
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 relative z-10">
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
                  transition={{ delay: 0.5 + index * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onRoomSelect(room.id)}
                  className={`${room.size === 'large' ? 'col-span-2 row-span-2' : room.size === 'tall' ? 'md:row-span-2' : ''} 
                    villa-card group cursor-pointer text-left
                    ${room.size === 'large' ? 'min-h-[180px] md:min-h-[260px]' : 'min-h-[110px] md:min-h-[130px]'}
                  `}
                  style={roomStyle}
                >
                  {/* Orb */}
                  <div className="villa-orb -right-6 top-0 h-20 w-20 opacity-60 transition-all duration-700 group-hover:scale-150 group-hover:opacity-90" />
                  
                  {/* Top accent line */}
                  <div className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--room-accent) / 0.7), transparent)' }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                    style={{ boxShadow: 'inset 0 0 60px -20px hsl(var(--room-accent) / 0.4)' }}
                  />

                  {/* Floating status dot */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute right-3 top-3 flex items-center gap-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full animate-flicker"
                      style={{ background: 'hsl(var(--room-accent-2))', boxShadow: '0 0 12px hsl(var(--room-accent-2) / 0.8)' }}
                    />
                    <span className="text-[8px] font-orbitron font-bold tracking-[0.15em] hidden md:inline"
                      style={{ color: 'hsl(var(--room-accent-2) / 0.7)' }}>
                      {room.status}
                    </span>
                  </motion.div>

                  <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-5">
                    <div>
                      <span className="hud-label mb-3 block text-[8px]"
                        style={{ color: 'hsl(var(--room-accent) / 0.7)', textShadow: 'none' }}>
                        ▸ {room.eyebrow}
                      </span>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3
                        group-hover:scale-110 transition-transform duration-500"
                        style={{
                          background: `linear-gradient(135deg, hsl(var(--room-accent) / 0.2), hsl(var(--room-accent-2) / 0.1))`,
                          border: '1px solid hsl(var(--room-accent) / 0.3)',
                          boxShadow: '0 0 20px -8px hsl(var(--room-accent) / 0.5)',
                        }}
                      >
                        <Icon size={18} style={{ color: 'hsl(var(--room-accent))' }} />
                      </div>
                      <h3 className="text-base md:text-lg font-bold font-orbitron text-foreground transition-colors duration-300 tracking-wide">
                        {room.label}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 font-rajdhani font-medium">
                        {room.subtitle}
                      </p>
                    </div>
                    <div className="flex items-end justify-between gap-3 mt-4">
                      <p className="text-[11px] text-muted-foreground/60 hidden md:block max-w-[13rem] leading-relaxed font-rajdhani">
                        {room.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[9px] font-orbitron font-bold uppercase tracking-[0.2em]"
                        style={{ color: 'hsl(var(--room-accent) / 0.6)' }}>
                        Enter
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Bottom HUD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-10 text-center relative z-10"
      >
        <div className="flex items-center justify-center gap-4 text-[9px] font-orbitron uppercase tracking-[0.3em]"
          style={{ color: 'hsl(var(--neon-cyan) / 0.35)' }}>
          <span className="h-px w-8" style={{ background: 'hsl(var(--neon-cyan) / 0.2)' }} />
          Select a room to begin exploration
          <span className="h-px w-8" style={{ background: 'hsl(var(--neon-cyan) / 0.2)' }} />
        </div>
      </motion.div>
    </div>
  );
};

export default VillaMap;
