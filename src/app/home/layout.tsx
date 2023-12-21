import Navbar from "@/components/nav/Navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navbar>{children}</Navbar>;
}
