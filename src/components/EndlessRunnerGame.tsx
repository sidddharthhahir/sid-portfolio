
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Play, RotateCcw } from 'lucide-react';
import { VibrationManager } from '@/utils/vibrationUtils';
import ConfettiCelebration from '@/components/ConfettiCelebration';

interface EndlessRunnerGameProps {
  isActive: boolean;
  onComplete: () => void;
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Player extends GameObject {
  velocityY: number;
  isJumping: boolean;
  isOnGround: boolean;
}

interface Obstacle extends GameObject {
  type: 'block' | 'spike';
}

const EndlessRunnerGame = ({ isActive, onComplete }: EndlessRunnerGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(3);
  const [message, setMessage] = useState('');

  // Game objects
  const playerRef = useRef<Player>({
    x: 50,
    y: 250,
    width: 30,
    height: 30,
    velocityY: 0,
    isJumping: false,
    isOnGround: true
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const backgroundOffsetRef = useRef(0);
  const lastObstacleRef = useRef(0);
  const gameSpeedRef = useRef(3);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('endlessRunnerHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 400;
  const GROUND_Y = 300;
  const GRAVITY = 0.8;
  const JUMP_STRENGTH = -15;

  const initializeGame = useCallback(() => {
    playerRef.current = {
      x: 50,
      y: GROUND_Y - 30,
      width: 30,
      height: 30,
      velocityY: 0,
      isJumping: false,
      isOnGround: true
    };
    obstaclesRef.current = [];
    backgroundOffsetRef.current = 0;
    lastObstacleRef.current = 0;
    gameSpeedRef.current = 3;
    setScore(0);
    setGameSpeed(3);
    setMessage('');
  }, []);

  const jump = useCallback(() => {
    if (playerRef.current.isOnGround && gameState === 'playing') {
      playerRef.current.velocityY = JUMP_STRENGTH;
      playerRef.current.isJumping = true;
      playerRef.current.isOnGround = false;
      VibrationManager.profileClick();
      
      // Show encouraging messages
      const jumpMessages = ['Nice jump!', 'Keep going!', 'Great reflexes!', 'Perfect timing!'];
      setMessage(jumpMessages[Math.floor(Math.random() * jumpMessages.length)]);
      setTimeout(() => setMessage(''), 1000);
    }
  }, [gameState]);

  const checkCollision = (rect1: GameObject, rect2: GameObject): boolean => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  const generateObstacle = useCallback((x: number): Obstacle => {
    const type = Math.random() > 0.5 ? 'block' : 'spike';
    return {
      x,
      y: type === 'spike' ? GROUND_Y - 20 : GROUND_Y - 40,
      width: type === 'spike' ? 25 : 30,
      height: type === 'spike' ? 20 : 40,
      type
    };
  }, []);

  const gameLoop = useCallback(() => {
    if (!canvasRef.current || gameState !== 'playing') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update background
    backgroundOffsetRef.current -= gameSpeedRef.current;
    if (backgroundOffsetRef.current <= -100) {
      backgroundOffsetRef.current = 0;
    }

    // Draw animated background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw moving background elements
    ctx.fillStyle = '#16213e';
    for (let i = -1; i < Math.ceil(CANVAS_WIDTH / 100) + 1; i++) {
      const x = i * 100 + backgroundOffsetRef.current;
      ctx.fillRect(x, 50, 60, 20);
      ctx.fillRect(x + 20, 100, 40, 30);
    }

    // Draw ground
    ctx.fillStyle = '#0f4c75';
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

    // Update player physics
    const player = playerRef.current;
    player.velocityY += GRAVITY;
    player.y += player.velocityY;

    // Check ground collision
    if (player.y >= GROUND_Y - player.height) {
      player.y = GROUND_Y - player.height;
      player.velocityY = 0;
      player.isJumping = false;
      player.isOnGround = true;
    }

    // Draw player
    ctx.fillStyle = '#00d2ff';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Add simple animation effect
    if (player.isJumping) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(player.x + 5, player.y + 5, 20, 20);
    }

    // Generate obstacles
    if (obstaclesRef.current.length === 0 || 
        CANVAS_WIDTH - obstaclesRef.current[obstaclesRef.current.length - 1].x > 200 + Math.random() * 200) {
      obstaclesRef.current.push(generateObstacle(CANVAS_WIDTH));
    }

    // Update and draw obstacles
    obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
      obstacle.x -= gameSpeedRef.current;

      // Draw obstacle
      if (obstacle.type === 'spike') {
        ctx.fillStyle = '#ff6b6b';
        // Draw triangle spike
        ctx.beginPath();
        ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
        ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y);
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillStyle = '#ff9f43';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      }

      // Check collision
      if (checkCollision(player, obstacle)) {
        setGameState('gameOver');
        VibrationManager.incorrectMatch();
        
        // Check for new high score
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('endlessRunnerHighScore', score.toString());
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        
        return false;
      }

      return obstacle.x + obstacle.width > 0;
    });

    // Update score and speed
    setScore(prev => {
      const newScore = prev + 1;
      // Increase speed every 500 points
      if (newScore % 500 === 0) {
        gameSpeedRef.current = Math.min(gameSpeedRef.current + 0.5, 8);
        setGameSpeed(gameSpeedRef.current);
      }
      return newScore;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, score, highScore, generateObstacle]);

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

  // Handle keyboard and touch events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };

    if (isActive) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('touchstart', handleTouch);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouch);
    };
  }, [isActive, jump]);

  const startGame = () => {
    initializeGame();
    setGameState('playing');
  };

  const restartGame = () => {
    setGameState('menu');
    initializeGame();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {showConfetti && <ConfettiCelebration />}
      
      <Card className="backdrop-blur-2xl bg-black/90 border border-white/20 max-w-4xl w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Endless Runner
            </CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-gray-300">Score: {score}</span>
              <span className="text-cyan-400">High Score: {highScore}</span>
              <span className="text-purple-400">Speed: {gameSpeed.toFixed(1)}x</span>
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
              className="border border-white/20 rounded-lg w-full max-w-full bg-slate-900"
              style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }}
              onClick={jump}
            />
            
            {gameState === 'menu' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-white">Ready to Run?</h3>
                  <p className="text-gray-300">Tap or press SPACE to jump over obstacles</p>
                  <Button
                    onClick={startGame}
                    className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
                  >
                    <Play size={20} className="mr-2" />
                    Start Game
                  </Button>
                </div>
              </div>
            )}
            
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-red-400">Game Over!</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">Final Score: {score}</p>
                    {score === highScore && score > 0 && (
                      <p className="text-yellow-400 font-bold">🎉 New High Score! 🎉</p>
                    )}
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={startGame}
                      className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
                    >
                      <RotateCcw size={16} className="mr-2" />
                      Play Again
                    </Button>
                    <Button
                      onClick={restartGame}
                      className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20"
                    >
                      Menu
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {message && gameState === 'playing' && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-cyan-400 px-4 py-2 rounded-full text-sm animate-fade-in">
                {message}
              </div>
            )}
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            Click the game area or press SPACE to jump • Avoid the obstacles • Beat your high score!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EndlessRunnerGame;
