"use client";

import type { Patient, SelectedPatient } from "@/types";
import { useState } from "react";
import {
  CreatePatientForm,
  PatientDetails,
  PatientOptions,
  NoteForm,
  UpdatePatient,
} from ".";
import { SlOptions } from "react-icons/sl";
import { CiHome } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa6";
import Link from "next/link";

type PatientListProps = {
  patients: Patient | null;
};

const PatientList = ({ patients }: PatientListProps) => {
  const [patientOptions, setPatientOptions] = useState<number | boolean>(false);
  const [addNote, setAddNote] = useState(false);
  const [update, setUpdate] = useState(false);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [selectedPatient, setSelectedPatient] =
    useState<SelectedPatient | null>(null);
  const [showPatientDetails, setShowPatientDetails] =
    useState<SelectedPatient | null>(null);
  const [create, setCreate] = useState(false);

  return (
    <section className="wrapper my-10">
      {create ? <CreatePatientForm setCreate={setCreate} /> : null}
      {showPatientDetails ? (
        <PatientDetails showPatientDetails={showPatientDetails} />
      ) : null}
      <div className="flex flex-row justify-center items-center">
        <Link href="/home">
          <CiHome />
        </Link>
        <h1 className="text-center text-lg font-bold m-4">Patients</h1>
        <div onClick={() => setCreate(true)}>
          <FaUserPlus />
        </div>
      </div>
      {patients?.map(({ patient_id, name, provider, visit_status }) => (
        <div key={patient_id} className="flex flex-row border p-2">
          <div className="absolute w-full">
            {patientId && addNote ? (
              <NoteForm
                patientId={patientId}
                setPatientId={setPatientId}
                setPatientOptions={setPatientOptions}
              />
            ) : null}
            {selectedPatient && update ? (
              <UpdatePatient
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
                setUpdate={setUpdate}
              />
            ) : null}
            {patientOptions === patient_id ? (
              <PatientOptions
                patient_id={patient_id}
                name={name}
                provider={provider}
                visit_status={visit_status}
                setPatientId={setPatientId}
                setAddNote={setAddNote}
                patientOptions={patientOptions}
                setPatientOptions={setPatientOptions}
                update={update}
                setUpdate={setUpdate}
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
              />
            ) : null}
          </div>
          <div
            className="flex flex-row gap-5 cursor-pointer"
            onClick={() =>
              setShowPatientDetails({
                patient_id,
                name,
                provider,
                visit_status,
              })
            }
          >
            <div className="capitalize">{name}</div>
            <div className="flex justify-center">{provider}</div>
            <div className="flex justify-center">{visit_status}</div>
          </div>
          <div
            role="button"
            onClick={() => setPatientOptions(patient_id)}
            className="w-fit flex items-center"
          >
            <SlOptions className="ml-auto w-10" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default PatientList;
