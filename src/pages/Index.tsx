
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, User, Key, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from || '/dashboard';
      navigate(from);
    }
  }, [isAuthenticated, navigate, location.state]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      toast({
        title: "Login successful",
        description: "Welcome to the CyberSentinel Shield",
      });
      
      // Navigate is handled by the useEffect
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-dark relative overflow-hidden">
      {/* Background elements */}
      <div 
        className="absolute inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-20"
        style={{ backgroundSize: '40px 40px' }} 
      />
      
      <div className="absolute h-[500px] w-[500px] rounded-full bg-cyber-accent/10 blur-3xl -top-60 -right-60" />
      <div className="absolute h-[500px] w-[500px] rounded-full bg-cyber-accent/5 blur-3xl -bottom-60 -left-60" />
      
      <div className="container mx-auto px-4 py-10 flex-grow flex flex-col md:flex-row items-center justify-center z-10">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="p-3 bg-cyber-light rounded-xl mr-3">
                <Shield className="h-8 w-8 text-cyber-accent" />
              </div>
              <h1 className="text-3xl font-bold cyber-text-glow">
                CyberSentinel Shield
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-cyber-accent bg-clip-text text-transparent">
              Advanced AI-Powered<br />Intrusion Detection
            </h2>
            
            <p className="text-gray-400 mb-6 max-w-lg">
              Our cutting-edge AI technology detects and protects against threats in files, 
              datasets, and systems with unparalleled accuracy. Upload, scan, and secure 
              your digital assets with confidence.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              <div className="cyber-panel p-3 px-5">
                <div className="text-cyber-accent font-medium mb-1">99.8%</div>
                <div className="text-xs text-gray-400">Threat Detection Rate</div>
              </div>
              
              <div className="cyber-panel p-3 px-5">
                <div className="text-cyber-accent font-medium mb-1">26M+</div>
                <div className="text-xs text-gray-400">Files Scanned</div>
              </div>
              
              <div className="cyber-panel p-3 px-5">
                <div className="text-cyber-accent font-medium mb-1">1.2s</div>
                <div className="text-xs text-gray-400">Avg. Scan Time</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 max-w-md">
          <div className="cyber-panel overflow-hidden">
            <div className="border-b border-cyber-light p-4">
              <h2 className="text-xl font-medium">Login to CyberSentinel</h2>
              <p className="text-sm text-gray-400">
                Secure your systems with AI-powered protection
              </p>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="p-3 mb-4 bg-red-900/20 border border-red-900/30 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-cyber-danger mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        className="block w-full bg-cyber-dark pl-10 py-2.5 border-cyber-accent/30 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-accent"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        className="block w-full bg-cyber-dark pl-10 py-2.5 border-cyber-accent/30 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-accent"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      For demo: use admin@example.com / admin123 (admin) or user@example.com / user123 (user)
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-cyber-accent hover:bg-cyber-accent-dark text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Logging in...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              CyberSentinel Shield - Powered by Advanced AI Technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
