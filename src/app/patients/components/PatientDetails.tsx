"use client";
import type { Notes } from "@/types";
import { useState, useEffect } from "react";
import { deleteNote, getPatientNotes } from "@/actions/notes";
import moment from "moment";
import { SlOptions } from "react-icons/sl";
import { HiX } from "react-icons/hi";
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
  return (
    <div className="absolute left-0 w-full bg-gray-300 p-5 rounded-md">
      <div className="flex flex-row justify-between">
        <h1 className="text-center mx-auto capitalize">
          {showPatientDetails.name}
        </h1>
        <SlOptions className="self-center" />
      </div>
      <ul>
        {notes?.map(({ notes_id, note, createdAt, updatedAt }) => (
          <li className="border rounded-md p-2 my-2" key={notes_id}>
            <div className="flex justify-end w-full">
              <HiX
                onClick={() => {
                  deleteNote(notes_id);
                  router.refresh();
                }}
              />
            </div>
            <div>{note}</div>
            <div>{moment(createdAt).format("MMM Do YY, h:mm:ss a")}</div>
            <div>{moment(updatedAt).format("MMM Do YY, h:mm:ss a")}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDetails;
