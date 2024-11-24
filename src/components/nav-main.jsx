/* eslint-disable react/prop-types */
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth/use-auth";
import { LayoutGrid } from "lucide-react";
import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function NavMain({ items }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const paths = pathname.split("/").filter((item) => item !== "");
  const currentPath = paths.length > 2 ? paths[1] : paths[paths.length - 1];

  return (
    <SidebarMenu className="pt-12 ">
      {items.map((item) => (
        <SidebarMenuItem key={item.title} className="mt-3">
          <SidebarMenuButton
            className="pl-12 py-7 text-lg"
            isActive={item.url.includes(currentPath)}
            onClick={() => navigate(item.url)}
          >
            {item.icon && <item.icon />}
            {item.title}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}

      {user?.isAdmin && (
        <SidebarMenuItem className="mt-3">
          <SidebarMenuButton
            isActive={false}
            className="pl-12 py-7 text-lg"
            onClick={() =>
              navigate(!paths.includes("admin") ? "/admin" : "/user")
            }
          >
            {!paths.includes("admin") ? (
              <MdAdminPanelSettings />
            ) : (
              <LayoutGrid />
            )}
            {!paths.includes("admin") ? "Admin Panel" : "Dashboard"}
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
