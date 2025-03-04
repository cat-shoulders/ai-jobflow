export interface MetricResult {
  metricName: string;
  result: {
    score: number;
    reason: string;
    tips: string[];
  };
}

export interface CategoryResult {
  category: string;
  metrics: MetricResult[];
}
