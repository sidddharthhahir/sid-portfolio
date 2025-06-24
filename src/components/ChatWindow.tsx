
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Send, MessageCircle, Key } from 'lucide-react';
import { ChatbotService, ChatMessage } from '@/services/chatbotService';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm Siddharth's AI assistant. I can help you learn about his skills, projects, and background. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotService = useRef(new ChatbotService());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatbotService.current.getResponse(inputValue);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble responding right now. Please try asking about Siddharth's skills, projects, or contact information!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      chatbotService.current.setApiKey(apiKey.trim());
      setShowApiKeyInput(false);
      const keySetMessage: ChatMessage = {
        id: Date.now().toString(),
        text: "Great! I'm now using OpenAI for enhanced responses. How can I help you learn about Siddharth?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, keySetMessage]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
      <Card className="w-96 h-[500px] backdrop-blur-2xl bg-black/90 border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full">
              <MessageCircle size={20} className="text-white" />
            </div>
            <CardTitle className="text-gray-200 text-lg">Chat with Sid's AI</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-white/10"
            >
              <Key size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 hover:bg-white/10"
            >
              <X size={16} />
            </Button>
          </div>
        </CardHeader>

        {showApiKeyInput && (
          <div className="p-4 border-b border-white/20 bg-black/50">
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter OpenAI API Key (optional)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-black/40 border-white/30 text-gray-200 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
              />
              <Button size="sm" onClick={handleApiKeySubmit} className="bg-cyan-500 hover:bg-cyan-600">
                Set
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Optional: Add your OpenAI API key for enhanced AI responses</p>
          </div>
        )}

        <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-black/40 border border-white/20 text-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-black/40 border border-white/20 text-gray-200 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Siddharth's skills, projects..."
              className="bg-black/40 border-white/30 text-gray-200 placeholder-gray-400"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
            >
              <Send size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatWindow;
