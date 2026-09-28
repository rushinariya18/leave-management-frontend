import { useState } from "react";
import {
  LeaveBalanceHistoryModal,
  LeaveBalanceList,
  LeaveRequestAuditLogModal,
  LeaveRequestListTable,
} from "../../components/organisms";
import type { LeaveBalanceSummary } from "../../interface/leaveBalance";
import "./LeaveBalancesPage.css";

export const LeaveBalancesPage = () => {
  const [selected, setSelected] = useState<LeaveBalanceSummary | null>(null);
  const [auditRequestId, setAuditRequestId] = useState<string | null>(null);

  return (
    <div>
      <h1>Leave Balances</h1>
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
    </div>
  );
};
