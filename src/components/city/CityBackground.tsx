import { useScroll, useTransform, useReducedMotion, motion } from 'framer-motion';

/** Calm, minimal backdrop: deep gradient plus two very soft drifting glows. */
export const CityBackground = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const glowA = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : -120]);
  const glowB = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : -60]);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#080d18] to-[#060a12]" />
      <motion.div style={{ y: glowA }} className="absolute -top-24 left-1/4 w-[32rem] h-[32rem] rounded-full bg-blue-500/[0.06] blur-3xl" />
      <motion.div style={{ y: glowB }} className="absolute bottom-0 right-1/5 w-96 h-96 rounded-full bg-cyan-500/[0.05] blur-3xl" />
    </div>
  );
};
