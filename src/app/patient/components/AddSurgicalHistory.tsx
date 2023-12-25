"use client";

import type { Patient, PastSurgicalHistory } from "@/types";
import { useForm } from "react-hook-form";
import { addToSurgicalHistory } from "@/actions/surgical-history";
import { useRouter } from "next/navigation";

type Data = {
  surgery: string;
};

type AddSurgicalHistoryProps = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient;
  surgical: PastSurgicalHistory[];
  setSurgical: React.Dispatch<React.SetStateAction<PastSurgicalHistory[]>>;
};

const AddSurgicalHistory = ({
  setAdd,
  patient,
  surgical,
  setSurgical,
}: AddSurgicalHistoryProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      surgery: "",
    },
  });

  const onSubmit = async ({ surgery }: Data) => {
    if (surgery) {
      const newHistory = await addToSurgicalHistory(
        patient?.patient_id,
        surgery,
      );
      if (newHistory) {
        surgical.push(newHistory);
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
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
      shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]
    `}
    >
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Add Past Surgical History</h1>
          <input {...register("surgery")} className="w-full rounded-md pl-2" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddSurgicalHistory;
