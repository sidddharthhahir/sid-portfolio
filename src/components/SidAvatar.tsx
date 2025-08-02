
import { useState, useEffect } from 'react';
import { SidMessage } from '@/utils/sidPersonality';

interface SidAvatarProps {
  message: SidMessage | null;
  isThinking?: boolean;
  className?: string;
}

const SidAvatar = ({ message, isThinking = false, className = '' }: SidAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (message) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [message]);

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
        className={`relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 transition-all duration-500 ${
          isAnimating ? 'scale-110 shadow-lg shadow-purple-400/20' : 'scale-100'
        } ${isThinking ? 'animate-pulse' : ''}`}
      >
        <div className={`text-2xl transition-transform duration-300 ${
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
