import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Brain, Grid3X3, Zap } from 'lucide-react';
import { useEffect } from 'react';

interface GameSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMemoryGame: () => void;
  onSelectTicTacToe: () => void;
  onSelectEndlessRunner: () => void;
}

const GameSelector = ({ isOpen, onClose, onSelectMemoryGame, onSelectTicTacToe, onSelectEndlessRunner }: GameSelectorProps) => {
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
        {/* Modal Content - Optimized for all screen sizes */}
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
                  Choose Your Challenge
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">Which game do you want to play?</p>
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

          {/* Modal Body - Responsive grid layout */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4 h-full">
              {/* Memory Challenge Card */}
              <Card 
                className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer hover-glow group flex-1 min-h-0"
                onClick={onSelectMemoryGame}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectMemoryGame();
                  }
                }}
              >
                <CardHeader className="text-center pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
                  <div className="mx-auto mb-2 sm:mb-3 p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full w-fit group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <Brain size={20} className="sm:w-6 sm:h-6 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-gray-200 group-hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base lg:text-lg">
                    Memory Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0 px-3 sm:px-4 pb-3 sm:pb-4">
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-xs sm:text-sm">
                    Test your memory by matching pairs of cards. How fast can you complete it?
                  </p>
                </CardContent>
              </Card>

              {/* Tic-Tac-Toe Card */}
              <Card 
                className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer hover-glow group flex-1 min-h-0"
                onClick={onSelectTicTacToe}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectTicTacToe();
                  }
                }}
              >
                <CardHeader className="text-center pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
                  <div className="mx-auto mb-2 sm:mb-3 p-2 sm:p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full w-fit group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <Grid3X3 size={20} className="sm:w-6 sm:h-6 text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-gray-200 group-hover:text-purple-400 transition-colors duration-300 text-sm sm:text-base lg:text-lg">
                    Tic-Tac-Toe vs Sid
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0 px-3 sm:px-4 pb-3 sm:pb-4">
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-xs sm:text-sm">
                    Challenge the AI "Sid" in a classic game of Tic-Tac-Toe. Can you beat him?
                  </p>
                </CardContent>
              </Card>

              {/* Endless Runner Card */}
              <Card 
                className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer hover-glow group flex-1 min-h-0"
                onClick={onSelectEndlessRunner}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectEndlessRunner();
                  }
                }}
              >
                <CardHeader className="text-center pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
                  <div className="mx-auto mb-2 sm:mb-3 p-2 sm:p-3 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full w-fit group-hover:from-pink-500/30 group-hover:to-yellow-500/30 transition-all duration-300">
                    <Zap size={20} className="sm:w-6 sm:h-6 text-pink-400 group-hover:text-yellow-400 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-gray-200 group-hover:text-pink-400 transition-colors duration-300 text-sm sm:text-base lg:text-lg">
                    Endless Runner
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0 px-3 sm:px-4 pb-3 sm:pb-4">
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-xs sm:text-sm">
                    Jump over obstacles and see how far you can run! Beat your high score.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSelector;
