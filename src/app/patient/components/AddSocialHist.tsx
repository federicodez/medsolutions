"use client";

import type { Patient, SocialHistory } from "@/types";
import { useForm } from "react-hook-form";
import { addToSocialHistory } from "@/actions/social-history";
import { useRouter } from "next/navigation";

type Data = {
  history: string;
};

type AddSocialHistProps = {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient;
  socialHistory: SocialHistory[];
  setSocialHistory: React.Dispatch<React.SetStateAction<SocialHistory[]>>;
};

const AddSocialHist = ({
  setAdd,
  patient,
  socialHistory,
  setSocialHistory,
}: AddSocialHistProps) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      history: "",
    },
  });

  const onSubmit = async ({ history }: Data) => {
    if (history) {
      const newSocial = await addToSocialHistory(patient?.patient_id, history);
      if (newSocial) {
        socialHistory.push(newSocial);
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
          <h1>Add Social</h1>
          <input {...register("history")} className="w-full rounded-md pl-2" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddSocialHist;
