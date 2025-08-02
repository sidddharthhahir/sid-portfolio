
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Brain, Grid3X3 } from 'lucide-react';

interface GameSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMemoryGame: () => void;
  onSelectTicTacToe: () => void;
}

const GameSelector = ({ isOpen, onClose, onSelectMemoryGame, onSelectTicTacToe }: GameSelectorProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="backdrop-blur-2xl bg-black/90 border border-white/20 rounded-3xl p-8 max-w-md w-full animate-scale-in"
        style={{
          animation: 'fadeInSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        <style>
          {`
            @keyframes fadeInSlideUp {
              0% {
                opacity: 0;
                transform: translateY(60px) scale(0.9);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
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

        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Choose Your Challenge
            </h3>
            <p className="text-gray-300 text-sm mt-1">Which game do you want to play?</p>
          </div>
          <Button
            onClick={onClose}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2"
            size="sm"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          <Card 
            className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer hover-glow group"
            onClick={onSelectMemoryGame}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full w-fit group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <Brain size={32} className="text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
              </div>
              <CardTitle className="text-gray-200 group-hover:text-cyan-400 transition-colors duration-300">
                Memory Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm">
                Test your memory by matching pairs of cards. How fast can you complete it?
              </p>
            </CardContent>
          </Card>

          <Card 
            className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer hover-glow group"
            onClick={onSelectTicTacToe}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full w-fit group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                <Grid3X3 size={32} className="text-purple-400 group-hover:text-pink-400 transition-colors duration-300" />
              </div>
              <CardTitle className="text-gray-200 group-hover:text-purple-400 transition-colors duration-300">
                Tic-Tac-Toe vs Sid
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm">
                Challenge the AI "Sid" in a classic game of Tic-Tac-Toe. Can you beat him?
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameSelector;
