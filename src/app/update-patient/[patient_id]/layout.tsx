import Navbar from "@/components/nav/Navbar";

export default function UpdateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navbar>{children}</Navbar>;
}
