import { GrSchedule } from "react-icons/gr";
import { FaUserPlus, FaUserDoctor } from "react-icons/fa6";
import Link from "next/link";
import { getPatients } from "@/actions/getPatients";
import Navbar from "@/components/nav/Navbar";

export default async function Home() {
  // const patients = await getPatients();
  // console.log("patients: ", patients);
  return (
    <Navbar>
      <main className="flex min-h-screen flex-row items-center justify-between p-24">
        <Link className="text-5xl border-4 p-2 rounded-md" href="/schedule">
          <GrSchedule />
        </Link>
        <Link
          className="text-5xl border-4 p-2 rounded-md"
          href="/create-patient"
        >
          <FaUserPlus />
        </Link>
        <Link className="text-5xl border-4 p-2 rounded-md" href="#">
          <FaUserDoctor />
        </Link>
      </main>
    </Navbar>
  );
}
