import { useState } from "react";
import { Button } from "../../components/atoms";
import {
  LeaveBalanceHistoryModal,
  LeaveBalanceList,
  LeaveRequestAuditLogModal,
  LeaveRequestListTable,
  RequestLeaveModal,
} from "../../components/organisms";
import type { LeaveBalanceSummary } from "../../interface/leaveBalance";
import "./LeaveBalancesPage.css";

export const LeaveBalancesPage = () => {
  const [selected, setSelected] = useState<LeaveBalanceSummary | null>(null);
  const [auditRequestId, setAuditRequestId] = useState<string | null>(null);
  const [requestLeaveOpen, setRequestLeaveOpen] = useState(false);

  return (
    <div>
      <div className="leave-balances-page__header">
        <h1>Leave Balances</h1>
        <Button type="button" onClick={() => setRequestLeaveOpen(true)}>
          Request Leave
        </Button>
      </div>
      <LeaveBalanceList onViewDetails={setSelected} />

      <h2 className="leave-balances-page__section-heading">My Leave Requests</h2>
      <LeaveRequestListTable onRowClick={(request) => setAuditRequestId(request.id)} />

      <LeaveBalanceHistoryModal
        leaveTypeId={selected?.leaveTypeId ?? null}
        leaveTypeName={selected?.leaveTypeName ?? ""}
        onClose={() => setSelected(null)}
      />
      <LeaveRequestAuditLogModal
        requestId={auditRequestId}
        onClose={() => setAuditRequestId(null)}
      />
      <RequestLeaveModal open={requestLeaveOpen} onClose={() => setRequestLeaveOpen(false)} />
    </div>
  );
};
