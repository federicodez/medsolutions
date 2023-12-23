import Navbar from "@/components/nav/Navbar";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navbar>{children}</Navbar>;
}
