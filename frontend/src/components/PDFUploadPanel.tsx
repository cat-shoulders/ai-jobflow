import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from "lucide-react";
import { PDFViewer } from "./PDFViewer";

interface PDFUploadPanelProps {
  onFileUpload: (file: File) => void;
  onTextAvailable: (text: string) => void;
  isUploading: boolean;
}

export function PDFUploadPanel({ onFileUpload, onTextAvailable, isUploading }: PDFUploadPanelProps) {
  const [dragActive, setDragActive] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]?.type === "application/pdf") {
      handleFileSelection(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = async (file: File) => {
    // Create a URL for the PDF file
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
    onFileUpload(file);
  };

  const handleTextSelect = (text: string) => {
    console.log("Selected text:", text);
    // Here you can implement your suggestion logic
    // For example, show a popup with suggested edits
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (pdfUrl) {
    return <PDFViewer onTextAvailable={onTextAvailable} pdfUrl={pdfUrl} onTextSelect={handleTextSelect} />;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-full border-2 border-dashed rounded-lg p-6 transition-colors
        ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        id="pdf-upload"
        className="hidden"
        accept=".pdf"
        onChange={handleChange}
      />

      <FileText className="w-12 h-12 text-gray-400 mb-4" />

      <div className="text-center mb-4">
        <h3 className="text-lg font-medium mb-1">Upload your Resume</h3>
        <p className="text-sm text-gray-500">
          Drag and drop your PDF file here, or click to select
        </p>
      </div>

      <Button
        onClick={handleButtonClick}
        disabled={isUploading}
        className="pointer"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Select PDF
          </>
        )}
      </Button>
    </div>
  );
}
