
import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import SidAvatar from '@/components/SidAvatar';
import GameSelector from '@/components/GameSelector';
import MemoryGame from '@/components/MemoryGame';
import TicTacToeGame from '@/components/TicTacToeGame';
import EndlessRunnerGame from '@/components/EndlessRunnerGame';
import { VibrationManager } from '@/utils/vibrationUtils';
import ProfileHint from '@/components/ProfileHint';

export default function Index() {
  const [clickCount, setClickCount] = useState(0);
  const [gameSelector, setGameSelector] = useState(false);
  const [memoryGame, setMemoryGame] = useState(false);
  const [ticTacToe, setTicTacToe] = useState(false);
  const [endlessRunner, setEndlessRunner] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handleProfileClick = () => {
    setClickCount(prevCount => prevCount + 1);
    VibrationManager.profileClick();
  };

  useEffect(() => {
    if (clickCount >= 3) {
      setGameSelector(true);
      setClickCount(0); // Reset click count after opening the selector
    }
  }, [clickCount]);

  const handleGameSelection = useCallback(() => {
    setGameSelector(false);
  }, []);

  const handleMemoryGame = useCallback(() => {
    setMemoryGame(true);
    handleGameSelection();
  }, [handleGameSelection]);

  const handleTicTacToe = useCallback(() => {
    setTicTacToe(true);
    handleGameSelection();
  }, [handleGameSelection]);

  const handleEndlessRunner = useCallback(() => {
    setEndlessRunner(true);
    handleGameSelection();
  }, [handleGameSelection]);

  const handleCloseGame = () => {
    setMemoryGame(false);
    setTicTacToe(false);
    setEndlessRunner(false);
  };

  const handleHintDismiss = () => {
    setShowHint(false);
    localStorage.setItem('profile-hint-dismissed', 'true');
  };

  // In useEffect, add hint management
  useEffect(() => {
    const hintDismissed = localStorage.getItem('profile-hint-dismissed');
    if (hintDismissed) {
      setShowHint(false);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Sid Portfolio - Games</title>
        <meta name="description" content="Interactive portfolio with hidden games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <div className="relative">
          <div 
            className={`cursor-pointer transition-all duration-300 ${
              clickCount > 0 ? 'animate-pulse' : ''
            }`}
            onClick={handleProfileClick}
          >
            <SidAvatar message={null} />
          </div>
          <ProfileHint 
            show={showHint && !gameSelector && !memoryGame && !ticTacToe && !endlessRunner} 
            onDismiss={handleHintDismiss} 
          />
        </div>

        <GameSelector
          isOpen={gameSelector}
          onClose={handleGameSelection}
          onSelectMemoryGame={handleMemoryGame}
          onSelectTicTacToe={handleTicTacToe}
          onSelectEndlessRunner={handleEndlessRunner}
        />

        <MemoryGame isActive={memoryGame} onComplete={handleCloseGame} />
        <TicTacToeGame isActive={ticTacToe} onComplete={handleCloseGame} />
        <EndlessRunnerGame isActive={endlessRunner} onComplete={handleCloseGame} />
      </main>
    </>
  )
}
