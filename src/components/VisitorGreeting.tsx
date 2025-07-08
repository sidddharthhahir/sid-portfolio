import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, X, Wand2, Coffee } from 'lucide-react';

const VisitorGreeting = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  const inspirationalQuotes = [
    "Code is poetry written in logic ✨",
    "Every expert was once a beginner 🚀", 
    "Innovation distinguishes between a leader and a follower 💡",
    "The best time to plant a tree was 20 years ago. The second best time is now 🌱"
  ];

  const funFacts = [
    "Currently studying in beautiful Berlin, Germany! 🇩🇪",
    "I love crafting efficient database solutions! 💾",
    "Python and Django are my coding superpowers! 🐍",
    "Fun fact: I believe great code tells a story! 📖"
  ];

  useEffect(() => {
    const visited = localStorage.getItem('has_visited_portfolio');
    if (!visited) {
      // Delay to let page load, then show greeting
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHasVisited(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('has_visited_portfolio', 'true');
      setHasVisited(true);
    }, 300);
  };

  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  const showFact = Math.random() > 0.5;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Backdrop overlay */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`} 
      />
      
      {/* Greeting Banner */}
      <div className="relative w-full flex justify-center pt-20 pointer-events-none">
        <div 
          className={`max-w-2xl mx-4 pointer-events-auto transform transition-all duration-700 ease-out ${
            isAnimating 
              ? 'translate-y-0 opacity-100 scale-100' 
              : '-translate-y-full opacity-0 scale-95'
          }`}
        >
          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-white/20 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
            
            {/* Content */}
            <div className="relative p-6 md:p-8">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
                aria-label="Dismiss greeting"
              >
                <X size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </button>

              {/* Header with icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-0.5">
                    <div className="w-full h-full rounded-full backdrop-blur-xl bg-black/60 flex items-center justify-center">
                      <Wand2 size={20} className="text-cyan-400" />
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                    <Sparkles size={10} className="text-white" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Welcome! 👋
                  </h2>
                  <p className="text-gray-300 text-sm">Thanks for visiting my portfolio</p>
                </div>
              </div>

              {/* Main message */}
              <div className="space-y-4 mb-6">
                <p className="text-gray-200 text-lg leading-relaxed">
                  Hi there! I'm <span className="font-semibold text-cyan-400">Siddharth Ahir</span>, 
                  a passionate <span className="text-purple-400">Python Developer</span> & 
                  <span className="text-pink-400"> Django Specialist</span>.
                </p>
                
                {/* Quote or Fun Fact */}
                <div className="p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Coffee size={16} className="text-yellow-400" />
                    <span className="text-sm font-medium text-cyan-400">
                      {showFact ? 'Fun Fact' : 'Daily Inspiration'}
                    </span>
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {showFact ? randomFact : randomQuote}
                  </p>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleDismiss}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                >
                  Explore My Work ✨
                </Button>
                <Button 
                  onClick={handleDismiss}
                  variant="outline"
                  className="backdrop-blur-xl bg-white/5 border-white/20 text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  Chat with AI Assistant 🤖
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorGreeting;