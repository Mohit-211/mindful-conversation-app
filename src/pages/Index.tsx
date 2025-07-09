
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Login from "@/components/Login";
import Chat from "@/components/Chat";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();

  if (user) {
    return <Chat />;
  }

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">💙</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
            MindCare Chat
          </CardTitle>
          <CardDescription className="text-gray-600 text-base leading-relaxed">
            A safe space for emotional support and mental wellness. 
            Connect with an AI companion that listens without judgment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-3 mb-6">
            <p className="text-sm text-gray-500">
              🌟 Anonymous & Private
            </p>
            <p className="text-sm text-gray-500">
              🤝 24/7 Support Available
            </p>
            <p className="text-sm text-gray-500">
              💭 Judgment-Free Conversations
            </p>
          </div>
          <Button 
            onClick={() => setShowLogin(true)}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white py-6 text-lg font-medium rounded-lg transition-colors"
          >
            Start Talking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
};

export default Index;
