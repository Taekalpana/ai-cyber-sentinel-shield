
export type ThreatLevel = 'safe' | 'medium' | 'high' | 'critical';

export type ScanResult = {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  threatLevel: ThreatLevel;
  issues: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    location?: string;
  }>;
  timestamp: string;
  scanDuration: number;
};

// Mock AI scan function
export const scanFile = (file: File): Promise<ScanResult> => {
  return new Promise((resolve) => {
    // Simulate processing time based on file size
    const processingTime = Math.min(Math.floor(file.size / 10000) + 500, 3000);
    
    setTimeout(() => {
      // Determine threat level based on file extension and random factor
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      const random = Math.random();
      
      let threatLevel: ThreatLevel;
      const issues: ScanResult['issues'] = [];
      
      // Higher chance of high threat for executable files
      const highRiskExtensions = ['exe', 'bat', 'cmd', 'msi', 'ps1', 'sh'];
      const mediumRiskExtensions = ['js', 'vbs', 'jar', 'py'];
      
      if (highRiskExtensions.includes(fileExtension) && random > 0.3) {
        threatLevel = random > 0.7 ? 'critical' : 'high';
        
        // Add issues
        issues.push({
          type: 'Suspicious Code',
          description: 'Potentially malicious code patterns detected',
          severity: 'high',
        });
        
        if (random > 0.8) {
          issues.push({
            type: 'Known Malware Signature',
            description: 'File contains patterns matching known malware',
            severity: 'high',
          });
        }
      } else if (mediumRiskExtensions.includes(fileExtension) || random > 0.6) {
        threatLevel = 'medium';
        
        issues.push({
          type: 'Unusual Patterns',
          description: 'File contains unusual patterns that may indicate risk',
          severity: 'medium',
        });
      } else if (random > 0.8) {
        threatLevel = 'medium';
        
        issues.push({
          type: 'Suspicious Structure',
          description: 'File has an unusual structure that merits review',
          severity: 'medium',
        });
      } else {
        threatLevel = 'safe';
        
        if (random > 0.7) {
          issues.push({
            type: 'Non-standard Formatting',
            description: 'File uses non-standard formatting that may affect compatibility',
            severity: 'low',
          });
        }
      }
      
      resolve({
        id: `scan-${Date.now().toString(36)}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || `application/${fileExtension}`,
        threatLevel,
        issues,
        timestamp: new Date().toISOString(),
        scanDuration: processingTime,
      });
    }, processingTime);
  });
};

// Get color based on threat level
export const getThreatLevelColor = (level: ThreatLevel): string => {
  switch (level) {
    case 'safe':
      return 'bg-cyber-success';
    case 'medium':
      return 'bg-cyber-warning';
    case 'high':
      return 'bg-cyber-danger';
    case 'critical':
      return 'bg-red-800';
    default:
      return 'bg-cyber-muted';
  }
};

// Get threat level description
export const getThreatLevelDescription = (level: ThreatLevel): string => {
  switch (level) {
    case 'safe':
      return 'No immediate threats detected. The file appears to be safe.';
    case 'medium':
      return 'Minor issues detected. Exercise caution when using this file.';
    case 'high':
      return 'Significant threats detected! Recommend quarantining this file.';
    case 'critical':
      return 'CRITICAL SECURITY THREAT! This file contains severe security risks.';
    default:
      return 'Unknown threat level';
  }
};
