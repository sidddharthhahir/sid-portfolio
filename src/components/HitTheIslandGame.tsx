
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Play, RotateCcw, Target } from 'lucide-react';
import { VibrationManager } from '@/utils/vibrationUtils';
import ConfettiCelebration from '@/components/ConfettiCelebration';

interface HitTheIslandGameProps {
  isActive: boolean;
  onComplete: () => void;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Island {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
}

const HitTheIslandGame = ({ isActive, onComplete }: HitTheIslandGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver' | 'victory'>('menu');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState('');

  // Game objects
  const ballRef = useRef<Ball>({
    x: 400,
    y: 350,
    vx: 0,
    vy: 0,
    radius: 8
  });

  const islandRef = useRef<Island>({
    x: 300,
    y: 50,
    width: 80,
    height: 30,
    vx: 2
  });

  const [power, setPower] = useState(0);
  const [angle, setAngle] = useState(-45);
  const [isCharging, setIsCharging] = useState(false);
  const chargingRef = useRef(false);

  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 400;
  const GRAVITY = 0.3;
  const MAX_POWER = 15;
  const HITS_TO_WIN = 5;

  const initializeGame = useCallback(() => {
    ballRef.current = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 50,
      vx: 0,
      vy: 0,
      radius: 8
    };
    
    islandRef.current = {
      x: Math.random() * (CANVAS_WIDTH - 80),
      y: 50 + Math.random() * 100,
      width: 80,
      height: 30,
      vx: 1 + Math.random() * 2
    };

    setPower(0);
    setAngle(-45);
    setIsCharging(false);
    chargingRef.current = false;
    setMessage('');
  }, []);

  const launchBall = useCallback(() => {
    if (gameState !== 'playing' || ballRef.current.vx !== 0 || ballRef.current.vy !== 0) return;
    
    const radians = (angle * Math.PI) / 180;
    const launchPower = (power / 100) * MAX_POWER;
    
    ballRef.current.vx = Math.cos(radians) * launchPower;
    ballRef.current.vy = Math.sin(radians) * launchPower;
    
    VibrationManager.profileClick();
    setPower(0);
  }, [angle, power, gameState]);

  const checkCollision = (ball: Ball, island: Island): boolean => {
    return ball.x + ball.radius > island.x &&
           ball.x - ball.radius < island.x + island.width &&
           ball.y + ball.radius > island.y &&
           ball.y - ball.radius < island.y + island.height;
  };

