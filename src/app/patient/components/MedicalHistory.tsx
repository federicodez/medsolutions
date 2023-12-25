"use client";

import type { Patient, PastMedicalHistory } from "@/types";
import { useState, useEffect } from "react";
import {
  getMedicalHistory,
  deleteFromMedicalHistory,
} from "@/actions/medical-history";
import Options from "@/components/Options";
import { SlOptions } from "react-icons/sl";
import { MdFileDownloadDone } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { AddMedicalHistory } from ".";

type MedicalHistoryProps = {
  patient: Patient;
  medical: PastMedicalHistory[];
  setMedical: React.Dispatch<React.SetStateAction<PastMedicalHistory[]>>;
};

const MedicalHistory = ({
  patient,
  medical,
  setMedical,
}: MedicalHistoryProps) => {
  const [options, setOptions] = useState(false);
  const [add, setAdd] = useState(false);

  const deleteMedical = async (pmh_id: number) => {
    await deleteFromMedicalHistory(pmh_id);
    const newHistory = medical.filter((history) => history.pmh_id !== pmh_id);
    setMedical(newHistory);
  };

  return (
    <div>
      {add ? (
        <AddMedicalHistory
          setAdd={setAdd}
          patient={patient}
          medical={medical}
          setMedical={setMedical}
        />
      ) : null}
      <ul className="border-2 border-black rounded-md overflow-auto h-48 px-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Past Medical History</span>
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
        {medical.length ? (
          medical?.map(({ pmh_id, history }) => (
            <li className="flex flex-row justify-between pl-2" key={pmh_id}>
              <div>{history}</div>
              {options ? (
                <button
                  type="button"
                  className="mr-2 hover:text-red-600 active:bg-red-600"
                  onClick={() => deleteMedical(pmh_id)}
                >
                  <FaMinus />
                </button>
              ) : null}
            </li>
          ))
        ) : (
          <div>No Known Medical History</div>
        )}
      </ul>
    </div>
  );
};

export default MedicalHistory;
