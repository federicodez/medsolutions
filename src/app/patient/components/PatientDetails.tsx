"use client";

import type {
  Allergy,
  Note,
  Patient,
  PastMedicalHistory,
  PastSurgicalHistory,
  CurrentMedication,
} from "@/types";
import { Allergies, Notes } from ".";
import { useState, useEffect, Suspense } from "react";
import { deleteNote, getPatientNotes, updateNote } from "@/actions/notes";
import { getPatientAllergies } from "@/actions/allergy";
import { getMedicalHistory } from "@/actions/medical-history";
import moment from "moment";
import { HiX, HiPencilAlt } from "react-icons/hi";
import { useRouter } from "next/navigation";

type PatientDetailsProps = {
  patient: Patient;
};

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [medical, setMedical] = useState<PastMedicalHistory[] | null>(null);
  const [surgical, setSurgical] = useState<PastSurgicalHistory | null>(null);
  const [medication, setMedication] = useState<CurrentMedication | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const allergies = await getPatientAllergies(patient.patient_id);
      if (allergies) {
        setAllergies(allergies);
      }
      const notes = await getPatientNotes(patient.patient_id);
      if (notes) {
        setNotes(notes);
      }
      const medical = await getMedicalHistory(patient.patient_id);

      if (medical) {
        setMedical(medical);
      }
    };
    getData();
  }, [patient.patient_id]);

  return (
    <div className="absolute top-0 left-0 pb-20 md:pb-0 md:left-20 w-full bg-gray-300 p-2 md:px-20 rounded-md">
      <div className="flex flex-col md:flex-row justify-between gap-2 border-2 border-black rounded-md p-2">
        <div className="flex flex-col">
          <div className="capitalize">
            {patient.name.split(" ").reverse().join(", ")}
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">dob:</span>
            <div>{moment(patient.dob).format("MMMM Do YYYY")}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Last Visit:</span>
            <div>{moment(patient.last_visit).format("L")}</div>
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">Primary Insurance:</span>
            <div>{patient.primary_insurance}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Provider:</span>
            <div>{patient.provider}</div>
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">Next Appt:</span>
            <div>{patient.next_appt}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        <Suspense fallback={<p>...loading</p>}>
          <Allergies
            patient={patient}
            allergies={allergies}
            setAllergies={setAllergies}
          />
        </Suspense>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Past Medical History</span>
          <div>No Known Medical History</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Past Surgical History</span>
          <div>No Known Surgical History</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Current Medication</span>
          <div>No Known Current Medication</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Social History</span>
          <div>No Known Social History</div>
        </div>
        <Suspense fallback={<p>...loading</p>}>
          <Notes patient={patient} notes={notes} setNotes={setNotes} />
        </Suspense>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">List of procedures done</span>
          <div>No Known Procedures Done</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Family History</span>
          <div>No Known Family History</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Pain Management</span>
          <div>No Known Pain Management</div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
