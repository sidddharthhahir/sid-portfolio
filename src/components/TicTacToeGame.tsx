
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, RotateCcw, Brain, User } from 'lucide-react';
import { VibrationManager } from '@/utils/vibrationUtils';

interface TicTacToeGameProps {
  isActive: boolean;
  onComplete: () => void;
}

type Player = 'X' | 'O' | null;
type GameStatus = 'playing' | 'won' | 'lost' | 'draw';

const TicTacToeGame = ({ isActive, onComplete }: TicTacToeGameProps) => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'user' | 'ai'>('user');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [gameMessage, setGameMessage] = useState('Your turn!');
  
  const gameRef = useRef<HTMLDivElement>(null);

  // Check for winner
  const checkWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Check if board is full
  const isBoardFull = (squares: Player[]): boolean => {
    return squares.every(square => square !== null);
  };

  // Minimax algorithm for AI
  const minimax = (squares: Player[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(squares);
    
    if (winner === 'O') return 10 - depth; // AI wins
    if (winner === 'X') return depth - 10; // User wins
    if (isBoardFull(squares)) return 0; // Draw

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          const score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // Get best move for AI
  const getBestMove = (squares: Player[]): number => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        const score = minimax(squares, 0, false);
        squares[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  // Handle user move
  const handleCellClick = (index: number) => {
    if (board[index] !== null || currentPlayer !== 'user' || gameStatus !== 'playing') {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    // Vibrate on user move
    const cellElement = document.querySelector(`[data-cell-index="${index}"]`) as HTMLElement;
    VibrationManager.cardFlip(cellElement);

    const winner = checkWinner(newBoard);
    if (winner === 'X') {
      setGameStatus('won');
      setGameMessage('You win! 🎉');
      VibrationManager.gameComplete(gameRef.current || undefined);
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameStatus('draw');
      setGameMessage("It's a draw! 🤝");
      VibrationManager.incorrectMatch();
      return;
    }

    setCurrentPlayer('ai');
    setGameMessage('Sid is thinking...');
    setIsAiThinking(true);
  };

  // AI move effect
  useEffect(() => {
    if (currentPlayer === 'ai' && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove !== -1) {
          const newBoard = [...board];
          newBoard[bestMove] = 'O';
          setBoard(newBoard);

          // Vibrate on AI move
          VibrationManager.cardFlip();

          const winner = checkWinner(newBoard);
          if (winner === 'O') {
            setGameStatus('lost');
            setGameMessage('Sid wins! 🤖');
            VibrationManager.incorrectMatch();
          } else if (isBoardFull(newBoard)) {
            setGameStatus('draw');
            setGameMessage("It's a draw! 🤝");
            VibrationManager.incorrectMatch();
          } else {
            setCurrentPlayer('user');
            setGameMessage('Your turn!');
          }
        }
        setIsAiThinking(false);
      }, 1000); // AI thinking delay

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, gameStatus]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('user');
    setGameStatus('playing');
    setGameMessage('Your turn!');
    setIsAiThinking(false);
  };

  useEffect(() => {
    if (isActive) {
      resetGame();
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        ref={gameRef}
        className="backdrop-blur-2xl bg-black/90 border border-white/20 rounded-3xl p-8 max-w-lg w-full animate-scale-in"
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
            
            @keyframes cellPop {
              0% { transform: scale(0); }
              70% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            
            @keyframes winningGlow {
              0% { box-shadow: 0 0 0 rgba(34, 197, 94, 0); }
              50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
              100% { box-shadow: 0 0 0 rgba(34, 197, 94, 0); }
            }
            
            .cell-pop {
              animation: cellPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .winning-glow {
              animation: winningGlow 2s ease-out infinite;
            }
          `}
        </style>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Tic-Tac-Toe vs Sid
            </h3>
            <p className="text-gray-300 text-sm mt-1">Beat the AI if you can!</p>
          </div>
          <Button
            onClick={onComplete}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 p-2"
            size="sm"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <User size={20} />
              <span className="font-semibold">You: X</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2 text-purple-400">
              <Brain size={20} />
              <span className="font-semibold">Sid: O</span>
            </div>
          </div>
          
          <div className={`text-lg font-semibold transition-all duration-300 ${
            gameStatus === 'won' ? 'text-green-400' :
            gameStatus === 'lost' ? 'text-red-400' :
            gameStatus === 'draw' ? 'text-yellow-400' :
            isAiThinking ? 'text-purple-400' : 'text-cyan-400'
          }`}>
            {gameMessage}
            {isAiThinking && (
              <span className="inline-block animate-pulse ml-1">🤔</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 max-w-xs mx-auto">
          {board.map((cell, index) => (
            <Card
              key={index}
              data-cell-index={index}
              className={`aspect-square cursor-pointer transition-all duration-300 border-2 ${
                cell === null 
                  ? 'bg-black/50 border-white/20 hover:border-purple-400/50 hover:bg-white/10' 
                  : cell === 'X'
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/50'
                  : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50'
              } ${gameStatus === 'won' && cell === 'X' ? 'winning-glow' : ''}`}
              onClick={() => handleCellClick(index)}
            >
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className={`text-4xl font-bold transition-all duration-300 ${
                  cell === 'X' ? 'text-cyan-400' : cell === 'O' ? 'text-purple-400' : ''
                } ${cell ? 'cell-pop' : ''}`}>
                  {cell || ''}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={resetGame}
            className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20"
          >
            <RotateCcw size={16} className="mr-2" />
            Restart Game
          </Button>
          {gameStatus !== 'playing' && (
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Close Game
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacToeGame;
