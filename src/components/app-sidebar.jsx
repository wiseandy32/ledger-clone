import { GrUploadOption } from "react-icons/gr";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import { LayoutGrid } from "lucide-react";
import { Download } from "lucide-react";
import { useLocation } from "react-router-dom";
import { User2 } from "lucide-react";
import { ArrowRightLeft } from "lucide-react";
// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user",
      icon: LayoutGrid,
    },
    {
      title: "Add Fund",
      url: "deposit",
      icon: Download,
    },
    {
      title: "Withdraw fund",
      url: "withdraw",
      icon: GrUploadOption,
    },
    {
      title: "Transactions",
      url: "transactions",
      icon: ArrowRightLeft,
    },
  ],
  admin: [
    {
      title: "Users",
      url: "/admin",
      icon: User2,
    },
    {
      title: "Deposits",
      url: "deposits",
      icon: Download,
    },
    {
      title: "Withdrawals",
      url: "withdrawals",
      icon: GrUploadOption,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src={logo} alt="" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={pathname.includes("admin") ? data.admin : data.navMain}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
