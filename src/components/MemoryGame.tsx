import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, RotateCcw, Trophy, Clock, Target } from 'lucide-react';
import { VibrationManager } from '@/utils/vibrationUtils';
import { GameStatsManager, GameStats } from '@/utils/gameStats';
import ConfettiCelebration from '@/components/ConfettiCelebration';

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
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [gameTime, setGameTime] = useState(0);
  const [newRecords, setNewRecords] = useState({ moves: false, time: false });
  const [completionMessage, setCompletionMessage] = useState('');
  const [bestStats, setBestStats] = useState(GameStatsManager.getBestStats());
  const [showCelebration, setShowCelebration] = useState(false);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const symbols = ['🚀', '💻', '⚡', '🎯', '🔥', '💎', '🌟', '🎨'];

  // Timer effect
  useEffect(() => {
    if (startTime && !gameWon) {
      timerRef.current = setInterval(() => {
        setGameTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime, gameWon]);

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
    setStartTime(null);
    setGameTime(0);
    setNewRecords({ moves: false, time: false });
    setCompletionMessage('');
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
        VibrationManager.correctMatch();
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
        VibrationManager.incorrectMatch();
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
      const endTime = new Date();
      const finalTime = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : gameTime;
      
      const gameStats: GameStats = {
        moves,
        timeInSeconds: finalTime,
        completedAt: endTime
      };

      const records = GameStatsManager.saveGameStats(gameStats);
      setNewRecords({ moves: records.isNewMoveRecord, time: records.isNewTimeRecord });
      setCompletionMessage(GameStatsManager.getCompletionMessage(moves, finalTime));
      setBestStats(GameStatsManager.getBestStats());
      
      // Show celebration
      setShowCelebration(true);
      
      // Celebration vibration
      setTimeout(() => {
        VibrationManager.gameComplete(gameRef.current || undefined);
      }, 300);
      
      setGameWon(true);
    }
  }, [matchedPairs, moves, startTime, gameTime]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Start timer on first move
    if (!startTime) {
      setStartTime(new Date());
    }

    // Vibrate on card flip
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`) as HTMLElement;
    VibrationManager.cardFlip(cardElement);

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  if (!isActive) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div 
          ref={gameRef}
          className="backdrop-blur-2xl bg-black/90 border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
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
              
              @keyframes cardFlip {
                0% { transform: rotateY(0deg); }
                50% { transform: rotateY(-90deg); }
                100% { transform: rotateY(0deg); }
              }
              
              @keyframes matchGlow {
                0% { box-shadow: 0 0 0 rgba(34, 197, 94, 0); }
                50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
                100% { box-shadow: 0 0 0 rgba(34, 197, 94, 0); }
              }
              
              @keyframes bounceIn {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.05); }
                70% { transform: scale(0.9); }
                100% { transform: scale(1); opacity: 1; }
              }
              
              .card-flip {
                animation: cardFlip 0.6s ease-in-out;
              }
              
              .match-glow {
                animation: matchGlow 1s ease-out;
              }
              
              .bounce-in {
                animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
              }
            `}
          </style>

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

          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-1 text-gray-300">
              <Target size={16} className="text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Moves:</span> {moves}
            </div>
            <div className="flex items-center gap-1 text-gray-300">
              <Clock size={16} className="text-purple-400" />
              <span className="text-purple-400 font-semibold">Time:</span> {GameStatsManager.formatTime(gameTime)}
            </div>
            <div className="text-gray-300">
              <span className="text-pink-400 font-semibold">Pairs:</span> {matchedPairs}/{symbols.length}
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

          {bestStats && (
            <div className="mb-6 p-3 rounded-xl backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20">
              <div className="flex justify-between items-center text-sm">
                <span className="text-cyan-400">Best: {bestStats.bestMoves} moves</span>
                <span className="text-purple-400">Best: {GameStatsManager.formatTime(bestStats.bestTime)}</span>
                <span className="text-pink-400">Games: {bestStats.gamesPlayed}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-3 mb-6">
            {cards.map((card) => (
              <Card
                key={card.id}
                data-card-id={card.id}
                className={`aspect-square cursor-pointer transition-all duration-300 border-2 transform hover:scale-105 ${
                  card.isMatched
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50 match-glow'
                    : card.isFlipped
                    ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/50 card-flip'
                    : 'bg-black/50 border-white/20 hover:border-purple-400/50 hover:bg-white/10'
                }`}
                onClick={() => handleCardClick(card.id)}
              >
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className={`text-3xl ${card.isFlipped || card.isMatched ? 'bounce-in' : ''}`}>
                    {card.isFlipped || card.isMatched ? card.symbol : '?'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {gameWon && (
            <div className="text-center p-6 rounded-xl backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 animate-scale-in">
              <Trophy className="text-yellow-400 mx-auto mb-2" size={32} />
              
              {(newRecords.moves || newRecords.time) && (
                <div className="mb-3 p-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                  <h4 className="text-xl font-bold text-yellow-400 mb-1">🎉 NEW RECORD! 🎉</h4>
                  <div className="text-sm text-yellow-300">
                    {newRecords.moves && <div>New best moves: {moves}!</div>}
                    {newRecords.time && <div>New best time: {GameStatsManager.formatTime(gameTime)}!</div>}
                  </div>
                </div>
              )}
              
              <h4 className="text-xl font-bold text-green-400 mb-2">{completionMessage}</h4>
              <div className="text-gray-300 mb-4">
                <p>Completed in <span className="text-cyan-400 font-semibold">{moves}</span> moves</p>
                <p>Time: <span className="text-purple-400 font-semibold">{GameStatsManager.formatTime(gameTime)}</span></p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={initializeGame}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                >
                  Play Again
                </Button>
                <Button
                  onClick={onComplete}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confetti celebration */}
      <ConfettiCelebration 
        isActive={showCelebration}
        onComplete={() => setShowCelebration(false)}
        intensity={newRecords.moves || newRecords.time ? 'high' : 'normal'}
      />
    </>
  );
};

export default MemoryGame;
