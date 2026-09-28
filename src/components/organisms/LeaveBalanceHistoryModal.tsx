import { useEffect } from "react";
import { Spinner } from "../atoms";
import { Modal } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { clearLeaveBalanceHistory } from "../../store/leaveBalances/leaveBalancesSlice";
import { fetchLeaveBalanceHistoryThunk } from "../../store/leaveBalances/leaveBalancesThunks";
import "./LeaveBalanceHistoryModal.css";

interface LeaveBalanceHistoryModalProps {
  leaveTypeId: string | null;
  leaveTypeName: string;
  onClose: () => void;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const LeaveBalanceHistoryModal = ({
  leaveTypeId,
  leaveTypeName,
  onClose,
}: LeaveBalanceHistoryModalProps) => {
  const dispatch = useAppDispatch();
  const { history, historyLoading } = useAppSelector((state) => state.leaveBalances);

  useEffect(() => {
    if (!leaveTypeId) return;
    dispatch(fetchLeaveBalanceHistoryThunk(leaveTypeId));
    return () => {
      dispatch(clearLeaveBalanceHistory());
    };
  }, [dispatch, leaveTypeId]);

  return (
    <Modal
      open={leaveTypeId !== null}
      onClose={onClose}
      title={`${leaveTypeName} — Balance History`}
      className="leave-balance-history-modal"
    >
      {historyLoading || !history ? (
        <div className="leave-balance-history__empty">
          <Spinner />
        </div>
      ) : history.history.length === 0 ? (
        <div className="leave-balance-history__empty">No history found.</div>
      ) : (
        <div className="leave-balance-history-table-wrapper">
          <table className="leave-balance-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Reason</th>
                <th>Change</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {history.history.map((entry, index) => (
                <tr key={`${entry.transactionDate}-${index}`}>
                  <td>{formatDate(entry.transactionDate)}</td>
                  <td>{entry.reason}</td>
                  <td className={entry.change >= 0 ? "leave-balance-history__credit" : "leave-balance-history__debit"}>
                    {entry.change >= 0 ? `+${entry.change}` : entry.change}
                  </td>
                  <td>{entry.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
};
