
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, RotateCcw, Trophy } from 'lucide-react';

interface MemoryGameProps {
  isActive: boolean;
  onComplete: () => void;
}

interface GameCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = ({ isActive, onComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const symbols = ['🚀', '💻', '⚡', '🎯', '🔥', '💎', '🌟', '🎨'];

  const initializeGame = () => {
    const gameCards: GameCard[] = [];
    symbols.forEach((symbol, index) => {
      gameCards.push(
        { id: index * 2, symbol, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    if (isActive) {
      initializeGame();
    }
  }, [isActive]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedPairs === symbols.length) {
      setGameWon(true);
    }
  }, [matchedPairs]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="backdrop-blur-2xl bg-black/90 border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Memory Challenge
            </h3>
            <p className="text-gray-300 text-sm mt-1">Match all the pairs!</p>
          </div>
          <Button
            onClick={onComplete}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2"
            size="sm"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Moves:</span> {moves}
          </div>
          <div className="text-gray-300">
            <span className="text-purple-400 font-semibold">Pairs:</span> {matchedPairs}/{symbols.length}
          </div>
          <Button
            onClick={initializeGame}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20"
            size="sm"
          >
            <RotateCcw size={16} className="mr-2" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={`aspect-square cursor-pointer transition-all duration-300 border-2 ${
                card.isMatched
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50'
                  : card.isFlipped
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/50'
                  : 'bg-black/50 border-white/20 hover:border-purple-400/50 hover:bg-white/10'
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className="text-3xl">
                  {card.isFlipped || card.isMatched ? card.symbol : '?'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {gameWon && (
          <div className="text-center p-6 rounded-xl backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
            <Trophy className="text-yellow-400 mx-auto mb-2" size={32} />
            <h4 className="text-xl font-bold text-green-400 mb-2">Congratulations! 🎉</h4>
            <p className="text-gray-300">
              You completed the game in <span className="text-cyan-400 font-semibold">{moves}</span> moves!
            </p>
            <Button
              onClick={initializeGame}
              className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
            >
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
