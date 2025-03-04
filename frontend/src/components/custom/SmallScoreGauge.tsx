import React from 'react';

interface SmallScoreGaugeProps {
  score: number;
  className?: string;
}

export function SmallScoreGauge({ score, className = '' }: SmallScoreGaugeProps) {
  // Ensure the score is between 0 and 10
  const clampedScore = Math.min(Math.max(score, 0), 10);
  const normalizedScore = clampedScore / 10;

  // Determine color based on score
  const getStrokeColor = () => {
    if (normalizedScore <= 0.2) return '#DC2626'; // red
    if (normalizedScore <= 0.4) return '#EA580C'; // orange
    if (normalizedScore <= 0.6) return '#CA8A04'; // yellow
    if (normalizedScore <= 0.8) return '#65A30D'; // lime
    return '#16A34A'; // green
  };

  return (
    <div className="relative">
      <svg
        viewBox="0 0 36 36"
        className={`w-14 h-14 ${className}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background Circle */}
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        {/* Foreground Circle */}
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth="3"
          strokeDasharray={`${normalizedScore * 100}, 100`}
        />
      </svg>
      {/* Score text overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: 'rotate(0deg)', top: 0, left: 0, right: 0, bottom: 0 }} // Ensure perfect centering
      >
        <span
          className="text-base font-semibold"
          style={{ color: getStrokeColor() }}
        >
          {clampedScore}/10
        </span>
      </div>
    </div>
  );
}
