import Navbar from "@/components/nav/Navbar";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navbar>{children}</Navbar>;
}
