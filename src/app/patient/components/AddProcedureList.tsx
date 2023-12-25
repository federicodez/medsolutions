"use client";

import type { Patient, ProcedureDone } from "@/types";
import { useForm } from "react-hook-form";
import { addToProceduresDone } from "@/actions/procedures-list";
import { useRouter } from "next/navigation";

type Data = {
  procedure: string;
};

type AddProcedureListProps = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient;
  procedureDone: ProcedureDone[];
  setProcedureDone: React.Dispatch<React.SetStateAction<ProcedureDone[]>>;
};

const AddProcedureList = ({
  setAdd,
  patient,
  procedureDone,
  setProcedureDone,
}: AddProcedureListProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      procedure: "",
    },
  });

  const onSubmit = async ({ procedure }: Data) => {
    if (procedure) {
      const newProcedure = await addToProceduresDone(
        patient?.patient_id,
        procedure,
      );
      if (newProcedure) {
        procedureDone.push(newProcedure);
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
          <h1>Add Procedure</h1>
          <input
            {...register("procedure")}
            className="w-full rounded-md pl-2"
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddProcedureList;
