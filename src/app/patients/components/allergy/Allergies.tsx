"use client";

import type { Patient, Allergy } from "@/types";
import { useState, useEffect } from "react";
import { getPatientAllergies, addToAllergy } from "@/actions/allergy";
import { HiPlus } from "react-icons/hi2";
import { AddAllergy } from ".";

type AllergiesProps = {
  selectedPatient: Patient;
};

const Allergies = ({ selectedPatient }: AllergiesProps) => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const allergies = await getPatientAllergies(selectedPatient.patient_id);
      if (allergies) {
        setAllergies(allergies);
      }
    };
    getData();
  }, [selectedPatient.patient_id]);

  return (
    <div>
      {add ? (
        <AddAllergy
          setAdd={setAdd}
          selectedPatient={selectedPatient}
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
