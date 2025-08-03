
import { useState, useEffect } from 'react';

interface ProfileHintProps {
  show: boolean;
  onDismiss: () => void;
}

const ProfileHint = ({ show, onDismiss }: ProfileHintProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  useEffect(() => {
    if (isVisible) {
      const dismissTimer = setTimeout(() => {
        setIsVisible(false);
        onDismiss();
      }, 8000); // Auto-dismiss after 8 seconds

      return () => clearTimeout(dismissTimer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="animate-pulse">👆</span>
          <span>Psst... Try clicking me 3 times for a surprise!</span>
          <button 
            onClick={() => {
              setIsVisible(false);
              onDismiss();
            }}
            className="ml-2 text-white/80 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
        {/* Arrow pointing down */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-purple-600"></div>
      </div>
    </div>
  );
};

export default ProfileHint;
