
export interface GameStats {
  moves: number;
  timeInSeconds: number;
  completedAt: Date;
}

export interface BestStats {
  bestMoves: number;
  bestTime: number;
  gamesPlayed: number;
  lastPlayed: Date;
}

export class GameStatsManager {
  private static readonly STORAGE_KEY = 'memory-game-stats';

  // Get best stats from localStorage
  static getBestStats(): BestStats | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;
      
      const stats = JSON.parse(stored);
      return {
        ...stats,
        lastPlayed: new Date(stats.lastPlayed)
      };
    } catch (error) {
      console.warn('Failed to load game stats:', error);
      return null;
    }
  }

  // Save game stats and check for new records
  static saveGameStats(gameStats: GameStats): { isNewMoveRecord: boolean; isNewTimeRecord: boolean } {
    try {
      const currentBest = this.getBestStats();
      const isNewMoveRecord = !currentBest || gameStats.moves < currentBest.bestMoves;
      const isNewTimeRecord = !currentBest || gameStats.timeInSeconds < currentBest.bestTime;

      const newStats: BestStats = {
        bestMoves: isNewMoveRecord ? gameStats.moves : currentBest?.bestMoves || gameStats.moves,
        bestTime: isNewTimeRecord ? gameStats.timeInSeconds : currentBest?.bestTime || gameStats.timeInSeconds,
        gamesPlayed: (currentBest?.gamesPlayed || 0) + 1,
        lastPlayed: gameStats.completedAt
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newStats));
      
      return { isNewMoveRecord, isNewTimeRecord };
    } catch (error) {
      console.warn('Failed to save game stats:', error);
      return { isNewMoveRecord: false, isNewTimeRecord: false };
    }
  }

  // Format time for display
  static formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  }

  // Get motivational completion message
  static getCompletionMessage(moves: number, timeInSeconds: number): string {
    if (moves <= 12) {
      return "🧠 Memory Master! Incredible performance!";
    } else if (moves <= 18) {
      return "⭐ Excellent memory skills!";
    } else if (moves <= 24) {
      return "👍 Great job! Keep practicing!";
    } else if (timeInSeconds <= 60) {
      return "⚡ Speed demon! Quick thinking!";
    } else {
      return "🎯 Well done! Every game makes you better!";
    }
  }
}
