"use client";

import type { Patient, Note } from "@/types";
import { addPatientNote } from "@/actions/patients";
import { useForm } from "react-hook-form";

type AddNoteProps = {
  patient: Patient;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

type Data = {
  note: string;
};

const AddNote = ({ patient, setAdd, notes, setNotes }: AddNoteProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      note: "",
    },
  });

  const onSubmit = async ({ note }: Data) => {
    if (note) {
      const newNote = await addPatientNote(patient.patient_id, note);
      if (newNote) {
        notes.push(newNote);
        setNotes(notes);
        setAdd(false);
      }
    }
  };

  return (
    <div
      className={`
      fixed 
      text-black
      top-1/2 
      left-1/2 
      -translate-y-1/2 
      -translate-x-1/2 
      rounded-lg 
      bg-[#8ebbff] 
      w-96
      p-4
      md:top-1/2
      md:left-2/3
      md:w-[850px]
      md:-translate-x-3/4
      md:-translate-y-1/2
      shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]
    `}
    >
      <div className="flex justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <textarea
            placeholder="Add note here..."
            {...register("note")}
            className="w-full rounded-md pl-2"
          />
          <div className="flex flex-col gap-2 mt-2">
            <button type="submit" className="bg-gray-200 rounded-md">
              Submit
            </button>
            <button
              type="button"
              className="bg-red-300 rounded-md"
              onClick={() => setAdd(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
