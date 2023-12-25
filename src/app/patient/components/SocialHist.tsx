"use client";

import type { Patient, SocialHistory } from "@/types";
import { useState, useEffect } from "react";
import {
  getSocialHistory,
  deleteFromSocialHistory,
} from "@/actions/social-history";
import Options from "@/components/Options";
import { SlOptions } from "react-icons/sl";
import { MdFileDownloadDone } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { AddSocialHist } from ".";

export const dynamic = "force-dynamic";

type SocialHistProps = {
  patient: Patient;
  socialHistory: SocialHistory[];
  setSocialHistory: React.Dispatch<React.SetStateAction<SocialHistory[]>>;
};

const SocialHist = ({
  patient,
  socialHistory,
  setSocialHistory,
}: SocialHistProps) => {
  const [options, setOptions] = useState(false);
  const [add, setAdd] = useState(false);

  const deleteSocial = async (sh_id: number) => {
    await deleteFromSocialHistory(sh_id);
    const newSocial = socialHistory.filter(
      (history) => history.sh_id !== sh_id,
    );
    setSocialHistory(newSocial);
  };

  return (
    <div>
      {add ? (
        <AddSocialHist
          setAdd={setAdd}
          patient={patient}
          socialHistory={socialHistory}
          setSocialHistory={setSocialHistory}
        />
      ) : null}
      <ul className="border-2 border-black rounded-md overflow-auto h-48">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Social History</span>
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
        {socialHistory.length ? (
          socialHistory?.map(({ sh_id, history }) => (
            <li className="flex flex-row justify-between pl-2" key={sh_id}>
              <div>{history}</div>
              {options ? (
                <button
                  type="button"
                  className="mr-2 hover:text-red-600 active:bg-red-600"
                  onClick={() => deleteSocial(sh_id)}
                >
                  <FaMinus />
                </button>
              ) : null}
            </li>
          ))
        ) : (
          <div>No Known Social History</div>
        )}
      </ul>
    </div>
  );
};

export default SocialHist;
