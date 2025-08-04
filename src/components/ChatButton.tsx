
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bot } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  isOpen?: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen = false }) => {
  if (isOpen) return null;

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-110 transition-all duration-500 group border-0"
    >
      <Bot size={24} className="text-white group-hover:scale-110 transition-transform duration-300" />
      
      {/* Pulse Animation */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-ping opacity-20"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 animate-pulse"></div>
    </Button>
  );
};

export default ChatButton;
