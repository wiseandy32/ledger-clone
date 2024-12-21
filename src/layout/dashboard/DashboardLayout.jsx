import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "@/pages/Dashboard";
import { Outlet } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import DashboardSkeleton from "@/components/DashboardSkeleton";

function DashboardLayout() {
  const data = useLoaderData();
  emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });

  return (
    <SidebarProvider>
      <AppSidebar />
      <Dashboard>
        <Suspense fallback={<DashboardSkeleton />}>
          <Await
            resolve={data.user}
            errorElement={<p>Something wrong happened!</p>}
          >
            <Outlet />;
          </Await>
        </Suspense>
      </Dashboard>
    </SidebarProvider>
  );
}

export default DashboardLayout;
