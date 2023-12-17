"use client";
import { HiX } from "react-icons/hi";

type PatientOptionsProps = {
  patient_id: number;
  setPatientId: React.Dispatch<React.SetStateAction<number | null>>;
  setAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  patientOptions: number | boolean;
  setPatientOptions: React.Dispatch<React.SetStateAction<number | boolean>>;
};

const PatientOptions = ({
  patient_id,
  setPatientId,
  setAddNote,
  patientOptions,
  setPatientOptions,
}: PatientOptionsProps) => {
  return (
    <div className="absolute bg-gray-500 rounded-md p-2 cursor-pointer">
      <button
        type="button"
        onClick={() => setPatientOptions(!patientOptions)}
        className=""
      >
        <HiX />
      </button>
      <div
        onClick={() => {
          setPatientOptions(false);
          setAddNote(true);
          setPatientId(patient_id);
        }}
      >
        Add Note
      </div>
      <div>Update Patient</div>
      <div>Delete Patient</div>
    </div>
  );
};

export default PatientOptions;
