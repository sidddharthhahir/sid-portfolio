import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModeToggle } from '@/components/ModeToggle';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Github, Linkedin, Mail, Download, Gamepad2 } from 'lucide-react';
import GameSelector from '@/components/GameSelector';
import MemoryGame from '@/components/MemoryGame';
import TicTacToeGame from '@/components/TicTacToeGame';
import EndlessRunner from '@/components/EndlessRunner';
import TripleClickHint from '@/components/TripleClickHint';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [isGameSelectorOpen, setGameSelectorOpen] = useState(false);
  const [isMemoryGameActive, setIsMemoryGameActive] = useState(false);
  const [isTicTacToeGameActive, setIsTicTacToeGameActive] = useState(false);
  const [isEndlessRunnerActive, setIsEndlessRunnerActive] = useState(false);
  const [tripleClickCount, setTripleClickCount] = useState(0);
  const [showTripleClickHint, setShowTripleClickHint] = useState(true);
  const router = useRouter();
  const avatarRef = useRef<HTMLImageElement>(null);

  // Detect triple click
  const handleTripleClick = () => {
    setTripleClickCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    if (tripleClickCount >= 3) {
      setGameSelectorOpen(true);
      setTripleClickCount(0); // Reset counter
      setShowTripleClickHint(false); // Dismiss the hint
    }
  }, [tripleClickCount]);

  // Close game selector
  const closeGameSelector = () => {
    setGameSelectorOpen(false);
  };

  // Game selection handlers
  const selectMemoryGame = () => {
    setIsMemoryGameActive(true);
    setGameSelectorOpen(false);
  };

  const selectTicTacToe = () => {
    setIsTicTacToeGameActive(true);
    setGameSelectorOpen(false);
  };

  const selectEndlessRunner = () => {
    setIsEndlessRunnerActive(true);
    setGameSelectorOpen(false);
  };

  // Game completion handlers
  const completeMemoryGame = () => {
    setIsMemoryGameActive(false);
  };

  const completeTicTacToeGame = () => {
    setIsTicTacToeGameActive(false);
  };

  const completeEndlessRunner = () => {
    setIsEndlessRunnerActive(false);
  };

  // Dismiss triple click hint
  const dismissTripleClickHint = () => {
    setShowTripleClickHint(false);
  };

  // Theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const { resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-sm bg-black/50 border-b border-white/5">
        <div className="container max-w-6xl mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-cyan-400" />
              <span className="font-bold text-gray-100">Siddharth Ahir</span>
            </div>
            <div className="flex items-center space-x-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 relative inline-block group">
              <div 
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mx-auto transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-cyan-500/20 group-hover:scale-105 relative"
                onClick={handleTripleClick}
                style={{ cursor: 'pointer' }}
              >
                {/* Professional vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-full z-10"></div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                
                <img 
                  src="https://i.postimg.cc/2S8B2QfK/IMG-1772.jpg"
                  alt="Siddharth Ahir - Professional Headshot"
                  className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110"
                  style={{ 
                    filter: 'contrast(1.1) brightness(1.05) saturate(1.1)',
                    imageRendering: 'crisp-edges'
                  }}
                />
                
                {/* Professional border highlight */}
                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-cyan-400/30 transition-colors duration-500"></div>
              </div>
              
              {/* Subtle shadow enhancement */}
              <div className="absolute inset-0 rounded-full shadow-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" style={{ filter: 'blur(20px)', background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }}></div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hi, I'm Siddharth Ahir
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-8">
              A passionate full-stack developer crafting digital experiences with code.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a href="https://github.com/Siddharth-Ahir" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/siddharth-ahir/" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
              </a>
              <a href="mailto:ahir.siddharth@outlook.com">
                <Button variant="secondary" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </a>
              <Button variant="outline" size="lg" onClick={() => router.push('/resume.pdf')} >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-6">About Me</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              I am a full-stack developer with a passion for creating innovative and user-friendly web applications.
              With a background in computer science and years of experience in the industry, I bring a unique blend
              of technical expertise and creative problem-solving skills to every project.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              My expertise lies in developing scalable and maintainable applications using technologies such as React,
              Node.js, and Next.js. I am also experienced in database design and management, cloud deployment, and
              agile development methodologies.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I am always eager to learn new technologies and stay up-to-date with the latest industry trends.
              I believe that continuous learning is essential for delivering the best possible solutions to my clients.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project 1 */}
              <Card className="bg-black/50 border border-white/10">
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">Portfolio Website</h3>
                  <p className="text-gray-400">
                    A personal portfolio website built with Next.js and Tailwind CSS.
                  </p>
                  <Button variant="link" className="mt-4">
                    <a href="https://github.com/Siddharth-Ahir/portfolio" target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </Card>

              {/* Project 2 */}
              <Card className="bg-black/50 border border-white/10">
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">AI Tic-Tac-Toe</h3>
                  <p className="text-gray-400">
                    A classic tic-tac-toe game with an unbeatable AI opponent.
                  </p>
                  <Button variant="link" className="mt-4">
                    <a href="https://github.com/Siddharth-Ahir" target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </Card>

              {/* Project 3 */}
              <Card className="bg-black/50 border border-white/10">
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">Memory Game</h3>
                  <p className="text-gray-400">
                    A fun memory game built with React.
                  </p>
                  <Button variant="link" className="mt-4">
                    <a href="https://github.com/Siddharth-Ahir" target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-white mb-6">Contact</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Feel free to reach out to me for any questions or opportunities.
            </p>
            <div>
              <a href="mailto:ahir.siddharth@outlook.com">
                <Button variant="secondary" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  ahir.siddharth@outlook.com
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* GameSelector Modal */}
      <GameSelector
        isOpen={isGameSelectorOpen}
        onClose={closeGameSelector}
        onSelectMemoryGame={selectMemoryGame}
        onSelectTicTacToe={selectTicTacToe}
        onSelectEndlessRunner={selectEndlessRunner}
      />

      {/* Games */}
      <MemoryGame isActive={isMemoryGameActive} onComplete={completeMemoryGame} />
      <TicTacToeGame isActive={isTicTacToeGameActive} onComplete={completeTicTacToeGame} />
      <EndlessRunner isActive={isEndlessRunnerActive} onComplete={completeEndlessRunner} />

      {/* Triple Click Hint */}
      <TripleClickHint isVisible={showTripleClickHint} onDismiss={dismissTripleClickHint} />
    </div>
  );
};

export default Index;
