import { GrSchedule } from "react-icons/gr";
import { FaUser, FaUserDoctor } from "react-icons/fa6";
import Link from "next/link";
import Navbar from "@/components/nav/Navbar";

export default async function Home() {
  return (
    <Navbar>
      <main className="flex min-h-screen flex-row items-center justify-between p-24">
        <div className="flex flex-col items-center">
          <label htmlFor="schedule">Schedule</label>
          <Link className="text-5xl border-4 p-2 rounded-md" href="/schedule">
            <GrSchedule />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="patients">Patients</label>
          <Link className="text-5xl border-4 p-2 rounded-md" href="/patients">
            <FaUser />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="doctor">Doctor</label>
          <Link className="text-5xl border-4 p-2 rounded-md" href="/doctor">
            <FaUserDoctor />
          </Link>
        </div>
      </main>
    </Navbar>
  );
}
