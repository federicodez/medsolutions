"use client";
import type { Notes, Patient } from "@/types";
import { useState, useEffect } from "react";
import { deleteNote, getPatientNotes, updateNote } from "@/actions/notes";
import moment from "moment";
import { SlOptions } from "react-icons/sl";
import { HiX } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import { useRouter } from "next/navigation";

type PatientDetailsProps = {
  showPatientDetails: Patient;
};

const PatientDetails = ({ showPatientDetails }: PatientDetailsProps) => {
  const [notes, setNotes] = useState<Notes | null>(null);
  const [newNote, setNewNote] = useState("");
  const [update, setUpdate] = useState<number | boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getNotes = async () => {
      const notes = await getPatientNotes(showPatientDetails.patient_id);
      if (notes) {
        setNotes(notes);
      }
    };
    getNotes();
  }, [showPatientDetails.patient_id]);

  const handleSubmit = async (notes_id: number) => {
    await updateNote(notes_id, newNote);
    setUpdate(false);
    router.refresh();
  };

  return (
    <div className="absolute top-0 left-20 w-full h-screen bg-gray-300 px-20 rounded-md">
      <div className="flex flex-row justify-between gap-2 border-2 border-black rounded-md">
        <div className="flex flex-col">
          <div className="capitalize">
            {showPatientDetails.name.split(" ").reverse().join(", ")}
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">dob:</span>
            <div>{moment(showPatientDetails.dob).format("MMMM Do YYYY")}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Last Visit:</span>
            <div>{moment(showPatientDetails.last_visit).format("L")}</div>
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">Primary Insurance:</span>
            <div>{showPatientDetails.primary_insurance}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Provider:</span>
            <div>{showPatientDetails.provider}</div>
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">Next Appt:</span>
            <div>{showPatientDetails.next_appt}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Allergy</span>
          <div>{showPatientDetails.allergy}</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Past Medical History</span>
          <div>{showPatientDetails.past_medical_history}</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Past Surgical History</span>
          <div>{showPatientDetails.past_surgical_history}</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Current Medication</span>
          <div>{showPatientDetails.current_medication}</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Social History</span>
          <div>{showPatientDetails.social_history}</div>
        </div>
        <ul className="border-2 border-black rounded-md overflow-auto h-48">
          {notes?.map(({ notes_id, note, createdAt, updatedAt }) => (
            <li className="p-2 my-2" key={notes_id}>
              <div className="flex justify-between w-full">
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
                <div>{moment(createdAt).format("MMM Do YY, h:mm:ss a")}</div>
              </div>
              <div className="flex flex-row gap-2">
                <p>Updated</p>
                <div>{moment(updatedAt).format("MMM Do YY, h:mm:ss a")}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">List of procedures done</span>
          <div>{showPatientDetails.procedure_list}</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Family History</span>
          <div>{showPatientDetails.family_history}</div>
        </div>
        <div className="border-2 border-black rounded-md h-48">
          <span className="font-bold">Pain Management</span>
          <div>{showPatientDetails.pain_management}</div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
