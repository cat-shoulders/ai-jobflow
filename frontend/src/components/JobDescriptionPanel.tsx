import { Button } from "@/components/ui/button";
import { BarChart, Loader2 } from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";

interface JobDescriptionPanelProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  onAnalyze: () => void;
  analyzing: boolean;
}

export function JobDescriptionPanel({
  jobDescription,
  setJobDescription,
  onAnalyze,
  analyzing,
}: JobDescriptionPanelProps) {
  return (
    <div className="flex flex-col h-full gap-4">
      <Textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        className="flex-1 p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
      />
      <Button onClick={onAnalyze} className="w-full" size="lg">
        {analyzing ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <BarChart className="h-4 w-4 mr-2" />
        )}
        Analyze Resume
      </Button>
    </div>
  );
}
