import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Grid3X3, Search, Zap } from 'lucide-react';
import MemoryGame from '@/components/MemoryGame';
import TicTacToeGame from '@/components/TicTacToeGame';
import EndlessRunnerGame from '@/components/EndlessRunnerGame';
import WordSearchGame from '@/components/WordSearchGame';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const games = [
  {
    id: 'memory',
    label: 'Memory Game',
    icon: Brain,
    description: 'Test your memory by matching pairs',
    accent: 'hsl(var(--villa-gameroom) / 0.8)',
    accentSecondary: 'hsl(var(--villa-gameroom-2) / 0.9)',
  },
  {
    id: 'tictactoe',
    label: 'Tic Tac Toe',
    icon: Grid3X3,
    description: 'Classic strategy game vs AI',
    accent: 'hsl(var(--villa-theater) / 0.82)',
    accentSecondary: 'hsl(var(--villa-theater-2) / 0.9)',
  },
  {
    id: 'wordsearch',
    label: 'Word Search',
    icon: Search,
    description: 'Find hidden project words and unlock the story behind each one',
    accent: 'hsl(var(--primary) / 0.85)',
    accentSecondary: 'hsl(var(--secondary) / 0.9)',
  },
  {
    id: 'runner',
    label: 'Endless Runner',
    icon: Zap,
    description: 'How far can you go?',
    accent: 'hsl(var(--villa-gym) / 0.84)',
    accentSecondary: 'hsl(var(--villa-library-2) / 0.92)',
  },
];

const GameRoom = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={item} className="text-center mb-16">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">Entertainment Zone</p>
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="glow-text">Game Room</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Take a break and play some games 🎮</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-6xl mx-auto">
          {games.map((game) => (
            <motion.div key={game.id} variants={item}>
              <Card className="glass-hover cursor-pointer group h-full" onClick={() => setActiveGame(game.id)}>
                <CardContent className="p-8 text-center flex flex-col items-center gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${game.accent}, ${game.accentSecondary})`,
                      boxShadow: `0 18px 32px -18px ${game.accent}`,
                    }}
                  >
                    <game.icon size={28} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">{game.label}</h3>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                  <Button variant="outline" className="glass mt-2 hover:border-primary/30">
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
      <WordSearchGame isActive={activeGame === 'wordsearch'} onComplete={() => setActiveGame(null)} />
      <EndlessRunnerGame isActive={activeGame === 'runner'} onComplete={() => setActiveGame(null)} />
    </div>
  );
};

export default GameRoom;
