import { useEffect } from "react";
import { Button, Select } from "../atoms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchUsersThunk } from "../../store/userManagement/userManagementThunks";
import "./HrCalendarFilters.css";

interface HrCalendarFiltersProps {
  employeeId: string;
  viewAsTeam: boolean;
  onEmployeeIdChange: (value: string) => void;
  onViewAsTeamChange: (value: boolean) => void;
  onClear: () => void;
  isFiltered: boolean;
}

export const HrCalendarFilters = ({
  employeeId,
  viewAsTeam,
  onEmployeeIdChange,
  onViewAsTeamChange,
  onClear,
  isFiltered,
}: HrCalendarFiltersProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userManagement.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsersThunk({ limit: "100", isActive: "true" }));
    }
  }, [dispatch, users.length]);

  const employeeOptions = users.map((user) => ({ value: user.id, label: user.name }));
  const selectedEmployee = users.find((user) => user.id === employeeId);
  const canViewAsTeam = selectedEmployee?.role === "MANAGER";

  const handleEmployeeIdChange = (value: string) => {
    onEmployeeIdChange(value);
    const nextEmployee = users.find((user) => user.id === value);
    if (nextEmployee?.role !== "MANAGER") {
      onViewAsTeamChange(false);
    }
  };

  return (
    <div className="hr-calendar-filters">
      <Select
        value={employeeId}
        onChange={(e) => handleEmployeeIdChange(e.target.value)}
        options={employeeOptions}
        placeholder="All employees"
      />
      <label className="hr-calendar-filters__checkbox">
        <input
          type="checkbox"
          checked={viewAsTeam}
          disabled={!canViewAsTeam}
          onChange={(e) => onViewAsTeamChange(e.target.checked)}
        />
        View team calendar
      </label>
      <Button type="button" variant="ghost" disabled={!isFiltered} onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
};
