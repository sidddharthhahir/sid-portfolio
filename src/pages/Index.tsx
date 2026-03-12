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
import VisitorGreeting from '@/components/VisitorGreeting';

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
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
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
      <footer className="py-8 border-t border-border bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Siddharth Ahir. Built with ❤️
          </p>
        </div>
      </footer>

      <VisitorGreeting />
    </div>
  );
};

export default Index;
