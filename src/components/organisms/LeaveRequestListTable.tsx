import { useEffect } from "react";
import { Badge, Spinner } from "../atoms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { MyLeaveRequest, RequestStatus } from "../../interface/leaveRequest";
import { fetchMyLeaveRequestsThunk } from "../../store/leaveRequests/leaveRequestsThunks";
import "./LeaveRequestListTable.css";

const STATUS_VARIANT: Record<RequestStatus, "success" | "danger" | "info" | "neutral"> = {
  APPROVED: "success",
  REJECTED: "danger",
  CANCELLED: "neutral",
  PENDING: "info",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatDays = (request: MyLeaveRequest) => {
  if (request.dayPart === "FIRST_HALF") return `${request.days} (First half)`;
  if (request.dayPart === "SECOND_HALF") return `${request.days} (Second half)`;
  return `${request.days}`;
};

interface LeaveRequestListTableProps {
  onRowClick: (request: MyLeaveRequest) => void;
}

export const LeaveRequestListTable = ({ onRowClick }: LeaveRequestListTableProps) => {
  const dispatch = useAppDispatch();
  const { items, itemsLoading } = useAppSelector((state) => state.leaveRequests);

  useEffect(() => {
    dispatch(fetchMyLeaveRequestsThunk());
  }, [dispatch]);

  return (
    <div className="leave-request-table-wrapper">
      <table className="leave-request-table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Status</th>
            <th>Decided By</th>
          </tr>
        </thead>
        <tbody>
          {itemsLoading && items.length === 0 ? (
            <tr>
              <td colSpan={6} className="leave-request-table__empty">
                <Spinner />
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={6} className="leave-request-table__empty">
                No leave requests found.
              </td>
            </tr>
          ) : (
            items.map((request) => (
              <tr key={request.id} onClick={() => onRowClick(request)}>
                <td>{request.leaveType.name}</td>
                <td>{formatDate(request.startDate)}</td>
                <td>{formatDate(request.endDate)}</td>
                <td>{formatDays(request)}</td>
                <td>
                  <Badge variant={STATUS_VARIANT[request.status]}>{request.status}</Badge>
                </td>
                <td>{request.decidedBy?.name ?? "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
