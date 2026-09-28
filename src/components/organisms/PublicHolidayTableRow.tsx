import type { PublicHoliday } from "../../interface/publicHoliday";
import { Button } from "../atoms";
import { PublicHolidayDeleteAction } from "./PublicHolidayDeleteAction";

interface PublicHolidayTableRowProps {
  holiday: PublicHoliday;
  canManage: boolean;
  onEdit: (holiday: PublicHoliday) => void;
  onDeleted: () => void;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const PublicHolidayTableRow = ({
  holiday,
  canManage,
  onEdit,
  onDeleted,
}: PublicHolidayTableRowProps) => {
  return (
    <tr>
      <td>{formatDate(holiday.date)}</td>
      <td>{holiday.name}</td>
      {canManage && (
        <td>
          <div className="public-holiday-table-row__actions">
            <Button type="button" variant="secondary" onClick={() => onEdit(holiday)}>
              Edit
            </Button>
            <PublicHolidayDeleteAction holiday={holiday} onDeleted={onDeleted} />
          </div>
        </td>
      )}
    </tr>
  );
};
