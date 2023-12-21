"use client";
import type { Patient } from "@/types";
import { updatePatient } from "@/actions/patients";
import { useState } from "react";
import { revalidatePath } from "next/cache";

type UpdatePatientProps = {
  selectedPatient: Patient;
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdatePatient = ({
  selectedPatient,
  setSelectedPatient,
  setUpdate,
}: UpdatePatientProps) => {
  const [newName, setName] = useState("");
  const [newProvider, setProvider] = useState("");
  const [newVisitStatus, setVisitStatus] = useState(
    selectedPatient?.visit_status,
  );
  const [status, setStatus] = useState(false);

  const handleSubmit = async () => {
    const name = newName || selectedPatient.name;
    const provider = newProvider || selectedPatient.provider;
    const visit_status = newVisitStatus || selectedPatient.visit_status;
    await updatePatient(
      selectedPatient.patient_id,
      name,
      provider,
      visit_status,
    );
    setSelectedPatient(null);
    setUpdate(false);
    revalidatePath("/patients");
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
          placeholder={`${selectedPatient?.name}`}
        />
        <input
          onChange={(e) => setProvider((e.target as HTMLInputElement).value)}
          className="rounded-md w-fit"
          aria-required
          id="newProvider"
          value={newProvider}
          placeholder={`${selectedPatient?.provider}`}
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

export default UpdatePatient;
