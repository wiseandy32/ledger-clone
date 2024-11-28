/* eslint-disable react/prop-types */
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function NavMain({ items }) {
  const { setOpenMobile } = useSidebar();
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
            onClick={() => {
              navigate(item.url);
              setOpenMobile(false);
            }}
          >
            {item.icon && <item.icon />}
            {item.title}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
