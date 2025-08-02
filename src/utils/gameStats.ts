
interface GameStats {
  bestMoves: number | null;
  bestTime: number | null;
  gamesPlayed: number;
  lastPlayed: string | null;
}

const STORAGE_KEY = 'memory_game_stats';

export const getGameStats = (): GameStats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load game stats:', error);
  }
  
  return {
    bestMoves: null,
    bestTime: null,
    gamesPlayed: 0,
    lastPlayed: null
  };
};

export const saveGameStats = (moves: number, timeInSeconds: number): { isNewRecord: boolean; recordType: string | null } => {
  const currentStats = getGameStats();
  let isNewRecord = false;
  let recordType: string | null = null;

  const newStats: GameStats = {
    ...currentStats,
    gamesPlayed: currentStats.gamesPlayed + 1,
    lastPlayed: new Date().toISOString()
  };

  // Check for new move record
  if (currentStats.bestMoves === null || moves < currentStats.bestMoves) {
    newStats.bestMoves = moves;
    isNewRecord = true;
    recordType = recordType ? 'both' : 'moves';
  }

  // Check for new time record
  if (currentStats.bestTime === null || timeInSeconds < currentStats.bestTime) {
    newStats.bestTime = timeInSeconds;
    isNewRecord = true;
    recordType = recordType === 'moves' ? 'both' : 'time';
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
  } catch (error) {
    console.error('Failed to save game stats:', error);
  }

  return { isNewRecord, recordType };
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
