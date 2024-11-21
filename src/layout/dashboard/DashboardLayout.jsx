import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "@/pages/Dashboard";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Dashboard>
          <Outlet />
        </Dashboard>
      </SidebarProvider>
    </>
  );
}

export default DashboardLayout;
