"use client";
import type { Patient } from "@/types";
import { HiX } from "react-icons/hi";
import { deletePatient } from "@/actions/patients";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PatientOptionsProps = {
  patient: Patient;
  setPatientId: React.Dispatch<React.SetStateAction<number | null>>;
  patientOptions: number | boolean;
  setPatientOptions: React.Dispatch<React.SetStateAction<number | boolean>>;
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
};

const PatientOptions = ({
  patient,
  setPatientId,
  patientOptions,
  setPatientOptions,
  setSelectedPatient,
}: PatientOptionsProps) => {
  const router = useRouter();

  return (
    <div className="absolute bg-gray-200 border-2 border-black rounded-md p-2 cursor-pointer">
      <div className="flex flex-row justify-between gap-10">
        <div
          role="button"
          className=""
          onClick={() => router.push(`/update-patient/${patient.patient_id}`)}
        >
          Update Patient
        </div>
        <div
          role="button"
          onClick={() => setPatientOptions(!patientOptions)}
          className="text-lg rounded-md hover:text-red-600"
        >
          <HiX />
        </div>
      </div>
      <div
        className=""
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
