
import { useState, useEffect } from 'react';
import { Gamepad2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TripleClickHintProps {
  isVisible: boolean;
  onDismiss: () => void;
}

const TripleClickHint = ({ isVisible, onDismiss }: TripleClickHintProps) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldShow(true), 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, [isVisible]);

  if (!shouldShow || !isVisible) return null;

  return (
    <>
      <style>
        {`
          @keyframes hintPulse {
            0%, 100% { 
              opacity: 0.8; 
              transform: scale(1);
            }
            50% { 
              opacity: 1; 
              transform: scale(1.05);
            }
          }
          
          @keyframes hintSlideIn {
            0% {
              opacity: 0;
              transform: translateY(10px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .hint-pulse {
            animation: hintPulse 2s ease-in-out infinite;
          }
          
          .hint-slide-in {
            animation: hintSlideIn 0.4s ease-out forwards;
          }
        `}
      </style>

      {/* Floating hint tooltip - Updated positioning and z-index */}
      <div className="fixed top-6 right-6 z-[9999] hint-slide-in pointer-events-auto">
        <div className="backdrop-blur-2xl bg-gradient-to-r from-purple-500/90 to-pink-500/90 border border-white/20 rounded-2xl px-4 py-3 shadow-2xl max-w-xs">
          <div className="flex items-start gap-3">
            <div className="hint-pulse">
              <Gamepad2 size={20} className="text-white mt-0.5 flex-shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium leading-relaxed">
                <span className="font-bold">Psst…</span> triple-click your profile pic for a surprise! 🎮
              </p>
            </div>
            <Button
              onClick={onDismiss}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1 h-auto min-w-0 flex-shrink-0"
              variant="ghost"
              size="sm"
              aria-label="Dismiss hint"
            >
              <X size={14} />
            </Button>
          </div>
        </div>
        
        {/* Arrow pointing to avatar area - Adjusted positioning */}
        <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-500/90"></div>
      </div>

      {/* Subtle pulsing indicator near profile - Removed as it might be causing the issue */}
    </>
  );
};

export default TripleClickHint;
