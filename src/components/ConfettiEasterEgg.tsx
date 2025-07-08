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
}

interface ConfettiEasterEggProps {
  isActive: boolean;
  onComplete: () => void;
}

const ConfettiEasterEgg = ({ isActive, onComplete }: ConfettiEasterEggProps) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dda0dd', '#ff7675', '#74b9ff', '#00cec9', '#e17055'
  ];

  const createConfettiPiece = (id: number): ConfettiPiece => ({
    id,
    x: Math.random() * window.innerWidth,
    y: -10,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    speedX: (Math.random() - 0.5) * 4,
    speedY: Math.random() * 3 + 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
  });

  useEffect(() => {
    if (!isActive) return;

    // Create initial confetti
    const initialConfetti = Array.from({ length: 100 }, (_, i) => createConfettiPiece(i));
    setConfetti(initialConfetti);
    setShowMessage(true);

    // Animation loop
    const animate = () => {
      setConfetti(prev => 
        prev.map(piece => ({
          ...piece,
          x: piece.x + piece.speedX,
          y: piece.y + piece.speedY,
          rotation: piece.rotation + piece.rotationSpeed,
          speedY: piece.speedY + 0.1, // gravity
        })).filter(piece => piece.y < window.innerHeight + 20)
      );
    };

    const interval = setInterval(animate, 16); // ~60fps

    // Clean up after 5 seconds
    const timeout = setTimeout(() => {
      setConfetti([]);
      setShowMessage(false);
      onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Confetti pieces */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute rounded-full"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            transition: 'none',
          }}
        />
      ))}
      
      {/* Secret message */}
      {showMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="backdrop-blur-2xl bg-black/90 border border-white/20 rounded-3xl p-8 shadow-2xl animate-scale-in">
            <div className="text-center space-y-4">
              <div className="text-4xl">🎉</div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                You found the hidden surprise!
              </h3>
              <p className="text-gray-200 text-lg">
                Thanks for exploring my site 😊
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfettiEasterEgg;