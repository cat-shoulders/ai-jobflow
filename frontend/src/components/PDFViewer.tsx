"use client";

import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import {Tooltip, TooltipProvider} from '@/components/ui/tooltip';
import {PDFPageProxy} from "pdfjs-dist/types/src/display/api";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFViewerProps {
  pdfUrl: string;
  onTextSelect?: (text: string) => void;
  onTextAvailable?: (text: string) => void;
}

export function PDFViewer({ pdfUrl, onTextSelect, onTextAvailable }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [firstParagraph, setFirstParagraph] = useState<string>('');
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  async function onDocumentLoadSuccess(pdf: { numPages: number, getPage: (pageNumber: number) => Promise<PDFPageProxy> }) {
    const { numPages } = pdf;
    setNumPages(numPages);

    if (!pdf || typeof pdf.getPage !== 'function') {
      console.error("PDF document is not properly loaded:", pdf);
      return;
    }

    const pageTexts = [];
    for (let j = 1; j <= numPages; j++) {
      try {
        const page = await pdf.getPage(j);
        console.log("=page", page);
        const text = await page.getTextContent();
        console.log("==text", text);
        const pageText = text.items.map((s) => {
          return s.str;
        }).join('\n');

        pageTexts.push(pageText);
      } catch (error) {
        console.error("Error getting page:", error);
      }
    }

    onTextAvailable?.(pageTexts.join('\n'));
  }

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      onTextSelect?.(selection.toString());
    }
  };

  // Function to find and highlight the first paragraph
  const highlightFirstParagraph = () => {
    const textLayer = document.querySelector('.react-pdf__Page__textContent');
    if (!textLayer) return;

    const textElements = Array.from(textLayer.children);
    let paragraph = '';
    let firstTextElement: Element | null = null;

    for (const element of textElements) {

      const text = element.textContent?.trim() || '';
      if (text.length > 50) {
        paragraph = text;
        firstTextElement = element;
        break;
      }
    }

    if (firstTextElement) {
      (firstTextElement as HTMLElement).style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
      (firstTextElement as HTMLElement).style.cursor = 'pointer';
      setFirstParagraph(paragraph);

      firstTextElement.addEventListener('mouseenter', (e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const container = containerRef.current;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const centerX = rect.left + (rect.width / 2);
          setTooltipPosition({
            x: centerX - containerRect.left,
            y: rect.top - containerRect.top + container.scrollTop
          });
        }
      });

      firstTextElement.addEventListener('mouseleave', () => {
        setTooltipPosition(null);
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(highlightFirstParagraph, 1000);
    return () => clearTimeout(timer);
  }, [pageNumber, scale]);

  return (
    <TooltipProvider>
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {pageNumber} of {numPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScale(prev => Math.max(0.8, prev - 0.1))}
            disabled={scale <= 0.8}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm mx-2">{Math.round(scale * 100)}%</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScale(prev => Math.min(1.9, prev + 0.1))}
            disabled={scale >= 1.9}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative"
        onMouseUp={handleTextSelection}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="border shadow-lg m-4"
            renderAnnotationLayer={false}
          />
        </Document>

        <Tooltip>
          This is the first paragraph of your resume. Click to edit suggestions.
        </Tooltip>
      </div>
    </div>
    </TooltipProvider>
  );
}
