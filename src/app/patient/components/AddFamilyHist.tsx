"use client";

import type { Patient, FamilyHistory } from "@/types";
import { useForm } from "react-hook-form";
import { addToFamilyHistory } from "@/actions/family-history";
import { useRouter } from "next/navigation";

type Data = {
  family: string;
};

type AddFamilyHistProps = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient;
  familyHistory: FamilyHistory[];
  setFamilyHistory: React.Dispatch<React.SetStateAction<FamilyHistory[]>>;
};

const AddFamilyHist = ({
  setAdd,
  patient,
  familyHistory,
  setFamilyHistory,
}: AddFamilyHistProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      family: "",
    },
  });

  const onSubmit = async ({ family }: Data) => {
    if (family) {
      const newMember = await addToFamilyHistory(patient?.patient_id, family);
      if (newMember) {
        familyHistory.push(newMember);
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
          <h1>Add Family History</h1>
          <input {...register("family")} className="w-full rounded-md pl-2" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddFamilyHist;
