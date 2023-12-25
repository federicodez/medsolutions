"use client";

import type { Patient, CurrentMedication } from "@/types";
import { useState, useEffect } from "react";
import {
  getCurrentMedications,
  deleteFromCurrentMedications,
} from "@/actions/current-medication";
import Options from "@/components/Options";
import { SlOptions } from "react-icons/sl";
import { MdFileDownloadDone } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { AddCurrentMedication } from ".";

type CurrentMedicalProps = {
  patient: Patient;
  currentMedication: CurrentMedication[];
  setCurrentMedication: React.Dispatch<
    React.SetStateAction<CurrentMedication[]>
  >;
};

const CurrentMedical = ({
  patient,
  currentMedication,
  setCurrentMedication,
}: CurrentMedicalProps) => {
  const [options, setOptions] = useState(false);
  const [add, setAdd] = useState(false);

  const deleteCurrent = async (cm_id: number) => {
    await deleteFromCurrentMedications(cm_id);
    const newMedication = currentMedication.filter(
      (medication) => medication.cm_id !== cm_id,
    );
    setCurrentMedication(newMedication);
  };

  return (
    <div>
      {add ? (
        <AddCurrentMedication
          setAdd={setAdd}
          patient={patient}
          currentMedication={currentMedication}
          setCurrentMedication={setCurrentMedication}
        />
      ) : null}
      <ul className="border-2 border-black rounded-md overflow-auto h-48 px-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Current Medication</span>
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
        {currentMedication.length ? (
          currentMedication?.map(({ cm_id, medication }) => (
            <li className="flex flex-row justify-between pl-2" key={cm_id}>
              <div>{medication}</div>
              {options ? (
                <button
                  type="button"
                  className="mr-2 hover:text-red-600 active:bg-red-600"
                  onClick={() => deleteCurrent(cm_id)}
                >
                  <FaMinus />
                </button>
              ) : null}
            </li>
          ))
        ) : (
          <div>No Known Current Medication</div>
        )}
      </ul>
    </div>
  );
};

export default CurrentMedical;
