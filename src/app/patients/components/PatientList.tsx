"use client";

import type { Patient } from "@/types";
import { useState } from "react";
import { PatientOptions } from ".";
import { SlOptions } from "react-icons/sl";
import { CiHome } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PatientListProps = {
  patients: Patient[];
};

const PatientList = ({ patients }: PatientListProps) => {
  const [patientOptions, setPatientOptions] = useState<number | boolean>(false);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const router = useRouter();

  return (
    <section className="wrapper my-10">
      <div className="flex flex-row justify-center items-center">
        <Link href="/home">
          <CiHome />
        </Link>
        <h1 className="text-center text-lg font-bold m-4">Patients</h1>
        <Link href="/create-patient" className="cursor-pointer">
          <FaUserPlus />
        </Link>
      </div>
      {patients?.map((patient) => (
        <div key={patient.patient_id} className="w-full">
          {patientOptions === patient.patient_id ? (
            <PatientOptions
              patient={patient}
              setPatientId={setPatientId}
              patientOptions={patientOptions}
              setPatientOptions={setPatientOptions}
              setSelectedPatient={setSelectedPatient}
            />
          ) : null}
          <div className="flex flex-row justify-between border-2 p-2">
            <div
              className="grid grid-cols-3 gap-8 cursor-pointer w-full"
              onClick={() => router.push(`/patient/${patient.patient_id}`)}
            >
              <div className="capitalize">{patient.name}</div>
              <div className="mx-auto">{patient.provider}</div>
              <div className="mx-auto">{patient.visit_status}</div>
            </div>
            <div
              role="button"
              onClick={() => setPatientOptions(patient.patient_id)}
              className="w-fit flex items-center"
            >
              <SlOptions className="ml-auto w-10 border-2 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PatientList;
