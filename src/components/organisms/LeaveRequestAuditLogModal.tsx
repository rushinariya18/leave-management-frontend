import { useEffect } from "react";
import { Badge, Spinner } from "../atoms";
import { Modal } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { DecisionAction } from "../../interface/leaveRequest";
import { clearLeaveRequestAuditLogs } from "../../store/leaveRequests/leaveRequestsSlice";
import { fetchLeaveRequestAuditLogsThunk } from "../../store/leaveRequests/leaveRequestsThunks";
import "./LeaveRequestAuditLogModal.css";

const ACTION_VARIANT: Record<DecisionAction, "success" | "danger" | "info" | "neutral"> = {
  SUBMITTED: "info",
  APPROVED: "success",
  REJECTED: "danger",
  CANCELLED: "neutral",
  AMENDED: "info",
};

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

interface LeaveRequestAuditLogModalProps {
  requestId: string | null;
  onClose: () => void;
}

export const LeaveRequestAuditLogModal = ({
  requestId,
  onClose,
}: LeaveRequestAuditLogModalProps) => {
  const dispatch = useAppDispatch();
  const { auditLogs, auditLogsLoading } = useAppSelector((state) => state.leaveRequests);

  useEffect(() => {
    if (!requestId) return;
    dispatch(fetchLeaveRequestAuditLogsThunk(requestId));
    return () => {
      dispatch(clearLeaveRequestAuditLogs());
    };
  }, [dispatch, requestId]);

  const sortedLogs = auditLogs ? [...auditLogs].reverse() : null;

  return (
    <Modal
      open={requestId !== null}
      onClose={onClose}
      title="Audit Log"
      className="leave-request-audit-log-modal"
    >
      {auditLogsLoading || !sortedLogs ? (
        <div className="leave-request-audit-log__empty">
          <Spinner />
        </div>
      ) : sortedLogs.length === 0 ? (
        <div className="leave-request-audit-log__empty">
          Unable to load audit log for this request.
        </div>
      ) : (
        <div className="leave-request-audit-log-table-wrapper">
          <table className="leave-request-audit-log-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Action</th>
                <th>By</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.map((entry) => (
                <tr key={entry.id}>
                  <td>{formatDateTime(entry.createdAt)}</td>
                  <td>
                    <Badge variant={ACTION_VARIANT[entry.action]}>{entry.action}</Badge>
                  </td>
                  <td>{entry.actor.name}</td>
                  <td>{entry.reason ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
};
