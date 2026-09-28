import { useState } from "react";
import { Button } from "../atoms";
import { Modal } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { deleteLeaveTypeThunk } from "../../store/leaveTypes/leaveTypesThunks";

interface LeaveTypeDeleteActionProps {
  leaveType: { id: string; name: string };
  onDeleted?: () => void;
}

export const LeaveTypeDeleteAction = ({ leaveType, onDeleted }: LeaveTypeDeleteActionProps) => {
  const dispatch = useAppDispatch();
  const mutationLoading = useAppSelector((state) => state.leaveTypes.mutationLoading);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = async () => {
    const result = await dispatch(deleteLeaveTypeThunk(leaveType.id));
    setConfirmOpen(false);
    if (deleteLeaveTypeThunk.fulfilled.match(result)) {
      onDeleted?.();
    }
  };

  return (
    <>
      <Button type="button" variant="danger" onClick={() => setConfirmOpen(true)}>
        Delete
      </Button>
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete leave type"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              isLoading={mutationLoading}
              onClick={handleConfirm}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to delete <strong>{leaveType.name}</strong>? This will deactivate
          the leave type.
        </p>
      </Modal>
    </>
  );
};
