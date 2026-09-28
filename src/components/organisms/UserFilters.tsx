import { useEffect } from "react";
import type { Role } from "../../interface/auth";
import { Button, Select } from "../atoms";
import { SearchInput } from "../molecules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchManagerOptionsThunk } from "../../store/userManagement/userManagementThunks";
import "./UserFilters.css";

interface UserFiltersProps {
  search: string;
  role: Role | "";
  isActive: "" | "true" | "false";
  managerId: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: Role | "") => void;
  onIsActiveChange: (value: "" | "true" | "false") => void;
  onManagerIdChange: (value: string) => void;
  onClear: () => void;
  isFiltered: boolean;
}

const ROLE_OPTIONS = [
  { value: "EMPLOYEE", label: "Employee" },
  { value: "MANAGER", label: "Manager" },
  { value: "HR", label: "HR" },
];

const STATUS_OPTIONS = [
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

export const UserFilters = ({
  search,
  role,
  isActive,
  managerId,
  onSearchChange,
  onRoleChange,
  onIsActiveChange,
  onManagerIdChange,
  onClear,
  isFiltered,
}: UserFiltersProps) => {
  const dispatch = useAppDispatch();
  const managerOptions = useAppSelector((state) => state.userManagement.managerOptions);

  useEffect(() => {
    if (managerOptions.length === 0) {
      dispatch(fetchManagerOptionsThunk({ limit: "100" }));
    }
  }, [dispatch, managerOptions.length]);

  const managerSelectOptions = managerOptions.map((manager) => ({
    value: manager.id,
    label: manager.name,
  }));

  return (
    <div className="user-filters">
      <SearchInput
        key={search}
        value={search}
        onChange={onSearchChange}
        placeholder="Search by name or email"
      />
      <Select
        value={role}
        onChange={(e) => onRoleChange(e.target.value as Role | "")}
        options={ROLE_OPTIONS}
        placeholder="All roles"
      />
      <Select
        value={isActive}
        onChange={(e) => onIsActiveChange(e.target.value as "" | "true" | "false")}
        options={STATUS_OPTIONS}
        placeholder="All statuses"
      />
      <Select
        value={managerId}
        onChange={(e) => onManagerIdChange(e.target.value)}
        options={managerSelectOptions}
        placeholder="All managers"
      />
      <Button type="button" variant="ghost" disabled={!isFiltered} onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
};
