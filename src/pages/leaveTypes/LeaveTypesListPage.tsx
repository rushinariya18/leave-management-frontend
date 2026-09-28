import { Link } from "react-router-dom";
import { Button } from "../../components/atoms";
import { LeaveTypeListTable } from "../../components/organisms";
import "./LeaveTypesListPage.css";

export const LeaveTypesListPage = () => {
  return (
    <div>
      <div className="leave-types-list-page__header">
        <h1>Leave Types</h1>
        <Link to="/leave-types/new">
          <Button type="button">Add leave type</Button>
        </Link>
      </div>
      <LeaveTypeListTable />
    </div>
  );
};
