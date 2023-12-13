"use client";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { createPatient } from "@/actions/createPatient";
import { useRouter } from "next/navigation";

const CreatePatientForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      lastname: "",
      firstname: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { lastname, firstname } = data;
    await createPatient(lastname, firstname);
    router.push("/");
  };
  return (
    <div className="m-5 bg-[#24293e] text-white rounded-md">
      <h1 className="text-center">Create Patient</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-black m-2 border rounded-md"
          {...register("lastname")}
        />
        <input
          className="text-black m-2 border rounded-md"
          {...register("firstname")}
        />
        <input type="submit" className="border rounded-md m-5" />
      </form>
    </div>
  );
};

export default CreatePatientForm;
