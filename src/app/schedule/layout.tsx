import Navbar from "@/components/nav/Navbar";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navbar>{children}</Navbar>;
}
