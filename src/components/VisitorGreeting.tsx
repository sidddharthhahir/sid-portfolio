import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Rocket } from 'lucide-react';

const VisitorGreeting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const aiHighlights = [
    "Building explainable AI recommendation systems 🧠",
    "Designing RAG pipelines with local LLMs 🔗",
    "Creating AI-powered products, not just models 🚀",
    "Specializing in LLM integrations & prompt engineering ✨"
  ];

  useEffect(() => {
    const visited = localStorage.getItem('has_visited_portfolio');
    if (!visited) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('has_visited_portfolio', 'true');
  };

  const randomHighlight = aiHighlights[Math.floor(Math.random() * aiHighlights.length)];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md mx-auto backdrop-blur-2xl bg-black/90 border border-white/20 shadow-2xl">
        <div className="text-center space-y-6 p-6">
          <div className="relative mx-auto w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 animate-spin opacity-75" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-2 rounded-full backdrop-blur-xl bg-black/60 border border-white/20 flex items-center justify-center">
              <Brain size={28} className="text-emerald-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Welcome! 🧠
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              Hi there! I'm <span className="font-semibold text-emerald-400">Siddharth Ahir</span>,
              an AI Engineer building intelligent systems.
            </p>
            <p className="text-gray-300">
              Explore my AI projects, research interests, and engineering work — from recommendation engines to LLM-powered applications.
            </p>
          </div>

          <div className="p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Currently Working On</span>
            </div>
            <p className="text-gray-200 text-sm">{randomHighlight}</p>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-400/20">
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <Rocket size={14} />
              <span>Interact with the 3D neural network in the background!</span>
            </div>
          </div>

          <Button 
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
          >
            Explore AI Projects ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorGreeting;
