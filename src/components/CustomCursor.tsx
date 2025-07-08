import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.style.cursor === 'pointer' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  // Smooth cursor movement
  useEffect(() => {
    const animateCursor = () => {
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }));
    };

    const interval = setInterval(animateCursor, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePosition]);

  // Smooth dot movement within cursor
  useEffect(() => {
    const animateDot = () => {
      const maxOffset = 8; // Maximum distance dot can move from center
      const targetX = (mousePosition.x - cursorPosition.x) * 0.3;
      const targetY = (mousePosition.y - cursorPosition.y) * 0.3;
      
      // Clamp to circle bounds
      const distance = Math.sqrt(targetX * targetX + targetY * targetY);
      const clampedX = distance > maxOffset ? (targetX / distance) * maxOffset : targetX;
      const clampedY = distance > maxOffset ? (targetY / distance) * maxOffset : targetY;

      setDotPosition(prev => ({
        x: prev.x + (clampedX - prev.x) * 0.15,
        y: prev.y + (clampedY - prev.y) * 0.15
      }));
    };

    const interval = setInterval(animateDot, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePosition, cursorPosition]);

  // Hide default cursor globally
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Custom Cursor Circle */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-200 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: cursorPosition.x - 16,
          top: cursorPosition.y - 16,
          width: '32px',
          height: '32px',
        }}
      >
        {/* Outer circle */}
        <div className={`w-full h-full rounded-full border-2 transition-all duration-200 ${
          isHovering 
            ? 'border-cyan-400 bg-cyan-400/10' 
            : 'border-white/30 bg-white/5'
        }`} />
        
        {/* Inner dot */}
        <div
          className={`absolute w-2 h-2 rounded-full transition-all duration-200 ${
            isHovering ? 'bg-cyan-400' : 'bg-white/80'
          }`}
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${dotPosition.x}px), calc(-50% + ${dotPosition.y}px))`,
          }}
        />
      </div>

      {/* Larger hover effect for interactive elements */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9998] rounded-full border border-cyan-400/30 bg-cyan-400/5 transition-all duration-300"
          style={{
            left: cursorPosition.x - 24,
            top: cursorPosition.y - 24,
            width: '48px',
            height: '48px',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;