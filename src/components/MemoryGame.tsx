
import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, RotateCcw, Trophy, Clock, Target, Star, Sparkles } from 'lucide-react';
import { vibrate } from '@/utils/vibrationUtils';
import { getGameStats, saveGameStats, formatTime } from '@/utils/gameStats';

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
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [gameTime, setGameTime] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [recordType, setRecordType] = useState<string | null>(null);
  const [gameStats, setGameStats] = useState(getGameStats());
  const [isVisible, setIsVisible] = useState(false);

  const symbols = ['🚀', '💻', '⚡', '🎯', '🔥', '💎', '🌟', '🎨'];

  const initializeGame = useCallback(() => {
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
    setIsNewRecord(false);
    setRecordType(null);
    setGameStartTime(new Date());
    setGameTime(0);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStartTime && !gameWon) {
      interval = setInterval(() => {
        setGameTime(Math.floor((Date.now() - gameStartTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStartTime, gameWon]);

  // Initialize game when modal becomes active
  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      initializeGame();
      setGameStats(getGameStats());
    } else {
      setIsVisible(false);
    }
  }, [isActive, initializeGame]);

  // Handle card matching logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        vibrate.pairMatch();
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
        }, 600);
      } else {
        // No match
        vibrate.pairMismatch();
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1200);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  // Handle game completion
  useEffect(() => {
    if (matchedPairs === symbols.length && gameStartTime) {
      const finalTime = Math.floor((Date.now() - gameStartTime.getTime()) / 1000);
      setGameTime(finalTime);
      setGameWon(true);
      
      const { isNewRecord: newRecord, recordType: newRecordType } = saveGameStats(moves, finalTime);
      setIsNewRecord(newRecord);
      setRecordType(newRecordType);
      setGameStats(getGameStats());
      
      if (newRecord) {
        setTimeout(() => vibrate.newRecord(), 500);
      } else {
        setTimeout(() => vibrate.gameComplete(), 500);
      }
    }
  }, [matchedPairs, moves, gameStartTime]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    vibrate.cardFlip();
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  const getRecordMessage = () => {
    if (!isNewRecord) return null;
    
    const messages = {
      moves: "🎉 NEW MOVES RECORD! 🎉",
      time: "🎉 NEW TIME RECORD! 🎉", 
      both: "🎉 DOUBLE RECORD! 🎉"
    };
    
    return messages[recordType as keyof typeof messages] || "🎉 NEW RECORD! 🎉";
  };

  const getCompletionMessage = () => {
    if (moves <= 12) return "🧠 Memory Master! Incredible! 🧠";
    if (moves <= 16) return "🌟 Amazing Memory! Well Done! 🌟";
    if (moves <= 20) return "🎯 Great Job! Keep Practicing! 🎯";
    return "🚀 Good Start! Try Again! 🚀";
  };

  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 border border-white/20 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl transition-all duration-700 transform ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Memory Challenge
              </h3>
              <p className="text-gray-300 text-sm">Match all the pairs! 🧠</p>
            </div>
          </div>
          <Button
            onClick={onComplete}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2 hover:scale-110 transition-all duration-300"
            size="sm"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target size={16} className="text-cyan-400" />
              <span className="text-xs text-gray-400">Moves</span>
            </div>
            <span className="text-xl font-bold text-cyan-400">{moves}</span>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock size={16} className="text-purple-400" />
              <span className="text-xs text-gray-400">Time</span>
            </div>
            <span className="text-xl font-bold text-purple-400">{formatTime(gameTime)}</span>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-xs text-gray-400">Pairs</span>
            </div>
            <span className="text-xl font-bold text-yellow-400">{matchedPairs}/{symbols.length}</span>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Star size={16} className="text-green-400" />
              <span className="text-xs text-gray-400">Best</span>
            </div>
            <span className="text-sm font-bold text-green-400">
              {gameStats.bestMoves ? `${gameStats.bestMoves}m` : '--'}
            </span>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={`aspect-square cursor-pointer transition-all duration-500 border-2 transform hover:scale-105 ${
                card.isMatched
                  ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-400/60 animate-pulse scale-105 shadow-lg shadow-green-500/20'
                  : card.isFlipped
                  ? 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                  : 'bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-white/20 hover:border-purple-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20'
              }`}
              onClick={() => handleCardClick(card.id)}
              style={{
                transform: card.isFlipped || card.isMatched ? 'rotateY(0deg)' : 'rotateY(180deg)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <CardContent className="p-0 h-full flex items-center justify-center relative overflow-hidden rounded-lg">
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-600 ${
                    card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transform: 'rotateY(0deg)', backfaceVisibility: 'hidden' }}
                >
                  <span className="text-3xl md:text-4xl animate-bounce" style={{ animationDuration: '1s' }}>
                    {card.symbol}
                  </span>
                </div>
                <div 
                  className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-pink-600/20 transition-all duration-600 ${
                    card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <span className="text-2xl md:text-3xl text-purple-300">❓</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={initializeGame}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 hover:scale-105 transition-all duration-300"
            size="sm"
          >
            <RotateCcw size={16} className="mr-2" />
            New Game
          </Button>
        </div>

        {/* Win Modal */}
        {gameWon && (
          <div className="text-center p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-purple-500/20 border border-green-400/30 animate-pulse">
            <div className="mb-4">
              <Trophy className="text-yellow-400 mx-auto mb-2 animate-bounce" size={48} />
              {isNewRecord && (
                <div className="mb-2">
                  <h4 className="text-2xl font-bold text-yellow-400 mb-2 animate-pulse">
                    {getRecordMessage()}
                  </h4>
                </div>
              )}
              <h4 className="text-xl font-bold text-green-400 mb-3">
                {getCompletionMessage()}
              </h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-3">
                <div className="text-gray-300">Final Moves</div>
                <div className="text-xl font-bold text-cyan-400">{moves}</div>
                {gameStats.bestMoves && (
                  <div className="text-xs text-gray-400">Best: {gameStats.bestMoves}</div>
                )}
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-3">
                <div className="text-gray-300">Final Time</div>
                <div className="text-xl font-bold text-purple-400">{formatTime(gameTime)}</div>
                {gameStats.bestTime && (
                  <div className="text-xs text-gray-400">Best: {formatTime(gameStats.bestTime)}</div>
                )}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={initializeGame}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
              >
                <RotateCcw size={16} className="mr-2" />
                Play Again
              </Button>
              <Button
                onClick={onComplete}
                className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
