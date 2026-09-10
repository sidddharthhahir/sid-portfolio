import { useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/** Perspective tilt + a cursor-follow spotlight, both driven by pointer position within the card. */
export const TiltCard = ({ children, className }: TiltCardProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 220, damping: 22 });
  const glowX = useTransform(px, v => `${v * 100}%`);
  const glowY = useTransform(py, v => `${v * 100}%`);
  const background = useMotionTemplate`radial-gradient(280px circle at ${glowX} ${glowY}, rgba(34,211,238,0.14), transparent 65%)`;

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      data-cursor-hover
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative ${className ?? ''}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg z-10"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
};
