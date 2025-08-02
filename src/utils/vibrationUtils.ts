
// Vibration patterns for different game actions
export const vibrationPatterns = {
  profileClick: [50, 30, 50],
  gameReveal: [100, 50, 100, 50, 200],
  cardFlip: [30, 30],
  pairMatch: [100, 50, 100],
  pairMismatch: [200, 50, 50, 50, 200],
  gameComplete: [200, 100, 200, 100, 300],
  newRecord: [300, 100, 300, 100, 300, 100, 500]
};

export const playVibration = (pattern: number[]) => {
  if ('vibrate' in navigator && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

export const vibrate = {
  profileClick: () => playVibration(vibrationPatterns.profileClick),
  gameReveal: () => playVibration(vibrationPatterns.gameReveal),
  cardFlip: () => playVibration(vibrationPatterns.cardFlip),
  pairMatch: () => playVibration(vibrationPatterns.pairMatch),
  pairMismatch: () => playVibration(vibrationPatterns.pairMismatch),
  gameComplete: () => playVibration(vibrationPatterns.gameComplete),
  newRecord: () => playVibration(vibrationPatterns.newRecord)
};
