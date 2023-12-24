"use client";

import type {
  Allergy,
  Notes,
  Patient,
  PastMedicalHistory,
  PastSurgicalHistory,
  CurrentMedication,
} from "@/types";
import Allergies from "./Allergies";
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
  const [notes, setNotes] = useState<Notes[] | null>(null);
  const [medical, setMedical] = useState<PastMedicalHistory[] | null>(null);
  const [surgical, setSurgical] = useState<PastSurgicalHistory | null>(null);
  const [medication, setMedication] = useState<CurrentMedication | null>(null);
  const [newNote, setNewNote] = useState("");
  const [update, setUpdate] = useState<number | boolean>(false);
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

  const handleSubmit = async (notes_id: number) => {
    await updateNote(notes_id, newNote);
    setUpdate(false);
    router.refresh();
  };

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
          <Allergies patient={patient} initialAllergies={allergies} />
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
        <ul className="border-2 border-black rounded-md overflow-auto h-48">
          <span className="font-bold">Personal Notes</span>
          {notes?.map(({ notes_id, note, createdAt, updatedAt }) => (
            <li className="p-2 my-2" key={notes_id}>
              <div className="flex justify-between w-full mb-2">
                <HiPencilAlt onClick={() => setUpdate(notes_id)} />
                <HiX
                  onClick={() => {
                    deleteNote(notes_id);
                    router.refresh();
                  }}
                />
              </div>
              {update === notes_id ? (
                <form
                  className="flex flex-col m-2"
                  action={() => handleSubmit(notes_id)}
                >
                  <input
                    type="text"
                    className="rounded-md"
                    onChange={(e) =>
                      setNewNote((e.target as HTMLInputElement).value)
                    }
                  />
                  <button type="submit">Update</button>
                </form>
              ) : (
                <div className="bg-white rounded-md">{note}</div>
              )}
              <div className="flex flex-row gap-2">
                <p>Created</p>
                <div>{moment(createdAt).format("L")}</div>
              </div>
              <div className="flex flex-row gap-2">
                <p>Updated</p>
                <div>{moment(updatedAt).format("L")}</div>
              </div>
            </li>
          ))}
        </ul>
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
