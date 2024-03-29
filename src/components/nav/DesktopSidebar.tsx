"use client";
import { User } from "@prisma/client";
import DesktopItem from "./DesktopItem";
import useRoutes from "@/hooks/useRoutes";

type DesktopSidebarProps = {
  currentUser: User;
};

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes();

  return (
    <>
      <div
        className="
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-30 
        xl:px-6
        lg:overflow-y-auto 
        bg-[#2f3651]
        lg:border-r-2
        lg:border-[#8ebbff]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      "
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
              />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
