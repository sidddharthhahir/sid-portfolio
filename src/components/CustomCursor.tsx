import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A two-part cursor (tight dot + trailing ring) that grows over anything
 * marked data-cursor-hover. Fine-pointer devices only — never shown on
 * touch, and skipped entirely under prefers-reduced-motion.
 */
export const CustomCursor = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches && !reduce);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('custom-cursor-active');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(!!(e.target as HTMLElement)?.closest('[data-cursor-hover]'));
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[300] rounded-full bg-cyan-400"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', pointerEvents: 'none' }}
        animate={{ width: hovering ? 8 : 6, height: hovering ? 8 : 6 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[299] rounded-full border border-cyan-400/50"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', pointerEvents: 'none' }}
        animate={{ width: hovering ? 52 : 32, height: hovering ? 52 : 32, opacity: hovering ? 0.8 : 0.4 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
};
