"use client";

import type { Patient, CurrentMedication } from "@/types";
import { useForm } from "react-hook-form";
import { addToCurrentMedications } from "@/actions/current-medication";
import { useRouter } from "next/navigation";

type Data = {
  medication: string;
};

type AddCurrentMedicationProps = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient;
  currentMedication: CurrentMedication[];
  setCurrentMedication: React.Dispatch<
    React.SetStateAction<CurrentMedication[]>
  >;
};

const AddCurrentMedication = ({
  setAdd,
  patient,
  currentMedication,
  setCurrentMedication,
}: AddCurrentMedicationProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      medication: "",
    },
  });

  const onSubmit = async ({ medication }: Data) => {
    if (medication) {
      const newMedication = await addToCurrentMedications(
        patient?.patient_id,
        medication,
      );
      if (newMedication) {
        currentMedication.push(newMedication);
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
          <h1>Add Medication</h1>
          <input
            {...register("medication")}
            className="w-full rounded-md pl-2"
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddCurrentMedication;
