"use client";

import type { Patient, PainManagement } from "@/types";
import { useState, useEffect } from "react";
import {
  getPainManagement,
  deleteFromPainManagement,
} from "@/actions/pain-management";
import Options from "@/components/Options";
import { SlOptions } from "react-icons/sl";
import { MdFileDownloadDone } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { AddPainManage } from ".";

type PainManageProps = {
  patient: Patient;
  painManagement: PainManagement[];
  setPainManagement: React.Dispatch<React.SetStateAction<PainManagement[]>>;
};

const PainManage = ({
  patient,
  painManagement,
  setPainManagement,
}: PainManageProps) => {
  const [options, setOptions] = useState(false);
  const [add, setAdd] = useState(false);

  const deletePain = async (pm_id: number) => {
    await deleteFromPainManagement(pm_id);
    const pain = painManagement.filter((pain) => pain.pm_id !== pm_id);
    setPainManagement(pain);
  };

  return (
    <div>
      {add ? (
        <AddPainManage
          setAdd={setAdd}
          patient={patient}
          painManagement={painManagement}
          setPainManagement={setPainManagement}
        />
      ) : null}
      <ul className="border-2 border-black rounded-md overflow-auto h-48 px-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Pain Management</span>
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
        {painManagement.length ? (
          painManagement?.map(({ pm_id, pain }) => (
            <li className="flex flex-row justify-between pl-2" key={pm_id}>
              <div>{pain}</div>
              {options ? (
                <button
                  type="button"
                  className="mr-2 hover:text-red-600 active:bg-red-600"
                  onClick={() => deletePain(pm_id)}
                >
                  <FaMinus />
                </button>
              ) : null}
            </li>
          ))
        ) : (
          <div>No Known Pain Management</div>
        )}
      </ul>
    </div>
  );
};

export default PainManage;
