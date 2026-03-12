import { motion } from 'framer-motion';
import { Sparkles, Bot } from 'lucide-react';
import MovieRecommendationAI from '@/components/MovieRecommendationAI';
import PortfolioAIChat from '@/components/PortfolioAIChat';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const TheaterRoom = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={item} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400/80 mb-3">Live Demos</p>
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">The Theater</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Interactive AI demos — try them out live</p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div variants={item}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">AI Movie Recommendation Engine</h3>
            </div>
            <p className="text-muted-foreground mb-6 ml-[52px]">Enter a movie you like and the AI will recommend similar movies.</p>
            <MovieRecommendationAI />
          </motion.div>

          <motion.div variants={item}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Ask AI About My Projects</h3>
            </div>
            <p className="text-muted-foreground mb-6 ml-[52px]">Ask this AI anything about the projects in this portfolio.</p>
            <PortfolioAIChat />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TheaterRoom;
