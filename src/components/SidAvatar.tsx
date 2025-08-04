
import { useState, useEffect } from 'react';
import { SidMessage } from '@/utils/sidPersonality';

interface SidAvatarProps {
  message?: SidMessage | null;
  isThinking?: boolean;
  className?: string;
  onTripleClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SidAvatar = ({ 
  message = null, 
  isThinking = false, 
  className = '', 
  onTripleClick,
  size = 'md'
}: SidAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl', 
    xl: 'text-4xl'
  };

  useEffect(() => {
    if (message) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClick = () => {
    if (!onTripleClick) return;

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    if (newClickCount === 3) {
      onTripleClick();
      setClickCount(0);
      setClickTimeout(null);
    } else {
      const timeout = setTimeout(() => {
        setClickCount(0);
        setClickTimeout(null);
      }, 500);
      setClickTimeout(timeout);
    }
  };

  const getAvatarExpression = () => {
    if (isThinking) return '🤔';
    if (!message) return '🤖';
    
    switch (message.mood) {
      case 'confident':
        return '😎';
      case 'surprised':
        return '😲';
      case 'playful':
        return '😏';
      case 'encouraging':
        return '😊';
      case 'celebrating':
        return '🎉';
      case 'thinking':
        return '🤔';
      default:
        return '🤖';
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        className={`relative flex items-center justify-center ${sizeClasses[size]} rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 transition-all duration-500 ${
          isAnimating ? 'scale-110 shadow-lg shadow-purple-400/20' : 'scale-100'
        } ${isThinking ? 'animate-pulse' : ''} ${onTripleClick ? 'cursor-pointer hover:scale-105' : ''}`}
        onClick={handleClick}
      >
        <div className={`${textSizeClasses[size]} transition-transform duration-300 ${
          isAnimating ? 'scale-125' : 'scale-100'
        }`}>
          {getAvatarExpression()}
        </div>
        
        {isThinking && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-60" />
        )}
      </div>

      {message && (
        <div className={`max-w-xs p-3 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 transition-all duration-500 ${
          isAnimating ? 'opacity-100 transform translate-x-0' : 'opacity-90 transform translate-x-1'
        }`}>
          <p className="text-sm text-gray-200">
            {message.text} {message.emoji}
          </p>
        </div>
      )}
    </div>
  );
};

export default SidAvatar;
