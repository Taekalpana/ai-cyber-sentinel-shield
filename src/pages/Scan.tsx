
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FileUploader from '../components/FileUploader';
import ScanResult from '../components/ScanResult';
import { Shield } from 'lucide-react';
import { ScanResult as ScanResultType, scanFile } from '../utils/mockAI';

const Scan = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);

  const handleFileSelected = async (file: File) => {
    setIsProcessing(true);
    setScanResult(null);
    
    try {
      // Simulate AI scanning process
      const result = await scanFile(file);
      setScanResult(result);
    } catch (error) {
      console.error("Error during file scanning:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-10">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <Shield className="mr-2 text-cyber-accent" />
            File Security Scanner
          </h1>
          <p className="text-gray-400">
            Upload files for AI-powered security analysis
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <FileUploader 
            onFileSelected={handleFileSelected} 
            isProcessing={isProcessing} 
          />
          
          {scanResult && !isProcessing && (
            <ScanResult result={scanResult} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan;
