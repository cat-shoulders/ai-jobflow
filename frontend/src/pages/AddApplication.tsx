import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/ui/accordion.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {
  LucideCheckCircle2,
  FileUp,
  PenLine,
  Briefcase,
  BarChart,
  ChevronLeft,
  ChevronRight,
  Loader2, FileText
} from "lucide-react";
import {lazy, Suspense, useState, useEffect, useRef} from "react";
import { PDFUploadPanel } from "@/components/PDFUploadPanel";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type { CategoryResult } from "@/types/analysis";
import { JobDescriptionPanel } from "@/components/JobDescriptionPanel";
import { AnalysisResults } from "@/components/AnalysisResults";

const EditorComp = lazy(() => import("../components/EditorComponent"));

export default function AddApplication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [analyses, setAnalyses] = useState<CategoryResult[] | null>(null);
  const [mounted, setMounted] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState("50%");
  const [isResizing, setIsResizing] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [editorTab, setEditorTab] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      const storedJobDescription = localStorage.getItem("jobDescription");
      const storedResume = localStorage.getItem("resume");
      const storedAnalyses = localStorage.getItem("analyses");

      if (storedJobDescription) setJobDescription(storedJobDescription);
      if (storedResume) setResume(storedResume);
      if (storedAnalyses) setAnalyses(JSON.parse(storedAnalyses));
    }
  }, [mounted, isAuthenticated]);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      localStorage.setItem("jobDescription", jobDescription);
      localStorage.setItem("resume", resume);
      localStorage.setItem("analyses", JSON.stringify(analyses));
    }
  }, [jobDescription, resume, analyses, mounted, isAuthenticated]);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // Here you would typically:
      // 1. Upload the file to your server
      // 2. Process the PDF
      // 3. Update the editor content with the processed text

      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Implement actual PDF processing
      console.log("Processing PDF:", file.name);

    } catch (error) {
      console.error("Error processing PDF:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const runAnalysis = async () => {
    if (!jobDescription || !resume) {
      alert("Please enter both job description and resume");
      return;
    }

    setAnalyzing(true);
    try {
      const authToken = localStorage.getItem("authToken");
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authToken}`,
        },
        body: JSON.stringify({
          jobDescription,
          resume,
        }),
      });

      if (res.status === 401) {
        // handleLogout();
        return;
      }

      const data = await res.json();
      setAnalyses(data);
      setActiveTab("analysis");
    } catch (e) {
      alert("An error occurred. Please try again.");
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isResizing) return;
    const percentage = (e.clientX / window.innerWidth) * 100;
    if (percentage > 30 && percentage < 70) {
      setLeftPanelWidth(`${percentage}%`);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove as any);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);



  return (

    <div className="h-screen bg-gray-50">
      {analyzing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-64">
            <CardContent className="py-6">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-lg font-medium">Analyzing Resume...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex h-full">
        <div
          className="w-full h-full bg-white shadow-lg "
          style={{ width: leftPanelWidth }}
        >
          <Tabs defaultValue="upload" >
            <Card className="h-full border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5" />
                  Resume Editor
                </CardTitle>

                <TabsList className="mt-4" >
                  <TabsTrigger value="upload" onClick={() => setEditorTab("upload")}>
                    <FileUp className="h-4 w-4" />
                    Upload PDF
                  </TabsTrigger>
                  <TabsTrigger value="editor" onClick={() => setEditorTab("editor")}>
                    <PenLine className="h-4 w-4" />
                    Text Editor
                  </TabsTrigger>
                </TabsList>

              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)] overflow-auto">

                {editorTab === "editor" ? (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditorComp markdown={resume} setMarkdown={setResume} />
                  </Suspense>
                ) : (
                  <PDFUploadPanel
                    onFileUpload={handleFileUpload}
                    onTextAvailable={setResume}
                    isUploading={isUploading}
                  />
                )}
              </CardContent>
            </Card>
          </Tabs>
        </div>

        <div
          ref={dividerRef}
          className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize flex items-center justify-center"
          onMouseDown={handleMouseDown}
        >
          <div className="w-4 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <ChevronLeft className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        <div className="flex-1 h-full overflow-hidden">
          <Card className="h-full border-0">
            <CardHeader className="pb-4">
              <CardTitle>Job Analysis Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full"
              >
                <TabsList className="mb-4">
                  <TabsTrigger
                    value="description"
                    className="flex items-center gap-2"
                  >
                    <Briefcase className="h-4 w-4" />
                    Job Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    className="flex items-center gap-2"
                  >
                    <BarChart className="h-4 w-4" />
                    Analysis Results
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="description"
                  className="h-[calc(100%-3rem)]"
                >
                  <JobDescriptionPanel
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    onAnalyze={runAnalysis}
                    analyzing={analyzing}
                  />
                </TabsContent>

                <TabsContent value="analysis" className="h-[calc(100%-3rem)]">
                  <AnalysisResults analyses={analyses} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Add Application</h1>
      <p className="text-muted-foreground">
        Check your resume and cover letter against the job description to ensure it matches.
      </p>
      <div className="space-y-4" />
      <Accordion type="single" collapsible>
        <AccordionItem value="1" className="border-b">
          <AccordionTrigger>
            <div className="flex gap-2 items-center">
              {!!resume && <div><LucideCheckCircle2 className="text-green-500 h-4 w-4" /></div>}
              1. Your Resume
            </div>
          </AccordionTrigger>
          <AccordionContent className="border border-gray-100 rounded-md p-4">
            <Tabs className="mb-4" defaultValue="upload">
              <TabsList  >
                <TabsTrigger value="upload" onClick={() => setEditorTab("upload")}>
                  <FileUp className="h-4 w-4" />
                  Upload PDF
                </TabsTrigger>
                <TabsTrigger value="editor" onClick={() => setEditorTab("editor")}>
                  <PenLine className="h-4 w-4" />
                  Text Editor
                </TabsTrigger>
              </TabsList>
            </Tabs>


            {editorTab === "editor" ? (
              <Suspense fallback={<div>Loading...</div>}>
                <EditorComp markdown={resume} setMarkdown={setResume} />
              </Suspense>
            ) : (
              <PDFUploadPanel
                onFileUpload={handleFileUpload}
                onTextAvailable={setResume}
                isUploading={isUploading}
              />
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2" className="border-b">
          <AccordionTrigger>2. Job Description</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center flex-col">
              <Textarea placeholder="Job Description" rows={5} />
              <Button variant="outline" className="text-xs">
                Submit
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
