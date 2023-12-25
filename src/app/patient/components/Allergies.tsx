"use client";

import type { Patient, Allergy } from "@/types";
import { useState, useEffect } from "react";
import { getPatientAllergies, deletePatientAllergy } from "@/actions/allergy";
import Options from "@/components/Options";
import { SlOptions } from "react-icons/sl";
import { MdFileDownloadDone } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { AddAllergy } from ".";

type AllergiesProps = {
  patient: Patient;
  allergies: Allergy[];
  setAllergies: React.Dispatch<React.SetStateAction<Allergy[]>>;
};

const Allergies = ({ patient, allergies, setAllergies }: AllergiesProps) => {
  const [options, setOptions] = useState(false);
  const [add, setAdd] = useState(false);

  const deleteAllergy = async (allergy_id: number) => {
    await deletePatientAllergy(allergy_id);
    const newAllergies = allergies.filter(
      (allergy) => allergy.allergy_id !== allergy_id,
    );
    setAllergies(newAllergies);
  };

  return (
    <div>
      {add ? (
        <AddAllergy
          setAdd={setAdd}
          patient={patient}
          allergies={allergies}
          setAllergies={setAllergies}
        />
      ) : null}
      <ul className="border-2 border-black rounded-md overflow-auto h-48 px-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Allergy</span>
            {options ? (
              <button
                type="button"
                className="hover:text-blue-400"
                onClick={() => setAdd(true)}
              >
                <FaPlus />
              </button>
            ) : null}
          </div>
          <button
            type="button"
            className="m-1"
            onClick={() => setOptions(!options)}
          >
            {options ? <MdFileDownloadDone /> : <SlOptions />}
          </button>
        </div>
        {allergies.length ? (
          allergies?.map(({ allergy_id, allergy }) => (
            <li className="flex flex-row justify-between pl-2" key={allergy_id}>
              <div>{allergy}</div>
              {options ? (
                <button
                  type="button"
                  className="mr-2 hover:text-red-600 active:bg-red-600"
                  onClick={() => deleteAllergy(allergy_id)}
                >
                  <FaMinus />
                </button>
              ) : null}
            </li>
          ))
        ) : (
          <div>No Known Allergies</div>
        )}
      </ul>
    </div>
  );
};

export default Allergies;
