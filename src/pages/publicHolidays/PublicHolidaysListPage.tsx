import { useState } from "react";
import { Button } from "../../components/atoms";
import { Modal } from "../../components/molecules";
import { PublicHolidayForm, PublicHolidayListTable } from "../../components/organisms";
import { useAuth } from "../../hooks/useAuth";
import type { PublicHoliday } from "../../interface/publicHoliday";
import "./PublicHolidaysListPage.css";

export const PublicHolidaysListPage = () => {
  const { user } = useAuth();
  const canManage = user?.role === "HR";
  const [modalHoliday, setModalHoliday] = useState<PublicHoliday | "new" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const closeModal = () => setModalHoliday(null);

  const handleSuccess = () => {
    closeModal();
    setRefreshKey((key) => key + 1);
  };

  return (
    <div>
      <div className="public-holidays-list-page__header">
        <h1>Public Holidays</h1>
        {canManage && (
          <Button type="button" onClick={() => setModalHoliday("new")}>
            Add holiday
          </Button>
        )}
      </div>

      <PublicHolidayListTable
        canManage={canManage}
        onEdit={setModalHoliday}
        refreshKey={refreshKey}
      />

      <Modal
        open={modalHoliday !== null}
        onClose={closeModal}
        title={modalHoliday === "new" ? "Add Public Holiday" : "Edit Public Holiday"}
      >
        <PublicHolidayForm
          holiday={modalHoliday !== "new" ? (modalHoliday ?? undefined) : undefined}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
};
