import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { CiHome } from "react-icons/ci";
import { FaUserPlus, FaUserDoctor } from "react-icons/fa6";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Add Patient",
        href: "/create-patient",
        icon: FaUserPlus,
        active: pathname === "/create-patient",
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
        icon: FaUserDoctor,
        active: pathname == "/schedule",
      },
    ],
    [pathname],
  );

  return routes;
};

export default useRoutes;
