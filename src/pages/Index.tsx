
import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import SidAvatar from '@/components/SidAvatar';
import GameSelector from '@/components/GameSelector';
import MemoryGame from '@/components/MemoryGame';
import TicTacToeGame from '@/components/TicTacToeGame';
import EndlessRunnerGame from '@/components/EndlessRunnerGame';
import { VibrationManager } from '@/utils/vibrationUtils';
import ProfileHint from '@/components/ProfileHint';

export default function Index() {
  const [clickCount, setClickCount] = useState(0);
  const [gameSelector, setGameSelector] = useState(false);
  const [memoryGame, setMemoryGame] = useState(false);
  const [ticTacToe, setTicTacToe] = useState(false);
  const [endlessRunner, setEndlessRunner] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handleProfileClick = () => {
    setClickCount(prevCount => prevCount + 1);
    VibrationManager.profileClick();
  };

  useEffect(() => {
    if (clickCount >= 3) {
      setGameSelector(true);
      setClickCount(0);
    }
  }, [clickCount]);

  const handleGameSelection = useCallback(() => {
    setGameSelector(false);
  }, []);

  const handleMemoryGame = useCallback(() => {
    setMemoryGame(true);
    handleGameSelection();
  }, [handleGameSelection]);

  const handleTicTacToe = useCallback(() => {
    setTicTacToe(true);
    handleGameSelection();
  }, [handleGameSelection]);

  const handleEndlessRunner = useCallback(() => {
    setEndlessRunner(true);
    handleGameSelection();
  }, [handleGameSelection]);

  const handleCloseGame = () => {
    setMemoryGame(false);
    setTicTacToe(false);
    setEndlessRunner(false);
  };

  const handleHintDismiss = () => {
    setShowHint(false);
    localStorage.setItem('profile-hint-dismissed', 'true');
  };

  useEffect(() => {
    const hintDismissed = localStorage.getItem('profile-hint-dismissed');
    if (hintDismissed) {
      setShowHint(false);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Sid Portfolio - Games</title>
        <meta name="description" content="Interactive portfolio with hidden games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        {/* Header */}
        <header className="relative z-10 p-6">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-2xl font-bold text-white">Siddharth Ahir</div>
            <div className="hidden md:flex space-x-8 text-gray-300">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Full Stack Developer
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                Crafting digital experiences with modern web technologies
              </p>
            </div>

            {/* Avatar with Easter Egg */}
            <div className="relative mb-12">
              <div 
                className={`cursor-pointer transition-all duration-300 ${
                  clickCount > 0 ? 'animate-pulse' : ''
                }`}
                onClick={handleProfileClick}
              >
                <SidAvatar message={null} />
              </div>
              <ProfileHint 
                show={showHint && !gameSelector && !memoryGame && !ticTacToe && !endlessRunner} 
                onDismiss={handleHintDismiss} 
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                View My Work
              </button>
              <button className="px-8 py-3 border border-purple-400 text-purple-300 font-semibold rounded-full hover:bg-purple-500/10 transition-all duration-300">
                Get In Touch
              </button>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">About Me</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                I'm a passionate full-stack developer with expertise in modern web technologies. 
                I love creating interactive experiences and solving complex problems through code.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Frontend</h3>
                  <p className="text-gray-300">React, TypeScript, Tailwind CSS, Next.js</p>
                </div>
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Backend</h3>
                  <p className="text-gray-300">Node.js, Python, PostgreSQL, Supabase</p>
                </div>
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Tools</h3>
                  <p className="text-gray-300">Git, Docker, AWS, Vercel</p>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20 px-4 sm:px-8 bg-black/20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Skills & Technologies</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'Tailwind', 'Next.js', 'Supabase', 'Vite'].map((skill) => (
                  <div key={skill} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-purple-400/50 transition-all duration-300">
                    <div className="text-sm font-medium text-gray-300">{skill}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((project) => (
                  <div key={project} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-purple-400/50 transition-all duration-300 group">
                    <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Project {project}</h3>
                      <p className="text-gray-300 mb-4">A brief description of this amazing project and the technologies used.</p>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                          View
                        </button>
                        <button className="px-4 py-2 border border-purple-400 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-colors">
                          Code
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 px-4 sm:px-8 bg-black/20">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Let's Connect</h2>
              <p className="text-lg text-gray-300 mb-8">
                I'm always interested in new opportunities and interesting projects.
              </p>
              <div className="flex justify-center space-x-6">
                <a href="mailto:your@email.com" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  Say Hello
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-8 px-4 sm:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>&copy; 2024 Siddharth Ahir. All rights reserved.</p>
          </div>
        </footer>

        {/* Game Components - Hidden by default, shown when activated */}
        <GameSelector
          isOpen={gameSelector}
          onClose={handleGameSelection}
          onSelectMemoryGame={handleMemoryGame}
          onSelectTicTacToe={handleTicTacToe}
          onSelectEndlessRunner={handleEndlessRunner}
        />

        <MemoryGame isActive={memoryGame} onComplete={handleCloseGame} />
        <TicTacToeGame isActive={ticTacToe} onComplete={handleCloseGame} />
        <EndlessRunnerGame isActive={endlessRunner} onComplete={handleCloseGame} />
      </div>
    </>
  );
}
