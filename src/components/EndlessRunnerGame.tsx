import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { X, RotateCcw } from 'lucide-react';
import { VibrationManager } from '@/utils/vibrationUtils';

interface EndlessRunnerGameProps {
  isActive: boolean;
  onComplete: () => void;
}

const EndlessRunnerGame = ({ isActive, onComplete }: EndlessRunnerGameProps) => {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<number[]>([]);
  const [obstacleSpeed, setObstacleSpeed] = useState(5);

  const gameRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  const GRAVITY = 0.5;
  const JUMP_SPEED = -10;
  const PLAYER_HEIGHT = 20;
  const PLAYER_WIDTH = 20;
  const OBSTACLE_WIDTH = 20;
  const OBSTACLE_HEIGHT = 20;
  const GROUND_LEVEL = 150;

  // Function to mark endless runner game as completed
  const markGameCompleted = () => {
    try {
      const currentProgress = JSON.parse(localStorage.getItem('game-progress') || '{}');
      const newProgress = { ...currentProgress, endlessRunnerCompleted: true };
      localStorage.setItem('game-progress', JSON.stringify(newProgress));
    } catch (error) {
      console.warn('Failed to save game completion:', error);
    }
  };

  const initializeGame = () => {
    setGameOver(false);
    setScore(0);
    setPlayerY(GROUND_LEVEL);
    setIsJumping(false);
    setObstacles([]);
    setObstacleSpeed(5);
  };

  useEffect(() => {
    if (isActive) {
      initializeGame();
      setIsGameRunning(true);
    } else {
      setIsGameRunning(false);
    }

    return () => {
      setIsGameRunning(false);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive]);

  // Obstacle generation
  const generateObstacle = useCallback(() => {
    const newObstaclePosition = 300 + Math.random() * 100;
    setObstacles(prevObstacles => [...prevObstacles, newObstaclePosition]);
  }, []);

  useEffect(() => {
    if (isGameRunning && !gameOver) {
      const obstacleInterval = setInterval(generateObstacle, 2000);

      return () => clearInterval(obstacleInterval);
    }
  }, [isGameRunning, gameOver, generateObstacle]);

  // Collision detection
  const detectCollision = useCallback(() => {
    for (let i = 0; i < obstacles.length; i++) {
      const obstacleX = obstacles[i];
      if (
        obstacleX < PLAYER_WIDTH &&
        obstacleX + OBSTACLE_WIDTH > 0 &&
        playerY + PLAYER_HEIGHT > GROUND_LEVEL - OBSTACLE_HEIGHT
      ) {
        setIsGameRunning(false);
        setGameOver(true);
        VibrationManager.incorrectMatch();
        return true;
      }
    }
    return false;
  }, [obstacles, playerY]);

  const gameLoop = useCallback(() => {
    if (!isGameRunning || gameOver) return;

    setScore(prevScore => {
      const newScore = prevScore + 1;
      
      // Mark game as completed when reaching score of 100 (or any threshold you prefer)
      if (newScore >= 100 && prevScore < 100) {
        markGameCompleted();
      }
      
      return newScore;
    });

    setObstacles(prevObstacles =>
      prevObstacles.map(obstacle => obstacle - obstacleSpeed).filter(obstacle => obstacle > -OBSTACLE_WIDTH)
    );

    if (isJumping) {
      setPlayerY(prevY => {
        const newY = prevY + JUMP_SPEED + GRAVITY;
        if (newY >= GROUND_LEVEL) {
          setIsJumping(false);
          return GROUND_LEVEL;
        }
        return newY;
      });
    } else {
      setPlayerY(prevY => {
        if (prevY < GROUND_LEVEL) {
          const newY = prevY + GRAVITY;
          return Math.min(newY, GROUND_LEVEL);
        }
        return prevY;
      });
    }

    if (detectCollision()) {
      setIsGameRunning(false);
      setGameOver(true);
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [isGameRunning, gameOver, playerY, isJumping, detectCollision, obstacleSpeed]);

  useEffect(() => {
    if (isGameRunning && !gameOver) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isGameRunning, gameOver, gameLoop]);

  const handleJump = () => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      VibrationManager.cardFlip();
    }
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'ArrowUp') {
      handleJump();
    }
  }, [handleJump]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const canvasStyle = {
    border: '2px solid white',
    backgroundColor: 'black'
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="backdrop-blur-2xl bg-black/90 border border-white/20 rounded-3xl p-8 max-w-lg w-full animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Endless Runner
            </h3>
            <p className="text-gray-300 text-sm mt-1">Jump over obstacles and see how far you can run!</p>
          </div>
          <Button
            onClick={onComplete}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2"
            size="sm"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="mb-4 text-center">
          <p className="text-gray-300">Score: {score}</p>
          {gameOver && <p className="text-red-400 font-semibold">Game Over!</p>}
        </div>

        <canvas
          ref={gameRef}
          width="300"
          height="200"
          style={canvasStyle}
          onClick={handleJump}
        />

        <div className="flex gap-3 justify-center mt-6">
          {!isGameRunning && (
            <Button
              onClick={() => {
                initializeGame();
                setIsGameRunning(true);
              }}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
            >
              {gameOver ? 'Play Again' : 'Start Game'}
            </Button>
          )}
          <Button
            onClick={() => {
              setIsGameRunning(false);
              onComplete();
            }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EndlessRunnerGame;
