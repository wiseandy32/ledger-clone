import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "@/pages/Dashboard";
import { Outlet } from "react-router-dom";
import emailjs from "@emailjs/browser";

function DashboardLayout() {
  // emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });
  emailjs.init({ publicKey: "TJCWolHr2thhPxtvN" });
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
