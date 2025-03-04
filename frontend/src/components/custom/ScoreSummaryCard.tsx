import { Card, CardContent } from '@/components/ui/card';

interface ScoreSummaryCardProps {
  score: number;
}

export function ScoreSummaryCard({ score }: ScoreSummaryCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Overall Match Score</h3>
          <div className="text-4xl font-bold text-blue-600">{score}%</div>
        </div>
      </CardContent>
    </Card>
  );
}
