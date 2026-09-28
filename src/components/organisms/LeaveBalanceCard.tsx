import type { LeaveBalanceSummary } from "../../interface/leaveBalance";
import { LeaveBalanceRingChart } from "./LeaveBalanceRingChart";
import "./LeaveBalanceCard.css";

interface LeaveBalanceCardProps {
  balance: LeaveBalanceSummary;
  color: string;
  onViewDetails: () => void;
}

export const LeaveBalanceCard = ({ balance, color, onViewDetails }: LeaveBalanceCardProps) => {
  return (
    <div className="leave-balance-card">
      <div className="leave-balance-card__header">
        <h3 className="leave-balance-card__title">{balance.leaveTypeName}</h3>
        <button type="button" className="leave-balance-card__link" onClick={onViewDetails}>
          View details
        </button>
      </div>

      <LeaveBalanceRingChart available={balance.available} consumed={balance.consumed} color={color} />

      <div className="leave-balance-card__stats">
        <div>
          <div className="leave-balance-card__stat-label">Available</div>
          <div className="leave-balance-card__stat-value">{balance.available} days</div>
        </div>
        <div>
          <div className="leave-balance-card__stat-label">Consumed</div>
          <div className="leave-balance-card__stat-value">{balance.consumed} days</div>
        </div>
      </div>
      <div className="leave-balance-card__quota">
        <div className="leave-balance-card__stat-label">Annual Quota</div>
        <div className="leave-balance-card__stat-value">{balance.total} days</div>
      </div>
    </div>
  );
};
