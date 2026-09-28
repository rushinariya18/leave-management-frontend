import { useEffect } from "react";
import { Spinner } from "../atoms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { LeaveBalanceSummary } from "../../interface/leaveBalance";
import { fetchMyLeaveBalancesThunk } from "../../store/leaveBalances/leaveBalancesThunks";
import { LeaveBalanceCard } from "./LeaveBalanceCard";
import "./LeaveBalanceList.css";

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

interface LeaveBalanceListProps {
  onViewDetails: (balance: LeaveBalanceSummary) => void;
}

export const LeaveBalanceList = ({ onViewDetails }: LeaveBalanceListProps) => {
  const dispatch = useAppDispatch();
  const { items, itemsLoading } = useAppSelector((state) => state.leaveBalances);

  useEffect(() => {
    dispatch(fetchMyLeaveBalancesThunk());
  }, [dispatch]);

  if (itemsLoading && items.length === 0) {
    return (
      <div className="leave-balance-list__empty">
        <Spinner />
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="leave-balance-list__empty">No leave balances found.</div>;
  }

  return (
    <div className="leave-balance-list">
      {items.map((balance, index) => (
        <LeaveBalanceCard
          key={balance.leaveTypeId}
          balance={balance}
          color={CHART_COLORS[index % CHART_COLORS.length]}
          onViewDetails={() => onViewDetails(balance)}
        />
      ))}
    </div>
  );
};
