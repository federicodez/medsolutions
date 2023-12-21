import Navbar from "@/components/nav/Navbar";

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navbar>{children}</Navbar>;
}
