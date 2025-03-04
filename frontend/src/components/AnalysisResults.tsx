import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart } from 'lucide-react';
import { ScoreSummaryCard, Gauge } from '@/components/custom';
import { CategoryResult, MetricResult } from '@/types/analysis';

interface AnalysisResultsProps {
  analyses: CategoryResult[] | null;
}

export function AnalysisResults({ analyses }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const calculateAverageScore = (metrics: MetricResult[]) => {
    return Math.round(
      metrics.reduce((acc, metric) => acc + metric.result.score, 0) / metrics.length,
    );
  };

  const calculateOverallAverage = (analyses: CategoryResult[] | null) => {
    if (!analyses) return 0;
    return Math.round(
      analyses.reduce(
        (acc, category) => acc + calculateAverageScore(category.metrics),
        0,
      ) / analyses.length,
    );
  };

  return (
    <ScrollArea className="h-full pr-4">
      {analyses && (
        <div className="space-y-6">
          <ScoreSummaryCard score={calculateOverallAverage(analyses)} />

          {analyses.map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  {category.category}
                  <Badge
                    className={`ml-auto ${getScoreColor(
                      calculateAverageScore(category.metrics),
                    )}`}
                  >
                    {calculateAverageScore(category.metrics)}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.metrics.map((metric, mIndex) => (
                  <div key={mIndex}>
                    {mIndex > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{metric.metricName}</h4>
                        <Badge className={getScoreColor(metric.result.score)}>
                          {metric.result.score}%
                        </Badge>
                      </div>
                      <Gauge value={metric.result.score} />
                      <p className="text-sm text-gray-600">{metric.result.reason}</p>
                      {metric.result.tips.length > 0 && (
                        <div className="mt-2">
                          <h5 className="text-sm font-medium mb-1">
                            Improvement Tips:
                          </h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {metric.result.tips.map((tip, tIndex) => (
                              <li key={tIndex}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
