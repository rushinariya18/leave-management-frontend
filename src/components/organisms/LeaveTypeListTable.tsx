import { useEffect } from "react";
import { Spinner } from "../atoms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchLeaveTypesThunk } from "../../store/leaveTypes/leaveTypesThunks";
import { LeaveTypeTableRow } from "./LeaveTypeTableRow";
import "./LeaveTypeListTable.css";

export const LeaveTypeListTable = () => {
  const dispatch = useAppDispatch();
  const { items, itemsLoading } = useAppSelector((state) => state.leaveTypes);

  useEffect(() => {
    dispatch(fetchLeaveTypesThunk());
  }, [dispatch]);

  const refetch = () => dispatch(fetchLeaveTypesThunk());

  return (
    <div className="leave-type-table-wrapper">
      <table className="leave-type-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Default Allowance</th>
            <th>Max Days/Request</th>
            <th>Requires Approval</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsLoading && items.length === 0 ? (
            <tr>
              <td colSpan={6} className="leave-type-table__empty">
                <Spinner />
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={6} className="leave-type-table__empty">
                No leave types found.
              </td>
            </tr>
          ) : (
            items.map((leaveType) => (
              <LeaveTypeTableRow key={leaveType.id} leaveType={leaveType} onDeleted={refetch} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
