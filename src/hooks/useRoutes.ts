import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { CiHome } from "react-icons/ci";
import { FaUser, FaUserDoctor } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Patients",
        href: "/patients",
        icon: FaUser,
        active: pathname === "/patients",
      },
      {
        label: "Home",
        href: "/",
        icon: CiHome,
        active: pathname === "/",
      },
      {
        label: "Schedule",
        href: "/schedule",
        icon: CiCalendar,
        active: pathname == "/schedule",
      },
    ],
    [pathname],
  );

  return routes;
};

export default useRoutes;
