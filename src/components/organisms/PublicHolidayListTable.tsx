import { useEffect } from "react";
import { Spinner } from "../atoms";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { PublicHoliday } from "../../interface/publicHoliday";
import { fetchPublicHolidaysThunk } from "../../store/publicHolidays/publicHolidaysThunks";
import { PublicHolidayTableRow } from "./PublicHolidayTableRow";
import "./PublicHolidayListTable.css";

interface PublicHolidayListTableProps {
  canManage: boolean;
  onEdit: (holiday: PublicHoliday) => void;
  refreshKey: number;
}

export const PublicHolidayListTable = ({
  canManage,
  onEdit,
  refreshKey,
}: PublicHolidayListTableProps) => {
  const dispatch = useAppDispatch();
  const { items, itemsLoading } = useAppSelector((state) => state.publicHolidays);

  useEffect(() => {
    dispatch(fetchPublicHolidaysThunk({}));
  }, [dispatch, refreshKey]);

  const refetch = () => dispatch(fetchPublicHolidaysThunk({}));

  return (
    <div className="public-holiday-table-wrapper">
      <table className="public-holiday-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            {canManage && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {itemsLoading && items.length === 0 ? (
            <tr>
              <td colSpan={canManage ? 3 : 2} className="public-holiday-table__empty">
                <Spinner />
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={canManage ? 3 : 2} className="public-holiday-table__empty">
                No public holidays found.
              </td>
            </tr>
          ) : (
            items.map((holiday) => (
              <PublicHolidayTableRow
                key={holiday.id}
                holiday={holiday}
                canManage={canManage}
                onEdit={onEdit}
                onDeleted={refetch}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
