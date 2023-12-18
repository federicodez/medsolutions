"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const Doctor = () => {
  const {data: session} = useSession()
  console.log('session: ', session)
  const router = useRouter()
  return (
    <div className="flex justify-center items-center flex-col m-5">
      <h1>Profile</h1>
      <button className="bg-blue-400 rounded-md px-4" onClick={() => {signOut(); router.push('/')}}>
        Sign Out
      </button>
    </div>
  );
};

export default Doctor;
