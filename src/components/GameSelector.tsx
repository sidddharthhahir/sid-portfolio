
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Brain, Grid3X3, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GameSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMemoryGame: () => void;
  onSelectTicTacToe: () => void;
  onSelectEndlessRunner: () => void;
}

const GameSelector = ({ isOpen, onClose, onSelectMemoryGame, onSelectTicTacToe, onSelectEndlessRunner }: GameSelectorProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200); // Wait for exit animation
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen && isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`backdrop-blur-2xl bg-black/90 border border-white/20 rounded-3xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out ${
          isOpen && isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Choose Your Challenge
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-1">Which game do you want to play?</p>
          </div>
          <Button
            onClick={handleClose}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2 shrink-0"
            size="sm"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <Card 
            className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20"
            onClick={onSelectMemoryGame}
          >
            <CardHeader className="text-center pb-2 sm:pb-3">
              <div className="mx-auto mb-2 sm:mb-3 p-3 sm:p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full w-fit group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <Brain size={24} className="sm:w-7 sm:h-7 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
              </div>
              <CardTitle className="text-gray-200 group-hover:text-cyan-400 transition-colors duration-300 text-base sm:text-lg">
                Memory Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-xs sm:text-sm">
                Test your memory by matching pairs of cards. How fast can you complete it?
              </p>
            </CardContent>
          </Card>

          <Card 
            className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20"
            onClick={onSelectTicTacToe}
          >
            <CardHeader className="text-center pb-2 sm:pb-3">
              <div className="mx-auto mb-2 sm:mb-3 p-3 sm:p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full w-fit group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                <Grid3X3 size={24} className="sm:w-7 sm:h-7 text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
              </div>
              <CardTitle className="text-gray-200 group-hover:text-purple-400 transition-colors duration-300 text-base sm:text-lg">
                Tic-Tac-Toe vs Sid
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-xs sm:text-sm">
                Challenge the AI "Sid" in a classic game of Tic-Tac-Toe. Can you beat him?
              </p>
            </CardContent>
          </Card>

          <Card 
            className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/20"
            onClick={onSelectEndlessRunner}
          >
            <CardHeader className="text-center pb-2 sm:pb-3">
              <div className="mx-auto mb-2 sm:mb-3 p-3 sm:p-4 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full w-fit group-hover:from-pink-500/30 group-hover:to-yellow-500/30 transition-all duration-300">
                <Zap size={24} className="sm:w-7 sm:h-7 text-pink-400 group-hover:text-yellow-400 transition-colors duration-300" />
              </div>
              <CardTitle className="text-gray-200 group-hover:text-pink-400 transition-colors duration-300 text-base sm:text-lg">
                Endless Runner
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-xs sm:text-sm">
                Jump over obstacles and see how far you can run! Beat your high score.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Each game saves your best scores locally
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameSelector;
