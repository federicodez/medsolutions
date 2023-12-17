"use client";

import type { Patient } from "@/types";
import { useState } from "react";
import { PatientOptions, NoteForm } from ".";
import { SlOptions } from "react-icons/sl";

type PatientListProps = {
  patients: Patient | null;
};

const PatientList = ({ patients }: PatientListProps) => {
  const [patientOptions, setPatientOptions] = useState<number | boolean>(false);
  const [addNote, setAddNote] = useState(false);
  const [patientId, setPatientId] = useState<number | null>(null);
  return (
    <section className="wrapper my-10">
      <h1 className="text-center text-lg font-bold m-4">Patients</h1>
      {patients?.map(({ patient_id, name, provider, visit_status }) => (
        <div
          key={patient_id}
          className="grid grid-cols-4 justify-evenly gap-5 border p-2"
        >
          {patientId ? (
            <NoteForm
              patientId={patientId}
              setPatientId={setPatientId}
              setPatientOptions={setPatientOptions}
            />
          ) : null}
          {patientOptions === patient_id ? (
            <PatientOptions
              patient_id={patient_id}
              setPatientId={setPatientId}
              setAddNote={setAddNote}
              patientOptions={patientOptions}
              setPatientOptions={setPatientOptions}
            />
          ) : null}
          <div className="capitalize">{name}</div>
          <div className="">{provider}</div>
          <div className="">{visit_status}</div>
          <button
            type="button"
            onClick={() => setPatientOptions(patient_id)}
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
