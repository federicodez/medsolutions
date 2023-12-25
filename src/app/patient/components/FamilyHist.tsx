"use client";

import type { Patient, FamilyHistory } from "@/types";
import { useState, useEffect } from "react";
import {
  getFamilyHistory,
  deleteFromFamilyHistory,
} from "@/actions/family-history";
import Options from "@/components/Options";
import { SlOptions } from "react-icons/sl";
import { MdFileDownloadDone } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { AddFamilyHist } from ".";

type FamilyHistProps = {
  patient: Patient;
  familyHistory: FamilyHistory[];
  setFamilyHistory: React.Dispatch<React.SetStateAction<FamilyHistory[]>>;
};

const FamilyHist = ({
  patient,
  familyHistory,
  setFamilyHistory,
}: FamilyHistProps) => {
  const [options, setOptions] = useState(false);
  const [add, setAdd] = useState(false);

  const deleteMember = async (fh_id: number) => {
    await deleteFromFamilyHistory(fh_id);
    const newMember = familyHistory.filter((family) => family.fh_id !== fh_id);
    setFamilyHistory(newMember);
  };

  return (
    <div>
      {add ? (
        <AddFamilyHist
          setAdd={setAdd}
          patient={patient}
          familyHistory={familyHistory}
          setFamilyHistory={setFamilyHistory}
        />
      ) : null}
      <ul className="border-2 border-black rounded-md overflow-auto h-48 px-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Family History</span>
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
        {familyHistory.length ? (
          familyHistory?.map(({ fh_id, family }) => (
            <li className="flex flex-row justify-between pl-2" key={fh_id}>
              <div>{family}</div>
              {options ? (
                <button
                  type="button"
                  className="mr-2 hover:text-red-600 active:bg-red-600"
                  onClick={() => deleteMember(fh_id)}
                >
                  <FaMinus />
                </button>
              ) : null}
            </li>
          ))
        ) : (
          <div>No Known Family History</div>
        )}
      </ul>
    </div>
  );
};

export default FamilyHist;
