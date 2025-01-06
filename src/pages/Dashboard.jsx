/* eslint-disable react/prop-types */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import ModeToggle from "@/components/theme-toggle";
import { useLocation } from "react-router-dom";

function Dashboard({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const paths = pathname.split("/").filter((item) => item !== "");

  return (
    <>
      <SidebarInset>
        <header className="w-[97.5%] justify-between flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-solid border-b-2 border-slate-600/50 dark:bg-[#0B1120]">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="hidden sm:block">
              <BreadcrumbList>
                {paths.map((path, index) => {
                  return (
                    <>
                      <BreadcrumbItem
                        className="capitalize text-xs md:text-base"
                        key={path}
                      >
                        {index + 1 > paths.length - 1 ? (
                          <BreadcrumbPage>
                            {!paths[1] ? "Dashboard" : path}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(
                                +`-${
                                  index === 0
                                    ? paths.length - 1
                                    : paths.length - (index + 1)
                                }`
                              );
                            }}
                          >
                            {!paths[1] ? "Dashboard" : path}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index + 1 > paths.length - 1 ? null : (
                        <BreadcrumbSeparator />
                      )}
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="justify-self-end flex gap-3">
            <ModeToggle />
          </div>
        </header>
        <div className="pt-2 flex flex-1 flex-col gap-4 p-4 sm:pt-0 md:w-[98.5%] dark:bg-[#0B1120]">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}

export default Dashboard;
