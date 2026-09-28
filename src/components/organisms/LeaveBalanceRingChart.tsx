import { Cell, Pie, PieChart } from "recharts";
import "./LeaveBalanceRingChart.css";

interface LeaveBalanceRingChartProps {
  available: number;
  consumed: number;
  color: string;
}

const SIZE = 160;

export const LeaveBalanceRingChart = ({ available, consumed, color }: LeaveBalanceRingChartProps) => {
  const total = available + consumed;
  const segments =
    total > 0
      ? [
          { name: "available", value: available, fill: color },
          { name: "consumed", value: consumed, fill: "var(--color-border)" },
        ]
      : [{ name: "empty", value: 1, fill: "var(--color-border)" }];

  return (
    <div className="leave-balance-ring" style={{ width: SIZE, height: SIZE }}>
      <PieChart width={SIZE} height={SIZE}>
        <Pie
          data={segments}
          dataKey="value"
          innerRadius={SIZE / 2 - 18}
          outerRadius={SIZE / 2 - 4}
          startAngle={90}
          endAngle={-270}
          stroke="none"
          isAnimationActive={false}
        >
          {segments.map((segment) => (
            <Cell key={segment.name} style={{ fill: segment.fill }} />
          ))}
        </Pie>
      </PieChart>
      <div className="leave-balance-ring__label">
        <span className="leave-balance-ring__value">{available}</span>
        <span className="leave-balance-ring__unit">Days Available</span>
      </div>
    </div>
  );
};
