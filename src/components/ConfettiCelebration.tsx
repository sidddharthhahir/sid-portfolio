
import { useState, useEffect } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'star';
}

interface ConfettiCelebrationProps {
  isActive: boolean;
  onComplete: () => void;
  intensity?: 'normal' | 'high';
}

const ConfettiCelebration = ({ isActive, onComplete, intensity = 'normal' }: ConfettiCelebrationProps) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dda0dd', '#ff7675', '#74b9ff', '#00cec9', '#e17055',
    '#fd79a8', '#fdcb6e', '#6c5ce7', '#a29bfe', '#55a3ff'
  ];

  const createConfettiPiece = (id: number): ConfettiPiece => {
    const shapes: ('circle' | 'square' | 'star')[] = ['circle', 'square', 'star'];
    
    return {
      id,
      x: Math.random() * window.innerWidth,
      y: -20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 6,
      speedX: (Math.random() - 0.5) * 6,
      speedY: Math.random() * 4 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    };
  };

  useEffect(() => {
    if (!isActive) return;

    const confettiCount = intensity === 'high' ? 150 : 80;
    const initialConfetti = Array.from({ length: confettiCount }, (_, i) => createConfettiPiece(i));
    setConfetti(initialConfetti);

    // Animation loop
    const animate = () => {
      setConfetti(prev => {
        const updated = prev.map(piece => ({
          ...piece,
          x: piece.x + piece.speedX,
          y: piece.y + piece.speedY,
          rotation: piece.rotation + piece.rotationSpeed,
          speedY: piece.speedY + 0.15, // gravity
          speedX: piece.speedX * 0.99 // air resistance
        })).filter(piece => piece.y < window.innerHeight + 50);
        
        return updated;
      });
    };

    const interval = setInterval(animate, 16); // ~60fps

    // Clean up after duration
    const duration = intensity === 'high' ? 4000 : 3000;
    const timeout = setTimeout(() => {
      setConfetti([]);
      onComplete();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, intensity, onComplete]);

  if (!isActive || confetti.length === 0) return null;

  const renderShape = (piece: ConfettiPiece) => {
    const baseStyle = {
      left: piece.x,
      top: piece.y,
      width: piece.size,
      height: piece.size,
      backgroundColor: piece.color,
      transform: `rotate(${piece.rotation}deg)`,
    };

    if (piece.shape === 'circle') {
      return (
        <div
          key={piece.id}
          className="absolute rounded-full"
          style={baseStyle}
        />
      );
    }

    if (piece.shape === 'square') {
      return (
        <div
          key={piece.id}
          className="absolute"
          style={baseStyle}
        />
      );
    }

    // Star shape
    return (
      <div
        key={piece.id}
        className="absolute flex items-center justify-center text-yellow-300"
        style={{
          left: piece.x,
          top: piece.y,
          fontSize: piece.size,
          transform: `rotate(${piece.rotation}deg)`,
        }}
      >
        ⭐
      </div>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      <style>
        {`
          @keyframes sparkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
          }
          
          .sparkle-animation {
            animation: sparkle 0.8s ease-in-out infinite;
          }
        `}
      </style>
      
      {confetti.map(piece => renderShape(piece))}
      
      {/* Sparkle effects */}
      {intensity === 'high' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute text-yellow-300 sparkle-animation"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                fontSize: Math.random() * 20 + 15,
                animationDelay: Math.random() * 2 + 's'
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfettiCelebration;
