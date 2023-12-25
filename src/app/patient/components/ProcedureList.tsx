"use client";

import type { Patient, ProcedureDone } from "@/types";
import { useState, useEffect } from "react";
import {
  getProceduresDone,
  deleteFromProceduresDone,
} from "@/actions/procedures-list";
import Options from "@/components/Options";
import { SlOptions } from "react-icons/sl";
import { MdFileDownloadDone } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { AddProcedureList } from ".";

type ProcedureListProps = {
  patient: Patient;
  procedureDone: ProcedureDone[];
  setProcedureDone: React.Dispatch<React.SetStateAction<ProcedureDone[]>>;
};

const ProcedureList = ({
  patient,
  procedureDone,
  setProcedureDone,
}: ProcedureListProps) => {
  const [options, setOptions] = useState(false);
  const [add, setAdd] = useState(false);

  const deleteProcedure = async (pd_id: number) => {
    await deleteFromProceduresDone(pd_id);
    const newProcedure = procedureDone.filter(
      (procedure) => procedure.pd_id !== pd_id,
    );
    setProcedureDone(newProcedure);
  };

  return (
    <div>
      {add ? (
        <AddProcedureList
          setAdd={setAdd}
          patient={patient}
          procedureDone={procedureDone}
          setProcedureDone={setProcedureDone}
        />
      ) : null}
      <ul className="border-2 border-black rounded-md overflow-auto h-48 px-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Procedures Done</span>
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
        {procedureDone.length ? (
          procedureDone?.map(({ pd_id, procedure }) => (
            <li className="flex flex-row justify-between pl-2" key={pd_id}>
              <div>{procedure}</div>
              {options ? (
                <button
                  type="button"
                  className="mr-2 hover:text-red-600 active:bg-red-600"
                  onClick={() => deleteProcedure(pd_id)}
                >
                  <FaMinus />
                </button>
              ) : null}
            </li>
          ))
        ) : (
          <div>No Known Procedures Done</div>
        )}
      </ul>
    </div>
  );
};

export default ProcedureList;
