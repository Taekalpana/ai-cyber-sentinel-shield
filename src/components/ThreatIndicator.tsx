
import React from 'react';
import { ThreatLevel, getThreatLevelColor, getThreatLevelDescription } from '../utils/mockAI';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

type ThreatIndicatorProps = {
  threatLevel: ThreatLevel;
  size?: 'sm' | 'md' | 'lg';
};

const ThreatIndicator: React.FC<ThreatIndicatorProps> = ({ 
  threatLevel,
  size = 'md'
}) => {
  const getIcon = () => {
    switch (threatLevel) {
      case 'safe':
        return <ShieldCheck className={`${getIconSize()} text-cyber-success`} />;
      case 'medium':
        return <Shield className={`${getIconSize()} text-cyber-warning`} />;
      case 'high':
      case 'critical':
        return <ShieldAlert className={`${getIconSize()} text-cyber-danger animate-pulse`} />;
      default:
        return <Shield className={`${getIconSize()} text-gray-400`} />;
    }
  };
  
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'md':
        return 'h-6 w-6';
      case 'lg':
        return 'h-10 w-10';
      default:
        return 'h-6 w-6';
    }
  };
  
  const getBadgeClasses = () => {
    const baseClasses = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium';
    
    switch (threatLevel) {
      case 'safe':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'critical':
        return `${baseClasses} bg-red-200 text-red-900 animate-pulse`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getProgressColor = () => {
    switch (threatLevel) {
      case 'safe':
        return 'from-green-500 to-green-400';
      case 'medium':
        return 'from-yellow-500 to-yellow-400';
      case 'high':
        return 'from-red-500 to-red-400';
      case 'critical':
        return 'from-red-700 to-red-500';
      default:
        return 'from-gray-500 to-gray-400';
    }
  };

  const getThreatPercentage = () => {
    switch (threatLevel) {
      case 'safe':
        return 10;
      case 'medium':
        return 50;
      case 'high':
        return 85;
      case 'critical':
        return 100;
      default:
        return 0;
    }
  };
  
  // For small size, just show the badge
  if (size === 'sm') {
    return (
      <span className={getBadgeClasses()}>
        {getIcon()}
        <span className="capitalize">{threatLevel}</span>
      </span>
    );
  }
  
  // For medium and large sizes
  return (
    <div className={`threat-indicator ${size === 'lg' ? 'p-5 cyber-panel' : ''}`}>
      <div className="flex items-center gap-3 mb-2">
        {getIcon()}
        <div>
          <h4 className={`font-semibold ${size === 'lg' ? 'text-xl' : 'text-md'} capitalize`}>
            {threatLevel}
          </h4>
          {size === 'lg' && (
            <p className="text-sm text-gray-400">{getThreatLevelDescription(threatLevel)}</p>
          )}
        </div>
      </div>
      
      <div className="w-full bg-cyber-light rounded-full h-2 dark:bg-cyber-dark overflow-hidden">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${getProgressColor()}`}
          style={{ width: `${getThreatPercentage()}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ThreatIndicator;
