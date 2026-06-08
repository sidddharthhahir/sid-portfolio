import { useScroll, useTransform, useReducedMotion, motion } from 'framer-motion';

export const CityBackground = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const skylineY = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : -180]);
  const glow1Y   = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : -100]);
  const glow2Y   = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : -60]);
  const glow3Y   = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : -140]);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#080d1a] to-[#060c18]" />
      <motion.div style={{ y: skylineY }} className="city-skyline absolute bottom-0 left-0 right-0 h-52 opacity-30" />
      {!reduce && <div className="rain-container absolute inset-0 opacity-40" />}
      <motion.div style={{ y: glow1Y }} className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/8 blur-3xl animate-pulse" />
      <motion.div style={{ y: glow2Y }} className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-cyan-500/6 blur-3xl animate-pulse" />
      <motion.div style={{ y: glow3Y }} className="absolute bottom-1/3 left-1/2 w-48 h-48 rounded-full bg-purple-500/6 blur-3xl animate-pulse" />
    </div>
  );
};
