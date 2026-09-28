import { useState } from "react";
import { Button } from "../atoms";
import { Modal } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { deletePublicHolidayThunk } from "../../store/publicHolidays/publicHolidaysThunks";

interface PublicHolidayDeleteActionProps {
  holiday: { id: string; name: string };
  onDeleted?: () => void;
}

export const PublicHolidayDeleteAction = ({
  holiday,
  onDeleted,
}: PublicHolidayDeleteActionProps) => {
  const dispatch = useAppDispatch();
  const mutationLoading = useAppSelector((state) => state.publicHolidays.mutationLoading);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = async () => {
    const result = await dispatch(deletePublicHolidayThunk(holiday.id));
    setConfirmOpen(false);
    if (deletePublicHolidayThunk.fulfilled.match(result)) {
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
        title="Delete public holiday"
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
          Are you sure you want to delete <strong>{holiday.name}</strong>?
        </p>
      </Modal>
    </>
  );
};
