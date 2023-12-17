"use client";

import { addPatientNote } from "@/actions/patients";
import { useForm } from "react-hook-form";

type NoteFormProps = {
  patientId: number;
  setPatientId: React.Dispatch<React.SetStateAction<number | null>>;
  setPatientOptions: React.Dispatch<React.SetStateAction<number | boolean>>;
};

type Data = {
  note: string;
};

const NoteForm = ({
  patientId,
  setPatientId,
  setPatientOptions,
}: NoteFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      note: "",
    },
  });

  const onSubmit = async ({ note }: Data) => {
    if (note) {
      await addPatientNote(patientId, note);
      setPatientId(null);
      setPatientOptions(false);
    }
  };

  return (
    <div
      className={`
      fixed 
      z-10
      p-3
      text-black
      top-1/2 
      left-1/2 
      -translate-y-1/2 
      -translate-x-1/2 
      rounded-lg 
      bg-gray-300 
      w-96
      h-fit
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
    `}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add Note</h1>
        <input {...register("note")} className="w-full rounded-md" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NoteForm;
