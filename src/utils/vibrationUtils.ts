
// Vibration utility with compatibility checks and graceful fallbacks
export class VibrationManager {
  private static isSupported = 'vibrate' in navigator;
  private static lastVibrationTime = 0;
  private static readonly DEBOUNCE_TIME = 50; // ms

  // Check if vibration is supported
  static isVibrationSupported(): boolean {
    return this.isSupported && typeof navigator.vibrate === 'function';
  }

  // Safe vibration with debouncing and fallback
  static vibrate(pattern: number | number[], fallbackElement?: HTMLElement): void {
    const now = Date.now();
    
    // Debounce rapid vibration calls
    if (now - this.lastVibrationTime < this.DEBOUNCE_TIME) {
      return;
    }
    
    this.lastVibrationTime = now;

    if (this.isVibrationSupported()) {
      try {
        // Ensure pattern is valid
        const validPattern = Array.isArray(pattern) ? pattern : [pattern];
        navigator.vibrate(validPattern);
      } catch (error) {
        console.warn('Vibration failed:', error);
        this.fallbackFeedback(fallbackElement);
      }
    } else {
      // Graceful fallback with visual feedback
      this.fallbackFeedback(fallbackElement);
    }
  }

  // Visual fallback feedback
  private static fallbackFeedback(element?: HTMLElement): void {
    if (!element) return;
    
    // Add pulse animation as fallback
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = 'pulse 0.3s ease-out';
    
    // Clean up animation
    setTimeout(() => {
      element.style.animation = '';
    }, 300);
  }

  // Specific vibration patterns for different actions
  static profileClick(element?: HTMLElement): void {
    this.vibrate([40], element);
  }

  static gameReveal(element?: HTMLElement): void {
    this.vibrate([100, 50, 100], element);
  }

  static cardFlip(element?: HTMLElement): void {
    this.vibrate([30], element);
  }

  static correctMatch(element?: HTMLElement): void {
    this.vibrate([80, 40, 80], element);
  }

  static incorrectMatch(element?: HTMLElement): void {
    this.vibrate([150, 50, 150], element);
  }

  static gameComplete(element?: HTMLElement): void {
    this.vibrate([200, 100, 200, 100, 300], element);
  }
}
