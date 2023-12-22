"use client";
import type { Patient } from "@/types";
import { HiX } from "react-icons/hi";
import { deletePatient } from "@/actions/patients";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PatientOptionsProps = {
  patient: Patient;
  setPatientId: React.Dispatch<React.SetStateAction<number | null>>;
  setAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  patientOptions: number | boolean;
  setPatientOptions: React.Dispatch<React.SetStateAction<number | boolean>>;
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
};

const PatientOptions = ({
  patient,
  setPatientId,
  setAddNote,
  patientOptions,
  setPatientOptions,
  setSelectedPatient,
}: PatientOptionsProps) => {
  const router = useRouter();

  return (
    <div className="absolute bg-gray-200 rounded-md p-2 cursor-pointer">
      <div className="flex flex-row justify-between m-3">
        <div
          onClick={() => {
            setPatientOptions(false);
            setAddNote(true);
            setPatientId(patient.patient_id);
            setSelectedPatient(patient);
          }}
        >
          Add Note
        </div>
        <button
          type="button"
          onClick={() => setPatientOptions(!patientOptions)}
          className="text-lg border-2 border-black rounded-md"
        >
          <HiX />
        </button>
      </div>
      <Link className="m-3" href={`/update-patient/${patient.patient_id}`}>
        Update Patient
      </Link>
      <div
        className="m-3"
        onClick={() => {
          deletePatient(patient.patient_id);
          router.refresh();
        }}
      >
        Delete Patient
      </div>
    </div>
  );
};

export default PatientOptions;
