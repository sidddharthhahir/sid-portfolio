import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProfileProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const MagneticProfile = ({ children, onClick }: MagneticProfileProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDistance = 300;

      if (distance < maxDistance) {
        const strength = 1 - distance / maxDistance;
        x.set(distX * strength * 0.3);
        y.set(distY * strength * 0.3);
        rotateY.set(distX * strength * 0.08);
        rotateX.set(-distY * strength * 0.08);
      } else {
        x.set(0);
        y.set(0);
        rotateX.set(0);
        rotateY.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      rotateX.set(0);
      rotateY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        perspective: 800,
      }}
      onClick={onClick}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default MagneticProfile;
