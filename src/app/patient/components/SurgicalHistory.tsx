"use client";

import type { Patient, PastSurgicalHistory } from "@/types";
import { useState, useEffect } from "react";
import {
  getSurgicalHistory,
  deleteFromSurgicalHistory,
} from "@/actions/surgical-history";
import Options from "@/components/Options";
import { SlOptions } from "react-icons/sl";
import { MdFileDownloadDone } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { AddSurgicalHistory } from ".";

type SurgicalHistoryProps = {
  patient: Patient;
  surgical: PastSurgicalHistory[];
  setSurgical: React.Dispatch<React.SetStateAction<PastSurgicalHistory[]>>;
};

const SurgicalHistory = ({
  patient,
  surgical,
  setSurgical,
}: SurgicalHistoryProps) => {
  const [options, setOptions] = useState(false);
  const [add, setAdd] = useState(false);

  const deleteSurgical = async (psh_id: number) => {
    await deleteFromSurgicalHistory(psh_id);
    const newHistory = surgical.filter((surgery) => surgery.psh_id !== psh_id);
    setSurgical(newHistory);
  };

  return (
    <div>
      {add ? (
        <AddSurgicalHistory
          setAdd={setAdd}
          patient={patient}
          surgical={surgical}
          setSurgical={setSurgical}
        />
      ) : null}
      <ul className="border-2 border-black rounded-md overflow-auto h-48 px-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Past Surgical History</span>
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
        {surgical.length ? (
          surgical?.map(({ psh_id, surgery }) => (
            <li className="flex flex-row justify-between pl-m" key={psh_id}>
              <div>{surgery}</div>
              {options ? (
                <button
                  type="button"
                  className="mr-2 hover:text-red-600 active:bg-red-600"
                  onClick={() => deleteSurgical(psh_id)}
                >
                  <FaMinus />
                </button>
              ) : null}
            </li>
          ))
        ) : (
          <div>No Known Surgical History</div>
        )}
      </ul>
    </div>
  );
};

export default SurgicalHistory;
