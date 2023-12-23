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
    <div className="popup">
      <div className="flex">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Add Note</h1>
          <input {...register("note")} className="w-full rounded-md" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
