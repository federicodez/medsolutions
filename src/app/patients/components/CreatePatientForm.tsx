"use client";
import { useState } from "react";
import { createPatient } from "@/actions/patients";
import { useRouter } from "next/navigation";
import { HiX } from "react-icons/hi";

type CreatePatientFormProps = {
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePatientForm = ({ setCreate }: CreatePatientFormProps) => {
  const [status, setStatus] = useState(false);
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [visit_status, setVisitStatus] = useState("Incomplete");
  const router = useRouter();

  const onSubmit = async () => {
    await createPatient(name, provider, visit_status);
    router.push("/");
    setCreate(false);
  };
  return (
    <div className="popup">
      <div className="m-5 rounded-md">
        <div
          role="button"
          className="flex justify-end"
          onClick={() => setCreate(false)}
        >
          <HiX className="bg-red-300 text-red-900" />
        </div>
        <h1 className="text-center">Create Patient</h1>
        <form className="flex flex-col" action={onSubmit}>
          <input
            className="text-black m-2 border rounded-md"
            onChange={(e) => setName((e.target as HTMLInputElement)?.value)}
            placeholder="John Doe"
          />
          <input
            className="text-black m-2 border rounded-md"
            onChange={(e) => setProvider((e.target as HTMLInputElement)?.value)}
            placeholder="Gregory House"
          />
          <div
            className="flex flex-col cursor-pointer bg-white rounded-md w-fit px-4 m-2"
            onClick={() => setStatus(!status)}
          >
            {status ? (
              <div className="">
                <div onClick={() => setVisitStatus("Incomplete")}>
                  Incomplete
                </div>
                <div onClick={() => setVisitStatus("Complete")}>complete</div>
              </div>
            ) : (
              <div>{visit_status}</div>
            )}
          </div>
          <button type="submit" className="bg-blue-500 border rounded-md m-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePatientForm;
