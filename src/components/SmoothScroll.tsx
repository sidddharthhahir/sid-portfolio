import { useEffect, type PropsWithChildren } from 'react';
import Lenis from 'lenis';

/**
 * Inertia-smoothed scrolling. No-ops entirely when the viewer has
 * requested reduced motion — native scroll behaviour is left untouched.
 */
export const SmoothScroll = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
