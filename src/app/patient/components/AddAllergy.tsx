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

  console.log("allergies: ", allergies);
  const onSubmit = async ({ allergy }: Data) => {
    if (allergy) {
      const newAllergy = await addToAllergy(patient?.patient_id, allergy);

      if (newAllergy) {
        allergies?.push(newAllergy);
        setAllergies({
          ...allergies,
        });
        setAdd(false);
      }
    }
  };

  return (
    <div className="popup">
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
