import { useEffect, useState } from "react";
import { Badge, Button, Spinner, Textarea } from "../atoms";
import { Modal } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { MyLeaveRequest, RequestStatus } from "../../interface/leaveRequest";
import { clearSelectedLeaveRequest } from "../../store/leaveRequests/leaveRequestsSlice";
import {
  approveLeaveRequestThunk,
  fetchLeaveRequestByIdThunk,
  rejectLeaveRequestThunk,
} from "../../store/leaveRequests/leaveRequestsThunks";
import "./LeaveRequestDetailModal.css";

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

const dayPartLabel = (dayPart: MyLeaveRequest["dayPart"]) => {
  if (dayPart === "FIRST_HALF") return "First half";
  if (dayPart === "SECOND_HALF") return "Second half";
  return "Full day";
};

interface LeaveRequestDetailModalProps {
  requestId: string | null;
  onClose: () => void;
}

export const LeaveRequestDetailModal = ({
  requestId,
  onClose,
}: LeaveRequestDetailModalProps) => {
  const dispatch = useAppDispatch();
  const { selectedRequest, selectedRequestLoading, mutationLoading } = useAppSelector(
    (state) => state.leaveRequests,
  );
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!requestId) return;
    dispatch(fetchLeaveRequestByIdThunk(requestId));
    return () => {
      dispatch(clearSelectedLeaveRequest());
    };
  }, [dispatch, requestId]);

  const handleClose = () => {
    setRejecting(false);
    setReason("");
    onClose();
  };

  const handleApprove = async () => {
    if (!requestId) return;
    const result = await dispatch(approveLeaveRequestThunk(requestId));
    if (approveLeaveRequestThunk.fulfilled.match(result)) {
      handleClose();
    }
  };

  const handleReject = async () => {
    if (!requestId || reason.trim().length < 3) return;
    const result = await dispatch(
      rejectLeaveRequestThunk({ id: requestId, reason: reason.trim() }),
    );
    if (rejectLeaveRequestThunk.fulfilled.match(result)) {
      handleClose();
    }
  };

  const isPending = selectedRequest?.status === "PENDING";

  return (
    <Modal
      open={requestId !== null}
      onClose={handleClose}
      title="Leave Request"
      className="leave-request-detail-modal"
    >
      {selectedRequestLoading && !selectedRequest ? (
        <div className="leave-request-detail__empty">
          <Spinner />
        </div>
      ) : !selectedRequest ? (
        <div className="leave-request-detail__empty">Unable to load this leave request.</div>
      ) : (
        <div className="leave-request-detail">
          <div className="leave-request-detail__row">
            <span className="leave-request-detail__label">Employee</span>
            <span>{selectedRequest.employee.name}</span>
          </div>
          <div className="leave-request-detail__row">
            <span className="leave-request-detail__label">Leave Type</span>
            <span>{selectedRequest.leaveType.name}</span>
          </div>
          <div className="leave-request-detail__row">
            <span className="leave-request-detail__label">Dates</span>
            <span>
              {formatDate(selectedRequest.startDate)} – {formatDate(selectedRequest.endDate)}
            </span>
          </div>
          <div className="leave-request-detail__row">
            <span className="leave-request-detail__label">Day Part</span>
            <span>{dayPartLabel(selectedRequest.dayPart)}</span>
          </div>
          <div className="leave-request-detail__row">
            <span className="leave-request-detail__label">Status</span>
            <Badge variant={STATUS_VARIANT[selectedRequest.status]}>
              {selectedRequest.status}
            </Badge>
          </div>
          <div className="leave-request-detail__row leave-request-detail__row--note">
            <span className="leave-request-detail__label">Reason</span>
            <span>{selectedRequest.note ?? "No reason provided."}</span>
          </div>

          <h3 className="leave-request-detail__section-heading">Other team leave in this period</h3>
          {selectedRequest.overlappingTeamRequests.length === 0 ? (
            <p className="leave-request-detail__empty-note">No overlapping team leave.</p>
          ) : (
            <table className="leave-request-detail__overlap-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Dates</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedRequest.overlappingTeamRequests.map((overlap) => (
                  <tr key={overlap.id}>
                    <td>{overlap.employee?.name ?? overlap.employeeId}</td>
                    <td>{overlap.leaveType.name}</td>
                    <td>
                      {formatDate(overlap.startDate)} – {formatDate(overlap.endDate)}
                    </td>
                    <td>
                      <Badge variant={STATUS_VARIANT[overlap.status]}>{overlap.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {isPending && (
            <div className="leave-request-detail__actions">
              {rejecting ? (
                <div className="leave-request-detail__reject-row">
                  <Textarea
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Reason (min 3 characters)"
                    maxLength={500}
                  />
                  <div className="leave-request-detail__reject-buttons">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setRejecting(false);
                        setReason("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      isLoading={mutationLoading}
                      disabled={reason.trim().length < 3}
                      onClick={handleReject}
                    >
                      Confirm Reject
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Button type="button" variant="danger" onClick={() => setRejecting(true)}>
                    Reject
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    isLoading={mutationLoading}
                    onClick={handleApprove}
                  >
                    Approve
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
