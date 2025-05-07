
import React, { useState, useRef } from 'react';
import { Shield, Upload, X, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type FileUploaderProps = {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
};

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // File size limit (100MB)
    const MAX_SIZE = 100 * 1024 * 1024;
    
    if (file.size > MAX_SIZE) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Maximum file size is 100MB",
      });
      return;
    }
    
    setSelectedFile(file);
    onFileSelected(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="cyber-panel p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Shield className="mr-2 text-cyber-accent" />
        File Security Scanner
      </h2>
      
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging 
              ? 'border-cyber-accent bg-cyber-accent/10' 
              : 'border-gray-600 hover:border-cyber-accent/50'
          } transition-colors cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
            ref={fileInputRef}
          />
          <Upload className="mx-auto h-12 w-12 mb-3 text-cyber-accent" />
          <p className="text-lg font-medium text-white mb-1">
            {isDragging ? "Drop file here" : "Drag and drop file here"}
          </p>
          <p className="text-sm text-gray-400 mb-4">or click to browse</p>
          <Button variant="outline" className="bg-transparent border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-white">
            Select File
          </Button>
          <p className="mt-4 text-xs text-gray-500">
            Supported file types: Any file (max 100MB)
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <div className="p-2 bg-cyber-light rounded-md mr-3">
                <Shield className="h-8 w-8 text-cyber-accent" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-white truncate">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            {!isProcessing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFile}
                className="text-gray-400 hover:text-white hover:bg-cyber-light"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {isProcessing && (
            <div className="mt-4 py-3 px-4 bg-cyber-light rounded-md flex items-center">
              <div className="mr-3">
                <div className="h-5 w-5 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div>
                <p className="text-sm font-medium">Scanning file...</p>
                <p className="text-xs text-gray-400">
                  AI analysis in progress. Please wait.
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-4 py-3 px-4 bg-cyber-accent/10 rounded-md flex items-center">
            <AlertTriangle className="mr-3 h-5 w-5 text-cyber-accent" />
            <p className="text-xs text-gray-300">
              Files are scanned using our advanced AI security algorithms. 
              Results are confidential and no files are stored after analysis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
