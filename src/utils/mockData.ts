
import { ScanResult } from './mockAI';

export const MOCK_SCAN_HISTORY: ScanResult[] = [
  {
    id: 'scan-1',
    fileName: 'system_backup.zip',
    fileSize: 15728640,
    fileType: 'application/zip',
    threatLevel: 'safe',
    issues: [],
    timestamp: '2023-05-10T14:23:15Z',
    scanDuration: 1200,
  },
  {
    id: 'scan-2',
    fileName: 'company_financials.xlsx',
    fileSize: 2097152,
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    threatLevel: 'safe',
    issues: [],
    timestamp: '2023-05-11T09:12:43Z',
    scanDuration: 750,
  },
  {
    id: 'scan-3',
    fileName: 'setup_installer.exe',
    fileSize: 8388608,
    fileType: 'application/x-msdownload',
    threatLevel: 'high',
    issues: [
      {
        type: 'Suspicious Code',
        description: 'Potential malware detected in executable',
        severity: 'high',
      },
      {
        type: 'Unusual Behavior',
        description: 'File attempts to access system directories without permission',
        severity: 'high',
      },
    ],
    timestamp: '2023-05-12T16:45:22Z',
    scanDuration: 1850,
  },
  {
    id: 'scan-4',
    fileName: 'network_config.json',
    fileSize: 524288,
    fileType: 'application/json',
    threatLevel: 'medium',
    issues: [
      {
        type: 'Sensitive Data',
        description: 'File contains potential API keys and credentials',
        severity: 'medium',
      },
    ],
    timestamp: '2023-05-13T11:33:07Z',
    scanDuration: 600,
  },
  {
    id: 'scan-5',
    fileName: 'marketing_report.pdf',
    fileSize: 3145728,
    fileType: 'application/pdf',
    threatLevel: 'safe',
    issues: [],
    timestamp: '2023-05-14T15:22:51Z',
    scanDuration: 920,
  },
];

export const MOCK_STATS = {
  totalScans: 348,
  threatsDetected: 42,
  criticalThreats: 8,
  averageScanTime: 1.2, // in seconds
  filesQuarantined: 12,
  latestUpdate: '2023-05-15T08:30:00Z',
};
