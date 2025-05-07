
import React, { useState } from 'react';
import { ScanResult } from '../utils/mockAI';
import ThreatIndicator from './ThreatIndicator';
import { BarChart3, AlertTriangle, ShieldCheck, Server, User, Users, Settings, Download, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MOCK_SCAN_HISTORY, MOCK_STATS } from '../utils/mockData';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'settings'>('overview');
  const scanHistory = MOCK_SCAN_HISTORY;
  const stats = MOCK_STATS;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="cyber-panel p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Scans</p>
              <h3 className="text-2xl font-bold">{stats.totalScans}</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-900/20">
              <FileText className="h-6 w-6 text-cyber-accent" />
            </div>
          </div>
        </div>
        
        <div className="cyber-panel p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Threats Detected</p>
              <h3 className="text-2xl font-bold">{stats.threatsDetected}</h3>
            </div>
            <div className="p-3 rounded-lg bg-yellow-900/20">
              <AlertTriangle className="h-6 w-6 text-cyber-warning" />
            </div>
          </div>
        </div>
        
        <div className="cyber-panel p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Critical Threats</p>
              <h3 className="text-2xl font-bold">{stats.criticalThreats}</h3>
            </div>
            <div className="p-3 rounded-lg bg-red-900/20">
              <AlertTriangle className="h-6 w-6 text-cyber-danger" />
            </div>
          </div>
        </div>
        
        <div className="cyber-panel p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Files Quarantined</p>
              <h3 className="text-2xl font-bold">{stats.filesQuarantined}</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-900/20">
              <ShieldCheck className="h-6 w-6 text-cyber-success" />
            </div>
          </div>
        </div>
      </div>

      <div className="cyber-panel mb-6">
        <div className="border-b border-cyber-light p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('overview')}
              className={activeTab === 'overview' 
                ? 'bg-cyber-accent hover:bg-cyber-accent-dark' 
                : 'border-cyber-accent/30 text-cyber-accent hover:bg-cyber-light'
              }
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'history' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('history')}
              className={activeTab === 'history' 
                ? 'bg-cyber-accent hover:bg-cyber-accent-dark' 
                : 'border-cyber-accent/30 text-cyber-accent hover:bg-cyber-light'
              }
            >
              <FileText className="h-4 w-4 mr-2" />
              Scan History
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveTab('settings')}
              className={activeTab === 'settings' 
                ? 'bg-cyber-accent hover:bg-cyber-accent-dark' 
                : 'border-cyber-accent/30 text-cyber-accent hover:bg-cyber-light'
              }
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-bold mb-4">System Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-cyber-light rounded-md">
                  <h4 className="font-medium mb-4 flex items-center">
                    <Server className="h-4 w-4 mr-2 text-cyber-accent" />
                    System Status
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Database</span>
                      <span className="px-2 py-1 bg-green-900/20 text-green-400 text-xs rounded-full">
                        Online
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">AI Engine</span>
                      <span className="px-2 py-1 bg-green-900/20 text-green-400 text-xs rounded-full">
                        Online
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">API</span>
                      <span className="px-2 py-1 bg-green-900/20 text-green-400 text-xs rounded-full">
                        Online
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Latest Update</span>
                      <span className="text-sm text-white">
                        {formatDate(stats.latestUpdate)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-cyber-light rounded-md">
                  <h4 className="font-medium mb-4 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-cyber-accent" />
                    User Statistics
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Total Users</span>
                      <span className="text-sm text-white">24</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Active Users</span>
                      <span className="text-sm text-white">18</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Admins</span>
                      <span className="text-sm text-white">2</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Users</span>
                      <span className="text-sm text-white">22</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-cyber-light rounded-md mb-4">
                <h4 className="font-medium mb-4 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-cyber-warning" />
                  Recent Threats
                </h4>
                
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
                    <tbody className="divide-y divide-cyber-dark/50">
                      {scanHistory
                        .filter(scan => scan.threatLevel !== 'safe')
                        .slice(0, 5)
                        .map(scan => (
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
              
              <div className="text-center mt-6">
                <Button className="bg-cyber-accent hover:bg-cyber-accent-dark text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Export Threat Report
                </Button>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Scan History</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-400 border-b border-cyber-light">
                      <th className="pb-3 pr-4">Date</th>
                      <th className="pb-3 pr-4">File</th>
                      <th className="pb-3 pr-4">Size</th>
                      <th className="pb-3 pr-4">Type</th>
                      <th className="pb-3 pr-4">Level</th>
                      <th className="pb-3">Issues</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-light/30">
                    {scanHistory.map(scan => (
                      <tr key={scan.id} className="text-sm">
                        <td className="py-3 pr-4 whitespace-nowrap">
                          {formatDate(scan.timestamp)}
                        </td>
                        <td className="py-3 pr-4 max-w-xs truncate">
                          {scan.fileName}
                        </td>
                        <td className="py-3 pr-4 whitespace-nowrap">
                          {(scan.fileSize / (1024 * 1024)).toFixed(2)} MB
                        </td>
                        <td className="py-3 pr-4">
                          {scan.fileType.split('/')[1] || scan.fileType}
                        </td>
                        <td className="py-3 pr-4">
                          <ThreatIndicator threatLevel={scan.threatLevel} size="sm" />
                        </td>
                        <td className="py-3">
                          {scan.issues.length}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h3 className="text-xl font-bold mb-4">System Settings</h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-cyber-light rounded-md">
                  <h4 className="font-medium mb-3">AI Configuration</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Detection Sensitivity
                      </label>
                      <select className="w-full bg-cyber-dark border border-cyber-accent/30 rounded-md p-2 text-sm">
                        <option>High (Recommended)</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        AI Model
                      </label>
                      <select className="w-full bg-cyber-dark border border-cyber-accent/30 rounded-md p-2 text-sm">
                        <option>CyberSentinel v3.2 (Latest)</option>
                        <option>CyberSentinel v3.1</option>
                        <option>CyberSentinel v3.0</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-cyber-light rounded-md">
                  <h4 className="font-medium mb-3">User Management</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Registration</p>
                        <p className="text-sm text-gray-400">Allow new user registration</p>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyber-dark">
                        <span className="absolute h-4 w-4 rounded-full bg-white left-1"></span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto Approval</p>
                        <p className="text-sm text-gray-400">Automatically approve new users</p>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyber-accent">
                        <span className="absolute h-4 w-4 rounded-full bg-white left-6"></span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-cyber-light rounded-md">
                  <h4 className="font-medium mb-3">Database Settings</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Retention Period
                      </label>
                      <select className="w-full bg-cyber-dark border border-cyber-accent/30 rounded-md p-2 text-sm">
                        <option>30 days</option>
                        <option>60 days</option>
                        <option>90 days</option>
                        <option>1 year</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto Backup</p>
                        <p className="text-sm text-gray-400">Schedule automatic database backups</p>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-cyber-accent">
                        <span className="absolute h-4 w-4 rounded-full bg-white left-6"></span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="border-cyber-accent/30 text-cyber-accent hover:bg-cyber-light">
                    Cancel
                  </Button>
                  <Button className="bg-cyber-accent hover:bg-cyber-accent-dark">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
