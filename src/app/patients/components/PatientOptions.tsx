"use client";
import type { Patient } from "@/types";
import { HiX } from "react-icons/hi";
import { deletePatient } from "@/actions/patients";
import { useRouter } from "next/navigation";

type PatientOptionsProps = {
  patient: Patient;
  setPatientId: React.Dispatch<React.SetStateAction<number | null>>;
  setAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  patientOptions: number | boolean;
  setPatientOptions: React.Dispatch<React.SetStateAction<number | boolean>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPatient: Patient | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
};

const PatientOptions = ({
  patient,
  setPatientId,
  setAddNote,
  patientOptions,
  setPatientOptions,
  update,
  setUpdate,
  selectedPatient,
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
      <div
        className="m-3"
        onClick={() => {
          setPatientOptions(false);
          setUpdate(true);
          setPatientId(patient.patient_id);
          setSelectedPatient(patient);
        }}
      >
        Update Patient
      </div>
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
