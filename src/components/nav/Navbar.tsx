import { getCurrentUser } from "@/actions/user";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Navbar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  console.log("currentUser ", currentUser);

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Navbar;
