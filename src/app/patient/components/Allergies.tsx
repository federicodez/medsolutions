"use client";

import type { Patient, Allergy } from "@/types";
import { useState, useEffect } from "react";
import { getPatientAllergies } from "@/actions/allergy";
import { HiPlus } from "react-icons/hi2";
import { AddAllergy } from ".";

type AllergiesProps = {
  patient: Patient;
  initialAllergies: Allergy[];
};

const Allergies = ({ patient, initialAllergies }: AllergiesProps) => {
  const [allergies, setAllergies] = useState(initialAllergies);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    const getData = async () => {};
    getData();
  }, [patient.patient_id]);

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
      <ul className="border-2 border-black rounded-md overflow-auto h-48">
        <div className="flex flex-row justify-between">
          <span className="font-bold">Allergy</span>
          <button type="button" onClick={() => setAdd(true)}>
            <HiPlus />
          </button>
        </div>
        {allergies?.map(({ allergy_id, allergy }) => (
          <li className="pl-2" key={allergy_id}>
            {allergy}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allergies;
