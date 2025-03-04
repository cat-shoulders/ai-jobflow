import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SmallScoreGauge } from '@/components/custom/SmallScoreGauge';
import { CategoryResult, MetricResult } from '@/types/analysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LightbulbIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  InfoIcon,
} from 'lucide-react';

interface AnalysisResultsProps {
  analyses: CategoryResult[] | null;
}

export function AnalysisResults({ analyses }: AnalysisResultsProps) {
  // Score helpers
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    if (score >= 4) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  // Scoring calculations
  const calculateAverageScore = (metrics: MetricResult[]) => {
    return (
      Math.round(
        metrics.reduce((acc, metric) => acc + metric.result.score, 0) /
          metrics.length,
      ) / 10
    ); // Assuming scores are out of 100, converting to scale of 10
  };

  const calculateOverallAverage = (analyses: CategoryResult[] | null) => {
    if (!analyses || analyses.length === 0) return 0;
    return (
      Math.round(
        analyses.reduce(
          (acc, category) => acc + calculateAverageScore(category.metrics) * 10,
          0,
        ) / analyses.length,
      ) / 10
    ); // Ensuring it's on scale of 10
  };

  if (!analyses || analyses.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Analysis Results</CardTitle>
            <CardDescription>No analysis data is available yet.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Sort categories by average score (highest first)
  const sortedAnalyses = [...analyses].sort(
    (a, b) => calculateAverageScore(b.metrics) - calculateAverageScore(a.metrics),
  );

  const overallScore = calculateOverallAverage(analyses);

  return (
    <ScrollArea className="h-full px-1">
      <div className="space-y-8 pb-8">
        {/* Overall Summary */}
        <Card className="overflow-hidden border-2 border-blue-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-blue-900">
                  Overall Analysis
                </CardTitle>
                <CardDescription>
                  Summary of your performance across all categories
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <SmallScoreGauge score={overallScore * 10} className="w-16 h-16" />
                </div>
                <Badge
                  className={`${getScoreBadgeColor(overallScore)} px-3 py-1.5 text-sm font-medium`}
                >
                  {overallScore >= 8
                    ? 'Excellent'
                    : overallScore >= 6
                      ? 'Good'
                      : overallScore >= 4
                        ? 'Needs Improvement'
                        : 'Critical'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="categories" className="space-y-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {sortedAnalyses.map((category, index) => {
                    const categoryScore = calculateAverageScore(category.metrics);
                    return (
                      <Card
                        key={index}
                        className="overflow-hidden border-l-4"
                        style={{
                          borderLeftColor:
                            categoryScore >= 8
                              ? '#16A34A'
                              : categoryScore >= 6
                                ? '#CA8A04'
                                : categoryScore >= 4
                                  ? '#EA580C'
                                  : '#DC2626',
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">
                              {category.category}
                            </CardTitle>
                            <SmallScoreGauge score={categoryScore * 10} />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <p className="text-xs text-gray-500 mt-1">
                            {category.metrics.length} metrics analyzed
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="space-y-4">
                  {analyses.some((category) =>
                    category.metrics.some((metric) => metric.result.tips.length > 0),
                  ) ? (
                    sortedAnalyses
                      .filter((category) =>
                        category.metrics.some(
                          (metric) => metric.result.tips.length > 0,
                        ),
                      )
                      .slice(0, 3) // Top 3 categories that need improvement
                      .map((category, index) => {
                        const categoryScore = calculateAverageScore(
                          category.metrics,
                        );
                        // Only show metrics with tips and sort by lowest score first
                        const metricsWithTips = category.metrics
                          .filter((metric) => metric.result.tips.length > 0)
                          .sort((a, b) => a.result.score - b.result.score)
                          .slice(0, 2); // Top 2 issues per category

                        return metricsWithTips.length > 0 ? (
                          <Card key={index} className="overflow-hidden">
                            <CardHeader className="pb-2 bg-slate-50">
                              <CardTitle className="text-base flex items-center gap-2">
                                <AlertCircleIcon
                                  size={18}
                                  className={getScoreColor(categoryScore)}
                                />
                                {category.category}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <div className="space-y-4">
                                {metricsWithTips.map((metric, mIndex) => (
                                  <div
                                    key={mIndex}
                                    className="pl-2 border-l-2 border-blue-200"
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <LightbulbIcon
                                        size={16}
                                        className="text-blue-500"
                                      />
                                      <h4 className="font-medium text-sm">
                                        {metric.metricName}
                                      </h4>
                                    </div>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-6">
                                      {metric.result.tips.map((tip, tIndex) => (
                                        <li key={tIndex} className="text-sm">
                                          {tip}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ) : null;
                      })
                      .filter(Boolean)
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <InfoIcon size={48} className="text-gray-300 mb-4" />
                      <p className="text-gray-500">
                        No specific recommendations available at this time.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Detailed Category Analysis */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>

          <Tabs
            defaultValue={
              sortedAnalyses[0]?.category.toLowerCase().replace(/\s+/g, '-') ||
              'tab-0'
            }
            className="w-full"
          >
            <TabsList className="flex overflow-x-auto overflow-y-hidden pb-2 mb-4">
              {sortedAnalyses.map((category, index) => (
                <TabsTrigger
                  key={index}
                  value={category.category.toLowerCase().replace(/\s+/g, '-')}
                  className="min-w-max"
                >
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {sortedAnalyses.map((category, index) => (
              <TabsContent
                key={index}
                value={category.category.toLowerCase().replace(/\s+/g, '-')}
                className="space-y-6"
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">
                          {category.category}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Average score:{' '}
                          {(calculateAverageScore(category.metrics) * 10).toFixed(1)}
                          /10
                        </CardDescription>
                      </div>
                      <SmallScoreGauge
                        score={calculateAverageScore(category.metrics) * 10}
                        className="w-16 h-16"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-6">
                      {/* Sort metrics by score (lowest first to highlight improvement areas) */}
                      {category.metrics
                        .sort((a, b) => a.result.score - b.result.score)
                        .map((metric, mIndex) => {
                          return (
                            <div key={mIndex} className="space-y-3">
                              {mIndex > 0 && <Separator />}
                              <div className="pt-3">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">
                                      {metric.metricName}
                                    </h4>
                                  </div>
                                  <SmallScoreGauge score={metric.result.score} />
                                </div>

                                <p className="text-sm text-gray-700">
                                  {metric.result.reason}
                                </p>

                                {metric.result.tips.length > 0 && (
                                  <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
                                    <h5 className="text-sm font-medium flex items-center gap-2 mb-2 text-blue-800">
                                      <TrendingUpIcon size={16} />
                                      Improvement Tips
                                    </h5>
                                    <ul className="list-disc list-outside text-sm text-gray-700 space-y-2 ml-5">
                                      {metric.result.tips.map((tip, tIndex) => (
                                        <li key={tIndex}>{tip}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
}
