import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BookOpen } from 'lucide-react';

const learningItems = [
  { topic: 'Multi-Agent Systems', emoji: '🤖' },
  { topic: 'Fine-tuning LLMs', emoji: '🧠' },
  { topic: 'Vector Databases (Pinecone)', emoji: '📌' },
  { topic: 'LangChain & LangGraph', emoji: '🔗' },
  { topic: 'MLOps & Model Serving', emoji: '🚀' },
  { topic: 'Transformer Architectures', emoji: '⚡' },
];

const CurrentlyLearning = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % learningItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-2xl bg-black/40 border border-white/15 hover:border-emerald-400/30 transition-all duration-500">
      <div className="flex items-center gap-2 text-emerald-400">
        <BookOpen size={16} />
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Now exploring</span>
      </div>
      <div className="h-4 w-px bg-white/20" />
      <div className="relative h-6 overflow-hidden min-w-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center gap-2"
          >
            <span>{learningItems[currentIndex].emoji}</span>
            <span className="text-sm font-medium text-gray-200 whitespace-nowrap">
              {learningItems[currentIndex].topic}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CurrentlyLearning;
