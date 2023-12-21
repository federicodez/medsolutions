"use client";
import type { Notes } from "@/types";
import { useState, useEffect } from "react";
import { deleteNote, getPatientNotes, updateNote } from "@/actions/notes";
import moment from "moment";
import { SlOptions } from "react-icons/sl";
import { HiX } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import { useRouter } from "next/navigation";

type PatientDetailsProps = {
  showPatientDetails: {
    patient_id: number;
    name: string;
    provider: string;
    visit_status: string;
  };
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
    <div className="absolute top-0 left-0 w-full h-screen bg-gray-300 p-5 rounded-md">
      <div className="flex flex-row justify-between">
        <h1 className="text-center mx-auto capitalize">
          {showPatientDetails.name}
        </h1>
        <SlOptions className="self-center" />
      </div>
      <ul>
        {notes?.map(({ notes_id, note, createdAt, updatedAt }) => (
          <li
            className="border-blue-950 border-2 rounded-md p-2 my-2"
            key={notes_id}
          >
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
              <div>{note}</div>
            )}
            <div>{moment(createdAt).format("MMM Do YY, h:mm:ss a")}</div>
            <div>{moment(updatedAt).format("MMM Do YY, h:mm:ss a")}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDetails;
