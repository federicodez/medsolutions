"use client";

import type { Patient, PainManagement } from "@/types";
import { useForm } from "react-hook-form";
import { addToPainManagement } from "@/actions/pain-management";
import { useRouter } from "next/navigation";

type Data = {
  pain: string;
};

type AddPainManageProps = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient;
  painManagement: PainManagement[];
  setPainManagement: React.Dispatch<React.SetStateAction<PainManagement[]>>;
};

const AddPainManage = ({
  setAdd,
  patient,
  painManagement,
  setPainManagement,
}: AddPainManageProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      pain: "",
    },
  });

  const onSubmit = async ({ pain }: Data) => {
    if (pain) {
      const newPain = await addToPainManagement(patient?.patient_id, pain);
      if (newPain) {
        painManagement.push(newPain);
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
          <h1>Add Pain</h1>
          <input {...register("pain")} className="w-full rounded-md pl-2" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddPainManage;
