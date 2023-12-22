"use client";

import { useState } from "react";
import { createPatient } from "@/actions/patients";
import { useRouter } from "next/navigation";
import { HiX } from "react-icons/hi";

const CreatePatientForm = () => {
  const [status, setStatus] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState<Date>(new Date("2006-01-01"));
  const [primary_insurance, setPrimaryIns] = useState("");
  const [provider, setProvider] = useState("");
  const [visit_status, setVisitStatus] = useState("Incomplete");
  const router = useRouter();

  const onSubmit = async () => {
    await createPatient(name, provider, dob, primary_insurance, visit_status);
    router.push("/patients");
  };
  return (
    <div
      className={`
      fixed 
      text-black
      top-1/2 
      left-1/2 
      -translate-y-1/2 
      -translate-x-1/2 
      rounded-lg 
      bg-[#8ebbff] 
      w-96
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
      shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]
    `}
    >
      <div className="m-5 rounded-md">
        <div role="button" className="flex justify-end">
          <HiX className="bg-red-300 text-red-900" />
        </div>
        <h1 className="text-center">Create Patient</h1>
        <form className="flex flex-col" action={onSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="text-black m-2 border rounded-md"
              onChange={(e) => setName((e.target as HTMLInputElement)?.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="provider">Provider</label>
            <input
              className="text-black m-2 border rounded-md"
              onChange={(e) =>
                setProvider((e.target as HTMLInputElement)?.value)
              }
              placeholder="Gregory House"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dob">DOB</label>
            <input
              className="text-black m-2 border rounded-md"
              onChange={(e) =>
                setDob(new Date((e.target as HTMLInputElement)?.value))
              }
              placeholder="DOB"
              type="date"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="primary-ins">Primary Insurance</label>
            <input
              className="text-black m-2 border rounded-md"
              onChange={(e) =>
                setPrimaryIns((e.target as HTMLInputElement)?.value)
              }
              placeholder="Blue Shield"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="status">Visit Status</label>
            <div
              className="flex flex-col cursor-pointer bg-white rounded-md w-fit px-4 m-2"
              onClick={() => setStatus(!status)}
            >
              {status ? (
                <div className="">
                  <div onClick={() => setVisitStatus("Incomplete")}>
                    Incomplete
                  </div>
                  <div onClick={() => setVisitStatus("Complete")}>complete</div>
                </div>
              ) : (
                <div>{visit_status}</div>
              )}
            </div>
          </div>
          <button type="submit" className="bg-blue-500 border rounded-md m-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePatientForm;
