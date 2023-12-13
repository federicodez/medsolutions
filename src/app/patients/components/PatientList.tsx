"use client";

import type { Patient } from "@/types";
import { useState } from "react";
import { PatientOptions } from ".";
import { SlOptions } from "react-icons/sl";

type PatientListProps = {
  patients: Patient;
};

const PatientList = ({ patients }: PatientListProps) => {
  const [patientOptions, setPatientOptions] = useState<number | boolean>(false);
  return (
    <section className="wrapper my-10">
      <h1 className="text-center text-lg font-bold m-4">Patients</h1>
      {patients?.map(({ id, name, provider, visit_status }) => (
        <div
          key={id}
          className="grid grid-cols-4 justify-evenly gap-5 border p-2"
        >
          {patientOptions === id ? (
            <PatientOptions
              patientOptions={patientOptions}
              setPatientOptions={setPatientOptions}
            />
          ) : null}
          <div className="capitalize">{name}</div>
          <div className="">{provider}</div>
          <div className="">{visit_status}</div>
          <button
            type="button"
            onClick={() => setPatientOptions(id)}
            className="w-fit"
          >
            <SlOptions />
          </button>
        </div>
      ))}
    </section>
  );
};

export default PatientList;
