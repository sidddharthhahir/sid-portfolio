import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gamepad2, Brain, Grid3X3, Zap } from 'lucide-react';
import MemoryGame from '@/components/MemoryGame';
import TicTacToeGame from '@/components/TicTacToeGame';
import EndlessRunnerGame from '@/components/EndlessRunnerGame';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const games = [
  { id: 'memory', label: 'Memory Game', icon: Brain, description: 'Test your memory by matching pairs', color: 'from-pink-500 to-rose-500' },
  { id: 'tictactoe', label: 'Tic Tac Toe', icon: Grid3X3, description: 'Classic strategy game vs AI', color: 'from-rose-500 to-orange-500' },
  { id: 'runner', label: 'Endless Runner', icon: Zap, description: 'How far can you go?', color: 'from-orange-500 to-yellow-500' },
];

const GameRoom = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={item} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-400/80 mb-3">Entertainment Zone</p>
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400">Game Room</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Take a break and play some games 🎮</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {games.map((game) => (
            <motion.div key={game.id} variants={item}>
              <Card className="glass-hover cursor-pointer group h-full" onClick={() => setActiveGame(game.id)}>
                <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <game.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-pink-400 transition-colors">{game.label}</h3>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                  <Button variant="outline" className="glass hover:border-pink-500/30 mt-2">
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <MemoryGame isActive={activeGame === 'memory'} onComplete={() => setActiveGame(null)} />
      <TicTacToeGame isActive={activeGame === 'tictactoe'} onComplete={() => setActiveGame(null)} />
      <EndlessRunnerGame isActive={activeGame === 'runner'} onComplete={() => setActiveGame(null)} />
    </div>
  );
};

export default GameRoom;
