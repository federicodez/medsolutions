"use client";
import { HiX } from "react-icons/hi";
import { deletePatient } from "@/actions/patients";
import { useRouter } from "next/navigation";

type PatientOptionsProps = {
  patient_id: number;
  name: string;
  provider: string;
  visit_status: string;
  setPatientId: React.Dispatch<React.SetStateAction<number | null>>;
  setAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  patientOptions: number | boolean;
  setPatientOptions: React.Dispatch<React.SetStateAction<number | boolean>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPatient: SelectedPatient | null;
  setSelectedPatient: React.Dispatch<
    React.SetStateAction<SelectedPatient | null>
  >;
};

type SelectedPatient = {
  patient_id: number;
  name: string;
  provider: string;
  visit_status: string;
};

const PatientOptions = ({
  patient_id,
  name,
  provider,
  visit_status,
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
            setPatientId(patient_id);
            setSelectedPatient({
              patient_id,
              name,
              provider,
              visit_status,
            });
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
          setPatientId(patient_id);
          setSelectedPatient({
            patient_id,
            name,
            provider,
            visit_status,
          });
        }}
      >
        Update Patient
      </div>
      <div
        className="m-3"
        onClick={() => {
          deletePatient(patient_id);
          router.refresh();
        }}
      >
        Delete Patient
      </div>
    </div>
  );
};

export default PatientOptions;
