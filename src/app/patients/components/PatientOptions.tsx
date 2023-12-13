"use client";
import { HiX } from "react-icons/hi";

type PatientOptionsProps = {
  patientOptions: number | boolean;
  setPatientOptions: React.Dispatch<React.SetStateAction<number | boolean>>;
};

const PatientOptions = ({
  patientOptions,
  setPatientOptions,
}: PatientOptionsProps) => {
  return (
    <div className="absolute bg-gray-500 rounded-md p-2">
      <button
        type="button"
        onClick={() => setPatientOptions(!patientOptions)}
        className=""
      >
        <HiX />
      </button>
      <div>Add Note</div>
      <div>Update Patient</div>
      <div>Delete Patient</div>
    </div>
  );
};

export default PatientOptions;
