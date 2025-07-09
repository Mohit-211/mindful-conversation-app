
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm here to listen and support you. Feel free to share what's on your mind, and remember - this is a safe, judgment-free space. How are you feeling today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulate API call to /api/chat
      console.log('Sending message to /api/chat:', inputMessage);
      
      // Mock response - in real app, this would be an API call
      const mockResponses = [
        "I hear you, and I want you to know that your feelings are completely valid. It's okay to feel this way.",
        "Thank you for sharing that with me. It takes courage to open up about difficult emotions. How long have you been feeling this way?",
        "That sounds really challenging. Remember that you're not alone in this. What kind of support would feel most helpful to you right now?",
        "I'm glad you're taking the time to talk about this. Self-awareness is an important step. What do you think might help you feel a bit better today?",
        "It's completely normal to have these thoughts and feelings. You're being very brave by reaching out. Is there anything specific that's been weighing on your mind lately?"
      ];
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat API error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEndChat = () => {
    if (window.confirm("Are you sure you want to end this chat session?")) {
      logout();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Top Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm">💙</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-800">MindCare Chat</h1>
            <p className="text-xs text-gray-500">Safe & Private</p>
          </div>
        </div>
        <Button
          onClick={handleEndChat}
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-800"
        >
          <LogOut className="w-4 h-4 mr-1" />
          End Chat
        </Button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] md:max-w-[60%] p-4 ${
              message.isUser 
                ? 'bg-blue-400 text-white border-blue-400' 
                : 'bg-white/80 text-gray-800 border-gray-200'
            }`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.isUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-white/80 text-gray-800 border-gray-200 p-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="flex-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-400 hover:bg-blue-500 text-white px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This is a supportive AI assistant. For emergencies, please contact local emergency services.
        </p>
      </div>
    </div>
  );
};

export default Chat;
