import { useEffect, useState } from "react";
import { Button, Spinner } from "../atoms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { TeamPendingRequest } from "../../interface/leaveRequest";
import { fetchTeamPendingRequestsThunk } from "../../store/leaveRequests/leaveRequestsThunks";
import { LeaveRequestDetailModal } from "./LeaveRequestDetailModal";
import "./TeamPendingRequestsTable.css";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatDays = (request: TeamPendingRequest) => {
  if (request.dayPart === "FIRST_HALF") return `${request.days} (First half)`;
  if (request.dayPart === "SECOND_HALF") return `${request.days} (Second half)`;
  return `${request.days}`;
};

export const TeamPendingRequestsTable = () => {
  const dispatch = useAppDispatch();
  const { teamPending, teamPendingLoading } = useAppSelector((state) => state.leaveRequests);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTeamPendingRequestsThunk());
  }, [dispatch]);

  return (
    <div className="team-pending-table-wrapper">
      <table className="team-pending-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teamPendingLoading && teamPending.length === 0 ? (
            <tr>
              <td colSpan={7} className="team-pending-table__empty">
                <Spinner />
              </td>
            </tr>
          ) : teamPending.length === 0 ? (
            <tr>
              <td colSpan={7} className="team-pending-table__empty">
                No pending requests.
              </td>
            </tr>
          ) : (
            teamPending.map((request) => (
              <tr key={request.id} onClick={() => setSelectedRequestId(request.id)}>
                <td>{request.employee?.name ?? request.employeeId}</td>
                <td>{request.leaveType.name}</td>
                <td>{formatDate(request.startDate)}</td>
                <td>{formatDate(request.endDate)}</td>
                <td>{formatDays(request)}</td>
                <td>{request.note ?? "—"}</td>
                <td>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedRequestId(request.id);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <LeaveRequestDetailModal
        requestId={selectedRequestId}
        onClose={() => setSelectedRequestId(null)}
      />
    </div>
  );
};
