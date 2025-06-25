
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Key, Bot, User, Settings } from 'lucide-react';
import { ChatbotService, ChatMessage } from '@/services/chatbotService';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm Siddharth's AI assistant. I can answer specific questions about his background, skills, projects, and personal information. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotService = useRef(new ChatbotService());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Check if API key is already stored
    const storedKey = chatbotService.current.getStoredApiKey();
    if (storedKey) {
      setHasStoredKey(true);
      setApiKey(''); // Don't show the actual key for security
    }
  }, []);

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
        text: "I'm having trouble responding right now. Please try asking about Siddharth's skills, projects, or background information!",
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
      setHasStoredKey(true);
      setShowApiKeyInput(false);
      setApiKey(''); // Clear input for security
      const keySetMessage: ChatMessage = {
        id: Date.now().toString(),
        text: "Perfect! I'm now using OpenAI for enhanced, contextual responses. I can provide more precise answers about Siddharth. What would you like to know?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, keySetMessage]);
    }
  };

  const handleClearApiKey = () => {
    chatbotService.current.clearApiKey();
    setHasStoredKey(false);
    setApiKey('');
    const clearedMessage: ChatMessage = {
      id: Date.now().toString(),
      text: "API key has been removed. I'll use rule-based responses for now. You can add a new API key anytime for enhanced AI responses.",
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, clearedMessage]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Chat Window */}
      <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border-b border-gray-800/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Siddharth's AI Assistant</h3>
                  <p className="text-gray-400 text-xs">
                    {hasStoredKey ? 'Enhanced AI responses active' : 'Rule-based responses'}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                  className={`w-8 h-8 p-0 transition-colors ${
                    hasStoredKey 
                      ? 'text-green-400 hover:text-green-300 hover:bg-green-400/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {hasStoredKey ? <Settings size={14} /> : <Key size={14} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={14} />
                </Button>
              </div>
            </div>
          </div>

          {/* API Key Management */}
          {showApiKeyInput && (
            <div className="p-4 bg-gray-800/30 border-b border-gray-800/50">
              {hasStoredKey ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <Settings size={14} />
                    <span>OpenAI API key is active</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleClearApiKey}
                      className="text-red-400 border-red-400/50 hover:bg-red-400/10 hover:border-red-400"
                    >
                      Remove Key
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setHasStoredKey(false);
                        setApiKey('');
                      }}
                      className="border-gray-600 hover:bg-gray-700"
                    >
                      Update Key
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Enter OpenAI API Key (optional)"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white text-sm placeholder-gray-400 focus:border-purple-500 transition-colors"
                      onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
                    />
                    <Button 
                      size="sm" 
                      onClick={handleApiKeySubmit}
                      disabled={!apiKey.trim()}
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium disabled:opacity-50"
                    >
                      Save
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Optional: Add your OpenAI API key for enhanced AI responses. It will be stored securely in your browser.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="h-96 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                      : 'bg-gray-700'
                  }`}>
                    {message.isUser ? (
                      <User size={12} className="text-white" />
                    ) : (
                      <Bot size={12} className="text-gray-300" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[80%] ${message.isUser ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        message.isUser
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-br-md'
                          : 'bg-gray-800/70 text-gray-100 rounded-bl-md border border-gray-700/50'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={12} className="text-gray-300" />
                  </div>
                  <div className="bg-gray-800/70 border border-gray-700/50 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-800/30 border-t border-gray-800/50">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about skills, projects, background..."
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 transition-colors rounded-xl"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white rounded-xl w-10 h-10 p-0 flex-shrink-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
