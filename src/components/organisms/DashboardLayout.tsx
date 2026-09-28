import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import "./DashboardLayout.css";

export const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout__main">
        <Header />
        <main className="dashboard-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
