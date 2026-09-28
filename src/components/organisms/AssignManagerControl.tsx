import { useEffect, useState } from "react";
import { Button, Label, Select } from "../atoms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  assignManagerThunk,
  fetchManagerOptionsThunk,
} from "../../store/userManagement/userManagementThunks";
import "./AssignManagerControl.css";

interface AssignManagerControlProps {
  userId: string;
  currentManagerId?: string | null;
}

const UNASSIGNED = "";

export const AssignManagerControl = ({ userId, currentManagerId }: AssignManagerControlProps) => {
  const dispatch = useAppDispatch();
  const managerOptions = useAppSelector((state) => state.userManagement.managerOptions);
  const mutationLoading = useAppSelector((state) => state.userManagement.mutationLoading);
  const [selected, setSelected] = useState(currentManagerId ?? UNASSIGNED);

  useEffect(() => {
    if (managerOptions.length === 0) {
      dispatch(fetchManagerOptionsThunk({ limit: "100" }));
    }
  }, [dispatch, managerOptions.length]);

  const options = managerOptions
    .filter((manager) => manager.id !== userId)
    .map((manager) => ({ value: manager.id, label: `${manager.name} (${manager.email})` }));

  const handleUpdate = () => {
    dispatch(
      assignManagerThunk({
        id: userId,
        payload: { managerId: selected === UNASSIGNED ? null : selected },
      }),
    );
  };

  return (
    <div className="assign-manager">
      <Label htmlFor="assign-manager-select">Manager</Label>
      <div className="assign-manager__row">
        <Select
          id="assign-manager-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          options={[{ value: UNASSIGNED, label: "Unassigned" }, ...options]}
        />
        <Button
          type="button"
          variant="secondary"
          isLoading={mutationLoading}
          disabled={selected === (currentManagerId ?? UNASSIGNED)}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </div>
  );
};
