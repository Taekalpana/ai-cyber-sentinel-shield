
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import { Shield, FileText, Upload, AlertTriangle, Activity, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MOCK_SCAN_HISTORY, MOCK_STATS } from '../utils/mockData';
import ThreatIndicator from '../components/ThreatIndicator';

const Dashboard = () => {
  const { user } = useAuth();
  const scanHistory = MOCK_SCAN_HISTORY;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-10">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}</h1>
          <p className="text-gray-400">
            System Status: <span className="text-cyber-success">Secure</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="cyber-panel p-4 flex items-center">
            <div className="p-3 rounded-lg bg-blue-900/20 mr-4">
              <Shield className="h-6 w-6 text-cyber-accent" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Security Status</p>
              <h3 className="text-lg font-bold text-cyber-accent">Protected</h3>
            </div>
          </div>
          
          <div className="cyber-panel p-4 flex items-center">
            <div className="p-3 rounded-lg bg-green-900/20 mr-4">
              <Activity className="h-6 w-6 text-cyber-success" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Recent Scans</p>
              <h3 className="text-lg font-bold">{MOCK_STATS.totalScans}</h3>
            </div>
          </div>
          
          <div className="cyber-panel p-4 flex items-center">
            <div className="p-3 rounded-lg bg-yellow-900/20 mr-4">
              <AlertTriangle className="h-6 w-6 text-cyber-warning" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Threats Detected</p>
              <h3 className="text-lg font-bold">{MOCK_STATS.threatsDetected}</h3>
            </div>
          </div>
          
          <div className="cyber-panel p-4 flex items-center">
            <div className="p-3 rounded-lg bg-purple-900/20 mr-4">
              <Clock className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Scan Time</p>
              <h3 className="text-lg font-bold">{MOCK_STATS.averageScanTime}s</h3>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="cyber-panel h-full">
              <div className="border-b border-cyber-light p-4 flex items-center justify-between">
                <h2 className="font-bold text-lg">Recent Scans</h2>
                <Link to="/scan" className="text-cyber-accent text-sm hover:underline flex items-center">
                  Scan New File <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-400">
                        <th className="pb-3 pr-4">Date</th>
                        <th className="pb-3 pr-4">File</th>
                        <th className="pb-3 pr-4">Level</th>
                        <th className="pb-3">Issues</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cyber-light/30">
                      {scanHistory.slice(0, 5).map(scan => (
                        <tr key={scan.id} className="text-sm">
                          <td className="py-2 pr-4 whitespace-nowrap">
                            {formatDate(scan.timestamp)}
                          </td>
                          <td className="py-2 pr-4 max-w-xs truncate">
                            {scan.fileName}
                          </td>
                          <td className="py-2 pr-4">
                            <ThreatIndicator threatLevel={scan.threatLevel} size="sm" />
                          </td>
                          <td className="py-2">
                            {scan.issues.length}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cyber-panel">
            <div className="border-b border-cyber-light p-4">
              <h2 className="font-bold text-lg">Quick Actions</h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                <Link to="/scan">
                  <Button className="w-full bg-cyber-accent hover:bg-cyber-accent-dark text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload & Scan File
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                
                <Button variant="outline" className="w-full border-cyber-accent/30 text-cyber-accent hover:bg-cyber-light flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Browse Scan History
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                
                {user?.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" className="w-full border-cyber-accent/30 text-cyber-accent hover:bg-cyber-light flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="mr-2 h-5 w-5" />
                        Admin Dashboard
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                
                <div className="p-3 mt-6 bg-green-900/20 border border-green-900/30 rounded-md flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyber-success mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Your system is currently protected by CyberSentinel Shield with the latest threat definitions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