  const resetBall = () => {
    ballRef.current = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 50,
      vx: 0,
      vy: 0,
      radius: 8
    };
  };

  const gameLoop = useCallback(() => {
    if (!canvasRef.current || gameState !== 'playing') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#4682B4');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw water
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, CANVAS_HEIGHT - 80, CANVAS_WIDTH, 80);
    
    // Water waves effect
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    for (let i = 0; i < CANVAS_WIDTH; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, CANVAS_HEIGHT - 60);
      ctx.quadraticCurveTo(i + 10, CANVAS_HEIGHT - 70, i + 20, CANVAS_HEIGHT - 60);
      ctx.stroke();
    }

    const ball = ballRef.current;
    const island = islandRef.current;

    // Update ball physics
    if (ball.vx !== 0 || ball.vy !== 0) {
      ball.vy += GRAVITY;
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Check collision with island
      if (checkCollision(ball, island)) {
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore >= HITS_TO_WIN) {
            setGameState('victory');
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          } else {
            setMessage(`Hit! ${HITS_TO_WIN - newScore} more to go!`);
            setTimeout(() => setMessage(''), 2000);
            
            // Move island to new position and increase speed
            island.x = Math.random() * (CANVAS_WIDTH - island.width);
            island.y = 50 + Math.random() * 100;
            island.vx = 1 + Math.random() * (2 + newScore * 0.5);
            
            resetBall();
          }
          return newScore;
        });
        VibrationManager.profileClick();
      }

      // Reset ball if it goes off screen or hits water
      if (ball.x < 0 || ball.x > CANVAS_WIDTH || ball.y > CANVAS_HEIGHT - 80) {
        resetBall();
        setMessage('Try again!');
        setTimeout(() => setMessage(''), 1000);
      }
    }

    // Update island movement
    island.x += island.vx;
    if (island.x <= 0 || island.x >= CANVAS_WIDTH - island.width) {
      island.vx = -island.vx;
    }

    // Draw island
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(island.x, island.y, island.width, island.height);
    
    // Island details
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(island.x + 10, island.y - 5, 15, 5);
    ctx.fillRect(island.x + 35, island.y - 8, 20, 8);
    ctx.fillRect(island.x + 60, island.y - 3, 10, 3);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444';
    ctx.fill();
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw power and angle indicators when ball is ready
    if (ball.vx === 0 && ball.vy === 0) {
      // Draw angle line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(ball.x, ball.y);
      const lineLength = 50 + power;
      const radians = (angle * Math.PI) / 180;
      ctx.lineTo(
        ball.x + Math.cos(radians) * lineLength,
        ball.y + Math.sin(radians) * lineLength
      );
      ctx.stroke();

      // Draw power bar
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(ball.x - 25, ball.y + 20, 50, 10);
      
      const powerColor = power < 30 ? '#22c55e' : power < 70 ? '#eab308' : '#ef4444';
      ctx.fillStyle = powerColor;
      ctx.fillRect(ball.x - 25, ball.y + 20, (power / 100) * 50, 10);
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, power, angle]);

  useEffect(() => {
    if (gameState === 'playing') {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Handle mouse/touch events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (gameState !== 'playing') return;
      
      setIsCharging(true);
      chargingRef.current = true;
      
      const powerInterval = setInterval(() => {
        if (!chargingRef.current) {
          clearInterval(powerInterval);
          return;
        }
        setPower(prev => Math.min(prev + 2, 100));
      }, 20);
    };

    const handleMouseUp = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!chargingRef.current) return;
      
      setIsCharging(false);
      chargingRef.current = false;
      launchBall();
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (gameState !== 'playing' || ballRef.current.vx !== 0 || ballRef.current.vy !== 0) return;
      
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;
      
      const ball = ballRef.current;
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      
      let newAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      newAngle = Math.max(-90, Math.min(-10, newAngle)); // Limit angle
      setAngle(newAngle);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchend', handleMouseUp);
    canvas.addEventListener('touchmove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchend', handleMouseUp);
      canvas.removeEventListener('touchmove', handleMouseMove);
    };
  }, [gameState, launchBall, isActive]);

  const startGame = () => {
    initializeGame();
    setGameState('playing');
    setScore(0);
  };

  const restartGame = () => {
    setGameState('menu');
    initializeGame();
  };

  const handleVictory = () => {
    onComplete();
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ConfettiCelebration 
        isActive={showConfetti} 
        onComplete={handleConfettiComplete}
        intensity="high"
      />
      
      <Card className="backdrop-blur-2xl bg-black/90 border border-white/20 max-w-4xl w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Hit the Island
            </CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-gray-300">Hits: {score}/{HITS_TO_WIN}</span>
              <span className="text-cyan-400">Level: {level}</span>
            </div>
          </div>
          <Button
            onClick={onComplete}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20"
            size="sm"
          >
            <X size={20} />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="border border-white/20 rounded-lg w-full max-w-full bg-slate-900 cursor-crosshair"
              style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }}
            />
            
            {gameState === 'menu' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                <div className="text-center space-y-4">
                  <Target size={48} className="mx-auto text-green-400" />
                  <h3 className="text-2xl font-bold text-white">Hit the Island!</h3>
                  <p className="text-gray-300">Aim and launch the ball to hit the moving island</p>
                  <p className="text-sm text-gray-400">Move mouse to aim • Hold to charge • Release to fire</p>
                  <Button
                    onClick={startGame}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                  >
                    <Play size={20} className="mr-2" />
                    Start Game
                  </Button>
                </div>
              </div>
            )}
            
            {gameState === 'victory' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                <div className="text-center space-y-4">
                  <Target size={48} className="mx-auto text-yellow-400" />
                  <h3 className="text-2xl font-bold text-green-400">Victory! 🎉</h3>
                  <p className="text-gray-300">You hit the island {HITS_TO_WIN} times!</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={handleVictory}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    >
                      Complete Challenge
                    </Button>
                    <Button
                      onClick={startGame}
                      className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20"
                    >
                      <RotateCcw size={16} className="mr-2" />
                      Play Again
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {message && gameState === 'playing' && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-green-400 px-4 py-2 rounded-full text-sm animate-fade-in">
                {message}
              </div>
            )}
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            Aim with your mouse • Hold to charge power • Release to launch • Hit the moving island {HITS_TO_WIN} times to win!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HitTheIslandGame;
