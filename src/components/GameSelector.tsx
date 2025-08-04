
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Brain, Grid3X3, Zap, Lock, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

interface GameSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMemoryGame: () => void;
  onSelectTicTacToe: () => void;
  onSelectEndlessRunner: () => void;
}

interface GameProgress {
  memoryCompleted: boolean;
  ticTacToeCompleted: boolean;
  endlessRunnerCompleted: boolean;
}

const GameSelector = ({ isOpen, onClose, onSelectMemoryGame, onSelectTicTacToe, onSelectEndlessRunner }: GameSelectorProps) => {
  // Get game progress from localStorage
  const getGameProgress = (): GameProgress => {
    try {
      const stored = localStorage.getItem('game-progress');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load game progress:', error);
    }
    return { memoryCompleted: false, ticTacToeCompleted: false, endlessRunnerCompleted: false };
  };

  const gameProgress = getGameProgress();

  // Game configuration with unlock conditions
  const games = [
    {
      id: 'memory',
      title: 'Memory Challenge',
      description: 'Test your memory by matching pairs of cards. How fast can you complete it?',
      icon: Brain,
      gradientFrom: 'from-cyan-500/20',
      gradientTo: 'to-purple-500/20',
      hoverFrom: 'group-hover:from-cyan-500/30',
      hoverTo: 'group-hover:to-purple-500/30',
      iconColor: 'text-cyan-400',
      hoverIconColor: 'group-hover:text-purple-400',
      titleHoverColor: 'group-hover:text-cyan-400',
      isUnlocked: true, // First game is always unlocked
      isCompleted: gameProgress.memoryCompleted,
      onClick: onSelectMemoryGame
    },
    {
      id: 'ticTacToe',
      title: 'Tic-Tac-Toe vs Sid',
      description: 'Challenge the AI "Sid" in a classic game of Tic-Tac-Toe. Can you beat him?',
      icon: Grid3X3,
      gradientFrom: 'from-purple-500/20',
      gradientTo: 'to-pink-500/20',
      hoverFrom: 'group-hover:from-purple-500/30',
      hoverTo: 'group-hover:to-pink-500/30',
      iconColor: 'text-purple-400',
      hoverIconColor: 'group-hover:text-pink-400',
      titleHoverColor: 'group-hover:text-purple-400',
      isUnlocked: gameProgress.memoryCompleted, // Unlocked after completing memory game
      isCompleted: gameProgress.ticTacToeCompleted,
      onClick: onSelectTicTacToe,
      unlockCondition: 'Complete Memory Challenge'
    },
    {
      id: 'endlessRunner',
      title: 'Endless Runner',
      description: 'Jump over obstacles and see how far you can run! Beat your high score.',
      icon: Zap,
      gradientFrom: 'from-pink-500/20',
      gradientTo: 'to-yellow-500/20',
      hoverFrom: 'group-hover:from-pink-500/30',
      hoverTo: 'group-hover:to-yellow-500/30',
      iconColor: 'text-pink-400',
      hoverIconColor: 'group-hover:text-yellow-400',
      titleHoverColor: 'group-hover:text-pink-400',
      isUnlocked: gameProgress.ticTacToeCompleted, // Unlocked after completing tic-tac-toe
      isCompleted: gameProgress.endlessRunnerCompleted,
      onClick: onSelectEndlessRunner,
      unlockCondition: 'Complete Tic-Tac-Toe vs Sid'
    }
  ];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          @keyframes modalFadeIn {
            0% {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes overlayFadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          .modal-overlay {
            animation: overlayFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          .modal-content {
            animation: modalFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          .hover-glow {
            transition: all 0.3s ease;
          }
          
          .hover-glow:hover {
            box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
            transform: translateY(-2px);
          }
          
          .locked-card {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .locked-card:hover {
            transform: none;
            box-shadow: none;
          }
        `}
      </style>

      {/* Modal Overlay */}
      <div 
        className="modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Content */}
        <div 
          className="modal-content backdrop-blur-2xl bg-black/90 border border-white/20 rounded-2xl sm:rounded-3xl w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 backdrop-blur-2xl bg-black/90 border-b border-white/10 rounded-t-2xl sm:rounded-t-3xl px-4 sm:px-6 py-4 sm:py-5 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 
                  id="modal-title"
                  className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Game Challenges
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">Complete games in order to unlock the next challenge</p>
              </div>
              <Button
                onClick={onClose}
                className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2 shrink-0"
                size="sm"
                aria-label="Close modal"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4 h-full">
              {games.map((game, index) => (
                <Card 
                  key={game.id}
                  className={`backdrop-blur-2xl bg-black/30 border border-white/20 transition-all duration-300 cursor-pointer group flex-1 min-h-0 ${
                    game.isUnlocked 
                      ? 'hover:bg-black/40 hover-glow' 
                      : 'locked-card'
                  }`}
                  onClick={game.isUnlocked ? game.onClick : undefined}
                  role="button"
                  tabIndex={game.isUnlocked ? 0 : -1}
                  onKeyDown={(e) => {
                    if (game.isUnlocked && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      game.onClick();
                    }
                  }}
                >
                  <CardHeader className="text-center pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
                    <div className={`mx-auto mb-2 sm:mb-3 p-2 sm:p-3 bg-gradient-to-r ${game.gradientFrom} ${game.gradientTo} rounded-full w-fit transition-all duration-300 relative ${
                      game.isUnlocked ? `${game.hoverFrom} ${game.hoverTo}` : ''
                    }`}>
                      {!game.isUnlocked ? (
                        <Lock size={20} className="sm:w-6 sm:h-6 text-gray-500" />
                      ) : game.isCompleted ? (
                        <CheckCircle size={20} className="sm:w-6 sm:h-6 text-green-400" />
                      ) : (
                        <game.icon size={20} className={`sm:w-6 sm:h-6 ${game.iconColor} transition-colors duration-300 ${
                          game.isUnlocked ? game.hoverIconColor : ''
                        }`} />
                      )}
                      
                      {/* Completion badge */}
                      {game.isCompleted && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle size={10} className="text-white" />
                        </div>
                      )}
                    </div>
                    
                    <CardTitle className={`transition-colors duration-300 text-sm sm:text-base lg:text-lg ${
                      game.isUnlocked 
                        ? `text-gray-200 ${game.titleHoverColor}` 
                        : 'text-gray-500'
                    }`}>
                      {game.title}
                      {game.isCompleted && <span className="text-green-400 ml-2">✓</span>}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center pt-0 px-3 sm:px-4 pb-3 sm:pb-4">
                    {!game.isUnlocked && game.unlockCondition ? (
                      <div className="text-gray-400 text-xs sm:text-sm">
                        🔒 {game.unlockCondition}
                      </div>
                    ) : (
                      <p className={`transition-colors duration-300 text-xs sm:text-sm ${
                        game.isUnlocked 
                          ? 'text-gray-300 group-hover:text-gray-200' 
                          : 'text-gray-500'
                      }`}>
                        {game.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 p-3 rounded-xl backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20">
              <div className="text-center text-sm text-gray-300">
                Progress: {[gameProgress.memoryCompleted, gameProgress.ticTacToeCompleted, gameProgress.endlessRunnerCompleted].filter(Boolean).length}/3 games completed
              </div>
              <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${([gameProgress.memoryCompleted, gameProgress.ticTacToeCompleted, gameProgress.endlessRunnerCompleted].filter(Boolean).length / 3) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSelector;
