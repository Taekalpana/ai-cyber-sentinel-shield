
import React from 'react';
import { ScanResult as ScanResultType } from '../utils/mockAI';
import ThreatIndicator from './ThreatIndicator';
import { Clock, AlertTriangle, CheckCircle, FileText, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

type ScanResultProps = {
  result: ScanResultType;
};

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};

const ScanResult: React.FC<ScanResultProps> = ({ result }) => {
  const { fileName, fileSize, fileType, threatLevel, issues, timestamp, scanDuration } = result;
  
  return (
    <div className="cyber-panel p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1 flex items-center">
            <FileText className="mr-2 text-cyber-accent" />
            Scan Results
          </h2>
          <p className="text-sm text-gray-400 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Scanned on {formatDate(timestamp)} • {(scanDuration / 1000).toFixed(1)}s
          </p>
        </div>
        
        <ThreatIndicator threatLevel={threatLevel} size="md" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-cyber-light rounded-md">
          <h3 className="text-sm font-medium text-gray-400 mb-1">File Name</h3>
          <p className="text-white font-medium truncate">{fileName}</p>
        </div>
        
        <div className="p-4 bg-cyber-light rounded-md">
          <h3 className="text-sm font-medium text-gray-400 mb-1">File Type</h3>
          <p className="text-white font-medium">{fileType}</p>
        </div>
        
        <div className="p-4 bg-cyber-light rounded-md">
          <h3 className="text-sm font-medium text-gray-400 mb-1">File Size</h3>
          <p className="text-white font-medium">{formatBytes(fileSize)}</p>
        </div>
        
        <div className="p-4 bg-cyber-light rounded-md">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Issues Detected</h3>
          <p className="text-white font-medium">{issues.length}</p>
        </div>
      </div>
      
      {issues.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-cyber-warning" />
            Detected Issues
          </h3>
          <div className="space-y-4">
            {issues.map((issue, index) => (
              <div key={index} className="p-4 bg-cyber-light rounded-md border-l-4 border-cyber-warning">
                <div className="flex justify-between">
                  <h4 className="font-medium">{issue.type}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    issue.severity === 'high' 
                      ? 'bg-red-900/30 text-red-400' 
                      : issue.severity === 'medium'
                      ? 'bg-yellow-900/30 text-yellow-400'
                      : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    {issue.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{issue.description}</p>
                {issue.location && (
                  <p className="text-xs text-gray-500 mt-2">Location: {issue.location}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-green-900/20 border border-green-900/30 rounded-md flex items-start mb-6">
          <CheckCircle className="h-5 w-5 text-cyber-success mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium text-cyber-success">No Issues Detected</h3>
            <p className="text-sm text-gray-400 mt-1">
              Our AI security scan did not detect any potential security issues in this file.
            </p>
          </div>
        </div>
      )}
      
      <div className="flex justify-center mt-6">
        <Button className="bg-cyber-accent hover:bg-cyber-accent-dark text-white">
          <Download className="mr-2 h-4 w-4" />
          Download Detailed Report
        </Button>
      </div>
    </div>
  );
};

export default ScanResult;
