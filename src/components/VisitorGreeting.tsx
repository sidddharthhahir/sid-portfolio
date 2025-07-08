import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, Heart } from 'lucide-react';

const VisitorGreeting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  const inspirationalQuotes = [
    "Code is poetry written in logic. ✨",
    "Every expert was once a beginner. 🚀", 
    "The best time to plant a tree was 20 years ago. The second best time is now. 🌱",
    "In coding, as in life, the journey is just as important as the destination. 💫"
  ];

  const funFacts = [
    "I'm currently studying in Berlin, Germany! 🇩🇪",
    "I love building efficient database solutions! 💾",
    "Python and Django are my superpowers! 🐍",
    "I believe great code tells a story! 📖"
  ];

  useEffect(() => {
    const visited = localStorage.getItem('has_visited_portfolio');
    if (!visited) {
      // Small delay to let the page load first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setHasVisited(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('has_visited_portfolio', 'true');
    setHasVisited(true);
  };

  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md mx-auto backdrop-blur-2xl bg-black/90 border border-white/20 shadow-2xl">
        <div className="text-center space-y-6 p-6">
          {/* Animated welcome icon */}
          <div className="relative mx-auto w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-spin opacity-75" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-2 rounded-full backdrop-blur-xl bg-black/60 border border-white/20 flex items-center justify-center">
              <Sparkles size={28} className="text-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Welcome message */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome! 👋
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              Hi there! I'm <span className="font-semibold text-cyan-400">Siddharth Ahir</span>, 
              a passionate Python Developer & Django Specialist.
            </p>
            <p className="text-gray-300">
              Thanks for visiting my portfolio! Feel free to explore my projects, 
              skills, and don't hesitate to reach out.
            </p>
          </div>

          {/* Fun fact or quote */}
          <div className="p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-yellow-400" />
              <span className="text-sm font-medium text-cyan-400">
                {Math.random() > 0.5 ? 'Fun Fact' : 'Inspiration'}
              </span>
            </div>
            <p className="text-gray-200 text-sm">
              {Math.random() > 0.5 ? randomFact : randomQuote}
            </p>
          </div>

          {/* Chat assistant hint */}
          <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20">
            <div className="flex items-center gap-2 text-cyan-400 text-sm">
              <Heart size={14} />
              <span>Psst! Try chatting with my AI assistant in the bottom right corner!</span>
            </div>
          </div>

          {/* Close button */}
          <Button 
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            Let's Explore! ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorGreeting;