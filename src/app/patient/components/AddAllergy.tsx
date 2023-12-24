"use client";

import type { Patient, Allergy } from "@/types";
import { useForm } from "react-hook-form";
import { addToAllergy } from "@/actions/allergy";
import { useRouter } from "next/navigation";

type Data = {
  allergy: string;
};

type AddAllergyProps = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient;
  allergies: Allergy[];
  setAllergies: React.Dispatch<React.SetStateAction<Allergy[]>>;
};

const AddAllergy = ({
  setAdd,
  patient,
  allergies,
  setAllergies,
}: AddAllergyProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      allergy: "",
    },
  });

  const onSubmit = async ({ allergy }: Data) => {
    if (allergy) {
      const newAllergy = await addToAllergy(patient?.patient_id, allergy);
      if (newAllergy) {
        allergies.push(newAllergy);
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
          <h1>Add Allergy</h1>
          <input {...register("allergy")} className="w-full rounded-md pl-2" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddAllergy;
