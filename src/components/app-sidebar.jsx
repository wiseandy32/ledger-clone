import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from "lucide-react";
import { GrUploadOption } from "react-icons/gr";
import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
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
import { Link } from "lucide-react";
import { useLocation } from "react-router-dom";
// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
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
    // {
    //   title: "Link wallet",
    //   url: "account/link",
    //   icon: Link,
    // },
  ],
  adminMain: [
    {
      title: "Users",
      url: "/admin",
      icon: LayoutGrid,
    },
    {
      title: "Deposit Request",
      url: "deposits",
      icon: Download,
    },
    {
      title: "Withdrawals",
      url: "withdrawals",
      icon: GrUploadOption,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src={logo} alt="" />
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={pathname.includes("admin") ? data.adminMain : data.navMain}
        />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
