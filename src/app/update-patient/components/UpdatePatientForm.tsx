"use client";
import type { Patient } from "@/types";
import { updatePatient } from "@/actions/patients";
import { useState } from "react";
import { useRouter } from "next/navigation";

type UpdatePatientFormProps = {
  patient: Patient;
};

const UpdatePatientForm = ({ patient }: UpdatePatientFormProps) => {
  const [newName, setName] = useState("");
  const [newDob, setDob] = useState(patient.dob);
  const [newPrimaryIns, setPrimaryIns] = useState("");
  const [newProvider, setProvider] = useState("");
  const [newVisitStatus, setVisitStatus] = useState(patient?.visit_status);
  const [status, setStatus] = useState(false);
  const router = useRouter();

  console.log("patient: ", patient);

  const handleSubmit = async () => {
    const name = newName || patient.name;
    const dob = newDob || patient.dob;
    const primary_insurance = newPrimaryIns || patient.primary_insurance;
    const provider = newProvider || patient.provider;
    const visit_status = newVisitStatus || patient.visit_status;
    if (primary_insurance && provider) {
      await updatePatient(
        patient.patient_id,
        name,
        dob,
        primary_insurance,
        provider,
        visit_status,
      );
      router.push("/patients");
    }
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
      <h1>Update Patient</h1>
      <form className="flex flex-col gap-2" action={handleSubmit}>
        <input
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          className="rounded-md w-fit"
          aria-required
          id="newName"
          value={newName}
          placeholder={`${patient?.name}`}
        />
        <input
          onChange={(e) => setPrimaryIns((e.target as HTMLInputElement).value)}
          className="rounded-md w-fit"
          aria-required
          id="newPrimaryIns"
          value={newPrimaryIns}
          placeholder={`${patient?.primary_insurance}`}
        />
        <input
          onChange={(e) => setProvider((e.target as HTMLInputElement).value)}
          className="rounded-md w-fit"
          aria-required
          id="newProvider"
          value={newProvider}
          placeholder={`${patient?.provider}`}
        />
        <div
          className="flex flex-col cursor-pointer bg-white rounded-md w-fit px-4"
          onClick={() => setStatus(!status)}
        >
          {status ? (
            <div className="">
              <div onClick={() => setVisitStatus("Incomplete")}>Incomplete</div>
              <div onClick={() => setVisitStatus("Complete")}>complete</div>
            </div>
          ) : (
            <div>{newVisitStatus}</div>
          )}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UpdatePatientForm;
