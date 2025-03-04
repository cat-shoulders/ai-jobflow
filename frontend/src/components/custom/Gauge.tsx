interface GaugeProps {
  value: number;
}

export function Gauge({ value }: GaugeProps) {
  // Ensure the value is between 0 and 10
  const clampedValue = Math.min(Math.max(value, 0), 10);

  // Calculate the width percentage based on the 10-point scale
  const widthPercentage = (clampedValue / 10) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${widthPercentage}%` }}
      ></div>
    </div>
  );
}
