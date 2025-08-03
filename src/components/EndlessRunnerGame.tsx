import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Play, RotateCcw, Pause, Volume2, VolumeX } from 'lucide-react';
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
  animationFrame: number;
}

interface Obstacle extends GameObject {
  type: 'block' | 'spike' | 'gap';
  color: string;
}

interface Collectible extends GameObject {
  type: 'star' | 'coin';
  collected: boolean;
  bounce: number;
  sparkle: number;
}

interface Particle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
  color: string;
}

const EndlessRunnerGame = ({ isActive, onComplete }: EndlessRunnerGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(4);
  const [message, setMessage] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Game objects
  const playerRef = useRef<Player>({
    x: 80,
    y: 250,
    width: 32,
    height: 32,
    velocityY: 0,
    isJumping: false,
    isOnGround: true,
    animationFrame: 0
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const collectiblesRef = useRef<Collectible[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const backgroundOffsetRef = useRef(0);
  const cloudOffsetRef = useRef(0);
  const gameSpeedRef = useRef(4);
  const animationTimeRef = useRef(0);

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
  const GROUND_Y = 320;
  const GRAVITY = 0.9;
  const JUMP_STRENGTH = -16;

  const colors = {
    player: '#00d2ff',
    playerSecondary: '#ffffff',
    obstacles: ['#ff6b6b', '#ff9f43', '#ee5a52'],
    collectibles: ['#ffd700', '#ffeb3b'],
    particles: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd700']
  };

  const initializeGame = useCallback(() => {
    playerRef.current = {
      x: 80,
      y: GROUND_Y - 32,
      width: 32,
      height: 32,
      velocityY: 0,
      isJumping: false,
      isOnGround: true,
      animationFrame: 0
    };
    obstaclesRef.current = [];
    collectiblesRef.current = [];
    particlesRef.current = [];
    backgroundOffsetRef.current = 0;
    cloudOffsetRef.current = 0;
    gameSpeedRef.current = 4;
    animationTimeRef.current = 0;
    setScore(0);
    setGameSpeed(4);
    setMessage('');
    setIsPaused(false);
  }, []);

  const createParticles = useCallback((x: number, y: number, color: string, count: number = 5) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: x + Math.random() * 20 - 10,
        y: y + Math.random() * 20 - 10,
        velocityX: (Math.random() - 0.5) * 8,
        velocityY: Math.random() * -8 - 2,
        life: 60,
        maxLife: 60,
        color
      });
    }
  }, []);

  const jump = useCallback(() => {
    if (playerRef.current.isOnGround && (gameState === 'playing' || gameState === 'paused')) {
      if (gameState === 'paused') {
        setGameState('playing');
        setIsPaused(false);
      }
      
      playerRef.current.velocityY = JUMP_STRENGTH;
      playerRef.current.isJumping = true;
      playerRef.current.isOnGround = false;
      VibrationManager.profileClick();
      
      // Create jump particles
      createParticles(playerRef.current.x + 16, playerRef.current.y + 32, colors.particles[1], 3);
      
      // Show encouraging messages
      const jumpMessages = ['Nice jump! 🚀', 'Keep going! ⭐', 'Great reflexes! ⚡', 'Perfect timing! 🎯'];
      setMessage(jumpMessages[Math.floor(Math.random() * jumpMessages.length)]);
      setTimeout(() => setMessage(''), 1500);
    }
  }, [gameState, createParticles]);

  const togglePause = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
      setIsPaused(true);
    } else if (gameState === 'paused') {
      setGameState('playing');
      setIsPaused(false);
    }
  }, [gameState]);

  const checkCollision = (rect1: GameObject, rect2: GameObject): boolean => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  const generateObstacle = useCallback((x: number): Obstacle => {
    const types: Obstacle['type'][] = ['block', 'spike', 'gap'];
    const type = types[Math.floor(Math.random() * types.length)];
    const color = colors.obstacles[Math.floor(Math.random() * colors.obstacles.length)];
    
    switch (type) {
      case 'spike':
        return { x, y: GROUND_Y - 24, width: 30, height: 24, type, color };
      case 'gap':
        return { x, y: GROUND_Y, width: 60, height: 80, type, color };
      default:
        return { x, y: GROUND_Y - 48, width: 32, height: 48, type, color };
    }
  }, []);

  const generateCollectible = useCallback((x: number): Collectible => {
    const type = Math.random() > 0.5 ? 'star' : 'coin';
    return {
      x,
      y: GROUND_Y - 80 - Math.random() * 40,
      width: 20,
      height: 20,
      type,
      collected: false,
      bounce: 0,
      sparkle: 0
    };
  }, []);

  const drawPlayer = useCallback((ctx: CanvasRenderingContext2D, player: Player, time: number) => {
    // Main body
    ctx.fillStyle = colors.player;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Running animation
    if (player.isOnGround) {
      player.animationFrame += 0.3;
      // Simple leg animation
      const legOffset = Math.sin(player.animationFrame) * 3;
      ctx.fillStyle = colors.playerSecondary;
      ctx.fillRect(player.x + 8, player.y + player.height - 8, 6, 8 + legOffset);
      ctx.fillRect(player.x + 18, player.y + player.height - 8, 6, 8 - legOffset);
    }
    
    // Eyes
    ctx.fillStyle = colors.playerSecondary;
    ctx.fillRect(player.x + 8, player.y + 8, 4, 4);
    ctx.fillRect(player.x + 20, player.y + 8, 4, 4);
    
    // Shadow
    if (player.isOnGround) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.ellipse(player.x + 16, GROUND_Y + 5, 20, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    ctx.fillStyle = obstacle.color;
    
    if (obstacle.type === 'spike') {
      // Draw triangle spike
      ctx.beginPath();
      ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
      ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y);
      ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
      ctx.closePath();
      ctx.fill();
      
      // Add highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(obstacle.x + 3, obstacle.y + obstacle.height);
      ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y + 3);
      ctx.lineTo(obstacle.x + obstacle.width / 2 - 3, obstacle.y + 6);
      ctx.closePath();
      ctx.fill();
    } else if (obstacle.type === 'gap') {
      // Draw gap as darker ground
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    } else {
      // Draw block
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      
      // Add highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(obstacle.x + 2, obstacle.y + 2, obstacle.width - 4, 6);
    }
  }, []);

  const drawCollectible = useCallback((ctx: CanvasRenderingContext2D, collectible: Collectible, time: number) => {
    if (collectible.collected) return;
    
    collectible.bounce += 0.15;
    collectible.sparkle += 0.2;
    const bounceOffset = Math.sin(collectible.bounce) * 4;
    const sparkleIntensity = Math.sin(collectible.sparkle) * 0.5 + 0.5;
    
    const x = collectible.x;
    const y = collectible.y + bounceOffset;
    
    if (collectible.type === 'star') {
      // Draw star
      ctx.fillStyle = colors.collectibles[0];
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? 10 : 5;
        const angle = (i * Math.PI) / 5;
        const px = x + 10 + Math.cos(angle) * radius;
        const py = y + 10 + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      
      // Sparkle effect
      ctx.fillStyle = `rgba(255, 255, 255, ${sparkleIntensity})`;
      ctx.fillRect(x + 8, y + 8, 4, 4);
    } else {
      // Draw coin
      ctx.fillStyle = colors.collectibles[1];
      ctx.beginPath();
      ctx.ellipse(x + 10, y + 10, 8, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner highlight
      ctx.fillStyle = `rgba(255, 255, 255, ${sparkleIntensity * 0.8})`;
      ctx.beginPath();
      ctx.ellipse(x + 10, y + 10, 4, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
      ctx.fillRect(particle.x, particle.y, 3, 3);
    });
  }, []);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.7, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y);
    
    // Moving clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 4; i++) {
      const x = (i * 200 + cloudOffsetRef.current) % (CANVAS_WIDTH + 100);
      const y = 50 + i * 20;
      // Simple cloud shape
      ctx.beginPath();
      ctx.ellipse(x, y, 30, 15, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 20, y, 25, 12, 0, 0, Math.PI * 2);
      ctx.ellipse(x - 15, y, 20, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Distant buildings/mountains
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 6; i++) {
      const x = (i * 150 + backgroundOffsetRef.current * 0.3) % (CANVAS_WIDTH + 150);
      const height = 60 + Math.sin(i) * 20;
      ctx.fillRect(x, GROUND_Y - height, 80, height);
    }
    
    // Ground
    const groundGradient = ctx.createLinearGradient(0, GROUND_Y, 0, CANVAS_HEIGHT);
    groundGradient.addColorStop(0, '#0f4c75');
    groundGradient.addColorStop(1, '#0a3a5c');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);
    
    // Ground pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < Math.ceil(CANVAS_WIDTH / 40); i++) {
      const x = (i * 40 + backgroundOffsetRef.current) % (CANVAS_WIDTH + 40);
      ctx.fillRect(x, GROUND_Y, 2, CANVAS_HEIGHT - GROUND_Y);
    }
  }, []);

  const gameLoop = useCallback(() => {
    if (!canvasRef.current || gameState !== 'playing') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    animationTimeRef.current += 16; // Assuming 60fps

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update background offsets
    backgroundOffsetRef.current -= gameSpeedRef.current;
    cloudOffsetRef.current -= gameSpeedRef.current * 0.5;

    // Draw background
    drawBackground(ctx);

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
      
      // Landing particles
      if (Math.random() > 0.8) {
        createParticles(player.x + 16, player.y + player.height, colors.particles[2], 1);
      }
    }

    // Draw player
    drawPlayer(ctx, player, animationTimeRef.current);

    // Generate obstacles
    if (obstaclesRef.current.length === 0 || 
        CANVAS_WIDTH - obstaclesRef.current[obstaclesRef.current.length - 1].x > 180 + Math.random() * 120) {
      obstaclesRef.current.push(generateObstacle(CANVAS_WIDTH));
    }

    // Generate collectibles
    if (Math.random() > 0.995 && (collectiblesRef.current.length === 0 || 
        CANVAS_WIDTH - collectiblesRef.current[collectiblesRef.current.length - 1].x > 200)) {
      collectiblesRef.current.push(generateCollectible(CANVAS_WIDTH));
    }

    // Update and draw obstacles
    obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
      obstacle.x -= gameSpeedRef.current;
      drawObstacle(ctx, obstacle);

      // Check collision
      if (checkCollision(player, obstacle)) {
        setGameState('gameOver');
        VibrationManager.incorrectMatch();
        
        // Explosion particles
        createParticles(player.x + 16, player.y + 16, colors.particles[0], 10);
        
        // Check for new high score
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('endlessRunnerHighScore', score.toString());
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
        
        return false;
      }

      return obstacle.x + obstacle.width > 0;
    });

    // Update and draw collectibles
    collectiblesRef.current = collectiblesRef.current.filter(collectible => {
      collectible.x -= gameSpeedRef.current;
      drawCollectible(ctx, collectible, animationTimeRef.current);

      // Check collection
      if (!collectible.collected && checkCollision(player, collectible)) {
        collectible.collected = true;
        VibrationManager.profileClick();
        
        // Collection particles
        createParticles(collectible.x + 10, collectible.y + 10, colors.collectibles[0], 8);
        
        // Bonus score
        setScore(prev => prev + 50);
        setMessage(collectible.type === 'star' ? '⭐ +50!' : '🪙 +50!');
        setTimeout(() => setMessage(''), 1000);
        
        return false;
      }

      return collectible.x + collectible.width > 0 && !collectible.collected;
    });

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.velocityY += 0.3; // gravity
      particle.life--;
      return particle.life > 0;
    });
    drawParticles(ctx, particlesRef.current);

    // Update score and speed
    setScore(prev => {
      const newScore = prev + 1;
      // Increase speed every 1000 points
      if (newScore % 1000 === 0) {
        gameSpeedRef.current = Math.min(gameSpeedRef.current + 0.8, 12);
        setGameSpeed(gameSpeedRef.current);
        setMessage(`🚀 Speed boost! Level ${Math.floor(newScore / 1000) + 1}`);
        setTimeout(() => setMessage(''), 2000);
      }
      return newScore;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, score, highScore, generateObstacle, generateCollectible, createParticles, drawBackground, drawPlayer, drawObstacle, drawCollectible, drawParticles]);

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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      } else if (e.code === 'KeyP' || e.code === 'Escape') {
        e.preventDefault();
        togglePause();
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
  }, [isActive, jump, togglePause]);

  const startGame = () => {
    initializeGame();
    setGameState('playing');
  };

  const restartGame = () => {
    setGameState('menu');
    initializeGame();
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <ConfettiCelebration 
        isActive={showConfetti} 
        onComplete={handleConfettiComplete}
        intensity="high"
      />
      
      <Card className="backdrop-blur-2xl bg-black/90 border border-white/20 w-full max-w-6xl max-h-[95vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-6">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg sm:text-2xl bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Endless Runner
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm sm:text-base">
              <span className="text-gray-300">Score: {score}</span>
              <span className="text-cyan-400">Best: {highScore}</span>
              <span className="text-purple-400">Speed: {gameSpeed.toFixed(1)}x</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {gameState === 'playing' && (
              <>
                <Button
                  onClick={togglePause}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2"
                  size="sm"
                >
                  <Pause size={16} />
                </Button>
                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2"
                  size="sm"
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </Button>
              </>
            )}
            <Button
              onClick={onComplete}
              className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2"
              size="sm"
            >
              <X size={16} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="border border-white/20 rounded-lg w-full bg-slate-900"
              style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}`, maxHeight: '60vh' }}
              onClick={jump}
            />
            
            {gameState === 'menu' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                <div className="text-center space-y-4 p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to Run?</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Tap anywhere or press SPACE to jump over obstacles</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Collect ⭐ and 🪙 for bonus points!</p>
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
            
            {gameState === 'paused' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                <div className="text-center space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">Game Paused</h3>
                  <p className="text-gray-300">Tap anywhere or press SPACE to continue</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={() => {
                        setGameState('playing');
                        setIsPaused(false);
                      }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    >
                      <Play size={16} className="mr-2" />
                      Resume
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
            
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                <div className="text-center space-y-4 p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-red-400">Game Over!</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">Final Score: {score}</p>
                    {score === highScore && score > 0 && (
                      <p className="text-yellow-400 font-bold">🎉 New High Score! 🎉</p>
                    )}
                  </div>
                  <div className="flex gap-3 justify-center flex-wrap">
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
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/90 text-cyan-400 px-3 py-2 rounded-full text-sm animate-fade-in backdrop-blur-sm">
                {message}
              </div>
            )}
          </div>
          
          <div className="text-center text-gray-400 text-xs sm:text-sm space-y-1">
            <p>Tap the game area or press SPACE to jump • P to pause • Avoid obstacles • Collect bonuses!</p>
            <p className="text-gray-500">🎮 Use keyboard: SPACE/↑ to jump, P to pause, ESC to pause</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EndlessRunnerGame;
