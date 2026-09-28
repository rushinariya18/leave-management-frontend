import { Link } from "react-router-dom";
import type { LeaveType } from "../../interface/leaveType";
import { Badge } from "../atoms";
import { LeaveTypeDeleteAction } from "./LeaveTypeDeleteAction";

interface LeaveTypeTableRowProps {
  leaveType: LeaveType;
  onDeleted: () => void;
}

export const LeaveTypeTableRow = ({ leaveType, onDeleted }: LeaveTypeTableRowProps) => {
  return (
    <tr>
      <td>{leaveType.name}</td>
      <td>{leaveType.defaultAllowance}</td>
      <td>{leaveType.maxDaysPerRequest}</td>
      <td>
        <Badge variant={leaveType.requiresApproval ? "info" : "neutral"}>
          {leaveType.requiresApproval ? "Yes" : "No"}
        </Badge>
      </td>
      <td>
        <Badge variant={leaveType.isActive ? "success" : "danger"}>
          {leaveType.isActive ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td>
        <div className="leave-type-table-row__actions">
          <Link to={`/leave-types/${leaveType.id}/edit`}>Edit</Link>
          <LeaveTypeDeleteAction leaveType={leaveType} onDeleted={onDeleted} />
        </div>
      </td>
    </tr>
  );
};
