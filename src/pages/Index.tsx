import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import VillaMap from '@/components/VillaMap';
import RoomView from '@/components/RoomView';
import LobbyRoom from '@/components/rooms/LobbyRoom';
import GymRoom from '@/components/rooms/GymRoom';
import PoolRoom from '@/components/rooms/PoolRoom';
import LibraryRoom from '@/components/rooms/LibraryRoom';
import TheaterRoom from '@/components/rooms/TheaterRoom';
import GardenRoom from '@/components/rooms/GardenRoom';
import GameRoom from '@/components/rooms/GameRoom';
import ParticleTrail from '@/components/ParticleTrail';

const NeuralNetwork3D = lazy(() => import('@/components/NeuralNetwork3D'));

const Index = () => {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const handleRoomSelect = (roomId: string) => {
    setActiveRoom(roomId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveRoom(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderRoom = () => {
    switch (activeRoom) {
      case 'lobby': return <LobbyRoom onNavigate={handleRoomSelect} />;
      case 'gym': return <GymRoom />;
      case 'pool': return <PoolRoom />;
      case 'library': return <LibraryRoom />;
      case 'theater': return <TheaterRoom />;
      case 'garden': return <GardenRoom />;
      case 'gameroom': return <GameRoom />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <Suspense fallback={null}>
          <NeuralNetwork3D />
        </Suspense>
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[140px] animate-glow-pulse"
          style={{ background: 'hsl(var(--neon-cyan) / 0.06)' }} />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] animate-glow-pulse"
          style={{ background: 'hsl(var(--neon-magenta) / 0.05)', animationDelay: '2s' }} />
      </div>

      <ParticleTrail />

      <AnimatePresence mode="wait">
        {activeRoom ? (
          <RoomView key={activeRoom} roomId={activeRoom} onBack={handleBack}>
            {renderRoom()}
          </RoomView>
        ) : (
          <VillaMap key="villa-map" onRoomSelect={handleRoomSelect} activeRoom={activeRoom} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-6 border-t relative z-10"
        style={{ borderColor: 'hsl(var(--neon-cyan) / 0.08)', background: 'hsl(var(--background) / 0.8)' }}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-[11px] font-orbitron uppercase tracking-[0.25em]"
            style={{ color: 'hsl(var(--muted-foreground) / 0.5)' }}>
            © {new Date().getFullYear()} Siddharth Ahir • Built with precision
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Index;
