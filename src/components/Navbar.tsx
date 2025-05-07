
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, LogOut, User, Settings, Database, Home, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="cyber-panel sticky top-0 z-10 px-4 py-2 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="h-6 w-6 mr-2 text-cyber-accent" />
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-white cyber-text-glow">
              CyberSentinel
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <>
              <Link 
                to="/dashboard" 
                className={`py-2 px-3 rounded-md transition-colors ${isActive('/dashboard') 
                  ? 'bg-cyber-accent text-white' 
                  : 'text-white/70 hover:text-white hover:bg-cyber-light'}`}
              >
                <span className="flex items-center">
                  <Home className="mr-1 h-4 w-4" /> 
                  Dashboard
                </span>
              </Link>
              
              <Link 
                to="/scan" 
                className={`py-2 px-3 rounded-md transition-colors ${isActive('/scan') 
                  ? 'bg-cyber-accent text-white' 
                  : 'text-white/70 hover:text-white hover:bg-cyber-light'}`}
              >
                <span className="flex items-center">
                  <Shield className="mr-1 h-4 w-4" /> 
                  Scan
                </span>
              </Link>
              
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`py-2 px-3 rounded-md transition-colors ${isActive('/admin') 
                    ? 'bg-cyber-accent text-white' 
                    : 'text-white/70 hover:text-white hover:bg-cyber-light'}`}
                >
                  <span className="flex items-center">
                    <Database className="mr-1 h-4 w-4" /> 
                    Admin
                  </span>
                </Link>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <div className="flex items-center">
              <div className="mr-4">
                <div className="text-xs text-cyber-accent">Logged in as:</div>
                <div className="font-medium flex items-center">
                  <User className="h-3 w-3 mr-1 text-cyber-accent" />
                  {user.name} 
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-cyber-accent/20 rounded-md text-cyber-accent">
                    {user.role}
                  </span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white/70 hover:text-white hover:bg-cyber-light"
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 12h16M4 6h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mt-2 px-2 pt-2 pb-4 cyber-panel md:hidden">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-white hover:bg-cyber-light"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  <Home className="mr-2 h-4 w-4" /> 
                  Dashboard
                </span>
              </Link>
              
              <Link 
                to="/scan" 
                className="block px-3 py-2 rounded-md text-white hover:bg-cyber-light"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" /> 
                  Scan
                </span>
              </Link>
              
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="block px-3 py-2 rounded-md text-white hover:bg-cyber-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Database className="mr-2 h-4 w-4" /> 
                    Admin
                  </span>
                </Link>
              )}
              
              <div className="border-t border-cyber-light my-2"></div>
              
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 rounded-md text-white hover:bg-cyber-light"
              >
                <LogOut className="mr-2 h-4 w-4" /> 
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-white hover:bg-cyber-light"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
