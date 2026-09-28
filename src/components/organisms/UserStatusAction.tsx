import { useState } from "react";
import { Button } from "../atoms";
import { Modal } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { updateUserStatusThunk } from "../../store/userManagement/userManagementThunks";

interface UserStatusActionProps {
  user: { id: string; name: string; isActive?: boolean };
  onChanged?: () => void;
}

export const UserStatusAction = ({ user, onChanged }: UserStatusActionProps) => {
  const dispatch = useAppDispatch();
  const mutationLoading = useAppSelector((state) => state.userManagement.mutationLoading);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isActive = Boolean(user.isActive);
  const nextIsActive = !isActive;
  const actionLabel = isActive ? "Deactivate" : "Activate";

  const handleConfirm = async () => {
    const result = await dispatch(
      updateUserStatusThunk({ id: user.id, payload: { isActive: nextIsActive } }),
    );
    setConfirmOpen(false);
    if (updateUserStatusThunk.fulfilled.match(result)) {
      onChanged?.();
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={user.isActive ? "danger" : "primary"}
        onClick={() => setConfirmOpen(true)}
      >
        {actionLabel}
      </Button>
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={`${actionLabel} user`}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant={user.isActive ? "danger" : "primary"}
              isLoading={mutationLoading}
              onClick={handleConfirm}
            >
              {actionLabel}
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to {actionLabel.toLowerCase()} <strong>{user.name}</strong>?
        </p>
      </Modal>
    </>
  );
};
